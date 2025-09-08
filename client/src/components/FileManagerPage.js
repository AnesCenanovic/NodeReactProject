// client/src/components/FileManagerPage.js
import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { connect } from 'react-redux';

const FileManagerPage = ({ users }) => { // We get all users from Redux for the sharing modal
    const [myFiles, setMyFiles] = useState([]);
    const [sharedFiles, setSharedFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [shareModalOpen, setShareModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [userToShareWith, setUserToShareWith] = useState('');

    const fetchFiles = async () => {
        const [myFilesRes, sharedFilesRes] = await Promise.all([
            axios.get('/api/files/my_files'),
            axios.get('/api/files/shared_with_me')
        ]);
        setMyFiles(myFilesRes.data);
        setSharedFiles(sharedFilesRes.data);
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    const onDrop = useCallback(async (acceptedFiles) => {
        setUploading(true);
        const file = acceptedFiles[0];
        // 1. Get presigned URL from our server
        const uploadConfig = await axios.get(`/api/upload/file?fileType=${file.type}`);
        // 2. Upload file directly to R2
        await axios.put(uploadConfig.data.url, file, { headers: { 'Content-Type': file.type } });
        // 3. Confirm upload with our server
        await axios.post('/api/files', {
            originalName: file.name,
            s3Key: uploadConfig.data.key,
            fileType: file.type
        });
        setUploading(false);
        fetchFiles(); // Refresh the file list
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple: false });

    const handleDownload = async (fileId) => {
        const res = await axios.get(`/api/files/${fileId}/download`);
        window.open(res.data.url, '_blank'); // Open the temporary download link
    };
    
    const handleShare = async (e) => {
        e.preventDefault();
        await axios.post(`/api/files/${selectedFile._id}/share`, { userIdToShareWith });
        alert('File shared successfully!');
        setShareModalOpen(false);
    };

    const openShareModal = (file) => {
        setSelectedFile(file);
        setShareModalOpen(true);
    };

    const renderFileList = (files, title, canShare) => (
        <div>
            <h4>{title}</h4>
            <ul className="collection">
                {files.map(file => (
                    <li className="collection-item" key={file._id}>
                        <div>{file.originalName}
                            <div className="secondary-content">
                                {canShare && <button onClick={() => openShareModal(file)} className="btn-small blue" style={{marginRight: '10px'}}>Share</button>}
                                <button onClick={() => handleDownload(file._id)} className="btn-small green">Download</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <div>
            <h2 className="center-align">File Sharing</h2>
            
            {/* --- UPLOAD SECTION --- */}
            <div {...getRootProps()} style={dropzoneStyles}>
                <input {...getInputProps()} />
                {uploading ? <p>Uploading...</p> : <p>Drag 'n' drop a file here, or click to select a file</p>}
            </div>

            {/* --- FILE LISTS --- */}
            <div style={{ marginTop: '40px' }}>
                {renderFileList(myFiles, "My Files", true)}
                {renderFileList(sharedFiles, "Shared With Me", false)}
            </div>

            {/* --- SHARING MODAL --- */}
            {shareModalOpen && (
                <div className="modal" style={{ display: 'block', zIndex: 1000, top: '10%' }}>
                    <div className="modal-content">
                        <h4>Share "{selectedFile.originalName}"</h4>
                        <form onSubmit={handleShare}>
                            <select className="browser-default" value={userToShareWith} onChange={e => setUserToShareWith(e.target.value)} required>
                                <option value="" disabled>Select a user...</option>
                                {users.map(user => <option key={user._id} value={user._id}>{user.name}</option>)}
                            </select>
                            <div className="modal-footer" style={{marginTop: '20px'}}>
                                <button type="button" onClick={() => setShareModalOpen(false)} className="btn-flat grey white-text">Cancel</button>
                                <button type="submit" className="btn blue">Share File</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const dropzoneStyles = {
    border: '2px dashed #aaa',
    borderRadius: '5px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer'
};

const mapStateToProps = ({ users }) => ({ users });
export default connect(mapStateToProps)(FileManagerPage);
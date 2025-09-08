// client/src/components/FileManagerPage.js

import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions';
import FileCard from './FileCard';

const FileManagerPage = ({ auth, users, fetchUsers }) => {
    const [myFiles, setMyFiles] = useState([]);
    const [sharedFiles, setSharedFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [shareModalOpen, setShareModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [userToShareWith, setUserToShareWith] = useState('');

    const fetchFiles = useCallback(async () => {
        try {
            const [myFilesRes, sharedFilesRes] = await Promise.all([
                axios.get('/api/files/my_files'),
                axios.get('/api/files/shared_with_me')
            ]);
            setMyFiles(myFilesRes.data);
            setSharedFiles(sharedFilesRes.data);
        } catch (error) {
            console.error("Error fetching files:", error);
        }
    }, []);

    useEffect(() => {
        fetchFiles();
        fetchUsers();
    }, [fetchFiles, fetchUsers]);

    const onDrop = useCallback(async (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (!file) return;

        setUploading(true);
        try {
            const uploadConfig = await axios.get(`/api/upload/file?fileType=${file.type}`);
            await axios.put(uploadConfig.data.url, file, { headers: { 'Content-Type': file.type } });
            await axios.post('/api/files', {
                originalName: file.name,
                s3Key: uploadConfig.data.key,
                fileType: file.type
            });
            fetchFiles();
        } catch (error) {
            console.error("File upload failed:", error);
            alert('File upload failed. Please try again.');
        } finally {
            setUploading(false);
        }
    }, [fetchFiles]);

    const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple: false });

    const handleDownload = async (fileId) => {
        try {
            const res = await axios.get(`/api/files/${fileId}/download`);
            window.open(res.data.url, '_blank');
        } catch (error) {
            console.error("Error getting download link:", error);
        }
    };

    const handleDelete = async (fileId) => {
        if (window.confirm('Are you sure you want to permanently delete this file?')) {
            try {
                await axios.delete(`/api/files/${fileId}`);
                fetchFiles(); 
            } catch (error) {
                console.error("Error deleting file:", error);
                alert('Failed to delete file.');
            }
        }
    };

    const handleShareSubmit = async (e) => {
        e.preventDefault();

        // --- CHECKPOINT 1: What is the state right before we send? ---
        console.log('Submitting share request with this user ID:', userToShareWith);
        
        if (!userToShareWith) {
            alert('Please select a user to share with.');
            return;
        }
        try {
            await axios.post(`/api/files/${selectedFile._id}/share`, { userToShareWith });
            alert('File shared successfully!');
            setShareModalOpen(false);
        } catch (error) {
            console.error("Error sharing file:", error);
            alert('Failed to share file.');
        }
    };

    const openShareModal = (file) => {
        setSelectedFile(file);
        setUserToShareWith('');
        setShareModalOpen(true);
    };

    // Helper to render the user dropdown with extensive logging
    const renderUserDropdown = () => {
        console.log('Rendering dropdown with this users array:', users);
        if (!users || users.length === 0) return null;

        return (
            <select 
                className="browser-default" 
                value={userToShareWith} 
                onChange={e => {
                    console.log('Dropdown changed. e.target.value is:', e.target.value);
                    setUserToShareWith(e.target.value);
                }} 
                required
            >
                <option value="" disabled>Select a user to share with...</option>
                {users
                    .filter(user => user && user._id && user._id !== auth?._id)
                    .map(user => {
                        if (!user._id) {
                            console.error("RENDERING A USER OPTION WITH NO ID!", user);
                        }
                        return <option key={user._id} value={user._id}>{user.name} ({user.role})</option>
                    })}
            </select>
        );
    };

    // Helper function to render a grid of files
    const renderFileList = (files, title, canShare) => (
        <div style={{ marginTop: '40px' }}>
            <h4>{title}</h4>
            {files.length > 0 ? (
                <div className="file-grid">
                    {files.map(file => (
                        <FileCard 
                            key={file._id} 
                            file={file} 
                            onDownload={handleDownload}
                            onShare={openShareModal}
                            onDelete={handleDelete}
                            canShare={canShare}
                            currentUser={auth}
                        />
                    ))}
                </div>
            ) : (
                <p>No files in this section.</p>
            )}
        </div>
    );

    return (
        <div className="container" style={{paddingTop: '20px'}}>
            <h2 className="center-align">File Sharing</h2>
            
            <div {...getRootProps()} className="themed-card" style={{ cursor: 'pointer', textAlign: 'center' }}>
                <input {...getInputProps()} />
                {uploading ? <p>Uploading...</p> : <p>Drag & drop a file here, or click to select</p>}
            </div>

            {renderFileList(myFiles, "My Files", true)}
            {renderFileList(sharedFiles, "Shared With Me", false)}

            {shareModalOpen && (
                <div className="modal" style={{ display: 'block', zIndex: 1000, top: '15%' }}>
                    <div className="themed-form-container">
                        <h4>Share "{selectedFile?.originalName}"</h4>
                        <form onSubmit={handleShareSubmit}>
                            {renderUserDropdown()}
                            <div className="form-actions" style={{marginTop: '20px'}}>
                                <button type="button" onClick={() => setShareModalOpen(false)} className="btn-flat red white-text">Cancel</button>
                                <button type="submit" className="btn blue">Share File</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const mapStateToProps = ({ auth, users }) => ({ auth, users });

export default connect(mapStateToProps, { fetchUsers })(FileManagerPage);
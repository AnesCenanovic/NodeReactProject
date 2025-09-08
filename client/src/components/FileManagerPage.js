// client/src/components/FileManagerPage.js

import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions'; // Action to get the list of all users
import FileCard from './FileCard';       // Our new, reusable card component

const FileManagerPage = ({ auth, users, fetchUsers }) => {
    // State for the lists of files
    const [myFiles, setMyFiles] = useState([]);
    const [sharedFiles, setSharedFiles] = useState([]);
    
    // State for managing UI interactions
    const [uploading, setUploading] = useState(false);
    const [shareModalOpen, setShareModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [userToShareWith, setUserToShareWith] = useState('');

    // Function to fetch both file lists from the backend
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

    // Effect hook to fetch initial data when the component loads
    useEffect(() => {
        fetchFiles();
        fetchUsers(); // Also fetch all users for the sharing dropdown
    }, [fetchFiles, fetchUsers]);

    // The multi-step upload process, handled by react-dropzone
    const onDrop = useCallback(async (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (!file) return;

        setUploading(true);
        try {
            // Step 1: Ask our server for a secure, one-time upload URL
            const uploadConfig = await axios.get(`/api/upload/file?fileType=${file.type}`);
            
            // Step 2: Upload the file directly to Cloudflare R2 using the URL
            await axios.put(uploadConfig.data.url, file, {
                headers: { 'Content-Type': file.type }
            });

            // Step 3: Tell our server that the upload is complete
            await axios.post('/api/files', {
                originalName: file.name,
                s3Key: uploadConfig.data.key,
                fileType: file.type
            });

            // Refresh the file list to show the new file
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
            // Ask our server for a temporary, secure download link
            const res = await axios.get(`/api/files/${fileId}/download`);
            // Open the link in a new tab to trigger the download
            window.open(res.data.url, '_blank');
        } catch (error) {
            console.error("Error getting download link:", error);
        }
    };
    
    const handleShareSubmit = async (e) => {
        e.preventDefault();
        if (!userToShareWith) return;
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
        setUserToShareWith(''); // Reset selection when opening
        setShareModalOpen(true);
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

            {/* --- THEMED SHARING MODAL --- */}
            {shareModalOpen && (
                <div className="modal" style={{ display: 'block', zIndex: 1000, top: '15%' }}>
                    <div className="themed-form-container">
                        <h4>Share "{selectedFile.originalName}"</h4>
                        <form onSubmit={handleShareSubmit}>
                            <select className="browser-default" value={userToShareWith} onChange={e => setUserToShareWith(e.target.value)} required>
                                <option value="" disabled>Select a user to share with...</option>
                                {/* Filter out the current user from the list of people to share with */}
                                {users.filter(user => user._id !== auth?._id).map(user => 
                                    <option key={user._id} value={user._id}>{user.name} ({user.role})</option>
                                )}
                            </select>
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

// We need 'auth' for the currently logged-in user and 'users' for the sharing dropdown
const mapStateToProps = ({ auth, users }) => ({ auth, users });

// We need the 'fetchUsers' action to populate the dropdown
export default connect(mapStateToProps, { fetchUsers })(FileManagerPage);
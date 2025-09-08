// client/src/components/AdminFileArchive.js

import {React, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import FileCard from './FileCard'; // <-- Import our reusable card

const AdminFileArchive = ({ auth }) => { // We get auth from Redux for permissions
    const [allFiles, setAllFiles] = useState([]);
    const [loading, setLoading] = useState(true);

    // Function to fetch all files (we can reuse this to refresh the list)
    const fetchAllFiles = async () => {
        try {
            const res = await axios.get('/api/files/all');
            setAllFiles(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Could not fetch all files:", err);
            setLoading(false);
        }
    };

    // Fetch the initial list when the component mounts
    useEffect(() => {
        fetchAllFiles();
    }, []);

    // --- REUSE THE HANDLER LOGIC FROM FileManagerPage ---

    const handleDownload = async (fileId) => {
        try {
            const res = await axios.get(`/api/files/${fileId}/download`);
            window.open(res.data.url, '_blank');
        } catch (error) {
            console.error("Error getting download link:", error);
        }
    };

    const handleDelete = async (fileId) => {
        if (window.confirm('Are you sure you want to permanently delete this file? This action cannot be undone.')) {
            try {
                await axios.delete(`/api/files/${fileId}`);
                // After deleting, refresh the file list to update the UI
                fetchAllFiles(); 
            } catch (error) {
                console.error("Error deleting file:", error);
                alert('Failed to delete file.');
            }
        }
    };

    if (loading) return <div className="center-align"><h5>Loading file archive...</h5></div>;

    return (
        <div className="container" style={{paddingTop: '20px'}}>
            <h2 className="center-align">Admin File Archive</h2>
            <p className="center-align">Showing all {allFiles.length} files uploaded to the platform.</p>
            
            {/* --- USE THE SAME .file-grid LAYOUT --- */}
            <div className="file-grid" style={{ marginTop: '30px' }}>
                {allFiles.map(file => (
                    // We render a FileCard for each file
                    <FileCard 
                        key={file._id}
                        file={file}
                        onDownload={handleDownload}
                        onDelete={handleDelete}
                        // We don't need sharing functionality on this page, so we don't pass onShare
                        canShare={false} // Explicitly disable the share button
                        currentUser={auth} // Pass the logged-in user to check delete permissions
                    />
                ))}
            </div>
        </div>
    );
};

// We need the `auth` object to pass down to the FileCard for permission checks
const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(AdminFileArchive);
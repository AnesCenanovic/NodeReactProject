import React from 'react';
import { getIconForFileType } from '../utils/iconHelper';

// This is a "dumb" component. It receives the file and handler functions as props.
const FileCard = ({ file, onDownload, onShare, canShare, onDelete, currentUser }) => {
    const canDelete = currentUser && (currentUser._id === file._uploader || currentUser.role === 'admin');
    return (
        <div className="file-card">
            <div className="file-card-info">
                <i className="material-icons file-card-icon">
                    {getIconForFileType(file.fileType)}
                </i>
                <div className="file-card-details">
                    <div className="file-name" title={file.originalName}>{file.originalName}</div>
                    <div className="file-type">{file.fileType}</div>
                </div>
            </div>

            <div className="file-card-actions">
                {/* Conditionally render the share button */}
                {canShare && (
                    <button onClick={() => onShare(file)} className="btn-floating btn-small waves-effect waves-light blue" title="Share File">
                        <i className="material-icons">share</i>
                    </button>
                )}
                                {canDelete && (
                    <button onClick={() => onDelete(file._id)} className="btn-floating btn-small waves-effect waves-light red" title="Delete File">
                        <i className="material-icons">delete</i>
                    </button>
                )}
                <button onClick={() => onDownload(file._id)} className="btn-floating btn-small waves-effect waves-light green" title="Download File">
                    <i className="material-icons">download</i>
                </button>
            </div>
        </div>
    );
};

export default FileCard;
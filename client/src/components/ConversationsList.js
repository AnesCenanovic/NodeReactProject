import React from 'react';
import { connect } from 'react-redux';

const ConversationList = ({ conversations, onSelect, activeConversationId, auth }) => {
    return (
        <div>
            <h5>Conversations</h5>
            <div className="collection">
                {conversations.map(convo => {
                    // Find the other participant's name to display
                    const otherParticipant = convo.participants.find(p => p._id !== auth._id);
                    return (
                        <a 
                            href="#!"
                            key={convo._id}
                            className={`collection-item ${convo._id === activeConversationId ? 'active' : ''}`}
                            onClick={() => onSelect(convo)}
                        >
                            {otherParticipant ? otherParticipant.name : 'Conversation'}
                        </a>
                    );
                })}
            </div>
        </div>
    );
};
const mapStateToProps = ({ auth }) => ({ auth });
export default connect(mapStateToProps)(ConversationList);
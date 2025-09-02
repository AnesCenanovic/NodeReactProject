import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import ConversationList from './ConversationsList';
import ChatWindow from './ChatWindow'; 

let socket;

const ChatPage = ({ auth }) => {
    const { conversationId } = useParams();
    const [conversations, setConversations] = useState([]);
    const [activeConversation, setActiveConversation] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (auth) {
            socket = io('http://localhost:5000');
            socket.on('receive_message', (newMessage) => {
                setActiveConversation(currentActiveConvo => {
                    if (currentActiveConvo && currentActiveConvo._id === newMessage._conversation) {
                        setMessages(prevMessages => [...prevMessages, newMessage]);
                    }
                    return currentActiveConvo;
                });
            });
            axios.get('/api/conversations').then(res => {
                const convos = res.data;
                setConversations(convos);
                if (conversationId) {
                    const activeConvo = convos.find(c => c._id === conversationId);
                    if (activeConvo) {
                        selectConversation(activeConvo);
                    }
                }
            });
            return () => socket.disconnect();
        }
    }, [auth, conversationId]);

    const selectConversation = async (conversation) => {
        setActiveConversation(conversation);
        const res = await axios.get(`/api/conversations/${conversation._id}/messages`);
        setMessages(res.data);
        socket.emit('join_conversation', conversation._id);
    };

    const sendMessage = (content) => {
        socket.emit('send_message', {
            conversationId: activeConversation._id,
            senderId: auth._id,
            senderName: auth.name,
            content
        });
    };

    const otherParticipant = activeConversation?.participants.find(
                        p => p._id !== auth?._id
                    );

    return (
        <div className="chat-page-layout">
            <div className="chat-conversations">
                <ConversationList 
                    conversations={conversations}
                    onSelect={selectConversation}
                    activeConversationId={activeConversation?._id}
                />
            </div>
            <div className="chat-window">
                {activeConversation ? (
                    <ChatWindow 
                        messages={messages}
                        onSendMessage={sendMessage}
                        currentUser={auth}
                        participant={otherParticipant}
                    />
                ) : (
                    <div className="center-align" style={{ paddingTop: '100px' }}>
                        <h5>Select a conversation to start chatting</h5>
                        <p>Click on a user in the sidebar to initiate a new chat.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = ({ auth }) => ({ auth });
export default connect(mapStateToProps)(ChatPage);
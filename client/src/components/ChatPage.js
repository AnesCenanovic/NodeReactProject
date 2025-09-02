import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import axios from 'axios';
import ConversationList from './ConversationsList'; 
import ChatWindow from './ChatWindow';       

let socket;

const ChatPage = ({ auth }) => {
    const [conversations, setConversations] = useState([]);
    const [activeConversation, setActiveConversation] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (auth) {
            socket = io('http://localhost:5000'); // Establish connection

            socket.on('receive_message', (newMessage) => {
                // Only add the message if it's for the currently active conversation
                setActiveConversation(currentActiveConvo => {
                    if (currentActiveConvo && currentActiveConvo._id === newMessage._conversation) {
                        setMessages(prevMessages => [...prevMessages, newMessage]);
                    }
                    return currentActiveConvo;
                });
            });

            axios.get('/api/conversations').then(res => setConversations(res.data));

            return () => socket.disconnect(); // Disconnect on cleanup
        }
    }, [auth]);

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

    return (
        <div className="row dashboard-layout" style={{ height: 'calc(100vh - 64px)' }}>
            <div className="col s4 dashboard-nav">
                <ConversationList conversations={conversations} onSelect={selectConversation} />
            </div>
            <div className="col s8 dashboard-main">
                {activeConversation ? (
                    <ChatWindow messages={messages} onSendMessage={sendMessage} currentUser={auth} />
                ) : (
                    <div className="center-align"><h5>Select a conversation to start chatting</h5></div>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = ({ auth }) => ({ auth });
export default connect(mapStateToProps)(ChatPage);
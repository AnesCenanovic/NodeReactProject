import React, { useState, useRef, useEffect } from 'react';

const ChatWindow = ({ messages, onSendMessage, currentUser, participant }) => {
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null); // Ref to auto-scroll to the bottom

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]); // Auto-scroll whenever new messages arrive

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            onSendMessage(newMessage);
            setNewMessage('');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div 
                className="themed-header" 
                style={{ padding: '10px 20px', flexShrink: 0 }}
            >
                <h5 style={{ margin: 0 }}>
                    {participant ? `Chat with ${participant.name}` : 'Conversation'}
                </h5>
            </div>

            <div style={{ flexGrow: 1, overflowY: 'auto', padding: '20px' }}>
                {messages.map(msg => (
                    <div 
                        key={msg._id} 
                        style={{ 
                            textAlign: msg._sender === currentUser._id ? 'right' : 'left',
                            marginBottom: '10px'
                        }}
                    >
                        <div 
                            style={{
                                display: 'inline-block',
                                padding: '10px 15px',
                                borderRadius: '20px',
                                backgroundColor: msg._sender === currentUser._id ? '#1e88e5' : '#e0e0e0',
                                color: msg._sender === currentUser._id ? 'white' : 'black',
                            }}
                        >
                            {msg.content}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#9e9e9e', margin: '2px 10px' }}>
                            {new Date(msg.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSubmit} style={{ padding: '20px', borderTop: '1px solid #ccc' }}>
                <div className="input-field" style={{ margin: 0 }}>
                    <input 
                        type="text" 
                        placeholder="Type a message..." 
                        value={newMessage}
                        onChange={e => setNewMessage(e.target.value)}
                    />
                </div>
            </form>
        </div>
    );
};

export default ChatWindow;
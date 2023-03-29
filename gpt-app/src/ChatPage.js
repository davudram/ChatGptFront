import { useState } from "react";
import './ChatPage.css';

function ChatPage() {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [chatTickets, setChatTickets] = useState([]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message.trim() !== '') {
            setChatHistory([...chatHistory, { sender: 'User', message }]);
            setMessage('');
        }
    };

    const handleInputChange = (e) => {
        setMessage(e.target.value);
    };

    const handleCreateChat = () => {
        const newChatTicket = {
            id: chatTickets.length + 1,
            lastMessage: '',
            unreadCount: 0
        };

        setChatTickets([...chatTickets, newChatTicket]);
    };

    return (
        <div className="app-container">
            <div className="chat-ticket-history">
                <div className="chat-ticket" onClick={handleCreateChat}>
                    New Chat
                </div>
                {chatTickets.map((chatTicket) => (
                    <div key={chatTicket.id} className="chat-ticket">
                        <div className="chat-ticket-info">
                            <div className="chat-ticket-title">
                                Chat {chatTicket.id}
                            </div>
                            <div className="chat-ticket-last-message">
                                {chatTicket.lastMessage}
                            </div>
                        </div>
                        {chatTicket.unreadCount > 0 && (
                            <div className="chat-ticket-unread-count">
                                {chatTicket.unreadCount}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="chat-container">
                <div className="chat-header">
                    <h1>ChatGPT</h1>
                </div>
                <div className="chat-history">
                    {chatHistory.map((msg, i) => (
                        <div key={i} className="chat-message">
                            <div className="chat-sender">{msg.sender}:</div>
                            <div className="chat-content">{msg.message}</div>
                        </div>
                    ))}
                </div>
                <form className="chat-form" onSubmit={handleSendMessage}>
                    <input type="text" value={message} onChange={handleInputChange} className="chat-input" placeholder="Type a message" />
                    <button type="submit" className="chat-button">Send</button>
                </form>
            </div>
        </div>
    );
}

export default ChatPage;

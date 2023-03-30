import { useState } from "react";
import './ChatPage.css';
import { Configuration, OpenAIApi } from "openai";

function ChatPage() {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [chatTickets, setChatTickets] = useState([]);
    const configuration = new Configuration({
        apiKey: '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',
    });
    const openai = new OpenAIApi(configuration);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (message.trim() !== '') {
            const requestOptions = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${configuration.apiKey}`,
                },
                body: JSON.stringify({ prompt: message }),
                method: 'POST',
            };
            const response = await fetch('https://api.openai.com/v1/engines/text-davinci-002/completions', requestOptions);
            const data = await response.json();
            const answer = data.choices[0].text;
            setChatHistory([...chatHistory, { sender: 'User', message }]);
            setChatHistory([...chatHistory, { sender: 'ChatGPT', message: answer }]);
            setMessage('');
        }
    };

    function handleUploadPhoto(event) {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        fetch('https://localhost:7019/api/Rekognition/UploadFiles', {
            method: 'POST',
            body: formData
        })
            .then(response => response.text())
            .then(detectedText => {
                const requestOptions = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${configuration.apiKey}`,
                    },
                    body: JSON.stringify({ prompt: detectedText }),
                    method: 'POST',
                };
                fetch('https://api.openai.com/v1/engines/text-davinci-002/completions', requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        const answer = data.choices[0].text;
                        setChatHistory([...chatHistory, { sender: 'User', message: file.name }]);
                        setChatHistory([...chatHistory, { sender: 'ChatGPT', message: answer }]);
                    })
                    .catch(error => console.error(error));
            })
            .catch(error => console.error(error));
    }

    function handleRecordVoice() {
        const recorder = new MediaRecorder({ audio: true });
        const chunks = [];
        recorder.addEventListener("dataavailable", (event) => {
            chunks.push(event.data);
        });
        recorder.start();
        setTimeout(() => {
            recorder.stop();
            const blob = new Blob(chunks, { type: "audio/mp3" });
            const formData = new FormData();
            formData.append("file", blob);

            fetch("/api/Transcribe", {
                method: "POST",
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    fetch('https://api.openai.com/v1/engines/text-davinci-002/completions', data.transcriptionText)
                        .then(response => response.json())
                        .then(data => {
                            const answer = data.choices[0].text;
                            setChatHistory([...chatHistory, { sender: 'User', message: data.transcriptionText }]);
                            setChatHistory([...chatHistory, { sender: 'ChatGPT', message: answer }]);
                        })
                        .catch(error => console.error(error));
                });
        }, 10000);
    }

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
                    <button type="button" className="create-chat-button" onClick={handleRecordVoice}>Record Voice</button>
                    <label htmlFor="upload-photo" className="create-chat-button">Upload Photo</label>
                    <input type="file" id="upload-photo" className="hidden" onChange={handleUploadPhoto} accept="image/*" />
                </form>
            </div>
        </div>
    );
}

export default ChatPage;

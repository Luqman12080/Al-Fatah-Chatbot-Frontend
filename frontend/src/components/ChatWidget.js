import { useState } from 'react'
import { MessageCircle, Send } from 'lucide-react';
import Markdown from 'react-markdown'

function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hello! How can I help you today?", isBot: true, date: new Date() }
    ]);
    const [input, setInput] = useState('');

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { text: input, isBot: false, date: new Date() };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        let result = null
        try {
            // console.log("Input: ", input)
            const response = await fetch("http://127.0.0.1:8000/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ query: input })
            })
            // const data = response
            const data = await response.json()
            result = data.response
            // console.log("Response: ", result)
        }
        catch (e) {
            console.log("Error: ", e.message)
        }

        // Simulate bot response
        setTimeout(() => {
            const botMessage = {
                text: result ? result : "Sorry, I don't understand that yet.",
                isBot: true,
                date: new Date()
            };
            setMessages(prev => [...prev, botMessage]);
        }, 1000);
    };

    return (
        <div className="chatbot-container">
            {!isOpen ? (
                <button
                    className="chat-button"
                    onClick={() => setIsOpen(true)}
                >
                    <MessageCircle size={24} />
                </button>
            ) : (
                <div className="chat-window">
                    <div className="chat-header">
                        <h3>AL-Fatah Chatbot</h3>
                        <button
                            className="close-button"
                            onClick={() => setIsOpen(false)}
                        >
                            ×
                        </button>
                    </div>
                    <div className="messages">
                        {messages.map((message, index) => (
                            <div className='message-container' >
                                <div
                                    key={index}
                                    className={`message ${message.isBot ? 'bot' : 'user'}`}
                                >
                                    <Markdown >{message.text}</Markdown>
                                </div>
                                <div className={` ${message.isBot ? 'botDate' : 'userDate'}`} >
                                    {message.date.toLocaleTimeString()}
                                </div>

                            </div>
                        ))}
                    </div>
                    <form onSubmit={handleSend} className="input-form">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="🧑‍🏭 Type your message..."
                            className="message-input"
                        />
                        <button type="submit" className="send-button">
                            <Send size={20} />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default ChatWidget
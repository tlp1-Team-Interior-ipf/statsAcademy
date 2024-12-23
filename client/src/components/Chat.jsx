import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/ContextHook';
import ReactMarkdown from 'react-markdown';
import '../styles/Chat.css';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [typingMessage, setTypingMessage] = useState('');
    const { user } = useAuth();
    const messagesEndRef = useRef(null);
    const id = user.data.id;

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (user.isLogged) {
            const fetchChatHistory = async () => {
                try {
                    const response = await axios.get(`http://localhost:4000/chat/history/${id}`);
                    setMessages(response.data.data);
                } catch (error) {
                    console.error('Error fetching chat history:', error);
                }
            };
            fetchChatHistory();
        }
    }, [user]);

    useEffect(() => {
        scrollToBottom();
    }, [messages, typingMessage]);

    const simulateTyping = (fullMessage) => {
        let index = 0;
        setTypingMessage('');
        const typingInterval = setInterval(() => {
            setTypingMessage((prev) => prev + fullMessage.slice(index, index + 10));
            index += 10;

            if (index >= fullMessage.length) {
                clearInterval(typingInterval);
                setMessages((prev) => [
                    ...prev,
                    { sender: 'assistant', message: fullMessage },
                ]);
                setTypingMessage('');
            }
        }, 1);
    };

    const handleSendMessage = async () => {
        if (!input.trim()) return;
        const userMessage = { sender: 'user', message: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');

        try {
            const response = await axios.post(`http://localhost:4000/chat/${id}`, {
                question: input,
            });

            const assistantMessage = response.data.data;
            simulateTyping(assistantMessage);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };

    if (!user.isLogged) {
        return <p>Por favor, inicia sesión para acceder al chat.</p>;
    }

    return (
        <div className="main-container">
            <div className="side-container">
                <div className="topic-container">
                    <p>Unidad actual: Unidad 1</p>
                    <h3>Conceptos básicos de la Estadística</h3>
                </div>
                <div className="tutor-container">
                    <img src="/img/tutorpose.png" alt="Tutor Gauss" className="tutor-image" />
                </div>
            </div>
            <div className="chat-container">
                <div className="chat-header">
                    <h2>Gauss Tutor Inteligente</h2>
                </div>
                <div className="chat-messages">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`message ${msg.sender === 'user' ? 'user' : 'assistant'}`}
                        >
                            {msg.sender === 'assistant' ? (
                                <ReactMarkdown>{msg.message}</ReactMarkdown>
                            ) : (
                                <p>{msg.message}</p>
                            )}
                        </div>
                    ))}
                    {typingMessage && (
                        <div className="message assistant">
                            <ReactMarkdown>{typingMessage}</ReactMarkdown>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                <div className="chat-input">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Pregúntale a Gauss..."
                    />
                    <button onClick={handleSendMessage}>Enviar</button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
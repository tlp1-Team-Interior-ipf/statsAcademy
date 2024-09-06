import React, { useState, useEffect, useRef } from 'react';
import swal from 'sweetalert';
import './Chat.css';

function App() {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([{ type: 'bot', text: 'Bienvenido! ¿En qué puedo ayudarte hoy?' }]);
  const socket = useRef(null);

  useEffect(() => {
    return () => {
      if (socket.current) {
        socket.current.close();
      }
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (question.trim() === '') return;

    setMessages([...messages, { type: 'user', text: question }]);
    setQuestion('');

    socket.current = new WebSocket('ws://localhost:8000/ws/ask');

    socket.current.onopen = () => {
      socket.current.send(question);
      swal({
        title: "Mensaje enviado!",
        text: "El mensaje se ha enviado correctamente!",
        icon: "success",
        timer: 1000
      });
    };

    let accumulatedMessage = "";

    socket.current.onmessage = (event) => {
      if (event.data === 'END') {
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: 'bot', text: accumulatedMessage.trim() }
        ]);
        socket.current.close();
      } else {
        accumulatedMessage += event.data + " ";
      }
    };

    socket.current.onerror = (error) => {
      setMessages([...messages, { type: 'bot', text: 'An error occurred' }]);
      console.error('WebSocket error:', error);
    };

    socket.current.onclose = () => {
      console.log('WebSocket connection closed');
    };
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
      handleSubmit(event);
    }
  };

  return (
    <div className="Chat">
    <header className="Chat-header">
      <h1>Bienvenido al Tutor Inteligente</h1>
      <div className="chat-container">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            {message.text}
          </div>
        ))}
      </div>
      <form className="input-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyUpCapture={handleKeyDown}
          placeholder="Escribe aquí"
          required
        />
        <button type="submit">Enviar</button>
      </form>
    </header>
  </div>
  );
}

export default App;

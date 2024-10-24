import '../styles/Chat.css';
import React, { useState, useEffect, useRef, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import { AuthContext } from '../context/authContext';

function App() {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const { user } = useContext(AuthContext);
  const id = user.data.id;


  // Recupera el historial del chat cuando se monta el componente
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await fetch(`http://localhost:4000/chat/history/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const result = await response.json();
          const formattedMessages = result.data.map((msg) => ({
            type: msg.sender === 'user' ? 'user' : 'bot',
            text: msg.message,
          }));
          setMessages(formattedMessages);
        } else {
          throw new Error('Error al recuperar el historial del chat');
        }
      } catch (error) {
        console.error('Error al obtener el historial del chat:', error);
      }
    };

    if (id) {
      fetchChatHistory(); // Solo llama a la función si userId está disponible
    }
  }, [id]); // Dependencia de userId para asegurarse de que está disponible antes de hacer la solicitud

  // Scroll automático al final de los mensajes
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (question.trim() === '' || !id) return;

    setMessages([...messages, { type: 'user', text: question }]);
    setQuestion('');

    try {
      const response = await fetch(`http://localhost:4000/chat/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: 'bot', text: data.response },
        ]);
      } else {
        throw new Error('Error en la respuesta');
      }
    } catch (error) {
      console.error('Error en la petición:', error);
      setMessages([...messages, { type: 'bot', text: 'Ocurrió un error' }]);
    }
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
              {message.type === 'bot' ? (
                <ReactMarkdown>{message.text}</ReactMarkdown>
              ) : (
                message.text
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
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
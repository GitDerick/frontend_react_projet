import React, { useState } from 'react';
import axios from 'axios';
import { BsSendFill, BsFillChatDotsFill } from 'react-icons/bs'; // Import d'icônes pour envoyer et discuter
import { Badge, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Chatbot.css';  // Importation du fichier CSS

const Chatbot = () => {
    const [userQuery, setUserQuery] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Fonction pour envoyer la requête au serveur FastAPI
    const sendChatRequest = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:3006/chat', {
                user_query: userQuery,
                chat_history: chatHistory
            });

            setChatHistory([...chatHistory, { user: 'Vous', message: userQuery }, { user: 'Bot', message: response.data.response }]);
            setUserQuery('');
        } catch (err) {
            setError('Erreur lors de la communication avec le serveur.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        if (userQuery.trim() !== '') {
            sendChatRequest();
        }
    };

    return (
        <div className="chatbotconv-container container mt-5 p-4 rounded shadow-lg bg-gradient">
            <h2 className="text-center text-light mb-4">
                <BsFillChatDotsFill /> Chatbot Médical
            </h2>
            
            <div className="chat-window border rounded p-3 mb-4 text-light shadow-sm ">
                {chatHistory.length === 0 && <p className="text-muted text-center">Commencez à poser vos questions.</p>}
                {chatHistory.map((chat, index) => (
                    <div key={index} className={`chat-message ${chat.user === 'Bot' ? 'bot-message' : 'user-message'}`}>
                        <strong>{chat.user}:</strong> {chat.message}
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="chat-form">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control input-lg bg-light"
                        placeholder="Posez une question..."
                        value={userQuery}
                        onChange={(e) => setUserQuery(e.target.value)}
                        disabled={loading}
                    />
                    <button className="btn btn-primary" type="submit" disabled={loading}>
                        {loading ? <Spinner animation="border" size="sm" /> : <BsSendFill />}
                    </button>
                </div>
            </form>

            {error && <div className="alert alert-danger text-center">{error}</div>}
        </div>
    );
};

export default Chatbot;

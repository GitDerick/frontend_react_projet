import React, { useState } from 'react';
import axios from 'axios';
import './DoctorChatBot.css';  // Importation du fichier CSS pour la personnalisation

const ChatBotComponent = () => {
    const [reportText, setReportText] = useState('');
    const [image, setImage] = useState(null);
    const [response, setResponse] = useState('');  // Pour stocker le rapport généré
    const [recommendation, setRecommendation] = useState('');  // Pour stocker la recommandation spécifique
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);  // Commence à charger
    
        const formData = new FormData();
        formData.append("report_text", reportText);  // Texte du rapport
        formData.append("image", image);  // Image sélectionnée par le médecin
    
        try {
            const res = await axios.post('http://localhost:5000/chatbot/analyze', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Mise à jour de l'état avec le rapport généré et la recommandation spécifique
            setResponse(res.data.generated_report_html);  // Remplacez par "generated_report_html"
            setRecommendation(res.data.recommendation_html);  // Remplacez par "recommendation_html"

        } catch (error) {
            console.error("Erreur lors de la requête :", error);
        } finally {
            setLoading(false);  // Fin du chargement
        }
    };

    return (
        <div className="chatbot-container container mt-5">
            <h2 className="text-center mb-4">Chatbot Médical</h2>

            <form onSubmit={handleSubmit} className="form-container">
                <div className="form-group mb-3">
                    <label htmlFor="symptoms" className="form-label">Symptômes du patient :</label>
                    <textarea
                        id="symptoms"
                        className="form-control"
                        value={reportText}
                        onChange={(e) => setReportText(e.target.value)}
                        placeholder="Décrivez les symptômes du patient..."
                        rows="4"
                        required
                    />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="image" className="form-label">Image médicale (IRM, radiographie, etc.) :</label>
                    <input
                        type="file"
                        id="image"
                        className="form-control"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                    {loading ? 'Analyse en cours...' : 'Envoyer'}
                </button>
            </form>

            {/* Affichage du rapport généré par le chatbot */}
            {response && (
                <div className="response-container alert alert-info mt-4">
                    <h4>Réponse du Chatbot :</h4>
                    {/* Affichage du contenu HTML dynamique en utilisant dangerouslySetInnerHTML */}
                    <div dangerouslySetInnerHTML={{ __html: response }} />
                </div>
            )}

            {/* Affichage de la recommandation séparée */}
            {recommendation && (
                <div className="recommendation-container alert alert-warning mt-4">
                    <h4>Recommandation Spécifique :</h4>
                    {/* Affichage spécifique de la recommandation */}
                    <div dangerouslySetInnerHTML={{ __html: recommendation }} />
                </div>
            )}
        </div>
    );
};

export default ChatBotComponent;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddDoctorResponse = () => {
    const { symptomId } = useParams(); // Récupérer l'ID du symptôme depuis l'URL
    const [formData, setFormData] = useState({
        doctor_name: '',
        notes: '',
        instructions: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Gérer les changements dans les champs du formulaire
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Gérer la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const token = localStorage.getItem('token'); // Récupérer le token JWT

            if (!token) {
                setError('Vous devez être connecté pour accéder à cette page.');
                setLoading(false);
                return;
            }

            // Envoyer les données de réponse au backend
            const response = await axios.put(
                `http://localhost:5000/doctor/add_response/${symptomId}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            setSuccess(response.data.message); // Message de succès
            setLoading(false);

            // Rediriger vers la page des symptômes ou une autre page après ajout de la réponse
            setTimeout(() => {
                navigate('/AllPatientSymptoms');
            }, 2000); // Redirection après 2 secondes
        } catch (error) {
            setLoading(false);
            if (error.response && error.response.data.message) {
                setError(error.response.data.message); // Message d'erreur du serveur
            } else {
                setError("Une erreur s'est produite lors de l'ajout de la réponse.");
            }
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Ajouter une réponse aux symptômes</h2>

            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md-6 offset-md-3">
                    <label htmlFor="doctor_name" className="form-label">Nom du docteur</label>
                    <input
                        type="text"
                        name="doctor_name"
                        className="form-control"
                        placeholder="Nom du docteur"
                        value={formData.doctor_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col-md-6 offset-md-3">
                    <label htmlFor="notes" className="form-label">Notes</label>
                    <textarea
                        name="notes"
                        className="form-control"
                        placeholder="Notes pour le patient"
                        value={formData.notes}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col-md-6 offset-md-3">
                    <label htmlFor="instructions" className="form-label">Instructions</label>
                    <textarea
                        name="instructions"
                        className="form-control"
                        placeholder="Instructions pour le patient"
                        value={formData.instructions}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col-md-6 offset-md-3">
                    <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
                        {loading ? 'Ajout en cours...' : 'Ajouter la réponse'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddDoctorResponse;

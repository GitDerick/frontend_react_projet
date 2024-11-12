import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DoctorLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
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
        try {
            // Envoyer les données de connexion au backend
            const response = await axios.post('http://localhost:5000/doctor/login_doctor', formData);

            // Sauvegarder le token d'accès et le token de rafraîchissement dans le localStorage
            const { access_token, refresh_token, id } = response.data;

            localStorage.setItem('token', access_token);          // Sauvegarder le token d'accès
            localStorage.setItem('refreshToken', refresh_token);  // Sauvegarder le token de rafraîchissement
            localStorage.setItem('doctorId', id);                 // Sauvegarder l'ID du docteur
            localStorage.setItem('role', 'doctor');               // Sauvegarder le rôle (docteur)

            // Afficher le token et l'ID du patient dans la console
            console.log('Access token:', access_token);
            console.log('Refresh token:', refresh_token);
            console.log('Dotor ID:', id);

            // Rediriger vers le tableau de bord après la connexion
            navigate('/dashboardMedecin');
        } catch (error) {
            setLoading(false);
            if (error.response && error.response.data.message) {
                setError(error.response.data.message); // Message d'erreur du serveur
            } else {
                setError("Une erreur s'est produite lors de la connexion");
            }
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Connexion Docteur</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md-6 offset-md-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col-md-6 offset-md-3">
                    <label htmlFor="password" className="form-label">Mot de passe</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Mot de passe"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col-md-6 offset-md-3">
                    <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
                        {loading ? 'Connexion en cours...' : 'Se connecter'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DoctorLogin;

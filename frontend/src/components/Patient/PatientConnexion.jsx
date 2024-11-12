import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PatientLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();  // Pour rediriger après connexion réussie

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Envoyer les données de connexion au backend
            const response = await axios.post('http://localhost:5000/login/patient', formData);

            // Sauvegarder le token JWT et l'ID du patient dans le localStorage
            const token = response.data.access_token;
            const patientId = response.data.id;


            // Sauvegarder le token JWT dans le localStorage
            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('patientId', response.data.id);  // Stockage de l'ID du patient
            localStorage.setItem('role', 'patient');  // Stockage du rôle

            // Afficher le token et l'ID du patient dans la console
            console.log('Token JWT:', token);
            console.log('Patient ID:', patientId);

            // Rediriger vers une page protégée après connexion
            navigate('/dashboardPatient');
        } catch (error) {
            setError('Échec de la connexion. Vérifiez vos identifiants.');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Connexion Patient</h2>
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
                    />
                </div>
                <div className="col-md-6 offset-md-3">
                    <button type="submit" className="btn btn-primary mt-3">Se connecter</button>
                </div>
            </form>
        </div>
    );
};

export default PatientLogin;


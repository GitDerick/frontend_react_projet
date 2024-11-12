import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdatePatientInfo = () => {
    const { patientId } = useParams();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        phoneNumber: '',
        email: '',
        address: '',
        password: '' // Ne pas pré-remplir le mot de passe pour des raisons de sécurité
    });

    const [message, setMessage] = useState('');

    // Charger les informations du patient lors du montage du composant
    useEffect(() => {
        console.log("Patient ID:", patientId); // Assure-toi que l'ID du patient est valide
        const fetchPatientData = async () => {

            try {
                console.log("Fetching patient data for ID:", patientId);
                const response = await axios.get(`http://localhost:5000/patients/${patientId}`);

                console.log("Response data:", response.data);

                // Si la date de naissance existe, la formater pour le champ input, sinon laisser vide
                const dateOfBirth = response.data.date_of_birth || '';

                // Mettre à jour le formulaire avec les données du patient
                setFormData({
                    first_name: response.data.first_name || '',
                    last_name: response.data.last_name || '',
                    date_of_birth: dateOfBirth, // Format correct pour la date
                    phone_number: response.data.phone_number || '',
                    email: response.data.email || '',
                    address: response.data.address || '',
                    password: '' // Ne jamais remplir le mot de passe dans le formulaire
                });
            } catch (error) {
                console.error("Erreur lors de la récupération des données du patient", error);
                setMessage("Erreur lors de la récupération des informations.");
            }
        };

        fetchPatientData();
    }, [patientId]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/patients/${patientId}`, formData);
            setMessage(response.data.message); // Afficher un message de succès ou d'échec
        } catch (error) {
            setMessage("Erreur lors de la mise à jour des informations");
            console.error("Erreur lors de la mise à jour", error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Modifier Mes Informations</h2>
            {message && <div className="alert alert-info">{message}</div>}
            <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md-6">
                    <label htmlFor="first_name" className="form-label">Nom</label>
                    <input
                        type="text"
                        name="first_name"
                        className="form-control"
                        placeholder="Nom"
                        value={formData.first_name}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="last_name" className="form-label">Prénom</label>
                    <input
                        type="text"
                        name="last_name"
                        className="form-control"
                        placeholder="Prénom"
                        value={formData.last_name}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="date_of_birth" className="form-label">Date de naissance</label>
                    <input
                        type="date"
                        name="date_of_birth"
                        className="form-control"
                        value={formData.date_of_birth}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="phone_number" className="form-label">Numéro de téléphone</label>
                    <input
                        type="text"
                        name="phone_number"
                        className="form-control"
                        placeholder="Numéro de téléphone"
                        value={formData.phone_number}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-6">
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
                <div className="col-md-6">
                    <label htmlFor="address" className="form-label">Adresse</label>
                    <input
                        type="text"
                        name="address"
                        className="form-control"
                        placeholder="Adresse"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="password" className="form-label">Mot de passe (laisser vide si non modifié)</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Mot de passe"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Mettre à jour</button>
                </div>
            </form>
        </div>
    );
};

export default UpdatePatientInfo;

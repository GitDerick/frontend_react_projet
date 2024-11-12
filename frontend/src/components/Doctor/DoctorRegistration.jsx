import React, { useState } from 'react';
import axios from 'axios';

const DoctorRegistration = () => {
    const [formData, setFormData] = useState({
        full_name: '',
        date_of_birth: '',
        phone_number: '',
        email: '',
        password: '',
        specialty: '',
        license_number: '',
        work_institution: '',
        country: '',
        province: '',
        ville: '',
        address: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Crée un objet FormData pour inclure les fichiers et les données textuelles
        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }

        try {
            const response = await axios.post('http://localhost:5000/doctor/register_doctor', data);
            setMessage(response.data.message); // Afficher un message de succès
        } catch (error) {
            setError(error.response?.data.message || 'Erreur lors de l\'inscription');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Inscription Docteur</h2>
            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md-6">
                    <label htmlFor="full_name" className="form-label">Nom Complet</label>
                    <input
                        type="text"
                        name="full_name"
                        className="form-control"
                        placeholder="Nom complet"
                        value={formData.full_name}
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
                <div className="col-md-6">
                    <label htmlFor="specialty" className="form-label">Spécialité</label>
                    <input
                        type="text"
                        name="specialty"
                        className="form-control"
                        placeholder="Spécialité médicale"
                        value={formData.specialty}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="license_number" className="form-label">Numéro de licence médicale</label>
                    <input
                        type="text"
                        name="license_number"
                        className="form-control"
                        placeholder="Numéro de licence"
                        value={formData.license_number}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="work_institution" className="form-label">Établissement de travail</label>
                    <input
                        type="text"
                        name="work_institution"
                        className="form-control"
                        placeholder="Établissement de travail"
                        value={formData.work_institution}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-4">
                    <label htmlFor="country" className="form-label">Pays</label>
                    <input
                        type="text"
                        name="country"
                        className="form-control"
                        placeholder="Pays"
                        value={formData.country}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-4">
                    <label htmlFor="province" className="form-label">Province</label>
                    <input
                        type="text"
                        name="province"
                        className="form-control"
                        placeholder="Province"
                        value={formData.province}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-4">
                    <label htmlFor="ville" className="form-label">Ville</label>
                    <input
                        type="text"
                        name="ville"
                        className="form-control"
                        placeholder="Ville"
                        value={formData.ville}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-12">
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
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">S'inscrire</button>
                </div>
            </form>
        </div>
    );
};

export default DoctorRegistration;

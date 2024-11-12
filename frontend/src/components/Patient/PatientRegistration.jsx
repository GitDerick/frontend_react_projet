import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import du hook pour la redirection
import './PatientRegistration.css'

const PatientRegistration = () => {
  const navigate = useNavigate(); // Initialisation du hook useNavigate

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    phoneNumber: '',
    email: '',
    address: '',
    password: ''
  });

  const [message, setMessage] = useState(null); // Pour afficher un message de succès ou d'erreur
  const [error, setError] = useState(null); // Pour afficher les erreurs

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Construction des données à envoyer au backend
    const data = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      date_of_birth: formData.dateOfBirth,
      phone_number: formData.phoneNumber,
      email: formData.email,
      address: formData.address,
      password: formData.password
    };

    try {
      const response = await fetch('http://localhost:5000/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (response.ok) {
        setMessage(result.message); // Message de succès
        setError(null);
        setFormData({ // Réinitialiser le formulaire
          firstName: '',
          lastName: '',
          dateOfBirth: '',
          phoneNumber: '',
          email: '',
          address: '',
          password: ''
        });

        // Rediriger vers la page d'accueil après une inscription réussie
        navigate('/');

      } else {
        setMessage(null);
        setError(result.message); // Afficher l'erreur renvoyée par le backend
      }

    } catch (error) {
      console.error('Erreur lors de la requête:', error);
      setMessage(null);
      setError("Une erreur s'est produite lors de l'enregistrement.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Inscription du patient</h2>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label htmlFor="firstName" className="form-label">Prénom</label>
          <input
            type="text"
            name="firstName"
            className="form-control"
            placeholder="Prénom"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="lastName" className="form-label">Nom</label>
          <input
            type="text"
            name="lastName"
            className="form-control"
            placeholder="Nom"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="dateOfBirth" className="form-label">Date de naissance</label>
          <input
            type="date"
            name="dateOfBirth"
            className="form-control"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="phoneNumber" className="form-label">Numéro de téléphone</label>
          <input
            type="text"
            name="phoneNumber"
            className="form-control"
            placeholder="Numéro de téléphone"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
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
            required
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
            required
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
            required
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">S'inscrire</button>
        </div>
      </form>
    </div>
  );
};

export default PatientRegistration;

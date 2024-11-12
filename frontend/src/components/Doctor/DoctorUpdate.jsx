import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateDoctor = () => {
  const { doctorId } = useParams(); // Récupère l'ID du docteur depuis l'URL
  const [formData, setFormData] = useState({
    full_name: '',
    date_of_birth: '',
    address: '',
    phone_number: '',
    email: '',
    speciality: '',
    license_number: '',
    work_institution: '',
    country: '',
    province: '',
    ville: '',
    password: '', // Champs mot de passe (facultatif)
  });
  const [message, setMessage] = useState('');

  // Charger les informations du docteur au chargement de la page
  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/doctor/${doctorId}`);
        setFormData(response.data);
      } catch (error) {
        setMessage('Erreur lors du chargement des données du docteur.');
      }
    };
    fetchDoctorData();
  }, [doctorId]);

  // Fonction pour mettre à jour les informations du formulaire
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Soumettre le formulaire de mise à jour
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/doctor/update/${doctorId}`, formData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Erreur lors de la mise à jour des informations.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Modifier mes informations</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label htmlFor="full_name" className="form-label">Nom complet</label>
          <input
            type="text"
            name="full_name"
            className="form-control"
            value={formData.full_name}
            onChange={handleChange}
            required
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
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="address" className="form-label">Adresse</label>
          <input
            type="text"
            name="address"
            className="form-control"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="phone_number" className="form-label">Numéro de téléphone</label>
          <input
            type="text"
            name="phone_number"
            className="form-control"
            value={formData.phone_number}
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
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="specialty" className="form-label">Spécialité</label>
          <input
            type="text"
            name="speciality"
            className="form-control"
            value={formData.speciality}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="license_number" className="form-label">Numéro de licence</label>
          <input
            type="text"
            name="license_number"
            className="form-control"
            value={formData.license_number}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="work_institution" className="form-label">Établissement de travail</label>
          <input
            type="text"
            name="work_institution"
            className="form-control"
            value={formData.work_institution}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="country" className="form-label">Pays</label>
          <input
            type="text"
            name="country"
            className="form-control"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="province" className="form-label">Province</label>
          <input
            type="text"
            name="province"
            className="form-control"
            value={formData.province}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="ville" className="form-label">Ville</label>
          <input
            type="text"
            name="ville"
            className="form-control"
            value={formData.ville}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="password" className="form-label">Nouveau mot de passe (laisser vide si non modifié)</label>
          <input
            type="password"
            name="password"
            className="form-control"
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

export default UpdateDoctor;

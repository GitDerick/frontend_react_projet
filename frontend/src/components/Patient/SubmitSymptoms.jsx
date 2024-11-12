import React, { useState } from 'react';
import axios from 'axios';
import './SubmitSymptoms.css'

const SubmitSymptoms = () => {
  const [formData, setFormData] = useState({
    symptoms: '',
    duration: '',
    medical_history: '',
    additional_info: ''
  });
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      setMessage("Vous n'êtes pas authentifié.");
      return;
    }

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('symptoms', formData.symptoms);
    formDataToSubmit.append('duration', formData.duration);
    formDataToSubmit.append('medical_history', formData.medical_history);
    formDataToSubmit.append('additional_info', formData.additional_info);

    for (let i = 0; i < files.length; i++) {
      formDataToSubmit.append('files', files[i]);
    }

    try {
      const response = await axios.post('http://localhost:5000/submit_symptoms', formDataToSubmit, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setMessage("Erreur lors de la soumission des symptômes.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Soumettre des Symptômes</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="symptoms" className="form-label">Symptômes</label>
          <textarea
            name="symptoms"
            className="form-control"
            placeholder="Décrivez vos symptômes"
            value={formData.symptoms}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="duration" className="form-label">Durée des symptômes</label>
          <input
            type="text"
            name="duration"
            className="form-control"
            placeholder="Exemple : 2 jours, 1 semaine, etc."
            value={formData.duration}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="medical_history" className="form-label">Historique Médical (facultatif)</label>
          <textarea
            name="medical_history"
            className="form-control"
            placeholder="Décrivez votre historique médical (si pertinent)"
            value={formData.medical_history}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="additional_info" className="form-label">Informations supplémentaires (facultatif)</label>
          <textarea
            name="additional_info"
            className="form-control"
            placeholder="Autres informations que vous jugez pertinentes"
            value={formData.additional_info}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="files" className="form-label">Ajouter des fichiers (facultatif)</label>
          <input
            type="file"
            name="files"
            className="form-control"
            onChange={handleFileChange}
            multiple
          />
        </div>
        <button type="submit" className="btn btn-primary">Soumettre</button>
      </form>
    </div>
  );
};

export default SubmitSymptoms;

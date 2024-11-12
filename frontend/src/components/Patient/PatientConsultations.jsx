import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PatientConsultations.css'; // Fichier CSS pour l'embellissement

const PatientConsultations = () => {
    const [consultations, setConsultations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchConsultations = async () => {
            try {
                const token = localStorage.getItem('token'); // Récupérer le token JWT
                const response = await axios.get('http://localhost:5000/patient/remote_consultations', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setConsultations(response.data); // Mettre à jour les consultations
                setLoading(false);
            } catch (err) {
                setError('Erreur lors de la récupération des consultations.');
                setLoading(false);
            }
        };

        fetchConsultations();
    }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatTime = (timeString) => {
        return timeString.substring(0, 5); // Extrait "HH:MM"
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center mt-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Chargement...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="alert alert-danger text-center mt-5">{error}</div>;
    }

    return (
        <div className="container mt-5">
            <div className="card shadow-lg">
                <div className="card-header bg-success text-white text-center">
                    <h2>Consultations à Distance Prévues</h2>
                </div>
                <div className="card-body">
                    {consultations.length > 0 ? (
                        <table className="table table-bordered table-hover mt-4">
                            <thead className="table-dark">
                                <tr>
                                    <th>Docteur</th>
                                    <th>Date</th>
                                    <th>Heure</th>
                                    <th>Status</th>
                                    <th>Lien Vidéo</th>
                                    <th>Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {consultations.map((consultation) => (
                                    <tr key={consultation._id}>
                                        <td>{consultation.doctor_name}</td>
                                        <td>{formatDate(consultation.date)}</td>
                                        <td>{formatTime(consultation.time)}</td>
                                        <td>
                                            <span
                                                className={`badge ${consultation.status === 'confirmed' ? 'bg-success' : 'bg-warning'}`}
                                            >
                                                {consultation.status}
                                            </span>
                                        </td>
                                        <td>
                                            <a href={consultation.video_link} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary">
                                                Ouvrir la Vidéo
                                            </a>
                                        </td>
                                        <td>{consultation.notes || 'Aucune note'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="alert alert-info text-center">
                            Aucune consultation à distance prévue pour l'instant.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PatientConsultations;

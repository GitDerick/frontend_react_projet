import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './DoctorAllConsultations.css'; // Import du fichier CSS personnalisé

const DoctorRemoteConsultations = () => {
    const [consultations, setConsultations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchConsultations = async () => {
            try {
                const token = localStorage.getItem('token'); // Récupérer le token JWT du localStorage
                const response = await axios.get('http://localhost:5000/doctor/remote_consultations', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setConsultations(response.data); // Mettre à jour l'état avec les consultations récupérées
                setLoading(false);
            } catch (err) {
                setError('Erreur lors de la récupération des consultations.');
                setLoading(false);
            }
        };

        fetchConsultations();
    }, []);

    // Fonction pour formater la date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    // Fonction pour rediriger vers la page de modification
    const handleEditClick = (consultation) => {
        navigate(`/doctorUpdateConsultations/${consultation.id}`, { state: { consultation } });
    };

    // Fonction pour supprimer une consultation
    const handleDeleteClick = async (consultationId) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette consultation ?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:5000/doctor/delete_remote_consultation/${consultationId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setSuccessMessage('Consultation supprimée avec succès.');
                setConsultations(consultations.filter((consultation) => consultation.id !== consultationId));
            } catch (err) {
                console.error('Erreur lors de la suppression de la consultation:', err);
                setError('Une erreur est survenue lors de la suppression de la consultation.');
            }
        }
    };

    if (loading) {
        return (
            <div className="drc-loading-spinner">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Chargement...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="drc-alert drc-alert-danger">{error}</div>;
    }

    return (
        <div className="drc-container mt-5">
            <div className="drc-card shadow-lg">
                <div className="drc-card-header bg-primary text-white text-center">
                    <h2>Consultations à Distance Planifiées</h2>

                    <div className="drc-card-body tab-style sstyle">
                        {successMessage && <div className="drc-alert drc-alert-success">{successMessage}</div>}
                        {consultations.length > 0 ? (
                            <table className="drc-table table-bordered table-hover mt-4">
                                <thead className="table-dark">
                                    <tr className='style-ecrit' >
                                        <th>Nom du Patient</th>
                                        <th>Date</th>
                                        <th>Heure</th>
                                        <th>Statut</th>
                                        <th>Lien Vidéo</th>
                                        <th>Notes</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {consultations.map((consultation) => (
                                        <tr key={consultation.id}>
                                            <td>{consultation.patient_name}</td>
                                            <td>{formatDate(consultation.date)}</td>
                                            <td>{consultation.time}</td>
                                            <td>
                                                <span
                                                    className={`badge ${consultation.status === 'confirmed'
                                                        ? 'bg-success'
                                                        : 'bg-warning'
                                                        }`}
                                                >
                                                    {consultation.status}
                                                </span>
                                            </td>
                                            <td>
                                                <a href={consultation.video_link} target="_blank" rel="noopener noreferrer">
                                                    Ouvrir le lien vidéo
                                                </a>
                                            </td>
                                            <td>{consultation.notes || 'Aucune note'}</td>
                                            <td>
                                                <button
                                                    className="btn drc-btn-warning me-2"
                                                    onClick={() => handleEditClick(consultation)}
                                                >
                                                    Modifier
                                                </button>
                                                <button
                                                    className="btn drc-btn-danger"
                                                    onClick={() => handleDeleteClick(consultation.id)}
                                                >
                                                    Supprimer
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="drc-alert drc-alert-info text-center">
                                Aucune consultation à distance planifiée pour l'instant.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorRemoteConsultations;

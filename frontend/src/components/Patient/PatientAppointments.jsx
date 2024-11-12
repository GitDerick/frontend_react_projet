import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PatientAppointments.css';

const PatientAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const token = localStorage.getItem('token');  // Récupérer le token JWT du patient depuis le localStorage
                const response = await axios.get('http://localhost:5000/patient/appointments', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setAppointments(response.data);  // Mettre à jour l'état avec les rendez-vous récupérés
                setLoading(false);
            } catch (err) {
                setError('Erreur lors de la récupération des rendez-vous.');
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    // Fonction pour formater la date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
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
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div className="container mt-5">
            <div className="card shadow-lg">
                <div className="card-header bg-primary text-white text-center">
                    <h2>Mes Rendez-vous</h2>
                    <p className="mb-0">Consultez vos rendez-vous en présentiel avec les médecins</p>
                </div>
                <div className="card-body">
                    {appointments.length > 0 ? (
                        <table className="table table-bordered table-hover mt-4">
                            <thead className="table-dark">
                                <tr>
                                    <th>Nom du Docteur</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.map((appointment) => (
                                    <tr key={appointment._id}>
                                        <td>{appointment.doctor_name}</td>
                                        <td>{formatDate(appointment.date)}</td>
                                        <td>
                                            <span
                                                className={`badge ${appointment.status === 'confirmed'
                                                    ? 'bg-success'
                                                    : 'bg-warning'
                                                    }`}
                                            >
                                                {appointment.status}
                                            </span>
                                        </td>
                                        <td>{appointment.notes || 'Aucune note'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="alert alert-info text-center">
                            Vous n'avez aucun rendez-vous pour l'instant.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PatientAppointments;

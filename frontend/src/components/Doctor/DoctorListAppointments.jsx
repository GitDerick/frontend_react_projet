import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DoctorListAppointments = () => {
    const { patientId } = useParams(); // Récupérer l'ID du patient depuis l'URL
    const [appointments, setAppointments] = useState([]); // Liste des rendez-vous
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    // Récupérer les rendez-vous du patient
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const token = localStorage.getItem('token'); // Récupérer le token JWT
                if (!token) {
                    setError('Vous devez être connecté pour accéder à cette page.');
                    setLoading(false);
                    return;
                }

                // Récupérer les rendez-vous du patient
                const response = await axios.get(`http://localhost:5000/appointments/patient/${patientId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setAppointments(response.data.appointments); // Stocker les rendez-vous du patient
                setLoading(false);
            } catch (err) {
                setError('Erreur lors de la récupération des rendez-vous.');
                setLoading(false);
                console.error(err);
            }
        };

        fetchAppointments();
    }, [patientId]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="container mt-5">
            <h2>Rendez-vous du patient</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            {loading ? (
                <div className="d-flex justify-content-center mt-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Chargement...</span>
                    </div>
                </div>
            ) : appointments.length > 0 ? (
                <table className="table table-striped mt-4">
                    <thead><tr><th>Date</th><th>Nom du docteur</th><th>Statut</th><th>Notes</th></tr></thead>
                    <tbody>
                        {appointments.map((appointment) => (
                            <tr key={appointment._id}>
                                <td>{formatDate(appointment.date)}</td>
                                <td>{appointment.doctor_name}</td>
                                <td>{appointment.status}</td>
                                <td>{appointment.notes || 'Aucune note'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="alert alert-info text-center">Aucun rendez-vous trouvé pour ce patient.</div>
            )}
        </div>
    );
};

export default DoctorListAppointments;

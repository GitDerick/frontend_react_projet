import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DoctorUpdateAppointment = () => {
    const { patientId, appointmentId } = useParams();  // Récupérer les deux paramètres depuis l'URL
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        doctor_name: '',
        date: '',
        notes: '',
        hospital_location: ''  // Nouveau champ pour le lieu de l'hôpital
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        // Récupérer les informations du rendez-vous à partir de appointmentId
        const fetchAppointmentDetails = async () => {
            try {
                const token = localStorage.getItem('token');  // Assurez-vous que le docteur est authentifié
                const response = await axios.get(`http://localhost:5000/appointments/patient/${patientId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const appointmentData = response.data.appointments.find(app => app._id === appointmentId);  // Récupérer les détails spécifiques du rendez-vous
                setFormData({
                    doctor_name: appointmentData.doctor_name,
                    date: appointmentData.date,
                    notes: appointmentData.notes,
                    hospital_location: appointmentData.hospital_location || ''  // Charger le lieu de l'hôpital si disponible
                });
            } catch (err) {
                setError('Erreur lors de la récupération des informations du rendez-vous.');
                console.error(err);
            }
        };

        fetchAppointmentDetails();
    }, [patientId, appointmentId]);  // Ajouter appointmentId dans le tableau de dépendances

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const token = localStorage.getItem('token');
            const updateData = {
                doctor_name: formData.doctor_name,
                date: formData.date,
                notes: formData.notes,
                hospital_location: formData.hospital_location  // Envoyer la localisation de l'hôpital
            };

            const response = await axios.put(
                `http://localhost:5000/doctor/update_appointment/${appointmentId}`,  // Utiliser appointmentId ici
                updateData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.status === 200) {
                setSuccess('Rendez-vous mis à jour avec succès.');
                setTimeout(() => navigate('/AllPatientSymptoms'), 2000);  // Rediriger vers la liste des rendez-vous après la mise à jour
            } else {
                setError('Échec de la mise à jour du rendez-vous.');
            }
        } catch (err) {
            setError('Erreur lors de la mise à jour du rendez-vous.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-lg">
                <div className="card-header bg-primary text-white text-center">
                    <h2>Modifier le rendez-vous</h2>
                    <p className="mb-0">Mettez à jour les informations du rendez-vous</p>
                </div>
                <div className="card-body">
                    {error && <div className="alert alert-danger">{error}</div>}
                    {success && <div className="alert alert-success">{success}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="doctor_name" className="form-label">Nom du médecin</label>
                            <input
                                type="text"
                                className="form-control"
                                id="doctor_name"
                                name="doctor_name"
                                value={formData.doctor_name}
                                readOnly
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="date" className="form-label">Date du rendez-vous</label>
                            <input
                                type="date"
                                className="form-control"
                                id="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="hospital_location" className="form-label">Lieu de l'hôpital</label>
                            <input
                                type="text"
                                className="form-control"
                                id="hospital_location"
                                name="hospital_location"
                                value={formData.hospital_location}
                                onChange={handleChange}
                                placeholder="Entrez le lieu de l'hôpital"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="notes" className="form-label">Notes</label>
                            <textarea
                                className="form-control"
                                id="notes"
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                rows="3"
                                placeholder="Ajoutez des notes supplémentaires"
                            />
                        </div>

                        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                            {loading ? 'Mise à jour en cours...' : 'Mettre à jour le rendez-vous'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DoctorUpdateAppointment;

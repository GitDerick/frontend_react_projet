import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import './DoctorUpdateConsultations.css';

const DoctorUpdateConsultation = () => {
    const { consultationId } = useParams();  // Récupérer l'ID de la consultation via l'URL
    const location = useLocation();
    const consultation = location.state?.consultation;  // Récupérer la consultation à partir de location.state
    const navigate = useNavigate();

    const [patientName, setPatientName] = useState('');
    const [doctorName, setDoctorName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Fonction pour récupérer les détails du docteur via l'API
    const fetchDoctorDetails = async (doctorId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:5000/doctor/${doctorId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setDoctorName(response.data.full_name);  // Mettre à jour le nom du docteur
        } catch (err) {
            console.error('Erreur lors de la récupération des informations du docteur:', err);
            setError('Erreur lors de la récupération des informations du docteur.');
        }
    };

    useEffect(() => {
        // Récupérer l'ID du docteur depuis le localStorage et faire une requête pour obtenir son nom
        const doctorId = localStorage.getItem('doctorId');  // Récupérer l'ID du docteur depuis le localStorage
        fetchDoctorDetails(doctorId);  // Appeler la fonction pour récupérer le nom du docteur

        // Préremplir les informations de la consultation si disponibles
        if (consultation) {
            setPatientName(consultation.patient_name || '');  // Initialise avec une chaîne vide si undefined
            setDate(consultation.date || '');                 // Pareil pour la date
            setTime(consultation.time || '');                 // Pareil pour l'heure
            setNotes(consultation.notes || '');               // Pareil pour les notes
        }
    }, [consultation]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(
                `http://localhost:5000/doctor/update_remote_consultation/${consultationId}`,
                {
                    doctor_name: doctorName,
                    patient_name: patientName,
                    date,
                    time,
                    notes,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSuccess(response.data.message);
            setLoading(false);
            navigate('/consultations');  // Redirection vers la liste des consultations après la modification
        } catch (err) {
            console.error('Erreur lors de la modification de la consultation:', err);
            setError('Une erreur est survenue lors de la modification de la consultation.');
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-lg">
                <div className="card-header bg-primary text-white text-center">
                    <h2>Modifier la consultation à distance</h2>
                    <p className="mb-0">Mettre à jour les informations de la consultation</p>
                </div>
                <div className="card-body">
                    {error && <div className="alert alert-danger">{error}</div>}
                    {success && <div className="alert alert-success">{success}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="doctorName" className="form-label">Nom du Docteur</label>
                            <input
                                type="text"
                                id="doctorName"
                                className="form-control"
                                value={doctorName || ''}  // Ajout d'une valeur par défaut pour éviter undefined
                                readOnly
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="patientName" className="form-label">Nom du Patient</label>
                            <input
                                type="text"
                                id="patientName"
                                className="form-control"
                                value={patientName || ''}  // Ajout d'une valeur par défaut pour éviter undefined
                                readOnly
                            />
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="date" className="form-label">Date de la consultation</label>
                                <input
                                    type="date"
                                    id="date"
                                    className="form-control"
                                    value={date || ''}  // Ajout d'une valeur par défaut pour éviter undefined
                                    onChange={(e) => setDate(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="time" className="form-label">Heure de la consultation</label>
                                <input
                                    type="time"
                                    id="time"
                                    className="form-control"
                                    value={time || ''}  // Ajout d'une valeur par défaut pour éviter undefined
                                    onChange={(e) => setTime(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="notes" className="form-label">Notes supplémentaires</label>
                            <textarea
                                id="notes"
                                className="form-control"
                                rows="3"
                                value={notes || ''}  // Ajout d'une valeur par défaut pour éviter undefined
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Ajoutez des notes pour la consultation (optionnel)"
                            />
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                                {loading ? 'Modification en cours...' : 'Mettre à jour la consultation'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DoctorUpdateConsultation;

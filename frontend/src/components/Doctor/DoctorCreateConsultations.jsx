import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DoctorCreateConsultations.css'; // Fichier CSS personnalisé si besoin

const DoctorCreateConsultation = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();  // Utiliser useSearchParams pour accéder aux paramètres de l'URL

    const doctorId = searchParams.get('doctorId');  // Récupérer doctorId de l'URL
    const patientId = searchParams.get('patientId');  // Récupérer patientId de l'URL

    const [doctorName, setDoctorName] = useState('');
    const [patientName, setPatientName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        // Charger les détails du docteur et du patient à partir de leur ID
        const fetchDoctorAndPatient = async () => {
            try {
                const token = localStorage.getItem('token');

                // Récupérer le nom du docteur en fonction de son ID
                const doctorResponse = await axios.get(`http://localhost:5000/doctor/${doctorId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setDoctorName(doctorResponse.data.full_name);

                // Récupérer le nom du patient en fonction de son ID
                const patientResponse = await axios.get(`http://localhost:5000/patients/${patientId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPatientName(`${patientResponse.data.first_name} ${patientResponse.data.last_name}`);
            } catch (err) {
                console.error("Erreur lors de la récupération des informations du docteur et du patient :", err);
                setError("Une erreur est survenue lors de la récupération des informations.");
            }
        };

        fetchDoctorAndPatient();
    }, [doctorId, patientId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:5000/doctor/create_remote_consultation',
                {
                    doctor_name: doctorName,
                    patient_id: patientId,  // Utiliser patientId récupéré de l'URL
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
            navigate(`/consultations/${response.data.consultation_id}`);  // Rediriger après la création
        } catch (err) {
            console.error('Erreur lors de la création de la consultation:', err);
            setError('Une erreur est survenue lors de la création de la consultation.');
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-lg">
                <div className="card-header bg-primary text-white text-center">
                    <h2>Créer une consultation à distance</h2>
                    <p className="mb-0">Planifiez une consultation avec votre patient</p>
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
                                value={doctorName}
                                readOnly
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="patientName" className="form-label">Nom du Patient</label>
                            <input
                                type="text"
                                id="patientName"
                                className="form-control"
                                value={patientName}
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
                                    value={date}
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
                                    value={time}
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
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Ajoutez des notes pour la consultation (optionnel)"
                            />
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                                {loading ? 'Création en cours...' : 'Créer la consultation'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DoctorCreateConsultation;

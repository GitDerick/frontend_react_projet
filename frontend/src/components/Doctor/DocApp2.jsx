import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ScheduleAppointment = () => {
    const { patientId, submissionId } = useParams();  // Récupérer l'ID du patient et de la soumission à partir de l'URL
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        doctor_name: '',
        date: '',
        notes: '',  // Champ pour les notes
        hospital_location: ''  // Champ pour le lieu de l'hôpital
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Récupérer les informations du docteur en utilisant son ID
        const fetchDoctorInfo = async () => {
            try {
                const doctorId = localStorage.getItem('doctorId');  // Assurez-vous que l'ID du docteur est stocké dans localStorage
                const response = await axios.get(`http://localhost:5000/doctor/${doctorId}`);
                const doctorData = response.data;

                // Remplir les informations du docteur dans le formulaire
                setFormData(prevState => ({
                    ...prevState,
                    doctor_name: doctorData.full_name
                }));
            } catch (err) {
                setError('Erreur lors de la récupération des informations du docteur.');
                console.error(err);
            }
        };

        fetchDoctorInfo();
    }, []);

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

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Vous devez être connecté pour fixer un rendez-vous.');
                setLoading(false);
                return;
            }

            // Préparer les données du rendez-vous avec submission_id
            const appointmentData = {
                patient_id: patientId,
                doctor_name: formData.doctor_name,
                date: formData.date,
                notes: formData.notes,  // Ajouter les notes
                hospital_location: formData.hospital_location,  // Ajouter le lieu de l'hôpital
                submission_id: submissionId  // Ajouter l'ID de la soumission à l'objet envoyé
            };

            // Envoyer la requête pour créer un rendez-vous
            const response = await axios.post('http://localhost:5000/doctor/create_appointment', appointmentData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 201) {
                navigate(`/doctorListAppointments/${patientId}`);  // Rediriger vers la liste des rendez-vous
            } else {
                setError('Échec de la création du rendez-vous.');
            }
        } catch (err) {
            setError('Erreur lors de la création du rendez-vous.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Fixer un rendez-vous pour le patient</h2>

            {error && <div className="alert alert-danger">{error}</div>}

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
                        name="hospital_location"  // Correction : assurez-vous que le name correspond bien
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
                        name="notes"  // Correction : assurez-vous que le name correspond bien
                        value={formData.notes}
                        onChange={handleChange}
                        rows="3"
                    />
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Envoi en cours...' : 'Fixer le rendez-vous'}
                </button>
            </form>
        </div>
    );
};

export default ScheduleAppointment;

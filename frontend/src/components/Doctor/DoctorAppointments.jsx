import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DoctorAppointments = () => {
    const [patients, setPatients] = useState([]); // Liste des patients et leurs soumissions
    const [selectedPatientId, setSelectedPatientId] = useState(''); // Patient sélectionné pour le rendez-vous
    const [selectedSubmissionId, setSelectedSubmissionId] = useState(''); // Soumission sélectionnée
    const [appointmentDate, setAppointmentDate] = useState(''); // Date du rendez-vous
    const [notes, setNotes] = useState(''); // Notes supplémentaires pour le rendez-vous
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const token = localStorage.getItem('token'); // JWT token
                const response = await axios.get('http://localhost:5000/doctor/Allsymptoms', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPatients(response.data.symptoms);
            } catch (err) {
                setError('Erreur lors de la récupération des patients.');
                console.error(err);
            }
        };

        fetchPatients();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const doctorName = localStorage.getItem('doctorName'); // Le nom du médecin connecté

            const response = await axios.post('http://localhost:5000/doctor/create_appointment', {
                patient_id: selectedPatientId,
                submission_id: selectedSubmissionId,
                doctor_name: doctorName,
                date: appointmentDate,
                notes: notes
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 201) {
                setSuccess('Rendez-vous créé avec succès.');
                setError('');
            }
        } catch (err) {
            setError('Erreur lors de la création du rendez-vous.');
            setSuccess('');
            console.error(err);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Gestion des rendez-vous patient-docteur</h2>

            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="patient" className="form-label">Sélectionnez un patient</label>
                    <select
                        id="patient"
                        className="form-control"
                        value={selectedPatientId}
                        onChange={(e) => setSelectedPatientId(e.target.value)}
                        required
                    >
                        <option value="">Sélectionner un patient</option>
                        {patients.map((patient) => (
                            <option key={patient.patient_id} value={patient.patient_id}>
                                {patient.patient_id} - {patient.symptoms}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="submission" className="form-label">Sélectionnez la soumission de symptômes</label>
                    <select
                        id="submission"
                        className="form-control"
                        value={selectedSubmissionId}
                        onChange={(e) => setSelectedSubmissionId(e.target.value)}
                        required
                    >
                        <option value="">Sélectionner une soumission</option>
                        {patients.map((patient) => (
                            <option key={patient._id} value={patient._id}>
                                {patient.symptoms} (Durée: {patient.duration})
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="date" className="form-label">Date du rendez-vous</label>
                    <input
                        type="datetime-local"
                        id="date"
                        className="form-control"
                        value={appointmentDate}
                        onChange={(e) => setAppointmentDate(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="notes" className="form-label">Notes supplémentaires</label>
                    <textarea
                        id="notes"
                        className="form-control"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows="3"
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-primary">Créer un rendez-vous</button>
            </form>
        </div>
    );
};

export default DoctorAppointments;

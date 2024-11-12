import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './InfoPatient.css'; // Importation du fichier CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Pour les icônes
import { faReply, faCalendarAlt, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import back from "../Images/imgBack.avif";

const InfoPatient = () => {
    const { patientId } = useParams();
    const [patient, setPatient] = useState(null);
    const [symptoms, setSymptoms] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPatientDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('Vous devez être connecté pour accéder à cette page.');
                    setLoading(false);
                    return;
                }

                const patientResponse = await axios.get(`http://localhost:5000/patients/${patientId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPatient(patientResponse.data);

                const symptomsResponse = await axios.get(`http://localhost:5000/doctor/patient_symptoms/${patientId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setSymptoms(symptomsResponse.data);

                const appointmentsResponse = await axios.get(`http://localhost:5000/appointments/patient/${patientId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setAppointments(appointmentsResponse.data.appointments || []);
                setLoading(false);
            } catch (err) {
                setError('Erreur lors de la récupération des informations.');
                setLoading(false);
            }
        };

        fetchPatientDetails();
    }, [patientId]);

    const handleRespondClick = (symptomId) => {
        navigate(`/responseDoctor/${symptomId}`);
    };

    const handleAppointmentClick = (symptomId) => {
        navigate(`/docAppointment/${patientId}/${symptomId}`);
    };

    const handleConsultationClick = () => {
        const doctorId = localStorage.getItem('doctorId');
        navigate(`/docCreateConsultations?doctorId=${doctorId}&patientId=${patientId}`);
    };

    const handleModifyAppointmentClick = (appointmentId) => {
        navigate(`/docUpdateAppointment/${patientId}/${appointmentId}`);
    };

    // Nouvelle fonction formatDate
    const formatDate = (dateString) => {
        if (!dateString) return 'Date invalide';
        try {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const dateObject = new Date(dateString);
            if (isNaN(dateObject)) {
                return 'Date invalide';
            }
            return dateObject.toLocaleDateString('fr-FR', options); // Format français
        } catch (error) {
            console.error("Erreur lors du formatage de la date : ", error);
            return 'Date invalide';
        }
    };

    return (
        <div className="info-patient-page container mt-5">
            <h2 className="text-center mb-4">Informations du patient</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            {loading ? (
                <div className="d-flex justify-content-center mt-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Chargement...</span>
                    </div>
                </div>
            ) : patient ? (
                <>
                    <div className="card shadow-sm mb-4 info-patient-profil">
                        <div className="card-body">
                            <h5 className="card-title text-primary">Profil du patient</h5>
                            <p><strong>Nom complet :</strong> {patient.first_name} {patient.last_name}</p>
                            <p><strong>Date de naissance :</strong> {formatDate(patient.date_of_birth)}</p>
                            <p><strong>Email :</strong> {patient.email}</p>
                            <p><strong>Téléphone :</strong> {patient.phone_number}</p>
                            <p><strong>Adresse :</strong> {patient.address}</p>
                        </div>
                    </div>

                    <button className="btn btn-info mb-4" onClick={handleConsultationClick}>
                        <FontAwesomeIcon icon={faPlus} /> Demander Consultation
                    </button>

                    <h3 className="mt-5 text-center">Symptômes du patient</h3>

                    {symptoms.length > 0 ? (
                        <table className="table table-hover mt-4 table-responsive">
                            <thead className="table-dark">
                                <tr>
                                    <th>Symptômes</th>
                                    <th>Durée</th>
                                    <th>Antécédents médicaux</th>
                                    <th>Réponse du médecin</th>
                                    <th>Documents envoyés</th>
                                    <th>Date de soumission</th>
                                    <th>Rendez-vous</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {symptoms.map((symptom) => (
                                    <tr key={symptom._id}>
                                        <td>{symptom.symptoms}</td>
                                        <td>{symptom.duration}</td>
                                        <td>{symptom.medical_history}</td>
                                        <td>
                                            {symptom.doctor_response?.notes ? (
                                                <>
                                                    <strong>Notes :</strong> {symptom.doctor_response.notes}<br />
                                                    <strong>Instructions :</strong> {symptom.doctor_response.instructions}
                                                </>
                                            ) : (
                                                'Aucune réponse'
                                            )}
                                        </td>
                                        <td>
                                            {symptom.files?.length > 0 ? (
                                                symptom.files.map((file) => (
                                                    <a key={file.file_id} href={`http://localhost:5000/files/${file.file_id}`} target="_blank" rel="noopener noreferrer">
                                                        {file.filename}
                                                    </a>
                                                ))
                                            ) : 'Aucun document'}
                                        </td>
                                        <td>{formatDate(symptom.submitted_at)}</td>
                                        <td>
                                            {appointments.some(appointment => appointment.status === 'confirmed') ? (
                                                <span className="text-success">Rendez-vous prévu</span>
                                            ) : (
                                                <span className="text-danger">Aucun rendez-vous</span>
                                            )}
                                        </td>
                                        <td>
                                            <button className="btn btn-primary me-2 custom-buttonReply" onClick={() => handleRespondClick(symptom._id)}>
                                                <FontAwesomeIcon icon={faReply} /> Répondre
                                            </button>
                                            <button className="btn btn-secondary custom-buttonRDV" onClick={() => handleAppointmentClick(symptom._id)}>
                                                <FontAwesomeIcon icon={faCalendarAlt} /> Fixer un rendez-vous
                                            </button>
                                            {appointments.length > 0 && appointments.slice(0, 1).map(appointment => (
                                                <button key={appointment._id} className="btn btn-warning mt-2 custom-buttonEditRDV" onClick={() => handleModifyAppointmentClick(appointment._id)}>
                                                    <FontAwesomeIcon icon={faEdit} /> Modifier Rendez-vous
                                                </button>
                                            ))}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="alert alert-info text-center">Aucun symptôme enregistré pour ce patient.</div>
                    )}
                </>
            ) : (
                <div className="alert alert-warning text-center">
                    Aucune information trouvée pour ce patient.
                </div>
            )}
        </div>
    );
};

export default InfoPatient;

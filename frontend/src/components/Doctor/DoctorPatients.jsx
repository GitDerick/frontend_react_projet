import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProtectedData } from '../../services/tokenService'; // Assurez-vous d'importer la fonction de rafraîchissement des tokens.
import './DoctorPatients.css'; // Importation du fichier CSS

const DoctorPatients = () => {
    const [symptoms, setSymptoms] = useState([]);
    const [patients, setPatients] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true); // Ajout de l'état de chargement pour une meilleure gestion UX
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSymptoms = async () => {
            setLoading(true); // Début du chargement

            try {
                // Récupérer les symptômes avec la gestion de token
                const response = await fetchProtectedData('http://localhost:5000/doctor/Allsymptoms');
                const fetchedSymptoms = response.symptoms;

                if (!fetchedSymptoms || fetchedSymptoms.length === 0) {
                    throw new Error('Aucun symptôme trouvé');
                }

                setSymptoms(fetchedSymptoms);

                // Récupérer les IDs uniques des patients pour obtenir leurs informations
                const patientIds = [...new Set(fetchedSymptoms.map((s) => s.patient_id))];

                const patientResponses = await Promise.all(
                    patientIds.map((patientId) =>
                        fetchProtectedData(`http://localhost:5000/patients/${patientId}`)
                    )
                );

                // Transformer les réponses patients en un objet de lookup
                const patientsData = {};
                patientResponses.forEach((res) => {
                    patientsData[res.id] = res;
                });

                setPatients(patientsData);
                setLoading(false); // Fin du chargement
            } catch (err) {
                console.error('Erreur lors de la récupération des symptômes:', err.message);
                setError('Erreur lors de la récupération des symptômes ou des informations des patients.');
                setLoading(false); // Fin du chargement malgré l'erreur
            }
        };

        fetchSymptoms();
    }, []);

    const handleRespondClick = (symptomId) => {
        navigate(`/responseDoctor/${symptomId}`);
    };

    const handleProfileClick = (patientId) => {
        navigate(`/infoPatient/${patientId}`);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="doctor-patient-container mt-5">
            <div className="doctor-patient-card shadow-sm p-4 mb-4">
                <h2 className="mb-4 text-center">Liste des symptômes des patients</h2>

                {error && <div className="alert alert-danger">{error}</div>}

                {loading ? (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Chargement...</span>
                        </div>
                    </div>
                ) : symptoms.length > 0 ? (
                    <table className="doctor-patient-table table-hover table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <th>Nom du patient</th>
                                <th>Symptômes</th>
                                <th>Durée</th>
                                <th>Antécédents médicaux</th>
                                <th>Réponse du médecin</th>
                                <th>Date de soumission</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {symptoms.map((symptom) => (
                                <tr key={symptom._id}>
                                    <td>
                                        {patients[symptom.patient_id] ? (
                                            `${patients[symptom.patient_id].first_name} ${patients[symptom.patient_id].last_name}`
                                        ) : (
                                            'Chargement...'
                                        )}
                                    </td>
                                    <td>{symptom.symptoms}</td>
                                    <td>{symptom.duration}</td>
                                    <td>{symptom.medical_history}</td>
                                    <td>
                                        {symptom.doctor_response && symptom.doctor_response.notes ? (
                                            <span>{symptom.doctor_response.notes}</span>
                                        ) : (
                                            <span className="text-muted">Aucune Réponse</span>
                                        )}
                                    </td>
                                    <td>{formatDate(symptom.submitted_at)}</td>
                                    <td>
                                        <button
                                            className="btn btn-success me-2"
                                            onClick={() => handleRespondClick(symptom._id)}
                                        >
                                            Répondre
                                        </button>
                                        <button
                                            className="btn btn-info"
                                            onClick={() => handleProfileClick(symptom.patient_id)}
                                        >
                                            Profil
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="alert alert-info text-center">Aucun symptôme enregistré.</div>
                )}
            </div>
        </div>
    );
};

export default DoctorPatients;

import React, { useState, useEffect } from 'react';
import { fetchProtectedData } from '../../services/tokenService';
import './DoctorAllApp.css'; // Importer le fichier CSS personnalisé

const DoctorAllAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                // Récupérer les rendez-vous du docteur
                const response = await fetchProtectedData('http://localhost:5000/doctor/appointments');
                console.log("Rendez-vous récupérés :", response); // Vérifier si les rendez-vous contiennent les bonnes informations
                
                if (response.length === 0) {
                    throw new Error('Aucun rendez-vous trouvé');
                }

                // Ajouter les symptômes et antécédents médicaux aux rendez-vous
                const appointmentsWithDetails = await Promise.all(
                    response.map(async (appointment) => {
                        try {
                            console.log(`Rendez-vous pour le patient : ${appointment.patient_id}`);

                            const symptomResponse = await fetchProtectedData(
                                `http://localhost:5000/doctor/patient_symptoms/${appointment.patient_id}`
                            );
                            console.log(`Symptômes récupérés pour le patient ${appointment.patient_id} :`, symptomResponse); // Vérifier les données reçues

                            return {
                                ...appointment,
                                symptoms: symptomResponse || [],
                            };
                        } catch (err) {
                            console.error(`Erreur lors de la récupération des symptômes pour le patient ${appointment.patient_id}:`, err);
                            return {
                                ...appointment,
                                symptoms: [],
                            };
                        }
                    })
                );

                console.log("Rendez-vous avec détails :", appointmentsWithDetails); // Vérifier le contenu final des rendez-vous
                setAppointments(appointmentsWithDetails);
                setLoading(false);
            } catch (err) {
                console.error('Erreur lors de la récupération des rendez-vous :', err.message);
                setError('Erreur lors de la récupération des rendez-vous.');
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    // Formater la date pour un affichage convivial
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="container mt-5">
            <div className="appointments-header text-center mb-4">
                <h2 className="text-primary">Mes Rendez-vous</h2>
                <p className="lead">Visualisez tous vos rendez-vous programmés</p>
            </div>

            {/* Affichage des erreurs */}
            {error && <div className="alert alert-danger">{error}</div>}

            {/* Spinner de chargement pendant la récupération des données */}
            {loading ? (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Chargement...</span>
                    </div>
                </div>
            ) : appointments.length > 0 ? (
                <div className="table-responsive">
                    <table className="table table-hover table-bordered table-striped">
                        <thead className="table-dark">
                            <tr>
                                <th>Nom du Patient</th>
                                <th>Date du Rendez-vous</th>
                                <th>Symptômes</th>
                                <th>Antécédents Médicaux</th>
                                <th>Statut</th>
                                <th>Emplacement de l'Hôpital</th>
                                <th>Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((appointment) => (
                                <tr key={appointment._id}>
                                    <td>{appointment.patient_name || 'Nom inconnu'}</td>
                                    <td>{formatDate(appointment.date)}</td>
                                    <td>
                                        {/* Vérifier si la réponse contient plusieurs symptômes et les afficher */}
                                        {appointment.symptoms.length > 0 ? (
                                            appointment.symptoms.slice(0,1).map((symptom, index) => (
                                                <div key={index}>
                                                    <strong>Symptôme:</strong> {symptom.symptoms}<br />
                                                    <strong>Durée:</strong> {symptom.duration}<br />
                                                    <strong>Informations supplémentaires:</strong> {symptom.additional_info || 'Non renseigné'}
                                                </div>
                                            ))
                                        ) : (
                                            <span className="text-muted">Aucun symptôme</span>
                                        )}
                                    </td>
                                    <td>
                                        {/* Afficher les antécédents médicaux si disponibles */}
                                        {appointment.symptoms.length > 0 ? (
                                            appointment.symptoms.map((symptom, index) => (
                                                <div key={index}>
                                                    {symptom.medical_history || 'Pas d’antécédents'}
                                                </div>
                                            ))
                                        ) : (
                                            <span className="text-muted">Pas d’antécédents</span>
                                        )}
                                    </td>
                                    <td>
                                        <span className={`badge ${appointment.status === 'confirmed' ? 'bg-success' : 'bg-warning'}`}>
                                            {appointment.status || 'Non défini'}
                                        </span>
                                    </td>
                                    <td>{appointment.hospital_location || 'Emplacement non défini'}</td>
                                    <td>{appointment.notes || 'Pas de notes'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="alert alert-info text-center">Aucun rendez-vous trouvé.</div>
            )}
        </div>
    );
};

export default DoctorAllAppointments;

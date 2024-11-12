import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const DoctorResponses = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        const patientId = localStorage.getItem('patientId');
        const token = localStorage.getItem('token');

        if (!token) {
          setError("Vous n'êtes pas authentifié");
          setLoading(false);
          return;
        }

        const response = await axios.get(`http://localhost:5000/patient/doctor_response/${patientId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setSymptoms(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Erreur lors de la récupération des symptômes.");
        setLoading(false);
      }
    };

    fetchSymptoms();
  }, []);

  if (loading) {
    return <p className="text-center text-info">Chargement des réponses du docteur...</p>;
  }

  if (error) {
    return <p className="text-center text-danger">{error}</p>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Réponses du Docteur</h2>
      {symptoms.length === 0 ? (
        <p className="text-center text-muted">Aucun symptôme trouvé.</p>
      ) : (
        <div className="row">
          {symptoms.map((symptom, index) => (
            <div className="col-md-6 mb-4" key={symptom._id}>
              <div className="card shadow-sm border-secondary">
                <div className="card-body">
                    
                  <h5 className="card-title">🩺 Symptômes soumis {index + 1}</h5>

                  <p><strong>Symptômes :</strong> {symptom.symptoms}</p>
                  <p><strong>Durée :</strong> {symptom.duration}</p>
                  <p><strong>Historique médical :</strong> {symptom.medical_history || 'Non spécifié'}</p>
                  <p><strong>Informations supplémentaires :</strong> {symptom.additional_info || 'Non spécifié'}</p>
                  <p><strong>Soumis le :</strong> {new Date(symptom.submitted_at).toLocaleDateString()}</p>

                  {symptom.doctor_response && Object.keys(symptom.doctor_response).length > 0 ? (
                    <div className="p-3 my-3 border rounded bg-light">
                      <h6 className="text-primary">📝 Réponse du Docteur :</h6>
                      <p className="mb-2"><span className="badge bg-success">Docteur</span> <strong>{symptom.doctor_response.doctor_name}</strong></p>
                      <p><strong>Instructions :</strong> {symptom.doctor_response.instructions}</p>
                      <p><strong>Notes :</strong> {symptom.doctor_response.notes}</p>
                      <p><strong>Statut :</strong> <span className={`badge ${symptom.doctor_response.status === 'Validé' ? 'bg-success' : 'bg-warning'}`}>
                        {symptom.doctor_response.status}
                      </span></p>
                    </div>
                  ) : (
                    <p><strong>Réponse du docteur :</strong> <span className="text-muted">Aucune réponse.</span></p>
                  )}

                  {symptom.files.length > 0 ? (
                    <div>
                      <h6>📂 Fichiers attachés :</h6>
                      <ul className="list-group list-group-flush">
                        {symptom.files.map((file) => (
                          <li key={file.file_id} className="list-group-item">
                            <a href={`http://localhost:5000/files/${file.file_id}`} target="_blank" rel="noopener noreferrer">
                              {file.filename}
                            </a> (téléversé le {new Date(file.uploadDate).toLocaleDateString()})
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p><strong>Fichiers :</strong> <span className="text-muted">Aucun fichier attaché</span></p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorResponses;

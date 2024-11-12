import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BsFileEarmarkTextFill } from 'react-icons/bs'; // Importation d'une icône
import './MHistory.css'; // Importation du fichier CSS personnalisé

const MedicalHistory = () => {
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMedicalHistory = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          setError("Vous n'êtes pas authentifié");
          setLoading(false);
          return;
        }

        const response = await axios.get('http://localhost:5000/patient/medical_history', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMedicalHistory(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Erreur lors de la récupération de l'historique médical.");
        setLoading(false);
      }
    };

    fetchMedicalHistory();
  }, []);

  if (loading) {
    return <p className="text-center text-primary loading-message">Chargement de l'historique médical...</p>;
  }

  if (error) {
    return <p className="text-danger text-center">{error}</p>;
  }

  return (
    <div className="container mt-5 medical-history-container">
      <h2 className="text-center mb-4 page-title">Historique Médical</h2>
      {medicalHistory.length === 0 ? (
        <p className="text-center no-history-message">Aucun historique médical trouvé.</p>
      ) : (
        <div className="row">
          {medicalHistory.map((entry, index) => (
            <div className="col-md-6 mb-4" key={entry._id}>
              <div className="card medical-card shadow-lg">
                <div className="card-header card-header-custom text-white">
                  <h5 className="card-title">
                    <BsFileEarmarkTextFill className="me-2" /> Symptômes {index + 1}
                  </h5>
                </div>
                <div className="card-body">
                  <p><strong>Symptômes :</strong> {entry.symptoms}</p>
                  <p><strong>Durée :</strong> {entry.duration}</p>
                  <p><strong>Historique médical :</strong> {entry.medical_history || 'Non spécifié'}</p>
                  <p><strong>Informations supplémentaires :</strong> {entry.additional_info || 'Non spécifié'}</p>
                  <p><strong>Soumis le :</strong> {new Date(entry.submitted_at).toLocaleDateString()}</p>

                  {entry.files.length > 0 ? (
                    <>
                      <h6 className="files-title">Fichiers :</h6>
                      <ul className="list-unstyled file-list">
                        {entry.files.map((file) => (
                          <li key={file.file_id}>
                            <a
                              className="file-link"
                              href={`http://localhost:5000/files/${file.file_id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {file.filename}
                            </a>
                            <span className="file-upload-date"> (téléversé le {new Date(file.uploadDate).toLocaleDateString()})</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <p><strong>Fichiers :</strong> Aucun fichier attaché</p>
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

export default MedicalHistory;

import React from 'react';
import { Link } from 'react-router-dom';
import './DashboardMed.css'; // Import du fichier CSS spécifique

const DashboardMedecin = () => {
  return (
    <div className="dashboard-container container mt-5">
      <h1 className="text-center mb-5">Tableau de bord du médecin</h1>
      <div className="row dashboard-row">
        {/* Liste des patients */}
        <div className="col-md-6 mb-4">
          <div className="dashboard-card card shadow-sm">
            <div className="card-body text-center">
              <i className="fas fa-users fa-3x mb-3"></i>
              <h3 className="card-title">
                Liste des patients <span className="badge badge-info ml-2">15</span>
              </h3>
              <p className="card-text">Consultez et gérez la liste de vos patients.</p>
              <Link to="/AllPatientSymptoms" className="btn dashboard-btn">
                Voir les patients
              </Link>
            </div>
          </div>
        </div>

        {/* Gérer les rendez-vous */}
        <div className="col-md-6 mb-4">
          <div className="dashboard-card card shadow-sm">
            <div className="card-body text-center">
              <i className="fas fa-calendar-alt fa-3x mb-3"></i>
              <h3 className="card-title">
                Gérer les rendez-vous <span className="badge badge-warning ml-2">7</span>
              </h3>
              <p className="card-text">Planifiez ou modifiez vos rendez-vous médicaux.</p>
              <Link to="/doctorAppointments" className="btn dashboard-btn">
                Gérer les rendez-vous
              </Link>
            </div>
          </div>
        </div>

        <hr className="dashboard-divider" />

        {/* Voir tous les rendez-vous */}
        <div className="col-md-6 mb-4">
          <div className="dashboard-card card shadow-sm">
            <div className="card-body text-center">
              <i className="fas fa-calendar-check fa-3x mb-3"></i>
              <h3 className="card-title">
                Voir tous vos rendez-vous <span className="badge badge-success ml-2">12</span>
              </h3>
              <p className="card-text">Consultez la liste de tous vos rendez-vous à venir.</p>
              <Link to="/doctorAllAppointments" className="btn dashboard-btn">
                Voir les rendez-vous
              </Link>
            </div>
          </div>
        </div>

        {/* Gérer les consultations à distance */}
        <div className="col-md-6 mb-4">
          <div className="dashboard-card card shadow-sm">
            <div className="card-body text-center">
              <i className="fas fa-laptop-medical fa-3x mb-3"></i>
              <h3 className="card-title">
                Vos consultations <span className="badge badge-primary ml-2">5</span>
              </h3>
              <p className="card-text">Consultez vos consultations à distance avec vos patients.</p>
              <Link to="/doctorAllConsultations" className="btn dashboard-btn">
                Voir les consultations
              </Link>
            </div>
          </div>
        </div>

        <hr className="dashboard-divider" />

        {/* Accéder à MedicalAI */}
        <div className="col-md-6 mb-4">
          <div className="dashboard-card card shadow-sm">
            <div className="card-body text-center">
              <i className="fas fa-robot fa-3x mb-3"></i>
              <h3 className="card-title">
                MedicalAI <span className="badge badge-secondary ml-2">Nouveau</span>
              </h3>
              <p className="card-text">Accédez à MedicalAI pour obtenir des recommandations médicales.</p>
              <Link to="/chatbot" className="btn dashboard-btn">
                Accéder à MedicalAI
              </Link>
            </div>
          </div>
        </div>

        {/* Accéder au ChatBot */}
        <div className="col-md-6 mb-4">
          <div className="dashboard-card card shadow-sm">
            <div className="card-body text-center">
              <i className="fas fa-comments fa-3x mb-3"></i>
              <h3 className="card-title">
                ChatBot <span className="badge badge-dark ml-2">Disponible</span>
              </h3>
              <p className="card-text">Discutez avec notre ChatBot pour des consultations rapides.</p>
              <Link to="/chatbotConv" className="btn dashboard-btn">
                Accéder au ChatBot
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMedecin;

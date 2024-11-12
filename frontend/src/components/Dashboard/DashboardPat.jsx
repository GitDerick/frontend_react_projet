import React from 'react';
import { Link } from 'react-router-dom';
import './DashboardPat.css'; // Fichier CSS spécifique pour le tableau de bord patient

const DashboardPatient = () => {
  return (
    <div className="dashboard-patient-container container mt-5">
      <h1 className="text-center mb-5">Tableau de bord du patient</h1>
      <div className="row dashboard-patient-row">
        {/* Rendez-vous du patient */}
        <div className="col-md-6 mb-4">
          <div className="dashboard-patient-card card shadow-sm">
            <div className="card-body text-center">
              <i className="fas fa-calendar-alt fa-3x mb-3"></i>
              <h3 className="card-title">
                Vos rendez-vous <span className="badge badge-info ml-2">3</span>
              </h3>
              <p className="card-text">Consultez et gérez vos rendez-vous médicaux.</p>
              <Link to="/patientAppointments" className="btn dashboard-patient-btn">
                Voir vos rendez-vous
              </Link>
            </div>
          </div>
        </div>

        {/* Symptômes du patient */}
        <div className="col-md-6 mb-4">
          <div className="dashboard-patient-card card shadow-sm">
            <div className="card-body text-center">
              <i className="fas fa-stethoscope fa-3x mb-3"></i>
              <h3 className="card-title">
                Vos symptômes <span className="badge badge-warning ml-2">5</span>
              </h3>
              <p className="card-text">Soumettez ou consultez vos symptômes médicaux.</p>
              <Link to="/medical-history" className="btn dashboard-patient-btn">
                Gérer vos symptômes
              </Link>
            </div>
          </div>
        </div>

        <hr className="dashboard-patient-divider" />

        {/* Soumettre des symptômes */}
        <div className="col-md-6 mb-4">
          <div className="dashboard-patient-card card shadow-sm">
            <div className="card-body text-center">
              <i className="fas fa-notes-medical fa-3x mb-3"></i>
              <h3 className="card-title">Soumettre vos symptômes</h3>
              <p className="card-text">Envoyez vos symptômes pour obtenir des réponses du docteur.</p>
              <Link to="/submit-symptom" className="btn dashboard-patient-btn">
                Soumettre des symptômes
              </Link>
            </div>
          </div>
        </div>

        {/* Réponses du docteur */}
        <div className="col-md-6 mb-4">
          <div className="dashboard-patient-card card shadow-sm">
            <div className="card-body text-center">
              <i className="fas fa-comments fa-3x mb-3"></i>
              <h3 className="card-title">
                Réponse du docteur <span className="badge badge-success ml-2">2</span>
              </h3>
              <p className="card-text">Consultez les réponses du docteur à vos symptômes.</p>
              <Link to="/patient/doctor_response" className="btn dashboard-patient-btn">
                Voir les réponses
              </Link>
            </div>
          </div>
        </div>

        <hr className="dashboard-patient-divider" />

        {/* Consultations à distance */}
        <div className="col-md-6 mb-4">
          <div className="dashboard-patient-card card shadow-sm">
            <div className="card-body text-center">
              <i className="fas fa-video fa-3x mb-3"></i>
              <h3 className="card-title">
                Consultations à distance <span className="badge badge-primary ml-2">1</span>
              </h3>
              <p className="card-text">Participez à des consultations à distance avec vos docteurs.</p>
              <Link to="/patientConsultations" className="btn dashboard-patient-btn">
                Accéder aux consultations
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPatient;

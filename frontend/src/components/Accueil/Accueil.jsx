import React from 'react';
import './Accueil.css'; // Import du fichier CSS

const Accueil = () => {
  return (
    <div className="home-container">
      {/* Section principale */}
      <div className="jumbotron text-center bg-primary text-white">
        <h1 className="display-4">Bienvenue sur la plateforme de Télémédecine</h1>
        <p className="lead">Connectez-vous avec des médecins, consultez en ligne et suivez vos traitements à distance.</p>
        <a href="/loginPatient" className="btn btn-light btn-lg mx-2">Connexion Patient</a>
        <a href="/loginDoctor" className="btn btn-light btn-lg mx-2">Connexion Médecin</a>
      </div>

      {/* Section des services */}
      <section className="services-section text-center py-5">
        <div className="container">
          <h2 className="mb-5">Nos Services</h2>
          <div className="row">
            <div className="col-md-4">
              <i className="fas fa-stethoscope fa-3x text-primary mb-4"></i>
              <h4>Consultations à Distance</h4>
              <p>Consultez des médecins sans quitter votre domicile.</p>
            </div>
            <div className="col-md-4">
              <i className="fas fa-calendar-alt fa-3x text-primary mb-4"></i>
              <h4>Gestion des Rendez-vous</h4>
              <p>Planifiez et gérez vos rendez-vous médicaux facilement.</p>
            </div>
            <div className="col-md-4">
              <i className="fas fa-file-medical fa-3x text-primary mb-4"></i>
              <h4>Suivi Médical</h4>
              <p>Accédez à vos dossiers médicaux et suivez vos traitements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Témoignages */}
      <section className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-5">Ce que disent nos utilisateurs</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="card shadow">
                <div className="card-body">
                  <p className="card-text">"Un service impeccable, je recommande vivement cette plateforme !"</p>
                  <h5 className="card-title text-primary">- Marie L.</h5>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow">
                <div className="card-body">
                  <p className="card-text">"Facilité d'utilisation et réactivité des médecins, parfait !"</p>
                  <h5 className="card-title text-primary">- Ahmed K.</h5>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow">
                <div className="card-body">
                  <p className="card-text">"La gestion des rendez-vous est très simple et pratique."</p>
                  <h5 className="card-title text-primary">- Sophie B.</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Accueil;

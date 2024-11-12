import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import TargetedNotifications from '../Notification/TargetedNotifications'; // Assure-toi que le chemin du fichier est correct


const Header = () => {
    const navigate = useNavigate();

    // Vérifier si l'utilisateur est connecté
    const isAuthenticated = () => {
        return localStorage.getItem('token') !== null;
    };

    // Récupérer le rôle de l'utilisateur
    const getUserRole = () => {
        return localStorage.getItem('role'); // 'patient' ou 'doctor'
    };

    // Fonction de déconnexion
    const handleLogout = () => {
        localStorage.removeItem('token'); // Supprimer le token
        localStorage.removeItem('role'); // Supprimer le rôle
        navigate('/'); // Rediriger vers la page de connexion
    };

    // Fonction pour rediriger vers la page de modification avec l'ID du patient ou du docteur
    const handleModifyClick = () => {
        const userRole = localStorage.getItem('role'); // Récupérer le rôle depuis le localStorage
        let userId;

        // Vérifier si c'est un patient ou un docteur
        if (userRole === 'patient') {
            userId = localStorage.getItem('patientId'); // Récupérer l'ID du patient
        } else if (userRole === 'doctor') {
            userId = localStorage.getItem('doctorId'); // Récupérer l'ID du docteur
        }

        if (userId) {
            // Rediriger vers la page de mise à jour avec l'ID et le rôle
            if (userRole === 'patient') {
                navigate(`/updatePatient/${userId}`); // Rediriger vers la mise à jour du patient
            } else if (userRole === 'doctor') {
                navigate(`/updateDoctor/${userId}`); // Rediriger vers la mise à jour du docteur
            }
        } else {
            console.error("Aucun ID d'utilisateur trouvé dans localStorage");
        }
    };


    const userRole = getUserRole(); // Obtenir le rôle de l'utilisateur

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                        Plateforme Médicale
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            {/* Onglets accessibles à tous */}
                            <li className="nav-item">
                                <Link className="nav-link" to="/" style={{ fontSize: '1.2rem' }}>Accueil</Link>
                            </li>
                            {!isAuthenticated() && (
                                <>
                                    {/* Menu déroulant pour l'inscription */}
                                    <li className="nav-item dropdown">
                                        <a
                                            className="nav-link dropdown-toggle"
                                            href="#!"
                                            id="navbarDropdown"
                                            role="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                            style={{ fontSize: '1.2rem' }}
                                        >
                                            Inscription
                                        </a>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <li>
                                                {/* Lien pour l'inscription patient */}
                                                <Link className="dropdown-item" to="/registerPatient">
                                                    Inscription Patient
                                                </Link>
                                            </li>
                                            <li>
                                                {/* Lien pour l'inscription docteur */}
                                                <Link className="dropdown-item" to="/registerDoctor">
                                                    Inscription Docteur
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                    {/* Menu déroulant pour le login */}
                                    <li className="nav-item dropdown">
                                        <a
                                            className="nav-link dropdown-toggle"
                                            href="#!"
                                            id="navbarDropdown"
                                            role="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                            style={{ fontSize: '1.2rem' }}
                                        >
                                            Connexion
                                        </a>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            {/* Lien pour le login du patient */}
                                            <li>
                                                <Link className="dropdown-item" to="/loginPatient" style={{ fontSize: '1.4rem' }}>Patient</Link>
                                            </li>
                                            {/* Lien pour le login du docteur */}
                                            <li>
                                                <Link className="dropdown-item" to="/loginDoctor" style={{ fontSize: '1.4rem' }}>Docteur</Link>
                                            </li>
                                        </ul>
                                    </li>
                                </>
                            )}

                            {/* Onglets accessibles uniquement après la connexion */}
                            {isAuthenticated() && userRole === 'patient' && (
                                <>
                                    {/* Menu pour les patients */}
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/patientAppointments" style={{ fontSize: '1.2rem' }}>Vos rendez-vous</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/dashboardPatient" style={{ fontSize: '1.2rem' }}>Tableau de bord</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/medical-history" style={{ fontSize: '1.2rem' }}>Vos symptômes</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/submit-symptom" style={{ fontSize: '1.2rem' }}>Soumettre vos symptômes</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/patient/doctor_response" style={{ fontSize: '1.2rem' }}>Réponse du docteur</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/patientConsultations" style={{ fontSize: '1.2rem' }}>Consultations à distance</Link>
                                        <TargetedNotifications types={['updated_consultation', 'remote_consultation']} />
                                    </li>
                                </>
                            )}
                            {isAuthenticated() && userRole === 'doctor' && (
                                <>
                                    {/* Menu pour les docteurs */}
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/dashboardMedecin" style={{ fontSize: '1.2rem' }}>Tableau de bord</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/AllPatientSymptoms" style={{ fontSize: '1.2rem' }}>Liste des patients</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/doctorAppointments" style={{ fontSize: '1.2rem' }}>Gérer les rendez-vous</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/doctorAllAppointments" style={{ fontSize: '1.2rem' }}>Voir tous vos rendez-vous</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/doctorAllConsultations" style={{ fontSize: '1.2rem' }}>Vos consultations</Link>
                                    </li>
                                    {/* <li className="nav-item">
                                        <Link className="nav-link" to="/docCreateConsultations" style={{ fontSize: '1.2rem' }}>Consultations</Link>
                                    </li> */}
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/chatbot" style={{ fontSize: '1.2rem' }}>MedicalAI</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/chatbotConv" style={{ fontSize: '1.2rem' }}>ChatBot</Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link className="nav-link" to="/doctorListAppointments/:patientId" style={{ fontSize: '1.2rem' }}>Liste RDV</Link>
                                    </li>
                                </>
                            )}

                            {/* Menu déroulant pour le Profil */}
                            {isAuthenticated() && (
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="#!"
                                        id="navbarDropdown"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                        style={{ fontSize: '1.2rem' }}
                                    >
                                        Profil
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li>
                                            {/* Bouton pour Modifier les informations */}
                                            <button className="dropdown-item" onClick={() => handleModifyClick()}>
                                                Modifier
                                            </button>
                                        </li>
                                        <li>
                                            {/* Bouton pour se déconnecter */}
                                            <button className="dropdown-item" onClick={handleLogout}>
                                                Déconnexion
                                            </button>
                                        </li>
                                    </ul>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;

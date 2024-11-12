import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import PatientRegistration from './components/Patient/PatientRegistration';
import PatientLogin from './components/Patient/PatientConnexion';
import UpdatePatientInfo from './components/Patient/PatientUpdate';
import Header from './components/Header/Header';
import MedicalHistory from './components/Patient/MedicalHistory';
import SubmitSymptoms from './components/Patient/SubmitSymptoms';
import PatientDoctorResponse from './components/Patient/PatientDoctorResponse';
import DoctorRegistration from './components/Doctor/DoctorRegistration';
import DoctorLogin from './components/Doctor/DoctorConnexion';
import UpdateDoctor from './components/Doctor/DoctorUpdate';
import AllPatientSymptoms from './components/Doctor/DoctorPatients';
import DoctorResponse from './components/Doctor/DoctorResponse';
import InfoPatient from './components/Doctor/InfoPatient';
import DoctorAppointments from './components/Doctor/DoctorAppointments';
import DoctorListAppointments from './components/Doctor/DoctorListAppointments';
import AddDoctorResponse from './components/Doctor/DocApp2';
import AddDoctorResponse2 from './components/Doctor/DocApp2';
import ScheduleAppointment from './components/Doctor/DocApp2';
import DoctorAllAppointments from './components/Doctor/DoctorAllAppointments';
import CreateRemoteConsultation from './components/Doctor/DoctorCreateConsultations';
import DoctorRemoteConsultations from './components/Doctor/DoctorAllConsultations';
import DoctorUpdateConsultation from './components/Doctor/DoctorUpdateConsultations';
import PatientAppointments from './components/Patient/PatientAppointments';
import DoctorUpdateAppointment from './components/Doctor/DoctorUpdateAppointments';
import ChatBotComponent from './components/Doctor/DoctorChatBot';
import PatientConsultations from './components/Patient/PatientConsultations';
import Chatbot from './components/ChatBot/ChatBot';
import Accueil from './components/Accueil/Accueil';
import DashboardMedecin from './components/Dashboard/DashboardMed';
import DashboardPatient from './components/Dashboard/DashboardPat';


// Composant PrivateRoute pour protéger les routes sensibles
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    // Rediriger en fonction du rôle si le token n'est pas trouvé
    return role === 'doctor' ? <Navigate to="/loginDoctor" /> : <Navigate to="/loginPatient" />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Header />
      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/registerPatient" element={<PatientRegistration />} />
          <Route path="/registerDoctor" element={<DoctorRegistration />} />
          <Route path="/loginPatient" element={<PatientLogin />} />
          <Route path="/loginDoctor" element={<DoctorLogin />} />

          {/* Utilisation de PrivateRoute pour protéger les pages */}
          <Route path="/appointments" element={<PrivateRoute><Appointments /></PrivateRoute>} />
          <Route path="/dashboardMedecin" element={<PrivateRoute><DashboardMedecin /></PrivateRoute>} />
          <Route path="/dashboardPatient" element={<PrivateRoute><DashboardPatient /></PrivateRoute>} />
          <Route path="/updatePatient/:patientId" element={<PrivateRoute><UpdatePatientInfo /></PrivateRoute>} />
          <Route path="/updateDoctor/:doctorId" element={<PrivateRoute><UpdateDoctor /></PrivateRoute>} />
          <Route path="/medical-history" element={<PrivateRoute><MedicalHistory /></PrivateRoute>} />
          <Route path="/submit-symptom" element={<PrivateRoute><SubmitSymptoms /></PrivateRoute>} />
          <Route path="/patient/doctor_response" element={<PrivateRoute><PatientDoctorResponse /></PrivateRoute>} />
          <Route path="/AllPatientSymptoms" element={<PrivateRoute><AllPatientSymptoms /></PrivateRoute>} />
          <Route path="/responseDoctor/:symptomId" element={<PrivateRoute><DoctorResponse /></PrivateRoute>} />
          <Route path="/infoPatient/:patientId" element={<PrivateRoute><InfoPatient /></PrivateRoute>} />
          <Route path="/patientConsultations" element={<PrivateRoute><PatientConsultations /></PrivateRoute>} />

          <Route path="/doctorAppointments" element={<PrivateRoute><DoctorAppointments /></PrivateRoute>} />
          <Route path="/doctorAllAppointments" element={<PrivateRoute><DoctorAllAppointments /></PrivateRoute>} />
          <Route path="/docAppointment/:patientId/:submissionId" element={<PrivateRoute>< ScheduleAppointment/></PrivateRoute>} />
          <Route path="/doctorListAppointments/:patientId" element={<PrivateRoute><DoctorListAppointments /></PrivateRoute>} />
          <Route path="/docUpdateAppointment/:patientId/:appointmentId" element={<PrivateRoute>< DoctorUpdateAppointment/></PrivateRoute>} />
          <Route path="/patientAppointments" element={<PrivateRoute><PatientAppointments /></PrivateRoute>} />

          <Route path="/docCreateConsultations" element={<PrivateRoute>< CreateRemoteConsultation/></PrivateRoute>} />
          <Route path="/doctorAllConsultations" element={<PrivateRoute>< DoctorRemoteConsultations/></PrivateRoute>} />
          <Route path="/doctorUpdateConsultations/:consultationId" element={<PrivateRoute>< DoctorUpdateConsultation/></PrivateRoute>} />

          <Route path="/chatbot" element={<PrivateRoute><ChatBotComponent /></PrivateRoute>} />
          <Route path="/chatbotConv" element={<PrivateRoute><Chatbot /></PrivateRoute>} />
          
        </Routes>
      </div>
    </Router>
  );
}

// // Composant pour la page d'accueil
// const Home = () => {
//   return (
//     <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
//       <div className="text-center">
//         <h1 className="my-4">Bienvenue sur la plateforme médicale</h1>
//         <p className="lead">Veuillez vous inscrire ou vous connecter pour continuer.</p>
//       </div>
//     </div>
//   );
// };

// Composants pour les autres pages (exemple)
const Appointments = () => <h2>Page des Rendezvous</h2>;
// const Dashboard = () => <h2>Tableau de bord</h2>;

export default App;

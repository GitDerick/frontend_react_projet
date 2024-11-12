import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dropdown, Badge } from 'react-bootstrap';
import './Notifications.css';  // Importer un fichier CSS pour la personnalisation

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [error, setError] = useState('');

    // Fonction pour récupérer les notifications du patient
    const fetchNotifications = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/patient/notifications', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setNotifications(response.data);
            setUnreadCount(response.data.length);  // Compter les notifications non lues
        } catch (err) {
            setError('Erreur lors de la récupération des notifications.');
            console.error(err);
        }
    };

    // Marquer une notification comme lue
    const markAsRead = async (notificationId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:5000/patient/notifications/${notificationId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setNotifications(notifications.filter(n => n._id !== notificationId));  // Supprimer la notification lue de l'affichage
            setUnreadCount(unreadCount - 1);  // Diminuer le nombre de notifications non lues
        } catch (err) {
            console.error('Erreur lors de la mise à jour de la notification.', err);
        }
    };

    useEffect(() => {
        fetchNotifications();  // Récupérer les notifications au montage du composant
    }, []);

    return (
        <div className="notifications-container">
            {error && <div className="alert alert-danger">{error}</div>}

            <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                    <i className="bi bi-bell-fill"></i>
                    {unreadCount > 0 && <Badge bg="danger" className="badge-position">{unreadCount}</Badge>}
                </Dropdown.Toggle>

                <Dropdown.Menu className="notifications-dropdown">
                    {notifications.length > 0 ? (
                        notifications.map(notification => (
                            <Dropdown.Item key={notification._id} onClick={() => markAsRead(notification._id)}>
                                <div className="notification-item">
                                    <p>{notification.message}</p>
                                    <small className="text-muted">Type: {notification.notification_type}</small>
                                </div>
                            </Dropdown.Item>
                        ))
                    ) : (
                        <Dropdown.Item>
                            <div className="notification-item">
                                <p>Aucune nouvelle notification</p>
                            </div>
                        </Dropdown.Item>
                    )}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

export default Notifications;

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Badge } from 'react-bootstrap';
import { BsBellFill } from 'react-icons/bs';  // Utilisation de l'icône de cloche pour les notifications
import './TargetedNotifications.css'; // Fichier CSS personnalisé

const TargetedNotifications = ({ types }) => {
    const [hasNotifications, setHasNotifications] = useState(false);

    // Fonction pour marquer les notifications comme lues
    const markNotificationsAsRead = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const response = await axios.get(`http://localhost:5000/patient/notifications`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Filtrer les notifications non lues en fonction des types
            const filteredNotifications = response.data.filter(
                (notification) => types.includes(notification.notification_type) && !notification.read
            );

            // Marquer chaque notification comme lue
            for (let notification of filteredNotifications) {
                await axios.put(`http://localhost:5000/patient/notifications/${notification._id}`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            }

            // Mettre à jour l'état pour retirer l'icône
            setHasNotifications(false);
        } catch (error) {
            console.error('Erreur lors du marquage des notifications comme lues:', error);
        }
    }, [types]);  // Utilisation de `useCallback` pour mémoriser la fonction

    useEffect(() => {
        // Fonction pour récupérer les notifications non lues
        const fetchNotifications = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                // Récupérer les notifications du patient
                const response = await axios.get(`http://localhost:5000/patient/notifications`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Filtrer les notifications selon les types spécifiés et non lues
                const filteredNotifications = response.data.filter(
                    (notification) => types.includes(notification.notification_type) && !notification.read
                );

                // Vérifier s'il y a des notifications non lues
                setHasNotifications(filteredNotifications.length > 0);
            } catch (error) {
                console.error('Erreur lors de la récupération des notifications:', error);
            }
        };

        fetchNotifications();
    }, [types]);

    useEffect(() => {
        // Marquer les notifications comme lues lorsque l'utilisateur visite la page
        if (hasNotifications) {
            markNotificationsAsRead();
        }
    }, [hasNotifications, markNotificationsAsRead]);

    return (
        <>
            {/* Afficher un badge si des notifications existent */}
            <div className="notification-container">
                <BsBellFill className="notification-icon" />
                {hasNotifications && (
                    <Badge pill bg="danger" className="notification-badge">
                        1
                    </Badge>
                )}
            </div>
        </>
    );
};

export default TargetedNotifications;

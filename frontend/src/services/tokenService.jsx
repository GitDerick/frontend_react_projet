import axios from 'axios';

/**
 * Fonction pour rafraîchir le token d'accès.
 * Elle utilise le token de rafraîchissement stocké dans localStorage.
 * @returns {string|null} Le nouveau token d'accès ou null si le rafraîchissement échoue.
 */
export const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken'); // Récupérer le token de rafraîchissement

    if (!refreshToken) {
        console.error("Aucun token de rafraîchissement disponible");
        return null;
    }

    try {
        const response = await axios.post('http://localhost:5000/doctor/refresh', {
            refresh_token: refreshToken
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const newAccessToken = response.data.access_token;
        localStorage.setItem('token', newAccessToken); // Mettre à jour le token d'accès dans le localStorage
        return newAccessToken;
    } catch (error) {
        console.error("Erreur lors du rafraîchissement du token", error);
        return null;
    }
};

/**
 * Fonction pour effectuer une requête sécurisée avec vérification et rafraîchissement du token si nécessaire.
 * @param {string} url - L'URL de l'API à interroger.
 * @returns {Promise<any>} Les données récupérées ou une erreur si la requête échoue.
 */
export const fetchProtectedData = async (url) => {
    let token = localStorage.getItem('token'); // Récupérer le token d'accès

    if (!token) {
        console.error("Aucun token disponible");
        return;
    }

    try {
        // Essayer la requête avec le token d'accès actuel
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;

    } catch (error) {
        // Si le token a expiré (erreur 401)
        if (error.response && error.response.status === 401) {
            console.warn("Token expiré, tentative de rafraîchissement");

            const newToken = await refreshAccessToken(); // Rafraîchir le token

            if (newToken) {
                // Réessayer la requête avec le nouveau token
                const retryResponse = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${newToken}`
                    }
                });
                return retryResponse.data;
            } else {
                console.error("Échec du rafraîchissement du token");
            }
        } else {
            console.error("Erreur lors de la requête", error);
            throw error; // Propager l'erreur si elle n'est pas liée au token
        }
    }
};

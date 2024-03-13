/**
 * class objet Permettant de faire les appels API
 */

class Api {

    //url pour faire les requêtes
    #urlReq;

    //valeur de la recherche
    #query;

    /**
     * constructeur de l'objet API
     */
    constructor() {
        this.#urlReq = "https://api.chucknorris.io/jokes/search?query="
    }
    
    /**
     * permet de rechercher des blagues via un appel à l'api
     * @param {*} query la recherche saisie par l'utilisateur
     */
    async searchJokes(query) {
        /*
        try {
            // Construire l'URL complète en ajoutant la requête à l'URL de base
            const url = chuckNorrisAPIURL + encodeURIComponent(query);
            
            // Effectuer la requête avec fetch() et attendre la réponse
            const response = await fetch(url);
    
            // Vérifier si la réponse est réussie (code 200)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            // Convertir la réponse JSON et attendre le résultat
            const data = await response.json();
            
            // Traiter les données JSON ici
            console.log(data);
            
            // Retourner les données si nécessaire
            return data;
        } catch (error) {
            // Gérer les erreurs
            console.error('There was a problem with the fetch operation:', error);
            // Vous pouvez choisir de retourner une valeur par défaut ou de relancer l'erreur
            throw error;
        }
        */
    }


}
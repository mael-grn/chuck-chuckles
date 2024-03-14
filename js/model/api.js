/**
 * class objet Permettant de faire les appels API
 */

class Api {

    //url pour faire les requêtes
    #urlReq;

    //valeur de la recherche
    #query;

    //Liste des dernière recherches
    #latestQuery;

    /**
     * constructeur de l'objet API
     */
    constructor(query = "") {
        this.#urlReq = "https://api.chucknorris.io/jokes/search?query="
        this.#latestQuery = [];
        this.updateQuery(query);
    }
    
    /**
     * permets de mettre à jour la recherche la query de recherche de l'utilsateur
     * @param {*} query 
     */
    updateQuery(query) {
        this.#query = query;
        this.#latestQuery.push(query);
    }

    /**
     * permets de recuperer l'historique des recherche
     * @returns un tableau des dernières recherches
     */
    getHistory() {
        return this.#latestQuery;
    }

    /**
     * permets de supprimer l'historique
     */
    clearHistory() {
        this.#latestQuery = [];
    }
    
    /**
     * envoi une requete à l'API pour recherche une blague
     * la valeur de query doit etre mis à jour avec la valeur de la recherche
     * @returns les données de la blague au format JSON
     */
    async #fetchData() {
        
        try {

            //on récupère les données
            const url = this.#urlReq + encodeURIComponent(this.#query);
            const response = await fetch(url);

            //on traite le cas d'erreur
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }

    /**
     * permet de rechercher des blagues via un appel à l'api
     * retourne un objet joke
     * @param {*} query la recherche saisie par l'utilisateur
     */
    async searchJoke(query) {

        //on mets à jour la query dans le modèle
        this.updateQuery(query);
        try {

            //on effectue la requete pour recuperer les données
            let data = await fetchData();

            //si aucune données récupérées, alors on renvoie une fausse blague comportant un message d'erreur
            if (data.total == 0) {
                return new Joke(-1, -1, "Aucune blague n'a été trouvée");
            } else {
                //si des blagues sont trouvées, on parcours la liste de blague, on créé objets et on les ajoutes à une liste
                let jokeList = [];
                data.result.forEach(element => {
                    let joke = new Joke(element.id, element.created_at, element.value);
                    jokeList.push(joke);
                });
                return jokeList;
            }
        } catch (error) {

            //en cas d'erreur, un renvoi une blague factice contenant le message d'erreur
            return new Joke(-1, -1, "Une erreur s'est produite");
        }
    }

}
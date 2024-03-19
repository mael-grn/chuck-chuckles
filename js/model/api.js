import Joke from './joke.js';

/**
 * class objet Permettant de faire les appels API
 */

class Api {

    //url pour faire les requêtes
    #urlReq;

    //url pour les requetes de traductions
    #urlTranslate;

    //valeur de la recherche
    #query;

    //Liste des dernière recherches
    #latestQuery;

    /**
     * constructeur de l'objet API
     */
    constructor(query = "") {
        this.#urlReq = "https://api.chucknorris.io/jokes/search?query="
        this.#urlTranslate = "https://api-free.deepl.com/v2/translate"
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
     * Envoi un requete à l'API gratuite de DeepL, pour traduire la blague
     */
    async #fetchTranslate(text) {
        try {
            //Cette clé sera rapidement innactive et donc inutilisable
            const apiKey = 'cc2ec096-a10d-4773-9a1a-a011630a762b:fx';
            const targetLang = 'FR';
            

            const formData = new URLSearchParams({
                'text': text,
                'target_lang': targetLang
            });


    
            const response = await fetch(this.#urlTranslate, {
                method: 'POST',
                headers: {
                    'Authorization': 'DeepL-Auth-Key ' + apiKey,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData
            });

            console.log(response);
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

    
            const data = await response.json();
            console.log(response);

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
    searchJoke(query) {

        //on mets à jour la query dans le modèle
        this.updateQuery(query);

        //on retourne une promesse directement
        return new Promise((resolve, reject) => {
            this.#fetchData()
                .then(data => {
                    if (data.total == 0) {
                        resolve([new Joke(-1, "Aucune blague n'a été trouvée")]);
                    } else {
                        let jokeList = [];
                        let counter = 1;
                        data.result.forEach(element => {
                            let joke = new Joke(element.id, element.value, element.created_at, "Joke "+counter);
                            jokeList.push(joke);
                            counter++;
                        });
                        resolve(jokeList);
                    }
                })
                .catch(error => {
                    //en cas d'erreur, un renvoi une blague factice contenant le message d'erreur
                    resolve([new Joke(-1, "Une erreur s'est produite")]);
                });
        });
    }

    /**
     * Permet de traduire le texte d'une blague
     */
    translate(text) {
        //on retourne une promesse directement
        return new Promise((resolve, reject) => {
            this.#fetchTranslate(text)
                .then(data => {
                    resolve(data);
                    
                })
                .catch(error => {
                    //en cas d'erreur, un renvoi une blague factice contenant le message d'erreur
                    resolve("Une erreur s'est produite");
                });
        });
    }



}

export default Api;
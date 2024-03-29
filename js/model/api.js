import Joke from './joke.js';

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
        this.#urlReq = "https://api.chucknorris.io/jokes"
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
            const url = this.#urlReq + "/search?query=" + encodeURIComponent(this.#query);

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
     * envoi une requete à l'API pour recuperer les catégories
     * @returns les données des catégories sont au format JSON
     */
    async #fetchCategory() {
        try {

            //on récupère les données
            const url = this.#urlReq + "/categories";

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
     * envoi une requete à l'API pour recuperer une blague aleatoire à partir d'une catégorie
     * @returns les données des catégories sont au format JSON
     */
    async #fetchDataFromCategorie(categorie) {
        try {

            //on récupère les données
            const url = this.#urlReq + "/random?category=" + categorie;

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
                            let joke = new Joke(element.id, element.value, element.created_at, element.value.substring(0, 20)+"...");
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
     * permets de recuperer les catégories
     * @returns un tableau de strings
     */
    getCategories() {
        //on retourne une promesse directement

        
        return new Promise((resolve, reject) => {
            this.#fetchCategory()
                .then(data => {
                    if (data.total == 0) {
                        resolve(["Aucune catégorie trouvée"]);
                    } else {
                        let catList = [];
                        data.forEach(element => {
                            catList.push(element);
                        });
                        resolve(catList);
                    }
                })
                .catch(error => {

                    //en cas d'erreur, un renvoi une blague factice contenant le message d'erreur
                    resolve(["Une erreur s'est produite"]);
                });
        });
    }

    /**
     * permet de rechercher aleatoirement une blagues via un appel à l'api
     * retourne un objet joke
     * @param {*} categorie la categorie saisie par l'utilisateur
     */
    getRandomFromCat(categorie) {

        //on retourne une promesse directement
        return new Promise((resolve, reject) => {
            this.#fetchDataFromCategorie(categorie)
                .then(data => {
                    if (data.total == 0) {
                        resolve([new Joke(-1, "Aucune blague n'a été trouvée")]);
                    } else {
                        let joke = new Joke(data.id, data.value, data.created_at, categorie);
                        
                        resolve(joke);
                    }
                })
                .catch(error => {
                    //en cas d'erreur, un renvoi une blague factice contenant le message d'erreur
                    resolve([new Joke(-1, "Une erreur s'est produite")]);
                });
        });
    }



}

export default Api;
/**
 * classe modèle pour les blagues sur chuck norris renvoyés par l'API
 */
class Joke {

    //identifiant de la blague
    #id;

    //date de creation de la blague
    #dateCreation;

    //la blague elle-meme
    #content;

    /**
     * constructeur de la classe
     * @param {*} joke : la blague au format json
     */
    constructor(joke) {
        this.#id = joke.id;
        this.#dateCreation = joke.created_at;
        this.#content = joke.value;
    }

    /**
     * 
     * @returns l'id de la blague
     */
    getId() {
        return this.#id;
    }

    /**
     * 
     * @returns la date de création de la blague
     */
    getDateCreation() {
        return this.#dateCreation;
    }

    /**
     * 
     * @returns le blague elle meme
     */
    getContent() {
        return this.#content;
    }

    /**
     * 
     * @returns l'url pour acceder directement à la blague
     */
    getUrl() {
        return "https://api.chucknorris.io/jokes/" + this._id;
    }


}
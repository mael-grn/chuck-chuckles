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

    #title

    /**
     * constructeur de la classe
     */
    constructor(id, content, dateCreation = "", title) {
        this.#id = id;
        this.#dateCreation = dateCreation;
        this.#content = content;
        this.#title = title;
    }

    /**
     * 
     * @returns l'id de la blague
     */
    getId() {
        return this.#id;
    }

    getTitle() {
        return this.#title;
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

export default Joke;
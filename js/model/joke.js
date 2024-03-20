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
     * permets d'ajouter la blague aux favoris
     */
    addToFavorites() {
        let jokeList = JSON.parse(localStorage.getItem("favJokes")) || [];

        let joke = {
            id: this.#id,
            title: this.#title, 
            content: this.#content, 
            dateCreation: this.#dateCreation 
        };

        jokeList.push(joke);
        localStorage.setItem("favJokes", JSON.stringify(jokeList));
    }

    /**
     * remove la blague des favoris
     */
    removeFromFavorites() {
        let jokeList = JSON.parse(localStorage.getItem("favJokes")) || [];

        const index = jokeList.findIndex(item => item.id === this.#id);

        if (index !== -1) {
            jokeList.splice(index, 1);
        }

        localStorage.setItem("favJokes", JSON.stringify(jokeList));
    }

    /**
     * retourne si la blague est une blague favorite
     */
    isFavorite() {
        let jokeList = JSON.parse(localStorage.getItem("favJokes")) || [];
        return jokeList.findIndex(item => item.id === this.#id) != -1;
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
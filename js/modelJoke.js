/**
 * classe modèle pour les blagues sur chuck norris renvoyés par l'API
 */
class Joke {

    //identifiant de la blague
    _id;

    //date de creation de la blague
    _dateCreation;

    //la blague elle-meme
    _content;

    /**
     * constructeur de la classe
     * @param {*} joke : la blague au format json
     */
    constructor(joke) {
        this._id = joke.id;
        this._dateCreation = joke.created_at;
        this._content = joke.value;
    }

    getUrl() {
        return "https://api.chucknorris.io/jokes/" + this._id;
    }
}
import Joke from "./model/joke.js";
/**
 * ce fichier permets de generer plusieurs type d'elements html, en vu de les integrer dans la page web si necessaire
 */


/**
 * permets de creer la tuile d'affichage d'une blague
 * @param {*} joke 
 */
export function generateJokeElement(joke) {
    //div parent de l'element
    let divElement = document.createElement('section');
    divElement.setAttribute('class', 'res joke '+joke.getId());

    //contenu de la div
    let pElement = document.createElement('p');
    pElement.innerText = joke.getContent();
    pElement.setAttribute('class', 'joke-content');
    divElement.appendChild(pElement);

    //date de la div
    let dateElement = document.createElement('p');
    dateElement.innerText = joke.getDateCreation();
    dateElement.setAttribute('class', 'joke-date');
    divElement.appendChild(dateElement);

    return divElement;
}
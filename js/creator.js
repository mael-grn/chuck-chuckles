import Joke from "./model/joke.js";
import Api from "./model/api.js";

const api = new Api();

/**
 * Cette fonction génère un élément HTML représentant une blague.
 * @param {*} joke - L'objet blague à afficher.
 * @returns {HTMLElement} - L'élément HTML représentant la blague.
 */

let numBlagues = 0; // Initialisation du nombre de blagues

export function generateJokeElement(joke) {
  // Création de l'élément div parent
  let divElement = document.createElement("div");
  divElement.setAttribute("class", "card");


  // Création de la div textBox
  let textBoxDivElement = document.createElement("div");
  textBoxDivElement.setAttribute("class", "textBox");
  divElement.appendChild(textBoxDivElement);

  // Création de la div textContent
  let textContentDivElement = document.createElement("div");
  textContentDivElement.setAttribute("class", "textContent");
  textBoxDivElement.appendChild(textContentDivElement);

  // Création du titre avec un numéro incrémentiel
  let titleParagraphElement = document.createElement("p");
  titleParagraphElement.setAttribute("class", "h1");
  titleParagraphElement.innerText = joke.getTitle(); // Le numéro s'incrémente à chaque nouvelle blague
  textContentDivElement.appendChild(titleParagraphElement);

  // Création du span pour la date
  let heartElement = document.createElement("img");
  heartElement.setAttribute("class", "imgheart");
  if (joke.isFavorite()) {
    heartElement.setAttribute("src", "images/heart_full.png")
  } else {
    heartElement.setAttribute("src", "images/heart_empty.png")
  }
  heartElement.addEventListener("click", () => {
    if (joke.isFavorite()) {
      joke.removeFromFavorites();
      heartElement.setAttribute("src", "images/heart_empty.png")
    } else {
      joke.addToFavorites();
      heartElement.setAttribute("src", "images/heart_full.png")
    }
  })
  textContentDivElement.appendChild(heartElement);

  // Création du paragraphe pour le contenu de la blague
  let jokeParagraphElement = document.createElement("p");
  jokeParagraphElement.setAttribute("class", "p");
  jokeParagraphElement.innerText = joke.getContent();
  textBoxDivElement.appendChild(jokeParagraphElement);

  return divElement;
}

export function generateCategeorieElement(nomCat) {

  let option = document.createElement("option");
  option.text = nomCat;
  return option;

  
}
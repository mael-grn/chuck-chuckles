import Joke from "./model/joke.js";

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
  let dateSpanElement = document.createElement("span");
  dateSpanElement.setAttribute("class", "span");
  dateSpanElement.innerText = "Remplacer par les icones"; // Vous pouvez remplacer "Just Now" par la date de création de la blague si nécessaire
  textContentDivElement.appendChild(dateSpanElement);

  // Création du paragraphe pour le contenu de la blague
  let jokeParagraphElement = document.createElement("p");
  jokeParagraphElement.setAttribute("class", "p");
  jokeParagraphElement.innerText = joke.getContent();
  textBoxDivElement.appendChild(jokeParagraphElement);

  return divElement;
}

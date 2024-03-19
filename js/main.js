import Api from "./model/api.js";
import view from "./view.js";
import { generateJokeElement } from "./creator.js";

const api = new Api();

/**
 * permets d'afficher les resultats dans la page web
 * @param {*} result une liste de blague à afficher
 */
function displayResult(result) {
  //pour chaque blague
  //on supprime le resultat précedent
  while (view.blocResultat.firstChild) {
    view.blocResultat.removeChild(view.blocResultat.firstChild);
  }
  result.forEach((joke) => {
    //on genere l'element html de la blague
    let jokeElement = generateJokeElement(joke);
    //on l'affiche
    view.blocResultat.appendChild(jokeElement);
  });
}

/**
 * listener d'evenement de click sur le bouton de recherche
 */
view.btnRecherche.addEventListener("click", () => {
  var inputValue = document.getElementById("input-text-response").value;
  console.log("input value : " + inputValue);

  view.loadingImage.classList.add("loading-visible");

  //on effectue le recherche et on affiche les resultats
  api.searchJoke(inputValue).then((jokes) => {
    view.loadingImage.classList.remove("loading-visible");
    displayResult(jokes);
  });
});

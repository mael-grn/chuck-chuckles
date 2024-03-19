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
 * listener d'evenement de click sur le bouton de recherche s'il est disponible à l'ecran
 */
if (view.btnRecherche) {
  view.btnRecherche.addEventListener("click", () => {
    var inputValue = document.getElementById("input-text-response").value;
    console.log("input value : " + inputValue);
  
    view.loadingImage.classList.add("loading-visible");
  
    //on effectue le recherche et on affiche les resultats
    api.searchJoke(inputValue).then((jokes) => {
      view.loadingImage.classList.remove("loading-visible");
      displayResult(jokes);
    });

    api.translate("Hello my friend").then((trans) => {
      console.log(trans);
    });

  });
}


/**
     * permet de determiner un element html est affiché sur l'ecran
     * @param {*} element 
     * @returns un boulean indiquand si l'element est affiché
     */
function isOnScreen(element) {
        
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  return (rect.bottom <= (windowHeight+rect.height-300));
}

/**
* permet de faire une animation pour afficher un element à l'ecran, selon si il est censé etre affiché
* Pour cela, ajoute la classe visible quand necessaire
* @param {*} element 
*/
function appearsOnScroll(element) {
  
  if (isOnScreen(element) && !element.classList.contains("visible")) {
      element.classList.add("visible");
  }
}

/**
 * Pour chaques elements ayant la classe appears on scroll, on les faits apparaitre lorsqu'il arrivent au niveau de l'ecran
 */
window.addEventListener("scroll", function() {
  view.appearsOnScroll.forEach((element) => {
    appearsOnScroll(element);
  });
});

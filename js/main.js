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
  return rect.bottom <= windowHeight + rect.height - 300;
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
window.addEventListener("scroll", function () {
  view.appearsOnScroll.forEach((element) => {
    appearsOnScroll(element);
  });
});

view.btnFavoris.addEventListener("click", () => {
  const imgSrc = view.etoileImg.getAttribute("src");
  if (imgSrc === "images/star-vide.png") {
    view.etoileImg.setAttribute("src", "images/star-pleine.png");
    view.btnFavoris.setAttribute("title", "Retirer la recherche des favoris");

    var inputTextResponse = document.getElementById("input-text-response");
    var texteInput = inputTextResponse.value;

    if (texteInput.trim() !== "") {
      var nouvelElement = createListItem(texteInput);

      var listeFavoris = document.getElementById("liste-favoris");
      listeFavoris.appendChild(nouvelElement);
    }

    function createListItem(text) {
      var nouvelElement = document.createElement("li");
      nouvelElement.textContent = text;
      nouvelElement.classList.add("favoris-item"); // Ajouter une classe CSS

      var imgSuppression = document.createElement("img");
      imgSuppression.src = "images/croix.svg";
      imgSuppression.alt = "Icone pour supprimer le favori";
      imgSuppression.width = "15";
      imgSuppression.title = "Cliquer pour supprimer le favori";
      imgSuppression.addEventListener("click", () => {
        nouvelElement.remove();
      });

      nouvelElement.appendChild(imgSuppression);

      return nouvelElement;
    }
  } else {
    view.etoileImg.setAttribute("src", "images/star-vide.png");
    view.btnFavoris.setAttribute("title", "Ajouter la recherche aux favoris");

    var listeFavoris = document.getElementById("liste-favoris");
    var nouvelElement = listeFavoris.firstElementChild;
    if (nouvelElement) {
      // Vérifier s'il y a un élément à supprimer
      nouvelElement.remove();
    }
  }
});

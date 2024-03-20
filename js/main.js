import Api from "./model/api.js";
import view from "./view.js";
import { generateJokeElement, generateCategeorieElement } from "./creator.js";

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
    let inputValue = view.inputRecherche.value;
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




/**
 * Ajouter des elements aux favoris au clique
 */
if (view.btnFavoris) {

  //listener du bouton "favoris"
  view.btnFavoris.addEventListener("click", () => {
    let favoris = JSON.parse(localStorage.getItem("favoris")) || [];
    
    //si l'element est deja dans les favoris, on le supprime
    if (favoris.includes(view.inputRecherche.value)) {
      view.etoileImg.setAttribute("src", "images/star-vide.png");
      view.btnFavoris.setAttribute("title", "Ajouter la recherche aux favoris");
      favoris = favoris.filter(function(element) {
        return element !== view.inputRecherche.value;
      });
      localStorage.setItem("favoris", JSON.stringify(favoris));
      updateFavouriteList()

      //si l'element n'est pas dans les favoris, on l'ajoute
    } else {
      view.etoileImg.setAttribute("src", "images/star-pleine.png");
      view.btnFavoris.setAttribute("title", "Retirer la recherche des favoris");
      favoris.push(view.inputRecherche.value);
      localStorage.setItem("favoris", JSON.stringify(favoris));
        updateFavouriteList()
    }
  });
}

/**
 * permets de mettre à jours la liste de favoris 
 */
function updateFavouriteList() {

  //on enleve les elements deja existants
  while (view.listeFavoris.firstChild) {
    view.listeFavoris.removeChild(view.listeFavoris.firstChild);
  }
  let favoris = JSON.parse(localStorage.getItem("favoris")) || [];
  
  //on ajoute chaque element
  favoris.forEach((element) => {
    let nouvelElement = document.createElement("li");
    nouvelElement.textContent = element;
    nouvelElement.classList.add("favoris-item"); // Ajouter une classe CSS

    nouvelElement.addEventListener("click", () => {
        view.inputRecherche.value = element;
    })

    let imgSuppression = document.createElement("img");
    imgSuppression.src = "images/croix.svg";
    imgSuppression.alt = "Icone pour supprimer le favori";
    imgSuppression.width = "15";
    imgSuppression.title = "Cliquer pour supprimer le favori";
    imgSuppression.addEventListener("click", () => {
      favoris = favoris.filter(function(fav) {
        return fav !== element;
      });
      localStorage.setItem("favoris", JSON.stringify(favoris));
      updateFavouriteList()
    });

    nouvelElement.appendChild(imgSuppression);
    view.listeFavoris.appendChild(nouvelElement);
  })
}
//on appelle la fonction au chargement de la page, pour que les favoris soient récupérés dans le localstorage et affichés dès le chargement
if (view.blocResultat) {
  updateFavouriteList();
}

/**
 * listener d'appuis d'une touche dans le champs de recherche, pour mettre à jour dynamiquement l'etoile des favoris
 */

if (view.inputRecherche) {
  view.inputRecherche.addEventListener("keyup", () => {

    let favoris = JSON.parse(localStorage.getItem("favoris")) || [];
  
    if (!favoris.includes(view.inputRecherche.value)) {
      view.etoileImg.setAttribute("src", "images/star-vide.png");
      view.btnFavoris.setAttribute("title", "Ajouter la recherche aux favoris");
    } else {
      view.etoileImg.setAttribute("src", "images/star-pleine.png");
      view.btnFavoris.setAttribute("title", "Retirer la recherche des favoris");
    }
  })
}

/**
 * permets l'affichage des catégories, seulement si la page actuelle est la page des catégories
 */
if (view.blocCategories) {

  /*
  api.getCategories().then((data) => {
    data.forEach((category) => {
      view.blocCategories.appendChild(generateCategeorieElement(category));
    })
  })
  */
  
  //malgré le fait que l'appel à l'api ci dessus pour les catégories est fonctionnel, à des fin de developpement, il est preferable de tester sur une liste local
  
  ["animal","career","celebrity","dev","explicit","fashion","food","history","money","movie","music","political","religion","science","sport","travel"].forEach((category) => {
    view.blocCategories.appendChild(generateCategeorieElement(category));
  })
  
}




import Api from "./model/api.js";
import view from "./view.js";
import { generateJokeElement, generateCategeorieElement } from "./creator.js";
import Joke from "./model/joke.js";

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

    //cas ou il y a une erreur
    if (joke.getId() < 0) {
      jokeElement = document.createElement("p");
      jokeElement.textContent = joke.getContent();
    }
    //on l'affiche
    view.blocResultat.appendChild(jokeElement);
  });
}

/**
 * listener d'evenement de click sur le bouton de recherche s'il est disponible à l'ecran
 */
if (view.btnRecherche) {
  view.btnRecherche.addEventListener("click", () => {
    searchJoke();
  });

  // Écoute de l'événement "keypress" sur le champ de recherche
  view.inputRecherche.addEventListener("keypress", (event) => {
    // Vérification si la touche pressée est "Entrée" (code 13)
    if (event.key === "Enter") {
      searchJoke();
    }
  });

  // Fonction pour effectuer la recherche et afficher les résultats
  function searchJoke() {
    let inputValue = view.inputRecherche.value;
    view.loadingImage.classList.add("wrapper-visible");

    //on effectue le recherche et on affiche les resultats
    api.searchJoke(inputValue).then((jokes) => {
      setTimeout(() => {
        view.loadingImage.classList.remove("wrapper-visible");
        displayResult(jokes);
      }, 1000); // Attendre 2 secondes (2000 millisecondes) avant d'exécuter le code suivant
    });
  }
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
      favoris = favoris.filter(function (element) {
        return element !== view.inputRecherche.value;
      });
      localStorage.setItem("favoris", JSON.stringify(favoris));
      updateFavouriteList();

      //si l'element n'est pas dans les favoris, on l'ajoute
    } else {
      view.etoileImg.setAttribute("src", "images/star-pleine.png");
      view.btnFavoris.setAttribute("title", "Retirer la recherche des favoris");
      favoris.push(view.inputRecherche.value);
      localStorage.setItem("favoris", JSON.stringify(favoris));
      updateFavouriteList();
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
    });
    ///

    let imgSuppression = document.createElement("img");
    imgSuppression.src = "images/croix.svg";
    imgSuppression.alt = "Icone pour supprimer le favori";
    imgSuppression.width = "15";
    imgSuppression.title = "Cliquer pour supprimer le favori";
    imgSuppression.addEventListener("click", () => {
      favoris = favoris.filter(function (fav) {
        return fav !== element;
      });
      localStorage.setItem("favoris", JSON.stringify(favoris));
      updateFavouriteList();
    });

    nouvelElement.appendChild(imgSuppression);
    view.listeFavoris.appendChild(nouvelElement);
  });
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
  });
}

/**
 * permets l'affichage des catégories, seulement si la page actuelle est la page des catégories
 * 
 */
if (view.blocCategoriesSelect) {
  view.blocCategoriesSelect.appendChild(
    generateCategeorieElement("-- selectionner --")
  );

  
  api.getCategories().then((data) => {
    data.forEach((category) => {
      view.blocCategoriesSelect.appendChild(generateCategeorieElement(category));
    })
  })

  let firstMessage  = document.createElement("p")
  firstMessage.textContent = "Commencez par selectionner une catégorie pour obtenir une blague aléatoire !"
  view.blocCategoriesRes.appendChild(firstMessage);

  

  //malgré le fait que l'appel à l'api ci dessus pour les catégories est fonctionnel, à des fin de developpement, il est preferable de tester sur une liste local
  /*
  [
    "animal",
    "career",
    "celebrity",
    "dev",
    "explicit",
    "fashion",
    "food",
    "history",
    "money",
    "movie",
    "music",
    "political",
    "religion",
    "science",
    "sport",
    "travel",
  ].forEach((category) => {
    view.blocCategoriesSelect.appendChild(generateCategeorieElement(category));
  });
  */

  /**
   * rechercher une blague quand on selectionne une categorie
   */
  view.blocCategoriesSelect.addEventListener("change", function (event) {
    const valeurSelectionnee = event.target.value; //  la valeur sélectionnée
    if (valeurSelectionnee != "-- selectionner --") {
      view.blocCategoriesButton.removeAttribute("disabled");
    } else {
      view.blocCategoriesButton.setAttribute("disabled", "true");
      while (view.blocCategoriesRes.firstChild) {
        view.blocCategoriesRes.removeChild(view.blocCategoriesRes.firstChild);
      }
    }
  });

  view.blocCategoriesButton.addEventListener("click", () => {
    const valeurSelectionnee = view.blocCategoriesSelect.value; //  la valeur sélectionnée
    console.log("qfsq");
    if (valeurSelectionnee != "-- selectionner --") {
      while (view.blocCategoriesRes.firstChild) {
        view.blocCategoriesRes.removeChild(view.blocCategoriesRes.firstChild);
      }
      api.getRandomFromCat(valeurSelectionnee).then((joke) => {
        let jokeElem = generateJokeElement(joke);
        view.blocCategoriesRes.appendChild(jokeElem);
      });
    }
  });
}

if (view.blocResultat) {

  // Fonction pour afficher la fenêtre modale
  function afficherPopup() {
    if (!localStorage.getItem("haveSeenPopup")) {
      localStorage.setItem("haveSeenPopup", "true")
      var modal = document.getElementById("myModal");
      modal.style.display = "block";
  
      // Fermer la modal lorsqu'on clique sur le bouton de fermeture (×)
      var span = document.getElementsByClassName("close")[0];
      span.onclick = function () {
        modal.style.display = "none";
      };
  
      // Fermer la modal lorsqu'on clique en dehors de celle-ci
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };
    }
    
  }

  // Appel de la fonction lors du chargement de la page
  window.addEventListener("load", afficherPopup);
}

if (view.blocBlagueFavoris) {
  let jokeList = JSON.parse(localStorage.getItem("favJokes")) || [];
  jokeList.forEach((element) => {
    let joke = new Joke(
      element.id,
      element.content,
      element.dateCreation,
      element.title
    );
    view.blocBlagueFavoris.appendChild(generateJokeElement(joke));
  });

  if (jokeList.length == 0) {
    let noContentMessage = document.createElement("p");
    noContentMessage.textContent = "Aucune blague n'a été likée pour le moment"
    view.blocBlagueFavoris.appendChild(noContentMessage);
  }
}

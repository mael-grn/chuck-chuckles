/**
 * Objet constant représentant la vue.
 */
const view = {
  // Bouton pour lancer la recherche
  btnRecherche: document.getElementById("btn-lancer-recherche"),
  inputRecherche: document.getElementById("input-text-response"),
  blocResultat: document.getElementById("bloc-resultats"),
  loadingImage: document.querySelector(".wrapper"),
  btnFavoris: document.getElementById("btn-favoris"),
  etoileImg: document.querySelector("#btn-favoris img"),
  appearsOnScroll: document.querySelectorAll(".appearsOnScroll"),
  listeFavoris : document.getElementById("liste-favoris"),
  blocCategoriesRes: document.querySelector("#bloc-categories #resultats"),
  blocCategoriesButton: document.querySelector("#search-cat button"),
  blocCategoriesSelect: document.querySelector("#bloc-categories select"),
};

export default view;

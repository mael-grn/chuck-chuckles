import Api from './model/api.js';
import view from './view.js';

const api = new Api();

view.btnRecherche.addEventListener("click", () => {
    var inputValue = document.getElementById('input-text-response').value;
    console.log("input value : " + inputValue);

    //on effectue le recherche et on mets le resultat dans la console
    api.searchJoke(inputValue).then(jokes => {
        console.log(jokes);
    });
});

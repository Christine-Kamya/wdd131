// main.js
import { recipes } from './recipes.mjs';

console.log(recipes);  // This will display the list of recipes in the console
import recipes from './recipes.mjs';


function random(num) {
    return Math.floor(Math.random() * num);
}


function getRandomListEntry(list) {
    const listLength = list.length;
    const randomNum = random(listLength);
    return list[randomNum];
}


function tagsTemplate(tags) {
    return tags.map(tag => `<li>${tag}</li>`).join('');
}

/
function ratingTemplate(rating) {
    let html = `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">`;
    for (let i = 0; i < 5; i++) {
        html += i < rating ? '<span class="icon-star">⭐</span>' : '<span class="icon-star-empty">☆</span>';
    }
    html += `</span>`;
    return html;
}


function recipeTemplate(recipe) {
    return `<figure class="recipe">
        <img src="${recipe.image}" alt="Image of ${recipe.name}" />
        <figcaption>
            <ul class="recipe__tags">
                ${tagsTemplate(recipe.tags)}
            </ul>
            <h2><a href="#">${recipe.name}</a></h2>
            <p class="recipe__ratings">
                ${ratingTemplate(recipe.rating)}
            </p>
            <p class="recipe__description">${recipe.description}</p>
        </figcaption>
    </figure>`;
}


function renderRecipes(recipeList) {
    const container = document.getElementById('recipe-container');
    container.innerHTML = recipeList.map(recipe => recipeTemplate(recipe)).join('');
}


function init() {
    const recipe = getRandomListEntry(recipes);
    renderRecipes([recipe]);
}


function filterRecipes(query) {
    return recipes.filter(recipe => 
        recipe.name.toLowerCase().includes(query) ||
        recipe.description.toLowerCase().includes(query) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(query))
    ).sort((a, b) => a.name.localeCompare(b.name));
}


function searchHandler(e) {
    e.preventDefault();
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filteredRecipes = filterRecipes(query);
    renderRecipes(filteredRecipes);
}


document.getElementById('searchForm').addEventListener('submit', searchHandler);


init();

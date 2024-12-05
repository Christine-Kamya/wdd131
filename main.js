// main.js
// import { recipes } from './recipes.mjs';

// console.log(recipes);  // This will display the list of recipes in the console
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

function ratingTemplate(rating) {
    let html = `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">`;
    for (let i = 0; i < 5; i++) {
        html += i < rating ? '<span class="icon-star">⭐</span>' : '<span class="icon-star-empty">☆</span>';
    }
    html += `</span>`;
    return html;
}


function recipeTemplate(recipe) {
    return `<article class="recipe">
        <h2>${recipe.name}</h2>
        <div class="recipe-container">
            <img src="${recipe.image}" alt="Image of ${recipe.name}" />
             <div class="recipe-content">
                <ul class="recipe__tags">
                    ${tagsTemplate(recipe.tags)}
                </ul>
                <p class="description">${recipe.description}</p>
                <p class="recipe__ratings">
                    ${ratingTemplate(recipe.rating)}
                </p>
            </div>
        </div>
    </article>`;
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
    const randomRecipe = getRandomListEntry(filteredRecipes)
    renderRecipes([randomRecipe]);
    
}


document.querySelector('.search-form').addEventListener('submit', searchHandler);


init();

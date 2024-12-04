// Import recipes array from recipes.mjs
import recipes from './recipes.mjs';

/**
 * Utility: Generate a random number
 */
function random(num) {
  return Math.floor(Math.random() * num);
}

/**
 * Utility: Get a random list entry
 */
function getRandomListEntry(list) {
  return list[random(list.length)];
}

/**
 * Utility: Generate HTML for tags
 */
function tagsTemplate(tags) {
  return tags.map(tag => `<li>${tag}</li>`).join('');
}

/**
 * Utility: Generate HTML for ratings
 */
function ratingTemplate(rating) {
  let html = `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">`;
  for (let i = 1; i <= 5; i++) {
    html += i <= rating 
      ? `<span aria-hidden="true" class="icon-star">⭐</span>` 
      : `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
  }
  html += '</span>';
  return html;
}

/**
 * Generate HTML for a single recipe
 */
function recipeTemplate(recipe) {
  return `<figure class="recipe">
    <img src="${recipe.image}" alt="Image of ${recipe.name}">
    <figcaption>
      <ul class="recipe__tags">${tagsTemplate(recipe.tags)}</ul>
      <h2>${recipe.name}</h2>
      <p class="recipe__ratings">${ratingTemplate(recipe.rating)}</p>
      <p class="recipe__description">${recipe.description}</p>
    </figcaption>
  </figure>`;
}

/**
 * Render a list of recipes
 */
function renderRecipes(recipeList) {
  const outputElement = document.querySelector('#recipes');
  if (recipeList.length === 0) {
    outputElement.innerHTML = '<p>No recipes found.</p>';
  } else {
    outputElement.innerHTML = recipeList.map(recipe => recipeTemplate(recipe)).join('');
  }
}

/**
 * Filter recipes by a search query
 */
function filterRecipes(query) {
  const lowerCaseQuery = query.toLowerCase();
  return recipes
    .filter(recipe => 
      recipe.name.toLowerCase().includes(lowerCaseQuery) ||
      recipe.description.toLowerCase().includes(lowerCaseQuery) ||
      recipe.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery)) ||
      recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(lowerCaseQuery))
    )
    .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Handle search input and update displayed recipes
 */
function searchHandler(event) {
  event.preventDefault();
  const searchInput = document.querySelector('#searchInput').value;
  const filteredRecipes = filterRecipes(searchInput);
  renderRecipes(filteredRecipes);
}

/**
 * Initialize the page with a random recipe
 */
function init() {
  renderRecipes([getRandomListEntry(recipes)]);
}

// Event listeners
document.querySelector('#searchButton').addEventListener('click', searchHandler);

// Initialize the app
init();

import { loadRecipeDatabase } from "./data.js";
import {
  searchAll,
  flattenSearchResults,
  getRecipeById,
  getIngredientByValue,
  initializeSearch
} from "./unifiedSearch.js";
import { recommendRecipes } from "./recommender.js";
import {
  renderTypeaheadResults,
  renderSelectedIngredients,
  renderRecommendations,
  renderSingleRecipe,
  renderEmptyState
} from "./renderer.js";
import { validateRecipeDatabase } from "./validateData.js";

const form = document.getElementById("recipeForm");
const searchInput = document.getElementById("searchInput");
const searchResultsContainer = document.getElementById("searchResults");
const selectedIngredientsContainer = document.getElementById("selectedIngredients");
const cuisineInput = document.getElementById("cuisine");
const maxTimeInput = document.getElementById("maxTime");
const dietaryProfileInput = document.getElementById("dietaryProfile");
const resultsContainer = document.getElementById("results");
const clearIngredientsButton = document.getElementById("clearIngredientsButton");
const resetFiltersButton = document.getElementById("resetFiltersButton");

if (!form) throw new Error("Missing element: #recipeForm");
if (!searchInput) throw new Error("Missing element: #searchInput");
if (!searchResultsContainer) throw new Error("Missing element: #searchResults");
if (!selectedIngredientsContainer) throw new Error("Missing element: #selectedIngredients");
if (!cuisineInput) throw new Error("Missing element: #cuisine");
if (!maxTimeInput) throw new Error("Missing element: #maxTime");
if (!dietaryProfileInput) throw new Error("Missing element: #dietaryProfile");
if (!resultsContainer) throw new Error("Missing element: #results");
if (!clearIngredientsButton) throw new Error("Missing element: #clearIngredientsButton");
if (!resetFiltersButton) throw new Error("Missing element: #resetFiltersButton");

const appState = {
  recipes: [],
  ingredients: [],
  isReady: false
};

const selectedIngredients = new Set();

let currentSearchResults = {
  dishes: [],
  ingredients: []
};

let activeSearchIndex = -1;

searchInput.disabled = true;

initializeApp();

async function initializeApp() {
  try {
    renderEmptyState(
      resultsContainer,
      "Loading Recipe AI",
      "Preparing ingredients and recipes..."
    );

    const { recipes, ingredients } = await loadRecipeDatabase();

    appState.recipes = recipes;
    appState.ingredients = ingredients;
    appState.isReady = true;

    initializeSearch({
      recipes,
      ingredients
    });

    const validationErrors = validateRecipeDatabase({
      recipes,
      ingredients
    });

    if (validationErrors.length > 0) {
      console.table(validationErrors);

      const message = validationErrors
        .slice(0, 20)
        .map(error => error.message)
        .join("\n");

      alert(
        `Recipe database has validation issues:\n\n${message}\n\nCheck console for full details.`
      );
    }

    searchInput.disabled = false;

    renderSelectedIngredients(
      selectedIngredientsContainer,
      selectedIngredients,
      getIngredientByValue,
      removeIngredient
    );

    renderEmptyState(
      resultsContainer,
      "Start with your pantry",
      "Search for ingredients such as pyaaz, haldi, chicken, rice, pasta, paneer, egg, tomato, or lentils. You can also search for a dish directly."
    );
  } catch (error) {
    console.error(error);

    renderEmptyState(
      resultsContainer,
      "Could not load recipes",
      "Check that the JSON files exist under /data and that you are running the app through a local server."
    );
  }
}

searchInput.addEventListener("input", () => {
  if (!appState.isReady) return;

  const query = searchInput.value;

  currentSearchResults = searchAll(query);

  const flatResults = flattenSearchResults(currentSearchResults);
  activeSearchIndex = flatResults.length > 0 ? 0 : -1;

  searchInput.setAttribute("aria-expanded", flatResults.length > 0 ? "true" : "false");

  renderTypeaheadResults(
    searchResultsContainer,
    currentSearchResults,
    selectDish,
    selectIngredient,
    activeSearchIndex
  );
});

searchInput.addEventListener("keydown", event => {
  if (!appState.isReady) return;

  const flatResults = flattenSearchResults(currentSearchResults);

  if (!flatResults.length) return;

  if (event.key === "ArrowDown") {
    event.preventDefault();

    activeSearchIndex =
      activeSearchIndex < flatResults.length - 1
        ? activeSearchIndex + 1
        : 0;

    renderTypeaheadResults(
      searchResultsContainer,
      currentSearchResults,
      selectDish,
      selectIngredient,
      activeSearchIndex
    );
  }

  if (event.key === "ArrowUp") {
    event.preventDefault();

    activeSearchIndex =
      activeSearchIndex > 0
        ? activeSearchIndex - 1
        : flatResults.length - 1;

    renderTypeaheadResults(
      searchResultsContainer,
      currentSearchResults,
      selectDish,
      selectIngredient,
      activeSearchIndex
    );
  }

  if (event.key === "Enter") {
    event.preventDefault();

    const selected = flatResults[activeSearchIndex];

    if (!selected) return;

    if (selected.type === "dish") {
      selectDish(selected.value);
    }

    if (selected.type === "ingredient") {
      selectIngredient(selected.value);
    }
  }

  if (event.key === "Escape") {
    closeTypeahead();
  }
});

document.addEventListener("click", event => {
  const clickedInside =
    searchInput.contains(event.target) ||
    searchResultsContainer.contains(event.target);

  if (!clickedInside) {
    closeTypeahead();
  }
});

form.addEventListener("submit", event => {
  event.preventDefault();

  if (!appState.isReady) return;

  if (selectedIngredients.size === 0) {
    renderEmptyState(
      resultsContainer,
      "No ingredients selected",
      "Search and select ingredients first. Try rice, pasta, chicken, paneer, lentils, tomato, onion, egg, or potato."
    );
    scrollToResults();
    return;
  }

  refreshRecommendations();
  scrollToResults();
});

clearIngredientsButton.addEventListener("click", () => {
  selectedIngredients.clear();

  renderSelectedIngredients(
    selectedIngredientsContainer,
    selectedIngredients,
    getIngredientByValue,
    removeIngredient
  );

  renderEmptyState(
    resultsContainer,
    "Your pantry is empty",
    "Add ingredients like rice, chicken, paneer, tomato, onion, lentils, pasta, or egg to start getting recommendations."
  );
});

resetFiltersButton.addEventListener("click", () => {
  cuisineInput.value = "any";
  maxTimeInput.value = "any";
  dietaryProfileInput.value = "any";

  if (selectedIngredients.size > 0) {
    refreshRecommendations();
  }
});

function selectDish(recipeId) {
  const recipe = getRecipeById(recipeId);

  searchInput.value = recipe ? recipe.name : "";
  closeTypeahead();

  renderSingleRecipe(resultsContainer, recipe);
  scrollToResults();
}

function selectIngredient(value) {
  selectedIngredients.add(value);

  searchInput.value = "";
  closeTypeahead();

  renderSelectedIngredients(
    selectedIngredientsContainer,
    selectedIngredients,
    getIngredientByValue,
    removeIngredient
  );

  searchInput.focus();
}

function removeIngredient(value) {
  selectedIngredients.delete(value);

  renderSelectedIngredients(
    selectedIngredientsContainer,
    selectedIngredients,
    getIngredientByValue,
    removeIngredient
  );

  if (selectedIngredients.size > 0) {
    refreshRecommendations();
  }
}

function refreshRecommendations() {
  const cuisine = cuisineInput.value;
  const maxTime = maxTimeInput.value;
  const dietaryProfile = dietaryProfileInput.value;

  const recommendations = recommendRecipes({
    recipes: appState.recipes,
    selectedIngredients,
    cuisine,
    maxTime,
    dietaryProfile,
    ingredientLookup: getIngredientByValue
  });

  renderRecommendations(
    resultsContainer,
    recommendations,
    {
      selectedIngredients,
      cuisine,
      maxTime,
      dietaryProfile,
      getIngredientByValue
    }
  );
}

function closeTypeahead() {
  currentSearchResults = {
    dishes: [],
    ingredients: []
  };

  activeSearchIndex = -1;
  searchResultsContainer.innerHTML = "";
  searchInput.setAttribute("aria-expanded", "false");
}

function scrollToResults() {
  resultsContainer.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}
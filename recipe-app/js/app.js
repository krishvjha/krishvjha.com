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
  const missingActionButton = event.target.closest(".missing-action-btn");

  if (missingActionButton) {
    event.preventDefault();
    event.stopPropagation();

    const ingredient = missingActionButton.dataset.ingredient;
    const action = missingActionButton.dataset.action;

    if (!ingredient || !action) return;

    if (action === "have") {
      addIngredientToPantry(ingredient);
    }

    if (action === "blinkit") {
      openBlinkitSearch(ingredient);
    }

    return;
  }

  const missingChip = event.target.closest(".missing-chip-actionable");

  if (missingChip) {
    event.preventDefault();
    event.stopPropagation();

    document
      .querySelectorAll(".missing-chip-actionable.is-open")
      .forEach(chip => {
        if (chip !== missingChip) {
          chip.classList.remove("is-open");
        }
      });

    missingChip.classList.toggle("is-open");
    return;
  }

  const clickedInsideTypeahead =
    searchInput.contains(event.target) ||
    searchResultsContainer.contains(event.target);

  if (!clickedInsideTypeahead) {
    closeTypeahead();
  }

  document
    .querySelectorAll(".missing-chip-actionable.is-open")
    .forEach(chip => chip.classList.remove("is-open"));
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
  enhanceMissingIngredientActions();
  scrollToResults();
}

function selectIngredient(value) {
  const normalizedIngredient = normalizeIngredientValue(value);

  if (!normalizedIngredient) return;

  selectedIngredients.add(normalizedIngredient);

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
  const normalizedIngredient = normalizeIngredientValue(value);

  selectedIngredients.delete(normalizedIngredient || value);

  renderSelectedIngredients(
    selectedIngredientsContainer,
    selectedIngredients,
    getIngredientByValue,
    removeIngredient
  );

  if (selectedIngredients.size > 0) {
    refreshRecommendations();
  } else {
    renderEmptyState(
      resultsContainer,
      "Your pantry is empty",
      "Add ingredients like rice, chicken, paneer, tomato, onion, lentils, pasta, or egg to start getting recommendations."
    );
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

  enhanceMissingIngredientActions();
}

function addIngredientToPantry(ingredient) {
  const normalizedIngredient = normalizeIngredientValue(ingredient);

  if (!normalizedIngredient) {
    console.warn("Could not add unknown ingredient:", ingredient);
    return;
  }

  selectedIngredients.add(normalizedIngredient);

  renderSelectedIngredients(
    selectedIngredientsContainer,
    selectedIngredients,
    getIngredientByValue,
    removeIngredient
  );

  refreshRecommendations();
}

function openBlinkitSearch(ingredient) {
  const normalizedIngredient = normalizeIngredientValue(ingredient) || ingredient;
  const displayName = getIngredientDisplayName(normalizedIngredient);
  const query = encodeURIComponent(displayName);
  const url = `https://blinkit.com/s/?q=${query}`;

  window.open(url, "_blank", "noopener,noreferrer");
}

function enhanceMissingIngredientActions() {
  const missingChips = resultsContainer.querySelectorAll(".missing-chip");

  missingChips.forEach(chip => {
    if (chip.classList.contains("missing-chip-actionable")) return;

    const rawIngredient = chip.dataset.ingredient || chip.textContent.trim();
    const normalizedIngredient = normalizeIngredientValue(rawIngredient);

    if (!normalizedIngredient) return;

    const displayName = getIngredientDisplayName(normalizedIngredient);

    chip.classList.add("missing-chip-actionable");
    chip.dataset.ingredient = normalizedIngredient;
    chip.setAttribute("role", "button");
    chip.setAttribute("tabindex", "0");
    chip.setAttribute("aria-label", `Actions for missing ingredient ${displayName}`);

    chip.innerHTML = `
      <span class="missing-chip-label">${escapeHtml(displayName)}</span>
      <span class="missing-chip-menu" aria-hidden="true">
        <button
          type="button"
          class="missing-action-btn have-btn"
          data-action="have"
          data-ingredient="${escapeHtmlAttribute(normalizedIngredient)}"
        >
          I have this
        </button>
        <button
          type="button"
          class="missing-action-btn blinkit-btn"
          data-action="blinkit"
          data-ingredient="${escapeHtmlAttribute(normalizedIngredient)}"
        >
          Buy on Blinkit
        </button>
      </span>
    `;
  });
}

function normalizeIngredientValue(ingredient) {
  const rawValue = String(ingredient || "").trim();

  if (!rawValue) return "";

  const exactMatch = getIngredientByValue(rawValue);

  if (exactMatch) {
    return rawValue;
  }

  const lowerValue = rawValue.toLowerCase();

  const valueMatch = appState.ingredients.find(item => {
    return String(item.value || "").toLowerCase() === lowerValue;
  });

  if (valueMatch) {
    return valueMatch.value;
  }

  const labelMatch = appState.ingredients.find(item => {
    return String(item.label || "").toLowerCase() === lowerValue;
  });

  if (labelMatch) {
    return labelMatch.value;
  }

  const normalizedFallback = lowerValue
    .replaceAll("_", " ")
    .replaceAll("-", " ")
    .trim();

  const fallbackMatch = appState.ingredients.find(item => {
    const itemValue = String(item.value || "").toLowerCase();
    const itemLabel = String(item.label || "").toLowerCase();

    return itemValue === normalizedFallback || itemLabel === normalizedFallback;
  });

  if (fallbackMatch) {
    return fallbackMatch.value;
  }

  return "";
}

function getIngredientDisplayName(ingredient) {
  const normalizedIngredient = normalizeIngredientValue(ingredient);
  const ingredientRecord = getIngredientByValue(normalizedIngredient);

  if (ingredientRecord && ingredientRecord.label) {
    return ingredientRecord.label;
  }

  return String(normalizedIngredient || ingredient)
    .replaceAll("-", " ")
    .replaceAll("_", " ")
    .replace(/\b\w/g, character => character.toUpperCase());
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeHtmlAttribute(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
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
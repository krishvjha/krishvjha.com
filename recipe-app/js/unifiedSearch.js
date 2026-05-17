let recipeCatalog = [];
let ingredientCatalog = [];

export function initializeSearch({ recipes = [], ingredients = [] }) {
  recipeCatalog = Array.isArray(recipes) ? recipes : [];
  ingredientCatalog = Array.isArray(ingredients) ? ingredients : [];
}

export function searchAll(query) {
  const cleaned = normalizeText(query);

  if (!cleaned) {
    return {
      dishes: [],
      ingredients: []
    };
  }

  const ingredientResults = ingredientCatalog
    .filter(item => {
      const valueMatch = normalizeText(item.value).includes(cleaned);
      const labelMatch = normalizeText(item.label).includes(cleaned);
      const aliasMatch = (item.aliases || []).some(alias =>
        normalizeText(alias).includes(cleaned)
      );

      return valueMatch || labelMatch || aliasMatch;
    })
    .slice(0, 8);

  const dishes = recipeCatalog
    .filter(recipe => {
      return normalizeText(recipe.name).includes(cleaned);
    })
    .slice(0, 6);

  return {
    dishes,
    ingredients: ingredientResults
  };
}

export function flattenSearchResults(results) {
  return [
    ...(results.ingredients || []).map(ingredient => ({
      type: "ingredient",
      value: ingredient.value,
      item: ingredient
    })),
    ...(results.dishes || []).map(recipe => ({
      type: "dish",
      value: recipe.id,
      item: recipe
    }))
  ];
}

export function getRecipeById(recipeId) {
  return recipeCatalog.find(recipe => recipe.id === recipeId);
}

export function getIngredientByValue(value) {
  return ingredientCatalog.find(item => item.value === value);
}

function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
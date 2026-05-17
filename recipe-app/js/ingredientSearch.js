// ingredientSearch.js
import { ingredients } from "./ingredients.js";

export function searchIngredients(query) {
  const cleaned = normalizeText(query);

  if (!cleaned) return [];

  return ingredients
    .filter(item => {
      const labelMatch = normalizeText(item.label).includes(cleaned);
      const valueMatch = normalizeText(item.value).includes(cleaned);
      const aliasMatch = item.aliases.some(alias =>
        normalizeText(alias).includes(cleaned)
      );

      return labelMatch || valueMatch || aliasMatch;
    })
    .slice(0, 8);
}

export function getIngredientByValue(value) {
  return ingredients.find(item => item.value === value);
}

export function groupIngredientsByCategory(items) {
  return items.reduce((groups, item) => {
    if (!groups[item.category]) {
      groups[item.category] = [];
    }

    groups[item.category].push(item);
    return groups;
  }, {});
}

function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
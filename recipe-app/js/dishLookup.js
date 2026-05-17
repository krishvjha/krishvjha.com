import { recipes } from "./data.js";

export function findRecipeByName(input) {
  const cleaned = normalizeText(input);

  if (!cleaned) return null;

  const exactMatch = recipes.find(recipe => {
    return normalizeText(recipe.name) === cleaned;
  });

  if (exactMatch) return exactMatch;

  const partialMatch = recipes.find(recipe => {
    return normalizeText(recipe.name).includes(cleaned);
  });

  if (partialMatch) return partialMatch;

  const reversePartialMatch = recipes.find(recipe => {
    return cleaned.includes(normalizeText(recipe.name));
  });

  if (reversePartialMatch) return reversePartialMatch;

  return null;
}

export function looksLikeDishName(input) {
  const cleaned = String(input || "").trim();

  if (!cleaned) return false;

  if (cleaned.includes(",") || cleaned.includes("\n")) {
    return false;
  }

  return Boolean(findRecipeByName(cleaned));
}

function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
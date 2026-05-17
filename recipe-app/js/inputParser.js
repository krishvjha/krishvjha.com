import { ingredients } from "./ingredients.js";

export function parseIngredientInput(input) {
  const parts = String(input || "")
    .split(/[,\n]+/)
    .map(item => item.trim())
    .filter(Boolean);

  const selectedIngredients = new Set();
  const unknownItems = [];

  parts.forEach(part => {
    const match = findIngredientMatch(part);

    if (match) {
      selectedIngredients.add(match.value);
    } else {
      unknownItems.push(part);
    }
  });

  return {
    selectedIngredients,
    unknownItems
  };
}

export function findIngredientMatch(rawInput) {
  const cleaned = normalizeText(rawInput);

  if (!cleaned) return null;

  const exactMatch = ingredients.find(item => {
    return normalizeText(item.value) === cleaned;
  });

  if (exactMatch) return exactMatch;

  const aliasMatch = ingredients.find(item => {
    return (item.aliases || []).some(alias => {
      return normalizeText(alias) === cleaned;
    });
  });

  if (aliasMatch) return aliasMatch;

  const labelMatch = ingredients.find(item => {
    return normalizeText(item.label).includes(cleaned);
  });

  if (labelMatch) return labelMatch;

  const partialAliasMatch = ingredients.find(item => {
    return (item.aliases || []).some(alias => {
      return normalizeText(alias).includes(cleaned);
    });
  });

  if (partialAliasMatch) return partialAliasMatch;

  return null;
}

function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
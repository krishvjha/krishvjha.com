import { checkRecipeAgainstDiet } from "./dietaryRules.js";

const DEFAULT_PANTRY = new Set([
  "salt",
  "water",
  "oil",
  "olive oil"
]);

function getMissingItems(items = [], pantry) {
  return items.filter(item => !pantry.has(item));
}

function getMatchedItems(items = [], pantry) {
  return items.filter(item => pantry.has(item));
}

function uniqueValues(values = []) {
  return [...new Set(values)];
}

function getConfidenceLabel(coveragePercent, missingRequiredCount) {
  if (coveragePercent >= 85 && missingRequiredCount === 0) {
    return "High match";
  }

  if (coveragePercent >= 60 && missingRequiredCount <= 2) {
    return "Medium match";
  }

  return "Low match";
}

function buildWhyThisRecipe({
  recipe,
  matchedRequired,
  matchedFlexible,
  matchedSpices,
  missingRequired,
  missingFlexible,
  coveragePercent,
  canCookNow
}) {
  const matchedCore = [...matchedRequired, ...matchedFlexible];
  const missingCore = [...missingRequired, ...missingFlexible];

  if (canCookNow) {
    return `You can cook this now because you have all required ingredients. Match strength is ${coveragePercent}%.`;
  }

  if (matchedCore.length > 0 && missingCore.length > 0) {
    return `This is recommended because you already have ${matchedCore.length} useful ingredient${matchedCore.length === 1 ? "" : "s"} for ${recipe.name}, but you are missing ${missingCore.length} core item${missingCore.length === 1 ? "" : "s"}.`;
  }

  if (matchedSpices.length > 0) {
    return "You match part of the flavor base for this recipe, but you still need the main ingredients.";
  }

  return "This recipe is a weaker match, but it is still close enough to consider based on your filters.";
}

export function evaluateRecipe(recipe, selectedIngredients) {
  const pantry = new Set([...DEFAULT_PANTRY, ...selectedIngredients]);

  const requiredIngredients = recipe.requiredIngredients || [];
  const flexibleIngredients = recipe.flexibleIngredients || [];
  const optionalIngredients = recipe.optionalIngredients || [];
  const spices = recipe.spices || [];
  const pantryStaples = recipe.pantryStaples || [];

  const missingRequired = getMissingItems(requiredIngredients, pantry);
  const missingFlexible = getMissingItems(flexibleIngredients, pantry);
  const missingOptional = getMissingItems(optionalIngredients, pantry);
  const missingSpices = getMissingItems(spices, pantry);
  const missingPantryStaples = getMissingItems(pantryStaples, pantry);

  const matchedRequired = getMatchedItems(requiredIngredients, pantry);
  const matchedFlexible = getMatchedItems(flexibleIngredients, pantry);
  const matchedOptional = getMatchedItems(optionalIngredients, pantry);
  const matchedSpices = getMatchedItems(spices, pantry);
  const matchedPantryStaples = getMatchedItems(pantryStaples, pantry);

  const coreIngredients = uniqueValues([
    ...requiredIngredients,
    ...flexibleIngredients,
    ...spices
  ]);

  const matchedCoreIngredients = uniqueValues([
    ...matchedRequired,
    ...matchedFlexible,
    ...matchedSpices
  ]);

  const coveragePercent =
    coreIngredients.length > 0
      ? Math.round((matchedCoreIngredients.length / coreIngredients.length) * 100)
      : 0;

  const usedSelectedIngredientCount = [...selectedIngredients].filter(value =>
    coreIngredients.includes(value)
  ).length;

  const canCookNow =
    missingRequired.length === 0 &&
    missingPantryStaples.length === 0;

  const almostThere =
    !canCookNow &&
    missingRequired.length > 0 &&
    missingRequired.length <= 2;

  let score = 0;

  score += matchedRequired.length * 60;
  score += matchedFlexible.length * 20;
  score += matchedSpices.length * 8;
  score += matchedOptional.length * 3;

  score -= missingRequired.length * 70;
  score -= missingFlexible.length * 12;
  score -= missingSpices.length * 4;

  score += usedSelectedIngredientCount * 10;
  score += coveragePercent * 0.5;

  if ((recipe.timeMinutes || 0) <= 20) {
    score += 15;
  } else if ((recipe.timeMinutes || 0) <= 30) {
    score += 8;
  }

  score -= recipe.timeMinutes || 0;

  const confidence = getConfidenceLabel(
    coveragePercent,
    missingRequired.length
  );

  const whyThisRecipe = buildWhyThisRecipe({
    recipe,
    matchedRequired,
    matchedFlexible,
    matchedSpices,
    missingRequired,
    missingFlexible,
    coveragePercent,
    canCookNow
  });

  return {
    ...recipe,

    canCookNow,
    almostThere,
    score: Math.round(score),
    confidence,
    coveragePercent,
    usedSelectedIngredientCount,
    whyThisRecipe,

    matchedRequired,
    matchedFlexible,
    matchedOptional,
    matchedSpices,
    matchedPantryStaples,

    missingRequired,
    missingFlexible,
    missingOptional,
    missingSpices,
    missingPantryStaples
  };
}

export function recommendRecipes({
  recipes,
  selectedIngredients,
  cuisine,
  maxTime,
  dietaryProfile = "any",
  ingredientLookup
}) {
  const filtered = recipes
    .filter(recipe => {
      if (!ingredientLookup) return true;

      const dietCheck = checkRecipeAgainstDiet(
        recipe,
        dietaryProfile,
        ingredientLookup
      );

      return dietCheck.allowed;
    })
    .filter(recipe => {
      if (!cuisine || cuisine === "any") return true;
      return recipe.cuisine === cuisine;
    })
    .filter(recipe => {
      if (!maxTime || maxTime === "any") return true;
      return recipe.timeMinutes <= Number(maxTime);
    })
    .map(recipe => evaluateRecipe(recipe, selectedIngredients))
    .sort((a, b) => b.score - a.score);

  return {
    canCookNow: filtered.filter(recipe => recipe.canCookNow),
    almostThere: filtered.filter(recipe => recipe.almostThere),
    notSuitable: filtered.filter(
      recipe => !recipe.canCookNow && !recipe.almostThere
    )
  };
}
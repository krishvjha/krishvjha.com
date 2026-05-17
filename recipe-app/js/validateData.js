const VALID_CUISINES = new Set([
  "indian",
  "italian",
  "asian",
  "turkish",
  "lebanese",
  "global"
]);

const VALID_DIFFICULTIES = new Set([
  "easy",
  "medium",
  "hard"
]);

const VALID_DIETARY_TAGS = new Set([
  "vegetarian",
  "dairy",
  "egg",
  "meat",
  "poultry",
  "redMeat",
  "beef",
  "pork",
  "fish",
  "seafood",
  "nut",
  "seed"
]);

const RECIPE_INGREDIENT_FIELDS = [
  "requiredIngredients",
  "flexibleIngredients",
  "optionalIngredients",
  "spices",
  "pantryStaples"
];

const REQUIRED_RECIPE_FIELDS = [
  "id",
  "name",
  "cuisine",
  "vegetarian",
  "timeMinutes",
  "difficulty",
  "requiredIngredients",
  "flexibleIngredients",
  "optionalIngredients",
  "spices",
  "pantryStaples",
  "displayIngredients",
  "steps"
];

export function validateRecipeDatabase({ recipes = [], ingredients = [] }) {
  const errors = [];

  validateIngredients(ingredients, errors);
  validateRecipes(recipes, ingredients, errors);

  return errors;
}

function validateIngredients(ingredients, errors) {
  const seenValues = new Set();

  ingredients.forEach((ingredient, index) => {
    if (!ingredient.value) {
      errors.push({
        type: "ingredient_missing_value",
        index,
        message: "Ingredient is missing value."
      });
      return;
    }

    if (seenValues.has(ingredient.value)) {
      errors.push({
        type: "duplicate_ingredient_value",
        value: ingredient.value,
        message: `Duplicate ingredient value: ${ingredient.value}`
      });
    }

    seenValues.add(ingredient.value);

    if (!ingredient.label) {
      errors.push({
        type: "ingredient_missing_label",
        value: ingredient.value,
        message: `Ingredient ${ingredient.value} is missing label.`
      });
    }

    if (!ingredient.category) {
      errors.push({
        type: "ingredient_missing_category",
        value: ingredient.value,
        message: `Ingredient ${ingredient.value} is missing category.`
      });
    }

    if (!Array.isArray(ingredient.aliases)) {
      errors.push({
        type: "ingredient_aliases_not_array",
        value: ingredient.value,
        message: `Ingredient ${ingredient.value} aliases must be an array.`
      });
    }

    if (!Array.isArray(ingredient.dietaryTags)) {
      errors.push({
        type: "ingredient_dietary_tags_not_array",
        value: ingredient.value,
        message: `Ingredient ${ingredient.value} dietaryTags must be an array.`
      });
      return;
    }

    ingredient.dietaryTags.forEach(tag => {
      if (!VALID_DIETARY_TAGS.has(tag)) {
        errors.push({
          type: "unknown_dietary_tag",
          value: ingredient.value,
          tag,
          message: `Ingredient ${ingredient.value} uses unknown dietary tag: ${tag}`
        });
      }
    });
  });
}

function validateRecipes(recipes, ingredients, errors) {
  const ingredientValues = new Set(ingredients.map(item => item.value));
  const seenRecipeIds = new Set();

  recipes.forEach((recipe, index) => {
    if (!recipe.id) {
      errors.push({
        type: "recipe_missing_id",
        index,
        message: "Recipe is missing id."
      });
      return;
    }

    if (seenRecipeIds.has(recipe.id)) {
      errors.push({
        type: "duplicate_recipe_id",
        recipeId: recipe.id,
        recipeName: recipe.name,
        message: `Duplicate recipe ID: ${recipe.id}`
      });
    }

    seenRecipeIds.add(recipe.id);

    REQUIRED_RECIPE_FIELDS.forEach(field => {
      if (!(field in recipe)) {
        errors.push({
          type: "recipe_missing_field",
          recipeId: recipe.id,
          recipeName: recipe.name,
          field,
          message: `${recipe.name || recipe.id} is missing field: ${field}`
        });
      }
    });

    if (!VALID_CUISINES.has(recipe.cuisine)) {
      errors.push({
        type: "unknown_cuisine",
        recipeId: recipe.id,
        recipeName: recipe.name,
        cuisine: recipe.cuisine,
        message: `${recipe.name} uses unknown cuisine: ${recipe.cuisine}`
      });
    }

    if (!VALID_DIFFICULTIES.has(recipe.difficulty)) {
      errors.push({
        type: "unknown_difficulty",
        recipeId: recipe.id,
        recipeName: recipe.name,
        difficulty: recipe.difficulty,
        message: `${recipe.name} uses unknown difficulty: ${recipe.difficulty}`
      });
    }

    if (typeof recipe.vegetarian !== "boolean") {
      errors.push({
        type: "recipe_vegetarian_not_boolean",
        recipeId: recipe.id,
        recipeName: recipe.name,
        message: `${recipe.name} vegetarian must be true or false.`
      });
    }

    if (typeof recipe.timeMinutes !== "number") {
      errors.push({
        type: "recipe_time_not_number",
        recipeId: recipe.id,
        recipeName: recipe.name,
        message: `${recipe.name} timeMinutes must be a number.`
      });
    }

    RECIPE_INGREDIENT_FIELDS.forEach(field => {
      const values = recipe[field];

      if (!Array.isArray(values)) {
        errors.push({
          type: "recipe_field_not_array",
          recipeId: recipe.id,
          recipeName: recipe.name,
          field,
          message: `${recipe.name} field ${field} must be an array.`
        });
        return;
      }

      values.forEach(value => {
        if (!ingredientValues.has(value)) {
          errors.push({
            type: "missing_ingredient_reference",
            recipeId: recipe.id,
            recipeName: recipe.name,
            field,
            missingValue: value,
            message: `${recipe.name} → ${field} → "${value}" does not exist in ingredients.json.`
          });
        }
      });
    });

    if (!Array.isArray(recipe.displayIngredients) || recipe.displayIngredients.length === 0) {
      errors.push({
        type: "recipe_display_ingredients_invalid",
        recipeId: recipe.id,
        recipeName: recipe.name,
        message: `${recipe.name} must have displayIngredients.`
      });
    }

    if (!Array.isArray(recipe.steps) || recipe.steps.length < 5) {
      errors.push({
        type: "recipe_steps_invalid",
        recipeId: recipe.id,
        recipeName: recipe.name,
        message: `${recipe.name} must have at least 5 method steps.`
      });
    }
  });
}
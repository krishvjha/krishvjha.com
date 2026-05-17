export const DIETARY_PROFILES = {
  any: {
    label: "Any",
    blockedTags: []
  },

  vegetarian: {
    label: "Vegetarian",
    blockedTags: ["meat", "egg", "fish", "seafood", "pork", "beef", "alcohol"]
  },

  eggetarian: {
    label: "Eggetarian",
    blockedTags: ["meat", "fish", "seafood", "pork", "beef", "alcohol"]
  },

  nonVegetarian: {
    label: "Non-vegetarian",
    blockedTags: []
  },

  hinduVeg: {
    label: "Hindu vegetarian",
    blockedTags: ["meat", "egg", "fish", "seafood", "pork", "beef", "alcohol"]
  },

  hinduNonVeg: {
    label: "Hindu non-vegetarian",
    blockedTags: ["pork", "beef", "alcohol"]
  },

  halal: {
    label: "Halal",
    blockedTags: ["pork", "alcohol"]
  }
};

export function isIngredientAllowedForDiet(ingredient, dietaryProfile) {
  const profile = DIETARY_PROFILES[dietaryProfile] || DIETARY_PROFILES.any;
  const tags = ingredient?.dietaryTags || [];

  return !tags.some(tag => profile.blockedTags.includes(tag));
}

export function checkRecipeAgainstDiet(recipe, dietaryProfile, ingredientLookup) {
  const blockingFields = [
    "requiredIngredients",
    "flexibleIngredients",
    "spices",
    "pantryStaples"
  ];

  const blockedIngredients = [];

  blockingFields.forEach(field => {
    const values = recipe[field] || [];

    values.forEach(value => {
      const ingredient = ingredientLookup(value);

      if (!ingredient) return;

      const allowed = isIngredientAllowedForDiet(ingredient, dietaryProfile);

      if (!allowed) {
        blockedIngredients.push({
          value,
          field,
          label: ingredient.label
        });
      }
    });
  });

  return {
    allowed: blockedIngredients.length === 0,
    blockedIngredients
  };
}
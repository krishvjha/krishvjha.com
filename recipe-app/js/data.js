// const INGREDIENTS_URL = new URL("../data/ingredients.json", import.meta.url);

// const RECIPE_URLS = [
//   new URL("../data/recipes/indian.json", import.meta.url),
//   new URL("../data/recipes/italian.json", import.meta.url),
//   new URL("../data/recipes/asian.json", import.meta.url),
//   new URL("../data/recipes/turkish.json", import.meta.url),
//   new URL("../data/recipes/lebanese.json", import.meta.url),
//   new URL("../data/recipes/global.json", import.meta.url)
// ];

// async function loadJson(url) {
//   const response = await fetch(url);

//   if (!response.ok) {
//     throw new Error(`Failed to load ${url.pathname}: ${response.status}`);
//   }

//   return response.json();
// }

// export async function loadIngredients() {
//   const ingredients = await loadJson(INGREDIENTS_URL);

//   if (!Array.isArray(ingredients)) {
//     throw new Error("ingredients.json must export a JSON array.");
//   }

//   return ingredients;
// }

// export async function loadRecipes() {
//   const recipeGroups = await Promise.all(
//     RECIPE_URLS.map(url => loadJson(url))
//   );

//   recipeGroups.forEach((group, index) => {
//     if (!Array.isArray(group)) {
//       throw new Error(`${RECIPE_URLS[index].pathname} must be a JSON array.`);
//     }
//   });

//   return recipeGroups.flat();
// }

// export async function loadRecipeDatabase() {
//   const [ingredients, recipes] = await Promise.all([
//     loadIngredients(),
//     loadRecipes()
//   ]);

//   return {
//     ingredients,
//     recipes
//   };
// }


const INGREDIENTS_URL = new URL("../data/ingredients.json", import.meta.url);

const RECIPE_URLS = [
  new URL("../data/recipes/indian.json", import.meta.url),
  new URL("../data/recipes/italian.json", import.meta.url),
  new URL("../data/recipes/asian.json", import.meta.url),
  new URL("../data/recipes/turkish.json", import.meta.url),
  new URL("../data/recipes/lebanese.json", import.meta.url),
  new URL("../data/recipes/global.json", import.meta.url)
];

async function loadRequiredJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Required file missing: ${url.pathname} (${response.status})`);
  }

  return response.json();
}

async function loadOptionalJsonArray(url) {
  const response = await fetch(url);

  if (!response.ok) {
    console.warn(`Optional recipe file not loaded: ${url.pathname} (${response.status})`);
    return [];
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    console.warn(`Recipe file must contain a JSON array: ${url.pathname}`);
    return [];
  }

  return data;
}

export async function loadIngredients() {
  const ingredients = await loadRequiredJson(INGREDIENTS_URL);

  if (!Array.isArray(ingredients)) {
    throw new Error("data/ingredients.json must contain a JSON array.");
  }

  return ingredients;
}

export async function loadRecipes() {
  const recipeGroups = await Promise.all(
    RECIPE_URLS.map(url => loadOptionalJsonArray(url))
  );

  return recipeGroups.flat();
}

export async function loadRecipeDatabase() {
  const [ingredients, recipes] = await Promise.all([
    loadIngredients(),
    loadRecipes()
  ]);

  console.log("Loaded ingredients:", ingredients.length);
  console.log("Loaded recipes:", recipes.length);

  return {
    ingredients,
    recipes
  };
}
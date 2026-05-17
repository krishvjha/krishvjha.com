export function renderTypeaheadResults(
  container,
  results,
  selectDish,
  selectIngredient,
  activeSearchIndex = -1
) {
  if (!container) return;

  const ingredients = Array.isArray(results?.ingredients)
    ? results.ingredients
    : [];

  const dishes = Array.isArray(results?.dishes)
    ? results.dishes
    : [];

  if (ingredients.length === 0 && dishes.length === 0) {
    container.innerHTML = "";
    return;
  }

  let flatIndex = 0;

  const ingredientMarkup = ingredients.length
    ? `
      <div class="typeahead-section">
        <div class="typeahead-section-title">Ingredients</div>
        ${ingredients.map(ingredient => {
          const currentIndex = flatIndex++;
          const value = ingredient?.value || "";
          const label = ingredient?.label || value;
          const category = ingredient?.category || "ingredient";

          return `
            <button
              type="button"
              class="typeahead-item ${currentIndex === activeSearchIndex ? "active" : ""}"
              data-result-type="ingredient"
              data-result-value="${escapeHtml(value)}"
            >
              <span class="typeahead-item-main">${escapeHtml(label)}</span>
              <span class="typeahead-item-sub">${escapeHtml(category)}</span>
            </button>
          `;
        }).join("")}
      </div>
    `
    : "";

  const dishMarkup = dishes.length
    ? `
      <div class="typeahead-section">
        <div class="typeahead-section-title">Dishes</div>
        ${dishes.map(recipe => {
          const currentIndex = flatIndex++;
          const id = recipe?.id || "";
          const name = recipe?.name || id;
          const cuisine = recipe?.cuisine || "recipe";
          const time = recipe?.timeMinutes ? `${recipe.timeMinutes} min` : "time not set";

          return `
            <button
              type="button"
              class="typeahead-item ${currentIndex === activeSearchIndex ? "active" : ""}"
              data-result-type="dish"
              data-result-value="${escapeHtml(id)}"
            >
              <span class="typeahead-item-main">${escapeHtml(name)}</span>
              <span class="typeahead-item-sub">${escapeHtml(formatFilter(cuisine))} · ${escapeHtml(time)}</span>
            </button>
          `;
        }).join("")}
      </div>
    `
    : "";

  container.innerHTML = ingredientMarkup + dishMarkup;

  container.querySelectorAll("[data-result-type='ingredient']").forEach(button => {
    button.addEventListener("click", () => {
      const value = button.getAttribute("data-result-value");
      if (value) selectIngredient(value);
    });
  });

  container.querySelectorAll("[data-result-type='dish']").forEach(button => {
    button.addEventListener("click", () => {
      const value = button.getAttribute("data-result-value");
      if (value) selectDish(value);
    });
  });
}

export function renderSelectedIngredients(
  container,
  selectedIngredients,
  getIngredientByValue,
  removeIngredient
) {
  if (!container) return;

  const values = [...selectedIngredients];

  if (values.length === 0) {
    container.innerHTML = `
      <span class="selected-placeholder">
        No ingredients selected yet.
      </span>
    `;
    return;
  }

  container.innerHTML = values.map(value => {
    const label = getIngredientLabel(value, getIngredientByValue);

    return `
      <span class="selected-chip">
        ${escapeHtml(label)}
        <button
          type="button"
          class="chip-remove"
          aria-label="Remove ${escapeHtml(label)}"
          data-remove-ingredient="${escapeHtml(value)}"
        >
          ×
        </button>
      </span>
    `;
  }).join("");

  container.querySelectorAll("[data-remove-ingredient]").forEach(button => {
    button.addEventListener("click", () => {
      const value = button.getAttribute("data-remove-ingredient");
      if (value) removeIngredient(value);
    });
  });
}

export function renderRecommendations(container, recommendations, context = {}) {
  if (!container) return;

  const {
    cuisine = "any",
    maxTime = "any",
    dietaryProfile = "any",
    getIngredientByValue
  } = context;

  const canCookNow = Array.isArray(recommendations?.canCookNow)
    ? recommendations.canCookNow
    : [];

  const almostThere = Array.isArray(recommendations?.almostThere)
    ? recommendations.almostThere
    : [];

  if (canCookNow.length === 0 && almostThere.length === 0) {
    renderEmptyState(
      container,
      "No strong matches found",
      "Try adding common ingredients like onion, tomato, rice, pasta, chicken, paneer, lentils, egg, or potato. You can also relax your filters."
    );
    return;
  }

  const visibleCanCookNow = canCookNow.slice(0, 6);
  const visibleAlmostThere = almostThere.slice(0, 6);

  container.innerHTML = `
    <section class="results-shell">
      <div class="results-header">
        <div>
          <p class="eyebrow">Personalized recommendations</p>
          <h2>Recipes matched to your pantry</h2>
        </div>

        <div class="result-counts">
          <span>${canCookNow.length} can cook now</span>
          <span>${almostThere.length} almost there</span>
        </div>
      </div>

      <div class="active-filters">
        <span>Cuisine: ${escapeHtml(formatFilter(cuisine))}</span>
        <span>Time: ${maxTime === "any" ? "Any" : `${escapeHtml(maxTime)} min`}</span>
        <span>Diet: ${escapeHtml(formatFilter(dietaryProfile))}</span>
      </div>

      ${renderRecipeGroup(
        "You can cook now",
        "Top matches with all required ingredients available.",
        visibleCanCookNow,
        getIngredientByValue
      )}

      ${renderRecipeGroup(
        "Almost there",
        "Top matches where you are missing only a few important items.",
        visibleAlmostThere,
        getIngredientByValue
      )}
    </section>
  `;

  bindCookModeButtons(
    container,
    [...visibleCanCookNow, ...visibleAlmostThere],
    getIngredientByValue
  );
}

export function renderSingleRecipe(container, recipe) {
  if (!container) return;

  if (!recipe) {
    renderEmptyState(
      container,
      "Recipe not found",
      "Try searching for another dish."
    );
    return;
  }

  const ingredients = recipe.displayIngredients || [];
  const steps = recipe.steps || [];
  const required = recipe.requiredIngredients || [];
  const flexible = recipe.flexibleIngredients || [];
  const optional = recipe.optionalIngredients || [];
  const spices = recipe.spices || [];
  const pantryStaples = recipe.pantryStaples || [];
  const cookTips = recipe.cookTips || [];
  const servingSuggestions = recipe.servingSuggestions || [];
  const substitutions = recipe.substitutions || [];

  container.innerHTML = `
    <section class="dish-cook-view compact-dish-view">
      <div class="dish-cook-hero compact-dish-hero">
        <div>
          <p class="eyebrow">Cook Mode</p>
          <h2>${escapeHtml(recipe.name)}</h2>

          <div class="cook-modal-meta">
            <span>${escapeHtml(formatFilter(recipe.cuisine))}</span>
            <span>${recipe.timeMinutes || "?"} min</span>
            <span>${escapeHtml(formatFilter(recipe.difficulty || "easy"))}</span>
          </div>
        </div>

        <div class="cook-readiness ready">
          Full recipe
        </div>
      </div>

      <div class="dish-cook-body compact-dish-body">
        <section class="cook-modal-section compact-section">
          <div class="cook-section-title">
            <span>01</span>
            <div>
              <p>Ingredient kit</p>
              <h3>What goes into this dish</h3>
            </div>
          </div>

          <div class="cook-ingredient-grid compact-ingredient-grid">
            ${ingredients.map(item => `
              <span>${escapeHtml(item)}</span>
            `).join("")}
          </div>
        </section>

        <section class="cook-modal-section method-callout compact-section">
          <div class="cook-section-title">
            <span>02</span>
            <div>
              <p>Method</p>
              <h3>Cooking flow</h3>
            </div>
          </div>

          <div class="cook-method-list compact-method-list">
            ${steps.map((step, index) => `
              <div class="cook-method-step compact-method-step">
                <span>${String(index + 1).padStart(2, "0")}</span>
                <p>${escapeHtml(step)}</p>
              </div>
            `).join("")}
          </div>
        </section>

        <details class="dish-accordion">
          <summary>Recipe logic</summary>

          <div class="dish-logic-grid compact-logic-grid">
            <div>
              <strong>Required</strong>
              <div class="cook-chip-list">${renderStaticChips(required)}</div>
            </div>

            <div>
              <strong>Flexible</strong>
              <div class="cook-chip-list">${renderStaticChips(flexible)}</div>
            </div>

            <div>
              <strong>Spices</strong>
              <div class="cook-chip-list">${renderStaticChips(spices)}</div>
            </div>

            <div>
              <strong>Optional</strong>
              <div class="cook-chip-list">${renderStaticChips(optional)}</div>
            </div>

            <div>
              <strong>Pantry staples</strong>
              <div class="cook-chip-list">${renderStaticChips(pantryStaples)}</div>
            </div>
          </div>
        </details>

        ${(cookTips.length > 0 || servingSuggestions.length > 0 || substitutions.length > 0) ? `
          <details class="dish-accordion">
            <summary>Chef notes</summary>

            <div class="dish-notes-grid compact-notes-grid">
              ${cookTips.length > 0 ? `
                <div class="dish-note-card">
                  <strong>Cook tips</strong>
                  <ul>
                    ${cookTips.map(tip => `<li>${escapeHtml(tip)}</li>`).join("")}
                  </ul>
                </div>
              ` : ""}

              ${servingSuggestions.length > 0 ? `
                <div class="dish-note-card">
                  <strong>Serving suggestions</strong>
                  <ul>
                    ${servingSuggestions.map(item => `<li>${escapeHtml(item)}</li>`).join("")}
                  </ul>
                </div>
              ` : ""}

              ${substitutions.length > 0 ? `
                <div class="dish-note-card">
                  <strong>Substitutions</strong>
                  <ul>
                    ${substitutions.map(item => `
                      <li>
                        Missing ${escapeHtml(formatIngredientValue(item.missing))}:
                        use ${(item.alternatives || []).map(formatIngredientValue).join(", ")}.
                        ${item.note ? escapeHtml(item.note) : ""}
                      </li>
                    `).join("")}
                  </ul>
                </div>
              ` : ""}
            </div>
          </details>
        ` : ""}
      </div>
    </section>
  `;
}

export function renderEmptyState(container, title, message) {
  if (!container) return;

  container.innerHTML = `
    <section class="empty-state">
      <h2>${escapeHtml(title)}</h2>
      <p>${escapeHtml(message)}</p>
    </section>
  `;
}

function renderRecipeGroup(title, description, recipes, getIngredientByValue) {
  if (!recipes.length) {
    return "";
  }

  return `
    <section class="recipe-group">
      <div class="recipe-group-header">
        <h3>${escapeHtml(title)}</h3>
        <p>${escapeHtml(description)}</p>
      </div>

      <div class="recipe-grid">
        ${recipes.map(recipe =>
          renderCompactRecipeCard(recipe, getIngredientByValue)
        ).join("")}
      </div>
    </section>
  `;
}

function renderCompactRecipeCard(recipe, getIngredientByValue) {
  const missingCore = uniqueValues([
    ...(recipe.missingRequired || []),
    ...(recipe.missingFlexible || [])
  ]);

  const matchedCore = uniqueValues([
    ...(recipe.matchedRequired || []),
    ...(recipe.matchedFlexible || []),
    ...(recipe.matchedSpices || [])
  ]);

  const cardExplanation = buildCardExplanation(
    recipe,
    matchedCore,
    missingCore,
    getIngredientByValue
  );

  return `
    <article class="recipe-card compact-recipe-card">
      <div class="card-topline">
        <span class="difficulty-pill">${escapeHtml(formatFilter(recipe.cuisine))}</span>
        <span class="time-pill">${recipe.timeMinutes || "?"} min</span>
      </div>

      <h4>${escapeHtml(recipe.name)}</h4>

      <p class="why-text">${escapeHtml(cardExplanation)}</p>

      <div class="compact-card-section">
        <div class="compact-label-row">
          <strong>You have</strong>
        </div>
        <div class="mini-chip-row">
          ${renderIngredientChips(matchedCore, getIngredientByValue)}
        </div>
      </div>

      <div class="compact-card-section">
        <div class="compact-label-row">
          <strong>You are missing</strong>
        </div>
        <div class="missing-actions">
          ${renderMissingIngredientChips(missingCore, getIngredientByValue)}
        </div>
      </div>

      <button type="button" class="cook-mode-button" data-cook-recipe="${escapeHtml(recipe.id)}">
        View Cook Mode
      </button>
    </article>
  `;
}

function bindCookModeButtons(container, recipes, getIngredientByValue) {
  container.querySelectorAll("[data-cook-recipe]").forEach(button => {
    button.addEventListener("click", () => {
      const recipeId = button.getAttribute("data-cook-recipe");
      const recipe = recipes.find(item => item.id === recipeId);

      if (!recipe) return;

      openCookMode(recipe, getIngredientByValue);
    });
  });
}

function openCookMode(recipe, getIngredientByValue) {
  closeCookMode();

  const missingCore = uniqueValues([
    ...(recipe.missingRequired || []),
    ...(recipe.missingFlexible || [])
  ]);

  const matchedCore = uniqueValues([
    ...(recipe.matchedRequired || []),
    ...(recipe.matchedFlexible || []),
    ...(recipe.matchedSpices || [])
  ]);

  const ingredients = recipe.displayIngredients || [];
  const steps = recipe.steps || [];

  const modal = document.createElement("div");
  modal.className = "cook-modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");

  modal.innerHTML = `
    <div class="cook-modal-backdrop" data-close-cook-modal></div>

    <section class="cook-modal-panel">
      <button type="button" class="cook-modal-close" data-close-cook-modal aria-label="Close cook mode">
        ×
      </button>

      <div class="cook-modal-hero">
        <div>
          <p class="eyebrow">Cook Mode</p>
          <h2>${escapeHtml(recipe.name)}</h2>
          <div class="cook-modal-meta">
            <span>${escapeHtml(formatFilter(recipe.cuisine))}</span>
            <span>${recipe.timeMinutes || "?"} min</span>
            <span>${escapeHtml(formatFilter(recipe.difficulty || "easy"))}</span>
          </div>
        </div>

        <div class="cook-readiness ${missingCore.length > 0 ? "almost" : "ready"}">
          ${missingCore.length > 0 ? "Almost there" : "Ready to cook"}
        </div>
      </div>

      <div class="cook-modal-body">
        <section class="cook-summary-grid">
          <div class="cook-summary-card">
            <span>Status</span>
            <strong>${missingCore.length > 0 ? "Needs a quick shop" : "Ready from pantry"}</strong>
            <p>
              ${missingCore.length > 0
                ? `You are missing ${formatList(missingCore.map(value => getIngredientLabel(value, getIngredientByValue)))}.`
                : "You have the core ingredients needed for this recipe."}
            </p>
          </div>

          <div class="cook-summary-card">
            <span>Next action</span>
            <strong>${missingCore.length > 0 ? "Complete the ingredient kit" : "Start cooking"}</strong>
            <p>
              ${missingCore.length > 0
                ? "Buy the missing items, then follow the method."
                : "Follow the method step by step."}
            </p>
          </div>
        </section>

        <section class="cook-modal-section">
          <div class="cook-section-title">
            <span>01</span>
            <div>
              <p>Ingredient kit</p>
              <h3>What goes into this dish</h3>
            </div>
          </div>

          <div class="cook-ingredient-grid">
            ${ingredients.map(item => `
              <span>${escapeHtml(item)}</span>
            `).join("")}
          </div>
        </section>

        <section class="cook-modal-section">
          <div class="cook-section-title">
            <span>02</span>
            <div>
              <p>Your pantry match</p>
              <h3>Available and missing</h3>
            </div>
          </div>

          <div class="cook-two-column">
            <div>
              <strong>You have</strong>
              <div class="cook-chip-list owned">
                ${renderIngredientChips(matchedCore, getIngredientByValue)}
              </div>
            </div>

            <div>
              <strong>You are missing</strong>
              <div class="cook-chip-list missing">
                ${renderMissingIngredientChips(missingCore, getIngredientByValue)}
              </div>
            </div>
          </div>
        </section>

        ${missingCore.length > 0 ? `
          <section class="cook-modal-section shopping-callout">
            <div class="cook-section-title">
              <span>03</span>
              <div>
                <p>Shopping list</p>
                <h3>Buy these before cooking</h3>
              </div>
            </div>

            <div class="shopping-list-premium">
              ${missingCore.map(value => {
                const label = getIngredientLabel(value, getIngredientByValue);
                return `
                  <div class="shopping-item">
                    <span>${escapeHtml(label)}</span>
                    <small>Missing</small>
                  </div>
                `;
              }).join("")}
            </div>
          </section>
        ` : ""}

        <section class="cook-modal-section method-callout">
          <div class="cook-section-title">
            <span>${missingCore.length > 0 ? "04" : "03"}</span>
            <div>
              <p>Method</p>
              <h3>Cooking flow</h3>
            </div>
          </div>

          <div class="cook-method-list">
            ${steps.map((step, index) => `
              <div class="cook-method-step">
                <span>${String(index + 1).padStart(2, "0")}</span>
                <p>${escapeHtml(step)}</p>
              </div>
            `).join("")}
          </div>
        </section>
      </div>
    </section>
  `;

  document.body.appendChild(modal);
  document.body.classList.add("modal-open");

  modal.querySelectorAll("[data-close-cook-modal]").forEach(element => {
    element.addEventListener("click", closeCookMode);
  });

  document.addEventListener("keydown", handleCookModalEscape);
}

function closeCookMode() {
  const existingModal = document.querySelector(".cook-modal");

  if (existingModal) {
    existingModal.remove();
  }

  document.body.classList.remove("modal-open");
  document.removeEventListener("keydown", handleCookModalEscape);
}

function handleCookModalEscape(event) {
  if (event.key === "Escape") {
    closeCookMode();
  }
}

function renderIngredientChips(values, getIngredientByValue) {
  if (!values.length) {
    return `<span class="muted-text">None yet</span>`;
  }

  return values.map(value => {
    const label = getIngredientLabel(value, getIngredientByValue);
    return `<span class="mini-chip">${escapeHtml(label)}</span>`;
  }).join("");
}

function renderMissingIngredientChips(values, getIngredientByValue) {
  if (!values.length) {
    return `<span class="mini-chip">Nothing essential</span>`;
  }

  return values.map(value => {
    const label = getIngredientLabel(value, getIngredientByValue);
    return `<span class="missing-chip">${escapeHtml(label)}</span>`;
  }).join("");
}

function renderStaticChips(values = []) {
  if (!values.length) {
    return `<span class="muted-text">None</span>`;
  }

  return values.map(value => `
    <span class="mini-chip">${escapeHtml(formatIngredientValue(value))}</span>
  `).join("");
}

function buildCardExplanation(recipe, matchedCore, missingCore, getIngredientByValue) {
  const recipeName = recipe?.name || "this recipe";

  const matchedLabels = matchedCore.map(value =>
    getIngredientLabel(value, getIngredientByValue)
  );

  const missingLabels = missingCore.map(value =>
    getIngredientLabel(value, getIngredientByValue)
  );

  if (missingLabels.length === 0) {
    return `You have the core ingredients needed for ${recipeName}.`;
  }

  if (matchedLabels.length === 0) {
    return `To make ${recipeName}, you are missing ${formatList(missingLabels)}.`;
  }

  return `You already have ${formatList(matchedLabels)}. To make ${recipeName}, you are missing ${formatList(missingLabels)}.`;
}

function getIngredientLabel(value, getIngredientByValue) {
  const ingredient =
    typeof getIngredientByValue === "function"
      ? getIngredientByValue(value)
      : null;

  return ingredient ? ingredient.label : formatIngredientValue(value);
}

function formatIngredientValue(value) {
  return String(value || "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, char => char.toUpperCase());
}

function formatList(items) {
  if (!items.length) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;

  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

function formatFilter(value) {
  if (!value || value === "any") return "Any";

  return String(value)
    .replace(/([A-Z])/g, " $1")
    .replace(/-/g, " ")
    .replace(/^./, char => char.toUpperCase());
}

function uniqueValues(values = []) {
  return [...new Set(values)];
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
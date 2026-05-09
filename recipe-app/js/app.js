// ========================================
// UI UTILITIES
// ========================================

function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
}

function toggleExpand(card) {
    card.classList.toggle('expanded');
}

function getPersonalityMessage(count) {
    const msgs = count > 0 ? [
        `🎉 Found ${count} delicious options for you!`,
        `👨‍🍳 Here are ${count} recipes I think you'll love!`,
        `✨ ${count} tasty matches coming right up, Chef!`,
        `🔥 ${count} recipes ready to make your kitchen sizzle!`,
        `💫 Chef's recommendation: ${count} perfect picks for you!`
    ] : [
        `🤔 Hmm, nothing matched — try tweaking your filters!`,
        `💭 No exact matches, but don't give up — adjust and retry!`
    ];
    return msgs[Math.floor(Math.random() * msgs.length)];
}

function parseInput(str) {
    return str.split(/[,\n]+/).map(s => s.trim()).filter(Boolean);
}

// ========================================
// RENDER RECIPE CARD HTML
// ========================================

function renderRecipeCard(r, i) {
    return `
        <div class="recipe-card" onclick="toggleExpand(this)" style="animation-delay:${i * 0.08}s">
            <div class="recipe-card-body">
                <div class="recipe-card-header">
                    <h3 class="recipe-name">${r.name}</h3>
                    <span class="recipe-cuisine cuisine-${r.cuisine}">${r.cuisine}</span>
                </div>
                <p class="recipe-desc">${r.desc}</p>
                <div class="recipe-meta">
                    <span class="meta-item"><span class="meta-icon">⏱</span>${r.time} min</span>
                    ${r.egg ? '<span class="meta-item"><span class="meta-icon">🥚</span>Contains egg</span>' : ''}
                </div>
                <div class="recipe-tags">
                    ${r.spices.slice(0, 4).map(s => `<span class="recipe-tag">${s}</span>`).join('')}
                </div>
                <div class="recipe-detail">
                    <div class="detail-section">
                        <h4 class="detail-title">Ingredients</h4>
                        <ul class="ingredient-list">
                            ${r.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="detail-section">
                        <h4 class="detail-title">Method</h4>
                        <ol class="steps-list">
                            ${r.steps.map(s => `<li>${s}</li>`).join('')}
                        </ol>
                    </div>
                </div>
            </div>
        </div>`;
}

function renderSuggestedCard(r) {
    return `
        <div class="suggested-card" onclick="quickSearch('${r.name.replace(/'/g, "\\'")}')">
            <div class="suggested-card-name">${r.emoji} ${r.name}</div>
            <div class="suggested-card-meta">${r.cuisine} · ${r.time} min · ${r.vegetarian ? 'Veg' : 'Non-Veg'}</div>
        </div>`;
}

// ========================================
// RENDER AI RESULT CARD HTML
// ========================================

function renderAIResultCard(recipe, prompt, style, delay) {
    return `
        <div class="ai-result-card">
            <div class="ai-result-hero">
                <div class="ai-result-badge">🧠 AI Generated · ${style.toUpperCase()} MODE</div>
                <h2 class="ai-result-name">${recipe.emoji} ${recipe.name}</h2>
                <p class="ai-result-tagline">${recipe.tagline}</p>
            </div>
            <div class="ai-meta-bar">
                <span class="ai-meta-item">⏱️ ${recipe.time} min</span>
                <span class="ai-meta-item">👥 Serves ${recipe.serves}</span>
                <span class="ai-meta-item">📊 ${recipe.difficulty}</span>
                <span class="ai-meta-item">🌍 ${recipe.cuisine}</span>
            </div>
            <div class="ai-result-body">
                <div class="ai-detail-grid">
                    <div class="ai-detail-block">
                        <div class="ai-detail-label">Ingredients</div>
                        <ul>${recipe.ingredients.map(i => `<li>${i}</li>`).join('')}</ul>
                    </div>
                    <div class="ai-detail-block">
                        <div class="ai-detail-label">Chef's Note</div>
                        <p style="font-size:13px;color:var(--text-dim);line-height:1.8;font-style:italic;">"${recipe.tips}"</p>
                        <div style="margin-top:16px;">
                            <div class="ai-detail-label">Your Prompt</div>
                            <p style="font-size:12px;color:var(--text-muted);line-height:1.6;">"${prompt}"</p>
                        </div>
                    </div>
                    <div class="ai-detail-block full">
                        <div class="ai-detail-label">Step-by-Step Instructions</div>
                        <ol class="ai-steps-list">
                            ${recipe.steps.map(s => `<li>${s}</li>`).join('')}
                        </ol>
                    </div>
                </div>
            </div>
        </div>`;
}
// ========================================
// APP STATE
// ========================================
let selectedCuisines = [];
let selectedTime = 'all';
let currentResults = [];
let logoClickCount = 0;
let logoClickTimer = null;
let aiStyle = 'creative';

// ========================================
// INIT — wire up all event listeners
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initCuisineTags();
    initTimeFilter();
    initLogoEasterEgg();
    initKeyboardShortcuts();
});

function initCuisineTags() {
    document.querySelectorAll('.cuisine-tag').forEach(tag => {
        tag.addEventListener('click', () => {
            tag.classList.toggle('active');
            const cuisine = tag.dataset.cuisine;
            if (selectedCuisines.includes(cuisine)) {
                selectedCuisines = selectedCuisines.filter(c => c !== cuisine);
            } else {
                selectedCuisines.push(cuisine);
            }
        });
    });
}

function initTimeFilter() {
    document.querySelectorAll('.time-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedTime = btn.dataset.time;
        });
    });
}

function initLogoEasterEgg() {
    document.getElementById('logo').addEventListener('click', () => {
        logoClickCount++;
        clearTimeout(logoClickTimer);
        logoClickTimer = setTimeout(() => { logoClickCount = 0; }, 800);
        if (logoClickCount >= 3) {
            logoClickCount = 0;
            openAIMode();
        }
    });
}

function initKeyboardShortcuts() {
    document.getElementById('aiPrompt').addEventListener('keydown', e => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            generateAIRecipe();
        }
    });
}

// ========================================
// RECOMMENDER — Main Recipe Search
// ========================================
// ========================================
// RECIPE LOOKUP BY NAME
// ========================================
function initRecipeLookup() {
    const input = document.getElementById('recipeLookup');
    if (!input) return;

    input.addEventListener('input', renderLookupSuggestions);
    input.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            findRecipeByName();
        }
    });
}

function renderLookupSuggestions() {
    const q = document.getElementById('recipeLookup').value.trim().toLowerCase();
    const box = document.getElementById('lookupSuggestions');
    if (!q) { box.innerHTML = ''; return; }

    const matches = recipes
        .filter(r => r.vegetarian && r.name.toLowerCase().includes(q))
        .slice(0, 5);

    if (matches.length === 0) {
        box.innerHTML = `<div class="lookup-suggestion" onclick="generateForUnknown()" style="cursor:pointer;">
            <span>✨ No exact match — let AI Chef create one</span>
            <span class="sug-meta">→</span>
        </div>`;
        return;
    }

    box.innerHTML = matches.map(r => `
        <div class="lookup-suggestion" onclick="showSingleRecipe('${r.name.replace(/'/g, "\\'")}')">
            <span>${r.emoji} ${r.name}</span>
            <span class="sug-meta">${r.cuisine} · ${r.time} min</span>
        </div>
    `).join('');
}

function findRecipeByName() {
    const q = document.getElementById('recipeLookup').value.trim().toLowerCase();
    if (!q) {
        showToast('💬 Type a dish name first');
        return;
    }

    const exact = recipes.find(r => r.vegetarian && r.name.toLowerCase() === q);
    const partial = recipes.find(r => r.vegetarian && r.name.toLowerCase().includes(q));
    const match = exact || partial;

    if (match) {
        showSingleRecipe(match.name);
    } else {
        generateForUnknown();
    }
}

function showSingleRecipe(name) {
    const recipe = recipes.find(r => r.name === name);
    if (!recipe) return;

    const sameCuisine = recipes
        .filter(r => r.vegetarian && r.cuisine === recipe.cuisine && r.name !== name)
        .slice(0, 5);

    currentResults = [recipe, ...sameCuisine];
    document.getElementById('inputSection').classList.add('collapsed');
    document.getElementById('resultsSection').classList.add('visible');
    document.getElementById('lookupSuggestions').innerHTML = '';
    renderResults();
    showToast(`✨ Here's ${name}!`);
    document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth' });
}

function generateForUnknown() {
    const q = document.getElementById('recipeLookup').value.trim();
    showToast(`🧠 No match — generating an AI recipe inspired by "${q}"...`);

    // Open AI mode and pre-fill the prompt with the user's query
    setTimeout(() => {
        openAIMode();
        const promptField = document.getElementById('aiPrompt');
        promptField.value = q;
        // Fire generation
        setTimeout(() => generateAIRecipe(), 600);
    }, 800);
}

document.addEventListener('DOMContentLoaded', initRecipeLookup);

function findRecipes() {
    const btn = document.getElementById('submitBtn');
    btn.classList.add('loading');
    btn.disabled = true;

    setTimeout(() => {
        const ingredientsRaw = document.getElementById('ingredients').value.trim().toLowerCase();
        const spicesRaw = document.getElementById('spicesGrains').value.trim().toLowerCase();

        const userIngredients = parseInput(ingredientsRaw);
        const userSpices = parseInput(spicesRaw);
        const allUserItems = [...userIngredients, ...userSpices];

        let scored = recipes.map(r => {
            let score = 0;

            // Always vegetarian
            if (!r.vegetarian) return null;
            if (selectedTime !== 'all' && r.time > parseInt(selectedTime)) return null;
            if (selectedCuisines.length > 0 && !selectedCuisines.includes(r.cuisine)) return null;

            const allRecipeItems = [...r.ingredients, ...r.spices];
            allUserItems.forEach(item => {
                if (allRecipeItems.some(ri => ri.includes(item) || item.includes(ri))) {
                    score += 10;
                }
            });

            const matchCount = allUserItems.filter(item =>
                allRecipeItems.some(ri => ri.includes(item) || item.includes(ri))
            ).length;
            if (matchCount >= 3) score += 20;

            if (allUserItems.length === 0) score += 5;

            return { ...r, score };
        }).filter(Boolean);

        scored.sort((a, b) => b.score - a.score);

        if (allUserItems.length === 0) {
            currentResults = scored;
        } else {
            currentResults = scored.filter(r => r.score > 0);
        }

        renderResults();
        btn.classList.remove('loading');
        btn.disabled = false;

        document.getElementById('inputSection').classList.add('collapsed');
        document.getElementById('resultsSection').classList.add('visible');
        document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth' });

        showToast(getPersonalityMessage(currentResults.length));
    }, 600 + Math.random() * 400);
}

// ========================================
// RENDER RESULTS
// ========================================
function renderResults() {
    const grid = document.getElementById('recipeGrid');
    const noResults = document.getElementById('noResults');
    const countEl = document.getElementById('resultsCount');
    const titleEl = document.getElementById('resultsTitle');

    if (currentResults.length === 0) {
        grid.innerHTML = '';
        noResults.style.display = 'block';
        countEl.textContent = '0 recipes';
        return;
    }

    noResults.style.display = 'none';
    countEl.textContent = `${currentResults.length} recipe${currentResults.length > 1 ? 's' : ''} found`;
    titleEl.textContent = '🍽️ Your Recipes';
    grid.innerHTML = currentResults.map((r, i) => renderRecipeCard(r, i)).join('');

    renderSuggested();
}

function renderSuggested() {
    const section = document.getElementById('suggestedSection');
    const grid = document.getElementById('suggestedGrid');

    const resultNames = new Set(currentResults.map(r => r.name));
    const suggestions = recipes
        .filter(r => r.vegetarian && !resultNames.has(r.name))
        .sort(() => Math.random() - 0.5)
        .slice(0, 6);

    if (suggestions.length === 0) {
        section.classList.remove('visible');
        return;
    }

    section.classList.add('visible');
    grid.innerHTML = suggestions.map(r => renderSuggestedCard(r)).join('');
}

function quickSearch(name) {
    // Show the clicked recipe (and matching vegetarian recipes from same cuisine) directly
    const matched = recipes.find(r => r.name === name);
    if (matched) {
        currentResults = [matched, ...recipes.filter(r => r.vegetarian && r.cuisine === matched.cuisine && r.name !== name).slice(0, 5)];
        document.getElementById('inputSection').classList.add('collapsed');
        document.getElementById('resultsSection').classList.add('visible');
        renderResults();
        showToast(`✨ Here's ${name}!`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }
    document.getElementById('ingredients').value = '';
    document.getElementById('spicesGrains').value = '';
    selectedCuisines = [];
    document.querySelectorAll('.cuisine-tag').forEach(t => t.classList.remove('active'));
    findRecipes();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========================================
// SORT
// ========================================
function sortResults(by) {
    document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
    document.querySelector(`.sort-btn[data-sort="${by}"]`).classList.add('active');

    if (by === 'relevance') currentResults.sort((a, b) => b.score - a.score);
    else if (by === 'time-asc') currentResults.sort((a, b) => a.time - b.time);
    else if (by === 'time-desc') currentResults.sort((a, b) => b.time - a.time);

    renderResults();
}

// ========================================
// AI MODE (Easter Egg)
// ========================================
function openAIMode() {
    document.getElementById('aiOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
    showToast('🧠 AI Chef Ultra Mode activated!');
}

function closeAIMode() {
    document.getElementById('aiOverlay').classList.remove('active');
    document.body.style.overflow = '';
}

function setAIStyle(el) {
    document.querySelectorAll('.ai-option').forEach(o => o.classList.remove('active'));
    el.classList.add('active');
    aiStyle = el.dataset.style;
}

function generateAIRecipe() {
    const prompt = document.getElementById('aiPrompt').value.trim();
    if (!prompt) {
        showToast("💬 Tell me what you're craving...");
        return;
    }

    // SLASH COMMANDS
    if (prompt.toLowerCase() === '/game' || prompt.toLowerCase().startsWith('/game ')) {
        openGameTab();
        return;
    }
    if (prompt.toLowerCase().startsWith('/image')) {
        const imgPrompt = prompt.slice(6).trim();
        if (!imgPrompt) {
            showToast('🖼  Type something after /image — e.g. "/image saffron risotto on a marble table"');
            return;
        }
        generateImage(imgPrompt);
        return;
    }
    if (prompt.toLowerCase().startsWith('/prompt gen') || prompt.toLowerCase().startsWith('/promptgen')) {
        const lower = prompt.toLowerCase();
        const subject = (lower.startsWith('/prompt gen') ? prompt.slice(11) : prompt.slice(10)).trim();
        if (!subject) {
            showToast('✍️  Type a subject after /prompt gen — e.g. "/prompt gen strawberries from china"');
            return;
        }
        generatePromptForUser(subject);
        return;
    }

    const btn = document.getElementById('aiGenBtn');
    const typing = document.getElementById('aiTyping');
    const result = document.getElementById('aiResult');

    btn.classList.add('loading');
    btn.disabled = true;
    typing.classList.add('active');
    result.classList.remove('visible');

    const delay = 1500 + Math.random() * 2000;

    setTimeout(() => {
        const recipe = generateUniqueRecipe(aiStyle, prompt);

        result.innerHTML = renderAIResultCard(recipe, prompt, aiStyle, delay);

        typing.classList.remove('active');
        result.classList.add('visible');
        btn.classList.remove('loading');
        btn.disabled = false;

        showToast(`✨ Generated in ${(delay / 1000).toFixed(1)}s — under 5 seconds!`);
    }, delay);
}

// ========================================
// /game COMMAND — CrazyGames embedded tab
// ========================================
function openGameTab() {
    const overlay = document.getElementById('aiOverlay');
    const container = overlay.querySelector('.ai-container');
    const typing = document.getElementById('aiTyping');
    typing.classList.remove('active');

    // Stash the original AI Chef UI so we can restore it on exit
    if (!window._aiChefOriginalHTML) {
        window._aiChefOriginalHTML = container.innerHTML;
        window._aiChefOriginalPadding = container.style.paddingTop || '';
    }

    // Replace the AI container with built-in Snake game (no iframe — works offline)
    container.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:12px;">
            <div>
                <div style="display:inline-block;padding:4px 12px;border-radius:6px;font-size:10px;font-weight:700;background:linear-gradient(135deg,#ff6b6b,#feca57);color:#fff;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">🎮 GAME MODE · SNAKE</div>
                <h2 style="font-family:'Playfair Display',serif;font-size:28px;font-weight:700;">Cooking break? 🐍</h2>
            </div>
            <button class="ai-close" onclick="exitGameMode()">← Back to AI Chef</button>
        </div>
        <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:24px;text-align:center;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:12px;">
                <div style="font-size:14px;color:var(--text-dim);">Score: <span id="snakeScore" style="color:var(--accent2);font-weight:700;font-size:20px;">0</span></div>
                <div style="font-size:14px;color:var(--text-dim);">High: <span id="snakeHigh" style="color:var(--accent3);font-weight:700;">0</span></div>
                <div style="display:flex;gap:8px;">
                    <a href="https://www.crazygames.com/" target="_blank" rel="noopener" style="display:inline-block;padding:8px 16px;background:linear-gradient(135deg,var(--accent),var(--accent3));color:#fff;text-decoration:none;border-radius:8px;font-weight:600;font-size:13px;">🎲 CrazyGames →</a>
                    <a href="https://poki.com/" target="_blank" rel="noopener" style="display:inline-block;padding:8px 16px;background:var(--surface2);color:var(--text);text-decoration:none;border-radius:8px;font-weight:600;font-size:13px;border:1px solid var(--border);">🎮 Poki →</a>
                </div>
            </div>
            <canvas id="snakeCanvas" width="400" height="400" style="background:#0a0a0f;border-radius:8px;max-width:100%;border:1px solid var(--border);"></canvas>
            <div style="margin-top:16px;font-size:12px;color:var(--text-muted);">
                Use <strong style="color:var(--text);">arrow keys</strong> or <strong style="color:var(--text);">WASD</strong> to move. Eat the food, don't hit walls or yourself!
            </div>
            <div style="margin-top:20px;padding-top:20px;border-top:1px solid var(--border);text-align:center;">
                <button class="ai-option active" onclick="startSnake()" style="font-size:14px;padding:10px 24px;">🔄 New Game</button>
            </div>
        </div>
    `;
    setTimeout(startSnake, 100);

    // Reduce top padding so the games show right at the top under the nav
    container.style.paddingTop = '90px';
    overlay.scrollTop = 0;
    showToast('🎮 Game mode loaded! Have fun, Chef.');
}

function exitGameMode() {
    if (window._snakeLoop) { clearInterval(window._snakeLoop); window._snakeLoop = null; }
    if (window._snakeCountdown) { clearInterval(window._snakeCountdown); window._snakeCountdown = null; }
    window.snakeState = null;  // disengage keyboard handler

    const overlay = document.getElementById('aiOverlay');
    const container = overlay.querySelector('.ai-container');

    // Restore the AI Chef Ultra UI in place — no reload, no return to home
    if (window._aiChefOriginalHTML) {
        container.innerHTML = window._aiChefOriginalHTML;
        container.style.paddingTop = window._aiChefOriginalPadding || '';
        window._aiChefOriginalHTML = null;
    }
    overlay.scrollTop = 0;
    showToast('🧠 Back to AI Chef');
}

// ========================================
// BUILT-IN SNAKE GAME
// ========================================
// Snake game state lives on window so the global key handler always sees the live game
window.snakeState = window.snakeState || null;

function startSnake() {
    const canvas = document.getElementById('snakeCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const grid = 20;
    const cells = canvas.width / grid;

    if (window._snakeLoop) clearInterval(window._snakeLoop);

    function spawnFood(snake) {
        let f;
        do {
            f = {x: Math.floor(Math.random() * cells), y: Math.floor(Math.random() * cells)};
        } while (snake.some(s => s.x === f.x && s.y === f.y));
        return f;
    }

    // Reset state on window so key handler sees the new game
    window.snakeState = {
        snake: [{x: 10, y: 10}],
        dir: {x: 1, y: 0},
        nextDir: {x: 1, y: 0},
        score: 0,
        cells: cells
    };
    window.snakeState.food = spawnFood(window.snakeState.snake);

    const high = parseInt(localStorage.getItem('snakeHigh') || '0');
    document.getElementById('snakeHigh').textContent = high;
    document.getElementById('snakeScore').textContent = '0';

    function draw() {
        const s = window.snakeState;
        if (!(s.nextDir.x === -s.dir.x && s.nextDir.y === -s.dir.y)) s.dir = s.nextDir;

        const head = {x: s.snake[0].x + s.dir.x, y: s.snake[0].y + s.dir.y};

        if (head.x < 0 || head.x >= cells || head.y < 0 || head.y >= cells ||
            s.snake.some(seg => seg.x === head.x && seg.y === head.y)) {
            clearInterval(window._snakeLoop);
            window._snakeLoop = null;
            ctx.fillStyle = 'rgba(10, 10, 15, 0.85)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 32px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2 - 10);
            ctx.fillStyle = '#a29bfe';
            ctx.font = '16px Inter, sans-serif';
            ctx.fillText(`Score: ${s.score}`, canvas.width / 2, canvas.height / 2 + 20);
            ctx.fillStyle = '#8888aa';
            ctx.font = '13px Inter, sans-serif';
            ctx.fillText('Click "New Game" to play again', canvas.width / 2, canvas.height / 2 + 50);
            if (s.score > high) {
                localStorage.setItem('snakeHigh', s.score);
                ctx.fillStyle = '#00cec9';
                ctx.fillText('🏆 New high score!', canvas.width / 2, canvas.height / 2 + 75);
            }
            return;
        }

        s.snake.unshift(head);

        if (head.x === s.food.x && head.y === s.food.y) {
            s.score++;
            document.getElementById('snakeScore').textContent = s.score;
            s.food = spawnFood(s.snake);
        } else {
            s.snake.pop();
        }

        ctx.fillStyle = '#0a0a0f';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = 'rgba(255,255,255,0.03)';
        ctx.lineWidth = 1;
        for (let i = 0; i <= cells; i++) {
            ctx.beginPath(); ctx.moveTo(i * grid, 0); ctx.lineTo(i * grid, canvas.height); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(0, i * grid); ctx.lineTo(canvas.width, i * grid); ctx.stroke();
        }

        ctx.fillStyle = '#ff6b6b';
        ctx.beginPath();
        ctx.arc(s.food.x * grid + grid/2, s.food.y * grid + grid/2, grid/2 - 2, 0, Math.PI * 2);
        ctx.fill();

        s.snake.forEach((seg, i) => {
            const isHead = i === 0;
            ctx.fillStyle = isHead ? '#a29bfe' : `hsl(${250 + i * 2}, 60%, ${Math.max(20, 60 - i * 0.5)}%)`;
            ctx.fillRect(seg.x * grid + 1, seg.y * grid + 1, grid - 2, grid - 2);
            if (isHead) {
                ctx.fillStyle = '#fff';
                const eyeOffsetX = s.dir.x * 4;
                const eyeOffsetY = s.dir.y * 4;
                ctx.fillRect(seg.x * grid + 5 + eyeOffsetX, seg.y * grid + 5 + eyeOffsetY, 3, 3);
                ctx.fillRect(seg.x * grid + 12 + eyeOffsetX, seg.y * grid + 5 + eyeOffsetY, 3, 3);
            }
        });
    }

    // Render initial frame so the snake is visible during countdown
    (function paintInitial() {
        const s = window.snakeState;
        ctx.fillStyle = '#0a0d0c';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = 'rgba(255,255,255,0.03)';
        ctx.lineWidth = 1;
        for (let i = 0; i <= cells; i++) {
            ctx.beginPath(); ctx.moveTo(i * grid, 0); ctx.lineTo(i * grid, canvas.height); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(0, i * grid); ctx.lineTo(canvas.width, i * grid); ctx.stroke();
        }
        ctx.fillStyle = '#f97316';
        ctx.beginPath();
        ctx.arc(s.food.x * grid + grid/2, s.food.y * grid + grid/2, grid/2 - 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#34d399';
        ctx.fillRect(s.snake[0].x * grid + 1, s.snake[0].y * grid + 1, grid - 2, grid - 2);
    })();

    // Countdown overlay before the game begins
    let countdownVal = 3;
    const drawCountdown = (text, sub) => {
        // Repaint base
        ctx.fillStyle = 'rgba(10, 13, 12, 0.75)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // Big number
        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 120px "Playfair Display", serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, canvas.width / 2, canvas.height / 2 - 8);
        // Sub label
        if (sub) {
            ctx.fillStyle = '#94a3a0';
            ctx.font = '14px Inter, sans-serif';
            ctx.fillText(sub, canvas.width / 2, canvas.height / 2 + 70);
        }
    };

    drawCountdown('3', 'Get ready, Chef…');

    if (window._snakeCountdown) clearInterval(window._snakeCountdown);
    window._snakeCountdown = setInterval(() => {
        countdownVal--;
        if (countdownVal === 2) drawCountdown('2', 'Use arrow keys or WASD');
        else if (countdownVal === 1) drawCountdown('1', 'Eat the orange dot');
        else if (countdownVal === 0) {
            // GO! flash
            ctx.fillStyle = 'rgba(10, 13, 12, 0.75)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#34d399';
            ctx.font = 'bold 96px "Playfair Display", serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('GO!', canvas.width / 2, canvas.height / 2);
        } else if (countdownVal < 0) {
            clearInterval(window._snakeCountdown);
            window._snakeCountdown = null;
            window._snakeLoop = setInterval(draw, 180);
        }
    }, 800);

    // Keyboard handler reads from window.snakeState — always current
    if (!window._snakeKeyHandler) {
        window._snakeKeyHandler = (e) => {
            if (!window.snakeState) return;
            // Don't hijack typing — bail out if focus is in any input/textarea
            const t = e.target;
            if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
            const k = e.key.toLowerCase();
            let captured = true;
            if (k === 'arrowup' || k === 'w') window.snakeState.nextDir = {x: 0, y: -1};
            else if (k === 'arrowdown' || k === 's') window.snakeState.nextDir = {x: 0, y: 1};
            else if (k === 'arrowleft' || k === 'a') window.snakeState.nextDir = {x: -1, y: 0};
            else if (k === 'arrowright' || k === 'd') window.snakeState.nextDir = {x: 1, y: 0};
            else captured = false;
            if (captured) e.preventDefault();
        };
        document.addEventListener('keydown', window._snakeKeyHandler);
    }

    // Focus the canvas so keystrokes aren't swallowed by other elements
    canvas.tabIndex = 0;
    canvas.focus();
}

function loadGame(btn, url) {
    document.querySelectorAll('.ai-result-card .ai-option').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('gameFrame').src = url;
}

// ========================================
// /image COMMAND — AI Image Generation (Pollinations.ai)
// ========================================
function generateImage(prompt) {
    const btn = document.getElementById('aiGenBtn');
    const typing = document.getElementById('aiTyping');
    const result = document.getElementById('aiResult');

    btn.classList.add('loading');
    btn.disabled = true;
    typing.classList.add('active');
    result.classList.remove('visible');

    // Pollinations turbo — fast model, 512x512 = generation in 1-3s
    const seed = Math.floor(Math.random() * 1000000);
    const enhancedPrompt = `${prompt}, professional photo, high detail, beautifully composed, soft light`;
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(enhancedPrompt)}?width=512&height=512&nologo=true&enhance=false&model=turbo&seed=${seed}`;

    const startTime = Date.now();

    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
        renderImageResult(imageUrl, prompt, elapsed, seed);
        typing.classList.remove('active');
        result.classList.add('visible');
        btn.classList.remove('loading');
        btn.disabled = false;
        showToast(`✨ Image generated in ${elapsed}s`);
    };

    img.onerror = () => {
        typing.classList.remove('active');
        btn.classList.remove('loading');
        btn.disabled = false;
        result.innerHTML = `
            <div class="ai-result-card" style="padding:32px;text-align:center;">
                <h3 style="font-family:'Playfair Display',serif;font-size:24px;margin-bottom:12px;">⚠️ Image generation failed</h3>
                <p style="color:var(--text-dim);font-size:14px;">Couldn't reach the image API. Check your connection and try again.</p>
            </div>`;
        result.classList.add('visible');
    };

    img.src = imageUrl;
}

function renderImageResult(imageUrl, prompt, elapsed, seed) {
    const result = document.getElementById('aiResult');
    result.innerHTML = `
        <div class="ai-result-card">
            <div class="ai-result-hero" style="padding:24px 32px;">
                <div class="ai-result-badge" style="background:linear-gradient(135deg,#10b981,#06b6d4);color:#fff;">🖼 AI IMAGE</div>
                <h2 class="ai-result-name" style="font-size:26px;">Your Image</h2>
                <p class="ai-result-tagline">Generated from: <em style="color:var(--accent);">"${prompt}"</em></p>
            </div>
            <div style="padding:0 32px;">
                <div style="position:relative;border-radius:var(--radius-sm);overflow:hidden;background:#000;">
                    <img id="aiGeneratedImg" src="${imageUrl}" alt="${prompt.replace(/"/g, '&quot;')}" style="width:100%;display:block;" />
                </div>
            </div>
            <div class="ai-meta-bar" style="padding:20px 32px;">
                <span class="ai-meta-item">⏱ ${elapsed}s</span>
                <span class="ai-meta-item">🎲 Seed: ${seed}</span>
                <span class="ai-meta-item">📐 512×512</span>
                <div style="margin-left:auto;display:flex;gap:8px;flex-wrap:wrap;">
                    <button class="ai-option" onclick="downloadAIImage('${imageUrl}', '${prompt.replace(/'/g, "\\'").slice(0, 40)}')">⬇ Download</button>
                    <button class="ai-option" onclick="regenerateImage('${prompt.replace(/'/g, "\\'")}')">🔄 Try another</button>
                </div>
            </div>
        </div>
    `;
}

function downloadAIImage(url, name) {
    const a = document.createElement('a');
    a.href = url;
    a.download = `recipeai-${name.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.jpg`;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('💾 Saving image...');
}

function regenerateImage(prompt) {
    document.getElementById('aiPrompt').value = `/image ${prompt}`;
    generateImage(prompt);
}

// ========================================
// /prompt gen COMMAND — Detailed image prompt builder
// ========================================
const promptPools = {
    openings: [
        "generate a image of",
        "create a stunning photo of",
        "produce a high-resolution shot of",
        "render a cinematic image of",
        "compose a magazine-style photograph of",
        "visualize a beautifully detailed scene of"
    ],
    lighting: [
        "soft natural window light", "golden hour glow", "dramatic side lighting",
        "studio softbox lighting", "candlelit warm tones", "overcast diffused daylight",
        "morning sunlight streaming in", "moody chiaroscuro lighting"
    ],
    cameras: [
        "shot on a Hasselblad medium format", "captured with a 50mm prime lens at f/1.8",
        "shot on Kodak Portra 400 film", "85mm portrait lens with creamy bokeh",
        "macro lens with shallow depth of field", "Sony Alpha 7R with sharp detail"
    ],
    moods: [
        "warm and inviting", "minimalist and refined", "rustic and earthy",
        "elegant and sophisticated", "playful and vibrant", "moody and atmospheric",
        "fresh and bright", "intimate and cozy"
    ],
    compositions: [
        "overhead flat-lay composition", "three-quarter angle", "eye-level perspective",
        "close-up macro detail", "wide environmental shot", "rule-of-thirds framing",
        "centered hero composition", "asymmetric editorial layout"
    ],
    surfaces: [
        "on a marble surface", "on weathered wood", "on a linen tablecloth",
        "on slate stone", "on a ceramic plate", "on parchment paper",
        "on a copper tray", "on dark walnut"
    ],
    finishes: [
        "professional food photography", "magazine cover quality", "award-winning composition",
        "ultra-detailed textures", "rich color grading", "sharp focus on subject",
        "depth of field blur in background", "high dynamic range"
    ]
};

function generatePromptForUser(subject) {
    const opening = promptPools.openings[Math.floor(Math.random() * promptPools.openings.length)];
    const lighting = promptPools.lighting[Math.floor(Math.random() * promptPools.lighting.length)];
    const camera = promptPools.cameras[Math.floor(Math.random() * promptPools.cameras.length)];
    const mood = promptPools.moods[Math.floor(Math.random() * promptPools.moods.length)];
    const composition = promptPools.compositions[Math.floor(Math.random() * promptPools.compositions.length)];
    const surface = promptPools.surfaces[Math.floor(Math.random() * promptPools.surfaces.length)];
    const finish = promptPools.finishes[Math.floor(Math.random() * promptPools.finishes.length)];

    const fullPrompt = `${opening} ${subject}, ${surface}, ${lighting}, ${composition}, ${mood} mood, ${camera}, ${finish}`;

    const result = document.getElementById('aiResult');
    const typing = document.getElementById('aiTyping');
    typing.classList.remove('active');

    result.innerHTML = `
        <div class="ai-result-card">
            <div class="ai-result-hero" style="padding:24px 32px;">
                <div class="ai-result-badge" style="background:linear-gradient(135deg,#06b6d4,#10b981);color:#fff;">✍️ PROMPT BUILDER</div>
                <h2 class="ai-result-name" style="font-size:26px;">Your detailed prompt</h2>
                <p class="ai-result-tagline">Subject: <em style="color:var(--accent);">"${subject}"</em></p>
            </div>
            <div style="padding:0 32px 24px;">
                <div style="background:rgba(12,13,12,0.6);border:1px solid var(--border-strong);border-radius:var(--radius-sm);padding:20px;font-family:'Inter',sans-serif;font-size:14px;line-height:1.7;color:var(--text);" id="generatedPromptText">
                    ${fullPrompt}
                </div>
                <div style="display:flex;gap:8px;margin-top:16px;flex-wrap:wrap;">
                    <button class="ai-option" onclick="copyGeneratedPrompt()">📋 Copy</button>
                    <button class="ai-option active" onclick="useGeneratedPrompt()">🖼 Generate this image</button>
                    <button class="ai-option" onclick="generatePromptForUser('${subject.replace(/'/g, "\\'")}')">🔄 Try another</button>
                </div>
            </div>
        </div>
    `;
    result.classList.add('visible');
    showToast('✨ Prompt ready');
}

function copyGeneratedPrompt() {
    const text = document.getElementById('generatedPromptText').textContent.trim();
    navigator.clipboard.writeText(text).then(() => {
        showToast('📋 Copied to clipboard');
    }).catch(() => {
        showToast('⚠️ Copy failed — try selecting manually');
    });
}

function useGeneratedPrompt() {
    const text = document.getElementById('generatedPromptText').textContent.trim();
    document.getElementById('aiPrompt').value = `/image ${text}`;
    generateImage(text);
}

// ========================================
// GOOGLE SIGN IN
// ========================================
function openGoogleSignIn() {
    document.getElementById('authModal').classList.add('active');
    setTimeout(() => document.getElementById('authName').focus(), 200);
}

function closeGoogleSignIn() {
    document.getElementById('authModal').classList.remove('active');
}

function completeGoogleSignIn() {
    const name = document.getElementById('authName').value.trim();
    const email = document.getElementById('authEmail').value.trim();
    if (!name || !email) return;

    const initials = name.split(/\s+/).slice(0, 2).map(s => s[0]).join('').toUpperCase();
    const colors = ['4285F4', '34A853', 'EA4335', 'FBBC05', '6c5ce7', '00cec9'];
    const color = colors[name.length % colors.length];
    const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=${color}&color=fff&size=80&bold=true`;

    const user = { name, email, avatar };
    localStorage.setItem('recipeai_user', JSON.stringify(user));

    applyUserState(user);
    closeGoogleSignIn();
    showToast(`👋 Welcome, ${name.split(' ')[0]}!`);
}

function applyUserState(user) {
    if (!user) {
        document.getElementById('googleSignInBtn').style.display = '';
        document.getElementById('userPill').style.display = 'none';
        return;
    }
    document.getElementById('googleSignInBtn').style.display = 'none';
    const pill = document.getElementById('userPill');
    pill.style.display = '';
    document.getElementById('userAvatar').src = user.avatar;
    document.getElementById('userName').textContent = user.name.split(' ')[0];
    document.getElementById('userMenuAvatar').src = user.avatar;
    document.getElementById('userMenuName').textContent = user.name;
    document.getElementById('userMenuEmail').textContent = user.email;
}

function openUserMenu() {
    const menu = document.getElementById('userMenu');
    menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
}

function signOut() {
    localStorage.removeItem('recipeai_user');
    document.getElementById('userMenu').style.display = 'none';
    applyUserState(null);
    showToast('👋 Signed out. Come back soon!');
}

// Close user menu on outside click
document.addEventListener('click', (e) => {
    const menu = document.getElementById('userMenu');
    const pill = document.getElementById('userPill');
    if (menu && menu.style.display === 'block' && !menu.contains(e.target) && !pill.contains(e.target)) {
        menu.style.display = 'none';
    }
});

// Restore user state on load
(function restoreUser() {
    try {
        const stored = localStorage.getItem('recipeai_user');
        if (stored) applyUserState(JSON.parse(stored));
    } catch (e) {}
})();
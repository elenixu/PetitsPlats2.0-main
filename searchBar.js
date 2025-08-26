// Main searchbar (hard-block < and >)
const mainInput = document.querySelector('.searchBar-input');

function stripAnglesLocal(s) {
  return String(s ?? '').replace(/[<>]/g, '');
}

if (!mainInput) {
  console.error('searchBar-input not found');
} else {
  // Blocks insertions from typing/IME before they hit the field
  mainInput.addEventListener('beforeinput', (e) => {
    const data = e.data ?? '';
    if (e.inputType.startsWith('insert') && /[<>]/.test(data)) {
      e.preventDefault();
    }
  });

  // Fallback block on keyboard
  mainInput.addEventListener('keydown', (e) => {
    if (e.key === '<' || e.key === '>') e.preventDefault();
  });

  // Clean pastes
  mainInput.addEventListener('paste', (e) => {
    e.preventDefault();
    const text =
      (e.clipboardData || window.clipboardData).getData('text') || '';
    const cleaned = stripAnglesLocal(text);
    if (typeof mainInput.setRangeText === 'function') {
      const { selectionStart, selectionEnd } = mainInput;
      mainInput.setRangeText(cleaned, selectionStart, selectionEnd, 'end');
      mainInput.dispatchEvent(new Event('input', { bubbles: true }));
    } else {
      document.execCommand('insertText', false, cleaned);
    }
  });

  // Final safety net + update your search
  mainInput.addEventListener('input', (e) => {
    const raw = e.target.value;
    const cleaned = stripAnglesLocal(raw);
    if (cleaned !== raw) e.target.value = cleaned; // mirror cleaned text

    searchQuery = cleaned.trim().toLowerCase();
    applyFilters();
  });
}

// extract unique value

function getUniqueValues(recipes) {
  const ingredients = new Set();
  const utensils = new Set();
  const appliances = new Set();

  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ing) =>
      ingredients.add(ing.ingredient.toLowerCase())
    );
    appliances.add(recipe.appliance.toLowerCase());
    recipe.ustensils.forEach((u) => utensils.add(u.toLowerCase()));
  });

  return {
    ingredients: Array.from(ingredients),
    utensils: Array.from(utensils),
    appliances: Array.from(appliances),
  };
}

// // render dropdown
function renderDropdown(id, values, onChange) {
  const container = document.getElementById(id);
  const select = document.createElement('select');
  const defaultOption = document.createElement('option');
  defaultOption.textContent = `-- ${id.split('-')[0]} --`;
  defaultOption.disabled = true;
  defaultOption.selected = true;
  select.appendChild(defaultOption);

  values.forEach((val) => {
    const option = document.createElement('option');
    option.value = val;
    option.textContent = val;
    select.appendChild(option);
  });

  select.addEventListener('change', (e) => onChange(e.target.value));
  container.appendChild(select);
}

let selectedIngredients = [];
let selectedUstensils = [];
let selectedAppliances = [];

function applyFilters() {
  let filtered = window.recipes;

  // Search query filter
  if (searchQuery && searchQuery.length >= 3) {
    filtered = filtered.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(searchQuery) ||
        recipe.description.toLowerCase().includes(searchQuery) ||
        recipe.ingredients.some((ing) =>
          ing.ingredient.toLowerCase().includes(searchQuery)
        )
    );
  }

  // Ingredient tag filters
  if (selectedIngredients.length > 0) {
    filtered = filtered.filter((recipe) =>
      selectedIngredients.every((tag) =>
        recipe.ingredients.some(
          (ing) => ing.ingredient.toLowerCase() === tag.toLowerCase()
        )
      )
    );
  }

  // Ustensil tag filters
  if (selectedUstensils.length > 0) {
    filtered = filtered.filter((recipe) =>
      selectedUstensils.every((tag) =>
        recipe.ustensils.map((u) => u.toLowerCase()).includes(tag.toLowerCase())
      )
    );
  }

  // Appliance tag filters
  if (selectedAppliances.length > 0) {
    filtered = filtered.filter((recipe) =>
      selectedAppliances.includes(recipe.appliance.toLowerCase())
    );
  }

  renderRecipes(filtered);

  const { ingredients, utensils, appliances } = getUniqueValues(filtered);
  populateDropdownIngredients(ingredients);
  populateDropdownUtensils(utensils);
  populateDropdownAppliances(appliances);
}

// init filters

function updateSelectedFilters() {
  const container = document.getElementById('selected-filters');
  container.innerHTML = '';

  function createTag(label, onRemove) {
    const tag = document.createElement('div');
    tag.classList.add('filter-tag');
    const text = document.createElement('span');
    text.textContent = label;
    tag.appendChild(text);

    const close = document.createElement('button');
    close.textContent = '×';
    close.addEventListener('click', onRemove);
    tag.appendChild(close);

    container.appendChild(tag);
  }

  selectedIngredients.forEach((ingredient) => {
    createTag(ingredient, () => {
      selectedIngredients = selectedIngredients.filter((i) => i !== ingredient);
      updateSelectedFilters();
      applyFilters();
    });
  });

  selectedUstensils.forEach((ustensil) => {
    createTag(ustensil, () => {
      selectedUstensils = selectedUstensils.filter((u) => u !== ustensil);
      updateSelectedFilters();
      applyFilters();
    });
  });

  selectedAppliances.forEach((appliance) => {
    createTag(appliance, () => {
      selectedAppliances = selectedAppliances.filter((a) => a !== appliance);
      updateSelectedFilters();
      applyFilters();
    });
  });
}

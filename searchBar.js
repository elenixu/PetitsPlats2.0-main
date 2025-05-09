// Main searchbar

document.addEventListener('DOMContentLoaded', () => {
  const { ingredients, utensils, appliances } = getUniqueValues(window.recipes);

  renderDropdown('ingredient-filter', ingredients, (val) => {
    if (!selectedIngredients.includes(val)) {
      selectedIngredients.push(val);
      updateSelectedFilters();
      applyFilters();
    }
  });

  renderDropdown('ustensil-filter', utensils, (val) => {
    if (!selectedUstensils.includes(val)) {
      selectedUstensils.push(val);
      updateSelectedFilters();
      applyFilters();
    }
  });

  renderDropdown('appliance-filter', appliances, (val) => {
    if (!selectedAppliances.includes(val)) {
      selectedAppliances.push(val);
      updateSelectedFilters();
      applyFilters();
    }
  });

  renderRecipes(window.recipes);
});

document.querySelector('.searchBar-input').addEventListener('input', (e) => {
  searchQuery = e.target.value.trim().toLowerCase();
  applyFilters(); // triggers combined search + filters
});

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

// render dropdown
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

  // General text search (after 3 letters)
  if (searchQuery.length >= 3) {
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
    filtered = filtered.filter((r) =>
      selectedIngredients.every((ingredient) =>
        r.ingredients.some((ing) => ing.ingredient.toLowerCase() === ingredient)
      )
    );
  }

  // Ustensil tag filters
  if (selectedUstensils.length > 0) {
    filtered = filtered.filter((r) =>
      selectedUstensils.every((ustensil) =>
        r.ustensils.some((u) => u.toLowerCase() === ustensil)
      )
    );
  }

  // Appliance tag filters
  if (selectedAppliances.length > 0) {
    filtered = filtered.filter((r) =>
      selectedAppliances.includes(r.appliance.toLowerCase())
    );
  }

  renderRecipes(filtered);
}

// init filters

function updateSelectedFilters() {
  const container = document.getElementById('selected-filters');
  container.innerHTML = '';

  function createTag(label, onRemove) {
    const tag = document.createElement('div');
    tag.style.display = 'flex';
    tag.style.alignItems = 'center';
    tag.style.background = '#ddd';
    tag.style.padding = '5px 8px';
    tag.style.borderRadius = '12px';
    tag.style.fontSize = '14px';
    tag.style.margin = '5px';

    const text = document.createElement('span');
    text.textContent = label;
    tag.appendChild(text);

    const close = document.createElement('button');
    close.textContent = '×';
    close.style.marginLeft = '8px';
    close.style.border = 'none';
    close.style.background = 'transparent';
    close.style.cursor = 'pointer';
    close.style.fontSize = '16px';

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

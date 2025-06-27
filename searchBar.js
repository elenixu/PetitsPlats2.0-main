// Main searchbar

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
  const filteredRecipes = window.recipes.filter((recipe) => {
    // Check if all selected ingredients are present
    const hasIngredients = selectedIngredients.every((tag) =>
      recipe.ingredients.some(
        (ing) => ing.ingredient.toLowerCase() === tag.toLowerCase()
      )
    );

    // Check if all selected utensils are present
    const hasUstensils = selectedUstensils.every((tag) =>
      recipe.ustensils.map((u) => u.toLowerCase()).includes(tag.toLowerCase())
    );

    // Check if selected appliances match
    const hasAppliances = selectedAppliances.every(
      (tag) => recipe.appliance.toLowerCase() === tag.toLowerCase()
    );

    return hasIngredients && hasUstensils && hasAppliances;
  });

  renderRecipes(filteredRecipes);

  // Extract new unique values from filtered recipes
  const { ingredients, utensils, appliances } =
    getUniqueValues(filteredRecipes);

  // Re-populate the dropdowns
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

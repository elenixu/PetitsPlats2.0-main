// --- Dropdown Filters (Fixed Version) ---

const dropdownBtn2 = document.getElementById('dropdownButton2');
const dropdownList2 = document.getElementById('ingredient-filter');
const dropdownIcon2 = document.getElementById('dropdownIcon2');
const dropdownText2 = document.getElementById('dropdownText2');
dropdownText2.textContent = 'Ingrédients';

dropdownBtn2.addEventListener('click', () => {
  const isOpen = dropdownList2.classList.toggle('show');
  dropdownIcon2.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.dropdown2')) {
    dropdownList2.classList.remove('show');
    dropdownIcon2.style.transform = 'rotate(0deg)';
    document.getElementById('ustensil-filter').classList.remove('show');
    document.getElementById('dropdownIcon3').style.transform = 'rotate(0deg)';
    document.getElementById('appliance-filter').classList.remove('show');
    document.getElementById('dropdownIcon4').style.transform = 'rotate(0deg)';
  }
});

function populateDropdownIngredients(ingredients) {
  dropdownList2.innerHTML = '';
  const searchInput = document.createElement('input');
  searchInput.className = 'dropdown-search-input';
  searchInput.placeholder = 'Rechercher...';
  dropdownList2.appendChild(searchInput);

  const renderOptions = (filtered) => {
    dropdownList2
      .querySelectorAll('.dropdown-option')
      .forEach((el) => el.remove());
    filtered.forEach((ingredient) => {
      const opt = document.createElement('div');
      opt.className = 'dropdown-option';
      opt.textContent = ingredient;
      opt.dataset.value = ingredient;
      opt.addEventListener('click', () => {
        if (!selectedIngredients.includes(ingredient)) {
          selectedIngredients.push(ingredient);
          updateSelectedFilters();
          applyFilters();
          text.textContent = 'Ingredients';
          dropdownList2.classList.remove('show');
          dropdownIcon2.style.transform = 'rotate(0deg)';
        }
      });
      dropdownList2.appendChild(opt);
    });
  };

  renderOptions(ingredients);
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    renderOptions(
      ingredients.filter((ing) => ing.toLowerCase().includes(query))
    );
  });
}

function populateDropdownUtensils(utensils) {
  const list = document.getElementById('ustensil-filter');
  const text = document.getElementById('dropdownText3');
  const icon = document.getElementById('dropdownIcon3');

  list.innerHTML = '';
  const searchInput = document.createElement('input');
  searchInput.className = 'dropdown-search-input';
  searchInput.placeholder = 'Rechercher...';
  list.appendChild(searchInput);

  const renderOptions = (filtered) => {
    list.querySelectorAll('.dropdown-option').forEach((el) => el.remove());
    filtered.forEach((ustensil) => {
      const opt = document.createElement('div');
      opt.className = 'dropdown-option';
      opt.textContent = ustensil;
      opt.dataset.value = ustensil;
      opt.addEventListener('click', () => {
        if (!selectedUstensils.includes(ustensil)) {
          selectedUstensils.push(ustensil);
          updateSelectedFilters();
          applyFilters();
          text.textContent = 'Ustensils';
          list.classList.remove('show');
          icon.style.transform = 'rotate(0deg)';
        }
      });
      list.appendChild(opt);
    });
  };

  renderOptions(utensils);
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    renderOptions(utensils.filter((u) => u.toLowerCase().includes(query)));
  });
}

function populateDropdownAppliances(appliances) {
  const list = document.getElementById('appliance-filter');
  const text = document.getElementById('dropdownText4');
  const icon = document.getElementById('dropdownIcon4');

  list.innerHTML = '';
  const searchInput = document.createElement('input');
  searchInput.className = 'dropdown-search-input';
  searchInput.placeholder = 'Rechercher...';
  list.appendChild(searchInput);

  const renderOptions = (filtered) => {
    list.querySelectorAll('.dropdown-option').forEach((el) => el.remove());
    filtered.forEach((appliance) => {
      const opt = document.createElement('div');
      opt.className = 'dropdown-option';
      opt.textContent = appliance;
      opt.dataset.value = appliance;
      opt.addEventListener('click', () => {
        if (!selectedAppliances.includes(appliance)) {
          selectedAppliances.push(appliance);
          updateSelectedFilters();
          applyFilters();
          text.textContent = 'Appareils';
          list.classList.remove('show');
          icon.style.transform = 'rotate(0deg)';
        }
      });
      list.appendChild(opt);
    });
  };

  renderOptions(appliances);
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    renderOptions(appliances.filter((a) => a.toLowerCase().includes(query)));
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const { ingredients, utensils, appliances } = getUniqueValues(window.recipes);

  const utensilBtn = document.getElementById('dropdownButton3');
  const utensilList = document.getElementById('ustensil-filter');
  const utensilIcon = document.getElementById('dropdownIcon3');
  utensilBtn.addEventListener('click', () => {
    const isOpen = utensilList.classList.toggle('show');
    utensilIcon.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
  });

  const applianceBtn = document.getElementById('dropdownButton4');
  const applianceList = document.getElementById('appliance-filter');
  const applianceIcon = document.getElementById('dropdownIcon4');
  applianceBtn.addEventListener('click', () => {
    const isOpen = applianceList.classList.toggle('show');
    applianceIcon.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
  });

  populateDropdownIngredients(ingredients);
  populateDropdownUtensils(utensils);
  populateDropdownAppliances(appliances);

  renderRecipes(window.recipes);
});

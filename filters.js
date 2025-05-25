// Filter custom container

const dropdownBtn2 = document.getElementById('dropdownButton2');
const dropdownList2 = document.getElementById('dropdownList2');
const dropdownIcon2 = document.getElementById('dropdownIcon2');
const dropdownText2 = document.getElementById('dropdownText2');
dropdownText2.textContent = 'Ingrédients';

dropdownBtn2.addEventListener('click', () => {
  const isOpen = dropdownList2.classList.toggle('show');

  // Directly set rotation based on dropdown state
  dropdownIcon2.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
});

dropdownList2.addEventListener('click', (e) => {
  if (e.target.dataset.value) {
    dropdownText2.textContent = e.target.dataset.value;
    dropdownList2.classList.remove('show');
    dropdownIcon2.style.transform = 'rotate(0deg)';
  }
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.dropdown2')) {
    dropdownList2.classList.remove('show');
    dropdownIcon2.style.transform = 'rotate(0deg)';
  }
});

function populateDropdownIngredients(ingredients) {
  dropdownList2.innerHTML = ''; // Clear previous items

  // Create and insert the search input
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.placeholder = '';
  searchInput.className = 'dropdown-search-input';
  dropdownList2.appendChild(searchInput);

  // Wrapper to re-render filtered list
  const renderOptions = (filteredIngredients) => {
    // Remove existing options
    dropdownList2
      .querySelectorAll('.dropdown-option')
      .forEach((el) => el.remove());

    filteredIngredients.forEach((ingredient) => {
      const option = document.createElement('div');
      option.className = 'dropdown-option';
      option.textContent = ingredient;
      option.setAttribute('data-value', ingredient);

      option.addEventListener('click', () => {
        if (!selectedIngredients.includes(ingredient)) {
          selectedIngredients.push(ingredient);
          updateSelectedFilters();
          applyFilters();
          dropdownText2.textContent = ingredient;
          dropdownList2.classList.remove('show');
          dropdownIcon2.style.transform = 'rotate(0deg)';
        }
      });

      dropdownList2.appendChild(option);
    });
  };

  // Initial render
  renderOptions(ingredients);

  // Filter on input
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = ingredients.filter((ing) =>
      ing.toLowerCase().includes(query)
    );
    renderOptions(filtered);
  });
}

function populateDropdownUtensils(utensils) {
  const list = document.getElementById('dropdownList3');
  const text = document.getElementById('dropdownText3');
  const icon = document.getElementById('dropdownIcon3');
  const btn = document.getElementById('dropdownButton3');

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
      opt.setAttribute('data-value', ustensil);
      opt.addEventListener('click', () => {
        if (!selectedUstensils.includes(ustensil)) {
          selectedUstensils.push(ustensil);
          updateSelectedFilters();
          applyFilters();
          text.textContent = ustensil;
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

  btn.addEventListener('click', () => {
    const isOpen = list.classList.toggle('show');
    icon.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('#dropdownButton3')) {
      list.classList.remove('show');
      icon.style.transform = 'rotate(0deg)';
    }
  });
}

function populateDropdownAppliances(appliances) {
  const list = document.getElementById('dropdownList4');
  const text = document.getElementById('dropdownText4');
  const icon = document.getElementById('dropdownIcon4');
  const btn = document.getElementById('dropdownButton4');

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
      opt.setAttribute('data-value', appliance);
      opt.addEventListener('click', () => {
        if (!selectedAppliances.includes(appliance)) {
          selectedAppliances.push(appliance);
          updateSelectedFilters();
          applyFilters();
          text.textContent = appliance;
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

  btn.addEventListener('click', () => {
    const isOpen = list.classList.toggle('show');
    icon.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('#dropdownButton4')) {
      list.classList.remove('show');
      icon.style.transform = 'rotate(0deg)';
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const { ingredients, utensils, appliances } = getUniqueValues(window.recipes);

  populateDropdownIngredients(ingredients);
  populateDropdownUtensils(utensils);
  populateDropdownAppliances(appliances);

  renderRecipes(window.recipes);
});

/// Get the recipes from the global window object
let searchQuery = '';

function renderRecipes(recipes) {
  const cardContainer = document.getElementById('cards-root');
  cardContainer.innerHTML = ''; // clear previous content

  recipes.forEach((recipe) => {
    const card = document.createElement('div');
    card.classList.add('card-container');

    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('image-wrapper');

    const img = document.createElement('img');
    img.classList.add('card-img');
    img.src = `Assets/JSON recipes/${recipe.image}`;
    img.alt = recipe.name;

    const textBox = document.createElement('div');
    textBox.classList.add('card-container-text');

    const title = document.createElement('div');
    title.classList.add('card-recette-titre');
    title.textContent = recipe.name;
    textBox.appendChild(title);

    const info = document.createElement('div');
    info.classList.add('card-time');
    info.textContent = `${recipe.time}min`;

    imageWrapper.appendChild(img);
    imageWrapper.appendChild(info);
    card.appendChild(imageWrapper);

    const recetteTitle = document.createElement('h2');
    recetteTitle.textContent = 'RECETTE';
    recetteTitle.className = 'recette-title';
    textBox.appendChild(recetteTitle);

    const description = document.createElement('p');
    description.classList.add('card-description');
    description.textContent = recipe.description;
    textBox.appendChild(description);

    card.appendChild(img);
    card.appendChild(textBox);

    const ingredientsTitle = document.createElement('h2');
    ingredientsTitle.textContent = 'Ingrédients';
    ingredientsTitle.className = 'recette-title';
    textBox.appendChild(ingredientsTitle);

    const ingredientsList = document.createElement('ul');
    ingredientsList.classList.add('card-ingredients');

    recipe.ingredients.forEach((item) => {
      const li = document.createElement('li');
      const nameSpan = document.createElement('span');
      nameSpan.className = 'ingredient-name';
      nameSpan.textContent = item.ingredient;

      const quantitySpan = document.createElement('span');
      quantitySpan.className = 'ingredient-quantity';
      if (item.quantity !== undefined) {
        quantitySpan.textContent = `${item.quantity}${item.unit ? ' ' + item.unit : ''}`;
      }

      li.appendChild(nameSpan);
      li.appendChild(quantitySpan);
      ingredientsList.appendChild(li);
    });

    textBox.appendChild(ingredientsList);
    cardContainer.appendChild(card);
    updateCounter();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const cardContainer = document.getElementById('cards-root');

  if (!cardContainer) {
    console.error('Missing #cards-root');
    return;
  }

  if (!window.recipes || !Array.isArray(window.recipes)) {
    console.error('Missing or invalid window.recipes data');
    return;
  }

  renderRecipes(window.recipes);
  updateCounter();
});

function updateCounter() {
  const recipeCards = document.querySelectorAll('.card-container');
  const counter = document.querySelector('.counter');
  if (counter) {
    counter.innerHTML = `<h3>${recipeCards.length} recettes</h3>`;
  }
}

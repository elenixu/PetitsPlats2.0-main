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

  window.recipes.forEach((recipe) => {
    const card = document.createElement('div');
    card.classList.add('card-container');

    const img = document.createElement('img');
    img.classList.add('card-img');
    img.src = `Assets/JSON recipes/${recipe.image}`;
    img.alt = recipe.name;

    const textBox = document.createElement('div');
    textBox.classList.add('card-container-text');

    // Title
    const title = document.createElement('div');
    title.classList.add('card-title');
    title.textContent = recipe.name;
    textBox.appendChild(title);

    // Time & Servings
    const info = document.createElement('div');
    info.classList.add('card-info');
    info.textContent = ` ${recipe.time} min | ${recipe.servings} part${recipe.servings > 1 ? 's' : ''}`;
    textBox.appendChild(info);

    // Ingredients
    const ingredientsList = document.createElement('ul');
    ingredientsList.classList.add('card-ingredients');
    recipe.ingredients.forEach((item) => {
      const li = document.createElement('li');
      let line = item.ingredient;
      if (item.quantity !== undefined) {
        line += `: ${item.quantity}`;
        if (item.unit) line += ` ${item.unit}`;
      }
      li.textContent = line;
      ingredientsList.appendChild(li);
    });
    textBox.appendChild(ingredientsList);

    // Description
    const description = document.createElement('p');
    description.classList.add('card-description');
    description.textContent = recipe.description;
    textBox.appendChild(description);

    card.appendChild(img);
    card.appendChild(textBox);
    cardContainer.appendChild(card);
  });
});

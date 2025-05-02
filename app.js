
const form = document.getElementById('search-form');
const mealContainer = document.getElementById('meal-container');
const spinner = document.getElementById('spinner');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const mealInput = document.getElementById('mealInput').value.trim();
  if (mealInput) {
    searchMeal(mealInput);
  }
});

function searchMeal(meal) {
  spinner.style.display = 'block';
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
    .then(response => response.json())
    .then(data => {
      spinner.style.display = 'none';
      if (data.meals) {
        const mealHtml = data.meals.map(meal => `
          <h2>${meal.strMeal}</h2>
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
          <p>${meal.strInstructions}</p>
        `).join('');
        mealContainer.innerHTML = mealHtml;
      } else {
        mealContainer.innerHTML = '<p>No meals found.</p>';
      }
    })
    .catch(error => {
      spinner.style.display = 'none';
      mealContainer.innerHTML = '<p>Error searching for meals.</p>';
    });
}
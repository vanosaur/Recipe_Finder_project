const searchForm = document.querySelector('form');
const searchInput = document.querySelector('#search');
const resultsList = document.querySelector('#results');
const loadingMessage = document.querySelector('#loading-message'); 

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchRecipes();
})

async function searchRecipes() {
    const searchValue = searchInput.value.trim();

    // Show the loading message immediately
    loadingMessage.style.display = 'block';

    try {
        // Fetch recipes from API
        const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${encodeURIComponent(searchValue)}&app_id=9276da93&app_key=b6fa89e89d2b9ee095a51b8534cd6a11`);
        const data = await response.json();
        console.log("API Response:", data);  

        
        if (data.hits && data.hits.length > 0) {
            displayRecipes(data.hits);
        } else {
            resultsList.innerHTML = "<p>No recipes found.</p>";
        }
    } catch (error) {
        console.error("Error fetching recipes:", error);
        resultsList.innerHTML = "<p>Sorry, there was an error fetching the recipes. Please try again.</p>";
    } finally {
       
        loadingMessage.style.display = 'none'; 
    }
}

function displayRecipes(recipes) {
    let html = '';
    recipes.forEach((recipe) => {
        html += `
        <div>
            <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
            <h3>${recipe.recipe.label}</h3>
            <ul>
                ${recipe.recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
            <a href="${recipe.recipe.url}" target="_blank">View Recipe</a>
        </div> 
        `;
    });
    resultsList.innerHTML = html;
}


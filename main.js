import { setCurrentDay } from './dateModule.js'

// Get a reference to the element with the ID "current-day"
const currentDayElement = document.getElementById("current-day");
currentDayElement.textContent = setCurrentDay();

let recipes = [];
const recipeList = document.querySelector(".recipe-list ul");
const tabButtonsContainers = document.querySelectorAll(".tab-buttons");
const groceryItemList = document.querySelector(".grocery-list ul");
const recipeInstructionList = document.querySelector(".recipe-instructions ul");
const showAllButton = document.getElementById("show-all-groceries");
const instructionsHeader = document.getElementById("instructions");
const groceriesHeader = document.getElementById("groceries");

function clearGroceryList() {
    while (groceryItemList.firstChild) {
        groceryItemList.removeChild(groceryItemList.firstChild);        
    }
}

function replaceGroceryList(event) {
    const clickedButton = event.target;
    clearGroceryList();
    
    if (clickedButton === showAllButton) {
        recipes.forEach((recipe) => {
                recipe.groceryList.forEach((grocery) => {
                const listItem = document.createElement("li");
                listItem.textContent = `${grocery.amount} ${grocery.unit} of ${grocery.item}`;
                groceryItemList.appendChild(listItem);
            });
        });
        groceriesHeader.textContent = "Groceries for Today's Recipes"
        instructionsHeader.textContent = "";
    } else {
        const recipeId = clickedButton.getAttribute("data-recipe");
        const recipe = recipes[recipeId-1];
        recipe.groceryList.forEach((grocery) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${grocery.amount} ${grocery.unit} of ${grocery.item}`;
            groceryItemList.appendChild(listItem);
        });
        groceriesHeader.textContent = `Groceries for Today's Recipes #${recipeId}`;
        instructionsHeader.textContent = `Recipe ${recipeId} Instructions`;
    }
}

function clearRecipeList() {
    while (recipeInstructionList.firstChild) {
        recipeInstructionList.removeChild(recipeInstructionList.firstChild);
    }
}

function replaceRecipeList(event) {
    const clickedButton = event.target;

    const recipeId = clickedButton.getAttribute("data-recipe");
    const recipe = recipes[recipeId-1];

    clearRecipeList();

    recipe.instructions.forEach((inst) => {
        const listItem = document.createElement("li");
        listItem.textContent = inst;
        recipeInstructionList.appendChild(listItem);
    });
}

showAllButton.addEventListener('click', replaceGroceryList);
showAllButton.addEventListener('click', replaceRecipeList);

const url = "https://recipes-lycancooks.s3.us-east-2.amazonaws.com/recipes.json";

fetch(url)
    .then((response) => response.json())
    .then((jsontext) => {
        recipes = jsontext;
        clearGroceryList();
        clearRecipeList();

        recipes.forEach((recipe, index) => {
            const listItem = document.createElement("li");
            const recipeButton = document.createElement("button");
            const groceryListItem = document.createElement("li");
        
            listItem.textContent = recipe.name;
            listItem.setAttribute("data-recipe", (index + 1));
        
            recipeButton.textContent = "Recipe " + (index + 1);
            recipeButton.classList.add("tab-button");
            recipeButton.setAttribute("data-recipe", (index + 1));

            recipe.groceryList.forEach((gli) => {  
                const groceryListItemClone = groceryListItem.cloneNode(true);
                groceryListItemClone.textContent = `${gli.amount} ${gli.unit} of ${gli.item}`;
                groceryItemList.appendChild(groceryListItemClone);
            });
        
            recipeList.appendChild(listItem);
            tabButtonsContainers.forEach((container) => {
                const buttonClone = recipeButton.cloneNode(true);
                buttonClone.addEventListener('click', replaceGroceryList);
                buttonClone.addEventListener('click', replaceRecipeList);
                container.appendChild(buttonClone);
            });

            if (index === 0) {
                recipe.instructions.forEach((inst) => {                    
                    const recipeListItem = document.createElement("li");
                    recipeListItem.textContent = inst;
                    recipeInstructionList.appendChild(recipeListItem);
                });
            }
        });
    }).catch(() => {
        console.log("Couldn't grab json");
    })  
;
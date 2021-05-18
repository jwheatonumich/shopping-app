//Create a list of every recipe
let recipeList = []

for (i in data){
    
    if (!recipeList.includes(data[i].Recipe)){
        recipeList.push(data[i].Recipe)
    }
    
}

//Create a form that allows user to select recipies
let controlDiv = document.querySelector("#controlDiv")
form = document.createElement("form")
form.setAttribute("id","formDiv")
controlDiv.appendChild(form)

let formDiv = document.querySelector("#formDiv")

for (i in recipeList){
    input = document.createElement("input")
    input.setAttribute("type","checkbox")
    input.setAttribute("value",recipeList[i])

    label = document.createElement("label")
    label.textContent = recipeList[i]

    linebreak = document.createElement("br");

    formDiv.appendChild(input)
    formDiv.appendChild(label)
    formDiv.appendChild(linebreak)
}

submitButton = document.createElement("input")
submitButton.setAttribute("id","submit")
submitButton.setAttribute("type","button")
submitButton.setAttribute("value","Submit")
formDiv.appendChild(submitButton)

//Store selected recipie names in array
let selectedRecipies = []

let checkboxes = document.querySelectorAll("input[type=checkbox]");
let submit = document.getElementById("submit");

function getChecked() {
  let checked = [];

  for (let i = 0; i < checkboxes.length; i++) {
    let checkbox = checkboxes[i];
    if (checkbox.checked) {
            checked.push(checkbox.value);
        }
  }
  return checked;
}

//Delete contents of a div
function clearBox(elementID)
{
    document.getElementById(elementID).innerHTML = "";
}

//Create an array with the total ingredients for the selected recipies
let ingredients = []; 

function totalIngredients(){
    for (i in data){
    
        if (selectedRecipies.includes(data[i].Recipe)){
            ingredients.push(data[i])
        }
        
    }
}

//Create an array with the count of each ingredient in the selected recipies
let ingredientsCount = [];

function countIngredients(objArr){

    // Create a map with the sum of each ingredient
    let counts = objArr.reduce((prev, curr) => {
        //Get the sum so far of the current ingredient, or use 0 if none
        let count = prev.get(curr.Ingredient) || 0;
        //Add the new number to the running total for the ingredient
        prev.set(curr.Ingredient, curr.Quantity + count);
        return prev;
    }, new Map());

  // Turn the map into an array
  let reducedObjArr = [...counts].map(([Ingredient, Quantity]) => {
    return {Ingredient, Quantity}
  })

    // Create a map with the unit of each ingredient
    let units = objArr.reduce((prev, curr) => {
        //Set the prev unit to the current unit
        prev.set(curr.Ingredient, curr.Unit);
        return prev;
    }, new Map());

  // Turn the map into an array
  let reducedUnitArr = [...units].map(([Ingredient, Unit]) => {
    return {Ingredient, Unit}
  })

  //Add units to the ingredient count array
  //Iterate through the objects in the count array
  for (i in reducedObjArr){
    let newUnit

    //find the matching unit in the units array
    for (j in reducedUnitArr){
        if (reducedUnitArr[j]["Ingredient"] == reducedObjArr[i]["Ingredient"]){
            newUnit = reducedUnitArr[j]["Unit"]
        }
    }

    //Add the unit to the count array
    reducedObjArr[i]["Unit"] = newUnit;
  }

  return reducedObjArr
}

//Display the ingredients on the page
function displayIngredients(){
    for (i in ingredientsCount){
        ingredientPara = document.createElement("p");
        ingredientPara.setAttribute("class","ingredientPara");

        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.name = "name";
        checkbox.value = "value";
        checkbox.id = "id";
        checkbox.setAttribute("onclick","checkedIngredient(this);");

        var label = document.createElement('label');
        label.htmlFor = "id";
        label.appendChild(document.createTextNode(ingredientsCount[i].Ingredient + ": " + ingredientsCount[i].Quantity + " " + ingredientsCount[i].Unit));

        controlDiv.appendChild(ingredientPara);
        ingredientPara.appendChild(checkbox);
        ingredientPara.appendChild(label);
    
    }
}

//What happens when submit button is clicked
submit.addEventListener("click", function() {
  selectedRecipies = getChecked();
  clearBox("controlDiv");
  totalIngredients();
  ingredientsCount = countIngredients(ingredients);
  displayIngredients()
});

//Event to handle clicking an ingredient checkbox
function checkedIngredient(el){

    //If the box is checked, strikethrough, otherwise don't
    el.parentNode.className = el.checked ? "checkedIngredientPara" : "ingredientPara";

    //If the box is checked, move to bottom, otherwise move to top
    if(el.checked){
        el.parentNode.parentNode.appendChild(el.parentNode);
    }else{
        el.parentNode.parentNode.insertBefore(el.parentNode, el.parentNode.parentNode.firstChild);
    }
  }
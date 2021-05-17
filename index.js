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
    // first, convert data into a Map with reduce
    let counts = objArr.reduce((prev, curr) => {
        let count = prev.get(curr.Ingredient) || 0;
        prev.set(curr.Ingredient, curr.Quantity + count);
        return prev;
    }, new Map());
  
  // then, map your counts object back to an array
  let reducedObjArr = [...counts].map(([Ingredient, Quantity]) => {
    return {Ingredient, Quantity}
  })
  return reducedObjArr
}

//Display the ingredients on the page
function displayIngredients(){
    for (i in ingredientsCount){
        ingredientPara = document.createElement("p");
        input.setAttribute("class","ingredientPara");
        //ingredientPara.textContent = ingredientsCount[i].Ingredient + ": " + ingredientsCount[i].Quantity;

        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.name = "name";
        checkbox.value = "value";
        checkbox.id = "id";

        var label = document.createElement('label')
        label.htmlFor = "id";
        label.appendChild(document.createTextNode(ingredientsCount[i].Ingredient + ": " + ingredientsCount[i].Quantity));

        controlDiv.appendChild(ingredientPara);
        ingredientPara.appendChild(checkbox);
        ingredientPara.appendChild(label);
    
        //controlDiv.appendChild(ingredientPara);
        //controlDiv.appendChild(linebreak);
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

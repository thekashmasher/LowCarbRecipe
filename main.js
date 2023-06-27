// HTML elements
let ingredientsInput = document.getElementById('ingredients');
let exclusionsInput = document.getElementById('exclusions');
let caloriesInput = document.getElementById('calories');
let submitButton = document.getElementById('submit');
let resultContainer = document.getElementById('result');

console.log("Hi"); 

let outPutMsg = '';



// Event listener for submit button
submitButton.addEventListener('click', async () => {//adds event listener
  
  let ingredients = ingredientsInput.value;//Gets values entered in ingredients,etc
  let exclusions = exclusionsInput.value;
  let calories = caloriesInput.value;
  console.log(ingredients);
  console.log(exclusions);
  console.log(calories);

  
  if (isNotFilled(ingredients) || isNotFilled(exclusions) || isNotFilled(calories)){
    outPutMsg = "Please enter a value for all fields";
    
  }
  else {

    let url2 = `https://low-carb-recipes.p.rapidapi.com/search?name=cake&tags=keto%3Bdairy-free&includeIngredients=${inputTransform(ingredients)}&excludeIngredients=${inputTransform(exclusions)}&maxPrepareTime=10&maxCookTime=20&maxCalories=${calories}&maxNetCarbs=5&maxSugar=3&maxAddedSugar=0&limit=10`
    console.log(url2);
  
    const options = {//defines the options for API request
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '774bcfabddmsh55dedde68729c6ep124020jsn90b591c2fcbb',
        'X-RapidAPI-Host': 'low-carb-recipes.p.rapidapi.com'
      }
    };

    try {
    
      const response = await fetch(url2, options);//sends request
      const result = await response.json();//request parsed as JSON
      console.log(result);
      
      try {
        
        if (typeof result === 'object' && result.message == 'no results containing all your search terms were found'){
          
          outPutMsg = 'No recipes found. Check spelling of ingredients.';
        }
        else if (typeof result === 'object' && result.message == 'You have exceeded the rate limit per second for your plan, BASIC, by the API provider'){

          outPutMsg= 'Too many requests. Please wait and try again.';
        }
        else {

          outPutMsg = '';

          //For each recipe, populate the page with the contents
          for (let i = 0; i < result.length; i++){

            dataPopulate(result[i], i);

          }


        }

      } catch (error) {
        
        // Catches any errors with parsing
        console.error(error);
        outPutMsg = 'An error occurred. Please try again.';
      }
      // let output = '';
  
      // for (const recipe of result.results) {//iterates over each recipe, appends title,ingred,and instructions to output
      //   output += `Title: ${recipe.title}\n`;
      //   output += `Ingredients:\n`;
      //   for (const ingredient of recipe.ingredients) {
      //     output += `- ${ingredient}\n`;
      //   }
      //   output += `Instructions:\n${recipe.instructions}\n\n`;
      // }
  
      //resultContainer.textContent = output;
    
    } catch (error) {//catches any errors with the api request
      console.error(error);
      outPutMsg = 'An error occurred. Please try again.';
      
    }

  }
  
  //let url = `https://low-carb-recipes.p.rapidapi.com/search?name=cake&tags=keto%3Bdairy-free&includeIngredients=egg%3Bbutter&excludeIngredients=cinnamon&maxPrepareTime=10&maxCookTime=20&maxCalories=500&maxNetCarbs=5&maxSugar=3&maxAddedSugar=0&limit=10`;



  console.log(outPutMsg)
  resultContainer.textContent = outPutMsg;
});


//Transform entered ingredients and exclusions into a suitable format for the api
const inputTransform = (input) => {

  // Remove spaces, make the input lowercase and separate words with '%3B'
  return input.toLowerCase().split(" ").map(word => word.trim()).filter(word => word != "").join("%3B");
}

// Check if the input string is empty or if it is just composed of spaces
const isNotFilled = (str) => {
  
  return str.trim() === '';
}

const dataPopulate = (data, index) => {
  
  //THIS METHOD OF HARDCODING IS NOT GOOD. I DID IT JUST TO DEMONSTRATE. REWRITE THIS FUNCTION
  let title1 = document.getElementById('title1');
  let image1 = document.getElementById('image1');
  let description1 = document.getElementById('description1');
  let steps1 = document.getElementById('steps1');

  let title2 = document.getElementById('title2');
  let image2 = document.getElementById('image2');
  let description2 = document.getElementById('description2');  let steps2 = document.getElementById('steps2');

  let title3 = document.getElementById('title3');
  let image3 = document.getElementById('image3');
  let description3 = document.getElementById('description3');
  let steps3 = document.getElementById('steps3');

  if (index == 0){
    title1.textContent = data.name;
    image1.src = data.image;
    description1.textContent = data.description;
    steps1.textContent = data.steps; 
  }
  if (index == 1){
    title2.textContent = data.name;
    image2.src = data.image;
    description2.textContent = data.description;
    steps2.textContent = data.steps; 
  }
  if (index == 2){
    title3.textContent = data.name;
    image3.src = data.image;
    description3.textContent = data.description;
    steps3.textContent = data.steps; 
  }

}
// let dataArray = [
//   {
//     name: document.getElementById('title1').textContent,
//     image: document.getElementById('image1').src,
//     description: document.getElementById('description1').textContent,
//     steps: document.getElementById('steps1').textContent
//   },
//   {
//     name: document.getElementById('title2').textContent,
//     image: document.getElementById('image2').src,
//     description: document.getElementById('description2').textContent,
//     steps: document.getElementById('steps2').textContent
//   },
//   {
//     name: document.getElementById('title3').textContent,
//     image: document.getElementById('image3').src,
//     description: document.getElementById('description3').textContent,
//     steps: document.getElementById('steps3').textContent
//   }
// ];
// const dataPopulate = (index, data) => {
//   let title = document.getElementById(`title${index + 1}`);
//   let image = document.getElementById(`image${index + 1}`);
//   let description = document.getElementById(`description${index + 1}`);
//   let steps = document.getElementById(`steps${index + 1}`);

//   title.textContent = data.name;
//   image.src = data.image;

//   description.textContent = data.description;
//   steps.textContent = data.steps; 
// }

// for (let i = 0; i < dataArray.length; i++) {
//   dataPopulate(i, dataArray[i]);
// }

const gameContainer = document.getElementById("game");

let card1 = null;
let card2 = null;
let flippedCard = false;
let clickCount = 0;
let noClick = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.style.backgroundColor = "lightgray";

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  const clickTarget = event.target;

    //Checking to see if card can be clicked
    if(clickTarget.classList.contains("flipped")){
      return;
    }

    if(noClick === true){
      return;
    }
    //Changing card color
    clickTarget.style.backgroundColor = clickTarget.classList.value;

    //Assigning clicks to card variables
    if(card1 === null && card2 === null){
        clickCount++;

        card1 = clickTarget;
        card1.classList.add("flipped");
    }
    else if(card1 !== null && card2 === null){
        clickCount++;

        card2 = clickTarget;
        card2.classList.add("flipped");
    }
    
    //Do actions depending on if cards match
    if(clickCount === 2){
        clickCount = 0;
        noClick = true;

        if(card1.className !== card2.className){
            setTimeout(function(){
              card1.style.backgroundColor = "lightgray";
              card2.style.backgroundColor = "lightgray";

              card1.classList.remove("flipped");
              card2.classList.remove("flipped");
              
              card1 = null;
              card2 = null;

              noClick = false;
            }, 1000);
            
        }

        else{
            card1.removeEventListener("click", handleCardClick);
            card2.removeEventListener("click", handleCardClick);

            card1 = null;
            card2 = null;

            noClick = false;
        }
    }
}

// when the DOM loads
createDivsForColors(shuffledColors);
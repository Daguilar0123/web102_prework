/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
// This statement brings in the data from the file 'games.js' and assigns it to the variable GAMES_DATA.
// The data is in JSON format: a string representation of an array of objects, where each object is a
// dictionary containing information about a game. Each entry in the array is a dictionary. Each dictionary
// is a game. Each game has the same number of properties, represented as key-value pairs. The keys are the
// same for each game, but the values are different. The values are strings, numbers, or booleans.
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse to read the text that is stored
// as the string variable GAMES_DATA and convert it into a JavaScript object.
/* ACTUAL ENTRY IN GAMES_DATA. GAMES_DATA[0] is the first entry in the array of games. It is the dictionary depicted here:
{
    "name": "Heroes Of Mythic Americas",
    "description": "An exciting 5e RPG supplement that heroically represents pre-Columbian American cultures and mythologies",
    "pledged": 1572,
    "goal": 10000,
    "backers": 9,
    "img": "./assets/heroes_of_mythic_americas.png"
  }
*/
// JSON.parse(GAMES_DATA) converts the string representation of the full array of games. As a result, the properties of each game can be accessed using dot notation.
// For example, GAMES_JSON[0] would give us the first game object in the array.
// GAMES_JSON[0].name would give us the value at the key "name" in the first game object, which is "Heroes of Mythic Americas".
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// From the DOM (Document Object Model) grab the element with the id games-container
// The DOM is a tree-like structure that represents the HTML of a webpage. In this case, the DOM is the HTML of the
// file 'index.html'. This line grabs the element with the id 'games-container' and assigns it to the variable gamesContainer.
// The element with the id 'games-container' is a div element that is a child of the body element. It is the parent element of
// the game cards that will be added to the page.
// In simple terms, this line uses dot notation (i.e. literally uses a period/"dot" to append a method to an object) on the document object
// to call the method 'getElementById', which is named after the thing that it does. It then passes the Id of the element in question, which is 'games-container'.
// The method searches the DOM for id and returns the first element with that id.
// The returned element is then assigned to the variable gamesContainer, which can be used to manipulate the element in the DOM.
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    // loop over each item in the data
    // Technically, the loop with no body just iterates the values of "i", starting from "i=0" and ending at "i = games.length - 1".
    // "i++" tells us what to do to "i" after each iteration. In this case, we increment "i" by 1.
    // The body of the loop is where we create the game card and append it to the games container.
    for (let i = 0; i < games.length; i++) {
        // Since "i" is the only variable that changes in the loop, we can use it to access each game in the array.
        // When "i" equals '0', the following line sets the variable "game" to the value at index 0 of the games array. 
        // When "i" equals '1', the following line sets the variable "game" to the value at index 1 of the games array.
        // This continues until "i" equals 'games.length - 1', at which point the loop ends.
        const game = games[i];
        // create a new div element, which will become the game card
        const gameCard = document.createElement("div");

        // add the class game-card to the list
        gameCard.classList.add("game-card");

        
        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        gameCard.innerHTML = `
            <img src="${game.img}" class="game-img" />
            <h2>${game.name}</h2>
            <p>${game.description}</p>
            <h3>Goal: $${game.goal}</h3>
            <h3>Pledged: $${game.pledged}</h3>
            <h3>Backers: ${game.backers}</h3>
        `;

        // append the game to the games-container
        gamesContainer.append(gameCard);
    }
}
// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
// Same as getElementById above, but with a different id. This line grabs the element with the id 'num-contributions'
// which in the HTML is the <p> element that is a child of the div with the id 'contributions-card'.
// It is the element that will display the total number of contributions to all games on the page.
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
// First, GAMES_JSON.reduce() takes a callback function as an argument. The callback function is:
    // '(acc, game) => { return acc + game.backers; }' where 'acc' is the accumulator and 'game' is the current game
    // object in the array. The callback function takes the accumulator and adds the number of backers for the current game
const totalContributions = GAMES_JSON.reduce((acc, game) => {
    return acc + game.backers;
}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributions.toLocaleString('en-US')}`;


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// set inner HTML using template literal
const totalRaised = GAMES_JSON.reduce((acc, game) => {
    return acc + game.pledged;
}, 0);
raisedCard.innerHTML = `$${totalRaised.toLocaleString('en-US')}`;


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const totalGames = GAMES_JSON.length;
gamesCard.innerHTML = `${totalGames}`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let listOfUnfundedGames = GAMES_JSON.filter((game) => {
        return game.pledged < game.goal;
    });


    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(listOfUnfundedGames);
}
//filterUnfundedOnly();
// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let listOfFundedGames = GAMES_JSON.filter((game) => {
        return game.pledged >= game.goal;
    });

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(listOfFundedGames);
}
//filterFundedOnly();

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// Use reduce() to sum the number of unfunded games
// First, dot notation is used to access the GAMES_JSON array, which is an array of game objects.
// Then, reduce() is called on the array to iterate over each game object and accumulate (acc) the
// number of unfunded games by checking if the pledged amount is less than the goal amount.
// Reduce takes two arguments ((1) a callback function and (2) an initial value:
    // Argument (1): a callback function that is called for each game object in the array. It also takes two arguments:
        // Argument (a): 'acc' is the accumulator, which is the value that is returned by the callback function after each iteration
        // Argument (b): 'game' is the current game object in the array.
            // Another way to think of 'game' is as GAMES_JSON[i], which is passed into the callback function as the second argument,
            // where 'i' is the index of the current game of the object in the array. The index starts at 0
            // and increments by 1 after each iteration.
    // Argument (2) an initial value for the accumulator, which is set to 0 in this case.
    // IF: ('game.pledged < game.goal': True) -> return acc + 1
    // ELSE: ('game.pledged < game.goal': False) -> return acc
const unfundedGamesNum = GAMES_JSON.reduce((acc, game) => {
    return game.pledged < game.goal ? acc + 1 : acc; 
}, 0);
/* COMMENTED OUT CODE
  / use filter or reduce to count the number of unfunded games

const unfundedGamesNum = GAMES_JSON.filter((game) => {
        return game.pledged < game.goal;
    }).length;

// create a string that explains the number of unfunded games using the ternary operator
/* COMMENTED OUT CODE
const displayStr =
    'The number of unfunded games is ' + unfundedGamesNum + ' out of ' + GAMES_JSON.length + ' total games.';
*/

// create a string that explains the number of unfunded games using the ternary operator
// Use a template string to display how much money has been raised and for how many games, as well as
// explaining how many games currently remain unfunded. Use the ternary operator (?) to make sure the 
// statement is grammatically correct regardless of the number of unfunded games.
const displayStr =
    `A total of $${totalRaised.toLocaleString('en-US')} has been raised for ${totalGames} games.
    Currently ${unfundedGamesNum} game${unfundedGamesNum === 1 ? '' : 's'} remain ${unfundedGamesNum === 1 ? 's' : ''}
    unfunded. We need your help to fund these amazing games!`;

// create a new DOM element containing the template string and append it to the description container
const descriptionElement = document.createElement("p");
descriptionElement.innerHTML = displayStr;

descriptionContainer.appendChild(descriptionElement);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame, ...rest] = sortedGames;
// console.log(firstGame);
let { name, ...rest2 } = firstGame;
let { name: name2, ...rest3 } = secondGame;
console.log(name2);

// create a new element to hold the name of the top pledge game, then append it to the correct element
const topFundedName = document.createElement("p");
topFundedName.innerHTML = name;
firstGameContainer.appendChild(topFundedName);
// do the same for the runner up item
const secondFundedName = document.createElement("p");
secondFundedName.innerHTML = name2;
secondGameContainer.appendChild(secondFundedName);
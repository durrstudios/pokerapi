var betButton;
var bet = 0;
var recentAction;
// EDIT THESE
const playersAPI = 'https://pokerapi.darwincereska.repl.co' + "/api/players/"
const betAPI = 'https://pokerapi.darwincereska.repl.co' + "/api/bets/"

// 






const canvasDimentions = 600;

class Player {
  constructor(name, initialBalance = 0) {
    this.name = name;
    this.balance = initialBalance;
  }

  deposit(amount) {
    this.balance += amount;
    console.log(`${this.name} deposited $${amount}. New balance: $${this.balance}`);
    recentAction = `${this.name} deposited $${amount}. New balance: $${this.balance}`
  }

  withdraw(amount) {
    if (amount <= this.balance) {
      this.balance -= amount;

      console.log(`${this.name} withdrew $${amount}. New balance: $${this.balance}`);
      recentAction = `${this.name} withdrew $${amount}. New balance: $${this.balance}`
    } else {
      console.log(`${this.name} doesn't have sufficient funds.`);
      recentAction = `${this.name} doesn't have sufficient funds.}`
    }
  }

  getBalance() {
    console.log(`${this.name}'s current balance: $${this.balance}`);
  }

  bet(amount) {
    if (amount <= this.balance) {
      this.balance -= amount
      bet += amount;
      console.log(`${this.name} placed a bet of $${amount}. Good luck!`);
      recentAction = `${this.name} placed a bet of $${amount}. Good luck!`
      // You can add more logic for handling bets here
    } else {
      console.log(`${this.name} doesn't have sufficient funds to place a bet.`);
      recentAction = `${this.name} doesn't have sufficient funds to place a bet.`
    }
  }

  win(amount) {
    this.balance += amount;
    bet = 0;
    console.log(`${this.name} won $${amount}! New balance: $${this.balance}`);
    recentAction = `${this.name} won $${amount}! New balance: $${this.balance}`
    allBALANCE()
  }
};


const players = {};
// Dictionary of player names





// EDIT HERE
const playerNames = [];

// Fetch Players
fetch(playersAPI)
  .then(response => response.json())
  .then(data => {

    console.log('Received data:')
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      // Access the 'name' property of each data object and push 
      // it to the playerNames array
      playerNames.push(data[i].name);
    }

    console.log(playerNames)

    //   TO CHANGE STARTING NUMBERS EDIT HERE DEFAULT 50
    makePlayers()

    //   




    allBALANCE()
    wipeAPIBets()
  })
  .catch(error => {
    console.error('Error:', error);
  });




console.log('All balance is running')



// TEST HERE

// Function to check the API for new data and place a bet
// Store the previous data to compare
let previousData = {};
let previousPlayers = {};

// Function to check the API for new data and place a bet
function checkAndPlaceBet() {
  // Replace 'apiEndpoint' with the actual API endpoint of the site
  const apiEndpoint = betAPI;

  // Make a GET request to the API
  fetch(apiEndpoint)
    .then(response => response.json())
    .then(data => {
      // Check if there is new data
      if (data && data.name && data.bet && data.id) {
        // Compare with the previous data
        if (
          data.name !== previousData.name ||
          data.bet !== previousData.bet ||
          data.id !== previousData.id
        ) {
          // Store the new data for future comparison
          previousData = { name: data.name, bet: data.bet, id: data.id };

          // Run the place_bet function with the new values
          BET(data.name, int(data.bet))
        } else {
          console.log('Data has not changed.');
        }
      } else {
        console.log('No new data found.');
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

// Function to place a be

// Set up a timer to periodically check for new data (e.g., every 5 seconds)
setInterval(checkAndPlaceBet, 5000);










//





// Create players from the array
// const players = playerNames.map(name => new Player(name));



function setup() {

  createCanvas(canvasDimentions, canvasDimentions);
  betNameInput = createInput()
  betNameInput.size(50, 15)
  betNameInput.attribute('placeholder', 'Name')
  betNumInput = createInput()
  betNumInput.size(50, 15)
  betNumInput.attribute('placeholder', 'Amount')
  betButton = createButton('Bet');
  betButton.mousePressed(BETBUTTON);
  winInput = createInput()
  winInput.position(200,)
  winInput.size(50, 15)
  winInput.attribute('placeholder', 'Name')
  winButton = createButton("Win")
  winButton.position(250,)
  winButton.mousePressed(WINBUTTON)

  showBalanceButton = createButton('Show Balances')
  showBalanceButton.position((canvasDimentions / 1.27),)
  showBalanceButton.mousePressed(allBALANCE)



}


function draw() {
  background(53, 101, 77);
  strokeWeight(4)
  drawingContext.setLineDash([5, 10]);
  stroke(255, 0, 0)
  line(0, 70, canvasDimentions, 70);
  drawingContext.setLineDash([5, 10]);
  stroke(255)
  line(8, 70, canvasDimentions, 70);

  drawingContext.setLineDash([5, 10]);
  stroke(255, 0, 0)
  line(8, 5, canvasDimentions, 5);
  drawingContext.setLineDash([5, 10]);
  stroke(255)
  line(0, 5, canvasDimentions, 5);


  textSize(13);
  fill(255);
  stroke(0);
  strokeWeight(2);
  text(`Recent Action: ${recentAction}`, 10, 450);
  textSize(25)
  text(`BETS: $${bet}`, 10, 50)
  textSize(15)
  text(`Players: ${playerNames}`, 10, 100)
  textSize(16)
  text(`Player Balances:   ${allBALANCE()}`, 10, 150)


}





function BETBUTTON(name, amount = 50) {
  name = betNameInput.value()
  amount = int(betNumInput.value())



}
function WINBUTTON(name) {
  name = winInput.value()
  WIN(name)
}

// makes players
function makePlayers(balance = 1000) {
  // Create players for each name in the array
  playerNames.forEach(name => {
    players[name] = new Player(name, balance); // You can set an initial balance for all players if needed
  });
  PLAYERS()
}

function PLAYERS() {
  console.log(players)
}
// Win and Bet functions
function WIN(player, amount = bet) {
  players[player].win(amount);
  allBALANCE()
}

function BET(player, amount = 50) {
  players[player].bet(amount);
  allBALANCE()
}
// Balance Function
function BALANCE(player) {
  players[player].getBalance()
}

function allBALANCE() {
  let allBalances = '';
  console.log('___________________________')
  playerNames.forEach(name => {
    console.log(players[name].name, `$${players[name].balance}`)
    allBalances += `\n\n${players[name].name}:       $${players[name].balance}`;
  })
  console.log('___________________________')

  return allBalances
}
// 
function DEPOSIT(player, amount) {
  players[player].deposit(amount);
}
function wipeAPIBets() {
  fetch(betAPI, {
    method: "DELETE", // Use the appropriate HTTP method
    headers: {
      "Content-Type": "application/json",
      // Add any necessary authentication headers here
    },
    // Include any necessary data in the request body
    // body: JSON.stringify({ /* data */ }),
  })
}

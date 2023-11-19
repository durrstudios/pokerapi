const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;
var cors = require('cors');
app.use(cors())
// In-memory array to store data
let playerArray = [
  
];
let betArray = [{
  name: "",
  bet: 0,
  id: 0
}]

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
// GET endpoint to retrieve the array
app.get('/api/players', (req, res) => {
  res.json(playerArray);
});

// POST endpoint to add an item to the array
app.post('/api/players', (req, res) => {
  const newPlayer = req.body;

  // Add a unique ID to the new item

  playerArray.push(newPlayer);

  res.status(201).json(newPlayer);
});

app.get('/api/bets', (req, res) => {
  // Simulating dynamic data from the array; replace this with your logic
  const randomIndex = betArray.length;
  const { name, bet, id } = betArray[randomIndex - 1];

  // Sending the data as JSON
  res.json({
    name: name,
    bet: bet,
    id: id
  });
});

// POST endpoint to add an item to the array
app.post('/api/bets', (req, res) => {
  const newBetPlayer = req.body;
  

  // Add a unique ID to the new item

  betArray.push(newBetPlayer);

  res.status(201).json(newBetPlayer);
});

app.delete('/api/bets', (req,res) => {
  betArray = [{
      name: "",
      bet: 0,
      id: 0
    }]
  res.json({message: 'Bets wiped'
  })
})


app.delete('/api/players', (req, res) => {
  playerArray = [];
  res.json({ message: 'API wiped successfully!' });
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

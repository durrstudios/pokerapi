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
let lastReadBetIndex = 0
let betArray = []

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
  //return all bets since last read
  let startRead = lastReadBetIndex
  let endRead = betArray.length
  lastReadBetIndex = endRead

  console.log(startRead, endRead)

  // Sending the data as JSON
  res.json(betArray.slice(startRead, endRead));
});

// POST endpoint to add an item to the array
app.post('/api/bets', (req, res) => {
  const newBetPlayer = req.body;


  // Add a unique ID to the new item

  betArray.push(newBetPlayer);

  res.status(201).json(newBetPlayer);
});

app.delete('/api/bets', (req, res) => {
  betArray = [{
    name: "",
    bet: 0,
    id: 0
  }]
  res.json({
    message: 'Bets wiped'
  })
})


app.delete('/api/players', (req, res) => {
  playerArray = [];
  res.json({ message: 'API wiped successfully!' });
})

app.get('/sketch.js', function (req, res) {
const options = {
    root: path.join(__dirname)
};

const fileName = '/public/sketch.txt';
res.sendFile(fileName, options, function (err) {
    if (err) {
        next(err);
    } else {
        console.log('Sent:', fileName);
    }
});
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
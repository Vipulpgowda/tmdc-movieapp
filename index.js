const express = require("express");
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const { moviedata } = require('./test.js')
const config = require('./config.js')

const app = express();

// create application/json parser
var jsonParser = bodyParser.json();

// Serve static files from the React frontend app

if(process.env.NODE_ENV === "production"){
  console.log(process.env.NODE_ENV)
  app.use(express.static(path.join(__dirname, 'my-app/build')))
}

app.use(cors())

var movielist = moviedata;

function updatemovie(movie) {
  const arr = [movie].flat();
  movielist = movielist.map(obj => arr.find(item => item.id === obj.id) || obj)
  return movielist;
}

app.get("/getMovies", (req, res) => {
  console.log(process.env.NODE_ENV)
  res.send(JSON.stringify(movielist))
});

app.post('/updateMovies', jsonParser, (req, res) => {

  let input = req.body.data;
  res.send(JSON.stringify(updatemovie(input)))
})
if(process.env.NODE_ENV === "production"){
// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/my-app/build/index.html'))
})
}

app.listen(config.PORT, config.HOST, function () {
  console.log(`App listening on ${config.NODE_ENV} through http://${config.HOST}:${config.PORT}`);
});
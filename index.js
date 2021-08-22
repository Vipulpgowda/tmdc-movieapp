const express = require("express");
const cors = require('cors')
const { moviedata } = require('./test')
const bodyParser = require('body-parser')

const path = require('path')


const PORT = process.env.PORT || 3001;

const app = express();

// create application/json parser
var jsonParser = bodyParser.json();

// Serve static files from the React frontend app
app.use(express.static(('my-app/build')))
// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname,'my-app','build','index.html'))
})

var movielist = moviedata;

function updatemovie(movie) {
  const arr = [movie].flat();
  movielist = movielist.map(obj => arr.find(item => item.id === obj.id) || obj)
  return movielist;
}

app.use(cors())

app.get("/getMovies", (req, res) => {
  res.send(JSON.stringify(movielist))
});

app.post('/change', jsonParser, (req, res) => {

  let input = req.body.data;
  res.send(JSON.stringify(updatemovie(input)))
})


app.listen(PORT, () => {
  console.log(__dirname);
  console.log(`Server listening on ${PORT}`);
});
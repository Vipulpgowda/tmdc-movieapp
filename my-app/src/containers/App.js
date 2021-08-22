import React, { useState, useEffect } from 'react';
import Header from './Header';
import '../stylesheets/main.scss'
import axios from 'axios';

function App() {

  const [moviedata, setMoviedata] = useState([]);

  useEffect(() => {
    axios.get("/getMovies")
      .then((res) => res.data)
      .then((data) => setMoviedata(data));
  }, []);

  const updateMovielist = (data) => {
    setMoviedata(data)
  }


  return (
    <div className="App">
      <Header moviedata={moviedata} updateMovielist={updateMovielist} />
    </div>
  );
}

export default App;

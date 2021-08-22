import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API as prodAPI } from '../config/prod.config';
import { API as devAPI } from '../config/dev.config';
import Header from './Header';
import '../stylesheets/main.scss'

function App() {
  
  const [moviedata, setMoviedata] = useState([]);

  let url;
  if (process.env.NODE_ENV === "production") {
    url = prodAPI.url;
  } else {
    url = devAPI.url;
  }

  const updateMovielist = (data) => {
    setMoviedata(data)
  }

  useEffect(() => {
    axios.get(`${url}getMovies`)
      .then((res) => res.data)
      .then((data) => setMoviedata(data));
  }, []);

  return (
    <div className="App">
      <Header url={url} moviedata={moviedata} updateMovielist={updateMovielist} />
    </div>
  );
}

export default App;

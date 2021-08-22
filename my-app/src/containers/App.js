import React, { useState, useEffect } from 'react';
import Header from './Header';
import '../stylesheets/main.scss'
import axios from 'axios';
import {API as prodAPI} from '../config/prod.config';
import {API as devAPI} from '../config/dev.config';

function App() {
  let url;
  if(process.env.NODE_ENV === "production"){
   url = prodAPI.url;
  }else{
  url = devAPI.url;
  }

  const [moviedata, setMoviedata] = useState([]);

  useEffect(() => {
    axios.get(`${url}/getMovies`)
      .then((res) => res.data)
      .then((data) => setMoviedata(data));
  }, []);

  const updateMovielist = (data) => {
    setMoviedata(data)
  }

  return (
    <div className="App">
      <React.Suspense fallback={<h1>Loading!!!!!</h1>}>
      <Header url={url} moviedata={moviedata} updateMovielist={updateMovielist} />
      </React.Suspense>
    </div>
  );
}

export default App;

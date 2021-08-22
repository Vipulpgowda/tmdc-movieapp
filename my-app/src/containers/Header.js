import React, { useState } from 'react'
import Genrelist from '../components/genrelist'
import Movie from '../components/movie'
import Movielist from '../components/movielist'

function Header(props) {
    const moviedata = props.moviedata;
    const url = props.url;
    const [genre, setGenre] = useState('');
    const [index, setIndex] = useState(Number);
    const [isBack, setisBack] = useState(false);

    const handleSubmit = (event) => {
        setGenre(event.target.innerText)
    }

    const handleMovieSubmit = (event) => {
        let getIndex = moviedata.find((movie) => {
            return movie.title === event.target.alt
        })
        setIndex(getIndex)
        setisBack(true)
    }

    const handleBack = () => {
        setisBack(false)
    }

    const filterMovies = genre.length ? moviedata.filter((item) => {
        return item.genres.includes(genre)
    }) : moviedata

    return (
        <>
        <div className="header">
            {isBack && <button className="btn btn-primary back_button" onClick={handleBack}>Back</button>}
                <h3>Moviely.com</h3>
                <span>V</span>
        </div>
        <div className="genre-list">
            {index && isBack 
                ?
                <Movie index={index} url={url} updateMovielist={props.updateMovielist} />
                :
                <>
                <Genrelist moviedata={moviedata} handleSubmit={handleSubmit} />
                <Movielist filterMovies={filterMovies} handleMovieSubmit={handleMovieSubmit} />
                </>
            }
        </div>
        </>
    )
}

export default Header

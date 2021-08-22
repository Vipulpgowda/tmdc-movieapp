import React from 'react';
import '../stylesheets/pages/_movielist.scss'

function Movielist(props) {

    const movielist = props.filterMovies.map((mov,index) => {
        return <div key={index} className="card movie__item" style={{"width": "18rem"}} onClick={(e) => props.handleMovieSubmit(e)}>
            <img className="card-img-top poster__img" src={mov.posterurl} alt={mov.title}/>
            <div className="card-body">
            <h6 className="card-title">{mov.title}</h6>
            <div className="movie_text">
            <span>Year:</span><span className="card-text movie_span">{mov.year}</span>
            <span>Rating:</span><span className="card-text movie_span">{mov.imdbRating}</span>
            </div>
            </div>
        </div>
    })



    return (
        <div className="movie__list">
            {movielist}
        </div>
    )
}

export default Movielist

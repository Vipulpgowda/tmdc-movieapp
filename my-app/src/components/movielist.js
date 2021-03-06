import React from 'react';

function Movielist(props) {

    let { filterMovies, handleMovieSubmit } = props;

    const movielist = filterMovies.map((mov, index) => {
        return <div key={index} className="card movie__item" style={{ "width": "18rem" }} onClick={(e) => handleMovieSubmit(e)}>
            <img className="card-img-top poster__img" src={mov.posterurl} alt={mov.title} />
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

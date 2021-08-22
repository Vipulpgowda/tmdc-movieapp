import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../stylesheets/pages/_movie.scss'

function Movie(props) {
    let movie = props.index;
    let url = props.url;
    let updateMovielist = props.updateMovielist;
    const [movieInputs, setMovieInputs] = useState(movie);

    useEffect(() => {
        setMovieInputs(movie)
    }, [movie]);

    const changeHandler = (event) => {
        event.persist();
        setMovieInputs({ ...movieInputs, [event.target.name]: event.target.value })
    }

    const renderChange = (input, event) => {
        event.persist();
        let value = movieInputs[event.target.name].slice();
        let indexEl = value.findIndex((i) => i === input);
        value[indexEl] = event.target.value;
        setMovieInputs({ ...movieInputs, [event.target.name]: value });
    }

    useEffect(() => {
        axios.post(`${url}updateMovies`, { data: movieInputs })
            .then((res) => updateMovielist(res.data))
            .catch((err) => console.log("Error", err))
    }, [movieInputs]);

    return (
        <>
            {movieInputs ? (
                <div className="moviecard light card">
                    <div className="movie__title card-body">
                        <div className="movie__header">
                            <h1 className="movie__header__name card-title">{movieInputs.title}</h1>
                            <span className="movie__header__story card-text">{movieInputs.storyline}</span>
                            <h6>Crew</h6><span className="movie__cards">
                                {movieInputs.actors.map((actor, index) => {
                                    return (
                                        <input
                                            key={index}
                                            className="btn btn-primary card-item"
                                            type="text"
                                            name="actors"
                                            value={actor}
                                            onChange={(event) => renderChange(actor, event)} />
                                    )
                                })}
                            </span>
                            <div className="movie__cards">
                                <h6 className="movie__cards__header">Year</h6>
                                <input
                                    className="btn btn-primary card-item__year"
                                    type="text"
                                    name="year"
                                    value={movieInputs.year}
                                    onChange={changeHandler} />
                                <h6 className="movie__cards__header">IMDB Rating</h6>
                                <input
                                    className="btn btn-primary card-item__year"
                                    type="text"
                                    name="imdbRating"
                                    value={movieInputs.imdbRating}
                                    onChange={changeHandler} />
                            </div>
                            <h6>Genre</h6><span className="movie__cards">
                                {movieInputs.genres.map((genre, index) => {
                                    return (
                                        <input
                                            key={index}
                                            className="btn btn-primary card-item"
                                            type="text"
                                            name="genres"
                                            value={genre}
                                            onChange={(event) => renderChange(genre, event)} />
                                    )
                                })}
                            </span>

                        </div>
                        <div className="movie__poster">
                            <img className="movie__poster__img" src={movieInputs.posterurl} alt={movieInputs.title} />
                        </div>
                    </div>
                </div>
            ) : []}
        </>
    )

}
export default Movie

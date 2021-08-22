import React, { useState, useEffect } from 'react';
import { moviedata } from '../_testdata/movie';

import '../stylesheets/pages/_genrelist.scss';

function Genrelist(props) {
    const [genre, setGenre] = useState([]);

    useEffect(() => {
        let genreitems = [];
        let removeDuplicate = [];
        moviedata.map((item) => {
            genreitems = [...genreitems, ...item.genres];
            removeDuplicate = [...new Set(genreitems)];
            return setGenre(removeDuplicate);
        })
    }, [])

    return (
        <>
            <h4 className="genre__title">Sort by genre</h4>
            <div className="genre__list">
                <ul>
                    {genre.map((gen, index) => (
                        <li className="btn btn-primary genre-item" key={index} value={gen} onClick={(e) => props.handleSubmit(e)}>{gen}</li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default Genrelist

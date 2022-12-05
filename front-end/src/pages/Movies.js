import React from 'react'
import { useState, useEffect, useContext } from "react";

const Movies = () => {
  const [movieData, setMovieData] = useState([]);
  
  //Fetch movie list
  useEffect(() => {
    fetch("http://localhost:8080/movies")
        .then((res) => res.json())
        .then((data) => setMovieData(data))
        .catch((error) => {
            console.log(error);
        })
  }, [])

  //sort alphabetically
  const sortMovies = (movieArray) => {
    return movieArray.sort((a, b) => {
      if (a.title) {
        const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();
        if (titleA < titleB) {return -1};
        if (titleA > titleB) {return 1};
        return 0;
      } 
    })
  }

    return (
    <div className='movielist-container'>
        {sortMovies([...movieData]).map(movie => (
            <div id='movie.id'>
                <h2>{movie.title}</h2>
            </div>
        ))}
    </div>
  )
}

export default Movies
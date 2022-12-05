import React from 'react'
import { useState, useEffect, useContext } from "react";

const Movies = () => {
  const [movieData, setMovieData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  //Fetch movie list
  useEffect(() => {
    fetch("http://localhost:8080/movies")
        .then((res) => res.json())
        .then((data) => setMovieData(data))
        .catch((error) => {
            console.log(error);
        })
  }, [])

    return (
    <>
    <div className="search-container">
        <input 
        className="movie-search-bar" 
        type='text' 
        placeholder="Search Movie List" 
        onChange={(event) => {
            setSearchTerm(event.target.value);
        }}
        /> 
    </div>
    <div className='movielist-container'>
    {movieData.filter((value) => {
    if (searchTerm == "" ) {
      return value
    } else if (value.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return value
    }
  }).sort((a, b) => {
    if (a.title) {
      const titleA = a.title.toUpperCase();
      const titleB = b.title.toUpperCase();
      if (titleA < titleB) {return -1};
      if (titleA > titleB) {return 1};
      return 0;
    } 
  }).map(movie => (
            <div id='movie.id'>
                <h2>{movie.title}</h2>
            </div>
        ))}
    </div>
    </>
  )
}

export default Movies
import React from 'react'
import { useState, useEffect, useContext } from "react";

const Movies = () => {
  const [movieData, setMovieData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [addTerm, setAddTerm] = useState("");
  const [titleData, setTitleData] = useState({title: ""});
  const [refresh, setRefresh] = useState(false);

  //Fetch movie list
  useEffect(() => {
    fetch("http://localhost:8080/movies")
      .then((res) => res.json())
      .then((data) => setMovieData(data))
      .catch((error) => {
        console.log(error);
      });
  }, [refresh]);

  //DATA HANDLERS

  //Call this to refresh the table
  const toggleRefresh = () => {
    setRefresh((current) => !current);
  };

  //Add movie to database
  const handleAdd = async (event) => {
    event.preventDefault();
    try {
      let response = await fetch("http://localhost:8080/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({title: addTerm})
      });
      toggleRefresh();
      setAddTerm('');
      if (response.status !== 201) {
        throw new Error
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = async (id) => {
    try {
      let movieDelete = await fetch(`http://localhost:8080/movies/${id}`, {method: "DELETE"})
      toggleRefresh();
      if (movieDelete.status !== 202) {
        throw new Error()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="search-container">
        <input
          className="movie-search-bar"
          type="text"
          placeholder="Search Movie List"
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
        <div className="add-container">
          <input
            className="movie-add-bar"
            type="text"
            placeholder="Add movie"
            value={addTerm}
            onChange={(event) => {
              setAddTerm(event.target.value);
            }}
          />
          <button onClick={handleAdd}>Submit</button>
        </div>
      </div>
      <div>Movie List (sorted alphabetically):</div>
      <div className="movielist-container">
        {movieData
          .filter((value) => {
            if (searchTerm == "") {
              return value;
            } else if (
              value.title.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return value;
            }
          })
          .sort((a, b) => {
            if (a.title) {
              const titleA = a.title.toUpperCase();
              const titleB = b.title.toUpperCase();
              if (titleA < titleB) {
                return -1;
              }
              if (titleA > titleB) {
                return 1;
              }
              return 0;
            }
          })
          .map((movie) => (
            <div key={movie.id} className="movie-card">
              <h2 className="card-title">{movie.title}</h2>
              <h4>Have watched</h4>
              <button onClick={() => handleDelete(movie.id)}>Delete</button>
            </div>
          ))}
      </div>
    </>
  );
}

export default Movies
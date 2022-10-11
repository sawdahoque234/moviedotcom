import React, { useState, useEffect } from "react";

function Form() {
  const [movieSearch, setMovieSearch] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getMoviesByQuery();
  }, [query]);

  async function getMoviesByQuery() {
    if (query.length >= 2) {
      const response = await fetch(
        `https://movie-task.vercel.app/api/search?page=1&query=${query}`
      );
      const data = await response.json();
      setMovieSearch(data.data.results);
    } else setMovieSearch([]);
  }

  function updateQuery(e) {
    setQuery(e.target.value);
  }

  return (
    <div className="search">
      <div className="search-bar">
        <input
          type="text"
          id="search"
          value={query}
          onChange={updateQuery}
          placeholder="SEARCH YOUR FAVOURITE MOVIE"
        />
        <div className="search-list">
          {movieSearch.map((movie) => (
            <div key={movie.id} className="search-item">
              <img
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt={movie.title}
              />
              <a href={`/movie/${movie.id}`} className="search-detail">
                <p className="title">{movie.title}</p>
                <p className="overview">{movie.overview.substring(0, 100)}</p>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Form;

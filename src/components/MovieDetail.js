import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import Lodaing from "./Loading";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    fetch(`https://movie-task.vercel.app/api/movie?movieId=${id}`)
      .then((res) => res.json())
      .then((data) => setMovie(data.data));
    //loader
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 4000);
  }, []);

  return (
    <>
      {loader ? (
        <Lodaing />
      ) : (
        <section className="movie-section">
          <div className="movie-card">
            <figure>
              <img
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt=""
              />
            </figure>
            <div className="card-content">
              <h1>{movie?.title}</h1>
              <span>Popularity:{movie?.popularity}</span> ||{" "}
              <span>Average Vote:{movie?.vote_average}</span> ||{" "}
              <span>Total Vote{movie?.vote_count}</span>
              <p>Relased Date: {movie.release_date}</p>
              <p className="description"> {movie?.overview}</p>
              <br />
              <a href="/" className="back-btn">
                Go Back
              </a>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default MovieDetail;

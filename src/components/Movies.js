import React, { useState, useEffect } from "react";
import Paginate from "react-paginate";
import { NavLink } from "react-router-dom";
import Form from "./Form";
import Lodaing from "./Loading";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(true);
  const [year, setYear] = useState(null);
  const [allPages, setAllPAges] = useState(10);

  useEffect(() => {
    fetch(
      `https://movie-task.vercel.app/api/popular?&page=${page}&release_date=${year}`
    )
      .then((res) => res.json())
      .then((movieData) => {
        setMovies(movieData.data.results);
        setAllPAges(movieData.data.total_pages);
      });
    setTimeout(() => {
      setLoader(false);
    }, 4000);
  }, [page, year]);

  function handlePageChange(page) {
    setPage(page.selected + 1);
  }

  return (
    <>
      {loader ? (
        <Lodaing />
      ) : (
        <div className="catalogue">
          <Form setYear={setYear} />
          <div className="catalogue-list">
            {movies.map((movie) => (
              <NavLink
                to={`/movie/${movie.id}`}
                key={movie.id}
                className="catalogue-item"
              >
                <img
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  alt={movie.title}
                />
                <div className="catalogue-item-detail">
                  <span className="title">{movie.title}</span>
                  <span className="overview">
                    {movie.overview.substring(0, 100)}
                  </span>
                </div>
              </NavLink>
            ))}
          </div>

          <Paginate
            pageCount={allPages}
            initialPage={0}
            marginPagesDisplayed={1}
            pageRangeDisplayed={5}
            previousLabel={<i className="fas fa-angle-left"></i>}
            nextLabel={<i className="fas fa-angle-right"></i>}
            containerClassName={"paginate-container"}
            pageClassName={"paginate-item"}
            activeClassName={"paginate-active-item"}
            previousClassName={"paginate-previous"}
            nextClassName={"paginate-next"}
            disabledClassName={"paginate-disabled"}
            breakClassName={"paginate-break"}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
}

export default Movies;

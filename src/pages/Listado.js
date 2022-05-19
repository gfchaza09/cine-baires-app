import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import axios from 'axios';
import swal from '@sweetalert/with-react';

// Styles
import '../css/listado.css';

const Listado = ({ addOrRemoveFavs, favCheck }) => {

  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    const endPoint = "https://api.themoviedb.org/3/movie/popular?api_key=aef66bef0b704c59db7d71b4f7785508&language=es-ES&page=1";
    axios.get(endPoint)
      .then(res => {
        const apiData = res.data.results;
        let moviesWithoutOverview = apiData.filter((movie) => {
          return movie.overview !== "";
      })
        setMoviesList(moviesWithoutOverview);
      })
      .catch(error => {
        swal(<h2>Hubo errores, intenta más tarde.</h2>,{
          icon: "error",
        })
      })
  }, [setMoviesList]);

  return (
    <>
      <section className='section--listado'>
        <h2>Películas Populares 🎥</h2>
        <div className='section-container--listado'>
          {
            moviesList.map((movie)=>{
              return (
                <div className='container-card--listado' key={movie.id}>
                  <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="movie-poster"/>
                  <button className={`favourite-btn ${favCheck(`${movie.id}`) ? "like" : ""}` } onClick={addOrRemoveFavs} data-movie-id={movie.id}>{favCheck(`${movie.id}`) ? ' ❤️ ' : ' 🖤 '}</button>
                  <div className='card-text--listado'>
                    <h3>{movie.original_title.length > 28 ? `${movie.original_title.substring(0,28)}...` : movie.original_title}</h3>
                    <p>{movie.overview.substring(0,100)}...</p>
                    <NavLink to={`/detalle?movieID=${movie.id}`} className="btn-details">Ver Detalles</NavLink>
                  </div>
                </div>
              )
            })
          }
        </div>
      </section>
    </>
  )
}

export default Listado
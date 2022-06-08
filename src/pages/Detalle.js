import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Utils
import { swal } from '../utils/swal';

// Styles
import '../css/detalle.css';

const Detalle = () => {

  let navigate = useNavigate();

  let query = new URLSearchParams(window.location.search);
  let movieID = query.get('movieID');

  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    const endPoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=aef66bef0b704c59db7d71b4f7785508&language=es-ES`;
    axios.get(endPoint)
      .then(res=>{
        const apiData = res.data;
        setMovieData(apiData);
      })
      .catch(error => {
        swal({type: "error", message:"Hubo errores, intenta más tarde..."});
      })
  }, [movieID])

  const handleBack = () => {
    navigate(-1);
  }

  return (
    <>
      {
        !movieData && <p>Cargando...</p>
      }
      {
        movieData && (
          <>
            <section className='section--detalle'>
              <h2>Título: 🎦 {movieData.original_title}</h2>
              <div className='section-container--detalle'>
                <img src={`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`} alt="movie-poster"/>
                <div className='container-text--detalle'>
                  <h3>Fecha de estreno:</h3>
                  <p>{movieData.release_date}</p>
                  <h3>Reseña: </h3>
                  <p>{movieData.overview}</p>
                  <h3>Calificación: </h3>
                  <p>{movieData.vote_average === 0 ? '-' : movieData.vote_average}</p>
                  <h3>Géneros: </h3>
                  <ul>
                    {movieData.genres.map((genre) => {
                        return(<li key={genre.id}>{genre.name}</li>)
                      })
                    }
                  </ul>
                  <h3>Página oficial: </h3>
                  {
                    movieData.homepage==='' ? <p>-</p> : <a href={movieData.homepage} rel="noopener noreferrer" target="_blank">{movieData.homepage}</a>
                  }
                  <div>
                    <p className="btn-back" onClick={handleBack} to="/"><i className="fas fa-angle-left"></i> Volver</p>
                  </div>
                </div>
              </div>
            </section>
          </>
        )
      }
    </>
  )
}

export default Detalle
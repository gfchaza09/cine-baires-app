import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import swal from '@sweetalert/with-react';

// Styles
import '../css/buscador.css';

const Buscador = ({ addOrRemoveFavs, favCheck }) => {

    let navigate = useNavigate();

    let query = new URLSearchParams(window.location.search);
    let keyword = query.get('keyword');

    const [moviesResult, setMoviesResult] = useState([]);

    const handleSubmit = e => {
        e.preventDefault();

        const keyword = e.currentTarget.keyword.value.trim();

        if (keyword.length === 0) {
            swal(<h3>Tienes que escribir una palabra clave</h3>,{
                icon:"warning",
            });
        } else if (keyword.length < 2) {
            swal(<h3>Tienes que escribir más de un caracter</h3>,{
                icon:"warning",
            });
        } else {
            e.currentTarget.keyword.value = "";
            navigate(`/buscador?keyword=${keyword}`);
        }
    };

    useEffect(() => {
      const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=aef66bef0b704c59db7d71b4f7785508&language=es-ES&page=1&include_adult=false&query=${keyword}`;
      if(keyword !== null) {
          axios.get(endPoint)
            .then(res=>{
                const apiData = res.data.results;
                // Filtramos las películas que no tienen poster
                let moviesWithoutPoster = apiData.filter((movie) => {
                    return movie.poster_path !== null;
                })
                // Filtramos las películas que no tienen reseña
                let moviesWithoutOverview = moviesWithoutPoster.filter((movie) => {
                    return movie.overview !== "";
                })
                setMoviesResult(moviesWithoutOverview);
            })
            .catch(error => {
                swal(<h2>Hubo errores, intenta más tarde.</h2>,{
                    icon: "error",
                })
            })
      }
    }, [keyword])
    

  return (
    <>
        <section className='section--buscador'>
            <h2>Página de búsqueda 🔍</h2>
            <div className='section-container--buscador'>
                <div className="container-form--buscador">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="keyword"><h3>Buscar: </h3></label>
                        <input type="text" autoComplete="off" placeholder='Nombre de la película' id="keyword" name="keyword"/>
                        <button type="submit"><i className='fas fa-search'></i></button>
                    </form>
                </div>
                <div>
                    <h3>Resultados de: {keyword}</h3>
                    {
                        moviesResult.length === 0 && <h4>No hay resultados o todavía no inicaste una búsqueda correctamente.</h4>
                    }
                    <div className='section-container--listado'>
                        {
                            moviesResult.lenght!==null && moviesResult.map(movie => {
                                return (
                                    <div className='container-card--buscador' key={movie.id}>
                                        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="movie-poster"/>
                                        <button className={`favourite-btn ${favCheck(`${movie.id}`) ? "like" : ""}` } onClick={addOrRemoveFavs} data-movie-id={movie.id}>{favCheck(`${movie.id}`) ? ' ❤️ ' : ' 🖤 '}</button>
                                        <div className='card-text--buscador'>
                                            <h3>{movie.original_title.length > 28 ? `${movie.original_title.substring(0,28)}...` : movie.original_title}</h3>
                                            <p>{movie.overview.substring(0,100)}...</p>
                                            <NavLink to={`/detalle?movieID=${movie.id}`} className="btn-details">Ver Detalles</NavLink>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Buscador
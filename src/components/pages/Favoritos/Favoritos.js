import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink} from 'react-router-dom';

// Styles
import './Favoritos.styles.css';

const Favoritos = ({ handleFavorites, favCheck }) => {

  const favMovies = useSelector(state => state.fav.data);

  return (
    <>
    {
      !favMovies ? <div>Cargando</div> : 
      <section className='section--favoritos'>
        <h2>Favoritos ⭐</h2>
        {
          favMovies.length === 0 ? <p>Todavía no marcaste ninguna película como favorita.</p> : (
            <div className='section-container--favoritos'>
              {
                favMovies.map((movie)=>{
                  return (
                    <div className='container-card--favoritos' key={movie.movieData.id}>
                      <img src={movie.movieData.imgUrl} alt="movie-poster"/>
                      <button className='favourite-btn' onClick={handleFavorites} data-movie-id={movie.movieData.id}>{favCheck(`${movie.movieData.id}`) ? ' ❤️ ' : ' 🖤 '}</button>
                      <div className='card-text--favoritos'>
                        <h3>{movie.movieData.title.length > 28 ? `${movie.movieData.title.substring(0,28)}...` : movie.movieData.title}</h3>
                        <p>{movie.movieData.overview.substring(0,100)}...</p>
                        <NavLink to={`/detalle?movieID=${movie.movieData.id}`} className="btn-details">Ver Detalles</NavLink>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          )
        }
      </section>
    }
    </>
  )
}

export default Favoritos
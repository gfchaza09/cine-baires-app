import React from 'react';
import { NavLink} from 'react-router-dom';

// Styles
import '../css/favoritos.css';

const Favoritos = ({ favMovies, addOrRemoveFavs, favCheck }) => {

  return (
    <>
      <section className='section--favoritos'>
        <h2>Favoritos ⭐</h2>
        <div className='section-container--favoritos'>
          {
            favMovies.map((movie)=>{
              return (
                <div className='container-card--favoritos' key={movie.id}>
                  <img src={movie.imgUrl} alt="movie-poster"/>
                  <button className='favourite-btn' onClick={addOrRemoveFavs} data-movie-id={movie.id}>{favCheck(`${movie.id}`) ? ' ❤️ ' : ' 🖤 '}</button>
                  <div className='card-text--favoritos'>
                    <h3>{movie.title.length > 28 ? `${movie.title.substring(0,28)}...` : movie.title}</h3>
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

export default Favoritos
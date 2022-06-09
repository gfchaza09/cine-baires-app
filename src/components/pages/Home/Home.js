import React from 'react'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './Home.styles.css';

const Home = () => {

  const {displayName, email, photo} = useSelector(state => state.auth);
  const movieData = useSelector(state => state.fav.data);

  return (
    <>
        <section className="section--welcome">
            <div className='profile'>
              <img src={photo} alt="foto-de-perfil" />
              <h2>Bienvenido/a {displayName}</h2>
            </div>
            <div className='user-info'>
              <div>
                <h2>Información de contacto</h2>
                <div className='user-info--text'>
                  <p>Nombre de usuario: {displayName}</p>
                  <p>Email: {email}</p>
                </div>
              </div>
              <div>
                <h2>Películas favoritas</h2>
                {
                  movieData.length === 0 ? <p>Todavía no agragaste ninguna película a favoritos</p> : (
                    <div className='fav-movies'>
                      {
                        movieData.map(movie => {
                          return (
                            <NavLink to={`/detalle?movieID=${movie.movieData.id}`} key={movie.movieData.id}>
                              <img src={movie.movieData.imgUrl} alt="favoritas"/>
                            </NavLink>
                          );
                        })
                      }
                    </div>
                  )
                }
              </div>
            </div>
        </section>
    </>
  )
}

export default Home
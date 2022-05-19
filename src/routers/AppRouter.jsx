import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

//Componentes
import Footer from '../components/Footer';
import Header from '../components/Header';

// Páginas
import Listado from '../pages/Listado';
import Buscador from '../pages/Buscador';
import Detalle from '../pages/Detalle';
import Favoritos from '../pages/Favoritos';

// Acciones
import { login } from '../actions/auth';

const AppRouter = () => {

  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user)=>{
      if (user) {        
        dispatch(login(user.uid, user.displayName));   
      } else {
        navigate('/');
      }
    });
  }, [dispatch]);

    const [favMovies, setFavMovies] = useState([]);

    useEffect(() => {
      const favsInLocal = localStorage.getItem("favs");
      if(favsInLocal !== null) {
          const favsArray = JSON.parse(favsInLocal);
          setFavMovies(favsArray);
      }
    }, [])
  
    const addOrRemoveFavs = e => {
  
      const favMovies = localStorage.getItem("favs");
  
      let tempMoviesInFavs;
  
      if (favMovies === null) {
        tempMoviesInFavs = [];
      } else {
        tempMoviesInFavs = JSON.parse(favMovies);
      }
  
      const btn = e.currentTarget;
      const parent = btn.parentElement;
      const imgUrl = parent.querySelector("img").getAttribute("src");
      const title = parent.querySelector("h3").textContent;
      const overview = parent.querySelector("p").textContent;
      const movieData = {
        imgUrl, title, overview, 
        id: btn.dataset.movieId
      }
      // Buscamos la película dentro de tempMoviesInFavs que es nuestro arreglo de películas favoritas en el local Storage
      let movieIsInArray = tempMoviesInFavs.find(oneMovie => {
        return oneMovie.id === movieData.id
      });
  
      if(!movieIsInArray) {
        // Logica de agregar una película de favoritos
        tempMoviesInFavs.push(movieData);
        localStorage.setItem("favs",JSON.stringify(tempMoviesInFavs));
        setFavMovies(tempMoviesInFavs);
      } else {
        // Logica de eliminar una película de favoritos
        let moviesLeft = tempMoviesInFavs.filter(oneMovie=> {
          return oneMovie.id !== movieData.id
        });
        localStorage.setItem("favs",JSON.stringify(moviesLeft));
        setFavMovies(moviesLeft);
      }
    }

    const favCheck = (id) => {
        let movieIsInFavs = favMovies.find(movie=>{
          return movie.id === id
        })
        return movieIsInFavs;
    }

  return (
    <>
        <Header favMovies={ favMovies } />
        <Routes>
          <Route exact path='listado' element={ <Listado favMovies={ favMovies } addOrRemoveFavs={ addOrRemoveFavs } favCheck={favCheck}/>} />
          <Route exact path="detalle" element={ <Detalle />} />
          <Route exact path='favoritos' element={ <Favoritos favMovies={ favMovies } addOrRemoveFavs={ addOrRemoveFavs } favCheck={favCheck}/>} />
          <Route exact path='buscador' element={ <Buscador addOrRemoveFavs={ addOrRemoveFavs } favCheck={favCheck}/>} />
          <Route path="*" element={<Navigate to="listado" />} />
        </Routes>
        <Footer />
    </>
  )
}

export default AppRouter
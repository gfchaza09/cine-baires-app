import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Listado from './pages/Listado';
import Detalle from './pages/Detalle';
import Buscador from './pages/Buscador';
import Favoritos from './pages/Favoritos';

//Styles
import './css/app.css';

const App = () => {

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
      <Router>
        <Header favMovies={ favMovies } />
        <Routes>
          <Route path='/' element={ <Home />}></Route>
          <Route path='listado' element={ <Listado favMovies={ favMovies } addOrRemoveFavs={ addOrRemoveFavs } favCheck={favCheck}/>}></Route>
          <Route path="detalle" element={ <Detalle />} />
          <Route path='favoritos' element={ <Favoritos favMovies={ favMovies } addOrRemoveFavs={ addOrRemoveFavs } favCheck={favCheck}/>}></Route>
          <Route path='buscador' element={ <Buscador addOrRemoveFavs={ addOrRemoveFavs } favCheck={favCheck}/>}></Route>
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App

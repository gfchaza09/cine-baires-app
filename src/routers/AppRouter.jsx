import { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

//Componentes
import Footer from '../components/Footer';
import Header from '../components/Header';

// Páginas
import Home from '../pages/Home';
import Listado from '../pages/Listado';
import Buscador from '../pages/Buscador';
import Detalle from '../pages/Detalle';
import Favoritos from '../pages/Favoritos';

// Acciones
import { login } from '../actions/auth';
import { favAdd, favRead, favRemove } from '../actions/fav';
import { loadData } from '../helpers/loadData';

const AppRouter = () => {

  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dataFav = useSelector(state => state.fav.data);

  useEffect(() => {
    onAuthStateChanged(auth, async (user)=>{
      if (user) {        
        dispatch(login(user.uid, user.displayName));
        const favoritosData = await loadData(user.uid);
        dispatch(favRead(favoritosData));
      } else {
        navigate('/');
      }
    });
  }, [dispatch]);

  const handleFavorites = (e) => {
    const btn = e.currentTarget;
    const parent = btn.parentElement;
    const imgUrl = parent.querySelector("img").getAttribute("src");
    const title = parent.querySelector("h3").textContent;
    const overview = parent.querySelector("p").textContent;
    const movieData = {
      imgUrl, title, overview, 
      id: btn.dataset.movieId
    }

    if (favCheck(movieData.id)) {
      dispatch(favRemove(movieData.id))
    } else {
      dispatch(favAdd(movieData))
    }
    favCheck(movieData.id);
  };

  const favCheck = (id) => {
    let movieIsInFavs = dataFav.find(movie=>{
      return movie.movieData.id === id
    })
    return movieIsInFavs;
  }

  return (
    <>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path='home' element={<Home />} />
          <Route exact path='listado' element={ <Listado handleFavorites={ handleFavorites } favCheck={favCheck}/>} />
          <Route exact path="detalle" element={ <Detalle />} />
          <Route exact path='favoritos' element={ <Favoritos handleFavorites={ handleFavorites } favCheck={favCheck}/>} />
          <Route exact path='buscador' element={ <Buscador handleFavorites={ handleFavorites } favCheck={favCheck}/>} />
          <Route path="*" element={<Navigate to="home" />} />
        </Routes>
        <Footer />
    </>
  )
}

export default AppRouter
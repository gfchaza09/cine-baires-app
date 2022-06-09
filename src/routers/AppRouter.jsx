import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

//Componentes
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';

// Páginas
import Home from '../components/pages/Home/Home';
import Listado from '../components/pages/Listado/Listado';
import Buscador from '../components/pages/Buscador/Buscador';
import Detalle from '../components/pages/Detalle/Detalle';
import Favoritos from '../components/pages/Favoritos/Favoritos';

// Acciones
import { login } from '../store/actions/auth';
import { favAdd, favRead, favRemove } from '../store/actions/fav';
import { loadData } from '../helpers/loadData';

const AppRouter = () => {

  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dataFav = useSelector(state => state.fav.data);

  useEffect(() => {
    onAuthStateChanged(auth, async (user)=>{
      if (user) {        
        dispatch(login(user.uid, user.displayName, user.email, user.photoURL));
        const favoritosData = await loadData(user.uid);
        dispatch(favRead(favoritosData));
      } else {
        navigate('/', {replace: true});
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
        </Routes>
        <Footer />
    </>
  )
}

export default AppRouter
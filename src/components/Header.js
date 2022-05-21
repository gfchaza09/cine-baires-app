import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

// Styles
import '../css/header.css';

// Acciones 
import { logout } from '../actions/auth';
import { clean } from '../actions/fav';

const Header = () => {

    const dispatch = useDispatch();
    const dataFav = useSelector(state => state.fav.favData);

    const [token, setToken] = useState("");

    const [menuOpen, setMenuOpen] = useState(false);
    const [size, setSize] = useState({
        width: undefined,
        height: undefined,
    });
    
    const handleMenuOpen = () => {
        setMenuOpen(!menuOpen);
    };

    const handleMenuClose = () => {
        if(menuOpen) {
            setMenuOpen(false);
        };
    };

    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (size.width > 768 && menuOpen) {
            setMenuOpen(false);
        };
    }, [size.width, menuOpen]);

    const handleLogout = () => {
      if(menuOpen) {
        setMenuOpen(false);
      };
      dispatch(logout());
      dispatch(clean());
    }

    useEffect(() => {
      
      setToken(sessionStorage.getItem("token"));

    }, [])
    

  return (
    <>
        <header className='header'>
          <div className='header-content'>
            <h2 className='header-content--logo'><i className="fas fa-film"></i> Cine Baires</h2>
            <nav className={`header-content--nav ${menuOpen ? "is-menu" : ""}`}>
              <ul>
                <li>
                  <NavLink onClick={handleMenuClose} to="/home"><span><i className='fas fa-home'></i> Home</span></NavLink>
                </li>
                <li>
                  <NavLink onClick={handleMenuClose} to="/listado"><span><i className='fas fa-list'></i> Listado</span></NavLink>
                </li>
                <li>
                  <NavLink onClick={handleMenuClose} to="/favoritos"><span><i className="fas fa-heart"></i> Favoritos{token && `${!dataFav ? "" : dataFav.length}`}</span></NavLink>
                </li>
                <li>
                  <NavLink onClick={handleMenuClose} to="/buscador"><span><i className='fas fa-search'></i> Buscar</span></NavLink>
                </li>
                <button onClick={handleLogout} id="btn-logout">
                  <span><i className="fas fa-sign-out-alt"></i> Salir</span>
                </button>
              </ul>
            </nav>
            <div className='header-content--toggle'>
              {
                (!menuOpen) ? (<i onClick={handleMenuOpen} className="fas fa-bars"></i>) : 
                (<i onClick={handleMenuOpen} className="fas fa-times-circle"></i>)
              } 
            </div>
          </div>
        </header>
    </>
  )
}

export default Header
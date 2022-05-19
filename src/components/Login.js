import { useEffect, useState } from 'react';
// import axios from 'axios';
import swal from '@sweetalert/with-react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import GoogleButton from 'react-google-button';

import { emailAndPasswordLogin, googleLogin, login } from '../actions/auth';


// Styles
import '../css/login.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


const Login = () => {

    const auth = getAuth();
    const dispatch = useDispatch();
  
    useEffect(() => {
      onAuthStateChanged(auth, (user)=>{
        if (user) {
          dispatch(login(user.uid, user.displayName));
          navigate("/home");
        }
      });
    }, []);

    let navigate = useNavigate();
    let location = useLocation();

    const [data, setData] = useState({
        email: "",
        password: "",
    });
    
    const {email, password} = data;
    
    const handleChange = (e) => {
        const value = e.target.value;
        setData({
          ...data,
          [e.target.name]: value
        });
    };

    const handleGoogleLogin = () => {
        dispatch(googleLogin());
    };

    const handleEmailLogin = (e) => {
        e.preventDefault();

        const regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const regexPassword = /^(?=[^\d_].*?\d)\w(\w|[!@#$%]){7,20}/;
        
        if(email === "" || password === "") {
            swal(<h2>Los campos no pueden estar vacíos.</h2>, {
                icon: "warning",
                });
            return;
        }

        if( email!=="" && !regexEmail.test(email) ) {
            swal(<h2>Debes escribir una dirección de correo válida.</h2>, {
                icon: "warning",
                });
            return;
        }

        if( password!== "" && !regexPassword.test(password) ) {
            swal(<h2>La contraseña debe iniciar con una letra y debe contener al menos 1 dígito. Se admiten desde 8 hasta 20 caracteres.</h2>, {
                icon: "warning",
            });
            return;
        }

        dispatch(emailAndPasswordLogin(email,password));
    };

    const handleAccount = () => {
        navigate("/register");
    };

    let token = sessionStorage.getItem("token");

  return (
      <>
        {
            token && <Navigate to="/home" state={{ from: location }} replace />
        }
        <section className='section--login'>
            <div className='container--login'>
                <h2>Inicio de sesión</h2>
                <form className='container-form--login' onSubmit={handleEmailLogin}>
                    <input className='form-input' onChange={handleChange} type="email" name="email" value={email} placeholder='Correo Electrónico' />
                    <input className='form-input' onChange={handleChange} type="password" name="password" value={password} placeholder='Contraseña' />
                    <button className='form-btn' type='submit'>Ingresar</button>
                    <span onClick={handleAccount}>¿No tienes una cuenta? Click aquí.</span>
                </form>
                <div className='google-btn'>
                    <GoogleButton onClick={handleGoogleLogin}/>
                </div>
            </div>
        </section>
      </>
  )
}

export default Login;
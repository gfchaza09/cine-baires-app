import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import GoogleButton from 'react-google-button';

// Utils
import { swal } from '../utils/swal';

// Actions
import { emailAndPasswordLogin, googleLogin, login } from '../actions/auth';

// Styles
import '../css/login.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Login = () => {

    const auth = getAuth();

    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    useEffect(() => {
      onAuthStateChanged(auth, (user)=>{
        if (user) {
          dispatch(login(user.uid, user.displayName));
          navigate("/home", {replace: true});
        }
      });
    }, []);

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
            swal({type: 'warning', message: 'Los campos no pueden estar vacíos.'});
            return;
        }

        if( email!=="" && !regexEmail.test(email) ) {
            swal({type: 'warning', message: 'Debes escribir una dirección de correo válida.'});
            return;
        }

        if( password!== "" && !regexPassword.test(password) ) {
            swal({type: 'warning', message: 'La contraseña debe iniciar con una letra y debe contener al menos 1 dígito. Se admiten desde 8 hasta 20 caracteres.'});
            return;
        }

        dispatch(emailAndPasswordLogin(email,password));
        navigate("/home", {replace: true});
    };

    const handleAccount = () => {
        navigate("/register", {replace: true});
    };

  return (
      <>
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
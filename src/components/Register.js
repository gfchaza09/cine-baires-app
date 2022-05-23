import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import swal from '@sweetalert/with-react';

import { register } from '../actions/auth';

//Estilos
import '../css/register.css';


const Register = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  const [data, setData] = useState({
    email: "",
    password: "",
    password2: "",
    username: "",
  });

  const {email, username, password, password2} = data;

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value
    })
  }
  
  const handleRegister = (e) => {
    e.preventDefault();
    const regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regexPassword = /^(?=[^\d_].*?\d)\w(\w|[!@#$%]){7,20}/;
    
    if(email === "" || password === "" || username.trim() === "" || password2 === "") {
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

    if(username.trim().length<2) {
      swal(<h2>Debes escribir un nombre de usuario con más de 1 caracter</h2>, {
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

    if( password!== "" && password !== password2 ) {
      swal(<h2>Las contraseñas deben coincidir.</h2>, {
        icon: "warning",
      });
      return;
    }

    dispatch(register(email, password, username));

    swal(<h2>Gracias por registrate. Ingresa tu email y contraseña en la página de inicio de sesión.</h2>, {
      icon: "success"
    })
    
    navigate("/")
  }

  const handleAccount = () => {
    navigate('/');
  };

  let token = sessionStorage.getItem("token");

  return (
    <>
      {
        token && <Navigate to="/home" state={{ from: location }} replace />
      }
      <section className='section--register'>
        <div className='container--register'>
          <h2>Registrarse</h2>
            <form onSubmit={handleRegister} className='container-form--register'>
              <input onChange={handleChange} className='form-input' type="email" name="email" value={email} placeholder='Correo Electrónico' />
              <input onChange={handleChange} className='form-input' type="text" name="username" value={username} placeholder='Nombre de usuario' />
              <input onChange={handleChange} className='form-input' type="password" name="password" value={password} placeholder='Contraseña' />
              <input onChange={handleChange} className='form-input' type="password" name="password2" value={password2} placeholder='Confirmar Contraseña' />
              <button className='form-btn' type='submit'>Crear cuenta</button>
              <span onClick={handleAccount}>¿Ya tienes una cuenta? Click aquí</span>
            </form>
        </div>
      </section>
    </>
  )
}

export default Register
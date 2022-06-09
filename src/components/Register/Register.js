import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Utils
import { swal } from '../../utils/swal';

// Actions
import { register } from '../../store/actions/auth';

// Styles
import './Register.styles.css';


const Register = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      swal({type: "warning", message:"Los campos no pueden estar vacíos."});
      return;
    }

    if( email!=="" && !regexEmail.test(email) ) {
      swal({type: "warning", message:"Debes escribir una dirección de correo válida."});
      return;
    }

    if(username.trim().length<2) {
      swal({type: "warning", message:"Debes escribir un nombre de usuario con más de 1 caracter."});
      return;
    }

    if( password!== "" && !regexPassword.test(password) ) {
      swal({type: "warning", message:"La contraseña debe iniciar con una letra y debe contener al menos 1 dígito. Se admiten desde 8 hasta 20 caracteres."});
      return;
    }

    if( password!== "" && password !== password2 ) {
      swal({type: "warning", message:"Las contraseñas deben coincidir."});
      return;
    }

    dispatch(register(email, password, username));
    swal({type: "success", message:"Gracias por registrate. Ingresa tu email y contraseña en la página de inicio de sesión."});
    
    navigate("/login", {replace: true})
  }

  const handleAccount = () => {
    navigate('/login', {replace: true});
  };

  const token = sessionStorage.getItem("token");

  return (
    <>
      {
        token && <Navigate to="/" replace />
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
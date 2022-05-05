import React from 'react';
// import axios from 'axios';
import swal from '@sweetalert/with-react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

// Styles
import '../css/login.css';

const Login = () => {

    let navigate = useNavigate();
    let location = useLocation();

    const handleSubmit = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        const regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(email === "" || password === "") {
            swal(<h2>Los campos no pueden estar vacíos.</h2>, {
                icon: "warning",
              });
            return;
        }

        if(email!=="" && !regexEmail.test(email)) {
            swal(<h2>Debes escribir una dirección de correo válida.</h2>, {
                icon: "warning",
              });
            return;
        }

        if(email !== "challenge@alkemy.org" || password !=="react") {
            swal(<h2>Credenciales inválidas.</h2>, {
                icon: "warning",
              });
            return;
        } else {
            swal(<h2>¡Perfecto! Ingresaste correctamente</h2>, {
                icon: "success",
            })
                .then((value)=>{
                    window.location.reload();
                })
            const tokenRecibido = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJjaGFsbGVuZ2VAYWxrZW15Lm9yZyIsImlhdCI6MTUxNjIzOTAyMn0.ilhFPrG0y7olRHifbjvcMOlH7q2YwlegT0f4aSbryBE";
            sessionStorage.setItem("token", tokenRecibido);
            navigate("/listado");
        }

        // axios.post('http://challenge-react.alkemy.org',{ email, password })
        //     .then(res=>{
        //         swal(<h2>¡Perfecto! Ingresaste correctamente</h2>, {
        //             icon: "success",
        //           });
        //         const tokenRecibido = res.data.token;
        //         sessionStorage.setItem("token", tokenRecibido);
        //         navigate("/listado");
        //     })
    };

    const handleAccount = () => {
        swal(<div>
                <h3>Intenta con los siguientes datos:</h3>
                <p>Correo: <b>challenge@alkemy.org</b></p>
                <p>Contraseña: <b>react</b></p>
            </div>,{
                icon: "info",
            })
    };

    let token = sessionStorage.getItem("token");

  return (
      <>
        {
            token && <Navigate to="/listado" state={{ from: location }} replace />
        }
        <section className='section--login'>
            <div className='container--login'>
                <h2>Inicio de sesión</h2>
                <form className='container-form--login' onSubmit={handleSubmit}>
                    <input className='form-input' type="email" name="email" placeholder='Correo Electrónico' />
                    <input className='form-input' type="password" name="password" placeholder='Contraseña' />
                    <button className='form-btn' type='submit'>Ingresar</button>
                    <span onClick={handleAccount}>¿No tienes una cuenta? Click aquí.</span>
                </form>
            </div>
        </section>
      </>
  )
}

export default Login;
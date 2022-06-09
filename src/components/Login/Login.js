import { useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useFormik } from "formik";
import * as Yup from 'yup';

import GoogleButton from 'react-google-button';

// Actions
import { emailAndPasswordLogin, googleLogin, login } from '../../store/actions/auth';

// Styles
import './Login.styles.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Login = () => {

    const auth = getAuth();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialValues = {
        email: "",
        password: "",
    };

    const required = "Campo obligatorio."
  
    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Debe ser un email válido.").required(required),
        password: Yup.string().required(required),
    });

    useEffect(() => {
      onAuthStateChanged(auth, (user)=>{
        if (user) {
          dispatch(login(user.uid, user.displayName, user.email, user.photoURL));
          navigate("/", {replace: true});
        }
      });
    }, []);

    const handleGoogleLogin = () => {
        dispatch(googleLogin());
    };

    const onSubmit = () => {
        const { email, password } = values;

        dispatch(emailAndPasswordLogin(email, password));
        navigate("/", {replace: true});
    }

    const token = sessionStorage.getItem("token");

    const formik = useFormik({ initialValues, validationSchema, onSubmit});

    const { handleSubmit, handleChange, values, errors, touched, handleBlur } = formik;

  return (
      <>
        {
            token && <Navigate to="/" replace />
        }
        <section className='section--login'>
            <div className='container--login'>
                <h2>Inicio de sesión</h2>
                <form className='container-form--login' onSubmit={handleSubmit}>
                    <input className={`form-input ${errors.email && touched.email ? "error" : ""}`} onChange={handleChange} type="email" name="email" value={values.email} placeholder='Correo Electrónico' onBlur= {handleBlur}/>
                    {errors.email && touched.email && <span className='error-text'>{errors.email}</span>}
                    <input className={`form-input ${errors.password && touched.password ? "error" : ""}`} onChange={handleChange} type="password" name="password" value={values.password} placeholder='Contraseña' onBlur= {handleBlur}/>
                    {errors.password && touched.password && <span className='error-text'>{errors.password}</span>}
                    <button className='form-btn' type='submit'>Ingresar</button>
                    <Link to="/register">¿No tienes una cuenta? Click aquí.</Link>
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
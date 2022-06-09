import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useFormik } from "formik";
import * as Yup from 'yup';

// Utils
import { swal } from '../../utils/swal';

// Actions
import { register } from '../../store/actions/auth';

// Styles
import './Register.styles.css';


const Register = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    username: "",
    password: "",
    password2: "",
  }

  const required = "Campo obligatorio.";

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Debe ser un email válido").required(required),
    username: Yup.string().min(2, "La cantidad mínima de caracteres es 2.").required(required),
    password: Yup.string().required(required),
    password2: Yup.string().required(required),
  })
  
  const onSubmit = () => {
    if( values.password !== values.password2 ) {
      swal({type: "warning", message:"Las contraseñas deben coincidir."});
      return;
    };
    dispatch(register(values.email, values.password, values.username));
    navigate("/login", {replace: true});
  }

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const { handleSubmit, handleChange, values, errors, touched, handleBlur } = formik;

  const token = sessionStorage.getItem("token");

  return (
    <>
      {
        token && <Navigate to="/" replace />
      }
      <section className='section--register'>
        <div className='container--register'>
          <h2>Registrarse</h2>
            <form onSubmit={handleSubmit} className='container-form--register'>
              <input onChange={handleChange} className={`form-input ${errors.email && touched.email ? "error" : ""}`} type="email" name="email" value={values.email} placeholder='Correo Electrónico' onBlur={handleBlur}/>
              {errors.email && touched.email && (
                <span className="error-text">{errors.email}</span>
              )}
              <input onChange={handleChange} className={`form-input ${errors.username && touched.username ? "error" : ""}`} type="text" name="username" value={values.username} placeholder='Nombre de usuario' onBlur={handleBlur}/>
              {errors.username && touched.username && (
                <span className="error-text">{errors.username}</span>
              )}
              <input onChange={handleChange} className={`form-input ${errors.password && touched.password ? "error" : ""}`} type="password" name="password" value={values.password} placeholder='Contraseña' onBlur={handleBlur}/>
              {errors.password && touched.password && (
                <span className="error-text">{errors.password}</span>
              )}
              <input onChange={handleChange} className={`form-input ${errors.password2 && touched.password2 ? "error" : ""}`} type="password" name="password2" value={values.password2} placeholder='Confirmar Contraseña' onBlur={handleBlur}/>
              {errors.password2 && touched.password2 && (
                <span className="error-text">{errors.password2}</span>
              )}
              <button className='form-btn' type='submit'>Crear cuenta</button>
              <Link to="/login">¿Ya tienes una cuenta? Click aquí</Link>
            </form>
        </div>
      </section>
    </>
  )
}

export default Register
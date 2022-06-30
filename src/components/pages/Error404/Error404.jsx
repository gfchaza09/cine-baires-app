import React from 'react';
import { NavLink } from 'react-router-dom';

import './Error404.styles.css';

const Error404 = () => {
  return (
    <div className='error'>
      <h1>La página que buscas no existe</h1>
      <NavLink to="/">Volver al inicio</NavLink>
    </div>
  )
}

export default Error404;
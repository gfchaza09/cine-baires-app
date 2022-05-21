import React from 'react'
import { useSelector } from 'react-redux';

import '../css/home.css';

const Home = () => {

  const nameUser = useSelector(state => state.auth.displayName);

  return (
    <>
        <section className="section--welcome">
            <h2>Bienvenido/a {nameUser}</h2>
        </section>
    </>
  )
}

export default Home
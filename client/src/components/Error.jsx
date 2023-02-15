import React from "react";
import { useDispatch } from "react-redux";
import { getPokemons, getTypes, setError } from "../actions";
import psyduck from "../styles/Images/psyduck.png";
import styles from "../styles/Error.module.css";

function Error() {
  const dispatch = useDispatch();
  
  // Manejador para mostrar contenido del Home:
  const handleHome = (ev) => {
    ev.preventDefault();
    dispatch(setError(false));
    dispatch(getPokemons());
    dispatch(getTypes());
  };
  return (
    <div className={styles.contError}>
      <img src={psyduck} alt="psyduck" className={styles.psyduck} />
      <div className={styles.texto}>
        <div className={styles.text}>Error!</div>
        <div className={styles.parrafo}>Sorry, what you are looking for was not found!</div>
      </div>
      <button onClick={(e) => handleHome(e)} className={styles.button}>
      ⬅ Return
      </button>
    </div>
  );
}

export default Error;

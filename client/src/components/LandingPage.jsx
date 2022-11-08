import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Landing.module.css";
import logo from "../styles/Images/Pokemon.png";
import linkedin from "../styles/Images/linkedin.png";
import github from "../styles/Images/github.png";

export default function LandingPage() {
  return (
    <div className={styles.background}>
      <div className={styles.cont}>
        <img src={logo} alt="logo" className={styles.logo} />
        <div className={styles.contTitle}>
          <div className={styles.title}>¡Welcome to your Pokedex!</div>
          <div className={styles.parrafo}>
          ¡Click the button below, and start your search! 
          You can also let your imagination flow and create your own Pokemon!
          </div>
          <Link to="/home">
            <button className={styles.button}>¡GO!</button>
          </Link>
        </div>

        <div className={styles.links}>
          <a
            href="https://www.linkedin.com/in/dario-rojas-991899251/"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            <img src={linkedin} alt="linkedin" className={styles.linkedin} />
          </a>

          <a href="https://github.com/dariorojas6" target="_blank" rel="noreferrer">
            {" "}
            <img src={github} alt="github" className={styles.github} />
          </a>
        </div>
      </div>

     
    </div>
  );
}

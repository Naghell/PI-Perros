import styles from './Landing.module.css';
import { useEffect } from 'react';

const Landing = () => {
    const landingJoin = () => {
        const audio = new Audio("./intro.mp3");
        audio.play();
    }

    return(
        <main className={styles.landing__background}>
            <div className={styles.landing__container}>
                <img alt="Logo" className={styles.landing__image} src='/logo.svg'></img>
                <button onClick={landingJoin} className={styles.landing__button}>INGRESAR</button>
            </div>
        </main>
    )
}

export default Landing;
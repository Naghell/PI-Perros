import styles from './Landing.module.css';
import Login from '../Login/Login';

const Landing = () => {
    return (
        <main className={styles.landing__container}>
            <div className={styles.landing__logo}>
                <img alt="Logo de PerrAPI" className={styles.landing__image} src='/logo.svg'></img>
                <Login/>
            </div>
        </main>
    );
};

export default Landing;
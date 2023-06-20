import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {
    const audio = new Audio("./intro.mp3");
    const navigate = useNavigate();
    const ingreso = () => {
        audio.play();
        navigate("/home");
    }

    return (
        <div className={styles.login__container}>
            <h1 className={styles.login__title}>PerrAPI</h1>
            <button className={styles.login__button} onClick={ingreso}>INGRESAR</button>
        </div>
    );
}

export default Login;
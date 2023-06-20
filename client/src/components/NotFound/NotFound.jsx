import style from './NotFound.module.css'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return(
        <div className={style.notfound__container}>
            <h1>404</h1>
            <h2>Ups! Parece que estás perdido...</h2>

            <Link to="/home">
                <button className={style.notfound__button}>Volver al inicio</button>
            </Link>
        </div>
    );
};

export default NotFound;
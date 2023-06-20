import style from './Card.module.css';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteDog } from '../../redux/actions';

const Card = ({ id, name, image, weight, temperament }) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteDog(id));
    }

    if (Array.isArray(temperament)) {
        temperament = [temperament.join(", ")];
    };

    if (temperament === undefined) {
        temperament = ' ';
    } else {
        temperament = [...temperament + '.'];
    };

    if (image === 'https://cdn2.thedogapi.com/images/undefined.jpg') {
        image = 'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*';
    };


    return (
        <div className={style.card} id={id} key={id}>
            <div className={style.card__image__container}>
                <img className={style.card__image} src={image?.url || image}></img>
            </div>
            <div className={style.card__info__container}>

                <Link to={`/home/${id}`} className={style.link}>
                    <h1 className={style.card__name}>{name}</h1>
                </Link>
                <p className={style.card__info}>{weight?.metric || weight}kg. {temperament}</p>
            </div>
            <button onClick={handleDelete} >BORRAR</button>
        </div>
    );
};

export default Card;
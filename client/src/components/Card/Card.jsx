import style from './Card.module.css';

const Card = ({ id, name, image, weight, temperament }) => {

    if (Array.isArray(temperament)) {
        temperament = temperament.join(", ")
    }

    return (
        <div className={style.card} id={id} key={id}>
            <div className={style.card__image__container}>
                <img className={style.card__image} src={image?.url || image}></img>
            </div>
            <div className={style.card__info__container}>
                <h1 className={style.card__name}>{name}</h1>
                <p className={style.card__info}>{weight?.metric || weight}kg, {temperament}</p>
            </div>
        </div>
    )
}

export default Card;
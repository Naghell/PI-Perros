import styles from './Card.module.css';

const Card = ({ id, name, image, weight, life_span, temperament }) => {

    return (
        <div className={styles.card} id={id} key={id}>
            <img className={styles.card__image} src={image.url || image}></img>
            <h1 className={styles.card__name}>{name}</h1>
            <p>{weight.metric || weight}cm, {life_span}, {temperament}</p>
        </div>
    )
}

export default Card;
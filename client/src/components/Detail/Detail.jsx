import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getDetail } from '../../redux/actions';
import Loader from '../Loader/Loader';
import style from './Detail.module.css';

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [dog, setDog] = useState(null);

  useEffect(() => {
    dispatch(getDetail(id)).then((response) => {
      setDog(response.payload);
    });
  }, [dispatch, id]);

  return dog ? (
    <div className={style.detail__background}>
      <div className={style.detail__container}>
        <div>
          <h3 className={style.detail__title}>{dog.name}</h3>
          <img
            src={dog.image.url || dog.image}
            alt={dog.name}
            width="300px"
            height="300px"
            className={style.detail__image}
          />
          <div className={style.detail__info}>
            <p>Tamaño promedio: {dog.height.metric || dog.height} cm</p>
            <p>Peso promedio: {dog.weight.metric || dog.weight} kg</p>
            <p>Esperanza de vida: {dog.life_span}</p>
            <p>Temperamento: {dog.temperament}</p>
          </div>

          <Link to="/home">
            <button className={style.detail__button}>Back</button>
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default Detail;

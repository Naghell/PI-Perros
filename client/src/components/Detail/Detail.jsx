import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getDetail } from "../../redux/actions";
import Loader from "../Loader/Loader";
import style from "./Detail.module.css";

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
          <h3>{dog.name}</h3>
          <img
            src={dog.image.url || dog.image}
            alt=""
            width="300px"
            height="300px"
          />
          <p>Average height: {dog.height.metric || dog.height} cm</p>
          <p>Average weight: {dog.weight.metric || dog.weight} kg</p>
          <p>Life-span: {dog.life_span}</p>
          <p>Temperaments: {dog.temperament}</p>

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

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions";
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

  return (
    <div className={style.body}>
      <div className={style.container}>
        <Link to="/home">
          <button className={style.btn}>Back</button>
        </Link>
        {dog ? (
          <div>
            <h3>Hi, I Am <u>{dog.name}</u>!</h3>
            <img
              src={dog.image ? dog.image : dog.image.url}
              alt=""
              width="300px"
              height="300px"
            />
            <h3>
              <u>Average height:</u> {dog.height.metric} cm
            </h3>
            <h3>
              <u>Average weight:</u> {dog.weight.metric} kg
            </h3>
            <h3>
              <u>Life-span:</u> {dog.life_span}
            </h3>
            <h4>
              <u>Temperaments:</u>{" "}
              {dog.temperament}
            </h4>
          </div>
        ) : (
          <div className={style.loading}>
            <p>Loading..</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Detail;
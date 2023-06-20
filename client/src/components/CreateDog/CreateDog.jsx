import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { postDog, getTemperaments } from "../../redux/actions";
import { useSelector, useDispatch } from 'react-redux';
import style from './CreateDog.module.css';
import validate from './validation.js';

const CreateDog = () => {
    const dispatch = useDispatch();
    const temps = useSelector((state) => state.temperament);

    const [dogData, setData] = useState({
        name: "",
        minHeight: "",
        maxHeight: "",
        minWeight: "",
        maxWeight: "",
        life_span: "",
        image: "",
        temperament: []
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(getTemperaments());
    }, [dispatch]);

    const handleChange = (event) => {
        setData({
            ...dogData,
            [event.target.name]: event.target.value
        });
        validate(dogData, setErrors);
    };

    const handleSelect = (event) => {
        setData({
            ...dogData,
            temperament: [...dogData.temperament, event.target.value]
        });
        validate(dogData, setErrors);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(dogData.temperament)
        const avgHeight = Math.floor((Number(dogData.minHeight) + Number(dogData.maxHeight)) / 2);
        const avgWeight = Math.floor((Number(dogData.minWeight) + Number(dogData.maxWeight)) / 2);
        const dog = {
            name: dogData.name,
            height: avgHeight,
            weight: avgWeight,
            life_span: dogData.life_span,
            temperament: dogData.temperament,
            image: dogData.image
        };
        dispatch(postDog(dog));
        alert('Dog Created');
    };

    const handleDelete = (e) => {
        setData({
            ...dogData,
            temperament: dogData.temperament.filter((temp) => temp !== e)
        });
    };

    return (
        <div className={style.form__background}>
            <div className={style.form__container}>
                <h1>Crea tu perro</h1>
                <form onSubmit={(event) => handleSubmit(event)} className={style.form__info} autoComplete="off">
                    <div>
                        {errors.name && <p className={style.form__error}>{errors.name}</p>}
                        <input
                            className={style.form__input}
                            type="text"
                            placeholder='Nombre'
                            value={dogData.name}
                            name="name"
                            onChange={(event) => handleChange(event)}
                        />
                    </div>
                    <div>
                        {errors.minHeight && <p className={style.form__error}>{errors.minHeight}</p>}
                        <input
                            className={style.form__input}
                            type="number"
                            placeholder='Tamaño mínimo (cm)'
                            value={dogData.minHeight}
                            name="minHeight"
                            onChange={(event) => handleChange(event)}
                        />
                    </div>
                    <div>
                        {errors.maxHeight && <p className={style.form__error}>{errors.maxHeight}</p>}
                        <input
                            className={style.form__input}
                            type="number"
                            placeholder='Tamaño máximo (cm)'
                            value={dogData.maxHeight}
                            name="maxHeight"
                            onChange={(event) => handleChange(event)}
                        />
                    </div>
                    <div>
                        {errors.minWeight && <p className={style.form__error}>{errors.minWeight}</p>}
                        <input
                            className={style.form__input}
                            placeholder='Peso mínimo (kg)'
                            type="number"
                            value={dogData.minWeight}
                            name="minWeight"
                            onChange={(event) => handleChange(event)}
                        />
                    </div>
                    <div>
                        {errors.maxWeight && <p className={style.form__error}>{errors.maxWeight}</p>}
                        <input
                            className={style.form__input}
                            placeholder='Peso máximo (kg)'
                            type="number"
                            value={dogData.maxWeight}
                            name="maxWeight"
                            onChange={(event) => handleChange(event)}
                        />
                    </div>
                    <div>
                        {errors.life_span && <p className={style.form__error}>{errors.life_span}</p>}
                        <input
                            className={style.form__input}
                            type="number"
                            placeholder='Esperanza de vida (años)'
                            value={dogData.life_span}
                            name="life_span"
                            onChange={(event) => handleChange(event)}
                        />
                    </div>
                    <div>
                        {errors.image && <p className={style.form__error}>{errors.image}</p>}
                        <input
                            className={style.form__input}
                            type="text"
                            placeholder='Imagen (url)'
                            value={dogData.image}
                            name="image"
                            onChange={(event) => handleChange(event)}
                        />
                    </div>
                    {errors.temperament && <p className={style.form__error}>{errors.temperament}</p>}
                    <select onChange={(event) => handleSelect(event)} className={style.form__select}>
                        <option hidden>Temperamentos</option>
                        {temps?.map((temp) => {
                            return (
                                <option value={temp} key={temp}>
                                    {temp}
                                </option>
                            );
                        })}
                    </select>
                    <div>
                        <button
                            type="submit"
                            className={style.form__button}
                            disabled={errors.name || errors.temperament || errors.image || errors.minHeight || errors.maxHeight || errors.minWidth || errors.maxWidth}
                        >
                            Crear
                        </button>
                        <Link to="/home">
                            <button className={style.form__button}>Volver</button>
                        </Link>
                    </div>
                </form>

                <div className={style.form__temperaments}>
                    {dogData.temperament.map((temp) => (
                        <button onClick={() => handleDelete(temp)} className={style.form__temp}>
                            {temp}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CreateDog;

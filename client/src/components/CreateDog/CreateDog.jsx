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
        minHeight: 0,
        maxHeight: 0,
        minWeight: 0,
        maxWeight: 0,
        life_span: 0,
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
        <div className={style.body}>
            <div className={style.container}>
                <h1>Create your Dog</h1>
                <Link to="/home">
                    <button className={style.btnBack}>Back</button>
                </Link>
                <form onSubmit={(event) => handleSubmit(event)} className={style.form} autoComplete="off">
                    <div>
                        <label>Name:</label>
                        <input
                            className={style.input}
                            type="text"
                            value={dogData.name}
                            name="name"
                            onChange={(event) => handleChange(event)}
                        />
                        {errors.name && <p className={style.error}>{errors.name}</p>}
                    </div>
                    <div>
                        <label>Min-Height:</label>
                        <input
                            className={style.input}
                            type="number"
                            value={dogData.minHeight}
                            name="minHeight"
                            onChange={(event) => handleChange(event)}
                        />
                        <label> cm</label>
                        {errors.minHeight && <p className={style.error}>{errors.minHeight}</p>}
                    </div>
                    <div>
                        <label>Max-Height:</label>
                        <input
                            className={style.input}
                            type="number"
                            value={dogData.maxHeight}
                            name="maxHeight"
                            onChange={(event) => handleChange(event)}
                        />
                        <label> cm</label>
                        {errors.maxHeight && <p className={style.error}>{errors.maxHeight}</p>}
                    </div>
                    <div>
                        <label>Min-Weight:</label>
                        <input
                            className={style.input}
                            type="number"
                            value={dogData.minWeight}
                            name="minWeight"
                            onChange={(event) => handleChange(event)}
                        />
                        <label> kg</label>
                        {errors.minWeight && <p className={style.error}>{errors.minWeight}</p>}
                    </div>
                    <div>
                        <label>Max-Weight:</label>
                        <input
                            className={style.input}
                            type="number"
                            value={dogData.maxWeight}
                            name="maxWeight"
                            onChange={(event) => handleChange(event)}
                        />
                        <label> kg</label>
                        {errors.maxWeight && <p className={style.error}>{errors.maxWeight}</p>}
                    </div>
                    <div>
                        <label>Life_span:</label>
                        <input
                            className={style.input}
                            type="number"
                            value={dogData.life_span}
                            name="life_span"
                            onChange={(event) => handleChange(event)}
                        />
                        <label> years</label>
                        {errors.life_span && <p className={style.error}>{errors.life_span}</p>}
                    </div>
                    <div>
                        <label>Image(url):</label>
                        <input
                            className={style.input}
                            type="text"
                            value={dogData.image}
                            name="image"
                            onChange={(event) => handleChange(event)}
                        />
                        {errors.image && <p className={style.error}>{errors.image}</p>}
                    </div>
                    <select onChange={(event) => handleSelect(event)} className={style.select}>
                        <option hidden>Temperaments</option>
                        {temps?.map((temp) => {
                            return (
                                <option value={temp} key={temp}>
                                    {temp}
                                </option>
                            );
                        })}
                    </select>
                    {errors.temperament && <p className={style.error}>{errors.temperament}</p>}
                    <div>
                        <button
                            type="submit"
                            className={style.btnCreate}
                            disabled={
                                !dogData.name ||
                                !dogData.minHeight ||
                                !dogData.maxHeight ||
                                !dogData.minWeight ||
                                !dogData.maxWeight ||
                                !dogData.life_span ||
                                !dogData.temperament ||
                                !dogData.image
                            }
                        >
                            Create Dog
                        </button>
                    </div>
                </form>

                {dogData.temperament.map((temp) => (
                    <div className={style.temperaments}>
                        <button onClick={() => handleDelete(temp)} className={style.temps}>
                            {temp}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CreateDog;

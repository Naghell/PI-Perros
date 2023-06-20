import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameDogs } from "../../redux/actions";
import style from './SearchBar.module.css';

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, searchName] = useState('');

    const handleInputChange = (e) => {
        e.preventDefault();
        searchName(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(getNameDogs(name))
        searchName('');
    }

    return (
        <div className={style.search__container} >
            <input 
            className={style.search__input}
            type='text'
            placeholder='Buscar'
            value={name}
            onChange={e => handleInputChange(e)}/>

            <button className={style.search__button} type='submit' onClick={e => handleSubmit(e)} searchName>🔍</button>
        </div>
    );
}
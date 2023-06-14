import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameDogs } from "../../redux/actions";
import style from './SearchBar.module.css'

export default function SearchBar() {
    const dispatch = useDispatch()
    const [name, setName] = useState('')


    const handleInputChange = (e) => {
        e.preventDefault()
        setName(e.target.value)

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(getNameDogs(name))
    }

    return (
        <div className={style.container} >
            <input 
            className={style.input}
            type = 'text'
            placeholder="Buscar "
            onChange={e => handleInputChange(e)}/>

            <button className={style.btn} type='submit' onClick={e => handleSubmit(e)} setName>Search</button>
        </div>
    )
}
import { useState } from 'react'
import validate from '../Landing/validation.js';
import { useNavigate } from 'react-router-dom';

const Form = () => {
    const [access, setAccess] = useState(true);
    const URL = `http://localhost:3001/`;
    const navigate = useNavigate();
    const audio = new Audio("./intro.mp3");

    const login = async (userData) => {
        try {
            const { email, password } = userData;
            const { data } = await axios(URL + `/login/?email=${email}&password=${password}`);
            const { access } = data;

            setAccess(access);
            audio.play();
            access && navigate("/home");
        } catch (error) {
            console.log(error.message)
        }
    };

    const logout = () => {
        setAccess(false);
        navigate("/");
    };

    const [userData, setData] = useState({
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState({
        email: '',
        password: ''
    })

    const handleChange = (event) => {
        setData({
            ...userData,
            [event.target.name]: event.target.value
        })
        validate(userData, setErrors)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        login(userData);
    }

    return (
        
        <form onSubmit={handleSubmit}>
            <h1>Iniciar sesión</h1>
            <div>
                <div>
                    {errors.email && <p>{errors.email}</p>}
                    <input type='email' name='email' placeholder='Ingresa tu correo' value={userData.email} onChange={handleChange}></input>
                    <label htmlFor='email'>Email</label>
                </div>
                <div>
                    {errors.password && <p>{errors.password}</p>}
                    <input type='password' name='password' placeholder='Ingresa tu clave' value={userData.password} onChange={handleChange}></input>
                    <label htmlFor='password'>Contraseña</label>
                </div>
                <button type='submit' disabled={errors.email || errors.password || !userData.email}>Enviar</button>
            </div>
        </form>
    )
}

export default Form;
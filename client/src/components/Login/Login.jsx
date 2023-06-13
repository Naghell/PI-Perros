import { useNavigate } from 'react-router-dom';

const Login = () => {
    const audio = new Audio("./intro.mp3");
    const navigate = useNavigate();
    const ingreso = () => {
        audio.play();
        navigate("/home");
    }

    return (
        <button onClick={ingreso}>INGRESAR</button>
    )
}

export default Login;
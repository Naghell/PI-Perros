const validate = (userData, setErrors) => {
    const newErrors = {};

    if (!(/\S+@\S+\.\S+/.test(userData.email) && userData.email.length <= 35)) {
        newErrors.email = 'El mail no es válido.';
    }

    if (!(/\d/.test(userData.password) && userData.password.length > 5 && userData.password.length <= 10)) {
        newErrors.password = 'La contraseña debe tener al menos un número y tener una longitud entre 6 y 10 caracteres.';
    }

    setErrors(newErrors);
}

export default validate;
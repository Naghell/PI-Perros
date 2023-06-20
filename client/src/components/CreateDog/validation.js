const validate = (dogData, setErrors) => {
    const newErrors = {};
    const imageUrlRegex = /\.(jpeg|jpg|gif|png|bmp|webp)$/i;
  
    if (!dogData.name || dogData.name.length > 40) {
      newErrors.name = "El nombre es inválido.";
    }
  
    if (dogData.minHeight <= 0) {
      newErrors.minHeight = "La altura mínima es inválida.";
    }
  
    if (dogData.maxHeight <= 0) {
      newErrors.maxHeight = "La altura máxima es inválida.";
    }
  
    if (dogData.minHeight > dogData.maxHeight) {
      newErrors.minHeight = "La altura mínima no puede ser mayor que la altura máxima.";
      newErrors.maxHeight = "La altura máxima no puede ser menor que la altura mínima.";
    }
  
    if (dogData.minWeight <= 0) {
      newErrors.minWeight = "El peso mínimo es inválido.";
    }
  
    if (dogData.maxWeight <= 0) {
      newErrors.maxWeight = "El peso máximo es inválido.";
    }
  
    if (dogData.minWeight > dogData.maxWeight) {
      newErrors.minWeight = "El peso mínimo no puede ser mayor que el peso máximo.";
      newErrors.maxWeight = "El peso máximo no puede ser menor que el peso mínimo.";
    }
  
    if (dogData.life_span <= 0) {
      newErrors.life_span = "La esperanza de vida es inválida.";
    }
  
    if (dogData.temperament.length === 0) {
      newErrors.temperament = "Debe seleccionar al menos un temperamento.";
    }
    
    console.log(imageUrlRegex.test(dogData.image))

    if (!imageUrlRegex.test(dogData.image)) {
      newErrors.image = "Debes colocar una imagen.";
    }
  
    setErrors(newErrors);
    console.log(newErrors);
  };
  
  export default validate;
  
import style from './SearchBar.module.css';
import { useState } from 'react';
import axios from 'axios';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [info, setInfo] = useState(null);

  const onSearch = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/dogs?name=${searchTerm}`
      );

      if (data.length > 0) {
        setInfo(data);
      } else {
        window.alert("¡No hay razas con ese nombre!");
      }
    } catch (error) {
      window.alert("Error al realizar la búsqueda");
    }
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className={style.searchBar}>
      <input
        type="search"
        placeholder="Buscar por ID o nombre"
        value={searchTerm}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <button onClick={onSearch}>Buscar</button>

      {info && (
        <div className={style.results}>
          {info.map((dog) => (
            <div key={dog.id} className={style.result}>
              <p>ID: {dog.id}</p>
              <p>Nombre: {dog.name}</p>
              <p>Altura: {dog.height.metric}</p>
              <p>Peso: {dog.weight.metric}</p>
              <p>Esperanza de vida: {dog.life_span}</p>
              <p>Temperamento: {dog.temperament}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
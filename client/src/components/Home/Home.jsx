import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, filterCreated, orderByName, orderByWeight, getTemperaments, filterTemps } from "../../redux/actions";
import { Link } from 'react-router-dom';
import Card from "../Card/Card";
import SearchBar from "../SearchBar/SearchBar";
import Pagination from "../Pagination/Pagination";
import style from './Home.module.css';

const Home = () => {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const allTemps = useSelector((state) => state.temperament);
  const [refresh, setRefresh] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const dogsPerPage = 8;
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
  }, [dispatch]);

  const handleRefresh = () => {
    setRefresh('default');
    setCurrentPage(1);
  };

  const handleFilter = (value, action) => {
    dispatch(action(value));
    setCurrentPage(1);
  };

  const handleOrderBy = (e) => {
    const val = e.target.value;
    dispatch(val.includes('asc') || val.includes('des') ? orderByName(val) : orderByWeight(val));
    setCurrentPage(1);
    setRefresh(val);
  };

  return (
    <div>
      <div className={style.NavBar}>
        <div className={style.gif}>
          <h1 className={style.HenryDogs}><u>Henry Dogs</u></h1>
          <div>
            <Link to='/dog'><button className={style.create}>Create Dog</button></Link>
          </div>
          <button className={style.reload} onClick={handleRefresh}>
            Reload all dogs
          </button>
          <SearchBar />
          <div className={style.filters}>
            <select className={style.filter} onChange={(e) => handleOrderBy(e)} value={refresh}>
              <option value='default' disabled>Ordenar por</option>
              <option disabled>Alfabético</option>
              <option value='asc'>A-Z</option>
              <option value='des'>Z-A</option>
              <option disabled>Peso</option>
              <option value='pesado'>Pesado</option>
              <option value='ligero'>Ligero</option>
            </select>
            <select className={style.filter} onChange={(e) => handleFilter(e.target.value, filterTemps)}>
              <option value='default' hidden>Temperamentos</option>
              {allTemps.map((e) => {
                return <option value={e} key={e}>{e}</option>;
              })}
            </select>
            <select className={style.filter} onChange={(e) => handleFilter(e.target.value, filterCreated)}>
              <option value='default'>Todos</option>
              <option value='existing'>Existente</option>
              <option value='created'>Creado</option>
            </select>
          </div>
        </div>
      </div>
      <div className={style.container}>
        {currentDogs.length > 0 ? (
          currentDogs.map((e) => (
            <div key={e.id}>
              <Link to={`/home/${e.id}`} className={style.link}>
                <Card name={e.name} image={e?.image} temperament={e.temperament} weight={e.weight}/>
              </Link>
            </div>
          ))
        ) : (
          <div className={style.loading}><p>Loading...</p></div>
        )}
      </div>
      <div>
        <Pagination
          dogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          paginated={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Home;

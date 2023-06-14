import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, filterCreated, orderByName, orderByWeight, getTemperaments, filterTemps} from "../../redux/actions";
import { Link } from 'react-router-dom';
//importo los componentes que uso
import Card from "../Card/Card";
import SearchBar from "../SearchBar/SearchBar";
import Pagination from "../Pagination/Pagination";
import style from './Home.module.css'

const Home = () => {
     //asignamos el useDispatch() a la constante dispatch
     const dispatch = useDispatch()
     //nos traemos los estados dogs y temperaments del reducer
     const allDogs = useSelector((state) => state.dogs)
     const allTemps = useSelector((state) => state.temperaments)
     //  console.log(allTemps);

     //configuramos el estado para setear los filtros y posteriormente resetear los mismos y los ordenamientos
     const [refresh, setRefresh] = useState()
     //configuramos el estado para setear los ordenamientos
     const [order, setOrder] = useState()

     //configuramos los estados para el paginado
     const [currentPage, setCurrentPage] = useState(1)//en una pagina
     const [dogsPerPage, setDogsPerPage] = useState(8)//renderizar 8 perros
     //sacamos los indices del ultimo y primer perro
     const indexOfLastDog = currentPage * dogsPerPage 
     const indexOfFirstDog = indexOfLastDog - dogsPerPage
     //sacamos los perros a renderizar por pagina
     const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog)


     //creamos paginated para manejar el estado de de la pagina actual y en base de eso renderizar los perros correctos
     const paginated = (pageNumber) => {
        setCurrentPage(pageNumber)
     }


     //despachamos la accion getDogs() de las actions
     useEffect(() => {
        dispatch(getDogs())
     }, [dispatch])


     //despachamos la accion getTemperaments() de las actions
     useEffect(()=>{
        dispatch(getTemperaments())
    }, [dispatch]);

    //creamos handleRefresh para recargar todos los perros nuevamente y resetear los filtros y ordenamientos al valor default
     function handleRefresh(e) {
        e.preventDefault()
        dispatch(getDogs())
        setRefresh('default')//seteamos el estado con el valor default para resetear filtros y ordenamientos
        setCurrentPage(1)//seteamos el estado con el valor de la pagina que queremos renderizar
     } 

     //creamos handleFilterCreated para despachar la accion filterCreated() de actions
     function handleFilterCreated (e) {
        e.preventDefault();
        dispatch(filterCreated(e.target.value));
        setCurrentPage(1);
        setRefresh()
     }
     
     //cramos handleFilterByTemp para despachar la accion filterTemps() de actions
     function handleFilterByTemp(e){
        e.preventDefault();
        dispatch(filterTemps(e.target.value));
        setCurrentPage(1);
        setRefresh()
      }


     //creamos handleOrderBy para despachar orderByName() y orderByWeight() y para setear el estado order
     function handleOrderBy (e) {
        const val = e.target.value;
        if(val.includes('asc')) {
            dispatch(orderByName(val))
            setCurrentPage(1);
            setOrder(val)
        }
        if(val.includes('des')) {
            dispatch(orderByName(val))
            setCurrentPage(1);
            setOrder(val)
        }
        else {
            dispatch(orderByWeight(val))
            setCurrentPage(1);
            setOrder(val)
        }
        setRefresh()
     }

     return (
        <div>
            <div className={style.NavBar}>
            <div className={style.gif}>
                <h1 className={style.HenryDogs}><u>Henry Dogs</u></h1>
                <div>
                <Link to= '/dog'><button className={style.create}>Create Dog</button></Link>
                </div>
                <button className={style.reload} onClick={e=> {handleRefresh(e)}}>
                    Reload all dogs
                </button>
            
                <SearchBar/>
            
                    <div className={style.filters}>
                        <select className={style.filter} onChange={e => handleOrderBy(e)} value={refresh}>
                            <option value='default' selected disabled>Order by</option>
                            <option disabled>Alphabetic</option>
                            <option value = 'asc'>A-Z</option>
                            <option value = 'des'>Z-A</option>
                            <option disabled>Weight</option>                    
                            <option value = 'hea'>Heavier</option>
                            <option value = 'lig'>Lighter</option>
                        </select>
                        <select className={style.filter} onChange={e => handleFilterByTemp(e)} value={refresh}>
                            <option value='default' hidden>Temperaments</option>
                            {allTemps.map((e) => {
                                return <option value={e} key={e.id}>{e}</option>
                            })}
                        </select>
                        <select className={style.filter} onChange={e => handleFilterCreated(e)} value={refresh}>
                            <option value = 'default' selected disabled>Default</option>
                            <option value = 'existing'>Existing</option>
                            <option value = 'created'>Created</option>
                        </select>
                    </div>
            
                <div>
                    <Pagination
                    dogsPerPage={dogsPerPage}
                    allDogs={allDogs.length}
                    paginated={paginated}
                    />
                </div>
            </div>
            </div>
            <div className={style.container}>
                {currentDogs.length > 0 ? currentDogs.map((e) => {
                        return(
                            <fragment>
                                <Link to= {'/home/' + e.id} className={style.link}>
                                    <Card name={e.name} image={e.image} temperaments={e.temperaments} weight={e.weight}/>
                                </Link>
                            </fragment>
                        )
                    }) : <div className={style.loading}><p>Loading...</p></div>
                    }
            </div>
        </div>
     )

}

export default Home;
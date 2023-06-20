import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, orderByName, orderByWeight, getTemperaments } from "../../redux/actions";
import { Link } from 'react-router-dom';
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import Header from "../Header/Header";
import Loader from "../Loader/Loader";
import style from './Home.module.css';

const Home = () => {
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);
    const [refresh, setRefresh] = useState('default');
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const dogsPerPage = 8;
    const indexOfLastDog = currentPage * dogsPerPage;
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);

    useEffect(() => {
        dispatch(getDogs());
        dispatch(getTemperaments());
    }, [dispatch]);

    setTimeout(() => {
        setIsLoading(false);
    }, 3000);

    const handleRefresh = () => {
        dispatch(orderByName());
        setRefresh('default');
        setCurrentPage(1);
    };

    const handleFilter = (value, action) => {
        dispatch(action(value));
        setCurrentPage(1);
        setRefresh(value);
    };

    const handleOrderBy = (e) => {
        console.log(e.target.value)
        const val = e.target.value;
        dispatch(val.includes('asc') || val.includes('des') ? orderByName(val) : orderByWeight(val));
        setCurrentPage(1);
        setRefresh(val);
    };

    return (
        <div>
            <div className={style.home__container}>
                <Header
                    refresh={refresh}
                    handleRefresh={handleRefresh}
                    handleFilter={handleFilter}
                    handleOrderBy={handleOrderBy} />
                {
                    isLoading ? <Loader /> :

                        <div className={style.cards__container}>
                            {currentDogs.length > 0 ? (
                                currentDogs.map((e) => (
                                    <div key={e.id}>
                                        <Link to={`/home/${e.id}`} className={style.link}>
                                            <Card name={e.name} image={e?.image} temperament={e.temperament} weight={e.weight} />
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <Loader />
                            )}
                            <Pagination
                                dogsPerPage={dogsPerPage}
                                allDogs={allDogs.length}
                                paginated={setCurrentPage}
                            />
                        </div>
                }
            </div>
        </div>
    );
};

export default Home;

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, getTemperaments, orderByName } from '../../redux/actions';
import Card from '../Card/Card';
import Pagination from '../Pagination/Pagination';
import Header from '../Header/Header';
import Loader from '../Loader/Loader';
import Footer from '../Footer/Footer';
import style from './Home.module.css';

const Home = () => {
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);
    const [refresh, setRefresh] = useState({
        order: 'default',
        filter: 'default'
    });
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
    }, 1000);

    const handleRefresh = () => {
        dispatch(getDogs());
        dispatch(orderByName());
        setRefresh({
            order: 'default',
            filter: 'default'
        });
        setCurrentPage(1);
    };

    return (
        <div>
            <div className={style.home__container}>
                <Header
                    refresh={refresh}
                    handleRefresh={handleRefresh}
                    setRefresh={setRefresh}
                    setCurrentPage={setCurrentPage} />
                {
                    isLoading ? <Loader /> :

                        <div className={style.cards__container}>
                            {currentDogs.length > 0 ? (
                                currentDogs.map((e) => (
                                    <div key={e.id}>
                                            <Card id={e.id} name={e.name} image={e?.image} temperament={e.temperament} weight={e.weight} />
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
                <Footer/>
            </div>
        </div>
    );
};

export default Home;

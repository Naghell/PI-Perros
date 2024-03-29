import style from './Header.module.css'
import SearchBar from '../SearchBar/SearchBar';
import { useSelector, useDispatch } from 'react-redux';
import { filterCreated, filterTemps, orderByName, orderByWeight } from '../../redux/actions';
import { Link } from 'react-router-dom';

const Header = ({ refresh, handleRefresh, setRefresh, setCurrentPage }) => {
    const dispatch = useDispatch();
    const allTemps = useSelector((state) => state.temperament);

    const handleFilter = (value, action) => {
        dispatch(action(value));
        setCurrentPage(1);
        setRefresh(value);
    };

    const handleOrderBy = (e) => {
        const val = e.target.value;
        dispatch(val.includes('asc') || val.includes('des') ? orderByName(val) : orderByWeight(val));
        setCurrentPage(1);
        setRefresh(val);
    };

    return (
        <header>
            <nav className={style.header__info}>
                <a className={style.nav__link} href='/'>PerrAPI</a>
                <img src='./refresh.svg' className={style.nav__refresh} onClick={handleRefresh}></img>
            </nav>
            <div className={style.header__logo}>
                <img alt="Logo de PerrAPI" className={style.landing__image} src='/logo.svg'></img>
            </div>
            <div className={style.header__wrapper}>
                <SearchBar />
                <div className={style.filters}>
                    <select value={refresh.order} className={style.filter} onChange={(e) => handleOrderBy(e)}>
                        <option value='default' hidden>Ordenar por</option>
                        <option disabled>Alfabético</option>
                        <option value='asc'>A-Z</option>
                        <option value='des'>Z-A</option>
                        <option disabled>Peso</option>
                        <option value='pesado'>Pesado</option>
                        <option value='ligero'>Ligero</option>
                    </select>
                    <select value={refresh.filter} className={style.filter} onChange={(e) => handleFilter(e.target.value, filterTemps)}>
                        <option value='default' hidden>Temperamentos</option>
                        {allTemps.map((e) => {
                            return <option value={e} key={e}>{e}</option>;
                        })}
                    </select>
                    <select value={refresh.filter} className={style.filter} onChange={(e) => handleFilter(e.target.value, filterCreated)}>
                        <option value='default'>Todos</option>
                        <option value='existing'>Existente</option>
                        <option value='created'>Creado</option>
                    </select>
                </div>
                <Link className={style.header__wrapper__add} to='/dog'>
                    <p className={style.header__wrapper__add}>➕</p>
                </Link>
            </div>
        </header>
    );
}

export default Header;
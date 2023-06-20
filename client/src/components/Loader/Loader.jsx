import style from './Loader.module.css'

const Loader = () => {
    return(
        <div className={style.loader__container}>
            <span className={style.loader}></span>
        </div>
    );
};

export default Loader;
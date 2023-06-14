import style from './Pagination.module.css'

//creamos el componente paginado pasandole por parametros a los perros por pagina, todos los perros y la funcion paginado de Home
const Pagination = ({dogsPerPage, allDogs, paginated}) => {

    //creamos un array llamado pageNumbers
    const pageNumbers = [];


    for(let i = 1; i <= Math.ceil(allDogs/dogsPerPage); i++) {
        pageNumbers.push(i)//pusheamos en el array pageNumbers todos los numeros i siempre que i sea menor o igual al cociente redondeado entre todos los perros y los perros por pagina
    }


    return(
        <nav>
            <ul className={style.pagination}>
                
                {
                pageNumbers && pageNumbers.map((number) => {
                    return(
                        <li key={number}>
                            <button key={number} 
                                    className={style.pageBtn} 
                                    onClick={() => paginated(number)}> {number} </button>
                        </li>
                     )
                })
                }
            </ul>
        </nav>
    )
}

export default Pagination;
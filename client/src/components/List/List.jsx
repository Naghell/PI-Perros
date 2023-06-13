import styles from './List.module.css';
import Card from '../Card/Card';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { calculatePagination } from './pagination';

const List = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios('http://localhost:3001/dogs');
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = async (searchTerm) => {
    if (!searchTerm) {
      setFilteredData([]);
    } else {
      try {
        const response = await axios.get(
          `http://localhost:3001/dogs/name?name=${searchTerm}`
        );
        setFilteredData(response.data);
      } catch (error) {
        console.log(error);
        setFilteredData([]);
      }
    }
    setCurrentPage(1);
  };

  const pagination = calculatePagination(
    filteredData.length > 0 ? filteredData.length : data.length,
    dogsPerPage,
    currentPage
  );

  const currentDogs = filteredData.length > 0
    ? filteredData.slice((currentPage - 1) * dogsPerPage, currentPage * dogsPerPage)
    : data.slice((currentPage - 1) * dogsPerPage, currentPage * dogsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles.list__container}>
      {currentDogs.map((dog) => (
        <Card
          key={dog.id}
          id={dog.id}
          name={dog.name}
          image={dog.image}
          height={dog.height.metric}
          weight={dog.weight.metric}
          life_span={dog.life_span}
          temperament={dog.temperament}
        />
      ))}

      <div className={styles.pagination}>
        <button onClick={() => paginate(pagination.goToFirstPage())} disabled={currentPage === 1}>First</button>
        <button onClick={() => paginate(pagination.goToPreviousPage())} disabled={currentPage === 1}>Previous</button>
        {pagination.getPageNumbers().map((pageNumber) => (
          <button
            key={pageNumber}
            className={currentPage === pageNumber ? styles.active : ''}
            onClick={() => paginate(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
        <button onClick={() => paginate(pagination.goToNextPage())} disabled={currentPage === pagination.totalPages}>Next</button>
        <button onClick={() => paginate(pagination.goToLastPage())} disabled={currentPage === pagination.totalPages}>Last</button>
      </div>
    </div>
  );
};

export default List;

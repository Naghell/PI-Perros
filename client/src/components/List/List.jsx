import styles from './List.module.css';
import Card from '../Card/Card';
import { useEffect, useState } from 'react';
import axios from 'axios';

const List = () => {

    const [data, setData] = useState([]);

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
    }, [])

    return (
        <div className={styles.list__container}>
            {data.map((dog) => (
                <Card
                    key={dog.id}
                    id={dog.id}
                    name={dog.name}
                    image={dog.image}
                    height={dog.height}
                    weight={dog.weight}
                    life_span={dog.life_span}
                    temperament={dog.temperament}
                />
            ))}
        </div>
    )
}

export default List;
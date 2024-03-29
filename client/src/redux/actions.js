import axios from 'axios';
import { GET_DOGS, FILTER_CREATED, ORDER_BY_NAME, ORDER_BY_WEIGHT, GET_NAME_DOGS, GET_TEMPERAMENTS, POST_DOG, GET_DETAIL, FILTER_BY_TEMP, DELETE_DOG} from './action_types';

export const getDogs = () => {
    return async function(dispatch){
        try {
            const response = await axios('/dogs');
            return dispatch({
                type: GET_DOGS,
                payload: response.data
            });
        } catch (error) {
            console.log(error);
        };
    };
};

export const getNameDogs = (name) => {
    return async function(dispatch) {
      try {
        const response = await axios.get(`/dogs?name=${name}`);
        const dogs = response.data.map((dog) => ({
          ...dog,
          image: `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`
        }));
        dispatch({
          type: GET_NAME_DOGS,
          payload: dogs
        });
      } catch (error) {
        console.log(error);
        alert('Raza inexistente.');
      };
    };
  };

export const getTemperaments = () => {
    return async function (dispatch) {
        try {
            const response = await axios('/temperaments')
            return (
                dispatch({
                    type: GET_TEMPERAMENTS,
                    payload: response.data
                })
            );
        } catch (error) {
            console.log(error);
        };
    };
};

export const postDog = (payload) => {
    return async function (dispatch) {
      try {
        const response = await axios.get('/dogs');
        const existingDogs = response.data;
  
        const isDuplicate = existingDogs.some((dog) => {
          return (
            dog.name.toLowerCase() === payload.name.toLowerCase()
          );
        });
  
        if (isDuplicate) {
          throw new Error('Este perro ya existe');
        }
  
        const postResponse = await axios.post('/dogs', payload);
        return dispatch({
          type: POST_DOG,
          payload: postResponse.data,
        });
      } catch (error) {
        console.log(error);
      }
    };
  };
  

export const filterCreated = (payload) => {
    return{
        type: FILTER_CREATED,
        payload
    };
};

export const filterTemps = (payload) => {
    return {
        type: FILTER_BY_TEMP,
        payload
    };
}

export const orderByName = (payload) => {
    return {
        type: ORDER_BY_NAME,
        payload
    };
};

export const orderByWeight = (payload) => {
    return {
        type: ORDER_BY_WEIGHT,
        payload
    }
};

export const getDetail = (id) => {
    return async function (dispatch) {
        try {
            const response = await axios('/dogs/' + id);
            return dispatch({
                type: GET_DETAIL,
                payload: response.data
            })
        } catch (error) {
            console.log(error);
        };
    };
};

export const deleteDog = (id) => {
  return {
      type: DELETE_DOG,
      payload: id
  }
}
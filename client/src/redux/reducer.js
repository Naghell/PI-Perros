import { GET_DOGS, FILTER_CREATED, ORDER_BY_NAME, ORDER_BY_WEIGHT, GET_NAME_DOGS, GET_TEMPERAMENTS, POST_DOG, GET_DETAIL, FILTER_BY_TEMP } from "./action_types";

//creamos los estados iniciales
const initialState = {
  allDogs: [],
  dogs: [],
  temperament: [],
  detail: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DOGS:
      const sortedDogs = action.payload.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (b.name > a.name) return -1;
        return 0;
      });

      return {
        ...state,
        allDogs: sortedDogs,
        dogs: sortedDogs,
      };

    case FILTER_BY_TEMP:
      let tempFilter = [];
      if (action.payload === "default") {
        tempFilter = state.allDogs;
      } else {
        tempFilter = state.dogs.filter((dog) => {
          if (dog.createdInDb) {
            return dog.temperament?.some((temp) => temp.name === action.payload) || dog.temperament?.includes(action.payload);
          } else {
            return dog.temperament?.includes(action.payload);
          }
        });
      }
      return {
        ...state,
        dogs: tempFilter
      };

    case FILTER_CREATED:
      let createdFilter = [];
      if (action.payload === "default") {
        createdFilter = state.allDogs.sort();
      } else if (action.payload === "existing") {
        createdFilter = state.dogs.filter((dog) => !dog.createdInDb);
      } else {
        createdFilter = state.dogs.filter((dog) => dog.createdInDb);
      }
      return {
        ...state,
        dogs: createdFilter,
      };

    case ORDER_BY_NAME:
      const sortedArr = state.allDogs.sort((a, b) => {
        if (action.payload === "asc") {
          if (a.name > b.name) return 1;
          if (b.name > a.name) return -1;
          return 0;
        }
        if (action.payload === "des") {
          if (a.name > b.name) return -1;
          if (b.name > a.name) return 1;
          return 0;
        }
      });
      return {
        ...state,
        dogs: sortedArr,
      };

    case ORDER_BY_WEIGHT:
      const orderedDogs = state.allDogs.sort((a, b) => {
        let [minWeightA, maxWeightA] = [0, 0];
        let [minWeightB, maxWeightB] = [0, 0];

        if (a.weight.metric) {
          [minWeightA, maxWeightA] = a.weight.metric.split(" - ").map(Number);
        } else {
          minWeightA = a.weight;
          maxWeightA = a.weight;
        }

        if (b.weight.metric) {
          [minWeightB, maxWeightB] = b.weight.metric.split(" - ").map(Number);
        } else {
          minWeightB = b.weight;
          maxWeightB = b.weight;
        }

        if (action.payload === "pesado") {
          return maxWeightB - maxWeightA || minWeightB - minWeightA;
        }
        if (action.payload === "ligero") {
          return minWeightA - minWeightB || maxWeightA - maxWeightB;
        }

        return 0;
      });

      return {
        ...state,
        dogs: orderedDogs,
      };

    case GET_NAME_DOGS:
      return {
        ...state,
        dogs: action.payload,
      };

    case POST_DOG:
      return {
        ...state,
        dogs: action.payload,
      };

    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperament: action.payload,
      };

    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };

    default:
      return { ...state };
  }
};

export default reducer;

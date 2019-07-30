import axios from '../axios';
import { API_KEY } from '../api_key';

export const loadData = (type, data, city = false) => dispatch => {

    let requestType, dispatchType, request;
    if (type === 'current') {
        requestType = 'weather';
        dispatchType = 'LOAD_CURRENT';
    } else if (type === 'fiveday') {
        requestType = 'forecast';
        dispatchType = 'LOAD_FIVEDAY';
    }
    if (city) {
        request = `/${requestType}?q=${data}&APPID=${API_KEY}`;
    } else {
        request = `/${requestType}?lat=${data[0]}&lon=${data[1]}&APPID=${API_KEY}`;
    }
    checkForAPIErrors(axios.get(request), dispatch, dispatchType);
}

const checkForAPIErrors = async (promise, dispatch, type) => {
    try {
        const response = await promise;
        dispatch({ type: type, payload: { ...response.data, updated: parseInt((Date.now() / 1000).toFixed(0)) } });
        if (response.data.hasOwnProperty('name')) {
            dispatch(setCity(response.data.name));
        } else if (response.data.hasOwnProperty('city')) {
            dispatch(setCity(response.data.city.name));
        }
    }
    catch (error) {
        dispatch(addError(error));
    }
}

export const addError = error => {
    return {
        type: 'ADD_ERROR',
        payload: error
    }
}

export const removeError = () => {
    return {
        type: 'REMOVE_ERROR'
    }
}

export const setCity = city => {
    return {
        type: 'SET_CITY',
        payload: city
    }
}



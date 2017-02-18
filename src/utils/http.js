import { BASE_URL } from '../constants';
import { normalize } from 'normalizr';

class ApiError extends Error {
    
    constructor(message, status) {
        super(message);
        this.message = message || 'Произошла ошибка';
        this.status = status;
    }
}

const checkStatus = response => {
    
    if (response.error) {
        const error = new ApiError(response.message, response.statusCode);
        throw error;
    }
    
    return response
}


export const makeRequest = ({ url, schema, ...options }) => 
    fetch(`${BASE_URL}/api/${url}`, {
        ...options,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(checkStatus)
    .then(response => schema? normalize(response, schema) : response)
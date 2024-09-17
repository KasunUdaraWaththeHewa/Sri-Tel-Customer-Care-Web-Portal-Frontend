import axios from 'axios';

import { baseURL } from './data';


// Creating an Axios instance
const api = axios.create({
    baseURL: baseURL,
    timeout: 10000, // Request timeout
});

// Request Interceptor
api.interceptors.request.use(
    config => {
        // Attaching token to headers
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
        if (token) {
            config.headers['Authorization'] = `${token}`;
        }

        // Enabling CORS
        config.headers['Access-Control-Allow-Origin'] = '*';
        config.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';

        return config;
    },
    error => {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Response Interceptor
api.interceptors.response.use(
    response => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        return response;
    },
    error => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        if (error.response) {
            console.log('status:', error.response.status);
            switch (error.response.status) {
                case 401:
                    console.error('Unauthorized! Token may be invalid.');
                    
                    break;
                case 403:
                    console.error('Forbidden! Access not allowed.');
             
                    break;
                case 404:
                    console.error('Not Found! The requested resource does not exist.');
                    break;
                case 500:
                    console.error('Internal Server Error! Something went wrong on the server.');
                    break;
                default:
                    console.error(`Unhandled error: ${error.response.status}`);
            }
        } else if (error.request) {
            console.error('No response received!');
        } else {
            console.error('Error setting up request!');
        }
        return Promise.reject(error);
    }
);

export default api;

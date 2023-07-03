import axios from 'axios';

let localStorageToken;
if (typeof window !== 'undefined') {
  localStorageToken = localStorage.getItem('accessToken');
}

const axiosClient = axios.create({
  baseURL: process.env.SERVER_API,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': '*'
  },
});

if (localStorageToken) {
  console.log("here")
  axiosClient.defaults.headers.common.Authorization = `Bearer ${localStorageToken}`;
}


axiosClient.interceptors.response.use(
  (response) => {
    // Si la réponse contient une exception, on affiche un message d'erreur dans un toast
    if (response.data.exception) {
      /*toast.error(
        `${
          response.data.exception && response.data.exception !== ''
            ? `${response.data.exception}`
            : ''
        } \n\n${response.data.message}`
      );*/
    }
    return response;
  },
  (error) => {
    if (error.response) {
      // La requête a été faite mais le serveur a répondu avec une erreur
      const { data, status } = error.response;
      if (
        data.errors !== undefined &&
        data.errors.includes('Unauthenticated.')
      ) {
        localStorage.removeItem('token');
        window.location.href = '/login';
        /*toast.error(() => {
          return `Vous n'êtes pas autorisé à accéder à la plateforme.`;
        });*/
      }
      console.log('Request made but the server responded with an error :', {
        data,
        status,
      });
    } else if (error.request) {
      // La requête a été faite mais aucune réponse n'a été reçue du serveur
      console.log(
        'Request made but no response is received from the server :',
        error.request
      );
    } else {
      // Une erreur s'est produite lors du setup de la requête
      console.log(
        'Error occured while setting up the request :',
        error.message
      );
    }
    return Promise.reject(error);
  }
);

export { axiosClient };
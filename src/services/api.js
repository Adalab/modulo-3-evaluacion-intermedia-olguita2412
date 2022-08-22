// Fichero src/services/api.js
const callToApi = () => {
    // Llamamos a la API
    return fetch('https://beta.adalab.es/curso-intensivo-fullstack-recursos/apis/quotes-friends-tv-v1/quotes.json') // Estea es la URL de la API
      .then((response) => response.json())
      .then((response) => {
        // Cuando responde la API podemos limpiar los datos aquí
        return response;
      });
  };
  
  export default callToApi;
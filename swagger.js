const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Recipe Book API',
        description: 'This is an API Built to keep track of user recipes and user data'
    },
    host: 'localhost:8080',
    schemes: ['http']
};

const outputFile = './swagger/swagger-output.json';
const endpointsFiles = './routes/index.js';

swaggerAutogen(outputFile, endpointsFiles, doc);

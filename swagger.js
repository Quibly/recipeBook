const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Description',
  },
  host: 'localhost:8080',
  schemes: ['https'],
};

const outputFile = './swagger/swagger-output.json';
const endpointsFiles = ['./path/endpointsUser.js', './path/endpointsBook.js'];

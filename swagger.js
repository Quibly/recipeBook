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
const endpointsFiles = ['./app.js', './routes/users.js', './routes/recipes.js'];

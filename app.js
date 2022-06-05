// load modules and set port variable
const dotenv = require('dotenv');
dotenv.config();
let port = process.env.PORT || 8080;
let express = require('express');
let server = express();
let swaggerUI = require('swagger-ui-express');
let swaggerDocument = require('./swagger/swagger-output.json');
const morgan = require('morgan');
let exphbs = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');

// configure swagger UI Express
server.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// Passport config
require('./config/passport.js')(passport);

//configure morgan
if (process.env.NODE_ENV === 'development') {
    server.use(morgan('dev'));
}

// set connect for use of initDB function from ./db/connect.js
const connect = require('./db/connect');
connect.initDB();

// Handlebars
server.engine('.hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }));
server.set('view engine', '.hbs');

// Sessions middleware
server.use(
    session({
        secret: 'official ball',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.DB_URI })
    })
);

// Passport middleware
server.use(passport.initialize());
server.use(passport.session());

// Static Folder
server.use(express.static(path.join(__dirname, '/public')));

// configure header
server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Content-Disposition');
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

// configure bodyparser
let bodyParser = require('body-parser');
server.use(bodyParser.json());

// route traffic
server.use('/', require('./routes'));

//listen for traffic
server.listen(port, () => console.log(`Server listening on port: ${port}`));

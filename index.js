require('dotenv').config();
const express = require('express');
// const session = require('express-session');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);
const helmet = require('helmet');
// const passport = require('passport');
const cors = require('cors');
const db = require('./models/index.js');
const morgan = require('morgan');
const dns = require('node:dns');
const app = express();


const port = process.env.PORT;

// var corsOptions = {
// 	origin: `http://localhost:${port}/api/`,
// 	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };

app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api', require('./controllers/index.js'));

app.set('trust proxy', true);
app.set('title', 'capstone project');

app.get('/', async (req, res) => {
	res.send('hello World')
});

const startServer = () => {
	app.listen(port, () => {
		console.log(`Example app listening on port ${port}`);
	});
};

const connectDB = async () => {
	try {
		await db.sequelize.sync({force: false});
		console.log('db connected');
	} catch (error) {
		console.log('Could not connect to the database. Error => ', error);
	}
};

async function init() {
	try {
		startServer();
		await connectDB();
	} catch (error) {
		console.log('ERROR => ', error);
	}
}

init();

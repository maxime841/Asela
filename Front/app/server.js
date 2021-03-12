require("dotenv").config();
const cors = require('cors')
const express = require("express");
const router = require("./router");
//const session = require("express-session");
const app = express();

const port = process.env.PORT || 4040;


//app.use(userMiddleware);

app.set('views', './app/views');
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



const publicPath = __dirname + '/public';
app.use(express.static(publicPath));
console.log(publicPath);

// CORS
app.use((req, res, next) => {
	// on autorise explicitement le domaine du front
  
	const allowedOrigins = ['http://localhost:4040', 'http://localhost:3030'];
	const { origin } = req.headers;
	if (allowedOrigins.includes(origin)) {
	  res.setHeader('Access-Control-Allow-Origin', origin);
	}
	// res.header('Access-Control-Allow-Origin', 'http://3.127.235.222/');
	// on autorise le partage du cookie
	res.header('Access-Control-Allow-Credentials', true);
	// on autorise le partage de ressources entre origines
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
	next();
  });
app.use(express.json());

app.use('/v1', router);

app.init = () => {
    app.listen(port, () => console.log(`Running on http://localhost:${port}`));
};

module.exports = app;
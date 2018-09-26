const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const post = process.env.PORT || 3000;
const app = express();

// Handlebars partials
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// Middlewear
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`	
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if(err) {
			console.log('unable to write to server.log');
		}
	});
	next();
});

// Handlebars Helpers
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

// Routing
app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome to my castle!'
	});
});

app.get('/about', (req, res) => {	
	res.render('about.hbs', {
		pageTitle: 'About Page'	
	});
});

app.get('/projects', (req, res) => {	
	res.render('projects.hbs', {
		pageTitle: 'Projects Page',
		welcomeMessage: 'Welcome to my portfolio!'	
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Shit went wrong'
	});
});

// Define port
app.listen(post, () => {
	console.log(`running on port ${post}`);
}); 
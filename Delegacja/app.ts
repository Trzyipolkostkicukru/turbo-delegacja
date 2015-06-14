import express = require('express');
import routes = require('./routes/index');
import http = require('http');
import path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);
app.post('/', function (req, res) {
    console.log(req.body);
    res.redirect('logged');
});
app.get('/about', routes.about);
app.get('/contact', routes.contact);
app.get('/wniosek', routes.wniosek);
app.get('/logged', routes.logged);
app.get('/wniosek_auto', routes.wniosek_auto);
app.get('/wniosek_auto_przebieg', routes.wniosek_auto_przebieg);
app.get('/wniosek_zaliczka', routes.wniosek_zaliczka);



//testowe
app.get('/pdf_auto', routes.pdf_auto);
app.get('/pdf_przebieg', routes.pdf_przebieg);
app.get('/pdf_zaliczka', routes.pdf_zaliczka);


http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

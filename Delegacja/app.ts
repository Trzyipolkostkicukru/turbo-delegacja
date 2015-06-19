import express = require('express');
import routes = require('./routes/index');
import mysql = require('./mysqlHandler'); 
import http = require('http');
import path = require('path');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('HIRONAKAMURA'));
app.use(express.session({
    secret: "0GBlJZ9EKBt2Zbi2flRPvztczCewBxXK",
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000 }));
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);
app.post('/',(req, res) => {
    if (req.body.User === "" || req.body.Password === "") res.redirect('');
    else {
        var arguments = [ null, req.body.User, req.body.Password, req, res ];
        mysql.selectQuery("SELECT * FROM Uzytkownicy WHERE UsosLogin='" + req.body.User + "'", checkUser, arguments);
    }

});


app.post('/wniosekAutoNew', (req, res) => {
    res.redirect('pdf_auto');
});
app.post('/wniosekAutoPrzebiegNew', (req, res) => {
    res.redirect('pdf_przebieg');
});
app.post('/wniosekPotwierdzenieNew', (req, res) => {
    res.redirect('pdf_potwierdzenie');
});
app.post('/wniosekWyjazdNew', (req, res) => {
    res.redirect('pdf_wyjazdowy');
});
app.post('/wniosekZaliczkaNew', (req, res) => {
    res.redirect('pdf_zaliczka');
});
app.post('/logout',(req, res) => {
    req.session.destroy(() => {});
    res.redirect('');
});
app.post('/moje_autaNew', routes.moje_autaNew);
app.post('/moje_autaEdit', routes.moje_autaEditSave);
app.get('/moje_autaRemove', routes.moje_autaRemove);
app.get('/moje_autaEdit', routes.moje_autaEdit);

app.get('/about', routes.about);
app.get('/contact', routes.contact);

app.get('/wniosek_wyjazdowy', routes.wniosek_wyjazdowy);
app.post('/wniosek_wyjazdowyNew', routes.wniosek_wyjazdowyNew);

app.get('/logged', routes.logged);
app.get('/wniosek_auto', routes.wniosek_auto);
app.get('/wniosek_auto_przebieg', routes.wniosek_auto_przebieg);
app.get('/wniosek_zaliczka', routes.wniosek_zaliczka);
app.get('/wniosek_potwierdzenie', routes.wniosek_potwierdzenie);
app.get('/moje_auta', routes.moje_auta);
app.get('/moje_dane', routes.moje_dane);
app.get('/moje_historia', routes.moje_historia);
app.get('/moje_wnioski', routes.moje_wnioski);


app.get('/pdf_wyjazdowy', routes.pdf_wyjazdowy);
app.get('/pdf_potwierdzenie', routes.pdf_potwierdzenie);
app.get('/pdf_auto', routes.pdf_auto);
app.get('/pdf_przebieg', routes.pdf_przebieg);
app.get('/pdf_zaliczka', routes.pdf_zaliczka);
app.get('/pdf_potwierdzenie', routes.pdf_potwierdzenie);

http.createServer(app).listen(app.get('port'), () => {
    console.log('Express server listening on port ' + app.get('port'));
});

function checkUser(rows: any, User: string, Password: string, req: express.Request, res: express.Response) {
    if (rows !== null) {
        if (rows.UsosPass === Password) {
            req.session.user = [];
            req.session["UsosLogin"] = rows.UsosLogin;
            req.session["UsosLogin"] = rows.UsosLogin;
            req.session["Ranga"] = rows.Ranga;
            req.session["Podpis"] = rows.Podpis;
            req.session["Imie"] = rows.Imie;
            req.session["Nazwisko"] = rows.Nazwisko;
            req.session["Stopien"] = rows.Stopien;
            req.session["Kontakt"] = rows.Kontakt;
            req.session["Zatrudnienie"] = rows.Zatrudnienie;
            req.session["Stanowisko"] = rows.Stanowisko;
            res.redirect('logged');
        } else res.redirect(''); //zle haslo
    } else res.redirect('');
};
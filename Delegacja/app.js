var express = require('express');
var routes = require('./routes/index');
var mysql = require('./mysqlHandler');
var http = require('http');
var path = require('path');
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
    activeDuration: 5 * 60 * 1000
}));
app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
});
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', routes.index);
app.post('/', function (req, res) {
    if (req.body.User === "" || req.body.Password === "")
        res.redirect('');
    else {
        var arguments = [null, req.body.User, req.body.Password, req, res];
        mysql.selectQuery("SELECT * FROM Uzytkownicy WHERE UsosLogin='" + req.body.User + "'", checkUser, arguments);
    }
});
app.get('/logout', function (req, res) {
    req.session.destroy(function () {
    });
    res.redirect('');
});
app.post('/moje_autaNew', routes.moje_autaNew);
app.post('/moje_autaEdit', routes.moje_autaEditSave);
app.get('/moje_autaRemove', routes.moje_autaRemove);
app.get('/moje_autaEdit', routes.moje_autaEdit);
app.get('/about', routes.about);
app.get('/contact', routes.contact);
app.get('/wniosek_wyjazdowy', routes.wniosek_wyjazdowy);
app.post('/wniosek_wyjazdowyAccept', routes.wniosek_wyjazdowyAccept);
app.post('/wniosek_wyjazdowyNew', routes.wniosek_wyjazdowyNew);
app.get('/oczekujace_wnioski', routes.oczekujace_wnioski);
app.get('/oczekujace_polecenia', routes.oczekujace_polecenia);
app.get('/poleceniaAccept', routes.poleceniaAccept);
app.get('/pdf_polecenia', routes.pdf_polecenia);
app.get('/poleceniaRemove', routes.poleceniaRemove);
app.get('/poleceniaNew', routes.poleceniaNew);
app.get('/poleceniaAutaAdd', routes.poleceniaAutaAdd);
app.get('/logged', routes.logged);
//app.get('/wniosek_auto', routes.wniosek_auto);
app.get('/wniosek_auto_przebieg', routes.wniosek_auto_przebieg);
app.post('/wniosek_auto_przebieg', routes.wniosek_auto_przebiegPost);
app.post('/wniosekAutoNew', routes.wniosekAutoNew);
app.get('/wniosek_zaliczka', routes.wniosek_zaliczka);
app.get('/wniosek_potwierdzenie', routes.wniosek_potwierdzenie);
app.get('/moje_auta', routes.moje_auta);
app.get('/moje_dane', routes.moje_daneGet);
app.post('/moje_dane', routes.moje_danePost);
app.get('/moje_historia', routes.moje_historia);
app.get('/moje_wnioski', routes.moje_wnioski);
app.get('/moje_polecenia', routes.moje_polecenia);
app.get('/moje_podpiecia', routes.moje_podpiecia);
app.get('/moje_przebiegi', routes.moje_przebiegi);
app.get('/przebiegiAccept', routes.przebiegiAccept);
app.get('/przebiegiRemove', routes.przebiegiRemove);
app.get('/moje_oswiadczenia', routes.moje_oswiadczenia);
app.get('/podpieciaRemove', routes.podpieciaRemove);
app.get('/podpieciaAccept', routes.podpieciaAccept);
app.get('/poleceniaOswiadczenie', routes.poleceniaOswiadczenie);
app.get('/pdf_wyjazdowy', routes.pdf_wyjazdowy);
app.get('/pdf_potwierdzenie', routes.pdf_potwierdzenie);
app.get('/pdf_auto', routes.pdf_auto);
app.get('/pdf_przebieg', routes.pdf_przebieg);
app.get('/pdf_zaliczka', routes.pdf_zaliczka);
app.get('/pdf_potwierdzenie', routes.pdf_potwierdzenie);
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
function checkUser(rows, User, Password, req, res) {
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
        }
        else
            res.redirect(''); //zle haslo
    }
    else
        res.redirect('');
}
;
//# sourceMappingURL=app.js.map
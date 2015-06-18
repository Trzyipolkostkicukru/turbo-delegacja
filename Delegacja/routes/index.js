var version = "0.0.1";
var pdfCrowd = require('pdfcrowd');
var pdfCrowdClient = new pdfCrowd.Pdfcrowd('biedronka', 'c9225df149b2469749d20b34c928cdff');
function index(req, res) {
    console.log(req);
    if (req.session["UsosLogin"] == null) {
        res.render('index', { title: 'Express', year: new Date().getFullYear(), ver: version });
    }
    else {
        res.render('logged', { title: 'Strefa Turbo Delegacji', year: new Date().getFullYear(), ver: version, message: 'Witamy ' + req.session["Imie"] + ' ' + req.session["Nazwisko"] + '!' });
    }
}
exports.index = index;
;
function wniosek_wyjazdowy(req, res) {
    if (req.session["UsosLogin"] != null)
        res.render('wniosek/wniosek_wyjazdowy', { title: 'Wniosek', year: new Date().getFullYear(), ver: version, message: 'Wypełnij wniosek o służbową delegację.' });
    else
        res.render('index', { title: 'Express', year: new Date().getFullYear(), ver: version });
}
exports.wniosek_wyjazdowy = wniosek_wyjazdowy;
;
function pdf_wyjazdowy(req, res) {
    res.render('pdf/wyjazdowy', {}, function (err, html) {
        pdfCrowdClient.convertHtml(html, pdfCrowd.sendHttpResponse(res));
    });
}
exports.pdf_wyjazdowy = pdf_wyjazdowy;
;
function wniosek_auto(req, res) {
    if (req.session["UsosLogin"] != null)
        res.render('wniosek/wniosek_auto', { title: 'Wniosek Auto', year: new Date().getFullYear(), ver: version, message: 'Wypełnij wniosek o auto.' });
    else
        res.render('index', { title: 'Express', year: new Date().getFullYear(), ver: version });
}
exports.wniosek_auto = wniosek_auto;
;
function pdf_auto(req, res) {
    res.render('pdf/auto', {}, function (err, html) {
        process.stdout.write(req.param("aaa", "fff"));
        pdfCrowdClient.convertHtml(html, pdfCrowd.sendHttpResponse(res));
    });
}
exports.pdf_auto = pdf_auto;
;
function wniosek_zaliczka(req, res) {
    if (req.session["UsosLogin"] != null)
        res.render('wniosek/wniosek_zaliczka', { title: 'Wniosek Zaliczka', year: new Date().getFullYear(), ver: version, message: 'Wypełnij wniosek o zaliczkę.' });
    else
        res.render('index', { title: 'Express', year: new Date().getFullYear(), ver: version });
}
exports.wniosek_zaliczka = wniosek_zaliczka;
;
function pdf_zaliczka(req, res) {
    res.render('pdf/zaliczka', {}, function (err, html) {
        process.stdout.write(req.query.miejscowosc);
        html = html.replace(/{miejscowosc}/g, req.query.miejscowosc);
        html = html.replace(/{terminwyjazdu}/g, req.query.terminwyjazdu);
        html = html.replace(/{terminpowrotu}/g, req.query.terminpowrotu);
        html = html.replace(/{[a-z]+}/g, ""); //wyczyść resztę pól
        //html = html.replace(/{ilosc}/g, req.query.ilosc);
        //html = html.replace(/{naleznosc}/g, req.query.naleznosc);
        //html = html.replace(/{wartosc}/g, req.query.wartosc);
        pdfCrowdClient.convertHtml(html, pdfCrowd.sendHttpResponse(res));
    });
}
exports.pdf_zaliczka = pdf_zaliczka;
;
function wniosek_auto_przebieg(req, res) {
    if (req.session["UsosLogin"] != null)
        res.render('wniosek/wniosek_auto_przebieg', { title: 'Przebieg auta', year: new Date().getFullYear(), ver: version, message: 'Wypełnij przebieg auta.' });
    else
        res.render('index', { title: 'Express', year: new Date().getFullYear(), ver: version });
}
exports.wniosek_auto_przebieg = wniosek_auto_przebieg;
;
function pdf_przebieg(req, res) {
    res.render('pdf/przebieg', {}, function (err, html) {
        pdfCrowdClient.convertHtml(html, pdfCrowd.sendHttpResponse(res));
    });
}
exports.pdf_przebieg = pdf_przebieg;
;
function wniosek_potwierdzenie(req, res) {
    if (req.session["UsosLogin"] != null)
        res.render('wniosek/wniosek_potwierdzenie', { title: 'Potwierdzenie wyjazdu', year: new Date().getFullYear(), ver: version, message: 'Wystaw oświadczenie.' });
    else
        res.render('index', { title: 'Express', year: new Date().getFullYear(), ver: version });
}
exports.wniosek_potwierdzenie = wniosek_potwierdzenie;
;
function pdf_potwierdzenie(req, res) {
    res.render('pdf/potwierdzenie', {}, function (err, html) {
        pdfCrowdClient.convertHtml(html, pdfCrowd.sendHttpResponse(res));
    });
}
exports.pdf_potwierdzenie = pdf_potwierdzenie;
;
function contact(req, res) {
    res.render('contact', { title: 'Kontakt', year: new Date().getFullYear(), ver: version, message: 'Gdzie nas można złapać?' });
}
exports.contact = contact;
;
function about(req, res) {
    res.render('about', { title: 'O nas', year: new Date().getFullYear(), ver: version, message: 'Trochę o nas!' });
}
exports.about = about;
;
function logged(req, res) {
    console.log(req);
    if (req.session["UsosLogin"] != null)
        res.render('logged', { title: 'Strefa Turbo Delegacji', year: new Date().getFullYear(), ver: version, message: 'Witamy ' + req.session["Imie"] + ' ' + req.session["Nazwisko"] + '!' });
    else
        res.render('index', { title: 'Express', year: new Date().getFullYear(), ver: version });
}
exports.logged = logged;
;
//# sourceMappingURL=index.js.map
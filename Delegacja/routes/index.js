var version = "0.0.1";
var pdfCrowd = require('pdfcrowd');
var pdfCrowdClient = new pdfCrowd.Pdfcrowd('biedronka', 'c9225df149b2469749d20b34c928cdff');
function index(req, res) {
    res.render('index', { title: 'Express', year: new Date().getFullYear(), ver: version });
}
exports.index = index;
;
function wniosek_wyjazdowy(req, res) {
    res.render('wniosek/wniosek_wyjazdowy', { title: 'Wniosek', year: new Date().getFullYear(), ver: version, message: 'Wypełnij wniosek o służbową delegację.' });
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
    res.render('wniosek/wniosek_auto', { title: 'Wniosek Auto', year: new Date().getFullYear(), ver: version, message: 'Wypełnij wniosek o auto.' });
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
    res.render('wniosek/wniosek_zaliczka', { title: 'Wniosek Zaliczka', year: new Date().getFullYear(), ver: version, message: 'Wypełnij wniosek o zaliczkę.' });
}
exports.wniosek_zaliczka = wniosek_zaliczka;
;
function pdf_zaliczka(req, res) {
    res.render('pdf/zaliczka', {}, function (err, html) {
        pdfCrowdClient.convertHtml(html, pdfCrowd.sendHttpResponse(res));
    });
}
exports.pdf_zaliczka = pdf_zaliczka;
;
function wniosek_auto_przebieg(req, res) {
    res.render('wniosek/wniosek_auto_przebieg', { title: 'Przebieg auta', year: new Date().getFullYear(), ver: version, message: 'Wypełnij przebieg auta.' });
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
    res.render('wniosek/wniosek_potwierdzenie', { title: 'Potwierdzenie wyjazdu', year: new Date().getFullYear(), ver: version, message: 'Wystaw oświadczenie.' });
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
    res.render('logged', { title: 'Strefa Turbo Delegacji', year: new Date().getFullYear(), ver: version, message: 'Witamy!' });
}
exports.logged = logged;
;
//# sourceMappingURL=index.js.map
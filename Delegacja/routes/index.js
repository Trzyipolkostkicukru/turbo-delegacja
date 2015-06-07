var version = "0.0.1";
function index(req, res) {
    res.render('index', { title: 'Express', year: new Date().getFullYear(), ver: version });
}
exports.index = index;
;
function wniosek(req, res) {
    res.render('wniosek', { title: 'Wniosek', year: new Date().getFullYear(), ver: version, message: 'Wypełnij wniosek o służbową delegację.' });
}
exports.wniosek = wniosek;
;
function wniosek_auto(req, res) {
    res.render('wniosek_auto', { title: 'Wniosek Auto', year: new Date().getFullYear(), ver: version, message: 'Wypełnij wniosek o auto.' });
}
exports.wniosek_auto = wniosek_auto;
;
function wniosek_auto_przebieg(req, res) {
    res.render('wniosek_auto_przebieg', { title: 'Przebieg auta', year: new Date().getFullYear(), ver: version, message: 'Wypełnij przebieg auta.' });
}
exports.wniosek_auto_przebieg = wniosek_auto_przebieg;
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
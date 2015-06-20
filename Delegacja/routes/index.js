var mysql = require('../mysqlHandler');
var version = "0.0.1";
var pdfCrowd = require('pdfcrowd');
var pdfCrowdClient = new pdfCrowd.Pdfcrowd('biedronka', 'c9225df149b2469749d20b34c928cdff');
var moment = require("moment");
function index(req, res) {
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
function wniosek_wyjazdowyNew(req, res) {
    var krajowy = (req.body.Kraj == "Polska") ? 1 : 0;
    mysql.insertQuery("INSERT INTO WniosekWyjazdowy VALUES (NULL, (SELECT Id FROM Uzytkownicy WHERE UsosLogin='" + req.session["UsosLogin"] + "'), '" + req.body.Cel + "', '" + req.body.Uzasadnienie + "', " + "'" + req.body.Osrodek + "', '" + req.body.Kraj + "', '" + req.body.Miejscowosc + "', STR_TO_DATE('" + req.body.Data_wyjazdu + "','%d-%m-%Y'), STR_TO_DATE('" + req.body.Data_powrotu + "','%d-%m-%Y'), " + "'" + req.body.Srodki_lokomocji + "', '" + req.body.Zrodlo_finansowania + "', '" + req.body.Diety + "', '" + req.body.Przejazd + "', '" + req.body.Zakwaterowanie + "', '" + req.body.Wyzywienie + "', " + "'" + req.body.Oplata_konferencyjna + "', '" + req.body.Inne + "', NOW(), NULL, NULL, NULL, '1', NULL, '" + krajowy + "')");
    moje_wnioski(req, res);
}
exports.wniosek_wyjazdowyNew = wniosek_wyjazdowyNew;
;
function wniosek_wyjazdowyAccept(req, res) {
    //if(req.session["Ranga"])
    var func = function (tab, req, res) {
        console.log(tab);
        if (tab.Id_uzytkownika != tab.Przelozony_id && tab.Przelozony == tab.Przelozony_id && tab.Id_przelozony == null && tab.Id_kierownik_pracy == null && tab.Id_kierownik_jednostki == null && tab.Id_decyzyjna == null) {
            mysql.insertQuery("UPDATE WniosekWyjazdowy SET Stan='2', Id_przelozony='" + req.session["Podpis"] + "' WHERE Id='" + req.query.Id + "'");
        }
        if (tab.Id_uzytkownika != tab.Przelozony_id && parseInt(req.session["Ranga"]) >= 2 && tab.Przelozony != tab.Przelozony_id && tab.Id_przelozony != null && tab.Id_kierownik_pracy == null && tab.Id_kierownik_jednostki == null && tab.Id_decyzyjna == null) {
            mysql.insertQuery("UPDATE WniosekWyjazdowy SET Stan='2', Id_kierownik_pracy='" + req.session["Podpis"] + "' WHERE Id='" + req.query.Id + "'");
        }
        else if (tab.Id_uzytkownika != tab.Przelozony_id && parseInt(req.session["Ranga"]) >= 2 && tab.Przelozony != tab.Przelozony_id && tab.Id_przelozony != null && tab.Id_kierownik_pracy != null && tab.Id_kierownik_jednostki == null && tab.Id_decyzyjna == null) {
            mysql.insertQuery("UPDATE WniosekWyjazdowy SET Stan='2', Id_kierownik_jednostki='" + req.session["Podpis"] + "' WHERE Id='" + req.query.Id + "'");
        }
        if (tab.Id_uzytkownika != tab.Przelozony_id && parseInt(req.session["Ranga"]) >= tab.Ranga && parseInt(req.session["Ranga"]) >= 3 && tab.Przelozony != tab.Przelozony_id && tab.Id_przelozony != null && tab.Id_kierownik_pracy != null && tab.Id_kierownik_jednostki != null && tab.Id_decyzyjna == null) {
            mysql.insertQuery("UPDATE WniosekWyjazdowy SET Stan='3', Id_decyzyjna='" + req.session["Podpis"] + "' WHERE Id='" + req.query.Id + "'");
        }
        if (req.session["UsosLogin"] != null) {
            var func = function (tab, req, res) {
                for (var item in tab) {
                    moment.locale('pl');
                    tab[item].Data_wystawienia = moment(tab[item].Data_wystawienia.toISOString()).format("DD MMMM YYYY");
                    tab[item].Data_wyjazdu = moment(tab[item].Data_wyjazdu.toISOString()).format("DD MMMM YYYY");
                    tab[item].Data_powrotu = moment(tab[item].Data_powrotu.toISOString()).format("DD MMMM YYYY");
                }
                res.render('zarzadzanie/oczekujace_wnioski', { year: new Date().getFullYear(), ver: version, rows: tab });
            };
            mysql.selectQueries("SELECT *, (SELECT Imie FROM Uzytkownicy u WHERE u.Id = w.Id_uzytkownika) as Imie, (SELECT Nazwisko FROM Uzytkownicy u WHERE u.Id = w.Id_uzytkownika) as Nazwisko FROM WniosekWyjazdowy w WHERE Id_uzytkownika IN(SELECT Id FROM Uzytkownicy WHERE Ranga < '" + req.session["Ranga"] + "' OR Przelozony = (SELECT Id FROM Uzytkownicy WHERE UsosLogin= '" + req.session["UsosLogin"] + "'))", func, [null, req, res]);
        }
        else
            res.render('index', { title: 'Express', year: new Date().getFullYear(), ver: version });
    };
    var value = mysql.selectQuery("SELECT *, (SELECT Id FROM Uzytkownicy u WHERE UsosLogin='" + req.session["UsosLogin"] + "') as Przelozony_id, (SELECT Przelozony FROM Uzytkownicy WHERE Id=w.Id_uzytkownika) as Przelozony, (SELECT Ranga FROM Uzytkownicy WHERE Id=w.Id_uzytkownika) as Ranga FROM WniosekWyjazdowy w WHERE Id='" + req.query.Id + "'", func, [null, req, res]);
}
exports.wniosek_wyjazdowyAccept = wniosek_wyjazdowyAccept;
;
function oczekujace_wnioski(req, res) {
    if (req.session["UsosLogin"] != null) {
        var func = function (tab, req, res) {
            for (var item in tab) {
                moment.locale('pl');
                tab[item].Data_wystawienia = moment(tab[item].Data_wystawienia.toISOString()).format("DD MMMM YYYY");
                tab[item].Data_wyjazdu = moment(tab[item].Data_wyjazdu.toISOString()).format("DD MMMM YYYY");
                tab[item].Data_powrotu = moment(tab[item].Data_powrotu.toISOString()).format("DD MMMM YYYY");
            }
            res.render('zarzadzanie/oczekujace_wnioski', { year: new Date().getFullYear(), ver: version, rows: tab });
        };
        mysql.selectQueries("SELECT *, (SELECT Imie FROM Uzytkownicy u WHERE u.Id = w.Id_uzytkownika) as Imie, (SELECT Nazwisko FROM Uzytkownicy u WHERE u.Id = w.Id_uzytkownika) as Nazwisko FROM WniosekWyjazdowy w WHERE (Id_uzytkownika IN(SELECT Id FROM Uzytkownicy WHERE Ranga < '" + req.session["Ranga"] + "' OR Przelozony = (SELECT Id FROM Uzytkownicy WHERE UsosLogin= '" + req.session["UsosLogin"] + "')) AND w.Stan=1 OR w.Stan=2 OR w.Stan=3)", func, [null, req, res]);
    }
    else
        res.render('index', { title: 'Express', year: new Date().getFullYear(), ver: version });
}
exports.oczekujace_wnioski = oczekujace_wnioski;
;
function pdf_wyjazdowy(req, res) {
    var func = function (tab, req, res) {
        res.render('pdf/wyjazdowy', {}, function (err, html) {
            if (html !== undefined) {
                html = html.replace(/{imie}/g, req.session["Imie"]);
                html = html.replace(/{nazwisko}/g, req.session["Nazwisko"]);
                html = html.replace(/{stopien_naukowy}/g, req.session["Stopien"]);
                html = html.replace(/{kontakt}/g, req.session["Kontakt"]);
                html = html.replace(/{stanowisko}/g, req.session["Stanowisko"]);
                html = html.replace(/{zatrudnienie}/g, req.session["Zatrudnienie"]);
                html = html.replace(/{cel_wyjazdu}/g, tab.Cel);
                html = html.replace(/{uzasadnienie}/g, tab.Uzasadnienie);
                html = html.replace(/{osrodek}/g, tab.Osrodek);
                html = html.replace(/{kraj}/g, tab.Kraj);
                html = html.replace(/{miejscowosc}/g, tab.Miejscowosc);
                html = html.replace(/{data_wyjazdu}/g, moment(tab.Data_wyjazdu).format("DD MMMM YYYY"));
                html = html.replace(/{data_powrotu}/g, moment(tab.Data_powrotu).format("DD MMMM YYYY"));
                html = html.replace(/{srodki_lokomocji}/g, tab.Srodek_lokomocji);
                html = html.replace(/{zrodlo_finansowania}/g, tab.Zrodlo_finansowania);
                html = html.replace(/{diety}/g, tab.Diety);
                html = html.replace(/{przejazd}/g, tab.Przejazd);
                html = html.replace(/{zakwaterowanie}/g, tab.Zakwaterowanie);
                html = html.replace(/{wyzywienie}/g, tab.Wyzywienie);
                html = html.replace(/{oplata_konferencyjna}/g, tab.Oplata_konferencyjna);
                html = html.replace(/{inne}/g, tab.Inne);
                html = html.replace(/{suma}/g, (tab.Diety + tab.Przejazd + tab.Zakwaterowanie + tab.Wyzywienie + tab.Oplata_konferencyjna + tab.Inne).toString());
                html = html.replace(/{data_wystawienia}/g, moment(tab.Data_wystawienia).format("DD MMMM YYYY"));
                html = html.replace(/{podpis_pracownika}/g, req.session["Podpis"]);
                if (tab.Id_kierownik_jednostki == null)
                    html = html.replace(/{podpis_kierownik_jednostki}/g, " ");
                else
                    html = html.replace(/{podpis_kierownik_jednostki}/g, tab.Id_kierownik_jednostki);
                if (tab.Id_decyzyjna == null)
                    html = html.replace(/{podpis_decyzyjna}/g, " ");
                else
                    html = html.replace(/{podpis_decyzyjna}/g, tab.Id_decyzyjna);
                if (tab.Id_przelozony == null)
                    html = html.replace(/{podpis_przelozony}/g, " ");
                else
                    html = html.replace(/{podpis_przelozony}/g, tab.Id_przelozony);
                if (tab.Id_kierownik_pracy == null)
                    html = html.replace(/{podpis_kierownik_pracy}/g, " ");
                else
                    html = html.replace(/{podpis_kierownik_pracy}/g, tab.Id_kierownik_pracy);
                pdfCrowdClient.convertHtml(html, pdfCrowd.sendHttpResponse(res));
            }
        });
    };
    var params = [null, req, res];
    mysql.selectQuery("SELECT * FROM WniosekWyjazdowy WHERE Id='" + req.query.Id + "'", func, params);
}
exports.pdf_wyjazdowy = pdf_wyjazdowy;
;
function oczekujace_polecenia(req, res) {
    if (req.session["UsosLogin"] != null) {
        var func = function (tab, req, res) {
            for (var item in tab) {
                moment.locale('pl');
                tab[item].Data_wystawienia = moment(tab[item].Data_wystawienia.toISOString()).format("DD MMMM YYYY");
                if (tab[item].Polecenie_wyjazdu == 1)
                    tab[item].PolPod = "Polecenie wyjazdu";
                else
                    tab[item].PolPod = "Podnoszenie kwalifikacji";
            }
            res.render('zarzadzanie/oczekujace_polecenia', { year: new Date().getFullYear(), ver: version, rows: tab });
        };
        mysql.selectQueries("SELECT *, (SELECT Diety+Przejazd+Zakwaterowanie+Wyzywienie+Oplata_konferencyjna+Inne FROM WniosekWyjazdowy WHERE Id=z.Id_wniosek) as Suma, (SELECT Imie FROM Uzytkownicy u WHERE Id=(SELECT Id_uzytkownika FROM WniosekWyjazdowy w WHERE w.Id=z.Id_wniosek)) as Imie, (SELECT Nazwisko FROM Uzytkownicy u WHERE Id=(SELECT Id_uzytkownika FROM WniosekWyjazdowy w WHERE w.Id=z.Id_wniosek)) as Nazwisko FROM ZgodaWniosekWyjazdowy z WHERE (Stan=1 OR Stan=2 OR Stan=3) AND (SELECT Ranga FROM Uzytkownicy u WHERE Id=(SELECT Id_uzytkownika FROM WniosekWyjazdowy w WHERE w.Id=z.Id_wniosek))<='" + req.session["Ranga"] + "'", func, [null, req, res]);
    }
    else
        res.render('index', { title: 'Express', year: new Date().getFullYear(), ver: version });
}
exports.oczekujace_polecenia = oczekujace_polecenia;
;
function pdf_polecenia(req, res) {
    var func = function (tab, req, res) {
        res.render('pdf/polecenie', {}, function (err, html) {
            if (html !== undefined) {
                if (tab.Polecenie_wyjazdu == 1) {
                    html = html.replace(/{polecenie_wyjazdu}/g, "X");
                    html = html.replace(/{podnoszenie_kwalifikacji}/g, " ");
                }
                else {
                    html = html.replace(/{polecenie_wyjazdu}/g, " ");
                    html = html.replace(/{podnoszenie_kwalifikacji}/g, "X");
                }
                html = html.replace(/{imienazwisko}/g, tab.Imie + " " + tab.Nazwisko);
                html = html.replace(/{stanowisko}/g, tab.Stanowisko);
                html = html.replace(/{miejsce}/g, tab.Miejscowosc + " " + tab.Kraj);
                html = html.replace(/{data_wyjazdu}/g, moment(tab.Data_wyjazdu).format("DD.MM"));
                html = html.replace(/{data_powrotu}/g, moment(tab.Data_powrotu).format("DD.MM.YYYY"));
                html = html.replace(/{cel}/g, tab.Cel);
                html = html.replace(/{zrodlo_finansowania}/g, tab.Zrodlo_finansowania);
                html = html.replace(/{srodek_lokomocji}/g, tab.Srodek_lokomocji);
                html = html.replace(/{data_wystawienia}/g, moment(tab.Data_wystawienia).format("DD.MM.YYYY"));
                html = html.replace(/{id_upowaznionej}/g, tab.Id_upowaznionej);
                if (tab.Podpis_dzial != null) {
                    html = html.replace(/{podpis_dzial}/g, tab.Podpis_dzial);
                    html = html.replace(/{data_dzial}/g, moment(tab.Data_dzial).format("DD.MM.YYYY"));
                }
                else {
                    html = html.replace(/{podpis_dzial}/g, " ");
                    html = html.replace(/{data_dzial}/g, " ");
                }
                html = html.replace(/{suma}/g, tab.Suma);
                html = html.replace(/{id}/g, tab.Id);
                html = html.replace(/{data}/g, moment(tab.Data_wyjazdu).format("DD.MM") + "-" + moment(tab.Data_powrotu).format("DD.MM.YYYY"));
                html = html.replace(/{suma_slownie}/g, "KONWERSJA SLOWNE");
                if (tab.Podpis_delegowany != null) {
                    html = html.replace(/{podpis_delegowany}/g, tab.Podpis_delegowany);
                    html = html.replace(/{data_delegowany}/g, moment(tab.Data_delegowany).format("DD.MM.YYYY"));
                }
                else {
                    html = html.replace(/{data_delegowany}/g, " ");
                    html = html.replace(/{podpis_delegowany}/g, " ");
                }
                if (tab.Id_podpis_zaliczka != null) {
                    html = html.replace(/{data_zaliczka}/g, moment(tab.Data_zaliczka).format("DD.MM.YYYY"));
                    html = html.replace(/{id_podpis_zaliczka}/g, tab.Id_podpis_zaliczka);
                }
                else {
                    html = html.replace(/{data_zaliczka}/g, " ");
                    html = html.replace(/{id_podpis_zaliczka}/g, " ");
                }
                pdfCrowdClient.convertHtml(html, pdfCrowd.sendHttpResponse(res));
            }
        });
    };
    var params = [null, req, res];
    mysql.selectQuery("SELECT z.*, w.Kraj, w.Miejscowosc, w.Data_wyjazdu, w.Data_powrotu, w.Cel, w.Srodek_lokomocji, w.Zrodlo_finansowania, w.Diety+w.Inne+w.Przejazd+w.Zakwaterowanie+w.Oplata_konferencyjna as Suma, u.Imie, u.Nazwisko, u.Stanowisko FROM ZgodaWniosekWyjazdowy z, WniosekWyjazdowy w, Uzytkownicy u WHERE z.Id='" + req.query.Id + "' AND z.Id_wniosek=w.Id AND w.Id_uzytkownika=u.Id", func, params);
}
exports.pdf_polecenia = pdf_polecenia;
;
function poleceniaRemove(req, res) {
    if (req.session["UsosLogin"] != null) {
        var func = function (tab, req, res) {
            for (var item in tab) {
                moment.locale('pl');
                tab[item].Data_wystawienia = moment(tab[item].Data_wystawienia.toISOString()).format("DD MMMM YYYY");
                if (tab[item].Polecenie_wyjazdu == 1)
                    tab.PolPod = "Polecenie wyjazdu";
                else
                    tab.PolPod = "Podnoszenie kwalifikacji";
            }
            res.render('zarzadzanie/oczekujace_polecenia', { year: new Date().getFullYear(), ver: version, rows: tab });
        };
        mysql.updateQuery("UPDATE WniosekWyjazdowy w SET Stan=3 WHERE w.Id=(SELECT Id_wniosek FROM ZgodaWniosekWyjazdowy z WHERE z.Id='" + req.query.Id + "')");
        mysql.deleteQuery("DELETE FROM ZgodaWniosekWyjazdowy WHERE Id='" + req.query.Id + "'");
        mysql.selectQueries("SELECT *, (SELECT Diety+Przejazd+Zakwaterowanie+Wyzywienie+Oplata_konferencyjna+Inne FROM WniosekWyjazdowy WHERE Id=z.Id_wniosek) as Suma, (SELECT Imie FROM Uzytkownicy u WHERE Id=(SELECT Id_uzytkownika FROM WniosekWyjazdowy w WHERE w.Id=z.Id_wniosek)) as Imie, (SELECT Nazwisko FROM Uzytkownicy u WHERE Id=(SELECT Id_uzytkownika FROM WniosekWyjazdowy w WHERE w.Id=z.Id_wniosek)) as Nazwisko FROM ZgodaWniosekWyjazdowy z WHERE (Stan=1 OR Stan=2 OR Stan=3) AND (SELECT Ranga FROM Uzytkownicy u WHERE Id=(SELECT Id_uzytkownika FROM WniosekWyjazdowy w WHERE w.Id=z.Id_wniosek))<='" + req.session["Ranga"] + "'", func, [null, req, res]);
    }
    else
        res.render('index', { title: 'Express', year: new Date().getFullYear(), ver: version });
}
exports.poleceniaRemove = poleceniaRemove;
;
function poleceniaAccept(req, res) {
    //if(req.session["Ranga"])
    var func = function (tab, req, res) {
        if (tab.UsosLogin != parseInt(req.session["UsosLogin"]) && parseInt(req.session["Ranga"]) >= tab.Ranga && parseInt(req.session["Ranga"]) >= 3 && tab.Id_podpis_zaliczka == null) {
            mysql.insertQuery("UPDATE ZgodaWniosekWyjazdowy SET Stan='2', Podpis_dzial='" + req.session["Podpis"] + "', Data_dzial=NOW() WHERE Id='" + req.query.Id + "'");
        }
        else if (tab.UsosLogin == parseInt(req.session["UsosLogin"]) && tab.Id_podpis_zaliczka != null && tab.Podpis_delegowany == null) {
            mysql.insertQuery("UPDATE ZgodaWniosekWyjazdowy SET Stan='3', Podpis_delegowany='" + req.session["Podpis"] + "', Data_delegowany=NOW() WHERE Id='" + req.query.Id + "'");
        }
        else if (tab.UsosLogin != parseInt(req.session["UsosLogin"]) && parseInt(req.session["Ranga"]) >= tab.Ranga && parseInt(req.session["Ranga"]) >= 3 && tab.Id_podpis_zaliczka != null && tab.Podpis_delegowany != null) {
            mysql.insertQuery("UPDATE ZgodaWniosekWyjazdowy SET Stan='4', Id_podpis_zaliczka='" + req.session["Podpis"] + "', Data_zaliczka=NOW() WHERE Id='" + req.query.Id + "'");
        }
        var func = function (tab, req, res) {
            for (var item in tab) {
                moment.locale('pl');
                tab[item].Data_wystawienia = moment(tab[item].Data_wystawienia.toISOString()).format("DD MMMM YYYY");
                if (tab[item].Polecenie_wyjazdu == 1)
                    tab.PolPod = "Polecenie wyjazdu";
                else
                    tab.PolPod = "Podnoszenie kwalifikacji";
            }
            res.render('zarzadzanie/oczekujace_polecenia', { year: new Date().getFullYear(), ver: version, rows: tab });
        };
        mysql.selectQueries("SELECT *, (SELECT Diety+Przejazd+Zakwaterowanie+Wyzywienie+Oplata_konferencyjna+Inne FROM WniosekWyjazdowy WHERE Id=z.Id_wniosek) as Suma, (SELECT Imie FROM Uzytkownicy u WHERE Id=(SELECT Id_uzytkownika FROM WniosekWyjazdowy w WHERE w.Id=z.Id_wniosek)) as Imie, (SELECT Nazwisko FROM Uzytkownicy u WHERE Id=(SELECT Id_uzytkownika FROM WniosekWyjazdowy w WHERE w.Id=z.Id_wniosek)) as Nazwisko FROM ZgodaWniosekWyjazdowy z WHERE (Stan=1 OR Stan=2 OR Stan=3) AND (SELECT Ranga FROM Uzytkownicy u WHERE Id=(SELECT Id_uzytkownika FROM WniosekWyjazdowy w WHERE w.Id=z.Id_wniosek))<='" + req.session["Ranga"] + "'", func, [null, req, res]);
    };
    var value = mysql.selectQuery("SELECT z.*, u.Ranga, u.UsosLogin FROM ZgodaWniosekWyjazdowy z, WniosekWyjazdowy w, Uzytkownicy u WHERE z.Id='" + req.query.Id + "' AND z.Id_wniosek=w.Id AND w.Id_uzytkownika=u.Id", func, [null, req, res]);
}
exports.poleceniaAccept = poleceniaAccept;
;
function poleceniaNew(req, res) {
    mysql.insertQuery("INSERT INTO ZgodaWniosekWyjazdowy VALUES (NULL, '" + req.query.Id + "', 1, 0, 1, NOW(), '" + req.session["Podpis"] + "', NULL, NULL, NULL, NULL, NULL, NULL)");
    mysql.insertQuery("UPDATE WniosekWyjazdowy SET Stan=4 WHERE Id='" + req.query.Id + "'");
    oczekujace_polecenia(req, res);
}
exports.poleceniaNew = poleceniaNew;
;
function moje_polecenia(req, res) {
    if (req.session["UsosLogin"] != null) {
        var func = function (tab, req, res) {
            for (var item in tab) {
                moment.locale('pl');
                tab[item].Data_wystawienia = moment(tab[item].Data_wystawienia.toISOString()).format("DD MMMM YYYY");
                if (tab[item].Polecenie_wyjazdu == 1)
                    tab[item].PolPod = "Polecenie wyjazdu";
                else
                    tab[item].PolPod = "Podnoszenie kwalifikacji";
            }
            res.render('zarzadzanie/oczekujace_polecenia', { year: new Date().getFullYear(), ver: version, rows: tab });
        };
        mysql.selectQueries("SELECT *, (SELECT Diety+Przejazd+Zakwaterowanie+Wyzywienie+Oplata_konferencyjna+Inne FROM WniosekWyjazdowy WHERE Id=z.Id_wniosek) as Suma FROM ZgodaWniosekWyjazdowy z WHERE z.Id_wniosek IN (SELECT Id FROM WniosekWyjazdowy WHERE Id_uzytkownika=(SELECT Id FROM Uzytkownicy WHERE UsosLogin='" + req.session["UsosLogin"] + "'))", func, [null, req, res]);
    }
    else
        res.render('index', { title: 'Express', year: new Date().getFullYear(), ver: version });
}
exports.moje_polecenia = moje_polecenia;
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
function moje_auta(req, res) {
    if (req.session["UsosLogin"] != null) {
        var func = function (tab, req, res) {
            res.render('moje/moje_auta', { title: 'Moje auta', year: new Date().getFullYear(), ver: version, message: 'Zobacz informacje związane z autami.', rows: tab, edit: false, editTab: null });
        };
        mysql.selectQueries("SELECT * FROM Pojazdy WHERE Wlasciciel_id=(SELECT Id FROM Uzytkownicy WHERE UsosLogin='" + req.session["UsosLogin"] + "')", func, [null, req, res]);
    }
    else
        res.render('index', { title: 'Express', year: new Date().getFullYear(), ver: version });
}
exports.moje_auta = moje_auta;
;
function moje_autaNew(req, res) {
    if (req.session["UsosLogin"] != null) {
        var func = function (tab, req, res) {
            res.render('moje/moje_auta', { title: 'Moje auta', year: new Date().getFullYear(), ver: version, message: 'Zobacz informacje związane z autami.', rows: tab, edit: false, editTab: null });
        };
        mysql.insertQuery("INSERT INTO Pojazdy VALUES (NULL, '" + req.body.Model + "', '" + req.body.Marka + "', '" + req.body.Numer + "', '" + req.body.Pojemnosc + "', (SELECT Id FROM Uzytkownicy WHERE UsosLogin='" + req.session["UsosLogin"] + "'))");
        mysql.selectQueries("SELECT * FROM Pojazdy WHERE Wlasciciel_id=(SELECT Id FROM Uzytkownicy WHERE UsosLogin='" + req.session["UsosLogin"] + "')", func, [null, req, res]);
    }
    else
        res.render('index', { title: 'Express', year: new Date().getFullYear(), ver: version });
}
exports.moje_autaNew = moje_autaNew;
;
function moje_autaRemove(req, res) {
    if (req.session["UsosLogin"] != null) {
        var func = function (tab, req, res) {
            res.render('moje/moje_auta', { title: 'Moje auta', year: new Date().getFullYear(), ver: version, message: 'Zobacz informacje związane z autami.', rows: tab, edit: false, editTab: null });
        };
        mysql.deleteQuery("DELETE FROM Pojazdy WHERE Id='" + req.query.Id + "'");
        mysql.selectQueries("SELECT * FROM Pojazdy WHERE Wlasciciel_id=(SELECT Id FROM Uzytkownicy WHERE UsosLogin='" + req.session["UsosLogin"] + "')", func, [null, req, res]);
    }
    else
        res.render('index', { title: 'Express', year: new Date().getFullYear(), ver: version });
}
exports.moje_autaRemove = moje_autaRemove;
;
function moje_autaEdit(req, res) {
    if (req.session["UsosLogin"] != null) {
        var func = function (tab, req, res) {
            var n;
            for (var i = 0; i < tab.length; i++)
                if (tab[i].Id == req.query.Id)
                    n = i;
            var editTab = tab[n];
            res.render('moje/moje_auta', { title: 'Moje auta', year: new Date().getFullYear(), ver: version, message: 'Zobacz informacje związane z autami.', rows: tab, edit: true, EditTab: editTab });
        };
        mysql.selectQueries("SELECT * FROM Pojazdy WHERE Wlasciciel_id=(SELECT Id FROM Uzytkownicy WHERE UsosLogin='" + req.session["UsosLogin"] + "')", func, [null, req, res]);
    }
    else
        res.render('index', { title: 'Express', year: new Date().getFullYear(), ver: version });
}
exports.moje_autaEdit = moje_autaEdit;
;
function moje_autaEditSave(req, res) {
    if (req.session["UsosLogin"] != null) {
        var func = function (tab, req, res) {
            res.render('moje/moje_auta', { title: 'Moje auta', year: new Date().getFullYear(), ver: version, message: 'Zobacz informacje związane z autami.', rows: tab, edit: false, editTab: null });
        };
        mysql.updateQuery("UPDATE Pojazdy SET Rodzaj='" + req.body.Model + "', Marka='" + req.body.Marka + "', Numer_rejestracyjny='" + req.body.Numer + "', Pojemnosc='" + req.body.Pojemnosc + "' WHERE Id='" + req.body.Id + "'");
        mysql.selectQueries("SELECT * FROM Pojazdy WHERE Wlasciciel_id=(SELECT Id FROM Uzytkownicy WHERE UsosLogin='" + req.session["UsosLogin"] + "')", func, [null, req, res]);
    }
    else
        res.render('index', { title: 'Express', year: new Date().getFullYear(), ver: version });
}
exports.moje_autaEditSave = moje_autaEditSave;
;
function moje_dane(req, res) {
    if (req.session["UsosLogin"] != null) {
        res.render('moje/moje_dane', { title: 'Moje dane', year: new Date().getFullYear(), ver: version, message: 'Zobacz informacje związane z danymi.' });
    }
    else
        res.render('index', { title: 'Express', year: new Date().getFullYear(), ver: version });
}
exports.moje_dane = moje_dane;
;
function moje_historia(req, res) {
    if (req.session["UsosLogin"] != null) {
        res.render('moje/moje_historia', { title: 'Moja Historia', year: new Date().getFullYear(), ver: version, message: 'Zobacz informacje związane z historia konta.' });
    }
    else
        res.render('index', { title: 'Express', year: new Date().getFullYear(), ver: version });
}
exports.moje_historia = moje_historia;
;
function moje_wnioski(req, res) {
    if (req.session["UsosLogin"] != null) {
        var func = function (tab, req, res) {
            for (var item in tab) {
                moment.locale('pl');
                tab[item].Data_wystawienia = moment(tab[item].Data_wystawienia.toISOString()).format("DD MMMM YYYY");
                tab[item].Data_wyjazdu = moment(tab[item].Data_wyjazdu.toISOString()).format("DD MMMM YYYY");
                tab[item].Data_powrotu = moment(tab[item].Data_powrotu.toISOString()).format("DD MMMM YYYY");
            }
            res.render('moje/moje_wnioski', { title: 'Moje wnioski', year: new Date().getFullYear(), ver: version, message: 'Zobacz informacje związane z wnioskami.', rows: tab });
        };
        mysql.selectQueries("SELECT * FROM WniosekWyjazdowy WHERE Id_uzytkownika=(SELECT Id FROM Uzytkownicy WHERE UsosLogin='" + req.session["UsosLogin"] + "')", func, [null, req, res]);
    }
    else
        res.render('index', { title: 'Express', year: new Date().getFullYear(), ver: version });
}
exports.moje_wnioski = moje_wnioski;
;
function pdf_zaliczka(req, res) {
    res.render('pdf/zaliczka', {}, function (err, html) {
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
    if (req.session["UsosLogin"] != null)
        res.render('logged', { title: 'Strefa Turbo Delegacji', year: new Date().getFullYear(), ver: version, message: 'Witamy ' + req.session["Imie"] + ' ' + req.session["Nazwisko"] + '!' });
    else
        res.render('index', { title: 'Express', year: new Date().getFullYear(), ver: version });
}
exports.logged = logged;
;
//# sourceMappingURL=index.js.map
import mysql = require('../mysqlHandler'); 
import express = require('express');
var version: string = "0.0.1";
var pdfCrowd = require('pdfcrowd');
var pdfCrowdClient = new pdfCrowd.Pdfcrowd('biedronka', 'c9225df149b2469749d20b34c928cdff');
var moment = require("moment");
export function index(req: express.Request, res: express.Response) {
    if (req.session["UsosLogin"] == null) {
        res.render('index', { title: 'Express', year: new Date().getFullYear(), ver: version });
    } else {
        res.render('logged', { title: 'Strefa Turbo Delegacji', year: new Date().getFullYear(), ver: version, message: 'Witamy ' + req.session["Imie"] + ' ' + req.session["Nazwisko"]+'!' });
    }
};

export function wniosek_wyjazdowy(req: express.Request, res: express.Response) {
    if (req.session["UsosLogin"] != null) 
        res.render('wniosek/wniosek_wyjazdowy', { title: 'Wniosek', year: new Date().getFullYear(), ver: version, message: 'Wypełnij wniosek o służbową delegację.' });
    else res.render('index', { title: 'Express', year: new Date().getFullYear(), ver: version });
};

export function wniosek_wyjazdowyNew(req: express.Request, res: express.Response) {
    var krajowy = (req.body.Kraj == "Polska") ? 1 : 0;
    mysql.insertQuery("INSERT INTO WniosekWyjazdowy VALUES (NULL, (SELECT Id FROM Uzytkownicy WHERE UsosLogin='" + req.session["UsosLogin"] + "'), '" + req.body.Cel + "', '" + req.body.Uzasadnienie + "', " +
        "'" + req.body.Osrodek + "', '" + req.body.Kraj + "', '" + req.body.Miejscowosc + "', STR_TO_DATE('" + req.body.Data_wyjazdu + "','%d-%m-%Y'), STR_TO_DATE('" + req.body.Data_powrotu + "','%d-%m-%Y'), " +
        "'" + req.body.Srodki_lokomocji + "', '" + req.body.Zrodlo_finansowania + "', '" + req.body.Diety + "', '" + req.body.Przejazd + "', '" + req.body.Zakwaterowanie + "', '" + req.body.Wyzywienie + "', " +
        "'" + req.body.Oplata_konferencyjna + "', '" + req.body.Inne + "', NOW(), NULL, NULL, NULL, '1', NULL, '" + krajowy + "')");
    moje_wnioski(req, res);
};

export function pdf_wyjazdowy(req: express.Request, res: express.Response) {
    var func = (tab: any, req: express.Request, res: express.Response) => {
        res.render('pdf/wyjazdowy', {},(err, html) => {
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

                html = html.replace(/{suma}/g,(tab.Diety+tab.Przejazd+tab.Zakwaterowanie+tab.Wyzywienie+tab.Oplata_konferencyjna+tab.Inne).toString());

                html = html.replace(/{data_wystawienia}/g, moment(tab.Data_wystawienia).format("DD MMMM YYYY"));
                html = html.replace(/{podpis_pracownika}/g, req.session["Podpis"]);

                if (tab.Id_kierownik_jednostki == null) html = html.replace(/{podpis_kierownik_jednostki}/g, " ");
                else html = html.replace(/{podpis_kierownik_jednostki}/g, tab.Id_kierownik_jednostki);

                if (tab.Id_decyzyjna == null) html = html.replace(/{podpis_decyzyjna}/g, " ");
                else html = html.replace(/{podpis_decyzyjna}/g, tab.Id_decyzyjna);

                if (tab.Id_przelozony == null) html = html.replace(/{podpis_przelozony}/g, " ");
                else html = html.replace(/{podpis_przelozony}/g, tab.Id_przelozony);

                if (tab.Id_kierownik_pracy == null) html = html.replace(/{podpis_kierownik_pracy}/g, " ");
                else html = html.replace(/{podpis_kierownik_pracy}/g, tab.Id_kierownik_pracy);

                pdfCrowdClient.convertHtml(html, pdfCrowd.sendHttpResponse(res));
            }
        });
    };
    var params = [null, req, res];
    mysql.selectQuery("SELECT * FROM WniosekWyjazdowy WHERE Id='" + req.query.Id + "'", func, params);
};
/*
 {cel_wyjazdu }
 {uzasadnienie }
{osrodek }
 {kraj }, { miejscowosc }
 {data_wyjazdu }
 {data_powrotu }
{srodek_lokomocji }
*/

export function wniosek_auto(req: express.Request, res: express.Response) {
    if (req.session["UsosLogin"] != null) 
    res.render('wniosek/wniosek_auto', { title: 'Wniosek Auto', year: new Date().getFullYear(), ver: version, message: 'Wypełnij wniosek o auto.' });
    else res.render('index', { title: 'Express', year: new Date().getFullYear(), ver: version });
};

export function pdf_auto(req: express.Request, res: express.Response) {
    res.render('pdf/auto', {}, (err, html) => {
        process.stdout.write(req.param("aaa", "fff"));
        pdfCrowdClient.convertHtml(html, pdfCrowd.sendHttpResponse(res));
    });
};

export function wniosek_zaliczka(req: express.Request, res: express.Response) {
    if (req.session["UsosLogin"] != null) 
        res.render('wniosek/wniosek_zaliczka', { title: 'Wniosek Zaliczka', year: new Date().getFullYear(), ver: version, message: 'Wypełnij wniosek o zaliczkę.' });
    else res.render('index', { title: 'Express', year: new Date().getFullYear(), ver: version });
};

export function moje_auta(req: express.Request, res: express.Response) {
    if (req.session["UsosLogin"] != null) {
        var func = (tab: any, req: express.Request, res: express.Response) => {
            res.render('moje/moje_auta', { title: 'Moje auta', year: new Date().getFullYear(), ver: version, message: 'Zobacz informacje związane z autami.' , rows: tab, edit: false, editTab: null});
        }
        mysql.selectQueries("SELECT * FROM Pojazdy WHERE Wlasciciel_id=(SELECT Id FROM Uzytkownicy WHERE UsosLogin='" + req.session["UsosLogin"] + "')", func, [null, req, res]);
    } else res.render('index', { title: 'Express', year: new Date().getFullYear(), ver: version });
};

export function moje_autaNew(req: express.Request, res: express.Response) {
    if (req.session["UsosLogin"] != null) {
        var func = (tab: any, req: express.Request, res: express.Response) => {
            res.render('moje/moje_auta', { title: 'Moje auta', year: new Date().getFullYear(), ver: version, message: 'Zobacz informacje związane z autami.', rows: tab, edit: false, editTab: null });
        }
        mysql.insertQuery("INSERT INTO Pojazdy VALUES (NULL, '" + req.body.Model + "', '" + req.body.Marka + "', '" + req.body.Numer + "', '" + req.body.Pojemnosc + "', (SELECT Id FROM Uzytkownicy WHERE UsosLogin='"+req.session["UsosLogin"]+"'))");
        mysql.selectQueries("SELECT * FROM Pojazdy WHERE Wlasciciel_id=(SELECT Id FROM Uzytkownicy WHERE UsosLogin='" + req.session["UsosLogin"] + "')", func, [null, req, res]);
    } else res.render('index', { title: 'Express', year: new Date().getFullYear(), ver: version });
};

export function moje_autaRemove(req: express.Request, res: express.Response) {
    if (req.session["UsosLogin"] != null) {
        var func = (tab: any, req: express.Request, res: express.Response) => {
            res.render('moje/moje_auta', { title: 'Moje auta', year: new Date().getFullYear(), ver: version, message: 'Zobacz informacje związane z autami.', rows: tab, edit: false, editTab: null });
        }
        mysql.deleteQuery("DELETE FROM Pojazdy WHERE Id='"+req.query.Id+"'");
        mysql.selectQueries("SELECT * FROM Pojazdy WHERE Wlasciciel_id=(SELECT Id FROM Uzytkownicy WHERE UsosLogin='" + req.session["UsosLogin"] + "')", func, [null, req, res]);
    } else res.render('index', { title: 'Express', year: new Date().getFullYear(), ver: version });
};

export function moje_autaEdit(req: express.Request, res: express.Response) {
    if (req.session["UsosLogin"] != null) {
        var func = (tab: any, req: express.Request, res: express.Response) => {
            var n;
            for (var i = 0; i < tab.length; i++)
                if (tab[i].Id == req.query.Id) n = i;
            var editTab = tab[n];
            res.render('moje/moje_auta', { title: 'Moje auta', year: new Date().getFullYear(), ver: version, message: 'Zobacz informacje związane z autami.', rows: tab, edit: true, EditTab: editTab });
        }
        mysql.selectQueries("SELECT * FROM Pojazdy WHERE Wlasciciel_id=(SELECT Id FROM Uzytkownicy WHERE UsosLogin='" + req.session["UsosLogin"] + "')", func, [null, req, res]);
    } else res.render('index', { title: 'Express', year: new Date().getFullYear(), ver: version });
};


export function moje_autaEditSave(req: express.Request, res: express.Response) {
    if (req.session["UsosLogin"] != null) {
        var func = (tab: any, req: express.Request, res: express.Response) => {
            res.render('moje/moje_auta', { title: 'Moje auta', year: new Date().getFullYear(), ver: version, message: 'Zobacz informacje związane z autami.', rows: tab, edit: false, editTab: null });
        }
        mysql.updateQuery("UPDATE Pojazdy SET Rodzaj='"+req.body.Model+"', Marka='"+req.body.Marka+"', Numer_rejestracyjny='"+req.body.Numer+"', Pojemnosc='"+req.body.Pojemnosc+"' WHERE Id='"+req.body.Id+"'");
        mysql.selectQueries("SELECT * FROM Pojazdy WHERE Wlasciciel_id=(SELECT Id FROM Uzytkownicy WHERE UsosLogin='" + req.session["UsosLogin"] + "')", func, [null, req, res]);
    } else res.render('index', { title: 'Express', year: new Date().getFullYear(), ver: version });
};


export function moje_dane(req: express.Request, res: express.Response) {
    if (req.session["UsosLogin"] != null) {

        res.render('moje/moje_dane', { title: 'Moje dane', year: new Date().getFullYear(), ver: version, message: 'Zobacz informacje związane z danymi.' });
    } else res.render('index', { title: 'Express', year: new Date().getFullYear(), ver: version });
};

export function moje_historia(req: express.Request, res: express.Response) {
    if (req.session["UsosLogin"] != null) {

        res.render('moje/moje_historia', { title: 'Moja Historia', year: new Date().getFullYear(), ver: version, message: 'Zobacz informacje związane z historia konta.' });
    } else res.render('index', { title: 'Express', year: new Date().getFullYear(), ver: version });
};

export function moje_wnioski(req: express.Request, res: express.Response) {
    if (req.session["UsosLogin"] != null) {
        var func = (tab: any, req: express.Request, res: express.Response) => {
            for (var item in tab) {
                moment.locale('pl');
                tab[item].Data_wystawienia = moment(tab[item].Data_wystawienia.toISOString()).format("DD MMMM YYYY");
                tab[item].Data_wyjazdu = moment(tab[item].Data_wyjazdu.toISOString()).format("DD MMMM YYYY");
                tab[item].Data_powrotu = moment(tab[item].Data_powrotu.toISOString()).format("DD MMMM YYYY");
            }
            res.render('moje/moje_wnioski', { title: 'Moje wnioski', year: new Date().getFullYear(), ver: version, message: 'Zobacz informacje związane z wnioskami.', rows: tab});
        }
        mysql.selectQueries("SELECT * FROM WniosekWyjazdowy WHERE Id_uzytkownika=(SELECT Id FROM Uzytkownicy WHERE UsosLogin='" + req.session["UsosLogin"] + "')", func, [null, req, res]);
    } else res.render('index', { title: 'Express', year: new Date().getFullYear(), ver: version });
};

export function pdf_zaliczka(req: express.Request, res: express.Response) {
    res.render('pdf/zaliczka', {}, (err, html) => {
        html = html.replace(/{miejscowosc}/g, req.query.miejscowosc);
        html = html.replace(/{terminwyjazdu}/g, req.query.terminwyjazdu);
        html = html.replace(/{terminpowrotu}/g, req.query.terminpowrotu);
        html = html.replace(/{[a-z]+}/g, ""); //wyczyść resztę pól
        //html = html.replace(/{ilosc}/g, req.query.ilosc);
        //html = html.replace(/{naleznosc}/g, req.query.naleznosc);
        //html = html.replace(/{wartosc}/g, req.query.wartosc);




        pdfCrowdClient.convertHtml(html, pdfCrowd.sendHttpResponse(res));
    });
};

export function wniosek_auto_przebieg(req: express.Request, res: express.Response) {
    if (req.session["UsosLogin"] != null) 
        res.render('wniosek/wniosek_auto_przebieg', { title: 'Przebieg auta', year: new Date().getFullYear(), ver: version, message: 'Wypełnij przebieg auta.' });
    else res.render('index', { title: 'Express', year: new Date().getFullYear(), ver: version });
};

export function pdf_przebieg(req: express.Request, res: express.Response) {
    res.render('pdf/przebieg', {}, (err, html) => {
        pdfCrowdClient.convertHtml(html, pdfCrowd.sendHttpResponse(res));
    });
};

export function wniosek_potwierdzenie(req: express.Request, res: express.Response) {
    if (req.session["UsosLogin"] != null) 
        res.render('wniosek/wniosek_potwierdzenie', { title: 'Potwierdzenie wyjazdu', year: new Date().getFullYear(), ver: version, message: 'Wystaw oświadczenie.' });
    else res.render('index', { title: 'Express', year: new Date().getFullYear(), ver: version });
};

export function pdf_potwierdzenie(req: express.Request, res: express.Response) {
    res.render('pdf/potwierdzenie', {}, (err, html) => {
        pdfCrowdClient.convertHtml(html, pdfCrowd.sendHttpResponse(res));
    });
};


export function contact(req: express.Request, res: express.Response) {
    res.render('contact', { title: 'Kontakt', year: new Date().getFullYear(), ver: version, message: 'Gdzie nas można złapać?' });
};

export function about(req: express.Request, res: express.Response) {
    res.render('about', { title: 'O nas', year: new Date().getFullYear(), ver: version, message: 'Trochę o nas!' });
};

export function logged(req: express.Request, res: express.Response) {
    if (req.session["UsosLogin"] != null) 
        res.render('logged', { title: 'Strefa Turbo Delegacji', year: new Date().getFullYear(), ver: version, message: 'Witamy ' + req.session["Imie"] + ' ' + req.session["Nazwisko"] + '!' });
    else res.render('index', { title: 'Express', year: new Date().getFullYear(), ver: version });
};
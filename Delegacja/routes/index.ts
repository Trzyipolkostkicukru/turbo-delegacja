/*
 * GET home page.
 */
import express = require('express');
var version: string = "0.0.1";
var pdfCrowd = require('pdfcrowd');
var pdfCrowdClient = new pdfCrowd.Pdfcrowd('biedronka', 'c9225df149b2469749d20b34c928cdff');
import session = require('../sessionHandler');
export function index(req: express.Request, res: express.Response) {
    console.log(req);
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

export function pdf_wyjazdowy(req: express.Request, res: express.Response) {
    res.render('pdf/wyjazdowy', {}, (err, html) => {
        pdfCrowdClient.convertHtml(html, pdfCrowd.sendHttpResponse(res));
        });
};

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

export function pdf_zaliczka(req: express.Request, res: express.Response) {
    res.render('pdf/zaliczka', {}, (err, html) => {
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
    console.log(req);
    if (req.session["UsosLogin"] != null) 
        res.render('logged', { title: 'Strefa Turbo Delegacji', year: new Date().getFullYear(), ver: version, message: 'Witamy ' + req.session["Imie"] + ' ' + req.session["Nazwisko"] + '!' });
    else res.render('index', { title: 'Express', year: new Date().getFullYear(), ver: version });
};
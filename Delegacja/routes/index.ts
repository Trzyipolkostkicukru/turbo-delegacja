/*
 * GET home page.
 */
import express = require('express');
var version: string = "0.0.1";
export function index(req: express.Request, res: express.Response) {
    res.render('index', { title: 'Express', year: new Date().getFullYear(), ver: version });
};

export function wniosek(req: express.Request, res: express.Response) {
    res.render('wniosek', { title: 'Wniosek', year: new Date().getFullYear(), ver: version, message: 'Wypełnij wniosek o służbową delegację.' });
};

export function contact(req: express.Request, res: express.Response) {
    res.render('contact', { title: 'Kontakt', year: new Date().getFullYear(), ver: version, message: 'Gdzie nas można złapać?' });
};

export function about(req: express.Request, res: express.Response) {
    res.render('about', { title: 'O nas', year: new Date().getFullYear(), ver: version, message: 'Trochę o nas!' });
};

export function logged(req: express.Request, res: express.Response) {
    res.render('logged', { title: 'Strefa Turbo Delegacji', year: new Date().getFullYear(), ver: version, message: 'Witamy!' });
};

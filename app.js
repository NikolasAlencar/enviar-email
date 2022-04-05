"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const mail_1 = require("./mail");
class App {
    constructor() {
        this.app = express();
        this.app.use(bodyParser.json());
        this.routes();
    }
    routes() {
        this.app.use((_req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "PUT");
            res.header("Access-Control-Allow-Headers", "Content-Type, x-requested-with");
            next();
        })
        this.app.route("/").get((req, res) => {
            res.send({ 'result': 'version 0.0.2' });
        });
        this.app.route("/").post((req, res) => {
            const message = Object.assign({}, req.body);
            mail_1.default.to = message.to;
            mail_1.default.subject = message.subject;
            mail_1.default.message = message.message;
            let result = mail_1.default.sendMail();
            res.status(200).json({ 'result': result });
        });
    }
}
exports.default = new App();

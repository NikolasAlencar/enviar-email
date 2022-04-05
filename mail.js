const nodemailer = require("nodemailer");
const configs_1 = require("./configs");
class Mail {
    constructor(corpo) {
        const corpoEmail = {...corpo}
        this.to = corpoEmail.to;
        this.subject = corpoEmail.subject;
        this.message = corpoEmail.message;
    }
    sendMail() {
        let mailOptions = {
            from: "backofficewallet@gmail.com",
            to: this.to,
            subject: this.subject,
            html: this.message
        };
        const transporter = nodemailer.createTransport({
            host: configs_1.default.host,
            port: configs_1.default.port,
            secure: false,
            auth: {
                user: configs_1.default.user,
                pass: configs_1.default.password
            },
            tls: { rejectUnauthorized: false }
        });
        console.log(mailOptions);
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return error;
            }
            else {
                return "E-mail enviado com sucesso!";
            }
        });
    }
}
exports.default = new Mail;

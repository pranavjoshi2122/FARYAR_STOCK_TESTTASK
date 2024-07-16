const userService = require("../user_service");
const nodemailer = require('nodemailer');


module.exports = {

    async signUp(req, res) {
        try {
            const { email, password } = req.body;
            const user = await userService.addUser(email, password);
            return res.status(201).json(user);

        } catch (error) {
            res.status(401).json({ error: error.message });

        }
    },

    async signIn(req, res) {
        try {
            const { email, password } = req.body;
            const user = await userService.authenticate(email, password);
            res.json(user);


        } catch (error) {
            res.status(401).json({ error: error.message });

        }
    },
    
    async sendEmail(req, res) {
        try {

            // Create a transporter object
            const transporter = nodemailer.createTransport({
                host: 'live.smtp.mailtrap.io',
                port: 587,
                secure: false, // use SSL
                auth: {
                    user: '1a2b3c4d5e6f7g',
                    pass: '1a2b3c4d5e6f7g',
                }
            });

            // Configure the mailoptions object
            const mailOptions = {
                from: 'yourusername@email.com',
                to: req.body.email,
                subject: req.body.subject,
                text: req.body.message,
            };

            // Send the email
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log('Error:', error);
                } else {
                    console.log('Email sent:', info.response);
                }
            });

        } catch (error) {
            res.status(401).json({ error: err.message });

        }
    }
}
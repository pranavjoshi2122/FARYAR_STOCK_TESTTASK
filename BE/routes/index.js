const authController = require('../controller/authController');

module.exports = (app) => {
    app.route('/signup').post(authController.signUp);
    app.route('/signin').post(authController.signIn);
    app.route('/sendmail').post(authController.sendEmail);
}  
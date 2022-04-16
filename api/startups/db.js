const mongoose = require('mongoose');
require('dotenv').config();

module.exports = function () {
    if (process.env.APP_ENVIRONMENT === "development") {
        mongoose.connect('mongodb://localhost:27017/CanCanEducationCenter')
            .then(() => console.log('connected to mongodb://localhost:27017/CanCanEducationCenter...'))
    }
}
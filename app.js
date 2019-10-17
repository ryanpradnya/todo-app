//Packages
const express = require('express');
const bodyParser = require('body-parser');

const db = require('./util/Database');

//Routes
const authRoute = require('./routes/AuthRoute');
const todoRoute = require('./routes/TodoRoute');

const app = express();

app.use(bodyParser.json())

app.use('/api/auth', authRoute);
app.use('/api/todo', todoRoute);

//Error Handling
app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

db.sequelize
    .sync()
    .then(result => {
        console.log("CONNECTED");
        app.listen(8080);
    })
    .catch(err => {
        console.log(err)
    });

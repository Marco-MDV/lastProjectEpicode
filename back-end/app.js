const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
const error = require('./middleware/globalError')
const mongoose = require('mongoose')
const registration = require('./routes/registration')
const card = require('./routes/card')
const moneyManagement = require('./routes/moneyManagement')
const login = require('./routes/login')
const counterOfUsers = require('./routes/counterOfUsers')
const google = require('./routes/google')
const decodeToken = require('./routes/decodeToken')
const action = require('./routes/action')
const imgUser = require('./routes/imgUser')
const history = require('./routes/history')
app.use(cors())
require('dotenv').config();

mongoose.connect(process.env.DB_URL)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'DB connection error!'))
db.once('open', () => { console.log('db connected successfully') })

app.use(express.json())
app.use('/', registration)
app.use('/', card)
app.use('/', moneyManagement)
app.use('/', login)
app.use('/', counterOfUsers)
app.use('/', google)
app.use('/', decodeToken)
app.use('/', action)
app.use('/', imgUser)
app.use('/', history)
app.use(error)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


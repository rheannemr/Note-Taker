const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));


require('./routes/api-routes.js')(app);
require('./routes/html-routes.js')(app);

app.listen(PORT, function() {
    console.log('App listening on PORT: ' + PORT);
});
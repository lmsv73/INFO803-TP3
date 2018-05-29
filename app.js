var Express = require('express');

//------------------------------------------------------------
// CONFIGURATION DU FRAMEWORK
//------------------------------------------------------------

var app = Express();
app.use("/public/stylesheets", Express.static(__dirname + '/public/stylesheets'));
app.use("/public/javascripts", Express.static(__dirname + '/public/javascripts'));
app.use("/public/images", Express.static(__dirname + '/public/images'));
app.use("/views", Express.static(__dirname + '/views'));

/**
 * Affichage de la page login
 */
app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(__dirname + '/views/index.html');
});

app.use(function (req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
});

var http = require('http').Server(app);

http.listen(80);
var express = require('express');
const index = require('./routes/index');
const sos = require('./routes/sos-routes');

var port = process.env.PORT || 9001; // process.env.PORT for heroku or online node server. this line does not effect the application.
var app = express();
app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/', index);
app.use('/api', sos);

app.use('*',function (req, res) {
    res.redirect('/');
});

app.listen(port, function(){
    console.log("Server running on localhost:" + port);
})
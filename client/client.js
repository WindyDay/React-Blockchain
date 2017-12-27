
var express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(__dirname + '/public'));
app.engine('html', require('ejs').renderFile);


//console.log(__dirname);
app.listen(3000, () => console.log('Client started on port 3000!'))

app.get('/', (req, res) => res.render('index.html'));


// app.get('/SignUp_Login', (req, res) => res.render('SignUp_Login.html'));
app.get('/SignUp_Login', function(req, res) {
    res.render('SignUp_Login.html');
});

app.get('/registrationlogin_form.html', function(req, res) {
    res.locals.mainContent = {mainContent: 'xczxc'};
    res.render('index.html');
});
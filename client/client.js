var express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(__dirname + '/public'));
app.engine('html', require('ejs').renderFile);


//console.log(__dirname);

app.listen(3000, () => console.log('Client started'))

app.get('/', (req, res) => res.render('index.html'));

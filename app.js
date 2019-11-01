const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({entended: true}));

const session = require('express-session');
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))


app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views'); 



app.get('/', (req, res) => {
    res.render("index");
});

app.post('/result', (req, res) => {
    req.session.results = req.body;
    console.log(req.session);
    res.redirect("/result");
});

app.get('/result', (req, res) => {
    res.render("result", {results: req.session.results});
});





app.listen(8000, () => console.log("listening on port 8000"));

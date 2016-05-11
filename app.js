var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    router = express.Router(),
    app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* Routing for single page of app. */
router.get('/', function (req, res) {
    res.render('vanilla', {title: 'Monopoly Game Filter - Vanilla Javascript'});
});

router.get('/react', function (req, res) {
    res.render('react', {title: 'Monopoly Game Filter - React'});
});

app.use('/', router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
app.use(function (err, req, res, next) {
    res.sendStatus(err.status || 500)
});


module.exports = app;

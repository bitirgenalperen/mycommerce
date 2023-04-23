const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate');
const ErrorHandler = require('./utils/ErrorHandler');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const passportLocal = require('passport-local');


dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_DB_URI = process.env.MONGO_DB_URI;

const Item = require("./models/item");
const Review = require("./models/review");
const User = require("./models/user");

const itemsRoutes = require('./routes/items');
const reviewsRoutes = require('./routes/reviews');
const authRoutes = require('./routes/auth');

mongoose.connect(MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log(`mongoDB connected!`);
})
.catch((err) => {
    console.error(err.message);
});

app.engine('ejs', ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')));

const sessionConfig = {
    secret: process.env.SS,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000*3600,
        age: 1000*3600
    }
};
app.use(session(sessionConfig));
app.use(flash())

app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    console.log(req.session)
    res.locals.activeUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/', authRoutes);
app.use('/items', itemsRoutes);
app.use('/items/:itemId/reviews', reviewsRoutes);


app.get('/', (req, res) => {
    res.redirect('/items');
})

app.all('*', (req, res, next) => {
    next(new ErrorHandler('Page Couldnot Be Reached!', 404));
})

// error handling mesajlarını guncelle => yeni bir sayfa olustur
app.use((err, req, res, next) => {
    const {message = "Invalid Request", status = 405} = err;
    res.status(status).render('utils/error', {status, message});
})


app.listen(3000, () => {
    console.log(`Listening on PORT ${PORT}`);
})







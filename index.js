const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require('method-override')
const morgan = require("morgan");
const ejsMate = require('ejs-mate');
const ErrorHandler = require('./utils/ErrorHandler');
const AsyncWrapper = require('./utils/AsyncWrapper');

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_DB_URI = process.env.MONGO_DB_URI;

const Item = require("./models/item");
const Review = require("./models/review");


const items = require('./routes/items');
const reviews = require('./routes/reviews');

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

app.use('/items', items);
app.use('/items/:itemId/reviews', reviews);

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







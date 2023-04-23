const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require('method-override')
const morgan = require("morgan");
const ejsMate = require('ejs-mate');

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_DB_URI = process.env.MONGO_DB_URI;

const Item = require("./models/item");
const Review = require("./models/review");


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

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

app.get('/', (req, res) => {
    res.redirect('/items');
})

app.get('/items', async (req, res) => {
    let {article} = req.query;
    if(article){
        const items = await Item.find({article});
        article = capitalizeFirstLetter(article);
        res.render('items/index', {items, article});
    }else{
        const items = await Item.find({});
        res.render('items/index', {items, article: "All"});
    }
    
})

app.get("/items/new", (req, res) => {
    res.render('items/new');
    
})

app.post('/items', async (req, res) => {
    const {name, description, article, price, image} = req.body;
    // console.log(name, description, article, price, image);
    const newItem = new Item({name, description, article, price, image});
    await newItem.save();
    res.redirect(`/items/${newItem._id}/edit`);
})

app.get('/items/:id', async (req, res) => {
    const {id} = req.params;
    const item = await Item.findById(id).populate('reviews');
    res.render('items/show', {item});
})

app.get('/items/:id/edit', async (req, res) => {
    const {id} = req.params;
    const item = await Item.findById(id);
    res.render('items/edit', {item});
})

// category değişimine uyum saglayacak degisiklikleri yap!
app.put('/items/:id', async (req, res) => {
    const {id} = req.params;
    const item = await Item.findByIdAndUpdate(id, req.body, {runValidators:true});
    res.redirect(`/items/${item._id}`);
})

app.delete('/items/:id', async (req, res) => {
    const {id} = req.params;
    await Item.findByIdAndDelete(id);
    res.redirect('/items');
})

// catch async function ekle
// add a review
app.post('/items/:id/reviews', async (req, res) => {
    const {id} = req.params;
    const item = await Item.findById(id);
    const {content, rating} = req.body;
    const review = new Review({content, rating});
    item.reviews.push(review);
    await review.save();
    await item.save();
    res.redirect(`/items/${id}`);
})

app.get('/items/:itemId/reviews/:reviewId/edit', async (req, res) => {
    const {itemId, reviewId} = req.params;
    const review = await Review.findById(reviewId );
    res.render('reviews/edit', {review, itemId});
})

app.put('/items/:itemId/reviews/:reviewId', async (req, res) => {
    const {itemId, reviewId} = req.params;
    const review = await Review.findByIdAndUpdate(reviewId, req.body, {runValidators:true});
    res.redirect(`/items/${itemId}`);
})

// delete the review
app.delete('/items/:itemId/reviews/:reviewId', async (req, res) => {
    const {itemId, reviewId} = req.params;
    await Item.findByIdAndUpdate(itemId, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/items/${itemId}`);
})

// error handling mesajlarını guncelle => yeni bir sayfa olustur
app.use((req, res) => {
    res.status(404).send("NOT FOUND");
})


app.listen(3000, () => {
    console.log(`Listening on PORT ${PORT}`);
})







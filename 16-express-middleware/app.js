const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const app = express();
const port = 3000;

// gunakan ejs
app.set('view engine', 'ejs');

// third-party middleware
app.use(expressLayouts);
app.use(morgan('dev'));

// built-in middleware
app.use(express.static('public'));

// application-level middleware
app.use((req, res, next) => {
    console.log('Time : ' + Date.now());
    next();
});

app.get('/', (req, res) => {
    const nama = 'joko riyadi';
    const mahasiswa = [
        {
            nama: 'riyadi',
            jurusan: 'teknik informatika',
            semester: '10'
        }, {
            nama: 'joko',
            jurusan: 'teknik informatika',
            semester: '10'
        }
    ]
    const title = "Halaman Home";
    const menu = "home";
    const layout = 'layouts/mainLayout';
    res.render('index', { nama, mahasiswa, title, menu, title, layout });
});

app.get('/product/:id/category/:categoryId', (req, res) => {
    // url: http://localhost:3000/product/1/category/12?produk=sepatu
    const id = req.params.id;
    const categoryId = req.params.categoryId;
    const namaProduk = req.query.produk;
    res.send(`product id : ${id} <br> category id: ${categoryId} <br> produk: ${namaProduk}`);
});

app.get('/about', (req, res) => {
    const title = "Halaman About";
    const menu = "about";
    const layout = 'layouts/mainLayout';
    res.render('about',
        { title, menu, layout });
});

app.get('/contact', (req, res) => {
    const title = "Halaman Contact";
    const menu = "contact";
    const layout = 'layouts/mainLayout';
    res.render('contact', { title, menu, layout });
});

app.use('/', (req, res) => {
    res.status(404);
    res.send('<h1>404 not found!</h1>');
});
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
});
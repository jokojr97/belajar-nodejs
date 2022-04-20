const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    // respon berupa plain text
    // res.send('Hello World!')

    // respon berupa json
    // res.json([{
    //     nama: 'joko',
    //     email: 'joko@gmail.com',
    //     nohp: '08221224322'
    // }, {
    //     nama: 'joko',
    //     email: 'joko@gmail.com',
    //     nohp: '08221224322'
    // }]);

    // respon berupa file
    res.sendFile('./index.html', { root: __dirname });
});

app.get('/product/:id/category/:categoryId', (req, res) => {
    // url: http://localhost:3000/product/1/category/12?produk=sepatu
    const id = req.params.id;
    const categoryId = req.params.categoryId;
    const namaProduk = req.query.produk;
    res.send(`product id : ${id} <br> category id: ${categoryId} <br> produk: ${namaProduk}`);
});

app.get('/about', (req, res) => {
    // res.send('Hello World! halaman about')
    res.sendFile('./about.html', { root: __dirname });

});

app.get('/contact', (req, res) => {
    // res.send('Hello World! halaman contact')
    res.sendFile('./contact.html', { root: __dirname });

});

app.use('/', (req, res) => {
    res.status(404);
    res.send('<h1>404 not found!</h1>');
});
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
});
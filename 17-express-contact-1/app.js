const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const contacts = require('./contacts')
const app = express();
const port = 3000;

// gunakan ejs
app.set('view engine', 'ejs');

// third-party middleware
app.use(expressLayouts);

// built-in middleware
app.use(express.static('public'));

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

app.get('/about', (req, res) => {
    const title = "Halaman About";
    const menu = "about";
    const layout = 'layouts/mainLayout';
    res.render('about',
        { title, menu, layout });
});

app.get('/contact', async (req, res) => {
    const title = "Halaman Contact";
    const menu = "contact";
    const layout = 'layouts/mainLayout';
    const contactList = await contacts.loadContacts();
    // console.log(contactList);
    res.render('contact', { title, menu, layout, contactList });
});

app.get('/contact/:nama', async (req, res) => {
    const title = "Halaman Contact";
    const menu = "contact";
    const nama = req.params.nama;
    const layout = 'layouts/mainLayout';
    const contact = await contacts.detailContact(nama);
    // console.log(contact);
    res.render('detailcontact', { title, menu, layout, contact });
});

app.use('/', (req, res) => {
    res.status(404);
    res.send('<h1>404 not found!</h1>');
});
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
});
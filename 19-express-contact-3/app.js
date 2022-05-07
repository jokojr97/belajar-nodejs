const { urlencoded } = require('express');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const cookiePharser = require('cookie-parser');
const flash = require('connect-flash');

const contacts = require('./contacts')
const app = express();
const port = 3000;

// konfigurasi flash
app.use(cookiePharser('secret'));
app.use(session({
    cookie: { maxAge: 6000 },
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));
app.use(flash());


// gunakan ejs
app.set('view engine', 'ejs');

// third-party middleware
app.use(expressLayouts);
app.use(urlencoded())
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
    const msg = req.flash('msg');
    const msghps = req.flash('msghps');
    console.log(msg.length);
    res.render('contact', { title, menu, layout, contactList, msg, msghps });
});
app.post('/contact', async (req, res) => {
    const hasil = req.body;
    // res.send(hasil);
    console.log(hasil);
    await contacts.simpanContact(hasil.name, hasil.email, hasil.nohp);
    // res.render('contact', { title, menu, layout, contactList });
    req.flash('msg', 'Data Kontak Berhasil Ditambahkan');
    res.redirect('/contact');
});

app.get('/addcontact', async (req, res) => {
    const title = "Halaman Tambah Contact";
    const menu = "contact";
    const layout = 'layouts/mainLayout';
    const contactList = await contacts.loadContacts();
    // console.log(contactList);
    res.render('addcontact', { title, menu, layout, contactList });
});


app.get('/contact/delete/:nama', async (req, res) => {
    const nama = req.params.nama;
    await contacts.deleteContact(nama);
    req.flash('msghps', 'Data Kontak Berhasil Hapus');
    res.redirect('/contact');

    // console.log(contactList);
    // res.render('addcontact', { title, menu, layout, contactList });
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
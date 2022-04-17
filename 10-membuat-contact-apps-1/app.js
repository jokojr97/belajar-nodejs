// core modules

const contacts = require('./contacts');

const main = async () => {
    const nama = await contacts.questions("masukkan nama anda: ");
    const email = await contacts.questions("masukkan email anda: ");
    const nohp = await contacts.questions("masukkan nomor hp anda: ");

    contacts.simpanContact(nama, email, nohp);
}

main();

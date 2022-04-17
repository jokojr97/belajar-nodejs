// core modules

const contacts = require('./contacts');

const main = async () => {
    const pertanyaan1 = "masukkan nama anda: ";
    const pertanyaan2 = "masukkan email anda: ";
    const pertanyaan3 = "masukkan nomor hp anda: ";
    const nama = await contacts.questions(pertanyaan1);
    const email = await contacts.questions(pertanyaan2);
    const nohp = await contacts.questions(pertanyaan3);

    contacts.simpanContact(nama, email, nohp);
}

main();

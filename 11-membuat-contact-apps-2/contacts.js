// core modules

const fs = require('fs');
const validator = require('validator');

const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

const jsonPath = "./data/contacts.json";
if (!fs.existsSync(jsonPath)) {
    fs.writeFileSync(jsonPath, "[]", "utf-8");
}

const simpanContact = (nama, email, nohp) => {
    const datajson = { nama, email, nohp };
    fs.readFile('data/contacts.json', 'utf-8', (e, data) => {
        if (e) throw e;
        const contacts = JSON.parse(data);
        // console.log(datajson);

        // cek duplikat
        const duplikat = contacts.find((contact) => contact.nama === nama);
        if (duplikat) {
            console.log("contact sudah terdaftar, gunakan nama lain!");
            return false;
        }

        // validator email
        if (email) {
            if (!validator.isEmail(email)) {
                console.log("Format Email Salah!");
                return false;
            }
        }

        // cek no hp
        if (nohp) {
            if (!validator.isMobilePhone(nohp, 'id-ID')) {
                console.log("nomor hp tidak valid")
                return false;
            }
        }

        contacts.push(datajson);
        fs.writeFile('data/contacts.json', JSON.stringify(contacts), (e) => {
            if (e) throw e;
            console.log("Terima Kasih telah input data!");
        });
    });
}

module.exports = { simpanContact };
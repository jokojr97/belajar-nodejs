// core modules

const fs = require('fs');
const { resolve } = require('path');
const validator = require('validator');

// cek apakah ada direktori
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

// cek apakah ada file contacts.json
const jsonPath = "./data/contacts.json";
if (!fs.existsSync(jsonPath)) {
    fs.writeFileSync(jsonPath, "[]", "utf-8");
}

// promise function loadContacts
const loadContacts = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('data/contacts.json', 'utf-8', (e, data) => {
            if (e) reject(e);
            const contacts = JSON.parse(data);
            resolve(contacts);
        })
    })
}

// promise function detailkontak
const detailContact = (nama) => {
    return new Promise(async (resolve, reject) => {
        const contacts = await loadContacts();
        const contact = contacts.find((cont) =>
            cont.nama.toLowerCase() === nama.toLowerCase()
        );

        if (!contact) {
            console.log(`Kontak dengan nama ${nama} tidak ditemukan!`);
            // console.log(contact);
            // reject(false);
        }

        resolve(contact);
    });
}

// function simpanContact
const simpanContact = (nama, email, nohp) => {
    const datajson = { nama, email, nohp };
    return new Promise(async (resolve, reject) => {
        const contacts = await loadContacts();

        const duplikat = contacts.find((contact) => contact.nama === nama);
        if (duplikat) {
            console.log("contact sudah terdaftar, gunakan nama lain!");
            // return false;
            throw new Error('Nama kontak Sudah Digunakan')
        } else {
            // simpan data yang diinput
            contacts.push(datajson);
            fs.writeFile('data/contacts.json', JSON.stringify(contacts), (e) => {
                if (e) throw e;
                console.log("Terima Kasih telah input data!");
                resolve(contacts);
            });
        }
    })
}

const deleteContact = async (nama) => {
    return new Promise(async (resolve, reject) => {
        const contacts = await loadContacts();
        const newContacts = contacts.filter((contact) => contact.nama != nama);

        if (contacts.length === newContacts.length) {
            console.log(`kontak dengan nama ${nama} tidak ditemukan!`);
            reject(false);
        }

        fs.writeFile('data/contacts.json', JSON.stringify(newContacts), (e) => {
            if (e) throw e;
            console.log(`data kontak dengan nama ${nama} berhasil dihapus!`);
            resolve(contacts);
        });
    })

}

module.exports = { simpanContact, detailContact, deleteContact, loadContacts };
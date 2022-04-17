// core modules

const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

const jsonPath = "./data/contacts.json";
if (!fs.existsSync(jsonPath)) {
    fs.writeFileSync(jsonPath, "[]", "utf-8");
}

const questions = (pertanyaan) => {
    return new Promise((resolve, rejects) => {
        rl.question(pertanyaan, (hasil) => {
            resolve(hasil);
        });
    });
}

const simpanContact = (nama, email, nohp) => {
    const datajson = { nama, email, nohp };
    fs.readFile('data/contacts.json', 'utf-8', (e, data) => {
        if (e) throw e;
        const contacts = JSON.parse(data);
        // console.log(datajson);
        contacts.push(datajson);
        fs.writeFile('data/contacts.json', JSON.stringify(contacts), (e) => {
            if (e) throw e;
            console.log("Terima Kasih telah input data!");
        });
    });
    rl.close();
}

module.exports = { simpanContact, questions };
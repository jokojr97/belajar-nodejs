// core modules
// file system
const fs = require('fs');

// menuliskan string ke file secara syncronus
// try {
//     fs.writeFileSync('data/test.txt', 'Hello World! secara synchronus!');
// } catch (e) {
//     console.log(e);
// }

// menuliskan string ke file secara asynchronus
// fs.writeFile('data/test.txt', 'hello world secara asyncronys', (e) => {
//     console.log(e);
// });

// membaca isi file secara syncronus
// const data = fs.readFileSync('data/test.txt', 'utf-8');
// console.log(data);

// membaca file secara asyncronys
// fs.readFile('data/test.txt', 'utf-8', (e, data) => {
//     if (e) throw e;
//     console.log(data);
// });


// readline
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('masukkan nama anda:', (nama) => {
    rl.question('masukkan nomor HP anda:', (nohp) => {
        // console.log(`Salam Kenal ${nama}, nomor hp anda ${nohp}`);
        const datajson = { nama, nohp };
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
    });
});
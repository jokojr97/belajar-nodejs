const yargs = require("yargs");
const contacts = require("./contacts")
// console.log(process.argv[2]);
// const command = yargs.argv;
// console.log(command);

// yargs.command('add', 'menammbahkan contact baru', () => { }, (argv) => {
//     console.log(argv.name);
// }).parse();

yargs.command({
    command: 'add',
    describe: 'Menambahkan Contact Baru',
    builder: {
        name: {
            describe: "Nama lengkap",
            demandOption: true,
            type: "string"
        },
        email: {
            describe: "Email",
            demandOption: true,
            type: "string"
        },
        nohp: {
            describe: "Nomor Telepon",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        const contact = {
            nama: argv.name,
            email: argv.email,
            nohp: argv.nohp,
        }
        // console.log(contact.nama);
        contacts.simpanContact(contact.nama, contact.email, contact.nohp);

    }

}).demandCommand();

// menampilkan semua data (nama dan nomor handphone)
yargs.command({
    command: 'list',
    describe: 'menampilkan semua data (nama dan nomor handphone)',
    handler() {
        contacts.listContacts();
    }
});

// menampilkan detail data
yargs.command({
    command: 'detail',
    describe: 'menampilkan detail',
    builder: {
        nama: {
            describe: "Nama lengkap",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        const name = argv.nama;
        contacts.detailContact(name);
    }
});

// menghapus berdaasarkan nama
yargs.command({
    command: 'delete',
    describe: 'menghapus data berdasarkan nama',
    builder: {
        nama: {
            describe: "Nama lengkap",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        const name = argv.nama;
        contacts.deleteContact(name);
    }
});

yargs.parse();
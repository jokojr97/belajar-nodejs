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

}).parse();
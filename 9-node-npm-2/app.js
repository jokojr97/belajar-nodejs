const validator = require('validator');

const email = validator.isEmail('joko@gmail.com');
console.log(email);

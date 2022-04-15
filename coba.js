//console.log('Hello WPU');

function cetakNama(nama) {
	return `Hi Nama Saya ${nama}`;
}

const PI = 3.14;

const mahasiswa = {
	nama: 'Jokori',
	umur: 24,
	cetakMhs() {
		return `hi nama saya ${this.nama}, umur saya ${this.umur} Tahun`
	}
}

class Orang {
	constructor() {
		console.log('object telah dibuat!');
	}
}

// export manual
// module.exports.cetakNama = cetakNama;
// module.exports.PI = PI;
// module.exports.mahasiswa = mahasiswa;
// module.exports.Orang = Orang;

// export jadi property
// module.exports = {
// 	cetakNama: cetakNama,
// 	PI: PI,
// 	mahasiswa: mahasiswa,
// 	Orang: Orang
// }

// export pakai es6
module.exports = { cetakNama, PI, mahasiswa, Orang };
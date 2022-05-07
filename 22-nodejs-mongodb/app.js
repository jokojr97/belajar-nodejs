// mongodb+srv://jokori:<password>@cluster0.pd3p5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectID;
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'wpu';

async function main() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('mahasiswa');

    try {
        // CRUD Mongodb

        // insert data
        // await collection.insertOne({ nama: "riyadijr", email: "riyadijr@gmail.com" });

        // insert many data
        // await collection.insertMany([
        //     { nama: "jokoriy", email: "riyadihr@gmail.com" },
        //     { nama: "jokoriyadhi", email: "riyadijri@gmail.com" },
        // ]);

        // // show all data
        // const data = await collection.find().toArray();

        // find spesific data
        // const data = await collection.find({ _id: ObjectId('6274ddf39408fd6384759886') }).toArray();

        // edit data
        // const updateResult = await collection.updateOne({ _id: ObjectId('6274ddf39408fd6384759886') }, {
        //     $set: { nama: "masjoko" }
        // });


        // remove data
        // await collection.deleteOne({ _id: ObjectId('62732218aab70e8bc3d70d18') });

        // find similar value
        const data = await collection.find({ nama: /.*joko.*/ }).toArray();
        console.log(data);
        
    } catch (error) {
        // if (error instanceof MongoServerError) {
        //     console.log(`Error worth logging: ${error}`); // special case for some reason
        // }
        throw error; // still want to crash
    }

    return 'done.';
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
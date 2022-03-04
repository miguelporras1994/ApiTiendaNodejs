const { MongoClient, ObjectId } = require('mongodb');

const { config } = require('../config/index');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;


console.log(USER);
console.log(PASSWORD);
console.log(DB_NAME);
console.log(config.dbHost)


// const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`;
const MONGO_URI  =' mongodb://miguel:Maria2030@cluster0-shard-00-00.92kcc.mongodb.net:27017,cluster0-shard-00-01.92kcc.mongodb.net:27017,cluster0-shard-00-02.92kcc.mongodb.net:27017/plaztivideo_db?ssl=true&replicaSet=atlas-8p5e8w-shard-0&authSource=admin&retryWrites=true&w=majority'


 console.log(MONGO_URI )
class MongoLib {
    constructor() {
        this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        this.dbName = DB_NAME;
    }
    connect() {
        if (!MongoLib.connection) {
            MongoLib.connection = new Promise((resolve, reject) => {
                this.client.connect(err => {
                    if (err)
                        reject(err);

                    console.log('Connected succesfully to mongo db')
                    resolve(this.client.db(this.dbName));
                })
            })
        }
        return MongoLib.connection;
    }

    getAll(collection, query) {
        return this.connect().then(db => {
            const prueba = db.collection(collection).find(query).toArray();
        
           console.log(prueba)
           return prueba 
        });
    }
    get(collection, id) {
        console.log
        return this.connect().then(db => {
            return db.collection(collection).findOne({ _id: ObjectId(id) });
        })
    }

   getSearch(collection, Name) {
        var query =  new RegExp(Name,"i")
         return this.connect().then(db => {
            return db.collection(collection).find({ "title": query}).toArray();
          })
        
    }

    create(collection, data) {
        
        return this.connect().then(db => {
            return db.collection(collection).insertOne(data);
        }).then(result => result.insertedId);
    }
    update(collection, id, data) {
        return this.connect().then(db => {
            return db.collection(collection).updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
        }).then(result => result.upsertId || id);
    }
    delete(collection, id) {
        console.log(collection,id)
        return this.connect().then(db => {
            return db.collection(collection).deleteOne({ _id: ObjectId(id) });
        }).then(() => id).catch((e) => e)
    }
};

module.exports = MongoLib;
const MongoClient = require("mongodb").MongoClient;

module.exports = {
  getCollection,
  createCollection,
};

var dbConn = null;

async function getCollection(collectionName) {
  try {
    const db = await connect();
    const collection = await db.collection(collectionName);
    return collection;
  } catch (err) {
    console.log("Failed to get Mongo collection", err);
    throw err;
  }
}

async function connect() {
  if (dbConn) return dbConn;
  try {
    const client = await MongoClient.connect(
        'mongodb+srv://matanamz:matan_am41@cluster0.8vgkmtc.mongodb.net/?retryWrites=true&w=majority',
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      );
    const db = client.db('spotiflyDB');
    dbConn = db;
    return db;
  } catch (err) {
    console.log("Cannot Connect to DB", err);
    throw err;
  }
}

async function createCollection(collectionName) {
    try {
      const db = await connect();
      const collections = await db
        .listCollections({ name: collectionName })
        .toArray();
  
      if (collections.length > 0) {
        return db.collection(collectionName);
      }
  
      const collection = await db.createCollection(collectionName);
      return collection;
    } catch (err) {
      console.log(`Failed to create collection "${collectionName}"`, err);
      throw err;
    }
  }

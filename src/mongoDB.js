/* eslint-disable jest/require-hook */
const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://virlancostinandrei:Scoalamea12@cluster0.zfe4upk.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);

async function insert(collection) {
  const recipes = [
    {
      name: "elotes",
      ingredients: ["corn", "mayonnaise", "cotija cheese", "sour cream", "lime"],
      prepTimeInMinutes: 35
    },
    {
      name: "loco moco",
      ingredients: ["ground beef", "butter", "onion", "egg", "bread bun", "mushrooms"],
      prepTimeInMinutes: 54
    },
    {
      name: "patatas bravas",
      ingredients: ["potato", "tomato", "olive oil", "onion", "garlic", "paprika"],
      prepTimeInMinutes: 80
    },
    {
      name: "fried rice",
      ingredients: ["rice", "soy sauce", "egg", "onion", "pea", "carrot", "sesame oil"],
      prepTimeInMinutes: 40
    }
  ];

  try {
    const insertManyResult = await collection.insertMany(recipes);
    console.log(`${insertManyResult.insertedCount} documents successfully inserted.\n`);
  } catch (err) {
    console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
  }
}

async function find(collection) {
  const findQuery = { minimum_nights: { $lt: 2 } };

  try {
    const cursor = await collection.find();
    const response = await cursor.next();
    console.log(response);
    // add a linebreak
    console.log();
  } catch (err) {
    console.error(`Something went wrong trying to find the documents: ${err}\n`);
  }

}

async function update(collection) {
  const updateDoc = { $set: { prepTimeInMinutes: 72 } };
  const findOneQuery = { ingredients: "potato" };
  const updateOptions = { returnOriginal: false };

  try {
    const updateResult = await collection.findOneAndUpdate(findOneQuery, updateDoc, updateOptions);
    console.log(`Here is the updated document:\n${JSON.stringify(updateResult.value)}\n`);
  } catch (err) {
    console.error(`Something went wrong trying to update one document: ${err}\n`);
  }
}

async function deleteDB(collection) {
  const deleteQuery = { name: { $in: ["elotes", "fried rice"] } };
  try {
    const deleteResult = await collection.deleteMany(deleteQuery);
    console.log(`Deleted ${deleteResult.deletedCount} documents\n`);
  } catch (err) {
    console.error(`Something went wrong trying to delete documents: ${err}\n`);
  }
}

async function run() {
  console.log("connecting....");
  const response = await client.connect();
  const dbName = "sample_airbnb";
  const collectionName = "listingsAndReviews";
  const database = client.db(dbName);
  const collection = database.collection(collectionName);
  await find(collection);
  console.log("closing...")
  await client.close();
  console.log("closed");
}
run().catch(console.dir())
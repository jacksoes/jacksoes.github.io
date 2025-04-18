require("dotenv").config();

const mongoose = require("mongoose");

const connectDatabase = async () => {
  const DBPassword = process.env.DB_PASSWORD;
  const uri = `mongodb+srv://dev:${DBPassword}@cluster0.gsa2ewj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
  const cnx = mongoose.connection;

  mongoose.connect(uri);
  cnx
    .on("open", () => {
      console.log("database is connected");
    })
    .on("close", () => {
      console.log("database is disconnected");
    })
    .on("error", () => {
      console.log("Error with the database");
    });
};

module.exports = connectDatabase;

/*
const DBPassword = process.env.DB_PASSWORD;

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://dev:${DBPassword}@cluster0.gsa2ewj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
*/

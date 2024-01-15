const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const { MongoClient, ServerApiVersion } = require('mongodb');
app.use(express.json())
require('dotenv').config()

app.listen(port, () => {
    console.log('recipe server is on', port);

})


const uri = "mongodb+srv://<username>:<password>@cluster0.wtx9jbs.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const DbConnect = async () => {
    try {
        client.connect()
        console.log("Yum YUm Bites Connected");
    }
    catch (err) {

        console.log(err.message);
    }
}
DbConnect();



const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 4000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
app.use(express.json())
app.use(cors())
require('dotenv').config()

const uri = `mongodb+srv://${process.env.OWNER}:${process.env.PASS}@cluster0.wtx9jbs.mongodb.net/?retryWrites=true&w=majority`;

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

const allRecipes = client.db('YumYum').collection('recipes');
app.get('/', (req, res) =>
    res.send('server in running')
)

/* all recipes */
app.get('/all_recipes', async (req, res) => {
    const { mealName, mealId } = req.query;
    // console.log(mealId);
    let filter = {}
    if (mealName || mealId) {
        filter._id = new ObjectId(mealId)
    }
    try {
        const result = await allRecipes.find(filter).toArray();
        res.send(result);
    }
    catch (err) {
        res.send({ message: 'cannot find data' })
    }
})


/*
DELETING A RECIPE
*/
app.delete('/all_recipes', async (req, res) => {
    const { id } = req.query;
    console.log(id, "id");
    const filter = { _id: new ObjectId(id) };
    try {
        const result = await allRecipes.deleteOne(filter);
        console.log(result);
        res.send(result)
    }
    catch (err) {
        res.send({ message: err.message })
    }
})

/* EDITING */
app.patch('/all_recipes', async (req, res) => {
    const { id } = req.query;
    const data = req.body;
    console.log(data);
    const filter = { _id: new ObjectId(id) }
    const up = {
        $set: {
            title: data.title,
            ingredients: data.ingredients,
            instructions: data.instructions
        }
    }
    try {
        const result = await allRecipes.updateOne(filter, up);
        res.send(result)
    }
    catch (err) {
        res.send({ message: err.message })
    }

})

app.listen(port, () => {
    console.log('recipe server is on', port);

})

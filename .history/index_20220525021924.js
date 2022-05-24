const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.aoo1b.mongodb.net/?retryWrites=true&w=majority`;



const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
  try {
    await client.connect();
    const productCollection = client.db('computer-parts').collection('prod');
    

    app.get('/product', async (req, res) => {
      const query = {};
      const cursor = productCollection.find(query);
      const product = await cursor.toArray();
      res.send(product);
    });
    app.get('/review', async (req, res) => {
      const query = {};
      const cursor = productCollection.find(query);
      const review = await cursor.toArray();
      res.send(review);
    });


    app.get('/product/:productId', async (req, res) => {
      const id = req.params.productId;
      console.log(id)
      const query = { id: ObjectId(id) };
      const product = await productCollection.findOne(query);
      res.send(product);
  });
    

  //post
  app.post('/AddReview', async (res, res)=>{
    const newReview = req.body;
    const result = await reviewCollection.insertOne(newReview)
    res.setEncoding(result)
  })

   
  }
  finally {

  }
}

run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello  computer!')
})

app.listen(port, () => {
  console.log(`Computer Parts App listening on port ${port}`)
})
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.aoo1b.mongodb.net/?retryWrites=true&w=majority`;



const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
  try {
    await client.connect();
    const serviceCollection = client.db('computer-parts').collection('products');
    

    app.get('/product', async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const product = await cursor.toArray();
      res.send(product);
    });


    app.get('/product/:id', async (req, res) => {
      const id = req.params.id;
      console.log(id)
      const query = { _id: ObjectId(id) };
      const product = await productCollection.findOne(query);
      res.send(product);
  });
    

  
  app.put('/product/:id', async(req, res) =>{
    const id = req.params.id;
    const qty = req.body.restock
    console.log(qty)
    const filter = {_id:ObjectId(id)};
    const  product = await productCollection.findOne(filter)
    const quantity = qty ?  parseInt(product.quantity  ) + parseInt(qty) : product.quantity - 1
    const result = await productCollection.updateOne({ _id: ObjectId(id) }, { $set: { quantity: quantity } });
    res.send(result)
})

// app.put('/parchse/:id', async (req, res) => {
//   const id = req.params.id
//   const newQuantity = req.body
//   console.log(newQuantity);
//   const parchse = newQuantity.quantity - 1
//   const query = { _id: ObjectId(id) }
//   const options = { upsert: true };
//   const updateDoc = {
//       $set: {
//           quantity: parchse
//       }
//   }
   
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
const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const cors = require('cors');

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0idmfrx.mongodb.net/?appName=Cluster0`;

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Root route
app.get('/', (req, res) => {
  res.send('My server is running');
});

async function run() {
  try {
    await client.connect(); // ✅ connect to MongoDB

    const db = client.db('EcoTrack_db');
    const Product = db.collection('products');
    const Message = db.collection('message');

    // ✅ Get all products
    app.get('/products', async (req, res) => {
      const products = await Product.find().toArray();
      res.send(products);
    });

    // ✅ Get single product by ID
    app.get('/products/:id', async (req, res) => {
      const id = req.params.id;
      const product = await Product.findOne({ _id: new ObjectId(id) });
      res.send(product);
    });

    // ✅ Add a new product
    app.post('/products', async (req, res) => {
      const newProduct = req.body;
      const result = await Product.insertOne(newProduct);
      res.send(result);
    });

    // ✅ Delete a product
    app.delete('/products/:id', async (req, res) => {
      const id = req.params.id;
      const result = await Product.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    // ✅ Update a product
    app.put('/products/:id', async (req, res) => {
      const id = req.params.id;
      const updatedProduct = req.body;
      const result = await Product.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedProduct }
      );
      res.send(result);
    });

    app.post('/message', async(req,res)=>{
        const newMessage = req.body;
      const result = await Message.insertOne(newMessage);
      res.send(result);
    })

    console.log("Connected to MongoDB and API routes are ready!");
  } catch (err) {
    console.error(err);
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log('The port is running at:', port);
});

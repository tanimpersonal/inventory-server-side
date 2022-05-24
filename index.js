const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
//middleware
app.use(cors());
app.use(express.json());
require("dotenv").config();
//middleware end
//MONGO CONNECT

const res = require("express/lib/response");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.755op.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
//MONGO CONNECT END
//get all products

async function run() {
  try {
    await client.connect();
    const productCollection = client.db("assignment-11").collection("products");

    // query for movies that have a runtime less than 15 minutes
    app.get("/products", async (req, res) => {
      const query = {};

      const cursor = productCollection.find(query);
      const products = await cursor.toArray();
      res.send(products);
    });
    //find one item according to id
    app.get("/products/:id", async (req, res) => {
      console.log(req.params);
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const product = await productCollection.findOne(query);
      res.send(product);
    });
    //update quantity
    app.put("/products/:id", async (req, res) => {
      const id = req.params.id;
      const quantity = req.body.quantity;
      const filter = { _id: ObjectId(id) };
      //   const options = { upsert: true };
      const updateDoc = {
        $set: {
          quantity: quantity,
        },
      };
      const updateResult = await productCollection.updateOne(filter, updateDoc);
      res.send(updateResult);
      console.log(updateResult);
    });
    //delete
    app.delete("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await productCollection.deleteOne(query);
      res.send(result);
      console.log(id);
    });
    //post item
    app.post("/products", async (req, res) => {
      const newProduct = req.body;
      const result = await productCollection.insertOne(newProduct);
      console.log(req.body);
      res.send(result);
    });
  } finally {
    // await client.close();
  }
}
run();
app.get("/", (req, res) => {
  res.send("Hello World Mara Kha!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

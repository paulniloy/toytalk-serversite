const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
var cors = require('cors');

app.use(cors())
app.use(express.json())

// niloyp10
// g9pzZNvk3sJVXcAP

const uri = "mongodb+srv://niloyp10:g9pzZNvk3sJVXcAP@paulniloy.38wqfao.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  const usersubcollection = client.db("subcategory").collection("categorycollection");
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    app.get("/eng", async(req, res)=>{
      const query = { category : "Engineering"}
      const cursor = usersubcollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    })
    app.get("/eng/:id", async(req, res)=>{
      const id = req.params.id;
      console.log(id);
      const query = { _id: new ObjectId(id) };
      const cursor = await usersubcollection.findOne(query);
      res.send(cursor);
    })



    app.get("/math", async(req, res)=>{
      const query = { category : "math"}
      const cursor = usersubcollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    })
    app.get("/math/:id", async(req, res)=>{
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const cursor = await usersubcollection.findOne(query);
      res.send(cursor);
    })



    app.get("/language", async(req, res)=>{
      const query = { category : "language"}
      const cursor = usersubcollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    })
    app.get("/language/:id", async(req, res)=>{
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const cursor = await usersubcollection.findOne(query);
      res.send(cursor);
    })

     
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
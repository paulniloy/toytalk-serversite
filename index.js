const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.user_name}:${process.env.user_password}@paulniloy.38wqfao.mongodb.net/?retryWrites=true&w=majority`;

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
    const db = client.db("alltoys")
    const usersubcollection=db.collection("categorycollection");
    const addedtoys = db.collection("toyscollection");
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();


    app.post("/alltoys", async(req,res)=>{
      const body = req.body;
      const result = await addedtoys.insertOne(body);
      res.send(result)
    });


    app.put("/alltoys/:id", async(req, res)=>{
      const id = req.params.id;
      const updatingbody = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          price: updatingbody.price,
          quantity : updatingbody.quantity,
          description : updatingbody.description
        },
      };
      const result = await addedtoys.updateOne(filter, updateDoc, options);
      res.send(result)
    })

    app.get("/alltoys", async(req,res)=>{
      let query = {};
      if(req.query?.email){
        query = {email: req.query.email}
      }
      
    // const options = {
    //   sort: { price: -1 },
    // };
      const result = await addedtoys.find(query).toArray();
      res.send(result)
    })

    app.get("/as", async(req,res)=>{
      let query = {};
      if(req.query?.email){
        query = {email: req.query.email}
      }
      
    const options = {
      sort: { price: 1 },
    };
      const result = await addedtoys.find(query, options).toArray();
      res.send(result)
    })

    app.get("/des", async(req,res)=>{
      let query = {};
      if(req.query?.email){
        query = {email: req.query.email}
      }
      
    const options = {
      sort: { price: -1 },
    };
      const result = await addedtoys.find(query, options).toArray();
      res.send(result)
    })

    app.delete("/alltoys/:id", async(req, res)=>{
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await addedtoys.deleteOne(query);
      res.send(result)
    })


    app.get("/alltoysbylimit", async(req,res)=>{
      const page = parseInt(req.query.page) || 0;
      const limited = parseInt(req.query.limit) || 20;
      const skip =  page * limited;
      const cursor = await addedtoys.find().skip(skip).limit(limited).toArray();
      res.send(cursor);
      console.log(req.query);
    })


    app.get("/alltoys/:id", async(req, res)=>{
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const cursor = await addedtoys.findOne(query);
      res.send(cursor);
    })

    // eng
    app.get("/eng", async(req, res)=>{
      const query = { category : "Engineering"}
      const options = {
        sort: { price: 1 },
      };
      const cursor = usersubcollection.find(query, options);
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


    // math
    app.get("/math", async(req, res)=>{
      const query = { category : "Math"}
      const options = {
        sort: { price: 1 },
      };
      const cursor = usersubcollection.find(query, options);
      const result = await cursor.toArray();
      res.send(result);
    })
    app.get("/math/:id", async(req, res)=>{
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const cursor = await usersubcollection.findOne(query);
      res.send(cursor);
    })


    // language
    app.get("/language", async(req, res)=>{
      const query = { category : "Language"}
      const options = {
        sort: { price: 1 },
      };
      const cursor = usersubcollection.find(query, options);
      const result = await cursor.toArray();
      res.send(result);
    })
    app.get("/language/:id", async(req, res)=>{
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const cursor = await usersubcollection.findOne(query);
      res.send(cursor);
    })




    app.get("/totaltoys", async(req,res)=>{
      const result = await addedtoys.estimatedDocumentCount();
      res.send({totalnumber : result})
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
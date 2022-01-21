const express = require("express");
const Redis = require('redis')

const client = Redis.createClient()
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the records.
recordRoutes.route("/record").get(function (req, res) {
  client.get('Categories', (error, categories) => {
    if (error) console.log(error)
    else if (categories != null) {
      return res.json(JSON.parse(categories))
    } else {
      let db_connect = dbo.getDb("employees");
      db_connect
        .collection("records")
        .find({})
        .toArray(function (err, result) {
          if (err) throw err;
          client.set("Categories", JSON.stringify(result))
          res.json(result);
        });
    }
  });
})

// This section will help you get a single record by id
recordRoutes.route("/record/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("records")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you create a new record.
recordRoutes.route("/record/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    id: req.body.id,
    name: req.body.name,
    max: req.body.max,
  };

  client.get('Categories', (error, categories) =>{
    if(error) console.log(error)
    const curr = JSON.parse(categories)
    curr.push(myobj)
    client.del('Categories')
    client.set('Categories', JSON.stringify(curr))
  })

  db_connect.collection("records").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      id: req.body.id,
      name: req.body.name,
      max: req.body.max,
    },
  };
  db_connect
    .collection("records")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a record
recordRoutes.route("/record/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("records").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    client.del("")
    response.status(obj);
  });
});

module.exports = recordRoutes;
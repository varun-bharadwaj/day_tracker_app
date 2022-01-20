const express = require("express");

// activityRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /activity.
const activityRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the activitys.
activityRoutes.route("/activity").get(function (req, res) {
  let db_connect = dbo.getDb("employees");
  db_connect
    .collection("activitys")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single activity by id
activityRoutes.route("/activity/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("activitys")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you create a new activity.
activityRoutes.route("/activity/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    id: req.body.id,
    description: req.body.description,
    amount: req.body.amount,
    categoryId: req.body.categoryId
  };
  db_connect.collection("activitys").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a activity by id.
activityRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  let newvalues = {
    $set: {
        id: req.body.id,
        description: req.body.description,
        amount: req.body.amount,
        categoryId: req.body.categoryId
    },
  };
  db_connect
    .collection("activitys")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a activity
activityRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("activitys").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.status(obj);
  });
});

module.exports = activityRoutes;
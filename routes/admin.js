const express = require("express");
const router = express.Router();

const admin = require("firebase-admin");
const serviceAccount = require("../authkey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// CREATE
router.post("/create", async (req, res) => {
  try {
    const id = req.body.email;
    const userjson = {
      email: req.body.email,
      password: req.body.password,
    };

    const responce = await db.collection("temp").add(userjson);
    res.send(responce);
  } catch (e) {
    console.log(e);
  }
});

// READ
router.get("/read", async (req, res) => {
  try {
    const responce = await db.collection("temp").get();
    let responcearray = [];
    responce.forEach((doc) => {
      responcearray.push(doc.data());
    });
    res.send(responcearray);
  } catch (e) {
    res.send(e);
  }
});

// READ BY ID
router.get("/read/:id", async (req, res) => {
  try {
    const responce = await db.collection("temp").doc(req.params.id).get();
    res.send(responce.data());
  } catch (e) {
    res.send(e);
  }
});

// UPDATE
router.post("/update", async (req, res) => {
  try {
    const id = req.body.id;
    const name = req.body.email;
    const responce = await db.collection("temp").doc(id).update({
      email: name,
    });
    res.send(responce);
  } catch (e) {
    res.send(e);
  }
});

// DELETE
router.delete("/delete/:id", async (req, res) => {
  try {
    const responce = await db.collection("temp").doc(req.params.id).delete();
    res.send(responce);
  } catch (e) {
    res.send(e);
  }
});

// Auth
router.post("/auth", (req, res) => {
  try {
    if (req.body.email == "admin@gmail.com" && req.body.password == "admin") {
      res.json({ message: "Access Granted" });
    } else {
      res.json({ message: "Incorrect Credentials" });
    }
  } catch (e) {
    res.send(e);
  }
});

// get rider details
router.get("/riders", async (req, res) => {
  try {
    const responce = await db.collection("serviceUser").get();
    let responcearray = [];
    responce.forEach((doc) => {
      if (doc.data().vehicle_number != null) {
        responcearray.push(doc.data());
      }
    });
    res.send(responcearray);
  } catch (e) {
    res.send(e);
  }
});

// Approving the rider - update rider status
router.post("/update-ststus", async (req, res) => {
  try {
    const id = req.body.id;
    const responce = await db.collection("serviceUser").doc(id).update({
      is_varified: true,
    });
    res.send(responce);
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;

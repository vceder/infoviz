// Imports
const functions = require('firebase-functions');
const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');

// Create Express app
const app = express();

// Init Firebase Admin
try {
  admin.initializeApp(functions.config().firebase);
} catch (e) {
  console.log('App already initialized...');
}

// Setup Firestore references
const db = admin.firestore();
const FieldValue = admin.firestore.FieldValue;

// Router setup
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Make stuff happen here!
router.get('/users', (req, res) => {
  const requestID = req.query.id;
  const usersRef = db.collection('users');
  if (requestID) {
    // skicka specifik user
    usersRef
      .doc(requestID)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return res.status(200).send(doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
          return res.status(500);
        }
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  } else {
    let top_hundred = [];
    usersRef
      .orderBy('last_live_timestamp')
      .limit(100)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          top_hundred.push(doc.data());
        });
        return res.status(200).send(top_hundred);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }
});

// Get games. returns ten games if no id is given.
router.get('/games', (req, res) => {
  const requestID = req.query.id;
  const gamesRef = db.collection('games');
  if (requestID) {
    // skicka specifik user
    gamesRef
      .doc(requestID)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return res.status(200).send(doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
          return res.status(500);
        }
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  } else {
    let top_ten = [];
    gamesRef
      .orderBy('last_live_timestamp')
      .limit(10)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          top_ten.push(doc.data());
        });
        return res.status(200).send(top_ten);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }
});

app.use('/api', router);

// Export the api
module.exports = functions.https.onRequest(app);

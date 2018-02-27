// Imports
const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Init Firebase Admin
try {
  admin.initializeApp(functions.config().firebase);
} catch (e) {
  console.log('App already initialized...');
}

// Init the Firebase DB
const db = admin.firestore();
const FieldValue = admin.firestore.FieldValue;

module.exports = functions.https.onRequest((req, res) => {
  const usersRef = db.collection('users');
  const gamesRef = db.collection('games');
  const timestamp = FieldValue.serverTimestamp();
  let batch = db.batch();
  let usersData = {};
  let gamesData = {};
  let access_token;

  
});

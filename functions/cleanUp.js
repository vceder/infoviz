// Imports
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const moment = require('moment');

// Init Firebase Admin
try {
  admin.initializeApp(functions.config().firebase);
} catch (e) {
  console.log('App already initialized...');
}

// Init the Firebase DB
const db = admin.firestore();

module.exports = functions.https.onRequest((req, res) => {
  const usersRef = db.collection('users');
  const gamesRef = db.collection('games');
  const streamsRef = db.collection('streams');
  const usersBatch = db.batch();
  const gamesBatch = db.batch();
  const streamsBatch = db.batch();

  usersRef
    .limit(500)
    .get()
    .then(querySnapshot => {
      const oldData = querySnapshot.filter(doc => {
        return moment(doc.data().timestamp).isBefore(
          moment().subtract(48, 'hours')
        );
      });
      oldData.forEach(doc => {
        usersBatch.delete(doc.id);
      });

      return;
    });
});

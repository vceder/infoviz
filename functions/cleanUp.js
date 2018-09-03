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

module.exports = functions.https.onRequest((req, res) => {
  const usersRef = db.collection('users');
  const gamesRef = db.collection('games');
  const streamsRef = db.collection('streams');
  const usersBatch = db.batch();
  const gamesBatch = db.batch();
  const streamsBatch = db.batch();

  const date = new Date();
  date.setDate(date.getDate() - 2);

  return Promise.all([
    usersRef
      .where('timestamp', '<', date)
      .limit(500)
      .get(),
    gamesRef
      .where('timestamp', '<', date)
      .limit(500)
      .get(),
    streamsRef
      .where('timestamp', '<', date)
      .limit(500)
      .get()
  ])
    .then(res => {
      const [usersSnapshot, gamesSnapshot, streamsSnapshot] = res;

      // Delete old users
      usersSnapshot.forEach(doc => {
        usersBatch.delete(usersRef.doc(doc.id));
      });

      // Delete old games
      gamesSnapshot.forEach(doc => {
        gamesBatch.delete(gamesRef.doc(doc.id));
      });

      // Delete old stream-objects
      streamsSnapshot.forEach(doc => {
        streamsBatch.delete(streamsRef.doc(doc.id));
      });

      return Promise.all([
        usersBatch.commit(),
        gamesBatch.commit(),
        streamsBatch.commit()
      ]);
    })
    .then(() => {
      return res.send('Success');
    })
    .catch(error => {
      console.log(error);
      return res.status(500).send(error);
    });
});

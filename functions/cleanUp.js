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

const getOld = snapshot =>
  snapshot.filter(doc =>
    moment(doc.data().timestamp).isBefore(moment().subtract(48, 'hours'))
  );

module.exports = functions.https.onRequest((req, res) => {
  const usersRef = db.collection('users');
  const gamesRef = db.collection('games');
  const streamsRef = db.collection('streams');
  const usersBatch = db.batch();
  const gamesBatch = db.batch();
  const streamsBatch = db.batch();

  return Promise.all([
    usersRef.limit(500).get(),
    gamesRef.limit(500).get(),
    streamsRef.limit(500).get()
  ])
    .then(res => {
      const [usersSnapshot, gamesSnapshot, streamsSnapshot] = res;

      // Delete old users
      const oldUsersData = getOld(usersSnapshot);
      oldUsersData.forEach(doc => {
        usersBatch.delete(doc.id);
      });

      // Delete old games
      const oldGamesData = getOld(gamesSnapshot);
      oldGamesData.forEach(doc => {
        gamesBatch.delete(doc.id);
      });

      // Delete old stream-objects
      const oldStreamsData = getOld(streamsSnapshot);
      oldStreamsData.forEach(doc => {
        streamsBatch.delete(doc.id);
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

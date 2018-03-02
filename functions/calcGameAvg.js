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
const FieldValue = admin.firestore.FieldValue;

module.exports = functions.firestore
  .document('games/{gameId}')
  .onUpdate((event) => {
    const timestamp = moment(FieldValue.serverTimestamp()).startOf('day');
    const newData = event.data.data();
    const prevData = event.data.previous.data();
    console.log('prevData', prevData);
    console.log('newData', newData);
    if (moment(newData.last_timestamp).isAfter(prevData.last_timestamp)) {
      console.log('new timestamp');
      const avgCollection = db
        .collection('games')
        .doc(newData.id)
        .collection('daily_average');

      return avgCollection.doc(timestamp.format('YYYYMMDD'))
        .get()
        .then((doc) => {
          if (!doc.exists) {
            return avgCollection.doc(timestamp.format('YYYYMMDD')).set({
              entries: 1,
              total_viewers: newData.viewer_count,
              avg_viewers: newData.viewer_count,
              timestamp: timestamp.toDate(),
            });
          } else {
            const docData = doc.data();
            console.log('Snapshot doc data', docData);
            return avgCollection.doc(timestamp.format('YYYYMMDD')).set(
              {
                entries: docData.entries + 1,
                total_viewers: docData.total_viewers + newData.viewer_count,
                avg_viewers: Math.floor(
                  (docData.total_viewers + newData.viewer_count) /
                    (docData.entries + 1)
                ),
                timestamp: timestamp.toDate(),
              },
              { merge: true }
            );
          }
        })
        .catch((error) => {
          return false;
        });
    } else {
      console.log('same timestamp');
      return true;
    }
  });

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
    console.log('prevData', newData);
    if (newData.last_live_timestamp !== prevData.last_live_timestamp) {
      console.log('new timestamp');
      const avgCollection = db
        .collection('games')
        .doc(event.data.previous.get(admin.firestore.FieldPath.documentId()))
        .collection('daily_average');

      avgCollection
        .where('timestamp', '==', timestamp.toDate())
        .get()
        .then((snapshot) => {
          if (snapshot.empty) {
            return avgCollection.doc().set({
              entries: 1,
              total_viewers: prevData.viewer_count,
              avg_viewers: prevData.viewer_count,
              timestamp: timestamp.toDate(),
            });
          } else {
            const docData = snapshot.docs[0].data();
            return avgCollection
              .doc(snapshot.docs[0].get(admin.firestore.FieldPath.documentId()))
              .set({
                entries: docData.entries + 1,
                total_viewers:
                  docData.total_viewers + prevData.viewer_count,
                avg_viewers: Math.floor(
                  (docData.total_viewers + prevData.viewer_count) /
                    (docData.entries + 1)
                ),
                timestamp: timestamp.toDate(),
              });
          }
        })
        .catch((error) => {
          return false;
        });
    } else {
      console.log('same timestamp');
      return true;
    }
    return true;
  });

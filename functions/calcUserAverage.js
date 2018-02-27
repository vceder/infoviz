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

module.exports = functions.firestore
  .document('users/{userId}')
  .onUpdate((event) => {
    const timestamp = moment(FieldValue.serverTimestamp()).startOf('day');
    const newData = event.data.data();
    const prevData = event.data.previous.data();

    const avgCollection = db
      .collection('users')
      .doc(prevData.id)
      .collection('daily_average');

    avgCollection
      .where('timestamp', '==', timestamp)
      .get()
      .then((snapshot) => {
        if (!snapshot[0].exists) {
          return avgCollection.doc().set({
            entries: 1,
            total_viewers: prevData.last_viewer_count,
            avg_viewers: prevData.last_viewer_count,
            timestamp: timestamp,
          });
        } else {
          console.log('Document data:', doc.data());
          const docData = snapshot[0].data();
          return avgCollection.doc(snapshot[0].id).set({
            entries: docData.entries + 1,
            total_viewers: docData.total_viewers + prevData.last_viewer_count,
            avg_viewers:
              (docData.total_viewers + prevData.last_viewer_count) /
              (docData.entries + 1),
            timestamp: timestamp,
          });
        }
      })
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((error) => {});
  });

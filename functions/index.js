// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// Require stuff
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const getTwitchData = require('./getTwitchData');
const api = require('./api');

// Init Firebase Admin
try {
  admin.initializeApp(functions.config().firebase);
} catch (e) {
  console.log('App already initialized...');
}

// Function to get data from Twitch API
exports.getTwitchData = functions.https.onRequest(getTwitchData);

exports.api = functions.https.onRequest(api);

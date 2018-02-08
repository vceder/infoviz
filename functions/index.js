// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// Require stuff
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');

// Init the Firebase Admin SDK
admin.initializeApp(functions.config().firebase);

// Init Axios Twitch
const twitch = axios.create({
  baseURL: 'https://api.twitch.tv/helix',
});
const twitchAuth = axios.create({
  baseURL: 'https://api.twitch.tv/kraken',
});

// TODO: Function to get App Token
const getTwitchToken = (clientKey, clientSecret) => {
  return appAccessToken;
};

// Function to get data from Twitch API
exports.getTwitchData = functions.https.onRequest((req, res) => {
  const accessToken = getTwitchToken(clientKey, clientSecret);

  twitch
    .get({
      url: '/streams',
      params: {
        first: 50,
        type: 'live',
      },
    })
    .then((response) => {
      // TODO: Save to Firestore
      return res.send(200, response);
    })
    .catch((error) => {
      res.send(500, 'Server error');
    });
});

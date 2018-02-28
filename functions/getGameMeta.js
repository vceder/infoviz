// Imports
const functions = require('firebase-functions');
const axios = require('axios');
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

// Init Axios Twitch
const twitch = axios.create({
  baseURL: 'https://api.twitch.tv/helix',
});
const twitchAuth = axios.create({
  baseURL: 'https://api.twitch.tv/kraken',
});

const getTwitchToken = twitchAuth({
  method: 'post',
  url: 'oauth2/token',
  params: {
    client_id: functions.config().twitch.client_id,
    client_secret: functions.config().twitch.client_secret,
    grant_type: 'client_credentials',
  },
});

module.exports = functions.firestore
  .document('games/{gameId}')
  .onCreate((event) => {
    const newData = event.data.data();
    return getTwitchToken
      .then((response) => {
        access_token = response.data.access_token;
        return twitch({
          method: 'get',
          url: '/games?id=' + newData.id,
          headers: {
            Authorization: 'Bearer ' + access_token,
          },
        });
      })
      .then((response) => {
        return event.data.ref.set(response.data.data[0], { merge: true });
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  });

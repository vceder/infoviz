// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// Require stuff
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');

// Init the Firebase Admin SDK
admin.initializeApp(functions.config().firebase);
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

// Function to get data from Twitch API
exports.getTwitchData = functions.https.onRequest((req, res) => {
  getTwitchToken
    .then((response) => {
      return twitch({
        method: 'get',
        url: '/streams',
        params: {
          first: 10,
          type: 'live',
        },
        headers: {
          Authorization: 'Bearer ' + response.data.access_token,
        },
      });
    })
    .then((response) => {
      const users = db.collection('users');
      const games = db.collection('games');
      let batch = db.batch();
      let gameViewers = {};

      // Loop through result and create records for each stream
      response.data.data.forEach((stream) => {
        // Add viewers to game viewers
        let game_viewers = gameViewers[stream.game_id]
          ? gameViewers[stream.game_id]
          : 0;
        gameViewers[stream.game_id] = game_viewers + stream.viewer_count;

        // Update user status
        batch.set(
          users.doc(stream.user_id),
          {
            last_live: FieldValue.serverTimestamp(),
            last_viewer_count: stream.viewer_count,
            last_game: stream.game_id,
            last_thumbnail_url: stream.thumbnail_url,
            last_title: stream.title,
          },
          { merge: true }
        );

        // Add record in users history
        batch.set(
          users
            .doc(stream.user_id)
            .collection('history')
            .doc(),
          {
            timestamp: FieldValue.serverTimestamp(),
            game_id: stream.game_id,
            title: stream.title,
            viewer_count: stream.viewer_count,
            thumbnail_url: stream.thumbnail_url,
            community_ids: stream.community_ids,
            language: stream.language,
          }
        );
      });

      // Add history record to games
      Object.keys(gameViewers).forEach((game_id) => {
        batch.set(
          games
            .doc(game_id)
            .collection('history')
            .doc(),
          {
            viewers: gameViewers[game_id],
            timestamp: FieldValue.serverTimestamp(),
          }
        );
      });

      return batch.commit();
    })
    .then((data) => {
      return res.send('Success!');
    })
    .catch((error) => {
      console.log(error);
      return res.send(error);
    });
});

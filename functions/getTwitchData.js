// Imports
const functions = require('firebase-functions');
const axios = require('axios');
const URLSearchParams = require('url-search-params');
const admin = require('firebase-admin');

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

module.exports.getTwitchData = function getTwitchData(req, res) {
  const usersRef = db.collection('users');
  const gamesRef = db.collection('games');
  const timestamp = FieldValue.serverTimestamp();
  let batch = db.batch();
  let usersData = {};
  let gamesData = {};
  let access_token;

  getTwitchToken
    .then((response) => {
      access_token = response.data.access_token;
      return twitch({
        method: 'get',
        url: '/streams',
        params: {
          first: 100,
          type: 'live',
        },
        headers: {
          Authorization: 'Bearer ' + access_token,
        },
      });
    })
    .then((response) => {
      // Create params objects for users and games
      let gamesParams = new URLSearchParams();
      let usersParams = new URLSearchParams();

      // Loop through result and create records for each stream
      response.data.data.forEach((stream) => {
        // Add user and game id to query params
        usersParams.append('id', stream.user_id);
        if (gamesParams.has(stream.game_id) === false) {
          gamesParams.append('id', stream.game_id);
        }

        // Add viewers to game object
        if (gamesData[stream.game_id]) {
          gamesData[stream.game_id].viewer_count =
            gamesData[stream.game_id].viewer_count + stream.viewer_count;
        } else {
          gamesData[stream.game_id] = {
            viewer_count: stream.viewer_count,
          };
        }
        gamesData[stream.game_id].last_timestamp = timestamp;

        // Create user object
        usersData[stream.user_id] = {
          last_live_timestamp: timestamp,
          last_viewer_count: stream.viewer_count,
          last_game_id: stream.game_id,
          last_thumbnail_url: stream.thumbnail_url,
          last_stream_title: stream.title,
        };

        // Add record in users history
        batch.set(
          usersRef
            .doc(stream.user_id)
            .collection('history')
            .doc(),
          {
            timestamp: timestamp,
            game_id: stream.game_id,
            title: stream.title,
            viewer_count: stream.viewer_count,
            thumbnail_url: stream.thumbnail_url,
            community_ids: stream.community_ids,
            language: stream.language,
          }
        );
      });

      return Promise.all([
        twitch({
          method: 'get',
          url: '/users?' + usersParams.toString(),
          headers: {
            Authorization: 'Bearer ' + access_token,
          },
        }),
        twitch({
          method: 'get',
          url: '/games?' + gamesParams.toString(),
          headers: {
            Authorization: 'Bearer ' + access_token,
          },
        }),
      ]);
    })
    .then(([users, games]) => {
      // Loop over users
      users.data.data.forEach((user) => {
        const userObj = Object.assign(usersData[user.id], user);

        // Update user status
        batch.set(usersRef.doc(userObj.id), userObj, { merge: true });
      });

      // Loop over games
      games.data.data.forEach((game) => {
        const gameObj = Object.assign(gamesData[game.id], game);

        // Update game data
        batch.set(gamesRef.doc(gameObj.id), gameObj, { merge: true });

        // Add game data to history
        batch.set(
          gamesRef
            .doc(gameObj.id)
            .collection('history')
            .doc(),
          {
            viewers: gameObj.viewer_count,
            timestamp: timestamp,
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
      return res.status(500).send(error);
    });
};

// Imports
const functions = require('firebase-functions');
const axios = require('axios');
const admin = require('firebase-admin');
const URLSearchParams = require('url-search-params');
const moment = require('moment');

// Init Firebase Admin
try {
  admin.initializeApp();
} catch (e) {
  console.log('App already initialized...');
}

// Init the Firebase DB
const db = admin.firestore();
const FieldValue = admin.firestore.FieldValue;

// Init Axios Twitch
const twitch = axios.create({
  baseURL: 'https://api.twitch.tv/helix'
});
const twitchAuth = axios.create({
  baseURL: 'https://api.twitch.tv/kraken'
});

const getTwitchToken = twitchAuth({
  method: 'post',
  url: 'oauth2/token',
  params: {
    client_id: functions.config().twitch.client_id,
    client_secret: functions.config().twitch.client_secret,
    grant_type: 'client_credentials'
  }
});

module.exports = functions.https.onRequest((req, res) => {
  const usersRef = db.collection('users');
  const gamesRef = db.collection('games');
  const streamsRef = db.collection('streams');
  const timestamp = moment(FieldValue.serverTimestamp()).startOf('minute');
  const minutes = timestamp.minutes();
  if (minutes >= 30) {
    timestamp.minutes(30);
  } else {
    timestamp.minutes(0);
  }
  let batch = db.batch();
  let access_token;
  let gamesData = {};
  let usersData = {};
  let streamsData = {};

  return getTwitchToken
    .then(response => {
      access_token = response.data.access_token;
      return twitch({
        method: 'get',
        url: '/streams',
        params: {
          first: 100,
          type: 'live'
        },
        headers: {
          Authorization: 'Bearer ' + access_token
        }
      });
    })
    .then(response => {
      let usersParams = new URLSearchParams();
      const totalViewers = response.data.data.reduce((acc, stream) => {
        return acc + stream.viewer_count;
      }, 0);
      const averageViewers = Math.floor(
        totalViewers / response.data.data.length
      );

      streamsData = {
        timestamp: timestamp.toDate(),
        top100: [],
        average_viewers: averageViewers,
        total_viewers: totalViewers
      };

      response.data.data.forEach(stream => {
        usersParams.append('id', stream.user_id);

        usersData[stream.user_id] = Object.assign(
          {
            timestamp: timestamp.toDate()
          },
          stream
        );

        // Add viewers to game object
        if (stream.game_id !== '') {
          if (gamesData[stream.game_id]) {
            gamesData[stream.game_id].viewer_count =
              gamesData[stream.game_id].viewer_count + stream.viewer_count;
          } else {
            gamesData[stream.game_id] = {
              viewer_count: stream.viewer_count
            };
          }
          gamesData[stream.game_id].timestamp = timestamp.toDate();
          gamesData[stream.game_id].id = stream.game_id;
        }
      });
      return twitch({
        method: 'get',
        url: '/users?' + usersParams.toString(),
        headers: {
          Authorization: 'Bearer ' + access_token
        }
      });
    })
    .then(users => {
      // Loop over users
      users.data.data.forEach(user => {
        const userObj = Object.assign(usersData[user.id], user);
        streamsData.top100.push(userObj);

        // Set users data
        batch.set(usersRef.doc(userObj.id), userObj, { merge: true });
      });

      // Set games data
      Object.keys(gamesData).forEach(key => {
        batch.set(gamesRef.doc(key), gamesData[key], { merge: true });
      });

      // Set streams data
      batch.set(streamsRef.doc(), streamsData);

      return batch.commit();
    })
    .then(() => {
      return res.send('Success!');
    })
    .catch(error => {
      console.log(error);
      return res.status(500).send(error);
    });
});

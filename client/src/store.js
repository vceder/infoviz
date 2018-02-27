// Import dependencies
import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
import "firebase/firestore";
Vue.use(Vuex);

// Initialize firebase
firebase.initializeApp({
  apiKey: "AIzaSyCIUYb3lK77UV1Gn-pOQLmMpa-__YsD-vE",
  authDomain: "infoviz-dh2321.firebaseapp.com",
  projectId: "infoviz-dh2321"
});

const db = firebase.firestore();
// firebase
//   .firestore()
//   .enablePersistence()
//   .then(() => {
//     // Initialize Cloud Firestore through firebase
//     const db = firebase.firestore();
//   });

export default new Vuex.Store({
  state: {
    menu: false,
    latestData: {},
    history: {}
  },
  mutations: {
    setMenu(state, bool) {
      state.menu = bool;
    },
    setLatest(state, latest) {
      state.latestData = latest;
    }
  },
  actions: {
    getLatestData({ commit }) {
      let latest = {
        total_viewers: 0,
        total_games: 0,
        timestamp: "",
        games: {}
      };
      const usersRef = db.collection("users");
      // const gamesRef = db.collection("games");

      usersRef
        .orderBy("last_live_timestamp", "desc")
        .limit(100)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const stream = doc.data();
            if (stream.last_game_id !== "") {
              if (latest.timestamp === "") {
                latest.timestamp = stream.last_live_timestamp;
              }
              latest.total_viewers += stream.last_viewer_count;
              if (latest.games[stream.last_game_id]) {
                latest.games[stream.last_game_id].streams.push(stream);
              } else {
                latest.total_games++;
                latest.games[stream.last_game_id] = {
                  streams: [stream]
                };
              }
            }
          });
        })
        .then(() => {
          commit("setLatest", latest);
        })
        .catch(() => {
          //console.log('error');
        });
    }
  }
});

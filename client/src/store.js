// Import dependencies
import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
import moment from "moment";
import "firebase/firestore";

Vue.use(Vuex);

// Initialize firebase
firebase.initializeApp({
  apiKey: "AIzaSyCIUYb3lK77UV1Gn-pOQLmMpa-__YsD-vE",
  authDomain: "infoviz-dh2321.firebaseapp.com",
  projectId: "infoviz-dh2321"
});

const db = firebase.firestore();

export default new Vuex.Store({
  state: {
    isLoading: true,
    detailsActive: false,
    starCount: 0,
    top100: {},
    games: {},
    users: {}
  },
  mutations: {
    setTop100(state, top100) {
      state.top100 = top100;
    },
    toggleDetails(state, bool) {
      state.detailsActive = bool;
    },
    toggleLoading(state, bool) {
      state.isLoading = bool;
    },
    setLatest(state, latest) {
      state.latestData = latest;
    }
  },
  actions: {
    getTop100({ state, commit }) {
      if (state.top100.games) {
        commit("toggleLoading", false);
      } else {
        let top100 = {};
        const streamsRef = db.collection("streams");
        streamsRef
          .orderBy("timestamp", "desc")
          .limit(48)
          .get()
          .then(querySnapshot => {
            if (querySnapshot.empty) {
              throw {
                name: "api error",
                message: querySnapshot
              };
            } else {
              querySnapshot.forEach(doc => {
                const docData = doc.data();
                const timestamp = moment(docData.timestamp);
                top100[timestamp.format("YYYYMMDDHHmm")] = {
                  averageViewers: docData.average_viewers,
                  totalViewers: docData.total_viewers,
                  games: {},
                  totalGames: 0,
                  timestamp: timestamp.toDate()
                };
                docData.top100.forEach(stream => {
                  if (stream.game_id !== "") {
                    if (
                      top100[timestamp.format("YYYYMMDDHHmm")].games[
                        stream.game_id
                      ]
                    ) {
                      top100[timestamp.format("YYYYMMDDHHmm")].games[
                        stream.game_id
                      ].streams.push(stream);
                    } else {
                      top100[timestamp.format("YYYYMMDDHHmm")].totalGames++;
                      top100[timestamp.format("YYYYMMDDHHmm")].games[
                        stream.game_id
                      ] = {
                        streams: [stream]
                      };
                    }
                  }
                });
              });
            }
          })
          .then(() => {
            commit("setTop100", top100);
            commit("toggleLoading", false);
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
});

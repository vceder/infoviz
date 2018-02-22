import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    menu: false
  },
  mutations: {
    setMenu(state, bool) {
      state.menu = bool;
    }
  },
  actions: {}
});

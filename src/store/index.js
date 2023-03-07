import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    counter: 0,
    name:'default'
  },
  // used to make changes in state and cannot call async methods
  mutations: {
    incCounter(state,randomNumber) {
      state.counter += randomNumber;
    },
    decCounter(state,randomNumber) {
      state.counter -= randomNumber;
    },
  },
  // Inside action we can use async code and then call mutation for change in state
  actions: {
    incCounter({commit}) {
      console.log("inccounter dispatched");
      axios
        .get(
          "http://www.randomnumberapi.com/api/v1.0/random?min=1&max=9&count=1"
        )
        .then((res) => commit('incCounter',parseInt(res.data)));
    },
    decCounter({commit}) {
      console.log("deccounter dispatched");
      axios
      .get(
        "http://www.randomnumberapi.com/api/v1.0/random?min=1&max=9&count=1"
      )
      .then((res) => commit('decCounter',parseInt(res.data)));
    },
  },
  // Getters are used to get state value in and modify it before using { filtering false todo before mounting}
  getters: {},
});
export default store;

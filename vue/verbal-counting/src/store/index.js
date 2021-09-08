import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import {SECOND_IN_MIN, SUM} from "../assets";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        lastGameDate: null,
        time: '3',
        level: '2',
        operations: [SUM],
        turnCount: 0,
        trueAnswersCount: 0
    },

    plugins: [createPersistedState()],

    getters: {
        roundTime: ({time}) => {
            return time * SECOND_IN_MIN;
        }
    },

    mutations: {
        setTime(store, payload) {
            store.time = payload.amount;
        },

        setLevel(store, payload) {
            store.level = payload.amount;
        },

        setOperations(store, payload) {
            store.operations = payload.amount;
        },

        setTurnCount(store, payload) {
            store.turnCount = payload.amount;
        },

        setTrueAnswersCount(store, payload) {
            store.trueAnswersCount = payload.amount;
        }
    }
})

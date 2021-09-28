import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        identifyCode: "1234",
        countdown: 60,
        timer: undefined,
    },
    mutations: {
        setIdentifyCode(state, payload) {
            state.identifyCode = payload;
        },
        setCountdown(state, payload) {
            clearInterval(state.timer);
            state.countdown = payload;
            state.timer = setInterval(function () {
                if (state.countdown > 0) {
                    state.countdown = state.countdown - 1;
                } else {
                    clearInterval(state.setIdentifyCodetimer);
                }
                console.log(state.countdown+'s');
            }, 1000)
        },
        clearTimer(state) {
            clearInterval(state.timer);
        }
    }
})

export default store
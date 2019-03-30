import vuex from 'vuex'

const store = new vuex.Store({
  state: {
    userId: null,
    baseUrl: 'http://localhost:10000/api'
  },
  mutations: {
    setUserId(state, payload) {
      state.userId = payload.userId
    }
  }
})

export { store }

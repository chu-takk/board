import { createStore } from 'vuex'

export default createStore({
  state: {
    loginUser: JSON.parse(localStorage.getItem('user')) || null,
  },
  getters: {
    isLoggedIn: state => !!state.loginUser,
    getUser: state => state.loginUser,
    getUserGrade: state => state.loginUser ? state.loginUser.grade : null, // 등급 가져오기
  },
  mutations: {
    setLoginUser(state, user) {
      state.loginUser = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    logout(state) {
      state.loginUser = null
      localStorage.removeItem('user')
    }
  },
  actions: {
    async login({ commit }, userData) {
      try {
        const response = await this.$axios.post('/user/login', userData);
        if (response.data.result === 'success') {
          commit('setLoginUser', response.data.user);
          return true;
        } else {
          alert(response.data.message);
          return false;
        }
      } catch (error) {
        console.error('Login error:', error);
        alert('로그인 중 오류가 발생했습니다.');
        return false;
      }
    },
    logout({ commit }) {
      commit('logout');
      this.$router.push('/');
    }
  },
  modules: {
  }
});

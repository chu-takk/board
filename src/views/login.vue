<template>
    <div>
      <v-text-field v-model="user.id" label="아이디"></v-text-field>
      <v-text-field v-model="user.password" label="패스워드" type="password"></v-text-field>
  
      <div class="text-center">
        <v-btn color="primary" @click="submit">로그인</v-btn>
        <v-btn to="/join">회원가입</v-btn>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        user: {
          id: '',
          password: ''
        }
      };
    },
    methods: {
      async submit() {
        try {
          const response = await this.$axios.post('/user/login', this.user);
          if (response.data.result === 'success') {
            this.$store.commit('setLoginUser', response.data.user);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            alert('로그인되었습니다.');
            this.$router.push('/');
          } else {
            alert(response.data.message);
          }
        } catch (error) {
          console.error('Login error:', error);
          alert('로그인 중 오류가 발생했습니다.');
        }
      }
    }
  };
  </script>
  
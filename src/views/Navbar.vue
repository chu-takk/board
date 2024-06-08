<template>
    <v-app-bar app>
      <v-toolbar-title>과실분쟁 게시판</v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="user">
        <span>{{ user.name }}님 환영합니다! (등급: {{ user.grade }})</span>
        <v-btn @click="logout">로그아웃</v-btn>
        <v-btn v-if="user.grade === 'admin'" to="/admin">관리자 페이지</v-btn> <!-- 관리자 전용 버튼 -->
      </div>
      <div v-else>
        <v-btn to="/login">로그인</v-btn>
        <v-btn to="/join">회원가입</v-btn>
      </div>
    </v-app-bar>
  </template>
  
  <script>
  export default {
    computed: {
      user() {
        return this.$store.getters.getUser;
      }
    },
    methods: {
      logout() {
        this.$store.commit('logout');
        this.$router.push('/');
      }
    }
  };
  </script>
  
<template>
  <v-app>
    <v-main>
      <div class="header-bar">
        <v-layout align-center>
          <div class="brand">게시판</div>
          <v-spacer></v-spacer>
          <v-btn variant="text" v-if="$store.state.loginUser" @click="logout">
            {{ $store.state.loginUser.name }}
          </v-btn>
          <v-btn v-if="!$store.state.loginUser" to="/login" variant="text">로그인</v-btn>
        </v-layout>
      </div>

      <router-view />
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
  mounted() {
    this.$axios.post("/user/info")
      .then(response => {
        if (response.data.result == "success") {
          this.$store.commit("setLoginUser", response.data.user)
        }

      })
  },
  methods: {
    logout() {
      this.$axios.post("/user/logout")
        .then(response => {
          if (response.data.result == "success") {
            this.$store.commit("logout")
          }
        })
    }
  }
}
</script>
<style lang="less">
.header-bar {
  padding: 10px;
  border-bottom: 1px solid #eee;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;

  .brand {
    font-size: 24px;
    font-weight: bold;
  }
}
</style>

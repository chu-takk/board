<template>
  <div>
    <v-text-field v-model="user.id" label="아이디"></v-text-field>
    <v-text-field v-model="user.name" label="이름"></v-text-field>
    <v-text-field v-model="user.password" label="패스워드" type="password"></v-text-field>
    <v-text-field v-model="user.passwordConfirm" label="패스워드 확인" type="password"></v-text-field>

    <v-select
      v-model="user.grade"
      :items="grades"
      label="회원 분류"
      item-text="text"
      item-value="value"
      solo
    ></v-select>

    <div class="text-center">
      <v-btn color="primary" @click="submit">가입</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        id: '',
        name: '',
        password: '',
        passwordConfirm: '',
        grade: 'basic',
      },
      grades: [
        { text: '변호사', value: 'lawyer' },
        { text: '손해사정사', value: 'adjuster' },
        { text: '일반', value: 'basic' },
      ],
    };
  },
  methods: {
    async submit() {
      try {
        if (this.user.name === '') {
          alert('이름을 입력하세요.');
          return;
        }

        if (this.user.password !== this.user.passwordConfirm) {
          alert('패스워드가 일치하지 않습니다.');
          return;
        }

        const response = await this.$axios.post('/user/join', this.user);
        if (response.data.result === 'success') {
          alert('가입되었습니다.');
          this.$router.push('/login');
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error('Error during user registration:', error);
      }
    },
  },
};
</script>

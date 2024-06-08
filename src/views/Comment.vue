<template>
    <div>
      <v-textarea v-model="newComment" label="댓글"></v-textarea>
      <v-btn color="primary" @click="addComment">댓글 추가</v-btn>
      <v-list>
        <v-list-item v-for="comment in comments" :key="comment.id">
          <v-list-item-content>
            <v-list-item-title>{{ comment.writer }}</v-list-item-title>
            <v-list-item-subtitle>{{ comment.content }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action v-if="comment.writer === user?.username">
            <v-btn icon @click="deleteComment(comment.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newComment: '',
        comments: [],
        user: JSON.parse(localStorage.getItem('user')) || null
      };
    },
    props: {
      boardId: {
        type: Number,
        required: true
      }
    },
    mounted() {
      this.fetchComments();
    },
    methods: {
      fetchComments() {
        this.$axios.get(`/comments/${this.boardId}`)
          .then(response => {
            this.comments = response.data;
          })
          .catch(error => {
            console.error('Error fetching comments:', error);
          });
      },
      addComment() {
        if (!this.newComment.trim()) return;
  
        if (!this.user) {
          alert('로그인 후 댓글을 작성할 수 있습니다.');
          return;
        }
  
        this.$axios.post('/comments', {
          content: this.newComment,
          boardId: this.boardId,
          writer: this.user.id // 수정된 부분
        }).then(response => {
          this.comments.push(response.data);
          this.newComment = '';
        }).catch(error => {
          console.error('Error adding comment:', error);
        });
      },
      deleteComment(commentId) {
        if (!this.user) {
          alert('로그인 후 댓글을 삭제할 수 있습니다.');
          return;
        }
  
        this.$axios.delete(`/comments/${commentId}`, {
          data: { writer: this.user.username }
        }).then(response => {
          if (response.data.result === 'success') {
            this.comments = this.comments.filter(comment => comment.id !== commentId);
          }
        }).catch(error => {
          console.error('Error deleting comment:', error);
        });
      }
    },
    watch: {
      $route(to, from) {
        this.user = JSON.parse(localStorage.getItem('user')) || null;
      }
    }
  };
  </script>
  
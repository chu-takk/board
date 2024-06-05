<template>
    <v-text-field ref="title" v-model="board.title" label="제목"></v-text-field>
    <v-text-field ref="writer" v-model="board.writer" label="작성자"></v-text-field>
    <v-textarea ref="content" v-model="board.content" label="내용"></v-textarea>
    <div class="text-center">
        <v-btn color="primary" @click="submit">수정</v-btn>
    </div>
</template>
<script>
export default {
    data() {
        return {
            board: {
                title: "",
                writer: "",
                content: ""
            }
        }
    },
    mounted() {
        this.$axios.get("/board/" + this.$route.params.id)
            .then(response => {
                this.board = response.data;
            })
    },
    methods: {
        submit() {
            this.$axios.post("/board/modify", this.board)
                .then(response => {
                    if (response.data.result == "success") {
                        this.$router.push("/view/" + this.$route.params.id);
                    }
                })

        }
    }
}
</script>

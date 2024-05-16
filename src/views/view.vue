<template>
    <div class="board">
        <div class="title">{{ board.title }}</div>
        <div class="writer">{{ board.writer }}</div>
        <div class="write-date">{{ formattedDate(board.writeDate) }}</div>
        <div class="view-count">조회수 : {{ board.viewCount }}</div>
        <div class="content">{{ board.content }}</div>
        <v-layout>
            <v-btn color="primary" @click="moveList">목록</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="moveModify">수정</v-btn>
            <v-btn color="red"  @click="removeBoard">삭제</v-btn>
        </v-layout>
    </div>
</template>
<script>
import moment from "moment";
export default {
    data() {
        return {
            board: {
                title: "",
                writer: "",
                writeDate: "",
                content: ""
            }
        }
    },
    mounted() {
        var no = this.$route.params.id;
        this.$axios.get("/board/" + no)
            .then(response => {
                this.board = response.data;
            })

    },
    methods: {
        formattedDate(date) {
            return moment(date).format("YYYY-MM-DD HH:mm:ss")
        },
        moveModify(){
            this.$router.push("/modify/" + this.$route.params.id)
        },
        removeBoard(){
            this.$axios.delete("/board/" + this.$route.params.id)
            .then(response => {
                if (response.data.result == "success") {
                    alert("삭제완료")
                    this.$router.push("/")
                }
            })
        },

        moveList() {
            this.$router.push("/")
        }
    }
}
</script>
<style scoped lang="less">
.board {
    width: 800px;
    max-width: 100%;
    margin: 0 auto;
    background: #eee;

    .title {
        font-size: 24px;
        font-weight: bold;
        padding: 20px 0;
    }

    .writer {
        font-size: 18px;
        text-align: right;
    }

    .write-date {
        font-size: 14px;
        text-align: right;
    }

    .content {
        padding: 20px 0;
        min-height: 300px;
    }
}
</style>
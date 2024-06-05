<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th>글번호</th>
                    <th>제목</th>
                    <th>조회수</th>
                    <th>작성자</th>
                    <th>작성일</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="board in boardList" :key="board.no" @click="moveView(board)">
                    <td>
                        {{ board.no }}
                    </td>
                    <td>{{ board.title }}</td>
                    <td>{{ board.viewCount }}</td>
                    <td>{{ board.writer }}</td>
                    <td>{{ formattedWriteDate(board.writeDate) }}</td>
                </tr>
            </tbody>
        </table>

        <v-pagination :length="totalPage" @update:modelValue="updatePage"></v-pagination>

        <div class="text-right">
            <v-btn v-if="isLoggedIn" color="primary" variant="outlined" @click="moveWrite">글쓰기</v-btn>
        </div>
    </div>
</template>

<script>
import moment from "moment"
import { mapState } from 'vuex'

export default {
    data() {
        return { //변수를 선언하는 영역
            page: 1,
            totalPage: 0,
            boardList: []
        }
    },
    computed: {
        ...mapState(['loginUser']),
        isLoggedIn() {
            return this.loginUser !== null;
        }
    },
    mounted() {
        this.getBoardList();
    },
    methods: {
        formattedWriteDate(date) {
            return moment(date).format("YYYY-MM-DD HH:mm:ss")
        },

        updatePage(page) {
            console.log(page)
            this.page = page
            this.getBoardList()
        },
        getBoardList() {
            this.$axios.post("/board/list", { page: this.page })
                .then((response) => {
                    this.boardList = response.data.boardList;
                    this.totalPage = response.data.totalPage;
                })
        },

        moveWrite() {
            this.$router.push("/write");
        },
        moveView(board) {
            this.$router.push("/view/" + board.no);
        }
    }
}
</script>

<style lang="less">
@line-color: #999;

.red {
    color: red;
}

.green {
    color: green;
}

table {
    width: 100%;
    border-collapse: collapse;

    tr {
        cursor: pointer;

        &:hover {
            background-color: #f0f0f0;
        }
    }

    th,
    td {
        border-bottom: 1px solid @line-color;
    }
}
</style>

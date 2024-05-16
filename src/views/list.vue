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
                <tr v-for="board in boardList" @click="moveView(board)">
                    <td>
                        {{ board.no }}
                    </td>
                    <td>{{ board.title }}</td>
                    <td>{{ board.viewCount }}</td>
                    <td>
                        <div v-if="board.writerUser">
                            {{ board.writerUser.name }}
                        </div>
                    </td>
                    <td>{{ formattedWriteDate(board.writeDate) }}</td>
                </tr>
            </tbody>
        </table>

        <v-pagination :length="totalPage" @update:modelValue="updatePage"></v-pagination>

        <div class="text-right">
            <v-btn color="primary" variant="outlined" @click="moveWrite">글쓰기</v-btn>
        </div>
        <number-counter v-model="count1" label="값1"></number-counter>
        <number-counter v-model="count2" label="값2"></number-counter>
    </div>
</template>
<script>
import moment from "moment"
import NumberCounter from "@/components/NumberCounter.vue";

export default {
    components: {
        NumberCounter
    },
    data() {
        return { //변수를 선언하는 영역
            page: 1,
            count1:0,
            count2:0,
            totalPage: 0,
            boardList: []
        }
    },
    computed: {
        ageSum() {
            let sum = 0;
            for (let i = 0; i < this.arr.length; i++) {
                sum += this.arr[i].age;
            }
            return sum;
        }
    },
    mounted(){
        this.getBoardList();

    },
    methods: {
        formattedWriteDate(date) {
            return moment(date).format("YYYY-MM-DD")
        },

        updatePage(page){
            console.log(page)
            this.page = page
            this.getBoardList()
        },
        getBoardList(){
            this.$axios.post("/board/list", { page : this.page })
            .then((response) =>{
                this.boardList = response.data.boardList;
                this.totalPage = response.data.totalPage;
            })

        },

        addPerson() {
            this.arr.push({
                name: this.name,
                age: this.age
            })
        },
        moveWrite() {
            if(this.$store.state.loginUser){
                this.$router.push("/write");
            }
            else{
                alert("로그인이 필요합니다.")
                this.$router.push("/login")
            }
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

// table th, table td{
//     border-bottom:1px solid #999;
// }
</style>
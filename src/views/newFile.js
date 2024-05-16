import moment from "moment";

export default (await import('vue')).defineComponent({
data() {
return {
page: 1,
totalPage: 0,
boardList: []
};
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
mounted() {
this.getBoardList();

},
methods: {
formattedWriteDate(date) {
return moment(date).format("YYYY-MM-DD");
},

updatePage(page) {
console.log(page);
this.page = page;
this.getBoardList();
},
getBoardList() {
this.$axios.post("/board/list", { page: this.page })
.then((response) => {
this.boardList = response.data.boardList;
this.totalPage = response.data.totalPage;
});

},

addPerson() {
this.arr.push({
name: this.name,
age: this.age
});
},
moveWrite() {
this.$router.push("/write");
},
moveView(board) {
this.$router.push("/view/" + board.no);
}
}
});

<template>
    <div class="board">
        <div class="title">{{ board.title }}</div>
        <div class="writer">{{ board.writer }}</div>
        <div class="write-date">{{ formattedDate(board.writeDate) }}</div>
        <div class="view-count">조회수 : {{ board.viewCount }}</div>
        <div class="content">{{ board.content }}</div>

        <!-- 지도 및 로드뷰 레이아웃 -->
        <v-card>
            <v-card-title>지도 및 로드뷰</v-card-title>
            <v-card-text>
                <div id="map" class="map-roadview"></div>
                <div id="roadview" class="map-roadview"></div>
            </v-card-text>
        </v-card>

        <v-layout>
            <v-btn color="primary" @click="moveList">목록</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" v-if="isAuthor" @click="moveModify">수정</v-btn>
            <v-btn color="red" v-if="isAuthor" @click="removeBoard">삭제</v-btn>
        </v-layout>

        <!-- 댓글 컴포넌트 추가 -->
        <comment :board-id="this.$route.params.id"></comment>
    </div>
</template>

<script>
import moment from "moment";
import Comment from './Comment.vue';  // 경로를 수정

export default {
    components: {
        Comment
    },
    data() {
        return {
            board: {
                title: "",
                writer: "",
                writeDate: "",
                content: "",
                address: "",
                latitude: null,
                longitude: null
            },
            isAuthor: false
        };
    },
    mounted() {
        const no = this.$route.params.id;
        const user = JSON.parse(localStorage.getItem('user'));
        this.$axios.get(`/board/${no}`)
            .then(response => {
                this.board = response.data;
                this.isAuthor = user && user.username === this.board.writer;
                if (this.board.latitude && this.board.longitude) {
                    this.$nextTick(() => {
                        this.displayMap();
                        this.displayRoadview();
                    });
                } else {
                    console.error("좌표 정보가 없습니다.");
                }
            })
            .catch(error => {
                console.error("Error fetching board data:", error);
            });
    },
    methods: {
        formattedDate(date) {
            return moment(date).format("YYYY-MM-DD HH:mm:ss");
        },
        moveModify() {
            this.$router.push(`/modify/${this.$route.params.id}`);
        },
        removeBoard() {
            this.$axios.delete(`/board/${this.$route.params.id}`)
                .then(response => {
                    if (response.data.result === "success") {
                        alert("삭제되었습니다.");
                        this.$router.push("/");
                    }
                })
                .catch(error => {
                    console.error("Error deleting board:", error);
                });
        },
        moveList() {
            this.$router.push("/");
        },
        displayMap() {
            if (this.board.latitude && this.board.longitude) {
                const mapContainer = document.getElementById('map');
                const mapOption = {
                    center: new kakao.maps.LatLng(this.board.latitude, this.board.longitude),
                    level: 3
                };
                const map = new kakao.maps.Map(mapContainer, mapOption);
                const marker = new kakao.maps.Marker({
                    position: new kakao.maps.LatLng(this.board.latitude, this.board.longitude)
                });
                marker.setMap(map);
            } else {
                console.error("위치 정보를 불러올 수 없습니다.");
            }
        },
        displayRoadview() {
            if (this.board.latitude && this.board.longitude) {
                const roadviewContainer = document.getElementById('roadview');
                const roadview = new kakao.maps.Roadview(roadviewContainer);
                const roadviewClient = new kakao.maps.RoadviewClient();
                const position = new kakao.maps.LatLng(this.board.latitude, this.board.longitude);
                roadviewClient.getNearestPanoId(position, 50, (panoId) => {
                    if (panoId !== null) {
                        roadview.setPanoId(panoId, position);
                    } else {
                        console.warn("해당 위치의 로드뷰가 없습니다.");
                        roadviewContainer.style.display = 'none';
                    }
                });
            } else {
                console.error("위치 정보를 불러올 수 없습니다.");
            }
        }
    }
};
</script>

<style scoped>
.map-roadview {
    width: 50%;
    height: 500px;
}
</style>

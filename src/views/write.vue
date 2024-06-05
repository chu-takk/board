<template>
    <div>
        <v-text-field ref="title" v-model="board.title" label="제목"></v-text-field>
        <v-text-field ref="writer" v-model="board.writer" label="작성자" readonly></v-text-field>
        <v-textarea ref="content" v-model="board.content" label="내용"></v-textarea>
        <v-text-field ref="address" v-model="board.address" label="주소" @focus="openAddressSearch"></v-text-field>
        
        <v-card>
            <v-card-title>지도 및 로드뷰</v-card-title>
            <v-card-text>
                <div id="map" class="map-roadview"></div>
                <div id="roadview" class="map-roadview"></div>
            </v-card-text>
        </v-card>
        
        <div class="text-center" style="margin-top: 20px;">
            <v-btn color="primary" @click="submit">작성</v-btn>
        </div>

        <div v-if="showAddressSearch" class="address-search-modal">
            <div id="postcode-container" style="width:100%;height:350px;"></div>
            <v-btn color="red" @click="closeAddressSearch">닫기</v-btn>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data() {
        return {
            board: {
                title: "",
                writer: "",
                content: "",
                address: "",
                latitude: null,
                longitude: null
            },
            showAddressSearch: false,
            map: null,
            roadview: null,
            roadviewMarker: null
        }
    },
    computed: {
        ...mapState(['loginUser'])
    },
    mounted() {
        if (this.loginUser) {
            this.board.writer = this.loginUser.name;
        }
    },
    methods: {
        submit() {
            if (this.board.title === "" || this.board.content === "") {
                alert("제목과 내용을 입력하세요");
                return;
            }
            this.$axios.post("/board/write", this.board)
                .then(response => {
                    alert("글이 작성되었습니다");
                    this.$router.push("/view/" + response.data.no);
                });
        },
        openAddressSearch() {
            this.showAddressSearch = true;
            this.$nextTick(() => {
                new daum.Postcode({
                    oncomplete: data => {
                        this.board.address = data.address;
                        this.getCoordinates(data.address);
                    }
                }).embed(document.getElementById('postcode-container'));
            });
        },
        getCoordinates(address) {
            const geocoder = new kakao.maps.services.Geocoder();
            geocoder.addressSearch(address, (result, status) => {
                if (status === kakao.maps.services.Status.OK) {
                    const coords = result[0];
                    this.board.latitude = coords.y;
                    this.board.longitude = coords.x;
                    this.showAddressSearch = false;
                    this.$nextTick(() => {
                        this.displayMap();
                        this.displayRoadview();
                    });
                }
            });
        },
        displayMap() {
            const mapContainer = document.getElementById('map');
            const mapOption = {
                center: new kakao.maps.LatLng(this.board.latitude, this.board.longitude),
                level: 3
            };
            this.map = new kakao.maps.Map(mapContainer, mapOption);
            const marker = new kakao.maps.Marker({
                position: new kakao.maps.LatLng(this.board.latitude, this.board.longitude)
            });
            marker.setMap(this.map);
        },
        displayRoadview() {
            const roadviewContainer = document.getElementById('roadview');
            const roadview = new kakao.maps.Roadview(roadviewContainer);
            const roadviewClient = new kakao.maps.RoadviewClient();
            const position = new kakao.maps.LatLng(this.board.latitude, this.board.longitude);
            roadviewClient.getNearestPanoId(position, 50, panoId => {
                if (panoId !== null) {
                    roadview.setPanoId(panoId, position);
                    this.roadviewMarker = new kakao.maps.Marker({
                        position: position,
                        draggable: true
                    });
                    this.roadviewMarker.setMap(this.map);
                    kakao.maps.event.addListener(this.roadviewMarker, 'dragend', () => {
                        const markerPosition = this.roadviewMarker.getPosition();
                        this.board.latitude = markerPosition.getLat();
                        this.board.longitude = markerPosition.getLng();
                        roadview.setViewpoint(markerPosition);
                    });
                } else {
                    console.warn("해당 위치의 로드뷰가 없습니다.");
                    roadviewContainer.style.display = 'none';
                }
            });
        }
    }
}
</script>

<style scoped>
.address-search-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    border: 1px solid #ccc;
    padding: 20px;
    z-index: 1000;
}
.map-roadview {
    width: 50%;
    height: 500px;
}
</style>

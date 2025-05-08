<template>
  <div>
    <h1 class="title-xxlarge">{{ $t("menu_0104_오시는길") }}</h1>

    <div class="bg-gap-3"></div>
    <div id="map" class="center_all" style="height: 300px; width: 100%;" aria-hidden="true"></div>

    <div class="bg-gap-2"></div>
    <div class="d-flex ">
      <div class="mr-2 font-bold">보라매안전체험관</div>
      <v-divider :aria-hidden="true" vertical class="ml-2 mr-2"></v-divider>
      <div>주소 : (07062) 서울특별시 동작구 여의대방로 20나길 16 (신대방동 772) 보라매안전체험관</div>
    </div>

    <div class="bg-gap-2"></div>
    <div>
      <v-row>
        <v-col cols="12" md="6" sm="12">
          <h2 class="title-xlarge">지하철</h2>
          <div class="d-flex">
            <v-icon aria-hidden="true" size="100" color="grey">mdi-subway</v-icon>
            <div class="ml-4">
              <div class="d-flex ">
                <span class="center_all" style="color:white; border-radius: 100%; background-color:	#02A94E; width :30px; height :30px;">5</span>
                <span style="margin-top: 3px; margin-left: 10px;">신대방역 2번 출구 > 약 905M (도보 15분)</span>
              </div>

              <div class="d-flex mt-6">
                <span class="center_all" style="color:white; border-radius: 100%; background-color: #3C690F; width :30px; height :30px;">7</span>
                <span style="margin-top: 3px; margin-left: 10px;">보라매역 2번 출구 > 약 989M (도보 17분)</span>
              </div>
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <h2 class="title-xlarge">버스</h2>
          <div class="d-flex">
            <v-icon aria-hidden="true" size="100" color="grey">mdi-bus</v-icon>
            <div class="ml-4">
              <ul>
                <li>1. 보라매공원 정문입구(정류장명 - 동작세무서, 보라매공원 정문)</li>
                <ul>
                  <li>간선버스(파랑) : 150번, 505번</li>
                  <li>지선버스(초록) : 5531번, 5536번, 5623번, 5634번</li>
                </ul>
              </ul>
              <ul>
                <li>2. 보라매공원 동문입구(정류장명 - 보라매공원 후문, 전문건설회관, 롯데관악점 하차)</li>
                <ul>
                  <li>간선버스(파랑) : 152번, 461번</li>
                  <li>지선버스(초록) : 6514번, 6515번, 6511번, 5522A, 5522B</li>
                </ul>
              </ul>
              <ul>
                <li>3. 롯데백화점, 전문건설회관, 보라매병원 정류장 하차시(보라매공원 동문) : 도보(14분 소요)</li>
                <ul>
                  <li>보라매병원 앞에서 보라매공원 동문 방향으로 3분도보 > 보라매공원 동문 진입하여 8분도보 > 음악분수 방향으로 3분 도보 > 보라매안전체험관 마을</li>
                </ul>
              </ul>
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <h2 class="title-xlarge">자가용</h2>
          <div class="d-flex">
            <v-icon aria-hidden="true" size="100" color="grey">mdi-car</v-icon>
            <div class="ml-4">
              <ul>
                <li>“동작구시설관리공단” 또는 “동작구 신대방동 722”로 내비게이션 검색</li>
              </ul>

              <div class="d-flex">
                <v-icon aria-hidden="true" size="20" color="grey" style="margin-top: 3px;">mdi-alert-circle</v-icon>
                <div class="ml-1">
                  체험관내에는 별도의 주차장이 없으므로 대중교통을 이용하시거나, 어린이대공원 주차장(유료)를 이용하시기 바랍니다.
                </div>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      map : null,
      iInitLevel : 2,
    };
  },

  components:{
  },

  mounted() {
    this.initMap();
  },

  beforeUnmount(){
  },

  methods : {
    initMap() {
      var CenterLatLon = new kakao.maps.LatLng(37.4927707041682, 126.91702284245584);
      
      const options = {
        center: CenterLatLon,
        level: this.iInitLevel,
      };

      this.map = new kakao.maps.Map(document.getElementById("map"), options);

      var marker = new kakao.maps.Marker({
        position: CenterLatLon
      });

      marker.setMap(this.map);
    },
  },
};
</script>

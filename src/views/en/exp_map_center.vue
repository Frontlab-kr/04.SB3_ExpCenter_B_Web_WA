<template>
  <div>
    <h1 class="title-xxlarge">{{ $t("menu_0104_오시는길") }}</h1>

    <div class="bg-gap-3"></div>
    <div id="map" class="center_all" style="height: 300px; width: 100%;" aria-hidden="true"></div>

    <div class="bg-gap-2"></div>
    <div class="d-flex ">
      <div class="mr-2 font-bold">Boramae Safety Experience Center</div>
      <v-divider :aria-hidden="true" vertical class="ml-2 mr-2"></v-divider>
      <div>Address: (07062) Boramae Safety Experience Center, 16, Yeouidaebang-ro 20na-gil, Dongjak-gu, Seoul (Sindaebang-dong 772)</div>
    </div>

    <div class="bg-gap-2"></div>
    <div>
      <v-row>
        <v-col cols="12" md="6" sm="12">
          <h2 class="title-xlarge">Subway</h2>
          <div class="d-flex">
            <v-icon aria-hidden="true" size="100" color="grey">mdi-subway</v-icon>
            <div class="ml-4">
              <div class="d-flex ">
                <span class="center_all" style="color:white; border-radius: 100%; background-color:	#02A94E; width :30px; height :30px;">5</span>
                <span style="margin-top: 3px; margin-left: 10px;">Sindaebang Station Exit 2 > About 905M (15-minute walk)</span>
              </div>

              <div class="d-flex mt-6">
                <span class="center_all" style="color:white; border-radius: 100%; background-color: #3C690F; width :30px; height :30px;">7</span>
                <span style="margin-top: 3px; margin-left: 10px;">Boramae Station Exit 2 > About 989M (17-minute walk)</span>
              </div>
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <h2 class="title-xlarge">Bus</h2>
          <div class="d-flex">
            <v-icon aria-hidden="true" size="100" color="grey">mdi-bus</v-icon>
            <div class="ml-4">
              <ul>
                <li>1. Boramae Park Main Entrance (Bus Stop - Dongjak Tax Office, Boramae Park Main Entrance)</li>
                <ul>
                  <li>Main Bus (Blue): No. 150, 505</li>
                  <li>Branch Bus (Green): No. 5531, 5536, 5623, 5634</li>
                </ul>
              </ul>
              <ul>
                <li>2. Boramae Park East Entrance (Bus Stop - Boramae Park Back Gate, Construction Hall, Lotte Gwanak Branch)</li>
                <ul>
                  <li>Main Bus (Blue): No. 152, 461</li>
                  <li>Branch Bus (Green): No. 6514, 6515, 6511, 5522A, 5522B</li>
                </ul>
              </ul>
              <ul>
                <li>3. Lotte Department Store, Construction Hall, Boramae Hospital Stop (Boramae Park East Gate): Walking (14 minutes)</li>
                <ul>
                  <li>Walk 3 minutes towards Boramae Park East Gate from Boramae Hospital > Enter Boramae Park East Gate and walk 8 minutes > Walk 3 minutes towards the music fountain > Boramae Safety Experience Center village</li>
                </ul>
              </ul>
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <h2 class="title-xlarge">Car</h2>
          <div class="d-flex">
            <v-icon aria-hidden="true" size="100" color="grey">mdi-car</v-icon>
            <div class="ml-4">
              <ul>
                <li>Search “Dongjak Facilities Management Corporation” or “Dongjak-gu Sindaebang-dong 722” in navigation</li>
              </ul>

              <div class="d-flex">
                <v-icon aria-hidden="true" size="20" color="grey" style="margin-top: 3px;">mdi-alert-circle</v-icon>
                <div class="ml-1">
                  There is no dedicated parking lot at the experience center, so please use public transportation or the nearby children's park parking lot (paid).
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
      map: null,
      iInitLevel: 2,
    };
  },

  components:{
  },

  mounted() {
    this.initMap();
  },

  beforeUnmount(){
  },

  methods: {
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

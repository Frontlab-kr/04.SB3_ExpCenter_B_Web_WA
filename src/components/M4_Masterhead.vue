<template>
  <div :class="$route.path == '/'?'main_bg':'nor_bg'" style="height: 35px !important;">
    <div id="seoul-common-gnb" style="display: none;"></div>
    <div class="v-container pa-0 center_left label-small pl-4" style="height: 35px !important;">
      <!-- # router이동 시 초점을 target 하기 위해 data-focus 속성 추가 -->
      <!-- <img v-if="$route.path == '/'" src="/seoul_logo_white.svg" class="mouse-cur" data-focus style="margin-top: -4px; height: 20px;"  tabindex="0" @click="gotoUrl('https://www.seoul.go.kr')" @keydown.enter="gotoUrl('https://www.seoul.go.kr')" role="link" alt="서울특별시 누리집 새창열림"/>
      <img v-else src="/seoul_logo.svg" class="mouse-cur" data-focus style="margin-top: -4px; height: 20px;"  tabindex="0" @click="gotoUrl('https://www.seoul.go.kr')" @keydown.enter="gotoUrl('https://www.seoul.go.kr')" role="link" alt="서울특별시 누리집 새창열림"/> -->
      <img src="/seoul_logo_white.svg" class="mouse-cur" data-focus style="margin-top: -4px; height: 20px;"  tabindex="0" @click="gotoUrl('https://www.seoul.go.kr')" @keydown.enter="gotoUrl('https://www.seoul.go.kr')" role="link" alt="서울특별시 누리집 새창열림"/>
      <!-- 서울 GNB 스크립트 -->
      <div title="서울소식 새창열림" class="d-none d-md-flex ml-5 mr-3" variant="plain" icon @click="gotoUrl('https://www.seoul.go.kr/realmnews/in/list.do')">
        <!-- <v-icon aria-hidden="true" color="#ffffff" v-if="$route.path == '/'"  >mdi-volume-high</v-icon>
        <v-icon aria-hidden="true" color="#222222" v-else >mdi-volume-high</v-icon> -->
        <v-icon aria-hidden="true" color="#ffffff">mdi-volume-high</v-icon>
      </div>
      <div class="d-none d-md-flex mouse-cur ml-n1" tabindex="0" @click="gotoUrl(cGnbLink)" @keydown.enter="gotoUrl(cGnbLink)" role="link" title="새창열림">{{ cGnbTitle }}</div>

      <v-spacer></v-spacer>
      <!-- 서울소식/응답소/정보공개 등 -->
      <div class="pa-1 rounded-0 mr-1 mouse-cur detail-small" tabindex="0"  @keydown.enter="gotoUrl('https://www.seoul.go.kr/realmnews/in/list.do')" @click="gotoUrl('https://www.seoul.go.kr/realmnews/in/list.do')" role="link" title="새창열림">{{ $t("masterhead_title_1") }}</div>
      <div class="pa-1 rounded-0 mr-1 mouse-cur detail-small" tabindex="0"  @keydown.enter="gotoUrl('http://eungdapso.seoul.go.kr/')" @click="gotoUrl('http://eungdapso.seoul.go.kr/')" role="link" title="새창열림">{{ $t("masterhead_title_2") }}</div>
      <div class="pa-1 rounded-0 mr-1 mouse-cur detail-small" tabindex="0"  @keydown.enter="gotoUrl('http://opengov.seoul.go.kr/')" @click="gotoUrl('http://opengov.seoul.go.kr/')" role="link" title="새창열림">{{ $t("masterhead_title_3") }}</div>

      <!-- 분야별 정보 -->
      <v-menu>
        <template v-slot:activator="{ props }">                    
          <button class="pa-1 rounded-0 mr-2 mouse-cur detail-small" @click="nowSel" tabindex="0" v-bind="props" title=" 열기">{{ $t("masterhead_title_4") }}</button>
        </template>
  
        <v-card width="300">
          <div class="pa-3" style="background-color: var(--secondary-40);">
            <div class="d-flex center_all" style="height: 20px;">
              <div class="ml-2" style="color:white">{{ $t("masterhead_title_4") }}</div>
              <v-spacer></v-spacer>
              <v-btn @click="onCloseMenu()" variant="plain" class="mr-n2" icon size="small" style="color:white" title="닫기"><v-icon aria-hidden="true">mdi-close</v-icon></v-btn>
            </div>
          </div>

          <div class="center_all pa-4"  style="width: 100%; background-color: var(--secondary-10);">
            <div class="d-flex justify-space-around" style="width: 100%;">
              <button class="text-center mouse-cur" tabindex="0" @click="gotoUrl('http://news.seoul.go.kr/citybuild/')" @keydown.enter="gotoUrl('http://news.seoul.go.kr/citybuild/')" title="새창열기" >
                <img src="/contents/image/master_header_01.png" alt="" style="width: 80px;" />
                <div>{{ $t("masterhead_subtitle_1") }}</div>
              </button>
              <button class="text-center mouse-cur" tabindex="0" @click="gotoUrl('http://news.seoul.go.kr/economy/')" @keydown.enter="gotoUrl('http://news.seoul.go.kr/economy/')" title="새창열기">
                <img src="/contents/image/master_header_02.png" alt="" style="width: 80px;" />
                <div >{{ $t("masterhead_subtitle_2") }}</div>
              </button>
            </div>
          </div>
          <div class="center_all pa-4" style="width: 100%; background-color: var(--secondary-10);">
            <div class="d-flex justify-space-around" style="width: 100%;">
              <button class="text-center mouse-cur" tabindex="0" @click="gotoUrl('http://news.seoul.go.kr/traffic/')" @keydown.enter="gotoUrl('http://news.seoul.go.kr/traffic/')" title="새창열기">
                <img src="/contents/image/master_header_03.png" alt="" style="width: 80px;" />
                <div>{{ $t("masterhead_subtitle_3") }}</div>
              </button>
              <button class="text-center mouse-cur" tabindex="0" @click="gotoUrl('http://news.seoul.go.kr/env/')" @keydown.enter="gotoUrl('http://news.seoul.go.kr/env/')" title="새창열기">
                <img src="/contents/image/master_header_04.png" alt="" style="width: 80px;" />
                <div>{{ $t("masterhead_subtitle_4") }}</div>
              </button>
            </div>
          </div>
          <div class="center_all pa-4"  style="width: 100%; background-color: var(--secondary-10);">
            <div class="d-flex justify-space-around" style="width: 100%;">
              <button class="text-center mouse-cur" tabindex="0" @click="gotoUrl('http://news.seoul.go.kr/welfare/')" @keydown.enter="gotoUrl('http://news.seoul.go.kr/welfare/')" title="새창열기">
                <img src="/contents/image/master_header_05.png" alt="" style="width: 80px;" />
                <div>{{ $t("masterhead_subtitle_5") }}</div>
              </button>
              <button class="text-center mouse-cur" tabindex="0" @click="gotoUrl('http://news.seoul.go.kr/safe/')" @keydown.enter="gotoUrl('http://news.seoul.go.kr/safe/')" title="새창열기">
                <img src="/contents/image/master_header_06.png" alt="" style="width: 80px;" />
                <div>{{ $t("masterhead_subtitle_6") }}</div>
              </button>
            </div>
          </div>
          <div class="center_all pa-4"  style="width: 100%; background-color: var(--secondary-10);">
            <div class="d-flex justify-space-around" style="width: 100%;">
              <button class="text-center mouse-cur" tabindex="0" @click="gotoUrl('http://news.seoul.go.kr/culture/')" @keydown.enter="gotoUrl('http://news.seoul.go.kr/culture/')" title="새창열기">
                <img src="/contents/image/master_header_05.png" alt="" style="width: 80px;" />
                <div>{{ $t("masterhead_subtitle_7") }}</div>
              </button>
              <button class="text-center mouse-cur" tabindex="0" @click="gotoUrl('http://news.seoul.go.kr/gov/')" @keydown.enter="gotoUrl('http://news.seoul.go.kr/gov/')" title="새창열기">
                <img src="/contents/image/master_header_06.png" alt="" style="width: 80px;" />
                <div>{{ $t("masterhead_subtitle_8") }}</div>
              </button>
            </div>
          </div>

          <v-divider :aria-hidden="true"></v-divider>
          <v-btn class="" variant="text" block size="large" @click="gotoUrl('https://news.seoul.go.kr/')" title="새창열기">{{ $t("masterhead_subtitle_9") }}</v-btn>
        </v-card>
      </v-menu>
    </div>
  </div>
  <v-divider :aria-hidden="true"></v-divider>
</template>

<script>

export default {
  data() {
    return {
      menu : null,
      isOpen: false,
      cGnbLink: "",
      cGnbTitle: "",
    };
  },

  mounted() {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//www.seoul.go.kr/seoulgnb/gnb.js'; /* 서울 GNB 스크립트 URL */
    
    script.onload = () => {
      Yjs.Gnb.init('G078', 'seoul-common-gnb');

      let oInterval = setInterval(() => {
        this.SetGNBNewsContent(oInterval)
      }, 10);
    };
    document.body.appendChild(script);
  },

  watch: {
  },

  methods : {
    gotoUrl(path) {
      window.open(path, "_blank");
    },

    nowSel(){
      this.menu = document.activeElement;
      console.log(this.menu);
    },

    onCloseMenu() {
      setTimeout(() => {        
        this.menu.focus();
      }, 10);
    },

    SetGNBNewsContent(oInterval) {
      var ddElement = document.querySelector('.seoul-gnb-news dd a');
      var ddElement2 = document.querySelector('.hd-element');

      if (ddElement && ddElement2) {
        this.cGnbLink = ddElement.getAttribute('href');
        this.cGnbTitle = ddElement.textContent;
        ddElement2.style.fontSize = '40px';

        clearInterval(oInterval)
      }
    }
  },
};
</script>

<style scoped>
  .main_bg {
    /* background: #000000;
    color : var(--gray-40); */
    background: #0c82e9;
    color : white;
  }
  
  .nor_bg {
    /* background: var(--secondary-5);
    color : var(--gray-80); */
    background: #0c82e9;
    color : white;
  }
</style>
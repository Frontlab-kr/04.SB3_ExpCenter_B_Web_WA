<template>
  <div style="overflow: hidden;">
    <div class="v-container label-small pa-0">
      <div class="ma-1 d-none d-md-flex">
        <v-spacer></v-spacer>
        <!-- <v-btn variant="plain" density="compact" class="pa-0 " style="font-size:15px;" aria-label="서울소방재난본부 새 창 열기" @click="onM4_Header_top_menu1()">서울소방재난본부<v-icon aria-hidden="true" class="ml-1" size="19px" style="margin-top: 4px;">mdi-open-in-new</v-icon></v-btn>
        <v-divider :aria-hidden="true" vertical class="mt-1 ml-2 mr-2"></v-divider> -->
        <v-btn variant="plain" density="compact" class="pa-0 " style="font-size:15px;" aria-label="언어 지원" @click="onM4_Header_top_menu2()">지원<v-icon aria-hidden="true" class="ml-1" size="19px" style="margin-top: 4px;">mdi-chevron-down</v-icon></v-btn>
        <v-divider :aria-hidden="true" vertical class="mt-1 ml-2 mr-2"></v-divider>
        <v-btn variant="plain" density="compact" class="pa-0 " style="font-size:15px;" aria-label="화면크기 설정" @click="onM4_Header_top_menu3()">화면크기<v-icon aria-hidden="true" class="ml-1" size="19px" style="margin-top: 4px;">mdi-chevron-down</v-icon></v-btn>
        <v-divider :aria-hidden="true" vertical class="mt-1 ml-2 mr-2"></v-divider>
        <v-btn variant="plain" density="compact" class="pa-0 " style="font-size:15px;text-transform: none;" @click="onM4_Header_top_menu4()">Language<v-icon aria-hidden="true" class="ml-1" size="19px" style="margin-top: 4px;">mdi-chevron-down</v-icon></v-btn>
      </div>

      <div class="d-none d-md-flex align-end mb-2 center_left">
        <img class="mouse-cur" src="@/assets/main_logo.svg" alt="서울소방재난본부 로고" tabindex="0" role="link" @click="on_main_logo()" @keydown.enter="on_main_logo()"/>
        <div class="ml-4 title-xxlarge center_left pt-1" style="height: 50px;">보라매 안전체험관</div>
        <v-spacer></v-spacer>
        <v-btn variant="plain" class="mr-2 body-medium font-bold " @click="goSearch(); $store.state.now_main_menu_idx = -1;"><v-icon aria-hidden="true" class="mr-1" size="20px">mdi-magnify</v-icon>통합검색</v-btn>
        <!-- <v-btn variant="plain" class="mr-2 body-medium font-bold "><v-icon aria-hidden="true" class="mr-1" size="20px">mdi-login</v-icon>로그인</v-btn>
        <v-btn variant="plain" class="mr-2 body-medium font-bold "><v-icon aria-hidden="true" class="mr-1" size="20px">mdi-account-plus</v-icon>회원가입</v-btn> -->
      </div>

      <div class="d-flex d-md-none align-end mb-2 center_left">
        <img class="ml-2 mouse-cur" src="@/assets/main_logo.svg" width="50px" alt="서울소방재난본부 로고" tabindex="0" role="link"  @click="on_main_logo()" @keydown.enter="on_main_logo()"/>
        <div class="ml-1 title-large center_left pl-2 pt-3" style="height: 50px;">보라매 안전체험관</div>
        <v-spacer></v-spacer>
        <v-btn variant="plain" class="mr-1 body-small" @click="showMenuAll()" style="width: 25px;height:55px;">
          <div>
            <v-icon aria-hidden="true" class="mb-1" size="25px">mdi-magnify</v-icon>
            <div >통합검색</div>
          </div>
        </v-btn>
        <v-btn variant="plain" class="mr-2 body-small" @click="showMenuAll()" style="width: 25px;height:55px;">
          <div>
            <v-icon aria-hidden="true" class="mb-1" size="25px">mdi-menu</v-icon>
            <div >전체메뉴</div>
          </div>
        </v-btn>
      </div>
    </div>
    <v-divider :aria-hidden="true"></v-divider>
    <div class="v-container pa-0 d-none d-md-flex">
      <div v-for="(item, i) in $store.state.main_menu" :key="i" class="d-flex align-center justify-start body-large" style="height: 56px;">

        <div v-if="item.isMainMenu"  role="button" tabindex="0" @click="showMenu(item.idx)" @keydown.enter="showMenu(item.idx)"
          :class="'d-flex pl-3 pr-3 align-center mouse-cur '+($store.state.now_main_menu_idx==item.idx?'menu_sel':'menu_nor')">
          <div :class="($store.state.now_main_menu_idx==item.idx?'menu_font_sel':'menu_font_nor') + ' ml-2 body-medium font-bold'">
            {{ item.name }}<v-icon aria-hidden="true" class="ml-1" size="20px">{{$store.state.now_main_menu_idx==item.idx?'mdi-chevron-up':'mdi-chevron-down'}}</v-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
  <v-divider :aria-hidden="true"></v-divider>

  <div class="background_main">
    <v-expand-transition>
      <div class="background_main2 " v-if="$store.state.now_main_menu_idx != -1 && $store.state.now_main_menu_idx !=undefined" >
        <v-divider :aria-hidden="true"></v-divider>
        <div class="v-container label-small pa-0 d-none d-md-flex" >
          <div style="min-width: 200px; background : var(--secondary-5); height: 500px; overflow: auto !important;">
            <div  v-for="(item, i) in $store.state.main_menu[$store.state.now_main_menu_idx].menu_dept1" :key="i">
              <div :class="'d-flex font-bold mouse-cur ' + ($store.state.now_main_menu_dept2_idx == item.idx?'selected-item':'nor-item')" @click="onSelect(item)" @keydown.enter="onSelect(item)" tabindex="0">
                {{ item.name }} <div v-if="item.path.startsWith('http')"> <v-icon aria-hidden="true" class="ml-1" size="19px" style="margin-top: 2px;">mdi-open-in-new</v-icon></div>
              </div>
            </div>
          </div>

          <div class="pa-5 pl-7" style="width: calc(100vw - 200px); height: 500px; overflow: auto !important;" >
            <div v-if="$store.state.main_menu[$store.state.now_main_menu_idx].menu_dept1[$store.state.now_main_menu_dept2_idx].menu_dept2 == undefined" class="font-bold title-xlarge mb-5"
              tabindex="0" style="cursor: pointer;" @click="goMenu($store.state.main_menu[$store.state.now_main_menu_idx].menu_dept1[$store.state.now_main_menu_dept2_idx])" @keydown.enter="goMenu($store.state.main_menu[$store.state.now_main_menu_idx].menu_dept1[$store.state.now_main_menu_dept2_idx])">
              {{$store.state.main_menu[$store.state.now_main_menu_idx].menu_dept1[$store.state.now_main_menu_dept2_idx].name}}
            </div>
            <div v-else class="font-bold title-xlarge mb-5">
              {{$store.state.main_menu[$store.state.now_main_menu_idx].menu_dept1[$store.state.now_main_menu_dept2_idx].name}}
            </div>
            <v-row >
              <v-col cols="12" md="4" sd="12" class="mb-2" v-for="(item, i) in $store.state.main_menu[$store.state.now_main_menu_idx].menu_dept1[$store.state.now_main_menu_dept2_idx].menu_dept2" :key="i">
                <div class="d-flex body-large font-bold  mouse-cur" role="link" tabindex="0" style="cursor: pointer;" @click="goMenu(item)" @keydown.enter="goMenu(item)">
                  {{ item.name }}
                  <div v-if="item.path.startsWith('http')"> <v-icon aria-hidden="true" class="ml-1" size="22px" style="margin-top: -2px;">mdi-open-in-new</v-icon></div>
                </div>
                <v-divider class="mb-2 mt-2"></v-divider>
                {{ item.caption }}
              </v-col>
            </v-row>

            <div v-if="$store.state.main_menu[$store.state.now_main_menu_idx].menu_dept1[$store.state.now_main_menu_dept2_idx].new_menu != null" class="pa-4 mt-3" style="background-color: var(--gray-5); border-radius: 5px;" @click="goMenu(item)" @keydown.enter="goMenu(item)">
              <v-chip label style="background-color: var(--primary-color); color:#ffffff;" class="mr-2" >신규 서비스</v-chip> {{$store.state.main_menu[$store.state.now_main_menu_idx].menu_dept1[$store.state.now_main_menu_dept2_idx].new_menu.name}}
            </div>
          </div>
        </div>
      </div>
    </v-expand-transition>
    <div class="d-none d-md-flex background_main3" v-if="($store.state.now_main_menu_idx != -1 && $store.state.now_main_menu_idx !=undefined)" @click="$store.state.now_main_menu_idx = -1;"></div>

    <v-navigation-drawer
      v-model="drawer"
      temporary clipped
      :style="(drawer?'width: 330px !important;':'')"
      >
      <div class="d-flex" style="height: 100vh;" >
        <div style="width: 120px;">
          <div v-for="(item, i) in $store.state.main_menu" :key="i" role="button" tabindex="0" @click="showMenuNav(item.idx)" :class="'d-flex align-center mouse-cur '+($store.state.now_nav_menu_idx==item.idx?'menu_sel':'menu_nor')">
            <div :class="($store.state.now_nav_menu_idx==item.idx?'menu_font_sel':'menu_font_nor') + ' ml-2 body-medium font-bold'">
              {{ item.name }}
            </div>
          </div>
        </div>
        <v-divider :aria-hidden="true" vertical ></v-divider>
        <M4_Navigation @onGoMenu="drawer = false;" ref="M4_Navigation_ref"></M4_Navigation>
      </div>
      
    </v-navigation-drawer>
  </div>
</template>

<script>
import { EventBus } from '@/EventBus.js';


export default {
  data() {
    return {
      drawer : false,
      overlay : false,
      cData : "",
    };
  },

  mounted() {
    setTimeout(() => {
      let path = this.$route.path.substring(1);
      let menu = this.$store.state.main_menu;

      for (let i = 0; i < menu.length; i++) {
        for (let j = 0; j < menu[i].menu_dept1.length; j++) {
          if (menu[i].menu_dept1[j].path == path) {
            this.$store.state.now_nav_menu_idx = i;
            break;
          }

          if (menu[i].menu_dept1[j].path == "") {
            for (let k = 0; k < menu[i].menu_dept1[j].menu_dept2.length; k++) {
              if (menu[i].menu_dept1[j].menu_dept2[k].path == path) {
                this.$store.state.now_nav_menu_idx = i;
                break;
              }
            }
          }
        }
      }
      this.$refs.M4_Navigation_ref.setOpenGroup();
    }, 100);
  },

  watch: {
  },

  methods : {
    showMenu(data) {
      if (this.$store.state.now_main_menu_idx == data) {
        this.$store.state.now_main_menu_idx = -1;
        this.overlay = false;
        return
      }
      this.$store.state.now_main_menu_idx = data;
      this.$store.state.now_main_menu_dept2_idx = 0;
      this.overlay = true;
    },

    showMenuNav(data) {
      this.$store.state.now_nav_menu_idx = data;
      this.$store.state.now_main_menu_dept2_idx = 0;
      this.overlay = true;
    },

    on_main_logo() {
      this.$store.state.now_main_menu_idx = -1;
      EventBus.$emit("onNavigo", "/");
      
    },

    onSelect(item) {
      // console.log(item);
      this.$store.state.now_main_menu_dept2_idx = item.idx;
      this.$forceUpdate();

      if (item.path != "") {
        this.$store.state.now_nav_menu_idx = this.$store.state.now_main_menu_idx;
        this.$store.state.now_main_menu_idx = -1;
        if (item.path.startsWith('http')) {
          window.open(item.path, "_blank");
        } else {
          EventBus.$emit("onMenu", item.path);

        }
      }
    },

    goMenu(item){
      this.$store.state.now_nav_menu_idx = this.$store.state.now_main_menu_idx;
      this.$store.state.now_main_menu_idx = -1;
      if (item.path.startsWith('http')) {
        window.open(item.path, "_blank");
      } else {
        EventBus.$emit("onMenu", item.path);
      }
    },

    onM4_Header_top_menu1(){
      alert(1);
      this.$store.state.now_main_menu_idx = -1;
    },
    onM4_Header_top_menu2(){
      alert(2);
    },
    onM4_Header_top_menu3(){
      alert(3);
    },
    onM4_Header_top_menu4(){
      alert(4);
    },

    goSearch(){
      this.$store.state.now_nav_menu_idx = 7;
      this.$store.state.now_main_menu_idx = -1;
      EventBus.$emit("onMenu", "guide_search");
    },


    showMenuAll(){
      this.$store.state.now_main_menu_idx = -1;
      this.drawer = true;
    },
  },

};
</script>

<style >
  .menu_nor {
    background: #ffffff;
    color : var(--gray-70);
    height: 56px;
  }

  .menu_sel {
    background: var(--secondary-10);
    color : var(--gray-90);
    height: 56px;
  }

  .menu_font_nor {
    color : var(--gray-70);
  }

  .menu_font_sel {
    color : var(--gray-90);
  }


  .background_main {
    width: 100vw;
    height: 0px;
  }


  .background_main2 {
    position: relative;
    z-index : 110;
    top : 0px;
    background: #ffffff;
    box-shadow: 0px 100px 100px 10px #00000030;
    height: 500px; 
    overflow: hidden;
  }

  .background_main3 {
    position: fixed;
    z-index : 101;
    top: 207px;
    width: 100vw;
    height: calc(100vh - 203px);
    background: #00000080;
  }


  .v-list-item-title {
    font-weight: 700;
  }

  .v-list-item--active .v-list-item-title {
    font-weight: 700;
    color: var(--secondary-color) !important;
  }

  .multiline-truncate {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3; /* 원하는 줄 수로 설정 */
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.5em; /* 줄 높이를 설정하여 줄 간격 조정 */
    height: 72px;
  }

  .gradient-background {
    position: relative;
    top:-180px;
    width:100%;
    height:100px;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.8) 0%,
      rgba(0, 0, 0, 0) 100%
    );
  }

  .selected-item {
    background-color: white !important;
    padding-left: 24px;
    align-items: center;
    font-size: var(--font-size-body-medium);
    height: 56px;
    transition: background-color 0.7s ease;
  }

  .nor-item {
    background-color: var(--secondary-5);
    padding-left: 24px;
    align-items: center;
    font-size: var(--font-size-body-medium);
    height: 56px;
    transition: background-color 0.7s ease;
  }
</style>

<template>
  <div :class="isMain()?'gradient-background':'nor-backround'" style="z-index: 10; position: relative; top:-1px;">
    <div class="v-container label-small pa-0" style="height: 80px;">
      <div class="pt-4 d-none d-lg-flex align-end">
        <h1 class="d-flex align-center" >
          <button @click="on_main_logo()" class="center_left" >
            <img v-if="isMain()" class="ml-2 mb-2 mouse-cur" src="@/assets/main_logo_white.svg" alt="119 Seoul Fire Services 서울소방" style="height: 60px;"/>
            <img v-else class="ml-2 mb-2 mouse-cur" src="@/assets/main_logo_org.svg" alt="119 Seoul Fire Services 서울소방" style="height: 60px;"/>
            <div class="ml-2 title-xlarge" style="width:250px"> {{ $t("main_title") }}</div>
          </button>
        </h1>
        <div class="ml-3 d-none d-lg-flex" id="cmm-gnb" >
          <div v-for="(item, i) in $store.state.main_menu" :key="i" class="d-flex align-center justify-start body-large line_clamp_1 mr-1" style="height: 56px;">
            <div v-if="item.isMainMenu" :class="'d-flex pl-3 pr-3 pb-3 align-center mouse-cur '+ getMenuBackColor(item)">              
              <button :id="'cmm-gnb-' + i" tabindex="0" type="button" :class="getMenuColor(item) + ' body-medium font-bold'" style="max-width: 150px;" class="line_clamp_1" @mouseenter="onEnterBtn(item.idx)" @focus="onEnterBtn(item.idx)" @click="goMainMenu(item.idx)" @keydown.enter="goMainMenu(item.idx)" @keydown.shift.tab.exact="goBack()">{{ item.name }}</button>
              <v-expand-transition>
                <div class="background_main2" :class="{ expanded: $store.state.now_main_menu_idx == i }" v-show="$store.state.now_main_menu_idx == i" @mouseleave="goBack()" style="cursor: default;">
                  <ul class="v-container no-bullets label-small pa-0 d-none d-lg-flex align-content-start flex-wrap">
                    <li v-for="(item, k) in $store.state.main_menu[i].menu_dept1" :key="'menu_' + k" class="pt-3 pl-3 pb-0" style="width: 240px;">                      
                      <button tabindex="0" type="button" :class="(item.isFocus?'button_focus':'') + ' pb-2 font-bold line_clamp_1'" @blur="item.isFocus = false" @focus="item.isFocus = true" @click="onSelect(item)" @keydown.enter="onSelect(item)" :title="item.path.startsWith('http')?`새창열림`:`` " >
                        <div class="d-flex">
                          <div class="over_text">
                            {{ item.name }}
                          </div>
                          <div v-if="item.path.startsWith('http')"> <v-icon aria-hidden="true" class="ml-1" size="19px" style="margin-top: 2px;">mdi-open-in-new</v-icon></div>
                        </div>
                      </button>
                      <ul class="pt-0 no-bullets">
                        <li v-for="(item, j) in $store.state.main_menu[i].menu_dept1[k].menu_dept2" :key="j" class="mb-1">
                          <button tabindex="0" type="button" :class="item.isFocus?'button_focus':''" @blur="item.isFocus = false" @focus="item.isFocus = true" class="d-flex  mouse-cur ma-2 ml-n3 line_clamp_1" @click="goMenu(item)" @keydown.enter="goMenu(item)"  :title="item.path.startsWith('http')?`새창 열림`:``">
                            <span aria-hidden="true">ㆍ</span>
                            <div class="over_text">
                            {{ item.name }}
                          </div>           
                            <div v-if="item.path.startsWith('http')"> <v-icon aria-hidden="true" class="ml-1" size="22px" style="margin-top: -2px;">mdi-open-in-new</v-icon></div>
                          </button>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </v-expand-transition>
            </div>
          </div>
        </div>
        <v-spacer></v-spacer>
        <div class="text-right mt-0 mr-0" style="position: absolute;top: 15px;right: 37px;">
          <div class="d-flex">
            <v-menu >       
              <template v-slot:activator="{ props }">
                <v-btn @focus="onFocusEvent" v-bind="props" variant="plain" density="compact" class="pa-0" style="font-size:15px;" title="유관기관 열기">{{ $t("footer_link_title_2") }}<v-icon aria-hidden="true" class="ml-1" size="19px" style="margin-top: 4px;" >mdi-chevron-down</v-icon></v-btn>
              </template>
              <v-card>
                <ul style="list-style: none; margin: 0; padding: 3px; width: 180px; background-color: white; border: 1px solid #ccc; border-radius: 4px;" role="menu">
                  <li class="mt-1" v-for="(item, index) in $store.state.zU_Link" :key="index" :value="index" style="padding: 10px; cursor: pointer;" tabindex="0" :aria-label="item.title + ' 새창열림'" 
                  @click="onOrganization(index)" @keydown.enter="onOrganization(index)" role="menuitem">
                    {{ item.title }}
                  </li>                  
                </ul>
              </v-card>
              <!-- <v-list @click:select="onOrganization">
                <v-list-item v-for="(item, index) in $store.state.zU_Link" :key="index" :value="index" :aria-label="item.title">
                  <v-list-item-title aria-hidden="true">{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list> -->
            </v-menu>
            <v-divider :aria-hidden="true" vertical class="mt-1 ml-2 mr-2"></v-divider>
            <!-- 언어선택 -->
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" variant="plain" density="compact" class="pa-0" style="font-size:15px;text-transform: none;" title="선택 열기">Language<v-icon aria-hidden="true" class="ml-1" size="19px" style="margin-top: 4px;">mdi-chevron-down</v-icon></v-btn>
              </template>
              <v-card>
                <ul style="list-style: none; margin: 0; padding: 3px; width: 180px; background-color: white; border: 1px solid #ccc; border-radius: 4px;" role="menu">
                  <li class="mt-1" v-for="(item, index) in $store.state.zLang" :key="index" :value="index" style="padding: 10px; cursor: pointer;" tabindex="0" :aria-label="item.title" 
                  @click="onLang(item)" @keydown.enter="onLang(item)" role="menuitem">
                    {{ item.cName }}
                    <span v-if="item.id == $i18n.locale" span class="cmm-blind-text">선택됨</span>
                    <v-icon aria-hidden="true" v-if="item.id == $i18n.locale" size="18">mdi-check</v-icon>                  
                  </li>                  
                </ul>
              </v-card>
              <!-- <v-list @click:select="onLang">
                <v-list-item v-for="(item, index) in $store.state.zLang" :key="index" :value="index" :disabled="item.id == $i18n.locale">
                  <v-list-item-title>
                    {{ item.cName }}
                   <span v-if="item.id == $i18n.locale" span class="cmm-blind-text">선택됨</span>
                    <v-icon aria-hidden="true" v-if="item.id == $i18n.locale" size="18">mdi-check</v-icon>
                  </v-list-item-title>
                </v-list-item>
              </v-list> -->
            </v-menu>
          </div>
        </div>
      </div>

      <div class="d-flex d-lg-none align-center mb-2">
        <button type="button" class="d-flex align-center" tabindex="0" role="link"  @click="on_main_logo()" @keydown.enter="on_main_logo()" aria-label="홈으로">
          <img v-if="isMain()" class="ml-2 mt-3 mouse-cur" src="@/assets/main_logo_white.svg" alt="" style="height: 60px;"/>
          <img v-else class="ml-2 mt-3 mouse-cur" src="@/assets/main_logo_org.svg" alt="" style="height: 60px;"/>
          <div class="ml-4 mt-3 title-large" >{{ $t("main_title") }}</div>
        </button>
        <v-spacer></v-spacer>
        <v-btn variant="plain" class="mr-2 body-small" @click="showMenuAll()" style="width: 25px;height:55px;">
          <div><v-icon aria-hidden="true" class="mb-1" size="25px">mdi-menu</v-icon><div>{{ $t("total_menu") }}</div></div>
        </v-btn>
      </div>
      <v-divider :aria-hidden="true" v-if="!isMain()"></v-divider>
    </div>
  </div>

  <div class="background_main">
    <v-navigation-drawer
      v-model="drawer"
      v-if="drawer"
      temporary clipped
      :style="(drawer?'width: 400px !important;':'')"
      >
      <v-btn
        icon
        class="ma-2"
        @click="drawer = false"
        aria-label="닫기"
        style="position: absolute; top: 8px; right: 8px; z-index: 9999;"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <div class="d-flex" style="height: 100vh;">
        <div style="width: 170px;" ref="mainMenuContainer">
          <div v-for="(item, i) in $store.state.main_menu" :key="i" role="button" tabindex="0" class="main-menu-item" @keydown.tab="handleMainMenuTab" @click="showMenuNav(item.idx);" @keyup.enter="showMenuNav(item.idx)" :class="'d-flex align-center mouse-cur '+($store.state.now_nav_menu_idx==item.idx?'menu_sel':'menu_nor')" :aria-label="`${item.name}`">
            <div :class="($store.state.now_nav_menu_idx==item.idx?'font_sel':'font_nor') + ' ml-2 body-medium font-bold over_text'">
              {{ item.name }}
            </div>
          </div>
        </div>
        <v-divider :aria-hidden="true" vertical ></v-divider>
        <M4_Navigation ref="M4_Navigation_ref" @focusParent="focusMainMenu"></M4_Navigation>
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
      isProcessing: false, // 네비이동
    };
  },

  mounted() {
    this.overlay = false;
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

      let oInterval = setInterval(() => {
        if (this.$refs.M4_Navigation_ref) {
          this.$refs.M4_Navigation_ref.setOpenGroup();
          clearInterval(oInterval)
        }
      }, 100);
    }, 100);
  },

  watch: {
    drawer(newVal) {
      if (!newVal) {
        this.overlay = false; // drawer가 false일 경우 overlay도 false로 설정
      }
    },
  },

  methods : {
    isMain(){
      return ((this.$route.path == '/' && !this.overlay) || (this.$route.path == '/' && this.drawer));
    },

    onEnterBtn(idx) {
      if (idx == 0) {
        setTimeout(() => {
          window.scrollTo({
            top: 0,          
            behavior: 'smooth',
          });        
        }, 10);
      }

      if (navigator.maxTouchPoints == 0){
        this.showMenu(idx);
      }
    },

    // 해당 매뉴보여주기
    goMainMenu(data) {
      this.$store.state.now_main_menu_idx = data;
      // this.$store.state.now_main_menu_dept2_idx = 0;
      if (this.$store.state.main_menu[this.$store.state.now_main_menu_idx].menu_dept1[0].path != "") {
        this.onSelect(this.$store.state.main_menu[this.$store.state.now_main_menu_idx].menu_dept1[0])
      } else {
        this.onSelect(this.$store.state.main_menu[this.$store.state.now_main_menu_idx].menu_dept1[0].menu_dept2[0])
      }
    }, 

    showMenu(data) {
      if (this.$store.state.now_main_menu_idx == data) {
        this.$store.state.now_main_menu_idx = -1;
        this.overlay = false;
        return
      }
      this.$store.state.now_main_menu_idx = data;
      // this.$store.state.now_main_menu_dept2_idx = 0;
      this.overlay = true;
    },

    showMenuNav(data) {
      this.$store.state.now_nav_menu_idx = data;
      // this.$store.state.now_main_menu_dept2_idx = 0;
      this.overlay = true;

      // 하위 메뉴 컴포넌트의 첫 번째 메뉴 항목에 포커스 이동
      this.$nextTick(() => {
        const subMenu = this.$refs.M4_Navigation_ref.$el.querySelector('[tabindex="0"]');
        if (subMenu) subMenu.focus();
      });
    },

    on_main_logo() {
      this.$store.state.now_main_menu_idx = -1;
      this.overlay = false;
      EventBus.$emit("onNavigo", "/");
    },

    // dept_1 매뉴 선택시 (해당페이지로 이동)
    onSelect(item) {
      if (this.isProcessing) return;
      this.isProcessing = true;
      
      if (item.path != "") {
        this.$store.state.now_nav_menu_idx = this.$store.state.now_main_menu_idx;
        this.$store.state.now_main_menu_idx = -1;
        this.overlay = false;
        if (item.path.startsWith('http') || item.OPEN_BOOLEAN) {
          window.open(item.path, "_blank");
        } else {
          EventBus.$emit("onMenu", item.path);
        }
      }

      setTimeout(() => {
        this.isProcessing = false; // Adjust the delay as needed
      }, 1000); 
    },

    // dept_2 매뉴 선택시 (해당페이지로 이동)
    goMenu(item){    
      if (this.isProcessing) return;
      this.isProcessing = true;

      this.$store.state.now_nav_menu_idx = this.$store.state.now_main_menu_idx;
      this.$store.state.now_main_menu_idx = -1;
      this.overlay = false;
      if (item.path.startsWith('http') || item.OPEN_BOOLEAN) {
        window.open(item.path, "_blank");
      } else {
        EventBus.$emit("onMenu", item.path);
      }

      setTimeout(() => {
        this.isProcessing = false;
      }, 1000); // Adjust the delay as needed

    },

    // 유관기관 링크이동
    // onOrganization(item) {
    //   window.open(this.$store.state.zU_Link[item.id].cURL, "_blank");
    // },

    onOrganization(index) {      
      window.open(this.$store.state.zU_Link[index].cURL, "_blank");
    },

    onFocusEvent(){
      this.$store.state.now_main_menu_idx = -1; 
      this.showMenu(-1);
    },
    // 언어변경
    onLang(item) {      
      // let lang = this.$store.state.zLang[item.id].id;

      if (item.id != this.$i18n.locale) {        
        localStorage.setItem("lang", item.id);
        this.$i18n.locale = item.id; 
        window.location.reload();
      }
    },
    
    // onLang(item) {
    //   let lang = this.$store.state.zLang[item.id].id;
    //   if (lang != this.$i18n.locale) {
    //     localStorage.setItem("lang", lang);
    //     this.$i18n.locale = lang; 
    //     this.$vuetify.locale.current = lang;
    //     window.location.reload();
    //   }
    // },

    showMenuAll() {
      this.$store.state.now_main_menu_idx = -1;
      if (this.$store.state.now_nav_menu_idx == -1) {
        this.$store.state.now_nav_menu_idx = 0;
      }
      this.drawer = true;
    },

    getMenuBackColor(item) {
      if (this.$route.path == '/' && !this.overlay) {
        return (this.$store.state.now_main_menu_idx==item.idx?'menu_sel_main':'menu_nor_main');
      } else {
        return (this.$store.state.now_main_menu_idx==item.idx?'sel_main':'nor_main');
      }
    },

    getMenuColor(item) {
      if (this.$route.path == '/' && !this.overlay) {
        return (this.$store.state.now_main_menu_idx==item.idx?'menu_font_sel':'menu_font_nor');
      } else {
        return (this.$store.state.now_main_menu_idx==item.idx?'font_sel':'font_nor');
      }
    },

    goBack(){
      this.$store.state.now_main_menu_idx = -1;
      this.overlay = false;
    },

    focusMainMenu() {
      // ref를 통해 메인 메뉴 컨테이너 접근
      const mainMenuContainer = this.$refs.mainMenuContainer;
      if (!mainMenuContainer) {
        console.error("Main menu container not found!");
        return;
      }

      // 메인 메뉴 요소들 수집
      const mainMenuItems = mainMenuContainer.querySelectorAll('.main-menu-item');
      if (mainMenuItems.length > 0) {
        // 현재 활성화된 메인 메뉴 요소로 포커스 이동
        const activeIndex = this.$store.state.now_nav_menu_idx;
        const targetMenu = mainMenuItems[activeIndex] || mainMenuItems[0]; // 활성화된 메뉴가 없으면 첫 번째 메뉴로 이동
        if (targetMenu) {
          targetMenu.focus();
        }
      } else {
        console.error("No main menu items found!");
      }
    },

    handleMainMenuTab(event) {
      // 메인 메뉴 요소들 수집
      const mainMenuContainer = this.$refs.mainMenuContainer;
      const mainMenuItems = mainMenuContainer.querySelectorAll('.main-menu-item');
      // 현재 이벤트 대상
      const currentIndex = Array.from(mainMenuItems).indexOf(event.target);
      if (currentIndex === mainMenuItems.length - 1) {
        // 마지막 메인 메뉴 항목에서 빠져나가기
        console.log('Exiting main menu navigation.');
        this.drawer = false;
      }
    },

  },

};
</script>

<style >
  .menu_nor_main {
    background: #ffffff00;
    color : var(--gray-70);
    height: 56px;
  }

  .menu_sel_main {
    background: #ffffff00;
    color : var(--gray-90);
    height: 56px;
  }

  .nor_main {
    background: #ffffff;
    color : var(--gray-70);
    height: 56px;
  }

  .sel_main {
    background: var(--secondary-10);
    color : var(--gray-90);
    height: 56px;
  }

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
    color : white;
  }

  .menu_font_sel {
    color : white;
    text-decoration: underline;
  }

  .font_nor {
    color : var(--gray-70);
  }

  .font_sel {
    color : var(--gray-90);
    text-decoration: underline;
  }


  .background_main {
    width: 100vw;
    height: 0px;
  }

  
  .background_main2 {
    position: absolute;
    left: 0;
    top: 80px;
    width: 100vw;
    /* min-height: 400px; */
    z-index : 110;
    background: #ffffff;
    box-shadow: 0px 200px 150px 10px #00000020;
    overflow: hidden;
  }

  .background_main2.expanded {
    min-height: 200px;
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
    background: rgba(0, 0, 0, 0.3);
    color: white;
  }
  .nor-backround {
    background: #ffffff;
    color:var(--gray-90);
    z-index: 900 !important;
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


  .over_text {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .button_focus {       
    border:dashed  2px #d50136 ! important; 
  }

  .no-bullets {
    list-style: none; /* 점을 없앰 */         
  }

</style>
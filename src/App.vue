<template>
  <v-app id="top_page">
    <v-main v-if="dataLoaded" style="overflow: hidden">
      <div
        class="cmm-skip-menu"
        tabindex="-1"
        ref="skipmenuFocus"
        aria-label="2개 항목을 포함한 링크 컬렉션"
      >
        <!-- <a href="javascript:void(0)" role="button" @click.prevent="goToMenu"><span>주메뉴 바로가기</span></a>       -->
        <a href="#cmm-gnb-0" role="button"><span>주메뉴 바로가기</span></a>
        <a
          v-if="$route.path == '/'"
          href="javascript:void(0)"
          role="button"
          @click.prevent="goToContent"
          ><span>본문 바로가기</span></a
        >
        <a v-else href="#cmm-content-body"><span>본문 바로가기</span></a>
      </div>

      <div :aria-hidden="$store.state.isDialog" :inert="$store.state.isDialog">
        <M4_Masterhead></M4_Masterhead>
        <M4_Header></M4_Header>
      </div>

      <div v-if="isMainPageRouter">
        <router-view />
      </div>
      <v-container class="ui-contents" v-else>
        <div
          class="d-flex"
          style="width: 100%"
          :aria-hidden="$store.state.isDialog"
          :inert="$store.state.isDialog"
        >
          <!-- 왼쪽 네비게이션 -->
          <div
            v-if="$route.path != '/'"
            class="d-none d-lg-flex"
            style="
              height: 100%;
              margin-top: 6px;
              border-right: 1px solid #f0f0f0;
            "
          >
            <M4_Navigation ref="M4_Navigation_ref"></M4_Navigation>
          </div>
          <!-- 페이지의 위쪽 네비게이션 정보 표시 -->
          <div style="width: 100%" id="cmm-content">
            <div v-if="$route.path != '/'" class="d-flex">
              <v-breadcrumbs
                :items="items"
                density="compact"
                class="mt-2 d-flex flex-wrap"
              >
                <template v-slot:divider>
                  <v-icon aria-hidden="true">mdi-chevron-right</v-icon>
                </template>
                <template v-slot:item="{ item }">
                  <v-breadcrumbs-item :disabled="item.disabled">
                    <button
                      id="cmm-content-body"
                      v-if="item.text == ''"
                      class="mouse-cur"
                      @click="goHome()"
                      @keydown.enter="goHome()"
                      tabindex="0"
                      role="link"
                      title="홈으로 이동"
                      @focus="onScollHome"
                      style="margin-left: 5px"
                    >
                      <v-icon aria-hidden="true" class="ml-1" size="24"
                        >mdi-home</v-icon
                      >
                    </button>
                    <button
                      v-else
                      class="mouse-cur"
                      @click="goMenu(item.path)"
                      @keydown.enter="goMenu(item.path)"
                      tabindex="0"
                    >
                      {{ item.text }}
                    </button>
                  </v-breadcrumbs-item>
                </template>
              </v-breadcrumbs>
              <v-spacer></v-spacer>
              <!-- SNS 공유하기 버튼 -->
              <div class="mt-2 mr-6 d-flex">
                <v-btn
                  v-if="$store.state.bShowShareSNSBtn"
                  @click="onfooter_sns1()"
                  @keyup.enter="onfooter_sns1()"
                  icon
                  class="mr-2"
                  size="30"
                  title="페이스북 새창열림"
                  ><img
                    src="@/assets/icon/facebook.svg"
                    aria-hidden="true"
                    alt=""
                /></v-btn>
                <v-btn
                  v-if="$store.state.bShowShareSNSBtn"
                  @click="onfooter_sns2()"
                  @keyup.enter="onfooter_sns2()"
                  icon
                  class="mr-2"
                  size="30"
                  title="트위터 새창열림"
                  ><img src="@/assets/icon/sn.svg" aria-hidden="true" alt=""
                /></v-btn>
              </div>
            </div>

            <div
              :aria-hidden="$store.state.isDialog"
              :inert="$store.state.isDialog"
            >
              <router-view class="pa-4 pl-6 pr-6" style="overflow: auto" />
            </div>
          </div>
        </div>
      </v-container>
    </v-main>
    <M4_Footer></M4_Footer>

    <M4_Msgbox ref="M4_Msgbox_ref"></M4_Msgbox>
    <M4_SnackBar ref="M4_SnackBar_ref"></M4_SnackBar>
    <M4_PrintDialog ref="M4_PrintDialog_ref"></M4_PrintDialog>
    <div id="overlay">스크린샷이 감지되었습니다</div>
  </v-app>
</template>

<script setup>
import { watch, nextTick, onMounted } from "vue";
import {
  initializeCustomSelect,
  initializeAccordion,
  setupResizeEvents,
} from "@/utils/common-init.js";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const initUI = () => {
  nextTick(() => {
    setTimeout(() => {
      initializeCustomSelect(".select", "init");
      initializeAccordion();
      setupResizeEvents();
    }, 300);
  });
};
onMounted(() => {
  initUI();
});

// 라우트가 변경될 때마다 다시 초기화
watch(
  () => route.fullPath,
  () => {
    initUI();
  }
);
const isMainPageRouter = computed(() => route.meta.isMainPageRouter === true);
</script>

<script>
import axios from "axios";
import { EventBus } from "@/EventBus.js";

import "../../01.Common_CSS/krds.css";

export default {
  data() {
    return {
      items: [],
      dataLoaded: false,
      version: "",
    };
  },

  components: {},

  mounted() {
    // 버전업이 되었으면 버전을 올리도록 처리
    this.version = localStorage.getItem(
      `${import.meta.env.VITE_SITE_NM}_Version`
    );
    // console.log('current version :', this.version);
    // console.log('version update check...');

    axios
      .get(
        `${
          import.meta.env.VITE_BORAMAE_SITE_URL
        }/version.json?timestamp=${new Date().getTime()}`
      )
      .then((res) => {
        // console.log('server version :', res.data.version);
        // console.log('storage version :', this.version);

        if (res.data.version != this.version) {
          // console.log('version dismatch:');
          if (res.data.version && this.version) {
            this.deleteCashe(res.data.version);
          } else {
            // 최초 버전 저장만
            localStorage.setItem(
              `${import.meta.env.VITE_SITE_NM}_Version`,
              res.data.version
            );
            this.version = res.data.version;
          }
        }
      });

    // 언어설정
    var lang = localStorage.getItem("lang");

    if (lang == null) {
      lang = "en";
      if (navigator.language != null) {
        lang = navigator.language;
        lang = lang.toLowerCase().substring(0, 2);

        if (lang != "ko") {
          lang = "en";
        }
      }
      localStorage.setItem("lang", lang);
    }

    document.documentElement.lang = lang;
    this.$i18n.locale = lang;

    // KEY 방지 이벤트 핸들러
    if (import.meta.env.VITE_USE_PREVENT_KEYEVENT == "true") {
      // 우클릭 방지
      this.handleContextMenu = function (e) {
        e.preventDefault();
        alert("우클릭이 차단되었습니다.");
      };
      // F12 / Ctrl + Shift + I 방지
      this.handleKeyDown = function (e) {
        if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I")) {
          e.preventDefault();
          alert("개발자 도구 접근이 차단되었습니다.");
        }
      };
      // 스크린샷 방지
      this.handleKeyUp = function (e) {
        if (e.key === "PrintScreen") {
          const overlay = document.getElementById("overlay");
          overlay.style.display = "block";
          setTimeout(() => {
            overlay.style.display = "none";
          }, 1000);
          navigator.clipboard.writeText("");
        }
      };
      document.addEventListener("contextmenu", this.handleContextMenu);
      document.addEventListener("keydown", this.handleKeyDown);
      document.addEventListener("keyup", this.handleKeyUp);
    }

    // 기본 사이트관련 정보 가져오기 API (STORE에 SETTING)
    this.InitInfo();

    EventBus.$on(
      "onBackDialogBtn",
      () => {
        setTimeout(() => {
          if (
            this.$store.state.btnDialogRef != null ||
            this.$store.state.btnDialogRef != undefined
          ) {
            try {
              this.$store.state.btnDialogRef.focus();
            } catch (error) {}

            try {
              // console.log(this.$store.state.btnDialogRef);
              this.$store.state.btnDialogRef.$el.focus();
            } catch (error) {}
          }
        }, 100);
      },
      this
    );

    EventBus.$on(
      "onBackDialogMsgBtn",
      () => {
        setTimeout(() => {
          if (
            this.$store.state.btnMsgDialogRef != null ||
            this.$store.state.btnMsgDialogRef != undefined
          ) {
            try {
              this.$store.state.btnMsgDialogRef.focus();
            } catch (error) {
              // console.log(error);
            }

            try {
              this.$store.state.btnMsgDialogRef.$el.focus();
            } catch (error) {}
          }
        }, 10);
      },
      this
    );

    EventBus.$on(
      "onBackDialogReplyBtn",
      () => {
        setTimeout(() => {
          if (
            this.$store.state.btnReplyDialogRef != null ||
            this.$store.state.btnReplyDialogRef != undefined
          ) {
            try {
              this.$store.state.btnReplyDialogRef.focus();
            } catch (error) {
              // console.log(error);
            }

            try {
              this.$store.state.btnReplyDialogRef.$el.focus();
            } catch (error) {}
          }
        }, 10);
      },
      this
    );

    EventBus.$on(
      "onBackDialogResBtn",
      () => {
        setTimeout(() => {
          if (
            this.$store.state.btnDialogResRef != null ||
            this.$store.state.btnDialogResRef != undefined
          ) {
            try {
              this.$store.state.btnDialogResRef.focus();
            } catch (error) {
              // console.log(error);
            }

            try {
              this.$store.state.btnDialogResRef.$el.focus();
            } catch (error) {}
          }
        }, 10);
      },
      this
    );

    // VUE 라우터 이동
    EventBus.$on(
      "onNavigo",
      (data) => {
        if (data == "/") {
          if (this.$i18n.locale == "ko") {
            document.title = "안전체험관";
          } else {
            document.title = "Safety Experience Center";
          }
        }
        // console.log(">>>>>>>>>>", data);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        this.$router.push({ path: data });
      },
      this
    );

    // VUE 라우터 이동 (데이터 같이 넘기기)
    EventBus.$on(
      "onNavigo_tab",
      (data) => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        this.$router.push({ path: data.path, query: { id: data.params } });
      },
      this
    );

    EventBus.$on(
      "onPrintDialog",
      (data) => {
        this.$refs.M4_PrintDialog_ref.PrintSubmission(data);
      },
      this
    );

    // 알람메시지 띄울시, 이벤트 처리
    EventBus.$on(
      "onShowMsg",
      (data) => {
        this.$refs.M4_Msgbox_ref.Show(data.cSubTitle, data.cTitle, data.cMsg);
      },
      this
    );

    // 매뉴 선택시, 이벤트처리
    EventBus.$on(
      "onMenu",
      (data) => {
        EventBus.$emit("onNavigo", data); // VUE 라우터 이동
        this.setPath(data); // breadcrumb PATH 세팅
        this.$nextTick(() => {
          // if (this.$refs.M4_Navigation_ref != null) {
          //   this.$refs.M4_Navigation_ref.setOpenGroup();  // 왼쪽 네비게이션 세팅 (활성화된 메뉴 열기)
          // }
          var activeBtn = document.activeElement;
          activeBtn.blur();
          this.$refs.skipmenuFocus.focus();
          let oInterval = setInterval(() => {
            if (this.$refs.M4_Navigation_ref) {
              this.$refs.M4_Navigation_ref.setOpenGroup();
              clearInterval(oInterval);
            }
          }, 100);

          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        });
      },
      this
    );

    // 특정 라우터 페이지로 이동시, 이벤트 처리
    EventBus.$on(
      "onGoto",
      (data) => {
        EventBus.$emit("onNavigo", data); // VUE 라우터 이동
        this.goLink(data); // store에 현재 now_nav_menu_idx 설정 필요

        this.$nextTick(() => {
          if (this.$refs.M4_Navigation_ref != null) {
            this.$refs.M4_Navigation_ref.setOpenGroup(data); // 왼쪽 네비게이션 세팅 (활성화된 메뉴 열기)
          }

          this.$refs.skipmenuFocus.focus({ preventScroll: true });
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        });
      },
      this
    );

    // 특정 라우터 페이지(파라미터 같이 넘김) 이동시, 이벤트 처리
    EventBus.$on(
      "onGoto_tab",
      (data) => {
        this.$store.state.link_param = data.params;

        EventBus.$emit("onNavigo_tab", data); // VUE 라우터 이동
        this.goLink(data.path); // store에 현재 now_nav_menu_idx 설정 필요
      },
      this
    );

    // 스넥바 알람메시지 띄울시, 이벤트 처리
    EventBus.$on(
      "onAlarmSnackbar",
      (data) => {
        this.$refs.M4_SnackBar_ref.ShowMsg(data);
      },
      this
    );
    setTimeout(() => {
      let path = this.$route.path.substring(1);
      this.goLink(path);
    }, 500);
  },

  beforeUnmount() {
    EventBus.$offAll(this);
    // 이벤트 제거 (메모리 누수 방지)
    document.removeEventListener("contextmenu", this.handleContextMenu);
    document.removeEventListener("keydown", this.handleKeyDown);
    document.removeEventListener("keyup", this.handleKeyUp);
  },

  methods: {
    goToMenu() {
      this.$nextTick(() => {
        const element = document.getElementById("cmm-gnb");
        if (element) {
          // 스크롤 이동
          const firstFocusable = element.querySelectorAll('[tabindex="0"]');
          if (firstFocusable.length > 0) {
            firstFocusable[0].focus({ preventScroll: true });
          } else {
            console.warn("포커스 가능한 요소가 없습니다.");
          }
        }
      });
    },

    goToContent() {
      setTimeout(() => {
        const element = document.getElementById("cmm-content");
        if (element) {
          const firstFocusable = element.querySelectorAll('[tabindex="0"]');
          // console.log(firstFocusable);
          if (firstFocusable.length > 0) {
            firstFocusable[0].focus({ preventScroll: true });
          } else {
            console.warn("포커스 가능한 요소가 없습니다.");
          }
        }
      }, 400);
    },

    onScollHome() {
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 100);
    },

    // SNS 공유하기
    onfooter_sns1() {
      var currentPath =
        import.meta.env.VITE_BORAMAE_SITE_URL + this.$route.path;
      window.open(
        "https://www.facebook.com/sharer.php?u=" + currentPath,
        "facebook",
        "toolbar=0,status=0,width=655,height=520"
      );
    },
    onfooter_sns2() {
      var currentPath =
        import.meta.env.VITE_BORAMAE_SITE_URL + this.$route.path;
      window.open(
        "https://twitter.com/share?url=" + currentPath,
        "x",
        "toolbar=0,status=0,width=600,height=350"
      );
    },

    // 스토어에 이동 정보 세팅
    goLink(data) {
      setTimeout(() => {
        // let path = this.$route.path.substring(1);
        let path = data;
        this.setPath(path); // breadcrumb PATH 세팅

        let menu = this.$store.state.main_menu;

        for (let i = 0; i < menu.length; i++) {
          for (let j = 0; j < menu[i].menu_dept1.length; j++) {
            if (menu[i].menu_dept1[j].path == path) {
              this.$store.state.now_nav_menu_idx = i;
              break;
            }

            if (menu[i].menu_dept1[j].path == "") {
              for (
                let k = 0;
                k < menu[i].menu_dept1[j].menu_dept2.length;
                k++
              ) {
                if (menu[i].menu_dept1[j].menu_dept2[k].path == path) {
                  this.$store.state.now_nav_menu_idx = i;
                  break;
                }
              }
            }
          }
        }
      }, 300);

      setTimeout(() => {
        if (this.$refs.M4_Navigation_ref != null) {
          this.$refs.M4_Navigation_ref.setOpenGroup();
        }
      }, 500);
    },

    goHome() {
      EventBus.$emit("onNavigo", "/");
    },

    // breadcrumb PATH 세팅
    setPath(path) {
      if (path == "") {
        if (this.$i18n.locale == "ko") {
          document.title = "안전체험관";
        } else {
          document.title = "Safety Experience Center";
        }
        return;
      }

      this.items = [{ text: "", path: "/" }];

      let m = this.$store.state.main_menu;

      for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[i].menu_dept1.length; j++) {
          if (m[i].menu_dept1[j].path == path) {
            this.items.push({ text: m[i].name, path: m[i].default_path });
            this.items.push({ text: m[i].menu_dept1[j].name, path: path });

            if (this.$i18n.locale == "ko") {
              document.title =
                m[i].name + " | " + m[i].menu_dept1[j].name + " | 안전체험관";
            } else {
              document.title =
                m[i].name +
                " | " +
                m[i].menu_dept1[j].name +
                " | Safety Experience Center";
            }
            return;
          }
        }
      }

      for (let i = 0; i < m.length; i++) {
        if (m[i].menu_dept1 != undefined) {
          for (let j = 0; j < m[i].menu_dept1.length; j++) {
            if (m[i].menu_dept1[j].menu_dept2 != undefined) {
              for (let z = 0; z < m[i].menu_dept1[j].menu_dept2.length; z++) {
                if (m[i].menu_dept1[j].menu_dept2[z].path == path) {
                  this.items.push({ text: m[i].name, path: m[i].default_path });
                  this.items.push({
                    text: m[i].menu_dept1[j].name,
                    path: m[i].menu_dept1[j].default_path,
                  });
                  this.items.push({
                    text: m[i].menu_dept1[j].menu_dept2[z].name,
                    path: path,
                  });

                  if (this.$i18n.locale == "ko") {
                    document.title =
                      m[i].name +
                      " | " +
                      m[i].menu_dept1[j].name +
                      " | " +
                      m[i].menu_dept1[j].menu_dept2[z].name +
                      " | 안전체험관";
                  } else {
                    document.title =
                      m[i].name +
                      " | " +
                      m[i].menu_dept1[j].name +
                      " | " +
                      m[i].menu_dept1[j].menu_dept2[z].name +
                      " | Safety Experience Center";
                  }
                  return;
                }
              }
            }
          }
        }
      }
    },

    goMenu(path) {
      EventBus.$emit("onNavigo", path);
      this.setPath(path);
    },

    async InitInfo() {
      var res1 = await this.GetNavigationList();

      if (res1.data.ResultCd == "44") {
        EventBus.$emit("onTokenExpired");
        return;
      }

      if (res1.data.ResultCd == "00") {
        if (res1.data.Result1.length == 0) {
          console.log("조회된 메뉴 없습니다.");
        } else {
          this.$store.commit(
            "SetMenuList",
            this.ReMakeArray(res1.data.Result1, res1.data.Result2)
          );
        }
      } else {
        EventBus.$emit("onShowMsg", {
          cSubTitle: "상세 보기 중 문제가 발생했습니다.",
          cTitle: "문제가 계속 되면 관리자에게 문의 바랍니다.",
          cMsg: `(${res1.data.ResultCd}) ${res1.data.Msg}`,
        });
      }

      var res2 = await this.GetInfoInSite();

      if (res2.data.ResultCd == "44") {
        EventBus.$emit("onTokenExpired");
        return;
      }

      if (res2.data.ResultCd == "00") {
        this.$store.commit("SetFooterJsonData", res2.data.Result1); // (0:유관기관, 1:소방서, 2: 유관기관, 3: 재해관련, 4: 방재정보)
        this.$store.commit("SetTelInfo", res2.data.Result2[0]);
        this.$store.commit("SetMapUseInfo", res2.data.Result2[0]);
        this.$store.commit("SetMainImgInfo", res2.data.Result3);
      } else {
        EventBus.$emit("onShowMsg", {
          cSubTitle: "정보 조회 중 문제가 발생했습니다.",
          cTitle: "조회된 하단의 링크 데이터들이 없습니다.",
          cMsg: `(${res2.data.ResultCd}) ${res2.data.Msg}`,
        });
      }

      this.dataLoaded = true;

      this.GetBannerInfo();
      this.SetEnterSite();
    },

    // 각 네비게이션 정보 가져오기 API
    GetNavigationList() {
      var posData = {
        SITE_ID: import.meta.env.VITE_SITE_ID,
        National: this.$i18n.locale,
      };

      return new Promise((resolve) =>
        axios
          .post(import.meta.env.VITE_UIL_API + "GetNavigationList", posData, {
            headers: {
              // "Authorization": this.CustomInfo.Token
            },
          })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            resolve({
              data: {
                ResultCd: "98",
                Msg: err,
              },
            });
          })
      );
    },

    // 네비게이션 세팅하기
    ReMakeArray(zResultArray1, zResultArray2) {
      var zReturnArray = [];

      let zLevel_A = zResultArray1.filter((item) => item.MENU_TYPE == "A");
      let zLevel_B = zResultArray1.filter((item) => item.MENU_TYPE == "B");
      let zLevel_C = zResultArray1.filter((item) => item.MENU_TYPE == "C");

      for (let i = 0; i < zLevel_A.length; i++) {
        zReturnArray.push({
          idx: i,
          id: zLevel_A[i].MENU_ID,
          name: zLevel_A[i].EXPSR_TEXT,
          default_path: zLevel_B.filter(
            (item) => item.UP_MENU_ID == zLevel_A[i].MENU_ID
          )[0]
            ? zLevel_B
                .filter((item) => item.UP_MENU_ID == zLevel_A[i].MENU_ID)[0]
                .URL_ADDR.replace("http://localhost:3000/#/", "")
            : zLevel_A[i].URL_ADDR.replace("http://localhost:3000/#/", ""),
          isMainMenu: zLevel_A[i].MENU_ID != "800000",
          CONTS_CNT: zLevel_A[i].CONTS_CNT,
          OPEN_BOOLEAN: zLevel_A[i].OPEN_TYPE == "N",
          CONTS_TYPE: zResultArray2.filter(
            (item) => item.MENU_ID == zLevel_A[i].MENU_ID
          )[0]?.CONTS_TYPE,
          CONTS_ID: zResultArray2
            .filter((item) => item.MENU_ID == zLevel_A[i].MENU_ID)
            .map((item) => {
              return item.CONTS_ID;
            }),
          BOARDLIST_ID: zResultArray2.filter(
            (item) => item.MENU_ID == zLevel_A[i].MENU_ID
          )[0]?.BOARDLIST_ID,
          FORM_TYPE: zResultArray2.filter(
            (item) => item.MENU_ID == zLevel_A[i].MENU_ID
          )[0]?.FORM_TYPE,
          PAGE_ID: zResultArray2.filter(
            (item) => item.MENU_ID == zLevel_A[i].MENU_ID
          )[0]?.PAGE_ID,
          menu_dept1: [],
          // default_path : "req_form", isMainMenu : true, CONTS_TYPE : "B", CONTS_CNT :0,
        });
      }

      for (let i = 0; i < zReturnArray.length; i++) {
        for (let k = 0; k < zLevel_B.length; k++) {
          if (zReturnArray[i].id == zLevel_B[k].UP_MENU_ID) {
            zReturnArray[i].menu_dept1.push({
              idx: i,
              id: zLevel_B[k].MENU_ID,
              name: zLevel_B[k].EXPSR_TEXT,
              path: zLevel_B[k].URL_ADDR.replace(
                "http://localhost:3000/#/",
                ""
              ),
              default_path: zLevel_C.filter(
                (item) => item.UP_MENU_ID == zLevel_B[k].MENU_ID
              )[0]
                ? zLevel_C
                    .filter((item) => item.UP_MENU_ID == zLevel_B[k].MENU_ID)[0]
                    .URL_ADDR.replace("http://localhost:3000/#/", "")
                : zLevel_B[k].URL_ADDR.replace("http://localhost:3000/#/", ""),
              CONTS_CNT: zLevel_B[k].CONTS_CNT,
              OPEN_BOOLEAN: zLevel_B[k].OPEN_TYPE == "N",
              CONTS_TYPE: zResultArray2.filter(
                (item) => item.MENU_ID == zLevel_B[k].MENU_ID
              )[0]?.CONTS_TYPE,
              CONTS_ID: zResultArray2
                .filter((item) => item.MENU_ID == zLevel_B[k].MENU_ID)
                .map((item) => {
                  return item.CONTS_ID;
                }),
              BOARDLIST_ID: zResultArray2.filter(
                (item) => item.MENU_ID == zLevel_B[k].MENU_ID
              )[0]?.BOARDLIST_ID,
              FORM_TYPE: zResultArray2.filter(
                (item) => item.MENU_ID == zLevel_B[k].MENU_ID
              )[0]?.FORM_TYPE,
              PAGE_ID: zResultArray2.filter(
                (item) => item.MENU_ID == zLevel_B[k].MENU_ID
              )[0]?.PAGE_ID,
              menu_dept2: [],
              // default_path : "req_form", isMainMenu : true, CONTS_TYPE : "B", CONTS_CNT :0,
            });
          }
        }
      }

      for (let i = 0; i < zReturnArray.length; i++) {
        for (let k = 0; k < zReturnArray[i].menu_dept1.length; k++) {
          for (let l = 0; l < zLevel_C.length; l++) {
            if (zReturnArray[i].menu_dept1[k].id == zLevel_C[l].UP_MENU_ID) {
              zReturnArray[i].menu_dept1[k].menu_dept2.push({
                idx: i,
                id: zLevel_C[l].MENU_ID,
                name: zLevel_C[l].EXPSR_TEXT,
                path: zLevel_C[l].URL_ADDR.replace(
                  "http://localhost:3000/#/",
                  ""
                ),
                default_path:
                  l == 0
                    ? zLevel_C[l].URL_ADDR.replace(
                        "http://localhost:3000/#/",
                        ""
                      )
                    : zReturnArray[i].menu_dept1[k].menu_dept2[0]?.path,
                CONTS_CNT: zLevel_C[l].CONTS_CNT,
                OPEN_BOOLEAN: zLevel_C[l].OPEN_TYPE == "N",
                CONTS_TYPE: zResultArray2.filter(
                  (item) => item.MENU_ID == zLevel_C[l].MENU_ID
                )[0]?.CONTS_TYPE,
                CONTS_ID: zResultArray2
                  .filter((item) => item.MENU_ID == zLevel_C[l].MENU_ID)
                  .map((item) => {
                    return item.CONTS_ID;
                  }),
                BOARDLIST_ID: zResultArray2.filter(
                  (item) => item.MENU_ID == zLevel_C[l].MENU_ID
                )[0]?.BOARDLIST_ID,
                FORM_TYPE: zResultArray2.filter(
                  (item) => item.MENU_ID == zLevel_C[l].MENU_ID
                )[0]?.FORM_TYPE,
                PAGE_ID: zResultArray2.filter(
                  (item) => item.MENU_ID == zLevel_C[l].MENU_ID
                )[0]?.PAGE_ID,
                menu_dept3: [],
                // default_path : "req_form", isMainMenu : true, CONTS_TYPE : "B", CONTS_CNT :0,
              });
            }
          }
        }
      }

      return zReturnArray;
    },

    // 각 사이트 정보 가져오기 API
    GetInfoInSite() {
      var posData = {
        SITE_ID: import.meta.env.VITE_SITE_ID,
        National: this.$i18n.locale,
      };

      return new Promise((resolve) =>
        axios
          .post(import.meta.env.VITE_UIL_API + "GetInfoInSite", posData, {
            headers: {
              // "Authorization": this.CustomInfo.Token
            },
          })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            resolve({
              data: {
                ResultCd: "98",
                Msg: err,
              },
            });
          })
      );
    },

    GetBannerInfo() {
      var cb = Math.floor(Math.random() * 99999999999);
      var baseURL =
        "https://delivery.acecounter.com/delivery/www/delivery/ajs.php";
      var params = new URLSearchParams({
        zoneid: "473",
        cb: cb,
        charset: "UTF-8",
        loc: "https://example.com",
        referer: "https://google.com",
      });

      var fullURL = baseURL + "?" + params.toString();

      // fetch API를 사용하여 HTTP GET 요청 보내기
      var that = this;
      fetch(fullURL)
        .then(function (response) {
          return response.text();
        })
        .then(function (text) {
          that.extractBannerInfo(text);
        })
        .catch(function (error) {
          console.error("HTTP 요청 오류:", error);
        });
    },

    extractBannerInfo(response) {
      // 1. 변수 선언부 및 연결 문자 제거
      var marker = 'OX_d7b21c82 += "';
      var startIdx = response.indexOf(marker);
      if (startIdx !== -1) {
        response = response.substring(startIdx + marker.length);
      }

      // 2. 끝의 '";' 또는 '"' 제거
      var endIdx = response.indexOf('";');
      if (endIdx !== -1) {
        response = response.substring(0, endIdx);
      } else if (response.endsWith('"')) {
        response = response.substring(0, response.length - 1);
      }

      // 3. 자바스크립트 문자열 연결 패턴 제거
      //    예: "<"+"a " => "<a " 로 변경, "+"/a>" => "</a>" 로 변경
      response = response.split('"+"').join("");

      // 4. 이스케이프된 작은따옴표 복원 (\' → ')
      response = response.replace(/\\'/g, "'");

      // 5. 양쪽 공백 제거
      response = response.trim();

      // console.log("복원된 HTML:", response);

      // 6. 정규표현식을 사용하여 각 속성 추출
      // (a) <a> 태그의 href 추출
      var hrefMatch = response.match(/href=['"]([^'"]+)['"]/);
      var href = hrefMatch ? hrefMatch[1] : "";

      // (b) <img> 태그의 src 추출
      var imgSrcMatch = response.match(/<img\s+[^>]*src=['"]([^'"]+)['"]/i);
      var imgSrc = imgSrcMatch ? imgSrcMatch[1] : "";

      // (c) <img> 태그의 alt 추출
      var altMatch = response.match(/alt=['"]([^'"]*)['"]/i);
      var altText = altMatch ? altMatch[1] : "";

      if (href != "") {
        this.$store.commit("SetBannerInfo", {
          cBannerUrl: href,
          cBannerImg: imgSrc,
          cAltMsg: altText,
        });
      }
    },

    // 사이트 접속 로그 수집
    SetEnterSite() {
      var posData = {
        SITE_ID: import.meta.env.VITE_SITE_ID,
      };

      axios
        .post(import.meta.env.VITE_UIL_API + "SetEnterSite", posData, {
          headers: {},
        })
        .then((res) => {
          if (res.data.ResultCd != "00") {
            EventBus.$emit("onShowMsg", {
              cSubTitle: "사이트 접속 로그 수집 중 문제가 발생했습니다.",
              cTitle: "계속 지속될 경우 담당자에게 문의 바랍니다.",
              cMsg: `Error : ${res.data.Msg}`,
            });
          }
        })
        .catch((err) => {
          EventBus.$emit("onShowMsg", {
            cSubTitle: "사이트 접속 로그 수집 중 문제가 발생했습니다.",
            cTitle: "계속 지속될 경우 담당자에게 문의 바랍니다.",
            cMsg: `Error : ${err}`,
          });
        })
        .finally(() => {});
    },

    deleteCashe(newVersion) {
      localStorage.setItem(
        `${import.meta.env.VITE_SITE_NM}_Version`,
        newVersion
      );
      this.version = newVersion;
      // 캐쉬 지우기
      caches
        .keys()
        .then((cacheNames) => {
          return Promise.all(cacheNames.map((name) => caches.delete(name)));
        })
        .then(() => {
          // console.log('update app...');
        });

      setTimeout(() => {
        window.location.reload();
      }, 100);
    },
  },
};
</script>

<template>
  <div>
    <!-- 페이지를 찾을수 없습니다. -->
    <M4_No_User_Page v-if="bNoPage"></M4_No_User_Page>

    <div v-else>
      <div class="d-flex title-xxlarge">
        {{ BOARD_NM }}
        <v-spacer></v-spacer>
        <v-btn v-if="NMBR_WRT_YN" @click="ShowEditDialog()" ><v-icon aria-hidden="true" style="margin-right: 6px;">mdi-pencil</v-icon>{{ $t("all_btn_write") }}</v-btn>
      </div>


      <!-- 탭 네비게이션 -->
      <div role="tablist" class="d-flex flex-wrap tab_back" style="width: 100%; overflow-x: hidden;">
        <button :aria-label="item.CONTS_NM + ' ' + (item.value == iTab?`선택됨`:'')" v-for="(item, i) in zTab" :key="i" :class="(iTab == i?'sel_box_btn':'nor_box_btn') + ' center_all'"
          role="tab" @click="ChangeContents(item, i, false)"
          @keydown.left="moveTab(i, -1)" @keydown.right="moveTab(i, 1)">
          {{item.CONTS_NM}}
        </button>        
      </div>

      <!-- 각 컨텐츠별로 해당내용 불러옴 -->
      <M4_Dynamic_NoContents :bShowPageTitle="false" :bShowBoardTitle="false" :bShowFormTitle="false" @ShowEditBtn_ContentPage="ShowEditBtn" v-if="bShowContents" ref="M4_Dynamic_NoContents_ref"></M4_Dynamic_NoContents>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import * as Util from "@/Util.js";
// import { EventBus } from '@/EventBus.js';

export default {
  data() {
    return {
      BOARD_NM : "", // 컨텐츠형 게시판 이름
      PATH : "", // 현재 Path
      MENU_ID : "", // 메뉴 아이디
      iTab : 0, 
      bShowContents : false, // 개별 컨텐츠창 열기
      bNoPage : false, // 페이지 없음 열기
      NMBR_WRT_YN : false, // 수정창 버튼 유무

      zTab : [],
    };
  },

  mounted() {
  },

  methods: {    
    moveTab(currentIndex, direction) {
      let newIndex = currentIndex + direction;
      if (newIndex < 0) {
        newIndex = this.zTab.length - 1; // 처음에서 왼쪽 누르면 마지막으로 이동
      } else if (newIndex >= this.zTab.length) {
        newIndex = 0; // 마지막에서 오른쪽 누르면 처음으로 이동
      }

      const newTab = this.zTab[newIndex];
      this.ChangeContents(newTab, newIndex, false)


      // 이동한 탭에 focus 적용
      this.$nextTick(() => {
        this.$el.querySelectorAll("[role='tab']")[newIndex].focus();
      });
    },

    // M4_DYNAMIC_NoContents.vue에서 받아와서 보여줌. (위쪽에 설정되어야해서 받아옴.)
    ShowEditBtn(cShowEditBtn) {
      this.NMBR_WRT_YN = Util.bStringToBool(cShowEditBtn)
    },

    // 목록형 게시판에서 수정다이올로그 열기
    ShowEditDialog() {
      this.$refs.M4_Dynamic_NoContents_ref.ShowDynamicBoardListDialog()
    },

    // 데이터 초기화
    initData() {
      this.bShowContents = false;
      this.bNoPage = false;
    },

    // 페이지 없음 열기
    ShowNoPage() {
      this.bNoPage = true;
    },

    // user_page.vue에서 호출하는 함수
    SortDisplayType(MENU_ID, BOARD_NM, PATH) {
      this.initData();
      this.BOARD_NM = BOARD_NM
      this.PATH = PATH

      this.GetDynamicContentTabList(MENU_ID)
    },

    // 한 매뉴에 여러개의 컨텐츠 정보를 가져옴
    GetDynamicContentTabList(MENU_ID) {
      this.zTab = []
      this.MENU_ID = MENU_ID

      var posData = {
        SITE_ID : import.meta.env.VITE_SITE_ID,
        MENU_ID : MENU_ID,
      };

      axios
        .post(import.meta.env.VITE_UIL_API + "GetDynamicContentTabList", posData , {
        })
        .then(res => {
          if (res.data.ResultCd === "00") {
            if (res.data.Result.length == 0) {
              return
            }

            // 탭과 각 컨텐츠 정보를 넣음
            for (let i = 0; i < res.data.Result.length; i ++) {
              this.zTab.push(res.data.Result[i])
            }

            this.bShowContents = true
            this.$nextTick(() => {
              // 첫번째 탭의 정보를 가져옴
              this.ChangeContents(res.data.Result[0], 0, true)
            })
          } else {
            this.ShowNoPage()
          }
        })
        .catch(err => {
          this.ShowNoPage()
          console.log("GetPageInfo : Error !", err);
        });
    },

    // 해당 탭의 정보를 가져옴
    ChangeContents(item, iTab, bEnterPage) {
      // 동적 게시판 중 콘텐츠에서 접속 시 최초에는 접속 로그를 쌓지 않고, Tab을 누를 때 접속 로그를 쌓음(router/index.js 에서 접속 후 쌓음)
      if (!bEnterPage) {
        this.$store.commit('SetEnterContent', {
          cPath : this.PATH,
          iIndex : iTab,
        });
      }
      this.iTab = iTab
      this.$refs.M4_Dynamic_NoContents_ref.SortDisplayType(this.MENU_ID, item.PAGE_ID, item.BOARDLIST_ID, item.FORM_TYPE, item.CONTS_TYPE)
    },

  }
}
</script>

<style scoped>
</style>
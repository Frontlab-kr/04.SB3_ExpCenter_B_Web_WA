<template>
  <div>
    <!-- 페이지를 찾을수 없습니다. -->    
    <M4_No_User_Page v-if="bNoPage"></M4_No_User_Page>

    <!-- 페이지형 -->
    <M4_Dynamic_Page :bShowPageTitle="bShowPageTitle" v-if="bShowPage" @ShowNoPage="ShowNoPage" ref="M4_Dynamic_Page_ref"></M4_Dynamic_Page>

    <!-- 게시판형(TYPE: L, V, G) -->
    <M4_Dynamic_Board_List :bShowBoardTitle="bShowBoardTitle" v-if="bShowList" ref="M4_Dynamic_Board_List_ref"></M4_Dynamic_Board_List>
    <M4_Dynamic_Board_Video :bShowBoardTitle="bShowBoardTitle" v-if="bShowVideo" ref="M4_Dynamic_Board_Video_ref"></M4_Dynamic_Board_Video>
    <M4_Dynamic_Board_Gallery :bShowBoardTitle="bShowBoardTitle" v-if="bShowGallery" ref="M4_Dynamic_Board_Gallery_ref"></M4_Dynamic_Board_Gallery>

    <!-- 서식형 -->
    <M4_Dynamic_Form :bShowFormTitle="bShowFormTitle" v-if="bShowForm" ref="M4_Dynamic_Form_ref"></M4_Dynamic_Form>
    <div class="bg-gap"></div>

    <!-- 만족도 평가-->
    <M4_Satisfaction v-if="DGSTFN_EXMN_YN" :MNG_DEPT_NM="MNG_DEPT_NM" :MNG_DEPT_TELNO="MNG_DEPT_TELNO" :CONTS_ID="CONTS_ID" ref="M4_Satisfaction_ref"></M4_Satisfaction>

  </div>
</template>

<script>
import axios from "axios";
import * as Util from "@/Util.js";

export default {
  props : ["bShowPageTitle", "bShowBoardTitle", "bShowFormTitle"],
  data() {
    return {
      // bShowSatisfaction : true, // 만족도 평가 보여주기

      bShowPage : false, // 페이지형 열기
      bShowList : false, // 게시판(목록형) 열기
      bShowVideo : false, // 게시판(영상형) 열기
      bShowGallery : false, // 게시판(겔러리형) 열기
      bShowForm : false, // 서식형 열기
      bNoPage : false, // 페이지 없음 열기

      DGSTFN_EXMN_YN : false, // 만족도평가 유무
      MNG_DEPT_NM : "", // 담당부서명
      MNG_DEPT_TELNO : "", // 담당부서 전화번호
      CONTS_ID : "", // 컨텐츠 아이디
    };
  },

  computed: {
  },

  mounted() {
  },

  methods : {
    // 데이터 초기화
    initData() {
      this.bShowPage = false;
      this.bShowForm = false;
      this.bShowList = false;
      this.bShowVideo = false;
      this.bShowGallery = false;
      this.bNoPage = false;

      this.DGSTFN_EXMN_YN = false;
      this.MNG_DEPT_NM = "";
      this.MNG_DEPT_TELNO = "";
      this.CONTS_ID = "";
    },

    // 목록형 게시판에서 수정다이올로그 열기 (M4_Dynamic_Contents.vue에서 호출됨)
    ShowDynamicBoardListDialog() {
      this.$refs.M4_Dynamic_Board_List_ref.ShowDialog()
    },

    // 페이지 없음 열기
    ShowNoPage() {
      this.bNoPage = true;
    },

    // 시작 함수 (user_page.vue와 M4_Dynamic_Contents.vue에서 호출됨)
    // 총 5가지 vue로 routing (P:페이지, F:서식형, 게시판형(L:리스트, G:겔러리, V:동영상))
    SortDisplayType(MENU_ID, PAGE_ID, BOARDLIST_ID, FORM_TYPE, TS_TYPE) {
      this.initData();

      if (TS_TYPE == "P") {
        this.GetDynamicPageOutLine(MENU_ID, PAGE_ID)
      } else if (TS_TYPE == "F") {
        this.GetDynamicFormOutLine(MENU_ID, FORM_TYPE)
      } else {
        // 게시판인 경우, API로 L/G/V 확인 후 라우팅
        this.GetDynamicBoardOutLine(MENU_ID, BOARDLIST_ID)
      }
    },

    // 페이지형 정보개요 가져오기 (T_MENU_CONTS_INFO 테이블에서 검색)
    GetDynamicPageOutLine(MENU_ID, PAGE_ID) {
      var posData = {
        SITE_ID : import.meta.env.VITE_SITE_ID,
        MENU_ID : MENU_ID,
        PAGE_ID : PAGE_ID,
      };

      axios
        .post(import.meta.env.VITE_UIL_API + "GetDynamicPageOutLine", posData , {
        })
        .then(res => {
          if (res.data.ResultCd === "00") {
            if (res.data.Result.length == 0) {
              this.ShowNoPage()
              return
            }

            this.$store.commit('SetShowShareSNSBtn', Util.bStringToBool(res.data.Result[0].SNS_YN));
            this.DGSTFN_EXMN_YN = Util.bStringToBool(res.data.Result[0].DGSTFN_EXMN_YN)
            this.MNG_DEPT_NM = res.data.Result[0].MNG_DEPT_NM
            this.MNG_DEPT_TELNO = res.data.Result[0].MNG_DEPT_TELNO
            this.CONTS_ID = res.data.Result[0].CONTS_ID

            this.bShowPage = true
            // 페이지형으로 라우팅
            this.$nextTick(() => {
              this.$refs.M4_Dynamic_Page_ref.GetDynamicPageInfo(MENU_ID, PAGE_ID)
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

    // 서식형 정보개요 가져오기 (T_MENU_CONTS_INFO 테이블에서 검색)
    GetDynamicFormOutLine(MENU_ID, FORM_TYPE) {
      var posData = {
        SITE_ID : import.meta.env.VITE_SITE_ID,
        MENU_ID : MENU_ID,
        FORM_TYPE : FORM_TYPE,
      };

      axios
        .post(import.meta.env.VITE_UIL_API + "GetDynamicFormOutLine", posData , {
        })
        .then(res => {
          if (res.data.ResultCd === "00") {
            if (res.data.Result.length == 0) {
              this.ShowNoPage()
              return
            }

            this.$store.commit('SetShowShareSNSBtn', Util.bStringToBool(res.data.Result[0].SNS_YN));
            this.DGSTFN_EXMN_YN = Util.bStringToBool(res.data.Result[0].DGSTFN_EXMN_YN)
            this.MNG_DEPT_NM = res.data.Result[0].MNG_DEPT_NM
            this.MNG_DEPT_TELNO = res.data.Result[0].MNG_DEPT_TELNO
            this.CONTS_ID = res.data.Result[0].CONTS_ID

            this.bShowForm = true
            this.$nextTick(() => {
              this.$refs.M4_Dynamic_Form_ref.GetDynamicFormInfo(MENU_ID, FORM_TYPE, res.data.Result[0].CONTS_NM)
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

    // 게시판형 정보개요 가져오기 (T_MENU_CONTS_INFO 테이블에서 검색)
    // 게시판 유형별로 해당 게시판 불러오기 (L, V, G)
    GetDynamicBoardOutLine(MENU_ID, BOARDLIST_ID) {
      var posData = {
        SITE_ID : import.meta.env.VITE_SITE_ID,
        MENU_ID : MENU_ID,
        BOARDLIST_ID : BOARDLIST_ID,
      };

      axios
        .post(import.meta.env.VITE_UIL_API + "GetDynamicBoardOutLine", posData , {
        })
        .then(res => {
          if (res.data.ResultCd === "00") {
            if (res.data.Result.length == 0) {
              this.ShowNoPage()
              return
            }

            this.$store.commit('SetShowShareSNSBtn', Util.bStringToBool(res.data.Result[0].SNS_YN));
            this.$emit('ShowEditBtn_ContentPage', res.data.Result[0].NMBR_WRT_YN);
            this.DGSTFN_EXMN_YN = Util.bStringToBool(res.data.Result[0].DGSTFN_EXMN_YN)
            this.MNG_DEPT_NM = res.data.Result[0].MNG_DEPT_NM
            this.MNG_DEPT_TELNO = res.data.Result[0].MNG_DEPT_TELNO
            this.CONTS_ID = res.data.Result[0].CONTS_ID

            if (res.data.Result[0].BOARD_TYPE == "L") {
              this.bShowList = true
              this.$nextTick(() => {
                this.$refs.M4_Dynamic_Board_List_ref.InitDynamicBoardListInfo(res.data.Result)
              })
            } else if (res.data.Result[0].BOARD_TYPE == "V") {
              this.bShowVideo = true
              this.$nextTick(() => {
                this.$refs.M4_Dynamic_Board_Video_ref.InitDynamicBoardVideoInfo(res.data.Result)
              })
            } else {
              this.bShowGallery = true
              this.$nextTick(() => {
                this.$refs.M4_Dynamic_Board_Gallery_ref.InitDynamicBoardGalleryInfo(res.data.Result)
              })
            }
          } else {
            this.ShowNoPage()
          }
        })
        .catch(err => {
          this.ShowNoPage()
          console.log("GetPageInfo : Error !", err);
        });
    },

    // EndSatisfaction() {
    //   this.bShowSatisfaction = false
    // },
  }
}
</script>

<style scoped>
</style>
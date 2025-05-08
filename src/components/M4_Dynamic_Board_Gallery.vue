<template>
  <div>
    <!-- 제목 -->
    <h1 v-if="bShowBoardTitle" class="title-xxlarge">{{ BOARD_NM }}</h1>

    <!-- 검색, 겔러리 카드 -->
    <div class="mt-2 pa-3" v-resize="onResize">
      <M4_Input      
        :label="$t('common_search')"        
        :placeholder="$t('req_policy_placeholder')"        
        v-model="cNowSearchKeyWord"
        icon="mdi-magnify"                
        @keyup.enter="GetDynamicBoardGalleryInfo"
        @click:append-inner="GetDynamicBoardGalleryInfo">        
      </M4_Input>
      <div class="d-flex flex-wrap">
        <v-card v-for="(item, index) in zData" :key="index" :class="cShowCardClass" @click="ShowDialog(item)" @keyup.enter="ShowDialog(item)" class="pa-3 mouse-cur" tabindex="0" role="button" aria-label="상세화면">
          <v-img :src="item.cShowPath" :height="100" style="margin-bottom: 8px;" alt=""></v-img>
          <div class="show_list_title line_clamp_2">{{ item.PST_TTL }}</div>
          <div style="font-size: 13px;">{{ item.cShowCreateDateTime }}</div>
        </v-card>
      </div>
    </div>

    <!-- 상세 다이올로그 (이전/다음 버튼 계산하여 활성화 여부 송부)-->
    <M4_ShowGalleryDialog
      :iWidth="'60%'"
      :bDisablePreBtn="bDisablePreBtn"
      :bDisableNextBtn="bDisableNextBtn"
      @ChangeBoardDetail="ChangeBoardDetail"
      ref="M4_ShowGalleryDialog_ref"
    ></M4_ShowGalleryDialog>
  </div>
</template>

<script>
import axios from "axios";
import * as Util from "@/Util.js";
import { EventBus } from '@/EventBus.js';

export default {
  props : ["bShowBoardTitle"],
  data() {
    return {
      cShowCardClass : "",
      BOARD_NM : "",
      cNowSearchKeyWord : "",
      zData : [],
      SHOW_PST_ID : "",

      iShowIndex : -1,
    };
  },

  computed: {
    // 상세 다오올로그 이전 게시글 보기 아이콘 표시 유무
    bDisablePreBtn() {
      return this.iShowIndex == 0
    },
    // 상세 다오올로그 다음 게시글 보기 아이콘 표시 유무
    bDisableNextBtn() {
      return this.iShowIndex == this.zData.length - 1
    },
  },

  mounted() {
    // this.SHOW_PST_ID = this.$store.state.link_param;
    // this.$store.state.link_param = "";

    // if (this.SHOW_PST_ID == "") {
    //   this.SHOW_PST_ID = this.$route.query.id ? this.$route.query.id : ""
    // }
    
    this.SHOW_PST_ID = this.$route.query.id ? this.$route.query.id : ""
  },

  methods: {
    // 윈도우창 크기에 따라 겔러리목록 CSS
    onResize() {
      if (this.$vuetify.display.md) {
        this.cShowCardClass = "card_list_md"
      } else if (this.$vuetify.display.sm) {
        this.cShowCardClass = "card_list_sm"
      } else if (this.$vuetify.display.xs) {
        this.cShowCardClass = "card_list_xs"
      } else {
        this.cShowCardClass = "card_list_lg"
      }
    },

    // M4_Dynamic_Board_Video.vue에서 호출
    InitDynamicBoardGalleryInfo(zResult) {
      this.BOARD_NM = zResult[0].BOARD_NM

      this.BOARDLIST_ID = zResult[0].BOARDLIST_ID
      this.BOARD_TABLE_NM = zResult[0].BOARD_TABLE_NM

      this.GetDynamicBoardGalleryInfo()
    },

    // 겔러리형 게시판 목록 가져오기
    GetDynamicBoardGalleryInfo() {
      this.zData = []

      var posData = {
        BOARDLIST_ID : this.BOARDLIST_ID,
        BOARD_TABLE_NM : this.BOARD_TABLE_NM,

        NowSearchKeyWord: this.cNowSearchKeyWord,
      }

      axios
        .post(import.meta.env.VITE_UIL_API + "GetDynamicBoardGalleryInfo", posData , {
          headers: {
          }
        })
        .then(res => {
          if (res.data.ResultCd === "00") {
            res.data.Result.forEach((item) => {
              item.cShowCreateDateTime = Util.ConvertTimeToDate(item.CRT_DT)
              item.cShowPath = import.meta.env.VITE_FILE_API + item.FILE_PATH
            })

            this.zData = res.data.Result
            console.log(this.zData);
            // 특정 게시판 글을 요구할 경우 (메인페이지에서 특정 공지사항 클릭시)
            if (this.SHOW_PST_ID != "") {
              let iShowIndex = this.zData.find((item) => {
                return item.PST_ID == this.SHOW_PST_ID
              })
              this.ShowDialog(iShowIndex)
            }
          } else {
            EventBus.$emit("onShowMsg", {
              cSubTitle : "목록 조회 중 문제가 발생했습니다.",
              cTitle : "계속 지속될 경우 담당자에게 문의 바랍니다.",
              cMsg : `Error : ${res.data.Msg}`,
            });
          }
        })
        .catch(err =>{
          // EventBus.$emit("onShowMsg", {
          //   cSubTitle : "목록 조회 중 문제가 발생했습니다.",
          //   cTitle : "계속 지속될 경우 담당자에게 문의 바랍니다.",
          //   cMsg : `Error : ${err}`,
          // });
        })
        .finally(() =>{
        })
    },

    // 상세 다이올로그 보여주기 (업데이트)
    async ShowDialog(item) {
      this.iShowIndex = this.zData.indexOf(item)
      console.log(">>>>>>>>>>>>>>", this.iShowIndex);
      // 상세 겔러리 정보 가저오기 API
      var res = await this.GetDynamicBoardGalleryItemInfo(item.PST_ID)
      if (res.data.ResultCd == "44") { EventBus.$emit("onTokenExpired"); return; }

      if (res.data.ResultCd == "00") {
        if (res.data.Result1.length == 0) {
          // alert("조회된 정보가 없습니다.")
        } else {
          // 가져온 정보로 다이올로그 열기
          this.$refs.M4_ShowGalleryDialog_ref.ShowDialog({
            cDialogTitle : this.BOARD_NM,
            SelectIndex : this.iShowIndex,
            PST_TTL : res.data.Result1[0].PST_TTL,
            PST_CN : res.data.Result1[0].PST_CN,
            COPYRIGHT_YN: res.data.Result1[0].COPYRIGHT_YN == "Y" ? true: false,
            COPYRIGHT_TYPE: res.data.Result1[0].COPYRIGHT_TYPE,
          }, res.data.Result2)
        }
      } else {
        EventBus.$emit("onShowMsg", {
          cSubTitle: "상세 보기 중 문제가 발생했습니다.",
          cTitle:"문제가 계속 되면 관리자에게 문의 바랍니다.",
          cMsg: `(${res.data.ResultCd}) ${res.data.Msg}`
        });
      }
    },

    // 상세 겔러리 정보 가저오기 API
    GetDynamicBoardGalleryItemInfo(PST_ID) {
      var posData = {
        SITE_ID : import.meta.env.VITE_SITE_ID,
        BOARDLIST_ID : this.BOARDLIST_ID,
        BOARD_TABLE_NM : this.BOARD_TABLE_NM,
        PST_ID : PST_ID,
      }

      return new Promise((resolve) => (
        axios
        .post(import.meta.env.VITE_UIL_API + "GetDynamicBoardGalleryItemInfo", posData, {
          headers: {
            // "Authorization": this.CustomInfo.Token
          }
        })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          resolve({
            data : {
              ResultCd : "98",
              Msg : err,
            }
          });
        })
      ))
    },

    // 이전/다음 겔러리 보여주기
    ChangeBoardDetail(iSelectIndex) {
      this.ShowDialog(this.zData[iSelectIndex])
    },
  },
}
</script>

<style scoped>
.card_list_lg {
  margin: 6px;
  width: 212px;
  height: 200px
}

.card_list_md {
  margin: 4px;
  width: 23%;
  height: 200px
}

.card_list_sm {
  margin: 4px;
  width: 30%;
  height: 200px
}

.card_list_xs {
  margin: 4px;
  width: 48%;
  height: 200px
}

.show_list_title {
  font-size: 15px;
  margin-bottom: 5px;
  max-height: 50px;
}

.show_list_title:hover {
  text-decoration : underline;
}
</style>
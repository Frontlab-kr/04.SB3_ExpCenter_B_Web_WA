<template>
  <div>  
    <div v-if="bShowBoardTitle" class="title-xxlarge">{{ BOARD_NM }}</div>    
    <div class="mt-2 pa-3">
      <M4_Input
        :label="$t('common_search')"
        :aria-label="$t('common_search')"
        :placeholder="$t('all_table_placeholder_1')"
        v-model="cNowSearchKeyWord"
        @keyup.enter="GetDynamicBoardVideoInfo"
        @click:append-inner="GetDynamicBoardVideoInfo"        
        iconTitle="검색"
        icon="mdi-magnify">        
      </M4_Input>      
      <v-data-table
        :headers="headers"
        :items="zData"
        item-key="PST_ID"
        aria-labelledby="table-caption">        
        <template v-slot:default="props">
          <table class="nor_table_center">
            <caption id="table-caption" class="sr-only">{{ BOARD_NM }} 테이블</caption>
            <thead>
              <tr>
                <th v-for="header in props.headers[0]" :key="header.value" scope="col">
                  {{ header.title}}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in props.items" :key="item.PST_ID">
                <td>
                  <div class="pa-4" align="center" @click="ShowDialog(item)">
                    <v-img :src="item.cPreViewPath" width="120" alt="게시글 미리보기 이미지"></v-img>
                  </div>
                </td>
                <td>
                  <div @click="ShowDialog(item)" @keyup.enter="ShowDialog(item)" class="data_title" tabindex="0" alt="상세화면">{{ item.PST_TTL }}</div>              
                </td>
                <td>{{ item.cShowCreateDateTime }}</td>
              </tr>
            </tbody>
          </table>
        </template> 
      </v-data-table>
      <!-- <v-data-table
        :headers="headers"
        :items="zData"
        item-key="PST_ID"
        aria-labelledby="table-caption"
      >
        <template v-slot:top>
          <caption id="table-caption" class="sr-only">{{ BOARD_NM }} 테이블</caption>
        </template>        
        <template v-slot:item.cPreViewPath="{ value }">
          <div class="pa-4" align="center">
            <v-img :src="value" width="120" alt="게시글 미리보기 이미지"></v-img>
          </div>
        </template>        
        <template v-slot:item.PST_TTL="{ item, value }">
          <div @click="ShowDialog(item)" @keyup.enter="ShowDialog(item)" class="data_title" tabindex="0" aria-label="엔터키를 누르면 상세화면을 보실 수 있습니다.">{{ value }}</div>
        </template>
      </v-data-table> -->
    </div>

    <!-- 상세 다이올로그 -->
    <M4_ShowVideoDialog
      :caption="BOARD_NM"
      :iWidth="'80%'"
      :bDisablePreBtn="bDisablePreBtn"
      :bDisableNextBtn="bDisableNextBtn"
      @ChangeBoardDetail="ChangeBoardDetail"
      ref="M4_ShowVideoDialog_ref"
    ></M4_ShowVideoDialog>
  </div>
</template>

<script>
import axios from "axios";
import { EventBus } from '@/EventBus.js';
import * as Util from "@/Util.js";

export default {
  props : ["bShowBoardTitle"],
  data() {
    return {
      BOARD_NM : "",
      BOARDLIST_ID : "",
      BOARD_TABLE_NM : "",
      cNowSearchKeyWord : "",
      headers : [
        { title: this.$t("all_table_header_10"), key: 'cPreViewPath', sortable: false, align: 'center'},
        { title: this.$t("req_form_table_header_1"), key: 'PST_TTL'},
        { title: '생성시간', key: 'cShowCreateDateTime'},
      ],
      zData : [],

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

  methods: {
    // M4_Dynamic_Board_Video.vue에서 호출
    InitDynamicBoardVideoInfo(zResult) {
      this.BOARD_NM = zResult[0].BOARD_NM

      this.BOARDLIST_ID = zResult[0].BOARDLIST_ID
      this.BOARD_TABLE_NM = zResult[0].BOARD_TABLE_NM

      this.GetDynamicBoardVideoInfo()
    },

    // 비디오형 게시판 목록 가져오기
    GetDynamicBoardVideoInfo() {
      this.zData = []

      var posData = {
        BOARDLIST_ID : this.BOARDLIST_ID,
        BOARD_TABLE_NM : this.BOARD_TABLE_NM,

        NowSearchKeyWord: this.cNowSearchKeyWord,
      }

      axios
        .post(import.meta.env.VITE_UIL_API + "GetDynamicBoardVideoInfo", posData , {
          headers: {
          }
        })
        .then(res => {
          if (res.data.ResultCd === "00") {
            this.zData = res.data.Result.map((item) => {
              item.cShowCreateDateTime = Util.ConvertTimeToDate(item.CRT_DT)
              item.cPreViewPath = import.meta.env.VITE_FILE_API + item.FILE_PATH
              return item
            })
          } else {
            EventBus.$emit("onShowMsg", {
              cSubTitle : "목록 조회 중 문제가 발생했습니다.",
              cTitle : "계속 지속될 경우 담당자에게 문의 바랍니다.",
              cMsg : `Error : ${res.data.Msg}`,
            });
          }
        })
        .catch(err =>{
          EventBus.$emit("onShowMsg", {
            cSubTitle : "목록 조회 중 문제가 발생했습니다.",
            cTitle : "계속 지속될 경우 담당자에게 문의 바랍니다.",
            cMsg : `Error : ${err}`,
          });
        })
        .finally(() =>{
        })
    },

    // 상세화면 다이올로그 열기
    handleRowClick(event, {item}) {
      // console.log("handleRowClick >>>>", item);
      this.ShowDialog(item)
    },

    // 상세화면 다오올로그 열기
    async ShowDialog(item) {
      // console.log(event);
      // event.stopPropagation()
      this.iShowIndex = this.zData.indexOf(item)

      // 상세 겔러리 정보 가저오기 API
      var res = await this.GetDynamicBoardVideoItemInfo(item.PST_ID)
      if (res.data.ResultCd == "44") { EventBus.$emit("onTokenExpired"); return; }

      if (res.data.ResultCd == "00") {
        if (res.data.Result.length == 0) {
          // alert("조회된 정보가 없습니다.")
        } else {
          // 가져온 정보로 다이올로그 열기
          this.$refs.M4_ShowVideoDialog_ref.ShowDialog({
            SelectIndex : this.iShowIndex,
            INQ_CNT : res.data.Result[0].INQ_CNT,
            CRT_USER_ID : res.data.Result[0].CRT_USER_ID,
            PST_TTL : res.data.Result[0].PST_TTL,
            PST_CN : res.data.Result[0].PST_CN,
          })
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
    GetDynamicBoardVideoItemInfo(PST_ID) {
      var posData = {
        SITE_ID : import.meta.env.VITE_SITE_ID,
        BOARDLIST_ID : this.BOARDLIST_ID,
        BOARD_TABLE_NM : this.BOARD_TABLE_NM,
        PST_ID : PST_ID,
      }

      return new Promise((resolve) => (
        axios
        .post(import.meta.env.VITE_UIL_API + "GetDynamicBoardVideoItemInfo", posData, {
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
.data_title:hover {
  cursor: pointer;
}
</style>
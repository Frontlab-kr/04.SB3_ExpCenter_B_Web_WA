<template>
  <div>
    <!-- 제목 및 글생성 버튼  -->
    <h1 v-if="bShowBoardTitle" class="d-flex title-xxlarge">
      {{ BOARD_NM }}
      <v-spacer></v-spacer>
      <v-btn v-if="NMBR_WRT_YN" @click="ShowDialog()" title=""><v-icon aria-hidden="true" style="margin-right: 6px;">mdi-pencil</v-icon>{{ $t("all_btn_write") }}</v-btn>
    </h1>      

    <div class="mt-2 pa-3">      
      <v-row>        
        <v-col>
           <M4_Input            
            v-model="cNowSearchKeyWord"
            icon="mdi-magnify"            
            @keyup.enter="GetDynamicBoardListInfo()"
            @click:append-inner="GetDynamicBoardListInfo()"
            :label="$t('common_search')"      
            :placeholder="$t('req_policy_placeholder')">
          </M4_Input>
        </v-col>
      </v-row>      

      <!-- 목록형 게시판 -->
      <v-data-table
        :headers="headers"
        :items="zData"
        @click:row="handleRowClick"
        v-model:page="pagination.page"
        v-model:items-per-page="pagination.itemsPerPage"
        @update:page="handlePageChange"
        item-key="PST_ID"
        class="nor_table_center"
        aria-labelledby="table-caption">        
        <template v-slot:default="props">
          <table class="nor_table_center">
            <caption id="table-caption" class="sr-only">{{BOARD_NM}} 게시판</caption>
            <thead>
            <tr>
              <th v-for="header in props.headers[0]" :key="header.value" scope="col">
                {{ header.title}}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in props.items" :key="item.PST_ID" @click="handleRowClick(null, {item})">            
              <td>
                <div v-if="item.bNotice" style="border-radius : 5px; background-color: rgb(76,175,80); color: white; width: 45px;">공지</div>
                <div v-else>{{ item.iIndex }}</div>
              </td>
              <td>
                <button class="d-flex line_clamp_1" tabindex="0" :style="'margin-left : ' + item.PST_DEPTH * 20 + 'px'"  @click="handleRowClick(null, {item})"
                   @keydown.enter="handleRowClick(null, {item})" style="cursor: pointer;" :title="item.PST_TTL + '열기'">
                  <v-icon aria-hidden="true" v-if="item.PST_ID != item.UP_PST_ID" style="margin-top: 1px;" size="15">mdi-arrow-right-bottom-bold</v-icon>
                  <v-icon aria-hidden="true" v-if="item.PRVT_YN == 'Y'">mdi-lock</v-icon> {{ item.PST_TTL }}                  
                </button>
              </td>
              <td v-if="ATCH_FILE_USE_YN">
                <div v-if="item.is_file" @click="ClickIconDirect($event, item)" @keyup.enter="ClickIconDirect($event, item)" role="button" tabindex="0" title="첨부 파일 다운로드"><v-icon aria-hidden="true">mdi-file</v-icon></div>
              </td>
              <td>{{item.CRT_USER_ID}}</td>
              <td>{{item.cShowCreateDateTime}}</td>
              <td>{{item.INQ_CNT}}</td>
            </tr>
          </tbody>
        </table>
          
        </template>
      </v-data-table>

      <!-- <v-data-table
        :headers="headers"
        :items="zData"
        @click:row="handleRowClick"
        item-key="PST_ID"
        aria-labelledby="table-caption"
      >
        <template v-slot:top>
          <caption id="table-caption" class="sr-only">{{ BOARD_NM }} 게시판</caption>
        </template>        
        <template v-slot:item.iIndex ="{ item, value }">
          <div align="center">
            <div v-if="item.bNotice" style="border-radius : 5px; background-color: rgb(76,175,80); color: white; width: 45px;">공지</div>
            <div v-else>{{ value }}</div>
          </div>
        </template>        
        <template v-slot:item.PST_TTL="{ item, value }">
          <div class="d-flex line_clamp_1" tabindex="0" :style="'margin-left : ' + item.PST_DEPTH * 20 + 'px'">
            <v-icon v-if="item.PST_ID != item.UP_PST_ID" style="margin-top: 1px;" size="15">mdi-arrow-right-bottom-bold</v-icon>
            <div ><v-icon v-if="item.PRVT_YN == 'Y'">mdi-lock</v-icon> {{ value }}</div>
          </div>
        </template>        
        <template v-slot:item.is_file="{ item, value }">
          <div v-if="value" @click="ClickIconDirect($event, item)" @keyup.enter="ClickIconDirect($event, item)" role="button" tabindex="0" alt="첨부 파일 다운로드"><v-icon aria-hidden="true">mdi-file</v-icon></div>
        </template>
      </v-data-table>
     -->
    </div>

    <!-- 게시판 글 생성 및 수정 다이올로그-->
    <v-dialog v-model="bDialog" width="60%" aria-modal="true" @update:modelValue="DialogClose">
      <v-card class="pa-4 pl-6 pr-6">
        <div class="d-flex">
          <h1 class="title-xxlarge">{{ sFormatTitle }}</h1>
          <v-spacer></v-spacer>
          <v-btn variant="plain" class="mt-n1 mr-n3" icon @click="DialogClose" aria-label="닫기"><v-icon aria-hidden="true">mdi-close</v-icon></v-btn>
        </div>

        <div style="max-height: 80vh; overflow: auto;">
          <v-row class="ma-0">
            <v-col cols="12" md="4" sm="12">
              <M4_Input v-model="oEditItem.CRT_USER_ID" :disabled="oEditItem.PST_ID != ''" :label="$t('all_table_header_5') + '(*)'"></M4_Input>
            </v-col>
            <v-col cols="12" md="4" sm="12">
              <M4_Input :iconTitle="bShow1?'비밀번호 감추기':'비밀번호 보기'" v-model="oEditItem.PSWD" :disabled="oEditItem.PST_ID != ''" :label="$t('all_table_header_9') + '(*)'" @click:append-inner="bShow1 = !bShow1"  :class="{'test_password_style' : !bShow1}" :icon="sAppendIcon1"></M4_Input>
              <div>※ 글 수정 및 삭제시 필요합니다.</div>
            </v-col>
            <v-col cols="12" md="4" sm="12">
              <v-switch v-if="PRVT_USE_YN" v-model="oEditItem.bSecret" :label="$t('req_policy_header_2')" color="black" density="compact" hide-details></v-switch>
            </v-col>
            <v-col cols="12">
              <M4_Input v-model="oEditItem.PST_TTL" :label="$t('all_table_header_4') + '(*)'" ></M4_Input>
            </v-col>
            <v-col cols="12">
              <Editor ref="FroalaEditor" v-model="oEditItem.PST_CN" @UpdateData="UpdateData"></Editor>
            </v-col>
            <v-col :style="(ATCH_FILE_USE_YN ? '':'display: none !important;')" cols="12" md="12" sm="12">
              <M4_Input v-model="oEditItem.FILE_NM" :label="$t('all_dialog_item_1')" @click:clear="onClear" clearable readonly ></M4_Input>
            </v-col>
          </v-row>
        </div>

        <div class="d-flex flex-wrap mt-4">
          <input v-if="ATCH_FILE_USE_YN" type="file" ref="fileInput" style="display: none;" multiple @change="onFileSelected">
          <v-btn v-if="ATCH_FILE_USE_YN" @click="GetFile()" class="mr-2 mb-1" style="min-width: 100px;" aria-label="파일 첨부">{{ $t("all_btn_add_file")}}<v-icon aria-hidden="true" class="ml-1">mdi-paperclip</v-icon></v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="SetDynamicBoardListInfo()" class="mb-1" color="primary" width="100" aria-label="저장">{{ $t("all_btn_save")}}<v-icon aria-hidden="true" class="ml-1">mdi-upload</v-icon></v-btn>
        </div>
      </v-card>
    </v-dialog>

    <!-- 비밀번호 확인 다이올로그 -->
    <M4_AuthMember @goauth="ShowSecretDetailDialog" ref="M4_AuthMember_ref"></M4_AuthMember>

    <!-- 상세 다이올로그 -->
    <M4_ShowDetailDialog
      :caption="BOARD_NM"
      :iWidth="'60%'"
      :bDisablePreBtn="bDisablePreBtn"
      :bDisableNextBtn="bDisableNextBtn"
      :bShowEditBtn="NMBR_WRT_YN"
      :bShowDelBtn="NMBR_WRT_YN"
      :bShowReplyUX="CMNT_USE_YN"
      :bShowFileUX="ATCH_FILE_USE_YN"
      @ChangeBoardDetail="OpenDetaillDialog"
      @ShowEditDialogAfterCheckAuth="ShowEditDialogAfterCheckAuth"
      @DelBoardAfterCheckAuth="DelBoardAfterCheckAuth"
      @SetReply="SetDynamicBoardReplyInfo"
      @DelReplyAfterCheckAuth="DelReplyAfterCheckAuth"
      ref="M4_ShowDetailDialog_ref"
    ></M4_ShowDetailDialog>
  </div>
</template>

<script>
import axios from "axios";
import * as Util from "@/Util.js";
import { EventBus } from '@/EventBus.js';

import Editor from "../views/Editor.vue";

export default {
  props : ["bShowBoardTitle"],
  data() {
    return {
      BOARD_NM : "",
      cNowSearchKeyWord: "",
      headers: [
        { title: this.$t("all_table_header_1"), key: 'iIndex', sortable: false, align: 'center'},
        { title: this.$t("all_table_header_4"), key: 'PST_TTL'},
        { title: this.$t("all_table_header_2"), key: 'is_file', sortable: false, align: 'center'},
        { title: this.$t("all_table_header_5"), key: 'CRT_USER_ID'},
        { title: this.$t("all_table_header_6"), key: 'cShowCreateDateTime'},
        { title: this.$t("all_table_header_3"), key: 'INQ_CNT'},
      ],
      zData: [],

      bDialog : false,
      iEditIndex : -1,
      NMBR_WRT_YN : false,
      PRVT_USE_YN : false,
      CMNT_USE_YN : false,
      ATCH_FILE_USE_YN : false,

      SHOW_PST_ID : "",
      BOARDLIST_ID : "",
      BOARD_TABLE_NM : "",
      CMNT_TABLE_NM : "",
      NTC_USE_YN : "",

      NowSelFile : null,
      bShow1: false,
      iCheckIndex: -1,
      oEditItem : {
        PST_ID : "",
        CRT_USER_ID : "",
        PSWD : "",
        PST_CN : "",
        PST_TTL : "",
        bSecret : false,
        FILE_ID : "NONE",
        FILE_NM : "",
        FILE_PATH : "",
        Token : "",
        COPYRIGHT_YN: false,
        COPYRIGHT_TYPE: "",
      },
      oDefaultEditItem : {
        PST_ID : "",
        CRT_USER_ID : "",
        PSWD : "",
        PST_CN : "",
        PST_TTL : "",
        bSecret : false,
        FILE_ID : "NONE",
        FILE_NM : "",
        FILE_PATH : "",
        Token : "",
        COPYRIGHT_YN: false,
        COPYRIGHT_TYPE: "",
      },

      iCheckIndex : -1,
      iEditIndex : -1,

      // 페이징처리 추가로직
      pagination: {
        page: 1, // Current page
        itemsPerPage: 10, // Items per page
      },
      startIndex: 0,
      getItemsPerAction: 200,
      hasMoreData: true,
      totalCount: 0,
    };
  },

  components:{
    Editor,
  },

  computed: {
    // 생성/수정 다이올로그의 타이틀 설정
    sFormatTitle() {
      return this.iEditIndex == -1 ? "신규 작성" : "수정"
    },
    // 비밀번호 입력란 아이콘
    sAppendIcon1() {
      return this.bShow1 ? "mdi-eye" : "mdi-eye-off"
    },
    // 상세 다오올로그 이전 게시글 보기 아이콘 표시 유무
    bDisablePreBtn() {
      return this.iEditIndex == 0
    },
    // 상세 다오올로그 다음 게시글 보기 아이콘 표시 유무
    bDisableNextBtn() {
      return this.iEditIndex == this.zData.length - 1
    },
  },

  mounted() {
    // this.SHOW_PST_ID = this.$store.state.link_param;
    // this.$store.state.link_param = "";

    // if (this.SHOW_PST_ID == "") {
      this.SHOW_PST_ID = this.$route.query.id ? this.$route.query.id : ""
    // }

      this.SHOW_PST_ID = this.$route.query.id ? this.$route.query.id : ""
  },

  methods: {
    DialogClose() {
      this.bDialog = false;      
      this.$store.state.isDialog = false;
      EventBus.$emit("onBackDialogBtn");       
    },


    // M4_Dynamic_NoContents.vue에서 호출됨.
    // 목록형 게시판의 정보(게시판ID, DB테이블명 등)를 설정하고, 각 게시판 글 정보를 API로 요청함
    InitDynamicBoardListInfo(zResult) {
      this.BOARD_NM = zResult[0].BOARD_NM // 게시판 목록 아이디

      this.BOARDLIST_ID = zResult[0].BOARDLIST_ID // 게시판명
      this.BOARD_TABLE_NM = zResult[0].BOARD_TABLE_NM // DB 테이블명
      this.CMNT_TABLE_NM = zResult[0].CMNT_TABLE_NM // 댓글 DB 테이블명
      this.NTC_USE_YN = zResult[0].NTC_USE_YN // 공지 사용 여부

      this.NMBR_WRT_YN = Util.bStringToBool(zResult[0].NMBR_WRT_YN) // 비회원 글쓰기 가능 여부
      this.PRVT_USE_YN = Util.bStringToBool(zResult[0].PRVT_USE_YN) // 비밀글 사용 여부
      this.CMNT_USE_YN = Util.bStringToBool(zResult[0].CMNT_USE_YN) // 댓글 사용 여부
      this.ATCH_FILE_USE_YN = Util.bStringToBool(zResult[0].ATCH_FILE_USE_YN) // 파일 첨부 가능 여부

      // FILE 첨부가 없는 게시판인 경우, file관련 컬럼 삭제 
      if (!this.ATCH_FILE_USE_YN) {
        this.headers.splice(2,1)
      }

      this.GetDynamicBoardListInfo()
    },

    // 페이징처리 추가로직
    handlePageChange() {
      const totalPages = Math.ceil(this.zData.length / this.pagination.itemsPerPage);
      // 첫 페이지이거나 더 이상 가져올 데이터가 없으면 중지
      if (this.pagination.page === 1 || !this.hasMoreData) {
        return;
      }
      if (this.pagination.page == totalPages) {
        this.GetDynamicBoardListInfo(true);
      }
    },

    // 게시판의 글 정보 요청 API
    GetDynamicBoardListInfo(isMore = false) {
      if (!isMore) {
        this.zData = [];
        this.startIndex = 0;
        this.hasMoreData = true;
      }
      if (!this.hasMoreData) {
        return; // 더 이상 가져올 데이터가 없으면 중단
      }

      var posData = {
        BOARDLIST_ID : this.BOARDLIST_ID,
        BOARD_TABLE_NM : this.BOARD_TABLE_NM,

        ATCH_FILE_USE_YN : this.ATCH_FILE_USE_YN,
        PRVT_USE_YN : this.PRVT_USE_YN,
        NowSearchKeyWord: this.cNowSearchKeyWord,

        startIndex: this.startIndex,  // 서버에서 페이징 처리를 지원할 경우 사용
        limit: this.getItemsPerAction, // 한 번에 가져올 데이터 개수
      }

      axios
        .post(import.meta.env.VITE_UIL_API + "GetDynamicBoardListInfo", posData , {
          headers: {
          }
        })
        .then(res => {
          if (res.data.ResultCd === "00") {
            let iLen = res.data.Result.length

            if (iLen == 0) {
              this.hasMoreData = false
              return
            }            
            this.totalCount = res.data.TotalCount;

            const groupedPosts = {};
            res.data.Result.forEach(item => {
              if (!groupedPosts[item.UP_PST_ID]) {
                groupedPosts[item.UP_PST_ID] = [];
              }
              groupedPosts[item.UP_PST_ID].push(item);
            });
            const result = [];
            res.data.Result.forEach(item => {
              if (item.PST_ID === item.UP_PST_ID) {
                result.push(item);
                if (groupedPosts[item.PST_ID]) {
                  result.push(...groupedPosts[item.PST_ID].filter(p => p.PST_ID !== p.UP_PST_ID).sort(function(a, b){return a.PST_DEPTH - b.PST_DEPTH;}));
                }
              }
            });

            // 새로운 데이터를 추가 (forEach 사용)
            result.forEach((item, index) => {
              item.iIndex = this.totalCount - (this.startIndex + index);
              item.is_file = Util.bStringToBool(item.ATCH_FILE_YN)
              item.cShowCreateDateTime = Util.ConvertTimeToDate(item.CRT_DT)
              item.bNotice = false
              this.zData.push(item); // 배열에 직접 추가
            });
            this.startIndex += iLen;
            // 더 가져올 데이터가 있는지 확인
            if (this.startIndex >= this.totalCount) {
              this.hasMoreData = false;
            }

            // 테이블이 공지가능이고, 게시글이 공지인경우 확인
            if (this.NTC_USE_YN == "Y") {
              let zNoticeList = this.zData.filter(item => item.NTC_YN == "Y")

              for (let i = zNoticeList.length - 1; i >= 0; i --) {
                let oNoticeObj = {...zNoticeList[i]}
                oNoticeObj.bNotice = true
                // 가장 위쪽에 공지사항 추가
                this.zData.unshift(oNoticeObj)
              }
            }

            // 특정 게시판 글을 요구할 경우 (메인페이지에서 특정 공지사항 클릭시)
            if (this.SHOW_PST_ID != "") {
              let iShowIndex = this.zData.findIndex((item) => {
                return item.PST_ID == this.SHOW_PST_ID
              })

              this.OpenDetaillDialog(iShowIndex)
            }
          } else {
            EventBus.$emit("onShowMsg", {
              cSubTitle : "게시글 조회 중 문제가 발생했습니다.",
              cTitle : "계속 지속될 경우 담당자에게 문의 바랍니다.",
              // cMsg : `Error : ${res.data.Msg}`,
            });
          }
        })
        .catch(err =>{
          EventBus.$emit("onShowMsg", {
            cSubTitle : "게시글 조회 중 문제가 발생했습니다.",
            cTitle : "계속 지속될 경우 담당자에게 문의 바랍니다.",
            // cMsg : `Error : ${err}`,
          });
        })
        .finally(() =>{
        })
    },

    // 목록형 게시판 ROW의 파일 아이콘 클릭시
    // 파일 PATH 확인 API -> 파일다운로드 API
    async ClickIconDirect(event, item) {
      event.stopPropagation()

      var posData = {
        SITE_ID : import.meta.env.VITE_SITE_ID,
        BOARDLIST_ID : this.BOARDLIST_ID,
        PST_ID : item.PST_ID,
      }

      axios
        .post(import.meta.env.VITE_UIL_API + "GetDynamicBoardListFileInfo", posData , {
          headers: {
          }
        })
        .then(res => {
          if (res.data.ResultCd === "00") {
            this.DownloadFile(res.data.Result[0])
          } else {
            EventBus.$emit("onShowMsg", {
              cSubTitle : "게시글 조회 중 문제가 발생했습니다.",
              cTitle : "계속 지속될 경우 담당자에게 문의 바랍니다.",
              // cMsg : `Error : ${res.data.Msg}`,
            });
          }
        })
        .catch(err =>{
          EventBus.$emit("onShowMsg", {
            cSubTitle : "게시글 조회 중 문제가 발생했습니다.",
            cTitle : "계속 지속될 경우 담당자에게 문의 바랍니다.",
            // cMsg : `Error : ${err}`,
          });
        })
        .finally(() =>{
        })
    },

    // 파일 다운로드 API
    DownloadFile(item) {
      axios({
        url: import.meta.env.VITE_FILE_API + item.FILE_PATH,
        method: 'GET',
        responseType: 'blob',
        })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', item.FILE_NM);
          document.body.appendChild(link);
          link.click();
        });
    },

    // 게시글 클릭시: 상세화면 다이올로그 열기
    handleRowClick(event, {item}) {
      this.OpenDetaillDialog(this.zData.indexOf(item))
    },

    // 상세화면 다이올로그 열기
    async ShowBoardDetailDialog(iIndex, cToken) {
      this.oEditItem = {...this.oDefaultEditItem}

      // 게시판글의 상세정보 가져오기
      var res = await this.GetDynamicBoardListItemInfo(this.zData[iIndex], cToken)
      if (res.data.ResultCd == "44") { EventBus.$emit("onTokenExpired"); return; }

      if (res.data.ResultCd == "00") {
        if (res.data.Result1.length == 0) {
          EventBus.$emit("onShowMsg", {
            cSubTitle: "조회된 정보가 없습니다.",
            cTitle:"게시글이 삭제되었을 수 있습니다. 화면을 새로 고침 해주세요.",
            // cMsg: `(${res.data.ResultCd}) ${res.data.Msg}`
          });
        } else {
          this.iEditIndex = iIndex
          this.$refs.M4_AuthMember_ref.CancelAuth()

          // this.zData[iIndex].INQ_CNT = res.data.Result1[0].INQ_CNT
          this.zData.filter(item => item.PST_ID == this.zData[iIndex].PST_ID).forEach(item => item.INQ_CNT = res.data.Result1[0].INQ_CNT)

          this.oEditItem.PST_ID = this.zData[iIndex].PST_ID
          this.oEditItem.CRT_USER_ID = res.data.Result1[0].CRT_USER_ID
          this.oEditItem.PST_TTL = res.data.Result1[0].PST_TTL
          this.oEditItem.PST_CN = res.data.Result1[0].PST_CN
          this.oEditItem.PSWD = "!!!!!!"

          this.oEditItem.bSecret = Util.bStringToBool(res.data.Result1[0].PRVT_YN)
          this.oEditItem.INQ_CNT = res.data.Result1[0].INQ_CNT
          this.oEditItem.COPYRIGHT_YN = res.data.Result1[0].COPYRIGHT_YN == "Y" ? true: false;
          this.oEditItem.COPYRIGHT_TYPE = res.data.Result1[0].COPYRIGHT_TYPE

          if (res.data.Result2.length > 0) {
            this.oEditItem.FILE_ID = res.data.Result2[0].FILE_ID
            this.oEditItem.FILE_NM = res.data.Result2[0].FILE_NM
            this.oEditItem.FILE_PATH = res.data.Result2[0].FILE_PATH
          }

          res.data.Result3.forEach((item) => {
            item.cShowCreateDateTime = Util.ConvertTimeToDate(item.CRT_DT)
          })

          // 상세보기 다이올로그 띄우기
          this.$refs.M4_ShowDetailDialog_ref.ShowDialog({
            PST_ID : this.oEditItem.PST_ID,
            SelectIndex : this.iEditIndex,
            FT_CD : "",
            TEXT : "",
            PST_TTL : this.oEditItem.PST_TTL,
            INQ_CNT : this.oEditItem.INQ_CNT,
            CRT_USER_ID : this.oEditItem.CRT_USER_ID,
            PST_CN : this.oEditItem.PST_CN,
            COPYRIGHT_YN: this.oEditItem.COPYRIGHT_YN,
            COPYRIGHT_TYPE: this.oEditItem.COPYRIGHT_TYPE,
          }, res.data.Result2, res.data.Result3)
        }
      } else {
        EventBus.$emit("onShowMsg", {
          cSubTitle: "상세 보기 중 문제가 발생했습니다.",
          cTitle:"문제가 계속 되면 관리자에게 문의 바랍니다.",
          // cMsg: `(${res.data.ResultCd}) ${res.data.Msg}`
        });
      }
    },

    // M4_AuthMember 다이올로그에서 PSWD 가져와서 비번을 확인함
    // 비번 확인 성공시 게시판글의 상세정보창 열기
    async ShowSecretDetailDialog(oAuthObj) {
      var res = await this.CheckPasswordForBoard(this.zData[this.iCheckIndex].PST_ID, this.zData[this.iCheckIndex].CRT_USER_ID, oAuthObj.PSWD, this.BOARD_TABLE_NM)
      if (res.data.ResultCd == "00") {
        this.ShowBoardDetailDialog(this.iCheckIndex, res.data.Data)
      } else {
        EventBus.$emit("onShowMsg", {
          cSubTitle: "비밀번호 인증에 실패했습니다.",
          cTitle:"문제가 계속 되면 관리자에게 문의 바랍니다.",
          // cMsg: `(${res.data.ResultCd}) ${res.data.Msg}`
        });
      }
    },

    // 게시판글의 상세정보 가져오기 API
    GetDynamicBoardListItemInfo(item, cToken) {
      var posData = {
        SITE_ID : import.meta.env.VITE_SITE_ID,
        PST_ID : item.PST_ID,
        BOARDLIST_ID : this.BOARDLIST_ID,
        BOARD_TABLE_NM : this.BOARD_TABLE_NM,
        CMNT_TABLE_NM : this.CMNT_TABLE_NM,
        CRT_USER_ID : item.CRT_USER_ID,
        PRVT_YN : Util.bStringToBool(item.PRVT_YN),

        ATCH_FILE_USE_YN : this.ATCH_FILE_USE_YN, /* 파일 사용여부 */
        CMNT_USE_YN : this.CMNT_USE_YN,  /* 댓글 사용여부 */
        PRVT_USE_YN : this.PRVT_USE_YN, /* 비밀글 사용여부 */
        Token : cToken,
      };
      return new Promise((resolve) => (
        axios
        .post(import.meta.env.VITE_UIL_API + "GetDynamicBoardListItemInfo", posData, {
          // headers: {
          //   "Authorization": cToken
          // }
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

    // 수정 다이올로그 열기
    ShowDialog() {
      this.bDialog = true;
      this.$store.state.isDialog = true;
      this.$store.state.btnDialogRef = document.activeElement;  
      this.oEditItem = {...this.oDefaultEditItem}
      this.onClear();
    },

    // 에디터에서 수정된 내용 업데이트
    UpdateData(Data) {
      this.oEditItem.PST_CN = Data
    },

    // 파일관련 내용 초기화
    onClear() {
      this.NowSelFile = null
      this.oEditItem.FILE_ID = "NONE"
      this.oEditItem.FILE_NM = ""
    },

    // 파일 추가하기 (input)
    GetFile() {
      if (this.NowSelFile) {
        EventBus.$emit("onShowMsg", {
          cSubTitle : "파일을 선택 할 수 없습니다.",
          cTitle : "파일은 최대 1개 까지만 가능합니다.",
          cMsg : "",
        });
        return
      }
      this.$refs.fileInput.click();
    },

    // 파일이 선택되면 발생하는 이벤트
    onFileSelected(event) {
      this.NowSelFile = event.target.files[0]
      this.oEditItem.FILE_NM = this.NowSelFile.name
    },

    // 파일 저장하기
    bSendSvrFile() {
      var d = new Date();
      var Year = d.getFullYear();
      var fileName = this.NowSelFile.name;
      var Extend = Util.getExtension(fileName).toUpperCase();
      var sFileTypeId = Util.sGetId(Util.sGetFileType(this.NowSelFile.type));

      let formData = new FormData();
      formData.append('uploadfilenor', this.NowSelFile);
      return new Promise((resolve) => (
        axios.post(import.meta.env.VITE_UIL_API + "UploadFileNorNew?PublicFile=Y&Year="+Year+"&FileNm="+fileName+"&Extend="+Extend+"&MimeType="+this.NowSelFile.type+"&Size="+this.NowSelFile.size+"&FileTypeId="+sFileTypeId,
                formData,
                {
                headers: {
                  // "Authorization" : this.CustomInfo.Token,
                  'Content-Type' : 'multipart/form-data',
                }
              }
            )
            .then(res => {
              resolve(res);
            })
            .catch(err =>{
              resolve(null);
              EventBus.$emit("onShowMsg", {
                cSubTitle : "파일저장에 실패하였습니다.",
                cTitle : "관리자에게 문의 바랍니다.",
                // cMsg : `Error : ${err}`,
              });
          })
      ));
    },

    // 게시글 생성/수정 완료시
    // 신규: BOARD_TABLE_NM 테이블명에 insert 함 (파일존재시, T_BOARD_FILE_INFO에도 insert 함)
    // 수정: BOARD_TABLE_NM 테이블명에 update 함 (파일존재시, T_BOARD_FILE_INFO에 delete 후, insert 함)
    async SetDynamicBoardListInfo() {
      this.oEditItem.PST_CN = this.$refs.FroalaEditor.editor.html.get()
      var bExistNoData = false;
      var cTitleMsg = "";

      this.oEditItem.PST_TTL = this.oEditItem.PST_TTL.trim()
      this.oEditItem.PST_CN = this.oEditItem.PST_CN.trim()
      this.oEditItem.PST_CN = this.oEditItem.PST_CN.replaceAll("&nbsp;", "&nbsp")
      this.oEditItem.CRT_USER_ID = this.oEditItem.CRT_USER_ID.trim()
      this.oEditItem.PSWD = this.oEditItem.PSWD.trim()

      if (!bExistNoData && this.oEditItem.CRT_USER_ID == "") {
        cTitleMsg = "아이디는 필수입력사항입니다."
        bExistNoData = true
      }

      if (!bExistNoData && this.oEditItem.PSWD == "") {
        cTitleMsg = "비밀번호는 필수입력사항입니다. 글 수정 및 삭제시 필요합니다."
        bExistNoData = true
      }

      if (!bExistNoData && this.oEditItem.PST_TTL == "") {
        cTitleMsg = "제목은 필수입력사항입니다."
        bExistNoData = true
      }

      if (!bExistNoData && this.oEditItem.PST_CN == "<p><br></p>") {
        cTitleMsg = "내용을 입력하세요"
        bExistNoData = true
      }

      if (bExistNoData) {
        EventBus.$emit("onShowMsg", {
          cSubTitle : "누락된 정보가 있습니다.",
          cTitle : cTitleMsg,
          cMsg : "",
        });
        return
      }

      if (this.NowSelFile && this.oEditItem.FILE_ID == "NONE") {
        var res = await this.bSendSvrFile()

        if (res.data.ResultCd == "00") {
          this.oEditItem.FILE_ID = res.data.FileId;
          this.oEditItem.FILE_NM = res.data.FileNm;
          this.oEditItem.FILE_PATH = res.data.Path;
        } else {
          EventBus.$emit("onShowMsg", {
            cSubTitle : "파일 저장에 실패하였습니다.",
            cTitle : "계속 지속될 경우 담당자에게 문의 바랍니다.",
            // cMsg : `Error : ${res.data.Msg}`,
          });
          return;
        }
      }

      var posData = {
        PST_ID : this.oEditItem.PST_ID,
        PST_CN : this.oEditItem.PST_CN,
        PST_TTL : this.oEditItem.PST_TTL,
        CRT_USER_ID : this.oEditItem.CRT_USER_ID,
        PSWD : Util.cAES256Encrypt(this.oEditItem.PSWD),
        PRVT_YN: Util.cBoolToString(this.oEditItem.bSecret),
        FILE_ID: this.oEditItem.FILE_ID,
        ATCH_FILE_YN: this.oEditItem.FILE_ID == "NONE" ? "N" : "Y",
        Token: this.oEditItem.Token,

        NMBR_WRT_YN : this.NMBR_WRT_YN,
        ATCH_FILE_USE_YN : this.ATCH_FILE_USE_YN,
        PRVT_USE_YN : this.PRVT_USE_YN,

        BOARDLIST_ID : this.BOARDLIST_ID,
        BOARD_TABLE_NM : this.BOARD_TABLE_NM,
        SITE_ID : import.meta.env.VITE_SITE_ID,
      }

      axios
        .post(import.meta.env.VITE_UIL_API + "SetDynamicBoardListInfo", posData , {
          headers: {
          }
        })
        .then(res => {
          if (res.data.ResultCd === "00") {
            if (this.oEditItem.PST_ID == "") {
              let iPushIndex = this.zData.findIndex((item) => {
                return !item.bNotice
              })

              var oTest = {
                PST_ID : res.data.Result[0].PST_ID,
                UP_PST_ID : res.data.Result[0].PST_ID,
                PST_TTL : posData.PST_TTL,
                CRT_USER_ID : posData.CRT_USER_ID,
                CRT_DT : res.data.Result[0].CRT_DT,
                INQ_CNT : 0,
                iIndex : iPushIndex == -1 ? this.zData.length + 1 : this.zData.length + 1 - iPushIndex,
                cShowCreateDateTime : Util.ConvertTimeToDate(res.data.Result[0].CRT_DT),
              }

              if (this.ATCH_FILE_USE_YN) {
                oTest.ATCH_FILE_YN = posData.ATCH_FILE_YN
              }
              oTest.is_file = Util.bStringToBool(oTest.ATCH_FILE_YN)
              if (this.PRVT_USE_YN) {
                oTest.PRVT_YN = posData.PRVT_YN
              }

              if (iPushIndex == -1) {
                this.zData.unshift(oTest)
              } else {
                this.zData.splice(iPushIndex, 0, oTest)
              }
            } else {
              this.zData[this.iEditIndex].PST_TTL = posData.PST_TTL

              if (this.ATCH_FILE_USE_YN) {
                this.zData[this.iEditIndex].ATCH_FILE_YN = posData.ATCH_FILE_YN
              }
              this.zData[this.iEditIndex].is_file = Util.bStringToBool(this.zData[this.iEditIndex].ATCH_FILE_YN)
              if (this.PRVT_USE_YN) {
                this.zData[this.iEditIndex].PRVT_YN = posData.PRVT_YN
              }
            }

            this.iEditIndex = -1            
            this.DialogClose();
            this.oEditItem = {...this.oDefaultEditItem}
          } else {
            EventBus.$emit("onShowMsg", {
              cSubTitle : "게시판 등록 중 문제가 발생하였습니다.",
              cTitle : "계속 지속될 경우 담당자에게 문의 바랍니다.",
              // cMsg : `Error : ${res.data.Msg}`,
            });
          }
        })
        .catch(err =>{
          EventBus.$emit("onShowMsg", {
            cSubTitle : "게시판 등록 중 문제가 발생하였습니다.",
            cTitle : "계속 지속될 경우 담당자에게 문의 바랍니다.",
            // cMsg : `Error : ${err}`,
          });
        })
        .finally(() =>{
        })
    },

    // 상세화면 관련 함수 ----------------------------------------------------------------
    
    // 상세화면 다이올로그 열기
    // 비밀글 여부 확인 후, 창열기 : (게시글 클릭시, 상세화면에서 수정시, 외부에서 특정게시글 요구시)
    OpenDetaillDialog(iIndex) {
      this.iCheckIndex = iIndex

      if (this.zData[iIndex].PRVT_YN == "Y") {
        this.$refs.M4_AuthMember_ref.ShowAuthDialog() // 비밀글 일시 
      } else {
        this.ShowBoardDetailDialog(iIndex, "") // 상세화면 다이올로그 열기
      }
    },

    // 수정창 열기 (상세화면 -> AUTH창 -> 상세화면 -> 비번을 받아옴 -> 비번확인후, 수정창열기)
    async ShowEditDialogAfterCheckAuth(PSWD, iIndex) {
      var res = await this.CheckPasswordForBoard(this.zData[iIndex].PST_ID, this.zData[iIndex].CRT_USER_ID, PSWD, this.BOARD_TABLE_NM)

      if (res.data.ResultCd == "00") {
        this.$refs.M4_ShowDetailDialog_ref.CloseDialog()
        this.$refs.M4_ShowDetailDialog_ref.CloseAuthDialog()
        this.bDialog = true;
        this.$store.state.isDialog = true;
        this.$store.state.btnDialogRef = document.activeElement;  

        this.oEditItem.Token = res.data.Data

        setTimeout(() => {
          this.$refs.FroalaEditor.refresh(this.oEditItem.PST_CN)
        }, 300);
      } else {
        EventBus.$emit("onShowMsg", {
          cSubTitle: "비밀번호 인증에 실패했습니다.",
          cTitle:"문제가 계속 되면 관리자에게 문의 바랍니다.",
          // cMsg: `(${res.data.ResultCd}) ${res.data.Msg}`
        });
      }
    },

    // 게시글 삭제시 (상세화면 -> AUTH창 -> 상세화면 -> 비번을 받아옴 -> 비번확인후, 삭제)
    async DelBoardAfterCheckAuth(PSWD, iIndex) {
      var res = await this.CheckPasswordForBoard(this.zData[iIndex].PST_ID, this.zData[iIndex].CRT_USER_ID, PSWD, this.BOARD_TABLE_NM)
      if (res.data.ResultCd == "00") {
        this.DelDynamicBoardListInfo(iIndex, res.data.Data)
      } else {
        EventBus.$emit("onShowMsg", {
          cSubTitle: "비밀번호 인증에 실패했습니다.",
          cTitle:"문제가 계속 되면 관리자에게 문의 바랍니다.",
          // cMsg: `(${res.data.ResultCd}) ${res.data.Msg}`
        });
      }
    },

    // 게시글 삭제 API
    // BOARD_TABLE_NM(게시글)과 CMNT_TABLE_NM(댓글) 테이블명에 insert 함 (DEL_YN="Y")
    DelDynamicBoardListInfo(iIndex, Token) {
      var posData = {
        SITE_ID : import.meta.env.VITE_SITE_ID,
        BOARDLIST_ID : this.BOARDLIST_ID,
        BOARD_TABLE_NM : this.BOARD_TABLE_NM,
        CMNT_TABLE_NM : this.CMNT_TABLE_NM,
        PST_ID : this.zData[iIndex].PST_ID,
        CRT_USER_ID: this.zData[iIndex].CRT_USER_ID,

        ATCH_FILE_USE_YN : this.ATCH_FILE_USE_YN,
        CMNT_USE_YN : this.CMNT_USE_YN,

        Token: Token,
      }

      axios
        .post(import.meta.env.VITE_UIL_API + "DelDynamicBoardListInfo", posData , {
          headers: {
          }
        })
        .then(res => {
          if (res.data.ResultCd === "00") {
            this.zData.splice(iIndex, 1)
            this.$refs.M4_ShowDetailDialog_ref.CloseAuthDialog()
            this.$refs.M4_ShowDetailDialog_ref.CloseDialog()

            let iLen = this.zData.length

            this.zData.forEach((item, index) => {
              item.iIndex = iLen - index
            })
          } else {
            EventBus.$emit("onShowMsg", {
              cSubTitle : "게시판 삭제 중 문제가 발생하였습니다.",
              cTitle : "계속 지속될 경우 담당자에게 문의 바랍니다.",
              // cMsg : `Error : ${err}`,
            });
          }
        })
        .catch(err =>{
          EventBus.$emit("onShowMsg", {
            cSubTitle : "게시판 삭제 중 문제가 발생하였습니다.",
            cTitle : "계속 지속될 경우 담당자에게 문의 바랍니다.",
            // cMsg : `Error : ${err}`,
          });
        })
        .finally(() =>{
        })
    },

    // 댓글 등록 (상세화면 -> 댓글등록버튼) (DB데이터 및 vue데이터 추가 후, 댓글 창만 닫힘)
    SetDynamicBoardReplyInfo(ReplyItem, iIndex) {
      var posData = {
        BOARDLIST_ID : this.BOARDLIST_ID,
        CMNT_TABLE_NM : this.CMNT_TABLE_NM,
        PST_ID: this.zData[iIndex].PST_ID,

        CMNT_CN : ReplyItem.CMNT_CN ,
        PSWD : Util.cAES256Encrypt(ReplyItem.PSWD),
        CRT_USER_ID : ReplyItem.CRT_USER_ID,
      }

      axios
        .post(import.meta.env.VITE_UIL_API + "SetDynamicBoardReplyInfo", posData , {
          headers: {
          }
        })
        .then(res => {
          if (res.data.ResultCd === "00") {
            this.$refs.M4_ShowDetailDialog_ref.AddReply({
              CMNT_CN : posData.CMNT_CN,
              CRT_USER_ID : posData.CRT_USER_ID,
              PST_ID : posData.PST_ID,
              CMNT_SEQ : res.data.Result[0].CMNT_SEQ,
              CRT_DT : res.data.Result[0].CRT_DT,
              cShowCreateDateTime : Util.ConvertTimeToDate(res.data.Result[0].CRT_DT),
            })
          } else {
            EventBus.$emit("onShowMsg", {
              cSubTitle : "게시글에 대한 댓글 작성 중 문제가 발생했습니다.",
              cTitle : "계속 지속될 경우 담당자에게 문의 바랍니다.",
              // cMsg : `Error : ${res.data.Msg}`,
            });
          }
        })
        .catch(err =>{
          EventBus.$emit("onShowMsg", {
            cSubTitle : "게시글에 대한 댓글 작성 중 문제가 발생했습니다.",
            cTitle : "계속 지속될 경우 담당자에게 문의 바랍니다.",
            // cMsg : `Error : ${err}`,
          });
        })
        .finally(() =>{
        })
    },

    // 댓글 삭제시 (상세화면 -> AUTH창 -> 상세화면 -> 비번을 받아옴 -> 비번확인후, 삭제)
    async DelReplyAfterCheckAuth(PST_ID, CMNT_SEQ, CRT_USER_ID, PSWD) {
      var res = await this.CheckPasswordForReply(PST_ID, CMNT_SEQ, CRT_USER_ID, PSWD, this.CMNT_TABLE_NM)
      if (res.data.ResultCd == "00") {
        this.DelDynamicBoardReplyInfo(PST_ID, CMNT_SEQ, CRT_USER_ID, res.data.Data);
      } else {
        EventBus.$emit("onShowMsg", {
          cSubTitle: "비밀번호 인증에 실패했습니다.",
          cTitle:"문제가 계속 되면 관리자에게 문의 바랍니다.",
          // cMsg: `(${res.data.ResultCd}) ${res.data.Msg}`
        });
      }
    },

    // 댓글 삭제 API
    DelDynamicBoardReplyInfo(PST_ID, CMNT_SEQ, CRT_USER_ID, Token) {
      var posData = {
        SITE_ID : import.meta.env.VITE_SITE_ID,
        BOARDLIST_ID : this.BOARDLIST_ID,
        CMNT_TABLE_NM : this.CMNT_TABLE_NM,
        PST_ID : PST_ID,
        CRT_USER_ID: CRT_USER_ID,
        CMNT_SEQ: CMNT_SEQ,

        Token: Token,
      }

      axios
        .post(import.meta.env.VITE_UIL_API + "DelDynamicBoardReplyInfo", posData , {
          headers: {
          }
        })
        .then(res => {
          if (res.data.ResultCd === "00") {
            this.$refs.M4_ShowDetailDialog_ref.DelReply()
          } else {
            EventBus.$emit("onShowMsg", {
            cSubTitle : "게시판 댓글 삭제 중 문제가 발생하였습니다.",
            cTitle : "계속 지속될 경우 담당자에게 문의 바랍니다.",
            // cMsg : `Error : ${err}`,
          });
          }
        })
        .catch(err =>{
          EventBus.$emit("onShowMsg", {
            cSubTitle : "게시판 댓글 삭제 중 문제가 발생하였습니다.",
            cTitle : "계속 지속될 경우 담당자에게 문의 바랍니다.",
            // cMsg : `Error : ${err}`,
          });
        })
        .finally(() =>{
        })
    },

    // 공통으로 호출하는 함수 ----------------------------------------------------------------
    // 게시글 비밀번호 확인 API
    CheckPasswordForBoard(PST_ID, CRT_USER_ID, PSWD, BOARD_TABLE_NM) {
      var posData = {
        SITE_ID : import.meta.env.VITE_SITE_ID,
        BOARD_TABLE_NM : BOARD_TABLE_NM,
        BOARDLIST_ID : this.BOARDLIST_ID,
        PSWD: Util.cAES256Encrypt(PSWD),

        PST_ID : PST_ID,
        CRT_USER_ID: CRT_USER_ID,
      };

      return new Promise((resolve) => (
        axios
        .post(import.meta.env.VITE_UIL_API + "CheckPasswordForBoard", posData, {
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

    // 댓글 비밀번호 확인 API
    CheckPasswordForReply(PST_ID, CMNT_SEQ, CRT_USER_ID, PSWD, BOARD_TABLE_NM) {
      var posData = {
        SITE_ID : import.meta.env.VITE_SITE_ID,
        BOARD_TABLE_NM : BOARD_TABLE_NM,
        BOARDLIST_ID : this.BOARDLIST_ID,
        PSWD: Util.cAES256Encrypt(PSWD),

        PST_ID : PST_ID,
        CMNT_SEQ : CMNT_SEQ,
        CRT_USER_ID: CRT_USER_ID,
      };

      return new Promise((resolve) => (
        axios
        .post(import.meta.env.VITE_UIL_API + "CheckPasswordForReply", posData, {
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
  },
}
</script>

<style scoped>
  .test_password_style { 
    -webkit-text-security:disc; 
  }

  div :deep(.v-label) {
    -webkit-text-security:none;
  }

  div :deep(.v-field__append-inner) {
    -webkit-text-security:none;
  }
</style>
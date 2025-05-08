<template>
  <div>
    <div class="d-flex title-xxlarge">
      <h1 class="title-xxlarge" style="position: relative;z-index: 10;background-color: white;">묻고답하기</h1>
      <v-spacer></v-spacer>
      <v-btn ref="back_qna_btn" @click="ShowDialog()"><v-icon aria-hidden="true" style="margin-right: 6px;">mdi-pencil</v-icon>{{ $t("all_btn_write") }}</v-btn>
    </div>

    <div class="mt-2 pa-3">
      <v-row>
        <v-col>
          <M4_Input
            v-model="cNowSearchKeyWord"
            @keyup.enter="GetBoardWithAuthInfo"
            @click:append-inner="GetBoardWithAuthInfo"
            :label="$t('common_search')"
            :aria-label="$t('common_search')"
            :placeholder="$t('all_table_placeholder_1')"
            density="compact"            
            variant="outlined"
            color="primary"
            persistent-placeholder
            iconTitle="검색"
            icon="mdi-magnify">            
          </M4_Input>
        </v-col>
      </v-row>

      <v-data-table
        :headers="headers"
        :items="zData"
        @click:row="handleRowClick"
        item-key="PST_ID"
        aria-labelledby="table-caption">        
        <template v-slot:default="props">
          <table class="nor_table_center">
            <caption id="table-caption" class="sr-only">묻고답하기 테이블</caption>
            <thead>
              <tr>
                <th v-for="header in props.headers[0]" :key="header.value" scope="col">
                  {{ header.title}}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in props.items" :key="item.id" @click="handleRowClick(null, {item})">
                <td>{{item.iIndex}}</td>
                <td tabindex="0" @keydown.enter="handleRowClick(null, {item})" style="cursor: pointer;">{{ item.PST_TTL }}</td>
                <td>
                  <div v-if="item.is_file" style="cursor: pointer;" @click="ClickIconDirect($event, item)" @keyup.enter="ClickIconDirect($event, item)"><v-icon aria-hidden="true" >mdi-file</v-icon></div>
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
          <caption id="table-caption" class="sr-only">묻고답하기 테이블</caption>
        </template>
        <template v-slot:item.PST_TTL="{ item, value }">
          <div class="d-flex line_clamp_1" tabindex="0" :style="'margin-left : ' + item.PST_DEPTH * 20 + 'px'">
            <v-icon aria-hidden="true" v-if="item.PST_ID != item.UP_PST_ID" style="margin-top: 1px;" size="15">mdi-arrow-right-bottom-bold</v-icon>
            <div>{{ value }}</div>
          </div>
        </template>
        <template v-slot:item.is_file="{ item, value }">
          <div v-if="value" @click="ClickIconDirect($event, item)" @keyup.enter="ClickIconDirect($event, item)" role="button" tabindex="0" aria-label="첨부 파일 다운로드"><v-icon aria-hidden="true">mdi-file</v-icon></div>
        </template>
      </v-data-table> -->
    </div>

    <!-- 게시판 글 생성 및 수정 -->
    <v-dialog aria-modal="true" @update:modelValue="DialogClose" v-model="bDialog" width="80%">
      <v-card class="pa-4 pl-6 pr-6">
        <div class="d-flex">
          <h1 class="title-xxlarge">{{ sFormatTitle }}</h1>
          <v-spacer></v-spacer>
          <v-btn variant="plain" class="mt-n1 mr-n3" icon @click="DialogClose" title="닫기"><v-icon aria-hidden="true">mdi-close</v-icon></v-btn>
        </div>

        <div style="max-height: 80vh; overflow: auto;">
          <v-row class="ma-0">
            <v-col cols="12" md="4" sm="12">
              <M4_Input v-model="oEditItem.CRT_USER_ID" readonly :label="$t('all_table_header_5')" hide-details></M4_Input>
            </v-col>
            <v-col cols="12">
              <M4_Input v-model="oEditItem.PST_TTL" :label="$t('all_table_header_4') + '(*)'" hide-details></M4_Input>
            </v-col>
            <v-col cols="12">
              <Editor v-model="oEditItem.PST_CN" @UpdateData="UpdateData" ref="FroalaEditor"></Editor>
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <M4_Input v-model="oEditItem.FILE_NM" hide-details :label="$t('all_dialog_item_1')" @click:clear="onClear" clearable readonly></M4_Input>
            </v-col>
          </v-row>
        </div>

        <div class="d-flex flex-wrap mt-4">
          <label for="fileUpload" class="custom-file-label" style="display: none;">파일 첨부</label>
          <input id="fileUpload" label="파일첨부" type="file" ref="fileInput" style="display: none;" multiple @change="onFileSelected">
          <v-btn @click="GetFile()" class="mr-2 mb-1" style="min-width: 100px;" >{{ $t("all_btn_add_file")}}<v-icon aria-hidden="true" class="ml-1">mdi-paperclip</v-icon></v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="SetBoardWithAuthInfo()" class="mb-1" color="primary" width="100" >{{ $t("all_btn_save")}}<v-icon aria-hidden="true" class="ml-1">mdi-upload</v-icon></v-btn>
        </div>
      </v-card>
    </v-dialog>

    <M4_Commu_AuthDialog @EndAuth="EndAuth" ref="M4_Commu_AuthDialog_ref"></M4_Commu_AuthDialog>
    <M4_Commu_DetailDialog
      :bDisablePreBtn="bDisablePreBtn"
      :bDisableNextBtn="bDisableNextBtn"
      :bShowEditBtn="true"
      :bShowDelBtn="true"
      @ChangeBoardDetail="ChangeBoardDetail"
      @EditAfterAuth="EditAfterAuth"
      @DeleteAfterAuth="DeleteAfterAuth"
      ref="M4_Commu_DetailDialog_ref"
    ></M4_Commu_DetailDialog>
  </div>
</template>

<script>
import axios from "axios";
import * as Util from "@/Util.js";
import { EventBus } from '@/EventBus.js';
import { useRoute } from 'vue-router'

import Editor from "../Editor.vue";

export default {
  data() {
    return {
      SHOW_PST_ID : "",
      
      BOARDLIST_ID: "",
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
      NowSelFile : null,
      oEditItem : {
        PST_ID : "",
        CRT_USER_ID : "",
        MBL_TELNO : "",
        PST_CN : "",
        PST_TTL : "",
        FILE_ID : "NONE",
        FILE_NM : "",
        FILE_PATH : "",
        // Token : "",
      },
      oDefaultEditItem : {
        PST_ID : "",
        CRT_USER_ID : "",
        MBL_TELNO : "",
        PST_CN : "",
        PST_TTL : "",
        FILE_ID : "NONE",
        FILE_NM : "",
        FILE_PATH : "",
        // Token : "",
      },

      cName : "",
      cTelNo : "",
      cBirth : "",
      cToken : "",
    }
  },

  computed: {
    sFormatTitle() {
      return this.iEditIndex == -1 ? "신규 작성" : "수정"
    },
    bDisablePreBtn() {
      return this.iEditIndex == 0
    },
    bDisableNextBtn() {
      return this.iEditIndex == this.zData.length - 1
    },
  },

  components:{
    Editor,
  },

  mounted() {
    // 기본 코드들 초기화
    var zResult = this.findMenuById(this.$store.state.main_menu, useRoute().name)
    zResult.BOARDLIST_ID ? this.BOARDLIST_ID = zResult.BOARDLIST_ID : this.BOARDLIST_ID = ""
    this.SHOW_PST_ID = this.$route.query.id ? this.$route.query.id : ""
    this.GetBoardWithAuthInfo()
  },

  beforeUnmount(){
  },

  methods : {
    // 스토어에서(main_menu) path로 검색하여 네비게이션 row를 리턴함
    findMenuById(menuArray, searchId) {
      // 메뉴 배열을 순회
      for (const menu of menuArray) {
        // 현재 메뉴의 id가 검색하려는 id와 일치하면 반환
        if (menu.path === searchId) {
          return menu;
        }

        // 하위 메뉴가 있는 경우 하위 메뉴도 재귀적으로 탐색
        if (menu.menu_dept1) {
          const found = this.findMenuById(menu.menu_dept1, searchId);
          if (found) {
            return found;
          }
        }

        if (menu.menu_dept2) {
          const found = this.findMenuById(menu.menu_dept2, searchId);
          if (found) {
            return found;
          }
        }
      }

      return null;
    },

    // 에디터에서 수정된 내용 업데이트
    UpdateData(Data) {
      this.oEditItem.PST_CN = Data
    },

    onClear() {
      this.NowSelFile = null
      this.oEditItem.FILE_ID = "NONE"
      this.oEditItem.FILE_NM = ""
    },

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

    ClickIconDirect(event, item) {
      event.stopPropagation()
      this.DownloadFile(item)
    },

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

    GetBoardWithAuthInfo() {
      this.zData = []

      var posData = {
        BoardType : import.meta.env.VITE_BOARD_CASE_QNA,
        SITE_ID : import.meta.env.VITE_SITE_ID,
        NowSearchKeyWord: this.cNowSearchKeyWord,
      }

      axios
        .post(import.meta.env.VITE_UIL_API + "GetBoardWithAuthInfo", posData , {
          headers: {
          }
        })
        .then(res => {
          if (res.data.ResultCd === "00") {
            let iLen = res.data.Result.length

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

            this.zData = result.map((item, index) => {
              item.iIndex = iLen - index
              item.is_file = Util.bStringToBool(item.ATCH_FILE_YN)
              item.cShowCreateDateTime = Util.ConvertTimeToDate(item.CRT_DT)
              return item
            })

            // 특정 게시판 글을 요구할 경우
            if (this.SHOW_PST_ID != "") {
              let iShowItem = this.zData.find((item) => {
                return item.PST_ID == this.SHOW_PST_ID
              })
              this.ShowDetailDialog(iShowItem)
            }

          } else {
            EventBus.$emit("onShowMsg", {
              cSubTitle : "묻고 답하기 정보 조회 중 문제가 발생했습니다.",
              cTitle : "계속 지속될 경우 담당자에게 문의 바랍니다.",
              cMsg : `Error : ${res.data.Msg}`,
            });
          }
        })
        .catch(err =>{
          EventBus.$emit("onShowMsg", {
            cSubTitle : "묻고 답하기 정보 조회 중 문제가 발생했습니다.",
            cTitle : "계속 지속될 경우 담당자에게 문의 바랍니다.",
            cMsg : `Error : ${err}`,
          });
        })
        .finally(() =>{
        })
    },

    ShowDialog() {
      this.$refs.M4_Commu_AuthDialog_ref.ShowDialog("")
      this.$store.state.btnDialogRef = this.$refs.back_qna_btn;

    },

    async ShowDetailDialog(item) {
      var res = await this.GetBoardWithAuthItemInfo(item)
      if (res) {
        if (res.data.ResultCd == "00") {
          this.iEditIndex = this.zData.indexOf(item)
          this.zData[this.iEditIndex].INQ_CNT = res.data.Result1[0].INQ_CNT

          this.$refs.M4_Commu_DetailDialog_ref.ShowDialog({
            PST_ID : item.PST_ID,
            SelectIndex : this.iEditIndex,
            PST_TTL : item.PST_TTL,
            CRT_USER_ID : item.CRT_USER_ID,
            INQ_CNT : res.data.Result1[0].INQ_CNT,
            PST_CN : res.data.Result1[0].PST_CN,
            Title : "묻고 답하기",
          }, res.data.Result2)
          this.$store.state.btnDialogRef = document.activeElement;
        } else {
          EventBus.$emit("onShowMsg", {
            cSubTitle : "상세보기 창을 여는 중 문제가 발생했습니다.",
            cTitle : "게시글이 삭제되었을 수 있습니다. 화면을 새로고침 하여 주세요.",
            cMsg : "",
          });
        }
      } else {
        EventBus.$emit("onShowMsg", {
          cSubTitle : "상세보기 창을 여는 중 문제가 발생했습니다.",
          cTitle : "게시글이 삭제되었을 수 있습니다. 화면을 새로고침 하여 주세요.",
          cMsg : `Error : ${res.data.Msg}`,
        });
      }
    },

    handleRowClick(event, {item}) {
      this.ShowDetailDialog(item)
    },

    GetBoardWithAuthItemInfo(item) {
      var posData = {
        BoardType : import.meta.env.VITE_BOARD_CASE_QNA,
        SITE_ID : import.meta.env.VITE_SITE_ID,
        BOARDLIST_ID : this.BOARDLIST_ID,
        PST_ID : item.PST_ID,
      };

      return new Promise((resolve) => (
        axios
        .post(import.meta.env.VITE_UIL_API + "GetBoardWithAuthItemInfo", posData, {
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

    EndAuth(cCase, oAuthInfo) {
      console.log(oAuthInfo);
      if (cCase == "") {
        this.$refs.M4_Commu_AuthDialog_ref.CloseDialog()
        this.oEditItem.CRT_USER_ID = oAuthInfo.cRequestName
        this.oEditItem.MBL_TELNO = oAuthInfo.cRequestMobile
        this.oDefaultEditItem.CRT_USER_ID = oAuthInfo.cRequestName
        this.oDefaultEditItem.MBL_TELNO = oAuthInfo.cRequestMobile

        this.cName = oAuthInfo.cRequestName
        this.cTelNo = oAuthInfo.cRequestMobile
        this.cBirth = oAuthInfo.cRequestBirth
        this.cToken = oAuthInfo.jwt

        this.bAgreeDialog = false;
        this.bDialog = true;
        this.$store.state.isDialog = true;
        // this.$store.state.btnDialogRef = document.activeElement;
      }
    },

    DialogClose() {
      this.bDialog = false;      
      this.$store.state.isDialog = false;
      EventBus.$emit("onBackDialogBtn");       
    },
    

    // 파일 저장하기
    bSendSvrFile(NowSelFile) {
      var d = new Date();
      var Year = d.getFullYear();
      var fileName = NowSelFile.name;
      var Extend = Util.getExtension(fileName).toUpperCase();
      var sFileTypeId = Util.sGetId(Util.sGetFileType(NowSelFile.type));

      let formData = new FormData();
      formData.append('uploadfilenor', NowSelFile);
      return new Promise((resolve) => (
        axios.post(import.meta.env.VITE_UIL_API + "UploadFileNorNew?PublicFile=Y&Year="+Year+"&FileNm="+fileName+"&Extend="+Extend+"&MimeType="+NowSelFile.type+"&Size="+NowSelFile.size+"&FileTypeId="+sFileTypeId,
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
                cMsg : `Error : ${err}`,
              });
          })
      ));
    },

    async SetBoardWithAuthInfo() {
      this.oEditItem.PST_CN = this.$refs.FroalaEditor.editor.html.get()
      var bExistNoData = false;
      var cTitleMsg = "";

      this.oEditItem.PST_TTL = this.oEditItem.PST_TTL.trim()
      this.oEditItem.PST_CN = this.oEditItem.PST_CN.trim()
      this.oEditItem.PST_CN = this.oEditItem.PST_CN.replaceAll("&nbsp;", "&nbsp")

      if (this.oEditItem.PST_TTL == "") {
        cTitleMsg = "제목이 누락되었습니다."
        bExistNoData = true
      }

      if (!bExistNoData && this.oEditItem.PST_CN == "") {
        cTitleMsg = "내용이 누락되었습니다."
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
        var res = await this.bSendSvrFile(this.NowSelFile)

        if (res.data.ResultCd == "00") {
          this.oEditItem.FILE_ID = res.data.FileId;
          this.oEditItem.FILE_NM = res.data.FileNm;
          this.oEditItem.FILE_PATH = res.data.Path;
        } else {
          EventBus.$emit("onShowMsg", {
            cSubTitle : "파일 저장에 실패하였습니다.",
            cTitle : "계속 지속될 경우 담당자에게 문의 바랍니다.",
            cMsg : `Error : ${res.data.Msg}`,
          });
          return;
        }
      }

      var posData = {
        SITE_ID : import.meta.env.VITE_SITE_ID,
        BOARDLIST_ID : this.BOARDLIST_ID,
        PST_ID : this.oEditItem.PST_ID,
        CRT_USER_ID : this.oEditItem.CRT_USER_ID,
        PST_TTL : this.oEditItem.PST_TTL,
        PST_CN : this.oEditItem.PST_CN,
        MBL_TELNO : this.oEditItem.MBL_TELNO,

        ATCH_FILE_YN : Util.cBoolToString(this.oEditItem.FILE_ID != "NONE"),
        // ATCH_FILE_YN : "Y",
        FILE_ID : this.oEditItem.FILE_ID,
        FILE_PATH : this.oEditItem.FILE_PATH,

        BoardType : import.meta.env.VITE_BOARD_CASE_QNA,
        SITE_ID : import.meta.env.VITE_SITE_ID,

        Name : this.cName,
        TelNo : this.cTelNo,
        Birth : this.cBirth,
        Token : this.cToken,
      }

      axios
        .post(import.meta.env.VITE_UIL_API + "SetBoardWithAuthInfo", posData , {
          headers: {
          }
        })
        .then(res => {
          if (res.data.ResultCd === "00") {
            if (posData.PST_ID == "") {
              this.zData.unshift({
                PST_ID : res.data.Result[0].PST_ID,
                UP_PST_ID : res.data.Result[0].PST_ID,
                CRT_DT : res.data.Result[0].CRT_DT,
                cShowCreateDateTime : Util.ConvertTimeToDate(res.data.Result[0].CRT_DT),
                // CRT_USER_ID : posData.CRT_USER_ID,
                CRT_USER_ID : Util.MaskName(posData.CRT_USER_ID),
                PST_TTL : posData.PST_TTL,
                is_file : posData.FILE_ID != "NONE",
                INQ_CNT : 0,
                PST_DEPTH : 0,
                FILE_ID : this.oEditItem.FILE_ID,
                FILE_NM : this.oEditItem.FILE_NM,
                FILE_PATH : this.oEditItem.FILE_PATH,
              })

              let iLen = this.zData.length

              this.zData.forEach((item, index) => {
                item.iIndex = iLen - index
              })
            } else {
              this.zData[this.iEditIndex].PST_TTL = posData.PST_TTL
              this.zData[this.iEditIndex].FILE_ID = posData.FILE_ID
              this.zData[this.iEditIndex].is_file = posData.FILE_ID != "NONE"
              this.zData[this.iEditIndex].FILE_NM = this.oEditItem.FILE_NM
              this.zData[this.iEditIndex].FILE_PATH = this.oEditItem.FILE_PATH
            }

            this.DialogClose();

            this.oEditItem = {...this.oDefaultEditItem}
            this.onClear();
          } else {
            EventBus.$emit("onShowMsg", {
              cSubTitle : "묻고 답하기 게시글 작성 중 문제가 발생했습니다.",
              cTitle : "계속 지속될 경우 담당자에게 문의 바랍니다.",
              cMsg : `Error : ${res.data.Msg}`,
            });
          }
        })
        .catch(err =>{
          EventBus.$emit("onShowMsg", {
            cSubTitle : "묻고 답하기 게시글 작성 중 문제가 발생했습니다.",
            cTitle : "계속 지속될 경우 담당자에게 문의 바랍니다.",
            cMsg : `Error : ${err}`,
          });
        })
        .finally(() =>{
        })
    },

    // CheckAuth_EXP_BOARD(item, AuthInfo) {
    //   var posData = {
    //     BoardType : import.meta.env.VITE_BOARD_CASE_QNA,
    //     SITE_ID : import.meta.env.VITE_SITE_ID,
    //     BOARDLIST_ID : this.BOARDLIST_ID,

    //     PST_ID : item.PST_ID,
    //     AuthTelNum : AuthInfo.AuthTelNum,
    //   };

    //   return new Promise((resolve) => (
    //     axios
    //     .post(import.meta.env.VITE_UIL_API + "CheckAuth_EXP_BOARD", posData, {
    //       headers: {
    //         // "Authorization": this.CustomInfo.Token
    //       }
    //     })
    //     .then(res => {
    //       resolve(res);
    //     })
    //     .catch(err => {
    //       resolve({
    //         data : {
    //           ResultCd : "98",
    //           Msg : err,
    //         }
    //       });
    //     })
    //   ))
    // },

    // 이전/다음 보여주기
    ChangeBoardDetail(iSelectIndex) {
      this.ShowDetailDialog(this.zData[iSelectIndex])
    },

    async EditAfterAuth(iSelectIndex, oAuthInfo) {
      this.cName = oAuthInfo.cRequestName
      this.cTelNo = oAuthInfo.cRequestMobile
      this.cBirth = oAuthInfo.cRequestBirth
      this.cToken = oAuthInfo.jwt

      var res = await this.GetBoardWithAuthItemInfo(this.zData[iSelectIndex])

      if (res) {
        if (res.data.ResultCd == "00") {
          this.$refs.M4_Commu_DetailDialog_ref.CloseDialog()

          this.bDialog = true;
          this.$store.state.isDialog = true;
          this.$store.state.btnDialogRef = document.activeElement;

          this.oEditItem.PST_ID = this.zData[iSelectIndex].PST_ID
          this.oEditItem.PST_TTL = this.zData[iSelectIndex].PST_TTL
          this.oEditItem.PST_CN = res.data.Result1[0].PST_CN
          this.oEditItem.CRT_USER_ID = oAuthInfo.cRequestName
          this.oEditItem.MBL_TELNO = oAuthInfo.cRequestMobile

          if (res.data.Result2.length > 0) {
            this.oEditItem.FILE_NM = res.data.Result2[0].FILE_NM
            this.oEditItem.FILE_PATH = res.data.Result2[0].FILE_PATH
            this.oEditItem.FILE_ID = res.data.Result2[0].FILE_ID
          }

          // this.$nextTick(() => {
          //   this.$refs.FroalaEditor.refresh(this.oEditItem.PST_CN)
          // })
          setTimeout(() => {
            this.$refs.FroalaEditor.refresh(this.oEditItem.PST_CN)
          }, 300);
        } else {
          EventBus.$emit("onShowMsg", {
            cSubTitle : "상세보기 창을 여는 중 문제가 발생했습니다.",
            cTitle : "게시글이 삭제되었을 수 있습니다. 화면을 새로고침 하여 주세요.",
            cMsg : "",
          });
        }
      } else {
        EventBus.$emit("onShowMsg", {
          cSubTitle : "상세보기 창을 여는 중 문제가 발생했습니다.",
          cTitle : "게시글이 삭제되었을 수 있습니다. 화면을 새로고침 하여 주세요.",
          cMsg : `Error : ${res.data.Msg}`,
        });
      }
    },

    DeleteAfterAuth(iSelectIndex, oAuthInfo) {
      var posData = {
        BoardType : import.meta.env.VITE_BOARD_CASE_QNA,
        SITE_ID : import.meta.env.VITE_SITE_ID,
        BOARDLIST_ID : this.BOARDLIST_ID,
        PST_ID : this.zData[iSelectIndex].PST_ID,
        PST_TTL : this.zData[iSelectIndex].PST_TTL,

        Name : oAuthInfo.cRequestName,
        TelNo : oAuthInfo.cRequestMobile,
        Birth : oAuthInfo.cRequestBirth,
        Token : oAuthInfo.jwt,
      }

      axios
        .post(import.meta.env.VITE_UIL_API + "DelBoardWithAuthInfo", posData , {
          headers: {
          }
        })
        .then(res => {
          if (res.data.ResultCd === "00") {
            this.$refs.M4_Commu_DetailDialog_ref.CloseDialog()
            this.zData.splice(iSelectIndex, 1)

            let iLen = this.zData.length

            this.zData.forEach((item, index) => {
              item.iIndex = iLen - index
            })
          } else {
            EventBus.$emit("onShowMsg", {
              cSubTitle : "게시글 삭제 중 문제가 발생했습니다.",
              cTitle : "계속 지속될 경우 담당자에게 문의 바랍니다.",
              cMsg : `Error : ${res.data.Msg}`,
            });
          }
        })
        .catch(err =>{
          EventBus.$emit("onShowMsg", {
            cSubTitle : "게시글 삭제 중 문제가 발생했습니다.",
            cTitle : "계속 지속될 경우 담당자에게 문의 바랍니다.",
            cMsg : `Error : ${err}`,
          });
        })
        .finally(() =>{
        })
    },
  },
};
</script>

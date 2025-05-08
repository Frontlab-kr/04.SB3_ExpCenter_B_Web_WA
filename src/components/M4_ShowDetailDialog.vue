<template>
  <div>
    <v-dialog v-model="isShow" :width="iWidth" :min-width="330" aria-modal="true" @update:modelValue="CloseDialog" role="dialog" aria-labelledby="dialogTitle" aria-describedby="dialogDesc">      
      <v-card class="pa-5">                        
        <table class="nor_table">
          <caption class="sr-only">{{caption}} 게시글 테이블</caption>
          <thead>
            <tr>
              <th>{{ $t("all_table_header_4") }}</th>
              <td colspan="3">{{ oShowItem.PST_TTL }}</td>
            </tr>
          <tr v-if="oShowItem.TEXT != ''">
              <th>{{ $t("all_table_header_8") }}</th>
              <td colspan="3">{{ oShowItem.TEXT }}</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th colspan="1">{{ $t("all_table_header_5") }}</th>
              <td colspan="1">{{ oShowItem.CRT_USER_ID }}</td>
              <th colspan="1">{{ $t("all_table_header_3") }}</th>
              <td colspan="1">{{ oShowItem.INQ_CNT }}</td>
            </tr>
          </tbody>
        </table>

        <EditorRead ref="QuillEditorReadRef" class="ql-editor mt-4" v-model="oShowItem.PST_CN"></EditorRead>

        <!-- 첨부파일 -->
        <div v-if="zFileInfo.length > 0 && bShowFileUX" class="mt-4" style="background: white !important; overflow: auto;outline: #00000030 1px solid;padding: 12px; min-height:100px">
          <div class="title-medium font-bold pb-0">{{ $t("m4_showdetail_subtitle_1") }}</div>
          <div v-if="zFileInfo[0].FILE_ID == 'NONE'"> 파일없음</div>
          <div v-else v-for="(item, i) in zFileInfo" :key="i" class="d-flex align-center mb-2">
            <!-- <div style="width: calc(100% - 430px);" class="ml-2 mr-2 line_clamp_1">{{ item.FILE_NM}}</div> -->
            <div style="min-width:50px; width: 200px;" class="ml-2 mr-2 line_clamp_1">{{ item.FILE_NM }}</div>
            <v-spacer></v-spacer>|
            <v-btn @click="DownloadFile(item)" variant="text" >{{ $t("all_btn_download") }}</v-btn>
            <v-btn class="ml-2 mr-2" @click="previewAjax(item)"><v-icon aria-hidden="true" size="24">mdi-magnify-plus-outline</v-icon>{{ $t("m4_showdetail_content_1") }}</v-btn>
            <v-btn class="ml-2 mr-2" @click="preListen(item)"><v-icon aria-hidden="true" size="24">mdi-speaker-wireless</v-icon>{{ $t("m4_showdetail_content_2") }}</v-btn>
        </div>
        </div>

        <!-- 댓글리스트 -->
        <div v-if="bShowReplyUX" class="mt-4" style="background: white !important; overflow: auto;outline: #00000030 1px solid;min-height: 50px;">
          <div class="d-flex title-medium font-bold align-center" style="position: absolute;z-index: 12;background-color: white;width: calc(100% - 40px);margin-top: 0.1px;padding-right: 12px; padding-left: 12px;padding-top: 5px;">
            {{ $t("req_policy_header_3") }}
            <v-spacer></v-spacer>
            <v-btn @click="ShowReplyDialog()" color="primary"><v-icon aria-hidden="true" style="margin-right: 6px;" >mdi-pencil</v-icon>{{ $t("all_btn_reply") }}</v-btn>
          </div>

          <div class=" blank_area_essential"></div>
          <v-divider :aria-hidden="true" class="ml-3 mr-3"></v-divider>
          <div v-for="(item, i) in zReplyInfo" :key="i" class="mb-2" style="padding-right: 12px; padding-left: 12px;margin-top: 5px;">
            <v-card tile flat width="100%" class="detail-medium detail-text-color">
              <div class="d-flex">
                {{ item.CRT_USER_ID }}
                <v-spacer></v-spacer>
                <v-btn @click="CheckAuthDialog(item)" variant="outlined" color="black" style="height: 25px;width: 40px;"><v-icon aria-hidden="true" style="margin-right: 6px;">mdi-close</v-icon>{{ $t("all_btn_delete") }}</v-btn>
              </div>
              <div v-html="item.CMNT_CN"></div>
              <div>{{ item.cShowCreateDateTime }}</div>
              <v-divider :aria-hidden="true"></v-divider>
            </v-card>
          </div>
        </div>

        <!-- 아래버튼들  -->
        <div class="d-flex flex-wrap justify-end pb-1">
          <v-btn @click="PreBoard()" :disabled="bDisablePreBtn" class="ml-3 mt-4" variant="outlined" color="black"><v-icon aria-hidden="true" class="mdi-rotate-270" style="margin-right: 6px;">mdi-triangle</v-icon>{{ $t("all_btn_pre") }}</v-btn>
          <v-btn @click="NextBoard()" :disabled="bDisableNextBtn" class="ml-3 mt-4" variant="outlined" color="black"><v-icon aria-hidden="true" class="mdi-rotate-90" style="margin-right: 6px;">mdi-triangle</v-icon>{{ $t("all_btn_next") }}</v-btn>
          <v-btn @click="EditBoard()" v-if="bShowEditBtn" class="ml-3 mt-4" color="primary"><v-icon aria-hidden="true" style="margin-right: 6px;">mdi-file-edit-outline</v-icon>{{ $t("all_btn_edit") }}</v-btn>
          <v-btn @click="DelBoard()" v-if="bShowDelBtn" class="ml-3 mt-4" color="primary"><v-icon aria-hidden="true" style="margin-right: 6px;">mdi-file-edit-outline</v-icon>{{ $t("all_btn_delete") }}</v-btn>
          <v-btn ref="msg_btn_show_detail_okey" @click="CloseDialog()" class="ml-3 mt-4" variant="outlined" color="black"><v-icon aria-hidden="true" style="margin-right: 6px;">mdi-close</v-icon>{{ $t("all_btn_close") }}</v-btn>
        </div>

        <!-- 저작권 -->
        <div v-if="COPYRIGHT_YN" style="width: 100%;" class="d-flex align-start justify-start">
          <v-img :src="cCopyRightImgPath" max-width="200px" :aspect-ratio="16/9" alt="저작권 유형 이미지"></v-img>
          <div class="detail-medium detail-text-color ml-3" style="margin-top: 40px;">{{ cCopyRightText }}</div>
        </div>
      
      </v-card>
    </v-dialog>

    <!-- 비밀번호 확인 다이올로그 (게시글수정, 게시글삭제, 댓글삭제시) -->
    <M4_AuthMember @goauth="GoAuth" ref="M4_AuthMember_ref"></M4_AuthMember>

    <!-- 댓글 다이올로그 -->
    <M4_WriteReplyDialog :iWidth="iWidth" @SetReplyDialog="SetReplyDialog" ref="M4_WriteReplyDialog_ref"></M4_WriteReplyDialog>
  </div>
</template>

<script>
import axios from "axios";
import { EventBus } from '@/EventBus.js';
import EditorRead from "../views/EditorRead.vue";

export default {
  props : ["iWidth", "bDisablePreBtn", "bDisableNextBtn", "bShowEditBtn", "bShowDelBtn", "bShowReplyUX", "bShowFileUX", "caption"],
  data() {
    return {
      isShow : false,

      oShowItem : {
        PST_ID : "",
        PSWD : "",
        SelectIndex : -1,
        FT_CD : "",
        TEXT : "",
        PST_TTL : "",
        CRT_USER_ID : "",
        INQ_CNT : 0,
        PST_CN : "",
      },
      oDefaultShowItem : {
        PST_ID : "",
        PSWD : "",
        SelectIndex : -1,
        FT_CD : "",
        TEXT : "",
        PST_TTL : "",
        CRT_USER_ID : "",
        INQ_CNT : 0,
        PST_CN : "",
      },

      zFileInfo : [],
      zReplyInfo : [],

      iDelReplyIndex : -1,
      oDelReplyInfo : {
        CMNT_CN : "",
        CMNT_SEQ : "",
        PST_ID : "",
        CRT_DT : "",
        CRT_USER_ID : "",
        cShowCreateDateTime : "",
      },

      COPYRIGHT_YN : false, // 저작권 출력 유무
      COPYRIGHT_TYPE : "", // 저작권 유형

      zCopyRightText : [
        {cType : "A", cText : "공공누리 제1유형: 출처표시"},
        {cType : "B", cText : "공공누리 제2유형: 출처표시+상업적 이용금지"},
        {cType : "C", cText : "공공누리 제3유형: 출처표시+변경금지"},
        {cType : "D", cText : "공공누리 제4유형: 출처표시+상업적 이용금지+변경금지"},
        {cType : "E", cText : "공공누리 만료 공공저작물"},
      ],

    };
  },

  computed: {
    // 저작권 관련 이미지
    cCopyRightImgPath() {
      return "/boramae/contents/copyright/copyright_" + this.COPYRIGHT_TYPE + ".jpg"
    },
    // 저작권 관련 텍스트
    cCopyRightText() {
      return this.zCopyRightText.filter(item => item.cType == this.COPYRIGHT_TYPE)[0]?.cText
    },
  },

  components:{
    EditorRead,
  },

  mounted() {
  },

  methods : {
    // M4_AuthMember 다이올로그에서 cCaseType와 PSWD 가져와서 비번을 확인함 (cCaseType와: DR(댓글삭제), EB(게시글수정), DB(게시글삭게)
    // 다이올로그이므로, 부모 페이지로 넘김 
    GoAuth(oAuthObj) {
      if (oAuthObj.cCaseType == "DR") {
        this.$emit('DelReplyAfterCheckAuth', this.oDelReplyInfo.PST_ID, this.oDelReplyInfo.CMNT_SEQ, this.oDelReplyInfo.CRT_USER_ID, oAuthObj.PSWD)
      } else if (oAuthObj.cCaseType == "EB") {
        this.$emit('ShowEditDialogAfterCheckAuth', oAuthObj.PSWD, this.oShowItem.SelectIndex)
      } else {
        this.$emit('DelBoardAfterCheckAuth', oAuthObj.PSWD, this.oShowItem.SelectIndex)
      }
    },

    CloseAuthDialog() {
      this.$refs.M4_AuthMember_ref.CancelAuth()
    },
    // // 메인 (본인확인완료) -> 메인 다이올로그 삭제기능 호출
    // DelAfterAuth() {
    //   this.$refs.M4_AuthMember_ref.CancelAuth()
    //   this.$emit("DelBoard", this.oShowItem)
    // },

    // 패스워드에서 ctl 가능하도록 하는 기능
    CopyByCtrlC(event, value) {
      if (event.key.toUpperCase() == "C" || event.key.toUpperCase() == "X") {
        navigator.clipboard.writeText(value)
      }
    },

    // 바로보기
    previewAjax(item) {
      var apiKey = "TVW3MGA0YLL89BP6MRNDAG";
      var cc = "sg_068";

      var fileUrl= encodeURIComponent(import.meta.env.VITE_FILE_API + item.FILE_PATH);
      var fileName= encodeURIComponent(item.FILE_NM);

      window.open(`https://seoul.viewstory.net/previewAjax.do?apikey=${apiKey}&cc=${cc}&url=${fileUrl}&fileName=${fileName}`, "a", "width=1200, height=1000, left=100, top=50");
    },

    // 바로듣기 
    preListen(item) {
      var apiKey= "TVW3MGA0YLL89BP6MRNDAG";
      var cc = "sg_068";
      var fileUrl= encodeURIComponent(import.meta.env.VITE_FILE_API + item.FILE_PATH);
      var fileName= encodeURIComponent(item.FILE_NM);

      window.open(`https://seoul.viewstory.net/voiceOverAjax.do?apikey=${apiKey}&cc=${cc}&url=${fileUrl}&fileName=${fileName}`, "a", "width=1200, height=1000, left=100, top=50");
    },

    // 상세화면 다이올로그 열기
    ShowDialog(oDetailInfo, zFileInfo, zReplyInfo) {
      this.isShow = true
      this.$store.state.isDialog = true;
      this.$store.state.btnDialogRef = document.activeElement;
      this.oShowItem = {...oDetailInfo}
      this.COPYRIGHT_YN = oDetailInfo.COPYRIGHT_YN
      this.COPYRIGHT_TYPE = oDetailInfo.COPYRIGHT_TYPE

      this.zFileInfo = zFileInfo
      this.zReplyInfo = zReplyInfo

      this.$nextTick(() => {
        this.$refs.QuillEditorReadRef.refresh(this.oShowItem.PST_CN);
      })
      this.$emit("onGoToContent");
    },


    goToContent() {
      setTimeout(() => {
        const element = document.getElementById('cmm-content');
        if (element) {          
          const firstFocusable = element.querySelectorAll('[tabindex="0"]');
          console.log(firstFocusable);          
          if (firstFocusable.length > 0) {
            firstFocusable[0].focus({ preventScroll: true });
          } else {
            console.warn('포커스 가능한 요소가 없습니다.');
          }
        }
      }, 400);
    },


    // 상세화면 다이올로그 닫기
    CloseDialog() {
      this.isShow = false
      this.oShowItem = {...this.oDefaultShowItem}
      this.zFileInfo = []
      this.zReplyInfo = []

      this.$store.state.isDialog = false;
      EventBus.$emit("onBackDialogBtn"); 
    },

    // 파일 다운로드
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

    // 댓글등록창 열기
    ShowReplyDialog() {
      this.$refs.M4_WriteReplyDialog_ref.ShowDialog()
    },

    // 이전게시글 열기
    PreBoard() {
      this.$emit("ChangeBoardDetail", this.oShowItem.SelectIndex - 1)
    },

    // 다음 게시글 열기
    NextBoard() {
      this.$emit("ChangeBoardDetail", this.oShowItem.SelectIndex + 1)
    },

    // 본인확인 다이올로그 열기 (수정버튼 클릭시)
    EditBoard() {
      this.$refs.M4_AuthMember_ref.ShowAuthDialog("EB")
    },

    // 본인확인 다이올로그 열기 (삭제버튼)
    DelBoard() {
      this.$refs.M4_AuthMember_ref.ShowAuthDialog("DB")
    },

    // 메인페이지에 댓글 등록 api 호출 (M4_WriteReplyDialog.vue에서 받아와서 메인페이지로 넘김)
    SetReplyDialog(oReplyItem) {
      this.$emit("SetReply", oReplyItem, this.oShowItem.SelectIndex)
    },

    // 상세 페이지에 댓글 업데이트 (메인페이지에서 댓글등록 api 결과를 받아서)
    AddReply(AddInfo) {
      this.$refs.M4_WriteReplyDialog_ref.CloseDialog()
      this.zReplyInfo.unshift(AddInfo)
    },

    // 상세 다이올로그에 댓글삭제
    DelReply() {
      this.$refs.M4_AuthMember_ref.CancelAuth()
      this.zReplyInfo.splice(this.iDelReplyIndex, 1)
    },

    // 본인확인 다이올로그 열기 (댓글삭제버튼 클릭시)
    CheckAuthDialog(item) {
      this.oDelReplyInfo = {...item}
      this.iDelReplyIndex = this.zReplyInfo.indexOf(item)
      this.$refs.M4_AuthMember_ref.ShowAuthDialog("DR")
    },
  },
};
</script>

<style scoped>
  .blank_area_essential {
    margin-top: 44px;
  }
</style>
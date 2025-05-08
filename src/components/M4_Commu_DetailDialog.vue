<template>
  <div>
    <v-dialog aria-modal="true" v-model="isShow" :width="iWidth" :min-width="330">
      <v-card class="pa-5">
        <!-- 게시글 제목등 내역 -->
        <table class="nor_table">
          <caption class="sr-only">{{oShowItem.Title}} 상세 정보 테이블</caption>
          <thead>
            <tr>
              <th scope="row">{{ $t("all_table_header_4") }}</th>
              <td colspan="3">{{ oShowItem.PST_TTL }}</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" colspan="1">{{ $t("all_table_header_5") }}</th>
              <td colspan="1">{{ oShowItem.CRT_USER_ID }}</td>
              <th scope="row" colspan="1">{{ $t("all_table_header_3") }}</th>
              <td colspan="1">{{ oShowItem.INQ_CNT }}</td>
            </tr>
          </tbody>
        </table>

        <EditorRead ref="QuillEditorReadRef" class="ql-editor mt-4" v-model="oShowItem.PST_CN"></EditorRead>

        <!-- 첨부파일 -->
        <div v-if="zFileInfo.length > 0" class="mt-4" style="background: white !important; overflow: auto;outline: #00000030 1px solid;padding: 12px;">
          <div class="title-medium font-bold pb-0">{{ $t("m4_showdetail_subtitle_1") }}</div>
          <div v-for="(item, i) in zFileInfo" :key="i" class="d-flex align-center mb-2">
            <div style="width: calc(100% - 430px);" class="ml-2 mr-2 line_clamp_1">{{ item.FILE_NM}}</div>
            <v-btn @click="DownloadFile(item)" variant="text">{{ $t("all_btn_download") }}</v-btn>
          </div>
        </div>

        <!-- 아래버튼들  -->
        <div class="d-flex flex-wrap justify-end pb-1">
          <v-btn @click="PreBoard()" :disabled="bDisablePreBtn" class="ml-3 mt-4" variant="outlined" color="black" ><v-icon aria-hidden="true" class="mdi-rotate-270" style="margin-right: 6px;">mdi-triangle</v-icon>{{ $t("all_btn_pre") }}</v-btn>
          <v-btn @click="NextBoard()" :disabled="bDisableNextBtn" class="ml-3 mt-4" variant="outlined" color="black" ><v-icon aria-hidden="true" class="mdi-rotate-90" style="margin-right: 6px;">mdi-triangle</v-icon>{{ $t("all_btn_next") }}</v-btn>
          <v-btn @click="EditBoard()" v-if="bShowEditBtn" class="ml-3 mt-4" color="primary"><v-icon aria-hidden="true" style="margin-right: 6px;">mdi-file-edit-outline</v-icon>{{ $t("all_btn_edit") }}</v-btn>
          <v-btn @click="DelBoard()" v-if="bShowDelBtn" class="ml-3 mt-4" color="primary"><v-icon aria-hidden="true" style="margin-right: 6px;">mdi-file-edit-outline</v-icon>{{ $t("all_btn_delete") }}</v-btn>
          <v-btn @click="CloseDialog()" class="ml-3 mt-4" variant="outlined" color="black"><v-icon aria-hidden="true" style="margin-right: 6px;">mdi-close</v-icon>{{ $t("all_btn_close") }}</v-btn>
        </div>
      </v-card>
    </v-dialog>

    <M4_Commu_AuthDialog @EndAuth="EndAuth" ref="M4_Commu_AuthDialog_ref"></M4_Commu_AuthDialog>
  </div>
</template>

<script>
import axios from "axios";
import { EventBus } from '@/EventBus.js';
import EditorRead from "../views/EditorRead.vue";

export default {
  props : ["iWidth", "bDisablePreBtn", "bDisableNextBtn", "bShowEditBtn", "bShowDelBtn"],
  data() {
    return {
      isShow : false,

      oShowItem : {
        PST_ID : "",
        SelectIndex : -1,
        PST_TTL : "",
        CRT_USER_ID : "",
        INQ_CNT : 0,
        PST_CN : "",
        Title : "",
      },
      oDefaultShowItem : {
        PST_ID : "",
        SelectIndex : -1,
        PST_TTL : "",
        CRT_USER_ID : "",
        INQ_CNT : 0,
        PST_CN : "",
      },

      zFileInfo : [],

      cEditCaseCode : "EB",
      cDeleteCaseCode : "DB",
    }
  },

  components:{
    EditorRead,
  },

  mounted() {
  },

  methods: {
    EndAuth(cCase, oAuthInfo) {
      if (cCase == this.cEditCaseCode) {
        this.$emit("EditAfterAuth", this.oShowItem.SelectIndex, oAuthInfo)
      } else {
        this.$emit("DeleteAfterAuth", this.oShowItem.SelectIndex, oAuthInfo)
      }
    },

    // 상세화면 다이올로그 열기
    ShowDialog(oDetailInfo, zFileInfo) {
      this.isShow = true
      this.$store.state.isDialog = true;
      this.$store.state.btnDialogRef = document.activeElement;

      this.oShowItem = {...oDetailInfo}

      this.zFileInfo = zFileInfo

      this.$nextTick(() => {
        this.$refs.QuillEditorReadRef.refresh(this.oShowItem.PST_CN)
      })
    },

    // 상세화면 다이올로그 닫기
    CloseDialog() {
      this.$refs.M4_Commu_AuthDialog_ref.CloseDialog()
      this.isShow = false
      this.$store.state.isDialog = false;
      EventBus.$emit("onBackDialogBtn");   
      this.oShowItem = {...this.oDefaultShowItem}
      this.zFileInfo = []
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
      this.$refs.M4_Commu_AuthDialog_ref.ShowDialog(this.cEditCaseCode)
    },

    // 본인확인 다이올로그 열기 (삭제버튼)
    DelBoard() {
      this.$refs.M4_Commu_AuthDialog_ref.ShowDialog(this.cDeleteCaseCode)
    },
  }
}
</script>
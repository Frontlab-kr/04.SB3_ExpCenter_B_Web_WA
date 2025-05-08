<template>
  <v-dialog v-model="bReplyDialog" :width="iWidth" :min-width="330" aria-modal="true" @update:modelValue="DialogClose">
    <v-card class="pa-5">
      <!-- 답글쓰기 -->
      <div>
        <v-row class="ma-0">
          <v-col cols="12" class="d-flex align-center">
            <h2 class="title-xlarge">{{ $t("m4_showdetail_subtitle_2") }}</h2>
          </v-col>
          <v-col cols="12" md="6">
            <M4_Input v-model="oReplyItem.CRT_USER_ID" :label="$t('all_table_header_5')" density="compact" variant="outlined" color="primary"></M4_Input>
          </v-col>
          <v-col cols="12" md="6">
            <!-- <M4_Input v-model="oReplyItem.PSWD" :label="$t('all_table_header_9')" @keyup.ctrl="CopyByCtrlC($event, oReplyItem.PSWD)" @click:append-inner="oReplyItem.bShowPwd = !oReplyItem.bShowPwd"  
              :class="{'test_password_style' : !oReplyItem.bShowPwd}" :icon="sAppendIcon">              
            </M4_Input> -->

            <label for="pwd" class="m4_input-label">{{$t('all_table_header_9') + '(*)'}}</label>      
            <v-text-field 
              id="pwd" 
              density="compact"
              variant="outlined"
              persistent-placeholder
              class="mb-2 custom-opacity"
              :class="{'test_password_style' : !bShow}"          
              @click:append-inner="bShow = !bShow" :append-inner-icon="sAppendIcon"
              @keyup.ctrl="CopyByCtrlC($event, oReplyItem.PSWD)"
              v-model="oReplyItem.PSWD"  
              hide-details>              
            </v-text-field>     


          </v-col>
          <v-col cols="12">
            <M4_Inputarea v-model="oReplyItem.CMNT_CN" hide-details :label="$t('req_policy_header_3')" :auto-grow="true" :no-resize="true" rows="1"></M4_Inputarea>
          </v-col>
        </v-row>

        <div class="d-flex flex-wrap justify-end pb-1">
          <v-btn @click="SetReplyDialog()" class="ml-3 mt-4" color="primary"><v-icon aria-hidden="true" style="margin-right: 6px;">mdi-pencil</v-icon>{{ $t("all_btn_reply") }}</v-btn>
          <v-btn @click="DialogClose()" class="ml-3 mt-4" variant="outlined" color="black"><v-icon aria-hidden="true" style="margin-right: 6px;">mdi-close</v-icon>{{ $t("all_btn_close") }}</v-btn>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { EventBus } from '@/EventBus.js';

export default {
  props : ["iWidth"],
  data() {
    return {
      bShow : false,
      bReplyDialog : false,
      oReplyItem : {
        CRT_USER_ID : "",
        PSWD : "",
        CMNT_CN : "",
        bShowPwd : false,
      },
      oDefaultReplyItem : {
        CRT_USER_ID : "",
        PSWD : "",
        CMNT_CN : "",
        bShowPwd : false,
      },
    }
  },

  computed: {
    sAppendIcon() {
      return this.oReplyItem.bShowPwd ? "mdi-eye" : "mdi-eye-off"
    }
  },

  components:{
  },

  mounted() {
  },

  methods : {
    DialogClose() {
      this.bReplyDialog = false;      
      this.$store.state.isDialog = false;
      EventBus.$emit("onBackDialogReplyBtn");       
    },

    // 답글쓰기 다오올로그 열기
    ShowDialog() {
      this.bReplyDialog = true
      this.$store.state.isDialog = true;
      this.$store.state.btnReplyDialogRef = document.activeElement;

      this.oReplyItem = {...this.oDefaultReplyItem}
    },

    // 답글쓰기 다오올로그 닫기
    CloseDialog() {
      this.DialogClose();
      this.oReplyItem = {...this.oDefaultReplyItem}
    },

    // 답글 등록 (부모 페이지에 아이디/비번/답글 넘기기)
    SetReplyDialog() {
      var bExistNoData = false;
      var cTitleMsg = "";

      this.oReplyItem.CRT_USER_ID = this.oReplyItem.CRT_USER_ID.trim()
      this.oReplyItem.PSWD = this.oReplyItem.PSWD.trim()
      this.oReplyItem.CMNT_CN = this.oReplyItem.CMNT_CN.trim()

      if (this.oReplyItem.CRT_USER_ID == "") {
        cTitleMsg = "작성자 정보 누락"
        bExistNoData = true
      }

      if (!bExistNoData && this.oReplyItem.PSWD == "") {
        cTitleMsg = "비밀번호 정보 누락"
        bExistNoData = true
      }

      if (!bExistNoData && this.oReplyItem.CMNT_CN == "") {
        cTitleMsg = "댓글 데이터 누락"
        bExistNoData = true
      }

      if (bExistNoData) {
        EventBus.$emit("onShowMsg", {
          cSubTitle : "누락된 정보가 있습니다.",
          cTitle : cTitleMsg,
          cMsg : "",
        });
      } else {
        this.$emit("SetReplyDialog", this.oReplyItem)
      }
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
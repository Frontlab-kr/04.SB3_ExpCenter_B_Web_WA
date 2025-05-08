<template>
  <v-dialog aria-modal="true" @update:modelValue="DialogClose" v-model="isShow" width="40%" min-width="350px">
    <v-card class="pa-4 pl-6 pr-6">
      <h1 class="title-xxlarge">{{ $t("m4_authmember_title") }}</h1>
      <div class="title-medium font-bold mb-2" >※ {{ $t("m4_authmember_subtitle") }}.</div>

     <!-- 비밀번호 입력 -->
     <v-row>
        <v-col cols="12">
          <v-text-field
            hide-details
            v-model="oEditItem.PSWD"
            :label="$t('all_table_header_9')"
            :aria-label="$t('all_table_header_9')"
            @keyup.enter="PressEnterKeyboard"
            @keyup.ctrl="CopyByCtrlC($event, oEditItem.PSWD)"
            @click:append-inner="bShow = !bShow"            
            :class="{'test_password_style' : !bShow}"
            class="mt-3"
            density="compact"
            variant="outlined"
            color="primary"
            ref="auth_pwd_ref"            
            persistent-placeholder>
            <template v-slot:append-inner>
            <v-icon aria-hidden="true">{{sAppendIcon}}</v-icon>
          </template>
          </v-text-field>
        </v-col>
      </v-row>

      <!-- 취소/확인 버튼 -->
      <div class="d-flex flex-wrap justify-end pb-1">
        <v-btn @click="CheckAuth_ALL()" @keyup.enter="CheckAuth_ALL()" class="ml-3 mt-4" color="primary" width="80px" >{{ $t("all_btn_check") }}</v-btn>
        <v-btn @click="CancelAuth()" @keyup.enter="CancelAuth()" class="ml-3 mt-4" variant="outlined" color="black" width="80px" >{{ $t("all_btn_cancel") }}</v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { EventBus } from '@/EventBus.js';

export default {
  data() {
    return {
      isShow : false,
      bShow : false,

      oEditItem : {
        cCaseType : "",
        PSWD : "",
      },
      oDefaultEditItem : {
        cCaseType : "",
        PSWD : "",
      },
    };
  },

  computed: {
    sAppendIcon() {
      return this.bShow ? "mdi-eye" : "mdi-eye-off"
    }
  },

  mounted() {
  },

  methods : {
    DialogClose() {
      this.isShow = false;      
      this.$store.state.isDialog = false;
      EventBus.$emit("onBackDialogBtn");       
    },

    PressEnterKeyboard(event) {
      const clickedElement = event.target;
      if (clickedElement.tagName.toUpperCase() == "I") {
        this.bShow = !this.bShow
      } else {
        this.CheckAuth_ALL()
      }
    },

    // 패스워드에서 ctl 가능하도록 하는 기능
    CopyByCtrlC(event, value) {
      if (event.key.toUpperCase() == "C" || event.key.toUpperCase() == "X") {
        navigator.clipboard.writeText(value)
      }
    },

    // 다이올로그 열기
    ShowAuthDialog(cCase) {
      this.isShow = true;
      this.$store.state.isDialog = true;
      this.$store.state.btnDialogRef = document.activeElement;
      
      this.bShow = false;
      this.oEditItem = {...this.oDefaultEditItem}
      this.oEditItem.cCaseType = cCase
    },

    // 취소하기 
    CancelAuth() {
      this.isShow = false;
      this.bShow = false;
      this.oEditItem = {...this.oDefaultEditItem}
    },

    // 인증실패시 비밀번호 초기화 
    FailAuthMember() {
      this.oEditItem.PSWD = ""
    },

    // 확인버튼
    CheckAuth_ALL() {
      this.$emit('goauth', {
        cCaseType : this.oEditItem.cCaseType,
        PSWD : this.oEditItem.PSWD,
      });
    },
  },
};
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
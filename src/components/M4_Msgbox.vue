<template>
  <v-dialog v-model="isShow" width="560" aria-modal="true" @update:modelValue="DialogClose"  role="dialog"  aria-labelledby="dialogTitle" aria-describedby="dialogDesc">    
    <div aria-live="assertive"  class="sr-only"  ref="liveRegion"></div>        
    <div class="win-box" role="main">
      <div class="d-flex title-small font-bold">
        <div>{{ cSubTitle }}</div>
        <v-spacer></v-spacer>
        <v-btn class="mt-n5 mr-n5" icon="mdi-close" variant="plain" @click="DialogClose" color="black" title="닫기"></v-btn>
      </div>

      <div class="title-medium font-bold mt-2" >{{ cTitle }}</div>
      <div class="mt-3">{{ cMsg }}</div>

      <div class="mt-3 d-flex">
        <v-spacer></v-spacer>

        <v-btn v-if="isReturn" variant="outlined" color="black" @click="onOkey(false)">취소</v-btn>
        <v-btn class="ml-2" color="primary" @click="onOkey(true)">확인</v-btn>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import { EventBus } from '@/EventBus.js';

export default {
  data() {
    return {
      isShow: false,
      isReturn : false,
      cSubTitle : "팝업 타이틀",
      cTitle : "타이틀",
      cMsg : "대화 상자는 사용자에게 작업에 대해 알리고 중요한 정보를 포함하거나 결정이 필요하거나 여러 작업을 포함할 수 있습니다.",
    };
  },

  mounted() {
  },

  watch: {
  },

  methods : {
    DialogClose() {
      this.isShow = false;      
      this.$store.state.isDialog = false;
      EventBus.$emit("onBackDialogMsgBtn");       
    },
    

    // 모든페이지의 API 실패시 메시지창 열기
    Show(cSubTitle, cTitle, cMsg) {
      
      this.cSubTitle = cSubTitle;
      this.cTitle = cTitle;
      this.cMsg = cMsg;
      this.isReturn = false;
      this.isShow = true;
      this.$store.state.isDialog = true;
      this.$store.state.btnMsgDialogRef = document.activeElement;    
      setTimeout(() => {
        if (this.$refs.liveRegion) {
          this.$refs.liveRegion.textContent = cSubTitle + " " + cTitle + " ";
          this.skipToMain();
        }
        }, 1000);
    },

    ShowReturn(cSubTitle, cTitle, cMsg) {      
      this.cSubTitle = cSubTitle;
      this.cTitle = cTitle;
      this.cMsg = cMsg;
      this.isReturn = false;
      this.isShow = true;
      this.$store.state.isDialog = true;
      this.$store.state.btnMsgDialogRef = document.activeElement;    
      setTimeout(() => {
        if (this.$refs.liveRegion) {
          this.$refs.liveRegion.textContent = cSubTitle + " " + cTitle + " ";
          this.skipToMain();
        }
        }, 1000);
    },

    ShowResult(cSubTitle, cTitle, cMsg) {
      this.cSubTitle = cSubTitle;
      this.cTitle = cTitle;
      this.cMsg = cMsg;
      this.isReturn = true;
      this.isShow = true;
      this.$store.state.isDialog = true;
      this.$store.state.btnMsgDialogRef = document.activeElement;    

      setTimeout(() => {
        if (this.$refs.liveRegion) {
          this.$refs.liveRegion.textContent = cSubTitle + " " + cTitle + " ";
          this.skipToMain();
        }
        }, 1000);
    },

    onOkey(result){
      this.DialogClose();      
      this.$emit("onResult", result);
    },


    skipToMain() {
      //      
    }
  },
};
</script>

<style scoped>
  .win-box {
    background: #ffffff;
    width : 100%;
    border-radius: var(--radius-xlarge);
    border: 1px #C6C6C6 solid;
    padding: 37px;
    box-shadow: 0px 0px 100px 10px #00000050;
  }
</style>


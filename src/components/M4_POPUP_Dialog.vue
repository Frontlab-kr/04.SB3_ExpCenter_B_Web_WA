<template>
  <v-dialog v-model="isShow" style="width: 500px; max-width: calc(100% - 10px);"  aria-modal="true" @update:modelValue="DialogClose">
    <v-card class="pa-3" style="overflow: hidden;">
      <div class="title-small">{{ NowShowPopupInfo.POPUP_TTL }}</div>

      <div class="bg-gap-1"></div>
      <!-- <div class="mb-3 nor_table_center"></div> -->
      <div style="overflow-x: auto; overflow-y: auto;" class="d-flex align-center">
        <v-btn @click="PreBoard()" v-if="zPopUpInfo.length != 1" title="이전 팝업" icon size="40"><v-icon aria-hidden="true" class="mdi-rotate-270" style="margin-right: 5px;" size="22">mdi-triangle</v-icon></v-btn>
        <v-spacer></v-spacer>

        <div v-show="NowShowPopupInfo.POPUP_TYPE == 'N'" style="width: 90%;">
          <EditorRead ref="QuillEditorReadRef" class="ql-editor mt-4" v-model="NowShowPopupInfo.POPUP_CN"></EditorRead>
        </div>

        <div v-show="NowShowPopupInfo.POPUP_TYPE != 'N'" style="width: 100%; display: flex; justify-content: center; overflow: hidden;">
          <v-img :src="NowShowPopupInfo.cShowPath" :alt="NowShowPopupInfo.ALT_TEXT" width="330px" height="250"></v-img>
        </div>

        <v-spacer></v-spacer>
        <v-btn @click="NextBoard()" v-if="zPopUpInfo.length != 1" title="다음 팝업" icon size="40"><v-icon aria-hidden="true" class="mdi-rotate-90" style="margin-left: 5px;" size="22">mdi-triangle</v-icon></v-btn>
      </div>

      <div class="d-flex" style="height: 40px;">
        <v-checkbox
          v-model="bNoMoreShow"
          @click="NoMoreShowPopup"
          @keyup.enter="NoMoreShowPopup"
          true-icon="mdi-checkbox-marked"
          false-icon="mdi-checkbox-blank-outline"
          class="custom-checkbox-icon"
          alt="오늘 하루동안 팝업을 띄우지 않도록 하는 버튼 입니다."
        >
          <template v-slot:label>
            <div class="mt-1 d-none d-md-flex" style="font-size: 14px;">오늘하루 이 창을 열지 않습니다.</div>
            <div class="mt-1 d-md-none" style="font-size: 12px;">오늘하루 이 창을 열지 않습니다.</div>
          </template>
        </v-checkbox>

        <v-spacer></v-spacer>
        <v-btn @click="DialogClose" style="margin-top: 14px;" variant="outlined" color="black" title="닫기" density="comfortable"><v-icon aria-hidden="true" style="margin-right: 6px;">mdi-close</v-icon>{{ $t("all_btn_close") }}</v-btn>
        <!-- <v-btn @click="DialogClose" style="margin-top: 16px;" variant="plain" density="compact">닫기</v-btn> -->
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import * as Util from "@/Util.js";
import { EventBus } from '@/EventBus.js';
import EditorRead from "../views/EditorRead.vue";

export default {
  data() {
    return {
      isShow : false,
      bNoMoreShow : false,
      iShowIndex : 0,
      zPopUpInfo : [],
      Today : Util.formatDate(new Date()),
    }
  },

  components:{
    EditorRead,
  },

  computed: {
    NowShowPopupInfo() {
      let contents = this.zPopUpInfo[this.iShowIndex]
      if (contents.POPUP_TYPE == "N") {
        this.$nextTick(() => {
          this.$refs.QuillEditorReadRef.refresh(contents.POPUP_CN);
       });
      }
      return contents
    }
  },

  methods: {
    DialogClose() {
      this.isShow = false;      
      this.$store.state.isDialog = false;
      EventBus.$emit("onBackDialogBtn");       
    },

    ShowPopupDialog(zPopUpInfo) {
      // localStorage.removeItem("NoShowPopupStamp: "+ import.meta.env.VITE_SITE_ID)
      let today = new Date().toISOString().split("T")[0]
      let stamp = localStorage.getItem("NoShowPopupStamp: "+ import.meta.env.VITE_SITE_ID)
      // 오늘 확인
      if (stamp && stamp == today) {
        return
      }

      this.bNoMoreShow = false
      this.iShowIndex = 0

      this.zPopUpInfo = zPopUpInfo.map(item => {
        item.cShowPath = import.meta.env.VITE_FILE_API + item.FILE_PATH
        return item
      })

      this.isShow = true
      this.$store.state.isDialog = true;
      this.$store.state.btnDialogRef = document.activeElement;
    },
    
    NextBoard() {
      if (this.iShowIndex == this.zPopUpInfo.length - 1) {
        this.iShowIndex = 0
      } else {
        this.iShowIndex += 1
      }
    },

    PreBoard() {
      if (this.iShowIndex == 0) {
        this.iShowIndex = this.zPopUpInfo.length - 1
      } else {
        this.iShowIndex -= 1
      }
    },

    NoMoreShowPopup() {
      this.DialogClose();
      let today = new Date().toISOString().split("T")[0]
      localStorage.setItem("NoShowPopupStamp: "+ import.meta.env.VITE_SITE_ID, today)
    },
  }
}
</script>
<template>
  <div>
    <v-dialog v-model="isShow" :width="iWidth" :min-width="330" aria-modal="true" @update:modelValue="DialogClose">
      <v-card class="pa-5">
        <!-- 제목 -->
        <h2 class="title-xlarge">{{ oShowItem.cDialogTitle }}</h2>
        <div class="title-medium font-bold">{{ oShowItem.PST_TTL }}</div>

        <v-row style="margin: 4px;">
          <!-- <v-col cols="12" xs="12" sm="6" class="pa-0" style="height : 400px"> -->
          <v-col cols="12" xs="12" sm="6" class="pa-0" style="max-height : calc(80% - 0px)">
            <!-- 왼쪽 이미지 -->
            <!--iron28 화면 설명 alt 추가 필요-->
            <v-img :src="cShowPath" aria-hidden="" aspect-ratio="1"></v-img>
            <!-- pagination -->
            <div class="text-center">
              <v-pagination
                v-if="zFileInfo.length != 0"
                v-model="iPaginationIndex"
                :length="zFileInfo.length"
                next-icon="mdi-menu-right"
                prev-icon="mdi-menu-left"
              ></v-pagination>
            </div>
          </v-col>
          <!-- 오른쪽 내용 -->
          <v-col cols="12" xs="12" sm="6" class="pl-6 pr-6">
            <!-- <div v-html="oShowItem.PST_CN"></div> -->
            <EditorRead ref="QuillEditorReadRef" class="ql-editor mt-4" v-model="oShowItem.PST_CN"></EditorRead>
          </v-col>
          <v-col cols="12">
            <!-- 이전/다음/닫기 버튼들 -->
            <div class="d-flex flex-wrap justify-end pb-1">
              <v-btn @click="PreBoard()" :disabled="bDisablePreBtn" class="ml-3 mt-4" variant="outlined" color="black"><v-icon aria-hidden="true" class="mdi-rotate-270" style="margin-right: 6px;">mdi-triangle</v-icon>{{ $t("all_btn_pre") }}</v-btn>
              <v-btn @click="NextBoard()" :disabled="bDisableNextBtn" class="ml-3 mt-4" variant="outlined" color="black"><v-icon aria-hidden="true" class="mdi-rotate-90" style="margin-right: 6px;">mdi-triangle</v-icon>{{ $t("all_btn_next") }}</v-btn>
              <v-btn @click="DialogClose()" class="ml-3 mt-4" variant="outlined" color="black"><v-icon aria-hidden="true" style="margin-right: 6px;">mdi-close</v-icon>{{ $t("all_btn_close") }}</v-btn>
            </div>
          </v-col>
        </v-row>

        <!-- 저작권 -->
        <div v-if="COPYRIGHT_YN" style="width: 100%;" class="d-flex align-start justify-start">
          <v-img :src="cCopyRightImgPath" max-width="200px" :aspect-ratio="16/9" alt="저작권 유형 이미지"></v-img>
          <div class="detail-medium detail-text-color ml-3" style="margin-top: 40px;">{{ cCopyRightText }}</div>
        </div>

      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { EventBus } from '@/EventBus.js';
import EditorRead from "../views/EditorRead.vue";

export default {
  props : ["iWidth", "bDisablePreBtn", "bDisableNextBtn"],
  data() {
    return {
      isShow : false,

      oShowItem : {
        cDialogTitle : "",
        SelectIndex : -1,
        PST_TTL : "",
        PST_CN : "",
      },
      zFileInfo : [],
      iPaginationIndex : -1,

      COPYRIGHT_YN : false, // 저작권 출력 유무
      COPYRIGHT_TYPE : "", // 저작권 유형

      zCopyRightText : [
        {cType : "A", cText : "공공누리 제1유형: 출처표시"},
        {cType : "B", cText : "공공누리 제2유형: 출처표시+상업적 이용금지"},
        {cType : "C", cText : "공공누리 제3유형: 출처표시+변경금지"},
        {cType : "D", cText : "공공누리 제4유형: 출처표시+상업적 이용금지+변경금지"},
        {cType : "E", cText : "공공누리 만료 공공저작물"},
      ],

    }
  },

  components:{
    EditorRead,
  },

  computed: {
    // pagination의 선택 번호(iPaginationIndex)에 따라 이미지 변경 
    cShowPath() {
      if (this.zFileInfo.length > 0) {
        return import.meta.env.VITE_FILE_API + this.zFileInfo[this.iPaginationIndex - 1].FILE_PATH
      } else {
        return import.meta.env.VITE_FILE_API + "Files/NONE.png"
      }
    },
    // 저작권 관련 이미지
    cCopyRightImgPath() {
      return "/boramae/contents/copyright/copyright_" + this.COPYRIGHT_TYPE + ".jpg"
    },
    // 저작권 관련 텍스트
    cCopyRightText() {
      return this.zCopyRightText.filter(item => item.cType == this.COPYRIGHT_TYPE)[0]?.cText
    },
  },

  watch: {
  },

  mounted() {
  },

  methods : {
    DialogClose() {
      this.isShow = false;      
      this.$store.state.isDialog = false;
      EventBus.$emit("onBackDialogBtn");       
    },

    // 겔러리형 상세화면 열기
    ShowDialog(oShowItem, zFileInfo) {
      this.oShowItem = {...oShowItem}
      this.zFileInfo = zFileInfo
      this.iPaginationIndex = 1 // pagination의 번호 초기화
      this.isShow = true
      this.COPYRIGHT_YN = oShowItem.COPYRIGHT_YN
      this.COPYRIGHT_TYPE = oShowItem.COPYRIGHT_TYPE
      
      this.$store.state.isDialog = true;
      this.$store.state.btnDialogRef = document.activeElement;
 
      this.$nextTick(() => {
        this.$refs.QuillEditorReadRef.refresh(this.oShowItem.PST_CN);
      })

      this.$emit("onGoToContent");
    },

    // 이전 페이지 이동
    PreBoard() {
      this.$emit("ChangeBoardDetail", this.oShowItem.SelectIndex - 1)
    },

    // 다음 페이지 이동
    NextBoard() {
      this.$emit("ChangeBoardDetail", this.oShowItem.SelectIndex + 1)
    },
  }
}
</script>
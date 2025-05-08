<template>
  <div>
    <h1 v-if="bShowPageTitle" class="title-xxlarge">{{ PAGE_NM }}</h1>
    <!-- <div class="bg_body" v-html="HTML_DATA"></div> -->
    <EditorRead ref="QuillEditorReadRef" class="ql-editor mt-4" v-model="HTML_DATA"></EditorRead>

    <!-- 저작권 -->
    <div v-if="COPYRIGHT_YN" style="width: 100%;" class="d-flex align-start justify-start">
      <v-img :src="cCopyRightImgPath" max-width="200px" :aspect-ratio="16/9" alt="저작권 유형 이미지"></v-img>
      <div class="detail-medium detail-text-color ml-3" style="margin-top: 40px;">{{ cCopyRightText }}</div>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import * as Util from "@/Util.js";
import EditorRead from "../views/EditorRead.vue";

export default {
  props : ["bShowPageTitle"],
  data() {
    return {
      PAGE_NM : "",
      HTML_DATA : "",

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

  components:{
    EditorRead,
  },

  computed: {
    // 저작권 관련 이미지
    cCopyRightImgPath() {
      // copyright_A.jpg
      return "/boramae/contents/copyright/copyright_" + this.COPYRIGHT_TYPE + ".jpg"
    },
    // 저작권 관련 텍스트
    cCopyRightText() {
      return this.zCopyRightText.filter(item => item.cType == this.COPYRIGHT_TYPE)[0]?.cText
    },
  },

  methods : {
    // M4_Dynamic_NoContents.vue에서 호출됨
    // 동적 page형 VUE 정보호출 API
    GetDynamicPageInfo(MENU_ID, PAGE_ID) {
      var posData = {
        SITE_ID : import.meta.env.VITE_SITE_ID,
        MENU_ID : MENU_ID,
        PAGE_ID : PAGE_ID,
        National : this.$i18n.locale,
      };

      axios
        .post(import.meta.env.VITE_UIL_API + "GetDynamicPageInfo", posData , {
        })
        .then(res => {
          if (res.data.ResultCd === "00") {
            // 서버에서 정보를 받아와서, SNS공유만 사용 (만족도 평가와 댓글여부는 사용안함)
            this.$store.commit('SetShowShareSNSBtn', Util.bStringToBool(res.data.Result[0].SNS_YN)); // App.vue에서 라우터페이지 위쪽 SNS 공유하기 설정을 위해 스토어에 저장
            this.PAGE_NM = res.data.Result[0].PAGE_NM
            this.HTML_DATA = res.data.Result[0].HTML_DATA
            this.COPYRIGHT_TYPE = res.data.Result[0].COPYRIGHT_TYPE
            this.COPYRIGHT_YN = res.data.Result[0].COPYRIGHT_YN == "Y" ? true : false,
            // console.log(this.PAGE_NM , this.COPYRIGHT_TYPE, this.COPYRIGHT_YN)
            this.$nextTick(() => {
              this.$refs.QuillEditorReadRef.refresh(this.HTML_DATA);
            })
          } else {
            this.$emit("ShowNoPage")
          }
        })
        .catch(() => {
          this.$emit("ShowNoPage")
        });
    },
  },
}
</script>

<style scoped>
</style>
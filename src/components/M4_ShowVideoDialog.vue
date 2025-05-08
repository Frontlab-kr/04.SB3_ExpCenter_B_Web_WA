<template>
  <div>
    <!-- #todo 상세화면 Vue로 따로 빼기 -->
    <v-dialog aria-modal="true" @update:modelValue="DialogClose" v-model="isShow" :width="iWidth">
      <v-card class="pa-5">
        <!-- 상단 정보 테이블 -->
        <table class="nor_table">
          <caption class="sr-only">{{caption}} 게시글 테이블</caption>
          <tbody>
            <tr>
              <th scope="row">{{ $t("all_table_header_4") }}</th>
              <td colspan="12">
                <div>{{ oShowItem.PST_TTL }}</div>
              </td>
            </tr>
            <tr>
              <th scope="row">{{ $t("all_table_header_5") }}</th>
              <td colspan="6">
                <div>{{ oShowItem.CRT_USER_ID }}</div>
              </td>
              <th scope="row">{{ $t("all_table_header_3") }}</th>
              <td colspan="6">
                <div>{{ oShowItem.INQ_CNT }}</div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- 영상
        <div class="pa-4" align="center">
          <iframe width="90%" height="300px" :src="oShowItem.cLinkURL" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen=""></iframe>
        </div> -->

        <!-- 영상 설명 -->
        <div class="pa-2">
          <div v-html="oShowItem.PST_CN"></div>
        </div>

        <!-- 이전/다음/닫기 버튼들 -->
        <!-- <div class="d-flex flex-wrap justify-end pb-1"> -->
        <div class="d-flex flex-wrap justify-end">
          <v-btn @click="PreBoard()" :disabled="bDisablePreBtn" class="ml-3 mt-4" variant="outlined" color="black"><v-icon aria-hidden="true" class="mdi-rotate-270" style="margin-right: 6px;">mdi-triangle</v-icon>{{ $t("all_btn_pre") }}</v-btn>
          <v-btn @click="NextBoard()" :disabled="bDisableNextBtn" class="ml-3 mt-4" variant="outlined" color="black"><v-icon aria-hidden="true" class="mdi-rotate-90" style="margin-right: 6px;">mdi-triangle</v-icon>{{ $t("all_btn_next") }}</v-btn>
          <v-btn @click="DialogClose()" class="ml-3 mt-4" variant="outlined" color="black"><v-icon aria-hidden="true" style="margin-right: 6px;">mdi-close</v-icon>{{ $t("all_btn_close") }}</v-btn>
        </div>

      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { EventBus } from '@/EventBus.js';

export default {
  props : ["iWidth", "bDisablePreBtn", "bDisableNextBtn", "caption"],
  data() {
    return {
      isShow : false,

      oShowItem : {
        SelectIndex : -1,
        INQ_CNT : 0,
        CRT_USER_ID : "",
        PST_TTL : "",
        PST_CN : "",
      },
      zFileInfo : [],
      iPaginationIndex : -1,
    }
  },

  computed: {
  },

  components:{
  },

  watch: {
  },

  mounted() {
  },

  methods : {
    // 겔러리형 상세화면 열기
    ShowDialog(oShowItem) {
      this.oShowItem = {...oShowItem}
      this.isShow = true;
      this.$store.state.isDialog = true;
      this.$store.state.btnDialogRef = document.activeElement;
    },

    DialogClose() {
      this.isShow = false;
      this.$store.state.isDialog = false;
      EventBus.$emit("onBackDialogBtn");
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
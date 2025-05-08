<template>
  <div>
    <div v-if="!bShowSubmission" class="title-xxlarge">{{ $t("menu_0301_예약") }}</div>

    <div v-if="!bShowSubmission" class="mt-2 pa-3">
      <h2 class="title-xlarge">체험안내</h2>
      <div class="bg-body" style="line-height: 200%;">
        보라매 안전체험관에서는 2023년 3월 1일부터 매주 월요일에 휴관하며 주말 및 공휴일에도 운영합니다.<br>
        ※ 휴관일(1월 1일, 설 및 추석 당일) 제외<br>
        자세한 프로그램 시간은 공지사항을 참고하세요.
      </div>

      <div class="bg-gap"></div>
      <h2 class="title-xlarge">이용안내</h2>

      <div class="bg-body" style="line-height: 200%;margin-bottom: 40px;">
        1. 인터넷 예약 후 취소 없이 불참하는 경우 향후 6개월 간 인터넷 예약이 제한될 수 있습니다.<br>
        2. 이수증은 체험 완료 후 19시부터 홈페이지를 통해 출력 가능합니다.
      </div>

      <div class="d-sm-none">
        <v-row>
          <v-col cols="12"><v-btn @click="ShowResDialog()" color="primary" width="100%" size="x-large">예약하기</v-btn></v-col>
          <v-col cols="12"><v-btn @click="GotoPath('res_inquiry')" width="100%" size="x-large">예약조회</v-btn></v-col>
          <v-col cols="12"><v-btn @click="GotoPath('res_certificate')" width="100%" size="x-large">이수증 발급</v-btn></v-col>
        </v-row>
      </div>
      <div class="d-none d-sm-flex center_all">
        <v-btn @click="ShowResDialog()" id="cmm-res-btn" color="primary" size="x-large">예약하기</v-btn>
        <v-btn @click="GotoPath('res_inquiry')" class="ml-3" size="x-large">예약조회</v-btn>
        <v-btn @click="GotoPath('res_certificate')" class="ml-3" size="x-large">이수증 발급</v-btn>
      </div>
    </div>

    <M4_Res @SetData="SetData" ref="M4_Res_ref"></M4_Res>

    <res_reservation_submission v-if="bShowSubmission" @ReturnMain="ReturnMain" ref="res_reservation_submission_ref"></res_reservation_submission>
  </div>
</template>


<script>
import { EventBus } from '@/EventBus.js';

import res_reservation_submission from "../res_reservation_submission.vue";

export default {
  data() {
    return {
      bShowSubmission: false,
      // bShowSubmission: true,
    };
  },

  components: {
    res_reservation_submission,
  },

  mounted() {
  },

  beforeUnmount() {
  },

  methods : {
    GotoPath(cPath) {
      EventBus.$emit("onMenu", cPath);
    },

    ReturnMain() {
      this.bShowSubmission = false
    },

    ShowResDialog() {
      // this.$refs.M4_Res_ref.Show({item : null})
      this.$refs.M4_Res_ref.Show({item : this.$store.state.oSelectedExp})
    },

    SetData(Data1, Data2) {
      this.bShowSubmission = true
      this.$nextTick(() => {
        this.$refs.res_reservation_submission_ref.ShowSubmission(Data1, Data2)
      })
    }
  },
};
</script>
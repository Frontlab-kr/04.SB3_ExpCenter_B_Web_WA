<template>
  <div>
    <div v-if="!bShowSubmission" class="title-xxlarge">{{ $t("menu_0301_예약") }}</div>

    <div v-if="!bShowSubmission" class="mt-2 pa-3">
      <h2 class="title-xlarge">Experience Information</h2>
      <div class="bg-body" style="line-height: 200%;">
        The Boraemai Safety Experience Center is closed every Monday starting from March 1, 2023, and will be open on weekends and holidays.<br>
        ※ Closed days (January 1st, Lunar New Year, and Chuseok Day) are excluded.<br>
        For detailed program times, please refer to the announcements.
      </div>

      <div class="bg-gap"></div>
      <h2 class="title-xlarge">Usage Information</h2>

      <div class="bg-body" style="line-height: 200%;margin-bottom: 40px;">
        1. If you do not attend after making an internet reservation without cancellation, your internet reservation may be restricted for the next 6 months.<br>
        2. Completion certificates can be printed from the website starting at 7 PM after the experience is completed.
      </div>

      <div class="d-sm-none">
        <v-row>
          <v-col cols="12"><v-btn @click="ShowResDialog()" color="primary" width="100%" size="x-large" >Make a Reservation</v-btn></v-col>
          <v-col cols="12"><v-btn @click="GotoPath('res_inquiry')" width="100%" size="x-large">Reservation Inquiry</v-btn></v-col>
          <v-col cols="12"><v-btn @click="GotoPath('res_certificate')" width="100%" size="x-large">Issue Completion Certificate</v-btn></v-col>
        </v-row>
      </div>
      <div class="d-none d-sm-flex center_all">
        <v-btn @click="ShowResDialog()" color="primary" size="x-large">Make a Reservation</v-btn>
        <v-btn @click="GotoPath('res_inquiry')" class="ml-3" size="x-large">Reservation Inquiry</v-btn>
        <v-btn @click="GotoPath('res_certificate')" class="ml-3" size="x-large">Issue Completion Certificate</v-btn>
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
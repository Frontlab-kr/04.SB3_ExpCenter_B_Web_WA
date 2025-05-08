<template>
  <div class="bg-white-nopadding">
    <v-divider :aria-hidden="true"></v-divider>
  </div>

  <div class="bg-grey-10-nogap" style="width: 100%; overflow: hidden">
    <div class="v-container pa-3">
      <div class="d-flex flex-wrap align-top">
        <img
          id="footer_with"
          class="mt-5 mr-6"
          src="/seoul_2_logo.svg"
          alt="동행매력 특별시서울"
          width="123"
          height="54"
        />

        <div class="mt-5">
          <div class="d-flex flex-wrap">
            <v-btn
              @click="
                onfooter_gotourl(
                  firemainSiteUrl + '/guide_personal_info_process_policy'
                )
              "
              variant="plain"
              density="compact"
              class="body-text-color body-medium font-nor links-small pa-0 mr-4"
              >{{ $t("footer_info_1")
              }}<span class="cmm-blind-text">
                {{ $t("common_blank") }}</span
              ></v-btn
            >
            <v-btn
              @click="
                onfooter_gotourl(
                  firemainSiteUrl + '/guide_cctv_operation_policy'
                )
              "
              variant="plain"
              density="compact"
              class="body-text-color body-medium font-nor links-small pa-0 mr-4"
              >{{ $t("footer_info_2")
              }}<span class="cmm-blind-text">
                {{ $t("common_blank") }}</span
              ></v-btn
            >
            <!-- <v-btn @click="onfooter_term('')" variant="plain" density="compact" class=" body-text-color body-medium font-nor links-small pa-0 mr-4" aria-label="사이트맵 이동">{{ $t("footer_info_3") }}</v-btn> -->
          </div>
          <v-divider :aria-hidden="true" class="mt-3 mb-2"></v-divider>
          <div class="body-medium">{{ $store.state.cADDR }}</div>
          <div class="mt-1 font-bold body-medium">
            ☎ ({{ $t("footer_info_4") }}) {{ $store.state.cDayTelInfo }}
          </div>

          <v-divider :aria-hidden="true" class="mt-3"></v-divider>

          <div class="mt-3 detail-text-color body-small mb-3">
            COPYRIGHTⓒ {{ new Date().getFullYear() }}
            {{ $t("footer_info_5") }} ALL RIGHTS RESERVED.
          </div>
        </div>
        <v-spacer></v-spacer>

        <!-- <img id="footer_wa_mark" src="@/assets/icon/wa-mark.png" alt="" height="38" class="mr-2"> -->
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from "@/EventBus.js";

export default {
  data: () => ({
    firemainSiteUrl: import.meta.env.VITE_FIREMAIN_SITE_URL,
  }),

  mounted() {},

  methods: {
    onfooter_term(path) {
      EventBus.$emit("onGoto", path);
    },
    onfooter_gotourl(path) {
      window.open(path, "_blank");
    },
  },
};
</script>

<style scoped>
.link_box {
  height: 50px;
  width: 25%;
  line-height: 1;
  border-left: 0.5px var(--gray-20) solid !important;
}

.responsive-flex {
  display: flex;
}

@media (max-width: 600px) {
  .responsive-flex {
    flex-wrap: wrap; /* 600px 이하일 때 flex-wrap 적용 */
  }
}
</style>

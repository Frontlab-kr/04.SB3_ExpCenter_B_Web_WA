<template>
  <div>
    <!-- <M4_Reservation_Agree :b14Age="false" v-if="bAgree" class="mb-2" @onSuccessAuth="onSuccessAuth"></M4_Reservation_Agree> -->
    <component :b14Age="false" v-if="bAgree" class="mb-2" @onSuccessAuth="onSuccessAuth" :is="local_site_component"/>
    <DataList v-if="bDataList" ref="DataList_ref"></DataList>
  </div>
</template>


<script>
import { defineAsyncComponent, markRaw } from 'vue';

import DataList from "./DataList/res_certificate_DataList.vue"

export default {
  data() {
    return {
      local_site_component : null,
      bAgree : true,
      bDataList : false,
    };
  },

  components:{
    DataList,
  },

  mounted() {
    this.loadDynamicComponent();
  },

  beforeUnmount() {
  },

  methods : {
    async loadDynamicComponent() {
      try {
        const component = defineAsyncComponent(() =>
          import(`../views/${this.$i18n.locale}/M4_Reservation_Agree.vue`)
        );
        this.local_site_component = markRaw(component); // 컴포넌트를 반응형 추적에서 제외
      } catch (error) {
        console.error("컴포넌트를 로드하는 중 에러가 발생했습니다:", error);
      }
    },

    onSuccessAuth(oAgreeDocment, oAuthInfo) {
      this.bAgree = false
      this.bDataList = true

      this.$nextTick(() => {
        this.$refs.DataList_ref.ShowDispalyList(oAuthInfo)
      })
    },

  },
};
</script>
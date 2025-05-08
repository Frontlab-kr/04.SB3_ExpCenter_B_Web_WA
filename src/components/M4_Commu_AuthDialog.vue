<template>
  <div>
    <v-dialog aria-modal="true" @update:modelValue="CloseDialog" v-model="bAgreeDialog" style="max-width: 500px;">
      <v-card class="pa-4">
        <div class="d-flex mb-2">
          <h1 class="title-xlarge">약관동의 및 본인인증</h1>
          <v-spacer></v-spacer>
          <v-btn class="mt-n2 mr-n4" variant="plain" @click="CloseDialog" title="닫기">
            <v-icon aria-hidden="true" size="30">mdi-close</v-icon>
          </v-btn>
        </div>
        <!-- <M4_Reservation_Agree :b14Age="false" class="mb-2" @onSuccessAuth="onSuccessAuth"></M4_Reservation_Agree> -->
        <component :b14Age="false" class="mb-2 mt-5" @onSuccessAuth="onSuccessAuth" :is="local_site_component"/>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { defineAsyncComponent, markRaw } from 'vue';
import { EventBus } from '@/EventBus.js';

export default {
  data() {
    return {
      local_site_component: null,
      bAgreeDialog : false,
      cCase : -1,
    }
  },

  components:{
  },

  created() {
    this.loadDynamicComponent();
  },


  methods: {
    async loadDynamicComponent() {
      try {
        const component = defineAsyncComponent(() =>
          import(`../views/${this.$i18n.locale}/M4_Commu_Agree.vue`)
        );
        this.local_site_component = markRaw(component); // 컴포넌트를 반응형 추적에서 제외
      } catch (error) {
        console.error("컴포넌트를 로드하는 중 에러가 발생했습니다:", error);
      }
    },

    ShowDialog(cCase) {
      this.bAgreeDialog = true;
      this.$store.state.isDialog = true;
      this.$store.state.btnDialogRef = document.activeElement;

      this.cCase = cCase;
    },

    CloseDialog() {
      this.bAgreeDialog = false;      
      this.$store.state.isDialog = false;
      EventBus.$emit("onBackDialogBtn");    
    },

    onSuccessAuth(oAgreeDocment, oAuthInfo) {
      this.$emit("EndAuth", this.cCase, oAuthInfo)
    },
  }
}
</script>
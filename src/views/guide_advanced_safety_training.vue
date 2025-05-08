<template>
  <div>
    <h1 class="title-xxlarge">{{ $t("menu_020302_소방시설교육") }}</h1>

    <guide_image_display :zImgInfo="zImgInfo"></guide_image_display>
  </div>
</template>

<script>
import guide_image_display from "./guide_image_display.vue";

export default {
  data() {
    return {
      zImgInfo : [
        {cPath : "/boramae/guide/safetraining/소방시설교육_1.jpg", cTitle : "소방시설교육_1", alt:"소방 시설 교육 공간으로, 스프링클러와 소방 밸브 시스템을 포함한 다양한 소방 설비가 설치되어 있으며, 실제 작동 원리와 사용법을 학습할 수 있도록 설계된 공간입니다"},
        {cPath : "/boramae/guide/safetraining/소방시설교육_2.jpg", cTitle : "소방시설교육_2", alt:"소방 시설 교육 공간으로, 가압 송수장치 및 소방 펌프 시스템이 설치되어 있어 설비의 구조와 작동 원리를 학습할 수 있도록 구성된 공간입니다."},
        {cPath : "/boramae/guide/safetraining/소방시설교육_3.jpg", cTitle : "소방시설교육_3", alt:"소방 시설 교육 공간으로, 화재 경보 수신기와 비상 전원 장치 및 다양한 경보 장비가 설치되어 있어 화재 경보 시스템의 작동 원리와 구조를 학습할 수 있는 환경입니다"},
      ]
    };
  },

  components:{
    guide_image_display
  },

  mounted() {
  },

  beforeUnmount() {
  },

  methods : {
  },
};
</script>
<template>
  <div>
    <h1 class="title-xxlarge">{{ $t("menu_020204_교통사고체험") }}</h1>

    <guide_image_display :zImgInfo="zImgInfo"></guide_image_display>
  </div>
</template>

<script>
import guide_image_display from "./guide_image_display.vue";

export default {
  data() {
    return {
      zImgInfo : [
        {cPath : "/boramae/guide/traffic/교통사고체험_1.jpg", cTitle : "교통사고체험_1", alt:"교통사고 체험 공간으로, 교통사고 예방과 대처 방법을 배우기 위한 전시물이 설치되어 있으며, 횡단보도와 도로 표지 등을 통해 실제 상황을 재현한 교육 공간입니다."},
        {cPath : "/boramae/guide/traffic/교통사고체험_2.jpg", cTitle : "교통사고체험_2", alt:"교통사고 체험 공간으로, 횡단보도와 신호등, 약국 등 실제 도로 환경을 재현하여 교통사고 예방 교육을 위한 체험형 학습을 제공하는 공간입니다."},
        {cPath : "/boramae/guide/traffic/교통사고체험_3.jpg", cTitle : "교통사고체험_3", alt:"교통사고 체험 공간으로, 지하철 내부를 재현하여 승객 안전 및 사고 예방 교육을 위한 환경을 제공하는 체험형 학습 공간입니다."},
        {cPath : "/boramae/guide/traffic/교통사고체험_4.jpg", cTitle : "교통사고체험_4", alt:"교통사고 체험 공간으로, 디지털 디스플레이를 활용해 교통사고 시뮬레이션과 사고 예방 교육을 제공하는 인터랙티브 학습 환경입니다."},
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
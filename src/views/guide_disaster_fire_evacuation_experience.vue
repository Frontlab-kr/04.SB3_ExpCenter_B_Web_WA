<template>
  <div>
    <h1 class="title-xxlarge">{{ $t("menu_020203_화재대피체험") }}</h1>

    <guide_image_display :zImgInfo="zImgInfo"></guide_image_display>
  </div>
</template>

<script>
import guide_image_display from "./guide_image_display.vue";

export default {
  data() {
    return {
      zImgInfo : [
        {cPath : "/boramae/guide/evacuation/화재대피체험_1.jpg", cTitle : "화재대피체험_1", alt:"화재 대피 체험 공간으로, 소방 장비와 화재 안전 관련 정보를 제공하는 패널이 전시되어 있으며, 관람객이 앉아 교육을 받을 수 있는 좌석이 마련되어 있습니다"},
        {cPath : "/boramae/guide/evacuation/화재대피체험_2.jpg", cTitle : "화재대피체험_2", alt:"화재 대피 체험 공간으로, 실제 상황을 재현한 화면 앞에 교육용 소화기가 배치되어 있어 화재 진압 방법을 실습할 수 있도록 설계된 공간입니다"},
        {cPath : "/boramae/guide/evacuation/화재대피체험_3.jpg", cTitle : "화재대피체험_3", alt:"화재 대피 체험 공간으로, 실내 대피 환경을 재현하여 화재 발생 시 안전하게 대피하는 방법을 배우도록 설계된 공간입니다."},
        {cPath : "/boramae/guide/evacuation/화재대피체험_4.jpg", cTitle : "화재대피체험_4", alt:"화재 대피 체험 공간으로, 건물 내부 구조와 계단이 재현되어 있으며, 대피 시뮬레이션을 위한 장비가 배치되어 있습니다"},
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
<template>
  <div>
    <h1 class="title-xxlarge">{{ $t("menu_020303_전문응급처치") }}</h1>

    <guide_image_display :zImgInfo="zImgInfo"></guide_image_display>
  </div>
</template>

<script>
import guide_image_display from "./guide_image_display.vue";

export default {
  data() {
    return {
      zImgInfo : [
        {cPath : "/boramae/guide/advanced_first_aid/전문응급처치_1.jpeg", cTitle : "전문응급처치_1", alt:"전문 응급처치 교육 중 하임리히법을 실습하는 모습으로, 참가자들이 응급상황에서의 대응 방법을 직접 체험하며 배우는 환경입니다."},
        {cPath : "/boramae/guide/advanced_first_aid/전문응급처치_2.jpg", cTitle : "전문응급처치_2", alt:"전문 응급처치 교육 공간으로, 심폐소생술(CPR) 실습을 위한 마네킹과 교육 자료가 준비되어 있으며, 참가자들이 응급 상황 대처 능력을 배울 수 있도록 구성된 환경입니다."},
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
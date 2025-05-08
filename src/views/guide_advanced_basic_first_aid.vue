<template>
  <div>
    <h1 class="title-xxlarge">{{ $t("menu_020301_일반응급처치") }}</h1>

    <guide_image_display :zImgInfo="zImgInfo"></guide_image_display>
  </div>
</template>

<script>
import guide_image_display from "./guide_image_display.vue";

export default {
  data() {
    return {
      zImgInfo : [
        {cPath : "/boramae/guide/first_aid/일반응급처치_1.jpg", cTitle : "일반응급처치_1", alt:"응급처치 교육 공간으로, 여러 마네킹과 심폐소생술(CPR) 교육 장비가 배치되어 있으며, 교육 자료가 벽면에 표시되어 있습니다"},
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
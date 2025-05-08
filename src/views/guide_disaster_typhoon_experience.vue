<template>
  <div>
    <h1 class="title-xxlarge">{{ $t("menu_020202_태풍체험") }}</h1>

    <guide_image_display :zImgInfo="zImgInfo"></guide_image_display>
  </div>
</template>

<script>
import guide_image_display from "./guide_image_display.vue";

export default {
  data() {
    return {
      zImgInfo : [
        {cPath : "/boramae/guide/typhoon/태풍체험_1.jpg", cTitle : "태풍체험_1", alt:"태풍 체험 공간으로, 태풍의 발생 과정과 피해를 설명하는 패널과 관련 안전 장비가 전시되어 있습니다"},
        {cPath : "/boramae/guide/typhoon/태풍체험_2.jpg", cTitle : "태풍체험_2", alt:"재난 체험 공간으로, 파손된 차량과 전선, 잔해물 등 자연재해로 인한 피해 상황을 실감 나게 재현한 전시물입니다"},
        {cPath : "/boramae/guide/typhoon/태풍체험_3.jpg", cTitle : "태풍체험_3", alt:"강풍 체험 구역으로, 벽면에 바람의 세기에 따른 나무와 주변 환경의 변화를 시각적으로 보여주는 그래픽이 설치되어 있습니다."},
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
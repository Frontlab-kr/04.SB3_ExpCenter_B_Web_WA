<template>
  <div>
    <!-- 어린이 안전체험 홈페이지로 변경 -->
    <h1 class="title-xxlarge">{{ $t("menu_0204_어린이안전체험") }}</h1>

    <guide_image_display :zImgInfo="zImgInfo"></guide_image_display>
  </div>
</template>

<script>
import guide_image_display from "./guide_image_display.vue";

export default {
  data() {
    return {
      zImgInfo : [
        {cPath : "/boramae/guide/children/어린이안전체험_1.jpg", cTitle : "어린이안전체험_1", alt:"어린이 안전 체험 공간으로, 인형극을 통해 어린이들이 안전 지식과 대처 방법을 쉽고 재미있게 배울 수 있도록 구성된 교육 환경입니다."},
        {cPath : "/boramae/guide/children/어린이안전체험_2.jpg", cTitle : "어린이안전체험_2", alt:"어린이 안전 체험 공간으로, 가정 환경을 재현하여 어린이들이 생활 속에서 발생할 수 있는 안전 사고를 예방하고 대처하는 방법을 배우도록 설계된 교육 공간입니다."},
        {cPath : "/boramae/guide/children/어린이안전체험_3.jpg", cTitle : "어린이안전체험_3", alt:"어린이 안전 체험 공간으로, 아이들이 놀이와 함께 안전 교육을 받을 수 있는 환경이 조성되어 있으며, 교사와 함께 즐거운 체험 활동을 진행하는 모습입니다"},
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
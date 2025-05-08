<template>
  <div>
    <h1 class="title-xxlarge">{{ $t("menu_020501_4D재난영화") }}</h1>

    <guide_image_display :zImgInfo="zImgInfo"></guide_image_display>
  </div>
</template>

<script>
import guide_image_display from "./guide_image_display.vue";

export default {
  data() {
    return {
      zImgInfo : [
        {cPath : "/boramae/guide/4D/4D재난영화_1.jpg", cTitle : "4D재난영화_1", alt:"4D 재난 영화 상영관으로, 움직이는 의자와 특수 효과를 통해 관객들이 실감 나는 재난 상황을 체험할 수 있도록 설계된 공간입니다."},
        {cPath : "/boramae/guide/4D/4D재난영화_2.jpg", cTitle : "4D재난영화_2", alt:"4D 재난 영화 관람 안내 포스터로, 관람 시간이 11:40, 14:40, 16:40로 명시되어 있으며, 초등학생 이상 관람 가능하며 자율 체험객 입장이 가능합니다."},
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
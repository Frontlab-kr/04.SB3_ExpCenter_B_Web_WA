<template>
  <div>
    <h1 class="title-xxlarge">{{ $t("menu_020502_소방역사박물관") }}</h1>

    <guide_image_display :zImgInfo="zImgInfo"></guide_image_display>
  </div>
</template>

<script>
import guide_image_display from "./guide_image_display.vue";

export default {
  data() {
    return {
      zImgInfo : [
        {cPath : "/boramae/guide/museum/소방역사박물관_1.jpg", cTitle : "소방역사박물관_1", alt:"소방 역사 박물관으로, 옛날 소방 장비와 소방관 복장이 전시되어 있으며, 대한민국 소방의 역사를 보여주는 패널이 마련된 공간입니다"},
        {cPath : "/boramae/guide/museum/소방역사박물관_2.jpg", cTitle : "소방역사박물관_2", alt:"소방 역사 박물관으로, 전통 소방 장비와 구조물을 전시하여 과거의 소방 기술과 활동을 보여주는 공간입니다. 조선시대의 소방 관련 유물과 장비가 전시되어 있어 소방 역사를 배울 수 있습니다"},
        {cPath : "/boramae/guide/museum/소방역사박물관_3.jpg", cTitle : "소방역사박물관_3", alt:"소방 역사 박물관의 전시관으로, 다양한 소방 복장과 장비들이 전시되어 있습니다. 시대별 소방관의 역할과 활동을 보여주는 자료와 함께 소방 역사의 변화를 체험할 수 있는 공간입니다"},
        {cPath : "/boramae/guide/museum/소방역사박물관_4.jpg", cTitle : "소방역사박물관_4", alt:"소방 역사 박물관의 전시관으로, 과거의 다양한 화재 사건과 그 대응 과정을 설명하는 영상과 자료들이 전시되어 있습니다. 소방관들의 헌신과 노고를 기리는 내용을 통해 소방의 역사와 중요성을 느낄 수 있는 공간입니다"},
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
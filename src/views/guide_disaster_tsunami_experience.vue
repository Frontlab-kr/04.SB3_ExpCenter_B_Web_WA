<template>
  <div>
    <h1 class="title-xxlarge">{{ $t("menu_020201_지진체험") }}</h1>

    <guide_image_display :zImgInfo="zImgInfo"></guide_image_display>
  </div>
</template>

<script>
import guide_image_display from "./guide_image_display.vue";

export default {
  data() {
    return {
      zImgInfo : [
        {cPath : "/boramae/guide/tsunami/지진체험_1.jpg", cTitle : "지진체험_1", alt:"지진 체험관 내부 사진으로, 지진에 대한 정보와 원인을 설명하는 벽면 패널, 시뮬레이션 모형이 배치된 전시 공간이 보입니다. 벽면에는 지진의 원인과 지구 구조에 대한 시각 자료가 있으며, 오른쪽에는 안전 교육과 관련된 시설물이 있습니다"},
        {cPath : "/boramae/guide/tsunami/지진체험_2.jpg", cTitle : "지진체험_2", alt:"지진 체험관 내부의 재난 시뮬레이션 공간으로, 차량과 건물이 파손된 모습을 재현하여 지진의 영향을 시각적으로 보여줍니다. 주변에 쓰러진 구조물과 금이 간 벽면이 보입니다"},
        {cPath : "/boramae/guide/tsunami/지진체험_3.jpg", cTitle : "지진체험_3", alt:"지진 체험관의 복도 모습으로, 벽과 천장이 균열되고 손상된 흔적이 있어 지진 피해를 실감 나게 표현하고 있습니다."},
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
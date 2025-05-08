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
        {cPath : "/boramae/guide/tsunami/지진체험1.jpg", cTitle : "지진체험1"},
        {cPath : "/boramae/guide/tsunami/지진체험2.jpg", cTitle : "지진체험2"},
        {cPath : "/boramae/guide/tsunami/지진체험3.jpg", cTitle : "지진체험3"},
        {cPath : "/boramae/guide/tsunami/지진체험4.jpg", cTitle : "지진체험4"},
        {cPath : "/boramae/guide/tsunami/지진체험5.jpg", cTitle : "지진체험5"},
      ]
    };
  },

  computed: {
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
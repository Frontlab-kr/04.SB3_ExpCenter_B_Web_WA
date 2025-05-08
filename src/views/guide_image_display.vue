<template>
  <div>
    <!-- <div class="body-medium">{{ oImgInfo.cTitle }}</div> -->
    <v-card class="d-flex align-center pa-4 mt-4">
      <!-- <v-btn icon @click="PreviousImg()" title="이전" style="margin-right: 10px;"> <v-icon aria-hidden="true" size="40" >mdi-chevron-left</v-icon></v-btn> -->
      <v-img :src="oImgInfo.cPath" :height="iImgHeight" :alt="oImgInfo.alt"></v-img>
      <!-- <v-btn icon @click="NextImg()"  title="다음" style="margin-left: 10px;"> <v-icon aria-hidden="true" size="40" >mdi-chevron-right</v-icon></v-btn> -->
      
    </v-card>
  </div>
</template>


<script>
export default {
  props: ['zImgInfo'],
  data() {
    return {
      iNowIndex : 0,
    };
  },

  components:{
  },

  computed: {
    oImgInfo() {
      return this.zImgInfo[this.iNowIndex]
    },
    iImgHeight() {
      if (this.$vuetify.display.md) {
        return 500
      } else if (this.$vuetify.display.sm) {
        return 400
      } else if (this.$vuetify.display.xs) {
        return 250
      } else {
        return 600
      }
    },
    iMaxCnt() {
      return this.zImgInfo.length - 1
    }
  },

  mounted() {
  },

  beforeUnmount() {
  },

  methods : {
    PreviousImg() {
      if (this.iNowIndex == 0) {
        this.iNowIndex = this.iMaxCnt
      } else {
        this.iNowIndex -= 1
      }
    },

    NextImg() {
      if (this.iNowIndex == this.iMaxCnt) {
        this.iNowIndex = 0
      } else {
        this.iNowIndex += 1
      }
    },
  },
};
</script>
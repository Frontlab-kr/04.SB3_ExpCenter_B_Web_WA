<template>
  <div>
    <h1 class="title-xxlarge">
      {{ sNoShowMsg }}
    </h1>
  </div>
</template>

<script>

export default {
  data() {
    return {
    };
  },
  computed: {
    sNoShowMsg() {
      if (this.$i18n.locale == "ko") {
        return "페이지를 찾을 수 없습니다"
      } else {
        return "Cann't find Page"
      }
    }
  },

  components:{
  },

  mounted() {
  },

  beforeUnmount(){
  },

  methods : {
  },
};
</script>

<style scoped>
</style>
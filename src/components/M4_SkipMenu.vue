<template>
    <div class="cmm-skip-menu" id="cmm-skip-menu">
      <a href="#cmm-gnb" id="cmm-skip-menu-focus"><span>주메뉴 바로가기</span></a>
      <a href="#cmm-content"><span>본문 바로가기</span></a>
    </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },

  components:{
  },

  mounted() {
  },

  beforeUnmount(){
  },

  methods : {
    pageReload(data){
      // var activeBtn = document.activeElement;
      // var targetBtn = document.getElementById('cmm-skip-menu');
      //   activeBtn.blur();

      // setTimeout(() => {
      //   this.$refs.skipLink.targetBtn.focus();
      // }, 1500);
      // alert();
    },
  },
};
</script>

<style >
  .cmm-skip-menu{position:fixed;left:0;top:0;width:100%;z-index:999;}
  .cmm-skip-menu a{display:block;font-size:0;background:#3bbcd9;}
  .cmm-skip-menu a:focus span{display:block;padding:30px;color:#fff;font-size:24px;text-align:center;}
</style>
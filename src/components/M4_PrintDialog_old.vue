<template>
  <div></div>
    <!-- <v-dialog aria-modal="true" @update:modelValue="DialogClose" v-model="bShowPrint" fullscreen>
      <div id="print_element" style="width: 100%;height: 100%;background-color: red;">
        테스트 1
      </div>
  </v-dialog> -->
</template>

<script>

export default {
  data() {
    return {
      // bShowPrint : false,
    }
  },

  methods: {
    onAfterPrint() {
      // this.bShowPrint = false
    },

    PrintSubmission() {
      // alert("기능 개발 중")
      // this.bShowPrint = true

      // window.onafterprint = this.onAfterPrint

      // console.log(data);

      // setTimeout(() => {
      //   window.print();
      // }, 100);
    },
  }
}
</script>
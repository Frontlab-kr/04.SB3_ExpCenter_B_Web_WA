<template>
  <div>
    <h1 class="title-xxlarge" style="position: relative;z-index: 10;background-color: white;">Departmental Responsibilities Guide</h1>
    <iframe class="mt-n10" style="border: 0px; width: 100%; height: 800px; position: relative;z-index: 9;" title="부서별업무안내" :src=SeoulOrgURL></iframe>
  </div>
</template>

<script>  
export default {
  computed: {
    SeoulOrgURL() {
      return `https://org.seoul.go.kr/nsearch/orgChart2.do?DEPT_CODE=6114319`;
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



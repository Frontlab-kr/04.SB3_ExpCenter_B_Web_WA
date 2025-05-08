<template>
  <div>
    <div id="froala-reader" class="fr-view" style="padding: 20px"></div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      editorReader : null,
    }
  },

  mounted() {
    let oInterval = setInterval(() => {
      this.editorReader = document.getElementById("froala-reader")

      if (this.editorReader) {
        clearInterval(oInterval);
        return;
      }
    }, 100);
  },

  beforeUnmount() {
  },

  methods: {
    refresh(content) {
      let oInterval = setInterval(() => {
        if (this.editorReader) {
          this.editorReader.innerHTML = content
          clearInterval(oInterval);
          return;
        }
      }, 100);
    }
  }
}
</script>
<template>
  <div>
    <v-snackbar v-model="snackbar" :color="color" :timeout="timeout"> {{ text }}
      <template v-slot:actions>
        <v-btn @click="snackbar = false" color="white" icon size="35" title="닫기"><v-icon aria-hidden="true">mdi-close</v-icon></v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      snackbar : false,
      color : "",
      text : "",
      timeout: 2000,
    }
  },

  methods: {
    ShowMsg: function(data) {
      this.color = data.cColor
      this.text = data.sMsg.toString(); 
      this.timeout = data.iTimeOut

      this.snackbar = true;
    },
  }
}
</script>
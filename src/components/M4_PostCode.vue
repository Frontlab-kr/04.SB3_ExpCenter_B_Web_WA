<template>
  <div class="search-field" style="width:100%">            
    <label class="m4_input-label">{{label}}</label>        
    <div style="font-size: 16px; border-radius: 4px; border: 1px solid #a0a0a0; padding: 8px 16px;">
      <div v-if="selectedValue == ''" style="color:#808080">
        {{placeholder }}
      </div>
      <div v-else>
        {{selectedValue}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "M4_Input",
  props: {
    modelValue: {
      type: String,
      default: "",
    },    
    label: {
      type: String,
      default: "",
    },    
    placeholder: {
      type: String,
      default: "",
    },    
  },
  data() {
    return {
      selectedValue: this.modelValue,
      uniqueLabelId: `label-${Math.random().toString(36)}`,
    };
  },
  watch: {
    modelValue(newVal) {
      this.selectedValue = newVal;
    },
  },
  methods: {
  },
};
</script>

<style scoped>

.search-field {
  display: flex;
  flex-direction: column;
}

</style>
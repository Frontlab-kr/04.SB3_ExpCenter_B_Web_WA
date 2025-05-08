<template>
  <div class="search-field">    
    <label :for="uniqueLabelId"  class="m4_input-label">{{label}}</label>    

    <v-textarea
      :id="uniqueLabelId"
      :aria-label="label"          
      :placeholder="placeholder"
      v-model="selectedValue"
      density="compact"            
      variant="outlined"            
      :rows="rows"
      :color="color"   
      :readonly="readonly"
      :clearable="clearable"
      :scroll="scroll"
      :no-resize="noResize"
      persistent-placeholder
      class="mb-2" hide-details
      @change="$emit('update:model-value', $event.target.value)"
      @keyup.enter="$emit('keyup-enter')"
      @click:clear="$emit('click:clear');">     
      <template v-slot:append-inner v-if="icon != ''">
        <v-icon  aria-hidden="true"  @click="AppedInnterClick">{{icon}}</v-icon>
      </template>      
    </v-textarea>
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
      default: "Search",
    },
    color: {
      type: String,
      default: "primary",
    },
    placeholder: {
      type: String,
      default: "",  
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    // "no-resize": {
    //   type: Boolean,
    //   default: false,
    // },
    noResize: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    rows: {
      type: String,
      default: "2",
    },
    scroll: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String,
      default: "outlined",
    },
    icon: {
      type: String,
      default: "",
    },    
  },
  data() {
    return {
      isFocus : false,
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
    AppedInnterClick(){
      this.$emit('update:model-value', this.selectedValue);
      this.$emit('click:append-inner');
    },
  },
};
</script>


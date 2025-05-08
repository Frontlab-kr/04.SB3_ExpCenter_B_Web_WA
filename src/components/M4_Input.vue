<template>
  <div style="width: 100%; display: flex; align-items: center;">  
    <div style="flex: 1; display: flex; flex-direction: column;">
      <label :for="uniqueLabelId" class="m4_input-label">{{ label }}</label>
      <v-text-field
        :id="uniqueLabelId"
        :aria-label="label"
        :placeholder="placeholder"
        v-model="selectedValue"
        density="compact"
        variant="outlined"
        :readonly="readonly"
        :color="color"
        :clearable="clearable"
        :type="type"
        persistent-placeholder
        class="mb-2 custom-opacity"
        hide-details
        @change="$emit('update:model-value', $event.target.value)"
        @input="$emit('update:modelValue', $event.target.value)"
        @keyup.enter="$emit('keyup-enter')"
        @focus="$emit('focus')"
        @click:clear="$emit('click:clear')">
      </v-text-field>
    </div>        
    <button v-if="icon != ''" style="display: flex; justify-content: flex-end; margin-left:10px; margin-top: 13px;" :title="iconTitle" @click="AppedInnterClick">
      <v-icon aria-hidden="true">{{ icon }}</v-icon>      
    </button>
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
    iconTitle: {
      type: String,
      default: "검색",
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
    clearable: {
      type: Boolean,
      default: false,
    },
    // "hide-spin-buttons": {
    //   type: Boolean,
    //   default: false,
    // },
    icon: {
      type: String,
      default: "",
    },
    variant: {
      type: String,
      default: "outlined",
    },
    color: {
      type: String,
      default: "primary",
    },
    type: {
      type: String,
      default: "text",
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

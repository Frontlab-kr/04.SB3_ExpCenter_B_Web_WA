<template>
  <div>
    <div class="diM4_Select-label">
      <label v-if="label" :for="id" class="m4_select-label" :id="labelId">{{ label }}</label>      
    </div>
    <select
      
      v-model="selectedValue"
      :id="id"
      :disabled="readonly"
      class="custom-select"
      :aria-labelledby="label ? labelId : null"
      :aria-required="checkLabelReq()"
      :aria-disabled="readonly"      
      @change="updateModelValue($event.target.value)"
    >
      <option v-for="item in items" :key="item[itemValue]" :value="item[itemValue]">
        {{ item[itemTitle] }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'M4_Select',
  props: {
    modelValue: {
      type: [String, Number, Object],
      default: null,
    },
    items: {
      type: Array,
      required: true,
    },
    itemValue: {
      type: String,
      default: 'value',
    },
    itemTitle: {
      type: String,
      default: 'title',
    },
    label: {
      type: String,
      default: '',
    },
    readonly: {
      type: Boolean,
      default: false,
    },

    id: {
      type: String,
      default: () => `select-${Math.random().toString(36).substr(2, 9)}`,
    },
  },
  data() {
    return {
      selectedValue: this.modelValue,
    };
  },
  computed: {
    labelId() {
      return `${this.id}-label`;
    },
  },
  watch: {
    modelValue(newVal) {
      this.selectedValue = newVal;
    },
  },
  methods: {
    updateModelValue(value) {
      this.$emit('update:model-value', value);
    },

    checkLabelReq() {
      const regex = /\(\*\)/;
      return regex.test(this.label);
    },
  },
};
</script>

<style scoped>
.custom-select {
  width: 100%;
  padding: 0.5rem 1rem;  
  font-size: 1rem;
  border: 1px solid #ABABAB;
  border-radius: 4px;
  background: #fff;
  appearance: none;
  cursor: pointer;  
  background: url("/contents/select_btn.svg") no-repeat calc(100% - 10px) center; /* 화살표 추가 */
  margin-top: 22px;
}


.custom-select:disabled {
  background: #f5f5f5;
  cursor: not-allowed;
}

option:hover {
  background: #f0f0f0;
}

option:checked {
  background: #007BFF;
  color: #fff;
}

.diM4_Select-label {
  position: relative;
  left : 14px;
  top : 10px;
  height: 0px;  
}
</style>

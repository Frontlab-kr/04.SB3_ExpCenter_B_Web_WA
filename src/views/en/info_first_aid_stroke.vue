<template>
  <div>
    <h1 class="title-xxlarge">{{ $t('menu_dept_2_040506') }}</h1>
    <div role="tablist" class="d-flex flex-wrap tab_back" style="width: 100%; overflow-x: hidden;">
      <div v-for="(item, i) in zTab" :key="i" :class="(item.value == tab?'sel_box_btn':'nor_box_btn') + ' center_all'" :title="(item.value == tab?'선택됨':'')"
        role="tab" tabindex="0" style="cursor: pointer;" @click="goTab(item)" @keydown.enter="goTab(item)"
        :aria-label="item.name + ' ' + (item.value == tab?`선택됨`:'')"
        @keydown.left="moveTab(i, -1)" @keydown.right="moveTab(i, 1)">
        {{item.name}}
      </div>
    </div>

    <div class="bg-gap-2"></div>
    <div v-if="tab == 0">
      <div class="bg-body">
        <ul>
          <li>Weakness (feeling of weakness), sensory loss, or paralysis on one side of the body (face, arm, leg)</li>
          <li>Decreased vision or blurred vision, especially in one eye</li>
          <li>Speech impairment or decreased ability to understand</li>
          <li>Dizziness or difficulty with balance</li>
          <li>Severe headache with no known cause</li>
          <li>One eye turning</li>
        </ul>
      </div>
    </div>

    <div v-if="tab == 1">
      <div class="bg-body">
        <ul>
          <li>Do not delay; call an ambulance or transport to the hospital. If the cause is a blood clot, administering clot-busting medication is crucial, and treatment should be within 3 hours of onset.</li>
          <li>Be cautious about maintaining the airway as muscle paralysis or vomiting could obstruct it.</li>
          <li>Lay the patient down with their back and shoulders slightly elevated to reduce brain pressure.</li>
          <li>Do not give food or drink to an unconscious or semi-conscious patient as swallowing ability may be impaired, risking choking.</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab : 0,
      zTab : [
        {value : 0, name : "Overview"},
        {value : 1, name : "Emergency Response"},
      ],
    }
  },

  components:{
  },

  mounted() {
  },

  beforeUnmount(){
  },

  methods : {
    moveTab(currentIndex, direction) {
      let newIndex = currentIndex + direction;
      if (newIndex < 0) {
        newIndex = this.zTab.length - 1; // 처음에서 왼쪽 누르면 마지막으로 이동
      } else if (newIndex >= this.zTab.length) {
        newIndex = 0; // 마지막에서 오른쪽 누르면 처음으로 이동
      }

      const newTab = this.zTab[newIndex];
      this.goTab(newTab);

      // 이동한 탭에 focus 적용
      this.$nextTick(() => {
        this.$el.querySelectorAll("[role='tab']")[newIndex].focus();
      });
    },
    goTab(data) {
      // Web에서 하드코딩된 페이지 중 콘텐츠에서 Tab 누를 때 접속 로그 쌓기
      this.$store.commit('SetEnterContent', {
        cPath : this.$route.path,
        iIndex : data.value,
      });
      this.tab = data.value;
    },
  },
};
</script>
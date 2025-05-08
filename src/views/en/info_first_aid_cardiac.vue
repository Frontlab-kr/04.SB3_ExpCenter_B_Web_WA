<template>
  <div>
    <h1 class="title-xxlarge">{{ $t('menu_dept_2_040507') }}</h1>
    <div role="tablist" class="d-flex flex-wrap tab_back" style="width: 100%; overflow-x: hidden;">
      <button v-for="(item, i) in zTab" :key="i" :class="(item.value == tab ? 'sel_box_btn' : 'nor_box_btn') + ' center_all'"
        role="tab" tabindex="0" style="cursor: pointer;" @click="goTab(item)" @keydown.enter="goTab(item)"
        :aria-label="item.name + ' ' + (item.value == tab?`선택됨`:'')"
        @keydown.left="moveTab(i, -1)" @keydown.right="moveTab(i, 1)"   >
        {{item.name}}
      </button>
    </div>

    <div class="bg-gap-2"></div>
    <div v-if="tab == 0">
      <div class="bg-body">
        <ul>
          <li>Discomfort or pressure, a squeezing feeling, a sense of fullness, pain in the center of the chest, or a feeling of indigestion lasting several minutes to hours.</li>
          <li>Pain radiating to the shoulder, neck, or arm.</li>
          <li>Dizziness, fainting, cold sweat, nausea, and shortness of breath, accompanied by chest discomfort.</li>
        </ul>
      </div>
    </div>

    <div v-if="tab == 1">
      <div class="bg-body">
        <ul>
          <li>There is a high risk of sudden death, so call an ambulance or quickly transport the patient to a general hospital.</li>
          <li>Help the patient adopt a position that minimizes pain. Have them sit with knees slightly bent and loosen the clothing around the neck and torso. Keep the environment calm and reassure the patient.</li>
          <li>Check for coronary artery disease and any medications being used (such as nitroglycerin) and administer them if appropriate.</li>
          <li>Perform CPR if necessary.</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: 0,
      zTab: [
        { value: 0, name: "Symptoms" },
        { value: 1, name: "First Aid" },
      ],
    };
  },

  components: {
  },

  mounted() {
  },

  beforeUnmount() {
  },

  methods: {
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
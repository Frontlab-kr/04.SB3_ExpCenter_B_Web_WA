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
          <li>힘이 없음(허약감), 감각 저하, 또는 신체의 한쪽(얼굴, 팔, 다리)에 나타나는 마비</li>
          <li>시력감퇴, 또는 사물이 또렷이 안보임, 특히 한쪽 눈에 이상이 나타남</li>
          <li>언어장애나 이해 능력의 저하</li>
          <li>어지러움이나 몸의 균형을 잡지 못함</li>
          <li>이유 없이 갑자기 오는 심한 두통</li>
          <li>눈이 한쪽으로 돌아감</li>
        </ul>
      </div>
    </div>

    <div v-if="tab == 1">
      <div class="bg-body">
        <ul>
          <li>시간을 지체하지 말고 구급차를 부르거나 병원으로 이송한다. 혈전에 의한 뇌혈관 폐쇄가 원인일 경우 혈전 용해제 투여가 중요하며, 발생 후 3시간 이내에 처치가 이루어져야 한다.</li>
          <li>인후근육 마비나 구토 등으로 기도가 막힐 수 있으므로 기도 유지에 유의한다.</li>
          <li>환자를 눕혀 허리와 어깨를 약간 올려주면 뇌의 혈압이 낮아진다.</li>
          <li>의식이 저하되거나 없는 환자에게 마실 것이나 먹을 것을 주지 않는다. 음식물을 삼키는 기능이 마비되어 기도폐쇄를 유발시킬 수 있다.</li>
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
        {value : 0, name : "개요"},
        {value : 1, name : "응급처치"},
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

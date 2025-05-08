<template>
  <div>
    <h1 class="title-xxlarge">{{ $t('menu_dept_2_040507') }}</h1>
    <div role="tablist" class="d-flex flex-wrap tab_back" style="width: 100%; overflow-x: hidden;">
      <div v-for="(item, i) in zTab" :key="i" :class="(item.value == tab?'sel_box_btn':'nor_box_btn') + ' center_all'" 
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
          <li>불편한 압박감, 조이는 느낌, 꽉찬 느낌, 가슴의 통증, 체한 듯한 답답함 등의 증상이 가슴 중앙에서 수분내지 수 십분 이상 지속된다.</li>
          <li>어깨, 목, 팔로 퍼지는 통증이 있다.</li>
          <li>현기증, 실신, 식은땀, 메스꺼움, 숨이 차는 증세와 함께 가슴이 불편하다.</li>
        </ul>
      </div>
    </div>

    <div v-if="tab == 1">
      <div class="bg-body">
        <ul>
          <li>갑자기 급사할 가능성이 크므로 구급차를 부르거나 신속히 종합병원으로 이송한다.</li>
          <li>환자의 고통을 최소한으로 줄이는 자세를 취하게 한다. 무릎을 약간 구부린 상태로 앉게 하고 목과 몸통의 옷은 느슨하게 한다. 주위를 조용하게 하고 환자를 안심시킨다.</li>
          <li>관상동맥질환 여부와 복용하는 약물(니트로글리세린 등)이 있는지 알아본 후 사용 할 수 있다.</li>
          <li>필요 시 심폐소생술을 한다.</li>
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
        {value : 0, name : "증상"},
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

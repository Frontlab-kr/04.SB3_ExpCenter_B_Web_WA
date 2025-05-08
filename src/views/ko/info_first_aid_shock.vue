<template>
  <div>
    <h1 class="title-xxlarge">{{ $t('menu_dept_2_040504') }}</h1>
    <div role="tablist" class="d-flex flex-wrap tab_back" style="width: 100%; overflow-x: hidden;">
      <button v-for="(item, i) in zTab" :key="i" :class="(item.value == tab?'sel_box_btn':'nor_box_btn') + ' center_all'" :title="(item.value == tab?'선택됨':'')"
        role="tab" tabindex="0" style="cursor: pointer;" @click="goTab(item)" @keydown.enter="goTab(item)"
        :aria-label="item.name + ' ' + (item.value == tab?`선택됨`:'')"
        @keydown.left="moveTab(i, -1)" @keydown.right="moveTab(i, 1)">
        {{item.name}}
      </button>
    </div>


    <div class="bg-gap-2"></div>
    <h2 class="title-xlarge">쇼크란?</h2>
    <div class="bg-layer-2">
      쇼크란 "산소를 함유한 혈액이 인체의 각 부분에 충분히 전달되지 않아서 발생하는 순환계의 기능장애"를 말하는 것으로, 조직 내 혈액이 손실되어 쇼크가 발생된다.
    </div>
    <div class="bg-gap-2"></div>

    <div v-if="tab == 0">
      <div class="bg-body">
        <v-row>
          <v-col cols="12" md="6" sm="12">
            <ul>
              <li>불안, 긴장, 초조감 등 의식상태의 변화를 보일 수 있다.</li>
              <li>피부, 입술, 손톱이 창백하고 차가워지거나 축축해질 수 있다.</li>
              <li>메스꺼움이나 구토를 할 수 있다.</li>
              <li>초기 쇼크 시 호흡과 맥박이 빨라진다.</li>
              <li>모세혈관의 재 충혈 시간이 지연된다.</li>
              <li>심한 쇼크일 때에는 무반응을 보인다.</li>
            </ul>
          </v-col>
          <v-col cols="12" md="6" sm="12">
            <div class="text-center">
            <img src="/boramae/contents/image/info_first_aid_shock_01_01.jpg" alt="정상상태-2-3초 이내/ 쇼크상태-2-3초 이후" style="width: 97%;">
          </div>
          </v-col>
        </v-row>
      </div>
    </div>

    <div v-if="tab == 1">
      <div class="bg-body">
        <v-row>
          <v-col cols="12" md="6" sm="12">
            <ul>
              <li>가급적 환자를 눕힌 상태로 유지한다.</li>
              <li>환자의 다리를 15∼25㎝ 정도 올려준다.
                <ul><li>머리부상자, 뇌중풍(뇌졸중) 환자는 제외</li></ul>
              </li>
            </ul>
          </v-col>
          <v-col cols="12" md="6" sm="12">
            <div class="text-center">
            <img src="/boramae/contents/image/info_first_aid_shock_02_01.jpg" alt="환자의 다리를 15~25cm 정도 올리고 담요나 옷을 덮어주어 체온손실을 막는다." style="width: 97%;">
          </div>
          </v-col>
        </v-row>

        <ul>
          <li>의식이 없거나 구토하는 환자 등은 옆으로 눕힌다.</li>
          <li>가슴부상, 호흡장애, 심장환자는 반쯤 앉은 자세를 취한다.</li>
          <li>담요나 옷을 바닥에 깔고 덮어주어 체온 손실을 막는다.</li>
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

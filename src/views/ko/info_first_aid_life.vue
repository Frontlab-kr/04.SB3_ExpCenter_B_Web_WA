<template>
  <div>
    <h1 class="title-xxlarge">{{ $t('menu_dept_2_040508') }}</h1>
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
      <div class="bg-layer-2">
        약물중독 환자에서는 구토, 호흡곤란, 복통, 발한, 의식장애, 경련 등이 나타난다.
      </div>
      <div class="bg-body">
        <div class="bg-gap-2"></div>
        <v-row>
          <v-col cols="12" md="9" sm="12">
            <ul>
              <li>의식을 확인하고 기도를 유지한다.</li>
              <li>만일 환자가 의식이 없으면 호흡과 맥박을 확인한다.</li>
              <li>중독물질을 복용하였을 때는 우유와 물을 마시게 하여 중독 물질을 회석시키거나 구토를 유발시킨다.</li>
              <li>단, 환자가 의식이 없거나 경련이 있을 경우에는 구토를 시키지 않도록 한다.</li>
              <li>중독 가능성이 있는 약물, 화학물질, 약병 등을 수거하여 비닐팩에 담아 병원으로 가져간다.</li>
              <li>약물복용에 의한 중독환자는 복용초기에 신속한 약물제거가 환자의 생명을 구하는데 지름길이다.</li>
            </ul>
          </v-col>
          <v-col cols="12" md="3" sm="12">
            <div class="text-center">
            <img src="/boramae/contents/image/info_first_aid_life_01_01.jpg" alt="" style="width: 97%;">
          </div>
          </v-col>
        </v-row>
      </div>
    </div>

    <div v-if="tab == 1">
      <div class="bg-layer-2">
        상한 음식물을 먹음으로써 생기는 중독 상태 즉 발열, 구토, 설사, 복통, 발진 등의 증상이 나타난다.
      </div>
      <div class="bg-gap-2"></div>
      <div class="bg-body">
        <v-row>
          <v-col cols="12" md="6" sm="12">
            <ul>
              <li>식중독의 발병여부는 섭취된 세균의 독성과 수에 달려 있고 일반적으로 소화기 질환에 의한 증상과 식중독에 의한 증상의 구별이 어렵다.</li>
              <li>따라서 119 신고 등 환자를 신속히 병원으로 이송하는 것이 좋다.</li>
            </ul>
          </v-col>
          <v-col cols="12" md="6" sm="12">
            <div class="text-center">
            <img src="/boramae/contents/image/info_first_aid_life_02_01.jpg" alt="" style="width: 97%;">
          </div>
          </v-col>
        </v-row>
      </div>
    </div>

    <div v-if="tab == 2">
      <div class="bg-body">
        <v-row>
          <v-col cols="12" md="9" sm="12">
            <ul>
              <li>침이 박힌 피부주위를 딱딱한 카드 등으로 눌러서 침을 제거한다.</li>
              <li>통증을 해소하고 부기를 막기 위해서는 찬 찜질을 한다.</li>
              <li>통증이나 부기가 계속되면 병원으로 이송한다.</li>
              <li>독을 가진 여러 종류의 벌레는 사람을 쏘거나 물어버림으로써 중독을 유발시킬 수 있다.</li>
            </ul>
          </v-col>
          <v-col cols="12" md="3" sm="12">
            <div class="text-center">
            <img src="/boramae/contents/image/info_first_aid_life_03_01.jpg" alt="" style="width: 97%;">
          </div>
          </v-col>
        </v-row>
      </div>
    </div>

    <div v-if="tab == 3">
      <div class="bg-body">
        <ul>
          <li>광견병이 있을 수 있으므로 집에서 기르는 개나 고양이에게 물리면 일단 그 동물을 가둬두고 10일 동안 관찰한다.</li>
          <li>비눗물로 상처를 깨끗이 씻고 압력이 약한 물로 즉시 헹군다.</li>
          <li>지혈을 하고 상처를 치료한다.</li>
          <li>의사의 치료를 받고 필요시 광견병 예방 주사를 맞는다.</li>
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
        {value : 0, name : "약물중독"},
        {value : 1, name : "식중독"},
        {value : 2, name : "벌에 쏘였을 때"},
        {value : 3, name : "개에 물렸을 때"},
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

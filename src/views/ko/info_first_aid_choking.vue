<template>
  <div>
    <h1 class="title-xxlarge">{{ $t('menu_dept_2_040502') }}</h1>

    <div role="tablist" class="d-flex flex-wrap tab_back" style="width: 100%; overflow-x: hidden;">
      <div :title="(item.value == tab?'선택됨':'')" v-for="(item, i) in zTab" :key="i" :class="(item.value == tab?'sel_box_btn':'nor_box_btn') + ' center_all'" 
        role="tab" tabindex="0" style="cursor: pointer;" @click="goTab(item)" @keydown.enter="goTab(item)"
        :aria-label="item.name + ' ' + (item.value == tab?`선택됨`:'')"
        @keydown.left="moveTab(i, -1)" @keydown.right="moveTab(i, 1)">
        {{item.name}}
      </div>
    </div>

    <div class="bg-gap-2"></div>
    <div v-if="tab == 0">
      <h2 class="title-xlarge">원인</h2>
      <div class="bg-body">
        이물질로는 음식물(고기 덩어리, 떡 등), 장난감, 사탕 등으로 다양하며 기도가 막혀 호흡이 곤란하게 된다.
      </div>

      <div class="bg-gap"></div>
      <h2 class="title-xlarge">증상</h2>
      <div class="bg-body">
        <v-row>
          <v-col cols="12" md="8" sm="12">
            <ul>
              <li>두 손으로 목부분을 쥐면서 기침을 하려고 한다.</li>
              <li>목 부분에서 심한 천명음(‘쌕-쌕’소리)이 들릴 수 있다.</li>
              <li>얼굴이 파랗게(청색증)변한다.</li>
            </ul>
          </v-col>

          <v-col cols="12" md="4" sm="12">
            <div class="text-center">
              <img src="/boramae/contents/image/info_first_aid_choking_01_01.jpg" alt="" style="width: 97%;">
            </div>
          </v-col>
        </v-row>
      </div>

      <div class="bg-gap-2"></div>
      <div class="bg-layer-2">
        <p class="font-bold">주의하세요</p>
        기도가 완전히 폐쇄된 경우에는 3∼4분 이내에 의식을 잃게 되고 4∼6분이 경과하면 뇌세포의 영구적인 손상이 발생하여 생명이 위험에 빠질 수 있으므로 빠른 시간 내 응급처치를 시행한다.
      </div>
    </div>

    <div v-if="tab == 1">
      <h2 class="title-xlarge">환자가 일어선 상태-환자의 의식이 있는 상태</h2>
      <div class="bg-body">
        <v-row>
          <v-col cols="12" md="7" sm="12">
            <ul>
              <li>말을 할 수 있는 경우 : 기침을 유도</li>
              <li>말을 할 수 없는 경우 : 119 신고 및 하임리히법 실시</li>
              <li>의식을 잃거나 이물질이 나올 때까지 반복</li>
            </ul>
          </v-col>

          <v-col cols="12" md="5" sm="12">
            <div class="text-center">
              <img src="/boramae/contents/image/info_first_aid_choking_02_01.jpg" alt="1.주먹쥔 손을 배꼽과 명치 사이의 복부에 위치시킨다 2.반대손으로 감싸 안는다 3.후상방향으로 강하게 밀어 올린다." style="width: 97%;">
            </div>
          </v-col>
        </v-row>
      </div>

      <div class="bg-gap-2"></div>
      <div class="bg-layer-2">
        <p class="font-bold">주의하세요</p>
        조금이라도 말을 할 수 있다면 기침을 유도하는 것이 가장 바람직하다. 임산부나 비만환자는 상복부가 아닌 흉부를 압박한다.
      </div>


      <div class="bg-gap"></div>
      <h2 class="title-xlarge">의식이 없으면 심폐소생술 시행(30:2)</h2>
      <div class="bg-body">
        <v-row>
          <v-col cols="12" md="7" sm="12">
            <ul>
              <li>인공호흡 전에 입을 열어 보아 이 물질이 있는지 확인</li>
              <li>이물질이 보이는 경우에만 제거</li>
            </ul>
          </v-col>
          <v-col cols="12" md="5" sm="12">
            <div class="text-center">
              <img src="/boramae/contents/image/info_first_aid_choking_02_02.jpg" alt="구조자가 한 사람인 경우 흉부압박과 인공호흡의 비율은 30:2로 한다., 구조자가 두 사람인 경우 30:2로 1인은 흉부압박을 하고 다른 1인은 인공호흡을 한다. 5주기 마다(매 2분마다) 교대하여 실시한다." style="width: 97%;">
            </div>
          </v-col>
        </v-row>
      </div>


      <div class="bg-gap"></div>
      <h2 class="title-xlarge">심폐소생술을 시행하면서 입을 여는 요령</h2>
      <div class="bg-body">
        <v-row>
          <v-col cols="12" md="7" sm="12">
            <ul>
              <li>이물질을 제거하려면 우선 환자의 입을 열어야 한다.</li>
              <li>입을 여는 방법은 수지교차법으로 한다.</li>
            </ul>
          </v-col>
          <v-col cols="12" md="5" sm="12">
            <div class="text-center">
              <img src="/boramae/contents/image/info_first_aid_choking_02_03.jpg" alt="" style="width: 97%;">
            </div>
          </v-col>
        </v-row>
      </div>


      <div class="bg-gap"></div>
      <h2 class="title-xlarge">이물질을 제거하는 요령</h2>
      <div class="bg-body">
        <v-row>
          <v-col cols="12" md="7" sm="12">
            <ul>
              <li>환자의 입속을 훑어 내듯이 한다.</li>
              <li>눈으로 확인되는 경우에만 제거</li>
            </ul>
          </v-col>
          <v-col cols="12" md="5" sm="12">
            <div class="text-right">
              <img src="/boramae/contents/image/info_first_aid_choking_02_04.jpg" alt="" style="height: 170px;">
            </div>
          </v-col>
        </v-row>
      </div>

      <div class="bg-gap"></div>
      <h2 class="title-xlarge">영아(1세 이하)의 경우</h2>


      <div class="d-flex flex-wrap text-center">
        <div class="text-center ma-1" style="width : 210px;">
          <img src="/boramae/contents/image/info_first_aid_choking_02_05.jpg" alt="" style="width: 210px;">
          <div class="links-small">등을 5회 두드린다.</div>
        </div>
        <div class="text-center ma-1" style="width : 210px;">
          <img src="/boramae/contents/image/info_first_aid_choking_02_06.jpg" alt="" style="width: 210px;">
          <div class="links-small">흉부압박법 5회 반복</div>
        </div>
        <div class="text-center ma-1" style="width : 433px;">
          <img src="/boramae/contents/image/info_first_aid_choking_02_07.jpg" alt="" style="width: 433px;">
          <div class="links-small">의식이 없으면 심폐소생술 실시 (흉부의 1/3∼1/2깊이, 30:2 압박)</div>
        </div>
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
        {value : 0, name : "원인과 증상"},
        {value : 1, name : "응급처치"},
      ],
    };
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

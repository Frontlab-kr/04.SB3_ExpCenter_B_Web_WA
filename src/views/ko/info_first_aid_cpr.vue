<template>
  <div>
    <h1 class="title-xxlarge">{{ $t('menu_dept_2_040501') }}</h1>

    <div role="tablist" class="d-flex flex-wrap tab_back" style="width: 100%; overflow-x: hidden;">
      <div v-for="(item, i) in zTab" :key="i" :class="(item.value == tab?'sel_box_btn':'nor_box_btn') + ' center_all'"  :title="(item.value == tab?'선택됨':'')"
        role="tab" tabindex="0" style="cursor: pointer;" @click="goTab(item)" @keydown.enter="goTab(item)"
        :aria-label="item.name + ' ' + (item.value == tab?`선택됨`:'')"
        @keydown.left="moveTab(i, -1)" @keydown.right="moveTab(i, 1)">
        {{item.name}}
      </div>
    </div>

    <div class="bg-gap-2"></div>
    <h2 class="title-xlarge">심폐소생술이란?</h2>
    <div class="bg-layer-2">
      심폐소생술은 심장박동이 멈추고 숨을 쉬지 않는 사람에게 인공적으로 호흡을 불어넣고 흉부를 압박하여 산소가 포함된 혈액을 뇌로 보내주는 것입니다.
    </div>
    <div class="bg-gap-2"></div>

    <div v-if="tab == 0">
      <div class="bg-body">
        <v-row>
          <v-col cols="12" md="6" sm="12">
            <ul><li>심정지가 발생하면 그 순간부터 시간이 경과하면서 매 분마다 사망률이 증가한다. 5분 이상이 경과되면 뇌손상이 시작되고 10분 이상 경과되면 소생가능성이 희박하다. 그러므로 심정지가 발생하는 것을 목격한 사람이 심폐소생술을 즉시 실시하면 소생가능성을 2-3배 늘릴 수 있다.</li></ul>
          </v-col>
          <v-col cols="12" md="6" sm="12">
            <div class="text-center">
              <img src="/boramae/contents/image/info_first_aid_cpr_01_01.jpg" alt="0~4분 : 심폐소생술을 실시하면 뇌손상의 가능성이 거의 없다. / 4~6분 : 뇌손상의 가능성이 높다 / 6~10분 : 뇌손상의 가능성이 확실 / 10분 이상 : 심한 뇌손상 또는 뇌사가 된다." style="width: 97%;">
            </div>
          </v-col>
        </v-row>
      </div>
    </div>

    <div v-if="tab == 1">
      <v-row>
        <v-col v-for="(item, i) in zCPR" :key="i" cols="12" md="4" sm="6">
          <div>
            <v-card class="pa-4" style="min-height: 130px;">
              <div class="center_all number_box">{{item.step}}</div>
              <div class="d-flex justify-space-between mt-3">
                <div>{{item.target}}</div>
                <v-icon aria-hidden="true" class="gray-50-color">mdi-arrow-right</v-icon>
                <div></div>
                <div class="primary-color">{{item.script}}</div>
              </div>
            </v-card>
            <div class="mt-1">{{item.caption}}</div>
          </div>

        </v-col>
      </v-row>
    </div>

    <div v-if="tab == 2">
      <div class="bg-body">
        <v-row>
          <v-col cols="12" md="6" sm="12">
            <ul>
              <li>의식확인 : "여보세요 괜찮습니까?
                <ul><li>환자의 어깨를 가볍게 두드리거나 흔들면서 괜찮은지 소리쳐 의식 상태를 확인한다.</li></ul>
              </li>
            </ul>
          </v-col>
          <v-col cols="12" md="6" sm="12">
            <div class="text-center">
            <img src="/boramae/contents/image/info_first_aid_cpr_03_01.jpg" alt="" style="width: 97%;">
          </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6" sm="12">
            <ul>
              <li>도움요청 : "119에 신고해 주세요"
                <ul>
                  <li>주변 사람에게 119에 전화해 달라고 부탁한다.</li>
                  <li>주변에 아무도 없으면 직접 전화 한다.</li>
                </ul>
              </li>
            </ul>
          </v-col>
          <v-col cols="12" md="6" sm="12">
            <div class="text-center">
              <img src="/boramae/contents/image/info_first_aid_cpr_03_02.jpg" alt="" style="width: 97%;">
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6" sm="12">
            <ul>
              <li>자세 바로잡기 : 통나무 굴리기법
                <ul><li>자세 바로잡기 : 통나무 굴리기법</li></ul>
              </li>
            </ul>
          </v-col>
          <v-col cols="12" md="6" sm="12">
            <div class="text-center">
            <img src="/boramae/contents/image/info_first_aid_cpr_03_03.jpg" alt="" style="width: 97%;">
          </div>
          </v-col>
        </v-row>
      </div>
    </div>

    <div v-if="tab == 3">
      <div class="bg-body">
        <v-row>
          <v-col cols="12" md="8" sm="12">
            <ul>
              <li>압박의 깊이는 흉곽의 1/3 ~ 1/2이 들어가도록 한손 또는 두손으로 압박하며, 그 이외는 성인 심폐소생술과 같은 방법으로 실시한다.</li>
            </ul>
          </v-col>
          <v-col cols="12" md="4" sm="12">
            <div class="text-center">
              <img src="/boramae/contents/image/info_first_aid_cpr_04_01.jpg" alt="" style="width: 97%;">
            </div>
          </v-col>
        </v-row>
      </div>
    </div>

    <div v-if="tab == 4">
      <div class="bg-body">
        <ul>
          <li>
            의식확인
            <ul><li>발바닥을 자극하여 아기의 반응을 보아 의식을 확인한다.</li></ul>
          </li>

          <div class="bg-gap-2"></div>
          <li>
            도움요청
            <ul><li>빨리 119에 연락한다.</li></ul>
          </li>
        </ul>

        <div class="bg-gap-2"></div>
        <v-row>
          <v-col cols="12" md="8" sm="12">
            <ul>
              <li>기도 열기
                <ul><li>아기의 목은 매우 유연하므로 머리 젖히기와 턱 들어올리기는 부드럽게하며 너무 많이 젖히지 않도록 한다.</li></ul>

              </li>
            </ul>
          </v-col>
          <v-col cols="12" md="4" sm="12">
            <div class="text-center">
              <img src="/boramae/contents/image/info_first_aid_cpr_05_01.jpg" alt="" style="width: 97%;">
            </div>
          </v-col>
        </v-row>

        <ul>
          <li>
            호흡확인
            <ul><li>보고, 듣고, 느끼는 방법으로 호흡이 있는지 확인한다.</li></ul>
          </li>

          <div class="bg-gap-2"></div>
          <li>
            인공호흡
            <ul>
              <li>코와 입을 한꺼번에 처치자의 입으로 덮고 호흡을 불어 넣는다.</li>
              <li>호흡의 양은 아주 적은 양으로 흉부의 상승을 확인하면서 불어 넣는다.</li>
            </ul>
          </li>
        </ul>

        <div class="bg-gap-2"></div>
        <v-row>
          <v-col cols="12" md="8" sm="12">
            <ul>
              <li>흉부압박법
                <ul>
                  <li>영아를 딱딱한 바닥에 눕힌다.</li>
                  <li>양측유두를 이은 가상의 선 바로 아래 흉골과 만나는 지점에 두 손가락을 댄다.</li>
                  <li>분당 100회의 속도로 흉곽의 1/3∼1/2깊이로 압박한다.</li>
                  <li>인공호흡과 흉부압박은 30:2의 비율로 119 구급대가 도착할 때 까지 실시한다.</li>
                </ul>
              </li>
            </ul>
          </v-col>
          <v-col cols="12" md="4" sm="12">
            <div class="text-center">
              <img src="/boramae/contents/image/info_first_aid_cpr_05_02.jpg" alt="" style="width: 97%;">
            </div>
          </v-col>
        </v-row>
      </div>
    </div>


    <div v-if="tab == 5">
      <div class="bg-body">
        <v-row>
          <v-col cols="12" md="8" sm="12">
            <ul>
              <li>제세동은 심실세동이라 불리는 치명적인 심부정맥을 교정하기 위해서 환자의 흉벽을 통하여 심장에 전류를 가하는 치료방법을 말한다. 제세동을 위하여 사용되는 장비를 자동심장충격기라고 한다. 자동심장충격기는 사용이 간단하여 누구나 사용할 수 있도록 만들어져 있으며, AED 스스로 판단하고 상황에 맞는 메시지를 알려주므로 교육 후 쉽게 사용할 수 있다.</li>
            </ul>
          </v-col>

          <v-col cols="12" md="4" sm="12">
            <div class="text-center">
              <img src="/boramae/contents/image/info_first_aid_cpr_06_01.jpg" alt="" style="width: 97%;">
            </div>
          </v-col>
        </v-row>


        <div class="bg-gap"></div>
        <h2 class="title-xlarge">자동심장충격기 사용법과 심폐소생술</h2>

        <div class="bg-body">
          <ul>
            <li>
              심정지 환자발생 시 심폐소생술 순서에 의해 실시하면서 자동심장충격기가 준비되면 바로 충격기 실시
              <ul>
                <li>전원 버튼을 누른다.</li>
                <li>패드를 붙인다.
                  <ul>
                    <li>오른쪽 쇄골 중심하부</li>
                    <li>왼쪽 젖꼭지와 겨드랑이 사이
                      <div class="text-center ma-2">
                        <img src="/boramae/contents/image/info_first_aid_cpr_06_02.jpg" alt="" style="width: 450px;">
                      </div>
                    </li>

                    <li>분석할 동안 환자로부터 모두 물러난다.
                      <ul>
                        <li>분석버튼 있을 시 모두 물러나게 한 후 분석버튼을 누른다.</li>
                      </ul>
                    </li>

                    <li>심전도 리듬 확인 및 메시지를 듣는다.</li>
                    <li>적응 리듬(심실세동)이라는 메시지가 나오고 충전이 끝나면 안내에 따라 쇼크(shock)버튼을 누른다.</li>
                    <li>즉시 심폐소생술을 다시 시작한다.
                      <div class="text-center ma-2">
                        <img src="/boramae/contents/image/info_first_aid_cpr_06_03.jpg" alt="" style="width: 450px;">
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div class="bg-layer-2">
          <p class="font-bold">주의하세요</p>
          몸에 물기가 있을 때는 닦아내고 처치한다. 분석 및 쇽 버튼 적용시는 환자와 모두 떨어져 있는지 철저히 확인한다. 가슴에 털이 많은 경우는 빠르게 털을 제거한 후 처치한다.
        </div>
        <p class="font-bold mt-2" v-html="'※ 철도객차·공항·선박·다중이용시설 등에 자동심장충격기등 심폐소생술을 행할 수 있는 응급장비를 갖추도록 하고 일반인도 교육을 받은 후 사용 가능하도록 응급의료에 관한 법률이 개정됨 <2007.12.14. 개정, 2008.6.15. 시행></2007.12.14.>'"></p>

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
        {value : 0, name : "심페소생술의 중요성"},
        {value : 1, name : "심폐소생술의 단계"},
        {value : 2, name : "심폐소생술의 방법"},
        {value : 3, name : "소아(1~8세) 심폐소생술"},
        {value : 4, name : "영아(1세이하) 심폐소생술"},
        {value : 5, name : "자동심장충격기 사용법"},
      ],

      zCPR : [
        {step : 1, target : "환자발생", script : "응급환자 발견", caption : ""},
        {step : 2, target : "의식확인", script : `"여보세요? 괜찮으세요?"`, caption : "환자의 양쪽 어깨를 가볍게 두드리며 확인한다."},
        {step : 3, target : "도움요청", script : `"119에 연락해주세요!"`, caption : "직접 신고하거나 주위 사람들에게 도움을 요청한다."},
        {step : 4, target : "흉부압박", script : "분당 최소 100회 속도로 30회", caption : "최소 5cm 깊이로 압박과 이완"},
        {step : 5, target : "기도열기", script : "머리젖히고 턱들기", caption : "두부 후굴하악거상법"},
        {step : 6, target : "인공호흡", script : "구강대 구강법", caption : "구강대 구강법 호기:흡기 = 50:50"},
        {step : 7, target : "인공호흡과 흉부압박", script : "119구급대가 도착할 때 까지 반복", caption : ""},
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

<style scoped>
  .number_box{
    color : white; 
    border-radius: 100%; 
    border: 3px solid var(--primary-60);
    height: 40px; 
    width : 40px; 
    background-color: var(--primary-50);
    font-size : var(--font-size-title-xlarge);
    padding-left: 2px;
  }
</style>
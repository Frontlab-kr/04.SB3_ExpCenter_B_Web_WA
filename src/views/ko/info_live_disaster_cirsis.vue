<template>
  <div>
    <h1 class="title-xxlarge">{{ $t('menu_dept_2_040401') }}</h1>
    <div role="tablist" class="d-flex flex-wrap tab_back" style="width: 100%; overflow-x: hidden;">
      <div v-for="(item, i) in zTab" :key="i" :class="(item.value == tab?'sel_box_btn':'nor_box_btn') + ' center_all'"
        role="tab" tabindex="0" style="cursor: pointer;" @click="goTab(item)" @keydown.enter="goTab(item)"
        @keydown.left="moveTab(i, -1)" @keydown.right="moveTab(i, 1)"        
        :aria-label="item.name + ' ' + (item.value == tab?`선택됨`:'')">
        {{item.name}}
      </div>
      
    </div>

    <div v-if="tab == 0">
      <div class="bg-gap-2"></div>
      <h2 class="title-xlarge">화재를 감지하는 방법</h2>

      <div class="d-flex">
        <v-row>
          <v-col cols="12" md="6" sm="12">
            <ul>
              <li>불이 났다는 사실을 가능한 한 빨리 아는 것이 중요합니다.
                <ul>
                  <li>눈 : 연기가 보이고 따가워져요.</li>
                  <li>귀 : 사람들의 아우성 소리와 비상 벨소리가 들려요.</li>
                  <li>코 : 무엇인가 타는 냄새가 나요.</li>
                  <li>입 : 불이난 것을 알게되면 불이야라고 큰소리로</li>
                  <li>외쳐서 다른 사람들에게 알려요.</li>
                  <li>피부 : 뜨거움을 느껴요.</li>
                </ul>
              </li>
            </ul>
          </v-col>
          <v-col cols="12" md="6" sm="12">
            <div class="text-center">

              <img src="/boramae/contents/image/info_live_disaster_cirsis_01.jpg" alt="눈 연기가 보이고 따가워져요, 귀 사람들의 아우성소리와 비상벨소리가 들려요, 코 무엇인가 타는 냄새가 나요, 입 불이난 것을 할게되면 불이야 라고 큰 소리로 외쳐서 다른사람들에게 알려요, 피부 뜨거움을 느껴요" style="width: 80%;">
              <div>
                [그림 1] 화재는 어떻게 알수 있을까요?
              </div>
            </div>
          </v-col>
        </v-row>
      </div>

      <div class="bg-gap-2"></div>
      <h2 class="title-xlarge">대피계획 세우기</h2>

      <div class="d-flex">
        <v-row>
          <v-col cols="12" md="6" sm="12">
            <ul>
              <li>평소 가정에서 화재 시 대피계획을 세워 두고, 가족과 함께 피난훈련을 실시하세요.</li>
              <li>대피계획을 숙지해 두면 불이 났을 때 우리의 생명과 재산을 보호할 수 있습니다.</li>
              <li>집 또는 어떤 장소에서든 항상 가까운 비상구의 위치를 확인해야 합니다.</li>
            </ul>
          </v-col>
          <v-col cols="12" md="6" sm="12">
            <div class="text-center">
              <img src="/boramae/contents/image/info_live_disaster_cirsis_02.jpg" alt="평소가정에서 대피계획을 세워 비상구위치를 확인합니다." style="width: 80%;">
              <div>
                [그림 2] 비상구는 어디 있을까요?
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>


    <div v-if="tab == 1">
      <div class="bg-gap-2"></div>
      <h2 class="title-xlarge">불이 났을 때 대피가 가장 우선입니다.</h2>

      <div class="bg-body">
        <ul>
          <li>불이 났을 때 어떻게 행동해야 할까요?</li>
        </ul>
        <div class="bg-gap-3"></div>

        <div class="d-flex flex-wrap text-center">
          <div class="text-center" style="width : 210px;">
            <img src="/boramae/contents/image/info_live_disaster_cirsis_03.jpg" alt="주위에 큰소리로 알립니다." style="width: 97%;">
            <div>주위에 큰소리로 알립니다.</div>
          </div>
          <div class="text-center" style="width : 210px;">
            <img src="/boramae/contents/image/info_live_disaster_cirsis_04.jpg" alt="신속히 대피합니다." style="width: 97%;">
            <div>신속히 대피합니다.</div>
          </div>
          <div class="text-center" style="width : 210px;">
            <img src="/boramae/contents/image/info_live_disaster_cirsis_05.jpg" alt="119에 신고합니다." style="width: 97%;">
            <div>119에 신고합니다.</div>
          </div>
          <div class="text-center" style="width : 210px;">
            <img src="/boramae/contents/image/info_live_disaster_cirsis_06.jpg" alt="주위 사람과 협력하여 소화기, 소화전을 이용하여 초기 소화합니다." style="width: 97%;">
            <div class="links-small  text-left">주위 사람과 협력하여 소화기, 소화전을 이용하여 초기 소화합니다.</div>
          </div>
        </div>
      </div>

      <div class="bg-gap"></div>
      <h2 class="title-xlarge">불이 났을 때 어떻게 행동해야 할까요?</h2>
      <div class="bg-body">
        <ul>
          <li>주위에 불이 난 사실을 빨리 알립니다.
            <ul><li>"불이야!"라고 소리를 지르거나, 비상버튼을 누르고 대피합니다.</li></ul>
          </li>

          <div class="bg-gap-2"></div>
          <li>건물(집) 밖으로 재빨리 대피합니다.
            <ul>
              <li>불이 발생하면 가능한 한 빨리 화재장소에서 대피하여야 합니다.</li>
              <li>무섭다고 숨으면 절대 안 됩니다.</li>
              <li>아끼는 물건을 챙기려고 시간을 지체하면 안 됩니다.</li>
              <li>일단 밖으로 나가면 다시 화재장소로 들어가려 해서는 안 됩니다.</li>
              <li>엘리베이터를 타지 말고 비상구를 이용해야 합니다.</li>
            </ul>
          </li>

          <div class="bg-gap-2"></div>
          <li>안전한 곳으로 대피하였다면 119로 신고합니다.
            <ul>
              <li>불이 난 곳(주소나 주변의 큰 건물 이름 등)을 또박또박 말해야 합니다.</li>
              <li>소방관들이 쉽게 찾을 수 있도록 평상시 주위에 있는 큰 건물 등을 알아 둡니다.</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>


    <div v-if="tab == 2">
      <div class="bg-gap-2"></div>
      <h2 class="title-xlarge">뜨거운 연기를 마시면 아주 위험합니다.</h2>

      <div class="bg-body">
        <ul>
          <li>연기 속에서 안전하게 탈출하기</li>
        </ul>
        <div class="bg-gap-3"></div>

        <div class="d-flex flex-wrap text-center">
          <div class="text-center" style="width : 210px;">
            <img src="/boramae/contents/image/info_live_disaster_cirsis_07.jpg" alt="손수건 옷 등을 이용하여 코와 입을 보호합니다." style="width: 97%;">
            <div class="links-small text-left">손수건 옷 등을 이용하여 코와 입을 보호합니다.</div>
          </div>
          <div class="text-center" style="width : 210px;">
            <img src="/boramae/contents/image/info_live_disaster_cirsis_08.jpg" alt="자세를 최대한 낮춥니다." style="width: 97%;">
            <div>자세를 최대한 낮춥니다.</div>
          </div>
          <div class="text-center" style="width : 210px;">
            <img src="/boramae/contents/image/info_live_disaster_cirsis_09.jpg" alt="다른손으로 벽을 잡습니다." style="width: 97%;">
            <div>다른손으로 벽을 잡습니다.</div>
          </div>
          <div class="text-center" style="width : 210px;">
            <img src="/boramae/contents/image/info_live_disaster_cirsis_10.jpg" alt="비상구 방향으로 신속하게 대피합니다." style="width: 97%;">
            <div class="links-small text-left">비상구 방향으로 신속하게 대피합니다.</div>
          </div>
        </div>
      </div>

      <div class="bg-gap"></div>
      <h2 class="title-xlarge">연기를 들이 마시지 않으려면 어떻게 해야 할까요?</h2>
      <div class="bg-body">
        <div class="ml-3 mb-3">
          불이 났을 때 주요한 사망원인은 연기에 의한 질식입니다. 연기 속에는 유독성 물질이 많아 기도와 폐에 손상을 주거나 생명을 잃게 할 수 있으므로 연기를 마시면 매우 위험합니다.
        </div>
        <ul>
          <li>연기를 피하는 방법
            <ul>
              <li>화재 시 연기는 실내상층에 위치하고 깨끗한 공기는 바닥으로부터 30cm～60cm 사이에 있습니다. 따라서 연기가</li>
              <li>보이거나, 냄새가 나면 옷가지를 사용하여 코와 입을 막고 자세를 낮추고 신속히 건물 밖으로 나가야합니다.</li>
              <li>대피시 방화문은 반드시 닫고 건물 밖으로 나와야 합니다. 대피할 때 문을 닫으면 열과 연기의 확산을 줄일 수 있으므로 대피시간을 벌 수 있습니다.</li>
              <li>방문이나 비상구를 열고 나오기 전에 손등을 손잡이에 살짝 대어 봅니다. 손잡이가 뜨거우면 불이 가까이 있다는 뜻이므로 가급적 다른 출입구를 사용하여 대피해야 합니다.</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="tab == 3">
      <div class="bg-gap-2"></div>
      <h2 class="title-xlarge">문밖에 화재로 대피가 곤란할 때는 어떻게 해야 할까요?</h2>

      <div class="bg-body">
        <div class="d-flex flex-wrap text-center">
          <div class="text-center" style="width : 270px;">
            <img src="/boramae/contents/image/info_live_disaster_cirsis_11.jpg" alt="손잡이가 뜨거우면 나가지 않습니다." style="width: 97%;">
            <div class="links-small text-left">손잡이가 뜨거우면 나가지 않습니다.</div>
          </div>
          <div class="text-center" style="width : 270px;">
            <img src="/boramae/contents/image/info_live_disaster_cirsis_12.jpg" alt="창문이나 문틈을 수건으로 막습니다." style="width: 97%;">
            <div class="links-small text-left">창문이나 문틈을 수건으로 막습니다.</div>
          </div>
          <div class="text-center" style="width : 270px;">
            <img src="/boramae/contents/image/info_live_disaster_cirsis_13.jpg" alt="창문에서 수건을 흔들며 구조를 요청합니다." style="width: 97%;">
            <div class="links-small text-left">창문에서 수건을 흔들며 구조를 요청합니다.</div>
          </div>
        </div>
      </div>

      <div class="bg-gap"></div>
      <h2 class="title-xlarge">불길이나 연기 때문에 대피할 수 없을 때는 어떻게 해야 하나요?</h2>
      <div class="bg-body">
        <div class="ml-3 mb-3">
          불이 났을 때 주요한 사망원인은 연기에 의한 질식입니다. 연기 속에는 유독성 물질이 많아 기도와 폐에 손상을 주거나 생명을 잃게 할 수 있으므로 연기를 마시면 매우 위험합니다.
        </div>
        <ul>
          <li>문 손잡이를 만져보고 뜨거운 경우 실내에서 대기해야 합니다.
            <ul><li>손잡이가 뜨거운 경우 문밖에 불이 있다는 증거이므로 문을 열지 말고 다른 출구를 찾거나, 다른 출구가 없을 때에는 침착하게 아래의 요령으로 대처해야 합니다.</li></ul>
          </li>

          <div class="bg-gap-2"></div>
          <li>연기가 들어오지 못하도록 문틈을 모두 막습니다.
            <ul>
              <li>연기가 들어올 수 있는 창문이나 문틈에 담요, 시트, 수건 등을 물에 적셔 틈을 막습니다.</li>
              <li>물에 적신 손수건이나 수건 등으로 입과 코를 가리고 낮은 자세를 취하여 연기를 피해야 합니다.</li>
            </ul>
          </li>

          <div class="bg-gap-2"></div>
          <li>창문을 통해 구조요청을 합니다.
            <ul>
              <li>눈에 잘 보이는 수건이나 옷가지 등을 흔들면서 구조요청을 합니다.</li>
              <li>무섭더라도 참을성 있게 구조를 기다려야 하며, 함부로 창 밖으로 뛰어 내리지 않습니다.</li>
            </ul>
          </li>
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
        {value : 0, name : "화재감지및 대피요령"},
        {value : 1, name : "불이났을때 행동요령"},
        {value : 2, name : "연기속 대피요령"},
        {value : 3, name : "불이난 건물속에 갇혔을때"},
      ]
    };
  },

  components:{
  },

  mounted() {
    if (this.$route.query.id) {
      this.tab = Number(this.$route.query.id)
    }
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

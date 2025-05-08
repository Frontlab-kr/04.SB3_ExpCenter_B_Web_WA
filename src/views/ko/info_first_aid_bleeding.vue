<template>
  <div>
    <h1 class="title-xxlarge">{{ $t('menu_dept_2_040503') }}</h1>
    <div role="tablist" class="d-flex flex-wrap tab_back" style="width: 100%; overflow-x: hidden;">
      <button v-for="(item, i) in zTab" :key="i" :class="(item.value == tab?'sel_box_btn':'nor_box_btn') + ' center_all'" :title="(item.value == tab?'선택됨':'')"
        role="tab" tabindex="0" style="cursor: pointer;" @click="goTab(item)" @keydown.enter="goTab(item)"
        :aria-label="item.name + ' ' + (item.value == tab?`선택됨`:'')"
        @keydown.left="moveTab(i, -1)" @keydown.right="moveTab(i, 1)">
        {{item.name}}
      </button>
    </div>


    <div class="bg-gap-2"></div>
    <h2 class="title-xlarge">출혈이란?</h2>
    <div class="bg-layer-2">
      출혈이란 혈액이 동맥, 모세혈관, 정맥으로부터 외부로 유출되는 것을 의미하며 출혈 부위에 따라 외부 및 내부출혈로 구분된다.
    </div>
    <div class="bg-gap-2"></div>
    
    <div v-if="tab == 0">
      <div class="bg-body">
        <ul>
          <li>호흡과 맥박이 빨라지고 호흡이 곤란하다.</li>
          <li>피부가 창백하고 체온이 떨어진다.</li>
          <li>갈증을 느끼면서 불안감을 갖는다.</li>
          <li>동공이 확대되고 구토가 발생한다.</li>
        </ul>

        <div class="bg-gap-2"></div>
        <div class="text-center">
          <img src="/boramae/contents/image/info_first_aid_bleeding_01_01.jpg" alt="출혈이 있으면 솜으로 압박하여 피를 멎게 한 후 붕대로 감아준다." style="width: 500px;">
        </div>
      </div>
    </div>

    <div v-if="tab == 1">
      <div class="bg-body">
        <ul>
          <li>
            직접압박지혈 : 가장 보편화된 방법
            <ul>
              <li>출혈이 멈춘 후에는 소독거즈를 덮고 압박붕대로 감아준다.</li>
              <li>출혈이 멈추지 않으면 더 강하게 압박해 본다.</li>
              <li>사지에서 출혈이 있는 경우 출혈부위를 심장보다 높여준다.</li>
            </ul>
          </li>

          <v-row>
            <v-col cols="12" md="6" sm="12">
              <ul>
                <li>동맥점 압박 지혈
                  <ul>
                    <li>팔이나 다리에서의 출혈이 직접 압박으로 지혈되지 않으면, 동맥의 근위부를 압박
                      <ul>
                        <li>상지의 출혈 ⇒ 상완동맥 압박</li>
                        <li>손의 출혈 ⇒ 요골동맥 압박</li>
                        <li>하지의 출혈 ⇒ 대퇴동맥 압박</li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </v-col>
            <v-col cols="12" md="6" sm="12">
              <div class="text-center">
              <img src="/boramae/contents/image/info_first_aid_bleeding_02_01.jpg" alt="상지의 출혈 ⇒ 상완동맥, 압박손의 출혈 ⇒ 요골동맥, 압박하지의 출혈 ⇒ 대퇴동맥 압박" style="width: 97%;">
            </div>
            </v-col>
          </v-row>


          <v-row>
            <v-col cols="12" md="6" sm="12">
              <ul>
                <li>지혈대 이용 지혈
                  <ul>
                    <li>지혈대는 다른 방법으로도 출혈을 멈출 수가 없을 때에 사용되는 방법이다. 신경이나 혈관에 손상을 줄 수 있으며 팔이나 다리에 괴사를 초래할 수 있으므로 일정한 시간마다 지혈대를 풀어서 괴사를 방지하는 것이 중요하다.</li>
                  </ul>
                </li>
              </ul>
            </v-col>
            <v-col cols="12" md="6" sm="12">
              <div class="text-center">
              <img src="/boramae/contents/image/info_first_aid_bleeding_02_02.jpg" alt="출혈부위를 묶는다. 충분히 죈다.지혈대가 풀리지 않도록 마감처리를 잘 한다. 지혈시간을 표시한다." style="width: 97%;">
            </div>
            </v-col>
          </v-row>
        </ul>
      </div>

      <div class="bg-gap"></div>
      <div class="bg-layer-2">
        <p class="font-bold">주의하세요</p>
        지혈대를 이용한 방법은 최후의 수단으로써 지혈이 어려운 절박한 상황에서만 활용한다.
      </div>
    </div>

    <div v-if="tab == 2">
      <div class="bg-body">
        <v-row>
          <v-col cols="12" md="6" sm="12">
            <ul>
              <li>앉은 자세를 유지하게 하여 부상자의 혈압을 낮춘다.</li>
              <li>머리를 약간 앞으로 숙이게 해서 혈액이 목으로 넘어가지 않고 코의 앞부분을 통해 흘러나올 수 있게 한다.</li>
              <li>목뒤로 넘어가게 되면 질식하거나 메스꺼움, 구토 등을 일으킨다.</li>
              <li>엄지와 다른 두 손가락으로 코를 쥐고 5분간 서서히 압박한다.</li>
              <li>코에 타박상을 입은 경우는 코와 뺨에 얼음물 주머니를 올려 지혈을 돕는다.</li>
            </ul>
          </v-col>
          <v-col cols="12" md="6" sm="12">
            <div class="text-center">
            <img src="/boramae/contents/image/info_first_aid_bleeding_03_01.jpg" alt="" style="width: 97%;">
          </div>
          </v-col>
        </v-row>
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
        {value : 1, name : "지혈"},
        {value : 2, name : "코의 출혈(코피)"},
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

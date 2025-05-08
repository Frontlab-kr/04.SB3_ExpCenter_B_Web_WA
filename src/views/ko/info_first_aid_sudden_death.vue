<template>
  <div>
    <h1 class="title-xxlarge">{{ $t('menu_dept_2_040505') }}</h1>
    <div role="tablist" class="d-flex flex-wrap tab_back" style="width: 100%; overflow-x: hidden;">
      <button v-for="(item, i) in zTab" :key="i" :class="(item.value == tab?'sel_box_btn':'nor_box_btn') + ' center_all'" :title="(item.value == tab?'선택됨':'')"
        role="tab" tabindex="0" style="cursor: pointer;" @click="goTab(item)" @keydown.enter="goTab(item)"
        :aria-label="item.name + ' ' + (item.value == tab?`선택됨`:'')"
        @keydown.left="moveTab(i, -1)" @keydown.right="moveTab(i, 1)">
        {{item.name}}
      </button>
    </div>


    <div class="bg-gap-2"></div>
    <div v-if="tab == 0">
      <div class="bg-body">
        <v-row>
          <v-col cols="12" md="6" sm="12">
            <ul>
              <li>돌연사란 글자 그대로 멀쩡한 사람이 아무 이유없이 갑자기 숨지는 것이다.</li>
              <li>돌연사의 원인은 무수히 많다. 그중에서 관(冠)모양으로 심장을 둘러싼 세가닥의 동맥(관상동맥)에 문제가 생겨 발생하는 경우가 대부분이다.</li>
            </ul>
          </v-col>
          <v-col cols="12" md="6" sm="12">
            <div class="text-center">
            <img src="/boramae/contents/image/info_first_aid_sudden_death_01_01.jpg" alt="흡연, 스트레스, 고혈압, 비만, 고지방, 당요" style="width: 97%;">
          </div>
          </v-col>
        </v-row>
      </div>
    </div>

    <div v-if="tab == 1">
      <div class="bg-body">
        <ul>
          <li>돌연사가 발생하는 환자에 대한 응급처치는 심폐소생술외에 별다른 방법이 없다고 보는 것이 옳다. 계단을 오르거나 조금만 움직여도 숨이 차고 가슴이 종종 아플 경우 전문병원을 찾아가는 것이 가장 좋은 방법이나 일상생활에서 아래와 같은 예방수칙을 지키는 것이 곧 돌연사를 예방할 수 있는 지름길이 되고 있다.
            <ul>
              <li>하나, 담배를 피우지 않는다.</li>
              <li>둘, 스트레스를 줄인다.</li>
              <li>셋, 혈압을 조심한다.</li>
              <li>넷, 체중조절을 한다.</li>
              <li>다섯, 콜레스테롤 수치를 줄인다.</li>
              <li>여섯, 당뇨병을 조심한다.</li>
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

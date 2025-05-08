<template>
  <div>
    <h1 class="title-xxlarge">{{ $t('menu_dept_2_040505') }}</h1>
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
        <v-row>
          <v-col cols="12" md="6" sm="12">
            <ul>
              <li>Sudden death refers to a person who appears to be healthy suddenly dying without any apparent reason.</li>
              <li>The causes of sudden death are numerous. Most commonly, it occurs due to issues with the coronary arteries (the three arteries that surround the heart in a crown-like shape).</li>
            </ul>
          </v-col>
          <v-col cols="12" md="6" sm="12">
            <div class="text-center">
              <img src="/boramae/contents/image/info_first_aid_sudden_death_01_01.jpg" alt="Smoking, stress, high blood pressure, obesity, high fat, diabetes" style="width: 97%;">
            </div>
          </v-col>
        </v-row>
      </div>
    </div>

    <div v-if="tab == 1">
      <div class="bg-body">
        <ul>
          <li>For patients experiencing sudden death, cardiopulmonary resuscitation (CPR) is typically the only treatment. It is best to visit a specialized hospital if you experience shortness of breath from climbing stairs or minor movement, or chest pain. However, following these preventive measures in daily life can be a shortcut to preventing sudden death:
            <ul>
              <li>First, do not smoke.</li>
              <li>Second, reduce stress.</li>
              <li>Third, monitor blood pressure.</li>
              <li>Fourth, manage weight.</li>
              <li>Fifth, lower cholesterol levels.</li>
              <li>Sixth, be cautious of diabetes.</li>
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
        {value : 0, name : "Overview"},
        {value : 1, name : "Emergency Response"},
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
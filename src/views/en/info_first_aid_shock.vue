<template>
  <div>
    <h1 class="title-xxlarge">{{ $t('menu_dept_2_040504') }}</h1>
    <div role="tablist" class="d-flex flex-wrap tab_back" style="width: 100%; overflow-x: hidden;">
      <div v-for="(item, i) in zTab" :key="i" :class="(item.value == tab?'sel_box_btn':'nor_box_btn') + ' center_all'" :title="(item.value == tab?'선택됨':'')"
        role="tab" tabindex="0" style="cursor: pointer;" @click="goTab(item)" @keydown.enter="goTab(item)" 
        :aria-label="item.name + ' ' + (item.value == tab?`선택됨`:'')"
        @keydown.left="moveTab(i, -1)" @keydown.right="moveTab(i, 1)"   >
        {{item.name}}
      </div>
    </div>

    <div class="bg-gap-2"></div>
    <h2 class="title-xlarge">What is Shock?</h2>
    <div class="bg-layer-2">
      Shock refers to "a malfunction of the circulatory system caused by insufficient delivery of oxygenated blood to various parts of the body," and occurs when there is a loss of blood in the tissues.
    </div>
    <div class="bg-gap-2"></div>

    <div v-if="tab == 0">
      <div class="bg-body">
        <v-row>
          <v-col cols="12" md="6" sm="12">
            <ul>
              <li>May show changes in consciousness such as anxiety, tension, and nervousness.</li>
              <li>Skin, lips, and nails may become pale, cold, or moist.</li>
              <li>Nausea or vomiting may occur.</li>
              <li>In the early stages of shock, breathing and pulse may be rapid.</li>
              <li>The time for capillary refill may be delayed.</li>
              <li>In severe shock, the person may be unresponsive.</li>
            </ul>
          </v-col>
          <v-col cols="12" md="6" sm="12">
            <div class="text-center">
              <img src="/boramae/contents/image/info_first_aid_shock_01_01.jpg" alt="Normal state - within 2-3 seconds / Shock state - after 2-3 seconds" style="width: 97%;">
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
              <li>Keep the patient lying down if possible.</li>
              <li>Raise the patient's legs by 15-25 cm.
                <ul><li>Except for head injuries or patients with stroke (cerebrovascular accident)</li></ul>
              </li>
            </ul>
          </v-col>
          <v-col cols="12" md="6" sm="12">
            <div class="text-center">
              <img src="/boramae/contents/image/info_first_aid_shock_02_01.jpg" alt="Raise the patient's legs by 15-25 cm and cover with a blanket or clothing to prevent heat loss." style="width: 97%;">
            </div>
          </v-col>
        </v-row>

        <ul>
          <li>If the patient is unconscious or vomiting, place them on their side.</li>
          <li>For chest injuries, breathing difficulties, or heart conditions, place the patient in a semi-sitting position.</li>
          <li>Cover the patient with a blanket or clothing on the ground to prevent heat loss.</li>
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
        {value : 0, name : "Symptoms"},
        {value : 1, name : "First Aid"},
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
<template>
  <div>
    <h1 class="title-xxlarge">{{ $t('menu_dept_2_040508') }}</h1>
    <div role="tablist" class="d-flex flex-wrap tab_back" style="width: 100%; overflow-x: hidden;">
      <div v-for="(item, i) in zTab" :key="i" :class="(item.value == tab?'sel_box_btn':'nor_box_btn') + ' center_all'" :title="(item.value == tab?'선택됨':'')"
        role="tab" tabindex="0" style="cursor: pointer;" @click="goTab(item)" @keydown.enter="goTab(item)"
        :aria-label="item.name + ' ' + (item.value == tab?`선택됨`:'')"
        @keydown.left="moveTab(i, -1)" @keydown.right="moveTab(i, 1)"   >
        {{item.name}}
      </div>
    </div>

    <div class="bg-gap-2"></div>

    <div v-if="tab == 0">
      <div class="bg-layer-2">
        Symptoms of drug poisoning include vomiting, difficulty breathing, abdominal pain, sweating, altered consciousness, and convulsions.
      </div>
      <div class="bg-body">
        <div class="bg-gap-2"></div>
        <v-row>
          <v-col cols="12" md="9" sm="12">
            <ul>
              <li>Check consciousness and maintain the airway.</li>
              <li>If the patient is unconscious, check their breathing and pulse.</li>
              <li>If the patient has ingested a toxic substance, give milk and water to induce vomiting or neutralize the poison.</li>
              <li>However, do not induce vomiting if the patient is unconscious or convulsing.</li>
              <li>Collect any suspected drug, chemical, or medication bottles and bring them to the hospital in a plastic bag.</li>
              <li>For drug poisoning, rapid removal of the drug in the early stages is crucial for saving the patient's life.</li>
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
        Food poisoning from spoiled food can cause symptoms such as fever, vomiting, diarrhea, abdominal pain, and rash.
      </div>
      <div class="bg-gap-2"></div>
      <div class="bg-body">
        <v-row>
          <v-col cols="12" md="6" sm="12">
            <ul>
              <li>The onset of food poisoning depends on the toxicity and quantity of bacteria consumed, and distinguishing symptoms of food poisoning from other gastrointestinal issues can be challenging.</li>
              <li>Therefore, it is advisable to quickly transport the patient to the hospital and report to emergency services (119).</li>
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
              <li>Remove a stinger by pressing around the area with a hard card or similar object.</li>
              <li>Apply a cold compress to relieve pain and reduce swelling.</li>
              <li>If pain or swelling persists, transport the patient to the hospital.</li>
              <li>Various types of insects with venom can cause poisoning through stings or bites.</li>
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
          <li>If bitten by a dog, which may have rabies, confine the animal and observe it for 10 days.</li>
          <li>Clean the wound thoroughly with soap and water and rinse immediately with clean water.</li>
          <li>Apply pressure to stop bleeding and treat the wound.</li>
          <li>Seek medical treatment and receive a rabies vaccine if necessary.</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: 0,
      zTab: [
        {value: 0, name: "Drug Poisoning"},
        {value: 1, name: "Food Poisoning"},
        {value: 2, name: "Bee Stings"},
        {value: 3, name: "Dog Bites"},
      ],
    }
  },

  components: {
  },

  mounted() {
  },

  beforeUnmount() {
  },

  methods: {
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
<template>
  <div>
    <h1 class="title-xxlarge">{{ $t('menu_dept_2_040502') }}</h1>

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
      <h2 class="title-xlarge">Causes</h2>
      <div class="bg-body">
        Foreign objects can include food (chunks of meat, rice cakes, etc.), toys, candy, and more, which can block the airway and cause difficulty breathing.
      </div>

      <div class="bg-gap"></div>
      <h2 class="title-xlarge">Symptoms</h2>
      <div class="bg-body">
        <v-row>
          <v-col cols="12" md="8" sm="12">
            <ul>
              <li>The person may try to cough while holding their throat with both hands.</li>
              <li>Severe wheezing (a ‘whistling’ sound) may be heard from the throat.</li>
              <li>The face may turn blue (cyanosis).</li>
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
        <p class="font-bold">Note</p>
        If the airway is completely blocked, the person may lose consciousness within 3 to 4 minutes, and after 4 to 6 minutes, permanent brain damage may occur, putting their life at risk. Therefore, provide emergency treatment as quickly as possible.
      </div>
    </div>

    <div v-if="tab == 1">
      <h2 class="title-xlarge">If the Person is Standing and Conscious</h2>
      <div class="bg-body">
        <v-row>
          <v-col cols="12" md="7" sm="12">
            <ul>
              <li>If the person can talk: Encourage coughing.</li>
              <li>If the person cannot talk: Call emergency services (119) and perform the Heimlich maneuver.</li>
              <li>Repeat until the person regains consciousness or the object is expelled.</li>
            </ul>
          </v-col>

          <v-col cols="12" md="5" sm="12">
            <div class="text-center">
              <img src="/boramae/contents/image/info_first_aid_choking_02_01.jpg" alt="1. Place a fist between the navel and the sternum. 2. Cover with the other hand. 3. Push strongly upward and backward." style="width: 97%;">
            </div>
          </v-col>
        </v-row>
      </div>

      <div class="bg-gap-2"></div>
      <div class="bg-layer-2">
        <p class="font-bold">Note</p>
        If the person can make any sound, encouraging coughing is the best approach. For pregnant or obese patients, apply pressure to the chest rather than the upper abdomen.
      </div>

      <div class="bg-gap"></div>
      <h2 class="title-xlarge">If the Person is Unconscious: Perform CPR (30:2)</h2>
      <div class="bg-body">
        <v-row>
          <v-col cols="12" md="7" sm="12">
            <ul>
              <li>Before giving rescue breaths, open the mouth to check for foreign objects.</li>
              <li>Remove foreign objects only if they are visible.</li>
            </ul>
          </v-col>
          <v-col cols="12" md="5" sm="12">
            <div class="text-center">
              <img src="/boramae/contents/image/info_first_aid_choking_02_02.jpg" alt="If only one rescuer is present, the ratio of chest compressions to rescue breaths is 30:2. If there are two rescuers, one performs chest compressions while the other performs rescue breaths. Alternate every 5 cycles (every 2 minutes)." style="width: 97%;">
            </div>
          </v-col>
        </v-row>
      </div>

      <div class="bg-gap"></div>
      <h2 class="title-xlarge">Opening the Mouth During CPR</h2>
      <div class="bg-body">
        <v-row>
          <v-col cols="12" md="7" sm="12">
            <ul>
              <li>To remove a foreign object, first open the patient's mouth.</li>
              <li>Use the finger sweep technique to open the mouth.</li>
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
      <h2 class="title-xlarge">Removing Foreign Objects</h2>
      <div class="bg-body">
        <v-row>
          <v-col cols="12" md="7" sm="12">
            <ul>
              <li>Sweep the inside of the mouth to remove objects.</li>
              <li>Remove only if visible.</li>
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
      <h2 class="title-xlarge">For Infants (Under 1 Year Old)</h2>

      <div class="d-flex flex-wrap text-center">
        <div class="text-center ma-1" style="width : 210px;">
          <img src="/boramae/contents/image/info_first_aid_choking_02_05.jpg" alt="" style="width: 210px;">
          <div class="links-small">Give 5 back blows.</div>
        </div>
        <div class="text-center ma-1" style="width : 210px;">
          <img src="/boramae/contents/image/info_first_aid_choking_02_06.jpg" alt="" style="width: 210px;">
          <div class="links-small">Perform 5 chest thrusts.</div>
        </div>
        <div class="text-center ma-1" style="width : 433px;">
          <img src="/boramae/contents/image/info_first_aid_choking_02_07.jpg" alt="" style="width: 433px;">
          <div class="links-small">If unconscious, perform CPR (depth 1/3 to 1/2 of the chest, 30:2 compressions)</div>
        </div>
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
        {value: 0, name: "Causes and Symptoms"},
        {value: 1, name: "First Aid"},
      ],
    };
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
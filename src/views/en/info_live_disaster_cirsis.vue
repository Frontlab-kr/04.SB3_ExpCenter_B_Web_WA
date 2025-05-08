<template>
  <div>
    <h1 class="title-xxlarge">{{ $t('menu_dept_2_040401') }}</h1>
    <div role="tablist" class="d-flex flex-wrap tab_back" style="width: 100%; overflow-x: hidden;">
      <button v-for="(item, i) in zTab" :key="i" :class="(item.value == tab?'sel_box_btn':'nor_box_btn') + ' center_all'" :title="(item.value == tab?'선택됨':'')"
        role="tab" tabindex="0" style="cursor: pointer;" @click="goTab(item)" @keydown.enter="goTab(item)"
        :aria-label="item.name + ' ' + (item.value == tab?`선택됨`:'')"
        @keydown.left="moveTab(i, -1)" @keydown.right="moveTab(i, 1)">
        {{item.name}}
      </button>
    </div>

    <div v-if="tab == 0">
      <div class="bg-gap-2"></div>
      <h2 class="title-xlarge">How to Detect a Fire</h2>

      <div class="d-flex">
        <v-row>
          <v-col cols="12" md="6" sm="12">
            <ul>
              <li>It is crucial to detect a fire as soon as possible.
                <ul>
                  <!-- <li>눈 : 연기가 보이고 따가워져요.</li>
                  <li>귀 : 사람들의 아우성 소리와 비상 벨소리가 들려요.</li>
                  <li>코 : 무엇인가 타는 냄새가 나요.</li>
                  <li>입 : 불이난 것을 알게되면 불이야라고 큰소리로</li>
                  <li>외쳐서 다른 사람들에게 알려요.</li>
                  <li>피부 : 뜨거움을 느껴요.</li> -->

                  <li>Eyes: You see smoke and it feels irritating.</li>
                  <li>Ears: You hear people shouting and emergency alarms.</li>
                  <li>Nose: You smell something burning.</li>
                  <li>Mouth: Shout "Fire!" loudly when you realize there's a fire.</li>
                  <li>Skin: You feel heat.</li>
                </ul>
              </li>
            </ul>
          </v-col>
          <v-col cols="12" md="6" sm="12">
            <div class="text-center">
              <img src="/boramae/contents/image/info_live_disaster_cirsis_01.jpg" alt="Illustration of a child experiencing fire-related sensory signals: Eyes see smoke and feel irritation; Ears hear people's screams and emergency alarms; Nose smells something burning; Mouth shouts 'Fire!' loudly to alert others; Skin feels the heat." style="width: 80%;">
              <div>
                [Image 1] How can we detect a fire?
              </div>
            </div>
          </v-col>
        </v-row>
      </div>

      <div class="bg-gap-2"></div>
      <h2 class="title-xlarge">Planning Your Evacuation</h2>

      <div class="d-flex">
        <v-row>
          <v-col cols="12" md="6" sm="12">
            <ul>
              <li>Plan an evacuation route at home and conduct evacuation drills with your family.</li>
              <li>Knowing your evacuation plan can protect your life and property in case of a fire.</li>
              <li>Always check the location of the nearest emergency exit in any building or location.</li>
            </ul>
          </v-col>
          <v-col cols="12" md="6" sm="12">
            <div class="text-center">
              <img src="/boramae/contents/image/info_live_disaster_cirsis_02.jpg" alt="A floor plan showing evacuation routes to the emergency exit inside a building. Red arrows indicate the evacuation paths from each room to the emergency exit." style="width: 80%;">
              <div>
                [Image 2] Where are the emergency exits?
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>

    <div v-if="tab == 1">
      <div class="bg-gap-2"></div>
      <h2 class="title-xlarge">Evacuation is the Top Priority in Case of Fire</h2>

      <div class="bg-body">
        <ul>
          <li>What should you do when a fire breaks out?</li>
        </ul>
        <div class="bg-gap-3"></div>

        <div class="d-flex flex-wrap text-center">
          <div class="text-center" style="width : 210px;">
            <img src="/boramae/contents/image/info_live_disaster_cirsis_03.jpg" alt="Notify those around you loudly." style="width: 97%;">
            <div>Notify those around you loudly.</div>
          </div>
          <div class="text-center" style="width : 210px;">
            <img src="/boramae/contents/image/info_live_disaster_cirsis_04.jpg" alt="Evacuate quickly." style="width: 97%;">
            <div>Evacuate quickly.</div>
          </div>
          <div class="text-center" style="width : 210px;">
            <img src="/boramae/contents/image/info_live_disaster_cirsis_05.jpg" alt="Call 119." style="width: 97%;">
            <div>Call 119.</div>
          </div>
          <div class="text-center" style="width : 210px;">
            <img src="/boramae/contents/image/info_live_disaster_cirsis_06.jpg" alt="Cooperate with others to use extinguishers and fire hydrants for initial firefighting." style="width: 97%;">
            <div class="links-small text-left">Cooperate with others to use extinguishers and fire hydrants for initial firefighting.</div>
          </div>
        </div>
      </div>

      <div class="bg-gap"></div>
      <h2 class="title-xlarge">What should you do during a fire?</h2>
      <div class="bg-body">
        <ul>
          <li>Quickly inform those around you about the fire.
            <ul><li>Scream "Fire!" or press the emergency button and evacuate.</li></ul>
          </li>

          <div class="bg-gap-2"></div>
          <li>Evacuate quickly from the building (home).
            <ul>
              <li>Evacuate from the fire location as quickly as possible.</li>
              <li>Do not hide out of fear.</li>
              <li>Do not waste time collecting personal belongings.</li>
              <li>Once outside, do not re-enter the fire area.</li>
              <li>Use emergency exits instead of elevators.</li>
            </ul>
          </li>

          <div class="bg-gap-2"></div>
          <li>If you have reached a safe place, call 119.
            <ul>
              <li>Clearly state the location of the fire (address or nearby large building names).</li>
              <li>Know the location of nearby large buildings so firefighters can easily find you.</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="tab == 2">
      <div class="bg-gap-2"></div>
      <h2 class="title-xlarge">Breathing in Hot Smoke is Extremely Dangerous</h2>

      <div class="bg-body">
        <ul>
          <li>How to escape safely from smoke</li>
        </ul>
        <div class="bg-gap-3"></div>

        <div class="d-flex flex-wrap text-center">
          <div class="text-center" style="width : 210px;">
            <img src="/boramae/contents/image/info_live_disaster_cirsis_07.jpg" alt="Protect your nose and mouth with a cloth or clothing." style="width: 97%;">
            <div class="links-small text-left">Protect your nose and mouth with a cloth or clothing.</div>
          </div>
          <div class="text-center" style="width : 210px;">
            <img src="/boramae/contents/image/info_live_disaster_cirsis_08.jpg" alt="Keep your posture as low as possible." style="width: 97%;">
            <div>Keep your posture as low as possible.</div>
          </div>
          <div class="text-center" style="width : 210px;">
            <img src="/boramae/contents/image/info_live_disaster_cirsis_09.jpg" alt="Hold onto the wall with one hand." style="width: 97%;">
            <div>Hold onto the wall with one hand.</div>
          </div>
          <div class="text-center" style="width : 210px;">
            <img src="/boramae/contents/image/info_live_disaster_cirsis_10.jpg" alt="Quickly evacuate towards the emergency exit." style="width: 97%;">
            <div class="links-small text-left">Quickly evacuate towards the emergency exit.</div>
          </div>
        </div>
      </div>

      <div class="bg-gap"></div>
      <h2 class="title-xlarge">How to Avoid Breathing in Smoke?</h2>
      <div class="bg-body">
        <div class="ml-3 mb-3">
          The main cause of death during a fire is suffocation from smoke. Smoke contains toxic substances that can damage the airways and lungs or be fatal, so inhaling smoke is very dangerous.
        </div>
        <ul>
          <li>How to avoid smoke
            <ul>
              <li>During a fire, smoke is located in the upper layers of the room, while clean air is between 30cm to 60cm from the floor. So, if smoke is visible or smells, use clothing to cover your nose and mouth, keep low, and quickly exit the building.</li>
              <li>When evacuating, always close fire doors and exit the building. Closing doors can reduce the spread of heat and smoke, thus buying you more time.</li>
              <li>Before opening doors or windows, touch the door handle with the back of your hand. If the handle is hot, it indicates that there may be fire outside, so use another exit if possible.</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="tab == 3">
      <div class="bg-gap-2"></div>
      <h2 class="title-xlarge">What to Do When You Cannot Evacuate Due to Fire Outside the Door?</h2>

      <div class="bg-body">
        <div class="d-flex flex-wrap text-center">
          <div class="text-center" style="width : 270px;">
            <img src="/boramae/contents/image/info_live_disaster_cirsis_11.jpg" alt="If the door handle is hot, do not go outside." style="width: 97%;">
            <div class="links-small text-left">If the door handle is hot, do not go outside.</div>
          </div>
          <div class="text-center" style="width : 270px;">
            <img src="/boramae/contents/image/info_live_disaster_cirsis_12.jpg" alt="Block the gaps around windows or doors with towels." style="width: 97%;">
            <div class="links-small text-left">Block the gaps around windows or doors with towels.</div>
          </div>
          <div class="text-center" style="width : 270px;">
            <img src="/boramae/contents/image/info_live_disaster_cirsis_13.jpg" alt="Wave a towel from the window to signal for help." style="width: 97%;">
            <div class="links-small text-left">Wave a towel from the window to signal for help.</div>
          </div>
        </div>
      </div>

      <div class="bg-gap"></div>
      <h2 class="title-xlarge">What to Do if You Cannot Evacuate Due to Fire or Smoke?</h2>
      <div class="bg-body">
        <div class="ml-3 mb-3">
          The main cause of death during a fire is suffocation from smoke. Smoke contains toxic substances that can damage the airways and lungs or be fatal, so inhaling smoke is very dangerous.
        </div>
        <ul>
          <li>If the door handle is hot, you should stay inside and wait.
            <ul><li>A hot handle indicates that there may be fire outside, so do not open the door. Look for other exits, or if none are available, calmly follow these steps:</li></ul>
          </li>

          <div class="bg-gap-2"></div>
          <li>Block all gaps to prevent smoke from entering.
            <ul>
              <li>Block gaps around windows or doors with wet blankets, sheets, or towels.</li>
              <li>Cover your nose and mouth with a wet cloth or towel and keep a low posture to avoid smoke inhalation.</li>
            </ul>
          </li>

          <div class="bg-gap-2"></div>
          <li>Signal for help through the window.
            <ul>
              <li>Wave visible towels or clothing to signal for help.</li>
              <li>Be patient while waiting for rescue and avoid jumping out of the window.</li>
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
      tab: 0,
      zTab: [
        {value: 0, name: "Fire Detection and Evacuation Tips"},
        {value: 1, name: "Actions to Take When a Fire Occurs"},
        {value: 2, name: "Tips for Escaping Smoke"},
        {value: 3, name: "What to Do When Trapped in a Burning Building"},
      ]
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

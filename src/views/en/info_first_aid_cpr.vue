<template>
  <div>
    <h1 class="title-xxlarge">{{ $t('menu_dept_2_040501') }}</h1>

    <div role="tablist" class="d-flex flex-wrap tab_back" style="width: 100%; overflow-x: hidden;">
      <div v-for="(item, i) in zTab" :key="i" :class="(item.value == tab?'sel_box_btn':'nor_box_btn') + ' center_all'" :title="(item.value == tab?'선택됨':'')"
        role="tab" tabindex="0" style="cursor: pointer;" @click="goTab(item)" @keydown.enter="goTab(item)" 
        :aria-label="item.name + ' ' + (item.value == tab?`선택됨`:'')"
        @keydown.left="moveTab(i, -1)" @keydown.right="moveTab(i, 1)"   >
        {{item.name}}
      </div>
    </div>

    <div class="bg-gap-2"></div>
    <h2 class="title-xlarge">What is Cardiopulmonary Resuscitation (CPR)?</h2>
    <div class="bg-layer-2">
      Cardiopulmonary resuscitation (CPR) involves artificially providing breaths and compressing the chest to send oxygenated blood to the brain when the heart stops beating and the person is not breathing.
    </div>
    <div class="bg-gap-2"></div>

    <div v-if="tab == 0">
      <div class="bg-body">
        <v-row>
          <v-col cols="12" md="6" sm="12">
            <ul><li>Once cardiac arrest occurs, the risk of death increases every minute that passes. Brain damage begins after 5 minutes, and the chance of survival is slim after 10 minutes. Therefore, if a witness to a cardiac arrest performs CPR immediately, it can double or triple the chances of survival.</li></ul>
          </v-col>
          <v-col cols="12" md="6" sm="12">
            <div class="text-center">
              <img src="/boramae/contents/image/info_first_aid_cpr_01_01.jpg" alt="0-4 minutes: Performing CPR reduces the risk of brain damage. / 4-6 minutes: Increased risk of brain damage / 6-10 minutes: Likely brain damage / Over 10 minutes: Severe brain damage or brain death." style="width: 97%;">
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
              <li>Check consciousness: "Hello, are you okay?"
                <ul><li>Gently tap or shake the patient's shoulders and shout to check their level of consciousness.</li></ul>
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
              <li>Call for help: "Please call 119."
                <ul>
                  <li>Ask someone nearby to call 119.</li>
                  <li>If no one is around, call 119 yourself.</li>
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
              <li>Positioning: Log Roll Technique
                <ul><li>When repositioning, do it carefully to align the head, neck, and body like rolling a log, especially if trauma is suspected.</li></ul>
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
              <li>The depth of chest compressions should be 1/3 to 1/2 of the chest cavity. Compress with one or both hands, and follow the same procedures as adult CPR.</li>
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
        <v-row>
          <v-col cols="12" md="8" sm="12">
            <ul>
              <li>
                Check consciousness
                <ul><li>Stimulate the baby's feet to check for consciousness.</li></ul>
              </li>

              <div class="bg-gap-2"></div>
              <li>
                Call for help
                <ul><li>Call 119 immediately.</li></ul>
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
            Open the airway
            <ul><li>The baby's neck is very flexible, so perform head tilt and chin lift gently, avoiding excessive extension.</li></ul>
          </li>

          <div class="bg-gap-2"></div>
          <li>
            Check breathing
            <ul><li>Check for breathing by watching, listening, and feeling.</li></ul>
          </li>
        </ul>

        <div class="bg-gap-2"></div>
        <v-row>
          <v-col cols="12" md="8" sm="12">
            <ul>
              <li>
                Chest compressions
                <ul>
                  <li>Place the baby on a firm surface.</li>
                  <li>Place two fingers just below the imaginary line connecting the nipples on the sternum.</li>
                  <li>Compress at a rate of 100 per minute to a depth of 1/3 to 1/2 of the chest depth.</li>
                  <li>Perform compressions and breaths in a 30:2 ratio until the emergency services arrive.</li>
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
              <li>Defibrillation is a treatment method that delivers an electric current through the chest wall to the heart to correct fatal arrhythmias such as ventricular fibrillation. The device used for defibrillation is called an Automated External Defibrillator (AED). AEDs are designed to be user-friendly, and they provide instructions based on the situation, making them easy to use after proper training.</li>
            </ul>
          </v-col>

          <v-col cols="12" md="4" sm="12">
            <div class="text-center">
              <img src="/boramae/contents/image/info_first_aid_cpr_06_01.jpg" alt="" style="width: 97%;">
            </div>
          </v-col>
        </v-row>

        <div class="bg-gap"></div>
        <h2 class="title-xlarge">How to Use an Automated External Defibrillator (AED) and CPR</h2>

        <div class="bg-body">
          <ul>
            <li>
              When a cardiac arrest occurs, perform CPR as per the sequence and use the AED as soon as it is ready.
              <ul>
                <li>Press the power button.</li>
                <li>Attach the pads.
                  <ul>
                    <li>Right below the center of the collarbone</li>
                    <li>Between the left nipple and armpit
                      <div class="text-center ma-2">
                        <img src="/boramae/contents/image/info_first_aid_cpr_06_02.jpg" alt="" style="width: 450px;">
                      </div>
                    </li>
                    <li>Stand clear while analyzing.
                      <ul>
                        <li>If there is an analysis button, press it after ensuring everyone is away from the patient.</li>
                      </ul>
                    </li>
                    <li>Listen to the ECG rhythm and message.</li>
                    <li>If a shockable rhythm (ventricular fibrillation) is detected and the charge is complete, press the shock button.</li>
                    <li>Immediately resume CPR.
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
          <p class="font-bold">Note:</p>
          Ensure to dry the patient if they are wet. Make sure everyone is clear of the patient before applying the analysis and shock buttons. If the patient has chest hair, quickly remove it before applying the pads.
        </div>
        <p class="font-bold mt-2" v-html="'※ According to the revised Emergency Medical Service Act <Dec 14, 2007 revised, June 15, 2008 enforced>, facilities like rail cars, airports, ships, and multi-use facilities are required to be equipped with emergency equipment such as AEDs, and general public can use them after training.'"></p>

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
        {value : 0, name : "Importance of CPR"},
        {value : 1, name : "Steps of CPR"},
        {value : 2, name : "How to Perform CPR"},
        {value : 3, name : "CPR for Children (1-8 years)"},
        {value : 4, name : "CPR for Infants (Under 1 year)"},
        {value : 5, name : "Using an Automated External Defibrillator (AED)"},
      ],

      zCPR : [
        {step : 1, target : "Patient Found", script : "Discover the emergency patient", caption : ""},
        {step : 2, target : "Check Consciousness", script : `"Hello? Are you okay?"`, caption : "Gently tap the patient's shoulders to check consciousness."},
        {step : 3, target : "Call for Help", script : `"Please call 119!"`, caption : "Call 119 or ask others to call for help."},
        {step : 4, target : "Chest Compressions", script : "At least 100 compressions per minute, 30 times", caption : "Compress at least 5 cm deep and allow the chest to fully recoil"},
        {step : 5, target : "Open Airway", script : "Tilt head and lift chin", caption : "Use head tilt-chin lift method"},
        {step : 6, target : "Artificial Respiration", script : "Mouth-to-mouth method", caption : "Mouth-to-mouth ventilation: Inspiration:Expiration = 50:50"},
        {step : 7, target : "Artificial Respiration and Chest Compressions", script : "Continue until EMS arrives", caption : ""},
      ],
    }
  },

  components: {},

  mounted() {},

  beforeUnmount(){},

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
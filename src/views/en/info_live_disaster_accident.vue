<template>
  <div>
    <h1 class="title-xxlarge">{{ $t('menu_dept_2_040402') }}</h1>
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
      <h2 class="title-xlarge">Fire Extinguisher Usage</h2>

      <div class="bg-body">
        <ul>
          <li>Place the fire extinguisher on the ground, grasp the body of the extinguisher with one hand, and use the other hand to pull out the safety pin.</li>
          <li>With the wind at your back, pull out the hose and aim it at the fire.</li>
          <li>Hold the bottom part of the handle and approach the fire closely, then grip the handle firmly.</li>
          <li>Spray evenly from the edge of the flames, sweeping as if with a broom.</li>
        </ul>
      </div>

      <div class="d-flex flex-wrap text-center">
        <div class="text-center" style="width : 210px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_01.jpg" alt="" style="width: 97%;">
          <div>Pull out the safety pin.</div>
        </div>
        <div class="text-center" style="width : 210px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_02.jpg" alt="" style="width: 97%;">
          <div>Aim the hose at the fire.</div>
        </div>
        <div class="text-center" style="width : 210px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_03.jpg" alt="" style="width: 97%;">
          <div>Grip the handle.</div>
        </div>
        <div class="text-center" style="width : 210px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_04.jpg" alt="" style="width: 97%;">
          <div class="links-small text-left">Spray evenly.</div>
        </div>
      </div>

      <div class="bg-gap"></div>
      <h2 class="title-xlarge">Creating an Evacuation Plan</h2>
      <div class="bg-body">
        <ul>
          <li>Press the emergency button on the fire hydrant.</li>
          <li>Pull the fire hose from the fire hydrant to the fire scene.</li>
          <li>Slowly turn the valve on the hydrant clockwise to open it.</li>
          <li>Turn the nozzle to spray water, starting from the edge of the flames and moving towards the center to extinguish the fire.</li>
          <li>After extinguishing the fire, close the valve and properly coil the hose back into the hydrant box.</li>
        </ul>
      </div>

      <div class="d-flex flex-wrap text-center">
        <div class="text-center" style="width : 210px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_05.jpg" alt="" style="width: 97%;">
          <div>Press the emergency button on the fire hydrant.</div>
        </div>
        <div class="text-center" style="width : 210px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_06.jpg" alt="" style="width: 97%;">
          <div>Extend the hose to the fire scene.</div>
        </div>
        <div class="text-center" style="width : 210px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_07.jpg" alt="" style="width: 97%;">
          <div>Open the valve.</div>
        </div>
        <div class="text-center" style="width : 210px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_08.jpg" alt="" style="width: 97%;">
          <div class="links-small text-left">Turn the nozzle to spray water.</div>
        </div>
      </div>

      <div class="bg-gap"></div>
      <h2 class="title-xlarge">Essential Fire Safety Facilities</h2>
      <div class="bg-body">
        <ul>
          <li>There are various facilities needed in a fire, but the essential ones to be aware of are listed below.</li>
        </ul>
      </div>

      <div class="d-flex flex-wrap text-center">
        <div class="text-center" style="width : 210px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_09.jpg" alt="" style="width: 97%;">
          <div class="links-small text-left">
            <p class="font-bold">Emergency Exit Sign</p>
            Installed at exits leading to the ground and in stairwells with direct access.
          </div>
        </div>
        <div class="text-center" style="width : 210px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_10.jpg" alt="" style="width: 97%;">
          <div class="links-small text-left">
            <p class="font-bold">Pathway Guidance Light</p>
            Installed in corridors and staircases to guide evacuation routes.
          </div>
        </div>
        <div class="text-center" style="width : 210px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_11.jpg" alt="" style="width: 97%;">
          <div class="links-small text-left">
            <p class="font-bold">Fire Alarm / Emergency Bell</p>
            Alerts to indicate a fire through an audible alarm.
          </div>
        </div>
        <div class="text-center" style="width : 210px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_12.jpg" alt="" style="width: 97%;">
          <div class="links-small text-left">
            <p class="font-bold">Visual Alarm</p>
            Provides visual alerting through flashing lights instead of an audible alarm.
          </div>
        </div>
      </div>

      <div class="bg-gap"></div>
      <h2 class="title-xlarge">Escape Ladder Usage</h2>
      <div class="bg-body">
        <ul>
          <li>Hook the escape ladder ring onto the support bracket and lock it.</li>
          <li>Push the support bracket out the window and throw the rope (cord).</li>
          <li>Put on the escape ladder belt up to chest height and tighten it.</li>
          <li>Descend safely while holding onto the wall.</li>
        </ul>
      </div>

      <div class="bg-image">
        <img src="/boramae/contents/image/info_live_disaster_accident_13.jpg" alt="" style="width: 95%;">
      </div>
    </div>

    <div v-if="tab == 1">
      <div class="bg-gap-2"></div>
      <h2 class="title-xlarge">Fires Caused by Carelessness and Improper Smoking Habits Are Increasing</h2>

      <div class="d-flex flex-wrap text-center">
        <div class="text-center" style="width : 270px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_14.jpg" alt="" style="width: 97%;">
          <div>Do not smoke while intoxicated and lying down.</div>
        </div>
        <div class="text-center" style="width : 270px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_15.jpg" alt="" style="width: 97%;">
          <div>Smoke only in designated areas.</div>
        </div>
        <div class="text-center" style="width : 270px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_16.jpg" alt="" style="width: 97%;">
          <div>Fires can start from carelessly discarded cigarette butts.</div>
        </div>
      </div>

      <div class="bg-gap"></div>
      <h2 class="title-xlarge">Causes and Prevention of Fires from Cigarette Butts</h2>
      <div class="bg-body">
        <ul>
          <li>Causes of Cigarette Fires</li>
          <ul>
            <li>Discarding cigarette butts anywhere</li>
            <li>Falling asleep while smoking in bed</li>
            <li>Throwing cigarette butts that are not fully extinguished into trash cans</li>
            <li>Deliberately discarding cigarette butts in flammable areas</li>
          </ul>

          <div class="bg-gap-2"></div>
          <li>Prevention Tips</li>
          <ul>
            <li>Smoke only in designated areas.</li>
            <li>Place a small amount of water in ashtrays.</li>
            <li>Absolutely avoid smoking in bed.</li>
          </ul>
        </ul>
      </div>
    </div>

    <div v-if="tab == 2">
      <div class="bg-gap-2"></div>
      <h2 class="title-xlarge">The Kitchen, Especially, Is Exposed to Various Hazards in the Home</h2>

      <div class="d-flex flex-wrap text-center">
        <div class="text-center" style="width : 270px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_17.jpg" alt="" style="width: 97%;">
          <div>Do not leave the kitchen unattended while cooking.</div>
        </div>
        <div class="text-center" style="width : 270px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_18.jpg" alt="" style="width: 97%;">
          <div class="links-small text-left">There are many hazards such as boiling water, knives, and cleaning agents.</div>
        </div>
        <div class="text-center" style="width : 270px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_19.jpg" alt="" style="width: 97%;">
          <div>Observe hygiene rules in the kitchen.</div>
        </div>
      </div>

      <div class="bg-gap"></div>
      <h2 class="title-xlarge">Tips for Preventing Kitchen Fires and Safety Accidents</h2>
      <div class="bg-body">
        <ul>
          <li>Preventing Kitchen Fires</li>
          <ul>
            <li>Never leave the kitchen unattended while cooking.</li>
            <li>Do not place flammable items near the gas stove.</li>
            <li>Do not put metal materials (such as aluminum foil) in the microwave.</li>
            <li>Unplug electrical appliances when not in use.</li>
          </ul>

          <div class="bg-gap-2"></div>
          <li>Preventing Kitchen Accidents</li>
          <ul>
            <li>Ensure that oil or contents do not spill when using frying pans or deep fryers.</li>
            <li>Do not leave the stove unattended when pots are hot.</li>
            <li>Use cleaning agents with safety caps and store knives in safe places.</li>
            <li>Maintain strict kitchen hygiene to prevent food poisoning.</li>
          </ul>
        </ul>
      </div>
    </div>

    <div v-if="tab == 3">
      <div class="bg-gap-2"></div>
      <h2 class="title-xlarge">Electricity Safety Accidents Can Occur in These Situations</h2>

      <div class="d-flex flex-wrap text-center">
        <div class="text-center" style="width : 270px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_20.jpg" alt="" style="width: 97%;">
          <div>Touching electrical products with wet hands</div>
        </div>
        <div class="text-center" style="width : 270px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_21.jpg" alt="" style="width: 97%;">
          <div>Touching wires submerged in water</div>
        </div>
        <div class="text-center" style="width : 270px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_22.jpg" alt="" style="width: 97%;">
          <div>Pulling out a plug while holding the wire</div>
        </div>
        <div class="text-center" style="width : 270px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_23.jpg" alt="" style="width: 97%;">
          <div>Improperly plugged-in plug</div>
        </div>
        <div class="text-center" style="width : 270px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_24.jpg" alt="" style="width: 97%;">
          <div>Plugging multiple plugs into one outlet</div>
        </div>
        <div class="text-center" style="width : 270px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_25.jpg" alt="" style="width: 97%;">
          <div>Wire caught in a door gap</div>
        </div>
      </div>

      <div class="bg-gap-2"></div>
      <div class="bg-body">
        <ul>
          <li>Preventive Measures for Electrical Accidents</li>
          <ul>
            <li>Stay near electric heating devices while using them.</li>
            <li>Do not use electrical products with wet hands.</li>
            <li>Ensure wires are not pinched in door gaps or furniture.</li>
            <li>Do not approach wires submerged in water.</li>
            <li>Unplug electrical appliances when not in use.</li>
            <li>When plugging into an outlet, ensure the plug is fully inserted, and when unplugging, do not pull on the wire but grip the plug and pull it out.</li>
            <li>Avoid connecting multiple plugs to a single outlet in a daisy-chain fashion.</li>
          </ul>
        </ul>
      </div>
    </div>

    <div v-if="tab == 4">
      <div class="bg-gap-2"></div>
      <h2 class="title-xlarge">Gas is convenient to use, but improper use can lead to explosions and fires. It's important to know how to use it safely.</h2>

      <div class="d-flex flex-wrap text-center">
        <div class="text-center" style="width : 270px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_26.jpg" alt="" style="width: 97%;">
          <div class="links-small text-left">Before using gas appliances, if you smell gas, open windows for ventilation.</div>
        </div>
        <div class="text-center" style="width : 270px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_27.jpg" alt="" style="width: 97%;">
          <div class="links-small text-left">Do not leave or be distracted while using gas. Check carefully if the flame is burning.</div>
        </div>
        <div class="text-center" style="width : 270px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_28.jpg" alt="" style="width: 97%;">
          <div class="links-small text-left">After use, always close the intermediate valve, and if you are away for an extended period, close the main valve as well.</div>
        </div>
      </div>

      <div class="bg-gap-2"></div>
      <div class="bg-body">
        <ul>
          <li>Safe Gas Usage</li>
          <ul>
            <li>Before use:
              <ul>
                <li>Check for a gas smell; if you detect it, close the gas valve and open windows and doors for ventilation.</li>
              </ul>
            </li>
            <li>During use:
              <ul>
                <li>When lighting the gas stove, ensure that the flame is properly ignited. If the flame goes out due to wind or spillage, gas can leak, so keep an eye on it. Wearing long-sleeved clothing while using gas is dangerous as it may catch fire.</li>
                <li>Ensure there are no flammable materials around gas appliances.</li>
              </ul>
            </li>
            <li>After use:
              <ul>
                <li>Always close the ignition switch and the intermediate valve.</li>
              </ul>
            </li>
          </ul>
        </ul>
      </div>

      <div class="bg-gap-3"></div>
      <div class="d-flex flex-wrap text-center">
        <div class="text-center" style="width : 400px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_29.jpg" alt="" style="width: 97%;">
          <div>Intermediate valve open</div>
        </div>
        <div class="text-center" style="width : 400px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_30.jpg" alt="" style="width: 97%;">
          <div>Intermediate valve closed</div>
        </div>
      </div>
    </div>

    <div v-if="tab == 5">
      <div class="bg-gap-2"></div>
      <h2 class="title-xlarge">What dangers are associated with escalators and elevators?</h2>

      <div class="bg-body">
        <ul><li>Escalators</li></ul>
      </div>
      <div class="d-flex flex-wrap text-center">
        <div class="text-center" style="width : 240px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_31.jpg" alt="" style="width: 97%;">
          <div class="links-small text-left">When using an escalator without holding the handrail</div>
        </div>
        <div class="text-center" style="width : 240px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_32.jpg" alt="" style="width: 97%;">
          <div class="links-small text-left">Leaning out beyond the handrail</div>
        </div>
      </div>

      <div class="bg-gap-2"></div>
      <div class="bg-body">
        <ul><li>In elevators</li></ul>
      </div>
      <div class="d-flex flex-wrap text-center">
        <div class="text-center" style="width : 240px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_33.jpg" alt="" style="width: 97%;">
          <div class="links-small text-left">Playing around and jumping inside the elevator</div>
        </div>
        <div class="text-center" style="width : 240px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_34.jpg" alt="" style="width: 97%;">
          <div class="links-small text-left">Putting hands in the closing doors</div>
        </div>
        <div class="text-center" style="width : 240px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_35.jpg" alt="" style="width: 97%;">
          <div class="links-small text-left">Playing with the buttons</div>
        </div>
      </div>

      <div class="bg-gap-2"></div>

      <div class="bg-body">
        <ul>
          <li>Safe Use of Escalators and Elevators</li>
          <ul>
            <li>Escalators
              <ul>
                <li>Be cautious that clothes or shoelaces do not get caught in the gaps.</li>
                <li>Always hold the handrail when getting on and off, and do not extend your head or arms beyond the handrail.</li>
                <li>Stand within the safety line, and elderly individuals should always be accompanied by a caregiver.</li>
              </ul>
            </li>
            <div class="bg-gap-2"></div>
            <li>Elevators
              <ul>
                <li>Do not operate the intercom or emergency stop button recklessly.</li>
                <li>Do not jump or play around inside the elevator while it is in operation.</li>
                <li>Do not lean against the elevator doors.</li>
              </ul>
            </li>
            <div class="bg-gap-2"></div>
            <li>What to do in case of problems
              <ul>
                <li>If your clothing gets caught in the escalator, shout loudly to get help and stop the escalator.</li>
                <li>If the elevator suddenly stops while in operation, report it to 119 using your mobile phone and press the emergency button to request assistance.</li>
              </ul>
            </li>
          </ul>
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
        {value : 0, name : "Helpful Fire Safety Equipment"},
        {value : 1, name : "Cigarette Fire Safety Measures"},
        {value : 2, name : "Kitchen Safety Guidelines"},
        {value : 3, name : "Safe Use of Electricity"},
        {value : 4, name : "Safe Use of Gas"},
        {value : 5, name : "Escalator and Elevator Safety"},
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
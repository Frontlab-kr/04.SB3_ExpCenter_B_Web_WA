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
    <h2 class="title-xlarge">What is Bleeding?</h2>
    <div class="bg-layer-2">
      Bleeding refers to the loss of blood from arteries, capillaries, or veins, and can be classified as external or internal depending on the location of the bleeding.
    </div>
    <div class="bg-gap-2"></div>

    <div v-if="tab == 0">
      <div class="bg-body">
        <ul>
          <li>Increased respiratory rate and pulse, difficulty breathing.</li>
          <li>Pale skin and decreased body temperature.</li>
          <li>Feeling thirsty and anxious.</li>
          <li>Dilated pupils and possible vomiting.</li>
        </ul>

        <div class="bg-gap-2"></div>
        <div class="text-center">
          <img src="/boramae/contents/image/info_first_aid_bleeding_01_01.jpg" alt="If bleeding occurs, apply pressure with cotton to stop the bleeding and then wrap it with a bandage." style="width: 500px;">
        </div>
      </div>
    </div>

    <div v-if="tab == 1">
      <div class="bg-body">
        <ul>
          <li>
            Direct Pressure Hemostasis: The most commonly used method
            <ul>
              <li>After bleeding stops, cover with a sterile dressing and wrap with a pressure bandage.</li>
              <li>If bleeding does not stop, apply more pressure.</li>
              <li>For limb bleeding, elevate the injured area above the heart.</li>
            </ul>
          </li>

          <v-row>
            <v-col cols="12" md="6" sm="12">
              <ul>
                <li>Pressure Point Hemostasis
                  <ul>
                    <li>If bleeding from an arm or leg cannot be controlled with direct pressure, apply pressure to the proximal artery
                      <ul>
                        <li>Arm bleeding ⇒ Brachial artery pressure</li>
                        <li>Hand bleeding ⇒ Radial artery pressure</li>
                        <li>Leg bleeding ⇒ Femoral artery pressure</li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </v-col>
            <v-col cols="12" md="6" sm="12">
              <div class="text-center">
                <img src="/boramae/contents/image/info_first_aid_bleeding_02_01.jpg" alt="Arm bleeding ⇒ Brachial artery, Hand bleeding ⇒ Radial artery, Leg bleeding ⇒ Femoral artery pressure" style="width: 97%;">
              </div>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="6" sm="12">
              <ul>
                <li>Tourniquet Use
                  <ul>
                    <li>The tourniquet is used when other methods fail to stop bleeding. It can damage nerves or blood vessels and cause necrosis in arms or legs, so it is important to loosen the tourniquet periodically to prevent necrosis.</li>
                  </ul>
                </li>
              </ul>
            </v-col>
            <v-col cols="12" md="6" sm="12">
              <div class="text-center">
                <img src="/boramae/contents/image/info_first_aid_bleeding_02_02.jpg" alt="Apply the tourniquet to the bleeding area. Tighten it sufficiently. Secure it so it does not loosen. Mark the time of application." style="width: 97%;">
              </div>
            </v-col>
          </v-row>
        </ul>
      </div>

      <div class="bg-gap"></div>
      <div class="bg-layer-2">
        <p class="font-bold">Note:</p>
        The use of a tourniquet should be a last resort, applied only in critical situations where bleeding is difficult to control.
      </div>
    </div>

    <div v-if="tab == 2">
      <div class="bg-body">
        <v-row>
          <v-col cols="12" md="6" sm="12">
            <ul>
              <li>Have the injured person sit to lower their blood pressure.</li>
              <li>Have them slightly tilt their head forward to allow blood to flow out of the front of the nose rather than down the throat.</li>
              <li>Blood flowing down the back of the throat can cause choking, nausea, or vomiting.</li>
              <li>Pinch the nose with your thumb and index finger and apply gentle pressure for 5 minutes.</li>
              <li>If there is a bruise to the nose, apply an ice pack to the nose and cheeks to help with hemostasis.</li>
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
        {value : 0, name : "Symptoms"},
        {value : 1, name : "Hemostasis"},
        {value : 2, name : "Nosebleeds"},
      ],
    }
  },

  components:{},

  mounted() {},

  beforeUnmount(){},

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
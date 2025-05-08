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
      <h2 class="title-xlarge">소화기 사용법</h2>

      <div class="bg-body">
        <ul>
          <li>소화기를 바닥에 내려놓고 한 손으로 소화기 몸통을 잡고 다른 한 손으로 손잡이 앞쪽에 있는 안전핀을 힘껏 잡아 당겨 뽑습니다.</li>
          <li>바람을 등지고 호스를 뽑아 불이 난 곳을 향합니다.</li>
          <li>손잡이 아랫부분을 잡고 불이 난 곳으로 가까이 접근하고 손잡이를 움켜잡습니다.</li>
          <li>불길 주위에서부터 빗자루로 쓸 듯이 골고루 분사합니다.</li>
        </ul>
      </div>

      <div class="d-flex flex-wrap text-center">
        <div class="text-center" style="width : 210px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_01.jpg" alt="" style="width: 97%;">
          <div>안전핀을 뽑습니다.</div>
        </div>
        <div class="text-center" style="width : 210px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_02.jpg" alt="" style="width: 97%;">
          <div>호스에 불이 난 곳으로 향합니다.</div>
        </div>
        <div class="text-center" style="width : 210px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_03.jpg" alt="" style="width: 97%;">
          <div>손잡이를 움켜쥡니다.</div>
        </div>
        <div class="text-center" style="width : 210px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_04.jpg" alt="" style="width: 97%;">
          <div class="links-small text-left">골고루 분사합니다.</div>
        </div>
      </div>


      <div class="bg-gap"></div>
      <h2 class="title-xlarge">대피계획 세우기</h2>
      <div class="bg-body">
        <ul>
          <li>소화전의 비상버튼을 누릅니다.</li>
          <li>소화전 안의 소방호스를 화재현장까지 끌고 갑니다.</li>
          <li>소화전 안의 개폐밸브를 서서히 시계방향으로 돌려서 열어줍니다.</li>
          <li>노즐을 돌려 물을 분사하고, 불길의 가장자리에서 중심부로 물을 분사하여 불을 끕니다.</li>
          <li>불을 끈 후 개폐밸브를 잠그고 호스를 잘 말려 소화전함에 정돈합니다.</li>
        </ul>
      </div>

      <div class="d-flex flex-wrap text-center">
        <div class="text-center" style="width : 210px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_05.jpg" alt="" style="width: 97%;">
          <div>소화전의 비상버튼을 누릅니다.</div>
        </div>
        <div class="text-center" style="width : 210px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_06.jpg" alt="" style="width: 97%;">
          <div>호스를 화재현장까지 연장합니다.</div>
        </div>
        <div class="text-center" style="width : 210px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_07.jpg" alt="" style="width: 97%;">
          <div>개폐밸브를 개방합니다.</div>
        </div>
        <div class="text-center" style="width : 210px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_08.jpg" alt="" style="width: 97%;">
          <div class="links-small text-left">노즐을 돌려서 물을 분사합니다.</div>
        </div>
      </div>

      <div class="bg-gap"></div>
      <h2 class="title-xlarge">알아야 할 소방시설</h2>
      <div class="bg-body">
        <ul>
          <li>화재시 필요한 시설은 여러 가지가 있지만 그중 꼭 알아두어야 할 소방시설은 아래와 같습니다.</li>
        </ul>
      </div>

      <div class="d-flex flex-wrap text-center">
        <div class="text-center" style="width : 210px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_09.jpg" alt="" style="width: 97%;">
          <div class="links-small text-left">
            <p class="font-bold">피난구 유도등</p>
            지상으로 통하는 출입구와 직통 계단의 계단실에 설치되어 있습니다.
          </div>
        </div>
        <div class="text-center" style="width : 210px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_10.jpg" alt="" style="width: 97%;">
          <div class="links-small text-left">
            <p class="font-bold">통로 유도등</p>
            피난통로를 안내하기 위한 유도등으로 복도 및 계단에 설치되어 있습니다.
          </div>
        </div>
        <div class="text-center" style="width : 210px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_11.jpg" alt="" style="width: 97%;">
          <div class="links-small text-left">
            <p class="font-bold">발신기 / 비상벨</p>
            화재 시 벨이 울려 화재를 인지 할 수 있습니다.
          </div>
        </div>
        <div class="text-center" style="width : 210px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_12.jpg" alt="" style="width: 97%;">
          <div class="links-small text-left">
            <p class="font-bold">시각 경보기</p>
            비상벨을 대신하여 화재를 인지 할 수 있도록 조명이 깜빡거립니다.
          </div>
        </div>
      </div>

      <div class="bg-gap"></div>
      <h2 class="title-xlarge">완강기 사용법</h2>
      <div class="bg-body">
        <ul>
          <li>지지대 고리에 완강기 고리를 걸고 잠금다.</li>
          <li>지지대를 창밖으로 밀고 릴(줄)을 던진다.</li>
          <li>완강기 벨트를 가슴 높이까지 걸고 조인다.</li>
          <li>벽을 짚으며 안전하게 내려간다.</li>
        </ul>
      </div>

      <div class="bg-image">
        <img src="/boramae/contents/image/info_live_disaster_accident_13.jpg" alt="1.지지대 고리에 완강기 고리를 걸고 잠근다. 2.지지대를 창밖으로 밀고 릴(줄)을 던진다. 3. 완광기 벤트를 가슴높이까지 걸고 조인다. 4.벽을 짚으며 안전하게 내려간다." style="width: 95%;">
      </div>
    </div>

    <div v-if="tab == 1">
      <div class="bg-gap-2"></div>
      <h2 class="title-xlarge">방심과 잘못된 흡연습관 등으로 인한 담뱃불 화재가 증가하고 있습니다.</h2>

      <div class="d-flex flex-wrap text-center">
        <div class="text-center" style="width : 270px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_14.jpg" alt="" style="width: 97%;">
          <div>술에 취한 채 잠자리에서 흡연하면 안됩니다.</div>
        </div>
        <div class="text-center" style="width : 270px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_15.jpg" alt="" style="width: 97%;">
          <div>흡연은 지정된 장소에서 해야 합니다.</div>
        </div>
        <div class="text-center" style="width : 270px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_16.jpg" alt="" style="width: 97%;">
          <div>무심코 버린 담배꽁초로 화재가 발생합니다.</div>
        </div>
      </div>


      <div class="bg-gap"></div>
      <h2 class="title-xlarge">담뱃불 화재원인과 예방요령</h2>
      <div class="bg-body">
        <ul>
          <li>담배화재 원인</li>
          <ul>
            <li>담배꽁초를 아무 곳에나 버리는 행위</li>
            <li>잠자리에서 담배를 피우다 잠드는 경우</li>
            <li>불이 덜 꺼진 담배꽁초를 쓰레기통에 버리는 일</li>
            <li>일부러 담뱃불을 불이 날 수 있는 곳에 버리는 행위</li>
          </ul>

          <div class="bg-gap-2"></div>
          <li>예방요령</li>
          <ul>
            <li>지정된 장소에서만 담배를 피웁니다.</li>
            <li>재떨이에는 약간의 물을 담아 둡니다.</li>
            <li>잠자리에서는 절대 금연해야 합니다.</li>
          </ul>
        </ul>
      </div>
    </div>

    <div v-if="tab == 2">
      <div class="bg-gap-2"></div>
      <h2 class="title-xlarge">집안에서 특히 주방은 다양한 위험에 노출되어 있습니다.</h2>

      <div class="d-flex flex-wrap text-center">
        <div class="text-center" style="width : 270px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_17.jpg" alt="" style="width: 97%;">
          <div>요리 중에는 자리를 비우지 않습니다.</div>
        </div>
        <div class="text-center" style="width : 270px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_18.jpg" alt="" style="width: 97%;">
          <div class="links-small text-left">끓는물, 칼, 세제 등 많은 위험 요소가 있습니다.</div>
        </div>
        <div class="text-center" style="width : 270px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_19.jpg" alt="" style="width: 97%;">
          <div>주방에서는 위생수칙을 지켜야 합니다.</div>
        </div>
      </div>


      <div class="bg-gap"></div>
      <h2 class="title-xlarge">주방화재 및 안전사고 예방요령</h2>
      <div class="bg-body">
        <ul>
          <li>주방화재 예방</li>
          <ul>
            <li>요리중에는 절대로 자리를 비우지 않습니다.</li>
            <li>가스레인지 주변에 타기 쉬운 물건을 놓지 않습니다.</li>
            <li>전자레인지를 사용 시에는 금속물질(알루미늄 호일)등을 넣지 않습니다.</li>
            <li>사용하지 않는 전기기구는 전기코드를 빼 놓습니다.</li>
          </ul>

          <div class="bg-gap-2"></div>
          <li>주방화재 예방</li>
          <ul>
            <li>프라이팬이나 튀김냄비를 사용할 때에는 기름이나 내용물이 쏟아지지 않게 하여야 합니다.</li>
            <li>냄비가 뜨거울 때는 자리를 뜨지 않습니다.</li>
            <li>세제 등은 안전 뚜껑이 장착된 제품을 사용하고, 칼 등은 안전한 장소에 보관하여야 합니다.</li>
            <li>주방위생에 철저를 기하여 식중독 등을 예방합니다.</li>
          </ul>
        </ul>
      </div>
    </div>

    <div v-if="tab == 3">
      <div class="bg-gap-2"></div>
      <h2 class="title-xlarge">이럴 때 전기 안전사고가 납니다.</h2>

      <div class="d-flex flex-wrap text-center">
        <div class="text-center" style="width : 270px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_20.jpg" alt="" style="width: 97%;">
          <div>젖은 손으로 전기 제품을 만질 때</div>
        </div>
        <div class="text-center" style="width : 270px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_21.jpg" alt="" style="width: 97%;">
          <div>물에 잠긴 전선을 만질 때</div>
        </div>
        <div class="text-center" style="width : 270px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_22.jpg" alt="" style="width: 97%;">
          <div>전선을 잡고 플러그를 뺄 때</div>
        </div>
        <div class="text-center" style="width : 270px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_23.jpg" alt="" style="width: 97%;">
          <div>플러그를 콘센트에 제대로 꽂지 않았을 때</div>
        </div>
        <div class="text-center" style="width : 270px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_24.jpg" alt="" style="width: 97%;">
          <div>콘센트 하나에 여러개의 플러그를 꽂을 때</div>
        </div>
        <div class="text-center" style="width : 270px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_25.jpg" alt="" style="width: 97%;">
          <div>전선이 문틈에 끼어 있을 때</div>
        </div>
      </div>


      <div class="bg-gap-2"></div>
      <div class="bg-body">
        <ul>
          <li>전기제품 사용 중 일어날 수 있는 사고 예방법</li>
          <ul>
            <li>전열 기구를 사용할 때에는 자리를 지킵니다.</li>
            <li>젖은 손으로 전기 제품을 사용하지 말아야 합니다.</li>
            <li>전선이 문틈이나 가구에 눌리지 않도록 설치합니다.</li>
            <li>전선이 물에 잠겼을 경우에는 다가가지 않습니다.</li>
            <li>사용하지 않는 전기 제품은 코드를 빼 놓습니다.</li>
            <li>콘센트에 플러그를 꽂을 때에는 끝까지 완전히 꽂고, 뺄 때에는 전선을 접지 말고 플러그를 잡고 빼야 합니다.</li>
            <li>콘센트 하나에 여러 개의 플러그를 문어발식으로 연결하여 사용하지 않습니다.</li>
          </ul>
        </ul>
      </div>
    </div>

    <div v-if="tab == 4">
      <div class="bg-gap-2"></div>
      <h2 class="title-xlarge">가스는 사용이 편리하지만 부주의하게 사용할 경우 폭발 및 화재의 위험이 높습니다. 안전하게 사용하는 방법을 알아야 합니다.</h2>

      <div class="d-flex flex-wrap text-center">
        <div class="text-center" style="width : 270px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_26.jpg" alt="" style="width: 97%;">
          <div class="links-small text-left">가스제품을 사용하기전 가스냄새가 나면 창문을 열어 환기 시킵니다.</div>
        </div>
        <div class="text-center" style="width : 270px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_27.jpg" alt="" style="width: 97%;">
          <div class="links-small text-left">사용중에는 외출을 하거나 한눈을 팔지 않아야하며 불이 붙었는지 잘 살펴봅니다.</div>
        </div>
        <div class="text-center" style="width : 270px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_28.jpg" alt="" style="width: 97%;">
          <div class="links-small text-left">사용후에는 반드시 중간 밸브를 잠그고, 장기간 집을 비울때는 메인 밸브까지 잠급니다.</div>
        </div>
      </div>
      

      <div class="bg-gap-2"></div>
      <div class="bg-body">
        <ul>
          <li>안전한 가스 사용법</li>
          <ul>
            <li>사용 전에는
              <ul><li>가스냄새가 나는지 살펴보고, 냄새가 나면 가스밸브를 잠그고 창문과 출입문을 열어 환기시킵니다.</li></ul>
            </li>
            <li>사용 중에는
              <ul>
                <li>가스레인지에 불을 붙일 때에는 불이 확실히 붙었는지 살펴보아야 합니다. 바람이나 넘친 국물에 의해 불이 꺼지면 가스가 새게 되므로 자주 살핍니다. 소매가 긴 옷을 입고 사용하면 불이 붙을 수 있어 위험합니다.</li>
                <li>가스제품 주변에 가연물은 없는지 확인합니다.</li>
              </ul>
            </li>
            <li>
              사용 후에는
              <ul><li>반드시 점화 스위치와 중간밸브를 잠급니다.</li></ul>
            </li>
          </ul>
        </ul>
      </div>
      <div class="bg-gap-3"></div>
      <div class="d-flex flex-wrap text-center">
        <div class="text-center" style="width : 400px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_29.jpg" alt="" style="width: 97%;">
          <div>중간밸브 열림</div>
        </div>
        <div class="text-center" style="width : 400px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_30.jpg" alt="" style="width: 97%;">
          <div>중간밸브 잠김</div>
        </div>
      </div>
    </div>

    <div v-if="tab == 5">
      <div class="bg-gap-2"></div>
      <h2 class="title-xlarge">에스컬레이터 및 승강기에는 어떤 위험이 있을까?</h2>

      <div class="bg-body">
        <ul><li>에스컬레이터</li></ul>
      </div>
      <div class="d-flex flex-wrap text-center">
        <div class="text-center" style="width : 240px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_31.jpg" alt="" style="width: 97%;">
          <div class="links-small text-left">손잡이를 잡지 않고 탈 경우</div>
        </div>
        <div class="text-center" style="width : 240px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_32.jpg" alt="" style="width: 97%;">
          <div class="links-small text-left">손잡이 밖으로 몸을 내미는 경우</div>
        </div>
      </div>

      <div class="bg-gap-2"></div>
      <div class="bg-body">
        <ul><li>승강기에서</li></ul>
      </div>
      <div class="d-flex flex-wrap text-center">
        <div class="text-center" style="width : 240px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_33.jpg" alt="" style="width: 97%;">
          <div class="links-small text-left">승강기 안에서 뛰며 장난할 때</div>
        </div>
        <div class="text-center" style="width : 240px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_34.jpg" alt="" style="width: 97%;">
          <div class="links-small text-left">닫히는 문에 손을 넣을 때</div>
        </div>
        <div class="text-center" style="width : 240px;">
          <img src="/boramae/contents/image/info_live_disaster_accident_35.jpg" alt="" style="width: 97%;">
          <div class="links-small text-left">단추를 누르며 장난하는 경우</div>
        </div>
      </div>


      <div class="bg-gap-2"></div>

      <div class="bg-body">
        <ul>
          <li>에스컬레이터 및 승강기 안전 사용법</li>
          <ul>
            <li>에스컬레이터
              <ul>
                <li>옷이나 신발 끈 등이 틈새에 끼이지 않도록 주의해야 합니다.</li>
                <li>타고 내릴 때 핸드레일을 꼭 잡고, 핸드레일 밖으로 머리나 팔을 내밀지 않습니다.</li>
                <li>안전선 안쪽에 타야 하며, 노약자는 반드시 보호자와 동반하여 탑니다.</li>
              </ul>
            </li>
            <div class="bg-gap-2"></div>
            <li>승강기
              <ul>
                <li>인터폰이나 비상정지 스위치 등을 함부로 조작하지 않습니다.</li>
                <li>운행 중 승강기 안에서 뛰거나 장난치치 않습니다.</li>
                <li>승강기 출입문에 몸을 기대지 않습니다.</li>
              </ul>
            </li>
            <div class="bg-gap-2"></div>
            <li>이럴 땐 이렇게
              <ul>
                <li>에스컬레이터에서 옷자락이 발판 틈새에 끼었을 때 큰소리로 도움을 청해 에스컬레이터를 정지 시킵니다.</li>
                <li>승강기가 운행중에 갑자기 멈췄을 때 휴대전화로 119에 신고하고, 비상단추를 눌러 도움을 요청합니다.</li>
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
        {value : 0, name : "도움이되는 소방시설"},
        {value : 1, name : "담뱃불 안전조치"},
        {value : 2, name : "주방안전수칙 준수"},
        {value : 3, name : "전기 안전하게 사용하기"},
        {value : 4, name : "가스 안전하게 사용하기"},
        {value : 5, name : "에스컬레이터/승강기 안전"},
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
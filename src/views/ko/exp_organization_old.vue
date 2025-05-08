<template>
  <div>
    <h1 class="title-xxlarge">{{ $t("menu_0102_조직도") }}</h1>

    <div class="bg-image text-center">
      <svg width="1200" height="658" viewBox="0 0 1200 658" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: auto;">
        <rect width="1200" height="658" fill="white"/>
        <g tabindex="0" @click="go_dept('시민안전체험관')" @keydown.enter="go_dept('시민안전체험관')">
          <rect  x="463" y="71" width="273" height="55" class="rect-blue"/>
          <text x="537" y="106.969" class="text-style-large">시민안전체험관</text>
        </g>

        <g tabindex="0" @click="go_dept('운영1과')" @keydown.enter="go_dept('운영1과')">
          <rect tabindex="0" x="323.5" y="193.5" width="163.806" height="56" class="rect-blue"/>
          <text x="371.787" y="229.595" class="text-style-small">운영1과</text>
        </g>

        <g tabindex="0" @click="go_dept('운영2과')" @keydown.enter="go_dept('운영2과')">
          <rect tabindex="0" x="701.5" y="193.5" width="163.806" height="56" class="rect-blue"/>
          <text x="749.787" y="229.595" class="text-style-small">운영2과</text>
        </g>

        <line x1="415" y1="156.5" x2="785" y2="156.5" class="line-style"/>
        <line x1="599.5" y1="127" x2="599.5" y2="158" class="line-style"/>
        <line x1="415.5" y1="155" x2="415.5" y2="194" class="line-style"/>
        <line x1="785.5" y1="155" x2="785.5" y2="194" class="line-style"/>
        <!-- <line x1="156.5" y1="155" x2="156.5" y2="194" class="line-style"/> -->
        <!-- <line x1="334.5" y1="155" x2="334.5" y2="194" class="line-style"/>
        <line x1="512.5" y1="155" x2="512.5" y2="194" class="line-style"/>
        <line x1="690.5" y1="155" x2="690.5" y2="194" class="line-style"/>
        <line x1="868.5" y1="155" x2="868.5" y2="194" class="line-style"/> -->
        <!-- <line x1="1046.5" y1="155" x2="1046.5" y2="194" class="line-style"/> -->
      </svg>
    </div>


    <v-divider :aria-hidden="true"></v-divider>

    <!-- <div class="bg-gap-2"></div>
    <div class="d-flex ">
      <div class="mr-2 font-bold">소방정책팀</div>
      <v-divider :aria-hidden="true" vertical class="ml-2 mr-2"></v-divider>
      <div>(04628) 서울특별시 중구 퇴계로 26길 52 소방재난본부 5층</div>
    </div>

    <div class="bg-gap-3"></div>
    <table class="nor_table">
      <tr>
        <td width="150px"><p class="font-bold">소방정책팀장</p> <p class="font-bold">김성칠</p>02-3706-1213</td>
        <td>
          <ul>
            <li>팀 내 업무 총괄 및 지도감독</li>
            <li>국회, 시의회 관련 업무 총괄</li>
            <li>주요 소방정책 연구 및 보고서 최종 검토 작성</li>
            <li>소방행정과 일상경비 출납원</li>
            <li>기타 주무과 소관 사항 조정</li>
            <li>연락공보담당 업무지원에 관한 사항 총괄 조정</li>
          </ul>
        </td>
      </tr>
      <tr>
        <td><p class="font-bold">소방경</p>02-3706-1311</td>
        <td>
          <ul>
            <li>본부 자체 행사 계획 및 직속기관 의전 지원에 관한 사항</li>
            <li>소방지휘관 회의 등 본부 주관 회의 운영에 관한 사항</li>
            <li>소방청 및 시청 회의, 행사지원에 관한 사항</li>
            <li>시장단 및 부시장단 회의일정 관리 및 회의자료 작성에 관한 사항 (정례간부회의, 주무과장 회의, 실국장 간담회의 또는 워크숍, 당정 국무회의, 부재중 등)</li>
            <li>순직 소방공무원 장례 및 추모행사 지원</li>
            <li>타부서 추진 행사 지원에 관한 사항</li>
            <li>대중매체 홍보에 관한 사항</li>
            <li>소방공무원 노동조합 운영에 관한 사항</li>
          </ul>
        </td>
      </tr>
      <tr>
        <td><p class="font-bold">소방경</p>02-3706-1312</td>
        <td>
          <ul>
            <li>시정 운영 4개년 계획 수립 및 실적관리</li>
            <li>연간 주요업무계획 수립 및 실적관리</li>
            <li>중점 추진업무 선정 및 추진실적 관리</li>
            <li>업무 보고서 작성 (시장, 부시장 업무보고, 취임보고, 국회의원, 시의회 의장, 타 기관장 등 방문 시)</li>
            <li>정책비전 제시, 개혁과제 발굴 및 추진</li>
            <li>시민안전 정책통계 작성</li>
            <li>소방 역량 강화, 조직문화 혁신 시책 개발</li>
            <li>소방정책 평가에 관한 사항</li>
            <li>대중정보 제공에 관한 사항</li>
            <li>소방공무원 직장협의회 운영에 관한 사항</li>
          </ul>
        </td>
      </tr>
      <tr>
        <td><p class="font-bold">소방경</p>02-3706-1317</td>
        <td>
          <ul>
            <li>국회, 시의회 운영 및 협력에 관한 사항</li>
            <li>국정감사 및 시의회 행정사무감사 자체 진행계획 수립</li>
            <li>국회(시)의원 요구자료 접수 및 배정에 관한 사항</li>
            <li>의원 시정질문에 관한 사항</li>
            <li>시의회 회기별 자체 진행계획 수립에 관한 사항</li>
            <li>시의회 추진상황보고서 작성 제출에 관한 사항</li>
            <li>의회 예상질의 답변서 작성 및 수합 등에 관한 사항</li>
            <li>의회 회기별 회의록 분석에 관한 사항</li>
            <li>국정감사, 행정사무감사 서면질의서 접수 처리</li>
            <li>시의회 상임위원회, 대표단 간담회 운영</li>
            <li>긴급대응대책 추진 현황 의회 보고에 관한 사항</li>
          </ul>
        </td>
      </tr>
      <tr>
        <td><p class="font-bold">소방장</p>02-3706-1313</td>
        <td>
          <ul>
            <li>소방공무원 복무 관리 및 지도에 관한 사항</li>
            <li>소방기관장 근무상황 관리에 관한 상황</li>
            <li>일반 보안관리 및 지도 점검에 관한 사항</li>
            <li>소방공무원 비상소집(비상연락망) 관리에 관한 사항</li>
            <li>소방본부 사무인계인수에 관한 사항</li>
            <li>소방재난업무가이드 제작, 배포에 관한 사항</li>
            <li>소방공무원증 업무(발급 포함)에 관한 사항</li>
            <li>소방본부 당직 편성 운영 및 당직비 지급에 관한 사항</li>
            <li>소방공무원 겸직 허가에 관한 사항</li>
            <li>본부 출입관리 및 청사경비원 관리에 관한 사항</li>
            <li>타부서 주관에 속하지 아니하는 서무일반에 관한 사항</li>
          </ul>
        </td>
      </tr>
      <tr>
        <td><p class="font-bold">소방위</p>02-3706-1315</td>
        <td>
          <ul>
            <li>일반민원 관리 및 행정정보 공개에 관한 사항</li>
            <li>의무소방원 및 사회복무요원 운영에 관한 사항</li>
            <li>기록물관리에 관한 사항</li>
            <li>소방행정과 일상경비 운영에 관한 업무</li>
            <li>초과근무 및 출장관리 및 여비, 급량비 정산에 관한 사항</li>
            <li>초과근무 운영(명령, 승인 등)에 관한 사항</li>
            <li>차량운행일지 및 우표 관리</li>
            <li>과내 물품관리 및 사무실 환경정비에 관한 사항</li>
            <li>긴급대응대책 추진 현황 의회 보고에 관한 사항</li>
          </ul>
        </td>
      </tr>
      <tr>
        <td><p class="font-bold">소방위</p>02-3706-1314</td>
        <td>
          <ul>
            <li>해외 도시와의 교류 협력에 관한 사항</li>
            <li>서울소방정책 해외 진출에 관한 사항</li>
            <li>市 관련 부서 협력 사항 (국제교류담당관, 해외도시협력담당관)</li>
            <li>유관기관 협력에 관한 사항 (KOICA, 시티넷)</li>
            <li>국제회의에 관한 사항</li>
            <li>국제외빈 소방기관 방문에 관한 사항</li>
            <li>공무국외여행에 관한 사항</li>
            <li>본부 정례회의 회의록 작성 등 기록에 관한 사항</li>
            <li>시장, 부시장, 본부장 요청사항 추진에 관한 사항</li>
            <li>회의실 운영, 관리에 관한 사항</li>
            <li>직원 외 행정지원 인력 관리에 관한 사항 (행정 서포터즈, 행정인턴, 아르바이트, 희망근로 등)</li>
            <li>소방청 일보 및 서울시 월보에 관한 사항</li>
            <li>소방정책제안 게시판 운영에 관한 사항</li>
            <li>대중 정보제공에 관한 사항</li>
            <li>소방공무원 노동조합 지원 및 현안 대응에 관한 사항</li>
          </ul>
        </td>
      </tr>
      <tr>
        <td><p class="font-bold">소방경</p>02-3706-1212</td>
        <td>
          <ul>
            <li>본부장실 관리에 관한 사항</li>
            <li>본부장 일상경비 관련 업무</li>
            <li>시장 및 본부장 일정표(월간, 주간, 일일) 관리</li>
            <li>기타 본부장 수행에 관한 사항</li>
          </ul>
        </td>
      </tr>
      <tr>
        <td><p class="font-bold">소방장</p>02-3706-1214</td>
        <td>
          <ul>
            <li>행정차량 운영 및 관리, 재난현장 지휘차 운행</li>
            <li>시장 및 본부장 일정표(월간？주간？일일) 관리</li>
            <li>도서실 관리 및 운영에 관한 사항</li>
            <li>기타 본부장 수행에 관한 사항</li>
          </ul>
        </td>
      </tr>
      <tr>
        <td><p class="font-bold">주무관</p>02-3706-1213</td>
        <td></td>
      </tr>
    </table> -->

  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },

  components:{
  },

  mounted() {
  },

  beforeUnmount(){
  },

  methods : {
    go_dept(part) {
      alert(part);
    }
  },
};
</script>

<style>
  .rect-blue {
    fill: #D4E1FF;
    stroke: #5286FF;
    stroke-width: 2;
    cursor: pointer;
  }
  .rect-white {
    fill: white;
    stroke: #5286FF;
    stroke-width: 2;
    cursor: pointer;
  }
  .text-style-large {
    fill: #1D1D1D;
    font-family: 'Pretendard GOV';
    font-size: 24px;
    font-weight: 500;
    letter-spacing: 0em;
    white-space: pre;
    cursor: pointer;
  }
  .text-style-small {
    fill: #1D1D1D;
    font-family: 'Pretendard GOV';
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 0em;
    white-space: pre;
    cursor: pointer;
  }
  .line-style {
    stroke: #5286FF;
    stroke-width: 3;
  }
</style>

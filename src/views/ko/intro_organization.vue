<template>
  <div v-if="bUseWA == 'true'">
    <h1 class="title-xxlarge" style="position: relative; background-color: white;">부서별 업무 안내</h1>
    <iframe class="mt-n10" style="border: 0px; width: 100%; height: 800px; position: relative; z-index: 9;" title="부서별업무안내" :src=SeoulOrgURL
    ></iframe>
  </div>
  <div v-else>
    <h1 class="title-xxlarge" style="position: relative;background-color: white;">부서별 업무 안내</h1>
    <div class="mb-2">
      * 조직도를 클릭하면 하단에 내용이 표시 됩니다.
    </div>
    <div class="bg-image text-center">            
      <svg width="1200" height="300" viewBox="0 0 1200 300" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: auto;"
        role="text">        
        <rect width="1200" height="300" fill="white"/>
        <g v-for="(item, i) in zPart" :key="i" tabindex="0" aria-pressed="false" :title="idx == i?'선택됨':''" @click="go_dept(item.name)" @keydown.enter="go_dept(item.name)" role="button" @focusin="item.isFocused = true" @focusout="item.isFocused = false">
          <rect v-if="item.isHead"  :x=item.x :y=item.y :width=item.width height="55" :class="item.isFocused ? 'rect-blue-focus' : 'rect-blue'"/>
          <rect v-else              :x=item.x :y=item.y :width=item.width height="55" :class="item.isFocused ? 'rect-white-focus' : 'rect-white'"/>
          <text :x="item.x + item.width / 2" :y="item.y + 35" class="text-style-large" :class="idx == i?'rect-sel':''" text-anchor="middle" >{{item.name}}</text>
        </g>        
       
        <line x1="488" y1="156.5" x2="711" y2="156.5" class="line-style"/>
        <line x1="599.5" y1="127" x2="599.5" y2="158" class="line-style"/>
        <line x1="488" y1="155" x2="488" y2="194" class="line-style"/>
        <line x1="711" y1="155" x2="711" y2="194" class="line-style"/>
        
      </svg>
    </div>


    <v-divider :aria-hidden="true"></v-divider>

    <div class="bg-gap-2"></div>
    <div class="d-flex ">
      <div class="mr-2 font-bold">{{zPart[idx].name}}</div>
      <v-divider :aria-hidden="true" vertical class="ml-2 mr-2"></v-divider>
      <div>{{zPart[idx].main.captipn}}</div>
    </div>

    <div class="bg-gap-3"></div>
    <table class="nor_table">
      <caption class="sr-only">{{zPart[idx].main.title}}</caption>
      <tr v-for="(data, k) in zPart[idx].data" :key="k">
        <td scope="row" width="150px"><p class="font-bold">{{data.part}}</p> <p class="font-bold">{{data.man}}</p>{{data.tel}}</td>
        <td scope="row">
          <ul>
            <li v-for="(item, i) in data.job" :key=i>{{item}}</li>            
          </ul>
        </td>
      </tr>      
    </table>

  </div>
</template>

<script>
export default {
  data() {
    return {
      bUseWA: import.meta.env.VITE_USE_WA,
      idx : 0,
      zPart : [
        {isFocused:false, isHead : true,  x:463, y:71, width:273, name : "시민안전체험관", main:{captipn:"., FAX : 02-2187-8108"}, data : [{part:"체험관장", man:"이웅기", tel:"02-2027-4110", job:["서울특별시 시민안전체험관 업무 총괄"]}]},
        {isFocused:false, isHead : true,  x:407, y:193, width:162, name : "운영1과",  main:{captipn:"(07062) 서울특별시 동작구 여의대방로20나길 16, 보라매안전체험관, FAX : 02-2027-4169"}, data : [
          {part:"운영1과장", man:"전현주", tel:"02-2027-4120", job:["시민안전체험관 운영1과(보라매) 업무 총괄"]},
          {part:"행정팀장", man:"김승범", tel:"02-2027-4121", job:["시민안전체험관 행정업무총괄 및 지도감독", "운영1과 소방공무원, 공무직 등 인원 총괄관리", "교수(소방·용역) · 보조요원 교육 및 평가에 관한 사항", "대내·외 행사 의전 전반에 관한 사항", "체험시설 설치 및 자문에 관한 사항"]},
          {part:"소방위", man:"", tel:"02-2027-4123", job:["공무원 행동강령, 공직자 재산등록에 관한 사항", "민원처리 온라인 공개시스템 운영, 소송소청 등", "청렴도 향상, 감찰 및 징계업무에 관한 사항", "물품관리 총괄, 물품관리시스템 운영에 관한 사항", "소방 부조리 신고(레드휘슬 등) 처리에 관한 사항", "재물조사 계획 및 결과 보고 등", "사이버민원의 처리 및 민원처리 온라인 공개시스템 운영, 소송, 소청에 관한 사항", "119행정정보시스템(소방차량 및 개인보호장비) 데이터 관리", "소방장비 관리, 운영 기본계획의 수립 시행", "소방자동차의 관리유지, 보험관리, 사고보상 등에 관한 사항", "관장님 보좌", "체험시설 개선 및 체험 컨텐츠 개발 등에 관한 사항"]},
          {part:"소방위", man:"", tel:"02-2027-4122", job:["체험관 인사"]},
          {part:"소방장", man:"", tel:"02-2027-4126", job:["행사, 홍보영상, 자료 및 간행물 제작", "언론·방송매체 취재·촬영지원 및 실적 및 자료 관리", "촬영·편집장비 등 기자재 운용 및 관리", "국내·외 체험시설 교류 및 정보교환 업무", "홈페이지·유지관리, 예약관리 시스템 등 관리", "체험실적 통계 및 만족도 설문조사", "중대재해(시민·산업) 관리에 관한 시행(총괄)", "소방공무원 보건 안전 및 복지 집행계획 수립", "안전사고 보고, 순직·공사상자 관리 및 통계관리", "대외비·비밀문서 관리 등 보안 업무", "업무추진비(시책추진·기관운영·정원가산)"]},
          {part:"소방위", man:"", tel:"02-2027-4131", job:["보라매안전체험관 총괄운영 선임교수(운영팀장)"]},
          {part:"소방장", man:"", tel:"02-2027-4124", job:["세입세출 예산편성, 타당성조사 및 중기재정계획 수립분석", "계약, 재산관리 및 영선", "세외수입 및 세입결산, 체납처분 총괄", "에너지절약 실적관리 등", "체험관 소독 등 감염병 예방관리", "중대재해 관리(시설물, 예산)", "청사시설 유지관리"]},
          {part:"소방장", man:"", tel:"02-2027-4125", job:["예산집행 및 지출, 세입세출결산업무", "세입세출 외 현금 및 유가증권 취급", "지출증빙서 기록 보존, 금융기관 출납사항 및 기타 경리업무", "소속직원(모든 직렬) 급여 지급", "체력·건강관리, 특수건강검진(PTSP) 예방대책", "소속직원 피복관리 및 관리시스템 운영", "직원 휴양소(콘도 및 연수원) 예약 및 이용", "영상정보처리기기 및 다기능 사무기기 관리", "행정전자서명(GPKI), 전산 보안 및 개인 정보 보호 관리·운영", "구내식당 운영"]},
          {part:"소방장", man:"", tel:"02-2027-4122", job:["소방공무원 임용·고충·상훈·호봉관리", "소속인원 선발관리(실무관, 공익, 뉴딜, 의소대, 아르바이트생)", "소방학교, 외부 교육 기관 등에 대한 피교육생 선발 및 관리", "직장훈련, 소방공무원 체력검정·복무관리", "기록물관리 및 각종 증명서 발급", "중요직무급, 특수업무수당 등", "특별행사 추진에 관한 사항"]},
          {part:"소방교", man:"", tel:"02-2027-4126", job:["안전체험(방문 및 온택트) 운영에 관한 사항", "체험시설 점검(정비) 및 안전관리에 관한 사항(화재, 소화기, 소방시설, 버스)", "체험운영 보조요원(의용소방대원, 사회복무요원, 뉴딜 등) 교육 및 안전관리 전반에 관한 사항", "외부체험시설(소방차, 소방헬기) 관리에 관한 사항", "컨텐츠 및 특화프로그램(행사) 개발·운영에 관한 사항", "체험관 운영실적(통계 입력)에 관한 사항"]},
          {part:"소방장", man:"", tel:"02-2027-4132", job:["체험시설 정비, 유지보수에 관한 사항", "체험운영 보조요원(의용소방대원, 사회복무요원, 뉴딜 등) 근무에 관한 사항(월 근무 편성, 복무관리(수기/시스템), 자체교육, 소모품 구매 등)", "체험관 운영실적(통계 전반)에 관한 사항", "일상경비(운영팀 특근매식비, 여비) 집행관련 자료 제출, 운영관련 물품구매에 관한 사항", "체험장 정기점검(위탁점검)에 관한 사항", "기타 서무에 관한 사항"]},
          {part:"소방장", man:"", tel:"02-2027-4133", job:["안전체험(방문 및 온택트) 운영에 관한 사항", "체험시설 점검(정비) 및 안전·유지관리에 관한 사항(지진, 태풍, 지하철, 다목적홀, 박물관)", "무전기, 홍보장비, 촬영장비 점검 및 점검보고", "일상경비(운영팀 특근매식비, 여비) 집행관련 자료 제출, 운영관련 물품구매에 관한 사항", "체험장 정기점검(위탁점검)에 관한 사항"]}
        ]},
        {isFocused:false, isHead : true,  x:630, y:193, width:162, name : "운영2과",  main:{captipn:"(04991) 서울특별시 광진구 능동로 238, 광나루안전체험관, FAX : 02-2187-8108"}, data : [
          {part:"운영2과장", man:"남조형", tel:"02-2049-4020", job:["광나루 시민안전체험관 운영2과 업무총괄 및 지도감독"]},
          {part:"운영총괄팀장", man:"유재열", tel:"02-2049-4030", job:["운영2과 체험운영 업무총괄 및 지도감독", "운영2과 소방공무원, 공무직 등 인원 총괄관리", "교수(소방·용역) · 보조요원 교육 및 평가에 관한 사항", "대내·외 행사 의전 전반에 관한 사항", "체험시설 설치 및 자문에 관한 사항"]},
          {part:"소방위", man:"", tel:"02-2049-4033", job:["체험시설 정비, 유지보수에 관한 사항", "체험운영 보조요원(의용소방대원, 사회복무요원, 뉴딜 등) 근무에 관한 사항(월 근무 편성, 복무관리(수기/시스템), 자체교육, 소모품 구매 등)", "체험관 운영실적(통계 전반)에 관한 사항", "일상경비(운영팀 특근매식비, 여비) 집행관련 자료 제출, 운영관련 물품구매에 관한 사항", "체험장 정기점검(위탁점검)에 관한 사항", "기타 서무에 관한 사항"]},
          {part:"소방위", man:"", tel:"02-2049-4031", job:["안전체험(방문 및 온택트) 운영에 관한 사항", "체험관 예약 관리 및 교육운영 총괄에 관한 사항", "체험시설 총괄점검 및 안전관리에 관한 사항(1층, 지진, 태풍) 관련 대면, 온택트 체험시설 점검(정비) 및 안전관리에 관한 사항", "컨텐츠 및 특화프로그램(행사) 개발, 운영에 관한 사항", "(일일, 주간, 월간점검) 체험교육 일정표 관리", "운영보조요원 및 교육 및 전반에 관한 사항", "재물조사 및 관련예산 보조자료 작성 사항", "홈페이지 팝업창 및 게시글 관리에 관한 사항"]},
          {part:"소방위", man:"", tel:"02-2049-4032", job:["안전체험(방문 및 온택트) 운영에 관한 사항", "소화기 및 화재대피, 지하철 등(2층 전반적인) 관련 대면·온택트 체험시설 점검(정비) 및 안전관리에 관한 사항", "체험관 운영실적(구급 통계)에 관한 사항", "체험관 환자발생 시 응급처치 및 의무실 관리", "응급처치 교수기법(개발·정비)에 관한 사항", "물품구매(집행) 및 청사·체험시설 수선 등 관리", "글로벌 컨텐츠 제작 운영 관리"]},
          {part:"소방장", man:"", tel:"02-2049-4037", job:["안전체험(방문 및 온택트) 운영에 관한 사항", "4D영상관 및 소방관진로체험교실(지하1층 전반적인) 등 관련 대면·온택트 체험시설 점검(정비) 및 안전관리에 관한 사항", "체험교육별 메뉴얼 관리(개발·정비)에 관한 사항", "재난체험 교수기법 연구개발에 관한 사항", "(고장발생 등 필요시) 체험시설 및 홍보·촬영장비 점검 보고", "소방차 운행일지(유류사용 포함), 점검부(정기점검) 관리", "온택트용 기자재 리스트 작성 및 월별 점검기록 관리"]},
          {part:"소방장", man:"", tel:"02-2049-4034", job:["안전체험(방문 및 온택트) 운영에 관한 사항", "선박, OT(1층 전반적인 관련), 응급처치 대면·온택트 체험시설 점검(정비) 및 안전관리에 관한 사항", "의약품(소모품) 관리에 관한 사항", "체험관 환자발생 시 응급처치 및 의무실 관리", "재물조사 및 관련 예산 보조자료 작성 사항", "외부체험(교통·불난집·미니자동차 등) 시설 일체 관리", "홈페이지 예약시스템 관리에 관한 사항", "체험운영 실적·통계(구급통계 제외) 등 관련 자료에 관한 사항"]}
        ]},
       
      ],
    };
  },

  components:{
  },

  mounted() {
  },

  beforeUnmount(){
  },

  computed: {
    SeoulOrgURL() {
      return `https://org.seoul.go.kr/nsearch/orgChart2.do?DEPT_CODE=6114319`;
    }
  },

  methods : {
    go_dept(part) {
      this.idx = -1;

      for (let i = 0; i < this.zPart.length; i++) {
        if (this.zPart[i].name == part) {
          this.idx = i;
          return;
        }        
      }

      
    }
  },
};
</script>

<style>
  .rect-sel {
    text-decoration: underline; 
    font-weight: bold !important;
  }

  .rect-blue {
    fill: #D4E1FF;
    stroke: #5286FF;
    stroke-width: 2;
    cursor: pointer;
  }
  

  .rect-blue-focus {
    fill: #D4E1FF;
    stroke: #ff0000;
    stroke-width: 4;
    stroke-dasharray: 5, 5;
    cursor: pointer;
  }
  .rect-white {
    fill: white;
    stroke: #5286FF;
    stroke-width: 2;
    cursor: pointer;
  }
  .rect-white-focus {
    fill: white;
    stroke: #ff0000;
    stroke-width: 4;
    stroke-dasharray: 5, 5;
    cursor: pointer;
  }
  .text-style-large {
    fill: #1D1D1D;
    font-family: 'Pretendard GOV';
    font-size: 20px;
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

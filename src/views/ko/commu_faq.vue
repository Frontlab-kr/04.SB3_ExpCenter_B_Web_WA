<template>
  <div>
    <h1 class="title-xxlarge">자주하는 질문</h1>

    <div style="border-top: 1px solid var(--primary-70);"></div>
    <div v-for="(item, i) in zInfo" :key="i">
      <div style="border-bottom: 1px solid var(--primary-70); border-left: 1px solid var(--primary-70); border-right: 1px solid var(--primary-70);" >
        <div class="d-flex pa-2 secondary-color" style="background-color:var(--secondary-5); ">
          <div class="center_all pl-4  font-bold" style="height: 40px;" @click="open_info(item)" @keyup.enter="open_info(item)" tabindex="0" role="button" title="열기">{{item.title}}</div>
          <v-spacer></v-spacer>
          <v-btn tabindex="-1" v-if="item.isOpen" size="small" variant="plain" icon @click="open_info(item)" title="이전"><v-icon aria-hidden="true"><v-icon aria-hidden="true">mdi-chevron-up</v-icon></v-icon></v-btn>
          <v-btn tabindex="-1" v-else             size="small" variant="plain" icon @click="open_info(item)" title="다음"><v-icon aria-hidden="true"><v-icon aria-hidden="true">mdi-chevron-down</v-icon></v-icon></v-btn>
        </div>

        <div v-if="item.isOpen" class=" pa-4 pl-7" style="border-top: 1px solid var(--primary-70);" v-html="item.contents">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      zInfo : [
        {idx : 1, title : "Q1. 체험관은 어떻게 이용하나요?", contents : `<div>사전예약이 필수이며 인터넷 홈페이지로 예약 가능합니다. 예약은 현월부터 3개월까지 가능합니다.</div><div>이용문의 (02)-2027-4100</div>`, isOpen : false },
        {idx : 2, title : "Q2. 체험관 이용요금이 있나요?", contents : `<div>이용 요금은 무료입니다.</div>`, isOpen : false },
        {idx : 3, title : "Q3. 체험관은 무슨요일에 운영하나요?", contents : `<div>주중 화~금 및 주말, 공휴일에</div><div>운영합니다. <span style="font-weight : 700">※휴관일(1월1일, 설날 및 추석 당일) 제외</span></div>`, isOpen : false },
        {idx : 4, title : "Q4. 재난안전체험 및 일반응급처치 교육, 소방관과함께하는 119투어,소방시설교육은 몇살부터 가능한가요?", contents : `<div>재난안전체험 및 일반응급처치교육,소방관과함께하는119투어는 초등학생 이상부터 가능하며, 초등학생의 경우 보호자분께서 함께 예약하셔서 동반해주셔야 체험이 가능합니다. 소방시설교육은 중학생 이상 가능합니다.</div>`, isOpen : false },
        {idx : 5, title : "Q5. 7세이하 미취학 아동이 할수 있는 건 없나요?", contents : `<div>어린이안전체험은 2018 ~ 2019 년생 미취학 아동이 체험가능합니다.</div><div>보호자 동반은 필수이며 인터넷예약을 해야합니다.</div><div>보라매안전체험관내에 있는 소방역사박물관은 예약없이 자유관람 가능합니다.</div>`, isOpen : false },
        {idx : 6, title : "Q6. 예약은 어떻게 하나요?", contents : `<div>보라매안전체험관으로 들어오셔서 홈페이지 상단 ‘예약마당’에 들어가시면 일자별 예약가능인원을 보실 수 있으며, 희망하는 날짜의 시간을 클릭하시고 체험하실 명단(보호자포함인원)을 입력하시면 됩니다.</div><div>(현월부터 3개월간 예약가능합니다.)</div>`, isOpen : false },
        {idx : 7, title : "Q7. 장애인에 대한 체험은 어떻게 진행되나요?", contents : `<div>장애인도 예약을 하시면 체험가능하십니다. 다만, 장애의 정도에 따라 체험이 일부 제한 될수 있으니 이점</div><div>양지하시기 바랍니다. 체험을 위해서는 초등학생 이상정도의 정신적, 지적발달이 되어야 하며 안전확보를 위해 장애인 1인당 1명의 안전교사가 반드시 동행하여야 합니다. 체험예약시 인솔자 인원도 체험인원에 포함하여 예약바랍니다.</div><div>예약전에 게시판이나 전화로 문의를 주시면 성심껏 답변해드리겠습니다.</div>`, isOpen : false },
        {idx : 8, title : "Q8. 소방역사박물관도 예약을 해야하나요?", contents : `<div>오전10시~오후4시30분전에 입장하셔서 예약없이 자유롭게 관람하실 수 있습니다.</div>`, isOpen : false },
        {idx : 9, title : "Q9. 재난체험과 전문체험이 어떻게 다른가요?", contents : `<div>ㆍ재난체험 : 지진, 태풍, 화재, 교통사고체험이 재난안전체험코스입니다.</div><div>ㆍ전문체험: 응급처치(일반, 전문), 소방시설교육으로 구성되어 있으며, 일반응급처치는 기본심폐소생술,</div><div>자동심장충격기를 교육하고, 전문응급처치는 법정의무대상자 교육으로써 기본심폐소생술,</div><div>자동심장충격기 및 소아, 영아 심폐소생술을 중심으로 교육하고 있습니다.</div><div>소방시설교육은 화재 이론을 중심으로 각종 소방시설 관리 및 조작법 등을 배워보는 전문과정입니다.</div>`, isOpen : false },
        {idx : 10, title : "Q10. 재난체험과 전문체험을 따로 예약해야하나요?", contents : `<div>각각 순차적으로 예약하시면 두가지 모두 체험하실 수 있습니다.</div><div>예약시 별도로 시간표가 표시되어 있으므로 확인하시고 이용해주시기 바랍니다.</div>`, isOpen : false },
        {idx : 11, title : "Q11. 체험예약 확인 및 취소는 어디서 해야 하나요?", contents : `<div>홈페이지 ‘예약마당’에서 <예약확인, 변경, 취소>을 누르시고 체험자의 이름과 핸드폰번호(식별번호)를 입력하시면 됩니다.</div><div>(예약당시 입력한 이름과 번호로 검색을 하셔야 합니다.) 변경 및 취소는 체험전일까지 가능합니다.</div>`, isOpen : false },
        {idx : 12, title : "Q12. 체험증 출력은 어떻게 하나요?", contents : `<div>홈페이지에서 ‘예약마당’에 들어간 다음 ‘체험증 출력’을 누르고 예약당시 입력한 이름과 핸드폰번호(식별번호)를 입력하시면 체험을 마친 당일날부터 출력이 가능합니다.(체험전에는 출력이 되지 않습니다.)</div>`, isOpen : false },
        {idx : 13, title : "Q13. 보라매안전체험관에서 사진촬영이 가능한가요?", contents : `<div>A각 체험실에서 사진촬영이 가능합니다. 단, 삼각대, 플래시 등을 이용한 촬영과 상업적 용도를 위한 촬영은 불가합니다.</div><div>체험관 내부의 사진을 상업적으로 이용하실 시에는 반드시 사전허가를 받아야 합니다.</div>`, isOpen : false },
        {idx : 14, title : "Q14. 보라매안전체험관 주변에 가까운 지하철역이 있나요?", contents : `<div>신림선 보라매공원역 2번 출구에서 나와 7분정도 도보로 걸어오시거나, 2호선 신대방역에 내려 4번</div><div>출구로 나와 15분 정도 도보로 걸어오시면 됩니다. 공원안에 있기 때문에 차량이 들어 올 수 없습니다.</div><div>(※여유를 가지고 공원 산책 겸 넉넉한 시간으로 출발하는 센스 !!)</div>`, isOpen : false },
        {idx : 15, title : "Q15. 주차는 어떻게 하나요?", contents : `<div>공원안에는 차량이 들어올수 없으므로 보라매공원서문쪽에 있는 보라매공원 공영주차장을 이용하셔야 하며 주차비는 개인부담입니다.</div><div style="margin-top : 15px;">보라매공원 관리사무소 : 02)2181-1181~8, 2181-1191~5</div>`, isOpen : false },
        {idx : 16, title : "Q16. 체험관 내부에서 식사 또는 음식물을 판매하나요?", contents : `<div>체험관 내부에는 음식물 반입 및 취식이 금지되어 있으며 음식을 판매하지 않습니다.</div>`, isOpen : false },
        {idx : 17, title : "Q17. 야간체험운영은 언제하나요?", contents : `<div>야간체험은 현재 운영하고 있지 않습니다.</div><div>추후 운영하게 되면 공지하도록 하겠습니다.</div>`, isOpen : false },
        {idx : 18, title : "Q18. 체험관 홈페이지에서 사진이 잘 안보여요?", contents : `<div>1. 익스플로러에서 도구 > 호환성 보기 설정을 선택합니다.</div><div><img src='/boramae/contents/faq/faq_img_01.jpg' style="margin-top : 50px;"></div><div>2.웹사이트 추가에 seoul.go.kr 를 적고 추가버튼을 누릅니다.</div><div><img src='/boramae/contents/faq/faq_img_02.jpg' style="margin-top : 50px;"/></div><div>3.호환성 보기에 추가한 웹사이트 목록에 seoul.go.kr이 추가 되었으면 닫기를 눌러 창을 닫습니다.</div>`, isOpen : false },
      ],
    };
  },

  components:{
  },


  mounted() {
  },


  beforeUnmount(){
  },

  methods : {
    open_info(item){
      item.isOpen = !item.isOpen;
    }
  },
};
</script>

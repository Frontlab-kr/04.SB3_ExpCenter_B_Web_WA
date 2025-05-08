<template>
  <div>
    <h1 class="title-xxlarge" style="position: relative; z-index: 10;">{{ $t("menu_0201_이용안내") }}</h1>
    <h2 class="title-xlarge">운영시간</h2>
    <div class="bg-gap-2"></div>
    <table class="nor_table">
      <caption class="sr-only">운영시간 테이블</caption>
      <tbody>
        <tr>
          <th scope="row" style="min-width: 150px;">운영일정</th>
          <td>매주 화~금 및 주말, 공휴일 운영 <span class="font-weight-bold">※ 휴관일(1월1일, 설날 및 추석 당일) 제외</span></td>
        </tr>
        <tr>
          <th scope="row" style="min-width: 150px;">체험인원</th>
          <td>회차별 15~30명 <span class="font-weight-bold">※ 체험별 상이함</span></td>
        </tr>
        <tr>
          <th scope="row" style="min-width: 150px;">체험시간</th>
          <td>재난체험 100분 이내, 일반응급처치 60분, 전문응급처치(이론)120분, 전문응급처치(실습)120분, 어린이안전체험 60분, 소방시설교육 60분, 소방관과함께하는119투어 80분이내</td>
        </tr>
        <tr>
          <th scope="row" style="min-width: 150px;">체험대상</th>
          <td>재난체험(초등학생이상), 일반응급처치(초등학생이상), 전문응급처치(교직원,13세미만대상교육종사자), 어린이안전체험(2018년생, 2019년생), 소방시설교육(중학생이상), 소방관과 함께하는 119투어(초등학생이상)</td>
        </tr>
      </tbody>
    </table>
    <div class="mt-4 text-red-darken-1 title-medium font-bold d-flex align-center"><v-icon aria-hidden="true" size="22" class="mr-2">mdi-alert-circle</v-icon>체험수료증은 체험 후, 19시부터 홈페이지를 통해 출력 가능합니다.</div>
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

  beforeUnmount() {
  },

  methods : {
  },
};
</script>
<template>
  <div>
    <div style="display: flex; justify-content: center;align-items: center">
      <img src="@/assets/submission_check.png" alt="" style="width: 39px; height: 39px;margin-right: 10px;"/>
      <h1 class="title-xxlarge" style="color: #0070C0;">예약신청이 완료되었습니다.</h1>
    </div>

    <h2 class="title-xlarge">신청자 정보</h2>
    <v-row>
      <v-col cols="12" md="6">
        <M4_Input v-model="oReadItem.BKR_NM" hide-details :label="'신청자명' + '(*)'" readonly></M4_Input>
      </v-col>
      <v-col cols="12" md="6">
        <M4_Input v-model="oReadItem.BKR_MBL_TELNO" hide-details :label="'휴대전화' + '(*)'" readonly></M4_Input>
      </v-col>
      <v-col cols="12" md="6">
        <M4_Input v-model="oReadItem.BKR_TELNO" hide-details label="일반전화" readonly></M4_Input>
      </v-col>
      <v-col cols="12" md="6">
        <M4_Input v-if="oAgreeDocment" v-model="oAgreeDocment.name" hide-details label="법정대리인 동의서" readonly></M4_Input>
      </v-col>

      <v-col cols="12" md="12" sm="12">
        <div class="d-flex mb-n4">
          <M4_Input v-model="oReadItem.ZIP_NO" hide-details :label="'우편번호' + '(*)'" placeholder="우편번호를 검색해주세요." persistent-placeholder readonly density="compact" variant="outlined" color="primary" style="max-width: 250px; height: 70px !important;"></M4_Input>
          <v-btn disabled color="black" class="mt-6 ml-2" style="height: 39px;" title="새창열림">주소찾기</v-btn>
        </div>
      </v-col>
      <v-col cols="12" md="6" sm="12">
        <M4_Input v-model="oReadItem.ADDR" class="mb-n4" hide-details label="주소" aria-label="주소" placeholder="" readonly></M4_Input>
      </v-col>
    </v-row>

    <div class="title-xlarge mt-10">체험자 정보</div>
    <v-row class="mt-1">
      <v-col cols="11" md="2" xl="2" style="padding-top: 15px;">
        <v-radio-group v-model="bPersonal" inline density="compact" readonly hide-details>
          <v-radio v-if="this.oSelectedExp.INDV_YN == 'Y'"  label="개인" :value="true"></v-radio>
          <v-radio v-if="this.oSelectedExp.GROUP_YN == 'Y'" label="단체" class="ml-2" :value="false"></v-radio>
        </v-radio-group>
      </v-col>

      <v-col cols="12" md="4" xl="2" v-if="!bPersonal">
        <M4_Select label="유형" v-model="oReadItem.oSelectYears" :items="$store.state.zSelectYears1" item-value="cCode" item-title="cYearsNm"></M4_Select>
      </v-col>
      <v-col cols="12" md="3" xl="3" v-if="!bPersonal">
        <M4_Input class="mt-n5" v-model="oReadItem.GROUP_NM" label="단체명(*)"></M4_Input>
      </v-col>
      <v-col cols="12" md="3" xl="3" v-if="!bPersonal">
        <M4_Input class="mt-n5" v-model="oReadItem.BKR_GROUP_TELNO" label="단체 일반전화"></M4_Input>
      </v-col>
      <v-col cols="12" md="6" xl="3" v-if="!bPersonal">
        <div class="d-flex">
          <M4_Input class="mt-n5" v-model="oReadItem.BKR_BIZNO" @keydown="bCheckBizCode = false" label="사업자등록번호(*)" placeholder="10자리의 숫자만 입력하여 주세요"></M4_Input>
        </div>
      </v-col>
      <v-col cols="1" md="10" v-if="bPersonal"></v-col>

      <v-col cols="12" md="4" style="padding-left: 5px; padding-right: 5px; min-width: 150px;">
        <div class="d-flex">
          <v-checkbox disabled v-model="bLocal1" hide-details label="내국인" aria-label="내국인"></v-checkbox>
          <v-checkbox disabled v-model="bLocal2" hide-details label="외국인" aria-label="외국인"></v-checkbox>
        </div>
      </v-col>
      <v-col cols="12" md="8" v-if="bLocal2">
        <div class="d-flex align-center">          
          <M4_Select label="국적" v-model="cSelectNation" :items="$store.state.zSelectNation" item-value="value" item-title="text" readonly hide-details></M4_Select>
        </div>
      </v-col>

      <v-col cols="12" v-if="bLocal1" style="padding-left: 7px;padding-right: 7px;">
        <div class="title-medium font-bold pl-2 pr-2 mb-1">체험자 연령(내국인)</div>
        <div class="d-flex flex-wrap" style="margin-top: -15px;">
          <v-checkbox readonly v-model="item.bSelect" v-for="(item, index) in zCheckSelectYears1" :label="item.cYearsNm" :key="index"></v-checkbox>
        </div>
        <div class="pl-2 pr-2">
          - 초등학생은 보호자(인솔자) 동반 및 예약 필수<br>
          - 초등학생 단체인 경우 10명당 1명 이상의 보호자(인솔자) 필요<br>
          - 장애인은 적정인원의 보호자(인솔자) 포함 예약 바랍니다.
        </div>
      </v-col>
      <v-col cols="12" v-for="item in zExperiencerInfo1" :key="item">
        <div class="pa-2">
          <div class="title-large">{{ item.cYearsNm }}</div>

          <v-row class="mt-2">
            <v-col cols="12" md="3" sm="6" v-for="(childInfo, index) in item.zInfo" :key="index">
              <M4_Input v-model="childInfo.RSVT_NOPE" :label="childInfo.cLabel" readonly hide-details :hide-spin-buttons="true"></M4_Input>
            </v-col>
          </v-row>
        </div>
      </v-col>
      <v-col cols="12" v-if="bLocal1" class="pt-0 pb-0"><v-divider :aria-hidden="true"></v-divider></v-col>

      <v-col cols="12" v-if="bLocal2" style="padding-left: 7px;padding-right: 7px;">
        <div class="title-medium font-bold pl-2 pr-2 mb-1">체험자 연령(외국인)</div>
        <div class="d-flex flex-wrap" style="margin-top: -15px;">
          <v-checkbox readonly v-model="item.bSelect" v-for="(item, index) in zCheckSelectYears2" :label="item.cYearsNm" :key="index"></v-checkbox>
        </div>
        <div class="pl-2 pr-2">
          - 초등학생은 보호자(인솔자) 동반 및 예약 필수<br>
          - 초등학생 단체인 경우 10명당 1명 이상의 보호자(인솔자) 필요<br>
          - 장애인은 적정인원의 보호자(인솔자) 포함 예약 바랍니다.
        </div>
      </v-col>

      <v-col cols="12" v-for="item in zExperiencerInfo2" :key="item">
        <div class="pa-2">
          <div class="title-large">{{ item.cYearsNm }}</div>

          <v-row class="mt-2">
            <v-col cols="12" md="3" sm="6" v-for="(childInfo, index) in item.zInfo" :key="index">
              <M4_Input v-model="childInfo.RSVT_NOPE" :label="childInfo.cLabel" readonly :hide-spin-buttons="true"></M4_Input>
            </v-col>
          </v-row>
        </div>
      </v-col>
      <v-col cols="12" v-if="bLocal2" class="pt-0 pb-0"><v-divider :aria-hidden="true"></v-divider></v-col>

      <v-col cols="12">
        <div class="d-flex align-center">
          휠체어 필요 여부
          <v-checkbox v-model="oReadItem.WHELL_CHAIR_YN" disabled hide-details></v-checkbox>
          <M4_Input label="" aria-label="개수" v-model="oReadItem.WHELL_CHAIR_CNT" readonly :hide-spin-buttons="true" style="max-width: 80px;margin-left: 5px;margin-right: 5px;"></M4_Input>
          대
        </div>
      </v-col>

      <v-col cols="12">
        <M4_Input v-model="iTotalReservationNum" style="max-width: 100px;margin-right: 5px;" label="총 예약 인원"></M4_Input>
      </v-col>
      <v-col cols="12">
        <M4_Inputarea v-model="oReadItem.MEMO_CN" label="기타 사항" placeholder="필요시, 추가적인 기타 사항을 입력하세요."></M4_Inputarea>
      </v-col>

      <v-col cols="12">
        <div class="d-flex align-center justify-space-around mb-2">
          이수증 발급
          <v-radio-group v-model="bCertificate" disabled inline density="compact" hide-details class="ml-2">
            <v-radio label="예" aria-label="예" :value="true"></v-radio>
            <v-radio label="아니요" aria-label="아니요" class="ml-2" :value="false"></v-radio>
          </v-radio-group>
        </div>

        <div v-for="(item, index) in zCertification" :key="index" class="mb-2">
          <v-row>
            <v-col cols="12" md="3">
              <M4_Input v-model="item.NM" readonly label="성명"></M4_Input>
            </v-col>
            <v-col cols="12" md="3">
              <M4_Input v-model="item.BRDT" label="생년월일 8자리 숫자로 입력" placeholder="" readonly hide-details :hide-spin-buttons="true"></M4_Input>
            </v-col>
            <v-col cols="12" md="4">
              <v-btn disabled class="mr-2 mb-1 mt-6" style="min-width: 100px;">동의서 / {{ item.FILE_NM }}<v-icon aria-hidden="true" class="ml-1">mdi-paperclip</v-icon></v-btn>
            </v-col>
          </v-row>
        </div>
      </v-col>
      <v-col cols="12" align="center">
        <div class="d-none d-sm-flex center_all">
          <v-btn @click="goToMenu()" color="primary" size="x-large">찾아오시는 길</v-btn>
          <v-btn @click="onPrintDialog()" class="ml-3" size="x-large">예약 확인증 인쇄</v-btn>
          <v-btn @click="ReturnMain()" class="ml-3" size="x-large">닫기</v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import * as Util from "@/Util.js";
import { EventBus } from '@/EventBus.js';

export default {
  data() {
    return {
      oSelectedExp : {
        INDV_YN : "N",
        GROUP_YN : "N",
      },
      oAgreeDocment : null,
      bPersonal : false,

      oReadItem : {
        // EXP_CD : "",
        EXP_RSVT_IDX : "",
        RSVT_TIME_CD : "",
        BKR_NM : "",
        BKR_MBL_TELNO : "",
        BKR_TELNO : "",
        GROUP_NM : "",
        BKR_GROUP_TELNO : "",
        BKR_BIZNO : "",
        ZIP_NO : "",
        ADDR : "",
        LESS14_FILE_ID : "NONE",

        oSelectYears : "00",
        WHELL_CHAIR_YN : false,
        WHELL_CHAIR_CNT : 0,

        RSVT_DT: "",
        UPDT_DT: "",
        MEMO_CN : "",
      },

      cSelectNation : "C000",
      zSelectYears2 : [],

      bPersonal : false,

      bLocal1 : false,
      zExperiencerInfo1 : [],

      bLocal2 : false,
      zExperiencerInfo2 : [],

      bCertificate : false,
      iSelectIndex : -1,
      zCertification : [{
        NM : "",
        BRDT : "",
        NowSelFile : null,
        FILE_NM : "",
        LESS14_FILE_ID : "",
      }],
    };
  },

  components: {
  },

  computed: {
    iTotalReservationNum() {
      let iTotalNum = 0

      for (let i = 0; i < this.zExperiencerInfo1.length; i ++) {
        for (let k = 0; k < this.zExperiencerInfo1[i].zInfo.length; k ++) {
          iTotalNum += Number(this.zExperiencerInfo1[i].zInfo[k].RSVT_NOPE);
        }
      }

      for (let i = 0; i < this.zExperiencerInfo2.length; i ++) {
        for (let k = 0; k < this.zExperiencerInfo2[i].zInfo.length; k ++) {
          iTotalNum += Number(this.zExperiencerInfo2[i].zInfo[k].RSVT_NOPE);
        }
      }

      return iTotalNum + "명"
    },
    zCheckSelectYears1() {
      var zResult = []
      for (let i = 0; i < this.zSelectYears2.length; i ++) {
        zResult.push({
          cYearsNm : this.zSelectYears2[i].cYearsNm,
          bSelect : this.zExperiencerInfo1.filter(Item => Item.AGE_TYPE == this.zSelectYears2[i].AGE_TYPE).length > 0,
        })
      }
      return zResult
    },
    zCheckSelectYears2() {
      var zResult = []
      for (let i = 0; i < this.zSelectYears2.length; i ++) {
        zResult.push({
          cYearsNm : this.zSelectYears2[i].cYearsNm,
          bSelect : this.zExperiencerInfo2.filter(Item => Item.AGE_TYPE == this.zSelectYears2[i].AGE_TYPE).length > 0,
        })
      }
      return zResult
    },
  },

  mounted() {
  },

  beforeUnmount() {
  },

  methods: {
    ShowSubmission(oResultData1, oResultData2) {
      this.oReadItem = {
        EXP_RSVT_IDX : oResultData1.EXP_RSVT_IDX,
        RSVT_TIME_CD : oResultData1.RSVT_TIME_CD,
        BKR_NM : oResultData1.BKR_NM,
        BKR_MBL_TELNO : oResultData1.BKR_MBL_TELNO,
        BKR_TELNO : oResultData1.BKR_TELNO,
        GROUP_NM : oResultData1.GROUP_NM,
        BKR_GROUP_TELNO : oResultData1.BKR_GROUP_TELNO,
        BKR_BIZNO : oResultData1.BKR_BIZNO,
        ZIP_NO : oResultData1.ZIP_NO,
        ADDR : oResultData1.ADDR,
        LESS14_FILE_ID : oResultData1.LESS14_FILE_ID,
        oSelectYears : oResultData1.GROUP_TYPE,
        WHELL_CHAIR_YN : Util.bStringToBool(oResultData1.WHELL_CHAIR_YN),
        WHELL_CHAIR_CNT : oResultData1.WHELL_CHAIR_CNT,
        RSVT_DT: oResultData1.RSVT_DT,
        MEMO_CN: oResultData1.MEMO_CN,
        UPDT_DT: oResultData2.UPDT_DT,
      }

      this.bCertificate = oResultData2.bCertificate
      this.zCertification = oResultData1.Certification
      this.oAgreeDocment = oResultData2.oAgreeDocment
      this.oSelectedExp = oResultData2.oSelectedExp
      this.bPersonal = oResultData2.bPersonal
      this.bLocal1 = oResultData2.bLocal1
      this.bLocal2 = oResultData2.bLocal2
      this.zExperiencerInfo1 = oResultData2.zExperiencerInfo1
      this.zExperiencerInfo2 = oResultData2.zExperiencerInfo2
      this.zSelectYears2 = oResultData2.zSelectYears2
      this.cSelectNation = oResultData2.cSelectNation
    },

    onPrintDialog() {
      // 예약정보(수정필요)
      var posData = {
        EXP_PRGRM_NM : this.oSelectedExp.cExpNm, // 프로그램
        // EXP_CD : this.oReadItem.EXP_CD, // 예약번호
        EXP_RSVT_IDX : this.oReadItem.EXP_RSVT_IDX, // 예약번호
        RSVT_DT: this.oReadItem.RSVT_DT.substring(0,10), // 날짜
        RSVT_TIME_CD: `${this.oReadItem.RSVT_TIME_CD.substring(3,5)}시`, // 시간
        iTotalReservationNum: this.iTotalReservationNum,  // 예약인원
        cLocation: Util.cTypeToPlaceNm(import.meta.env.VITE_SITE_CD),  // 교육장소
        // UPDT_DT: Util.cReturnDateToString(new Date()),  // 예약 신청일
        UPDT_DT: this.oReadItem.UPDT_DT,  // 예약 신청일
        BKR_NM: this.oReadItem.BKR_NM,  // 신청자명
        BKR_TELNO: this.oReadItem.BKR_TELNO,  // 일반전화
        BKR_MBL_TELNO: this.oReadItem.BKR_MBL_TELNO,  // 휴대전화
      }

      EventBus.$emit("onPrintDialog", posData);
    },

    ReturnMain() {
      this.$emit("ReturnMain")
    },

    goToMenu() {
      EventBus.$emit("onMenu", "exp_map_center");
    },
  },
}
</script>
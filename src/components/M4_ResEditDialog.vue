<template>
  <v-dialog aria-modal="true" @update:modelValue="DialogClose" v-model="bDialog">
    <v-card class="pa-4">
      <div class="d-flex">
        <div class="title-xlarge ml-1">신청자 정보</div>
        <v-spacer></v-spacer>
        <v-btn variant="plain" class="mt-n1" icon @click="DialogClose" title="닫기"><v-icon aria-hidden="true">mdi-close</v-icon></v-btn>
      </div>
      <v-row>
        <v-col cols="12" md="6">
          <M4_Input v-model="oEditItem.BKR_NM" hide-details label="신청자명" readonly></M4_Input>
        </v-col>
        <v-col cols="12" md="6">
          <M4_Input v-model="oEditItem.BKR_MBL_TELNO" hide-details label="휴대전화" readonly></M4_Input>
        </v-col>
        <v-col cols="12" md="6">
          <M4_Input v-model="oEditItem.BKR_TELNO" hide-details label="일반전화" ></M4_Input>
        </v-col>
        <!-- <v-col cols="12" md="6">
          <M4_Input v-if="oAgreeDocment" v-model="oAgreeDocment.name" hide-details label="법정대리인 동의서" readonly></M4_Input>
        </v-col> -->

        <v-col cols="12" md="12" sm="12">
          <div class="d-flex mb-n4">
            <M4_PostCode v-model="oEditItem.ZIP_NO" hide-details label="우편번호" placeholder="우편번호를 검색해주세요." persistent-placeholder readonly density="compact" variant="outlined" color="primary" style="max-width: 250px; height: 10px !important;"></M4_PostCode>
            <v-btn @click="openPostcode()" color="black" class="mt-6 ml-2" style="height: 39px;" title="새창열림">주소찾기</v-btn>
          </div>
        </v-col>
        <v-col cols="12">
          <M4_Input v-model="oEditItem.ADDR" class="mb-n4" hide-details label="주소" placeholder=""></M4_Input>
        </v-col>
      </v-row>

      <div class="title-xlarge mt-10">체험자 정보</div>
      <v-row class="mt-1">
        <v-col cols="11" md="2" xl="1" style="padding-top: 15px;">
          <v-radio-group v-model="bPersonal" @change="InitGroupInfo()" inline density="compact" hide-details>
            <v-radio v-if="this.oEditItem.INDV_YN == 'Y'"  label="개인" aria-label="개인" :value="true"></v-radio>
            <v-radio v-if="this.oEditItem.GROUP_YN == 'Y'" label="단체" aria-label="단체" class="ml-2" :value="false"></v-radio>
          </v-radio-group>
        </v-col>

        <v-col cols="12" md="4" xl="2" v-if="!bPersonal">          
          <M4_Select label="유형" v-model="oSelectYears" :items="$store.state.zSelectYears1" item-value="cCode" item-title="cYearsNm"></M4_Select>
        </v-col>
        <v-col cols="12" md="3" xl="3" v-if="!bPersonal">
          <M4_Input v-model="oEditItem.GROUP_NM" label="단체명(*)"></M4_Input>
        </v-col>
        <v-col cols="12" md="3" xl="3" v-if="!bPersonal">
          <M4_Input v-model="oEditItem.BKR_GROUP_TELNO" label="단체 일반전화"></M4_Input>
        </v-col>
        <v-col cols="12" md="6" xl="3" v-if="!bPersonal">
          <div class="d-flex">
            <M4_Input class="mt-5" v-model="oEditItem.BKR_BIZNO" @keydown="bCheckBizCode = false" label="사업자등록번호(*)" placeholder="10자리의 숫자만 입력하여 주세요"></M4_Input>
            <v-btn @click="CheckBizCode()" color="black" class="ml-2" style="height: 39px;" title="확인">확인</v-btn>
          </div>
        </v-col>
        <v-col cols="1" md="10" v-if="bPersonal"></v-col>
        <v-col cols="6" v-if="bShowBlankArea"></v-col>

        <v-col cols="12" md="4" style="padding-left: 5px; padding-right: 5px;">
          <div class="d-flex">
            <v-checkbox @change="ToggleExperienceInfo(1)" v-model="bLocal1" hide-details label="내국인" aria-label="내국인"></v-checkbox>
            <v-checkbox @change="ToggleExperienceInfo(2)" v-model="bLocal2" hide-details label="외국인" aria-label="외국인"></v-checkbox>
          </div>
        </v-col>
        <v-col cols="12" md="8" v-if="bLocal2">
          <div class="d-flex align-center">            
            <M4_Select label="국적" v-model="cSelectNation" :items="$store.state.zSelectNation" item-value="value" item-title="text" hide-details></M4_Select>
          </div>
        </v-col>

        <v-col cols="12" v-if="bLocal1" style="padding-left: 7px;padding-right: 7px;">
          <div class="title-medium font-bold pl-2 pr-2 mb-1">체험자 연령(내국인)</div>
          <div class="d-flex flex-wrap" style="margin-top: -15px;">
            <v-checkbox @change="SelectYears2Func(zExperiencerInfo1, item, index, 'N')" v-model="item.bSelect" v-for="(item, index) in zSelectYears1" :label="item.cYearsNm" :key="index" hide-details></v-checkbox>
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
                <M4_Input v-model="childInfo.RSVT_NOPE" :label="childInfo.cLabel" :hide-spin-buttons="true" @focus="TagetTextFeildValue"></M4_Input>
              </v-col>
            </v-row>
          </div>
        </v-col>
        <v-col cols="12" v-if="bLocal1" class="pt-0 pb-0"><v-divider :aria-hidden="true"></v-divider></v-col>

        <v-col cols="12" v-if="bLocal2" style="padding-left: 7px;padding-right: 7px;">
          <div class="title-medium font-bold pl-2 pr-2 mb-1">체험자 연령(외국인)</div>
          <div class="d-flex flex-wrap" style="margin-top: -15px;">
            <v-checkbox @change="SelectYears2Func(zExperiencerInfo2, item, index, 'Y')" v-model="item.bSelect" v-for="(item, index) in zSelectYears2" :label="item.cYearsNm" :aria-label="item.cYearsNm" :key="index" hide-details></v-checkbox>
          </div>
          <div class="pl-2 pr-2">
            - 초등학생은 보호자(인솔자) 동반 및 예약 필수<br>
            - 초등학생 단체인 경우 10명당 1명 이상의 보호자(인솔자) 필요<br>
            - 장애인은 적정인원의 보호자(인솔자) 포함 예약 바랍니다.
            <!-- 5~7세 -->
          </div>
        </v-col>

        <v-col cols="12" v-for="item in zExperiencerInfo2" :key="item">
          <div class="pa-2">
            <div class="title-large">{{ item.cYearsNm }}</div>
            <v-row class="mt-2">
              <v-col cols="12" md="3" sm="6" v-for="(childInfo, index) in item.zInfo" :key="index">
                <M4_Input v-model="childInfo.RSVT_NOPE" :label="childInfo.cLabel" :hide-spin-buttons="true" @focus="TagetTextFeildValue" ></M4_Input>
              </v-col>
            </v-row>
          </div>
        </v-col>
        <v-col cols="12" v-if="bLocal2" class="pt-0 pb-0"><v-divider :aria-hidden="true"></v-divider></v-col>

        <v-col cols="12">
          <div class="d-flex align-center">            
            <v-checkbox label="휠체어 필요 여부" v-model="WHELL_CHAIR_YN" hide-details></v-checkbox>
            <M4_Input label="개수" aria-label="개수" v-model="WHELL_CHAIR_CNT" :disabled="!WHELL_CHAIR_YN" :hide-spin-buttons="true" style="max-width: 80px;margin-left: 5px;margin-right: 5px;" ></M4_Input>
            대
          </div>
        </v-col>

        <v-col cols="12">
          <M4_Input v-model="iTotalReservationNum" style="max-width: 300px;margin-right: 5px;" label="총 예약 인원"></M4_Input>
        </v-col>
        <v-col cols="12">
          <M4_Inputarea v-model="oEditItem.MEMO_CN" label="기타 사항" placeholder="필요시, 추가적인 기타 사항을 입력하세요."></M4_Inputarea>
        </v-col>

        <v-col cols="12">
          <div class="d-flex align-center justify-space-around mb-2">
            이수증 발급
            <v-radio-group v-model="bCertificate" @change="ToggleCertificate()" inline density="compact" hide-details class="ml-2">
              <v-radio  label="예" aria-label="예" :value="true"></v-radio>
              <v-radio  label="아니요" aria-label="아니요" class="ml-2" :value="false"></v-radio>
            </v-radio-group>
            <v-btn :disabled="!bCertificate" @click="AddCertification()">추가</v-btn>
          </div>

          <label for="fileUpload" class="custom-file-label" style="display: none;">파일 첨부</label>          
          <input id="fileUpload" aria-label="파일첨부" type="file" ref="fileInput" style="display: none;" multiple @change="onFileSelected">

          <div v-for="(item, index) in zCertification" :key="index" class="mb-2">
            <v-row>
              <v-col cols="12" md="2">
                <M4_Input v-model="item.NM" hide-details label="성명"></M4_Input>
              </v-col>
              <v-col cols="12" md="3">
                <M4_Input v-model="item.BRDT" @keyup="Check14old(item)" label="생년월일 (8자리, yyyymmdd)" placeholder="YYYYMMDD" hide-details :hide-spin-buttons="true" persistent-placeholder density="compact"  variant="outlined" color="primary"></M4_Input>
              </v-col>
              <v-col cols="12" md="5">
                <v-btn v-if="!item.b14UpAge" class="mr-2 mt-5" @click="DownloadAgreeDoc('이수증발급_법정대리인_동의서.docx')">법정대리인 동의서 다운로드</v-btn>
                <v-btn v-else class="mr-2 mt-5" @click="DownloadAgreeDoc('이수증발급_개인정보수집및이용동의서_양식.docx')">개인정보이용 동의서 다운로드</v-btn>
                <v-btn @click="GetFile(item, index)" class="mt-6 mr-2 mb-1" style="min-width: 100px;" > 업로드 <v-icon aria-hidden="true" class="ml-1">mdi-paperclip</v-icon>{{ item.FILE_NM != "" ? item.FILE_NM.substring(0, 4) + "...": "첨부필요" }}</v-btn>
              </v-col>
              <v-col cols="12" md="2">
                <v-btn @click="DelCertification(item)" variant="outlined" color="black" style="width: 70px; margin-top: 25px; margin-left: 75px"><v-icon aria-hidden="true" style="margin-right: 6px;">mdi-close</v-icon>삭제</v-btn>
              </v-col>
            </v-row>
          </div>
        </v-col>
        <v-col cols="12" align="right">
          <v-btn @click="onPrintDialog()" class="mr-4" color="primary"><v-icon aria-hidden="true" style="margin-right: 6px;">mdi-calendar-month-outline</v-icon>예약 확인증 인쇄</v-btn>
          <v-btn @click="CheckDisabilityInformation()" class="mr-4" color="primary"><v-icon aria-hidden="true" style="margin-right: 6px;">mdi-calendar-month-outline</v-icon>예약수정</v-btn>
          <v-btn @click="AskDelDialog()" class="mr-4" color="primary"><v-icon aria-hidden="true" style="margin-right: 6px;">mdi-calendar-month-outline</v-icon>예약취소</v-btn>
          <v-btn @click="DialogClose" color="primary"><v-icon aria-hidden="true" style="margin-right: 6px;">mdi-close</v-icon>창닫기</v-btn>
        </v-col>
      </v-row>
    </v-card>


    <M4_Msgbox @onResult="CheckForeignerOver20" ref="M4_Msgbox_2_ref"></M4_Msgbox>
    <M4_Msgbox @onResult="SetReservationInfo" ref="M4_Msgbox_3_ref"></M4_Msgbox>

    <M4_Msgbox @onResult="CancelReservationInfo" ref="M4_Msgbox_ref"></M4_Msgbox>
  </v-dialog>
</template>

<script>
import { EventBus } from '@/EventBus.js';
import axios from "axios";
import * as Util from "@/Util.js";

export default {
  data() {
    return {
      bDialog : false,
      zSelectYears1 : [],
      zSelectYears2 : [],
      cRequestName : "",
      cRequestMobile : "",
      cRequestBirth : "",
      cToken : "",

      oEditItem: {
        EXP_CD : "",
        RSVT_TIME_CD : "",
        RSVT_DT : "",
        EXP_RSVT_IDX : -1,
        BKR_NM : "",
        BKR_MBL_TELNO : "",
        BKR_TELNO : "",
        GROUP_NM : "",
        BKR_GROUP_TELNO : "",
        INDV_YN : "N",
        GROUP_YN : "N",
        BKR_BIZNO : "",
        ZIP_NO : "",
        ADDR : "",
        UPDT_DT: "",
        EXP_PRGRM_NM: "",
        MEMO_CN : "",
      },
      oDefaultEditItem: {
        EXP_CD : "",
        RSVT_TIME_CD : "",
        RSVT_DT : "",
        EXP_RSVT_IDX : -1,
        BKR_NM : "",
        BKR_MBL_TELNO : "",
        BKR_TELNO : "",
        GROUP_NM : "",
        BKR_GROUP_TELNO : "",
        INDV_YN : "N",
        GROUP_YN : "N",
        BKR_BIZNO : "",
        ZIP_NO : "",
        ADDR : "",
        UPDT_DT: "",
        EXP_PRGRM_NM: "",
        MEMO_CN : "",
      },

      bCheckBizCode : false,
      bPersonal : true,

      oSelectYears : "00",
      cSelectNation : "C000",

      bLocal1 : true,
      zExperiencerInfo1 : [],

      bLocal2 : false,
      zExperiencerInfo2 : [],

      WHELL_CHAIR_YN : false,
      WHELL_CHAIR_CNT : 0,

      iSelectIndex : -1,
      bCertificate : false,
      zCertification : [],

      iTotalCnt : 0,
      iMaxCnt : 0,
    }
  },

  mounted() {
    // 다음 주소찾기
    this.InitDaumPostCode()
  },

  computed: {
    bShowBlankArea() {
      return (this.$vuetify.display.md || this.$vuetify.display.lg) && !this.bPersonal
    },
    // 내국인 인원수
    iReservationNum1() {
      let iTotalNum = 0

      for (let i = 0; i < this.zExperiencerInfo1.length; i ++) {
        for (let k = 0; k < this.zExperiencerInfo1[i].zInfo.length; k ++) {
          iTotalNum += Number(this.zExperiencerInfo1[i].zInfo[k].RSVT_NOPE);
        }
      }

      return iTotalNum
    },
    // 외국인 인원수
    iReservationNum2() {
      let iTotalNum = 0

      for (let i = 0; i < this.zExperiencerInfo2.length; i ++) {
        for (let k = 0; k < this.zExperiencerInfo2[i].zInfo.length; k ++) {
          iTotalNum += Number(this.zExperiencerInfo2[i].zInfo[k].RSVT_NOPE);
        }
      }

      return iTotalNum
    },
    // 총 인원수 (예약가능인원수 계산)
    iTotalReservationNum() {
      let iNowNum = this.iMaxCnt - this.iReservationNum1 - this.iReservationNum2 - this.iTotalCnt

      if (iNowNum < 0) {
        iNowNum = 0
      }

      return `${this.iReservationNum1 + this.iReservationNum2} 명 (예약 가능 인원 ${iNowNum}명)`
    },
  },

  methods : {
    // 자세 예약 내역 보여주기
    ShowDialog(oEditItem, zExperiencerInfo, zCertification, iTotalCnt, iMaxCnt, oAuthInfo) {
      this.oEditItem = Object.assign({
        EXP_CD : oEditItem.EXP_CD,
        RSVT_TIME_CD : oEditItem.RSVT_TIME_CD,
        RSVT_DT : oEditItem.RSVT_DT,
        INDV_YN : oEditItem.INDV_YN,
        GROUP_YN : oEditItem.GROUP_YN,
        EXP_RSVT_IDX : oEditItem.EXP_RSVT_IDX,
        BKR_NM : oEditItem.BKR_NM,
        BKR_MBL_TELNO : oEditItem.BKR_MBL_TELNO,
        BKR_TELNO : oEditItem.BKR_TELNO,
        GROUP_NM : oEditItem.GROUP_NM,
        BKR_GROUP_TELNO : oEditItem.BKR_GROUP_TELNO,
        BKR_BIZNO : oEditItem.BKR_BIZNO,
        ZIP_NO : oEditItem.ZIP_NO,
        ADDR : oEditItem.ADDR,
        UPDT_DT : oEditItem.UPDT_DT,
        EXP_PRGRM_NM : oEditItem.EXP_PRGRM_NM,
        MEMO_CN : oEditItem.MEMO_CN,
      })

      this.cRequestName = oAuthInfo.cRequestName
      this.cRequestMobile = oAuthInfo.cRequestMobile
      this.cRequestBirth = oAuthInfo.cRequestBirth
      this.cToken = oAuthInfo.jwt

      this.bCheckBizCode = true
      this.bPersonal = Util.bStringToBool(oEditItem.SELECT_GROUP_YN)
      this.oSelectYears = oEditItem.GROUP_TYPE

      var zSelectAbleArray = Util.ReturnSelectArray({
        AGE1_YN : oEditItem.AGE1_YN,
        AGE2_YN : oEditItem.AGE2_YN,
        AGE3_YN : oEditItem.AGE3_YN,
        AGE4_YN : oEditItem.AGE4_YN,
        AGE5_YN : oEditItem.AGE5_YN,
        AGE6_YN : oEditItem.AGE6_YN,
        AGE7_YN : oEditItem.AGE7_YN,
      });

      this.zSelectYears1 = []
      this.zSelectYears2 = []

      for (let i = 0; i < zSelectAbleArray.length; i ++) {
        this.zSelectYears1.push(Object.assign({bSelect : false}, {...zSelectAbleArray[i]}))
        this.zSelectYears2.push(Object.assign({bSelect : false}, {...zSelectAbleArray[i]}))
      }

      let zExperiencerInfo1 = zExperiencerInfo.filter(item => item.FRGNR_YN == "N");
      let zExperiencerInfo2 = zExperiencerInfo.filter(item => item.FRGNR_YN == "Y");
      this.bLocal1 = zExperiencerInfo1.length > 0
      this.bLocal2 = zExperiencerInfo2.length > 0

      this.cSelectNation = this.bLocal2 ? this.$store.state.zSelectNation.filter(item => item.text == zExperiencerInfo2[0].NTN_NM)[0].value : "C000"

      this.zExperiencerInfo1 = this.cReturnDisplayArray(zExperiencerInfo1, this.zSelectYears1, "N")
      this.zExperiencerInfo2 = this.cReturnDisplayArray(zExperiencerInfo2, this.zSelectYears2, "Y")

      this.zCertification = zCertification
      this.bCertificate = this.zCertification.length > 0? true: false
      this.zCertification.forEach(item => {
        item.NowSelFile = null
        item.FILE_NM = item.LESS14_FILE_ID == "NONE" ? "" : item.FILE_NM
        item.b14UpAge = Util.s14OldCheck(item.BRDT)
      })
      console.log(this.zCertification);
      this.iTotalCnt = iTotalCnt
      this.iMaxCnt = iMaxCnt
      this.bDialog = true
      this.$store.state.isDialog = true;
      this.$store.state.btnDialogRef = document.activeElement;
    },

    DialogClose() {
      this.bDialog = false;
      this.$store.state.isDialog = false;
      EventBus.$emit("onBackDialogBtn");
    },

    cReturnDisplayArray(zData, zDisplaySelectArray, FRGNR_YN) {
      var zReturnArray = []

      const zAgeType = zData.map(item => {
        return item.AGE_TYPE
      })

      for (let i = 0; i < zAgeType.length; i ++) {
        let zFilterObj = zDisplaySelectArray.filter(item => item.AGE_TYPE == zAgeType[i])

        if (zFilterObj.length > 0) {
          zFilterObj[0].bSelect = true

          zReturnArray.push({
            AGE_TYPE : zFilterObj[0].AGE_TYPE,
            cYearsNm : zFilterObj[0].cYearsNm,
            iOrder : zDisplaySelectArray.indexOf(zFilterObj[0]),
            FRGNR_YN : FRGNR_YN,
            NTN_NM : "",
            zInfo : [
              {cLabel : "남자(비장애인)", GNDR_TYPE : "M", DISABLED_YN : "N", DISABLED_TYPE : "", RSVT_NOPE : 0},
              {cLabel : "여자(비장애인)", GNDR_TYPE : "Y", DISABLED_YN : "N", DISABLED_TYPE : "", RSVT_NOPE : 0},
              {cLabel : "남자(시각장애인)", GNDR_TYPE : "M", DISABLED_YN : "Y", DISABLED_TYPE : "V", RSVT_NOPE : 0},
              {cLabel : "여자(시각장애인)", GNDR_TYPE : "Y", DISABLED_YN : "Y", DISABLED_TYPE : "V", RSVT_NOPE : 0},
              {cLabel : "남자(청각장애인)", GNDR_TYPE : "M", DISABLED_YN : "Y", DISABLED_TYPE : "H", RSVT_NOPE : 0},
              {cLabel : "여자(청각장애인)", GNDR_TYPE : "Y", DISABLED_YN : "Y", DISABLED_TYPE : "H", RSVT_NOPE : 0},
              {cLabel : "남자(정신장애인)", GNDR_TYPE : "M", DISABLED_YN : "Y", DISABLED_TYPE : "M", RSVT_NOPE : 0},
              {cLabel : "여자(정신장애인)", GNDR_TYPE : "Y", DISABLED_YN : "Y", DISABLED_TYPE : "M", RSVT_NOPE : 0},
            ],
          })
        }
      }

      for (let i = 0; i < zData.length; i ++) {
        let oUpdateObj = zReturnArray.filter(item => item.AGE_TYPE == zData[i].AGE_TYPE)

        if (oUpdateObj.length > 0) {
          let oUpdateChildObj = oUpdateObj[0].zInfo.filter(item => item.GNDR_TYPE == zData[i].GNDR_TYPE && item.DISABLED_YN == zData[i].DISABLED_YN && item.DISABLED_TYPE == zData[i].DISABLED_TYPE)

          oUpdateChildObj[0].RSVT_NOPE = zData[i].RSVT_NOPE
        }
      }

      return zReturnArray
    },

    InitDaumPostCode() {
      if (!this.DaumWindow) {
        this.DaumWindow = new window.daum.Postcode({
          oncomplete : (data) => {
            this.oEditItem.ZIP_NO = data.zonecode
            this.oEditItem.ADDR = data.userSelectedType == "R" ? data.roadAddress : data.jibunAddress
          }
        })
      }
    },

    openPostcode() {
      this.DaumWindow.open()
    },

    InitDialogData() {
      this.InitGroupInfo();
      this.bDialog = false;
      this.$store.state.isDialog = false;
      
      this.oEditItem = {...this.oDefaultEditItem};
      this.zExperiencerInfo1 = [];
      this.zExperiencerInfo2 = [];
      this.bPersonal = true;
      this.bLocal1 = true;
      this.WHELL_CHAIR_CNT = 0;

      this.bLocal2 = false;
      this.WHELL_CHAIR_YN = false;
      this.WHELL_CHAIR_CNT = 0;
      
      this.bCertificate = false;
      this.zCertification = [];
      this.cSelectNation = "C000";
    },

    InitGroupInfo() {
      this.oSelectYears = "00",
      this.oEditItem.GROUP_NM = ""
      this.oEditItem.BKR_GROUP_TELNO = ""
      this.oEditItem.BKR_BIZNO = ""
      this.bCheckBizCode = false
    },

    // 국세청 API 확인
    CheckBizCode() {
      this.oEditItem.BKR_BIZNO = this.oEditItem.BKR_BIZNO.replace(/-/g,'')

      if (this.oEditItem.BKR_BIZNO.length != 10 || !/[0-9]{10}$/.test(this.oEditItem.BKR_BIZNO)) {
        EventBus.$emit("onShowMsg", {
          cSubTitle : "입력하신 사업자 번호의 형식이 올바르지 않습니다.",
          cTitle : "10자리의 숫자만 입력 하여 주세요.",
          cMsg : "",
        });
        return
      }

      const serviceKey = 'ezOvlcdSnta4n%2FzxgMUd05ZOz%2FNARMuD7r5br%2FX7sYOzR3juvsfQN549b4uQ%2BR9Mf614N6JhRFl2YDMAFhwM7A%3D%3D'; //일반 인증키(Encoding) 사용
      const apiUrl = `https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=${serviceKey}`;

      axios
        .post(apiUrl, {
          b_no: [this.oEditItem.BKR_BIZNO]
        })
        .then(res => {
          if (res.data.data[0].tax_type === "국세청에 등록되지 않은 사업자등록번호입니다.") {
            EventBus.$emit("onShowMsg", {
              cSubTitle : "사업자 번호를 다시 확인하여 주세요.",
              cTitle : "국세청에 등록되지 않은 사업자등록번호입니다.",
              cMsg : "",
            });
          } else {
            this.bCheckBizCode = true
            EventBus.$emit("onAlarmSnackbar", {
              cColor : "info",
              iTimeOut : 4000,
              sMsg : "확인 되었습니다.",
            })
          }
        })
        .catch(err => {
          console.error(err);
        });
    },

    ToggleExperienceInfo(iCase) {
      if (iCase == 1) {
        if (!this.bLocal1) {
          this.zExperiencerInfo1 = []
          this.zSelectYears1.forEach(item => item.bSelect = false)
        } 
      } else {
        if (!this.bLocal2) {
          this.zExperiencerInfo2 = []
          this.zSelectYears2.forEach(item => item.bSelect = false)
        }
      }
    },

    TagetTextFeildValue(event) {
      event.target.select();
    },

    SelectYears2Func(AddArray, item, iIndex, FRGNR_YN) {
      let iDelIndex = AddArray.findIndex(Item => Item.AGE_TYPE == item.AGE_TYPE)

      if (iDelIndex == -1) {
        AddArray.push({
          AGE_TYPE : item.AGE_TYPE,
          cYearsNm : item.cYearsNm,
          iOrder : iIndex,
          FRGNR_YN : FRGNR_YN,
          NTN_NM : "",
          zInfo : [
            {cLabel : "남자(비장애인)", GNDR_TYPE : "M", DISABLED_YN : "N", DISABLED_TYPE : "", RSVT_NOPE : 0},
            {cLabel : "여자(비장애인)", GNDR_TYPE : "Y", DISABLED_YN : "N", DISABLED_TYPE : "", RSVT_NOPE : 0},
            {cLabel : "남자(시각장애인)", GNDR_TYPE : "M", DISABLED_YN : "Y", DISABLED_TYPE : "V", RSVT_NOPE : 0},
            {cLabel : "여자(시각장애인)", GNDR_TYPE : "Y", DISABLED_YN : "Y", DISABLED_TYPE : "V", RSVT_NOPE : 0},
            {cLabel : "남자(청각장애인)", GNDR_TYPE : "M", DISABLED_YN : "Y", DISABLED_TYPE : "H", RSVT_NOPE : 0},
            {cLabel : "여자(청각장애인)", GNDR_TYPE : "Y", DISABLED_YN : "Y", DISABLED_TYPE : "H", RSVT_NOPE : 0},
            {cLabel : "남자(정신장애인)", GNDR_TYPE : "M", DISABLED_YN : "Y", DISABLED_TYPE : "M", RSVT_NOPE : 0},
            {cLabel : "여자(정신장애인)", GNDR_TYPE : "Y", DISABLED_YN : "Y", DISABLED_TYPE : "M", RSVT_NOPE : 0},
          ]
        })

        AddArray.sort(function(a, b)  {
          return a.iOrder - b.iOrder;
        });
      } else {
        AddArray.splice(iDelIndex, 1)
      }
    },

    ToggleCertificate() {
      if (!this.bCertificate) {
        this.zCertification = []
      } else {
        this.zCertification.push({
          NM : "",
          BRDT : "",
          NowSelFile : null,
          b14UpAge : false,
          FILE_NM : "",
          LESS14_FILE_ID : "NONE",
        })
      }
    },

    GetFile(item, iIndex) {
      item.NowSelFile = null
      this.iSelectIndex = iIndex
      this.$refs.fileInput.click();
    },

    // 파일이 선택되면 발생하는 이벤트
    onFileSelected(event) {
      this.zCertification[this.iSelectIndex].NowSelFile = event.target.files[0]
      this.zCertification[this.iSelectIndex].FILE_NM = event.target.files[0].name
    },

    AddCertification() {
      this.zCertification.push({
        NM : "",
        BRDT : "",
        NowSelFile : null,
        b14UpAge : false,
        FILE_NM : "",
        LESS14_FILE_ID : "NONE",
      })
    },

    DelCertification(item) {
      this.zCertification.splice(this.zCertification.indexOf(item), 1)
    },

    // 파일 저장하기
    bSendSvrFile(NowSelFile) {
      var d = new Date();
      var Year = d.getFullYear();
      var fileName = NowSelFile.name;
      var Extend = Util.getExtension(fileName).toUpperCase();
      var sFileTypeId = Util.sGetId(Util.sGetFileType(NowSelFile.type));

      let formData = new FormData();
      formData.append('uploadfilenor', NowSelFile);
      return new Promise((resolve) => (
        axios.post(import.meta.env.VITE_UIL_API + "UploadFileNorNew?PublicFile=Y&Year="+Year+"&FileNm="+fileName+"&Extend="+Extend+"&MimeType="+NowSelFile.type+"&Size="+NowSelFile.size+"&FileTypeId="+sFileTypeId,
                formData,
                {
                headers: {
                  // "Authorization" : this.CustomInfo.Token,
                  'Content-Type' : 'multipart/form-data',
                }
              }
            )
            .then(res => {
              resolve(res);
            })
            .catch(err =>{
              resolve(null);
              EventBus.$emit("onShowMsg", {
                cSubTitle : "파일저장에 실패하였습니다.",
                cTitle : "관리자에게 문의 바랍니다.",
                cMsg : `Error : ${err}`,
              });
          })
      ));
    },

    CheckDisabilityInformation() {
      for (let i = 0; i < this.zExperiencerInfo1.length; i ++) {
        for (let k = 0; k < this.zExperiencerInfo1[i].zInfo.length; k ++) {
          if (k > 1 && Number(this.zExperiencerInfo1[i].zInfo[k].RSVT_NOPE) != 0) {
            this.$refs.M4_Msgbox_2_ref.ShowReturn("장애인이 체험을 하기 위해서는 인솔자(보호자) 동반이 필수입니다.", "인솔자(보호자) 인원정보도 기입하지 않으셨을 경우, 예약 수정을 통해 입력하여 주세요.", "")
            return
          }
        }
      }

      for (let i = 0; i < this.zExperiencerInfo2.length; i ++) {
        for (let k = 0; k < this.zExperiencerInfo2[i].zInfo.length; k ++) {
          if (k > 1 && Number(this.zExperiencerInfo2[i].zInfo[k].RSVT_NOPE) != 0) {
            this.$refs.M4_Msgbox_2_ref.ShowReturn("장애인이 체험을 하기 위해서는 인솔자(보호자) 동반이 필수입니다.", "인솔자(보호자) 인원정보도 기입하지 않으셨을 경우, 예약 수정을 통해 입력하여 주세요.", "")
            return
          }
        }
      }

      this.CheckForeignerOver20(true);
    },

    CheckForeignerOver20(bResult) {
      if (!bResult) {
        return
      }

      if (this.bLocal2 && this.iReservationNum1 + this.iReservationNum2 >= 20) {
        this.$refs.M4_Msgbox_3_ref.ShowReturn("외국인 예약 시에는 통역사 동반이 필수입니다.", "20명 이상일 경우 체험관으로 직접 문의해 주세요.", "")
      } else {
        this.SetReservationInfo(true)
      }
    },

    async SetReservationInfo(bResult) {
      if (!bResult) {
        return
      }

      if (this.iMaxCnt - this.iTotalCnt - this.iReservationNum1 - this.iReservationNum2 < 0 ) {
        EventBus.$emit("onShowMsg", {
          cSubTitle : "신청 가능한 최대 인원수를 넘었습니다.",
          cTitle : "확인 후 인원 정보를 수정해 주세요.",
          cMsg : "",
        });
        return
      }

      if (this.bPersonal && this.iReservationNum1 + this.iReservationNum2 > 10) {
        EventBus.$emit("onShowMsg", {
          cSubTitle : "개인 예약 시 신청 가능한 최대 인원 수를 넘었습니다.",
          cTitle : "개인 예약 시에는 최대 10명까지만 가능 합니다.",
          cMsg : "",
        });
        return
      }

      if (!this.bPersonal && this.iReservationNum1 + this.iReservationNum2 > 30) {
        EventBus.$emit("onShowMsg", {
          cSubTitle : "단체 예약 시 신청 가능한 최대 인원 수를 넘었습니다.",
          cTitle : "단체 예약 시에는 최대 30명까지만 가능 합니다.",
          cMsg : "",
        });
        return
      }

      if (!this.bPersonal && this.oEditItem.BKR_GROUP_TELNO == "") {
        EventBus.$emit("onShowMsg", {
          cSubTitle : "단체 예약 시에는 일반전화번호를 반드시 입력하셔야 합니다.",
          cTitle : "일반전화 정보를 입력하여 주세요.",
          cMsg : "",
        });
        return
      }

      if (!this.bPersonal && this.oSelectYears == "00") {
        EventBus.$emit("onShowMsg", {
          cSubTitle : "단체 유형을 선택해 주세요.",
          cTitle : "단체 예약 시에는 유형 선택은 필수 입니다.",
          cMsg : "",
        });
        return
      }

      if (this.bLocal1 && this.iReservationNum1 == 0) {
        EventBus.$emit("onShowMsg", {
          cSubTitle : "인원정보가 누락되었습니다.",
          cTitle : "예약 가능한 최소 내국인 인원은 1명입니다.",
          cMsg : "",
        });
        return
      }

      if (this.bLocal2 && this.iReservationNum2 == 0) {
        EventBus.$emit("onShowMsg", {
          cSubTitle : "인원정보가 누락되었습니다.",
          cTitle : "예약 가능한 최소 외국인 인원은 1명입니다.",
          cMsg : "",
        });
        return
      }

      if (this.bLocal2 && this.cSelectNation == "C000") {
        EventBus.$emit("onShowMsg", {
          cSubTitle : "국적을 선택해 주세요.",
          cTitle : "국적 정보를 선택해 주세요.\n2개국 이상이실 경우 그 외로 선택해 주세요.",
          cMsg : "",
        });
        return
      }

      if (!this.bPersonal && !this.bCheckBizCode) {
        EventBus.$emit("onShowMsg", {
          cSubTitle : "사업자 번호가 유효한지 검증이 필요합니다.",
          cTitle : "사업자 번호 입력 란 옆의 확인 버튼을 눌러서 해당 사업자 번호가 유효한 번호인지 확인해 주세요.",
          cMsg : "",
        });
        return
      }

      let zExperiencerInfo1 = JSON.parse(JSON.stringify(this.zExperiencerInfo1))
      let zExperiencerInfo2 = JSON.parse(JSON.stringify(this.zExperiencerInfo2))

      for (let i = 0; i < zExperiencerInfo1.length; i ++) {
        zExperiencerInfo1[i].zInfo = zExperiencerInfo1[i].zInfo.filter(item => item.RSVT_NOPE !== 0);
        zExperiencerInfo1[i].NTN_NM = "대한민국"

        zExperiencerInfo1[i].zInfo.forEach((item) => {
          item.RSVT_NOPE = Number(item.RSVT_NOPE)
        })
      }

      for (let i = 0; i < zExperiencerInfo2.length; i ++) {
        zExperiencerInfo2[i].zInfo = zExperiencerInfo2[i].zInfo.filter(item => item.RSVT_NOPE !== 0);
        zExperiencerInfo2[i].NTN_NM = this.$store.state.zSelectNation.filter(item => item.value == this.cSelectNation)[0].text

        zExperiencerInfo2[i].zInfo.forEach((item) => {
          item.RSVT_NOPE = Number(item.RSVT_NOPE)
        })
      }

      for (let i = 0; i < this.zCertification.length; i ++) {
        if (!this.zCertification[i].FILE_NM) {
          EventBus.$emit("onShowMsg", {
            cSubTitle : "동의서가 필요합니다.",
            cTitle : "14세 미만의 경우, 법정대리인 동의서가 필요합니다. 14세 이상인 경우, 개인정보 이용동의서를 첨부하여 주세요.",
            cMsg : "",
          });
          return
        }

        if (this.zCertification[i].NowSelFile) {
          var res = await this.bSendSvrFile(this.zCertification[i].NowSelFile)

          if (res) {
            if (res.data.ResultCd == "00") {
              this.zCertification[i].LESS14_FILE_ID = res.data.FileId
            } else {
              EventBus.$emit("onShowMsg", {
                cSubTitle : "파일저장에 실패하였습니다.",
                cTitle : "관리자에게 문의 바랍니다.",
                cMsg : `Error : ${res.data.Msg}`,
              });
              return
            }
          } else {
            EventBus.$emit("onShowMsg", {
              cSubTitle : "파일저장에 실패하였습니다.",
              cTitle : "관리자에게 문의 바랍니다.",
              cMsg : `Error : ${res.data.Msg}`,
            });
            return
          }
        }
      }

      if (!this.WHELL_CHAIR_YN) {
        this.WHELL_CHAIR_CNT = 0
      }

      var posData = {
        EXP_CD : this.oEditItem.EXP_CD,
        RSVT_TIME_CD : this.oEditItem.RSVT_TIME_CD,
        RSVT_DT : this.oEditItem.RSVT_DT,
        EXP_RSVT_IDX : this.oEditItem.EXP_RSVT_IDX,
        SITE_CD : import.meta.env.VITE_SITE_CD,

        BKR_NM : this.oEditItem.BKR_NM,
        BKR_MBL_TELNO : this.oEditItem.BKR_MBL_TELNO,
        BKR_TELNO : this.oEditItem.BKR_TELNO,
        GROUP_NM : this.oEditItem.GROUP_NM,
        BKR_GROUP_TELNO : this.oEditItem.BKR_GROUP_TELNO,
        BKR_BIZNO : this.oEditItem.BKR_BIZNO,

        GROUP_TYPE : this.bPersonal ? "01" : this.oSelectYears,
        GROUP_YN : Util.cBoolToString(this.bPersonal),

        ZIP_NO : this.oEditItem.ZIP_NO,
        ADDR : this.oEditItem.ADDR,
        Personal : Util.cBoolToString(this.bPersonal),

        WHELL_CHAIR_YN : Util.cBoolToString(this.WHELL_CHAIR_YN),
        WHELL_CHAIR_CNT : Number(this.WHELL_CHAIR_CNT),

        MEMO_CN : this.oEditItem.MEMO_CN,

        ExperiencerInfo1 : zExperiencerInfo1,
        ExperiencerInfo2 : zExperiencerInfo2,
        Certification : this.zCertification,

        Name : this.cRequestName,
        TelNo : this.cRequestMobile,
        Birth : this.cRequestBirth,
        Token : this.cToken,

        National : this.$i18n.locale,
      }

      axios
        .post(import.meta.env.VITE_UIL_API + "SetReservationInfo", posData , {
          headers: {
          }
        })
        .then(res => {
          if (res.data.ResultCd === "00") {
            this.$emit("UpdateReservation", posData.EXP_RSVT_IDX, this.iReservationNum1 + this.iReservationNum2)
            this.InitDialogData();
          } else {
            EventBus.$emit("onShowMsg", {
              cSubTitle : "예약 신청 중 문제가 발생했습니다.",
              cTitle : "계속 지속될 경우 담당자에게 문의 바랍니다.",
              cMsg : res.data.Msg,
            });
          }
        })
        .catch(err =>{
          EventBus.$emit("onShowMsg", {
            cSubTitle : "예약 신청 중 문제가 발생했습니다.",
            cTitle : "계속 지속될 경우 담당자에게 문의 바랍니다.",
            cMsg : `Error : ${err}`,
          });
        })
        .finally(() =>{
        })
    },

    onPrintDialog() {
      // 예약정보(완료)
      var posData = {
        EXP_PRGRM_NM : this.oEditItem.EXP_PRGRM_NM, // 프로그램
        // EXP_CD : this.oEditItem.EXP_CD, // 예약번호
        EXP_RSVT_IDX : this.oEditItem.EXP_RSVT_IDX, // 예약번호
        RSVT_DT: this.oEditItem.RSVT_DT.substring(0,10), // 날짜
        RSVT_TIME_CD: `${this.oEditItem.RSVT_TIME_CD.substring(3,5)}시`, // 시간
        iTotalReservationNum: `${this.iReservationNum1 + this.iReservationNum2}명`,  // 예약인원
        cLocation: Util.cTypeToPlaceNm(import.meta.env.VITE_SITE_CD),  // 교육장소
        UPDT_DT: this.oEditItem.UPDT_DT,  // 예약 신청일
        BKR_NM: this.oEditItem.BKR_NM,  // 신청자명
        BKR_TELNO: this.oEditItem.BKR_TELNO,  // 일반전화
        BKR_MBL_TELNO: this.oEditItem.BKR_MBL_TELNO,  // 휴대전화
      }
      EventBus.$emit("onPrintDialog", posData);
    },

    AskDelDialog() {
      this.$refs.M4_Msgbox_ref.ShowReturn("예약을 취소하시겠습니까?","","")
    },

    CancelReservationInfo(bResult) {
      if (!bResult) {
        return
      }

      var posData = {
        EXP_RSVT_IDX : this.oEditItem.EXP_RSVT_IDX,
        BKR_NM : this.oEditItem.BKR_NM,
        BKR_MBL_TELNO : this.oEditItem.BKR_MBL_TELNO,
        SITE_CD : import.meta.env.VITE_SITE_CD,
        EXP_CD : this.oEditItem.EXP_CD,
        National : this.$i18n.locale,
      }

      axios
        .post(import.meta.env.VITE_UIL_API + "CancelReservationInfo", posData , {
          headers: {
          }
        })
        .then(res => {
          if (res.data.ResultCd === "00") {
            this.$emit("CancelReservation", posData.EXP_RSVT_IDX)
            this.InitDialogData();
          } else {
            EventBus.$emit("onShowMsg", {
              cSubTitle : "예약 수정 중 문제가 발생했습니다.",
              cTitle : "계속 지속될 경우 담당자에게 문의 바랍니다.",
              cMsg : `Error : ${res.data.Msg}`,
            });
          }
        })
        .catch(err =>{
          EventBus.$emit("onShowMsg", {
            cSubTitle : "예약 수정 중 문제가 발생했습니다.",
            cTitle : "계속 지속될 경우 담당자에게 문의 바랍니다.",
            cMsg : `Error : ${err}`,
          });
        })
        .finally(() =>{
        })
    },

    Check14old(item) {
      console.log("!!!!!!!", item)
      item.b14UpAge = Util.s14OldCheck(item.BRDT)
    },

    DownloadAgreeDoc(name) {
      axios({
        url: import.meta.env.VITE_SYSTEM_FILE_API + name,
        method: 'GET',
        responseType: 'blob',
        })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', name);
          document.body.appendChild(link);
          link.click();
        });
    },

  },
}
</script>
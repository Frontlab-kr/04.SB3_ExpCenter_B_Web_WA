<template>
  <v-dialog aria-modal="true" @update:modelValue="DialogClose" v-model="isShow" fullscreen>
    <v-card style="background-color: white;">
      <div class="pa-4">
        <div class="d-flex">
          <div class="title-xxlarge ml-1">체험관 예약</div>
          <v-spacer></v-spacer>
          <v-btn variant="plain" class="mt-n1" icon @click="DialogClose" title="닫기"><v-icon aria-hidden="true">mdi-close</v-icon></v-btn>
        </div>
        <div style="height: calc(100vh - 100px); overflow: auto;">
          <v-stepper-vertical ref="stepper" v-model="iStep" :items="['Step 1 본인인증', 'Step 2 프로그램 선택', 'Step 3 신청정보 입력']" flat>            
            <template v-slot:item.1>              
              <div flat>
                <!-- <M4_Reservation_Agree :b14Age="true" class="mb-2" @onSuccessAuth="onSuccessAuth"></M4_Reservation_Agree> -->
                <component :b14Age="true" class="mb-2" @onSuccessAuth="onSuccessAuth" :is="local_site_component"/>
              </div>
            </template>
            <template v-slot:item.2>
              <v-row>
                <v-col cols="12" md="6" sm="12">
                  <div class="">
                    <M4_Select 
                      v-model="cSelectedExp"
                      :items="$store.state.zExp"
                      @update:model-value="CheckChangeTest()"
                      placeholder="체험을 선택하세요."
                      density="compact"
                      variant="outlined"
                      color="primary"
                      persistent-placeholder
                      item-title="cExpNm"
                      item-value="cExpCd"
                      label="Select"     
                      single-line
                      return-object
                    ></M4_Select>
                    <div class="center_all" >
                      <!-- <v-date-picker v-model="ToDaydate" @update:model-value="SelectDate" header="일자선택"
                        :allowed-dates="allowedDates" @input="menu = false" show-adjacent-months></v-date-picker> -->                        
                        <div>
                          <div class="mt-5">일자선택</div>
                          <M4_DateRes v-model:cDate="ToDaydate" :allowedDates="allowedDates"  @onDate="SelectDate"></M4_DateRes>
                        </div>
                    </div>
                  </div>
                </v-col>
                <v-col cols="12" md="6" sm="12">
                  <div style="overflow: auto;">
                    <div class="ma-2 pa-2" v-for="(item, i) in zSelectReservationTimeList" :key="i" :style="'border-radius: 5px; background-color: var(--gray-5); '
                      + (item.bAble ? 'border: 1px solid var(--gray-50); background-color:white':'color:var(--gray-50); border: 1px solid var(--gray-30);')">
                      <table width="100%" class="text-center" >
                        <caption class="sr-only">체험 정보 테이블</caption>
                        <td width="30%">{{item.iRound}}회차</td>
                        <td width="30%">{{item.cDispalyTime}}</td>
                        <td width="40%"  v-if="item.bAble"><v-btn color="primary" @click="SelectRound(item)">예약</v-btn></td>
                        <td width="40%" v-else>만료됨</td>
                      </table>
                    </div>


                    <div class="pl-2 pr-2 pb-5 pt-10" style="width : 100%">
                      <v-btn @click="ShowAlarmDialog()" block>빈자리 알림 신청</v-btn>
                    </div>
                  </div>
                </v-col>
              </v-row>
              <div v-html="oSelectedExp.TIME_DESC" class="mt-4"></div>
            </template>
            <template v-slot:item.3>
              <div class="pa-4">
                <h2 class="title-xlarge">신청자 정보</h2>
                <v-row>
                  <v-col cols="12" md="6">
                    <M4_Input v-model="cRequestName" hide-details :label="'신청자명' + '(*)'" readonly></M4_Input>
                  </v-col>
                  <v-col cols="12" md="6">
                    <M4_Input v-model="cRequestMobile" hide-details :label="'휴대전화' + '(*)'"  readonly></M4_Input>
                  </v-col>
                  <v-col cols="12" md="6">
                    <M4_Input v-if="bSelectedAgree2" v-model="oEditItem.BKR_TELNO" hide-details label="일반전화"></M4_Input>
                  </v-col>
                  <v-col cols="12" md="6">
                    <M4_Input v-if="oAgreeDocment" v-model="oAgreeDocment.name" hide-details label="법정대리인 동의서" readonly></M4_Input>
                  </v-col>

                  <v-col cols="12" md="12" sm="12">
                    <div class="d-flex mb-n4">
                      <M4_PostCode v-model="oEditItem.ZIP_NO" hide-details :label="'우편번호' + '(*)'"  :placeholder="placeholderText" persistent-placeholder readonly density="compact" variant="outlined" color="primary" style="max-width: 250px; height: 10px !important;"></M4_PostCode>
                      <v-btn @click="openPostcode()" color="black" class="ml-2" style="margin-top: 22px; height: 39px;" title="새창열림">주소찾기</v-btn>
                    </div>
                  </v-col>
                  <v-col cols="12">
                    <M4_Input v-model="oEditItem.ADDR" class="mb-n4" hide-details label="주소" placeholder=""></M4_Input>
                  </v-col>
                </v-row>

                <div class="d-flex mt-10">
                  <div class="title-xlarge mr-3">체험자 정보</div>
                  <div>(&nbsp;<strong style="color: red;">*</strong> 표시는 필수 입력사항입니다.&nbsp;)</div>
                </div>

                <v-row class="mt-1">
                  <v-col cols="11" md="2" xl="1" style="padding-top: 15px;">
                    <v-radio-group v-model="bPersonal" @change="InitGroupInfo()" inline density="compact" hide-details>
                      <v-radio v-if="this.oSelectedExp.INDV_YN == 'Y'"  label="개인"  :value="true"></v-radio>
                      <v-radio v-if="this.oSelectedExp.GROUP_YN == 'Y'" label="단체"  class="ml-2" :value="false"></v-radio>
                    </v-radio-group>
                  </v-col>

                  <v-col cols="12" md="4" xl="2" v-if="!bPersonal">                    
                    <M4_Select label="유형" v-model="oSelectYears" :items="$store.state.zSelectYears1" item-value="cCode" item-title="cYearsNm"></M4_Select>
                  </v-col>
                  <v-col cols="12" md="3" xl="3" v-if="!bPersonal">
                    <M4_Input v-model="oEditItem.GROUP_NM" label="단체명(*)" ></M4_Input>
                  </v-col>
                  <v-col cols="12" md="3" xl="3" v-if="!bPersonal">
                    <M4_Input v-model="oEditItem.BKR_GROUP_TELNO" label="단체 일반전화(*)"></M4_Input>
                  </v-col>
                  <v-col cols="12" md="6" xl="3" v-if="!bPersonal">
                    <div class="d-flex">
                      <M4_Input class="mt-n5" v-model="oEditItem.BKR_BIZNO" @keydown="bCheckBizCode = false" label="사업자등록번호(*)" placeholder="10자리의 숫자만 입력하여 주세요"></M4_Input>
                      <v-btn @click="CheckBizCode()" color="black" class="ml-2" style="height: 39px;">확인</v-btn>
                    </div>
                  </v-col>
                  <v-col cols="1" md="10" v-if="bPersonal"></v-col>
                  <v-col cols="6" v-if="bShowBlankArea"></v-col>

                  <v-col cols="12" md="4" style="padding-left: 5px; padding-right: 5px;">
                    <div class="d-flex">
                      <v-checkbox @change="ToggleExperienceInfo(1)" v-model="bLocal1" hide-details label="내국인" aria-label="내국인"></v-checkbox>
                      <v-checkbox @change="ToggleExperienceInfo(2)" v-model="bLocal2" hide-details label="외국인" aria-label="외국인"></v-checkbox>
                      <!-- <v-checkbox :disabled="!bLocal2" @change="ToggleExperienceInfo(1)" v-model="bLocal1" hide-details label="내국인" aria-label="내국인"></v-checkbox>
                      <v-checkbox :disabled="!bLocal1" @change="ToggleExperienceInfo(2)" v-model="bLocal2" hide-details label="외국인" aria-label="외국인"></v-checkbox> -->
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
                      <v-checkbox @change="SelectYears2Func(zExperiencerInfo1, item, index, 'N')" :value="index" v-for="(item, index) in zSelectYears2" :label="item.cYearsNm" :aria-label="item.cYearsNm" :key="index" hide-details></v-checkbox>
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
                          <M4_Input v-model="childInfo.RSVT_NOPE" :label="childInfo.cLabel" hide-details :hide-spin-buttons="true" @focus="TagetTextFeildValue" persistent-placeholder density="compact" type="number" variant="outlined" color="primary"></M4_Input>
                        </v-col>
                      </v-row>
                    </div>
                  </v-col>
                  <v-col cols="12" v-if="bLocal1" class="pt-0 pb-0"><v-divider :aria-hidden="true"></v-divider></v-col>

                  <v-col cols="12" v-if="bLocal2" style="padding-left: 7px;padding-right: 7px;">
                    <div class="title-medium font-bold pl-2 pr-2 mb-1">체험자 연령(외국인)</div>
                    <div class="d-flex flex-wrap" style="margin-top: -15px;">
                      <v-checkbox @change="SelectYears2Func(zExperiencerInfo2, item, index, 'Y')" :value="index" v-for="(item, index) in zSelectYears2" :label="item.cYearsNm" :aria-label="item.cYearsNm" :key="index" hide-details></v-checkbox>
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
                          <M4_Input v-model="childInfo.RSVT_NOPE" :label="childInfo.cLabel" hide-details :hide-spin-buttons="true" @focus="TagetTextFeildValue" persistent-placeholder density="compact" type="number" variant="outlined" color="primary"></M4_Input>
                        </v-col>
                      </v-row>
                    </div>
                  </v-col>
                  <v-col cols="12" v-if="bLocal2" class="pt-0 pb-0"><v-divider :aria-hidden="true"></v-divider></v-col>

                  <v-col cols="12">
                    <div class="d-flex align-center" v-if="bSelectedAgree3">
                      <v-checkbox v-model="WHELL_CHAIR_YN" label="휠체어 필요 여부" hide-details></v-checkbox>
                      <M4_Input class="ml-2" label="개수" v-model="WHELL_CHAIR_CNT" hide-details :disabled="!WHELL_CHAIR_YN" :hide-spin-buttons="true" style="max-width: 80px;margin-left: 5px;margin-right: 5px;" persistent-placeholder density="compact" type="number" variant="outlined" color="primary"></M4_Input>                      
                      대
                    </div>
                  </v-col>

                  <v-col cols="12">
                    <M4_Input v-model="iTotalReservationNum" style="max-width: 300px;margin-right: 5px;" hide-details persistent-placeholder label="총 예약 인원" aria-label="총 예약 인원" density="compact" readonly variant="outlined" color="primary"></M4_Input>
                  </v-col>
                  <v-col cols="12">
                    <M4_Inputarea v-model="oEditItem.MEMO_CN" label="기타 사항" placeholder="필요시, 추가적인 기타 사항을 입력하세요."></M4_Inputarea>
                  </v-col>

                  <v-col cols="12">
                    <div class="d-flex align-center justify-space-around mb-2">
                      이수증 발급
                      <v-radio-group v-model="bCertificate" @change="ToggleCertificate()" inline density="compact" hide-details class="ml-2">
                        <v-radio label="예" aria-label="예" :value="true"></v-radio>
                        <v-radio label="아니요" aria-label="아니요" class="ml-2" :value="false"></v-radio>
                      </v-radio-group>
                      <div v-if="bCertificate">
                        <!-- <v-btn class="mr-2" @click="DownloadAgreeDoc('이수증발급_법정대리인_동의서.docx')">법정대리인 동의서 다운로드</v-btn>
                        <v-btn class="mr-2" @click="DownloadAgreeDoc('이수증발급_개인정보수집및이용동의서_양식.docx')">개인정보 수집이용 동의서 다운로드</v-btn> -->
                        <v-btn @click="AddCertification()">인원추가</v-btn>
                      </div>
                    </div>

                    <label for="fileUpload" class="custom-file-label" style="display: none;">파일 첨부</label>
                    <input id="fileUpload" label="파일첨부" type="file" ref="fileInput" style="display: none;" multiple @change="onFileSelected">
                    <div v-for="(item, index) in zCertification" :key="index" class="mb-2">
                      <v-row>
                        <v-col cols="12" md="2">
                          <M4_Input v-model="item.NM" hide-details label="성명"></M4_Input>
                        </v-col>
                        <v-col cols="12" md="3">
                          <M4_Input v-model="item.BRDT" @keyup="Check14old(item)" label="생년월일 (8자리, yyyymmdd)" placeholder="YYYYMMDD" hide-details :hide-spin-buttons="true" persistent-placeholder density="compact"  variant="outlined" color="primary"></M4_Input>
                          <div :class="item.birthLabelClass">{{ item.birthLabel }}</div>
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
                  <v-col cols="12" align="center">
                    <v-btn @click="ShowCertificateDialog()" size="large" color="primary"><v-icon aria-hidden="true" style="margin-right: 6px;" size="large">mdi-calendar-month-outline</v-icon>예약</v-btn>
                  </v-col> 
                </v-row>
              </div>
            </template>

            <template v-slot:next="{ }">
              <div style="width: 100%" class="d-flex justify-end">
              </div>
            </template>

            <template v-slot:prev="{ }">
              <v-btn v-if="iStep == 3" @click="PrevFunc()" variant="outlined" size="large" color="primary" ><v-icon aria-hidden="true" style="margin-right: 6px;" size="large">mdi-arrow-u-left-bottom</v-icon>이전</v-btn>
            </template>
          </v-stepper-vertical>
        </div>
      </div>

      <M4_Msgbox @onResult="CheckDisabilityInformation" ref="M4_Msgbox_1_ref"></M4_Msgbox>
      <M4_Msgbox @onResult="CheckForeignerOver20" ref="M4_Msgbox_2_ref"></M4_Msgbox>
      <M4_Msgbox @onResult="SetReservationInfo" ref="M4_Msgbox_3_ref"></M4_Msgbox>
    </v-card>

    <v-dialog aria-modal="true" @update:modelValue="DialogClose2" v-model="bAlarmDialog" width="600">
      <v-card class="pa-4">
        <div class="d-flex title-xlarge">
          빈자리 알림 신청
          <v-spacer></v-spacer>
          <v-btn @click="CloseAlarmDialog()" variant="plain" icon size="35" title="닫기"><v-icon aria-hidden="true" size="25">mdi-close</v-icon></v-btn>
        </div>

        <v-row class="mt-2">
          <v-col cols="12" md="6">
            <!-- <M4_Input v-model="START_DT" label="시작 일자 8자리 숫자로 입력 (예:20250212)" placeholder="YYYYMMDD" persistent-placeholder density="compact" variant="outlined" color="primary"></M4_Input> -->
            <M4_Date v-model:cDate="START_DT" cLabel="시작일자" :cMessages="'일자를 선택하세요.'" :cMessage="''" @onDate="onStartAlarmDate" ref="M4_StartDate_ref"></M4_Date>
          </v-col>
          <v-col cols="12" md="6">
            <!-- <M4_Input v-model="END_DT" label="종료 일자 8자리 숫자로 입력 (예:20250212)" placeholder="YYYYMMDD" persistent-placeholder density="compact" variant="outlined" color="primary"></M4_Input> -->
            <M4_Date v-model:cDate="END_DT" cLabel="종료일자" :cMessages="'일자를 선택하세요.'" :cMessage="''" @onDate="onEndAlarmDate" ref="M4_EndDate_ref"></M4_Date>
          </v-col>
          <v-col cols="12" md="6">
            <M4_Input v-model="BKR_NOPE" label="인원수" persistent-placeholder density="compact" type="number" variant="outlined" color="primary"></M4_Input>
          </v-col>
          <v-col cols="12" class="pt-0" align="right">
            <v-btn @click="SetAlarmTalkLog()" color="primary">신청</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>  
  </v-dialog>
</template>

<script>
import { defineAsyncComponent, markRaw } from 'vue';

import { EventBus } from '@/EventBus.js';
import axios from "axios";
import * as Util from "@/Util.js";

export default {
  data() {
    return {      
      local_site_component: null,
      isShow : false,
      menu: false,

      iStep: 1,
      iMaxCnt: 0,
      iTotalCnt: 0,
      cSelectedExp : "",
      oSelectedExp : null,
      oAgreeDocment : null,

      iMaxAbleMonth: 2,

      ToDaydate:  new Date(),
      SelectAbleDate: this.cReturnDate(new Date()),
      oAbleMonth: null,

      zReservationDayList : [],
      zSelectReservationTimeList : [],
      zReservationCntInfo : [],
      zHolyDayList : [],

      bAlarmDialog : false,
      START_DT : "",
      END_DT : "",

      DaumWindow : null,
      bCheckBizCode : false,

      zSelectYears2 : [],

      cRequestName : "",
      cRequestMobile : "",
      cRequestBirth : "",
      cToken : "",
      bSelectedAgree1: true,
      bSelectedAgree2: true,
      bSelectedAgree3: true,

      BKR_NOPE: 0,

      oEditItem: {
        EXP_RSVT_IDX : -1,
        EXP_CD : "",
        RSVT_TIME_CD : "",
        // BKR_NM : "",
        // BKR_MBL_TELNO : "",
        BKR_TELNO : "",
        GROUP_NM : "",
        BKR_GROUP_TELNO : "",
        BKR_BIZNO : "",
        ZIP_NO : "",
        ADDR : "",
        LESS14_FILE_ID : "NONE",
        MEMO_CN : "",
      },
      oDefaultEditItem: {
        EXP_RSVT_IDX : -1,
        EXP_CD : "",
        RSVT_TIME_CD : "",
        // BKR_NM : "",
        // BKR_MBL_TELNO : "",
        BKR_TELNO : "",
        GROUP_NM : "",
        BKR_GROUP_TELNO : "",
        BKR_BIZNO : "",
        ZIP_NO : "",
        ADDR : "",
        LESS14_FILE_ID : "NONE",
        MEMO_CN : "",
      },

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
      placeholderText: '우편번호를 검색해주세요',
    };
  },

  mounted() {
    this.loadDynamicComponent();

    // this.oAbleMonth = this.cReturnDate(new Date())
    // this.oAbleMonth.setDate(1)
    // this.oAbleMonth.setMonth((this.oAbleMonth.getMonth() + 1) + this.iMaxAbleMonth);   

    if (!this.DaumWindow) {
      this.DaumWindow = new window.daum.Postcode({
        oncomplete : (data) => {
          this.oEditItem.ZIP_NO = data.zonecode
          this.oEditItem.ADDR = data.userSelectedType == "R" ? data.roadAddress : data.jibunAddress
        }
      })
    }    

    this.updatePlaceholder()
    window.addEventListener('resize', this.updatePlaceholder)
  },

  computed: {
    dayTodo() {
      let todoMap = {};
      this.dataList.forEach(item => {
        const [year, month, day] = item.EDU_YMD.split('-');
        const key = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        todoMap[key] = item.CN;
      });
      return todoMap;
    },

    bShowBlankArea() {
      return (this.$vuetify.display.md || this.$vuetify.display.lg) && !this.bPersonal
    },
    iReservationNum1() {
      let iTotalNum = 0

      for (let i = 0; i < this.zExperiencerInfo1.length; i ++) {
        for (let k = 0; k < this.zExperiencerInfo1[i].zInfo.length; k ++) {
          iTotalNum += Number(this.zExperiencerInfo1[i].zInfo[k].RSVT_NOPE);
        }
      }

      return iTotalNum
    },
    iReservationNum2() {
      let iTotalNum = 0

      for (let i = 0; i < this.zExperiencerInfo2.length; i ++) {
        for (let k = 0; k < this.zExperiencerInfo2[i].zInfo.length; k ++) {
          iTotalNum += Number(this.zExperiencerInfo2[i].zInfo[k].RSVT_NOPE);
        }
      }

      return iTotalNum
    },
    iTotalReservationNum() {
      let iNowNum = this.iMaxCnt - this.iReservationNum1 - this.iReservationNum2 - this.iTotalCnt

      if (iNowNum < 0) {
        iNowNum = 0
      }

      return `${this.iReservationNum1 + this.iReservationNum2} 명 (예약 가능 인원 ${iNowNum}명)`
    },
  },

  watch: {
  },

  methods : {
    updatePlaceholder() {
      if (window.innerWidth < 400) {
        this.placeholderText = '검색'
      } else {
        this.placeholderText = '우편번호를 검색해주세요'
      }
    },

    generateCalendar() {
      const year = this.selectedYear;
      const month = this.selectedMonth - 1;
      const firstDayOfMonth = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      let date = 1;
      const calendar = [];
      for (let i = 0; i < 6; i++) {
        const week = [];
        for (let j = 0; j < 7; j++) {
          if (i === 0 && j < firstDayOfMonth) {
            week.push(null);
          } else if (date > daysInMonth) {
            week.push(null);
          } else {
            week.push(date);
            date++;
          }
        }
        calendar.push(week);
      }

      // 마지막 줄이 모두 null이면 제거
      if (calendar[calendar.length - 1].every(day => day === null)) {
        calendar.pop();
      }

      this.calendar = calendar;

      
    },

    async loadDynamicComponent() {
      try {
        const component = defineAsyncComponent(() =>
          import(`../views/${this.$i18n.locale}/M4_Reservation_Agree.vue`)
        );
        this.local_site_component = markRaw(component); // 컴포넌트를 반응형 추적에서 제외
      } catch (error) {
        console.error("컴포넌트를 로드하는 중 에러가 발생했습니다:", error);
      }
    },

    // 예약 창 보여주기
    Show(data) {
      var posData = {
        SITE_CD : import.meta.env.VITE_SITE_CD,
      }

      axios
        .post(import.meta.env.VITE_UIL_API + "GetProgramInfo", posData, {
          headers: {
          }
        })
        .then(res => {
          if (res.data.ResultCd === "00") {
            this.InitReservateData()

            if (res.data.Result4[0].RSVT_POSBL_YN == "N") {
              EventBus.$emit("onShowMsg", {
                cSubTitle : "예약 신청이 불가합니다.",
                cTitle : "해당 사이트는 관리자가 예약을 막아놓은 상태 입니다.",
                cMsg : "자세한 사항은 관리자에게 문의하여 주세요.",
              });
              return
            }

            this.oAbleMonth = this.cReturnDate(new Date())
            this.oAbleMonth.setDate(this.SelectAbleDate.getDate())
            this.oAbleMonth.setMonth(this.oAbleMonth.getMonth() + Number(res.data.Result4[0].RSVT_POSBL_MONTH));

            var zProgramList = []

            res.data.Result3.forEach((item) => {
              item.cPath = import.meta.env.VITE_FILE_API + item.cPath
            })

            for (let i = 0; i < res.data.Result1.length; i ++) {
              let oInputData = {
                zImgInfo : [{cPath : "Files/NONE.PNG"}],
                cType : "em",
                cExpCd : res.data.Result1[i].EXP_CD,
                cFloorId : "0F",
                isText : "N",
                x : 0,
                y : 0,
                INDV_YN : res.data.Result1[i].INDV_YN,
                GROUP_YN : res.data.Result1[i].GROUP_YN,
                AGE1_YN : res.data.Result1[i].AGE1_YN,
                AGE2_YN : res.data.Result1[i].AGE2_YN,
                AGE3_YN : res.data.Result1[i].AGE3_YN,
                AGE4_YN : res.data.Result1[i].AGE4_YN,
                AGE5_YN : res.data.Result1[i].AGE5_YN,
                AGE6_YN : res.data.Result1[i].AGE6_YN,
                AGE7_YN : res.data.Result1[i].AGE7_YN,
                cExpNm : res.data.Result1[i].EXP_PRGRM_NM,
                TIME_DESC : res.data.Result1[i].TIME_DESC,
                cInfo : [res.data.Result1[i].PRGRM_DESC, res.data.Result1[i].AGE_DESC, res.data.Result1[i].ETC_DESC]
                .filter(Boolean) // 값이 있는 항목만 남기기
                .join('<br>'),
              }

              let oInsertObj = res.data.Result2.filter(item => item.EXP_CD == res.data.Result1[i].EXP_CD)

              if (oInsertObj.length > 0) {
                oInputData.zImgInfo = res.data.Result3.filter(fileitem => fileitem.EXP_CD == oInsertObj[0].EXP_CD)
                oInputData.cType = oInsertObj[0].POI_TYPE
                oInputData.cFloorId = oInsertObj[0].FLOOR
                oInputData.isText = oInsertObj[0].TEXT_YN == "Y"
                oInputData.x = oInsertObj[0].X_DATA
                oInputData.y = oInsertObj[0].Y_DATA
              }

              zProgramList.push(oInputData)
            }

            this.$store.commit('SetExpInfo', zProgramList);

            this.iStep = 1;

            this.oSelectedExp = data.item;

            
            if (this.oSelectedExp == null) {
              if (this.$store.state.zExp.length > 0 ){                
                this.oSelectedExp = this.$store.state.zExp[0];
                this.bPersonal = !(this.oSelectedExp.INDV_YN === "N" && this.oSelectedExp.GROUP_YN === "Y");   
              }
            }
            
            this.cSelectedExp = this.oSelectedExp.cExpCd;
            this.zSelectYears2 = Util.ReturnSelectArray(this.oSelectedExp);

            this.isShow = true;
            this.$store.state.isDialog = true;
            this.$store.state.btnDialogResRef = document.activeElement;

            setTimeout(() => {
              const headers = this.$refs.stepper.$el.getElementsByClassName('v-expansion-panel-title');
              Array.from(headers).forEach(header => {
                header.setAttribute('tabindex', '-1');
              });                
            }, 10);
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

    DialogClose() {
      this.isShow = false;      
      this.$store.state.isDialog = false;
      EventBus.$emit("onBackDialogResBtn");       
      this.$emit("onClose");
    },

    async onSuccessAuth(AgreeDocment, oAuthInfo) {
      this.zReservationDayList = []
      this.zSelectReservationTimeList = []
      this.zReservationCntInfo = []
      this.zHolyDayList = []

      if (oAuthInfo) {
        this.cRequestName = oAuthInfo.cRequestName
        this.cRequestMobile = oAuthInfo.cRequestMobile
        this.cRequestBirth = oAuthInfo.cRequestBirth
        this.bSelectedAgree1 = oAuthInfo.bSelectedAgree1
        this.bSelectedAgree2 = oAuthInfo.bSelectedAgree2
        this.bSelectedAgree3 = oAuthInfo.bSelectedAgree3
        this.cToken = oAuthInfo.jwt
      }

      var res = await this.GetReservationListLog()

      if (res.data.ResultCd == "00") {
        // if (res.data.Result1.length == 0) {
        //   EventBus.$emit("onShowMsg", {
        //     cSubTitle: "신청 가능한 예약 목록이 없습니다.",
        //     cTitle:"문제가 계속 되면 관리자에게 문의 바랍니다.",
        //     cMsg: ""
        //   });
        // }

        this.zReservationDayList = res.data.Result1
        this.zReservationCntInfo = res.data.Result2
        this.zHolyDayList = res.data.Result3

        this.zReservationDayList.forEach(item => {
          item.DAY_TYPE = Number(item.DAY_TYPE)
        })

        this.oAgreeDocment = AgreeDocment

        this.iStep = 2;

        setTimeout(() => {        
          this.SelectDate();
        }, 10);
      } else {
        EventBus.$emit("onShowMsg", {
          cSubTitle: "신청 가능한 예약 목록 조회 중 문제가 발생했습니다.",
          cTitle:"문제가 계속 되면 관리자에게 문의 바랍니다.",
          cMsg: `(${res.data.ResultCd}) ${res.data.Msg}`
        });
      }
    },

    allowedDates(val) {
      if (val == null) {
        return false;      
      }

      let zDisplayReservationTimeList = this.zReservationDayList.filter(item => item.DAY_TYPE == val.getDay() + 1)

      if (zDisplayReservationTimeList.length == 0) {
        return false
      } else {
        let oHolyDayInfo = this.zHolyDayList.filter(item => item.HOILDAY_YMD == this.cDateTypeToString(val))
        let bCheckReservatableProgram = false

        if (oHolyDayInfo.length > 0) {
          if (oHolyDayInfo[0].OPER_YN == "N") {
            return false
          }
        }

        for (let i = 0; i < zDisplayReservationTimeList.length; i ++) {
          bCheckReservatableProgram = this.bCheckCapacity(zDisplayReservationTimeList[i], val, this.zHolyDayList, this.zReservationCntInfo)

          if (bCheckReservatableProgram) {
            break
          }
        }        
        return this.SelectAbleDate <= val && this.oAbleMonth >= val && bCheckReservatableProgram
      }
    },

    CheckChangeTest() {      
      for (let i = 0; i < this.$store.state.zExp.length; i++) {
        if (this.$store.state.zExp[i].cExpCd == this.cSelectedExp) {
          this.oSelectedExp = this.$store.state.zExp[i];
          this.zSelectYears2 = Util.ReturnSelectArray(this.oSelectedExp);
          this.SelectDate();
        }
      }
      this.bPersonal = !(this.oSelectedExp.INDV_YN === "N" && this.oSelectedExp.GROUP_YN === "Y");   
    },

    cReturnDate(DateTime) {
      DateTime.setHours(0)
      DateTime.setMinutes(0)
      DateTime.setMilliseconds(0)
      DateTime.setSeconds(0)

      return DateTime
    },

    CalcMaxCnt(item, zHolyDayList) {
      let iMaxCnt = 0
      if (item.DAY_TYPE == 7) {
        iMaxCnt = item.SAT_MAX_NOPE
      } else if (item.DAY_TYPE == 1) {
        iMaxCnt = item.SUN_MAX_NOPE
      } else {
        iMaxCnt = item.MAX_NOPE
      }

      zHolyDayList.filter(Item1 => Item1.HOILDAY_YMD)

      for (let i = 0; i < zHolyDayList.length; i ++) {
        var HolyDay = new Date(zHolyDayList[i].HOILDAY_YMD)

        if (HolyDay.getDay() + 1 == item.DAY_TYPE) {
          iMaxCnt = zHolyDayList[i].TIME_CD_LIST.split(",").filter(Item => Item == item.RSVT_TIME_CD).length > 0 ? item.HOLIDAY_MAX_NOPE : iMaxCnt
        }
      }

      return iMaxCnt
    },

    cDateTypeToString(DateTime) {
      return [DateTime.getFullYear(), (DateTime.getMonth() + 1).toString().padStart(2, '0'), DateTime.getDate().toString().padStart(2, '0')].join('-')
    },

    bCheckCapacity(EXP_INFO, ToDaydate, zHolyDay, zHeadCnt) {
      let zCapacityInfo = zHeadCnt.filter(item => item.RSVT_DT == this.cDateTypeToString(ToDaydate) && item.RSVT_TIME_CD == EXP_INFO.RSVT_TIME_CD)

      let iMaxCnt = 0
      if (ToDaydate.getDay() + 1 == 7) {
        iMaxCnt = EXP_INFO.SAT_MAX_NOPE
      } else if (ToDaydate.getDay() + 1 == 1) {
        iMaxCnt = EXP_INFO.SUN_MAX_NOPE
      } else {
        iMaxCnt = EXP_INFO.MAX_NOPE
      }

      let TodayIsHolyDay = zHolyDay.filter(Item1 => Item1.HOILDAY_YMD == this.cDateTypeToString(ToDaydate))

      for (let i = 0; i < TodayIsHolyDay.length; i ++) {
        var HolyDay = new Date(TodayIsHolyDay[i].HOILDAY_YMD)

        if (HolyDay.getDay() + 1 == EXP_INFO.DAY_TYPE) {
          iMaxCnt = TodayIsHolyDay[i].TIME_CD_LIST.split(",").filter(Item => Item == EXP_INFO.RSVT_TIME_CD).length > 0 ? EXP_INFO.HOLIDAY_MAX_NOPE : iMaxCnt
        }
      }

      let iNowCnt = zCapacityInfo.length > 0 ? zCapacityInfo[0].iTotalCnt : 0

      return iMaxCnt > iNowCnt
    },

    GetReservationListLog() {
      var posData = {
        SITE_CD : import.meta.env.VITE_SITE_CD,
        EXP_CD : this.oSelectedExp.cExpCd,
        StartDate : this.cDateTypeToString(this.SelectAbleDate),
      };
      return new Promise((resolve) => (
        axios
        .post(import.meta.env.VITE_UIL_API + "GetReservationListLog", posData, {
          headers: {
            // "Authorization": this.CustomInfo.Token
          }
        })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          resolve({
            data : {
              ResultCd : "98",
              Msg : err,
            }
          });
        })
      ))
    },

    async SelectDate() {
      this.zReservationDayList = []
      this.zSelectReservationTimeList = []
      this.zReservationCntInfo = []
      this.zHolyDayList = []

      var res = await this.GetReservationListLog()

      if (res.data.ResultCd == "00") {
        // if (res.data.Result1.length == 0) {
        //   EventBus.$emit("onShowMsg", {
        //     cSubTitle: "신청 가능한 예약 목록이 없습니다.",
        //     cTitle:"문제가 계속 되면 관리자에게 문의 바랍니다.",
        //     cMsg: ""
        //   });
        //   return
        // }

        this.zReservationDayList = res.data.Result1
        this.zReservationCntInfo = res.data.Result2
        this.zHolyDayList = res.data.Result3

        this.zReservationDayList.forEach(item => {
          item.DAY_TYPE = Number(item.DAY_TYPE)
        })

        let zDisplayReservationTimeList = this.zReservationDayList.filter(item => item.DAY_TYPE == this.ToDaydate.getDay() + 1)

        for (let i = 0; i < zDisplayReservationTimeList.length; i ++) {
          this.zSelectReservationTimeList.push({
            iRound : i + 1,
            // bAble : this.bCheckCapacity(zDisplayReservationTimeList[i].MAX_NOPE, zDisplayReservationTimeList[i].HOLIDAY_MAX_NOPE, zDisplayReservationTimeList[i].SUN_MAX_NOPE, zDisplayReservationTimeList[i].SAT_MAX_NOPE, this.ToDaydate, this.zHolyDayList, zDisplayReservationTimeList[i].RSVT_TIME_CD, this.zReservationCntInfo),
            bAble : this.bCheckCapacity(zDisplayReservationTimeList[i], this.ToDaydate, this.zHolyDayList, this.zReservationCntInfo),
            cDispalyTime : Util.ConvertNumberToTime(Number(zDisplayReservationTimeList[i].RSVT_TIME_CD.substring(3,5))),
            RSVT_TIME_CD : zDisplayReservationTimeList[i].RSVT_TIME_CD,
          })
        }

      } else {
        EventBus.$emit("onShowMsg", {
          cSubTitle: "신청 가능한 예약 목록 조회 중 문제가 발생했습니다.",
          cTitle:"문제가 계속 되면 관리자에게 문의 바랍니다.",
          cMsg: `(${res.data.ResultCd}) ${res.data.Msg}`
        });
      }
    },

    PrevFunc() {
      this.iStep -= 1
      this.InitReservateData();
      this.onSuccessAuth(this.oAgreeDocment)
    },

    SelectRound(item) {
      let zDisplayReservationTimeList = this.zReservationDayList.filter(Item => Item.DAY_TYPE == this.ToDaydate.getDay() + 1 && Item.RSVT_TIME_CD == item.RSVT_TIME_CD)

      if (this.zHolyDayList.filter(item => item.HOILDAY_YMD == this.cDateTypeToString(this.ToDaydate)).length > 0) {
        this.iMaxCnt = zDisplayReservationTimeList[0].HOLIDAY_MAX_NOPE
      } else {
        if (this.ToDaydate.getDay() + 1 == 7) {
          this.iMaxCnt = zDisplayReservationTimeList[0].SAT_MAX_NOPE
        } else if (this.ToDaydate.getDay() + 1 == 1) {
          this.iMaxCnt = zDisplayReservationTimeList[0].SUN_MAX_NOPE
        } else {
          this.iMaxCnt = zDisplayReservationTimeList[0].MAX_NOPE
        }
      }

      let zNowCntInfo = this.zReservationCntInfo.filter(Item2 => Item2.EXP_CD == this.oSelectedExp.cExpCd&& Item2.RSVT_DT == this.cDateTypeToString(this.ToDaydate) && Item2.RSVT_TIME_CD == item.RSVT_TIME_CD)
      this.iTotalCnt = zNowCntInfo.length > 0 ? zNowCntInfo[0].iTotalCnt : 0

      this.oEditItem.EXP_RSVT_IDX = -1
      this.oEditItem.EXP_CD = this.oSelectedExp.cExpCd
      this.oEditItem.RSVT_TIME_CD = item.RSVT_TIME_CD
      this.iStep = 3;
      // this.ToDaydate = this.cReturnDate(new Date());
    },

    DialogClose2() {
      this.bAlarmDialog = false;      
      this.$store.state.isDialog = false;      
      EventBus.$emit("onBackDialogMsgBtn");
    },

    ShowAlarmDialog() {
      this.bAlarmDialog = true
      this.START_DT = ""
      this.END_DT = ""
      this.$store.state.btnMsgDialogRef = document.activeElement;
    },

    CloseAlarmDialog() {
      this.DialogClose2();
      this.START_DT = ""
      this.END_DT = ""
    },

    bCheckOverDate(cStartDate, cEndDate, iOverDay) {
      var StartDate = new Date(cStartDate),
      EndDate = new Date(cEndDate);

      StartDate.setDate(StartDate.getDate() + iOverDay)
      return new Date(StartDate) < EndDate
    },

    onStartAlarmDate(date) {
      var cSelectDate = new Date(date.substring(0, 4), Number(date.substring(5, 7)) - 1, date.substring(8, 10))

      if (cSelectDate < this.SelectAbleDate) {
        this.$refs.M4_StartDate_ref.SetDate(new Date(
          this.SelectAbleDate.getFullYear(),
          this.SelectAbleDate.getMonth(),
          this.SelectAbleDate.getDate()
        ))
      }

      if (this.bCheckOverDate(this.START_DT, this.END_DT, 7) || this.START_DT > this.END_DT) {
        var oDateObj = new Date(this.START_DT)

        this.$refs.M4_EndDate_ref.SetDate(new Date(
          oDateObj.getFullYear(),
          oDateObj.getMonth(),
          oDateObj.getDate() + 7
        ))
      }
    },

    onEndAlarmDate(date) {
      if (this.START_DT == "") {
        var oDateObj = new Date()

        this.$refs.M4_EndDate_ref.SetDate(new Date(
          oDateObj.getFullYear(),
          oDateObj.getMonth(),
          oDateObj.getDate() + 7
        ))
      } else {
        if (this.bCheckOverDate(this.START_DT, this.END_DT, 7) || this.START_DT > this.END_DT) {
          var oDateObj = new Date(this.START_DT)

          this.$refs.M4_EndDate_ref.SetDate(new Date(
            oDateObj.getFullYear(),
            oDateObj.getMonth(),
            oDateObj.getDate() + 7
          ))
        }
      }
    },

    SetAlarmTalkLog() {
      var bExistNoData = false;
      var cTitleMsg = "";

      this.START_DT = Util.formatDateYYYYMMDDtoDot(this.START_DT);
      this.END_DT = Util.formatDateYYYYMMDDtoDot(this.END_DT);

      // 웹접근성 수정
      if (!bExistNoData && (!Util.parseDate(this.START_DT) || !Util.parseDate(this.END_DT))) {
        bExistNoData = true
        cTitleMsg = "일자를 형식에 맞게 입력하십시오. (YYYY-MM-DD)"
      }
      if (bExistNoData) {
        EventBus.$emit("onShowMsg", {
          cSubTitle : "누락된 정보가 있습니다.",
          cTitle : cTitleMsg,
          cMsg : "",
        });
        return
      }
      
      if (this.START_DT == "") {
        EventBus.$emit("onShowMsg", {
          cSubTitle: "알람톡 신청이 불가합니다.",
          cTitle: "시작일을 선택하여 주세요.",
          cMsg: "",
        });
        return
      }

      if (this.END_DT == "") {
        EventBus.$emit("onShowMsg", {
          cSubTitle: "알람톡 신청이 불가합니다.",
          cTitle: "시작일을 선택하여 주세요.",
          cMsg: "",
        });
        return
      }

      if (this.BKR_NOPE == "" || Number(this.BKR_NOPE) == 0) {
        EventBus.$emit("onShowMsg", {
          cSubTitle: "알람톡 신청이 불가합니다.",
          cTitle: "신청인원을 입력해 주세요.",
          cMsg: "",
        });
        return
      }

      if (this.oSelectedExp.cExpCd == undefined) {
        EventBus.$emit("onShowMsg", {
          cSubTitle: "알람톡 신청이 불가합니다.",
          cTitle: "체험 프로그램을 먼저 선택해 주세요.",
          cMsg: "",
        });
        return
      }

      var posData = {
        SITE_CD : import.meta.env.VITE_SITE_CD,
        EXP_CD : this.oSelectedExp.cExpCd,
        BKR_NM : this.cRequestName,
        BKR_MBL_TELNO : this.cRequestMobile,
        BKR_NOPE: Number(this.BKR_NOPE),
        START_DT : this.START_DT.replaceAll(".", "-"),
        END_DT : this.END_DT.replaceAll(".", "-"),
        National : this.$i18n.locale,
      }

      axios
        .post(import.meta.env.VITE_UIL_API + "SetAlarmTalkLog", posData , {
          headers: {
          }
        })
        .then(res => {
          if (res.data.ResultCd === "00") {
            this.CloseAlarmDialog()
          } else if (res.data.ResultCd === "01") {
            EventBus.$emit("onShowMsg", {
              cSubTitle : "중복된 신청이 있습니다.",
              cTitle : "날짜가 겹치지 않게 신청해 주세요.\n아래는 신청하신 날짜 목록 입니다.\n",
              cMsg : res.data.Msg,
            });
          } else {
            EventBus.$emit("onShowMsg", {
              cSubTitle : "알림톡 신청 중 문제가 발생했습니다.",
              cTitle : "계속 지속될 경우 담당자에게 문의 바랍니다.",
              cMsg : `Error : ${res.data.Msg}`,
            });
          }
        })
        .catch(err =>{
          EventBus.$emit("onShowMsg", {
            cSubTitle : "알림톡 신청 중 문제가 발생했습니다.",
            cTitle : "계속 지속될 경우 담당자에게 문의 바랍니다.",
            cMsg : `Error : ${err}`,
          });
        })
        .finally(() =>{
        })
    },

    openPostcode() {
      this.DaumWindow.open()
    },

    // 예약 데이터 초기화
    InitReservateData() {
      // this.ToDaydate = null
      this.ToDaydate = new Date();
      this.oEditItem = {...this.oDefaultEditItem}
      this.START_DT = ""
      this.END_DT = ""
      this.bPersonal = true
      this.cSelectNation = "C000"
      this.bLocal1 = true
      this.zExperiencerInfo1 = []
      this.bLocal2 = false
      this.zExperiencerInfo2 = []
      this.WHELL_CHAIR_YN = false
      this.WHELL_CHAIR_CNT = 0
      this.iSelectIndex = -1
      this.BKR_NOPE= 0
      this.bCertificate = false
      this.zCertification = [],

      this.InitGroupInfo()      
    },

    InitGroupInfo() {
      this.oSelectYears = "00",
      this.oEditItem.GROUP_NM = ""
      this.oEditItem.BKR_GROUP_TELNO = ""
      this.oEditItem.BKR_BIZNO = ""
      this.bCheckBizCode = false
    },

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
        } 
      } else {
        if (!this.bLocal2) {
          this.zExperiencerInfo2 = []
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

    ShowCertificateDialog() {
      this.$refs.M4_Msgbox_1_ref.ShowReturn("이수증 발급은 예약 시 신청자에 한해서 발급 가능합니다. 추후 신청은 불가능합니다. 예약을 완료하시겠습니까?", "", "")
    },

    CheckDisabilityInformation(bResult) {
      if (!bResult) {
        return
      }

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

    async SetReservationInfo(bResult) {
      if (!bResult) {
        return
      }

      if (this.oEditItem.ZIP_NO == "" || this.oEditItem.ADDR  == "") {
        EventBus.$emit("onShowMsg", {
          cSubTitle : "우편번호와 주소를 입력해 주세요.",
          cTitle : "우편번호와 주소를 입력해 주세요.",
          cMsg : "",
        });
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

      if (!this.bPersonal && this.oEditItem.GROUP_NM == "") {
        EventBus.$emit("onShowMsg", {
          cSubTitle : "단체 예약 시에는 단체명을 반드시 입력하셔야 합니다.",
          cTitle : "단체명 정보를 입력하여 주세요.",
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

      if (this.oAgreeDocment) {
        var res = await this.bSendSvrFile(this.oAgreeDocment)

        if (res) {
          if (res.data.ResultCd == "00") {
            this.oEditItem.LESS14_FILE_ID = res.data.FileId
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

      for (let i = 0; i < this.zCertification.length; i ++) {
        if (!this.zCertification[i].NowSelFile) {
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
        EXP_RSVT_IDX : this.oEditItem.EXP_RSVT_IDX,
        SITE_CD : import.meta.env.VITE_SITE_CD,

        EXP_CD : this.oEditItem.EXP_CD,
        RSVT_TIME_CD : this.oEditItem.RSVT_TIME_CD,

        BKR_NM : this.cRequestName,
        BKR_MBL_TELNO : this.cRequestMobile,
        BKR_TELNO : this.oEditItem.BKR_TELNO,
        GROUP_NM : this.oEditItem.GROUP_NM,
        BKR_GROUP_TELNO : this.oEditItem.BKR_GROUP_TELNO,
        BKR_BIZNO : this.oEditItem.BKR_BIZNO,
        LESS14_FILE_ID : this.oEditItem.LESS14_FILE_ID,

        RSVT_DT : this.cDateTypeToString(this.ToDaydate),
        GROUP_TYPE : this.bPersonal ? "01" : this.oSelectYears,
        GROUP_YN : Util.cBoolToString(this.bPersonal),

        ZIP_NO : this.oEditItem.ZIP_NO,
        ADDR : this.oEditItem.ADDR,
        Personal : Util.cBoolToString(this.bPersonal),

        WHELL_CHAIR_YN : Util.cBoolToString(this.WHELL_CHAIR_YN),
        WHELL_CHAIR_CNT : Number(this.WHELL_CHAIR_CNT),

        // CreateMemberId : "NONE",
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
            posData.EXP_RSVT_IDX = res.data.Result[0].EXP_RSVT_IDX
            this.$emit("SetData", posData, {
              oAgreeDocment : this.oAgreeDocment,
              oSelectedExp : this.oSelectedExp,
              UPDT_DT : res.data.Result[0].CRT_DT,
              bPersonal : this.bPersonal,
              bLocal1 : this.bLocal1,
              bLocal2 : this.bLocal2,
              zExperiencerInfo1 : this.zExperiencerInfo1,
              zExperiencerInfo2 : this.zExperiencerInfo2,
              zSelectYears2 : this.zSelectYears2,
              cSelectNation : this.cSelectNation,
              bCertificate : this.bCertificate,
            })

            this.DialogClose();
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
            this.oSelectYears = "00";
            this.cSelectNation = "C000";
          } else {
            EventBus.$emit("onShowMsg", {
              cSubTitle : "예약 신청 중 문제가 발생했습니다.",
              cTitle : "계속 지속될 경우 담당자에게 문의 바랍니다.",
              cMsg : `Error : ${res.data.Msg}`,
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

    Check14old(item) {
      item.b14UpAge = Util.s14OldCheck(item.BRDT)
      let dotDate = Util.formatDateYYYYMMDDtoDot(item.BRDT);
      let validate = Util.isValidDateFormat(dotDate)

      if (!item.BRDT) {
        item.birthLabel = "";
        item.birthLabelClass = "ml-2 mt-n2 text-black"
      } else if (!validate) {
        item.birthLabel = "입력형식과 일치하지 않습니다.";
        item.birthLabelClass = "ml-2 mt-n2 text-red label-xsmall"
      } else {
        item.birthLabel = "입력형식과 일치합니다.";
        item.birthLabelClass = "ml-2 mt-n2 text-black label-xsmall"
      }
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

};
</script>


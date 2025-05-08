<template>
  <div>
    <h1 class="title-xxlarge">{{ $t("menu_0305_빈자리알림조회") }}</h1>

    <v-row class="pt-4 ml-1">
      <v-col cols="12" sm="6" md="3" class="pt-0 pb-0 pr-2 pl-2">
        <!-- <M4_Input v-model="cSearchStartDate" label="시작 일자: 8자리 숫자로 입력 (예:20250212)" placeholder="YYYYMMDD" persistent-placeholder density="compact" variant="outlined" color="primary"></M4_Input> -->
        <M4_Date v-model:cDate="cSearchStartDate" :cMessage="''" cLabel="시작일자" @onDate="onStartAlarmDate" ref="M4_StartDate_ref"></M4_Date>
      </v-col>
      <v-col cols="12" sm="6" md="3" class="pt-0 pb-0 pr-2 pl-2">
        <!-- <M4_Input v-model="cSearchEndDate" label="종료 일자: 8자리 숫자로 입력 (예:20250212)" placeholder="YYYYMMDD" persistent-placeholder density="compact" variant="outlined" color="primary"></M4_Input> -->
        <M4_Date v-model:cDate="cSearchEndDate" :cMessage="''" cLabel="종료일자" @onDate="onEndAlarmDate" ref="M4_EndDate_ref"></M4_Date>
      </v-col>
      <!-- 웹접근성용 -->
      <v-col cols="12" sm="6" md="3" class="pt-6 pb-0 pr-2 pl-2">
        <v-btn @click="GetAlarmTalkLog()" aria-label="조회"><v-icon aria-hidden="true" style="margin-right: 6px;">mdi-magnify</v-icon>{{ $t("common_search") }}</v-btn>
      </v-col>
    </v-row>
    <div class="mt-2 pa-3">
      <v-data-table
        :headers="headers"
        :items="zData"
        item-key="EXP_RSVT_IDX"
        aria-labelledby="table-caption">        
        <template v-slot:default="props">
          <table class="nor_table_center">
            <caption id="table-caption" class="sr-only">{{ $t("menu_0302_예약조회") }} 테이블</caption>
            <thead>
              <tr>
                <th v-for="header in props.headers[0]" :key="header.value" scope="col">
                  {{ header.title}}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in props.items" :key="item.id">
                <td>{{item.iIndex}}</td>
                <td>{{item.cPlaceNm}}</td>
                <td>{{item.EXP_PRGRM_NM}}</td>
                <td>{{item.START_DT}}</td>
                <td>{{item.END_DT}}</td>
                <td>{{item.BKR_NOPE}}</td>
                <td>
                  <v-btn v-if="isFutureDate(item.END_DT)" @click="ShowAlarmDialog(item)">보기</v-btn>
                </td>
              </tr>
            </tbody>
          </table>
        </template>         
      </v-data-table>

      <!-- @click:row="handleRowClick" -->
      <!-- <v-data-table
        :headers="headers"
        :items="zData"
        item-key="EXP_RSVT_IDX"
        aria-labelledby="table-caption"
      >
        <template v-slot:top>
          <caption id="table-caption" class="sr-only">{{ $t("menu_0302_예약조회") }} 테이블</caption>
        </template>
        <template v-slot:item.RSVT_STTS="{ value }">
          {{ cStateToKorean(value) }}
        </template>
        <template v-slot:item.cAction="{ item }">
          <v-btn v-if="item.RSVT_STTS=='R'" @click="ShowAlarmDialog(item)">보기</v-btn>
        </template>
      </v-data-table> -->
    </div>

    <v-dialog aria-modal="true" @update:modelValue="DialogClose" v-model="bAlarmDialog" width="600">
      <v-card class="pa-4">
        <div class="d-flex title-xlarge">
          빈자리 알림 신청
          <v-spacer></v-spacer>
          <v-btn @click="CloseAlarmDialog()" variant="plain" icon size="35" title="닫기"><v-icon aria-hidden="true" size="25">mdi-close</v-icon></v-btn>
        </div>

        <v-row class="mt-2">
          <v-col cols="12" md="6">
            <!-- <M4_Input v-model="START_DT" label="시작 일자 8자리 숫자로 입력 (예:20250212)" placeholder="YYYYMMDD" persistent-placeholder density="compact" variant="outlined" color="primary"></M4_Input> -->
            <M4_Date v-model:cDate="START_DT" cLabel="시작일자" :cMessage="''" @onDate="onStartAlarmDateFortalk" ref="M4_StartDate_ForTalk_ref"></M4_Date>
          </v-col>
          <v-col cols="12" md="6">
            <!-- <M4_Input v-model="END_DT" label="종료 일자 8자리 숫자로 입력 (예:20250212)" placeholder="YYYYMMDD" persistent-placeholder density="compact" variant="outlined" color="primary"></M4_Input> -->
            <M4_Date v-model:cDate="END_DT" cLabel="종료일자" :cMessage="''" @onDate="onEndAlarmDateFortalk" ref="M4_EndDate_ForTalk_ref"></M4_Date>
          </v-col>
          <v-col cols="12" md="6">
            <M4_Input v-model="oSelectData.BKR_NOPE" label="인원수" persistent-placeholder density="compact" type="number" variant="outlined" color="primary"></M4_Input>
          </v-col>
          <v-col cols="12" class="pt-0" align="right">
            <v-btn class="mr-2" @click="ReSetAlarmTalkLog()" color="primary">변경</v-btn>
            <v-btn class="mr-2" @click="DelAlarmTalkLog()" color="primary">취소</v-btn>
            <v-btn class="mr-2" @click="CloseAlarmDialog()" color="black">닫기</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>  

    <!-- <M4_Commu_AuthDialog @EndAuth="EndAuth" ref="M4_Commu_AuthDialog_ref"></M4_Commu_AuthDialog> -->
  </div>
</template>


<script>
import { EventBus } from '@/EventBus.js';
import axios from "axios";
import * as Util from "@/Util.js";

export default {
  data() {
    return {
      cRequestName : "",
      cRequestMobile : "",
      cRequestBirth : "",
      cToken : "",
      // 웹접근성용
      cSearchStartDate : Util.formatDate2(new Date()),
      cSearchEndDate : null,
      // cSearchStartDate : "20250201",
      // cSearchEndDate : "20250430",
      headers: [
        { title: this.$t("all_table_header_번호"), key: 'iIndex', sortable: false, align: 'center'},
        { title: this.$t("all_table_header_장소"), key: 'cPlaceNm', sortable: false, align: 'center'},
        { title: this.$t("all_table_header_프로그램"), key: 'EXP_PRGRM_NM', sortable: false, align: 'center'},
        { title: this.$t("all_table_header_시작일자"), key: 'START_DT', sortable: false, align: 'center'},
        { title: this.$t("all_table_header_종료일자"), key: 'END_DT', sortable: false, align: 'center'},
        { title: this.$t("all_table_header_인원수"), key: 'BKR_NOPE', sortable: false, align: 'center'},
        { title: "변경/취소", key: 'cAction', sortable: false, align: 'center'},
      ],
      zData : [],
      oSelectData: {},

      bAlarmDialog : false,
      START_DT : "",
      END_DT : "",
      
    };
  },

  components:{
  },

  computed: {
  },

  mounted() {
    var Today = new Date()
    Today.setMonth(Today.getMonth() + 3)   
    // 웹접근성용 
    this.cSearchEndDate = Util.formatDate2(Today)
        
    // this.$refs.M4_Commu_AuthDialog_ref.ShowDialog("")
  },

  beforeUnmount() {
  },

  methods : {
    // 오늘날짜 이후 확인
    isFutureDate(dateString) { 
      const today = new Date();
      today.setHours(0, 0, 0, 0); // 시간을 00:00:00으로 초기화하여 날짜만 비교
      const endDate = new Date(dateString);
      return endDate > today;
    },

    // 빈자리 알림 보기버튼 클릭기능
    ShowAlarmDialog(item) {
      this.bAlarmDialog = true
      this.START_DT = item.START_DT
      this.END_DT = item.END_DT
      this.oSelectData = item
      this.$store.state.btnMsgDialogRef = document.activeElement;
    },

    // 빈자리 알림 다이올로그
    DialogClose() {
      this.bAlarmDialog = false;      
      this.$store.state.isDialog = false;      
      EventBus.$emit("onBackDialogMsgBtn");
    },
    CloseAlarmDialog() {
      this.DialogClose();
      this.START_DT = ""
      this.END_DT = ""
    },

    // 빈자리 알림 내역 초기화
    ShowDispalyList(oAuthInfo) {
      this.cRequestName = oAuthInfo.cRequestName
      this.cRequestMobile = oAuthInfo.cRequestMobile
      this.cRequestBirth = oAuthInfo.cRequestBirth
      this.cToken = oAuthInfo.jwt
      
      // 빈자리 알림 내역 가져오기 API
      this.GetAlarmTalkLog()
    },

    // 검색일로 검색하기 (시작일)
    onStartAlarmDate(date) {
      var cSelectDate = new Date(date.substring(0, 4), Number(date.substring(5, 7)) - 1, date.substring(8, 10))
      var cSearchEndDate = new Date(this.cSearchEndDate)

      if (cSearchEndDate < cSelectDate) {
        cSearchEndDate.setDate(cSearchEndDate.getDate() - 1)
        this.$refs.M4_StartDate_ref.SetDate(cSearchEndDate)
      }

      // this.GetAlarmTalkLog()
    },

    // 검색일로 검색하기 (종료일)
    onEndAlarmDate(date) {
      var cSelectDate = new Date(date.substring(0, 4), Number(date.substring(5, 7)) - 1, date.substring(8, 10))
      var cSearchStartDate = new Date(this.cSearchStartDate)

      if (cSelectDate < cSearchStartDate) {
        cSearchStartDate.setDate(cSearchStartDate.getDate() + 1)
        this.$refs.M4_EndDate_ref.SetDate(cSearchStartDate)
      }

      // this.GetAlarmTalkLog()
    },

    // 알림톡 설정하기 (시작일)
    onStartAlarmDateFortalk(date) {
      var cSelectDate = new Date(date.substring(0, 4), Number(date.substring(5, 7)) - 1, date.substring(8, 10))

      if (cSelectDate < this.SelectAbleDate) {
        this.$refs.M4_StartDate_ForTalk_ref.SetDate(new Date(
          this.SelectAbleDate.getFullYear(),
          this.SelectAbleDate.getMonth(),
          this.SelectAbleDate.getDate()
        ))
      }

      if (this.bCheckOverDate(this.START_DT, this.END_DT, 7) || this.START_DT > this.END_DT) {
        var oDateObj = new Date(this.START_DT)

        this.$refs.M4_EndDate_ForTalk_ref.SetDate(new Date(
          oDateObj.getFullYear(),
          oDateObj.getMonth(),
          oDateObj.getDate() + 7
        ))
      }
    },

    // 알림톡 설정하기 (종료일)
    onEndAlarmDateFortalk(date) {
      if (this.START_DT == "") {
        var oDateObj = new Date()

        this.$refs.M4_EndDate_ForTalk_ref.SetDate(new Date(
          oDateObj.getFullYear(),
          oDateObj.getMonth(),
          oDateObj.getDate() + 7
        ))
      } else {
        if (this.bCheckOverDate(this.START_DT, this.END_DT, 7) || this.START_DT > this.END_DT) {
          var oDateObj = new Date(this.START_DT)

          this.$refs.M4_EndDate_ForTalk_ref.SetDate(new Date(
            oDateObj.getFullYear(),
            oDateObj.getMonth(),
            oDateObj.getDate() + 7
          ))
        }
      }
    },

    // 빈자리 알림톡 기간 설정
    bCheckOverDate(cStartDate, cEndDate, iOverDay) {
      var StartDate = new Date(cStartDate),
      EndDate = new Date(cEndDate);

      StartDate.setDate(StartDate.getDate() + iOverDay)
      return new Date(StartDate) < EndDate
    },
    
    // 빈자리 알림 내역 가져오기 API
    GetAlarmTalkLog() {
      if (this.cRequestName == "" || this.cRequestMobile == "") {
        return
      }

      var posData = {
        SITE_CD : import.meta.env.VITE_SITE_CD,
        BKR_NM : this.cRequestName,
        BKR_MBL_TELNO : this.cRequestMobile,
        Birth : this.cRequestBirth,
        Token : this.cToken,
        
        START_DT: this.cSearchStartDate,
        END_DT: this.cSearchEndDate,
      };

      axios
        .post(import.meta.env.VITE_UIL_API + "GetAlarmTalkLog", posData , {
          headers: {
          }
        })
        .then(res => {
          if (res.data.ResultCd === "00") {
            let iLen = res.data.Result.length

            this.zData = res.data.Result.map((item, index) => {
              item.iIndex = iLen - index
              item.cPlaceNm = Util.cTypeToPlaceNm(import.meta.env.VITE_SITE_CD)
              return item
            })

          } else {
            EventBus.$emit("onShowMsg", {
              cSubTitle : "알림톡 내역 조회 중 문제가 발생했습니다.",
              cTitle : "계속 지속될 경우 담당자에게 문의 바랍니다.",
              cMsg : `Error : ${res.data.Msg}`,
            });
          }
        })
        .catch(err =>{
          EventBus.$emit("onShowMsg", {
            cSubTitle : "알림톡 내역 조회 중 문제가 발생했습니다.",
            cTitle : "계속 지속될 경우 담당자에게 문의 바랍니다.",
            cMsg : `Error : ${err}`,
          });
        })
        .finally(() =>{
        })
    },

    // 빈자리 알림 신청
    ReSetAlarmTalkLog() {
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

      var posData = {
        REG_SN : this.oSelectData.REG_SN,
        SITE_CD : import.meta.env.VITE_SITE_CD,
        EXP_CD : this.oSelectData.EXP_CD,
        BKR_NM : this.cRequestName,
        BKR_MBL_TELNO : this.cRequestMobile,
        BKR_NOPE: Number(this.BKR_NOPE),
        START_DT : this.START_DT.replaceAll(".", "-"),
        END_DT : this.END_DT.replaceAll(".", "-"),
        National : this.$i18n.locale,
      }

      axios
        .post(import.meta.env.VITE_UIL_API + "ReSetAlarmTalkLog", posData , {
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

    // 빈자리 알림 취소
    DelAlarmTalkLog() {
      var posData = {
        SITE_CD : import.meta.env.VITE_SITE_CD,
        REG_SN : this.oSelectData.REG_SN,
      }

      axios
        .post(import.meta.env.VITE_UIL_API + "DelAlarmTalkLog", posData , {
          headers: {
          }
        })
        .then(res => {
          if (res.data.ResultCd === "00") {
            this.CloseAlarmDialog()
            this.zData = this.zData.filter(item => item.REG_SN !== this.oSelectData.REG_SN);
          } else {
            EventBus.$emit("onShowMsg", {
              cSubTitle : "알림톡 취소 중 문제가 발생했습니다.",
              cTitle : "계속 지속될 경우 담당자에게 문의 바랍니다.",
              cMsg : `Error : ${res.data.Msg}`,
            });
          }
        })
        .catch(err =>{
          EventBus.$emit("onShowMsg", {
            cSubTitle : "알림톡 취소 중 문제가 발생했습니다.",
            cTitle : "계속 지속될 경우 담당자에게 문의 바랍니다.",
            cMsg : `Error : ${err}`,
          });
        })
        .finally(() =>{
        })
    },

    EndAuth(cCase, oAuthInfo) {
      if (cCase == "") {
        // this.$refs.M4_Commu_AuthDialog_ref.CloseDialog()
        this.ShowDispalyList(oAuthInfo)
      }
    },

  },
};
</script>
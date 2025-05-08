<template>
  <div>
    <h1 class="title-xxlarge">{{ $t("menu_0302_예약조회") }}</h1>

    <v-row class="pt-4 ml-1">
      <v-col cols="12" sm="6" md="3" class="pt-0 pb-0 pr-2 pl-2">
        <!-- <M4_Input v-model="cStartReservationDate" label="시작 일자: 8자리 숫자로 입력 (예:20250212)" placeholder="YYYYMMDD" persistent-placeholder density="compact" variant="outlined" color="primary"></M4_Input> -->
        <M4_Date v-model:cDate="cStartReservationDate" :cMessage="''" cLabel="시작일자" @onDate="onStartAlarmDate" ref="M4_StartDate_ref"></M4_Date>
      </v-col>
      <v-col cols="12" sm="6" md="3" class="pt-0 pb-0 pr-2 pl-2">
        <!-- <M4_Input v-model="cEndReservationDate" label="종료 일자: 8자리 숫자로 입력 (예:20250212)" placeholder="YYYYMMDD" persistent-placeholder density="compact" variant="outlined" color="primary"></M4_Input> -->
        <M4_Date v-model:cDate="cEndReservationDate" :cMessage="''" cLabel="종료일자" @onDate="onEndAlarmDate" ref="M4_EndDate_ref"></M4_Date>
      </v-col>
      <v-col cols="12" sm="6" md="3" class="pt-6 pb-0 pr-2 pl-2">
        <v-btn @click="GetReservationInfo()" aria-label="조회"><v-icon aria-hidden="true" style="margin-right: 6px;">mdi-magnify</v-icon>{{ $t("common_search") }}</v-btn>
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
                <td>{{item.cShowCreateDateTime}}</td>
                <td>{{item.TOTAL_RSVT_NOPE}}</td>
                <td>{{cStateToKorean(item.RSVT_STTS)}}</td>
                <td>
                  <v-btn v-if="item.RSVT_STTS=='R'" @click="ShowDetailDialog(item)">보기</v-btn>
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
          <v-btn v-if="item.RSVT_STTS=='R'" @click="ShowDetailDialog(item)">보기</v-btn>
        </template>
      </v-data-table> -->
    </div>

    <M4_ResEditDialog @UpdateReservation="UpdateReservation" @CancelReservation="CancelReservation" ref="M4_ResEditDialog_ref"></M4_ResEditDialog>
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
      cStartReservationDate : Util.formatDate2(new Date()),
      cEndReservationDate : null,
      // cStartReservationDate : "20250201",
      // cEndReservationDate : "20250430",
      headers: [
        { title: this.$t("all_table_header_번호"), key: 'iIndex', sortable: false, align: 'center'},
        { title: this.$t("all_table_header_장소"), key: 'cPlaceNm', sortable: false, align: 'center'},
        { title: this.$t("all_table_header_프로그램"), key: 'EXP_PRGRM_NM', sortable: false, align: 'center'},
        { title: this.$t("all_table_header_날짜/시간"), key: 'cShowCreateDateTime', sortable: false, align: 'center'},
        { title: this.$t("all_table_header_예약인원"), key: 'TOTAL_RSVT_NOPE', sortable: false, align: 'center'},
        { title: this.$t("all_table_header_예약상태"), key: 'RSVT_STTS', sortable: false, align: 'center'},
        { title: "확인/변경/취소", key: 'cAction', sortable: false, align: 'center'},
      ],
      zData : [],
    };
  },

  components:{
  },

  computed: {
  },

  mounted() {
    var Today = new Date()
    Today.setMonth(Today.getMonth() + 2)   
    // 웹접근성용 
    this.cEndReservationDate = Util.formatDate2(Today)
  },

  beforeUnmount() {
  },

  methods : {
    // 예약 내역 초기화
    ShowDispalyList(oAuthInfo) {
      console.log(">>>>>", oAuthInfo)
      this.cRequestName = oAuthInfo.cRequestName
      this.cRequestMobile = oAuthInfo.cRequestMobile
      this.cRequestBirth = oAuthInfo.cRequestBirth
      this.cToken = oAuthInfo.jwt

      // 예약 내역 가져오기 API
      this.GetReservationInfo()
    },

    // 검색일로 검색하기 (시작일)
    onStartAlarmDate(date) {
      var cSelectDate = new Date(date.substring(0, 4), Number(date.substring(5, 7)) - 1, date.substring(8, 10))
      var cEndReservationDate = new Date(this.cEndReservationDate)

      if (cEndReservationDate < cSelectDate) {
        cEndReservationDate.setDate(cEndReservationDate.getDate() - 1)
        this.$refs.M4_StartDate_ref.SetDate(cEndReservationDate)
      }

      // this.GetReservationInfo()
    },

    // 검색일로 검색하기 (종료일)
    onEndAlarmDate(date) {
      var cSelectDate = new Date(date.substring(0, 4), Number(date.substring(5, 7)) - 1, date.substring(8, 10))
      var cStartReservationDate = new Date(this.cStartReservationDate)

      if (cSelectDate < cStartReservationDate) {
        cStartReservationDate.setDate(cStartReservationDate.getDate() + 1)
        this.$refs.M4_EndDate_ref.SetDate(cStartReservationDate)
      }

      // this.GetReservationInfo()
    },

    // 예약 상태값에 따른 상태보여주기
    cStateToKorean(cState) {
      if (cState == "R") {
        return "예약"
      } else if (cState == "X") {
        return "체험불참"
      } else if (cState == "E") {
        return "체험완료"
      } else {
        return "예약취소"
      }
    },

    // 예약 리스트 내역 가져오기 API
    GetReservationInfo() {
      this.zData = []

      console.log(Util.formatDateYYYYMMDDtoDash(this.cStartReservationDate));

      var posData = {
        SITE_CD : import.meta.env.VITE_SITE_CD,
        BKR_NM : this.cRequestName,
        BKR_MBL_TELNO : this.cRequestMobile,
        // 웹접근성용
        StartReservationDate : Util.cReturnDateToString(new Date(this.cStartReservationDate)),
        EndReservationDate : Util.cReturnDateToString(new Date(this.cEndReservationDate)),
        // StartReservationDate : Util.formatDateYYYYMMDDtoDash(this.cStartReservationDate),
        // EndReservationDate : Util.formatDateYYYYMMDDtoDash(this.cEndReservationDate),
        
        Birth : this.cRequestBirth,
        Token : this.cToken,
      }

      axios
        .post(import.meta.env.VITE_UIL_API + "GetReservationInfo", posData , {
          headers: {
          }
        })
        .then(res => {
          console.log(res.data);
          if (res.data.ResultCd === "00") {
            let iLen = res.data.Result.length

            this.zData = res.data.Result.map((item, index) => {
              item.iIndex = iLen - index
              item.cPlaceNm = Util.cTypeToPlaceNm(import.meta.env.VITE_SITE_CD)
              item.cShowCreateDateTime =  `${item.RSVT_DT.substring(0,10)}/${item.RSVT_TIME_CD.substring(3,5)}시`
              item.TOTAL_RSVT_NOPE =  `${item.TOTAL_RSVT_NOPE}명`
              return item
            })
          } else {
            console.log("Error !!");
          }
        })
        .catch(err =>{
          EventBus.$emit("onShowMsg", {
            cSubTitle : "예약 리스트 내역 조회 중 문제가 발생했습니다.",
            cTitle : "계속 지속될 경우 담당자에게 문의 바랍니다.",
            cMsg : `Error : ${err}`,
          });
        })
        .finally(() =>{
        })
    },

    // handleRowClick(event, {item}) {
    //   this.iEditIndex = this.zData.indexOf(item)
    //   this.ShowBoardDetailDialog(this.iEditIndex)
    // },

    // SelectYears2Func(AddArray, item, iIndex) {
    //   let iDelIndex = AddArray.findIndex(Item => Item.cCode == item.cCode)

    //   if (iDelIndex == -1) {
    //     AddArray.push({
    //       cCode : item.cCode,
    //       cYearsNm : item.cYearsNm,
    //       iOrder : iIndex,
    //       iManNum1 : 0, iWoManNum1 : 0, iManNum2 : 0, iWoManNum2 : 0, iManNum3 : 0, iWoManNum3 : 0, iManNum4 : 0, iWoManNum4 : 0
    //     })

    //     AddArray.sort(function(a, b)  {
    //       return a.iOrder - b.iOrder;
    //     });
    //   } else {
    //     AddArray.splice(iDelIndex, 1)
    //   }
    // },

    // AddExperiencerInfo() {
    //   this.bLocal2 = !this.bLocal1
    //   this.bUseMoreExperiencerInfo = true
    // },

    // ToggleCertificate() {
    //   if (!this.bCertificate) {
    //     this.zCertification = []
    //   } else {
    //     this.zCertification.push({
    //       cName : "",
    //       cBirth : "",
    //     })        
    //   }
    // },

    // AddCertification() {
    //   this.zCertification.push({
    //     cName : "",
    //     cBirth : "",
    //   })
    // },

    // DelCertification(item) {
    //   this.zCertification.splice(this.zCertification.indexOf(item), 1)
    // },

    // 자세 예약 다이올로그 보여주기
    async ShowDetailDialog(item) {
      var res = await this.GetReservationItemInfo(item)
      if (res.data.ResultCd == "44") { EventBus.$emit("onTokenExpired"); return; }

      if (res.data.ResultCd == "00") {
        if (res.data.Result1.length == 0) {
          EventBus.$emit("onShowMsg", {
            cSubTitle: "조회된 정보가 없습니다.",
            cTitle:"게시글이 삭제되었을 수 있습니다. 화면을 새로 고침 해주세요.",
            cMsg: `(${res.data.ResultCd}) ${res.data.Msg}`
          });
        } else {
          let zHolyTimeList = []

          if (res.data.Result6.length > 0) {
            if (res.data.Result6[0].OPER_YN == "N") {
              EventBus.$emit("onShowMsg", {
                cSubTitle: "공휴일로 지정되어 해당 프로그램을 시행하지 않습니다.",
                cTitle:"자세한 사항은 관리자에게 문의 해주세요.",
                cMsg: ""
              });
              return
            }

            zHolyTimeList = res.data.Result6[0].TIME_CD_LIST.split(',')
          }
          this.$refs.M4_ResEditDialog_ref.ShowDialog(res.data.Result1[0], res.data.Result2, res.data.Result3, res.data.Result4[0]?.iTotalCnt ? res.data.Result4[0].iTotalCnt : 0, this.CalcMaxCnt(res.data.Result5[0], item.RSVT_DT, zHolyTimeList.filter(Item => Item == item.RSVT_TIME_CD).length > 0), {
            cRequestName : this.cRequestName,
            cRequestMobile : this.cRequestMobile,
            cRequestBirth : this.cRequestBirth,
            jwt : this.cToken,
          })
        }
      } else {
        EventBus.$emit("onShowMsg", {
          cSubTitle: "상세 보기 중 문제가 발생했습니다.",
          cTitle:"문제가 계속 되면 관리자에게 문의 바랍니다.",
          cMsg: `(${res.data.ResultCd}) ${res.data.Msg}`
        });
      }
    },

    // 자세 예약 정보 가져오기 API
    GetReservationItemInfo(item) {
      var posData = {
        SITE_CD : import.meta.env.VITE_SITE_CD,
        EXP_CD : item.EXP_CD,
        EXP_RSVT_IDX : item.EXP_RSVT_IDX,
        RSVT_DT : item.RSVT_DT,
        RSVT_TIME_CD : item.RSVT_TIME_CD,

        Name : this.cRequestName,
        Tel : this.cRequestMobile,
        Birth : this.cRequestBirth,
        Token : this.cToken,
      };

      return new Promise((resolve) => (
        axios
        .post(import.meta.env.VITE_UIL_API + "GetReservationItemInfo", posData, {
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

    UpdateReservation(EXP_RSVT_IDX, iTotalNum) {
      let zUpdateObj = this.zData.filter(item => item.EXP_RSVT_IDX == EXP_RSVT_IDX)

      if (zUpdateObj.length > 0) {
        zUpdateObj[0].TOTAL_RSVT_NOPE = `${iTotalNum}명`
      }
    },

    CancelReservation(EXP_RSVT_IDX) {
      let zUpdateObj = this.zData.filter(item => item.EXP_RSVT_IDX == EXP_RSVT_IDX)

      if (zUpdateObj.length > 0) {
        zUpdateObj[0].RSVT_STTS = "C"
      }
    },

    CalcMaxCnt(EXP_INFO, EXP_DATE, bHolyDay) {
      var ToDaydate = new Date(EXP_DATE)
      if (bHolyDay) {
        return EXP_INFO.HOLIDAY_MAX_NOPE
      } else if (ToDaydate.getDay() + 1 == 7) {
        return EXP_INFO.SAT_MAX_NOPE
      } else if (ToDaydate.getDay() + 1 == 1) {
        return EXP_INFO.SUN_MAX_NOPE
      } else {
        return EXP_INFO.MAX_NOPE
      }
    },
  },
};
</script>
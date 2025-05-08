<template>
  <div>
    <h1 class="title-xxlarge">{{ $t("menu_0304_예약현황조회") }}</h1>

    <v-row class="pt-4">
      <v-col cols="12" sm="6" md="3" class="pt-0 pb-0 pr-2 pl-2">
        <M4_Date v-model:cDate="cSearchDate" :cMessage="''" cLabel="날짜" ref="M4_Date_ref"></M4_Date>
      </v-col>
      <v-col cols="12" sm="6" md="3" class="pt-0 pb-0 pr-2 pl-2" >
        <M4_Select 
          v-model="cSelectedExp"
          :items="zExpProgramList"
          @update:model-value="CheckChange()"
          placeholder="체험을 선택하세요."
          density="compact"
          variant="outlined"
          color="primary"
          persistent-placeholder
          item-title="cExpNm"
          item-value="cExpCd"
          label="체험을 선택하세요."     
          single-line
          return-object
        ></M4_Select>
      </v-col>
      <v-col cols="12" sm="6" md="3" class="pt-6 pl-2">
        <v-btn @click="GetSerchReservationInfo()" aria-label="조회"><v-icon aria-hidden="true" style="margin-right: 6px;">mdi-magnify</v-icon>조회</v-btn>
      </v-col>
    </v-row>
    <div class="mt-2 pa-3">
      <v-data-table
        :headers="headers"
        :items="zSelectReservationTimeList"
        item-key="iIndex"
        aria-labelledby="table-caption">        
        <template v-slot:default="props">
          <table class="nor_table_center">
            <caption id="table-caption" class="sr-only">예약현황 테이블</caption>
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
                <td>{{item.ExpTime}}</td>
                <td>{{item.iMaxCnt}}</td>
                <td>{{item.iNowCnt}}</td>
                <td>{{item.iAvailableCnt}}</td>
              </tr>
            </tbody>
          </table>
        </template>         
      </v-data-table>
    </div>
  </div>
</template>


<script>
import { EventBus } from '@/EventBus.js';
import axios from "axios";
import * as Util from "@/Util.js";

export default {
  data() {
    return {
      cSearchDate: Util.formatDate2(new Date()),
      cSelectedExp : "",
      oSelectedExp : [],
      zExpProgramList: [],

      ToDaydate:  new Date(),
      zReservationDayList : [],
      zReservationCntInfo : [],
      zHolyDayList : [],
      zSelectReservationTimeList : [],

      headers: [
        { title: "회차", key: 'iIndex', sortable: false, align: 'center'},
        { title: "체험시간", key: 'ExpTime', sortable: false, align: 'center'},
        { title: "정원", key: 'iMaxCnt', sortable: false, align: 'center'},
        { title: "예약인원", key: 'iNowCnt', sortable: false, align: 'center'},
        { title: "빈자리수", key: 'iAvailableCnt', sortable: false, align: 'center'},
      ],
    };
  },

  components:{
  },

  computed: {
  },

  mounted() {
    this.GetProgramInfo() 
  },

  beforeUnmount() {
  },

  methods : {
    CheckChange() {          
      this.oSelectedExp = this.zExpProgramList.filter(item => item.cExpCd == this.cSelectedExp)[0]
    },

    cDateTypeToString(DateTime) {
      return [DateTime.getFullYear(), (DateTime.getMonth() + 1).toString().padStart(2, '0'), DateTime.getDate().toString().padStart(2, '0')].join('-')
    },

    CheckCapacity(EXP_INFO, ToDaydate, zHolyDay, zHeadCnt) {
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

      return {iMaxCnt, iNowCnt, isAvailable : iMaxCnt > iNowCnt}
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

    async GetSerchReservationInfo() {
      this.zReservationDayList = []
      this.zReservationCntInfo = []
      this.zHolyDayList = []
      this.zSelectReservationTimeList = []

      var res = await this.GetReservationListLog()
      if (res.data.ResultCd == "00") {

        this.zReservationDayList = res.data.Result1
        this.zReservationCntInfo = res.data.Result2
        this.zHolyDayList = res.data.Result3

        this.zReservationDayList.forEach(item => {
          item.DAY_TYPE = Number(item.DAY_TYPE)
        })

        let date = new Date(this.cSearchDate)
        let zDisplayReservationTimeList = this.zReservationDayList.filter(item => item.DAY_TYPE == date.getDay() + 1)

        for (let i = 0; i < zDisplayReservationTimeList.length; i ++) {
          let {iMaxCnt, iNowCnt, isAvailable} = this.CheckCapacity(zDisplayReservationTimeList[i], date, this.zHolyDayList, this.zReservationCntInfo)
          this.zSelectReservationTimeList.push({
            iIndex : i + 1,
            ExpTime : Util.ConvertNumberToTime(Number(zDisplayReservationTimeList[i].RSVT_TIME_CD.substring(3,5))),
            RSVT_TIME_CD : zDisplayReservationTimeList[i].RSVT_TIME_CD,
            iMaxCnt: iMaxCnt, 
            iNowCnt: iNowCnt,
            iAvailableCnt: iMaxCnt - iNowCnt, 
            bAble : isAvailable,
          })
        }

      } else {
        EventBus.$emit("onShowMsg", {
          cSubTitle: "목록 조회 중 문제가 발생했습니다.",
          cTitle:"문제가 계속 되면 관리자에게 문의 바랍니다.",
          cMsg: `(${res.data.ResultCd}) ${res.data.Msg}`
        });
      }
    },

    GetReservationListLog() {
      var posData = {
        SITE_CD : import.meta.env.VITE_SITE_CD,
        EXP_CD : this.oSelectedExp.cExpCd,
        StartDate : this.cSearchDate,
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

    // 메인 지도 정보 가져오기 (POI)
    GetProgramInfo() {
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
            var zProgramList = []

            res.data.Result3.forEach((item) => {
              item.cPath = import.meta.env.VITE_FILE_API + item.cPath
            })

            for (let i = 0; i < res.data.Result1.length; i ++) {
              let oInputData = {
                zImgInfo : [{cPath : "/gwangnaru/contents/main_001.jpg", ALT_TEXT: "소방복과 공기호흡기를 착용한 소방관이 무릎을 꿇고 앉아 화재 현장을 바라보고 있는 모습"}],
                cType : "em",
                cExpCd : res.data.Result1[i].EXP_CD,
                cFloorId : "0F",
                // isText : "N",
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
            this.zExpProgramList = zProgramList

            if (this.zExpProgramList.length > 0) {
              this.oSelectedExp = this.zExpProgramList[0]
              this.cSelectedExp = this.oSelectedExp.cExpCd
            }

          } else {
            EventBus.$emit("onShowMsg", {
              cSubTitle : "프로그램 목록 조회 중 문제가 발생했습니다.",
              cTitle : "계속 지속될 경우 담당자에게 문의 바랍니다.",
              // cMsg : `Error : ${res.data.Msg}`,
            });
          }
        })
        .catch(err =>{
          EventBus.$emit("onShowMsg", {
            cSubTitle : "프로그램 목록 조회 중 문제가 발생했습니다.",
            cTitle : "계속 지속될 경우 담당자에게 문의 바랍니다.",
            // cMsg : `Error : ${err}`,
          });
        })
        .finally(() =>{
        })
    },


  }
};
</script>
<template>
  <div>
    <h1 class="title-xxlarge">{{ $t("menu_0303_이수증발급") }}</h1>
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
                <td>{{item.NM}}</td>
                <td>{{item.iTotalCnt}}</td>
                <td>{{cStateToKorean(item.RSVT_STTS)}}</td>
                <td>
                  <v-btn v-if="item.RSVT_STTS=='E'" @click="ShowSurveyDialog(item)">보기</v-btn>
                </td>        
              </tr>
            </tbody>
          </table>
        </template>         
      </v-data-table>
      <!-- <v-data-table
        :headers="headers"
        :items="zData"
        item-key="cReservationId"
        aria-labelledby="table-caption"
      >
        <template v-slot:top>
          <caption id="table-caption" class="sr-only">{{ $t("menu_0303_이수증발급") }} 테이블</caption>
        </template>
        <template v-slot:item.RSVT_STTS="{ value }">
          {{ cStateToKorean(value) }}
        </template>
        <template v-slot:item.cAction="{ item }">
          <v-btn @click="ShowSurveyDialog(item)">보기</v-btn>
        </template>
      </v-data-table> -->
    </div>

    <M4_Msgbox @onResult="onResult" ref="M4_Msgbox_ref"></M4_Msgbox>
    <M4_ExpSurvey @EndSurvey="EndSurvey" ref="M4_ExpSurvey_ref"></M4_ExpSurvey>
  </div>
</template>


<script>
import axios from "axios";
import { EventBus } from '@/EventBus.js';
import * as Util from "@/Util.js";

export default {
  data() {
    return {
      bUseWA: import.meta.env.VITE_USE_WA,
      cRequestName : "",
      cRequestMobile : "",
      cRequestBirth : "",
      cToken : "",
      iSurveyIndex : -1,
      headers : [
        { title: this.$t("all_table_header_번호"), key: 'iIndex', sortable: false, align: 'center'},
        { title: this.$t("all_table_header_장소"), key: 'cPlaceNm', sortable: false, align: 'center'},
        { title: this.$t("all_table_header_프로그램"), key: 'EXP_PRGRM_NM', sortable: false, align: 'center'},
        { title: this.$t("all_table_header_날짜/시간"), key: 'cShowCreateDateTime', sortable: false, align: 'center'},
        { title: this.$t("all_table_header_신청자이름"), key: 'NM', sortable: false, align: 'center'},
        { title: this.$t("all_table_header_예약인원"), key: 'iTotalCnt', sortable: false, align: 'center'},
        { title: this.$t("all_table_header_예약상태"), key: 'RSVT_STTS', sortable: false, align: 'center'},
        { title: "이수증 발급", key: 'cAction', sortable: false, align: 'center'},
      ],
      zData: [],
      REG_SN : -1,

      // bDetailDialog: false,
    };
  },

  components:{
  },

  mounted() {
  },

  beforeUnmount() {
  },

  methods : {
    ShowDispalyList(oAuthInfo) {
      this.cRequestName = oAuthInfo.cRequestName
      this.cRequestMobile = oAuthInfo.cRequestMobile
      this.cRequestBirth = oAuthInfo.cRequestBirth
      this.cToken = oAuthInfo.jwt

      this.GetCertificationList()
    },


    GetCertificationList() {
      var posData = {
        SITE_CD : import.meta.env.VITE_SITE_CD,
        BKR_NM : this.cRequestName,
        BKR_MBL_TELNO : this.cRequestMobile,
        Birth : this.cRequestBirth,
        Token : this.cToken,
      };

      axios
        .post(import.meta.env.VITE_UIL_API + "GetCertificationList", posData , {
          headers: {
          }
        })
        .then(res => {
          if (res.data.ResultCd === "00") {
            let iLen = res.data.Result.length

            this.zData = res.data.Result.map((item, index) => {
              item.iIndex = iLen - index
              item.cPlaceNm = Util.cTypeToPlaceNm(import.meta.env.VITE_SITE_CD)
              item.cShowCreateDateTime =  `${item.RSVT_DT.substring(0,10)}/${item.RSVT_TIME_CD.substring(3,5)}시`
              return item
            })
          } else {
            EventBus.$emit("onShowMsg", {
              cSubTitle : "이수증 정보 조회 중 문제가 발생했습니다.",
              cTitle : "계속 지속될 경우 담당자에게 문의 바랍니다.",
              cMsg : `Error : ${res.data.Msg}`,
            });
          }
        })
        .catch(err =>{
          EventBus.$emit("onShowMsg", {
            cSubTitle : "이수증 정보 조회 중 문제가 발생했습니다.",
            cTitle : "계속 지속될 경우 담당자에게 문의 바랍니다.",
            cMsg : `Error : ${err}`,
          });
        })
        .finally(() =>{
        })
    },

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

    ShowSurveyDialog(item) {
      if (!item) {
        return
      }

      this.iSurveyIndex = this.zData.indexOf(item)
      this.REG_SN = item.REG_SN

      this.$refs.M4_Msgbox_ref.ShowReturn("이수증 발급을 위해서는 설문조사 참여가 필요합니다.","","")

      this.$store.state.btnDialogRef = document.activeElement;
    },

    onResult() {
      // this.EndSurvey()
      this.$refs.M4_ExpSurvey_ref.ShowDialog({
        EXP_RSVT_IDX : this.zData[this.iSurveyIndex].EXP_RSVT_IDX,
        EXP_CD : this.zData[this.iSurveyIndex].EXP_CD,
        NM : this.cRequestName,
      })
    },


    // 설문조사 끝나고 이수증 출력을 위해 RestApi 호출
    async EndSurvey() {
      EventBus.$emit("onBackDialogMsgBtn");

      if (this.REG_SN == -1) {
        EventBus.$emit("onShowMsg", {
          cSubTitle : "이수증 출력이 불가합니다.",
          cTitle : "계속 지속될 경우 담당자에게 문의 바랍니다.",
          cMsg : "",
        });
        return
      }

      // 이수증 출력자 입력 api
      var res = await this.SetCertificateReportPrinter()
      if (res.data.ResultCd != "00") {
        EventBus.$emit("onShowMsg", {
          cSubTitle : "이수증 출력이 불가합니다.",
          cTitle : "계속 지속될 경우 담당자에게 문의 바랍니다.",
          cMsg : "",
        });
        return
      }

      var posData = {
        RegSn : String(this.REG_SN),

        Name : this.cRequestName,
        TelNo : this.cRequestMobile,
        Birth : this.cRequestBirth,
        Token : this.cToken,

        // 이수증 로그 관련 데이터
        SITE_CD : import.meta.env.VITE_SITE_CD,
        EXP_CD : this.zData[this.iSurveyIndex].EXP_CD,
        EXP_RSVT_IDX : this.zData[this.iSurveyIndex].EXP_RSVT_IDX,
        REQUEST_NM : this.cRequestName,
      };

      axios
        .post(import.meta.env.VITE_UIL_API + "GenerateCertificateReportAuthCode", posData , {
          headers: {
          }
        })
        .then(res => {
          if (res.data.ResultCd === "00") {
            if (this.bUseWA != "true") {
              console.log("res.data.Result[0].authToken", res.data.Result[0].authToken )              // Step 2: 팝업창 띄우기
              const popupURL = `${import.meta.env.VITE_PRINT_URL}?regSn=${posData.RegSn}&authToken=${res.data.Result[0].authToken}`;
              window.open(popupURL, "_blank", "width=850,height=800");
            } else {
              this.GetCertificateReportPDF()
            }
          } else {
            EventBus.$emit("onShowMsg", {
              cSubTitle : "이수증 출력 중 문제가 발생했습니다.",
              cTitle : "계속 지속될 경우 담당자에게 문의 바랍니다.",
              cMsg : `Error : ${res.data.Msg}`,
            });
          }
        })
        .catch(err =>{
          EventBus.$emit("onShowMsg", {
            cSubTitle : "이수증 출력 중 문제가 발생했습니다.",
            cTitle : "계속 지속될 경우 담당자에게 문의 바랍니다.",
            cMsg : `Error : ${err}`,
          });
        })
        .finally(() =>{
        })
    },

    GetCertificateReportPDF() {
      var posData = {
        RegSn : String(this.REG_SN),

        Name : this.cRequestName,
        TelNo : this.cRequestMobile,
        Birth : this.cRequestBirth,
        Token : this.cToken,

        // 이수증 로그 관련 데이터
        SITE_CD : import.meta.env.VITE_SITE_CD,
        EXP_CD : this.zData[this.iSurveyIndex].EXP_CD,
        EXP_RSVT_IDX : this.zData[this.iSurveyIndex].EXP_RSVT_IDX,
        REQUEST_NM : this.cRequestName,
        REQUEST_URL: import.meta.env.VITE_PRINT_URL
      };

      axios
      .post(import.meta.env.VITE_UIL_API + "GetCertificateReportPDF", posData, {
          responseType: 'blob', 
        })
        .then(res => {
          const blob = new Blob([res.data], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', '이수증.pdf'); // 파일명 지정
          document.body.appendChild(link);
          link.click();
          link.remove();
          window.URL.revokeObjectURL(url); // 메모리 해제
        })
        .catch(err =>{
          EventBus.$emit("onShowMsg", {
            cSubTitle : "이수증 출력 중 문제가 발생했습니다.",
            cTitle : "계속 지속될 경우 담당자에게 문의 바랍니다.",
            cMsg : `Error : ${err}`,
          });
        })
        .finally(() =>{
        })
    },

    // 파일 다운로드
    DownloadFile(name) {
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

    // 이수증 출력자 입력
    SetCertificateReportPrinter() {
      var posData = {
        RegSn : String(this.REG_SN),
        REQUEST_NM : this.cRequestName,
      };
      return new Promise((resolve) => (
        axios
        .post(import.meta.env.VITE_UIL_API + "SetCertificateReportPrinter", posData, {
          headers: {
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

  },
};
</script>
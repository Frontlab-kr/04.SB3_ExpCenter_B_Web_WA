<template>
  <v-dialog aria-modal="true" @update:modelValue="DialogClose" v-model="bDialog" width="500">
    <v-card class="">
      <div class="d-flex mt-n4 pt-5 pl-5 pr-5">
        <v-spacer></v-spacer>
        <v-btn variant="plain" class="mr-n3" icon @click="DialogClose" title="닫기"><v-icon aria-hidden="true">mdi-close</v-icon></v-btn>
      </div>

      <div class="printable-area ma-5 mt-0" style="margin-bottom: 40px;">
        <div style="display: flex; justify-content: center; padding-bottom: 5px; padding-left: 5px;">
          <div style="font-size: 32px; font-weight: 700;">예약확인증</div>
        </div>

        <div style="overflow: auto; height: calc(80vh - 300px);max-height: 580px;margin-bottom : 40px">
          <h3 class="ml-2">{{ oReservationData.EXP_PRGRM_NM}}</h3>
          <table class="nor_table">
            <!-- <caption class="sr-only">예약 내역 정보 테이블</caption> -->
            <tr>
              <td>예약번호</td>
              <td>{{ oReservationData.EXP_RSVT_IDX }}</td>
            </tr>
            <tr>
              <td>예약일자</td>
              <td>{{ oReservationData.RSVT_DT }}</td>
            </tr>
            <tr>
              <td>예약시간</td>
              <td>{{ oReservationData.RSVT_TIME_CD }}</td>
            </tr>
            <tr>
              <td>예약인원</td>
              <td>{{ oReservationData.iTotalReservationNum }}</td>
            </tr>
            <tr>
              <td>예약자명</td>
              <td>{{ oReservationData.BKR_NM }}</td>
            </tr>
            <tr>
              <td>전화번호</td>
              <td>{{ oReservationData.BKR_TELNO }}</td>
            </tr>
            <tr>
              <td>휴대전화</td>
              <td>{{ oReservationData.BKR_MBL_TELNO }}</td>
            </tr>
            <tr>
              <td>문의처</td>
              <td>{{ oReservationData.cContactInfo }}</td>
            </tr>
            <tr>
              <td>교육 장소</td>
              <td>{{ oReservationData.cLocation }}</td>
            </tr>
            <tr>
              <td>주소</td>
              <td>{{ oReservationData.cLocationDetail }}</td>
            </tr>
            <tr>
              <td style="min-width: 100px;">예약 신청일</td>
              <td>{{ oReservationData.UPDT_DT }}</td>
            </tr>
          </table>
        </div>
      </div>

      <div class="d-flex justify-space-around" style="position: absolute; bottom: 15px; width: 100%;">
        <v-btn color="black" @click="print()" width="200px"><v-icon aria-hidden="true">mdi-printer</v-icon>인쇄</v-btn>
        <v-btn color="black" @click="ExportExcel('예약확인증')" width="200px"><v-icon aria-hidden="true">mdi-microsoft-excel</v-icon>엑셀 다운로드</v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import * as XLSX from 'xlsx';
import * as Util from "@/Util.js";
import { EventBus } from '@/EventBus.js';

export default {
  data() {
    return {
      bDialog : false,
      oReservationData: {
        EXP_PRGRM_NM: "재난체험",
        EXP_RSVT_IDX: "",
        RSVT_DT: "",
        RSVT_TIME_CD: "",
        iTotalReservationNum: "",
        BKR_NM: "",
        BKR_TELNO: "",
        BKR_MBL_TELNO: "",
        cContactInfo: "02-2027-4100",
        cLocation: "",
        cLocationDetail: "서울 강동구 연무장길 76 1002호",
        UPDT_DT: "",
      },
      // Records: [
      //   {iIndex : "123", PST_TTL : "456"},
      //   {iIndex : "789", PST_TTL : "101"},
      // ],
      ExheadersVertical : [
        { text: "예약번호", value: 'EXP_RSVT_IDX'},
        { text: "예약일자", value: 'RSVT_DT'},
        { text: "예약시간", value: 'RSVT_TIME_CD'},
        { text: "예약인원", value: 'iTotalReservationNum'},
        { text: "예약자명", value: 'BKR_NM'},
        { text: "전화번호", value: 'BKR_TELNO'},
        { text: "휴대전화", value: 'BKR_MBL_TELNO'},
        { text: "문의처", value: 'cContactInfo'},
        { text: "교육 장소", value: 'cLocation'},
        { text: "주소", value: 'cLocationDetail'},
        { text: "예약 신청일", value: 'UPDT_DT'},
      ],
    }
  },

  methods: {
    onAfterPrint() {
      this.DialogClose();

    },

    DialogClose() {
      this.bDialog = false;
      this.$store.state.isDialog = false;
      EventBus.$emit("onBackDialogBtn");
    },


    PrintSubmission(data) {
      this.bDialog = true
      this.$store.state.isDialog = true;
      this.$store.state.btnDialogRef = document.activeElement;

      this.oReservationData = Object.assign({
        EXP_PRGRM_NM: data.EXP_PRGRM_NM,
        EXP_RSVT_IDX: data.EXP_RSVT_IDX,
        RSVT_DT: data.RSVT_DT,
        RSVT_TIME_CD: data.RSVT_TIME_CD,
        iTotalReservationNum: data.iTotalReservationNum,
        BKR_NM: data.BKR_NM,
        BKR_TELNO: data.BKR_TELNO,
        BKR_MBL_TELNO: data.BKR_MBL_TELNO,
        cContactInfo: "02-2027-4100",
        cLocation: data.cLocation+" 안전체험관",
        cLocationDetail: "서울 강동구 연무장길 76 1002호",
        UPDT_DT: data.UPDT_DT,
      })
    },

    print() {
      this.$nextTick(() => {
        const printableCard = document.querySelector(".printable-area");

        if (!printableCard) {
          console.error("The printable-area element was not found in the DOM.");
          return;
        }

        const printContents = printableCard.outerHTML;

        // Create a new iframe
        const printWindow = document.createElement("iframe");
        printWindow.style.position = "absolute";
        printWindow.style.top = "-10000px";
        printWindow.style.left = "-10000px";

        document.body.appendChild(printWindow);

        // Add content to the iframe
        const iframeDoc = printWindow.contentDocument || printWindow.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write(`
          <html>
            <head>
              <title>Print</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 0;
                  width: 500px;
                }
                .nor_table {
                  border-collapse: collapse;
                  width: 100%;
                  border-top: 2px solid #99b0cb;
                  border-bottom: 2px solid #99b0cb;
                }
                .nor_table th{
                  padding: 10px;
                  background-color: #edf1f5;
                  border-bottom: 1px solid #99b0cb;
                }
                .nor_table td {
                  padding: 10px;
                  border-bottom: 1px solid #d8d8d8;
                }
              </style>
            </head>
            <body>${printContents}</body>
          </html>
        `);
        iframeDoc.close();

        // Trigger print
        printWindow.contentWindow.focus();
        printWindow.contentWindow.print();

        // Clean up
        printWindow.contentWindow.onafterprint = () => {
          document.body.removeChild(printWindow);
          this.onAfterPrint();
        };
      });
    },

    ExportExcel(name) {
      var r = this.GetExcel(this.oReservationData, this.ExheadersVertical);
      var animalWS = XLSX.utils.json_to_sheet(r)
      var wb = XLSX.utils.book_new() // make Workbook of Excel
      XLSX.utils.book_append_sheet(wb, animalWS, name) // sheetAName is name of Worksheet      
      XLSX.writeFile(wb, `${name}_${Util.sNowDate()}.xlsx`); // name of the file is 'book.xlsx'
    },

    GetExcel(org, header) {
      var ret = [];

      for(var i in header){
        var a = {"예약확인증 내역" : header[i].text, "" : org[header[i].value]}
        ret.push(a);
      }

      return ret;
    },
  }
}
</script>
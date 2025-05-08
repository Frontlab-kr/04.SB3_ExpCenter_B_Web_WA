<template>
  <div>
    <table class="nor_table">
      <caption class="sr-only">만족도 평가 테이블</caption>
      <tbody>
        <tr>
          <th scope="row">{{ $t("M4_Satisfaction_text_1") }}</th>
          <td>{{ MNG_DEPT_NM }}</td>
          <th scope="row">{{ $t("M4_Satisfaction_text_2") }}</th>
          <td>{{ MNG_DEPT_TELNO }}</td>
        </tr>
      </tbody>
    </table>
       

    <div style="outline : 1px solid var(--secondary-30);margin-top: 15px; padding: 15px;background-color: #edf1f5;">
      <div class="body-medium mb-1">이 페이지에서 제공하는 정보에 만족하셨습니까?</div>
      <div class="body-small" :class="oEditItem.OP_CN.length > 60 ? 'text-red' : ''">* 의견쓰기: 60자 이내로 입력하세요({{ oEditItem.OP_CN.length }}/60)</div>
      <v-radio-group v-model="oEditItem.POINT" inline>
        <v-radio v-for="(item, index) in zRadioInfo" :key="index" :label="item.label" :class="item.class" :value="item.value"></v-radio>
      </v-radio-group>
      <v-row>
        <v-col cols="9">
          <M4_Inputarea v-model="oEditItem.OP_CN" max-length="60" style="background-color: white;" hide-details persistent-placeholder density="compact" variant="outlined" color="primary" :auto-grow="true" :no-resize="true" rows="1"></M4_Inputarea>
        </v-col>
        <v-col cols="3">
          <v-btn @click="SetSatisfactionInfo()" >평가하기</v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { EventBus } from '@/EventBus.js';

export default {
  props : ["MNG_DEPT_NM", "MNG_DEPT_TELNO", "CONTS_ID"],
  data() {
    return {
      zRadioInfo : [
        {value : 5, label : "매우 만족", class : "mr-2"},
        {value : 4, label : "만족", class : "mr-2"},
        {value : 3, label : "보통", class : "mr-2"},
        {value : 2, label : "불만족", class : "mr-2"},
        {value : 1, label : "매우 불만족", class : "mr-2"},
      ],

      oEditItem : {
        POINT : 5,
        OP_CN : "",
      },
      oDefaultEditItem : {
        POINT : 5,
        OP_CN : "",
      },
    }
  },

  mounted() {
  },

  methods: {
    // 평가하기 클릭시
    SetSatisfactionInfo() {
      this.oEditItem.OP_CN = this.oEditItem.OP_CN.trim()

      if (this.oEditItem.OP_CN.length > 60) {
        EventBus.$emit("onShowMsg", {
          cSubTitle : "입력하신 글자 수를 확인해 주세요.",
          cTitle : "최대 60자 까지 입력 가능합니다.",
          cMsg : "",
        });
      }
      
      this.zData = []

      var posData = {
        POINT : this.oEditItem.POINT,
        OP_CN : this.oEditItem.OP_CN,
        CONTS_ID : this.CONTS_ID,
      }

      axios
        .post(import.meta.env.VITE_UIL_API + "SetSatisfactionInfo", posData , {
          headers: {
          }
        })
        .then(res => {
          if (res.data.ResultCd === "00") {
            EventBus.$emit("onAlarmSnackbar", {
              cColor : "info",
              iTimeOut : 4000,
              sMsg : "참여해 주셔서 감사합니다.",
            })
            
            this.oEditItem = {...this.oDefaultEditItem}
          } else {
            EventBus.$emit("onShowMsg", {
              // cSubTitle : "주택용 소방시설 설치대행 안심 서비스 중 문제가 발생했습니다.",
              cTitle : "계속 지속될 경우 담당자에게 문의 바랍니다.",
              cMsg : `Error : ${res.data.Msg}`,
            });
          }
        })
        .catch(err =>{
          EventBus.$emit("onShowMsg", {
            // cSubTitle : "주택용 소방시설 설치대행 안심 서비스 중 문제가 발생했습니다.",
            cTitle : "계속 지속될 경우 담당자에게 문의 바랍니다.",
            cMsg : `Error : ${err}`,
          });
        })
        .finally(() =>{
        })
    }
  }
}
</script>
<template>
  <v-dialog aria-modal="true" @update:modelValue="DialogClose" v-model="bDialog" width="500px">
    <v-card class="pa-4">
      <div class="d-flex">
        <h2 class="mb-3 ">설문 조사</h2>
        <v-spacer></v-spacer>        
        <v-btn class="mt-n1 mr-n3" color="black" icon @click="DialogClose" title="닫기" size="small"><v-icon aria-hidden="true">mdi-close</v-icon></v-btn>
      </div>
      <div class="bg-gap-3"></div>
      <div v-for="(question, index) in questions" :key="index" class="mb-3">
        <div role="text">{{ index + 1 }}. {{ question.SURVEY_ITEM_TEXT }}</div>
        <div v-if="question.SURVEY_ITEM_TYPE == '01'" >
          <div v-for="(option, optionIndex) in question.options" :key="optionIndex" class="d-flex ml-2 mt-1 input-group">            
            <input 
              class="ml-2"           
              type="radio"    
              :name="index"          
              :value="option.CHEK_CASE_SER"
              v-model="question.REAL_CHECK"     
              :id="'question-' + index + '-' + option.CHEK_CASE_SER"         
            />            
            <label class="ml-3" :for="'question-' + index + '-' + option.CHEK_CASE_SER">{{ option.SURVEY_CASE_TEXT }}</label>
          </div>
        </div>
        <div v-else>
          <M4_Input hide-details v-model="question.USER_INPUT" label="답 입력" aria-label="" placeholder=""></M4_Input>
        </div>
      </div>
      <div class="d-flex flex-wrap mt-4">
        <v-spacer></v-spacer>
        <v-btn @click="SetExpSurveyInfo()" class="mb-1" color="primary" width="100" title="새창열림">{{ $t("all_btn_save")}}</v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
import { EventBus } from '@/EventBus.js';

export default {
  data() {
    return {
      bDialog : false,
      questions: [],
      oLogInfo : {
        EXP_RSVT_IDX : 0,
        EXP_CD : "",
        NM : "",
      }
    };
  },
  methods: {
    DialogClose() {
      this.bDialog = false;      
      this.$store.state.isDialog = false;
      EventBus.$emit("onBackDialogBtn");       
    },

    ShowDialog(oLogInfo) {
      this.bDialog = true
      this.oLogInfo = {...oLogInfo}
      this.GetExpSurveyInfo();

      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }, 1000);
    },

    GetExpSurveyInfo() {
      this.questions = []

      var posData = {
      }

      axios
        .post(import.meta.env.VITE_UIL_API + "GetExpSurveyInfo", posData , {
          headers: {
          }
        })
        .then(res => {
          if (res.data.ResultCd === "00") {
            for (let i = 0; i < res.data.Result1.length; i ++) {
              let oPushItem = {
                SURVEY_IDX : res.data.Result1[i].SURVEY_IDX,
                SURVEY_ITEM_TYPE : res.data.Result1[i].SURVEY_ITEM_TYPE,
                SURVEY_ITEM_TEXT : res.data.Result1[i].SURVEY_ITEM_TEXT,
                SURVEY_ITEM_IDX : res.data.Result1[i].SURVEY_ITEM_IDX,
                REAL_CHECK : 0,
                USER_INPUT : "",
                options : [],
              }

              let zSelectOptions = res.data.Result2.filter(item => item.SURVEY_ITEM_IDX == res.data.Result1[i].SURVEY_ITEM_IDX)

              for (let k = 0; k < zSelectOptions.length; k ++) {
                oPushItem.options.push({
                  SURVEY_CASE_TEXT : zSelectOptions[k].SURVEY_CASE_TEXT,
                  CHEK_CASE_SER : zSelectOptions[k].SURVEY_CASE_SER,
                })

                // oPushItem.REAL_CHECK = zSelectOptions[0].SURVEY_CASE_SER
                oPushItem.REAL_CHECK = null
              }

              if (zSelectOptions.length == 0) {
                oPushItem.options.push({
                  SURVEY_CASE_TEXT : "",
                  CHEK_CASE_SER : 0,
                })

                oPushItem.USER_INPUT = ""
              }

              this.questions.push(oPushItem)
            }
          } else {
            EventBus.$emit("onShowMsg", {
              cSubTitle : "목록 조회 중 문제가 발생했습니다.",
              cTitle : "계속 지속될 경우 담당자에게 문의 바랍니다.",
              cMsg : `Error : ${res.data.Msg}`,
            });
          }
        })
        .catch(err =>{
          EventBus.$emit("onShowMsg", {
            cSubTitle : "목록 조회 중 문제가 발생했습니다.",
            cTitle : "계속 지속될 경우 담당자에게 문의 바랍니다.",
            cMsg : `Error : ${err}`,
          });
        })
        .finally(() =>{
        })
    },


    SetExpSurveyInfo() {
      var zAnserData = []

      for (let i = 0; i < this.questions.length; i ++) {
        this.questions[i].USER_INPUT.trim()

        if (this.questions[i].SURVEY_ITEM_TYPE == "03" && this.questions[i].USER_INPUT == "") {
          EventBus.$emit("onShowMsg", {
            cSubTitle : "입력이 누락된 부분이 있습니다.",
            cTitle : `${i + 1}번 항목에 대한 답변을 작성해 주세요`,
            cMsg : "",
          });
          return
        } else {
          zAnserData.push({
            SURVEY_IDX : this.questions[i].SURVEY_IDX,
            SURVEY_ITEM_IDX : this.questions[i].SURVEY_ITEM_IDX,
            CHEK_CASE_SER : this.questions[i].REAL_CHECK,
            USER_INPUT : this.questions[i].USER_INPUT,
          })
        }
      }

      var posData = {
        SITE_CD : import.meta.env.VITE_SITE_CD,
        EXP_CD       : this.oLogInfo.EXP_CD,
        EXP_RSVT_IDX : this.oLogInfo.EXP_RSVT_IDX,
        NM           : this.oLogInfo.NM,
        SruveyItem   : zAnserData,
      }

      axios
        .post(import.meta.env.VITE_UIL_API + "SetExpSurveyInfo", posData , {
          headers: {
          }
        })
        .then(res => {
          if (res.data.ResultCd === "00") {
            this.DialogClose();
            this.$emit("EndSurvey")
          } else {
            EventBus.$emit("onShowMsg", {
              cSubTitle : "목록 조회 중 문제가 발생했습니다.",
              cTitle : "계속 지속될 경우 담당자에게 문의 바랍니다.",
              cMsg : `Error : ${res.data.Msg}`,
            });
          }
        })
        .catch(err =>{
          EventBus.$emit("onShowMsg", {
            cSubTitle : "목록 조회 중 문제가 발생했습니다.",
            cTitle : "계속 지속될 경우 담당자에게 문의 바랍니다.",
            cMsg : `Error : ${err}`,
          });
        })
        .finally(() =>{
        })
    }
  }
};
</script>

<style scoped>
button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}

.input-group {
    display: inline-block;
  }
  
  .input-group:focus-within {
    border:dashed 2px #d50136 ! important; outline:none ! important
  }

</style>
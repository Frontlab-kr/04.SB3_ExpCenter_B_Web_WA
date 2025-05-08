<template>
  <v-dialog v-model="bDialog" :width="bShowQuestion ? '500px' : '500px'" aria-modal="true" @update:modelValue="DialogClose">
    <v-card v-show="!bShowQuestion" class="pa-5">
      <h2 class="d-flex title-large ">
        {{ SURVEY_TTL }}
        <v-spacer></v-spacer>
        <!-- <v-btn variant="plain" class="mt-n3 mr-n3" icon @click="DialogClose" title="닫기"><v-icon aria-hidden="true">mdi-close</v-icon></v-btn> -->
      </h2>
      <div class="mb-3" style="color: var(--primary-80);"><li>기간: {{ START_DT }} ~ {{ END_DT }}</li></div>
      <div class="mb-3 nor_table_center">{{ SURVEY_EXPLN }}</div>
      <div><v-btn @click="bShowQuestion = true">설문 바로가기</v-btn></div>
      <div class="d-flex align-center mb-n5">
        <v-checkbox v-model="bNoShowToday" @click="NoShowToday()" hide-details >
          <template v-slot:label>
            <div class="mt-1 d-none d-md-flex" style="font-size: 14px;">오늘하루 이 창을 열지 않습니다.</div>
            <div class="mt-1 d-md-none" style="font-size: 12px;">오늘하루 이 창을 열지 않습니다.</div>
          </template>
        </v-checkbox>
        <v-spacer></v-spacer>
        <!-- <v-btn @click="DialogClose" variant="plain" density="compact">닫기</v-btn> -->
        <v-btn @click="DialogClose" style="margin-top: 14px;" variant="outlined" color="black" title="닫기" density="comfortable"><v-icon aria-hidden="true" style="margin-right: 6px;">mdi-close</v-icon>{{ $t("all_btn_close") }}</v-btn>
      </div>
    </v-card>


    <v-card v-show="bShowQuestion" class="pa-4">
      <h2 class="mb-3 nor_table_center">{{ SURVEY_TTL }}</h2>
      <div class="bg-gap-3"></div>
      <div v-for="(question, index) in questions" :key="index" class="mb-3">
        <p>{{ index + 1 }}. {{ question.SURVEY_ITEM_TEXT }}</p>
        <!-- 단일 선택 -->
        <div v-if="question.SURVEY_ITEM_TYPE == '01'">
          <div v-for="(option, optionIndex) in question.options" :key="optionIndex" class="d-flex ml-5 mt-1">
            <input
              type="radio"              
              :name="'question-' + index"
              :value="option.CHEK_CASE_SER"
              v-model="question.REAL_CHECK[0]"
            />
            <label class="ml-3">{{ option.SURVEY_CASE_TEXT }}</label>
          </div>
        </div>
        <!-- 복수 선택 -->
        <div v-else-if="question.SURVEY_ITEM_TYPE == '02'">
          <div v-for="(option, optionIndex) in question.options" :key="optionIndex" class="d-flex ml-5 mt-1">
            <input
              type="checkbox"
              :id="'checkbox-' + optionIndex"
              :value="option.CHEK_CASE_SER"
              v-model="question.REAL_CHECK"
            />
            <label :for="'checkbox-' + optionIndex" class="ml-3">{{ option.SURVEY_CASE_TEXT }}</label>
          </div>
        </div>
        <!-- 단답형 -->
        <div v-else>
          <M4_Input
            hide-details
            v-model="question.USER_INPUT"
            label=""
            aria-label=""
            placeholder=""            
          ></M4_Input>
        </div>
      </div>
      <div class="d-flex flex-wrap mt-4">
        <v-spacer></v-spacer>
        <v-btn
          @click="SetSurveyInfo()"
          class="mb-1"
          color="primary"
          width="100"
          alt="저장"
        >
          {{ $t("all_btn_save") }}
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
import { EventBus } from "@/EventBus.js";

export default {
  data() {
    return {
      bDialog: false,
      bShowQuestion: false,
      SURVEY_TTL: "",
      SURVEY_EXPLN: "",
      START_DT: "",
      bNoShowToday: "",
      END_DT: "",
      questions: [],
    };
  },
  methods: {
    ShowDialog() {
      this.GetSurveyInfo();
    },

    DialogClose() {
      this.bDialog = false
      this.$store.state.isDialog = false;      
    },
    

    NoShowToday() {
      this.bDialog = false
      this.$store.state.isDialog = false;

      this.InitData()
      let today = new Date().toISOString().split("T")[0]
      localStorage.setItem("NoShowSurveyStamp: "+ import.meta.env.VITE_SITE_ID, today)
    },

    InitData() {
      this.questions = []
      this.bShowQuestion = false
      this.bNoShowToday = false
      this.SURVEY_TTL = ""
      this.SURVEY_EXPLN = ""
      this.START_DT = ""
      this.END_DT = ""
    },

    GetSurveyInfo() {
      // localStorage.removeItem("NoShowSurveyStamp: "+ import.meta.env.VITE_SITE_ID)
      let today = new Date().toISOString().split("T")[0]
      let stamp = localStorage.getItem("NoShowSurveyStamp: "+ import.meta.env.VITE_SITE_ID)
      // 오늘 확인
      if (stamp && stamp == today) {
        return
      }

      this.InitData()

      var posData = {
        SITE_ID : import.meta.env.VITE_SITE_ID,
      };

      axios
        .post(import.meta.env.VITE_UIL_API + "GetSurveyInfo", posData, {
          headers: {},
        })
        .then((res) => {
          if (res.data.ResultCd === "00") {
            this.bDialog = res.data.Result1.length > 0;
            if (!this.bDialog) {return}

            this.$store.state.isDialog = true;

            this.SURVEY_TTL = res.data.Result1[0].SURVEY_TTL
            this.SURVEY_EXPLN = res.data.Result1[0].SURVEY_EXPLN
            this.START_DT = res.data.Result1[0].START_DT.substring(0,10)
            this.END_DT = res.data.Result1[0].END_DT.substring(0,10)

            for (let i = 0; i < res.data.Result2.length; i++) {
              if (i == 2 || i == 4) {
                res.data.Result2[i].SURVEY_ITEM_TYPE = "02"
              }

              let oPushItem = {
                SURVEY_IDX: res.data.Result2[i].SURVEY_IDX,
                SURVEY_ITEM_TYPE: res.data.Result2[i].SURVEY_ITEM_TYPE,
                SURVEY_ITEM_TEXT: res.data.Result2[i].SURVEY_ITEM_TEXT,
                SURVEY_ITEM_IDX: res.data.Result2[i].SURVEY_ITEM_IDX,
                MUST_YN: res.data.Result2[i].MUST_YN,
                REAL_CHECK: [0], // 복수 선택 초기화
                USER_INPUT: "",
                options: [],
              };

              let zSelectOptions = res.data.Result3.filter((item) => item.SURVEY_ITEM_IDX == res.data.Result2[i].SURVEY_ITEM_IDX);

              for (let k = 0; k < zSelectOptions.length; k++) {
                oPushItem.options.push({
                  SURVEY_CASE_TEXT: zSelectOptions[k].SURVEY_CASE_TEXT,
                  CHEK_CASE_SER: zSelectOptions[k].SURVEY_CASE_SER,
                });

                // if (res.data.Result2[i].SURVEY_ITEM_TYPE !== "02") {
                //   oPushItem.REAL_CHECK = zSelectOptions[0].SURVEY_CASE_SER; // 단일 선택 초기화
                // }
              }

              if (zSelectOptions.length == 0) {
                oPushItem.options.push({
                  SURVEY_CASE_TEXT: "",
                  CHEK_CASE_SER: 0,
                });

                oPushItem.USER_INPUT = "";
              }

              this.questions.push(oPushItem);
            }
          } else {
            EventBus.$emit("onShowMsg", {
              cSubTitle: "설문 정보 조회 중 문제가 발생했습니다.",
              cTitle: "계속 지속될 경우 담당자에게 문의 바랍니다.",
              cMsg: `Error : ${res.data.Msg}`,
            });
          }
        })
        .catch((err) => {
          EventBus.$emit("onShowMsg", {
            cSubTitle: "설문 정보 조회 중 문제가 발생했습니다.",
            cTitle: "계속 지속될 경우 담당자에게 문의 바랍니다.",
            cMsg: `Error : ${err}`,
          });
        })
        .finally(() => {});
    },

    SetSurveyInfo() {
      var zAnserData = [];

      for (let i = 0; i < this.questions.length; i++) {
        this.questions[i].USER_INPUT.trim();

        if (this.questions[i].SURVEY_ITEM_TYPE == "03" && this.questions[i].USER_INPUT == "") {
          EventBus.$emit("onShowMsg", {
            cSubTitle: "입력이 누락된 부분이 있습니다.",
            cTitle: `${i + 1}번 항목에 대한 답변을 작성해 주세요`,
            cMsg: "",
          });
          return;
        } else if ( this.questions[i].SURVEY_ITEM_TYPE == "02" && this.questions[i].REAL_CHECK.length == 0 ) {
          EventBus.$emit("onShowMsg", {
            cSubTitle: "입력이 누락된 부분이 있습니다.",
            cTitle: `${i + 1}번 항목에 대한 답변을 선택해 주세요`,
            cMsg: "",
          });
          return;
        } else {
          zAnserData.push({
            SURVEY_IDX: this.questions[i].SURVEY_IDX,
            SURVEY_ITEM_IDX: this.questions[i].SURVEY_ITEM_IDX,
            CHEK_CASE_SER: this.questions[i].REAL_CHECK, // 복수 선택 값
            USER_INPUT: this.questions[i].USER_INPUT,
            SITE_ID: import.meta.env.VITE_SITE_ID,
          });
        }
      }

      axios
        .post(import.meta.env.VITE_UIL_API + "SetSurveyInfo", zAnserData, {
          headers: {},
        })
        .then((res) => {
          if (res.data.ResultCd === "00") {
            this.bDialog = false
            this.$store.state.isDialog = false;

            
            this.InitData()
          } else {
            EventBus.$emit("onShowMsg", {
              cSubTitle: "설문 정보 저장 중 문제가 발생했습니다.",
              cTitle: "계속 지속될 경우 담당자에게 문의 바랍니다.",
              cMsg: `Error : ${res.data.Msg}`,
            });
          }
        })
        .catch((err) => {
          EventBus.$emit("onShowMsg", {
            cSubTitle: "설문 정보 저장 중 문제가 발생했습니다.",
            cTitle: "계속 지속될 경우 담당자에게 문의 바랍니다.",
            cMsg: `Error : ${err}`,
          });
        })
        .finally(() => {});
    },
  },
};
</script>

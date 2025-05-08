<template>
  <div>
    <!-- 본인 인증 다이얼로그 -->
    <v-dialog aria-modal="true" @update:modelValue="DialogClose" v-model="bDialog" width="350px">
      <v-card class="pa-4 pl-6 pr-6">
        <div class="d-flex">
            <div class="title-large">KAKAO 본인인증</div>
            <v-spacer></v-spacer>
            <v-btn variant="plain" class="mt-n3 mr-n3" icon @click="DialogClose" title="닫기"><v-icon aria-hidden="true">mdi-close</v-icon></v-btn>
        </div>

        <div style="max-height: 80vh; overflow: hidden;">
          <v-row class="ma-0">
            <v-col cols="12" md="12" sm="12" class="mb-n3">
              <M4_Input v-model="formData.receiverName" label="이름"></M4_Input>
            </v-col>
            <v-col cols="12" md="12" sm="12" class="mb-n3">
              <M4_Input v-model="formData.receiverBirthday" label="생년월일 8자리 숫자로 입력 (예: 20250212)"></M4_Input>
            </v-col>
            <v-col cols="12" md="12" sm="12" class="mb-n3">
              <M4_Input v-model="formData.receiverHP" label="휴대폰번호 (숫자만 입력, '-'제외)"></M4_Input>
            </v-col>
            <div class="agreement">
              <v-checkbox
                v-model="isAgree"
                label="개인정보 제3자 제공에 동의합니다."
                aria-label="개인정보 제3자 제공 동의"
                class="checkbox"
                hide-details
                @keyup.enter="changeAgree()"
              ></v-checkbox>
            </div>
            <div class="details-link" @click="openAgreeForm()" @keyup.enter="openAgreeForm()" tabindex="0" role="button"> 내용보기 &gt;</div>
          </v-row>
        </div>

        <div class="d-flex flex-wrap justify-center mt-4">
          <v-btn @click="KakaoAuthCheck()" @keyup.enter="KakaoAuthCheck()" class="mb-1" color="black" width="150">본인인증 요청<v-icon aria-hidden="true" class="ml-1">mdi-upload</v-icon></v-btn>
        </div>
      </v-card>
    </v-dialog>

   <!-- 개인정보 동의 다이얼로그 -->
   <v-dialog aria-modal="true" @update:modelValue="DialogClose2" v-model="bAgreeDialog" width="450px">
      <v-card class="pa-4 pl-6 pr-6">
        <div class="d-flex">
            <div class="title-large">개인정보 제3자 제공</div>
            <v-spacer></v-spacer>
            <v-btn variant="plain" class="mt-n3 mr-n3" icon @click="DialogClose2" title="닫기"><v-icon aria-hidden="true">mdi-close</v-icon></v-btn>
        </div>

        <div class="bg-body">
          <p>
            소방재난본부는 개인정보 제3자 제공에 있어 아래 사항을 정보주체에게 안내합니다.
          </p>
          <br>
          <ul class="ml-5">
            <li>
              <strong>개인정보 수집 및 이용목적</strong>
              <ul>
                <li>카카오 인증</li>
              </ul>
            </li>
            <li>
              <strong>제공하는 개인정보 항목</strong>
              <ul>
                <li>[필수] 이름, 생년월일, 휴대폰번호</li>
              </ul>
            </li>
            <li>
              <strong>개인정보 보유 및 이용기간</strong>
              <ul>
                <li>인증 완료 후 즉시 파기</li>
              </ul>
            </li>
          </ul>
          <br>
          <p>
            귀하는 동의를 거부하실 수 있으나, 이 경우 인증을 받으실 수 없습니다.
          </p>
        </div>

        <div class="d-flex flex-wrap justify-center mt-4">
          <v-btn @click="clickAgree()" @keyup.enter="clickAgree()" class="mb-1" color="black" width="150">동의하기<v-icon aria-hidden="true" class="ml-1">mdi-upload</v-icon></v-btn>
        </div>
      </v-card>
    </v-dialog>

    <!-- 인증요청완료 다이얼로그 -->
    <v-dialog aria-modal="true" @update:modelValue="DialogClose3" v-model="bSuccessDialog" width="560px">
      <v-card class="pa-4 pl-6 pr-6">
        <div class="win-box">
          <div class="d-flex title-small font-bold">
            <div>인증 요청이 완료되었습니다.</div>
            <v-spacer></v-spacer>
            <v-btn class="mt-n5 mr-n5" icon="mdi-close" variant="plain" @click="DialogClose3" color="black" title="닫기"></v-btn>
          </div>

          <div class="title-medium font-bold mt-2" >휴대폰에서 카카오 인증을 진행해주세요.</div>
          <div class="mt-3">인증완료 후, 확인 버튼을 클릭해 주세요.</div>

          <div class="mt-3 d-flex">
            <v-spacer></v-spacer>
            <v-btn variant="outlined" color="black" @click="DialogClose3">취소</v-btn>
            <v-btn class="ml-2" color="primary" @click="KakaoAuthCheckStatus()">확인</v-btn>
          </div>
        </div>
      </v-card>
    </v-dialog>

  </div>
</template>


<script>
import axios from "axios";
import { EventBus } from '@/EventBus.js';

export default {
  data() {
    return {
      bDialog: false,
      formData: {
        receiverHP: "",
        receiverName: "",
        receiverBirthday: "",
      },
      receiptId: "", // auth 요청결과 아이디
      isAgree: false, // 정보동의 체크박스 상태
      bAgreeDialog: false, // 개인정보 제3자 제공 다이올로그
      bSuccessDialog: false, // 인증 요청완료 다이올로그
      authState: -1, // 상태 (0: 대기, 1:완료, 2:만료)
      token: "", // auth 토큰
    };
  },

  mounted() {
  },

  watch: {
  },

  beforeDestroy() {
  },

  methods: {
    DialogClose() {
      this.bDialog = false;
      this.$store.state.isDialog = false;
      EventBus.$emit("onBackDialogBtn");
    },
    
    
    ShowDialog() {
      this.InitData();
      this.bDialog = true;
    },
    
    InitData() { 
      this.formData.receiverHP = ""
      this.formData.receiverName = ""
      this.formData.receiverBirthday = ""
      this.receiptId = ""
      this.authState = -1
      this.statusCheckInterval = null
      this.token = ""
    },
    
    DialogClose2() {
      this.bAgreeDialog = false;
      this.$store.state.isDialog = false;
      EventBus.$emit("onBackDialogBtn");
    },

    DialogClose3() {
      this.bSuccessDialog = false;
      this.$store.state.isDialog = false;
      EventBus.$emit("onBackDialogBtn");
    },

    openAgreeForm() {
      this.bAgreeDialog = true;
      this.$store.state.isDialog = true;
      this.$store.state.btnDialogRef = document.activeElement;
    },

    changeAgree() {
      this.isAgree = !this.isAgree;
    }, 

    clickAgree() {
      this.isAgree = true;
      this.DialogClose2(); 
    }, 

    // 카카오 본인 인증
    KakaoAuthCheck() {
      var bExistNoData = false;
      var cTitleMsg = "";
      if (!bExistNoData && this.formData.receiverName == "") {
        bExistNoData = true
        cTitleMsg = "이름을 입력하십시오."
      }
      if (!bExistNoData && this.formData.receiverBirthday == "") {
        bExistNoData = true
        cTitleMsg = "생년월일을 입력하십시오."
      }
      if (!bExistNoData && !this.validateBirthdate(this.formData.receiverBirthday)) {
        bExistNoData = true
        cTitleMsg = "유효하지 않은 생년월일입니다."
      }
      if (!bExistNoData && this.formData.receiverHP == "") {
        bExistNoData = true
        cTitleMsg = "휴대번호를 입력하십시오."
      }
      if (!bExistNoData && !this.validatePhoneNumber(this.formData.receiverHP)) {
        bExistNoData = true
        cTitleMsg = "유효하지 않은 휴대폰 번호입니다."
      }
      if (!bExistNoData && !this.isAgree) {
        bExistNoData = true
        cTitleMsg = "개인정보 제공동의를 클릭하십시오."
      }
      if (bExistNoData) {
        EventBus.$emit("onShowMsg", {
          cSubTitle : "누락된 정보가 있습니다.",
          cTitle : cTitleMsg,
          cMsg : "",
        });
        return
      }

      var posData = {
        receiverName : this.formData.receiverName,
        receiverHP : this.formData.receiverHP,
        receiverBirthday : this.formData.receiverBirthday,
      }
      axios
        .post(import.meta.env.VITE_UIL_API + "KakaoAuthCheck", posData , {
          headers: {
          }
        })
        .then((res) => {
          if (res.data.ResultCd === "00") {
            this.receiptId = res.data.Result[0].receiptId
            this.token = res.data.Result[0].jwt
            console.log(">>>>>>>>>>> receiptId::", this.receiptId);
            console.log(">>>>>>>>>>> token::", this.token);
            this.DialogClose2(); 
            this.bSuccessDialog = true;
            this.$store.state.isDialog = true;
            this.$store.state.btnDialogRef = document.activeElement;
          } else {
            EventBus.$emit("onShowMsg", {
              cSubTitle : "카카오 본인인증에 실패하였습니다.",
              cTitle : "다시 시도해 주세요. 계속 지속될 경우 담당자에게 문의 바랍니다.",
              cMsg : "",
            });
            this.InitData()
          }
        })
        .catch(err =>{
          EventBus.$emit("onShowMsg", {
            cSubTitle : "카카오 본인인증 중에 문제가 발생했습니다.",
            cTitle : "다시 시도해 주세요. 계속 지속될 경우 담당자에게 문의 바랍니다.",
            cMsg : "",
          });
          this.InitData()
        })
        .finally(() =>{
          this.DialogClose();
        })
    },


    // 카카오 본인인증 상태 확인
    KakaoAuthCheckStatus() {
      var posData = {
        receiverName : this.formData.receiverName,
        receiverHP : this.formData.receiverHP,
        receiverBirthday : this.formData.receiverBirthday,
        receiptId : this.receiptId,
        token: this.token,
      }
      console.log(">>>>>>>>>>>", posData);
      axios
        .post(import.meta.env.VITE_UIL_API + "KakaoAuthCheckStatus", posData , {
          headers: {
          }
        })
        .then((res) => {
          if (res.data.ResultCd === "00") {
            this.authState = res.data.Result[0].State
            console.log(">>>>>>>>>>> authState::", this.authState);
            if (this.authState === 1) {
              console.log("인증이 완료되었습니다.", this.formData.receiverName, this.formData.receiverHP, this.formData.receiverBirthday, this.token);
              this.$emit('SuccessKakaoAuth', {
                name: this.formData.receiverName, 
                phone: this.formData.receiverHP, 
                birth: this.formData.receiverBirthday, 
                jwt: this.token
              })
              this.DialogClose3();
              this.InitData()
            } else if (this.authState === 0) {
              console.log("인증이 완료되지 않았습니다.");
              EventBus.$emit("onShowMsg", {
                cSubTitle : "본인인증이 완료되지 않았습니다.",
                cTitle : "휴대폰에서 카카오 본인인증을 먼저 진행해주세요.",
                cMsg : "",
              });
            } else if (this.authState === 2) {
              console.log("인증이 만료되었습니다.");
              EventBus.$emit("onShowMsg", {
                cSubTitle : "본인인증이 요청기한이 만료되었습니다.",
                cTitle : "다시 시도해 주세요.",
                cMsg : "",
              });
              this.DialogClose3();
              this.InitData()
            }
          } else {
            console.error("본인인증 상태 확인 실패:", res.data.ResultCd);
            EventBus.$emit("onShowMsg", {
              cSubTitle : "카카오 본인인증 중에 문제가 발생했습니다.",
              cTitle : "다시 시도해 주세요. 계속 지속될 경우 담당자에게 문의 바랍니다.",
              cMsg : "",
            });
            this.DialogClose3();
            this.InitData()
          } 
        })
        .catch(err =>{
          EventBus.$emit("onShowMsg", {
            cSubTitle : "카카오 본인인증 중에 문제가 발생했습니다.",
            cTitle : "다시 시도해 주세요. 계속 지속될 경우 담당자에게 문의 바랍니다.",
            cMsg : "",
          });
          this.DialogClose3();
          this.InitData()
        })
        .finally(() =>{
        })
    },

    validateBirthdate(birthdate) {
      // 숫자 8자리인지 확인
      const regex = /^\d{8}$/;
      if (!regex.test(birthdate)) {
          return false;
      }

      // 날짜 유효성 확인
      const year = parseInt(birthdate.substring(0, 4), 10);
      const month = parseInt(birthdate.substring(4, 6), 10);
      const day = parseInt(birthdate.substring(6, 8), 10);

      const date = new Date(year, month - 1, day); // 월은 0부터 시작
      return (
          date.getFullYear() === year &&
          date.getMonth() === month - 1 &&
          date.getDate() === day
      );
    },

    validatePhoneNumber(phoneNumber) {
      // 한국 휴대폰 번호 형식 확인
      const regex = /^01[0|1|6|7|8|9]-?\d{3,4}-?\d{4}$/;
      return regex.test(phoneNumber);
    }

  },
};
</script>

<style scoped>
.details-link {
  position: relative; /* 위치를 상대적으로 조정 */
  left: 40px; /* 오른쪽으로 20px 이동 */
  top: -10px;
  color: #007bff; /* 링크 색상 */
  text-decoration: none;
  font-size: 14px; /* 링크 글자 크기도 동일하게 줄임 */
}

.details-link:hover {
  cursor: pointer; 
  text-decoration: underline;
}
</style>

<template>
  <div style="display: flex; justify-content: center;">
    <div style="max-width: 1000px; width: 100%;">
      <div v-if="b14Age" class="font-weight-bold mb-10" align="center">
        <div class="mr-2 title-xlarge">Are you 14 years old or older?</div>
        <v-radio-group v-model="b14AgeUp" inline @change="InitData()" class="d-flex justify-center">
          <v-radio label="Yes, I am 14 years old or older." aria-label="Yes, I am 14 years old or older." :value="true"></v-radio>
          <div style="width: 50px;" class="ml-8 hidden-sm-and-down"></div>
          <v-radio label="No, I am under 14 years old." aria-label="No, I am under 14 years old." :value="false"></v-radio>
        </v-radio-group>
      </div>

      <div v-show="b14AgeUp" class="mb-8">
        <h2 class="title-xlarge">Consent Form for Personal Information Collection and Use for Boramae Safety Experience Center Reservation</h2>
        <div>We collect and use personal information as follows for Boramae Safety Experience Center reservations.</div>
        <div>Please read the details carefully and decide whether to consent.</div>
        <div class="bg-gap"></div>

        <h2 class="title-large">Personal Information Collection and Use <span style="color:blue; font-weight:900;">(Required)</span></h2>

        <table class="nor_table mb-2">
          <caption class="sr-only">Personal Information Collection and Use Table</caption>
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Purpose of Collection and Use</th>
              <th scope="col">Retention and Use Period</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="width: 50%; text-align: center;">Name (Required), Mobile Phone Number (Required), Address (Required), Group reservation: General phone number (required)</td>
              <td style="text-align: center;">Reservation confirmation</td>
              <td style="text-align: center;" class="font-bold">3 years after experience completion</td>
            </tr>
            <tr>
              <td style="width: 50%; text-align: center;" >Name (Required), Date of Birth (Required)</td>
              <td style="text-align: center;">Certificate Issuance</td>
              <td style="text-align: center;" class="font-bold">3 years after experience completion</td>
            </tr>
          </tbody>
        </table>

        ※ You have the right to refuse consent for the collection and use of the above personal information.<br>
        However, if you refuse to give consent, you may face restrictions on the experience as the reservation cannot be smoothly processed in accordance with Article 5 of the Fire Institution Safety Experience Education Safety Management Regulations.<br><br><br>

        <div class="d-flex font-weight-bold">
          <div class="mr-2" aria-hidden="true">Do you consent to the collection and use of personal information as stated above?</div>
          <v-spacer></v-spacer>
          Consent
          <v-checkbox v-model="bAgree1" class="mt-n4" title="Do you consent to the collection and use of personal information as stated above?"></v-checkbox>
        </div>

        <h2 class="title-large">Personal Information Collection and Use <span style="color:blue; font-weight:900;">(Optional)</span></h2>

        <table class="nor_table mb-2">
          <caption class="sr-only">Optional Personal Information Collection and Use Table</caption>
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Purpose of Collection and Use</th>
              <th scope="col">Retention and Use Period</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="width: 50%; text-align: center;">Personal reservation: General phone number (optional)</td>
              <td style="text-align: center;">Reservation confirmation</td>
              <td style="text-align: center;" class="font-bold">3 years after experience completion</td>
            </tr>
          </tbody>
        </table>

        ※ You have the right to refuse consent for the collection and use of the above personal information.<br>
        Even if you refuse to give consent, you can proceed with the experience reservation without restrictions, but there may be limitations in service provision.<br><br><br>

        <div class="d-flex font-weight-bold">
          <div class="mr-2" aria-hidden="true">Do you consent to the collection and use of personal information as stated above?</div>
          <v-spacer></v-spacer>
          Consent
          <v-checkbox v-model="bAgree3" class="mt-n4" title="Do you consent to the collection and use of personal information as stated above?"></v-checkbox>
        </div>

        <h2 class="title-large">Sensitive Information Collection and Use <span style="color:blue; font-weight:900;">(Optional)</span></h2>

        <table class="nor_table mb-2">
          <caption class="sr-only">Sensitive Information Collection and Use Table</caption>
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Purpose of Collection and Use</th>
              <th scope="col">Retention and Use Period</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="width: 50%; text-align: center;" class="font-bold">Type of Disability (Visual, Hearing, Mental, etc.), Wheelchair Usage</td>
              <td style="text-align: center;">Customized Support for Experience Center Use</td>
              <td style="text-align: center;" class="font-bold">3 years after experience completion</td>
            </tr>
          </tbody>
        </table>

        ※ You have the right to refuse consent for the collection and use of the above personal information.<br>
        Even if you refuse to give consent, you can proceed with the experience reservation without restrictions, but there may be limitations in service provision.<br><br><br>

        <div class="d-flex font-weight-bold">
          <div class="mr-2" aria-hidden="true">Do you consent to the collection and use of personal information as stated above?</div>
          <v-spacer></v-spacer>
          Consent
          <v-checkbox v-model="bAgree2" class="mt-n4" title="Do you consent to the collection and use of personal information as stated above?"></v-checkbox>
        </div>

        <div class="d-flex center_all font-weight-bold">
          <v-checkbox v-model="bAgreeAll" class="mt-5" title="I have read and agree to all of the above."></v-checkbox>
          <div class="ml-3" aria-hidden="true">I have read and agree to all of the above.</div>
        </div>
      </div>

      <div v-show="!b14AgeUp" class="mb-8">
        If personal information is collected and used for applicants under the age of 14,  
        the consent of a legal guardian is required.  
        Please download the form below, have your legal guardian sign it, and upload it.
        <div class="d-flex mt-8">
          <v-btn @click="DownloadAgreeDoc()" >Download Legal Guardian Consent Form</v-btn>
          <v-spacer></v-spacer>
          <input id="fileUpload" type="file" ref="fileInput" style="display: none;" @change="onFileSelected">          
          <div>
            <v-btn @click="GetFile()" class="mr-2 mb-1" style="min-width: 100px;">Upload Legal Guardian Consent Form</v-btn>
            <div v-if="NowSelFile" class="links-small mt-1" style="color:#717171; background-color: #f0f0f0; padding: 2px 8px 2px 10px; border-radius: 5px">
              Uploaded({{ NowSelFile.name  }})
            </div>
          </div>
        </div>
      </div>

      <div class="d-none d-sm-flex center_all">
        <v-btn @click="NiceAuthCheck()" size="x-large" title="Opens in a new window">Mobile Phone Verification</v-btn>
        <v-btn @click="KakaoAuthCheck()" class="ml-3" size="x-large" title="Opens in a new window">Kakao Verification</v-btn>
      </div>
    </div>

    <AuthPageForKakao ref="AuthPageForKakao_ref" @SuccessKakaoAuth="SuccessKakaoAuth"/>
  </div>
</template>

<script>
import axios from "axios";
import { EventBus } from '@/EventBus.js';
import * as Util from "@/Util.js";
import AuthPageForKakao from "./AuthPageForKakao.vue"

export default {
  props: ['b14Age'],
  data() {
    return {
      reqNo: "",
      cRequestName : "홍길동",
      cRequestMobile : "01000000000",
      cRequestBirth : "19980101",
      cToken : "",

      bAgree1: false,
      bAgree2: false,
      bAgree3: false,
      bAgreeAll: false,
      b14AgeUp: true,

      NowSelFile: null,
    };
  },

  components:{
    AuthPageForKakao,
  },

  mounted() {
    // auth 결과 message 이벤트 리스너 등록
    window.addEventListener('message', this.callbackResultFromNice);
  },

  beforeUnmount() {
    // auth 결과 message 이벤트 리스너 제거
    window.removeEventListener('message', this.callbackResultFromNice);
  },

  watch: {
    bAgreeAll(newValue) {
      this.bAgree1 = newValue;
      this.bAgree2 = newValue;
      this.bAgree3 = newValue;
    },
  },

  methods : {
    InitData() {
      this.bAgree1 = false;
      this.bAgree2 = false;
      this.bAgree3 = false;
      this.bAgreeAll = false;
      this.NowSelFile = null;
    },

    DownloadAgreeDoc() {
      axios({
        url: import.meta.env.VITE_SYSTEM_FILE_API + "체험관예약_법정대리인_동의서.docx",
        method: 'GET',
        responseType: 'blob',
        })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', "체험관예약_법정대리인_동의서.docx");
          document.body.appendChild(link);
          link.click();
        });
    },

    GetFile() {
      this.$refs.fileInput.click();
    },

    onFileSelected(event) {
      this.NowSelFile = event.target.files[0]
    },

    // 휴대전화 PASS 인증 열기
    NiceAuthCheck() {
      if (import.meta.env.VITE_USE_AUTH_CHECK == "false") {
        this.$emit("onSuccessAuth", this.NowSelFile, {
          cRequestName : this.cRequestName,
          cRequestMobile : this.cRequestMobile,
          cRequestBirth : this.cRequestBirth,
          bSelectedAgree1 : this.bAgree1,
          bSelectedAgree2 : this.bAgree2,
          bSelectedAgree3 : this.bAgree3,
          jwt: this.cToken,
        })
        return
      }

      // 14세 이상이고 미동의시
      if (this.b14AgeUp && (!this.bAgree1)) {
        EventBus.$emit("onShowMsg", {cSubTitle: "예약신청을 위해 개인정보 처리 방침에 대한 동의가 필요합니다.", cTitle:"동의하기 버튼을 눌러 주세요.", cMsg : ""});
        return
      }
      // 14세 미만이고 동의서 첨부 안되었을시 
      if (!this.b14AgeUp && !this.NowSelFile) {
        EventBus.$emit("onShowMsg", {cSubTitle: "14세 미만일 경우 법정 대리인 동의서가 필요합니다.", cTitle:"동의서를 첨부하여 주세요.", cMsg : ""});
        return
      }

      var posData = {
      }
      axios
      .post(import.meta.env.VITE_UIL_API + "NiceAuthCheck", posData , {
        headers: {
        }
      })
      .then(async (res) => {
        // console.log(">>>>>>>>>>> res::", res.data);
        // console.log(">>>>>>>>>>> formHtml::", res.data.formHtml);
        // console.log(">>>>>>>>>>> EncodeData::", res.data.EncodeData);
        // console.log(">>>>>>>>>>> reqNo::", res.data.reqNo);
        this.reqNo = res.data.reqNo; // Extract reqNo
        // console.log(">>>>>>>>>>> this.reqNo::", this.reqNo);
        // Open a new popup window
        const popup = window.open('', 'popupChk', 'width=500, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no');

        if (!popup) {
          throw new Error('Popup blocked by the browser');
        }

        // Write the form HTML into the popup window
        popup.document.open();
        popup.document.write(res.data.formHtml);
        popup.document.close();
      })
      .catch(err =>{
        console.log(`Catch Error : ${err}`);
      })
      .finally(() =>{
      })
    },

    // 나이스 인증 콜백 결과
    callbackResultFromNice(event) {
      // console.log(">>>>>>>>>>> callbackResultFromNice :: ", event.data);
      // console.log(">>>>>>>>>>> callbackResultFromNice, this.reqNo:: ", this.reqNo);
      if (!this.reqNo || !event.data.reqNo) {
        return
      }
      if (this.reqNo != event.data.reqNo) {
        // console.log("reqNo is invalid:", this.reqNo, event.data.reqNo);
        EventBus.$emit("onShowMsg", {
          cSubTitle : "인증이 취소되었습니다.",
          cTitle : "다시 시도해주세요.\n 계속 지속될 경우 담당자에게 문의 바랍니다.",
          cMsg : `Error : 유효하지 않은 요청아이디`,
        });
        this.reqNo = ""
        return
      }
      if (event.data.resultCd != "00") {
        // console.log("resultCd is not 00:", event.data.resultCd);
        EventBus.$emit("onShowMsg", {
          cSubTitle : "인증이 취소되었습니다.",
          cTitle : "다시 시도해주세요.\n 계속 지속될 경우 담당자에게 문의 바랍니다.",
          cMsg : `Error : 인증실패`,
        });
        this.reqNo = ""
        return
      }
      if (event.data.name == "" && event.data.phone == "" && event.data.birth == "") {
        // console.log("auth result is empty:", event.data.name, event.data.phone, event.data.birth);
        EventBus.$emit("onShowMsg", {
          cSubTitle : "인증이 취소되었습니다.",
          cTitle : "다시 시도해주세요.\n 계속 지속될 경우 담당자에게 문의 바랍니다.",
          cMsg : `Error : 유효하지 않은 인증결과`,
        });
        this.reqNo = ""
        return
      }
      this.reqNo = ""
      // console.log(">>>>>>>>", event.data.name, event.data.phone, event.data.birth)
      this.checkAuthResult(event.data.name, event.data.phone, event.data.birth, event.data.jwt)
    },

    // KAKAO 본인 인증
    KakaoAuthCheck() {
      if (import.meta.env.VITE_USE_AUTH_CHECK == "false") {
        this.$emit("onSuccessAuth", this.NowSelFile, {
          cRequestName : this.cRequestName,
          cRequestMobile : this.cRequestMobile,
          cRequestBirth : this.cRequestBirth,
          bSelectedAgree1 : this.bAgree1,
          bSelectedAgree2 : this.bAgree2,
          bSelectedAgree3 : this.bAgree3,
          jwt: this.cToken,
        })
        return
      }

      // 14세 이상이고 미동의시
      if (this.b14AgeUp && (!this.bAgree1)) {
        EventBus.$emit("onShowMsg", {cSubTitle: "예약신청을 위해 개인정보 처리 방침에 대한 동의가 필요합니다.", cTitle:"동의하기 버튼을 눌러 주세요.", cMsg : ""});
        return
      }
      // 14세 미만이고 동의서 첨부 안되었을시 
      if (!this.b14AgeUp && !this.NowSelFile) {
        EventBus.$emit("onShowMsg", {cSubTitle: "14세 미만일 경우 법정 대리인 동의서가 필요합니다.", cTitle:"동의서를 첨부하여 주세요.", cMsg : ""});
        return
      }

      this.$refs.AuthPageForKakao_ref.ShowDialog()
    },

    SuccessKakaoAuth(data) {
      console.log("<<<<<<<<", data);
      this.checkAuthResult(data.name, data.phone, data.birth, data.jwt)
    },
    checkAuthResult(receiverName, receiverHP, receiverBirthday, jwt){
      // console.log("checkAuthResult", receiverName, receiverHP, receiverBirthday, this.NowSelFile);
      let name = receiverName
      let phone = receiverHP
      let birth = receiverBirthday
      // let name = "홍길동"
      // let phone = "0005557777"
      // let birth = "19900810"

      this.$emit("onSuccessAuth", this.NowSelFile, {
        cRequestName : name,
        cRequestMobile : phone,
        cRequestBirth : birth,
        bSelectedAgree1 : this.bAgree1,
        bSelectedAgree2 : this.bAgree2,
        bSelectedAgree3 : this.bAgree3,
        jwt: jwt,
      })
    }

  },
};
</script>
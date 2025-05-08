<template>
  <div style="display: flex; justify-content: center;">
    <div style="max-width: 1000px; width: 100%;">
      <div v-if="b14Age" class="font-weight-bold mb-10" align="center">
        <div class="mr-2 title-xlarge">신청자 본인의 나이가 만14세 이상이신가요?</div>
        <v-radio-group v-model="b14AgeUp" inline @change="InitData()" class="d-flex justify-center">
          <v-radio label="네. 만14세 이상입니다." aria-label="네. 만14세 이상입니다." :value="true"></v-radio>
          <div style="width: 50px;" class="ml-8 hidden-sm-and-down"></div>
          <v-radio label="아닙니다. 저는 만14세 미만입니다." aria-label="아닙니다. 저는 만14세 미만입니다." :value="false"></v-radio>
        </v-radio-group>
        
      </div>

      <div v-show="b14AgeUp" class="mb-8">
        <h2 class="title-xlarge">보라매 안전체험관 예약을 위한 개인정보 수집‧이용 동의서 </h2>
        <div>보라매 안전체험관 예약을 위해 아래와 같이 개인정보를 수집‧이용하고자 합니다.</div>
        <div>내용을 자세히 읽으신 후 동의여부를 결정하여 주세요.</div>
        <div class="bg-gap"></div>

        <h2 class="title-large">개인정보 수집‧이용 내역 <span style="color:blue; font-weight:900;">(필수사항)</span></h2>

        <table class="nor_table mb-2">
          <caption class="sr-only">개인정보 수집‧이용 내역 테이블(필수사항)</caption>
          <thead>
            <tr>
              <th scope="col">항목</th>
              <th scope="col">수집‧이용 목적</th>
              <th scope="col">보유‧이용기간</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="width: 50%; text-align: center;">이름(필수), 휴대 전화번호(필수), 주소(필수), 단체 예약 시 일반전화(필수)</td>
              <td style="text-align: center;">예약확인</td>
              <td style="text-align: center;" class="font-bold">체험 완료 후 3년</td>
            </tr>
            <tr>
              <td style="width: 50%; text-align: center;">이름(필수), 생년월일(필수)</td>
              <td style="text-align: center;">이수증 발급</td>
              <td style="text-align: center;" class="font-bold">체험 완료 후 3년</td>
            </tr>
          </tbody>
        </table>

        ※ 위의 개인정보 수집‧이용에 대한 동의를 거부할 권리가 있습니다.<br>
        그러나 동의를 거부할 경우 원활한 체험예약을 진행할 수 없어 체험에 제한을 받을 수 있습니다.<br><br><br>

        <div class="d-flex font-weight-bold">
          <div class="mr-2" aria-hidden="true">위와 같이 개인정보를 수집‧이용하는데 동의하십니까?</div>
          <v-spacer></v-spacer>
          동의
          <v-checkbox v-model="bAgree1" class="mt-n4" title="위와 같이 개인정보를 수집‧이용하는데 동의하십니까?"></v-checkbox>
        </div>

        <h2 class="title-large">개인정보 수집‧이용 내역 <span style="color:blue; font-weight:900;">(선택사항, 동의거부가능)</span></h2>

        <table class="nor_table mb-2">
          <caption class="sr-only">개인정보 수집‧이용 내역 테이블(선택사항, 동의거부가능)</caption>
          <thead>
            <tr>
              <th scope="col">항목</th>
              <th scope="col">수집‧이용 목적</th>
              <th scope="col">보유‧이용기간</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="width: 50%; text-align: center;">개인 예약 시 일반 전화번호(선택)</td>
              <td style="text-align: center;">예약확인</td>
              <td style="text-align: center;" class="font-bold">체험 완료 후 3년</td>
            </tr>
          </tbody>
        </table>

        ※ 위의 개인정보 수집‧이용에 대한 동의를 거부할 권리가 있습니다.<br>
        동의를 거부하더라도 체험예약을 진행하는데 제한을 받지 않지만 서비스 제공에 제한을 받을 수 있습니다.<br><br><br>

        <div class="d-flex font-weight-bold">
          <div class="mr-2" aria-hidden="true">위와 같이 개인정보를 수집‧이용하는데 동의하십니까?</div>
          <v-spacer></v-spacer>
          동의
          <v-checkbox v-model="bAgree2" class="mt-n4" title="위와 같이 개인정보를 수집‧이용하는데 동의하십니까?"></v-checkbox>
        </div>

        <h2 class="title-large">민감정보 수집‧이용 내역 <span style="color:blue; font-weight:900;">(선택사항, 동의거부가능)</span></h2>

        <table class="nor_table mb-2">
          <caption class="sr-only">민감정보 수집‧이용 내역 테이블</caption>
          <thead>
            <tr>
              <th scope="col">항목</th>
              <th scope="col">수집‧이용 목적</th>
              <th scope="col">보유‧이용기간</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="width: 50%; text-align: center;" class="font-bold">장애의 종류(시각장애, 청각장애, 정신적 장애 등), 휠체어 사용 여부</td>
              <td style="text-align: center;">원활한 체험관 이용을 위한 맞춤형 지원</td>
              <td style="text-align: center;" class="font-bold">체험 완료 후 3년</td>
            </tr>
          </tbody>
        </table>

        ※ 위의 개인정보 수집‧이용에 대한 동의를 거부할 권리가 있습니다.<br>
        동의를 거부하더라도 체험예약을 진행하는데 제한을 받지 않지만 서비스 제공에 제한을 받을 수 있습니다.<br><br><br>

        <div class="d-flex font-weight-bold">
          <div class="mr-2" aria-hidden="true">위와 같이 개인정보를 수집‧이용하는데 동의하십니까?</div>
          <v-spacer></v-spacer>
          동의
          <v-checkbox v-model="bAgree3" class="mt-n4" title="위와 같이 개인정보를 수집‧이용하는데 동의하십니까?"></v-checkbox>
        </div>

        <div class="d-flex center_all font-weight-bold">
          <v-checkbox v-model="bAgreeAll" class="mt-5" title="상기 사항을 모두 숙지하였고, 이에 동의합니다."></v-checkbox>
          <div class="ml-3" aria-hidden="true">상기 사항을 모두 숙지하였고, 이에 동의합니다.</div>
        </div>

      </div>

      <div v-show="!b14AgeUp" class="mb-8">
        만 14세 미만 신청자의 개인정보를 수집이용할 경우 법정대리인 동의가 반드시 필요합니다.<br>
        아래 양식을 다운로드 받아서 법정대리인의 동의서를 작성하시고 업로드 해주세요.
        <div class="d-flex mt-8">
          <v-btn @click="DownloadAgreeDoc()">법정대리인 동의서 다운로드</v-btn>
          <v-spacer></v-spacer>
          
          <label for="fileUpload" class="custom-file-label" style="display: none;">파일 첨부</label>
          <input id="fileUpload" label="파일첨부" type="file" ref="fileInput" style="display: none;" @change="onFileSelected">
          <input label="파일첨부" type="file" ref="fileInput" style="display: none;" @change="onFileSelected">
          
          <div>
            <v-btn @click="GetFile()" class="mr-2 mb-1" style="min-width: 100px;">법정대리인 동의서 업로드</v-btn>
            <div v-if="NowSelFile" class="links-small mt-1" style="color:#717171; background-color: #f0f0f0; padding: 2px 8px 2px 10px; border-radius: 5px">
              업로드됨({{ NowSelFile.name  }})
            </div>
          </div>
        </div>
      </div>
      
      <div class="d-sm-none">
        <v-row>
          <v-col cols="12"><v-btn @click="NiceAuthCheck()" width="100%" size="x-large" title="새창열림">휴대전화 인증</v-btn></v-col>
          <v-col cols="12"><v-btn @click="KakaoAuthCheck()" width="100%" size="x-large" title="새창열림">카카오 인증</v-btn></v-col>
        </v-row>
      </div>
      <div class="d-none d-sm-flex center_all">
        <v-btn @click="NiceAuthCheck()" size="x-large" title="새창열림">휴대전화 인증</v-btn>
        <v-btn @click="KakaoAuthCheck()" class="ml-3" size="x-large" title="새창열림">카카오 인증</v-btn>
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
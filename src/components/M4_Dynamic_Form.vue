<template>
  <div>
    <h1 v-if="bShowFormTitle" class="title-xxlarge">{{ FORM_NM }}</h1>      
    
    <div class="mt-2 pa-3">            
      <v-row>
        <v-col>                                 
          <M4_Input           
            v-model="cNowSearchKeyWord"
            @keyup.enter="GetDynamicFormData"
            @click:append-inner="GetDynamicFormData"            
            :label="$t('common_search')"
            :placeholder="$t('req_form_placeholder')"
            density="compact"            
            variant="outlined"            
            color="primary"         
            icon="mdi-magnify"   
            persistent-placeholder>            
          </M4_Input>
        </v-col>
      </v-row>      

      <v-data-table
        :headers="headers"
        :items="zData"
        @click:row="handleRowClick"
        item-key="PST_ID"
        aria-labelledby="table-caption">        
        <template v-slot:default="props">
          <table class="nor_table_center">
            <caption id="table-caption" class="sr-only">{{ FORM_NM }} 서식 테이블</caption>
            <thead>
              <tr>
                <th scope="col" v-for="header in props.headers[0]" :key="header.value">
                  {{ header.title}}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in props.items" :key="item.id" @click="handleRowClick(null, {item})">
                <td>
                  <div align="center">
                    <div v-if="item.bNotice" style="border-radius : 5px; background-color: rgb(76,175,80); color: white; width: 45px;">공지</div>
                    <div v-else>{{ item.iIndex }}</div>
                  </div>              
                </td>
                <td tabindex="0" @keydown.enter="handleRowClick(null, {item})" style="cursor: pointer;" :title="item.FORM_NM + ' 열기'">{{ item.FORM_NM }}</td>
                <td>{{ item.FORM_INPT_DATA1 }}</td>
                <td>
                  <div v-if="item.is_file" @click="ClickIconDirect($event, item)" @keyup.enter="ClickIconDirect($event, item)"><v-icon aria-hidden="true" >mdi-file</v-icon></div>
                </td>
              </tr>
            </tbody>
          </table>
        </template>         
      </v-data-table>
      <!-- <v-data-table
        :headers="headers"
        :items="zData"
        @click:row="handleRowClick"
        item-key="PST_ID"
        aria-labelledby="table-caption"
      >
        <template v-slot:top>
          <caption id="table-caption" class="sr-only">{{ FORM_NM }} 서식 테이블</caption>
        </template>
        <template v-slot:item.iIndex ="{ item, value }">
          
        </template>
        <template v-slot:item.PST_TTL="{ item, value }">
          <div class="d-flex line_clamp_1" tabindex="0" :style="'margin-left : ' + item.PST_DEPTH * 20 + 'px'">
            <v-icon v-if="item.PST_ID != item.UP_PST_ID" style="margin-top: 1px;" size="15">mdi-arrow-right-bottom-bold</v-icon>
            <div ><v-icon v-if="item.PRVT_YN == 'Y'">mdi-lock</v-icon> {{ value }}</div>
          </div>
        </template>
        <template v-slot:item.is_file="{ item, value }">
          <div v-if="value" @click="ClickIconDirect($event, item)" @keyup.enter="ClickIconDirect($event, item)"><v-icon >mdi-file</v-icon></div>
        </template>
      </v-data-table> -->
    </div>
    
    <v-dialog v-model="isShow" width="60%" aria-modal="true" @update:modelValue="DialogClose">
      <v-card class="pa-5">
        <div class="d-flex">
          <h2 class="mb-2">{{ oDetailItem.FORM_NM }}</h2>
          <v-spacer></v-spacer>
          <v-btn variant="plain" class="mt-n1 mr-n3" icon @click="DialogClose" aria-label="닫기"><v-icon aria-hidden="true">mdi-close</v-icon></v-btn>
        </div>
        
        <table class="nor_table">
          <caption class="sr-only">{{ oDetailItem.FORM_NM }}</caption>
          <thead>
            <tr>
              <th scope="col" rowspan="2">{{ $t("req_form_dialog_header_1") }}</th>
              <th scope="col" rowspan="2" colspan="3">{{ oDetailItem.FORM_NM }}</th>
              <th scope="col" rowspan="2">{{ $t("req_form_dialog_header_2") }}</th>
              <th scope="col" >{{ $t("req_form_table_header_2") }}</th>
              <th scope="col" >{{ $t("req_form_dialog_header_3") }}</th>
            </tr>
            <tr>
              <td align="center">{{ oDetailItem.FORM_INPT_DATA1 }}</td>
              <td align="center">{{ oDetailItem.FORM_INPT_DATA2 }}</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">{{ $t("req_form_dialog_header_4") }}</th>
              <td colspan="6">
                <div v-html="oDetailItem.FORM_INPT_DATA3"></div>
              </td>
            </tr>
            <tr>
              <th scope="row" rowspan="7">{{ $t("req_form_dialog_header_5") }}</th>
              <th scope="row">{{ $t("req_form_dialog_header_6") }}</th>
              <td>{{ oDetailItem.FORM_INPT_DATA4 }}</td>
              <th scope="row">{{ $t("req_form_dialog_header_7") }}</th>
              <td>{{ oDetailItem.FORM_INPT_DATA5 }}</td>
              <th scope="row">{{ $t("req_form_dialog_header_8") }}</th>
              <td>{{ oDetailItem.FORM_INPT_DATA6 }}</td>
            </tr>
            <tr>
              <th scope="row">{{ $t("req_form_dialog_header_9") }}</th>
              <td>{{ oDetailItem.FORM_INPT_DATA7 }}</td>
              <th scope="row">{{ $t("req_form_dialog_header_10") }}</th>
              <td>{{ oDetailItem.FORM_INPT_DATA8 }}</td>
              <th scope="row">{{ $t("req_form_dialog_header_11") }}</th>
              <td>{{ oDetailItem.FORM_INPT_DATA9 }}</td>
            </tr>
            <tr>
              <th scope="row">{{ $t("req_form_dialog_header_12") }}</th>
              <td>{{ oDetailItem.FORM_INPT_DATA10 }}</td>
              <th scope="row">{{ $t("req_form_dialog_header_13") }}</th>
              <td>{{ oDetailItem.FORM_INPT_DATA11 }}</td>
              <th scope="row">{{ $t("req_form_dialog_header_14") }}</th>
              <td>{{ oDetailItem.FORM_INPT_DATA12 }}</td>
            </tr>
            <tr>
              <th>{{ $t("req_form_dialog_header_15") }}</th>
              <td colspan="5">{{ oDetailItem.FORM_INPT_DATA13 }}</td>
            </tr>
            <tr>
              <td>{{ $t("req_form_dialog_header_16") }}</td>
              <td colspan="5">{{ oDetailItem.FORM_INPT_DATA14 }}</td>
            </tr>
            <tr>
              <td>{{ $t("req_form_dialog_header_17") }}</td>
              <td colspan="5">{{ oDetailItem.FORM_INPT_DATA15 }}</td>
            </tr>
            <tr>
              <td>{{ $t("req_form_dialog_header_18") }}</td>
              <td colspan="5">{{ oDetailItem.FORM_INPT_DATA16 }}</td>
            </tr>
            <tr>
              <th scope="row">{{ $t("req_form_dialog_header_19") }}</th>
              <td colspan="6">
                <div v-html="oDetailItem.FORM_INPT_DATA17"></div>
              </td>
            </tr>
            <tr>
              <th scope="row">{{ $t("req_form_dialog_header_20") }}</th>
              <td colspan="6">
                <div v-html="oDetailItem.FORM_INPT_DATA18"></div>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="mt-4 mb-0 d-flex">
          <v-btn color="primary" v-if="bShowDownLoadIcon" @click="DownloadFile(oDetailItem)" @keyup.enter="DownloadFile(oDetailItem)" aria-label="첨부파일 다운로드"><v-icon aria-hidden="true" style="margin-right: 6px;">mdi-file</v-icon>{{ $t("all_btn_download") }}</v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="DialogClose" @keyup.enter="DialogClose" variant="outlined" color="black" aria-label="닫기"><v-icon aria-hidden="true" style="margin-right: 6px;">mdi-close</v-icon>{{ $t("all_btn_close") }}</v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { EventBus } from '@/EventBus.js';

export default {
  props : ["bShowFormTitle"],
  data() {
    return {
      MENU_ID : "",
      FORM_NM : "",
      FORM_TYPE : "",
      cNowSearchKeyWord : "",
      headers: [
        { title: this.$t("all_table_header_1"), key: 'iIndex', sortable: false, align: 'center'},
        { title: this.$t("req_form_table_header_1"), key: 'FORM_NM'},
        { title: this.$t("req_form_table_header_2"), key: 'FORM_INPT_DATA1'},
        { title: this.$t("all_table_header_2"), key: 'is_file', sortable: false, align: 'center'},
      ],
      zData: [],

      SHOW_FORM_ID : "",
      isShow : false,
      iStartReadIndex : 0,
      iEndReadIndex : 4,
      oDetailItem : {
        FORM_INPT_DATA1 : "",
        FORM_INPT_DATA2 : "",
        FORM_INPT_DATA3 : "",
        FORM_INPT_DATA4 : "",
        FORM_INPT_DATA5 : "",
        FORM_INPT_DATA6 : "",
        FORM_INPT_DATA7 : "",
        FORM_INPT_DATA8 : "",
        FORM_INPT_DATA9 : "",
        FORM_INPT_DATA10 : "",
        FORM_INPT_DATA11 : "",
        FORM_INPT_DATA12 : "",
        FORM_INPT_DATA13 : "",
        FORM_INPT_DATA14 : "",
        FORM_INPT_DATA15 : "",
        FORM_INPT_DATA16 : "",
        FORM_INPT_DATA17 : "",
        FORM_INPT_DATA18 : "",
        FORM_NM : "",
        FILE_ID : "NONE",
        FILE_NM : "",
        FILE_PATH : "",
      },
      oDefaultDetailItem : {
        FORM_INPT_DATA1 : "",
        FORM_INPT_DATA2 : "",
        FORM_INPT_DATA3 : "",
        FORM_INPT_DATA4 : "",
        FORM_INPT_DATA5 : "",
        FORM_INPT_DATA6 : "",
        FORM_INPT_DATA7 : "",
        FORM_INPT_DATA8 : "",
        FORM_INPT_DATA9 : "",
        FORM_INPT_DATA10 : "",
        FORM_INPT_DATA11 : "",
        FORM_INPT_DATA12 : "",
        FORM_INPT_DATA13 : "",
        FORM_INPT_DATA14 : "",
        FORM_INPT_DATA15 : "",
        FORM_INPT_DATA16 : "",
        FORM_INPT_DATA17 : "",
        FORM_INPT_DATA18 : "",
        FORM_NM : "",
        FILE_ID: "NONE",
        FILE_NM: "NONE.png",
        FILE_PATH: "Files/None.png",
      },
    }
  },

  computed: {
    bShowDownLoadIcon() {
      // return this.oDetailItem.FILE_ID != "NONE" && this.oDetailItem.FILE_ID != ""
      return this.oDetailItem.FILE_ID != "NONE"
    }
  },

  mounted() {
    this.SHOW_FORM_ID = this.$route.query.id ? this.$route.query.id : ""
  },

  methods: {
    DialogClose() {
      this.isShow = false;      
      this.$store.state.isDialog = false;
      EventBus.$emit("onBackDialogBtn");       
    },

    // GetDynamicFormInfo(MENU_ID, FORM_TYPE) {
    GetDynamicFormInfo(MENU_ID, FORM_TYPE, FORM_NM) {
      this.MENU_ID = MENU_ID
      this.FORM_TYPE = FORM_TYPE
      this.FORM_NM = FORM_NM

      this.GetDynamicFormData()
    },

    GetDynamicFormData() {
      this.zData = []

      var posData = {
        FORM_TYPE : this.FORM_TYPE,
        NowSearchKeyWord : this.cNowSearchKeyWord,
        StartReadIndex : this.iStartReadIndex,
        EndReadIndex : this.iEndReadIndex,
      }

      axios
        .post(import.meta.env.VITE_UIL_API + "GetDynamicFormData", posData , {
          headers: {
          }
        })
        .then(res => {
          if (res.data.ResultCd === "00") {
            let iLen = res.data.Result.length

            this.zData = res.data.Result.map((item, index) => {
              item.is_file = item.FILE_ID != 'NONE'
              item.iIndex = iLen - index
              return item
            })

            // 특정 게시판 글을 요구할 경우 (통합검색에서 특정 서식 클릭시)
            if (this.SHOW_FORM_ID != "") {
              let item = this.zData.find((item) => {
                return item.FORM_ID == this.SHOW_FORM_ID
              })
              console.log(this.zData, item);
              this.handleRowClick(null, {item})
            }

          } else {
            EventBus.$emit("onShowMsg", {
              cSubTitle: "정보 조회에 실패했습니다.",
              cTitle:"문제가 계속 되면 관리자에게 문의 바랍니다.",
              cMsg: `(${res.data.ResultCd}) ${res.data.Msg}`
            });
          }
        })
        .catch(err =>{
          // EventBus.$emit("onShowMsg", {
          //   cSubTitle: "정보 조회 중 문제가 발생했습니다.",
          //   cTitle:"문제가 계속 되면 관리자에게 문의 바랍니다.",
          //   cMsg: `Error : ${err}`
          // });
        })
        .finally(() =>{
        })
    },

    handleRowClick(event, {item}) {
      this.GetDynamicFormItemData(item.FORM_ID)
    },

    // 상세정보 가져오기
    GetDynamicFormItemData(FORM_ID) {
      var posData = {
        FORM_ID : FORM_ID,
        FORM_TYPE : this.FORM_TYPE,
      };
      axios
        .post(import.meta.env.VITE_UIL_API + "GetDynamicFormItemData", posData , {
          headers: {
          }
        })
        .then(res => {
          if (res.data.ResultCd === "00") {
            this.oDetailItem = {...res.data.Result[0]}
            this.$store.state.isDialog = true;
            this.$store.state.btnDialogRef = document.activeElement;
            this.isShow = true;    
          }
        })
    },

    ClickIconDirect(event, item) {
      event.stopPropagation()
      this.DownloadFile(item)
    },

    DownloadFile(item) {
      axios({
        url: import.meta.env.VITE_FILE_API + item.FILE_PATH,
        method: 'GET',
        responseType: 'blob',
        })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', item.FILE_NM);
          document.body.appendChild(link);
          link.click();
        });
    },

    onInput(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  }
}
</script>

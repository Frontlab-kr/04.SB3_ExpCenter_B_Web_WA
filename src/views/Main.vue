<template>
  <div class="mt-n4">
    <!-- 메인이미지 -->
    <div v-show = "!$store.state.bMapUse">
      <div style="position: absolute; left:0px; top:36px; height: 0px; ">
        <div style="height: 38vw; width: 100vw; overflow: hidden; background-color: red;">
          <v-carousel
            height="38vw"
            :show-arrows="false"
            cycle
            hide-delimiter-background
            >
            <v-carousel-item v-for="(slide, i) in $store.state.zMainImgInfo" :key="i">
              <video v-if="slide.VDO_USE_YN == 'Y'" :src="slide.VDO_URL_ADDR" :alt="slide.ALT_TEXT" style="height:100%; width: 100%; object-fit: cover;" autoplay muted loop> </video> 
              <img v-else :src="slide.cShowPath" :alt="slide.ALT_TEXT" style="height:100%; width: 100%; object-fit: cover;">
            </v-carousel-item>
          </v-carousel>
        </div>
      </div>
    </div>
    <!-- 메인지도 -->
    <div v-show = "$store.state.bMapUse">
      <div style="position: absolute; left:0px; top:36px; height: 0px;">
        <div id="mapWindow" v-resize="onResize2" style="height: 550px; width: 100vw; overflow: hidden; background-color: #B2B2B2">
          <MapWindowView :windowWidth="mapWidth" :windowHeight="mapHeight" ref="MapWindowViewRef" @onClick="onPOIClick"/>
        </div>
      </div>
      <div style="position: relative; height: 0px;">
        <div >
          <!-- 예약버튼 -->
          <div ref="Res_btn_Ref" class="content_center white-color mouse-cur" style="z-index:100; position: relative; height: 0px; top:350px; left:0px; border-radius: 50%; background-color: #000000aa; width: 90px; height: 90px;" role="button" tabindex="0" @click="onRes(); focusId = ''" @keydown.enter="onRes(); focusId = ''" aria-label="예약 신청">
            <div>
              <v-icon aria-hidden="true" size="45">mdi-calendar</v-icon>
              <div class="content_center mt-0 font-bold">예약</div>
            </div>
          </div>

          <!-- 층수 선택 -->
          <div class="content_center white-color" style="z-index:100; position: relative; height: 0px; top:250px; left: calc(100% - 50px); width: 60px;">
            <div>            
              <v-btn v-for="(item, i) in zFloor" :key="i" size="55" density="compact" :class="(now_floor==item.cFloorId?'box_floor_sel':'box_floor_nor') + ' content_center ma-1'" @click="sel_floor(item.cFloorId)" :aria-label="`${item.cName}층 `+ (now_floor==item.cFloorId?`선택됨`:`선택`)">{{item.cFloorId}}</v-btn>
              <!-- <v-btn size="55" density="compact" :class="(now_floor==2?'box_floor_sel':'box_floor_nor') + ' content_center ma-1'" @click="sel_floor(2)">2F</v-btn>
              <v-btn size="55" density="compact" :class="(now_floor==1?'box_floor_sel':'box_floor_nor') + ' content_center ma-1'" @click="sel_floor(1)">1F</v-btn> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="pa-0" style="z-index: 0; position: relative;">
      <!-- <div style="height: 500px; background-color: #00ff0000;"></div> -->
      <div :style="{height: $store.state.bMapUse ? '500px' : '36vw', backgroundColor: '#00ff0000'}"></div>
      <div style="overflow: hidden;">
        <v-row class="mt-0 mb-4">
          <!-- 팝업존 -->
          <v-col v-if="zPopZoneInfo.length > 0 && bUseWA != 'true'" cols="12" md="6" sd="12" >
            <div class="pa-4 ml-4">
              <div tabindex="0" style="width: 75vw; max-width:400px; overflow: hidden; border-radius: 12px; box-shadow: 0px 0px 10px 5px #00000050;">
                <v-carousel
                  v-model="iNowPopZoneIdx"
                  height="250"
                  hide-delimiters
                  :show-arrows="false"
                  :interval="iIntervalSec"
                  :cycle="bCycle1"
                  hide-delimiter-background>
                  <v-carousel-item v-for="(data, i) in zPopZoneInfo" :key="i" @click="onPopSel(data)" @keyup.enter="onPopSel(data)" aria-label="새창열기">
                    <div style="padding: 0px;">
                      <img :src="data.src" :alt="data.ALT_TEXT" style="height:250px; width: 100%; object-fit: cover; border-radius: 10px;">
                    </div>
                  </v-carousel-item>
                </v-carousel>
                <div style="height: 0px;">
                  <div class="d-flex font-bold white-color ml-3 pl-2" style="position: relative; top:-240px; background-color: #00000050; border-radius: 7px; align-items:center; justify-content:left; width : 230px;">
                    <div>Popup zone ({{iNowPopZoneIdx + 1}}/{{zPopZoneInfo.length}})</div>
                    <v-btn @click="PrePopZone()" @keyup.enter="PrePopZone()" aria-label="이전 팝업존 보기" class="ml-2" tabindex="0" icon="mdi-play mdi-rotate-180" variant="plain" density="compact" color="white"></v-btn>
                    <v-btn @click="ToggleCycle()" @keyup.enter="ToggleCycle()" :aria-label="cControlCycleLabel" tabindex="0" :icon="cControlCycleIcon1" variant="plain" density="compact" color="white"></v-btn>
                    <v-btn @click="NextPopZone()" @keyup.enter="NextPopZone()" aria-label="다음 팝업존 보기" tabindex="0" icon="mdi-play" variant="plain" density="compact" color="white"></v-btn>
                  </div>
                </div>
              </div>
            </div>
          </v-col>
          <!-- 공지사항 -->
          <v-col cols="12" md="6" sd="12">
            <div class="ml-9 mr-8 pa-4 bg-layer-1">
              <!-- <div role="tablist" class="d-flex flex-wrap tab_back" style="width: 100%; overflow-x: hidden;">
                <button :aria-selected="true" class="sel_box_btn center_all" style="cursor: pointer; width: 34%; min-width: 50px;" role="tab" tabindex="0">{{ $t("main_info_feild_1") }}</button>
              </div> -->
              <h2 class="title-large font-bold mb-2">{{ $t("main_info_feild_1") }}</h2>

              <div v-for="(item, index) in zNoticeInfo" :key="index" class="d-flex center_left">

                <div class="body-medium box_notice_body" @click="onLink_Tab('commu_noti', item.PST_ID)" tabindex="0" @keyup.enter="onLink_Tab('commu_noti', item.PST_ID)" role="button" title="이동">
                  <span class="body-medium box_notice_body">{{ item.PST_TTL }}</span>
                  <v-icon aria-hidden="true" class="ml-1" size="20px" style="margin-top: -2px;" >mdi-chevron-right</v-icon>
                </div>
                <!-- <div class="body-medium box_notice_body" aria-hidden="true">{{ item.PST_TTL }}</div>
                <v-icon aria-hidden="true" class="ml-1 " size="20px" style="margin-top: -2px;" @click="onLink_Tab('commu_noti', item.PST_ID)" @keydown.enter="onLink_Tab('commu_noti', item.PST_ID)" aria-hidden="true">mdi-chevron-right</v-icon> -->
              </div>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- 각 체험관 정보들 -->
      <div class="d-flex flex-wrap justify-space-around">
        <div v-for="(item, i) in zExpInfo" :key="i">
          <v-card class="ma-2" style="width: 300px; height: 294px;">
            <div v-if="item.zImgInfo.length>0">
              <img :src="item.zImgInfo[0].cPath" style="height: 158px; width: 100%; object-fit: cover;" :alt="item.zImgInfo[0].ALT_TEXT" >
            </div>
            <div style="position: relative; top:-168px; height: 80px; width: 100%; background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%);">
              
            </div>
            <div class="d-flex center_left" style="position: relative; left:8px; top:-240px;">
              <img :src="'/boramae/poi/'+item.cType+'.svg'" alt="">
              <div class="ml-1 font-bold text-white" style="height: 0px;position: relative;top: -12px;">
                {{item.cFloorId}} / {{ item.cExpNm }}
              </div>
            </div>

            <div class="info_box" v-html="item.cInfo"></div>
            <div class="mt-1 pb-3 pl-4 pr-4 d-flex">
              <v-btn :ref="'POI_Ref_' + item.cExpCd" color="gray" variant="flat" width="80" @click="moreInfo(true, item,'','page_')" :id="'page_' + item.cExpCd"><span class="cmm-blind-text">{{item.cFloorId}} / {{ item.cExpNm }}</span> 자세히</v-btn>

              <v-btn v-if="item.cFloorId != '0F'" color="#717171" variant="text" size="40" class="ml-0 mt-n1" icon @click="goMap(item)" :title="item.cExpNm + '를 3d지도에 표시'">
                <v-icon aria-hidden="true">mdi-map-marker</v-icon>
              </v-btn>

              <v-spacer></v-spacer>
              <v-btn :ref="'RES_Ref_' + item.cExpCd" v-if="!item.isText" color="primary" width="80" :id="'res_' + item.cExpCd" @click="onRes(item); focusId=item.cExpCd">
                <span class="cmm-blind-text">{{item.cFloorId}} / {{ item.cExpNm }}</span> 예약
              </v-btn>
            </div>
          </v-card>
        </div>
      </div>
    </div>

    <!-- 지도 클릭시 자세 정보 팝업 -->
    <v-dialog aria-modal="true" v-model="isShow" width="600" @update:modelValue="onDialogClose">
      <v-card v-if="nowExp.cType != 'exp_stair'">
        <div v-if="nowExp.zImgInfo.length>0">
          <img :src="nowExp.zImgInfo[0].cPath" style="height: 158px; width: 100%; object-fit: cover;" :alt="nowExp.zImgInfo[0].ALT_TEXT">
        </div>
        <div style="position: relative; top:-168px; height: 80px; width: 100%; background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%);"></div>
        <div class="d-flex center_left" style="position: relative; left:8px; top:-240px;">
          <img :src="'/boramae/poi/'+nowExp.cType+'.svg'" alt="">
          <div class="ml-1 font-bold text-white">
            {{nowExp.cFloorId}} / {{ nowExp.cExpNm }}
          </div>

          <v-spacer></v-spacer>
          <v-btn class="mr-4" size="25" variant="plain" color="white" icon @click="onDialogClose" title="닫기"><v-icon aria-hidden="true">mdi-close</v-icon></v-btn>
        </div>

        <div class="mt-1 pb-3 pl-4 pr-4 d-flex" style="position: relative;  height: 0; top:-170px;">
          <v-spacer></v-spacer>
          <v-btn v-if="!nowExp.isText" color="primary" width="80" @click="onRes(nowExp)">
            <span class="cmm-blind-text">{{nowExp.cFloorId}} / {{ nowExp.cExpNm }}</span> 예약
          </v-btn>
          <button type="button" class="cmm-blind-text" aria-hidden="true"></button>
        </div>

        <div class="info_box2" v-html="nowExp.cInfo"></div>

        <div class="d-flex flex-wrap justify-space-evenly" style="overflow: auto; max-height: 400px;">
          <v-card v-for="(item, i) in nowExp.zImgInfo" :key="i" class="ma-2" style="height: 158px;">
            <img :src="item.cPath" style="height: 158px; width: 158px; object-fit: cover;" :alt="item.ALT_TEXT">
          </v-card>
        </div>
      </v-card>
    </v-dialog>

    <!-- 배너 -->
    <div v-if="zExtendedBannerInfo.length > 0" class="mt-10 mb-8">
      <div class="d-flex flex-wrap slides justify-space-evenly align-center">
        <v-icon :disabled="zBannerInfo.length <= 4" @click="PrevBanner()" @keyup.enter="PrevBanner()" class="" size="30px" style="" alt="이전 배너">mdi-chevron-left</v-icon>
        <div v-for="(item, i) in zExtendedBannerInfo" :key="i" class="slide">              
          <div class="box_link_big mouse-cur mt-2 " tabindex="0" @click="gotoURL(item.URL_ADDR)" @keydown.enter="gotoURL(item.URL_ADDR)" :aria-label="item.ALT_TEXT + ' 새창열림'">                
            <img class="box_link_big_img" :src="item.cPath" aria-hidden="true" alt="">
          </div>
        </div>
        <v-icon :disabled="zBannerInfo.length <= 4" @click="NextBanner()" @keyup.enter="NextBanner()" class="" size="30px" style="" alt="다음 배너">mdi-chevron-right</v-icon>
      </div>
    </div>

    <!-- 하단 서울시 배너 링크 -->
    <div v-if="$store.state.cBannerImg" class="mt-10 mb-8">
      <div class="pa-4" >
        <div class="box_link_bottom mouse-cur" tabindex="0" @click="gotoURL($store.state.cBannerUrl)" @keydown.enter="gotoURL($store.state.cBannerUrl)" :aria-label="$store.state.cAltMsg + ' 새창열림'">
          <img class="box_link_bottom_img" :src="$store.state.cBannerImg"  aria-hidden="true" alt="">            
        </div>          
      </div>
    </div>

    <!-- 스크롤 최상위로 가기 -->
    <v-btn
      v-show="showScrollButton"
      icon="mdi-arrow-up"
      size="large"
      color="black"
      class="scroll-to-top"
      tabindex="0"
      title="스크롤 최상위로 올리기"
      @click="scrollToTop"
      @keyup.enter="scrollToTop"
    ></v-btn>

    <!-- 체험관 예약 팝업 -->
    <!-- <M4_Res @SetData="SetData" ref="M4_Res_ref" @onClose="closeDialogRes"></M4_Res> -->

    <!-- 팝업 -->
    <M4_POPUP_Dialog ref="M4_POPUP_Dialog_ref"></M4_POPUP_Dialog> 
    <!-- 설문조사 -->
    <M4_Survey ref="M4_Survey_ref"></M4_Survey>
  </div>
</template>


<script>
import { EventBus } from '@/EventBus.js';
import axios from "axios";
// import * as Util from "@/Util.js";

import MapWindowView from "@/components/MapWindowView.vue";

export default {
  components: {
    MapWindowView,
  },

  data() {
    return {
      bUseWA: import.meta.env.VITE_USE_WA,
      showScrollButton : false,
      focusId : "",
      isLinkDialog : true,
      isShow : false,
      mapWidth : 100,
      mapHeight : 100,
      now_floor : "1F",

      zFloor : [
        {cFloorId : "B1F", cPath : "/boramae/map/br_B1.gltf", cName:"지하1층"},  
        {cFloorId : "1F", cPath : "/boramae/map/br_1F.gltf", cName:"1층"},
        {cFloorId : "2F", cPath : "/boramae/map/br_2F.gltf", cName:"2층"},
        {cFloorId : "3F", cPath : "/boramae/map/br_3F.gltf", cName:"3층"},
      ],

      nowExp : {cExpCd:"01", cType:"er", cExpNm : "지진체험", cFloorId : "1F", isText : false, x : -35, y : -10, cInfo:"멀티풍수해 체험관은 다양한 자연재해(홍수, 태풍 등)를 시뮬레이션하여 대처 방법을 배우는 교육 프로그램입니다. 멀티풍수해 체험관은 다양한 자연재해(홍수, 태풍 등)를 시뮬레이션하여 대처 방법을 배우는 교육 프로그램입니다. 멀티풍수해 체험관은 다양한 자연재해(홍수, 태풍 등)를 시뮬레이션하여 대처 방법을 배우는 교육 프로그램입니다.", },

      bCycle1 : true,
      iIntervalSec : 3000,
      iNowPopZoneIdx : 0,
      zPopZoneInfo : [],
      zNoticeInfo : [],

      zExpInfo : [], 
      zPOIData : [], 

      zExtendedBannerInfo : [],
      zBannerInfo : [],
    };
  },

  components:{
  },

  computed: {
    // 팝업 멈추기 아이콘
    cControlCycleIcon1() {
      return this.bCycle1 ? "mdi-pause" : "mdi-skip-next"
    },
    cControlCycleLabel() {
      return this.bCycle1 ? "팝업존 자동 재생 멈추기" : "팝업존 자동 재생 시작하기"
    },
  },

  mounted() {
    // 팝업/공지사항 정보 가져오기
    this.GetMainBoardInfo_Exp();
    if (this.bUseWA != 'true') {
      this.$refs.M4_Survey_ref.ShowDialog()
    }
    
    //## iron28
    window.addEventListener('scroll', this.handleScroll);

    // 맵 초기화 하기 (zFloor에서 맵데이터 가져와서 초기화하기)
    this.$refs.MapWindowViewRef.iniMapFloor(this.zFloor);
    this.GetProgramInfo();
    this.GetPOIDataInfo();

    //iron28 배너 도는 것 삭제
    setInterval(() => {
      this.NextBanner();
    }, 3000);

  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },

  methods : {
    NextBanner() {
      // 다음 배너로 넘어가기 위한 인덱스 업데이트
      this.iShowLastIndex += 1;
      if (this.iShowLastIndex >= this.zBannerInfo.length) {
        // 마지막에 도달하면 처음으로 돌아감
        this.iShowLastIndex = 0;
      }
      this.updateBannerInfo();
    },
    PrevBanner() {
      // 이전 배너로 돌아가기 위한 인덱스 업데이트
      this.iShowLastIndex -= 1;
      if (this.iShowLastIndex < 0) {
        // 처음에서 뒤로 갈 경우 마지막 배너로 이동
        this.iShowLastIndex = Math.max(0, this.zBannerInfo.length - 4);
      }
      this.updateBannerInfo();
    },
    
    updateBannerInfo() {
      // 항상 4개의 배너가 보이도록 설정
      if (this.zBannerInfo.length < 4) {
        this.zExtendedBannerInfo = this.zBannerInfo; // 총 배너가 4개 미만일 경우 그대로 보여줌
      } else if (this.iShowLastIndex + 4 <= this.zBannerInfo.length) {
        // 마지막 인덱스가 범위를 넘지 않으면 4개씩 슬라이스
        this.zExtendedBannerInfo = this.zBannerInfo.slice(this.iShowLastIndex, this.iShowLastIndex + 4);
      } else {
        // 범위를 넘어가면, 배열을 순환하여 처음부터 채움
        const endItems = this.zBannerInfo.slice(this.iShowLastIndex);
        const startItems = this.zBannerInfo.slice(0, 4 - endItems.length);
        this.zExtendedBannerInfo = endItems.concat(startItems);
      }
    },

    closeDialogRes() {      
      // setTimeout(() => {        
      //   if (this.focusId == "") {          
      //     this.$refs.Res_btn_Ref.focus();
      //   } else {
      //     const focusRef = this.$refs['RES_Ref_' + this.focusId];
      //     if (focusRef) {            
      //       if (Array.isArray(focusRef)) {
      //         focusRef[0].$el.focus();
      //       } else {              
      //         focusRef.$el.focus();
      //       }
      //     }       
      //   }
      // }, 10);      
    },

    onDialogClose() {            
      this.isShow = false;
      this.$store.state.isDialog = false;
      EventBus.$emit("onBackDialogBtn");    
    },

    
    closeDialog() {
      setTimeout(() => {                
        if (this.isLinkDialog) {
          const focusRef = this.$refs['POI_Ref_' + this.focusId];
          if (focusRef) {            
            if (Array.isArray(focusRef)) {
              focusRef[0].$el.focus();
            } else {              
              focusRef.$el.focus();
            }
          }
        } else {
          this.$refs.MapWindowViewRef.onFocusBack();
        }
      }, 10);      
    },

    // 메인 프로그램 정보 가져오기
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
                zImgInfo : [{cPath : "/boramae/contents/main_001.jpg", ALT_TEXT: "소방복과 공기호흡기를 착용한 소방관이 무릎을 꿇고 앉아 화재 현장을 바라보고 있는 모습"}],
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
              if (oInputData.zImgInfo.length == 0) {
                oInputData.zImgInfo = [{cPath : "/boramae/contents/main_001.jpg", ALT_TEXT: "소방복과 공기호흡기를 착용한 소방관이 무릎을 꿇고 앉아 화재 현장을 바라보고 있는 모습"}]
              }

              zProgramList.push(oInputData)
            }

            this.$store.commit('SetExpInfo', zProgramList);
            this.zExpInfo = zProgramList;
            // this.zExpInfo = this.$store.state.zExp.filter(item => item.cType != 'exp_stair')
            // this.initPOI();
            // setTimeout(() => {
            //   this.sel_floor("1F")
            // }, 500);
          } else {
            EventBus.$emit("onShowMsg", {
              cSubTitle : "프로그램 목록 조회 중 문제가 발생했습니다.",
              cTitle : "계속 지속될 경우 담당자에게 문의 바랍니다.",
              cMsg : `Error : ${res.data.Msg}`,
            });
          }
        })
        .catch(err =>{
          EventBus.$emit("onShowMsg", {
            cSubTitle : "프로그램 목록 조회 중 문제가 발생했습니다.",
            cTitle : "계속 지속될 경우 담당자에게 문의 바랍니다.",
            cMsg : `Error : ${err}`,
          });
        })
        .finally(() =>{
        })
    },

    // POI 지도 정보 가져오기 (POI)
    GetPOIDataInfo() {
      var posData = {
        SITE_CD : import.meta.env.VITE_SITE_CD,
      }

      axios
        .post(import.meta.env.VITE_UIL_API + "GetPOIDataInfo", posData, {
          headers: {
          }
        })
        .then(res => {
          if (res.data.ResultCd === "00") {
            this.zPOIData = res.data.Result.map((item, index) => {
              item.cPOIId = item.REG_SN
              item.cExpCdList = item.EXP_CD_LIST
              item.cType = item.POI_TYPE
              item.cFloorId = item.FLOOR
              item.cExpNm = item.TITLE
              item.x = item.X_DATA
              item.y = item.Y_DATA
              return item
            })
            console.log(res.data.Result, this.zPOIData);
            this.initPOI();
            setTimeout(() => {
              this.sel_floor("1F")
            }, 500);
          } else {
            EventBus.$emit("onShowMsg", {
              cSubTitle : "POI 맵 목록 조회 중 문제가 발생했습니다.",
              cTitle : "계속 지속될 경우 담당자에게 문의 바랍니다.",
              cMsg : `Error : ${res.data.Msg}`,
            });
          }
        })
        .catch(err =>{
          EventBus.$emit("onShowMsg", {
            cSubTitle : "POI 맵 목록 조회 중 문제가 발생했습니다.",
            cTitle : "계속 지속될 경우 담당자에게 문의 바랍니다.",
            cMsg : `Error : ${err}`,
          });
        })
        .finally(() =>{
        })
    },

    // POI 설정하기
    initPOI(){
      // this.$refs.MapWindowViewRef.InitPOI(this.$store.state.zExp);
      this.$refs.MapWindowViewRef.InitPOI(this.zPOIData);
    },

    // 자세히 보기 클릭시 해당 지도의 POI로 이동하기
    goMap(item){
      this.sel_floor(item.cFloorId);
      this.$refs.MapWindowViewRef.goMap(item.cExpCd);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    // 자세 팝업 열기
    moreInfo(isList, item, btn, area){
      this.nowExp = item;
      this.targetBtn = btn;
      this.areaName = area;
      this.isShow = true;
      this.$store.state.isDialog = true;
      this.$store.state.btnDialogRef = document.activeElement;

      this.focusId = item.cExpCd;
      this.isLinkDialog = isList;
    },

    // 메인지도에서 해당 POI 클릭시 자세팝업 열기
    onPOIClick(cType, cPOIId) {
      // for (let i = 0; i < this.$store.state.zExp.length; i++) {
      //   if (this.$store.state.zExp[i].cPOIId == cPOIId) {
      //     console.log(this.$store.state.zExp[i].cPOIId, cPOIId);
      //     this.moreInfo(false, this.$store.state.zExp[i]);
      //     break;
      //   }
      // }
    },

    // 메인 지도 리사이즈하기
    onResize2(){
      let element1 = document.getElementById('mapWindow');
      if (element1 != null) {
        this.mapWidth = element1.clientWidth;
        this.mapHeight = element1.clientHeight;

        this.$forceUpdate();
      }
    },

    // 층별 지도 표시하기
    sel_floor(floor) {
      this.now_floor = floor;
      this.$refs.MapWindowViewRef.goFloor(this.now_floor);
    },

    // 스크롤 탑으로 이동하기
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },

    // 스크롤 위로가기 버튼 보여주기
    handleScroll() {
      this.showScrollButton = window.scrollY > 300;
    },

    // 팝업존 컨트롤 기능들
    ToggleCycle() {
      this.bCycle1 = !this.bCycle1
    },
    PrePopZone() {
      if (this.iNowPopZoneIdx == -1 && this.zPopZoneInfo.length == 0) return
      this.iNowPopZoneIdx = this.iNowPopZoneIdx == 0 ? this.zPopZoneInfo.length - 1 : this.iNowPopZoneIdx - 1
    },
    NextPopZone() {
      if (this.iNowPopZoneIdx == -1 && this.zPopZoneInfo.length == 0) return
      this.iNowPopZoneIdx = this.iNowPopZoneIdx < this.zPopZoneInfo.length - 1 ? this.iNowPopZoneIdx + 1 : 0
    },
    // 팝업존 클릭시 해당 URL로 이동하기
    onPopSel(a) {
      this.gotoURL(a.URL_ADDR)
    },
    // 해당 URL로 이동하기
    gotoURL(cURL) {
      window.open(cURL, "_blank")
    },

    // 해당 페이지로 이동하기 (with 파라미터)
    onLink_Tab(path, params) {
      // console.log(path, params);
      this.scrollToTop()
      EventBus.$emit("onGoto_tab", {path, params});
    },

    // 예약하기 버튼 클릭시 예약창으로 이동하기
    onRes(item) {
      // this.$refs.M4_Res_ref.Show({item : item})
      this.onDialogClose();
      this.$store.state.oSelectedExp = item
      this.scrollToTop()
      EventBus.$emit("onGoto", "res_reservation");
    },

    // 예약완료
    SetData(Data1, Data2) {
      console.log("Success Reservate");
    },

    // 예약완료창 닫기
    ReturnMain() {
      this.bShowSubmission = false
    },

    // 팝업/공지사항 정보 가져오기
    GetMainBoardInfo_Exp() {
      this.zPopZoneInfo = []
      this.zBannerInfo = []
      this.zNoticeInfo = []

      var posData = {
        SITE_ID : import.meta.env.VITE_SITE_ID,
      }

      axios
        .post(import.meta.env.VITE_UIL_API + "GetMainBoardInfo_Exp", posData , {
          headers: {
          }
        })
        .then(res => {
          if (res.data.ResultCd === "00") {
            this.zPopZoneInfo = res.data.Result1.map(item => {
              item.src = import.meta.env.VITE_FILE_API + item.FILE_PATH
              return item
            })
            res.data.Result1.length == 0 ? this.iNowPopZoneIdx = -1 : this.iNowPopZoneIdx = 0

            this.zBannerInfo = res.data.Result2.map(item => {
              item.cPath = import.meta.env.VITE_FILE_API + item.FILE_PATH
              return item
            })

            if (this.zBannerInfo.length > 4) {
              this.NextBanner()
            } else {
              this.iShowLastIndex = this.zBannerInfo.length 
              this.zExtendedBannerInfo = this.zBannerInfo
            }

            this.zNoticeInfo = res.data.Result3

            if (res.data.Result4.length > 0 && this.bUseWA != "true") {
              this.$refs.M4_POPUP_Dialog_ref.ShowPopupDialog(res.data.Result4)
            }
          } else {
            EventBus.$emit("onShowMsg", {
              cSubTitle : "팝업창 정보 등을 가져오지 못했습니다.",
              cTitle : "계속 지속될 경우 담당자에게 문의 바랍니다.",
              cMsg : `Error : ${res.data.Msg}`,
            });
          }
        })
        .catch(err =>{
          EventBus.$emit("onShowMsg", {
            cSubTitle : "팝업창 정보 등을 가져오지 못했습니다.",
            cTitle : "계속 지속될 경우 담당자에게 문의 바랍니다.",
            cMsg : `Error : ${err}`,
          });
        })
        .finally(() =>{
        })
    },
  },
};
</script>

<style scoped>
  .container2 {
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;
  }

  .box_btn_main {
    height: 300px;
    width: 250px;
    border-radius: 20px;
    padding: 20px;
  }
  .box_btn_main2 {
    height: 300px;
    width: 250px;
    border-radius: 20px;
    padding: 20px;
  }

  .box_btn_main:focus {	
    outline: 4px var(--point-60) solid;
  }
  .box_btn_main:hover {	
    outline: 4px var(--point-50) solid;
  }

  .box_btn_main2:focus {	
    outline: 4px var(--primary-60) solid;
  }
  .box_btn_main2:hover {	
    outline: 4px var(--primary-50) solid;
  }


  .box_btn_todo {
    height: 126px;
    width: 100px;
    border-radius: 20px;
  }

  .box_link_big {
    position: relative;
    width: 260px; 
    height: 65px; 
    overflow: hidden;
    border-radius: 15px; /* 둥근 모서리 설정 */
    box-shadow: 0px 0px 10px 5px #00000030;
    display: flex;
    justify-content: center; /* 가로 방향 센터 정렬 */
    align-items: center; /* 세로 방향 센터 정렬 */
  }


  .box_link_big:focus {	
    outline: 4px var(--primary-60) solid;
  }
  .box_link_big:hover {
    outline: 4px var(--primary-50) solid;
  }

  .box_link_big_img {
    width: 100%; 
    height: auto; 
    object-fit: contain; 
    border-radius: 15px; /* 둥근 모서리 설정 */
  }

  .box_link_big_gradient {
    position: relative;
    top: 0px;
    left: 0;
    width: 100%;
    height: 100%;
    /* background: red; */
    background: linear-gradient(to bottom, black, #00000020, #00000000, #00000050, black);
    border-radius: 15px;
  }

  .box_link_title {
    position: relative;
    top:-230px; 
    height: 0px; 
    color: white;
  }

  .box_link_info {
    position: relative;
    top:-115px; 
    height: 90px; 
    color: white;
    display: flex;
    align-items: flex-end;
  }

  .box_link_bottom {
    position: relative;
    width: 100%;
    border-radius: 15px;
    box-shadow: 0px 0px 10px 5px #00000030;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .box_link_bottom_img {
    width: 100%;
    height: auto;
    border-radius: 15px;
    object-fit: cover;
  }

  .box_link_bottom:focus {	
    outline: 4px var(--primary-60) solid;
  }
  .box_link_bottom:hover {	
    outline: 4px var(--primary-50) solid;
  }

  .scroll-to-top {
    position: fixed;
    bottom: 20px;
    right: 20px;
  }

  .box_notice_body {
    max-width: calc(100% - 50px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }


  .box_floor_sel {
    height: 50px;
    width: 30px;
    background-color: var(--primary-color); /* Background color of the box */
    box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    color: white;
    font-weight: 700;
    font-size: var(--font-size-title-large);
  }

  .box_floor_nor {
    height: 50px;
    width: 30px;
    background-color: var(--gray-10); /* Background color of the box */
    border-radius: 4px;
    font-size: var(--font-size-title-large);
  }

  .info_box {
    margin-top: -120px;
    padding: 15px;
    font-size: var(--font-size-detail-medium);
    text-overflow: ellipsis;
    line-height: 1.5em;

    height: 85px;
    width: 100%;

    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    white-space: normal;
    text-overflow: ellipsis;
    word-break: break-all;
  }

  .info_box2 {
    margin-top: -120px;
    padding: 15px;
    font-size: var(--font-size-detail-medium);
    text-overflow: ellipsis;
    line-height: 1.5em;
    width: 100%;
  }
</style>
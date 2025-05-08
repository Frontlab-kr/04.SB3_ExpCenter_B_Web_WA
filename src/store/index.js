import { createStore } from "vuex";
import axios from "axios";
// import ProgramListData from "../JSONData/ProgramListData.json";

// 현재 메인메뉴(스토어)에서 id가 일치하는 매뉴정보를 가져옴
function findMenuByPath(menuArray, searchId) {
  // 메뉴 배열을 순회
  for (const menu of menuArray) {
    // 현재 메뉴의 id가 검색하려는 id와 일치하면 반환
    if (menu.path === searchId) {
      return menu;
    }

    // 하위 메뉴가 있는 경우 하위 메뉴도 재귀적으로 탐색
    if (menu.menu_dept1) {
      const found = findMenuByPath(menu.menu_dept1, searchId);
      if (found) {
        return found;
      }
    }

    if (menu.menu_dept2) {
      const found = findMenuByPath(menu.menu_dept2, searchId);
      if (found) {
        return found;
      }
    }
  }

  return null;
}

export default createStore({
  state: {
    btnDialogRef: null,
    btnMsgDialogRef: null,
    btnReplyDialogRef: null,
    btnDialogResRef: null,
    isDialog: false,
    UserInfo: {
      cUserId: "",
      cUserNm: "",
    },

    link_param: "",

    top_page_scroll_id: "top_page",
    now_main_menu_idx: -1,
    now_nav_menu_idx: 0,
    // now_main_menu_dept2_idx : 0,

    main_menu: [
      {
        idx: 0,
        id: "01",
        name: "menu_01_체험관소개",
        default_path: "exp_intro",
        isMainMenu: true,
        menu_dept1: [
          { idx: 0, id: "0101", name: "menu_0101_소개", path: "exp_intro" },
          {
            idx: 1,
            id: "0102",
            name: "menu_0102_조직도",
            path: "intro_organization",
          },
          {
            idx: 3,
            id: "0104",
            name: "menu_0104_오시는길",
            path: "exp_map_center",
          },
        ],
      },
      // { idx: 1, id: "02", name : "menu_02_이용안내", default_path : "guide_guide", isMainMenu : true,
      //   menu_dept1 : [
      //     {idx : 0, id: "0201", name: "menu_0201_이용안내", path : "guide_guide",},
      //     {idx : 1, id: "0202", name: "menu_0202_재난안전체험", path : "", default_path : "guide_tsunami_experience",
      //       menu_dept2 : [
      //         {id: "020201", name: "menu_020201_지진체험", path: "guide_tsunami_experience", caption : "" },
      //         {id: "020202", name: "menu_020202_멀티풍수해체험", path: "", caption : "" },
      //         {id: "020203", name: "menu_020203_선박탈출체험", path: "", caption : "" },
      //         {id: "020204", name: "menu_020204_소화기사용법체험", path: "", caption : "" },
      //         {id: "020205", name: "menu_020205_지하철체험", path: "", caption : "" },
      //         {id: "020206", name: "menu_020206_승강기안전체험", path: "", caption : "" },
      //         {id: "020207", name: "menu_020207_화재대피체험", path: "", caption : "" },
      //         {id: "020208", name: "menu_020208_실내건물탈출체험", path: "", caption : "" },
      //         {id: "020209", name: "menu_020209_생활안전체험", path: "", caption : "" },
      //         {id: "020210", name: "menu_020210_야외탈출체험", path: "", caption : "" },
      //         {id: "020211", name: "menu_020211_4D라이더영상관", path: "", caption : "" },
      //         {id: "020212", name: "menu_020212_멀티방화셔터체험", path: "guide_multi_shutter", caption : "" },
      //       ]
      //     },
      //     {idx : 2, id: "0203", name: "menu_0203_응급처치체험", path : "", default_path : "",},
      //     {idx : 3, id: "0204", name: "menu_0204_소방관진로체험", path : "",},
      //     {idx : 4, id: "0205", name: "menu_0204_어린이안전체험", path : "guide_children",},
      //   ],
      // },
      // { idx: 2, id: "03", name : "menu_03_예약이수증발급", default_path : "res_reservation", isMainMenu : true,
      //   menu_dept1 : [
      //     {idx : 0, id: "0301", name: "menu_0301_예약", path : "res_reservation",},
      //     {idx : 1, id: "0302", name: "menu_0302_예약조회", path : "res_inquiry",},
      //     {idx : 2, id: "0303", name: "menu_0303_이수증발급", path : "res_certificate",},
      //   ],
      // },
      // { idx: 3, id: "04", name : "menu_04_커뮤니티", default_path : "commu_noti", isMainMenu : true,
      //   menu_dept1 : [
      //     {idx : 0, id: "0401", name: "menu_0401_공지사항", path : "commu_noti",},
      //     {idx : 1, id: "0402", name: "menu_0402_자주하는질문", path : "commu_faq",},
      //     {idx : 2, id: "0403", name: "menu_0403_묻고답하기", path : "commu_qna",},
      //     {idx : 3, id: "0404", name: "menu_0404_체험후기", path : "commu_review",},
      //     {
      //       idx : 1, id: "0402", name: "menu_dept_1_0402", new_menu : null, default_path : "info_natural_disaster_heat", CONTS_TYPE : "B", CONTS_NUM :0,
      //       path : "",
      //       menu_dept2 : [
      //         {id: "040201", name: "menu_dept_2_040201", path: "info_natural_disaster_heat", caption : "온라인으로 민원을 접수하고 처리하는 서비스입니다.", CONTS_TYPE : "B", CONTS_NUM :0},
      //         {id: "040202", name: "menu_dept_2_040202", path: "https://www.safekorea.go.kr/idsiSFK/neo/sfk/cs/contents/prevent/prevent09.html?menuSeq=126", caption : "온라인으로 민원을 접수하고 처리하는 서비스입니다.", CONTS_TYPE : "B", CONTS_NUM :0},
      //         {id: "040203", name: "menu_dept_2_040203", path: "info_natural_disaster_tsunami", caption : "온라인으로 민원을 접수하고 처리하는 서비스입니다.", CONTS_TYPE : "B", CONTS_NUM :0},
      //       ]
      //     },
      //     {
      //       idx : 2, id: "0403", name: "menu_dept_1_0403", new_menu : null, default_path : "info_social_disaser_biochemical", CONTS_TYPE : "B", CONTS_NUM :0,
      //       path : "",
      //       menu_dept2 : [
      //         {id: "040301", name: "menu_dept_2_040301", path: "info_social_disaser_biochemical", caption : "온라인으로 민원을 접수하고 처리하는 서비스입니다.", CONTS_TYPE : "B", CONTS_NUM :0 },
      //       ]
      //     },
      //     {
      //       idx : 3, id: "0404", name: "menu_dept_1_0404", new_menu : null, default_path : "info_live_disaster_cirsis", CONTS_TYPE : "B", CONTS_NUM :0,
      //       path : "",
      //       menu_dept2 : [
      //         {id: "040401", name: "menu_dept_2_040401", path: "info_live_disaster_cirsis", caption : "온라인으로 민원을 접수하고 처리하는 서비스입니다.", CONTS_TYPE : "B", CONTS_NUM :0},
      //         {id: "040402", name: "menu_dept_2_040402", path: "info_live_disaster_accident", caption : "온라인으로 민원을 접수하고 처리하는 서비스입니다.", CONTS_TYPE : "B", CONTS_NUM :0},
      //         {id: "040403", name: "menu_dept_2_040403", path: "info_live_disaster_mountain", caption : "온라인으로 민원을 접수하고 처리하는 서비스입니다.", CONTS_TYPE : "B", CONTS_NUM :0},
      //         {id: "040404", name: "menu_dept_2_040404", path: "info_live_disaster_trail", caption : "온라인으로 민원을 접수하고 처리하는 서비스입니다.", CONTS_TYPE : "B", CONTS_NUM :0},
      //       ]
      //     },
      //     {
      //       idx : 4, id: "0405", name: "menu_dept_1_0405", new_menu : null, default_path : "info_first_aid_cpr", CONTS_TYPE : "B", CONTS_NUM :0,
      //       path : "",
      //       menu_dept2 : [
      //         {id: "040501", name: "menu_dept_2_040501", path: "info_first_aid_cpr", caption : "온라인으로 민원을 접수하고 처리하는 서비스입니다.", CONTS_TYPE : "B", CONTS_NUM :0},
      //         {id: "040502", name: "menu_dept_2_040502", path: "info_first_aid_choking", caption : "온라인으로 민원을 접수하고 처리하는 서비스입니다.", CONTS_TYPE : "B", CONTS_NUM :0},
      //         {id: "040503", name: "menu_dept_2_040503", path: "info_first_aid_bleeding", caption : "온라인으로 민원을 접수하고 처리하는 서비스입니다.", CONTS_TYPE : "B", CONTS_NUM :0},
      //         {id: "040504", name: "menu_dept_2_040504", path: "info_first_aid_shock", caption : "온라인으로 민원을 접수하고 처리하는 서비스입니다.", CONTS_TYPE : "B", CONTS_NUM :0},
      //         {id: "040505", name: "menu_dept_2_040505", path: "info_first_aid_sudden_death", caption : "온라인으로 민원을 접수하고 처리하는 서비스입니다.", CONTS_TYPE : "B", CONTS_NUM :0},
      //         {id: "040506", name: "menu_dept_2_040506", path: "info_first_aid_stroke", caption : "온라인으로 민원을 접수하고 처리하는 서비스입니다.", CONTS_TYPE : "B", CONTS_NUM :0},
      //         {id: "040507", name: "menu_dept_2_040507", path: "info_first_aid_cardiac", caption : "온라인으로 민원을 접수하고 처리하는 서비스입니다.", CONTS_TYPE : "B", CONTS_NUM :0},
      //         {id: "040508", name: "menu_dept_2_040508", path: "info_first_aid_life", caption : "온라인으로 민원을 접수하고 처리하는 서비스입니다.", CONTS_TYPE : "B", CONTS_NUM :0},
      //       ]
      //     },
      // {idx : 4, id: "0405", name: "menu_0405_생활안전자료", path : "", default_path : "commu_life_fire",
      //   menu_dept2 : [
      //     {id: "040401", name: "menu_040401_화재감지및대피요령", path: "commu_life_fire", caption : "" },
      //     {id: "040402", name: "menu_040402_불이났을때행동요령", path: "commu_life_action", caption : "" },
      //     {id: "040403", name: "menu_040403_연기속대피요령", path: "commu_life_smoke", caption : "" },
      //     {id: "040404", name: "menu_040404_불이난건물속에갇혔을때", path: "commu_life_building", caption : "" },
      //     {id: "040405", name: "menu_040405_도움이되는소방시설", path: "commu_life_equipment", caption : "" },
      //     {id: "040406", name: "menu_040406_담뱃불안전조치", path: "commu_life_cigarette", caption : "" },
      //     {id: "040407", name: "menu_040407_주방안전수칙준수", path: "commu_life_safety_rules", caption : "" },
      //     {id: "040408", name: "menu_040408_전기안전하게사용하기", path: "commu_life_electricity", caption : "" },
      //     {id: "040409", name: "menu_040409_가스안전하게사용하기", path: "commu_life_gas", caption : "" },
      //     {id: "040410", name: "menu_040410_에스컬레이터및승강기안전", path: "commu_life_escalator", caption : "" },
      //     {id: "040411", name: "menu_040411_안전산행정보", path: "commu_life_travel", caption : "" },
      //     {id: "040412", name: "menu_040412_등산로및표지판위치", path: "commu_life_signpost", caption : "" },
      //     {id: "040413", name: "menu_040413_심폐소생술이란", path: "commu_life_cpr", caption : "" },
      //     {id: "040414", name: "menu_040414_기도패쇄", path: "commu_life_obstruction", caption : "" },
      //     {id: "040415", name: "menu_040415_생활응급처치", path: "commu_life_first_aid", caption : "" },
      //     {id: "040416", name: "menu_040416_응급처치리플렛", path: "commu_life_leaflet", caption : "" },
      //   ]
      // },
      // {idx : 5, id: "0406", name: "menu_0406_관련사이트", path : "commu_site",},
      // ],
      // },
    ],

    zMainImgInfo: [],

    zLang: [
      { id: "en", cName: "ENG" },
      { id: "ko", cName: "KOR" },
    ],
    zSelectYears1: [
      { cCode: "00", cYearsNm: "선택하세요" },
      { cCode: "02", cYearsNm: "유치원" },
      { cCode: "03", cYearsNm: "초등학교" },
      { cCode: "04", cYearsNm: "중학교" },
      { cCode: "05", cYearsNm: "고등학교" },
      { cCode: "06", cYearsNm: "대학교" },
      { cCode: "07", cYearsNm: "성인" },
      { cCode: "08", cYearsNm: "복지단체" },
      { cCode: "09", cYearsNm: "공무수행" },
      { cCode: "10", cYearsNm: "외국인" },
      { cCode: "11", cYearsNm: "기타" },
    ],
    zSelectYears2: [
      { AGE_TYPE: 1, cYearsNm: "유치원" },
      { AGE_TYPE: 2, cYearsNm: "초등학생" },
      { AGE_TYPE: 3, cYearsNm: "중학생" },
      { AGE_TYPE: 4, cYearsNm: "고등학생" },
      { AGE_TYPE: 5, cYearsNm: "대학생" },
      { AGE_TYPE: 6, cYearsNm: "성인" },
      { AGE_TYPE: 7, cYearsNm: "노인" },
    ],
    zSelectNation: [
      { value: "C000", text: "선택" },
      { value: "C001", text: "중국" },
      { value: "C002", text: "싱가폴" },
      { value: "C003", text: "미국" },
      { value: "C004", text: "대만" },
      { value: "C005", text: "일본" },
      { value: "C006", text: "그외" },
    ],

    // zSelectTime : [
    //   {cCode : "P4016", cYearsNm : "16:00"},
    // ],

    zPOI: [],

    zExp: [],

    zU_Link: [],
    zS_Link: [],
    zR_Link: [],
    zD_Link: [],
    zI_Link: [],

    bShowShareSNSBtn: false,
    bMapUse: true,
    cADDR: "",
    cDayTelInfo: "",
    cNightTelInfo: "",
    cBannerUrl: "",
    cBannerImg: "",
    cAltMsg: "",

    oSelectedExp: {},
  },
  getters: {
    // time2(state) {
    //   return state.counter * 2;
    // }
  },
  mutations: {
    SetExpInfo(state, value) {
      state.zExp = value;
    },

    SetFooterJsonData(state, value) {
      state.zU_Link = value.filter((item) => item.TYPE_CD == "0");
      state.zS_Link = value.filter(
        (item) => item.TYPE_CD == "1" && item.FT_CD != "1000"
      );
      state.zR_Link = value.filter((item) => item.TYPE_CD == "2");
      state.zD_Link = value.filter((item) => item.TYPE_CD == "3");
      state.zI_Link = value.filter((item) => item.TYPE_CD == "4");
    },
    SetMenuList(state, value) {
      state.main_menu = [];

      state.main_menu = value;
    },
    SetShowShareSNSBtn(state, value) {
      state.bShowShareSNSBtn = value;
    },
    SetTelInfo(state, value) {
      state.cADDR = value.ADDR;
      state.cDayTelInfo = value.DAY_TELNO;
      state.cNightTelInfo = value.NGHT_TELNO;
    },
    SetMapUseInfo(state, value) {
      state.bMapUse = value.MAP_USE_YN == "N" ? false : true;
    },
    SetMainImgInfo(state, value) {
      state.zMainImgInfo = value.map((item) => {
        item.cShowPath = import.meta.env.VITE_FILE_API + item.FILE_PATH;
        return item;
      });
    },
    SetBannerInfo(state, value) {
      state.cBannerUrl = value.cBannerUrl;
      state.cBannerImg = value.cBannerImg;
      state.cAltMsg = value.cAltMsg;
    },
    SetEnterContent(state, value) {
      let cPath = value.cPath.replace("/", "");
      let zMenuInfo = findMenuByPath(state.main_menu, cPath);

      if (!zMenuInfo) {
        return;
      }

      var posData = {
        SITE_ID: import.meta.env.VITE_SITE_ID,
        MENU_ID: zMenuInfo.id,
        CONTS_ID: zMenuInfo.CONTS_ID[value.iIndex],
        CONTS_Order: value.iIndex,
      };

      axios
        .post(import.meta.env.VITE_UIL_API + "SetEnterContent", posData, {
          headers: {},
        })
        .then((res) => {
          if (res.data.ResultCd != "00") {
            console.error(res.data.Msg);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
});

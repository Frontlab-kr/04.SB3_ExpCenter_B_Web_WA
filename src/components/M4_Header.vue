<template>
  <div aria-hidden="false" class="ui-pc-header">
    <header class="ui-header">
      <div class="ui-flex-wrap">
        <div class="ui-quick-menu">
          <div class="inner">
            <h1>
              <a
                href="javascript:void(0)"
                aria-label="보라매 안전체험관 메인 페이지"
                @click="on_main_logo()"
              >
                <img
                  src="/boramae/contents/main-logo-blue.svg"
                  role="link"
                  alt="119 Seoul Fire Services 서울소방"
                />
              </a>
            </h1>
            <div class="ui-menu-list">
              <div class="select area line">
                <select
                  name="related-agencies"
                  id="related-agencies"
                  aria-label="유관기관 선택"
                >
                  <option value="">{{ $t("footer_link_title_2") }}</option>
                  <option
                    value=""
                    v-for="(item, index) in $store.state.zU_Link"
                    :key="index"
                    :value="index"
                    tabindex="0"
                    :aria-label="item.title + ' 새창열림'"
                    role="menuitem"
                  >
                    <a
                      :href="item.cURL"
                      target="_blank"
                      :title="item.title + ' 새창열림'"
                      >{{ item.title }}</a
                    >
                  </option>
                </select>
              </div>
              <div class="select lang line">
                <select
                  name="language"
                  id="language"
                  :value="$i18n.locale"
                  @change="onLangChange"
                  aria-label="언어 선택"
                >
                  <option
                    v-for="(item, index) in sortedLangList"
                    :key="index"
                    :value="item.id"
                    :aria-label="item.title"
                  >
                    {{ item.cName }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <hr class="v-divider v-theme--myCustomTheme" />
        <nav class="ui-gnb" role="navigation" aria-label="주 메뉴">
          <div class="inner">
            <ul class="ui-depth1">
              <template v-for="(item, i) in $store.state.main_menu" :key="i">
                <li v-if="item.isMainMenu">
                  <a
                    href="javascript:void(0)"
                    aria-haspopup="true"
                    aria-expanded="false"
                    @mouseenter="onEnterBtn(item.idx)"
                    @focus="onEnterBtn(item.idx)"
                    @click="goMainMenu(item.idx)"
                    @keydown.enter="goMainMenu(item.idx)"
                    @keydown.shift.tab.exact="goBack()"
                    >{{ item.name }}</a
                  >
                  <div class="depth-wrap" role="menu">
                    <div class="ui-flex-wrap">
                      <h3>{{ item.name }}</h3>
                      <ul class="ui-depth2">
                        <li
                          v-for="(item, k) in $store.state.main_menu[i]
                            .menu_dept1"
                          :key="'menu_' + k"
                        >
                          <a
                            href="javascript:void(0)"
                            @blur="item.isFocus = false"
                            @focus="item.isFocus = true"
                            @click="onSelect(item)"
                            @keydown.enter="onSelect(item)"
                            :title="
                              item.path.startsWith('http') ? `새창열림` : ``
                            "
                          >
                            {{ item.name }}
                            <i
                              class="icon-link"
                              title="새창이동"
                              v-if="item.path.startsWith('http')"
                            ></i>
                          </a>
                          <ul class="ui-depth3">
                            <li
                              v-for="(item, j) in $store.state.main_menu[i]
                                .menu_dept1[k].menu_dept2"
                              :key="j"
                            >
                              <a
                                href="javascript:void(0)"
                                @blur="item.isFocus = false"
                                @focus="item.isFocus = true"
                                @click="goMenu(item)"
                                @keydown.enter="goMenu(item)"
                                :title="
                                  item.path.startsWith('http')
                                    ? `새창 열림`
                                    : ``
                                "
                              >
                                {{ item.name }}
                                <i
                                  class="icon-link"
                                  title="새창이동"
                                  v-if="item.path.startsWith('http')"
                                ></i>
                              </a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </template>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  </div>

  <div aria-hidden="false" class="ui-mo-header">
    <header class="ui-header">
      <div class="ui-header-top">
        <h1>
          <a
            href="javascript:void(0)"
            aria-label="보라매 안전체험관 모바일 메인 페이지"
            @click="on_main_logo()"
          >
            <img
              src="/boramae/contents/mo-main-logo-blue.svg"
              role="link"
              alt="119 Seoul Fire Services 서울소방"
            />
          </a>
        </h1>
        <div class="menu-area">
          <button
            class="search-btn"
            @click="
              goSearch();
              $store.state.now_main_menu_idx = -1;
            "
          ></button>
          <button
            class="mo-gnb-btn"
            type="button"
            aria-label="모든 메뉴 열기"
            aria-expanded="false"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
      <div class="dim" tabindex="-1" aria-hidden="true"></div>
      <div class="ui-gnb-wrap">
        <nav class="ui-gnb" role="navigation" aria-label="모바일 주 메뉴">
          <ul class="ui-depth1">
            <template v-for="(item, i) in $store.state.main_menu" :key="i">
              <li
                v-if="item.isMainMenu"
                :class="{
                  active: !$store.state.main_menu
                    .slice(0, i)
                    .some((it) => it.isMainMenu),
                }"
              >
                <p>{{ item.name }}</p>
                <ul class="ui-depth2">
                  <li
                    v-for="(item, k) in $store.state.main_menu[i].menu_dept1"
                    :key="'menu_' + k"
                  >
                    <a
                      href="javascript:void(0)"
                      @blur="item.isFocus = false"
                      @focus="item.isFocus = true"
                      @click="onSelect(item)"
                      @keydown.enter="onSelect(item)"
                      :title="item.path.startsWith('http') ? `새창열림` : ``"
                    >
                      {{ item.name }}
                      <i
                        class="icon-link"
                        title="새창이동"
                        v-if="item.path.startsWith('http')"
                      ></i>
                    </a>
                    <ul class="ui-depth3">
                      <li
                        v-for="(item, j) in $store.state.main_menu[i]
                          .menu_dept1[k].menu_dept2"
                        :key="j"
                      >
                        <a
                          href="javascript:void(0)"
                          @blur="item.isFocus = false"
                          @focus="item.isFocus = true"
                          @click="goMenu(item)"
                          @keydown.enter="goMenu(item)"
                          :title="
                            item.path.startsWith('http') ? `새창 열림` : ``
                          "
                        >
                          {{ item.name }}
                          <i
                            class="icon-link"
                            title="새창이동"
                            v-if="item.path.startsWith('http')"
                          ></i>
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </template>
          </ul>
        </nav>

        <div class="ui-quick-menu">
          <ul>
            <li>
              <a
                href="javascript:void(0)"
                @click="onLink('req_form')"
                @keydown.enter="onLink('req_form')"
              >
                <span v-html="$t('main_btn_민원서식안내')"></span
                ><i class="icon-civil"></i>
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                @click="
                  gotoURL('https://firesafety.eseoul.go.kr/multi/main.do')
                "
                @keydown.enter="
                  gotoURL('https://firesafety.eseoul.go.kr/multi/main.do')
                "
              >
                <span v-html="$t('main_btn_안전교육훈련예약신청')"></span>
                <i class="icon-safety"></i>
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                @click="onLink_Tab('req_multi_edu', 1)"
                @keydown.enter="onLink_Tab('req_multi_edu', 1)"
              >
                <span v-html="$t('main_btn_문의')"></span
                ><i class="icon-cal"></i>
              </a>
            </li>
          </ul>
          <div class="ui-service-tap">
            <button class="organizations-btn" aria-label="유관기관 보기">
              {{ $t("footer_link_title_2") }}<i class="icon-arrowright"></i>
            </button>
            <div class="select-wrap">
              <div class="select lang line">
                <select
                  name="language"
                  id="language"
                  :value="$i18n.locale"
                  @change="onLangChange"
                  aria-label="언어 선택"
                >
                  <option
                    v-for="(item, index) in sortedLangList"
                    :key="index"
                    :value="item.id"
                    :aria-label="item.title"
                  >
                    {{ item.cName }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="organizations-wrap" aria-hidden="true">
        <div class="title-area">
          <strong>{{ $t("footer_link_title_2") }}</strong>
          <button class="close-btn" aria-label="유관기관 닫기"></button>
        </div>
        <div class="organizations-cont">
          <!-- <a href="#">{{ $store.state.zU_Link[0]?.title }}</a> -->
          <ul>
            <li
              v-for="(item, index) in $store.state.zU_Link"
              :key="index"
              :value="index"
            >
              <a :href="item.cURL" target="_blank">{{ item.title }}</a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";

// ✅ Header 관련 초기화
function initializeHeaderEvents() {
  const pcHeaderItems = document.querySelectorAll(
    ".ui-pc-header .ui-depth1 li"
  );
  const pcHeader = document.querySelector(".ui-header");
  const dim = document.querySelector(".all-dim");

  pcHeaderItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      pcHeader?.classList.add("active");
      dim?.classList.add("active");

      const depthWrap = item.querySelector(".depth-wrap");
      if (depthWrap) {
        depthWrap.style.display = "block";
        depthWrap.style.transition = "all 0.2s";
      }

      item.parentElement.querySelectorAll(".depth-wrap").forEach((sibling) => {
        if (sibling !== depthWrap) {
          sibling.style.display = "none";
        }
      });
    });
  });

  pcHeader?.addEventListener("mouseleave", () => {
    pcHeader?.classList.remove("active");
    dim?.classList.remove("active");
    pcHeader.querySelectorAll(".depth-wrap").forEach((depthWrap) => {
      depthWrap.style.display = "none";
    });
  });

  document.querySelectorAll(".ui-search-input").forEach((input) => {
    input.addEventListener("focus", () => input.classList.add("active"));
    input.addEventListener("blur", () => {
      if (input.value === "") input.classList.remove("active");
    });
    input.addEventListener("input", () => {
      if (input.value !== "") input.classList.add("active");
      else input.classList.remove("active");
    });
  });

  const organizationsBtn = document.querySelector(
    ".ui-header .organizations-btn"
  );
  const organizationsWrap = document.querySelector(
    ".ui-header .organizations-wrap"
  );
  const organizationsClose = document.querySelector(
    ".ui-header .organizations-wrap .close-btn"
  );

  organizationsBtn?.addEventListener("click", () =>
    organizationsWrap?.classList.add("open")
  );
  organizationsClose?.addEventListener("click", () =>
    organizationsWrap?.classList.remove("open")
  );

  document
    .querySelectorAll(".ui-mo-header .ui-gnb .ui-depth1 > li")
    .forEach((item) => {
      item.addEventListener("click", () => {
        document
          .querySelectorAll(".ui-mo-header .ui-gnb .ui-depth1 > li")
          .forEach((sibling) => {
            sibling.classList.remove("active");
          });
        item.classList.add("active");
      });
    });

  const moGnbBtn = document.querySelector(".mo-gnb-btn");
  const moHeader = document.querySelector(".ui-mo-header");
  const moDim = document.querySelector(".ui-mo-header .dim");

  moGnbBtn?.addEventListener("click", () => {
    moHeader?.classList.toggle("open");
    document.documentElement.style.overflowY = moHeader?.classList.contains(
      "open"
    )
      ? "hidden"
      : "scroll";
  });

  moDim?.addEventListener("click", () => {
    moHeader?.classList.remove("active");
  });
}

// ✅ 컴포넌트 마운트 시 전체 초기화
onMounted(() => {
  initializeHeaderEvents();
});
</script>

<script>
import { EventBus } from "@/EventBus.js";

export default {
  data() {
    return {
      drawer: false,
      overlay: false,
      cData: "",
      isProcessing: false, // 네비이동
    };
  },

  mounted() {
    this.overlay = false;
    setTimeout(() => {
      let path = this.$route.path.substring(1);
      let menu = this.$store.state.main_menu;

      for (let i = 0; i < menu.length; i++) {
        for (let j = 0; j < menu[i].menu_dept1.length; j++) {
          if (menu[i].menu_dept1[j].path == path) {
            this.$store.state.now_nav_menu_idx = i;
            break;
          }

          if (menu[i].menu_dept1[j].path == "") {
            for (let k = 0; k < menu[i].menu_dept1[j].menu_dept2.length; k++) {
              if (menu[i].menu_dept1[j].menu_dept2[k].path == path) {
                this.$store.state.now_nav_menu_idx = i;
                break;
              }
            }
          }
        }
      }

      let oInterval = setInterval(() => {
        if (this.$refs.M4_Navigation_ref) {
          this.$refs.M4_Navigation_ref.setOpenGroup();
          clearInterval(oInterval);
        }
      }, 100);
    }, 100);
  },

  watch: {
    drawer(newVal) {
      if (!newVal) {
        this.overlay = false; // drawer가 false일 경우 overlay도 false로 설정
      }
    },
  },

  methods: {
    isMain() {
      return (
        (this.$route.path == "/" && !this.overlay) ||
        (this.$route.path == "/" && this.drawer)
      );
    },

    onEnterBtn(idx) {
      if (idx == 0) {
        setTimeout(() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }, 10);
      }

      if (navigator.maxTouchPoints == 0) {
        this.showMenu(idx);
      }
    },
    hideMenu() {
      const pcHeader = document.querySelector(".ui-header");
      const dim = document.querySelector(".all-dim");

      pcHeader?.classList.remove("active");
      dim?.classList.remove("active");
      pcHeader.querySelectorAll(".depth-wrap").forEach((depthWrap) => {
        depthWrap.style.display = "none";
      });

      const moHeader = document.querySelector(".ui-mo-header");
      moHeader?.classList.remove("open");
      document.documentElement.style.overflowY = moHeader?.classList.contains(
        "open"
      )
        ? "hidden"
        : "scroll";
    },
    // 해당 매뉴보여주기
    goMainMenu(data) {
      this.$store.state.now_main_menu_idx = data;
      // this.$store.state.now_main_menu_dept2_idx = 0;
      if (
        this.$store.state.main_menu[this.$store.state.now_main_menu_idx]
          .menu_dept1[0].path != ""
      ) {
        this.onSelect(
          this.$store.state.main_menu[this.$store.state.now_main_menu_idx]
            .menu_dept1[0]
        );
      } else {
        this.onSelect(
          this.$store.state.main_menu[this.$store.state.now_main_menu_idx]
            .menu_dept1[0].menu_dept2[0]
        );
      }

      this.hideMenu();
    },

    showMenu(data) {
      if (this.$store.state.now_main_menu_idx == data) {
        this.$store.state.now_main_menu_idx = -1;
        this.overlay = false;
        return;
      }
      this.$store.state.now_main_menu_idx = data;
      // this.$store.state.now_main_menu_dept2_idx = 0;
      this.overlay = true;
    },

    showMenuNav(data) {
      this.$store.state.now_nav_menu_idx = data;
      // this.$store.state.now_main_menu_dept2_idx = 0;
      this.overlay = true;

      // 하위 메뉴 컴포넌트의 첫 번째 메뉴 항목에 포커스 이동
      this.$nextTick(() => {
        const subMenu =
          this.$refs.M4_Navigation_ref.$el.querySelector('[tabindex="0"]');
        if (subMenu) subMenu.focus();
      });
    },

    on_main_logo() {
      this.$store.state.now_main_menu_idx = -1;
      this.overlay = false;
      EventBus.$emit("onNavigo", "/");
      this.hideMenu();
    },

    // dept_1 매뉴 선택시 (해당페이지로 이동)
    onSelect(item) {
      if (this.isProcessing) return;
      this.isProcessing = true;

      if (item.path != "") {
        this.$store.state.now_nav_menu_idx =
          this.$store.state.now_main_menu_idx;
        this.$store.state.now_main_menu_idx = -1;
        this.overlay = false;
        if (item.path.startsWith("http") || item.OPEN_BOOLEAN) {
          window.open(item.path, "_blank");
        } else {
          EventBus.$emit("onMenu", item.path);
        }
      }

      setTimeout(() => {
        this.isProcessing = false; // Adjust the delay as needed
      }, 1000);

      this.hideMenu();
    },

    // dept_2 매뉴 선택시 (해당페이지로 이동)
    goMenu(item) {
      if (this.isProcessing) return;
      this.isProcessing = true;

      this.$store.state.now_nav_menu_idx = this.$store.state.now_main_menu_idx;
      this.$store.state.now_main_menu_idx = -1;
      this.overlay = false;
      if (item.path.startsWith("http") || item.OPEN_BOOLEAN) {
        window.open(item.path, "_blank");
      } else {
        EventBus.$emit("onMenu", item.path);
      }

      setTimeout(() => {
        this.isProcessing = false;
      }, 1000); // Adjust the delay as needed

      this.hideMenu();
    },

    // 유관기관 링크이동
    // onOrganization(item) {
    //   window.open(this.$store.state.zU_Link[item.id].cURL, "_blank");
    // },

    onOrganization(index) {
      window.open(this.$store.state.zU_Link[index].cURL, "_blank");
    },

    onFocusEvent() {
      this.$store.state.now_main_menu_idx = -1;
      this.showMenu(-1);
    },
    // 언어변경
    onLang(item) {
      // let lang = this.$store.state.zLang[item.id].id;

      if (item.id != this.$i18n.locale) {
        localStorage.setItem("lang", item.id);
        this.$i18n.locale = item.id;
        window.location.reload();
      }
    },

    onLangChange(event) {
      const selectedId = event.target.value;
      const item = this.$store.state.zLang.find(
        (lang) => lang.id === selectedId
      );
      if (item) {
        this.onLang(item);
      } else {
        console.warn("선택된 언어를 찾을 수 없습니다.");
      }
    },

    // onLang(item) {
    //   let lang = this.$store.state.zLang[item.id].id;
    //   if (lang != this.$i18n.locale) {
    //     localStorage.setItem("lang", lang);
    //     this.$i18n.locale = lang;
    //     this.$vuetify.locale.current = lang;
    //     window.location.reload();
    //   }
    // },

    showMenuAll() {
      this.$store.state.now_main_menu_idx = -1;
      if (this.$store.state.now_nav_menu_idx == -1) {
        this.$store.state.now_nav_menu_idx = 0;
      }
      this.drawer = true;
    },

    getMenuBackColor(item) {
      if (this.$route.path == "/" && !this.overlay) {
        return this.$store.state.now_main_menu_idx == item.idx
          ? "menu_sel_main"
          : "menu_nor_main";
      } else {
        return this.$store.state.now_main_menu_idx == item.idx
          ? "sel_main"
          : "nor_main";
      }
    },

    getMenuColor(item) {
      if (this.$route.path == "/" && !this.overlay) {
        return this.$store.state.now_main_menu_idx == item.idx
          ? "menu_font_sel"
          : "menu_font_nor";
      } else {
        return this.$store.state.now_main_menu_idx == item.idx
          ? "font_sel"
          : "font_nor";
      }
    },

    goBack() {
      this.$store.state.now_main_menu_idx = -1;
      this.overlay = false;
    },

    focusMainMenu() {
      // ref를 통해 메인 메뉴 컨테이너 접근
      const mainMenuContainer = this.$refs.mainMenuContainer;
      if (!mainMenuContainer) {
        console.error("Main menu container not found!");
        return;
      }

      // 메인 메뉴 요소들 수집
      const mainMenuItems =
        mainMenuContainer.querySelectorAll(".main-menu-item");
      if (mainMenuItems.length > 0) {
        // 현재 활성화된 메인 메뉴 요소로 포커스 이동
        const activeIndex = this.$store.state.now_nav_menu_idx;
        const targetMenu = mainMenuItems[activeIndex] || mainMenuItems[0]; // 활성화된 메뉴가 없으면 첫 번째 메뉴로 이동
        if (targetMenu) {
          targetMenu.focus();
        }
      } else {
        console.error("No main menu items found!");
      }
    },

    handleMainMenuTab(event) {
      // 메인 메뉴 요소들 수집
      const mainMenuContainer = this.$refs.mainMenuContainer;
      const mainMenuItems =
        mainMenuContainer.querySelectorAll(".main-menu-item");
      // 현재 이벤트 대상
      const currentIndex = Array.from(mainMenuItems).indexOf(event.target);
      if (currentIndex === mainMenuItems.length - 1) {
        // 마지막 메인 메뉴 항목에서 빠져나가기
        console.log("Exiting main menu navigation.");
        this.drawer = false;
      }
    },
  },
  computed: {
    sortedLangList() {
      const current = this.$i18n.locale;
      const langs = [...this.$store.state.zLang];
      const currentIndex = langs.findIndex((lang) => lang.id === current);
      if (currentIndex !== -1) {
        const [currentLang] = langs.splice(currentIndex, 1);
        langs.unshift(currentLang); // 현재 언어를 맨 앞으로
      }
      return langs;
    },
  },
};
</script>

<style>
.all-dim {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  display: none;
}
.all-dim.active {
  display: block;
}
.ui-mo-header {
  display: none;
}
*:focus:not(.v-field__input):not(.v-input input):not(.v-input textarea):not(
    .v-field
  ) {
  border: none !important;
  outline: 1px dashed #d50136 !important;
}
input.ui-search-input {
  width: 300px;
  height: 48px;
  padding: 10px 50px 10px 16px;
  background-color: #fff;
  border-radius: 6px;
  background-image: url("/boramae/contents/search.svg");
  background-position: right 16px center;
  background-repeat: no-repeat;
}
input.ui-search-input::placeholder {
  color: #595959;
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}
input.ui-search-input.active {
  background-color: #002f67;
  background-image: url("/boramae/contents/search-white.svg");
  color: #fff;
}
input.ui-search-input.active::placeholder {
  color: #fff;
}
.ui-pc-header .ui-header .ui-search-btn {
  width: 28px;
  height: 28px;
  background-image: url("/boramae/contents/search.svg");
  background-size: cover;
}
.ui-header + .dim {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: -1;
  display: none;
}
.ui-header.active + .dim {
  display: block;
}

.ui-pc-header {
  position: relative;
  width: 100%;
  z-index: 999;
  transition: all 0.2s ease-in;
}
.ui-pc-header .ui-top-banner {
  height: 40px;
  background-color: #000;
}
.ui-pc-header .ui-top-banner .inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1240px;
  height: 100%;
  margin: 0 auto;
}
.ui-pc-header .ui-top-banner .inner .icon-flag {
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-right: 8px;
  background-image: url("/boramae/contents/flag.svg");
  background-size: cover;
  vertical-align: middle;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
.ui-pc-header .ui-top-banner .inner p {
  display: inline-block;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  text-decoration: none;
}
.ui-pc-header .ui-top-banner .inner .select .dropdown .current {
  background-color: #000;
  color: #ccc;
}

.ui-pc-header .ui-header {
  background-color: #f8f8f8;
}
.ui-pc-header .ui-header .inner {
  max-width: 1240px;
  margin: 0 auto;
  width: 100%;
}

.ui-pc-header .ui-header .ui-flex-wrap {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}
.ui-pc-header .ui-header .ui-flex-wrap h1 a {
  display: block;
}
.ui-pc-header .ui-header .ui-flex-wrap h1 img {
  vertical-align: top;
}

.ui-pc-header .ui-header .ui-flex-wrap .ui-quick-menu {
  display: flex;
  width: 100%;
  padding: 16px 0;
  height: 81px;
  border-bottom: 1px solid #eee;
  background: #fff;
}
.ui-pc-header .ui-header .ui-flex-wrap .ui-quick-menu .inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 20px;
}
.ui-pc-header .ui-header .ui-flex-wrap .ui-quick-menu .inner .ui-menu-list {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.ui-pc-header
  .ui-header
  .ui-flex-wrap
  .ui-quick-menu
  .inner
  .ui-menu-list
  .select {
  position: relative;
  display: inline-block;
}
.ui-pc-header
  .ui-header
  .ui-flex-wrap
  .ui-quick-menu
  .inner
  .ui-menu-list
  .select.lang {
  padding-right: 24px;
  font-weight: 500;
}
.ui-pc-header
  .ui-header
  .ui-flex-wrap
  .ui-quick-menu
  .inner
  .ui-menu-list
  .select.lang::after {
  display: block;
  content: "";
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  background-image: url("/boramae/contents/globe.svg");
  background-repeat: no-repeat;
  width: 16px;
  height: 16px;
}
.ui-pc-header .ui-header .ui-flex-wrap .ui-menu-list .select.lang .current {
  padding-right: 0;
}
.ui-pc-header .ui-header .ui-flex-wrap .ui-menu-list .select.lang .icon-select {
  display: none;
}
.ui-pc-header
  .ui-header
  .ui-flex-wrap
  .ui-quick-menu
  .inner
  .ui-menu-list
  .select
  + .select {
  position: relative;
  margin-left: 16px;
  padding-left: 17px;
}
.ui-pc-header
  .ui-header
  .ui-flex-wrap
  .ui-quick-menu
  .inner
  .ui-menu-list
  .select
  + .select::before {
  display: block;
  content: "";
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  width: 1px;
  height: 12px;
  background-color: #ddd;
}
/* 20250508 // */
.ui-pc-header
  .ui-header
  .ui-flex-wrap
  .ui-quick-menu
  .inner
  .ui-menu-list
  .home-btn {
  display: inline-block;
  padding: 0 10px;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  line-height: 32px;
  text-decoration: none;
  background-color: #000;
  border-radius: 4px;
  margin-left: 20px;
}
.ui-pc-header
  .ui-header
  .ui-flex-wrap
  .ui-quick-menu
  .inner
  .ui-menu-list
  .home-btn
  .icon-home {
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-bottom: 3px;
  margin-left: 8px;
  background-image: url("/boramae/contents/home.svg");
  background-size: cover;
  vertical-align: middle;
}
/* // 20250508 */

.ui-pc-header .ui-header .ui-flex-wrap .ui-search {
  display: flex;
  align-items: center;
  gap: 32px;
}

.ui-pc-header .ui-header .ui-flex-wrap .ui-search .ui-all-menu-btn {
  position: relative;
  width: 28px;
  height: 28px;
}
.ui-pc-header .ui-header .ui-flex-wrap .ui-search .ui-all-menu-btn span {
  position: absolute;
  display: block;
  width: 26px;
  height: 2px;
  background-color: #1d1d1d;
  border-radius: 99px;
  left: 50%;
  transform: translateX(-50%);
}
.ui-pc-header
  .ui-header
  .ui-flex-wrap
  .ui-search
  .ui-all-menu-btn
  span:nth-child(1) {
  top: 4px;
}
.ui-pc-header
  .ui-header
  .ui-flex-wrap
  .ui-search
  .ui-all-menu-btn
  span:nth-child(2) {
  top: 50%;
  transform: translateY(-50%) translateX(-50%);
}
.ui-pc-header
  .ui-header
  .ui-flex-wrap
  .ui-search
  .ui-all-menu-btn
  span:nth-child(3) {
  bottom: 4px;
}

.ui-pc-header .ui-header .ui-flex-wrap .ui-gnb {
  position: relative;
  height: 100%;
  width: 100%;
  border-bottom: 1px solid #eee;
}
.ui-pc-header .ui-header .ui-flex-wrap .ui-gnb > .inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 20px;
}
.ui-pc-header .ui-header .ui-flex-wrap .ui-gnb .ui-depth1 {
  display: flex;
  align-items: center;
  padding-left: 0;
  height: 60px;
}
.ui-pc-header .ui-header .ui-flex-wrap .ui-gnb .ui-depth1 > li {
  list-style: none;
  padding: 0 22px;
}
.ui-pc-header .ui-header .ui-flex-wrap .ui-gnb .ui-depth1 > li:first-of-type {
  padding-left: 0;
}
.ui-pc-header .ui-header .ui-flex-wrap .ui-gnb .ui-depth1 > li > a {
  display: inline-block;
  color: #111;
  font-size: 17px;
  font-weight: 500;
  line-height: 32px;
  text-decoration: none;
}

.ui-pc-header .ui-header .ui-flex-wrap .ui-gnb .depth-wrap {
  position: absolute;
  top: 61px;
  left: 0;
  width: 100vw;
  background-color: #fff;
  display: none;
  min-height: 240px;
}
.ui-pc-header .ui-header .ui-flex-wrap .ui-gnb .depth-wrap .ui-flex-wrap {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: row;
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 20px;
}
.ui-pc-header .ui-header .ui-flex-wrap .ui-gnb .depth-wrap .ui-flex-wrap h3 {
  width: 172px;
  padding: 40px 32px 0 0;
  font-size: 32px;
  font-weight: 700;
  line-height: 44px;
  word-break: auto-phrase;
}

.ui-pc-header .ui-header .ui-flex-wrap .ui-gnb .ui-depth2 {
  padding: 48px 0 60px 32px;
  display: flex;
  flex-wrap: wrap;
  gap: 60px 40px;
  border-left: 1px solid #eee;
  width: calc(100% - 172px);
  min-height: 240px;
}
.ui-pc-header .ui-header .ui-flex-wrap .ui-gnb .ui-depth2 > li {
  list-style: none;
  width: 100%;
  max-width: 166px;
  word-break: keep-all;
}
.ui-pc-header .ui-header .ui-flex-wrap .ui-gnb .ui-depth2 > li > a {
  color: #000;
  font-size: 18px;
  font-weight: 700;
  line-height: 28px;
  text-decoration: none;
}
.ui-pc-header
  .ui-header
  .ui-flex-wrap
  .ui-gnb
  .ui-depth2
  > li
  > a:has(.icon-link) {
  position: relative;
  display: inline-block;
}
.ui-pc-header .ui-header .ui-flex-wrap .ui-gnb .ui-depth2 > li > a .icon-link {
  position: absolute;
  top: 4px;
  right: -28px;
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-left: 6px;
  margin-bottom: 2px;
  background-image: url("/boramae/contents/link-black.svg");
  background-size: 20px 20px;
  vertical-align: middle;
  background-position: center;
}
.ui-pc-header .ui-header .ui-flex-wrap .ui-gnb .ui-depth3 {
  margin-top: 20px;
  padding-left: 0;
  text-align: left;
}
.ui-pc-header .ui-header .ui-flex-wrap .ui-gnb .ui-depth3 > li {
  list-style: none;
}
.ui-pc-header .ui-header .ui-flex-wrap .ui-gnb .ui-depth3 > li + li {
  margin-top: 16px;
}
.ui-pc-header .ui-header .ui-flex-wrap .ui-gnb .ui-depth3 > li > a {
  color: #595959;
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  text-decoration: none;
}

.ui-pc-header .ui-all-menu {
  width: 100vw;
  height: calc(100vh - 42px);
  position: fixed;
  top: 42px;
  left: 0;
  background-color: #fff;
  z-index: 999;
  overflow-y: scroll;
  display: none;
}
.ui-pc-header .ui-all-menu.active {
  display: block;
}
.ui-pc-header .ui-all-menu .inner {
  position: relative;
  max-width: 1240px;
  margin: 0 auto;
  padding: 60px 0 20px;
}
.ui-pc-header .ui-all-menu .title-area h2 {
  color: #002f67;
  font-size: 48px;
  font-weight: 700;
  line-height: 62px;
}
.ui-pc-header .ui-all-menu .title-area p {
  margin-top: 8px;
  color: #444;
  font-size: 18px;
  font-weight: 500;
  line-height: 28px;
}
.ui-pc-header .ui-all-menu .title-area button.close-btn {
  position: absolute;
  right: 0;
  top: 32px;
  width: 28px;
  height: 28px;
  background-image: url("/boramae/contents/close.svg");
  background-repeat: no-repeat;
}
.ui-pc-header .ui-all-menu .title-area button.close-btn .blind {
  font-size: 0;
  text-indent: -999px;
  display: block;
  overflow: hidden;
}
.ui-pc-header .ui-all-menu .tab-area {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px 0 0 0;
}
.ui-pc-header .ui-all-menu .tab-area ul {
  list-style: none;
  padding-left: 0;
  font-size: 0;
}
.ui-pc-header .ui-all-menu .tab-area ul li {
  display: inline-block;
  position: relative;
}
.ui-pc-header .ui-all-menu .tab-area ul li + li {
  margin-left: 32px;
  padding-left: 33px;
}
.ui-pc-header .ui-all-menu .tab-area ul li + li::before {
  content: "";
  display: inline-block;
  width: 1px;
  height: 14px;
  background-color: #ccc;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}
.ui-pc-header .ui-all-menu .tab-area ul li a {
  text-decoration: none;
  color: #000;
  font-size: 18px;
  font-weight: 700;
  line-height: 28px;
}
.ui-pc-header .ui-all-menu .tab-area ul li .icon-civil {
  display: inline-block;
  width: 18px;
  height: 20px;
  margin-bottom: 3px;
  margin-left: 8px;
  background-image: url("/boramae/contents/civil.svg");
  background-size: cover;
  vertical-align: middle;
}
.ui-pc-header .ui-all-menu .tab-area ul li .icon-safety {
  display: inline-block;
  width: 20px;
  height: 19px;
  margin-bottom: 3px;
  margin-left: 8px;
  background-image: url("/boramae/contents/safety.svg");
  background-size: cover;
  vertical-align: middle;
}
.ui-pc-header .ui-all-menu .tab-area ul li .icon-cal {
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-bottom: 3px;
  margin-left: 8px;
  background-image: url("/boramae/contents/calender.svg");
  background-size: cover;
  vertical-align: middle;
}

.ui-pc-header .ui-all-menu .ui-all-menu-gnb {
  margin-top: 32px;
}
.ui-pc-header .ui-all-menu .ui-all-menu-gnb ul {
  list-style: none;
  padding-left: 0;
}
.ui-pc-header .ui-all-menu .ui-all-menu-gnb h3 {
  font-size: 32px;
  font-weight: 700;
  line-height: 44px;
}
.ui-pc-header .ui-all-menu .ui-all-menu-gnb .ui-depth1 a {
  text-decoration: none;
}
.ui-pc-header .ui-all-menu .ui-all-menu-gnb .ui-depth1 > li {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 32px;
  border-top: 1px solid #444;
  padding: 48px 0 60px;
}
.ui-pc-header .ui-all-menu .ui-all-menu-gnb .ui-depth1 > li > h3 {
  width: 172px;
}
.ui-pc-header .ui-all-menu .ui-all-menu-gnb .ui-depth2 {
  display: flex;
  gap: 60px 40px;
  width: calc(100% - 204px);
  flex-wrap: wrap;
}
.ui-pc-header .ui-all-menu .ui-all-menu-gnb .ui-depth2 > li {
  list-style: none;
  width: 100%;
  width: 166px;
  word-break: keep-all;
}
.ui-pc-header .ui-all-menu .ui-all-menu-gnb .ui-depth2 > li > a {
  color: #000;
  font-size: 18px;
  font-weight: 700;
  line-height: 28px;
  text-decoration: none;
}
.ui-pc-header .ui-all-menu .ui-all-menu-gnb .ui-depth3 {
  margin-top: 20px;
  padding-left: 0;
  text-align: left;
}
.ui-pc-header .ui-all-menu .ui-all-menu-gnb .ui-depth3 > li {
  list-style: none;
}
.ui-pc-header .ui-all-menu .ui-all-menu-gnb .ui-depth3 > li + li {
  margin-top: 16px;
}
.ui-pc-header .ui-all-menu .ui-all-menu-gnb .ui-depth3 > li > a {
  color: #595959;
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  text-decoration: none;
}
.ui-pc-header .ui-all-menu .bottom {
  height: 88px;
  width: 100%;
  background-color: #f7f7f7;
}

/* select */
.select {
  height: 44px;
}
.select ul {
  padding: 4px 0;
  margin: 0;
  list-style: none;
}
.select.line {
  height: 24px;
}
.select.line .dropdown {
  height: 24px;
  width: fit-content;
  line-height: 24px;
  text-align: right;
}
.select.line .dropdown .current {
  text-align: left;
  border: none;
  padding-right: 20px;
  padding-left: 8px;
  background-color: #ffffff;
  font-weight: 500;
}
.select.line .dropdown .list {
  top: calc(100% + 8px);
  left: auto;
  right: -9px;
  border: none;
  background-color: rgba(255, 255, 255, 0.98);
  border-radius: 4px;
  width: max-content;
  box-shadow: 1px 4px 10px 0px rgba(0, 0, 0, 0.2);
}
/* 20250508 // */
.select.line .dropdown .list .option {
  text-align: right;
  background-color: rgba(255, 255, 255, 0.98);
  padding: 0;
  text-align: center;
}
.select.line.lang .dropdown .list .option {
  padding: 8px 12px;
}
.select.line .dropdown .list .option a {
  padding: 8px 12px;
  text-decoration: none;
}
/* // 20250508 */
.select.line .dropdown .list .option.selected {
  color: #002f67;
}
.select.line .dropdown.open .icon-select {
  transform: rotate(180deg);
}
.select.line .dropdown .icon-select {
  width: 16px;
  height: 24px;
  transform: rotate(0);
  right: 0;
}

.select select {
  display: none;
}
.select .dropdown {
  position: relative;
  display: block;
  width: auto;
  height: 44px;
  line-height: 42px;
  color: #595959;
  font-size: 14px;
  text-align: left;
  white-space: nowrap;
  background-color: transparent;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  transition: all 0.2s ease-in-out;
}
.select .dropdown .icon-select {
  position: absolute;
  top: 0;
  left: auto;
  right: 2px;
  width: 38px;
  height: 42px;
  transition: all 0.125s ease-in-out;
  pointer-events: none;
  transform: rotate(180deg);
}
.select .dropdown .icon-select::after {
  background-image: url("/boramae/contents/arrow-down.svg");
  display: inline-block;
  background-repeat: no-repeat;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  content: "";
  width: 50px;
  height: 50px;
  background-position: center center;
}
.select .dropdown.active .current {
  color: #595959;
}
.select .dropdown .current {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  padding: 0 38px 0 15px;
  border-radius: 4px;
  color: #595959;
  border: 1px solid #dddddd;
  background-color: #ffffff;
  transition: all 0.2s ease-in-out;
}
.select .dropdown .list {
  position: absolute;
  top: calc(100% - 2px);
  left: 0;
  right: 0;
  border: 1px solid #2550d8;
  border-top: 0;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  background-color: #ffffff;
  transition: all 0.15s cubic-bezier(0.25, 0, 0.25, 1.75), opacity 0.1s linear;
  transform-origin: 50% 0;
  opacity: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 20;
}
.select .dropdown .list .scrollbar {
  padding-bottom: 6px;
}
/* 20250508 // */
.select .dropdown .list .option {
  position: relative;
  padding: 9px 15px;
  font-weight: 500;
  line-height: 24px;
  color: #9a9a9a;
  text-align: left;
  white-space: normal;
  background-color: #ffffff;
  cursor: default;
  transition: all 0.2s;
}
.select .dropdown .list .option a {
  font-weight: 500;
  line-height: 24px;
  color: #9a9a9a;
  text-decoration: none;
  display: block;
}
/* // 20250508 */
.select .dropdown .list .option:last-child {
  border-bottom: none;
}
.select .dropdown .list .option:hover,
.select .dropdown .list .option.selected {
  color: #002f67;
}
.select .dropdown .list .option.disabled {
  color: #8f97b2;
  background-color: #e6ecf3;
  cursor: default;
}
.select .dropdown .list .option.select-ti {
  display: none;
}
.select .dropdown.open.dropdown .current {
  border-color: #2550d8;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom: 0;
  box-shadow: none;
}
.select .dropdown.open .icon-select {
  transform: rotate(0);
}
.select .dropdown.open .list {
  opacity: 1;
  pointer-events: auto;
}
.select .dropdown.open .option {
  cursor: pointer;
}

.select.disabled .dropdown {
  background-color: #e8ebf3;
  border-color: #e8ebf3;
  pointer-events: none;
}
.select.disabled .dropdown .current {
  color: #aeb4c3;
  border-color: transparent;
  background-color: transparent;
}
.select.disabled .dropdown .list {
  display: none;
}

.select.small {
  height: 40px;
}
.select.small .dropdown {
  height: 40px;
  line-height: 38px;
}
.select.small .dropdown .icon-select {
  height: 40px;
}

/* Accordion CSS */
.list-accordion {
  border-top: 1px solid #eee;
}
.list-accordion .accordion-ti {
  position: relative;
  display: block;
  padding: 16px 20px;
  width: 100%;
  color: #000;
  font-size: 16px;
  font-weight: 700;
  line-height: 26px;
  text-align: left;
  cursor: pointer;
  background-color: #fff;
}
.list-accordion .accordion-ti::after {
  position: absolute;
  top: 50%;
  right: 0px;
  transform: translate(0, -50%);
  background-image: url("/boramae/contents/accordion-arrow.svg");
  display: inline-block;
  background-repeat: no-repeat;
  content: "";
  width: 50px;
  height: 50px;
  transition: all 0.2s ease-in-out;
  background-position: center;
}
.list-accordion .accordion-cont {
  position: relative;
  line-height: 24px;
  color: #000;
  background-color: #f8f8f8;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
}
.list-accordion .accordion-cont > .scroll-content {
  padding: 12px 32px;
  max-height: 280px;
}
.list-accordion > ul {
  padding-left: 0;
  list-style: none;
}
.list-accordion > ul > li {
  position: relative;
  border-bottom: 1px solid #eee;
}
.list-accordion > ul > li.active .accordion-ti {
  font-weight: 700;
}
.list-accordion > ul > li.active .accordion-ti::after {
  transform: translate(0, -50%) rotate(180deg);
}
.list-accordion > ul > li.active .accordion-cont {
  max-height: 280px;
}
.list-accordion.faq {
  border-top: 1px solid #d9d9d9;
}
@media screen and (max-width: 1240px) {
  .ui-pc-header {
    display: none;
  }
  .ui-mo-header {
    display: block;
  }
  .ui-mo-header.active .ui-header .ui-header-top .search-btn {
    background-image: url("/boramae/contents/close.svg");
  }
  .ui-mo-header.active .dim {
    display: block;
  }
  .ui-mo-header.open .ui-header .ui-gnb-wrap {
    display: block;
  }
  .ui-mo-header.open .ui-header .ui-header-top .mo-gnb-btn span:nth-child(1) {
    top: 6px;
    transform: rotate(45deg);
    width: 28px;
  }
  .ui-mo-header.open .ui-header .ui-header-top .mo-gnb-btn span:nth-child(2) {
    opacity: 0;
  }
  .ui-mo-header.open .ui-header .ui-header-top .mo-gnb-btn span:nth-child(3) {
    bottom: 6px;
    transform: rotate(-45deg);
    width: 28px;
  }

  .ui-mo-header .organizations-wrap.open {
    display: block;
  }
  .ui-mo-header .organizations-wrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #fff;
    display: none;
    overflow-y: scroll;
  }
  .ui-mo-header .organizations-wrap .title-area {
    padding: 20px;
    display: flex;
    justify-content: space-between;
  }
  .ui-mo-header .organizations-wrap .title-area .close-btn {
    background-image: url("/boramae/contents/close.svg");
    width: 28px;
    height: 28px;
  }
  .ui-mo-header .organizations-wrap .title-area strong {
    font-size: 18px;
    font-weight: 700;
    line-height: 28px;
  }
  .ui-mo-header .organizations-wrap .organizations-cont {
    padding: 20px;
  }
  .ui-mo-header .organizations-wrap .organizations-cont > a {
    position: relative;
    display: block;
    width: 100%;
    font-size: 16px;
    font-weight: 700;
    line-height: 44px;
    background-color: #000;
    color: #fff;
    text-decoration: none;
    border-radius: 6px;
    padding: 0 16px;
  }
  .ui-mo-header .organizations-wrap .organizations-cont > a::after {
    display: block;
    content: "";
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
    background-image: url("/boramae/contents/home.svg");
    background-repeat: no-repeat;
    width: 20px;
    height: 20px;
    background-size: cover;
  }
  .ui-mo-header .organizations-wrap .organizations-cont ul {
    margin-top: 0;
    padding-left: 0;
    list-style: none;
  }
  .ui-mo-header .organizations-wrap .organizations-cont a + ul {
    margin-top: 24px;
  }
  .ui-mo-header .organizations-wrap ul li + li {
    margin-top: 16px;
  }
  .ui-mo-header .organizations-wrap ul li {
    padding: 0 6px;
  }
  .ui-mo-header .organizations-wrap ul li a {
    color: #000;
    text-decoration: none;
    font-size: 16px;
    font-weight: 500;
    line-height: 26px;
  }

  .ui-mo-header .ui-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    z-index: 999;
  }
  .ui-mo-header .ui-header .ui-header-top {
    padding: 14px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 56px;
    border-bottom: 1px solid #eee;
  }
  .ui-mo-header .ui-header .ui-header-top > h1 {
    height: 28px;
  }
  .ui-mo-header .ui-header .ui-header-top > h1 a {
    display: inline-block;
    height: 100%;
  }
  .ui-mo-header .ui-header .ui-header-top > h1 img {
    vertical-align: top;
    height: 100%;
  }
  .ui-mo-header .ui-header .ui-header-top .menu-area {
    height: 24px;
    vertical-align: top;
  }
  .ui-mo-header .ui-header .ui-header-top .search-btn {
    width: 24px;
    height: 24px;
    background-image: url("/boramae/contents/search.svg");
    background-size: 24px;
    margin-right: 20px;
  }
  .ui-mo-header .ui-header .ui-header-top .mo-gnb-btn {
    position: relative;
    width: 24px;
    height: 24px;
    vertical-align: top;
  }
  .ui-mo-header .ui-header .ui-header-top .mo-gnb-btn span {
    position: absolute;
    display: block;
    width: 22px;
    height: 2px;
    background-color: #1d1d1d;
    border-radius: 99px;
    left: 2;
    transition: all 0.2s ease-in;
  }
  .ui-mo-header .ui-header .ui-header-top .mo-gnb-btn span:nth-child(1) {
    top: 4px;
    transform-origin: 25% 50%;
  }
  .ui-mo-header .ui-header .ui-header-top .mo-gnb-btn span:nth-child(2) {
    top: 50%;
    transform: translateY(-50%);
  }
  .ui-mo-header .ui-header .ui-header-top .mo-gnb-btn span:nth-child(3) {
    bottom: 4px;
    transform-origin: 25% 50%;
  }
  .ui-mo-header .dim {
    position: fixed;
    top: 56px;
    left: 0;
    width: 100vw;
    height: calc(100vh - 56px);
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
    display: none;
  }

  .ui-mo-header .ui-header .ui-gnb-wrap {
    position: relative;
    display: none;
  }
  .ui-mo-header .ui-header .ui-gnb {
    border-bottom: 1px solid #eee;
  }
  .ui-mo-header .ui-header .ui-gnb .ui-depth1 {
    padding-left: 0;
    width: 125px;
    background-color: #f0f6ff;
    height: calc(100dvh - 250px);
    overflow-y: scroll;
  }
  .ui-mo-header .ui-header .ui-gnb .ui-depth1::-webkit-scrollbar {
    display: none;
  }
  .ui-mo-header .ui-header .ui-gnb .ui-depth1 > li {
    padding: 20px 20px;
    list-style: none;
  }
  .ui-mo-header .ui-header .ui-gnb .ui-depth1 > li > p {
    color: #000;
    font-size: 16px;
    font-weight: 500;
    line-height: 26px;
    cursor: pointer;
  }
  .ui-mo-header .ui-header .ui-gnb .ui-depth1 .ui-depth2 {
    position: absolute;
    left: 125px;
    top: 0;
    width: calc(100% - 125px);
    padding: 4px 20px;
    height: calc(100dvh - 286px);
    overflow-y: scroll;
    background-color: #fff;
    display: none;
  }
  .ui-mo-header .ui-header .ui-gnb .ui-depth1 .ui-depth2::-webkit-scrollbar {
    display: none;
  }
  .ui-mo-header .ui-header .ui-gnb .ui-depth1 .ui-depth2 > li {
    list-style: none;
    padding: 16px 0;
  }
  .ui-mo-header .ui-header .ui-gnb .ui-depth1 .ui-depth2 > li + li {
    border-top: 1px solid #eee;
  }
  .ui-mo-header .ui-header .ui-gnb .ui-depth1 .ui-depth2 > li > a {
    text-decoration: none;
    color: #000;
    font-size: 14px;
    font-weight: 700;
    line-height: 24px;
    display: block;
  }
  .ui-mo-header .ui-header .ui-gnb .ui-depth1 .ui-depth2 > li > a .icon-link {
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-left: 6px;
    margin-bottom: 2px;
    background-image: url("/boramae/contents/link-black.svg");
    background-size: 16px 16px;
    vertical-align: middle;
    background-position: center;
  }
  .ui-mo-header
    .ui-header
    .ui-gnb
    .ui-depth1
    .ui-depth2
    > li
    > a:has(.icon-link)
    br {
    display: none;
  }
  .ui-mo-header .ui-header .ui-gnb .ui-depth1 .ui-depth2 > li .ui-depth3 {
    padding-left: 0;
    margin-top: 12px;
  }
  .ui-mo-header .ui-header .ui-gnb .ui-depth1 .ui-depth2 > li .ui-depth3 > li {
    list-style: none;
  }
  .ui-mo-header
    .ui-header
    .ui-gnb
    .ui-depth1
    .ui-depth2
    > li
    .ui-depth3
    > li
    + li {
    margin-top: 10px;
  }
  .ui-mo-header
    .ui-header
    .ui-gnb
    .ui-depth1
    .ui-depth2
    > li
    .ui-depth3
    > li
    > a {
    text-decoration: none;
    color: #595959;
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
  }

  .ui-mo-header .ui-header .ui-gnb .ui-depth1 > li.active > p {
    color: #002f67;
    font-weight: 700;
  }
  .ui-mo-header .ui-header .ui-gnb .ui-depth1 > li.active .ui-depth2 {
    display: block;
  }
  .ui-mo-header .ui-quick-menu > ul {
    padding: 24px 20px;
    list-style-type: none;
  }
  .ui-mo-header .ui-quick-menu > ul li + li {
    margin-top: 16px;
  }
  .ui-mo-header .ui-quick-menu > ul li a {
    text-decoration: none;
    color: #444;
    font-size: 16px;
    font-weight: 700;
    line-height: 26px;
  }
  .ui-mo-header .ui-quick-menu > ul li .icon-civil {
    display: inline-block;
    width: 12px;
    height: 14px;
    margin-bottom: 3px;
    margin-left: 6px;
    background-image: url("/boramae/contents/mo-civil.svg");
    background-size: cover;
    vertical-align: middle;
  }
  .ui-mo-header .ui-quick-menu > ul li .icon-safety {
    display: inline-block;
    width: 14px;
    height: 13px;
    margin-bottom: 3px;
    margin-left: 6px;
    background-image: url("/boramae/contents/mo-safety.svg");
    background-size: cover;
    vertical-align: middle;
  }
  .ui-mo-header .ui-quick-menu > ul li .icon-cal {
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-bottom: 3px;
    margin-left: 6px;
    background-image: url("/boramae/contents/mo-calender.svg");
    background-size: cover;
    vertical-align: middle;
  }
  .ui-mo-header .ui-quick-menu .ui-service-tap {
    padding: 6px 20px;
    background-color: #f8f8f8;
    display: flex;
  }
  .ui-mo-header .ui-quick-menu .ui-service-tap button {
    width: 50%;
    color: #595959;
    font-size: 14px;
    font-weight: 500;
    line-height: 24px;
  }
  .ui-mo-header .ui-quick-menu .ui-service-tap button .icon-arrowright {
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-left: 6px;
    margin-bottom: 2px;
    background-image: url("/boramae/contents/mo-arrow-right.svg");
    background-size: 5px 10px;
    vertical-align: middle;
    background-position: center;
  }
  .ui-mo-header .ui-quick-menu .ui-service-tap .select-wrap {
    width: 50%;
    position: relative;
    display: inline-block;
  }
  .ui-mo-header .ui-quick-menu .ui-service-tap .select-wrap::before {
    display: block;
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 1px;
    height: 12px;
    background-color: #ddd;
  }
  .ui-mo-header .ui-quick-menu .ui-service-tap .select.line .dropdown {
    width: min-content;
    text-align: center;
    margin: 0 auto;
  }
  .ui-mo-header
    .ui-quick-menu
    .ui-service-tap
    .select.line
    .dropdown
    .icon-select {
    display: none;
  }
  .ui-mo-header .ui-quick-menu .ui-service-tap .select.line .dropdown .current {
    background-color: transparent;
  }
  .ui-mo-header .ui-quick-menu .ui-service-tap .select.line .dropdown .list {
    top: auto;
    bottom: calc(100% + 8px);
  }
  .ui-mo-header .ui-quick-menu .ui-service-tap .select.lang .current::after {
    display: block;
    content: "";
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    background-image: url("/boramae/contents/globe.svg");
    background-repeat: no-repeat;
    width: 16px;
    height: 16px;
  }
  .ui-mo-header .ui-quick-menu .home-btn {
    display: block;
    padding: 0 20px;
    background-color: #000;
    color: #eee;
    font-size: 14px;
    font-weight: 500;
    line-height: 36px;
    text-decoration: none;
    text-align: center;
  }
  .ui-mo-header .ui-quick-menu .home-btn .icon-home {
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-bottom: 3px;
    margin-left: 8px;
    background-image: url("/boramae/contents/home.svg");
    background-size: cover;
    vertical-align: middle;
  }
}
</style>

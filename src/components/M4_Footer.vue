<template>
  <footer class="ui-footer">
    <div class="organizations-wrap">
      <div class="title">
        <strong>관련사이트</strong>
        <button class="close-btn"></button>
      </div>
      <div class="list-accordion">
        <ul>
          <li>
            <button type="button" class="accordion-ti">
              {{ $t("footer_link_title_1") }}
            </button>
            <div class="accordion-cont scrollbar">
              <div class="scroll-content">
                <ul>
                  <li
                    v-for="(item, index) in $store.state.zS_Link"
                    :key="index"
                    :value="index"
                  >
                    <a
                      :href="item.cURL"
                      target="_blank"
                      :aria-label="item.title + ' 새창열림'"
                      rel="noopener noreferrer"
                      >{{ item.title }}</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </li>

          <li>
            <button type="button" class="accordion-ti">
              {{ $t("footer_link_title_2") }}
            </button>
            <div class="accordion-cont scrollbar">
              <div class="scroll-content">
                <ul>
                  <li
                    v-for="(item, index) in $store.state.zU_Link"
                    :key="index"
                    :value="index"
                  >
                    <a
                      :href="item.cURL"
                      target="_blank"
                      :aria-label="item.title + ' 새창열림'"
                      rel="noopener noreferrer"
                      >{{ item.title }}</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </li>

          <li>
            <button type="button" class="accordion-ti">
              {{ $t("footer_link_title_3") }}
            </button>
            <div class="accordion-cont scrollbar">
              <div class="scroll-content">
                <ul>
                  <li
                    v-for="(item, index) in $store.state.zD_Link"
                    :key="index"
                    :value="index"
                  >
                    <a
                      :href="item.cURL"
                      target="_blank"
                      :aria-label="item.title + ' 새창열림'"
                      rel="noopener noreferrer"
                      >{{ item.title }}</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li>
            <button type="button" class="accordion-ti">
              {{ $t("footer_link_title_4") }}
            </button>
            <div class="accordion-cont scrollbar">
              <div class="scroll-content">
                <ul class="type2">
                  <li
                    v-for="(item, index) in $store.state.zI_Link"
                    :key="index"
                    :value="index"
                  >
                    <a
                      :href="item.cURL"
                      target="_blank"
                      :aria-label="item.title + ' 새창열림'"
                      rel="noopener noreferrer"
                      >{{ item.title }}</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="footer-inner">
      <div class="footer-flex-wrap">
        <div class="left">
          <img
            src="/boramae/contents/main-logo-blue.svg"
            alt="119 Seoul Fire Services 서울소방, 서울소방재난본부 Seoul Metropolitan Fire Disaster Headquarters"
            class="footer-logo"
          />
          <ul class="policy">
            <li>
              <button
                :title="$t('footer_info_1')"
                @click="
                  onfooter_gotourl(
                    firemainSiteUrl + '/guide_personal_info_process_policy'
                  )
                "
              >
                <strong>{{ $t("footer_info_1") }}</strong>
              </button>
            </li>
            <li>
              <button
                :title="$t('footer_info_2')"
                @click="
                  onfooter_gotourl(
                    firemainSiteUrl + '/guide_cctv_operation_policy'
                  )
                "
              >
                {{ $t("footer_info_2") }}
              </button>
            </li>
          </ul>

          <div>
            <div class="address-area">
              <p>
                {{ $store.state.cADDR }}
              </p>
              <p>{{ $t("footer_info_4") }} : {{ $store.state.cDayTelInfo }}</p>
            </div>
          </div>

          <p class="copyright">
            COPYRIGHTⓒ {{ new Date().getFullYear() }} {{ $t("footer_info_5") }}.
            ALL RIGHTS RESERVED.
          </p>
        </div>

        <div class="right">
          <img
            src="/boramae/contents/seoul-2-logo.svg"
            alt="동행매력 특별시서울"
          />
          <div class="btn-area">
            <button class="organizations-btn">
              관련 사이트<i class="icon icon-link"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="banner">
      <div class="inner">
        <p><i class="icon-flag"></i>{{ $t("footer_info_6") }}.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";

// ✅ 푸터 관련 버튼 이벤트
function setupFooterEvents() {
  const openBtn = document.querySelector(".ui-footer .organizations-btn");
  const closeBtn = document.querySelector(
    ".ui-footer .organizations-wrap .close-btn"
  );
  const wrap = document.querySelector(".ui-footer .organizations-wrap");
  const dim = document.querySelector(".all-dim");

  openBtn?.addEventListener("click", () => {
    dim?.classList.add("active");
    document.documentElement.style.overflow = "hidden";
    wrap?.classList.add("open");
  });

  closeBtn?.addEventListener("click", () => {
    dim?.classList.remove("active");
    document.documentElement.style.overflowY = "scroll";
    wrap?.classList.remove("open");
  });
}

// ✅ 컴포넌트 마운트 시 전체 초기화
onMounted(() => {
  setupFooterEvents();
});
</script>

<script>
import { EventBus } from "@/EventBus.js";

export default {
  data: () => ({
    firemainSiteUrl: import.meta.env.VITE_FIREMAIN_SITE_URL,
  }),

  mounted() {},

  methods: {
    onfooter_term(path) {
      EventBus.$emit("onGoto", path);
    },
    onfooter_gotourl(path) {
      window.open(path, "_blank");
    },
  },
};
</script>

<style>
.ui-footer {
  width: 100%;
  background-color: #f4f4f4;
}
.ui-footer .footer-inner {
  padding: 32px 20px 40px;
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
}
.ui-footer .footer-inner .footer-flex-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 32px;
}
.ui-footer .footer-inner .policy {
  margin-top: 32px;
  list-style: none;
  padding-left: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}
.ui-footer .footer-inner .policy li button {
  color: #444;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  text-align: left;
}
.ui-footer .footer-inner .policy li button + button {
  position: relative;
  padding-left: 13px;
  margin-left: 12px;
}
.ui-footer .footer-inner .policy li button + button::before {
  content: "";
  display: inline-block;
  width: 1px;
  height: 12px;
  background-color: #ccc;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}
.ui-footer .footer-inner .address-area {
  margin-top: 20px;
}
.ui-footer .footer-inner .address-area p {
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  color: #444;
}
.ui-footer .footer-inner .address-area p + p {
  margin-top: 4px;
}
.ui-footer .footer-inner .address-area button {
  color: #444;
  text-align: left;
}
.ui-footer .footer-inner .copyright {
  margin-top: 20px;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  color: #595959;
}
.ui-footer .footer-inner .icon-arrowright {
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-left: 6px;
  margin-bottom: 2px;
  background-image: url("/boramae/contents/arrow-right-black.svg");
  background-size: 16px 16px;
  vertical-align: middle;
  background-position: center;
}
.ui-footer .footer-inner .icon-link {
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-left: 6px;
  margin-bottom: 2px;
  background-image: url("/boramae/contents/link.svg");
  background-size: 12px 12px;
  vertical-align: middle;
  background-position: center;
}
.ui-footer .footer-inner .left {
  max-width: 696px;
  width: 100%;
}
.ui-footer .footer-inner .left .footer-logo {
  height: 35px;
}
.ui-footer .footer-inner .right {
  margin-left: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
}
.ui-footer .footer-inner .right img {
  width: 133px;
}
.ui-footer .footer-inner .right .btn-area {
  display: none;
}

.ui-footer .organizations-wrap .title {
  display: none;
}
.ui-footer
  .organizations-wrap
  .list-accordion
  .accordion-cont
  > .scroll-content {
  max-height: 544px;
}
.ui-footer
  .organizations-wrap
  .list-accordion
  .accordion-cont
  > .scroll-content
  ul {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding-left: 0;
}
.ui-footer
  .organizations-wrap
  .list-accordion
  .accordion-cont
  > .scroll-content
  ul.type2 {
  flex-wrap: nowrap;
  flex-direction: column;
}
.ui-footer
  .organizations-wrap
  .list-accordion
  .accordion-cont
  > .scroll-content
  ul.type2
  li {
  width: 100%;
}
.ui-footer
  .organizations-wrap
  .list-accordion
  .accordion-cont
  > .scroll-content
  ul
  li {
  width: calc(100% / 2);
  padding: 8px 0;
}
.ui-footer
  .organizations-wrap
  .list-accordion
  .accordion-cont
  > .scroll-content
  ul:not(.type2)
  li:nth-of-type(even) {
  padding-left: 20px;
}
.ui-footer
  .organizations-wrap
  .list-accordion
  .accordion-cont
  > .scroll-content
  ul
  li
  a {
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  color: #000;
  text-decoration: none;
}
.ui-footer .banner {
  background-color: #002f67;
}
.ui-footer .banner .inner {
  max-width: 1240px;
  margin: 0 auto;
  padding: 10px 20px;
}
.ui-footer .banner .inner {
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
}
.ui-footer .banner .icon-flag {
  display: inline-block;
  width: 24px;
  height: 16px;
  margin-right: 8px;
  background-image: url("/boramae/contents/flag.svg");
  background-size: 24px 16px;
  vertical-align: middle;
  background-position: center;
}

@media screen and (min-width: 768px) {
  .ui-footer .footer-inner {
    padding: 48px 20px 60px;
  }
  .ui-footer .footer-inner .policy {
    gap: 8px 32px;
    margin-top: 34px;
  }
  .ui-footer .footer-inner .policy li button {
    font-size: 16px;
    font-weight: 500;
    line-height: 26px;
  }
  .ui-footer .footer-inner .policy li button + button {
    position: relative;
    padding-left: 0;
    margin-left: 32px;
  }
  .ui-footer .footer-inner .policy li button + button::before {
    display: none;
  }

  .ui-footer .footer-inner .address-area {
    margin-top: 24px;
  }
  .ui-footer .footer-inner .address-area p {
    font-size: 16px;
    line-height: 26px;
  }
  .ui-footer .footer-inner .address-area p .icon {
    display: none;
  }
  .ui-footer .footer-inner .address-area p + p {
    margin-top: 4px;
    display: inline-block;
  }
  .ui-footer .footer-inner .address-area p button {
    color: #444;
  }
  .ui-footer .footer-inner .address-area p + p ~ p {
    position: relative;
    padding-left: 17px;
    margin-left: 16px;
  }
  .ui-footer .footer-inner .address-area p + p ~ p::before {
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

  .ui-footer .footer-inner .copyright {
    font-size: 14px;
    line-height: 24px;
    color: #9a9a9a;
  }
  .ui-footer .footer-inner .left {
    max-width: 696px;
    width: calc(100% - 274px);
  }
  .ui-footer .footer-inner .left .footer-logo {
    height: auto;
  }
  .ui-footer .footer-inner .right img {
    width: 146px;
  }
  .ui-footer .footer-inner .right .btn-area {
    display: block;
    font-size: 0;
  }
  .ui-footer .footer-inner .right .btn-area button {
    color: #444;
    font-size: 16px;
    font-weight: 700;
    line-height: 26px;
  }
  .ui-footer .footer-inner .right .btn-area button + button {
    position: relative;
    margin-left: 16px;
    padding-left: 17px;
  }
  .ui-footer .footer-inner .right .btn-area button + button::before {
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

  .ui-footer .organizations-wrap {
    transform: translateX(100%);
    transition: transform 0.4s ease-in;
  }
  .ui-footer .organizations-wrap.open {
    transform: translateX(0);
  }
  .ui-footer .organizations-wrap .title {
    display: flex;
    justify-content: space-between;
    align-content: center;
  }
  .ui-footer .organizations-wrap .title .close-btn {
    background-image: url("/boramae/contents/close.svg");
    width: 28px;
    height: 28px;
  }
  .ui-footer .organizations-wrap {
    position: fixed;
    bottom: 0;
    right: 0;
    width: 580px;
    height: 100vh;
    background-color: #fff;
    z-index: 9999;
    padding: 30px 40px;
  }
  .ui-footer .organizations-wrap {
    overflow-y: scroll;
  }
  .ui-footer .organizations-wrap .title strong {
    font-size: 24px;
    font-weight: 700;
    line-height: 36px;
    color: #000;
  }
  .ui-footer .organizations-wrap .list-accordion {
    margin-top: 25px;
    border-top: none;
  }
  .ui-footer .organizations-wrap .list-accordion > ul > li {
    border-radius: 12px;
    border: 1px solid #eee;
    overflow: hidden;
  }
  .ui-footer .organizations-wrap .list-accordion > ul > li + li {
    margin-top: 16px;
  }
  .ui-footer .organizations-wrap .list-accordion .accordion-ti {
    font-size: 20px;
    font-weight: 700;
    line-height: 32px;
    color: #000;
    padding: 24px 30px;
  }
  .ui-footer .organizations-wrap .list-accordion .accordion-ti::after {
    right: 12px;
  }
  .ui-footer .organizations-wrap .list-accordion .accordion-cont {
    background-color: #fff;
  }
  .ui-footer
    .organizations-wrap
    .list-accordion
    .accordion-cont
    > .scroll-content {
    padding: 0;
    max-height: 600px;
  }
  .ui-footer
    .organizations-wrap
    .list-accordion
    .accordion-cont
    > .scroll-content
    ul {
    margin: 0px 30px 20px;
    padding-top: 20px;
    border-top: 1px solid #eee;
  }
  .ui-footer
    .organizations-wrap
    .list-accordion
    .accordion-cont
    > .scroll-content
    ul
    li {
    padding: 0;
  }
  .ui-footer
    .organizations-wrap
    .list-accordion
    .accordion-cont
    > .scroll-content
    ul
    li
    a {
    font-size: 16px;
    line-height: 44px;
    color: #444;
  }
  .ui-footer
    .organizations-wrap
    .list-accordion
    .accordion-cont
    > .scroll-content
    ul.type2 {
    flex-wrap: wrap;
    flex-direction: row;
  }
  .ui-footer
    .organizations-wrap
    .list-accordion
    .accordion-cont
    > .scroll-content
    ul:not(.type2)
    li:nth-of-type(even) {
    padding-left: 10px;
  }
  .ui-footer
    .organizations-wrap
    .list-accordion
    .accordion-cont
    > .scroll-content
    ul.type2
    li {
    width: calc(100% / 2);
  }
  .ui-footer
    .organizations-wrap
    .list-accordion
    .accordion-cont
    > .scroll-content
    ul.type2
    li:nth-of-type(even) {
    padding-left: 10px;
  }
}
</style>

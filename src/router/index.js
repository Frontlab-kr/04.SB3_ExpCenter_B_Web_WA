import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import i18n from "@/i18n";
import store from "../store/index";

// 로그 수집 스크립트를 로드하는 함수
function loadLoggingScript(pagePath) {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "//weblog.eseoul.go.kr/wlo/js/install.js";
  // script.onload = () => {
  // console.log('Logging script loaded for page:', pagePath);
  // };
  document.body.appendChild(script);
}

const routes = [
  {
    path: "/",
    name: "Main",
    component: () => import("../views/Main.vue"),
    beforeEnter: (to, from, next) => {
      loadLoggingScript(to.path);
      next();
    },
    meta: { isMainPageRouter: true },
  },
  // {
  //   path: '/sample',
  //   name: 'sample',
  //   component: () => import("../views/sample.vue"),
  //   beforeEnter: (to, from, next) => {
  //     loadLoggingScript(to.path);
  //     next();
  //   },
  // },
  {
    path: "/exp_intro",
    name: "exp_intro",
    component: () =>
      import(`@/views/${i18n.global.locale.value}/exp_intro.vue`),
    beforeEnter: (to, from, next) => {
      loadLoggingScript(to.path);
      next();
    },
    meta: {
      title: "html_title_exp_intro",
    },
  },
  {
    path: "/intro_organization",
    name: "intro_organization",
    component: () =>
      import(`@/views/${i18n.global.locale.value}/intro_organization.vue`),
    beforeEnter: (to, from, next) => {
      loadLoggingScript(to.path);
      next();
    },
  },
  {
    path: "/exp_map_center",
    name: "exp_map_center",
    component: () =>
      import(`@/views/${i18n.global.locale.value}/exp_map_center.vue`),
    beforeEnter: (to, from, next) => {
      loadLoggingScript(to.path);
      next();
    },
  },

  {
    path: "/guide_guide",
    name: "guide_guide",
    component: () =>
      import(`@/views/${i18n.global.locale.value}/guide_guide.vue`),
    beforeEnter: (to, from, next) => {
      loadLoggingScript(to.path);
      next();
    },
  },
  {
    path: "/guide_children",
    name: "guide_children",
    component: () => import(`@/views/guide_children.vue`),
    beforeEnter: (to, from, next) => {
      loadLoggingScript(to.path);
      next();
    },
  },
  {
    path: "/guide_tsunami_experience",
    name: "guide_tsunami_experience",
    component: () => import("../views/guide_tsunami_experience.vue"),
    beforeEnter: (to, from, next) => {
      loadLoggingScript(to.path);
      next();
    },
  },
  {
    path: "/guide_disaster_tsunami_experience",
    name: "guide_disaster_tsunami_experience",
    component: () => import("../views/guide_disaster_tsunami_experience.vue"),
    beforeEnter: (to, from, next) => {
      loadLoggingScript(to.path);
      next();
    },
  },
  {
    path: "/guide_disaster_typhoon_experience",
    name: "guide_disaster_typhoon_experience",
    component: () => import("../views/guide_disaster_typhoon_experience.vue"),
    beforeEnter: (to, from, next) => {
      loadLoggingScript(to.path);
      next();
    },
  },
  {
    path: "/guide_disaster_fire_evacuation_experience",
    name: "guide_disaster_fire_evacuation_experience",
    component: () =>
      import("../views/guide_disaster_fire_evacuation_experience.vue"),
    beforeEnter: (to, from, next) => {
      loadLoggingScript(to.path);
      next();
    },
  },
  {
    path: "/guide_disaster_traffic_accident_experience",
    name: "guide_disaster_traffic_accident_experience",
    component: () =>
      import("../views/guide_disaster_traffic_accident_experience.vue"),
    beforeEnter: (to, from, next) => {
      loadLoggingScript(to.path);
      next();
    },
  },
  {
    path: "/guide_advanced_basic_first_aid",
    name: "guide_advanced_basic_first_aid",
    component: () => import("../views/guide_advanced_basic_first_aid.vue"),
    beforeEnter: (to, from, next) => {
      loadLoggingScript(to.path);
      next();
    },
  },
  {
    path: "/guide_advanced_safety_training",
    name: "guide_advanced_safety_training",
    component: () => import("../views/guide_advanced_safety_training.vue"),
    beforeEnter: (to, from, next) => {
      loadLoggingScript(to.path);
      next();
    },
  },
  {
    path: "/guide_advanced_first_aid",
    name: "guide_advanced_first_aid",
    component: () => import("../views/guide_advanced_first_aid.vue"),
    beforeEnter: (to, from, next) => {
      loadLoggingScript(to.path);
      next();
    },
  },
  {
    path: "/guide_free_4D_movie",
    name: "guide_free_4D_movie",
    component: () => import("../views/guide_free_4D_movie.vue"),
    beforeEnter: (to, from, next) => {
      loadLoggingScript(to.path);
      next();
    },
  },
  {
    path: "/guide_free_firefighting_history_museum",
    name: "guide_free_firefighting_history_museum",
    component: () =>
      import("../views/guide_free_firefighting_history_museum.vue"),
    beforeEnter: (to, from, next) => {
      loadLoggingScript(to.path);
      next();
    },
  },

  {
    path: "/res_status",
    name: "res_status",
    component: () => import(`@/views/DataList/res_status_DataList.vue`),
    beforeEnter: (to, from, next) => {
      loadLoggingScript(to.path);
      next();
    },
  },
  {
    path: "/res_reservation",
    name: "res_reservation",
    component: () =>
      import(`@/views/${i18n.global.locale.value}/res_reservation.vue`),
    beforeEnter: (to, from, next) => {
      loadLoggingScript(to.path);
      next();
    },
  },
  {
    path: "/res_inquiry",
    name: "res_inquiry",
    component: () => import("../views/res_inquiry.vue"),
    beforeEnter: (to, from, next) => {
      loadLoggingScript(to.path);
      next();
    },
  },
  {
    path: "/res_alarm",
    name: "res_alarm",
    component: () => import("../views/res_alarm.vue"),
    beforeEnter: (to, from, next) => {
      loadLoggingScript(to.path);
      next();
    },
  },
  {
    path: "/res_certificate",
    name: "res_certificate",
    component: () => import("../views/res_certificate.vue"),
    beforeEnter: (to, from, next) => {
      loadLoggingScript(to.path);
      next();
    },
  },

  {
    path: "/info_natural_disaster_heat",
    name: "info_natural_disaster_heat",
    component: () =>
      import(
        `../views/${i18n.global.locale.value}/info_natural_disaster_heat.vue`
      ),
    beforeEnter: (to, from, next) => {
      loadLoggingScript(to.path);
      next();
    },
  },
  {
    path: "/info_natural_disaster_tsunami",
    name: "info_natural_disaster_tsunami",
    component: () =>
      import(
        `../views/${i18n.global.locale.value}/info_natural_disaster_tsunami.vue`
      ),
    beforeEnter: (to, from, next) => {
      loadLoggingScript(to.path);
      next();
    },
  },
  {
    path: "/info_social_disaser_biochemical",
    name: "info_social_disaser_biochemical",
    component: () =>
      import(
        `../views/${i18n.global.locale.value}/info_social_disaser_biochemical.vue`
      ),
    beforeEnter: (to, from, next) => {
      loadLoggingScript(to.path);
      next();
    },
  },
  {
    path: "/info_live_disaster_cirsis",
    name: "info_live_disaster_cirsis",
    component: () =>
      import(
        `../views/${i18n.global.locale.value}/info_live_disaster_cirsis.vue`
      ),
    beforeEnter: (to, from, next) => {
      loadLoggingScript(to.path);
      next();
    },
  },
  {
    path: "/info_live_disaster_accident",
    name: "info_live_disaster_accident",
    component: () =>
      import(
        `../views/${i18n.global.locale.value}/info_live_disaster_accident.vue`
      ),
    beforeEnter: (to, from, next) => {
      loadLoggingScript(to.path);
      next();
    },
  },
  {
    path: "/info_live_disaster_mountain",
    name: "info_live_disaster_mountain",
    component: () =>
      import(
        `../views/${i18n.global.locale.value}/info_live_disaster_mountain.vue`
      ),
    beforeEnter: (to, from, next) => {
      loadLoggingScript(to.path);
      next();
    },
  },
  {
    path: "/info_live_disaster_trail",
    name: "info_live_disaster_trail",
    component: () =>
      import(
        `../views/${i18n.global.locale.value}/info_live_disaster_trail.vue`
      ),
    beforeEnter: (to, from, next) => {
      loadLoggingScript(to.path);
      next();
    },
  },
  {
    path: "/info_first_aid_cpr",
    name: "info_first_aid_cpr",
    component: () =>
      import(`../views/${i18n.global.locale.value}/info_first_aid_cpr.vue`),
    beforeEnter: (to, from, next) => {
      loadLoggingScript(to.path);
      next();
    },
  },
  {
    path: "/info_first_aid_choking",
    name: "info_first_aid_choking",
    component: () =>
      import(`../views/${i18n.global.locale.value}/info_first_aid_choking.vue`),
    beforeEnter: (to, from, next) => {
      loadLoggingScript(to.path);
      next();
    },
  },
  {
    path: "/info_first_aid_bleeding",
    name: "info_first_aid_bleeding",
    component: () =>
      import(
        `../views/${i18n.global.locale.value}/info_first_aid_bleeding.vue`
      ),
    beforeEnter: (to, from, next) => {
      loadLoggingScript(to.path);
      next();
    },
  },
  {
    path: "/info_first_aid_shock",
    name: "info_first_aid_shock",
    component: () =>
      import(`../views/${i18n.global.locale.value}/info_first_aid_shock.vue`),
    beforeEnter: (to, from, next) => {
      loadLoggingScript(to.path);
      next();
    },
  },
  {
    path: "/info_first_aid_sudden_death",
    name: "info_first_aid_sudden_death",
    component: () =>
      import(
        `../views/${i18n.global.locale.value}/info_first_aid_sudden_death.vue`
      ),
    beforeEnter: (to, from, next) => {
      loadLoggingScript(to.path);
      next();
    },
  },
  {
    path: "/info_first_aid_stroke",
    name: "info_first_aid_stroke",
    component: () =>
      import(`../views/${i18n.global.locale.value}/info_first_aid_stroke.vue`),
    beforeEnter: (to, from, next) => {
      loadLoggingScript(to.path);
      next();
    },
  },
  {
    path: "/info_first_aid_cardiac",
    name: "info_first_aid_cardiac",
    component: () =>
      import(`../views/${i18n.global.locale.value}/info_first_aid_cardiac.vue`),
    beforeEnter: (to, from, next) => {
      loadLoggingScript(to.path);
      next();
    },
  },
  {
    path: "/info_first_aid_life",
    name: "info_first_aid_life",
    component: () =>
      import(`../views/${i18n.global.locale.value}/info_first_aid_life.vue`),
    beforeEnter: (to, from, next) => {
      loadLoggingScript(to.path);
      next();
    },
  },
  {
    path: "/commu_faq",
    name: "commu_faq",
    component: () =>
      import(`../views/${i18n.global.locale.value}/commu_faq.vue`),
    beforeEnter: (to, from, next) => {
      loadLoggingScript(to.path);
      next();
    },
  },
  {
    path: "/commu_qna",
    name: "commu_qna",
    component: () =>
      import(`../views/${i18n.global.locale.value}/commu_qna.vue`),
    beforeEnter: (to, from, next) => {
      loadLoggingScript(to.path);
      next();
    },
  },
  {
    path: "/commu_review",
    name: "commu_review",
    component: () =>
      import(`../views/${i18n.global.locale.value}/commu_review.vue`),
    beforeEnter: (to, from, next) => {
      loadLoggingScript(to.path);
      next();
    },
  },

  {
    path: "/:id",
    name: "UserPage",
    component: () => import("../views/user_page.vue"),
    beforeEnter: (to, from, next) => {
      loadLoggingScript(to.path);
      next();
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

router.afterEach((to, from) => {
  // 메인화면 접속 시에만 Content 로그 쌓지 않기
  if (to.path != "/") {
    store.commit("SetEnterContent", {
      cPath: to.path,
      iIndex: 0,
    });
  }
});

export default router;

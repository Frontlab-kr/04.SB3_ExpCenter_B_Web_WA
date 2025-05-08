<template>
  <div>
    <!-- 페이지 없음 -->
    <M4_No_User_Page v-if="bNoPage"></M4_No_User_Page>
    <!-- 노컨텐츠형 -->
    <M4_Dynamic_NoContents :bShowPageTitle="true" :bShowBoardTitle="true" :bShowFormTitle="true" v-if="!bShowContents" ref="M4_Dynamic_NoContents_ref"></M4_Dynamic_NoContents>
    <!-- 컨텐츠형 -->
    <M4_Dynamic_Contents v-if="bShowContents" ref="M4_Dynamic_Contents_ref"></M4_Dynamic_Contents>
  </div>
</template>

<script>
// import { EventBus } from '@/EventBus.js';
import { useRoute } from 'vue-router'

export default {
  data() {
    return {
      bShowContents : false, // 컨텐츠형 해당 유무
      bNoPage : false, // 페이지 없음 유무

      MENU_ID : "", // 페이지 아이디
    };
  },

  components:{
  },

  mounted() {
    this.InitVueData(useRoute().params.id);

    // EventBus.$on("onNavigo", this.onNavigo, this);
  },


  beforeRouteUpdate(to, from, next) {
    next();
    this.InitVueData(to.params.id);
  },

  beforeUnmount(){
    // EventBus.$offAll(this);
  },

  methods : {
    // id로 정보를 확인 후, 컨텐츠 개수에 따라 컨텐츠형과 NO컨텐츠형으로 구분함
    InitVueData(ParamsId) {
      this.MENU_ID = ParamsId;
      var zResult = this.findMenuById(this.$store.state.main_menu, this.MENU_ID)
      //
      if (zResult) {
        if (zResult.CONTS_CNT == 1) {
          this.bShowContents = false
          this.$nextTick(() => {
            this.$refs.M4_Dynamic_NoContents_ref.SortDisplayType(zResult.id, zResult.PAGE_ID, zResult.BOARDLIST_ID, zResult.FORM_TYPE, zResult.CONTS_TYPE)
          })
        } else {
          this.bShowContents = true
          this.$nextTick(() => {
            this.$refs.M4_Dynamic_Contents_ref.SortDisplayType(zResult.id, zResult.name, this.MENU_ID)
          })
        }
      } else {
        this.bNoPage = true;
      }
    },

    // 현재 메인메뉴(스토어)에서 id가 일치하는 매뉴정보를 가져옴
    findMenuById(menuArray, searchId) {
      // 메뉴 배열을 순회
      for (const menu of menuArray) {
        // 현재 메뉴의 id가 검색하려는 id와 일치하면 반환
        if (menu.path === searchId) {
          return menu;
        }
        
        // 하위 메뉴가 있는 경우 하위 메뉴도 재귀적으로 탐색
        if (menu.menu_dept1) {
          const found = this.findMenuById(menu.menu_dept1, searchId);
          if (found) {
            return found;
          }
        }

        if (menu.menu_dept2) {
          const found = this.findMenuById(menu.menu_dept2, searchId);
          if (found) {
            return found;
          }
        }
      }

      return null;
    },

    // onNavigo(data){
    //   console.log("onNavigo.......");
    //   this.id = data;
    //   // this.GetHtml();
    // },
  },
};
</script>

<style scoped>

</style>

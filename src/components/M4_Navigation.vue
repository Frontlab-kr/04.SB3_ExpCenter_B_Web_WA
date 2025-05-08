<template>
  <div v-if="$store.state.now_nav_menu_idx != -1" tabindex="-1" style="overflow: auto;">
    <div class="pl-2 no-focus" style="width: 220px; overflow-y: hidden;" tabindex="-1">
      <div v-for="(item, i) in $store.state.main_menu[$store.state.now_nav_menu_idx].menu_dept1" :key="i">
        <div v-if="item.path == ''" role="menu" :aria-label="item.name + ' 메뉴'">          
          <div class="group_memu_box" aria-hidden="true">{{ item.name }} + </div>
          <div v-for="(item2, i2) in $store.state.main_menu[$store.state.now_nav_menu_idx].menu_dept1[i].menu_dept2" :key="i2" >
            <button class="mouse-cur" @click="goMenuPhone(item2)" :title="item2.path.startsWith('http')?`새창열림`:`이동`" :class="getCSS(item2.path)">                            
              <div class="d-flex">
                <div class="ml-2">{{ item2.name }}</div>
                <div v-if="item2.path.startsWith('http') || item2.OPEN_BOOLEAN"> <v-icon aria-hidden="true" class="ml-1" size="19px" style="margin-top: 0px;">mdi-open-in-new</v-icon></div>
              </div>
            </button>
            <div style="height: 2px; cursor:default;"></div>
          </div>
        </div>
        <button v-else :value="item.path" tabindex="0" @click="goMenuPhone(item)" @keydown.enter="goMenuPhone(item)"  :class="getCSS(item.path)" >
          <div class="d-flex mouse-cur font-bold">            
            {{ item.name }}<div v-if="item.path.startsWith('http') || item.OPEN_BOOLEAN"> <v-icon aria-hidden="true" class="ml-1" size="19px" style="margin-top: 0px;">mdi-open-in-new</v-icon></div>
          </div>
        </button>
        <div style="height: 2px; cursor:default;"></div>
      </div>
      <!-- <div v-for="(item, i) in $store.state.main_menu[$store.state.now_nav_menu_idx].menu_dept1" :key="i">        
        <v-list-group v-if="item.path == ''" color="secondary" :key="i" :value="i"  >          
          <template #activator="{ props }" >
            <v-list-item v-bind="props" tabindex="0" :aria-label="`목록항목 ${item.name} `" role="" >
              <div class="custom-div d-flex align-center" style="height: 100%;"  >
                <div class="line_clamp_2" style="margin-top: -37px;" >                  
                  {{ item.name }}
                </div>
              </div>
            </v-list-item>
          </template>          
          <v-list-item v-for="(item2, i2) in $store.state.main_menu[$store.state.now_nav_menu_idx].menu_dept1[i].menu_dept2" 
              :key="i2" tabindex="0" 
              @click="goMenuPhone(item2)" 
              @keydown.enter="goMenuPhone(item2)"
              @keydown.tab="handleTabNavigation"
              :class="getCSS(item2.path)"              
              :aria-label="item2.path.startsWith('http')?`${item2.name} 새창열림`:`${item2.name} 이동`">
            <div class="d-flex mouse-cur">              
              <div>{{ item2.name }}</div><div v-if="item2.path.startsWith('http') || item2.OPEN_BOOLEAN"> <v-icon aria-hidden="true" class="ml-1" size="19px" style="margin-top: 0px;">mdi-open-in-new</v-icon></div>
            </div>
          </v-list-item>
        </v-list-group>        
        <v-list-item v-else :value="item.path" tabindex="0" @click="goMenuPhone(item)" @keydown.enter="goMenuPhone(item)" 
          :active="false"
          :class="getCSS(item.path)"
          :aria-label="item.path.startsWith('http')?`${item.name} 새창열림`:`${item.name} 이동`">
          <div class="d-flex mouse-cur">            
            {{ item.name }}<div v-if="item.path.startsWith('http') || item.OPEN_BOOLEAN"> <v-icon aria-hidden="true" class="ml-1" size="19px" style="margin-top: 0px;">mdi-open-in-new</v-icon></div>
          </div>
        </v-list-item>
      </div> -->
    </div>
  </div>
</template>

<script>
import { EventBus } from '@/EventBus.js';

export default {
  data() {
    return {
      opened : [],
    };
  },

  mounted() {
  },

  watch: {
  },

  methods : {
    // 선택 네비게이션 CSS
    getCSS(path) {
      if ("/" + path == this.$route.path) {
        return "sel_menu";
      } else {
        return "nor_menu";
      }
    },

    // 네비게이션 이동
    goMenuPhone(item){
      try {
        if (item.path.startsWith('http') || item.OPEN_BOOLEAN) {
          window.open(item.path, "_blank");
        } else {
          this.$store.state.now_main_menu_idx = -1;
          EventBus.$emit("onMenu", item.path);
        }
      } catch (error) {
        console.log(error);
      }
    },

    // 활성화된 메뉴 열기 (APP.VUE에서 onMenu 이벤트 수신시, 호출함)
    setOpenGroup(data) {
      this.opened = [];
      let path = "/"+data;
      if (data == undefined) {
        path = this.$route.path;                
      }

      let menu_dept1 = this.$store.state.main_menu[this.$store.state.now_nav_menu_idx].menu_dept1;      
      for (let i = 0; i < menu_dept1.length; i++) {
        if (menu_dept1[i].path == '') {
          for (let j = 0; j < menu_dept1[i].menu_dept2.length; j++) {
            if ("/" + menu_dept1[i].menu_dept2[j].path == path) {              
              this.opened = [i];
              return
            }
          }
        }
      }
    },
    
    handleTabNavigation(event) {
      // 현재 이벤트 대상
      const focusableItems = Array.from(
        this.$el.querySelectorAll('[tabindex="0"]')
      );
      const currentIndex = focusableItems.indexOf(event.target);
      if (currentIndex === focusableItems.length - 1) {
        // 마지막 요소일 경우
        this.$emit("focusParent"); // 부모로 이벤트 전달
      } 
    },
  },
};
</script>

<style scoped>
  /* DEPTH_1 CSS */
  .group_memu_box {    
    display: flex;
    align-items: center;
    width: 200px ;
    font-weight: bold !important;    
    line-height: 90%;
    padding: 6px;
  }
  .custom-div {    
    width: 200px ;
    font-weight: bold !important;    
    line-height: 90%;    
  }

  /* 비선택영역 CSS */
  .nor_menu {
    display: flex;    
    flex-direction: column;
    justify-content: start;
    align-items: start;
    text-align: start;
    width: 200px ;
    padding: 6px;
    background-color: #ffffff !important;
    color:var(--gray-90) !important;
  }

  /* 선택영역 CSS */
  .sel_menu {
    display: flex;    
    flex-direction: column;
    justify-content: start;
    align-items: start;
    text-align: start;
    width: 200px ;
    padding: 6px;
    background-color:var(--secondary-5) !important;
    /* color : var(--secondary-color) !important; */
    color : var(--secondary-80) !important;
    font-weight: 500 !important;
    text-decoration: underline;
  }
</style>

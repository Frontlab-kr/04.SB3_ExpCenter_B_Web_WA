### [웹접근성]


### 대체 텍스트
<img src="@/assets/main_logo.svg" alt="서울소방재난본부 로고" class="" tabindex="0"/>


### 키보드 접근성 보장
[v-btn일 경우 제외]
<div class="mouse-cur" tabindex="0" role="link" @click="test()" @keydown.enter="test()">link</div>



### ARIA 속성 추가:
버튼과 같은 인터랙티브 요소에 ARIA 속성을 추가하여 스크린 리더 사용자에게 명확한 정보를 제공합니다.

<v-btn variant="plain" density="compact" class="pa-0 " style="font-size:15px;" title="새창 열림">
  서울소방재난본부
  <v-icon class="ml-1" size="19px" style="margin-top: 4px;">mdi-open-in-new</v-icon>
</v-btn>

## ARIA(Accessible Rich Internet Applications) 속성을 추가
div를 버튼으로 할경우
role="link"
role="button"



### 스타일 수정
명도 대비:
텍스트와 배경 간의 명도 대비를 4.5:1 이상으로 설정하여 가독성을 높입니다.
css
코드 복사
.selected-item {
  background-color: #ffffff;
  padding-left: 24px;
  padding-top: 14px;
  font-size: var(--font-size-body-medium);
  height: 56px;
  transition: background-color 0.7s ease;
  color: #000000; /* 명도 대비 강화 */
}


### 반응형
<!-- phone only -->
<div class="d-flex d-md-none">

<!-- pc tablet only -->
<div class="d-none d-md-flex">



## 이상한 소스 나온다는 문제
<v-text-field >
          <template v-slot:append-inner>
            <v-icon aria-hidden="true">mdi-magnify</v-icon>
          </template>
</v-text-field>



## v-Dialog 스크린리더 밖으로 나가는 것 해결, 포커스 원래로 이동
<v-dialog v-model="isShow" width = "80%" style="max-width: 1920px;" aria-modal="true" @update:modelValue="DialogClose">


Show(){
  this.$store.state.isDialog = true;
  this.$store.state.btnDialogRef = document.activeElement;

// Default



//Fix
해당 버튼
this.$store.state.btnDialogRef = this.$refs.btn_req_illegal;



DialogClose() {
      this.isShow = false;
      this.$store.state.isDialog = false;
      EventBus.$emit("onBackDialogBtn");
    },


:aria-label="item.name + ' ' + (item.value == tab?`선택됨`:'')"
        @keydown.left="moveTab(i, -1)" @keydown.right="moveTab(i, 1)"
     

    moveTab(currentIndex, direction) {
      let newIndex = currentIndex + direction;
      if (newIndex < 0) {
        newIndex = this.zTab.length - 1; // 처음에서 왼쪽 누르면 마지막으로 이동
      } else if (newIndex >= this.zTab.length) {
        newIndex = 0; // 마지막에서 오른쪽 누르면 처음으로 이동
      }

      const newTab = this.zTab[newIndex];
      this.goTab(newTab);

      // 이동한 탭에 focus 적용
      this.$nextTick(() => {
        this.$el.querySelectorAll("[role='tab']")[newIndex].focus();
      });
    },


250219-보라매안전체험관(광나루 동일)(전문가팀).pdf
보라매 15    
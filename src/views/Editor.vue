<template>
  <div>
    <div id="froala-editor"></div>
  </div>
</template>

<script>
import FroalaEditor from 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/css/froala_editor.pkgd.min.css'; // Optional, for styles

export default {
  data() {
    return {
      editor : null,
      froalaOptions: {
        // 유료 라이선스 키 추가
        key: 'vYA6mD6F5B4H4B2C7D7eMRPYf1h1REb1BGQOQIc2CDBREJImA11C8D6D6B1F4E3F2I3C7==',

        // 필요한 툴바 버튼만 추가
        toolbarButtons: [
          'bold', 'italic', 'underline',
          'align', // 글자 정렬 버튼 추가
          'formatUL', 'formatOL',
          'insertTable' // 표 생성 기능 추가
        ],

        placeholderText: '본문 내용을 작성해주세요',

        // 이미지 삽입 및 기타 사용하지 않는 기능 제거
        imageInsertButtons: [],
        fileUpload: false,
        markdown: false,
      }
    }
  },

  mounted() {
    this.editor = new FroalaEditor('#froala-editor', this.froalaOptions);
    
    let oInterval = setInterval(() => {
      if (this.editor) {
        this.editor.events.on('contentChanged', () => {
          this.$emit("UpdateData", this.editor.html.get())
        });
        clearInterval(oInterval)
      }
    }, 10);
  },

  beforeUnmount() {
    this.editor.destroy()
  },

  methods: {
    refresh(content) {
      this.editor.html.set(content)
    }
  }
}
</script>

<style>
#froala-editor .fr-wrapper,
#froala-editor .fr-element {
  min-height: 200px;
  height: 200px;
  box-sizing: border-box;
}
#froala-editor .fr-box {
  border-radius: 8px; /* 원하는 값으로 조절 */
  border: 1px solid #ccc; /* 테두리 유지 */
  overflow: hidden; /* 자식 요소가 둥근 테두리를 넘지 않게 */
}
#froala-editor .fr-wrapper {
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

#froala-editor .fr-element {
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}
</style>


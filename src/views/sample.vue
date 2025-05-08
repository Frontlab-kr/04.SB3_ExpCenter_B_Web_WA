<template>
  <div >
    <div class="bg-layer-2">
      <h1 class="title-xxlarge">layer2</h1>        
      <div class="bg-base pa-3 ">
        <h1 class="title-xxlarge">base</h1>        


        <v-card class="mt-2 pa-4">
          ## 기본 계층
          <h1 class="title-xxlarge">페이지 타이틀</h1>
          <h2 class="title-xlarge">콘텐츠 타이틀</h2>
          <div class="title-medium font-bold">콘텐츠 서브 타이틀</div>
          <div class="body-medium ">주요 콘텐츠</div>
          <div class="detail-medium detail-text-color">Detail - 정부24에서 대한민구의 서비스, 정책정보 기관정보를 안내받고 운영한다. <br> 안녕하세요.<br> 반갑습니다.</div>
        </v-card>
        <v-card class="mt-2 pa-4">
          ## 목록이 있는 계층
          <div class="label-small">Label</div>
          <h2 class="title-xlarge">콘텐츠 타이틀</h2>
          <div class="body-medium">주요 콘텐츠</div>
          <div class="body-medium">• 목록1</div>
          <div class="body-small">• 목록1-1</div>
          <div class="detail-medium detail-text-color">Detail - 정부24에서 대한민구의 서비스, 정책정보 기관정보를 안내받고 운영한다. <br> 안녕하세요.<br> 반갑습니다.</div>
        </v-card>
        <v-card class="mt-2 pa-4">
          ## 마케팅용 콘텐츠
          <div class="display-small font-bold">페이지 타이틀</div>
          <div class="display-medium font-bold">마케팅 타이틀이나 내용</div>
          <h2 class="title-xlarge">콘텐츠 타이틀</h2>
          <div class="body-large ">주요 콘텐츠</div>
        </v-card>          
        <div class="bg-layer-1 bg-body detail-text-color">
          <h3>layer1</h3>                    
        </div>      
      </div>        

      <v-card class="mt-2 pa-4">
        <div>
          ## Colors
        </div>
        <v-btn class="mt-3" @click="testClick" color="primary">Primary</v-btn>        
        <v-btn class="mt-3 ml-2" @click="testClick" color="secondary">Secondary</v-btn>        
        <v-btn class="mt-3 ml-2" @click="testClick" color="gray">gray</v-btn>        
        <v-btn class="mt-3 ml-2" @click="testClick" color="information">information</v-btn>        
        <v-btn class="mt-3 ml-2" @click="testClick" color="danger">danger</v-btn>        
        <v-btn class="mt-3 ml-2" @click="testClick" color="warning">warning</v-btn>        
        <v-btn class="mt-3 ml-2" @click="testClick" color="success">success</v-btn>        
        
              

        <div class="mt-5 d-flex " >            
          <div class="ma-2" >
            <M4_Date v-model:cDate="cDate" :cLabel="'일자'" :cMessages="'일자를 선택하세요.'" :cMessage="''" ref="M4_Date_ref" @onDate="onDate"></M4_Date>
          </div>
          <div  class="ma-2">
            <M4_Input
              style="min-width : 200px;"
              label="내용"
              aria-label="내용"
              messages="내용을 입력하세요"
              placeholder="내용입력"              
              v-model="cData"    
              @click:append-inner="testClick"
              iconTitle="검색"
              icon="mdi-magnify">              
            </M4_Input>  
          </div>
        </div>
        <div>
          <div>
            cDate : {{ cDate }}
          </div>
          <div>
            cData : {{ cData }}
          </div>
          
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>  
import M4_Date from '@/components/M4_Date';


import { EventBus } from '@/EventBus.js'; 
export default {
  data() {
    return {
      cDate : "",
      cData : "",
      group : true,
    };
  },

  components:{
    M4_Date,
  },


  mounted() {      
    this.$refs.M4_Date_ref.SetDate(this.getFutureDate(4));
  },

  beforeUnmount(){    
  },

  methods : {
    getFutureDate(daysToAdd) {
      const today = new Date();

      // 현재 날짜에 지정한 일 수를 더합니다.
      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + daysToAdd);

      return futureDate;
    },

    testClick(){
      
      EventBus.$emit("onShowMsg",  {cSubTitle: "바로가기", cTitle:"바로가기 안내", cMsg:"TEST"});
    },

    onDate(date){
      console.log(date);
      // EventBus.$emit("onShowMsg", date);
    }
  },  
};
</script>

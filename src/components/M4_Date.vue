<template>
  <div class="d-flex">
    <div style="width:100%; ">
      <label class="m4_input-label">{{cLabel}}</label>
      <div style="border: 1px solid #b8b8b8; padding: 8px 8px 8px 15px; border-radius: 5px;  height:40px;" @click="OpenDateDialog()">{{ cDate }}</div>
    </div>
    <v-btn variant="plain" icon style="margin-top: 22px; width:40px !important; height:40px;" @click="OpenDateDialog()">
      <v-icon aria-hidden="true">mdi-calendar</v-icon>
    </v-btn>
  </div>

  <v-dialog aria-modal="true" v-model="menu" width = "320" @update:modelValue="DialogClose">
    <v-card class="center_all">
      <div class="calendar">        
        <div class="calendar-header">      
          <button @click="prevMonth" aria-label="이전 달 보기"><v-icon color="black">mdi-chevron-left</v-icon></button>
          <h2 id="month-year" aria-live="polite">{{ year }}년 {{ month + 1 }}월</h2>
          <button @click="nextMonth" aria-label="다음 달 보기"><v-icon color="black">mdi-chevron-right</v-icon></button>
        </div>

        <table class="calendar-table" role="grid">
          <caption class="sr-only">달력</caption>
          <thead>
            <tr>
              <th scope="col">{{$t("res_day_1")}}</th>
              <th scope="col">{{$t("res_day_2")}}</th>
              <th scope="col">{{$t("res_day_3")}}</th>
              <th scope="col">{{$t("res_day_4")}}</th>
              <th scope="col">{{$t("res_day_5")}}</th>
              <th scope="col">{{$t("res_day_6")}}</th>
              <th scope="col">{{$t("res_day_7")}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(week, index) in calendar" :key="index">
              <td v-for="(day, dayIndex) in week" 
                  :key="dayIndex"               
                  :class="{ today: isToday(day), selected: isSelected(day)}" 
                  role="button"
                  aria-pressed="false"
                  :tabindex="day?0:null"
                  :aria-label="(day ? `${year}년 ${month + 1}월 ${day}일` : '') + ' ' + (isSelected(day)?'선택됨':'')"
                  @keydown="handleKeydown($event, index, dayIndex)"
                  @click="onDate(day)"
                  @keyup.enter="onDate(day)">
                {{ day || '' }}
              </td>              
            </tr>
          </tbody>
        </table>
      </div>
      <div class="d-flex ma-3" >
        <v-spacer></v-spacer>
        <v-btn class="mr-2" @click="DialogClose();" variant="outlined" color="black">취소</v-btn>        
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import * as Util from "@/Util.js";
import { EventBus } from '@/EventBus.js';

export default {
  props: ['cDate', 'cLabel', 'cMessage', 'bReadOnly', 'bNotFuture'],
  emits: ['update:cDate', 'onDate'],
  data() {
    return {
      btnDialogRef : null,      
      menu: false,
      date: this.getDefaultDate(),
      uniqueLabelId: `label-${Math.random().toString(36)}`,
    };
  },

  mounted() {
  },

  computed: {    
    year() {
      return this.date.getFullYear();
    },
    month() {
      return this.date.getMonth();
    },
    calendar() {
      const firstDay = new Date(this.year, this.month, 1).getDay();
      const lastDate = new Date(this.year, this.month + 1, 0).getDate();
      
      let days = Array(firstDay).fill(null).concat(
        Array.from({ length: lastDate }, (_, i) => i + 1)
      );

      let weeks = [];
      while (days.length) {
        weeks.push(days.splice(0, 7));
      }
      return weeks;
    }
  },



  methods : {
    getDefaultDate() {
      return Util.parseDate(this.cDate);      
    },

    prevMonth() {
      this.date = new Date(this.year, this.month - 1, 1);      
    },
    nextMonth() {
      this.date = new Date(this.year, this.month + 1, 1);      
    },
    onDate(day) {      
      if (!day) return;
      const selectedDate = Util.formatDate2(new Date(this.year, this.month, day));
      this.DialogClose();
      this.$emit("update:cDate", selectedDate);
      this.$emit("onDate", selectedDate);
      this.$forceUpdate();
    },

    getFullDate(day) {
      if (!day) return null; 
      return new Date(this.year, this.month, day); // ✅ Date 객체 반환
    },

    isToday(day) {
      const today = new Date();
      return today.getFullYear() === this.year &&
             today.getMonth() === this.month &&
             today.getDate() === day;
    },

    isSelected(day) {
      // console.log(this.cDate, day);
      return this.date &&
        this.date.getFullYear() === this.year &&
        this.date.getMonth() === this.month &&
        this.date.getDate() === day;
    },

    handleKeydown(event, rowIndex, colIndex) {
      const rows = document.querySelectorAll(".calendar-table tbody tr");
      if (!rows.length) return;

      let newRowIndex = rowIndex;
      let newColIndex = colIndex;

      switch (event.key) {
        case "ArrowRight":
          newColIndex++;
          break;
        case "ArrowLeft":
          newColIndex--;
          break;
        case "ArrowDown":
          newRowIndex++;
          break;
        case "ArrowUp":
          newRowIndex--;
          break;
        case "Enter":
        case " ":
          this.onDate(this.calendar[rowIndex][colIndex]);
          return;
        default:
          return;
      }

      if (newRowIndex >= 0 && newRowIndex < rows.length) {
        const cells = rows[newRowIndex].querySelectorAll("td");
        if (newColIndex >= 0 && newColIndex < cells.length) {
          const nextCell = cells[newColIndex];
          if (nextCell && nextCell.getAttribute("tabindex") === "0") {
            nextCell.focus();
          }
        }
      }
      event.preventDefault();
    },

    DialogClose(){
      this.menu = false;
      setTimeout(() => {        
        this.btnDialogRef.focus();        
      }, 100);
    },
    OpenDateDialog() {
      if (this.bReadOnly) {
        return
      }
      this.btnDialogRef = document.activeElement;
      this.menu = true;
    },

    // 날짜 형식 변경
    updateDisplayDate(date) {
      this.cDateDisplay = date ? Util.formatDate2(date): "";
    },

    // 텍스트필드의 날짜 형식 변경
    SetDate(d){
      this.updateDisplayDate(d);
      this.$emit('update:cDate', this.cDateDisplay);
      this.date = d;
    },
  
  },

};
</script>

<style scoped>
.calendar {
  width: 320px;
  height: 380px;
  margin: auto;
  text-align: center;
  border-bottom: 1px solid #d8d8d8;
}
.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #f8f8f8;
  color: #2d2d2d;  
}
.calendar-header button {
  background: transparent;
  border: none;
  color: #2d2d2d;
  font-size: 18px;
  cursor: pointer;
}
.calendar-table {
  width: 100%;
  border-collapse: collapse;
}
.calendar-table th, .calendar-table td {
  width: 14%;
  padding: 10px;
  text-align: center;
}
.calendar-table th {
  background: #f8f8f8;
  color: #2d2d2d;
}
.calendar-table td {
  background: #ffffff;  
  cursor: pointer;
}
.calendar-table td.today {
  border-radius: 50%;    
  outline: 2px solid #002b5e;
}
.calendar-table td.today:focus {
  border-radius: 50%;      
  outline: 4px dashed red !important;
}

.calendar-table td.selected {
  background: #1d56bc;
  color: white;
  font-weight: bold;
  border-radius: 50%;
  text-decoration: underline;
}

.disabled {
  color: #c6c6c6;
}

.calendar-table td:focus {
  border-radius: 50% !important;
  border:none ! important;
  outline:none !important;
  outline: 2px dashed red !important;
}
</style>

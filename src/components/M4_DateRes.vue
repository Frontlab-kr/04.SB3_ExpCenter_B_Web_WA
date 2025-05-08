<template>  
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
          <!-- <td v-for="(day, dayIndex) in week" :key="dayIndex">
            <div v-if="day"   
              :class="{ today: isToday(day), selected: isSelected(day), disabled: !allowedDates(getFullDate(day)) }" 
              role="button"
              aria-pressed="false"
              :tabindex="day?0:null"
              :aria-label="(day ? `${year}년 ${month + 1}월 ${day}일` : '') + ' ' + (isSelected(day)?'선택됨':'')"
              @keydown="handleKeydown($event, index, dayIndex)"
              @click="onDate(day)"
              @keyup.enter="onDate(day)">
              {{ day || '' }}

            </div>
          </td> -->
          <td v-for="(day, dayIndex) in week" 
              :key="dayIndex"               
              :class="{ today: isToday(day), selected: isSelected(day), disabled: !allowedDates(getFullDate(day)) }" 
              role="button"
              aria-pressed="false"
              :tabindex="day?0:null"
              :aria-label="(day ? `${year}년 ${month + 1}월 ${day}일` : '') + ' ' + (isSelected(day)?'선택됨':'')"
              @keydown="handleKeydown($event, index, dayIndex)"
              @click="onDate(day)"
              @keyup.enter="onDate(day)">
            {{ day || '' }}
          </td>
          <!-- <td v-for="(day, dayIndex) in week" 
              :key="dayIndex"               
              :class="{ today: isToday(day), selected: isSelected(day), disabled: !allowedDates(getFullDate(day)) }" 
              role="gridcell"
              aria-pressed="false"
              :tabindex="day?0:null"
              :aria-label="(day ? `${year}년 ${month + 1}월 ${day}일` : '') + ' ' + (isSelected(day)?'선택됨':'')"
              @keydown="handleKeydown($event, index, dayIndex)"
              @click="onDate(day)"
              @keyup.enter="onDate(day)">
            {{ day || '' }}
          </td> -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import * as Util from "@/Util.js";
import { EventBus } from '@/EventBus.js';

export default {   
  props: {
    cDate: Date,
    allowedDates: { // 특정 날짜 선택 가능 여부를 설정하는 함수
      type: Function,
      default: () => () => true // 기본적으로 모든 날짜 선택 가능
    }
  },
  emits: ['update:cDate', 'onDate'],
  data() {
    return {
      date: this.cDate || new Date(),
    };
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
  methods: {
    prevMonth() {
      this.date = new Date(this.year, this.month - 1, 1);
      this.$emit('update:cDate', this.date);
    },
    nextMonth() {
      this.date = new Date(this.year, this.month + 1, 1);
      this.$emit('update:cDate', this.date);
    },
    onDate(day) {      
      if (!day) return;
      const selectedDate = new Date(this.year, this.month, day);      
      if (!this.allowedDates(selectedDate)) return; 

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
      return this.cDate &&
        this.cDate.getFullYear() === this.year &&
        this.cDate.getMonth() === this.month &&
        this.cDate.getDate() === day;
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
  }
};
</script>

<style scoped>
.calendar {
  width: 320px;
  height: 380px;
  margin: auto;
  text-align: center;
  border: 1px solid #d8d8d8;
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
  color: #000000;
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
  /* color: #2d2d2d; */
  color: red;
  text-decoration: line-through;
}

.calendar-table td:focus {
  border-radius: 50% !important;
  border:none ! important;
  outline:none !important;
  outline: 2px dashed red !important;
}
</style>

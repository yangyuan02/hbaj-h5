<!--
 * @Author: yangyuan
 * @Date: 2020-04-21 22:23:16
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-04-23 21:47:03
 * @Description: 
 -->
<template>
  <div class="calendar">
    <div class="control">
      <div class="prev" @click="handleShowLastMonth">
        <i class="iconfont icontubiao-13"></i>
      </div>
      <div class="current-data">
        <span>{{year}}年{{month}}月</span>
      </div>
      <div class="next" @click="handleShowNextMonth">
        <i class="iconfont icontubiao-13"></i>
      </div>
    </div>
    <div class="calendar-header">
      <ul class="calendar-week-title">
        <li v-for="(item, index) in week" :key="index">{{ item }}</li>
      </ul>
    </div>
    <div class="calendar-body">
      <ul class="month">
        <li v-for="(item, index) in days" :key="index" @click="setDate(item)" :class="{currentDay:item.current, otherMonth:item.dayType === 'nextMonth'||item.dayType === 'prevMonth'}">
          {{ item.day }}
          <span v-if="item.isTask">任务</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            week: ["日", "一", "二", "三", "四", "五", "六"],
            days: [],
            year: 1970,
            month: 1
        };
    },
    methods: {
        getDays(year, month) {
            // 获取当前年份这个月有多少天
            const day = new Date(year, month, 0).getDate();
            return day;
        },
        getWeek(year, month) {
            //得到当前年，这个月的一号是周几
            const now = new Date();
            now.setFullYear(year);
            now.setMonth(month - 1);
            now.setDate(1);
            const week = now.getDay();
            return week;
        },
        isCurrentDay(day) {
            const date = new Date();
            const currentYear = date.getFullYear();
            const currentMonth = date.getMonth() + 1;
            const currentDay = date.getDate();
            return this.year === currentYear && this.month === currentMonth && currentDay === day;
        },
        pushDays() {
            //将这个月多少天加入数组days
            for (let i = 1; i <= this.getDays(this.year, this.month); i++) {
                const item = {
                    isTask: false,
                    day: i,
                    dayType: "currentMonth"
                };
                item.current = this.isCurrentDay(i);
                this.days.push(item);
            }

            //将下个月要显示的天数加入days
            for (let i = 1; i <= 42 - this.getDays(this.year, this.month) - this.getWeek(this.year, this.month); i++) {
                const item = {
                    isTask: false,
                    day: i,
                    dayType: "nextMonth"
                };
                this.days.push(item);
            }

            //将上个月要显示的天数加入days
            for (let i = 0; i < this.getWeek(this.year, this.month); i++) {
                const item = {
                    isTask: false,
                    dayType: "prevMonth"
                };
                const lastMonthDays = this.getDays(this.year, this.month - 1);
                item.day = lastMonthDays - i;
                this.days.unshift(item);
            }
        },
        handleShowNextMonth() {
            // 点击下个月
            this.days = [];

            if (this.month < 12) {
                this.month = this.month + 1;

                this.pushDays();
            } else {
                this.month = this.month = 1;

                this.year = this.year + 1;

                this.pushDays();
            }
        },
        handleShowLastMonth() {
            // 点击上个月
            this.days = [];

            if (this.month > 1) {
                this.month = this.month - 1;

                this.pushDays();
            } else if (this.year > 1970) {
                this.month = 12;

                this.year = this.year - 1;

                this.pushDays();
            } else {
                this.$toast("不能查找更远的日期");
            }
        },
        getDate() {
            let now = new Date();

            this.year = now.getFullYear();

            this.month = now.getMonth() + 1;

            this.pushDays();
        },
        setDate(day) {
            const { dayType } = day;
            if (dayType === "nextMonth") {
                this.handleShowNextMonth();
            }
            if (dayType === "prevMonth") {
                this.handleShowLastMonth();
            }
            console.log(day);
        }
    },
    mounted() {
        this.getDate();
    }
};
</script>

<style lang="less">
.calendar {
    width: 6.8rem;
    margin: 0 auto;
    background: #fff;
    box-shadow: 0rem 0.01rem 0.03rem 0rem rgba(0, 0, 0, 0.5);
    border-radius: 0.1rem;
    filter: blur(0px);
    .control {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.26rem 0.3rem;
        position: relative;
        .prev {
            i {
                font-size: 0.28rem;
            }
        }
        .current-data {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            span {
                font-size: 0.26rem;
                font-family: MicrosoftYaHei;
                color: rgba(51, 51, 51, 1);
                line-height: 0.31rem;
                -webkit-background-clip: text;
            }
        }
        .next {
            i {
                transform: rotate(180deg);
                font-size: 0.28rem;
            }
        }
    }
    .calendar-header {
        .calendar-week-title {
            display: flex;
            justify-content: space-between;
            li {
                width: ceil(100% / 7);
                height: 0.68rem;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-grow: 1;
                color: rgba(51, 51, 51, 1);
            }
        }
    }
    .calendar-body {
        .month {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            li {
                width: ceil(100% / 7);
                height: 0.68rem;
                display: flex;
                justify-content: center;
                align-items: center;
                flex: 0 1 14.287%;
                color: rgba(51, 51, 51, 1);
                position: relative;
                span {
                    position: absolute;
                    right: 0;
                    top: 0;
                    font-size: 0.15rem;
                    font-family: MicrosoftYaHei;
                    color: rgba(60, 206, 181, 1);
                    line-height: 0.2rem;
                    -webkit-background-clip: text;
                }
                &.otherMonth {
                    color: rgba(153, 153, 153, 1);
                }
                &.currentDay {
                    background: red;
                    color: #fff;
                }
            }
        }
    }
}
</style>

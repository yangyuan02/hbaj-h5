<!--
 * @Author: yangyuan
 * @Date: 2020-04-21 22:23:16
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-04-22 00:29:07
 * @Description: 
 -->
<template>
    <div class="calendar">
        <div class="calendar-header">
            <ul class="calendar-week-title">
                <li v-for="(item, index) in week" :key="index">{{ item }}</li>
            </ul>
        </div>
        <div class="calendar-body">
            <ul class="month">
                <li v-for="(item, index) in days" :key="index">{{ item }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            week: ["日", "一", "二", "三", "四", "五", "六"],
            days: []
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
        pushDays() {
            //将这个月多少天加入数组days
            for (let i = 1; i <= this.getDays(this.year, this.month); i++) {
                this.days.push(i);
            }

            //将下个月要显示的天数加入days
            for (let i = 1; i <= 42 - this.getDays(this.year, this.month) - this.getWeek(this.year, this.month); i++) {
                this.days.push(i);
            }

            //将上个月要显示的天数加入days
            for (let i = 0; i < this.getWeek(this.year, this.month); i++) {
                var lastMonthDays = this.getDays(this.year, this.month - 1);
                this.days.unshift(lastMonthDays - i);
            }
        },
        getDate() {
            let now = new Date();

            this.year = now.getFullYear();

            this.month = now.getMonth() + 1;

            this.pushDays();
        }
    },
    mounted() {
        this.getDate();
    }
};
</script>

<style lang="less">
.calendar {
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
            }
        }
    }
}
</style>

/*
 * @Author: yangyuan
 * @Date: 2020-05-08 21:47:07
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-06-01 21:13:22
 * @Description:
 */

const formaData = dateTime => {
    var date = new Date(dateTime); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var year = date.getFullYear(),
        month = ("0" + (date.getMonth() + 1)).slice(-2),
        sdate = ("0" + date.getDate()).slice(-2),
        hour = ("0" + date.getHours()).slice(-2),
        minute = ("0" + date.getMinutes()).slice(-2),
        second = ("0" + date.getSeconds()).slice(-2);
    // 拼接
    var result = year + "-" + month + "-" + sdate + " " + hour + ":" + minute + ":" + second;
    // 返回
    return result;
};

const formPublicFlg = flg => {
    const publicFlg = {
        0: "内部",
        1: "公开"
    };
    return publicFlg[flg];
};

const formMessageText = type => {
    const message = {
        PROJECT: "课件类",
        TASK: "任务类",
        NEWS: "新闻资讯类",
        ROLE: "权限变更",
        DEPARTMENT: "部门变更",
        ENTERPRISE: "机构通知"
    };
    return type ? message[type] : type;
};

const formTaskText = type => {
    const task = {
        0: "待接收",
        1: "进行中",
        2: "已完成",
        3: "已到期"
    };
    return type || type === 0 ? task[type] : type;
};

export default {
    formaData,
    formPublicFlg,
    formMessageText,
    formTaskText
};

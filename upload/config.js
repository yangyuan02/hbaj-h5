/*
 * @Author: yangyuan
 * @Date: 2020-04-25 00:43:09
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-04-25 22:27:00
 * @Description:
 */
module.exports = Object.freeze({
    development: {
        //测试
        SERVER_PATH: "47.102.199.232", // ssh地址 服务器地址
        SSH_USER: "yangyuan", // ssh 用户名
        //方式一 用秘钥登录服务器(推荐), private 本机私钥文件地址(需要在服务器用户目录 一般是 /root/.ssh/authorized_keys 配置公钥 并该文件权限为 600, (.ssh文件夹一般默认隐藏)
        // PRIVATE_KEY: 'C:/Users/Html5/.ssh/id_rsa',
        PASSWORD: "yangyuan", //方式二 用密码连接服务器
        PATH: "/home/yangyuan/sh_msa/" // 需要上传的服务器目录地址 如 /usr/local/nginx/html
    },
    production: {
        //正式
        SERVER_PATH: "",
        SSH_USER: "root",
        PRIVATE_KEY: "",
        PATH: "/test/html"
    }
});

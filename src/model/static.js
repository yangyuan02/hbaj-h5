/*
 * @Author: yangyuan
 * @Date: 2020-04-14 21:26:49
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-04-24 22:58:21
 * @Description:
 */
import request from "../widget/request";

export const getLizardCode = data => request("/activity-static/lizard/index.js", data);

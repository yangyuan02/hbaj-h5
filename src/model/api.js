/*
 * @Author: yangyuan
 * @Date: 2020-04-13 16:26:21
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-04-25 17:49:08
 * @Description:
 */
import request from "../widget/request";

const baseUrl = "/";

export const home = (data, url) => request(`${baseUrl}home/${url}`, data);

/*
 * @Author: yangyuan
 * @Date: 2020-04-13 16:26:21
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-05-10 18:17:52
 * @Description:
 */
import request from "../widget/request";

const baseUrl = "/api";

export const home = (data, url) => request(`${baseUrl}/home/${url}`, data);

export const user = (data, url) => request(`${baseUrl}/user/${url}`, data);

export const news = data => request(`${baseUrl}/home/news`, data);

export const newsDetail = (data, url) => request(`${baseUrl}/home/news/${url}`, data);

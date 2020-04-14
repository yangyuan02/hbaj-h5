/*
 * @Author: yangyuan
 * @Date: 2020-04-13 16:26:21
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-04-14 15:17:17
 * @Description:
 */
import request from '../widget/request';

const baseUrl = '/returnOrder';

export const detail = data => request(`${baseUrl}/info/selectRqByOrderNo`, data);

export const update = data => request(`${baseUrl}/info/updateRo`, data);

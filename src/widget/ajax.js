/*
 * @Author: yangyuan
 * @Date: 2020-04-14 21:26:49
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-05-08 21:11:01
 * @Description:
 */
/**
 * @param {Object} options
 * @returns {Promise}
 */

export default function ajax({ hostPath = location.origin, url, async = true, timeout = 30000, type, headers, dataType, data }) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open(type, hostPath + url, async);

        xhr.timeout = timeout;

        // 设置请求头
        for (var k in headers) {
            xhr.setRequestHeader(k, headers[k]);
        }
        xhr.withCredentials = true;
        xhr.setRequestHeader("If-Modified-Since", "0");
        xhr.setRequestHeader("Cache-Control", "no-cache");

        xhr.responseType = dataType;

        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                    resolve(xhr.response);
                } else if (xhr.status === 401) {
                    window.localStorage.removeItem("authorization");
                    // window.location.href = "/";
                } else {
                    resolve({
                        data: [],
                        status: -500,
                        message: "请求出错，请稍后再试"
                    });
                }
            }
        };

        type == "GET" ? xhr.send(null) : xhr.send(data);
    });
}

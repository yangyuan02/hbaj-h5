import ajax from "@/widget/ajax";
import store from "@/widget/store";
import utils from "@/widget/utils";

function clearStorage() {
    // 清除所有已过期的存储
    const currentTime = new Date().getTime();
    let cacheStorage = localStorage;
    if (!utils.isLocalStorageSupported()) {
        cacheStorage = window.name;
    }
    if (cacheStorage) {
        Object.keys(cacheStorage).forEach(item => {
            const cacheData = store.get(item, "local");
            if (cacheData && cacheData.times) {
                if (currentTime > cacheData.times) {
                    // 缓存中的数据已过期
                    store.remove(item, "local");
                }
            }
        });
    }
}

/**
 *
 * @param {Boolean} cache 是否需要缓存
 * @param {Number} expires 过期时间
 * @param {Boolean} ignoreLogin 是否需要登录
 * @param {Object} data 请求数据
 * @param {String} dataType 请求类型
 * @param {Number} timeout 超时时间
 * @param {} headers 请求头
 */

export default function request(
    url,
    { type, timeout, dataType = "json", data, cache = false, expires = 5 * 60 * 1000, headers = { "Content-Type": "application/json" }, hostPath, ignoreLogin = false }
) {
    const options = {
        type,
        data,
        async: true,
        url: url,
        timeout,
        dataType,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-Requested-With": "XMLHttpRequest",
            Accept: "application/json"
        },
        hostPath
    };
    if (dataType !== "text") {
        options.data = data;
    }

    if (store.get("authorization", "local")) {
        options.headers["Authorization"] = `Bearer ${store.get("authorization", "local")}`;
        utils.setCookie("authorization", store.get("authorization", "local"));
    }

    // if (store.get("user", "local")) {
    //     utils.setCookie("userId", store.get("user", "local"));
    // }

    let optionData = data;

    if (headers && headers["Content-Type"] == "application/json") {
        // json类型
        options.headers["Content-Type"] = headers["Content-Type"];
        // options.data = JSON.stringify(options.data);
    } else {
        // x-www-form-urlencoded类型
        options.data = utils.queryStringify(options.data);
        optionData = utils.queryStringify(optionData);
    }

    options.headers["App-Source"] = window.__wxjs_environment === "miniprogram" ? "WECHAT" : "H5"; // 标识

    let cacheUrl = url;
    if (type.toLocaleUpperCase() === "POST" || type.toLocaleUpperCase() === "PUT") {
        options.data && (options.data = JSON.stringify(options.data));
    }
    if (type.toLocaleUpperCase() == "GET") {
        options.url = options.data ? url + "?" + utils.queryStringify(options.data) : url;
        cacheUrl = optionData ? url + "?" + optionData : url;
    }
    function httpRequest(resolve, reject) {
        ajax(options).then(results => {
            const cacheData = {
                times: new Date().getTime() + expires,
                results
            };
            if (results.suceeded && results.code === "0" && cache) {
                store.set(cacheUrl, cacheData, "local");
            }
            resolve(results);
        });
    }

    return new Promise((resolve, reject) => {
        let currentTime = new Date().getTime();
        const cacheData = store.get(cacheUrl, "local");
        clearStorage(); // 先比较一下，判断localStore中所以的key中是否有过期的数据
        if (cache && cacheData) {
            // cache为true且缓存存在
            const getCacheTime = cacheData.times;
            if (currentTime < getCacheTime) {
                // 是否过期
                resolve(cacheData.results);
            } else {
                // 已过期
                store.remove(cacheUrl, "local");

                httpRequest(resolve, reject);
            }
        } else {
            // cache为false或者cacheDate不存在
            store.remove(cacheUrl, "local");
            httpRequest(resolve, reject);
        }
    });
}

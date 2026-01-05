import { getEnvVersion } from "@/utils/env"
const getEnvBaseUrl = () => {
    const envVersion = getEnvVersion();
    let baseUrl = null
    switch (envVersion) {
      case 'develop':
        baseUrl = import.meta.env.VITE_SERVER_BASEURL__WEIXIN_DEVELOP
        break
      case 'trial':
        baseUrl = import.meta.env.VITE_SERVER_BASEURL__WEIXIN_TRIAL
        break
      case 'release':
        baseUrl = import.meta.env.VITE_SERVER_BASEURL__WEIXIN_RELEASE
        break
    }
    return baseUrl
}

const staticPath = 'https://shipx-static.oss-cn-shanghai.aliyuncs.com/'


export {
    getEnvBaseUrl,
    staticPath
}
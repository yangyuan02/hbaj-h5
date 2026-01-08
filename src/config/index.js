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


// CyberShipx
export const WX_CYBERSHIPX_APPID = import.meta.env.VITE_WX_CYBERSHIPX_APPID

// 船舶英语学习空间
export const WX_ENGLISH_APPID = import.meta.env.VITE_WX_ENGLISH_APPID


export const getWxAppid = () => {
  const appBaseInfo = uni.getAccountInfoSync && uni.getAccountInfoSync()
  console.log('appId', appBaseInfo.miniProgram.appId)
  return appBaseInfo.miniProgram.appId
}

export const getAppid = () => {
  const wxAppid = getWxAppid();
  if (wxAppid === WX_CYBERSHIPX_APPID) { // CyberShipx
    return 2
  }
  return 1  // 英语
}


export {
    getEnvBaseUrl,
    staticPath
}
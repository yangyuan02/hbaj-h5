const getEnvVersion = () => {
    const {
      miniProgram: { envVersion }
    } = uni.getAccountInfoSync()
    return envVersion;
}


export {
    getEnvVersion
}
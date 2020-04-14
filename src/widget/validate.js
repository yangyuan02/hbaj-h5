const validate = {
  /**
   * @param {string} phone
   * @return {boolean}
   */
  isMobile(text) {
    const pattern = /^1[3-9]\d{9}$/;
    return pattern.test(text);
  },
  isMessageCode(text) {
    const pattern = /^[0-9]{6}$/;
    return pattern.test(text);
  },
  isPicMessageCode(text) {
    const pattern = /^[0-9]{6}$/;
    return pattern.test(text);
  },
  /**
   *
   * @param {string} text
   * @return {boolean}
   */
  isNumber(text) {
    const pattern = /^[1-9]\d{0,8}$/;
    return pattern.test(text);
  },
  /**
   * @param {Number || String} text
   * @return {boolean}
   */
  checkNumber(text) {
    const pattern = /^[0-9]+.?[0-9]*$/;
    return pattern.test(text);
  },
  /**
   *
   * @param {string} text
   * @return {boolean}
   */
  isPercent(text) {
    const pattern = /^((\d+\.?\d*)|(\d*\.\d+))$/;
    return pattern.test(text);
  },
  /**
   * 邮箱验证
   * @param {string} email
   * @return {boolean}
   * @example
   * validate.isEmail('leafront@126.com')
   */
  isEmail(text) {
    const pattern = /^([a-zA-Z0-9]+[-_.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[-_.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,6}$/;
    return pattern.test(text);
  },
  /**
   *
   * @param {string} password
   * @return {boolean}
   */
  isPass(text) {
    const pattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
    return pattern.test(text);
  },
  /**
   * 验证是否为真实姓名，中英文和数字，中文算两个，长度不超过20
   * @param {string} name 姓名
   * @return {boolean}
   * @example
   * validate.isName('张三')
   */
  isName(text) {
    const pattern = /^([\u4e00-\u9fa5]|[A-Za-z_])+$/;
    if (pattern.test(text)) {
      text = text.replace(/[\u4e00-\u9fa5]/g, '__');
      return text.length <= 20;
    } else {
      return false;
    }
  }
};

export default validate;

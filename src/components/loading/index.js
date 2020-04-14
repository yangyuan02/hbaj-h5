import utils from '@/widget/utils';
import LoadingComponent from './tpl';

const pageLoading = {
  installed: false,
  install(Vue) {
    if (typeof window !== 'undefined' && window.Vue) {
      Vue = window.Vue;
    }
    Vue.component('Loading', LoadingComponent);
    if (pageLoading.installed) {
      return;
    }
    Vue.prototype.$showLoading = () => {
      // 如果页面有showLoading则不继续执行
      if (document.getElementById('showLoading')) {
        return;
      }
      // 1、创建构造器，定义好提示信息的模板
      const loadingTpl = Vue.extend({
        render: h => h('Loading')
      });
      // 2、创建实例，挂载到文档以后的地方
      const tpl = new loadingTpl().$mount().$el;
      // 3、把创建的实例添加到body中
      document.body.appendChild(tpl);

      //阻止遮罩滑动
      tpl.addEventListener(
        'touchmove',
        function(e) {
          if (!utils.isPassive()) {
            e.preventDefault();
          }
          e.stopPropagation();
        },
        utils.isPassive() ? { passive: true } : false
      );

      pageLoading.installed = true;
    };

    Vue.prototype.$hideLoading = () => {
      const maskUi = document.getElementById('showLoading');

      if (maskUi) {
        maskUi.parentNode.removeChild(maskUi);
      }
    };
  }
};

export default pageLoading;

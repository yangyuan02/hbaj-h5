import utils from '@/widget/utils';
import PageLoadingComponent from './tpl';

const pageLoading = {
  installed: false,
  install(Vue) {
    if (typeof window !== 'undefined' && window.Vue) {
      Vue = window.Vue;
    }
    Vue.component('PageLoading', PageLoadingComponent);

    if (pageLoading.installed) {
      return;
    }
    Vue.prototype.$showPageLoading = () => {
      // 如果页面有pageLoading则不继续执行
      if (document.querySelector('.ui-pageLoading-mask')) {
        return;
      }
      // 1、创建构造器，定义好提示信息的模板
      const pageLoadingTpl = Vue.extend({
        render: h => h('PageLoading')
      });
      // 2、创建实例，挂载到文档以后的地方
      const tpl = new pageLoadingTpl().$mount().$el;
      // 3、把创建的实例添加到body中
      document.body.appendChild(tpl);

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

    Vue.prototype.$hidePageLoading = () => {
      const maskUi = document.querySelector('.ui-pageLoading-mask');

      if (maskUi) {
        maskUi.parentNode.removeChild(maskUi);
      }
    };
  }
};

export default pageLoading;

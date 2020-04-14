import ToastComponent from './tpl';
const Toast = {
  installed: false,
  install(Vue, duration = 2000) {
    if (typeof window !== 'undefined' && window.Vue) {
      Vue = window.Vue;
    }
    // 1、注册组件
    Vue.component('Toast', ToastComponent);

    if (Toast.installed) return;
    Vue.prototype.$toast = text => {
      if (document.querySelector('.ui-toast-mask')) return;
      let toastTpl = Vue.extend({
        render: h => h('Toast', { props: { text } }) // template 需要compiler
      });
      // 2、创建实例，挂载到文档以后的地方
      let tpl = new toastTpl().$mount().$el;

      // 3、把创建的实例添加到body中
      document.body.appendChild(tpl);
      // 4.三秒后移除
      setTimeout(() => {
        document.body.removeChild(tpl);
      }, duration);

      Toast.installed = true;
    };
  }
};

export default Toast;

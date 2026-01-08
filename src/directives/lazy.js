// directives/lazy.js
import lazyImage from '@/assets/images/ui-lazyload.png'

export default {
  mounted(el, binding) {
    const {
      src,
      placeholder = lazyImage,
      error = lazyImage,
      isBackground = false
    } = binding.value || {}

    // 初始占位
    if (isBackground) {
      el.style.backgroundImage = `url(${placeholder})`
    } else {
      el.src = placeholder
    }

    // uni-app IntersectionObserver
    const observer = uni.createIntersectionObserver(
      el,
      {
        thresholds: [0.1]
      }
    )

    observer.observe(el, (res) => {
      if (res.intersectionRatio > 0) {
        // 图片加载（兼容小程序）
        uni.getImageInfo({
          src,
          success: () => {
            if (isBackground) {
              el.style.backgroundImage = `url(${src})`
            } else {
              el.src = src
            }
            el.classList?.add?.('ui-success-pic')
          },
          fail: () => {
            if (error) {
              if (isBackground) {
                el.style.backgroundImage = `url(${error})`
              } else {
                el.src = error
              }
            }
          },
          complete: () => {
            observer.disconnect()
          }
        })
      }
    })
  },
}

import { isFunction } from "/@/utils/internal/isType";
import type { App } from "vue";
type HTMLElementDeb = HTMLElement & { timer: null | NodeJS.Timeout; handler: (e: Event) => void };
export const debounceDirective = {
  install(app: App<Element>) {
    app.directive("debounce", {
      // 元素插入父 DOM 后调用
      mounted(el: HTMLElementDeb, binding: any) {
        const { fun, event, delay = 200 } = binding.value;
        if (!isFunction(fun) || !event) return;
        el.timer = null;
        el.handler = function (e: Event): void {
          if (el.timer) {
            clearTimeout(el.timer);
            el.timer = null;
          }
          el.timer = setTimeout(() => {
            fun(e);
            el.timer = null;
          }, delay);
        };
        el.addEventListener(event, el.handler);
      },
      // 被卸载之前调用 新增
      beforeUnmount(el: HTMLElementDeb, binding: any) {
        if (el.timer) {
          clearTimeout(el.timer);
          el.timer = null;
        }
        el.removeEventListener(binding.value.event, el.handler);
      },
    });
  },
};

import { check } from "../utils/auth";

/**
 * 权限指令实现方法， 没通过校验就从父节点删除
 * @param {Object} vue vue对象 
 * @param {Object} options 自定义参数
 */
function install(vue, options = {}) {
    vue.directive(options.name || "auth", {
        inserted(el, binding) {
            if (!check(binding.value)) {
                el.parentNode && el.parentNode.removeChild(el);
            }
        }
    });
}

export default { install };
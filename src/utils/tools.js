/**
  * 根据 localStorage 或者 sessionStorage 属性 获取 存储的JSON对象
  * @param {String} prototype 存入的的属性
  * @param {Object} storage localStorage 或者 sessionStorage
  */
export const getStorageObject = (prototype, storage = window.localStorage) => {
    var str = storage.getItem(prototype);
    var result = {};
    if (str && str != "") {
        result = JSON.parse(str);
    }
    return result;
}
/**
* 保存对象到localStorage 或者 sessionStorage
* @param {String} prototype 存入的键值
* @param {Object} obj 需要保保存的对象
* @param {Object} storage localStorage 或者 sessionStorage
*/
export const setStorageObject = (prototype, obj, storage = window.localStorage) => {
    var str = obj;
    if (typeof str === 'object') {
        str = JSON.stringify(obj)
    }
    storage.setItem(prototype, str);
}
/**
* 根据键值获取保存到localStorage 或者 sessionStorage的值
* @param {Sting} prototype 需要存储的键值
* @param {String} key 存储对象中的某个值
* @param {Object} storage localStorage 或者 sessionStorage
*/
export const getStorageValue = (prototype, key, storage = window.localStorage) => {
    var obj = getStorageObject(prototype, storage);
    if (obj[key]) {
        return obj[key];
    }
    return null;
}
/**
* 追加值到已经存在的localStorage 或者 sessionStorage
* @param {String} prototype Storage属性
* @param {String} key 需要保存的键值
* @param {any} value 需要追加的任意对象值
* @param {Object} storage localStorage 或者 sessionStorage
*/
export const addStorageKeyObject = (prototype, key, value, storage = window.localStorage) => {
    var obj = getStorageObject(prototype, storage);
    obj[key] = value;
    setStorageObject(prototype, obj, storage);
}
/**
* 根据键值删除已经存在的localStorage 或者 sessionStorage 的值
* @param {String} prototype Storage属性
* @param {String} key 需要保存的键值 
* @param {Object} storage localStorage 或者 sessionStorage
*/
export const delStorageKeyObject = (prototype, key, storage = window.localStorage) => {
    var obj = getStorageObject(prototype, storage);
    if (obj[key]) {
        delete obj[key];
    }
    setStorageObject(prototype, obj, storage);
}
/**
  * 判断是否是IOS设备
  * @returns {boolean}
  */
export const isIOS = () => {
    return (/iphone|ipad|ipod/gi).test(navigator.appVersion);
}
/**
* 判断是否是PC端
* @returns {boolean}
*/
export const isPC = () => {
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
    }
    return flag;
}
/**
  * 判断对象是否为空
  * @param {判断的对象} obj 
  */
export const isEmptyObject = (obj) => {
    for (var key in obj) {
        return false;
    }
    return true;
}
/**
* 把string转成成base64编码
* @returns {String}
*/
export const b64EncodeUnicode = (str) => {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
}
/**
  * 判断是否在微信内部
  * @returns {boolean}
  */
export const isWeiXinPlatform = () => {
    var userAgent = navigator.userAgent.toLowerCase();
    var res = false;
    //来源判断
    if (userAgent.indexOf("micromessenger") > -1) {
        res = true;
    }
    return res;
}
/**
  *  格式化姓名的样式
  * @param name 格式化的名称  如：岳*   岳*目
  * @returns {string}
  */
export const formatName = (name) => {
    name = name + '';
    var len = name.length;
    if (len >= 3) {
        let reg = /^(.).+(.)$/g;    //三字以上名称的生活
        name = name.replace(reg, '$1*$2');
    } else {
        let reg = /^(.).$/g;  //两位名称的生活
        name = name.replace(reg, '$1*');
    }
    return name;
}
/**
*  格式化手机号码的样式
* @param phone 格式化的手机号码 如： 188****0000
* @returns {string}
*/
export const formatPhone = (phone) => {
    phone = phone + '';
    phone = phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
    return phone;
}
/**
*  格式化身份证的样式
* @param idCard 格式化的手机号码 如： 334321******232321
* @returns {string}
*/
export const formatIdCard = (idCard) => {
    idCard = idCard + '';
    idCard = idCard.replace(/(\d{6})\d{9}(\d{3})/, '$1******$2');
    return idCard;
}
/**
*  格式化银行卡的样式
* @param bankCard 格式化的银行卡 如： 6542*********7876
* @returns {string}
*/
export const formatBankCard = (bankCard) => {
    bankCard = bankCard + '';
    bankCard = bankCard.replace(/(\d{4})\d{8,11}(\d{4})/, '$1******$2');
    return bankCard;
}
/**
*  格式化金额样式
* @param money 格式化的名称  30，000
* @returns {string}
*/
export const formatMoney = (money) => {
    money = parseFloat(money);
    money = money.toFixed(2);
    money = money.toLocaleString();
    return money;
}
/**
*  字符串去空格
* @param str 需要格式化的数据
* @returns {string}
*/
export const trimStr = (str) => {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
    if (!name) return;
    return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
    if (!name) return;
    window.localStorage.removeItem(name);
}

/**
 * 获取style样式
 */
export const getStyle = (element, attr, NumberMode = 'int') => {
    let target;
    // scrollTop 获取方式不同，没有它不属于style，而且只有document.body才能用
    if (attr === 'scrollTop') {
        target = element.scrollTop;
    } else if (element.currentStyle) {
        target = element.currentStyle[attr];
    } else {
        target = document.defaultView.getComputedStyle(element, null)[attr];
    }
    //在获取 opactiy 时需要获取小数 parseFloat
    return NumberMode == 'float' ? parseFloat(target) : parseInt(target);
}

/**
 * 页面到达底部，加载更多
 */
export const loadMore = (element, callback) => {
    let windowHeight = window.screen.height;
    let height;
    let setTop;
    let paddingBottom;
    let marginBottom;
    let requestFram;
    let oldScrollTop;

    document.body.addEventListener('scroll', () => {
        loadMore();
    }, false)
    //运动开始时获取元素 高度 和 offseTop, pading, margin
    element.addEventListener('touchstart', () => {
        height = element.offsetHeight;
        setTop = element.offsetTop;
        paddingBottom = getStyle(element, 'paddingBottom');
        marginBottom = getStyle(element, 'marginBottom');
    }, { passive: true })

    //运动过程中保持监听 scrollTop 的值判断是否到达底部
    element.addEventListener('touchmove', () => {
        loadMore();
    }, { passive: true })

    //运动结束时判断是否有惯性运动，惯性运动结束判断是非到达底部
    element.addEventListener('touchend', () => {
        oldScrollTop = document.body.scrollTop;
        moveEnd();
    }, { passive: true })

    const moveEnd = () => {
        requestFram = requestAnimationFrame(() => {
            if (document.body.scrollTop != oldScrollTop) {
                oldScrollTop = document.body.scrollTop;
                loadMore();
                moveEnd();
            } else {
                cancelAnimationFrame(requestFram);
                //为了防止鼠标抬起时已经渲染好数据从而导致重获取数据，应该重新获取dom高度
                height = element.offsetHeight;
                loadMore();
            }
        })
    }

    const loadMore = () => {
        if (document.body.scrollTop + windowHeight >= height + setTop + paddingBottom + marginBottom) {
            callback();
        }
    }
}

/**
 * 显示返回顶部按钮，开始、结束、运动 三个过程中调用函数判断是否达到目标点
 */
export const showBack = callback => {
    let requestFram;
    let oldScrollTop;

    document.addEventListener('scroll', () => {
        showBackFun();
    }, false)
    document.addEventListener('touchstart', () => {
        showBackFun();
    }, { passive: true })

    document.addEventListener('touchmove', () => {
        showBackFun();
    }, { passive: true })

    document.addEventListener('touchend', () => {
        oldScrollTop = document.body.scrollTop;
        moveEnd();
    }, { passive: true })

    const moveEnd = () => {
        requestFram = requestAnimationFrame(() => {
            if (document.body.scrollTop != oldScrollTop) {
                oldScrollTop = document.body.scrollTop;
                moveEnd();
            } else {
                cancelAnimationFrame(requestFram);
            }
            showBackFun();
        })
    }

    //判断是否达到目标点
    const showBackFun = () => {
        if (document.body.scrollTop > 500) {
            callback(true);
        } else {
            callback(false);
        }
    }
}


/**
 * 运动效果
 * @param {HTMLElement} element   运动对象，必选
 * @param {JSON}        target    属性：目标值，必选
 * @param {number}      duration  运动时间，可选
 * @param {string}      mode      运动模式，可选
 * @param {function}    callback  可选，回调函数，链式动画
 */
export const animate = (element, target, duration = 400, mode = 'ease-out', callback) => {
    clearInterval(element.timer);

    //判断不同参数的情况
    if (duration instanceof Function) {
        callback = duration;
        duration = 400;
    } else if (duration instanceof String) {
        mode = duration;
        duration = 400;
    }

    //判断不同参数的情况
    if (mode instanceof Function) {
        callback = mode;
        mode = 'ease-out';
    }

    //获取dom样式
    const attrStyle = attr => {
        if (attr === "opacity") {
            return Math.round(getStyle(element, attr, 'float') * 100);
        } else {
            return getStyle(element, attr);
        }
    }
    //根字体大小，需要从此将 rem 改成 px 进行运算
    const rootSize = parseFloat(document.documentElement.style.fontSize);

    const unit = {};
    const initState = {};

    //获取目标属性单位和初始样式值
    Object.keys(target).forEach(attr => {
        if (/[^\d^\.]+/gi.test(target[attr])) {
            unit[attr] = target[attr].match(/[^\d^\.]+/gi)[0] || 'px';
        } else {
            unit[attr] = 'px';
        }
        initState[attr] = attrStyle(attr);
    });

    //去掉传入的后缀单位
    Object.keys(target).forEach(attr => {
        if (unit[attr] == 'rem') {
            target[attr] = Math.ceil(parseInt(target[attr]) * rootSize);
        } else {
            target[attr] = parseInt(target[attr]);
        }
    });


    let flag = true; //假设所有运动到达终点
    const remberSpeed = {};//记录上一个速度值,在ease-in模式下需要用到
    element.timer = setInterval(() => {
        Object.keys(target).forEach(attr => {
            let iSpeed = 0;  //步长
            let status = false; //是否仍需运动
            let iCurrent = attrStyle(attr) || 0; //当前元素属性址
            let speedBase = 0; //目标点需要减去的基础值，三种运动状态的值都不同
            let intervalTime; //将目标值分为多少步执行，数值越大，步长越小，运动时间越长
            switch (mode) {
                case 'ease-out':
                    speedBase = iCurrent;
                    intervalTime = duration * 5 / 400;
                    break;
                case 'linear':
                    speedBase = initState[attr];
                    intervalTime = duration * 20 / 400;
                    break;
                case 'ease-in':
                    let oldspeed = remberSpeed[attr] || 0;
                    iSpeed = oldspeed + (target[attr] - initState[attr]) / duration;
                    remberSpeed[attr] = iSpeed
                    break;
                default:
                    speedBase = iCurrent;
                    intervalTime = duration * 5 / 400;
            }
            if (mode !== 'ease-in') {
                iSpeed = (target[attr] - speedBase) / intervalTime;
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            }
            //判断是否达步长之内的误差距离，如果到达说明到达目标点
            switch (mode) {
                case 'ease-out':
                    status = iCurrent != target[attr];
                    break;
                case 'linear':
                    status = Math.abs(Math.abs(iCurrent) - Math.abs(target[attr])) > Math.abs(iSpeed);
                    break;
                case 'ease-in':
                    status = Math.abs(Math.abs(iCurrent) - Math.abs(target[attr])) > Math.abs(iSpeed);
                    break;
                default:
                    status = iCurrent != target[attr];
            }

            if (status) {
                flag = false;
                //opacity 和 scrollTop 需要特殊处理
                if (attr === "opacity") {
                    element.style.filter = "alpha(opacity:" + (iCurrent + iSpeed) + ")";
                    element.style.opacity = (iCurrent + iSpeed) / 100;
                } else if (attr === 'scrollTop') {
                    element.scrollTop = iCurrent + iSpeed;
                } else {
                    element.style[attr] = iCurrent + iSpeed + 'px';
                }
            } else {
                flag = true;
            }

            if (flag) {
                clearInterval(element.timer);
                if (callback) {
                    callback();
                }
            }
        })
    }, 20);
}

/**
    * 图片压缩
    * @param {object} file 图片文件对象
    * @param {object} options 压缩对象的参数如   { maxSide: 1280, quality: 0.8, maxSize: 300 }
    * @param {function} callback 回调方法
  */
export const photoCompress = (file, options, callback) => {
    let windowURL = window.URL || window.webkitURL;
    let maxSize = 200 * 1024;  //200kb
    // 图片最大的尺寸
    if (options && options.maxSize && options.maxSize > maxSize) {
        maxSize = options.maxSize * 1024;
    }
    if (windowURL.createObjectURL) {
        let dataURL = windowURL.createObjectURL(file);
        canvasDataURL(dataURL, options, callback);
    } else {
        let ready = new FileReader();
        /*开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.*/
        ready.readAsDataURL(file);
        ready.onload = function (e) {
            let re = e.target.result;
            if (re.length <= maxSize) {
                options.quality = 1;  //保证图片质量不变不压缩
            }
            canvasDataURL(re, options, callback);
        }
    }
}

/**
 * canvas压缩图片 
 * @param {string} path 图片文件的路径
 * @param {object} obj 压缩对象的参数如   { maxSide: 1280, quality: 0.8, maxSize: 300 }
 * @param {function} callback 回调方法
 */
export const canvasDataURL = (path, obj, callback) => {
    let img = document.createElement('img');
    img.src = path;
    img.onload = function () {
        let that = this;
        // 默认按比例压缩
        let w = that.width,
            h = that.height,
            scale = w / h;
        if (w > h) { //横屏的时候
            //传递的宽度固定 1280 ， 如果原始宽度大于1280的才适配
            if (obj.maxSide && obj.maxSide < w) {
                w = obj.maxSide;
            }
            h = obj.height || (w / scale);
        } else {  //竖屏的时候
            //传递的最大边宽度固定 1280 ， 如果原始高度度大于1280的才适配
            if (obj.maxSide && obj.maxSide < h) {
                h = obj.maxSide;
            }
            w = obj.width || (h * scale);
        }
        let quality = 0.8;  // 默认图片质量为0.8
        //生成canvas
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        // 创建属性节点
        let anw = document.createAttribute("width");
        anw.nodeValue = w;
        let anh = document.createAttribute("height");
        anh.nodeValue = h;
        canvas.setAttributeNode(anw);
        canvas.setAttributeNode(anh);
        ctx.drawImage(that, 0, 0, w, h);
        // 图像质量
        if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
            quality = obj.quality;
        }
        // quality值越小，所绘制出的图像越模糊
        let base64 = canvas.toDataURL('image/jpeg', quality);
        // 回调函数返回base64的值
        callback && callback(base64);
    }
}
/**
 * 获取文件的创建url路径
 * @param {object} file 文件对象
 */
export const getFileAbsolutePath = (file) => {
    let url = null;
    if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file);
    } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}
/**
 * base64转file
 * @param {string} base64Data base64Data数据
 * @param {string} filename 文件名称
 */
export const base64ToFile = (base64Data, filename) => {
    let arr = base64Data.split(',');
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    const prefixArr = mime.split("/");
    const prefix = prefixArr.length > 1 ? prefixArr[1] : "jpg";
    const name = filename + "." + prefix;
    return new File([u8arr], name, { type: mime });
}

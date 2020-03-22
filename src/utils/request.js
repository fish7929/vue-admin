import axios from "axios";
import { notification } from "ant-design-vue";

function request(options) {
    return axios(options).then(res => {
        return res;
    }).catch(error => {
        const { response: { status, statusText } } = error;
        //有个错误提示
        notification.error({
            //取消eslint 这行的报错
            // eslint-disable-next-line no-unused-vars
            message: h => (
                <div>
                    请求错误：<sapn style="color: red;">{status}</sapn>：{options.url}
                </div>
            ),
            description: statusText
        });
        //这样处理好处是:在调用端处理数据的时候不需要考虑错误的返回
        return new Promise.reject(error);
    })
}

export default request;
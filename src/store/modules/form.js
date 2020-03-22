import router from "../../router/index";
import request from "../../utils/request";

const state = {
    step: {
        payAccount: "12345",
        receiveAccount: {
            type: "alipay",
            number: ''
        }
    }
}

const actions = {
    async submitStepForm({ commit }, { payload }) {
        await request({
            url: '/api/form',
            method: "post",
            data: payload
        });
        commit("saveStepFormData", { payload });
        router.push("/form/step-form/result");
    }
}

const mutations = {
    saveStepFormData(state, { payload }) {
        state.step = {
            ...state.step,
            ...payload
        };
    }
}

export default {
    namespaced: true,  //利用命名空间
    state,
    actions,
    mutations
}
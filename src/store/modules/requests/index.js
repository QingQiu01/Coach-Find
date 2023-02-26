import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";
export default {
  namespaced: true,
  state() {
    return {
      requests: [],
    };
  },
  mutations: mutations,
  actions: actions,
  getters: getters,
};

import { createStore } from "vuex";
import requestsModule from "./modules/requests/index";
import coachesModule from "./modules/coaches/index";
import authModule from "./modules/auth/index";
const store = createStore({
  modules: {
    coaches: coachesModule,
    requests: requestsModule,
    auth: authModule,
  },
});
export default store;

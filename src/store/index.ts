import {store} from 'quasar/wrappers';
import Vuex from 'vuex';

// import example from './module-example';
// import { ExampleStateInterface } from './module-example/state';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */


export default store(function ({ Vue }) {
  Vue.use(Vuex);

  return new Vuex.Store({
    modules: {},

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: !!process.env.DEBUGGING
  });
});

import Vue from 'vue';
import App from './App.vue';
import * as svgicon from 'vue-svgicon';

export const eventBus = new Vue();

Vue.config.productionTip = false;

Vue.use(svgicon, {
  classPrefix: 'AppIcon-',
});

new Vue({
  render: h => h(App),
}).$mount('#app');

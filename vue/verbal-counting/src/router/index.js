import Vue from 'vue'
import Router from 'vue-router';
import Settings from '../views/Settings';
import Game from '../views/Game';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'settings',
      component: Settings
    },
    {
      path: '/game',
      name: 'game',
      component: Game
    }
  ]
});

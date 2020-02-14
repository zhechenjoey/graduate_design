import Vue from "vue";
import Router from "vue-router";

import home from '@/views/home.vue'
// import about from '@/views/about.vue'
// import tutorial from '@/views/tutorial.vue'
// import gallery from '@/views/gallery.vue'
// import zone from '@/views/zone.vue'
// import person from '@/views/person.vue' //个人设置
// import myzone from '@/views/myzone.vue' //我的空间
// import friends from '@/views/friends.vue' //我的空间
// import search from '@/views/search.vue' //我的空间
// import actions from '@/views/actions.vue' //我的空间
// import artist from '@/views/artist.vue' //我的空间

// import login from '@/components/common/login.vue'
// import register from '@/components/common/register.vue'

//const home = resolve => require(["@/views/home.vue"], resolve);
const about = resolve => require(["@/views/about.vue"], resolve);
const tutorial = resolve => require(["@/views/tutorial.vue"], resolve);
const gallery = resolve => require(["@/views/gallery.vue"], resolve);
const zone = resolve => require(["@/views/zone.vue"], resolve);
const person = resolve => require(["@/views/person.vue"], resolve);
const myzone = resolve => require(["@/views/myzone.vue"], resolve);
const friends = resolve => require(["@/views/friends.vue"], resolve);
const follow = resolve => require(["@/components/friends/follow.vue"], resolve);
const fans = resolve => require(["@/components/friends/fans.vue"], resolve);
//const search = resolve => require(["@/views/search.vue"], resolve);
const artist = resolve => require(["@/views/artist.vue"], resolve);
const pmaster = resolve => require(["@/views/pmaster.vue"], resolve);
const msg = resolve => require(["@/views/msg.vue"], resolve);

const login = resolve => require(["@/components/common/login.vue"], resolve);
const register = resolve =>
  require(["@/components/common/register.vue"], resolve);

Vue.use(Router);

export default new Router({
  linkActiveClass: "active",
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: home,
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/home",
      name: "home",
      component: home,
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/about",
      name: "about",
      component: about,
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: login,
      meta: {
        keepAlive: false // 不需要缓存
      }
    },
    {
      path: "/register",
      name: "register",
      component: register,
      meta: {
        keepAlive: false // 不需要缓存
      }
    },
    {
      path: "/tutorial",
      name: "tutorial",
      component: tutorial,
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/gallery",
      name: "gallery",
      component: gallery,
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/zone",
      name: "zone",
      component: zone,
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/artist",
      name: "artist",
      component: artist,
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/person",
      name: "person",
      component: person,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/myzone",
      name: "myzone",
      component: myzone,
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/friends",
      name: "friends",
      component: friends,
      meta: {
        keepAlive: true
      },
      children: [
        {
          path: "",
          name: "follow",
          component: follow,
          meta: {
            keepAlive: true
          }
        },
        {
          path: "follow",
          name: "follow",
          component: follow,
          meta: {
            keepAlive: true
          }
        },
        {
          path: "fans",
          name: "fans",
          component: fans,
          meta: {
            keepAlive: true
          }
        }
      ]
    },
    {
      path: "/pmaster",
      name: "pmaster",
      component: pmaster,
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/msg",
      name: "msg",
      component: msg,
      meta: {
        keepAlive: true
      }
    }
  ]
});

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import '../static/css/common.css'
import '../static/css/gd.css'
import '../static/js/gd.js'
import axios from 'axios'
import store from './store/index.js'
//PHP默认接受的参数是form-data类型，而axios默认发送的是payloads类型
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = [function(data) {
    let ret = ''
    for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
}]
Vue.prototype.axios = axios;

// import semantic from 'semantic'
// import '../node_modules/semantic-ui-css/semantic.min.css'
import '../static/css/gd.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
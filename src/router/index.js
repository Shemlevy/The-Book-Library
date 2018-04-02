import Vue from 'vue'
import Router from 'vue-router'
import BookList from "../components/BookList.vue";
import UserBooks from "../components/UserBooks.vue";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'BookList',
      component: BookList
    },
    {
      path: '/UserBooks',
      name: 'UserBooks',
      component: UserBooks
    },

  ]
})

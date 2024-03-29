import Vue from "vue"
import VueRouter from "vue-router"

import firebase from "firebase/app";
import "firebase/auth";

import Hello from '../views/Hello.vue'
// import Register from '../views/Register.vue'
import SignIn from '../views/SignIn.vue'

import Home from "../views/Home.vue"
import Post from "../views/Post.vue"
import Hashtag from "../views/Hashtag.vue"
import Notification from "../views/Notification.vue"
import Message from "../views/Message.vue"
import Bookmark from "../views/Bookmark.vue"
import List from "../views/List.vue"
import Profile from "../views/Profile.vue"
import Preference from "../views/Preference.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: (to, from, next) => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          console.log(user)
          next()
        } else {
          next("/hello");
        }
      });
    }
  },
  {
    path: "/post/:pid",
    name: "Post",
    component: Post,
    props: true,
  },
  {
    path: "/hashtag",
    name: "Hashtag",
    component: Hashtag,
  },
  {
    path: "/notification",
    name: "Notification",
    component: Notification,
  },
  {
    path: "/message",
    name: "Message",
    component: Message,
  },
  {
    path: "/bookmark",
    name: "Bookmark",
    component: Bookmark,
  },
  {
    path: "/list",
    name: "List",
    component: List,
  },
  {
    path: "/profile/:uid",
    name: "Profile",
    component: Profile,
    props: true,
  },
  {
    path: "/preference",
    name: "Preference",
    component: Preference,
  },
  {
    path: "/hello",
    name: "hello",
    component: Hello
  },
  // {
  //   path: "/register",
  //   name: "register",
  //   component: Register
  // },
  {
    path: "/signin",
    name: "signIn",
    component: SignIn
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,

  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
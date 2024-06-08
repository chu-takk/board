import { createRouter, createWebHashHistory } from 'vue-router'

import List from "@/views/list.vue"
import Write from "@/views/write.vue"
import View from "@/views/view.vue"
import Modify from "@/views/modify.vue"
import Join from "@/views/join.vue"
import Login from "@/views/login.vue"

const routes = [
  {
    path: "/login",
    component: Login
  },
  {
    path: "/join",
    component: Join
  },
  {
    path: "/",
    component: List
  },
  {
    path: "/write",
    component: Write
  },
  {
    path: "/view/:id",
    component: View
  },
  {
    path: "/modify/:id",
    component: Modify
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

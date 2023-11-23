import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const auth = (to, from, next) => {
  if(!localStorage.getItem("access_token"))
  {
    return next({name: "login"})
  }
  next();
}

const guest = (to, from, next) => {
  if(localStorage.getItem("access_token"))
  {
    return next({name: "parkings.active"})
  }
  next();
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/register',
      name: 'register',
      beforeEnter: guest,
      component: () => import("../views/Auth/Register.vue")
    },
    {
      path: '/login',
      name: 'login',
      beforeEnter: guest,
      component: () => import("../views/Auth/Login.vue")
    },
    {
      path: '/vehicles',
      name: 'vehicles.index',
      beforeEnter: auth,
      component: () => import("../views/Vehicles/Index.vue")
    },
    {
      path: "/vehicles/create",
      name: "vehicles.create",
      beforeEnter: auth,
      component: () => import("../views/Vehicles/Create.vue")
    },
    {
      path: "/vehicles/:id/edit",
      name: "vehicles.edit",
      beforeEnter: auth,
      component: () => import("../views/Vehicles/Edit.vue")
    },
    {
      path: "/profile",
      name: "profile.edit",
      beforeEnter: auth,
      component: () => import("../views/Profile/Edit.vue")
    },
    {
      path: "/profile/change-password",
      name: "profile.change-password",
      beforeEnter: auth,
      component: () => import("../views/Profile/ChangePassword.vue")
    },
    {
      path: "/parkings/active",
      name: "parkings.active",
      beforeEnter: auth,
      component: () => import("../views/Parkings/ActiveParkings.vue")
    },
    {
      path: "/parkings/new",
      name: "parkings.create",
      beforeEnter: auth,
      component: () => import("../views/Parkings/OrderParking.vue")
    },
    {
      path: "/parkings/history",
      name: "parkings.history",
      beforeEnter: auth,
      component: () => import("../views/Parkings/ParkingHistory.vue")
    },
    {
      path: "/parkings/:id",
      name: "parkings.show",
      beforeEnter: auth,
      component: () => import("../views/Parkings/ParkingDetails.vue")
    },
  ]
})

export default router

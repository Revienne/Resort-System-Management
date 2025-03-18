import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "./components/ManangerLayout.vue";
import Dashboard from "./pages/Dashboard.vue";
import Roomlist from "./pages/Roomlist.vue";
import Roomtype from "./pages/Roomtype.vue";
import Reservation from "./pages/Reservation.vue";
import Login from "./pages/Login.vue";
import NotFound from "./pages/NotFound.vue";

const route = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "/Dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "/Roomlist",
        name: "Roomlist",
        component: Roomlist,
      },
      {
        path: "/Roomtype",
        name: "Roomtype",
        component: Roomtype,
      },
      {
        path: "/Reservation",
        name: "Reservation",
        component: Reservation,
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: route,
});

export default router;
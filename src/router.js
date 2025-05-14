import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from './components/ManangerLayout.vue';
import Dashboard from './pages/Dashboard.vue';
import Roomlist from './pages/Roomlist.vue';
import Roomtype from './pages/Roomtype.vue';
import Reservation from './pages/Reservation.vue';
import Login from './pages/Login.vue';
import NotFound from './pages/NotFound.vue';
import Staff from './pages/Staff.vue';

// Define routes
const routes = [
  {
    path: "/",
    redirect: "/login",  // Automatically redirect to login page if no token
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    component: DefaultLayout,  // Layout for authenticated pages
    children: [
      {
        path: "dashboard",  // Updated path to match navigation link
        name: "Dashboard",
        component: Dashboard,
        meta: { requiresAuth: true },  // Protect this route
      },
      {
        path: "roomlist",
        name: "Roomlist",
        component: Roomlist,
        meta: { requiresAuth: true },  // Protect this route
      },
      {
        path: "roomtype",
        name: "Roomtype",
        component: Roomtype,
        meta: { requiresAuth: true },  // Protect this route
      },
      {
        path: "staff",
        name: "Staff",
        component: Staff,
        meta: { requiresAuth: true },  // Protect this route
      },
      {
        path: "reservation",
        name: "Reservation",
        component: Reservation,
        meta: { requiresAuth: true },  // Protect this route
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*", // Catch-all route for 404
    name: "NotFound",
    component: NotFound,
  },
];

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard to check authentication
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("auth_token");  // Checks for auth token
  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");  // Redirect to login if not authenticated
  } else {
    next();  // Proceed to the route
  }
});


export default router;

  import { createRouter, createWebHashHistory } from 'vue-router'
  import auth from '../../middleware/auth'
  import VueRouteMiddleware from 'vue-route-middleware'


const routes = [
  {
    path: "/",
    name: "Accueil",
    component: () => import("../components/Accueil"),
  },

  {
    path: "/inscription",
    name: "Inscription",
    component: () => import("../components/Inscription"),
  },

  {
    path: "/connection",
    name: "Connection",
    component: () => import("../components/Connection"),
  },

  {
    path: "/actualite",
    name: "Actualité",
    component: () => import("../components/Actualite"),
    meta: {
      middleware: auth
    }
  },

  {
    path: "/profil",
    name: "Profil",
    component: () => import("../components/Profil"),
    meta: {
      middleware: auth
    }
  },

  {
    path: "/listeutilisateur",
    name: "Liste des utilisateurs",
    component: () => import("../components/ListeUtilisateur"),
    meta: {
      middleware: auth
    }
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

  router.beforeEach(VueRouteMiddleware())

export default router;

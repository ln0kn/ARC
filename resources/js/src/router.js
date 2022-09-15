/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior() {
        return {
            x: 0,
            y: 0
        }
    },
    routes: [

        {
            // =============================================================================
            // MAIN LAYOUT ROUTES
            // =============================================================================
            path: '',
            component: () => import('./layouts/main/Main.vue'),
            children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================

                {
                    path: '/',
                    name: 'home',
                    meta: {
                        auth: true
                    },
                    component: () => import('./views/Home.vue')
              },
                {
                    path: '/page2',
                    name: 'page-2',
                    meta: {
                        auth: true
                    },
                    component: () => import('./views/Page2.vue')
              },
                {
                    path: '/dossier',
                    name: '/dossier',
                    meta: {
                        auth: true
                    },
                    component: () => import('./views/mesVues/Dossier.vue')
              },
                {
                    path: '/message',
                    name: '/message',
                    meta: {
                        auth: true
                    },
                    component: () => import('./views/mesVues/Message/Message.vue')
              },
                {
                    path: '/corbeille',
                    name: '/corbeille',
//                    meta: {
//                        auth: true
//                    },
                    component: () => import('./views/mesVues/Corbeille.vue')
              },
                {
                    path: '/parametre-categorie',
                    name: '/parametre/categorie',
                    component: () => import('./views/mesVues/Parametres/Categorie.vue'),
                    meta: {
                        breadcrumb: [
                            {
                                title: 'Home',
                                url: '/'
                            },
                            {
                                title: 'Paramètre'
                            },
                            {
                                title: 'Catégorie',
                                active: true
                            },
                        ],
                        pageTitle: 'Catégorie',
                        auth: true,
                    }
              },
                {
                    path: '/parametre-groupe',
                    name: '/parametre/groupe',
                    component: () => import('./views/mesVues/Parametres/Groupe.vue'),
                    meta: {
                        breadcrumb: [
                            {
                                title: 'Home',
                                url: '/'
                            },
                            {
                                title: 'Paramètre'
                            },
                            {
                                title: 'Groupe',
                                active: true
                            },
                        ],
                        pageTitle: 'Groupe',
                        auth: true,
                        //                        rule: 'editor'
                    }
              },
                {
                    path: '/parametre-utilisateur',
                    name: '/parametre/utilisateur',
                    component: () => import('./views/mesVues/Parametres/User.vue'),
                    meta: {
                        breadcrumb: [
                            {
                                title: 'Home',
                                url: '/'
                            },
                            {
                                title: 'Paramètre'
                            },
                            {
                                title: 'Utilisateur',
                                active: true
                            },
                        ],
                        pageTitle: 'Utilisateur',
                        auth: true,
                    }
              },
                {
                    path: '/parametre-license',
                    name: '/parametre/license',

                    component: () => import('./views/mesVues/Parametres/License.vue'),
                    meta: {
                        breadcrumb: [
                            {
                                title: 'Home',
                                url: '/'
                            },
                            {
                                title: 'Paramètre'
                            },
                            {
                                title: 'License',
                                active: true
                            },
                        ],
                        pageTitle: 'License',
                        auth: true
                    }
              },
                {
                    path: '/planning',
                    name: '/planning',
                    meta: {
                        auth: true
                    },
                    component: () => import('./views/mesVues/Planning.vue')
              },
            ],
        },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
        {
            path: '',
            component: () => import('@/layouts/full-page/FullPage.vue'),
            children: [
        // =============================================================================
        // PAGES
        // =============================================================================
                {
                    path: '/login',
                    //                    name: 'page-login',
                    component: () => import('./views/mesVues/Login.vue')
              },
                {
                    path: '/pages/error-404',
                    name: 'page-error-404',
                    component: () => import('@/views/pages/Error404.vue')
              },

            ]
        },
        // Redirect to 404 page, if no match found
        {
            path: '*',
            redirect: '/pages/error-404'
        }
    ],
})

router.afterEach(() => {
    // Remove initial loading
    const appLoading = document.getElementById('loading-bg')
    if (appLoading) {
        appLoading.style.display = "none";
    }
})
const defaultRoute = '/';


router.beforeEach((to, from, next) => {
    let userInfo = JSON.parse(localStorage.getItem("userInfo")) || ''
    //console.log(userInfo)
    //authentification requise
    if (to.meta.auth) {
        if (userInfo) {
            if (to.fullPath == '/') {
                return next()
            } else {
                console.log(userInfo)
                //verification des droits de l user
                for (const property of Object.values(userInfo.groupe.permission)) {
                    //console.log(property)
                    //console.log (to.fullPath.includes(property.page))
                    if (to.fullPath.includes(property.page)) {
                        //console.log(property.statut)
                        //user autoriser a acceder a la page
                        if (property.statut == 1 && property.droit == 'voir') {
                            //console.log(property)
                            return next()
                        }
                        //user pas autoriser . redirection de user
                        else {
                            next({
                                path: defaultRoute
                            });
                        }
                    }
                }
            }
        }
        //user pas connecter reste sur login
        else {
            return next('/login');
        }
    } else {
        return next();
    }
});


//return next();
export default router

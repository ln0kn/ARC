/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default [
    {
        url: "/",
        name: "Home",
        slug: "home",
        icon: "HomeIcon",
  },
    {
        url: "/page2",
        name: "Page 2",
        slug: "page2",
        icon: "FileIcon",
  },
    {
        url: '/message',
        name: "Message",
        slug: "message",
        icon: "FileIcon",
          },
    {
        url: '/Corbeille',
        name: "Corbeille",
        slug: "Corbeille",
        icon: "FileIcon",
          },
    {
        url: '/dossier',
        name: "Dossier",
        slug: "dossier",
        icon: "FileIcon",
          },
    {
        url: null,
        name: "Paramètres",
        icon: "ShoppingCartIcon",
        submenu: [
            {
                url: '/parametre-categorie',
                name: "Catégorie",
                slug: "parametre-categorie",
          },
            {
                url: '/parametre-groupe',
                name: "Groupe",
                slug: "parametre-groupe",
          },
            {
                url: '/parametre-license',
                name: "License",
                slug: "parametre-License",
          },
            {
                url: '/parametre-utilisateur',
                name: "Utilisateur",
                slug: "parametre-utilisateur",
          },
        ]
      },
    {
        url: '/planning',
        name: "Planning",
        slug: "planning",
        icon: "FileIcon",
          },
]

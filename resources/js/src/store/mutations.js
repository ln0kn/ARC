/*=========================================================================================
  File Name: mutations.js
  Description: Vuex Store - mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import router from '../router.js'
const audio = new Audio('/mixkit-positive-notification-951.wav')
const mutations = {


    // /////////////////////////////////////////////
    // COMPONENTS
    // /////////////////////////////////////////////

    // Vertical NavMenu

    TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE(state, value) {
        state.isVerticalNavMenuActive = value
    },
    TOGGLE_REDUCE_BUTTON(state, val) {
        state.reduceButton = val
    },
    UPDATE_MAIN_LAYOUT_TYPE(state, val) {
        state.mainLayoutType = val
    },
    UPDATE_VERTICAL_NAV_MENU_ITEMS_MIN(state, val) {
        state.verticalNavMenuItemsMin = val
    },
    UPDATE_VERTICAL_NAV_MENU_WIDTH(state, width) {
        state.verticalNavMenuWidth = width
    },


    // VxAutoSuggest

    UPDATE_STARRED_PAGE(state, payload) {

        // find item index in search list state
        const index = state.navbarSearchAndPinList["pages"].data.findIndex((item) => item.url == payload.url)

        // update the main list
        state.navbarSearchAndPinList["pages"].data[index].is_bookmarked = payload.val

        // if val is true add it to starred else remove
        if (payload.val) {
            state.starredPages.push(state.navbarSearchAndPinList["pages"].data[index])
        } else {
            // find item index from starred pages
            const index = state.starredPages.findIndex((item) => item.url == payload.url)

            // remove item using index
            state.starredPages.splice(index, 1)
        }
    },

    // Navbar-Vertical

    ARRANGE_STARRED_PAGES_LIMITED(state, list) {
        const starredPagesMore = state.starredPages.slice(10)
        state.starredPages = list.concat(starredPagesMore)
    },
    ARRANGE_STARRED_PAGES_MORE(state, list) {
        let downToUp = false
        let lastItemInStarredLimited = state.starredPages[10]
        const starredPagesLimited = state.starredPages.slice(0, 10)
        state.starredPages = starredPagesLimited.concat(list)

        state.starredPages.slice(0, 10).map((i) => {
            if (list.indexOf(i) > -1) downToUp = true
        })

        if (!downToUp) {
            state.starredPages.splice(10, 0, lastItemInStarredLimited)
        }
    },


    // ////////////////////////////////////////////
    // UI
    // ////////////////////////////////////////////

    TOGGLE_CONTENT_OVERLAY(state, val) {
        state.bodyOverlay = val
    },
    UPDATE_PRIMARY_COLOR(state, val) {
        state.themePrimaryColor = val
    },
    UPDATE_THEME(state, val) {
        state.theme = val
    },
    UPDATE_WINDOW_WIDTH(state, width) {
        state.windowWidth = width
    },
    UPDATE_WINDOW_SCROLL_Y(state, val) {
        state.scrollY = val
    },


    // /////////////////////////////////////////////
    // User/Account
    // /////////////////////////////////////////////

    // Updates user info in state and localstorage
    UPDATE_USER_INFO(state, payload) {

        // Get Data localStorage
        let userInfo = JSON.parse(localStorage.getItem("userInfo")) || state.AppActiveUser

        for (const property of Object.keys(payload)) {

            if (payload[property] != null) {
                // If some of user property is null - user default property defined in state.AppActiveUser
                state.AppActiveUser[property] = payload[property]

                // Update key in localStorage
                userInfo[property] = payload[property]
            }


        }
        // Store data in localStorage
        localStorage.setItem("userInfo", JSON.stringify(userInfo))
    },



    // /////////////////////////////////////////////
    // custom mutation
    // /////////////////////////////////////////////


    SET_VARIABLE_METHOD(state, list) {
        switch (list[0]) {
            case '/getCategorie':
                state.listeCategorie = list[1];
                break;

            case '/getGroupe':
                state.listeGroupe = list[1];
                break;

            case '/getUser':
                state.listeUser = list[1];
                break;

            // case '/getMsgUser':
            //     state.listeMsgUser = list[1];
            //     alert(state.listeMsgUser)
            //     break;

            case '/getDossier':
                state.listeDossier = list[1];
                break;

            case '/getRappel':
                state.listeRappel = list[1];
                break;

            case '/getCorbeille':
                state.listeCorbeille = list[1];
                break;

            case '/getRdv':
                state.listeRdv = list[1]; 
                break;
                break;

            case '/getHost':
                state.listeHost = list[1]; 
                break;

            case '/getUserContact':
                state.listeUserContact = list[1];
                break;

            case '/getUserConnect':
                localStorage.setItem('userData',list[1]['id']);
                // state.getMe = list[1];
                break;

            case '/getLicense':
                state.listeLicense = list[1];
                break;

            default : 
                if(list[0].includes('/getMsgUser')){
                    state.listeMsgUser = list[1];
                    if(list[1].length > 0)
                        //console.log(list[1][0]['from_id'])
                        state.conversationId = list[1][0]['from_id']
                }
        }
    },



    HANDLE_NOTIFICATION(state, payload) {
        if (payload.fail) {
            for (const item in payload.errors)
                for (const k in payload.errors[item])
                    this._vm.$vs.notify({
                        title: 'Attention',
                        text: payload.errors[item][k],
                        color: 'warning',
                        time: 5000,
                        position: 'top-right',
                        icon: 'query_builder'
                    })
        } else {
            this._vm.$vs.notify({
                title: 'succès',
                text: 'Opération réussie',
                color: 'success',
                time: 5000,
                position: 'top-right',
                icon: 'query_builder'
            })
        }
        this._vm.$vs.loading.close('.form-loading > .con-vs-loading')
    },



    ADD_VAR_LIST(state, payload) {
//        console.log(payload[0])
        switch (payload[0]) {
            case '/addCategory':
                state.listeCategorie.unshift(payload[1]);
                break;

            case '/addHost':
                state.listeHost.unshift(payload[1]);
                break;

            case '/addGroupe':
                state.listeGroupe.unshift(payload[1]);
                break;

            case '/addUser':
                state.listeUser.unshift(payload[1]);
                break;

            case '/addMsgUser':
                state.listeMsgUser.unshift(payload[1]);
                break;

            case '/restaureDossier':
                for (const item in state.listeCorbeille) {
                    if (state.listeCorbeille[item]['id'] == payload[1]) {
                        state.listeCorbeille.splice(item, 1);
                    }
                }
                break;

            case '/addRdv':
//                console.log(state.listeRdv)
                state.listeRdv.push(payload[1]);
                console.log(state.listeRdv)
                break;

            case '/addLicense':
                state.listeLicense.push(payload[1]);
                break;
        }

    },





    EDIT_VAR_LIST(state, payload) {
        switch (payload[0]) {
            case '/editCategory':
                for (const item in state.listeCategorie) {
                    if (state.listeCategorie[item]['id'] == payload[1].id) {
                        state.listeCategorie.splice(item, 1, payload[1]);
                    }
                }
                break;

            case '/editGroupe':
                for (const item in state.listeGroupe) {
                    if (state.listeGroupe[item]['id'] == payload[1].id) {
                        state.listeGroupe.splice(item, 1, payload[1]);
                    }
                }
                break;

            case '/editUser':
                for (const item in state.listeUser) {
                    if (state.listeUser[item]['id'] == payload[1].id) {
                        state.listeUser.splice(item, 1, payload[1]);
                    }
                }
                break;

            case '/editHost':
                for (const item in state.listeHost) {
                    if (state.listeHost[item]['id'] == payload[1].id) {
                        state.listeHost.splice(item, 1, payload[1]);
                    }
                }
                break;

            case '/editRdv':
                for (const item in state.listeRdv) {
                    if (state.listeRdv[item]['id'] == payload[1].id) {
                        state.listeRdv.splice(item, 1, payload[1]);
                    }
                }
                console.log(state.listeRdv)
                break;
        }

    },





    DELETE_VAR_LIST(state, payload) {
        switch (payload[0]) {
            case '/deleteCategorie':
                for (const item in state.listeCategorie) {
                    if (state.listeCategorie[item]['id'] == payload[1].id) {
                        console.log(state.listeCategorie[item]['id'] + '  ' + payload[1].id)
                        state.listeCategorie.splice(item, 1);
                    }
                }
                break;

            case '/deleteGroupe':
                for (const item in state.listeGroupe) {
                    if (state.listeGroupe[item]['id'] == payload[1].id) {
                        state.listeGroupe.splice(item, 1);
                    }
                }
                break;

            case '/deleteUser':
                for (const item in state.listeUser) {
                    if (state.listeUser[item]['id'] == payload[1].id) {
                        state.listeUser.splice(item, 1);
                    }
                }
                break;

            case '/deleteHost':
                for (const item in state.listeHost) {
                    if (state.listeHost[item]['id'] == payload[1].id) {
                        state.listeHost.splice(item, 1);
                    }
                }
                break;

            case '/deleteDossier':
                for (const item in state.listeDossier) {
                    if (state.listeDossier[item]['id'] == payload[1].id) {
                        state.listeDossier.splice(item, 1);
                    }
                }
                break;
        }

    },




    CLEAR_INPUT(state, payload) {
        if (payload.where == '/addCategory' || payload.where == '/editCategory' || payload.where == '/deleteCategorie') {
            payload.category.id = null
            payload.category.designation = null
            payload.category.cycleDeVie = null
            payload.category.accessibilite = null
        } else {
            if (payload.where == '/addUser' || payload.where == '/editUser' || payload.where == '/deleteUser') {
                console.log(payload)
                //                payload.user.id = null
                payload.user.nom = null
                payload.user.prenom = null
                payload.user.groupe = null
                payload.user.email = null
                payload.user.password = null
                payload.user.password_confirmation = null
            } else {
                if (payload.where == '/deleteDossier') {
                    alert()
                    payload.dossier.id = null
                } 
                else {
                    if (payload.where == '/restaureDossier') {
                        payload.dossier.id = null
                        payload.dossier.designation = null
                        payload.dossier.categorie = null
                    }
                    else{
                        if (payload.where == '/addRdv' || payload.where == '/editRdv' || payload.where == '/deleteRdv') {
                        payload.rdv.id = null
                        payload.rdv.intitule = null
                        payload.rdv.user = null
                        payload.rdv.startDate = null
                        payload.rdv.endDate = null
                        }else{
                            if (payload.where == '/addMsgUser' ) {
                                payload.msg.userId = null ;
                                payload.msg.text = null ;
                                
                            } else {
                                if(payload.where == '/addHost'|| payload.where == '/editHost' || payload.where == '/deleteHost' ){
                                    payload.hote.id = null
                                    payload.hote.designation = null
                                    payload.hote.utilisateur = null
                                    payload.hote.adresse = null
                                }else{
                                    if(payload.where == '/addLicense'){
                                        payload.license.code = null
                                    }

                                }
                                
                            }

                        }
                        
                    }

                }

            }

        }
    },





    AUTHORISATION_FAILED(state, payload) {
        this._vm.$vs.notify({
            title: 'ACCÈS REFUSÉ',
            text: payload,
            color: 'danger',
            time: 6000,
            position: 'top-center',
            icon: 'query_builder'
        })
    },





    //////////////////////////////////////////////////////////////////////////////////////
    /////////   CHAT
    /////////////////////////////////////////////////////////////////////////////////////


    ADD_MSG(state, payload) {
        state.listeMsgUser.push(payload);
    },

    /**choisir quqmd declencher le son de la notifivation ou afficher une notifivation */
    CHAT_NOTIFICATION(state,payload ){
        //le destinataire
        if (localStorage.getItem('userData') == payload.user_id) {
            //il est sur la page message
            if (router.currentRoute.name == '/message') {
                //il nst pas sur la conversion de l enneteur
                if (state.conversationId != payload.user_id) {
                    Object.values(state.listeUserContact).forEach((value) => {
                        if (value['id'] == payload.from_id) {
                          value.unread_count++;
                        }
                     })
                    audio.play()
                    /*setTimeout(() =>{
                        audio.pause()
                        audio.load()
                    }, 10)*/
                } 
            } else {
                audio.play()
                this._vm.$vs.notify({
                    title: 'message',
                    text: 'Vous avez recu un nouveau message',
                    color: 'danger',
                    time: 5000,
                    position: 'top-right',
                    icon: 'query_builder'
                })
            }
        }














        /*if(localStorage.getItem('userData') == e.message.user_id){
             audio.play()
          //context.commit('ADD_MSG', e.message);
        }else{
          console.log('i m in else')
          
          //context.commit('ADD_MSG', e.message);
        }
        console.log("payload")
        if(router.currentRoute.name == '/message'){
            if(state.conversationId != payload.user_id){
                this._vm.$vs.notify({
                    title: 'Info',
                    text: 'Message recu',
                    color: 'info',
                    time: 5000,
                    position: 'top-right',
                    //icon: 'query_builder'
                })
            }
        }else{

        }*/


    }




}

export default mutations

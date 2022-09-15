import axios from '../axios.js'
import router from '../router.js'
import Echo                from 'laravel-echo'



const audio = new Audio('/mixkit-positive-notification-951.wav')

/*=========================================================================================
  File Name: actions.js
  Description: Vuex Store - actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

const actions = {

    // /////////////////////////////////////////////
    // COMPONENTS
    // /////////////////////////////////////////////

    // Vertical NavMenu
    updateVerticalNavMenuWidth({
        commit
    }, width) {
        commit('UPDATE_VERTICAL_NAV_MENU_WIDTH', width)
    },

    // VxAutoSuggest
    updateStarredPage({
        commit
    }, payload) {
        commit('UPDATE_STARRED_PAGE', payload)
    },

    // The Navbar
    arrangeStarredPagesLimited({
        commit
    }, list) {
        commit('ARRANGE_STARRED_PAGES_LIMITED', list)
    },
    arrangeStarredPagesMore({
        commit
    }, list) {
        commit('ARRANGE_STARRED_PAGES_MORE', list)
    },

    // /////////////////////////////////////////////
    // UI
    // /////////////////////////////////////////////

    toggleContentOverlay({
        commit
    }) {
        commit('TOGGLE_CONTENT_OVERLAY')
    },
    updateTheme({
        commit
    }, val) {
        commit('UPDATE_THEME', val)
    },

    // /////////////////////////////////////////////
    // User/Account
    // /////////////////////////////////////////////

    updateUserInfo({
        commit
    }, payload) {
        commit('UPDATE_USER_INFO', payload)
    },

    ////////////////////////////////////////////////////
    ////custom methods by me                        // 
    /////////////////////////////////////////////////

    async addMethod(context, obj) {
        await axios.post(obj.where, obj).then((response) => {
            context.commit('HANDLE_NOTIFICATION', response.data);
            if (!response.data.fail) {
                context.commit('ADD_VAR_LIST', [obj.where, response.data]);
                context.commit('CLEAR_INPUT', obj);
            }
        }).catch((error) => {
            alert('faa' + error);
        })
    },

    async editMethod(context, obj) {
        await axios.put(obj.where, obj).then((response) => {
            context.commit('HANDLE_NOTIFICATION', response.data);
            if (!response.data.fail) {
                context.commit('EDIT_VAR_LIST', [obj.where, response.data]);
                context.commit('CLEAR_INPUT', obj);
            }
        }).catch((error) => {
            alert(error);
        })
    },

    getMethod(context, obj) {
        axios.get(obj.where).then((response) => {
            // console.log(obj.where)
            context.commit('SET_VARIABLE_METHOD', [obj.where, response.data]);
        }).catch(function (error) {
            //recuperre l erreur
            let rsp = JSON.stringify(error)
            let rsp2 = JSON.parse(rsp)
            //si l user n est pas autorise a acceder a cette resource
            if (rsp2.message.includes('403')) {
                context.commit('AUTHORISATION_FAILED', 'accès refuse');
            } else {
                alert(error)
            }
        })
    },

    deleteMethod(context, obj) {
        axios({
                method: 'delete',
                url: obj.where,
                data: obj.groupe
            })
            .then((response) => {   
                context.commit('HANDLE_NOTIFICATION', response.data);
                if (!response.data.fail) {
                    context.commit('DELETE_VAR_LIST', [obj.where, response.data]);
                    // context.commit('CLEAR_INPUT', obj);
                }
            }).catch((error) => {
                //recuperre l erreur
                let rsp = JSON.stringify(error)
                let rsp2 = JSON.parse(rsp)
                //si l user n est pas autorise a acceder a cette resource
                if (rsp2.message.includes('403')) {
                    context.commit('AUTHORISATION_FAILED', 'accès refuse');
                } else {
                    alert(error)
                }
            })
    },


    async loginUser(context, obj) {
        axios.post('/auth/login', obj, {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
            .then(
                (response) => {
                    localStorage.setItem("userInfo", JSON.stringify(response.data))
                    router.push('/')
                }
            ).catch(
                (error) => console.log(error))
    },

    logoutUser(context, obj) {
        axios.post('/logout', {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
            .then(
                (response) => {
                    localStorage.removeItem('userInfo');
                    router.push('/login')
                }
            ).catch(
                (error) => console.log(error))
    },



    ////////////////////////////////////////////////
   //////   for chat 
  ////////////////////////////////////////////////

    setUser(context){
        new Echo({
            broadcaster: 'socket.io',
            host: window.location.hostname + ':6001'
          })
         .channel('test')
         .listen('NewMessage', function (e) { 
            context.commit('ADD_MSG', e.message);
            context.commit('CHAT_NOTIFICATION', e.message);
            console.log(context)
        })

    }




}

export default actions

<template >
    <div id="chat-app" class="border border-solid d-theme-border-grey-light rounded relative overflow-hidden">
        <vs-sidebar class="items-no-padding" parent="#chat-app" :click-not-close="clickNotClose" :hidden-background="clickNotClose" v-model="isChatSidebarActive" id="chat-list-sidebar">

            <!-- USER PROFILE SIDEBAR -->
            <user-profile :active="activeProfileSidebar" :userId="18" class="user-profile-container" :isLoggedInUser="isLoggedInUserProfileView" @closeProfileSidebar="closeProfileSidebar"></user-profile>

            <div class="chat__profile-search flex p-4">
                <div class="relative inline-flex">
                    <vs-avatar  class="m-0 border-2 border-solid border-white" size="40px"  />
                    <div class="h-3 w-3 border-white border border-solid rounded-full absolute right-0 bottom-0" :class="'bg-' + getStatusColor(true)"></div>
                </div>
                <!-- <vs-input icon-no-border icon="icon-search" icon-pack="feather" class="w-full mx-5 input-rounded-full" placeholder="Search or start a new chat" v-model="searchQuery"/> -->
                <vs-input icon-no-border icon="icon-search" icon-pack="feather" class="w-full mx-5 input-rounded-full" placeholder="Search or start a new chat" />

                <feather-icon class="md:inline-flex lg:hidden -ml-3 cursor-pointer" icon="XIcon" @click="toggleChatSidebar(false)" />
            </div>

            <vs-divider class="d-theme-border-grey-light m-0" />


            <VuePerfectScrollbar  class="scroll-area pt-6 px-6" :settings="settings" :key="$vs.rtl">
              <ul >
                <li class="cursor-pointer" v-for="contact in listeUserContact" :key="contact.id" @click="updateActiveChatUser(contact)">
                    <chat-contact :contact="contact" :unseenMsg="contact.unread_count"></chat-contact>
                </li>
              </ul>
          </VuePerfectScrollbar>
        </vs-sidebar>

        <!-- RIGHT COLUMN -->
        <div class="chat__bg no-scroll-content chat-content-area border border-solid d-theme-border-grey-light border-t-0 border-r-0 border-b-0" :class="{'sidebar-spacer--wide': clickNotClose, 'flex items-center justify-center': activeChatUser === null}">
            <template v-if="activeChatUser">
                <div class="chat__navbar">
                    <chat-navbar :isSidebarCollapsed="!clickNotClose" :userId="activeChatUser" :isPinnedProp="isChatPinned" @openContactsSidebar="toggleChatSidebar(true)" @showProfileSidebar="showProfileSidebar" @toggleIsChatPinned="toggleIsChatPinned"></chat-navbar>
                </div>
                <VuePerfectScrollbar  class="chat-content-scroll-area border scroll-area pt-6 px-6" :settings="settings" :key="$vs.rtl">
                  <div class="chat__log" ref="chatLog">
                        <chat-log :userId="activeChatUser" v-if="activeChatUser"></chat-log>
                    </div>
              </VuePerfectScrollbar>
                <!-- <VuePerfectScrollbar class="chat-content-scroll-area border border-solid d-theme-border-grey-light" :settings="settings" ref="chatLogPS" :key="$vs.rtl">
                    <div class="chat__log" ref="chatLog">
                        <chat-log :userId="activeChatUser" v-if="activeChatUser"></chat-log>
                    </div>
                </VuePerfectScrollbar> -->
                <div class="chat__input flex p-4 bg-white">
                    <vs-input class="flex-1" placeholder="Entrez votre message" v-model="msg.text" @keyup.enter="sendMsg" />
                    <vs-button class="bg-primary-gradient ml-4" type="filled" @click="sendMsg">Envoyer</vs-button>
                </div>
            </template>
            <template v-else>
                <div class="flex flex-col items-center">
                    <feather-icon icon="MessageSquareIcon" class="mb-4 bg-white p-8 shadow-md rounded-full" svgClasses="w-16 h-16"></feather-icon>
                    <h4 class=" py-2 px-4 bg-white shadow-md rounded-full cursor-pointer" @click.stop="toggleChatSidebar(true)"> Messagerie </h4>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
import ChatContact         from "./ChatContact.vue"
import ChatLog             from './ChatLog.vue'

import UserProfile         from "./UserProfile.vue"
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import ChatNavbar          from './ChatNavbar.vue'

    export default {
        data() {
          return {
            active               : true,
            isHidden             : false,
            searchContact        : "",
            activeProfileSidebar : false,
            userProfileId        : -1,
            userProfileId        : 0,
            isChatPinned         : false,
            settings             : {
              maxScrollbarLength : 60,
              wheelSpeed         : 0.70,
            },
            clickNotClose        : true,
            activeChatUser        : null,
            isChatSidebarActive  : true,
            isLoggedInUserProfileView: false,
            msg                       :{
              to_id: null,
              text: null,
            }
          } 
        },
        mounted() {
           //this.$store.dispatch('setUser')
      
          this.$store.dispatch('getMethod', {
                'where': '/getUserContact'
            })
        },
        computed: {
          activeUser() {
            return this.$store.state.getMe
          },
          listeUserContact() {
            this.userProfileId = this.$store.state.getMe.id
            return this.$store.state.listeUserContact
          },
          isActiveChatUser() {
            alert(this.activeChatUser)
            return (userId) => userId == this.activeChatUser
          },
          
        },
        methods: {
          updateActiveChatUser(contactId) {
            this.unseenMsg = 0
            Object.values(this.listeUserContact).forEach((value) => {
               if (value['id'] == contactId.id) {
                 value.unread_count = 0;
               }
            })

            
            this.activeChatUser = contactId.id
            
            let chatData = this.$store.dispatch('getMethod',{
                'where': '/getMsgUser?id='+contactId.id
            })
            if (chatData) this.isChatPinned = true
            else this.isChatPinned = false
            this.toggleChatSidebar()
            this.msg.text = ''
            this.msg.to_id = contactId.id
          },
          sendMsg() {
            if (!this.msg.text) return
            this.$store.dispatch('addMethod', {
                'where': '/addMsgUser',
                'msg': this.msg,
            })
            console.log('klj')
            // this.typedMessage = ''
            // this.$refs.chatLogPS.$el.scrollTop = this.$refs.chatLog.scrollHeight
          },
          toggleIsChatPinned(value) {
            this.isChatPinned = value
          },
          showProfileSidebar(userId, openOnLeft = false) {
            this.userProfileId = 1
            this.isLoggedInUserProfileView = openOnLeft
            this.activeProfileSidebar = !this.activeProfileSidebar
          },
          closeProfileSidebar(value) {
            this.activeProfileSidebar = value
          },
          getStatusColor() {
            return (isActiveUser) => {
              const userStatus = this.getUserStatus(isActiveUser)

              if (userStatus == "online") {
                return "success"
              } else if (userStatus == "do not disturb") {
                return "danger"
              } else if (userStatus == "away") {
                return "warning"
              } else {
                return "grey"
              }
            }
          },
          toggleChatSidebar(value = false) {
            if (!value && this.clickNotClose) return
            this.isChatSidebarActive = value
          }
        },
        components: {
          VuePerfectScrollbar,
          ChatContact,
          UserProfile,
          ChatNavbar,
          ChatLog,
        },
    }

</script>


<style lang="scss">
@import "@sass/vuexy/apps/chat.scss";
</style>

<!-- =========================================================================================
    File Name: ChatLog.vue
    Description: Chat Application - Log of chat
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
    <div id="component-chat-log" class="m-8" v-if="chatData">
        <div v-for="(msg, index) in chatData" class="msg-grp-container" :key="index">
            <div class="flex items-start" :class="msg.from_id != userId ? 'flex-row-reverse' : '' ">
                <!-- <template v-if="msg.from_id === userId">
                    lkk
                </template> -->
                <template v-if="index == 0">
                    <vs-avatar size="40px" class="border-2 shadow border-solid border-white m-0 flex-shrink-0" :class="msg.from_id != userId ? 'sm:ml-5 ml-3' : 'sm:mr-5 mr-3'" ></vs-avatar>
                </template>

                <!-- <template v-if="chatData[index-1]">
                    <div class="mr-16" v-if="!(!hasSentPreviousMsg(chatData[index-1].isSent, msg.isSent) || !isSameDay(msg.time, chatData.msg[index-1].time))"></div>
                </template> -->

                <div class="msg break-words relative shadow-md rounded py-3 px-4 mb-2 rounded-lg max-w-sm" :class="{'bg-primary-gradient text-white': msg.from_id != userId, 'border border-solid border-grey-light bg-white': msg.from_id == userId}">
                    <span> {{ msg.content }}{{ msg.created_at }} </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Echo from "laravel-echo"

//window.io = require('socket.io-client');
export default{
    props: {
        userId: {
            type: Number,
            required: true,
        }
    },
    computed: {
        chatData() {
            return this.$store.state.listeMsgUser
        },
        activeUserImg() {
            return this.$store.state.AppActiveUser.photoURL;
        },
        senderImg() {
            return (isSentByActiveUser) => {
                if (isSentByActiveUser) return this.$store.state.AppActiveUser.photoURL
                else return this.$store.getters['chat/contact'](this.userId).photoURL
            }
        },
        hasSentPreviousMsg() {
            return (last_sender, current_sender) => last_sender == current_sender
        },
    },
    methods: {
        isSameDay(time_to, time_from) {
            const date_time_to = new Date(Date.parse(time_to))
            const date_time_from = new Date(Date.parse(time_from));
            return date_time_to.getFullYear() === date_time_from.getFullYear() &&
                date_time_to.getMonth() === date_time_from.getMonth() &&
                date_time_to.getDate() === date_time_from.getDate();
        },
        toDate(time) {
            const locale = "en-us";
            const date_obj = new Date(Date.parse(time));
            const monthName= date_obj.toLocaleString(locale, {
                month: 'short'
            });
            return date_obj.getDate() + ' '  + monthName;
        },
        scrollToBottom() {
            this.$nextTick(() => {
                this.$parent.$el.scrollTop = this.$parent.$el.scrollHeight
            });
        }
    },
    updated() {
        this.scrollToBottom();
    },
    mounted() {
        this.$store.dispatch('getMethod', {
            'where': '/getMsgUser?id='+this.userId
        })
        this.scrollToBottom();
    }
}
</script>

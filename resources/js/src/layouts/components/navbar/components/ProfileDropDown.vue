<template>
    <div class="the-navbar__user-meta flex items-center" v-if="activeUserInfo.nom">

        <div class="text-right leading-tight hidden sm:block">
            <p class="font-semibold">{{activeUserInfo.nom }} {{activeUserInfo.prenom }}</p>
        </div>

        <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">

            <div class="con-img ml-3">
                <img  :src="activeUserInfo.photoURL" alt="img" width="40" height="40" class="rounded-full shadow-md cursor-pointer block" />
            </div>

            <vs-dropdown-menu class="vx-navbar-dropdown">
                <ul style="min-width: 9rem">

                    <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white" @click="$router.push('/pages/profile').catch(() => {})">
                        <feather-icon icon="UserIcon" svgClasses="w-4 h-4" />
                        <span class="ml-2">Message</span>
                    </li>

                    <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white" @click="$router.push('/apps/email').catch(() => {})">
                        <feather-icon icon="MailIcon" svgClasses="w-4 h-4" />
                        <span class="ml-2">Planning</span>
                    </li>

                    <vs-divider class="m-1" />

                    <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white" @click="logout">
                        <feather-icon icon="LogOutIcon" svgClasses="w-4 h-4" />
                        <span class="ml-2">Logout</span>
                    </li>
                </ul>
            </vs-dropdown-menu>
        </vs-dropdown>
    </div>
</template>

<script>
    import firebase from 'firebase/app'
    import 'firebase/auth'

    export default {
        data() {
            return {

            }
        },
        computed: {
            activeUserInfo() {
                return JSON.parse(localStorage.getItem("userInfo"))
                console.log(localStorage.getItem('userInfo').nom)
                return this.$store.state.AppActiveUser
            }
        },
        methods: {
            logout() {
                if (localStorage.getItem('userInfo'))
                    this.$store.dispatch('logoutUser')
            },
        }
    }

</script>

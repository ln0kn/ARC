<template>
    <div class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center" id="page-login">
        <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
            <vx-card>
                <div slot="no-body" class="full-page-bg-color">

                    <div class="vx-row no-gutter justify-center items-center">

                        <div class="vx-col hidden lg:block lg:w-1/2">
                            <img src="@assets/images/pages/login.png" alt="login" class="mx-auto">
                        </div>

                        <div class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg">
                            <div class="p-8 login-tabs-container">
                                <div class="vx-card__title mb-4">
                                    <h4 class="mb-4">Connexion</h4>
                                    <p>Connectez vous, pour accéder à l'application .</p>
                                </div>
                                <div>
                                    <vs-input name="email" icon-no-border icon="icon icon-user" icon-pack="feather" label-placeholder="Email" v-model="email" class="w-full" v-validate="'required'" data-vv-validate-on="blur" />
                                    <span class="text-danger text-sm">{{ errors.first('email') }}</span>

                                    <vs-input type="password" name="motDePasse" icon-no-border icon="icon icon-lock" icon-pack="feather" label-placeholder="Password" v-model="password" class="w-full mt-6" data-vv-validate-on="blur" v-validate="'required|min:6|max:10'" />
                                    <span class="text-danger text-sm">{{ errors.first('motDePasse') }}</span>

                                    <div class="flex flex-wrap justify-between my-5">
                                    </div>
                                    <vs-button type="border" @click.prevent="loginUser">Connexion</vs-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </vx-card>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                email: null,
                password: null,
            }
        },
        methods: {
            loginUser() {
                // If form is not validated or user is already login return
                if (!this.validateForm) {
                    this.$validator.validateAll().then(result => {
                        if (result) {
                            this.$store.dispatch('loginUser', {
                                'email': this.email,
                                'password': this.password,
                            })
                        }
                    })
                }
            }
        }
    }

</script>

<style lang="scss">
    #page-login {
        .social-login-buttons {
            .bg-facebook {
                background-color: #1551b1
            }

            .bg-twitter {
                background-color: #00aaff
            }

            .bg-google {
                background-color: #4285F4
            }

            .bg-github {
                background-color: #333
            }
        }
    }

</style>

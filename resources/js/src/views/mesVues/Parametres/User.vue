<template>
    <vs-row vs-align="flex-start" vs-type="flex" vs-justify="center" vs-w="12">
        <vs-col class="pr-5 pb-5" vs-type="flex" vs-justify="center" vs-align="center" vs-lg="6" vs-sm="12" vs-xs="12">
            <vx-card title="Liste utilisateurs">
                <vs-table stripe pagination :max-items="5" search :data="listeUser">
                    <template slot="thead">
                        <vs-th sort-key="nom">Nom Prenom</vs-th>
                        <vs-th sort-key="nom">Groupe</vs-th>
                        <vs-th> option </vs-th>
                    </template>
                    <template slot-scope="{data}">
                        <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                            <vs-td :data="data[indextr].nom">
                                {{data[indextr].nom}} {{data[indextr].prenom}}
                            </vs-td>
                            <vs-td :data="data[indextr].groupe.designation">
                                {{data[indextr].groupe.designation}}
                            </vs-td>
                            <vs-td>
                                <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary cursor-pointer" @click.stop="editUser(tr)" />
                                <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger cursor-pointer" class="ml-2" @click.stop="deleteUser(tr.id)" />
                            </vs-td>
                        </vs-tr>
                    </template>
                </vs-table>
            </vx-card>
        </vs-col>
        <vs-col class="pr-5" vs-type="flex" vs-justify="center" vs-align="center" vs-lg="6" vs-sm="12" vs-xs="12">
            <vx-card title="Nouvel utilisateur">
                <form class="form-loading">
                    <vs-input type="w-full" v-model="user.id" v-show="false" />
                    <div class="vx-row">
                        <div class="vx-col w-full sm:w-1/2 md:w-1/2 ">
                            <vs-input label="Nom utilisateur" v-validate="'required|alpha'" placeholder="Nom de l'utilisateur" name="nom" v-model="user.nom" class="w-full" />
                            <span class="text-danger text-sm" v-show="errors.has('nom')">{{ errors.first('nom') }}</span>
                        </div>
                        <div class="vx-col w-full sm:w-1/2 md:w-1/2">
                            <vs-input label="Prénom utilisateur" v-validate="'required|alpha_dash'" placeholder="Prénom de l'utilisateur" name="prenom" v-model="user.prenom" class="w-full" />
                            <span class="text-danger text-sm" v-show="errors.has('prenom')">{{ errors.first('prenom') }}</span>
                        </div>

                        <div class="vx-col w-full sm:w-1/2 md:w-1/2">
                            <vs-input label="Email utilisateur" v-validate="'required|email'" placeholder="Email de l'utilisateur" name="email" v-model="user.email" class="mt-5 w-full" />
                            <span class="text-danger text-sm" v-show="errors.has('email')">{{ errors.first('email') }}</span>
                        </div>
                        <div class="vx-col w-full sm:w-1/2 md:w-1/2">
                            <div class="mt-5">
                                <label class="vs-input--label">Groupe de travail</label>
                                <v-select v-model="user.groupe" v-validate="'required'" :options="groupeOptions" name="groupe de travail" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
                                <span class="text-danger text-sm" v-show="errors.has('groupe de travail')">{{ errors.first('groupe de travail') }}</span>
                            </div>
                        </div>
                        <div class="vx-col w-full sm:w-1/2 md:w-1/2">
                            <vs-input label="Mot de passe" type="password" v-validate="'min:6|max:10'" ref="password" placeholder="mot de passe utilisateur" name="password" v-model="user.password" class="mt-5 w-full" />
                            <span class="text-danger text-sm" v-show="errors.has('password')">{{ errors.first('password') }}</span>
                        </div>

                        <div class="vx-col w-full sm:w-1/2 md:w-1/2">
                            <vs-input label="Confirmation mot de passe" type="password" v-validate="'min:6|max:10|confirmed:password'" data-vv-as="password" placeholder="Confirmation mot de passe" name="confirm_password" v-model="user.password_confirmation" class="mt-5 w-full" />
                            <span class="text-danger text-sm" v-show="errors.has('confirm_password')">{{ errors.first('confirm_password') }}</span>
                        </div>
                    </div>
                    <vs-button type="filled" @click.prevent="submitForm" class="mt-5 block">AJOUTER</vs-button>
                </form>
            </vx-card>
        </vs-col>
    </vs-row>
</template>
<script>
    import vSelect from 'vue-select'
    export default {
        data() {
            return {
                user: {
                    id: null,
                    nom: null,
                    prenom: null,
                    email: null,
                    groupe: null,
                    password: null,
                    password_confirmation: null,
                },
            }
        },
        mounted() {
                this.$store.dispatch('getMethod', {
                    'where': '/getGroupe'
                }),
                this.$store.dispatch('getMethod', {
                    'where': '/getUser'
                })
        },
        computed: {
            listeUser() {
                console.log(this.$store.state.listeUser)
                return this.$store.state.listeUser
            },
            groupeOptions() {
                var obj = []
                Object.values(this.$store.state.listeGroupe).forEach(key => {
                    obj.push({
                        id: key.id,
                        label: key.designation,
                    })
                })
                return obj;
            },
        },
        methods: {
            submitForm() {
                this.$validator.validateAll().then(result => {
                    if (result) {
                        this.$vs.loading({
                            type: 'radius',
                            container: '.form-loading',
                            scale: 1.2
                        })
                        if (this.user.id) {
                            this.$store.dispatch('editMethod', {
                                'where': '/editUser',
                                'user': this.user,
                            })
                        } else {
                            this.$store.dispatch('addMethod', {
                                'where': '/addUser',
                                'user': this.user,
                            })
                        }
                    } else {
                        // form have errors
                    }
                })
            },
            editUser (data){
                let tab = [];
                this.user.id = data.id
                this.user.nom = data.nom
                this.user.prenom = data.prenom
                this.user.email = data.email
                tab = {'id' : data.groupe.id , 'label' : data.groupe.designation}
                this.user.groupe = tab
            },
            deleteUser (data){
                this.$store.dispatch('deleteMethod', {
                    'where': '/deleteUser',
                    'groupe': {'groupe' : data},
                })
            }
            
        },
        components: {
            'v-select': vSelect,
        }
    }
</script>
<template>
    <vs-row vs-align="flex-start" vs-type="flex" vs-justify="center" vs-w="12">
        <vs-col class="pr-5 pb-5" vs-type="flex" vs-justify="center" vs-align="center" vs-lg="6" vs-sm="12" vs-xs="12">
            
            <vx-card title="Liste des groupes">
                <vs-table stripe pagination :max-items="4" search :data="listeGroupe">
                    {{listeGroupe}}
                    <template slot="thead">
                        <vs-th sort-key="designation">Designation</vs-th>
                        <vs-th> option </vs-th>
                    </template>
                    <template slot-scope="{data}">
                        <vs-tr :key="indextr" v-for="(tr, indextr) in data">

                            <vs-td :data="data[indextr].designation">
                                {{data[indextr].designation}}
                            </vs-td>
                            <vs-td>
                                <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary cursor-pointer" @click.stop="editGroupe(tr)" />
                                <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger cursor-pointer" class="ml-2" @click.stop="deleteGroupe(tr.id)" />
                            </vs-td>
                        </vs-tr>
                    </template>
                </vs-table>
            </vx-card>
        </vs-col>
        <vs-col class="pr-5" vs-type="flex" vs-justify="center" vs-align="center" vs-lg="6" vs-sm="12" vs-xs="12">
            <vx-card title="Nouveau groupe">
                <form class="form-loading">
                    <vs-input type="w-full" v-model="groupe.id" v-show="false" />

                    <vs-input class="w-full" label="Désignation  groupe" v-validate="'required'" placeholder="La désignation du groupe" name="designation" v-model="groupe.designation" />
                    <span class="text-danger text-sm" v-show="errors.has('designation')">{{ errors.first('designation') }}</span>
                    <div class="mt-4">
                        <div class="block overflow-x-auto">
                            <table class="w-full permissions-table">
                                <tr>
                                    <th class="font-semibold text-base text-left px-3 py-2" v-for="heading in ['Module', 'voir', 'ajouter', 'editer', 'supprimer']" :key="heading">{{ heading }}</th>
                                </tr>
                                <tr v-for="(val, name) in permissions" :key="name">
                                    <td class="text-center">{{ name }}</td>
                                    <td v-for="(permission, name) in val" class="px-3 py-2" :key="name+permission">
                                        <vs-checkbox v-model="val[name]" />
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <vs-button type="filled" @click.prevent="submitForm" class="mt-5 block">AJOUTER</vs-button>
                </form>
            </vx-card>
        </vs-col>
    </vs-row>
</template>
<script>
    export default {
        data() {
            return {
                groupe: {
                    id: null,
                    designation: null,
                },
                permissions: {
                    "ajustement": {
                        "voir": false,
                        "ajouter": false,
                        "editer": false,
                        "supprimer": false
                    },
                    "corbeille": {
                        "voir": false,
                        "ajouter": false,
                        "editer": false,
                        "supprimer": false
                    },
                    "dossier": {
                        "voir": false,
                        "ajouter": false,
                        "editer": false,
                        "supprimer": false
                    },
                    "message": {
                        "voir": false,
                        "ajouter": false,
                        "editer": false,
                        "supprimer": false
                    },
                    "parametre": {
                        "voir": false,
                        "ajouter": false,
                        "editer": false,
                        "supprimer": false
                    },
                    "planning": {
                        "voir": false,
                        "ajouter": false,
                        "editer": false,
                        "supprimer": false
                    },
                },
            }
        },
        mounted() {
            this.$store.dispatch('getMethod', {
                'where': '/getGroupe'
            })
        },
        computed: {
            listeGroupe() {
                return this.$store.state.listeGroupe
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
                        if (this.groupe.id) {
                            this.$store.dispatch('editMethod', {
                                'where': '/editGroupe',
                                'groupe': this.groupe,
                                'permissions': this.permissions
                            })
                        } else {
                            this.$store.dispatch('addMethod', {
                                'where': '/addGroupe',
                                'groupe': this.groupe,
                                'permissions': this.permissions
                            })
                        }

                    } else {
                        // form have errors
                    }
                })
            },
            editGroupe(data) {
                this.permissions = {"ajustement": {
                        "voir": false,
                        "ajouter": false,
                        "editer": false,
                        "supprimer": false
                    },
                    "corbeille": {
                        "voir": false,
                        "ajouter": false,
                        "editer": false,
                        "supprimer": false
                    },
                    "dossier": {
                        "voir": false,
                        "ajouter": false,
                        "editer": false,
                        "supprimer": false
                    },
                    "message": {
                        "voir": false,
                        "ajouter": false,
                        "editer": false,
                        "supprimer": false
                    },
                    "parametre": {
                        "voir": false,
                        "ajouter": false,
                        "editer": false,
                        "supprimer": false
                    },
                    "planning": {
                        "voir": false,
                        "ajouter": false,
                        "editer": false,
                        "supprimer": false
                    },}
                this.groupe.id = data.id
                this.groupe.designation = data.designation
                Object.values(data.permission).forEach((value, key) => {
                    this.permissions[value.page][value.droit] = value.statut
                })
            },
            deleteGroupe(data) {
                this.groupe.id  = data 
                this.$store.dispatch('deleteMethod', {
                    'where': '/deleteGroupe',
                    'groupe': this.groupe,
                })
            }
        },
    }

</script>

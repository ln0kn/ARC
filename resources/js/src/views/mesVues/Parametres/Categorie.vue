<template>
    <vs-row vs-align="flex-start" vs-type="flex" vs-justify="center" vs-w="12">
        <vs-col class="pr-5 pb-5" vs-type="flex" vs-justify="center" vs-align="center" vs-lg="8" vs-sm="12" vs-xs="12">
            <vx-card title="Liste des catégories">
                <vs-table stripe pagination :max-items="5" search :data="listeCategorie">
                    <template slot="thead">
                        <vs-th sort-key="designation">Designation</vs-th>
                        <vs-th sort-key="designation">accessibilite</vs-th>
                        <vs-th> option </vs-th>
                    </template>
                    <template slot-scope="{data}">
                        <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                            <vs-td :data="data[indextr].designation">
                                {{data[indextr].designation}}
                            </vs-td>
                            <vs-td :data="data[indextr].designation">
                                <strong v-for="(groupe, i) in data[indextr].groupe">
                                    {{ groupe.designation}} -
                                </strong>
                            </vs-td>
                            <vs-td>
                                <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary cursor-pointer" @click.stop="editCategory(tr)" />
                                <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger cursor-pointer" class="ml-2" @click.stop="deleteCategory(tr.id)" />
                            </vs-td>
                        </vs-tr>
                    </template>
                </vs-table>
            </vx-card>
        </vs-col>
        <vs-col class="pr-5" vs-type="flex" vs-justify="center" vs-align="center" vs-lg="4" vs-sm="12" vs-xs="12">
            <vx-card title="Nouvelle catégorie">
                <form class="form-loading">
                    <vs-input type="w-full" v-model="category.id" v-show="false" />

                    <vs-input class="w-full" label="Désignation  catégorie" v-validate="'required'" placeholder="La désignation de la catégorie" name="designation categorie" v-model="category.designation" />
                    <span class="text-danger text-sm" v-show="errors.has('designation categorie')">{{ errors.first('designation categorie') }}</span>
                    
                    <div class="mt-4">
                        <label class="vs-input--label">Accessibilité</label>
                        <v-select v-model="category.accessibilite" multiple :closeOnSelect="false" v-validate="'required'" :options="accessOptions" name="accessibilite" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
                        <span class="text-danger text-sm" v-show="errors.has('accessibilite')">{{ errors.first('accessibilite') }}</span>
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
                category: {
                    id: null,
                    designation: null,
                    // cycleDeVie:null,
                    accessibilite: null,
                },
                
            }
        },
        mounted() {
            this.$store.dispatch('getMethod', {
                    'where': '/getCategorie'
                }),
                this.$store.dispatch('getMethod', {
                    'where': '/getGroupe'
                })
        },
        computed: {
            listeCategorie() {
                return this.$store.state.listeCategorie
            },
            accessOptions() {
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
                        if (this.category.id) {
                            this.$store.dispatch('editMethod', {
                                'where': '/editCategory',
                                'category': this.category,
                            })
                        } else {
                            this.$store.dispatch('addMethod', {
                                'where': '/addCategory',
                                'category': this.category,
                            })
                        }

                    } else {
                        // form have errors
                    }
                })
            },
            editCategory(data) {
                let tab = [];
                // let tab2 = [];
                this.category.id = data.id
                this.category.designation = data.designation
                // tab2 = {'id' : data.cycleVie , 'label' : this.cycleLabel[data.cycleVie]}
                Object.values(data.groupe).forEach((value, key) => {
                    tab[key] = {
                        'id': value.id,
                        'label': value.designation
                    }
                })
                this.category.accessibilite = tab;
            },
            deleteCategory(data) {
                this.category.id = data
                this.$store.dispatch('deleteMethod', {
                    'where': '/deleteCategorie',
                    'groupe': this.category,
                })
                
            }
        },
        components: {
            'v-select': vSelect,
        }
    }

</script>

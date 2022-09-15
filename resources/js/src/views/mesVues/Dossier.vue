<template>
    <vs-row vs-justify="center">
        <vs-col type="flex" class="pr-5" vs-w="6">
            <vx-card title="La liste des dossiers ">
                <vs-table stripe pagination :max-items="5" search :data="listeDossier">
                    <template slot="thead">
                        <vs-th sort-key="nom">designation</vs-th>
                        <vs-th></vs-th>
                    </template>
                    <template slot-scope="{data}">
                        <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                            <vs-td :data="data[indextr].nom">
                                {{data[indextr].nom}}
                            </vs-td>
                            <vs-td :data="data[indextr].id">
                                <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" @click="editData(tr)" />
                                <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" @click.stop="deleteData(tr.id)" />
                            </vs-td>
                        </vs-tr>
                    </template>
                </vs-table>
            </vx-card>
        </vs-col>
        <vs-col type="flex" class="pr-5" vs-w="6">
            <vx-card title="Nouveau dossier">
                <form class="form-loading">
                    <vs-input type="w-full" v-model="dossier.id" v-show="false" />
                    <div class="vx-row">
                        <div class="vx-col w-full sm:w-1/2 md:w-1/2 ">
                            <vs-input label="Désignation dossier" v-validate="'required'" placeholder="Désignation du dossier" name="designation dossier" v-model="dossier.designation" class="w-full" />
                            <span class="text-danger text-sm" v-show="errors.has('designation dossier')">{{ errors.first('designation dossier') }}</span>
                        </div>
                        <div class="vx-col w-full sm:w-1/2 md:w-1/2">
                            <label class="vs-input--label">Catégorie dossier</label>
                            <v-select v-model="dossier.categorie" v-validate="'required'" :options="categorieOptions" name="catégorie dossier" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
                            <span class="text-danger text-sm" v-show="errors.has('catégorie dossier')">{{ errors.first('catégorie dossier') }}</span>
                        </div>
                        <div class="vx-col w-full sm:w-1/2 md:w-1/2">
                            <div class="mt-5">
                                <label class="vs-input--label">Créer un rappel</label>
                                <datepicker v-model="dossier.dateRappel"></datepicker>
                            </div>
                        </div>
                        <div class="vx-col w-full sm:w-1/2 md:w-1/2">
                            <div class="mt-5">
                                <vs-input label="Motif du rappel" placeholder="Motif de l alerte" v-model="dossier.motifRappel" class="w-full" />
                            </div>
                        </div>
                        <div class="vx-col w-full">
                            <div class="mt-5">
                                <input v-on:change="onSelectFile" type="file" class="custom-file-input" id="example-file-multiple-input-custom" name="example-file-multiple-input-custom" data-toggle="custom-file-input" multiple>
                            </div>
                        </div>
                        <vx-card title="Pièces">
                            <template slot="no-body">
                                <div class="chat-card-log">
                                    <VuePerfectScrollbar ref="chatLogPS" class="scroll-area px-6" :settings="settings" :key="$vs.rtl">
                                        <ul class="faq-topics mt-4">
                                            <li :key="i" v-for="(piece, i) in pieces" class="p-2 font-medium flex items-center" @click="faqFilter = category.id">
                                                <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger  cursor-pointer" @click.stop="deleteFile(i)" /><span @click.stop="displayFile(piece)" class="cursor-pointer ml-5">{{ piece.nomPiece }}</span>
                                            </li>
                                        </ul>
                                    </VuePerfectScrollbar>
                                </div>
                            </template>
                        </vx-card>
                    </div>
                    <vs-button type="filled" @click.prevent="submitForm" class="mt-5 block">AJOUTER</vs-button>
                </form>
            </vx-card>
        </vs-col>
    </vs-row>
</template>

<script>
    import VuePerfectScrollbar from 'vue-perfect-scrollbar'
    import vSelect from 'vue-select'
    import Datepicker from 'vuejs-datepicker';
    import axios from '../../axios.js'
    export default {
        data() {
            return {
                file: [],
                pieces: [],
                dossier: {
                    designation: null,
                    categorie: null,
                    dateRappel: '',
                    motifRappel: '',
                },
                settings: { // perfectscrollbar settings
                    maxScrollbarLength: 60,
                    wheelSpeed: .60,
                },
                sessionsData: {},
                chatLog: [],
                chatMsgInput: '',
                customersData: {},
            }
        },
        mounted() {
            this.$store.dispatch('getMethod', {
                    'where': '/getDossier'
                }),
                this.$store.dispatch('getMethod', {
                    'where': '/getCategorie'
                })
        },
        computed: {
            listeDossier() {
                return this.$store.state.listeDossier
            },
            categorieOptions() {
                var obj = []
                Object.values(this.$store.state.listeCategorie).forEach(key => {
                    obj.push({
                        id: key.id,
                        label: key.designation,
                    })
                })
                return obj;
            },
        },
        methods: {
            submitForm(event) {
                this.$validator.validateAll().then(result => {
                    if (result) {
                        this.$vs.loading({
                            type: 'radius',
                            container: '.form-loading',
                            scale: 1.2
                        })
                        let formData = null;
                        const config = {
                            headers: {
                                "Content-Type": "multipart/form-data"
                            }
                        };
                        formData = new FormData();
                        for (let i = 0; i < this.file.length; i++) {
                            formData.append('files[]', this.file[i]);
                        }
                        formData.append('designation', this.dossier.designation);
                        formData.append('categorie', this.dossier.categorie.id);
                        formData.append('dateRappel', this.dossier.dateRappel);
                        formData.append('motifRappel', this.dossier.motifRappel);
                        console.log(this.file)
                        if (this.dossier.id) {
                            for (let j = 0; j < this.pieces.length; j++) {
                                console.log(this.pieces[j])
                                formData.append('pieces[]', this.pieces[j].nomPiece);
                            }
                            formData.append('id', this.dossier.id);
                            axios.post('/editDossier', formData)
                                .then(res => {
                                    if (!res.data.fail) {
                                        this.$vs.notify({
                                            title: 'succès',
                                            text: 'Opération réussie',
                                            color: 'success',
                                            time: 5000,
                                            position: 'top-right',
                                            icon: 'query_builder'
                                        })
                                        this.$store.dispatch('getMethod', {
                                                'where': '/getDossier'
                                            }),

                                            this.dossier.id = null
                                        this.dossier.designation = null
                                        this.dossier.categorie = null
                                        this.dossier.dateRappel = ''
                                        this.dossier.motifRappel = ''
                                        this.file = []
                                        this.pieces = []
                                        this.$store.dispatch('getMethod', {
                                            'where': '/getRappel'
                                        })
                                    } else {
                                        for (const item in res.data.errors)
                                            for (const k in res.data.errors[item])
                                                this.$vs.notify({
                                                    title: 'Attention',
                                                    text: res.data.errors[item][k],
                                                    color: 'warning',
                                                    time: 5000,
                                                    position: 'top-right',
                                                    icon: 'query_builder'
                                                })

                                    }
                                }).catch(err => {
                                    alert(err);
                                }).finally(() => {
                                    this.$vs.loading.close('.form-loading > .con-vs-loading')
                                })

                        } else {
                            //                            axios.post('/editDossier', formData)
                            axios.post('/addDossier', formData)
                                .then(res => {
                                    if (!res.data.fail) {
                                        this.$vs.notify({
                                            title: 'succès',
                                            text: 'Opération réussie',
                                            color: 'success',
                                            time: 5000,
                                            position: 'top-right',
                                            icon: 'query_builder'
                                        })
                                        this.$store.dispatch('getMethod', {
                                                'where': '/getDossier'
                                            }),
                                            this.$store.dispatch('getMethod', {
                                                'where': '/getRappel'
                                            })
                                        this.dossier.designation = null
                                        this.dossier.categorie = null
                                        this.dossier.dateRappel = ''
                                        this.dossier.motifRappel = ''
                                        this.file = []
                                        this.pieces = []
                                        console.log(this.file)
                                    } else {
                                        for (const item in res.data.errors)
                                            for (const k in res.data.errors[item])
                                                this.$vs.notify({
                                                    title: 'Attention',
                                                    text: res.data.errors[item][k],
                                                    color: 'warning',
                                                    time: 5000,
                                                    position: 'top-right',
                                                    icon: 'query_builder'
                                                })

                                    }
                                }).catch(err => {
                                    alert(err);
                                }).finally(() => {
                                    this.$vs.loading.close('.form-loading > .con-vs-loading')
                                })
                        }
                    } else {
                        // form have errors
                    }
                })
            },
            onSelectFile: function(e) {
                Object.values(e.target.files).forEach((value, key) => {
                    this.pieces.push({
                        nomPiece: value.name
                    })
                    this.file.push(value)
                })
            },
            editData: function(data) {
                this.dossier.categorie = {
                    id: data.categorie.id,
                    label: data.categorie.designation
                }
                this.dossier.id = data.id;
                this.dossier.designation = data.nom;
                this.dossier.motifRappel = '';
                this.dossier.dateRappel = '';
                if (data.rappel) {
                    this.dossier.motifRappel = data.rappel.motif;
                    this.dossier.dateRappel = data.rappel.date;
                }
                //                var tab = [];
                //                Object.values(data.pieces).forEach((value, key) => {
                //                    tab[key] = value.nomPiece
                ////                    console.log(value.nomPiece)
                ////                    console.log(key)
                ////                    this.pieces.push(value.nomPiece)
                ////                    this.file.push(value)
                //                })
                //                console.log(tab)
                this.pieces = data.pieces;
            },
            deleteFile: function(data) {
                this.$delete(this.pieces, data)
                this.$delete(this.file, data)
            },
            displayFile: function(data) {
                axios({
                    url: '/displayDossier?id=' + data.nomPiece,
                    method: "GET",
                    responseType: 'arraybuffer'
                }).then((response) => {
                    var fileURL = window.URL.createObjectURL(new Blob([response.data]));
                    var fileLink = document.createElement('a');
                    fileLink.href = fileURL;
                    fileLink.setAttribute('download', data.nomPiece);
                    document.body.appendChild(fileLink);
                    fileLink.click();
                });
            },
            // deleteData: function(data) {
            //     this.dossier.id = data
            //     this.$store.dispatch('deleteMethod', {
            //         'where': '/deleteDossier',
            //         'groupe': this.dossier,
            //     })
            //     this.$store.dispatch('getMethod', {
            //         'where': '/getRappel'
            //     })

            // }
        },
        components: {
            VuePerfectScrollbar,
            'v-select': vSelect,
            Datepicker
        }
    }

</script>

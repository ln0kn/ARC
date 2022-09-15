<template>
    <vs-row vs-justify="center">
        <vs-col type="flex" class="pr-5" vs-w="6">
            <vx-card title="La corbeille">
                <vs-table stripe pagination :max-items="4" search :data="listeCorbeille">
                    <template slot="thead">
                        <vs-th sort-key="email">Nom</vs-th>
                        <vs-th></vs-th>
                    </template>
                    <template slot-scope="{data}">
                        <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                            <vs-td :data="data[indextr].nom">
                                {{data[indextr].nom}}
                            </vs-td>
                            <vs-td :data="data[indextr].id">
                                <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" @click="editData(tr)" />
                            </vs-td>
                        </vs-tr>
                    </template>
                </vs-table>
            </vx-card>
        </vs-col>
        <vs-col type="flex" class="pr-5" vs-w="6">
            <vx-card title="Restauration">
                <form class="form-loading">
                    <vs-input type="w-full" v-model="dossier.id" v-show="false" />
                    <div class="vx-row">
                        <div class="vx-col w-full sm:w-1/2 md:w-1/2 ">
                            <vs-input label="Désignation dossier" placeholder="Désignation du dossier" v-model="dossier.designation" class="w-full" />
                        </div>
                        <div class="vx-col w-full sm:w-1/2 md:w-1/2">
                            <label class="vs-input--label">Catégorie dossier</label>
                            <v-select v-model="dossier.categorie" :options="categorieOptions":dir="$vs.rtl ? 'rtl' : 'ltr'" />
                        </div>
                        <vx-card title="Pièces">
                            <template slot="no-body">
                                <div class="chat-card-log">
                                    <VuePerfectScrollbar ref="chatLogPS" class="scroll-area" :settings="settings" :key="$vs.rtl">
                                        <ul class="faq-topics mt-4">
                                            <li :key="i" v-for="(piece, i) in pieces" class="p-2 font-medium flex items-center" >
                                                <span class="cursor-pointer ml-5">{{ piece.nomPiece }}</span>
                                            </li>
                                        </ul>
                                    </VuePerfectScrollbar>
                                </div>
                            </template>
                        </vx-card>
                    </div>
                    <vs-button type="filled" @click.prevent="submitForm" class="mt-5 block">Restaurer</vs-button>
                </form>
            </vx-card>
        </vs-col>
    </vs-row>
</template>

<script>
    import VuePerfectScrollbar from 'vue-perfect-scrollbar'
    import vSelect from 'vue-select'
    import axios from '../../axios.js'
    export default {
        data() {
            return {
                file: [],
                pieces: [],
                dossier: {
                    designation: null,
                    categorie: null,
                },
                settings: { // perfectscrollbar settings
                    maxScrollbarLength: 60,
                    wheelSpeed: .60,
                },
            }
        },
        mounted() {
            this.$store.dispatch('getMethod', {
                    'where': '/getCorbeille'
                }),
                this.$store.dispatch('getMethod', {
                    'where': '/getCategorie'
                })
        },
        computed: {
            listeCorbeille() {
                return this.$store.state.listeCorbeille
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
                this.$store.dispatch('addMethod', {
                    'where': '/restaureDossier',
                    'dossier': this.dossier,
                })
                this.$store.dispatch('getMethod', {
                    'where': '/getRappel'
                })
            },
            editData: function(data) {
                this.dossier.categorie = {
                    id: data.categorie.id,
                    label: data.categorie.designation
                }
                this.dossier.id = data.id;
                this.dossier.designation = data.nom;
                this.pieces = data.pieces;
            },
        },
        components: {
            VuePerfectScrollbar,
            'v-select': vSelect,
        }
    }
</script>
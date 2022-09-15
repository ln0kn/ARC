<template>
    <vs-row vs-align="flex-start" vs-type="flex" vs-justify="center" vs-w="12">
        <vs-col class="pr-5 pb-5" vs-type="flex" vs-justify="center" vs-align="center" vs-lg="8" vs-sm="12" vs-xs="12">
            <vx-card title="Licenses">
                <vs-table stripe pagination :max-items="5" search :data="listeLicense">
                    <template slot="thead">
                        <vs-th sort-key="designation">Date debut</vs-th>
                        <vs-th sort-key="designation">Date fin</vs-th>
                    </template>
                    <template slot-scope="{data}">
                        <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                            <vs-td :data="data[indextr].dateDebut">
                                {{data[indextr].dateDebut}}
                            </vs-td>
                            <vs-td :data="data[indextr].dateFin">
                                {{data[indextr].dateFin}}
                            </vs-td>
                        </vs-tr>
                    </template>
                </vs-table>
            </vx-card>
        </vs-col>
        <vs-col class="pr-5" vs-type="flex" vs-justify="center" vs-align="center" vs-lg="4" vs-sm="12" vs-xs="12">
            <vx-card title="Nouvelle license">
                <form class="form-loading">
                    <div class="mt-4">
                        <vs-input class="w-full" label="Code license" v-validate="'required'" placeholder="le code pour activer la license" name="code license" v-model="license.code" />
                        <span class="text-danger text-sm" v-show="errors.has('code license')">{{ errors.first('code license') }}</span>
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
                license: {
                    code: null,
                },
            }
        },
        mounted() {
            this.$store.dispatch('getMethod', {
                    'where': '/getLicense'
                })
        },
        computed: {
            listeLicense() {
                console.log(this.$store.state.listeLicense)
                return this.$store.state.listeLicense
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
                        this.$store.dispatch('addMethod', {
                            'where': '/addLicense',
                            'license': this.license,
                        })

                    } else {
                        // form have errors
                    }
                })
            },
           
        }
    }

</script>

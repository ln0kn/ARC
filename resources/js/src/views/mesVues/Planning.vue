<template>
    <div id="simple-calendar-app">
        <div class="vx-card no-scroll-content">
            <calendar-view ref="calendar" :displayPeriodUom="calendarView" :show-date="showDate" :events="listeEvents" enableDragDrop :eventTop="windowWidth <= 400 ? '2rem' : '3rem'" eventBorderHeight="0px" eventContentHeight="1.65rem" class="theme-default" @click-date="openAddNewEvent" @click-event="openEditEvent" @drop-on-date="eventDragged">
                <div slot="header" class="mb-4">

                    <div class="vx-row no-gutter">

                        <!-- Month Name -->
                        <div class="vx-col w-1/3 items-center sm:flex hidden">
                            <!-- Add new event button -->
                            <vs-button icon-pack="feather" icon="icon-plus" @click="promptAddNewEvent(new Date())">Ajouter</vs-button>
                        </div>

                        <!-- Current Month -->
                        <div class="vx-col sm:w-1/3 w-full sm:my-0 my-3 flex sm:justify-end justify-center order-last">
                            <div class="flex items-center">
                                <feather-icon :icon="$vs.rtl ? 'ChevronRightIcon' : 'ChevronLeftIcon'" @click="updateMonth(-1)" svgClasses="w-5 h-5 m-1" class="cursor-pointer bg-primary text-white rounded-full" />

                                <span class="mx-3 text-xl font-medium whitespace-no-wrap">{{ showMonth  }}</span>

                                <feather-icon :icon="$vs.rtl ? 'ChevronLeftIcon' : 'ChevronRightIcon'" @click="updateMonth(1)" svgClasses="w-5 h-5 m-1" class="cursor-pointer bg-primary text-white rounded-full" />
                            </div>
                        </div>

                        <div class="vx-col sm:w-1/3 w-full flex justify-center">
                            <template v-for="(view, index) in calendarViewTypes">
                                <vs-button v-if="calendarView === view.val" :key="String(view.val) + 'filled'" type="filled" class="p-3 md:px-8 md:py-3" :class="{'border-l-0 rounded-l-none': index, 'rounded-r-none': calendarViewTypes.length !== index+1}" @click="calendarView = view.val">{{ view.label }}</vs-button>
                                <vs-button v-else :key="String(view.val) + 'border'" type="border" class="p-3 md:px-8 md:py-3" :class="{'border-l-0 rounded-l-none': index, 'rounded-r-none': calendarViewTypes.length !== index+1}" @click="calendarView = view.val">{{ view.label }}</vs-button>
                            </template>
                        </div>
                    </div>
                </div>
            </calendar-view>
        </div>

        <!-- ADD EVENT -->
        <vs-prompt class="calendar-event-dialog" title="Ajouter evenement" accept-text="Ajouter evenement" @accept="addEvent" :is-valid="validForm" :active.sync="activePromptAddEvent">
            <vs-input type="w-full" v-model="rdv.id" v-show="true" />
            <div class="my-4">
                <small class="date-label">Start Date</small>
                <datepicker :language="$vs.rtl ? langHe : langEn" name="start-date" v-model="rdv.startDate" :disabled="disabledFrom"></datepicker>
            </div>
            <div class="my-4">
                <small class="date-label">End Date</small>
                <datepicker :language="$vs.rtl ? langHe : langEn" :disabledDates="disabledDatesTo" :disabled="disabledFrom2" name="end-date" v-model="rdv.endDate"></datepicker>
            </div>
            <div>
                <small class="date-label"> utilisateur </small>
                <v-select v-model="rdv.user" :options="userOptions" name="catégorie dossier" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
            </div>
            <div class="my-4">
                <small class="date-label"> Intitule </small>
                <vs-textarea v-model="rdv.intitule" />
            </div>
            
        </vs-prompt>
    </div>
</template>

<script>
    import vSelect from 'vue-select'
    import {
        CalendarView,
        CalendarViewHeader
    } from "vue-simple-calendar"
    import moduleCalendar from '@/store/calendar/moduleCalendar.js'
    require("vue-simple-calendar/static/css/default.css")

    import Datepicker from 'vuejs-datepicker'
    import {
        en,
        he
    } from "vuejs-datepicker/src/locale"

    export default {
        components: {
            'v-select': vSelect,
            CalendarView,
            CalendarViewHeader,
            Datepicker
        },
        data() {
            return {
                showDate: new Date(),
                showMonth: new Date().toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric'
                }),
                disabledFrom: false,
                disabledFrom2: false,
                langHe: he,
                langEn: en,
                url: '',
                calendarView: 'month',
                activePromptAddEvent: false,
                calendarViewTypes: [{
                        label: "Month",
                        val: "month"
                    },
                    {
                        label: "Week",
                        val: "week"
                    }
                ],
                rdv: {
                    id: null,
                    user: null,
                    intitule: null,
                    startDate: new Date(new Date() - 1000 * 60 * 60 * 24 * 3),
                    endDate: new Date(new Date() - 1000 * 60 * 60 * 24 * 2),
                },

            }
        },
        computed: {
            validForm() {
                return this.rdv.user != '' && this.rdv.intitule != '' && this.rdv.startDate != '' && this.rdv.endDate != '' && (Date.parse(this.rdv.endDate) - Date.parse(this.rdv.startDate)) >= 0;
            },
            disabledDatesTo() {
                return {
                    to: new Date(this.rdv.startDate)
                }
            },
            disabledDatesFrom() {
                return {
                    from: new Date(this.rdv.endDate)
                }
            },
            windowWidth() {
                return this.$store.state.windowWidth
            },
            userOptions() {
                var obj = []
                Object.values(this.$store.state.listeUser).forEach(key => {
                    obj.push({
                        id: key.id,
                        label: key.nom + ' ' + key.prenom,
                    })
                })
                return obj;
            },
            listeEvents() {
                var eve = []
                Object.values(this.$store.state.listeRdv).forEach(key => {
                    eve.push({
                        id: key.id,
                        title: key.intitule,
                        startDate: key.startDate,
                        endDate: key.endDate,
                        user: key.forWho,
                        userL: key.user.nom + ' ' + key.user.prenom,
                        classes: 'event-success',
                    })
                })
                return eve;
            },
        },
        methods: {
            addEvent() {
                if (this.rdv.id) {
                    this.$store.dispatch('editMethod', {
                        'where': '/editRdv',
                        'rdv': this.rdv,
                    })
                } else {
                    this.$store.dispatch('addMethod', {
                        'where': '/addRdv',
                        'rdv': this.rdv,
                    })
                }

            },
            updateMonth(val) {
                this.showDate = this.$refs.calendar.getIncrementedPeriod(val);
                this.showMonth = this.showDate.toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric'
                })
            },
            clearFields() {
                this.rdv.intitule = this.rdv.startDate = this.rdv.endDate = this.rdv.user = null;
                this.rdv.id = 0;
            },
            promptAddNewEvent(date) {
                this.disabledFrom = false;
                this.disabledFrom2 = false;
                this.addNewEventDialog(date);
            },
            addNewEventDialog(date) {
                this.clearFields();
                this.rdv.startDate = date;
                this.rdv.endDate = date;
                this.activePromptAddEvent = true;
                this.disabledFrom2 = false;
            },
            openAddNewEvent(date) {
                let compare = parseInt(new Date().getTime() - date.getTime()) - 86400000;
                
                this.disabledFrom  = true;
                if(compare < 0){
                    this.addNewEventDialog(new Date(date));
                }
                else{console.log(compare)
                    this.disabledFrom2 = true;
                    this.rdv.startDate = this.rdv.endDate = null;
                }
            },
            openEditEvent(event) {
                this.rdv.id = event.originalEvent.id
                this.rdv.startDate = event.startDate
                this.rdv.endDate = event.endDate
                this.rdv.intitule = event.title
                this.rdv.user = {
                    id: event.originalEvent.user,
                    label: event.originalEvent.userL,
                }
                this.activePromptAddEvent = true;
                this.disabledFrom2 = false;
            },
            eventDragged(event, date) {
                this.$store.dispatch('calendar/eventDragged', {
                    event: event,
                    date: date
                })
            },
        },
        beforeDestroy() {
            this.$store.unregisterModule('calendar')
        },
        mounted() {
            this.$store.dispatch('getMethod', {
                'where': '/getRdv'
            })
            this.$store.dispatch('getMethod', {
                'where': '/getUser'
            })
        },
    }

</script>
<style lang="scss">
    @import "@sass/vuexy/apps/simple-calendar.scss";

</style>

<template>
  <!-- NOTIFICATIONS -->
  <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
    <feather-icon icon="BellIcon" class="cursor-pointer mt-1 sm:mr-6 mr-2" :badge="this.$store.state.listeRappel.length" />

    <vs-dropdown-menu class="notification-dropdown dropdown-custom vx-navbar-dropdown">

      <div class="notification-top text-center p-5 bg-primary text-white">
        <h3 class="text-white">{{ this.$store.state.listeRappel.length }} Rappel</h3>
      </div>

      <VuePerfectScrollbar ref="mainSidebarPs" class="scroll-area--nofications-dropdown p-0" :settings="settings" :key="$vs.rtl">
        <ul class="bordered-items">
          <li v-for="ntf in this.$store.state.listeRappel" :key="ntf.index" class="flex justify-between px-4 py-4 notification cursor-pointer">
            <div class="flex items-start">
              <feather-icon icon="AlertOctagonIcon" svgClasses="text-warning stroke-current mr-1 h-6 w-6"></feather-icon>
              <div class="mx-2">
                <span class="text-primary font-medium block notification-title" >{{ ntf.dossier.nom }}</span>
                <small>{{ ntf.motif }}</small>
              </div>
            </div>
          </li>
        </ul>
      </VuePerfectScrollbar>
    </vs-dropdown-menu>
  </vs-dropdown>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
  components: {
    VuePerfectScrollbar
  },
  data() {
    return {
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: .60,
      },
    }
  },
}

</script>


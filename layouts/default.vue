<template>
  <v-app id="app" class="bg-grey-lighten-4">
    <NavigationDrawer :drawer="drawer" @drawer-changed="drawerChanged" />

    <NavBar :drawer="drawer" @drawer-changed="drawerChanged"/>

    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { ref } from 'vue'
import NavigationDrawer from '~~/components/layouts/default/NavigationDrawer.vue'
import NavBar from '~~/components/layouts/default/NavBar.vue'

export default {
  components: {
    NavigationDrawer,
    NavBar,
  },

  setup() {
    const drawer = ref(true)

    const drawerChanged = () => {
      drawer.value = !drawer.value
    }

    return { drawer, drawerChanged }
  }
}

</script>

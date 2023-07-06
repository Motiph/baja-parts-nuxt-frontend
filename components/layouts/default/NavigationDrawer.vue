<template>
  <v-navigation-drawer
    floating
    permanent
    v-model="drawer"
    class="bg-background pa-md-4"
  >
    <v-list
      density="compact"
      nav
      class=""
    >
      <v-list-item
        class="pb-5"
        color="grey-darken-4"
      >
        <h1>AUTOPARTES BAJA</h1>
      </v-list-item>

      <v-divider class="pb-5"></v-divider>

      <v-list-item v-for="item in menuItems" :value="item.value" nav color="white" :to="item.path">
        <div class="menu-item">
          <v-icon class="mr-5 ml-2" size="x-small" :icon="item.icon"></v-icon>
          <span class="menu-item-title font-weight-bold">{{ item.title }}</span>
        </div>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <div class="pa-2">
        <v-btn  block variant="outlined" class="logout-btn text-none font-weight-bold" color="red">
          Logout
        </v-btn>
      </div>
      <div class="pa-2">
        <v-btn flat class="text-white font-weight-bold text-none" size="large" block color="grey-darken-4" prepend-icon="fa:fas fa-cog">
          Support
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({ drawer: { type: Boolean, required: true } })
const emit = defineEmits(['drawerChanged'])

const menuItems = [
  {
    title: 'Home',
    icon: 'fa:fas fa-house',
    value: 'home',
    path: '/'
  },
  {
    title: 'Archivos subidos',
    icon: 'fa:fas fa-address-card',
    value: 'files',
    path: '/files'
  },
  {
    title: 'Subir archivo',
    icon: 'fa:fas fa-cloud-upload',
    value: 'upload',
    path: '/upload'
  },
  {
    title: 'Reportes',
    icon: 'fa:fas fa-cloud-upload',
    value: 'reports',
    path: '/reports'
  }
]

const drawer = computed({
  get() {
    return props.drawer
  },
  set() {
    emit('drawerChanged')
  }
})
</script>

<style scoped>
.menu-item {
  align-items: center;
  display: flex;
  color: white ;
}

.menu-item-title {
  font-size: 15px;
  font-weight: 200;
}

.logout-btn {
  border: 2px solid !important;
}
</style>

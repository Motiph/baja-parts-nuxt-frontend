<template>
  <v-app-bar elevation="0" density="compact" color="transparent">
    <v-btn color="grey-darken-1" size="small" :icon="arrowIcon" @click="emit('drawerChanged')"></v-btn>
    <template v-slot:append>
      <v-btn color="grey-darken-1" size="small" icon="fa:fas fa-ellipsis-v"></v-btn>
    </template>
  </v-app-bar>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({ drawer: { type: Boolean, required: false } })

const emit = defineEmits(['drawerChanged'])
const arrowIcon = computed(() => {
  if (props.drawer) {
    return 'fa:fas fa-chevron-left'
  }
  return 'fa:fas fa-chevron-right'
})

</script>

<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12">
        <h1>Subir Archivos</h1>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12">
        <InputFile />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <!-- <h1>Files</h1>
        <FileList /> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import InputFile from '~~/components/pages/inventory/InputFile.vue'
import FileList from '~~/components/pages/inventory/FileList.vue'

</script>

<style scoped>
@media (min-width: 1920px) {
  .v-container {
    max-width: 1200px;
}
}
</style>

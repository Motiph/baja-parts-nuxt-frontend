<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12">
        <h1>Archivos subidos</h1>
      </v-col>
    </v-row>

    <v-table class="file-list-table">
      <thead>
        <tr>
          <th class="text-left font-weight-black">
            Fecha
          </th>
          <th class="text-left font-weight-black">
            Numero de partes
          </th>
          <th class="text-left font-weight-black">

          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in uploadedFiles"
        >
          <td>
            <v-chip
              class="ma-2"
              color="primary"
              label
            >
              {{ item.date }}
            </v-chip>
          </td>
          <td>
            {{ item.values.length }}
          </td>
          <td>
            <v-btn @click="showData(item.values)" color="grey-darken-4" class="text-none text-white font-weight-bold">Ver</v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
    <v-dialog
      v-model="dialog"
      width="auto"
    >
      <v-card>
        <v-table class="file-list-table">
          <thead>
            <tr>
              <th class="text-left font-weight-black">
                Linea-Parte
              </th>
              <th class="text-left font-weight-black">
                Linea
              </th>
              <th class="text-left font-weight-black">
                Parte
              </th>
              <th class="text-left font-weight-black">
                Descripción
              </th>
              <th class="text-left font-weight-black">
                Código de barras
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in content"
              :key="item.descripcion"
            >
              <td>
                <v-chip
                  class="ma-2"
                  color="primary"
                  label
                >
                  {{ item.LINEA_PARTE }}
                </v-chip>
              </td>
              <td>
                {{ item.LINEA }}
              </td>
              <td>
                {{ item.PARTE }}
              </td>
              <td>
                {{ item.DESCRIPCION }}
              </td>
              <td>
                {{ item.CODIGO_DE_BARRAS }}
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import nuxtStorage from 'nuxt-storage';
  const content = ref(null)
  const uploadedFiles = ref(null)
  const dialog = ref(false)
  onMounted(() => {
    uploadedFiles.value = nuxtStorage.localStorage.getData('archivos');
  })

  const showData = (data) => {
    content.value = data
    dialog.value = true
  }
</script>

<style scoped>
@media (min-width: 1920px) {
  .v-container {
    max-width: 1200px;
}
}

.file-list-table {
  border: 1px solid #e1e1e1;
  border-radius: 5px;
}
.file-list-table th {
  color: #212121 !important
}
</style>

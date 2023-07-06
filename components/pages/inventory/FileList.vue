<template>
  <v-table class="file-list-table">
    <thead>
      <tr>
        <th class="text-left">
          Linea-Parte
        </th>
        <th>
          Linea
        </th>
        <th class="text-left">
          PARTE
        </th>
        <th class="text-left">
          Descripción
        </th>
        <th class="text-left">
          Código de barras
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in files"
        :key="item.name"
      >
        <td>{{ item.name }}</td>
        <td>{{ item.status }}</td>
        <td>{{ item.lines }}</td>
      </tr>
    </tbody>
  </v-table>
  <v-pagination
    class="my-4"
    :length="15"
  ></v-pagination>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const files = ref([
  {
    name: 'Frozen Yogurt',
    status: 'Open',
    lines: 159,
  },
  {
    name: 'Ice cream sandwich',
    status: 'Open',
    lines: 237,
  },
  {
    name: 'Eclair',
    status: 'Open',
    lines: 262,
  },
  {
    name: 'Cupcake',
    status: 'Open',
    lines: 305,
  },
  {
    name: 'Gingerbread',
    status: 'Open',
    lines: 356,
  },
  {
    name: 'Jelly bean',
    status: 'Open',
    lines: 375,
  },
  {
    name: 'Lollipop',
    status: 'Open',
    lines: 392,
  },
  {
    name: 'Honeycomb',
    status: 'Open',
    lines: 408,
  },
  {
    name: 'Donut',
    status: 'Open',
    lines: 452,
  },
  {
    name: 'KitKat',
    status: 'Open',
    lines: 518,
  },
])

</script>

<style scoped>
.file-list-table {
  border: 1px solid #e1e1e1;
  border-radius: 5px;
}
</style>

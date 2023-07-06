<template>
  <label for="csvs" class="drop-container">
    <span class="drop-title">Arrastra aqui tu archivo</span>
      o
    <input
      type="file"
      id="csvs"
      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      @change="handleFileUpload( $event )"
      required
    >
  </label>

  <div class="upload-buttons  mb-5 mt-5">
    <v-btn
      flat
      :loading="parsingFile"
      :disabled="csvFile ? false : true"
      class="text-none text-white font-weight-bold"
      size="large"
      color="grey-darken-4"
      prepend-icon="fa:fas fa-cloud-arrow-up"
      @click="saveCsv"
    >
      Subir
    </v-btn>
  </div>

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
  <v-snackbar
      v-model="snackbar"
      :vertical="false"
    >
      Archivo cargado exitosamente

      <template v-slot:actions>
        <v-btn
          color="green"
          variant="text"
          @click="snackbar = false"
        >
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
</template>

<script setup>
import { ref } from 'vue'
import Papa from 'papaparse';
import nuxtStorage from 'nuxt-storage';
const { get, saveFile } = useInventory()
// const f = useInventory()

const createInventory = ref(false)
const csvFile = ref(null)
const content = ref(null)
const parsed = ref(false)
const parsingFile = ref(false)
const snackbar = ref(false)

const fieldsFormat = ref(null)

const matchOptions = ref([
  {
    title: 'marca',
    regex: [/.*line*/, /.*marca*/, /.*brand*/]
  },
  {
    title: 'parte',
    regex: [/.*part*/, /.*num*par*/, /.*art*/]
  },
  {
    title: 'descripcion',
    regex: [/.*desc*/, /.*deta*/]
  },
  {
    title: 'precio',
    regex: [/.*prec*/]
  },
  {
    title: 'costo',
    regex: [/.*cos*/]
  },
])

onMounted(() => {
  getData()
})

watch(csvFile, (newCsvFile) => {
  console.log(newCsvFile)
})


// watch(content, (newContent) => {
//   if (newContent.meta.fields.length) {
//     matchFields(newContent.meta.fields)
//   }
// })

const findMatchWithRegex = () => {

  matchOptions.value.map((option) => {
    const matches = []

    option.regex.map((reg) => {
      const match = fieldsFormat.value.find((e) => reg.test(e.key.toLowerCase()))
      if (match) matches.push(match)
    })

    // puede encontrar el mismo match varias veces o distintos, solo settea al primero
    if (matches.length) matches[0].match = option.title
  })
}

const matchFields = (fields) => {
  // Prepara los datos, matches aun nullos hasta llamar findMatchWithRegex
  const newFieldsFormat = []
  fields.map((value, index)=> {
    newFieldsFormat.push({
      id: index,
      key: value,
      match: null
    })
  })
  fieldsFormat.value = newFieldsFormat

  findMatchWithRegex()
}

const getData = async () => {
  const { data } = await get('/inventory-files/')
  console.log(data)
}

const saveCsv = async () => {
  var currentDate = new Date();
  console.log(currentDate);

  var currentDateWithFormat = new Date().toJSON().slice(0,10).replace(/-/g,'/');
  console.log(currentDateWithFormat);

  let newFile = { date: currentDate, values: content.value }


  if (nuxtStorage.localStorage.getData('archivos')) {
    let files = [...nuxtStorage.localStorage.getData('archivos')]
    files.push(newFile)
    nuxtStorage.localStorage.setData('archivos', files);
  } else {
    let files = [newFile]
    nuxtStorage.localStorage.setData('archivos', files);
  }

  snackbar.value = true

}



const handleFileUpload = (event) => {
  // Evita error cuando abren el browse pero no seleccionan nada
  if ( !(event.target && event.target.files && event.target.files[0]) ) {
    return;
  }
  csvFile.value = event.target.files[0]
  parseFile()
}

const parseFile = () => {
  parsingFile.value = true
  Papa.parse(csvFile.value, {
    header: true,
    skipEmptyLines: true,
    // preview: 2,
    complete: (_results) => {
      console.log(_results)
      content.value = _results.data
      parsed.value = true
      parsingFile.value = false
    },
    error: (error) => {
      parsingFile.value = false
    }
  })
}

</script>

<style scoped>

.option-format-select {
  border: 2px solid #dfd7d7;
  border-radius: 5px;
  padding: 5px;
  text-align: center;
  width: 100%;
}

.file-list-table {
  border: 1px solid #e1e1e1;
  border-radius: 5px;
}
.file-list-table th {
  color: #212121 !important
}
.upload-buttons {
  display: flex;
  justify-content: right;
}

.drop-container {
  position: relative;
  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
  padding: 20px;
  border-radius: 10px;
  border: 2px dashed #555;
  color: #444;
  cursor: pointer;
  transition: background .2s ease-in-out, border .2s ease-in-out;
}

.drop-container:hover {
  background: #e9ecea;;
  border-color: #212121 ;
}

.drop-container:hover .drop-title {
  color: #212121 ;
}

.drop-title {
  color: #212121 ;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  transition: color .2s ease-in-out;
}

input[type=file] {
  width: 350px;
  max-width: 100%;
  color: #212121 ;
  padding: 5px;
  background: #fff;
  border-radius: 5px;
  border: 1px solid #dfd7d7;
}

input[type=file]::file-selector-button {
  margin-right: 20px;
  border: none;
  background: #080a46;
  padding: 10px 20px;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  transition: background .2s ease-in-out;
}

input[type=file]::file-selector-button:hover {
  background: rgb(95, 95, 237);
}
</style>

<template>
  <CButton color="primary" @click="changePrices">Сменить цены</CButton>
  <CModal size="xl" backdrop="static" alignment="center" :visible="visible" @close="closeModal">
    <CForm novalidate :validated="formValid" ref="add-file-form" @change="wregert" @submit.prevent="editPrices()"
      class="add-user" style="display: 'none'">
      <CModalHeader>
        <CModalTitle>{{
          mode === 'new' ? 'Добавить товар' : 'Редактировать товар'
        }}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div class="options-shedle">
          <span>Опции</span>
          <table class="table">
            <thead>
              <tr>
                <td>Размер<br />
                  Материал</td>
                <td v-for="sizeName in distinct_sizes" :key="'sizeh-' + sizeName">
                  {{ sizeName }}
                  <CButton color="secondary" @click="dropSize(sizeName)">X</CButton>
                </td>
                <td>
                  <CInputGroup class="">
                    <CFormInput placeholder="Новый размер" type="text" v-model="tempSize" />
                    <CButton class="add-button" type="button" color="secondary" @click="addSize(tempSize)"
                      variant="outline">Добавить</CButton>
                  </CInputGroup>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="materialName in distinct_materials" :key="'material-' + materialName">
                <td>
                  {{ materialName }}
                  <CButton color="secondary" @click="dropMaterial(materialName)">X</CButton>
                </td>
                <td v-for="sizeName in distinct_sizes" :key="'size-' + sizeName">
                  <CFormInput type="number" v-model.number="options_object[materialName][sizeName]" />
                </td>
                <td>
                </td>
              </tr>
              <tr>
                <td>
                  <CInputGroup class="">
                    <CFormInput placeholder="Новый материал" type="text" v-model="tempMaterial" />
                    <CButton class="add-button" type="button" color="secondary" @click="addMaterial(tempMaterial)"
                      variant="outline">Добавить
                    </CButton>
                  </CInputGroup>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="options-shedle">
          <span>Обратная сторона</span>
          <table class="table">
            <thead>
              <tr>
                <td>Размер<br />
                  Материал</td>
                <td v-for="sizeName in distinct_sizes" :key="'sizeh-' + sizeName">
                  {{ sizeName }}
                </td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="materialName in distinct_materials" :key="'material-' + materialName">
                <td>
                  {{ materialName }}
                </td>
                <td v-for="sizeName in distinct_sizes" :key="'size-' + sizeName">
                  <CFormInput type="number" v-model.number="options_object_backside[materialName][sizeName]" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="closeModal"> Отменить </CButton>
        <CButton v-show="mode === 'new'" color="primary" type="submit">Добавить</CButton>
        <CButton v-show="mode === 'edit'" color="primary" type="submit">Редактировать</CButton>
      </CModalFooter>
    </CForm>
  </CModal>
</template>

<script>
import axios from 'axios'
const myApi = axios.create({
  withCredentials: true,
})
import eventBus from '../eventBus'

export default {
  components: {},
  props: {
    visible: Boolean,
  },
  data() {
    return {
      formData: {
        options_object: {},
        options_array: [],
      },
      formValid: false,
      options_object: {},
      options_object_backside: {},
      distinct_materials: [],
      distinct_sizes: [],
      tempSize: 0,
      tempMaterial: 0,
    }
  },
  async updated() {
    console.log(1)
    this.formData = { options_array: await this.getPrices() };
    this.options_object = {};
    this.options_object_backside = {};
    this.formData.options_array = this.formData.options_array?.
      filter(({ material, price, size }) => !material && !size && !price ? false : true)
    this.distinct_materials = [...new Set(this.formData.options_array?.map(({ material }) => material))]
    this.distinct_sizes = [...new Set(this.formData.options_array?.map(({ size }) => size))]

    for (let { size, material, price, is_backside } of this.formData.options_array) {
      if (!is_backside) {
        this.options_object[material] ? this.options_object[material][size] = price :
          this.options_object[material] = { [size]: price }

        this.options_object_backside[material] ? this.options_object_backside[material][size] = this.options_object_backside[material][size] ?? null :
          this.options_object_backside[material] = { [size]: null }
      }
      else {
        this.options_object_backside[material] ? this.options_object_backside[material][size] = price :
          this.options_object_backside[material] = { [size]: price }

        this.options_object[material] ? this.options_object[material][size] = this.options_object[material][size] ?? null :
          this.options_object[material] = { [size]: null }

      }
    }

    console.log(this.options_object, this.options_object_backside)
  },
  async mounted() {
  },
  methods: {
    async getPrices() {
      return myApi
        .get(this.$store.state.publicPath + '/api/admin/prices/', {
          params: {
          },
        })
        .then((res) => {
          return res.data
        })
        .catch((error) => {
          eventBus.$emit('noresponse', error)
          return false
        })
    },
    addMaterial(name) {
      let size_template = Object.values(this.options_object)?.[0] ?? {}
      size_template = Object.fromEntries(Object.entries(size_template)?.map(([key]) => [key, 0]))
      this.options_object[name] = size_template

      size_template = Object.values(this.options_object_backside)?.[0] ?? {}
      size_template = Object.fromEntries(Object.entries(size_template)?.map(([key]) => [key, 0]))
      this.options_object_backside[name] = size_template

      this.distinct_materials.push(name)
      this.tempMaterial = ""
    },
    addSize(name) {
      const new_oo_entries = Object.entries(this.options_object)?.map(([key, value]) => [key, Object.assign(value ?? {}, { [name]: 0 })])
      this.options_object = Object.fromEntries(new_oo_entries)
      const new_oob_entries = Object.entries(this.options_object_backside)?.map(([key, value]) => [key, Object.assign(value ?? {}, { [name]: 0 })])
      this.options_object_backside = Object.fromEntries(new_oob_entries)

      this.tempSize = ""
      this.distinct_sizes.push(name)

    },
    dropMaterial(name) {
      delete this.options_object[name]
      delete this.options_object_backside[name]
      this.distinct_materials = this.distinct_materials?.filter(el => el !== name)

    },
    dropSize(name) {
      for (let key in this.options_object) {
        delete this.options_object[key][name]
        delete this.options_object_backside[key][name]
      }
      this.distinct_sizes = this.distinct_sizes?.filter(el => el !== name)
    },
    changePrices() {
      eventBus.$emit('changePrices')
    },
    changeP(e) {
      this.formData.category_name = e.target.value
    },
    closeModal() {
      eventBus.$emit('closePrices')
    },
    constractFromData() {

      var formData = new FormData()

      formData.append('optionsObject', JSON.stringify(this.options_object))
      formData.append('optionsObjectBackside', JSON.stringify(this.options_object_backside))

      return formData
    },
    editPrices() {
      try {
        const formData = this.constractFromData(true)

        myApi
          .put(this.$store.state.publicPath + '/api/admin/prices', formData, {
            headers: {
              'Content-Type': `multipart/form-data`,

            },
          })
          .then(() => {
            eventBus.$emit('closePrices')
          })
          .catch((e) => {
            eventBus.$emit('noresponse', e)
          })
      } catch (e) {
        console.log(e)
        this.formValid = true
        //eventBus.$emit('wrongInputData', e)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep .hidden {
  display: none;
}

::v-deep .ql-toolbar.ql-snow {
  display: block !important;
}

.table {
  width: 100%;
  margin-bottom: 20px;
  border: 1px solid #dddddd;
  border-collapse: collapse;
}

.table th {
  font-weight: bold;
  padding: 5px;
  background: #efefef;
  border: 1px solid #dddddd;
}

.table td {
  border: 1px solid #dddddd;
  padding: 5px;
  position: relative;

  .btn.btn-secondary {
    position: absolute;
    top: 5px;
    right: 5px;
  }
}

.add-button {
  margin: 0;
}

.preview-container {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;

  &>div {
    max-width: 24%;
    position: relative;

    button {
      position: absolute;
      top: 5px;
      right: 5px;
    }
  }
}

.tags-cloud,
.projects-list {
  display: flex;
  flex-wrap: wrap;

  &>* {
    margin-right: 20px;
  }

  &>span {
    flex: 0 0 100%;
    margin-bottom: 10px;
  }
}
</style>

<template>
  <CButton class="mx-3" color="primary" @click="changePrices">Сменить цены</CButton>
  <CModal size="xxl" backdrop="static" alignment="center" :visible="visible" @close="closeModal">
    <CForm novalidate :validated="formValid" ref="add-file-form" @change="wregert" @submit.prevent="editPrices()"
      class="add-user" style="display: 'none'">
      <CModalHeader>
        <CModalTitle>Сменить цены</CModalTitle>
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
                </td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="materialName in distinct_materials" :key="'material-' + materialName">
                <td>
                  {{ materialName }}
                </td>
                <td v-for="sizeName in distinct_sizes" :key="'size-' + sizeName">
                  <div v-if="options_object[materialName][sizeName]">
                    <div
                      v-if="edited_array.findIndex(el => el.material === materialName && el.size === sizeName && el.is_backside === false) === -1">
                      {{
                        options_object[materialName][sizeName] }}</div>
                    <div v-else>
                      <CButton color="secondary" @click="dropOne(sizeName, materialName, false)">X</CButton>
                    </div>
                    <CFormInput type="number" @input="editOne($event, sizeName, materialName, false)" />
                  </div>
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
                  <div v-if="options_object_backside[materialName][sizeName]">
                    <div
                      v-if="edited_array.findIndex(el => el.material === materialName && el.size === sizeName && el.is_backside === true) === -1">
                      {{
                        options_object_backside[materialName][sizeName] }}</div>
                    <div v-else>
                      <CButton color="secondary" @click="dropOne(sizeName, materialName, true)">X</CButton>
                    </div>
                    <CFormInput type="number" @input="editOne($event, sizeName, materialName, true)" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="closeModal"> Отменить </CButton>
        <CButton color="primary" type="submit">Редактировать</CButton>
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
      edited_array: [],
    }
  },
  async updated() {
    console.log(1)
    this.formData = { options_array: await this.getPrices() };
    this.edited_array = [];
    this.options_object = {};
    this.options_object_backside = {};
    this.formData.options_array = this.formData.options_array?.
      filter(({ material, price, size }) => !material && !size && !price ? false : true)?.
      map(el => { el.price = `${el.min_price}-${el.max_price}`; return el; });
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
    editOne($event, size, material, is_backside) {
      const price = parseInt($event.target.value);
      if (!price) return this.dropOne(size, material, is_backside);
      const index = this.edited_array.findIndex(el =>
        el.material === material && el.size === size && el.is_backside === is_backside)
      if (index !== -1) this.edited_array[index].price = price;
      else
        this.edited_array.push({ size, material, is_backside, price: price });
      console.log(this.edited_array)
    },
    dropOne(size, material, is_backside) {
      this.edited_array = this.edited_array.filter((el) => !(el.size === size && el.material === material && el.is_backside === is_backside));
      console.log(this.edited_array)
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

      formData.append('edited_array', JSON.stringify(this.edited_array))

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

@media (min-width: 1600px) {
  .modal-xl {
    --cui-modal-width: 1540px !important;
  }
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

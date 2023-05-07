<template>
  <CButton color="primary" @click="addNewPost">Добавить товар</CButton>
  <CModal size="xl" backdrop="static" alignment="center" :visible="visible" @close="closeModal">
    <CForm novalidate :validated="formValid" ref="add-file-form" @change="wregert"
      @submit.prevent="mode === 'new' ? addNewing() : editNewing()" class="add-user" style="display: 'none'">
      <CModalHeader>
        <CModalTitle>{{
          mode === 'new' ? 'Добавить товар' : 'Редактировать товар'
        }}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CFormInput class="mb-3" v-model="formData.title" placeholder="Заголовок" id="inputHeader"
          aria-describedby="inputGroupPrepend" feedbackValid="Все ок" feedbackInvalid="Введите корректный заголовок"
          required />
        <div class="projects-list">
          <span>Категория</span>
          <CFormCheck v-for="project in projects" :key="project.name" :id="project.name"
            :checked="project.name === formData.category_name" @change="changeP" type="radio" name="project-name"
            :value="project.name" :label="project.name" />
          <CFormCheck id="null-name" :checked="!formData.category_name" @change="changeP" type="radio" name="project-name"
            value="" label="Без категорий" />
        </div>

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

        <CFormInput type="file" accept="image/*" multiple="multiple" ref="file" @change="previewMultiImage" class="mb-3"
          label="Превью" placeholder="Превью" />
        <div class="border p-2 mt-3 preview-container">
          <template v-if="preview_list?.length">
            <div v-for="item, index in preview_list" :key="index">
              <img :src="item" class="img-fluid" />
              <button @click.prevent="dropFile(index)">Х</button>
            </div>
          </template>
        </div>
        <QuillEditor theme="snow" toolbar="essential" ref="postTextEditor" id="postTextEditor"
          placeholder="Краткое описание" />
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
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import TurndownService from 'turndown'
import { marked } from 'marked'
//import * as DOMPurify from 'dompurify'
import eventBus from '../eventBus'

export default {
  components: { QuillEditor },
  props: {
    mode: {
      required: true,
      type: String,
      validator: (value) => ['new', 'edit'].includes(value.toLowerCase()),
    },
    visible: false,
    formData: {
      title: '',
      text: '',
      description: '',
      preview: '',
      category_name: '',
      image_list: [],
      tags_array: new Set(),
      options_object: {},
      options_array: [],
    },

  },
  data() {
    return {
      textMd2: '',
      textEditMode: 'md2',
      formValid: false,
      preview_list: [],
      options_object: {},
      options_object_backside: {},
      distinct_materials: [],
      distinct_sizes: [],
      tempSize: 0,
      tempMaterial: 0,
    }
  },
  updated() {
    console.log(1)
    this.options_object = {};
    this.options_object_backside = {};
    this.formData.options_array = this.formData.options_array?.
      filter(({ material, price, size }) => !material && !size && !price ? false : true)
    this.distinct_materials = [...new Set(this.formData.options_array?.map(({ material }) => material))]
    this.distinct_sizes = [...new Set(this.formData.options_array?.map(({ size }) => size))]

    this.formData.description && this.$refs.postTextEditor.pasteHTML(
      marked.parse(this.formData.description?.replaceAll("\r\n\r\n", "<span><br/><span/>\r\n\r\n")))

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

    this.preview_list = this.formData.image_list?.filter(el => el)?.map(preview_name => `${this.$store.state.serverAddr}/pics/${preview_name}`)

    document.getElementsByClassName('ql-toolbar')?.[0]?.classList.add('hidden')
  },
  async mounted() {
    this.projects = await this.getProjects()
    console.log(this.tags, this.projects)
  },
  methods: {
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
    async getProjects() {
      return await myApi
        .get(this.$store.state.publicPath + '/api/categories/')
        .then((res) => {
          return res.data
        })
        .catch((error) => {
          eventBus.$emit('noresponse', error)
        })
    },
    previewMultiImage(event) {
      var input = event.target;
      var count = input.files.length;
      var index = 0;
      this.formData.preview = input.files[0]
      if (!this.preview_list) this.preview_list = []
      if (!this.formData.image_list) this.formData.image_list = []

      if (input.files) {
        while (count--) {
          var reader = new FileReader();
          reader.onload = (e) => {
            this.preview_list.push(e.target.result);
          }
          this.formData.image_list.push(input.files[index]);
          reader.readAsDataURL(input.files[index]);
          index++;
        }
      }
    },
    reset() {
      this.formData.image_list = [];
      this.preview_list = [];
    },
    dropFile(index) {
      this.formData.image_list?.splice(index, 1);
      this.preview_list?.splice(index, 1);

    },
    addNewPost() {
      eventBus.$emit('addNewPost')
    },
    changeP(e) {
      this.formData.category_name = e.target.value

      const category_description = this.projects?.find(el => el.name === e.target.value)?.description
      category_description && this.$refs.postTextEditor.pasteHTML(
        marked.parse(category_description?.replaceAll("\r\n\r\n", "<span><br/><span/>\r\n\r\n")))
    },
    closeModal() {
      eventBus.$emit('closeModal')
    },
    constractFromData(isEdit) {
      if (!this.formData.title || !this.$refs.postTextEditor.getHTML())
        throw new Error()

      var formData = new FormData()

      formData.append('title', this.formData.title)

      const turndownService = new TurndownService({
        headingStyle: "atx",
        //bulletListMarker: "-",
        //fence: "~~~",
        //emDelimiter: "*",
      })
      formData.append(
        'description',
        turndownService.turndown(this.$refs.postTextEditor.getHTML()),
      )

      this.formData.image_list?.forEach(v => {
        formData.append('images[]', v);
      });

      this.formData.category_name &&
        formData.append('categoryName', this.formData.category_name)


      formData.append('optionsObject', JSON.stringify(this.options_object))
      formData.append('optionsObjectBackside', JSON.stringify(this.options_object_backside))


      isEdit && formData.append('id', this.formData.id)

      return formData
    },
    addNewing() {
      try {
        const formData = this.constractFromData()

        myApi
          .post(this.$store.state.publicPath + '/api/admin/items', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(() => {
            eventBus.$emit('postAdded')
          })
          .catch((e) => {
            eventBus.$emit('noresponse', e)
          })
      } catch (e) {
        this.formValid = true
        //eventBus.$emit('wrongInputData', e)
      }
    },
    editNewing() {
      try {
        const formData = this.constractFromData(true)

        myApi
          .put(this.$store.state.publicPath + '/api/admin/items', formData, {
            headers: {
              'Content-Type': `multipart/form-data`,

            },
          })
          .then(() => {
            eventBus.$emit('postEdited')
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

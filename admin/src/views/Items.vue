<template>
  <div>
    <AddItemModal :visible="formVisible" :formData="formData" :mode="formMode" />
    <ChangePricesModal :visible="changePricesVisible" />
    <Table :fields="tableFieldNames" :postData="get" :actions="dataActions" :rows="rows" editMode="form" name="Позиции" />
  </div>
</template>

<script>
import AddItemModal from '@/components/AddItemModal.vue'
import ChangePricesModal from '@/components/ChangePricesModal.vue'
import Table from '@/components/Table.vue'
import eventBus from '../eventBus'

import axios from 'axios'
const myApi = axios.create({
  withCredentials: true,
  credentials: 'include'

})

export default {
  components: {
    AddItemModal,
    Table, ChangePricesModal,
  },
  props: ['tag', 'project'],
  data() {
    return {
      myApi: myApi,
      formVisible: false,
      changePricesVisible: false,
      formData: {},
      rows: [],
      dataActions: {
        Дублировать: { action: this.duble, color: 'primary' },
        Изменить: { action: this.change, color: 'warning' },
        Удалить: { action: this.delete, color: 'danger' },
        '▲': { action: this.putHigrer, color: 'secondary' },
        '▼': { action: this.putLower, color: 'secondary' },
      },
      tableFieldNames: [
        {
          name: 'title',
          title: 'Название',
        },
        {
          name: 'description',
          title: 'Описание',
        },
        {
          name: 'publication_date',
          title: 'Дата добавления',
        },
      ],
    }
  },
  created() {
    eventBus.$on('addNewPost', () => {
      this.formMode = 'new'
      this.formData = {
        category: this.$route.params.categoryName,
      }
      this.formVisible = true
    })
    eventBus.$on('changePrices', () => {
      this.changePricesVisible = true
    })
    eventBus.$on('closePrices', () => {
      this.changePricesVisible = false
    })
    eventBus.$on('closeModal', () => {
      this.formVisible = false
      this.formData = {}
    })
    eventBus.$on('postAdded', () => {
      this.formVisible = false
      //this.rows.unshift(this.formData)
      this.get()
      this.formData = {}
    })
    eventBus.$on('postEdited', () => {
      this.formVisible = false
      this.get()
      this.formData = {}
    })
  },
  methods: {
    change(elObj) {
      this.formVisible = true
      elObj.tags_array = new Set(elObj.tags_array)
      this.formData = elObj
      console.log(elObj)
      this.formMode = 'edit'
    },
    constractFromData(elObj) {
      var formData = new FormData()

      formData.append('title', elObj.title)
      formData.append('description', elObj.description)
      elObj.image_list?.forEach(v => {
        formData.append('images[]', v);
      });
      elObj.category_name &&
        formData.append('categoryName', elObj.category_name)

      const options_object = {};
      const options_object_backside = {};
      elObj.options_array = elObj.options_array?.
        filter(({ material, price, size }) => !material && !size && !price ? false : true)

      for (let { size, material, price, is_backside } of elObj.options_array) {
        if (!is_backside) {
          options_object[material] ? options_object[material][size] = price :
            options_object[material] = { [size]: price }

          options_object_backside[material] ? options_object_backside[material][size] = options_object_backside[material][size] ?? null :
            options_object_backside[material] = { [size]: null }
        }
        else {
          options_object_backside[material] ? options_object_backside[material][size] = price :
            options_object_backside[material] = { [size]: price }

          options_object[material] ? options_object[material][size] = options_object[material][size] ?? null :
            options_object[material] = { [size]: null }

        }
      }

      formData.append('optionsObject', JSON.stringify(options_object))
      formData.append('optionsObjectBackside', JSON.stringify(options_object_backside))

      return formData
    },
    duble(elObj) {
      try {
        const formData = this.constractFromData(elObj)

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
      }
    },
    putHigrer(item, type = 'up') {
      return myApi
        .put(this.$store.state.publicPath + '/api/admin/items/', {
          order_id: item.order_id,
          id: item.id,
          type,
        })
        .then(() => {
          this.get()
          //this.rows = this.rows.filter((el) => el.id !== id)
          eventBus.$emit('projectDeleted')
        })
        .catch((error) => {
          eventBus.$emit('noresponse', error)
        })
    },
    putLower(item) {
      this.putHigrer(item, 'down')
    },
    get(take, page) {
      console.log(this.tag)
      return myApi
        .get(this.$store.state.publicPath + '/api/admin/items/', {
          params: {
            take: take ?? 10,
            page: page ?? 1,
            tagsArray: this.$route.params.tag
              ? [this.$route.params.tag]
              : undefined,
            category: this.$route.params.categoryName,
          },
        })
        .then((res) => {
          if (res.data?.length > 0) this.rows = res.data
          return res.data
        })
        .catch((error) => {
          eventBus.$emit('noresponse', error)
          return false
        })
    },
    delete(item) {
      const result = confirm('Вы действительно хотите удалить позицию из каталога?')
      if (result)
        return myApi
          .delete(this.$store.state.publicPath + '/api/admin/items/', {
            data: { id: item.id },
          })
          .then(() => {
            this.get()
            eventBus.$emit('postDeleted')
          })
          .catch((error) => {
            eventBus.$emit('noresponse', error)
          })
    },
  },
}
</script>

<style lang="scss">
button {
  margin-bottom: 20px;
}
</style>

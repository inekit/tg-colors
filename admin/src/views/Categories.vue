<template>
  <div>
    <AddCategoryModal :visible="formVisible" :formData="formData" :mode="formMode" />
    <Table :fields="tableFieldNames" :postData="get" :actions="dataActions" :rows="rows" editMode="form"
      name="Категории" />
  </div>
</template>

<script>
import AddCategoryModal from '@/components/AddCategoryModal.vue'
import Table from '@/components/Table.vue'
import eventBus from '../eventBus'

import axios from 'axios'
const myApi = axios.create({
  withCredentials: true,
})

export default {
  components: {
    AddCategoryModal,
    Table,
  },
  data() {
    return {
      myApi: myApi,
      formVisible: false,
      formData: {},
      rows: [],
      dataActions: {
        Позиции: { action: this.routeToPosts, color: 'primary' },
        Изменить: { action: this.change, color: 'warning' },
        Удалить: { action: this.delete, color: 'danger' },
        '▲': { action: this.putLower, color: 'secondary' },
        '▼': { action: this.putHigrer, color: 'secondary' },
      },
      tableFieldNames: [
        {
          name: 'name',
          title: 'Название',
        },
        {
          name: 'description',
          title: 'Описание',
        },
      ],
    }
  },
  created() {
    eventBus.$on('addNewProject', () => {
      this.formMode = 'new'
      this.formVisible = true
    })
    eventBus.$on('closeModal', () => {
      this.formVisible = false
      this.formData = {}
    })
    eventBus.$on('projectAdded', () => {
      this.formVisible = false
      this.get()
      this.formData = {}
    })
    eventBus.$on('projectEdited', () => {
      this.formVisible = false
      this.get()
      this.formData = {}
    })
  },
  methods: {
    change(elObj) {
      this.formVisible = true
      this.formData = elObj
      this.formMode = 'edit'
    },
    get(take, page) {
      return myApi
        .get(this.$store.state.publicPath + '/api/categories/', {
          params: {
            take: take ?? 10,
            page: page ?? 1,
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
    putHigrer(item, type = 'up') {
      return myApi
        .put(this.$store.state.publicPath + '/api/admin/categories/', {
          order_id: item.order_id,
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
    delete(item) {

      const result = confirm('Вы действительно хотите удалить пользователя?')
      if (result)
        return myApi
          .delete(this.$store.state.publicPath + '/api/admin/categories/', {
            data: { name: item.name },
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
    routeToPosts(item) {
      this.$router.push('/items/project/' + item.name)
    },
  },
}
</script>

<style lang="scss">
button {
  margin-bottom: 20px;
}
</style>

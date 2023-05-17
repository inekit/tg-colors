<template>
    <div>
        <div class="card mb-4 order-card">
            <div>
                ID: {{ order.id }}
            </div>
            <div>
                Создан: {{ dateFormatter(order.creation_date) }}
            </div>
            <div>
                Доставка: {{ order.selected_dm }}
            </div>
            <div>
                Адрес доставки: {{ order.address }}
            </div>
            <div>
                Почтовый индекс: {{ order.postal_code ?? "Нет" }}
            </div>
            <div>
                ФИО получателя: {{ `${order.surname} ${order.name} ${order.patronymic}` }}
            </div>
            <div>
                Пожелания к заказу: {{ order.comment ?? "Нет" }}
            </div>
            <div>
                Метод оплаты: {{ order.selected_po }}
            </div>
            <div>
                Промокод: {{ order.promo_code ? `${order.promo_code} на ${order.promo_sum}${order.promo_type === 'money' ?
                    'руб.' : '%'}` : 'Нет' }}
            </div>
            <div>
                Сумма заказа: {{ order.total }}
            </div>
            <div>
                Статус: {{ order.status }}
            </div>
            <div class="change-status">
                <span class="w-100 mb-2">Изменить статус</span>
                <button v-for="status in statuses" :key="status" class="btn btn-primary" @click="changeStatus(status)">{{
                    status }}</button>

            </div>
            <div class="send-message">
                <span class="w-100 mb-2">Отправить сообщение клиенту</span>
                <CInputGroup class="mb-2">
                    <CFormInput class="custon-input-part" placeholder="Напишите сообщение" aria-label="Напишите сообщение"
                        aria-describedby="button-sendmessage" v-model="messageTemplate" />
                    <CButton type="button" color="primary" variant="outline" id="button-sendmessage" @click="sendMessage">
                        Отправить
                    </CButton>
                </CInputGroup>
            </div>
        </div>
        <Table :fields="tableFieldNames" :postData="get" :actions="dataActions" :rows="rows" editMode="form"
            name="Позиции" />
    </div>
</template>
  
<script>
import Table from '@/components/Table.vue'
import eventBus from '../eventBus'
import { dateFormatter } from '../utils/dateFormatter';
import axios from 'axios'
const myApi = axios.create({
    withCredentials: true,
    credentials: 'include'

})

export default {
    components: {
        Table,
    },
    props: ['orderId'],
    data() {
        return {
            myApi: myApi,
            formVisible: false,
            formData: {},
            order: {},
            rows: [],
            statuses: ["Новый", "Оплачен"],
            messageTemplate: null,
            tableFieldNames: [
                {
                    name: 'id',
                    title: 'Артикул',
                },
                {
                    name: 'category',
                    title: 'Категория',
                },
                {
                    name: 'title',
                    title: 'Название',
                },
                {
                    name: 'size',
                    title: 'Размер',
                },
                {
                    name: 'material',
                    title: 'Материал',
                },
                {
                    name: 'count',
                    title: 'Количество',
                },
            ],
        }
    },
    created() {
    },
    methods: {
        change(elObj) {
            this.formVisible = true
            elObj.tags_array = new Set(elObj.tags_array)
            this.formData = elObj
            console.log(elObj)
            this.formMode = 'edit'
        },
        dateFormatter,
        changeStatus(newStatus) {
            this.$store.state.myApi.put(this.$store.state.publicPath + '/api/admin/orders', {
                id: this.order.id,
                status: newStatus,
            })
                .then(async () => {
                    this.order.status = newStatus;
                })
                .catch(e => { eventBus.$emit('noresponse', e) })
        },
        sendMessage() {
            this.$store.state.myApi.post(this.$store.state.publicPath + '/api/admin/messages', {
                user_id: this.order.user_id,
                text: this.messageTemplate
            })
                .then(async () => {
                    this.messageTemplate = null;
                    alert("Сообщение успешно отправлено")
                })
                .catch(e => { eventBus.$emit('noresponse', e) })
        },
        get(take, page) {
            console.log(this.tag)
            return myApi
                .get(this.$store.state.publicPath + '/api/admin/orders/', {
                    params: {
                        take: take ?? 10,
                        page: page ?? 1,
                        id: this.$route.params.orderId,
                    },
                })
                .then((res) => {
                    res.data.items = res.data.items?.map(el => {
                        if (el.mainside_id) el.title = `${el.title} (обр - ${el.mainside_id})`;
                        return el
                    })
                    if (res.data.items?.length > 0) this.rows = res.data.items
                    this.order = res.data
                })
                .catch((error) => {
                    eventBus.$emit('noresponse', error)
                    return false
                })
        },
    },
}
</script>
  
<style lang="scss">
button {
    margin-bottom: 20px;
}

.order-card {
    padding: 1rem;
    font-size: 1.2rem;

    button {
        margin-bottom: 0 !important;
    }
}

.change-status {
    display: flex;
    flex-wrap: wrap;

    button {
        width: 150px;
        margin-right: 20px;
    }
}

.custon-input-part {
    height: 38px !important
}
</style>
  
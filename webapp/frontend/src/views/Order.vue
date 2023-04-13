<template>
    <h1>Оформление заказа</h1>
    <div class="order-block">
        <button class="" @click="order">Оформить заказ</button>

        <div class="payment">
            <h2>Метод оплаты</h2>
            <div class="select-group">
                <div v-for="po in paymentOptions" :key="po">
                    <input type="radio" :id="po" :value="po" v-model="selected_po">
                    <label :for="po" @click="selected_po = po">{{ po }}</label>
                </div>
            </div>
        </div>
        <div class="delivery">
            <h2>Способ доставки</h2>
            <div class="select-group">
                <div v-for="dm in deliveryMethods" :key="dm">
                    <input type="radio" :id="dm" :value="dm" v-model="selected_dm">
                    <label :for="dm" @click="selected_dm = dm">{{ dm }}</label>
                </div>
            </div>
        </div>
        <h2>Получатель</h2>
        <div class="input-group">
            <input type="text" id="name" name="name" placeholder="Имя" v-model="basketData.name">
            <input type="text" id="surname" name="surname" placeholder="Фамилия" v-model="basketData.surname">
            <input type="text" id="patronymic" name="patronymic" placeholder="Отчество" v-model="basketData.patronymic">
            <input type="tel" id="phone" name="phone" placeholder="Телефон" v-model="basketData.phone">
            <input type="text" id="address" name="address" placeholder="Адрес доставки" v-model="basketData.address">
        </div>
        <h2 class="total">Итого</h2>
        <div class="pricing">Стоимость доставки<span>{{ deliveryPrice }} ₽</span></div>
        <div class="pricing">К оплате<span>{{ basketData.total + deliveryPrice }} ₽</span></div>
    </div>
</template>

<script>
import eventBus from '../eventBus'
import { ListLoader, InstagramLoader } from 'vue-content-loader'


export default {
    components: { InstagramLoader },
    data() {
        return {
            basketData: {},
            paymentOptions: ["yookassa"],
            selected_po: "yookassa",
            deliveryMethods: ["Я. Доставка", "CДЭК"],
            selected_dm: "CДЭК",
            deliveryPrice: 1000,
        }
    },
    watch: {
    },
    async mounted() {
        window.Telegram?.WebApp.BackButton.onClick(this.routeBack);
        window.Telegram?.WebApp.BackButton.show();

        window.Telegram?.WebApp.MainButton.onClick(this.order);
        window.Telegram?.WebApp.MainButton.enable();
        window.Telegram?.WebApp.MainButton.show();
        window.Telegram?.WebApp.MainButton.setText("Заказ подтверждаю");

        this.basketData = await this.getBasketData()

    },
    async beforeUnmount() {
        window.Telegram?.WebApp.MainButton.offClick(this.order);
        window.Telegram?.WebApp.MainButton.hide();
        window.Telegram?.WebApp.BackButton.offClick(this.routeBack);
        window.Telegram?.WebApp.BackButton.hide();
    },
    methods: {
        order() {
            if (!this.basketData.address || !this.basketData.phone ||
                !this.basketData.name || !this.basketData.surname || !this.basketData.patronymic)
                return alert("Пожалуйста, заполните все поля")

            this.$store.state.myApi
                .post(this.$store.state.restAddr + '/orders', {
                    user_id: this.$store.state.userId,
                    address: this.basketData.address,
                    selected_dm: this.selected_dm,
                    selected_po: this.selected_po,
                    phone: this.basketData.phone,
                    name: this.basketData.name,
                    surname: this.basketData.surname,
                    patronymic: this.basketData.patronymic,
                    total: this.basketData.total + this.deliveryPrice
                })
                .then(async (response) => {
                    this.count = (await this.getBasketOption())?.count ?? 0;
                })
                .catch(e => { eventBus.$emit('noresponse', e) })
        },
        routeBack() {
            this.$router.go(-1)
        },
        async getBasketData() {
            const results = await this.$store.state.myApi.get(this.$store.state.restAddr + '/basket_data', {
                params: {
                    user_id: this.$store.state.userId,
                }
            })
                .then(response => {
                    return response.data;
                })
                .catch(e => { eventBus.$emit('noresponse', e) })

            return results ?? {}

        },
    }
}
</script>
  

<style lang="scss">
.order-block {
    color: #414141;
    padding: 0 1rem 1rem 1rem;

    input[type="radio"] {
        -webkit-appearance: none;
        appearance: none;
        background-color: #E6E6E6;
        margin: 0;
        font: inherit;
        width: 120px;
        height: 40px;
        border-radius: 1rem;
        border: none;
        transform: translateY(-0.075em);

        display: grid;
        place-content: center;
    }

    input[type="radio"]::before {
        content: "";
        width: 120px;
        height: 40px;
        z-index: 999;
        border-radius: 1rem;
        transform: scale(0);
        transition: 120ms transform ease-in-out;
        box-shadow: none;
        background-color: #666666;
    }

    input[type="radio"]:checked::before {
        transform: scale(1);
    }

    input[type="radio"]:focus {
        outline: none;
        outline-offset: max(2px, 0.15em);
    }
}

.payment {}

.delivery {
    margin-bottom: 20px;
}

.select-group {
    display: flex;
    gap: 10px;

    &>div {
        position: relative;
        display: inline-block;
        width: 120px;
    }

    label {
        display: block;
        position: absolute;
        margin: 10px auto;
        line-height: 20px;
        z-index: 999;
        color: white;
        top: 0;
        left: 0;
        right: 0;
        width: fit-content;
    }
}



.input-group {


    position: relative;

    input {
        background-color: #E6E6E6;
        padding: 17px 20px;
        width: calc(100% - 40px);
        border-radius: 1rem;
        border: none;
        margin-bottom: 10px;
        font-size: 1rem;
    }

    margin-bottom: -10px
}

.total {}

.pricing {
    position: relative;
    font-size: 1.2rem;
    margin-bottom: 10px;

    span {
        display: block;
        position: absolute;
        right: 0;
        top: 0;
    }
}
</style>
  
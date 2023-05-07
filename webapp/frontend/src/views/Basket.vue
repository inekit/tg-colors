<template>
    <h1>Корзина</h1>
    <InstagramLoader class="preloader" ref="preloader" viewBox="0 0 300 250"></InstagramLoader>
    <InstagramLoader class="preloader" ref="preloader" viewBox="0 0 300 200"></InstagramLoader>
    <InstagramLoader class="preloader" ref="preloader" viewBox="0 0 300 200"></InstagramLoader>
    <div class="basket-items">
        <div class="basket-item" v-for="item, id in basketItems" :key="id">
            <RouterLink :to="getItemLink(item)">
                <div class="img-container">
                    <img :src="`/pics/${item.image_list?.[0]}`" />
                </div>
                <span class="title">
                    {{ item.title + (item.mainside_id ? " (обратная)" : "") }}
                </span>
                <span class="size">
                    Размер {{ item.size }}
                </span>
                <span class="material">
                    Материал {{ item.material }}
                </span>
                <span class="price">
                    {{ item.price }} ₽
                </span>
            </RouterLink>
            <div v-if="!item.mainside_id" class="count-select">
                <button type="button" @click="changeCount(item, item.count - 1)">-</button>
                <span>{{ item.count }}</span>
                <button type="button" @click="changeCount(item, item.count + 1)">+</button>
            </div>
            <div v-else class="delete">
                <button type="button" @click="dropItem(item)">Удалить</button>
            </div>
        </div>
        <div v-if="individual" class="basket-item">
            <div>
                <div class="img-container">
                </div>
                <span class="title">
                    {{ individual.text }}
                </span>
                <span class="price">
                    {{ individual.price }} ₽
                </span>
            </div>
        </div>
    </div>
    <div class="order">
        <span class="label">Итого:</span>
        <span class="value">{{ total }} ₽</span>
    </div>
</template>

<script>
import eventBus from '../eventBus'
import { ListLoader, InstagramLoader } from 'vue-content-loader'

//    <button v-if="basketItems.length > 0 || individual" class="" @click="order">Оформить заказ</button>

export default {
    components: { InstagramLoader },
    data() {
        return {
            basketItems: [],
            individual: null,
            total: 0,
        }
    },
    watch: {
    },
    async beforeMount() {
        window.Telegram?.WebApp.MainButton.hide();
        window.Telegram?.WebApp.MainButton.disable();
        window.Telegram?.WebApp.BackButton.onClick(this.routeBack);
        window.Telegram?.WebApp.BackButton.show();

        this.$store.state.userId = this.$store.state.userId ?? this.$route.params?.userId;

        this.basketItems = await this.getBasket();

        this.$refs['basket-items']?.classList.add("hidden")
        document.body.classList.add('stop-scrolling')

        setTimeout(() => {
            const elements = document.getElementsByClassName('preloader')

            console.log(elements)

            for (let el of elements) {
                el.classList.add("hidden")
            }
            this.$refs['basket-items']?.classList.remove("hidden")
            document.body.classList.remove('stop-scrolling')

        }, 300)

        if (this.basketItems?.length || this.individual) {
            window.Telegram?.WebApp.MainButton.onClick(this.order);

            window.Telegram?.WebApp.MainButton.enable();
            window.Telegram?.WebApp.MainButton.show();
            window.Telegram?.WebApp.MainButton.setText("Оформить заказ");
        } else {
            window.Telegram?.WebApp.MainButton.offClick(this.order);
            window.Telegram?.WebApp.MainButton.hide();
        }
    },
    async beforeUnmount() {
        window.Telegram?.WebApp.MainButton.offClick(this.order);
        window.Telegram?.WebApp.MainButton.hide();
        window.Telegram?.WebApp.BackButton.offClick(this.routeBack);
        window.Telegram?.WebApp.BackButton.hide();
    },
    methods: {
        getItemLink(item) {
            return item.mainside_id ?
                `/items/${item.item_id}?mainside_id=
            ${item.mainside_id}&size=${item.size}&material=${item.material}` :
                `/items/${item.item_id}`
        },
        changeCount(item, newCount) {
            if (newCount > 100) return;
            this.$store.state.myApi.put(this.$store.state.restAddr + '/favorites', {
                user_id: this.$store.state.userId,
                item_option_id: item.id,
                mainside_id: item.mainside_id,
                count: newCount,
            })
                .then(async response => {
                    this.basketItems = await this.getBasket();
                })
                .catch(e => { eventBus.$emit('noresponse', e) })
        },
        dropItem(item) {
            this.$store.state.myApi.delete(this.$store.state.restAddr + '/favorites', {
                data: {
                    user_id: this.$store.state.userId,
                    item_option_id: item.id,
                    mainside_id: item.mainside_id,
                }
            })
                .then(async response => {
                    this.basketItems = await this.getBasket();
                })
                .catch(e => { eventBus.$emit('noresponse', e) })
        },
        order() {
            this.$router.push("/order")
        },
        routeBack() {
            this.$router.go(-1)
        },
        async finishWindow() {
            if (!this.$store.state.userId) return alert("Ваша версия телеграм не поддерживается")

            await this.getFiles().catch(console.log);
            window.Telegram?.WebApp.disableClosingConfirmation()
            window.Telegram?.WebApp.close();
        },
        async getBasket() {
            function moveElement(arr, from, to) {
                arr.splice(to, 0, arr.splice(from, 1)[0]);
                return arr;
            };
            const results = await this.$store.state.myApi.get(this.$store.state.restAddr + '/basket_data', {
                params: {
                    user_id: this.$store.state.userId,
                }
            })
                .then(response => {
                    //if (response.data.favorites.length === 0 && !response.data.individual_text && window.Telegram?.WebApp)
                    //    return this.routeBack()

                    this.individual = response.data.individual_text ?
                        { text: response.data.individual_text, price: response.data.individual_price } :
                        null;

                    this.total = response.data.total;

                    let rows = response.data?.favorites;

                    for (let i = 0; i < rows.length; i++) {
                        if (!rows[i].mainside_id || (i !== rows.length - 1 && rows[i].mainside_id === rows[i + 1].id)) continue;
                        console.log(i)
                        jfor: for (let j in rows) {
                            if (rows[i].mainside_id === rows[j].id) {
                                console.log(rows.map(el => { return { id: el.id, mainside_id: el.mainside_id } }));
                                rows = moveElement(rows, i, j)

                                console.log(rows.map(el => { return { id: el.id, mainside_id: el.mainside_id } }));
                                if (i < rows.length - 1) i = 0;
                                break jfor;
                            }
                        }
                    }
                    rows = rows.reverse()

                    return response.data.favorites;

                })
                .catch(e => { eventBus.$emit('noresponse', e) })

            return results

        },
    }
}
</script>
  

<style lang="scss" scoped>
.basket-items {
    margin-bottom: 90px;
}

.basket-item {
    margin: 1rem;
    position: relative;

    a {
        text-decoration: none;
        color: inherit;
    }

    .img-container {
        position: relative;
        background-color: #414141;
        width: 18vw;
        height: 30vw;
        position: relative;
        overflow: hidden;
        padding: 1rem;
        border-radius: 1rem;

        img {
            position: absolute;
            margin: auto;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            max-width: 200%;
            max-height: 110%;
            min-width: 100%;
            min-height: 100%;
            width: auto;
            height: auto;
        }
    }

    .title {
        position: absolute;
        left: 30vw;
        top: 0;
        font-size: 1.4rem;
        display: block;
        width: 45vw;
        word-break: break-all;
        height: 1.9rem;
        overflow: hidden;
    }

    .count-select {
        position: absolute;
        right: 0;
        bottom: 0;
        background-color: #E6E6E6;
        border-radius: 1rem;
        padding: 15px 40px;
        font-size: 13px;
        border: none;
        width: 50px;

        &>span {
            margin-left: auto;
            margin-right: auto;
            display: block;
            width: 9px;
            color: rgb(44, 44, 44);
        }

        &>button {
            border: none;
            color: rgb(44, 44, 44);
            height: 47px;
            position: absolute;
            right: 0;
            top: 0;
            font-size: 25px;
            width: 47px;
            border-radius: 0 1rem 1rem 0;

            &:first-child {
                left: 0;
                border-radius: 1rem 0 0 1rem;
            }
        }
    }

    .delete {
        &>button {
            position: absolute;
            right: 0;
            bottom: 0;
            background-color: #E6E6E6;
            border-radius: 1rem;
            padding: 15px 40px;
            font-size: 13px;
            border: none;
        }
    }

    .size {
        position: absolute;
        left: 30vw;
        top: 25%;
        font-size: 1rem;
    }

    .material {
        position: absolute;
        left: 30vw;
        top: 45%;
        font-size: 1rem;
    }

    .price {
        position: absolute;
        right: 0;
        top: 0;
        font-size: 1.4rem;
        font-weight: 500;
    }


}

.order {
    position: fixed;
    top: calc(100vh - 70px);
    top: calc(var(--tg-viewport-stable-height) - 70px);
    height: 70px;
    left: 0;
    right: 0;
    padding: 12px 1rem;
    border-top: 1px rgba(192, 192, 192, 0.363) solid;
    background-color: white;

    .label {
        display: block;
        position: absolute;
        right: left;
        font-size: 1.3rem;
        font-weight: 400;
        line-height: 45px;
    }

    .value {
        display: block;
        position: absolute;
        right: 1rem;
        font-size: 1.4rem;
        font-weight: 500;
        line-height: 45px;
    }
}
</style>
  
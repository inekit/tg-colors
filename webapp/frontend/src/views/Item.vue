<template>
    <InstagramLoader class="preloader" ref="preloader" viewBox="0 0 300 250"></InstagramLoader>
    <InstagramLoader class="preloader" ref="preloader" viewBox="0 0 300 200"></InstagramLoader>
    <InstagramLoader class="preloader" ref="preloader" viewBox="0 0 300 200"></InstagramLoader>

    <div class="img-container">
        <carousel>
            <slide class="carousel__item" v-for="img_link, img_id in item.image_list" :key="img_id">
                <img v-if="['webp', 'jpg', 'jpeg', 'png'].includes(img_link?.split('.')?.reverse()[0]?.toLowerCase())"
                    :src="`/pics/${img_link}`" />
                <video style="max-height: 100%;max-width: 100%;" v-else :src="`/pics/${img_link}`" controls>
                    Ваш браузер не поддерживает видео
                </video>
            </slide>
            <template #addons>
                <pagination />
            </template>
        </carousel>
    </div>
    <h1>{{ item.title }}</h1>
    <hr class="my-1" />
    <form>
        <div class="option-select">
            <label for="size-select">Размер</label>
            <div class="select-dropdown">
                <select id="size-select" v-model="selected_size" @change="changeSize" required>
                    <option v-for="size in sizes" :key="size" :value="size">{{ size }}</option>
                </select>
            </div>
        </div>
        <hr />
        <div class="option-select">
            <label for="material-select">Материал</label>
            <div class="select-dropdown">
                <select id="material-select" v-model="selected_material" @change="changeMaterial" required>
                    <option v-for="material in materials" :key="material" :value="material">{{ material }}</option>
                </select>
            </div>
        </div>
        <hr />
        <label>Описание</label>
        <div class="description" v-html="item.description"></div>
        <div class="backside count-select" v-if="count && !mainside_id && canChooseBackside && item.backside_available">
            <hr />
            <label>Обратная сторона</label>
            <button v-if="!backside_item?.id" type="button" @click="routeToBackSide">Выбрать</button>
            <div v-else>
                <span>{{ backside_item.title }}</span>
                <button type="button" @click="routeToBackSideItem">Посмотреть</button>
                <button type="button" @click="dropBackSideItem">Убрать</button>
            </div>
        </div>
        <div class="order" v-if="mainside_id">
            <span>{{ price }} ₽</span>
            <button v-if="!mainside_item?.id" type="button" @click.prevent="order">В корзину</button>
            <button v-else type="button" @click.prevent="routeToMainItem">К основной</button>
        </div>
        <div class="order" v-else>
            <span>{{ price }} ₽</span>
            <div class="count-select" v-if="count">
                <button type="button" @click="changeCount(count - 1)">-</button>
                <span>{{ count }}</span>
                <button type="button" @click="changeCount(count + 1)">+</button>
            </div>
            <button v-else type="button" @click.prevent="order">В корзину</button>
        </div>
    </form>
</template>

<script>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import moment from "moment"
import eventBus from '../eventBus'
import { ListLoader, InstagramLoader } from 'vue-content-loader'
import { marked } from 'marked'


export default {
    components: {
        InstagramLoader,
        Carousel,
        Slide,
        Pagination,
        Navigation,
    },
    data: () => {
        return {
            item: {},
            options_array: [],
            selected_size: null,
            sizes: [],
            selected_material: null,
            materials: [],
            count: 0,
            mainside_item: {},
            backside_item: {},
            price: 0,
            canChooseBackside: false,
        }
    },
    watch: {
        async $route(to, from) {
            this.getUriParams();
            this.item = await this.getItem(this.$route.params.id).catch(e => console.log(e));
        },
        async item(to) {

            this.sizes = [...new Set(to?.options_array?.map(({ size }) => size))]
            this.selected_size = this.sizes?.[0]
            this.materials = [...new Set(to?.options_array?.map(({ material }) => material))]
            this.selected_material = this.materials?.[0]
            this.selected_option = to?.options_array?.find(el => el.size === this.selected_size && el.material === this.selected_material)
            this.price = this.selected_option?.price;
            this.count = (await this.getBasketOption())?.count ?? 0;
            this.item.is_favorite = !!this.count;
            this.canChooseBackside = await this.getCanChooseBackside()
            this.item.description = marked.parse(this.item.description?.replaceAll("\r\n\r\n", "<span><br/><span/>\r\n\r\n"))

            await this.getReferencedItems()
        },
        "item.is_favorite"(is_favorite) {
            if (is_favorite) {
                window.Telegram?.WebApp.MainButton.onClick(this.routeToBasket);

                window.Telegram?.WebApp.MainButton.enable();
                window.Telegram?.WebApp.MainButton.show();
                window.Telegram?.WebApp.MainButton.setText("Корзина");
            } else {
                window.Telegram?.WebApp.MainButton.offClick(this.routeToBasket);
                window.Telegram?.WebApp.MainButton.hide();
            }
        }
    },
    async beforeMount() {

        window.Telegram?.WebApp.BackButton.onClick(this.routeBack);
        window.Telegram?.WebApp.BackButton.show();

        this.getUriParams()

        this.item = await this.getItem(this.$route.params.id);

        this.$refs['results-block']?.classList.add("hidden")
        document.body.classList.add('stop-scrolling')

        setTimeout(() => {
            const elements = document.getElementsByClassName('preloader')

            console.log(elements)

            for (let el of elements) {
                el.classList.add("hidden")
            }
            this.$refs['results-block']?.classList.remove("hidden")
            document.body.classList.remove('stop-scrolling')

        }, 400)

    },
    async beforeUnmount() {
        window.Telegram?.WebApp.MainButton.offClick(this.routeToBasket);
        window.Telegram?.WebApp.MainButton.hide();
        window.Telegram?.WebApp.BackButton.offClick(this.routeBack);
        window.Telegram?.WebApp.BackButton.hide();
    },
    methods: {
        getUriParams() {
            let uri = window.location.search.substring(1);
            this.params = new URLSearchParams(uri)
            this.backFilters = {
                size: this.params.get('size'),
                material: this.params.get('material')
            }
            this.mainside_id = this.params.get('mainside_id') === "null" ? null : parseInt(this.params.get('mainside_id'))
        },
        async finishWindow() {
            if (!this.$store.state.user_id) return alert("Ваша версия телеграм не поддерживается")

            window.Telegram?.WebApp.disableClosingConfirmation()
            window.Telegram?.WebApp.close();
        },
        routeBack() {
            //this.$router.push(`/results/${this.$store.state.userId}`)
            this.$router.go(-1)
        },
        routeToBasket() {
            this.$router.push("/basket")
        },
        routeToBackSide() {
            this.$router.push(`/results/${this.$store.state.userId}?mainside_id=
            ${this.selected_option.id}&size=${this.selected_size}&material=${this.selected_material}`)
        },
        async routeToBackSideItem() {
            console.log(this.backside_item)

            this.$router.push(`/items/${this.backside_item?.id}?mainside_id=
            ${this.selected_option.id}&size=${this.selected_size}&material=${this.selected_material}`);

        },
        async routeToMainItem() {

            this.$router.push('/items/' + this.mainside_item?.id)
        },
        async dropBackSideItem() {
            this.$store.state.myApi.delete(this.$store.state.restAddr + '/favorites', {
                data: {
                    user_id: this.$store.state.userId,
                    mainside_id: this.selected_option.id
                }
            })
                .then(async response => {
                    this.item = await this.getItem(this.$route.params.id);

                })
                .catch(e => { eventBus.$emit('noresponse', e) })
        },
        getItem(id, { item_option_id, mainside_id, backside_id } = {}) {
            return new Promise((res, rej) => {
                this.$store.state.myApi.get(this.$store.state.restAddr + '/items', {
                    params: {
                        id,
                        item_option_id,
                        mainside_id: mainside_id ?? undefined,
                        backside_id,
                        is_backside: this.mainside_id ? true : false,
                        user_id: this.$store.state.userId,
                    }
                })
                    .then(response => {
                        const item = response.data?.[0];

                        if (this.mainside_id && item) {
                            item.options_array = item.options_array?.filter(({ size, material }) =>
                                size == this.backFilters?.size && material == this.backFilters?.material)
                        }


                        res(item)
                    })
                    .catch(e => { eventBus.$emit('noresponse', e); rej() })
            })
        },
        async getReferencedItems() {
            if (this.mainside_id)
                this.mainside_item = await this.getItem(this.mainside_id, { backside_id: this.selected_option?.id });
            else this.backside_item = await this.getItem(undefined, { mainside_id: this.selected_option?.id });
        },
        async changeMaterial() {
            this.sizes = this.item.options_array?.filter(el => el.material === this.selected_material)?.map(({ size }) => size);
            this.selected_size = this.sizes?.includes(this.selected_size) ? this.selected_size : this.sizes?.[0]

            this.selected_option = this.item.options_array?.find(el => el.size === this.selected_size && el.material === this.selected_material)
            this.count = (await this.getBasketOption())?.count ?? 0;
            this.price = this.selected_option?.price;
            await this.getReferencedItems()
            this.canChooseBackside = await this.getCanChooseBackside()

        },
        async changeSize() {
            this.materials = this.item.options_array?.filter(el => el.size === this.selected_size)?.map(({ material }) => material)
            this.selected_material = this.materials?.includes(this.selected_material) ?
                this.selected_material : this.materials?.[0]

            this.selected_option = this.item.options_array?.find(el => el.size === this.selected_size && el.material === this.selected_material)
            this.count = (await this.getBasketOption())?.count ?? 0;
            this.price = this.selected_option?.price;
            await this.getReferencedItems()
            this.canChooseBackside = await this.getCanChooseBackside()

        },
        async getBasketOption(mainItem) {
            return await this.$store.state.myApi
                .get(this.$store.state.restAddr + '/favorites', {
                    params: {
                        user_id: this.$store.state.userId,
                        item_option_id: this.selected_option?.id,
                        mainside_id: !isNaN(this.mainside_id) ? this.mainside_id : undefined
                    }
                })
                .then((response) => {
                    try {
                        const item = this.mainside_id ?
                            mainItem ? response.data?.filter(el => el.mainside_id != this.mainside_id)?.[0] :
                                response.data?.filter(el => el.mainside_id == this.mainside_id)?.[0] :
                            response.data?.[0]

                        return item
                    }
                    catch (e) { console.log(e); rej(e) }
                })
                .catch((e) => {
                    eventBus.$emit('noresponse', e)
                })
        },
        async getCanChooseBackside() {
            const results = await this.$store.state.myApi.get(this.$store.state.restAddr + '/items', {
                params: {
                    take: 1,
                    page: 1,
                    sort: "newing",
                    user_id: this.$store.state.userId,
                    size: this.selected_size,
                    is_backside: true,
                    material: this.selected_material
                }
            })
                .then(response => {
                    return response.data?.length;
                })
                .catch(e => { eventBus.$emit('noresponse', e) })

            console.log(results)

            return results

        },
        changeCount(newCount) {
            if (newCount > 100) return;
            this.$store.state.myApi.put(this.$store.state.restAddr + '/favorites', {
                user_id: this.$store.state.userId,
                item_option_id: this.selected_option.id,
                count: newCount,
            })
                .then(async response => {
                    this.count = (await this.getBasketOption())?.count ?? 0;
                    this.item.is_favorite = !!this.count;
                })
                .catch(e => { eventBus.$emit('noresponse', e) })
        },
        async order() {
            const count = this.mainside_id ? (await this.getBasketOption(true))?.count : 1
            this.$store.state.myApi
                .post(this.$store.state.restAddr + '/favorites', {
                    item_option_id: this.selected_option.id,
                    count,
                    user_id: this.$store.state.userId,
                    mainside_id: this.mainside_id
                })
                .then(async (response) => {
                    if (this.mainside_id) {
                        await this.getReferencedItems()
                        await this.routeToMainItem()
                    }

                    this.count = (await this.getBasketOption())?.count ?? 0;
                    this.item.is_favorite = true;


                })
                .catch((e) => {
                    alert("Эта позиция уже добавлена в корзину")
                })
        },
        getDate(date) {
            return moment(date).format("DD.MM.YYYY")
        },
    }
}
</script>

<style lang="scss">
h1 {
    font-weight: 600;
    font-size: 1.7rem;
}

.my-1 {
    margin: 0 1rem;
    margin-top: 10px;
    width: calc(100vw - 2rem);
}

.img-container {
    width: 100%;
    position: relative;
}

.points-list {
    list-style: none;
    padding: 1rem;
    font-size: 1.15rem;
    margin: 0;

    li {
        margin-bottom: 10px;
    }
}

.carousel__item {
    width: 100%;
    min-height: 100px;
    background-color: #ffffff;
    color: var(--vc-clr-white);
    font-size: 20px;
    //border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    max-height: 140vw;

    img {
        width: 100vw;
    }
}

.carousel__pagination {
    padding: 0;
}

.carousel__track {
    margin: auto;
    max-height: 100vh;
}

.carousel__slide {
    padding: 0px;
}

.carousel__prev,
.carousel__next {
    box-sizing: content-box;
    border: 5px solid white;
}

.favorite-toggle {
    width: 50px;
    height: 50px;
    border-radius: 13px;
    background-color: transparent;
    border: 1px solid;
    background-color: #6e6e6e;
    border-color: #6e6e6e;
    z-index: 999;
    position: absolute;
    top: 1rem;
    right: 1rem;
    transition: all 0.2s;

    img {
        height: 50%;
        margin: 25%;
    }

    &.favorite-item {
        border-color: rgb(197, 80, 105);
        background-color: rgb(197, 80, 105);
    }

}

form {
    margin: 1rem;
    margin-top: 0.5rem;
    font-size: 1rem;
    margin-bottom: calc(90px + 0.5rem);

    label {
        font-size: 1.1rem;
        font-weight: 600;
        color: #414141;
        color: var(--tg-theme-text-color);
    }

    .option-select {
        position: relative;
        height: 35px;

        .select-dropdown,
        .select-dropdown * {
            margin: 0;
            padding: 0;
            position: relative;
            box-sizing: border-box;
        }

        .select-dropdown {
            position: absolute;
            right: 0;
            top: 0;
            background-color: #E6E6E6;
            border-radius: 10px;
            color: #414141;
            //color: var(--tg-theme-text-color);

            select {
                font-size: 15px;
                font-weight: 400;
                max-width: 100%;
                padding: 10px 30px 10px 15px;
                border: none;
                background-color: transparent;
                -webkit-appearance: none;
                -moz-appearance: none;
                appearance: none;
                color: #414141 !important;
                //color: var(--tg-theme-text-color) !important;

                &:focus,
                &:active {
                    outline: none;
                    box-shadow: none;
                }
            }

            &:after {
                content: "";
                position: absolute;
                top: 50%;
                right: 8px;
                width: 0;
                height: 0;
                margin-top: -2px;
                border-top: 5px solid #aaa;
                border-right: 5px solid transparent;
                border-left: 5px solid transparent;
            }
        }
    }

    .description {
        margin-top: 0.5rem;

        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p {
            margin: 0;
            font-weight: 400;
            color: #414141;
            color: var(--tg-theme-text-color);
        }

        ul,
        li {
            color: #414141;
            color: var(--tg-theme-text-color);
        }

        p {
            font-size: 1rem;
        }

        h6 {
            font-size: 1.1rem;
        }

        h5 {
            font-size: 1.2rem;
        }

        h4 {
            font-size: 1.3rem;
        }

        h3 {
            font-size: 1.4rem;
        }

        h2 {
            font-size: 1.5rem;
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
        background-color: var(--tg-theme-bg-color);
        color: #414141;
        color: var(--tg-theme-text-color);

        .count-select {
            position: absolute;
            right: 1rem;
            background-color: #E6E6E6;
            border-radius: 14px;
            padding: 15px 40px;
            font-size: 13px;
            color: #414141;
            //color: var(--tg-theme-text-color);
            border: none;
            top: 12px;
            width: 50px;

            &>span {
                margin-left: auto;
                margin-right: auto;
                display: block;
                width: 9px;
                color: #414141;
                //color: var(--tg-theme-text-color);
            }

            &>button {
                border: none;
                height: 47px;
                position: absolute;
                right: 0;
                top: 0;
                font-size: 25px;
                width: 47px;
                border-radius: 14px;
                color: #414141;
                //color: var(--tg-theme-text-color);

                &:first-child {
                    left: 0;
                }
            }
        }

        &>span {
            font-weight: 500;
            font-size: 1.4rem;
            line-height: 45px;
        }

        &>button {
            position: absolute;
            right: 1rem;
            background-color: #E6E6E6;
            border-radius: 14px;
            color: #414141;
            color: var(--tg-theme-text-color);
            padding: 15px 40px;
            font-size: 13px;
            border: none;
        }
    }
}

.backside {
    &>div {
        margin-top: 0.5rem;

        &>span {
            line-height: 30px;
        }
    }

    button {
        position: absolute;
        right: 130px;
        background-color: #E6E6E6;
        border-radius: 10px;
        padding: 10px 30px;
        font-size: 15px;
        border: none;
        color: #414141 !important;
        color: var(--tg-theme-text-color) !important;

        &:last-of-type {
            right: 1rem;
        }
    }

}

hr {
    height: 1px;
    display: block;
    background: rgba(192, 192, 192, 0.363);
    width: 100%;
    border: none;
}
</style>
  
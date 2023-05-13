<template>
    <h1>{{ mainside_id ? "Обратная сторона" : "Каталог" }}</h1>
    <searchBlock />
    <InstagramLoader class="preloader hidden" ref="preloader" viewBox="0 0 300 250"></InstagramLoader>
    <InstagramLoader class="preloader hidden" ref="preloader" viewBox="0 0 300 200"></InstagramLoader>
    <InstagramLoader class="preloader hidden" ref="preloader" viewBox="0 0 300 200"></InstagramLoader>

    <div class="results-block">
        <div class="result-item" v-for="item, index in $store.state.results ?? []">
            <router-link
                :to="`/items/${item.id}?mainside_id=${mainside_id}&size=${this.backFilters.size}&material=${this.backFilters.material}`">
                <div class="img-container">
                    <img :src="`/pics/${getPreviewLink(item.image_list?.[0])}`"
                        :onerror="`javascript:this.onerror=null;this.src='/pics/${item.image_list?.[0]}';`" />
                </div>
                <div class="text-container">
                    <h2>{{ item.title }}</h2>
                    <h3 hidden>От {{ getMinPrice(item.options_array) }} ₽</h3>

                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
import searchBlock from '@/components/Search.vue';
import eventBus from '../eventBus'
import { ListLoader, InstagramLoader } from 'vue-content-loader'
/*<button @click="routeToBasket">Корзина</button>
<div class="favorite-toggle" :class="item.is_favorite ? 'favorite-item' : ''">
                    <img :src="require('@/assets/img/fav.svg')" />
                </div> */

export default {
    components: { searchBlock, InstagramLoader },
    data() {
        return {
            page: 1,
            perPage: 10,
            backFilters: {}
        }

    },
    watch: {
        "$store.state.searchQuery": async function () {
            await this.updatePage(300)

        },
        "$store.state.filters": async function () {
            await this.updatePage(300)
            console.log(11212, this.$store.state.filters)
        },
        async $route(to, from) {
            //await this.toggleButtons()
        }
    },
    async beforeMount() {
        const forward = this.$router.options.history.state.forward?.substring(1, 2)
        const elements = document.getElementsByClassName('preloader')
        let uri = window.location.search.substring(1);
        this.params = new URLSearchParams(uri)
        this.backFilters = { size: this.params.get('size'), material: this.params.get('material') }
        this.mainside_id = this.params.get('mainside_id') === "null" ? null : this.params.get('mainside_id')

        this.$store.state.userId = this.$store.state.userId ?? this.$route.params?.userId;

        if ((forward === 'i' || forward === 'b') && this.$store.state.results?.length > 0 && !this.mainside_id) {
            console.log(this.$store.state.results, elements)

            for (let el of elements) {
                el.classList.add("hidden")
            }
            this.$refs['results-block']?.classList.remove("hidden")
            this.page = this.$store.state.page ?? 0
            document.body.classList.remove('stop-scrolling')
            window.scrollTo(0, this.$store.state.scrollTopResults ?? 0);

        } else {
            for (let el of elements) {
                el.classList.remove("hidden")
            }
            this.$store.state.results = []
            this.$store.state.scrollTopResults = 0;

        }
        this.bodyWidth = document.body.clientHeight
        this.scroll()
        window.Telegram?.WebApp.BackButton.onClick(this.routeBack);
        window.Telegram?.WebApp.BackButton.show();


        if (await this.haveBasketItems()) {
            window.Telegram?.WebApp.MainButton.onClick(this.routeToBasket);
            window.Telegram?.WebApp.MainButton.show();
            window.Telegram?.WebApp.MainButton.setText("Корзина");
        } else {
            window.Telegram?.WebApp.MainButton.offClick(this.routeToBasket);
            window.Telegram?.WebApp.MainButton.hide();
        }

    },
    async mounted() {
        window.scrollTo(0, this.$store.state.scrollTopResults ?? 0);
        const elements = document.getElementsByClassName('preloader')
        const forward = this.$router.options.history.state.forward?.substring(1, 2)

        if ((forward === 'i' || forward === 'b') && this.$store.state.results?.length > 0 && !this.mainside_id) { } else {
            for (let el of elements) {
                el.classList.remove("hidden")
            }
        }



    },
    async beforeUnmount() {
        window.Telegram?.WebApp.MainButton.offClick(this.routeToBasket);
        window.Telegram?.WebApp.MainButton.hide();
        window.Telegram?.WebApp.BackButton.offClick(this.routeBack);
        window.Telegram?.WebApp.BackButton.hide();
        this.$store.state.scrollTopResults = window.scrollY
        this.$store.state.page = this.page
    },
    methods: {
        routeToBasket() {
            this.$router.push("/basket")
        },
        routeBack() {
            this.$router.go(-1)
        },
        getMinPrice(options_array) {
            return Math.min(...(options_array?.map(el => el.price) ?? [0]))
        },
        async haveBasketItems() {
            const results = await this.$store.state.myApi.get(this.$store.state.restAddr + '/basket_data', {
                params: {
                    user_id: this.$store.state.userId,
                }
            })
                .then(response => {
                    return response.data.individual_text || response.data.favorites.length
                })
                .catch(e => { eventBus.$emit('noresponse', e) })

            return results

        },
        async updatePage(delay) {
            console.log(123)
            this.loadingUpdate = true;
            this.$store.state.results = await this.sendSearchRequest(true);

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

            }, delay)
        },
        scroll() {
            window.onscroll = async (e) => {
                if (window.scrollY === 0) return;
                let bottomwindow = window.scrollY + window.innerHeight + 2000 > document.documentElement.scrollHeight;

                if (bottomwindow && !this.loadingUpdate && !this.isEnded) {
                    this.loadingUpdate = true;
                    const update = await this.sendSearchRequest();
                    this.$store.state.results = [...this.$store.state.results, ...update];
                }
            };
        },
        async sendSearchRequest(isReload) {
            if (isReload) {
                this.isEnded = false
                this.page = 1
            }
            const subPath = '/items'

            const results = await this.$store.state.myApi.get(this.$store.state.restAddr + subPath, {
                params: {
                    searchQuery: this.$store.state.searchQuery,
                    take: 30,
                    page: this.page ?? 1,
                    sort: this.$store.state.filters.sort_type,
                    category: this.$store.state.filters.category_name,
                    user_id: this.$store.state.userId,
                    size: this.backFilters?.size,
                    is_backside: this.backFilters?.size ? true : false,
                    material: this.backFilters?.material
                }
            })
                .then(response => {
                    const newsUpd = response.data;

                    if (newsUpd.length < (this.perPage)) this.isEnded = true;
                    else this.page++;

                    this.loadingUpdate = false;


                    return newsUpd;
                })
                .catch(e => { eventBus.$emit('noresponse', e) })

            console.log(results)

            return results

        },
        getPreviewLink(link) {
            const parts = link.match(/\.([^.]+)$|$/)
            if (!parts?.[1]) return;
            return link?.split('.').slice(0, -1).join('.') + '_preview.' + parts[1]

        }
    }
}
</script>
  

<style lang="scss">
.results-block {
    display: flex;
    gap: 12px;
    width: calc(100% - 2rem);
    margin: 1rem;
    padding: 0;
    list-style: none;
    flex-wrap: wrap;

    .masonry-column {
        flex: 1 1 calc((100% / 3) - 2rem) !important;
    }


    .result-item {
        width: 100%;
        height: fit-content; //calc(70vw - 1.5rem);
        //margin: 1rem;
        //margin-bottom: 0;
        margin: 0;
        // flex: 1 1 calc((100% / 3) - 2rem) !important;
        flex: 0 0 calc(33% - 7.2px) !important;

        border-radius: 1rem;
        display: block;
        background-color: transparent;
        // border: 1px solid rgb(169, 169, 169);
        box-shadow: 0px 1px 5px rgb(216, 216, 216);
        overflow: hidden;
        position: relative;

        &:nth-child(4n) {
            // margin-top: -6vw
        }

        &:nth-child(4n+1),
        &:nth-child(4n) {
            .img-container {
                //height: 40vw;
            }
        }

        .img-container {
            //position: absolute;
            background-color: #414141;
            width: 100%;
            height: calc(32vw - 1rem);
            overflow: hidden;
        }



        a {
            display: block;
            text-decoration: none;
            //position: absolute;
            height: calc(140% + 2rem);
            width: calc(100%);

            //margin: 1rem;
            .text-container {
                padding: 0.7rem;
                //position: absolute;
                top: 70%;
                width: calc(100% - 1.4rem);

            }

            h2 {
                margin: 0;
                width: 100%;
                color: #414141;
                color: var(--tg-theme-text-color);
                font-weight: 400;
                font-size: 3.8vw;
                //word-wrap: break-word;
                text-align: center;
            }

            h3 {
                margin: 5px 0 -5px 0;
                color: #414141;
                color: var(--tg-theme-text-color);
                font-weight: 200;
                font-size: 1rem;
            }

            img {
                object-fit: cover;
                width: 100%;
                height: 100%;
            }
        }

        &:nth-child(2n-1) {
            //margin-right: 0.5rem;
        }

        &:nth-child(2n) {
            //margin-left: 0.5rem;
        }

        .favorite-toggle {
            content: '';
            width: 40px;
            height: 40px;
            border-radius: 13px;
            background-color: transparent;
            border: 1px solid;
            background-color: #6e6e6e;
            border-color: #6e6e6e;
            opacity: 0;
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            transition: all 0.2s;

            img {
                height: 50%;
                margin: 25%;
            }

            &.favorite-item {
                opacity: 1;
                z-index: 1;
                border-color: rgb(197, 80, 105);
                background-color: rgb(197, 80, 105);
            }

        }
    }
}
</style>
  
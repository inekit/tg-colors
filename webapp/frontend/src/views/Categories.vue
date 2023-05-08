<template>
    <h1>Категории</h1>
    <InstagramLoader class="preloader" ref="preloader" viewBox="0 0 300 250"></InstagramLoader>
    <InstagramLoader class="preloader" ref="preloader" viewBox="0 0 300 200"></InstagramLoader>
    <InstagramLoader class="preloader" ref="preloader" viewBox="0 0 300 200"></InstagramLoader>
    <MasonryWall class="categories-block" :items="$store.state.categories ?? []" :ssr-columns="2"
        :column-width="bodyWidth / 3" :gap="12">
        <template #default="{ item, index }">
            <div class="result-item">
                <router-link :to="`/results/${$store.state.userId}?category=${item.name}`">
                    <div class="img-container">
                        <img :src="`/pics/${getPreviewLink(item.preview)}`"
                            :onerror="`javascript:this.onerror=null;this.src='/pics/${item.preview}';`" />
                    </div>
                    <div class="text-container">
                        <h2>{{ item.name }}</h2>
                    </div>
                </router-link>
            </div>
        </template>
    </MasonryWall>
</template>

<script>
import searchBlock from '@/components/Search.vue';
import eventBus from '../eventBus'
import { ListLoader, InstagramLoader } from 'vue-content-loader'


export default {
    components: { searchBlock, InstagramLoader },
    data() {
        return {
        }
    },
    watch: {
    },
    beforeMount() {
        this.bodyWidth = document.body.clientWidth

    },
    async mounted() {
        window.Telegram?.WebApp.BackButton.hide()
        window.Telegram?.WebApp.expand()

        let uri = window.location.search.substring(1);
        this.params = new URLSearchParams(uri)
        this.backFilters = { size: this.params.get('size'), material: this.params.get('material') }
        this.mainside_id = this.params.get('mainside_id') === "null" ? null : this.params.get('mainside_id')

        this.$store.state.userId = this.$route.params?.userId;

        this.updatePage(300);

        //window.Telegram?.WebApp.onEvent('viewportChanged', () => window.Telegram?.WebApp.expand())
        window.Telegram?.WebApp.enableClosingConfirmation()

        if (await this.haveBasketItems()) {
            window.Telegram?.WebApp.MainButton.onClick(this.routeToBasket);
            window.Telegram?.WebApp.MainButton.show();
            window.Telegram?.WebApp.MainButton.setText("Корзина");
        } else {
            window.Telegram?.WebApp.MainButton.offClick(this.routeToBasket);
            window.Telegram?.WebApp.MainButton.hide();
        }
    },
    async beforeUnmount() {
        window.Telegram?.WebApp.MainButton.offClick(this.routeToBasket);
        window.Telegram?.WebApp.MainButton.hide();
    },
    methods: {
        routeToBasket() {
            this.$router.push("/basket")
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
            this.$store.state.categories = await this.getCategories(true);

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
        async getCategories() {
            const subPath = '/categories'

            const results = await this.$store.state.myApi.get(this.$store.state.restAddr + subPath, {
                params: {
                }
            })
                .then(response => {
                    return response.data;
                })
                .catch(e => { eventBus.$emit('noresponse', e) })

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
.categories-block {
    width: calc(100% - 2rem);
    margin: 1rem;
    padding: 0;
    list-style: none;
    flex-wrap: wrap;

    .masonry-column {
        flex: 1 1 calc((100% / 2) - 2rem) !important;
    }


    .result-item {
        width: 100%;
        height: fit-content;
        margin: 0;

        border-radius: 1rem;
        display: block;
        background-color: white;
        background-color: var(--tg-theme-bg-color);
        color: #414141;
        color: var(--tg-theme-text-color);
        box-shadow: 0px 1px 5px rgb(216, 216, 216);
        box-shadow: 0px 1px 5px var(--tg-theme-hint-color);

        overflow: hidden;
        position: relative;

        &:nth-child(4n) {
            margin-top: -6vw
        }

        &:nth-child(4n+1),
        &:nth-child(4n) {
            .img-container {
                height: 40vw;
            }
        }

        .img-container {
            background-color: #414141;
            background-color: var(--tg-theme-text-color);
            width: 100%;
            height: 30vw;
            position: relative;
            overflow: hidden;
        }

        a {
            display: block;
            text-decoration: none;
            height: calc(100% + 2rem);
            width: calc(100%);

            .text-container {
                padding: 1rem;
                top: 70%;
                width: calc(100% - 2rem);
            }

            h2 {
                margin: 0;
                width: 100%;
                color: #414141;
                color: var(--tg-theme-text-color);
                font-weight: 400;
                font-size: 1.1rem;
                text-align: center;
                word-wrap: break-word;
            }

            img {
                position: absolute;
                margin: auto;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                max-width: 200%;
                max-height: 130%;
                min-width: 100%;
                min-height: 100%;
                width: auto;
                height: auto;
            }
        }

        &:nth-child(2n-1) {
            margin-right: 0.5rem;
        }

        &:nth-child(2n) {
            margin-left: 0.5rem;
        }

    }
}
</style>
  
"use strict";(self["webpackChunk_coreui_coreui_free_vue_admin_template"]=self["webpackChunk_coreui_coreui_free_vue_admin_template"]||[]).push([[760],{784:function(e,t,s){s.r(t),s.d(t,{default:function(){return _}});var a=s(3396),r=s(7139);const i=(0,a._)("h1",null,"Категории",-1),o={class:"categories-block"},n={class:"result-item"},l={class:"img-container"},d=["src","onerror"],c={class:"text-container"};function u(e,t,s,u,m,p){const h=(0,a.up)("InstagramLoader"),w=(0,a.up)("router-link");return(0,a.wg)(),(0,a.iD)(a.HY,null,[i,(0,a.Wm)(h,{class:"preloader",ref:"preloader",viewBox:"0 0 300 250"},null,512),(0,a.Wm)(h,{class:"preloader",ref:"preloader",viewBox:"0 0 300 200"},null,512),(0,a.Wm)(h,{class:"preloader",ref:"preloader",viewBox:"0 0 300 200"},null,512),(0,a._)("div",o,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(e.$store.state.categories??[],((t,s)=>((0,a.wg)(),(0,a.iD)("div",n,[(0,a.Wm)(w,{to:`/results/${e.$store.state.userId}?category=${t.name}`},{default:(0,a.w5)((()=>[(0,a._)("div",l,[(0,a._)("img",{src:`/pics/${p.getPreviewLink(t.preview)}`,onerror:`javascript:this.onerror=null;this.src='/pics/${t.preview}';`},null,8,d)]),(0,a._)("div",c,[(0,a._)("h2",null,(0,r.zw)(t.name),1)])])),_:2},1032,["to"])])))),256))])],64)}s(7658);var m=s(5923),p=s(7123),h=s(3089),w={components:{searchBlock:m.Z,InstagramLoader:h.z9},data(){return{}},watch:{},beforeMount(){this.bodyWidth=document.body.clientWidth},async mounted(){window.Telegram?.WebApp.BackButton.hide(),window.Telegram?.WebApp.expand();let e=window.location.search.substring(1);this.params=new URLSearchParams(e),this.backFilters={size:this.params.get("size"),material:this.params.get("material")},this.mainside_id="null"===this.params.get("mainside_id")?null:this.params.get("mainside_id"),this.$store.state.userId=this.$route.params?.userId,this.updatePage(300),window.Telegram?.WebApp.enableClosingConfirmation(),await this.haveBasketItems()?(window.Telegram?.WebApp.MainButton.onClick(this.routeToBasket),window.Telegram?.WebApp.MainButton.show(),window.Telegram?.WebApp.MainButton.setText("Корзина")):(window.Telegram?.WebApp.MainButton.offClick(this.routeToBasket),window.Telegram?.WebApp.MainButton.hide())},async beforeUnmount(){window.Telegram?.WebApp.MainButton.offClick(this.routeToBasket),window.Telegram?.WebApp.MainButton.hide()},computed:{preloaderColor(){return window.Telegram?.WebApp?.ThemeParams?.hint_color}},methods:{routeToBasket(){this.$router.push("/basket")},async haveBasketItems(){const e=await this.$store.state.myApi.get(this.$store.state.restAddr+"/basket_data",{params:{user_id:this.$store.state.userId}}).then((e=>e.data.individual_text||e.data.favorites.length)).catch((e=>{p.Z.$emit("noresponse",e)}));return e},async updatePage(e){this.$store.state.categories=await this.getCategories(!0),this.$refs["results-block"]?.classList.add("hidden"),document.body.classList.add("stop-scrolling"),setTimeout((()=>{const e=document.getElementsByClassName("preloader");console.log(e);for(let t of e)t.classList.add("hidden");this.$refs["results-block"]?.classList.remove("hidden"),document.body.classList.remove("stop-scrolling")}),e)},async getCategories(){const e="/categories",t=await this.$store.state.myApi.get(this.$store.state.restAddr+e,{params:{}}).then((e=>e.data)).catch((e=>{p.Z.$emit("noresponse",e)}));return t},getPreviewLink(e){const t=e?.match(/\.([^.]+)$|$/);if(t?.[1])return e?.split(".").slice(0,-1).join(".")+"_preview."+t[1]}}},g=s(89);const b=(0,g.Z)(w,[["render",u]]);var _=b}}]);
//# sourceMappingURL=760.59852f89.js.map
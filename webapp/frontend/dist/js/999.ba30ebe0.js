"use strict";(self["webpackChunk_coreui_coreui_free_vue_admin_template"]=self["webpackChunk_coreui_coreui_free_vue_admin_template"]||[]).push([[999],{2963:function(e,t,s){s.r(t),s.d(t,{default:function(){return _}});var i=s(3396),a=s(7139);const r={class:"results-block"},o={class:"result-item"},n={class:"img-container"},l=["src","onerror"],c={class:"text-container"},d={hidden:""};function u(e,t,s,u,h,m){const p=(0,i.up)("searchBlock"),g=(0,i.up)("InstagramLoader"),w=(0,i.up)("router-link");return(0,i.wg)(),(0,i.iD)(i.HY,null,[(0,i._)("h1",null,(0,a.zw)(e.mainside_id?"Обратная сторона":"Каталог"),1),(0,i.Wm)(p),(0,i.Wm)(g,{class:"preloader",ref:"preloader",viewBox:"0 0 300 250"},null,512),(0,i.Wm)(g,{class:"preloader",ref:"preloader",viewBox:"0 0 300 200"},null,512),(0,i.Wm)(g,{class:"preloader",ref:"preloader",viewBox:"0 0 300 200"},null,512),(0,i._)("div",r,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(e.$store.state.results??[],((t,s)=>((0,i.wg)(),(0,i.iD)("div",o,[(0,i.Wm)(w,{to:`/items/${t.id}?mainside_id=${e.mainside_id}&size=${this.backFilters.size}&material=${this.backFilters.material}`},{default:(0,i.w5)((()=>[(0,i._)("div",n,[(0,i._)("img",{src:`/pics/${m.getPreviewLink(t.image_list?.[0])}`,onerror:`javascript:this.onerror=null;this.src='/pics/${t.image_list?.[0]}';`},null,8,l)]),(0,i._)("div",c,[(0,i._)("h2",null,(0,a.zw)(t.title),1),(0,i._)("h3",d,"От "+(0,a.zw)(m.getMinPrice(t.options_array))+" ₽",1)])])),_:2},1032,["to"])])))),256))])],64)}s(7658);var h=s(1947),m=s(7123),p=s(3089),g={components:{searchBlock:h.Z,InstagramLoader:p.z9},data(){return{page:1,perPage:10,backFilters:{}}},watch:{"$store.state.searchQuery":async function(){await this.updatePage(300)},"$store.state.filters":async function(){await this.updatePage(300)},async $route(e,t){}},async beforeMount(){console.log(this.$router.options.history),this.bodyWidth=document.body.clientHeight,this.scroll(),window.Telegram?.WebApp.BackButton.onClick(this.routeBack),window.Telegram?.WebApp.BackButton.show();let e=window.location.search.substring(1);this.params=new URLSearchParams(e),this.backFilters={size:this.params.get("size"),material:this.params.get("material")},this.mainside_id="null"===this.params.get("mainside_id")?null:this.params.get("mainside_id"),this.$store.state.userId=this.$store.state.userId??this.$route.params?.userId,await this.haveBasketItems()?(window.Telegram?.WebApp.MainButton.onClick(this.routeToBasket),window.Telegram?.WebApp.MainButton.show(),window.Telegram?.WebApp.MainButton.setText("Корзина")):(window.Telegram?.WebApp.MainButton.offClick(this.routeToBasket),window.Telegram?.WebApp.MainButton.hide())},async mounted(){},async beforeUnmount(){window.Telegram?.WebApp.MainButton.offClick(this.routeToBasket),window.Telegram?.WebApp.MainButton.hide(),window.Telegram?.WebApp.BackButton.offClick(this.routeBack),window.Telegram?.WebApp.BackButton.hide()},methods:{routeToBasket(){this.$router.push("/basket")},routeBack(){this.$router.go(-1)},getMinPrice(e){return Math.min(...e?.map((e=>e.price))??[0])},async haveBasketItems(){const e=await this.$store.state.myApi.get(this.$store.state.restAddr+"/basket_data",{params:{user_id:this.$store.state.userId}}).then((e=>e.data.individual_text||e.data.favorites.length)).catch((e=>{m.Z.$emit("noresponse",e)}));return e},async updatePage(e){this.$store.state.results=await this.sendSearchRequest(!0),this.$refs["results-block"]?.classList.add("hidden"),document.body.classList.add("stop-scrolling"),setTimeout((()=>{const e=document.getElementsByClassName("preloader");console.log(e);for(let t of e)t.classList.add("hidden");this.$refs["results-block"]?.classList.remove("hidden"),document.body.classList.remove("stop-scrolling")}),e)},scroll(){window.onscroll=async()=>{let e=window.scrollY+window.innerHeight+2e3>document.documentElement.scrollHeight;if(e&&!this.loadingUpdate&&!this.isEnded){this.loadingUpdate=!0;const e=await this.sendSearchRequest();this.$store.state.results=[...this.$store.state.results,...e]}}},async sendSearchRequest(e){e&&(this.isEnded=!1,this.page=1);const t="/items",s=await this.$store.state.myApi.get(this.$store.state.restAddr+t,{params:{searchQuery:this.$store.state.searchQuery,take:30,page:this.page??1,sort:this.$store.state.filters.sort_type,category:this.$store.state.filters.category_name,user_id:this.$store.state.userId,size:this.backFilters?.size,is_backside:!!this.backFilters?.size,material:this.backFilters?.material}}).then((e=>{const t=e.data;return t.length<this.perPage?this.isEnded=!0:this.page++,this.loadingUpdate=!1,t})).catch((e=>{m.Z.$emit("noresponse",e)}));return console.log(s),s},getPreviewLink(e){const t=e.match(/\.([^.]+)$|$/);if(t?.[1])return e?.split(".").slice(0,-1).join(".")+"_preview."+t[1]}}},w=s(89);const k=(0,w.Z)(g,[["render",u]]);var _=k}}]);
//# sourceMappingURL=999.ba30ebe0.js.map
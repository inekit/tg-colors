"use strict";(self["webpackChunk_coreui_coreui_free_vue_admin_template"]=self["webpackChunk_coreui_coreui_free_vue_admin_template"]||[]).push([[714],{3089:function(t,e,r){r.d(e,{z9:function(){return n}});var s=r(3396),i=function(){return Math.random().toString(36).substring(2)},a=(0,s.aZ)({name:"ContentLoader",props:{width:{type:[Number,String]},height:{type:[Number,String]},viewBox:{type:String},preserveAspectRatio:{type:String,default:"xMidYMid meet"},speed:{type:Number,default:2},baseUrl:{type:String,default:""},primaryColor:{type:String,default:"#f9f9f9"},secondaryColor:{type:String,default:"#ecebeb"},primaryOpacity:{type:Number,default:1},secondaryOpacity:{type:Number,default:1},uniqueKey:{type:String},animate:{type:Boolean,default:!0}},setup:function(t){var e=(0,s.Fl)((function(){return t.uniqueKey?"".concat(t.uniqueKey,"-idClip"):i()})),r=(0,s.Fl)((function(){return t.uniqueKey?"".concat(t.uniqueKey,"-idGradient"):i()})),a=(0,s.Fl)((function(){var e;return null!==(e=t.width)&&void 0!==e?e:400})),n=(0,s.Fl)((function(){var e;return null!==(e=t.height)&&void 0!==e?e:130})),o=(0,s.Fl)((function(){var e;return null!==(e=t.viewBox)&&void 0!==e?e:"0 0 ".concat(a.value," ").concat(n.value)}));return{idClip:e,idGradient:r,computedViewBox:o}},render:function(){return(0,s.Wm)("svg",{width:this.width,height:this.height,viewBox:this.computedViewBox,version:"1.1",preserveAspectRatio:this.preserveAspectRatio},[(0,s.Wm)("rect",{style:{fill:"url(".concat(this.baseUrl,"#").concat(this.idGradient,")")},"clip-path":"url(".concat(this.baseUrl,"#").concat(this.idClip,")"),x:"0",y:"0",width:"100%",height:"100%"},null),(0,s.Wm)("defs",null,[(0,s.Wm)("clipPath",{id:this.idClip},[this.$slots["default"]?this.$slots["default"]():(0,s.Wm)("rect",{x:"0",y:"0",rx:"5",ry:"5",width:"100%",height:"100%"},null)]),(0,s.Wm)("linearGradient",{id:this.idGradient},[(0,s.Wm)("stop",{offset:"0%","stop-color":this.primaryColor,"stop-opacity":this.primaryOpacity},[this.animate?(0,s.Wm)("animate",{attributeName:"offset",values:"-2; 1",dur:"".concat(this.speed,"s"),repeatCount:"indefinite"},null):null]),(0,s.Wm)("stop",{offset:"50%","stop-color":this.secondaryColor,"stop-opacity":this.secondaryOpacity},[this.animate?(0,s.Wm)("animate",{attributeName:"offset",values:"-1.5; 1.5",dur:"".concat(this.speed,"s"),repeatCount:"indefinite"},null):null]),(0,s.Wm)("stop",{offset:"100%","stop-color":this.primaryColor,"stop-opacity":this.primaryOpacity},[this.animate?(0,s.Wm)("animate",{attributeName:"offset",values:"-1; 2",dur:"".concat(this.speed,"s"),repeatCount:"indefinite"},null):null])])])])}}),n=((0,s.aZ)((function(t,e){var r=e.attrs;return function(){return(0,s.Wm)(a,r,{default:function(){return[(0,s.Wm)("circle",{cx:"10",cy:"20",r:"8"},null),(0,s.Wm)("rect",{x:"25",y:"15",rx:"5",ry:"5",width:"220",height:"10"},null),(0,s.Wm)("circle",{cx:"10",cy:"50",r:"8"},null),(0,s.Wm)("rect",{x:"25",y:"45",rx:"5",ry:"5",width:"220",height:"10"},null),(0,s.Wm)("circle",{cx:"10",cy:"80",r:"8"},null),(0,s.Wm)("rect",{x:"25",y:"75",rx:"5",ry:"5",width:"220",height:"10"},null),(0,s.Wm)("circle",{cx:"10",cy:"110",r:"8"},null),(0,s.Wm)("rect",{x:"25",y:"105",rx:"5",ry:"5",width:"220",height:"10"},null)]}})}})),(0,s.aZ)((function(t,e){var r=e.attrs;return function(){return(0,s.Wm)(a,r,{default:function(){return[(0,s.Wm)("rect",{x:"0",y:"0",rx:"3",ry:"3",width:"70",height:"10"},null),(0,s.Wm)("rect",{x:"80",y:"0",rx:"3",ry:"3",width:"100",height:"10"},null),(0,s.Wm)("rect",{x:"190",y:"0",rx:"3",ry:"3",width:"10",height:"10"},null),(0,s.Wm)("rect",{x:"15",y:"20",rx:"3",ry:"3",width:"130",height:"10"},null),(0,s.Wm)("rect",{x:"155",y:"20",rx:"3",ry:"3",width:"130",height:"10"},null),(0,s.Wm)("rect",{x:"15",y:"40",rx:"3",ry:"3",width:"90",height:"10"},null),(0,s.Wm)("rect",{x:"115",y:"40",rx:"3",ry:"3",width:"60",height:"10"},null),(0,s.Wm)("rect",{x:"185",y:"40",rx:"3",ry:"3",width:"60",height:"10"},null),(0,s.Wm)("rect",{x:"0",y:"60",rx:"3",ry:"3",width:"30",height:"10"},null)]}})}})),(0,s.aZ)((function(t,e){var r=e.attrs;return function(){return(0,s.Wm)(a,r,{default:function(){return[(0,s.Wm)("rect",{x:"70",y:"15",rx:"4",ry:"4",width:"117",height:"6.4"},null),(0,s.Wm)("rect",{x:"70",y:"35",rx:"3",ry:"3",width:"85",height:"6.4"},null),(0,s.Wm)("rect",{x:"0",y:"80",rx:"3",ry:"3",width:"350",height:"6.4"},null),(0,s.Wm)("rect",{x:"0",y:"100",rx:"3",ry:"3",width:"380",height:"6.4"},null),(0,s.Wm)("rect",{x:"0",y:"120",rx:"3",ry:"3",width:"201",height:"6.4"},null),(0,s.Wm)("circle",{cx:"30",cy:"30",r:"30"},null)]}})}})),(0,s.aZ)((function(t,e){var r=e.attrs;return function(){return(0,s.Wm)(a,r,{default:function(){return[(0,s.Wm)("rect",{x:"0",y:"0",rx:"3",ry:"3",width:"250",height:"10"},null),(0,s.Wm)("rect",{x:"20",y:"20",rx:"3",ry:"3",width:"220",height:"10"},null),(0,s.Wm)("rect",{x:"20",y:"40",rx:"3",ry:"3",width:"170",height:"10"},null),(0,s.Wm)("rect",{x:"0",y:"60",rx:"3",ry:"3",width:"250",height:"10"},null),(0,s.Wm)("rect",{x:"20",y:"80",rx:"3",ry:"3",width:"200",height:"10"},null),(0,s.Wm)("rect",{x:"20",y:"100",rx:"3",ry:"3",width:"80",height:"10"},null)]}})}})),(0,s.aZ)((function(t,e){var r=e.attrs;return function(){return(0,s.Wm)(a,(0,s.dG)(r,{viewBox:"0 0 400 480"}),{default:function(){return[(0,s.Wm)("circle",{cx:"30",cy:"30",r:"30"},null),(0,s.Wm)("rect",{x:"75",y:"13",rx:"4",ry:"4",width:"100",height:"13"},null),(0,s.Wm)("rect",{x:"75",y:"37",rx:"4",ry:"4",width:"50",height:"8"},null),(0,s.Wm)("rect",{x:"0",y:"70",rx:"5",ry:"5",width:"400",height:"400"},null)]}})}})))},3337:function(t,e,r){r.d(e,{Z:function(){return k}});var s=r(3396),i=r(7139);const a={class:"search-block"},n=["value"],o=["src"],l=["src"],c={ref:"sort-list",class:"sort-list"},u=(0,s._)("span",null,"Сортировать по",-1),h=["for"],d=["id","checked","value"],m={ref:"categories-list",class:"categories-list"},g=(0,s._)("span",null,"Категория",-1),p=["checked"],y=(0,s._)("label",{for:"null-name"},"Все категории",-1),f=["id","checked","value","label"],w=["for"];function v(t,e,v,x,W,_){return(0,s.wg)(),(0,s.iD)("div",a,[(0,s._)("input",{type:"search",value:t.$store.state.searchQuery,onChange:e[0]||(e[0]=(...t)=>_.openResults&&_.openResults(...t)),placeholder:"Поиск.."},null,40,n),(0,s._)("div",{class:"sort",onClick:e[1]||(e[1]=(...t)=>_.toggleSort&&_.toggleSort(...t))},[(0,s._)("img",{src:r(8752)},null,8,o)]),(0,s._)("div",{class:"categories",onClick:e[2]||(e[2]=(...t)=>_.toggleCategories&&_.toggleCategories(...t))},[(0,s._)("img",{src:r(9001)},null,8,l)]),(0,s._)("div",c,[u,((0,s.wg)(),(0,s.iD)(s.HY,null,(0,s.Ko)({default:"По умолчанию",newing:"Новизна",ascending:"По возрастанию цены",descending:"По убыванию цены"},((r,a)=>(0,s._)("div",null,[(0,s._)("label",{for:a},(0,i.zw)(r),9,h),(0,s._)("input",{id:a,checked:a===t.$store.state.filters.sort_type,onClick:e[3]||(e[3]=(...t)=>_.changeSort&&_.changeSort(...t)),type:"radio",name:"project-name",value:a},null,8,d)]))),64))],512),(0,s._)("div",m,[g,(0,s._)("div",null,[(0,s._)("input",{id:"null-name",checked:!t.$store.state.filters.category_name,onClick:e[4]||(e[4]=(...t)=>_.changeCategory&&_.changeCategory(...t)),type:"radio",name:"project-name",value:""},null,8,p),y]),((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(W.categories,(r=>((0,s.wg)(),(0,s.iD)("div",{key:r.name},[(0,s._)("input",{id:r.name,checked:r.name===t.$store.state.filters.category_name,onChange:e[5]||(e[5]=(...t)=>_.changeCategory&&_.changeCategory(...t)),type:"radio",name:"project-name",value:r.name,label:r.name},null,40,f),(0,s._)("label",{for:r.name},(0,i.zw)(r.name),9,w)])))),128))],512),(0,s._)("div",{ref:"close-block",class:"close-block",onClick:e[6]||(e[6]=(...t)=>_.closeAll&&_.closeAll(...t))},null,512)])}r(7658);var x=r(7123),W={data(){return{categories:{}}},async beforeMount(){this.categories=await this.getCategories();let t=window.location.search.substring(1);this.params=new URLSearchParams(t),this.$store.state.filters={category_name:this.params.get("category"),sort_type:this.params.get("sort")??"default"}},methods:{search(t){this.$store.state.searchQuery=t.target.value},openResults(t){this.clickInput(),this.$store.state.searchQuery=t.target.value,"Filters"!==this.$route.name&&"Cities"!==this.$route.name||this.$router.push("/results/"+this.$route.params.city)},async getCategories(){return await this.$store.state.myApi.get(this.$store.state.restAddr+"/categories").then((t=>t.data)).catch((t=>{x.Z.$emit("noresponse",t)}))},toggleCategories(){this.$refs["categories-list"].classList.toggle("shown"),this.$refs["close-block"].classList.toggle("shown"),document.body.classList.toggle("h-100")},toggleSort(){this.$refs["sort-list"].classList.toggle("shown"),this.$refs["close-block"].classList.toggle("shown"),document.body.classList.toggle("h-100")},closeAll(){this.$refs["sort-list"].classList.remove("shown"),this.$refs["categories-list"].classList.remove("shown"),this.$refs["close-block"].classList.remove("shown")},changeSort(t){this.$store.state.filters={category_name:this.$store.state.filters.category_name,sort_type:t.target.value};const e=new URL(window.location);e.searchParams.set("sort",t.target.value),window.history.pushState({},"",e),this.toggleSort()},changeCategory(t){this.$store.state.filters={sort_type:this.$store.state.filters.sort_type,category_name:t.target.value};const e=new URL(window.location);e.searchParams.set("category",t.target.value),window.history.pushState({},"",e),this.toggleCategories()},clickInput(){document.activeElement.blur()}}},_=r(89);const b=(0,_.Z)(W,[["render",v]]);var k=b},4714:function(t,e,r){r.r(e),r.d(e,{default:function(){return f}});var s=r(3396),i=r(7139);const a={class:"result-item"},n={class:"img-container"},o=["src","onerror"],l={class:"text-container"},c={hidden:""};function u(t,e,r,u,h,d){const m=(0,s.up)("searchBlock"),g=(0,s.up)("InstagramLoader"),p=(0,s.up)("router-link"),y=(0,s.up)("MasonryWall");return(0,s.wg)(),(0,s.iD)(s.HY,null,[(0,s._)("h1",null,(0,i.zw)(t.mainside_id?"Обратная сторона":"Каталог"),1),(0,s.Wm)(m),(0,s.Wm)(g,{class:"preloader",ref:"preloader",viewBox:"0 0 300 250"},null,512),(0,s.Wm)(g,{class:"preloader",ref:"preloader",viewBox:"0 0 300 200"},null,512),(0,s.Wm)(g,{class:"preloader",ref:"preloader",viewBox:"0 0 300 200"},null,512),(0,s.Wm)(y,{class:"results-block",items:t.$store.state.results??[],"ssr-columns":3,"column-width":t.bodyWidth/9,gap:12},{default:(0,s.w5)((({item:e,index:r})=>[(0,s._)("div",a,[(0,s.Wm)(p,{to:`/items/${e.id}?mainside_id=${t.mainside_id}&size=${this.backFilters.size}&material=${this.backFilters.material}`},{default:(0,s.w5)((()=>[(0,s._)("div",n,[(0,s._)("img",{src:`/pics/${d.getPreviewLink(e.image_list?.[0])}`,onerror:`javascript:this.onerror=null;this.src='/pics/${e.image_list?.[0]}';`},null,8,o)]),(0,s._)("div",l,[(0,s._)("h2",null,(0,i.zw)(e.title),1),(0,s._)("h3",c,"От "+(0,i.zw)(d.getMinPrice(e.options_array))+" ₽",1)])])),_:2},1032,["to"])])])),_:1},8,["items","column-width"])],64)}r(7658);var h=r(3337),d=r(7123),m=r(3089),g={components:{searchBlock:h.Z,InstagramLoader:m.z9},data(){return{page:1,perPage:10,backFilters:{}}},watch:{"$store.state.searchQuery":async function(){await this.updatePage(300)},"$store.state.filters":async function(){await this.updatePage(300)},async $route(t,e){}},async beforeMount(){this.bodyWidth=document.body.clientHeight,this.scroll(),window.Telegram?.WebApp.BackButton.onClick(this.routeBack),window.Telegram?.WebApp.BackButton.show();let t=window.location.search.substring(1);this.params=new URLSearchParams(t),this.backFilters={size:this.params.get("size"),material:this.params.get("material")},this.mainside_id="null"===this.params.get("mainside_id")?null:this.params.get("mainside_id"),this.$store.state.userId=this.$store.state.userId??this.$route.params?.userId,await this.haveBasketItems()?(window.Telegram?.WebApp.MainButton.onClick(this.routeToBasket),window.Telegram?.WebApp.MainButton.show(),window.Telegram?.WebApp.MainButton.setText("Корзина")):(window.Telegram?.WebApp.MainButton.offClick(this.routeToBasket),window.Telegram?.WebApp.MainButton.hide())},async mounted(){},async beforeUnmount(){window.Telegram?.WebApp.MainButton.offClick(this.routeToBasket),window.Telegram?.WebApp.MainButton.hide(),window.Telegram?.WebApp.BackButton.offClick(this.routeBack),window.Telegram?.WebApp.BackButton.hide()},methods:{routeToBasket(){this.$router.push("/basket")},routeBack(){this.$router.go(-1)},getMinPrice(t){return Math.min(...t?.map((t=>t.price))??[0])},async haveBasketItems(){const t=await this.$store.state.myApi.get(this.$store.state.restAddr+"/basket_data",{params:{user_id:this.$store.state.userId}}).then((t=>t.data.individual_text||t.data.favorites.length)).catch((t=>{d.Z.$emit("noresponse",t)}));return t},async updatePage(t){this.$store.state.results=await this.sendSearchRequest(!0),this.$refs["results-block"]?.classList.add("hidden"),document.body.classList.add("stop-scrolling"),setTimeout((()=>{const t=document.getElementsByClassName("preloader");console.log(t);for(let e of t)e.classList.add("hidden");this.$refs["results-block"]?.classList.remove("hidden"),document.body.classList.remove("stop-scrolling")}),t)},scroll(){window.onscroll=async()=>{let t=window.scrollY+window.innerHeight+1e3>document.documentElement.scrollHeight;if(t&&!this.loadingUpdate&&!this.isEnded){this.loadingUpdate=!0;const t=await this.sendSearchRequest();this.$store.state.results=[...this.$store.state.results,...t]}}},async sendSearchRequest(t){t&&(this.isEnded=!1,this.page=1);const e="/items",r=await this.$store.state.myApi.get(this.$store.state.restAddr+e,{params:{searchQuery:this.$store.state.searchQuery,take:20,page:this.page??1,sort:this.$store.state.filters.sort_type,category:this.$store.state.filters.category_name,user_id:this.$store.state.userId,size:this.backFilters?.size,is_backside:!!this.backFilters?.size,material:this.backFilters?.material}}).then((t=>{const e=t.data;return e.length<this.perPage?this.isEnded=!0:this.page++,this.loadingUpdate=!1,e})).catch((t=>{d.Z.$emit("noresponse",t)}));return console.log(r),r},getPreviewLink(t){const e=t.match(/\.([^.]+)$|$/);if(e?.[1])return t?.split(".").slice(0,-1).join(".")+"_preview."+e[1]}}},p=r(89);const y=(0,p.Z)(g,[["render",u]]);var f=y},9001:function(t,e,r){t.exports=r.p+"img/categories.bbc4e0ea.svg"},8752:function(t,e,r){t.exports=r.p+"img/sort.f8248c7d.svg"}}]);
//# sourceMappingURL=714.e15da714.js.map
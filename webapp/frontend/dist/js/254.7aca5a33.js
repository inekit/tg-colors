"use strict";(self["webpackChunk_coreui_coreui_free_vue_admin_template"]=self["webpackChunk_coreui_coreui_free_vue_admin_template"]||[]).push([[254],{3089:function(t,e,r){r.d(e,{z9:function(){return n}});var i=r(3396),s=function(){return Math.random().toString(36).substring(2)},a=(0,i.aZ)({name:"ContentLoader",props:{width:{type:[Number,String]},height:{type:[Number,String]},viewBox:{type:String},preserveAspectRatio:{type:String,default:"xMidYMid meet"},speed:{type:Number,default:2},baseUrl:{type:String,default:""},primaryColor:{type:String,default:"#f9f9f9"},secondaryColor:{type:String,default:"#ecebeb"},primaryOpacity:{type:Number,default:1},secondaryOpacity:{type:Number,default:1},uniqueKey:{type:String},animate:{type:Boolean,default:!0}},setup:function(t){var e=(0,i.Fl)((function(){return t.uniqueKey?"".concat(t.uniqueKey,"-idClip"):s()})),r=(0,i.Fl)((function(){return t.uniqueKey?"".concat(t.uniqueKey,"-idGradient"):s()})),a=(0,i.Fl)((function(){var e;return null!==(e=t.width)&&void 0!==e?e:400})),n=(0,i.Fl)((function(){var e;return null!==(e=t.height)&&void 0!==e?e:130})),o=(0,i.Fl)((function(){var e;return null!==(e=t.viewBox)&&void 0!==e?e:"0 0 ".concat(a.value," ").concat(n.value)}));return{idClip:e,idGradient:r,computedViewBox:o}},render:function(){return(0,i.Wm)("svg",{width:this.width,height:this.height,viewBox:this.computedViewBox,version:"1.1",preserveAspectRatio:this.preserveAspectRatio},[(0,i.Wm)("rect",{style:{fill:"url(".concat(this.baseUrl,"#").concat(this.idGradient,")")},"clip-path":"url(".concat(this.baseUrl,"#").concat(this.idClip,")"),x:"0",y:"0",width:"100%",height:"100%"},null),(0,i.Wm)("defs",null,[(0,i.Wm)("clipPath",{id:this.idClip},[this.$slots["default"]?this.$slots["default"]():(0,i.Wm)("rect",{x:"0",y:"0",rx:"5",ry:"5",width:"100%",height:"100%"},null)]),(0,i.Wm)("linearGradient",{id:this.idGradient},[(0,i.Wm)("stop",{offset:"0%","stop-color":this.primaryColor,"stop-opacity":this.primaryOpacity},[this.animate?(0,i.Wm)("animate",{attributeName:"offset",values:"-2; 1",dur:"".concat(this.speed,"s"),repeatCount:"indefinite"},null):null]),(0,i.Wm)("stop",{offset:"50%","stop-color":this.secondaryColor,"stop-opacity":this.secondaryOpacity},[this.animate?(0,i.Wm)("animate",{attributeName:"offset",values:"-1.5; 1.5",dur:"".concat(this.speed,"s"),repeatCount:"indefinite"},null):null]),(0,i.Wm)("stop",{offset:"100%","stop-color":this.primaryColor,"stop-opacity":this.primaryOpacity},[this.animate?(0,i.Wm)("animate",{attributeName:"offset",values:"-1; 2",dur:"".concat(this.speed,"s"),repeatCount:"indefinite"},null):null])])])])}}),n=((0,i.aZ)((function(t,e){var r=e.attrs;return function(){return(0,i.Wm)(a,r,{default:function(){return[(0,i.Wm)("circle",{cx:"10",cy:"20",r:"8"},null),(0,i.Wm)("rect",{x:"25",y:"15",rx:"5",ry:"5",width:"220",height:"10"},null),(0,i.Wm)("circle",{cx:"10",cy:"50",r:"8"},null),(0,i.Wm)("rect",{x:"25",y:"45",rx:"5",ry:"5",width:"220",height:"10"},null),(0,i.Wm)("circle",{cx:"10",cy:"80",r:"8"},null),(0,i.Wm)("rect",{x:"25",y:"75",rx:"5",ry:"5",width:"220",height:"10"},null),(0,i.Wm)("circle",{cx:"10",cy:"110",r:"8"},null),(0,i.Wm)("rect",{x:"25",y:"105",rx:"5",ry:"5",width:"220",height:"10"},null)]}})}})),(0,i.aZ)((function(t,e){var r=e.attrs;return function(){return(0,i.Wm)(a,r,{default:function(){return[(0,i.Wm)("rect",{x:"0",y:"0",rx:"3",ry:"3",width:"70",height:"10"},null),(0,i.Wm)("rect",{x:"80",y:"0",rx:"3",ry:"3",width:"100",height:"10"},null),(0,i.Wm)("rect",{x:"190",y:"0",rx:"3",ry:"3",width:"10",height:"10"},null),(0,i.Wm)("rect",{x:"15",y:"20",rx:"3",ry:"3",width:"130",height:"10"},null),(0,i.Wm)("rect",{x:"155",y:"20",rx:"3",ry:"3",width:"130",height:"10"},null),(0,i.Wm)("rect",{x:"15",y:"40",rx:"3",ry:"3",width:"90",height:"10"},null),(0,i.Wm)("rect",{x:"115",y:"40",rx:"3",ry:"3",width:"60",height:"10"},null),(0,i.Wm)("rect",{x:"185",y:"40",rx:"3",ry:"3",width:"60",height:"10"},null),(0,i.Wm)("rect",{x:"0",y:"60",rx:"3",ry:"3",width:"30",height:"10"},null)]}})}})),(0,i.aZ)((function(t,e){var r=e.attrs;return function(){return(0,i.Wm)(a,r,{default:function(){return[(0,i.Wm)("rect",{x:"70",y:"15",rx:"4",ry:"4",width:"117",height:"6.4"},null),(0,i.Wm)("rect",{x:"70",y:"35",rx:"3",ry:"3",width:"85",height:"6.4"},null),(0,i.Wm)("rect",{x:"0",y:"80",rx:"3",ry:"3",width:"350",height:"6.4"},null),(0,i.Wm)("rect",{x:"0",y:"100",rx:"3",ry:"3",width:"380",height:"6.4"},null),(0,i.Wm)("rect",{x:"0",y:"120",rx:"3",ry:"3",width:"201",height:"6.4"},null),(0,i.Wm)("circle",{cx:"30",cy:"30",r:"30"},null)]}})}})),(0,i.aZ)((function(t,e){var r=e.attrs;return function(){return(0,i.Wm)(a,r,{default:function(){return[(0,i.Wm)("rect",{x:"0",y:"0",rx:"3",ry:"3",width:"250",height:"10"},null),(0,i.Wm)("rect",{x:"20",y:"20",rx:"3",ry:"3",width:"220",height:"10"},null),(0,i.Wm)("rect",{x:"20",y:"40",rx:"3",ry:"3",width:"170",height:"10"},null),(0,i.Wm)("rect",{x:"0",y:"60",rx:"3",ry:"3",width:"250",height:"10"},null),(0,i.Wm)("rect",{x:"20",y:"80",rx:"3",ry:"3",width:"200",height:"10"},null),(0,i.Wm)("rect",{x:"20",y:"100",rx:"3",ry:"3",width:"80",height:"10"},null)]}})}})),(0,i.aZ)((function(t,e){var r=e.attrs;return function(){return(0,i.Wm)(a,(0,i.dG)(r,{viewBox:"0 0 400 480"}),{default:function(){return[(0,i.Wm)("circle",{cx:"30",cy:"30",r:"30"},null),(0,i.Wm)("rect",{x:"75",y:"13",rx:"4",ry:"4",width:"100",height:"13"},null),(0,i.Wm)("rect",{x:"75",y:"37",rx:"4",ry:"4",width:"50",height:"8"},null),(0,i.Wm)("rect",{x:"0",y:"70",rx:"5",ry:"5",width:"400",height:"400"},null)]}})}})))},400:function(t,e,r){r.d(e,{Z:function(){return k}});var i=r(3396),s=r(7139);const a={class:"search-block"},n=["value"],o=["src"],l=["src"],c={ref:"sort-list",class:"sort-list"},u=(0,i._)("span",null,"Сортировать по",-1),h=["for"],d=["id","checked","value"],m={ref:"categories-list",class:"categories-list"},p=(0,i._)("span",null,"Категория",-1),g=["checked"],y=(0,i._)("label",{for:"null-name"},"Все категории",-1),w=["id","checked","value","label"],f=["for"];function v(t,e,v,x,W,b){return(0,i.wg)(),(0,i.iD)("div",a,[(0,i._)("input",{type:"search",value:t.$store.state.searchQuery,onChange:e[0]||(e[0]=(...t)=>b.openResults&&b.openResults(...t)),placeholder:"Поиск.."},null,40,n),(0,i._)("div",{class:"sort",onClick:e[1]||(e[1]=(...t)=>b.toggleSort&&b.toggleSort(...t))},[(0,i._)("img",{src:r(8752)},null,8,o)]),(0,i._)("div",{class:"categories",onClick:e[2]||(e[2]=(...t)=>b.toggleCategories&&b.toggleCategories(...t))},[(0,i._)("img",{src:r(9001)},null,8,l)]),(0,i._)("div",c,[u,((0,i.wg)(),(0,i.iD)(i.HY,null,(0,i.Ko)({newing:"Новизна",ascending:"По возрастанию",descending:"По убыванию"},((r,a)=>(0,i._)("div",null,[(0,i._)("label",{for:a},(0,s.zw)(r),9,h),(0,i._)("input",{id:a,checked:a===t.$store.state.filters.sort_type,onClick:e[3]||(e[3]=(...t)=>b.changeSort&&b.changeSort(...t)),type:"radio",name:"project-name",value:a},null,8,d)]))),64))],512),(0,i._)("div",m,[p,(0,i._)("div",null,[(0,i._)("input",{id:"null-name",checked:!t.$store.state.filters.category_name,onClick:e[4]||(e[4]=(...t)=>b.changeCategory&&b.changeCategory(...t)),type:"radio",name:"project-name",value:""},null,8,g),y]),((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(W.categories,(r=>((0,i.wg)(),(0,i.iD)("div",{key:r.name},[(0,i._)("input",{id:r.name,checked:r.name===t.$store.state.filters.category_name,onChange:e[5]||(e[5]=(...t)=>b.changeCategory&&b.changeCategory(...t)),type:"radio",name:"project-name",value:r.name,label:r.name},null,40,w),(0,i._)("label",{for:r.name},(0,s.zw)(r.name),9,f)])))),128))],512)])}r(7658);var x=r(7123),W={data(){return{categories:{}}},async beforeMount(){this.categories=await this.getCategories();let t=window.location.search.substring(1);this.params=new URLSearchParams(t),this.$store.state.filters={category_name:this.params.get("category"),sort_type:this.params.get("sort")??"newing"}},methods:{search(t){this.$store.state.searchQuery=t.target.value},openResults(t){this.clickInput(),this.$store.state.searchQuery=t.target.value,"Filters"!==this.$route.name&&"Cities"!==this.$route.name||this.$router.push("/results/"+this.$route.params.city)},async getCategories(){return await this.$store.state.myApi.get(this.$store.state.restAddr+"/categories").then((t=>t.data)).catch((t=>{x.Z.$emit("noresponse",t)}))},toggleCategories(){this.$refs["categories-list"].classList.toggle("shown")},toggleSort(){this.$refs["sort-list"].classList.toggle("shown")},changeSort(t){this.$store.state.filters={category_name:this.$store.state.filters.category_name,sort_type:t.target.value};const e=new URL(window.location);e.searchParams.set("sort",t.target.value),window.history.pushState({},"",e),this.toggleSort()},changeCategory(t){this.$store.state.filters={sort_type:this.$store.state.filters.sort_type,category_name:t.target.value};const e=new URL(window.location);e.searchParams.set("category",t.target.value),window.history.pushState({},"",e),this.toggleCategories()},clickInput(){document.activeElement.blur()}}},b=r(89);const _=(0,b.Z)(W,[["render",v]]);var k=_},8254:function(t,e,r){r.r(e),r.d(e,{default:function(){return B}});var i=r(3396),s=r(7139);const a=t=>((0,i.dD)("data-v-7321726c"),t=t(),(0,i.Cn)(),t),n=a((()=>(0,i._)("h1",null,"Корзина",-1))),o={class:"basket-items"},l={class:"img-container"},c=["src"],u={class:"title"},h={class:"count-select"},d=["onClick"],m=["onClick"],p={class:"size"},g={class:"material"},y={class:"price"},w={class:"order"},f=a((()=>(0,i._)("span",{class:"label"},"Итого:",-1))),v={class:"value"};function x(t,e,r,a,x,W){const b=(0,i.up)("InstagramLoader");return(0,i.wg)(),(0,i.iD)(i.HY,null,[n,(0,i.Wm)(b,{class:"preloader",ref:"preloader",viewBox:"0 0 300 250"},null,512),(0,i.Wm)(b,{class:"preloader",ref:"preloader",viewBox:"0 0 300 200"},null,512),(0,i.Wm)(b,{class:"preloader",ref:"preloader",viewBox:"0 0 300 200"},null,512),x.basketItems.length>0?((0,i.wg)(),(0,i.iD)("button",{key:0,class:"",onClick:e[0]||(e[0]=(...t)=>W.order&&W.order(...t))},"Оформить заказ")):(0,i.kq)("",!0),(0,i._)("div",o,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(x.basketItems,((t,e)=>((0,i.wg)(),(0,i.iD)("div",{class:"basket-item",key:e},[(0,i._)("div",l,[(0,i._)("img",{src:`/colorsserver/public/pics/${t.image_list?.[0]}`},null,8,c)]),(0,i._)("span",u,(0,s.zw)(t.title),1),(0,i._)("div",h,[(0,i._)("button",{type:"button",onClick:e=>W.changeCount(t.id,t.count-1)},"-",8,d),(0,i._)("span",null,(0,s.zw)(t.count),1),(0,i._)("button",{type:"button",onClick:e=>W.changeCount(t.id,t.count+1)},"+",8,m)]),(0,i._)("span",p," Размер "+(0,s.zw)(t.size),1),(0,i._)("span",g," Материал "+(0,s.zw)(t.material),1),(0,i._)("span",y,(0,s.zw)(t.price)+" ₽ ",1)])))),128))]),(0,i._)("div",w,[f,(0,i._)("span",v,(0,s.zw)(x.basketItems?.reduce(((t,e)=>t+e.price),0))+" ₽",1)])],64)}r(7658);var W=r(400),b=r(7123),_=r(3089),k={components:{searchBlock:W.Z,InstagramLoader:_.z9},data(){return{basketItems:[]}},watch:{},async mounted(){window.Telegram?.WebApp.MainButton.hide(),window.Telegram?.WebApp.MainButton.disable(),window.Telegram?.WebApp.BackButton.onClick(this.routeBack),window.Telegram?.WebApp.BackButton.show(),this.basketItems=await this.getBasket(),this.$refs["basket-items"]?.classList.add("hidden"),document.body.classList.add("stop-scrolling"),setTimeout((()=>{const t=document.getElementsByClassName("preloader");console.log(t);for(let e of t)e.classList.add("hidden");this.$refs["basket-items"]?.classList.remove("hidden"),document.body.classList.remove("stop-scrolling")}),300),this.basketItems?.length?(window.Telegram?.WebApp.MainButton.onClick(this.order),window.Telegram?.WebApp.MainButton.enable(),window.Telegram?.WebApp.MainButton.show(),window.Telegram?.WebApp.MainButton.setText("Оформить заказ")):(window.Telegram?.WebApp.MainButton.offClick(this.order),window.Telegram?.WebApp.MainButton.hide())},async beforeUnmount(){window.Telegram?.WebApp.MainButton.offClick(this.order),window.Telegram?.WebApp.MainButton.hide(),window.Telegram?.WebApp.BackButton.offClick(this.routeBack),window.Telegram?.WebApp.BackButton.hide()},methods:{changeCount(t,e){e>100||this.$store.state.myApi.put(this.$store.state.restAddr+"/favorites",{user_id:this.$store.state.userId,item_option_id:t,count:e}).then((async t=>{this.basketItems=await this.getBasket()})).catch((t=>{b.Z.$emit("noresponse",t)}))},dropItem(t){this.$store.state.myApi.delete(this.$store.state.restAddr+"/favorites",{data:{user_id:this.$store.state.userId,item_option_id:t}}).then((async t=>{this.basketItems=await this.getBasket()})).catch((t=>{b.Z.$emit("noresponse",t)}))},order(){this.$router.push("/basket")},routeBack(){this.$router.go(-1)},async finishWindow(){if(!this.$store.state.userId)return alert("Ваша версия телеграм не поддерживается");await this.getFiles().catch(console.log),window.Telegram?.WebApp.disableClosingConfirmation(),window.Telegram?.WebApp.close()},async getBasket(){const t=await this.$store.state.myApi.get(this.$store.state.restAddr+"/favorites",{params:{user_id:this.$store.state.userId}}).then((t=>t.data)).catch((t=>{b.Z.$emit("noresponse",t)}));return t}}},C=r(89);const $=(0,C.Z)(k,[["render",x],["__scopeId","data-v-7321726c"]]);var B=$},9001:function(t,e,r){t.exports=r.p+"img/categories.bbc4e0ea.svg"},8752:function(t,e,r){t.exports=r.p+"img/sort.f8248c7d.svg"}}]);
//# sourceMappingURL=254.7aca5a33.js.map
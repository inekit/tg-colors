"use strict";(self["webpackChunk_coreui_coreui_free_vue_admin_template"]=self["webpackChunk_coreui_coreui_free_vue_admin_template"]||[]).push([[499],{7552:function(e,t,r){r.d(t,{Z:function(){return c}});var l=r(3396);const s={class:"search-block"},a=["value"];function i(e,t,r,i,n,u){return(0,l.wg)(),(0,l.iD)("div",s,[(0,l._)("input",{type:"search",value:e.$store.state.searchQuery,onInput:t[0]||(t[0]=(...e)=>u.search&&u.search(...e)),onChange:t[1]||(t[1]=(...e)=>u.openResults&&u.openResults(...e)),placeholder:"Поиск.."},null,40,a)])}r(7658);var n={data(){return{}},mounted(){},methods:{search(e){this.$store.state.searchQuery=e.target.value},openResults(e){"Filters"===this.$route.name&&this.$router.push("/results")}}},u=r(89);const o=(0,u.Z)(n,[["render",i]]);var c=o},499:function(e,t,r){r.r(t),r.d(t,{default:function(){return h}});var l=r(3396),s=r(7139);const a=(0,l._)("h1",null,"Каталог",-1),i={key:0,class:"filters-block"},n=["src"],u={key:1,class:"filters-block"},o=["src"],c={key:2,class:"filters-block"};function m(e,t,r,m,p,w){const f=(0,l.up)("searchBlock"),g=(0,l.up)("router-link");return(0,l.wg)(),(0,l.iD)(l.HY,null,[a,(0,l.Wm)(f),"city"===e.$route.params.city?((0,l.wg)(),(0,l.iD)("ul",i,[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(e.cities,(e=>((0,l.wg)(),(0,l.iD)("li",{class:"filter-link",key:e.name},[(0,l.Wm)(g,{to:`/filters/${e.name}/filters`},{default:(0,l.w5)((()=>[(0,l._)("img",{src:e.img},null,8,n),(0,l._)("h2",null,(0,s.zw)(e.name),1)])),_:2},1032,["to"])])))),128))])):(0,l.kq)("",!0),"filters"===e.$route.params.page?((0,l.wg)(),(0,l.iD)("ul",u,[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(e.$store.state.filters,(t=>((0,l.wg)(),(0,l.iD)("li",{class:"filter-link",key:t.title},[(0,l.Wm)(g,{to:`/filters/${e.$route.params.city}/`+t.id},{default:(0,l.w5)((()=>[(0,l._)("img",{src:t.img},null,8,o),(0,l._)("h2",null,(0,s.zw)(t.title),1)])),_:2},1032,["to"])])))),128))])):(0,l.kq)("",!0),["filters","city"].includes(e.$route.params.page)?(0,l.kq)("",!0):((0,l.wg)(),(0,l.iD)("ul",c,[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(e.$store.state.filters.find((t=>t.id==e.$route.params.page))?.values,(t=>((0,l.wg)(),(0,l.iD)("li",{class:"filter-link",key:t},[(0,l.Wm)(g,{to:"/results/"+e.$route.params.city+"/"+e.$route.params.page+"/"+(t.max??t.name??t)},{default:(0,l.w5)((()=>[(0,l._)("h2",null,(0,s.zw)(t.name??(t.max||t.min?`${t.min} - ${t.max} ₽ за m²`:t)),1)])),_:2},1032,["to"])])))),128))]))],64)}var p=r(7552),w={components:{searchBlock:p.Z},data:()=>({cities:[{name:"Москва",img:""},{name:"Санкт-Петербург",img:""}]}),watch:{$route(e,t){window.Telegram?.WebApp.BackButton.show()}},mounted(){window.Telegram?.WebApp.expand(),window.Telegram?.WebApp.BackButton.onClick((()=>{this.$router.go(-1),window.Telegram?.WebApp.showAlert("Назад!")}))}},f=r(89);const g=(0,f.Z)(w,[["render",m]]);var h=g}}]);
//# sourceMappingURL=499.cf0e518b.js.map
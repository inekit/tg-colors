"use strict";(self["webpackChunk_coreui_coreui_free_vue_admin_template"]=self["webpackChunk_coreui_coreui_free_vue_admin_template"]||[]).push([[244],{8824:function(e,t,r){r.d(t,{Z:function(){return c}});var s=r(3396);const i={class:"search-block"},a=["value"];function l(e,t,r,l,u,n){return(0,s.wg)(),(0,s.iD)("div",i,[(0,s._)("input",{type:"search",value:e.$store.state.searchQuery,onChange:t[0]||(t[0]=(...e)=>n.openResults&&n.openResults(...e)),placeholder:"Поиск.."},null,40,a)])}r(7658);var u={data(){return{}},mounted(){},methods:{search(e){this.$store.state.searchQuery=e.target.value},openResults(e){this.clickInput(),this.$store.state.searchQuery=e.target.value,this.$router.push("/results/"+this.$route.params.city)},clickInput(){document.activeElement.blur()}}},n=r(89);const o=(0,n.Z)(u,[["render",l]]);var c=o},8244:function(e,t,r){r.r(t),r.d(t,{default:function(){return h}});var s=r(3396),i=r(7139);const a=(0,s._)("h1",null,"Каталог",-1),l={key:0,class:"filters-block"},u=["src"],n={key:1,class:"filters-block"},o=["src"],c={key:2,class:"filters-block"},m=["src"];function p(e,t,r,p,g,w){const f=(0,s.up)("searchBlock"),d=(0,s.up)("router-link");return(0,s.wg)(),(0,s.iD)(s.HY,null,[a,(0,s.Wm)(f),e.$route.params.id?((0,s.wg)(),(0,s.iD)("ul",l,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(e.cities,(e=>((0,s.wg)(),(0,s.iD)("li",{class:"filter-link",key:e.name},[(0,s.Wm)(d,{to:`/filters/${e.name}/filters`},{default:(0,s.w5)((()=>[(0,s._)("picture",null,[(0,s._)("img",{src:e.img},null,8,u)]),(0,s._)("h2",null,(0,i.zw)(e.name),1)])),_:2},1032,["to"])])))),128))])):(0,s.kq)("",!0),"filters"===e.$route.params.page?((0,s.wg)(),(0,s.iD)("ul",n,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(e.$store.state.filters,(t=>((0,s.wg)(),(0,s.iD)("li",{class:"filter-link",key:t.title},[(0,s.Wm)(d,{to:`/filters/${e.$route.params.city}/`+t.id},{default:(0,s.w5)((()=>[(0,s._)("picture",null,[(0,s._)("img",{src:t.img},null,8,o)]),(0,s._)("h2",null,(0,i.zw)(t.title),1)])),_:2},1032,["to"])])))),128))])):(0,s.kq)("",!0),!["filters","city"].includes(e.$route.params.page)&&e.$route.params.page?((0,s.wg)(),(0,s.iD)("ul",c,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(e.$store.state.filters.find((t=>t.id==e.$route.params.page))?.values,(t=>((0,s.wg)(),(0,s.iD)("li",{class:"filter-link",key:t},[(0,s.Wm)(d,{to:"/results/"+e.$route.params.city+"/"+e.$route.params.page+"/"+(t.max??t.name??t)},{default:(0,s.w5)((()=>[(0,s._)("picture",null,[(0,s._)("img",{src:t.img},null,8,m)]),(0,s._)("h2",null,(0,i.zw)(t.name??(t.max||t.min?`${t.min} - ${t.max} ₽ за m²`:t)),1)])),_:2},1032,["to"])])))),128))])):(0,s.kq)("",!0)],64)}var g=r(8824),w={components:{searchBlock:g.Z},data:()=>({cities:[{name:"Москва",img:r(8986)},{name:"Санкт-Петербург",img:r(9289)}]}),watch:{$route(e,t){"city"===this.$route.params.city&&window.Telegram?.WebApp.BackButton.hide(),"filters"===this.$route.params.page&&window.Telegram?.WebApp.BackButton.show()}},mounted(){window.Telegram?.WebApp.expand(),window.Telegram?.WebApp.enableClosingConfirmation(),window.Telegram?.WebApp.BackButton.onClick((()=>{this.$router.go(-1)})),this.$store.state.user_id=this.$route.params.id}},f=r(89);const d=(0,f.Z)(w,[["render",p]]);var h=d},8986:function(e,t,r){e.exports=r.p+"img/moscow.44c01f0a.webp"},9289:function(e,t,r){e.exports=r.p+"img/spb.56809c91.webp"}}]);
//# sourceMappingURL=244.5f4c9f0e.js.map
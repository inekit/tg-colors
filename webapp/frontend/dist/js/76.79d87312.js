"use strict";(self["webpackChunk_coreui_coreui_free_vue_admin_template"]=self["webpackChunk_coreui_coreui_free_vue_admin_template"]||[]).push([[76],{4076:function(e,t,i){i.r(t),i.d(t,{default:function(){return o}});var n=i(3396),l=i(7139);function a(e,t,i,a,u,r){return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n._)("h1",null,(0,l.zw)(e.item.name),1),(0,n._)("ul",null,[(0,n._)("li",null,"📍 Адрес: "+(0,l.zw)(e.item.address),1),(0,n._)("li",null,"📒 Проектная декларация: "+(0,l.zw)(e.item.declaration),1),(0,n._)("li",null,"🗓 Ввод в эксплуатацию: "+(0,l.zw)(e.item.commissioning),1),(0,n._)("li",null,"🔑 Выдача ключей: "+(0,l.zw)(e.item.issuance_date),1),(0,n._)("li",null,"💵 Средняя цена за 1 м²: "+(0,l.zw)(e.item.meter_price),1),(0,n._)("li",null,"📈 Распроданность квартир: "+(0,l.zw)(e.item.sale_percent)+"%",1),(0,n._)("li",null,"🏢 Этажей: "+(0,l.zw)(e.item.floor_count),1),(0,n._)("li",null,"🎨 Тип отделки: "+(0,l.zw)(e.item.finish_type),1)])],64)}var u={data:()=>({item:{}}),mounted(){this.getItem(this.$route.params.id),window.Telegram.WebApp.MainButton.setText("Узнать больше"),window.Telegram.WebApp.MainButton.enable(),window.Telegram.WebApp.BackButton.show(),window.Telegram.WebApp.MainButton.enable(),window.Telegram.WebApp.MainButton.onClick((()=>{window.Telegram.WebApp.sendData("123")}))},methods:{getItem(e){this.$store.state.myApi.get(this.$store.state.restAddr+"/items",{params:{id:e}}).then((e=>this.item=e.data)).catch((e=>{eventBus.$emit("noresponse",e)}))}}},r=i(89);const m=(0,r.Z)(u,[["render",a]]);var o=m}}]);
//# sourceMappingURL=76.79d87312.js.map
"use strict";(self["webpackChunk_coreui_coreui_free_vue_admin_template"]=self["webpackChunk_coreui_coreui_free_vue_admin_template"]||[]).push([[491],{3491:function(e,t,a){a.r(t),a.d(t,{default:function(){return V}});var s=a(3396),i=a(9242),o=a(7139);const n=(0,s._)("h1",null,"Оформление заказа",-1),r={class:"order-block"},l=(0,s._)("p",null,"Расчет доставки производится в ручную из-за индивидуальности заказов.",-1),d=(0,s._)("p",null,"Средняя стоимость доставки не превышает 350р. ",-1),p=(0,s._)("p",null,"После оплаты заказа, вы получите расчет стоимости доставки, и сможете оплатить ее при получении.",-1),c=(0,s._)("p",null,"Если Вы хотите, чтобы мы произвели расчет до оплаты заказа, напишите нам из главного меню по кнопке «Чат с нами»",-1),u={class:"delivery"},m=(0,s._)("h2",null,"Способ доставки",-1),h={class:"select-group"},_=["id","value"],y=["for","onClick"],k=(0,s._)("h2",null,"Получатель",-1),b={class:"input-group"},w={class:"delivery-time"},D=(0,s._)("h2",null,"Время доставки",-1),g=(0,s._)("h2",null,"Промокод",-1),v={class:"input-group one-line"},A=(0,s._)("h2",{class:"total"},"Итого",-1),f={class:"pricing",hidden:""},B={key:0,class:"pricing"},$={class:"pricing"};function T(e,t,a,T,P,C){return(0,s.wg)(),(0,s.iD)(s.HY,null,[n,(0,s._)("div",r,[(0,s._)("button",{class:"",onClick:t[0]||(t[0]=(...e)=>C.order&&C.order(...e))},"Оформить заказ"),l,d,p,c,(0,s._)("div",u,[m,(0,s._)("div",h,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(P.deliveryMethods,(e=>((0,s.wg)(),(0,s.iD)("div",{key:e},[(0,s.wy)((0,s._)("input",{type:"radio",id:e,value:e,"onUpdate:modelValue":t[1]||(t[1]=e=>P.selected_dm=e),onChange:t[2]||(t[2]=(...e)=>C.getDeliveryPrice&&C.getDeliveryPrice(...e))},null,40,_),[[i.G2,P.selected_dm]]),(0,s._)("label",{for:e,onClick:t=>{P.selected_dm=e,C.getDeliveryPrice()}},(0,o.zw)(e),9,y)])))),128))])]),k,(0,s._)("div",b,[(0,s.wy)((0,s._)("input",{type:"text",id:"name",name:"name",placeholder:"Имя","onUpdate:modelValue":t[3]||(t[3]=e=>P.basketData.name=e)},null,512),[[i.nr,P.basketData.name]]),(0,s.wy)((0,s._)("input",{type:"text",id:"surname",name:"surname",placeholder:"Фамилия","onUpdate:modelValue":t[4]||(t[4]=e=>P.basketData.surname=e)},null,512),[[i.nr,P.basketData.surname]]),(0,s.wy)((0,s._)("input",{type:"text",id:"patronymic",name:"patronymic",placeholder:"Отчество","onUpdate:modelValue":t[5]||(t[5]=e=>P.basketData.patronymic=e)},null,512),[[i.nr,P.basketData.patronymic]]),(0,s.wy)((0,s._)("input",{type:"tel",id:"phone",name:"phone",placeholder:"Телефон","onUpdate:modelValue":t[6]||(t[6]=e=>P.basketData.phone=e)},null,512),[[i.nr,P.basketData.phone]]),(0,s.wy)((0,s._)("input",{type:"text",id:"address",name:"address",placeholder:"Адрес доставки","onUpdate:modelValue":t[7]||(t[7]=e=>P.basketData.address=e),onInput:t[8]||(t[8]=(...e)=>C.getDeliveryPrice&&C.getDeliveryPrice(...e))},null,544),[[i.nr,P.basketData.address]]),(0,s.wy)((0,s._)("input",{type:"number",id:"text",pattern:"[0-9]+",name:"postal code",placeholder:"Почтовый индекс","onUpdate:modelValue":t[9]||(t[9]=e=>P.basketData.postal_code=e),onInput:t[10]||(t[10]=(...e)=>C.getDeliveryPrice&&C.getDeliveryPrice(...e))},null,544),[[i.nr,P.basketData.postal_code,void 0,{number:!0}]])]),(0,s.wy)((0,s._)("div",w,[D,(0,s._)("span",null,(0,o.zw)(P.deliveryTime)+" дней",1)],512),[[i.F8,P.deliveryTime]]),g,(0,s._)("div",v,[(0,s.wy)((0,s._)("input",{type:"text",id:"name",name:"name",class:"form-control",placeholder:"Введите промокод","onUpdate:modelValue":t[11]||(t[11]=e=>P.basketData.promo_code=e)},null,512),[[i.nr,P.basketData.promo_code]]),(0,s._)("button",{class:"button-append",type:"button",onClick:t[12]||(t[12]=(...e)=>C.getPromoSale&&C.getPromoSale(...e))},"Применить")]),A,(0,s._)("div",f,[(0,s.Uk)("Стоимость доставки"),(0,s._)("span",null,(0,o.zw)(P.deliveryPrice?`${P.deliveryPrice} ₽`:"Не определена"),1)]),P.sale.sum>0?((0,s.wg)(),(0,s.iD)("div",B,[(0,s.Uk)("Скидка"),(0,s._)("span",null,(0,o.zw)("money"===P.sale.type?`${P.sale.sum} ₽`:`${P.sale.sum} %`),1)])):(0,s.kq)("",!0),(0,s._)("div",$,[(0,s.Uk)("К оплате"),(0,s._)("span",null,(0,o.zw)(C.totalSum)+" ₽",1)])])],64)}var P=a(7123),C=a(3089),U=a(6797),W={components:{InstagramLoader:C.z9},data(){return{basketData:{},paymentOptions:["yookassa"],selected_po:"yookassa",deliveryMethods:["Я. Доставка","CДЭК","Курьер","Почта РФ"],selected_dm:"CДЭК",deliveryPrice:null,deliveryTime:null,sale:{sum:0}}},watch:{},async beforeMount(){window.Telegram?.WebApp.BackButton.onClick(this.routeBack),window.Telegram?.WebApp.BackButton.show(),window.Telegram?.WebApp.MainButton.onClick(this.order),window.Telegram?.WebApp.MainButton.enable(),window.Telegram?.WebApp.MainButton.show(),window.Telegram?.WebApp.MainButton.setText("Заказ подтверждаю"),this.basketData=await this.getBasketData(),await this.getDeliveryPrice()},async beforeUnmount(){window.Telegram?.WebApp.MainButton.offClick(this.order),window.Telegram?.WebApp.MainButton.hide(),window.Telegram?.WebApp.BackButton.offClick(this.routeBack),window.Telegram?.WebApp.BackButton.hide()},methods:{order(){if(!this.basketData.address||!this.basketData.phone||!this.basketData.name||!this.basketData.surname||!this.basketData.patronymic)return alert("Пожалуйста, заполните все поля");this.$store.state.myApi.post(this.$store.state.restAddr+"/orders",{user_id:this.$store.state.userId,address:this.basketData.address,selected_dm:this.selected_dm,selected_po:this.selected_po,phone:this.basketData.phone,name:this.basketData.name,surname:this.basketData.surname,postal_code:this.basketData.postal_code,patronymic:this.basketData.patronymic,promo_code:this.sale.code,delivery_price:0,delivery_time:this.deliveryTime,total:this.totalSum}).then((async e=>{window.Telegram?.WebApp.disableClosingConfirmation(),window.Telegram?.WebApp.close()})).catch((e=>{P.Z.$emit("noresponse",e)}))},async getDeliveryPrice(){const e=await this.$store.state.myApi.get(this.$store.state.restAddr+"/delivery_price",{params:{operator:this.selected_dm,address:this.basketData.address,count:this.basketData.total_count,postal_code:this.basketData.postal_code}}).then((e=>{this.deliveryPrice=e.data?.price??0,this.deliveryTime=e.data?.time})).catch((e=>{console.log(e),this.deliveryPrice=0}));return e??{}},routeBack(){this.$router.go(-1)},async getBasketData(){const e=await this.$store.state.myApi.get(this.$store.state.restAddr+"/basket_data",{params:{user_id:this.$store.state.userId}}).then((e=>e.data)).catch((e=>{P.Z.$emit("noresponse",e)}));return e??{}},async getPromoSale(){const e=await this.$store.state.myApi.get(this.$store.state.restAddr+"/promos",{params:{code:this.basketData.promo_code,user_id:this.$store.state.userId}}).then((e=>{const t=e.data;return alert(`Промокод на ${t.sum} ${"money"===t.type?"рублей":"%"} успешно активирован`),this.sale=e.data??{sum:0}})).catch((e=>{this.sale={sum:0},alert("Промокод недействителен")}));return e??{}}},computed:{totalSum(){const e=+("money"===this.sale.type?(0,U.min)(this.basketData.total-this.sale.sum,0):(+(100-this.sale.sum)*this.basketData.total/100).toFixed(0));return e}}},M=a(89);const x=(0,M.Z)(W,[["render",T]]);var V=x}}]);
//# sourceMappingURL=491.530f30d4.js.map
(self["webpackChunk_coreui_coreui_free_vue_admin_template"]=self["webpackChunk_coreui_coreui_free_vue_admin_template"]||[]).push([[80],{4234:function(e){let t={year:"numeric",month:"long",day:"numeric"};e.exports={dateFormatter:e=>new Date(e).toLocaleDateString("ru-RU",t),getAgeStr(e){return e>12?`${Math.trunc(e/12)} лет ${e%12} месяцев`:`${e} месяцев`}}},5404:function(e,t,a){"use strict";a.d(t,{Z:function(){return c}});var o=a(3396),i=a(7139);const r={key:1},n={class:"d-grid gap-2 d-md-flex justify-content-md-center"};function l(e,t,a,l,s,d){const u=(0,o.up)("CCardHeader"),m=(0,o.up)("CTableHeaderCell"),c=(0,o.up)("CTableRow"),p=(0,o.up)("CTableHead"),w=(0,o.up)("CFormInput"),g=(0,o.up)("CTableDataCell"),f=(0,o.up)("CButton"),h=(0,o.up)("CTableBody"),_=(0,o.up)("CTable"),k=(0,o.up)("CCardBody"),C=(0,o.up)("CCard"),D=(0,o.up)("CCol"),y=(0,o.up)("CRow"),v=(0,o.up)("CPaginationItem"),b=(0,o.up)("CPagination");return(0,o.wg)(),(0,o.iD)(o.HY,null,[(0,o.Wm)(y,null,{default:(0,o.w5)((()=>[(0,o.Wm)(D,{md:12},{default:(0,o.w5)((()=>[(0,o.Wm)(C,{class:"mb-4"},{default:(0,o.w5)((()=>[(0,o.Wm)(u,null,{default:(0,o.w5)((()=>[(0,o.Uk)((0,i.zw)(a.name),1)])),_:1}),(0,o.Wm)(k,null,{default:(0,o.w5)((()=>[(0,o.Wm)(_,{align:"middle",class:"mb-0 border",hover:"",responsive:""},{default:(0,o.w5)((()=>[(0,o.Wm)(p,{color:"light"},{default:(0,o.w5)((()=>[(0,o.Wm)(c,null,{default:(0,o.w5)((()=>[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(s.fieldNames,(e=>((0,o.wg)(),(0,o.j4)(m,{key:e+"header",class:"text-center"},{default:(0,o.w5)((()=>[(0,o.Uk)((0,i.zw)(e),1)])),_:2},1024)))),128)),(0,o.Wm)(m,{class:"text-center"},{default:(0,o.w5)((()=>[(0,o.Uk)("Действия")])),_:1})])),_:1})])),_:1}),(0,o.Wm)(h,null,{default:(0,o.w5)((()=>[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(d.transformData(a.rows),((l,u)=>((0,o.wg)(),(0,o.j4)(c,{key:u+"row"},{default:(0,o.w5)((()=>[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(l,((e,t)=>((0,o.wg)(),(0,o.j4)(g,{key:t+"row",class:"text-center"},{default:(0,o.w5)((()=>[s.updatingId===a.rows[u]?.id?((0,o.wg)(),(0,o.j4)(w,{key:0,modelValue:s.formData[a.fields[t]?.name],"onUpdate:modelValue":e=>s.formData[a.fields[t]?.name]=e},null,8,["modelValue","onUpdate:modelValue"])):((0,o.wg)(),(0,o.iD)("span",r,(0,i.zw)(e),1))])),_:2},1024)))),128)),(0,o.Wm)(g,null,{default:(0,o.w5)((()=>[(0,o._)("div",n,[s.updatingId===a.rows[u]?.id?((0,o.wg)(),(0,o.j4)(f,{key:0,color:"primary",size:"md",onClick:e=>d.editRow(u)},{default:(0,o.w5)((()=>[(0,o.Uk)(" Сохранить")])),_:2},1032,["onClick"])):(0,o.kq)("",!0),s.updatingId===a.rows[u]?.id?((0,o.wg)(),(0,o.j4)(f,{key:1,color:"light",size:"md",onClick:t[0]||(t[0]=e=>s.updatingId=!1)},{default:(0,o.w5)((()=>[(0,o.Uk)(" Отменить")])),_:1})):((0,o.wg)(!0),(0,o.iD)(o.HY,{key:2},(0,o.Ko)(a.actions,((t,a)=>((0,o.wg)(),(0,o.j4)(f,{key:a+"action",color:t?.color,size:"sm",onClick:o=>d.chooseAction(a,t,u,e.j,e.column)},{default:(0,o.w5)((()=>[(0,o.Uk)((0,i.zw)(a),1)])),_:2},1032,["color","onClick"])))),128))])])),_:2},1024)])),_:2},1024)))),128)),(0,o.Wm)(c)])),_:1})])),_:1})])),_:1})])),_:1})])),_:1})])),_:1}),(0,o.Wm)(b,{"aria-label":"Page navigation example"},{default:(0,o.w5)((()=>[(0,o.Wm)(v,{onClick:d.previousPage},{default:(0,o.w5)((()=>[(0,o.Uk)("Назад")])),_:1},8,["onClick"]),(0,o.Wm)(v,{disabled:""},{default:(0,o.w5)((()=>[(0,o.Uk)((0,i.zw)(s.page),1)])),_:1}),(0,o.Wm)(v,{onClick:d.nextPage},{default:(0,o.w5)((()=>[(0,o.Uk)("Далее")])),_:1},8,["onClick"])])),_:1})],64)}a(7658);var s=a(4234),d={props:{name:{type:String},fields:[],actions:[],rows:[],postData:{type:Function,default:()=>{}},updateRow:{type:Function,default:()=>{}},editMode:{type:String,default:"inline"}},data(){return{fieldNames:[],perPage:10,page:1,updatingId:!1,formData:{}}},async mounted(){this.fieldNames=this.fields.map((e=>"object"===typeof e?e.title??e.name:e)),await this.postData(this.perPage,this.page)},methods:{dateFormatter:s.dateFormatter,chooseAction(e,t,a){t&&(console.log("Изменить"===e&&"inline"===this.editMode,a),"Изменить"===e&&"inline"===this.editMode?(this.updatingId=this.rows[a]?.id,this.formData=this.rows[a]):t?.action(this.rows[a]))},async nextPage(){const e=await this.postData(this.perPage,this.page+1);e?.length>0&&this.page++},previousPage(){this.page>1&&this.page--,this.postData(this.perPage,this.page)},toPage(e){this.page=e,this.postData(this.perPage,this.page)},editRow(e){this.updatingId=!1,this.updateRow(this.rows[e]?.id,this.formData)},transformData(e){return e?.map(this.transformDataEl)},transformDataEl(e){let t=[];for(let a of this.fields){const o=a.name.split(".")??a.split(".");let i=e;o?.forEach((e=>i=i?.[e])),"creation_date"===a?.name&&(i=(0,s.dateFormatter)(i)),"text"===a?.name&&(i=i.substr(0,100)),t.push(i??"")}return t}}},u=a(89);const m=(0,u.Z)(d,[["render",l]]);var c=m},9080:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return f}});var o=a(3396),i=a(7139);const r=["onChange"];function n(e,t,a,n,l,s){const d=(0,o.up)("Table");return(0,o.wg)(),(0,o.iD)("div",null,[(0,o._)("div",null," ID: "+(0,i.zw)(e.order.id),1),(0,o._)("div",null," Создан: "+(0,i.zw)(s.dateFormatter(e.order.creation_date)),1),(0,o._)("div",null," Доставка: "+(0,i.zw)(e.order.selected_dm),1),(0,o._)("div",null," Адрес доставки: "+(0,i.zw)(e.order.address),1),(0,o._)("div",null," ФИО получателя: "+(0,i.zw)(`${e.order.surname} ${e.order.name} ${e.order.patronymic}`),1),(0,o._)("div",null," Метод оплаты: "+(0,i.zw)(e.order.selected_po),1),(0,o._)("div",null," Сумма заказа: "+(0,i.zw)(e.order.total),1),(0,o._)("div",null,[(0,o.Uk)(" Статус: "+(0,i.zw)(e.order.status)+" ",1),((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(l.statuses,(e=>((0,o.wg)(),(0,o.iD)("button",{key:e,onChange:t=>s.changeStatus(e)},(0,i.zw)(e),41,r)))),128))]),(0,o.Wm)(d,{fields:l.tableFieldNames,postData:s.get,actions:e.dataActions,rows:l.rows,editMode:"form",name:"Позиции"},null,8,["fields","postData","actions","rows"])])}var l=a(5404),s=a(7123),d=a(4234),u=a(6265),m=a.n(u);const c=m().create({withCredentials:!0,credentials:"include"});var p={components:{Table:l.Z},props:["orderId"],data(){return{myApi:c,formVisible:!1,formData:{},rows:[],statuses:["Новый","Оплачен","На доставке","Доставлен"],tableFieldNames:[{name:"ID",title:"Артикул"},{name:"title",title:"Название"},{name:"size",title:"Размер"},{name:"size",title:"Материал"},{name:"count",title:"Количество"}]}},created(){},methods:{change(e){this.formVisible=!0,e.tags_array=new Set(e.tags_array),this.formData=e,console.log(e),this.formMode="edit"},dateFormatter:d.dateFormatter,changeStatus(){},get(e,t){return console.log(this.tag),c.get(this.$store.state.publicPath+"/api/admin/orders/",{params:{take:e??10,page:t??1,id:this.$route.params.orderId}}).then((e=>{e.data.items?.length>0&&(this.rows=e.data.items),this.order=e.data})).catch((e=>(s.Z.$emit("noresponse",e),!1)))}}},w=a(89);const g=(0,w.Z)(p,[["render",n]]);var f=g}}]);
//# sourceMappingURL=80.30a0683d.js.map
(self["webpackChunk_coreui_coreui_free_vue_admin_template"]=self["webpackChunk_coreui_coreui_free_vue_admin_template"]||[]).push([[849],{4234:function(e){let t={year:"numeric",month:"long",day:"numeric"};e.exports={dateFormatter:e=>new Date(e).toLocaleDateString("ru-RU",t),getAgeStr(e){return e>12?`${Math.trunc(e/12)} лет ${e%12} месяцев`:`${e} месяцев`}}},7942:function(e,t,a){"use strict";a.d(t,{Z:function(){return p}});var i=a(3396),o=a(7139);const r={key:1},l={class:"d-grid gap-2 d-md-flex justify-content-md-center"};function n(e,t,a,n,d,s){const m=(0,i.up)("CCardHeader"),c=(0,i.up)("CTableHeaderCell"),p=(0,i.up)("CTableRow"),u=(0,i.up)("CTableHead"),h=(0,i.up)("CFormInput"),f=(0,i.up)("CTableDataCell"),w=(0,i.up)("CButton"),g=(0,i.up)("CTableBody"),b=(0,i.up)("CTable"),C=(0,i.up)("CCardBody"),D=(0,i.up)("CCard"),_=(0,i.up)("CCol"),k=(0,i.up)("CRow"),y=(0,i.up)("CPaginationItem"),v=(0,i.up)("CPagination");return(0,i.wg)(),(0,i.iD)(i.HY,null,[(0,i.Wm)(k,null,{default:(0,i.w5)((()=>[(0,i.Wm)(_,{md:12},{default:(0,i.w5)((()=>[(0,i.Wm)(D,{class:"mb-4"},{default:(0,i.w5)((()=>[(0,i.Wm)(m,null,{default:(0,i.w5)((()=>[(0,i.Uk)((0,o.zw)(a.name),1)])),_:1}),(0,i.Wm)(C,null,{default:(0,i.w5)((()=>[(0,i.Wm)(b,{align:"middle",class:"mb-0 border",hover:"",responsive:""},{default:(0,i.w5)((()=>[(0,i.Wm)(u,{color:"light"},{default:(0,i.w5)((()=>[(0,i.Wm)(p,null,{default:(0,i.w5)((()=>[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(d.fieldNames,(e=>((0,i.wg)(),(0,i.j4)(c,{key:e+"header",class:"text-center"},{default:(0,i.w5)((()=>[(0,i.Uk)((0,o.zw)(e),1)])),_:2},1024)))),128)),(0,i.Wm)(c,{class:"text-center"},{default:(0,i.w5)((()=>[(0,i.Uk)("Действия")])),_:1})])),_:1})])),_:1}),(0,i.Wm)(g,null,{default:(0,i.w5)((()=>[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(s.transformData(a.rows),((n,m)=>((0,i.wg)(),(0,i.j4)(p,{key:m+"row"},{default:(0,i.w5)((()=>[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(n,((e,t)=>((0,i.wg)(),(0,i.j4)(f,{key:t+"row",class:"text-center"},{default:(0,i.w5)((()=>[d.updatingId===a.rows[m]?.id?((0,i.wg)(),(0,i.j4)(h,{key:0,modelValue:d.formData[a.fields[t]?.name],"onUpdate:modelValue":e=>d.formData[a.fields[t]?.name]=e},null,8,["modelValue","onUpdate:modelValue"])):((0,i.wg)(),(0,i.iD)("span",r,(0,o.zw)(e),1))])),_:2},1024)))),128)),(0,i.Wm)(f,null,{default:(0,i.w5)((()=>[(0,i._)("div",l,[d.updatingId===a.rows[m]?.id?((0,i.wg)(),(0,i.j4)(w,{key:0,color:"primary",size:"md",onClick:e=>s.editRow(m)},{default:(0,i.w5)((()=>[(0,i.Uk)(" Сохранить")])),_:2},1032,["onClick"])):(0,i.kq)("",!0),d.updatingId===a.rows[m]?.id?((0,i.wg)(),(0,i.j4)(w,{key:1,color:"light",size:"md",onClick:t[0]||(t[0]=e=>d.updatingId=!1)},{default:(0,i.w5)((()=>[(0,i.Uk)(" Отменить")])),_:1})):((0,i.wg)(!0),(0,i.iD)(i.HY,{key:2},(0,i.Ko)(a.actions,((t,a)=>((0,i.wg)(),(0,i.j4)(w,{key:a+"action",color:t?.color,size:"sm",onClick:i=>s.chooseAction(a,t,m,e.j,e.column)},{default:(0,i.w5)((()=>[(0,i.Uk)((0,o.zw)(a),1)])),_:2},1032,["color","onClick"])))),128))])])),_:2},1024)])),_:2},1024)))),128)),(0,i.Wm)(p)])),_:1})])),_:1})])),_:1})])),_:1})])),_:1})])),_:1}),(0,i.Wm)(v,{"aria-label":"Page navigation example"},{default:(0,i.w5)((()=>[(0,i.Wm)(y,{onClick:s.previousPage},{default:(0,i.w5)((()=>[(0,i.Uk)("Назад")])),_:1},8,["onClick"]),(0,i.Wm)(y,{disabled:""},{default:(0,i.w5)((()=>[(0,i.Uk)((0,o.zw)(d.page),1)])),_:1}),(0,i.Wm)(y,{onClick:s.nextPage},{default:(0,i.w5)((()=>[(0,i.Uk)("Далее")])),_:1},8,["onClick"])])),_:1})],64)}a(7658);var d=a(4234),s={props:{name:{type:String},fields:[],actions:[],rows:[],postData:{type:Function,default:()=>{}},updateRow:{type:Function,default:()=>{}},editMode:{type:String,default:"inline"}},data(){return{fieldNames:[],perPage:10,page:1,updatingId:!1,formData:{}}},async mounted(){this.fieldNames=this.fields.map((e=>"object"===typeof e?e.title??e.name:e)),await this.postData(this.perPage,this.page)},methods:{dateFormatter:d.dateFormatter,chooseAction(e,t,a){t&&(console.log("Изменить"===e&&"inline"===this.editMode,a),"Изменить"===e&&"inline"===this.editMode?(this.updatingId=this.rows[a]?.id,this.formData=this.rows[a]):t?.action(this.rows[a]))},async nextPage(){const e=await this.postData(this.perPage,this.page+1);e?.length>0&&this.page++},previousPage(){this.page>1&&this.page--,this.postData(this.perPage,this.page)},toPage(e){this.page=e,this.postData(this.perPage,this.page)},editRow(e){this.updatingId=!1,this.updateRow(this.rows[e]?.id,this.formData)},transformData(e){return e?.map(this.transformDataEl)},transformDataEl(e){let t=[];for(let a of this.fields){const i=a.name.split(".")??a.split(".");let o=e;i?.forEach((e=>o=o?.[e])),"creation_date"!==a?.name&&"publication_date"!==a?.name||(o=(0,d.dateFormatter)(o)),"text"===a?.name&&(o=o.substr(0,100)),t.push(o??"")}return t}}},m=a(89);const c=(0,m.Z)(s,[["render",n]]);var p=c},849:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return W}});var i=a(3396);function o(e,t,a,o,r,l){const n=(0,i.up)("AddCategoryModal"),d=(0,i.up)("Table");return(0,i.wg)(),(0,i.iD)("div",null,[(0,i.Wm)(n,{visible:r.formVisible,formData:r.formData,mode:e.formMode},null,8,["visible","formData","mode"]),(0,i.Wm)(d,{fields:r.tableFieldNames,postData:l.get,actions:r.dataActions,rows:r.rows,editMode:"form",name:"Категории"},null,8,["fields","postData","actions","rows"])])}a(7658);var r=a(7139),l=a(9242);const n=e=>((0,i.dD)("data-v-d055bd08"),e=e(),(0,i.Cn)(),e),d={class:"border p-2 mt-3 preview-container"},s=["src"],m={class:"types-list"},c=n((()=>(0,i._)("span",null,"Обратная сторона",-1)));function p(e,t,a,o,n,p){const u=(0,i.up)("CButton"),h=(0,i.up)("CModalTitle"),f=(0,i.up)("CModalHeader"),w=(0,i.up)("CFormInput"),g=(0,i.up)("CFormTextarea"),b=(0,i.up)("CForm"),C=(0,i.up)("CFormCheck"),D=(0,i.up)("CModalBody"),_=(0,i.up)("CModalFooter"),k=(0,i.up)("CModal");return(0,i.wg)(),(0,i.iD)(i.HY,null,[(0,i.Wm)(u,{color:"primary",onClick:p.addNewProject},{default:(0,i.w5)((()=>[(0,i.Uk)("Добавить категорию")])),_:1},8,["onClick"]),(0,i.Wm)(k,{backdrop:"static",alignment:"center",visible:a.visible,onClose:p.closeModal},{default:(0,i.w5)((()=>[(0,i.Wm)(f,null,{default:(0,i.w5)((()=>[(0,i.Wm)(h,null,{default:(0,i.w5)((()=>[(0,i.Uk)((0,r.zw)("new"===a.mode?"Добавить категорию":"Редактировать категорию"),1)])),_:1})])),_:1}),(0,i.Wm)(D,null,{default:(0,i.w5)((()=>[(0,i.Wm)(b,{ref:"add-file-form",novalidate:"",validated:n.formValid,onSubmit:t[2]||(t[2]=(0,l.iM)((e=>p.addCategory()),["prevent"])),class:"add-user",style:{display:"'none'"}},{default:(0,i.w5)((()=>[(0,i.Wm)(w,{class:"mb-3",modelValue:a.formData.name,"onUpdate:modelValue":t[0]||(t[0]=e=>a.formData.name=e),placeholder:"Категория",id:"inputName","aria-describedby":"inputGroupPrepend",maxlength:"255",required:"",feedbackValid:"Все ок",feedbackInvalid:"Введите корректное название категории"},null,8,["modelValue"]),(0,i.Wm)(w,{type:"file",accept:"image/*",ref:"preview",onInput:p.previewMultiImage,class:"mb-3",label:"Превью",placeholder:"Превью"},null,8,["onInput"]),(0,i._)("div",d,[(0,i._)("img",{src:n.preview,class:"img-fluid"},null,8,s)]),(0,i.Wm)(g,{modelValue:a.formData.description,"onUpdate:modelValue":t[1]||(t[1]=e=>a.formData.description=e),placeholder:"Описание",id:"inputDescription","aria-describedby":"inputGroupPrepend",required:""},null,8,["modelValue"])])),_:1},8,["validated"]),(0,i._)("div",m,[c,(0,i.Wm)(C,{id:"type-money",checked:!0===a.formData.backside_available,onInput:t[3]||(t[3]=e=>a.formData.backside_available=!0),type:"radio",name:"type-money",value:"money",label:"Да"},null,8,["checked"]),(0,i.Wm)(C,{id:"type-procent",checked:!1===a.formData.backside_available,onInput:t[4]||(t[4]=e=>a.formData.backside_available=!1),type:"radio",name:"type-procent",value:"procent",label:"Нет"},null,8,["checked"])])])),_:1}),(0,i.Wm)(_,null,{default:(0,i.w5)((()=>[(0,i.Wm)(u,{color:"secondary",onClick:p.closeModal},{default:(0,i.w5)((()=>[(0,i.Uk)(" Отменить ")])),_:1},8,["onClick"]),"new"===a.mode?((0,i.wg)(),(0,i.j4)(u,{key:0,color:"primary",onClick:p.addCategory},{default:(0,i.w5)((()=>[(0,i.Uk)("Добавить категорию")])),_:1},8,["onClick"])):((0,i.wg)(),(0,i.j4)(u,{key:1,color:"primary",onClick:p.editCategory},{default:(0,i.w5)((()=>[(0,i.Uk)("Редактировать категорию")])),_:1},8,["onClick"]))])),_:1})])),_:1},8,["visible","onClose"])],64)}var u=a(6265),h=a.n(u),f=a(7123);const w=h().create({withCredentials:!0});var g={props:{mode:{required:!0,type:String,validator:e=>["new","edit"].includes(e.toLowerCase())},visible:!1,formData:{name:"",description:""}},data(){return{formValid:!1,preview:""}},mounted(){this.preview=`${this.$store.state.publicPath}/public/pics/${this.formData.preview}`,this.old_name=this.formData.name},updated(){this.formValid=!1,this.preview=`${this.$store.state.publicPath}/public/pics/${this.formData.preview}`,this.old_name=this.formData.name},methods:{addNewProject(){f.Z.$emit("addNewProject")},closeModal(){f.Z.$emit("closeModal")},constractFromData(){if(!this.formData.name||!this.formData.description)throw new Error;var e=new FormData;return e.append("preview",this.formData.preview),e.append("name",this.formData.name),e.append("old_name",this.old_name),e.append("backside_available",this.formData.backside_available),e.append("description",this.formData.description),e},previewMultiImage(e){var t=e.target;if(t.files){var a=new FileReader;a.onload=e=>{this.preview=e.target.result},this.formData.preview=t.files[0],a.readAsDataURL(t.files[0])}},addCategory(){try{const e=this.constractFromData();w.post(this.$store.state.publicPath+"/api/admin/categories",e,{headers:{"Content-Type":"multipart/form-data"}}).then((()=>{f.Z.$emit("projectAdded")})).catch((e=>{f.Z.$emit("noresponse",e)}))}catch(e){this.formValid=!0}},editCategory(){try{const e=this.constractFromData(!0);w.put(this.$store.state.publicPath+"/api/admin/categories",e,{headers:{"Content-Type":"multipart/form-data"}}).then((()=>{f.Z.$emit("projectEdited")})).catch((e=>{f.Z.$emit("noresponse",e)}))}catch(e){console.log(e),this.formValid=!0}}}},b=a(89);const C=(0,b.Z)(g,[["render",p],["__scopeId","data-v-d055bd08"]]);var D=C,_=a(7942);const k=h().create({withCredentials:!0});var y={components:{AddCategoryModal:D,Table:_.Z},data(){return{myApi:k,formVisible:!1,formData:{},rows:[],dataActions:{"Позиции":{action:this.routeToPosts,color:"primary"},"Изменить":{action:this.change,color:"warning"},"Удалить":{action:this.delete,color:"danger"},"▲":{action:this.putLower,color:"secondary"},"▼":{action:this.putHigrer,color:"secondary"}},tableFieldNames:[{name:"name",title:"Название"},{name:"description",title:"Описание"}]}},created(){f.Z.$on("addNewProject",(()=>{this.formMode="new",this.formVisible=!0})),f.Z.$on("closeModal",(()=>{this.formVisible=!1,this.formData={}})),f.Z.$on("projectAdded",(()=>{this.formVisible=!1,this.get(),this.formData={}})),f.Z.$on("projectEdited",(()=>{this.formVisible=!1,this.get(),this.formData={}}))},methods:{change(e){this.formVisible=!0,this.formData=e,this.formMode="edit"},get(e,t){return k.get(this.$store.state.publicPath+"/api/categories/",{params:{take:e??10,page:t??1}}).then((e=>(e.data?.length>0&&(this.rows=e.data),e.data))).catch((e=>(f.Z.$emit("noresponse",e),!1)))},putHigrer(e,t="up"){return k.put(this.$store.state.publicPath+"/api/admin/categories/",{order_id:e.order_id,type:t}).then((()=>{this.get(),f.Z.$emit("projectDeleted")})).catch((e=>{f.Z.$emit("noresponse",e)}))},putLower(e){this.putHigrer(e,"down")},delete(e){const t=confirm("Вы действительно хотите удалить пользователя?");if(t)return k.delete(this.$store.state.publicPath+"/api/admin/categories/",{data:{name:e.name}}).then((()=>{this.get(),f.Z.$emit("projectDeleted")})).catch((e=>{f.Z.$emit("noresponse",e)}))},routeToPosts(e){this.$router.push("/items/project/"+e.name)}}};const v=(0,b.Z)(y,[["render",o]]);var W=v}}]);
//# sourceMappingURL=849.b41273c5.js.map
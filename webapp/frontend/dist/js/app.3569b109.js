(function(){"use strict";var e={7123:function(e,t,n){n(7658);class r{constructor(){this.events={}}$on(e,t){this.events[e]=this.events[e]||[],this.events[e].push(t)}$off(e,t){if(this.events[e])for(var n=0;n<this.events[e].length;n++)if(this.events[e][n]===t){this.events[e].splice(n,1);break}}$emit(e,...t){this.events[e]&&this.events[e].forEach((function(e){e(...t)}))}}t["Z"]=new r},8395:function(e,t,n){n(7658);var r=n(9242),o=n(3396);function i(e,t,n,r,i,s){const a=(0,o.up)("router-view");return(0,o.wg)(),(0,o.j4)(a)}var s={mounted(){let e=document.createElement("script");e.setAttribute("src","https://telegram.org/js/telegram-web-app.js"),document.head.appendChild(e);let t=document.createElement("meta");t.setAttribute("name","viewport"),t.setAttribute("content","width=device-width, user-scalable=no"),document.head.appendChild(t)}},a=n(89);const u=(0,a.Z)(s,[["render",i]]);var c=u,l=n(2483);const d=[{path:"/",name:"home",redirect:"/results/1",children:[{path:"/results/:userId",name:"Results",component:()=>n.e(507).then(n.bind(n,4507))},{path:"/basket",name:"Basket",component:()=>n.e(497).then(n.bind(n,2497))},{path:"/items/:id",name:"Items",component:()=>n.e(110).then(n.bind(n,7110))}]}],f=(0,l.p7)({history:(0,l.PO)("/colorsfront/"),routes:d,scrollBehavior(){return{top:0}}});var p=f,h=n(65),m=(0,h.MT)({state:{restAddr:"https://92.255.79.59/colorsserver/api",sidebarVisible:"",sidebarUnfoldable:!1,searchQuery:"",userId:null,filters:{}},mutations:{toggleSidebar(e){e.sidebarVisible=!e.sidebarVisible},toggleUnfoldable(e){e.sidebarUnfoldable=!e.sidebarUnfoldable},updateSidebarVisible(e,t){e.sidebarVisible=t.value}},actions:{},modules:{}}),v=n(6265),b=n.n(v),g=n(8533),y=n(7123);const w=b().create({withCredentials:!0});m.state.myApi=w,y.Z.$on("noresponse",(e=>{if(e.response){if(console.log(e.response.data),console.log(e.response.status),!1===e.response?.data?.isAutenticated)return p.push("/login");alert("Сервер не отвечает. Код ошибки: "+(0!=e.response.status?e.response.status:404))}else alert("Сервер не отвечает")})),y.Z.$on("wrongInputData",(e=>{alert("Некорректно введенные данные")}));const _=(0,r.ri)(c);_.use(g.Z),_.use(m),_.use(p),_.mount("#app")}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={id:r,loaded:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.loaded=!0,i.exports}n.m=e,function(){var e=[];n.O=function(t,r,o,i){if(!r){var s=1/0;for(l=0;l<e.length;l++){r=e[l][0],o=e[l][1],i=e[l][2];for(var a=!0,u=0;u<r.length;u++)(!1&i||s>=i)&&Object.keys(n.O).every((function(e){return n.O[e](r[u])}))?r.splice(u--,1):(a=!1,i<s&&(s=i));if(a){e.splice(l--,1);var c=o();void 0!==c&&(t=c)}}return t}i=i||0;for(var l=e.length;l>0&&e[l-1][2]>i;l--)e[l]=e[l-1];e[l]=[r,o,i]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}}(),function(){n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(t,r){return n.f[r](e,t),t}),[]))}}(),function(){n.u=function(e){return"js/"+e+"."+{110:"23e9013c",497:"c6a9cc8b",507:"023330ef"}[e]+".js"}}(),function(){n.miniCssF=function(e){return"css/"+e+"."+{110:"5de92d8d",497:"a9b1c9a2",507:"ca5b4b88"}[e]+".css"}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="@coreui/coreui-free-vue-admin-template:";n.l=function(r,o,i,s){if(e[r])e[r].push(o);else{var a,u;if(void 0!==i)for(var c=document.getElementsByTagName("script"),l=0;l<c.length;l++){var d=c[l];if(d.getAttribute("src")==r||d.getAttribute("data-webpack")==t+i){a=d;break}}a||(u=!0,a=document.createElement("script"),a.charset="utf-8",a.timeout=120,n.nc&&a.setAttribute("nonce",n.nc),a.setAttribute("data-webpack",t+i),a.src=r),e[r]=[o];var f=function(t,n){a.onerror=a.onload=null,clearTimeout(p);var o=e[r];if(delete e[r],a.parentNode&&a.parentNode.removeChild(a),o&&o.forEach((function(e){return e(n)})),t)return t(n)},p=setTimeout(f.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=f.bind(null,a.onerror),a.onload=f.bind(null,a.onload),u&&document.head.appendChild(a)}}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e}}(),function(){n.p="/colorsfront/"}(),function(){var e=function(e,t,n,r){var o=document.createElement("link");o.rel="stylesheet",o.type="text/css";var i=function(i){if(o.onerror=o.onload=null,"load"===i.type)n();else{var s=i&&("load"===i.type?"missing":i.type),a=i&&i.target&&i.target.href||t,u=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");u.code="CSS_CHUNK_LOAD_FAILED",u.type=s,u.request=a,o.parentNode.removeChild(o),r(u)}};return o.onerror=o.onload=i,o.href=t,document.head.appendChild(o),o},t=function(e,t){for(var n=document.getElementsByTagName("link"),r=0;r<n.length;r++){var o=n[r],i=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(i===e||i===t))return o}var s=document.getElementsByTagName("style");for(r=0;r<s.length;r++){o=s[r],i=o.getAttribute("data-href");if(i===e||i===t)return o}},r=function(r){return new Promise((function(o,i){var s=n.miniCssF(r),a=n.p+s;if(t(s,a))return o();e(r,a,o,i)}))},o={143:0};n.f.miniCss=function(e,t){var n={110:1,497:1,507:1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=r(e).then((function(){o[e]=0}),(function(t){throw delete o[e],t})))}}(),function(){var e={143:0};n.f.j=function(t,r){var o=n.o(e,t)?e[t]:void 0;if(0!==o)if(o)r.push(o[2]);else{var i=new Promise((function(n,r){o=e[t]=[n,r]}));r.push(o[2]=i);var s=n.p+n.u(t),a=new Error,u=function(r){if(n.o(e,t)&&(o=e[t],0!==o&&(e[t]=void 0),o)){var i=r&&("load"===r.type?"missing":r.type),s=r&&r.target&&r.target.src;a.message="Loading chunk "+t+" failed.\n("+i+": "+s+")",a.name="ChunkLoadError",a.type=i,a.request=s,o[1](a)}};n.l(s,u,"chunk-"+t,t)}},n.O.j=function(t){return 0===e[t]};var t=function(t,r){var o,i,s=r[0],a=r[1],u=r[2],c=0;if(s.some((function(t){return 0!==e[t]}))){for(o in a)n.o(a,o)&&(n.m[o]=a[o]);if(u)var l=u(n)}for(t&&t(r);c<s.length;c++)i=s[c],n.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return n.O(l)},r=self["webpackChunk_coreui_coreui_free_vue_admin_template"]=self["webpackChunk_coreui_coreui_free_vue_admin_template"]||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var r=n.O(void 0,[998],(function(){return n(8395)}));r=n.O(r)})();
//# sourceMappingURL=app.3569b109.js.map
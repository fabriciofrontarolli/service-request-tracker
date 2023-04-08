"use strict";(self.webpackChunkemilus=self.webpackChunkemilus||[]).push([[767],{8470:function(e,t,n){n(2791);var r=n(184),a=function(e){var t=e.children,n=e.className,a=e.alignItems,o=e.justifyContent,i=e.mobileFlex,c=e.flexDirection,s=e.style;return(0,r.jsx)("div",{className:"".concat(i?"d-flex":"d-md-flex","\n\t\t\t\t").concat(n,"\n\t\t\t\t").concat(c?"flex-"+c:"","\n\t\t\t\t").concat(a?"align-items-"+a:"","\n\t\t\t\t").concat(o?"justify-content-"+o:""),style:s||{},children:t})};a.defaultProps={mobileFlex:!0,flexDirection:"row",className:""},t.Z=a},8429:function(e,t,n){var r=n(9439),a=n(613),o=n(1070),i={fetch:function(e,t,n){var o="?page=".concat(e,"&limit=").concat(t);n&&(o=Object.entries(n).reduce((function(e,t){var n=(0,r.Z)(t,2),a=n[0],o=n[1],i=encodeURIComponent(o.replace(/ /g,"%20"));return"".concat(e,"&").concat(a,"=").concat(i)}),o));return a.Z.get("/ordens-de-servico".concat(o))},get:function(e){if(e)return a.Z.get("/ordens-de-servico/".concat(e))},quadroLaboratorio:function(){return a.Z.get("/ordens-de-servico/quadro-laboratorio")},quadroCampo:function(){return a.Z.get("/ordens-de-servico/quadro-campo")},criar:function(e){return(0,o.Z)(e),(0,a.Z)({url:"/ordens-de-servico",method:"post",data:e})},salvar:function(e,t){return(0,a.Z)({url:"/ordens-de-servico/".concat(e),method:"put",data:t})}};t.Z=i},4206:function(e,t,n){var r=n(9439),a=n(613),o=n(1070),i={fetch:function(e,t,n){var o="?page=".concat(e,"&limit=").concat(t);n&&(o=Object.entries(n).reduce((function(e,t){var n=(0,r.Z)(t,2),a=n[0],o=n[1],i=encodeURIComponent(o.replace(/ /g,"%20"));return"".concat(e,"&").concat(a,"=").concat(i)}),o));return a.Z.get("/usuarios".concat(o))},get:function(e){if(e)return a.Z.get("/usuarios/".concat(e))},buscarTecnicos:function(){return a.Z.get("/usuarios/tecnicos")},criar:function(e){return(0,o.Z)(e),(0,a.Z)({url:"/usuarios",method:"post",data:e})},salvar:function(e,t){return(0,o.Z)(t),(0,a.Z)({url:"/usuarios/".concat(e),method:"put",data:t})},ativar:function(e){return(0,a.Z)({url:"/usuarios/".concat(e,"/ativar"),method:"put"})},desativar:function(e){return(0,a.Z)({url:"/usuarios/".concat(e,"/desativar"),method:"put"})}};t.Z=i},1070:function(e,t,n){n.d(t,{Z:function(){return r}});var r=function(e){Object.keys(e).forEach((function(t){null!==e[t]&&void 0!==e[t]&&""!==e[t]||delete e[t]}))}},2703:function(e,t,n){var r=n(5671),a=n(3144),o=function(){function e(){(0,r.Z)(this,e)}return(0,a.Z)(e,null,[{key:"getNameInitial",value:function(e){var t=e.match(/\b\w/g)||[];return((t.shift()||"")+(t.pop()||"")).toUpperCase()}},{key:"getRouteInfo",value:function(e,t){if(e.path===t)return e;var n;for(var r in e)if(e.hasOwnProperty(r)&&"object"===typeof e[r]&&(n=this.getRouteInfo(e[r],t)))return n;return n}},{key:"getColorContrast",value:function(e){if(!e)return"dark";var t=parseInt(a(e).substring(0,2),16),n=function(e){return parseInt(a(e).substring(2,4),16)}(e),r=function(e){return parseInt(a(e).substring(4,6),16)}(e);function a(e){return"#"===e.charAt(0)?e.substring(1,7):e}return(299*t+587*n+114*r)/1e3>130?"dark":"light"}},{key:"shadeColor",value:function(e,t){var n=parseInt(e.substring(1,3),16),r=parseInt(e.substring(3,5),16),a=parseInt(e.substring(5,7),16);n=parseInt(n*(100+t)/100),r=(r=parseInt(r*(100+t)/100))<255?r:255,a=(a=parseInt(a*(100+t)/100))<255?a:255;var o=1===(n=n<255?n:255).toString(16).length?"0".concat(n.toString(16)):n.toString(16),i=1===r.toString(16).length?"0".concat(r.toString(16)):r.toString(16),c=1===a.toString(16).length?"0".concat(a.toString(16)):a.toString(16);return"#".concat(o).concat(i).concat(c)}},{key:"rgbaToHex",value:function(e){var t=function(e){return e.replace(/^\s+|\s+$/gm,"")},n=e.substring(e.indexOf("(")).split(","),r=parseInt(t(n[0].substring(1)),10),a=parseInt(t(n[1]),10),o=parseInt(t(n[2]),10),i=parseFloat(t(n[3].substring(0,n[3].length-1))).toFixed(2),c=[r.toString(16),a.toString(16),o.toString(16),Math.round(255*i).toString(16).substring(0,2)];return c.forEach((function(e,t){1===e.length&&(c[t]="0"+e)})),"#".concat(c.join(""))}},{key:"getSignNum",value:function(e,t,n){return e>0?t:e<0?n:null}},{key:"antdTableSorter",value:function(e,t,n){return"number"===typeof e[n]&&"number"===typeof t[n]?e[n]-t[n]:"string"===typeof e[n]&&"string"===typeof t[n]?(e=e[n].toLowerCase())>(t=t[n].toLowerCase())?-1:t>e?1:0:void 0}},{key:"filterArray",value:function(e,t,n){var r=e;return e&&(r=e.filter((function(e){return e[t]===n}))),r}},{key:"deleteArrayRow",value:function(e,t,n){var r=e;return e&&(r=e.filter((function(e){return e[t]!==n}))),r}},{key:"wildCardSearch",value:function(e,t){return e=e.filter((function(e){return function(e){for(var n in e)if(null!=e[n]&&-1!==e[n].toString().toUpperCase().indexOf(t.toString().toUpperCase()))return!0}(e)}))}},{key:"getBreakPoint",value:function(e){var t=[];for(var n in e){if(e.hasOwnProperty(n))e[n]&&t.push(n)}return t}}]),e}();t.Z=o},7095:function(e,t,n){n.d(t,{$8:function(){return f},CR:function(){return r},K1:function(){return d},KE:function(){return u},QR:function(){return s},VP:function(){return o},Yi:function(){return i},an:function(){return l},dA:function(){return a},rj:function(){return c}});var r={id:"deddf150-e3a0-4a09-8b54-671df2ba6824",description:"Triagem"},a={id:"cbe8b932-90ca-4a5b-84e4-3aa91571a0cb",description:"Aberto"},o={id:"5c1795fd-8856-4c44-85fd-f1488cb5489b",description:"Em Atendimento"},i={id:"1cdf403c-9da1-4a8e-b2fc-3e356d9815ff",description:"Fechado"},c={id:"administrador",description:"Administrador"},s={id:"tecnico",description:"Tecnico"},u={id:"cliente",description:"Cliente"},l=[c,s,u],d=[r,a,o,i,{id:"4a48df79-a466-4bd0-83b9-3c94b2b76d7f",description:"Cobran\xe7a"},{id:"1050ced4-0599-456d-a614-932ab25aed99",description:"Arquivado"}],f=[{id:"f6d1944a-7569-4668-bae6-c6fe4f36eb29",description:"Laborat\xf3rio"},{id:"9957342c-815e-47b4-8d16-62fe4432ee59",description:"Campo"}]},767:function(e,t,n){n.r(t),n.d(t,{QuadroCampo:function(){return T},default:function(){return R}});var r=n(1413),a=n(4165),o=n(5861),i=n(9439),c=n(2791),s=n(1095),u=n(3085),l=n(7528),d=n(3707),f=n(6673),p=n(4415),m=n(7689),v=n(8470),g=n(8429),h=n(2273),b=n(8944),Z=n(1453),y=n(4210),x=n(4215),w=n(1885),C=n(2703),k=n(7095),j=n(5987),I=n(3734),O=(0,c.createContext)(),S=n(184),E=["editing","dataIndex","title","inputType","record","index","children"],P=I.Z.Option,z=function(e){var t=e.editing,n=e.dataIndex,a=(e.title,e.inputType,e.record),o=(e.index,e.children),i=(0,j.Z)(e,E),u=(0,c.useContext)(O),l=u.tecnicos,d=u.form,f=u.onFinish;return(0,S.jsx)("td",(0,r.Z)((0,r.Z)({},i),{},{children:t?(0,S.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[(0,S.jsx)(s.Z.Item,{name:n,style:{margin:0,marginRight:"0.3rem"},rules:[{required:!0,message:"Insira o tecnico!"}],children:(0,S.jsx)(I.Z,{value:"",allowClear:!0,onChange:function(){!function(){var e=d.getFieldValue("nome"),t=a.rawOrdem.id;f(t,{usuario_id:e})}()},showSearch:!0,optionFilterProp:"children",children:l.map((function(e){return(0,S.jsx)(P,{value:e.value,children:e.label},e.value)}))})}),(0,S.jsx)(s.Z.Item,{style:{width:"100%",display:"flex",justifyContent:"center",margin:0,padding:0}})]}):o}))},A=n(4206),F=function(e){return"Triagem"===e?"Triagem":"Aberto"===e?"Aguardando Atendimento":"Em Atendimento"===e?"Em Atendimento":"Cobran\xe7a"===e?"Cobran\xe7a":"Fechado"===e?"Fechado":""},T=function(){var e=s.Z.useForm(),t=(0,i.Z)(e,1)[0],n=(0,c.useState)([]),j=(0,i.Z)(n,2),I=j[0],E=j[1],P=(0,c.useState)([]),T=(0,i.Z)(P,2),R=T[0],_=T[1],N=(0,m.s0)(),L=(0,c.useState)(""),B=(0,i.Z)(L,2),M=B[0],q=B[1],D=function(e){return e.rawOrdem.id===M},V=function(){var e=(0,o.Z)((0,a.Z)().mark((function e(t,n){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g.Z.salvar(t,n);case 2:q(""),$(),"Tecnico atualizado",u.Z.success({message:"Tecnico atualizado"});case 6:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),U=function(){var e=(0,o.Z)((0,a.Z)().mark((function e(){var t,n;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,A.Z.buscarTecnicos();case 3:t=e.sent,n=t.data.map((function(e){return{value:e.id,label:e.nome}})),E(n),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log("err >> ",e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}(),$=function(){var e=(0,o.Z)((0,a.Z)().mark((function e(){var t,n;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,g.Z.quadroCampo();case 3:t=e.sent,n=t.data.map((function(e){return{id:e.numero,numero:e.numero,data:e.created_at,cliente:e.nome_fantasia,descricao:e.descricao,nome:e.nome,status:e.status_ordem_servico,rawOrdem:e}})),_(n),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(0),u.Z.error({message:"Erro ao buscar as ordens de servico (Campo)"}),console.log("err >> ",e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}(),H=function(){var e=(0,o.Z)((0,a.Z)().mark((function e(t){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:Q(t.rawOrdem,k.VP);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),K=function(){var e=(0,o.Z)((0,a.Z)().mark((function e(t){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:Q(t.rawOrdem,k.Yi);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Y=function(){var e=(0,o.Z)((0,a.Z)().mark((function e(t){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:Q(t.rawOrdem,k.dA);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Q=function(){var e=(0,o.Z)((0,a.Z)().mark((function e(t,n){var r;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,r={cliente_id:t.cliente_id,usuario_id:t.usuario_id,status_ordem_servico_id:n.id,tipo_ordem_servico_id:t.tipo_ordem_servico_id,solicitante:t.solicitante,descricao:t.descricao,solucao:t.solucao,observacao:t.observacao,consumo:t.consumo,assinatura:t.assinatura},e.next=4,g.Z.salvar(t.id,r);case 4:$(),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),u.Z.error({message:"Erro ao atualizar a ordem de servico ".concat(t.numero)});case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t,n){return e.apply(this,arguments)}}();(0,c.useEffect)((function(){$(),U();var e=setInterval((function(){$()}),12e4);return function(){clearInterval(e)}}),[]);var W=[{title:"OS",dataIndex:"numero",editable:!1},{title:"Data",dataIndex:"data",editable:!1,render:function(e,t){return(0,S.jsx)("span",{style:{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",display:"block"},children:new Intl.DateTimeFormat("pt-BR",{year:"numeric",month:"2-digit",day:"2-digit",hour:"numeric",minute:"numeric"}).format(new Date(t.data))})}},{title:"Cliente",dataIndex:"cliente",editable:!1},{title:"Problema",dataIndex:"descricao",editable:!1,render:function(e,t){return(0,S.jsx)("span",{style:{width:"18rem",display:"block",overflowWrap:"break-word"},children:t.descricao})}},{title:"Tecnico",dataIndex:"nome",editable:!0},{title:"Status",dataIndex:"status",editable:!1,render:function(e,t){return(0,S.jsx)(S.Fragment,{children:(0,S.jsx)(l.Z,{color:(n=t.status,"Triagem"===n?"red":"Aberto"===n?"yellow":"Em Atendimento"===n?"blue":"Cobran\xe7a"===n?"purple":"Fechado"===n?"green":""),children:F(t.status)})});var n},sorter:function(e,t){return C.Z.antdTableSorter(e,t,"status")}},{title:"Acao",key:"action",render:function(e,n){var r=D(n);return(0,S.jsx)(v.Z,{alignItems:"center",children:(0,S.jsxs)(v.Z,{flexDirection:"row",children:[(0,S.jsx)(d.Z,{type:"primary",shape:"round",icon:(0,S.jsx)(h.Z,{title:"Atender"}),title:"Atender",size:"middle",style:{marginRight:"0.7rem",border:"none"},onClick:function(e){e.stopPropagation(),H(n)}}),(0,S.jsx)(d.Z,{type:"primary",shape:"round",icon:(0,S.jsx)(b.Z,{title:"Fechar"}),title:"Fechar",size:"middle",style:{marginRight:"0.7rem",background:"#138f5b",border:"none"},onClick:function(e){e.stopPropagation(),K(n)}}),(0,S.jsx)(d.Z,{type:"primary",shape:"round",icon:(0,S.jsx)(Z.Z,{title:"Desistir"}),size:"middle",style:{marginRight:"0.7rem",border:"none",background:"#E45741"},onClick:function(e){e.stopPropagation(),Y(n)}}),(0,S.jsx)(d.Z,{type:"primary",shape:"round",icon:(0,S.jsx)(y.Z,{title:"Trocar Tecnico"}),size:"middle",style:{marginRight:"0.7rem",border:"none",background:"#27476E",color:"#fff"},onClick:function(e){e.stopPropagation(),r?q(""):function(e){q(e.rawOrdem.id),t.setFieldsValue({nome:e.nome})}(n)}}),(0,S.jsx)(d.Z,{type:"primary",shape:"round",icon:(0,S.jsx)(x.Z,{title:"Desistir"}),size:"middle",style:{marginRight:"0.7rem",border:"none",background:"#B2B09B",color:"#fff"},onClick:function(e){e.stopPropagation(),N("/app/dashboards/editar-ordem-de-servico/".concat(n.rawOrdem.id,"?previous=/app/quadros/campo"))}})]})})}}].map((function(e){return e.editable?(0,r.Z)((0,r.Z)({},e),{},{onCell:function(t){return{record:t,inputType:"age"===e.dataIndex?"number":"text",dataIndex:e.dataIndex,title:e.title,editing:D(t)}}}):e}));return(0,S.jsx)(S.Fragment,{children:(0,S.jsxs)(f.Z,{style:{overflowX:"scroll"},children:[(0,S.jsxs)(v.Z,{justifyContent:"center",alignItems:"center",children:[(0,S.jsx)("h1",{children:"CAMPO"}),(0,S.jsx)(w.Z,{size:"large",style:{fontSize:"24px",marginTop:"-10px",marginLeft:"1rem"}})]}),(0,S.jsx)(s.Z,{form:t,component:!1,onFinish:V,children:(0,S.jsx)(O.Provider,{value:{tecnicos:I,form:t,onFinish:V},children:(0,S.jsx)(p.Z,{pagination:!1,columns:W,dataSource:R,rowKey:"id",style:{cursor:"default"},component:!1,components:{body:{cell:z}}})})})]})})},R=T},1453:function(e,t,n){n.d(t,{Z:function(){return s}});var r=n(1413),a=n(2791),o={icon:{tag:"svg",attrs:{viewBox:"0 0 1024 1024",focusable:"false"},children:[{tag:"path",attrs:{d:"M517.6 273.5L230.2 499.3a16.14 16.14 0 000 25.4l287.4 225.8c10.7 8.4 26.4.8 26.4-12.7V286.2c0-13.5-15.7-21.1-26.4-12.7zm320 0L550.2 499.3a16.14 16.14 0 000 25.4l287.4 225.8c10.7 8.4 26.4.8 26.4-12.7V286.2c0-13.5-15.7-21.1-26.4-12.7zm-620-25.5h-51.2c-3.5 0-6.4 2.7-6.4 6v516c0 3.3 2.9 6 6.4 6h51.2c3.5 0 6.4-2.7 6.4-6V254c0-3.3-2.9-6-6.4-6z"}}]},name:"fast-backward",theme:"outlined"},i=n(4291),c=function(e,t){return a.createElement(i.Z,(0,r.Z)((0,r.Z)({},e),{},{ref:t,icon:o}))};c.displayName="FastBackwardOutlined";var s=a.forwardRef(c)},2273:function(e,t,n){n.d(t,{Z:function(){return s}});var r=n(1413),a=n(2791),o={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"}},{tag:"path",attrs:{d:"M719.4 499.1l-296.1-215A15.9 15.9 0 00398 297v430c0 13.1 14.8 20.5 25.3 12.9l296.1-215a15.9 15.9 0 000-25.8zm-257.6 134V390.9L628.5 512 461.8 633.1z"}}]},name:"play-circle",theme:"outlined"},i=n(4291),c=function(e,t){return a.createElement(i.Z,(0,r.Z)((0,r.Z)({},e),{},{ref:t,icon:o}))};c.displayName="PlayCircleOutlined";var s=a.forwardRef(c)},1885:function(e,t,n){n.d(t,{Z:function(){return s}});var r=n(1413),a=n(2791),o={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M876.6 239.5c-.5-.9-1.2-1.8-2-2.5-5-5-13.1-5-18.1 0L684.2 409.3l-67.9-67.9L788.7 169c.8-.8 1.4-1.6 2-2.5 3.6-6.1 1.6-13.9-4.5-17.5-98.2-58-226.8-44.7-311.3 39.7-67 67-89.2 162-66.5 247.4l-293 293c-3 3-2.8 7.9.3 11l169.7 169.7c3.1 3.1 8.1 3.3 11 .3l292.9-292.9c85.5 22.8 180.5.7 247.6-66.4 84.4-84.5 97.7-213.1 39.7-311.3zM786 499.8c-58.1 58.1-145.3 69.3-214.6 33.6l-8.8 8.8-.1-.1-274 274.1-79.2-79.2 230.1-230.1s0 .1.1.1l52.8-52.8c-35.7-69.3-24.5-156.5 33.6-214.6a184.2 184.2 0 01144-53.5L537 318.9a32.05 32.05 0 000 45.3l124.5 124.5a32.05 32.05 0 0045.3 0l132.8-132.8c3.7 51.8-14.4 104.8-53.6 143.9z"}}]},name:"tool",theme:"outlined"},i=n(4291),c=function(e,t){return a.createElement(i.Z,(0,r.Z)((0,r.Z)({},e),{},{ref:t,icon:o}))};c.displayName="ToolOutlined";var s=a.forwardRef(c)},4210:function(e,t,n){n.d(t,{Z:function(){return s}});var r=n(1413),a=n(2791),o={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"defs",attrs:{},children:[{tag:"style",attrs:{}}]},{tag:"path",attrs:{d:"M759 335c0-137-111-248-248-248S263 198 263 335c0 82.8 40.6 156.2 103 201.2-.4.2-.7.3-.9.4-44.7 18.9-84.8 46-119.3 80.6a373.42 373.42 0 00-80.4 119.5A373.6 373.6 0 00136 874.8a8 8 0 008 8.2h59.9c4.3 0 7.9-3.5 8-7.8 2-77.2 32.9-149.5 87.6-204.3C356 614.2 431 583 511 583c137 0 248-111 248-248zM511 507c-95 0-172-77-172-172s77-172 172-172 172 77 172 172-77 172-172 172zm105 221h264c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H703.5l47.2-60.1a8.1 8.1 0 001.7-4.9c0-4.4-3.6-8-8-8h-72.6c-4.9 0-9.5 2.3-12.6 6.1l-68.5 87.1c-4.4 5.6-6.8 12.6-6.8 19.8.1 17.7 14.4 32 32.1 32zm240 64H592c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h176.5l-47.2 60.1a8.1 8.1 0 00-1.7 4.9c0 4.4 3.6 8 8 8h72.6c4.9 0 9.5-2.3 12.6-6.1l68.5-87.1c4.4-5.6 6.8-12.6 6.8-19.8-.1-17.7-14.4-32-32.1-32z"}}]},name:"user-switch",theme:"outlined"},i=n(4291),c=function(e,t){return a.createElement(i.Z,(0,r.Z)((0,r.Z)({},e),{},{ref:t,icon:o}))};c.displayName="UserSwitchOutlined";var s=a.forwardRef(c)},7528:function(e,t,n){n.d(t,{Z:function(){return x}});var r=n(4942),a=n(7462),o=n(9439),i=n(732),c=n(1694),s=n.n(c),u=n(1818),l=n(2791),d=n(1929),f=n(4466),p=n(2833),m=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n},v=function(e){var t,n=e.prefixCls,o=e.className,i=e.checked,c=e.onChange,u=e.onClick,f=m(e,["prefixCls","className","checked","onChange","onClick"]),p=(0,l.useContext(d.E_).getPrefixCls)("tag",n),v=s()(p,(t={},(0,r.Z)(t,"".concat(p,"-checkable"),!0),(0,r.Z)(t,"".concat(p,"-checkable-checked"),i),t),o);return l.createElement("span",(0,a.Z)({},f,{className:v,onClick:function(e){null===c||void 0===c||c(!i),null===u||void 0===u||u(e)}}))},g=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n},h=new RegExp("^(".concat(f.Y.join("|"),")(-inverse)?$")),b=new RegExp("^(".concat(f.E.join("|"),")$")),Z=function(e,t){var n,c=e.prefixCls,f=e.className,m=e.style,v=e.children,Z=e.icon,y=e.color,x=e.onClose,w=e.closeIcon,C=e.closable,k=void 0!==C&&C,j=g(e,["prefixCls","className","style","children","icon","color","onClose","closeIcon","closable"]),I=l.useContext(d.E_),O=I.getPrefixCls,S=I.direction,E=l.useState(!0),P=(0,o.Z)(E,2),z=P[0],A=P[1];l.useEffect((function(){"visible"in j&&A(j.visible)}),[j.visible]);var F=function(){return!!y&&(h.test(y)||b.test(y))},T=(0,a.Z)({backgroundColor:y&&!F()?y:void 0},m),R=F(),_=O("tag",c),N=s()(_,(n={},(0,r.Z)(n,"".concat(_,"-").concat(y),R),(0,r.Z)(n,"".concat(_,"-has-color"),y&&!R),(0,r.Z)(n,"".concat(_,"-hidden"),!z),(0,r.Z)(n,"".concat(_,"-rtl"),"rtl"===S),n),f),L=function(e){e.stopPropagation(),null===x||void 0===x||x(e),e.defaultPrevented||"visible"in j||A(!1)},B="onClick"in j||v&&"a"===v.type,M=(0,u.Z)(j,["visible"]),q=Z||null,D=q?l.createElement(l.Fragment,null,q,l.createElement("span",null,v)):v,V=l.createElement("span",(0,a.Z)({},M,{ref:t,className:N,style:T}),D,k?w?l.createElement("span",{className:"".concat(_,"-close-icon"),onClick:L},w):l.createElement(i.Z,{className:"".concat(_,"-close-icon"),onClick:L}):null);return B?l.createElement(p.Z,null,V):V},y=l.forwardRef(Z);y.CheckableTag=v;var x=y}}]);
//# sourceMappingURL=767.968913dc.chunk.js.map
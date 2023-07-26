"use strict";(self.webpackChunkemilus=self.webpackChunkemilus||[]).push([[688],{8470:function(e,t,n){n(2791);var r=n(184),i=function(e){var t=e.children,n=e.className,i=e.alignItems,o=e.justifyContent,a=e.mobileFlex,c=e.flexDirection,u=e.style;return(0,r.jsx)("div",{className:"".concat(a?"d-flex":"d-md-flex","\n\t\t\t\t").concat(n,"\n\t\t\t\t").concat(c?"flex-"+c:"","\n\t\t\t\t").concat(i?"align-items-"+i:"","\n\t\t\t\t").concat(o?"justify-content-"+o:""),style:u||{},children:t})};i.defaultProps={mobileFlex:!0,flexDirection:"row",className:""},t.Z=i},8429:function(e,t,n){var r=n(9439),i=n(613),o=n(1070),a={fetch:function(e,t,n){var o="?page=".concat(e,"&limit=").concat(t);n&&(o=Object.entries(n).reduce((function(e,t){var n=(0,r.Z)(t,2),i=n[0],o=n[1],a=encodeURIComponent(o.replace(/ /g,"%20"));return"".concat(e,"&").concat(i,"=").concat(a)}),o));return i.Z.get("/ordens-de-servico".concat(o))},get:function(e){if(e)return i.Z.get("/ordens-de-servico/".concat(e))},quadroLaboratorio:function(){return i.Z.get("/ordens-de-servico/quadro-laboratorio")},quadroCampo:function(){return i.Z.get("/ordens-de-servico/quadro-campo")},criar:function(e){return(0,o.Z)(e),(0,i.Z)({url:"/ordens-de-servico",method:"post",data:e})},salvar:function(e,t){return(0,i.Z)({url:"/ordens-de-servico/".concat(e),method:"put",data:t})}};t.Z=a},4206:function(e,t,n){var r=n(9439),i=n(613),o=n(1070),a={fetch:function(e,t,n){var o="?page=".concat(e,"&limit=").concat(t);n&&(o=Object.entries(n).reduce((function(e,t){var n=(0,r.Z)(t,2),i=n[0],o=n[1],a=encodeURIComponent(o.replace(/ /g,"%20"));return"".concat(e,"&").concat(i,"=").concat(a)}),o));return i.Z.get("/usuarios".concat(o))},get:function(e){if(e)return i.Z.get("/usuarios/".concat(e))},buscarTecnicos:function(){return i.Z.get("/usuarios/tecnicos")},criar:function(e){return(0,o.Z)(e),(0,i.Z)({url:"/usuarios",method:"post",data:e})},salvar:function(e,t){return(0,o.Z)(t),(0,i.Z)({url:"/usuarios/".concat(e),method:"put",data:t})},ativar:function(e){return(0,i.Z)({url:"/usuarios/".concat(e,"/ativar"),method:"put"})},desativar:function(e){return(0,i.Z)({url:"/usuarios/".concat(e,"/desativar"),method:"put"})}};t.Z=a},1070:function(e,t,n){n.d(t,{Z:function(){return r}});var r=function(e){Object.keys(e).forEach((function(t){null!==e[t]&&void 0!==e[t]&&""!==e[t]||delete e[t]}))}},2703:function(e,t,n){var r=n(5671),i=n(3144),o=function(){function e(){(0,r.Z)(this,e)}return(0,i.Z)(e,null,[{key:"getNameInitial",value:function(e){var t=e.match(/\b\w/g)||[];return((t.shift()||"")+(t.pop()||"")).toUpperCase()}},{key:"getRouteInfo",value:function(e,t){if(e.path===t)return e;var n;for(var r in e)if(e.hasOwnProperty(r)&&"object"===typeof e[r]&&(n=this.getRouteInfo(e[r],t)))return n;return n}},{key:"getColorContrast",value:function(e){if(!e)return"dark";var t=parseInt(i(e).substring(0,2),16),n=function(e){return parseInt(i(e).substring(2,4),16)}(e),r=function(e){return parseInt(i(e).substring(4,6),16)}(e);function i(e){return"#"===e.charAt(0)?e.substring(1,7):e}return(299*t+587*n+114*r)/1e3>130?"dark":"light"}},{key:"shadeColor",value:function(e,t){var n=parseInt(e.substring(1,3),16),r=parseInt(e.substring(3,5),16),i=parseInt(e.substring(5,7),16);n=parseInt(n*(100+t)/100),r=(r=parseInt(r*(100+t)/100))<255?r:255,i=(i=parseInt(i*(100+t)/100))<255?i:255;var o=1===(n=n<255?n:255).toString(16).length?"0".concat(n.toString(16)):n.toString(16),a=1===r.toString(16).length?"0".concat(r.toString(16)):r.toString(16),c=1===i.toString(16).length?"0".concat(i.toString(16)):i.toString(16);return"#".concat(o).concat(a).concat(c)}},{key:"rgbaToHex",value:function(e){var t=function(e){return e.replace(/^\s+|\s+$/gm,"")},n=e.substring(e.indexOf("(")).split(","),r=parseInt(t(n[0].substring(1)),10),i=parseInt(t(n[1]),10),o=parseInt(t(n[2]),10),a=parseFloat(t(n[3].substring(0,n[3].length-1))).toFixed(2),c=[r.toString(16),i.toString(16),o.toString(16),Math.round(255*a).toString(16).substring(0,2)];return c.forEach((function(e,t){1===e.length&&(c[t]="0"+e)})),"#".concat(c.join(""))}},{key:"getSignNum",value:function(e,t,n){return e>0?t:e<0?n:null}},{key:"antdTableSorter",value:function(e,t,n){return"number"===typeof e[n]&&"number"===typeof t[n]?e[n]-t[n]:"string"===typeof e[n]&&"string"===typeof t[n]?(e=e[n].toLowerCase())>(t=t[n].toLowerCase())?-1:t>e?1:0:void 0}},{key:"filterArray",value:function(e,t,n){var r=e;return e&&(r=e.filter((function(e){return e[t]===n}))),r}},{key:"deleteArrayRow",value:function(e,t,n){var r=e;return e&&(r=e.filter((function(e){return e[t]!==n}))),r}},{key:"wildCardSearch",value:function(e,t){return e=e.filter((function(e){return function(e){for(var n in e)if(null!=e[n]&&-1!==e[n].toString().toUpperCase().indexOf(t.toString().toUpperCase()))return!0}(e)}))}},{key:"getBreakPoint",value:function(e){var t=[];for(var n in e){if(e.hasOwnProperty(n))e[n]&&t.push(n)}return t}}]),e}();t.Z=o},7095:function(e,t,n){n.d(t,{$8:function(){return f},CR:function(){return r},K1:function(){return l},KE:function(){return s},QR:function(){return u},VP:function(){return o},Yi:function(){return a},an:function(){return d},dA:function(){return i},rj:function(){return c}});var r={id:"deddf150-e3a0-4a09-8b54-671df2ba6824",description:"Triagem"},i={id:"cbe8b932-90ca-4a5b-84e4-3aa91571a0cb",description:"Aberto"},o={id:"5c1795fd-8856-4c44-85fd-f1488cb5489b",description:"Em Atendimento"},a={id:"1cdf403c-9da1-4a8e-b2fc-3e356d9815ff",description:"Fechado"},c={id:"administrador",description:"Administrador"},u={id:"tecnico",description:"Tecnico"},s={id:"cliente",description:"Cliente"},d=[c,u,s],l=[r,i,o,a,{id:"4a48df79-a466-4bd0-83b9-3c94b2b76d7f",description:"Cobran\xe7a"},{id:"1050ced4-0599-456d-a614-932ab25aed99",description:"Arquivado"}],f=[{id:"f6d1944a-7569-4668-bae6-c6fe4f36eb29",description:"Laborat\xf3rio"},{id:"9957342c-815e-47b4-8d16-62fe4432ee59",description:"Campo"}]},6688:function(e,t,n){n.r(t),n.d(t,{QuandoLeboratorio:function(){return L},default:function(){return q}});var r=n(1413),i=n(4165),o=n(5861),a=n(9439),c=n(2791),u=n(1095),s=n(3085),d=n(7528),l=n(3707),f=n(6673),p=n(4415),m=n(7689),g=n(8470),v=n(8429),h=n(2273),b=n(8944),Z=n(1453),x=n(4210),y=n(4215),w=n(1885),j=n(2703),k=n(7095),I=n(5987),C=n(3734),S=n(3344),T=n(940),A=n(7575),O=(0,c.createContext)(),F=n(184),_=["editing","dataIndex","title","inputType","record","index","children"],R=C.Z.Option,P=function(e){var t=e.editing,n=e.dataIndex,i=(e.title,e.inputType),o=e.record,a=(e.index,e.children),s=(0,I.Z)(e,_),d=(0,c.useContext)(O),f=d.tecnicos,p=d.form,m=d.onFinish;"number"===i?S.Z:T.Z;return(0,F.jsx)("td",(0,r.Z)((0,r.Z)({},s),{},{children:t?(0,F.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[(0,F.jsx)(u.Z.Item,{name:n,style:{margin:0,marginRight:"0.3rem"},rules:[{required:!0,message:"Insira o tecnico!"}],children:(0,F.jsx)(C.Z,{value:"",onChange:function(){},showSearch:!0,optionFilterProp:"children",style:{width:"120px"},children:f.map((function(e){return(0,F.jsx)(R,{value:e.value,children:e.label},e.value)}))})}),(0,F.jsx)(u.Z.Item,{style:{width:"100%",display:"flex",justifyContent:"center",margin:0,padding:0},children:(0,F.jsx)(l.Z,{type:"primary",htmlType:"submit",onClick:function(){return function(){var e=p.getFieldValue("nome"),t=o.rawOrdem,n=t.id;t.numero,t.created_at,m(n,{usuario_id:e})}()},children:(0,F.jsx)(A.Z,{})})})]}):a}))},E=n(4206),z=function(e){return"Triagem"===e?"Triagem":"Aberto"===e?"Aguardando Atendimento":"Em Atendimento"===e?"Em Atendimento":"Cobran\xe7a"===e?"Cobran\xe7a":"Fechado"===e?"Fechado":""},L=function(){var e=u.Z.useForm(),t=(0,a.Z)(e,1)[0],n=(0,c.useState)([]),I=(0,a.Z)(n,2),C=I[0],S=I[1],T=(0,c.useState)([]),A=(0,a.Z)(T,2),_=A[0],R=A[1],L=(0,m.s0)(),q=(0,c.useState)(""),D=(0,a.Z)(q,2),B=D[0],N=D[1],U=function(e){return e.rawOrdem.id===B},V=function(){var e=(0,o.Z)((0,i.Z)().mark((function e(t,n){return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.Z.salvar(t,n);case 2:N(""),Q(),"Tecnico atualizado",s.Z.success({message:"Tecnico atualizado"});case 6:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),K=function(){var e=(0,o.Z)((0,i.Z)().mark((function e(){var t,n;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,E.Z.buscarTecnicos();case 3:t=e.sent,n=t.data.map((function(e){return{value:e.id,label:e.nome}})),S(n),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log("err >> ",e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}(),Q=function(){var e=(0,o.Z)((0,i.Z)().mark((function e(){var t,n;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,v.Z.quadroLaboratorio();case 3:t=e.sent,n=t.data.map((function(e){return{id:e.numero,numero:e.numero,data:e.created_at,cliente:e.nome_fantasia,descricao:e.descricao,nome:e.nome,status:e.status_ordem_servico,rawOrdem:e}})),R(n),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),s.Z.error({message:"Erro ao buscar as ordens de servico (Laboratorio)"});case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}(),Y=function(){var e=(0,o.Z)((0,i.Z)().mark((function e(t){return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:M(t.rawOrdem,k.VP);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),$=function(){var e=(0,o.Z)((0,i.Z)().mark((function e(t){return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:M(t.rawOrdem,k.Yi);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),H=function(){var e=(0,o.Z)((0,i.Z)().mark((function e(t){return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:M(t.rawOrdem,k.dA);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),M=function(){var e=(0,o.Z)((0,i.Z)().mark((function e(t,n){var r;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,r={cliente_id:t.cliente_id,usuario_id:t.usuario_id,status_ordem_servico_id:n.id,tipo_ordem_servico_id:t.tipo_ordem_servico_id,solicitante:t.solicitante,descricao:t.descricao,solucao:t.solucao,observacao:t.observacao,consumo:t.consumo,assinatura:t.assinatura},e.next=4,v.Z.salvar(t.id,r);case 4:Q(),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),s.Z.error({message:"Erro ao atualizar a ordem de servico ".concat(t.numero)});case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t,n){return e.apply(this,arguments)}}();(0,c.useEffect)((function(){Q(),K();var e=setInterval((function(){Q()}),12e4);return function(){clearInterval(e)}}),[]);var W=[{title:"OS",dataIndex:"numero",editable:!1},{title:"Data",dataIndex:"data",editable:!1,render:function(e,t){return(0,F.jsx)("span",{style:{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",display:"block"},children:new Intl.DateTimeFormat("pt-BR",{year:"numeric",month:"2-digit",day:"2-digit",hour:"numeric",minute:"numeric"}).format(new Date(t.data))})}},{title:"Cliente",dataIndex:"cliente",editable:!1},{title:"Problema",dataIndex:"descricao",editable:!1,render:function(e,t){return(0,F.jsx)("span",{style:{width:"18rem",display:"block",overflowWrap:"break-word"},children:t.descricao})}},{title:"Tecnico",width:"150px",dataIndex:"nome",editable:!0},{title:"Status",dataIndex:"status",editable:!1,render:function(e,t){return(0,F.jsx)(F.Fragment,{children:(0,F.jsx)(d.Z,{color:(n=t.status,"Triagem"===n?"red":"Aberto"===n?"yellow":"Em Atendimento"===n?"blue":"Cobran\xe7a"===n?"purple":"Fechado"===n?"green":""),children:z(t.status)})});var n},sorter:function(e,t){return j.Z.antdTableSorter(e,t,"status")}},{title:"Acao",key:"action",render:function(e,n){var r=U(n);return(0,F.jsx)(g.Z,{alignItems:"center",children:(0,F.jsxs)(g.Z,{flexDirection:"row",children:[(0,F.jsx)(l.Z,{type:"primary",shape:"round",icon:(0,F.jsx)(h.Z,{title:"Atender"}),title:"Atender",size:"middle",style:{marginRight:"0.7rem",border:"none"},onClick:function(e){e.stopPropagation(),Y(n)}}),(0,F.jsx)(l.Z,{type:"primary",shape:"round",icon:(0,F.jsx)(b.Z,{title:"Fechar"}),title:"Fechar",size:"middle",style:{marginRight:"0.7rem",background:"#138f5b",border:"none"},onClick:function(e){e.stopPropagation(),$(n)}}),(0,F.jsx)(l.Z,{type:"primary",shape:"round",icon:(0,F.jsx)(Z.Z,{title:"Desistir"}),size:"middle",style:{marginRight:"0.7rem",border:"none",background:"#E45741"},onClick:function(e){e.stopPropagation(),H(n)}}),(0,F.jsx)(l.Z,{type:"primary",shape:"round",icon:(0,F.jsx)(x.Z,{title:"Trocar Tecnico"}),size:"middle",style:{marginRight:"0.7rem",border:"none",background:"#27476E",color:"#fff"},onClick:function(e){e.stopPropagation(),r?N(""):function(e){N(e.rawOrdem.id),t.setFieldsValue({nome:e.nome})}(n)}}),(0,F.jsx)(l.Z,{type:"primary",shape:"round",icon:(0,F.jsx)(y.Z,{title:"Desistir"}),size:"middle",style:{marginRight:"0.7rem",border:"none",background:"#B2B09B",color:"#fff"},onClick:function(e){e.stopPropagation(),L("/app/dashboards/editar-ordem-de-servico/".concat(n.rawOrdem.id,"?previous=/app/quadros/laboratorio"))}})]})})}}].map((function(e){return e.editable?(0,r.Z)((0,r.Z)({},e),{},{onCell:function(t){return{record:t,inputType:"age"===e.dataIndex?"number":"text",dataIndex:e.dataIndex,title:e.title,editing:U(t)}}}):e}));return(0,F.jsx)(F.Fragment,{children:(0,F.jsxs)(f.Z,{style:{overflowX:"scroll"},children:[(0,F.jsxs)(g.Z,{justifyContent:"center",alignItems:"center",children:[(0,F.jsx)("h1",{children:"LABORATORIO"}),(0,F.jsx)(w.Z,{size:"large",style:{fontSize:"24px",marginTop:"-10px",marginLeft:"1rem"}})]}),(0,F.jsx)(u.Z,{form:t,component:!1,onFinish:V,children:(0,F.jsx)(O.Provider,{value:{tecnicos:C,form:t,onFinish:V},children:(0,F.jsx)(p.Z,{pagination:!1,columns:W,dataSource:_,rowKey:"id",style:{cursor:"default"},component:!1,components:{body:{cell:P}}})})})]})})},q=L}}]);
//# sourceMappingURL=688.cbf10998.chunk.js.map
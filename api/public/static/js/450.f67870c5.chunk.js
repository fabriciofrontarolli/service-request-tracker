"use strict";(self.webpackChunkemilus=self.webpackChunkemilus||[]).push([[450],{4206:function(e,t,r){var n=r(613),a=r(1070),i={fetch:function(e,t){return n.Z.get("/usuarios?page=".concat(e,"&limit=").concat(t))},get:function(e){if(e)return n.Z.get("/usuarios/".concat(e))},buscarTecnicos:function(){return n.Z.get("/usuarios/tecnicos")},criar:function(e){return(0,a.Z)(e),(0,n.Z)({url:"/usuarios",method:"post",data:e})},salvar:function(e,t){return(0,a.Z)(t),(0,n.Z)({url:"/usuarios/".concat(e),method:"put",data:t})},ativar:function(e){return(0,n.Z)({url:"/usuarios/".concat(e,"/ativar"),method:"put"})},desativar:function(e){return(0,n.Z)({url:"/usuarios/".concat(e,"/desativar"),method:"put"})}};t.Z=i},1070:function(e,t,r){r.d(t,{Z:function(){return n}});var n=function(e){Object.keys(e).forEach((function(t){null!==e[t]&&void 0!==e[t]&&""!==e[t]||delete e[t]}))}},2450:function(e,t,r){r.r(t),r.d(t,{UserList:function(){return q},default:function(){return Y}});var n=r(4165),a=r(5861),i=r(9439),c=r(2791),o=r(3085),s=r(5945),l=r(3707),u=r(6673),f=r(4415),d=r(9221),m=r(1413),p={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M705.6 124.9a8 8 0 00-11.6 7.2v64.2c0 5.5 2.9 10.6 7.5 13.6a352.2 352.2 0 0162.2 49.8c32.7 32.8 58.4 70.9 76.3 113.3a355 355 0 0127.9 138.7c0 48.1-9.4 94.8-27.9 138.7a355.92 355.92 0 01-76.3 113.3 353.06 353.06 0 01-113.2 76.4c-43.8 18.6-90.5 28-138.5 28s-94.7-9.4-138.5-28a353.06 353.06 0 01-113.2-76.4A355.92 355.92 0 01184 650.4a355 355 0 01-27.9-138.7c0-48.1 9.4-94.8 27.9-138.7 17.9-42.4 43.6-80.5 76.3-113.3 19-19 39.8-35.6 62.2-49.8 4.7-2.9 7.5-8.1 7.5-13.6V132c0-6-6.3-9.8-11.6-7.2C178.5 195.2 82 339.3 80 506.3 77.2 745.1 272.5 943.5 511.2 944c239 .5 432.8-193.3 432.8-432.4 0-169.2-97-315.7-238.4-386.7zM480 560h64c4.4 0 8-3.6 8-8V88c0-4.4-3.6-8-8-8h-64c-4.4 0-8 3.6-8 8v464c0 4.4 3.6 8 8 8z"}}]},name:"poweroff",theme:"outlined"},v=r(4291),g=function(e,t){return c.createElement(v.Z,(0,m.Z)((0,m.Z)({},e),{},{ref:t,icon:p}))};g.displayName="PoweroffOutlined";var x=c.forwardRef(g),h=r(2426),y=r.n(h),Z=r(7462),b=r(4942),E=r(1002),j=r(1694),C=r.n(j),w=r(8829),N=r(8834),O=r(1929),S=r(6226),k=r(8295),z=c.createContext("default"),P=function(e){var t=e.children,r=e.size;return c.createElement(z.Consumer,null,(function(e){return c.createElement(z.Provider,{value:r||e},t)}))},_=z,D=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(n=Object.getOwnPropertySymbols(e);a<n.length;a++)t.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(e,n[a])&&(r[n[a]]=e[n[a]])}return r},I=function(e,t){var r,n,a=c.useContext(_),o=c.useState(1),s=(0,i.Z)(o,2),l=s[0],u=s[1],f=c.useState(!1),d=(0,i.Z)(f,2),m=d[0],p=d[1],v=c.useState(!0),g=(0,i.Z)(v,2),x=g[0],h=g[1],y=c.useRef(null),j=c.useRef(null),z=(0,N.sQ)(t,y),P=c.useContext(O.E_).getPrefixCls,I=function(){if(j.current&&y.current){var t=j.current.offsetWidth,r=y.current.offsetWidth;if(0!==t&&0!==r){var n=e.gap,a=void 0===n?4:n;2*a<r&&u(r-2*a<t?(r-2*a)/t:1)}}};c.useEffect((function(){p(!0)}),[]),c.useEffect((function(){h(!0),u(1)}),[e.src]),c.useEffect((function(){I()}),[e.gap]);var T,R=e.prefixCls,L=e.shape,A=void 0===L?"circle":L,B=e.size,H=void 0===B?"default":B,M=e.src,V=e.srcSet,W=e.icon,F=e.className,Q=e.alt,U=e.draggable,G=e.children,J=e.crossOrigin,K=D(e,["prefixCls","shape","size","src","srcSet","icon","className","alt","draggable","children","crossOrigin"]),X="default"===H?a:H,q=Object.keys("object"===(0,E.Z)(X)&&X||{}).some((function(e){return["xs","sm","md","lg","xl","xxl"].includes(e)})),Y=(0,S.Z)(q),$=c.useMemo((function(){if("object"!==(0,E.Z)(X))return{};var e=k.c4.find((function(e){return Y[e]})),t=X[e];return t?{width:t,height:t,lineHeight:"".concat(t,"px"),fontSize:W?t/2:18}:{}}),[Y,X]),ee=P("avatar",R),te=C()((r={},(0,b.Z)(r,"".concat(ee,"-lg"),"large"===X),(0,b.Z)(r,"".concat(ee,"-sm"),"small"===X),r)),re=c.isValidElement(M),ne=C()(ee,te,(n={},(0,b.Z)(n,"".concat(ee,"-").concat(A),!!A),(0,b.Z)(n,"".concat(ee,"-image"),re||M&&x),(0,b.Z)(n,"".concat(ee,"-icon"),!!W),n),F),ae="number"===typeof X?{width:X,height:X,lineHeight:"".concat(X,"px"),fontSize:W?X/2:18}:{};if("string"===typeof M&&x)T=c.createElement("img",{src:M,draggable:U,srcSet:V,onError:function(){var t=e.onError;!1!==(t?t():void 0)&&h(!1)},alt:Q,crossOrigin:J});else if(re)T=M;else if(W)T=W;else if(m||1!==l){var ie="scale(".concat(l,") translateX(-50%)"),ce={msTransform:ie,WebkitTransform:ie,transform:ie},oe="number"===typeof X?{lineHeight:"".concat(X,"px")}:{};T=c.createElement(w.Z,{onResize:I},c.createElement("span",{className:"".concat(ee,"-string"),ref:j,style:(0,Z.Z)((0,Z.Z)({},oe),ce)},G))}else T=c.createElement("span",{className:"".concat(ee,"-string"),style:{opacity:0},ref:j},G);return delete K.onError,delete K.gap,c.createElement("span",(0,Z.Z)({},K,{style:(0,Z.Z)((0,Z.Z)((0,Z.Z)({},ae),$),K.style),className:ne,ref:z}),T)};var T=c.forwardRef(I),R=r(5501),L=function(e){return e?"function"===typeof e?e():e:null},A=r(9464),B=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(n=Object.getOwnPropertySymbols(e);a<n.length;a++)t.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(e,n[a])&&(r[n[a]]=e[n[a]])}return r},H=function(e){var t=e.title,r=e.content,n=e.prefixCls;return t||r?c.createElement(c.Fragment,null,t&&c.createElement("div",{className:"".concat(n,"-title")},L(t)),c.createElement("div",{className:"".concat(n,"-inner-content")},L(r))):null};var M=c.forwardRef((function(e,t){var r=e.prefixCls,n=e.title,a=e.content,i=e._overlay,o=e.placement,l=void 0===o?"top":o,u=e.trigger,f=void 0===u?"hover":u,d=e.mouseEnterDelay,m=void 0===d?.1:d,p=e.mouseLeaveDelay,v=void 0===p?.1:p,g=e.overlayStyle,x=void 0===g?{}:g,h=B(e,["prefixCls","title","content","_overlay","placement","trigger","mouseEnterDelay","mouseLeaveDelay","overlayStyle"]),y=c.useContext(O.E_).getPrefixCls,b=y("popover",r),E=y();return c.createElement(s.Z,(0,Z.Z)({placement:l,trigger:f,mouseEnterDelay:m,mouseLeaveDelay:v,overlayStyle:x},h,{prefixCls:b,ref:t,overlay:i||c.createElement(H,{prefixCls:b,title:n,content:a}),transitionName:(0,A.mL)(E,"zoom-big",h.transitionName)}))})),V=r(1113),W=function(e){var t=c.useContext(O.E_),r=t.getPrefixCls,n=t.direction,a=e.prefixCls,i=e.className,o=void 0===i?"":i,s=e.maxCount,l=e.maxStyle,u=e.size,f=r("avatar-group",a),d=C()(f,(0,b.Z)({},"".concat(f,"-rtl"),"rtl"===n),o),m=e.children,p=e.maxPopoverPlacement,v=void 0===p?"top":p,g=e.maxPopoverTrigger,x=void 0===g?"hover":g,h=(0,R.Z)(m).map((function(e,t){return(0,V.Tm)(e,{key:"avatar-key-".concat(t)})})),y=h.length;if(s&&s<y){var Z=h.slice(0,s),E=h.slice(s,y);return Z.push(c.createElement(M,{key:"avatar-popover-key",content:E,trigger:x,placement:v,overlayClassName:"".concat(f,"-popover")},c.createElement(T,{style:l},"+".concat(y-s)))),c.createElement(P,{size:u},c.createElement("div",{className:d,style:e.style},Z))}return c.createElement(P,{size:u},c.createElement("div",{className:d,style:e.style},h))},F=T;F.Group=W;var Q=F,U=r(184),G=function(e){return(0,U.jsx)(Q,(0,m.Z)((0,m.Z)({},e),{},{className:"ant-avatar-".concat(e.type),children:e.text}))},J=function(e){var t=e.name,r=e.suffix,n=e.subTitle,a=e.id,i=e.type,c=e.src,o=e.icon,s=e.size,l=e.shape,u=e.gap,f=e.text,d=e.onNameClick;return(0,U.jsxs)("div",{className:"avatar-status d-flex align-items-center",children:[c&&o&&G({icon:o,src:c,type:i,size:s,shape:l,gap:u,text:f}),(0,U.jsxs)("div",{className:"ml-2",children:[(0,U.jsxs)("div",{children:[d?(0,U.jsx)("div",{onClick:function(){return d({name:t,subTitle:n,src:c,id:a})},className:"avatar-status-name clickable",children:t}):(0,U.jsx)("div",{className:"avatar-status-name",children:t}),(0,U.jsx)("span",{children:r})]}),(0,U.jsx)("div",{className:"text-muted avatar-status-subtitle",children:n})]})]})},K=r(4206),X=r(7689),q=function(){var e=(0,c.useState)([]),t=(0,i.Z)(e,2),r=t[0],m=t[1],p=(0,c.useState)({page:1,limit:10,totalPages:1}),v=(0,i.Z)(p,2),g=v[0],h=v[1],Z=(0,X.s0)(),b=function(){var e=(0,a.Z)((0,n.Z)().mark((function e(){var t,r,a,i=arguments;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=i.length>0&&void 0!==i[0]?i[0]:g.page,r=i.length>1&&void 0!==i[1]?i[1]:g.limit,e.prev=2,e.next=5,K.Z.fetch(t,r);case 5:a=e.sent,m(a.data),h(a.pagination),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(2),o.Z.error({message:"Erro ao buscar lista de usuarios"});case 13:case"end":return e.stop()}}),e,null,[[2,10]])})));return function(){return e.apply(this,arguments)}}();(0,c.useEffect)((function(){b()}),[]);var E=function(){var e=(0,a.Z)((0,n.Z)().mark((function e(t){return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.is_ativo){e.next=5;break}return e.next=3,K.Z.desativar(t.id);case 3:e.next=7;break;case 5:return e.next=7,K.Z.ativar(t.id);case 7:b();case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),j=[{title:"Nome",dataIndex:"nome",render:function(e,t){return(0,U.jsx)("div",{className:"d-flex",children:(0,U.jsx)(J,{name:t.nome,subTitle:t.email})})},sorter:{compare:function(e,t){return(e=e.name.toLowerCase())>(t=t.name.toLowerCase())?-1:t>e?1:0}}},{title:"Perfil",dataIndex:"perfil"},{title:"Data Criacao",dataIndex:"created_at",render:function(e,t){return(0,U.jsx)("span",{children:new Intl.DateTimeFormat("pt-BR",{year:"numeric",month:"2-digit",day:"2-digit",hour:"numeric",minute:"numeric"}).format(new Date(t.created_at))})},sorter:function(e,t){return y()(e.created_at).unix()-y()(t.created_at).unix()}},{title:"Status",dataIndex:"is_ativo",render:function(e,t){return(0,U.jsx)("span",{children:t.is_ativo?"Ativado":"Desativado"})},sorter:function(e,t){return y()(e.created_at).unix()-y()(t.created_at).unix()}},{title:"Ativar/Desativar",dataIndex:"actions",render:function(e,t){return(0,U.jsx)("div",{className:"text-right d-flex justify-content",children:(0,U.jsx)(s.Z,{title:t.is_ativo?"Desativar":"Ativar",children:(0,U.jsx)(l.Z,{icon:(0,U.jsx)(x,{style:{color:t.is_ativo?"green":"red"}}),onClick:function(e){e.stopPropagation(),E(t)},size:"large"})})})}}];return(0,U.jsx)(u.Z,{title:"Usuarios",bodyStyle:{padding:"0px"},children:(0,U.jsxs)("div",{className:"table-responsive",children:[(0,U.jsx)(f.Z,{columns:j,dataSource:r,rowKey:"id",pagination:!1,style:{cursor:"pointer"},onRow:function(e,t){return{onClick:function(t){Z("/app/administrativo/editar-usuario/".concat(e.id))}}}}),(0,U.jsx)(d.Z,{defaultCurrent:parseInt(g.page),current:parseInt(g.page),pageSize:g.limit,total:g.total,style:{marginTop:"2.5rem",marginBottom:"2.5rem"},onChange:function(e,t){b(e,t)},size:"default",showSizeChanger:!0,showQuickJumper:!0})]})})},Y=q}}]);
//# sourceMappingURL=450.f67870c5.chunk.js.map
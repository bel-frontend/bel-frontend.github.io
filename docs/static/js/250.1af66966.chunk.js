"use strict";(self.webpackChunkbel_frontend=self.webpackChunkbel_frontend||[]).push([[250],{60165:function(e,n,t){t.d(n,{d:function(){return Z}});var i=t(74165),r=t(15861),a=t(29439),l=t(72791),s=t(93433),c=t(72685),o=t(44702),d=t(65390),u=(0,o.ZF)({apiKey:"AIzaSyCw3D0uzLYTCx7N8IQqP_v68le913Ha75U",authDomain:"bel-frontend.firebaseapp.com",projectId:"bel-frontend",messagingSenderId:"47972660046",appId:"1:47972660046:web:8f3adf6f5c9c16e542241f",measurementId:"G-REGR3FB1CP"}),v=((0,d.IH)(u),(0,c.N8)(u),function(e){return(JSON.parse(localStorage.getItem("user_liked_item")||"[]")||[]).find((function(n){return n===e}))}),f=function(e){var n=JSON.parse(localStorage.getItem("user_liked_item")||"[]")||[];localStorage.setItem("user_liked_item",JSON.stringify([].concat((0,s.Z)(n),[e])))},x=function(e){var n=JSON.parse(localStorage.getItem("user_liked_item")||"[]")||[];localStorage.setItem("user_liked_item",JSON.stringify((0,s.Z)(n.filter((function(n){return n!==e})))))},h=t(80186),m=t(36151),j=t(78687),p=t(80184),_=function(){return(0,p.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"white",children:(0,p.jsx)("path",{d:"M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"})})},b="style_count_likes__vb5OL",Z=function(e){var n=e.articleId,t=(e.className,e.likesCount),s=(0,j.I0)(),c=l.useState(t),o=(0,a.Z)(c,2),d=o[0],u=o[1];l.useEffect((function(){u(t)}),[t]);var Z=l.useCallback((0,r.Z)((0,i.Z)().mark((function e(){return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(v(n)){e.next=6;break}return e.next=3,s((0,h.Qf)({id:n},{onSuccess:function(e){var n=e.data;u(null===n||void 0===n?void 0:n.count)}}));case 3:f(n),e.next=9;break;case 6:return e.next=8,s((0,h.BD)({id:n},{onSuccess:function(e){var n=e.data;u(null===n||void 0===n?void 0:n.count)}}));case 8:x(n);case 9:case"end":return e.stop()}}),e)}))),[n]);return(0,p.jsxs)(m.Z,{color:"error",type:"button",variant:"contained",size:"small",onClick:Z,disableElevation:!0,children:[(0,p.jsx)(_,{}),(0,p.jsx)("span",{className:b,children:d})]})}},76180:function(e,n,t){t.d(n,{V:function(){return l}});t(72791);var i=t(81918),r="style_tag__vxBM0",a=t(80184),l=function(e){var n=e.children;return(0,a.jsx)(i.Z,{size:"small",className:r,label:n})}},90944:function(e,n,t){t.d(n,{MD:function(){return v}});var i=t(1413),r=t(45987),a=(t(72791),t(29390)),l=t(64209),s=t(94155),c=t(6125),o={container:"style_container__-J27M"},d=t(80184),u=["node","inline","className","children"],v=function(e){var n=e.children,t=e.className,v=void 0===t?"":t;return(0,d.jsx)(a.D,{className:[o.container,v].join(" "),remarkPlugins:[s.Z],components:{code:function(e){e.node;var n=e.inline,t=e.className,a=e.children,s=(0,r.Z)(e,u);return n?(0,d.jsx)("code",(0,i.Z)((0,i.Z)({className:t},s),{},{children:a})):(0,d.jsx)(l.Z,{language:"javascript",style:c.Z,children:String(a).replace(/\n$/,"")})}},children:n})}},61146:function(e,n,t){t.d(n,{U:function(){return d}});t(72791);var i=t(91523),r=t(60165),a=t(76180),l=t(36151),s=t(68870),c="style_episode_meta__kDtMn",o=t(80184),d=function(e){var n=e.meta,t=e.showReadButton,d=void 0===t||t,u=e.url,v=e.articleId,f=e.likes,x=e.showTags,h=void 0===x||x,m=n||{},j=m.author,p=void 0===j?"":j,_=m.dateArticle,b=void 0===_?"":_;return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)("div",{className:c,children:[d?(0,o.jsx)(i.rU,{to:u,children:(0,o.jsx)(l.Z,{variant:"contained",color:"primary",size:"small",disableElevation:!0,children:"\u0427\u044b\u0442\u0430\u0446\u044c"})}):null,d?(0,o.jsx)(r.d,{likesCount:f,articleId:v}):null]}),(0,o.jsx)("div",{children:h&&((null===n||void 0===n?void 0:n.tags.toString().split(","))||[]).map((function(e){return(0,o.jsx)(a.V,{children:e},e)}))}),(0,o.jsxs)(s.Z,{marginTop:1,children:[(0,o.jsx)("span",{className:"author",children:p}),",",(0,o.jsxs)("span",{className:"date-article",children:[" ",b]})]})]})}},81465:function(e,n,t){var i;t.d(n,{p:function(){return i}}),function(e){e.USER="USER",e.SUPERADMIN="SUPERADMIN"}(i||(i={}))},15762:function(e,n,t){t.d(n,{b:function(){return x}});var i=t(1413),r=(t(72791),t(61146)),a=t(91523),l=t(90944),s=t(19348),c=t(13400),o=t(41286),d=t(81918),u=t(81465),v={alfa:"style_alfa__0PwVD",deactivatedLink:"style_deactivatedLink__B+CHs"},f=t(80184),x=function(e){var n=e.meta,t=e.id,x=e.content,h=e.history,m=e.userIsAuth,j=e.isActive,p=e.likes,_=void 0===p?0:p,b=e.currentUser,Z=(0,s.YD)({threshold:0}),g=Z.ref,k=Z.entry,N=t?"/article/".concat(t):"/",I=n.user_id,S=b.role;return(0,f.jsx)("article",{className:"episode box",ref:g,children:(null===k||void 0===k?void 0:k.isIntersecting)&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)("div",{className:"article",children:[(0,f.jsxs)("h2",{className:"episode__title",children:[(0,f.jsx)(a.rU,{className:m&&!j?v.deactivatedLink:v.link,to:n?N:"/",children:n.title}),null!==n&&void 0!==n&&n.isPinned?(0,f.jsx)(d.Z,{sx:{ml:2,mr:2},label:"\u0417\u0430\u043c\u0430\u0446\u0430\u0432\u0430\u043d\u0430\u0435"}):null,m&&!j?(0,f.jsx)(d.Z,{sx:{ml:2,mr:2},label:"\u0412\u044b\u043a\u043b\u044e\u0447\u0430\u043d\u0430"}):null,!m||S!==u.p.SUPERADMIN&&I!==(null===b||void 0===b?void 0:b.user_id)?null:(0,f.jsx)(c.Z,{sx:{ml:1},color:"secondary",onClick:function(){h.push("/editor/".concat(t))},children:(0,f.jsx)(o.Z,{})})]}),(0,f.jsx)("div",{className:"content",children:(0,f.jsx)(l.MD,{children:x})})]}),(0,f.jsx)("div",{className:v.alfa}),(0,f.jsx)(r.U,{meta:(0,i.Z)({},n),likes:_,articleId:t,url:N})]})})}},78250:function(e,n,t){t.r(n),t.d(n,{default:function(){return Z}});var i=t(29439),r=t(1413),a=t(45987),l=t(72791),s=t(25228),c=t(43896),o=t(20890),d=t(68870),u=t(15762),v=t(52791),f=t(78687),x=t(80186),h=t(14357),m=t(80184),j=function(e){var n=e.history,t=(0,f.I0)(),i=(0,f.v9)(h.Lu),r=(0,f.v9)(x.Tk).articles,a=l.useMemo((function(){return r||[]}),[r]);return l.useEffect((function(){null!==i&&void 0!==i&&i.user_id&&t((0,x.He)({user_id:null===i||void 0===i?void 0:i.user_id}))}),[i]),(0,m.jsx)(v.Z,{sx:{maxWidth:"100%"},children:a.map((function(e,t){var r=e.content,a=e.meta,l=e.id,s=e.isActive,c=e.likes;return a?(0,m.jsx)(u.b,{currentUser:i,history:n,userIsAuth:!0,content:r,meta:a,id:l,isActive:s,likes:c},t):null}))})},p=["children","value","index"];function _(e){var n=e.children,t=e.value,i=e.index,l=(0,a.Z)(e,p);return(0,m.jsx)("div",(0,r.Z)((0,r.Z)({role:"tabpanel",hidden:t!==i,id:"vertical-tabpanel-".concat(i),"aria-labelledby":"vertical-tab-".concat(i)},l),{},{children:t===i&&(0,m.jsx)(d.Z,{sx:{p:3},children:(0,m.jsx)(o.Z,{children:n})})}))}function b(e){return{id:"vertical-tab-".concat(e),"aria-controls":"vertical-tabpanel-".concat(e)}}function Z(e){var n=e.history,t=l.useState(0),a=(0,i.Z)(t,2),o=a[0],u=a[1];return(0,m.jsxs)(d.Z,{sx:{flexGrow:1,bgcolor:"background.paper",display:"flex"},children:[(0,m.jsxs)(s.Z,{orientation:"vertical",variant:"scrollable",value:o,onChange:function(e,n){u(n)},"aria-label":"Vertical tabs example",sx:{borderRight:1,borderColor:"divider",minWidth:"150px"},children:[(0,m.jsx)(c.Z,(0,r.Z)({label:" \u041c\u0430\u0435 \u0430\u0440\u0442\u044b\u043a\u0443\u043b\u044b"},b(0))),(0,m.jsx)(c.Z,(0,r.Z)({label:"\u041d\u0430\u043b\u0430\u0434\u044b"},b(1)))]}),(0,m.jsx)(_,{value:o,index:0,children:(0,m.jsx)(j,{history:n})}),(0,m.jsx)(_,{value:o,index:1,children:"\u0422\u0443\u0442 \u0431\u0443\u0434\u0443\u0446\u044c \u043c\u0430\u0435 \u043d\u0430\u043b\u0430\u0434\u044b"})]})}}}]);
//# sourceMappingURL=250.1af66966.chunk.js.map
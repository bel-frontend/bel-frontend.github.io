"use strict";(self.webpackChunkbel_frontend=self.webpackChunkbel_frontend||[]).push([[970],{20970:function(e,t,r){r.r(t),r.d(t,{default:function(){return W}});var a=r(72791),n=r(35527),o=r(20890),i=r(90493),s=r(15021),c=r(4942),l=r(63366),d=r(87462),p=r(28182),u=r(94419),f=r(12065),v=r(66934),m=r(31402),y=r(23701),h=r(40162),g=r(42071),b=r(66199),Z=r(34065),x=r(80184),j=["alignItems","autoFocus","component","children","dense","disableGutters","divider","focusVisibleClassName","selected","className"],O=(0,v.ZP)(y.Z,{shouldForwardProp:function(e){return(0,v.FO)(e)||"classes"===e},name:"MuiListItemButton",slot:"Root",overridesResolver:function(e,t){var r=e.ownerState;return[t.root,r.dense&&t.dense,"flex-start"===r.alignItems&&t.alignItemsFlexStart,r.divider&&t.divider,!r.disableGutters&&t.gutters]}})((function(e){var t,r=e.theme,a=e.ownerState;return(0,d.Z)((t={display:"flex",flexGrow:1,justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minWidth:0,boxSizing:"border-box",textAlign:"left",paddingTop:8,paddingBottom:8,transition:r.transitions.create("background-color",{duration:r.transitions.duration.shortest}),"&:hover":{textDecoration:"none",backgroundColor:(r.vars||r).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}}},(0,c.Z)(t,"&.".concat(Z.Z.selected),(0,c.Z)({backgroundColor:r.vars?"rgba(".concat(r.vars.palette.primary.mainChannel," / ").concat(r.vars.palette.action.selectedOpacity,")"):(0,f.Fq)(r.palette.primary.main,r.palette.action.selectedOpacity)},"&.".concat(Z.Z.focusVisible),{backgroundColor:r.vars?"rgba(".concat(r.vars.palette.primary.mainChannel," / calc(").concat(r.vars.palette.action.selectedOpacity," + ").concat(r.vars.palette.action.focusOpacity,"))"):(0,f.Fq)(r.palette.primary.main,r.palette.action.selectedOpacity+r.palette.action.focusOpacity)})),(0,c.Z)(t,"&.".concat(Z.Z.selected,":hover"),{backgroundColor:r.vars?"rgba(".concat(r.vars.palette.primary.mainChannel," / calc(").concat(r.vars.palette.action.selectedOpacity," + ").concat(r.vars.palette.action.hoverOpacity,"))"):(0,f.Fq)(r.palette.primary.main,r.palette.action.selectedOpacity+r.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:r.vars?"rgba(".concat(r.vars.palette.primary.mainChannel," / ").concat(r.vars.palette.action.selectedOpacity,")"):(0,f.Fq)(r.palette.primary.main,r.palette.action.selectedOpacity)}}),(0,c.Z)(t,"&.".concat(Z.Z.focusVisible),{backgroundColor:(r.vars||r).palette.action.focus}),(0,c.Z)(t,"&.".concat(Z.Z.disabled),{opacity:(r.vars||r).palette.action.disabledOpacity}),t),a.divider&&{borderBottom:"1px solid ".concat((r.vars||r).palette.divider),backgroundClip:"padding-box"},"flex-start"===a.alignItems&&{alignItems:"flex-start"},!a.disableGutters&&{paddingLeft:16,paddingRight:16},a.dense&&{paddingTop:4,paddingBottom:4})})),w=a.forwardRef((function(e,t){var r=(0,m.Z)({props:e,name:"MuiListItemButton"}),n=r.alignItems,o=void 0===n?"center":n,i=r.autoFocus,s=void 0!==i&&i,c=r.component,f=void 0===c?"div":c,v=r.children,y=r.dense,w=void 0!==y&&y,I=r.disableGutters,k=void 0!==I&&I,M=r.divider,P=void 0!==M&&M,C=r.focusVisibleClassName,S=r.selected,L=void 0!==S&&S,T=r.className,N=(0,l.Z)(r,j),F=a.useContext(b.Z),R=a.useMemo((function(){return{dense:w||F.dense||!1,alignItems:o,disableGutters:k}}),[o,F.dense,w,k]),W=a.useRef(null);(0,h.Z)((function(){s&&W.current&&W.current.focus()}),[s]);var G=(0,d.Z)({},r,{alignItems:o,dense:R.dense,disableGutters:k,divider:P,selected:L}),_=function(e){var t=e.alignItems,r=e.classes,a=e.dense,n=e.disabled,o={root:["root",a&&"dense",!e.disableGutters&&"gutters",e.divider&&"divider",n&&"disabled","flex-start"===t&&"alignItemsFlexStart",e.selected&&"selected"]},i=(0,u.Z)(o,Z.t,r);return(0,d.Z)({},r,i)}(G),V=(0,g.Z)(W,t);return(0,x.jsx)(b.Z.Provider,{value:R,children:(0,x.jsx)(O,(0,d.Z)({ref:V,href:N.href||N.to,component:(N.href||N.to)&&"div"===f?"a":f,focusVisibleClassName:(0,p.Z)(_.focusVisible,C),ownerState:G,className:(0,p.Z)(_.root,T)},N,{classes:_,children:v}))})})),I=r(49900),k=r(96014),M=["className"],P=(0,v.ZP)("div",{name:"MuiListItemIcon",slot:"Root",overridesResolver:function(e,t){var r=e.ownerState;return[t.root,"flex-start"===r.alignItems&&t.alignItemsFlexStart]}})((function(e){var t=e.theme,r=e.ownerState;return(0,d.Z)({minWidth:56,color:(t.vars||t).palette.action.active,flexShrink:0,display:"inline-flex"},"flex-start"===r.alignItems&&{marginTop:8})})),C=a.forwardRef((function(e,t){var r=(0,m.Z)({props:e,name:"MuiListItemIcon"}),n=r.className,o=(0,l.Z)(r,M),i=a.useContext(b.Z),s=(0,d.Z)({},r,{alignItems:i.alignItems}),c=function(e){var t=e.alignItems,r=e.classes,a={root:["root","flex-start"===t&&"alignItemsFlexStart"]};return(0,u.Z)(a,k.f,r)}(s);return(0,x.jsx)(P,(0,d.Z)({className:(0,p.Z)(c.root,n),ownerState:s,ref:t},o))})),S=r(44281),L=r(56963),T=r(95221),N=r(56310),F=r(25758),R=[{text:"Email",Icon:S.Z,href:"mailto:goman.live.service@gmail.com",color:"#0081c5"},{text:"RSS",Icon:L.Z,href:"https://api.bel-frontend.online/rss",color:"rgb(253,102,0)"},{text:"\u0422\u044d\u043b\u0435\u0433\u0440\u0430\u043c",Icon:T.Z,href:"https://t.me/bel_frontend",color:"#00a8e5"},{text:"LinkedIn",Icon:N.Z,href:"https://www.linkedin.com/groups/14273255/",color:"#0072b0"},{text:"GitHub (\u0441\u044e\u0434\u044b \u0434\u0430\u0441\u044b\u043b\u0430\u0439\u0446\u0435 \u0442\u044d\u0445\u043d\u0456\u0447\u043d\u044b\u044f \u043f\u0430\u043c\u044b\u043b\u043a\u0456 \u0456 \u0437\u0430\u045e\u0432\u0430\u0433\u0456)",Icon:F.Z,href:"https://github.com/bel-frontend/bel-frontend.github.io/issues",color:"#1a1e22"}],W=function(){return(0,x.jsxs)(n.Z,{sx:{padding:2},children:[(0,x.jsx)(o.Z,{variant:"h1",sx:{paddingLeft:"30px",paddingBottom:"15px"},children:"\u041d\u0430\u0448\u044b \u043a\u0430\u043d\u0442\u0430\u043a\u0442\u044b"})," ",(0,x.jsx)(i.Z,{sx:{width:"100%",maxWidth:"100%",bgcolor:"background.paper"},children:R.map((function(e){var t=e.text,r=e.Icon,a=e.href,n=e.color;return(0,x.jsx)(s.ZP,{sx:{width:"100%"},children:(0,x.jsxs)(w,{component:"a",target:"_blank",href:a,children:[(0,x.jsx)(C,{children:(0,x.jsx)(r,{sx:{color:n}})}),(0,x.jsx)(I.Z,{primary:t})]})},t)}))})]})}},44281:function(e,t,r){var a=r(64836);t.Z=void 0;var n=a(r(45649)),o=r(80184),i=(0,n.default)((0,o.jsx)("path",{d:"M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"}),"Email");t.Z=i},25758:function(e,t,r){var a=r(64836);t.Z=void 0;!function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!==typeof e&&"function"!==typeof e)return{default:e};var r=i(t);if(r&&r.has(e))return r.get(e);var a={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if("default"!==o&&Object.prototype.hasOwnProperty.call(e,o)){var s=n?Object.getOwnPropertyDescriptor(e,o):null;s&&(s.get||s.set)?Object.defineProperty(a,o,s):a[o]=e[o]}a.default=e,r&&r.set(e,a)}(r(72791));var n=a(r(45649)),o=r(80184);function i(e){if("function"!==typeof WeakMap)return null;var t=new WeakMap,r=new WeakMap;return(i=function(e){return e?r:t})(e)}var s=(0,n.default)((0,o.jsx)("path",{d:"M12 1.27a11 11 0 00-3.48 21.46c.55.09.73-.28.73-.55v-1.84c-3.03.64-3.67-1.46-3.67-1.46-.55-1.29-1.28-1.65-1.28-1.65-.92-.65.1-.65.1-.65 1.1 0 1.73 1.1 1.73 1.1.92 1.65 2.57 1.2 3.21.92a2 2 0 01.64-1.47c-2.47-.27-5.04-1.19-5.04-5.5 0-1.1.46-2.1 1.2-2.84a3.76 3.76 0 010-2.93s.91-.28 3.11 1.1c1.8-.49 3.7-.49 5.5 0 2.1-1.38 3.02-1.1 3.02-1.1a3.76 3.76 0 010 2.93c.83.74 1.2 1.74 1.2 2.94 0 4.21-2.57 5.13-5.04 5.4.45.37.82.92.82 2.02v3.03c0 .27.1.64.73.55A11 11 0 0012 1.27"}),"GitHub");t.Z=s},56310:function(e,t,r){var a=r(64836);t.Z=void 0;!function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!==typeof e&&"function"!==typeof e)return{default:e};var r=i(t);if(r&&r.has(e))return r.get(e);var a={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if("default"!==o&&Object.prototype.hasOwnProperty.call(e,o)){var s=n?Object.getOwnPropertyDescriptor(e,o):null;s&&(s.get||s.set)?Object.defineProperty(a,o,s):a[o]=e[o]}a.default=e,r&&r.set(e,a)}(r(72791));var n=a(r(45649)),o=r(80184);function i(e){if("function"!==typeof WeakMap)return null;var t=new WeakMap,r=new WeakMap;return(i=function(e){return e?r:t})(e)}var s=(0,n.default)((0,o.jsx)("path",{d:"M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"}),"LinkedIn");t.Z=s},56963:function(e,t,r){var a=r(64836);t.Z=void 0;var n=a(r(45649)),o=r(80184),i=(0,n.default)([(0,o.jsx)("circle",{cx:"6.18",cy:"17.82",r:"2.18"},"0"),(0,o.jsx)("path",{d:"M4 4.44v2.83c7.03 0 12.73 5.7 12.73 12.73h2.83c0-8.59-6.97-15.56-15.56-15.56zm0 5.66v2.83c3.9 0 7.07 3.17 7.07 7.07h2.83c0-5.47-4.43-9.9-9.9-9.9z"},"1")],"RssFeed");t.Z=i},95221:function(e,t,r){var a=r(64836);t.Z=void 0;!function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!==typeof e&&"function"!==typeof e)return{default:e};var r=i(t);if(r&&r.has(e))return r.get(e);var a={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if("default"!==o&&Object.prototype.hasOwnProperty.call(e,o)){var s=n?Object.getOwnPropertyDescriptor(e,o):null;s&&(s.get||s.set)?Object.defineProperty(a,o,s):a[o]=e[o]}a.default=e,r&&r.set(e,a)}(r(72791));var n=a(r(45649)),o=r(80184);function i(e){if("function"!==typeof WeakMap)return null;var t=new WeakMap,r=new WeakMap;return(i=function(e){return e?r:t})(e)}var s=(0,n.default)((0,o.jsx)("path",{d:"M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"}),"Telegram");t.Z=s},49900:function(e,t,r){var a=r(4942),n=r(63366),o=r(87462),i=r(72791),s=r(28182),c=r(94419),l=r(20890),d=r(66199),p=r(31402),u=r(66934),f=r(29849),v=r(80184),m=["children","className","disableTypography","inset","primary","primaryTypographyProps","secondary","secondaryTypographyProps"],y=(0,u.ZP)("div",{name:"MuiListItemText",slot:"Root",overridesResolver:function(e,t){var r=e.ownerState;return[(0,a.Z)({},"& .".concat(f.Z.primary),t.primary),(0,a.Z)({},"& .".concat(f.Z.secondary),t.secondary),t.root,r.inset&&t.inset,r.primary&&r.secondary&&t.multiline,r.dense&&t.dense]}})((function(e){var t=e.ownerState;return(0,o.Z)({flex:"1 1 auto",minWidth:0,marginTop:4,marginBottom:4},t.primary&&t.secondary&&{marginTop:6,marginBottom:6},t.inset&&{paddingLeft:56})})),h=i.forwardRef((function(e,t){var r=(0,p.Z)({props:e,name:"MuiListItemText"}),a=r.children,u=r.className,h=r.disableTypography,g=void 0!==h&&h,b=r.inset,Z=void 0!==b&&b,x=r.primary,j=r.primaryTypographyProps,O=r.secondary,w=r.secondaryTypographyProps,I=(0,n.Z)(r,m),k=i.useContext(d.Z).dense,M=null!=x?x:a,P=O,C=(0,o.Z)({},r,{disableTypography:g,inset:Z,primary:!!M,secondary:!!P,dense:k}),S=function(e){var t=e.classes,r=e.inset,a=e.primary,n=e.secondary,o={root:["root",r&&"inset",e.dense&&"dense",a&&n&&"multiline"],primary:["primary"],secondary:["secondary"]};return(0,c.Z)(o,f.L,t)}(C);return null==M||M.type===l.Z||g||(M=(0,v.jsx)(l.Z,(0,o.Z)({variant:k?"body2":"body1",className:S.primary,component:null!=j&&j.variant?void 0:"span",display:"block"},j,{children:M}))),null==P||P.type===l.Z||g||(P=(0,v.jsx)(l.Z,(0,o.Z)({variant:"body2",className:S.secondary,color:"text.secondary",display:"block"},w,{children:P}))),(0,v.jsxs)(y,(0,o.Z)({className:(0,s.Z)(S.root,u),ownerState:C,ref:t},I,{children:[M,P]}))}));t.Z=h}}]);
//# sourceMappingURL=970.1584e870.chunk.js.map
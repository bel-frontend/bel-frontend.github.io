"use strict";(self.webpackChunkbel_frontend=self.webpackChunkbel_frontend||[]).push([[932],{30932:function(e,t,a){a.r(t),a.d(t,{default:function(){return q}});var n=a(72791),o=a(35527),r=a(20890),i=a(90493),s=a(4942),d=a(63366),c=a(87462),l=a(28182),p=a(94419),u=a(20627),m=a(12065),v=a(66934),y=a(31402),b=a(23701),g=a(19103),h=a(40162),Z=a(42071),f=a(66199),x=a(75878),C=a(21217);function S(e){return(0,C.Z)("MuiListItem",e)}var I=(0,x.Z)("MuiListItem",["root","container","focusVisible","dense","alignItemsFlexStart","disabled","divider","gutters","padding","button","secondaryAction","selected"]);var j=(0,x.Z)("MuiListItemButton",["root","focusVisible","dense","alignItemsFlexStart","disabled","divider","gutters","selected"]);function P(e){return(0,C.Z)("MuiListItemSecondaryAction",e)}(0,x.Z)("MuiListItemSecondaryAction",["root","disableGutters"]);var w=a(80184),k=["className"],A=(0,v.ZP)("div",{name:"MuiListItemSecondaryAction",slot:"Root",overridesResolver:function(e,t){var a=e.ownerState;return[t.root,a.disableGutters&&t.disableGutters]}})((function(e){var t=e.ownerState;return(0,c.Z)({position:"absolute",right:16,top:"50%",transform:"translateY(-50%)"},t.disableGutters&&{right:0})})),N=n.forwardRef((function(e,t){var a=(0,y.Z)({props:e,name:"MuiListItemSecondaryAction"}),o=a.className,r=(0,d.Z)(a,k),i=n.useContext(f.Z),s=(0,c.Z)({},a,{disableGutters:i.disableGutters}),u=function(e){var t=e.disableGutters,a=e.classes,n={root:["root",t&&"disableGutters"]};return(0,p.Z)(n,P,a)}(s);return(0,w.jsx)(A,(0,c.Z)({className:(0,l.Z)(u.root,o),ownerState:s,ref:t},r))}));N.muiName="ListItemSecondaryAction";var L=N,R=["className"],G=["alignItems","autoFocus","button","children","className","component","components","componentsProps","ContainerComponent","ContainerProps","dense","disabled","disableGutters","disablePadding","divider","focusVisibleClassName","secondaryAction","selected","slotProps","slots"],M=(0,v.ZP)("div",{name:"MuiListItem",slot:"Root",overridesResolver:function(e,t){var a=e.ownerState;return[t.root,a.dense&&t.dense,"flex-start"===a.alignItems&&t.alignItemsFlexStart,a.divider&&t.divider,!a.disableGutters&&t.gutters,!a.disablePadding&&t.padding,a.button&&t.button,a.hasSecondaryAction&&t.secondaryAction]}})((function(e){var t,a=e.theme,n=e.ownerState;return(0,c.Z)({display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",width:"100%",boxSizing:"border-box",textAlign:"left"},!n.disablePadding&&(0,c.Z)({paddingTop:8,paddingBottom:8},n.dense&&{paddingTop:4,paddingBottom:4},!n.disableGutters&&{paddingLeft:16,paddingRight:16},!!n.secondaryAction&&{paddingRight:48}),!!n.secondaryAction&&(0,s.Z)({},"& > .".concat(j.root),{paddingRight:48}),(t={},(0,s.Z)(t,"&.".concat(I.focusVisible),{backgroundColor:(a.vars||a).palette.action.focus}),(0,s.Z)(t,"&.".concat(I.selected),(0,s.Z)({backgroundColor:a.vars?"rgba(".concat(a.vars.palette.primary.mainChannel," / ").concat(a.vars.palette.action.selectedOpacity,")"):(0,m.Fq)(a.palette.primary.main,a.palette.action.selectedOpacity)},"&.".concat(I.focusVisible),{backgroundColor:a.vars?"rgba(".concat(a.vars.palette.primary.mainChannel," / calc(").concat(a.vars.palette.action.selectedOpacity," + ").concat(a.vars.palette.action.focusOpacity,"))"):(0,m.Fq)(a.palette.primary.main,a.palette.action.selectedOpacity+a.palette.action.focusOpacity)})),(0,s.Z)(t,"&.".concat(I.disabled),{opacity:(a.vars||a).palette.action.disabledOpacity}),t),"flex-start"===n.alignItems&&{alignItems:"flex-start"},n.divider&&{borderBottom:"1px solid ".concat((a.vars||a).palette.divider),backgroundClip:"padding-box"},n.button&&(0,s.Z)({transition:a.transitions.create("background-color",{duration:a.transitions.duration.shortest}),"&:hover":{textDecoration:"none",backgroundColor:(a.vars||a).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}}},"&.".concat(I.selected,":hover"),{backgroundColor:a.vars?"rgba(".concat(a.vars.palette.primary.mainChannel," / calc(").concat(a.vars.palette.action.selectedOpacity," + ").concat(a.vars.palette.action.hoverOpacity,"))"):(0,m.Fq)(a.palette.primary.main,a.palette.action.selectedOpacity+a.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:a.vars?"rgba(".concat(a.vars.palette.primary.mainChannel," / ").concat(a.vars.palette.action.selectedOpacity,")"):(0,m.Fq)(a.palette.primary.main,a.palette.action.selectedOpacity)}}),n.hasSecondaryAction&&{paddingRight:48})})),O=(0,v.ZP)("li",{name:"MuiListItem",slot:"Container",overridesResolver:function(e,t){return t.container}})({position:"relative"}),T=n.forwardRef((function(e,t){var a=(0,y.Z)({props:e,name:"MuiListItem"}),o=a.alignItems,r=void 0===o?"center":o,i=a.autoFocus,s=void 0!==i&&i,m=a.button,v=void 0!==m&&m,x=a.children,C=a.className,j=a.component,P=a.components,k=void 0===P?{}:P,A=a.componentsProps,N=void 0===A?{}:A,T=a.ContainerComponent,F=void 0===T?"li":T,V=a.ContainerProps,B=(void 0===V?{}:V).className,_=a.dense,q=void 0!==_&&_,D=a.disabled,W=void 0!==D&&D,z=a.disableGutters,E=void 0!==z&&z,Y=a.disablePadding,H=void 0!==Y&&Y,J=a.divider,K=void 0!==J&&J,Q=a.focusVisibleClassName,U=a.secondaryAction,X=a.selected,$=void 0!==X&&X,ee=a.slotProps,te=void 0===ee?{}:ee,ae=a.slots,ne=void 0===ae?{}:ae,oe=(0,d.Z)(a.ContainerProps,R),re=(0,d.Z)(a,G),ie=n.useContext(f.Z),se=n.useMemo((function(){return{dense:q||ie.dense||!1,alignItems:r,disableGutters:E}}),[r,ie.dense,q,E]),de=n.useRef(null);(0,h.Z)((function(){s&&de.current&&de.current.focus()}),[s]);var ce=n.Children.toArray(x),le=ce.length&&(0,g.Z)(ce[ce.length-1],["ListItemSecondaryAction"]),pe=(0,c.Z)({},a,{alignItems:r,autoFocus:s,button:v,dense:se.dense,disabled:W,disableGutters:E,disablePadding:H,divider:K,hasSecondaryAction:le,selected:$}),ue=function(e){var t=e.alignItems,a=e.button,n=e.classes,o=e.dense,r=e.disabled,i={root:["root",o&&"dense",!e.disableGutters&&"gutters",!e.disablePadding&&"padding",e.divider&&"divider",r&&"disabled",a&&"button","flex-start"===t&&"alignItemsFlexStart",e.hasSecondaryAction&&"secondaryAction",e.selected&&"selected"],container:["container"]};return(0,p.Z)(i,S,n)}(pe),me=(0,Z.Z)(de,t),ve=ne.root||k.Root||M,ye=te.root||N.root||{},be=(0,c.Z)({className:(0,l.Z)(ue.root,ye.className,C),disabled:W},re),ge=j||"li";return v&&(be.component=j||"div",be.focusVisibleClassName=(0,l.Z)(I.focusVisible,Q),ge=b.Z),le?(ge=be.component||j?ge:"div","li"===F&&("li"===ge?ge="div":"li"===be.component&&(be.component="div")),(0,w.jsx)(f.Z.Provider,{value:se,children:(0,w.jsxs)(O,(0,c.Z)({as:F,className:(0,l.Z)(ue.container,B),ref:me,ownerState:pe},oe,{children:[(0,w.jsx)(ve,(0,c.Z)({},ye,!(0,u.Z)(ve)&&{as:ge,ownerState:(0,c.Z)({},pe,ye.ownerState)},be,{children:ce})),ce.pop()]}))})):(0,w.jsx)(f.Z.Provider,{value:se,children:(0,w.jsxs)(ve,(0,c.Z)({},ye,{as:ge,ref:me},!(0,u.Z)(ve)&&{ownerState:(0,c.Z)({},pe,ye.ownerState)},be,{children:[ce,U&&(0,w.jsx)(L,{children:U})]}))})})),F=a(29849),V=["children","className","disableTypography","inset","primary","primaryTypographyProps","secondary","secondaryTypographyProps"],B=(0,v.ZP)("div",{name:"MuiListItemText",slot:"Root",overridesResolver:function(e,t){var a=e.ownerState;return[(0,s.Z)({},"& .".concat(F.Z.primary),t.primary),(0,s.Z)({},"& .".concat(F.Z.secondary),t.secondary),t.root,a.inset&&t.inset,a.primary&&a.secondary&&t.multiline,a.dense&&t.dense]}})((function(e){var t=e.ownerState;return(0,c.Z)({flex:"1 1 auto",minWidth:0,marginTop:4,marginBottom:4},t.primary&&t.secondary&&{marginTop:6,marginBottom:6},t.inset&&{paddingLeft:56})})),_=n.forwardRef((function(e,t){var a=(0,y.Z)({props:e,name:"MuiListItemText"}),o=a.children,i=a.className,s=a.disableTypography,u=void 0!==s&&s,m=a.inset,v=void 0!==m&&m,b=a.primary,g=a.primaryTypographyProps,h=a.secondary,Z=a.secondaryTypographyProps,x=(0,d.Z)(a,V),C=n.useContext(f.Z).dense,S=null!=b?b:o,I=h,j=(0,c.Z)({},a,{disableTypography:u,inset:v,primary:!!S,secondary:!!I,dense:C}),P=function(e){var t=e.classes,a=e.inset,n=e.primary,o=e.secondary,r={root:["root",a&&"inset",e.dense&&"dense",n&&o&&"multiline"],primary:["primary"],secondary:["secondary"]};return(0,p.Z)(r,F.L,t)}(j);return null==S||S.type===r.Z||u||(S=(0,w.jsx)(r.Z,(0,c.Z)({variant:C?"body2":"body1",className:P.primary,component:null!=g&&g.variant?void 0:"span",display:"block"},g,{children:S}))),null==I||I.type===r.Z||u||(I=(0,w.jsx)(r.Z,(0,c.Z)({variant:"body2",className:P.secondary,color:"text.secondary",display:"block"},Z,{children:I}))),(0,w.jsxs)(B,(0,c.Z)({className:(0,l.Z)(P.root,i),ownerState:j,ref:t},x,{children:[S,I]}))})),q=function(e){return(0,w.jsxs)(o.Z,{sx:{padding:2},children:[(0,w.jsx)(r.Z,{variant:"h1",children:"\u041d\u0430\u0448\u044b \u043a\u0430\u043d\u0442\u0430\u043a\u0442\u044b"})," ",(0,w.jsxs)(i.Z,{sx:{width:"100%",maxWidth:360,bgcolor:"background.paper"},children:[(0,w.jsx)(T,{children:(0,w.jsx)(_,{primary:"Email",secondary:(0,w.jsx)("a",{target:"_blank",href:"mailto:goman.live.service@gmail.com",children:"goman.live.service@gmail.com"})})}),(0,w.jsx)(T,{children:(0,w.jsx)(_,{primary:"\u0422\u044d\u043b\u0435\u0433\u0440\u0430\u043c",secondary:(0,w.jsx)("a",{target:"_blank",href:"https://t.me/bel_frontend",children:"\u0411\u0435\u043b\u0430\u0440\u0443\u0441\u043a\u0456 \u0444\u0440\u0430\u043d\u0442\u044d\u043d\u0434 \u0434\u044b \u0456\u043d\u0448\u0430\u044f \u0442\u0440\u0430\u0441\u0446\u0430"})})}),(0,w.jsx)(T,{children:(0,w.jsx)(_,{primary:"\u0422\u044d\u0445\u043d\u0456\u0447\u043d\u044b\u044f \u043f\u0430\u043c\u044b\u043b\u043a\u0456 \u0434\u0430\u0441\u044b\u043b\u0430\u0439\u0446\u0435:",secondary:(0,w.jsx)("a",{target:"_blank",href:"https://github.com/bel-frontend/bel-frontend.github.io/issues",children:"\u041d\u0430\u0448 \u0433\u0456\u0442\u0445\u0430\u0431"})})})]})]})}}}]);
//# sourceMappingURL=932.8a192581.chunk.js.map
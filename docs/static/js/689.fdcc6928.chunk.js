(self.webpackChunkbel_frontend=self.webpackChunkbel_frontend||[]).push([[689],{17399:function(e){e.exports={area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0}},37762:function(e,n,t){"use strict";t.d(n,{Z:function(){return o}});var r=t(40181);function o(e,n){var t="undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!t){if(Array.isArray(e)||(t=(0,r.Z)(e))||n&&e&&"number"===typeof e.length){t&&(e=t);var o=0,a=function(){};return{s:a,n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,u=!0,c=!1;return{s:function(){t=t.call(e)},n:function(){var e=t.next();return u=e.done,e},e:function(e){c=!0,i=e},f:function(){try{u||null==t.return||t.return()}finally{if(c)throw i}}}}},98737:function(e,n,t){"use strict";t.d(n,{Z:function(){return u}});var r=t(61120),o=t(89611);var a=t(78814);function i(e,n,t){return i=(0,a.Z)()?Reflect.construct.bind():function(e,n,t){var r=[null];r.push.apply(r,n);var a=new(Function.bind.apply(e,r));return t&&(0,o.Z)(a,t.prototype),a},i.apply(null,arguments)}function u(e){var n="function"===typeof Map?new Map:void 0;return u=function(e){if(null===e||(t=e,-1===Function.toString.call(t).indexOf("[native code]")))return e;var t;if("function"!==typeof e)throw new TypeError("Super expression must either be null or a function");if("undefined"!==typeof n){if(n.has(e))return n.get(e);n.set(e,a)}function a(){return i(e,arguments,(0,r.Z)(this).constructor)}return a.prototype=Object.create(e.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),(0,o.Z)(a,e)},u(e)}},39230:function(e,n,t){"use strict";t.d(n,{$G:function(){return k}});var r=t(72791);t(17399);Object.create(null);function o(){if(console&&console.warn){for(var e,n=arguments.length,t=new Array(n),r=0;r<n;r++)t[r]=arguments[r];"string"===typeof t[0]&&(t[0]="react-i18next:: ".concat(t[0])),(e=console).warn.apply(e,t)}}var a={};function i(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];"string"===typeof n[0]&&a[n[0]]||("string"===typeof n[0]&&(a[n[0]]=new Date),o.apply(void 0,n))}function u(e,n,t){e.loadNamespaces(n,(function(){if(e.isInitialized)t();else{e.on("initialized",(function n(){setTimeout((function(){e.off("initialized",n)}),0),t()}))}}))}var c=t(4942),s=/&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g,f={"&amp;":"&","&#38;":"&","&lt;":"<","&#60;":"<","&gt;":">","&#62;":">","&apos;":"'","&#39;":"'","&quot;":'"',"&#34;":'"',"&nbsp;":" ","&#160;":" ","&copy;":"\xa9","&#169;":"\xa9","&reg;":"\xae","&#174;":"\xae","&hellip;":"\u2026","&#8230;":"\u2026","&#x2F;":"/","&#47;":"/"},l=function(e){return f[e]};var p={bindI18n:"languageChanged",bindI18nStore:"",transEmptyNodeValue:"",transSupportBasicHtmlNodes:!0,transWrapTextNodes:"",transKeepBasicHtmlNodesFor:["br","strong","i","p"],useSuspense:!0,unescape:function(e){return e.replace(s,l)}};var d,g=t(15671),b=t(43144);var v=(0,r.createContext)(),y=function(){function e(){(0,g.Z)(this,e),this.usedNamespaces={}}return(0,b.Z)(e,[{key:"addUsedNamespaces",value:function(e){var n=this;e.forEach((function(e){n.usedNamespaces[e]||(n.usedNamespaces[e]=!0)}))}},{key:"getUsedNamespaces",value:function(){return Object.keys(this.usedNamespaces)}}]),e}();var h=t(29439);function m(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function w(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?m(Object(t),!0).forEach((function(n){(0,c.Z)(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):m(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}var O=function(e,n){var t=(0,r.useRef)();return(0,r.useEffect)((function(){t.current=n?t.current:e}),[e,n]),t.current};function k(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=n.i18n,o=(0,r.useContext)(v)||{},a=o.i18n,c=o.defaultNS,s=t||a||d;if(s&&!s.reportNamespaces&&(s.reportNamespaces=new y),!s){i("You will need to pass in an i18next instance by using initReactI18next");var f=function(e){return Array.isArray(e)?e[e.length-1]:e},l=[f,{},!1];return l.t=f,l.i18n={},l.ready=!1,l}s.options.react&&void 0!==s.options.react.wait&&i("It seems you are still using the old wait option, you may migrate to the new useSuspense behaviour.");var g=w(w(w({},p),s.options.react),n),b=g.useSuspense,m=g.keyPrefix,k=e||c||s.options&&s.options.defaultNS;k="string"===typeof k?[k]:k||["translation"],s.reportNamespaces.addUsedNamespaces&&s.reportNamespaces.addUsedNamespaces(k);var N=(s.isInitialized||s.initializedStoreOnce)&&k.every((function(e){return function(e,n){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return n.languages&&n.languages.length?void 0!==n.options.ignoreJSONStructure?n.hasLoadedNamespace(e,{precheck:function(n,r){if(t.bindI18n&&t.bindI18n.indexOf("languageChanging")>-1&&n.services.backendConnector.backend&&n.isLanguageChangingTo&&!r(n.isLanguageChangingTo,e))return!1}}):function(e,n){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=n.languages[0],o=!!n.options&&n.options.fallbackLng,a=n.languages[n.languages.length-1];if("cimode"===r.toLowerCase())return!0;var i=function(e,t){var r=n.services.backendConnector.state["".concat(e,"|").concat(t)];return-1===r||2===r};return!(t.bindI18n&&t.bindI18n.indexOf("languageChanging")>-1&&n.services.backendConnector.backend&&n.isLanguageChangingTo&&!i(n.isLanguageChangingTo,e))&&(!!n.hasResourceBundle(r,e)||!(n.services.backendConnector.backend&&(!n.options.resources||n.options.partialBundledLanguages))||!(!i(r,e)||o&&!i(a,e)))}(e,n,t):(i("i18n.languages were undefined or empty",n.languages),!0)}(e,s,g)}));function S(){return s.getFixedT(null,"fallback"===g.nsMode?k:k[0],m)}var j=(0,r.useState)(S),x=(0,h.Z)(j,2),C=x[0],I=x[1],E=k.join(),Z=O(E),P=(0,r.useRef)(!0);(0,r.useEffect)((function(){var e=g.bindI18n,n=g.bindI18nStore;function t(){P.current&&I(S)}return P.current=!0,N||b||u(s,k,(function(){P.current&&I(S)})),N&&Z&&Z!==E&&P.current&&I(S),e&&s&&s.on(e,t),n&&s&&s.store.on(n,t),function(){P.current=!1,e&&s&&e.split(" ").forEach((function(e){return s.off(e,t)})),n&&s&&n.split(" ").forEach((function(e){return s.store.off(e,t)}))}}),[s,E]);var T=(0,r.useRef)(!0);(0,r.useEffect)((function(){P.current&&!T.current&&I(S),T.current=!1}),[s,m]);var L=[C,s,N];if(L.t=C,L.i18n=s,L.ready=N,N)return L;if(!N&&!b)return L;throw new Promise((function(e){u(s,k,(function(){e()}))}))}}}]);
//# sourceMappingURL=689.fdcc6928.chunk.js.map
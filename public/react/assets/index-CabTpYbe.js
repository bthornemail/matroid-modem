(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))r(l);new MutationObserver(l=>{for(const i of l)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(l){const i={};return l.integrity&&(i.integrity=l.integrity),l.referrerPolicy&&(i.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?i.credentials="include":l.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(l){if(l.ep)return;l.ep=!0;const i=t(l);fetch(l.href,i)}})();var Zu={exports:{}},dl={},Ju={exports:{}},R={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var or=Symbol.for("react.element"),pc=Symbol.for("react.portal"),mc=Symbol.for("react.fragment"),hc=Symbol.for("react.strict_mode"),vc=Symbol.for("react.profiler"),gc=Symbol.for("react.provider"),yc=Symbol.for("react.context"),Sc=Symbol.for("react.forward_ref"),wc=Symbol.for("react.suspense"),kc=Symbol.for("react.memo"),xc=Symbol.for("react.lazy"),Ho=Symbol.iterator;function Ec(e){return e===null||typeof e!="object"?null:(e=Ho&&e[Ho]||e["@@iterator"],typeof e=="function"?e:null)}var bu={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},es=Object.assign,ns={};function ht(e,n,t){this.props=e,this.context=n,this.refs=ns,this.updater=t||bu}ht.prototype.isReactComponent={};ht.prototype.setState=function(e,n){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,n,"setState")};ht.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function ts(){}ts.prototype=ht.prototype;function qi(e,n,t){this.props=e,this.context=n,this.refs=ns,this.updater=t||bu}var Gi=qi.prototype=new ts;Gi.constructor=qi;es(Gi,ht.prototype);Gi.isPureReactComponent=!0;var Vo=Array.isArray,rs=Object.prototype.hasOwnProperty,Yi={current:null},ls={key:!0,ref:!0,__self:!0,__source:!0};function is(e,n,t){var r,l={},i=null,o=null;if(n!=null)for(r in n.ref!==void 0&&(o=n.ref),n.key!==void 0&&(i=""+n.key),n)rs.call(n,r)&&!ls.hasOwnProperty(r)&&(l[r]=n[r]);var u=arguments.length-2;if(u===1)l.children=t;else if(1<u){for(var s=Array(u),c=0;c<u;c++)s[c]=arguments[c+2];l.children=s}if(e&&e.defaultProps)for(r in u=e.defaultProps,u)l[r]===void 0&&(l[r]=u[r]);return{$$typeof:or,type:e,key:i,ref:o,props:l,_owner:Yi.current}}function _c(e,n){return{$$typeof:or,type:e.type,key:n,ref:e.ref,props:e.props,_owner:e._owner}}function Xi(e){return typeof e=="object"&&e!==null&&e.$$typeof===or}function Nc(e){var n={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(t){return n[t]})}var Wo=/\/+/g;function Tl(e,n){return typeof e=="object"&&e!==null&&e.key!=null?Nc(""+e.key):n.toString(36)}function Lr(e,n,t,r,l){var i=typeof e;(i==="undefined"||i==="boolean")&&(e=null);var o=!1;if(e===null)o=!0;else switch(i){case"string":case"number":o=!0;break;case"object":switch(e.$$typeof){case or:case pc:o=!0}}if(o)return o=e,l=l(o),e=r===""?"."+Tl(o,0):r,Vo(l)?(t="",e!=null&&(t=e.replace(Wo,"$&/")+"/"),Lr(l,n,t,"",function(c){return c})):l!=null&&(Xi(l)&&(l=_c(l,t+(!l.key||o&&o.key===l.key?"":(""+l.key).replace(Wo,"$&/")+"/")+e)),n.push(l)),1;if(o=0,r=r===""?".":r+":",Vo(e))for(var u=0;u<e.length;u++){i=e[u];var s=r+Tl(i,u);o+=Lr(i,n,t,s,l)}else if(s=Ec(e),typeof s=="function")for(e=s.call(e),u=0;!(i=e.next()).done;)i=i.value,s=r+Tl(i,u++),o+=Lr(i,n,t,s,l);else if(i==="object")throw n=String(e),Error("Objects are not valid as a React child (found: "+(n==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":n)+"). If you meant to render a collection of children, use an array instead.");return o}function fr(e,n,t){if(e==null)return e;var r=[],l=0;return Lr(e,r,"","",function(i){return n.call(t,i,l++)}),r}function Cc(e){if(e._status===-1){var n=e._result;n=n(),n.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var fe={current:null},Ir={transition:null},Pc={ReactCurrentDispatcher:fe,ReactCurrentBatchConfig:Ir,ReactCurrentOwner:Yi};function os(){throw Error("act(...) is not supported in production builds of React.")}R.Children={map:fr,forEach:function(e,n,t){fr(e,function(){n.apply(this,arguments)},t)},count:function(e){var n=0;return fr(e,function(){n++}),n},toArray:function(e){return fr(e,function(n){return n})||[]},only:function(e){if(!Xi(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};R.Component=ht;R.Fragment=mc;R.Profiler=vc;R.PureComponent=qi;R.StrictMode=hc;R.Suspense=wc;R.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Pc;R.act=os;R.cloneElement=function(e,n,t){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=es({},e.props),l=e.key,i=e.ref,o=e._owner;if(n!=null){if(n.ref!==void 0&&(i=n.ref,o=Yi.current),n.key!==void 0&&(l=""+n.key),e.type&&e.type.defaultProps)var u=e.type.defaultProps;for(s in n)rs.call(n,s)&&!ls.hasOwnProperty(s)&&(r[s]=n[s]===void 0&&u!==void 0?u[s]:n[s])}var s=arguments.length-2;if(s===1)r.children=t;else if(1<s){u=Array(s);for(var c=0;c<s;c++)u[c]=arguments[c+2];r.children=u}return{$$typeof:or,type:e.type,key:l,ref:i,props:r,_owner:o}};R.createContext=function(e){return e={$$typeof:yc,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:gc,_context:e},e.Consumer=e};R.createElement=is;R.createFactory=function(e){var n=is.bind(null,e);return n.type=e,n};R.createRef=function(){return{current:null}};R.forwardRef=function(e){return{$$typeof:Sc,render:e}};R.isValidElement=Xi;R.lazy=function(e){return{$$typeof:xc,_payload:{_status:-1,_result:e},_init:Cc}};R.memo=function(e,n){return{$$typeof:kc,type:e,compare:n===void 0?null:n}};R.startTransition=function(e){var n=Ir.transition;Ir.transition={};try{e()}finally{Ir.transition=n}};R.unstable_act=os;R.useCallback=function(e,n){return fe.current.useCallback(e,n)};R.useContext=function(e){return fe.current.useContext(e)};R.useDebugValue=function(){};R.useDeferredValue=function(e){return fe.current.useDeferredValue(e)};R.useEffect=function(e,n){return fe.current.useEffect(e,n)};R.useId=function(){return fe.current.useId()};R.useImperativeHandle=function(e,n,t){return fe.current.useImperativeHandle(e,n,t)};R.useInsertionEffect=function(e,n){return fe.current.useInsertionEffect(e,n)};R.useLayoutEffect=function(e,n){return fe.current.useLayoutEffect(e,n)};R.useMemo=function(e,n){return fe.current.useMemo(e,n)};R.useReducer=function(e,n,t){return fe.current.useReducer(e,n,t)};R.useRef=function(e){return fe.current.useRef(e)};R.useState=function(e){return fe.current.useState(e)};R.useSyncExternalStore=function(e,n,t){return fe.current.useSyncExternalStore(e,n,t)};R.useTransition=function(){return fe.current.useTransition()};R.version="18.3.1";Ju.exports=R;var A=Ju.exports;/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Tc=A,Lc=Symbol.for("react.element"),Ic=Symbol.for("react.fragment"),zc=Object.prototype.hasOwnProperty,Rc=Tc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Oc={key:!0,ref:!0,__self:!0,__source:!0};function us(e,n,t){var r,l={},i=null,o=null;t!==void 0&&(i=""+t),n.key!==void 0&&(i=""+n.key),n.ref!==void 0&&(o=n.ref);for(r in n)zc.call(n,r)&&!Oc.hasOwnProperty(r)&&(l[r]=n[r]);if(e&&e.defaultProps)for(r in n=e.defaultProps,n)l[r]===void 0&&(l[r]=n[r]);return{$$typeof:Lc,type:e,key:i,ref:o,props:l,_owner:Rc.current}}dl.Fragment=Ic;dl.jsx=us;dl.jsxs=us;Zu.exports=dl;var L=Zu.exports,ei={},ss={exports:{}},_e={},as={exports:{}},cs={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function n(x,T){var I=x.length;x.push(T);e:for(;0<I;){var H=I-1>>>1,Y=x[H];if(0<l(Y,T))x[H]=T,x[I]=Y,I=H;else break e}}function t(x){return x.length===0?null:x[0]}function r(x){if(x.length===0)return null;var T=x[0],I=x.pop();if(I!==T){x[0]=I;e:for(var H=0,Y=x.length,Oe=Y>>>1;H<Oe;){var Be=2*(H+1)-1,kt=x[Be],qe=Be+1,Bn=x[qe];if(0>l(kt,I))qe<Y&&0>l(Bn,kt)?(x[H]=Bn,x[qe]=I,H=qe):(x[H]=kt,x[Be]=I,H=Be);else if(qe<Y&&0>l(Bn,I))x[H]=Bn,x[qe]=I,H=qe;else break e}}return T}function l(x,T){var I=x.sortIndex-T.sortIndex;return I!==0?I:x.id-T.id}if(typeof performance=="object"&&typeof performance.now=="function"){var i=performance;e.unstable_now=function(){return i.now()}}else{var o=Date,u=o.now();e.unstable_now=function(){return o.now()-u}}var s=[],c=[],h=1,m=null,p=3,y=!1,S=!1,w=!1,F=typeof setTimeout=="function"?setTimeout:null,d=typeof clearTimeout=="function"?clearTimeout:null,a=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function f(x){for(var T=t(c);T!==null;){if(T.callback===null)r(c);else if(T.startTime<=x)r(c),T.sortIndex=T.expirationTime,n(s,T);else break;T=t(c)}}function v(x){if(w=!1,f(x),!S)if(t(s)!==null)S=!0,St(k);else{var T=t(c);T!==null&&wt(v,T.startTime-x)}}function k(x,T){S=!1,w&&(w=!1,d(C),C=-1),y=!0;var I=p;try{for(f(T),m=t(s);m!==null&&(!(m.expirationTime>T)||x&&!me());){var H=m.callback;if(typeof H=="function"){m.callback=null,p=m.priorityLevel;var Y=H(m.expirationTime<=T);T=e.unstable_now(),typeof Y=="function"?m.callback=Y:m===t(s)&&r(s),f(T)}else r(s);m=t(s)}if(m!==null)var Oe=!0;else{var Be=t(c);Be!==null&&wt(v,Be.startTime-T),Oe=!1}return Oe}finally{m=null,p=I,y=!1}}var _=!1,N=null,C=-1,$=5,z=-1;function me(){return!(e.unstable_now()-z<$)}function ln(){if(N!==null){var x=e.unstable_now();z=x;var T=!0;try{T=N(!0,x)}finally{T?on():(_=!1,N=null)}}else _=!1}var on;if(typeof a=="function")on=function(){a(ln)};else if(typeof MessageChannel<"u"){var yt=new MessageChannel,Pl=yt.port2;yt.port1.onmessage=ln,on=function(){Pl.postMessage(null)}}else on=function(){F(ln,0)};function St(x){N=x,_||(_=!0,on())}function wt(x,T){C=F(function(){x(e.unstable_now())},T)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(x){x.callback=null},e.unstable_continueExecution=function(){S||y||(S=!0,St(k))},e.unstable_forceFrameRate=function(x){0>x||125<x?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):$=0<x?Math.floor(1e3/x):5},e.unstable_getCurrentPriorityLevel=function(){return p},e.unstable_getFirstCallbackNode=function(){return t(s)},e.unstable_next=function(x){switch(p){case 1:case 2:case 3:var T=3;break;default:T=p}var I=p;p=T;try{return x()}finally{p=I}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(x,T){switch(x){case 1:case 2:case 3:case 4:case 5:break;default:x=3}var I=p;p=x;try{return T()}finally{p=I}},e.unstable_scheduleCallback=function(x,T,I){var H=e.unstable_now();switch(typeof I=="object"&&I!==null?(I=I.delay,I=typeof I=="number"&&0<I?H+I:H):I=H,x){case 1:var Y=-1;break;case 2:Y=250;break;case 5:Y=1073741823;break;case 4:Y=1e4;break;default:Y=5e3}return Y=I+Y,x={id:h++,callback:T,priorityLevel:x,startTime:I,expirationTime:Y,sortIndex:-1},I>H?(x.sortIndex=I,n(c,x),t(s)===null&&x===t(c)&&(w?(d(C),C=-1):w=!0,wt(v,I-H))):(x.sortIndex=Y,n(s,x),S||y||(S=!0,St(k))),x},e.unstable_shouldYield=me,e.unstable_wrapCallback=function(x){var T=p;return function(){var I=p;p=T;try{return x.apply(this,arguments)}finally{p=I}}}})(cs);as.exports=cs;var Ac=as.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Mc=A,Ee=Ac;function g(e){for(var n="https://reactjs.org/docs/error-decoder.html?invariant="+e,t=1;t<arguments.length;t++)n+="&args[]="+encodeURIComponent(arguments[t]);return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var ds=new Set,Vt={};function Un(e,n){st(e,n),st(e+"Capture",n)}function st(e,n){for(Vt[e]=n,e=0;e<n.length;e++)ds.add(n[e])}var be=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),ni=Object.prototype.hasOwnProperty,Fc=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Qo={},Ko={};function Dc(e){return ni.call(Ko,e)?!0:ni.call(Qo,e)?!1:Fc.test(e)?Ko[e]=!0:(Qo[e]=!0,!1)}function jc(e,n,t,r){if(t!==null&&t.type===0)return!1;switch(typeof n){case"function":case"symbol":return!0;case"boolean":return r?!1:t!==null?!t.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Uc(e,n,t,r){if(n===null||typeof n>"u"||jc(e,n,t,r))return!0;if(r)return!1;if(t!==null)switch(t.type){case 3:return!n;case 4:return n===!1;case 5:return isNaN(n);case 6:return isNaN(n)||1>n}return!1}function pe(e,n,t,r,l,i,o){this.acceptsBooleans=n===2||n===3||n===4,this.attributeName=r,this.attributeNamespace=l,this.mustUseProperty=t,this.propertyName=e,this.type=n,this.sanitizeURL=i,this.removeEmptyString=o}var le={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){le[e]=new pe(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var n=e[0];le[n]=new pe(n,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){le[e]=new pe(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){le[e]=new pe(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){le[e]=new pe(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){le[e]=new pe(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){le[e]=new pe(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){le[e]=new pe(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){le[e]=new pe(e,5,!1,e.toLowerCase(),null,!1,!1)});var Zi=/[\-:]([a-z])/g;function Ji(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var n=e.replace(Zi,Ji);le[n]=new pe(n,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var n=e.replace(Zi,Ji);le[n]=new pe(n,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var n=e.replace(Zi,Ji);le[n]=new pe(n,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){le[e]=new pe(e,1,!1,e.toLowerCase(),null,!1,!1)});le.xlinkHref=new pe("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){le[e]=new pe(e,1,!1,e.toLowerCase(),null,!0,!0)});function bi(e,n,t,r){var l=le.hasOwnProperty(n)?le[n]:null;(l!==null?l.type!==0:r||!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(Uc(n,t,l,r)&&(t=null),r||l===null?Dc(n)&&(t===null?e.removeAttribute(n):e.setAttribute(n,""+t)):l.mustUseProperty?e[l.propertyName]=t===null?l.type===3?!1:"":t:(n=l.attributeName,r=l.attributeNamespace,t===null?e.removeAttribute(n):(l=l.type,t=l===3||l===4&&t===!0?"":""+t,r?e.setAttributeNS(r,n,t):e.setAttribute(n,t))))}var rn=Mc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,pr=Symbol.for("react.element"),Wn=Symbol.for("react.portal"),Qn=Symbol.for("react.fragment"),eo=Symbol.for("react.strict_mode"),ti=Symbol.for("react.profiler"),fs=Symbol.for("react.provider"),ps=Symbol.for("react.context"),no=Symbol.for("react.forward_ref"),ri=Symbol.for("react.suspense"),li=Symbol.for("react.suspense_list"),to=Symbol.for("react.memo"),sn=Symbol.for("react.lazy"),ms=Symbol.for("react.offscreen"),qo=Symbol.iterator;function xt(e){return e===null||typeof e!="object"?null:(e=qo&&e[qo]||e["@@iterator"],typeof e=="function"?e:null)}var K=Object.assign,Ll;function It(e){if(Ll===void 0)try{throw Error()}catch(t){var n=t.stack.trim().match(/\n( *(at )?)/);Ll=n&&n[1]||""}return`
`+Ll+e}var Il=!1;function zl(e,n){if(!e||Il)return"";Il=!0;var t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(n)if(n=function(){throw Error()},Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(n,[])}catch(c){var r=c}Reflect.construct(e,[],n)}else{try{n.call()}catch(c){r=c}e.call(n.prototype)}else{try{throw Error()}catch(c){r=c}e()}}catch(c){if(c&&r&&typeof c.stack=="string"){for(var l=c.stack.split(`
`),i=r.stack.split(`
`),o=l.length-1,u=i.length-1;1<=o&&0<=u&&l[o]!==i[u];)u--;for(;1<=o&&0<=u;o--,u--)if(l[o]!==i[u]){if(o!==1||u!==1)do if(o--,u--,0>u||l[o]!==i[u]){var s=`
`+l[o].replace(" at new "," at ");return e.displayName&&s.includes("<anonymous>")&&(s=s.replace("<anonymous>",e.displayName)),s}while(1<=o&&0<=u);break}}}finally{Il=!1,Error.prepareStackTrace=t}return(e=e?e.displayName||e.name:"")?It(e):""}function $c(e){switch(e.tag){case 5:return It(e.type);case 16:return It("Lazy");case 13:return It("Suspense");case 19:return It("SuspenseList");case 0:case 2:case 15:return e=zl(e.type,!1),e;case 11:return e=zl(e.type.render,!1),e;case 1:return e=zl(e.type,!0),e;default:return""}}function ii(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Qn:return"Fragment";case Wn:return"Portal";case ti:return"Profiler";case eo:return"StrictMode";case ri:return"Suspense";case li:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case ps:return(e.displayName||"Context")+".Consumer";case fs:return(e._context.displayName||"Context")+".Provider";case no:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case to:return n=e.displayName||null,n!==null?n:ii(e.type)||"Memo";case sn:n=e._payload,e=e._init;try{return ii(e(n))}catch{}}return null}function Bc(e){var n=e.type;switch(e.tag){case 24:return"Cache";case 9:return(n.displayName||"Context")+".Consumer";case 10:return(n._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=n.render,e=e.displayName||e.name||"",n.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return n;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return ii(n);case 8:return n===eo?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n}return null}function xn(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function hs(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function Hc(e){var n=hs(e)?"checked":"value",t=Object.getOwnPropertyDescriptor(e.constructor.prototype,n),r=""+e[n];if(!e.hasOwnProperty(n)&&typeof t<"u"&&typeof t.get=="function"&&typeof t.set=="function"){var l=t.get,i=t.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return l.call(this)},set:function(o){r=""+o,i.call(this,o)}}),Object.defineProperty(e,n,{enumerable:t.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function mr(e){e._valueTracker||(e._valueTracker=Hc(e))}function vs(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var t=n.getValue(),r="";return e&&(r=hs(e)?e.checked?"true":"false":e.value),e=r,e!==t?(n.setValue(e),!0):!1}function Br(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function oi(e,n){var t=n.checked;return K({},n,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:t??e._wrapperState.initialChecked})}function Go(e,n){var t=n.defaultValue==null?"":n.defaultValue,r=n.checked!=null?n.checked:n.defaultChecked;t=xn(n.value!=null?n.value:t),e._wrapperState={initialChecked:r,initialValue:t,controlled:n.type==="checkbox"||n.type==="radio"?n.checked!=null:n.value!=null}}function gs(e,n){n=n.checked,n!=null&&bi(e,"checked",n,!1)}function ui(e,n){gs(e,n);var t=xn(n.value),r=n.type;if(t!=null)r==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+t):e.value!==""+t&&(e.value=""+t);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}n.hasOwnProperty("value")?si(e,n.type,t):n.hasOwnProperty("defaultValue")&&si(e,n.type,xn(n.defaultValue)),n.checked==null&&n.defaultChecked!=null&&(e.defaultChecked=!!n.defaultChecked)}function Yo(e,n,t){if(n.hasOwnProperty("value")||n.hasOwnProperty("defaultValue")){var r=n.type;if(!(r!=="submit"&&r!=="reset"||n.value!==void 0&&n.value!==null))return;n=""+e._wrapperState.initialValue,t||n===e.value||(e.value=n),e.defaultValue=n}t=e.name,t!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,t!==""&&(e.name=t)}function si(e,n,t){(n!=="number"||Br(e.ownerDocument)!==e)&&(t==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+t&&(e.defaultValue=""+t))}var zt=Array.isArray;function tt(e,n,t,r){if(e=e.options,n){n={};for(var l=0;l<t.length;l++)n["$"+t[l]]=!0;for(t=0;t<e.length;t++)l=n.hasOwnProperty("$"+e[t].value),e[t].selected!==l&&(e[t].selected=l),l&&r&&(e[t].defaultSelected=!0)}else{for(t=""+xn(t),n=null,l=0;l<e.length;l++){if(e[l].value===t){e[l].selected=!0,r&&(e[l].defaultSelected=!0);return}n!==null||e[l].disabled||(n=e[l])}n!==null&&(n.selected=!0)}}function ai(e,n){if(n.dangerouslySetInnerHTML!=null)throw Error(g(91));return K({},n,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Xo(e,n){var t=n.value;if(t==null){if(t=n.children,n=n.defaultValue,t!=null){if(n!=null)throw Error(g(92));if(zt(t)){if(1<t.length)throw Error(g(93));t=t[0]}n=t}n==null&&(n=""),t=n}e._wrapperState={initialValue:xn(t)}}function ys(e,n){var t=xn(n.value),r=xn(n.defaultValue);t!=null&&(t=""+t,t!==e.value&&(e.value=t),n.defaultValue==null&&e.defaultValue!==t&&(e.defaultValue=t)),r!=null&&(e.defaultValue=""+r)}function Zo(e){var n=e.textContent;n===e._wrapperState.initialValue&&n!==""&&n!==null&&(e.value=n)}function Ss(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function ci(e,n){return e==null||e==="http://www.w3.org/1999/xhtml"?Ss(n):e==="http://www.w3.org/2000/svg"&&n==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var hr,ws=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(n,t,r,l){MSApp.execUnsafeLocalFunction(function(){return e(n,t,r,l)})}:e}(function(e,n){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=n;else{for(hr=hr||document.createElement("div"),hr.innerHTML="<svg>"+n.valueOf().toString()+"</svg>",n=hr.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;n.firstChild;)e.appendChild(n.firstChild)}});function Wt(e,n){if(n){var t=e.firstChild;if(t&&t===e.lastChild&&t.nodeType===3){t.nodeValue=n;return}}e.textContent=n}var At={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Vc=["Webkit","ms","Moz","O"];Object.keys(At).forEach(function(e){Vc.forEach(function(n){n=n+e.charAt(0).toUpperCase()+e.substring(1),At[n]=At[e]})});function ks(e,n,t){return n==null||typeof n=="boolean"||n===""?"":t||typeof n!="number"||n===0||At.hasOwnProperty(e)&&At[e]?(""+n).trim():n+"px"}function xs(e,n){e=e.style;for(var t in n)if(n.hasOwnProperty(t)){var r=t.indexOf("--")===0,l=ks(t,n[t],r);t==="float"&&(t="cssFloat"),r?e.setProperty(t,l):e[t]=l}}var Wc=K({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function di(e,n){if(n){if(Wc[e]&&(n.children!=null||n.dangerouslySetInnerHTML!=null))throw Error(g(137,e));if(n.dangerouslySetInnerHTML!=null){if(n.children!=null)throw Error(g(60));if(typeof n.dangerouslySetInnerHTML!="object"||!("__html"in n.dangerouslySetInnerHTML))throw Error(g(61))}if(n.style!=null&&typeof n.style!="object")throw Error(g(62))}}function fi(e,n){if(e.indexOf("-")===-1)return typeof n.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var pi=null;function ro(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var mi=null,rt=null,lt=null;function Jo(e){if(e=ar(e)){if(typeof mi!="function")throw Error(g(280));var n=e.stateNode;n&&(n=vl(n),mi(e.stateNode,e.type,n))}}function Es(e){rt?lt?lt.push(e):lt=[e]:rt=e}function _s(){if(rt){var e=rt,n=lt;if(lt=rt=null,Jo(e),n)for(e=0;e<n.length;e++)Jo(n[e])}}function Ns(e,n){return e(n)}function Cs(){}var Rl=!1;function Ps(e,n,t){if(Rl)return e(n,t);Rl=!0;try{return Ns(e,n,t)}finally{Rl=!1,(rt!==null||lt!==null)&&(Cs(),_s())}}function Qt(e,n){var t=e.stateNode;if(t===null)return null;var r=vl(t);if(r===null)return null;t=r[n];e:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(t&&typeof t!="function")throw Error(g(231,n,typeof t));return t}var hi=!1;if(be)try{var Et={};Object.defineProperty(Et,"passive",{get:function(){hi=!0}}),window.addEventListener("test",Et,Et),window.removeEventListener("test",Et,Et)}catch{hi=!1}function Qc(e,n,t,r,l,i,o,u,s){var c=Array.prototype.slice.call(arguments,3);try{n.apply(t,c)}catch(h){this.onError(h)}}var Mt=!1,Hr=null,Vr=!1,vi=null,Kc={onError:function(e){Mt=!0,Hr=e}};function qc(e,n,t,r,l,i,o,u,s){Mt=!1,Hr=null,Qc.apply(Kc,arguments)}function Gc(e,n,t,r,l,i,o,u,s){if(qc.apply(this,arguments),Mt){if(Mt){var c=Hr;Mt=!1,Hr=null}else throw Error(g(198));Vr||(Vr=!0,vi=c)}}function $n(e){var n=e,t=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,n.flags&4098&&(t=n.return),e=n.return;while(e)}return n.tag===3?t:null}function Ts(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function bo(e){if($n(e)!==e)throw Error(g(188))}function Yc(e){var n=e.alternate;if(!n){if(n=$n(e),n===null)throw Error(g(188));return n!==e?null:e}for(var t=e,r=n;;){var l=t.return;if(l===null)break;var i=l.alternate;if(i===null){if(r=l.return,r!==null){t=r;continue}break}if(l.child===i.child){for(i=l.child;i;){if(i===t)return bo(l),e;if(i===r)return bo(l),n;i=i.sibling}throw Error(g(188))}if(t.return!==r.return)t=l,r=i;else{for(var o=!1,u=l.child;u;){if(u===t){o=!0,t=l,r=i;break}if(u===r){o=!0,r=l,t=i;break}u=u.sibling}if(!o){for(u=i.child;u;){if(u===t){o=!0,t=i,r=l;break}if(u===r){o=!0,r=i,t=l;break}u=u.sibling}if(!o)throw Error(g(189))}}if(t.alternate!==r)throw Error(g(190))}if(t.tag!==3)throw Error(g(188));return t.stateNode.current===t?e:n}function Ls(e){return e=Yc(e),e!==null?Is(e):null}function Is(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var n=Is(e);if(n!==null)return n;e=e.sibling}return null}var zs=Ee.unstable_scheduleCallback,eu=Ee.unstable_cancelCallback,Xc=Ee.unstable_shouldYield,Zc=Ee.unstable_requestPaint,G=Ee.unstable_now,Jc=Ee.unstable_getCurrentPriorityLevel,lo=Ee.unstable_ImmediatePriority,Rs=Ee.unstable_UserBlockingPriority,Wr=Ee.unstable_NormalPriority,bc=Ee.unstable_LowPriority,Os=Ee.unstable_IdlePriority,fl=null,Qe=null;function ed(e){if(Qe&&typeof Qe.onCommitFiberRoot=="function")try{Qe.onCommitFiberRoot(fl,e,void 0,(e.current.flags&128)===128)}catch{}}var je=Math.clz32?Math.clz32:rd,nd=Math.log,td=Math.LN2;function rd(e){return e>>>=0,e===0?32:31-(nd(e)/td|0)|0}var vr=64,gr=4194304;function Rt(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Qr(e,n){var t=e.pendingLanes;if(t===0)return 0;var r=0,l=e.suspendedLanes,i=e.pingedLanes,o=t&268435455;if(o!==0){var u=o&~l;u!==0?r=Rt(u):(i&=o,i!==0&&(r=Rt(i)))}else o=t&~l,o!==0?r=Rt(o):i!==0&&(r=Rt(i));if(r===0)return 0;if(n!==0&&n!==r&&!(n&l)&&(l=r&-r,i=n&-n,l>=i||l===16&&(i&4194240)!==0))return n;if(r&4&&(r|=t&16),n=e.entangledLanes,n!==0)for(e=e.entanglements,n&=r;0<n;)t=31-je(n),l=1<<t,r|=e[t],n&=~l;return r}function ld(e,n){switch(e){case 1:case 2:case 4:return n+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function id(e,n){for(var t=e.suspendedLanes,r=e.pingedLanes,l=e.expirationTimes,i=e.pendingLanes;0<i;){var o=31-je(i),u=1<<o,s=l[o];s===-1?(!(u&t)||u&r)&&(l[o]=ld(u,n)):s<=n&&(e.expiredLanes|=u),i&=~u}}function gi(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function As(){var e=vr;return vr<<=1,!(vr&4194240)&&(vr=64),e}function Ol(e){for(var n=[],t=0;31>t;t++)n.push(e);return n}function ur(e,n,t){e.pendingLanes|=n,n!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,n=31-je(n),e[n]=t}function od(e,n){var t=e.pendingLanes&~n;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=n,e.mutableReadLanes&=n,e.entangledLanes&=n,n=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<t;){var l=31-je(t),i=1<<l;n[l]=0,r[l]=-1,e[l]=-1,t&=~i}}function io(e,n){var t=e.entangledLanes|=n;for(e=e.entanglements;t;){var r=31-je(t),l=1<<r;l&n|e[r]&n&&(e[r]|=n),t&=~l}}var M=0;function Ms(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Fs,oo,Ds,js,Us,yi=!1,yr=[],mn=null,hn=null,vn=null,Kt=new Map,qt=new Map,cn=[],ud="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function nu(e,n){switch(e){case"focusin":case"focusout":mn=null;break;case"dragenter":case"dragleave":hn=null;break;case"mouseover":case"mouseout":vn=null;break;case"pointerover":case"pointerout":Kt.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":qt.delete(n.pointerId)}}function _t(e,n,t,r,l,i){return e===null||e.nativeEvent!==i?(e={blockedOn:n,domEventName:t,eventSystemFlags:r,nativeEvent:i,targetContainers:[l]},n!==null&&(n=ar(n),n!==null&&oo(n)),e):(e.eventSystemFlags|=r,n=e.targetContainers,l!==null&&n.indexOf(l)===-1&&n.push(l),e)}function sd(e,n,t,r,l){switch(n){case"focusin":return mn=_t(mn,e,n,t,r,l),!0;case"dragenter":return hn=_t(hn,e,n,t,r,l),!0;case"mouseover":return vn=_t(vn,e,n,t,r,l),!0;case"pointerover":var i=l.pointerId;return Kt.set(i,_t(Kt.get(i)||null,e,n,t,r,l)),!0;case"gotpointercapture":return i=l.pointerId,qt.set(i,_t(qt.get(i)||null,e,n,t,r,l)),!0}return!1}function $s(e){var n=Ln(e.target);if(n!==null){var t=$n(n);if(t!==null){if(n=t.tag,n===13){if(n=Ts(t),n!==null){e.blockedOn=n,Us(e.priority,function(){Ds(t)});return}}else if(n===3&&t.stateNode.current.memoizedState.isDehydrated){e.blockedOn=t.tag===3?t.stateNode.containerInfo:null;return}}}e.blockedOn=null}function zr(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var t=Si(e.domEventName,e.eventSystemFlags,n[0],e.nativeEvent);if(t===null){t=e.nativeEvent;var r=new t.constructor(t.type,t);pi=r,t.target.dispatchEvent(r),pi=null}else return n=ar(t),n!==null&&oo(n),e.blockedOn=t,!1;n.shift()}return!0}function tu(e,n,t){zr(e)&&t.delete(n)}function ad(){yi=!1,mn!==null&&zr(mn)&&(mn=null),hn!==null&&zr(hn)&&(hn=null),vn!==null&&zr(vn)&&(vn=null),Kt.forEach(tu),qt.forEach(tu)}function Nt(e,n){e.blockedOn===n&&(e.blockedOn=null,yi||(yi=!0,Ee.unstable_scheduleCallback(Ee.unstable_NormalPriority,ad)))}function Gt(e){function n(l){return Nt(l,e)}if(0<yr.length){Nt(yr[0],e);for(var t=1;t<yr.length;t++){var r=yr[t];r.blockedOn===e&&(r.blockedOn=null)}}for(mn!==null&&Nt(mn,e),hn!==null&&Nt(hn,e),vn!==null&&Nt(vn,e),Kt.forEach(n),qt.forEach(n),t=0;t<cn.length;t++)r=cn[t],r.blockedOn===e&&(r.blockedOn=null);for(;0<cn.length&&(t=cn[0],t.blockedOn===null);)$s(t),t.blockedOn===null&&cn.shift()}var it=rn.ReactCurrentBatchConfig,Kr=!0;function cd(e,n,t,r){var l=M,i=it.transition;it.transition=null;try{M=1,uo(e,n,t,r)}finally{M=l,it.transition=i}}function dd(e,n,t,r){var l=M,i=it.transition;it.transition=null;try{M=4,uo(e,n,t,r)}finally{M=l,it.transition=i}}function uo(e,n,t,r){if(Kr){var l=Si(e,n,t,r);if(l===null)Vl(e,n,r,qr,t),nu(e,r);else if(sd(l,e,n,t,r))r.stopPropagation();else if(nu(e,r),n&4&&-1<ud.indexOf(e)){for(;l!==null;){var i=ar(l);if(i!==null&&Fs(i),i=Si(e,n,t,r),i===null&&Vl(e,n,r,qr,t),i===l)break;l=i}l!==null&&r.stopPropagation()}else Vl(e,n,r,null,t)}}var qr=null;function Si(e,n,t,r){if(qr=null,e=ro(r),e=Ln(e),e!==null)if(n=$n(e),n===null)e=null;else if(t=n.tag,t===13){if(e=Ts(n),e!==null)return e;e=null}else if(t===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null);return qr=e,null}function Bs(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Jc()){case lo:return 1;case Rs:return 4;case Wr:case bc:return 16;case Os:return 536870912;default:return 16}default:return 16}}var fn=null,so=null,Rr=null;function Hs(){if(Rr)return Rr;var e,n=so,t=n.length,r,l="value"in fn?fn.value:fn.textContent,i=l.length;for(e=0;e<t&&n[e]===l[e];e++);var o=t-e;for(r=1;r<=o&&n[t-r]===l[i-r];r++);return Rr=l.slice(e,1<r?1-r:void 0)}function Or(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function Sr(){return!0}function ru(){return!1}function Ne(e){function n(t,r,l,i,o){this._reactName=t,this._targetInst=l,this.type=r,this.nativeEvent=i,this.target=o,this.currentTarget=null;for(var u in e)e.hasOwnProperty(u)&&(t=e[u],this[u]=t?t(i):i[u]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?Sr:ru,this.isPropagationStopped=ru,this}return K(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var t=this.nativeEvent;t&&(t.preventDefault?t.preventDefault():typeof t.returnValue!="unknown"&&(t.returnValue=!1),this.isDefaultPrevented=Sr)},stopPropagation:function(){var t=this.nativeEvent;t&&(t.stopPropagation?t.stopPropagation():typeof t.cancelBubble!="unknown"&&(t.cancelBubble=!0),this.isPropagationStopped=Sr)},persist:function(){},isPersistent:Sr}),n}var vt={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ao=Ne(vt),sr=K({},vt,{view:0,detail:0}),fd=Ne(sr),Al,Ml,Ct,pl=K({},sr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:co,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Ct&&(Ct&&e.type==="mousemove"?(Al=e.screenX-Ct.screenX,Ml=e.screenY-Ct.screenY):Ml=Al=0,Ct=e),Al)},movementY:function(e){return"movementY"in e?e.movementY:Ml}}),lu=Ne(pl),pd=K({},pl,{dataTransfer:0}),md=Ne(pd),hd=K({},sr,{relatedTarget:0}),Fl=Ne(hd),vd=K({},vt,{animationName:0,elapsedTime:0,pseudoElement:0}),gd=Ne(vd),yd=K({},vt,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Sd=Ne(yd),wd=K({},vt,{data:0}),iu=Ne(wd),kd={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},xd={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Ed={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function _d(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=Ed[e])?!!n[e]:!1}function co(){return _d}var Nd=K({},sr,{key:function(e){if(e.key){var n=kd[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=Or(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?xd[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:co,charCode:function(e){return e.type==="keypress"?Or(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Or(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Cd=Ne(Nd),Pd=K({},pl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),ou=Ne(Pd),Td=K({},sr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:co}),Ld=Ne(Td),Id=K({},vt,{propertyName:0,elapsedTime:0,pseudoElement:0}),zd=Ne(Id),Rd=K({},pl,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Od=Ne(Rd),Ad=[9,13,27,32],fo=be&&"CompositionEvent"in window,Ft=null;be&&"documentMode"in document&&(Ft=document.documentMode);var Md=be&&"TextEvent"in window&&!Ft,Vs=be&&(!fo||Ft&&8<Ft&&11>=Ft),uu=" ",su=!1;function Ws(e,n){switch(e){case"keyup":return Ad.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Qs(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Kn=!1;function Fd(e,n){switch(e){case"compositionend":return Qs(n);case"keypress":return n.which!==32?null:(su=!0,uu);case"textInput":return e=n.data,e===uu&&su?null:e;default:return null}}function Dd(e,n){if(Kn)return e==="compositionend"||!fo&&Ws(e,n)?(e=Hs(),Rr=so=fn=null,Kn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return Vs&&n.locale!=="ko"?null:n.data;default:return null}}var jd={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function au(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!jd[e.type]:n==="textarea"}function Ks(e,n,t,r){Es(r),n=Gr(n,"onChange"),0<n.length&&(t=new ao("onChange","change",null,t,r),e.push({event:t,listeners:n}))}var Dt=null,Yt=null;function Ud(e){ra(e,0)}function ml(e){var n=Yn(e);if(vs(n))return e}function $d(e,n){if(e==="change")return n}var qs=!1;if(be){var Dl;if(be){var jl="oninput"in document;if(!jl){var cu=document.createElement("div");cu.setAttribute("oninput","return;"),jl=typeof cu.oninput=="function"}Dl=jl}else Dl=!1;qs=Dl&&(!document.documentMode||9<document.documentMode)}function du(){Dt&&(Dt.detachEvent("onpropertychange",Gs),Yt=Dt=null)}function Gs(e){if(e.propertyName==="value"&&ml(Yt)){var n=[];Ks(n,Yt,e,ro(e)),Ps(Ud,n)}}function Bd(e,n,t){e==="focusin"?(du(),Dt=n,Yt=t,Dt.attachEvent("onpropertychange",Gs)):e==="focusout"&&du()}function Hd(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return ml(Yt)}function Vd(e,n){if(e==="click")return ml(n)}function Wd(e,n){if(e==="input"||e==="change")return ml(n)}function Qd(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var $e=typeof Object.is=="function"?Object.is:Qd;function Xt(e,n){if($e(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var t=Object.keys(e),r=Object.keys(n);if(t.length!==r.length)return!1;for(r=0;r<t.length;r++){var l=t[r];if(!ni.call(n,l)||!$e(e[l],n[l]))return!1}return!0}function fu(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function pu(e,n){var t=fu(e);e=0;for(var r;t;){if(t.nodeType===3){if(r=e+t.textContent.length,e<=n&&r>=n)return{node:t,offset:n-e};e=r}e:{for(;t;){if(t.nextSibling){t=t.nextSibling;break e}t=t.parentNode}t=void 0}t=fu(t)}}function Ys(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?Ys(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function Xs(){for(var e=window,n=Br();n instanceof e.HTMLIFrameElement;){try{var t=typeof n.contentWindow.location.href=="string"}catch{t=!1}if(t)e=n.contentWindow;else break;n=Br(e.document)}return n}function po(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}function Kd(e){var n=Xs(),t=e.focusedElem,r=e.selectionRange;if(n!==t&&t&&t.ownerDocument&&Ys(t.ownerDocument.documentElement,t)){if(r!==null&&po(t)){if(n=r.start,e=r.end,e===void 0&&(e=n),"selectionStart"in t)t.selectionStart=n,t.selectionEnd=Math.min(e,t.value.length);else if(e=(n=t.ownerDocument||document)&&n.defaultView||window,e.getSelection){e=e.getSelection();var l=t.textContent.length,i=Math.min(r.start,l);r=r.end===void 0?i:Math.min(r.end,l),!e.extend&&i>r&&(l=r,r=i,i=l),l=pu(t,i);var o=pu(t,r);l&&o&&(e.rangeCount!==1||e.anchorNode!==l.node||e.anchorOffset!==l.offset||e.focusNode!==o.node||e.focusOffset!==o.offset)&&(n=n.createRange(),n.setStart(l.node,l.offset),e.removeAllRanges(),i>r?(e.addRange(n),e.extend(o.node,o.offset)):(n.setEnd(o.node,o.offset),e.addRange(n)))}}for(n=[],e=t;e=e.parentNode;)e.nodeType===1&&n.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof t.focus=="function"&&t.focus(),t=0;t<n.length;t++)e=n[t],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var qd=be&&"documentMode"in document&&11>=document.documentMode,qn=null,wi=null,jt=null,ki=!1;function mu(e,n,t){var r=t.window===t?t.document:t.nodeType===9?t:t.ownerDocument;ki||qn==null||qn!==Br(r)||(r=qn,"selectionStart"in r&&po(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),jt&&Xt(jt,r)||(jt=r,r=Gr(wi,"onSelect"),0<r.length&&(n=new ao("onSelect","select",null,n,t),e.push({event:n,listeners:r}),n.target=qn)))}function wr(e,n){var t={};return t[e.toLowerCase()]=n.toLowerCase(),t["Webkit"+e]="webkit"+n,t["Moz"+e]="moz"+n,t}var Gn={animationend:wr("Animation","AnimationEnd"),animationiteration:wr("Animation","AnimationIteration"),animationstart:wr("Animation","AnimationStart"),transitionend:wr("Transition","TransitionEnd")},Ul={},Zs={};be&&(Zs=document.createElement("div").style,"AnimationEvent"in window||(delete Gn.animationend.animation,delete Gn.animationiteration.animation,delete Gn.animationstart.animation),"TransitionEvent"in window||delete Gn.transitionend.transition);function hl(e){if(Ul[e])return Ul[e];if(!Gn[e])return e;var n=Gn[e],t;for(t in n)if(n.hasOwnProperty(t)&&t in Zs)return Ul[e]=n[t];return e}var Js=hl("animationend"),bs=hl("animationiteration"),ea=hl("animationstart"),na=hl("transitionend"),ta=new Map,hu="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function _n(e,n){ta.set(e,n),Un(n,[e])}for(var $l=0;$l<hu.length;$l++){var Bl=hu[$l],Gd=Bl.toLowerCase(),Yd=Bl[0].toUpperCase()+Bl.slice(1);_n(Gd,"on"+Yd)}_n(Js,"onAnimationEnd");_n(bs,"onAnimationIteration");_n(ea,"onAnimationStart");_n("dblclick","onDoubleClick");_n("focusin","onFocus");_n("focusout","onBlur");_n(na,"onTransitionEnd");st("onMouseEnter",["mouseout","mouseover"]);st("onMouseLeave",["mouseout","mouseover"]);st("onPointerEnter",["pointerout","pointerover"]);st("onPointerLeave",["pointerout","pointerover"]);Un("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Un("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Un("onBeforeInput",["compositionend","keypress","textInput","paste"]);Un("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Un("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Un("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ot="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Xd=new Set("cancel close invalid load scroll toggle".split(" ").concat(Ot));function vu(e,n,t){var r=e.type||"unknown-event";e.currentTarget=t,Gc(r,n,void 0,e),e.currentTarget=null}function ra(e,n){n=(n&4)!==0;for(var t=0;t<e.length;t++){var r=e[t],l=r.event;r=r.listeners;e:{var i=void 0;if(n)for(var o=r.length-1;0<=o;o--){var u=r[o],s=u.instance,c=u.currentTarget;if(u=u.listener,s!==i&&l.isPropagationStopped())break e;vu(l,u,c),i=s}else for(o=0;o<r.length;o++){if(u=r[o],s=u.instance,c=u.currentTarget,u=u.listener,s!==i&&l.isPropagationStopped())break e;vu(l,u,c),i=s}}}if(Vr)throw e=vi,Vr=!1,vi=null,e}function j(e,n){var t=n[Ci];t===void 0&&(t=n[Ci]=new Set);var r=e+"__bubble";t.has(r)||(la(n,e,2,!1),t.add(r))}function Hl(e,n,t){var r=0;n&&(r|=4),la(t,e,r,n)}var kr="_reactListening"+Math.random().toString(36).slice(2);function Zt(e){if(!e[kr]){e[kr]=!0,ds.forEach(function(t){t!=="selectionchange"&&(Xd.has(t)||Hl(t,!1,e),Hl(t,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[kr]||(n[kr]=!0,Hl("selectionchange",!1,n))}}function la(e,n,t,r){switch(Bs(n)){case 1:var l=cd;break;case 4:l=dd;break;default:l=uo}t=l.bind(null,n,t,e),l=void 0,!hi||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(l=!0),r?l!==void 0?e.addEventListener(n,t,{capture:!0,passive:l}):e.addEventListener(n,t,!0):l!==void 0?e.addEventListener(n,t,{passive:l}):e.addEventListener(n,t,!1)}function Vl(e,n,t,r,l){var i=r;if(!(n&1)&&!(n&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var u=r.stateNode.containerInfo;if(u===l||u.nodeType===8&&u.parentNode===l)break;if(o===4)for(o=r.return;o!==null;){var s=o.tag;if((s===3||s===4)&&(s=o.stateNode.containerInfo,s===l||s.nodeType===8&&s.parentNode===l))return;o=o.return}for(;u!==null;){if(o=Ln(u),o===null)return;if(s=o.tag,s===5||s===6){r=i=o;continue e}u=u.parentNode}}r=r.return}Ps(function(){var c=i,h=ro(t),m=[];e:{var p=ta.get(e);if(p!==void 0){var y=ao,S=e;switch(e){case"keypress":if(Or(t)===0)break e;case"keydown":case"keyup":y=Cd;break;case"focusin":S="focus",y=Fl;break;case"focusout":S="blur",y=Fl;break;case"beforeblur":case"afterblur":y=Fl;break;case"click":if(t.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":y=lu;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":y=md;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":y=Ld;break;case Js:case bs:case ea:y=gd;break;case na:y=zd;break;case"scroll":y=fd;break;case"wheel":y=Od;break;case"copy":case"cut":case"paste":y=Sd;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":y=ou}var w=(n&4)!==0,F=!w&&e==="scroll",d=w?p!==null?p+"Capture":null:p;w=[];for(var a=c,f;a!==null;){f=a;var v=f.stateNode;if(f.tag===5&&v!==null&&(f=v,d!==null&&(v=Qt(a,d),v!=null&&w.push(Jt(a,v,f)))),F)break;a=a.return}0<w.length&&(p=new y(p,S,null,t,h),m.push({event:p,listeners:w}))}}if(!(n&7)){e:{if(p=e==="mouseover"||e==="pointerover",y=e==="mouseout"||e==="pointerout",p&&t!==pi&&(S=t.relatedTarget||t.fromElement)&&(Ln(S)||S[en]))break e;if((y||p)&&(p=h.window===h?h:(p=h.ownerDocument)?p.defaultView||p.parentWindow:window,y?(S=t.relatedTarget||t.toElement,y=c,S=S?Ln(S):null,S!==null&&(F=$n(S),S!==F||S.tag!==5&&S.tag!==6)&&(S=null)):(y=null,S=c),y!==S)){if(w=lu,v="onMouseLeave",d="onMouseEnter",a="mouse",(e==="pointerout"||e==="pointerover")&&(w=ou,v="onPointerLeave",d="onPointerEnter",a="pointer"),F=y==null?p:Yn(y),f=S==null?p:Yn(S),p=new w(v,a+"leave",y,t,h),p.target=F,p.relatedTarget=f,v=null,Ln(h)===c&&(w=new w(d,a+"enter",S,t,h),w.target=f,w.relatedTarget=F,v=w),F=v,y&&S)n:{for(w=y,d=S,a=0,f=w;f;f=Vn(f))a++;for(f=0,v=d;v;v=Vn(v))f++;for(;0<a-f;)w=Vn(w),a--;for(;0<f-a;)d=Vn(d),f--;for(;a--;){if(w===d||d!==null&&w===d.alternate)break n;w=Vn(w),d=Vn(d)}w=null}else w=null;y!==null&&gu(m,p,y,w,!1),S!==null&&F!==null&&gu(m,F,S,w,!0)}}e:{if(p=c?Yn(c):window,y=p.nodeName&&p.nodeName.toLowerCase(),y==="select"||y==="input"&&p.type==="file")var k=$d;else if(au(p))if(qs)k=Wd;else{k=Hd;var _=Bd}else(y=p.nodeName)&&y.toLowerCase()==="input"&&(p.type==="checkbox"||p.type==="radio")&&(k=Vd);if(k&&(k=k(e,c))){Ks(m,k,t,h);break e}_&&_(e,p,c),e==="focusout"&&(_=p._wrapperState)&&_.controlled&&p.type==="number"&&si(p,"number",p.value)}switch(_=c?Yn(c):window,e){case"focusin":(au(_)||_.contentEditable==="true")&&(qn=_,wi=c,jt=null);break;case"focusout":jt=wi=qn=null;break;case"mousedown":ki=!0;break;case"contextmenu":case"mouseup":case"dragend":ki=!1,mu(m,t,h);break;case"selectionchange":if(qd)break;case"keydown":case"keyup":mu(m,t,h)}var N;if(fo)e:{switch(e){case"compositionstart":var C="onCompositionStart";break e;case"compositionend":C="onCompositionEnd";break e;case"compositionupdate":C="onCompositionUpdate";break e}C=void 0}else Kn?Ws(e,t)&&(C="onCompositionEnd"):e==="keydown"&&t.keyCode===229&&(C="onCompositionStart");C&&(Vs&&t.locale!=="ko"&&(Kn||C!=="onCompositionStart"?C==="onCompositionEnd"&&Kn&&(N=Hs()):(fn=h,so="value"in fn?fn.value:fn.textContent,Kn=!0)),_=Gr(c,C),0<_.length&&(C=new iu(C,e,null,t,h),m.push({event:C,listeners:_}),N?C.data=N:(N=Qs(t),N!==null&&(C.data=N)))),(N=Md?Fd(e,t):Dd(e,t))&&(c=Gr(c,"onBeforeInput"),0<c.length&&(h=new iu("onBeforeInput","beforeinput",null,t,h),m.push({event:h,listeners:c}),h.data=N))}ra(m,n)})}function Jt(e,n,t){return{instance:e,listener:n,currentTarget:t}}function Gr(e,n){for(var t=n+"Capture",r=[];e!==null;){var l=e,i=l.stateNode;l.tag===5&&i!==null&&(l=i,i=Qt(e,t),i!=null&&r.unshift(Jt(e,i,l)),i=Qt(e,n),i!=null&&r.push(Jt(e,i,l))),e=e.return}return r}function Vn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function gu(e,n,t,r,l){for(var i=n._reactName,o=[];t!==null&&t!==r;){var u=t,s=u.alternate,c=u.stateNode;if(s!==null&&s===r)break;u.tag===5&&c!==null&&(u=c,l?(s=Qt(t,i),s!=null&&o.unshift(Jt(t,s,u))):l||(s=Qt(t,i),s!=null&&o.push(Jt(t,s,u)))),t=t.return}o.length!==0&&e.push({event:n,listeners:o})}var Zd=/\r\n?/g,Jd=/\u0000|\uFFFD/g;function yu(e){return(typeof e=="string"?e:""+e).replace(Zd,`
`).replace(Jd,"")}function xr(e,n,t){if(n=yu(n),yu(e)!==n&&t)throw Error(g(425))}function Yr(){}var xi=null,Ei=null;function _i(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var Ni=typeof setTimeout=="function"?setTimeout:void 0,bd=typeof clearTimeout=="function"?clearTimeout:void 0,Su=typeof Promise=="function"?Promise:void 0,ef=typeof queueMicrotask=="function"?queueMicrotask:typeof Su<"u"?function(e){return Su.resolve(null).then(e).catch(nf)}:Ni;function nf(e){setTimeout(function(){throw e})}function Wl(e,n){var t=n,r=0;do{var l=t.nextSibling;if(e.removeChild(t),l&&l.nodeType===8)if(t=l.data,t==="/$"){if(r===0){e.removeChild(l),Gt(n);return}r--}else t!=="$"&&t!=="$?"&&t!=="$!"||r++;t=l}while(t);Gt(n)}function gn(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?")break;if(n==="/$")return null}}return e}function wu(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="$"||t==="$!"||t==="$?"){if(n===0)return e;n--}else t==="/$"&&n++}e=e.previousSibling}return null}var gt=Math.random().toString(36).slice(2),We="__reactFiber$"+gt,bt="__reactProps$"+gt,en="__reactContainer$"+gt,Ci="__reactEvents$"+gt,tf="__reactListeners$"+gt,rf="__reactHandles$"+gt;function Ln(e){var n=e[We];if(n)return n;for(var t=e.parentNode;t;){if(n=t[en]||t[We]){if(t=n.alternate,n.child!==null||t!==null&&t.child!==null)for(e=wu(e);e!==null;){if(t=e[We])return t;e=wu(e)}return n}e=t,t=e.parentNode}return null}function ar(e){return e=e[We]||e[en],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Yn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(g(33))}function vl(e){return e[bt]||null}var Pi=[],Xn=-1;function Nn(e){return{current:e}}function U(e){0>Xn||(e.current=Pi[Xn],Pi[Xn]=null,Xn--)}function D(e,n){Xn++,Pi[Xn]=e.current,e.current=n}var En={},se=Nn(En),ge=Nn(!1),An=En;function at(e,n){var t=e.type.contextTypes;if(!t)return En;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===n)return r.__reactInternalMemoizedMaskedChildContext;var l={},i;for(i in t)l[i]=n[i];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=n,e.__reactInternalMemoizedMaskedChildContext=l),l}function ye(e){return e=e.childContextTypes,e!=null}function Xr(){U(ge),U(se)}function ku(e,n,t){if(se.current!==En)throw Error(g(168));D(se,n),D(ge,t)}function ia(e,n,t){var r=e.stateNode;if(n=n.childContextTypes,typeof r.getChildContext!="function")return t;r=r.getChildContext();for(var l in r)if(!(l in n))throw Error(g(108,Bc(e)||"Unknown",l));return K({},t,r)}function Zr(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||En,An=se.current,D(se,e),D(ge,ge.current),!0}function xu(e,n,t){var r=e.stateNode;if(!r)throw Error(g(169));t?(e=ia(e,n,An),r.__reactInternalMemoizedMergedChildContext=e,U(ge),U(se),D(se,e)):U(ge),D(ge,t)}var Ye=null,gl=!1,Ql=!1;function oa(e){Ye===null?Ye=[e]:Ye.push(e)}function lf(e){gl=!0,oa(e)}function Cn(){if(!Ql&&Ye!==null){Ql=!0;var e=0,n=M;try{var t=Ye;for(M=1;e<t.length;e++){var r=t[e];do r=r(!0);while(r!==null)}Ye=null,gl=!1}catch(l){throw Ye!==null&&(Ye=Ye.slice(e+1)),zs(lo,Cn),l}finally{M=n,Ql=!1}}return null}var Zn=[],Jn=0,Jr=null,br=0,Pe=[],Te=0,Mn=null,Xe=1,Ze="";function Pn(e,n){Zn[Jn++]=br,Zn[Jn++]=Jr,Jr=e,br=n}function ua(e,n,t){Pe[Te++]=Xe,Pe[Te++]=Ze,Pe[Te++]=Mn,Mn=e;var r=Xe;e=Ze;var l=32-je(r)-1;r&=~(1<<l),t+=1;var i=32-je(n)+l;if(30<i){var o=l-l%5;i=(r&(1<<o)-1).toString(32),r>>=o,l-=o,Xe=1<<32-je(n)+l|t<<l|r,Ze=i+e}else Xe=1<<i|t<<l|r,Ze=e}function mo(e){e.return!==null&&(Pn(e,1),ua(e,1,0))}function ho(e){for(;e===Jr;)Jr=Zn[--Jn],Zn[Jn]=null,br=Zn[--Jn],Zn[Jn]=null;for(;e===Mn;)Mn=Pe[--Te],Pe[Te]=null,Ze=Pe[--Te],Pe[Te]=null,Xe=Pe[--Te],Pe[Te]=null}var xe=null,ke=null,B=!1,De=null;function sa(e,n){var t=Le(5,null,null,0);t.elementType="DELETED",t.stateNode=n,t.return=e,n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)}function Eu(e,n){switch(e.tag){case 5:var t=e.type;return n=n.nodeType!==1||t.toLowerCase()!==n.nodeName.toLowerCase()?null:n,n!==null?(e.stateNode=n,xe=e,ke=gn(n.firstChild),!0):!1;case 6:return n=e.pendingProps===""||n.nodeType!==3?null:n,n!==null?(e.stateNode=n,xe=e,ke=null,!0):!1;case 13:return n=n.nodeType!==8?null:n,n!==null?(t=Mn!==null?{id:Xe,overflow:Ze}:null,e.memoizedState={dehydrated:n,treeContext:t,retryLane:1073741824},t=Le(18,null,null,0),t.stateNode=n,t.return=e,e.child=t,xe=e,ke=null,!0):!1;default:return!1}}function Ti(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Li(e){if(B){var n=ke;if(n){var t=n;if(!Eu(e,n)){if(Ti(e))throw Error(g(418));n=gn(t.nextSibling);var r=xe;n&&Eu(e,n)?sa(r,t):(e.flags=e.flags&-4097|2,B=!1,xe=e)}}else{if(Ti(e))throw Error(g(418));e.flags=e.flags&-4097|2,B=!1,xe=e}}}function _u(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;xe=e}function Er(e){if(e!==xe)return!1;if(!B)return _u(e),B=!0,!1;var n;if((n=e.tag!==3)&&!(n=e.tag!==5)&&(n=e.type,n=n!=="head"&&n!=="body"&&!_i(e.type,e.memoizedProps)),n&&(n=ke)){if(Ti(e))throw aa(),Error(g(418));for(;n;)sa(e,n),n=gn(n.nextSibling)}if(_u(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(g(317));e:{for(e=e.nextSibling,n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="/$"){if(n===0){ke=gn(e.nextSibling);break e}n--}else t!=="$"&&t!=="$!"&&t!=="$?"||n++}e=e.nextSibling}ke=null}}else ke=xe?gn(e.stateNode.nextSibling):null;return!0}function aa(){for(var e=ke;e;)e=gn(e.nextSibling)}function ct(){ke=xe=null,B=!1}function vo(e){De===null?De=[e]:De.push(e)}var of=rn.ReactCurrentBatchConfig;function Pt(e,n,t){if(e=t.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(t._owner){if(t=t._owner,t){if(t.tag!==1)throw Error(g(309));var r=t.stateNode}if(!r)throw Error(g(147,e));var l=r,i=""+e;return n!==null&&n.ref!==null&&typeof n.ref=="function"&&n.ref._stringRef===i?n.ref:(n=function(o){var u=l.refs;o===null?delete u[i]:u[i]=o},n._stringRef=i,n)}if(typeof e!="string")throw Error(g(284));if(!t._owner)throw Error(g(290,e))}return e}function _r(e,n){throw e=Object.prototype.toString.call(n),Error(g(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e))}function Nu(e){var n=e._init;return n(e._payload)}function ca(e){function n(d,a){if(e){var f=d.deletions;f===null?(d.deletions=[a],d.flags|=16):f.push(a)}}function t(d,a){if(!e)return null;for(;a!==null;)n(d,a),a=a.sibling;return null}function r(d,a){for(d=new Map;a!==null;)a.key!==null?d.set(a.key,a):d.set(a.index,a),a=a.sibling;return d}function l(d,a){return d=kn(d,a),d.index=0,d.sibling=null,d}function i(d,a,f){return d.index=f,e?(f=d.alternate,f!==null?(f=f.index,f<a?(d.flags|=2,a):f):(d.flags|=2,a)):(d.flags|=1048576,a)}function o(d){return e&&d.alternate===null&&(d.flags|=2),d}function u(d,a,f,v){return a===null||a.tag!==6?(a=Jl(f,d.mode,v),a.return=d,a):(a=l(a,f),a.return=d,a)}function s(d,a,f,v){var k=f.type;return k===Qn?h(d,a,f.props.children,v,f.key):a!==null&&(a.elementType===k||typeof k=="object"&&k!==null&&k.$$typeof===sn&&Nu(k)===a.type)?(v=l(a,f.props),v.ref=Pt(d,a,f),v.return=d,v):(v=$r(f.type,f.key,f.props,null,d.mode,v),v.ref=Pt(d,a,f),v.return=d,v)}function c(d,a,f,v){return a===null||a.tag!==4||a.stateNode.containerInfo!==f.containerInfo||a.stateNode.implementation!==f.implementation?(a=bl(f,d.mode,v),a.return=d,a):(a=l(a,f.children||[]),a.return=d,a)}function h(d,a,f,v,k){return a===null||a.tag!==7?(a=On(f,d.mode,v,k),a.return=d,a):(a=l(a,f),a.return=d,a)}function m(d,a,f){if(typeof a=="string"&&a!==""||typeof a=="number")return a=Jl(""+a,d.mode,f),a.return=d,a;if(typeof a=="object"&&a!==null){switch(a.$$typeof){case pr:return f=$r(a.type,a.key,a.props,null,d.mode,f),f.ref=Pt(d,null,a),f.return=d,f;case Wn:return a=bl(a,d.mode,f),a.return=d,a;case sn:var v=a._init;return m(d,v(a._payload),f)}if(zt(a)||xt(a))return a=On(a,d.mode,f,null),a.return=d,a;_r(d,a)}return null}function p(d,a,f,v){var k=a!==null?a.key:null;if(typeof f=="string"&&f!==""||typeof f=="number")return k!==null?null:u(d,a,""+f,v);if(typeof f=="object"&&f!==null){switch(f.$$typeof){case pr:return f.key===k?s(d,a,f,v):null;case Wn:return f.key===k?c(d,a,f,v):null;case sn:return k=f._init,p(d,a,k(f._payload),v)}if(zt(f)||xt(f))return k!==null?null:h(d,a,f,v,null);_r(d,f)}return null}function y(d,a,f,v,k){if(typeof v=="string"&&v!==""||typeof v=="number")return d=d.get(f)||null,u(a,d,""+v,k);if(typeof v=="object"&&v!==null){switch(v.$$typeof){case pr:return d=d.get(v.key===null?f:v.key)||null,s(a,d,v,k);case Wn:return d=d.get(v.key===null?f:v.key)||null,c(a,d,v,k);case sn:var _=v._init;return y(d,a,f,_(v._payload),k)}if(zt(v)||xt(v))return d=d.get(f)||null,h(a,d,v,k,null);_r(a,v)}return null}function S(d,a,f,v){for(var k=null,_=null,N=a,C=a=0,$=null;N!==null&&C<f.length;C++){N.index>C?($=N,N=null):$=N.sibling;var z=p(d,N,f[C],v);if(z===null){N===null&&(N=$);break}e&&N&&z.alternate===null&&n(d,N),a=i(z,a,C),_===null?k=z:_.sibling=z,_=z,N=$}if(C===f.length)return t(d,N),B&&Pn(d,C),k;if(N===null){for(;C<f.length;C++)N=m(d,f[C],v),N!==null&&(a=i(N,a,C),_===null?k=N:_.sibling=N,_=N);return B&&Pn(d,C),k}for(N=r(d,N);C<f.length;C++)$=y(N,d,C,f[C],v),$!==null&&(e&&$.alternate!==null&&N.delete($.key===null?C:$.key),a=i($,a,C),_===null?k=$:_.sibling=$,_=$);return e&&N.forEach(function(me){return n(d,me)}),B&&Pn(d,C),k}function w(d,a,f,v){var k=xt(f);if(typeof k!="function")throw Error(g(150));if(f=k.call(f),f==null)throw Error(g(151));for(var _=k=null,N=a,C=a=0,$=null,z=f.next();N!==null&&!z.done;C++,z=f.next()){N.index>C?($=N,N=null):$=N.sibling;var me=p(d,N,z.value,v);if(me===null){N===null&&(N=$);break}e&&N&&me.alternate===null&&n(d,N),a=i(me,a,C),_===null?k=me:_.sibling=me,_=me,N=$}if(z.done)return t(d,N),B&&Pn(d,C),k;if(N===null){for(;!z.done;C++,z=f.next())z=m(d,z.value,v),z!==null&&(a=i(z,a,C),_===null?k=z:_.sibling=z,_=z);return B&&Pn(d,C),k}for(N=r(d,N);!z.done;C++,z=f.next())z=y(N,d,C,z.value,v),z!==null&&(e&&z.alternate!==null&&N.delete(z.key===null?C:z.key),a=i(z,a,C),_===null?k=z:_.sibling=z,_=z);return e&&N.forEach(function(ln){return n(d,ln)}),B&&Pn(d,C),k}function F(d,a,f,v){if(typeof f=="object"&&f!==null&&f.type===Qn&&f.key===null&&(f=f.props.children),typeof f=="object"&&f!==null){switch(f.$$typeof){case pr:e:{for(var k=f.key,_=a;_!==null;){if(_.key===k){if(k=f.type,k===Qn){if(_.tag===7){t(d,_.sibling),a=l(_,f.props.children),a.return=d,d=a;break e}}else if(_.elementType===k||typeof k=="object"&&k!==null&&k.$$typeof===sn&&Nu(k)===_.type){t(d,_.sibling),a=l(_,f.props),a.ref=Pt(d,_,f),a.return=d,d=a;break e}t(d,_);break}else n(d,_);_=_.sibling}f.type===Qn?(a=On(f.props.children,d.mode,v,f.key),a.return=d,d=a):(v=$r(f.type,f.key,f.props,null,d.mode,v),v.ref=Pt(d,a,f),v.return=d,d=v)}return o(d);case Wn:e:{for(_=f.key;a!==null;){if(a.key===_)if(a.tag===4&&a.stateNode.containerInfo===f.containerInfo&&a.stateNode.implementation===f.implementation){t(d,a.sibling),a=l(a,f.children||[]),a.return=d,d=a;break e}else{t(d,a);break}else n(d,a);a=a.sibling}a=bl(f,d.mode,v),a.return=d,d=a}return o(d);case sn:return _=f._init,F(d,a,_(f._payload),v)}if(zt(f))return S(d,a,f,v);if(xt(f))return w(d,a,f,v);_r(d,f)}return typeof f=="string"&&f!==""||typeof f=="number"?(f=""+f,a!==null&&a.tag===6?(t(d,a.sibling),a=l(a,f),a.return=d,d=a):(t(d,a),a=Jl(f,d.mode,v),a.return=d,d=a),o(d)):t(d,a)}return F}var dt=ca(!0),da=ca(!1),el=Nn(null),nl=null,bn=null,go=null;function yo(){go=bn=nl=null}function So(e){var n=el.current;U(el),e._currentValue=n}function Ii(e,n,t){for(;e!==null;){var r=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,r!==null&&(r.childLanes|=n)):r!==null&&(r.childLanes&n)!==n&&(r.childLanes|=n),e===t)break;e=e.return}}function ot(e,n){nl=e,go=bn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&n&&(ve=!0),e.firstContext=null)}function ze(e){var n=e._currentValue;if(go!==e)if(e={context:e,memoizedValue:n,next:null},bn===null){if(nl===null)throw Error(g(308));bn=e,nl.dependencies={lanes:0,firstContext:e}}else bn=bn.next=e;return n}var In=null;function wo(e){In===null?In=[e]:In.push(e)}function fa(e,n,t,r){var l=n.interleaved;return l===null?(t.next=t,wo(n)):(t.next=l.next,l.next=t),n.interleaved=t,nn(e,r)}function nn(e,n){e.lanes|=n;var t=e.alternate;for(t!==null&&(t.lanes|=n),t=e,e=e.return;e!==null;)e.childLanes|=n,t=e.alternate,t!==null&&(t.childLanes|=n),t=e,e=e.return;return t.tag===3?t.stateNode:null}var an=!1;function ko(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function pa(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Je(e,n){return{eventTime:e,lane:n,tag:0,payload:null,callback:null,next:null}}function yn(e,n,t){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,O&2){var l=r.pending;return l===null?n.next=n:(n.next=l.next,l.next=n),r.pending=n,nn(e,t)}return l=r.interleaved,l===null?(n.next=n,wo(r)):(n.next=l.next,l.next=n),r.interleaved=n,nn(e,t)}function Ar(e,n,t){if(n=n.updateQueue,n!==null&&(n=n.shared,(t&4194240)!==0)){var r=n.lanes;r&=e.pendingLanes,t|=r,n.lanes=t,io(e,t)}}function Cu(e,n){var t=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,t===r)){var l=null,i=null;if(t=t.firstBaseUpdate,t!==null){do{var o={eventTime:t.eventTime,lane:t.lane,tag:t.tag,payload:t.payload,callback:t.callback,next:null};i===null?l=i=o:i=i.next=o,t=t.next}while(t!==null);i===null?l=i=n:i=i.next=n}else l=i=n;t={baseState:r.baseState,firstBaseUpdate:l,lastBaseUpdate:i,shared:r.shared,effects:r.effects},e.updateQueue=t;return}e=t.lastBaseUpdate,e===null?t.firstBaseUpdate=n:e.next=n,t.lastBaseUpdate=n}function tl(e,n,t,r){var l=e.updateQueue;an=!1;var i=l.firstBaseUpdate,o=l.lastBaseUpdate,u=l.shared.pending;if(u!==null){l.shared.pending=null;var s=u,c=s.next;s.next=null,o===null?i=c:o.next=c,o=s;var h=e.alternate;h!==null&&(h=h.updateQueue,u=h.lastBaseUpdate,u!==o&&(u===null?h.firstBaseUpdate=c:u.next=c,h.lastBaseUpdate=s))}if(i!==null){var m=l.baseState;o=0,h=c=s=null,u=i;do{var p=u.lane,y=u.eventTime;if((r&p)===p){h!==null&&(h=h.next={eventTime:y,lane:0,tag:u.tag,payload:u.payload,callback:u.callback,next:null});e:{var S=e,w=u;switch(p=n,y=t,w.tag){case 1:if(S=w.payload,typeof S=="function"){m=S.call(y,m,p);break e}m=S;break e;case 3:S.flags=S.flags&-65537|128;case 0:if(S=w.payload,p=typeof S=="function"?S.call(y,m,p):S,p==null)break e;m=K({},m,p);break e;case 2:an=!0}}u.callback!==null&&u.lane!==0&&(e.flags|=64,p=l.effects,p===null?l.effects=[u]:p.push(u))}else y={eventTime:y,lane:p,tag:u.tag,payload:u.payload,callback:u.callback,next:null},h===null?(c=h=y,s=m):h=h.next=y,o|=p;if(u=u.next,u===null){if(u=l.shared.pending,u===null)break;p=u,u=p.next,p.next=null,l.lastBaseUpdate=p,l.shared.pending=null}}while(!0);if(h===null&&(s=m),l.baseState=s,l.firstBaseUpdate=c,l.lastBaseUpdate=h,n=l.shared.interleaved,n!==null){l=n;do o|=l.lane,l=l.next;while(l!==n)}else i===null&&(l.shared.lanes=0);Dn|=o,e.lanes=o,e.memoizedState=m}}function Pu(e,n,t){if(e=n.effects,n.effects=null,e!==null)for(n=0;n<e.length;n++){var r=e[n],l=r.callback;if(l!==null){if(r.callback=null,r=t,typeof l!="function")throw Error(g(191,l));l.call(r)}}}var cr={},Ke=Nn(cr),er=Nn(cr),nr=Nn(cr);function zn(e){if(e===cr)throw Error(g(174));return e}function xo(e,n){switch(D(nr,n),D(er,e),D(Ke,cr),e=n.nodeType,e){case 9:case 11:n=(n=n.documentElement)?n.namespaceURI:ci(null,"");break;default:e=e===8?n.parentNode:n,n=e.namespaceURI||null,e=e.tagName,n=ci(n,e)}U(Ke),D(Ke,n)}function ft(){U(Ke),U(er),U(nr)}function ma(e){zn(nr.current);var n=zn(Ke.current),t=ci(n,e.type);n!==t&&(D(er,e),D(Ke,t))}function Eo(e){er.current===e&&(U(Ke),U(er))}var W=Nn(0);function rl(e){for(var n=e;n!==null;){if(n.tag===13){var t=n.memoizedState;if(t!==null&&(t=t.dehydrated,t===null||t.data==="$?"||t.data==="$!"))return n}else if(n.tag===19&&n.memoizedProps.revealOrder!==void 0){if(n.flags&128)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var Kl=[];function _o(){for(var e=0;e<Kl.length;e++)Kl[e]._workInProgressVersionPrimary=null;Kl.length=0}var Mr=rn.ReactCurrentDispatcher,ql=rn.ReactCurrentBatchConfig,Fn=0,Q=null,Z=null,ee=null,ll=!1,Ut=!1,tr=0,uf=0;function ie(){throw Error(g(321))}function No(e,n){if(n===null)return!1;for(var t=0;t<n.length&&t<e.length;t++)if(!$e(e[t],n[t]))return!1;return!0}function Co(e,n,t,r,l,i){if(Fn=i,Q=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,Mr.current=e===null||e.memoizedState===null?df:ff,e=t(r,l),Ut){i=0;do{if(Ut=!1,tr=0,25<=i)throw Error(g(301));i+=1,ee=Z=null,n.updateQueue=null,Mr.current=pf,e=t(r,l)}while(Ut)}if(Mr.current=il,n=Z!==null&&Z.next!==null,Fn=0,ee=Z=Q=null,ll=!1,n)throw Error(g(300));return e}function Po(){var e=tr!==0;return tr=0,e}function Ve(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ee===null?Q.memoizedState=ee=e:ee=ee.next=e,ee}function Re(){if(Z===null){var e=Q.alternate;e=e!==null?e.memoizedState:null}else e=Z.next;var n=ee===null?Q.memoizedState:ee.next;if(n!==null)ee=n,Z=e;else{if(e===null)throw Error(g(310));Z=e,e={memoizedState:Z.memoizedState,baseState:Z.baseState,baseQueue:Z.baseQueue,queue:Z.queue,next:null},ee===null?Q.memoizedState=ee=e:ee=ee.next=e}return ee}function rr(e,n){return typeof n=="function"?n(e):n}function Gl(e){var n=Re(),t=n.queue;if(t===null)throw Error(g(311));t.lastRenderedReducer=e;var r=Z,l=r.baseQueue,i=t.pending;if(i!==null){if(l!==null){var o=l.next;l.next=i.next,i.next=o}r.baseQueue=l=i,t.pending=null}if(l!==null){i=l.next,r=r.baseState;var u=o=null,s=null,c=i;do{var h=c.lane;if((Fn&h)===h)s!==null&&(s=s.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),r=c.hasEagerState?c.eagerState:e(r,c.action);else{var m={lane:h,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};s===null?(u=s=m,o=r):s=s.next=m,Q.lanes|=h,Dn|=h}c=c.next}while(c!==null&&c!==i);s===null?o=r:s.next=u,$e(r,n.memoizedState)||(ve=!0),n.memoizedState=r,n.baseState=o,n.baseQueue=s,t.lastRenderedState=r}if(e=t.interleaved,e!==null){l=e;do i=l.lane,Q.lanes|=i,Dn|=i,l=l.next;while(l!==e)}else l===null&&(t.lanes=0);return[n.memoizedState,t.dispatch]}function Yl(e){var n=Re(),t=n.queue;if(t===null)throw Error(g(311));t.lastRenderedReducer=e;var r=t.dispatch,l=t.pending,i=n.memoizedState;if(l!==null){t.pending=null;var o=l=l.next;do i=e(i,o.action),o=o.next;while(o!==l);$e(i,n.memoizedState)||(ve=!0),n.memoizedState=i,n.baseQueue===null&&(n.baseState=i),t.lastRenderedState=i}return[i,r]}function ha(){}function va(e,n){var t=Q,r=Re(),l=n(),i=!$e(r.memoizedState,l);if(i&&(r.memoizedState=l,ve=!0),r=r.queue,To(Sa.bind(null,t,r,e),[e]),r.getSnapshot!==n||i||ee!==null&&ee.memoizedState.tag&1){if(t.flags|=2048,lr(9,ya.bind(null,t,r,l,n),void 0,null),ne===null)throw Error(g(349));Fn&30||ga(t,n,l)}return l}function ga(e,n,t){e.flags|=16384,e={getSnapshot:n,value:t},n=Q.updateQueue,n===null?(n={lastEffect:null,stores:null},Q.updateQueue=n,n.stores=[e]):(t=n.stores,t===null?n.stores=[e]:t.push(e))}function ya(e,n,t,r){n.value=t,n.getSnapshot=r,wa(n)&&ka(e)}function Sa(e,n,t){return t(function(){wa(n)&&ka(e)})}function wa(e){var n=e.getSnapshot;e=e.value;try{var t=n();return!$e(e,t)}catch{return!0}}function ka(e){var n=nn(e,1);n!==null&&Ue(n,e,1,-1)}function Tu(e){var n=Ve();return typeof e=="function"&&(e=e()),n.memoizedState=n.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:rr,lastRenderedState:e},n.queue=e,e=e.dispatch=cf.bind(null,Q,e),[n.memoizedState,e]}function lr(e,n,t,r){return e={tag:e,create:n,destroy:t,deps:r,next:null},n=Q.updateQueue,n===null?(n={lastEffect:null,stores:null},Q.updateQueue=n,n.lastEffect=e.next=e):(t=n.lastEffect,t===null?n.lastEffect=e.next=e:(r=t.next,t.next=e,e.next=r,n.lastEffect=e)),e}function xa(){return Re().memoizedState}function Fr(e,n,t,r){var l=Ve();Q.flags|=e,l.memoizedState=lr(1|n,t,void 0,r===void 0?null:r)}function yl(e,n,t,r){var l=Re();r=r===void 0?null:r;var i=void 0;if(Z!==null){var o=Z.memoizedState;if(i=o.destroy,r!==null&&No(r,o.deps)){l.memoizedState=lr(n,t,i,r);return}}Q.flags|=e,l.memoizedState=lr(1|n,t,i,r)}function Lu(e,n){return Fr(8390656,8,e,n)}function To(e,n){return yl(2048,8,e,n)}function Ea(e,n){return yl(4,2,e,n)}function _a(e,n){return yl(4,4,e,n)}function Na(e,n){if(typeof n=="function")return e=e(),n(e),function(){n(null)};if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function Ca(e,n,t){return t=t!=null?t.concat([e]):null,yl(4,4,Na.bind(null,n,e),t)}function Lo(){}function Pa(e,n){var t=Re();n=n===void 0?null:n;var r=t.memoizedState;return r!==null&&n!==null&&No(n,r[1])?r[0]:(t.memoizedState=[e,n],e)}function Ta(e,n){var t=Re();n=n===void 0?null:n;var r=t.memoizedState;return r!==null&&n!==null&&No(n,r[1])?r[0]:(e=e(),t.memoizedState=[e,n],e)}function La(e,n,t){return Fn&21?($e(t,n)||(t=As(),Q.lanes|=t,Dn|=t,e.baseState=!0),n):(e.baseState&&(e.baseState=!1,ve=!0),e.memoizedState=t)}function sf(e,n){var t=M;M=t!==0&&4>t?t:4,e(!0);var r=ql.transition;ql.transition={};try{e(!1),n()}finally{M=t,ql.transition=r}}function Ia(){return Re().memoizedState}function af(e,n,t){var r=wn(e);if(t={lane:r,action:t,hasEagerState:!1,eagerState:null,next:null},za(e))Ra(n,t);else if(t=fa(e,n,t,r),t!==null){var l=de();Ue(t,e,r,l),Oa(t,n,r)}}function cf(e,n,t){var r=wn(e),l={lane:r,action:t,hasEagerState:!1,eagerState:null,next:null};if(za(e))Ra(n,l);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=n.lastRenderedReducer,i!==null))try{var o=n.lastRenderedState,u=i(o,t);if(l.hasEagerState=!0,l.eagerState=u,$e(u,o)){var s=n.interleaved;s===null?(l.next=l,wo(n)):(l.next=s.next,s.next=l),n.interleaved=l;return}}catch{}finally{}t=fa(e,n,l,r),t!==null&&(l=de(),Ue(t,e,r,l),Oa(t,n,r))}}function za(e){var n=e.alternate;return e===Q||n!==null&&n===Q}function Ra(e,n){Ut=ll=!0;var t=e.pending;t===null?n.next=n:(n.next=t.next,t.next=n),e.pending=n}function Oa(e,n,t){if(t&4194240){var r=n.lanes;r&=e.pendingLanes,t|=r,n.lanes=t,io(e,t)}}var il={readContext:ze,useCallback:ie,useContext:ie,useEffect:ie,useImperativeHandle:ie,useInsertionEffect:ie,useLayoutEffect:ie,useMemo:ie,useReducer:ie,useRef:ie,useState:ie,useDebugValue:ie,useDeferredValue:ie,useTransition:ie,useMutableSource:ie,useSyncExternalStore:ie,useId:ie,unstable_isNewReconciler:!1},df={readContext:ze,useCallback:function(e,n){return Ve().memoizedState=[e,n===void 0?null:n],e},useContext:ze,useEffect:Lu,useImperativeHandle:function(e,n,t){return t=t!=null?t.concat([e]):null,Fr(4194308,4,Na.bind(null,n,e),t)},useLayoutEffect:function(e,n){return Fr(4194308,4,e,n)},useInsertionEffect:function(e,n){return Fr(4,2,e,n)},useMemo:function(e,n){var t=Ve();return n=n===void 0?null:n,e=e(),t.memoizedState=[e,n],e},useReducer:function(e,n,t){var r=Ve();return n=t!==void 0?t(n):n,r.memoizedState=r.baseState=n,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:n},r.queue=e,e=e.dispatch=af.bind(null,Q,e),[r.memoizedState,e]},useRef:function(e){var n=Ve();return e={current:e},n.memoizedState=e},useState:Tu,useDebugValue:Lo,useDeferredValue:function(e){return Ve().memoizedState=e},useTransition:function(){var e=Tu(!1),n=e[0];return e=sf.bind(null,e[1]),Ve().memoizedState=e,[n,e]},useMutableSource:function(){},useSyncExternalStore:function(e,n,t){var r=Q,l=Ve();if(B){if(t===void 0)throw Error(g(407));t=t()}else{if(t=n(),ne===null)throw Error(g(349));Fn&30||ga(r,n,t)}l.memoizedState=t;var i={value:t,getSnapshot:n};return l.queue=i,Lu(Sa.bind(null,r,i,e),[e]),r.flags|=2048,lr(9,ya.bind(null,r,i,t,n),void 0,null),t},useId:function(){var e=Ve(),n=ne.identifierPrefix;if(B){var t=Ze,r=Xe;t=(r&~(1<<32-je(r)-1)).toString(32)+t,n=":"+n+"R"+t,t=tr++,0<t&&(n+="H"+t.toString(32)),n+=":"}else t=uf++,n=":"+n+"r"+t.toString(32)+":";return e.memoizedState=n},unstable_isNewReconciler:!1},ff={readContext:ze,useCallback:Pa,useContext:ze,useEffect:To,useImperativeHandle:Ca,useInsertionEffect:Ea,useLayoutEffect:_a,useMemo:Ta,useReducer:Gl,useRef:xa,useState:function(){return Gl(rr)},useDebugValue:Lo,useDeferredValue:function(e){var n=Re();return La(n,Z.memoizedState,e)},useTransition:function(){var e=Gl(rr)[0],n=Re().memoizedState;return[e,n]},useMutableSource:ha,useSyncExternalStore:va,useId:Ia,unstable_isNewReconciler:!1},pf={readContext:ze,useCallback:Pa,useContext:ze,useEffect:To,useImperativeHandle:Ca,useInsertionEffect:Ea,useLayoutEffect:_a,useMemo:Ta,useReducer:Yl,useRef:xa,useState:function(){return Yl(rr)},useDebugValue:Lo,useDeferredValue:function(e){var n=Re();return Z===null?n.memoizedState=e:La(n,Z.memoizedState,e)},useTransition:function(){var e=Yl(rr)[0],n=Re().memoizedState;return[e,n]},useMutableSource:ha,useSyncExternalStore:va,useId:Ia,unstable_isNewReconciler:!1};function Me(e,n){if(e&&e.defaultProps){n=K({},n),e=e.defaultProps;for(var t in e)n[t]===void 0&&(n[t]=e[t]);return n}return n}function zi(e,n,t,r){n=e.memoizedState,t=t(r,n),t=t==null?n:K({},n,t),e.memoizedState=t,e.lanes===0&&(e.updateQueue.baseState=t)}var Sl={isMounted:function(e){return(e=e._reactInternals)?$n(e)===e:!1},enqueueSetState:function(e,n,t){e=e._reactInternals;var r=de(),l=wn(e),i=Je(r,l);i.payload=n,t!=null&&(i.callback=t),n=yn(e,i,l),n!==null&&(Ue(n,e,l,r),Ar(n,e,l))},enqueueReplaceState:function(e,n,t){e=e._reactInternals;var r=de(),l=wn(e),i=Je(r,l);i.tag=1,i.payload=n,t!=null&&(i.callback=t),n=yn(e,i,l),n!==null&&(Ue(n,e,l,r),Ar(n,e,l))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var t=de(),r=wn(e),l=Je(t,r);l.tag=2,n!=null&&(l.callback=n),n=yn(e,l,r),n!==null&&(Ue(n,e,r,t),Ar(n,e,r))}};function Iu(e,n,t,r,l,i,o){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,i,o):n.prototype&&n.prototype.isPureReactComponent?!Xt(t,r)||!Xt(l,i):!0}function Aa(e,n,t){var r=!1,l=En,i=n.contextType;return typeof i=="object"&&i!==null?i=ze(i):(l=ye(n)?An:se.current,r=n.contextTypes,i=(r=r!=null)?at(e,l):En),n=new n(t,i),e.memoizedState=n.state!==null&&n.state!==void 0?n.state:null,n.updater=Sl,e.stateNode=n,n._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=l,e.__reactInternalMemoizedMaskedChildContext=i),n}function zu(e,n,t,r){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(t,r),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(t,r),n.state!==e&&Sl.enqueueReplaceState(n,n.state,null)}function Ri(e,n,t,r){var l=e.stateNode;l.props=t,l.state=e.memoizedState,l.refs={},ko(e);var i=n.contextType;typeof i=="object"&&i!==null?l.context=ze(i):(i=ye(n)?An:se.current,l.context=at(e,i)),l.state=e.memoizedState,i=n.getDerivedStateFromProps,typeof i=="function"&&(zi(e,n,i,t),l.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof l.getSnapshotBeforeUpdate=="function"||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(n=l.state,typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount(),n!==l.state&&Sl.enqueueReplaceState(l,l.state,null),tl(e,t,l,r),l.state=e.memoizedState),typeof l.componentDidMount=="function"&&(e.flags|=4194308)}function pt(e,n){try{var t="",r=n;do t+=$c(r),r=r.return;while(r);var l=t}catch(i){l=`
Error generating stack: `+i.message+`
`+i.stack}return{value:e,source:n,stack:l,digest:null}}function Xl(e,n,t){return{value:e,source:null,stack:t??null,digest:n??null}}function Oi(e,n){try{console.error(n.value)}catch(t){setTimeout(function(){throw t})}}var mf=typeof WeakMap=="function"?WeakMap:Map;function Ma(e,n,t){t=Je(-1,t),t.tag=3,t.payload={element:null};var r=n.value;return t.callback=function(){ul||(ul=!0,Vi=r),Oi(e,n)},t}function Fa(e,n,t){t=Je(-1,t),t.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var l=n.value;t.payload=function(){return r(l)},t.callback=function(){Oi(e,n)}}var i=e.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(t.callback=function(){Oi(e,n),typeof r!="function"&&(Sn===null?Sn=new Set([this]):Sn.add(this));var o=n.stack;this.componentDidCatch(n.value,{componentStack:o!==null?o:""})}),t}function Ru(e,n,t){var r=e.pingCache;if(r===null){r=e.pingCache=new mf;var l=new Set;r.set(n,l)}else l=r.get(n),l===void 0&&(l=new Set,r.set(n,l));l.has(t)||(l.add(t),e=Tf.bind(null,e,n,t),n.then(e,e))}function Ou(e){do{var n;if((n=e.tag===13)&&(n=e.memoizedState,n=n!==null?n.dehydrated!==null:!0),n)return e;e=e.return}while(e!==null);return null}function Au(e,n,t,r,l){return e.mode&1?(e.flags|=65536,e.lanes=l,e):(e===n?e.flags|=65536:(e.flags|=128,t.flags|=131072,t.flags&=-52805,t.tag===1&&(t.alternate===null?t.tag=17:(n=Je(-1,1),n.tag=2,yn(t,n,1))),t.lanes|=1),e)}var hf=rn.ReactCurrentOwner,ve=!1;function ce(e,n,t,r){n.child=e===null?da(n,null,t,r):dt(n,e.child,t,r)}function Mu(e,n,t,r,l){t=t.render;var i=n.ref;return ot(n,l),r=Co(e,n,t,r,i,l),t=Po(),e!==null&&!ve?(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~l,tn(e,n,l)):(B&&t&&mo(n),n.flags|=1,ce(e,n,r,l),n.child)}function Fu(e,n,t,r,l){if(e===null){var i=t.type;return typeof i=="function"&&!Do(i)&&i.defaultProps===void 0&&t.compare===null&&t.defaultProps===void 0?(n.tag=15,n.type=i,Da(e,n,i,r,l)):(e=$r(t.type,null,r,n,n.mode,l),e.ref=n.ref,e.return=n,n.child=e)}if(i=e.child,!(e.lanes&l)){var o=i.memoizedProps;if(t=t.compare,t=t!==null?t:Xt,t(o,r)&&e.ref===n.ref)return tn(e,n,l)}return n.flags|=1,e=kn(i,r),e.ref=n.ref,e.return=n,n.child=e}function Da(e,n,t,r,l){if(e!==null){var i=e.memoizedProps;if(Xt(i,r)&&e.ref===n.ref)if(ve=!1,n.pendingProps=r=i,(e.lanes&l)!==0)e.flags&131072&&(ve=!0);else return n.lanes=e.lanes,tn(e,n,l)}return Ai(e,n,t,r,l)}function ja(e,n,t){var r=n.pendingProps,l=r.children,i=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(n.mode&1))n.memoizedState={baseLanes:0,cachePool:null,transitions:null},D(nt,we),we|=t;else{if(!(t&1073741824))return e=i!==null?i.baseLanes|t:t,n.lanes=n.childLanes=1073741824,n.memoizedState={baseLanes:e,cachePool:null,transitions:null},n.updateQueue=null,D(nt,we),we|=e,null;n.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=i!==null?i.baseLanes:t,D(nt,we),we|=r}else i!==null?(r=i.baseLanes|t,n.memoizedState=null):r=t,D(nt,we),we|=r;return ce(e,n,l,t),n.child}function Ua(e,n){var t=n.ref;(e===null&&t!==null||e!==null&&e.ref!==t)&&(n.flags|=512,n.flags|=2097152)}function Ai(e,n,t,r,l){var i=ye(t)?An:se.current;return i=at(n,i),ot(n,l),t=Co(e,n,t,r,i,l),r=Po(),e!==null&&!ve?(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~l,tn(e,n,l)):(B&&r&&mo(n),n.flags|=1,ce(e,n,t,l),n.child)}function Du(e,n,t,r,l){if(ye(t)){var i=!0;Zr(n)}else i=!1;if(ot(n,l),n.stateNode===null)Dr(e,n),Aa(n,t,r),Ri(n,t,r,l),r=!0;else if(e===null){var o=n.stateNode,u=n.memoizedProps;o.props=u;var s=o.context,c=t.contextType;typeof c=="object"&&c!==null?c=ze(c):(c=ye(t)?An:se.current,c=at(n,c));var h=t.getDerivedStateFromProps,m=typeof h=="function"||typeof o.getSnapshotBeforeUpdate=="function";m||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(u!==r||s!==c)&&zu(n,o,r,c),an=!1;var p=n.memoizedState;o.state=p,tl(n,r,o,l),s=n.memoizedState,u!==r||p!==s||ge.current||an?(typeof h=="function"&&(zi(n,t,h,r),s=n.memoizedState),(u=an||Iu(n,t,u,r,p,s,c))?(m||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(n.flags|=4194308)):(typeof o.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=r,n.memoizedState=s),o.props=r,o.state=s,o.context=c,r=u):(typeof o.componentDidMount=="function"&&(n.flags|=4194308),r=!1)}else{o=n.stateNode,pa(e,n),u=n.memoizedProps,c=n.type===n.elementType?u:Me(n.type,u),o.props=c,m=n.pendingProps,p=o.context,s=t.contextType,typeof s=="object"&&s!==null?s=ze(s):(s=ye(t)?An:se.current,s=at(n,s));var y=t.getDerivedStateFromProps;(h=typeof y=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(u!==m||p!==s)&&zu(n,o,r,s),an=!1,p=n.memoizedState,o.state=p,tl(n,r,o,l);var S=n.memoizedState;u!==m||p!==S||ge.current||an?(typeof y=="function"&&(zi(n,t,y,r),S=n.memoizedState),(c=an||Iu(n,t,c,r,p,S,s)||!1)?(h||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,S,s),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,S,s)),typeof o.componentDidUpdate=="function"&&(n.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof o.componentDidUpdate!="function"||u===e.memoizedProps&&p===e.memoizedState||(n.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||u===e.memoizedProps&&p===e.memoizedState||(n.flags|=1024),n.memoizedProps=r,n.memoizedState=S),o.props=r,o.state=S,o.context=s,r=c):(typeof o.componentDidUpdate!="function"||u===e.memoizedProps&&p===e.memoizedState||(n.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||u===e.memoizedProps&&p===e.memoizedState||(n.flags|=1024),r=!1)}return Mi(e,n,t,r,i,l)}function Mi(e,n,t,r,l,i){Ua(e,n);var o=(n.flags&128)!==0;if(!r&&!o)return l&&xu(n,t,!1),tn(e,n,i);r=n.stateNode,hf.current=n;var u=o&&typeof t.getDerivedStateFromError!="function"?null:r.render();return n.flags|=1,e!==null&&o?(n.child=dt(n,e.child,null,i),n.child=dt(n,null,u,i)):ce(e,n,u,i),n.memoizedState=r.state,l&&xu(n,t,!0),n.child}function $a(e){var n=e.stateNode;n.pendingContext?ku(e,n.pendingContext,n.pendingContext!==n.context):n.context&&ku(e,n.context,!1),xo(e,n.containerInfo)}function ju(e,n,t,r,l){return ct(),vo(l),n.flags|=256,ce(e,n,t,r),n.child}var Fi={dehydrated:null,treeContext:null,retryLane:0};function Di(e){return{baseLanes:e,cachePool:null,transitions:null}}function Ba(e,n,t){var r=n.pendingProps,l=W.current,i=!1,o=(n.flags&128)!==0,u;if((u=o)||(u=e!==null&&e.memoizedState===null?!1:(l&2)!==0),u?(i=!0,n.flags&=-129):(e===null||e.memoizedState!==null)&&(l|=1),D(W,l&1),e===null)return Li(n),e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(n.mode&1?e.data==="$!"?n.lanes=8:n.lanes=1073741824:n.lanes=1,null):(o=r.children,e=r.fallback,i?(r=n.mode,i=n.child,o={mode:"hidden",children:o},!(r&1)&&i!==null?(i.childLanes=0,i.pendingProps=o):i=xl(o,r,0,null),e=On(e,r,t,null),i.return=n,e.return=n,i.sibling=e,n.child=i,n.child.memoizedState=Di(t),n.memoizedState=Fi,e):Io(n,o));if(l=e.memoizedState,l!==null&&(u=l.dehydrated,u!==null))return vf(e,n,o,r,u,l,t);if(i){i=r.fallback,o=n.mode,l=e.child,u=l.sibling;var s={mode:"hidden",children:r.children};return!(o&1)&&n.child!==l?(r=n.child,r.childLanes=0,r.pendingProps=s,n.deletions=null):(r=kn(l,s),r.subtreeFlags=l.subtreeFlags&14680064),u!==null?i=kn(u,i):(i=On(i,o,t,null),i.flags|=2),i.return=n,r.return=n,r.sibling=i,n.child=r,r=i,i=n.child,o=e.child.memoizedState,o=o===null?Di(t):{baseLanes:o.baseLanes|t,cachePool:null,transitions:o.transitions},i.memoizedState=o,i.childLanes=e.childLanes&~t,n.memoizedState=Fi,r}return i=e.child,e=i.sibling,r=kn(i,{mode:"visible",children:r.children}),!(n.mode&1)&&(r.lanes=t),r.return=n,r.sibling=null,e!==null&&(t=n.deletions,t===null?(n.deletions=[e],n.flags|=16):t.push(e)),n.child=r,n.memoizedState=null,r}function Io(e,n){return n=xl({mode:"visible",children:n},e.mode,0,null),n.return=e,e.child=n}function Nr(e,n,t,r){return r!==null&&vo(r),dt(n,e.child,null,t),e=Io(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function vf(e,n,t,r,l,i,o){if(t)return n.flags&256?(n.flags&=-257,r=Xl(Error(g(422))),Nr(e,n,o,r)):n.memoizedState!==null?(n.child=e.child,n.flags|=128,null):(i=r.fallback,l=n.mode,r=xl({mode:"visible",children:r.children},l,0,null),i=On(i,l,o,null),i.flags|=2,r.return=n,i.return=n,r.sibling=i,n.child=r,n.mode&1&&dt(n,e.child,null,o),n.child.memoizedState=Di(o),n.memoizedState=Fi,i);if(!(n.mode&1))return Nr(e,n,o,null);if(l.data==="$!"){if(r=l.nextSibling&&l.nextSibling.dataset,r)var u=r.dgst;return r=u,i=Error(g(419)),r=Xl(i,r,void 0),Nr(e,n,o,r)}if(u=(o&e.childLanes)!==0,ve||u){if(r=ne,r!==null){switch(o&-o){case 4:l=2;break;case 16:l=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:l=32;break;case 536870912:l=268435456;break;default:l=0}l=l&(r.suspendedLanes|o)?0:l,l!==0&&l!==i.retryLane&&(i.retryLane=l,nn(e,l),Ue(r,e,l,-1))}return Fo(),r=Xl(Error(g(421))),Nr(e,n,o,r)}return l.data==="$?"?(n.flags|=128,n.child=e.child,n=Lf.bind(null,e),l._reactRetry=n,null):(e=i.treeContext,ke=gn(l.nextSibling),xe=n,B=!0,De=null,e!==null&&(Pe[Te++]=Xe,Pe[Te++]=Ze,Pe[Te++]=Mn,Xe=e.id,Ze=e.overflow,Mn=n),n=Io(n,r.children),n.flags|=4096,n)}function Uu(e,n,t){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n),Ii(e.return,n,t)}function Zl(e,n,t,r,l){var i=e.memoizedState;i===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:r,tail:t,tailMode:l}:(i.isBackwards=n,i.rendering=null,i.renderingStartTime=0,i.last=r,i.tail=t,i.tailMode=l)}function Ha(e,n,t){var r=n.pendingProps,l=r.revealOrder,i=r.tail;if(ce(e,n,r.children,t),r=W.current,r&2)r=r&1|2,n.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Uu(e,t,n);else if(e.tag===19)Uu(e,t,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break e;for(;e.sibling===null;){if(e.return===null||e.return===n)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(D(W,r),!(n.mode&1))n.memoizedState=null;else switch(l){case"forwards":for(t=n.child,l=null;t!==null;)e=t.alternate,e!==null&&rl(e)===null&&(l=t),t=t.sibling;t=l,t===null?(l=n.child,n.child=null):(l=t.sibling,t.sibling=null),Zl(n,!1,l,t,i);break;case"backwards":for(t=null,l=n.child,n.child=null;l!==null;){if(e=l.alternate,e!==null&&rl(e)===null){n.child=l;break}e=l.sibling,l.sibling=t,t=l,l=e}Zl(n,!0,t,null,i);break;case"together":Zl(n,!1,null,null,void 0);break;default:n.memoizedState=null}return n.child}function Dr(e,n){!(n.mode&1)&&e!==null&&(e.alternate=null,n.alternate=null,n.flags|=2)}function tn(e,n,t){if(e!==null&&(n.dependencies=e.dependencies),Dn|=n.lanes,!(t&n.childLanes))return null;if(e!==null&&n.child!==e.child)throw Error(g(153));if(n.child!==null){for(e=n.child,t=kn(e,e.pendingProps),n.child=t,t.return=n;e.sibling!==null;)e=e.sibling,t=t.sibling=kn(e,e.pendingProps),t.return=n;t.sibling=null}return n.child}function gf(e,n,t){switch(n.tag){case 3:$a(n),ct();break;case 5:ma(n);break;case 1:ye(n.type)&&Zr(n);break;case 4:xo(n,n.stateNode.containerInfo);break;case 10:var r=n.type._context,l=n.memoizedProps.value;D(el,r._currentValue),r._currentValue=l;break;case 13:if(r=n.memoizedState,r!==null)return r.dehydrated!==null?(D(W,W.current&1),n.flags|=128,null):t&n.child.childLanes?Ba(e,n,t):(D(W,W.current&1),e=tn(e,n,t),e!==null?e.sibling:null);D(W,W.current&1);break;case 19:if(r=(t&n.childLanes)!==0,e.flags&128){if(r)return Ha(e,n,t);n.flags|=128}if(l=n.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),D(W,W.current),r)break;return null;case 22:case 23:return n.lanes=0,ja(e,n,t)}return tn(e,n,t)}var Va,ji,Wa,Qa;Va=function(e,n){for(var t=n.child;t!==null;){if(t.tag===5||t.tag===6)e.appendChild(t.stateNode);else if(t.tag!==4&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===n)break;for(;t.sibling===null;){if(t.return===null||t.return===n)return;t=t.return}t.sibling.return=t.return,t=t.sibling}};ji=function(){};Wa=function(e,n,t,r){var l=e.memoizedProps;if(l!==r){e=n.stateNode,zn(Ke.current);var i=null;switch(t){case"input":l=oi(e,l),r=oi(e,r),i=[];break;case"select":l=K({},l,{value:void 0}),r=K({},r,{value:void 0}),i=[];break;case"textarea":l=ai(e,l),r=ai(e,r),i=[];break;default:typeof l.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Yr)}di(t,r);var o;t=null;for(c in l)if(!r.hasOwnProperty(c)&&l.hasOwnProperty(c)&&l[c]!=null)if(c==="style"){var u=l[c];for(o in u)u.hasOwnProperty(o)&&(t||(t={}),t[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(Vt.hasOwnProperty(c)?i||(i=[]):(i=i||[]).push(c,null));for(c in r){var s=r[c];if(u=l!=null?l[c]:void 0,r.hasOwnProperty(c)&&s!==u&&(s!=null||u!=null))if(c==="style")if(u){for(o in u)!u.hasOwnProperty(o)||s&&s.hasOwnProperty(o)||(t||(t={}),t[o]="");for(o in s)s.hasOwnProperty(o)&&u[o]!==s[o]&&(t||(t={}),t[o]=s[o])}else t||(i||(i=[]),i.push(c,t)),t=s;else c==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,u=u?u.__html:void 0,s!=null&&u!==s&&(i=i||[]).push(c,s)):c==="children"?typeof s!="string"&&typeof s!="number"||(i=i||[]).push(c,""+s):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(Vt.hasOwnProperty(c)?(s!=null&&c==="onScroll"&&j("scroll",e),i||u===s||(i=[])):(i=i||[]).push(c,s))}t&&(i=i||[]).push("style",t);var c=i;(n.updateQueue=c)&&(n.flags|=4)}};Qa=function(e,n,t,r){t!==r&&(n.flags|=4)};function Tt(e,n){if(!B)switch(e.tailMode){case"hidden":n=e.tail;for(var t=null;n!==null;)n.alternate!==null&&(t=n),n=n.sibling;t===null?e.tail=null:t.sibling=null;break;case"collapsed":t=e.tail;for(var r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function oe(e){var n=e.alternate!==null&&e.alternate.child===e.child,t=0,r=0;if(n)for(var l=e.child;l!==null;)t|=l.lanes|l.childLanes,r|=l.subtreeFlags&14680064,r|=l.flags&14680064,l.return=e,l=l.sibling;else for(l=e.child;l!==null;)t|=l.lanes|l.childLanes,r|=l.subtreeFlags,r|=l.flags,l.return=e,l=l.sibling;return e.subtreeFlags|=r,e.childLanes=t,n}function yf(e,n,t){var r=n.pendingProps;switch(ho(n),n.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return oe(n),null;case 1:return ye(n.type)&&Xr(),oe(n),null;case 3:return r=n.stateNode,ft(),U(ge),U(se),_o(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Er(n)?n.flags|=4:e===null||e.memoizedState.isDehydrated&&!(n.flags&256)||(n.flags|=1024,De!==null&&(Ki(De),De=null))),ji(e,n),oe(n),null;case 5:Eo(n);var l=zn(nr.current);if(t=n.type,e!==null&&n.stateNode!=null)Wa(e,n,t,r,l),e.ref!==n.ref&&(n.flags|=512,n.flags|=2097152);else{if(!r){if(n.stateNode===null)throw Error(g(166));return oe(n),null}if(e=zn(Ke.current),Er(n)){r=n.stateNode,t=n.type;var i=n.memoizedProps;switch(r[We]=n,r[bt]=i,e=(n.mode&1)!==0,t){case"dialog":j("cancel",r),j("close",r);break;case"iframe":case"object":case"embed":j("load",r);break;case"video":case"audio":for(l=0;l<Ot.length;l++)j(Ot[l],r);break;case"source":j("error",r);break;case"img":case"image":case"link":j("error",r),j("load",r);break;case"details":j("toggle",r);break;case"input":Go(r,i),j("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!i.multiple},j("invalid",r);break;case"textarea":Xo(r,i),j("invalid",r)}di(t,i),l=null;for(var o in i)if(i.hasOwnProperty(o)){var u=i[o];o==="children"?typeof u=="string"?r.textContent!==u&&(i.suppressHydrationWarning!==!0&&xr(r.textContent,u,e),l=["children",u]):typeof u=="number"&&r.textContent!==""+u&&(i.suppressHydrationWarning!==!0&&xr(r.textContent,u,e),l=["children",""+u]):Vt.hasOwnProperty(o)&&u!=null&&o==="onScroll"&&j("scroll",r)}switch(t){case"input":mr(r),Yo(r,i,!0);break;case"textarea":mr(r),Zo(r);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(r.onclick=Yr)}r=l,n.updateQueue=r,r!==null&&(n.flags|=4)}else{o=l.nodeType===9?l:l.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Ss(t)),e==="http://www.w3.org/1999/xhtml"?t==="script"?(e=o.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=o.createElement(t,{is:r.is}):(e=o.createElement(t),t==="select"&&(o=e,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):e=o.createElementNS(e,t),e[We]=n,e[bt]=r,Va(e,n,!1,!1),n.stateNode=e;e:{switch(o=fi(t,r),t){case"dialog":j("cancel",e),j("close",e),l=r;break;case"iframe":case"object":case"embed":j("load",e),l=r;break;case"video":case"audio":for(l=0;l<Ot.length;l++)j(Ot[l],e);l=r;break;case"source":j("error",e),l=r;break;case"img":case"image":case"link":j("error",e),j("load",e),l=r;break;case"details":j("toggle",e),l=r;break;case"input":Go(e,r),l=oi(e,r),j("invalid",e);break;case"option":l=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},l=K({},r,{value:void 0}),j("invalid",e);break;case"textarea":Xo(e,r),l=ai(e,r),j("invalid",e);break;default:l=r}di(t,l),u=l;for(i in u)if(u.hasOwnProperty(i)){var s=u[i];i==="style"?xs(e,s):i==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,s!=null&&ws(e,s)):i==="children"?typeof s=="string"?(t!=="textarea"||s!=="")&&Wt(e,s):typeof s=="number"&&Wt(e,""+s):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(Vt.hasOwnProperty(i)?s!=null&&i==="onScroll"&&j("scroll",e):s!=null&&bi(e,i,s,o))}switch(t){case"input":mr(e),Yo(e,r,!1);break;case"textarea":mr(e),Zo(e);break;case"option":r.value!=null&&e.setAttribute("value",""+xn(r.value));break;case"select":e.multiple=!!r.multiple,i=r.value,i!=null?tt(e,!!r.multiple,i,!1):r.defaultValue!=null&&tt(e,!!r.multiple,r.defaultValue,!0);break;default:typeof l.onClick=="function"&&(e.onclick=Yr)}switch(t){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(n.flags|=4)}n.ref!==null&&(n.flags|=512,n.flags|=2097152)}return oe(n),null;case 6:if(e&&n.stateNode!=null)Qa(e,n,e.memoizedProps,r);else{if(typeof r!="string"&&n.stateNode===null)throw Error(g(166));if(t=zn(nr.current),zn(Ke.current),Er(n)){if(r=n.stateNode,t=n.memoizedProps,r[We]=n,(i=r.nodeValue!==t)&&(e=xe,e!==null))switch(e.tag){case 3:xr(r.nodeValue,t,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&xr(r.nodeValue,t,(e.mode&1)!==0)}i&&(n.flags|=4)}else r=(t.nodeType===9?t:t.ownerDocument).createTextNode(r),r[We]=n,n.stateNode=r}return oe(n),null;case 13:if(U(W),r=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(B&&ke!==null&&n.mode&1&&!(n.flags&128))aa(),ct(),n.flags|=98560,i=!1;else if(i=Er(n),r!==null&&r.dehydrated!==null){if(e===null){if(!i)throw Error(g(318));if(i=n.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(g(317));i[We]=n}else ct(),!(n.flags&128)&&(n.memoizedState=null),n.flags|=4;oe(n),i=!1}else De!==null&&(Ki(De),De=null),i=!0;if(!i)return n.flags&65536?n:null}return n.flags&128?(n.lanes=t,n):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(n.child.flags|=8192,n.mode&1&&(e===null||W.current&1?J===0&&(J=3):Fo())),n.updateQueue!==null&&(n.flags|=4),oe(n),null);case 4:return ft(),ji(e,n),e===null&&Zt(n.stateNode.containerInfo),oe(n),null;case 10:return So(n.type._context),oe(n),null;case 17:return ye(n.type)&&Xr(),oe(n),null;case 19:if(U(W),i=n.memoizedState,i===null)return oe(n),null;if(r=(n.flags&128)!==0,o=i.rendering,o===null)if(r)Tt(i,!1);else{if(J!==0||e!==null&&e.flags&128)for(e=n.child;e!==null;){if(o=rl(e),o!==null){for(n.flags|=128,Tt(i,!1),r=o.updateQueue,r!==null&&(n.updateQueue=r,n.flags|=4),n.subtreeFlags=0,r=t,t=n.child;t!==null;)i=t,e=r,i.flags&=14680066,o=i.alternate,o===null?(i.childLanes=0,i.lanes=e,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=o.childLanes,i.lanes=o.lanes,i.child=o.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=o.memoizedProps,i.memoizedState=o.memoizedState,i.updateQueue=o.updateQueue,i.type=o.type,e=o.dependencies,i.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t=t.sibling;return D(W,W.current&1|2),n.child}e=e.sibling}i.tail!==null&&G()>mt&&(n.flags|=128,r=!0,Tt(i,!1),n.lanes=4194304)}else{if(!r)if(e=rl(o),e!==null){if(n.flags|=128,r=!0,t=e.updateQueue,t!==null&&(n.updateQueue=t,n.flags|=4),Tt(i,!0),i.tail===null&&i.tailMode==="hidden"&&!o.alternate&&!B)return oe(n),null}else 2*G()-i.renderingStartTime>mt&&t!==1073741824&&(n.flags|=128,r=!0,Tt(i,!1),n.lanes=4194304);i.isBackwards?(o.sibling=n.child,n.child=o):(t=i.last,t!==null?t.sibling=o:n.child=o,i.last=o)}return i.tail!==null?(n=i.tail,i.rendering=n,i.tail=n.sibling,i.renderingStartTime=G(),n.sibling=null,t=W.current,D(W,r?t&1|2:t&1),n):(oe(n),null);case 22:case 23:return Mo(),r=n.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(n.flags|=8192),r&&n.mode&1?we&1073741824&&(oe(n),n.subtreeFlags&6&&(n.flags|=8192)):oe(n),null;case 24:return null;case 25:return null}throw Error(g(156,n.tag))}function Sf(e,n){switch(ho(n),n.tag){case 1:return ye(n.type)&&Xr(),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return ft(),U(ge),U(se),_o(),e=n.flags,e&65536&&!(e&128)?(n.flags=e&-65537|128,n):null;case 5:return Eo(n),null;case 13:if(U(W),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(g(340));ct()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return U(W),null;case 4:return ft(),null;case 10:return So(n.type._context),null;case 22:case 23:return Mo(),null;case 24:return null;default:return null}}var Cr=!1,ue=!1,wf=typeof WeakSet=="function"?WeakSet:Set,E=null;function et(e,n){var t=e.ref;if(t!==null)if(typeof t=="function")try{t(null)}catch(r){q(e,n,r)}else t.current=null}function Ui(e,n,t){try{t()}catch(r){q(e,n,r)}}var $u=!1;function kf(e,n){if(xi=Kr,e=Xs(),po(e)){if("selectionStart"in e)var t={start:e.selectionStart,end:e.selectionEnd};else e:{t=(t=e.ownerDocument)&&t.defaultView||window;var r=t.getSelection&&t.getSelection();if(r&&r.rangeCount!==0){t=r.anchorNode;var l=r.anchorOffset,i=r.focusNode;r=r.focusOffset;try{t.nodeType,i.nodeType}catch{t=null;break e}var o=0,u=-1,s=-1,c=0,h=0,m=e,p=null;n:for(;;){for(var y;m!==t||l!==0&&m.nodeType!==3||(u=o+l),m!==i||r!==0&&m.nodeType!==3||(s=o+r),m.nodeType===3&&(o+=m.nodeValue.length),(y=m.firstChild)!==null;)p=m,m=y;for(;;){if(m===e)break n;if(p===t&&++c===l&&(u=o),p===i&&++h===r&&(s=o),(y=m.nextSibling)!==null)break;m=p,p=m.parentNode}m=y}t=u===-1||s===-1?null:{start:u,end:s}}else t=null}t=t||{start:0,end:0}}else t=null;for(Ei={focusedElem:e,selectionRange:t},Kr=!1,E=n;E!==null;)if(n=E,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,E=e;else for(;E!==null;){n=E;try{var S=n.alternate;if(n.flags&1024)switch(n.tag){case 0:case 11:case 15:break;case 1:if(S!==null){var w=S.memoizedProps,F=S.memoizedState,d=n.stateNode,a=d.getSnapshotBeforeUpdate(n.elementType===n.type?w:Me(n.type,w),F);d.__reactInternalSnapshotBeforeUpdate=a}break;case 3:var f=n.stateNode.containerInfo;f.nodeType===1?f.textContent="":f.nodeType===9&&f.documentElement&&f.removeChild(f.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(g(163))}}catch(v){q(n,n.return,v)}if(e=n.sibling,e!==null){e.return=n.return,E=e;break}E=n.return}return S=$u,$u=!1,S}function $t(e,n,t){var r=n.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var l=r=r.next;do{if((l.tag&e)===e){var i=l.destroy;l.destroy=void 0,i!==void 0&&Ui(n,t,i)}l=l.next}while(l!==r)}}function wl(e,n){if(n=n.updateQueue,n=n!==null?n.lastEffect:null,n!==null){var t=n=n.next;do{if((t.tag&e)===e){var r=t.create;t.destroy=r()}t=t.next}while(t!==n)}}function $i(e){var n=e.ref;if(n!==null){var t=e.stateNode;switch(e.tag){case 5:e=t;break;default:e=t}typeof n=="function"?n(e):n.current=e}}function Ka(e){var n=e.alternate;n!==null&&(e.alternate=null,Ka(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&(delete n[We],delete n[bt],delete n[Ci],delete n[tf],delete n[rf])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function qa(e){return e.tag===5||e.tag===3||e.tag===4}function Bu(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||qa(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Bi(e,n,t){var r=e.tag;if(r===5||r===6)e=e.stateNode,n?t.nodeType===8?t.parentNode.insertBefore(e,n):t.insertBefore(e,n):(t.nodeType===8?(n=t.parentNode,n.insertBefore(e,t)):(n=t,n.appendChild(e)),t=t._reactRootContainer,t!=null||n.onclick!==null||(n.onclick=Yr));else if(r!==4&&(e=e.child,e!==null))for(Bi(e,n,t),e=e.sibling;e!==null;)Bi(e,n,t),e=e.sibling}function Hi(e,n,t){var r=e.tag;if(r===5||r===6)e=e.stateNode,n?t.insertBefore(e,n):t.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Hi(e,n,t),e=e.sibling;e!==null;)Hi(e,n,t),e=e.sibling}var te=null,Fe=!1;function un(e,n,t){for(t=t.child;t!==null;)Ga(e,n,t),t=t.sibling}function Ga(e,n,t){if(Qe&&typeof Qe.onCommitFiberUnmount=="function")try{Qe.onCommitFiberUnmount(fl,t)}catch{}switch(t.tag){case 5:ue||et(t,n);case 6:var r=te,l=Fe;te=null,un(e,n,t),te=r,Fe=l,te!==null&&(Fe?(e=te,t=t.stateNode,e.nodeType===8?e.parentNode.removeChild(t):e.removeChild(t)):te.removeChild(t.stateNode));break;case 18:te!==null&&(Fe?(e=te,t=t.stateNode,e.nodeType===8?Wl(e.parentNode,t):e.nodeType===1&&Wl(e,t),Gt(e)):Wl(te,t.stateNode));break;case 4:r=te,l=Fe,te=t.stateNode.containerInfo,Fe=!0,un(e,n,t),te=r,Fe=l;break;case 0:case 11:case 14:case 15:if(!ue&&(r=t.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){l=r=r.next;do{var i=l,o=i.destroy;i=i.tag,o!==void 0&&(i&2||i&4)&&Ui(t,n,o),l=l.next}while(l!==r)}un(e,n,t);break;case 1:if(!ue&&(et(t,n),r=t.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=t.memoizedProps,r.state=t.memoizedState,r.componentWillUnmount()}catch(u){q(t,n,u)}un(e,n,t);break;case 21:un(e,n,t);break;case 22:t.mode&1?(ue=(r=ue)||t.memoizedState!==null,un(e,n,t),ue=r):un(e,n,t);break;default:un(e,n,t)}}function Hu(e){var n=e.updateQueue;if(n!==null){e.updateQueue=null;var t=e.stateNode;t===null&&(t=e.stateNode=new wf),n.forEach(function(r){var l=If.bind(null,e,r);t.has(r)||(t.add(r),r.then(l,l))})}}function Ae(e,n){var t=n.deletions;if(t!==null)for(var r=0;r<t.length;r++){var l=t[r];try{var i=e,o=n,u=o;e:for(;u!==null;){switch(u.tag){case 5:te=u.stateNode,Fe=!1;break e;case 3:te=u.stateNode.containerInfo,Fe=!0;break e;case 4:te=u.stateNode.containerInfo,Fe=!0;break e}u=u.return}if(te===null)throw Error(g(160));Ga(i,o,l),te=null,Fe=!1;var s=l.alternate;s!==null&&(s.return=null),l.return=null}catch(c){q(l,n,c)}}if(n.subtreeFlags&12854)for(n=n.child;n!==null;)Ya(n,e),n=n.sibling}function Ya(e,n){var t=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Ae(n,e),He(e),r&4){try{$t(3,e,e.return),wl(3,e)}catch(w){q(e,e.return,w)}try{$t(5,e,e.return)}catch(w){q(e,e.return,w)}}break;case 1:Ae(n,e),He(e),r&512&&t!==null&&et(t,t.return);break;case 5:if(Ae(n,e),He(e),r&512&&t!==null&&et(t,t.return),e.flags&32){var l=e.stateNode;try{Wt(l,"")}catch(w){q(e,e.return,w)}}if(r&4&&(l=e.stateNode,l!=null)){var i=e.memoizedProps,o=t!==null?t.memoizedProps:i,u=e.type,s=e.updateQueue;if(e.updateQueue=null,s!==null)try{u==="input"&&i.type==="radio"&&i.name!=null&&gs(l,i),fi(u,o);var c=fi(u,i);for(o=0;o<s.length;o+=2){var h=s[o],m=s[o+1];h==="style"?xs(l,m):h==="dangerouslySetInnerHTML"?ws(l,m):h==="children"?Wt(l,m):bi(l,h,m,c)}switch(u){case"input":ui(l,i);break;case"textarea":ys(l,i);break;case"select":var p=l._wrapperState.wasMultiple;l._wrapperState.wasMultiple=!!i.multiple;var y=i.value;y!=null?tt(l,!!i.multiple,y,!1):p!==!!i.multiple&&(i.defaultValue!=null?tt(l,!!i.multiple,i.defaultValue,!0):tt(l,!!i.multiple,i.multiple?[]:"",!1))}l[bt]=i}catch(w){q(e,e.return,w)}}break;case 6:if(Ae(n,e),He(e),r&4){if(e.stateNode===null)throw Error(g(162));l=e.stateNode,i=e.memoizedProps;try{l.nodeValue=i}catch(w){q(e,e.return,w)}}break;case 3:if(Ae(n,e),He(e),r&4&&t!==null&&t.memoizedState.isDehydrated)try{Gt(n.containerInfo)}catch(w){q(e,e.return,w)}break;case 4:Ae(n,e),He(e);break;case 13:Ae(n,e),He(e),l=e.child,l.flags&8192&&(i=l.memoizedState!==null,l.stateNode.isHidden=i,!i||l.alternate!==null&&l.alternate.memoizedState!==null||(Oo=G())),r&4&&Hu(e);break;case 22:if(h=t!==null&&t.memoizedState!==null,e.mode&1?(ue=(c=ue)||h,Ae(n,e),ue=c):Ae(n,e),He(e),r&8192){if(c=e.memoizedState!==null,(e.stateNode.isHidden=c)&&!h&&e.mode&1)for(E=e,h=e.child;h!==null;){for(m=E=h;E!==null;){switch(p=E,y=p.child,p.tag){case 0:case 11:case 14:case 15:$t(4,p,p.return);break;case 1:et(p,p.return);var S=p.stateNode;if(typeof S.componentWillUnmount=="function"){r=p,t=p.return;try{n=r,S.props=n.memoizedProps,S.state=n.memoizedState,S.componentWillUnmount()}catch(w){q(r,t,w)}}break;case 5:et(p,p.return);break;case 22:if(p.memoizedState!==null){Wu(m);continue}}y!==null?(y.return=p,E=y):Wu(m)}h=h.sibling}e:for(h=null,m=e;;){if(m.tag===5){if(h===null){h=m;try{l=m.stateNode,c?(i=l.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(u=m.stateNode,s=m.memoizedProps.style,o=s!=null&&s.hasOwnProperty("display")?s.display:null,u.style.display=ks("display",o))}catch(w){q(e,e.return,w)}}}else if(m.tag===6){if(h===null)try{m.stateNode.nodeValue=c?"":m.memoizedProps}catch(w){q(e,e.return,w)}}else if((m.tag!==22&&m.tag!==23||m.memoizedState===null||m===e)&&m.child!==null){m.child.return=m,m=m.child;continue}if(m===e)break e;for(;m.sibling===null;){if(m.return===null||m.return===e)break e;h===m&&(h=null),m=m.return}h===m&&(h=null),m.sibling.return=m.return,m=m.sibling}}break;case 19:Ae(n,e),He(e),r&4&&Hu(e);break;case 21:break;default:Ae(n,e),He(e)}}function He(e){var n=e.flags;if(n&2){try{e:{for(var t=e.return;t!==null;){if(qa(t)){var r=t;break e}t=t.return}throw Error(g(160))}switch(r.tag){case 5:var l=r.stateNode;r.flags&32&&(Wt(l,""),r.flags&=-33);var i=Bu(e);Hi(e,i,l);break;case 3:case 4:var o=r.stateNode.containerInfo,u=Bu(e);Bi(e,u,o);break;default:throw Error(g(161))}}catch(s){q(e,e.return,s)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function xf(e,n,t){E=e,Xa(e)}function Xa(e,n,t){for(var r=(e.mode&1)!==0;E!==null;){var l=E,i=l.child;if(l.tag===22&&r){var o=l.memoizedState!==null||Cr;if(!o){var u=l.alternate,s=u!==null&&u.memoizedState!==null||ue;u=Cr;var c=ue;if(Cr=o,(ue=s)&&!c)for(E=l;E!==null;)o=E,s=o.child,o.tag===22&&o.memoizedState!==null?Qu(l):s!==null?(s.return=o,E=s):Qu(l);for(;i!==null;)E=i,Xa(i),i=i.sibling;E=l,Cr=u,ue=c}Vu(e)}else l.subtreeFlags&8772&&i!==null?(i.return=l,E=i):Vu(e)}}function Vu(e){for(;E!==null;){var n=E;if(n.flags&8772){var t=n.alternate;try{if(n.flags&8772)switch(n.tag){case 0:case 11:case 15:ue||wl(5,n);break;case 1:var r=n.stateNode;if(n.flags&4&&!ue)if(t===null)r.componentDidMount();else{var l=n.elementType===n.type?t.memoizedProps:Me(n.type,t.memoizedProps);r.componentDidUpdate(l,t.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var i=n.updateQueue;i!==null&&Pu(n,i,r);break;case 3:var o=n.updateQueue;if(o!==null){if(t=null,n.child!==null)switch(n.child.tag){case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}Pu(n,o,t)}break;case 5:var u=n.stateNode;if(t===null&&n.flags&4){t=u;var s=n.memoizedProps;switch(n.type){case"button":case"input":case"select":case"textarea":s.autoFocus&&t.focus();break;case"img":s.src&&(t.src=s.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(n.memoizedState===null){var c=n.alternate;if(c!==null){var h=c.memoizedState;if(h!==null){var m=h.dehydrated;m!==null&&Gt(m)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(g(163))}ue||n.flags&512&&$i(n)}catch(p){q(n,n.return,p)}}if(n===e){E=null;break}if(t=n.sibling,t!==null){t.return=n.return,E=t;break}E=n.return}}function Wu(e){for(;E!==null;){var n=E;if(n===e){E=null;break}var t=n.sibling;if(t!==null){t.return=n.return,E=t;break}E=n.return}}function Qu(e){for(;E!==null;){var n=E;try{switch(n.tag){case 0:case 11:case 15:var t=n.return;try{wl(4,n)}catch(s){q(n,t,s)}break;case 1:var r=n.stateNode;if(typeof r.componentDidMount=="function"){var l=n.return;try{r.componentDidMount()}catch(s){q(n,l,s)}}var i=n.return;try{$i(n)}catch(s){q(n,i,s)}break;case 5:var o=n.return;try{$i(n)}catch(s){q(n,o,s)}}}catch(s){q(n,n.return,s)}if(n===e){E=null;break}var u=n.sibling;if(u!==null){u.return=n.return,E=u;break}E=n.return}}var Ef=Math.ceil,ol=rn.ReactCurrentDispatcher,zo=rn.ReactCurrentOwner,Ie=rn.ReactCurrentBatchConfig,O=0,ne=null,X=null,re=0,we=0,nt=Nn(0),J=0,ir=null,Dn=0,kl=0,Ro=0,Bt=null,he=null,Oo=0,mt=1/0,Ge=null,ul=!1,Vi=null,Sn=null,Pr=!1,pn=null,sl=0,Ht=0,Wi=null,jr=-1,Ur=0;function de(){return O&6?G():jr!==-1?jr:jr=G()}function wn(e){return e.mode&1?O&2&&re!==0?re&-re:of.transition!==null?(Ur===0&&(Ur=As()),Ur):(e=M,e!==0||(e=window.event,e=e===void 0?16:Bs(e.type)),e):1}function Ue(e,n,t,r){if(50<Ht)throw Ht=0,Wi=null,Error(g(185));ur(e,t,r),(!(O&2)||e!==ne)&&(e===ne&&(!(O&2)&&(kl|=t),J===4&&dn(e,re)),Se(e,r),t===1&&O===0&&!(n.mode&1)&&(mt=G()+500,gl&&Cn()))}function Se(e,n){var t=e.callbackNode;id(e,n);var r=Qr(e,e===ne?re:0);if(r===0)t!==null&&eu(t),e.callbackNode=null,e.callbackPriority=0;else if(n=r&-r,e.callbackPriority!==n){if(t!=null&&eu(t),n===1)e.tag===0?lf(Ku.bind(null,e)):oa(Ku.bind(null,e)),ef(function(){!(O&6)&&Cn()}),t=null;else{switch(Ms(r)){case 1:t=lo;break;case 4:t=Rs;break;case 16:t=Wr;break;case 536870912:t=Os;break;default:t=Wr}t=lc(t,Za.bind(null,e))}e.callbackPriority=n,e.callbackNode=t}}function Za(e,n){if(jr=-1,Ur=0,O&6)throw Error(g(327));var t=e.callbackNode;if(ut()&&e.callbackNode!==t)return null;var r=Qr(e,e===ne?re:0);if(r===0)return null;if(r&30||r&e.expiredLanes||n)n=al(e,r);else{n=r;var l=O;O|=2;var i=ba();(ne!==e||re!==n)&&(Ge=null,mt=G()+500,Rn(e,n));do try{Cf();break}catch(u){Ja(e,u)}while(!0);yo(),ol.current=i,O=l,X!==null?n=0:(ne=null,re=0,n=J)}if(n!==0){if(n===2&&(l=gi(e),l!==0&&(r=l,n=Qi(e,l))),n===1)throw t=ir,Rn(e,0),dn(e,r),Se(e,G()),t;if(n===6)dn(e,r);else{if(l=e.current.alternate,!(r&30)&&!_f(l)&&(n=al(e,r),n===2&&(i=gi(e),i!==0&&(r=i,n=Qi(e,i))),n===1))throw t=ir,Rn(e,0),dn(e,r),Se(e,G()),t;switch(e.finishedWork=l,e.finishedLanes=r,n){case 0:case 1:throw Error(g(345));case 2:Tn(e,he,Ge);break;case 3:if(dn(e,r),(r&130023424)===r&&(n=Oo+500-G(),10<n)){if(Qr(e,0)!==0)break;if(l=e.suspendedLanes,(l&r)!==r){de(),e.pingedLanes|=e.suspendedLanes&l;break}e.timeoutHandle=Ni(Tn.bind(null,e,he,Ge),n);break}Tn(e,he,Ge);break;case 4:if(dn(e,r),(r&4194240)===r)break;for(n=e.eventTimes,l=-1;0<r;){var o=31-je(r);i=1<<o,o=n[o],o>l&&(l=o),r&=~i}if(r=l,r=G()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Ef(r/1960))-r,10<r){e.timeoutHandle=Ni(Tn.bind(null,e,he,Ge),r);break}Tn(e,he,Ge);break;case 5:Tn(e,he,Ge);break;default:throw Error(g(329))}}}return Se(e,G()),e.callbackNode===t?Za.bind(null,e):null}function Qi(e,n){var t=Bt;return e.current.memoizedState.isDehydrated&&(Rn(e,n).flags|=256),e=al(e,n),e!==2&&(n=he,he=t,n!==null&&Ki(n)),e}function Ki(e){he===null?he=e:he.push.apply(he,e)}function _f(e){for(var n=e;;){if(n.flags&16384){var t=n.updateQueue;if(t!==null&&(t=t.stores,t!==null))for(var r=0;r<t.length;r++){var l=t[r],i=l.getSnapshot;l=l.value;try{if(!$e(i(),l))return!1}catch{return!1}}}if(t=n.child,n.subtreeFlags&16384&&t!==null)t.return=n,n=t;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function dn(e,n){for(n&=~Ro,n&=~kl,e.suspendedLanes|=n,e.pingedLanes&=~n,e=e.expirationTimes;0<n;){var t=31-je(n),r=1<<t;e[t]=-1,n&=~r}}function Ku(e){if(O&6)throw Error(g(327));ut();var n=Qr(e,0);if(!(n&1))return Se(e,G()),null;var t=al(e,n);if(e.tag!==0&&t===2){var r=gi(e);r!==0&&(n=r,t=Qi(e,r))}if(t===1)throw t=ir,Rn(e,0),dn(e,n),Se(e,G()),t;if(t===6)throw Error(g(345));return e.finishedWork=e.current.alternate,e.finishedLanes=n,Tn(e,he,Ge),Se(e,G()),null}function Ao(e,n){var t=O;O|=1;try{return e(n)}finally{O=t,O===0&&(mt=G()+500,gl&&Cn())}}function jn(e){pn!==null&&pn.tag===0&&!(O&6)&&ut();var n=O;O|=1;var t=Ie.transition,r=M;try{if(Ie.transition=null,M=1,e)return e()}finally{M=r,Ie.transition=t,O=n,!(O&6)&&Cn()}}function Mo(){we=nt.current,U(nt)}function Rn(e,n){e.finishedWork=null,e.finishedLanes=0;var t=e.timeoutHandle;if(t!==-1&&(e.timeoutHandle=-1,bd(t)),X!==null)for(t=X.return;t!==null;){var r=t;switch(ho(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Xr();break;case 3:ft(),U(ge),U(se),_o();break;case 5:Eo(r);break;case 4:ft();break;case 13:U(W);break;case 19:U(W);break;case 10:So(r.type._context);break;case 22:case 23:Mo()}t=t.return}if(ne=e,X=e=kn(e.current,null),re=we=n,J=0,ir=null,Ro=kl=Dn=0,he=Bt=null,In!==null){for(n=0;n<In.length;n++)if(t=In[n],r=t.interleaved,r!==null){t.interleaved=null;var l=r.next,i=t.pending;if(i!==null){var o=i.next;i.next=l,r.next=o}t.pending=r}In=null}return e}function Ja(e,n){do{var t=X;try{if(yo(),Mr.current=il,ll){for(var r=Q.memoizedState;r!==null;){var l=r.queue;l!==null&&(l.pending=null),r=r.next}ll=!1}if(Fn=0,ee=Z=Q=null,Ut=!1,tr=0,zo.current=null,t===null||t.return===null){J=1,ir=n,X=null;break}e:{var i=e,o=t.return,u=t,s=n;if(n=re,u.flags|=32768,s!==null&&typeof s=="object"&&typeof s.then=="function"){var c=s,h=u,m=h.tag;if(!(h.mode&1)&&(m===0||m===11||m===15)){var p=h.alternate;p?(h.updateQueue=p.updateQueue,h.memoizedState=p.memoizedState,h.lanes=p.lanes):(h.updateQueue=null,h.memoizedState=null)}var y=Ou(o);if(y!==null){y.flags&=-257,Au(y,o,u,i,n),y.mode&1&&Ru(i,c,n),n=y,s=c;var S=n.updateQueue;if(S===null){var w=new Set;w.add(s),n.updateQueue=w}else S.add(s);break e}else{if(!(n&1)){Ru(i,c,n),Fo();break e}s=Error(g(426))}}else if(B&&u.mode&1){var F=Ou(o);if(F!==null){!(F.flags&65536)&&(F.flags|=256),Au(F,o,u,i,n),vo(pt(s,u));break e}}i=s=pt(s,u),J!==4&&(J=2),Bt===null?Bt=[i]:Bt.push(i),i=o;do{switch(i.tag){case 3:i.flags|=65536,n&=-n,i.lanes|=n;var d=Ma(i,s,n);Cu(i,d);break e;case 1:u=s;var a=i.type,f=i.stateNode;if(!(i.flags&128)&&(typeof a.getDerivedStateFromError=="function"||f!==null&&typeof f.componentDidCatch=="function"&&(Sn===null||!Sn.has(f)))){i.flags|=65536,n&=-n,i.lanes|=n;var v=Fa(i,u,n);Cu(i,v);break e}}i=i.return}while(i!==null)}nc(t)}catch(k){n=k,X===t&&t!==null&&(X=t=t.return);continue}break}while(!0)}function ba(){var e=ol.current;return ol.current=il,e===null?il:e}function Fo(){(J===0||J===3||J===2)&&(J=4),ne===null||!(Dn&268435455)&&!(kl&268435455)||dn(ne,re)}function al(e,n){var t=O;O|=2;var r=ba();(ne!==e||re!==n)&&(Ge=null,Rn(e,n));do try{Nf();break}catch(l){Ja(e,l)}while(!0);if(yo(),O=t,ol.current=r,X!==null)throw Error(g(261));return ne=null,re=0,J}function Nf(){for(;X!==null;)ec(X)}function Cf(){for(;X!==null&&!Xc();)ec(X)}function ec(e){var n=rc(e.alternate,e,we);e.memoizedProps=e.pendingProps,n===null?nc(e):X=n,zo.current=null}function nc(e){var n=e;do{var t=n.alternate;if(e=n.return,n.flags&32768){if(t=Sf(t,n),t!==null){t.flags&=32767,X=t;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{J=6,X=null;return}}else if(t=yf(t,n,we),t!==null){X=t;return}if(n=n.sibling,n!==null){X=n;return}X=n=e}while(n!==null);J===0&&(J=5)}function Tn(e,n,t){var r=M,l=Ie.transition;try{Ie.transition=null,M=1,Pf(e,n,t,r)}finally{Ie.transition=l,M=r}return null}function Pf(e,n,t,r){do ut();while(pn!==null);if(O&6)throw Error(g(327));t=e.finishedWork;var l=e.finishedLanes;if(t===null)return null;if(e.finishedWork=null,e.finishedLanes=0,t===e.current)throw Error(g(177));e.callbackNode=null,e.callbackPriority=0;var i=t.lanes|t.childLanes;if(od(e,i),e===ne&&(X=ne=null,re=0),!(t.subtreeFlags&2064)&&!(t.flags&2064)||Pr||(Pr=!0,lc(Wr,function(){return ut(),null})),i=(t.flags&15990)!==0,t.subtreeFlags&15990||i){i=Ie.transition,Ie.transition=null;var o=M;M=1;var u=O;O|=4,zo.current=null,kf(e,t),Ya(t,e),Kd(Ei),Kr=!!xi,Ei=xi=null,e.current=t,xf(t),Zc(),O=u,M=o,Ie.transition=i}else e.current=t;if(Pr&&(Pr=!1,pn=e,sl=l),i=e.pendingLanes,i===0&&(Sn=null),ed(t.stateNode),Se(e,G()),n!==null)for(r=e.onRecoverableError,t=0;t<n.length;t++)l=n[t],r(l.value,{componentStack:l.stack,digest:l.digest});if(ul)throw ul=!1,e=Vi,Vi=null,e;return sl&1&&e.tag!==0&&ut(),i=e.pendingLanes,i&1?e===Wi?Ht++:(Ht=0,Wi=e):Ht=0,Cn(),null}function ut(){if(pn!==null){var e=Ms(sl),n=Ie.transition,t=M;try{if(Ie.transition=null,M=16>e?16:e,pn===null)var r=!1;else{if(e=pn,pn=null,sl=0,O&6)throw Error(g(331));var l=O;for(O|=4,E=e.current;E!==null;){var i=E,o=i.child;if(E.flags&16){var u=i.deletions;if(u!==null){for(var s=0;s<u.length;s++){var c=u[s];for(E=c;E!==null;){var h=E;switch(h.tag){case 0:case 11:case 15:$t(8,h,i)}var m=h.child;if(m!==null)m.return=h,E=m;else for(;E!==null;){h=E;var p=h.sibling,y=h.return;if(Ka(h),h===c){E=null;break}if(p!==null){p.return=y,E=p;break}E=y}}}var S=i.alternate;if(S!==null){var w=S.child;if(w!==null){S.child=null;do{var F=w.sibling;w.sibling=null,w=F}while(w!==null)}}E=i}}if(i.subtreeFlags&2064&&o!==null)o.return=i,E=o;else e:for(;E!==null;){if(i=E,i.flags&2048)switch(i.tag){case 0:case 11:case 15:$t(9,i,i.return)}var d=i.sibling;if(d!==null){d.return=i.return,E=d;break e}E=i.return}}var a=e.current;for(E=a;E!==null;){o=E;var f=o.child;if(o.subtreeFlags&2064&&f!==null)f.return=o,E=f;else e:for(o=a;E!==null;){if(u=E,u.flags&2048)try{switch(u.tag){case 0:case 11:case 15:wl(9,u)}}catch(k){q(u,u.return,k)}if(u===o){E=null;break e}var v=u.sibling;if(v!==null){v.return=u.return,E=v;break e}E=u.return}}if(O=l,Cn(),Qe&&typeof Qe.onPostCommitFiberRoot=="function")try{Qe.onPostCommitFiberRoot(fl,e)}catch{}r=!0}return r}finally{M=t,Ie.transition=n}}return!1}function qu(e,n,t){n=pt(t,n),n=Ma(e,n,1),e=yn(e,n,1),n=de(),e!==null&&(ur(e,1,n),Se(e,n))}function q(e,n,t){if(e.tag===3)qu(e,e,t);else for(;n!==null;){if(n.tag===3){qu(n,e,t);break}else if(n.tag===1){var r=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Sn===null||!Sn.has(r))){e=pt(t,e),e=Fa(n,e,1),n=yn(n,e,1),e=de(),n!==null&&(ur(n,1,e),Se(n,e));break}}n=n.return}}function Tf(e,n,t){var r=e.pingCache;r!==null&&r.delete(n),n=de(),e.pingedLanes|=e.suspendedLanes&t,ne===e&&(re&t)===t&&(J===4||J===3&&(re&130023424)===re&&500>G()-Oo?Rn(e,0):Ro|=t),Se(e,n)}function tc(e,n){n===0&&(e.mode&1?(n=gr,gr<<=1,!(gr&130023424)&&(gr=4194304)):n=1);var t=de();e=nn(e,n),e!==null&&(ur(e,n,t),Se(e,t))}function Lf(e){var n=e.memoizedState,t=0;n!==null&&(t=n.retryLane),tc(e,t)}function If(e,n){var t=0;switch(e.tag){case 13:var r=e.stateNode,l=e.memoizedState;l!==null&&(t=l.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(g(314))}r!==null&&r.delete(n),tc(e,t)}var rc;rc=function(e,n,t){if(e!==null)if(e.memoizedProps!==n.pendingProps||ge.current)ve=!0;else{if(!(e.lanes&t)&&!(n.flags&128))return ve=!1,gf(e,n,t);ve=!!(e.flags&131072)}else ve=!1,B&&n.flags&1048576&&ua(n,br,n.index);switch(n.lanes=0,n.tag){case 2:var r=n.type;Dr(e,n),e=n.pendingProps;var l=at(n,se.current);ot(n,t),l=Co(null,n,r,e,l,t);var i=Po();return n.flags|=1,typeof l=="object"&&l!==null&&typeof l.render=="function"&&l.$$typeof===void 0?(n.tag=1,n.memoizedState=null,n.updateQueue=null,ye(r)?(i=!0,Zr(n)):i=!1,n.memoizedState=l.state!==null&&l.state!==void 0?l.state:null,ko(n),l.updater=Sl,n.stateNode=l,l._reactInternals=n,Ri(n,r,e,t),n=Mi(null,n,r,!0,i,t)):(n.tag=0,B&&i&&mo(n),ce(null,n,l,t),n=n.child),n;case 16:r=n.elementType;e:{switch(Dr(e,n),e=n.pendingProps,l=r._init,r=l(r._payload),n.type=r,l=n.tag=Rf(r),e=Me(r,e),l){case 0:n=Ai(null,n,r,e,t);break e;case 1:n=Du(null,n,r,e,t);break e;case 11:n=Mu(null,n,r,e,t);break e;case 14:n=Fu(null,n,r,Me(r.type,e),t);break e}throw Error(g(306,r,""))}return n;case 0:return r=n.type,l=n.pendingProps,l=n.elementType===r?l:Me(r,l),Ai(e,n,r,l,t);case 1:return r=n.type,l=n.pendingProps,l=n.elementType===r?l:Me(r,l),Du(e,n,r,l,t);case 3:e:{if($a(n),e===null)throw Error(g(387));r=n.pendingProps,i=n.memoizedState,l=i.element,pa(e,n),tl(n,r,null,t);var o=n.memoizedState;if(r=o.element,i.isDehydrated)if(i={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},n.updateQueue.baseState=i,n.memoizedState=i,n.flags&256){l=pt(Error(g(423)),n),n=ju(e,n,r,t,l);break e}else if(r!==l){l=pt(Error(g(424)),n),n=ju(e,n,r,t,l);break e}else for(ke=gn(n.stateNode.containerInfo.firstChild),xe=n,B=!0,De=null,t=da(n,null,r,t),n.child=t;t;)t.flags=t.flags&-3|4096,t=t.sibling;else{if(ct(),r===l){n=tn(e,n,t);break e}ce(e,n,r,t)}n=n.child}return n;case 5:return ma(n),e===null&&Li(n),r=n.type,l=n.pendingProps,i=e!==null?e.memoizedProps:null,o=l.children,_i(r,l)?o=null:i!==null&&_i(r,i)&&(n.flags|=32),Ua(e,n),ce(e,n,o,t),n.child;case 6:return e===null&&Li(n),null;case 13:return Ba(e,n,t);case 4:return xo(n,n.stateNode.containerInfo),r=n.pendingProps,e===null?n.child=dt(n,null,r,t):ce(e,n,r,t),n.child;case 11:return r=n.type,l=n.pendingProps,l=n.elementType===r?l:Me(r,l),Mu(e,n,r,l,t);case 7:return ce(e,n,n.pendingProps,t),n.child;case 8:return ce(e,n,n.pendingProps.children,t),n.child;case 12:return ce(e,n,n.pendingProps.children,t),n.child;case 10:e:{if(r=n.type._context,l=n.pendingProps,i=n.memoizedProps,o=l.value,D(el,r._currentValue),r._currentValue=o,i!==null)if($e(i.value,o)){if(i.children===l.children&&!ge.current){n=tn(e,n,t);break e}}else for(i=n.child,i!==null&&(i.return=n);i!==null;){var u=i.dependencies;if(u!==null){o=i.child;for(var s=u.firstContext;s!==null;){if(s.context===r){if(i.tag===1){s=Je(-1,t&-t),s.tag=2;var c=i.updateQueue;if(c!==null){c=c.shared;var h=c.pending;h===null?s.next=s:(s.next=h.next,h.next=s),c.pending=s}}i.lanes|=t,s=i.alternate,s!==null&&(s.lanes|=t),Ii(i.return,t,n),u.lanes|=t;break}s=s.next}}else if(i.tag===10)o=i.type===n.type?null:i.child;else if(i.tag===18){if(o=i.return,o===null)throw Error(g(341));o.lanes|=t,u=o.alternate,u!==null&&(u.lanes|=t),Ii(o,t,n),o=i.sibling}else o=i.child;if(o!==null)o.return=i;else for(o=i;o!==null;){if(o===n){o=null;break}if(i=o.sibling,i!==null){i.return=o.return,o=i;break}o=o.return}i=o}ce(e,n,l.children,t),n=n.child}return n;case 9:return l=n.type,r=n.pendingProps.children,ot(n,t),l=ze(l),r=r(l),n.flags|=1,ce(e,n,r,t),n.child;case 14:return r=n.type,l=Me(r,n.pendingProps),l=Me(r.type,l),Fu(e,n,r,l,t);case 15:return Da(e,n,n.type,n.pendingProps,t);case 17:return r=n.type,l=n.pendingProps,l=n.elementType===r?l:Me(r,l),Dr(e,n),n.tag=1,ye(r)?(e=!0,Zr(n)):e=!1,ot(n,t),Aa(n,r,l),Ri(n,r,l,t),Mi(null,n,r,!0,e,t);case 19:return Ha(e,n,t);case 22:return ja(e,n,t)}throw Error(g(156,n.tag))};function lc(e,n){return zs(e,n)}function zf(e,n,t,r){this.tag=e,this.key=t,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Le(e,n,t,r){return new zf(e,n,t,r)}function Do(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Rf(e){if(typeof e=="function")return Do(e)?1:0;if(e!=null){if(e=e.$$typeof,e===no)return 11;if(e===to)return 14}return 2}function kn(e,n){var t=e.alternate;return t===null?(t=Le(e.tag,n,e.key,e.mode),t.elementType=e.elementType,t.type=e.type,t.stateNode=e.stateNode,t.alternate=e,e.alternate=t):(t.pendingProps=n,t.type=e.type,t.flags=0,t.subtreeFlags=0,t.deletions=null),t.flags=e.flags&14680064,t.childLanes=e.childLanes,t.lanes=e.lanes,t.child=e.child,t.memoizedProps=e.memoizedProps,t.memoizedState=e.memoizedState,t.updateQueue=e.updateQueue,n=e.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},t.sibling=e.sibling,t.index=e.index,t.ref=e.ref,t}function $r(e,n,t,r,l,i){var o=2;if(r=e,typeof e=="function")Do(e)&&(o=1);else if(typeof e=="string")o=5;else e:switch(e){case Qn:return On(t.children,l,i,n);case eo:o=8,l|=8;break;case ti:return e=Le(12,t,n,l|2),e.elementType=ti,e.lanes=i,e;case ri:return e=Le(13,t,n,l),e.elementType=ri,e.lanes=i,e;case li:return e=Le(19,t,n,l),e.elementType=li,e.lanes=i,e;case ms:return xl(t,l,i,n);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case fs:o=10;break e;case ps:o=9;break e;case no:o=11;break e;case to:o=14;break e;case sn:o=16,r=null;break e}throw Error(g(130,e==null?e:typeof e,""))}return n=Le(o,t,n,l),n.elementType=e,n.type=r,n.lanes=i,n}function On(e,n,t,r){return e=Le(7,e,r,n),e.lanes=t,e}function xl(e,n,t,r){return e=Le(22,e,r,n),e.elementType=ms,e.lanes=t,e.stateNode={isHidden:!1},e}function Jl(e,n,t){return e=Le(6,e,null,n),e.lanes=t,e}function bl(e,n,t){return n=Le(4,e.children!==null?e.children:[],e.key,n),n.lanes=t,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}function Of(e,n,t,r,l){this.tag=n,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Ol(0),this.expirationTimes=Ol(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ol(0),this.identifierPrefix=r,this.onRecoverableError=l,this.mutableSourceEagerHydrationData=null}function jo(e,n,t,r,l,i,o,u,s){return e=new Of(e,n,t,u,s),n===1?(n=1,i===!0&&(n|=8)):n=0,i=Le(3,null,null,n),e.current=i,i.stateNode=e,i.memoizedState={element:r,isDehydrated:t,cache:null,transitions:null,pendingSuspenseBoundaries:null},ko(i),e}function Af(e,n,t){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Wn,key:r==null?null:""+r,children:e,containerInfo:n,implementation:t}}function ic(e){if(!e)return En;e=e._reactInternals;e:{if($n(e)!==e||e.tag!==1)throw Error(g(170));var n=e;do{switch(n.tag){case 3:n=n.stateNode.context;break e;case 1:if(ye(n.type)){n=n.stateNode.__reactInternalMemoizedMergedChildContext;break e}}n=n.return}while(n!==null);throw Error(g(171))}if(e.tag===1){var t=e.type;if(ye(t))return ia(e,t,n)}return n}function oc(e,n,t,r,l,i,o,u,s){return e=jo(t,r,!0,e,l,i,o,u,s),e.context=ic(null),t=e.current,r=de(),l=wn(t),i=Je(r,l),i.callback=n??null,yn(t,i,l),e.current.lanes=l,ur(e,l,r),Se(e,r),e}function El(e,n,t,r){var l=n.current,i=de(),o=wn(l);return t=ic(t),n.context===null?n.context=t:n.pendingContext=t,n=Je(i,o),n.payload={element:e},r=r===void 0?null:r,r!==null&&(n.callback=r),e=yn(l,n,o),e!==null&&(Ue(e,l,o,i),Ar(e,l,o)),o}function cl(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Gu(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var t=e.retryLane;e.retryLane=t!==0&&t<n?t:n}}function Uo(e,n){Gu(e,n),(e=e.alternate)&&Gu(e,n)}function Mf(){return null}var uc=typeof reportError=="function"?reportError:function(e){console.error(e)};function $o(e){this._internalRoot=e}_l.prototype.render=$o.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(g(409));El(e,n,null,null)};_l.prototype.unmount=$o.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;jn(function(){El(null,e,null,null)}),n[en]=null}};function _l(e){this._internalRoot=e}_l.prototype.unstable_scheduleHydration=function(e){if(e){var n=js();e={blockedOn:null,target:e,priority:n};for(var t=0;t<cn.length&&n!==0&&n<cn[t].priority;t++);cn.splice(t,0,e),t===0&&$s(e)}};function Bo(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Nl(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Yu(){}function Ff(e,n,t,r,l){if(l){if(typeof r=="function"){var i=r;r=function(){var c=cl(o);i.call(c)}}var o=oc(n,r,e,0,null,!1,!1,"",Yu);return e._reactRootContainer=o,e[en]=o.current,Zt(e.nodeType===8?e.parentNode:e),jn(),o}for(;l=e.lastChild;)e.removeChild(l);if(typeof r=="function"){var u=r;r=function(){var c=cl(s);u.call(c)}}var s=jo(e,0,!1,null,null,!1,!1,"",Yu);return e._reactRootContainer=s,e[en]=s.current,Zt(e.nodeType===8?e.parentNode:e),jn(function(){El(n,s,t,r)}),s}function Cl(e,n,t,r,l){var i=t._reactRootContainer;if(i){var o=i;if(typeof l=="function"){var u=l;l=function(){var s=cl(o);u.call(s)}}El(n,o,e,l)}else o=Ff(t,n,e,l,r);return cl(o)}Fs=function(e){switch(e.tag){case 3:var n=e.stateNode;if(n.current.memoizedState.isDehydrated){var t=Rt(n.pendingLanes);t!==0&&(io(n,t|1),Se(n,G()),!(O&6)&&(mt=G()+500,Cn()))}break;case 13:jn(function(){var r=nn(e,1);if(r!==null){var l=de();Ue(r,e,1,l)}}),Uo(e,1)}};oo=function(e){if(e.tag===13){var n=nn(e,134217728);if(n!==null){var t=de();Ue(n,e,134217728,t)}Uo(e,134217728)}};Ds=function(e){if(e.tag===13){var n=wn(e),t=nn(e,n);if(t!==null){var r=de();Ue(t,e,n,r)}Uo(e,n)}};js=function(){return M};Us=function(e,n){var t=M;try{return M=e,n()}finally{M=t}};mi=function(e,n,t){switch(n){case"input":if(ui(e,t),n=t.name,t.type==="radio"&&n!=null){for(t=e;t.parentNode;)t=t.parentNode;for(t=t.querySelectorAll("input[name="+JSON.stringify(""+n)+'][type="radio"]'),n=0;n<t.length;n++){var r=t[n];if(r!==e&&r.form===e.form){var l=vl(r);if(!l)throw Error(g(90));vs(r),ui(r,l)}}}break;case"textarea":ys(e,t);break;case"select":n=t.value,n!=null&&tt(e,!!t.multiple,n,!1)}};Ns=Ao;Cs=jn;var Df={usingClientEntryPoint:!1,Events:[ar,Yn,vl,Es,_s,Ao]},Lt={findFiberByHostInstance:Ln,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},jf={bundleType:Lt.bundleType,version:Lt.version,rendererPackageName:Lt.rendererPackageName,rendererConfig:Lt.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:rn.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Ls(e),e===null?null:e.stateNode},findFiberByHostInstance:Lt.findFiberByHostInstance||Mf,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Tr=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Tr.isDisabled&&Tr.supportsFiber)try{fl=Tr.inject(jf),Qe=Tr}catch{}}_e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Df;_e.createPortal=function(e,n){var t=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Bo(n))throw Error(g(200));return Af(e,n,null,t)};_e.createRoot=function(e,n){if(!Bo(e))throw Error(g(299));var t=!1,r="",l=uc;return n!=null&&(n.unstable_strictMode===!0&&(t=!0),n.identifierPrefix!==void 0&&(r=n.identifierPrefix),n.onRecoverableError!==void 0&&(l=n.onRecoverableError)),n=jo(e,1,!1,null,null,t,!1,r,l),e[en]=n.current,Zt(e.nodeType===8?e.parentNode:e),new $o(n)};_e.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(g(188)):(e=Object.keys(e).join(","),Error(g(268,e)));return e=Ls(n),e=e===null?null:e.stateNode,e};_e.flushSync=function(e){return jn(e)};_e.hydrate=function(e,n,t){if(!Nl(n))throw Error(g(200));return Cl(null,e,n,!0,t)};_e.hydrateRoot=function(e,n,t){if(!Bo(e))throw Error(g(405));var r=t!=null&&t.hydratedSources||null,l=!1,i="",o=uc;if(t!=null&&(t.unstable_strictMode===!0&&(l=!0),t.identifierPrefix!==void 0&&(i=t.identifierPrefix),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),n=oc(n,null,e,1,t??null,l,!1,i,o),e[en]=n.current,Zt(e),r)for(e=0;e<r.length;e++)t=r[e],l=t._getVersion,l=l(t._source),n.mutableSourceEagerHydrationData==null?n.mutableSourceEagerHydrationData=[t,l]:n.mutableSourceEagerHydrationData.push(t,l);return new _l(n)};_e.render=function(e,n,t){if(!Nl(n))throw Error(g(200));return Cl(null,e,n,!1,t)};_e.unmountComponentAtNode=function(e){if(!Nl(e))throw Error(g(40));return e._reactRootContainer?(jn(function(){Cl(null,null,e,!1,function(){e._reactRootContainer=null,e[en]=null})}),!0):!1};_e.unstable_batchedUpdates=Ao;_e.unstable_renderSubtreeIntoContainer=function(e,n,t,r){if(!Nl(t))throw Error(g(200));if(e==null||e._reactInternals===void 0)throw Error(g(38));return Cl(e,n,t,!1,r)};_e.version="18.3.1-next-f1338f8080-20240426";function sc(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(sc)}catch(e){console.error(e)}}sc(),ss.exports=_e;var ae=ss.exports,Xu=ae;ei.createRoot=Xu.createRoot,ei.hydrateRoot=Xu.hydrateRoot;const Uf=`<div id="app">

  <!-- HEADER -->
  <header>
    <h1>WESIRI</h1>
    <span style="font-size:8px;color:var(--gold2);letter-spacing:2px">FEDERATED LIGHT PROTOCOL</span>
    <div class="status-bar">
      <span><span class="status-dot" style="background:var(--kk)"></span>BASIS</span>
      <span id="hdr-lc">lc:0</span>
      <span id="hdr-tick">tick:0</span>
      <span id="hdr-angle">0.0°</span>
      <span id="hdr-metric">Φ:0.00</span>
      <span id="hdr-sabbath" style="color:var(--dim)">SABBATH:—</span>
    </div>
  </header>

  <!-- LEFT: Document Graph + Controls -->
  <div class="panel">
    <div class="panel-title">Document Graph · Federated SVGs</div>
    <div class="panel-body">

      <div style="margin-bottom:10px">
        <div class="ctrl-row">
          <span class="ctrl-label">spin speed</span>
          <input type="range" id="spin-speed" min="0.1" max="3" step="0.1" value="0.5">
          <span id="spin-val" style="font-size:8px;color:var(--gold);width:28px">0.5°</span>
        </div>
        <div class="ctrl-row">
          <span class="ctrl-label">auto-rotate</span>
          <button class="btn active" id="btn-rotate" onclick="toggleRotate()">ON</button>
          <button class="btn" id="btn-sabbath" onclick="seekSabbath()">SEEK Ω</button>
        </div>
        <div class="ctrl-row">
          <span class="ctrl-label">pattern</span>
          <button class="btn" onclick="runPattern('tetrahedral_sweep')">SWEEP</button>
          <button class="btn" onclick="runPattern('fano_line_cycle')">LINES</button>
        </div>
      </div>

      <div style="margin-bottom:8px;font-size:7px;color:var(--dim);letter-spacing:1px">SVG DOCUMENT NODES</div>
      <div id="doc-graph"></div>

      <div style="margin-top:12px;margin-bottom:6px;font-size:7px;color:var(--dim);letter-spacing:1px">ESP32 LATTICE</div>
      <div id="esp-list"></div>

      <div style="margin-top:12px;margin-bottom:6px;font-size:7px;color:var(--dim);letter-spacing:1px">NDJSON COMMIT LOG</div>
      <div id="stream-log"></div>
    </div>
  </div>

  <!-- CENTRE: Main light ring canvas -->
  <div id="centre">
    <div id="main-canvas-wrap">
      <svg id="rings-svg" viewBox="-300 -300 600 600" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="glow-sm">
            <feGaussianBlur stdDeviation="2" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="glow-md">
            <feGaussianBlur stdDeviation="4" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="glow-lg">
            <feGaussianBlur stdDeviation="8" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        <!-- Fano lines (drawn first, below LEDs) -->
        <g id="svg-fano-lines"></g>

        <!-- Epistemic square overlay (rotating) -->
        <g id="ep-square-overlay" opacity="0.15">
          <line x1="-240" y1="0" x2="240" y2="0" stroke="var(--gold2)" stroke-width="0.5"/>
          <line x1="0" y1="-240" x2="0" y2="240" stroke="var(--gold2)" stroke-width="0.5"/>
        </g>

        <!-- Ring groups -->
        <g id="svg-rings"></g>

        <!-- 16x16 window overlay (outermost) -->
        <g id="svg-window" opacity="0.4" transform="rotate(0)"></g>

        <!-- Center LED -->
        <circle id="led-center" cx="0" cy="0" r="8" fill="var(--white)" class="led"
                data-path="m/240'/0'/0'/8'" data-fano="8"
                filter="url(#glow-md)"/>
        <text x="0" y="16" text-anchor="middle" fill="var(--gold2)"
              style="font-family:var(--mono);font-size:7px">genesis·gate</text>
      </svg>
    </div>

    <!-- Active line indicator -->
    <div style="position:absolute;bottom:12px;left:50%;transform:translateX(-50%);
                display:flex;gap:6px;align-items:center">
      <span style="font-size:7px;color:var(--gold2);letter-spacing:1px">ACTIVE LINE</span>
      <div id="active-line-display" style="font-size:10px;color:var(--gold);font-family:var(--serif)">—</div>
    </div>
  </div>

  <!-- RIGHT: Epistemic square + SPO state -->
  <div class="panel">
    <div class="panel-title">Epistemic State · Rumsfeldian</div>
    <div class="panel-body">

      <!-- Mini epistemic square -->
      <svg id="ep-svg" viewBox="0 0 200 200" style="width:100%;height:160px;margin-bottom:8px">
        <rect width="100" height="100" x="100" y="100" fill="rgba(0,255,68,0.08)"/>
        <rect width="100" height="100" x="0"   y="100" fill="rgba(255,238,0,0.08)"/>
        <rect width="100" height="100" x="100" y="0"   fill="rgba(255,136,0,0.08)"/>
        <rect width="100" height="100" x="0"   y="0"   fill="rgba(68,85,255,0.08)"/>
        <line x1="100" y1="0" x2="100" y2="200" stroke="var(--dim)" stroke-width="1"/>
        <line x1="0" y1="100" x2="200" y2="100" stroke="var(--dim)" stroke-width="1"/>
        <text x="150" y="195" text-anchor="middle" fill="var(--kk)" style="font-size:7px;font-family:var(--mono)">KK</text>
        <text x="50"  y="195" text-anchor="middle" fill="var(--ku)" style="font-size:7px;font-family:var(--mono)">KU</text>
        <text x="150" y="12"  text-anchor="middle" fill="var(--uk)" style="font-size:7px;font-family:var(--mono)">UK</text>
        <text x="50"  y="12"  text-anchor="middle" fill="var(--uu)" style="font-size:7px;font-family:var(--mono)">UU</text>
        <g id="ep-points-g"></g>
        <circle cx="100" cy="100" r="3" fill="var(--white)" opacity="0.6"/>
      </svg>

      <!-- SPO table -->
      <div style="margin-bottom:6px;font-size:7px;color:var(--dim);letter-spacing:1px">SPO CONTEXT</div>
      <div id="spo-table"></div>

      <!-- Centroid -->
      <div style="margin-top:10px;margin-bottom:6px;font-size:7px;color:var(--dim);letter-spacing:1px">CENTROID · STOP METRIC</div>
      <div class="centroid-bar-wrap">
        <div style="display:flex;justify-content:space-between;margin-bottom:3px">
          <span class="centroid-val" id="cent-metric">0.00</span>
          <span id="cent-sabbath" style="font-size:9px;color:var(--dim)">Φ</span>
        </div>
        <div class="centroid-bar-bg">
          <div class="centroid-bar-fill" id="cent-bar" style="width:0%"></div>
        </div>
      </div>

      <!-- Face invariants -->
      <div style="margin-top:10px;margin-bottom:6px;font-size:7px;color:var(--dim);letter-spacing:1px">FACE INVARIANTS · L1–L7</div>
      <div id="face-table"></div>

      <!-- Basis hash -->
      <div style="margin-top:10px;margin-bottom:6px;font-size:7px;color:var(--dim);letter-spacing:1px">BASIS · HASH</div>
      <div id="basis-hash-text"></div>
    </div>
  </div>

  <!-- BOTTOM: 16x16 window | NDJSON schema | WordNet basis | SPO narrative -->
  <div id="bottom">
    <div class="bottom-cell">
      <div class="bottom-cell-title">16×16 Shared Array Buffer · w-depth</div>
      <div id="window-grid"></div>
    </div>
    <div class="bottom-cell">
      <div class="bottom-cell-title">WordNet Basis · Signed SPO Simplex</div>
      <div id="wordnet-panel"></div>
    </div>
    <div class="bottom-cell">
      <div class="bottom-cell-title">NDJSON CommitEvent · Schema</div>
      <div id="schema-panel" style="font-size:7px;color:var(--gold2);line-height:1.7;overflow-y:auto;max-height:150px"></div>
    </div>
    <div class="bottom-cell">
      <div class="bottom-cell-title">Narrative · SPO Triple Stream</div>
      <div id="narrative-panel" style="font-size:8px;color:var(--gold2);line-height:1.8;overflow-y:auto;max-height:150px;font-family:var(--serif);font-style:italic"></div>
    </div>
  </div>

</div>

`,$f=`// ═══════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════

const FANO_POINTS = [
  { id:1, name:'Metatron',  baseX: 0.15, baseY: 0.15, color:'#ff3028', hue:0   },
  { id:2, name:'Solomon',   baseX: 0.35, baseY: 0.15, color:'#ff9030', hue:30  },
  { id:3, name:'Solon',     baseX:-0.05, baseY: 0.15, color:'#ffe048', hue:60  },
  { id:4, name:'Asabiyyah', baseX: 0.0,  baseY:-0.25, color:'#40d048', hue:120 },
  { id:5, name:'Enoch',     baseX:-0.35, baseY: 0.15, color:'#3090ff', hue:240 },
  { id:6, name:'Speaker',   baseX: 0.35, baseY: 0.15, color:'#5048d8', hue:270 },
  { id:7, name:'Genesis',   baseX: 0.0,  baseY: 0.35, color:'#8830e8', hue:300 },
];

const FANO_LINES = [
  { id:'L1', points:[1,2,4] },
  { id:'L2', points:[1,3,5] },
  { id:'L3', points:[1,6,7] },
  { id:'L4', points:[2,3,6] },
  { id:'L5', points:[2,5,7] },
  { id:'L6', points:[3,4,6] },
  { id:'L7', points:[4,5,7] },
];

const QUADRANT_MAP = {
  KK: { spo:'subject',   role:'Intent',    golden:'freedom',  repl:'READ',  io:'stdin',  color:'#00ff44' },
  KU: { spo:'predicate', role:'Event',     golden:'grace',    repl:'EVAL',  io:'stdout', color:'#ffee00' },
  UK: { spo:'object',    role:'Incidence', golden:'maybe',    repl:'PRINT', io:'port',   color:'#ff8800' },
  UU: { spo:'centroid',  role:'Stop',      golden:'stop',     repl:'LOOP',  io:'file',   color:'#4455ff' },
};

// Physical ring layout — from lights.json
const RINGS = [
  { r:0,   count:1,  purpose:'center'    },
  { r:28,  count:8,  purpose:'fano'      },
  { r:52,  count:12, purpose:'harmonics' },
  { r:76,  count:16, purpose:'canvas'    },
  { r:102, count:24, purpose:'rotation'  },
  { r:130, count:32, purpose:'expansion' },
  { r:160, count:40, purpose:'h58'       },
  { r:190, count:48, purpose:'hex'       },
  { r:222, count:60, purpose:'dodeca'    },
];

// Hardware layers mapped to protocol layers
const HW_LAYERS = [
  { id:'global',   name:'WESIRI 241',    leds:241, purpose:240, color:'#c9b99a', desc:'Full State · Garden Ring' },
  { id:'local',    name:'7-ring talisman', leds:7, purpose:7,   color:'#ff3028', desc:'Local State · Talisman' },
  { id:'shared',   name:'16×16 matrix',  leds:256, purpose:256, color:'#3090ff', desc:'Shared State · Window' },
  { id:'artifact', name:'100px single',  leds:100, purpose:100, color:'#8830e8', desc:'Artifact · SHA360°' },
];

// SVG documents in the federated graph
const SVG_DOCS = [
  { id:'fano-garden-seed-kernel', name:'Seed Kernel',       hash:'0xa1b2c3d4', type:'canonical', color:'#c9b99a' },
  { id:'fano-with-light-arrays',  name:'Light Arrays',      hash:'0xe5f6a7b8', type:'projection', color:'#3090ff' },
  { id:'fano-garden',             name:'Garden',            hash:'0xc9d0e1f2', type:'instance',   color:'#40d048' },
  { id:'epistemic-square',        name:'Epistemic Square',  hash:'0x23a4b5c6', type:'operator',   color:'#ffee00' },
  { id:'dome-svg',                name:'Dome',              hash:'0x78d9e0f1', type:'projection', color:'#ff9030' },
];

// Mock ESP32 nodes in the C3 lattice
const ESP_NODES = [
  { id:'esp-s3-00', role:'controller', state:'sealed',    metric:1.00, color:'#00ff44' },
  { id:'esp-c3-01', role:'sensor',     state:'validated', metric:0.71, color:'#ffee00' },
  { id:'esp-c3-02', role:'sensor',     state:'validated', metric:0.57, color:'#ffee00' },
  { id:'esp-c3-03', role:'sensor',     state:'pending',   metric:0.28, color:'#ff8800' },
  { id:'esp-c3-04', role:'sensor',     state:'pending',   metric:0.14, color:'#ff8800' },
];

// WordNet basis words mapped to golden twelve
const WORDNET_SIMPLEX = [
  { word:'Freedom',     face:'agency', synset:'freedom.n.01', depth:4, w:0.25 },
  { word:'Grace',       face:'ethics', synset:'grace.n.03',   depth:6, w:0.375 },
  { word:'Yes',         face:'logic',  synset:'yes.n.01',     depth:2, w:0.125 },
  { word:'Stop',        face:'logic',  synset:'stop.v.01',    depth:5, w:0.3125 },
  { word:'Love',        face:'ethics', synset:'love.n.01',    depth:7, w:0.4375 },
  { word:'Sovereignty', face:'agency', synset:'sovereignty.n.01', depth:5, w:0.3125 },
];

// ═══════════════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════════════

let state = {
  angle:       0,
  spinSpeed:   0.5,
  autoRotate:  true,
  lc:          0,
  prevHash:    null,
  tick:        0,
  cycle:       0,
  quadrants:   {},   // fano_id -> KK|KU|UK|UU
  ledColors:   {},   // path -> {h,s,v}
  activeLine:  null,
  faces:       [],
  centroid:    { stop_metric:0, closure_ratio:0, sabbath:false, reason:'' },
  pattern:     null,
  patternStep: 0,
  basisHash:   '0x' + Array.from({length:32}, () => Math.floor(Math.random()*256).toString(16).padStart(2,'0')).join(''),
  sabGrid:     new Uint32Array(256),
  narratives:  [],
};

// ═══════════════════════════════════════════════════════
// CRYPTO (lightweight stub — sha256-like via XOR chain)
// ═══════════════════════════════════════════════════════

function hashStr(s) {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = (h * 0x01000193) >>> 0;
  }
  return '0x' + h.toString(16).padStart(8,'0') +
         ((h ^ 0xdeadbeef) >>> 0).toString(16).padStart(8,'0');
}

// ═══════════════════════════════════════════════════════
// EPISTEMIC SQUARE MATH (mirrors epistemic-square.js)
// ═══════════════════════════════════════════════════════

function rotatePoint(p, angleDeg) {
  const rad  = -angleDeg * Math.PI / 180;
  const cosA = Math.cos(rad), sinA = Math.sin(rad);
  return {
    x: p.baseX * cosA - p.baseY * sinA,
    y: p.baseX * sinA + p.baseY * cosA,
  };
}

function getQuadrant(x, y) {
  if (x >= 0 && y >= 0) return 'KK';
  if (x <  0 && y >= 0) return 'KU';
  if (x >= 0 && y <  0) return 'UK';
  return 'UU';
}

function updateQuadrants(angleDeg) {
  const q = {};
  FANO_POINTS.forEach(p => {
    const { x, y } = rotatePoint(p, angleDeg);
    q[p.id] = getQuadrant(x, y);
  });
  return q;
}

// ═══════════════════════════════════════════════════════
// FACE EVALUATION
// ═══════════════════════════════════════════════════════

function evaluateFaces(quads) {
  return FANO_LINES.map(line => {
    const qs    = line.points.map(pid => quads[pid]);
    const roles = qs.map(q => QUADRANT_MAP[q].spo);
    const u     = new Set(roles);
    const isSPO = u.has('subject') && u.has('predicate') && u.has('object');
    const isCoherent = u.size === 1;
    return {
      face_id: line.id,
      vertices: line.points.map(pid => \`v\${pid}\`),
      invariant_name: isSPO ? 'spo_triple_closure' : isCoherent ? 'coherent_state' : 'partial',
      status: (isSPO || isCoherent) ? 'pass' : 'fail',
      quadrants: qs,
      roles,
    };
  });
}

function computeCentroid(faces) {
  const pass = faces.filter(f => f.status === 'pass').length;
  const cr   = pass / 7;
  return {
    stop_metric:   cr,
    closure_ratio: cr,
    sabbath:       cr === 1.0,
    reason:        cr === 1.0 ? 'all_invariants_closed' : \`incomplete_faces:\${pass}/7\`,
    pass,
  };
}

// ═══════════════════════════════════════════════════════
// COMMIT EMISSION
// ═══════════════════════════════════════════════════════

function emitCommit(type, extra = {}) {
  const payload = {
    id:     \`cmt-\${state.cycle}-\${state.tick}-\${Date.now()}\`,
    t:      Date.now(),
    lc:     state.lc++,
    type,
    tick:   state.tick,
    angle:  state.angle.toFixed(2),
    centroid: state.centroid,
    faces:  state.faces,
    basisHash: state.basisHash,
    prev_hash: state.prevHash,
    ...extra,
  };
  payload.self_hash = hashStr(JSON.stringify(payload));
  payload.sig       = hashStr('sig:' + payload.self_hash);
  state.prevHash    = payload.self_hash;

  // Log to stream
  appendStream(payload);

  // Update SAB
  FANO_POINTS.forEach(p => {
    const q   = state.quadrants[p.id] || 'UU';
    const row = p.id - 1;
    const col = Math.floor((state.angle % 360) / 360 * 16);
    const idx = row * 16 + col;
    state.sabGrid[idx] = p.hue;
  });

  // Narrative
  if (type === 'face_eval' || type === 'commit') {
    buildNarrative(payload);
  }

  return payload;
}

// ═══════════════════════════════════════════════════════
// SVG RING BUILDER
// ═══════════════════════════════════════════════════════

function buildRings() {
  const ringsG = document.getElementById('svg-rings');
  const linesG = document.getElementById('svg-fano-lines');
  ringsG.innerHTML = '';
  linesG.innerHTML = '';

  RINGS.forEach((ring, ri) => {
    const g = document.createElementNS('http://www.w3.org/2000/svg','g');
    g.id = \`ring-\${ri}\`;

    if (ri === 0) return; // center handled separately

    for (let li = 0; li < ring.count; li++) {
      const angleDeg = (li / ring.count) * 360;
      const angleRad = (angleDeg - 90) * Math.PI / 180;
      const cx = ring.r * Math.cos(angleRad);
      const cy = ring.r * Math.sin(angleRad);
      const fanoId = (li % 7) + 1;
      const fano   = FANO_POINTS.find(p => p.id === fanoId);
      const ledR   = ri <= 2 ? 5 : ri <= 4 ? 4 : ri <= 6 ? 3 : 2.5;

      const path = \`m/240'/\${ri}'/\${li}'/\${fanoId}'\`;

      const c = document.createElementNS('http://www.w3.org/2000/svg','circle');
      c.setAttribute('cx', cx.toFixed(1));
      c.setAttribute('cy', cy.toFixed(1));
      c.setAttribute('r',  ledR);
      c.setAttribute('fill', fano.color);
      c.setAttribute('opacity', '0.7');
      c.setAttribute('class','led');
      c.dataset.path  = path;
      c.dataset.fano  = fanoId;
      c.dataset.ring  = ri;
      c.dataset.led   = li;
      c.id = \`led-r\${ri}-l\${li}\`;

      // Click to highlight fano line
      c.addEventListener('click', () => highlightFanoLines(fanoId));
      g.appendChild(c);
    }
    ringsG.appendChild(g);
  });

  // Draw Fano lines using ring-1 positions as anchor points
  const ring1 = RINGS[1];
  const ptPos = {};
  FANO_POINTS.forEach((fp, fi) => {
    const angleDeg = (fi / 7) * 360;
    const angleRad = (angleDeg - 90) * Math.PI / 180;
    ptPos[fp.id] = {
      x: ring1.r * Math.cos(angleRad),
      y: ring1.r * Math.sin(angleRad),
    };
  });

  FANO_LINES.forEach(line => {
    const [a,b,c] = line.points.map(pid => ptPos[pid]);
    const el = document.createElementNS('http://www.w3.org/2000/svg','line');
    // Draw as triangle centroid-connected lines
    const cx2 = (a.x+b.x+c.x)/3, cy2 = (a.y+b.y+c.y)/3;
    // Draw 3 lines from each vertex to centroid
    line.points.forEach(pid => {
      const p = ptPos[pid];
      const seg = document.createElementNS('http://www.w3.org/2000/svg','line');
      seg.setAttribute('x1', p.x.toFixed(1));
      seg.setAttribute('y1', p.y.toFixed(1));
      seg.setAttribute('x2', cx2.toFixed(1));
      seg.setAttribute('y2', cy2.toFixed(1));
      seg.setAttribute('class','fano-line-svg');
      seg.dataset.line = line.id;
      linesG.appendChild(seg);
    });
  });
}

// ═══════════════════════════════════════════════════════
// HIGHLIGHT FANO LINES
// ═══════════════════════════════════════════════════════

function highlightFanoLines(fanoId) {
  const activeLines = FANO_LINES.filter(l => l.points.includes(fanoId));
  document.querySelectorAll('.fano-line-svg').forEach(el => {
    const isActive = activeLines.some(l => l.id === el.dataset.line);
    el.classList.toggle('lit', isActive);
    el.style.stroke = isActive
      ? FANO_POINTS.find(p => p.id === fanoId).color
      : '';
  });
  state.activeLine = activeLines.map(l=>l.id).join(', ');
  document.getElementById('active-line-display').textContent =
    state.activeLine || '—';
}

// ═══════════════════════════════════════════════════════
// UPDATE LED COLORS FROM QUADRANT STATE
// ═══════════════════════════════════════════════════════

function updateLEDColors() {
  document.querySelectorAll('.led[data-fano]').forEach(el => {
    const fanoId = parseInt(el.dataset.fano);
    if (!fanoId || fanoId > 7) return;
    const q     = state.quadrants[fanoId] || 'UU';
    const qColor = QUADRANT_MAP[q].color;
    const base   = FANO_POINTS.find(p => p.id === fanoId)?.color || '#ffffff';

    // Blend base color with quadrant color based on metric
    el.style.fill = q === 'KK' ? base :
                    q === 'UU' ? '#223' : base;
    el.style.opacity = q === 'KK' ? '1' : q === 'KU' ? '0.8' : '0.5';
    if (q === 'KK') el.setAttribute('filter','url(#glow-sm)');
    else el.removeAttribute('filter');
  });

  // Center LED reflects sabbath
  const center = document.getElementById('led-center');
  if (state.centroid.sabbath) {
    center.setAttribute('fill','#ffffff');
    center.setAttribute('filter','url(#glow-lg)');
    document.body.classList.add('sabbath');
  } else {
    center.setAttribute('fill', '#888888');
    center.setAttribute('filter','url(#glow-md)');
    document.body.classList.remove('sabbath');
  }
}

// ═══════════════════════════════════════════════════════
// UPDATE EPISTEMIC SQUARE (mini)
// ═══════════════════════════════════════════════════════

function updateEpistemicSquare() {
  const g = document.getElementById('ep-points-g');
  g.innerHTML = '';
  FANO_POINTS.forEach(fp => {
    const pos = rotatePoint(fp, state.angle);
    const q   = state.quadrants[fp.id] || 'UU';
    const cx  = 100 + pos.x * 200;
    const cy  = 100 - pos.y * 200; // SVG y-flip
    const c   = document.createElementNS('http://www.w3.org/2000/svg','circle');
    c.setAttribute('cx', cx.toFixed(1));
    c.setAttribute('cy', cy.toFixed(1));
    c.setAttribute('r', '5');
    c.setAttribute('fill', QUADRANT_MAP[q].color);
    c.setAttribute('opacity','0.9');
    const t = document.createElementNS('http://www.w3.org/2000/svg','text');
    t.setAttribute('x', cx.toFixed(1));
    t.setAttribute('y', (cy - 8).toFixed(1));
    t.setAttribute('text-anchor','middle');
    t.setAttribute('fill', fp.color);
    t.setAttribute('style','font-size:6px;font-family:monospace');
    t.textContent = fp.name.slice(0,3);
    g.appendChild(c);
    g.appendChild(t);
  });
}

// ═══════════════════════════════════════════════════════
// UPDATE SPO TABLE
// ═══════════════════════════════════════════════════════

function updateSPOTable() {
  const bridge = window.__wesiriBridge;
  if (bridge && bridge.renderMode === 'react' && typeof bridge.onSPO === 'function') {
    const rows = FANO_POINTS.map((fp) => {
      const q = state.quadrants[fp.id] || 'UU';
      const qm = QUADRANT_MAP[q];
      return {
        id: fp.id,
        name: fp.name,
        color: fp.color,
        q,
        role: qm.role,
        repl: qm.repl,
        io: qm.io,
      };
    });
    bridge.onSPO(rows);
    return;
  }

  const el = document.getElementById('spo-table');
  el.innerHTML = FANO_POINTS.map(fp => {
    const q  = state.quadrants[fp.id] || 'UU';
    const qm = QUADRANT_MAP[q];
    return \`<div class="spo-row">
      <span class="spo-name" style="color:\${fp.color}">\${fp.name}</span>
      <span class="spo-quad \${q}">\${q}</span>
      <span class="spo-role">\${qm.role}</span>
      <span class="spo-repl">\${qm.repl}·\${qm.io}</span>
    </div>\`;
  }).join('');
}

// ═══════════════════════════════════════════════════════
// UPDATE FACE TABLE
// ═══════════════════════════════════════════════════════

function updateFaceTable() {
  const bridge = window.__wesiriBridge;
  if (bridge && bridge.renderMode === 'react' && typeof bridge.onFaces === 'function') {
    bridge.onFaces(state.faces.map((f) => ({
      face_id: f.face_id,
      vertices: [...f.vertices],
      status: f.status,
      invariant_name: f.invariant_name,
    })));
    return;
  }

  const el = document.getElementById('face-table');
  el.innerHTML = state.faces.map(f => \`
    <div class="face-row">
      <span class="face-id">\${f.face_id}</span>
      <span class="face-pts">{\${f.vertices.join(',')}}</span>
      <span class="face-status \${f.status}">\${f.status.toUpperCase()}</span>
      <span class="face-inv">\${f.invariant_name}</span>
    </div>\`).join('');
}

// ═══════════════════════════════════════════════════════
// UPDATE CENTROID
// ═══════════════════════════════════════════════════════

function updateCentroid() {
  const c = state.centroid;
  const bridge = window.__wesiriBridge;

  if (bridge && bridge.renderMode === 'react' && typeof bridge.onCentroidPanel === 'function') {
    bridge.onCentroidPanel({
      stopMetric: c.stop_metric,
      sabbath: c.sabbath,
    });
  }

  if (bridge && bridge.renderMode === 'react' && typeof bridge.onCentroidStatus === 'function') {
    bridge.onCentroidStatus({
      stopMetric: c.stop_metric,
      sabbath: c.sabbath,
    });
  }

  if (!(bridge && bridge.renderMode === 'react' && typeof bridge.onCentroidPanel === 'function')) {
    document.getElementById('cent-metric').textContent = c.stop_metric.toFixed(4);
    document.getElementById('cent-bar').style.width = (c.stop_metric * 100) + '%';
    const sab = document.getElementById('cent-sabbath');
    sab.textContent = c.sabbath ? 'SABBATH ✦' : 'Φ ' + (c.stop_metric * 7).toFixed(0) + '/7';
    sab.style.color = c.sabbath ? '#00ff44' : 'var(--dim)';
  }

  // Header
  if (!(bridge && bridge.renderMode === 'react' && typeof bridge.onCentroidStatus === 'function')) {
    document.getElementById('hdr-metric').textContent = 'Φ:' + c.stop_metric.toFixed(2);
    document.getElementById('hdr-sabbath').textContent = c.sabbath ? 'SABBATH:✦' : 'SABBATH:—';
    document.getElementById('hdr-sabbath').style.color = c.sabbath ? '#00ff44' : 'var(--dim)';
  }
}

// ═══════════════════════════════════════════════════════
// UPDATE 16x16 SAB WINDOW
// ═══════════════════════════════════════════════════════

function updateWindow() {
  const bridge = window.__wesiriBridge;
  const colors = new Array(256);

  for (let i = 0; i < 256; i++) {
    const row = Math.floor(i / 16);
    const col = i % 16;
    const fanoId = (row % 7) + 1;
    const q = state.quadrants[fanoId] || 'UU';
    const alpha = col / 15 * 0.8 + 0.1; // w-depth fade
    const qColors = { KK:'0,255,68', KU:'255,238,0', UK:'255,136,0', UU:'68,85,255' };
    colors[i] = \`rgba(\${qColors[q]},\${(alpha * (row < 12 ? 0.6 : 0.3)).toFixed(2)})\`;
  }

  if (bridge && bridge.renderMode === 'react' && typeof bridge.onWindowColors === 'function') {
    bridge.onWindowColors(colors);
    return;
  }

  const el = document.getElementById('window-grid');
  if (!el.children.length) {
    for (let i = 0; i < 256; i++) {
      const cell = document.createElement('div');
      cell.className = 'win-cell';
      cell.title = \`SAB[\${i}] row=\${Math.floor(i/16)} col=\${i%16}\`;
      el.appendChild(cell);
    }
  }

  const cells = el.children;
  for (let i = 0; i < 256; i++) {
    cells[i].style.background = colors[i];
  }
}

// ═══════════════════════════════════════════════════════
// STREAM LOG
// ═══════════════════════════════════════════════════════

function appendStream(commit) {
  const bridge = window.__wesiriBridge;
  if (bridge && bridge.renderMode === 'react' && typeof bridge.onCommit === 'function') {
    bridge.onCommit(commit);
    return;
  }

  const el = document.getElementById('stream-log');
  const line = document.createElement('div');
  line.className = \`stream-line \${commit.type}\`;
  line.textContent = \`lc:\${commit.lc} \${commit.type} \${commit.self_hash?.slice(0,14)}… Φ:\${commit.centroid?.stop_metric?.toFixed(2)||'—'}\`;
  el.insertBefore(line, el.firstChild);
  // Keep max 40 lines
  while (el.children.length > 40) el.removeChild(el.lastChild);

  // Schema panel shows latest commit
  document.getElementById('schema-panel').textContent =
    JSON.stringify({
      id:   commit.id?.slice(0,20)+'…',
      t:    commit.t,
      lc:   commit.lc,
      type: commit.type,
      centroid: commit.centroid,
      prev_hash: commit.prev_hash?.slice(0,14)+'…',
      self_hash: commit.self_hash?.slice(0,14)+'…',
    }, null, 1);
}

// ═══════════════════════════════════════════════════════
// NARRATIVE BUILDER
// ═══════════════════════════════════════════════════════

const NARRATIVE_TEMPLATES = {
  subject_pass:   (n,r) => \`\${n} intends \${r} through the open channel\`,
  predicate_pass: (n,r) => \`\${n} mediates the event toward resolution\`,
  object_pass:    (n,r) => \`\${n} receives incidence, closes the triple\`,
  centroid_pass:  (n,r) => \`\${n} rests at the centroid — meaning held\`,
  sabbath:        ()    => \`All seven lines close. The garden is sealed. ✦\`,
};

function buildNarrative(commit) {
  if (commit.centroid?.sabbath) {
    state.narratives.unshift(NARRATIVE_TEMPLATES.sabbath());
  } else {
    const subjects = FANO_POINTS.filter(p => state.quadrants[p.id] === 'KK');
    if (subjects.length) {
      const n = subjects[0].name;
      const r = QUADRANT_MAP['KK'].golden;
      state.narratives.unshift(NARRATIVE_TEMPLATES.subject_pass(n, r));
    }
  }
  if (state.narratives.length > 20) state.narratives = state.narratives.slice(0,20);

  const bridge = window.__wesiriBridge;
  if (bridge && bridge.renderMode === 'react' && typeof bridge.onNarratives === 'function') {
    bridge.onNarratives([...state.narratives]);
    return;
  }

  const el = document.getElementById('narrative-panel');
  el.innerHTML = state.narratives.map(t =>
    \`<div style="padding:2px 0;border-bottom:1px solid var(--dimmer)">\${t}</div>\`
  ).join('');
}

// ═══════════════════════════════════════════════════════
// WORDNET PANEL
// ═══════════════════════════════════════════════════════

function buildWordnetPanel() {
  const el = document.getElementById('wordnet-panel');
  el.innerHTML = \`
    <div style="font-size:7px;color:var(--gold2);line-height:1.8">
      <div style="color:var(--dim);margin-bottom:4px">basis: \${state.basisHash.slice(0,20)}…</div>
      \${WORDNET_SIMPLEX.map(ws => \`
        <div style="display:flex;gap:6px;align-items:center;padding:2px 0;border-bottom:1px solid var(--dimmer)">
          <span style="color:\${ws.face==='agency'?'#00ff44':ws.face==='ethics'?'#ffee00':'#ff8800'};width:12px">▸</span>
          <span style="width:70px;color:var(--gold)">\${ws.word}</span>
          <span style="color:var(--dim);flex:1">\${ws.synset}</span>
          <span style="color:var(--gold2)">w=\${ws.w.toFixed(3)}</span>
        </div>\`).join('')}
      <div style="margin-top:8px;color:var(--dim)">WordNet 3.1 · SHA256:</div>
      <div style="color:var(--gold2);word-break:break-all;font-size:6px">\${state.basisHash}</div>
    </div>\`;
}

// ═══════════════════════════════════════════════════════
// DOCUMENT GRAPH PANEL
// ═══════════════════════════════════════════════════════

function buildDocGraph() {
  const el = document.getElementById('doc-graph');
  el.innerHTML = SVG_DOCS.map(doc => \`
    <div class="doc-node" onclick="selectDoc('\${doc.id}')" id="docnode-\${doc.id}">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <span style="color:\${doc.color};font-size:9px">\${doc.name}</span>
        <span class="doc-node-type">\${doc.type}</span>
      </div>
      <div class="doc-node-hash">\${doc.hash} · \${doc.id}</div>
    </div>\`).join('');
}

function selectDoc(id) {
  document.querySelectorAll('.doc-node').forEach(n => n.classList.remove('active'));
  const el = document.getElementById('docnode-' + id);
  if (el) el.classList.add('active');
  appendStream({ lc:state.lc++, type:'projection', t:Date.now(),
    self_hash: hashStr('prj:'+id+Date.now()),
    prev_hash: state.prevHash,
    centroid: state.centroid,
    id: \`prj-\${id}-\${Date.now()}\` });
}

// ═══════════════════════════════════════════════════════
// ESP32 LATTICE PANEL
// ═══════════════════════════════════════════════════════

function buildESPList() {
  const el = document.getElementById('esp-list');
  el.innerHTML = ESP_NODES.map(n => \`
    <div class="esp-node">
      <span class="esp-dot" style="background:\${n.color}"></span>
      <span class="esp-id">\${n.id}</span>
      <span class="esp-state" style="color:\${n.color}">\${n.state}</span>
      <span class="esp-metric" style="color:\${n.color}">\${n.metric.toFixed(2)}</span>
    </div>\`).join('');
}

// ═══════════════════════════════════════════════════════
// PATTERN RUNNER
// ═══════════════════════════════════════════════════════

function runPattern(name) {
  state.pattern = name;
  state.patternStep = 0;
  appendStream({ lc:state.lc++, type:'face_eval', t:Date.now(),
    self_hash: hashStr('pat:'+name), prev_hash: state.prevHash,
    centroid: state.centroid, id:\`pat-\${name}-\${Date.now()}\` });
}

function stepPattern() {
  if (!state.pattern) return;
  if (state.pattern === 'tetrahedral_sweep') {
    // Sweep radially ring by ring
    const ring = RINGS[state.patternStep % RINGS.length];
    document.querySelectorAll(\`.led[data-ring="\${state.patternStep % RINGS.length}"]\`).forEach(el => {
      el.setAttribute('filter','url(#glow-md)');
      setTimeout(() => el.removeAttribute('filter'), 400);
    });
    state.patternStep++;
    if (state.patternStep >= RINGS.length) state.pattern = null;
  } else if (state.pattern === 'fano_line_cycle') {
    const line = FANO_LINES[state.patternStep % 7];
    document.querySelectorAll('.fano-line-svg').forEach(el => {
      const isActive = el.dataset.line === line.id;
      el.classList.toggle('lit', isActive);
    });
    state.activeLine = line.id;
    document.getElementById('active-line-display').textContent = line.id + ' {' + line.points.join(',') + '}';
    state.patternStep++;
    if (state.patternStep >= 7) { state.pattern = null; document.querySelectorAll('.fano-line-svg').forEach(el=>el.classList.remove('lit')); }
  }
}

// ═══════════════════════════════════════════════════════
// CONTROLS
// ═══════════════════════════════════════════════════════

function toggleRotate() {
  state.autoRotate = !state.autoRotate;
  const btn = document.getElementById('btn-rotate');
  btn.textContent = state.autoRotate ? 'ON' : 'OFF';
  btn.classList.toggle('active', state.autoRotate);
}

function seekSabbath() {
  // Find nearest angle where sabbath occurs
  // Try angles in steps until sabbath or max search
  for (let a = state.angle; a < state.angle + 360; a += 0.5) {
    const q = updateQuadrants(a);
    const f = evaluateFaces(q);
    const c = computeCentroid(f);
    if (c.sabbath) {
      state.angle = a % 360;
      break;
    }
  }
}

document.getElementById('spin-speed').addEventListener('input', function() {
  state.spinSpeed = parseFloat(this.value);
  document.getElementById('spin-val').textContent = this.value + '°';
});

// ═══════════════════════════════════════════════════════
// MAIN LOOP
// ═══════════════════════════════════════════════════════

let frameCount = 0;

function tick() {
  if (state.autoRotate) {
    state.angle = (state.angle + state.spinSpeed) % 360;
    state.tick++;
    if (state.tick >= 720) { state.tick = 0; state.cycle++; }
  }

  // Update quadrant state
  state.quadrants = updateQuadrants(state.angle);
  state.faces     = evaluateFaces(state.quadrants);
  state.centroid  = computeCentroid(state.faces);

  // Header
  const bridge = window.__wesiriBridge;
  if (bridge && bridge.renderMode === 'react' && typeof bridge.onTickStatus === 'function') {
    bridge.onTickStatus({
      lc: state.lc,
      tick: state.tick,
      angle: state.angle,
    });
  } else {
    document.getElementById('hdr-lc').textContent    = 'lc:' + state.lc;
    document.getElementById('hdr-tick').textContent  = 'tick:' + state.tick;
    document.getElementById('hdr-angle').textContent = state.angle.toFixed(1) + '°';
  }

  // Visual updates
  updateLEDColors();
  updateEpistemicSquare();
  updateSPOTable();
  updateCentroid();
  updateFaceTable();
  updateWindow();

  // Pattern
  if (frameCount % 8 === 0) stepPattern();

  // Emit commits at transition boundaries (every ~10 frames)
  if (frameCount % 10 === 0) {
    const type = state.centroid.sabbath ? 'commit'
               : state.tick % 90 === 0  ? 'sync'
               : 'face_eval';
    emitCommit(type);
  }

  frameCount++;
  requestAnimationFrame(tick);
}

// ═══════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════

function init() {
  buildRings();
  buildDocGraph();
  buildESPList();
  buildWordnetPanel();

  const bridge = window.__wesiriBridge;
  if (bridge && bridge.renderMode === 'react' && typeof bridge.onBasisHash === 'function') {
    bridge.onBasisHash(state.basisHash);
  } else {
    document.getElementById('basis-hash-text').textContent = state.basisHash;
  }

  // Initial commit
  state.quadrants = updateQuadrants(0);
  state.faces     = evaluateFaces(state.quadrants);
  state.centroid  = computeCentroid(state.faces);
  emitCommit('vertex_init');

  // Select first doc
  selectDoc('fano-garden-seed-kernel');

  tick();
}

let __wesiriInitialized = false;
function initOnce() {
  if (__wesiriInitialized) return;
  __wesiriInitialized = true;
  init();
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', initOnce, { once: true });
} else {
  initOnce();
}
`;function Bf(){const e=A.useRef(null),[n,t]=A.useState(null),[r,l]=A.useState(null),[i,o]=A.useState(null),[u,s]=A.useState(null),[c,h]=A.useState(null),[m,p]=A.useState(null),[y,S]=A.useState(null),[w,F]=A.useState(null),[d,a]=A.useState(null),[f,v]=A.useState(null),[k,_]=A.useState(null),[N,C]=A.useState(null),[$,z]=A.useState(null),[me,ln]=A.useState(null),[on,yt]=A.useState(null),[Pl,St]=A.useState([]),[wt,x]=A.useState(""),[T,I]=A.useState([]),[H,Y]=A.useState(""),[Oe,Be]=A.useState({lc:0,tick:0,angle:0,stopMetric:0,sabbath:!1}),[kt,qe]=A.useState([]),[Bn,ac]=A.useState([]),[cc,dc]=A.useState([]),[Hn,fc]=A.useState({stopMetric:0,sabbath:!1});return A.useEffect(()=>{const P=e.current;if(!P)return;window.__wesiriBridge={renderMode:"react",onCommit:V=>{const b=V;St(dr=>[b,...dr].slice(0,40)),x(JSON.stringify({id:b.id?`${b.id.slice(0,20)}…`:void 0,t:b.t,lc:b.lc,type:b.type,centroid:b.centroid,prev_hash:b.prev_hash?`${b.prev_hash.slice(0,14)}…`:void 0,self_hash:b.self_hash?`${b.self_hash.slice(0,14)}…`:void 0},null,1))},onNarratives:V=>I(V),onTickStatus:V=>{Be(b=>({...b,lc:V.lc,tick:V.tick,angle:V.angle}))},onCentroidStatus:V=>{Be(b=>({...b,stopMetric:V.stopMetric,sabbath:V.sabbath}))},onBasisHash:V=>Y(V),onWindowColors:V=>qe(V),onSPO:V=>ac(V),onFaces:V=>dc(V),onCentroidPanel:V=>fc(V)},P.innerHTML=Uf,t(P.querySelector("#basis-hash-text")),l(P.querySelector("#window-grid")),o(P.querySelector("#hdr-lc")),s(P.querySelector("#hdr-tick")),h(P.querySelector("#hdr-angle")),p(P.querySelector("#hdr-metric")),S(P.querySelector("#hdr-sabbath")),F(P.querySelector("#spo-table")),a(P.querySelector("#face-table")),v(P.querySelector("#cent-metric")),_(P.querySelector("#cent-bar")),C(P.querySelector("#cent-sabbath")),z(P.querySelector("#stream-log")),ln(P.querySelector("#schema-panel")),yt(P.querySelector("#narrative-panel"));const Ce=document.createElement("script");return Ce.type="text/javascript",Ce.text=$f,P.appendChild(Ce),()=>{delete window.__wesiriBridge,P.innerHTML="",t(null),l(null),o(null),s(null),h(null),p(null),S(null),F(null),a(null),v(null),_(null),C(null),z(null),ln(null),yt(null)}},[]),A.useEffect(()=>{k&&(k.style.width=`${Hn.stopMetric*100}%`)},[k,Hn.stopMetric]),L.jsxs("main",{className:"app",children:[L.jsx("div",{ref:e,className:"legacy-mount"}),$&&ae.createPortal(L.jsx(L.Fragment,{children:Pl.map((P,Ce)=>{var V,b,dr;return L.jsx("div",{className:`stream-line ${P.type??""}`,children:`lc:${P.lc??"—"} ${P.type??"record"} ${((V=P.self_hash)==null?void 0:V.slice(0,14))??""}… Φ:${((dr=(b=P.centroid)==null?void 0:b.stop_metric)==null?void 0:dr.toFixed(2))??"—"}`},`${P.lc??"x"}-${Ce}`)})}),$),me&&ae.createPortal(L.jsx("pre",{style:{margin:0,whiteSpace:"pre-wrap",fontSize:"7px",lineHeight:1.7},children:wt}),me),on&&ae.createPortal(L.jsx(L.Fragment,{children:T.map((P,Ce)=>L.jsx("div",{style:{padding:"2px 0",borderBottom:"1px solid var(--dimmer)"},children:P},`${Ce}-${P.slice(0,16)}`))}),on),n&&ae.createPortal(L.jsx(L.Fragment,{children:H}),n),r&&ae.createPortal(L.jsx(L.Fragment,{children:kt.map((P,Ce)=>L.jsx("div",{className:"win-cell",title:`SAB[${Ce}] row=${Math.floor(Ce/16)} col=${Ce%16}`,style:{background:P}},Ce))}),r),i&&ae.createPortal(L.jsx(L.Fragment,{children:`lc:${Oe.lc}`}),i),u&&ae.createPortal(L.jsx(L.Fragment,{children:`tick:${Oe.tick}`}),u),c&&ae.createPortal(L.jsx(L.Fragment,{children:`${Oe.angle.toFixed(1)}°`}),c),m&&ae.createPortal(L.jsx(L.Fragment,{children:`Φ:${Oe.stopMetric.toFixed(2)}`}),m),y&&ae.createPortal(L.jsx("span",{style:{color:Oe.sabbath?"#00ff44":"var(--dim)"},children:Oe.sabbath?"SABBATH:✦":"SABBATH:—"}),y),w&&ae.createPortal(L.jsx(L.Fragment,{children:Bn.map(P=>L.jsxs("div",{className:"spo-row",children:[L.jsx("span",{className:"spo-name",style:{color:P.color},children:P.name}),L.jsx("span",{className:`spo-quad ${P.q}`,children:P.q}),L.jsx("span",{className:"spo-role",children:P.role}),L.jsx("span",{className:"spo-repl",children:`${P.repl}·${P.io}`})]},P.id))}),w),d&&ae.createPortal(L.jsx(L.Fragment,{children:cc.map(P=>L.jsxs("div",{className:"face-row",children:[L.jsx("span",{className:"face-id",children:P.face_id}),L.jsx("span",{className:"face-pts",children:`{${P.vertices.join(",")}}`}),L.jsx("span",{className:`face-status ${P.status}`,children:P.status.toUpperCase()}),L.jsx("span",{className:"face-inv",children:P.invariant_name})]},P.face_id))}),d),f&&ae.createPortal(L.jsx(L.Fragment,{children:Hn.stopMetric.toFixed(4)}),f),N&&ae.createPortal(L.jsx("span",{style:{color:Hn.sabbath?"#00ff44":"var(--dim)"},children:Hn.sabbath?"SABBATH ✦":`Φ ${(Hn.stopMetric*7).toFixed(0)}/7`}),N)]})}ei.createRoot(document.getElementById("root")).render(L.jsx(Bf,{}));

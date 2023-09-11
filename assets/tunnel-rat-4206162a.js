import{r as w,g as _,R as E}from"./@react-spring/core-453e6029.js";var O={exports:{}},A={};/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var v=w;function $(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var q=typeof Object.is=="function"?Object.is:$,F=v.useState,P=v.useEffect,W=v.useLayoutEffect,I=v.useDebugValue;function L(e,t){var r=t(),o=F({inst:{value:r,getSnapshot:t}}),n=o[0].inst,u=o[1];return W(function(){n.value=r,n.getSnapshot=t,m(n)&&u({inst:n})},[e,r,t]),P(function(){return m(n)&&u({inst:n}),e(function(){m(n)&&u({inst:n})})},[e]),I(r),r}function m(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!q(e,r)}catch{return!0}}function T(e,t){return t()}var B=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?T:L;A.useSyncExternalStore=v.useSyncExternalStore!==void 0?v.useSyncExternalStore:B;O.exports=A;var C=O.exports;const g=e=>{let t;const r=new Set,o=(s,S)=>{const i=typeof s=="function"?s(t):s;if(!Object.is(i,t)){const d=t;t=S??typeof i!="object"?i:Object.assign({},t,i),r.forEach(p=>p(t,d))}},n=()=>t,l={setState:o,getState:n,subscribe:s=>(r.add(s),()=>r.delete(s)),destroy:()=>{r.clear()}};return t=e(o,n,l),l},M=e=>e?g(e):g;var j={exports:{}},V={};/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var y=w,U=C;function z(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var k=typeof Object.is=="function"?Object.is:z,N=U.useSyncExternalStore,G=y.useRef,H=y.useEffect,J=y.useMemo,K=y.useDebugValue;V.useSyncExternalStoreWithSelector=function(e,t,r,o,n){var u=G(null);if(u.current===null){var a={hasValue:!1,value:null};u.current=a}else a=u.current;u=J(function(){function s(c){if(!S){if(S=!0,i=c,c=o(c),n!==void 0&&a.hasValue){var f=a.value;if(n(f,c))return d=f}return d=c}if(f=d,k(i,c))return f;var h=o(c);return n!==void 0&&n(f,h)?f:(i=c,d=h)}var S=!1,i,d,p=r===void 0?null:r;return[function(){return s(t())},p===null?void 0:function(){return s(p())}]},[t,r,o,n]);var l=N(e,u[0],u[1]);return H(function(){a.hasValue=!0,a.value=l},[l]),K(l),l};j.exports=V;var Q=j.exports;const X=_(Q),{useSyncExternalStoreWithSelector:Y}=X;function Z(e,t=e.getState,r){const o=Y(e.subscribe,e.getState,e.getServerState||e.getState,t,r);return w.useDebugValue(o),o}const x=e=>{const t=typeof e=="function"?M(e):e,r=(o,n)=>Z(t,o,n);return Object.assign(r,t),r},ee=e=>e?x(e):x;var D,b;const R=typeof window<"u"&&((D=window.document)!=null&&D.createElement||((b=window.navigator)==null?void 0:b.product)==="ReactNative")?E.useLayoutEffect:E.useEffect;function ne(){const e=ee(t=>({current:new Array,version:0,set:t}));return{In:({children:t})=>{const r=e(n=>n.set),o=e(n=>n.version);return R(()=>{r(n=>({version:n.version+1}))},[]),R(()=>(r(({current:n})=>({current:[...n,t]})),()=>r(({current:n})=>({current:n.filter(u=>u!==t)}))),[t,o]),null},Out:()=>{const t=e(r=>r.current);return E.createElement(E.Fragment,null,t)}}}export{C as s,ne as t};

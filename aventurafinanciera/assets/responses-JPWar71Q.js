import{i as y,j as E,r as b,k as _,l as m}from"./router-JOb6U47x.js";/**
 * @remix-run/server-runtime v2.8.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */let u=function(e){return e.Development="development",e.Production="production",e.Test="test",e}({});function z(e){return e===u.Development||e===u.Production||e===u.Test}/**
 * @remix-run/server-runtime v2.8.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function f(e,t){if(e instanceof Error&&t!==u.Development){let n=new Error("Unexpected Server Error");return n.stack=void 0,n}return e}function O(e,t){return Object.entries(e).reduce((n,[r,o])=>Object.assign(n,{[r]:f(o,t)}),{})}function R(e,t){let n=f(e,t);return{message:n.message,stack:n.stack}}function T(e,t){if(!e)return null;let n=Object.entries(e),r={};for(let[o,s]of n)if(y(s))r[o]={...s,__type:"RouteErrorResponse"};else if(s instanceof Error){let i=f(s,t);r[o]={message:i.message,stack:i.stack,__type:"Error",...i.name!=="Error"?{__subType:i.name}:{}}}else r[o]=s;return r}/**
 * @remix-run/server-runtime v2.8.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const P=(e,t={})=>E(e,t),$=(e,t={})=>_(e,t),h=(e,t=302)=>b(e,t),w=(e,t=302)=>m(e,t);function q(e){let t=e;return t&&typeof t=="object"&&typeof t.data=="object"&&typeof t.subscribe=="function"&&typeof t.cancel=="function"&&typeof t.resolveData=="function"}function x(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.headers=="object"&&typeof e.body<"u"}const k=new Set([301,302,303,307,308]);function j(e){return k.has(e)}function C(e){return j(e.status)}function g(e){return e!=null&&typeof e.then=="function"&&e._tracked===!0}const D="__deferred_promise:";function J(e,t,n){let r=new TextEncoder;return new ReadableStream({async start(s){let i={},d=[];for(let[a,c]of Object.entries(e.data))g(c)?(i[a]=`${D}${a}`,(typeof c._data<"u"||typeof c._error<"u")&&d.push(a)):i[a]=c;s.enqueue(r.encode(JSON.stringify(i)+`

`));for(let a of d)l(s,r,a,e.data[a],n);let p=e.subscribe((a,c)=>{c&&l(s,r,c,e.data[c],n)});await e.resolveData(t),p(),s.close()}})}function l(e,t,n,r,o){"_error"in r?e.enqueue(t.encode("error:"+JSON.stringify({[n]:r._error instanceof Error?R(r._error,o):r._error})+`

`)):e.enqueue(t.encode("data:"+JSON.stringify({[n]:r._data??null})+`

`))}export{u as S,q as a,j as b,C as c,J as d,O as e,T as f,z as g,$ as h,x as i,P as j,w as k,h as r,R as s};

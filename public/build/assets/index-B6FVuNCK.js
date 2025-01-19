import{r as s,j as P,b as A}from"./app-BSg7tcV-.js";import{u as M}from"./utils-B0fn8ihL.js";function _(e,t,{checkForDefaultPrevented:n=!0}={}){return function(o){if(e==null||e(o),n===!1||!o.defaultPrevented)return t==null?void 0:t(o)}}function I(e,t){const n=s.createContext(t);function r(u){const{children:i,...a}=u,f=s.useMemo(()=>a,Object.values(a));return P.jsx(n.Provider,{value:f,children:i})}function o(u){const i=s.useContext(n);if(i)return i;if(t!==void 0)return t;throw new Error(`\`${u}\` must be used within \`${e}\``)}return r.displayName=e+"Provider",[r,o]}function w(e,t=[]){let n=[];function r(u,i){const a=s.createContext(i),f=n.length;n=[...n,i];function c(m){const{scope:d,children:N,...p}=m,v=(d==null?void 0:d[e][f])||a,C=s.useMemo(()=>p,Object.values(p));return P.jsx(v.Provider,{value:C,children:N})}function l(m,d){const N=(d==null?void 0:d[e][f])||a,p=s.useContext(N);if(p)return p;if(i!==void 0)return i;throw new Error(`\`${m}\` must be used within \`${u}\``)}return c.displayName=u+"Provider",[c,l]}const o=()=>{const u=n.map(i=>s.createContext(i));return function(a){const f=(a==null?void 0:a[e])||u;return s.useMemo(()=>({[`__scope${e}`]:{...a,[e]:f}}),[a,f])}};return o.scopeName=e,[r,O(o,...t)]}function O(...e){const t=e[0];if(e.length===1)return t;const n=()=>{const r=e.map(o=>({useScope:o(),scopeName:o.scopeName}));return function(u){const i=r.reduce((a,{useScope:f,scopeName:c})=>{const m=f(u)[`__scope${c}`];return{...a,...m}},{});return s.useMemo(()=>({[`__scope${t.scopeName}`]:i}),[i])}};return n.scopeName=t.scopeName,n}function S(e){const t=s.useRef(e);return s.useEffect(()=>{t.current=e}),s.useMemo(()=>(...n)=>{var r;return(r=t.current)==null?void 0:r.call(t,...n)},[])}var h=globalThis!=null&&globalThis.document?s.useLayoutEffect:()=>{};function g(e,t){return s.useReducer((n,r)=>t[n][r]??n,e)}var R=e=>{const{present:t,children:n}=e,r=E(t),o=typeof n=="function"?n({present:r.isPresent}):s.Children.only(n),u=M(r.ref,T(o));return typeof n=="function"||r.isPresent?s.cloneElement(o,{ref:u}):null};R.displayName="Presence";function E(e){const[t,n]=s.useState(),r=s.useRef({}),o=s.useRef(e),u=s.useRef("none"),i=e?"mounted":"unmounted",[a,f]=g(i,{mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}});return s.useEffect(()=>{const c=x(r.current);u.current=a==="mounted"?c:"none"},[a]),h(()=>{const c=r.current,l=o.current;if(l!==e){const d=u.current,N=x(c);e?f("MOUNT"):N==="none"||(c==null?void 0:c.display)==="none"?f("UNMOUNT"):f(l&&d!==N?"ANIMATION_OUT":"UNMOUNT"),o.current=e}},[e,f]),h(()=>{if(t){const c=m=>{const N=x(r.current).includes(m.animationName);m.target===t&&N&&A.flushSync(()=>f("ANIMATION_END"))},l=m=>{m.target===t&&(u.current=x(r.current))};return t.addEventListener("animationstart",l),t.addEventListener("animationcancel",c),t.addEventListener("animationend",c),()=>{t.removeEventListener("animationstart",l),t.removeEventListener("animationcancel",c),t.removeEventListener("animationend",c)}}else f("ANIMATION_END")},[t,f]),{isPresent:["mounted","unmountSuspended"].includes(a),ref:s.useCallback(c=>{c&&(r.current=getComputedStyle(c)),n(c)},[])}}function x(e){return(e==null?void 0:e.animationName)||"none"}function T(e){var r,o;let t=(r=Object.getOwnPropertyDescriptor(e.props,"ref"))==null?void 0:r.get,n=t&&"isReactWarning"in t&&t.isReactWarning;return n?e.ref:(t=(o=Object.getOwnPropertyDescriptor(e,"ref"))==null?void 0:o.get,n=t&&"isReactWarning"in t&&t.isReactWarning,n?e.props.ref:e.props.ref||e.ref)}function j({prop:e,defaultProp:t,onChange:n=()=>{}}){const[r,o]=U({defaultProp:t,onChange:n}),u=e!==void 0,i=u?e:r,a=S(n),f=s.useCallback(c=>{if(u){const m=typeof c=="function"?c(e):c;m!==e&&a(m)}else o(c)},[u,e,o,a]);return[i,f]}function U({defaultProp:e,onChange:t}){const n=s.useState(e),[r]=n,o=s.useRef(r),u=S(t);return s.useEffect(()=>{o.current!==r&&(u(r),o.current=r)},[r,o,u]),n}export{R as P,_ as a,S as b,w as c,h as d,I as e,j as u};
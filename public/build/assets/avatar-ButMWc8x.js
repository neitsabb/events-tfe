import{r as s,j as d}from"./app-BSg7tcV-.js";import{c as h,b as I,d as g}from"./index-B6FVuNCK.js";import{P as u}from"./index-Dhe9Iuj7.js";import{c as m}from"./utils-B0fn8ihL.js";var f="Avatar",[j,$]=h(f),[C,p]=j(f),A=s.forwardRef((a,t)=>{const{__scopeAvatar:e,...r}=a,[o,n]=s.useState("idle");return d.jsx(C,{scope:e,imageLoadingStatus:o,onImageLoadingStatusChange:n,children:d.jsx(u.span,{...r,ref:t})})});A.displayName=f;var x="AvatarImage",w=s.forwardRef((a,t)=>{const{__scopeAvatar:e,src:r,onLoadingStatusChange:o=()=>{},...n}=a,l=p(x,e),i=b(r),c=I(v=>{o(v),l.onImageLoadingStatusChange(v)});return g(()=>{i!=="idle"&&c(i)},[i,c]),i==="loaded"?d.jsx(u.img,{...n,ref:t,src:r}):null});w.displayName=x;var S="AvatarFallback",N=s.forwardRef((a,t)=>{const{__scopeAvatar:e,delayMs:r,...o}=a,n=p(S,e),[l,i]=s.useState(r===void 0);return s.useEffect(()=>{if(r!==void 0){const c=window.setTimeout(()=>i(!0),r);return()=>window.clearTimeout(c)}},[r]),l&&n.imageLoadingStatus!=="loaded"?d.jsx(u.span,{...o,ref:t}):null});N.displayName=S;function b(a){const[t,e]=s.useState("idle");return g(()=>{if(!a){e("error");return}let r=!0;const o=new window.Image,n=l=>()=>{r&&e(l)};return e("loading"),o.onload=n("loaded"),o.onerror=n("error"),o.src=a,()=>{r=!1}},[a]),t}var L=A,y=w,R=N;const _=s.forwardRef(({className:a,...t},e)=>d.jsx(L,{ref:e,className:m("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",a),...t}));_.displayName=L.displayName;const E=s.forwardRef(({className:a,...t},e)=>d.jsx(y,{ref:e,className:m("aspect-square h-full w-full",a),...t}));E.displayName=y.displayName;const k=s.forwardRef(({className:a,...t},e)=>d.jsx(R,{ref:e,className:m("flex h-full w-full items-center justify-center rounded-full bg-muted",a),...t}));k.displayName=R.displayName;export{_ as A,E as a,k as b,N as c,w as d};

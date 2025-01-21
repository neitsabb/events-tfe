import{r,j as P,$ as jt,b as et,d as Ut}from"./app-DXmYKjII.js";import{c as Bt,P as tt,a as ee,b as nt,u as Kt}from"./index-C6-qIfEc.js";import{u as rt,S as Wt,c as K}from"./button-LZ4wRFbW.js";import{h as ot,R as Vt,u as Ht,F as zt,D as Gt,a as Xt,P as Yt,c as qt,_ as Zt,b as Qt,d as z,f as Jt,z as en,s as tn,e as nn,g as rn,i as on}from"./index-BuPIZ-AS.js";import{c as at,A as ct,C as an,a as cn,R as sn}from"./index-CetX8bG5.js";import"./dialog-D9adzbkq.js";function D(){return D=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)({}).hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},D.apply(null,arguments)}var Ae="Popover",[st,ao]=Bt(Ae,[at]),ne=at(),[ln,L]=st(Ae),lt=e=>{const{__scopePopover:t,children:n,open:o,defaultOpen:a,onOpenChange:c,modal:s=!1}=e,l=ne(t),u=r.useRef(null),[i,f]=r.useState(!1),[m=!1,E]=Kt({prop:o,defaultProp:a,onChange:c});return P.jsx(sn,{...l,children:P.jsx(ln,{scope:t,contentId:Xt(),triggerRef:u,open:m,onOpenChange:E,onOpenToggle:r.useCallback(()=>E(b=>!b),[E]),hasCustomAnchor:i,onCustomAnchorAdd:r.useCallback(()=>f(!0),[]),onCustomAnchorRemove:r.useCallback(()=>f(!1),[]),modal:s,children:n})})};lt.displayName=Ae;var it="PopoverAnchor",un=r.forwardRef((e,t)=>{const{__scopePopover:n,...o}=e,a=L(it,n),c=ne(n),{onCustomAnchorAdd:s,onCustomAnchorRemove:l}=a;return r.useEffect(()=>(s(),()=>l()),[s,l]),P.jsx(ct,{...c,...o,ref:t})});un.displayName=it;var ut="PopoverTrigger",dt=r.forwardRef((e,t)=>{const{__scopePopover:n,...o}=e,a=L(ut,n),c=ne(n),s=rt(t,a.triggerRef),l=P.jsx(tt.button,{type:"button","aria-haspopup":"dialog","aria-expanded":a.open,"aria-controls":a.contentId,"data-state":ht(a.open),...o,ref:s,onClick:ee(e.onClick,a.onOpenToggle)});return a.hasCustomAnchor?l:P.jsx(ct,{asChild:!0,...c,children:l})});dt.displayName=ut;var Ie="PopoverPortal",[dn,fn]=st(Ie,{forceMount:void 0}),ft=e=>{const{__scopePopover:t,forceMount:n,children:o,container:a}=e,c=L(Ie,t);return P.jsx(dn,{scope:t,forceMount:n,children:P.jsx(nt,{present:n||c.open,children:P.jsx(Yt,{asChild:!0,container:a,children:o})})})};ft.displayName=Ie;var Y="PopoverContent",vt=r.forwardRef((e,t)=>{const n=fn(Y,e.__scopePopover),{forceMount:o=n.forceMount,...a}=e,c=L(Y,e.__scopePopover);return P.jsx(nt,{present:o||c.open,children:c.modal?P.jsx(vn,{...a,ref:t}):P.jsx(mn,{...a,ref:t})})});vt.displayName=Y;var vn=r.forwardRef((e,t)=>{const n=L(Y,e.__scopePopover),o=r.useRef(null),a=rt(t,o),c=r.useRef(!1);return r.useEffect(()=>{const s=o.current;if(s)return ot(s)},[]),P.jsx(Vt,{as:Wt,allowPinchZoom:!0,children:P.jsx(mt,{...e,ref:a,trapFocus:n.open,disableOutsidePointerEvents:!0,onCloseAutoFocus:ee(e.onCloseAutoFocus,s=>{var l;s.preventDefault(),c.current||(l=n.triggerRef.current)==null||l.focus()}),onPointerDownOutside:ee(e.onPointerDownOutside,s=>{const l=s.detail.originalEvent,u=l.button===0&&l.ctrlKey===!0,i=l.button===2||u;c.current=i},{checkForDefaultPrevented:!1}),onFocusOutside:ee(e.onFocusOutside,s=>s.preventDefault(),{checkForDefaultPrevented:!1})})})}),mn=r.forwardRef((e,t)=>{const n=L(Y,e.__scopePopover),o=r.useRef(!1),a=r.useRef(!1);return P.jsx(mt,{...e,ref:t,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:c=>{var s,l;(s=e.onCloseAutoFocus)==null||s.call(e,c),c.defaultPrevented||(o.current||(l=n.triggerRef.current)==null||l.focus(),c.preventDefault()),o.current=!1,a.current=!1},onInteractOutside:c=>{var u,i;(u=e.onInteractOutside)==null||u.call(e,c),c.defaultPrevented||(o.current=!0,c.detail.originalEvent.type==="pointerdown"&&(a.current=!0));const s=c.target;((i=n.triggerRef.current)==null?void 0:i.contains(s))&&c.preventDefault(),c.detail.originalEvent.type==="focusin"&&a.current&&c.preventDefault()}})}),mt=r.forwardRef((e,t)=>{const{__scopePopover:n,trapFocus:o,onOpenAutoFocus:a,onCloseAutoFocus:c,disableOutsidePointerEvents:s,onEscapeKeyDown:l,onPointerDownOutside:u,onFocusOutside:i,onInteractOutside:f,...m}=e,E=L(Y,n),b=ne(n);return Ht(),P.jsx(zt,{asChild:!0,loop:!0,trapped:o,onMountAutoFocus:a,onUnmountAutoFocus:c,children:P.jsx(Gt,{asChild:!0,disableOutsidePointerEvents:s,onInteractOutside:f,onEscapeKeyDown:l,onPointerDownOutside:u,onFocusOutside:i,onDismiss:()=>E.onOpenChange(!1),children:P.jsx(an,{"data-state":ht(E.open),role:"dialog",id:E.contentId,...b,...m,ref:t,style:{...m.style,"--radix-popover-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-popover-content-available-width":"var(--radix-popper-available-width)","--radix-popover-content-available-height":"var(--radix-popper-available-height)","--radix-popover-trigger-width":"var(--radix-popper-anchor-width)","--radix-popover-trigger-height":"var(--radix-popper-anchor-height)"}})})})}),pt="PopoverClose",pn=r.forwardRef((e,t)=>{const{__scopePopover:n,...o}=e,a=L(pt,n);return P.jsx(tt.button,{type:"button",...o,ref:t,onClick:ee(e.onClick,()=>a.onOpenChange(!1))})});pn.displayName=pt;var hn="PopoverArrow",gn=r.forwardRef((e,t)=>{const{__scopePopover:n,...o}=e,a=ne(n);return P.jsx(cn,{...a,...o,ref:t})});gn.displayName=hn;function ht(e){return e?"open":"closed"}var bn=lt,$n=dt,En=ft,gt=vt;const co=bn,so=$n,Cn=r.forwardRef(({className:e,align:t="center",sideOffset:n=4,...o},a)=>P.jsx(En,{children:P.jsx(gt,{ref:a,align:t,sideOffset:n,className:K("z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",e),...o})}));Cn.displayName=gt.displayName;var Be=1,yn=.9,xn=.8,wn=.17,he=.1,ge=.999,Pn=.9999,Rn=.99,Sn=/[\\\/_+.#"@\[\(\{&]/,On=/[\\\/_+.#"@\[\(\{&]/g,Nn=/[\s-]/,bt=/[\s-]/g;function we(e,t,n,o,a,c,s){if(c===t.length)return a===e.length?Be:Rn;var l=`${a},${c}`;if(s[l]!==void 0)return s[l];for(var u=o.charAt(c),i=n.indexOf(u,a),f=0,m,E,b,x;i>=0;)m=we(e,t,n,o,i+1,c+1,s),m>f&&(i===a?m*=Be:Sn.test(e.charAt(i-1))?(m*=xn,b=e.slice(a,i-1).match(On),b&&a>0&&(m*=Math.pow(ge,b.length))):Nn.test(e.charAt(i-1))?(m*=yn,x=e.slice(a,i-1).match(bt),x&&a>0&&(m*=Math.pow(ge,x.length))):(m*=wn,a>0&&(m*=Math.pow(ge,i-a))),e.charAt(i)!==t.charAt(c)&&(m*=Pn)),(m<he&&n.charAt(i-1)===o.charAt(c+1)||o.charAt(c+1)===o.charAt(c)&&n.charAt(i-1)!==o.charAt(c))&&(E=we(e,t,n,o,i+1,c+2,s),E*he>m&&(m=E*he)),m>f&&(f=m),i=n.indexOf(u,i+1);return s[l]=f,f}function Ke(e){return e.toLowerCase().replace(bt," ")}function Dn(e,t){return we(e,t,Ke(e),Ke(t),0,0,{})}function X(e,t,{checkForDefaultPrevented:n=!0}={}){return function(a){if(e==null||e(a),n===!1||!a.defaultPrevented)return t==null?void 0:t(a)}}function An(e,t){typeof e=="function"?e(t):e!=null&&(e.current=t)}function $t(...e){return t=>e.forEach(n=>An(n,t))}function re(...e){return r.useCallback($t(...e),e)}function In(e,t=[]){let n=[];function o(c,s){const l=r.createContext(s),u=n.length;n=[...n,s];function i(m){const{scope:E,children:b,...x}=m,v=(E==null?void 0:E[e][u])||l,$=r.useMemo(()=>x,Object.values(x));return r.createElement(v.Provider,{value:$},b)}function f(m,E){const b=(E==null?void 0:E[e][u])||l,x=r.useContext(b);if(x)return x;if(s!==void 0)return s;throw new Error(`\`${m}\` must be used within \`${c}\``)}return i.displayName=c+"Provider",[i,f]}const a=()=>{const c=n.map(s=>r.createContext(s));return function(l){const u=(l==null?void 0:l[e])||c;return r.useMemo(()=>({[`__scope${e}`]:{...l,[e]:u}}),[l,u])}};return a.scopeName=e,[o,kn(a,...t)]}function kn(...e){const t=e[0];if(e.length===1)return t;const n=()=>{const o=e.map(a=>({useScope:a(),scopeName:a.scopeName}));return function(c){const s=o.reduce((l,{useScope:u,scopeName:i})=>{const m=u(c)[`__scope${i}`];return{...l,...m}},{});return r.useMemo(()=>({[`__scope${t.scopeName}`]:s}),[s])}};return n.scopeName=t.scopeName,n}const Pe=globalThis!=null&&globalThis.document?r.useLayoutEffect:()=>{},_n=jt.useId||(()=>{});let Fn=0;function be(e){const[t,n]=r.useState(_n());return Pe(()=>{e||n(o=>o??String(Fn++))},[e]),e||(t?`radix-${t}`:"")}function U(e){const t=r.useRef(e);return r.useEffect(()=>{t.current=e}),r.useMemo(()=>(...n)=>{var o;return(o=t.current)===null||o===void 0?void 0:o.call(t,...n)},[])}function Tn({prop:e,defaultProp:t,onChange:n=()=>{}}){const[o,a]=Mn({defaultProp:t,onChange:n}),c=e!==void 0,s=c?e:o,l=U(n),u=r.useCallback(i=>{if(c){const m=typeof i=="function"?i(e):i;m!==e&&l(m)}else a(i)},[c,e,a,l]);return[s,u]}function Mn({defaultProp:e,onChange:t}){const n=r.useState(e),[o]=n,a=r.useRef(o),c=U(t);return r.useEffect(()=>{a.current!==o&&(c(o),a.current=o)},[o,a,c]),n}const ke=r.forwardRef((e,t)=>{const{children:n,...o}=e,a=r.Children.toArray(n),c=a.find(jn);if(c){const s=c.props.children,l=a.map(u=>u===c?r.Children.count(s)>1?r.Children.only(null):r.isValidElement(s)?s.props.children:null:u);return r.createElement(Re,D({},o,{ref:t}),r.isValidElement(s)?r.cloneElement(s,void 0,l):null)}return r.createElement(Re,D({},o,{ref:t}),n)});ke.displayName="Slot";const Re=r.forwardRef((e,t)=>{const{children:n,...o}=e;return r.isValidElement(n)?r.cloneElement(n,{...Un(o,n.props),ref:$t(t,n.ref)}):r.Children.count(n)>1?r.Children.only(null):null});Re.displayName="SlotClone";const Ln=({children:e})=>r.createElement(r.Fragment,null,e);function jn(e){return r.isValidElement(e)&&e.type===Ln}function Un(e,t){const n={...t};for(const o in t){const a=e[o],c=t[o];/^on[A-Z]/.test(o)?n[o]=(...l)=>{c==null||c(...l),a==null||a(...l)}:o==="style"?n[o]={...a,...c}:o==="className"&&(n[o]=[a,c].filter(Boolean).join(" "))}return{...e,...n}}const Bn=["a","button","div","h2","h3","img","li","nav","ol","p","span","svg","ul"],ie=Bn.reduce((e,t)=>{const n=r.forwardRef((o,a)=>{const{asChild:c,...s}=o,l=c?ke:t;return r.useEffect(()=>{window[Symbol.for("radix-ui")]=!0},[]),r.createElement(l,D({},s,{ref:a}))});return n.displayName=`Primitive.${t}`,{...e,[t]:n}},{});function Kn(e,t){e&&et.flushSync(()=>e.dispatchEvent(t))}function Wn(e){const t=U(e);r.useEffect(()=>{const n=o=>{o.key==="Escape"&&t(o)};return document.addEventListener("keydown",n),()=>document.removeEventListener("keydown",n)},[t])}const Se="dismissableLayer.update",Vn="dismissableLayer.pointerDownOutside",Hn="dismissableLayer.focusOutside";let We;const zn=r.createContext({layers:new Set,layersWithOutsidePointerEventsDisabled:new Set,branches:new Set}),Gn=r.forwardRef((e,t)=>{const{disableOutsidePointerEvents:n=!1,onEscapeKeyDown:o,onPointerDownOutside:a,onFocusOutside:c,onInteractOutside:s,onDismiss:l,...u}=e,i=r.useContext(zn),[f,m]=r.useState(null),[,E]=r.useState({}),b=re(t,w=>m(w)),x=Array.from(i.layers),[v]=[...i.layersWithOutsidePointerEventsDisabled].slice(-1),$=x.indexOf(v),y=f?x.indexOf(f):-1,S=i.layersWithOutsidePointerEventsDisabled.size>0,O=y>=$,R=Xn(w=>{const I=w.target,_=[...i.branches].some(F=>F.contains(I));!O||_||(a==null||a(w),s==null||s(w),w.defaultPrevented||l==null||l())}),g=Yn(w=>{const I=w.target;[...i.branches].some(F=>F.contains(I))||(c==null||c(w),s==null||s(w),w.defaultPrevented||l==null||l())});return Wn(w=>{y===i.layers.size-1&&(o==null||o(w),!w.defaultPrevented&&l&&(w.preventDefault(),l()))}),r.useEffect(()=>{if(f)return n&&(i.layersWithOutsidePointerEventsDisabled.size===0&&(We=document.body.style.pointerEvents,document.body.style.pointerEvents="none"),i.layersWithOutsidePointerEventsDisabled.add(f)),i.layers.add(f),Ve(),()=>{n&&i.layersWithOutsidePointerEventsDisabled.size===1&&(document.body.style.pointerEvents=We)}},[f,n,i]),r.useEffect(()=>()=>{f&&(i.layers.delete(f),i.layersWithOutsidePointerEventsDisabled.delete(f),Ve())},[f,i]),r.useEffect(()=>{const w=()=>E({});return document.addEventListener(Se,w),()=>document.removeEventListener(Se,w)},[]),r.createElement(ie.div,D({},u,{ref:b,style:{pointerEvents:S?O?"auto":"none":void 0,...e.style},onFocusCapture:X(e.onFocusCapture,g.onFocusCapture),onBlurCapture:X(e.onBlurCapture,g.onBlurCapture),onPointerDownCapture:X(e.onPointerDownCapture,R.onPointerDownCapture)}))});function Xn(e){const t=U(e),n=r.useRef(!1),o=r.useRef(()=>{});return r.useEffect(()=>{const a=s=>{if(s.target&&!n.current){let u=function(){Et(Vn,t,l,{discrete:!0})};const l={originalEvent:s};s.pointerType==="touch"?(document.removeEventListener("click",o.current),o.current=u,document.addEventListener("click",o.current,{once:!0})):u()}n.current=!1},c=window.setTimeout(()=>{document.addEventListener("pointerdown",a)},0);return()=>{window.clearTimeout(c),document.removeEventListener("pointerdown",a),document.removeEventListener("click",o.current)}},[t]),{onPointerDownCapture:()=>n.current=!0}}function Yn(e){const t=U(e),n=r.useRef(!1);return r.useEffect(()=>{const o=a=>{a.target&&!n.current&&Et(Hn,t,{originalEvent:a},{discrete:!1})};return document.addEventListener("focusin",o),()=>document.removeEventListener("focusin",o)},[t]),{onFocusCapture:()=>n.current=!0,onBlurCapture:()=>n.current=!1}}function Ve(){const e=new CustomEvent(Se);document.dispatchEvent(e)}function Et(e,t,n,{discrete:o}){const a=n.originalEvent.target,c=new CustomEvent(e,{bubbles:!1,cancelable:!0,detail:n});t&&a.addEventListener(e,t,{once:!0}),o?Kn(a,c):a.dispatchEvent(c)}const $e="focusScope.autoFocusOnMount",Ee="focusScope.autoFocusOnUnmount",He={bubbles:!1,cancelable:!0},qn=r.forwardRef((e,t)=>{const{loop:n=!1,trapped:o=!1,onMountAutoFocus:a,onUnmountAutoFocus:c,...s}=e,[l,u]=r.useState(null),i=U(a),f=U(c),m=r.useRef(null),E=re(t,v=>u(v)),b=r.useRef({paused:!1,pause(){this.paused=!0},resume(){this.paused=!1}}).current;r.useEffect(()=>{if(o){let v=function(y){if(b.paused||!l)return;const S=y.target;l.contains(S)?m.current=S:j(m.current,{select:!0})},$=function(y){b.paused||!l||l.contains(y.relatedTarget)||j(m.current,{select:!0})};return document.addEventListener("focusin",v),document.addEventListener("focusout",$),()=>{document.removeEventListener("focusin",v),document.removeEventListener("focusout",$)}}},[o,l,b.paused]),r.useEffect(()=>{if(l){Ge.add(b);const v=document.activeElement;if(!l.contains(v)){const y=new CustomEvent($e,He);l.addEventListener($e,i),l.dispatchEvent(y),y.defaultPrevented||(Zn(nr(Ct(l)),{select:!0}),document.activeElement===v&&j(l))}return()=>{l.removeEventListener($e,i),setTimeout(()=>{const y=new CustomEvent(Ee,He);l.addEventListener(Ee,f),l.dispatchEvent(y),y.defaultPrevented||j(v??document.body,{select:!0}),l.removeEventListener(Ee,f),Ge.remove(b)},0)}}},[l,i,f,b]);const x=r.useCallback(v=>{if(!n&&!o||b.paused)return;const $=v.key==="Tab"&&!v.altKey&&!v.ctrlKey&&!v.metaKey,y=document.activeElement;if($&&y){const S=v.currentTarget,[O,R]=Qn(S);O&&R?!v.shiftKey&&y===R?(v.preventDefault(),n&&j(O,{select:!0})):v.shiftKey&&y===O&&(v.preventDefault(),n&&j(R,{select:!0})):y===S&&v.preventDefault()}},[n,o,b.paused]);return r.createElement(ie.div,D({tabIndex:-1},s,{ref:E,onKeyDown:x}))});function Zn(e,{select:t=!1}={}){const n=document.activeElement;for(const o of e)if(j(o,{select:t}),document.activeElement!==n)return}function Qn(e){const t=Ct(e),n=ze(t,e),o=ze(t.reverse(),e);return[n,o]}function Ct(e){const t=[],n=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode:o=>{const a=o.tagName==="INPUT"&&o.type==="hidden";return o.disabled||o.hidden||a?NodeFilter.FILTER_SKIP:o.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});for(;n.nextNode();)t.push(n.currentNode);return t}function ze(e,t){for(const n of e)if(!Jn(n,{upTo:t}))return n}function Jn(e,{upTo:t}){if(getComputedStyle(e).visibility==="hidden")return!0;for(;e;){if(t!==void 0&&e===t)return!1;if(getComputedStyle(e).display==="none")return!0;e=e.parentElement}return!1}function er(e){return e instanceof HTMLInputElement&&"select"in e}function j(e,{select:t=!1}={}){if(e&&e.focus){const n=document.activeElement;e.focus({preventScroll:!0}),e!==n&&er(e)&&t&&e.select()}}const Ge=tr();function tr(){let e=[];return{add(t){const n=e[0];t!==n&&(n==null||n.pause()),e=Xe(e,t),e.unshift(t)},remove(t){var n;e=Xe(e,t),(n=e[0])===null||n===void 0||n.resume()}}}function Xe(e,t){const n=[...e],o=n.indexOf(t);return o!==-1&&n.splice(o,1),n}function nr(e){return e.filter(t=>t.tagName!=="A")}const rr=r.forwardRef((e,t)=>{var n;const{container:o=globalThis==null||(n=globalThis.document)===null||n===void 0?void 0:n.body,...a}=e;return o?Ut.createPortal(r.createElement(ie.div,D({},a,{ref:t})),o):null});function or(e,t){return r.useReducer((n,o)=>{const a=t[n][o];return a??n},e)}const ue=e=>{const{present:t,children:n}=e,o=ar(t),a=typeof n=="function"?n({present:o.isPresent}):r.Children.only(n),c=re(o.ref,a.ref);return typeof n=="function"||o.isPresent?r.cloneElement(a,{ref:c}):null};ue.displayName="Presence";function ar(e){const[t,n]=r.useState(),o=r.useRef({}),a=r.useRef(e),c=r.useRef("none"),s=e?"mounted":"unmounted",[l,u]=or(s,{mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}});return r.useEffect(()=>{const i=ce(o.current);c.current=l==="mounted"?i:"none"},[l]),Pe(()=>{const i=o.current,f=a.current;if(f!==e){const E=c.current,b=ce(i);e?u("MOUNT"):b==="none"||(i==null?void 0:i.display)==="none"?u("UNMOUNT"):u(f&&E!==b?"ANIMATION_OUT":"UNMOUNT"),a.current=e}},[e,u]),Pe(()=>{if(t){const i=m=>{const b=ce(o.current).includes(m.animationName);m.target===t&&b&&et.flushSync(()=>u("ANIMATION_END"))},f=m=>{m.target===t&&(c.current=ce(o.current))};return t.addEventListener("animationstart",f),t.addEventListener("animationcancel",i),t.addEventListener("animationend",i),()=>{t.removeEventListener("animationstart",f),t.removeEventListener("animationcancel",i),t.removeEventListener("animationend",i)}}else u("ANIMATION_END")},[t,u]),{isPresent:["mounted","unmountSuspended"].includes(l),ref:r.useCallback(i=>{i&&(o.current=getComputedStyle(i)),n(i)},[])}}function ce(e){return(e==null?void 0:e.animationName)||"none"}let Ce=0;function cr(){r.useEffect(()=>{var e,t;const n=document.querySelectorAll("[data-radix-focus-guard]");return document.body.insertAdjacentElement("afterbegin",(e=n[0])!==null&&e!==void 0?e:Ye()),document.body.insertAdjacentElement("beforeend",(t=n[1])!==null&&t!==void 0?t:Ye()),Ce++,()=>{Ce===1&&document.querySelectorAll("[data-radix-focus-guard]").forEach(o=>o.remove()),Ce--}},[])}function Ye(){const e=document.createElement("span");return e.setAttribute("data-radix-focus-guard",""),e.tabIndex=0,e.style.cssText="outline: none; opacity: 0; position: fixed; pointer-events: none",e}var yt=qt(),ye=function(){},de=r.forwardRef(function(e,t){var n=r.useRef(null),o=r.useState({onScrollCapture:ye,onWheelCapture:ye,onTouchMoveCapture:ye}),a=o[0],c=o[1],s=e.forwardProps,l=e.children,u=e.className,i=e.removeScrollBar,f=e.enabled,m=e.shards,E=e.sideCar,b=e.noIsolation,x=e.inert,v=e.allowPinchZoom,$=e.as,y=$===void 0?"div":$,S=Zt(e,["forwardProps","children","className","removeScrollBar","enabled","shards","sideCar","noIsolation","inert","allowPinchZoom","as"]),O=E,R=Qt([n,t]),g=z(z({},S),a);return r.createElement(r.Fragment,null,f&&r.createElement(O,{sideCar:yt,removeScrollBar:i,shards:m,noIsolation:b,inert:x,setCallbacks:c,allowPinchZoom:!!v,lockRef:n}),s?r.cloneElement(r.Children.only(l),z(z({},g),{ref:R})):r.createElement(y,z({},g,{className:u,ref:R}),l))});de.defaultProps={enabled:!0,removeScrollBar:!0,inert:!1};de.classNames={fullWidth:Jt,zeroRight:en};var Oe=!1;if(typeof window<"u")try{var se=Object.defineProperty({},"passive",{get:function(){return Oe=!0,!0}});window.addEventListener("test",se,se),window.removeEventListener("test",se,se)}catch{Oe=!1}var V=Oe?{passive:!1}:!1,sr=function(e){var t=window.getComputedStyle(e);return t.overflowY!=="hidden"&&!(t.overflowY===t.overflowX&&t.overflowY==="visible")},lr=function(e){var t=window.getComputedStyle(e);return t.overflowX!=="hidden"&&!(t.overflowY===t.overflowX&&t.overflowX==="visible")},qe=function(e,t){var n=t;do{typeof ShadowRoot<"u"&&n instanceof ShadowRoot&&(n=n.host);var o=xt(e,n);if(o){var a=wt(e,n),c=a[1],s=a[2];if(c>s)return!0}n=n.parentNode}while(n&&n!==document.body);return!1},ir=function(e){var t=e.scrollTop,n=e.scrollHeight,o=e.clientHeight;return[t,n,o]},ur=function(e){var t=e.scrollLeft,n=e.scrollWidth,o=e.clientWidth;return[t,n,o]},xt=function(e,t){return e==="v"?sr(t):lr(t)},wt=function(e,t){return e==="v"?ir(t):ur(t)},dr=function(e,t){return e==="h"&&t==="rtl"?-1:1},fr=function(e,t,n,o,a){var c=dr(e,window.getComputedStyle(t).direction),s=c*o,l=n.target,u=t.contains(l),i=!1,f=s>0,m=0,E=0;do{var b=wt(e,l),x=b[0],v=b[1],$=b[2],y=v-$-c*x;(x||y)&&xt(e,l)&&(m+=y,E+=x),l=l.parentNode}while(!u&&l!==document.body||u&&(t.contains(l)||t===l));return(f&&(m===0||!a)||!f&&(E===0||!a))&&(i=!0),i},le=function(e){return"changedTouches"in e?[e.changedTouches[0].clientX,e.changedTouches[0].clientY]:[0,0]},Ze=function(e){return[e.deltaX,e.deltaY]},Qe=function(e){return e&&"current"in e?e.current:e},vr=function(e,t){return e[0]===t[0]&&e[1]===t[1]},mr=function(e){return`
  .block-interactivity-`.concat(e,` {pointer-events: none;}
  .allow-interactivity-`).concat(e,` {pointer-events: all;}
`)},pr=0,H=[];function hr(e){var t=r.useRef([]),n=r.useRef([0,0]),o=r.useRef(),a=r.useState(pr++)[0],c=r.useState(function(){return tn()})[0],s=r.useRef(e);r.useEffect(function(){s.current=e},[e]),r.useEffect(function(){if(e.inert){document.body.classList.add("block-interactivity-".concat(a));var v=nn([e.lockRef.current],(e.shards||[]).map(Qe),!0).filter(Boolean);return v.forEach(function($){return $.classList.add("allow-interactivity-".concat(a))}),function(){document.body.classList.remove("block-interactivity-".concat(a)),v.forEach(function($){return $.classList.remove("allow-interactivity-".concat(a))})}}},[e.inert,e.lockRef.current,e.shards]);var l=r.useCallback(function(v,$){if("touches"in v&&v.touches.length===2)return!s.current.allowPinchZoom;var y=le(v),S=n.current,O="deltaX"in v?v.deltaX:S[0]-y[0],R="deltaY"in v?v.deltaY:S[1]-y[1],g,w=v.target,I=Math.abs(O)>Math.abs(R)?"h":"v";if("touches"in v&&I==="h"&&w.type==="range")return!1;var _=qe(I,w);if(!_)return!0;if(_?g=I:(g=I==="v"?"h":"v",_=qe(I,w)),!_)return!1;if(!o.current&&"changedTouches"in v&&(O||R)&&(o.current=g),!g)return!0;var F=o.current||g;return fr(F,$,v,F==="h"?O:R,!0)},[]),u=r.useCallback(function(v){var $=v;if(!(!H.length||H[H.length-1]!==c)){var y="deltaY"in $?Ze($):le($),S=t.current.filter(function(g){return g.name===$.type&&g.target===$.target&&vr(g.delta,y)})[0];if(S&&S.should){$.preventDefault();return}if(!S){var O=(s.current.shards||[]).map(Qe).filter(Boolean).filter(function(g){return g.contains($.target)}),R=O.length>0?l($,O[0]):!s.current.noIsolation;R&&$.preventDefault()}}},[]),i=r.useCallback(function(v,$,y,S){var O={name:v,delta:$,target:y,should:S};t.current.push(O),setTimeout(function(){t.current=t.current.filter(function(R){return R!==O})},1)},[]),f=r.useCallback(function(v){n.current=le(v),o.current=void 0},[]),m=r.useCallback(function(v){i(v.type,Ze(v),v.target,l(v,e.lockRef.current))},[]),E=r.useCallback(function(v){i(v.type,le(v),v.target,l(v,e.lockRef.current))},[]);r.useEffect(function(){return H.push(c),e.setCallbacks({onScrollCapture:m,onWheelCapture:m,onTouchMoveCapture:E}),document.addEventListener("wheel",u,V),document.addEventListener("touchmove",u,V),document.addEventListener("touchstart",f,V),function(){H=H.filter(function(v){return v!==c}),document.removeEventListener("wheel",u,V),document.removeEventListener("touchmove",u,V),document.removeEventListener("touchstart",f,V)}},[]);var b=e.removeScrollBar,x=e.inert;return r.createElement(r.Fragment,null,x?r.createElement(c,{styles:mr(a)}):null,b?r.createElement(rn,{gapMode:"margin"}):null)}const gr=on(yt,hr);var Pt=r.forwardRef(function(e,t){return r.createElement(de,z({},e,{ref:t,sideCar:gr}))});Pt.classNames=de.classNames;const Rt="Dialog",[St,lo]=In(Rt),[br,W]=St(Rt),$r=e=>{const{__scopeDialog:t,children:n,open:o,defaultOpen:a,onOpenChange:c,modal:s=!0}=e,l=r.useRef(null),u=r.useRef(null),[i=!1,f]=Tn({prop:o,defaultProp:a,onChange:c});return r.createElement(br,{scope:t,triggerRef:l,contentRef:u,contentId:be(),titleId:be(),descriptionId:be(),open:i,onOpenChange:f,onOpenToggle:r.useCallback(()=>f(m=>!m),[f]),modal:s},n)},Ot="DialogPortal",[Er,Nt]=St(Ot,{forceMount:void 0}),Cr=e=>{const{__scopeDialog:t,forceMount:n,children:o,container:a}=e,c=W(Ot,t);return r.createElement(Er,{scope:t,forceMount:n},r.Children.map(o,s=>r.createElement(ue,{present:n||c.open},r.createElement(rr,{asChild:!0,container:a},s))))},Ne="DialogOverlay",yr=r.forwardRef((e,t)=>{const n=Nt(Ne,e.__scopeDialog),{forceMount:o=n.forceMount,...a}=e,c=W(Ne,e.__scopeDialog);return c.modal?r.createElement(ue,{present:o||c.open},r.createElement(xr,D({},a,{ref:t}))):null}),xr=r.forwardRef((e,t)=>{const{__scopeDialog:n,...o}=e,a=W(Ne,n);return r.createElement(Pt,{as:ke,allowPinchZoom:!0,shards:[a.contentRef]},r.createElement(ie.div,D({"data-state":At(a.open)},o,{ref:t,style:{pointerEvents:"auto",...o.style}})))}),te="DialogContent",wr=r.forwardRef((e,t)=>{const n=Nt(te,e.__scopeDialog),{forceMount:o=n.forceMount,...a}=e,c=W(te,e.__scopeDialog);return r.createElement(ue,{present:o||c.open},c.modal?r.createElement(Pr,D({},a,{ref:t})):r.createElement(Rr,D({},a,{ref:t})))}),Pr=r.forwardRef((e,t)=>{const n=W(te,e.__scopeDialog),o=r.useRef(null),a=re(t,n.contentRef,o);return r.useEffect(()=>{const c=o.current;if(c)return ot(c)},[]),r.createElement(Dt,D({},e,{ref:a,trapFocus:n.open,disableOutsidePointerEvents:!0,onCloseAutoFocus:X(e.onCloseAutoFocus,c=>{var s;c.preventDefault(),(s=n.triggerRef.current)===null||s===void 0||s.focus()}),onPointerDownOutside:X(e.onPointerDownOutside,c=>{const s=c.detail.originalEvent,l=s.button===0&&s.ctrlKey===!0;(s.button===2||l)&&c.preventDefault()}),onFocusOutside:X(e.onFocusOutside,c=>c.preventDefault())}))}),Rr=r.forwardRef((e,t)=>{const n=W(te,e.__scopeDialog),o=r.useRef(!1);return r.createElement(Dt,D({},e,{ref:t,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:a=>{var c;if((c=e.onCloseAutoFocus)===null||c===void 0||c.call(e,a),!a.defaultPrevented){var s;o.current||(s=n.triggerRef.current)===null||s===void 0||s.focus(),a.preventDefault()}o.current=!1},onInteractOutside:a=>{var c,s;(c=e.onInteractOutside)===null||c===void 0||c.call(e,a),a.defaultPrevented||(o.current=!0);const l=a.target;((s=n.triggerRef.current)===null||s===void 0?void 0:s.contains(l))&&a.preventDefault()}}))}),Dt=r.forwardRef((e,t)=>{const{__scopeDialog:n,trapFocus:o,onOpenAutoFocus:a,onCloseAutoFocus:c,...s}=e,l=W(te,n),u=r.useRef(null),i=re(t,u);return cr(),r.createElement(r.Fragment,null,r.createElement(qn,{asChild:!0,loop:!0,trapped:o,onMountAutoFocus:a,onUnmountAutoFocus:c},r.createElement(Gn,D({role:"dialog",id:l.contentId,"aria-describedby":l.descriptionId,"aria-labelledby":l.titleId,"data-state":At(l.open)},s,{ref:i,onDismiss:()=>l.onOpenChange(!1)}))),!1)});function At(e){return e?"open":"closed"}const Sr=$r,Or=Cr,Nr=yr,Dr=wr;var Ar='[cmdk-list-sizer=""]',J='[cmdk-group=""]',xe='[cmdk-group-items=""]',Ir='[cmdk-group-heading=""]',_e='[cmdk-item=""]',Je=`${_e}:not([aria-disabled="true"])`,De="cmdk-item-select",T="data-value",kr=(e,t)=>Dn(e,t),It=r.createContext(void 0),oe=()=>r.useContext(It),kt=r.createContext(void 0),Fe=()=>r.useContext(kt),_t=r.createContext(void 0),Ft=r.forwardRef((e,t)=>{let n=r.useRef(null),o=G(()=>{var d,h,C;return{search:"",value:(C=(h=e.value)!=null?h:(d=e.defaultValue)==null?void 0:d.toLowerCase())!=null?C:"",filtered:{count:0,items:new Map,groups:new Set}}}),a=G(()=>new Set),c=G(()=>new Map),s=G(()=>new Map),l=G(()=>new Set),u=Tt(e),{label:i,children:f,value:m,onValueChange:E,filter:b,shouldFilter:x,vimBindings:v=!0,...$}=e,y=r.useId(),S=r.useId(),O=r.useId(),R=Vr();q(()=>{if(m!==void 0){let d=m.trim().toLowerCase();o.current.value=d,R(6,Te),g.emit()}},[m]);let g=r.useMemo(()=>({subscribe:d=>(l.current.add(d),()=>l.current.delete(d)),snapshot:()=>o.current,setState:(d,h,C)=>{var p,N,k;if(!Object.is(o.current[d],h)){if(o.current[d]=h,d==="search")fe(),_(),R(1,F);else if(d==="value")if(((p=u.current)==null?void 0:p.value)!==void 0){let M=h??"";(k=(N=u.current).onValueChange)==null||k.call(N,M);return}else C||R(5,Te);g.emit()}},emit:()=>{l.current.forEach(d=>d())}}),[]),w=r.useMemo(()=>({value:(d,h)=>{h!==s.current.get(d)&&(s.current.set(d,h),o.current.filtered.items.set(d,I(h)),R(2,()=>{_(),g.emit()}))},item:(d,h)=>(a.current.add(d),h&&(c.current.has(h)?c.current.get(h).add(d):c.current.set(h,new Set([d]))),R(3,()=>{fe(),_(),o.current.value||F(),g.emit()}),()=>{s.current.delete(d),a.current.delete(d),o.current.filtered.items.delete(d);let C=Z();R(4,()=>{fe(),(C==null?void 0:C.getAttribute("id"))===d&&F(),g.emit()})}),group:d=>(c.current.has(d)||c.current.set(d,new Set),()=>{s.current.delete(d),c.current.delete(d)}),filter:()=>u.current.shouldFilter,label:i||e["aria-label"],commandRef:n,listId:y,inputId:O,labelId:S}),[]);function I(d){var h,C;let p=(C=(h=u.current)==null?void 0:h.filter)!=null?C:kr;return d?p(d,o.current.search):0}function _(){if(!n.current||!o.current.search||u.current.shouldFilter===!1)return;let d=o.current.filtered.items,h=[];o.current.filtered.groups.forEach(p=>{let N=c.current.get(p),k=0;N.forEach(M=>{let pe=d.get(M);k=Math.max(pe,k)}),h.push([p,k])});let C=n.current.querySelector(Ar);Q().sort((p,N)=>{var k,M;let pe=p.getAttribute(T),Lt=N.getAttribute(T);return((k=d.get(Lt))!=null?k:0)-((M=d.get(pe))!=null?M:0)}).forEach(p=>{let N=p.closest(xe);N?N.appendChild(p.parentElement===N?p:p.closest(`${xe} > *`)):C.appendChild(p.parentElement===C?p:p.closest(`${xe} > *`))}),h.sort((p,N)=>N[1]-p[1]).forEach(p=>{let N=n.current.querySelector(`${J}[${T}="${p[0]}"]`);N==null||N.parentElement.appendChild(N)})}function F(){let d=Q().find(C=>!C.ariaDisabled),h=d==null?void 0:d.getAttribute(T);g.setState("value",h||void 0)}function fe(){if(!o.current.search||u.current.shouldFilter===!1){o.current.filtered.count=a.current.size;return}o.current.filtered.groups=new Set;let d=0;for(let h of a.current){let C=s.current.get(h),p=I(C);o.current.filtered.items.set(h,p),p>0&&d++}for(let[h,C]of c.current)for(let p of C)if(o.current.filtered.items.get(p)>0){o.current.filtered.groups.add(h);break}o.current.filtered.count=d}function Te(){var d,h,C;let p=Z();p&&(((d=p.parentElement)==null?void 0:d.firstChild)===p&&((C=(h=p.closest(J))==null?void 0:h.querySelector(Ir))==null||C.scrollIntoView({block:"nearest"})),p.scrollIntoView({block:"nearest"}))}function Z(){var d;return(d=n.current)==null?void 0:d.querySelector(`${_e}[aria-selected="true"]`)}function Q(){return Array.from(n.current.querySelectorAll(Je))}function ve(d){let h=Q()[d];h&&g.setState("value",h.getAttribute(T))}function me(d){var h;let C=Z(),p=Q(),N=p.findIndex(M=>M===C),k=p[N+d];(h=u.current)!=null&&h.loop&&(k=N+d<0?p[p.length-1]:N+d===p.length?p[0]:p[N+d]),k&&g.setState("value",k.getAttribute(T))}function Me(d){let h=Z(),C=h==null?void 0:h.closest(J),p;for(;C&&!p;)C=d>0?Kr(C,J):Wr(C,J),p=C==null?void 0:C.querySelector(Je);p?g.setState("value",p.getAttribute(T)):me(d)}let Le=()=>ve(Q().length-1),je=d=>{d.preventDefault(),d.metaKey?Le():d.altKey?Me(1):me(1)},Ue=d=>{d.preventDefault(),d.metaKey?ve(0):d.altKey?Me(-1):me(-1)};return r.createElement("div",{ref:ae([n,t]),...$,"cmdk-root":"",onKeyDown:d=>{var h;if((h=$.onKeyDown)==null||h.call($,d),!d.defaultPrevented)switch(d.key){case"n":case"j":{v&&d.ctrlKey&&je(d);break}case"ArrowDown":{je(d);break}case"p":case"k":{v&&d.ctrlKey&&Ue(d);break}case"ArrowUp":{Ue(d);break}case"Home":{d.preventDefault(),ve(0);break}case"End":{d.preventDefault(),Le();break}case"Enter":if(!d.nativeEvent.isComposing){d.preventDefault();let C=Z();if(C){let p=new Event(De);C.dispatchEvent(p)}}}}},r.createElement("label",{"cmdk-label":"",htmlFor:w.inputId,id:w.labelId,style:Hr},i),r.createElement(kt.Provider,{value:g},r.createElement(It.Provider,{value:w},f)))}),_r=r.forwardRef((e,t)=>{var n,o;let a=r.useId(),c=r.useRef(null),s=r.useContext(_t),l=oe(),u=Tt(e),i=(o=(n=u.current)==null?void 0:n.forceMount)!=null?o:s==null?void 0:s.forceMount;q(()=>l.item(a,s==null?void 0:s.id),[]);let f=Mt(a,c,[e.value,e.children,c]),m=Fe(),E=B(g=>g.value&&g.value===f.current),b=B(g=>i||l.filter()===!1?!0:g.search?g.filtered.items.get(a)>0:!0);r.useEffect(()=>{let g=c.current;if(!(!g||e.disabled))return g.addEventListener(De,x),()=>g.removeEventListener(De,x)},[b,e.onSelect,e.disabled]);function x(){var g,w;v(),(w=(g=u.current).onSelect)==null||w.call(g,f.current)}function v(){m.setState("value",f.current,!0)}if(!b)return null;let{disabled:$,value:y,onSelect:S,forceMount:O,...R}=e;return r.createElement("div",{ref:ae([c,t]),...R,id:a,"cmdk-item":"",role:"option","aria-disabled":$||void 0,"aria-selected":E||void 0,"data-disabled":$||void 0,"data-selected":E||void 0,onPointerMove:$?void 0:v,onClick:$?void 0:x},e.children)}),Fr=r.forwardRef((e,t)=>{let{heading:n,children:o,forceMount:a,...c}=e,s=r.useId(),l=r.useRef(null),u=r.useRef(null),i=r.useId(),f=oe(),m=B(x=>a||f.filter()===!1?!0:x.search?x.filtered.groups.has(s):!0);q(()=>f.group(s),[]),Mt(s,l,[e.value,e.heading,u]);let E=r.useMemo(()=>({id:s,forceMount:a}),[a]),b=r.createElement(_t.Provider,{value:E},o);return r.createElement("div",{ref:ae([l,t]),...c,"cmdk-group":"",role:"presentation",hidden:m?void 0:!0},n&&r.createElement("div",{ref:u,"cmdk-group-heading":"","aria-hidden":!0,id:i},n),r.createElement("div",{"cmdk-group-items":"",role:"group","aria-labelledby":n?i:void 0},b))}),Tr=r.forwardRef((e,t)=>{let{alwaysRender:n,...o}=e,a=r.useRef(null),c=B(s=>!s.search);return!n&&!c?null:r.createElement("div",{ref:ae([a,t]),...o,"cmdk-separator":"",role:"separator"})}),Mr=r.forwardRef((e,t)=>{let{onValueChange:n,...o}=e,a=e.value!=null,c=Fe(),s=B(f=>f.search),l=B(f=>f.value),u=oe(),i=r.useMemo(()=>{var f;let m=(f=u.commandRef.current)==null?void 0:f.querySelector(`${_e}[${T}="${l}"]`);return m==null?void 0:m.getAttribute("id")},[l,u.commandRef]);return r.useEffect(()=>{e.value!=null&&c.setState("search",e.value)},[e.value]),r.createElement("input",{ref:t,...o,"cmdk-input":"",autoComplete:"off",autoCorrect:"off",spellCheck:!1,"aria-autocomplete":"list",role:"combobox","aria-expanded":!0,"aria-controls":u.listId,"aria-labelledby":u.labelId,"aria-activedescendant":i,id:u.inputId,type:"text",value:a?e.value:s,onChange:f=>{a||c.setState("search",f.target.value),n==null||n(f.target.value)}})}),Lr=r.forwardRef((e,t)=>{let{children:n,...o}=e,a=r.useRef(null),c=r.useRef(null),s=oe();return r.useEffect(()=>{if(c.current&&a.current){let l=c.current,u=a.current,i,f=new ResizeObserver(()=>{i=requestAnimationFrame(()=>{let m=l.offsetHeight;u.style.setProperty("--cmdk-list-height",m.toFixed(1)+"px")})});return f.observe(l),()=>{cancelAnimationFrame(i),f.unobserve(l)}}},[]),r.createElement("div",{ref:ae([a,t]),...o,"cmdk-list":"",role:"listbox","aria-label":"Suggestions",id:s.listId,"aria-labelledby":s.inputId},r.createElement("div",{ref:c,"cmdk-list-sizer":""},n))}),jr=r.forwardRef((e,t)=>{let{open:n,onOpenChange:o,overlayClassName:a,contentClassName:c,container:s,...l}=e;return r.createElement(Sr,{open:n,onOpenChange:o},r.createElement(Or,{container:s},r.createElement(Nr,{"cmdk-overlay":"",className:a}),r.createElement(Dr,{"aria-label":e.label,"cmdk-dialog":"",className:c},r.createElement(Ft,{ref:t,...l}))))}),Ur=r.forwardRef((e,t)=>{let n=r.useRef(!0),o=B(a=>a.filtered.count===0);return r.useEffect(()=>{n.current=!1},[]),n.current||!o?null:r.createElement("div",{ref:t,...e,"cmdk-empty":"",role:"presentation"})}),Br=r.forwardRef((e,t)=>{let{progress:n,children:o,...a}=e;return r.createElement("div",{ref:t,...a,"cmdk-loading":"",role:"progressbar","aria-valuenow":n,"aria-valuemin":0,"aria-valuemax":100,"aria-label":"Loading..."},r.createElement("div",{"aria-hidden":!0},o))}),A=Object.assign(Ft,{List:Lr,Item:_r,Input:Mr,Group:Fr,Separator:Tr,Dialog:jr,Empty:Ur,Loading:Br});function Kr(e,t){let n=e.nextElementSibling;for(;n;){if(n.matches(t))return n;n=n.nextElementSibling}}function Wr(e,t){let n=e.previousElementSibling;for(;n;){if(n.matches(t))return n;n=n.previousElementSibling}}function Tt(e){let t=r.useRef(e);return q(()=>{t.current=e}),t}var q=typeof window>"u"?r.useEffect:r.useLayoutEffect;function G(e){let t=r.useRef();return t.current===void 0&&(t.current=e()),t}function ae(e){return t=>{e.forEach(n=>{typeof n=="function"?n(t):n!=null&&(n.current=t)})}}function B(e){let t=Fe(),n=()=>e(t.snapshot());return r.useSyncExternalStore(t.subscribe,n,n)}function Mt(e,t,n){let o=r.useRef(),a=oe();return q(()=>{var c;let s=(()=>{var l;for(let u of n){if(typeof u=="string")return u.trim().toLowerCase();if(typeof u=="object"&&"current"in u)return u.current?(l=u.current.textContent)==null?void 0:l.trim().toLowerCase():o.current}})();a.value(e,s),(c=t.current)==null||c.setAttribute(T,s),o.current=s}),o}var Vr=()=>{let[e,t]=r.useState(),n=G(()=>new Map);return q(()=>{n.current.forEach(o=>o()),n.current=new Map},[e]),(o,a)=>{n.current.set(o,a),t({})}},Hr={position:"absolute",width:"1px",height:"1px",padding:"0",margin:"-1px",overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",borderWidth:"0"};const zr=r.forwardRef(({className:e,...t},n)=>P.jsx(A,{ref:n,className:K("flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",e),...t}));zr.displayName=A.displayName;const Gr=r.forwardRef(({className:e,...t},n)=>P.jsx("div",{className:"flex items-center border-b dark:border-border px-3","cmdk-input-wrapper":"",children:P.jsx(A.Input,{ref:n,className:K("flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground",e),...t})}));Gr.displayName=A.Input.displayName;const Xr=r.forwardRef(({className:e,...t},n)=>P.jsx(A.List,{ref:n,className:K("max-h-[300px] overflow-y-auto overflow-x-hidden",e),...t}));Xr.displayName=A.List.displayName;const Yr=r.forwardRef((e,t)=>P.jsx(A.Empty,{ref:t,className:"py-6 text-center text-sm",...e}));Yr.displayName=A.Empty.displayName;const qr=r.forwardRef(({className:e,...t},n)=>P.jsx(A.Group,{ref:n,className:K("overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",e),...t}));qr.displayName=A.Group.displayName;const Zr=r.forwardRef(({className:e,...t},n)=>P.jsx(A.Separator,{ref:n,className:K("-mx-1 h-px bg-border",e),...t}));Zr.displayName=A.Separator.displayName;const Qr=r.forwardRef(({className:e,...t},n)=>P.jsx(A.Item,{ref:n,className:K("relative flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground",e),...t}));Qr.displayName=A.Item.displayName;export{zr as C,co as P,so as a,Cn as b,Gr as c,Xr as d,Yr as e,qr as f,Qr as g};
import{r,j as s}from"./app-B8O0964f.js";import{c as me,u as De,d as ve,P as T,a as g,b as oe,f as On}from"./index-GGXSu8f6.js";import{u as $,h as Se,S as Fn,c as A}from"./button-YW7AvVGk.js";import{c as Pe,u as Ne,C as kn}from"./chevron-right-Bcdrrr3U.js";import{a as le,h as Gn,u as Ln,F as Kn,D as $n,R as Un,P as Bn}from"./index-BYucJXNH.js";import{c as Te,A as Vn,C as Yn,a as zn,R as Xn}from"./index-CS2GB-k9.js";import{C as Hn}from"./check-CkFbTOeR.js";var de="rovingFocusGroup.onEntryFocus",Wn={bubbles:!1,cancelable:!0},re="RovingFocusGroup",[fe,Ae,Zn]=Pe(re),[qn,je]=me(re,[Zn]),[Jn,Qn]=qn(re),Oe=r.forwardRef((e,t)=>s.jsx(fe.Provider,{scope:e.__scopeRovingFocusGroup,children:s.jsx(fe.Slot,{scope:e.__scopeRovingFocusGroup,children:s.jsx(et,{...e,ref:t})})}));Oe.displayName=re;var et=r.forwardRef((e,t)=>{const{__scopeRovingFocusGroup:n,orientation:o,loop:a=!1,dir:c,currentTabStopId:i,defaultCurrentTabStopId:d,onCurrentTabStopIdChange:m,onEntryFocus:v,preventScrollOnEntryFocus:f=!1,...u}=e,p=r.useRef(null),M=$(t,p),w=Ne(c),[h=null,y]=De({prop:i,defaultProp:d,onChange:m}),[x,_]=r.useState(!1),P=ve(v),q=Ae(n),U=r.useRef(!1),[J,j]=r.useState(0);return r.useEffect(()=>{const C=p.current;if(C)return C.addEventListener(de,P),()=>C.removeEventListener(de,P)},[P]),s.jsx(Jn,{scope:n,orientation:o,dir:w,loop:a,currentTabStopId:h,onItemFocus:r.useCallback(C=>y(C),[y]),onItemShiftTab:r.useCallback(()=>_(!0),[]),onFocusableItemAdd:r.useCallback(()=>j(C=>C+1),[]),onFocusableItemRemove:r.useCallback(()=>j(C=>C-1),[]),children:s.jsx(T.div,{tabIndex:x||J===0?-1:0,"data-orientation":o,...u,ref:M,style:{outline:"none",...e.style},onMouseDown:g(e.onMouseDown,()=>{U.current=!0}),onFocus:g(e.onFocus,C=>{const G=!U.current;if(C.target===C.currentTarget&&G&&!x){const O=new CustomEvent(de,Wn);if(C.currentTarget.dispatchEvent(O),!O.defaultPrevented){const B=q().filter(D=>D.focusable),V=B.find(D=>D.active),Q=B.find(D=>D.id===h),ce=[V,Q,...B].filter(Boolean).map(D=>D.ref.current);Ge(ce,f)}}U.current=!1}),onBlur:g(e.onBlur,()=>_(!1))})})}),Fe="RovingFocusGroupItem",ke=r.forwardRef((e,t)=>{const{__scopeRovingFocusGroup:n,focusable:o=!0,active:a=!1,tabStopId:c,...i}=e,d=le(),m=c||d,v=Qn(Fe,n),f=v.currentTabStopId===m,u=Ae(n),{onFocusableItemAdd:p,onFocusableItemRemove:M}=v;return r.useEffect(()=>{if(o)return p(),()=>M()},[o,p,M]),s.jsx(fe.ItemSlot,{scope:n,id:m,focusable:o,active:a,children:s.jsx(T.span,{tabIndex:f?0:-1,"data-orientation":v.orientation,...i,ref:t,onMouseDown:g(e.onMouseDown,w=>{o?v.onItemFocus(m):w.preventDefault()}),onFocus:g(e.onFocus,()=>v.onItemFocus(m)),onKeyDown:g(e.onKeyDown,w=>{if(w.key==="Tab"&&w.shiftKey){v.onItemShiftTab();return}if(w.target!==w.currentTarget)return;const h=ot(w,v.orientation,v.dir);if(h!==void 0){if(w.metaKey||w.ctrlKey||w.altKey||w.shiftKey)return;w.preventDefault();let x=u().filter(_=>_.focusable).map(_=>_.ref.current);if(h==="last")x.reverse();else if(h==="prev"||h==="next"){h==="prev"&&x.reverse();const _=x.indexOf(w.currentTarget);x=v.loop?rt(x,_+1):x.slice(_+1)}setTimeout(()=>Ge(x))}})})})});ke.displayName=Fe;var nt={ArrowLeft:"prev",ArrowUp:"prev",ArrowRight:"next",ArrowDown:"next",PageUp:"first",Home:"first",PageDown:"last",End:"last"};function tt(e,t){return t!=="rtl"?e:e==="ArrowLeft"?"ArrowRight":e==="ArrowRight"?"ArrowLeft":e}function ot(e,t,n){const o=tt(e.key,n);if(!(t==="vertical"&&["ArrowLeft","ArrowRight"].includes(o))&&!(t==="horizontal"&&["ArrowUp","ArrowDown"].includes(o)))return nt[o]}function Ge(e,t=!1){const n=document.activeElement;for(const o of e)if(o===n||(o.focus({preventScroll:t}),document.activeElement!==n))return}function rt(e,t){return e.map((n,o)=>e[(t+o)%e.length])}var at=Oe,st=ke,pe=["Enter"," "],ct=["ArrowDown","PageUp","Home"],Le=["ArrowUp","PageDown","End"],ut=[...ct,...Le],it={ltr:[...pe,"ArrowRight"],rtl:[...pe,"ArrowLeft"]},dt={ltr:["ArrowLeft"],rtl:["ArrowRight"]},W="Menu",[X,lt,ft]=Pe(W),[F,Ke]=me(W,[ft,Te,je]),ae=Te(),$e=je(),[pt,k]=F(W),[mt,Z]=F(W),Ue=e=>{const{__scopeMenu:t,open:n=!1,children:o,dir:a,onOpenChange:c,modal:i=!0}=e,d=ae(t),[m,v]=r.useState(null),f=r.useRef(!1),u=ve(c),p=Ne(a);return r.useEffect(()=>{const M=()=>{f.current=!0,document.addEventListener("pointerdown",w,{capture:!0,once:!0}),document.addEventListener("pointermove",w,{capture:!0,once:!0})},w=()=>f.current=!1;return document.addEventListener("keydown",M,{capture:!0}),()=>{document.removeEventListener("keydown",M,{capture:!0}),document.removeEventListener("pointerdown",w,{capture:!0}),document.removeEventListener("pointermove",w,{capture:!0})}},[]),s.jsx(Xn,{...d,children:s.jsx(pt,{scope:t,open:n,onOpenChange:u,content:m,onContentChange:v,children:s.jsx(mt,{scope:t,onClose:r.useCallback(()=>u(!1),[u]),isUsingKeyboardRef:f,dir:p,modal:i,children:o})})})};Ue.displayName=W;var vt="MenuAnchor",we=r.forwardRef((e,t)=>{const{__scopeMenu:n,...o}=e,a=ae(n);return s.jsx(Vn,{...a,...o,ref:t})});we.displayName=vt;var ge="MenuPortal",[wt,Be]=F(ge,{forceMount:void 0}),Ve=e=>{const{__scopeMenu:t,forceMount:n,children:o,container:a}=e,c=k(ge,t);return s.jsx(wt,{scope:t,forceMount:n,children:s.jsx(oe,{present:n||c.open,children:s.jsx(Bn,{asChild:!0,container:a,children:o})})})};Ve.displayName=ge;var I="MenuContent",[gt,Me]=F(I),Ye=r.forwardRef((e,t)=>{const n=Be(I,e.__scopeMenu),{forceMount:o=n.forceMount,...a}=e,c=k(I,e.__scopeMenu),i=Z(I,e.__scopeMenu);return s.jsx(X.Provider,{scope:e.__scopeMenu,children:s.jsx(oe,{present:o||c.open,children:s.jsx(X.Slot,{scope:e.__scopeMenu,children:i.modal?s.jsx(Mt,{...a,ref:t}):s.jsx(ht,{...a,ref:t})})})})}),Mt=r.forwardRef((e,t)=>{const n=k(I,e.__scopeMenu),o=r.useRef(null),a=$(t,o);return r.useEffect(()=>{const c=o.current;if(c)return Gn(c)},[]),s.jsx(he,{...e,ref:a,trapFocus:n.open,disableOutsidePointerEvents:n.open,disableOutsideScroll:!0,onFocusOutside:g(e.onFocusOutside,c=>c.preventDefault(),{checkForDefaultPrevented:!1}),onDismiss:()=>n.onOpenChange(!1)})}),ht=r.forwardRef((e,t)=>{const n=k(I,e.__scopeMenu);return s.jsx(he,{...e,ref:t,trapFocus:!1,disableOutsidePointerEvents:!1,disableOutsideScroll:!1,onDismiss:()=>n.onOpenChange(!1)})}),he=r.forwardRef((e,t)=>{const{__scopeMenu:n,loop:o=!1,trapFocus:a,onOpenAutoFocus:c,onCloseAutoFocus:i,disableOutsidePointerEvents:d,onEntryFocus:m,onEscapeKeyDown:v,onPointerDownOutside:f,onFocusOutside:u,onInteractOutside:p,onDismiss:M,disableOutsideScroll:w,...h}=e,y=k(I,n),x=Z(I,n),_=ae(n),P=$e(n),q=lt(n),[U,J]=r.useState(null),j=r.useRef(null),C=$(t,j,y.onContentChange),G=r.useRef(0),O=r.useRef(""),B=r.useRef(0),V=r.useRef(null),Q=r.useRef("right"),ee=r.useRef(0),ce=w?Un:r.Fragment,D=w?{as:Fn,allowPinchZoom:!0}:void 0,jn=l=>{var K,Ie;const b=O.current+l,E=q().filter(S=>!S.disabled),N=document.activeElement,ue=(K=E.find(S=>S.ref.current===N))==null?void 0:K.textValue,ie=E.map(S=>S.textValue),be=Nt(ie,b,ue),Y=(Ie=E.find(S=>S.textValue===be))==null?void 0:Ie.ref.current;(function S(ye){O.current=ye,window.clearTimeout(G.current),ye!==""&&(G.current=window.setTimeout(()=>S(""),1e3))})(b),Y&&setTimeout(()=>Y.focus())};r.useEffect(()=>()=>window.clearTimeout(G.current),[]),Ln();const L=r.useCallback(l=>{var E,N;return Q.current===((E=V.current)==null?void 0:E.side)&&At(l,(N=V.current)==null?void 0:N.area)},[]);return s.jsx(gt,{scope:n,searchRef:O,onItemEnter:r.useCallback(l=>{L(l)&&l.preventDefault()},[L]),onItemLeave:r.useCallback(l=>{var b;L(l)||((b=j.current)==null||b.focus(),J(null))},[L]),onTriggerLeave:r.useCallback(l=>{L(l)&&l.preventDefault()},[L]),pointerGraceTimerRef:B,onPointerGraceIntentChange:r.useCallback(l=>{V.current=l},[]),children:s.jsx(ce,{...D,children:s.jsx(Kn,{asChild:!0,trapped:a,onMountAutoFocus:g(c,l=>{var b;l.preventDefault(),(b=j.current)==null||b.focus({preventScroll:!0})}),onUnmountAutoFocus:i,children:s.jsx($n,{asChild:!0,disableOutsidePointerEvents:d,onEscapeKeyDown:v,onPointerDownOutside:f,onFocusOutside:u,onInteractOutside:p,onDismiss:M,children:s.jsx(at,{asChild:!0,...P,dir:x.dir,orientation:"vertical",loop:o,currentTabStopId:U,onCurrentTabStopIdChange:J,onEntryFocus:g(m,l=>{x.isUsingKeyboardRef.current||l.preventDefault()}),preventScrollOnEntryFocus:!0,children:s.jsx(Yn,{role:"menu","aria-orientation":"vertical","data-state":cn(y.open),"data-radix-menu-content":"",dir:x.dir,..._,...h,ref:C,style:{outline:"none",...h.style},onKeyDown:g(h.onKeyDown,l=>{const E=l.target.closest("[data-radix-menu-content]")===l.currentTarget,N=l.ctrlKey||l.altKey||l.metaKey,ue=l.key.length===1;E&&(l.key==="Tab"&&l.preventDefault(),!N&&ue&&jn(l.key));const ie=j.current;if(l.target!==ie||!ut.includes(l.key))return;l.preventDefault();const Y=q().filter(K=>!K.disabled).map(K=>K.ref.current);Le.includes(l.key)&&Y.reverse(),St(Y)}),onBlur:g(e.onBlur,l=>{l.currentTarget.contains(l.target)||(window.clearTimeout(G.current),O.current="")}),onPointerMove:g(e.onPointerMove,H(l=>{const b=l.target,E=ee.current!==l.clientX;if(l.currentTarget.contains(b)&&E){const N=l.clientX>ee.current?"right":"left";Q.current=N,ee.current=l.clientX}}))})})})})})})});Ye.displayName=I;var xt="MenuGroup",xe=r.forwardRef((e,t)=>{const{__scopeMenu:n,...o}=e;return s.jsx(T.div,{role:"group",...o,ref:t})});xe.displayName=xt;var Ct="MenuLabel",ze=r.forwardRef((e,t)=>{const{__scopeMenu:n,...o}=e;return s.jsx(T.div,{...o,ref:t})});ze.displayName=Ct;var ne="MenuItem",Ee="menu.itemSelect",se=r.forwardRef((e,t)=>{const{disabled:n=!1,onSelect:o,...a}=e,c=r.useRef(null),i=Z(ne,e.__scopeMenu),d=Me(ne,e.__scopeMenu),m=$(t,c),v=r.useRef(!1),f=()=>{const u=c.current;if(!n&&u){const p=new CustomEvent(Ee,{bubbles:!0,cancelable:!0});u.addEventListener(Ee,M=>o==null?void 0:o(M),{once:!0}),On(u,p),p.defaultPrevented?v.current=!1:i.onClose()}};return s.jsx(Xe,{...a,ref:m,disabled:n,onClick:g(e.onClick,f),onPointerDown:u=>{var p;(p=e.onPointerDown)==null||p.call(e,u),v.current=!0},onPointerUp:g(e.onPointerUp,u=>{var p;v.current||(p=u.currentTarget)==null||p.click()}),onKeyDown:g(e.onKeyDown,u=>{const p=d.searchRef.current!=="";n||p&&u.key===" "||pe.includes(u.key)&&(u.currentTarget.click(),u.preventDefault())})})});se.displayName=ne;var Xe=r.forwardRef((e,t)=>{const{__scopeMenu:n,disabled:o=!1,textValue:a,...c}=e,i=Me(ne,n),d=$e(n),m=r.useRef(null),v=$(t,m),[f,u]=r.useState(!1),[p,M]=r.useState("");return r.useEffect(()=>{const w=m.current;w&&M((w.textContent??"").trim())},[c.children]),s.jsx(X.ItemSlot,{scope:n,disabled:o,textValue:a??p,children:s.jsx(st,{asChild:!0,...d,focusable:!o,children:s.jsx(T.div,{role:"menuitem","data-highlighted":f?"":void 0,"aria-disabled":o||void 0,"data-disabled":o?"":void 0,...c,ref:v,onPointerMove:g(e.onPointerMove,H(w=>{o?i.onItemLeave(w):(i.onItemEnter(w),w.defaultPrevented||w.currentTarget.focus({preventScroll:!0}))})),onPointerLeave:g(e.onPointerLeave,H(w=>i.onItemLeave(w))),onFocus:g(e.onFocus,()=>u(!0)),onBlur:g(e.onBlur,()=>u(!1))})})})}),Rt="MenuCheckboxItem",He=r.forwardRef((e,t)=>{const{checked:n=!1,onCheckedChange:o,...a}=e;return s.jsx(Qe,{scope:e.__scopeMenu,checked:n,children:s.jsx(se,{role:"menuitemcheckbox","aria-checked":te(n)?"mixed":n,...a,ref:t,"data-state":Re(n),onSelect:g(a.onSelect,()=>o==null?void 0:o(te(n)?!0:!n),{checkForDefaultPrevented:!1})})})});He.displayName=Rt;var We="MenuRadioGroup",[_t,bt]=F(We,{value:void 0,onValueChange:()=>{}}),Ze=r.forwardRef((e,t)=>{const{value:n,onValueChange:o,...a}=e,c=ve(o);return s.jsx(_t,{scope:e.__scopeMenu,value:n,onValueChange:c,children:s.jsx(xe,{...a,ref:t})})});Ze.displayName=We;var qe="MenuRadioItem",Je=r.forwardRef((e,t)=>{const{value:n,...o}=e,a=bt(qe,e.__scopeMenu),c=n===a.value;return s.jsx(Qe,{scope:e.__scopeMenu,checked:c,children:s.jsx(se,{role:"menuitemradio","aria-checked":c,...o,ref:t,"data-state":Re(c),onSelect:g(o.onSelect,()=>{var i;return(i=a.onValueChange)==null?void 0:i.call(a,n)},{checkForDefaultPrevented:!1})})})});Je.displayName=qe;var Ce="MenuItemIndicator",[Qe,It]=F(Ce,{checked:!1}),en=r.forwardRef((e,t)=>{const{__scopeMenu:n,forceMount:o,...a}=e,c=It(Ce,n);return s.jsx(oe,{present:o||te(c.checked)||c.checked===!0,children:s.jsx(T.span,{...a,ref:t,"data-state":Re(c.checked)})})});en.displayName=Ce;var yt="MenuSeparator",nn=r.forwardRef((e,t)=>{const{__scopeMenu:n,...o}=e;return s.jsx(T.div,{role:"separator","aria-orientation":"horizontal",...o,ref:t})});nn.displayName=yt;var Et="MenuArrow",tn=r.forwardRef((e,t)=>{const{__scopeMenu:n,...o}=e,a=ae(n);return s.jsx(zn,{...a,...o,ref:t})});tn.displayName=Et;var Dt="MenuSub",[No,on]=F(Dt),z="MenuSubTrigger",rn=r.forwardRef((e,t)=>{const n=k(z,e.__scopeMenu),o=Z(z,e.__scopeMenu),a=on(z,e.__scopeMenu),c=Me(z,e.__scopeMenu),i=r.useRef(null),{pointerGraceTimerRef:d,onPointerGraceIntentChange:m}=c,v={__scopeMenu:e.__scopeMenu},f=r.useCallback(()=>{i.current&&window.clearTimeout(i.current),i.current=null},[]);return r.useEffect(()=>f,[f]),r.useEffect(()=>{const u=d.current;return()=>{window.clearTimeout(u),m(null)}},[d,m]),s.jsx(we,{asChild:!0,...v,children:s.jsx(Xe,{id:a.triggerId,"aria-haspopup":"menu","aria-expanded":n.open,"aria-controls":a.contentId,"data-state":cn(n.open),...e,ref:Se(t,a.onTriggerChange),onClick:u=>{var p;(p=e.onClick)==null||p.call(e,u),!(e.disabled||u.defaultPrevented)&&(u.currentTarget.focus(),n.open||n.onOpenChange(!0))},onPointerMove:g(e.onPointerMove,H(u=>{c.onItemEnter(u),!u.defaultPrevented&&!e.disabled&&!n.open&&!i.current&&(c.onPointerGraceIntentChange(null),i.current=window.setTimeout(()=>{n.onOpenChange(!0),f()},100))})),onPointerLeave:g(e.onPointerLeave,H(u=>{var M,w;f();const p=(M=n.content)==null?void 0:M.getBoundingClientRect();if(p){const h=(w=n.content)==null?void 0:w.dataset.side,y=h==="right",x=y?-5:5,_=p[y?"left":"right"],P=p[y?"right":"left"];c.onPointerGraceIntentChange({area:[{x:u.clientX+x,y:u.clientY},{x:_,y:p.top},{x:P,y:p.top},{x:P,y:p.bottom},{x:_,y:p.bottom}],side:h}),window.clearTimeout(d.current),d.current=window.setTimeout(()=>c.onPointerGraceIntentChange(null),300)}else{if(c.onTriggerLeave(u),u.defaultPrevented)return;c.onPointerGraceIntentChange(null)}})),onKeyDown:g(e.onKeyDown,u=>{var M;const p=c.searchRef.current!=="";e.disabled||p&&u.key===" "||it[o.dir].includes(u.key)&&(n.onOpenChange(!0),(M=n.content)==null||M.focus(),u.preventDefault())})})})});rn.displayName=z;var an="MenuSubContent",sn=r.forwardRef((e,t)=>{const n=Be(I,e.__scopeMenu),{forceMount:o=n.forceMount,...a}=e,c=k(I,e.__scopeMenu),i=Z(I,e.__scopeMenu),d=on(an,e.__scopeMenu),m=r.useRef(null),v=$(t,m);return s.jsx(X.Provider,{scope:e.__scopeMenu,children:s.jsx(oe,{present:o||c.open,children:s.jsx(X.Slot,{scope:e.__scopeMenu,children:s.jsx(he,{id:d.contentId,"aria-labelledby":d.triggerId,...a,ref:v,align:"start",side:i.dir==="rtl"?"left":"right",disableOutsidePointerEvents:!1,disableOutsideScroll:!1,trapFocus:!1,onOpenAutoFocus:f=>{var u;i.isUsingKeyboardRef.current&&((u=m.current)==null||u.focus()),f.preventDefault()},onCloseAutoFocus:f=>f.preventDefault(),onFocusOutside:g(e.onFocusOutside,f=>{f.target!==d.trigger&&c.onOpenChange(!1)}),onEscapeKeyDown:g(e.onEscapeKeyDown,f=>{i.onClose(),f.preventDefault()}),onKeyDown:g(e.onKeyDown,f=>{var M;const u=f.currentTarget.contains(f.target),p=dt[i.dir].includes(f.key);u&&p&&(c.onOpenChange(!1),(M=d.trigger)==null||M.focus(),f.preventDefault())})})})})})});sn.displayName=an;function cn(e){return e?"open":"closed"}function te(e){return e==="indeterminate"}function Re(e){return te(e)?"indeterminate":e?"checked":"unchecked"}function St(e){const t=document.activeElement;for(const n of e)if(n===t||(n.focus(),document.activeElement!==t))return}function Pt(e,t){return e.map((n,o)=>e[(t+o)%e.length])}function Nt(e,t,n){const a=t.length>1&&Array.from(t).every(v=>v===t[0])?t[0]:t,c=n?e.indexOf(n):-1;let i=Pt(e,Math.max(c,0));a.length===1&&(i=i.filter(v=>v!==n));const m=i.find(v=>v.toLowerCase().startsWith(a.toLowerCase()));return m!==n?m:void 0}function Tt(e,t){const{x:n,y:o}=e;let a=!1;for(let c=0,i=t.length-1;c<t.length;i=c++){const d=t[c].x,m=t[c].y,v=t[i].x,f=t[i].y;m>o!=f>o&&n<(v-d)*(o-m)/(f-m)+d&&(a=!a)}return a}function At(e,t){if(!t)return!1;const n={x:e.clientX,y:e.clientY};return Tt(n,t)}function H(e){return t=>t.pointerType==="mouse"?e(t):void 0}var jt=Ue,Ot=we,Ft=Ve,kt=Ye,Gt=xe,Lt=ze,Kt=se,$t=He,Ut=Ze,Bt=Je,Vt=en,Yt=nn,zt=tn,Xt=rn,Ht=sn,_e="DropdownMenu",[Wt,To]=me(_e,[Ke]),R=Ke(),[Zt,un]=Wt(_e),dn=e=>{const{__scopeDropdownMenu:t,children:n,dir:o,open:a,defaultOpen:c,onOpenChange:i,modal:d=!0}=e,m=R(t),v=r.useRef(null),[f=!1,u]=De({prop:a,defaultProp:c,onChange:i});return s.jsx(Zt,{scope:t,triggerId:le(),triggerRef:v,contentId:le(),open:f,onOpenChange:u,onOpenToggle:r.useCallback(()=>u(p=>!p),[u]),modal:d,children:s.jsx(jt,{...m,open:f,onOpenChange:u,dir:o,modal:d,children:n})})};dn.displayName=_e;var ln="DropdownMenuTrigger",fn=r.forwardRef((e,t)=>{const{__scopeDropdownMenu:n,disabled:o=!1,...a}=e,c=un(ln,n),i=R(n);return s.jsx(Ot,{asChild:!0,...i,children:s.jsx(T.button,{type:"button",id:c.triggerId,"aria-haspopup":"menu","aria-expanded":c.open,"aria-controls":c.open?c.contentId:void 0,"data-state":c.open?"open":"closed","data-disabled":o?"":void 0,disabled:o,...a,ref:Se(t,c.triggerRef),onPointerDown:g(e.onPointerDown,d=>{!o&&d.button===0&&d.ctrlKey===!1&&(c.onOpenToggle(),c.open||d.preventDefault())}),onKeyDown:g(e.onKeyDown,d=>{o||(["Enter"," "].includes(d.key)&&c.onOpenToggle(),d.key==="ArrowDown"&&c.onOpenChange(!0),["Enter"," ","ArrowDown"].includes(d.key)&&d.preventDefault())})})})});fn.displayName=ln;var qt="DropdownMenuPortal",pn=e=>{const{__scopeDropdownMenu:t,...n}=e,o=R(t);return s.jsx(Ft,{...o,...n})};pn.displayName=qt;var mn="DropdownMenuContent",vn=r.forwardRef((e,t)=>{const{__scopeDropdownMenu:n,...o}=e,a=un(mn,n),c=R(n),i=r.useRef(!1);return s.jsx(kt,{id:a.contentId,"aria-labelledby":a.triggerId,...c,...o,ref:t,onCloseAutoFocus:g(e.onCloseAutoFocus,d=>{var m;i.current||(m=a.triggerRef.current)==null||m.focus(),i.current=!1,d.preventDefault()}),onInteractOutside:g(e.onInteractOutside,d=>{const m=d.detail.originalEvent,v=m.button===0&&m.ctrlKey===!0,f=m.button===2||v;(!a.modal||f)&&(i.current=!0)}),style:{...e.style,"--radix-dropdown-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-dropdown-menu-content-available-width":"var(--radix-popper-available-width)","--radix-dropdown-menu-content-available-height":"var(--radix-popper-available-height)","--radix-dropdown-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-dropdown-menu-trigger-height":"var(--radix-popper-anchor-height)"}})});vn.displayName=mn;var Jt="DropdownMenuGroup",wn=r.forwardRef((e,t)=>{const{__scopeDropdownMenu:n,...o}=e,a=R(n);return s.jsx(Gt,{...a,...o,ref:t})});wn.displayName=Jt;var Qt="DropdownMenuLabel",gn=r.forwardRef((e,t)=>{const{__scopeDropdownMenu:n,...o}=e,a=R(n);return s.jsx(Lt,{...a,...o,ref:t})});gn.displayName=Qt;var eo="DropdownMenuItem",Mn=r.forwardRef((e,t)=>{const{__scopeDropdownMenu:n,...o}=e,a=R(n);return s.jsx(Kt,{...a,...o,ref:t})});Mn.displayName=eo;var no="DropdownMenuCheckboxItem",hn=r.forwardRef((e,t)=>{const{__scopeDropdownMenu:n,...o}=e,a=R(n);return s.jsx($t,{...a,...o,ref:t})});hn.displayName=no;var to="DropdownMenuRadioGroup",oo=r.forwardRef((e,t)=>{const{__scopeDropdownMenu:n,...o}=e,a=R(n);return s.jsx(Ut,{...a,...o,ref:t})});oo.displayName=to;var ro="DropdownMenuRadioItem",xn=r.forwardRef((e,t)=>{const{__scopeDropdownMenu:n,...o}=e,a=R(n);return s.jsx(Bt,{...a,...o,ref:t})});xn.displayName=ro;var ao="DropdownMenuItemIndicator",Cn=r.forwardRef((e,t)=>{const{__scopeDropdownMenu:n,...o}=e,a=R(n);return s.jsx(Vt,{...a,...o,ref:t})});Cn.displayName=ao;var so="DropdownMenuSeparator",Rn=r.forwardRef((e,t)=>{const{__scopeDropdownMenu:n,...o}=e,a=R(n);return s.jsx(Yt,{...a,...o,ref:t})});Rn.displayName=so;var co="DropdownMenuArrow",uo=r.forwardRef((e,t)=>{const{__scopeDropdownMenu:n,...o}=e,a=R(n);return s.jsx(zt,{...a,...o,ref:t})});uo.displayName=co;var io="DropdownMenuSubTrigger",_n=r.forwardRef((e,t)=>{const{__scopeDropdownMenu:n,...o}=e,a=R(n);return s.jsx(Xt,{...a,...o,ref:t})});_n.displayName=io;var lo="DropdownMenuSubContent",bn=r.forwardRef((e,t)=>{const{__scopeDropdownMenu:n,...o}=e,a=R(n);return s.jsx(Ht,{...a,...o,ref:t,style:{...e.style,"--radix-dropdown-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-dropdown-menu-content-available-width":"var(--radix-popper-available-width)","--radix-dropdown-menu-content-available-height":"var(--radix-popper-available-height)","--radix-dropdown-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-dropdown-menu-trigger-height":"var(--radix-popper-anchor-height)"}})});bn.displayName=lo;var fo=dn,po=fn,mo=pn,In=vn,vo=wn,yn=gn,En=Mn,Dn=hn,Sn=xn,Pn=Cn,Nn=Rn,Tn=_n,An=bn;const Ao=fo,jo=po,Oo=vo,wo=r.forwardRef(({className:e,inset:t,children:n,...o},a)=>s.jsxs(Tn,{ref:a,className:A("flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",t&&"pl-8",e),...o,children:[n,s.jsx(kn,{className:"ml-auto h-4 w-4"})]}));wo.displayName=Tn.displayName;const go=r.forwardRef(({className:e,...t},n)=>s.jsx(An,{ref:n,className:A("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",e),...t}));go.displayName=An.displayName;const Mo=r.forwardRef(({className:e,sideOffset:t=4,...n},o)=>s.jsx(mo,{children:s.jsx(In,{ref:o,sideOffset:t,className:A("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md","data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",e),...n})}));Mo.displayName=In.displayName;const ho=r.forwardRef(({className:e,inset:t,...n},o)=>s.jsx(En,{ref:o,className:A("relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer",t&&"pl-8",e),...n}));ho.displayName=En.displayName;const xo=r.forwardRef(({className:e,children:t,checked:n,...o},a)=>s.jsxs(Dn,{ref:a,className:A("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",e),checked:n,...o,children:[s.jsx("span",{className:"absolute left-2 flex h-3.5 w-3.5 items-center justify-center",children:s.jsx(Pn,{children:s.jsx(Hn,{className:"h-4 w-4"})})}),t]}));xo.displayName=Dn.displayName;const Co=r.forwardRef(({className:e,children:t,...n},o)=>s.jsxs(Sn,{ref:o,className:A("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",e),...n,children:[s.jsx("span",{className:"absolute left-2 flex h-3.5 w-3.5 items-center justify-center",children:s.jsx(Pn,{})}),t]}));Co.displayName=Sn.displayName;const Ro=r.forwardRef(({className:e,inset:t,...n},o)=>s.jsx(yn,{ref:o,className:A("px-2 py-1.5 text-sm font-semibold",t&&"pl-8",e),...n}));Ro.displayName=yn.displayName;const _o=r.forwardRef(({className:e,...t},n)=>s.jsx(Nn,{ref:n,className:A("-mx-1 my-1 h-px bg-muted",e),...t}));_o.displayName=Nn.displayName;export{Ao as D,jo as a,Mo as b,Ro as c,ho as d,xo as e,_o as f,Oo as g};

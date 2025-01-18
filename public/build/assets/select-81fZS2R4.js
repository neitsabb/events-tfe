import{r as o,j as r,b as Pe}from"./app-BSg7tcV-.js";import{c as ht,a as R,d as U,b as vt,u as Te}from"./index-B6FVuNCK.js";import{c as gt,u as xt}from"./index-DxOe1-pG.js";import{u as L,S as St,c as K}from"./utils-B0fn8ihL.js";import{o as wt,q as yt,p as Ct,F as It,r as bt,P as Tt}from"./dialog-BHgiNgJn.js";import{u as Ie}from"./index-Ds_mV5rb.js";import{c as Re,A as Nt,C as Pt,a as Rt,R as Et}from"./index-DYbuBnVH.js";import{P as j}from"./index-Dhe9Iuj7.js";import{u as _t,C as jt}from"./index-jbec320_.js";import{C as Mt}from"./react-icons.esm-CCC4ONUB.js";import{c as Ee}from"./createLucideIcon-Dgyn1mPU.js";/**
 * @license lucide-react v0.419.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const At=Ee("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.419.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ot=Ee("ChevronUp",[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]]);function Ne(t,[n,e]){return Math.min(e,Math.max(n,t))}var Dt="VisuallyHidden",_e=o.forwardRef((t,n)=>r.jsx(j.span,{...t,ref:n,style:{position:"absolute",border:0,width:1,height:1,padding:0,margin:-1,overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",wordWrap:"normal",...t.style}}));_e.displayName=Dt;var Lt=[" ","Enter","ArrowUp","ArrowDown"],kt=[" ","Enter"],se="Select",[ie,de,Vt]=gt(se),[te,To]=ht(se,[Vt,Re]),pe=Re(),[Bt,$]=te(se),[Ht,Ft]=te(se),je=t=>{const{__scopeSelect:n,children:e,open:a,defaultOpen:l,onOpenChange:d,value:i,defaultValue:c,onValueChange:s,dir:p,name:g,autoComplete:y,disabled:N,required:T}=t,m=pe(n),[v,I]=o.useState(null),[h,u]=o.useState(null),[x,B]=o.useState(!1),A=xt(p),[oe=!1,E]=Te({prop:a,defaultProp:l,onChange:d}),[M,z]=Te({prop:i,defaultProp:c,onChange:s}),J=o.useRef(null),q=v?!!v.closest("form"):!0,[O,H]=o.useState(new Set),F=Array.from(O).map(P=>P.props.value).join(";");return r.jsx(Et,{...m,children:r.jsxs(Bt,{required:T,scope:n,trigger:v,onTriggerChange:I,valueNode:h,onValueNodeChange:u,valueNodeHasChildren:x,onValueNodeHasChildrenChange:B,contentId:Ie(),value:M,onValueChange:z,open:oe,onOpenChange:E,dir:A,triggerPointerDownPosRef:J,disabled:N,children:[r.jsx(ie.Provider,{scope:n,children:r.jsx(Ht,{scope:t.__scopeSelect,onNativeOptionAdd:o.useCallback(P=>{H(D=>new Set(D).add(P))},[]),onNativeOptionRemove:o.useCallback(P=>{H(D=>{const k=new Set(D);return k.delete(P),k})},[]),children:e})}),q?r.jsxs(nt,{"aria-hidden":!0,required:T,tabIndex:-1,name:g,autoComplete:y,value:M,onChange:P=>z(P.target.value),disabled:N,children:[M===void 0?r.jsx("option",{value:""}):null,Array.from(O)]},F):null]})})};je.displayName=se;var Me="SelectTrigger",Ae=o.forwardRef((t,n)=>{const{__scopeSelect:e,disabled:a=!1,...l}=t,d=pe(e),i=$(Me,e),c=i.disabled||a,s=L(n,i.onTriggerChange),p=de(e),[g,y,N]=rt(m=>{const v=p().filter(u=>!u.disabled),I=v.find(u=>u.value===i.value),h=st(v,m,I);h!==void 0&&i.onValueChange(h.value)}),T=()=>{c||(i.onOpenChange(!0),N())};return r.jsx(Nt,{asChild:!0,...d,children:r.jsx(j.button,{type:"button",role:"combobox","aria-controls":i.contentId,"aria-expanded":i.open,"aria-required":i.required,"aria-autocomplete":"none",dir:i.dir,"data-state":i.open?"open":"closed",disabled:c,"data-disabled":c?"":void 0,"data-placeholder":ot(i.value)?"":void 0,...l,ref:s,onClick:R(l.onClick,m=>{m.currentTarget.focus()}),onPointerDown:R(l.onPointerDown,m=>{const v=m.target;v.hasPointerCapture(m.pointerId)&&v.releasePointerCapture(m.pointerId),m.button===0&&m.ctrlKey===!1&&(T(),i.triggerPointerDownPosRef.current={x:Math.round(m.pageX),y:Math.round(m.pageY)},m.preventDefault())}),onKeyDown:R(l.onKeyDown,m=>{const v=g.current!=="";!(m.ctrlKey||m.altKey||m.metaKey)&&m.key.length===1&&y(m.key),!(v&&m.key===" ")&&Lt.includes(m.key)&&(T(),m.preventDefault())})})})});Ae.displayName=Me;var Oe="SelectValue",De=o.forwardRef((t,n)=>{const{__scopeSelect:e,className:a,style:l,children:d,placeholder:i="",...c}=t,s=$(Oe,e),{onValueNodeHasChildrenChange:p}=s,g=d!==void 0,y=L(n,s.onValueNodeChange);return U(()=>{p(g)},[p,g]),r.jsx(j.span,{...c,ref:y,style:{pointerEvents:"none"},children:ot(s.value)?r.jsx(r.Fragment,{children:i}):d})});De.displayName=Oe;var Wt="SelectIcon",Le=o.forwardRef((t,n)=>{const{__scopeSelect:e,children:a,...l}=t;return r.jsx(j.span,{"aria-hidden":!0,...l,ref:n,children:a||"▼"})});Le.displayName=Wt;var Ut="SelectPortal",ke=t=>r.jsx(Tt,{asChild:!0,...t});ke.displayName=Ut;var Z="SelectContent",Ve=o.forwardRef((t,n)=>{const e=$(Z,t.__scopeSelect),[a,l]=o.useState();if(U(()=>{l(new DocumentFragment)},[]),!e.open){const d=a;return d?Pe.createPortal(r.jsx(Be,{scope:t.__scopeSelect,children:r.jsx(ie.Slot,{scope:t.__scopeSelect,children:r.jsx("div",{children:t.children})})}),d):null}return r.jsx(He,{...t,ref:n})});Ve.displayName=Z;var V=10,[Be,G]=te(Z),Kt="SelectContentImpl",He=o.forwardRef((t,n)=>{const{__scopeSelect:e,position:a="item-aligned",onCloseAutoFocus:l,onEscapeKeyDown:d,onPointerDownOutside:i,side:c,sideOffset:s,align:p,alignOffset:g,arrowPadding:y,collisionBoundary:N,collisionPadding:T,sticky:m,hideWhenDetached:v,avoidCollisions:I,...h}=t,u=$(Z,e),[x,B]=o.useState(null),[A,oe]=o.useState(null),E=L(n,f=>B(f)),[M,z]=o.useState(null),[J,q]=o.useState(null),O=de(e),[H,F]=o.useState(!1),P=o.useRef(!1);o.useEffect(()=>{if(x)return wt(x)},[x]),yt();const D=o.useCallback(f=>{const[b,..._]=O().map(w=>w.ref.current),[C]=_.slice(-1),S=document.activeElement;for(const w of f)if(w===S||(w==null||w.scrollIntoView({block:"nearest"}),w===b&&A&&(A.scrollTop=0),w===C&&A&&(A.scrollTop=A.scrollHeight),w==null||w.focus(),document.activeElement!==S))return},[O,A]),k=o.useCallback(()=>D([M,x]),[D,M,x]);o.useEffect(()=>{H&&k()},[H,k]);const{onOpenChange:Q,triggerPointerDownPosRef:W}=u;o.useEffect(()=>{if(x){let f={x:0,y:0};const b=C=>{var S,w;f={x:Math.abs(Math.round(C.pageX)-(((S=W.current)==null?void 0:S.x)??0)),y:Math.abs(Math.round(C.pageY)-(((w=W.current)==null?void 0:w.y)??0))}},_=C=>{f.x<=10&&f.y<=10?C.preventDefault():x.contains(C.target)||Q(!1),document.removeEventListener("pointermove",b),W.current=null};return W.current!==null&&(document.addEventListener("pointermove",b),document.addEventListener("pointerup",_,{capture:!0,once:!0})),()=>{document.removeEventListener("pointermove",b),document.removeEventListener("pointerup",_,{capture:!0})}}},[x,Q,W]),o.useEffect(()=>{const f=()=>Q(!1);return window.addEventListener("blur",f),window.addEventListener("resize",f),()=>{window.removeEventListener("blur",f),window.removeEventListener("resize",f)}},[Q]);const[ue,ae]=rt(f=>{const b=O().filter(S=>!S.disabled),_=b.find(S=>S.ref.current===document.activeElement),C=st(b,f,_);C&&setTimeout(()=>C.ref.current.focus())}),fe=o.useCallback((f,b,_)=>{const C=!P.current&&!_;(u.value!==void 0&&u.value===b||C)&&(z(f),C&&(P.current=!0))},[u.value]),me=o.useCallback(()=>x==null?void 0:x.focus(),[x]),ee=o.useCallback((f,b,_)=>{const C=!P.current&&!_;(u.value!==void 0&&u.value===b||C)&&q(f)},[u.value]),le=a==="popper"?xe:Fe,ne=le===xe?{side:c,sideOffset:s,align:p,alignOffset:g,arrowPadding:y,collisionBoundary:N,collisionPadding:T,sticky:m,hideWhenDetached:v,avoidCollisions:I}:{};return r.jsx(Be,{scope:e,content:x,viewport:A,onViewportChange:oe,itemRefCallback:fe,selectedItem:M,onItemLeave:me,itemTextRefCallback:ee,focusSelectedItem:k,selectedItemText:J,position:a,isPositioned:H,searchRef:ue,children:r.jsx(Ct,{as:St,allowPinchZoom:!0,children:r.jsx(It,{asChild:!0,trapped:u.open,onMountAutoFocus:f=>{f.preventDefault()},onUnmountAutoFocus:R(l,f=>{var b;(b=u.trigger)==null||b.focus({preventScroll:!0}),f.preventDefault()}),children:r.jsx(bt,{asChild:!0,disableOutsidePointerEvents:!0,onEscapeKeyDown:d,onPointerDownOutside:i,onFocusOutside:f=>f.preventDefault(),onDismiss:()=>u.onOpenChange(!1),children:r.jsx(le,{role:"listbox",id:u.contentId,"data-state":u.open?"open":"closed",dir:u.dir,onContextMenu:f=>f.preventDefault(),...h,...ne,onPlaced:()=>F(!0),ref:E,style:{display:"flex",flexDirection:"column",outline:"none",...h.style},onKeyDown:R(h.onKeyDown,f=>{const b=f.ctrlKey||f.altKey||f.metaKey;if(f.key==="Tab"&&f.preventDefault(),!b&&f.key.length===1&&ae(f.key),["ArrowUp","ArrowDown","Home","End"].includes(f.key)){let C=O().filter(S=>!S.disabled).map(S=>S.ref.current);if(["ArrowUp","End"].includes(f.key)&&(C=C.slice().reverse()),["ArrowUp","ArrowDown"].includes(f.key)){const S=f.target,w=C.indexOf(S);C=C.slice(w+1)}setTimeout(()=>D(C)),f.preventDefault()}})})})})})})});He.displayName=Kt;var $t="SelectItemAlignedPosition",Fe=o.forwardRef((t,n)=>{const{__scopeSelect:e,onPlaced:a,...l}=t,d=$(Z,e),i=G(Z,e),[c,s]=o.useState(null),[p,g]=o.useState(null),y=L(n,E=>g(E)),N=de(e),T=o.useRef(!1),m=o.useRef(!0),{viewport:v,selectedItem:I,selectedItemText:h,focusSelectedItem:u}=i,x=o.useCallback(()=>{if(d.trigger&&d.valueNode&&c&&p&&v&&I&&h){const E=d.trigger.getBoundingClientRect(),M=p.getBoundingClientRect(),z=d.valueNode.getBoundingClientRect(),J=h.getBoundingClientRect();if(d.dir!=="rtl"){const S=J.left-M.left,w=z.left-S,Y=E.left-w,X=E.width+Y,he=Math.max(X,M.width),ve=window.innerWidth-V,ge=Ne(w,[V,ve-he]);c.style.minWidth=X+"px",c.style.left=ge+"px"}else{const S=M.right-J.right,w=window.innerWidth-z.right-S,Y=window.innerWidth-E.right-w,X=E.width+Y,he=Math.max(X,M.width),ve=window.innerWidth-V,ge=Ne(w,[V,ve-he]);c.style.minWidth=X+"px",c.style.right=ge+"px"}const q=N(),O=window.innerHeight-V*2,H=v.scrollHeight,F=window.getComputedStyle(p),P=parseInt(F.borderTopWidth,10),D=parseInt(F.paddingTop,10),k=parseInt(F.borderBottomWidth,10),Q=parseInt(F.paddingBottom,10),W=P+D+H+Q+k,ue=Math.min(I.offsetHeight*5,W),ae=window.getComputedStyle(v),fe=parseInt(ae.paddingTop,10),me=parseInt(ae.paddingBottom,10),ee=E.top+E.height/2-V,le=O-ee,ne=I.offsetHeight/2,f=I.offsetTop+ne,b=P+D+f,_=W-b;if(b<=ee){const S=I===q[q.length-1].ref.current;c.style.bottom="0px";const w=p.clientHeight-v.offsetTop-v.offsetHeight,Y=Math.max(le,ne+(S?me:0)+w+k),X=b+Y;c.style.height=X+"px"}else{const S=I===q[0].ref.current;c.style.top="0px";const Y=Math.max(ee,P+v.offsetTop+(S?fe:0)+ne)+_;c.style.height=Y+"px",v.scrollTop=b-ee+v.offsetTop}c.style.margin=`${V}px 0`,c.style.minHeight=ue+"px",c.style.maxHeight=O+"px",a==null||a(),requestAnimationFrame(()=>T.current=!0)}},[N,d.trigger,d.valueNode,c,p,v,I,h,d.dir,a]);U(()=>x(),[x]);const[B,A]=o.useState();U(()=>{p&&A(window.getComputedStyle(p).zIndex)},[p]);const oe=o.useCallback(E=>{E&&m.current===!0&&(x(),u==null||u(),m.current=!1)},[x,u]);return r.jsx(zt,{scope:e,contentWrapper:c,shouldExpandOnScrollRef:T,onScrollButtonChange:oe,children:r.jsx("div",{ref:s,style:{display:"flex",flexDirection:"column",position:"fixed",zIndex:B},children:r.jsx(j.div,{...l,ref:y,style:{boxSizing:"border-box",maxHeight:"100%",...l.style}})})})});Fe.displayName=$t;var Gt="SelectPopperPosition",xe=o.forwardRef((t,n)=>{const{__scopeSelect:e,align:a="start",collisionPadding:l=V,...d}=t,i=pe(e);return r.jsx(Pt,{...i,...d,ref:n,align:a,collisionPadding:l,style:{boxSizing:"border-box",...d.style,"--radix-select-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-select-content-available-width":"var(--radix-popper-available-width)","--radix-select-content-available-height":"var(--radix-popper-available-height)","--radix-select-trigger-width":"var(--radix-popper-anchor-width)","--radix-select-trigger-height":"var(--radix-popper-anchor-height)"}})});xe.displayName=Gt;var[zt,be]=te(Z,{}),Se="SelectViewport",We=o.forwardRef((t,n)=>{const{__scopeSelect:e,nonce:a,...l}=t,d=G(Se,e),i=be(Se,e),c=L(n,d.onViewportChange),s=o.useRef(0);return r.jsxs(r.Fragment,{children:[r.jsx("style",{dangerouslySetInnerHTML:{__html:"[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}"},nonce:a}),r.jsx(ie.Slot,{scope:e,children:r.jsx(j.div,{"data-radix-select-viewport":"",role:"presentation",...l,ref:c,style:{position:"relative",flex:1,overflow:"auto",...l.style},onScroll:R(l.onScroll,p=>{const g=p.currentTarget,{contentWrapper:y,shouldExpandOnScrollRef:N}=i;if(N!=null&&N.current&&y){const T=Math.abs(s.current-g.scrollTop);if(T>0){const m=window.innerHeight-V*2,v=parseFloat(y.style.minHeight),I=parseFloat(y.style.height),h=Math.max(v,I);if(h<m){const u=h+T,x=Math.min(m,u),B=u-x;y.style.height=x+"px",y.style.bottom==="0px"&&(g.scrollTop=B>0?B:0,y.style.justifyContent="flex-end")}}}s.current=g.scrollTop})})})]})});We.displayName=Se;var Ue="SelectGroup",[qt,Yt]=te(Ue),Ke=o.forwardRef((t,n)=>{const{__scopeSelect:e,...a}=t,l=Ie();return r.jsx(qt,{scope:e,id:l,children:r.jsx(j.div,{role:"group","aria-labelledby":l,...a,ref:n})})});Ke.displayName=Ue;var $e="SelectLabel",Ge=o.forwardRef((t,n)=>{const{__scopeSelect:e,...a}=t,l=Yt($e,e);return r.jsx(j.div,{id:l.id,...a,ref:n})});Ge.displayName=$e;var ce="SelectItem",[Xt,ze]=te(ce),qe=o.forwardRef((t,n)=>{const{__scopeSelect:e,value:a,disabled:l=!1,textValue:d,...i}=t,c=$(ce,e),s=G(ce,e),p=c.value===a,[g,y]=o.useState(d??""),[N,T]=o.useState(!1),m=L(n,h=>{var u;return(u=s.itemRefCallback)==null?void 0:u.call(s,h,a,l)}),v=Ie(),I=()=>{l||(c.onValueChange(a),c.onOpenChange(!1))};if(a==="")throw new Error("A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.");return r.jsx(Xt,{scope:e,value:a,disabled:l,textId:v,isSelected:p,onItemTextChange:o.useCallback(h=>{y(u=>u||((h==null?void 0:h.textContent)??"").trim())},[]),children:r.jsx(ie.ItemSlot,{scope:e,value:a,disabled:l,textValue:g,children:r.jsx(j.div,{role:"option","aria-labelledby":v,"data-highlighted":N?"":void 0,"aria-selected":p&&N,"data-state":p?"checked":"unchecked","aria-disabled":l||void 0,"data-disabled":l?"":void 0,tabIndex:l?void 0:-1,...i,ref:m,onFocus:R(i.onFocus,()=>T(!0)),onBlur:R(i.onBlur,()=>T(!1)),onPointerUp:R(i.onPointerUp,I),onPointerMove:R(i.onPointerMove,h=>{var u;l?(u=s.onItemLeave)==null||u.call(s):h.currentTarget.focus({preventScroll:!0})}),onPointerLeave:R(i.onPointerLeave,h=>{var u;h.currentTarget===document.activeElement&&((u=s.onItemLeave)==null||u.call(s))}),onKeyDown:R(i.onKeyDown,h=>{var x;((x=s.searchRef)==null?void 0:x.current)!==""&&h.key===" "||(kt.includes(h.key)&&I(),h.key===" "&&h.preventDefault())})})})})});qe.displayName=ce;var re="SelectItemText",Ye=o.forwardRef((t,n)=>{const{__scopeSelect:e,className:a,style:l,...d}=t,i=$(re,e),c=G(re,e),s=ze(re,e),p=Ft(re,e),[g,y]=o.useState(null),N=L(n,h=>y(h),s.onItemTextChange,h=>{var u;return(u=c.itemTextRefCallback)==null?void 0:u.call(c,h,s.value,s.disabled)}),T=g==null?void 0:g.textContent,m=o.useMemo(()=>r.jsx("option",{value:s.value,disabled:s.disabled,children:T},s.value),[s.disabled,s.value,T]),{onNativeOptionAdd:v,onNativeOptionRemove:I}=p;return U(()=>(v(m),()=>I(m)),[v,I,m]),r.jsxs(r.Fragment,{children:[r.jsx(j.span,{id:s.textId,...d,ref:N}),s.isSelected&&i.valueNode&&!i.valueNodeHasChildren?Pe.createPortal(d.children,i.valueNode):null]})});Ye.displayName=re;var Xe="SelectItemIndicator",Ze=o.forwardRef((t,n)=>{const{__scopeSelect:e,...a}=t;return ze(Xe,e).isSelected?r.jsx(j.span,{"aria-hidden":!0,...a,ref:n}):null});Ze.displayName=Xe;var we="SelectScrollUpButton",Je=o.forwardRef((t,n)=>{const e=G(we,t.__scopeSelect),a=be(we,t.__scopeSelect),[l,d]=o.useState(!1),i=L(n,a.onScrollButtonChange);return U(()=>{if(e.viewport&&e.isPositioned){let c=function(){const p=s.scrollTop>0;d(p)};const s=e.viewport;return c(),s.addEventListener("scroll",c),()=>s.removeEventListener("scroll",c)}},[e.viewport,e.isPositioned]),l?r.jsx(et,{...t,ref:i,onAutoScroll:()=>{const{viewport:c,selectedItem:s}=e;c&&s&&(c.scrollTop=c.scrollTop-s.offsetHeight)}}):null});Je.displayName=we;var ye="SelectScrollDownButton",Qe=o.forwardRef((t,n)=>{const e=G(ye,t.__scopeSelect),a=be(ye,t.__scopeSelect),[l,d]=o.useState(!1),i=L(n,a.onScrollButtonChange);return U(()=>{if(e.viewport&&e.isPositioned){let c=function(){const p=s.scrollHeight-s.clientHeight,g=Math.ceil(s.scrollTop)<p;d(g)};const s=e.viewport;return c(),s.addEventListener("scroll",c),()=>s.removeEventListener("scroll",c)}},[e.viewport,e.isPositioned]),l?r.jsx(et,{...t,ref:i,onAutoScroll:()=>{const{viewport:c,selectedItem:s}=e;c&&s&&(c.scrollTop=c.scrollTop+s.offsetHeight)}}):null});Qe.displayName=ye;var et=o.forwardRef((t,n)=>{const{__scopeSelect:e,onAutoScroll:a,...l}=t,d=G("SelectScrollButton",e),i=o.useRef(null),c=de(e),s=o.useCallback(()=>{i.current!==null&&(window.clearInterval(i.current),i.current=null)},[]);return o.useEffect(()=>()=>s(),[s]),U(()=>{var g;const p=c().find(y=>y.ref.current===document.activeElement);(g=p==null?void 0:p.ref.current)==null||g.scrollIntoView({block:"nearest"})},[c]),r.jsx(j.div,{"aria-hidden":!0,...l,ref:n,style:{flexShrink:0,...l.style},onPointerDown:R(l.onPointerDown,()=>{i.current===null&&(i.current=window.setInterval(a,50))}),onPointerMove:R(l.onPointerMove,()=>{var p;(p=d.onItemLeave)==null||p.call(d),i.current===null&&(i.current=window.setInterval(a,50))}),onPointerLeave:R(l.onPointerLeave,()=>{s()})})}),Zt="SelectSeparator",tt=o.forwardRef((t,n)=>{const{__scopeSelect:e,...a}=t;return r.jsx(j.div,{"aria-hidden":!0,...a,ref:n})});tt.displayName=Zt;var Ce="SelectArrow",Jt=o.forwardRef((t,n)=>{const{__scopeSelect:e,...a}=t,l=pe(e),d=$(Ce,e),i=G(Ce,e);return d.open&&i.position==="popper"?r.jsx(Rt,{...l,...a,ref:n}):null});Jt.displayName=Ce;function ot(t){return t===""||t===void 0}var nt=o.forwardRef((t,n)=>{const{value:e,...a}=t,l=o.useRef(null),d=L(n,l),i=_t(e);return o.useEffect(()=>{const c=l.current,s=window.HTMLSelectElement.prototype,g=Object.getOwnPropertyDescriptor(s,"value").set;if(i!==e&&g){const y=new Event("change",{bubbles:!0});g.call(c,e),c.dispatchEvent(y)}},[i,e]),r.jsx(_e,{asChild:!0,children:r.jsx("select",{...a,ref:d,defaultValue:e})})});nt.displayName="BubbleSelect";function rt(t){const n=vt(t),e=o.useRef(""),a=o.useRef(0),l=o.useCallback(i=>{const c=e.current+i;n(c),function s(p){e.current=p,window.clearTimeout(a.current),p!==""&&(a.current=window.setTimeout(()=>s(""),1e3))}(c)},[n]),d=o.useCallback(()=>{e.current="",window.clearTimeout(a.current)},[]);return o.useEffect(()=>()=>window.clearTimeout(a.current),[]),[e,l,d]}function st(t,n,e){const l=n.length>1&&Array.from(n).every(p=>p===n[0])?n[0]:n,d=e?t.indexOf(e):-1;let i=Qt(t,Math.max(d,0));l.length===1&&(i=i.filter(p=>p!==e));const s=i.find(p=>p.textValue.toLowerCase().startsWith(l.toLowerCase()));return s!==e?s:void 0}function Qt(t,n){return t.map((e,a)=>t[(n+a)%t.length])}var eo=je,at=Ae,to=De,oo=Le,no=ke,lt=Ve,ro=We,so=Ke,ct=Ge,it=qe,ao=Ye,lo=Ze,dt=Je,pt=Qe,ut=tt;const No=eo,Po=so,Ro=to,co=o.forwardRef(({className:t,children:n,...e},a)=>r.jsxs(at,{ref:a,className:K("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 ring-offset-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",t),...e,children:[n,r.jsx(oo,{asChild:!0,children:r.jsx(Mt,{className:"h-4 w-4 opacity-50"})})]}));co.displayName=at.displayName;const ft=o.forwardRef(({className:t,...n},e)=>r.jsx(dt,{ref:e,className:K("flex cursor-default items-center justify-center py-1",t),...n,children:r.jsx(Ot,{})}));ft.displayName=dt.displayName;const mt=o.forwardRef(({className:t,...n},e)=>r.jsx(pt,{ref:e,className:K("flex cursor-default items-center justify-center py-1",t),...n,children:r.jsx(At,{})}));mt.displayName=pt.displayName;const io=o.forwardRef(({className:t,children:n,position:e="popper",...a},l)=>r.jsx(no,{children:r.jsxs(lt,{ref:l,className:K("relative z-40 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",e==="popper"&&"data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",t),position:e,...a,children:[r.jsx(ft,{}),r.jsx(ro,{className:K("p-1",e==="popper"&&"h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),children:n}),r.jsx(mt,{})]})}));io.displayName=lt.displayName;const po=o.forwardRef(({className:t,...n},e)=>r.jsx(ct,{ref:e,className:K("px-2 py-1.5 text-sm font-semibold",t),...n}));po.displayName=ct.displayName;const uo=o.forwardRef(({className:t,children:n,...e},a)=>r.jsxs(it,{ref:a,className:K("relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",t),...e,children:[r.jsx("span",{className:"absolute right-2 flex h-3.5 w-3.5 items-center justify-center",children:r.jsx(lo,{children:r.jsx(jt,{className:"h-4 w-4"})})}),r.jsx(ao,{children:n})]}));uo.displayName=it.displayName;const fo=o.forwardRef(({className:t,...n},e)=>r.jsx(ut,{ref:e,className:K("-mx-1 my-1 h-px bg-muted",t),...n}));fo.displayName=ut.displayName;export{No as S,_e as V,co as a,Ro as b,io as c,uo as d,Po as e,po as f};
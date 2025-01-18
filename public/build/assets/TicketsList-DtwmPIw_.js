import{r as m,j as e,y as $}from"./app-BSg7tcV-.js";import{T as f}from"./Title-D8vjgEtZ.js";import{B as E}from"./badge-DiBsXd1D.js";import{L as u}from"./label-CCQKrebs.js";import{c as C}from"./index-B6FVuNCK.js";import{P as j}from"./index-Dhe9Iuj7.js";import{c as D}from"./utils-B0fn8ihL.js";import{TicketDetailsDialog as R}from"./TicketDetailsDialog-l21L84kd.js";import{B as V}from"./button-CrsewIh4.js";import{T as L}from"./react-icons.esm-CCC4ONUB.js";import{t as v}from"./use-toast-DL6Jf7Lj.js";import"./index-Bb4qSo10.js";import"./dialog-BHgiNgJn.js";import"./index-Ds_mV5rb.js";import"./CreateTicketForm-CpoKREGl.js";import"./Field-B_QrgzO7.js";import"./textarea-WMTxw_PN.js";var p="Progress",x=100,[_,te]=C(p),[A,M]=_(p),w=m.forwardRef((r,s)=>{const{__scopeProgress:t,value:l=null,max:a,getValueLabel:n=O,...c}=r;(a||a===0)&&!h(a)&&console.error(k(`${a}`,"Progress"));const o=h(a)?a:x;l!==null&&!g(l,o)&&console.error(q(`${l}`,"Progress"));const i=g(l,o)?l:null,S=d(i)?n(i,o):void 0;return e.jsx(A,{scope:t,value:i,max:o,children:e.jsx(j.div,{"aria-valuemax":o,"aria-valuemin":0,"aria-valuenow":d(i)?i:void 0,"aria-valuetext":S,role:"progressbar","data-state":b(i,o),"data-value":i??void 0,"data-max":o,...c,ref:s})})});w.displayName=p;var y="ProgressIndicator",P=m.forwardRef((r,s)=>{const{__scopeProgress:t,...l}=r,a=M(y,t);return e.jsx(j.div,{"data-state":b(a.value,a.max),"data-value":a.value??void 0,"data-max":a.max,...l,ref:s})});P.displayName=y;function O(r,s){return`${Math.round(r/s*100)}%`}function b(r,s){return r==null?"indeterminate":r===s?"complete":"loading"}function d(r){return typeof r=="number"}function h(r){return d(r)&&!isNaN(r)&&r>0}function g(r,s){return d(r)&&!isNaN(r)&&r<=s&&r>=0}function k(r,s){return`Invalid prop \`max\` of value \`${r}\` supplied to \`${s}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${x}\`.`}function q(r,s){return`Invalid prop \`value\` of value \`${r}\` supplied to \`${s}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${x} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`}var I=w,B=P;const T=m.forwardRef(({className:r,value:s,...t},l)=>e.jsx(I,{ref:l,className:D("relative h-1 w-full overflow-hidden rounded-full bg-primary/10",r),...t,children:e.jsx(B,{className:"h-full w-full flex-1 bg-primary transition-all",style:{transform:`translateX(-${100-(s||0)}%)`}})}));T.displayName=I.displayName;const oe=({event:r,admissions:s,extras:t})=>{const[l,a]=m.useState(null),n=()=>{a(null)};return e.jsxs("div",{className:"space-y-8",children:[e.jsx(R,{event:r,ticket:l,handleClose:n}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(f,{title:"Admission générale",level:"h4"}),e.jsxs("div",{className:"flex items-center flex-row gap-2 pr-5 md:pr-20",children:[e.jsx("div",{className:"w-2/6 md:w-3/6 text-xs shrink-0",children:"Nom"}),e.jsx("div",{className:"text-xs w-full pl-1 md:pl-2",children:"Prix"}),e.jsx("div",{className:"text-xs w-2/6 shrink-0",children:"Vendus"})]}),e.jsx("div",{className:"mt-3 w-full flex flex-col space-y-3 ",children:Object.values(s).map(c=>N({event:r,ticket:c,setSelectedTicket:a}))})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(f,{title:"Extras",level:"h4"}),e.jsxs("div",{className:"flex items-center flex-row gap-2 pr-5 md:pr-20",children:[e.jsx(u,{htmlFor:"name",className:"w-2/6 md:w-3/6 text-xs shrink-0",children:"Nom"}),e.jsx(u,{htmlFor:"price",className:"text-xs w-full pl-1  md:pl-2",children:"Prix"}),e.jsx(u,{htmlFor:"quantity",className:"text-xs w-2/6 shrink-0",children:"Vendus"})]}),e.jsx("div",{className:"mt-3 w-full flex flex-col space-y-3 ",children:Object.values(t).map(c=>N({event:r,ticket:c,setSelectedTicket:a}))})]})]})},N=({event:r,ticket:s,setSelectedTicket:t})=>{const l=()=>{if((s==null?void 0:s.sold)>0)return v({title:"Erreur",description:"Impossible de supprimer un billet qui a déjà été vendu"});console.log("Delete ticket",s),$.delete(route("events.tickets.delete",{event:r,ticket:s.id}),{preserveState:!1,preserveScroll:!0,onSuccess:n=>{v({title:"Succès",description:n.props.flash.success})}})},a=s.sold/s.quantity*100;return e.jsxs("div",{className:"[&:not(:first-child)]:pt-3 flex flex-col gap-y-4 md:flex-row md:items-center cursor-pointer hover:bg-accent hover:text-accent-foreground w-full  py-2 border-l-2 border-primary  pr-4",children:[e.jsxs("div",{onClick:()=>t(s),className:"w-full flex items-center gap-2 px-2 md:px-6",children:[e.jsx("div",{className:"truncate w-2/6 md:w-3/6 shrink-0 font-medium",children:s.name}),e.jsxs("div",{className:"w-full text-sm grid place-content-left text-left",children:[s.price," €"]}),e.jsxs("div",{className:"w-2/6 shrink-0 flex flex-col gap-2",children:[e.jsx(T,{value:a,className:""}),e.jsxs("div",{className:"!text-[10px] flex flex-row flex-wrap gap-y-1 items-center justify-between",children:[e.jsx(E,{variant:a<100?"green":"destructive",className:" !py-0.5 self-start",children:a<100?"Disponible":"épuisé"}),e.jsxs("span",{children:[s.sold," / ",s.quantity]})]})]})]}),e.jsx(V,{variant:"outline",className:"ml-2",onClick:l,children:e.jsx(L,{})})]},s.name)};export{oe as TicketsList};

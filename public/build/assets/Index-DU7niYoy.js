import{j as e,r as p,Y as u}from"./app-qijFDi4_.js";import{A as f}from"./AdminHeader-gx8htJE4.js";import{b as m,B as d}from"./button-Bw7rl0P3.js";import{c as r}from"./utils-Di4cwZjX.js";import{D as x,C as h}from"./index.esm-D4bal3-f.js";import{C as g}from"./chevron-right-C83Bcc05.js";import{P as y,a as b,b as j}from"./popover-BHfHBQEX.js";import{C as v}from"./isSameDay-Dt_KoSbY.js";import{f as i}from"./format-Byq5l0Xu.js";import{T as _,a as w,b as n}from"./tabs-DiSdzXQu.js";import{A as L}from"./AuthenticatedLayout-kZ0ruG7C.js";import{Notifications as N}from"./Notifications-Du7gWZvI.js";import{Overview as C}from"./Overview-CPWcrnbf.js";import{Statistiques as T}from"./Statistiques-Bwn4B7hn.js";import"./Title-DgERI1GW.js";import"./createLucideIcon-D8zq1ggz.js";import"./index-BJuTwMzb.js";import"./dialog-33l9bfr1.js";import"./index-1QdY4h2j.js";import"./index-CwBatNrT.js";import"./index-BTQR_pCt.js";import"./index-FSPNRT7I.js";import"./index-B3zxlze2.js";import"./avatar-CdZvAEJg.js";import"./react-icons.esm-B_QH4jkH.js";import"./label-BFttLCBn.js";import"./select-BFpH6B09.js";import"./index-rnhLPvwg.js";import"./textarea-DUaatCdz.js";import"./Field-DkKyvpSt.js";import"./use-toast-B9KH-dZ1.js";import"./card-5VrrA9nZ.js";import"./chart-T6EgIBSo.js";import"./index-8mNe7pSa.js";function c({className:o,classNames:t,showOutsideDays:s=!0,...a}){return e.jsx(x,{showOutsideDays:s,className:r("p-3",o),classNames:{months:"flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",month:"space-y-4",caption:"flex justify-center pt-1 relative items-center",caption_label:"text-sm font-medium",nav:"space-x-1 flex items-center",nav_button:r(m({variant:"outline"}),"h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"),nav_button_previous:"absolute left-1",nav_button_next:"absolute right-1",table:"w-full border-collapse space-y-1",head_row:"flex",head_cell:"text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",row:"flex w-full mt-2",cell:r("relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",a.mode==="range"?"[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md":"[&:has([aria-selected])]:rounded-md"),day:r(m({variant:"ghost"}),"h-8 w-8 p-0 font-normal aria-selected:opacity-100"),day_range_start:"day-range-start",day_range_end:"day-range-end",day_selected:"bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",day_today:"bg-accent text-accent-foreground",day_outside:"day-outside text-muted-foreground opacity-50  aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",day_disabled:"text-muted-foreground opacity-50",day_range_middle:"aria-selected:bg-accent aria-selected:text-accent-foreground",day_hidden:"invisible",...t},components:{IconLeft:({...l})=>e.jsx(h,{className:"h-4 w-4"}),IconRight:({...l})=>e.jsx(g,{className:"h-4 w-4"})},...a})}c.displayName="Calendar";function P({className:o,date:t,setDate:s,handleChange:a}){return p.useEffect(()=>{a&&a(t)},[t]),e.jsx("div",{className:r("grid gap-2",o),children:e.jsxs(y,{children:[e.jsx(b,{asChild:!0,children:e.jsxs(d,{id:"date",variant:"outline",className:r("w-full justify-start text-left font-normal",!t&&"text-muted-foreground"),children:[e.jsx(v,{className:"mr-2 h-4 w-4"}),t!=null&&t.from?t.to?e.jsxs(e.Fragment,{children:[i(t.from,"LLL dd, y")," -"," ",i(t.to,"LLL dd, y")]}):i(t.from,"LLL dd, y"):e.jsx("span",{children:"Sélectionner une date"})]})}),e.jsx(j,{className:"w-auto p-0",align:"start",children:e.jsx(c,{initialFocus:!0,mode:"range",defaultMonth:t==null?void 0:t.from,selected:t,onSelect:s,numberOfMonths:2})})]})})}function de(){return e.jsxs(L,{className:"space-y-6",children:[e.jsx(u,{title:"Dashboard"}),e.jsx(f,{title:"Vue d'ensemble",actions:e.jsxs(e.Fragment,{children:[e.jsx(P,{}),e.jsx(d,{children:"Télécharger"})]}),className:"pb-4"}),e.jsxs(_,{defaultValue:"overview",children:[e.jsxs(w,{children:[e.jsx(n,{value:"overview",children:"Vue d'ensemble"}),e.jsx(n,{value:"statistiques",children:"Statistiques"}),e.jsx(n,{value:"notifications",children:"Notifications"})]}),e.jsx(C,{}),e.jsx(T,{}),e.jsx(N,{})]})]})}export{de as default};

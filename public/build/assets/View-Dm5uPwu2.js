import{q as n,j as e}from"./app-BSg7tcV-.js";import{B as t}from"./button-CrsewIh4.js";import{P as i}from"./ProfileLayout-BpaOUmvv.js";import"./utils-B0fn8ihL.js";import"./index-Bb4qSo10.js";import"./CustomerLayout-BclpHKXg.js";import"./createLucideIcon-Dgyn1mPU.js";import"./x-CpmZOtQj.js";const h=()=>{const{transaction:r}=n().props;return console.log(r),e.jsxs(i,{title:"Ma commande",children:[e.jsxs("ul",{className:"border-b border-dashed pb-4",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Événement:"})," ",r.event.name]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Statut:"})," ",r.is_completed?"Payée":"En attente"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Montant:"})," ",r.amount,"€"]})]}),e.jsxs("div",{className:"space-y-2 mt-4",children:[e.jsxs("h3",{className:"font-integral text-base flex items-center justify-between !mb-4",children:["Tickets",e.jsx(t,{variant:"customer_primary",className:"!px-0 !py-0 bg-transparent text-primary underline underline-offset-4 underline-primary decoration-2",children:"télécharger tous les billets"})]}),e.jsx("ul",{className:"space-y-2",children:r.tickets.map(s=>e.jsxs("li",{className:"flex items-center justify-between border border-dashed px-4 p-4",children:[e.jsxs("div",{children:[e.jsx("strong",{children:s.name})," ",s.price," €"]}),e.jsx("a",{href:route("customer.tickets.download",{ticketId:s.pivot.id,transaction:r.id}),target:"_blank",rel:"noreferrer",children:e.jsx(t,{variant:"customer_yellow",children:"Télécharger"})})]},s.id))})]})]})};export{h as default};
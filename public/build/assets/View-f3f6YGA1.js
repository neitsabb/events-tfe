import{j as e,q as a,a as n}from"./app-BSg7tcV-.js";import{D as i}from"./DataTable-BoFkvAEL.js";import{B as c}from"./badge-DiBsXd1D.js";import{B as o}from"./button-CrsewIh4.js";import{D as l,a as m,b as p,c as d,d as u}from"./AuthenticatedLayout-D4oF8_0h.js";import{E as h}from"./EventSingleLayout-ChSxrfKP.js";import{e as x}from"./utils-B0fn8ihL.js";import{C as g,D as j}from"./react-icons.esm-CCC4ONUB.js";import{f}from"./format-Byq5l0Xu.js";import{f as D}from"./fr-BPQ7ghFf.js";import"./label-CCQKrebs.js";import"./index-Dhe9Iuj7.js";import"./index-Bb4qSo10.js";import"./Title-D8vjgEtZ.js";import"./avatar-ButMWc8x.js";import"./index-B6FVuNCK.js";import"./dialog-BHgiNgJn.js";import"./index-Ds_mV5rb.js";import"./select-81fZS2R4.js";import"./index-DxOe1-pG.js";import"./index-DYbuBnVH.js";import"./index-C1gOTv3o.js";import"./index-jbec320_.js";import"./createLucideIcon-Dgyn1mPU.js";import"./textarea-WMTxw_PN.js";import"./Field-B_QrgzO7.js";import"./use-toast-DL6Jf7Lj.js";import"./index-Dxh5GxJh.js";import"./chevron-right-9hEqs-4T.js";import"./AdminHeader-CRV36qwl.js";import"./enums-0bE_G0vF.js";import"./GeneralStep-CluPZpyd.js";import"./index.esm-DQT5-vAg.js";import"./isSameDay-CmgISKQ8.js";import"./popover-Cbj3uuOo.js";import"./index.modern-CyBs9gLA.js";import"./command-B1qCJl_3.js";import"./x-CpmZOtQj.js";const v=[{accessorKey:"name",meta:"Nom du client",header:({column:t})=>e.jsxs(o,{variant:"none",onClick:()=>t.toggleSorting(t.getIsSorted()==="asc"),children:["Nom",e.jsx(g,{className:"ml-2 h-4 w-4"})]}),cell:({row:t})=>(console.log(t.getValue("user.name")),t.getValue("name"))},{accessorKey:"tickets_count",meta:"Billets",header:"Billets",cell:({row:t})=>{const r=t.getValue("tickets_count"),s=r>1?"s":"";return e.jsxs("span",{children:[r," billet",s," acheté",s]})}},{accessorKey:"amount",meta:"Montant",header:"Montant",cell:({row:t})=>{const r=t.getValue("amount");return e.jsx("div",{className:"flex items-center space-x-2",children:e.jsxs("div",{children:[r," €"]})})}},{accessorKey:"status",meta:"Statut",header:"Statut",cell:({row:t})=>{const s=t.getValue("status")==="completed";return e.jsx(c,{variant:s?"green":"destructive",children:s?"Complété":"En attente"})}},{accessorKey:"created_at",meta:"Date",header:"Date",cell:({row:t})=>{const r=t.getValue("created_at");return e.jsx("div",{className:"flex items-center space-x-2",children:e.jsx("div",{children:x(f(r,"d/MM/yyyy",{locale:D}))})})}},{id:"actions",header:"Actions",enableHiding:!1,cell:({row:t})=>{const{event:r}=a().props,s=t.original;return console.log(s),e.jsxs(l,{children:[e.jsx(m,{asChild:!0,children:e.jsxs(o,{variant:"ghost",className:"h-8 w-8 p-0",children:[e.jsx("span",{className:"sr-only",children:"Ouvrir le menu"}),e.jsx(j,{className:"h-4 w-4"})]})}),e.jsxs(p,{align:"end",children:[e.jsx(d,{children:"Actions"}),e.jsx(u,{children:e.jsx(n,{href:route("events.transactions.show",{event:r.id,transaction:s.id}),children:"Voir la transaction"})})]})]})}}],at=({event:t})=>(console.log(t,"event"),e.jsx(h,{event:t,children:e.jsx(i,{title:`Transactions (${t.transactions.length})`,data:t.transactions,columns:v,hideColumnsButton:!0,className:"mt-6"})}));export{v as columns,at as default};
import{j as e,a as i}from"./app-XS3yalVP.js";import{C as r}from"./checkbox-CXrDxCET.js";import{C as c,D as o}from"./react-icons.esm-Cs_vHbYx.js";import{D as d,a as m,b as h,c as p,d as u}from"./dropdown-menu-cZMEmnfF.js";import{B as g}from"./badge-CMo_tylK.js";import{i as x,B as n}from"./button-QYAymDF9.js";import"./index-CNpfTyVb.js";import"./index-BtUeGfbK.js";import"./index-pNR7ng0I.js";import"./check-Dbisva_4.js";import"./createLucideIcon-CmdL_aFk.js";import"./chevron-right-EKKQYDPz.js";import"./index-CtzMndQ0.js";import"./index-CSV9-Fe5.js";const P=()=>{const l=[{id:"select",header:({table:s})=>e.jsx(r,{checked:s.getIsAllPageRowsSelected()||s.getIsSomePageRowsSelected()&&"indeterminate",onCheckedChange:t=>s.toggleAllPageRowsSelected(!!t),"aria-label":"Select all"}),cell:({row:s})=>e.jsx(r,{checked:s.getIsSelected(),onCheckedChange:t=>s.toggleSelected(!!t),"aria-label":"Select row"}),enableSorting:!1,enableHiding:!1},{accessorKey:"name",meta:"Nom",header:({column:s})=>e.jsxs(n,{variant:"none",onClick:()=>s.toggleSorting(s.getIsSorted()==="asc"),children:["Nom",e.jsx(c,{className:"ml-2 h-4 w-4"})]}),cell:({row:s})=>e.jsx("div",{className:"lowercase md:w-auto",children:s.getValue("name")})},{id:"actions",header:"Actions",enableHiding:!1,cell:({row:s})=>{const t=s.original;return e.jsxs(d,{children:[e.jsx(m,{asChild:!0,children:e.jsxs(n,{variant:"ghost",className:"h-8 w-8 p-0",children:[e.jsx("span",{className:"sr-only",children:"Ouvrir le menu"}),e.jsx(o,{className:"h-4 w-4"})]})}),e.jsxs(h,{align:"end",children:[e.jsx(p,{children:"Actions"}),e.jsx(u,{children:e.jsx(i,{href:route("events.show",{event:t.id}),children:"Voir l'événement"})})]})]})}}];return x()||l.splice(2,0,{accessorKey:"tickets",meta:"Billets",header:"Billets",cell:({row:s})=>{const t=s.getValue("tickets");return e.jsxs("div",{className:"flex items-center ",children:[e.jsx("span",{className:"font-bold",children:t.total_sold}),e.jsx("span",{className:"hidden md:block",children:" billets vendus"})]})}},{accessorKey:"participants",meta:"Participants",header:"Participants",cell:({row:s})=>{const t=s.getValue("tickets");return e.jsxs("div",{className:"flex items-center space-x-1",children:[e.jsx("span",{className:"font-bold",children:t.participants}),e.jsx("span",{className:"hidden md:block",children:"personnes"})]})}},{accessorKey:"status",header:"Status",cell:({row:s})=>{const t=s.getValue("status");let a="default";return t==="published"?a="published":t==="draft"?a="secondary":t==="archived"&&(a="destructive"),e.jsx(g,{variant:a,children:t==="draft"?"Brouillon":t==="archived"?"Archivé":t==="not_configured"?"Non configuré":"Publié"})}}),l};export{P as getColumns};
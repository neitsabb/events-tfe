import{j as e,a as i}from"./app-FSxDIhYd.js";import{C as r}from"./checkbox-Vm9lP9nZ.js";import{C as c,D as o}from"./react-icons.esm-CIjgWKdx.js";import{D as d,a as m,b as h,c as p,d as u}from"./dropdown-menu-DxExr19P.js";import{B as g}from"./badge-C4bcAkR2.js";import{i as x,B as n}from"./button-4CThn5Rc.js";import"./index-Cev0qjhR.js";import"./index-gqEFOgI1.js";import"./index-DvZsx3sh.js";import"./check-DpqUXmib.js";import"./createLucideIcon-BCPqG9cu.js";import"./chevron-right-CKNbWl7c.js";import"./index-XGTWT46k.js";import"./index-D3MSId1l.js";const P=()=>{const l=[{id:"select",header:({table:s})=>e.jsx(r,{checked:s.getIsAllPageRowsSelected()||s.getIsSomePageRowsSelected()&&"indeterminate",onCheckedChange:t=>s.toggleAllPageRowsSelected(!!t),"aria-label":"Select all"}),cell:({row:s})=>e.jsx(r,{checked:s.getIsSelected(),onCheckedChange:t=>s.toggleSelected(!!t),"aria-label":"Select row"}),enableSorting:!1,enableHiding:!1},{accessorKey:"name",meta:"Nom",header:({column:s})=>e.jsxs(n,{variant:"none",onClick:()=>s.toggleSorting(s.getIsSorted()==="asc"),children:["Nom",e.jsx(c,{className:"ml-2 h-4 w-4"})]}),cell:({row:s})=>e.jsx("div",{className:"lowercase md:w-auto",children:s.getValue("name")})},{id:"actions",header:"Actions",enableHiding:!1,cell:({row:s})=>{const t=s.original;return e.jsxs(d,{children:[e.jsx(m,{asChild:!0,children:e.jsxs(n,{variant:"ghost",className:"h-8 w-8 p-0",children:[e.jsx("span",{className:"sr-only",children:"Ouvrir le menu"}),e.jsx(o,{className:"h-4 w-4"})]})}),e.jsxs(h,{align:"end",children:[e.jsx(p,{children:"Actions"}),e.jsx(u,{children:e.jsx(i,{href:route("events.show",{event:t.id}),children:"Voir l'événement"})})]})]})}}];return x()||l.splice(2,0,{accessorKey:"tickets",meta:"Billets",header:"Billets",cell:({row:s})=>{const t=s.getValue("tickets");return e.jsxs("div",{className:"flex items-center ",children:[e.jsx("span",{className:"font-bold",children:t.total_sold}),e.jsx("span",{className:"hidden md:block",children:" billets vendus"})]})}},{accessorKey:"participants",meta:"Participants",header:"Participants",cell:({row:s})=>{const t=s.getValue("tickets");return e.jsxs("div",{className:"flex items-center space-x-1",children:[e.jsx("span",{className:"font-bold",children:t.participants}),e.jsx("span",{className:"hidden md:block",children:"personnes"})]})}},{accessorKey:"status",header:"Status",cell:({row:s})=>{const t=s.getValue("status");let a="default";return t==="published"?a="published":t==="draft"?a="secondary":t==="archived"&&(a="destructive"),e.jsx(g,{variant:a,children:t==="draft"?"Brouillon":t==="archived"?"Archivé":t==="not_configured"?"Non configuré":"Publié"})}}),l};export{P as getColumns};
import{r as n,j as e,D as w,q as N,W as k,Y as y,a as C}from"./app-BSg7tcV-.js";import{B as o}from"./button-CrsewIh4.js";import{A as D,D as S,a as A,b as M,c as B,d as I}from"./AuthenticatedLayout-D4oF8_0h.js";import{A as V}from"./AdminHeader-CRV36qwl.js";import{C as E,D as R}from"./react-icons.esm-CCC4ONUB.js";import{D as T}from"./DataTable-BoFkvAEL.js";import{B as z}from"./badge-DiBsXd1D.js";import{C as p}from"./checkbox-63pTX6WN.js";import{CreateEventDialog as P}from"./Modal-BHu2rB5r.js";import{E as i}from"./enums-0bE_G0vF.js";import{c as L}from"./index-Bb4qSo10.js";import{c,i as u}from"./utils-B0fn8ihL.js";import{c as H}from"./createLucideIcon-Dgyn1mPU.js";import"./avatar-ButMWc8x.js";import"./index-B6FVuNCK.js";import"./index-Dhe9Iuj7.js";import"./dialog-BHgiNgJn.js";import"./index-Ds_mV5rb.js";import"./label-CCQKrebs.js";import"./select-81fZS2R4.js";import"./index-DxOe1-pG.js";import"./index-DYbuBnVH.js";import"./index-C1gOTv3o.js";import"./index-jbec320_.js";import"./textarea-WMTxw_PN.js";import"./Field-B_QrgzO7.js";import"./use-toast-DL6Jf7Lj.js";import"./index-Dxh5GxJh.js";import"./chevron-right-9hEqs-4T.js";import"./Title-D8vjgEtZ.js";import"./Form-CZTvYJok.js";/**
 * @license lucide-react v0.419.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q=H("MessageSquareWarning",[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}],["path",{d:"M12 7v2",key:"stiyo7"}],["path",{d:"M12 13h.01",key:"y0uutt"}]]),K=L("relative w-full rounded-lg border px-5 py-6  [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-5 [&>svg]:top-6 [&>svg]:text-foreground",{variants:{variant:{default:"bg-background text-foreground",destructive:"border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"}},defaultVariants:{variant:"default"}}),h=n.forwardRef(({className:a,variant:t,...s},l)=>e.jsx("div",{ref:l,role:"alert",className:c(K({variant:t}),a),...s}));h.displayName="Alert";const g=n.forwardRef(({className:a,...t},s)=>e.jsx("h5",{ref:s,className:c("mb-2 font-medium leading-none tracking-tight md:pl-10",a),...t}));g.displayName="AlertTitle";const v=n.forwardRef(({className:a,...t},s)=>e.jsx("div",{ref:s,className:c("text-sm [&_p]:leading-relaxed md:pl-10",a),...t}));v.displayName="AlertDescription";const W=()=>{const a=[{id:"select",header:({table:t})=>e.jsx(p,{checked:t.getIsAllPageRowsSelected()||t.getIsSomePageRowsSelected()&&"indeterminate",onCheckedChange:s=>t.toggleAllPageRowsSelected(!!s),"aria-label":"Select all"}),cell:({row:t})=>e.jsx(p,{checked:t.getIsSelected(),onCheckedChange:s=>t.toggleSelected(!!s),"aria-label":"Select row"}),enableSorting:!1,enableHiding:!1},{accessorKey:"name",meta:"Nom",header:({column:t})=>e.jsxs(o,{variant:"none",onClick:()=>t.toggleSorting(t.getIsSorted()==="asc"),children:["Nom",e.jsx(E,{className:"ml-2 h-4 w-4"})]}),cell:({row:t})=>e.jsx("div",{className:"lowercase md:w-auto",children:t.getValue("name")})},{id:"actions",header:"Actions",enableHiding:!1,cell:({row:t})=>{const s=t.original;return e.jsxs(S,{children:[e.jsx(A,{asChild:!0,children:e.jsxs(o,{variant:"ghost",className:"h-8 w-8 p-0",children:[e.jsx("span",{className:"sr-only",children:"Ouvrir le menu"}),e.jsx(R,{className:"h-4 w-4"})]})}),e.jsxs(M,{align:"end",children:[e.jsx(B,{children:"Actions"}),e.jsx(I,{children:e.jsx(C,{href:route("events.show",{event:s.id}),children:"Voir l'événement"})})]})]})}}];return u()||a.splice(2,0,{accessorKey:"tickets",meta:"Billets",header:"Billets",cell:({row:t})=>{const s=t.getValue("tickets");return e.jsxs("div",{className:"flex items-center ",children:[e.jsx("span",{className:"font-bold",children:s.total_sold}),e.jsx("span",{className:"hidden md:block",children:" billets vendus"})]})}},{accessorKey:"participants",meta:"Participants",header:"Participants",cell:({row:t})=>{const s=t.getValue("tickets");return e.jsxs("div",{className:"flex items-center space-x-1",children:[e.jsx("span",{className:"font-bold",children:s.participants}),e.jsx("span",{className:"hidden md:block",children:"personnes"})]})}},{accessorKey:"status",header:"Status",cell:({row:t})=>{const s=t.getValue("status");let l="default";return s==="published"?l="published":s==="draft"?l="secondary":s==="archived"&&(l="destructive"),e.jsx(z,{variant:l,children:s==="draft"?"Brouillon":s==="archived"?"Archivé":s==="not_configured"?"Non configuré":"Publié"})}}),a},_=[{label:"Tous",value:"all"},{label:"Brouillon",value:i.DRAFT},{label:"Publié",value:i.PUBLISHED},{label:"Archivé",value:i.ARCHIVED}],we=({events:a})=>{const[t,s]=w("all"),l=a.filter(r=>t==="all"?!0:r.status===t),x=r=>{s(r)},{props:d}=N(),{post:f,processing:m}=k(),j=r=>{r.preventDefault(),f(route("organizations.stripe.connect"))};return e.jsxs(D,{className:"space-y-8",children:[e.jsx(y,{title:"Dashboard"}),e.jsx(V,{title:"Événements",actions:e.jsx(P,{}),className:"pb-4"}),d.auth.organizationLogged.stripe_status!=="complete"&&e.jsxs(h,{className:"z-10",children:[e.jsx(q,{className:"h-6 w-6 hidden md:block"}),e.jsx(g,{children:"Complétez votre organisation pour vendre des billets"}),e.jsx(v,{children:"Notre fournisseur de services de paiement a besoin des détails de votre organisation pour que vous perceviez vos revenus."}),e.jsxs(o,{onClick:j,variant:"ghost",className:"underline underline-offset-4 -ml-2 md:ml-7 mt-2 md:mt-4 whitespace-nowrap text-sm font-medium text-primary/90 hover:text-primary flex gap-2 disabled:text-accent-foreground disabled:cursor-not-allowed",disabled:m||!d.permissions.organization.connect,children:[m&&e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"animate-spin w-4",children:e.jsx("path",{d:"M21 12a9 9 0 1 1-6.219-8.56"})}),"Compléter mon compte Stripe"]})]}),e.jsxs("div",{className:"space-y-6",children:[e.jsx("div",{className:"flex gap-2 overflow-x-auto pb-4 md:pb-0",children:_.map((r,b)=>e.jsx(o,{variant:r.value===t?"default":"secondary",className:"text-sm rounded-full",onClick:()=>x(r.value),children:r.label},b))}),e.jsx(T,{data:l,hideColumnsButton:u(),columns:W()})]})]})};export{we as default,W as getColumns};

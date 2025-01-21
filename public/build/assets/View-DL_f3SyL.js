import{r as d,j as e,q as x,W as g,D as h,Y as b}from"./app-FSxDIhYd.js";import{c as m,a as j,B as c,i as N}from"./button-4CThn5Rc.js";import{A as w}from"./AuthenticatedLayout-B9fcIie5.js";import{A as y}from"./AdminHeader-CuzOBp2Q.js";import{D as A}from"./DataTable-D6siVzra.js";import{E as i}from"./enums-DllFtvDX.js";import{CreateEventDialog as k}from"./Modal-q0PM1BU_.js";import{getColumns as D}from"./columns-on_8iXas.js";import{c as C}from"./createLucideIcon-BCPqG9cu.js";import"./index-Cev0qjhR.js";import"./react-icons.esm-CIjgWKdx.js";import"./dialog-nkotfy8D.js";import"./index-XGTWT46k.js";import"./label-CfUuw5UX.js";import"./select-BCPN16Ka.js";import"./chevron-right-CKNbWl7c.js";import"./index-D3MSId1l.js";import"./index-DvZsx3sh.js";import"./index-gqEFOgI1.js";import"./check-DpqUXmib.js";import"./textarea-BpLq-t0F.js";import"./Field-arf_Kbr3.js";import"./use-toast-Da-wStD8.js";import"./dropdown-menu-DxExr19P.js";import"./Title-C5IMST91.js";import"./Form-FAQwD4fN.js";import"./checkbox-Vm9lP9nZ.js";import"./badge-C4bcAkR2.js";/**
 * @license lucide-react v0.419.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T=C("MessageSquareWarning",[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}],["path",{d:"M12 7v2",key:"stiyo7"}],["path",{d:"M12 13h.01",key:"y0uutt"}]]),E=j("relative w-full rounded-lg border px-5 py-6  [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-5 [&>svg]:top-6 [&>svg]:text-foreground",{variants:{variant:{default:"bg-background text-foreground",destructive:"border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"}},defaultVariants:{variant:"default"}}),p=d.forwardRef(({className:r,variant:t,...a},o)=>e.jsx("div",{ref:o,role:"alert",className:m(E({variant:t}),r),...a}));p.displayName="Alert";const u=d.forwardRef(({className:r,...t},a)=>e.jsx("h5",{ref:a,className:m("mb-2 font-medium leading-none tracking-tight md:pl-10",r),...t}));u.displayName="AlertTitle";const v=d.forwardRef(({className:r,...t},a)=>e.jsx("div",{ref:a,className:m("text-sm [&_p]:leading-relaxed md:pl-10",r),...t}));v.displayName="AlertDescription";const z=()=>{const{auth:r,permissions:t}=x().props,{post:a,processing:o}=g(),n=l=>{l.preventDefault(),a(route("organizations.stripe.connect"))};return r.organizationLogged.stripe_status!=="complete"&&e.jsxs(p,{className:"z-10",children:[e.jsx(T,{className:"h-6 w-6 hidden md:block"}),e.jsx(u,{children:"Complétez votre organisation pour vendre des billets"}),e.jsx(v,{children:"Notre fournisseur de services de paiement a besoin des détails de votre organisation pour que vous perceviez vos revenus."}),e.jsxs(c,{onClick:n,variant:"ghost",className:"underline underline-offset-4 -ml-2 md:ml-7 mt-2 md:mt-4 whitespace-nowrap text-sm font-medium text-primary/90 hover:text-primary flex gap-2 disabled:text-accent-foreground disabled:cursor-not-allowed",disabled:o||!t.organization.connect,children:[o&&e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"animate-spin w-4",children:e.jsx("path",{d:"M21 12a9 9 0 1 1-6.219-8.56"})}),"Compléter mon compte Stripe"]})]})},M=[{label:"Tous",value:"all"},{label:"A venir",value:i.UPCOMING},{label:"Terminé",value:i.OUTGOING},{label:"Brouillon",value:i.DRAFT},{label:"Publié",value:i.PUBLISHED},{label:"Archivé",value:i.ARCHIVED}],ie=({events:r})=>{const[t,a]=h("all"),o=new Date,n=r.filter(s=>t==="all"?!0:t===i.UPCOMING?new Date(s.start_date)>o:t===i.OUTGOING?new Date(s.end_date)<o:s.status===t),l=s=>{a(s)};return e.jsxs(w,{className:"space-y-8",children:[e.jsx(b,{title:"Evenements"}),e.jsx(y,{title:"Événements",actions:e.jsx(k,{}),className:"pb-4"}),e.jsx(z,{}),e.jsxs("div",{className:"space-y-6",children:[e.jsx("div",{className:"flex gap-2 overflow-x-auto pb-4 md:pb-0",children:M.map((s,f)=>e.jsx(c,{variant:s.value===t?"default":"secondary",className:"text-sm rounded-full",onClick:()=>l(s.value),children:s.label},f))}),e.jsx(A,{data:n,hideColumnsButton:N(),columns:D()})]})]})};export{ie as default};
import{q as H,r as u,W as A,j as e,Y as F}from"./app-BjcKcwr-.js";import{C as I,a as E}from"./CustomerLayout-Dz_NLat1.js";import{B as j,e as _,c as N}from"./button-DMukzNLy.js";import{A as L,M as P,a as Q,d as R,C as $,i as T}from"./index.modern-DSfvp4kw.js";import{c as B}from"./createLucideIcon-UZKk8F8v.js";import{p as x}from"./format-C8Xkf-na.js";import{f as h}from"./fr-CXO3BpIY.js";import"./x-C6w3-XRJ.js";/**
 * @license lucide-react v0.419.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=B("Pin",[["path",{d:"M12 17v5",key:"bb1du9"}],["path",{d:"M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z",key:"1nkz8b"}]]),ee=()=>{const{event:s,isPreview:i}=H().props,{admissions:a,extras:c}=s.tickets,[n,f]=u.useState([]),[r,m]=u.useState([]),{setData:b,post:g}=A({admissions:n,extras:r}),w=(t,d)=>{f(o=>d===0?o.filter(l=>l.id!==t.id):o.find(l=>l.id===t.id)?o.map(l=>l.id===t.id?{...l,quantity:d}:l):[...o,{id:t.id,name:t.name,price:t.price,quantity:d}])},y=(t,d)=>{m(o=>d===0?o.filter(l=>l.id!==t.id):o.find(l=>l.id===t.id)?o.map(l=>l.id===t.id?{...l,quantity:d}:l):[...o,{id:t.id,name:t.name,price:t.price,quantity:d}])};u.useEffect(()=>{b({admissions:n,extras:r})},[n,r]);const C=r.length>0||n.length>0,z=()=>{window.history.back()},D=u.useRef(null),M=()=>{var t;console.log("scrolling"),(t=D.current)==null||t.scrollIntoView({behavior:"smooth"})};return e.jsxs(e.Fragment,{children:[i&&e.jsx(j,{className:"absolute top-4 left-[50%] transform -translate-x-1/2 z-50",onClick:z,children:"Retour au dashboard"}),e.jsxs(I,{background:!1,isHome:!0,children:[e.jsx(F,{title:s.name}),e.jsxs("div",{className:"border-b border-muted/20 border-dashed ",children:[e.jsx(O,{event:s,onScroll:M}),e.jsxs(E,{className:"grid grid-cols-3 gap-x-10 mt-10 mb-20 text-foreground",children:[e.jsxs("div",{className:"col-span-3 md:col-span-2",ref:D,children:[e.jsx(p,{title:"Billets",children:e.jsx(k,{tickets:a,onUpdateQuantity:w})}),e.jsx(p,{title:"Extras",children:e.jsx(k,{tickets:c,onUpdateQuantity:y})}),s.description&&e.jsx(p,{title:"Description",className:"!max-w-xl",children:e.jsx("p",{className:"text-muted-foreground tracking-wider font-mono",children:s.description})}),e.jsx(p,{title:"Organisé par",children:e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("img",{src:s.organization.logo,alt:s.organization.name,className:"w-12 h-12 rounded-full"}),e.jsx("div",{className:"w-fit max-w-[300px] gap-12 flex items-center justify-between",children:e.jsxs("div",{children:[e.jsx("h4",{className:"text-primary text-md font-semibold",children:s.organization.name}),e.jsxs("p",{className:"text-black text-sm",children:[s.organization.events_count," ","événements"]})]})})]})}),s.tags.length>0&&e.jsx(p,{title:"Vibes",children:e.jsx("ul",{className:"!max-w-xl flex flex-wrap items-center gap-2",children:s.tags.map((t,d)=>e.jsx("li",{className:"px-5 py-2 border border-white/5 rounded-full bg-black/10",children:e.jsx("span",{className:"text-black/50 uppercase text-sm font-semibold tracking-wide",children:t})},d))})}),e.jsxs(p,{title:"Lieu",children:[e.jsx("ul",{className:"text-black mb-4",children:e.jsxs("li",{className:"flex items-center gap-6",children:[e.jsx("div",{children:e.jsx(v,{})}),e.jsxs("div",{className:"w-ful py-4",children:[e.jsx("span",{className:"",children:_(s.location)})," "]})]})}),e.jsx("div",{className:"w-full h-[186px] rounded-lg overflow-hidden",children:e.jsx(L,{apiKey:"AIzaSyCBSL2QY5gvl7EiXFTs-K2R1rQ6qrbEN5E",children:e.jsx(P,{style:{width:"100%",height:"186px",borderRadius:"16px"},zoom:16,center:{lat:s.coords.lat,lng:s.coords.lng},mapId:"35f7ad3bd275c6c",disableDefaultUI:!0,children:e.jsx(Q,{position:{lat:s.coords.lat,lng:s.coords.lng},children:e.jsx(v,{})})})})})]})]}),C&&e.jsx(V,{admissionsSelected:n,extrasSelected:r,post:g})]})]})]})]})},O=({event:s,onScroll:i})=>{const a=R(new Date(s.start_date),new Date),c=a>0?`L'événement commence dans ${a} jour${a>1?"s":""}`:a===0?"L'événement commence aujourd'hui":`L'événement s'est terminé il y a ${Math.abs(a)} jour${Math.abs(a)>1?"s":""}`,n=s.price==="sold_out";return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"absolute top-0 left-0 w-full h-[60vh] blur-3xl z-0",children:e.jsx("img",{src:`${s.image}`,alt:s.name,className:"w-full h-full object-cover opacity-40"})}),e.jsx("div",{className:"bg-primary pt-16 lg:pt-0",children:e.jsxs(E,{className:"py-12 gap-10 lg:gap-16 flex flex-col-reverse lg:flex-row items-center justify-between ",children:[e.jsxs("div",{className:"shrink-0 w-full lg:w-1/3 grow-0 lg:min-h-[70vh] flex flex-col gap-4 justify-center z-30",children:[e.jsx("h2",{className:"text-4xl font-black uppercase text-primary-foreground",children:s.name}),e.jsxs("div",{className:"text-sm text-primary-foreground tracking-wide",children:["Par"," ",e.jsx("span",{className:"font-semibold text-accent",children:s.organization.name})]}),e.jsxs("ul",{className:"text-primary-foreground",children:[e.jsxs("li",{className:"flex items-center gap-6",children:[e.jsx("div",{children:e.jsx($,{})}),e.jsx("div",{className:"w-full text-muted border-white/10 border-b py-4",children:T(new Date(s.start_date),new Date(s.end_date))?e.jsxs(e.Fragment,{children:[x(new Date(s.start_date),"EEEE dd/MM/yyyy",{locale:h})," ",e.jsxs("span",{className:"text-white",children:[" ","de"," "]}),x(new Date(s.start_date),"HH:mm",{locale:h})," ",e.jsx("span",{className:"text-white",children:"à"})," ",x(new Date(s.end_date),"HH:mm",{locale:h})]}):e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"text-white",children:"Du"})," ",x(new Date(s.start_date),"EE dd/MM/yyyy",{locale:h})," ",e.jsx("span",{className:"text-white",children:"à"})," ",x(new Date(s.start_date),"HH:mm",{locale:h})," ",e.jsx("br",{}),e.jsx("span",{className:"text-white",children:"Au"})," ",x(new Date(s.end_date),"EE dd/MM/yyyy",{locale:h})," ",e.jsx("span",{className:"text-white",children:"à"})," ",x(new Date(s.end_date),"HH:mm",{locale:h})," "]})})]}),e.jsxs("li",{className:"flex items-center gap-6",children:[e.jsx("div",{children:e.jsx(v,{})}),e.jsxs("div",{className:"w-full text-muted-foreground py-4",children:[e.jsx("span",{className:"text-primary-foreground",children:_(s.location)})," "]})]})]}),e.jsx("div",{className:"flex flex-col lg:flex-row gap-4 ",children:e.jsx(j,{variant:"customer_blue",className:"w-full",onClick:i,disabled:n,children:n?"Épuisé":`Maintenant à ${s.price.toFixed(2)} €`})}),e.jsx("p",{className:"text-primary-foreground text-sm text-center lg:text-left",children:c})]}),e.jsx("div",{className:"w-full lg:max-w-xl xl:max-w-3xl z-40",children:e.jsx("img",{className:"w-full object-cover aspect-video rounded-sm shadow-2xl",src:`${s.image}`,alt:s.name})})]})})]})},V=({admissionsSelected:s,extrasSelected:i,post:a})=>{const[c,n]=u.useState(!0),f=[...s,...i].map(({price:r,quantity:m})=>r*m).reduce((r,m)=>r+m,0).toFixed(2);return e.jsxs("div",{className:N("fixed right-0 left-0 bottom-0 md:relative bg-white z-40 md:bg-background rounded-lg self-start text-black overflow-hidden transition-all duration-300",c?"max-h-[500px] md:!max-w-full ":"max-h-14 md:!max-w-full"),children:[e.jsx("h3",{className:"p-4 pb-0 text-lg font-semibold flex justify-between items-center cursor-pointer md:cursor-auto",onClick:()=>n(!c),children:"Récapitulatif"}),e.jsxs("div",{className:N("transition-opacity duration-300 md:opacity-100",c?"opacity-100 md:opacity-100":"opacity-0 md:opacity-100"),children:[e.jsx("ul",{className:"space-y-4 my-4 md:space-y-6 md:py-4",children:[...s,...i].map(({id:r,name:m,price:b,quantity:g},w)=>{const y=(b*g).toFixed(2);return e.jsxs("li",{className:"px-4",children:[e.jsx("h4",{className:"font-medium text-sm",children:m}),e.jsxs("div",{className:"flex items-center justify-between",children:["x ",g," ",e.jsxs("span",{children:[y," €"]})]})]},w)})}),e.jsxs("div",{className:"p-4 border-t",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("span",{children:"Total"}),e.jsxs("span",{children:[f,"€"]})]}),e.jsx(j,{onClick:()=>a(route("payment.checkout")),variant:"customer_primary",className:"w-full mt-4",children:"Payer"})]})]})]})},p=({children:s,className:i,title:a,...c})=>e.jsxs("section",{className:N("!max-w-3xl py-8",i),...c,children:[e.jsx("h3",{className:"text-black text-2xl font-semibold mb-4",children:a}),s]}),k=({tickets:s,onUpdateQuantity:i})=>e.jsx("div",{className:"grid grid-cols-1 gap-4 mt-6",children:Object.values(s).map(a=>e.jsx(U,{ticket:a,onUpdateQuantity:i},a.id))}),U=({ticket:s,onUpdateQuantity:i})=>{const[a,c]=u.useState(0),n=()=>{c(r=>r+1),i(s,a+1)},f=()=>{a>0&&(c(r=>r-1),i(s,a-1))};return e.jsxs("div",{className:"border-black/5 border-2 p-6 flex items-center justify-between gap-4",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx("h4",{className:"text-primary text-lg font-semibold",children:s.name}),s.description&&e.jsx("p",{className:"text-black text-sm font-mono",children:s.description})]}),e.jsxs("p",{className:"text-black font-medium text-sm",children:[s.price," €"]})]}),e.jsx("div",{className:"flex items-center gap-2",children:a===0?e.jsx(j,{variant:"customer_yellow",onClick:n,disabled:s.sold===s.quantity,children:s.sold===s.quantity?"Épuisé":"Ajouter"}):e.jsxs(e.Fragment,{children:[e.jsx(j,{variant:"customer_blue",className:"!px-4 !py-3 uppercase !font-semibold w-8 h-8 grid place-content-center rounded-full",onClick:f,children:"-"}),e.jsx("span",{className:"text-black",children:a}),e.jsx(j,{variant:"customer_blue",className:"!px-4 !py-3 uppercase !font-semibold w-8 h-8 grid place-content-center rounded-full",onClick:n,children:"+"})]})})]})};export{ee as default};

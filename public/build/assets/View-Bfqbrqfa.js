import{j as s,a as r}from"./app-qijFDi4_.js";import{C as x,a as c,M as m}from"./CustomerLayout-B0gZw-mh.js";import{B as i}from"./button-Bw7rl0P3.js";import{i as u,a as t,d as h}from"./utils-Di4cwZjX.js";import{f as l}from"./format-Byq5l0Xu.js";import{f as o}from"./fr-BPQ7ghFf.js";import"./createLucideIcon-D8zq1ggz.js";import"./x-BhZWoDGH.js";const M=({events:e})=>s.jsxs(x,{isHome:!0,background:!1,children:[s.jsxs("section",{className:"z-auto flex items-center bg-primary  w-full h-[632px]",children:[s.jsxs(c,{className:"relative z-10 space-y-6",children:[s.jsx("h1",{className:"text-4xl md:text-6xl w-full md:w-[75%] font-black text-white",children:"trouve des evenements proche de chez TOI"}),s.jsx(r,{href:route("dashboard"),className:"block",children:s.jsxs(i,{variant:"customer_yellow",className:"w-full md:w-auto",children:["Je veux publier un événement",s.jsx(m,{size:16,strokeWidth:3,className:"ml-2"})]})})]}),s.jsx("img",{src:"/images/hero-bg.png",alt:"hero",className:"absolute top-0 right-0 h-[632px] object-cover -z-0"})]}),s.jsx("section",{className:"py-16",children:s.jsxs(c,{className:"flex flex-col",children:[s.jsx("h2",{className:"font-bold text-2xl",children:"Evenements"}),s.jsx("div",{className:"grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 my-10",children:e.map(a=>s.jsx(p,{event:a},a.id))}),s.jsx(r,{href:route("customer.events.index"),className:"mx-auto block",children:s.jsxs(i,{variant:"customer_yellow",className:"mx-auto",children:[u()?"Voir plus":"DECOUVRIR PLUS D'EVENEMENTS",s.jsx(m,{size:16,strokeWidth:3,className:"ml-2"})]})})]})})]}),p=({event:e})=>{const a=t(l(e.start_date,"EEEE dd MMM",{locale:o})),d=t(l(e.start_date,"HH:mm",{locale:o})),n=t(l(e.end_date,"EEEE dd MMM",{locale:o}));return s.jsxs(r,{href:route("customer.events.show",{slug:e.slug}),children:[s.jsx("div",{className:"w-full aspect-video mb-2",children:s.jsx("img",{src:`${e.image}`,alt:e.name,className:"w-full h-full object-cover"})}),s.jsx("h2",{className:"text-lg font-medium truncate",children:e.name}),s.jsx("span",{className:"block text-sm font-mono uppercase font-medium truncate",children:h({street:e.location.street,city:e.location.city,zip_code:e.location.zip_code,country:e.location.country})}),s.jsx("div",{className:"flex items-center gap-4 text-semibold font-mono font-semibold text-sm mb-2 text-black/50",children:e.start_date&&e.end_date?s.jsxs("p",{className:"flex flex-row gap-2",children:[s.jsx("span",{className:"",children:a}),"-",s.jsx("span",{className:"",children:n})]}):s.jsxs("p",{className:"text-secondary",children:[a," | ",d]})}),s.jsxs("span",{className:"block font-medium",children:[e.price," €"]})]},e.id)};export{p as EventCard,M as default};

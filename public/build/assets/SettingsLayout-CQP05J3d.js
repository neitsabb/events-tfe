import{j as s,a as i}from"./app-BSg7tcV-.js";import{c as x}from"./utils-B0fn8ihL.js";import{b as p}from"./button-CrsewIh4.js";import{S as d}from"./AuthenticatedLayout-D4oF8_0h.js";const g=({className:a,items:t,getRoute:l,isActive:r,...n})=>{const c=e=>{const m=window.location.pathname.split("/").pop();return e.subpanel==="general"?m==="settings":m===e.subpanel};return s.jsx("nav",{className:x("flex space-x-2 overflow-x-auto md:flex-col md:space-x-0 md:space-y-1 mb-4 lg:mb-0",a),...n,children:t.map(e=>{const o=r?r(e):c(e);return s.jsx(i,{href:l(e),className:x(p({variant:"ghost"}),{"bg-muted hover:bg-muted":o,"hover:bg-transparent hover:underline":!o},"justify-start"),children:e.title},e.subpanel||e.title)})})},b=({title:a,description:t,sidebarNavItems:l,getRoute:r,isActive:n,children:c})=>s.jsxs("div",{className:"space-y-8",children:[a&&t?s.jsxs(s.Fragment,{children:[s.jsxs("div",{className:"space-y-0.5 mt-8",children:[s.jsx("h2",{className:"text-2xl font-bold tracking-tight",children:a}),s.jsx("p",{className:"text-muted-foreground text-sm",children:t})]}),s.jsx(d,{className:"my-6"})]}):null,s.jsxs("div",{className:"flex flex-col lg:flex-row lg:space-x-6 lg:space-y-0",children:[s.jsx("aside",{className:"lg:w-1/5",children:s.jsx(g,{items:l,getRoute:r,isActive:n})}),s.jsx("div",{className:"flex-1 space-y-6",children:c})]})]});export{b as S};
import{j as e,r as m,q as h,a as t}from"./app-B8O0964f.js";import{c as r,B as n}from"./button-YW7AvVGk.js";import{c}from"./createLucideIcon-CH3lftcQ.js";import{X as d}from"./x-DhpbibXZ.js";/**
 * @license lucide-react v0.419.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=c("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]);/**
 * @license lucide-react v0.419.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=c("MoveUpRight",[["path",{d:"M13 5H19V11",key:"1n1gyv"}],["path",{d:"M19 5L5 19",key:"72u4yj"}]]),x=({children:s,className:l})=>e.jsx("div",{className:r("container !max-w-7xl",l),children:s}),j=({isHome:s,background:l})=>{const[a,i]=m.useState(!1),{auth:{user:o}}=h().props;return e.jsxs(e.Fragment,{children:[e.jsxs("header",{className:r("z-10  w-full flex h-24 items-center justify-between text-white",s?"absolute top-0 left-0":"bg-transparent text-black"),children:[!s&&e.jsx("img",{src:"/images/header-bg.png",alt:"header",className:"absolute top-0 right-0 -z-0"}),e.jsxs(x,{className:"flex items-center justify-between z-50",children:[e.jsxs("div",{className:r("flex items-center gap-16",l||s?"text-white":"text-black"),children:[e.jsx(t,{href:"/",children:e.jsx("h1",{className:"text-2xl font-bold",children:"EVENTURA"})}),e.jsx("nav",{className:"hidden lg:flex",children:e.jsx("ul",{className:r("flex items-center gap-6 uppercase text-sm font-medium"),children:e.jsx("li",{className:"hover:-translate-y-[2px] transition-transform",children:e.jsx(t,{href:"/events",children:"Découvrir les événements"})})})})]}),e.jsxs("div",{className:"hidden lg:flex lg:items-center lg:gap-8",children:[e.jsxs(t,{href:route("dashboard"),className:r("text-sm underline decoration-2 underline-offset-4 flex items-center text-muted transition-colors",s?"hover:text-white":"hover:text-black"),children:["Je suis un organisateur",e.jsx(f,{size:16,strokeWidth:3,className:"ml-2"})]}),e.jsx(t,{href:route(o?"customer.me.profile":"login"),children:e.jsx(n,{variant:s?"customer_blue":"customer_yellow",children:o?"Mon compte":"Se connecter / S'inscrire"})})]}),e.jsx(n,{variant:"customer_yellow",className:"aspect-square rounded-full !px-0 lg:hidden",onClick:()=>i(!a),children:e.jsx(u,{strokeWidth:2})})]})]}),e.jsxs("div",{className:r("lg:hidden text-black fixed top-0 left-0 bottom-0 w-full bg-primary bg-opacity-90 z-50 transition-transform transform duration-300 px-4",a?"translate-x-0":"translate-x-full"),children:[e.jsx(t,{href:"/",className:"absolute top-8 left-4",children:e.jsx("h1",{className:"text-2xl font-bold text-white",children:"EVENTURA"})}),e.jsx(n,{variant:"none",className:"aspect-square rounded-full !px-0 lg:hidden absolute right-4 top-7 text-white hover:text-accent",onClick:()=>i(!a),children:e.jsx(d,{strokeWidth:2})}),e.jsxs("ul",{className:"flex flex-col justify-center mt-24 font-integral font-semibold text-xl gap-6 text-white [&>*]:transition-colors [&>*]:duration-300 ",children:[e.jsx("li",{className:"hover:text-secondary leading-6",children:e.jsx(t,{href:"/events",children:"découvrir les événements"})}),e.jsx("li",{className:"hover:text-secondary leading-6",children:e.jsx(t,{href:route("dashboard"),children:"je suis un organisateur"})}),e.jsx("li",{className:"hover:text-secondary leading-6",children:e.jsx(t,{href:"/me",children:"Mon compte"})})]})]})]})};function y({children:s,isHome:l=!1,background:a=!1}){return e.jsxs("div",{className:r("customer-theme min-h-screen bg-background font-integral",a?"bg-primary":"bg-background"),children:[e.jsx(j,{isHome:l,background:a}),e.jsx("main",{className:"z-40",children:s}),e.jsx("footer",{className:"h-[333px] bg-primary text-white py-10 relative z-0",children:e.jsxs(x,{className:"flex flex-col items-start justify-between h-full z-50",children:[e.jsx("img",{src:"/images/logo.svg",alt:"Eventura"}),e.jsx("nav",{className:"mt-auto",children:e.jsxs("ul",{className:"cursor-pointer flex flex-col uppercase text-sm font-medium z-50 absolute md:relative bottom-4",children:[e.jsx("li",{className:"hover:-translate-y-[2px] transition-transform",children:e.jsx(t,{href:"#",children:"EVENEMENTS"})}),e.jsx("li",{className:"hover:-translate-y-[2px] transition-transform",children:"MON COMPTE"}),e.jsx("li",{className:"hover:-translate-y-[2px] transition-transform",children:"PARTENAIRES"}),e.jsx("li",{className:"hover:-translate-y-[2px] transition-transform",children:"MENTIONS LEGALES"}),e.jsx("li",{className:"hover:-translate-y-[2px] transition-transform",children:"COOKIES"})]})}),e.jsx("img",{src:"/images/footer-bg.png",alt:"footer",className:"absolute right-0 bottom-0 z-10"})]})})]})}export{y as C,f as M,x as a};

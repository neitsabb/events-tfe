import{q as o,r as a,j as e}from"./app-FSxDIhYd.js";import{B as l}from"./button-4CThn5Rc.js";import{D as n,a as m,b as c,c as p,d as u,e as d}from"./dialog-nkotfy8D.js";import{P as x}from"./react-icons.esm-CIjgWKdx.js";import{CreateTicketForm as j}from"./CreateTicketForm-DvB168w0.js";import"./index-Cev0qjhR.js";import"./index-XGTWT46k.js";import"./Field-arf_Kbr3.js";import"./label-CfUuw5UX.js";import"./textarea-BpLq-t0F.js";import"./use-toast-Da-wStD8.js";const B=({event:r})=>{const{props:i}=o(),[t,s]=a.useState(!1);return e.jsxs(n,{open:t,children:[e.jsx(m,{asChild:!0,children:e.jsxs(l,{variant:"outline",onClick:()=>s(!0),disabled:!i.permissions.event.tickets.create,children:[e.jsx(x,{className:"mr-2"}),"Nouveau billet"]})}),e.jsxs(c,{className:"w-[90%] sm:max-w-[525px] h-auto md:w-full",children:[e.jsxs(p,{children:[e.jsx(u,{children:"Créer un nouveau billet"}),e.jsx(d,{children:"Veuillez remplir les champs ci-dessous pour continuer."})]}),e.jsx(j,{eventId:r.id,setOpen:s})]})]})};export{B as CreateTicketDialog};
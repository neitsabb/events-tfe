import{j as n}from"./app-BSg7tcV-.js";import{A as r}from"./AuthenticatedLayout-D4oF8_0h.js";import{S as l}from"./SettingsLayout-CQP05J3d.js";const p=[{title:"Informations générales",panel:"general"},{title:"Membres",panel:"team"},{title:"Banque",panel:"banking"}],c=({children:a})=>{const s=t=>`/dashboard/organisations/settings${t.panel&&t.panel!=="general"?`/${t.panel}`:""}`,o=t=>{const e=window.location.pathname.split("/").pop();return e==="settings"&&t.panel==="general"?!0:e===t.panel};return n.jsx(r,{children:n.jsx(l,{sidebarNavItems:p,getRoute:s,isActive:o,title:"Paramètres de l'organisation",description:"Gérez les informations de votre organisation et les membres de votre équipe.",children:a})})};export{c as O};
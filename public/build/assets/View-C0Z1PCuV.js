import{q as m,W as g,j as t}from"./app-DXmYKjII.js";import{F as d}from"./FormSection-BjJr93YO.js";import{C as c}from"./AuthenticatedLayout-C4DF0eba.js";import{t as u}from"./use-toast-BsyA_qp5.js";import{O as l}from"./OrganizationSettingsLayout-Cg_G_T3e.js";import"./button-LZ4wRFbW.js";import"./card-CuGzDSOC.js";import"./index-C6-qIfEc.js";import"./react-icons.esm-CAXhoAqS.js";import"./dialog-D9adzbkq.js";import"./index-BuPIZ-AS.js";import"./label-tNeaSNz9.js";import"./select-CrUPgAsN.js";import"./chevron-right-CN41uBaB.js";import"./createLucideIcon-CPppSJ9e.js";import"./index-CetX8bG5.js";import"./index-DjScTqDP.js";import"./index-AgMcfRjB.js";import"./check-BofULwe7.js";import"./textarea-BSSvU6my.js";import"./Field-B26kDbwt.js";import"./dropdown-menu-xnroSMVo.js";import"./SettingsLayout-CaWp4_yh.js";const B=()=>{const{auth:o}=m().props,{data:i,setData:r,post:e,errors:n}=g({name:o.organizationLogged.name,type:o.organizationLogged.type,description:o.organizationLogged.description,website:o.organizationLogged.website,logo:o.organizationLogged.logo}),a=s=>{s.preventDefault(),e(route("organizations.update",o.organizationLogged.id),{onSuccess:({props:{flash:p}})=>{u({title:"Succès",description:p.success})}})};return t.jsx(l,{children:t.jsx(d,{title:"Informations générales",description:"Vous pouvez éditer les informations générales de votre organisation ici.",onSubmit:a,children:t.jsx(c,{data:i,errors:n,setData:r})})})};export{B as default};

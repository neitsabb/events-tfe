import{q as m,W as g,j as t}from"./app-qijFDi4_.js";import{F as d}from"./FormSection-z1Xzx2g9.js";import{C as c}from"./AuthenticatedLayout-kZ0ruG7C.js";import{t as u}from"./use-toast-B9KH-dZ1.js";import{O as l}from"./OrganizationSettingsLayout-Cnfs3459.js";import"./button-Bw7rl0P3.js";import"./utils-Di4cwZjX.js";import"./card-5VrrA9nZ.js";import"./avatar-CdZvAEJg.js";import"./index-BJuTwMzb.js";import"./react-icons.esm-B_QH4jkH.js";import"./dialog-33l9bfr1.js";import"./index-1QdY4h2j.js";import"./label-BFttLCBn.js";import"./select-BFpH6B09.js";import"./index-B3zxlze2.js";import"./index-CwBatNrT.js";import"./index-BTQR_pCt.js";import"./index-rnhLPvwg.js";import"./createLucideIcon-D8zq1ggz.js";import"./textarea-DUaatCdz.js";import"./Field-DkKyvpSt.js";import"./index-FSPNRT7I.js";import"./chevron-right-C83Bcc05.js";import"./SettingsLayout-DuzedpB9.js";const H=()=>{const{auth:o}=m().props;console.log(o.organizationLogged);const{data:i,setData:r,post:e,errors:n}=g({name:o.organizationLogged.name,type:o.organizationLogged.type,description:o.organizationLogged.description,website:o.organizationLogged.website,logo:o.organizationLogged.logo}),a=s=>{s.preventDefault(),e(route("organizations.update",o.organizationLogged.id),{onSuccess:({props:{flash:p}})=>{u({title:"Succès",description:p.success})}})};return t.jsx(l,{children:t.jsx(d,{title:"Informations générales",description:"Vous pouvez éditer les informations générales de votre organisation ici.",onSubmit:a,children:t.jsx(c,{data:i,errors:n,setData:r})})})};export{H as default};

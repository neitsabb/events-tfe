import{q as s,W as m,j as t}from"./app-B8O0964f.js";import{F as n}from"./FormSection-zw9xs3eg.js";import{B as c}from"./button-YW7AvVGk.js";import{O as a}from"./OrganizationSettingsLayout-B9qVKxfm.js";import"./card-BX3UTc7A.js";import"./AuthenticatedLayout-fqukK14P.js";import"./index-GGXSu8f6.js";import"./react-icons.esm-C09Qz6R5.js";import"./dialog-DmYbyGqV.js";import"./index-BYucJXNH.js";import"./label-DwsXhYQC.js";import"./select-DUoClp4t.js";import"./chevron-right-Bcdrrr3U.js";import"./createLucideIcon-CH3lftcQ.js";import"./index-CS2GB-k9.js";import"./index-DrwCB3Lc.js";import"./index-DxdC_eHi.js";import"./check-CkFbTOeR.js";import"./textarea-D9dkLJXe.js";import"./Field-WCVMzMtq.js";import"./use-toast-DmJmvKL4.js";import"./dropdown-menu-mp1_4t-3.js";import"./SettingsLayout-B34lowpy.js";const C=()=>{const{auth:o,required_actions:r}=s().props,{post:e,processing:i}=m(),p=()=>{e(route("organizations.stripe.connect"))};return t.jsx(a,{children:t.jsx(n,{title:"Etat de votre compte Stripe",description:"Pour recevoir des paiements, vous devez lier votre compte Stripe.",children:t.jsx("div",{className:"text-sm text-secondary-foreground",children:o.organizationLogged.stripe_status==="complete"?r?"Vous avez lié votre compte Stripe, mais il reste des actions à effectuer.":"Votre compte Stripe est lié et prêt à recevoir des paiements.":t.jsx(c,{onClick:p,disabled:i,children:"Lier mon compte Stripe"})})})})};export{C as View,C as default};

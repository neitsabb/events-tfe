import{q as s,W as m,j as t}from"./app-XS3yalVP.js";import{F as n}from"./FormSection-Dup22SxE.js";import{B as c}from"./button-QYAymDF9.js";import{O as a}from"./OrganizationSettingsLayout-Dv0PsZ4w.js";import"./card-C_ag-E3t.js";import"./AuthenticatedLayout-VBrNjZoT.js";import"./index-CNpfTyVb.js";import"./react-icons.esm-Cs_vHbYx.js";import"./dialog-DlWTZ0AV.js";import"./index-CtzMndQ0.js";import"./label-CyqlbcB6.js";import"./select-CibionoB.js";import"./chevron-right-EKKQYDPz.js";import"./createLucideIcon-CmdL_aFk.js";import"./index-CSV9-Fe5.js";import"./index-pNR7ng0I.js";import"./index-BtUeGfbK.js";import"./check-Dbisva_4.js";import"./textarea-AT8eOtga.js";import"./Field-qik0uBFH.js";import"./use-toast-Dn4lWuEh.js";import"./dropdown-menu-cZMEmnfF.js";import"./SettingsLayout-D2gjMaSU.js";const C=()=>{const{auth:o,required_actions:r}=s().props,{post:e,processing:i}=m(),p=()=>{e(route("organizations.stripe.connect"))};return t.jsx(a,{children:t.jsx(n,{title:"Etat de votre compte Stripe",description:"Pour recevoir des paiements, vous devez lier votre compte Stripe.",children:t.jsx("div",{className:"text-sm text-secondary-foreground",children:o.organizationLogged.stripe_status==="complete"?r?"Vous avez lié votre compte Stripe, mais il reste des actions à effectuer.":"Votre compte Stripe est lié et prêt à recevoir des paiements.":t.jsx(c,{onClick:p,disabled:i,children:"Lier mon compte Stripe"})})})})};export{C as View,C as default};

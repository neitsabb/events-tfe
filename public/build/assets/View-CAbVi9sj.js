import{q as m,W as s,j as t}from"./app-BSg7tcV-.js";import{F as n}from"./FormSection-MHh8IyQl.js";import{B as c}from"./button-CrsewIh4.js";import{O as a}from"./OrganizationSettingsLayout-D450A3Qj.js";import"./card-CJqWb7OU.js";import"./utils-B0fn8ihL.js";import"./index-Bb4qSo10.js";import"./AuthenticatedLayout-D4oF8_0h.js";import"./avatar-ButMWc8x.js";import"./index-B6FVuNCK.js";import"./index-Dhe9Iuj7.js";import"./react-icons.esm-CCC4ONUB.js";import"./dialog-BHgiNgJn.js";import"./index-Ds_mV5rb.js";import"./label-CCQKrebs.js";import"./select-81fZS2R4.js";import"./index-DxOe1-pG.js";import"./index-DYbuBnVH.js";import"./index-C1gOTv3o.js";import"./index-jbec320_.js";import"./createLucideIcon-Dgyn1mPU.js";import"./textarea-WMTxw_PN.js";import"./Field-B_QrgzO7.js";import"./use-toast-DL6Jf7Lj.js";import"./index-Dxh5GxJh.js";import"./chevron-right-9hEqs-4T.js";import"./SettingsLayout-CQP05J3d.js";const W=()=>{const{auth:r,required_actions:o}=m().props,{post:e,processing:i}=s(),p=()=>{e(route("organizations.stripe.connect"))};return console.log(o),t.jsx(a,{children:t.jsx(n,{title:"Etat de votre compte Stripe",description:"Pour recevoir des paiements, vous devez lier votre compte Stripe.",children:t.jsx("div",{className:"text-sm text-secondary-foreground",children:r.organizationLogged.stripe_status==="complete"?o?"Vous avez lié votre compte Stripe, mais il reste des actions à effectuer.":"Votre compte Stripe est lié et prêt à recevoir des paiements.":t.jsx(c,{onClick:p,disabled:i,children:"Lier mon compte Stripe"})})})})};export{W as View,W as default};
import{q as s,W as m,j as t}from"./app-BjcKcwr-.js";import{F as n}from"./FormSection-CYR5Mo4p.js";import{B as c}from"./button-DMukzNLy.js";import{O as a}from"./OrganizationSettingsLayout-DCI21HV1.js";import"./card-esSz52K-.js";import"./AuthenticatedLayout-CRNI5qZP.js";import"./index-DcoDL6V2.js";import"./react-icons.esm-RB3DlfZr.js";import"./dialog-D4EdPLEX.js";import"./index-PpX3TpKa.js";import"./label-DJYEKtZr.js";import"./select-ey1IT2IY.js";import"./chevron-right-qy3Cbi4e.js";import"./createLucideIcon-UZKk8F8v.js";import"./index-DoNYk-qA.js";import"./index-Ci-um0eu.js";import"./index-CmAw091w.js";import"./check-BAjd3385.js";import"./textarea-DKfxn4ZM.js";import"./Field-DHuqBj1V.js";import"./use-toast-Du8edPdN.js";import"./dropdown-menu-C5MSMyQk.js";import"./SettingsLayout-8GVhhDY4.js";const C=()=>{const{auth:o,required_actions:r}=s().props,{post:e,processing:i}=m(),p=()=>{e(route("organizations.stripe.connect"))};return t.jsx(a,{children:t.jsx(n,{title:"Etat de votre compte Stripe",description:"Pour recevoir des paiements, vous devez lier votre compte Stripe.",children:t.jsx("div",{className:"text-sm text-secondary-foreground",children:o.organizationLogged.stripe_status==="complete"?r?"Vous avez lié votre compte Stripe, mais il reste des actions à effectuer.":"Votre compte Stripe est lié et prêt à recevoir des paiements.":t.jsx(c,{onClick:p,disabled:i,children:"Lier mon compte Stripe"})})})})};export{C as View,C as default};

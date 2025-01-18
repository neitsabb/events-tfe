import{r as b,W as C,j as r}from"./app-BSg7tcV-.js";import{I as y}from"./label-CCQKrebs.js";import{F}from"./Field-B_QrgzO7.js";import{C as P}from"./checkbox-63pTX6WN.js";import{F as v}from"./FormSection-MHh8IyQl.js";import{t as S}from"./use-toast-DL6Jf7Lj.js";import"./utils-B0fn8ihL.js";import"./index-Dhe9Iuj7.js";import"./index-Bb4qSo10.js";import"./index-B6FVuNCK.js";import"./index-jbec320_.js";import"./createLucideIcon-Dgyn1mPU.js";import"./index-C1gOTv3o.js";import"./button-CrsewIh4.js";import"./card-CJqWb7OU.js";const B=({event:t})=>{var x;const[n,o]=b.useState(()=>{const e=[{key:"legal_age",value:null},{key:"required_fields",value:[]}];return!t.preferences||t.preferences.length===0?e:e.map(s=>t.preferences.find(a=>a.key===s.key)||s)}),{data:l,setData:d,post:m}=C({preferences:n}),j=(e,s)=>{o(i=>i.map(a=>a.key===e?{...a,value:s}:a))};b.useEffect(()=>{console.log("Updating data",n),d("preferences",n)},[n]);const g=e=>{e.preventDefault(),console.log("Submitting preferences",l),m(route("events.update",{id:t.id}),{onSuccess:s=>{console.log("Preferences updated"),S({title:"Succès",description:s.props.flash.success})},onError:s=>{console.log("An error occurred",s)}})},p=(e,s)=>{o(i=>{const a=[...i],h=a.find(c=>c.key==="required_fields");if(h){const c=h.value;if(s)c.push(e);else{const k=c.indexOf(e);k>-1&&c.splice(k,1)}h.value=c}return a})},u=e=>{const s=n.find(i=>i.key==="required_fields");return s?s.value.includes(e):!1};return r.jsxs(r.Fragment,{children:[r.jsx(v,{title:"Âge légal",description:"Vous pouvez fixer un âge minimum pour votre événement ici.",onSubmit:g,children:r.jsx(F,{label:"Âge minimum",id:"age",className:"pt-8",children:r.jsxs("div",{className:"flex items-center gap-4",children:[r.jsx(y,{type:"number",name:"age",className:"w-24 h-12",value:(x=n.find(e=>e.key==="legal_age"))==null?void 0:x.value,onChange:e=>j("legal_age",e.target.value?parseInt(e.target.value,10):null)}),r.jsx("span",{children:"ans"})]})})}),r.jsx(v,{title:"Champs obligatoires",description:"Vous pouvez choisir de demander des informations supplémentaires aux acheteurs de billets.",onSubmit:g,children:r.jsxs("div",{className:"space-y-3",children:[r.jsx(f,{id:"email",name:"email",label:"Email",checked:u("email"),onChange:e=>p("email",e.target.checked)}),r.jsx(f,{id:"phone",name:"phone",label:"Téléphone",checked:u("phone"),onChange:e=>p("phone",e.target.checked)}),r.jsx(f,{id:"birth",name:"birth",label:"Date de naissance",checked:u("birth"),onChange:e=>p("birth",e.target.checked)})]})})]})},f=({id:t,name:n,label:o,onChange:l,checked:d})=>r.jsxs("div",{className:"flex items-center space-x-2",children:[r.jsx(P,{id:t,name:n,checked:d,onCheckedChange:m=>l({target:{id:t,name:n,value:"",checked:!!m}})}),r.jsx("label",{htmlFor:t,children:o})]});export{B as PreferencesForm};

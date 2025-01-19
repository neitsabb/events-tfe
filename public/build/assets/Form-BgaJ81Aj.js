import{j as e,r as n,W as h}from"./app-BSg7tcV-.js";import{I as D,E as b,L as w}from"./GeneralStep-CluPZpyd.js";import{F as u}from"./Field-B_QrgzO7.js";import{F as j}from"./FormSection-MHh8IyQl.js";import{B as E}from"./button-CrsewIh4.js";import{I as _}from"./label-CCQKrebs.js";import{T as N}from"./textarea-WMTxw_PN.js";import{t as v}from"./use-toast-DL6Jf7Lj.js";import{d as y}from"./utils-B0fn8ihL.js";import"./index.esm-DQT5-vAg.js";import"./createLucideIcon-Dgyn1mPU.js";import"./isSameDay-CmgISKQ8.js";import"./format-Byq5l0Xu.js";import"./chevron-right-9hEqs-4T.js";import"./popover-Cbj3uuOo.js";import"./index-B6FVuNCK.js";import"./dialog-BHgiNgJn.js";import"./index-Ds_mV5rb.js";import"./index-Dhe9Iuj7.js";import"./index-DYbuBnVH.js";import"./index-C1gOTv3o.js";import"./index.modern-CyBs9gLA.js";import"./fr-BPQ7ghFf.js";import"./command-B1qCJl_3.js";import"./select-81fZS2R4.js";import"./index-DxOe1-pG.js";import"./index-jbec320_.js";import"./react-icons.esm-CCC4ONUB.js";import"./badge-DiBsXd1D.js";import"./index-Bb4qSo10.js";import"./x-CpmZOtQj.js";import"./card-CJqWb7OU.js";const le=({event:t})=>e.jsxs(e.Fragment,{children:[e.jsx(F,{event:t}),e.jsx(k,{event:t}),e.jsx(C,{event:t})]}),F=({event:t})=>{console.log(t);const[r,m]=n.useState(t.tags),{data:o,setData:d,errors:s,processing:c,post:p}=h({name:t.name,description:t.description,tags:r,image:t.image}),l=a=>{a.preventDefault(),console.log("Data",o),p(route("events.update",{id:t.id}),{onSuccess:({props:{flash:i}})=>{v({title:"Succès",description:i.success})},onError:i=>{console.log("Error while updating",i)}})};n.useEffect(()=>{d("tags",r)},[r]);const[x,g]=n.useState(!1);return e.jsxs(j,{title:"Paramètres de votre événement",description:"Vous pouvez modifier les paramètres généraux ici.",disabled:c,onSubmit:l,children:[e.jsx(u,{label:"Image de couverture",id:"cover",errors:s,required:!1,children:e.jsxs("div",{className:"flex items-center gap-4",children:[t.image&&e.jsx("img",{src:t.image,alt:"cover",className:"w-20 h-20 rounded-full shrink-0"}),x?e.jsx("div",{className:"flex items-center justify-center w-full",children:e.jsxs("label",{for:"dropzone-file",className:"flex flex-col items-center justify-center w-full h-36 border-input border  shadow-sm  rounded-md  cursor-pointer ",children:[e.jsxs("div",{className:"flex flex-col items-center justify-center pt-5 pb-6",children:[e.jsx("svg",{className:"w-8 h-8 mb-4 text-gray-400 dark:text-gray-400","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 20 16",children:e.jsx("path",{stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"})}),e.jsx("p",{className:"text-xs text-gray-400 dark:text-gray-400",children:"SVG, PNG, JPG ou JPEG. Max 2Mo"})]}),e.jsx("input",{id:"dropzone-file",type:"file",className:"hidden",onChange:a=>{d("image",a.target.files[0])}})]})}):e.jsx(E,{variant:"outline",onClick:()=>g(!0),children:"Modifier l'image"})]})}),e.jsx(u,{label:"Nom de votre événement",id:"name",errors:s,children:e.jsx(_,{name:"name",value:o.name,onChange:a=>d("name",a.target.value)})}),e.jsxs(u,{label:"Description",id:"description",required:!1,errors:s,children:[e.jsx(N,{name:"description",value:o.description,onChange:a=>d("description",a.target.value)}),s.description?e.jsx("p",{className:"text-xs text-red-500",children:s.description}):e.jsx("p",{className:"text-xs text-muted-foreground",children:"Écrivez quelques phrases à propos de votre événement."})]}),e.jsx(u,{label:"Mots clés",id:"tags",errors:s,children:e.jsx(D,{tags:r,setTags:m})})]})},k=({event:t})=>{const[r,m]=n.useState(new Date(t.start_date)),[o,d]=n.useState(new Date(t.end_date)),{data:s,setData:c,errors:p,processing:l,post:x}=h({start_date:r,end_date:o});n.useEffect(()=>{c(i=>({...i,start_date:r})),c(i=>({...i,end_date:o}))},[r,o]);const g=i=>{i.preventDefault();const S={...s,start_date:r,end_date:o};x(route("events.update",{id:t.id}),{data:S,preserveScroll:!0,onSuccess:({props:{flash:f}})=>{v({title:"Succès",description:f.success})},onError:f=>{console.log("Error while updating",f)}})},a=n.useMemo(()=>s.start_date!==t.start_date||s.end_date!==t.end_date,[s,t]);return e.jsx(j,{title:"Quand se déroule votre événement ?",description:"Vous pouvez modifier les dates et heures de votre événement ici.",disabled:!a||l,onSubmit:g,children:e.jsx(u,{label:"",id:"date",errors:p,children:e.jsx(b,{startDate:r,setStartDate:m,endDate:o,setEndDate:d})})})},C=({event:t})=>{const[r,m]=n.useState({lat:t.coords.lat,lng:t.coords.lng}),{setData:o,errors:d,post:s}=h({location:{street:"",city:"",country:"",zip_code:""},coords:{lat:r.lat,lng:r.lng}});n.useEffect(()=>{o("coords",r)},[r]);const c=p=>{p.preventDefault(),s(route("events.update",{id:t.id}),{preserveScroll:!0,onSuccess:({props:{flash:l}})=>{v({title:"Succès",description:l.success})},onError:l=>{console.log("Error while updating",l)}})};return e.jsx(j,{title:"Où se déroule votre événement ?",description:"Vous pouvez modifier le lieu de votre événement ici.",onSubmit:c,children:e.jsx(w,{setData:o,errors:d,coords:r,defaultValue:y(t.location),setCoords:m})})};export{le as GeneralForm};
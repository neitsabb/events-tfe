import{j as r,q as g,r as f,W as w,y as I}from"./app-BSg7tcV-.js";import{B as C}from"./button-CrsewIh4.js";import{I as d}from"./label-CCQKrebs.js";import{c as j}from"./utils-B0fn8ihL.js";import{E as A,P as R}from"./PaymentForm-C4Pj0w1A.js";import{PreferenceComponents as D}from"./PreferencesComponents-BpryRxun.js";import"./index-Bb4qSo10.js";import"./index-Dhe9Iuj7.js";import"./index-ClP4U42c.js";function q({children:o}){return r.jsxs("div",{className:j("min-h-screen"),children:[r.jsx("header",{className:"p-4 border-b",children:r.jsx("h1",{className:"font-bold text-2xl",children:"Eventura."})}),r.jsx("main",{className:j("z-50 relative max-w-xl mx-auto py-8"),children:o})]})}var k="https://js.stripe.com/v3",V=/^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/,E="loadStripe.setLoadParameters was called but an existing Stripe.js script already exists in the document; existing script parameters will be used",G=function(){for(var e=document.querySelectorAll('script[src^="'.concat(k,'"]')),t=0;t<e.length;t++){var n=e[t];if(V.test(n.src))return n}return null},y=function(e){var t="",n=document.createElement("script");n.src="".concat(k).concat(t);var s=document.head||document.body;if(!s)throw new Error("Expected document.body not to be null. Stripe.js requires a <body> element.");return s.appendChild(n),n},O=function(e,t){!e||!e._registerWrapper||e._registerWrapper({name:"stripe-js",version:"5.4.0",startTime:t})},m=null,v=null,x=null,T=function(e){return function(){e(new Error("Failed to load Stripe.js"))}},W=function(e,t){return function(){window.Stripe?e(window.Stripe):t(new Error("Stripe.js not available"))}},_=function(e){return m!==null?m:(m=new Promise(function(t,n){if(typeof window>"u"||typeof document>"u"){t(null);return}if(window.Stripe&&e&&console.warn(E),window.Stripe){t(window.Stripe);return}try{var s=G();if(s&&e)console.warn(E);else if(!s)s=y(e);else if(s&&x!==null&&v!==null){var a;s.removeEventListener("load",x),s.removeEventListener("error",v),(a=s.parentNode)===null||a===void 0||a.removeChild(s),s=y(e)}x=W(t,n),v=T(n),s.addEventListener("load",x),s.addEventListener("error",v)}catch(u){n(u);return}}),m.catch(function(t){return m=null,Promise.reject(t)}))},z=function(e,t,n){if(e===null)return null;var s=e.apply(void 0,t);return O(s,n),s},p,P=!1,b=function(){return p||(p=_(null).catch(function(e){return p=null,Promise.reject(e)}),p)};Promise.resolve().then(function(){return b()}).catch(function(o){P||console.warn(o)});var B=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];P=!0;var s=Date.now();return b().then(function(a){return z(a,t,s)})};const F=B("pk_test_51LhFu6AkcKIAKdYfNXkSzc17QelGz8ahfVTL7JRI2rziqgguRnBSq1ft9OrSm4i8ON19GEYo6rAxrrV0IneIjn2v00AIkebPi8"),te=()=>{const{auth:o,event:e}=g().props;console.log(e);const[t,n]=f.useState("preferences"),s=()=>{n("payment")};return r.jsx(q,{children:o!=null&&o.user?t==="preferences"&&e.preferences.length>0?r.jsx(M,{onContinue:s}):r.jsx(X,{}):r.jsx(U,{})})},M=({onContinue:o})=>{const{setData:e,errors:t,post:n}=w({legal_age:"",email:"",phone:"",birth:""}),{event:s}=g().props,a=(i,c)=>{e(i,c)},u=()=>{n(route("payment.checkout.preferences"),{preserveScroll:!0,onSuccess:o})};return r.jsxs("div",{className:"space-y-4",children:[r.jsx("h2",{className:"text-2xl font-black uppercase tracking-wider leading-none",children:"Informations supplémentaires"}),r.jsx("div",{children:s.preferences.map(i=>{if(i.value==="")return;const c=D[i.key];return c?r.jsx("div",{className:"mt-2",children:r.jsx(c,{value:i.value,onChange:a,errors:t})},i.key):r.jsx("div",{children:r.jsxs("p",{className:"text-red-500",children:["Aucun composant pour la préférence"," ",i.key]})},i.key)})}),r.jsx(C,{onClick:u,children:"Continuer"})]})},U=()=>{const{auth:o}=g().props,[e,t]=f.useState(""),[n,s]=f.useState("initial"),a=f.useRef(!1),{data:u,setData:i}=w({email:"",password:"",confirmEmail:"",confirmPassword:""}),{data:c,setData:S}=w({email:"",password:""}),N=l=>{const h=l.target.value;t(h),S("email",h),s("initial"),a.current=!1},L=async()=>{if(o!=null&&o.user)console.log("User authenticated, proceeding to checkout");else if(a.current)n==="exists"&&I.post(route("login.store"),{email:c.email,password:c.password,redirect_to:route("checkout")});else{if(!e)return;try{const h=await(await fetch(route("check.email",{email:e}))).json();a.current=!0,s(h?"exists":"notExists")}catch(l){s("initial"),console.error("Error checking email:",l)}}};return r.jsxs("div",{className:"space-y-4",children:[r.jsx("h2",{className:"text-2xl font-black uppercase tracking-wider leading-none",children:"Où est-ce qu'on envoie tes billets ?"}),r.jsxs("div",{children:[r.jsx("p",{className:"pb-2 text-secondary-foreground text-sm",children:"Entre ton e-mail pour te connecter ou créer un nouveau compte"}),r.jsx(d,{type:"email",placeholder:"Adresse e-mail",value:e,onChange:N}),n==="exists"&&r.jsx(d,{type:"password",placeholder:"Mot de passe",className:"mt-2",value:c.password,onChange:l=>S("password",l.target.value)}),n==="notExists"&&a.current&&r.jsxs(r.Fragment,{children:[r.jsx(d,{type:"email",placeholder:"Confirmation de l'email",className:"mt-2",value:u.confirmEmail,onChange:l=>i("confirmEmail",l.target.value)}),r.jsx(d,{type:"password",placeholder:"Mot de passe",className:"mt-2",value:u.password,onChange:l=>i("password",l.target.value)}),r.jsx(d,{type:"password",placeholder:"Confirmation du mot de passe",className:"mt-2",value:u.confirmPassword,onChange:l=>i("confirmPassword",l.target.value)})]}),r.jsx(C,{className:"w-full mt-4 uppercase !font-semibold tracking-wider",onClick:L,children:"Continuer la commande"})]})]})},X=()=>{const{paymentIntent:o,totalAmount:e,tickets:t}=g().props,n=f.useMemo(()=>({clientSecret:o}),[o]);return r.jsx(A,{stripe:F,options:n,children:r.jsx(R,{totalAmount:e,tickets:t,paymentIntent:o})})};export{te as default};
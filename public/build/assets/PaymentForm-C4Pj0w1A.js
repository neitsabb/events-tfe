import{R as i,q as J,r as q,j as o,y as pe}from"./app-BSg7tcV-.js";import{B as V}from"./button-CrsewIh4.js";import{P as u}from"./index-ClP4U42c.js";function $(r,e){var t=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);e&&(n=n.filter(function(c){return Object.getOwnPropertyDescriptor(r,c).enumerable})),t.push.apply(t,n)}return t}function D(r){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?$(Object(t),!0).forEach(function(n){G(r,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(t)):$(Object(t)).forEach(function(n){Object.defineProperty(r,n,Object.getOwnPropertyDescriptor(t,n))})}return r}function A(r){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?A=function(e){return typeof e}:A=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},A(r)}function G(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}function H(r,e){return fe(r)||de(r,e)||me(r,e)||he()}function fe(r){if(Array.isArray(r))return r}function de(r,e){var t=r&&(typeof Symbol<"u"&&r[Symbol.iterator]||r["@@iterator"]);if(t!=null){var n=[],c=!0,a=!1,l,m;try{for(t=t.call(r);!(c=(l=t.next()).done)&&(n.push(l.value),!(e&&n.length===e));c=!0);}catch(s){a=!0,m=s}finally{try{!c&&t.return!=null&&t.return()}finally{if(a)throw m}}return n}}function me(r,e){if(r){if(typeof r=="string")return F(r,e);var t=Object.prototype.toString.call(r).slice(8,-1);if(t==="Object"&&r.constructor&&(t=r.constructor.name),t==="Map"||t==="Set")return Array.from(r);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return F(r,e)}}function F(r,e){(e==null||e>r.length)&&(e=r.length);for(var t=0,n=new Array(e);t<e;t++)n[t]=r[t];return n}function he(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var v=function(e,t,n){var c=!!n,a=i.useRef(n);i.useEffect(function(){a.current=n},[n]),i.useEffect(function(){if(!c||!e)return function(){};var l=function(){a.current&&a.current.apply(a,arguments)};return e.on(t,l),function(){e.off(t,l)}},[c,t,e,a])},B=function(e){var t=i.useRef(e);return i.useEffect(function(){t.current=e},[e]),t.current},k=function(e){return e!==null&&A(e)==="object"},ye=function(e){return k(e)&&typeof e.then=="function"},ve=function(e){return k(e)&&typeof e.elements=="function"&&typeof e.createToken=="function"&&typeof e.createPaymentMethod=="function"&&typeof e.confirmCardPayment=="function"},K="[object Object]",ge=function r(e,t){if(!k(e)||!k(t))return e===t;var n=Array.isArray(e),c=Array.isArray(t);if(n!==c)return!1;var a=Object.prototype.toString.call(e)===K,l=Object.prototype.toString.call(t)===K;if(a!==l)return!1;if(!a&&!n)return e===t;var m=Object.keys(e),s=Object.keys(t);if(m.length!==s.length)return!1;for(var g={},y=0;y<m.length;y+=1)g[m[y]]=!0;for(var x=0;x<s.length;x+=1)g[s[x]]=!0;var d=Object.keys(g);if(d.length!==m.length)return!1;var b=e,j=t,E=function(O){return r(b[O],j[O])};return d.every(E)},Q=function(e,t,n){return k(e)?Object.keys(e).reduce(function(c,a){var l=!k(t)||!ge(e[a],t[a]);return n.includes(a)?(l&&console.warn("Unsupported prop change: options.".concat(a," is not a mutable property.")),c):l?D(D({},c||{}),{},G({},a,e[a])):c},null):null},X="Invalid prop `stripe` supplied to `Elements`. We recommend using the `loadStripe` utility from `@stripe/stripe-js`. See https://stripe.com/docs/stripe-js/react#elements-props-stripe for details.",Y=function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:X;if(e===null||ve(e))return e;throw new Error(t)},xe=function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:X;if(ye(e))return{tag:"async",stripePromise:Promise.resolve(e).then(function(c){return Y(c,t)})};var n=Y(e,t);return n===null?{tag:"empty"}:{tag:"sync",stripe:n}},Ce=function(e){!e||!e._registerWrapper||!e.registerAppInfo||(e._registerWrapper({name:"react-stripe-js",version:"3.1.0"}),e.registerAppInfo({name:"react-stripe-js",version:"3.1.0",url:"https://stripe.com/docs/stripe-js/react"}))},T=i.createContext(null);T.displayName="ElementsContext";var Z=function(e,t){if(!e)throw new Error("Could not find Elements context; You need to wrap the part of your app that ".concat(t," in an <Elements> provider."));return e},be=function(e){var t=e.stripe,n=e.options,c=e.children,a=i.useMemo(function(){return xe(t)},[t]),l=i.useState(function(){return{stripe:a.tag==="sync"?a.stripe:null,elements:a.tag==="sync"?a.stripe.elements(n):null}}),m=H(l,2),s=m[0],g=m[1];i.useEffect(function(){var d=!0,b=function(E){g(function(P){return P.stripe?P:{stripe:E,elements:E.elements(n)}})};return a.tag==="async"&&!s.stripe?a.stripePromise.then(function(j){j&&d&&b(j)}):a.tag==="sync"&&!s.stripe&&b(a.stripe),function(){d=!1}},[a,s,n]);var y=B(t);i.useEffect(function(){y!==null&&y!==t&&console.warn("Unsupported prop change on Elements: You cannot change the `stripe` prop after setting it.")},[y,t]);var x=B(n);return i.useEffect(function(){if(s.elements){var d=Q(n,x,["clientSecret","fonts"]);d&&s.elements.update(d)}},[n,x,s.elements]),i.useEffect(function(){Ce(s.stripe)},[s.stripe]),i.createElement(T.Provider,{value:s},c)};be.propTypes={stripe:u.any,options:u.object};var Se=function(e){var t=i.useContext(T);return Z(t,e)},Ee=function(){var e=Se("calls useElements()"),t=e.elements;return t};u.func.isRequired;var ee=i.createContext(null);ee.displayName="CheckoutSdkContext";var je=function(e,t){if(!e)throw new Error("Could not find CheckoutProvider context; You need to wrap the part of your app that ".concat(t," in an <CheckoutProvider> provider."));return e},ke=i.createContext(null);ke.displayName="CheckoutContext";u.any,u.shape({clientSecret:u.string.isRequired,elementsOptions:u.object}).isRequired;var L=function(e){var t=i.useContext(ee),n=i.useContext(T);if(t&&n)throw new Error("You cannot wrap the part of your app that ".concat(e," in both <CheckoutProvider> and <Elements> providers."));return t?je(t,e):Z(n,e)},Pe=function(e){return e.charAt(0).toUpperCase()+e.slice(1)},p=function(e,t){var n="".concat(Pe(e),"Element"),c=function(s){var g=s.id,y=s.className,x=s.options,d=x===void 0?{}:x,b=s.onBlur,j=s.onFocus,E=s.onReady,P=s.onChange,O=s.onEscape,te=s.onClick,re=s.onLoadError,ne=s.onLoaderStart,se=s.onNetworksChange,ae=s.onConfirm,oe=s.onCancel,ie=s.onShippingAddressChange,ce=s.onShippingRateChange,N=L("mounts <".concat(n,">")),w="elements"in N?N.elements:null,R="checkoutSdk"in N?N.checkoutSdk:null,ue=i.useState(null),M=H(ue,2),h=M[0],le=M[1],S=i.useRef(null),_=i.useRef(null);v(h,"blur",b),v(h,"focus",j),v(h,"escape",O),v(h,"click",te),v(h,"loaderror",re),v(h,"loaderstart",ne),v(h,"networkschange",se),v(h,"confirm",ae),v(h,"cancel",oe),v(h,"shippingaddresschange",ie),v(h,"shippingratechange",ce),v(h,"change",P);var I;E&&(e==="expressCheckout"?I=E:I=function(){E(h)}),v(h,"ready",I),i.useLayoutEffect(function(){if(S.current===null&&_.current!==null&&(w||R)){var C=null;R?C=R.createElement(e,d):w&&(C=w.create(e,d)),S.current=C,le(C),C&&C.mount(_.current)}},[w,R,d]);var W=B(d);return i.useEffect(function(){if(S.current){var C=Q(d,W,["paymentRequest"]);C&&"update"in S.current&&S.current.update(C)}},[d,W]),i.useLayoutEffect(function(){return function(){if(S.current&&typeof S.current.destroy=="function")try{S.current.destroy(),S.current=null}catch{}}},[]),i.createElement("div",{id:g,className:y,ref:_})},a=function(s){L("mounts <".concat(n,">"));var g=s.id,y=s.className;return i.createElement("div",{id:g,className:y})},l=t?a:c;return l.propTypes={id:u.string,className:u.string,onChange:u.func,onBlur:u.func,onFocus:u.func,onReady:u.func,onEscape:u.func,onClick:u.func,onLoadError:u.func,onLoaderStart:u.func,onNetworksChange:u.func,onConfirm:u.func,onCancel:u.func,onShippingAddressChange:u.func,onShippingRateChange:u.func,options:u.object},l.displayName=n,l.__elementType=e,l},f=typeof window>"u",Oe=i.createContext(null);Oe.displayName="EmbeddedCheckoutProviderContext";var U=function(){var e=L("calls useStripe()"),t=e.stripe;return t};p("auBankAccount",f);p("card",f);p("cardNumber",f);p("cardExpiry",f);p("cardCvc",f);p("fpxBank",f);p("iban",f);p("idealBank",f);p("p24Bank",f);p("epsBank",f);var Ne=p("payment",f);p("expressCheckout",f);p("currencySelector",f);p("paymentRequestButton",f);p("linkAuthentication",f);p("address",f);p("shippingAddress",f);p("paymentMethodMessaging",f);p("affirmMessage",f);p("afterpayClearpayMessage",f);const we=({totalAmount:r,tickets:e,paymentIntent:t})=>{const{event:n}=J().props,c=U(),a=Ee(),[l,m]=q.useState(!1),[s,g]=q.useState(!1),y=async()=>{pe.post(route("payment.save"),{amount:r,event_id:n.id,paymentIntentId:t,tickets:e},{onSuccess:()=>g(!0),onError:d=>console.error("Error:",d)})},x=async d=>{if(d.preventDefault(),!c||!a)return;m(!0);const{error:b}=await c.confirmPayment({elements:a,confirmParams:{return_url:route("payment.process")}});b&&(console.error("Payment error:",b.message),m(!1))};return s?o.jsx(Re,{handleSubmit:x,isProcessing:l}):o.jsx(Ae,{tickets:e,totalAmount:r,isProcessing:l,handleCheckout:y})},Re=({handleSubmit:r,isProcessing:e})=>{const t=U();return o.jsxs("div",{className:"space-y-4",children:[o.jsx("h2",{className:"text-2xl font-bold uppercase tracking-wider leading-none",children:"Procéder au paiement"}),o.jsxs("form",{onSubmit:r,className:"space-y-4",children:[o.jsx(Ne,{}),o.jsx(V,{className:"w-full mt-4 uppercase !font-semibold tracking-wider",disabled:!t||e,type:"submit",children:e?"Paiement en cours...":"Payer"})]})]})},Ae=({tickets:r,totalAmount:e,isProcessing:t,handleCheckout:n})=>{const c=U(),{auth:a}=J().props;return o.jsxs("div",{className:"space-y-4",children:[o.jsxs("div",{children:[o.jsx("h2",{className:"text-2xl font-bold uppercase tracking-wider leading-none",children:"Vérification de la commande"}),o.jsxs("p",{className:"text-secondary-foreground text-sm",children:["Les billets seront envoyés à l'adresse e-mail suivante :"," ",o.jsx("span",{className:"font-bold",children:a.user.email})]})]}),o.jsx(Te,{tickets:r}),o.jsxs("div",{className:"flex justify-between items-center border-t pt-4",children:[o.jsx("div",{className:"flex flex-col",children:o.jsx("span",{className:"font-medium",children:"Total"})}),o.jsxs("span",{children:[e,"€"]})]}),o.jsx(V,{className:"w-full mt-4 uppercase !font-semibold tracking-wider",disabled:!c||t,onClick:n,children:t?"Paiement en cours...":"Payer"})]})},Te=({tickets:r})=>o.jsxs("div",{className:"space-y-4",children:[r.admissions.length>0&&o.jsx(z,{title:"Billets",tickets:r.admissions}),r.extras.length>0&&o.jsx(z,{title:"Extras",tickets:r.extras})]}),z=({title:r,tickets:e})=>o.jsxs(o.Fragment,{children:[o.jsx("h3",{className:"text-lg font-bold uppercase tracking-wider leading-none",children:r}),o.jsx("ul",{className:"space-y-2",children:e.map(t=>o.jsx(_e,{ticket:t},t.id))})]}),_e=({ticket:r})=>o.jsxs("li",{className:"flex justify-between items-center bg-gray-50 p-4 border",children:[o.jsxs("div",{className:"flex flex-col",children:[o.jsxs("span",{className:"font-medium",children:[r.name," ",o.jsxs("span",{className:"text-sm text-secondary-foreground",children:["x",r.quantity]})]}),o.jsxs("span",{className:"text-xs text-secondary-foreground",children:[r.price,"€"]})]}),o.jsxs("span",{children:[r.price*r.quantity,"€"]})]}),Ue=Object.freeze(Object.defineProperty({__proto__:null,PaymentForm:we},Symbol.toStringTag,{value:"Module"}));export{be as E,we as P,Ue as a};
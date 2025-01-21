import{r as h,j as N}from"./app-FSxDIhYd.js";function fe(e,r){typeof e=="function"?e(r):e!=null&&(e.current=r)}function ne(...e){return r=>e.forEach(t=>fe(t,r))}function nr(...e){return h.useCallback(ne(...e),e)}var se=h.forwardRef((e,r)=>{const{children:t,...o}=e,s=h.Children.toArray(t),n=s.find(ge);if(n){const i=n.props.children,a=s.map(c=>c===n?h.Children.count(i)>1?h.Children.only(null):h.isValidElement(i)?i.props.children:null:c);return N.jsx(B,{...o,ref:r,children:h.isValidElement(i)?h.cloneElement(i,void 0,a):null})}return N.jsx(B,{...o,ref:r,children:t})});se.displayName="Slot";var B=h.forwardRef((e,r)=>{const{children:t,...o}=e;if(h.isValidElement(t)){const s=he(t);return h.cloneElement(t,{...me(o,t.props),ref:r?ne(r,s):s})}return h.Children.count(t)>1?h.Children.only(null):null});B.displayName="SlotClone";var be=({children:e})=>N.jsx(N.Fragment,{children:e});function ge(e){return h.isValidElement(e)&&e.type===be}function me(e,r){const t={...r};for(const o in r){const s=e[o],n=r[o];/^on[A-Z]/.test(o)?s&&n?t[o]=(...a)=>{n(...a),s(...a)}:s&&(t[o]=s):o==="style"?t[o]={...s,...n}:o==="className"&&(t[o]=[s,n].filter(Boolean).join(" "))}return{...e,...t}}function he(e){var o,s;let r=(o=Object.getOwnPropertyDescriptor(e.props,"ref"))==null?void 0:o.get,t=r&&"isReactWarning"in r&&r.isReactWarning;return t?e.ref:(r=(s=Object.getOwnPropertyDescriptor(e,"ref"))==null?void 0:s.get,t=r&&"isReactWarning"in r&&r.isReactWarning,t?e.props.ref:e.props.ref||e.ref)}function ie(e){var r,t,o="";if(typeof e=="string"||typeof e=="number")o+=e;else if(typeof e=="object")if(Array.isArray(e))for(r=0;r<e.length;r++)e[r]&&(t=ie(e[r]))&&(o&&(o+=" "),o+=t);else for(r in e)e[r]&&(o&&(o+=" "),o+=r);return o}function ye(){for(var e,r,t=0,o="";t<arguments.length;)(e=arguments[t++])&&(r=ie(e))&&(o&&(o+=" "),o+=r);return o}const ee=e=>typeof e=="boolean"?"".concat(e):e===0?"0":e,re=ye,xe=(e,r)=>t=>{var o;if((r==null?void 0:r.variants)==null)return re(e,t==null?void 0:t.class,t==null?void 0:t.className);const{variants:s,defaultVariants:n}=r,i=Object.keys(s).map(d=>{const u=t==null?void 0:t[d],b=n==null?void 0:n[d];if(u===null)return null;const m=ee(u)||ee(b);return s[d][m]}),a=t&&Object.entries(t).reduce((d,u)=>{let[b,m]=u;return m===void 0||(d[b]=m),d},{}),c=r==null||(o=r.compoundVariants)===null||o===void 0?void 0:o.reduce((d,u)=>{let{class:b,className:m,...v}=u;return Object.entries(v).every(k=>{let[y,g]=k;return Array.isArray(g)?g.includes({...n,...a}[y]):{...n,...a}[y]===g})?[...d,b,m]:d},[]);return re(e,i,c,t==null?void 0:t.class,t==null?void 0:t.className)};function ae(e){var r,t,o="";if(typeof e=="string"||typeof e=="number")o+=e;else if(typeof e=="object")if(Array.isArray(e)){var s=e.length;for(r=0;r<s;r++)e[r]&&(t=ae(e[r]))&&(o&&(o+=" "),o+=t)}else for(t in e)e[t]&&(o&&(o+=" "),o+=t);return o}function ve(){for(var e,r,t=0,o="",s=arguments.length;t<s;t++)(e=arguments[t])&&(r=ae(e))&&(o&&(o+=" "),o+=r);return o}const F="-";function we(e){const r=ke(e),{conflictingClassGroups:t,conflictingClassGroupModifiers:o}=e;function s(i){const a=i.split(F);return a[0]===""&&a.length!==1&&a.shift(),le(a,r)||Ce(i)}function n(i,a){const c=t[i]||[];return a&&o[i]?[...c,...o[i]]:c}return{getClassGroupId:s,getConflictingClassGroupIds:n}}function le(e,r){var i;if(e.length===0)return r.classGroupId;const t=e[0],o=r.nextPart.get(t),s=o?le(e.slice(1),o):void 0;if(s)return s;if(r.validators.length===0)return;const n=e.join(F);return(i=r.validators.find(({validator:a})=>a(n)))==null?void 0:i.classGroupId}const te=/^\[(.+)\]$/;function Ce(e){if(te.test(e)){const r=te.exec(e)[1],t=r==null?void 0:r.substring(0,r.indexOf(":"));if(t)return"arbitrary.."+t}}function ke(e){const{theme:r,prefix:t}=e,o={nextPart:new Map,validators:[]};return Ae(Object.entries(e.classGroups),t).forEach(([n,i])=>{U(i,o,n,r)}),o}function U(e,r,t,o){e.forEach(s=>{if(typeof s=="string"){const n=s===""?r:oe(r,s);n.classGroupId=t;return}if(typeof s=="function"){if(ze(s)){U(s(o),r,t,o);return}r.validators.push({validator:s,classGroupId:t});return}Object.entries(s).forEach(([n,i])=>{U(i,oe(r,n),t,o)})})}function oe(e,r){let t=e;return r.split(F).forEach(o=>{t.nextPart.has(o)||t.nextPart.set(o,{nextPart:new Map,validators:[]}),t=t.nextPart.get(o)}),t}function ze(e){return e.isThemeGetter}function Ae(e,r){return r?e.map(([t,o])=>{const s=o.map(n=>typeof n=="string"?r+n:typeof n=="object"?Object.fromEntries(Object.entries(n).map(([i,a])=>[r+i,a])):n);return[t,s]}):e}function Se(e){if(e<1)return{get:()=>{},set:()=>{}};let r=0,t=new Map,o=new Map;function s(n,i){t.set(n,i),r++,r>e&&(r=0,o=t,t=new Map)}return{get(n){let i=t.get(n);if(i!==void 0)return i;if((i=o.get(n))!==void 0)return s(n,i),i},set(n,i){t.has(n)?t.set(n,i):s(n,i)}}}const ce="!";function Re(e){const{separator:r,experimentalParseClassName:t}=e,o=r.length===1,s=r[0],n=r.length;function i(a){const c=[];let d=0,u=0,b;for(let g=0;g<a.length;g++){let x=a[g];if(d===0){if(x===s&&(o||a.slice(g,g+n)===r)){c.push(a.slice(u,g)),u=g+n;continue}if(x==="/"){b=g;continue}}x==="["?d++:x==="]"&&d--}const m=c.length===0?a:a.substring(u),v=m.startsWith(ce),k=v?m.substring(1):m,y=b&&b>u?b-u:void 0;return{modifiers:c,hasImportantModifier:v,baseClassName:k,maybePostfixModifierPosition:y}}return t?function(c){return t({className:c,parseClassName:i})}:i}function je(e){if(e.length<=1)return e;const r=[];let t=[];return e.forEach(o=>{o[0]==="["?(r.push(...t.sort(),o),t=[]):t.push(o)}),r.push(...t.sort()),r}function Me(e){return{cache:Se(e.cacheSize),parseClassName:Re(e),...we(e)}}const Ee=/\s+/;function Pe(e,r){const{parseClassName:t,getClassGroupId:o,getConflictingClassGroupIds:s}=r,n=new Set;return e.trim().split(Ee).map(i=>{const{modifiers:a,hasImportantModifier:c,baseClassName:d,maybePostfixModifierPosition:u}=t(i);let b=!!u,m=o(b?d.substring(0,u):d);if(!m){if(!b)return{isTailwindClass:!1,originalClassName:i};if(m=o(d),!m)return{isTailwindClass:!1,originalClassName:i};b=!1}const v=je(a).join(":");return{isTailwindClass:!0,modifierId:c?v+ce:v,classGroupId:m,originalClassName:i,hasPostfixModifier:b}}).reverse().filter(i=>{if(!i.isTailwindClass)return!0;const{modifierId:a,classGroupId:c,hasPostfixModifier:d}=i,u=a+c;return n.has(u)?!1:(n.add(u),s(c,d).forEach(b=>n.add(a+b)),!0)}).reverse().map(i=>i.originalClassName).join(" ")}function Ne(){let e=0,r,t,o="";for(;e<arguments.length;)(r=arguments[e++])&&(t=de(r))&&(o&&(o+=" "),o+=t);return o}function de(e){if(typeof e=="string")return e;let r,t="";for(let o=0;o<e.length;o++)e[o]&&(r=de(e[o]))&&(t&&(t+=" "),t+=r);return t}function Ge(e,...r){let t,o,s,n=i;function i(c){const d=r.reduce((u,b)=>b(u),e());return t=Me(d),o=t.cache.get,s=t.cache.set,n=a,a(c)}function a(c){const d=o(c);if(d)return d;const u=Pe(c,t);return s(c,u),u}return function(){return n(Ne.apply(null,arguments))}}function p(e){const r=t=>t[e]||[];return r.isThemeGetter=!0,r}const ue=/^\[(?:([a-z-]+):)?(.+)\]$/i,Ie=/^\d+\/\d+$/,Ve=new Set(["px","full","screen"]),Te=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,We=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,Oe=/^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,Le=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,$e=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;function C(e){return S(e)||Ve.has(e)||Ie.test(e)}function z(e){return R(e,"length",Je)}function S(e){return!!e&&!Number.isNaN(Number(e))}function T(e){return R(e,"number",S)}function E(e){return!!e&&Number.isInteger(Number(e))}function _e(e){return e.endsWith("%")&&S(e.slice(0,-1))}function l(e){return ue.test(e)}function A(e){return Te.test(e)}const Be=new Set(["length","size","percentage"]);function Ue(e){return R(e,Be,pe)}function Fe(e){return R(e,"position",pe)}const Ze=new Set(["image","url"]);function qe(e){return R(e,Ze,Xe)}function He(e){return R(e,"",Ke)}function P(){return!0}function R(e,r,t){const o=ue.exec(e);return o?o[1]?typeof r=="string"?o[1]===r:r.has(o[1]):t(o[2]):!1}function Je(e){return We.test(e)&&!Oe.test(e)}function pe(){return!1}function Ke(e){return Le.test(e)}function Xe(e){return $e.test(e)}function Qe(){const e=p("colors"),r=p("spacing"),t=p("blur"),o=p("brightness"),s=p("borderColor"),n=p("borderRadius"),i=p("borderSpacing"),a=p("borderWidth"),c=p("contrast"),d=p("grayscale"),u=p("hueRotate"),b=p("invert"),m=p("gap"),v=p("gradientColorStops"),k=p("gradientColorStopPositions"),y=p("inset"),g=p("margin"),x=p("opacity"),w=p("padding"),Z=p("saturate"),W=p("scale"),q=p("sepia"),H=p("skew"),J=p("space"),K=p("translate"),O=()=>["auto","contain","none"],L=()=>["auto","hidden","clip","visible","scroll"],$=()=>["auto",l,r],f=()=>[l,r],X=()=>["",C,z],G=()=>["auto",S,l],Q=()=>["bottom","center","left","left-bottom","left-top","right","right-bottom","right-top","top"],I=()=>["solid","dashed","dotted","double","none"],Y=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],_=()=>["start","end","center","between","around","evenly","stretch"],j=()=>["","0",l],D=()=>["auto","avoid","all","avoid-page","page","left","right","column"],M=()=>[S,T],V=()=>[S,l];return{cacheSize:500,separator:":",theme:{colors:[P],spacing:[C,z],blur:["none","",A,l],brightness:M(),borderColor:[e],borderRadius:["none","","full",A,l],borderSpacing:f(),borderWidth:X(),contrast:M(),grayscale:j(),hueRotate:V(),invert:j(),gap:f(),gradientColorStops:[e],gradientColorStopPositions:[_e,z],inset:$(),margin:$(),opacity:M(),padding:f(),saturate:M(),scale:M(),sepia:j(),skew:V(),space:f(),translate:f()},classGroups:{aspect:[{aspect:["auto","square","video",l]}],container:["container"],columns:[{columns:[A]}],"break-after":[{"break-after":D()}],"break-before":[{"break-before":D()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:[...Q(),l]}],overflow:[{overflow:L()}],"overflow-x":[{"overflow-x":L()}],"overflow-y":[{"overflow-y":L()}],overscroll:[{overscroll:O()}],"overscroll-x":[{"overscroll-x":O()}],"overscroll-y":[{"overscroll-y":O()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:[y]}],"inset-x":[{"inset-x":[y]}],"inset-y":[{"inset-y":[y]}],start:[{start:[y]}],end:[{end:[y]}],top:[{top:[y]}],right:[{right:[y]}],bottom:[{bottom:[y]}],left:[{left:[y]}],visibility:["visible","invisible","collapse"],z:[{z:["auto",E,l]}],basis:[{basis:$()}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["wrap","wrap-reverse","nowrap"]}],flex:[{flex:["1","auto","initial","none",l]}],grow:[{grow:j()}],shrink:[{shrink:j()}],order:[{order:["first","last","none",E,l]}],"grid-cols":[{"grid-cols":[P]}],"col-start-end":[{col:["auto",{span:["full",E,l]},l]}],"col-start":[{"col-start":G()}],"col-end":[{"col-end":G()}],"grid-rows":[{"grid-rows":[P]}],"row-start-end":[{row:["auto",{span:[E,l]},l]}],"row-start":[{"row-start":G()}],"row-end":[{"row-end":G()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":["auto","min","max","fr",l]}],"auto-rows":[{"auto-rows":["auto","min","max","fr",l]}],gap:[{gap:[m]}],"gap-x":[{"gap-x":[m]}],"gap-y":[{"gap-y":[m]}],"justify-content":[{justify:["normal",..._()]}],"justify-items":[{"justify-items":["start","end","center","stretch"]}],"justify-self":[{"justify-self":["auto","start","end","center","stretch"]}],"align-content":[{content:["normal",..._(),"baseline"]}],"align-items":[{items:["start","end","center","baseline","stretch"]}],"align-self":[{self:["auto","start","end","center","stretch","baseline"]}],"place-content":[{"place-content":[..._(),"baseline"]}],"place-items":[{"place-items":["start","end","center","baseline","stretch"]}],"place-self":[{"place-self":["auto","start","end","center","stretch"]}],p:[{p:[w]}],px:[{px:[w]}],py:[{py:[w]}],ps:[{ps:[w]}],pe:[{pe:[w]}],pt:[{pt:[w]}],pr:[{pr:[w]}],pb:[{pb:[w]}],pl:[{pl:[w]}],m:[{m:[g]}],mx:[{mx:[g]}],my:[{my:[g]}],ms:[{ms:[g]}],me:[{me:[g]}],mt:[{mt:[g]}],mr:[{mr:[g]}],mb:[{mb:[g]}],ml:[{ml:[g]}],"space-x":[{"space-x":[J]}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":[J]}],"space-y-reverse":["space-y-reverse"],w:[{w:["auto","min","max","fit","svw","lvw","dvw",l,r]}],"min-w":[{"min-w":[l,r,"min","max","fit"]}],"max-w":[{"max-w":[l,r,"none","full","min","max","fit","prose",{screen:[A]},A]}],h:[{h:[l,r,"auto","min","max","fit","svh","lvh","dvh"]}],"min-h":[{"min-h":[l,r,"min","max","fit","svh","lvh","dvh"]}],"max-h":[{"max-h":[l,r,"min","max","fit","svh","lvh","dvh"]}],size:[{size:[l,r,"auto","min","max","fit"]}],"font-size":[{text:["base",A,z]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:["thin","extralight","light","normal","medium","semibold","bold","extrabold","black",T]}],"font-family":[{font:[P]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractons"],tracking:[{tracking:["tighter","tight","normal","wide","wider","widest",l]}],"line-clamp":[{"line-clamp":["none",S,T]}],leading:[{leading:["none","tight","snug","normal","relaxed","loose",C,l]}],"list-image":[{"list-image":["none",l]}],"list-style-type":[{list:["none","disc","decimal",l]}],"list-style-position":[{list:["inside","outside"]}],"placeholder-color":[{placeholder:[e]}],"placeholder-opacity":[{"placeholder-opacity":[x]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"text-color":[{text:[e]}],"text-opacity":[{"text-opacity":[x]}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...I(),"wavy"]}],"text-decoration-thickness":[{decoration:["auto","from-font",C,z]}],"underline-offset":[{"underline-offset":["auto",C,l]}],"text-decoration-color":[{decoration:[e]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:f()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",l]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",l]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-opacity":[{"bg-opacity":[x]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:[...Q(),Fe]}],"bg-repeat":[{bg:["no-repeat",{repeat:["","x","y","round","space"]}]}],"bg-size":[{bg:["auto","cover","contain",Ue]}],"bg-image":[{bg:["none",{"gradient-to":["t","tr","r","br","b","bl","l","tl"]},qe]}],"bg-color":[{bg:[e]}],"gradient-from-pos":[{from:[k]}],"gradient-via-pos":[{via:[k]}],"gradient-to-pos":[{to:[k]}],"gradient-from":[{from:[v]}],"gradient-via":[{via:[v]}],"gradient-to":[{to:[v]}],rounded:[{rounded:[n]}],"rounded-s":[{"rounded-s":[n]}],"rounded-e":[{"rounded-e":[n]}],"rounded-t":[{"rounded-t":[n]}],"rounded-r":[{"rounded-r":[n]}],"rounded-b":[{"rounded-b":[n]}],"rounded-l":[{"rounded-l":[n]}],"rounded-ss":[{"rounded-ss":[n]}],"rounded-se":[{"rounded-se":[n]}],"rounded-ee":[{"rounded-ee":[n]}],"rounded-es":[{"rounded-es":[n]}],"rounded-tl":[{"rounded-tl":[n]}],"rounded-tr":[{"rounded-tr":[n]}],"rounded-br":[{"rounded-br":[n]}],"rounded-bl":[{"rounded-bl":[n]}],"border-w":[{border:[a]}],"border-w-x":[{"border-x":[a]}],"border-w-y":[{"border-y":[a]}],"border-w-s":[{"border-s":[a]}],"border-w-e":[{"border-e":[a]}],"border-w-t":[{"border-t":[a]}],"border-w-r":[{"border-r":[a]}],"border-w-b":[{"border-b":[a]}],"border-w-l":[{"border-l":[a]}],"border-opacity":[{"border-opacity":[x]}],"border-style":[{border:[...I(),"hidden"]}],"divide-x":[{"divide-x":[a]}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":[a]}],"divide-y-reverse":["divide-y-reverse"],"divide-opacity":[{"divide-opacity":[x]}],"divide-style":[{divide:I()}],"border-color":[{border:[s]}],"border-color-x":[{"border-x":[s]}],"border-color-y":[{"border-y":[s]}],"border-color-t":[{"border-t":[s]}],"border-color-r":[{"border-r":[s]}],"border-color-b":[{"border-b":[s]}],"border-color-l":[{"border-l":[s]}],"divide-color":[{divide:[s]}],"outline-style":[{outline:["",...I()]}],"outline-offset":[{"outline-offset":[C,l]}],"outline-w":[{outline:[C,z]}],"outline-color":[{outline:[e]}],"ring-w":[{ring:X()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:[e]}],"ring-opacity":[{"ring-opacity":[x]}],"ring-offset-w":[{"ring-offset":[C,z]}],"ring-offset-color":[{"ring-offset":[e]}],shadow:[{shadow:["","inner","none",A,He]}],"shadow-color":[{shadow:[P]}],opacity:[{opacity:[x]}],"mix-blend":[{"mix-blend":[...Y(),"plus-lighter","plus-darker"]}],"bg-blend":[{"bg-blend":Y()}],filter:[{filter:["","none"]}],blur:[{blur:[t]}],brightness:[{brightness:[o]}],contrast:[{contrast:[c]}],"drop-shadow":[{"drop-shadow":["","none",A,l]}],grayscale:[{grayscale:[d]}],"hue-rotate":[{"hue-rotate":[u]}],invert:[{invert:[b]}],saturate:[{saturate:[Z]}],sepia:[{sepia:[q]}],"backdrop-filter":[{"backdrop-filter":["","none"]}],"backdrop-blur":[{"backdrop-blur":[t]}],"backdrop-brightness":[{"backdrop-brightness":[o]}],"backdrop-contrast":[{"backdrop-contrast":[c]}],"backdrop-grayscale":[{"backdrop-grayscale":[d]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[u]}],"backdrop-invert":[{"backdrop-invert":[b]}],"backdrop-opacity":[{"backdrop-opacity":[x]}],"backdrop-saturate":[{"backdrop-saturate":[Z]}],"backdrop-sepia":[{"backdrop-sepia":[q]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":[i]}],"border-spacing-x":[{"border-spacing-x":[i]}],"border-spacing-y":[{"border-spacing-y":[i]}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["none","all","","colors","opacity","shadow","transform",l]}],duration:[{duration:V()}],ease:[{ease:["linear","in","out","in-out",l]}],delay:[{delay:V()}],animate:[{animate:["none","spin","ping","pulse","bounce",l]}],transform:[{transform:["","gpu","none"]}],scale:[{scale:[W]}],"scale-x":[{"scale-x":[W]}],"scale-y":[{"scale-y":[W]}],rotate:[{rotate:[E,l]}],"translate-x":[{"translate-x":[K]}],"translate-y":[{"translate-y":[K]}],"skew-x":[{"skew-x":[H]}],"skew-y":[{"skew-y":[H]}],"transform-origin":[{origin:["center","top","top-right","right","bottom-right","bottom","bottom-left","left","top-left",l]}],accent:[{accent:["auto",e]}],appearance:[{appearance:["none","auto"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",l]}],"caret-color":[{caret:[e]}],"pointer-events":[{"pointer-events":["none","auto"]}],resize:[{resize:["none","y","x",""]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":f()}],"scroll-mx":[{"scroll-mx":f()}],"scroll-my":[{"scroll-my":f()}],"scroll-ms":[{"scroll-ms":f()}],"scroll-me":[{"scroll-me":f()}],"scroll-mt":[{"scroll-mt":f()}],"scroll-mr":[{"scroll-mr":f()}],"scroll-mb":[{"scroll-mb":f()}],"scroll-ml":[{"scroll-ml":f()}],"scroll-p":[{"scroll-p":f()}],"scroll-px":[{"scroll-px":f()}],"scroll-py":[{"scroll-py":f()}],"scroll-ps":[{"scroll-ps":f()}],"scroll-pe":[{"scroll-pe":f()}],"scroll-pt":[{"scroll-pt":f()}],"scroll-pr":[{"scroll-pr":f()}],"scroll-pb":[{"scroll-pb":f()}],"scroll-pl":[{"scroll-pl":f()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",l]}],fill:[{fill:[e,"none"]}],"stroke-w":[{stroke:[C,z,T]}],stroke:[{stroke:[e,"none"]}],sr:["sr-only","not-sr-only"],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]}}}const Ye=Ge(Qe);function De(...e){return Ye(ve(e))}const er=e=>e.split(" ").map(r=>r.charAt(0).toUpperCase()+r.slice(1)).join(" "),sr=e=>e&&e.charAt(0).toUpperCase()+e.slice(1),ir=e=>String(e).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),ar=e=>{let r="";return e.street&&(r+=`${e.street}, `),e.zip_code&&(r+=`${e.zip_code} `),e.city&&(r+=`${e.city}, `),e.country&&(r+=`${e.country}`),er(r)},lr=()=>window.innerWidth<=468,rr=xe("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:cursor-not-allowed",{variants:{variant:{default:"bg-primary !font-normal text-primary-foreground shadow hover:bg-primary/90 disabled:cursor-not-allowed disabled:!opacity-100",destructive:"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",outline:"border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline",none:"!px-0 !py-0 hover:text-card-foreground focus:ring-0",customer_blue:"bg-muted text-primary font-integral !px-5 !py-6 !font-bold rounded-full",customer_yellow:"bg-accent text-primary font-integral !px-5 !py-6 !font-bold rounded-full",customer_primary:"bg-primary text-primary-foreground font-integral !px-5 !py-6 !font-bold rounded-full"},size:{default:"h-9 px-3 py-2",sm:"h-8 rounded-md px-3 text-xs",lg:"h-10 rounded-md px-8",icon:"h-9 w-9"}},defaultVariants:{variant:"default",size:"default"}}),tr=h.forwardRef(({className:e,variant:r,size:t,asChild:o=!1,...s},n)=>{const i=o?se:"button";return N.jsx(i,{className:De(rr({variant:r,size:t,className:e})),ref:n,...s})});tr.displayName="Button";export{tr as B,se as S,xe as a,ve as b,De as c,er as d,ar as e,sr as f,rr as g,ne as h,lr as i,nr as u,ir as v};
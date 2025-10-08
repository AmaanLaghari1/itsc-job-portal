import{R as P,r as s,f as Xr,j as Ue}from"./index-CFt1f066.js";var G=function(){return G=Object.assign||function(t){for(var n,r=1,o=arguments.length;r<o;r++){n=arguments[r];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t},G.apply(this,arguments)};function ft(e,t,n){if(n||arguments.length===2)for(var r=0,o=t.length,a;r<o;r++)(a||!(r in t))&&(a||(a=Array.prototype.slice.call(t,0,r)),a[r]=t[r]);return e.concat(a||Array.prototype.slice.call(t))}var _="-ms-",qe="-moz-",j="-webkit-",Yn="comm",xt="rule",Vt="decl",Qr="@import",Vn="@keyframes",Jr="@layer",Un=Math.abs,Ut=String.fromCharCode,Nt=Object.assign;function eo(e,t){return z(e,0)^45?(((t<<2^z(e,0))<<2^z(e,1))<<2^z(e,2))<<2^z(e,3):0}function Kn(e){return e.trim()}function pe(e,t){return(e=t.exec(e))?e[0]:e}function E(e,t,n){return e.replace(t,n)}function lt(e,t,n){return e.indexOf(t,n)}function z(e,t){return e.charCodeAt(t)|0}function Fe(e,t,n){return e.slice(t,n)}function le(e){return e.length}function qn(e){return e.length}function Ke(e,t){return t.push(e),e}function to(e,t){return e.map(t).join("")}function vn(e,t){return e.filter(function(n){return!pe(n,t)})}var vt=1,Ne=1,Zn=0,te=0,T=0,Be="";function Ct(e,t,n,r,o,a,i,c){return{value:e,root:t,parent:n,type:r,props:o,children:a,line:vt,column:Ne,length:i,return:"",siblings:c}}function ye(e,t){return Nt(Ct("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},t)}function He(e){for(;e.root;)e=ye(e.root,{children:[e]});Ke(e,e.siblings)}function no(){return T}function ro(){return T=te>0?z(Be,--te):0,Ne--,T===10&&(Ne=1,vt--),T}function oe(){return T=te<Zn?z(Be,te++):0,Ne++,T===10&&(Ne=1,vt++),T}function Oe(){return z(Be,te)}function ct(){return te}function St(e,t){return Fe(Be,e,t)}function Lt(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function oo(e){return vt=Ne=1,Zn=le(Be=e),te=0,[]}function ao(e){return Be="",e}function At(e){return Kn(St(te-1,Mt(e===91?e+2:e===40?e+1:e)))}function so(e){for(;(T=Oe())&&T<33;)oe();return Lt(e)>2||Lt(T)>3?"":" "}function io(e,t){for(;--t&&oe()&&!(T<48||T>102||T>57&&T<65||T>70&&T<97););return St(e,ct()+(t<6&&Oe()==32&&oe()==32))}function Mt(e){for(;oe();)switch(T){case e:return te;case 34:case 39:e!==34&&e!==39&&Mt(T);break;case 40:e===41&&Mt(e);break;case 92:oe();break}return te}function lo(e,t){for(;oe()&&e+T!==57;)if(e+T===84&&Oe()===47)break;return"/*"+St(t,te-1)+"*"+Ut(e===47?e:oe())}function co(e){for(;!Lt(Oe());)oe();return St(e,te)}function uo(e){return ao(dt("",null,null,null,[""],e=oo(e),0,[0],e))}function dt(e,t,n,r,o,a,i,c,d){for(var f=0,u=0,p=i,y=0,h=0,x=0,R=1,O=1,$=1,C=0,m="",v=o,D=a,S=r,g=m;O;)switch(x=C,C=oe()){case 40:if(x!=108&&z(g,p-1)==58){lt(g+=E(At(C),"&","&\f"),"&\f",Un(f?c[f-1]:0))!=-1&&($=-1);break}case 34:case 39:case 91:g+=At(C);break;case 9:case 10:case 13:case 32:g+=so(x);break;case 92:g+=io(ct()-1,7);continue;case 47:switch(Oe()){case 42:case 47:Ke(po(lo(oe(),ct()),t,n,d),d);break;default:g+="/"}break;case 123*R:c[f++]=le(g)*$;case 125*R:case 59:case 0:switch(C){case 0:case 125:O=0;case 59+u:$==-1&&(g=E(g,/\f/g,"")),h>0&&le(g)-p&&Ke(h>32?Sn(g+";",r,n,p-1,d):Sn(E(g," ","")+";",r,n,p-2,d),d);break;case 59:g+=";";default:if(Ke(S=Cn(g,t,n,f,u,o,c,m,v=[],D=[],p,a),a),C===123)if(u===0)dt(g,t,S,S,v,a,p,c,D);else switch(y===99&&z(g,3)===110?100:y){case 100:case 108:case 109:case 115:dt(e,S,S,r&&Ke(Cn(e,S,S,0,0,o,c,m,o,v=[],p,D),D),o,D,p,c,r?v:D);break;default:dt(g,S,S,S,[""],D,0,c,D)}}f=u=h=0,R=$=1,m=g="",p=i;break;case 58:p=1+le(g),h=x;default:if(R<1){if(C==123)--R;else if(C==125&&R++==0&&ro()==125)continue}switch(g+=Ut(C),C*R){case 38:$=u>0?1:(g+="\f",-1);break;case 44:c[f++]=(le(g)-1)*$,$=1;break;case 64:Oe()===45&&(g+=At(oe())),y=Oe(),u=p=le(m=g+=co(ct())),C++;break;case 45:x===45&&le(g)==2&&(R=0)}}return a}function Cn(e,t,n,r,o,a,i,c,d,f,u,p){for(var y=o-1,h=o===0?a:[""],x=qn(h),R=0,O=0,$=0;R<r;++R)for(var C=0,m=Fe(e,y+1,y=Un(O=i[R])),v=e;C<x;++C)(v=Kn(O>0?h[C]+" "+m:E(m,/&\f/g,h[C])))&&(d[$++]=v);return Ct(e,t,n,o===0?xt:c,d,f,u,p)}function po(e,t,n,r){return Ct(e,t,n,Yn,Ut(no()),Fe(e,2,-2),0,r)}function Sn(e,t,n,r,o){return Ct(e,t,n,Vt,Fe(e,0,r),Fe(e,r+1,-1),r,o)}function Xn(e,t,n){switch(eo(e,t)){case 5103:return j+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return j+e+e;case 4789:return qe+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return j+e+qe+e+_+e+e;case 5936:switch(z(e,t+11)){case 114:return j+e+_+E(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return j+e+_+E(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return j+e+_+E(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return j+e+_+e+e;case 6165:return j+e+_+"flex-"+e+e;case 5187:return j+e+E(e,/(\w+).+(:[^]+)/,j+"box-$1$2"+_+"flex-$1$2")+e;case 5443:return j+e+_+"flex-item-"+E(e,/flex-|-self/g,"")+(pe(e,/flex-|baseline/)?"":_+"grid-row-"+E(e,/flex-|-self/g,""))+e;case 4675:return j+e+_+"flex-line-pack"+E(e,/align-content|flex-|-self/g,"")+e;case 5548:return j+e+_+E(e,"shrink","negative")+e;case 5292:return j+e+_+E(e,"basis","preferred-size")+e;case 6060:return j+"box-"+E(e,"-grow","")+j+e+_+E(e,"grow","positive")+e;case 4554:return j+E(e,/([^-])(transform)/g,"$1"+j+"$2")+e;case 6187:return E(E(E(e,/(zoom-|grab)/,j+"$1"),/(image-set)/,j+"$1"),e,"")+e;case 5495:case 3959:return E(e,/(image-set\([^]*)/,j+"$1$`$1");case 4968:return E(E(e,/(.+:)(flex-)?(.*)/,j+"box-pack:$3"+_+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+j+e+e;case 4200:if(!pe(e,/flex-|baseline/))return _+"grid-column-align"+Fe(e,t)+e;break;case 2592:case 3360:return _+E(e,"template-","")+e;case 4384:case 3616:return n&&n.some(function(r,o){return t=o,pe(r.props,/grid-\w+-end/)})?~lt(e+(n=n[t].value),"span",0)?e:_+E(e,"-start","")+e+_+"grid-row-span:"+(~lt(n,"span",0)?pe(n,/\d+/):+pe(n,/\d+/)-+pe(e,/\d+/))+";":_+E(e,"-start","")+e;case 4896:case 4128:return n&&n.some(function(r){return pe(r.props,/grid-\w+-start/)})?e:_+E(E(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return E(e,/(.+)-inline(.+)/,j+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(le(e)-1-t>6)switch(z(e,t+1)){case 109:if(z(e,t+4)!==45)break;case 102:return E(e,/(.+:)(.+)-([^]+)/,"$1"+j+"$2-$3$1"+qe+(z(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~lt(e,"stretch",0)?Xn(E(e,"stretch","fill-available"),t,n)+e:e}break;case 5152:case 5920:return E(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(r,o,a,i,c,d,f){return _+o+":"+a+f+(i?_+o+"-span:"+(c?d:+d-+a)+f:"")+e});case 4949:if(z(e,t+6)===121)return E(e,":",":"+j)+e;break;case 6444:switch(z(e,z(e,14)===45?18:11)){case 120:return E(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+j+(z(e,14)===45?"inline-":"")+"box$3$1"+j+"$2$3$1"+_+"$2box$3")+e;case 100:return E(e,":",":"+_)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return E(e,"scroll-","scroll-snap-")+e}return e}function ht(e,t){for(var n="",r=0;r<e.length;r++)n+=t(e[r],r,e,t)||"";return n}function go(e,t,n,r){switch(e.type){case Jr:if(e.children.length)break;case Qr:case Vt:return e.return=e.return||e.value;case Yn:return"";case Vn:return e.return=e.value+"{"+ht(e.children,r)+"}";case xt:if(!le(e.value=e.props.join(",")))return""}return le(n=ht(e.children,r))?e.return=e.value+"{"+n+"}":""}function fo(e){var t=qn(e);return function(n,r,o,a){for(var i="",c=0;c<t;c++)i+=e[c](n,r,o,a)||"";return i}}function ho(e){return function(t){t.root||(t=t.return)&&e(t)}}function mo(e,t,n,r){if(e.length>-1&&!e.return)switch(e.type){case Vt:e.return=Xn(e.value,e.length,n);return;case Vn:return ht([ye(e,{value:E(e.value,"@","@"+j)})],r);case xt:if(e.length)return to(n=e.props,function(o){switch(pe(o,r=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":He(ye(e,{props:[E(o,/:(read-\w+)/,":"+qe+"$1")]})),He(ye(e,{props:[o]})),Nt(e,{props:vn(n,r)});break;case"::placeholder":He(ye(e,{props:[E(o,/:(plac\w+)/,":"+j+"input-$1")]})),He(ye(e,{props:[E(o,/:(plac\w+)/,":"+qe+"$1")]})),He(ye(e,{props:[E(o,/:(plac\w+)/,_+"input-$1")]})),He(ye(e,{props:[o]})),Nt(e,{props:vn(n,r)});break}return""})}}var bo={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},Q={},Le=typeof process<"u"&&Q!==void 0&&(Q.REACT_APP_SC_ATTR||Q.SC_ATTR)||"data-styled",Qn="active",Jn="data-styled-version",Rt="6.1.19",Kt=`/*!sc*/
`,mt=typeof window<"u"&&typeof document<"u",wo=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:typeof process<"u"&&Q!==void 0&&Q.REACT_APP_SC_DISABLE_SPEEDY!==void 0&&Q.REACT_APP_SC_DISABLE_SPEEDY!==""?Q.REACT_APP_SC_DISABLE_SPEEDY!=="false"&&Q.REACT_APP_SC_DISABLE_SPEEDY:typeof process<"u"&&Q!==void 0&&Q.SC_DISABLE_SPEEDY!==void 0&&Q.SC_DISABLE_SPEEDY!==""&&Q.SC_DISABLE_SPEEDY!=="false"&&Q.SC_DISABLE_SPEEDY),$t=Object.freeze([]),Me=Object.freeze({});function yo(e,t,n){return n===void 0&&(n=Me),e.theme!==n.theme&&e.theme||t||n.theme}var er=new Set(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","track","u","ul","use","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]),xo=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,vo=/(^-|-$)/g;function Rn(e){return e.replace(xo,"-").replace(vo,"")}var Co=/(a)(d)/gi,ot=52,$n=function(e){return String.fromCharCode(e+(e>25?39:97))};function zt(e){var t,n="";for(t=Math.abs(e);t>ot;t=t/ot|0)n=$n(t%ot)+n;return($n(t%ot)+n).replace(Co,"$1-$2")}var jt,tr=5381,Te=function(e,t){for(var n=t.length;n;)e=33*e^t.charCodeAt(--n);return e},nr=function(e){return Te(tr,e)};function So(e){return zt(nr(e)>>>0)}function Ro(e){return e.displayName||e.name||"Component"}function _t(e){return typeof e=="string"&&!0}var rr=typeof Symbol=="function"&&Symbol.for,or=rr?Symbol.for("react.memo"):60115,$o=rr?Symbol.for("react.forward_ref"):60112,Eo={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},Oo={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},ar={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},Po=((jt={})[$o]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},jt[or]=ar,jt);function En(e){return("type"in(t=e)&&t.type.$$typeof)===or?ar:"$$typeof"in e?Po[e.$$typeof]:Eo;var t}var ko=Object.defineProperty,Do=Object.getOwnPropertyNames,On=Object.getOwnPropertySymbols,Io=Object.getOwnPropertyDescriptor,Ao=Object.getPrototypeOf,Pn=Object.prototype;function sr(e,t,n){if(typeof t!="string"){if(Pn){var r=Ao(t);r&&r!==Pn&&sr(e,r,n)}var o=Do(t);On&&(o=o.concat(On(t)));for(var a=En(e),i=En(t),c=0;c<o.length;++c){var d=o[c];if(!(d in Oo||n&&n[d]||i&&d in i||a&&d in a)){var f=Io(t,d);try{ko(e,d,f)}catch{}}}}return e}function ke(e){return typeof e=="function"}function qt(e){return typeof e=="object"&&"styledComponentId"in e}function Ee(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function kn(e,t){if(e.length===0)return"";for(var n=e[0],r=1;r<e.length;r++)n+=e[r];return n}function Qe(e){return e!==null&&typeof e=="object"&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function Wt(e,t,n){if(n===void 0&&(n=!1),!n&&!Qe(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var r=0;r<t.length;r++)e[r]=Wt(e[r],t[r]);else if(Qe(t))for(var r in t)e[r]=Wt(e[r],t[r]);return e}function Zt(e,t){Object.defineProperty(e,"toString",{value:t})}function De(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e," for more information.").concat(t.length>0?" Args: ".concat(t.join(", ")):""))}var jo=function(){function e(t){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=t}return e.prototype.indexOfGroup=function(t){for(var n=0,r=0;r<t;r++)n+=this.groupSizes[r];return n},e.prototype.insertRules=function(t,n){if(t>=this.groupSizes.length){for(var r=this.groupSizes,o=r.length,a=o;t>=a;)if((a<<=1)<0)throw De(16,"".concat(t));this.groupSizes=new Uint32Array(a),this.groupSizes.set(r),this.length=a;for(var i=o;i<a;i++)this.groupSizes[i]=0}for(var c=this.indexOfGroup(t+1),d=(i=0,n.length);i<d;i++)this.tag.insertRule(c,n[i])&&(this.groupSizes[t]++,c++)},e.prototype.clearGroup=function(t){if(t<this.length){var n=this.groupSizes[t],r=this.indexOfGroup(t),o=r+n;this.groupSizes[t]=0;for(var a=r;a<o;a++)this.tag.deleteRule(r)}},e.prototype.getGroup=function(t){var n="";if(t>=this.length||this.groupSizes[t]===0)return n;for(var r=this.groupSizes[t],o=this.indexOfGroup(t),a=o+r,i=o;i<a;i++)n+="".concat(this.tag.getRule(i)).concat(Kt);return n},e}(),ut=new Map,bt=new Map,pt=1,at=function(e){if(ut.has(e))return ut.get(e);for(;bt.has(pt);)pt++;var t=pt++;return ut.set(e,t),bt.set(t,e),t},_o=function(e,t){pt=t+1,ut.set(e,t),bt.set(t,e)},Ho="style[".concat(Le,"][").concat(Jn,'="').concat(Rt,'"]'),To=new RegExp("^".concat(Le,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),Fo=function(e,t,n){for(var r,o=n.split(","),a=0,i=o.length;a<i;a++)(r=o[a])&&e.registerName(t,r)},No=function(e,t){for(var n,r=((n=t.textContent)!==null&&n!==void 0?n:"").split(Kt),o=[],a=0,i=r.length;a<i;a++){var c=r[a].trim();if(c){var d=c.match(To);if(d){var f=0|parseInt(d[1],10),u=d[2];f!==0&&(_o(u,f),Fo(e,u,d[3]),e.getTag().insertRules(f,o)),o.length=0}else o.push(c)}}},Dn=function(e){for(var t=document.querySelectorAll(Ho),n=0,r=t.length;n<r;n++){var o=t[n];o&&o.getAttribute(Le)!==Qn&&(No(e,o),o.parentNode&&o.parentNode.removeChild(o))}};function Lo(){return typeof __webpack_nonce__<"u"?__webpack_nonce__:null}var ir=function(e){var t=document.head,n=e||t,r=document.createElement("style"),o=function(c){var d=Array.from(c.querySelectorAll("style[".concat(Le,"]")));return d[d.length-1]}(n),a=o!==void 0?o.nextSibling:null;r.setAttribute(Le,Qn),r.setAttribute(Jn,Rt);var i=Lo();return i&&r.setAttribute("nonce",i),n.insertBefore(r,a),r},Mo=function(){function e(t){this.element=ir(t),this.element.appendChild(document.createTextNode("")),this.sheet=function(n){if(n.sheet)return n.sheet;for(var r=document.styleSheets,o=0,a=r.length;o<a;o++){var i=r[o];if(i.ownerNode===n)return i}throw De(17)}(this.element),this.length=0}return e.prototype.insertRule=function(t,n){try{return this.sheet.insertRule(n,t),this.length++,!0}catch{return!1}},e.prototype.deleteRule=function(t){this.sheet.deleteRule(t),this.length--},e.prototype.getRule=function(t){var n=this.sheet.cssRules[t];return n&&n.cssText?n.cssText:""},e}(),zo=function(){function e(t){this.element=ir(t),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(t,n){if(t<=this.length&&t>=0){var r=document.createTextNode(n);return this.element.insertBefore(r,this.nodes[t]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(t){this.element.removeChild(this.nodes[t]),this.length--},e.prototype.getRule=function(t){return t<this.length?this.nodes[t].textContent:""},e}(),Wo=function(){function e(t){this.rules=[],this.length=0}return e.prototype.insertRule=function(t,n){return t<=this.length&&(this.rules.splice(t,0,n),this.length++,!0)},e.prototype.deleteRule=function(t){this.rules.splice(t,1),this.length--},e.prototype.getRule=function(t){return t<this.length?this.rules[t]:""},e}(),In=mt,Bo={isServer:!mt,useCSSOMInjection:!wo},lr=function(){function e(t,n,r){t===void 0&&(t=Me),n===void 0&&(n={});var o=this;this.options=G(G({},Bo),t),this.gs=n,this.names=new Map(r),this.server=!!t.isServer,!this.server&&mt&&In&&(In=!1,Dn(this)),Zt(this,function(){return function(a){for(var i=a.getTag(),c=i.length,d="",f=function(p){var y=function($){return bt.get($)}(p);if(y===void 0)return"continue";var h=a.names.get(y),x=i.getGroup(p);if(h===void 0||!h.size||x.length===0)return"continue";var R="".concat(Le,".g").concat(p,'[id="').concat(y,'"]'),O="";h!==void 0&&h.forEach(function($){$.length>0&&(O+="".concat($,","))}),d+="".concat(x).concat(R,'{content:"').concat(O,'"}').concat(Kt)},u=0;u<c;u++)f(u);return d}(o)})}return e.registerId=function(t){return at(t)},e.prototype.rehydrate=function(){!this.server&&mt&&Dn(this)},e.prototype.reconstructWithOptions=function(t,n){return n===void 0&&(n=!0),new e(G(G({},this.options),t),this.gs,n&&this.names||void 0)},e.prototype.allocateGSInstance=function(t){return this.gs[t]=(this.gs[t]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(t=function(n){var r=n.useCSSOMInjection,o=n.target;return n.isServer?new Wo(o):r?new Mo(o):new zo(o)}(this.options),new jo(t)));var t},e.prototype.hasNameForId=function(t,n){return this.names.has(t)&&this.names.get(t).has(n)},e.prototype.registerName=function(t,n){if(at(t),this.names.has(t))this.names.get(t).add(n);else{var r=new Set;r.add(n),this.names.set(t,r)}},e.prototype.insertRules=function(t,n,r){this.registerName(t,n),this.getTag().insertRules(at(t),r)},e.prototype.clearNames=function(t){this.names.has(t)&&this.names.get(t).clear()},e.prototype.clearRules=function(t){this.getTag().clearGroup(at(t)),this.clearNames(t)},e.prototype.clearTag=function(){this.tag=void 0},e}(),Go=/&/g,Yo=/^\s*\/\/.*$/gm;function cr(e,t){return e.map(function(n){return n.type==="rule"&&(n.value="".concat(t," ").concat(n.value),n.value=n.value.replaceAll(",",",".concat(t," ")),n.props=n.props.map(function(r){return"".concat(t," ").concat(r)})),Array.isArray(n.children)&&n.type!=="@keyframes"&&(n.children=cr(n.children,t)),n})}function Vo(e){var t,n,r,o=Me,a=o.options,i=a===void 0?Me:a,c=o.plugins,d=c===void 0?$t:c,f=function(y,h,x){return x.startsWith(n)&&x.endsWith(n)&&x.replaceAll(n,"").length>0?".".concat(t):y},u=d.slice();u.push(function(y){y.type===xt&&y.value.includes("&")&&(y.props[0]=y.props[0].replace(Go,n).replace(r,f))}),i.prefix&&u.push(mo),u.push(go);var p=function(y,h,x,R){h===void 0&&(h=""),x===void 0&&(x=""),R===void 0&&(R="&"),t=R,n=h,r=new RegExp("\\".concat(n,"\\b"),"g");var O=y.replace(Yo,""),$=uo(x||h?"".concat(x," ").concat(h," { ").concat(O," }"):O);i.namespace&&($=cr($,i.namespace));var C=[];return ht($,fo(u.concat(ho(function(m){return C.push(m)})))),C};return p.hash=d.length?d.reduce(function(y,h){return h.name||De(15),Te(y,h.name)},tr).toString():"",p}var Uo=new lr,Bt=Vo(),dr=P.createContext({shouldForwardProp:void 0,styleSheet:Uo,stylis:Bt});dr.Consumer;P.createContext(void 0);function An(){return s.useContext(dr)}var Ko=function(){function e(t,n){var r=this;this.inject=function(o,a){a===void 0&&(a=Bt);var i=r.name+a.hash;o.hasNameForId(r.id,i)||o.insertRules(r.id,i,a(r.rules,i,"@keyframes"))},this.name=t,this.id="sc-keyframes-".concat(t),this.rules=n,Zt(this,function(){throw De(12,String(r.name))})}return e.prototype.getName=function(t){return t===void 0&&(t=Bt),this.name+t.hash},e}(),qo=function(e){return e>="A"&&e<="Z"};function jn(e){for(var t="",n=0;n<e.length;n++){var r=e[n];if(n===1&&r==="-"&&e[0]==="-")return e;qo(r)?t+="-"+r.toLowerCase():t+=r}return t.startsWith("ms-")?"-"+t:t}var ur=function(e){return e==null||e===!1||e===""},pr=function(e){var t,n,r=[];for(var o in e){var a=e[o];e.hasOwnProperty(o)&&!ur(a)&&(Array.isArray(a)&&a.isCss||ke(a)?r.push("".concat(jn(o),":"),a,";"):Qe(a)?r.push.apply(r,ft(ft(["".concat(o," {")],pr(a),!1),["}"],!1)):r.push("".concat(jn(o),": ").concat((t=o,(n=a)==null||typeof n=="boolean"||n===""?"":typeof n!="number"||n===0||t in bo||t.startsWith("--")?String(n).trim():"".concat(n,"px")),";")))}return r};function Pe(e,t,n,r){if(ur(e))return[];if(qt(e))return[".".concat(e.styledComponentId)];if(ke(e)){if(!ke(a=e)||a.prototype&&a.prototype.isReactComponent||!t)return[e];var o=e(t);return Pe(o,t,n,r)}var a;return e instanceof Ko?n?(e.inject(n,r),[e.getName(r)]):[e]:Qe(e)?pr(e):Array.isArray(e)?Array.prototype.concat.apply($t,e.map(function(i){return Pe(i,t,n,r)})):[e.toString()]}function Zo(e){for(var t=0;t<e.length;t+=1){var n=e[t];if(ke(n)&&!qt(n))return!1}return!0}var Xo=nr(Rt),Qo=function(){function e(t,n,r){this.rules=t,this.staticRulesId="",this.isStatic=(r===void 0||r.isStatic)&&Zo(t),this.componentId=n,this.baseHash=Te(Xo,n),this.baseStyle=r,lr.registerId(n)}return e.prototype.generateAndInjectStyles=function(t,n,r){var o=this.baseStyle?this.baseStyle.generateAndInjectStyles(t,n,r):"";if(this.isStatic&&!r.hash)if(this.staticRulesId&&n.hasNameForId(this.componentId,this.staticRulesId))o=Ee(o,this.staticRulesId);else{var a=kn(Pe(this.rules,t,n,r)),i=zt(Te(this.baseHash,a)>>>0);if(!n.hasNameForId(this.componentId,i)){var c=r(a,".".concat(i),void 0,this.componentId);n.insertRules(this.componentId,i,c)}o=Ee(o,i),this.staticRulesId=i}else{for(var d=Te(this.baseHash,r.hash),f="",u=0;u<this.rules.length;u++){var p=this.rules[u];if(typeof p=="string")f+=p;else if(p){var y=kn(Pe(p,t,n,r));d=Te(d,y+u),f+=y}}if(f){var h=zt(d>>>0);n.hasNameForId(this.componentId,h)||n.insertRules(this.componentId,h,r(f,".".concat(h),void 0,this.componentId)),o=Ee(o,h)}}return o},e}(),wt=P.createContext(void 0);wt.Consumer;function Jo(e){var t=P.useContext(wt),n=s.useMemo(function(){return function(r,o){if(!r)throw De(14);if(ke(r)){var a=r(o);return a}if(Array.isArray(r)||typeof r!="object")throw De(8);return o?G(G({},o),r):r}(e.theme,t)},[e.theme,t]);return e.children?P.createElement(wt.Provider,{value:n},e.children):null}var Ht={};function ea(e,t,n){var r=qt(e),o=e,a=!_t(e),i=t.attrs,c=i===void 0?$t:i,d=t.componentId,f=d===void 0?function(v,D){var S=typeof v!="string"?"sc":Rn(v);Ht[S]=(Ht[S]||0)+1;var g="".concat(S,"-").concat(So(Rt+S+Ht[S]));return D?"".concat(D,"-").concat(g):g}(t.displayName,t.parentComponentId):d,u=t.displayName,p=u===void 0?function(v){return _t(v)?"styled.".concat(v):"Styled(".concat(Ro(v),")")}(e):u,y=t.displayName&&t.componentId?"".concat(Rn(t.displayName),"-").concat(t.componentId):t.componentId||f,h=r&&o.attrs?o.attrs.concat(c).filter(Boolean):c,x=t.shouldForwardProp;if(r&&o.shouldForwardProp){var R=o.shouldForwardProp;if(t.shouldForwardProp){var O=t.shouldForwardProp;x=function(v,D){return R(v,D)&&O(v,D)}}else x=R}var $=new Qo(n,y,r?o.componentStyle:void 0);function C(v,D){return function(S,g,A){var U=S.attrs,Y=S.componentStyle,J=S.defaultProps,ae=S.foldedComponentIds,H=S.styledComponentId,ge=S.target,ve=P.useContext(wt),fe=An(),se=S.shouldForwardProp||fe.shouldForwardProp,Ie=yo(g,ve,J)||Me,K=function(de,Z,me){for(var ue,ee=G(G({},Z),{className:void 0,theme:me}),Se=0;Se<de.length;Se+=1){var X=ke(ue=de[Se])?ue(ee):ue;for(var W in X)ee[W]=W==="className"?Ee(ee[W],X[W]):W==="style"?G(G({},ee[W]),X[W]):X[W]}return Z.className&&(ee.className=Ee(ee.className,Z.className)),ee}(U,g,Ie),he=K.as||ge,ce={};for(var M in K)K[M]===void 0||M[0]==="$"||M==="as"||M==="theme"&&K.theme===Ie||(M==="forwardedAs"?ce.as=K.forwardedAs:se&&!se(M,he)||(ce[M]=K[M]));var Ce=function(de,Z){var me=An(),ue=de.generateAndInjectStyles(Z,me.styleSheet,me.stylis);return ue}(Y,K),q=Ee(ae,H);return Ce&&(q+=" "+Ce),K.className&&(q+=" "+K.className),ce[_t(he)&&!er.has(he)?"class":"className"]=q,A&&(ce.ref=A),s.createElement(he,ce)}(m,v,D)}C.displayName=p;var m=P.forwardRef(C);return m.attrs=h,m.componentStyle=$,m.displayName=p,m.shouldForwardProp=x,m.foldedComponentIds=r?Ee(o.foldedComponentIds,o.styledComponentId):"",m.styledComponentId=y,m.target=r?o.target:e,Object.defineProperty(m,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(v){this._foldedDefaultProps=r?function(D){for(var S=[],g=1;g<arguments.length;g++)S[g-1]=arguments[g];for(var A=0,U=S;A<U.length;A++)Wt(D,U[A],!0);return D}({},o.defaultProps,v):v}}),Zt(m,function(){return".".concat(m.styledComponentId)}),a&&sr(m,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),m}function _n(e,t){for(var n=[e[0]],r=0,o=t.length;r<o;r+=1)n.push(t[r],e[r+1]);return n}var Hn=function(e){return Object.assign(e,{isCss:!0})};function L(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];if(ke(e)||Qe(e))return Hn(Pe(_n($t,ft([e],t,!0))));var r=e;return t.length===0&&r.length===1&&typeof r[0]=="string"?Pe(r):Hn(Pe(_n(r,t)))}function Gt(e,t,n){if(n===void 0&&(n=Me),!t)throw De(1,t);var r=function(o){for(var a=[],i=1;i<arguments.length;i++)a[i-1]=arguments[i];return e(t,n,L.apply(void 0,ft([o],a,!1)))};return r.attrs=function(o){return Gt(e,t,G(G({},n),{attrs:Array.prototype.concat(n.attrs,o).filter(Boolean)}))},r.withConfig=function(o){return Gt(e,t,G(G({},n),o))},r}var gr=function(e){return Gt(ea,e)},k=gr;er.forEach(function(e){k[e]=gr(e)});var xe;function ze(e,t){return e[t]}function ta(e=[],t,n=0){return[...e.slice(0,n),t,...e.slice(n)]}function na(e=[],t,n="id"){const r=e.slice(),o=ze(t,n);return o?r.splice(r.findIndex(a=>ze(a,n)===o),1):r.splice(r.findIndex(a=>a===t),1),r}function Tn(e){return e.map((t,n)=>{const r=Object.assign(Object.assign({},t),{sortable:t.sortable||!!t.sortFunction||void 0});return t.id||(r.id=n+1),r})}function Ze(e,t){return Math.ceil(e/t)}function Tt(e,t){return Math.min(e,t)}(function(e){e.ASC="asc",e.DESC="desc"})(xe||(xe={}));const N=()=>null;function fr(e,t=[],n=[]){let r={},o=[...n];return t.length&&t.forEach(a=>{if(!a.when||typeof a.when!="function")throw new Error('"when" must be defined in the conditional style object and must be function');a.when(e)&&(r=a.style||{},a.classNames&&(o=[...o,...a.classNames]),typeof a.style=="function"&&(r=a.style(e)||{}))}),{conditionalStyle:r,classNames:o.join(" ")}}function gt(e,t=[],n="id"){const r=ze(e,n);return r?t.some(o=>ze(o,n)===r):t.some(o=>o===e)}function st(e,t){return t?e.findIndex(n=>Xe(n.id,t)):-1}function Xe(e,t){return e==t}function ra(e,t){const n=!e.toggleOnSelectedRowsChange;switch(t.type){case"SELECT_ALL_ROWS":{const{keyField:r,rows:o,rowCount:a,mergeSelections:i}=t,c=!e.allSelected,d=!e.toggleOnSelectedRowsChange;if(i){const f=c?[...e.selectedRows,...o.filter(u=>!gt(u,e.selectedRows,r))]:e.selectedRows.filter(u=>!gt(u,o,r));return Object.assign(Object.assign({},e),{allSelected:c,selectedCount:f.length,selectedRows:f,toggleOnSelectedRowsChange:d})}return Object.assign(Object.assign({},e),{allSelected:c,selectedCount:c?a:0,selectedRows:c?o:[],toggleOnSelectedRowsChange:d})}case"SELECT_SINGLE_ROW":{const{keyField:r,row:o,isSelected:a,rowCount:i,singleSelect:c}=t;return c?a?Object.assign(Object.assign({},e),{selectedCount:0,allSelected:!1,selectedRows:[],toggleOnSelectedRowsChange:n}):Object.assign(Object.assign({},e),{selectedCount:1,allSelected:!1,selectedRows:[o],toggleOnSelectedRowsChange:n}):a?Object.assign(Object.assign({},e),{selectedCount:e.selectedRows.length>0?e.selectedRows.length-1:0,allSelected:!1,selectedRows:na(e.selectedRows,o,r),toggleOnSelectedRowsChange:n}):Object.assign(Object.assign({},e),{selectedCount:e.selectedRows.length+1,allSelected:e.selectedRows.length+1===i,selectedRows:ta(e.selectedRows,o),toggleOnSelectedRowsChange:n})}case"SELECT_MULTIPLE_ROWS":{const{keyField:r,selectedRows:o,totalRows:a,mergeSelections:i}=t;if(i){const c=[...e.selectedRows,...o.filter(d=>!gt(d,e.selectedRows,r))];return Object.assign(Object.assign({},e),{selectedCount:c.length,allSelected:!1,selectedRows:c,toggleOnSelectedRowsChange:n})}return Object.assign(Object.assign({},e),{selectedCount:o.length,allSelected:o.length===a,selectedRows:o,toggleOnSelectedRowsChange:n})}case"CLEAR_SELECTED_ROWS":{const{selectedRowsFlag:r}=t;return Object.assign(Object.assign({},e),{allSelected:!1,selectedCount:0,selectedRows:[],selectedRowsFlag:r})}case"SORT_CHANGE":{const{sortDirection:r,selectedColumn:o,clearSelectedOnSort:a}=t;return Object.assign(Object.assign(Object.assign({},e),{selectedColumn:o,sortDirection:r,currentPage:1}),a&&{allSelected:!1,selectedCount:0,selectedRows:[],toggleOnSelectedRowsChange:n})}case"CHANGE_PAGE":{const{page:r,paginationServer:o,visibleOnly:a,persistSelectedOnPageChange:i}=t,c=o&&i,d=o&&!i||a;return Object.assign(Object.assign(Object.assign(Object.assign({},e),{currentPage:r}),c&&{allSelected:!1}),d&&{allSelected:!1,selectedCount:0,selectedRows:[],toggleOnSelectedRowsChange:n})}case"CHANGE_ROWS_PER_PAGE":{const{rowsPerPage:r,page:o}=t;return Object.assign(Object.assign({},e),{currentPage:o,rowsPerPage:r})}}}const oa=L`
	pointer-events: none;
	opacity: 0.4;
`,aa=k.div`
	position: relative;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	max-width: 100%;
	${({disabled:e})=>e&&oa};
	${({theme:e})=>e.table.style};
`,sa=L`
	position: sticky;
	position: -webkit-sticky; /* Safari */
	top: 0;
	z-index: 1;
`,ia=k.div`
	display: flex;
	width: 100%;
	${({$fixedHeader:e})=>e&&sa};
	${({theme:e})=>e.head.style};
`,la=k.div`
	display: flex;
	align-items: stretch;
	width: 100%;
	${({theme:e})=>e.headRow.style};
	${({$dense:e,theme:t})=>e&&t.headRow.denseStyle};
`,hr=(e,...t)=>L`
		@media screen and (max-width: ${599}px) {
			${L(e,...t)}
		}
	`,ca=(e,...t)=>L`
		@media screen and (max-width: ${959}px) {
			${L(e,...t)}
		}
	`,da=(e,...t)=>L`
		@media screen and (max-width: ${1280}px) {
			${L(e,...t)}
		}
	`,ua=e=>(t,...n)=>L`
			@media screen and (max-width: ${e}px) {
				${L(t,...n)}
			}
		`,Ge=k.div`
	position: relative;
	display: flex;
	align-items: center;
	box-sizing: border-box;
	line-height: normal;
	${({theme:e,$headCell:t})=>e[t?"headCells":"cells"].style};
	${({$noPadding:e})=>e&&"padding: 0"};
`,mr=k(Ge)`
	flex-grow: ${({button:e,grow:t})=>t===0||e?0:t||1};
	flex-shrink: 0;
	flex-basis: 0;
	max-width: ${({maxWidth:e})=>e||"100%"};
	min-width: ${({minWidth:e})=>e||"100px"};
	${({width:e})=>e&&L`
			min-width: ${e};
			max-width: ${e};
		`};
	${({right:e})=>e&&"justify-content: flex-end"};
	${({button:e,center:t})=>(t||e)&&"justify-content: center"};
	${({compact:e,button:t})=>(e||t)&&"padding: 0"};

	/* handle hiding cells */
	${({hide:e})=>e&&e==="sm"&&hr`
    display: none;
  `};
	${({hide:e})=>e&&e==="md"&&ca`
    display: none;
  `};
	${({hide:e})=>e&&e==="lg"&&da`
    display: none;
  `};
	${({hide:e})=>e&&Number.isInteger(e)&&ua(e)`
    display: none;
  `};
`,pa=L`
	div:first-child {
		white-space: ${({$wrapCell:e})=>e?"normal":"nowrap"};
		overflow: ${({$allowOverflow:e})=>e?"visible":"hidden"};
		text-overflow: ellipsis;
	}
`,ga=k(mr).attrs(e=>({style:e.style}))`
	${({$renderAsCell:e})=>!e&&pa};
	${({theme:e,$isDragging:t})=>t&&e.cells.draggingStyle};
	${({$cellStyle:e})=>e};
`;var fa=s.memo(function({id:e,column:t,row:n,rowIndex:r,dataTag:o,isDragging:a,onDragStart:i,onDragOver:c,onDragEnd:d,onDragEnter:f,onDragLeave:u}){const{conditionalStyle:p,classNames:y}=fr(n,t.conditionalCellStyles,["rdt_TableCell"]);return s.createElement(ga,{id:e,"data-column-id":t.id,role:"cell",className:y,"data-tag":o,$cellStyle:t.style,$renderAsCell:!!t.cell,$allowOverflow:t.allowOverflow,button:t.button,center:t.center,compact:t.compact,grow:t.grow,hide:t.hide,maxWidth:t.maxWidth,minWidth:t.minWidth,right:t.right,width:t.width,$wrapCell:t.wrap,style:p,$isDragging:a,onDragStart:i,onDragOver:c,onDragEnd:d,onDragEnter:f,onDragLeave:u},!t.cell&&s.createElement("div",{"data-tag":o},function(h,x,R,O){return x?R&&typeof R=="function"?R(h,O):x(h,O):null}(n,t.selector,t.format,r)),t.cell&&t.cell(n,r,t,e))});const Fn="input";var br=s.memo(function({name:e,component:t=Fn,componentOptions:n={style:{}},indeterminate:r=!1,checked:o=!1,disabled:a=!1,onClick:i=N}){const c=t,d=c!==Fn?n.style:(u=>Object.assign(Object.assign({fontSize:"18px"},!u&&{cursor:"pointer"}),{padding:0,marginTop:"1px",verticalAlign:"middle",position:"relative"}))(a),f=s.useMemo(()=>function(u,...p){let y;return Object.keys(u).map(h=>u[h]).forEach((h,x)=>{typeof h=="function"&&(y=Object.assign(Object.assign({},u),{[Object.keys(u)[x]]:h(...p)}))}),y||u}(n,r),[n,r]);return s.createElement(c,Object.assign({type:"checkbox",ref:u=>{u&&(u.indeterminate=r)},style:d,onClick:a?N:i,name:e,"aria-label":e,checked:o,disabled:a},f,{onChange:N}))});const ha=k(Ge)`
	flex: 0 0 48px;
	min-width: 48px;
	justify-content: center;
	align-items: center;
	user-select: none;
	white-space: nowrap;
`;function ma({name:e,keyField:t,row:n,rowCount:r,selected:o,selectableRowsComponent:a,selectableRowsComponentProps:i,selectableRowsSingle:c,selectableRowDisabled:d,onSelectedRow:f}){const u=!(!d||!d(n));return s.createElement(ha,{onClick:p=>p.stopPropagation(),className:"rdt_TableCell",$noPadding:!0},s.createElement(br,{name:e,component:a,componentOptions:i,checked:o,"aria-checked":o,onClick:()=>{f({type:"SELECT_SINGLE_ROW",row:n,isSelected:o,keyField:t,rowCount:r,singleSelect:c})},disabled:u}))}const ba=k.button`
	display: inline-flex;
	align-items: center;
	user-select: none;
	white-space: nowrap;
	border: none;
	background-color: transparent;
	${({theme:e})=>e.expanderButton.style};
`;function wa({disabled:e=!1,expanded:t=!1,expandableIcon:n,id:r,row:o,onToggled:a}){const i=t?n.expanded:n.collapsed;return s.createElement(ba,{"aria-disabled":e,onClick:()=>a&&a(o),"data-testid":`expander-button-${r}`,disabled:e,"aria-label":t?"Collapse Row":"Expand Row",role:"button",type:"button"},i)}const ya=k(Ge)`
	white-space: nowrap;
	font-weight: 400;
	min-width: 48px;
	${({theme:e})=>e.expanderCell.style};
`;function xa({row:e,expanded:t=!1,expandableIcon:n,id:r,onToggled:o,disabled:a=!1}){return s.createElement(ya,{onClick:i=>i.stopPropagation(),$noPadding:!0},s.createElement(wa,{id:r,row:e,expanded:t,expandableIcon:n,disabled:a,onToggled:o}))}const va=k.div`
	width: 100%;
	box-sizing: border-box;
	${({theme:e})=>e.expanderRow.style};
	${({$extendedRowStyle:e})=>e};
`;var Ca=s.memo(function({data:e,ExpanderComponent:t,expanderComponentProps:n,extendedRowStyle:r,extendedClassNames:o}){const a=["rdt_ExpanderRow",...o.split(" ").filter(i=>i!=="rdt_TableRow")].join(" ");return s.createElement(va,{className:a,$extendedRowStyle:r},s.createElement(t,Object.assign({data:e},n)))});const Ft="allowRowEvents";var yt,Yt,Nn;(function(e){e.LTR="ltr",e.RTL="rtl",e.AUTO="auto"})(yt||(yt={})),function(e){e.LEFT="left",e.RIGHT="right",e.CENTER="center"}(Yt||(Yt={})),function(e){e.SM="sm",e.MD="md",e.LG="lg"}(Nn||(Nn={}));const Sa=L`
	&:hover {
		${({$highlightOnHover:e,theme:t})=>e&&t.rows.highlightOnHoverStyle};
	}
`,Ra=L`
	&:hover {
		cursor: pointer;
	}
`,$a=k.div.attrs(e=>({style:e.style}))`
	display: flex;
	align-items: stretch;
	align-content: stretch;
	width: 100%;
	box-sizing: border-box;
	${({theme:e})=>e.rows.style};
	${({$dense:e,theme:t})=>e&&t.rows.denseStyle};
	${({$striped:e,theme:t})=>e&&t.rows.stripedStyle};
	${({$highlightOnHover:e})=>e&&Sa};
	${({$pointerOnHover:e})=>e&&Ra};
	${({$selected:e,theme:t})=>e&&t.rows.selectedHighlightStyle};
	${({$conditionalStyle:e})=>e};
`;function Ea({columns:e=[],conditionalRowStyles:t=[],defaultExpanded:n=!1,defaultExpanderDisabled:r=!1,dense:o=!1,expandableIcon:a,expandableRows:i=!1,expandableRowsComponent:c,expandableRowsComponentProps:d,expandableRowsHideExpander:f,expandOnRowClicked:u=!1,expandOnRowDoubleClicked:p=!1,highlightOnHover:y=!1,id:h,expandableInheritConditionalStyles:x,keyField:R,onRowClicked:O=N,onRowDoubleClicked:$=N,onRowMouseEnter:C=N,onRowMouseLeave:m=N,onRowExpandToggled:v=N,onSelectedRow:D=N,pointerOnHover:S=!1,row:g,rowCount:A,rowIndex:U,selectableRowDisabled:Y=null,selectableRows:J=!1,selectableRowsComponent:ae,selectableRowsComponentProps:H,selectableRowsHighlight:ge=!1,selectableRowsSingle:ve=!1,selected:fe,striped:se=!1,draggingColumnId:Ie,onDragStart:K,onDragOver:he,onDragEnd:ce,onDragEnter:M,onDragLeave:Ce}){const[q,de]=s.useState(n);s.useEffect(()=>{de(n)},[n]);const Z=s.useCallback(()=>{de(!q),v(!q,g)},[q,v,g]),me=S||i&&(u||p),ue=s.useCallback(F=>{F.target.getAttribute("data-tag")===Ft&&(O(g,F),!r&&i&&u&&Z())},[r,u,i,Z,O,g]),ee=s.useCallback(F=>{F.target.getAttribute("data-tag")===Ft&&($(g,F),!r&&i&&p&&Z())},[r,p,i,Z,$,g]),Se=s.useCallback(F=>{C(g,F)},[C,g]),X=s.useCallback(F=>{m(g,F)},[m,g]),W=ze(g,R),{conditionalStyle:et,classNames:tt}=fr(g,t,["rdt_TableRow"]),Et=ge&&fe,Ot=x?et:{},Pt=se&&U%2==0;return s.createElement(s.Fragment,null,s.createElement($a,{id:`row-${h}`,role:"row",$striped:Pt,$highlightOnHover:y,$pointerOnHover:!r&&me,$dense:o,onClick:ue,onDoubleClick:ee,onMouseEnter:Se,onMouseLeave:X,className:tt,$selected:Et,$conditionalStyle:et},J&&s.createElement(ma,{name:`select-row-${W}`,keyField:R,row:g,rowCount:A,selected:fe,selectableRowsComponent:ae,selectableRowsComponentProps:H,selectableRowDisabled:Y,selectableRowsSingle:ve,onSelectedRow:D}),i&&!f&&s.createElement(xa,{id:W,expandableIcon:a,expanded:q,row:g,onToggled:Z,disabled:r}),e.map(F=>F.omit?null:s.createElement(fa,{id:`cell-${F.id}-${W}`,key:`cell-${F.id}-${W}`,dataTag:F.ignoreRowClick||F.button?null:Ft,column:F,row:g,rowIndex:U,isDragging:Xe(Ie,F.id),onDragStart:K,onDragOver:he,onDragEnd:ce,onDragEnter:M,onDragLeave:Ce}))),i&&q&&s.createElement(Ca,{key:`expander-${W}`,data:g,extendedRowStyle:Ot,extendedClassNames:tt,ExpanderComponent:c,expanderComponentProps:d}))}const Oa=k.span`
	padding: 2px;
	color: inherit;
	flex-grow: 0;
	flex-shrink: 0;
	${({$sortActive:e})=>e?"opacity: 1":"opacity: 0"};
	${({$sortDirection:e})=>e==="desc"&&"transform: rotate(180deg)"};
`,Pa=({sortActive:e,sortDirection:t})=>P.createElement(Oa,{$sortActive:e,$sortDirection:t},"▲"),ka=k(mr)`
	${({button:e})=>e&&"text-align: center"};
	${({theme:e,$isDragging:t})=>t&&e.headCells.draggingStyle};
`,Da=L`
	cursor: pointer;
	span.__rdt_custom_sort_icon__ {
		i,
		svg {
			transform: 'translate3d(0, 0, 0)';
			${({$sortActive:e})=>e?"opacity: 1":"opacity: 0"};
			color: inherit;
			font-size: 18px;
			height: 18px;
			width: 18px;
			backface-visibility: hidden;
			transform-style: preserve-3d;
			transition-duration: 95ms;
			transition-property: transform;
		}

		&.asc i,
		&.asc svg {
			transform: rotate(180deg);
		}
	}

	${({$sortActive:e})=>!e&&L`
			&:hover,
			&:focus {
				opacity: 0.7;

				span,
				span.__rdt_custom_sort_icon__ * {
					opacity: 0.7;
				}
			}
		`};
`,Ia=k.div`
	display: inline-flex;
	align-items: center;
	justify-content: inherit;
	height: 100%;
	width: 100%;
	outline: none;
	user-select: none;
	overflow: hidden;
	${({disabled:e})=>!e&&Da};
`,Aa=k.div`
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`;var ja=s.memo(function({column:e,disabled:t,draggingColumnId:n,selectedColumn:r={},sortDirection:o,sortIcon:a,sortServer:i,pagination:c,paginationServer:d,persistSelectedOnSort:f,selectableRowsVisibleOnly:u,onSort:p,onDragStart:y,onDragOver:h,onDragEnd:x,onDragEnter:R,onDragLeave:O}){s.useEffect(()=>{typeof e.selector=="string"&&console.error(`Warning: ${e.selector} is a string based column selector which has been deprecated as of v7 and will be removed in v8. Instead, use a selector function e.g. row => row[field]...`)},[]);const[$,C]=s.useState(!1),m=s.useRef(null);if(s.useEffect(()=>{m.current&&C(m.current.scrollWidth>m.current.clientWidth)},[$]),e.omit)return null;const v=()=>{if(!e.sortable&&!e.selector)return;let H=o;Xe(r.id,e.id)&&(H=o===xe.ASC?xe.DESC:xe.ASC),p({type:"SORT_CHANGE",sortDirection:H,selectedColumn:e,clearSelectedOnSort:c&&d&&!f||i||u})},D=H=>s.createElement(Pa,{sortActive:H,sortDirection:o}),S=()=>s.createElement("span",{className:[o,"__rdt_custom_sort_icon__"].join(" ")},a),g=!(!e.sortable||!Xe(r.id,e.id)),A=!e.sortable||t,U=e.sortable&&!a&&!e.right,Y=e.sortable&&!a&&e.right,J=e.sortable&&a&&!e.right,ae=e.sortable&&a&&e.right;return s.createElement(ka,{"data-column-id":e.id,className:"rdt_TableCol",$headCell:!0,allowOverflow:e.allowOverflow,button:e.button,compact:e.compact,grow:e.grow,hide:e.hide,maxWidth:e.maxWidth,minWidth:e.minWidth,right:e.right,center:e.center,width:e.width,draggable:e.reorder,$isDragging:Xe(e.id,n),onDragStart:y,onDragOver:h,onDragEnd:x,onDragEnter:R,onDragLeave:O},e.name&&s.createElement(Ia,{"data-column-id":e.id,"data-sort-id":e.id,role:"columnheader",tabIndex:0,className:"rdt_TableCol_Sortable",onClick:A?void 0:v,onKeyPress:A?void 0:H=>{H.key==="Enter"&&v()},$sortActive:!A&&g,disabled:A},!A&&ae&&S(),!A&&Y&&D(g),typeof e.name=="string"?s.createElement(Aa,{title:$?e.name:void 0,ref:m,"data-column-id":e.id},e.name):e.name,!A&&J&&S(),!A&&U&&D(g)))});const _a=k(Ge)`
	flex: 0 0 48px;
	justify-content: center;
	align-items: center;
	user-select: none;
	white-space: nowrap;
	font-size: unset;
`;function Ha({headCell:e=!0,rowData:t,keyField:n,allSelected:r,mergeSelections:o,selectedRows:a,selectableRowsComponent:i,selectableRowsComponentProps:c,selectableRowDisabled:d,onSelectAllRows:f}){const u=a.length>0&&!r,p=d?t.filter(x=>!d(x)):t,y=p.length===0,h=Math.min(t.length,p.length);return s.createElement(_a,{className:"rdt_TableCol",$headCell:e,$noPadding:!0},s.createElement(br,{name:"select-all-rows",component:i,componentOptions:c,onClick:()=>{f({type:"SELECT_ALL_ROWS",rows:p,rowCount:h,mergeSelections:o,keyField:n})},checked:r,indeterminate:u,disabled:y}))}function wr(e=yt.AUTO){const t=typeof window=="object",[n,r]=s.useState(!1);return s.useEffect(()=>{if(t)if(e!=="auto")r(e==="rtl");else{const o=!(!window.document||!window.document.createElement),a=document.getElementsByTagName("BODY")[0],i=document.getElementsByTagName("HTML")[0],c=a.dir==="rtl"||i.dir==="rtl";r(o&&c)}},[e,t]),n}const Ta=k.div`
	display: flex;
	align-items: center;
	flex: 1 0 auto;
	height: 100%;
	color: ${({theme:e})=>e.contextMenu.fontColor};
	font-size: ${({theme:e})=>e.contextMenu.fontSize};
	font-weight: 400;
`,Fa=k.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	flex-wrap: wrap;
`,Ln=k.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	box-sizing: inherit;
	z-index: 1;
	align-items: center;
	justify-content: space-between;
	display: flex;
	${({$rtl:e})=>e&&"direction: rtl"};
	${({theme:e})=>e.contextMenu.style};
	${({theme:e,$visible:t})=>t&&e.contextMenu.activeStyle};
`;function Na({contextMessage:e,contextActions:t,contextComponent:n,selectedCount:r,direction:o}){const a=wr(o),i=r>0;return n?s.createElement(Ln,{$visible:i},s.cloneElement(n,{selectedCount:r})):s.createElement(Ln,{$visible:i,$rtl:a},s.createElement(Ta,null,((c,d,f)=>{if(d===0)return null;const u=d===1?c.singular:c.plural;return f?`${d} ${c.message||""} ${u}`:`${d} ${u} ${c.message||""}`})(e,r,a)),s.createElement(Fa,null,t))}const La=k.div`
	position: relative;
	box-sizing: border-box;
	overflow: hidden;
	display: flex;
	flex: 1 1 auto;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	flex-wrap: wrap;
	${({theme:e})=>e.header.style}
`,Ma=k.div`
	flex: 1 0 auto;
	color: ${({theme:e})=>e.header.fontColor};
	font-size: ${({theme:e})=>e.header.fontSize};
	font-weight: 400;
`,za=k.div`
	flex: 1 0 auto;
	display: flex;
	align-items: center;
	justify-content: flex-end;

	> * {
		margin-left: 5px;
	}
`,Wa=({title:e,actions:t=null,contextMessage:n,contextActions:r,contextComponent:o,selectedCount:a,direction:i,showMenu:c=!0})=>s.createElement(La,{className:"rdt_TableHeader",role:"heading","aria-level":1},s.createElement(Ma,null,e),t&&s.createElement(za,null,t),c&&s.createElement(Na,{contextMessage:n,contextActions:r,contextComponent:o,direction:i,selectedCount:a}));function yr(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function"){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n}const Ba={left:"flex-start",right:"flex-end",center:"center"},Ga=k.header`
	position: relative;
	display: flex;
	flex: 1 1 auto;
	box-sizing: border-box;
	align-items: center;
	padding: 4px 16px 4px 24px;
	width: 100%;
	justify-content: ${({align:e})=>Ba[e]};
	flex-wrap: ${({$wrapContent:e})=>e?"wrap":"nowrap"};
	${({theme:e})=>e.subHeader.style}
`,Ya=e=>{var{align:t="right",wrapContent:n=!0}=e,r=yr(e,["align","wrapContent"]);return s.createElement(Ga,Object.assign({align:t,$wrapContent:n},r))},Va=k.div`
	display: flex;
	flex-direction: column;
`,Ua=k.div`
	position: relative;
	width: 100%;
	border-radius: inherit;
	${({$responsive:e,$fixedHeader:t})=>e&&L`
			overflow-x: auto;

			// hidden prevents vertical scrolling in firefox when fixedHeader is disabled
			overflow-y: ${t?"auto":"hidden"};
			min-height: 0;
		`};

	${({$fixedHeader:e=!1,$fixedHeaderScrollHeight:t="100vh"})=>e&&L`
			max-height: ${t};
			-webkit-overflow-scrolling: touch;
		`};

	${({theme:e})=>e.responsiveWrapper.style};
`,Mn=k.div`
	position: relative;
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	${e=>e.theme.progress.style};
`,Ka=k.div`
	position: relative;
	width: 100%;
	${({theme:e})=>e.tableWrapper.style};
`,qa=k(Ge)`
	white-space: nowrap;
	${({theme:e})=>e.expanderCell.style};
`,Za=k.div`
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	${({theme:e})=>e.noData.style};
`,Xa=()=>P.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"},P.createElement("path",{d:"M7 10l5 5 5-5z"}),P.createElement("path",{d:"M0 0h24v24H0z",fill:"none"})),Qa=k.select`
	cursor: pointer;
	height: 24px;
	max-width: 100%;
	user-select: none;
	padding-left: 8px;
	padding-right: 24px;
	box-sizing: content-box;
	font-size: inherit;
	color: inherit;
	border: none;
	background-color: transparent;
	appearance: none;
	direction: ltr;
	flex-shrink: 0;

	&::-ms-expand {
		display: none;
	}

	&:disabled::-ms-expand {
		background: #f60;
	}

	option {
		color: initial;
	}
`,Ja=k.div`
	position: relative;
	flex-shrink: 0;
	font-size: inherit;
	color: inherit;
	margin-top: 1px;

	svg {
		top: 0;
		right: 0;
		color: inherit;
		position: absolute;
		fill: currentColor;
		width: 24px;
		height: 24px;
		display: inline-block;
		user-select: none;
		pointer-events: none;
	}
`,es=e=>{var{defaultValue:t,onChange:n}=e,r=yr(e,["defaultValue","onChange"]);return s.createElement(Ja,null,s.createElement(Qa,Object.assign({onChange:n,defaultValue:t},r)),s.createElement(Xa,null))},l={columns:[],data:[],title:"",keyField:"id",selectableRows:!1,selectableRowsHighlight:!1,selectableRowsNoSelectAll:!1,selectableRowSelected:null,selectableRowDisabled:null,selectableRowsComponent:"input",selectableRowsComponentProps:{},selectableRowsVisibleOnly:!1,selectableRowsSingle:!1,clearSelectedRows:!1,expandableRows:!1,expandableRowDisabled:null,expandableRowExpanded:null,expandOnRowClicked:!1,expandableRowsHideExpander:!1,expandOnRowDoubleClicked:!1,expandableInheritConditionalStyles:!1,expandableRowsComponent:function(){return P.createElement("div",null,"To add an expander pass in a component instance via ",P.createElement("strong",null,"expandableRowsComponent"),". You can then access props.data from this component.")},expandableIcon:{collapsed:P.createElement(()=>P.createElement("svg",{fill:"currentColor",height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg"},P.createElement("path",{d:"M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"}),P.createElement("path",{d:"M0-.25h24v24H0z",fill:"none"})),null),expanded:P.createElement(()=>P.createElement("svg",{fill:"currentColor",height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg"},P.createElement("path",{d:"M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"}),P.createElement("path",{d:"M0-.75h24v24H0z",fill:"none"})),null)},expandableRowsComponentProps:{},progressPending:!1,progressComponent:P.createElement("div",{style:{fontSize:"24px",fontWeight:700,padding:"24px"}},"Loading..."),persistTableHead:!1,sortIcon:null,sortFunction:null,sortServer:!1,striped:!1,highlightOnHover:!1,pointerOnHover:!1,noContextMenu:!1,contextMessage:{singular:"item",plural:"items",message:"selected"},actions:null,contextActions:null,contextComponent:null,defaultSortFieldId:null,defaultSortAsc:!0,responsive:!0,noDataComponent:P.createElement("div",{style:{padding:"24px"}},"There are no records to display"),disabled:!1,noTableHead:!1,noHeader:!1,subHeader:!1,subHeaderAlign:Yt.RIGHT,subHeaderWrap:!0,subHeaderComponent:null,fixedHeader:!1,fixedHeaderScrollHeight:"100vh",pagination:!1,paginationServer:!1,paginationServerOptions:{persistSelectedOnSort:!1,persistSelectedOnPageChange:!1},paginationDefaultPage:1,paginationResetDefaultPage:!1,paginationTotalRows:0,paginationPerPage:10,paginationRowsPerPageOptions:[10,15,20,25,30],paginationComponent:null,paginationComponentOptions:{},paginationIconFirstPage:P.createElement(()=>P.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24","aria-hidden":"true",role:"presentation"},P.createElement("path",{d:"M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"}),P.createElement("path",{fill:"none",d:"M24 24H0V0h24v24z"})),null),paginationIconLastPage:P.createElement(()=>P.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24","aria-hidden":"true",role:"presentation"},P.createElement("path",{d:"M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"}),P.createElement("path",{fill:"none",d:"M0 0h24v24H0V0z"})),null),paginationIconNext:P.createElement(()=>P.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24","aria-hidden":"true",role:"presentation"},P.createElement("path",{d:"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"}),P.createElement("path",{d:"M0 0h24v24H0z",fill:"none"})),null),paginationIconPrevious:P.createElement(()=>P.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24","aria-hidden":"true",role:"presentation"},P.createElement("path",{d:"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"}),P.createElement("path",{d:"M0 0h24v24H0z",fill:"none"})),null),dense:!1,conditionalRowStyles:[],theme:"default",customStyles:{},direction:yt.AUTO,onChangePage:N,onChangeRowsPerPage:N,onRowClicked:N,onRowDoubleClicked:N,onRowMouseEnter:N,onRowMouseLeave:N,onRowExpandToggled:N,onSelectedRowsChange:N,onSort:N,onColumnOrderChange:N},ts={rowsPerPageText:"Rows per page:",rangeSeparatorText:"of",noRowsPerPage:!1,selectAllRowsItem:!1,selectAllRowsItemText:"All"},ns=k.nav`
	display: flex;
	flex: 1 1 auto;
	justify-content: flex-end;
	align-items: center;
	box-sizing: border-box;
	padding-right: 8px;
	padding-left: 8px;
	width: 100%;
	${({theme:e})=>e.pagination.style};
`,it=k.button`
	position: relative;
	display: block;
	user-select: none;
	border: none;
	${({theme:e})=>e.pagination.pageButtonsStyle};
	${({$isRTL:e})=>e&&"transform: scale(-1, -1)"};
`,rs=k.div`
	display: flex;
	align-items: center;
	border-radius: 4px;
	white-space: nowrap;
	${hr`
    width: 100%;
    justify-content: space-around;
  `};
`,xr=k.span`
	flex-shrink: 1;
	user-select: none;
`,os=k(xr)`
	margin: 0 24px;
`,as=k(xr)`
	margin: 0 4px;
`;var ss=s.memo(function({rowsPerPage:e,rowCount:t,currentPage:n,direction:r=l.direction,paginationRowsPerPageOptions:o=l.paginationRowsPerPageOptions,paginationIconLastPage:a=l.paginationIconLastPage,paginationIconFirstPage:i=l.paginationIconFirstPage,paginationIconNext:c=l.paginationIconNext,paginationIconPrevious:d=l.paginationIconPrevious,paginationComponentOptions:f=l.paginationComponentOptions,onChangeRowsPerPage:u=l.onChangeRowsPerPage,onChangePage:p=l.onChangePage}){const y=(()=>{const H=typeof window=="object";function ge(){return{width:H?window.innerWidth:void 0,height:H?window.innerHeight:void 0}}const[ve,fe]=s.useState(ge);return s.useEffect(()=>{if(!H)return()=>null;function se(){fe(ge())}return window.addEventListener("resize",se),()=>window.removeEventListener("resize",se)},[]),ve})(),h=wr(r),x=y.width&&y.width>599,R=Ze(t,e),O=n*e,$=O-e+1,C=n===1,m=n===R,v=Object.assign(Object.assign({},ts),f),D=n===R?`${$}-${t} ${v.rangeSeparatorText} ${t}`:`${$}-${O} ${v.rangeSeparatorText} ${t}`,S=s.useCallback(()=>p(n-1),[n,p]),g=s.useCallback(()=>p(n+1),[n,p]),A=s.useCallback(()=>p(1),[p]),U=s.useCallback(()=>p(Ze(t,e)),[p,t,e]),Y=s.useCallback(H=>u(Number(H.target.value),n),[n,u]),J=o.map(H=>s.createElement("option",{key:H,value:H},H));v.selectAllRowsItem&&J.push(s.createElement("option",{key:-1,value:t},v.selectAllRowsItemText));const ae=s.createElement(es,{onChange:Y,defaultValue:e,"aria-label":v.rowsPerPageText},J);return s.createElement(ns,{className:"rdt_Pagination"},!v.noRowsPerPage&&x&&s.createElement(s.Fragment,null,s.createElement(as,null,v.rowsPerPageText),ae),x&&s.createElement(os,null,D),s.createElement(rs,null,s.createElement(it,{id:"pagination-first-page",type:"button","aria-label":"First Page","aria-disabled":C,onClick:A,disabled:C,$isRTL:h},i),s.createElement(it,{id:"pagination-previous-page",type:"button","aria-label":"Previous Page","aria-disabled":C,onClick:S,disabled:C,$isRTL:h},d),!v.noRowsPerPage&&!x&&ae,s.createElement(it,{id:"pagination-next-page",type:"button","aria-label":"Next Page","aria-disabled":m,onClick:g,disabled:m,$isRTL:h},c),s.createElement(it,{id:"pagination-last-page",type:"button","aria-label":"Last Page","aria-disabled":m,onClick:U,disabled:m,$isRTL:h},a)))});const $e=(e,t)=>{const n=s.useRef(!0);s.useEffect(()=>{n.current?n.current=!1:e()},t)};function is(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var ls=function(e){return function(t){return!!t&&typeof t=="object"}(e)&&!function(t){var n=Object.prototype.toString.call(t);return n==="[object RegExp]"||n==="[object Date]"||function(r){return r.$$typeof===cs}(t)}(e)},cs=typeof Symbol=="function"&&Symbol.for?Symbol.for("react.element"):60103;function Je(e,t){return t.clone!==!1&&t.isMergeableObject(e)?We((n=e,Array.isArray(n)?[]:{}),e,t):e;var n}function ds(e,t,n){return e.concat(t).map(function(r){return Je(r,n)})}function zn(e){return Object.keys(e).concat(function(t){return Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t).filter(function(n){return Object.propertyIsEnumerable.call(t,n)}):[]}(e))}function Wn(e,t){try{return t in e}catch{return!1}}function us(e,t,n){var r={};return n.isMergeableObject(e)&&zn(e).forEach(function(o){r[o]=Je(e[o],n)}),zn(t).forEach(function(o){(function(a,i){return Wn(a,i)&&!(Object.hasOwnProperty.call(a,i)&&Object.propertyIsEnumerable.call(a,i))})(e,o)||(Wn(e,o)&&n.isMergeableObject(t[o])?r[o]=function(a,i){if(!i.customMerge)return We;var c=i.customMerge(a);return typeof c=="function"?c:We}(o,n)(e[o],t[o],n):r[o]=Je(t[o],n))}),r}function We(e,t,n){(n=n||{}).arrayMerge=n.arrayMerge||ds,n.isMergeableObject=n.isMergeableObject||ls,n.cloneUnlessOtherwiseSpecified=Je;var r=Array.isArray(t);return r===Array.isArray(e)?r?n.arrayMerge(e,t,n):us(e,t,n):Je(t,n)}We.all=function(e,t){if(!Array.isArray(e))throw new Error("first argument should be an array");return e.reduce(function(n,r){return We(n,r,t)},{})};var ps=is(We);const Bn={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.54)",disabled:"rgba(0, 0, 0, 0.38)"},background:{default:"#FFFFFF"},context:{background:"#e3f2fd",text:"rgba(0, 0, 0, 0.87)"},divider:{default:"rgba(0,0,0,.12)"},button:{default:"rgba(0,0,0,.54)",focus:"rgba(0,0,0,.12)",hover:"rgba(0,0,0,.12)",disabled:"rgba(0, 0, 0, .18)"},selected:{default:"#e3f2fd",text:"rgba(0, 0, 0, 0.87)"},highlightOnHover:{default:"#EEEEEE",text:"rgba(0, 0, 0, 0.87)"},striped:{default:"#FAFAFA",text:"rgba(0, 0, 0, 0.87)"}},Gn={default:Bn,light:Bn,dark:{text:{primary:"#FFFFFF",secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(0,0,0,.12)"},background:{default:"#424242"},context:{background:"#E91E63",text:"#FFFFFF"},divider:{default:"rgba(81, 81, 81, 1)"},button:{default:"#FFFFFF",focus:"rgba(255, 255, 255, .54)",hover:"rgba(255, 255, 255, .12)",disabled:"rgba(255, 255, 255, .18)"},selected:{default:"rgba(0, 0, 0, .7)",text:"#FFFFFF"},highlightOnHover:{default:"rgba(0, 0, 0, .7)",text:"#FFFFFF"},striped:{default:"rgba(0, 0, 0, .87)",text:"#FFFFFF"}}};function gs(e,t,n,r){const[o,a]=s.useState(()=>Tn(e)),[i,c]=s.useState(""),d=s.useRef("");$e(()=>{a(Tn(e))},[e]);const f=s.useCallback(O=>{var $,C,m;const{attributes:v}=O.target,D=($=v.getNamedItem("data-column-id"))===null||$===void 0?void 0:$.value;D&&(d.current=((m=(C=o[st(o,D)])===null||C===void 0?void 0:C.id)===null||m===void 0?void 0:m.toString())||"",c(d.current))},[o]),u=s.useCallback(O=>{var $;const{attributes:C}=O.target,m=($=C.getNamedItem("data-column-id"))===null||$===void 0?void 0:$.value;if(m&&d.current&&m!==d.current){const v=st(o,d.current),D=st(o,m),S=[...o];S[v]=o[D],S[D]=o[v],a(S),t(S)}},[t,o]),p=s.useCallback(O=>{O.preventDefault()},[]),y=s.useCallback(O=>{O.preventDefault()},[]),h=s.useCallback(O=>{O.preventDefault(),d.current="",c("")},[]),x=function(O=!1){return O?xe.ASC:xe.DESC}(r),R=s.useMemo(()=>o[st(o,n==null?void 0:n.toString())]||{},[n,o]);return{tableColumns:o,draggingColumnId:i,handleDragStart:f,handleDragEnter:u,handleDragOver:p,handleDragLeave:y,handleDragEnd:h,defaultSortDirection:x,defaultSortColumn:R}}var fs=s.memo(function(e){const{data:t=l.data,columns:n=l.columns,title:r=l.title,actions:o=l.actions,keyField:a=l.keyField,striped:i=l.striped,highlightOnHover:c=l.highlightOnHover,pointerOnHover:d=l.pointerOnHover,dense:f=l.dense,selectableRows:u=l.selectableRows,selectableRowsSingle:p=l.selectableRowsSingle,selectableRowsHighlight:y=l.selectableRowsHighlight,selectableRowsNoSelectAll:h=l.selectableRowsNoSelectAll,selectableRowsVisibleOnly:x=l.selectableRowsVisibleOnly,selectableRowSelected:R=l.selectableRowSelected,selectableRowDisabled:O=l.selectableRowDisabled,selectableRowsComponent:$=l.selectableRowsComponent,selectableRowsComponentProps:C=l.selectableRowsComponentProps,onRowExpandToggled:m=l.onRowExpandToggled,onSelectedRowsChange:v=l.onSelectedRowsChange,expandableIcon:D=l.expandableIcon,onChangeRowsPerPage:S=l.onChangeRowsPerPage,onChangePage:g=l.onChangePage,paginationServer:A=l.paginationServer,paginationServerOptions:U=l.paginationServerOptions,paginationTotalRows:Y=l.paginationTotalRows,paginationDefaultPage:J=l.paginationDefaultPage,paginationResetDefaultPage:ae=l.paginationResetDefaultPage,paginationPerPage:H=l.paginationPerPage,paginationRowsPerPageOptions:ge=l.paginationRowsPerPageOptions,paginationIconLastPage:ve=l.paginationIconLastPage,paginationIconFirstPage:fe=l.paginationIconFirstPage,paginationIconNext:se=l.paginationIconNext,paginationIconPrevious:Ie=l.paginationIconPrevious,paginationComponent:K=l.paginationComponent,paginationComponentOptions:he=l.paginationComponentOptions,responsive:ce=l.responsive,progressPending:M=l.progressPending,progressComponent:Ce=l.progressComponent,persistTableHead:q=l.persistTableHead,noDataComponent:de=l.noDataComponent,disabled:Z=l.disabled,noTableHead:me=l.noTableHead,noHeader:ue=l.noHeader,fixedHeader:ee=l.fixedHeader,fixedHeaderScrollHeight:Se=l.fixedHeaderScrollHeight,pagination:X=l.pagination,subHeader:W=l.subHeader,subHeaderAlign:et=l.subHeaderAlign,subHeaderWrap:tt=l.subHeaderWrap,subHeaderComponent:Et=l.subHeaderComponent,noContextMenu:Ot=l.noContextMenu,contextMessage:Pt=l.contextMessage,contextActions:F=l.contextActions,contextComponent:vr=l.contextComponent,expandableRows:nt=l.expandableRows,onRowClicked:Xt=l.onRowClicked,onRowDoubleClicked:Qt=l.onRowDoubleClicked,onRowMouseEnter:Jt=l.onRowMouseEnter,onRowMouseLeave:en=l.onRowMouseLeave,sortIcon:Cr=l.sortIcon,onSort:Sr=l.onSort,sortFunction:tn=l.sortFunction,sortServer:kt=l.sortServer,expandableRowsComponent:Rr=l.expandableRowsComponent,expandableRowsComponentProps:$r=l.expandableRowsComponentProps,expandableRowDisabled:nn=l.expandableRowDisabled,expandableRowsHideExpander:rn=l.expandableRowsHideExpander,expandOnRowClicked:Er=l.expandOnRowClicked,expandOnRowDoubleClicked:Or=l.expandOnRowDoubleClicked,expandableRowExpanded:on=l.expandableRowExpanded,expandableInheritConditionalStyles:Pr=l.expandableInheritConditionalStyles,defaultSortFieldId:kr=l.defaultSortFieldId,defaultSortAsc:Dr=l.defaultSortAsc,clearSelectedRows:an=l.clearSelectedRows,conditionalRowStyles:Ir=l.conditionalRowStyles,theme:sn=l.theme,customStyles:ln=l.customStyles,direction:Ye=l.direction,onColumnOrderChange:Ar=l.onColumnOrderChange,className:jr,ariaLabel:cn}=e,{tableColumns:dn,draggingColumnId:un,handleDragStart:pn,handleDragEnter:gn,handleDragOver:fn,handleDragLeave:hn,handleDragEnd:mn,defaultSortDirection:_r,defaultSortColumn:Hr}=gs(n,Ar,kr,Dr),[{rowsPerPage:be,currentPage:ne,selectedRows:Dt,allSelected:bn,selectedCount:wn,selectedColumn:ie,sortDirection:Ae,toggleOnSelectedRowsChange:Tr},Re]=s.useReducer(ra,{allSelected:!1,selectedCount:0,selectedRows:[],selectedColumn:Hr,toggleOnSelectedRowsChange:!1,sortDirection:_r,currentPage:J,rowsPerPage:H,selectedRowsFlag:!1,contextMessage:l.contextMessage}),{persistSelectedOnSort:yn=!1,persistSelectedOnPageChange:rt=!1}=U,xn=!(!A||!rt&&!yn),Fr=X&&!M&&t.length>0,Nr=K||ss,Lr=s.useMemo(()=>((b={},I="default",V="default")=>{const re=Gn[I]?I:V;return ps({table:{style:{color:(w=Gn[re]).text.primary,backgroundColor:w.background.default}},tableWrapper:{style:{display:"table"}},responsiveWrapper:{style:{}},header:{style:{fontSize:"22px",color:w.text.primary,backgroundColor:w.background.default,minHeight:"56px",paddingLeft:"16px",paddingRight:"8px"}},subHeader:{style:{backgroundColor:w.background.default,minHeight:"52px"}},head:{style:{color:w.text.primary,fontSize:"12px",fontWeight:500}},headRow:{style:{backgroundColor:w.background.default,minHeight:"52px",borderBottomWidth:"1px",borderBottomColor:w.divider.default,borderBottomStyle:"solid"},denseStyle:{minHeight:"32px"}},headCells:{style:{paddingLeft:"16px",paddingRight:"16px"},draggingStyle:{cursor:"move"}},contextMenu:{style:{backgroundColor:w.context.background,fontSize:"18px",fontWeight:400,color:w.context.text,paddingLeft:"16px",paddingRight:"8px",transform:"translate3d(0, -100%, 0)",transitionDuration:"125ms",transitionTimingFunction:"cubic-bezier(0, 0, 0.2, 1)",willChange:"transform"},activeStyle:{transform:"translate3d(0, 0, 0)"}},cells:{style:{paddingLeft:"16px",paddingRight:"16px",wordBreak:"break-word"},draggingStyle:{}},rows:{style:{fontSize:"13px",fontWeight:400,color:w.text.primary,backgroundColor:w.background.default,minHeight:"48px","&:not(:last-of-type)":{borderBottomStyle:"solid",borderBottomWidth:"1px",borderBottomColor:w.divider.default}},denseStyle:{minHeight:"32px"},selectedHighlightStyle:{"&:nth-of-type(n)":{color:w.selected.text,backgroundColor:w.selected.default,borderBottomColor:w.background.default}},highlightOnHoverStyle:{color:w.highlightOnHover.text,backgroundColor:w.highlightOnHover.default,transitionDuration:"0.15s",transitionProperty:"background-color",borderBottomColor:w.background.default,outlineStyle:"solid",outlineWidth:"1px",outlineColor:w.background.default},stripedStyle:{color:w.striped.text,backgroundColor:w.striped.default}},expanderRow:{style:{color:w.text.primary,backgroundColor:w.background.default}},expanderCell:{style:{flex:"0 0 48px"}},expanderButton:{style:{color:w.button.default,fill:w.button.default,backgroundColor:"transparent",borderRadius:"2px",transition:"0.25s",height:"100%",width:"100%","&:hover:enabled":{cursor:"pointer"},"&:disabled":{color:w.button.disabled},"&:hover:not(:disabled)":{cursor:"pointer",backgroundColor:w.button.hover},"&:focus":{outline:"none",backgroundColor:w.button.focus},svg:{margin:"auto"}}},pagination:{style:{color:w.text.secondary,fontSize:"13px",minHeight:"56px",backgroundColor:w.background.default,borderTopStyle:"solid",borderTopWidth:"1px",borderTopColor:w.divider.default},pageButtonsStyle:{borderRadius:"50%",height:"40px",width:"40px",padding:"8px",margin:"px",cursor:"pointer",transition:"0.4s",color:w.button.default,fill:w.button.default,backgroundColor:"transparent","&:disabled":{cursor:"unset",color:w.button.disabled,fill:w.button.disabled},"&:hover:not(:disabled)":{backgroundColor:w.button.hover},"&:focus":{outline:"none",backgroundColor:w.button.focus}}},noData:{style:{display:"flex",alignItems:"center",justifyContent:"center",color:w.text.primary,backgroundColor:w.background.default}},progress:{style:{display:"flex",alignItems:"center",justifyContent:"center",color:w.text.primary,backgroundColor:w.background.default}}},b);var w})(ln,sn),[ln,sn]),Mr=s.useMemo(()=>Object.assign({},Ye!=="auto"&&{dir:Ye}),[Ye]),B=s.useMemo(()=>{if(kt)return t;if(ie!=null&&ie.sortFunction&&typeof ie.sortFunction=="function"){const b=ie.sortFunction,I=Ae===xe.ASC?b:(V,re)=>-1*b(V,re);return[...t].sort(I)}return function(b,I,V,re){return I?re&&typeof re=="function"?re(b.slice(0),I,V):b.slice(0).sort((w,It)=>{const _e=I(w),we=I(It);if(V==="asc"){if(_e<we)return-1;if(_e>we)return 1}if(V==="desc"){if(_e>we)return-1;if(_e<we)return 1}return 0}):b}(t,ie==null?void 0:ie.selector,Ae,tn)},[kt,ie,Ae,t,tn]),Ve=s.useMemo(()=>{if(X&&!A){const b=ne*be,I=b-be;return B.slice(I,b)}return B},[ne,X,A,be,B]),zr=s.useCallback(b=>{Re(b)},[]),Wr=s.useCallback(b=>{Re(b)},[]),Br=s.useCallback(b=>{Re(b)},[]),Gr=s.useCallback((b,I)=>Xt(b,I),[Xt]),Yr=s.useCallback((b,I)=>Qt(b,I),[Qt]),Vr=s.useCallback((b,I)=>Jt(b,I),[Jt]),Ur=s.useCallback((b,I)=>en(b,I),[en]),je=s.useCallback(b=>Re({type:"CHANGE_PAGE",page:b,paginationServer:A,visibleOnly:x,persistSelectedOnPageChange:rt}),[A,rt,x]),Kr=s.useCallback(b=>{const I=Ze(Y||Ve.length,b),V=Tt(ne,I);A||je(V),Re({type:"CHANGE_ROWS_PER_PAGE",page:V,rowsPerPage:b})},[ne,je,A,Y,Ve.length]);if(X&&!A&&B.length>0&&Ve.length===0){const b=Ze(B.length,be),I=Tt(ne,b);je(I)}$e(()=>{v({allSelected:bn,selectedCount:wn,selectedRows:Dt.slice(0)})},[Tr]),$e(()=>{Sr(ie,Ae,B.slice(0))},[ie,Ae]),$e(()=>{g(ne,Y||B.length)},[ne]),$e(()=>{S(be,ne)},[be]),$e(()=>{je(J)},[J,ae]),$e(()=>{if(X&&A&&Y>0){const b=Ze(Y,be),I=Tt(ne,b);ne!==I&&je(I)}},[Y]),s.useEffect(()=>{Re({type:"CLEAR_SELECTED_ROWS",selectedRowsFlag:an})},[p,an]),s.useEffect(()=>{if(!R)return;const b=B.filter(V=>R(V)),I=p?b.slice(0,1):b;Re({type:"SELECT_MULTIPLE_ROWS",keyField:a,selectedRows:I,totalRows:B.length,mergeSelections:xn})},[t,R]);const qr=x?Ve:B,Zr=rt||p||h;return s.createElement(Jo,{theme:Lr},!ue&&(!!r||!!o)&&s.createElement(Wa,{title:r,actions:o,showMenu:!Ot,selectedCount:wn,direction:Ye,contextActions:F,contextComponent:vr,contextMessage:Pt}),W&&s.createElement(Ya,{align:et,wrapContent:tt},Et),s.createElement(Ua,Object.assign({$responsive:ce,$fixedHeader:ee,$fixedHeaderScrollHeight:Se,className:jr},Mr),s.createElement(Ka,null,M&&!q&&s.createElement(Mn,null,Ce),s.createElement(aa,Object.assign({disabled:Z,className:"rdt_Table",role:"table"},cn&&{"aria-label":cn}),!me&&(!!q||B.length>0&&!M)&&s.createElement(ia,{className:"rdt_TableHead",role:"rowgroup",$fixedHeader:ee},s.createElement(la,{className:"rdt_TableHeadRow",role:"row",$dense:f},u&&(Zr?s.createElement(Ge,{style:{flex:"0 0 48px"}}):s.createElement(Ha,{allSelected:bn,selectedRows:Dt,selectableRowsComponent:$,selectableRowsComponentProps:C,selectableRowDisabled:O,rowData:qr,keyField:a,mergeSelections:xn,onSelectAllRows:Wr})),nt&&!rn&&s.createElement(qa,null),dn.map(b=>s.createElement(ja,{key:b.id,column:b,selectedColumn:ie,disabled:M||B.length===0,pagination:X,paginationServer:A,persistSelectedOnSort:yn,selectableRowsVisibleOnly:x,sortDirection:Ae,sortIcon:Cr,sortServer:kt,onSort:zr,onDragStart:pn,onDragOver:fn,onDragEnd:mn,onDragEnter:gn,onDragLeave:hn,draggingColumnId:un})))),!B.length&&!M&&s.createElement(Za,null,de),M&&q&&s.createElement(Mn,null,Ce),!M&&B.length>0&&s.createElement(Va,{className:"rdt_TableBody",role:"rowgroup"},Ve.map((b,I)=>{const V=ze(b,a),re=function(we=""){return typeof we!="number"&&(!we||we.length===0)}(V)?I:V,w=gt(b,Dt,a),It=!!(nt&&on&&on(b)),_e=!!(nt&&nn&&nn(b));return s.createElement(Ea,{id:re,key:re,keyField:a,"data-row-id":re,columns:dn,row:b,rowCount:B.length,rowIndex:I,selectableRows:u,expandableRows:nt,expandableIcon:D,highlightOnHover:c,pointerOnHover:d,dense:f,expandOnRowClicked:Er,expandOnRowDoubleClicked:Or,expandableRowsComponent:Rr,expandableRowsComponentProps:$r,expandableRowsHideExpander:rn,defaultExpanderDisabled:_e,defaultExpanded:It,expandableInheritConditionalStyles:Pr,conditionalRowStyles:Ir,selected:w,selectableRowsHighlight:y,selectableRowsComponent:$,selectableRowsComponentProps:C,selectableRowDisabled:O,selectableRowsSingle:p,striped:i,onRowExpandToggled:m,onRowClicked:Gr,onRowDoubleClicked:Yr,onRowMouseEnter:Vr,onRowMouseLeave:Ur,onSelectedRow:Br,draggingColumnId:un,onDragStart:pn,onDragOver:fn,onDragEnd:mn,onDragEnter:gn,onDragLeave:hn})}))))),Fr&&s.createElement("div",null,s.createElement(Nr,{onChangePage:je,onChangeRowsPerPage:Kr,rowCount:Y||B.length,currentPage:ne,rowsPerPage:be,direction:Ye,paginationRowsPerPageOptions:ge,paginationIconLastPage:ve,paginationIconFirstPage:fe,paginationIconNext:se,paginationIconPrevious:Ie,paginationComponentOptions:he})))});const ms=({columns:e,data:t,title:n,selectableRows:r=!1,onSelectedRowsChange:o=()=>{}})=>{const[a,i]=s.useState(""),c=Xr(u=>u.ui.theme),d={table:{style:{backgroundColor:"#000",border:"1px solid #444"}},headRow:{style:{backgroundColor:"#111",color:"#fff",borderBottom:"2px solid #444"}},headCells:{style:{color:"#fff",fontWeight:"bold",borderRight:"1px solid #444"}},pagination:{style:{backgroundColor:"#111",color:"#fff",borderTop:"1px solid #444",minHeight:"56px"},pageButtonsStyle:{borderRadius:"4px",margin:"0 2px",color:"#fff",fill:"#fff",backgroundColor:"#222","&:hover":{backgroundColor:"#333",color:"#fff",fill:"#fff"},"&:disabled":{cursor:"not-allowed",color:"#666",fill:"#666"}}},rows:{style:{backgroundColor:"#000",color:"#fff",borderBottom:"1px solid #444"},highlightOnHoverStyle:{backgroundColor:"#222",color:"#fff",cursor:"pointer"}},cells:{style:{color:"#fff",borderRight:"1px solid #444"}}},f=s.useMemo(()=>a?t.filter(u=>Object.values(u).some(p=>String(p).toLowerCase().includes(a.toLowerCase()))):t,[t,a]);return Ue.jsxs("div",{className:"custom-table",children:[Ue.jsxs("div",{className:"d-flex flex-wrap justify-content-between align-items-center mb-2",children:[Ue.jsx("h4",{className:"mb-0",children:n}),Ue.jsx("input",{type:"text",placeholder:"Search...",className:"form-control form-control-sm w-auto",value:a,onChange:u=>i(u.target.value)})]}),Ue.jsx(fs,{columns:e,data:f,pagination:!0,responsive:!0,highlightOnHover:!0,pointerOnHover:!0,dense:!0,selectableRows:r,onSelectedRowsChange:o,customStyles:c==="dark"?d:{}})]})};export{ms as D};

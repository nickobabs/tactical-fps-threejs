(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const er="181",rd=0,ll=1,ad=2,ju=1,Ju=2,Hn=3,Pn=0,Ye=1,fn=2,$n=0,xs=1,ul=2,hl=3,dl=4,od=5,Pi=100,cd=101,ld=102,ud=103,hd=104,dd=200,fd=201,pd=202,md=203,Eo=204,To=205,xd=206,gd=207,_d=208,vd=209,yd=210,Md=211,Sd=212,bd=213,wd=214,Ao=0,Ro=1,Co=2,_s=3,Po=4,Do=5,Lo=6,Io=7,Qu=0,Ed=1,Td=2,mi=0,Ad=1,Rd=2,Cd=3,th=4,Pd=5,Dd=6,Ld=7,eh=300,vs=301,ys=302,ia=303,Uo=304,fa=306,No=1e3,Sn=1001,Fo=1002,cn=1003,Id=1004,ar=1005,Ne=1006,Ea=1007,di=1008,Dn=1009,nh=1010,ih=1011,Ys=1012,Pc=1013,Li=1014,pn=1015,Rn=1016,Dc=1017,Lc=1018,$s=1020,sh=35902,rh=35899,ah=1021,oh=1022,bn=1023,Ks=1026,Zs=1027,ch=1028,Ic=1029,Uc=1030,Nc=1031,Fc=1033,Zr=33776,jr=33777,Jr=33778,Qr=33779,Oo=35840,Bo=35841,zo=35842,Vo=35843,ko=36196,Ho=37492,Go=37496,Wo=37808,Xo=37809,qo=37810,Yo=37811,$o=37812,Ko=37813,Zo=37814,jo=37815,Jo=37816,Qo=37817,tc=37818,ec=37819,nc=37820,ic=37821,sc=36492,rc=36494,ac=36495,oc=36283,cc=36284,lc=36285,uc=36286,Ud=3200,Nd=3201,lh=0,Fd=1,ui="",on="srgb",Ii="srgb-linear",sa="linear",re="srgb",Oi=7680,fl=519,Od=512,Bd=513,zd=514,uh=515,Vd=516,kd=517,Hd=518,Gd=519,hc=35044,pl="300 es",Cn=2e3,ra=2001;function hh(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function aa(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Wd(){const i=aa("canvas");return i.style.display="block",i}const ml={};function oa(...i){const t="THREE."+i.shift();console.log(t,...i)}function Ut(...i){const t="THREE."+i.shift();console.warn(t,...i)}function ge(...i){const t="THREE."+i.shift();console.error(t,...i)}function js(...i){const t=i.join(" ");t in ml||(ml[t]=!0,Ut(...i))}function Xd(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}class Ss{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const Fe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let xl=1234567;const Ws=Math.PI/180,Js=180/Math.PI;function Kn(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Fe[i&255]+Fe[i>>8&255]+Fe[i>>16&255]+Fe[i>>24&255]+"-"+Fe[t&255]+Fe[t>>8&255]+"-"+Fe[t>>16&15|64]+Fe[t>>24&255]+"-"+Fe[e&63|128]+Fe[e>>8&255]+"-"+Fe[e>>16&255]+Fe[e>>24&255]+Fe[n&255]+Fe[n>>8&255]+Fe[n>>16&255]+Fe[n>>24&255]).toLowerCase()}function zt(i,t,e){return Math.max(t,Math.min(e,i))}function Oc(i,t){return(i%t+t)%t}function qd(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Yd(i,t,e){return i!==t?(e-i)/(t-i):0}function Xs(i,t,e){return(1-e)*i+e*t}function $d(i,t,e,n){return Xs(i,t,1-Math.exp(-e*n))}function Kd(i,t=1){return t-Math.abs(Oc(i,t*2)-t)}function Zd(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function jd(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Jd(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Qd(i,t){return i+Math.random()*(t-i)}function tf(i){return i*(.5-Math.random())}function ef(i){i!==void 0&&(xl=i);let t=xl+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function nf(i){return i*Ws}function sf(i){return i*Js}function rf(i){return(i&i-1)===0&&i!==0}function af(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function of(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function cf(i,t,e,n,s){const r=Math.cos,a=Math.sin,o=r(e/2),c=a(e/2),l=r((t+n)/2),u=a((t+n)/2),h=r((t-n)/2),d=a((t-n)/2),f=r((n-t)/2),x=a((n-t)/2);switch(s){case"XYX":i.set(o*u,c*h,c*d,o*l);break;case"YZY":i.set(c*d,o*u,c*h,o*l);break;case"ZXZ":i.set(c*h,c*d,o*u,o*l);break;case"XZX":i.set(o*u,c*x,c*f,o*l);break;case"YXY":i.set(c*f,o*u,c*x,o*l);break;case"ZYZ":i.set(c*x,c*f,o*u,o*l);break;default:Ut("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Mn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function ne(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Se={DEG2RAD:Ws,RAD2DEG:Js,generateUUID:Kn,clamp:zt,euclideanModulo:Oc,mapLinear:qd,inverseLerp:Yd,lerp:Xs,damp:$d,pingpong:Kd,smoothstep:Zd,smootherstep:jd,randInt:Jd,randFloat:Qd,randFloatSpread:tf,seededRandom:ef,degToRad:nf,radToDeg:sf,isPowerOfTwo:rf,ceilPowerOfTwo:af,floorPowerOfTwo:of,setQuaternionFromProperEuler:cf,normalize:ne,denormalize:Mn};class Rt{constructor(t=0,e=0){Rt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=zt(this.x,t.x,e.x),this.y=zt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=zt(this.x,t,e),this.y=zt(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(zt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(zt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class nr{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let c=n[s+0],l=n[s+1],u=n[s+2],h=n[s+3],d=r[a+0],f=r[a+1],x=r[a+2],g=r[a+3];if(o<=0){t[e+0]=c,t[e+1]=l,t[e+2]=u,t[e+3]=h;return}if(o>=1){t[e+0]=d,t[e+1]=f,t[e+2]=x,t[e+3]=g;return}if(h!==g||c!==d||l!==f||u!==x){let m=c*d+l*f+u*x+h*g;m<0&&(d=-d,f=-f,x=-x,g=-g,m=-m);let p=1-o;if(m<.9995){const y=Math.acos(m),M=Math.sin(y);p=Math.sin(p*y)/M,o=Math.sin(o*y)/M,c=c*p+d*o,l=l*p+f*o,u=u*p+x*o,h=h*p+g*o}else{c=c*p+d*o,l=l*p+f*o,u=u*p+x*o,h=h*p+g*o;const y=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=y,l*=y,u*=y,h*=y}}t[e]=c,t[e+1]=l,t[e+2]=u,t[e+3]=h}static multiplyQuaternionsFlat(t,e,n,s,r,a){const o=n[s],c=n[s+1],l=n[s+2],u=n[s+3],h=r[a],d=r[a+1],f=r[a+2],x=r[a+3];return t[e]=o*x+u*h+c*f-l*d,t[e+1]=c*x+u*d+l*h-o*f,t[e+2]=l*x+u*f+o*d-c*h,t[e+3]=u*x-o*h-c*d-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(n/2),u=o(s/2),h=o(r/2),d=c(n/2),f=c(s/2),x=c(r/2);switch(a){case"XYZ":this._x=d*u*h+l*f*x,this._y=l*f*h-d*u*x,this._z=l*u*x+d*f*h,this._w=l*u*h-d*f*x;break;case"YXZ":this._x=d*u*h+l*f*x,this._y=l*f*h-d*u*x,this._z=l*u*x-d*f*h,this._w=l*u*h+d*f*x;break;case"ZXY":this._x=d*u*h-l*f*x,this._y=l*f*h+d*u*x,this._z=l*u*x+d*f*h,this._w=l*u*h-d*f*x;break;case"ZYX":this._x=d*u*h-l*f*x,this._y=l*f*h+d*u*x,this._z=l*u*x-d*f*h,this._w=l*u*h+d*f*x;break;case"YZX":this._x=d*u*h+l*f*x,this._y=l*f*h+d*u*x,this._z=l*u*x-d*f*h,this._w=l*u*h-d*f*x;break;case"XZY":this._x=d*u*h-l*f*x,this._y=l*f*h-d*u*x,this._z=l*u*x+d*f*h,this._w=l*u*h+d*f*x;break;default:Ut("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],c=e[9],l=e[2],u=e[6],h=e[10],d=n+o+h;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-c)*f,this._y=(r-l)*f,this._z=(a-s)*f}else if(n>o&&n>h){const f=2*Math.sqrt(1+n-o-h);this._w=(u-c)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+l)/f}else if(o>h){const f=2*Math.sqrt(1+o-n-h);this._w=(r-l)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(c+u)/f}else{const f=2*Math.sqrt(1+h-n-o);this._w=(a-s)/f,this._x=(r+l)/f,this._y=(c+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(zt(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,c=e._y,l=e._z,u=e._w;return this._x=n*u+a*o+s*l-r*c,this._y=s*u+a*c+r*o-n*l,this._z=r*u+a*l+n*c-s*o,this._w=a*u-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e<=0)return this;if(e>=1)return this.copy(t);let n=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let c=1-e;if(o<.9995){const l=Math.acos(o),u=Math.sin(l);c=Math.sin(c*l)/u,e=Math.sin(e*l)/u,this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+a*e,this._onChangeCallback()}else this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class E{constructor(t=0,e=0,n=0){E.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(gl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(gl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*s-o*n),u=2*(o*e-r*s),h=2*(r*n-a*e);return this.x=e+c*l+a*h-o*u,this.y=n+c*u+o*l-r*h,this.z=s+c*h+r*u-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=zt(this.x,t.x,e.x),this.y=zt(this.y,t.y,e.y),this.z=zt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=zt(this.x,t,e),this.y=zt(this.y,t,e),this.z=zt(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(zt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,c=e.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Ta.copy(this).projectOnVector(t),this.sub(Ta)}reflect(t){return this.sub(Ta.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(zt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ta=new E,gl=new nr;class Vt{constructor(t,e,n,s,r,a,o,c,l){Vt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l)}set(t,e,n,s,r,a,o,c,l){const u=this.elements;return u[0]=t,u[1]=s,u[2]=o,u[3]=e,u[4]=r,u[5]=c,u[6]=n,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],u=n[4],h=n[7],d=n[2],f=n[5],x=n[8],g=s[0],m=s[3],p=s[6],y=s[1],M=s[4],v=s[7],b=s[2],w=s[5],A=s[8];return r[0]=a*g+o*y+c*b,r[3]=a*m+o*M+c*w,r[6]=a*p+o*v+c*A,r[1]=l*g+u*y+h*b,r[4]=l*m+u*M+h*w,r[7]=l*p+u*v+h*A,r[2]=d*g+f*y+x*b,r[5]=d*m+f*M+x*w,r[8]=d*p+f*v+x*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8];return e*a*u-e*o*l-n*r*u+n*o*c+s*r*l-s*a*c}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8],h=u*a-o*l,d=o*c-u*r,f=l*r-a*c,x=e*h+n*d+s*f;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/x;return t[0]=h*g,t[1]=(s*l-u*n)*g,t[2]=(o*n-s*a)*g,t[3]=d*g,t[4]=(u*e-s*c)*g,t[5]=(s*r-o*e)*g,t[6]=f*g,t[7]=(n*c-l*e)*g,t[8]=(a*e-n*r)*g,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+t,-s*l,s*c,-s*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Aa.makeScale(t,e)),this}rotate(t){return this.premultiply(Aa.makeRotation(-t)),this}translate(t,e){return this.premultiply(Aa.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Aa=new Vt,_l=new Vt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),vl=new Vt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function lf(){const i={enabled:!0,workingColorSpace:Ii,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===re&&(s.r=Zn(s.r),s.g=Zn(s.g),s.b=Zn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===re&&(s.r=gs(s.r),s.g=gs(s.g),s.b=gs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ui?sa:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return js("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return js("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Ii]:{primaries:t,whitePoint:n,transfer:sa,toXYZ:_l,fromXYZ:vl,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:on},outputColorSpaceConfig:{drawingBufferColorSpace:on}},[on]:{primaries:t,whitePoint:n,transfer:re,toXYZ:_l,fromXYZ:vl,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:on}}}),i}const jt=lf();function Zn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function gs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Bi;class uf{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Bi===void 0&&(Bi=aa("canvas")),Bi.width=t.width,Bi.height=t.height;const s=Bi.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Bi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=aa("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Zn(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Zn(e[n]/255)*255):e[n]=Zn(e[n]);return{data:e,width:t.width,height:t.height}}else return Ut("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let hf=0;class Bc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:hf++}),this.uuid=Kn(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Ra(s[a].image)):r.push(Ra(s[a]))}else r=Ra(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function Ra(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?uf.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Ut("Texture: Unable to serialize Texture."),{})}let df=0;const Ca=new E;class Ve extends Ss{constructor(t=Ve.DEFAULT_IMAGE,e=Ve.DEFAULT_MAPPING,n=Sn,s=Sn,r=Ne,a=di,o=bn,c=Dn,l=Ve.DEFAULT_ANISOTROPY,u=ui){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:df++}),this.uuid=Kn(),this.name="",this.source=new Bc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Rt(0,0),this.repeat=new Rt(1,1),this.center=new Rt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Vt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Ca).x}get height(){return this.source.getSize(Ca).y}get depth(){return this.source.getSize(Ca).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){Ut(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Ut(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==eh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case No:t.x=t.x-Math.floor(t.x);break;case Sn:t.x=t.x<0?0:1;break;case Fo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case No:t.y=t.y-Math.floor(t.y);break;case Sn:t.y=t.y<0?0:1;break;case Fo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ve.DEFAULT_IMAGE=null;Ve.DEFAULT_MAPPING=eh;Ve.DEFAULT_ANISOTROPY=1;class Me{constructor(t=0,e=0,n=0,s=1){Me.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const c=t.elements,l=c[0],u=c[4],h=c[8],d=c[1],f=c[5],x=c[9],g=c[2],m=c[6],p=c[10];if(Math.abs(u-d)<.01&&Math.abs(h-g)<.01&&Math.abs(x-m)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+g)<.1&&Math.abs(x+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const M=(l+1)/2,v=(f+1)/2,b=(p+1)/2,w=(u+d)/4,A=(h+g)/4,C=(x+m)/4;return M>v&&M>b?M<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(M),s=w/n,r=A/n):v>b?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=w/s,r=C/s):b<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(b),n=A/r,s=C/r),this.set(n,s,r,e),this}let y=Math.sqrt((m-x)*(m-x)+(h-g)*(h-g)+(d-u)*(d-u));return Math.abs(y)<.001&&(y=1),this.x=(m-x)/y,this.y=(h-g)/y,this.z=(d-u)/y,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=zt(this.x,t.x,e.x),this.y=zt(this.y,t.y,e.y),this.z=zt(this.z,t.z,e.z),this.w=zt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=zt(this.x,t,e),this.y=zt(this.y,t,e),this.z=zt(this.z,t,e),this.w=zt(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(zt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class ff extends Ss{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ne,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Me(0,0,t,e),this.scissorTest=!1,this.viewport=new Me(0,0,t,e);const s={width:t,height:e,depth:n.depth},r=new Ve(s);this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){const e={minFilter:Ne,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new Bc(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ui extends ff{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class dh extends Ve{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=cn,this.minFilter=cn,this.wrapR=Sn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class pf extends Ve{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=cn,this.minFilter=cn,this.wrapR=Sn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class He{constructor(t=new E(1/0,1/0,1/0),e=new E(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(gn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(gn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=gn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,gn):gn.fromBufferAttribute(r,a),gn.applyMatrix4(t.matrixWorld),this.expandByPoint(gn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),or.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),or.copy(n.boundingBox)),or.applyMatrix4(t.matrixWorld),this.union(or)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,gn),gn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ts),cr.subVectors(this.max,Ts),zi.subVectors(t.a,Ts),Vi.subVectors(t.b,Ts),ki.subVectors(t.c,Ts),ti.subVectors(Vi,zi),ei.subVectors(ki,Vi),Mi.subVectors(zi,ki);let e=[0,-ti.z,ti.y,0,-ei.z,ei.y,0,-Mi.z,Mi.y,ti.z,0,-ti.x,ei.z,0,-ei.x,Mi.z,0,-Mi.x,-ti.y,ti.x,0,-ei.y,ei.x,0,-Mi.y,Mi.x,0];return!Pa(e,zi,Vi,ki,cr)||(e=[1,0,0,0,1,0,0,0,1],!Pa(e,zi,Vi,ki,cr))?!1:(lr.crossVectors(ti,ei),e=[lr.x,lr.y,lr.z],Pa(e,zi,Vi,ki,cr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,gn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(gn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Un[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Un[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Un[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Un[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Un[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Un[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Un[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Un[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Un),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Un=[new E,new E,new E,new E,new E,new E,new E,new E],gn=new E,or=new He,zi=new E,Vi=new E,ki=new E,ti=new E,ei=new E,Mi=new E,Ts=new E,cr=new E,lr=new E,Si=new E;function Pa(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Si.fromArray(i,r);const o=s.x*Math.abs(Si.x)+s.y*Math.abs(Si.y)+s.z*Math.abs(Si.z),c=t.dot(Si),l=e.dot(Si),u=n.dot(Si);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const mf=new He,As=new E,Da=new E;class pa{constructor(t=new E,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):mf.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;As.subVectors(t,this.center);const e=As.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(As,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Da.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(As.copy(t.center).add(Da)),this.expandByPoint(As.copy(t.center).sub(Da))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const Nn=new E,La=new E,ur=new E,ni=new E,Ia=new E,hr=new E,Ua=new E;class bs{constructor(t=new E,e=new E(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Nn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Nn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Nn.copy(this.origin).addScaledVector(this.direction,e),Nn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){La.copy(t).add(e).multiplyScalar(.5),ur.copy(e).sub(t).normalize(),ni.copy(this.origin).sub(La);const r=t.distanceTo(e)*.5,a=-this.direction.dot(ur),o=ni.dot(this.direction),c=-ni.dot(ur),l=ni.lengthSq(),u=Math.abs(1-a*a);let h,d,f,x;if(u>0)if(h=a*c-o,d=a*o-c,x=r*u,h>=0)if(d>=-x)if(d<=x){const g=1/u;h*=g,d*=g,f=h*(h+a*d+2*o)+d*(a*h+d+2*c)+l}else d=r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*c)+l;else d=-r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*c)+l;else d<=-x?(h=Math.max(0,-(-a*r+o)),d=h>0?-r:Math.min(Math.max(-r,-c),r),f=-h*h+d*(d+2*c)+l):d<=x?(h=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+l):(h=Math.max(0,-(a*r+o)),d=h>0?r:Math.min(Math.max(-r,-c),r),f=-h*h+d*(d+2*c)+l);else d=a>0?-r:r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(La).addScaledVector(ur,d),f}intersectSphere(t,e){Nn.subVectors(t.center,this.origin);const n=Nn.dot(this.direction),s=Nn.dot(Nn)-n*n,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,c;const l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return l>=0?(n=(t.min.x-d.x)*l,s=(t.max.x-d.x)*l):(n=(t.max.x-d.x)*l,s=(t.min.x-d.x)*l),u>=0?(r=(t.min.y-d.y)*u,a=(t.max.y-d.y)*u):(r=(t.max.y-d.y)*u,a=(t.min.y-d.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),h>=0?(o=(t.min.z-d.z)*h,c=(t.max.z-d.z)*h):(o=(t.max.z-d.z)*h,c=(t.min.z-d.z)*h),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Nn)!==null}intersectTriangle(t,e,n,s,r){Ia.subVectors(e,t),hr.subVectors(n,t),Ua.crossVectors(Ia,hr);let a=this.direction.dot(Ua),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ni.subVectors(this.origin,t);const c=o*this.direction.dot(hr.crossVectors(ni,hr));if(c<0)return null;const l=o*this.direction.dot(Ia.cross(ni));if(l<0||c+l>a)return null;const u=-o*ni.dot(Ua);return u<0?null:this.at(u/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Qt{constructor(t,e,n,s,r,a,o,c,l,u,h,d,f,x,g,m){Qt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l,u,h,d,f,x,g,m)}set(t,e,n,s,r,a,o,c,l,u,h,d,f,x,g,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=u,p[10]=h,p[14]=d,p[3]=f,p[7]=x,p[11]=g,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Qt().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/Hi.setFromMatrixColumn(t,0).length(),r=1/Hi.setFromMatrixColumn(t,1).length(),a=1/Hi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(t.order==="XYZ"){const d=a*u,f=a*h,x=o*u,g=o*h;e[0]=c*u,e[4]=-c*h,e[8]=l,e[1]=f+x*l,e[5]=d-g*l,e[9]=-o*c,e[2]=g-d*l,e[6]=x+f*l,e[10]=a*c}else if(t.order==="YXZ"){const d=c*u,f=c*h,x=l*u,g=l*h;e[0]=d+g*o,e[4]=x*o-f,e[8]=a*l,e[1]=a*h,e[5]=a*u,e[9]=-o,e[2]=f*o-x,e[6]=g+d*o,e[10]=a*c}else if(t.order==="ZXY"){const d=c*u,f=c*h,x=l*u,g=l*h;e[0]=d-g*o,e[4]=-a*h,e[8]=x+f*o,e[1]=f+x*o,e[5]=a*u,e[9]=g-d*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){const d=a*u,f=a*h,x=o*u,g=o*h;e[0]=c*u,e[4]=x*l-f,e[8]=d*l+g,e[1]=c*h,e[5]=g*l+d,e[9]=f*l-x,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){const d=a*c,f=a*l,x=o*c,g=o*l;e[0]=c*u,e[4]=g-d*h,e[8]=x*h+f,e[1]=h,e[5]=a*u,e[9]=-o*u,e[2]=-l*u,e[6]=f*h+x,e[10]=d-g*h}else if(t.order==="XZY"){const d=a*c,f=a*l,x=o*c,g=o*l;e[0]=c*u,e[4]=-h,e[8]=l*u,e[1]=d*h+g,e[5]=a*u,e[9]=f*h-x,e[2]=x*h-f,e[6]=o*u,e[10]=g*h+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(xf,t,gf)}lookAt(t,e,n){const s=this.elements;return sn.subVectors(t,e),sn.lengthSq()===0&&(sn.z=1),sn.normalize(),ii.crossVectors(n,sn),ii.lengthSq()===0&&(Math.abs(n.z)===1?sn.x+=1e-4:sn.z+=1e-4,sn.normalize(),ii.crossVectors(n,sn)),ii.normalize(),dr.crossVectors(sn,ii),s[0]=ii.x,s[4]=dr.x,s[8]=sn.x,s[1]=ii.y,s[5]=dr.y,s[9]=sn.y,s[2]=ii.z,s[6]=dr.z,s[10]=sn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],u=n[1],h=n[5],d=n[9],f=n[13],x=n[2],g=n[6],m=n[10],p=n[14],y=n[3],M=n[7],v=n[11],b=n[15],w=s[0],A=s[4],C=s[8],S=s[12],_=s[1],P=s[5],D=s[9],I=s[13],U=s[2],B=s[6],V=s[10],$=s[14],X=s[3],et=s[7],Y=s[11],ft=s[15];return r[0]=a*w+o*_+c*U+l*X,r[4]=a*A+o*P+c*B+l*et,r[8]=a*C+o*D+c*V+l*Y,r[12]=a*S+o*I+c*$+l*ft,r[1]=u*w+h*_+d*U+f*X,r[5]=u*A+h*P+d*B+f*et,r[9]=u*C+h*D+d*V+f*Y,r[13]=u*S+h*I+d*$+f*ft,r[2]=x*w+g*_+m*U+p*X,r[6]=x*A+g*P+m*B+p*et,r[10]=x*C+g*D+m*V+p*Y,r[14]=x*S+g*I+m*$+p*ft,r[3]=y*w+M*_+v*U+b*X,r[7]=y*A+M*P+v*B+b*et,r[11]=y*C+M*D+v*V+b*Y,r[15]=y*S+M*I+v*$+b*ft,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],c=t[9],l=t[13],u=t[2],h=t[6],d=t[10],f=t[14],x=t[3],g=t[7],m=t[11],p=t[15];return x*(+r*c*h-s*l*h-r*o*d+n*l*d+s*o*f-n*c*f)+g*(+e*c*f-e*l*d+r*a*d-s*a*f+s*l*u-r*c*u)+m*(+e*l*h-e*o*f-r*a*h+n*a*f+r*o*u-n*l*u)+p*(-s*o*u-e*c*h+e*o*d+s*a*h-n*a*d+n*c*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8],h=t[9],d=t[10],f=t[11],x=t[12],g=t[13],m=t[14],p=t[15],y=h*m*l-g*d*l+g*c*f-o*m*f-h*c*p+o*d*p,M=x*d*l-u*m*l-x*c*f+a*m*f+u*c*p-a*d*p,v=u*g*l-x*h*l+x*o*f-a*g*f-u*o*p+a*h*p,b=x*h*c-u*g*c-x*o*d+a*g*d+u*o*m-a*h*m,w=e*y+n*M+s*v+r*b;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/w;return t[0]=y*A,t[1]=(g*d*r-h*m*r-g*s*f+n*m*f+h*s*p-n*d*p)*A,t[2]=(o*m*r-g*c*r+g*s*l-n*m*l-o*s*p+n*c*p)*A,t[3]=(h*c*r-o*d*r-h*s*l+n*d*l+o*s*f-n*c*f)*A,t[4]=M*A,t[5]=(u*m*r-x*d*r+x*s*f-e*m*f-u*s*p+e*d*p)*A,t[6]=(x*c*r-a*m*r-x*s*l+e*m*l+a*s*p-e*c*p)*A,t[7]=(a*d*r-u*c*r+u*s*l-e*d*l-a*s*f+e*c*f)*A,t[8]=v*A,t[9]=(x*h*r-u*g*r-x*n*f+e*g*f+u*n*p-e*h*p)*A,t[10]=(a*g*r-x*o*r+x*n*l-e*g*l-a*n*p+e*o*p)*A,t[11]=(u*o*r-a*h*r-u*n*l+e*h*l+a*n*f-e*o*f)*A,t[12]=b*A,t[13]=(u*g*s-x*h*s+x*n*d-e*g*d-u*n*m+e*h*m)*A,t[14]=(x*o*s-a*g*s-x*n*c+e*g*c+a*n*m-e*o*m)*A,t[15]=(a*h*s-u*o*s+u*n*c-e*h*c-a*n*d+e*o*d)*A,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,c=t.z,l=r*a,u=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,u*o+n,u*c-s*a,0,l*c-s*o,u*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,a=e._y,o=e._z,c=e._w,l=r+r,u=a+a,h=o+o,d=r*l,f=r*u,x=r*h,g=a*u,m=a*h,p=o*h,y=c*l,M=c*u,v=c*h,b=n.x,w=n.y,A=n.z;return s[0]=(1-(g+p))*b,s[1]=(f+v)*b,s[2]=(x-M)*b,s[3]=0,s[4]=(f-v)*w,s[5]=(1-(d+p))*w,s[6]=(m+y)*w,s[7]=0,s[8]=(x+M)*A,s[9]=(m-y)*A,s[10]=(1-(d+g))*A,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=Hi.set(s[0],s[1],s[2]).length();const a=Hi.set(s[4],s[5],s[6]).length(),o=Hi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],_n.copy(this);const l=1/r,u=1/a,h=1/o;return _n.elements[0]*=l,_n.elements[1]*=l,_n.elements[2]*=l,_n.elements[4]*=u,_n.elements[5]*=u,_n.elements[6]*=u,_n.elements[8]*=h,_n.elements[9]*=h,_n.elements[10]*=h,e.setFromRotationMatrix(_n),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,s,r,a,o=Cn,c=!1){const l=this.elements,u=2*r/(e-t),h=2*r/(n-s),d=(e+t)/(e-t),f=(n+s)/(n-s);let x,g;if(c)x=r/(a-r),g=a*r/(a-r);else if(o===Cn)x=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===ra)x=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=x,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=Cn,c=!1){const l=this.elements,u=2/(e-t),h=2/(n-s),d=-(e+t)/(e-t),f=-(n+s)/(n-s);let x,g;if(c)x=1/(a-r),g=a/(a-r);else if(o===Cn)x=-2/(a-r),g=-(a+r)/(a-r);else if(o===ra)x=-1/(a-r),g=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=h,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=x,l[14]=g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Hi=new E,_n=new Qt,xf=new E(0,0,0),gf=new E(1,1,1),ii=new E,dr=new E,sn=new E,yl=new Qt,Ml=new nr;class Ln{constructor(t=0,e=0,n=0,s=Ln.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],u=s[9],h=s[2],d=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(zt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-zt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(zt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-zt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(zt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-zt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:Ut("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return yl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(yl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Ml.setFromEuler(this),this.setFromQuaternion(Ml,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ln.DEFAULT_ORDER="XYZ";class zc{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let _f=0;const Sl=new E,Gi=new nr,Fn=new Qt,fr=new E,Rs=new E,vf=new E,yf=new nr,bl=new E(1,0,0),wl=new E(0,1,0),El=new E(0,0,1),Tl={type:"added"},Mf={type:"removed"},Wi={type:"childadded",child:null},Na={type:"childremoved",child:null};class pe extends Ss{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:_f++}),this.uuid=Kn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=pe.DEFAULT_UP.clone();const t=new E,e=new Ln,n=new nr,s=new E(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Qt},normalMatrix:{value:new Vt}}),this.matrix=new Qt,this.matrixWorld=new Qt,this.matrixAutoUpdate=pe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=pe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new zc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Gi.setFromAxisAngle(t,e),this.quaternion.multiply(Gi),this}rotateOnWorldAxis(t,e){return Gi.setFromAxisAngle(t,e),this.quaternion.premultiply(Gi),this}rotateX(t){return this.rotateOnAxis(bl,t)}rotateY(t){return this.rotateOnAxis(wl,t)}rotateZ(t){return this.rotateOnAxis(El,t)}translateOnAxis(t,e){return Sl.copy(t).applyQuaternion(this.quaternion),this.position.add(Sl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(bl,t)}translateY(t){return this.translateOnAxis(wl,t)}translateZ(t){return this.translateOnAxis(El,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Fn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?fr.copy(t):fr.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Rs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Fn.lookAt(Rs,fr,this.up):Fn.lookAt(fr,Rs,this.up),this.quaternion.setFromRotationMatrix(Fn),s&&(Fn.extractRotation(s.matrixWorld),Gi.setFromRotationMatrix(Fn),this.quaternion.premultiply(Gi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(ge("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Tl),Wi.child=t,this.dispatchEvent(Wi),Wi.child=null):ge("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Mf),Na.child=t,this.dispatchEvent(Na),Na.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Fn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Fn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Fn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Tl),Wi.child=t,this.dispatchEvent(Wi),Wi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Rs,t,vf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Rs,yf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const h=c[l];r(t.shapes,h)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(t.materials,this.material[c]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(t.animations,c))}}if(e){const o=a(t.geometries),c=a(t.materials),l=a(t.textures),u=a(t.images),h=a(t.shapes),d=a(t.skeletons),f=a(t.animations),x=a(t.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),x.length>0&&(n.nodes=x)}return n.object=s,n;function a(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}pe.DEFAULT_UP=new E(0,1,0);pe.DEFAULT_MATRIX_AUTO_UPDATE=!0;pe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const vn=new E,On=new E,Fa=new E,Bn=new E,Xi=new E,qi=new E,Al=new E,Oa=new E,Ba=new E,za=new E,Va=new Me,ka=new Me,Ha=new Me;class De{constructor(t=new E,e=new E,n=new E){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),vn.subVectors(t,e),s.cross(vn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){vn.subVectors(s,e),On.subVectors(n,e),Fa.subVectors(t,e);const a=vn.dot(vn),o=vn.dot(On),c=vn.dot(Fa),l=On.dot(On),u=On.dot(Fa),h=a*l-o*o;if(h===0)return r.set(0,0,0),null;const d=1/h,f=(l*c-o*u)*d,x=(a*u-o*c)*d;return r.set(1-f-x,x,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Bn)===null?!1:Bn.x>=0&&Bn.y>=0&&Bn.x+Bn.y<=1}static getInterpolation(t,e,n,s,r,a,o,c){return this.getBarycoord(t,e,n,s,Bn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Bn.x),c.addScaledVector(a,Bn.y),c.addScaledVector(o,Bn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,a){return Va.setScalar(0),ka.setScalar(0),Ha.setScalar(0),Va.fromBufferAttribute(t,e),ka.fromBufferAttribute(t,n),Ha.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(Va,r.x),a.addScaledVector(ka,r.y),a.addScaledVector(Ha,r.z),a}static isFrontFacing(t,e,n,s){return vn.subVectors(n,e),On.subVectors(t,e),vn.cross(On).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return vn.subVectors(this.c,this.b),On.subVectors(this.a,this.b),vn.cross(On).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return De.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return De.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return De.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return De.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return De.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let a,o;Xi.subVectors(s,n),qi.subVectors(r,n),Oa.subVectors(t,n);const c=Xi.dot(Oa),l=qi.dot(Oa);if(c<=0&&l<=0)return e.copy(n);Ba.subVectors(t,s);const u=Xi.dot(Ba),h=qi.dot(Ba);if(u>=0&&h<=u)return e.copy(s);const d=c*h-u*l;if(d<=0&&c>=0&&u<=0)return a=c/(c-u),e.copy(n).addScaledVector(Xi,a);za.subVectors(t,r);const f=Xi.dot(za),x=qi.dot(za);if(x>=0&&f<=x)return e.copy(r);const g=f*l-c*x;if(g<=0&&l>=0&&x<=0)return o=l/(l-x),e.copy(n).addScaledVector(qi,o);const m=u*x-f*h;if(m<=0&&h-u>=0&&f-x>=0)return Al.subVectors(r,s),o=(h-u)/(h-u+(f-x)),e.copy(s).addScaledVector(Al,o);const p=1/(m+g+d);return a=g*p,o=d*p,e.copy(n).addScaledVector(Xi,a).addScaledVector(qi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const fh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},si={h:0,s:0,l:0},pr={h:0,s:0,l:0};function Ga(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Yt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=on){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,jt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=jt.workingColorSpace){return this.r=t,this.g=e,this.b=n,jt.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=jt.workingColorSpace){if(t=Oc(t,1),e=zt(e,0,1),n=zt(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=Ga(a,r,t+1/3),this.g=Ga(a,r,t),this.b=Ga(a,r,t-1/3)}return jt.colorSpaceToWorking(this,s),this}setStyle(t,e=on){function n(r){r!==void 0&&parseFloat(r)<1&&Ut("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Ut("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Ut("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=on){const n=fh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Ut("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Zn(t.r),this.g=Zn(t.g),this.b=Zn(t.b),this}copyLinearToSRGB(t){return this.r=gs(t.r),this.g=gs(t.g),this.b=gs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=on){return jt.workingToColorSpace(Oe.copy(this),t),Math.round(zt(Oe.r*255,0,255))*65536+Math.round(zt(Oe.g*255,0,255))*256+Math.round(zt(Oe.b*255,0,255))}getHexString(t=on){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=jt.workingColorSpace){jt.workingToColorSpace(Oe.copy(this),e);const n=Oe.r,s=Oe.g,r=Oe.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let c,l;const u=(o+a)/2;if(o===a)c=0,l=0;else{const h=a-o;switch(l=u<=.5?h/(a+o):h/(2-a-o),a){case n:c=(s-r)/h+(s<r?6:0);break;case s:c=(r-n)/h+2;break;case r:c=(n-s)/h+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,e=jt.workingColorSpace){return jt.workingToColorSpace(Oe.copy(this),e),t.r=Oe.r,t.g=Oe.g,t.b=Oe.b,t}getStyle(t=on){jt.workingToColorSpace(Oe.copy(this),t);const e=Oe.r,n=Oe.g,s=Oe.b;return t!==on?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(si),this.setHSL(si.h+t,si.s+e,si.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(si),t.getHSL(pr);const n=Xs(si.h,pr.h,e),s=Xs(si.s,pr.s,e),r=Xs(si.l,pr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Oe=new Yt;Yt.NAMES=fh;let Sf=0;class Ni extends Ss{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Sf++}),this.uuid=Kn(),this.name="",this.type="Material",this.blending=xs,this.side=Pn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Eo,this.blendDst=To,this.blendEquation=Pi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Yt(0,0,0),this.blendAlpha=0,this.depthFunc=_s,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=fl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Oi,this.stencilZFail=Oi,this.stencilZPass=Oi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){Ut(`Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Ut(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==xs&&(n.blending=this.blending),this.side!==Pn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Eo&&(n.blendSrc=this.blendSrc),this.blendDst!==To&&(n.blendDst=this.blendDst),this.blendEquation!==Pi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==_s&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==fl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Oi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Oi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Oi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class _i extends Ni{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Yt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ln,this.combine=Qu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Yn=bf();function bf(){const i=new ArrayBuffer(4),t=new Float32Array(i),e=new Uint32Array(i),n=new Uint32Array(512),s=new Uint32Array(512);for(let c=0;c<256;++c){const l=c-127;l<-27?(n[c]=0,n[c|256]=32768,s[c]=24,s[c|256]=24):l<-14?(n[c]=1024>>-l-14,n[c|256]=1024>>-l-14|32768,s[c]=-l-1,s[c|256]=-l-1):l<=15?(n[c]=l+15<<10,n[c|256]=l+15<<10|32768,s[c]=13,s[c|256]=13):l<128?(n[c]=31744,n[c|256]=64512,s[c]=24,s[c|256]=24):(n[c]=31744,n[c|256]=64512,s[c]=13,s[c|256]=13)}const r=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let c=1;c<1024;++c){let l=c<<13,u=0;for(;(l&8388608)===0;)l<<=1,u-=8388608;l&=-8388609,u+=947912704,r[c]=l|u}for(let c=1024;c<2048;++c)r[c]=939524096+(c-1024<<13);for(let c=1;c<31;++c)a[c]=c<<23;a[31]=1199570944,a[32]=2147483648;for(let c=33;c<63;++c)a[c]=2147483648+(c-32<<23);a[63]=3347054592;for(let c=1;c<64;++c)c!==32&&(o[c]=1024);return{floatView:t,uint32View:e,baseTable:n,shiftTable:s,mantissaTable:r,exponentTable:a,offsetTable:o}}function wf(i){Math.abs(i)>65504&&Ut("DataUtils.toHalfFloat(): Value out of range."),i=zt(i,-65504,65504),Yn.floatView[0]=i;const t=Yn.uint32View[0],e=t>>23&511;return Yn.baseTable[e]+((t&8388607)>>Yn.shiftTable[e])}function Ef(i){const t=i>>10;return Yn.uint32View[0]=Yn.mantissaTable[Yn.offsetTable[t]+(i&1023)]+Yn.exponentTable[t],Yn.floatView[0]}class mr{static toHalfFloat(t){return wf(t)}static fromHalfFloat(t){return Ef(t)}}const we=new E,xr=new Rt;let Tf=0;class tn{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Tf++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=hc,this.updateRanges=[],this.gpuType=pn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)xr.fromBufferAttribute(this,e),xr.applyMatrix3(t),this.setXY(e,xr.x,xr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)we.fromBufferAttribute(this,e),we.applyMatrix3(t),this.setXYZ(e,we.x,we.y,we.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)we.fromBufferAttribute(this,e),we.applyMatrix4(t),this.setXYZ(e,we.x,we.y,we.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)we.fromBufferAttribute(this,e),we.applyNormalMatrix(t),this.setXYZ(e,we.x,we.y,we.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)we.fromBufferAttribute(this,e),we.transformDirection(t),this.setXYZ(e,we.x,we.y,we.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Mn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ne(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Mn(e,this.array)),e}setX(t,e){return this.normalized&&(e=ne(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Mn(e,this.array)),e}setY(t,e){return this.normalized&&(e=ne(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Mn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ne(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Mn(e,this.array)),e}setW(t,e){return this.normalized&&(e=ne(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=ne(e,this.array),n=ne(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=ne(e,this.array),n=ne(n,this.array),s=ne(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=ne(e,this.array),n=ne(n,this.array),s=ne(s,this.array),r=ne(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==hc&&(t.usage=this.usage),t}}class ph extends tn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class mh extends tn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class he extends tn{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Af=0;const un=new Qt,Wa=new pe,Yi=new E,rn=new He,Cs=new He,Pe=new E;class Ue extends Ss{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Af++}),this.uuid=Kn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(hh(t)?mh:ph)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Vt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return un.makeRotationFromQuaternion(t),this.applyMatrix4(un),this}rotateX(t){return un.makeRotationX(t),this.applyMatrix4(un),this}rotateY(t){return un.makeRotationY(t),this.applyMatrix4(un),this}rotateZ(t){return un.makeRotationZ(t),this.applyMatrix4(un),this}translate(t,e,n){return un.makeTranslation(t,e,n),this.applyMatrix4(un),this}scale(t,e,n){return un.makeScale(t,e,n),this.applyMatrix4(un),this}lookAt(t){return Wa.lookAt(t),Wa.updateMatrix(),this.applyMatrix4(Wa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Yi).negate(),this.translate(Yi.x,Yi.y,Yi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new he(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Ut("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new He);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){ge("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new E(-1/0,-1/0,-1/0),new E(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];rn.setFromBufferAttribute(r),this.morphTargetsRelative?(Pe.addVectors(this.boundingBox.min,rn.min),this.boundingBox.expandByPoint(Pe),Pe.addVectors(this.boundingBox.max,rn.max),this.boundingBox.expandByPoint(Pe)):(this.boundingBox.expandByPoint(rn.min),this.boundingBox.expandByPoint(rn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&ge('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new pa);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){ge("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new E,1/0);return}if(t){const n=this.boundingSphere.center;if(rn.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];Cs.setFromBufferAttribute(o),this.morphTargetsRelative?(Pe.addVectors(rn.min,Cs.min),rn.expandByPoint(Pe),Pe.addVectors(rn.max,Cs.max),rn.expandByPoint(Pe)):(rn.expandByPoint(Cs.min),rn.expandByPoint(Cs.max))}rn.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)Pe.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Pe));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)Pe.fromBufferAttribute(o,l),c&&(Yi.fromBufferAttribute(t,l),Pe.add(Yi)),s=Math.max(s,n.distanceToSquared(Pe))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&ge('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){ge("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new tn(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let C=0;C<n.count;C++)o[C]=new E,c[C]=new E;const l=new E,u=new E,h=new E,d=new Rt,f=new Rt,x=new Rt,g=new E,m=new E;function p(C,S,_){l.fromBufferAttribute(n,C),u.fromBufferAttribute(n,S),h.fromBufferAttribute(n,_),d.fromBufferAttribute(r,C),f.fromBufferAttribute(r,S),x.fromBufferAttribute(r,_),u.sub(l),h.sub(l),f.sub(d),x.sub(d);const P=1/(f.x*x.y-x.x*f.y);isFinite(P)&&(g.copy(u).multiplyScalar(x.y).addScaledVector(h,-f.y).multiplyScalar(P),m.copy(h).multiplyScalar(f.x).addScaledVector(u,-x.x).multiplyScalar(P),o[C].add(g),o[S].add(g),o[_].add(g),c[C].add(m),c[S].add(m),c[_].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let C=0,S=y.length;C<S;++C){const _=y[C],P=_.start,D=_.count;for(let I=P,U=P+D;I<U;I+=3)p(t.getX(I+0),t.getX(I+1),t.getX(I+2))}const M=new E,v=new E,b=new E,w=new E;function A(C){b.fromBufferAttribute(s,C),w.copy(b);const S=o[C];M.copy(S),M.sub(b.multiplyScalar(b.dot(S))).normalize(),v.crossVectors(w,S);const P=v.dot(c[C])<0?-1:1;a.setXYZW(C,M.x,M.y,M.z,P)}for(let C=0,S=y.length;C<S;++C){const _=y[C],P=_.start,D=_.count;for(let I=P,U=P+D;I<U;I+=3)A(t.getX(I+0)),A(t.getX(I+1)),A(t.getX(I+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new tn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const s=new E,r=new E,a=new E,o=new E,c=new E,l=new E,u=new E,h=new E;if(t)for(let d=0,f=t.count;d<f;d+=3){const x=t.getX(d+0),g=t.getX(d+1),m=t.getX(d+2);s.fromBufferAttribute(e,x),r.fromBufferAttribute(e,g),a.fromBufferAttribute(e,m),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),o.fromBufferAttribute(n,x),c.fromBufferAttribute(n,g),l.fromBufferAttribute(n,m),o.add(u),c.add(u),l.add(u),n.setXYZ(x,o.x,o.y,o.z),n.setXYZ(g,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,f=e.count;d<f;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),a.fromBufferAttribute(e,d+2),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Pe.fromBufferAttribute(t,e),Pe.normalize(),t.setXYZ(e,Pe.x,Pe.y,Pe.z)}toNonIndexed(){function t(o,c){const l=o.array,u=o.itemSize,h=o.normalized,d=new l.constructor(c.length*u);let f=0,x=0;for(let g=0,m=c.length;g<m;g++){o.isInterleavedBufferAttribute?f=c[g]*o.data.stride+o.offset:f=c[g]*u;for(let p=0;p<u;p++)d[x++]=l[f++]}return new tn(d,u,h)}if(this.index===null)return Ut("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ue,n=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=t(c,n);e.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let u=0,h=l.length;u<h;u++){const d=l[u],f=t(d,n);c.push(f)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let h=0,d=l.length;h<d;h++){const f=l[h];u.push(f.toJSON(t.data))}u.length>0&&(s[c]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const l in s){const u=s[l];this.setAttribute(l,u.clone(e))}const r=t.morphAttributes;for(const l in r){const u=[],h=r[l];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(e));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let l=0,u=a.length;l<u;l++){const h=a[l];this.addGroup(h.start,h.count,h.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Rl=new Qt,bi=new bs,gr=new pa,Cl=new E,_r=new E,vr=new E,yr=new E,Xa=new E,Mr=new E,Pl=new E,Sr=new E;class ee extends pe{constructor(t=new Ue,e=new _i){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){Mr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=o[c],h=r[c];u!==0&&(Xa.fromBufferAttribute(h,t),a?Mr.addScaledVector(Xa,u):Mr.addScaledVector(Xa.sub(e),u))}e.add(Mr)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),gr.copy(n.boundingSphere),gr.applyMatrix4(r),bi.copy(t.ray).recast(t.near),!(gr.containsPoint(bi.origin)===!1&&(bi.intersectSphere(gr,Cl)===null||bi.origin.distanceToSquared(Cl)>(t.far-t.near)**2))&&(Rl.copy(r).invert(),bi.copy(t.ray).applyMatrix4(Rl),!(n.boundingBox!==null&&bi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,bi)))}_computeIntersections(t,e,n){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let x=0,g=d.length;x<g;x++){const m=d[x],p=a[m.materialIndex],y=Math.max(m.start,f.start),M=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let v=y,b=M;v<b;v+=3){const w=o.getX(v),A=o.getX(v+1),C=o.getX(v+2);s=br(this,p,t,n,l,u,h,w,A,C),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const x=Math.max(0,f.start),g=Math.min(o.count,f.start+f.count);for(let m=x,p=g;m<p;m+=3){const y=o.getX(m),M=o.getX(m+1),v=o.getX(m+2);s=br(this,a,t,n,l,u,h,y,M,v),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let x=0,g=d.length;x<g;x++){const m=d[x],p=a[m.materialIndex],y=Math.max(m.start,f.start),M=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let v=y,b=M;v<b;v+=3){const w=v,A=v+1,C=v+2;s=br(this,p,t,n,l,u,h,w,A,C),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const x=Math.max(0,f.start),g=Math.min(c.count,f.start+f.count);for(let m=x,p=g;m<p;m+=3){const y=m,M=m+1,v=m+2;s=br(this,a,t,n,l,u,h,y,M,v),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function Rf(i,t,e,n,s,r,a,o){let c;if(t.side===Ye?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,t.side===Pn,o),c===null)return null;Sr.copy(o),Sr.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(Sr);return l<e.near||l>e.far?null:{distance:l,point:Sr.clone(),object:i}}function br(i,t,e,n,s,r,a,o,c,l){i.getVertexPosition(o,_r),i.getVertexPosition(c,vr),i.getVertexPosition(l,yr);const u=Rf(i,t,e,n,_r,vr,yr,Pl);if(u){const h=new E;De.getBarycoord(Pl,_r,vr,yr,h),s&&(u.uv=De.getInterpolatedAttribute(s,o,c,l,h,new Rt)),r&&(u.uv1=De.getInterpolatedAttribute(r,o,c,l,h,new Rt)),a&&(u.normal=De.getInterpolatedAttribute(a,o,c,l,h,new E),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const d={a:o,b:c,c:l,normal:new E,materialIndex:0};De.getNormal(_r,vr,yr,d.normal),u.face=d,u.barycoord=h}return u}class Jt extends Ue{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],u=[],h=[];let d=0,f=0;x("z","y","x",-1,-1,n,e,t,a,r,0),x("z","y","x",1,-1,n,e,-t,a,r,1),x("x","z","y",1,1,t,n,e,s,a,2),x("x","z","y",1,-1,t,n,-e,s,a,3),x("x","y","z",1,-1,t,e,n,s,r,4),x("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new he(l,3)),this.setAttribute("normal",new he(u,3)),this.setAttribute("uv",new he(h,2));function x(g,m,p,y,M,v,b,w,A,C,S){const _=v/A,P=b/C,D=v/2,I=b/2,U=w/2,B=A+1,V=C+1;let $=0,X=0;const et=new E;for(let Y=0;Y<V;Y++){const ft=Y*P-I;for(let Mt=0;Mt<B;Mt++){const Ct=Mt*_-D;et[g]=Ct*y,et[m]=ft*M,et[p]=U,l.push(et.x,et.y,et.z),et[g]=0,et[m]=0,et[p]=w>0?1:-1,u.push(et.x,et.y,et.z),h.push(Mt/A),h.push(1-Y/C),$+=1}}for(let Y=0;Y<C;Y++)for(let ft=0;ft<A;ft++){const Mt=d+ft+B*Y,Ct=d+ft+B*(Y+1),Wt=d+(ft+1)+B*(Y+1),$t=d+(ft+1)+B*Y;c.push(Mt,Ct,$t),c.push(Ct,Wt,$t),X+=6}o.addGroup(f,X,S),f+=X,d+=$}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Jt(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Ms(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(Ut("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Xe(i){const t={};for(let e=0;e<i.length;e++){const n=Ms(i[e]);for(const s in n)t[s]=n[s]}return t}function Cf(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function xh(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:jt.workingColorSpace}const Pf={clone:Ms,merge:Xe};var Df=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Lf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class jn extends Ni{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Df,this.fragmentShader=Lf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ms(t.uniforms),this.uniformsGroups=Cf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class gh extends pe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Qt,this.projectionMatrix=new Qt,this.projectionMatrixInverse=new Qt,this.coordinateSystem=Cn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ri=new E,Dl=new Rt,Ll=new Rt;class dn extends gh{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Js*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Ws*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Js*2*Math.atan(Math.tan(Ws*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){ri.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ri.x,ri.y).multiplyScalar(-t/ri.z),ri.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ri.x,ri.y).multiplyScalar(-t/ri.z)}getViewSize(t,e){return this.getViewBounds(t,Dl,Ll),e.subVectors(Ll,Dl)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Ws*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,e-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const $i=-90,Ki=1;class If extends pe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new dn($i,Ki,t,e);s.layers=this.layers,this.add(s);const r=new dn($i,Ki,t,e);r.layers=this.layers,this.add(r);const a=new dn($i,Ki,t,e);a.layers=this.layers,this.add(a);const o=new dn($i,Ki,t,e);o.layers=this.layers,this.add(o);const c=new dn($i,Ki,t,e);c.layers=this.layers,this.add(c);const l=new dn($i,Ki,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,c]=e;for(const l of e)this.remove(l);if(t===Cn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===ra)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,u]=this.children,h=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),x=t.xr.enabled;t.xr.enabled=!1;const g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,a),t.setRenderTarget(n,2,s),t.render(e,o),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=g,t.setRenderTarget(n,5,s),t.render(e,u),t.setRenderTarget(h,d,f),t.xr.enabled=x,n.texture.needsPMREMUpdate=!0}}class _h extends Ve{constructor(t=[],e=vs,n,s,r,a,o,c,l,u){super(t,e,n,s,r,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Uf extends Ui{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new _h(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Jt(5,5,5),r=new jn({name:"CubemapFromEquirect",uniforms:Ms(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ye,blending:$n});r.uniforms.tEquirect.value=e;const a=new ee(s,r),o=e.minFilter;return e.minFilter===di&&(e.minFilter=Ne),new If(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}}class Je extends pe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Nf={type:"move"};class qa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Je,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Je,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new E,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new E),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Je,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new E,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new E),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(const g of t.hand.values()){const m=e.getJointPose(g,n),p=this._getHandJoint(l,g);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],d=u.position.distanceTo(h.position),f=.02,x=.005;l.inputState.pinching&&d>f+x?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=f-x&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Nf)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Je;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class Vc{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Yt(t),this.near=e,this.far=n}clone(){return new Vc(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Ff extends pe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ln,this.environmentIntensity=1,this.environmentRotation=new Ln,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Of{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=hc,this.updateRanges=[],this.version=0,this.uuid=Kn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Kn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Kn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const We=new E;class ca{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)We.fromBufferAttribute(this,e),We.applyMatrix4(t),this.setXYZ(e,We.x,We.y,We.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)We.fromBufferAttribute(this,e),We.applyNormalMatrix(t),this.setXYZ(e,We.x,We.y,We.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)We.fromBufferAttribute(this,e),We.transformDirection(t),this.setXYZ(e,We.x,We.y,We.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=Mn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ne(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=ne(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=ne(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=ne(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=ne(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Mn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Mn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Mn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Mn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=ne(e,this.array),n=ne(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=ne(e,this.array),n=ne(n,this.array),s=ne(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=ne(e,this.array),n=ne(n,this.array),s=ne(s,this.array),r=ne(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){oa("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new tn(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new ca(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){oa("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class vh extends Ni{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Yt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Zi;const Ps=new E,ji=new E,Ji=new E,Qi=new Rt,Ds=new Rt,yh=new Qt,wr=new E,Ls=new E,Er=new E,Il=new Rt,Ya=new Rt,Ul=new Rt;class Bf extends pe{constructor(t=new vh){if(super(),this.isSprite=!0,this.type="Sprite",Zi===void 0){Zi=new Ue;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Of(e,5);Zi.setIndex([0,1,2,0,2,3]),Zi.setAttribute("position",new ca(n,3,0,!1)),Zi.setAttribute("uv",new ca(n,2,3,!1))}this.geometry=Zi,this.material=t,this.center=new Rt(.5,.5),this.count=1}raycast(t,e){t.camera===null&&ge('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ji.setFromMatrixScale(this.matrixWorld),yh.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Ji.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ji.multiplyScalar(-Ji.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;Tr(wr.set(-.5,-.5,0),Ji,a,ji,s,r),Tr(Ls.set(.5,-.5,0),Ji,a,ji,s,r),Tr(Er.set(.5,.5,0),Ji,a,ji,s,r),Il.set(0,0),Ya.set(1,0),Ul.set(1,1);let o=t.ray.intersectTriangle(wr,Ls,Er,!1,Ps);if(o===null&&(Tr(Ls.set(-.5,.5,0),Ji,a,ji,s,r),Ya.set(0,1),o=t.ray.intersectTriangle(wr,Er,Ls,!1,Ps),o===null))return;const c=t.ray.origin.distanceTo(Ps);c<t.near||c>t.far||e.push({distance:c,point:Ps.clone(),uv:De.getInterpolation(Ps,wr,Ls,Er,Il,Ya,Ul,new Rt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function Tr(i,t,e,n,s,r){Qi.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(Ds.x=r*Qi.x-s*Qi.y,Ds.y=s*Qi.x+r*Qi.y):Ds.copy(Qi),i.copy(t),i.x+=Ds.x,i.y+=Ds.y,i.applyMatrix4(yh)}class Mh extends Ve{constructor(t=null,e=1,n=1,s,r,a,o,c,l=cn,u=cn,h,d){super(null,a,o,c,l,u,s,r,h,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const $a=new E,zf=new E,Vf=new Vt;class Xn{constructor(t=new E(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=$a.subVectors(n,e).cross(zf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta($a),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Vf.getNormalMatrix(t),s=this.coplanarPoint($a).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const wi=new pa,kf=new Rt(.5,.5),Ar=new E;class kc{constructor(t=new Xn,e=new Xn,n=new Xn,s=new Xn,r=new Xn,a=new Xn){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Cn,n=!1){const s=this.planes,r=t.elements,a=r[0],o=r[1],c=r[2],l=r[3],u=r[4],h=r[5],d=r[6],f=r[7],x=r[8],g=r[9],m=r[10],p=r[11],y=r[12],M=r[13],v=r[14],b=r[15];if(s[0].setComponents(l-a,f-u,p-x,b-y).normalize(),s[1].setComponents(l+a,f+u,p+x,b+y).normalize(),s[2].setComponents(l+o,f+h,p+g,b+M).normalize(),s[3].setComponents(l-o,f-h,p-g,b-M).normalize(),n)s[4].setComponents(c,d,m,v).normalize(),s[5].setComponents(l-c,f-d,p-m,b-v).normalize();else if(s[4].setComponents(l-c,f-d,p-m,b-v).normalize(),e===Cn)s[5].setComponents(l+c,f+d,p+m,b+v).normalize();else if(e===ra)s[5].setComponents(c,d,m,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),wi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),wi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(wi)}intersectsSprite(t){wi.center.set(0,0,0);const e=kf.distanceTo(t.center);return wi.radius=.7071067811865476+e,wi.applyMatrix4(t.matrixWorld),this.intersectsSphere(wi)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Ar.x=s.normal.x>0?t.max.x:t.min.x,Ar.y=s.normal.y>0?t.max.y:t.min.y,Ar.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Ar)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Hc extends Ni{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Yt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const la=new E,ua=new E,Nl=new Qt,Is=new bs,Rr=new pa,Ka=new E,Fl=new E;class Sh extends pe{constructor(t=new Ue,e=new Hc){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)la.fromBufferAttribute(e,s-1),ua.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=la.distanceTo(ua);t.setAttribute("lineDistance",new he(n,1))}else Ut("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Rr.copy(n.boundingSphere),Rr.applyMatrix4(s),Rr.radius+=r,t.ray.intersectsSphere(Rr)===!1)return;Nl.copy(s).invert(),Is.copy(t.ray).applyMatrix4(Nl);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,u=n.index,d=n.attributes.position;if(u!==null){const f=Math.max(0,a.start),x=Math.min(u.count,a.start+a.count);for(let g=f,m=x-1;g<m;g+=l){const p=u.getX(g),y=u.getX(g+1),M=Cr(this,t,Is,c,p,y,g);M&&e.push(M)}if(this.isLineLoop){const g=u.getX(x-1),m=u.getX(f),p=Cr(this,t,Is,c,g,m,x-1);p&&e.push(p)}}else{const f=Math.max(0,a.start),x=Math.min(d.count,a.start+a.count);for(let g=f,m=x-1;g<m;g+=l){const p=Cr(this,t,Is,c,g,g+1,g);p&&e.push(p)}if(this.isLineLoop){const g=Cr(this,t,Is,c,x-1,f,x-1);g&&e.push(g)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Cr(i,t,e,n,s,r,a){const o=i.geometry.attributes.position;if(la.fromBufferAttribute(o,s),ua.fromBufferAttribute(o,r),e.distanceSqToSegment(la,ua,Ka,Fl)>n)return;Ka.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Ka);if(!(l<t.near||l>t.far))return{distance:l,point:Fl.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const Ol=new E,Bl=new E;class Hf extends Sh{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)Ol.fromBufferAttribute(e,s),Bl.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Ol.distanceTo(Bl);t.setAttribute("lineDistance",new he(n,1))}else Ut("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class bh extends Ve{constructor(t,e,n,s,r,a,o,c,l){super(t,e,n,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class wh extends Ve{constructor(t,e,n=Li,s,r,a,o=cn,c=cn,l,u=Ks,h=1){if(u!==Ks&&u!==Zs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:t,height:e,depth:h};super(d,s,r,a,o,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Bc(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Eh extends Ve{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Gc extends Ue{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],a=[],o=[],c=[],l=new E,u=new Rt;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let h=0,d=3;h<=e;h++,d+=3){const f=n+h/e*s;l.x=t*Math.cos(f),l.y=t*Math.sin(f),a.push(l.x,l.y,l.z),o.push(0,0,1),u.x=(a[d]/t+1)/2,u.y=(a[d+1]/t+1)/2,c.push(u.x,u.y)}for(let h=1;h<=e;h++)r.push(h,h+1,0);this.setIndex(r),this.setAttribute("position",new he(a,3)),this.setAttribute("normal",new he(o,3)),this.setAttribute("uv",new he(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Gc(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Qe extends Ue{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const u=[],h=[],d=[],f=[];let x=0;const g=[],m=n/2;let p=0;y(),a===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(u),this.setAttribute("position",new he(h,3)),this.setAttribute("normal",new he(d,3)),this.setAttribute("uv",new he(f,2));function y(){const v=new E,b=new E;let w=0;const A=(e-t)/n;for(let C=0;C<=r;C++){const S=[],_=C/r,P=_*(e-t)+t;for(let D=0;D<=s;D++){const I=D/s,U=I*c+o,B=Math.sin(U),V=Math.cos(U);b.x=P*B,b.y=-_*n+m,b.z=P*V,h.push(b.x,b.y,b.z),v.set(B,A,V).normalize(),d.push(v.x,v.y,v.z),f.push(I,1-_),S.push(x++)}g.push(S)}for(let C=0;C<s;C++)for(let S=0;S<r;S++){const _=g[S][C],P=g[S+1][C],D=g[S+1][C+1],I=g[S][C+1];(t>0||S!==0)&&(u.push(_,P,I),w+=3),(e>0||S!==r-1)&&(u.push(P,D,I),w+=3)}l.addGroup(p,w,0),p+=w}function M(v){const b=x,w=new Rt,A=new E;let C=0;const S=v===!0?t:e,_=v===!0?1:-1;for(let D=1;D<=s;D++)h.push(0,m*_,0),d.push(0,_,0),f.push(.5,.5),x++;const P=x;for(let D=0;D<=s;D++){const U=D/s*c+o,B=Math.cos(U),V=Math.sin(U);A.x=S*V,A.y=m*_,A.z=S*B,h.push(A.x,A.y,A.z),d.push(0,_,0),w.x=B*.5+.5,w.y=V*.5*_+.5,f.push(w.x,w.y),x++}for(let D=0;D<s;D++){const I=b+D,U=P+D;v===!0?u.push(U,U+1,I):u.push(U+1,U,I),C+=3}l.addGroup(p,C,v===!0?1:2),p+=C}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Qe(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ma extends Qe{constructor(t=1,e=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new ma(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Jn extends Ue{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(n),c=Math.floor(s),l=o+1,u=c+1,h=t/o,d=e/c,f=[],x=[],g=[],m=[];for(let p=0;p<u;p++){const y=p*d-a;for(let M=0;M<l;M++){const v=M*h-r;x.push(v,-y,0),g.push(0,0,1),m.push(M/o),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let y=0;y<o;y++){const M=y+l*p,v=y+l*(p+1),b=y+1+l*(p+1),w=y+1+l*p;f.push(M,v,w),f.push(v,b,w)}this.setIndex(f),this.setAttribute("position",new he(x,3)),this.setAttribute("normal",new he(g,3)),this.setAttribute("uv",new he(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Jn(t.width,t.height,t.widthSegments,t.heightSegments)}}class Wc extends Ue{constructor(t=.5,e=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const o=[],c=[],l=[],u=[];let h=t;const d=(e-t)/s,f=new E,x=new Rt;for(let g=0;g<=s;g++){for(let m=0;m<=n;m++){const p=r+m/n*a;f.x=h*Math.cos(p),f.y=h*Math.sin(p),c.push(f.x,f.y,f.z),l.push(0,0,1),x.x=(f.x/e+1)/2,x.y=(f.y/e+1)/2,u.push(x.x,x.y)}h+=d}for(let g=0;g<s;g++){const m=g*(n+1);for(let p=0;p<n;p++){const y=p+m,M=y,v=y+n+1,b=y+n+2,w=y+1;o.push(M,v,w),o.push(v,b,w)}}this.setIndex(o),this.setAttribute("position",new he(c,3)),this.setAttribute("normal",new he(l,3)),this.setAttribute("uv",new he(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Wc(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class xi extends Ue{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const u=[],h=new E,d=new E,f=[],x=[],g=[],m=[];for(let p=0;p<=n;p++){const y=[],M=p/n;let v=0;p===0&&a===0?v=.5/e:p===n&&c===Math.PI&&(v=-.5/e);for(let b=0;b<=e;b++){const w=b/e;h.x=-t*Math.cos(s+w*r)*Math.sin(a+M*o),h.y=t*Math.cos(a+M*o),h.z=t*Math.sin(s+w*r)*Math.sin(a+M*o),x.push(h.x,h.y,h.z),d.copy(h).normalize(),g.push(d.x,d.y,d.z),m.push(w+v,1-M),y.push(l++)}u.push(y)}for(let p=0;p<n;p++)for(let y=0;y<e;y++){const M=u[p][y+1],v=u[p][y],b=u[p+1][y],w=u[p+1][y+1];(p!==0||a>0)&&f.push(M,v,w),(p!==n-1||c<Math.PI)&&f.push(v,b,w)}this.setIndex(f),this.setAttribute("position",new he(x,3)),this.setAttribute("normal",new he(g,3)),this.setAttribute("uv",new he(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new xi(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Xc extends Ue{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const a=[],o=[],c=[],l=[],u=new E,h=new E,d=new E;for(let f=0;f<=n;f++)for(let x=0;x<=s;x++){const g=x/s*r,m=f/n*Math.PI*2;h.x=(t+e*Math.cos(m))*Math.cos(g),h.y=(t+e*Math.cos(m))*Math.sin(g),h.z=e*Math.sin(m),o.push(h.x,h.y,h.z),u.x=t*Math.cos(g),u.y=t*Math.sin(g),d.subVectors(h,u).normalize(),c.push(d.x,d.y,d.z),l.push(x/s),l.push(f/n)}for(let f=1;f<=n;f++)for(let x=1;x<=s;x++){const g=(s+1)*f+x-1,m=(s+1)*(f-1)+x-1,p=(s+1)*(f-1)+x,y=(s+1)*f+x;a.push(g,m,y),a.push(m,p,y)}this.setIndex(a),this.setAttribute("position",new he(o,3)),this.setAttribute("normal",new he(c,3)),this.setAttribute("uv",new he(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Xc(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class ae extends Ni{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Yt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Yt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=lh,this.normalScale=new Rt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ln,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Gf extends Ni{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ud,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Wf extends Ni{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const zl={enabled:!1,files:{},add:function(i,t){this.enabled!==!1&&(this.files[i]=t)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class Xf{constructor(t,e,n){const s=this;let r=!1,a=0,o=0,c;const l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,h){return l.push(u,h),this},this.removeHandler=function(u){const h=l.indexOf(u);return h!==-1&&l.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=l.length;h<d;h+=2){const f=l[h],x=l[h+1];if(f.global&&(f.lastIndex=0),f.test(u))return x}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const qf=new Xf;class qc{constructor(t){this.manager=t!==void 0?t:qf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}}qc.DEFAULT_MATERIAL_NAME="__DEFAULT";const zn={};class Yf extends Error{constructor(t,e){super(t),this.response=e}}class $f extends qc{constructor(t){super(t),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(t,e,n,s){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=zl.get(`file:${t}`);if(r!==void 0)return this.manager.itemStart(t),setTimeout(()=>{e&&e(r),this.manager.itemEnd(t)},0),r;if(zn[t]!==void 0){zn[t].push({onLoad:e,onProgress:n,onError:s});return}zn[t]=[],zn[t].push({onLoad:e,onProgress:n,onError:s});const a=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&Ut("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const u=zn[t],h=l.body.getReader(),d=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),f=d?parseInt(d):0,x=f!==0;let g=0;const m=new ReadableStream({start(p){y();function y(){h.read().then(({done:M,value:v})=>{if(M)p.close();else{g+=v.byteLength;const b=new ProgressEvent("progress",{lengthComputable:x,loaded:g,total:f});for(let w=0,A=u.length;w<A;w++){const C=u[w];C.onProgress&&C.onProgress(b)}p.enqueue(v),y()}},M=>{p.error(M)})}}});return new Response(m)}else throw new Yf(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return l.json();default:if(o==="")return l.text();{const h=/charset="?([^;"\s]*)"?/i.exec(o),d=h&&h[1]?h[1].toLowerCase():void 0,f=new TextDecoder(d);return l.arrayBuffer().then(x=>f.decode(x))}}}).then(l=>{zl.add(`file:${t}`,l);const u=zn[t];delete zn[t];for(let h=0,d=u.length;h<d;h++){const f=u[h];f.onLoad&&f.onLoad(l)}}).catch(l=>{const u=zn[t];if(u===void 0)throw this.manager.itemError(t),l;delete zn[t];for(let h=0,d=u.length;h<d;h++){const f=u[h];f.onError&&f.onError(l)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}class Kf extends qc{constructor(t){super(t)}load(t,e,n,s){const r=this,a=new Mh,o=new $f(this.manager);return o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setPath(this.path),o.setWithCredentials(r.withCredentials),o.load(t,function(c){let l;try{l=r.parse(c)}catch(u){if(s!==void 0)s(u);else{u(u);return}}l.image!==void 0?a.image=l.image:l.data!==void 0&&(a.image.width=l.width,a.image.height=l.height,a.image.data=l.data),a.wrapS=l.wrapS!==void 0?l.wrapS:Sn,a.wrapT=l.wrapT!==void 0?l.wrapT:Sn,a.magFilter=l.magFilter!==void 0?l.magFilter:Ne,a.minFilter=l.minFilter!==void 0?l.minFilter:Ne,a.anisotropy=l.anisotropy!==void 0?l.anisotropy:1,l.colorSpace!==void 0&&(a.colorSpace=l.colorSpace),l.flipY!==void 0&&(a.flipY=l.flipY),l.format!==void 0&&(a.format=l.format),l.type!==void 0&&(a.type=l.type),l.mipmaps!==void 0&&(a.mipmaps=l.mipmaps,a.minFilter=di),l.mipmapCount===1&&(a.minFilter=Ne),l.generateMipmaps!==void 0&&(a.generateMipmaps=l.generateMipmaps),a.needsUpdate=!0,e&&e(a,l)},n,s),a}}class Th extends pe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Yt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Zf extends Th{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(pe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Yt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Za=new Qt,Vl=new E,kl=new E;class jf{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Rt(512,512),this.mapType=Dn,this.map=null,this.mapPass=null,this.matrix=new Qt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new kc,this._frameExtents=new Rt(1,1),this._viewportCount=1,this._viewports=[new Me(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Vl.setFromMatrixPosition(t.matrixWorld),e.position.copy(Vl),kl.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(kl),e.updateMatrixWorld(),Za.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Za,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Za)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Ah extends gh{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Jf extends jf{constructor(){super(new Ah(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Qf extends Th{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(pe.DEFAULT_UP),this.updateMatrix(),this.target=new pe,this.shadow=new Jf}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class tp extends dn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class ep{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=performance.now();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}const Hl=new Qt;class np{constructor(t,e,n=0,s=1/0){this.ray=new bs(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new zc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):ge("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Hl.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Hl),this}intersectObject(t,e=!0,n=[]){return dc(t,this,n,e),n.sort(Gl),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)dc(t[s],this,n,e);return n.sort(Gl),n}}function Gl(i,t){return i.distance-t.distance}function dc(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)dc(r[a],t,e,!0)}}const Wl=new E,Pr=new E,ts=new E,es=new E,ja=new E,ip=new E,sp=new E;class In{constructor(t=new E,e=new E){this.start=t,this.end=e}set(t,e){return this.start.copy(t),this.end.copy(e),this}copy(t){return this.start.copy(t.start),this.end.copy(t.end),this}getCenter(t){return t.addVectors(this.start,this.end).multiplyScalar(.5)}delta(t){return t.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(t,e){return this.delta(e).multiplyScalar(t).add(this.start)}closestPointToPointParameter(t,e){Wl.subVectors(t,this.start),Pr.subVectors(this.end,this.start);const n=Pr.dot(Pr);let r=Pr.dot(Wl)/n;return e&&(r=zt(r,0,1)),r}closestPointToPoint(t,e,n){const s=this.closestPointToPointParameter(t,e);return this.delta(n).multiplyScalar(s).add(this.start)}distanceSqToLine3(t,e=ip,n=sp){const s=10000000000000001e-32;let r,a;const o=this.start,c=t.start,l=this.end,u=t.end;ts.subVectors(l,o),es.subVectors(u,c),ja.subVectors(o,c);const h=ts.dot(ts),d=es.dot(es),f=es.dot(ja);if(h<=s&&d<=s)return e.copy(o),n.copy(c),e.sub(n),e.dot(e);if(h<=s)r=0,a=f/d,a=zt(a,0,1);else{const x=ts.dot(ja);if(d<=s)a=0,r=zt(-x/h,0,1);else{const g=ts.dot(es),m=h*d-g*g;m!==0?r=zt((g*f-x*d)/m,0,1):r=0,a=(g*r+f)/d,a<0?(a=0,r=zt(-x/h,0,1)):a>1&&(a=1,r=zt((g-x)/h,0,1))}}return e.copy(o).add(ts.multiplyScalar(r)),n.copy(c).add(es.multiplyScalar(a)),e.sub(n),e.dot(e)}applyMatrix4(t){return this.start.applyMatrix4(t),this.end.applyMatrix4(t),this}equals(t){return t.start.equals(this.start)&&t.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}class Rh extends Hf{constructor(t=10,e=10,n=4473924,s=8947848){n=new Yt(n),s=new Yt(s);const r=e/2,a=t/e,o=t/2,c=[],l=[];for(let d=0,f=0,x=-o;d<=e;d++,x+=a){c.push(-o,0,x,o,0,x),c.push(x,0,-o,x,0,o);const g=d===r?n:s;g.toArray(l,f),f+=3,g.toArray(l,f),f+=3,g.toArray(l,f),f+=3,g.toArray(l,f),f+=3}const u=new Ue;u.setAttribute("position",new he(c,3)),u.setAttribute("color",new he(l,3));const h=new Hc({vertexColors:!0,toneMapped:!1});super(u,h),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}function Xl(i,t,e,n){const s=rp(n);switch(e){case ah:return i*t;case ch:return i*t/s.components*s.byteLength;case Ic:return i*t/s.components*s.byteLength;case Uc:return i*t*2/s.components*s.byteLength;case Nc:return i*t*2/s.components*s.byteLength;case oh:return i*t*3/s.components*s.byteLength;case bn:return i*t*4/s.components*s.byteLength;case Fc:return i*t*4/s.components*s.byteLength;case Zr:case jr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Jr:case Qr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Bo:case Vo:return Math.max(i,16)*Math.max(t,8)/4;case Oo:case zo:return Math.max(i,8)*Math.max(t,8)/2;case ko:case Ho:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Go:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Wo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Xo:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case qo:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Yo:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case $o:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Ko:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Zo:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case jo:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Jo:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Qo:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case tc:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case ec:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case nc:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case ic:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case sc:case rc:case ac:return Math.ceil(i/4)*Math.ceil(t/4)*16;case oc:case cc:return Math.ceil(i/4)*Math.ceil(t/4)*8;case lc:case uc:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function rp(i){switch(i){case Dn:case nh:return{byteLength:1,components:1};case Ys:case ih:case Rn:return{byteLength:2,components:1};case Dc:case Lc:return{byteLength:2,components:4};case Li:case Pc:case pn:return{byteLength:4,components:1};case sh:case rh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:er}}));typeof window<"u"&&(window.__THREE__?Ut("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=er);function Ch(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function ap(i){const t=new WeakMap;function e(o,c){const l=o.array,u=o.usage,h=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,u),o.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:h}}function n(o,c,l){const u=c.array,h=c.updateRanges;if(i.bindBuffer(l,o),h.length===0)i.bufferSubData(l,0,u);else{h.sort((f,x)=>f.start-x.start);let d=0;for(let f=1;f<h.length;f++){const x=h[d],g=h[f];g.start<=x.start+x.count+1?x.count=Math.max(x.count,g.start+g.count-x.start):(++d,h[d]=g)}h.length=d+1;for(let f=0,x=h.length;f<x;f++){const g=h[f];i.bufferSubData(l,g.start*u.BYTES_PER_ELEMENT,u,g.start,g.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=t.get(o);c&&(i.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=t.get(o);(!u||u.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=t.get(o);if(l===void 0)t.set(o,e(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var op=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,cp=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,lp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,up=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,hp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,dp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,fp=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,pp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,mp=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,xp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,gp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,_p=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,vp=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,yp=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Mp=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Sp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,bp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,wp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ep=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Tp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Ap=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Rp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Cp=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Pp=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Dp=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Lp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Ip=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Up=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Np=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Fp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Op="gl_FragColor = linearToOutputTexel( gl_FragColor );",Bp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,zp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Vp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,kp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Hp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Gp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Wp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Xp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,qp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Yp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,$p=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Kp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Zp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,jp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Jp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Qp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,t0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,e0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,n0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,i0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,s0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,r0=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 uv = vec2( roughness, dotNV );
	return texture2D( dfgLUT, uv ).rg;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = DFGApprox( vec3(0.0, 0.0, 1.0), vec3(sqrt(1.0 - dotNV * dotNV), 0.0, dotNV), material.roughness );
	vec2 dfgL = DFGApprox( vec3(0.0, 0.0, 1.0), vec3(sqrt(1.0 - dotNL * dotNL), 0.0, dotNL), material.roughness );
	vec3 FssEss_V = material.specularColor * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColor * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColor + ( 1.0 - material.specularColor ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,a0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,o0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,c0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,l0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,u0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,h0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,d0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,f0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,p0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,m0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,x0=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,g0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,_0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,v0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,y0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,M0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,S0=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,b0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,w0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,E0=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,T0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,A0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,R0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,C0=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,P0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,D0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,L0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,I0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,U0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,N0=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,F0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,O0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,B0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,z0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,V0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,k0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,H0=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,G0=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,W0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,X0=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,q0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Y0=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,$0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,K0=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Z0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,j0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,J0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Q0=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,tm=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,em=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,nm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,im=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,sm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,rm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const am=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,om=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,lm=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,um=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,hm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,fm=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,pm=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,mm=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,xm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,gm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_m=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,vm=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ym=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Mm=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Sm=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,bm=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wm=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Em=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Tm=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Am=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Rm=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Cm=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Pm=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Dm=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Lm=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Im=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Um=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Nm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Fm=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Om=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Bm=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,zm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ht={alphahash_fragment:op,alphahash_pars_fragment:cp,alphamap_fragment:lp,alphamap_pars_fragment:up,alphatest_fragment:hp,alphatest_pars_fragment:dp,aomap_fragment:fp,aomap_pars_fragment:pp,batching_pars_vertex:mp,batching_vertex:xp,begin_vertex:gp,beginnormal_vertex:_p,bsdfs:vp,iridescence_fragment:yp,bumpmap_pars_fragment:Mp,clipping_planes_fragment:Sp,clipping_planes_pars_fragment:bp,clipping_planes_pars_vertex:wp,clipping_planes_vertex:Ep,color_fragment:Tp,color_pars_fragment:Ap,color_pars_vertex:Rp,color_vertex:Cp,common:Pp,cube_uv_reflection_fragment:Dp,defaultnormal_vertex:Lp,displacementmap_pars_vertex:Ip,displacementmap_vertex:Up,emissivemap_fragment:Np,emissivemap_pars_fragment:Fp,colorspace_fragment:Op,colorspace_pars_fragment:Bp,envmap_fragment:zp,envmap_common_pars_fragment:Vp,envmap_pars_fragment:kp,envmap_pars_vertex:Hp,envmap_physical_pars_fragment:Qp,envmap_vertex:Gp,fog_vertex:Wp,fog_pars_vertex:Xp,fog_fragment:qp,fog_pars_fragment:Yp,gradientmap_pars_fragment:$p,lightmap_pars_fragment:Kp,lights_lambert_fragment:Zp,lights_lambert_pars_fragment:jp,lights_pars_begin:Jp,lights_toon_fragment:t0,lights_toon_pars_fragment:e0,lights_phong_fragment:n0,lights_phong_pars_fragment:i0,lights_physical_fragment:s0,lights_physical_pars_fragment:r0,lights_fragment_begin:a0,lights_fragment_maps:o0,lights_fragment_end:c0,logdepthbuf_fragment:l0,logdepthbuf_pars_fragment:u0,logdepthbuf_pars_vertex:h0,logdepthbuf_vertex:d0,map_fragment:f0,map_pars_fragment:p0,map_particle_fragment:m0,map_particle_pars_fragment:x0,metalnessmap_fragment:g0,metalnessmap_pars_fragment:_0,morphinstance_vertex:v0,morphcolor_vertex:y0,morphnormal_vertex:M0,morphtarget_pars_vertex:S0,morphtarget_vertex:b0,normal_fragment_begin:w0,normal_fragment_maps:E0,normal_pars_fragment:T0,normal_pars_vertex:A0,normal_vertex:R0,normalmap_pars_fragment:C0,clearcoat_normal_fragment_begin:P0,clearcoat_normal_fragment_maps:D0,clearcoat_pars_fragment:L0,iridescence_pars_fragment:I0,opaque_fragment:U0,packing:N0,premultiplied_alpha_fragment:F0,project_vertex:O0,dithering_fragment:B0,dithering_pars_fragment:z0,roughnessmap_fragment:V0,roughnessmap_pars_fragment:k0,shadowmap_pars_fragment:H0,shadowmap_pars_vertex:G0,shadowmap_vertex:W0,shadowmask_pars_fragment:X0,skinbase_vertex:q0,skinning_pars_vertex:Y0,skinning_vertex:$0,skinnormal_vertex:K0,specularmap_fragment:Z0,specularmap_pars_fragment:j0,tonemapping_fragment:J0,tonemapping_pars_fragment:Q0,transmission_fragment:tm,transmission_pars_fragment:em,uv_pars_fragment:nm,uv_pars_vertex:im,uv_vertex:sm,worldpos_vertex:rm,background_vert:am,background_frag:om,backgroundCube_vert:cm,backgroundCube_frag:lm,cube_vert:um,cube_frag:hm,depth_vert:dm,depth_frag:fm,distanceRGBA_vert:pm,distanceRGBA_frag:mm,equirect_vert:xm,equirect_frag:gm,linedashed_vert:_m,linedashed_frag:vm,meshbasic_vert:ym,meshbasic_frag:Mm,meshlambert_vert:Sm,meshlambert_frag:bm,meshmatcap_vert:wm,meshmatcap_frag:Em,meshnormal_vert:Tm,meshnormal_frag:Am,meshphong_vert:Rm,meshphong_frag:Cm,meshphysical_vert:Pm,meshphysical_frag:Dm,meshtoon_vert:Lm,meshtoon_frag:Im,points_vert:Um,points_frag:Nm,shadow_vert:Fm,shadow_frag:Om,sprite_vert:Bm,sprite_frag:zm},ot={common:{diffuse:{value:new Yt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Vt},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Vt}},envmap:{envMap:{value:null},envMapRotation:{value:new Vt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Vt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Vt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Vt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Vt},normalScale:{value:new Rt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Vt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Vt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Vt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Vt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Yt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Yt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0},uvTransform:{value:new Vt}},sprite:{diffuse:{value:new Yt(16777215)},opacity:{value:1},center:{value:new Rt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Vt},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0}}},An={basic:{uniforms:Xe([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.fog]),vertexShader:Ht.meshbasic_vert,fragmentShader:Ht.meshbasic_frag},lambert:{uniforms:Xe([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,ot.lights,{emissive:{value:new Yt(0)}}]),vertexShader:Ht.meshlambert_vert,fragmentShader:Ht.meshlambert_frag},phong:{uniforms:Xe([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,ot.lights,{emissive:{value:new Yt(0)},specular:{value:new Yt(1118481)},shininess:{value:30}}]),vertexShader:Ht.meshphong_vert,fragmentShader:Ht.meshphong_frag},standard:{uniforms:Xe([ot.common,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.roughnessmap,ot.metalnessmap,ot.fog,ot.lights,{emissive:{value:new Yt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ht.meshphysical_vert,fragmentShader:Ht.meshphysical_frag},toon:{uniforms:Xe([ot.common,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.gradientmap,ot.fog,ot.lights,{emissive:{value:new Yt(0)}}]),vertexShader:Ht.meshtoon_vert,fragmentShader:Ht.meshtoon_frag},matcap:{uniforms:Xe([ot.common,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,{matcap:{value:null}}]),vertexShader:Ht.meshmatcap_vert,fragmentShader:Ht.meshmatcap_frag},points:{uniforms:Xe([ot.points,ot.fog]),vertexShader:Ht.points_vert,fragmentShader:Ht.points_frag},dashed:{uniforms:Xe([ot.common,ot.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ht.linedashed_vert,fragmentShader:Ht.linedashed_frag},depth:{uniforms:Xe([ot.common,ot.displacementmap]),vertexShader:Ht.depth_vert,fragmentShader:Ht.depth_frag},normal:{uniforms:Xe([ot.common,ot.bumpmap,ot.normalmap,ot.displacementmap,{opacity:{value:1}}]),vertexShader:Ht.meshnormal_vert,fragmentShader:Ht.meshnormal_frag},sprite:{uniforms:Xe([ot.sprite,ot.fog]),vertexShader:Ht.sprite_vert,fragmentShader:Ht.sprite_frag},background:{uniforms:{uvTransform:{value:new Vt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ht.background_vert,fragmentShader:Ht.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Vt}},vertexShader:Ht.backgroundCube_vert,fragmentShader:Ht.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ht.cube_vert,fragmentShader:Ht.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ht.equirect_vert,fragmentShader:Ht.equirect_frag},distanceRGBA:{uniforms:Xe([ot.common,ot.displacementmap,{referencePosition:{value:new E},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ht.distanceRGBA_vert,fragmentShader:Ht.distanceRGBA_frag},shadow:{uniforms:Xe([ot.lights,ot.fog,{color:{value:new Yt(0)},opacity:{value:1}}]),vertexShader:Ht.shadow_vert,fragmentShader:Ht.shadow_frag}};An.physical={uniforms:Xe([An.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Vt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Vt},clearcoatNormalScale:{value:new Rt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Vt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Vt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Vt},sheen:{value:0},sheenColor:{value:new Yt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Vt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Vt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Vt},transmissionSamplerSize:{value:new Rt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Vt},attenuationDistance:{value:0},attenuationColor:{value:new Yt(0)},specularColor:{value:new Yt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Vt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Vt},anisotropyVector:{value:new Rt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Vt}}]),vertexShader:Ht.meshphysical_vert,fragmentShader:Ht.meshphysical_frag};const Dr={r:0,b:0,g:0},Ei=new Ln,Vm=new Qt;function km(i,t,e,n,s,r,a){const o=new Yt(0);let c=r===!0?0:1,l,u,h=null,d=0,f=null;function x(M){let v=M.isScene===!0?M.background:null;return v&&v.isTexture&&(v=(M.backgroundBlurriness>0?e:t).get(v)),v}function g(M){let v=!1;const b=x(M);b===null?p(o,c):b&&b.isColor&&(p(b,1),v=!0);const w=i.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,a):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(M,v){const b=x(v);b&&(b.isCubeTexture||b.mapping===fa)?(u===void 0&&(u=new ee(new Jt(1,1,1),new jn({name:"BackgroundCubeMaterial",uniforms:Ms(An.backgroundCube.uniforms),vertexShader:An.backgroundCube.vertexShader,fragmentShader:An.backgroundCube.fragmentShader,side:Ye,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(w,A,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),Ei.copy(v.backgroundRotation),Ei.x*=-1,Ei.y*=-1,Ei.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(Ei.y*=-1,Ei.z*=-1),u.material.uniforms.envMap.value=b,u.material.uniforms.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Vm.makeRotationFromEuler(Ei)),u.material.toneMapped=jt.getTransfer(b.colorSpace)!==re,(h!==b||d!==b.version||f!==i.toneMapping)&&(u.material.needsUpdate=!0,h=b,d=b.version,f=i.toneMapping),u.layers.enableAll(),M.unshift(u,u.geometry,u.material,0,0,null)):b&&b.isTexture&&(l===void 0&&(l=new ee(new Jn(2,2),new jn({name:"BackgroundMaterial",uniforms:Ms(An.background.uniforms),vertexShader:An.background.vertexShader,fragmentShader:An.background.fragmentShader,side:Pn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=b,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=jt.getTransfer(b.colorSpace)!==re,b.matrixAutoUpdate===!0&&b.updateMatrix(),l.material.uniforms.uvTransform.value.copy(b.matrix),(h!==b||d!==b.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,h=b,d=b.version,f=i.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function p(M,v){M.getRGB(Dr,xh(i)),n.buffers.color.setClear(Dr.r,Dr.g,Dr.b,v,a)}function y(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(M,v=1){o.set(M),c=v,p(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(M){c=M,p(o,c)},render:g,addToRenderList:m,dispose:y}}function Hm(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,a=!1;function o(_,P,D,I,U){let B=!1;const V=h(I,D,P);r!==V&&(r=V,l(r.object)),B=f(_,I,D,U),B&&x(_,I,D,U),U!==null&&t.update(U,i.ELEMENT_ARRAY_BUFFER),(B||a)&&(a=!1,v(_,P,D,I),U!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(U).buffer))}function c(){return i.createVertexArray()}function l(_){return i.bindVertexArray(_)}function u(_){return i.deleteVertexArray(_)}function h(_,P,D){const I=D.wireframe===!0;let U=n[_.id];U===void 0&&(U={},n[_.id]=U);let B=U[P.id];B===void 0&&(B={},U[P.id]=B);let V=B[I];return V===void 0&&(V=d(c()),B[I]=V),V}function d(_){const P=[],D=[],I=[];for(let U=0;U<e;U++)P[U]=0,D[U]=0,I[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:D,attributeDivisors:I,object:_,attributes:{},index:null}}function f(_,P,D,I){const U=r.attributes,B=P.attributes;let V=0;const $=D.getAttributes();for(const X in $)if($[X].location>=0){const Y=U[X];let ft=B[X];if(ft===void 0&&(X==="instanceMatrix"&&_.instanceMatrix&&(ft=_.instanceMatrix),X==="instanceColor"&&_.instanceColor&&(ft=_.instanceColor)),Y===void 0||Y.attribute!==ft||ft&&Y.data!==ft.data)return!0;V++}return r.attributesNum!==V||r.index!==I}function x(_,P,D,I){const U={},B=P.attributes;let V=0;const $=D.getAttributes();for(const X in $)if($[X].location>=0){let Y=B[X];Y===void 0&&(X==="instanceMatrix"&&_.instanceMatrix&&(Y=_.instanceMatrix),X==="instanceColor"&&_.instanceColor&&(Y=_.instanceColor));const ft={};ft.attribute=Y,Y&&Y.data&&(ft.data=Y.data),U[X]=ft,V++}r.attributes=U,r.attributesNum=V,r.index=I}function g(){const _=r.newAttributes;for(let P=0,D=_.length;P<D;P++)_[P]=0}function m(_){p(_,0)}function p(_,P){const D=r.newAttributes,I=r.enabledAttributes,U=r.attributeDivisors;D[_]=1,I[_]===0&&(i.enableVertexAttribArray(_),I[_]=1),U[_]!==P&&(i.vertexAttribDivisor(_,P),U[_]=P)}function y(){const _=r.newAttributes,P=r.enabledAttributes;for(let D=0,I=P.length;D<I;D++)P[D]!==_[D]&&(i.disableVertexAttribArray(D),P[D]=0)}function M(_,P,D,I,U,B,V){V===!0?i.vertexAttribIPointer(_,P,D,U,B):i.vertexAttribPointer(_,P,D,I,U,B)}function v(_,P,D,I){g();const U=I.attributes,B=D.getAttributes(),V=P.defaultAttributeValues;for(const $ in B){const X=B[$];if(X.location>=0){let et=U[$];if(et===void 0&&($==="instanceMatrix"&&_.instanceMatrix&&(et=_.instanceMatrix),$==="instanceColor"&&_.instanceColor&&(et=_.instanceColor)),et!==void 0){const Y=et.normalized,ft=et.itemSize,Mt=t.get(et);if(Mt===void 0)continue;const Ct=Mt.buffer,Wt=Mt.type,$t=Mt.bytesPerElement,K=Wt===i.INT||Wt===i.UNSIGNED_INT||et.gpuType===Pc;if(et.isInterleavedBufferAttribute){const J=et.data,ht=J.stride,wt=et.offset;if(J.isInstancedInterleavedBuffer){for(let xt=0;xt<X.locationSize;xt++)p(X.location+xt,J.meshPerAttribute);_.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let xt=0;xt<X.locationSize;xt++)m(X.location+xt);i.bindBuffer(i.ARRAY_BUFFER,Ct);for(let xt=0;xt<X.locationSize;xt++)M(X.location+xt,ft/X.locationSize,Wt,Y,ht*$t,(wt+ft/X.locationSize*xt)*$t,K)}else{if(et.isInstancedBufferAttribute){for(let J=0;J<X.locationSize;J++)p(X.location+J,et.meshPerAttribute);_.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=et.meshPerAttribute*et.count)}else for(let J=0;J<X.locationSize;J++)m(X.location+J);i.bindBuffer(i.ARRAY_BUFFER,Ct);for(let J=0;J<X.locationSize;J++)M(X.location+J,ft/X.locationSize,Wt,Y,ft*$t,ft/X.locationSize*J*$t,K)}}else if(V!==void 0){const Y=V[$];if(Y!==void 0)switch(Y.length){case 2:i.vertexAttrib2fv(X.location,Y);break;case 3:i.vertexAttrib3fv(X.location,Y);break;case 4:i.vertexAttrib4fv(X.location,Y);break;default:i.vertexAttrib1fv(X.location,Y)}}}}y()}function b(){C();for(const _ in n){const P=n[_];for(const D in P){const I=P[D];for(const U in I)u(I[U].object),delete I[U];delete P[D]}delete n[_]}}function w(_){if(n[_.id]===void 0)return;const P=n[_.id];for(const D in P){const I=P[D];for(const U in I)u(I[U].object),delete I[U];delete P[D]}delete n[_.id]}function A(_){for(const P in n){const D=n[P];if(D[_.id]===void 0)continue;const I=D[_.id];for(const U in I)u(I[U].object),delete I[U];delete D[_.id]}}function C(){S(),a=!0,r!==s&&(r=s,l(r.object))}function S(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:C,resetDefaultState:S,dispose:b,releaseStatesOfGeometry:w,releaseStatesOfProgram:A,initAttributes:g,enableAttribute:m,disableUnusedAttributes:y}}function Gm(i,t,e){let n;function s(l){n=l}function r(l,u){i.drawArrays(n,l,u),e.update(u,n,1)}function a(l,u,h){h!==0&&(i.drawArraysInstanced(n,l,u,h),e.update(u,n,h))}function o(l,u,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,h);let f=0;for(let x=0;x<h;x++)f+=u[x];e.update(f,n,1)}function c(l,u,h,d){if(h===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let x=0;x<l.length;x++)a(l[x],u[x],d[x]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,u,0,d,0,h);let x=0;for(let g=0;g<h;g++)x+=u[g]*d[g];e.update(x,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function Wm(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(A){return!(A!==bn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const C=A===Rn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==Dn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==pn&&!C)}function c(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const u=c(l);u!==l&&(Ut("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const h=e.logarithmicDepthBuffer===!0,d=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),y=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),b=x>0,w=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:h,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:x,maxTextureSize:g,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:y,maxVaryings:M,maxFragmentUniforms:v,vertexTextures:b,maxSamples:w}}function Xm(i){const t=this;let e=null,n=0,s=!1,r=!1;const a=new Xn,o=new Vt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const f=h.length!==0||d||n!==0||s;return s=d,n=h.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,d){e=u(h,d,0)},this.setState=function(h,d,f){const x=h.clippingPlanes,g=h.clipIntersection,m=h.clipShadows,p=i.get(h);if(!s||x===null||x.length===0||r&&!m)r?u(null):l();else{const y=r?0:n,M=y*4;let v=p.clippingState||null;c.value=v,v=u(x,d,M,f);for(let b=0;b!==M;++b)v[b]=e[b];p.clippingState=v,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=y}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(h,d,f,x){const g=h!==null?h.length:0;let m=null;if(g!==0){if(m=c.value,x!==!0||m===null){const p=f+g*4,y=d.matrixWorldInverse;o.getNormalMatrix(y),(m===null||m.length<p)&&(m=new Float32Array(p));for(let M=0,v=f;M!==g;++M,v+=4)a.copy(h[M]).applyMatrix4(y,o),a.normal.toArray(m,v),m[v+3]=a.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=g,t.numIntersection=0,m}}function qm(i){let t=new WeakMap;function e(a,o){return o===ia?a.mapping=vs:o===Uo&&(a.mapping=ys),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===ia||o===Uo)if(t.has(a)){const c=t.get(a).texture;return e(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new Uf(c.height);return l.fromEquirectangularTexture(i,a),t.set(a,l),a.addEventListener("dispose",s),e(l.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const c=t.get(o);c!==void 0&&(t.delete(o),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}const fi=4,ql=[.125,.215,.35,.446,.526,.582],Di=20,Ym=256,Us=new Ah,Yl=new Yt;let Ja=null,Qa=0,to=0,eo=!1;const $m=new E;class fc{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){const{size:a=256,position:o=$m}=r;Ja=this._renderer.getRenderTarget(),Qa=this._renderer.getActiveCubeFace(),to=this._renderer.getActiveMipmapLevel(),eo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,s,c,o),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Zl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Kl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Ja,Qa,to),this._renderer.xr.enabled=eo,t.scissorTest=!1,ns(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===vs||t.mapping===ys?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ja=this._renderer.getRenderTarget(),Qa=this._renderer.getActiveCubeFace(),to=this._renderer.getActiveMipmapLevel(),eo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Ne,minFilter:Ne,generateMipmaps:!1,type:Rn,format:bn,colorSpace:Ii,depthBuffer:!1},s=$l(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=$l(t,e,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Km(r)),this._blurMaterial=jm(r,t,e),this._ggxMaterial=Zm(r,t,e)}return s}_compileMaterial(t){const e=new ee(new Ue,t);this._renderer.compile(e,Us)}_sceneToCubeUV(t,e,n,s,r){const c=new dn(90,1,e,n),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,f=h.toneMapping;h.getClearColor(Yl),h.toneMapping=mi,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(s),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ee(new Jt,new _i({name:"PMREM.Background",side:Ye,depthWrite:!1,depthTest:!1})));const g=this._backgroundBox,m=g.material;let p=!1;const y=t.background;y?y.isColor&&(m.color.copy(y),t.background=null,p=!0):(m.color.copy(Yl),p=!0);for(let M=0;M<6;M++){const v=M%3;v===0?(c.up.set(0,l[M],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+u[M],r.y,r.z)):v===1?(c.up.set(0,0,l[M]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+u[M],r.z)):(c.up.set(0,l[M],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+u[M]));const b=this._cubeSize;ns(s,v*b,M>2?b:0,b,b),h.setRenderTarget(s),p&&h.render(g,c),h.render(t,c)}h.toneMapping=f,h.autoClear=d,t.background=y}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===vs||t.mapping===ys;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Zl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Kl());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=t;const c=this._cubeSize;ns(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(a,Us)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const c=a.uniforms,l=n/(this._lodMeshes.length-1),u=e/(this._lodMeshes.length-1),h=Math.sqrt(l*l-u*u),d=.05+l*.95,f=h*d,{_lodMax:x}=this,g=this._sizeLods[n],m=3*g*(n>x-fi?n-x+fi:0),p=4*(this._cubeSize-g);c.envMap.value=t.texture,c.roughness.value=f,c.mipInt.value=x-e,ns(r,m,p,3*g,2*g),s.setRenderTarget(r),s.render(o,Us),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=x-n,ns(t,m,p,3*g,2*g),s.setRenderTarget(t),s.render(o,Us)}_blur(t,e,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&ge("blur direction must be either latitudinal or longitudinal!");const u=3,h=this._lodMeshes[s];h.material=l;const d=l.uniforms,f=this._sizeLods[n]-1,x=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Di-1),g=r/x,m=isFinite(r)?1+Math.floor(u*g):Di;m>Di&&Ut(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Di}`);const p=[];let y=0;for(let A=0;A<Di;++A){const C=A/g,S=Math.exp(-C*C/2);p.push(S),A===0?y+=S:A<m&&(y+=2*S)}for(let A=0;A<p.length;A++)p[A]=p[A]/y;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:M}=this;d.dTheta.value=x,d.mipInt.value=M-n;const v=this._sizeLods[s],b=3*v*(s>M-fi?s-M+fi:0),w=4*(this._cubeSize-v);ns(e,b,w,3*v,2*v),c.setRenderTarget(e),c.render(h,Us)}}function Km(i){const t=[],e=[],n=[];let s=i;const r=i-fi+1+ql.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let c=1/o;a>i-fi?c=ql[a-i+fi-1]:a===0&&(c=0),e.push(c);const l=1/(o-2),u=-l,h=1+l,d=[u,u,h,u,h,h,u,u,h,h,u,h],f=6,x=6,g=3,m=2,p=1,y=new Float32Array(g*x*f),M=new Float32Array(m*x*f),v=new Float32Array(p*x*f);for(let w=0;w<f;w++){const A=w%3*2/3-1,C=w>2?0:-1,S=[A,C,0,A+2/3,C,0,A+2/3,C+1,0,A,C,0,A+2/3,C+1,0,A,C+1,0];y.set(S,g*x*w),M.set(d,m*x*w);const _=[w,w,w,w,w,w];v.set(_,p*x*w)}const b=new Ue;b.setAttribute("position",new tn(y,g)),b.setAttribute("uv",new tn(M,m)),b.setAttribute("faceIndex",new tn(v,p)),n.push(new ee(b,null)),s>fi&&s--}return{lodMeshes:n,sizeLods:t,sigmas:e}}function $l(i,t,e){const n=new Ui(i,t,e);return n.texture.mapping=fa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ns(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Zm(i,t,e){return new jn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Ym,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:xa(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 3.2: Transform view direction to hemisphere configuration
				vec3 Vh = normalize(vec3(alpha * V.x, alpha * V.y, V.z));

				// Section 4.1: Orthonormal basis
				float lensq = Vh.x * Vh.x + Vh.y * Vh.y;
				vec3 T1 = lensq > 0.0 ? vec3(-Vh.y, Vh.x, 0.0) / sqrt(lensq) : vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(Vh, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + Vh.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * Vh;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:$n,depthTest:!1,depthWrite:!1})}function jm(i,t,e){const n=new Float32Array(Di),s=new E(0,1,0);return new jn({name:"SphericalGaussianBlur",defines:{n:Di,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:xa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:$n,depthTest:!1,depthWrite:!1})}function Kl(){return new jn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:xa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:$n,depthTest:!1,depthWrite:!1})}function Zl(){return new jn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:xa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:$n,depthTest:!1,depthWrite:!1})}function xa(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Jm(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===ia||c===Uo,u=c===vs||c===ys;if(l||u){let h=t.get(o);const d=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return e===null&&(e=new fc(i)),h=l?e.fromEquirectangular(o,h):e.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,t.set(o,h),h.texture;if(h!==void 0)return h.texture;{const f=o.image;return l&&f&&f.height>0||u&&f&&s(f)?(e===null&&(e=new fc(i)),h=l?e.fromEquirectangular(o):e.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,t.set(o,h),o.addEventListener("dispose",r),h.texture):null}}}return o}function s(o){let c=0;const l=6;for(let u=0;u<l;u++)o[u]!==void 0&&c++;return c===l}function r(o){const c=o.target;c.removeEventListener("dispose",r);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function Qm(i){const t={};function e(n){if(t[n]!==void 0)return t[n];const s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&js("WebGLRenderer: "+n+" extension not supported."),s}}}function tx(i,t,e,n){const s={},r=new WeakMap;function a(h){const d=h.target;d.index!==null&&t.remove(d.index);for(const x in d.attributes)t.remove(d.attributes[x]);d.removeEventListener("dispose",a),delete s[d.id];const f=r.get(d);f&&(t.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function o(h,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,e.memory.geometries++),d}function c(h){const d=h.attributes;for(const f in d)t.update(d[f],i.ARRAY_BUFFER)}function l(h){const d=[],f=h.index,x=h.attributes.position;let g=0;if(f!==null){const y=f.array;g=f.version;for(let M=0,v=y.length;M<v;M+=3){const b=y[M+0],w=y[M+1],A=y[M+2];d.push(b,w,w,A,A,b)}}else if(x!==void 0){const y=x.array;g=x.version;for(let M=0,v=y.length/3-1;M<v;M+=3){const b=M+0,w=M+1,A=M+2;d.push(b,w,w,A,A,b)}}else return;const m=new(hh(d)?mh:ph)(d,1);m.version=g;const p=r.get(h);p&&t.remove(p),r.set(h,m)}function u(h){const d=r.get(h);if(d){const f=h.index;f!==null&&d.version<f.version&&l(h)}else l(h);return r.get(h)}return{get:o,update:c,getWireframeAttribute:u}}function ex(i,t,e){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function c(d,f){i.drawElements(n,f,r,d*a),e.update(f,n,1)}function l(d,f,x){x!==0&&(i.drawElementsInstanced(n,f,r,d*a,x),e.update(f,n,x))}function u(d,f,x){if(x===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,x);let m=0;for(let p=0;p<x;p++)m+=f[p];e.update(m,n,1)}function h(d,f,x,g){if(x===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)l(d[p]/a,f[p],g[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,g,0,x);let p=0;for(let y=0;y<x;y++)p+=f[y]*g[y];e.update(p,n,1)}}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function nx(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:ge("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function ix(i,t,e){const n=new WeakMap,s=new Me;function r(a,o,c){const l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0;let d=n.get(o);if(d===void 0||d.count!==h){let _=function(){C.dispose(),n.delete(o),o.removeEventListener("dispose",_)};var f=_;d!==void 0&&d.texture.dispose();const x=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],y=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let v=0;x===!0&&(v=1),g===!0&&(v=2),m===!0&&(v=3);let b=o.attributes.position.count*v,w=1;b>t.maxTextureSize&&(w=Math.ceil(b/t.maxTextureSize),b=t.maxTextureSize);const A=new Float32Array(b*w*4*h),C=new dh(A,b,w,h);C.type=pn,C.needsUpdate=!0;const S=v*4;for(let P=0;P<h;P++){const D=p[P],I=y[P],U=M[P],B=b*w*4*P;for(let V=0;V<D.count;V++){const $=V*S;x===!0&&(s.fromBufferAttribute(D,V),A[B+$+0]=s.x,A[B+$+1]=s.y,A[B+$+2]=s.z,A[B+$+3]=0),g===!0&&(s.fromBufferAttribute(I,V),A[B+$+4]=s.x,A[B+$+5]=s.y,A[B+$+6]=s.z,A[B+$+7]=0),m===!0&&(s.fromBufferAttribute(U,V),A[B+$+8]=s.x,A[B+$+9]=s.y,A[B+$+10]=s.z,A[B+$+11]=U.itemSize===4?s.w:1)}}d={count:h,texture:C,size:new Rt(b,w)},n.set(o,d),o.addEventListener("dispose",_)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let x=0;for(let m=0;m<l.length;m++)x+=l[m];const g=o.morphTargetsRelative?1:1-x;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function sx(i,t,e,n){let s=new WeakMap;function r(c){const l=n.render.frame,u=c.geometry,h=t.get(c,u);if(s.get(h)!==l&&(t.update(h),s.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;s.get(d)!==l&&(d.update(),s.set(d,l))}return h}function a(){s=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:a}}const Ph=new Ve,jl=new wh(1,1),Dh=new dh,Lh=new pf,Ih=new _h,Jl=[],Ql=[],tu=new Float32Array(16),eu=new Float32Array(9),nu=new Float32Array(4);function ws(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Jl[s];if(r===void 0&&(r=new Float32Array(s),Jl[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function Re(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Ce(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function ga(i,t){let e=Ql[t];e===void 0&&(e=new Int32Array(t),Ql[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function rx(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function ax(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Re(e,t))return;i.uniform2fv(this.addr,t),Ce(e,t)}}function ox(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Re(e,t))return;i.uniform3fv(this.addr,t),Ce(e,t)}}function cx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Re(e,t))return;i.uniform4fv(this.addr,t),Ce(e,t)}}function lx(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Re(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Ce(e,t)}else{if(Re(e,n))return;nu.set(n),i.uniformMatrix2fv(this.addr,!1,nu),Ce(e,n)}}function ux(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Re(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Ce(e,t)}else{if(Re(e,n))return;eu.set(n),i.uniformMatrix3fv(this.addr,!1,eu),Ce(e,n)}}function hx(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Re(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Ce(e,t)}else{if(Re(e,n))return;tu.set(n),i.uniformMatrix4fv(this.addr,!1,tu),Ce(e,n)}}function dx(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function fx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Re(e,t))return;i.uniform2iv(this.addr,t),Ce(e,t)}}function px(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Re(e,t))return;i.uniform3iv(this.addr,t),Ce(e,t)}}function mx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Re(e,t))return;i.uniform4iv(this.addr,t),Ce(e,t)}}function xx(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function gx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Re(e,t))return;i.uniform2uiv(this.addr,t),Ce(e,t)}}function _x(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Re(e,t))return;i.uniform3uiv(this.addr,t),Ce(e,t)}}function vx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Re(e,t))return;i.uniform4uiv(this.addr,t),Ce(e,t)}}function yx(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(jl.compareFunction=uh,r=jl):r=Ph,e.setTexture2D(t||r,s)}function Mx(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Lh,s)}function Sx(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Ih,s)}function bx(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Dh,s)}function wx(i){switch(i){case 5126:return rx;case 35664:return ax;case 35665:return ox;case 35666:return cx;case 35674:return lx;case 35675:return ux;case 35676:return hx;case 5124:case 35670:return dx;case 35667:case 35671:return fx;case 35668:case 35672:return px;case 35669:case 35673:return mx;case 5125:return xx;case 36294:return gx;case 36295:return _x;case 36296:return vx;case 35678:case 36198:case 36298:case 36306:case 35682:return yx;case 35679:case 36299:case 36307:return Mx;case 35680:case 36300:case 36308:case 36293:return Sx;case 36289:case 36303:case 36311:case 36292:return bx}}function Ex(i,t){i.uniform1fv(this.addr,t)}function Tx(i,t){const e=ws(t,this.size,2);i.uniform2fv(this.addr,e)}function Ax(i,t){const e=ws(t,this.size,3);i.uniform3fv(this.addr,e)}function Rx(i,t){const e=ws(t,this.size,4);i.uniform4fv(this.addr,e)}function Cx(i,t){const e=ws(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Px(i,t){const e=ws(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Dx(i,t){const e=ws(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Lx(i,t){i.uniform1iv(this.addr,t)}function Ix(i,t){i.uniform2iv(this.addr,t)}function Ux(i,t){i.uniform3iv(this.addr,t)}function Nx(i,t){i.uniform4iv(this.addr,t)}function Fx(i,t){i.uniform1uiv(this.addr,t)}function Ox(i,t){i.uniform2uiv(this.addr,t)}function Bx(i,t){i.uniform3uiv(this.addr,t)}function zx(i,t){i.uniform4uiv(this.addr,t)}function Vx(i,t,e){const n=this.cache,s=t.length,r=ga(e,s);Re(n,r)||(i.uniform1iv(this.addr,r),Ce(n,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||Ph,r[a])}function kx(i,t,e){const n=this.cache,s=t.length,r=ga(e,s);Re(n,r)||(i.uniform1iv(this.addr,r),Ce(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Lh,r[a])}function Hx(i,t,e){const n=this.cache,s=t.length,r=ga(e,s);Re(n,r)||(i.uniform1iv(this.addr,r),Ce(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||Ih,r[a])}function Gx(i,t,e){const n=this.cache,s=t.length,r=ga(e,s);Re(n,r)||(i.uniform1iv(this.addr,r),Ce(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Dh,r[a])}function Wx(i){switch(i){case 5126:return Ex;case 35664:return Tx;case 35665:return Ax;case 35666:return Rx;case 35674:return Cx;case 35675:return Px;case 35676:return Dx;case 5124:case 35670:return Lx;case 35667:case 35671:return Ix;case 35668:case 35672:return Ux;case 35669:case 35673:return Nx;case 5125:return Fx;case 36294:return Ox;case 36295:return Bx;case 36296:return zx;case 35678:case 36198:case 36298:case 36306:case 35682:return Vx;case 35679:case 36299:case 36307:return kx;case 35680:case 36300:case 36308:case 36293:return Hx;case 36289:case 36303:case 36311:case 36292:return Gx}}class Xx{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=wx(e.type)}}class qx{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Wx(e.type)}}class Yx{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],n)}}}const no=/(\w+)(\])?(\[|\.)?/g;function iu(i,t){i.seq.push(t),i.map[t.id]=t}function $x(i,t,e){const n=i.name,s=n.length;for(no.lastIndex=0;;){const r=no.exec(n),a=no.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){iu(e,l===void 0?new Xx(o,i,t):new qx(o,i,t));break}else{let h=e.map[o];h===void 0&&(h=new Yx(o),iu(e,h)),e=h}}}class ta{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);$x(r,a,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&n.push(a)}return n}}function su(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const Kx=37297;let Zx=0;function jx(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const ru=new Vt;function Jx(i){jt._getMatrix(ru,jt.workingColorSpace,i);const t=`mat3( ${ru.elements.map(e=>e.toFixed(4))} )`;switch(jt.getTransfer(i)){case sa:return[t,"LinearTransferOETF"];case re:return[t,"sRGBTransferOETF"];default:return Ut("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function au(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+jx(i.getShaderSource(t),o)}else return r}function Qx(i,t){const e=Jx(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function tg(i,t){let e;switch(t){case Ad:e="Linear";break;case Rd:e="Reinhard";break;case Cd:e="Cineon";break;case th:e="ACESFilmic";break;case Dd:e="AgX";break;case Ld:e="Neutral";break;case Pd:e="Custom";break;default:Ut("WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Lr=new E;function eg(){jt.getLuminanceCoefficients(Lr);const i=Lr.x.toFixed(4),t=Lr.y.toFixed(4),e=Lr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function ng(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Gs).join(`
`)}function ig(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function sg(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function Gs(i){return i!==""}function ou(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function cu(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const rg=/^[ \t]*#include +<([\w\d./]+)>/gm;function pc(i){return i.replace(rg,og)}const ag=new Map;function og(i,t){let e=Ht[t];if(e===void 0){const n=ag.get(t);if(n!==void 0)e=Ht[n],Ut('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return pc(e)}const cg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function lu(i){return i.replace(cg,lg)}function lg(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function uu(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function ug(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===ju?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Ju?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Hn&&(t="SHADOWMAP_TYPE_VSM"),t}function hg(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case vs:case ys:t="ENVMAP_TYPE_CUBE";break;case fa:t="ENVMAP_TYPE_CUBE_UV";break}return t}function dg(i){let t="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===ys&&(t="ENVMAP_MODE_REFRACTION"),t}function fg(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Qu:t="ENVMAP_BLENDING_MULTIPLY";break;case Ed:t="ENVMAP_BLENDING_MIX";break;case Td:t="ENVMAP_BLENDING_ADD";break}return t}function pg(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function mg(i,t,e,n){const s=i.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const c=ug(e),l=hg(e),u=dg(e),h=fg(e),d=pg(e),f=ng(e),x=ig(r),g=s.createProgram();let m,p,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(Gs).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(Gs).join(`
`),p.length>0&&(p+=`
`)):(m=[uu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Gs).join(`
`),p=[uu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+u:"",e.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==mi?"#define TONE_MAPPING":"",e.toneMapping!==mi?Ht.tonemapping_pars_fragment:"",e.toneMapping!==mi?tg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ht.colorspace_pars_fragment,Qx("linearToOutputTexel",e.outputColorSpace),eg(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Gs).join(`
`)),a=pc(a),a=ou(a,e),a=cu(a,e),o=pc(o),o=ou(o,e),o=cu(o,e),a=lu(a),o=lu(o),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===pl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===pl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const M=y+m+a,v=y+p+o,b=su(s,s.VERTEX_SHADER,M),w=su(s,s.FRAGMENT_SHADER,v);s.attachShader(g,b),s.attachShader(g,w),e.index0AttributeName!==void 0?s.bindAttribLocation(g,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(g,0,"position"),s.linkProgram(g);function A(P){if(i.debug.checkShaderErrors){const D=s.getProgramInfoLog(g)||"",I=s.getShaderInfoLog(b)||"",U=s.getShaderInfoLog(w)||"",B=D.trim(),V=I.trim(),$=U.trim();let X=!0,et=!0;if(s.getProgramParameter(g,s.LINK_STATUS)===!1)if(X=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,g,b,w);else{const Y=au(s,b,"vertex"),ft=au(s,w,"fragment");ge("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(g,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+B+`
`+Y+`
`+ft)}else B!==""?Ut("WebGLProgram: Program Info Log:",B):(V===""||$==="")&&(et=!1);et&&(P.diagnostics={runnable:X,programLog:B,vertexShader:{log:V,prefix:m},fragmentShader:{log:$,prefix:p}})}s.deleteShader(b),s.deleteShader(w),C=new ta(s,g),S=sg(s,g)}let C;this.getUniforms=function(){return C===void 0&&A(this),C};let S;this.getAttributes=function(){return S===void 0&&A(this),S};let _=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return _===!1&&(_=s.getProgramParameter(g,Kx)),_},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(g),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Zx++,this.cacheKey=t,this.usedTimes=1,this.program=g,this.vertexShader=b,this.fragmentShader=w,this}let xg=0;class gg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new _g(t),e.set(t,n)),n}}class _g{constructor(t){this.id=xg++,this.code=t,this.usedTimes=0}}function vg(i,t,e,n,s,r,a){const o=new zc,c=new gg,l=new Set,u=[],h=s.logarithmicDepthBuffer,d=s.vertexTextures;let f=s.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(S){return l.add(S),S===0?"uv":`uv${S}`}function m(S,_,P,D,I){const U=D.fog,B=I.geometry,V=S.isMeshStandardMaterial?D.environment:null,$=(S.isMeshStandardMaterial?e:t).get(S.envMap||V),X=$&&$.mapping===fa?$.image.height:null,et=x[S.type];S.precision!==null&&(f=s.getMaxPrecision(S.precision),f!==S.precision&&Ut("WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));const Y=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,ft=Y!==void 0?Y.length:0;let Mt=0;B.morphAttributes.position!==void 0&&(Mt=1),B.morphAttributes.normal!==void 0&&(Mt=2),B.morphAttributes.color!==void 0&&(Mt=3);let Ct,Wt,$t,K;if(et){const ie=An[et];Ct=ie.vertexShader,Wt=ie.fragmentShader}else Ct=S.vertexShader,Wt=S.fragmentShader,c.update(S),$t=c.getVertexShaderID(S),K=c.getFragmentShaderID(S);const J=i.getRenderTarget(),ht=i.state.buffers.depth.getReversed(),wt=I.isInstancedMesh===!0,xt=I.isBatchedMesh===!0,Ft=!!S.map,le=!!S.matcap,Xt=!!$,ue=!!S.aoMap,N=!!S.lightMap,qt=!!S.bumpMap,kt=!!S.normalMap,te=!!S.displacementMap,mt=!!S.emissiveMap,oe=!!S.metalnessMap,yt=!!S.roughnessMap,Bt=S.anisotropy>0,L=S.clearcoat>0,T=S.dispersion>0,H=S.iridescence>0,Z=S.sheen>0,Q=S.transmission>0,q=Bt&&!!S.anisotropyMap,St=L&&!!S.clearcoatMap,ct=L&&!!S.clearcoatNormalMap,Et=L&&!!S.clearcoatRoughnessMap,vt=H&&!!S.iridescenceMap,tt=H&&!!S.iridescenceThicknessMap,st=Z&&!!S.sheenColorMap,Dt=Z&&!!S.sheenRoughnessMap,At=!!S.specularMap,dt=!!S.specularColorMap,Nt=!!S.specularIntensityMap,F=Q&&!!S.transmissionMap,lt=Q&&!!S.thicknessMap,rt=!!S.gradientMap,at=!!S.alphaMap,nt=S.alphaTest>0,j=!!S.alphaHash,gt=!!S.extensions;let Ot=mi;S.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(Ot=i.toneMapping);const de={shaderID:et,shaderType:S.type,shaderName:S.name,vertexShader:Ct,fragmentShader:Wt,defines:S.defines,customVertexShaderID:$t,customFragmentShaderID:K,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:xt,batchingColor:xt&&I._colorsTexture!==null,instancing:wt,instancingColor:wt&&I.instanceColor!==null,instancingMorph:wt&&I.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:J===null?i.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:Ii,alphaToCoverage:!!S.alphaToCoverage,map:Ft,matcap:le,envMap:Xt,envMapMode:Xt&&$.mapping,envMapCubeUVHeight:X,aoMap:ue,lightMap:N,bumpMap:qt,normalMap:kt,displacementMap:d&&te,emissiveMap:mt,normalMapObjectSpace:kt&&S.normalMapType===Fd,normalMapTangentSpace:kt&&S.normalMapType===lh,metalnessMap:oe,roughnessMap:yt,anisotropy:Bt,anisotropyMap:q,clearcoat:L,clearcoatMap:St,clearcoatNormalMap:ct,clearcoatRoughnessMap:Et,dispersion:T,iridescence:H,iridescenceMap:vt,iridescenceThicknessMap:tt,sheen:Z,sheenColorMap:st,sheenRoughnessMap:Dt,specularMap:At,specularColorMap:dt,specularIntensityMap:Nt,transmission:Q,transmissionMap:F,thicknessMap:lt,gradientMap:rt,opaque:S.transparent===!1&&S.blending===xs&&S.alphaToCoverage===!1,alphaMap:at,alphaTest:nt,alphaHash:j,combine:S.combine,mapUv:Ft&&g(S.map.channel),aoMapUv:ue&&g(S.aoMap.channel),lightMapUv:N&&g(S.lightMap.channel),bumpMapUv:qt&&g(S.bumpMap.channel),normalMapUv:kt&&g(S.normalMap.channel),displacementMapUv:te&&g(S.displacementMap.channel),emissiveMapUv:mt&&g(S.emissiveMap.channel),metalnessMapUv:oe&&g(S.metalnessMap.channel),roughnessMapUv:yt&&g(S.roughnessMap.channel),anisotropyMapUv:q&&g(S.anisotropyMap.channel),clearcoatMapUv:St&&g(S.clearcoatMap.channel),clearcoatNormalMapUv:ct&&g(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Et&&g(S.clearcoatRoughnessMap.channel),iridescenceMapUv:vt&&g(S.iridescenceMap.channel),iridescenceThicknessMapUv:tt&&g(S.iridescenceThicknessMap.channel),sheenColorMapUv:st&&g(S.sheenColorMap.channel),sheenRoughnessMapUv:Dt&&g(S.sheenRoughnessMap.channel),specularMapUv:At&&g(S.specularMap.channel),specularColorMapUv:dt&&g(S.specularColorMap.channel),specularIntensityMapUv:Nt&&g(S.specularIntensityMap.channel),transmissionMapUv:F&&g(S.transmissionMap.channel),thicknessMapUv:lt&&g(S.thicknessMap.channel),alphaMapUv:at&&g(S.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(kt||Bt),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!B.attributes.uv&&(Ft||at),fog:!!U,useFog:S.fog===!0,fogExp2:!!U&&U.isFogExp2,flatShading:S.flatShading===!0&&S.wireframe===!1,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:ht,skinning:I.isSkinnedMesh===!0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:ft,morphTextureStride:Mt,numDirLights:_.directional.length,numPointLights:_.point.length,numSpotLights:_.spot.length,numSpotLightMaps:_.spotLightMap.length,numRectAreaLights:_.rectArea.length,numHemiLights:_.hemi.length,numDirLightShadows:_.directionalShadowMap.length,numPointLightShadows:_.pointShadowMap.length,numSpotLightShadows:_.spotShadowMap.length,numSpotLightShadowsWithMaps:_.numSpotLightShadowsWithMaps,numLightProbes:_.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ot,decodeVideoTexture:Ft&&S.map.isVideoTexture===!0&&jt.getTransfer(S.map.colorSpace)===re,decodeVideoTextureEmissive:mt&&S.emissiveMap.isVideoTexture===!0&&jt.getTransfer(S.emissiveMap.colorSpace)===re,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===fn,flipSided:S.side===Ye,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:gt&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(gt&&S.extensions.multiDraw===!0||xt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return de.vertexUv1s=l.has(1),de.vertexUv2s=l.has(2),de.vertexUv3s=l.has(3),l.clear(),de}function p(S){const _=[];if(S.shaderID?_.push(S.shaderID):(_.push(S.customVertexShaderID),_.push(S.customFragmentShaderID)),S.defines!==void 0)for(const P in S.defines)_.push(P),_.push(S.defines[P]);return S.isRawShaderMaterial===!1&&(y(_,S),M(_,S),_.push(i.outputColorSpace)),_.push(S.customProgramCacheKey),_.join()}function y(S,_){S.push(_.precision),S.push(_.outputColorSpace),S.push(_.envMapMode),S.push(_.envMapCubeUVHeight),S.push(_.mapUv),S.push(_.alphaMapUv),S.push(_.lightMapUv),S.push(_.aoMapUv),S.push(_.bumpMapUv),S.push(_.normalMapUv),S.push(_.displacementMapUv),S.push(_.emissiveMapUv),S.push(_.metalnessMapUv),S.push(_.roughnessMapUv),S.push(_.anisotropyMapUv),S.push(_.clearcoatMapUv),S.push(_.clearcoatNormalMapUv),S.push(_.clearcoatRoughnessMapUv),S.push(_.iridescenceMapUv),S.push(_.iridescenceThicknessMapUv),S.push(_.sheenColorMapUv),S.push(_.sheenRoughnessMapUv),S.push(_.specularMapUv),S.push(_.specularColorMapUv),S.push(_.specularIntensityMapUv),S.push(_.transmissionMapUv),S.push(_.thicknessMapUv),S.push(_.combine),S.push(_.fogExp2),S.push(_.sizeAttenuation),S.push(_.morphTargetsCount),S.push(_.morphAttributeCount),S.push(_.numDirLights),S.push(_.numPointLights),S.push(_.numSpotLights),S.push(_.numSpotLightMaps),S.push(_.numHemiLights),S.push(_.numRectAreaLights),S.push(_.numDirLightShadows),S.push(_.numPointLightShadows),S.push(_.numSpotLightShadows),S.push(_.numSpotLightShadowsWithMaps),S.push(_.numLightProbes),S.push(_.shadowMapType),S.push(_.toneMapping),S.push(_.numClippingPlanes),S.push(_.numClipIntersection),S.push(_.depthPacking)}function M(S,_){o.disableAll(),_.supportsVertexTextures&&o.enable(0),_.instancing&&o.enable(1),_.instancingColor&&o.enable(2),_.instancingMorph&&o.enable(3),_.matcap&&o.enable(4),_.envMap&&o.enable(5),_.normalMapObjectSpace&&o.enable(6),_.normalMapTangentSpace&&o.enable(7),_.clearcoat&&o.enable(8),_.iridescence&&o.enable(9),_.alphaTest&&o.enable(10),_.vertexColors&&o.enable(11),_.vertexAlphas&&o.enable(12),_.vertexUv1s&&o.enable(13),_.vertexUv2s&&o.enable(14),_.vertexUv3s&&o.enable(15),_.vertexTangents&&o.enable(16),_.anisotropy&&o.enable(17),_.alphaHash&&o.enable(18),_.batching&&o.enable(19),_.dispersion&&o.enable(20),_.batchingColor&&o.enable(21),_.gradientMap&&o.enable(22),S.push(o.mask),o.disableAll(),_.fog&&o.enable(0),_.useFog&&o.enable(1),_.flatShading&&o.enable(2),_.logarithmicDepthBuffer&&o.enable(3),_.reversedDepthBuffer&&o.enable(4),_.skinning&&o.enable(5),_.morphTargets&&o.enable(6),_.morphNormals&&o.enable(7),_.morphColors&&o.enable(8),_.premultipliedAlpha&&o.enable(9),_.shadowMapEnabled&&o.enable(10),_.doubleSided&&o.enable(11),_.flipSided&&o.enable(12),_.useDepthPacking&&o.enable(13),_.dithering&&o.enable(14),_.transmission&&o.enable(15),_.sheen&&o.enable(16),_.opaque&&o.enable(17),_.pointsUvs&&o.enable(18),_.decodeVideoTexture&&o.enable(19),_.decodeVideoTextureEmissive&&o.enable(20),_.alphaToCoverage&&o.enable(21),S.push(o.mask)}function v(S){const _=x[S.type];let P;if(_){const D=An[_];P=Pf.clone(D.uniforms)}else P=S.uniforms;return P}function b(S,_){let P;for(let D=0,I=u.length;D<I;D++){const U=u[D];if(U.cacheKey===_){P=U,++P.usedTimes;break}}return P===void 0&&(P=new mg(i,_,S,r),u.push(P)),P}function w(S){if(--S.usedTimes===0){const _=u.indexOf(S);u[_]=u[u.length-1],u.pop(),S.destroy()}}function A(S){c.remove(S)}function C(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:v,acquireProgram:b,releaseProgram:w,releaseShaderCache:A,programs:u,dispose:C}}function yg(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Mg(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function hu(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function du(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(h,d,f,x,g,m){let p=i[t];return p===void 0?(p={id:h.id,object:h,geometry:d,material:f,groupOrder:x,renderOrder:h.renderOrder,z:g,group:m},i[t]=p):(p.id=h.id,p.object=h,p.geometry=d,p.material=f,p.groupOrder=x,p.renderOrder=h.renderOrder,p.z=g,p.group=m),t++,p}function o(h,d,f,x,g,m){const p=a(h,d,f,x,g,m);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):e.push(p)}function c(h,d,f,x,g,m){const p=a(h,d,f,x,g,m);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):e.unshift(p)}function l(h,d){e.length>1&&e.sort(h||Mg),n.length>1&&n.sort(d||hu),s.length>1&&s.sort(d||hu)}function u(){for(let h=t,d=i.length;h<d;h++){const f=i[h];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:o,unshift:c,finish:u,sort:l}}function Sg(){let i=new WeakMap;function t(n,s){const r=i.get(n);let a;return r===void 0?(a=new du,i.set(n,[a])):s>=r.length?(a=new du,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function bg(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new E,color:new Yt};break;case"SpotLight":e={position:new E,direction:new E,color:new Yt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new E,color:new Yt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new E,skyColor:new Yt,groundColor:new Yt};break;case"RectAreaLight":e={color:new Yt,position:new E,halfWidth:new E,halfHeight:new E};break}return i[t.id]=e,e}}}function wg(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Rt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Rt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Rt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let Eg=0;function Tg(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Ag(i){const t=new bg,e=wg(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new E);const s=new E,r=new Qt,a=new Qt;function o(l){let u=0,h=0,d=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let f=0,x=0,g=0,m=0,p=0,y=0,M=0,v=0,b=0,w=0,A=0;l.sort(Tg);for(let S=0,_=l.length;S<_;S++){const P=l[S],D=P.color,I=P.intensity,U=P.distance,B=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)u+=D.r*I,h+=D.g*I,d+=D.b*I;else if(P.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(P.sh.coefficients[V],I);A++}else if(P.isDirectionalLight){const V=t.get(P);if(V.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const $=P.shadow,X=e.get(P);X.shadowIntensity=$.intensity,X.shadowBias=$.bias,X.shadowNormalBias=$.normalBias,X.shadowRadius=$.radius,X.shadowMapSize=$.mapSize,n.directionalShadow[f]=X,n.directionalShadowMap[f]=B,n.directionalShadowMatrix[f]=P.shadow.matrix,y++}n.directional[f]=V,f++}else if(P.isSpotLight){const V=t.get(P);V.position.setFromMatrixPosition(P.matrixWorld),V.color.copy(D).multiplyScalar(I),V.distance=U,V.coneCos=Math.cos(P.angle),V.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),V.decay=P.decay,n.spot[g]=V;const $=P.shadow;if(P.map&&(n.spotLightMap[b]=P.map,b++,$.updateMatrices(P),P.castShadow&&w++),n.spotLightMatrix[g]=$.matrix,P.castShadow){const X=e.get(P);X.shadowIntensity=$.intensity,X.shadowBias=$.bias,X.shadowNormalBias=$.normalBias,X.shadowRadius=$.radius,X.shadowMapSize=$.mapSize,n.spotShadow[g]=X,n.spotShadowMap[g]=B,v++}g++}else if(P.isRectAreaLight){const V=t.get(P);V.color.copy(D).multiplyScalar(I),V.halfWidth.set(P.width*.5,0,0),V.halfHeight.set(0,P.height*.5,0),n.rectArea[m]=V,m++}else if(P.isPointLight){const V=t.get(P);if(V.color.copy(P.color).multiplyScalar(P.intensity),V.distance=P.distance,V.decay=P.decay,P.castShadow){const $=P.shadow,X=e.get(P);X.shadowIntensity=$.intensity,X.shadowBias=$.bias,X.shadowNormalBias=$.normalBias,X.shadowRadius=$.radius,X.shadowMapSize=$.mapSize,X.shadowCameraNear=$.camera.near,X.shadowCameraFar=$.camera.far,n.pointShadow[x]=X,n.pointShadowMap[x]=B,n.pointShadowMatrix[x]=P.shadow.matrix,M++}n.point[x]=V,x++}else if(P.isHemisphereLight){const V=t.get(P);V.skyColor.copy(P.color).multiplyScalar(I),V.groundColor.copy(P.groundColor).multiplyScalar(I),n.hemi[p]=V,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ot.LTC_FLOAT_1,n.rectAreaLTC2=ot.LTC_FLOAT_2):(n.rectAreaLTC1=ot.LTC_HALF_1,n.rectAreaLTC2=ot.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=d;const C=n.hash;(C.directionalLength!==f||C.pointLength!==x||C.spotLength!==g||C.rectAreaLength!==m||C.hemiLength!==p||C.numDirectionalShadows!==y||C.numPointShadows!==M||C.numSpotShadows!==v||C.numSpotMaps!==b||C.numLightProbes!==A)&&(n.directional.length=f,n.spot.length=g,n.rectArea.length=m,n.point.length=x,n.hemi.length=p,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=v+b-w,n.spotLightMap.length=b,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=A,C.directionalLength=f,C.pointLength=x,C.spotLength=g,C.rectAreaLength=m,C.hemiLength=p,C.numDirectionalShadows=y,C.numPointShadows=M,C.numSpotShadows=v,C.numSpotMaps=b,C.numLightProbes=A,n.version=Eg++)}function c(l,u){let h=0,d=0,f=0,x=0,g=0;const m=u.matrixWorldInverse;for(let p=0,y=l.length;p<y;p++){const M=l[p];if(M.isDirectionalLight){const v=n.directional[h];v.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),h++}else if(M.isSpotLight){const v=n.spot[f];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),f++}else if(M.isRectAreaLight){const v=n.rectArea[x];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(m),a.identity(),r.copy(M.matrixWorld),r.premultiply(m),a.extractRotation(r),v.halfWidth.set(M.width*.5,0,0),v.halfHeight.set(0,M.height*.5,0),v.halfWidth.applyMatrix4(a),v.halfHeight.applyMatrix4(a),x++}else if(M.isPointLight){const v=n.point[d];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(m),d++}else if(M.isHemisphereLight){const v=n.hemi[g];v.direction.setFromMatrixPosition(M.matrixWorld),v.direction.transformDirection(m),g++}}}return{setup:o,setupView:c,state:n}}function fu(i){const t=new Ag(i),e=[],n=[];function s(u){l.camera=u,e.length=0,n.length=0}function r(u){e.push(u)}function a(u){n.push(u)}function o(){t.setup(e)}function c(u){t.setupView(e,u)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function Rg(i){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new fu(i),t.set(s,[o])):r>=a.length?(o=new fu(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}const Cg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Pg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Dg(i,t,e){let n=new kc;const s=new Rt,r=new Rt,a=new Me,o=new Gf({depthPacking:Nd}),c=new Wf,l={},u=e.maxTextureSize,h={[Pn]:Ye,[Ye]:Pn,[fn]:fn},d=new jn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Rt},radius:{value:4}},vertexShader:Cg,fragmentShader:Pg}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const x=new Ue;x.setAttribute("position",new tn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new ee(x,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ju;let p=this.type;this.render=function(w,A,C){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;const S=i.getRenderTarget(),_=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),D=i.state;D.setBlending($n),D.buffers.depth.getReversed()===!0?D.buffers.color.setClear(0,0,0,0):D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const I=p!==Hn&&this.type===Hn,U=p===Hn&&this.type!==Hn;for(let B=0,V=w.length;B<V;B++){const $=w[B],X=$.shadow;if(X===void 0){Ut("WebGLShadowMap:",$,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;s.copy(X.mapSize);const et=X.getFrameExtents();if(s.multiply(et),r.copy(X.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/et.x),s.x=r.x*et.x,X.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/et.y),s.y=r.y*et.y,X.mapSize.y=r.y)),X.map===null||I===!0||U===!0){const ft=this.type!==Hn?{minFilter:cn,magFilter:cn}:{};X.map!==null&&X.map.dispose(),X.map=new Ui(s.x,s.y,ft),X.map.texture.name=$.name+".shadowMap",X.camera.updateProjectionMatrix()}i.setRenderTarget(X.map),i.clear();const Y=X.getViewportCount();for(let ft=0;ft<Y;ft++){const Mt=X.getViewport(ft);a.set(r.x*Mt.x,r.y*Mt.y,r.x*Mt.z,r.y*Mt.w),D.viewport(a),X.updateMatrices($,ft),n=X.getFrustum(),v(A,C,X.camera,$,this.type)}X.isPointLightShadow!==!0&&this.type===Hn&&y(X,C),X.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(S,_,P)};function y(w,A){const C=t.update(g);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Ui(s.x,s.y)),d.uniforms.shadow_pass.value=w.map.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(A,null,C,d,g,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(A,null,C,f,g,null)}function M(w,A,C,S){let _=null;const P=C.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(P!==void 0)_=P;else if(_=C.isPointLight===!0?c:o,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const D=_.uuid,I=A.uuid;let U=l[D];U===void 0&&(U={},l[D]=U);let B=U[I];B===void 0&&(B=_.clone(),U[I]=B,A.addEventListener("dispose",b)),_=B}if(_.visible=A.visible,_.wireframe=A.wireframe,S===Hn?_.side=A.shadowSide!==null?A.shadowSide:A.side:_.side=A.shadowSide!==null?A.shadowSide:h[A.side],_.alphaMap=A.alphaMap,_.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,_.map=A.map,_.clipShadows=A.clipShadows,_.clippingPlanes=A.clippingPlanes,_.clipIntersection=A.clipIntersection,_.displacementMap=A.displacementMap,_.displacementScale=A.displacementScale,_.displacementBias=A.displacementBias,_.wireframeLinewidth=A.wireframeLinewidth,_.linewidth=A.linewidth,C.isPointLight===!0&&_.isMeshDistanceMaterial===!0){const D=i.properties.get(_);D.light=C}return _}function v(w,A,C,S,_){if(w.visible===!1)return;if(w.layers.test(A.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&_===Hn)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,w.matrixWorld);const I=t.update(w),U=w.material;if(Array.isArray(U)){const B=I.groups;for(let V=0,$=B.length;V<$;V++){const X=B[V],et=U[X.materialIndex];if(et&&et.visible){const Y=M(w,et,S,_);w.onBeforeShadow(i,w,A,C,I,Y,X),i.renderBufferDirect(C,null,I,Y,w,X),w.onAfterShadow(i,w,A,C,I,Y,X)}}}else if(U.visible){const B=M(w,U,S,_);w.onBeforeShadow(i,w,A,C,I,B,null),i.renderBufferDirect(C,null,I,B,w,null),w.onAfterShadow(i,w,A,C,I,B,null)}}const D=w.children;for(let I=0,U=D.length;I<U;I++)v(D[I],A,C,S,_)}function b(w){w.target.removeEventListener("dispose",b);for(const C in l){const S=l[C],_=w.target.uuid;_ in S&&(S[_].dispose(),delete S[_])}}}const Lg={[Ao]:Ro,[Co]:Lo,[Po]:Io,[_s]:Do,[Ro]:Ao,[Lo]:Co,[Io]:Po,[Do]:_s};function Ig(i,t){function e(){let F=!1;const lt=new Me;let rt=null;const at=new Me(0,0,0,0);return{setMask:function(nt){rt!==nt&&!F&&(i.colorMask(nt,nt,nt,nt),rt=nt)},setLocked:function(nt){F=nt},setClear:function(nt,j,gt,Ot,de){de===!0&&(nt*=Ot,j*=Ot,gt*=Ot),lt.set(nt,j,gt,Ot),at.equals(lt)===!1&&(i.clearColor(nt,j,gt,Ot),at.copy(lt))},reset:function(){F=!1,rt=null,at.set(-1,0,0,0)}}}function n(){let F=!1,lt=!1,rt=null,at=null,nt=null;return{setReversed:function(j){if(lt!==j){const gt=t.get("EXT_clip_control");j?gt.clipControlEXT(gt.LOWER_LEFT_EXT,gt.ZERO_TO_ONE_EXT):gt.clipControlEXT(gt.LOWER_LEFT_EXT,gt.NEGATIVE_ONE_TO_ONE_EXT),lt=j;const Ot=nt;nt=null,this.setClear(Ot)}},getReversed:function(){return lt},setTest:function(j){j?J(i.DEPTH_TEST):ht(i.DEPTH_TEST)},setMask:function(j){rt!==j&&!F&&(i.depthMask(j),rt=j)},setFunc:function(j){if(lt&&(j=Lg[j]),at!==j){switch(j){case Ao:i.depthFunc(i.NEVER);break;case Ro:i.depthFunc(i.ALWAYS);break;case Co:i.depthFunc(i.LESS);break;case _s:i.depthFunc(i.LEQUAL);break;case Po:i.depthFunc(i.EQUAL);break;case Do:i.depthFunc(i.GEQUAL);break;case Lo:i.depthFunc(i.GREATER);break;case Io:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}at=j}},setLocked:function(j){F=j},setClear:function(j){nt!==j&&(lt&&(j=1-j),i.clearDepth(j),nt=j)},reset:function(){F=!1,rt=null,at=null,nt=null,lt=!1}}}function s(){let F=!1,lt=null,rt=null,at=null,nt=null,j=null,gt=null,Ot=null,de=null;return{setTest:function(ie){F||(ie?J(i.STENCIL_TEST):ht(i.STENCIL_TEST))},setMask:function(ie){lt!==ie&&!F&&(i.stencilMask(ie),lt=ie)},setFunc:function(ie,En,xn){(rt!==ie||at!==En||nt!==xn)&&(i.stencilFunc(ie,En,xn),rt=ie,at=En,nt=xn)},setOp:function(ie,En,xn){(j!==ie||gt!==En||Ot!==xn)&&(i.stencilOp(ie,En,xn),j=ie,gt=En,Ot=xn)},setLocked:function(ie){F=ie},setClear:function(ie){de!==ie&&(i.clearStencil(ie),de=ie)},reset:function(){F=!1,lt=null,rt=null,at=null,nt=null,j=null,gt=null,Ot=null,de=null}}}const r=new e,a=new n,o=new s,c=new WeakMap,l=new WeakMap;let u={},h={},d=new WeakMap,f=[],x=null,g=!1,m=null,p=null,y=null,M=null,v=null,b=null,w=null,A=new Yt(0,0,0),C=0,S=!1,_=null,P=null,D=null,I=null,U=null;const B=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,$=0;const X=i.getParameter(i.VERSION);X.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(X)[1]),V=$>=1):X.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),V=$>=2);let et=null,Y={};const ft=i.getParameter(i.SCISSOR_BOX),Mt=i.getParameter(i.VIEWPORT),Ct=new Me().fromArray(ft),Wt=new Me().fromArray(Mt);function $t(F,lt,rt,at){const nt=new Uint8Array(4),j=i.createTexture();i.bindTexture(F,j),i.texParameteri(F,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(F,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let gt=0;gt<rt;gt++)F===i.TEXTURE_3D||F===i.TEXTURE_2D_ARRAY?i.texImage3D(lt,0,i.RGBA,1,1,at,0,i.RGBA,i.UNSIGNED_BYTE,nt):i.texImage2D(lt+gt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,nt);return j}const K={};K[i.TEXTURE_2D]=$t(i.TEXTURE_2D,i.TEXTURE_2D,1),K[i.TEXTURE_CUBE_MAP]=$t(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),K[i.TEXTURE_2D_ARRAY]=$t(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),K[i.TEXTURE_3D]=$t(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),J(i.DEPTH_TEST),a.setFunc(_s),qt(!1),kt(ll),J(i.CULL_FACE),ue($n);function J(F){u[F]!==!0&&(i.enable(F),u[F]=!0)}function ht(F){u[F]!==!1&&(i.disable(F),u[F]=!1)}function wt(F,lt){return h[F]!==lt?(i.bindFramebuffer(F,lt),h[F]=lt,F===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=lt),F===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=lt),!0):!1}function xt(F,lt){let rt=f,at=!1;if(F){rt=d.get(lt),rt===void 0&&(rt=[],d.set(lt,rt));const nt=F.textures;if(rt.length!==nt.length||rt[0]!==i.COLOR_ATTACHMENT0){for(let j=0,gt=nt.length;j<gt;j++)rt[j]=i.COLOR_ATTACHMENT0+j;rt.length=nt.length,at=!0}}else rt[0]!==i.BACK&&(rt[0]=i.BACK,at=!0);at&&i.drawBuffers(rt)}function Ft(F){return x!==F?(i.useProgram(F),x=F,!0):!1}const le={[Pi]:i.FUNC_ADD,[cd]:i.FUNC_SUBTRACT,[ld]:i.FUNC_REVERSE_SUBTRACT};le[ud]=i.MIN,le[hd]=i.MAX;const Xt={[dd]:i.ZERO,[fd]:i.ONE,[pd]:i.SRC_COLOR,[Eo]:i.SRC_ALPHA,[yd]:i.SRC_ALPHA_SATURATE,[_d]:i.DST_COLOR,[xd]:i.DST_ALPHA,[md]:i.ONE_MINUS_SRC_COLOR,[To]:i.ONE_MINUS_SRC_ALPHA,[vd]:i.ONE_MINUS_DST_COLOR,[gd]:i.ONE_MINUS_DST_ALPHA,[Md]:i.CONSTANT_COLOR,[Sd]:i.ONE_MINUS_CONSTANT_COLOR,[bd]:i.CONSTANT_ALPHA,[wd]:i.ONE_MINUS_CONSTANT_ALPHA};function ue(F,lt,rt,at,nt,j,gt,Ot,de,ie){if(F===$n){g===!0&&(ht(i.BLEND),g=!1);return}if(g===!1&&(J(i.BLEND),g=!0),F!==od){if(F!==m||ie!==S){if((p!==Pi||v!==Pi)&&(i.blendEquation(i.FUNC_ADD),p=Pi,v=Pi),ie)switch(F){case xs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ul:i.blendFunc(i.ONE,i.ONE);break;case hl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case dl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:ge("WebGLState: Invalid blending: ",F);break}else switch(F){case xs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ul:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case hl:ge("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case dl:ge("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:ge("WebGLState: Invalid blending: ",F);break}y=null,M=null,b=null,w=null,A.set(0,0,0),C=0,m=F,S=ie}return}nt=nt||lt,j=j||rt,gt=gt||at,(lt!==p||nt!==v)&&(i.blendEquationSeparate(le[lt],le[nt]),p=lt,v=nt),(rt!==y||at!==M||j!==b||gt!==w)&&(i.blendFuncSeparate(Xt[rt],Xt[at],Xt[j],Xt[gt]),y=rt,M=at,b=j,w=gt),(Ot.equals(A)===!1||de!==C)&&(i.blendColor(Ot.r,Ot.g,Ot.b,de),A.copy(Ot),C=de),m=F,S=!1}function N(F,lt){F.side===fn?ht(i.CULL_FACE):J(i.CULL_FACE);let rt=F.side===Ye;lt&&(rt=!rt),qt(rt),F.blending===xs&&F.transparent===!1?ue($n):ue(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),a.setFunc(F.depthFunc),a.setTest(F.depthTest),a.setMask(F.depthWrite),r.setMask(F.colorWrite);const at=F.stencilWrite;o.setTest(at),at&&(o.setMask(F.stencilWriteMask),o.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),o.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),mt(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?J(i.SAMPLE_ALPHA_TO_COVERAGE):ht(i.SAMPLE_ALPHA_TO_COVERAGE)}function qt(F){_!==F&&(F?i.frontFace(i.CW):i.frontFace(i.CCW),_=F)}function kt(F){F!==rd?(J(i.CULL_FACE),F!==P&&(F===ll?i.cullFace(i.BACK):F===ad?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ht(i.CULL_FACE),P=F}function te(F){F!==D&&(V&&i.lineWidth(F),D=F)}function mt(F,lt,rt){F?(J(i.POLYGON_OFFSET_FILL),(I!==lt||U!==rt)&&(i.polygonOffset(lt,rt),I=lt,U=rt)):ht(i.POLYGON_OFFSET_FILL)}function oe(F){F?J(i.SCISSOR_TEST):ht(i.SCISSOR_TEST)}function yt(F){F===void 0&&(F=i.TEXTURE0+B-1),et!==F&&(i.activeTexture(F),et=F)}function Bt(F,lt,rt){rt===void 0&&(et===null?rt=i.TEXTURE0+B-1:rt=et);let at=Y[rt];at===void 0&&(at={type:void 0,texture:void 0},Y[rt]=at),(at.type!==F||at.texture!==lt)&&(et!==rt&&(i.activeTexture(rt),et=rt),i.bindTexture(F,lt||K[F]),at.type=F,at.texture=lt)}function L(){const F=Y[et];F!==void 0&&F.type!==void 0&&(i.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function T(){try{i.compressedTexImage2D(...arguments)}catch(F){F("WebGLState:",F)}}function H(){try{i.compressedTexImage3D(...arguments)}catch(F){F("WebGLState:",F)}}function Z(){try{i.texSubImage2D(...arguments)}catch(F){F("WebGLState:",F)}}function Q(){try{i.texSubImage3D(...arguments)}catch(F){F("WebGLState:",F)}}function q(){try{i.compressedTexSubImage2D(...arguments)}catch(F){F("WebGLState:",F)}}function St(){try{i.compressedTexSubImage3D(...arguments)}catch(F){F("WebGLState:",F)}}function ct(){try{i.texStorage2D(...arguments)}catch(F){F("WebGLState:",F)}}function Et(){try{i.texStorage3D(...arguments)}catch(F){F("WebGLState:",F)}}function vt(){try{i.texImage2D(...arguments)}catch(F){F("WebGLState:",F)}}function tt(){try{i.texImage3D(...arguments)}catch(F){F("WebGLState:",F)}}function st(F){Ct.equals(F)===!1&&(i.scissor(F.x,F.y,F.z,F.w),Ct.copy(F))}function Dt(F){Wt.equals(F)===!1&&(i.viewport(F.x,F.y,F.z,F.w),Wt.copy(F))}function At(F,lt){let rt=l.get(lt);rt===void 0&&(rt=new WeakMap,l.set(lt,rt));let at=rt.get(F);at===void 0&&(at=i.getUniformBlockIndex(lt,F.name),rt.set(F,at))}function dt(F,lt){const at=l.get(lt).get(F);c.get(lt)!==at&&(i.uniformBlockBinding(lt,at,F.__bindingPointIndex),c.set(lt,at))}function Nt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},et=null,Y={},h={},d=new WeakMap,f=[],x=null,g=!1,m=null,p=null,y=null,M=null,v=null,b=null,w=null,A=new Yt(0,0,0),C=0,S=!1,_=null,P=null,D=null,I=null,U=null,Ct.set(0,0,i.canvas.width,i.canvas.height),Wt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:J,disable:ht,bindFramebuffer:wt,drawBuffers:xt,useProgram:Ft,setBlending:ue,setMaterial:N,setFlipSided:qt,setCullFace:kt,setLineWidth:te,setPolygonOffset:mt,setScissorTest:oe,activeTexture:yt,bindTexture:Bt,unbindTexture:L,compressedTexImage2D:T,compressedTexImage3D:H,texImage2D:vt,texImage3D:tt,updateUBOMapping:At,uniformBlockBinding:dt,texStorage2D:ct,texStorage3D:Et,texSubImage2D:Z,texSubImage3D:Q,compressedTexSubImage2D:q,compressedTexSubImage3D:St,scissor:st,viewport:Dt,reset:Nt}}function Ug(i,t,e,n,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Rt,u=new WeakMap;let h;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(L,T){return f?new OffscreenCanvas(L,T):aa("canvas")}function g(L,T,H){let Z=1;const Q=Bt(L);if((Q.width>H||Q.height>H)&&(Z=H/Math.max(Q.width,Q.height)),Z<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){const q=Math.floor(Z*Q.width),St=Math.floor(Z*Q.height);h===void 0&&(h=x(q,St));const ct=T?x(q,St):h;return ct.width=q,ct.height=St,ct.getContext("2d").drawImage(L,0,0,q,St),Ut("WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+q+"x"+St+")."),ct}else return"data"in L&&Ut("WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),L;return L}function m(L){return L.generateMipmaps}function p(L){i.generateMipmap(L)}function y(L){return L.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:L.isWebGL3DRenderTarget?i.TEXTURE_3D:L.isWebGLArrayRenderTarget||L.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(L,T,H,Z,Q=!1){if(L!==null){if(i[L]!==void 0)return i[L];Ut("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let q=T;if(T===i.RED&&(H===i.FLOAT&&(q=i.R32F),H===i.HALF_FLOAT&&(q=i.R16F),H===i.UNSIGNED_BYTE&&(q=i.R8)),T===i.RED_INTEGER&&(H===i.UNSIGNED_BYTE&&(q=i.R8UI),H===i.UNSIGNED_SHORT&&(q=i.R16UI),H===i.UNSIGNED_INT&&(q=i.R32UI),H===i.BYTE&&(q=i.R8I),H===i.SHORT&&(q=i.R16I),H===i.INT&&(q=i.R32I)),T===i.RG&&(H===i.FLOAT&&(q=i.RG32F),H===i.HALF_FLOAT&&(q=i.RG16F),H===i.UNSIGNED_BYTE&&(q=i.RG8)),T===i.RG_INTEGER&&(H===i.UNSIGNED_BYTE&&(q=i.RG8UI),H===i.UNSIGNED_SHORT&&(q=i.RG16UI),H===i.UNSIGNED_INT&&(q=i.RG32UI),H===i.BYTE&&(q=i.RG8I),H===i.SHORT&&(q=i.RG16I),H===i.INT&&(q=i.RG32I)),T===i.RGB_INTEGER&&(H===i.UNSIGNED_BYTE&&(q=i.RGB8UI),H===i.UNSIGNED_SHORT&&(q=i.RGB16UI),H===i.UNSIGNED_INT&&(q=i.RGB32UI),H===i.BYTE&&(q=i.RGB8I),H===i.SHORT&&(q=i.RGB16I),H===i.INT&&(q=i.RGB32I)),T===i.RGBA_INTEGER&&(H===i.UNSIGNED_BYTE&&(q=i.RGBA8UI),H===i.UNSIGNED_SHORT&&(q=i.RGBA16UI),H===i.UNSIGNED_INT&&(q=i.RGBA32UI),H===i.BYTE&&(q=i.RGBA8I),H===i.SHORT&&(q=i.RGBA16I),H===i.INT&&(q=i.RGBA32I)),T===i.RGB&&(H===i.UNSIGNED_INT_5_9_9_9_REV&&(q=i.RGB9_E5),H===i.UNSIGNED_INT_10F_11F_11F_REV&&(q=i.R11F_G11F_B10F)),T===i.RGBA){const St=Q?sa:jt.getTransfer(Z);H===i.FLOAT&&(q=i.RGBA32F),H===i.HALF_FLOAT&&(q=i.RGBA16F),H===i.UNSIGNED_BYTE&&(q=St===re?i.SRGB8_ALPHA8:i.RGBA8),H===i.UNSIGNED_SHORT_4_4_4_4&&(q=i.RGBA4),H===i.UNSIGNED_SHORT_5_5_5_1&&(q=i.RGB5_A1)}return(q===i.R16F||q===i.R32F||q===i.RG16F||q===i.RG32F||q===i.RGBA16F||q===i.RGBA32F)&&t.get("EXT_color_buffer_float"),q}function v(L,T){let H;return L?T===null||T===Li||T===$s?H=i.DEPTH24_STENCIL8:T===pn?H=i.DEPTH32F_STENCIL8:T===Ys&&(H=i.DEPTH24_STENCIL8,Ut("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===Li||T===$s?H=i.DEPTH_COMPONENT24:T===pn?H=i.DEPTH_COMPONENT32F:T===Ys&&(H=i.DEPTH_COMPONENT16),H}function b(L,T){return m(L)===!0||L.isFramebufferTexture&&L.minFilter!==cn&&L.minFilter!==Ne?Math.log2(Math.max(T.width,T.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?T.mipmaps.length:1}function w(L){const T=L.target;T.removeEventListener("dispose",w),C(T),T.isVideoTexture&&u.delete(T)}function A(L){const T=L.target;T.removeEventListener("dispose",A),_(T)}function C(L){const T=n.get(L);if(T.__webglInit===void 0)return;const H=L.source,Z=d.get(H);if(Z){const Q=Z[T.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&S(L),Object.keys(Z).length===0&&d.delete(H)}n.remove(L)}function S(L){const T=n.get(L);i.deleteTexture(T.__webglTexture);const H=L.source,Z=d.get(H);delete Z[T.__cacheKey],a.memory.textures--}function _(L){const T=n.get(L);if(L.depthTexture&&(L.depthTexture.dispose(),n.remove(L.depthTexture)),L.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(T.__webglFramebuffer[Z]))for(let Q=0;Q<T.__webglFramebuffer[Z].length;Q++)i.deleteFramebuffer(T.__webglFramebuffer[Z][Q]);else i.deleteFramebuffer(T.__webglFramebuffer[Z]);T.__webglDepthbuffer&&i.deleteRenderbuffer(T.__webglDepthbuffer[Z])}else{if(Array.isArray(T.__webglFramebuffer))for(let Z=0;Z<T.__webglFramebuffer.length;Z++)i.deleteFramebuffer(T.__webglFramebuffer[Z]);else i.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&i.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&i.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let Z=0;Z<T.__webglColorRenderbuffer.length;Z++)T.__webglColorRenderbuffer[Z]&&i.deleteRenderbuffer(T.__webglColorRenderbuffer[Z]);T.__webglDepthRenderbuffer&&i.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const H=L.textures;for(let Z=0,Q=H.length;Z<Q;Z++){const q=n.get(H[Z]);q.__webglTexture&&(i.deleteTexture(q.__webglTexture),a.memory.textures--),n.remove(H[Z])}n.remove(L)}let P=0;function D(){P=0}function I(){const L=P;return L>=s.maxTextures&&Ut("WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+s.maxTextures),P+=1,L}function U(L){const T=[];return T.push(L.wrapS),T.push(L.wrapT),T.push(L.wrapR||0),T.push(L.magFilter),T.push(L.minFilter),T.push(L.anisotropy),T.push(L.internalFormat),T.push(L.format),T.push(L.type),T.push(L.generateMipmaps),T.push(L.premultiplyAlpha),T.push(L.flipY),T.push(L.unpackAlignment),T.push(L.colorSpace),T.join()}function B(L,T){const H=n.get(L);if(L.isVideoTexture&&oe(L),L.isRenderTargetTexture===!1&&L.isExternalTexture!==!0&&L.version>0&&H.__version!==L.version){const Z=L.image;if(Z===null)Ut("WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)Ut("WebGLRenderer: Texture marked for update but image is incomplete");else{K(H,L,T);return}}else L.isExternalTexture&&(H.__webglTexture=L.sourceTexture?L.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,H.__webglTexture,i.TEXTURE0+T)}function V(L,T){const H=n.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&H.__version!==L.version){K(H,L,T);return}else L.isExternalTexture&&(H.__webglTexture=L.sourceTexture?L.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,H.__webglTexture,i.TEXTURE0+T)}function $(L,T){const H=n.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&H.__version!==L.version){K(H,L,T);return}e.bindTexture(i.TEXTURE_3D,H.__webglTexture,i.TEXTURE0+T)}function X(L,T){const H=n.get(L);if(L.version>0&&H.__version!==L.version){J(H,L,T);return}e.bindTexture(i.TEXTURE_CUBE_MAP,H.__webglTexture,i.TEXTURE0+T)}const et={[No]:i.REPEAT,[Sn]:i.CLAMP_TO_EDGE,[Fo]:i.MIRRORED_REPEAT},Y={[cn]:i.NEAREST,[Id]:i.NEAREST_MIPMAP_NEAREST,[ar]:i.NEAREST_MIPMAP_LINEAR,[Ne]:i.LINEAR,[Ea]:i.LINEAR_MIPMAP_NEAREST,[di]:i.LINEAR_MIPMAP_LINEAR},ft={[Od]:i.NEVER,[Gd]:i.ALWAYS,[Bd]:i.LESS,[uh]:i.LEQUAL,[zd]:i.EQUAL,[Hd]:i.GEQUAL,[Vd]:i.GREATER,[kd]:i.NOTEQUAL};function Mt(L,T){if(T.type===pn&&t.has("OES_texture_float_linear")===!1&&(T.magFilter===Ne||T.magFilter===Ea||T.magFilter===ar||T.magFilter===di||T.minFilter===Ne||T.minFilter===Ea||T.minFilter===ar||T.minFilter===di)&&Ut("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(L,i.TEXTURE_WRAP_S,et[T.wrapS]),i.texParameteri(L,i.TEXTURE_WRAP_T,et[T.wrapT]),(L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY)&&i.texParameteri(L,i.TEXTURE_WRAP_R,et[T.wrapR]),i.texParameteri(L,i.TEXTURE_MAG_FILTER,Y[T.magFilter]),i.texParameteri(L,i.TEXTURE_MIN_FILTER,Y[T.minFilter]),T.compareFunction&&(i.texParameteri(L,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(L,i.TEXTURE_COMPARE_FUNC,ft[T.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===cn||T.minFilter!==ar&&T.minFilter!==di||T.type===pn&&t.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||n.get(T).__currentAnisotropy){const H=t.get("EXT_texture_filter_anisotropic");i.texParameterf(L,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,s.getMaxAnisotropy())),n.get(T).__currentAnisotropy=T.anisotropy}}}function Ct(L,T){let H=!1;L.__webglInit===void 0&&(L.__webglInit=!0,T.addEventListener("dispose",w));const Z=T.source;let Q=d.get(Z);Q===void 0&&(Q={},d.set(Z,Q));const q=U(T);if(q!==L.__cacheKey){Q[q]===void 0&&(Q[q]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,H=!0),Q[q].usedTimes++;const St=Q[L.__cacheKey];St!==void 0&&(Q[L.__cacheKey].usedTimes--,St.usedTimes===0&&S(T)),L.__cacheKey=q,L.__webglTexture=Q[q].texture}return H}function Wt(L,T,H){return Math.floor(Math.floor(L/H)/T)}function $t(L,T,H,Z){const q=L.updateRanges;if(q.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,T.width,T.height,H,Z,T.data);else{q.sort((tt,st)=>tt.start-st.start);let St=0;for(let tt=1;tt<q.length;tt++){const st=q[St],Dt=q[tt],At=st.start+st.count,dt=Wt(Dt.start,T.width,4),Nt=Wt(st.start,T.width,4);Dt.start<=At+1&&dt===Nt&&Wt(Dt.start+Dt.count-1,T.width,4)===dt?st.count=Math.max(st.count,Dt.start+Dt.count-st.start):(++St,q[St]=Dt)}q.length=St+1;const ct=i.getParameter(i.UNPACK_ROW_LENGTH),Et=i.getParameter(i.UNPACK_SKIP_PIXELS),vt=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,T.width);for(let tt=0,st=q.length;tt<st;tt++){const Dt=q[tt],At=Math.floor(Dt.start/4),dt=Math.ceil(Dt.count/4),Nt=At%T.width,F=Math.floor(At/T.width),lt=dt,rt=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Nt),i.pixelStorei(i.UNPACK_SKIP_ROWS,F),e.texSubImage2D(i.TEXTURE_2D,0,Nt,F,lt,rt,H,Z,T.data)}L.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,ct),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Et),i.pixelStorei(i.UNPACK_SKIP_ROWS,vt)}}function K(L,T,H){let Z=i.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(Z=i.TEXTURE_2D_ARRAY),T.isData3DTexture&&(Z=i.TEXTURE_3D);const Q=Ct(L,T),q=T.source;e.bindTexture(Z,L.__webglTexture,i.TEXTURE0+H);const St=n.get(q);if(q.version!==St.__version||Q===!0){e.activeTexture(i.TEXTURE0+H);const ct=jt.getPrimaries(jt.workingColorSpace),Et=T.colorSpace===ui?null:jt.getPrimaries(T.colorSpace),vt=T.colorSpace===ui||ct===Et?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,T.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,T.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,vt);let tt=g(T.image,!1,s.maxTextureSize);tt=yt(T,tt);const st=r.convert(T.format,T.colorSpace),Dt=r.convert(T.type);let At=M(T.internalFormat,st,Dt,T.colorSpace,T.isVideoTexture);Mt(Z,T);let dt;const Nt=T.mipmaps,F=T.isVideoTexture!==!0,lt=St.__version===void 0||Q===!0,rt=q.dataReady,at=b(T,tt);if(T.isDepthTexture)At=v(T.format===Zs,T.type),lt&&(F?e.texStorage2D(i.TEXTURE_2D,1,At,tt.width,tt.height):e.texImage2D(i.TEXTURE_2D,0,At,tt.width,tt.height,0,st,Dt,null));else if(T.isDataTexture)if(Nt.length>0){F&&lt&&e.texStorage2D(i.TEXTURE_2D,at,At,Nt[0].width,Nt[0].height);for(let nt=0,j=Nt.length;nt<j;nt++)dt=Nt[nt],F?rt&&e.texSubImage2D(i.TEXTURE_2D,nt,0,0,dt.width,dt.height,st,Dt,dt.data):e.texImage2D(i.TEXTURE_2D,nt,At,dt.width,dt.height,0,st,Dt,dt.data);T.generateMipmaps=!1}else F?(lt&&e.texStorage2D(i.TEXTURE_2D,at,At,tt.width,tt.height),rt&&$t(T,tt,st,Dt)):e.texImage2D(i.TEXTURE_2D,0,At,tt.width,tt.height,0,st,Dt,tt.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){F&&lt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,at,At,Nt[0].width,Nt[0].height,tt.depth);for(let nt=0,j=Nt.length;nt<j;nt++)if(dt=Nt[nt],T.format!==bn)if(st!==null)if(F){if(rt)if(T.layerUpdates.size>0){const gt=Xl(dt.width,dt.height,T.format,T.type);for(const Ot of T.layerUpdates){const de=dt.data.subarray(Ot*gt/dt.data.BYTES_PER_ELEMENT,(Ot+1)*gt/dt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,nt,0,0,Ot,dt.width,dt.height,1,st,de)}T.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,nt,0,0,0,dt.width,dt.height,tt.depth,st,dt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,nt,At,dt.width,dt.height,tt.depth,0,dt.data,0,0);else Ut("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else F?rt&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,nt,0,0,0,dt.width,dt.height,tt.depth,st,Dt,dt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,nt,At,dt.width,dt.height,tt.depth,0,st,Dt,dt.data)}else{F&&lt&&e.texStorage2D(i.TEXTURE_2D,at,At,Nt[0].width,Nt[0].height);for(let nt=0,j=Nt.length;nt<j;nt++)dt=Nt[nt],T.format!==bn?st!==null?F?rt&&e.compressedTexSubImage2D(i.TEXTURE_2D,nt,0,0,dt.width,dt.height,st,dt.data):e.compressedTexImage2D(i.TEXTURE_2D,nt,At,dt.width,dt.height,0,dt.data):Ut("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):F?rt&&e.texSubImage2D(i.TEXTURE_2D,nt,0,0,dt.width,dt.height,st,Dt,dt.data):e.texImage2D(i.TEXTURE_2D,nt,At,dt.width,dt.height,0,st,Dt,dt.data)}else if(T.isDataArrayTexture)if(F){if(lt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,at,At,tt.width,tt.height,tt.depth),rt)if(T.layerUpdates.size>0){const nt=Xl(tt.width,tt.height,T.format,T.type);for(const j of T.layerUpdates){const gt=tt.data.subarray(j*nt/tt.data.BYTES_PER_ELEMENT,(j+1)*nt/tt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,j,tt.width,tt.height,1,st,Dt,gt)}T.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,tt.width,tt.height,tt.depth,st,Dt,tt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,At,tt.width,tt.height,tt.depth,0,st,Dt,tt.data);else if(T.isData3DTexture)F?(lt&&e.texStorage3D(i.TEXTURE_3D,at,At,tt.width,tt.height,tt.depth),rt&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,tt.width,tt.height,tt.depth,st,Dt,tt.data)):e.texImage3D(i.TEXTURE_3D,0,At,tt.width,tt.height,tt.depth,0,st,Dt,tt.data);else if(T.isFramebufferTexture){if(lt)if(F)e.texStorage2D(i.TEXTURE_2D,at,At,tt.width,tt.height);else{let nt=tt.width,j=tt.height;for(let gt=0;gt<at;gt++)e.texImage2D(i.TEXTURE_2D,gt,At,nt,j,0,st,Dt,null),nt>>=1,j>>=1}}else if(Nt.length>0){if(F&&lt){const nt=Bt(Nt[0]);e.texStorage2D(i.TEXTURE_2D,at,At,nt.width,nt.height)}for(let nt=0,j=Nt.length;nt<j;nt++)dt=Nt[nt],F?rt&&e.texSubImage2D(i.TEXTURE_2D,nt,0,0,st,Dt,dt):e.texImage2D(i.TEXTURE_2D,nt,At,st,Dt,dt);T.generateMipmaps=!1}else if(F){if(lt){const nt=Bt(tt);e.texStorage2D(i.TEXTURE_2D,at,At,nt.width,nt.height)}rt&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,st,Dt,tt)}else e.texImage2D(i.TEXTURE_2D,0,At,st,Dt,tt);m(T)&&p(Z),St.__version=q.version,T.onUpdate&&T.onUpdate(T)}L.__version=T.version}function J(L,T,H){if(T.image.length!==6)return;const Z=Ct(L,T),Q=T.source;e.bindTexture(i.TEXTURE_CUBE_MAP,L.__webglTexture,i.TEXTURE0+H);const q=n.get(Q);if(Q.version!==q.__version||Z===!0){e.activeTexture(i.TEXTURE0+H);const St=jt.getPrimaries(jt.workingColorSpace),ct=T.colorSpace===ui?null:jt.getPrimaries(T.colorSpace),Et=T.colorSpace===ui||St===ct?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,T.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,T.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Et);const vt=T.isCompressedTexture||T.image[0].isCompressedTexture,tt=T.image[0]&&T.image[0].isDataTexture,st=[];for(let j=0;j<6;j++)!vt&&!tt?st[j]=g(T.image[j],!0,s.maxCubemapSize):st[j]=tt?T.image[j].image:T.image[j],st[j]=yt(T,st[j]);const Dt=st[0],At=r.convert(T.format,T.colorSpace),dt=r.convert(T.type),Nt=M(T.internalFormat,At,dt,T.colorSpace),F=T.isVideoTexture!==!0,lt=q.__version===void 0||Z===!0,rt=Q.dataReady;let at=b(T,Dt);Mt(i.TEXTURE_CUBE_MAP,T);let nt;if(vt){F&&lt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,at,Nt,Dt.width,Dt.height);for(let j=0;j<6;j++){nt=st[j].mipmaps;for(let gt=0;gt<nt.length;gt++){const Ot=nt[gt];T.format!==bn?At!==null?F?rt&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,gt,0,0,Ot.width,Ot.height,At,Ot.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,gt,Nt,Ot.width,Ot.height,0,Ot.data):Ut("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):F?rt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,gt,0,0,Ot.width,Ot.height,At,dt,Ot.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,gt,Nt,Ot.width,Ot.height,0,At,dt,Ot.data)}}}else{if(nt=T.mipmaps,F&&lt){nt.length>0&&at++;const j=Bt(st[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,at,Nt,j.width,j.height)}for(let j=0;j<6;j++)if(tt){F?rt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,st[j].width,st[j].height,At,dt,st[j].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Nt,st[j].width,st[j].height,0,At,dt,st[j].data);for(let gt=0;gt<nt.length;gt++){const de=nt[gt].image[j].image;F?rt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,gt+1,0,0,de.width,de.height,At,dt,de.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,gt+1,Nt,de.width,de.height,0,At,dt,de.data)}}else{F?rt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,At,dt,st[j]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Nt,At,dt,st[j]);for(let gt=0;gt<nt.length;gt++){const Ot=nt[gt];F?rt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,gt+1,0,0,At,dt,Ot.image[j]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,gt+1,Nt,At,dt,Ot.image[j])}}}m(T)&&p(i.TEXTURE_CUBE_MAP),q.__version=Q.version,T.onUpdate&&T.onUpdate(T)}L.__version=T.version}function ht(L,T,H,Z,Q,q){const St=r.convert(H.format,H.colorSpace),ct=r.convert(H.type),Et=M(H.internalFormat,St,ct,H.colorSpace),vt=n.get(T),tt=n.get(H);if(tt.__renderTarget=T,!vt.__hasExternalTextures){const st=Math.max(1,T.width>>q),Dt=Math.max(1,T.height>>q);Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?e.texImage3D(Q,q,Et,st,Dt,T.depth,0,St,ct,null):e.texImage2D(Q,q,Et,st,Dt,0,St,ct,null)}e.bindFramebuffer(i.FRAMEBUFFER,L),mt(T)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Z,Q,tt.__webglTexture,0,te(T)):(Q===i.TEXTURE_2D||Q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Z,Q,tt.__webglTexture,q),e.bindFramebuffer(i.FRAMEBUFFER,null)}function wt(L,T,H){if(i.bindRenderbuffer(i.RENDERBUFFER,L),T.depthBuffer){const Z=T.depthTexture,Q=Z&&Z.isDepthTexture?Z.type:null,q=v(T.stencilBuffer,Q),St=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ct=te(T);mt(T)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ct,q,T.width,T.height):H?i.renderbufferStorageMultisample(i.RENDERBUFFER,ct,q,T.width,T.height):i.renderbufferStorage(i.RENDERBUFFER,q,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,St,i.RENDERBUFFER,L)}else{const Z=T.textures;for(let Q=0;Q<Z.length;Q++){const q=Z[Q],St=r.convert(q.format,q.colorSpace),ct=r.convert(q.type),Et=M(q.internalFormat,St,ct,q.colorSpace),vt=te(T);H&&mt(T)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,vt,Et,T.width,T.height):mt(T)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,vt,Et,T.width,T.height):i.renderbufferStorage(i.RENDERBUFFER,Et,T.width,T.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function xt(L,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,L),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Z=n.get(T.depthTexture);Z.__renderTarget=T,(!Z.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),B(T.depthTexture,0);const Q=Z.__webglTexture,q=te(T);if(T.depthTexture.format===Ks)mt(T)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0,q):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0);else if(T.depthTexture.format===Zs)mt(T)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0,q):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function Ft(L){const T=n.get(L),H=L.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==L.depthTexture){const Z=L.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),Z){const Q=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,Z.removeEventListener("dispose",Q)};Z.addEventListener("dispose",Q),T.__depthDisposeCallback=Q}T.__boundDepthTexture=Z}if(L.depthTexture&&!T.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");const Z=L.texture.mipmaps;Z&&Z.length>0?xt(T.__webglFramebuffer[0],L):xt(T.__webglFramebuffer,L)}else if(H){T.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(e.bindFramebuffer(i.FRAMEBUFFER,T.__webglFramebuffer[Z]),T.__webglDepthbuffer[Z]===void 0)T.__webglDepthbuffer[Z]=i.createRenderbuffer(),wt(T.__webglDepthbuffer[Z],L,!1);else{const Q=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,q=T.__webglDepthbuffer[Z];i.bindRenderbuffer(i.RENDERBUFFER,q),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,q)}}else{const Z=L.texture.mipmaps;if(Z&&Z.length>0?e.bindFramebuffer(i.FRAMEBUFFER,T.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=i.createRenderbuffer(),wt(T.__webglDepthbuffer,L,!1);else{const Q=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,q=T.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,q),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,q)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function le(L,T,H){const Z=n.get(L);T!==void 0&&ht(Z.__webglFramebuffer,L,L.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),H!==void 0&&Ft(L)}function Xt(L){const T=L.texture,H=n.get(L),Z=n.get(T);L.addEventListener("dispose",A);const Q=L.textures,q=L.isWebGLCubeRenderTarget===!0,St=Q.length>1;if(St||(Z.__webglTexture===void 0&&(Z.__webglTexture=i.createTexture()),Z.__version=T.version,a.memory.textures++),q){H.__webglFramebuffer=[];for(let ct=0;ct<6;ct++)if(T.mipmaps&&T.mipmaps.length>0){H.__webglFramebuffer[ct]=[];for(let Et=0;Et<T.mipmaps.length;Et++)H.__webglFramebuffer[ct][Et]=i.createFramebuffer()}else H.__webglFramebuffer[ct]=i.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){H.__webglFramebuffer=[];for(let ct=0;ct<T.mipmaps.length;ct++)H.__webglFramebuffer[ct]=i.createFramebuffer()}else H.__webglFramebuffer=i.createFramebuffer();if(St)for(let ct=0,Et=Q.length;ct<Et;ct++){const vt=n.get(Q[ct]);vt.__webglTexture===void 0&&(vt.__webglTexture=i.createTexture(),a.memory.textures++)}if(L.samples>0&&mt(L)===!1){H.__webglMultisampledFramebuffer=i.createFramebuffer(),H.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let ct=0;ct<Q.length;ct++){const Et=Q[ct];H.__webglColorRenderbuffer[ct]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,H.__webglColorRenderbuffer[ct]);const vt=r.convert(Et.format,Et.colorSpace),tt=r.convert(Et.type),st=M(Et.internalFormat,vt,tt,Et.colorSpace,L.isXRRenderTarget===!0),Dt=te(L);i.renderbufferStorageMultisample(i.RENDERBUFFER,Dt,st,L.width,L.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ct,i.RENDERBUFFER,H.__webglColorRenderbuffer[ct])}i.bindRenderbuffer(i.RENDERBUFFER,null),L.depthBuffer&&(H.__webglDepthRenderbuffer=i.createRenderbuffer(),wt(H.__webglDepthRenderbuffer,L,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(q){e.bindTexture(i.TEXTURE_CUBE_MAP,Z.__webglTexture),Mt(i.TEXTURE_CUBE_MAP,T);for(let ct=0;ct<6;ct++)if(T.mipmaps&&T.mipmaps.length>0)for(let Et=0;Et<T.mipmaps.length;Et++)ht(H.__webglFramebuffer[ct][Et],L,T,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,Et);else ht(H.__webglFramebuffer[ct],L,T,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0);m(T)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(St){for(let ct=0,Et=Q.length;ct<Et;ct++){const vt=Q[ct],tt=n.get(vt);let st=i.TEXTURE_2D;(L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(st=L.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(st,tt.__webglTexture),Mt(st,vt),ht(H.__webglFramebuffer,L,vt,i.COLOR_ATTACHMENT0+ct,st,0),m(vt)&&p(st)}e.unbindTexture()}else{let ct=i.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(ct=L.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ct,Z.__webglTexture),Mt(ct,T),T.mipmaps&&T.mipmaps.length>0)for(let Et=0;Et<T.mipmaps.length;Et++)ht(H.__webglFramebuffer[Et],L,T,i.COLOR_ATTACHMENT0,ct,Et);else ht(H.__webglFramebuffer,L,T,i.COLOR_ATTACHMENT0,ct,0);m(T)&&p(ct),e.unbindTexture()}L.depthBuffer&&Ft(L)}function ue(L){const T=L.textures;for(let H=0,Z=T.length;H<Z;H++){const Q=T[H];if(m(Q)){const q=y(L),St=n.get(Q).__webglTexture;e.bindTexture(q,St),p(q),e.unbindTexture()}}}const N=[],qt=[];function kt(L){if(L.samples>0){if(mt(L)===!1){const T=L.textures,H=L.width,Z=L.height;let Q=i.COLOR_BUFFER_BIT;const q=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,St=n.get(L),ct=T.length>1;if(ct)for(let vt=0;vt<T.length;vt++)e.bindFramebuffer(i.FRAMEBUFFER,St.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+vt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,St.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+vt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,St.__webglMultisampledFramebuffer);const Et=L.texture.mipmaps;Et&&Et.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,St.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,St.__webglFramebuffer);for(let vt=0;vt<T.length;vt++){if(L.resolveDepthBuffer&&(L.depthBuffer&&(Q|=i.DEPTH_BUFFER_BIT),L.stencilBuffer&&L.resolveStencilBuffer&&(Q|=i.STENCIL_BUFFER_BIT)),ct){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,St.__webglColorRenderbuffer[vt]);const tt=n.get(T[vt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,tt,0)}i.blitFramebuffer(0,0,H,Z,0,0,H,Z,Q,i.NEAREST),c===!0&&(N.length=0,qt.length=0,N.push(i.COLOR_ATTACHMENT0+vt),L.depthBuffer&&L.resolveDepthBuffer===!1&&(N.push(q),qt.push(q),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,qt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,N))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ct)for(let vt=0;vt<T.length;vt++){e.bindFramebuffer(i.FRAMEBUFFER,St.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+vt,i.RENDERBUFFER,St.__webglColorRenderbuffer[vt]);const tt=n.get(T[vt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,St.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+vt,i.TEXTURE_2D,tt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,St.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.resolveDepthBuffer===!1&&c){const T=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[T])}}}function te(L){return Math.min(s.maxSamples,L.samples)}function mt(L){const T=n.get(L);return L.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function oe(L){const T=a.render.frame;u.get(L)!==T&&(u.set(L,T),L.update())}function yt(L,T){const H=L.colorSpace,Z=L.format,Q=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||H!==Ii&&H!==ui&&(jt.getTransfer(H)===re?(Z!==bn||Q!==Dn)&&Ut("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):ge("WebGLTextures: Unsupported texture color space:",H)),T}function Bt(L){return typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement?(l.width=L.naturalWidth||L.width,l.height=L.naturalHeight||L.height):typeof VideoFrame<"u"&&L instanceof VideoFrame?(l.width=L.displayWidth,l.height=L.displayHeight):(l.width=L.width,l.height=L.height),l}this.allocateTextureUnit=I,this.resetTextureUnits=D,this.setTexture2D=B,this.setTexture2DArray=V,this.setTexture3D=$,this.setTextureCube=X,this.rebindTextures=le,this.setupRenderTarget=Xt,this.updateRenderTargetMipmap=ue,this.updateMultisampleRenderTarget=kt,this.setupDepthRenderbuffer=Ft,this.setupFrameBufferTexture=ht,this.useMultisampledRTT=mt}function Ng(i,t){function e(n,s=ui){let r;const a=jt.getTransfer(s);if(n===Dn)return i.UNSIGNED_BYTE;if(n===Dc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Lc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===sh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===rh)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===nh)return i.BYTE;if(n===ih)return i.SHORT;if(n===Ys)return i.UNSIGNED_SHORT;if(n===Pc)return i.INT;if(n===Li)return i.UNSIGNED_INT;if(n===pn)return i.FLOAT;if(n===Rn)return i.HALF_FLOAT;if(n===ah)return i.ALPHA;if(n===oh)return i.RGB;if(n===bn)return i.RGBA;if(n===Ks)return i.DEPTH_COMPONENT;if(n===Zs)return i.DEPTH_STENCIL;if(n===ch)return i.RED;if(n===Ic)return i.RED_INTEGER;if(n===Uc)return i.RG;if(n===Nc)return i.RG_INTEGER;if(n===Fc)return i.RGBA_INTEGER;if(n===Zr||n===jr||n===Jr||n===Qr)if(a===re)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Zr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===jr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Jr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Qr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Zr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===jr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Jr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Qr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Oo||n===Bo||n===zo||n===Vo)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Oo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Bo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===zo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Vo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ko||n===Ho||n===Go)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ko||n===Ho)return a===re?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Go)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Wo||n===Xo||n===qo||n===Yo||n===$o||n===Ko||n===Zo||n===jo||n===Jo||n===Qo||n===tc||n===ec||n===nc||n===ic)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Wo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Xo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===qo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Yo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===$o)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ko)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Zo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===jo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Jo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Qo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===tc)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ec)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===nc)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ic)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===sc||n===rc||n===ac)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===sc)return a===re?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===rc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ac)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===oc||n===cc||n===lc||n===uc)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===oc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===cc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===lc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===uc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===$s?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const Fg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Og=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Bg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new Eh(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new jn({vertexShader:Fg,fragmentShader:Og,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ee(new Jn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class zg extends Ss{constructor(t,e){super();const n=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,u=null,h=null,d=null,f=null,x=null;const g=typeof XRWebGLBinding<"u",m=new Bg,p={},y=e.getContextAttributes();let M=null,v=null;const b=[],w=[],A=new Rt;let C=null;const S=new dn;S.viewport=new Me;const _=new dn;_.viewport=new Me;const P=[S,_],D=new tp;let I=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let J=b[K];return J===void 0&&(J=new qa,b[K]=J),J.getTargetRaySpace()},this.getControllerGrip=function(K){let J=b[K];return J===void 0&&(J=new qa,b[K]=J),J.getGripSpace()},this.getHand=function(K){let J=b[K];return J===void 0&&(J=new qa,b[K]=J),J.getHandSpace()};function B(K){const J=w.indexOf(K.inputSource);if(J===-1)return;const ht=b[J];ht!==void 0&&(ht.update(K.inputSource,K.frame,l||a),ht.dispatchEvent({type:K.type,data:K.inputSource}))}function V(){s.removeEventListener("select",B),s.removeEventListener("selectstart",B),s.removeEventListener("selectend",B),s.removeEventListener("squeeze",B),s.removeEventListener("squeezestart",B),s.removeEventListener("squeezeend",B),s.removeEventListener("end",V),s.removeEventListener("inputsourceschange",$);for(let K=0;K<b.length;K++){const J=w[K];J!==null&&(w[K]=null,b[K].disconnect(J))}I=null,U=null,m.reset();for(const K in p)delete p[K];t.setRenderTarget(M),f=null,d=null,h=null,s=null,v=null,$t.stop(),n.isPresenting=!1,t.setPixelRatio(C),t.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){r=K,n.isPresenting===!0&&Ut("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){o=K,n.isPresenting===!0&&Ut("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(K){l=K},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return h===null&&g&&(h=new XRWebGLBinding(s,e)),h},this.getFrame=function(){return x},this.getSession=function(){return s},this.setSession=async function(K){if(s=K,s!==null){if(M=t.getRenderTarget(),s.addEventListener("select",B),s.addEventListener("selectstart",B),s.addEventListener("selectend",B),s.addEventListener("squeeze",B),s.addEventListener("squeezestart",B),s.addEventListener("squeezeend",B),s.addEventListener("end",V),s.addEventListener("inputsourceschange",$),y.xrCompatible!==!0&&await e.makeXRCompatible(),C=t.getPixelRatio(),t.getSize(A),g&&"createProjectionLayer"in XRWebGLBinding.prototype){let ht=null,wt=null,xt=null;y.depth&&(xt=y.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ht=y.stencil?Zs:Ks,wt=y.stencil?$s:Li);const Ft={colorFormat:e.RGBA8,depthFormat:xt,scaleFactor:r};h=this.getBinding(),d=h.createProjectionLayer(Ft),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),v=new Ui(d.textureWidth,d.textureHeight,{format:bn,type:Dn,depthTexture:new wh(d.textureWidth,d.textureHeight,wt,void 0,void 0,void 0,void 0,void 0,void 0,ht),stencilBuffer:y.stencil,colorSpace:t.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const ht={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,ht),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new Ui(f.framebufferWidth,f.framebufferHeight,{format:bn,type:Dn,colorSpace:t.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),$t.setContext(s),$t.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function $(K){for(let J=0;J<K.removed.length;J++){const ht=K.removed[J],wt=w.indexOf(ht);wt>=0&&(w[wt]=null,b[wt].disconnect(ht))}for(let J=0;J<K.added.length;J++){const ht=K.added[J];let wt=w.indexOf(ht);if(wt===-1){for(let Ft=0;Ft<b.length;Ft++)if(Ft>=w.length){w.push(ht),wt=Ft;break}else if(w[Ft]===null){w[Ft]=ht,wt=Ft;break}if(wt===-1)break}const xt=b[wt];xt&&xt.connect(ht)}}const X=new E,et=new E;function Y(K,J,ht){X.setFromMatrixPosition(J.matrixWorld),et.setFromMatrixPosition(ht.matrixWorld);const wt=X.distanceTo(et),xt=J.projectionMatrix.elements,Ft=ht.projectionMatrix.elements,le=xt[14]/(xt[10]-1),Xt=xt[14]/(xt[10]+1),ue=(xt[9]+1)/xt[5],N=(xt[9]-1)/xt[5],qt=(xt[8]-1)/xt[0],kt=(Ft[8]+1)/Ft[0],te=le*qt,mt=le*kt,oe=wt/(-qt+kt),yt=oe*-qt;if(J.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(yt),K.translateZ(oe),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),xt[10]===-1)K.projectionMatrix.copy(J.projectionMatrix),K.projectionMatrixInverse.copy(J.projectionMatrixInverse);else{const Bt=le+oe,L=Xt+oe,T=te-yt,H=mt+(wt-yt),Z=ue*Xt/L*Bt,Q=N*Xt/L*Bt;K.projectionMatrix.makePerspective(T,H,Z,Q,Bt,L),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function ft(K,J){J===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(J.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(s===null)return;let J=K.near,ht=K.far;m.texture!==null&&(m.depthNear>0&&(J=m.depthNear),m.depthFar>0&&(ht=m.depthFar)),D.near=_.near=S.near=J,D.far=_.far=S.far=ht,(I!==D.near||U!==D.far)&&(s.updateRenderState({depthNear:D.near,depthFar:D.far}),I=D.near,U=D.far),D.layers.mask=K.layers.mask|6,S.layers.mask=D.layers.mask&3,_.layers.mask=D.layers.mask&5;const wt=K.parent,xt=D.cameras;ft(D,wt);for(let Ft=0;Ft<xt.length;Ft++)ft(xt[Ft],wt);xt.length===2?Y(D,S,_):D.projectionMatrix.copy(S.projectionMatrix),Mt(K,D,wt)};function Mt(K,J,ht){ht===null?K.matrix.copy(J.matrixWorld):(K.matrix.copy(ht.matrixWorld),K.matrix.invert(),K.matrix.multiply(J.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(J.projectionMatrix),K.projectionMatrixInverse.copy(J.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=Js*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(K){c=K,d!==null&&(d.fixedFoveation=K),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=K)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(D)},this.getCameraTexture=function(K){return p[K]};let Ct=null;function Wt(K,J){if(u=J.getViewerPose(l||a),x=J,u!==null){const ht=u.views;f!==null&&(t.setRenderTargetFramebuffer(v,f.framebuffer),t.setRenderTarget(v));let wt=!1;ht.length!==D.cameras.length&&(D.cameras.length=0,wt=!0);for(let Xt=0;Xt<ht.length;Xt++){const ue=ht[Xt];let N=null;if(f!==null)N=f.getViewport(ue);else{const kt=h.getViewSubImage(d,ue);N=kt.viewport,Xt===0&&(t.setRenderTargetTextures(v,kt.colorTexture,kt.depthStencilTexture),t.setRenderTarget(v))}let qt=P[Xt];qt===void 0&&(qt=new dn,qt.layers.enable(Xt),qt.viewport=new Me,P[Xt]=qt),qt.matrix.fromArray(ue.transform.matrix),qt.matrix.decompose(qt.position,qt.quaternion,qt.scale),qt.projectionMatrix.fromArray(ue.projectionMatrix),qt.projectionMatrixInverse.copy(qt.projectionMatrix).invert(),qt.viewport.set(N.x,N.y,N.width,N.height),Xt===0&&(D.matrix.copy(qt.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),wt===!0&&D.cameras.push(qt)}const xt=s.enabledFeatures;if(xt&&xt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&g){h=n.getBinding();const Xt=h.getDepthInformation(ht[0]);Xt&&Xt.isValid&&Xt.texture&&m.init(Xt,s.renderState)}if(xt&&xt.includes("camera-access")&&g){t.state.unbindTexture(),h=n.getBinding();for(let Xt=0;Xt<ht.length;Xt++){const ue=ht[Xt].camera;if(ue){let N=p[ue];N||(N=new Eh,p[ue]=N);const qt=h.getCameraImage(ue);N.sourceTexture=qt}}}}for(let ht=0;ht<b.length;ht++){const wt=w[ht],xt=b[ht];wt!==null&&xt!==void 0&&xt.update(wt,J,l||a)}Ct&&Ct(K,J),J.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:J}),x=null}const $t=new Ch;$t.setAnimationLoop(Wt),this.setAnimationLoop=function(K){Ct=K},this.dispose=function(){}}}const Ti=new Ln,Vg=new Qt;function kg(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,xh(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,y,M,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),h(m,p)):p.isMeshPhongMaterial?(r(m,p),u(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,v)):p.isMeshMatcapMaterial?(r(m,p),x(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),g(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?c(m,p,y,M):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Ye&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Ye&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const y=t.get(p),M=y.envMap,v=y.envMapRotation;M&&(m.envMap.value=M,Ti.copy(v),Ti.x*=-1,Ti.y*=-1,Ti.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Ti.y*=-1,Ti.z*=-1),m.envMapRotation.value.setFromMatrix4(Vg.makeRotationFromEuler(Ti)),m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,y,M){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*y,m.scale.value=M*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,y){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ye&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function x(m,p){p.matcap&&(m.matcap.value=p.matcap)}function g(m,p){const y=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Hg(i,t,e,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(y,M){const v=M.program;n.uniformBlockBinding(y,v)}function l(y,M){let v=s[y.id];v===void 0&&(x(y),v=u(y),s[y.id]=v,y.addEventListener("dispose",m));const b=M.program;n.updateUBOMapping(y,b);const w=t.render.frame;r[y.id]!==w&&(d(y),r[y.id]=w)}function u(y){const M=h();y.__bindingPointIndex=M;const v=i.createBuffer(),b=y.__size,w=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,v),i.bufferData(i.UNIFORM_BUFFER,b,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,v),v}function h(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return ge("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){const M=s[y.id],v=y.uniforms,b=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let w=0,A=v.length;w<A;w++){const C=Array.isArray(v[w])?v[w]:[v[w]];for(let S=0,_=C.length;S<_;S++){const P=C[S];if(f(P,w,S,b)===!0){const D=P.__offset,I=Array.isArray(P.value)?P.value:[P.value];let U=0;for(let B=0;B<I.length;B++){const V=I[B],$=g(V);typeof V=="number"||typeof V=="boolean"?(P.__data[0]=V,i.bufferSubData(i.UNIFORM_BUFFER,D+U,P.__data)):V.isMatrix3?(P.__data[0]=V.elements[0],P.__data[1]=V.elements[1],P.__data[2]=V.elements[2],P.__data[3]=0,P.__data[4]=V.elements[3],P.__data[5]=V.elements[4],P.__data[6]=V.elements[5],P.__data[7]=0,P.__data[8]=V.elements[6],P.__data[9]=V.elements[7],P.__data[10]=V.elements[8],P.__data[11]=0):(V.toArray(P.__data,U),U+=$.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,D,P.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(y,M,v,b){const w=y.value,A=M+"_"+v;if(b[A]===void 0)return typeof w=="number"||typeof w=="boolean"?b[A]=w:b[A]=w.clone(),!0;{const C=b[A];if(typeof w=="number"||typeof w=="boolean"){if(C!==w)return b[A]=w,!0}else if(C.equals(w)===!1)return C.copy(w),!0}return!1}function x(y){const M=y.uniforms;let v=0;const b=16;for(let A=0,C=M.length;A<C;A++){const S=Array.isArray(M[A])?M[A]:[M[A]];for(let _=0,P=S.length;_<P;_++){const D=S[_],I=Array.isArray(D.value)?D.value:[D.value];for(let U=0,B=I.length;U<B;U++){const V=I[U],$=g(V),X=v%b,et=X%$.boundary,Y=X+et;v+=et,Y!==0&&b-Y<$.storage&&(v+=b-Y),D.__data=new Float32Array($.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=v,v+=$.storage}}}const w=v%b;return w>0&&(v+=b-w),y.__size=v,y.__cache={},this}function g(y){const M={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(M.boundary=4,M.storage=4):y.isVector2?(M.boundary=8,M.storage=8):y.isVector3||y.isColor?(M.boundary=16,M.storage=12):y.isVector4?(M.boundary=16,M.storage=16):y.isMatrix3?(M.boundary=48,M.storage=48):y.isMatrix4?(M.boundary=64,M.storage=64):y.isTexture?Ut("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Ut("WebGLRenderer: Unsupported uniform value type.",y),M}function m(y){const M=y.target;M.removeEventListener("dispose",m);const v=a.indexOf(M.__bindingPointIndex);a.splice(v,1),i.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function p(){for(const y in s)i.deleteBuffer(s[y]);a=[],s={},r={}}return{bind:c,update:l,dispose:p}}const Gg=new Uint16Array([11481,15204,11534,15171,11808,15015,12385,14843,12894,14716,13396,14600,13693,14483,13976,14366,14237,14171,14405,13961,14511,13770,14605,13598,14687,13444,14760,13305,14822,13066,14876,12857,14923,12675,14963,12517,14997,12379,15025,12230,15049,12023,15070,11843,15086,11687,15100,11551,15111,11433,15120,11330,15127,11217,15132,11060,15135,10922,15138,10801,15139,10695,15139,10600,13012,14923,13020,14917,13064,14886,13176,14800,13349,14666,13513,14526,13724,14398,13960,14230,14200,14020,14383,13827,14488,13651,14583,13491,14667,13348,14740,13132,14803,12908,14856,12713,14901,12542,14938,12394,14968,12241,14992,12017,15010,11822,15024,11654,15034,11507,15041,11380,15044,11269,15044,11081,15042,10913,15037,10764,15031,10635,15023,10520,15014,10419,15003,10330,13657,14676,13658,14673,13670,14660,13698,14622,13750,14547,13834,14442,13956,14317,14112,14093,14291,13889,14407,13704,14499,13538,14586,13389,14664,13201,14733,12966,14792,12758,14842,12577,14882,12418,14915,12272,14940,12033,14959,11826,14972,11646,14980,11490,14983,11355,14983,11212,14979,11008,14971,10830,14961,10675,14950,10540,14936,10420,14923,10315,14909,10204,14894,10041,14089,14460,14090,14459,14096,14452,14112,14431,14141,14388,14186,14305,14252,14130,14341,13941,14399,13756,14467,13585,14539,13430,14610,13272,14677,13026,14737,12808,14790,12617,14833,12449,14869,12303,14896,12065,14916,11845,14929,11655,14937,11490,14939,11347,14936,11184,14930,10970,14921,10783,14912,10621,14900,10480,14885,10356,14867,10247,14848,10062,14827,9894,14805,9745,14400,14208,14400,14206,14402,14198,14406,14174,14415,14122,14427,14035,14444,13913,14469,13767,14504,13613,14548,13463,14598,13324,14651,13082,14704,12858,14752,12658,14795,12483,14831,12330,14860,12106,14881,11875,14895,11675,14903,11501,14905,11351,14903,11178,14900,10953,14892,10757,14880,10589,14865,10442,14847,10313,14827,10162,14805,9965,14782,9792,14757,9642,14731,9507,14562,13883,14562,13883,14563,13877,14566,13862,14570,13830,14576,13773,14584,13689,14595,13582,14613,13461,14637,13336,14668,13120,14704,12897,14741,12695,14776,12516,14808,12358,14835,12150,14856,11910,14870,11701,14878,11519,14882,11361,14884,11187,14880,10951,14871,10748,14858,10572,14842,10418,14823,10286,14801,10099,14777,9897,14751,9722,14725,9567,14696,9430,14666,9309,14702,13604,14702,13604,14702,13600,14703,13591,14705,13570,14707,13533,14709,13477,14712,13400,14718,13305,14727,13106,14743,12907,14762,12716,14784,12539,14807,12380,14827,12190,14844,11943,14855,11727,14863,11539,14870,11376,14871,11204,14868,10960,14858,10748,14845,10565,14829,10406,14809,10269,14786,10058,14761,9852,14734,9671,14705,9512,14674,9374,14641,9253,14608,9076,14821,13366,14821,13365,14821,13364,14821,13358,14821,13344,14821,13320,14819,13252,14817,13145,14815,13011,14814,12858,14817,12698,14823,12539,14832,12389,14841,12214,14850,11968,14856,11750,14861,11558,14866,11390,14867,11226,14862,10972,14853,10754,14840,10565,14823,10401,14803,10259,14780,10032,14754,9820,14725,9635,14694,9473,14661,9333,14627,9203,14593,8988,14557,8798,14923,13014,14922,13014,14922,13012,14922,13004,14920,12987,14919,12957,14915,12907,14909,12834,14902,12738,14894,12623,14888,12498,14883,12370,14880,12203,14878,11970,14875,11759,14873,11569,14874,11401,14872,11243,14865,10986,14855,10762,14842,10568,14825,10401,14804,10255,14781,10017,14754,9799,14725,9611,14692,9445,14658,9301,14623,9139,14587,8920,14548,8729,14509,8562,15008,12672,15008,12672,15008,12671,15007,12667,15005,12656,15001,12637,14997,12605,14989,12556,14978,12490,14966,12407,14953,12313,14940,12136,14927,11934,14914,11742,14903,11563,14896,11401,14889,11247,14879,10992,14866,10767,14851,10570,14833,10400,14812,10252,14789,10007,14761,9784,14731,9592,14698,9424,14663,9279,14627,9088,14588,8868,14548,8676,14508,8508,14467,8360,15080,12386,15080,12386,15079,12385,15078,12383,15076,12378,15072,12367,15066,12347,15057,12315,15045,12253,15030,12138,15012,11998,14993,11845,14972,11685,14951,11530,14935,11383,14920,11228,14904,10981,14887,10762,14870,10567,14850,10397,14827,10248,14803,9997,14774,9771,14743,9578,14710,9407,14674,9259,14637,9048,14596,8826,14555,8632,14514,8464,14471,8317,14427,8182,15139,12008,15139,12008,15138,12008,15137,12007,15135,12003,15130,11990,15124,11969,15115,11929,15102,11872,15086,11794,15064,11693,15041,11581,15013,11459,14987,11336,14966,11170,14944,10944,14921,10738,14898,10552,14875,10387,14850,10239,14824,9983,14794,9758,14762,9563,14728,9392,14692,9244,14653,9014,14611,8791,14569,8597,14526,8427,14481,8281,14436,8110,14391,7885,15188,11617,15188,11617,15187,11617,15186,11618,15183,11617,15179,11612,15173,11601,15163,11581,15150,11546,15133,11495,15110,11427,15083,11346,15051,11246,15024,11057,14996,10868,14967,10687,14938,10517,14911,10362,14882,10206,14853,9956,14821,9737,14787,9543,14752,9375,14715,9228,14675,8980,14632,8760,14589,8565,14544,8395,14498,8248,14451,8049,14404,7824,14357,7630,15228,11298,15228,11298,15227,11299,15226,11301,15223,11303,15219,11302,15213,11299,15204,11290,15191,11271,15174,11217,15150,11129,15119,11015,15087,10886,15057,10744,15024,10599,14990,10455,14957,10318,14924,10143,14891,9911,14856,9701,14820,9516,14782,9352,14744,9200,14703,8946,14659,8725,14615,8533,14568,8366,14521,8220,14472,7992,14423,7770,14374,7578,14315,7408,15260,10819,15260,10819,15259,10822,15258,10826,15256,10832,15251,10836,15246,10841,15237,10838,15225,10821,15207,10788,15183,10734,15151,10660,15120,10571,15087,10469,15049,10359,15012,10249,14974,10041,14937,9837,14900,9647,14860,9475,14820,9320,14779,9147,14736,8902,14691,8688,14646,8499,14598,8335,14549,8189,14499,7940,14448,7720,14397,7529,14347,7363,14256,7218,15285,10410,15285,10411,15285,10413,15284,10418,15282,10425,15278,10434,15272,10442,15264,10449,15252,10445,15235,10433,15210,10403,15179,10358,15149,10301,15113,10218,15073,10059,15033,9894,14991,9726,14951,9565,14909,9413,14865,9273,14822,9073,14777,8845,14730,8641,14682,8459,14633,8300,14583,8129,14531,7883,14479,7670,14426,7482,14373,7321,14305,7176,14201,6939,15305,9939,15305,9940,15305,9945,15304,9955,15302,9967,15298,9989,15293,10010,15286,10033,15274,10044,15258,10045,15233,10022,15205,9975,15174,9903,15136,9808,15095,9697,15053,9578,15009,9451,14965,9327,14918,9198,14871,8973,14825,8766,14775,8579,14725,8408,14675,8259,14622,8058,14569,7821,14515,7615,14460,7435,14405,7276,14350,7108,14256,6866,14149,6653,15321,9444,15321,9445,15321,9448,15320,9458,15317,9470,15314,9490,15310,9515,15302,9540,15292,9562,15276,9579,15251,9577,15226,9559,15195,9519,15156,9463,15116,9389,15071,9304,15025,9208,14978,9023,14927,8838,14878,8661,14827,8496,14774,8344,14722,8206,14667,7973,14612,7749,14556,7555,14499,7382,14443,7229,14385,7025,14322,6791,14210,6588,14100,6409,15333,8920,15333,8921,15332,8927,15332,8943,15329,8965,15326,9002,15322,9048,15316,9106,15307,9162,15291,9204,15267,9221,15244,9221,15212,9196,15175,9134,15133,9043,15088,8930,15040,8801,14990,8665,14938,8526,14886,8391,14830,8261,14775,8087,14719,7866,14661,7664,14603,7482,14544,7322,14485,7178,14426,6936,14367,6713,14281,6517,14166,6348,14054,6198,15341,8360,15341,8361,15341,8366,15341,8379,15339,8399,15336,8431,15332,8473,15326,8527,15318,8585,15302,8632,15281,8670,15258,8690,15227,8690,15191,8664,15149,8612,15104,8543,15055,8456,15001,8360,14948,8259,14892,8122,14834,7923,14776,7734,14716,7558,14656,7397,14595,7250,14534,7070,14472,6835,14410,6628,14350,6443,14243,6283,14125,6135,14010,5889,15348,7715,15348,7717,15348,7725,15347,7745,15345,7780,15343,7836,15339,7905,15334,8e3,15326,8103,15310,8193,15293,8239,15270,8270,15240,8287,15204,8283,15163,8260,15118,8223,15067,8143,15014,8014,14958,7873,14899,7723,14839,7573,14778,7430,14715,7293,14652,7164,14588,6931,14524,6720,14460,6531,14396,6362,14330,6210,14207,6015,14086,5781,13969,5576,15352,7114,15352,7116,15352,7128,15352,7159,15350,7195,15348,7237,15345,7299,15340,7374,15332,7457,15317,7544,15301,7633,15280,7703,15251,7754,15216,7775,15176,7767,15131,7733,15079,7670,15026,7588,14967,7492,14906,7387,14844,7278,14779,7171,14714,6965,14648,6770,14581,6587,14515,6420,14448,6269,14382,6123,14299,5881,14172,5665,14049,5477,13929,5310,15355,6329,15355,6330,15355,6339,15355,6362,15353,6410,15351,6472,15349,6572,15344,6688,15337,6835,15323,6985,15309,7142,15287,7220,15260,7277,15226,7310,15188,7326,15142,7318,15090,7285,15036,7239,14976,7177,14914,7045,14849,6892,14782,6736,14714,6581,14645,6433,14576,6293,14506,6164,14438,5946,14369,5733,14270,5540,14140,5369,14014,5216,13892,5043,15357,5483,15357,5484,15357,5496,15357,5528,15356,5597,15354,5692,15351,5835,15347,6011,15339,6195,15328,6317,15314,6446,15293,6566,15268,6668,15235,6746,15197,6796,15152,6811,15101,6790,15046,6748,14985,6673,14921,6583,14854,6479,14785,6371,14714,6259,14643,6149,14571,5946,14499,5750,14428,5567,14358,5401,14242,5250,14109,5111,13980,4870,13856,4657,15359,4555,15359,4557,15358,4573,15358,4633,15357,4715,15355,4841,15353,5061,15349,5216,15342,5391,15331,5577,15318,5770,15299,5967,15274,6150,15243,6223,15206,6280,15161,6310,15111,6317,15055,6300,14994,6262,14928,6208,14860,6141,14788,5994,14715,5838,14641,5684,14566,5529,14492,5384,14418,5247,14346,5121,14216,4892,14079,4682,13948,4496,13822,4330,15359,3498,15359,3501,15359,3520,15359,3598,15358,3719,15356,3860,15355,4137,15351,4305,15344,4563,15334,4809,15321,5116,15303,5273,15280,5418,15250,5547,15214,5653,15170,5722,15120,5761,15064,5763,15002,5733,14935,5673,14865,5597,14792,5504,14716,5400,14640,5294,14563,5185,14486,5041,14410,4841,14335,4655,14191,4482,14051,4325,13918,4183,13790,4012,15360,2282,15360,2285,15360,2306,15360,2401,15359,2547,15357,2748,15355,3103,15352,3349,15345,3675,15336,4020,15324,4272,15307,4496,15285,4716,15255,4908,15220,5086,15178,5170,15128,5214,15072,5234,15010,5231,14943,5206,14871,5166,14796,5102,14718,4971,14639,4833,14559,4687,14480,4541,14402,4401,14315,4268,14167,4142,14025,3958,13888,3747,13759,3556,15360,923,15360,925,15360,946,15360,1052,15359,1214,15357,1494,15356,1892,15352,2274,15346,2663,15338,3099,15326,3393,15309,3679,15288,3980,15260,4183,15226,4325,15185,4437,15136,4517,15080,4570,15018,4591,14950,4581,14877,4545,14800,4485,14720,4411,14638,4325,14556,4231,14475,4136,14395,3988,14297,3803,14145,3628,13999,3465,13861,3314,13729,3177,15360,263,15360,264,15360,272,15360,325,15359,407,15358,548,15356,780,15352,1144,15347,1580,15339,2099,15328,2425,15312,2795,15292,3133,15264,3329,15232,3517,15191,3689,15143,3819,15088,3923,15025,3978,14956,3999,14882,3979,14804,3931,14722,3855,14639,3756,14554,3645,14470,3529,14388,3409,14279,3289,14124,3173,13975,3055,13834,2848,13701,2658,15360,49,15360,49,15360,52,15360,75,15359,111,15358,201,15356,283,15353,519,15348,726,15340,1045,15329,1415,15314,1795,15295,2173,15269,2410,15237,2649,15197,2866,15150,3054,15095,3140,15032,3196,14963,3228,14888,3236,14808,3224,14725,3191,14639,3146,14553,3088,14466,2976,14382,2836,14262,2692,14103,2549,13952,2409,13808,2278,13674,2154,15360,4,15360,4,15360,4,15360,13,15359,33,15358,59,15357,112,15353,199,15348,302,15341,456,15331,628,15316,827,15297,1082,15272,1332,15241,1601,15202,1851,15156,2069,15101,2172,15039,2256,14970,2314,14894,2348,14813,2358,14728,2344,14640,2311,14551,2263,14463,2203,14376,2133,14247,2059,14084,1915,13930,1761,13784,1609,13648,1464,15360,0,15360,0,15360,0,15360,3,15359,18,15358,26,15357,53,15354,80,15348,97,15341,165,15332,238,15318,326,15299,427,15275,529,15245,654,15207,771,15161,885,15108,994,15046,1089,14976,1170,14900,1229,14817,1266,14731,1284,14641,1282,14550,1260,14460,1223,14370,1174,14232,1116,14066,1050,13909,981,13761,910,13623,839]);let Vn=null;function Wg(){return Vn===null&&(Vn=new Mh(Gg,32,32,Uc,Rn),Vn.minFilter=Ne,Vn.magFilter=Ne,Vn.wrapS=Sn,Vn.wrapT=Sn,Vn.generateMipmaps=!1,Vn.needsUpdate=!0),Vn}class Xg{constructor(t={}){const{canvas:e=Wd(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const x=new Set([Fc,Nc,Ic]),g=new Set([Dn,Li,Ys,$s,Dc,Lc]),m=new Uint32Array(4),p=new Int32Array(4);let y=null,M=null;const v=[],b=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=mi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const w=this;let A=!1;this._outputColorSpace=on;let C=0,S=0,_=null,P=-1,D=null;const I=new Me,U=new Me;let B=null;const V=new Yt(0);let $=0,X=e.width,et=e.height,Y=1,ft=null,Mt=null;const Ct=new Me(0,0,X,et),Wt=new Me(0,0,X,et);let $t=!1;const K=new kc;let J=!1,ht=!1;const wt=new Qt,xt=new E,Ft=new Me,le={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Xt=!1;function ue(){return _===null?Y:1}let N=n;function qt(R,z){return e.getContext(R,z)}try{const R={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${er}`),e.addEventListener("webglcontextlost",nt,!1),e.addEventListener("webglcontextrestored",j,!1),e.addEventListener("webglcontextcreationerror",gt,!1),N===null){const z="webgl2";if(N=qt(z,R),N===null)throw qt(z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw R("WebGLRenderer: "+R.message),R}let kt,te,mt,oe,yt,Bt,L,T,H,Z,Q,q,St,ct,Et,vt,tt,st,Dt,At,dt,Nt,F,lt;function rt(){kt=new Qm(N),kt.init(),Nt=new Ng(N,kt),te=new Wm(N,kt,t,Nt),mt=new Ig(N,kt),te.reversedDepthBuffer&&d&&mt.buffers.depth.setReversed(!0),oe=new nx(N),yt=new yg,Bt=new Ug(N,kt,mt,yt,te,Nt,oe),L=new qm(w),T=new Jm(w),H=new ap(N),F=new Hm(N,H),Z=new tx(N,H,oe,F),Q=new sx(N,Z,H,oe),Dt=new ix(N,te,Bt),vt=new Xm(yt),q=new vg(w,L,T,kt,te,F,vt),St=new kg(w,yt),ct=new Sg,Et=new Rg(kt),st=new km(w,L,T,mt,Q,f,c),tt=new Dg(w,Q,te),lt=new Hg(N,oe,te,mt),At=new Gm(N,kt,oe),dt=new ex(N,kt,oe),oe.programs=q.programs,w.capabilities=te,w.extensions=kt,w.properties=yt,w.renderLists=ct,w.shadowMap=tt,w.state=mt,w.info=oe}rt();const at=new zg(w,N);this.xr=at,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const R=kt.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=kt.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(R){R!==void 0&&(Y=R,this.setSize(X,et,!1))},this.getSize=function(R){return R.set(X,et)},this.setSize=function(R,z,G=!0){if(at.isPresenting){Ut("WebGLRenderer: Can't change size while VR device is presenting.");return}X=R,et=z,e.width=Math.floor(R*Y),e.height=Math.floor(z*Y),G===!0&&(e.style.width=R+"px",e.style.height=z+"px"),this.setViewport(0,0,R,z)},this.getDrawingBufferSize=function(R){return R.set(X*Y,et*Y).floor()},this.setDrawingBufferSize=function(R,z,G){X=R,et=z,Y=G,e.width=Math.floor(R*G),e.height=Math.floor(z*G),this.setViewport(0,0,R,z)},this.getCurrentViewport=function(R){return R.copy(I)},this.getViewport=function(R){return R.copy(Ct)},this.setViewport=function(R,z,G,W){R.isVector4?Ct.set(R.x,R.y,R.z,R.w):Ct.set(R,z,G,W),mt.viewport(I.copy(Ct).multiplyScalar(Y).round())},this.getScissor=function(R){return R.copy(Wt)},this.setScissor=function(R,z,G,W){R.isVector4?Wt.set(R.x,R.y,R.z,R.w):Wt.set(R,z,G,W),mt.scissor(U.copy(Wt).multiplyScalar(Y).round())},this.getScissorTest=function(){return $t},this.setScissorTest=function(R){mt.setScissorTest($t=R)},this.setOpaqueSort=function(R){ft=R},this.setTransparentSort=function(R){Mt=R},this.getClearColor=function(R){return R.copy(st.getClearColor())},this.setClearColor=function(){st.setClearColor(...arguments)},this.getClearAlpha=function(){return st.getClearAlpha()},this.setClearAlpha=function(){st.setClearAlpha(...arguments)},this.clear=function(R=!0,z=!0,G=!0){let W=0;if(R){let k=!1;if(_!==null){const it=_.texture.format;k=x.has(it)}if(k){const it=_.texture.type,ut=g.has(it),_t=st.getClearColor(),pt=st.getClearAlpha(),Pt=_t.r,Lt=_t.g,bt=_t.b;ut?(m[0]=Pt,m[1]=Lt,m[2]=bt,m[3]=pt,N.clearBufferuiv(N.COLOR,0,m)):(p[0]=Pt,p[1]=Lt,p[2]=bt,p[3]=pt,N.clearBufferiv(N.COLOR,0,p))}else W|=N.COLOR_BUFFER_BIT}z&&(W|=N.DEPTH_BUFFER_BIT),G&&(W|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",nt,!1),e.removeEventListener("webglcontextrestored",j,!1),e.removeEventListener("webglcontextcreationerror",gt,!1),st.dispose(),ct.dispose(),Et.dispose(),yt.dispose(),L.dispose(),T.dispose(),Q.dispose(),F.dispose(),lt.dispose(),q.dispose(),at.dispose(),at.removeEventListener("sessionstart",nl),at.removeEventListener("sessionend",il),vi.stop()};function nt(R){R.preventDefault(),oa("WebGLRenderer: Context Lost."),A=!0}function j(){oa("WebGLRenderer: Context Restored."),A=!1;const R=oe.autoReset,z=tt.enabled,G=tt.autoUpdate,W=tt.needsUpdate,k=tt.type;rt(),oe.autoReset=R,tt.enabled=z,tt.autoUpdate=G,tt.needsUpdate=W,tt.type=k}function gt(R){ge("WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function Ot(R){const z=R.target;z.removeEventListener("dispose",Ot),de(z)}function de(R){ie(R),yt.remove(R)}function ie(R){const z=yt.get(R).programs;z!==void 0&&(z.forEach(function(G){q.releaseProgram(G)}),R.isShaderMaterial&&q.releaseShaderCache(R))}this.renderBufferDirect=function(R,z,G,W,k,it){z===null&&(z=le);const ut=k.isMesh&&k.matrixWorld.determinant()<0,_t=Qh(R,z,G,W,k);mt.setMaterial(W,ut);let pt=G.index,Pt=1;if(W.wireframe===!0){if(pt=Z.getWireframeAttribute(G),pt===void 0)return;Pt=2}const Lt=G.drawRange,bt=G.attributes.position;let Kt=Lt.start*Pt,se=(Lt.start+Lt.count)*Pt;it!==null&&(Kt=Math.max(Kt,it.start*Pt),se=Math.min(se,(it.start+it.count)*Pt)),pt!==null?(Kt=Math.max(Kt,0),se=Math.min(se,pt.count)):bt!=null&&(Kt=Math.max(Kt,0),se=Math.min(se,bt.count));const _e=se-Kt;if(_e<0||_e===1/0)return;F.setup(k,W,_t,G,pt);let ve,ce=At;if(pt!==null&&(ve=H.get(pt),ce=dt,ce.setIndex(ve)),k.isMesh)W.wireframe===!0?(mt.setLineWidth(W.wireframeLinewidth*ue()),ce.setMode(N.LINES)):ce.setMode(N.TRIANGLES);else if(k.isLine){let Tt=W.linewidth;Tt===void 0&&(Tt=1),mt.setLineWidth(Tt*ue()),k.isLineSegments?ce.setMode(N.LINES):k.isLineLoop?ce.setMode(N.LINE_LOOP):ce.setMode(N.LINE_STRIP)}else k.isPoints?ce.setMode(N.POINTS):k.isSprite&&ce.setMode(N.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)js("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ce.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(kt.get("WEBGL_multi_draw"))ce.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{const Tt=k._multiDrawStarts,me=k._multiDrawCounts,Zt=k._multiDrawCount,en=pt?H.get(pt).bytesPerElement:1,Fi=yt.get(W).currentProgram.getUniforms();for(let nn=0;nn<Zt;nn++)Fi.setValue(N,"_gl_DrawID",nn),ce.render(Tt[nn]/en,me[nn])}else if(k.isInstancedMesh)ce.renderInstances(Kt,_e,k.count);else if(G.isInstancedBufferGeometry){const Tt=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,me=Math.min(G.instanceCount,Tt);ce.renderInstances(Kt,_e,me)}else ce.render(Kt,_e)};function En(R,z,G){R.transparent===!0&&R.side===fn&&R.forceSinglePass===!1?(R.side=Ye,R.needsUpdate=!0,rr(R,z,G),R.side=Pn,R.needsUpdate=!0,rr(R,z,G),R.side=fn):rr(R,z,G)}this.compile=function(R,z,G=null){G===null&&(G=R),M=Et.get(G),M.init(z),b.push(M),G.traverseVisible(function(k){k.isLight&&k.layers.test(z.layers)&&(M.pushLight(k),k.castShadow&&M.pushShadow(k))}),R!==G&&R.traverseVisible(function(k){k.isLight&&k.layers.test(z.layers)&&(M.pushLight(k),k.castShadow&&M.pushShadow(k))}),M.setupLights();const W=new Set;return R.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;const it=k.material;if(it)if(Array.isArray(it))for(let ut=0;ut<it.length;ut++){const _t=it[ut];En(_t,G,k),W.add(_t)}else En(it,G,k),W.add(it)}),M=b.pop(),W},this.compileAsync=function(R,z,G=null){const W=this.compile(R,z,G);return new Promise(k=>{function it(){if(W.forEach(function(ut){yt.get(ut).currentProgram.isReady()&&W.delete(ut)}),W.size===0){k(R);return}setTimeout(it,10)}kt.get("KHR_parallel_shader_compile")!==null?it():setTimeout(it,10)})};let xn=null;function Jh(R){xn&&xn(R)}function nl(){vi.stop()}function il(){vi.start()}const vi=new Ch;vi.setAnimationLoop(Jh),typeof self<"u"&&vi.setContext(self),this.setAnimationLoop=function(R){xn=R,at.setAnimationLoop(R),R===null?vi.stop():vi.start()},at.addEventListener("sessionstart",nl),at.addEventListener("sessionend",il),this.render=function(R,z){if(z!==void 0&&z.isCamera!==!0){ge("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),at.enabled===!0&&at.isPresenting===!0&&(at.cameraAutoUpdate===!0&&at.updateCamera(z),z=at.getCamera()),R.isScene===!0&&R.onBeforeRender(w,R,z,_),M=Et.get(R,b.length),M.init(z),b.push(M),wt.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),K.setFromProjectionMatrix(wt,Cn,z.reversedDepth),ht=this.localClippingEnabled,J=vt.init(this.clippingPlanes,ht),y=ct.get(R,v.length),y.init(),v.push(y),at.enabled===!0&&at.isPresenting===!0){const it=w.xr.getDepthSensingMesh();it!==null&&ba(it,z,-1/0,w.sortObjects)}ba(R,z,0,w.sortObjects),y.finish(),w.sortObjects===!0&&y.sort(ft,Mt),Xt=at.enabled===!1||at.isPresenting===!1||at.hasDepthSensing()===!1,Xt&&st.addToRenderList(y,R),this.info.render.frame++,J===!0&&vt.beginShadows();const G=M.state.shadowsArray;tt.render(G,R,z),J===!0&&vt.endShadows(),this.info.autoReset===!0&&this.info.reset();const W=y.opaque,k=y.transmissive;if(M.setupLights(),z.isArrayCamera){const it=z.cameras;if(k.length>0)for(let ut=0,_t=it.length;ut<_t;ut++){const pt=it[ut];rl(W,k,R,pt)}Xt&&st.render(R);for(let ut=0,_t=it.length;ut<_t;ut++){const pt=it[ut];sl(y,R,pt,pt.viewport)}}else k.length>0&&rl(W,k,R,z),Xt&&st.render(R),sl(y,R,z);_!==null&&S===0&&(Bt.updateMultisampleRenderTarget(_),Bt.updateRenderTargetMipmap(_)),R.isScene===!0&&R.onAfterRender(w,R,z),F.resetDefaultState(),P=-1,D=null,b.pop(),b.length>0?(M=b[b.length-1],J===!0&&vt.setGlobalState(w.clippingPlanes,M.state.camera)):M=null,v.pop(),v.length>0?y=v[v.length-1]:y=null};function ba(R,z,G,W){if(R.visible===!1)return;if(R.layers.test(z.layers)){if(R.isGroup)G=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(z);else if(R.isLight)M.pushLight(R),R.castShadow&&M.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||K.intersectsSprite(R)){W&&Ft.setFromMatrixPosition(R.matrixWorld).applyMatrix4(wt);const ut=Q.update(R),_t=R.material;_t.visible&&y.push(R,ut,_t,G,Ft.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||K.intersectsObject(R))){const ut=Q.update(R),_t=R.material;if(W&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),Ft.copy(R.boundingSphere.center)):(ut.boundingSphere===null&&ut.computeBoundingSphere(),Ft.copy(ut.boundingSphere.center)),Ft.applyMatrix4(R.matrixWorld).applyMatrix4(wt)),Array.isArray(_t)){const pt=ut.groups;for(let Pt=0,Lt=pt.length;Pt<Lt;Pt++){const bt=pt[Pt],Kt=_t[bt.materialIndex];Kt&&Kt.visible&&y.push(R,ut,Kt,G,Ft.z,bt)}}else _t.visible&&y.push(R,ut,_t,G,Ft.z,null)}}const it=R.children;for(let ut=0,_t=it.length;ut<_t;ut++)ba(it[ut],z,G,W)}function sl(R,z,G,W){const{opaque:k,transmissive:it,transparent:ut}=R;M.setupLightsView(G),J===!0&&vt.setGlobalState(w.clippingPlanes,G),W&&mt.viewport(I.copy(W)),k.length>0&&sr(k,z,G),it.length>0&&sr(it,z,G),ut.length>0&&sr(ut,z,G),mt.buffers.depth.setTest(!0),mt.buffers.depth.setMask(!0),mt.buffers.color.setMask(!0),mt.setPolygonOffset(!1)}function rl(R,z,G,W){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;M.state.transmissionRenderTarget[W.id]===void 0&&(M.state.transmissionRenderTarget[W.id]=new Ui(1,1,{generateMipmaps:!0,type:kt.has("EXT_color_buffer_half_float")||kt.has("EXT_color_buffer_float")?Rn:Dn,minFilter:di,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:jt.workingColorSpace}));const it=M.state.transmissionRenderTarget[W.id],ut=W.viewport||I;it.setSize(ut.z*w.transmissionResolutionScale,ut.w*w.transmissionResolutionScale);const _t=w.getRenderTarget(),pt=w.getActiveCubeFace(),Pt=w.getActiveMipmapLevel();w.setRenderTarget(it),w.getClearColor(V),$=w.getClearAlpha(),$<1&&w.setClearColor(16777215,.5),w.clear(),Xt&&st.render(G);const Lt=w.toneMapping;w.toneMapping=mi;const bt=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),M.setupLightsView(W),J===!0&&vt.setGlobalState(w.clippingPlanes,W),sr(R,G,W),Bt.updateMultisampleRenderTarget(it),Bt.updateRenderTargetMipmap(it),kt.has("WEBGL_multisampled_render_to_texture")===!1){let Kt=!1;for(let se=0,_e=z.length;se<_e;se++){const ve=z[se],{object:ce,geometry:Tt,material:me,group:Zt}=ve;if(me.side===fn&&ce.layers.test(W.layers)){const en=me.side;me.side=Ye,me.needsUpdate=!0,al(ce,G,W,Tt,me,Zt),me.side=en,me.needsUpdate=!0,Kt=!0}}Kt===!0&&(Bt.updateMultisampleRenderTarget(it),Bt.updateRenderTargetMipmap(it))}w.setRenderTarget(_t,pt,Pt),w.setClearColor(V,$),bt!==void 0&&(W.viewport=bt),w.toneMapping=Lt}function sr(R,z,G){const W=z.isScene===!0?z.overrideMaterial:null;for(let k=0,it=R.length;k<it;k++){const ut=R[k],{object:_t,geometry:pt,group:Pt}=ut;let Lt=ut.material;Lt.allowOverride===!0&&W!==null&&(Lt=W),_t.layers.test(G.layers)&&al(_t,z,G,pt,Lt,Pt)}}function al(R,z,G,W,k,it){R.onBeforeRender(w,z,G,W,k,it),R.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),k.onBeforeRender(w,z,G,W,R,it),k.transparent===!0&&k.side===fn&&k.forceSinglePass===!1?(k.side=Ye,k.needsUpdate=!0,w.renderBufferDirect(G,z,W,k,R,it),k.side=Pn,k.needsUpdate=!0,w.renderBufferDirect(G,z,W,k,R,it),k.side=fn):w.renderBufferDirect(G,z,W,k,R,it),R.onAfterRender(w,z,G,W,k,it)}function rr(R,z,G){z.isScene!==!0&&(z=le);const W=yt.get(R),k=M.state.lights,it=M.state.shadowsArray,ut=k.state.version,_t=q.getParameters(R,k.state,it,z,G),pt=q.getProgramCacheKey(_t);let Pt=W.programs;W.environment=R.isMeshStandardMaterial?z.environment:null,W.fog=z.fog,W.envMap=(R.isMeshStandardMaterial?T:L).get(R.envMap||W.environment),W.envMapRotation=W.environment!==null&&R.envMap===null?z.environmentRotation:R.envMapRotation,Pt===void 0&&(R.addEventListener("dispose",Ot),Pt=new Map,W.programs=Pt);let Lt=Pt.get(pt);if(Lt!==void 0){if(W.currentProgram===Lt&&W.lightsStateVersion===ut)return cl(R,_t),Lt}else _t.uniforms=q.getUniforms(R),R.onBeforeCompile(_t,w),Lt=q.acquireProgram(_t,pt),Pt.set(pt,Lt),W.uniforms=_t.uniforms;const bt=W.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(bt.clippingPlanes=vt.uniform),cl(R,_t),W.needsLights=ed(R),W.lightsStateVersion=ut,W.needsLights&&(bt.ambientLightColor.value=k.state.ambient,bt.lightProbe.value=k.state.probe,bt.directionalLights.value=k.state.directional,bt.directionalLightShadows.value=k.state.directionalShadow,bt.spotLights.value=k.state.spot,bt.spotLightShadows.value=k.state.spotShadow,bt.rectAreaLights.value=k.state.rectArea,bt.ltc_1.value=k.state.rectAreaLTC1,bt.ltc_2.value=k.state.rectAreaLTC2,bt.pointLights.value=k.state.point,bt.pointLightShadows.value=k.state.pointShadow,bt.hemisphereLights.value=k.state.hemi,bt.directionalShadowMap.value=k.state.directionalShadowMap,bt.directionalShadowMatrix.value=k.state.directionalShadowMatrix,bt.spotShadowMap.value=k.state.spotShadowMap,bt.spotLightMatrix.value=k.state.spotLightMatrix,bt.spotLightMap.value=k.state.spotLightMap,bt.pointShadowMap.value=k.state.pointShadowMap,bt.pointShadowMatrix.value=k.state.pointShadowMatrix),W.currentProgram=Lt,W.uniformsList=null,Lt}function ol(R){if(R.uniformsList===null){const z=R.currentProgram.getUniforms();R.uniformsList=ta.seqWithValue(z.seq,R.uniforms)}return R.uniformsList}function cl(R,z){const G=yt.get(R);G.outputColorSpace=z.outputColorSpace,G.batching=z.batching,G.batchingColor=z.batchingColor,G.instancing=z.instancing,G.instancingColor=z.instancingColor,G.instancingMorph=z.instancingMorph,G.skinning=z.skinning,G.morphTargets=z.morphTargets,G.morphNormals=z.morphNormals,G.morphColors=z.morphColors,G.morphTargetsCount=z.morphTargetsCount,G.numClippingPlanes=z.numClippingPlanes,G.numIntersection=z.numClipIntersection,G.vertexAlphas=z.vertexAlphas,G.vertexTangents=z.vertexTangents,G.toneMapping=z.toneMapping}function Qh(R,z,G,W,k){z.isScene!==!0&&(z=le),Bt.resetTextureUnits();const it=z.fog,ut=W.isMeshStandardMaterial?z.environment:null,_t=_===null?w.outputColorSpace:_.isXRRenderTarget===!0?_.texture.colorSpace:Ii,pt=(W.isMeshStandardMaterial?T:L).get(W.envMap||ut),Pt=W.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Lt=!!G.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),bt=!!G.morphAttributes.position,Kt=!!G.morphAttributes.normal,se=!!G.morphAttributes.color;let _e=mi;W.toneMapped&&(_===null||_.isXRRenderTarget===!0)&&(_e=w.toneMapping);const ve=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,ce=ve!==void 0?ve.length:0,Tt=yt.get(W),me=M.state.lights;if(J===!0&&(ht===!0||R!==D)){const Ge=R===D&&W.id===P;vt.setState(W,R,Ge)}let Zt=!1;W.version===Tt.__version?(Tt.needsLights&&Tt.lightsStateVersion!==me.state.version||Tt.outputColorSpace!==_t||k.isBatchedMesh&&Tt.batching===!1||!k.isBatchedMesh&&Tt.batching===!0||k.isBatchedMesh&&Tt.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&Tt.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&Tt.instancing===!1||!k.isInstancedMesh&&Tt.instancing===!0||k.isSkinnedMesh&&Tt.skinning===!1||!k.isSkinnedMesh&&Tt.skinning===!0||k.isInstancedMesh&&Tt.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&Tt.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&Tt.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&Tt.instancingMorph===!1&&k.morphTexture!==null||Tt.envMap!==pt||W.fog===!0&&Tt.fog!==it||Tt.numClippingPlanes!==void 0&&(Tt.numClippingPlanes!==vt.numPlanes||Tt.numIntersection!==vt.numIntersection)||Tt.vertexAlphas!==Pt||Tt.vertexTangents!==Lt||Tt.morphTargets!==bt||Tt.morphNormals!==Kt||Tt.morphColors!==se||Tt.toneMapping!==_e||Tt.morphTargetsCount!==ce)&&(Zt=!0):(Zt=!0,Tt.__version=W.version);let en=Tt.currentProgram;Zt===!0&&(en=rr(W,z,k));let Fi=!1,nn=!1,Es=!1;const xe=en.getUniforms(),Ke=Tt.uniforms;if(mt.useProgram(en.program)&&(Fi=!0,nn=!0,Es=!0),W.id!==P&&(P=W.id,nn=!0),Fi||D!==R){mt.buffers.depth.getReversed()&&R.reversedDepth!==!0&&(R._reversedDepth=!0,R.updateProjectionMatrix()),xe.setValue(N,"projectionMatrix",R.projectionMatrix),xe.setValue(N,"viewMatrix",R.matrixWorldInverse);const Ze=xe.map.cameraPosition;Ze!==void 0&&Ze.setValue(N,xt.setFromMatrixPosition(R.matrixWorld)),te.logarithmicDepthBuffer&&xe.setValue(N,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&xe.setValue(N,"isOrthographic",R.isOrthographicCamera===!0),D!==R&&(D=R,nn=!0,Es=!0)}if(k.isSkinnedMesh){xe.setOptional(N,k,"bindMatrix"),xe.setOptional(N,k,"bindMatrixInverse");const Ge=k.skeleton;Ge&&(Ge.boneTexture===null&&Ge.computeBoneTexture(),xe.setValue(N,"boneTexture",Ge.boneTexture,Bt))}k.isBatchedMesh&&(xe.setOptional(N,k,"batchingTexture"),xe.setValue(N,"batchingTexture",k._matricesTexture,Bt),xe.setOptional(N,k,"batchingIdTexture"),xe.setValue(N,"batchingIdTexture",k._indirectTexture,Bt),xe.setOptional(N,k,"batchingColorTexture"),k._colorsTexture!==null&&xe.setValue(N,"batchingColorTexture",k._colorsTexture,Bt));const ln=G.morphAttributes;if((ln.position!==void 0||ln.normal!==void 0||ln.color!==void 0)&&Dt.update(k,G,en),(nn||Tt.receiveShadow!==k.receiveShadow)&&(Tt.receiveShadow=k.receiveShadow,xe.setValue(N,"receiveShadow",k.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(Ke.envMap.value=pt,Ke.flipEnvMap.value=pt.isCubeTexture&&pt.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&z.environment!==null&&(Ke.envMapIntensity.value=z.environmentIntensity),Ke.dfgLUT!==void 0&&(Ke.dfgLUT.value=Wg()),nn&&(xe.setValue(N,"toneMappingExposure",w.toneMappingExposure),Tt.needsLights&&td(Ke,Es),it&&W.fog===!0&&St.refreshFogUniforms(Ke,it),St.refreshMaterialUniforms(Ke,W,Y,et,M.state.transmissionRenderTarget[R.id]),ta.upload(N,ol(Tt),Ke,Bt)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(ta.upload(N,ol(Tt),Ke,Bt),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&xe.setValue(N,"center",k.center),xe.setValue(N,"modelViewMatrix",k.modelViewMatrix),xe.setValue(N,"normalMatrix",k.normalMatrix),xe.setValue(N,"modelMatrix",k.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const Ge=W.uniformsGroups;for(let Ze=0,wa=Ge.length;Ze<wa;Ze++){const yi=Ge[Ze];lt.update(yi,en),lt.bind(yi,en)}}return en}function td(R,z){R.ambientLightColor.needsUpdate=z,R.lightProbe.needsUpdate=z,R.directionalLights.needsUpdate=z,R.directionalLightShadows.needsUpdate=z,R.pointLights.needsUpdate=z,R.pointLightShadows.needsUpdate=z,R.spotLights.needsUpdate=z,R.spotLightShadows.needsUpdate=z,R.rectAreaLights.needsUpdate=z,R.hemisphereLights.needsUpdate=z}function ed(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return S},this.getRenderTarget=function(){return _},this.setRenderTargetTextures=function(R,z,G){const W=yt.get(R);W.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),yt.get(R.texture).__webglTexture=z,yt.get(R.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:G,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,z){const G=yt.get(R);G.__webglFramebuffer=z,G.__useDefaultFramebuffer=z===void 0};const nd=N.createFramebuffer();this.setRenderTarget=function(R,z=0,G=0){_=R,C=z,S=G;let W=!0,k=null,it=!1,ut=!1;if(R){const pt=yt.get(R);if(pt.__useDefaultFramebuffer!==void 0)mt.bindFramebuffer(N.FRAMEBUFFER,null),W=!1;else if(pt.__webglFramebuffer===void 0)Bt.setupRenderTarget(R);else if(pt.__hasExternalTextures)Bt.rebindTextures(R,yt.get(R.texture).__webglTexture,yt.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const bt=R.depthTexture;if(pt.__boundDepthTexture!==bt){if(bt!==null&&yt.has(bt)&&(R.width!==bt.image.width||R.height!==bt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Bt.setupDepthRenderbuffer(R)}}const Pt=R.texture;(Pt.isData3DTexture||Pt.isDataArrayTexture||Pt.isCompressedArrayTexture)&&(ut=!0);const Lt=yt.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(Lt[z])?k=Lt[z][G]:k=Lt[z],it=!0):R.samples>0&&Bt.useMultisampledRTT(R)===!1?k=yt.get(R).__webglMultisampledFramebuffer:Array.isArray(Lt)?k=Lt[G]:k=Lt,I.copy(R.viewport),U.copy(R.scissor),B=R.scissorTest}else I.copy(Ct).multiplyScalar(Y).floor(),U.copy(Wt).multiplyScalar(Y).floor(),B=$t;if(G!==0&&(k=nd),mt.bindFramebuffer(N.FRAMEBUFFER,k)&&W&&mt.drawBuffers(R,k),mt.viewport(I),mt.scissor(U),mt.setScissorTest(B),it){const pt=yt.get(R.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+z,pt.__webglTexture,G)}else if(ut){const pt=z;for(let Pt=0;Pt<R.textures.length;Pt++){const Lt=yt.get(R.textures[Pt]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+Pt,Lt.__webglTexture,G,pt)}}else if(R!==null&&G!==0){const pt=yt.get(R.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,pt.__webglTexture,G)}P=-1},this.readRenderTargetPixels=function(R,z,G,W,k,it,ut,_t=0){if(!(R&&R.isWebGLRenderTarget)){ge("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let pt=yt.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&ut!==void 0&&(pt=pt[ut]),pt){mt.bindFramebuffer(N.FRAMEBUFFER,pt);try{const Pt=R.textures[_t],Lt=Pt.format,bt=Pt.type;if(!te.textureFormatReadable(Lt)){ge("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!te.textureTypeReadable(bt)){ge("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=R.width-W&&G>=0&&G<=R.height-k&&(R.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+_t),N.readPixels(z,G,W,k,Nt.convert(Lt),Nt.convert(bt),it))}finally{const Pt=_!==null?yt.get(_).__webglFramebuffer:null;mt.bindFramebuffer(N.FRAMEBUFFER,Pt)}}},this.readRenderTargetPixelsAsync=async function(R,z,G,W,k,it,ut,_t=0){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let pt=yt.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&ut!==void 0&&(pt=pt[ut]),pt)if(z>=0&&z<=R.width-W&&G>=0&&G<=R.height-k){mt.bindFramebuffer(N.FRAMEBUFFER,pt);const Pt=R.textures[_t],Lt=Pt.format,bt=Pt.type;if(!te.textureFormatReadable(Lt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!te.textureTypeReadable(bt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Kt=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,Kt),N.bufferData(N.PIXEL_PACK_BUFFER,it.byteLength,N.STREAM_READ),R.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+_t),N.readPixels(z,G,W,k,Nt.convert(Lt),Nt.convert(bt),0);const se=_!==null?yt.get(_).__webglFramebuffer:null;mt.bindFramebuffer(N.FRAMEBUFFER,se);const _e=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await Xd(N,_e,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,Kt),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,it),N.deleteBuffer(Kt),N.deleteSync(_e),it}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(R,z=null,G=0){const W=Math.pow(2,-G),k=Math.floor(R.image.width*W),it=Math.floor(R.image.height*W),ut=z!==null?z.x:0,_t=z!==null?z.y:0;Bt.setTexture2D(R,0),N.copyTexSubImage2D(N.TEXTURE_2D,G,0,0,ut,_t,k,it),mt.unbindTexture()};const id=N.createFramebuffer(),sd=N.createFramebuffer();this.copyTextureToTexture=function(R,z,G=null,W=null,k=0,it=null){it===null&&(k!==0?(js("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),it=k,k=0):it=0);let ut,_t,pt,Pt,Lt,bt,Kt,se,_e;const ve=R.isCompressedTexture?R.mipmaps[it]:R.image;if(G!==null)ut=G.max.x-G.min.x,_t=G.max.y-G.min.y,pt=G.isBox3?G.max.z-G.min.z:1,Pt=G.min.x,Lt=G.min.y,bt=G.isBox3?G.min.z:0;else{const ln=Math.pow(2,-k);ut=Math.floor(ve.width*ln),_t=Math.floor(ve.height*ln),R.isDataArrayTexture?pt=ve.depth:R.isData3DTexture?pt=Math.floor(ve.depth*ln):pt=1,Pt=0,Lt=0,bt=0}W!==null?(Kt=W.x,se=W.y,_e=W.z):(Kt=0,se=0,_e=0);const ce=Nt.convert(z.format),Tt=Nt.convert(z.type);let me;z.isData3DTexture?(Bt.setTexture3D(z,0),me=N.TEXTURE_3D):z.isDataArrayTexture||z.isCompressedArrayTexture?(Bt.setTexture2DArray(z,0),me=N.TEXTURE_2D_ARRAY):(Bt.setTexture2D(z,0),me=N.TEXTURE_2D),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,z.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,z.unpackAlignment);const Zt=N.getParameter(N.UNPACK_ROW_LENGTH),en=N.getParameter(N.UNPACK_IMAGE_HEIGHT),Fi=N.getParameter(N.UNPACK_SKIP_PIXELS),nn=N.getParameter(N.UNPACK_SKIP_ROWS),Es=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,ve.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,ve.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Pt),N.pixelStorei(N.UNPACK_SKIP_ROWS,Lt),N.pixelStorei(N.UNPACK_SKIP_IMAGES,bt);const xe=R.isDataArrayTexture||R.isData3DTexture,Ke=z.isDataArrayTexture||z.isData3DTexture;if(R.isDepthTexture){const ln=yt.get(R),Ge=yt.get(z),Ze=yt.get(ln.__renderTarget),wa=yt.get(Ge.__renderTarget);mt.bindFramebuffer(N.READ_FRAMEBUFFER,Ze.__webglFramebuffer),mt.bindFramebuffer(N.DRAW_FRAMEBUFFER,wa.__webglFramebuffer);for(let yi=0;yi<pt;yi++)xe&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,yt.get(R).__webglTexture,k,bt+yi),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,yt.get(z).__webglTexture,it,_e+yi)),N.blitFramebuffer(Pt,Lt,ut,_t,Kt,se,ut,_t,N.DEPTH_BUFFER_BIT,N.NEAREST);mt.bindFramebuffer(N.READ_FRAMEBUFFER,null),mt.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(k!==0||R.isRenderTargetTexture||yt.has(R)){const ln=yt.get(R),Ge=yt.get(z);mt.bindFramebuffer(N.READ_FRAMEBUFFER,id),mt.bindFramebuffer(N.DRAW_FRAMEBUFFER,sd);for(let Ze=0;Ze<pt;Ze++)xe?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,ln.__webglTexture,k,bt+Ze):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,ln.__webglTexture,k),Ke?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ge.__webglTexture,it,_e+Ze):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Ge.__webglTexture,it),k!==0?N.blitFramebuffer(Pt,Lt,ut,_t,Kt,se,ut,_t,N.COLOR_BUFFER_BIT,N.NEAREST):Ke?N.copyTexSubImage3D(me,it,Kt,se,_e+Ze,Pt,Lt,ut,_t):N.copyTexSubImage2D(me,it,Kt,se,Pt,Lt,ut,_t);mt.bindFramebuffer(N.READ_FRAMEBUFFER,null),mt.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else Ke?R.isDataTexture||R.isData3DTexture?N.texSubImage3D(me,it,Kt,se,_e,ut,_t,pt,ce,Tt,ve.data):z.isCompressedArrayTexture?N.compressedTexSubImage3D(me,it,Kt,se,_e,ut,_t,pt,ce,ve.data):N.texSubImage3D(me,it,Kt,se,_e,ut,_t,pt,ce,Tt,ve):R.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,it,Kt,se,ut,_t,ce,Tt,ve.data):R.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,it,Kt,se,ve.width,ve.height,ce,ve.data):N.texSubImage2D(N.TEXTURE_2D,it,Kt,se,ut,_t,ce,Tt,ve);N.pixelStorei(N.UNPACK_ROW_LENGTH,Zt),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,en),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Fi),N.pixelStorei(N.UNPACK_SKIP_ROWS,nn),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Es),it===0&&z.generateMipmaps&&N.generateMipmap(me),mt.unbindTexture()},this.initRenderTarget=function(R){yt.get(R).__webglFramebuffer===void 0&&Bt.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?Bt.setTextureCube(R,0):R.isData3DTexture?Bt.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?Bt.setTexture2DArray(R,0):Bt.setTexture2D(R,0),mt.unbindTexture()},this.resetState=function(){C=0,S=0,_=null,mt.reset(),F.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Cn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=jt._getDrawingBufferColorSpace(t),e.unpackColorSpace=jt._getUnpackColorSpace()}}const qg=new Set(["KeyW","KeyA","KeyS","KeyD"]);class Yg{constructor(t){this.domElement=t,this.keys=new Set,this.justPressed=new Set,this.mouseButtons=new Set,this.mouseButtonsJustPressed=new Set,this.pointerLocked=!1,this.lookDelta={x:0,y:0},this.handleKeyDown=this.handleKeyDown.bind(this),this.handleKeyUp=this.handleKeyUp.bind(this),this.handlePointerMove=this.handlePointerMove.bind(this),this.handlePointerLockChange=this.handlePointerLockChange.bind(this),this.handlePointerDown=this.handlePointerDown.bind(this),this.handleMouseDown=this.handleMouseDown.bind(this),this.handlePointerUp=this.handlePointerUp.bind(this),this.handleContextMenu=this.handleContextMenu.bind(this),window.addEventListener("keydown",this.handleKeyDown),window.addEventListener("keyup",this.handleKeyUp),window.addEventListener("pointermove",this.handlePointerMove),window.addEventListener("mousedown",this.handleMouseDown),window.addEventListener("mouseup",this.handlePointerUp),window.addEventListener("contextmenu",this.handleContextMenu),document.addEventListener("pointerlockchange",this.handlePointerLockChange),this.domElement.addEventListener("pointerdown",this.handlePointerDown)}destroy(){window.removeEventListener("keydown",this.handleKeyDown),window.removeEventListener("keyup",this.handleKeyUp),window.removeEventListener("pointermove",this.handlePointerMove),window.removeEventListener("mousedown",this.handleMouseDown),window.removeEventListener("mouseup",this.handlePointerUp),window.removeEventListener("contextmenu",this.handleContextMenu),document.removeEventListener("pointerlockchange",this.handlePointerLockChange),this.domElement.removeEventListener("pointerdown",this.handlePointerDown)}handleKeyDown(t){this.keys.has(t.code)||this.justPressed.add(t.code),this.keys.add(t.code),(qg.has(t.code)||t.code==="Space"||t.code==="ShiftLeft")&&t.preventDefault()}handleKeyUp(t){this.keys.delete(t.code)}handlePointerMove(t){this.pointerLocked&&(this.lookDelta.x+=t.movementX,this.lookDelta.y+=t.movementY)}handlePointerLockChange(){this.pointerLocked=document.pointerLockElement===this.domElement,this.pointerLocked||(this.mouseButtons.clear(),this.mouseButtonsJustPressed.clear())}handlePointerDown(t){if(!this.pointerLocked){this.domElement.requestPointerLock();return}this.registerMouseButton(t)}handleMouseDown(t){this.pointerLocked&&this.registerMouseButton(t)}registerMouseButton(t){this.mouseButtons.has(t.button)||this.mouseButtonsJustPressed.add(t.button),this.mouseButtons.add(t.button),t.preventDefault()}handlePointerUp(t){this.mouseButtons.delete(t.button)}handleContextMenu(t){this.pointerLocked&&t.preventDefault()}isPressed(t){return this.keys.has(t)}wasPressed(t){return this.justPressed.has(t)}isMouseButtonPressed(t){return this.mouseButtons.has(t)}consumeFrameState(){const t={lookDelta:{...this.lookDelta},mouseButtons:new Set(this.mouseButtons),justPressed:new Set(this.justPressed),mouseButtonsJustPressed:new Set(this.mouseButtonsJustPressed)};return this.lookDelta.x=0,this.lookDelta.y=0,this.justPressed.clear(),this.mouseButtonsJustPressed.clear(),t}}const $g=new E(0,.35,0),Kg=new E(0,1.2,0),Zg=new E;function jg(i,{isHeadshot:t=!1}={}){const e=document.createElement("canvas");e.width=128,e.height=64;const n=e.getContext("2d");n.clearRect(0,0,e.width,e.height),n.font='bold 34px "Segoe UI"',n.textAlign="center",n.textBaseline="middle",n.lineWidth=8,n.strokeStyle=t?"rgba(52, 8, 8, 0.92)":"rgba(20, 24, 30, 0.85)",n.fillStyle=t?"#ff6b6b":"#ffd37a",n.strokeText(String(i),e.width/2,e.height/2),n.fillText(String(i),e.width/2,e.height/2);const s=new bh(e);s.needsUpdate=!0;const r=new vh({map:s,transparent:!0,depthWrite:!1}),a=new Bf(r);return a.scale.set(.85,.42,1),a.userData.life=.6,a}function Jg(i,t,{isHeadshot:e=!1}={}){const n=jg(i,{isHeadshot:e});return n.position.copy(t??Zg.set(0,1.9,0)),n.position.add($g),n}function io(i,t,e){return t.filter(n=>(n.userData.life-=e,n.position.addScaledVector(Kg,e),n.material.opacity=Math.min(1,n.userData.life/.6),n.userData.life>0?!0:(n.material.map.dispose(),n.material.dispose(),i.remove(n),!1)))}const Uh=11435347,Nh=14136713,Qg=4926765,t_=7162699,Fh=16723245,Yc=328965,mc=328965;function an(i,t,e){const n=new ee(i,t);return n.position.copy(e),n.castShadow=!0,n.receiveShadow=!0,n}function e_(){const i=new Je,t=new ae({color:2501168,roughness:.74,metalness:.18}),e=new ae({color:8345397,roughness:.94,metalness:.02}),n=an(new Jt(.18,.14,.54),t,new E(0,0,0)),s=an(new Jt(.15,.1,.38),e,new E(0,-.01,-.43)),r=an(new Jt(.1,.1,.28),e,new E(.01,.01,.37)),a=an(new Qe(.02,.02,.48,10),t,new E(0,.01,-.82));a.rotation.x=Math.PI/2;const o=an(new Jt(.08,.22,.14),t,new E(.01,-.18,-.06));return o.rotation.z=.18,i.add(n,s,r,a,o),i.rotation.set(.02,.2,-.26),i.position.set(.38,1.32,.08),i}function n_(){const i=new Je,t=new ae({color:599e4,roughness:.97,metalness:.03}),e=new ae({color:Uh,roughness:.9,metalness:.02,emissive:16762231,emissiveIntensity:0}),n=new ae({color:Nh,roughness:.86,metalness:.02,emissive:16768942,emissiveIntensity:0}),s=new ae({color:Yc,roughness:.4,metalness:.05,emissive:Fh,emissiveIntensity:.18}),r=new ae({color:mc,roughness:.72,metalness:.02,emissive:mc,emissiveIntensity:0}),a=an(new Qe(.08,.08,2.2,12),t,new E(0,1.1,0)),o=an(new Qe(.36,.42,1.35,16),e,new E(0,1.45,0)),c=an(new xi(.24,18,16),n,new E(0,2.28,0)),l=an(new xi(.034,10,10),s,new E(-.085,2.31,.195)),u=an(new xi(.034,10,10),s,new E(.085,2.31,.195)),h=new Je;h.visible=!1;const d=an(new Jt(.12,.022,.03),r,new E(-.085,2.43,.205));d.rotation.z=-.34;const f=an(new Jt(.12,.022,.03),r,new E(.085,2.43,.205));f.rotation.z=.34,h.add(d,f);const x=an(new Qe(.44,.52,.18,18),t,new E(0,.09,0));return i.add(a,o,c,l,u,h,x,e_()),{group:i,shootables:[o,c],expressionGroup:h,materials:{base:t,body:e,head:n,eyes:s,brows:r}}}function pu(i,t){i.hitFlash=Math.max(0,i.hitFlash-t);const e=i.respawnTimer>0?0:i.hitFlash*8;i.bodyMaterial.emissiveIntensity=e,i.headMaterial.emissiveIntensity=e*.8;const n=i.respawnTimer<=0&&i.isAggro;i.eyeMaterial.color.setHex(n?Fh:Yc),i.eyeMaterial.emissiveIntensity=i.respawnTimer>0?.04:n?3.4:.18,i.browMaterial?.color.setHex(mc),i.browMaterial.emissiveIntensity=0,i.expressionGroup&&(i.expressionGroup.visible=n)}function i_(i){i.bodyMaterial.color.setHex(Qg),i.headMaterial.color.setHex(t_),i.expressionGroup&&(i.expressionGroup.visible=!1)}function s_(i){i.bodyMaterial.color.setHex(Uh),i.headMaterial.color.setHex(Nh),i.bodyMaterial.emissiveIntensity=0,i.headMaterial.emissiveIntensity=0,i.eyeMaterial.color.setHex(Yc),i.eyeMaterial.emissiveIntensity=.18,i.browMaterial.emissiveIntensity=0,i.expressionGroup&&(i.expressionGroup.visible=!1)}const is=new E,ss=new E,ai=new E,oi=new E,so=new E,mu=new E,ro=new E;function r_(i,t,e){const n=Math.atan2(Math.sin(t-i),Math.cos(t-i));return i+n*e}class Oh{constructor(t=new E){const e=n_();this.group=e.group,this.group.position.copy(t),this.spawnPoint=t.clone(),this.maxHealth=100,this.health=this.maxHealth,this.hitFlash=0,this.respawnDelay=1.2,this.respawnTimer=0,this.popups=[],this.radius=.42,this.height=2.2,this.moveSpeed=2.5,this.turnSpeed=7,this.detectionRange=32,this.preferredRange=0,this.wanderTime=0,this.wanderAngle=0,this.path=[],this.pathIndex=0,this.pathRepathTime=0,this.lastSeenPlayerPosition=new E,this.hasLastSeenPlayerPosition=!1,this.hasSightOnPlayer=!1,this.isAggro=!1,this.time=Math.random()*Math.PI*2,this.bodyMaterial=e.materials.body,this.headMaterial=e.materials.head,this.eyeMaterial=e.materials.eyes,this.browMaterial=e.materials.brows,this.expressionGroup=e.expressionGroup,this.shootables=e.shootables;const[n,s]=this.shootables;n.userData.damageMultiplier=1,s.userData.damageMultiplier=2,this.shootables.forEach(r=>{r.userData.damageReceiver=this})}getObject(){return this.group}getShootables(){return this.shootables}applyDamage(t,e=null,n=null){if(this.respawnTimer>0)return 0;const s=n?.object?.userData.damageMultiplier??1,r=s>1,a=t*s;this.health=Math.max(0,this.health-a),this.hitFlash=.18;const o=Jg(a,e,{isHeadshot:r});return this.group.worldToLocal(o.position),this.group.add(o),this.popups.push(o),this.health===0&&(this.respawnTimer=this.respawnDelay,i_(this)),a}update(t,e={}){if(this.time+=t,this.respawnTimer>0){pu(this,t),this.popups=io(this.group,this.popups,t),this.respawnTimer=Math.max(0,this.respawnTimer-t),this.respawnTimer===0&&(this.health=this.maxHealth,this.group.position.copy(this.spawnPoint),this.path=[],this.pathIndex=0,this.pathRepathTime=0,this.hasLastSeenPlayerPosition=!1,this.isAggro=!1,s_(this));return}this.updateMovement(t,e),pu(this,t),this.popups=io(this.group,this.popups,t)}updateMovement(t,{playerPosition:e=null,playerEyePosition:n=null,collisionWorld:s=null,navigationManager:r=null}={}){if(!e){this.hasSightOnPlayer=!1,this.isAggro=!1;return}const a=s?.getGroundHeightAt(this.group.position.x,this.group.position.z,this.group.position.y,.45)??0;this.group.position.y=a,ss.copy(e).sub(this.group.position),ss.y=0;const o=ss.length();mu.set(this.group.position.x,this.group.position.y+1.55,this.group.position.z),n?so.copy(n):so.set(e.x,e.y+1.55,e.z),this.hasSightOnPlayer=s?.hasLineOfSight(mu,so)??!0,this.hasSightOnPlayer&&(this.lastSeenPlayerPosition.copy(e),this.hasLastSeenPlayerPosition=!0);const c=o<=this.detectionRange&&this.hasSightOnPlayer;if(this.isAggro=c,r?.ready){this.updateNavigationMovement(t,{playerDetected:c,playerPosition:e,navigationManager:r,collisionWorld:s});return}this.updateFallbackMovement(t,{playerDetected:c,playerPosition:e,collisionWorld:s,floor:a})}updateNavigationMovement(t,{playerDetected:e,playerPosition:n,navigationManager:s,collisionWorld:r}){if(this.pathRepathTime=Math.max(0,this.pathRepathTime-t),e)this.pathRepathTime===0&&(this.path=s.computePath(this.group.position,n),this.pathIndex=this.path.length>1?1:0,this.pathRepathTime=.45);else if(this.wanderTime-=t,this.path.length===0||this.pathIndex>=this.path.length||this.wanderTime<=0){const o=s.getRandomPointAround(this.group.position,16)??s.getRandomPointAround(this.spawnPoint,22)??s.getRandomPoint();o&&(this.path=s.computePath(this.group.position,o),this.pathIndex=this.path.length>1?1:0,this.wanderTime=2.5+Math.random()*2.5)}if(this.hasLastSeenPlayerPosition&&!e&&this.path.length===0&&(this.path=s.computePath(this.group.position,this.lastSeenPlayerPosition),this.pathIndex=this.path.length>1?1:0,this.hasLastSeenPlayerPosition=!1),this.path.length===0||this.pathIndex>=this.path.length)return;if(ro.copy(this.path[this.pathIndex]),ro.y=this.group.position.y,ai.copy(ro).sub(this.group.position),ai.y=0,ai.lengthSq()<.25){this.pathIndex+=1,this.pathIndex>=this.path.length&&(this.path=[]);return}oi.copy(ai).normalize(),this.faceDirection(oi,t),is.copy(oi).multiplyScalar(this.moveSpeed*t);const a=r?r.move(this.group.position,this.radius,this.height,is):this.group.position.clone().add(is);this.group.position.x=a.x,this.group.position.z=a.z,this.group.position.y=r?.getGroundHeightAt(a.x,a.z,this.group.position.y,.45)??this.group.position.y}updateFallbackMovement(t,{playerDetected:e,playerPosition:n,collisionWorld:s,floor:r}){let a=!1;if(e?this.group.position.distanceTo(n)>this.preferredRange&&(oi.copy(ss).normalize(),a=!0):(this.wanderTime-=t,this.wanderTime<=0&&(this.wanderTime=1.6+Math.random()*1.8,this.wanderAngle=this.time*.7+Math.sin(this.time*1.3)*1.2),oi.set(Math.sin(this.wanderAngle),0,Math.cos(this.wanderAngle)),this.group.position.distanceToSquared(this.spawnPoint)>64&&(ai.copy(this.spawnPoint).sub(this.group.position),ai.y=0,ai.lengthSq()>.001&&oi.copy(ai).normalize()),a=!0),!a){e&&ss.lengthSq()>.001&&this.faceDirection(ss,t);return}this.faceDirection(oi,t),is.copy(oi).multiplyScalar(this.moveSpeed*t);const o=s?s.move(this.group.position,this.radius,this.height,is):this.group.position.clone().add(is);this.group.position.x=o.x,this.group.position.z=o.z,this.group.position.y=s?.getGroundHeightAt(o.x,o.z,this.group.position.y,.45)??r}faceDirection(t,e){if(t.lengthSq()<=1e-6)return;const n=Math.atan2(t.x,t.z);this.group.rotation.y=r_(this.group.rotation.y,n,Math.min(1,e*this.turnSpeed))}destroy(){this.popups=io(this.group,this.popups,1/0)}}function a_(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,c=new Ue;let l=0;for(let u=0;u<i.length;++u){const h=i[u];let d=0;if(e!==(h.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in h.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(h.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(o!==h.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in h.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(h.morphAttributes[f])}if(t){let f;if(e)f=h.index.count;else if(h.attributes.position!==void 0)f=h.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,f,u),l+=f}}if(e){let u=0;const h=[];for(let d=0;d<i.length;++d){const f=i[d].index;for(let x=0;x<f.count;++x)h.push(f.getX(x)+u);u+=i[d].attributes.position.count}c.setIndex(h)}for(const u in r){const h=xu(r[u]);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;c.setAttribute(u,h)}for(const u in a){const h=a[u][0].length;if(h===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[u]=[];for(let d=0;d<h;++d){const f=[];for(let g=0;g<a[u].length;++g)f.push(a[u][g][d]);const x=xu(f);if(!x)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;c.morphAttributes[u].push(x)}}return c}function xu(i){let t,e,n,s=-1,r=0;for(let l=0;l<i.length;++l){const u=i[l];if(t===void 0&&(t=u.array.constructor),t!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=u.itemSize),e!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=u.gpuType),s!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=u.count*e}const a=new t(r),o=new tn(a,e,n);let c=0;for(let l=0;l<i.length;++l){const u=i[l];if(u.isInterleavedBufferAttribute){const h=c/e;for(let d=0,f=u.count;d<f;d++)for(let x=0;x<e;x++){const g=u.getComponent(d,x);o.setComponent(d+h,x,g)}}else a.set(u.array,c);c+=u.count*e}return s!==void 0&&(o.gpuType=s),o}function o_({size:i,position:t,color:e,roughness:n=.85,metalness:s=.08}){const r=new ee(new Jt(i.x,i.y,i.z),new ae({color:e,roughness:n,metalness:s}));return r.position.copy(t),r.castShadow=!0,r.receiveShadow=!0,r}function Bh(i=new Je){const t=[],e=[],n=[],s=[];function r(h){return h&&s.push(h),h}function a(h){return h.updateMatrixWorld(!0),e.push(h.geometry.clone().applyMatrix4(h.matrixWorld)),h}function o(h,{shootable:d=!0,collision:f=!0}={}){return i.add(h),d&&t.push(h),f&&a(h),h}function c(h,d){return o(o_(h),d)}function l(h){return i.add(h.getObject()),t.push(...h.getShootables()),n.push(h),h}function u({spawnPoint:h,groundHeight:d=0}={}){return{scene:i,spawnPoint:h,groundHeight:d,collisionGeometry:e.length>0?a_(e,!1):null,shootables:t,targets:n,dispose(){s.forEach(f=>f.dispose?.())}}}return{group:i,shootables:t,targets:n,addBox:c,addMesh:o,addTarget:l,addDisposable:r,addCollisionFromMesh:a,finalize:u}}function gu(i,{label:t,color:e,position:n,rotation:s=0}){const{group:r}=i,a=new ee(new Gc(4.8,32),new ae({color:e,roughness:1,metalness:0,transparent:!0,opacity:.9}));a.rotation.x=-Math.PI/2,a.rotation.z=s,a.position.copy(n).setY(.05),r.add(a);const o=new ee(new Wc(5.15,5.8,32),new ae({color:15787732,roughness:1,metalness:0}));o.rotation.x=-Math.PI/2,o.rotation.z=s,o.position.copy(n).setY(.06),r.add(o);const c=document.createElement("canvas");c.width=256,c.height=256;const l=c.getContext("2d");l.clearRect(0,0,c.width,c.height),l.fillStyle="#f7efdf",l.font="bold 170px Segoe UI",l.textAlign="center",l.textBaseline="middle",l.fillText(t,c.width/2,c.height/2+8);const u=new bh(c);i.addDisposable(u);const h=new ee(new Jn(5.8,5.8),new _i({map:u,transparent:!0}));h.rotation.x=-Math.PI/2,h.rotation.z=s,h.position.copy(n).setY(.07),r.add(h)}function ao(i,{width:t,height:e,color:n,position:s,rotation:r=0}){const a=new ee(new Jn(t,e),new ae({color:n,roughness:1,metalness:0}));a.rotation.x=-Math.PI/2,a.rotation.z=r,a.position.copy(s).setY(.03),i.add(a)}function c_(){const i=Bh(),{group:t}=i,e=new ee(new Jn(104,88),new ae({color:7824719,roughness:.98,metalness:.02}));e.rotation.x=-Math.PI/2,e.receiveShadow=!0,t.add(e),i.shootables.push(e);const n=new ee(new Jt(104,1,88),new _i);n.position.set(0,-.5,0),i.addCollisionFromMesh(n);const s=new Rh(104,26,10716770,6376761);s.position.y=.02,t.add(s),ao(t,{width:7,height:54,color:7035206,position:new E(0,0,-4)}),ao(t,{width:12,height:14,color:7167305,position:new E(-24,0,-22),rotation:Math.PI/10}),ao(t,{width:12,height:14,color:6318435,position:new E(24,0,-22),rotation:-Math.PI/12}),[{size:new E(104,8,2),position:new E(0,4,-44),color:10257767},{size:new E(104,8,2),position:new E(0,4,44),color:10257767},{size:new E(2,8,88),position:new E(-52,4,0),color:9468254},{size:new E(2,8,88),position:new E(52,4,0),color:9468254}].forEach(g=>i.addBox(g)),[{size:new E(18,6,3),position:new E(-14,3,20),color:9269846},{size:new E(18,6,3),position:new E(14,3,20),color:9269846},{size:new E(3,6,18),position:new E(-22,3,12),color:8677711},{size:new E(3,6,18),position:new E(22,3,12),color:8677711},{size:new E(10,6,3),position:new E(0,3,7),color:8744018},{size:new E(3,6,18),position:new E(-10,3,-5),color:9270617},{size:new E(3,6,18),position:new E(10,3,-5),color:9270617},{size:new E(14,6,3),position:new E(-30,3,-3),color:10125666},{size:new E(14,6,3),position:new E(30,3,-3),color:7108464},{size:new E(3,6,20),position:new E(-37,3,-15),color:9862237},{size:new E(3,6,20),position:new E(37,3,-15),color:6713706},{size:new E(16,6,3),position:new E(-16,3,-33),color:9401946},{size:new E(16,6,3),position:new E(16,3,-33),color:7174001},{size:new E(8,5,3),position:new E(0,2.5,-22),color:9205081}].forEach(g=>i.addBox(g)),[{size:new E(5,2.4,5),position:new E(-24,1.2,-19),color:11506286},{size:new E(4,1.8,9),position:new E(-15,.9,-26),color:9401945},{size:new E(5,1.7,5),position:new E(-31,.85,-31),color:6122597},{size:new E(5,2.4,5),position:new E(24,1.2,-19),color:6385770},{size:new E(4,1.8,9),position:new E(15,.9,-26),color:7174773},{size:new E(5,1.7,5),position:new E(31,.85,-31),color:10849133},{size:new E(6,2.2,4),position:new E(0,1.1,-10),color:9270616},{size:new E(4,1.7,4),position:new E(-5,.85,-17),color:10191716},{size:new E(4,1.7,4),position:new E(5,.85,-17),color:7635322}].forEach(g=>i.addBox(g));const c=new ee(new Jt(11,.8,8),new ae({color:10586732,roughness:.9,metalness:.04}));c.position.set(-24,.4,-22),c.castShadow=!0,c.receiveShadow=!0,i.addMesh(c);const l=new ee(new Jt(11,.8,8),new ae({color:6582635,roughness:.9,metalness:.04}));l.position.set(24,.4,-22),l.castShadow=!0,l.receiveShadow=!0,i.addMesh(l);const u=new ee(new Jt(6,.7,12),new ae({color:8152398,roughness:.86,metalness:.08}));u.position.set(0,1.1,-6),u.castShadow=!0,u.receiveShadow=!0,i.addMesh(u);const h=new ee(new Jt(6,.5,8),new ae({color:10849130,roughness:.9,metalness:.03}));h.position.set(-8,.55,-6),h.rotation.z=.18,h.castShadow=!0,h.receiveShadow=!0,i.addMesh(h);const d=new ee(new Jt(6,.5,8),new ae({color:7305843,roughness:.9,metalness:.03}));d.position.set(8,.55,-6),d.rotation.z=-.18,d.castShadow=!0,d.receiveShadow=!0,i.addMesh(d),gu(i,{label:"A",color:13004596,position:new E(-24,0,-22),rotation:Math.PI/8}),gu(i,{label:"B",color:3247236,position:new E(24,0,-22),rotation:-Math.PI/10});const f=new E(0,0,31);return[new E(-23,.8,-20),new E(0,1.1,-6),new E(23,.8,-20)].forEach(g=>{const m=new Oh(g);i.addTarget(m)}),i.finalize({spawnPoint:f,groundHeight:0})}function l_(){const i=Bh(),{group:t}=i,e=new ee(new Jn(72,72),new ae({color:2107953,roughness:.97,metalness:.03}));e.rotation.x=-Math.PI/2,e.receiveShadow=!0,t.add(e),i.shootables.push(e);const n=new ee(new Jt(72,1,72),new _i);n.position.set(0,-.5,0),i.addCollisionFromMesh(n);const s=new Rh(72,36,5203832,2767172);s.position.y=.02,t.add(s);const r=new ee(new Jn(3.2,28),new ae({color:3360080,roughness:1,metalness:0}));r.rotation.x=-Math.PI/2,r.position.set(0,.03,-1),t.add(r),[{size:new E(72,6,2),position:new E(0,3,-36),color:5333357},{size:new E(72,6,2),position:new E(0,3,36),color:5333357},{size:new E(2,6,72),position:new E(-36,3,0),color:5004392},{size:new E(2,6,72),position:new E(36,3,0),color:5004392},{size:new E(16,4,1.4),position:new E(0,2,6),color:6978180},{size:new E(1.4,4,18),position:new E(-8,2,-4),color:6320508},{size:new E(1.4,4,18),position:new E(8,2,-10),color:6320508},{size:new E(10,2.6,6),position:new E(-15,1.3,-18),color:8088927},{size:new E(8,2.6,6),position:new E(13,1.3,-22),color:8088927},{size:new E(6,2.2,6),position:new E(0,1.1,-18),color:7438988},{size:new E(4,1.6,4),position:new E(-18,.8,10),color:9076071},{size:new E(4,1.6,4),position:new E(18,.8,12),color:9076071},{size:new E(12,3.2,1.2),position:new E(0,1.6,-28),color:5596527}].forEach(h=>i.addBox(h));const o=new ee(new Jt(10,.5,6),new ae({color:4478047,roughness:.82,metalness:.14}));o.position.set(19,2.75,-6),o.castShadow=!0,o.receiveShadow=!0,i.addMesh(o);const c=new ee(new Jt(6,.4,10),new ae({color:4807269,roughness:.84,metalness:.12}));c.position.set(24,1.2,-6),c.rotation.z=-.24,c.castShadow=!0,c.receiveShadow=!0,i.addMesh(c);const l=new E(0,0,24),u=new Oh(new E(6,0,10));return i.addTarget(u),i.finalize({spawnPoint:l,groundHeight:0})}const xc=[{id:"training-ground",label:"Training Ground",create:l_},{id:"desert-compound",label:"Desert Compound",create:c_}];function u_(i){return xc.find(t=>t.id===i)??null}const zh=0,h_=1,d_=2,_u=2,oo=1.25,vu=1,Be=32,Te=Be/4,Vh=65535,ea=Math.pow(2,-24),$c=Symbol("SKIP_GENERATION"),kh={strategy:zh,maxDepth:40,maxLeafSize:10,useSharedArrayBuffer:!1,setBoundingBox:!0,onProgress:null,indirect:!1,verbose:!0,range:null,[$c]:!1};function ye(i,t,e){return e.min.x=t[i],e.min.y=t[i+1],e.min.z=t[i+2],e.max.x=t[i+3],e.max.y=t[i+4],e.max.z=t[i+5],e}function yu(i){let t=-1,e=-1/0;for(let n=0;n<3;n++){const s=i[n+3]-i[n];s>e&&(e=s,t=n)}return t}function Mu(i,t){t.set(i)}function Su(i,t,e){let n,s;for(let r=0;r<3;r++){const a=r+3;n=i[r],s=t[r],e[r]=n<s?n:s,n=i[a],s=t[a],e[a]=n>s?n:s}}function Ir(i,t,e){for(let n=0;n<3;n++){const s=t[i+2*n],r=t[i+2*n+1],a=s-r,o=s+r;a<e[n]&&(e[n]=a),o>e[n+3]&&(e[n+3]=o)}}function Ns(i){const t=i[3]-i[0],e=i[4]-i[1],n=i[5]-i[2];return 2*(t*e+e*n+n*t)}function Ae(i,t){return t[i+15]===Vh}function ze(i,t){return t[i+6]}function qe(i,t){return t[i+14]}function Le(i){return i+Te}function Ie(i,t){const e=t[i+6];return i+e*Te}function Kc(i,t){return t[i+7]}function co(i,t,e,n,s){let r=1/0,a=1/0,o=1/0,c=-1/0,l=-1/0,u=-1/0,h=1/0,d=1/0,f=1/0,x=-1/0,g=-1/0,m=-1/0;const p=i.offset||0;for(let y=(t-p)*6,M=(t+e-p)*6;y<M;y+=6){const v=i[y+0],b=i[y+1],w=v-b,A=v+b;w<r&&(r=w),A>c&&(c=A),v<h&&(h=v),v>x&&(x=v);const C=i[y+2],S=i[y+3],_=C-S,P=C+S;_<a&&(a=_),P>l&&(l=P),C<d&&(d=C),C>g&&(g=C);const D=i[y+4],I=i[y+5],U=D-I,B=D+I;U<o&&(o=U),B>u&&(u=B),D<f&&(f=D),D>m&&(m=D)}n[0]=r,n[1]=a,n[2]=o,n[3]=c,n[4]=l,n[5]=u,s[0]=h,s[1]=d,s[2]=f,s[3]=x,s[4]=g,s[5]=m}const Gn=32,f_=(i,t)=>i.candidate-t.candidate,ci=new Array(Gn).fill().map(()=>({count:0,bounds:new Float32Array(6),rightCacheBounds:new Float32Array(6),leftCacheBounds:new Float32Array(6),candidate:0})),Ur=new Float32Array(6);function p_(i,t,e,n,s,r){let a=-1,o=0;if(r===zh)a=yu(t),a!==-1&&(o=(t[a]+t[a+3])/2);else if(r===h_)a=yu(i),a!==-1&&(o=m_(e,n,s,a));else if(r===d_){const c=Ns(i);let l=oo*s;const u=e.offset||0,h=(n-u)*6,d=(n+s-u)*6;for(let f=0;f<3;f++){const x=t[f],p=(t[f+3]-x)/Gn;if(s<Gn/4){const y=[...ci];y.length=s;let M=0;for(let b=h;b<d;b+=6,M++){const w=y[M];w.candidate=e[b+2*f],w.count=0;const{bounds:A,leftCacheBounds:C,rightCacheBounds:S}=w;for(let _=0;_<3;_++)S[_]=1/0,S[_+3]=-1/0,C[_]=1/0,C[_+3]=-1/0,A[_]=1/0,A[_+3]=-1/0;Ir(b,e,A)}y.sort(f_);let v=s;for(let b=0;b<v;b++){const w=y[b];for(;b+1<v&&y[b+1].candidate===w.candidate;)y.splice(b+1,1),v--}for(let b=h;b<d;b+=6){const w=e[b+2*f];for(let A=0;A<v;A++){const C=y[A];w>=C.candidate?Ir(b,e,C.rightCacheBounds):(Ir(b,e,C.leftCacheBounds),C.count++)}}for(let b=0;b<v;b++){const w=y[b],A=w.count,C=s-w.count,S=w.leftCacheBounds,_=w.rightCacheBounds;let P=0;A!==0&&(P=Ns(S)/c);let D=0;C!==0&&(D=Ns(_)/c);const I=vu+oo*(P*A+D*C);I<l&&(a=f,l=I,o=w.candidate)}}else{for(let v=0;v<Gn;v++){const b=ci[v];b.count=0,b.candidate=x+p+v*p;const w=b.bounds;for(let A=0;A<3;A++)w[A]=1/0,w[A+3]=-1/0}for(let v=h;v<d;v+=6){let A=~~((e[v+2*f]-x)/p);A>=Gn&&(A=Gn-1);const C=ci[A];C.count++,Ir(v,e,C.bounds)}const y=ci[Gn-1];Mu(y.bounds,y.rightCacheBounds);for(let v=Gn-2;v>=0;v--){const b=ci[v],w=ci[v+1];Su(b.bounds,w.rightCacheBounds,b.rightCacheBounds)}let M=0;for(let v=0;v<Gn-1;v++){const b=ci[v],w=b.count,A=b.bounds,S=ci[v+1].rightCacheBounds;w!==0&&(M===0?Mu(A,Ur):Su(A,Ur,Ur)),M+=w;let _=0,P=0;M!==0&&(_=Ns(Ur)/c);const D=s-M;D!==0&&(P=Ns(S)/c);const I=vu+oo*(_*M+P*D);I<l&&(a=f,l=I,o=b.candidate)}}}}else console.warn(`BVH: Invalid build strategy value ${r} used.`);return{axis:a,pos:o}}function m_(i,t,e,n){let s=0;const r=i.offset;for(let a=t,o=t+e;a<o;a++)s+=i[(a-r)*6+n*2];return s/e}class lo{constructor(){this.boundingData=new Float32Array(6)}}function x_(i,t,e,n,s,r){let a=n,o=n+s-1;const c=r.pos,l=r.axis*2,u=e.offset||0;for(;;){for(;a<=o&&e[(a-u)*6+l]<c;)a++;for(;a<=o&&e[(o-u)*6+l]>=c;)o--;if(a<o){for(let h=0;h<t;h++){let d=i[a*t+h];i[a*t+h]=i[o*t+h],i[o*t+h]=d}for(let h=0;h<6;h++){const d=a-u,f=o-u,x=e[d*6+h];e[d*6+h]=e[f*6+h],e[f*6+h]=x}a++,o--}else return a}}let Hh,na,gc,Gh;const g_=Math.pow(2,32);function _c(i){return"count"in i?1:1+_c(i.left)+_c(i.right)}function __(i,t,e){return Hh=new Float32Array(e),na=new Uint32Array(e),gc=new Uint16Array(e),Gh=new Uint8Array(e),vc(i,t)}function vc(i,t){const e=i/4,n=i/2,s="count"in t,r=t.boundingData;for(let a=0;a<6;a++)Hh[e+a]=r[a];if(s)return t.buffer?(Gh.set(new Uint8Array(t.buffer),i),i+t.buffer.byteLength):(na[e+6]=t.offset,gc[n+14]=t.count,gc[n+15]=Vh,i+Be);{const{left:a,right:o,splitAxis:c}=t,l=i+Be;let u=vc(l,a);const h=i/Be,f=u/Be-h;if(f>g_)throw new Error("MeshBVH: Cannot store relative child node offset greater than 32 bits.");return na[e+6]=f,na[e+7]=c,vc(u,o)}}function v_(i,t,e,n,s,r){const{maxDepth:a,verbose:o,maxLeafSize:c,strategy:l,onProgress:u}=s,h=i.primitiveBuffer,d=i.primitiveBufferStride,f=new Float32Array(6);let x=!1;const g=new lo;return co(t,e,n,g.boundingData,f),p(g,e,n,f),g;function m(y){u&&u((y-r.offset)/r.count)}function p(y,M,v,b=null,w=0){if(!x&&w>=a&&(x=!0,o&&console.warn(`BVH: Max depth of ${a} reached when generating BVH. Consider increasing maxDepth.`)),v<=c||w>=a)return m(M+v),y.offset=M,y.count=v,y;const A=p_(y.boundingData,b,t,M,v,l);if(A.axis===-1)return m(M+v),y.offset=M,y.count=v,y;const C=x_(h,d,t,M,v,A);if(C===M||C===M+v)m(M+v),y.offset=M,y.count=v;else{y.splitAxis=A.axis;const S=new lo,_=M,P=C-M;y.left=S,co(t,_,P,S.boundingData,f),p(S,_,P,f,w+1);const D=new lo,I=C,U=v-P;y.right=D,co(t,I,U,D.boundingData,f),p(D,I,U,f,w+1)}return y}}function y_(i,t){const e=t.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,n=i.getRootRanges(t.range),s=n[0],r=n[n.length-1],a={offset:s.offset,count:r.offset+r.count-s.offset},o=new Float32Array(6*a.count);o.offset=a.offset,i.computePrimitiveBounds(a.offset,a.count,o),i._roots=n.map(c=>{const l=v_(i,o,c.offset,c.count,t,a),u=_c(l),h=new e(Be*u);return __(0,l,h),h})}class Zc{constructor(t){this._getNewPrimitive=t,this._primitives=[]}getPrimitive(){const t=this._primitives;return t.length===0?this._getNewPrimitive():t.pop()}releasePrimitive(t){this._primitives.push(t)}}class M_{constructor(){this.float32Array=null,this.uint16Array=null,this.uint32Array=null;const t=[];let e=null;this.setBuffer=n=>{e&&t.push(e),e=n,this.float32Array=new Float32Array(n),this.uint16Array=new Uint16Array(n),this.uint32Array=new Uint32Array(n)},this.clearBuffer=()=>{e=null,this.float32Array=null,this.uint16Array=null,this.uint32Array=null,t.length!==0&&this.setBuffer(t.pop())}}}const fe=new M_;let pi,ms;const rs=[],Nr=new Zc(()=>new He);function S_(i,t,e,n,s,r){pi=Nr.getPrimitive(),ms=Nr.getPrimitive(),rs.push(pi,ms),fe.setBuffer(i._roots[t]);const a=yc(0,i.geometry,e,n,s,r);fe.clearBuffer(),Nr.releasePrimitive(pi),Nr.releasePrimitive(ms),rs.pop(),rs.pop();const o=rs.length;return o>0&&(ms=rs[o-1],pi=rs[o-2]),a}function yc(i,t,e,n,s=null,r=0,a=0){const{float32Array:o,uint16Array:c,uint32Array:l}=fe;let u=i*2;if(Ae(u,c)){const x=ze(i,l),g=qe(u,c);return ye(i,o,pi),n(x,g,!1,a,r+i/Te,pi)}else{let D=function(U){const{uint16Array:B,uint32Array:V}=fe;let $=U*2;for(;!Ae($,B);)U=Le(U),$=U*2;return ze(U,V)},I=function(U){const{uint16Array:B,uint32Array:V}=fe;let $=U*2;for(;!Ae($,B);)U=Ie(U,V),$=U*2;return ze(U,V)+qe($,B)};var d=D,f=I;const x=Le(i),g=Ie(i,l);let m=x,p=g,y,M,v,b;if(s&&(v=pi,b=ms,ye(m,o,v),ye(p,o,b),y=s(v),M=s(b),M<y)){m=g,p=x;const U=y;y=M,M=U,v=b}v||(v=pi,ye(m,o,v));const w=Ae(m*2,c),A=e(v,w,y,a+1,r+m/Te);let C;if(A===_u){const U=D(m),V=I(m)-U;C=n(U,V,!0,a+1,r+m/Te,v)}else C=A&&yc(m,t,e,n,s,r,a+1);if(C)return!0;b=ms,ye(p,o,b);const S=Ae(p*2,c),_=e(b,S,M,a+1,r+p/Te);let P;if(_===_u){const U=D(p),V=I(p)-U;P=n(U,V,!0,a+1,r+p/Te,b)}else P=_&&yc(p,t,e,n,s,r,a+1);return!!P}}const qs=new fe.constructor,ha=new fe.constructor,li=new Zc(()=>new He),as=new He,os=new He,uo=new He,ho=new He;let fo=!1;function b_(i,t,e,n){if(fo)throw new Error("MeshBVH: Recursive calls to bvhcast not supported.");fo=!0;const s=i._roots,r=t._roots;let a,o=0,c=0;const l=new Qt().copy(e).invert();for(let u=0,h=s.length;u<h;u++){qs.setBuffer(s[u]),c=0;const d=li.getPrimitive();ye(0,qs.float32Array,d),d.applyMatrix4(l);for(let f=0,x=r.length;f<x&&(ha.setBuffer(r[f]),a=yn(0,0,e,l,n,o,c,0,0,d),ha.clearBuffer(),c+=r[f].byteLength/Be,!a);f++);if(li.releasePrimitive(d),qs.clearBuffer(),o+=s[u].byteLength/Be,a)break}return fo=!1,a}function yn(i,t,e,n,s,r=0,a=0,o=0,c=0,l=null,u=!1){let h,d;u?(h=ha,d=qs):(h=qs,d=ha);const f=h.float32Array,x=h.uint32Array,g=h.uint16Array,m=d.float32Array,p=d.uint32Array,y=d.uint16Array,M=i*2,v=t*2,b=Ae(M,g),w=Ae(v,y);let A=!1;if(w&&b)u?A=s(ze(t,p),qe(t*2,y),ze(i,x),qe(i*2,g),c,a+t/Te,o,r+i/Te):A=s(ze(i,x),qe(i*2,g),ze(t,p),qe(t*2,y),o,r+i/Te,c,a+t/Te);else if(w){const C=li.getPrimitive();ye(t,m,C),C.applyMatrix4(e);const S=Le(i),_=Ie(i,x);ye(S,f,as),ye(_,f,os);const P=C.intersectsBox(as),D=C.intersectsBox(os);A=P&&yn(t,S,n,e,s,a,r,c,o+1,C,!u)||D&&yn(t,_,n,e,s,a,r,c,o+1,C,!u),li.releasePrimitive(C)}else{const C=Le(t),S=Ie(t,p);ye(C,m,uo),ye(S,m,ho);const _=l.intersectsBox(uo),P=l.intersectsBox(ho);if(_&&P)A=yn(i,C,e,n,s,r,a,o,c+1,l,u)||yn(i,S,e,n,s,r,a,o,c+1,l,u);else if(_)if(b)A=yn(i,C,e,n,s,r,a,o,c+1,l,u);else{const D=li.getPrimitive();D.copy(uo).applyMatrix4(e);const I=Le(i),U=Ie(i,x);ye(I,f,as),ye(U,f,os);const B=D.intersectsBox(as),V=D.intersectsBox(os);A=B&&yn(C,I,n,e,s,a,r,c,o+1,D,!u)||V&&yn(C,U,n,e,s,a,r,c,o+1,D,!u),li.releasePrimitive(D)}else if(P)if(b)A=yn(i,S,e,n,s,r,a,o,c+1,l,u);else{const D=li.getPrimitive();D.copy(ho).applyMatrix4(e);const I=Le(i),U=Ie(i,x);ye(I,f,as),ye(U,f,os);const B=D.intersectsBox(as),V=D.intersectsBox(os);A=B&&yn(S,I,n,e,s,a,r,c,o+1,D,!u)||V&&yn(S,U,n,e,s,a,r,c,o+1,D,!u),li.releasePrimitive(D)}}return A}const bu=new He,cs=new Float32Array(6);class w_{constructor(){this._roots=null,this.primitiveBuffer=null,this.primitiveBufferStride=null}init(t){t={...kh,...t},y_(this,t)}getRootRanges(){throw new Error("BVH: getRootRanges() not implemented")}writePrimitiveBounds(){throw new Error("BVH: writePrimitiveBounds() not implemented")}writePrimitiveRangeBounds(t,e,n,s){let r=1/0,a=1/0,o=1/0,c=-1/0,l=-1/0,u=-1/0;for(let h=t,d=t+e;h<d;h++){this.writePrimitiveBounds(h,cs,0);const[f,x,g,m,p,y]=cs;f<r&&(r=f),m>c&&(c=m),x<a&&(a=x),p>l&&(l=p),g<o&&(o=g),y>u&&(u=y)}return n[s+0]=r,n[s+1]=a,n[s+2]=o,n[s+3]=c,n[s+4]=l,n[s+5]=u,n}computePrimitiveBounds(t,e,n){const s=n.offset||0;for(let r=t,a=t+e;r<a;r++){this.writePrimitiveBounds(r,cs,0);const[o,c,l,u,h,d]=cs,f=(o+u)/2,x=(c+h)/2,g=(l+d)/2,m=(u-o)/2,p=(h-c)/2,y=(d-l)/2,M=(r-s)*6;n[M+0]=f,n[M+1]=m+(Math.abs(f)+m)*ea,n[M+2]=x,n[M+3]=p+(Math.abs(x)+p)*ea,n[M+4]=g,n[M+5]=y+(Math.abs(g)+y)*ea}return n}shiftPrimitiveOffsets(t){const e=this._indirectBuffer;if(e)for(let n=0,s=e.length;n<s;n++)e[n]+=t;else{const n=this._roots;for(let s=0;s<n.length;s++){const r=n[s],a=new Uint32Array(r),o=new Uint16Array(r),c=r.byteLength/Be;for(let l=0;l<c;l++){const u=Te*l,h=2*u;Ae(h,o)&&(a[u+6]+=t)}}}}traverse(t,e=0){const n=this._roots[e],s=new Uint32Array(n),r=new Uint16Array(n);a(0);function a(o,c=0){const l=o*2,u=Ae(l,r);if(u){const h=s[o+6],d=r[l+14];t(c,u,new Float32Array(n,o*4,6),h,d)}else{const h=Le(o),d=Ie(o,s),f=Kc(o,s);t(c,u,new Float32Array(n,o*4,6),f)||(a(h,c+1),a(d,c+1))}}}refit(){const t=this._roots;for(let e=0,n=t.length;e<n;e++){const s=t[e],r=new Uint32Array(s),a=new Uint16Array(s),o=new Float32Array(s),c=s.byteLength/Be;for(let l=c-1;l>=0;l--){const u=l*Te,h=u*2;if(Ae(h,a)){const f=ze(u,r),x=qe(h,a);this.writePrimitiveRangeBounds(f,x,cs,0),o.set(cs,u)}else{const f=Le(u),x=Ie(u,r);for(let g=0;g<3;g++){const m=o[f+g],p=o[f+g+3],y=o[x+g],M=o[x+g+3];o[u+g]=m<y?m:y,o[u+g+3]=p>M?p:M}}}}}getBoundingBox(t){return t.makeEmpty(),this._roots.forEach(n=>{ye(0,new Float32Array(n),bu),t.union(bu)}),t}shapecast(t){let{boundsTraverseOrder:e,intersectsBounds:n,intersectsRange:s,intersectsPrimitive:r,scratchPrimitive:a,iterate:o}=t;if(s&&r){const h=s;s=(d,f,x,g,m)=>h(d,f,x,g,m)?!0:o(d,f,this,r,x,g,a)}else s||(r?s=(h,d,f,x)=>o(h,d,this,r,f,x,a):s=(h,d,f)=>f);let c=!1,l=0;const u=this._roots;for(let h=0,d=u.length;h<d;h++){const f=u[h];if(c=S_(this,h,n,s,e,l),c)break;l+=f.byteLength/Be}return c}bvhcast(t,e,n){let{intersectsRanges:s}=n;return b_(this,t,e,s)}}function E_(){return typeof SharedArrayBuffer<"u"}function jc(i){return i.index?i.index.count:i.attributes.position.count}function _a(i){return jc(i)/3}function T_(i,t=ArrayBuffer){return i>65535?new Uint32Array(new t(4*i)):new Uint16Array(new t(2*i))}function A_(i,t){if(!i.index){const e=i.attributes.position.count,n=t.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,s=T_(e,n);i.setIndex(new tn(s,1));for(let r=0;r<e;r++)s[r]=r}}function R_(i,t,e){const n=jc(i)/e,s=t||i.drawRange,r=s.start/e,a=(s.start+s.count)/e,o=Math.max(0,r),c=Math.min(n,a)-o;return{offset:Math.floor(o),count:Math.floor(c)}}function C_(i,t){return i.groups.map(e=>({offset:e.start/t,count:e.count/t}))}function wu(i,t,e){const n=R_(i,t,e),s=C_(i,e);if(!s.length)return[n];const r=[],a=n.offset,o=n.offset+n.count,c=jc(i)/e,l=[];for(const d of s){const{offset:f,count:x}=d,g=f,m=isFinite(x)?x:c-f,p=f+m;g<o&&p>a&&(l.push({pos:Math.max(a,g),isStart:!0}),l.push({pos:Math.min(o,p),isStart:!1}))}l.sort((d,f)=>d.pos!==f.pos?d.pos-f.pos:d.type==="end"?-1:1);let u=0,h=null;for(const d of l){const f=d.pos;u!==0&&f!==h&&r.push({offset:h,count:f-h}),u+=d.isStart?1:-1,h=f}return r}function P_(i,t){const e=i[i.length-1],n=e.offset+e.count>2**16,s=i.reduce((l,u)=>l+u.count,0),r=n?4:2,a=t?new SharedArrayBuffer(s*r):new ArrayBuffer(s*r),o=n?new Uint32Array(a):new Uint16Array(a);let c=0;for(let l=0;l<i.length;l++){const{offset:u,count:h}=i[l];for(let d=0;d<h;d++)o[c+d]=u+d;c+=h}return o}class D_ extends w_{get indirect(){return!!this._indirectBuffer}get primitiveStride(){return null}get primitiveBufferStride(){return this.indirect?1:this.primitiveStride}set primitiveBufferStride(t){}get primitiveBuffer(){return this.indirect?this._indirectBuffer:this.geometry.index.array}set primitiveBuffer(t){}constructor(t,e={}){if(t.isBufferGeometry){if(t.index&&t.index.isInterleavedBufferAttribute)throw new Error("BVH: InterleavedBufferAttribute is not supported for the index attribute.")}else throw new Error("BVH: Only BufferGeometries are supported.");if(e.useSharedArrayBuffer&&!E_())throw new Error("BVH: SharedArrayBuffer is not available.");super(),this.geometry=t,this.resolvePrimitiveIndex=e.indirect?n=>this._indirectBuffer[n]:n=>n,this.primitiveBuffer=null,this.primitiveBufferStride=null,this._indirectBuffer=null,e={...kh,...e},e[$c]||this.init(e)}init(t){const{geometry:e,primitiveStride:n}=this;if(t.indirect){const s=wu(e,t.range,n),r=P_(s,t.useSharedArrayBuffer);this._indirectBuffer=r}else A_(e,t);super.init(t),!e.boundingBox&&t.setBoundingBox&&(e.boundingBox=this.getBoundingBox(new He))}getRootRanges(t){return this.indirect?[{offset:0,count:this._indirectBuffer.length}]:wu(this.geometry,t,this.primitiveStride)}raycastObject3D(){throw new Error("BVH: raycastObject3D() not implemented")}}class Qn{constructor(){this.min=1/0,this.max=-1/0}setFromPointsField(t,e){let n=1/0,s=-1/0;for(let r=0,a=t.length;r<a;r++){const c=t[r][e];n=c<n?c:n,s=c>s?c:s}this.min=n,this.max=s}setFromPoints(t,e){let n=1/0,s=-1/0;for(let r=0,a=e.length;r<a;r++){const o=e[r],c=t.dot(o);n=c<n?c:n,s=c>s?c:s}this.min=n,this.max=s}isSeparated(t){return this.min>t.max||t.min>this.max}}Qn.prototype.setFromBox=(function(){const i=new E;return function(e,n){const s=n.min,r=n.max;let a=1/0,o=-1/0;for(let c=0;c<=1;c++)for(let l=0;l<=1;l++)for(let u=0;u<=1;u++){i.x=s.x*c+r.x*(1-c),i.y=s.y*l+r.y*(1-l),i.z=s.z*u+r.z*(1-u);const h=e.dot(i);a=Math.min(h,a),o=Math.max(h,o)}this.min=a,this.max=o}})();const L_=(function(){const i=new E,t=new E,e=new E;return function(s,r,a){const o=s.start,c=i,l=r.start,u=t;e.subVectors(o,l),i.subVectors(s.end,s.start),t.subVectors(r.end,r.start);const h=e.dot(u),d=u.dot(c),f=u.dot(u),x=e.dot(c),m=c.dot(c)*f-d*d;let p,y;m!==0?p=(h*d-x*f)/m:p=0,y=(h+p*d)/f,a.x=p,a.y=y}})(),Jc=(function(){const i=new Rt,t=new E,e=new E;return function(s,r,a,o){L_(s,r,i);let c=i.x,l=i.y;if(c>=0&&c<=1&&l>=0&&l<=1){s.at(c,a),r.at(l,o);return}else if(c>=0&&c<=1){l<0?r.at(0,o):r.at(1,o),s.closestPointToPoint(o,!0,a);return}else if(l>=0&&l<=1){c<0?s.at(0,a):s.at(1,a),r.closestPointToPoint(a,!0,o);return}else{let u;c<0?u=s.start:u=s.end;let h;l<0?h=r.start:h=r.end;const d=t,f=e;if(s.closestPointToPoint(h,!0,t),r.closestPointToPoint(u,!0,e),d.distanceToSquared(h)<=f.distanceToSquared(u)){a.copy(d),o.copy(h);return}else{a.copy(u),o.copy(f);return}}}})(),I_=(function(){const i=new E,t=new E,e=new Xn,n=new In;return function(r,a){const{radius:o,center:c}=r,{a:l,b:u,c:h}=a;if(n.start=l,n.end=u,n.closestPointToPoint(c,!0,i).distanceTo(c)<=o||(n.start=l,n.end=h,n.closestPointToPoint(c,!0,i).distanceTo(c)<=o)||(n.start=u,n.end=h,n.closestPointToPoint(c,!0,i).distanceTo(c)<=o))return!0;const g=a.getPlane(e);if(Math.abs(g.distanceToPoint(c))<=o){const p=g.projectPoint(c,t);if(a.containsPoint(p))return!0}return!1}})(),U_=["x","y","z"],qn=1e-15,Eu=qn*qn;function hn(i){return Math.abs(i)<qn}class wn extends De{constructor(...t){super(...t),this.isExtendedTriangle=!0,this.satAxes=new Array(4).fill().map(()=>new E),this.satBounds=new Array(4).fill().map(()=>new Qn),this.points=[this.a,this.b,this.c],this.plane=new Xn,this.isDegenerateIntoSegment=!1,this.isDegenerateIntoPoint=!1,this.degenerateSegment=new In,this.needsUpdate=!0}intersectsSphere(t){return I_(t,this)}update(){const t=this.a,e=this.b,n=this.c,s=this.points,r=this.satAxes,a=this.satBounds,o=r[0],c=a[0];this.getNormal(o),c.setFromPoints(o,s);const l=r[1],u=a[1];l.subVectors(t,e),u.setFromPoints(l,s);const h=r[2],d=a[2];h.subVectors(e,n),d.setFromPoints(h,s);const f=r[3],x=a[3];f.subVectors(n,t),x.setFromPoints(f,s);const g=l.length(),m=h.length(),p=f.length();this.isDegenerateIntoPoint=!1,this.isDegenerateIntoSegment=!1,g<qn?m<qn||p<qn?this.isDegenerateIntoPoint=!0:(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(t),this.degenerateSegment.end.copy(n)):m<qn?p<qn?this.isDegenerateIntoPoint=!0:(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(e),this.degenerateSegment.end.copy(t)):p<qn&&(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(n),this.degenerateSegment.end.copy(e)),this.plane.setFromNormalAndCoplanarPoint(o,t),this.needsUpdate=!1}}wn.prototype.closestPointToSegment=(function(){const i=new E,t=new E,e=new In;return function(s,r=null,a=null){const{start:o,end:c}=s,l=this.points;let u,h=1/0;for(let d=0;d<3;d++){const f=(d+1)%3;e.start.copy(l[d]),e.end.copy(l[f]),Jc(e,s,i,t),u=i.distanceToSquared(t),u<h&&(h=u,r&&r.copy(i),a&&a.copy(t))}return this.closestPointToPoint(o,i),u=o.distanceToSquared(i),u<h&&(h=u,r&&r.copy(i),a&&a.copy(o)),this.closestPointToPoint(c,i),u=c.distanceToSquared(i),u<h&&(h=u,r&&r.copy(i),a&&a.copy(c)),Math.sqrt(h)}})();wn.prototype.intersectsTriangle=(function(){const i=new wn,t=new Qn,e=new Qn,n=new E,s=new E,r=new E,a=new E,o=new In,c=new In,l=new E,u=new Rt,h=new Rt;function d(M,v,b,w){const A=n;!M.isDegenerateIntoPoint&&!M.isDegenerateIntoSegment?A.copy(M.plane.normal):A.copy(v.plane.normal);const C=M.satBounds,S=M.satAxes;for(let D=1;D<4;D++){const I=C[D],U=S[D];if(t.setFromPoints(U,v.points),I.isSeparated(t)||(a.copy(A).cross(U),t.setFromPoints(a,M.points),e.setFromPoints(a,v.points),t.isSeparated(e)))return!1}const _=v.satBounds,P=v.satAxes;for(let D=1;D<4;D++){const I=_[D],U=P[D];if(t.setFromPoints(U,M.points),I.isSeparated(t)||(a.crossVectors(A,U),t.setFromPoints(a,M.points),e.setFromPoints(a,v.points),t.isSeparated(e)))return!1}return b&&(w||console.warn("ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0."),b.start.set(0,0,0),b.end.set(0,0,0)),!0}function f(M,v,b,w,A,C,S,_,P,D,I){let U=S/(S-_);D.x=w+(A-w)*U,I.start.subVectors(v,M).multiplyScalar(U).add(M),U=S/(S-P),D.y=w+(C-w)*U,I.end.subVectors(b,M).multiplyScalar(U).add(M)}function x(M,v,b,w,A,C,S,_,P,D,I){if(A>0)f(M.c,M.a,M.b,w,v,b,P,S,_,D,I);else if(C>0)f(M.b,M.a,M.c,b,v,w,_,S,P,D,I);else if(_*P>0||S!=0)f(M.a,M.b,M.c,v,b,w,S,_,P,D,I);else if(_!=0)f(M.b,M.a,M.c,b,v,w,_,S,P,D,I);else if(P!=0)f(M.c,M.a,M.b,w,v,b,P,S,_,D,I);else return!0;return!1}function g(M,v,b,w){const A=v.degenerateSegment,C=M.plane.distanceToPoint(A.start),S=M.plane.distanceToPoint(A.end);return hn(C)?hn(S)?d(M,v,b,w):(b&&(b.start.copy(A.start),b.end.copy(A.start)),M.containsPoint(A.start)):hn(S)?(b&&(b.start.copy(A.end),b.end.copy(A.end)),M.containsPoint(A.end)):M.plane.intersectLine(A,n)!=null?(b&&(b.start.copy(n),b.end.copy(n)),M.containsPoint(n)):!1}function m(M,v,b){const w=v.a;return hn(M.plane.distanceToPoint(w))&&M.containsPoint(w)?(b&&(b.start.copy(w),b.end.copy(w)),!0):!1}function p(M,v,b){const w=M.degenerateSegment,A=v.a;return w.closestPointToPoint(A,!0,n),A.distanceToSquared(n)<Eu?(b&&(b.start.copy(A),b.end.copy(A)),!0):!1}function y(M,v,b,w){if(M.isDegenerateIntoSegment)if(v.isDegenerateIntoSegment){const A=M.degenerateSegment,C=v.degenerateSegment,S=s,_=r;A.delta(S),C.delta(_);const P=n.subVectors(C.start,A.start),D=S.x*_.y-S.y*_.x;if(hn(D))return!1;const I=(P.x*_.y-P.y*_.x)/D,U=-(S.x*P.y-S.y*P.x)/D;if(I<0||I>1||U<0||U>1)return!1;const B=A.start.z+S.z*I,V=C.start.z+_.z*U;return hn(B-V)?(b&&(b.start.copy(A.start).addScaledVector(S,I),b.end.copy(A.start).addScaledVector(S,I)),!0):!1}else return v.isDegenerateIntoPoint?p(M,v,b):g(v,M,b,w);else{if(M.isDegenerateIntoPoint)return v.isDegenerateIntoPoint?v.a.distanceToSquared(M.a)<Eu?(b&&(b.start.copy(M.a),b.end.copy(M.a)),!0):!1:v.isDegenerateIntoSegment?p(v,M,b):m(v,M,b);if(v.isDegenerateIntoPoint)return m(M,v,b);if(v.isDegenerateIntoSegment)return g(M,v,b,w)}}return function(v,b=null,w=!1){this.needsUpdate&&this.update(),v.isExtendedTriangle?v.needsUpdate&&v.update():(i.copy(v),i.update(),v=i);const A=y(this,v,b,w);if(A!==void 0)return A;const C=this.plane,S=v.plane;let _=S.distanceToPoint(this.a),P=S.distanceToPoint(this.b),D=S.distanceToPoint(this.c);hn(_)&&(_=0),hn(P)&&(P=0),hn(D)&&(D=0);const I=_*P,U=_*D;if(I>0&&U>0)return!1;let B=C.distanceToPoint(v.a),V=C.distanceToPoint(v.b),$=C.distanceToPoint(v.c);hn(B)&&(B=0),hn(V)&&(V=0),hn($)&&($=0);const X=B*V,et=B*$;if(X>0&&et>0)return!1;s.copy(C.normal),r.copy(S.normal);const Y=s.cross(r);let ft=0,Mt=Math.abs(Y.x);const Ct=Math.abs(Y.y);Ct>Mt&&(Mt=Ct,ft=1),Math.abs(Y.z)>Mt&&(ft=2);const $t=U_[ft],K=this.a[$t],J=this.b[$t],ht=this.c[$t],wt=v.a[$t],xt=v.b[$t],Ft=v.c[$t];if(x(this,K,J,ht,I,U,_,P,D,u,o))return d(this,v,b,w);if(x(v,wt,xt,Ft,X,et,B,V,$,h,c))return d(this,v,b,w);if(u.y<u.x){const le=u.y;u.y=u.x,u.x=le,l.copy(o.start),o.start.copy(o.end),o.end.copy(l)}if(h.y<h.x){const le=h.y;h.y=h.x,h.x=le,l.copy(c.start),c.start.copy(c.end),c.end.copy(l)}return u.y<h.x||h.y<u.x?!1:(b&&(h.x>u.x?b.start.copy(c.start):b.start.copy(o.start),h.y<u.y?b.end.copy(c.end):b.end.copy(o.end)),!0)}})();wn.prototype.distanceToPoint=(function(){const i=new E;return function(e){return this.closestPointToPoint(e,i),e.distanceTo(i)}})();wn.prototype.distanceToTriangle=(function(){const i=new E,t=new E,e=["a","b","c"],n=new In,s=new In;return function(a,o=null,c=null){const l=o||c?n:null;if(this.intersectsTriangle(a,l))return(o||c)&&(o&&l.getCenter(o),c&&l.getCenter(c)),0;let u=1/0;for(let h=0;h<3;h++){let d;const f=e[h],x=a[f];this.closestPointToPoint(x,i),d=x.distanceToSquared(i),d<u&&(u=d,o&&o.copy(i),c&&c.copy(x));const g=this[f];a.closestPointToPoint(g,i),d=g.distanceToSquared(i),d<u&&(u=d,o&&o.copy(g),c&&c.copy(i))}for(let h=0;h<3;h++){const d=e[h],f=e[(h+1)%3];n.set(this[d],this[f]);for(let x=0;x<3;x++){const g=e[x],m=e[(x+1)%3];s.set(a[g],a[m]),Jc(n,s,i,t);const p=i.distanceToSquared(t);p<u&&(u=p,o&&o.copy(i),c&&c.copy(t))}}return Math.sqrt(u)}})();class $e{constructor(t,e,n){this.isOrientedBox=!0,this.min=new E,this.max=new E,this.matrix=new Qt,this.invMatrix=new Qt,this.points=new Array(8).fill().map(()=>new E),this.satAxes=new Array(3).fill().map(()=>new E),this.satBounds=new Array(3).fill().map(()=>new Qn),this.alignedSatBounds=new Array(3).fill().map(()=>new Qn),this.needsUpdate=!1,t&&this.min.copy(t),e&&this.max.copy(e),n&&this.matrix.copy(n)}set(t,e,n){this.min.copy(t),this.max.copy(e),this.matrix.copy(n),this.needsUpdate=!0}copy(t){this.min.copy(t.min),this.max.copy(t.max),this.matrix.copy(t.matrix),this.needsUpdate=!0}}$e.prototype.update=(function(){return function(){const t=this.matrix,e=this.min,n=this.max,s=this.points;for(let l=0;l<=1;l++)for(let u=0;u<=1;u++)for(let h=0;h<=1;h++){const d=1*l|2*u|4*h,f=s[d];f.x=l?n.x:e.x,f.y=u?n.y:e.y,f.z=h?n.z:e.z,f.applyMatrix4(t)}const r=this.satBounds,a=this.satAxes,o=s[0];for(let l=0;l<3;l++){const u=a[l],h=r[l],d=1<<l,f=s[d];u.subVectors(o,f),h.setFromPoints(u,s)}const c=this.alignedSatBounds;c[0].setFromPointsField(s,"x"),c[1].setFromPointsField(s,"y"),c[2].setFromPointsField(s,"z"),this.invMatrix.copy(this.matrix).invert(),this.needsUpdate=!1}})();$e.prototype.intersectsBox=(function(){const i=new Qn;return function(e){this.needsUpdate&&this.update();const n=e.min,s=e.max,r=this.satBounds,a=this.satAxes,o=this.alignedSatBounds;if(i.min=n.x,i.max=s.x,o[0].isSeparated(i)||(i.min=n.y,i.max=s.y,o[1].isSeparated(i))||(i.min=n.z,i.max=s.z,o[2].isSeparated(i)))return!1;for(let c=0;c<3;c++){const l=a[c],u=r[c];if(i.setFromBox(l,e),u.isSeparated(i))return!1}return!0}})();$e.prototype.intersectsTriangle=(function(){const i=new wn,t=new Array(3),e=new Qn,n=new Qn,s=new E;return function(a){this.needsUpdate&&this.update(),a.isExtendedTriangle?a.needsUpdate&&a.update():(i.copy(a),i.update(),a=i);const o=this.satBounds,c=this.satAxes;t[0]=a.a,t[1]=a.b,t[2]=a.c;for(let d=0;d<3;d++){const f=o[d],x=c[d];if(e.setFromPoints(x,t),f.isSeparated(e))return!1}const l=a.satBounds,u=a.satAxes,h=this.points;for(let d=0;d<3;d++){const f=l[d],x=u[d];if(e.setFromPoints(x,h),f.isSeparated(e))return!1}for(let d=0;d<3;d++){const f=c[d];for(let x=0;x<4;x++){const g=u[x];if(s.crossVectors(f,g),e.setFromPoints(s,t),n.setFromPoints(s,h),e.isSeparated(n))return!1}}return!0}})();$e.prototype.closestPointToPoint=(function(){return function(t,e){return this.needsUpdate&&this.update(),e.copy(t).applyMatrix4(this.invMatrix).clamp(this.min,this.max).applyMatrix4(this.matrix),e}})();$e.prototype.distanceToPoint=(function(){const i=new E;return function(e){return this.closestPointToPoint(e,i),e.distanceTo(i)}})();$e.prototype.distanceToBox=(function(){const i=["x","y","z"],t=new Array(12).fill().map(()=>new In),e=new Array(12).fill().map(()=>new In),n=new E,s=new E;return function(a,o=0,c=null,l=null){if(this.needsUpdate&&this.update(),this.intersectsBox(a))return(c||l)&&(a.getCenter(s),this.closestPointToPoint(s,n),a.closestPointToPoint(n,s),c&&c.copy(n),l&&l.copy(s)),0;const u=o*o,h=a.min,d=a.max,f=this.points;let x=1/0;for(let m=0;m<8;m++){const p=f[m];s.copy(p).clamp(h,d);const y=p.distanceToSquared(s);if(y<x&&(x=y,c&&c.copy(p),l&&l.copy(s),y<u))return Math.sqrt(y)}let g=0;for(let m=0;m<3;m++)for(let p=0;p<=1;p++)for(let y=0;y<=1;y++){const M=(m+1)%3,v=(m+2)%3,b=p<<M|y<<v,w=1<<m|p<<M|y<<v,A=f[b],C=f[w];t[g].set(A,C);const _=i[m],P=i[M],D=i[v],I=e[g],U=I.start,B=I.end;U[_]=h[_],U[P]=p?h[P]:d[P],U[D]=y?h[D]:d[P],B[_]=d[_],B[P]=p?h[P]:d[P],B[D]=y?h[D]:d[P],g++}for(let m=0;m<=1;m++)for(let p=0;p<=1;p++)for(let y=0;y<=1;y++){s.x=m?d.x:h.x,s.y=p?d.y:h.y,s.z=y?d.z:h.z,this.closestPointToPoint(s,n);const M=s.distanceToSquared(n);if(M<x&&(x=M,c&&c.copy(n),l&&l.copy(s),M<u))return Math.sqrt(M)}for(let m=0;m<12;m++){const p=t[m];for(let y=0;y<12;y++){const M=e[y];Jc(p,M,n,s);const v=n.distanceToSquared(s);if(v<x&&(x=v,c&&c.copy(n),l&&l.copy(s),v<u))return Math.sqrt(v)}}return Math.sqrt(x)}})();class N_ extends Zc{constructor(){super(()=>new wn)}}const mn=new N_,Fs=new E,po=new E;function F_(i,t,e={},n=0,s=1/0){const r=n*n,a=s*s;let o=1/0,c=null;if(i.shapecast({boundsTraverseOrder:u=>(Fs.copy(t).clamp(u.min,u.max),Fs.distanceToSquared(t)),intersectsBounds:(u,h,d)=>d<o&&d<a,intersectsTriangle:(u,h)=>{u.closestPointToPoint(t,Fs);const d=t.distanceToSquared(Fs);return d<o&&(po.copy(Fs),o=d,c=h),d<r}}),o===1/0)return null;const l=Math.sqrt(o);return e.point?e.point.copy(po):e.point=po.clone(),e.distance=l,e.faceIndex=c,e}const Fr=parseInt(er)>=169,O_=parseInt(er)<=161,Ai=new E,Ri=new E,Ci=new E,Or=new Rt,Br=new Rt,zr=new Rt,Tu=new E,Au=new E,Ru=new E,Os=new E;function B_(i,t,e,n,s,r,a,o){let c;if(r===Ye?c=i.intersectTriangle(n,e,t,!0,s):c=i.intersectTriangle(t,e,n,r!==fn,s),c===null)return null;const l=i.origin.distanceTo(s);return l<a||l>o?null:{distance:l,point:s.clone()}}function Cu(i,t,e,n,s,r,a,o,c,l,u){Ai.fromBufferAttribute(t,r),Ri.fromBufferAttribute(t,a),Ci.fromBufferAttribute(t,o);const h=B_(i,Ai,Ri,Ci,Os,c,l,u);if(h){if(n){Or.fromBufferAttribute(n,r),Br.fromBufferAttribute(n,a),zr.fromBufferAttribute(n,o),h.uv=new Rt;const f=De.getInterpolation(Os,Ai,Ri,Ci,Or,Br,zr,h.uv);Fr||(h.uv=f)}if(s){Or.fromBufferAttribute(s,r),Br.fromBufferAttribute(s,a),zr.fromBufferAttribute(s,o),h.uv1=new Rt;const f=De.getInterpolation(Os,Ai,Ri,Ci,Or,Br,zr,h.uv1);Fr||(h.uv1=f),O_&&(h.uv2=h.uv1)}if(e){Tu.fromBufferAttribute(e,r),Au.fromBufferAttribute(e,a),Ru.fromBufferAttribute(e,o),h.normal=new E;const f=De.getInterpolation(Os,Ai,Ri,Ci,Tu,Au,Ru,h.normal);h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1),Fr||(h.normal=f)}const d={a:r,b:a,c:o,normal:new E,materialIndex:0};if(De.getNormal(Ai,Ri,Ci,d.normal),h.face=d,h.faceIndex=r,Fr){const f=new E;De.getBarycoord(Os,Ai,Ri,Ci,f),h.barycoord=f}}return h}function Pu(i){return i&&i.isMaterial?i.side:i}function va(i,t,e,n,s,r,a){const o=n*3;let c=o+0,l=o+1,u=o+2;const{index:h,groups:d}=i;i.index&&(c=h.getX(c),l=h.getX(l),u=h.getX(u));const{position:f,normal:x,uv:g,uv1:m}=i.attributes;if(Array.isArray(t)){const p=n*3;for(let y=0,M=d.length;y<M;y++){const{start:v,count:b,materialIndex:w}=d[y];if(p>=v&&p<v+b){const A=Pu(t[w]),C=Cu(e,f,x,g,m,c,l,u,A,r,a);if(C)if(C.faceIndex=n,C.face.materialIndex=w,s)s.push(C);else return C}}}else{const p=Pu(t),y=Cu(e,f,x,g,m,c,l,u,p,r,a);if(y)if(y.faceIndex=n,y.face.materialIndex=0,s)s.push(y);else return y}return null}function Ee(i,t,e,n){const s=i.a,r=i.b,a=i.c;let o=t,c=t+1,l=t+2;e&&(o=e.getX(o),c=e.getX(c),l=e.getX(l)),s.x=n.getX(o),s.y=n.getY(o),s.z=n.getZ(o),r.x=n.getX(c),r.y=n.getY(c),r.z=n.getZ(c),a.x=n.getX(l),a.y=n.getY(l),a.z=n.getZ(l)}function z_(i,t,e,n,s,r,a,o){const{geometry:c,_indirectBuffer:l}=i;for(let u=n,h=n+s;u<h;u++)va(c,t,e,u,r,a,o)}function V_(i,t,e,n,s,r,a){const{geometry:o,_indirectBuffer:c}=i;let l=1/0,u=null;for(let h=n,d=n+s;h<d;h++){let f;f=va(o,t,e,h,null,r,a),f&&f.distance<l&&(u=f,l=f.distance)}return u}function k_(i,t,e,n,s,r,a){const{geometry:o}=e,{index:c}=o,l=o.attributes.position;for(let u=i,h=t+i;u<h;u++){let d;if(d=u,Ee(a,d*3,c,l),a.needsUpdate=!0,n(a,d,s,r))return!0}return!1}function H_(i,t=null){t&&Array.isArray(t)&&(t=new Set(t));const e=i.geometry,n=e.index?e.index.array:null,s=e.attributes.position;let r,a,o,c,l=0;const u=i._roots;for(let d=0,f=u.length;d<f;d++)r=u[d],a=new Uint32Array(r),o=new Uint16Array(r),c=new Float32Array(r),h(0,l),l+=r.byteLength;function h(d,f,x=!1){const g=d*2;if(Ae(g,o)){const m=ze(d,a),p=qe(g,o);let y=1/0,M=1/0,v=1/0,b=-1/0,w=-1/0,A=-1/0;for(let C=3*m,S=3*(m+p);C<S;C++){let _=n[C];const P=s.getX(_),D=s.getY(_),I=s.getZ(_);P<y&&(y=P),P>b&&(b=P),D<M&&(M=D),D>w&&(w=D),I<v&&(v=I),I>A&&(A=I)}return c[d+0]!==y||c[d+1]!==M||c[d+2]!==v||c[d+3]!==b||c[d+4]!==w||c[d+5]!==A?(c[d+0]=y,c[d+1]=M,c[d+2]=v,c[d+3]=b,c[d+4]=w,c[d+5]=A,!0):!1}else{const m=Le(d),p=Ie(d,a);let y=x,M=!1,v=!1;if(t){if(!y){const _=m/Te+f/Be,P=p/Te+f/Be;M=t.has(_),v=t.has(P),y=!M&&!v}}else M=!0,v=!0;const b=y||M,w=y||v;let A=!1;b&&(A=h(m,f,y));let C=!1;w&&(C=h(p,f,y));const S=A||C;if(S)for(let _=0;_<3;_++){const P=m+_,D=p+_,I=c[P],U=c[P+3],B=c[D],V=c[D+3];c[d+_]=I<B?I:B,c[d+_+3]=U>V?U:V}return S}}}function gi(i,t,e,n,s){let r,a,o,c,l,u;const h=1/e.direction.x,d=1/e.direction.y,f=1/e.direction.z,x=e.origin.x,g=e.origin.y,m=e.origin.z;let p=t[i],y=t[i+3],M=t[i+1],v=t[i+3+1],b=t[i+2],w=t[i+3+2];return h>=0?(r=(p-x)*h,a=(y-x)*h):(r=(y-x)*h,a=(p-x)*h),d>=0?(o=(M-g)*d,c=(v-g)*d):(o=(v-g)*d,c=(M-g)*d),r>c||o>a||((o>r||isNaN(r))&&(r=o),(c<a||isNaN(a))&&(a=c),f>=0?(l=(b-m)*f,u=(w-m)*f):(l=(w-m)*f,u=(b-m)*f),r>u||l>a)?!1:((l>r||r!==r)&&(r=l),(u<a||a!==a)&&(a=u),r<=s&&a>=n)}function G_(i,t,e,n,s,r,a,o){const{geometry:c,_indirectBuffer:l}=i;for(let u=n,h=n+s;u<h;u++){let d=l?l[u]:u;va(c,t,e,d,r,a,o)}}function W_(i,t,e,n,s,r,a){const{geometry:o,_indirectBuffer:c}=i;let l=1/0,u=null;for(let h=n,d=n+s;h<d;h++){let f;f=va(o,t,e,c?c[h]:h,null,r,a),f&&f.distance<l&&(u=f,l=f.distance)}return u}function X_(i,t,e,n,s,r,a){const{geometry:o}=e,{index:c}=o,l=o.attributes.position;for(let u=i,h=t+i;u<h;u++){let d;if(d=e.resolveTriangleIndex(u),Ee(a,d*3,c,l),a.needsUpdate=!0,n(a,d,s,r))return!0}return!1}function q_(i,t,e,n,s,r,a){fe.setBuffer(i._roots[t]),Mc(0,i,e,n,s,r,a),fe.clearBuffer()}function Mc(i,t,e,n,s,r,a){const{float32Array:o,uint16Array:c,uint32Array:l}=fe,u=i*2;if(Ae(u,c)){const d=ze(i,l),f=qe(u,c);z_(t,e,n,d,f,s,r,a)}else{const d=Le(i);gi(d,o,n,r,a)&&Mc(d,t,e,n,s,r,a);const f=Ie(i,l);gi(f,o,n,r,a)&&Mc(f,t,e,n,s,r,a)}}const Y_=["x","y","z"];function $_(i,t,e,n,s,r){fe.setBuffer(i._roots[t]);const a=Sc(0,i,e,n,s,r);return fe.clearBuffer(),a}function Sc(i,t,e,n,s,r){const{float32Array:a,uint16Array:o,uint32Array:c}=fe;let l=i*2;if(Ae(l,o)){const h=ze(i,c),d=qe(l,o);return V_(t,e,n,h,d,s,r)}else{const h=Kc(i,c),d=Y_[h],x=n.direction[d]>=0;let g,m;x?(g=Le(i),m=Ie(i,c)):(g=Ie(i,c),m=Le(i));const y=gi(g,a,n,s,r)?Sc(g,t,e,n,s,r):null;if(y){const b=y.point[d];if(x?b<=a[m+h]:b>=a[m+h+3])return y}const v=gi(m,a,n,s,r)?Sc(m,t,e,n,s,r):null;return y&&v?y.distance<=v.distance?y:v:y||v||null}}const Vr=new He,ls=new wn,us=new wn,Bs=new Qt,Du=new $e,kr=new $e;function K_(i,t,e,n){fe.setBuffer(i._roots[t]);const s=bc(0,i,e,n);return fe.clearBuffer(),s}function bc(i,t,e,n,s=null){const{float32Array:r,uint16Array:a,uint32Array:o}=fe;let c=i*2;if(s===null&&(e.boundingBox||e.computeBoundingBox(),Du.set(e.boundingBox.min,e.boundingBox.max,n),s=Du),Ae(c,a)){const u=t.geometry,h=u.index,d=u.attributes.position,f=e.index,x=e.attributes.position,g=ze(i,o),m=qe(c,a);if(Bs.copy(n).invert(),e.boundsTree)return ye(i,r,kr),kr.matrix.copy(Bs),kr.needsUpdate=!0,e.boundsTree.shapecast({intersectsBounds:y=>kr.intersectsBox(y),intersectsTriangle:y=>{y.a.applyMatrix4(n),y.b.applyMatrix4(n),y.c.applyMatrix4(n),y.needsUpdate=!0;for(let M=g*3,v=(m+g)*3;M<v;M+=3)if(Ee(us,M,h,d),us.needsUpdate=!0,y.intersectsTriangle(us))return!0;return!1}});{const p=_a(e);for(let y=g*3,M=(m+g)*3;y<M;y+=3){Ee(ls,y,h,d),ls.a.applyMatrix4(Bs),ls.b.applyMatrix4(Bs),ls.c.applyMatrix4(Bs),ls.needsUpdate=!0;for(let v=0,b=p*3;v<b;v+=3)if(Ee(us,v,f,x),us.needsUpdate=!0,ls.intersectsTriangle(us))return!0}}}else{const u=Le(i),h=Ie(i,o);return ye(u,r,Vr),!!(s.intersectsBox(Vr)&&bc(u,t,e,n,s)||(ye(h,r,Vr),s.intersectsBox(Vr)&&bc(h,t,e,n,s)))}}const Hr=new Qt,mo=new $e,zs=new $e,Z_=new E,j_=new E,J_=new E,Q_=new E;function tv(i,t,e,n={},s={},r=0,a=1/0){t.boundingBox||t.computeBoundingBox(),mo.set(t.boundingBox.min,t.boundingBox.max,e),mo.needsUpdate=!0;const o=i.geometry,c=o.attributes.position,l=o.index,u=t.attributes.position,h=t.index,d=mn.getPrimitive(),f=mn.getPrimitive();let x=Z_,g=j_,m=null,p=null;s&&(m=J_,p=Q_);let y=1/0,M=null,v=null;return Hr.copy(e).invert(),zs.matrix.copy(Hr),i.shapecast({boundsTraverseOrder:b=>mo.distanceToBox(b),intersectsBounds:(b,w,A)=>A<y&&A<a?(w&&(zs.min.copy(b.min),zs.max.copy(b.max),zs.needsUpdate=!0),!0):!1,intersectsRange:(b,w)=>{if(t.boundsTree)return t.boundsTree.shapecast({boundsTraverseOrder:C=>zs.distanceToBox(C),intersectsBounds:(C,S,_)=>_<y&&_<a,intersectsRange:(C,S)=>{for(let _=C,P=C+S;_<P;_++){Ee(f,3*_,h,u),f.a.applyMatrix4(e),f.b.applyMatrix4(e),f.c.applyMatrix4(e),f.needsUpdate=!0;for(let D=b,I=b+w;D<I;D++){Ee(d,3*D,l,c),d.needsUpdate=!0;const U=d.distanceToTriangle(f,x,m);if(U<y&&(g.copy(x),p&&p.copy(m),y=U,M=D,v=_),U<r)return!0}}}});{const A=_a(t);for(let C=0,S=A;C<S;C++){Ee(f,3*C,h,u),f.a.applyMatrix4(e),f.b.applyMatrix4(e),f.c.applyMatrix4(e),f.needsUpdate=!0;for(let _=b,P=b+w;_<P;_++){Ee(d,3*_,l,c),d.needsUpdate=!0;const D=d.distanceToTriangle(f,x,m);if(D<y&&(g.copy(x),p&&p.copy(m),y=D,M=_,v=C),D<r)return!0}}}}}),mn.releasePrimitive(d),mn.releasePrimitive(f),y===1/0?null:(n.point?n.point.copy(g):n.point=g.clone(),n.distance=y,n.faceIndex=M,s&&(s.point?s.point.copy(p):s.point=p.clone(),s.point.applyMatrix4(Hr),g.applyMatrix4(Hr),s.distance=g.sub(s.point).length(),s.faceIndex=v),n)}function ev(i,t=null){t&&Array.isArray(t)&&(t=new Set(t));const e=i.geometry,n=e.index?e.index.array:null,s=e.attributes.position;let r,a,o,c,l=0;const u=i._roots;for(let d=0,f=u.length;d<f;d++)r=u[d],a=new Uint32Array(r),o=new Uint16Array(r),c=new Float32Array(r),h(0,l),l+=r.byteLength;function h(d,f,x=!1){const g=d*2;if(Ae(g,o)){const m=ze(d,a),p=qe(g,o);let y=1/0,M=1/0,v=1/0,b=-1/0,w=-1/0,A=-1/0;for(let C=m,S=m+p;C<S;C++){const _=3*i.resolveTriangleIndex(C);for(let P=0;P<3;P++){let D=_+P;D=n?n[D]:D;const I=s.getX(D),U=s.getY(D),B=s.getZ(D);I<y&&(y=I),I>b&&(b=I),U<M&&(M=U),U>w&&(w=U),B<v&&(v=B),B>A&&(A=B)}}return c[d+0]!==y||c[d+1]!==M||c[d+2]!==v||c[d+3]!==b||c[d+4]!==w||c[d+5]!==A?(c[d+0]=y,c[d+1]=M,c[d+2]=v,c[d+3]=b,c[d+4]=w,c[d+5]=A,!0):!1}else{const m=Le(d),p=Ie(d,a);let y=x,M=!1,v=!1;if(t){if(!y){const _=m/Te+f/Be,P=p/Te+f/Be;M=t.has(_),v=t.has(P),y=!M&&!v}}else M=!0,v=!0;const b=y||M,w=y||v;let A=!1;b&&(A=h(m,f,y));let C=!1;w&&(C=h(p,f,y));const S=A||C;if(S)for(let _=0;_<3;_++){const P=m+_,D=p+_,I=c[P],U=c[P+3],B=c[D],V=c[D+3];c[d+_]=I<B?I:B,c[d+_+3]=U>V?U:V}return S}}}function nv(i,t,e,n,s,r,a){fe.setBuffer(i._roots[t]),wc(0,i,e,n,s,r,a),fe.clearBuffer()}function wc(i,t,e,n,s,r,a){const{float32Array:o,uint16Array:c,uint32Array:l}=fe,u=i*2;if(Ae(u,c)){const d=ze(i,l),f=qe(u,c);G_(t,e,n,d,f,s,r,a)}else{const d=Le(i);gi(d,o,n,r,a)&&wc(d,t,e,n,s,r,a);const f=Ie(i,l);gi(f,o,n,r,a)&&wc(f,t,e,n,s,r,a)}}const iv=["x","y","z"];function sv(i,t,e,n,s,r){fe.setBuffer(i._roots[t]);const a=Ec(0,i,e,n,s,r);return fe.clearBuffer(),a}function Ec(i,t,e,n,s,r){const{float32Array:a,uint16Array:o,uint32Array:c}=fe;let l=i*2;if(Ae(l,o)){const h=ze(i,c),d=qe(l,o);return W_(t,e,n,h,d,s,r)}else{const h=Kc(i,c),d=iv[h],x=n.direction[d]>=0;let g,m;x?(g=Le(i),m=Ie(i,c)):(g=Ie(i,c),m=Le(i));const y=gi(g,a,n,s,r)?Ec(g,t,e,n,s,r):null;if(y){const b=y.point[d];if(x?b<=a[m+h]:b>=a[m+h+3])return y}const v=gi(m,a,n,s,r)?Ec(m,t,e,n,s,r):null;return y&&v?y.distance<=v.distance?y:v:y||v||null}}const Gr=new He,hs=new wn,ds=new wn,Vs=new Qt,Lu=new $e,Wr=new $e;function rv(i,t,e,n){fe.setBuffer(i._roots[t]);const s=Tc(0,i,e,n);return fe.clearBuffer(),s}function Tc(i,t,e,n,s=null){const{float32Array:r,uint16Array:a,uint32Array:o}=fe;let c=i*2;if(s===null&&(e.boundingBox||e.computeBoundingBox(),Lu.set(e.boundingBox.min,e.boundingBox.max,n),s=Lu),Ae(c,a)){const u=t.geometry,h=u.index,d=u.attributes.position,f=e.index,x=e.attributes.position,g=ze(i,o),m=qe(c,a);if(Vs.copy(n).invert(),e.boundsTree)return ye(i,r,Wr),Wr.matrix.copy(Vs),Wr.needsUpdate=!0,e.boundsTree.shapecast({intersectsBounds:y=>Wr.intersectsBox(y),intersectsTriangle:y=>{y.a.applyMatrix4(n),y.b.applyMatrix4(n),y.c.applyMatrix4(n),y.needsUpdate=!0;for(let M=g,v=m+g;M<v;M++)if(Ee(ds,3*t.resolveTriangleIndex(M),h,d),ds.needsUpdate=!0,y.intersectsTriangle(ds))return!0;return!1}});{const p=_a(e);for(let y=g,M=m+g;y<M;y++){const v=t.resolveTriangleIndex(y);Ee(hs,3*v,h,d),hs.a.applyMatrix4(Vs),hs.b.applyMatrix4(Vs),hs.c.applyMatrix4(Vs),hs.needsUpdate=!0;for(let b=0,w=p*3;b<w;b+=3)if(Ee(ds,b,f,x),ds.needsUpdate=!0,hs.intersectsTriangle(ds))return!0}}}else{const u=Le(i),h=Ie(i,o);return ye(u,r,Gr),!!(s.intersectsBox(Gr)&&Tc(u,t,e,n,s)||(ye(h,r,Gr),s.intersectsBox(Gr)&&Tc(h,t,e,n,s)))}}const Xr=new Qt,xo=new $e,ks=new $e,av=new E,ov=new E,cv=new E,lv=new E;function uv(i,t,e,n={},s={},r=0,a=1/0){t.boundingBox||t.computeBoundingBox(),xo.set(t.boundingBox.min,t.boundingBox.max,e),xo.needsUpdate=!0;const o=i.geometry,c=o.attributes.position,l=o.index,u=t.attributes.position,h=t.index,d=mn.getPrimitive(),f=mn.getPrimitive();let x=av,g=ov,m=null,p=null;s&&(m=cv,p=lv);let y=1/0,M=null,v=null;return Xr.copy(e).invert(),ks.matrix.copy(Xr),i.shapecast({boundsTraverseOrder:b=>xo.distanceToBox(b),intersectsBounds:(b,w,A)=>A<y&&A<a?(w&&(ks.min.copy(b.min),ks.max.copy(b.max),ks.needsUpdate=!0),!0):!1,intersectsRange:(b,w)=>{if(t.boundsTree){const A=t.boundsTree;return A.shapecast({boundsTraverseOrder:C=>ks.distanceToBox(C),intersectsBounds:(C,S,_)=>_<y&&_<a,intersectsRange:(C,S)=>{for(let _=C,P=C+S;_<P;_++){const D=A.resolveTriangleIndex(_);Ee(f,3*D,h,u),f.a.applyMatrix4(e),f.b.applyMatrix4(e),f.c.applyMatrix4(e),f.needsUpdate=!0;for(let I=b,U=b+w;I<U;I++){const B=i.resolveTriangleIndex(I);Ee(d,3*B,l,c),d.needsUpdate=!0;const V=d.distanceToTriangle(f,x,m);if(V<y&&(g.copy(x),p&&p.copy(m),y=V,M=I,v=_),V<r)return!0}}}})}else{const A=_a(t);for(let C=0,S=A;C<S;C++){Ee(f,3*C,h,u),f.a.applyMatrix4(e),f.b.applyMatrix4(e),f.c.applyMatrix4(e),f.needsUpdate=!0;for(let _=b,P=b+w;_<P;_++){const D=i.resolveTriangleIndex(_);Ee(d,3*D,l,c),d.needsUpdate=!0;const I=d.distanceToTriangle(f,x,m);if(I<y&&(g.copy(x),p&&p.copy(m),y=I,M=_,v=C),I<r)return!0}}}}}),mn.releasePrimitive(d),mn.releasePrimitive(f),y===1/0?null:(n.point?n.point.copy(g):n.point=g.clone(),n.distance=y,n.faceIndex=M,s&&(s.point?s.point.copy(p):s.point=p.clone(),s.point.applyMatrix4(Xr),g.applyMatrix4(Xr),s.distance=g.sub(s.point).length(),s.faceIndex=v),n)}function Iu(i,t,e){return i===null?null:(i.point.applyMatrix4(t.matrixWorld),i.distance=i.point.distanceTo(e.ray.origin),i.object=t,i)}const qr=new $e,Yr=new bs,Uu=new E,Nu=new Qt,Fu=new E,go=["getX","getY","getZ"];class da extends D_{static serialize(t,e={}){e={cloneBuffers:!0,...e};const n=t.geometry,s=t._roots,r=t._indirectBuffer,a=n.getIndex(),o={version:1,roots:null,index:null,indirectBuffer:null};return e.cloneBuffers?(o.roots=s.map(c=>c.slice()),o.index=a?a.array.slice():null,o.indirectBuffer=r?r.slice():null):(o.roots=s,o.index=a?a.array:null,o.indirectBuffer=r),o}static deserialize(t,e,n={}){n={setIndex:!0,indirect:!!t.indirectBuffer,...n};const{index:s,roots:r,indirectBuffer:a}=t;t.version||(console.warn("MeshBVH.deserialize: Serialization format has been changed and will be fixed up. It is recommended to regenerate any stored serialized data."),c(r));const o=new da(e,{...n,[$c]:!0});if(o._roots=r,o._indirectBuffer=a||null,n.setIndex){const l=e.getIndex();if(l===null){const u=new tn(t.index,1,!1);e.setIndex(u)}else l.array!==s&&(l.array.set(s),l.needsUpdate=!0)}return o;function c(l){for(let u=0;u<l.length;u++){const h=l[u],d=new Uint32Array(h),f=new Uint16Array(h);for(let x=0,g=h.byteLength/Be;x<g;x++){const m=Te*x,p=2*m;Ae(p,f)||(d[m+6]=d[m+6]/Te-x)}}}}get primitiveStride(){return 3}get resolveTriangleIndex(){return this.resolvePrimitiveIndex}constructor(t,e={}){e.maxLeafTris&&(console.warn('MeshBVH: "maxLeafTris" option has been deprecated. Use maxLeafSize, instead.'),e={...e,maxLeafSize:e.maxLeafTris}),super(t,e)}shiftTriangleOffsets(t){return super.shiftPrimitiveOffsets(t)}writePrimitiveBounds(t,e,n){const s=this.geometry,r=this._indirectBuffer,a=s.attributes.position,o=s.index?s.index.array:null,l=(r?r[t]:t)*3;let u=l+0,h=l+1,d=l+2;o&&(u=o[u],h=o[h],d=o[d]);for(let f=0;f<3;f++){const x=a[go[f]](u),g=a[go[f]](h),m=a[go[f]](d);let p=x;g<p&&(p=g),m<p&&(p=m);let y=x;g>y&&(y=g),m>y&&(y=m),e[n+f]=p,e[n+f+3]=y}return e}computePrimitiveBounds(t,e,n){const s=this.geometry,r=this._indirectBuffer,a=s.attributes.position,o=s.index?s.index.array:null,c=a.normalized;if(t<0||e+t-n.offset>n.length/6)throw new Error("MeshBVH: compute triangle bounds range is invalid.");const l=a.array,u=a.offset||0;let h=3;a.isInterleavedBufferAttribute&&(h=a.data.stride);const d=["getX","getY","getZ"],f=n.offset;for(let x=t,g=t+e;x<g;x++){const p=(r?r[x]:x)*3,y=(x-f)*6;let M=p+0,v=p+1,b=p+2;o&&(M=o[M],v=o[v],b=o[b]),c||(M=M*h+u,v=v*h+u,b=b*h+u);for(let w=0;w<3;w++){let A,C,S;c?(A=a[d[w]](M),C=a[d[w]](v),S=a[d[w]](b)):(A=l[M+w],C=l[v+w],S=l[b+w]);let _=A;C<_&&(_=C),S<_&&(_=S);let P=A;C>P&&(P=C),S>P&&(P=S);const D=(P-_)/2,I=w*2;n[y+I+0]=_+D,n[y+I+1]=D+(Math.abs(_)+D)*ea}}return n}raycastObject3D(t,e,n=[]){const{material:s}=t;if(s===void 0)return;Nu.copy(t.matrixWorld).invert(),Yr.copy(e.ray).applyMatrix4(Nu),Fu.setFromMatrixScale(t.matrixWorld),Uu.copy(Yr.direction).multiply(Fu);const r=Uu.length(),a=e.near/r,o=e.far/r;if(e.firstHitOnly===!0){let c=this.raycastFirst(Yr,s,a,o);c=Iu(c,t,e),c&&n.push(c)}else{const c=this.raycast(Yr,s,a,o);for(let l=0,u=c.length;l<u;l++){const h=Iu(c[l],t,e);h&&n.push(h)}}return n}refit(t=null){return(this.indirect?ev:H_)(this,t)}raycast(t,e=Pn,n=0,s=1/0){const r=this._roots,a=[],o=this.indirect?nv:q_;for(let c=0,l=r.length;c<l;c++)o(this,c,e,t,a,n,s);return a}raycastFirst(t,e=Pn,n=0,s=1/0){const r=this._roots;let a=null;const o=this.indirect?sv:$_;for(let c=0,l=r.length;c<l;c++){const u=o(this,c,e,t,n,s);u!=null&&(a==null||u.distance<a.distance)&&(a=u)}return a}intersectsGeometry(t,e){let n=!1;const s=this._roots,r=this.indirect?rv:K_;for(let a=0,o=s.length;a<o&&(n=r(this,a,t,e),!n);a++);return n}shapecast(t){const e=mn.getPrimitive(),n=super.shapecast({...t,intersectsPrimitive:t.intersectsTriangle,scratchPrimitive:e,iterate:this.indirect?X_:k_});return mn.releasePrimitive(e),n}bvhcast(t,e,n){let{intersectsRanges:s,intersectsTriangles:r}=n;const a=mn.getPrimitive(),o=this.geometry.index,c=this.geometry.attributes.position,l=this.indirect?x=>{const g=this.resolveTriangleIndex(x);Ee(a,g*3,o,c)}:x=>{Ee(a,x*3,o,c)},u=mn.getPrimitive(),h=t.geometry.index,d=t.geometry.attributes.position,f=t.indirect?x=>{const g=t.resolveTriangleIndex(x);Ee(u,g*3,h,d)}:x=>{Ee(u,x*3,h,d)};if(r){if(!(t instanceof da))throw new Error('MeshBVH: "intersectsTriangles" callback can only be used with another MeshBVH.');const x=(g,m,p,y,M,v,b,w)=>{for(let A=p,C=p+y;A<C;A++){f(A),u.a.applyMatrix4(e),u.b.applyMatrix4(e),u.c.applyMatrix4(e),u.needsUpdate=!0;for(let S=g,_=g+m;S<_;S++)if(l(S),a.needsUpdate=!0,r(a,u,S,A,M,v,b,w))return!0}return!1};if(s){const g=s;s=function(m,p,y,M,v,b,w,A){return g(m,p,y,M,v,b,w,A)?!0:x(m,p,y,M,v,b,w,A)}}else s=x}return super.bvhcast(t,e,{intersectsRanges:s})}intersectsBox(t,e){return qr.set(t.min,t.max,e),qr.needsUpdate=!0,this.shapecast({intersectsBounds:n=>qr.intersectsBox(n),intersectsTriangle:n=>qr.intersectsTriangle(n)})}intersectsSphere(t){return this.shapecast({intersectsBounds:e=>t.intersectsBox(e),intersectsTriangle:e=>e.intersectsSphere(t)})}closestPointToGeometry(t,e,n={},s={},r=0,a=1/0){return(this.indirect?uv:tv)(this,t,e,n,s,r,a)}closestPointToPoint(t,e={},n=0,s=1/0){return F_(this,t,e,n,s)}}const fs=new He,Tn=new In,Ou=new E,Bu=new E,ps=new E,_o=new bs,vo=new bs,$r=new E;class hv{constructor({groundHeight:t=0,collisionGeometry:e=null}={}){this.groundHeight=t,this.collisionGeometry=e??null,this.collisionGeometry&&!this.collisionGeometry.boundsTree&&(this.collisionGeometry.boundsTree=new da(this.collisionGeometry,{maxLeafSize:16}))}getGroundHeight(){return this.groundHeight}getGroundHeightAt(t,e,n=1/0,s=1/0,r=12){if(!this.collisionGeometry?.boundsTree||!Number.isFinite(n))return this.groundHeight;const a=n+s+.05;_o.origin.set(t,a,e),_o.direction.set(0,-1,0);const o=this.collisionGeometry.boundsTree.raycastFirst(_o,fn,0,s+r+.1);return!o||(o.face?.normal?.y??0)<=.15?this.groundHeight:Math.max(this.groundHeight,o.point.y)}move(t,e,n,s){const r=t.clone().add(s);if(!this.collisionGeometry?.boundsTree)return r;const a=r.y+e,o=r.y+Math.max(e,n-e);Tn.start.set(r.x,a,r.z),Tn.end.set(r.x,o,r.z);for(let c=0;c<3;c+=1){let l=!1;if(fs.makeEmpty(),fs.expandByPoint(Tn.start),fs.expandByPoint(Tn.end),fs.min.addScalar(-e),fs.max.addScalar(e),this.collisionGeometry.boundsTree.shapecast({intersectsBounds:u=>u.intersectsBox(fs),intersectsTriangle:u=>{const h=u.closestPointToSegment(Tn,Ou,Bu);if(h>=e)return!1;ps.copy(Bu).sub(Ou),ps.lengthSq()<1e-8?u.getNormal(ps):ps.normalize();const d=e-h;return Tn.start.addScaledVector(ps,d),Tn.end.addScaledVector(ps,d),l=!0,!1}}),!l)break}return r.set(Tn.start.x,Tn.start.y-e,Tn.start.z),r}hasLineOfSight(t,e,n=.05){if(!this.collisionGeometry?.boundsTree)return!0;$r.copy(e).sub(t);const s=$r.length();return s<=1e-4?!0:($r.divideScalar(s),vo.origin.copy(t),vo.direction.copy($r),!this.collisionGeometry.boundsTree.raycastFirst(vo,fn,0,s-n))}}const zu=new E(0,1,0),yo=new E,Mo=new E,kn=new E,Kr=new E,So=new E;class dv{constructor(t,e,n={}){this.camera=t,this.input=e,this.collisionWorld=n.collisionWorld??null,this.getSpeedMultiplier=n.getSpeedMultiplier??(()=>1),this.collider=new Je,this.yaw=new pe,this.pitch=new pe,this.standHeight=1.72,this.crouchHeight=1.08,this.currentHeight=this.standHeight,this.radius=.35,this.yaw.position.copy(n.position??new E(0,0,0)),this.yaw.add(this.pitch),this.pitch.add(this.camera),this.collider.add(this.yaw),this.velocity=new E,this.position=this.yaw.position,this.walkSpeed=4.1,this.runSpeed=6.2,this.crouchSpeed=2.2,this.jumpForce=6.1,this.gravity=18,this.acceleration=32,this.airControl=.35,this.mouseSensitivity=n.mouseSensitivity??.0011,this.baseFov=t.fov,this.crouchLerpSpeed=12,this.maxStepHeight=.45,this.groundHeight=n.groundHeight??0,this.isGrounded=!0,this.isCrouched=!1,this.pitchAngle=0,this.yawAngle=0,this.camera.position.set(0,0,0),this.pitch.position.y=this.currentHeight}getObject(){return this.collider}getDebugState(){const t=Math.sqrt(this.velocity.x*this.velocity.x+this.velocity.z*this.velocity.z);return{grounded:this.isGrounded,crouched:this.isCrouched,speed:t,position:this.position.clone()}}getEyePosition(t=new E){return t.copy(this.position).setY(this.position.y+this.currentHeight)}setMouseSensitivity(t){this.mouseSensitivity=Math.max(1e-4,t)}getMouseSensitivity(){return this.mouseSensitivity}update(t,e){this.updateLook(e.lookDelta),this.updateStance(t),this.updateMovement(t,e.justPressed)}updateLook(t){const e=this.mouseSensitivity*(this.camera.fov/this.baseFov);this.yawAngle-=t.x*e,this.pitchAngle-=t.y*e,this.pitchAngle=Se.clamp(this.pitchAngle,-Math.PI/2,Math.PI/2),this.yaw.rotation.y=this.yawAngle,this.pitch.rotation.x=this.pitchAngle}updateStance(t){this.isCrouched=this.input.isPressed("ControlLeft")||this.input.isPressed("KeyC");const e=this.isCrouched?this.crouchHeight:this.standHeight;this.currentHeight=Se.lerp(this.currentHeight,e,1-Math.exp(-this.crouchLerpSpeed*t)),this.pitch.position.y=this.currentHeight}updateMovement(t,e){const n=this.isGrounded;yo.set(0,0,-1).applyAxisAngle(zu,this.yawAngle),Mo.set(1,0,0).applyAxisAngle(zu,this.yawAngle),kn.set(0,0,0),this.input.isPressed("KeyW")&&kn.add(yo),this.input.isPressed("KeyS")&&kn.sub(yo),this.input.isPressed("KeyD")&&kn.add(Mo),this.input.isPressed("KeyA")&&kn.sub(Mo);const s=kn.lengthSq()>0;s&&kn.normalize();const r=this.getSpeedMultiplier(),a=(this.isCrouched?this.crouchSpeed:this.input.isPressed("ShiftLeft")?this.runSpeed:this.walkSpeed)*r,o=s?kn.x*a:0,c=s?kn.z*a:0,l=this.isGrounded?1:this.airControl,u=Math.min(1,this.acceleration*l*t);this.velocity.x=Se.lerp(this.velocity.x,o,u),this.velocity.z=Se.lerp(this.velocity.z,c,u),this.isGrounded&&e.has("Space")&&(this.velocity.y=this.jumpForce,this.isGrounded=!1),this.isGrounded||(this.velocity.y-=this.gravity*t),Kr.copy(this.velocity).multiplyScalar(t),So.set(Kr.x,0,Kr.z);const h=this.collisionWorld?this.collisionWorld.move(this.position,this.radius,this.currentHeight,So):this.position.clone().add(So);this.position.x=h.x,this.position.z=h.z,this.position.y+=Kr.y;const d=this.collisionWorld?.getGroundHeightAt(this.position.x,this.position.z,this.position.y,n?this.maxStepHeight:0)??this.groundHeight;n&&this.velocity.y<=0&&this.position.y<=d+this.maxStepHeight?(this.position.y=d,this.velocity.y=0,this.isGrounded=!0):this.position.y<=d?(this.position.y=d,this.velocity.y=0,this.isGrounded=!0):this.isGrounded=!1}}class fv{constructor(){this.roundNumber=1,this.phase="freeze",this.phaseTime=0,this.freezeDuration=5,this.liveDuration=115}update(t){if(this.phaseTime+=t,this.phase==="freeze"&&this.phaseTime>=this.freezeDuration){this.phase="live",this.phaseTime=0;return}this.phase==="live"&&this.phaseTime>=this.liveDuration&&(this.roundNumber+=1,this.phase="freeze",this.phaseTime=0)}}const Ac=75,Wh={rifle:{key:"rifle",slot:"Digit1",label:"Rifle",fireSound:"rifle-fire",damage:5,fireInterval:.095,automatic:!0,canScope:!0,zoomFov:52,hipfireSpread:0,swayScale:1,hasScopeOverlay:!1,hasAdsReticle:!0,hideViewModelWhenScoped:!1,aimRecoilFactor:.15,viewModel:{position:{x:.32,y:-.32,z:-.5},rotation:{x:-.16,y:-.24,z:-.08},recoilY:.03,recoilZ:.1},aimViewModel:{position:{x:0,y:-.145,z:-.16},rotation:{x:0,y:0,z:0}},movementSpeedMultiplier:1},sniper:{key:"sniper",slot:"Digit2",label:"Sniper",fireSound:"sniper-fire",zoomSound:"sniper-zoom",damage:35,fireInterval:1.25,automatic:!1,canScope:!0,zoomFov:18,hipfireSpread:.05,swayScale:.7,hasScopeOverlay:!0,hasAdsReticle:!1,hideViewModelWhenScoped:!0,aimRecoilFactor:1,viewModel:{position:{x:.24,y:-.26,z:-.68},rotation:{x:-.08,y:-.17,z:-.04},recoilY:.018,recoilZ:.14},aimViewModel:{position:{x:.24,y:-.26,z:-.44},rotation:{x:-.08,y:-.17,z:-.04}},movementSpeedMultiplier:.96},knife:{key:"knife",slot:"Digit3",label:"Knife",fireSound:"knife-slash",damage:25,meleeRange:2.2,fireInterval:.42,automatic:!1,canScope:!1,zoomFov:Ac,hipfireSpread:0,swayScale:1.2,hasScopeOverlay:!1,hasAdsReticle:!1,hideViewModelWhenScoped:!1,aimRecoilFactor:0,viewModel:{position:{x:.22,y:-.24,z:-.34},rotation:{x:.42,y:-.62,z:-.18},recoilY:0,recoilZ:0},aimViewModel:{position:{x:.22,y:-.24,z:-.34},rotation:{x:.42,y:-.62,z:-.18}},movementSpeedMultiplier:1.2}},pv=Object.values(Wh).reduce((i,t)=>(i.set(t.slot,t),i),new Map);function mv(i){return pv.get(i)??null}const ya=1;function Ma(i,t){i.layers.set(t),i.children.forEach(e=>Ma(e,t))}function be(i,t,e,n=null){const s=new ee(i,t);return s.position.copy(e),n&&s.rotation.set(n.x,n.y,n.z),s}function Xh(){return{dark:new ae({color:2369581,roughness:.68,metalness:.24}),accent:new ae({color:8018743,roughness:.94,metalness:.03}),detail:new ae({color:1514015,roughness:.62,metalness:.3})}}function qh(i){const t=new ee(new ma(.07,.22,8),new _i({color:16765324,transparent:!0,opacity:0}));return t.rotation.x=Math.PI/2,t.position.copy(i.position).add(new E(0,0,-.06)),t}function xv(){const i=new ee(new xi(.001,4,4),new _i({color:16777215,transparent:!0,opacity:0}));return i.visible=!1,i}function gv(){const i=new Je,t=Xh(),e=be(new Jt(.2,.18,.75),t.dark,new E(0,0,-.2)),n=be(new Jt(.16,.14,.52),t.accent,new E(0,-.01,-.72)),s=be(new Qe(.024,.024,.58,12),t.detail,new E(0,.01,-1.12),new E(Math.PI/2,0,0)),r=be(new Qe(.034,.034,.24,12),t.detail,new E(0,.01,-1.48),new E(Math.PI/2,0,0)),a=be(new Jt(.12,.12,.34),t.dark,new E(.01,.01,.28),new E(-.1,0,-.12)),o=be(new Jt(.08,.24,.16),t.detail,new E(.01,-.18,-.18),new E(-.24,0,.04)),c=be(new Jt(.05,.03,.08),t.detail,new E(0,.105,-.2)),l=new Je;l.position.set(0,.145,-.26);const u=be(new Xc(.04,.006,8,20),t.detail,new E(0,0,0));l.add(u);const h=be(new Jt(.026,.022,.026),t.detail,new E(0,.078,-.9)),d=new pe;d.position.set(0,.005,-1.62);const f=qh(d);return i.add(e,n,s,r,a,o,c,l,h),i.add(d,f),Ma(i,ya),{group:i,muzzle:d,muzzleFlash:f}}function _v(){const i=new Je,t=Xh(),e=new ae({color:1119513,roughness:.58,metalness:.32}),n=be(new Jt(.18,.16,1.05),t.dark,new E(0,-.01,-.12)),s=be(new Jt(.11,.12,.46),t.accent,new E(.01,-.01,.62),new E(-.08,0,-.06)),r=be(new Jt(.14,.1,.42),t.accent,new E(0,-.02,-.78)),a=be(new Qe(.022,.022,1.05,12),t.detail,new E(0,0,-1.38),new E(Math.PI/2,0,0)),o=be(new Qe(.08,.08,.54,16),e,new E(0,.15,-.26),new E(Math.PI/2,0,0)),c=be(new Qe(.095,.095,.08,16),e,new E(0,.15,-.56),new E(Math.PI/2,0,0)),l=be(new Qe(.085,.085,.08,16),e,new E(0,.15,.04),new E(Math.PI/2,0,0)),u=new pe;u.position.set(0,0,-1.93);const h=qh(u);return i.add(n,s,r,a,o,c,l),i.add(u,h),Ma(i,ya),{group:i,muzzle:u,muzzleFlash:h}}function vv(){const i=new Je,t=new ae({color:12107976,roughness:.38,metalness:.62}),e=new ae({color:1514015,roughness:.78,metalness:.14}),n=new ae({color:3488578,roughness:.54,metalness:.4}),s=be(new Qe(.03,.038,.26,10),e,new E(.02,-.1,.08),new E(Math.PI/2,0,0)),r=be(new xi(.038,10,10),n,new E(.02,-.1,.21)),a=be(new Jt(.04,.1,.024),n,new E(.02,-.1,-.06)),o=be(new ma(.042,.62,4),t,new E(.02,-.08,-.42),new E(-Math.PI/2,Math.PI/4,0)),c=be(new Jt(.034,.018,.08),n,new E(.02,-.084,-.02),new E(.18,0,0)),l=new pe;l.position.set(.02,-.08,-.72);const u=xv();return i.add(s,r,a,o,c),i.add(l,u),Ma(i,ya),{group:i,muzzle:l,muzzleFlash:u}}function yv(){return{rifle:gv(),sniper:_v(),knife:vv()}}const Yh=new E(0,1,0);function Mv(i,t=Yh){const e=new ee(new xi(.08,8,8),new _i({color:16757611}));return e.position.copy(i).addScaledVector(t,.05),e.userData.life=.25,e}function $h(i,t){const e=new Ue().setFromPoints([i.clone(),t.clone()]),n=new Hc({color:16770992,transparent:!0,opacity:.9}),s=new Sh(e,n);return s.userData.life=.05,s}function Sv(i,t,e,n){const s=Mv(n.point,n.face?.normal??Yh),r=$h(e,n.point);i.add(s,r),t.push(s,r)}function bv(i,t,e,n){const s=$h(e,n);i.add(s),t.push(s)}function wv(i,t,e){for(let n=t.length-1;n>=0;n-=1){const s=t[n];s.userData.life-=e,s.material?.opacity!==void 0&&(s.material.opacity=Math.max(s.userData.life*10,0)),s.userData.life<=0&&(s.geometry?.dispose?.(),s.material?.dispose?.(),i.remove(s),t.splice(n,1))}}const Kh=new Rt,Vu=new E,ku=new E;function Hu(i,t,e){e.fireSound&&i?.play(e.fireSound,{baseVolume:t==="sniper"?.72:t==="knife"?.5:.6,pitchMin:t==="sniper"?.992:t==="knife"?.94:.95,pitchMax:t==="sniper"?1.008:t==="knife"?1.08:1.06})}function Ev(i,t,e=Kh){return e.set(0,0),i.hipfireSpread>0&&!t&&(e.x=(Math.random()*2-1)*i.hipfireSpread,e.y=(Math.random()*2-1)*i.hipfireSpread),e}function Tv({camera:i,scene:t,shootables:e,raycaster:n,temporaryObjects:s,muzzleWorld:r,weapon:a,isScoped:o}){const c=Ev(a,o);n.layers.set(0),n.setFromCamera(c,i);const l=n.intersectObjects(e,!1)[0];return l?(Sv(t,s,r,l),l.object.userData.damageReceiver?.applyDamage(a.damage,l.point,l),l):(Vu.copy(n.ray.origin).addScaledVector(n.ray.direction,120),bv(t,s,r,Vu),null)}function Av({camera:i,shootables:t,raycaster:e,weapon:n}){e.layers.set(0),e.setFromCamera(Kh.set(0,0),i);const s=e.intersectObjects(t,!1)[0];return!s||s.distance>n.meleeRange?null:(ku.copy(s.point),s.object.userData.damageReceiver?.applyDamage(n.damage,ku,s),s)}const Hs=new E;function Rv({viewModel:i,muzzleFlash:t,currentWeapon:e,isScoped:n,recoil:s,flashTime:r,knifeAttackTime:a,knifeAttackDuration:o,delta:c,lookDelta:l}){if(!i||!e)return;const u=Se.clamp(-l.x*55e-5*e.swayScale,-.03,.03),h=Se.clamp(l.y*45e-5*e.swayScale,-.025,.025);Hs.set(u,h,0);const{position:d,rotation:f,recoilY:x,recoilZ:g}=e.viewModel,m=e.aimViewModel??e.viewModel,p=n?1:0,y=1-p,M=Se.lerp(1,e.aimRecoilFactor??1,p),v=a>0?Math.sin((1-a/o)*Math.PI):0,b=Se.lerp(d.x,m.position.x,p),w=Se.lerp(d.y,m.position.y,p),A=Se.lerp(d.z,m.position.z,p),C=Se.lerp(f.x,m.rotation.x,p),S=Se.lerp(f.y,m.rotation.y,p),_=Se.lerp(f.z,m.rotation.z,p);i.position.x=Se.damp(i.position.x,b+Hs.x*y-v*.04,18,c),i.position.y=Se.damp(i.position.y,w+Hs.y*y+s*x*M-v*.05,18,c),i.position.z=Se.damp(i.position.z,A+s*g*M-v*.42,22,c),i.rotation.x=Se.damp(i.rotation.x,C-s*.08*M-v*.32,16,c),i.rotation.y=Se.damp(i.rotation.y,S-Hs.x*.6*y+v*.16,16,c),i.rotation.z=Se.damp(i.rotation.z,_-Hs.x*.8*y-v*.08,16,c),i.visible=!(n&&e.hideViewModelWhenScoped),t.material.opacity=r>0?r/.04:0,t.scale.setScalar(1+s*.35)}const Gu=new E;class Cv{constructor({camera:t,scene:e,shootables:n=[],audioManager:s=null}){this.camera=t,this.scene=e,this.shootables=n,this.audioManager=s,this.cooldown=0,this.recoil=0,this.flashTime=0,this.shotCount=0,this.baseFov=Ac,this.zoomFov=Ac,this.isScoped=!1,this.showScopeOverlay=!1,this.showAdsReticle=!1,this.activeWeaponKey=null,this.activeWeapon="",this.currentWeapon=null,this.triggerHeld=!1,this.wasScoped=!1,this.knifeAttackTime=0,this.knifeAttackDuration=.18,this.raycaster=new np,this.temporaryObjects=[],this.viewModels=yv(),Object.values(this.viewModels).forEach(r=>{r.group.visible=!1,this.camera.add(r.group)}),this.camera.layers.enable(ya),this.camera.fov=this.baseFov,this.camera.updateProjectionMatrix(),this.equipWeapon("rifle")}getMovementSpeedMultiplier(){return this.currentWeapon?.movementSpeedMultiplier??1}equipWeapon(t){const e=Wh[t];if(!e||this.activeWeaponKey===t)return;this.viewModel&&(this.viewModel.visible=!1),this.activeWeaponKey=t,this.currentWeapon=e,this.activeWeapon=e.label,this.isScoped=!1,this.showScopeOverlay=!1,this.showAdsReticle=!1,this.cooldown=0,this.recoil=0,this.triggerHeld=!1,this.wasScoped=!1;const n=this.viewModels[t];n.group.visible=!0,this.viewModel=n.group,this.muzzle=n.muzzle,this.muzzleFlash=n.muzzleFlash}update(t,e){this.handleWeaponSwap(e.justPressed),this.handleScope(e.mouseButtons),this.cooldown=Math.max(0,this.cooldown-t),this.flashTime=Math.max(0,this.flashTime-t),this.recoil=Se.damp(this.recoil,0,16,t),this.knifeAttackTime=Math.max(0,this.knifeAttackTime-t),this.zoomFov=Se.damp(this.zoomFov,this.isScoped?this.currentWeapon.zoomFov:this.baseFov,14,t),this.camera.fov=this.zoomFov,this.camera.updateProjectionMatrix();const n=e.mouseButtons.has(0);this.currentWeapon.canFire!==!1&&(this.currentWeapon.automatic?n:n&&!this.triggerHeld)&&this.cooldown===0&&this.fire(),this.triggerHeld=n,this.updateViewModel(t,e.lookDelta),this.updateTemporaryObjects(t)}handleWeaponSwap(t){for(const e of t){const n=mv(e);if(n){this.equipWeapon(n.key);return}}}handleScope(t){this.isScoped=this.currentWeapon.canScope!==!1&&t.has(2),this.showScopeOverlay=this.isScoped&&this.currentWeapon.hasScopeOverlay,this.showAdsReticle=this.isScoped&&this.currentWeapon.hasAdsReticle,this.activeWeaponKey==="sniper"&&this.isScoped!==this.wasScoped&&this.currentWeapon.zoomSound&&this.audioManager?.play(this.currentWeapon.zoomSound,{baseVolume:.45,pitchMin:.995,pitchMax:1.005}),this.wasScoped=this.isScoped}fire(){if(this.currentWeapon.canFire!==!1){if(this.activeWeaponKey==="knife"){this.performKnifeAttack();return}this.cooldown=this.currentWeapon.fireInterval,this.flashTime=.04,this.recoil=Math.min(this.recoil+(this.activeWeaponKey==="sniper"?1.25:1),1.5),this.shotCount+=1,Hu(this.audioManager,this.activeWeaponKey,this.currentWeapon),this.muzzle.getWorldPosition(Gu),Tv({camera:this.camera,scene:this.scene,shootables:this.shootables,raycaster:this.raycaster,temporaryObjects:this.temporaryObjects,muzzleWorld:Gu,weapon:this.currentWeapon,isScoped:this.isScoped})}}performKnifeAttack(){this.cooldown=this.currentWeapon.fireInterval,this.knifeAttackTime=this.knifeAttackDuration,Hu(this.audioManager,this.activeWeaponKey,this.currentWeapon),Av({camera:this.camera,shootables:this.shootables,raycaster:this.raycaster,weapon:this.currentWeapon})}updateViewModel(t,e){Rv({viewModel:this.viewModel,muzzleFlash:this.muzzleFlash,currentWeapon:this.currentWeapon,isScoped:this.isScoped,recoil:this.recoil,flashTime:this.flashTime,knifeAttackTime:this.knifeAttackTime,knifeAttackDuration:this.knifeAttackDuration,delta:t,lookDelta:e})}updateTemporaryObjects(t){wv(this.scene,this.temporaryObjects,t)}destroy(){this.updateTemporaryObjects(1/0),Object.values(this.viewModels).forEach(t=>{this.camera.remove(t.group)})}}class Pv{constructor(){this.activeUtility="Flashbang"}update(){}}class Dv{update(){}}class Lv{constructor(t=[]){this.targets=[...t]}update(t,e={}){for(const n of this.targets)n.update(t,e)}destroy(){for(const t of this.targets)t.destroy?.();this.targets.length=0}}const Iv="modulepreload",Uv=function(i){return"/"+i},Wu={},Nv=function(t,e,n){let s=Promise.resolve();if(e&&e.length>0){let l=function(u){return Promise.all(u.map(h=>Promise.resolve(h).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};var a=l;document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),c=o?.nonce||o?.getAttribute("nonce");s=l(e.map(u=>{if(u=Uv(u),u in Wu)return;Wu[u]=!0;const h=u.endsWith(".css"),d=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${d}`))return;const f=document.createElement("link");if(f.rel=h?"stylesheet":Iv,h||(f.as="script"),f.crossOrigin="",f.href=u,c&&f.setAttribute("nonce",c),document.head.appendChild(f),h)return new Promise((x,g)=>{f.addEventListener("load",x),f.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${u}`)))})}))}function r(o){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=o,window.dispatchEvent(c),!c.defaultPrevented)throw o}return s.then(o=>{for(const c of o||[])c.status==="rejected"&&r(c.reason);return t().catch(r)})},Fv=["Recast","Detour","DetourNavMeshBuilder","DetourTileCacheBuilder","NavMeshImporter","NavMeshExporter","CrowdUtils","ChunkyTriMeshUtils","RecastDebugDraw","DetourDebugDraw"],Ov=["rcConfig","rcContext","dtNavMeshParams","dtNavMeshCreateParams","RecastLinearAllocator","RecastFastLZCompressor","rcChunkyTriMesh","dtTileCacheParams","dtTileCacheLayerHeader","Vec3","BoolRef","IntRef","UnsignedIntRef","UnsignedCharRef","UnsignedShortRef","FloatRef","IntArray","UnsignedIntArray","UnsignedCharArray","UnsignedShortArray","FloatArray"],O={isNull:i=>O.Module.getPointer(i)===0,destroy:i=>{O.Module.destroy(i)}},It={},Bv=async i=>{if(O.Module===void 0){{const t=(await Nv(async()=>{const{default:e}=await import("./recast-navigation.wasm-compat-8ehSj8eI.js");return{default:e}},[])).default;O.Module=await t()}for(const t of Fv)O[t]=new O.Module[t];for(const t of Ov)O[t]=O.Module[t];It.RC_BORDER_REG=O.Recast.BORDER_REG,It.RC_MULTIPLE_REGS=O.Recast.MULTIPLE_REGS,It.RC_BORDER_VERTEX=O.Recast.BORDER_VERTEX,It.RC_AREA_BORDER=O.Recast.AREA_BORDER,It.RC_CONTOUR_REG_MASK=O.Recast.CONTOUR_REG_MASK,It.RC_MESH_NULL_IDX=O.Recast.MESH_NULL_IDX,It.RC_NULL_AREA=O.Recast.NULL_AREA,It.RC_WALKABLE_AREA=O.Recast.WALKABLE_AREA,It.RC_NOT_CONNECTED=O.Recast.NOT_CONNECTED,It.RC_CONTOUR_TESS_WALL_EDGES=O.Module.RC_CONTOUR_TESS_WALL_EDGES,It.RC_CONTOUR_TESS_AREA_EDGES=O.Module.RC_CONTOUR_TESS_AREA_EDGES,It.RC_LOG_PROGRESS=O.Module.RC_LOG_PROGRESS,It.RC_LOG_WARNING=O.Module.RC_LOG_WARNING,It.RC_LOG_ERROR=O.Module.RC_LOG_ERROR,It.RC_TIMER_TOTAL=O.Module.RC_TIMER_TOTAL,It.RC_TIMER_TEMP=O.Module.RC_TIMER_TEMP,It.RC_TIMER_RASTERIZE_TRIANGLES=O.Module.RC_TIMER_RASTERIZE_TRIANGLES,It.RC_TIMER_BUILD_COMPACTHEIGHTFIELD=O.Module.RC_TIMER_BUILD_COMPACTHEIGHTFIELD,It.RC_TIMER_BUILD_CONTOURS=O.Module.RC_TIMER_BUILD_CONTOURS,It.RC_TIMER_BUILD_CONTOURS_TRACE=O.Module.RC_TIMER_BUILD_CONTOURS_TRACE,It.RC_TIMER_BUILD_CONTOURS_SIMPLIFY=O.Module.RC_TIMER_BUILD_CONTOURS_SIMPLIFY,It.RC_TIMER_FILTER_BORDER=O.Module.RC_TIMER_FILTER_BORDER,It.RC_TIMER_FILTER_WALKABLE=O.Module.RC_TIMER_FILTER_WALKABLE,It.RC_TIMER_MEDIAN_AREA=O.Module.RC_TIMER_MEDIAN_AREA,It.RC_TIMER_FILTER_LOW_OBSTACLES=O.Module.RC_TIMER_FILTER_LOW_OBSTACLES,It.RC_TIMER_BUILD_POLYMESH=O.Module.RC_TIMER_BUILD_POLYMESH,It.RC_TIMER_MERGE_POLYMESH=O.Module.RC_TIMER_MERGE_POLYMESH,It.RC_TIMER_ERODE_AREA=O.Module.RC_TIMER_ERODE_AREA,It.RC_TIMER_MARK_BOX_AREA=O.Module.RC_TIMER_MARK_BOX_AREA,It.RC_TIMER_MARK_CYLINDER_AREA=O.Module.RC_TIMER_MARK_CYLINDER_AREA,It.RC_TIMER_MARK_CONVEXPOLY_AREA=O.Module.RC_TIMER_MARK_CONVEXPOLY_AREA,It.RC_TIMER_BUILD_DISTANCEFIELD=O.Module.RC_TIMER_BUILD_DISTANCEFIELD,It.RC_TIMER_BUILD_DISTANCEFIELD_DIST=O.Module.RC_TIMER_BUILD_DISTANCEFIELD_DIST,It.RC_TIMER_BUILD_DISTANCEFIELD_BLUR=O.Module.RC_TIMER_BUILD_DISTANCEFIELD_BLUR,It.RC_TIMER_BUILD_REGIONS=O.Module.RC_TIMER_BUILD_REGIONS,It.RC_TIMER_BUILD_REGIONS_WATERSHED=O.Module.RC_TIMER_BUILD_REGIONS_WATERSHED,It.RC_TIMER_BUILD_REGIONS_EXPAND=O.Module.RC_TIMER_BUILD_REGIONS_EXPAND,It.RC_TIMER_BUILD_REGIONS_FLOOD=O.Module.RC_TIMER_BUILD_REGIONS_FLOOD,It.RC_TIMER_BUILD_REGIONS_FILTER=O.Module.RC_TIMER_BUILD_REGIONS_FILTER,It.RC_TIMER_BUILD_LAYERS=O.Module.RC_TIMER_BUILD_LAYERS,It.RC_TIMER_BUILD_POLYMESHDETAIL=O.Module.RC_TIMER_BUILD_POLYMESHDETAIL,It.RC_TIMER_MERGE_POLYMESHDETAIL=O.Module.RC_TIMER_MERGE_POLYMESHDETAIL,It.RC_MAX_TIMERS=O.Module.RC_MAX_TIMERS,O.Detour.FAILURE,O.Detour.SUCCESS,O.Detour.IN_PROGRESS,O.Detour.STATUS_DETAIL_MASK,O.Detour.WRONG_MAGIC,O.Detour.WRONG_VERSION,O.Detour.OUT_OF_MEMORY,O.Detour.INVALID_PARAM,O.Detour.BUFFER_TOO_SMALL,O.Detour.OUT_OF_NODES,O.Detour.PARTIAL_RESULT,O.Detour.ALREADY_OCCUPIED,O.Detour.VERTS_PER_POLYGON,O.Detour.NAVMESH_MAGIC,O.Detour.NAVMESH_VERSION,O.Detour.NAVMESH_STATE_MAGIC,O.Detour.NAVMESH_STATE_VERSION,O.Detour.TILECACHE_MAGIC,O.Detour.TILECACHE_VERSION,O.Detour.TILECACHE_NULL_AREA,O.Detour.TILECACHE_WALKABLE_AREA,O.Detour.TILECACHE_NULL_IDX,O.Detour.NULL_LINK,O.Detour.NULL_LINK,O.Detour.EXT_LINK,O.Detour.OFFMESH_CON_BIDIR,O.Module.DT_STRAIGHTPATH_START,O.Module.DT_STRAIGHTPATH_END,O.Module.DT_STRAIGHTPATH_OFFMESH_CONNECTION,O.Module.DT_STRAIGHTPATH_AREA_CROSSINGS,O.Module.DT_STRAIGHTPATH_ALL_CROSSINGS,O.Module.DT_FINDPATH_ANY_ANGLE,O.Module.DT_RAYCAST_USE_COSTS,O.Module.DT_CROWDAGENT_STATE_INVALID,O.Module.DT_CROWDAGENT_STATE_WALKING,O.Module.DT_CROWDAGENT_STATE_OFFMESH,O.Module.DT_CROWDAGENT_TARGET_NONE,O.Module.DT_CROWDAGENT_TARGET_FAILED,O.Module.DT_CROWDAGENT_TARGET_VALID,O.Module.DT_CROWDAGENT_TARGET_REQUESTING,O.Module.DT_CROWDAGENT_TARGET_WAITING_FOR_QUEUE,O.Module.DT_CROWDAGENT_TARGET_WAITING_FOR_PATH,O.Module.DT_CROWDAGENT_TARGET_VELOCITY,O.Module.DT_COMPRESSEDTILE_FREE_DATA,O.Module.DT_TILE_FREE_DATA}};class Sa{get size(){return this.raw.size}constructor(t){this.raw=t}get(t){return this.raw.get(t)}set(t,e){this.raw.set(t,e)}resize(t){this.raw.resize(t)}copy(t){this.raw.resize(t.length),this.getHeapView().set(t)}destroy(){O.destroy(this.raw)}getHeapView(){const t=this.getHeap();return new this.typedArrayClass(t.buffer,this.raw.getDataPointer(),this.size)}toTypedArray(){const t=this.getHeapView(),e=new this.typedArrayClass(this.size);return e.set(t),e}}class Qc extends Sa{typedArrayClass=Int32Array;constructor(t){super(t??new O.Module.IntArray)}getHeap(){return O.Module.HEAP32}static fromRaw(t){return new Qc(t)}}class Wn extends Sa{typedArrayClass=Uint32Array;constructor(t){super(t??new O.Module.UnsignedIntArray)}getHeap(){return O.Module.HEAPU32}static fromRaw(t){return new Wn(t)}}class ir extends Sa{typedArrayClass=Uint8Array;constructor(t){super(t??new O.Module.UnsignedCharArray)}getHeap(){return O.Module.HEAPU8}static fromRaw(t){return new ir(t)}}class Qs extends Sa{typedArrayClass=Float32Array;constructor(t){super(t??new O.Module.FloatArray)}getHeap(){return O.Module.HEAPF32}static fromRaw(t){return new Qs(t)}}const zv=Qs,Vv=Qc,kv=ir,Gt={toRaw:({x:i,y:t,z:e},n)=>n?(n.x=i,n.y=t,n.z=e,n):new O.Module.Vec3(i,t,e),fromRaw:i=>{const{x:t,y:e,z:n}=i;return{x:t,y:e,z:n}},fromArray:([i,t,e])=>({x:i,y:t,z:e}),toArray:({x:i,y:t,z:e})=>[i,t,e],lerp:(i,t,e,n={x:0,y:0,z:0})=>{n.x=i.x+(t.x-i.x)*e,n.y=i.y+(t.y-i.y)*e,n.z=i.z+(t.z-i.z)*e},copy:(i,t={x:0,y:0,z:0})=>{t.x=i.x,t.y=i.y,t.z=i.z}},ke=(i,t)=>{const e=[];for(let n=0;n<t;n++)e.push(i(n));return e},je=i=>O.Detour.statusSucceed(i);class Hv{constructor(t){this.raw=t}vertBase(){return this.raw.vertBase}triBase(){return this.raw.triBase}vertCount(){return this.raw.vertCount}triCount(){return this.raw.triCount}}class Gv{constructor(t){this.raw=t}ref(){return this.raw.ref}next(){return this.raw.next}edge(){return this.raw.edge}side(){return this.raw.side}bmin(){return this.raw.bmin}bmax(){return this.raw.bmax}}class Wv{constructor(t){this.raw=t}bmin(){return Gt.fromArray(ke(t=>this.raw.get_bmin(t),3))}bmax(){return Gt.fromArray(ke(t=>this.raw.get_bmax(t),3))}i(){return this.raw.i}}class Zh{constructor(t){this.raw=t}pos(t){return this.raw.get_pos(t)}rad(){return this.raw.rad}poly(){return this.raw.poly}flags(){return this.raw.flags}side(){return this.raw.side}userId(){return this.raw.userId}}class Xv{constructor(t){this.raw=t}magic(){return this.raw.magic}version(){return this.raw.version}x(){return this.raw.x}y(){return this.raw.y}layer(){return this.raw.layer}userId(){return this.raw.userId}polyCount(){return this.raw.polyCount}vertCount(){return this.raw.vertCount}maxLinkCount(){return this.raw.maxLinkCount}detailMeshCount(){return this.raw.detailMeshCount}detailVertCount(){return this.raw.detailVertCount}detailTriCount(){return this.raw.detailTriCount}bvNodeCount(){return this.raw.bvNodeCount}offMeshConCount(){return this.raw.offMeshConCount}offMeshBase(){return this.raw.offMeshBase}walkableHeight(){return this.raw.walkableHeight}walkableRadius(){return this.raw.walkableRadius}walkableClimb(){return this.raw.walkableClimb}bmin(t){return this.raw.get_bmin(t)}bmax(t){return this.raw.get_bmax(t)}bvQuantFactor(){return this.raw.bvQuantFactor}}class Rc{constructor(t){this.raw=t}firstLink(){return this.raw.firstLink}verts(t){return this.raw.get_verts(t)}neis(t){return this.raw.get_neis(t)}flags(){return this.raw.flags}vertCount(){return this.raw.vertCount}areaAndType(){return this.raw.get_areaAndtype()}getType(){return this.raw.getType()}}class hi{constructor(t){this.raw=t}salt(){return this.raw.salt}linksFreeList(){return this.raw.linksFreeList}header(){return O.isNull(this.raw.header)?null:new Xv(this.raw.header)}polys(t){return new Rc(this.raw.get_polys(t))}verts(t){return this.raw.get_verts(t)}links(t){return new Gv(this.raw.get_links(t))}detailMeshes(t){return new Hv(this.raw.get_detailMeshes(t))}detailVerts(t){return this.raw.get_detailVerts(t)}detailTris(t){return this.raw.get_detailTris(t)}bvTree(t){return new Wv(this.raw.get_bvTree(t))}offMeshCons(t){return new Zh(this.raw.get_offMeshCons(t))}data(t){return this.raw.get_data(t)}dataSize(){return this.raw.dataSize}flags(){return this.raw.flags}next(){return new hi(this.raw.next)}}const qv=i=>{const t=O.DetourNavMeshBuilder.createNavMeshData(i.raw);return{success:t.success,navMeshData:ir.fromRaw(t.navMeshData)}};class Yv{constructor(t){this.raw=t??new O.Module.dtNavMeshCreateParams}setPolyMeshCreateParams(t){O.DetourNavMeshBuilder.setPolyMeshCreateParams(this.raw,t.raw)}setPolyMeshDetailCreateParams(t){O.DetourNavMeshBuilder.setPolyMeshDetailCreateParams(this.raw,t.raw)}setOffMeshConnections(t){if(t.length<=0)return;const e=[],n=[],s=[],r=[],a=[],o=[];for(let c=0;c<t.length;c++){const l=t[c];e.push(l.startPosition.x,l.startPosition.y,l.startPosition.z),e.push(l.endPosition.x,l.endPosition.y,l.endPosition.z),n.push(l.radius),s.push(l.bidirectional?1:0),r.push(l.area??0),a.push(l.flags??1),o.push(l.userId??1e3+c)}O.DetourNavMeshBuilder.setOffMeshConnections(this.raw,t.length,e,n,s,r,a,o)}verts(t){return this.raw.get_verts(t)}setVerts(t,e){this.raw.set_verts(t,e)}vertCount(){return this.raw.vertCount}polys(t){return this.raw.get_polys(t)}setPolys(t,e){this.raw.set_polys(t,e)}polyAreas(t){return this.raw.get_polyAreas(t)}setPolyAreas(t,e){this.raw.set_polyAreas(t,e)}polyFlags(t){return this.raw.get_polyFlags(t)}setPolyFlags(t,e){this.raw.set_polyFlags(t,e)}polyCount(){return this.raw.polyCount}nvp(){return this.raw.nvp}setNvp(t){this.raw.nvp=t}detailMeshes(t){return this.raw.get_detailMeshes(t)}setDetailMeshes(t,e){this.raw.set_detailMeshes(t,e)}detailVerts(t){return this.raw.get_detailVerts(t)}setDetailVerts(t,e){this.raw.set_detailVerts(t,e)}detailVertsCount(){return this.raw.detailVertsCount}detailTris(t){return this.raw.get_detailTris(t)}setDetailTris(t,e){this.raw.set_detailTris(t,e)}detailTriCount(){return this.raw.detailTriCount}offMeshConVerts(t){return this.raw.get_offMeshConVerts(t)}offMeshConRad(t){return this.raw.get_offMeshConRad(t)}offMeshConDir(t){return this.raw.get_offMeshConDir(t)}offMeshConAreas(t){return this.raw.get_offMeshConAreas(t)}offMeshConFlags(t){return this.raw.get_offMeshConFlags(t)}offMeshConUserID(t){return this.raw.get_offMeshConUserID(t)}offMeshConCount(){return this.raw.offMeshConCount}userId(){return this.raw.userId}tileX(){return this.raw.tileX}setTileX(t){this.raw.tileX=t}tileY(){return this.raw.tileY}setTileY(t){this.raw.tileY=t}tileLayer(){return this.raw.tileLayer}setTileLayer(t){this.raw.tileLayer=t}boundsMin(){return ke(t=>this.raw.get_bmin(t),3)}setBoundsMin(t){this.raw.set_bmin(0,t[0]),this.raw.set_bmin(1,t[1]),this.raw.set_bmin(2,t[2])}boundsMax(){return ke(t=>this.raw.get_bmax(t),3)}setBoundsMax(t){this.raw.set_bmax(0,t[0]),this.raw.set_bmax(1,t[1]),this.raw.set_bmax(2,t[2])}walkableHeight(){return this.raw.walkableHeight}setWalkableHeight(t){this.raw.walkableHeight=t}walkableRadius(){return this.raw.walkableRadius}setWalkableRadius(t){this.raw.walkableRadius=t}walkableClimb(){return this.raw.walkableClimb}setWalkableClimb(t){this.raw.walkableClimb=t}cellSize(){return this.raw.cs}setCellSize(t){this.raw.cs=t}cellHeight(){return this.raw.ch}setCellHeight(t){this.raw.ch=t}buildBvTree(){return this.raw.buildBvTree}setBuildBvTree(t){this.raw.buildBvTree=t}}class $v{get includeFlags(){return this.raw.getIncludeFlags()}set includeFlags(t){this.raw.setIncludeFlags(t)}get excludeFlags(){return this.raw.getExcludeFlags()}set excludeFlags(t){this.raw.setExcludeFlags(t)}constructor(t){this.raw=t??new O.Module.dtQueryFilter}getAreaCost(t){return this.raw.getAreaCost(t)}setAreaCost(t,e){this.raw.setAreaCost(t,e)}}class Kv{defaultQueryHalfExtents={x:1,y:1,z:1};constructor(t,e){t instanceof O.Module.NavMeshQuery?this.raw=t:(this.raw=new O.Module.NavMeshQuery,this.raw.init(t.raw,e?.maxNodes??2048)),e?.defaultQueryFilter?this.defaultFilter=e.defaultQueryFilter:(this.defaultFilter=new $v,this.defaultFilter.includeFlags=65535,this.defaultFilter.excludeFlags=0)}findNearestPoly(t,e){const n=new O.UnsignedIntRef,s=new O.Vec3,r=new O.BoolRef,a=this.raw.findNearestPoly(Gt.toArray(t),Gt.toArray(e?.halfExtents??this.defaultQueryHalfExtents),e?.filter?.raw??this.defaultFilter.raw,n,s,r),o=Gt.fromRaw(s);O.destroy(s);const c=n.value;O.destroy(n);const l=r.value;return O.destroy(r),{success:je(a),status:a,nearestRef:c,nearestPoint:o,isOverPoly:l}}findPolysAroundCircle(t,e,n,s){const r=s?.filter??this.defaultFilter,a=s?.maxPolys??256,o=new Wn,c=new Wn,l=new Qs;o.resize(a),c.resize(a),l.resize(a);const u=new O.IntRef,h=this.raw.findPolysAroundCircle(t,Gt.toArray(e),n,r.raw,o.raw,c.raw,l.raw,u,a),d=[...o.getHeapView()];o.destroy();const f=[...c.getHeapView()];c.destroy();const x=[...l.getHeapView()];l.destroy();const g=u.value;return O.destroy(u),{success:je(h),status:h,resultRefs:d,resultParents:f,resultCost:x,resultCount:g}}queryPolygons(t,e,n){const s=n?.filter??this.defaultFilter,r=n?.maxPolys??256,a=new Wn;a.resize(r);const o=new O.IntRef,c=this.raw.queryPolygons(Gt.toArray(t),Gt.toArray(e),s.raw,a.raw,o,r),l=o.value;O.destroy(o);const u=[...a.getHeapView()].slice(0,l);return a.destroy(),{success:je(c),status:c,polyRefs:u}}closestPointOnPoly(t,e){const n=new O.Vec3,s=new O.BoolRef,r=this.raw.closestPointOnPoly(t,Gt.toArray(e),n,s),a=Gt.fromRaw(n);O.destroy(n);const o=s.value;return O.destroy(s),{success:je(r),status:r,closestPoint:a,isPointOverPoly:o}}findClosestPoint(t,e){const n=e?.filter??this.defaultFilter,s=e?.halfExtents??this.defaultQueryHalfExtents,r=new O.UnsignedIntRef,a=new O.Vec3,o=new O.BoolRef,c=this.raw.findClosestPoint(Gt.toArray(t),Gt.toArray(s),n.raw,r,a,o),l=r.value;O.destroy(r);const u=Gt.fromRaw(a);O.destroy(a);const h=o.value;return O.destroy(o),{success:je(c),status:c,polyRef:l,point:u,isPointOverPoly:h}}findRandomPointAroundCircle(t,e,n){const s=n?.filter??this.defaultFilter,r=n?.halfExtents??this.defaultQueryHalfExtents;let a;if(n?.startRef)a=n.startRef;else{const d=this.findNearestPoly(t,{filter:s,halfExtents:r});if(!d.success)return{success:!1,status:d.status,randomPolyRef:0,randomPoint:{x:0,y:0,z:0}};a=d.nearestRef}const o=new O.UnsignedIntRef,c=new O.Vec3,l=this.raw.findRandomPointAroundCircle(a,Gt.toArray(t),e,s.raw,o,c),u=o.value;O.destroy(o);const h=Gt.fromRaw(c);return O.destroy(c),{success:je(l),status:l,randomPolyRef:u,randomPoint:h}}moveAlongSurface(t,e,n,s){const r=s?.maxVisitedSize??256,a=new O.Vec3,o=new Wn,c=s?.filter?.raw??this.defaultFilter.raw,l=this.raw.moveAlongSurface(t,Gt.toArray(e),Gt.toArray(n),c,a,o.raw,r),u=Gt.fromRaw(a);O.destroy(a);const h=[...o.getHeapView()];return o.destroy(),{success:je(l),status:l,resultPosition:u,visited:h}}findRandomPoint(t){const e=new O.UnsignedIntRef,n=new O.Vec3,s=this.raw.findRandomPoint(t?.filter?.raw??this.defaultFilter.raw,e,n),r=e.value;O.destroy(e);const a=Gt.fromRaw(n);return O.destroy(n),{success:je(s),status:s,randomPolyRef:r,randomPoint:a}}getPolyHeight(t,e){const n=new O.FloatRef,s=this.raw.getPolyHeight(t,Gt.toArray(e),n),r=n.value;return O.destroy(n),{success:je(s),status:s,height:r}}computePath(t,e,n){const s=n?.filter??this.defaultFilter,r=n?.halfExtents??this.defaultQueryHalfExtents,a=this.findNearestPoly(t,{filter:s,halfExtents:r});if(!a.success)return{success:!1,error:{name:"findNearestPoly for start position failed",status:a.status},path:[]};const o=this.findNearestPoly(e,{filter:s,halfExtents:r});if(!o.success)return{success:!1,error:{name:"findNearestPoly for end position failed",status:o.status},path:[]};const c=a.nearestRef,l=o.nearestRef,u=n?.maxPathPolys??256,h=this.findPath(c,l,t,e,{filter:s,maxPathPolys:u});if(!h.success)return{success:!1,error:{name:"findPath unsuccessful",status:h.status},path:[]};if(h.polys.size<=0)return{success:!1,error:{name:"no polygon path found"},path:[]};const d=h.polys.get(h.polys.size-1);let f={x:e.x,y:e.y,z:e.z};if(d!==l){const M=this.closestPointOnPoly(d,e);if(!M.success)return{success:!1,error:{name:"no closest point on last polygon found",status:M.status},path:[]};f=M.closestPoint}const x=n?.maxStraightPathPoints,g=this.findStraightPath(t,f,h.polys,{maxStraightPathPoints:x});if(!g.success)return{success:!1,error:{name:"findStraightPath unsuccessful",status:g.status},path:[]};const{straightPath:m,straightPathCount:p}=g,y=[];for(let M=0;M<p;M++)y.push({x:m.get(M*3),y:m.get(M*3+1),z:m.get(M*3+2)});return h.polys.destroy(),g.straightPath.destroy(),g.straightPathFlags.destroy(),g.straightPathRefs.destroy(),{success:!0,path:y}}findPath(t,e,n,s,r){const a=r?.filter??this.defaultFilter,o=r?.maxPathPolys??256,c=new Wn;c.resize(o);const l=this.raw.findPath(t,e,Gt.toArray(n),Gt.toArray(s),a.raw,c.raw,o);return{success:je(l),status:l,polys:c}}findStraightPath(t,e,n,s){const r=s?.maxStraightPathPoints??256,a=s?.straightPathOptions??0;let o;Array.isArray(n)?(o=new Wn,o.copy(n)):o=n;const c=new Qs;c.resize(r*3);const l=new ir;l.resize(r);const u=new Wn;u.resize(r);const h=new O.IntRef,d=this.raw.findStraightPath(Gt.toArray(t),Gt.toArray(e),o.raw,c.raw,l.raw,u.raw,h,r,a),f=h.value;return O.destroy(h),Array.isArray(n)&&o.destroy(),{success:je(d),status:d,straightPath:c,straightPathFlags:l,straightPathRefs:u,straightPathCount:f}}raycast(t,e,n,s){const r=new O.Module.dtRaycastHit,a=s?.raycastOptions??0,o=s?.prevRef??0,c=s?.filter?.raw??this.defaultFilter.raw,l=this.raw.raycast(t,Gt.toArray(e),Gt.toArray(n),c,a,r,o),u={success:je(l),status:l,t:r.t,hitNormal:Gt.fromArray(ke(h=>r.get_hitNormal(h),3)),hitEdgeIndex:r.hitEdgeIndex,path:ke(h=>r.get_path(h),r.pathCount),maxPath:r.maxPath,pathCost:r.pathCost};return O.destroy(r),u}destroy(){this.raw.destroy()}}class Zv{constructor(t){this.raw=t}tiles(t){return new hi(this.raw.get_tiles(t))}tileCount(){return this.raw.tileCount}}class jv{constructor(t){this.raw=t}data(){return ke(t=>this.raw.get_data(t),this.raw.dataSize)}dataSize(){return this.raw.dataSize}}class Jv{constructor(t){this.raw=t}tileX(){return this.raw.tileX}tileY(){return this.raw.tileY}}class Qv{constructor(t){this.raw=t}data(){return ke(t=>this.raw.get_data(t),this.raw.dataSize)}dataSize(){return this.raw.dataSize}}class ty{constructor(t){this.raw=t??new O.Module.NavMesh}initSolo(t){return this.raw.initSolo(t.raw)}initTiled(t){return this.raw.initTiled(t.raw)}addTile(t,e,n){const s=new O.UnsignedIntRef,r=this.raw.addTile(t.raw,e,n,s),a=s.value;return O.destroy(s),{status:r,tileRef:a}}decodePolyId(t){const e=new O.UnsignedIntRef,n=new O.UnsignedIntRef,s=new O.UnsignedIntRef;this.raw.decodePolyId(t,e,n,s);const r=e.value;O.destroy(e);const a=n.value;O.destroy(n);const o=s.value;return O.destroy(s),{tileSalt:r,tileIndex:a,tilePolygonIndex:o}}encodePolyId(t,e,n){return this.raw.encodePolyId(t,e,n)}removeTile(t){return new jv(this.raw.removeTile(t))}calcTileLoc(t){return new Jv(this.raw.calcTileLoc(Gt.toArray(t)))}getTileAt(t,e,n){const s=this.raw.getTileAt(t,e,n);return O.isNull(s)?null:new hi(s)}getTilesAt(t,e,n){return new Zv(this.raw.getTilesAt(t,e,n))}getTileRefAt(t,e,n){return this.raw.getTileRefAt(t,e,n)}getTileRef(t){return this.raw.getTileRef(t.raw)}getTileByRef(t){const e=this.raw.getTileByRef(t);return O.isNull(e)?null:new hi(e)}getMaxTiles(){return this.raw.getMaxTiles()}getTile(t){return new hi(this.raw.getTile(t))}getTileAndPolyByRef(t){const e=this.raw.getTileAndPolyByRef(t),n=new hi(e.tile),s=new Rc(e.poly);return{success:je(e.status),status:e.status,tile:n,poly:s}}getTileAndPolyByRefUnsafe(t){const e=this.raw.getTileAndPolyByRef(t),n=new hi(e.tile),s=new Rc(e.poly);return{tile:n,poly:s}}isValidPolyRef(t){return this.raw.isValidPolyRef(t)}getPolyRefBase(t){return this.raw.getPolyRefBase(t.raw)}getOffMeshConnectionPolyEndPoints(t,e){const n=new O.Vec3,s=new O.Vec3,r=this.raw.getOffMeshConnectionPolyEndPoints(t,e,n,s),a=Gt.fromRaw(n);O.destroy(n);const o=Gt.fromRaw(s);return O.destroy(s),{success:je(r),status:r,start:a,end:o}}getOffMeshConnectionByRef(t){return new Zh(this.raw.getOffMeshConnectionByRef(t))}setPolyFlags(t,e){return this.raw.setPolyFlags(t,e)}getPolyFlags(t){const e=new O.UnsignedShortRef,n=this.raw.getPolyFlags(t,e),s=e.value;return O.destroy(e),{status:n,flags:s}}setPolyArea(t,e){return this.raw.setPolyArea(t,e)}getPolyArea(t){const e=new O.UnsignedCharRef,n=this.raw.getPolyArea(t,e),s=e.value;return O.destroy(e),{status:n,area:s}}getTileStateSize(t){return this.raw.getTileStateSize(t.raw)}storeTileState(t,e){return new Qv(this.raw.storeTileState(t.raw,e))}restoreTileState(t,e,n){return this.raw.restoreTileState(t.raw,e,n)}destroy(){this.raw.destroy(),O.Module.destroy(this.raw)}}const jh={borderSize:0,tileSize:0,cs:.2,ch:.2,walkableSlopeAngle:60,walkableHeight:2,walkableClimb:2,walkableRadius:.5,maxEdgeLen:12,maxSimplificationError:1.3,minRegionArea:8,mergeRegionArea:20,maxVertsPerPoly:6,detailSampleDist:6,detailSampleMaxError:1},ey=i=>{const t={...jh,...i},e=new O.Module.rcConfig;return e.borderSize=t.borderSize,e.tileSize=t.tileSize,e.cs=t.cs,e.ch=t.ch,e.walkableSlopeAngle=t.walkableSlopeAngle,e.walkableHeight=t.walkableHeight,e.walkableClimb=t.walkableClimb,e.walkableRadius=t.walkableRadius,e.maxEdgeLen=t.maxEdgeLen,e.maxSimplificationError=t.maxSimplificationError,e.minRegionArea=t.minRegionArea,e.mergeRegionArea=t.mergeRegionArea,e.maxVertsPerPoly=t.maxVertsPerPoly,e.detailSampleDist=t.detailSampleDist,e.detailSampleMaxError=t.detailSampleMaxError,e};class ny{logs=[];startTimes={};accumulatedTimes={};constructor(t=!0){const e=new O.Module.RecastBuildContextImpl;e.log=(n,s,r)=>{if(!this.raw.logEnabled())return;const a=s,o=new Uint8Array(O.Module.HEAPU8.buffer,a,r),c=new Uint8Array(r);c.set(o);const l=new TextDecoder().decode(c);this.log(n,l)},e.resetLog=()=>{this.resetLog()},e.startTimer=n=>{this.raw.timerEnabled()&&this.startTimer(n)},e.stopTimer=n=>{this.raw.timerEnabled()&&this.stopTimer(n)},e.getAccumulatedTime=n=>this.raw.timerEnabled()?this.getAccumulatedTime(n):-1,e.resetTimers=()=>{this.raw.timerEnabled()&&(this.startTimes={},this.accumulatedTimes={})},this.raw=new O.Module.RecastBuildContext(e),this.raw.enableTimer(t),this.raw.enableLog(t),this.resetTimers()}log(t,e){this.logs.push({category:t,msg:e})}resetLog(){this.logs=[]}startTimer(t){this.startTimes[t]=performance.now()}stopTimer(t){const n=performance.now()-this.startTimes[t];this.accumulatedTimes[t]===-1?this.accumulatedTimes[t]=n:this.accumulatedTimes[t]+=n}getAccumulatedTime(t){return this.accumulatedTimes[t]}resetTimers(){for(let t=0;t<It.RC_MAX_TIMERS;t++)this.startTimes[t]=-1,this.accumulatedTimes[t]=-1}}class tr{constructor(t){this.raw=t}smin(){return this.raw.smin}smax(){return this.raw.smax}area(){return this.raw.area}next(){return O.isNull(this.raw.next)?null:new tr(this.raw.next)}}class tl{constructor(t){this.raw=t}next(){return O.isNull(this.raw.next)?null:new tl(this.raw.next)}items(t){return new tr(this.raw.get_items(t))}}class iy{constructor(t){this.raw=t}width(){return this.raw.width}height(){return this.raw.height}bmin(){return Gt.fromArray(ke(t=>this.raw.get_bmin(t),3))}bmax(){return Gt.fromArray(ke(t=>this.raw.get_bmax(t),3))}cs(){return this.raw.cs}ch(){return this.raw.ch}spans(t){return new tr(this.raw.get_spans(t))}pools(t){return new tl(this.raw.get_pools(t))}freelist(t){return new tr(this.raw.get_freelist(t))}}class sy{constructor(t){this.raw=t}index(){return this.raw.get_index()}count(){return this.raw.get_count()}}class ry{constructor(t){this.raw=t}y(){return this.raw.get_y()}reg(){return this.raw.get_reg()}con(){return this.raw.get_con()}h(){return this.raw.get_h()}}class ay{constructor(t){this.raw=t}width(){return this.raw.width}height(){return this.raw.height}spanCount(){return this.raw.spanCount}walkableHeight(){return this.raw.walkableHeight}walkableClimb(){return this.raw.walkableClimb}borderSize(){return this.raw.borderSize}maxDistance(){return this.raw.maxDistance}maxRegions(){return this.raw.maxRegions}bmin(){return Gt.fromArray(ke(t=>this.raw.get_bmin(t),3))}bmax(){return Gt.fromArray(ke(t=>this.raw.get_bmax(t),3))}cs(){return this.raw.cs}ch(){return this.raw.ch}cells(t){return new sy(this.raw.get_cells(t))}spans(t){return new ry(this.raw.get_spans(t))}dist(t){return this.raw.get_dist(t)}areas(t){return this.raw.get_areas(t)}}class oy{constructor(t){this.raw=t}verts(t){return this.raw.get_verts(t)}nverts(){return this.raw.nverts}rverts(t){return this.raw.get_rverts(t)}nrverts(){return this.raw.nrverts}reg(){return this.raw.reg}area(){return this.raw.area}}class cy{constructor(t){this.raw=t}conts(t){return new oy(this.raw.get_conts(t))}nconts(){return this.raw.nconts}bmin(){return Gt.fromArray(ke(t=>this.raw.get_bmin(t),3))}bmax(){return Gt.fromArray(ke(t=>this.raw.get_bmax(t),3))}cs(){return this.raw.cs}ch(){return this.raw.ch}width(){return this.raw.width}height(){return this.raw.height}borderSize(){return this.raw.borderSize}maxError(){return this.raw.maxError}}class ly{constructor(t){this.raw=t}verts(t){return this.raw.get_verts(t)}polys(t){return this.raw.get_polys(t)}regs(t){return this.raw.get_regs(t)}flags(t){return this.raw.get_flags(t)}setFlags(t,e){this.raw.set_flags(t,e)}areas(t){return this.raw.get_areas(t)}setAreas(t,e){this.raw.set_areas(t,e)}nverts(){return this.raw.nverts}npolys(){return this.raw.npolys}maxpolys(){return this.raw.maxpolys}nvp(){return this.raw.nvp}bmin(){return Gt.fromArray(ke(t=>this.raw.get_bmin(t),3))}bmax(){return Gt.fromArray(ke(t=>this.raw.get_bmax(t),3))}cs(){return this.raw.cs}ch(){return this.raw.ch}borderSize(){return this.raw.borderSize}maxEdgeError(){return this.raw.maxEdgeError}}class uy{constructor(t){this.raw=t}meshes(t){return this.raw.get_meshes(t)}verts(t){return this.raw.get_verts(t)}tris(t){return this.raw.get_tris(t)}nmeshes(){return this.raw.nmeshes}nverts(){return this.raw.nverts}ntris(){return this.raw.ntris}}const hy=(i,t,e)=>O.Recast.calcGridSize(i,t,e),dy=(i,t,e,n,s,r,a,o)=>O.Recast.createHeightfield(i.raw,t.raw,e,n,s,r,a,o),fy=(i,t,e,n,s,r,a)=>O.Recast.markWalkableTriangles(i.raw,t,e.raw,n,s.raw,r,a.raw),py=(i,t,e,n,s,r,a,o=1)=>O.Recast.rasterizeTriangles(i.raw,t.raw,e,n.raw,s.raw,r,a.raw,o),my=(i,t,e)=>O.Recast.filterLowHangingWalkableObstacles(i.raw,t,e.raw),xy=(i,t,e,n)=>O.Recast.filterLedgeSpans(i.raw,t,e,n.raw),gy=(i,t,e)=>O.Recast.filterWalkableLowHeightSpans(i.raw,t,e.raw),_y=(i,t,e,n,s)=>O.Recast.buildCompactHeightfield(i.raw,t,e,n.raw,s.raw),vy=(i,t,e)=>O.Recast.erodeWalkableArea(i.raw,t,e.raw),yy=(i,t)=>O.Recast.buildDistanceField(i.raw,t.raw),My=(i,t,e,n,s)=>O.Recast.buildRegions(i.raw,t.raw,e,n,s),Sy=(i,t,e,n,s,r=It.RC_CONTOUR_TESS_WALL_EDGES)=>O.Recast.buildContours(i.raw,t.raw,e,n,s.raw,r),by=(i,t,e,n)=>O.Recast.buildPolyMesh(i.raw,t.raw,e,n.raw),wy=(i,t,e,n,s,r)=>O.Recast.buildPolyMeshDetail(i.raw,t.raw,e.raw,n,s,r.raw),Ey=()=>new iy(O.Recast.allocHeightfield()),Xu=i=>O.Recast.freeHeightfield(i.raw),Ty=()=>new ay(O.Recast.allocCompactHeightfield()),qu=i=>O.Recast.freeCompactHeightfield(i.raw),Ay=()=>new cy(O.Recast.allocContourSet()),Yu=i=>O.Recast.freeContourSet(i.raw),Ry=()=>new ly(O.Recast.allocPolyMesh()),Cy=i=>O.Recast.freePolyMesh(i.raw),Py=()=>new uy(O.Recast.allocPolyMeshDetail()),Dy=i=>O.Recast.freePolyMeshDetail(i.raw),Ly=(i,t)=>{const e={x:1/0,y:1/0,z:1/0},n={x:-1/0,y:-1/0,z:-1/0};for(let s=0;s<t.length;s++){const r=t[s],a=i[r*3],o=i[r*3+1],c=i[r*3+2];e.x=Math.min(e.x,a),e.y=Math.min(e.y,o),e.z=Math.min(e.z,c),n.x=Math.max(n.x,a),n.y=Math.max(n.y,o),n.z=Math.max(n.z,c)}return{bbMin:Gt.toArray(e),bbMax:Gt.toArray(n)}},Iy={...jh,buildBvTree:!0},Uy=(i,t,e={},n=!1)=>{const s=new ny,r={type:"solo",buildContext:s},a=()=>{n||(r.heightfield&&(Xu(r.heightfield),r.heightfield=void 0),r.compactHeightfield&&(qu(r.compactHeightfield),r.compactHeightfield=void 0),r.contourSet&&(Yu(r.contourSet),r.contourSet=void 0),r.polyMesh&&(Cy(r.polyMesh),r.polyMesh=void 0),r.polyMeshDetail&&(Dy(r.polyMeshDetail),r.polyMeshDetail=void 0))},o=P=>(a(),{navMeshData:void 0,success:!1,intermediates:r,error:P}),c=i,l=t.length,u=new zv;u.copy(c);const h=t,d=t.length/3,f=new Vv;f.copy(h);let x,g;if(e.bounds)x=e.bounds[0],g=e.bounds[1];else{const P=Ly(i,t);x=P.bbMin,g=P.bbMax}const m={...Iy,...e},p=ey(m);p.minRegionArea=p.minRegionArea*p.minRegionArea,p.mergeRegionArea=p.mergeRegionArea*p.mergeRegionArea,p.detailSampleDist=p.detailSampleDist<.9?0:p.cs*p.detailSampleDist,p.detailSampleMaxError=p.ch*p.detailSampleMaxError;const y=hy(x,g,p.cs);p.width=y.width,p.height=y.height;const M=Ey();if(r.heightfield=M,!dy(s,M,p.width,p.height,x,g,p.cs,p.ch))return o("Could not create heightfield");const v=new kv;if(v.resize(d),fy(s,p.walkableSlopeAngle,u,l,f,d,v),!py(s,u,l,f,v,d,M,p.walkableClimb))return o("Could not rasterize triangles");v.destroy(),u.destroy(),f.destroy(),my(s,p.walkableClimb,M),xy(s,p.walkableHeight,p.walkableClimb,M),gy(s,p.walkableHeight,M);const b=Ty();if(r.compactHeightfield=b,!_y(s,p.walkableHeight,p.walkableClimb,M,b))return o("Failed to build compact data");if(n||(Xu(M),r.heightfield=void 0),!vy(s,p.walkableRadius,b))return o("Failed to erode walkable area");if(!yy(s,b))return o("Failed to build distance field");if(!My(s,b,p.borderSize,p.minRegionArea,p.mergeRegionArea))return o("Failed to build regions");const w=Ay();if(r.contourSet=w,!Sy(s,b,p.maxSimplificationError,p.maxEdgeLen,w,It.RC_CONTOUR_TESS_WALL_EDGES))return o("Failed to create contours");const A=Ry();if(r.polyMesh=A,!by(s,w,p.maxVertsPerPoly,A))return o("Failed to triangulate contours");const C=Py();if(r.polyMeshDetail=C,!wy(s,A,b,p.detailSampleDist,p.detailSampleMaxError,C))return o("Failed to build detail mesh");n||(qu(b),r.compactHeightfield=void 0,Yu(w),r.contourSet=void 0);for(let P=0;P<A.npolys();P++)A.areas(P)===It.RC_WALKABLE_AREA&&A.setAreas(P,0),A.areas(P)===0&&A.setFlags(P,1);const S=new Yv;S.setPolyMeshCreateParams(A),S.setPolyMeshDetailCreateParams(C),S.setWalkableHeight(p.walkableHeight*p.ch),S.setWalkableRadius(p.walkableRadius*p.cs),S.setWalkableClimb(p.walkableClimb*p.ch),S.setCellSize(p.cs),S.setCellHeight(p.ch),S.setBuildBvTree(m.buildBvTree),e.offMeshConnections&&S.setOffMeshConnections(e.offMeshConnections);const _=qv(S);return _.success?(a(),{navMeshData:_.navMeshData,success:!0,intermediates:r}):o("Failed to create Detour navmesh data")},Ny=(i,t,e={},n=!1)=>{if(!O.Module)throw new Error('"init" must be called before using any recast-navigation-js APIs. See: https://github.com/isaac-mason/recast-navigation-js?tab=readme-ov-file#initialization');const s=Uy(i,t,e,n);if(!s.success)return{navMesh:void 0,success:!1,intermediates:s.intermediates,error:s.error};const{navMeshData:r}=s,a=new ty;return a.initSolo(r)?{success:!0,navMesh:a,intermediates:s.intermediates}:(r.destroy(),{navMesh:void 0,success:!1,intermediates:s.intermediates,error:"Failed to initialize solo NavMesh"})};let bo=null;function Fy(){return bo||(bo=Bv()),bo}function Oy(i){const t=i.getAttribute("position"),e=i.index;if(!t)return{positions:[],indices:[]};const n=Array.from(t.array),s=e?Array.from(e.array):Array.from({length:t.count},(r,a)=>a);return{positions:n,indices:s}}class By{constructor(){this.ready=!1,this.navMesh=null,this.query=null,this.buildToken=0}async initialize(t){this.destroy(),this.buildToken+=1;const e=this.buildToken;if(!t||(await Fy(),e!==this.buildToken))return!1;const{positions:n,indices:s}=Oy(t);if(n.length===0||s.length===0)return!1;const{success:r,navMesh:a}=Ny(n,s,{cs:.2,ch:.2,walkableSlopeAngle:55,walkableHeight:10,walkableClimb:4,walkableRadius:2,maxEdgeLen:20,maxSimplificationError:1.15,minRegionArea:12,mergeRegionArea:24,maxVertsPerPoly:6,detailSampleDist:4,detailSampleMaxError:.8});return!r||e!==this.buildToken?(a?.destroy?.(),!1):(this.navMesh=a,this.query=new Kv(a),this.query.defaultQueryHalfExtents={x:4,y:6,z:4},this.ready=!0,!0)}projectPoint(t){if(!this.ready||!this.query)return null;const e=this.query.findClosestPoint(t);return e.success?e.point:null}getRandomPointAround(t,e){if(!this.ready||!this.query)return null;const n=this.query.findRandomPointAroundCircle(t,e);return n.success?n.randomPoint:null}getRandomPoint(){if(!this.ready||!this.query)return null;const t=this.query.findRandomPoint();return t.success?t.randomPoint:null}computePath(t,e){if(!this.ready||!this.query)return[];const n=this.query.computePath(t,e,{maxPathPolys:512,maxStraightPathPoints:512});return n.success?n.path:[]}destroy(){this.ready=!1,this.query?.destroy?.(),this.navMesh?.destroy?.(),this.query=null,this.navMesh=null}}function $u(i){i&&i.traverse(t=>{t.geometry?.dispose?.(),(Array.isArray(t.material)?t.material:t.material?[t.material]:[]).forEach(n=>{if(n){for(const s of Object.values(n))s?.isTexture&&s.dispose?.();n.dispose?.()}})})}function Ku(){return new Promise(i=>{requestAnimationFrame(()=>i())})}class el{constructor({map:t,mapId:e,collisionWorld:n,navigationManager:s,playerController:r,roundManager:a,weaponManager:o,utilityManager:c,networkClient:l,targetManager:u}){this.map=t,this.mapId=e,this.collisionWorld=n,this.navigationManager=s,this.playerController=r,this.roundManager=a,this.weaponManager=o,this.utilityManager=c,this.networkClient=l,this.targetManager=u}static async create({mapOption:t,camera:e,input:n,scene:s,audioManager:r,mouseSensitivity:a,onStatusChange:o}){o?.(`Loading ${t.label}...`),await Ku();const c=t.create();try{o?.(`Generating navmesh for ${t.label}...`),await Ku();const l=new By;await l.initialize(c.collisionGeometry);const u=new hv({groundHeight:c.groundHeight,collisionGeometry:c.collisionGeometry}),h=new el({map:c,mapId:t.id,collisionWorld:u,navigationManager:l,playerController:null,roundManager:new fv,weaponManager:null,utilityManager:new Pv,networkClient:new Dv,targetManager:new Lv(c.targets)});return h.weaponManager=new Cv({camera:e,scene:s,shootables:c.shootables,audioManager:r}),h.playerController=new dv(e,n,{position:c.spawnPoint,groundHeight:c.groundHeight,collisionWorld:u,mouseSensitivity:a,getSpeedMultiplier:()=>h.weaponManager?.getMovementSpeedMultiplier()??1}),h}catch(l){throw c.dispose?.(),c.collisionGeometry?.dispose?.(),$u(c.scene),l}}attachToScene(t){t.add(this.map.scene),t.add(this.playerController.getObject())}detachFromScene(t){t.remove(this.map.scene),t.remove(this.playerController.getObject())}destroy(t){this.weaponManager?.destroy(),this.targetManager?.destroy?.(),this.detachFromScene(t),this.navigationManager?.destroy(),this.map.dispose?.(),this.map.collisionGeometry?.dispose?.(),$u(this.map.scene)}}const zy=[{label:"Move",value:"WASD"},{label:"Jump",value:"Space"},{label:"Run",value:"Shift"},{label:"Crouch",value:"Ctrl / C"},{label:"Fire",value:"Left click"},{label:"Scope",value:"Right click"},{label:"Weapons",value:"1 rifle, 2 sniper"},{label:"Pause",value:"Escape"}];function Vy({parent:i,onResume:t,onSelectMap:e,maps:n=[],onSelectSkybox:s,skyboxes:r=[],onSensitivityChange:a,onVolumeChange:o,getMasterVolume:c,getMouseSensitivity:l}){let u=null,h=null,d=null,f=null;const x=document.createElement("div");x.className="hud__pause";const g=()=>Math.round((l?.()??.0011)/.0022*100);x.innerHTML=`
    <div class="hud__pause-panel">
      <div class="hud__pause-title">Paused</div>
      <button class="hud__pause-button" type="button" data-action="resume">Resume</button>
      <label class="hud__volume">
        <span class="hud__volume-label">Volume</span>
        <input class="hud__volume-slider" type="range" min="0" max="100" step="1" value="${Math.round((c?.()??.6)*100)}" />
      </label>
      <label class="hud__volume">
        <span class="hud__slider-header">
          <span class="hud__volume-label">Sensitivity</span>
          <span class="hud__slider-value">${g()}</span>
        </span>
        <input class="hud__sensitivity-slider" type="range" min="1" max="100" step="1" value="${g()}" />
      </label>
      <button class="hud__pause-button hud__pause-button--secondary" type="button" data-action="bindings">Key Bindings</button>
      <button class="hud__pause-button hud__pause-button--secondary" type="button" data-action="maps">Maps</button>
      <button class="hud__pause-button hud__pause-button--secondary" type="button" data-action="skyboxes">Skyboxes</button>
      <div class="hud__bindings">
        ${zy.map(Y=>`<div><strong>${Y.label}</strong>: ${Y.value}</div>`).join("")}
      </div>
      <div class="hud__maps">
        ${n.map(Y=>`
          <button
            class="hud__map-option"
            type="button"
            data-map-id="${Y.id}"
          >${Y.label}</button>
        `).join("")}
      </div>
      <div class="hud__skyboxes">
        ${r.map(Y=>`
          <button
            class="hud__skybox-option"
            type="button"
            data-skybox-id="${Y.id}"
          >${Y.label}</button>
        `).join("")}
      </div>
    </div>
  `,i.appendChild(x);const m=x.querySelector(".hud__bindings"),p=x.querySelector(".hud__maps"),y=x.querySelector(".hud__skyboxes"),M=x.querySelector('[data-action="resume"]'),v=x.querySelector(".hud__volume-slider"),b=x.querySelector(".hud__sensitivity-slider"),w=x.querySelector(".hud__slider-value"),A=x.querySelector('[data-action="bindings"]'),C=x.querySelector('[data-action="maps"]'),S=x.querySelector('[data-action="skyboxes"]'),_=[...x.querySelectorAll("[data-map-id]")],P=[...x.querySelectorAll("[data-skybox-id]")],D=()=>t?.(),I=Y=>{o?.(Number(Y.currentTarget.value)/100)},U=Y=>{const ft=Number(Y.currentTarget.value);w.textContent=String(ft),a?.(ft/100*.0022)},B=()=>{m.classList.toggle("hud__bindings--visible"),p.classList.remove("hud__maps--visible"),y.classList.remove("hud__skyboxes--visible")},V=()=>{p.classList.toggle("hud__maps--visible"),m.classList.remove("hud__bindings--visible"),y.classList.remove("hud__skyboxes--visible")},$=()=>{y.classList.toggle("hud__skyboxes--visible"),m.classList.remove("hud__bindings--visible"),p.classList.remove("hud__maps--visible")},X=Y=>{e?.(Y.currentTarget.dataset.mapId)},et=Y=>{s?.(Y.currentTarget.dataset.skyboxId)};return M.addEventListener("click",D),v.addEventListener("input",I),b.addEventListener("input",U),A.addEventListener("click",B),C.addEventListener("click",V),S.addEventListener("click",$),_.forEach(Y=>Y.addEventListener("click",X)),P.forEach(Y=>Y.addEventListener("click",et)),{destroy(){M.removeEventListener("click",D),v.removeEventListener("input",I),b.removeEventListener("input",U),A.removeEventListener("click",B),C.removeEventListener("click",V),S.removeEventListener("click",$),_.forEach(Y=>Y.removeEventListener("click",X)),P.forEach(Y=>Y.removeEventListener("click",et)),x.remove()},setPaused(Y){x.classList.toggle("hud__pause--active",Y),Y||(m.classList.remove("hud__bindings--visible"),p.classList.remove("hud__maps--visible"),y.classList.remove("hud__skyboxes--visible"))},updateSelections({selectedMapId:Y,selectedSkyboxId:ft}){Y!==u&&(_.forEach(Wt=>{Wt.classList.toggle("hud__map-option--active",Wt.dataset.mapId===Y)}),u=Y),ft!==h&&(P.forEach(Wt=>{Wt.classList.toggle("hud__skybox-option--active",Wt.dataset.skyboxId===ft)}),h=ft);const Mt=Math.round((c?.()??.6)*100);Mt!==d&&(v.value=String(Mt),d=Mt);const Ct=g();Ct!==f&&(b.value=String(Ct),w.textContent=String(Ct),f=Ct)}}}function ky({container:i,input:t,roundManager:e,weaponManager:n,utilityManager:s,playerController:r,getFps:a,getMasterVolume:o,getMouseSensitivity:c,onResume:l,onSelectMap:u,onSensitivityChange:h,onVolumeChange:d,maps:f=[],getSelectedMapId:x,getIsLoading:g,getLoadingStatus:m,onSelectSkybox:p,skyboxes:y=[],getSelectedSkyboxId:M}){const v=document.createElement("div");v.className="hud",v.innerHTML=`
    <div class="hud__top">
      <div class="hud__round"></div>
      <div class="hud__fps"></div>
    </div>
    <div class="hud__crosshair" aria-hidden="true"></div>
    <div class="hud__ads-reticle" aria-hidden="true"></div>
    <div class="hud__scope ${n?.showScopeOverlay?"hud__scope--active":""}" aria-hidden="true">
      <div class="hud__scope-lens">
        <div class="hud__scope-crosshair">
          <div class="hud__scope-line hud__scope-line--vertical"></div>
          <div class="hud__scope-line hud__scope-line--horizontal"></div>
        </div>
      </div>
    </div>
    <div class="hud__loading">
      <div class="hud__loading-card">
        <div class="hud__loading-title">Loading</div>
        <div class="hud__loading-status"></div>
      </div>
    </div>
    <div class="hud__bottom">
      <div class="hud__weapon"></div>
      <div class="hud__utility"></div>
      <div class="hud__movement"></div>
      <div class="hud__pointer"></div>
    </div>
  `,i.appendChild(v);const b=Vy({parent:v,onResume:l,onSelectMap:u,maps:f,onSelectSkybox:p,skyboxes:y,onSensitivityChange:h,onVolumeChange:d,getMasterVolume:o,getMouseSensitivity:c}),w=v.querySelector(".hud__round"),A=v.querySelector(".hud__fps"),C=v.querySelector(".hud__weapon"),S=v.querySelector(".hud__utility"),_=v.querySelector(".hud__movement"),P=v.querySelector(".hud__pointer"),D=v.querySelector(".hud__crosshair"),I=v.querySelector(".hud__ads-reticle"),U=v.querySelector(".hud__scope"),B=v.querySelector(".hud__loading"),V=v.querySelector(".hud__loading-status");let $=!1,X="",et="",Y="",ft="",Mt="",Ct="",Wt="",$t=null,K=null,J=null,ht=null;function wt(xt,Ft,le){return le!==Ft?(xt.textContent=Ft,Ft):le}return{destroy(){b.destroy(),v.remove()},setPaused(xt){$=xt,b.setPaused($)},update(){const xt=r?.getDebugState?.()??{grounded:!0,crouched:!1,speed:0},Ft=e?`Round ${e.roundNumber} - ${e.phase}`:"Round --",le=`FPS: ${a?.()??"--"}`,Xt=`Weapon: ${n?.activeWeapon??"--"}`,ue=`Utility: ${s?.activeUtility??"--"}`,N=`State: ${xt.grounded?"Grounded":"Air"} - ${xt.crouched?"Crouched":"Standing"} - ${xt.speed.toFixed(1)} m/s`,qt=$?"Paused":t.pointerLocked?"Pointer locked":"Click to capture mouse";X=wt(w,Ft,X),et=wt(A,le,et),Y=wt(C,Xt,Y),ft=wt(S,ue,ft),Mt=wt(_,N,Mt),Ct=wt(P,qt,Ct);const kt=!!(n?.isScoped||$);kt!==$t&&(D.classList.toggle("hud__crosshair--hidden",kt),$t=kt);const te=!!(n?.showAdsReticle&&!$);te!==K&&(I.classList.toggle("hud__ads-reticle--active",te),K=te);const mt=!!n?.showScopeOverlay;mt!==J&&(U.classList.toggle("hud__scope--active",mt),J=mt);const oe=!!g?.();oe!==ht&&(B.classList.toggle("hud__loading--active",oe),ht=oe);const yt=m?.()??"";yt!==Wt&&(V.textContent=yt,Wt=yt),b.updateSelections({selectedMapId:x?.(),selectedSkyboxId:M?.()})}}}const Cc=[{id:"sunset",label:"Qwantani Sunset",path:"/skyboxes/qwantani_sunset_puresky_2k.hdr"},{id:"rooftop-night",label:"Rooftop Night",path:"/skyboxes/rooftop_night_2k.hdr"}];function Hy(i){return Cc.find(t=>t.id===i)??null}class Gy extends Kf{constructor(t){super(t),this.type=Rn}parse(t){const a=function(C,S){switch(C){case 1:throw new Error("THREE.HDRLoader: Read Error: "+(S||""));case 2:throw new Error("THREE.HDRLoader: Write Error: "+(S||""));case 3:throw new Error("THREE.HDRLoader: Bad File Format: "+(S||""));default:case 4:throw new Error("THREE.HDRLoader: Memory Error: "+(S||""))}},h=function(C,S,_){S=S||1024;let D=C.pos,I=-1,U=0,B="",V=String.fromCharCode.apply(null,new Uint16Array(C.subarray(D,D+128)));for(;0>(I=V.indexOf(`
`))&&U<S&&D<C.byteLength;)B+=V,U+=V.length,D+=128,V+=String.fromCharCode.apply(null,new Uint16Array(C.subarray(D,D+128)));return-1<I?(C.pos+=U+I+1,B+V.slice(0,I)):!1},d=function(C){const S=/^#\?(\S+)/,_=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,P=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,D=/^\s*FORMAT=(\S+)\s*$/,I=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,U={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0};let B,V;for((C.pos>=C.byteLength||!(B=h(C)))&&a(1,"no header found"),(V=B.match(S))||a(3,"bad initial token"),U.valid|=1,U.programtype=V[1],U.string+=B+`
`;B=h(C),B!==!1;){if(U.string+=B+`
`,B.charAt(0)==="#"){U.comments+=B+`
`;continue}if((V=B.match(_))&&(U.gamma=parseFloat(V[1])),(V=B.match(P))&&(U.exposure=parseFloat(V[1])),(V=B.match(D))&&(U.valid|=2,U.format=V[1]),(V=B.match(I))&&(U.valid|=4,U.height=parseInt(V[1],10),U.width=parseInt(V[2],10)),U.valid&2&&U.valid&4)break}return U.valid&2||a(3,"missing format specifier"),U.valid&4||a(3,"missing image size specifier"),U},f=function(C,S,_){const P=S;if(P<8||P>32767||C[0]!==2||C[1]!==2||C[2]&128)return new Uint8Array(C);P!==(C[2]<<8|C[3])&&a(3,"wrong scanline width");const D=new Uint8Array(4*S*_);D.length||a(4,"unable to allocate buffer space");let I=0,U=0;const B=4*P,V=new Uint8Array(4),$=new Uint8Array(B);let X=_;for(;X>0&&U<C.byteLength;){U+4>C.byteLength&&a(1),V[0]=C[U++],V[1]=C[U++],V[2]=C[U++],V[3]=C[U++],(V[0]!=2||V[1]!=2||(V[2]<<8|V[3])!=P)&&a(3,"bad rgbe scanline format");let et=0,Y;for(;et<B&&U<C.byteLength;){Y=C[U++];const Mt=Y>128;if(Mt&&(Y-=128),(Y===0||et+Y>B)&&a(3,"bad scanline data"),Mt){const Ct=C[U++];for(let Wt=0;Wt<Y;Wt++)$[et++]=Ct}else $.set(C.subarray(U,U+Y),et),et+=Y,U+=Y}const ft=P;for(let Mt=0;Mt<ft;Mt++){let Ct=0;D[I]=$[Mt+Ct],Ct+=P,D[I+1]=$[Mt+Ct],Ct+=P,D[I+2]=$[Mt+Ct],Ct+=P,D[I+3]=$[Mt+Ct],I+=4}X--}return D},x=function(C,S,_,P){const D=C[S+3],I=Math.pow(2,D-128)/255;_[P+0]=C[S+0]*I,_[P+1]=C[S+1]*I,_[P+2]=C[S+2]*I,_[P+3]=1},g=function(C,S,_,P){const D=C[S+3],I=Math.pow(2,D-128)/255;_[P+0]=mr.toHalfFloat(Math.min(C[S+0]*I,65504)),_[P+1]=mr.toHalfFloat(Math.min(C[S+1]*I,65504)),_[P+2]=mr.toHalfFloat(Math.min(C[S+2]*I,65504)),_[P+3]=mr.toHalfFloat(1)},m=new Uint8Array(t);m.pos=0;const p=d(m),y=p.width,M=p.height,v=f(m.subarray(m.pos),y,M);let b,w,A;switch(this.type){case pn:A=v.length/4;const C=new Float32Array(A*4);for(let _=0;_<A;_++)x(v,_*4,C,_*4);b=C,w=pn;break;case Rn:A=v.length/4;const S=new Uint16Array(A*4);for(let _=0;_<A;_++)g(v,_*4,S,_*4);b=S,w=Rn;break;default:throw new Error("THREE.HDRLoader: Unsupported type: "+this.type)}return{width:y,height:M,data:b,header:p.string,gamma:p.gamma,exposure:p.exposure,type:w}}setDataType(t){return this.type=t,this}load(t,e,n,s){function r(a,o){switch(a.type){case pn:case Rn:a.colorSpace=Ii,a.minFilter=Ne,a.magFilter=Ne,a.generateMipmaps=!1,a.flipY=!0;break}e&&e(a,o)}return super.load(t,r,n,s)}}class Wy extends Gy{constructor(t){console.warn("RGBELoader has been deprecated. Please use HDRLoader instead."),super(t)}}class Xy{constructor(t,e){this.scene=t,this.renderer=e,this.backgroundTexture=null,this.environmentTexture=null,this.loadToken=0}async setSkybox(t,{backgroundIntensity:e=1,environmentIntensity:n=1}={}){const s=++this.loadToken;try{const r=await new Wy().loadAsync(t);if(s!==this.loadToken){r.dispose();return}r.mapping=ia;const a=new fc(this.renderer);a.compileEquirectangularShader(),this.backgroundTexture?.dispose(),this.environmentTexture?.dispose(),this.backgroundTexture=r,this.environmentTexture=a.fromEquirectangular(r).texture,this.scene.background=this.backgroundTexture,this.scene.environment=this.environmentTexture,this.scene.backgroundIntensity=e,this.scene.environmentIntensity=n,a.dispose()}catch(r){console.error(`Failed to load HDR skybox "${t}".`,r)}}dispose(){this.backgroundTexture?.dispose(),this.environmentTexture?.dispose()}}const Zu=typeof window<"u"?window.AudioContext??window.webkitAudioContext:null;function wo(i){return Math.max(0,Math.min(1,i))}class qy{constructor({masterVolume:t=.6}={}){this.masterVolume=wo(t),this.sounds=new Map,this.context=Zu?new Zu:null,this.masterGain=this.context?this.context.createGain():null,this.masterGain&&(this.masterGain.gain.value=this.masterVolume,this.masterGain.connect(this.context.destination))}registerSound(t,e,n={}){if(this.sounds.has(t))return;const s={key:t,path:e,playback:n.playback??"interrupt",minIntervalMs:n.minIntervalMs??0,buffer:null,bufferPromise:null,activeSource:null,activeGain:null,lastPlayTime:-1/0};this.sounds.set(t,s),n.preload!==!1&&this.loadBuffer(s)}async unlock(){if(!(!this.context||this.context.state==="running"))try{await this.context.resume()}catch{}}setMasterVolume(t){this.masterVolume=wo(t),this.masterGain&&this.context&&this.masterGain.gain.setValueAtTime(this.masterVolume,this.context.currentTime)}getMasterVolume(){return this.masterVolume}async play(t,e={}){const n=this.sounds.get(t);if(!n||!this.context||!this.masterGain)return;const{baseVolume:s=1,pitchMin:r=1,pitchMax:a=1,playback:o=n.playback,minIntervalMs:c=n.minIntervalMs}=e,l=performance.now();if(l-n.lastPlayTime<c)return;n.lastPlayTime=l,await this.unlock();const u=await this.loadBuffer(n);if(!u)return;const h=this.context.currentTime;if(o==="interrupt")this.stopActiveSound(n,h);else if(o==="skip"&&n.activeSource)return;const d=this.context.createBufferSource();d.buffer=u,d.playbackRate.value=r+Math.random()*(a-r);const f=this.context.createGain();f.gain.value=wo(s),d.connect(f),f.connect(this.masterGain),d.start(h),o!=="overlap"&&(n.activeSource=d,n.activeGain=f),d.onended=()=>{d.disconnect(),f.disconnect(),n.activeSource===d&&(n.activeSource=null,n.activeGain=null)}}async loadBuffer(t){const e=typeof t=="string"?this.sounds.get(t):t;return!e||!this.context?null:e.buffer?e.buffer:(e.bufferPromise||(e.bufferPromise=fetch(e.path).then(n=>{if(!n.ok)throw new Error(`Failed to load audio: ${e.path}`);return n.arrayBuffer()}).then(n=>this.context.decodeAudioData(n.slice(0))).then(n=>(e.buffer=n,n)).catch(n=>(console.error(n),e.bufferPromise=null,null))),e.bufferPromise)}stopActiveSound(t,e=this.context?.currentTime??0){if(!(!t.activeSource||!t.activeGain)){try{t.activeGain.gain.cancelScheduledValues(e),t.activeGain.gain.setValueAtTime(t.activeGain.gain.value,e),t.activeGain.gain.linearRampToValueAtTime(0,e+.012),t.activeSource.stop(e+.014)}catch{}t.activeSource=null,t.activeGain=null}}destroy(){for(const t of this.sounds.values())this.stopActiveSound(t);this.sounds.clear(),this.context&&(this.context.close(),this.context=null,this.masterGain=null)}}class Yy{constructor(t){this.root=t,this.clock=new ep,this.isPaused=!1,this.isLoadingMap=!1,this.loadingStatus="",this.hadPointerLock=!1,this.currentFps=0,this.mouseSensitivity=.0011,this.mapLoadToken=0,this.audioManager=new qy({masterVolume:.6}),this.audioManager.registerSound("rifle-fire","/audio/m4a1_silencer_01.mp3",{playback:"interrupt"}),this.audioManager.registerSound("sniper-fire","/audio/awp-shoot-sound-effect-cs_go.mp3",{playback:"interrupt"}),this.audioManager.registerSound("sniper-zoom","/audio/awp-zoom-sound-effect-cs-go.mp3",{playback:"interrupt",minIntervalMs:80}),this.audioManager.registerSound("knife-slash","/audio/sword-slash-4.mp3",{playback:"interrupt"}),this.scene=new Ff,this.scene.background=new Yt(791064),this.scene.fog=new Vc(791064,24,90),this.selectedMapId=xc[0].id,this.selectedSkyboxId=Cc[0].id,this.camera=new dn(75,window.innerWidth/window.innerHeight,.1,500),this.renderer=new Xg({antialias:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.outputColorSpace=on,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Ju,this.renderer.toneMapping=th,this.renderer.toneMappingExposure=.92,this.root.appendChild(this.renderer.domElement),this.skyboxManager=new Xy(this.scene,this.renderer),this.setSkybox(this.selectedSkyboxId),this.input=new Yg(this.renderer.domElement),this.runtime=null,this.scene.add(this.createLighting()),this.rebuildHud(),this.loadMap(this.selectedMapId),this.onResize=this.onResize.bind(this),this.animate=this.animate.bind(this)}start(){window.addEventListener("resize",this.onResize),this.renderer.setAnimationLoop(this.animate)}stop(){window.removeEventListener("resize",this.onResize),this.renderer.setAnimationLoop(null)}destroy(){this.stop(),this.input.destroy(),this.hud.destroy(),this.unloadMap(),this.skyboxManager.dispose(),this.audioManager.destroy(),this.renderer.dispose()}rebuildHud(){this.hud?.destroy(),this.hud=ky({container:this.root,input:this.input,roundManager:this.runtime?.roundManager??null,weaponManager:this.runtime?.weaponManager??null,utilityManager:this.runtime?.utilityManager??null,playerController:this.runtime?.playerController??null,getFps:()=>this.currentFps,getMasterVolume:()=>this.audioManager.getMasterVolume(),getMouseSensitivity:()=>this.mouseSensitivity,onResume:()=>this.resumeGame(),onSelectMap:t=>this.loadMap(t),onSensitivityChange:t=>this.setMouseSensitivity(t),onVolumeChange:t=>this.audioManager.setMasterVolume(t),maps:xc,getSelectedMapId:()=>this.selectedMapId,getIsLoading:()=>this.isLoadingMap,getLoadingStatus:()=>this.loadingStatus,onSelectSkybox:t=>this.setSkybox(t),skyboxes:Cc,getSelectedSkyboxId:()=>this.selectedSkyboxId}),this.hud.setPaused(this.isPaused)}unloadMap(){this.runtime?.destroy(this.scene),this.runtime=null}async loadMap(t){const e=u_(t);if(!e)return;const n=++this.mapLoadToken;this.isLoadingMap=!0,this.isPaused=!0,this.hud?.setPaused(!0);let s=null;try{if(s=await el.create({mapOption:e,camera:this.camera,input:this.input,scene:this.scene,audioManager:this.audioManager,mouseSensitivity:this.mouseSensitivity,onStatusChange:r=>{this.loadingStatus=r}}),n!==this.mapLoadToken)return;this.unloadMap(),this.selectedMapId=e.id,this.runtime=s,this.runtime.attachToScene(this.scene),s=null,this.loadingStatus="",this.isLoadingMap=!1,this.rebuildHud()}catch(r){console.error(`Failed to load map "${e.id}".`,r),n===this.mapLoadToken&&(this.loadingStatus="",this.isLoadingMap=!1,this.rebuildHud())}finally{s?.destroy(this.scene)}}async setSkybox(t){const e=Hy(t);e&&(this.selectedSkyboxId=e.id,await this.skyboxManager.setSkybox(e.path,{backgroundIntensity:.92,environmentIntensity:.65}))}setMouseSensitivity(t){this.mouseSensitivity=Math.max(1e-4,t),this.runtime?.playerController?.setMouseSensitivity(this.mouseSensitivity)}createLighting(){const t=new Je,e=new Zf(12113919,1450023,1.9);t.add(e);const n=new Qf(16773851,1.5);return n.position.set(18,30,12),n.castShadow=!0,n.shadow.mapSize.set(2048,2048),n.shadow.camera.near=1,n.shadow.camera.far=90,n.shadow.camera.left=-40,n.shadow.camera.right=40,n.shadow.camera.top=40,n.shadow.camera.bottom=-40,t.add(n),t}onResize(){this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)}animate(){const t=Math.min(this.clock.getDelta(),.05);this.currentFps=t>0?Math.round(1/t):0;const e=this.input.consumeFrameState();this.hadPointerLock&&!this.input.pointerLocked&&!this.isPaused&&this.pauseGame(),e.justPressed.has("Escape")&&(this.isPaused?this.resumeGame():this.pauseGame()),!this.isPaused&&!this.isLoadingMap&&this.runtime?.playerController&&(this.runtime.playerController.update(t,e),this.runtime.roundManager.update(t),this.runtime.weaponManager.update(t,e),this.runtime.utilityManager.update(t),this.runtime.networkClient.update(t),this.runtime.targetManager.update(t,{playerPosition:this.runtime.playerController.position,playerEyePosition:this.runtime.playerController.getEyePosition(),collisionWorld:this.runtime.collisionWorld,navigationManager:this.runtime.navigationManager})),this.hud.update(),this.renderer.render(this.scene,this.camera),this.hadPointerLock=this.input.pointerLocked}pauseGame(){this.isPaused=!0,this.hud?.setPaused(!0),document.pointerLockElement===this.renderer.domElement&&document.exitPointerLock()}async resumeGame(){if(!this.isLoadingMap)try{await this.renderer.domElement.requestPointerLock(),await this.audioManager.unlock(),this.isPaused=!1,this.hud?.setPaused(!1)}catch(t){console.error("Failed to resume pointer lock.",t)}}}const $y=document.querySelector("#app"),Ky=new Yy($y);Ky.start();

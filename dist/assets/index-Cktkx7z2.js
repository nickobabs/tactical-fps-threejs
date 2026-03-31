(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const ho="181",A0=0,rh=1,R0=2,Cd=1,Pd=2,Li=3,Si=0,Ln=1,ni=2,zi=0,yr=1,oh=2,ah=3,ch=4,C0=5,Cs=100,P0=101,I0=102,D0=103,L0=104,U0=200,N0=201,O0=202,F0=203,xl=204,_l=205,B0=206,z0=207,k0=208,V0=209,H0=210,G0=211,W0=212,X0=213,q0=214,yl=0,vl=1,Sl=2,Sr=3,bl=4,wl=5,Ml=6,El=7,Id=0,$0=1,Y0=2,fs=0,j0=1,K0=2,Z0=3,Dd=4,J0=5,Q0=6,em=7,Ld=300,br=301,wr=302,Ca=303,Tl=304,Ga=306,Al=1e3,hi=1001,Rl=1002,Yn=1003,tm=1004,To=1005,xn=1006,rc=1007,cs=1008,bi=1009,Ud=1010,Nd=1011,io=1012,Tu=1013,Is=1014,ii=1015,_i=1016,Au=1017,Ru=1018,so=1020,Od=35902,Fd=35899,Bd=1021,zd=1022,fi=1023,ro=1026,oo=1027,kd=1028,Cu=1029,Pu=1030,Iu=1031,Du=1033,Sa=33776,ba=33777,wa=33778,Ma=33779,Cl=35840,Pl=35841,Il=35842,Dl=35843,Ll=36196,Ul=37492,Nl=37496,Ol=37808,Fl=37809,Bl=37810,zl=37811,kl=37812,Vl=37813,Hl=37814,Gl=37815,Wl=37816,Xl=37817,ql=37818,$l=37819,Yl=37820,jl=37821,Kl=36492,Zl=36494,Jl=36495,Ql=36283,eu=36284,tu=36285,nu=36286,nm=3200,im=3201,Vd=0,sm=1,os="",$n="srgb",Ds="srgb-linear",Pa="linear",Ft="srgb",zs=7680,lh=519,rm=512,om=513,am=514,Hd=515,cm=516,lm=517,um=518,hm=519,iu=35044,uh="300 es",yi=2e3,Ia=2001;function Gd(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Da(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function fm(){const i=Da("canvas");return i.style.display="block",i}const hh={};function La(...i){const e="THREE."+i.shift();console.log(e,...i)}function ot(...i){const e="THREE."+i.shift();console.warn(e,...i)}function Xt(...i){const e="THREE."+i.shift();console.error(e,...i)}function ao(...i){const e=i.join(" ");e in hh||(hh[e]=!0,ot(...i))}function dm(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}class Tr{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const vn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let fh=1234567;const eo=Math.PI/180,co=180/Math.PI;function ki(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(vn[i&255]+vn[i>>8&255]+vn[i>>16&255]+vn[i>>24&255]+"-"+vn[e&255]+vn[e>>8&255]+"-"+vn[e>>16&15|64]+vn[e>>24&255]+"-"+vn[t&63|128]+vn[t>>8&255]+"-"+vn[t>>16&255]+vn[t>>24&255]+vn[n&255]+vn[n>>8&255]+vn[n>>16&255]+vn[n>>24&255]).toLowerCase()}function ht(i,e,t){return Math.max(e,Math.min(t,i))}function Lu(i,e){return(i%e+e)%e}function pm(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function mm(i,e,t){return i!==e?(t-i)/(e-i):0}function to(i,e,t){return(1-t)*i+t*e}function gm(i,e,t,n){return to(i,e,1-Math.exp(-t*n))}function xm(i,e=1){return e-Math.abs(Lu(i,e*2)-e)}function _m(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function ym(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function vm(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Sm(i,e){return i+Math.random()*(e-i)}function bm(i){return i*(.5-Math.random())}function wm(i){i!==void 0&&(fh=i);let e=fh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Mm(i){return i*eo}function Em(i){return i*co}function Tm(i){return(i&i-1)===0&&i!==0}function Am(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Rm(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Cm(i,e,t,n,s){const r=Math.cos,o=Math.sin,a=r(t/2),c=o(t/2),l=r((e+n)/2),h=o((e+n)/2),u=r((e-n)/2),f=o((e-n)/2),p=r((n-e)/2),_=o((n-e)/2);switch(s){case"XYX":i.set(a*h,c*u,c*f,a*l);break;case"YZY":i.set(c*f,a*h,c*u,a*l);break;case"ZXZ":i.set(c*u,c*f,a*h,a*l);break;case"XZX":i.set(a*h,c*_,c*p,a*l);break;case"YXY":i.set(c*p,a*h,c*_,a*l);break;case"ZYZ":i.set(c*_,c*p,a*h,a*l);break;default:ot("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function ui(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Ut(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Zt={DEG2RAD:eo,RAD2DEG:co,generateUUID:ki,clamp:ht,euclideanModulo:Lu,mapLinear:pm,inverseLerp:mm,lerp:to,damp:gm,pingpong:xm,smoothstep:_m,smootherstep:ym,randInt:vm,randFloat:Sm,randFloatSpread:bm,seededRandom:wm,degToRad:Mm,radToDeg:Em,isPowerOfTwo:Tm,ceilPowerOfTwo:Am,floorPowerOfTwo:Rm,setQuaternionFromProperEuler:Cm,normalize:Ut,denormalize:ui};class it{constructor(e=0,t=0){it.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ht(this.x,e.x,t.x),this.y=ht(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ht(this.x,e,t),this.y=ht(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ht(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ht(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class fo{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3],f=r[o+0],p=r[o+1],_=r[o+2],y=r[o+3];if(a<=0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u;return}if(a>=1){e[t+0]=f,e[t+1]=p,e[t+2]=_,e[t+3]=y;return}if(u!==y||c!==f||l!==p||h!==_){let x=c*f+l*p+h*_+u*y;x<0&&(f=-f,p=-p,_=-_,y=-y,x=-x);let m=1-a;if(x<.9995){const S=Math.acos(x),b=Math.sin(S);m=Math.sin(m*S)/b,a=Math.sin(a*S)/b,c=c*m+f*a,l=l*m+p*a,h=h*m+_*a,u=u*m+y*a}else{c=c*m+f*a,l=l*m+p*a,h=h*m+_*a,u=u*m+y*a;const S=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=S,l*=S,h*=S,u*=S}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,o){const a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[o],f=r[o+1],p=r[o+2],_=r[o+3];return e[t]=a*_+h*u+c*p-l*f,e[t+1]=c*_+h*f+l*u-a*p,e[t+2]=l*_+h*p+a*f-c*u,e[t+3]=h*_-a*u-c*f-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),u=a(r/2),f=c(n/2),p=c(s/2),_=c(r/2);switch(o){case"XYZ":this._x=f*h*u+l*p*_,this._y=l*p*u-f*h*_,this._z=l*h*_+f*p*u,this._w=l*h*u-f*p*_;break;case"YXZ":this._x=f*h*u+l*p*_,this._y=l*p*u-f*h*_,this._z=l*h*_-f*p*u,this._w=l*h*u+f*p*_;break;case"ZXY":this._x=f*h*u-l*p*_,this._y=l*p*u+f*h*_,this._z=l*h*_+f*p*u,this._w=l*h*u-f*p*_;break;case"ZYX":this._x=f*h*u-l*p*_,this._y=l*p*u+f*h*_,this._z=l*h*_-f*p*u,this._w=l*h*u+f*p*_;break;case"YZX":this._x=f*h*u+l*p*_,this._y=l*p*u+f*h*_,this._z=l*h*_-f*p*u,this._w=l*h*u-f*p*_;break;case"XZY":this._x=f*h*u-l*p*_,this._y=l*p*u-f*h*_,this._z=l*h*_+f*p*u,this._w=l*h*u+f*p*_;break;default:ot("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],h=t[6],u=t[10],f=n+a+u;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(h-c)*p,this._y=(r-l)*p,this._z=(o-s)*p}else if(n>a&&n>u){const p=2*Math.sqrt(1+n-a-u);this._w=(h-c)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+l)/p}else if(a>u){const p=2*Math.sqrt(1+a-n-u);this._w=(r-l)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(c+h)/p}else{const p=2*Math.sqrt(1+u-n-a);this._w=(o-s)/p,this._x=(r+l)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ht(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t<=0)return this;if(t>=1)return this.copy(e);let n=e._x,s=e._y,r=e._z,o=e._w,a=this.dot(e);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let c=1-t;if(a<.9995){const l=Math.acos(a),h=Math.sin(l);c=Math.sin(c*l)/h,t=Math.sin(t*l)/h,this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+o*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+o*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{constructor(e=0,t=0,n=0){P.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(dh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(dh.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*s-a*n),h=2*(a*t-r*s),u=2*(r*n-o*t);return this.x=t+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ht(this.x,e.x,t.x),this.y=ht(this.y,e.y,t.y),this.z=ht(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ht(this.x,e,t),this.y=ht(this.y,e,t),this.z=ht(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ht(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return oc.copy(this).projectOnVector(e),this.sub(oc)}reflect(e){return this.sub(oc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ht(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const oc=new P,dh=new fo;class dt{constructor(e,t,n,s,r,o,a,c,l){dt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l)}set(e,t,n,s,r,o,a,c,l){const h=this.elements;return h[0]=e,h[1]=s,h[2]=a,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],f=n[2],p=n[5],_=n[8],y=s[0],x=s[3],m=s[6],S=s[1],b=s[4],w=s[7],T=s[2],R=s[5],L=s[8];return r[0]=o*y+a*S+c*T,r[3]=o*x+a*b+c*R,r[6]=o*m+a*w+c*L,r[1]=l*y+h*S+u*T,r[4]=l*x+h*b+u*R,r[7]=l*m+h*w+u*L,r[2]=f*y+p*S+_*T,r[5]=f*x+p*b+_*R,r[8]=f*m+p*w+_*L,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8];return t*o*h-t*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=h*o-a*l,f=a*c-h*r,p=l*r-o*c,_=t*u+n*f+s*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/_;return e[0]=u*y,e[1]=(s*l-h*n)*y,e[2]=(a*n-s*o)*y,e[3]=f*y,e[4]=(h*t-s*c)*y,e[5]=(s*r-a*t)*y,e[6]=p*y,e[7]=(n*c-l*t)*y,e[8]=(o*t-n*r)*y,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-s*l,s*c,-s*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(ac.makeScale(e,t)),this}rotate(e){return this.premultiply(ac.makeRotation(-e)),this}translate(e,t){return this.premultiply(ac.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ac=new dt,ph=new dt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),mh=new dt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Pm(){const i={enabled:!0,workingColorSpace:Ds,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===Ft&&(s.r=Vi(s.r),s.g=Vi(s.g),s.b=Vi(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Ft&&(s.r=vr(s.r),s.g=vr(s.g),s.b=vr(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===os?Pa:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return ao("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return ao("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Ds]:{primaries:e,whitePoint:n,transfer:Pa,toXYZ:ph,fromXYZ:mh,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:$n},outputColorSpaceConfig:{drawingBufferColorSpace:$n}},[$n]:{primaries:e,whitePoint:n,transfer:Ft,toXYZ:ph,fromXYZ:mh,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:$n}}}),i}const Et=Pm();function Vi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function vr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let ks;class Im{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ks===void 0&&(ks=Da("canvas")),ks.width=e.width,ks.height=e.height;const s=ks.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=ks}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Da("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Vi(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Vi(t[n]/255)*255):t[n]=Vi(t[n]);return{data:t,width:e.width,height:e.height}}else return ot("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Dm=0;class Uu{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Dm++}),this.uuid=ki(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(lc(s[o].image)):r.push(lc(s[o]))}else r=lc(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function lc(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Im.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(ot("Texture: Unable to serialize Texture."),{})}let Lm=0;const uc=new P;class Mn extends Tr{constructor(e=Mn.DEFAULT_IMAGE,t=Mn.DEFAULT_MAPPING,n=hi,s=hi,r=xn,o=cs,a=fi,c=bi,l=Mn.DEFAULT_ANISOTROPY,h=os){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Lm++}),this.uuid=ki(),this.name="",this.source=new Uu(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new it(0,0),this.repeat=new it(1,1),this.center=new it(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new dt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(uc).x}get height(){return this.source.getSize(uc).y}get depth(){return this.source.getSize(uc).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){ot(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){ot(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ld)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Al:e.x=e.x-Math.floor(e.x);break;case hi:e.x=e.x<0?0:1;break;case Rl:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Al:e.y=e.y-Math.floor(e.y);break;case hi:e.y=e.y<0?0:1;break;case Rl:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Mn.DEFAULT_IMAGE=null;Mn.DEFAULT_MAPPING=Ld;Mn.DEFAULT_ANISOTROPY=1;class jt{constructor(e=0,t=0,n=0,s=1){jt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const c=e.elements,l=c[0],h=c[4],u=c[8],f=c[1],p=c[5],_=c[9],y=c[2],x=c[6],m=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-y)<.01&&Math.abs(_-x)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+y)<.1&&Math.abs(_+x)<.1&&Math.abs(l+p+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const b=(l+1)/2,w=(p+1)/2,T=(m+1)/2,R=(h+f)/4,L=(u+y)/4,U=(_+x)/4;return b>w&&b>T?b<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(b),s=R/n,r=L/n):w>T?w<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(w),n=R/s,r=U/s):T<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),n=L/r,s=U/r),this.set(n,s,r,t),this}let S=Math.sqrt((x-_)*(x-_)+(u-y)*(u-y)+(f-h)*(f-h));return Math.abs(S)<.001&&(S=1),this.x=(x-_)/S,this.y=(u-y)/S,this.z=(f-h)/S,this.w=Math.acos((l+p+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ht(this.x,e.x,t.x),this.y=ht(this.y,e.y,t.y),this.z=ht(this.z,e.z,t.z),this.w=ht(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ht(this.x,e,t),this.y=ht(this.y,e,t),this.z=ht(this.z,e,t),this.w=ht(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ht(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Um extends Tr{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:xn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new jt(0,0,e,t),this.scissorTest=!1,this.viewport=new jt(0,0,e,t);const s={width:e,height:t,depth:n.depth},r=new Mn(s);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:xn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Uu(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ls extends Um{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Wd extends Mn{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Yn,this.minFilter=Yn,this.wrapR=hi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Nm extends Mn{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Yn,this.minFilter=Yn,this.wrapR=hi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class An{constructor(e=new P(1/0,1/0,1/0),t=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(oi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(oi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=oi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,oi):oi.fromBufferAttribute(r,o),oi.applyMatrix4(e.matrixWorld),this.expandByPoint(oi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ao.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ao.copy(n.boundingBox)),Ao.applyMatrix4(e.matrixWorld),this.union(Ao)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,oi),oi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Lr),Ro.subVectors(this.max,Lr),Vs.subVectors(e.a,Lr),Hs.subVectors(e.b,Lr),Gs.subVectors(e.c,Lr),Ki.subVectors(Hs,Vs),Zi.subVectors(Gs,Hs),ys.subVectors(Vs,Gs);let t=[0,-Ki.z,Ki.y,0,-Zi.z,Zi.y,0,-ys.z,ys.y,Ki.z,0,-Ki.x,Zi.z,0,-Zi.x,ys.z,0,-ys.x,-Ki.y,Ki.x,0,-Zi.y,Zi.x,0,-ys.y,ys.x,0];return!hc(t,Vs,Hs,Gs,Ro)||(t=[1,0,0,0,1,0,0,0,1],!hc(t,Vs,Hs,Gs,Ro))?!1:(Co.crossVectors(Ki,Zi),t=[Co.x,Co.y,Co.z],hc(t,Vs,Hs,Gs,Ro))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,oi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(oi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ti[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ti[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ti[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ti[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ti[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ti[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ti[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ti[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ti),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Ti=[new P,new P,new P,new P,new P,new P,new P,new P],oi=new P,Ao=new An,Vs=new P,Hs=new P,Gs=new P,Ki=new P,Zi=new P,ys=new P,Lr=new P,Ro=new P,Co=new P,vs=new P;function hc(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){vs.fromArray(i,r);const a=s.x*Math.abs(vs.x)+s.y*Math.abs(vs.y)+s.z*Math.abs(vs.z),c=e.dot(vs),l=t.dot(vs),h=n.dot(vs);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const Om=new An,Ur=new P,fc=new P;class Wa{constructor(e=new P,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Om.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ur.subVectors(e,this.center);const t=Ur.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Ur,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(fc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ur.copy(e.center).add(fc)),this.expandByPoint(Ur.copy(e.center).sub(fc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const Ai=new P,dc=new P,Po=new P,Ji=new P,pc=new P,Io=new P,mc=new P;class Ar{constructor(e=new P,t=new P(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ai)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Ai.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ai.copy(this.origin).addScaledVector(this.direction,t),Ai.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){dc.copy(e).add(t).multiplyScalar(.5),Po.copy(t).sub(e).normalize(),Ji.copy(this.origin).sub(dc);const r=e.distanceTo(t)*.5,o=-this.direction.dot(Po),a=Ji.dot(this.direction),c=-Ji.dot(Po),l=Ji.lengthSq(),h=Math.abs(1-o*o);let u,f,p,_;if(h>0)if(u=o*c-a,f=o*a-c,_=r*h,u>=0)if(f>=-_)if(f<=_){const y=1/h;u*=y,f*=y,p=u*(u+o*f+2*a)+f*(o*u+f+2*c)+l}else f=r,u=Math.max(0,-(o*f+a)),p=-u*u+f*(f+2*c)+l;else f=-r,u=Math.max(0,-(o*f+a)),p=-u*u+f*(f+2*c)+l;else f<=-_?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-c),r),p=-u*u+f*(f+2*c)+l):f<=_?(u=0,f=Math.min(Math.max(-r,-c),r),p=f*(f+2*c)+l):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-c),r),p=-u*u+f*(f+2*c)+l);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),p=-u*u+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(dc).addScaledVector(Po,f),p}intersectSphere(e,t){Ai.subVectors(e.center,this.origin);const n=Ai.dot(this.direction),s=Ai.dot(Ai)-n*n,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(n=(e.min.x-f.x)*l,s=(e.max.x-f.x)*l):(n=(e.max.x-f.x)*l,s=(e.min.x-f.x)*l),h>=0?(r=(e.min.y-f.y)*h,o=(e.max.y-f.y)*h):(r=(e.max.y-f.y)*h,o=(e.min.y-f.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(e.min.z-f.z)*u,c=(e.max.z-f.z)*u):(a=(e.max.z-f.z)*u,c=(e.min.z-f.z)*u),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Ai)!==null}intersectTriangle(e,t,n,s,r){pc.subVectors(t,e),Io.subVectors(n,e),mc.crossVectors(pc,Io);let o=this.direction.dot(mc),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Ji.subVectors(this.origin,e);const c=a*this.direction.dot(Io.crossVectors(Ji,Io));if(c<0)return null;const l=a*this.direction.dot(pc.cross(Ji));if(l<0||c+l>o)return null;const h=-a*Ji.dot(mc);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Tt{constructor(e,t,n,s,r,o,a,c,l,h,u,f,p,_,y,x){Tt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l,h,u,f,p,_,y,x)}set(e,t,n,s,r,o,a,c,l,h,u,f,p,_,y,x){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=s,m[1]=r,m[5]=o,m[9]=a,m[13]=c,m[2]=l,m[6]=h,m[10]=u,m[14]=f,m[3]=p,m[7]=_,m[11]=y,m[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Tt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/Ws.setFromMatrixColumn(e,0).length(),r=1/Ws.setFromMatrixColumn(e,1).length(),o=1/Ws.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const f=o*h,p=o*u,_=a*h,y=a*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=p+_*l,t[5]=f-y*l,t[9]=-a*c,t[2]=y-f*l,t[6]=_+p*l,t[10]=o*c}else if(e.order==="YXZ"){const f=c*h,p=c*u,_=l*h,y=l*u;t[0]=f+y*a,t[4]=_*a-p,t[8]=o*l,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=p*a-_,t[6]=y+f*a,t[10]=o*c}else if(e.order==="ZXY"){const f=c*h,p=c*u,_=l*h,y=l*u;t[0]=f-y*a,t[4]=-o*u,t[8]=_+p*a,t[1]=p+_*a,t[5]=o*h,t[9]=y-f*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){const f=o*h,p=o*u,_=a*h,y=a*u;t[0]=c*h,t[4]=_*l-p,t[8]=f*l+y,t[1]=c*u,t[5]=y*l+f,t[9]=p*l-_,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){const f=o*c,p=o*l,_=a*c,y=a*l;t[0]=c*h,t[4]=y-f*u,t[8]=_*u+p,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-l*h,t[6]=p*u+_,t[10]=f-y*u}else if(e.order==="XZY"){const f=o*c,p=o*l,_=a*c,y=a*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=f*u+y,t[5]=o*h,t[9]=p*u-_,t[2]=_*u-p,t[6]=a*h,t[10]=y*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Fm,e,Bm)}lookAt(e,t,n){const s=this.elements;return Wn.subVectors(e,t),Wn.lengthSq()===0&&(Wn.z=1),Wn.normalize(),Qi.crossVectors(n,Wn),Qi.lengthSq()===0&&(Math.abs(n.z)===1?Wn.x+=1e-4:Wn.z+=1e-4,Wn.normalize(),Qi.crossVectors(n,Wn)),Qi.normalize(),Do.crossVectors(Wn,Qi),s[0]=Qi.x,s[4]=Do.x,s[8]=Wn.x,s[1]=Qi.y,s[5]=Do.y,s[9]=Wn.y,s[2]=Qi.z,s[6]=Do.z,s[10]=Wn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],f=n[9],p=n[13],_=n[2],y=n[6],x=n[10],m=n[14],S=n[3],b=n[7],w=n[11],T=n[15],R=s[0],L=s[4],U=s[8],E=s[12],M=s[1],N=s[5],B=s[9],C=s[13],F=s[2],k=s[6],V=s[10],q=s[14],$=s[3],ae=s[7],Q=s[11],xe=s[15];return r[0]=o*R+a*M+c*F+l*$,r[4]=o*L+a*N+c*k+l*ae,r[8]=o*U+a*B+c*V+l*Q,r[12]=o*E+a*C+c*q+l*xe,r[1]=h*R+u*M+f*F+p*$,r[5]=h*L+u*N+f*k+p*ae,r[9]=h*U+u*B+f*V+p*Q,r[13]=h*E+u*C+f*q+p*xe,r[2]=_*R+y*M+x*F+m*$,r[6]=_*L+y*N+x*k+m*ae,r[10]=_*U+y*B+x*V+m*Q,r[14]=_*E+y*C+x*q+m*xe,r[3]=S*R+b*M+w*F+T*$,r[7]=S*L+b*N+w*k+T*ae,r[11]=S*U+b*B+w*V+T*Q,r[15]=S*E+b*C+w*q+T*xe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],h=e[2],u=e[6],f=e[10],p=e[14],_=e[3],y=e[7],x=e[11],m=e[15];return _*(+r*c*u-s*l*u-r*a*f+n*l*f+s*a*p-n*c*p)+y*(+t*c*p-t*l*f+r*o*f-s*o*p+s*l*h-r*c*h)+x*(+t*l*u-t*a*p-r*o*u+n*o*p+r*a*h-n*l*h)+m*(-s*a*h-t*c*u+t*a*f+s*o*u-n*o*f+n*c*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=e[9],f=e[10],p=e[11],_=e[12],y=e[13],x=e[14],m=e[15],S=u*x*l-y*f*l+y*c*p-a*x*p-u*c*m+a*f*m,b=_*f*l-h*x*l-_*c*p+o*x*p+h*c*m-o*f*m,w=h*y*l-_*u*l+_*a*p-o*y*p-h*a*m+o*u*m,T=_*u*c-h*y*c-_*a*f+o*y*f+h*a*x-o*u*x,R=t*S+n*b+s*w+r*T;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const L=1/R;return e[0]=S*L,e[1]=(y*f*r-u*x*r-y*s*p+n*x*p+u*s*m-n*f*m)*L,e[2]=(a*x*r-y*c*r+y*s*l-n*x*l-a*s*m+n*c*m)*L,e[3]=(u*c*r-a*f*r-u*s*l+n*f*l+a*s*p-n*c*p)*L,e[4]=b*L,e[5]=(h*x*r-_*f*r+_*s*p-t*x*p-h*s*m+t*f*m)*L,e[6]=(_*c*r-o*x*r-_*s*l+t*x*l+o*s*m-t*c*m)*L,e[7]=(o*f*r-h*c*r+h*s*l-t*f*l-o*s*p+t*c*p)*L,e[8]=w*L,e[9]=(_*u*r-h*y*r-_*n*p+t*y*p+h*n*m-t*u*m)*L,e[10]=(o*y*r-_*a*r+_*n*l-t*y*l-o*n*m+t*a*m)*L,e[11]=(h*a*r-o*u*r-h*n*l+t*u*l+o*n*p-t*a*p)*L,e[12]=T*L,e[13]=(h*y*s-_*u*s+_*n*f-t*y*f-h*n*x+t*u*x)*L,e[14]=(_*a*s-o*y*s-_*n*c+t*y*c+o*n*x-t*a*x)*L,e[15]=(o*u*s-h*a*s+h*n*c-t*u*c-o*n*f+t*a*f)*L,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,c=e.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,h=o+o,u=a+a,f=r*l,p=r*h,_=r*u,y=o*h,x=o*u,m=a*u,S=c*l,b=c*h,w=c*u,T=n.x,R=n.y,L=n.z;return s[0]=(1-(y+m))*T,s[1]=(p+w)*T,s[2]=(_-b)*T,s[3]=0,s[4]=(p-w)*R,s[5]=(1-(f+m))*R,s[6]=(x+S)*R,s[7]=0,s[8]=(_+b)*L,s[9]=(x-S)*L,s[10]=(1-(f+y))*L,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=Ws.set(s[0],s[1],s[2]).length();const o=Ws.set(s[4],s[5],s[6]).length(),a=Ws.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],ai.copy(this);const l=1/r,h=1/o,u=1/a;return ai.elements[0]*=l,ai.elements[1]*=l,ai.elements[2]*=l,ai.elements[4]*=h,ai.elements[5]*=h,ai.elements[6]*=h,ai.elements[8]*=u,ai.elements[9]*=u,ai.elements[10]*=u,t.setFromRotationMatrix(ai),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,s,r,o,a=yi,c=!1){const l=this.elements,h=2*r/(t-e),u=2*r/(n-s),f=(t+e)/(t-e),p=(n+s)/(n-s);let _,y;if(c)_=r/(o-r),y=o*r/(o-r);else if(a===yi)_=-(o+r)/(o-r),y=-2*o*r/(o-r);else if(a===Ia)_=-o/(o-r),y=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=_,l[14]=y,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=yi,c=!1){const l=this.elements,h=2/(t-e),u=2/(n-s),f=-(t+e)/(t-e),p=-(n+s)/(n-s);let _,y;if(c)_=1/(o-r),y=o/(o-r);else if(a===yi)_=-2/(o-r),y=-(o+r)/(o-r);else if(a===Ia)_=-1/(o-r),y=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=u,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=_,l[14]=y,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Ws=new P,ai=new Tt,Fm=new P(0,0,0),Bm=new P(1,1,1),Qi=new P,Do=new P,Wn=new P,gh=new Tt,xh=new fo;class wi{constructor(e=0,t=0,n=0,s=wi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],f=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(ht(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ht(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(ht(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-ht(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(ht(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-ht(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:ot("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return gh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(gh,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return xh.setFromEuler(this),this.setFromQuaternion(xh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}wi.DEFAULT_ORDER="XYZ";class Nu{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let zm=0;const _h=new P,Xs=new fo,Ri=new Tt,Lo=new P,Nr=new P,km=new P,Vm=new fo,yh=new P(1,0,0),vh=new P(0,1,0),Sh=new P(0,0,1),bh={type:"added"},Hm={type:"removed"},qs={type:"childadded",child:null},gc={type:"childremoved",child:null};class Gt extends Tr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:zm++}),this.uuid=ki(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Gt.DEFAULT_UP.clone();const e=new P,t=new wi,n=new fo,s=new P(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Tt},normalMatrix:{value:new dt}}),this.matrix=new Tt,this.matrixWorld=new Tt,this.matrixAutoUpdate=Gt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Gt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Nu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Xs.setFromAxisAngle(e,t),this.quaternion.multiply(Xs),this}rotateOnWorldAxis(e,t){return Xs.setFromAxisAngle(e,t),this.quaternion.premultiply(Xs),this}rotateX(e){return this.rotateOnAxis(yh,e)}rotateY(e){return this.rotateOnAxis(vh,e)}rotateZ(e){return this.rotateOnAxis(Sh,e)}translateOnAxis(e,t){return _h.copy(e).applyQuaternion(this.quaternion),this.position.add(_h.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(yh,e)}translateY(e){return this.translateOnAxis(vh,e)}translateZ(e){return this.translateOnAxis(Sh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ri.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Lo.copy(e):Lo.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Nr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ri.lookAt(Nr,Lo,this.up):Ri.lookAt(Lo,Nr,this.up),this.quaternion.setFromRotationMatrix(Ri),s&&(Ri.extractRotation(s.matrixWorld),Xs.setFromRotationMatrix(Ri),this.quaternion.premultiply(Xs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Xt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(bh),qs.child=e,this.dispatchEvent(qs),qs.child=null):Xt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Hm),gc.child=e,this.dispatchEvent(gc),gc.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ri.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ri.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ri),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(bh),qs.child=e,this.dispatchEvent(qs),qs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Nr,e,km),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Nr,Vm,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(e.animations,c))}}if(t){const a=o(e.geometries),c=o(e.materials),l=o(e.textures),h=o(e.images),u=o(e.shapes),f=o(e.skeletons),p=o(e.animations),_=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),p.length>0&&(n.animations=p),_.length>0&&(n.nodes=_)}return n.object=s,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}Gt.DEFAULT_UP=new P(0,1,0);Gt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Gt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ci=new P,Ci=new P,xc=new P,Pi=new P,$s=new P,Ys=new P,wh=new P,_c=new P,yc=new P,vc=new P,Sc=new jt,bc=new jt,wc=new jt;class hn{constructor(e=new P,t=new P,n=new P){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),ci.subVectors(e,t),s.cross(ci);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){ci.subVectors(s,t),Ci.subVectors(n,t),xc.subVectors(e,t);const o=ci.dot(ci),a=ci.dot(Ci),c=ci.dot(xc),l=Ci.dot(Ci),h=Ci.dot(xc),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;const f=1/u,p=(l*c-a*h)*f,_=(o*h-a*c)*f;return r.set(1-p-_,_,p)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Pi)===null?!1:Pi.x>=0&&Pi.y>=0&&Pi.x+Pi.y<=1}static getInterpolation(e,t,n,s,r,o,a,c){return this.getBarycoord(e,t,n,s,Pi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Pi.x),c.addScaledVector(o,Pi.y),c.addScaledVector(a,Pi.z),c)}static getInterpolatedAttribute(e,t,n,s,r,o){return Sc.setScalar(0),bc.setScalar(0),wc.setScalar(0),Sc.fromBufferAttribute(e,t),bc.fromBufferAttribute(e,n),wc.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(Sc,r.x),o.addScaledVector(bc,r.y),o.addScaledVector(wc,r.z),o}static isFrontFacing(e,t,n,s){return ci.subVectors(n,t),Ci.subVectors(e,t),ci.cross(Ci).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ci.subVectors(this.c,this.b),Ci.subVectors(this.a,this.b),ci.cross(Ci).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return hn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return hn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return hn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return hn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return hn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let o,a;$s.subVectors(s,n),Ys.subVectors(r,n),_c.subVectors(e,n);const c=$s.dot(_c),l=Ys.dot(_c);if(c<=0&&l<=0)return t.copy(n);yc.subVectors(e,s);const h=$s.dot(yc),u=Ys.dot(yc);if(h>=0&&u<=h)return t.copy(s);const f=c*u-h*l;if(f<=0&&c>=0&&h<=0)return o=c/(c-h),t.copy(n).addScaledVector($s,o);vc.subVectors(e,r);const p=$s.dot(vc),_=Ys.dot(vc);if(_>=0&&p<=_)return t.copy(r);const y=p*l-c*_;if(y<=0&&l>=0&&_<=0)return a=l/(l-_),t.copy(n).addScaledVector(Ys,a);const x=h*_-p*u;if(x<=0&&u-h>=0&&p-_>=0)return wh.subVectors(r,s),a=(u-h)/(u-h+(p-_)),t.copy(s).addScaledVector(wh,a);const m=1/(x+y+f);return o=y*m,a=f*m,t.copy(n).addScaledVector($s,o).addScaledVector(Ys,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Xd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},es={h:0,s:0,l:0},Uo={h:0,s:0,l:0};function Mc(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class xt{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=$n){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Et.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=Et.workingColorSpace){return this.r=e,this.g=t,this.b=n,Et.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=Et.workingColorSpace){if(e=Lu(e,1),t=ht(t,0,1),n=ht(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=Mc(o,r,e+1/3),this.g=Mc(o,r,e),this.b=Mc(o,r,e-1/3)}return Et.colorSpaceToWorking(this,s),this}setStyle(e,t=$n){function n(r){r!==void 0&&parseFloat(r)<1&&ot("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:ot("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);ot("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=$n){const n=Xd[e.toLowerCase()];return n!==void 0?this.setHex(n,t):ot("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Vi(e.r),this.g=Vi(e.g),this.b=Vi(e.b),this}copyLinearToSRGB(e){return this.r=vr(e.r),this.g=vr(e.g),this.b=vr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=$n){return Et.workingToColorSpace(Sn.copy(this),e),Math.round(ht(Sn.r*255,0,255))*65536+Math.round(ht(Sn.g*255,0,255))*256+Math.round(ht(Sn.b*255,0,255))}getHexString(e=$n){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Et.workingColorSpace){Et.workingToColorSpace(Sn.copy(this),t);const n=Sn.r,s=Sn.g,r=Sn.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=Et.workingColorSpace){return Et.workingToColorSpace(Sn.copy(this),t),e.r=Sn.r,e.g=Sn.g,e.b=Sn.b,e}getStyle(e=$n){Et.workingToColorSpace(Sn.copy(this),e);const t=Sn.r,n=Sn.g,s=Sn.b;return e!==$n?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(es),this.setHSL(es.h+e,es.s+t,es.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(es),e.getHSL(Uo);const n=to(es.h,Uo.h,t),s=to(es.s,Uo.s,t),r=to(es.l,Uo.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Sn=new xt;xt.NAMES=Xd;let Gm=0;class Us extends Tr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Gm++}),this.uuid=ki(),this.name="",this.type="Material",this.blending=yr,this.side=Si,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=xl,this.blendDst=_l,this.blendEquation=Cs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new xt(0,0,0),this.blendAlpha=0,this.depthFunc=Sr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=lh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=zs,this.stencilZFail=zs,this.stencilZPass=zs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){ot(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){ot(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==yr&&(n.blending=this.blending),this.side!==Si&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==xl&&(n.blendSrc=this.blendSrc),this.blendDst!==_l&&(n.blendDst=this.blendDst),this.blendEquation!==Cs&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Sr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==lh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==zs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==zs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==zs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class xs extends Us{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new xt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wi,this.combine=Id,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Bi=Wm();function Wm(){const i=new ArrayBuffer(4),e=new Float32Array(i),t=new Uint32Array(i),n=new Uint32Array(512),s=new Uint32Array(512);for(let c=0;c<256;++c){const l=c-127;l<-27?(n[c]=0,n[c|256]=32768,s[c]=24,s[c|256]=24):l<-14?(n[c]=1024>>-l-14,n[c|256]=1024>>-l-14|32768,s[c]=-l-1,s[c|256]=-l-1):l<=15?(n[c]=l+15<<10,n[c|256]=l+15<<10|32768,s[c]=13,s[c|256]=13):l<128?(n[c]=31744,n[c|256]=64512,s[c]=24,s[c|256]=24):(n[c]=31744,n[c|256]=64512,s[c]=13,s[c|256]=13)}const r=new Uint32Array(2048),o=new Uint32Array(64),a=new Uint32Array(64);for(let c=1;c<1024;++c){let l=c<<13,h=0;for(;(l&8388608)===0;)l<<=1,h-=8388608;l&=-8388609,h+=947912704,r[c]=l|h}for(let c=1024;c<2048;++c)r[c]=939524096+(c-1024<<13);for(let c=1;c<31;++c)o[c]=c<<23;o[31]=1199570944,o[32]=2147483648;for(let c=33;c<63;++c)o[c]=2147483648+(c-32<<23);o[63]=3347054592;for(let c=1;c<64;++c)c!==32&&(a[c]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:s,mantissaTable:r,exponentTable:o,offsetTable:a}}function Xm(i){Math.abs(i)>65504&&ot("DataUtils.toHalfFloat(): Value out of range."),i=ht(i,-65504,65504),Bi.floatView[0]=i;const e=Bi.uint32View[0],t=e>>23&511;return Bi.baseTable[t]+((e&8388607)>>Bi.shiftTable[t])}function qm(i){const e=i>>10;return Bi.uint32View[0]=Bi.mantissaTable[Bi.offsetTable[e]+(i&1023)]+Bi.exponentTable[e],Bi.floatView[0]}class No{static toHalfFloat(e){return Xm(e)}static fromHalfFloat(e){return qm(e)}}const en=new P,Oo=new it;let $m=0;class Hn{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:$m++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=iu,this.updateRanges=[],this.gpuType=ii,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Oo.fromBufferAttribute(this,t),Oo.applyMatrix3(e),this.setXY(t,Oo.x,Oo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)en.fromBufferAttribute(this,t),en.applyMatrix3(e),this.setXYZ(t,en.x,en.y,en.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)en.fromBufferAttribute(this,t),en.applyMatrix4(e),this.setXYZ(t,en.x,en.y,en.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)en.fromBufferAttribute(this,t),en.applyNormalMatrix(e),this.setXYZ(t,en.x,en.y,en.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)en.fromBufferAttribute(this,t),en.transformDirection(e),this.setXYZ(t,en.x,en.y,en.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=ui(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ut(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ui(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ui(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ui(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ui(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Ut(t,this.array),n=Ut(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Ut(t,this.array),n=Ut(n,this.array),s=Ut(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Ut(t,this.array),n=Ut(n,this.array),s=Ut(s,this.array),r=Ut(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==iu&&(e.usage=this.usage),e}}class qd extends Hn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class $d extends Hn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class kt extends Hn{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Ym=0;const Jn=new Tt,Ec=new Gt,js=new P,Xn=new An,Or=new An,cn=new P;class pn extends Tr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ym++}),this.uuid=ki(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Gd(e)?$d:qd)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new dt().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Jn.makeRotationFromQuaternion(e),this.applyMatrix4(Jn),this}rotateX(e){return Jn.makeRotationX(e),this.applyMatrix4(Jn),this}rotateY(e){return Jn.makeRotationY(e),this.applyMatrix4(Jn),this}rotateZ(e){return Jn.makeRotationZ(e),this.applyMatrix4(Jn),this}translate(e,t,n){return Jn.makeTranslation(e,t,n),this.applyMatrix4(Jn),this}scale(e,t,n){return Jn.makeScale(e,t,n),this.applyMatrix4(Jn),this}lookAt(e){return Ec.lookAt(e),Ec.updateMatrix(),this.applyMatrix4(Ec.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(js).negate(),this.translate(js.x,js.y,js.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new kt(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&ot("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new An);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Xt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];Xn.setFromBufferAttribute(r),this.morphTargetsRelative?(cn.addVectors(this.boundingBox.min,Xn.min),this.boundingBox.expandByPoint(cn),cn.addVectors(this.boundingBox.max,Xn.max),this.boundingBox.expandByPoint(cn)):(this.boundingBox.expandByPoint(Xn.min),this.boundingBox.expandByPoint(Xn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Xt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Wa);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Xt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(e){const n=this.boundingSphere.center;if(Xn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];Or.setFromBufferAttribute(a),this.morphTargetsRelative?(cn.addVectors(Xn.min,Or.min),Xn.expandByPoint(cn),cn.addVectors(Xn.max,Or.max),Xn.expandByPoint(cn)):(Xn.expandByPoint(Or.min),Xn.expandByPoint(Or.max))}Xn.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)cn.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(cn));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)cn.fromBufferAttribute(a,l),c&&(js.fromBufferAttribute(e,l),cn.add(js)),s=Math.max(s,n.distanceToSquared(cn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Xt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Xt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Hn(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let U=0;U<n.count;U++)a[U]=new P,c[U]=new P;const l=new P,h=new P,u=new P,f=new it,p=new it,_=new it,y=new P,x=new P;function m(U,E,M){l.fromBufferAttribute(n,U),h.fromBufferAttribute(n,E),u.fromBufferAttribute(n,M),f.fromBufferAttribute(r,U),p.fromBufferAttribute(r,E),_.fromBufferAttribute(r,M),h.sub(l),u.sub(l),p.sub(f),_.sub(f);const N=1/(p.x*_.y-_.x*p.y);isFinite(N)&&(y.copy(h).multiplyScalar(_.y).addScaledVector(u,-p.y).multiplyScalar(N),x.copy(u).multiplyScalar(p.x).addScaledVector(h,-_.x).multiplyScalar(N),a[U].add(y),a[E].add(y),a[M].add(y),c[U].add(x),c[E].add(x),c[M].add(x))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let U=0,E=S.length;U<E;++U){const M=S[U],N=M.start,B=M.count;for(let C=N,F=N+B;C<F;C+=3)m(e.getX(C+0),e.getX(C+1),e.getX(C+2))}const b=new P,w=new P,T=new P,R=new P;function L(U){T.fromBufferAttribute(s,U),R.copy(T);const E=a[U];b.copy(E),b.sub(T.multiplyScalar(T.dot(E))).normalize(),w.crossVectors(R,E);const N=w.dot(c[U])<0?-1:1;o.setXYZW(U,b.x,b.y,b.z,N)}for(let U=0,E=S.length;U<E;++U){const M=S[U],N=M.start,B=M.count;for(let C=N,F=N+B;C<F;C+=3)L(e.getX(C+0)),L(e.getX(C+1)),L(e.getX(C+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Hn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,p=n.count;f<p;f++)n.setXYZ(f,0,0,0);const s=new P,r=new P,o=new P,a=new P,c=new P,l=new P,h=new P,u=new P;if(e)for(let f=0,p=e.count;f<p;f+=3){const _=e.getX(f+0),y=e.getX(f+1),x=e.getX(f+2);s.fromBufferAttribute(t,_),r.fromBufferAttribute(t,y),o.fromBufferAttribute(t,x),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,_),c.fromBufferAttribute(n,y),l.fromBufferAttribute(n,x),a.add(h),c.add(h),l.add(h),n.setXYZ(_,a.x,a.y,a.z),n.setXYZ(y,c.x,c.y,c.z),n.setXYZ(x,l.x,l.y,l.z)}else for(let f=0,p=t.count;f<p;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)cn.fromBufferAttribute(e,t),cn.normalize(),e.setXYZ(t,cn.x,cn.y,cn.z)}toNonIndexed(){function e(a,c){const l=a.array,h=a.itemSize,u=a.normalized,f=new l.constructor(c.length*h);let p=0,_=0;for(let y=0,x=c.length;y<x;y++){a.isInterleavedBufferAttribute?p=c[y]*a.data.stride+a.offset:p=c[y]*h;for(let m=0;m<h;m++)f[_++]=l[p++]}return new Hn(f,h,u)}if(this.index===null)return ot("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new pn,n=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=e(c,n);t.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){const f=l[h],p=e(f,n);c.push(p)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){const p=l[u];h.push(p.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(t))}const r=e.morphAttributes;for(const l in r){const h=[],u=r[l];for(let f=0,p=u.length;f<p;f++)h.push(u[f].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let l=0,h=o.length;l<h;l++){const u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Mh=new Tt,Ss=new Ar,Fo=new Wa,Eh=new P,Bo=new P,zo=new P,ko=new P,Tc=new P,Vo=new P,Th=new P,Ho=new P;class It extends Gt{constructor(e=new pn,t=new xs){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){Vo.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=a[c],u=r[c];h!==0&&(Tc.fromBufferAttribute(u,e),o?Vo.addScaledVector(Tc,h):Vo.addScaledVector(Tc.sub(t),h))}t.add(Vo)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Fo.copy(n.boundingSphere),Fo.applyMatrix4(r),Ss.copy(e.ray).recast(e.near),!(Fo.containsPoint(Ss.origin)===!1&&(Ss.intersectSphere(Fo,Eh)===null||Ss.origin.distanceToSquared(Eh)>(e.far-e.near)**2))&&(Mh.copy(r).invert(),Ss.copy(e.ray).applyMatrix4(Mh),!(n.boundingBox!==null&&Ss.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Ss)))}_computeIntersections(e,t,n){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,y=f.length;_<y;_++){const x=f[_],m=o[x.materialIndex],S=Math.max(x.start,p.start),b=Math.min(a.count,Math.min(x.start+x.count,p.start+p.count));for(let w=S,T=b;w<T;w+=3){const R=a.getX(w),L=a.getX(w+1),U=a.getX(w+2);s=Go(this,m,e,n,l,h,u,R,L,U),s&&(s.faceIndex=Math.floor(w/3),s.face.materialIndex=x.materialIndex,t.push(s))}}else{const _=Math.max(0,p.start),y=Math.min(a.count,p.start+p.count);for(let x=_,m=y;x<m;x+=3){const S=a.getX(x),b=a.getX(x+1),w=a.getX(x+2);s=Go(this,o,e,n,l,h,u,S,b,w),s&&(s.faceIndex=Math.floor(x/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let _=0,y=f.length;_<y;_++){const x=f[_],m=o[x.materialIndex],S=Math.max(x.start,p.start),b=Math.min(c.count,Math.min(x.start+x.count,p.start+p.count));for(let w=S,T=b;w<T;w+=3){const R=w,L=w+1,U=w+2;s=Go(this,m,e,n,l,h,u,R,L,U),s&&(s.faceIndex=Math.floor(w/3),s.face.materialIndex=x.materialIndex,t.push(s))}}else{const _=Math.max(0,p.start),y=Math.min(c.count,p.start+p.count);for(let x=_,m=y;x<m;x+=3){const S=x,b=x+1,w=x+2;s=Go(this,o,e,n,l,h,u,S,b,w),s&&(s.faceIndex=Math.floor(x/3),t.push(s))}}}}function jm(i,e,t,n,s,r,o,a){let c;if(e.side===Ln?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,e.side===Si,a),c===null)return null;Ho.copy(a),Ho.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Ho);return l<t.near||l>t.far?null:{distance:l,point:Ho.clone(),object:i}}function Go(i,e,t,n,s,r,o,a,c,l){i.getVertexPosition(a,Bo),i.getVertexPosition(c,zo),i.getVertexPosition(l,ko);const h=jm(i,e,t,n,Bo,zo,ko,Th);if(h){const u=new P;hn.getBarycoord(Th,Bo,zo,ko,u),s&&(h.uv=hn.getInterpolatedAttribute(s,a,c,l,u,new it)),r&&(h.uv1=hn.getInterpolatedAttribute(r,a,c,l,u,new it)),o&&(h.normal=hn.getInterpolatedAttribute(o,a,c,l,u,new P),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a,b:c,c:l,normal:new P,materialIndex:0};hn.getNormal(Bo,zo,ko,f.normal),h.face=f,h.barycoord=u}return h}class wt extends pn{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],h=[],u=[];let f=0,p=0;_("z","y","x",-1,-1,n,t,e,o,r,0),_("z","y","x",1,-1,n,t,-e,o,r,1),_("x","z","y",1,1,e,n,t,s,o,2),_("x","z","y",1,-1,e,n,-t,s,o,3),_("x","y","z",1,-1,e,t,n,s,r,4),_("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new kt(l,3)),this.setAttribute("normal",new kt(h,3)),this.setAttribute("uv",new kt(u,2));function _(y,x,m,S,b,w,T,R,L,U,E){const M=w/L,N=T/U,B=w/2,C=T/2,F=R/2,k=L+1,V=U+1;let q=0,$=0;const ae=new P;for(let Q=0;Q<V;Q++){const xe=Q*N-C;for(let be=0;be<k;be++){const He=be*M-B;ae[y]=He*S,ae[x]=xe*b,ae[m]=F,l.push(ae.x,ae.y,ae.z),ae[y]=0,ae[x]=0,ae[m]=R>0?1:-1,h.push(ae.x,ae.y,ae.z),u.push(be/L),u.push(1-Q/U),q+=1}}for(let Q=0;Q<U;Q++)for(let xe=0;xe<L;xe++){const be=f+xe+k*Q,He=f+xe+k*(Q+1),Je=f+(xe+1)+k*(Q+1),ct=f+(xe+1)+k*Q;c.push(be,He,ct),c.push(He,Je,ct),$+=6}a.addGroup(p,$,E),p+=$,f+=q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Mr(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(ot("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function In(i){const e={};for(let t=0;t<i.length;t++){const n=Mr(i[t]);for(const s in n)e[s]=n[s]}return e}function Km(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Yd(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Et.workingColorSpace}const Zm={clone:Mr,merge:In};var Jm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Qm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Gi extends Us{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Jm,this.fragmentShader=Qm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Mr(e.uniforms),this.uniformsGroups=Km(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class jd extends Gt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Tt,this.projectionMatrix=new Tt,this.projectionMatrixInverse=new Tt,this.coordinateSystem=yi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ts=new P,Ah=new it,Rh=new it;class ti extends jd{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=co*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(eo*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return co*2*Math.atan(Math.tan(eo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ts.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ts.x,ts.y).multiplyScalar(-e/ts.z),ts.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ts.x,ts.y).multiplyScalar(-e/ts.z)}getViewSize(e,t){return this.getViewBounds(e,Ah,Rh),t.subVectors(Rh,Ah)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(eo*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,t-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ks=-90,Zs=1;class eg extends Gt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new ti(Ks,Zs,e,t);s.layers=this.layers,this.add(s);const r=new ti(Ks,Zs,e,t);r.layers=this.layers,this.add(r);const o=new ti(Ks,Zs,e,t);o.layers=this.layers,this.add(o);const a=new ti(Ks,Zs,e,t);a.layers=this.layers,this.add(a);const c=new ti(Ks,Zs,e,t);c.layers=this.layers,this.add(c);const l=new ti(Ks,Zs,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,c]=t;for(const l of t)this.remove(l);if(e===yi)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Ia)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,h]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,o),e.setRenderTarget(n,2,s),e.render(t,a),e.setRenderTarget(n,3,s),e.render(t,c),e.setRenderTarget(n,4,s),e.render(t,l),n.texture.generateMipmaps=y,e.setRenderTarget(n,5,s),e.render(t,h),e.setRenderTarget(u,f,p),e.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class Kd extends Mn{constructor(e=[],t=br,n,s,r,o,a,c,l,h){super(e,t,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class tg extends Ls{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Kd(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new wt(5,5,5),r=new Gi({name:"CubemapFromEquirect",uniforms:Mr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ln,blending:zi});r.uniforms.tEquirect.value=t;const o=new It(s,r),a=t.minFilter;return t.minFilter===cs&&(t.minFilter=xn),new eg(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}}class kn extends Gt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const ng={type:"move"};class Ac{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new kn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new kn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new kn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(const y of e.hand.values()){const x=t.getJointPose(y,n),m=this._getHandJoint(l,y);x!==null&&(m.matrix.fromArray(x.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=x.radius),m.visible=x!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),p=.02,_=.005;l.inputState.pinching&&f>p+_?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=p-_&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(ng)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new kn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class Ou{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new xt(e),this.near=t,this.far=n}clone(){return new Ou(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class ig extends Gt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new wi,this.environmentIntensity=1,this.environmentRotation=new wi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class sg{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=iu,this.updateRanges=[],this.version=0,this.uuid=ki()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ki()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ki()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Cn=new P;class Ua{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Cn.fromBufferAttribute(this,t),Cn.applyMatrix4(e),this.setXYZ(t,Cn.x,Cn.y,Cn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Cn.fromBufferAttribute(this,t),Cn.applyNormalMatrix(e),this.setXYZ(t,Cn.x,Cn.y,Cn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Cn.fromBufferAttribute(this,t),Cn.transformDirection(e),this.setXYZ(t,Cn.x,Cn.y,Cn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=ui(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ut(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Ut(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Ut(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Ut(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Ut(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=ui(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=ui(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=ui(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=ui(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ut(t,this.array),n=Ut(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ut(t,this.array),n=Ut(n,this.array),s=Ut(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ut(t,this.array),n=Ut(n,this.array),s=Ut(s,this.array),r=Ut(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){La("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Hn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Ua(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){La("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Zd extends Us{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new xt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Js;const Fr=new P,Qs=new P,er=new P,tr=new it,Br=new it,Jd=new Tt,Wo=new P,zr=new P,Xo=new P,Ch=new it,Rc=new it,Ph=new it;class rg extends Gt{constructor(e=new Zd){if(super(),this.isSprite=!0,this.type="Sprite",Js===void 0){Js=new pn;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new sg(t,5);Js.setIndex([0,1,2,0,2,3]),Js.setAttribute("position",new Ua(n,3,0,!1)),Js.setAttribute("uv",new Ua(n,2,3,!1))}this.geometry=Js,this.material=e,this.center=new it(.5,.5),this.count=1}raycast(e,t){e.camera===null&&Xt('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Qs.setFromMatrixScale(this.matrixWorld),Jd.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),er.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Qs.multiplyScalar(-er.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const o=this.center;qo(Wo.set(-.5,-.5,0),er,o,Qs,s,r),qo(zr.set(.5,-.5,0),er,o,Qs,s,r),qo(Xo.set(.5,.5,0),er,o,Qs,s,r),Ch.set(0,0),Rc.set(1,0),Ph.set(1,1);let a=e.ray.intersectTriangle(Wo,zr,Xo,!1,Fr);if(a===null&&(qo(zr.set(-.5,.5,0),er,o,Qs,s,r),Rc.set(0,1),a=e.ray.intersectTriangle(Wo,Xo,zr,!1,Fr),a===null))return;const c=e.ray.origin.distanceTo(Fr);c<e.near||c>e.far||t.push({distance:c,point:Fr.clone(),uv:hn.getInterpolation(Fr,Wo,zr,Xo,Ch,Rc,Ph,new it),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function qo(i,e,t,n,s,r){tr.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(Br.x=r*tr.x-s*tr.y,Br.y=s*tr.x+r*tr.y):Br.copy(tr),i.copy(e),i.x+=Br.x,i.y+=Br.y,i.applyMatrix4(Jd)}class Qd extends Mn{constructor(e=null,t=1,n=1,s,r,o,a,c,l=Yn,h=Yn,u,f){super(null,o,a,c,l,h,s,r,u,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Cc=new P,og=new P,ag=new dt;class Oi{constructor(e=new P(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Cc.subVectors(n,t).cross(og.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Cc),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||ag.getNormalMatrix(e),s=this.coplanarPoint(Cc).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const bs=new Wa,cg=new it(.5,.5),$o=new P;class Fu{constructor(e=new Oi,t=new Oi,n=new Oi,s=new Oi,r=new Oi,o=new Oi){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=yi,n=!1){const s=this.planes,r=e.elements,o=r[0],a=r[1],c=r[2],l=r[3],h=r[4],u=r[5],f=r[6],p=r[7],_=r[8],y=r[9],x=r[10],m=r[11],S=r[12],b=r[13],w=r[14],T=r[15];if(s[0].setComponents(l-o,p-h,m-_,T-S).normalize(),s[1].setComponents(l+o,p+h,m+_,T+S).normalize(),s[2].setComponents(l+a,p+u,m+y,T+b).normalize(),s[3].setComponents(l-a,p-u,m-y,T-b).normalize(),n)s[4].setComponents(c,f,x,w).normalize(),s[5].setComponents(l-c,p-f,m-x,T-w).normalize();else if(s[4].setComponents(l-c,p-f,m-x,T-w).normalize(),t===yi)s[5].setComponents(l+c,p+f,m+x,T+w).normalize();else if(t===Ia)s[5].setComponents(c,f,x,w).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),bs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),bs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(bs)}intersectsSprite(e){bs.center.set(0,0,0);const t=cg.distanceTo(e.center);return bs.radius=.7071067811865476+t,bs.applyMatrix4(e.matrixWorld),this.intersectsSphere(bs)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if($o.x=s.normal.x>0?e.max.x:e.min.x,$o.y=s.normal.y>0?e.max.y:e.min.y,$o.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint($o)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Bu extends Us{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new xt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Na=new P,Oa=new P,Ih=new Tt,kr=new Ar,Yo=new Wa,Pc=new P,Dh=new P;class ep extends Gt{constructor(e=new pn,t=new Bu){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Na.fromBufferAttribute(t,s-1),Oa.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Na.distanceTo(Oa);e.setAttribute("lineDistance",new kt(n,1))}else ot("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Yo.copy(n.boundingSphere),Yo.applyMatrix4(s),Yo.radius+=r,e.ray.intersectsSphere(Yo)===!1)return;Ih.copy(s).invert(),kr.copy(e.ray).applyMatrix4(Ih);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){const p=Math.max(0,o.start),_=Math.min(h.count,o.start+o.count);for(let y=p,x=_-1;y<x;y+=l){const m=h.getX(y),S=h.getX(y+1),b=jo(this,e,kr,c,m,S,y);b&&t.push(b)}if(this.isLineLoop){const y=h.getX(_-1),x=h.getX(p),m=jo(this,e,kr,c,y,x,_-1);m&&t.push(m)}}else{const p=Math.max(0,o.start),_=Math.min(f.count,o.start+o.count);for(let y=p,x=_-1;y<x;y+=l){const m=jo(this,e,kr,c,y,y+1,y);m&&t.push(m)}if(this.isLineLoop){const y=jo(this,e,kr,c,_-1,p,_-1);y&&t.push(y)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function jo(i,e,t,n,s,r,o){const a=i.geometry.attributes.position;if(Na.fromBufferAttribute(a,s),Oa.fromBufferAttribute(a,r),t.distanceSqToSegment(Na,Oa,Pc,Dh)>n)return;Pc.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(Pc);if(!(l<e.near||l>e.far))return{distance:l,point:Dh.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}const Lh=new P,Uh=new P;class lg extends ep{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Lh.fromBufferAttribute(t,s),Uh.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Lh.distanceTo(Uh);e.setAttribute("lineDistance",new kt(n,1))}else ot("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class tp extends Mn{constructor(e,t,n,s,r,o,a,c,l){super(e,t,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class np extends Mn{constructor(e,t,n=Is,s,r,o,a=Yn,c=Yn,l,h=ro,u=1){if(h!==ro&&h!==oo)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:u};super(f,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Uu(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class ip extends Mn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class zu extends pn{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const r=[],o=[],a=[],c=[],l=new P,h=new it;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,f=3;u<=t;u++,f+=3){const p=n+u/t*s;l.x=e*Math.cos(p),l.y=e*Math.sin(p),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[f]/e+1)/2,h.y=(o[f+1]/e+1)/2,c.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new kt(o,3)),this.setAttribute("normal",new kt(a,3)),this.setAttribute("uv",new kt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zu(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Vn extends pn{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],f=[],p=[];let _=0;const y=[],x=n/2;let m=0;S(),o===!1&&(e>0&&b(!0),t>0&&b(!1)),this.setIndex(h),this.setAttribute("position",new kt(u,3)),this.setAttribute("normal",new kt(f,3)),this.setAttribute("uv",new kt(p,2));function S(){const w=new P,T=new P;let R=0;const L=(t-e)/n;for(let U=0;U<=r;U++){const E=[],M=U/r,N=M*(t-e)+e;for(let B=0;B<=s;B++){const C=B/s,F=C*c+a,k=Math.sin(F),V=Math.cos(F);T.x=N*k,T.y=-M*n+x,T.z=N*V,u.push(T.x,T.y,T.z),w.set(k,L,V).normalize(),f.push(w.x,w.y,w.z),p.push(C,1-M),E.push(_++)}y.push(E)}for(let U=0;U<s;U++)for(let E=0;E<r;E++){const M=y[E][U],N=y[E+1][U],B=y[E+1][U+1],C=y[E][U+1];(e>0||E!==0)&&(h.push(M,N,C),R+=3),(t>0||E!==r-1)&&(h.push(N,B,C),R+=3)}l.addGroup(m,R,0),m+=R}function b(w){const T=_,R=new it,L=new P;let U=0;const E=w===!0?e:t,M=w===!0?1:-1;for(let B=1;B<=s;B++)u.push(0,x*M,0),f.push(0,M,0),p.push(.5,.5),_++;const N=_;for(let B=0;B<=s;B++){const F=B/s*c+a,k=Math.cos(F),V=Math.sin(F);L.x=E*V,L.y=x*M,L.z=E*k,u.push(L.x,L.y,L.z),f.push(0,M,0),R.x=k*.5+.5,R.y=V*.5*M+.5,p.push(R.x,R.y),_++}for(let B=0;B<s;B++){const C=T+B,F=N+B;w===!0?h.push(F,F+1,C):h.push(F+1,F,C),U+=3}l.addGroup(m,U,w===!0?1:2),m+=U}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vn(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Xa extends Vn{constructor(e=1,t=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new Xa(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Wi extends pn{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,u=e/a,f=t/c,p=[],_=[],y=[],x=[];for(let m=0;m<h;m++){const S=m*f-o;for(let b=0;b<l;b++){const w=b*u-r;_.push(w,-S,0),y.push(0,0,1),x.push(b/a),x.push(1-m/c)}}for(let m=0;m<c;m++)for(let S=0;S<a;S++){const b=S+l*m,w=S+l*(m+1),T=S+1+l*(m+1),R=S+1+l*m;p.push(b,w,R),p.push(w,T,R)}this.setIndex(p),this.setAttribute("position",new kt(_,3)),this.setAttribute("normal",new kt(y,3)),this.setAttribute("uv",new kt(x,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wi(e.width,e.height,e.widthSegments,e.heightSegments)}}class ku extends pn{constructor(e=.5,t=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);const a=[],c=[],l=[],h=[];let u=e;const f=(t-e)/s,p=new P,_=new it;for(let y=0;y<=s;y++){for(let x=0;x<=n;x++){const m=r+x/n*o;p.x=u*Math.cos(m),p.y=u*Math.sin(m),c.push(p.x,p.y,p.z),l.push(0,0,1),_.x=(p.x/t+1)/2,_.y=(p.y/t+1)/2,h.push(_.x,_.y)}u+=f}for(let y=0;y<s;y++){const x=y*(n+1);for(let m=0;m<n;m++){const S=m+x,b=S,w=S+n+1,T=S+n+2,R=S+1;a.push(b,w,R),a.push(w,T,R)}}this.setIndex(a),this.setAttribute("position",new kt(c,3)),this.setAttribute("normal",new kt(l,3)),this.setAttribute("uv",new kt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ku(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class ds extends pn{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const h=[],u=new P,f=new P,p=[],_=[],y=[],x=[];for(let m=0;m<=n;m++){const S=[],b=m/n;let w=0;m===0&&o===0?w=.5/t:m===n&&c===Math.PI&&(w=-.5/t);for(let T=0;T<=t;T++){const R=T/t;u.x=-e*Math.cos(s+R*r)*Math.sin(o+b*a),u.y=e*Math.cos(o+b*a),u.z=e*Math.sin(s+R*r)*Math.sin(o+b*a),_.push(u.x,u.y,u.z),f.copy(u).normalize(),y.push(f.x,f.y,f.z),x.push(R+w,1-b),S.push(l++)}h.push(S)}for(let m=0;m<n;m++)for(let S=0;S<t;S++){const b=h[m][S+1],w=h[m][S],T=h[m+1][S],R=h[m+1][S+1];(m!==0||o>0)&&p.push(b,w,R),(m!==n-1||c<Math.PI)&&p.push(w,T,R)}this.setIndex(p),this.setAttribute("position",new kt(_,3)),this.setAttribute("normal",new kt(y,3)),this.setAttribute("uv",new kt(x,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ds(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Vu extends pn{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],c=[],l=[],h=new P,u=new P,f=new P;for(let p=0;p<=n;p++)for(let _=0;_<=s;_++){const y=_/s*r,x=p/n*Math.PI*2;u.x=(e+t*Math.cos(x))*Math.cos(y),u.y=(e+t*Math.cos(x))*Math.sin(y),u.z=t*Math.sin(x),a.push(u.x,u.y,u.z),h.x=e*Math.cos(y),h.y=e*Math.sin(y),f.subVectors(u,h).normalize(),c.push(f.x,f.y,f.z),l.push(_/s),l.push(p/n)}for(let p=1;p<=n;p++)for(let _=1;_<=s;_++){const y=(s+1)*p+_-1,x=(s+1)*(p-1)+_-1,m=(s+1)*(p-1)+_,S=(s+1)*p+_;o.push(y,x,S),o.push(x,m,S)}this.setIndex(o),this.setAttribute("position",new kt(a,3)),this.setAttribute("normal",new kt(c,3)),this.setAttribute("uv",new kt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vu(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Nt extends Us{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new xt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new xt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Vd,this.normalScale=new it(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ug extends Us{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=nm,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class hg extends Us{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Nh={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class fg{constructor(e,t,n){const s=this;let r=!1,o=0,a=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){const u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=l.length;u<f;u+=2){const p=l[u],_=l[u+1];if(p.global&&(p.lastIndex=0),p.test(h))return _}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const dg=new fg;class Hu{constructor(e){this.manager=e!==void 0?e:dg,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}Hu.DEFAULT_MATERIAL_NAME="__DEFAULT";const Ii={};class pg extends Error{constructor(e,t){super(e),this.response=t}}class mg extends Hu{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=Nh.get(`file:${e}`);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(Ii[e]!==void 0){Ii[e].push({onLoad:t,onProgress:n,onError:s});return}Ii[e]=[],Ii[e].push({onLoad:t,onProgress:n,onError:s});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&ot("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const h=Ii[e],u=l.body.getReader(),f=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),p=f?parseInt(f):0,_=p!==0;let y=0;const x=new ReadableStream({start(m){S();function S(){u.read().then(({done:b,value:w})=>{if(b)m.close();else{y+=w.byteLength;const T=new ProgressEvent("progress",{lengthComputable:_,loaded:y,total:p});for(let R=0,L=h.length;R<L;R++){const U=h[R];U.onProgress&&U.onProgress(T)}m.enqueue(w),S()}},b=>{m.error(b)})}}});return new Response(x)}else throw new pg(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return l.json();default:if(a==="")return l.text();{const u=/charset="?([^;"\s]*)"?/i.exec(a),f=u&&u[1]?u[1].toLowerCase():void 0,p=new TextDecoder(f);return l.arrayBuffer().then(_=>p.decode(_))}}}).then(l=>{Nh.add(`file:${e}`,l);const h=Ii[e];delete Ii[e];for(let u=0,f=h.length;u<f;u++){const p=h[u];p.onLoad&&p.onLoad(l)}}).catch(l=>{const h=Ii[e];if(h===void 0)throw this.manager.itemError(e),l;delete Ii[e];for(let u=0,f=h.length;u<f;u++){const p=h[u];p.onError&&p.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}class gg extends Hu{constructor(e){super(e)}load(e,t,n,s){const r=this,o=new Qd,a=new mg(this.manager);return a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setPath(this.path),a.setWithCredentials(r.withCredentials),a.load(e,function(c){let l;try{l=r.parse(c)}catch(h){if(s!==void 0)s(h);else{h(h);return}}l.image!==void 0?o.image=l.image:l.data!==void 0&&(o.image.width=l.width,o.image.height=l.height,o.image.data=l.data),o.wrapS=l.wrapS!==void 0?l.wrapS:hi,o.wrapT=l.wrapT!==void 0?l.wrapT:hi,o.magFilter=l.magFilter!==void 0?l.magFilter:xn,o.minFilter=l.minFilter!==void 0?l.minFilter:xn,o.anisotropy=l.anisotropy!==void 0?l.anisotropy:1,l.colorSpace!==void 0&&(o.colorSpace=l.colorSpace),l.flipY!==void 0&&(o.flipY=l.flipY),l.format!==void 0&&(o.format=l.format),l.type!==void 0&&(o.type=l.type),l.mipmaps!==void 0&&(o.mipmaps=l.mipmaps,o.minFilter=cs),l.mipmapCount===1&&(o.minFilter=xn),l.generateMipmaps!==void 0&&(o.generateMipmaps=l.generateMipmaps),o.needsUpdate=!0,t&&t(o,l)},n,s),o}}class sp extends Gt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new xt(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class xg extends sp{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Gt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new xt(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Ic=new Tt,Oh=new P,Fh=new P;class _g{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new it(512,512),this.mapType=bi,this.map=null,this.mapPass=null,this.matrix=new Tt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Fu,this._frameExtents=new it(1,1),this._viewportCount=1,this._viewports=[new jt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Oh.setFromMatrixPosition(e.matrixWorld),t.position.copy(Oh),Fh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Fh),t.updateMatrixWorld(),Ic.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ic,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ic)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class rp extends jd{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class yg extends _g{constructor(){super(new rp(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class vg extends sp{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Gt.DEFAULT_UP),this.updateMatrix(),this.target=new Gt,this.shadow=new yg}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Sg extends ti{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class bg{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}const Bh=new Tt;class wg{constructor(e,t,n=0,s=1/0){this.ray=new Ar(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new Nu,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Xt("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Bh.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Bh),this}intersectObject(e,t=!0,n=[]){return su(e,this,n,t),n.sort(zh),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)su(e[s],this,n,t);return n.sort(zh),n}}function zh(i,e){return i.distance-e.distance}function su(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let o=0,a=r.length;o<a;o++)su(r[o],e,t,!0)}}const kh=new P,Ko=new P,nr=new P,ir=new P,Dc=new P,Mg=new P,Eg=new P;class Mi{constructor(e=new P,t=new P){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){kh.subVectors(e,this.start),Ko.subVectors(this.end,this.start);const n=Ko.dot(Ko);let r=Ko.dot(kh)/n;return t&&(r=ht(r,0,1)),r}closestPointToPoint(e,t,n){const s=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(s).add(this.start)}distanceSqToLine3(e,t=Mg,n=Eg){const s=10000000000000001e-32;let r,o;const a=this.start,c=e.start,l=this.end,h=e.end;nr.subVectors(l,a),ir.subVectors(h,c),Dc.subVectors(a,c);const u=nr.dot(nr),f=ir.dot(ir),p=ir.dot(Dc);if(u<=s&&f<=s)return t.copy(a),n.copy(c),t.sub(n),t.dot(t);if(u<=s)r=0,o=p/f,o=ht(o,0,1);else{const _=nr.dot(Dc);if(f<=s)o=0,r=ht(-_/u,0,1);else{const y=nr.dot(ir),x=u*f-y*y;x!==0?r=ht((y*p-_*f)/x,0,1):r=0,o=(y*r+p)/f,o<0?(o=0,r=ht(-_/u,0,1)):o>1&&(o=1,r=ht((y-_)/u,0,1))}}return t.copy(a).add(nr.multiplyScalar(r)),n.copy(c).add(ir.multiplyScalar(o)),t.sub(n),t.dot(t)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}class op extends lg{constructor(e=10,t=10,n=4473924,s=8947848){n=new xt(n),s=new xt(s);const r=t/2,o=e/t,a=e/2,c=[],l=[];for(let f=0,p=0,_=-a;f<=t;f++,_+=o){c.push(-a,0,_,a,0,_),c.push(_,0,-a,_,0,a);const y=f===r?n:s;y.toArray(l,p),p+=3,y.toArray(l,p),p+=3,y.toArray(l,p),p+=3,y.toArray(l,p),p+=3}const h=new pn;h.setAttribute("position",new kt(c,3)),h.setAttribute("color",new kt(l,3));const u=new Bu({vertexColors:!0,toneMapped:!1});super(h,u),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}function Vh(i,e,t,n){const s=Tg(n);switch(t){case Bd:return i*e;case kd:return i*e/s.components*s.byteLength;case Cu:return i*e/s.components*s.byteLength;case Pu:return i*e*2/s.components*s.byteLength;case Iu:return i*e*2/s.components*s.byteLength;case zd:return i*e*3/s.components*s.byteLength;case fi:return i*e*4/s.components*s.byteLength;case Du:return i*e*4/s.components*s.byteLength;case Sa:case ba:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case wa:case Ma:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Pl:case Dl:return Math.max(i,16)*Math.max(e,8)/4;case Cl:case Il:return Math.max(i,8)*Math.max(e,8)/2;case Ll:case Ul:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Nl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ol:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Fl:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Bl:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case zl:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case kl:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Vl:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Hl:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Gl:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Wl:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Xl:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case ql:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case $l:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Yl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case jl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Kl:case Zl:case Jl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Ql:case eu:return Math.ceil(i/4)*Math.ceil(e/4)*8;case tu:case nu:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Tg(i){switch(i){case bi:case Ud:return{byteLength:1,components:1};case io:case Nd:case _i:return{byteLength:2,components:1};case Au:case Ru:return{byteLength:2,components:4};case Is:case Tu:case ii:return{byteLength:4,components:1};case Od:case Fd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ho}}));typeof window<"u"&&(window.__THREE__?ot("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ho);function ap(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Ag(i){const e=new WeakMap;function t(a,c){const l=a.array,h=a.usage,u=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,h),a.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){const h=c.array,u=c.updateRanges;if(i.bindBuffer(l,a),u.length===0)i.bufferSubData(l,0,h);else{u.sort((p,_)=>p.start-_.start);let f=0;for(let p=1;p<u.length;p++){const _=u[f],y=u[p];y.start<=_.start+_.count+1?_.count=Math.max(_.count,y.start+y.count-_.start):(++f,u[f]=y)}u.length=f+1;for(let p=0,_=u.length;p<_;p++){const y=u[p];i.bufferSubData(l,y.start*h.BYTES_PER_ELEMENT,h,y.start,y.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=e.get(a);c&&(i.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var Rg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Cg=`#ifdef USE_ALPHAHASH
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
#endif`,Pg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ig=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Dg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Lg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ug=`#ifdef USE_AOMAP
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
#endif`,Ng=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Og=`#ifdef USE_BATCHING
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
#endif`,Fg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Bg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,zg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,kg=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Vg=`#ifdef USE_IRIDESCENCE
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
#endif`,Hg=`#ifdef USE_BUMPMAP
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
#endif`,Gg=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Wg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Xg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,qg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,$g=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Yg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,jg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Kg=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Zg=`#define PI 3.141592653589793
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
} // validated`,Jg=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Qg=`vec3 transformedNormal = objectNormal;
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
#endif`,ex=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,tx=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,nx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ix=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,sx="gl_FragColor = linearToOutputTexel( gl_FragColor );",rx=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ox=`#ifdef USE_ENVMAP
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
#endif`,ax=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,cx=`#ifdef USE_ENVMAP
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
#endif`,lx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ux=`#ifdef USE_ENVMAP
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
#endif`,hx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,dx=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,px=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,mx=`#ifdef USE_GRADIENTMAP
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
}`,gx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,xx=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,_x=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,yx=`uniform bool receiveShadow;
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
#endif`,vx=`#ifdef USE_ENVMAP
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
#endif`,Sx=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,bx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,wx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Mx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Ex=`PhysicalMaterial material;
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
#endif`,Tx=`uniform sampler2D dfgLUT;
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
}`,Ax=`
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
#endif`,Rx=`#if defined( RE_IndirectDiffuse )
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
#endif`,Cx=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Px=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ix=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Dx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Lx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ux=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Nx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ox=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Fx=`#if defined( USE_POINTS_UV )
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
#endif`,Bx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,zx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,kx=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Vx=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Hx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Gx=`#ifdef USE_MORPHTARGETS
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
#endif`,Wx=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Xx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,qx=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,$x=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Yx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,jx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Kx=`#ifdef USE_NORMALMAP
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
#endif`,Zx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Jx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Qx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,e_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,t_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,n_=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,i_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,s_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,r_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,o_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,a_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,c_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,l_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,u_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,h_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,f_=`float getShadowMask() {
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
}`,d_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,p_=`#ifdef USE_SKINNING
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
#endif`,m_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,g_=`#ifdef USE_SKINNING
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
#endif`,x_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,__=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,y_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,v_=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,S_=`#ifdef USE_TRANSMISSION
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
#endif`,b_=`#ifdef USE_TRANSMISSION
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
#endif`,w_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,M_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,E_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,T_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const A_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,R_=`uniform sampler2D t2D;
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
}`,C_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,P_=`#ifdef ENVMAP_TYPE_CUBE
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
}`,I_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,D_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,L_=`#include <common>
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
}`,U_=`#if DEPTH_PACKING == 3200
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
}`,N_=`#define DISTANCE
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
}`,O_=`#define DISTANCE
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
}`,F_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,B_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,z_=`uniform float scale;
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
}`,k_=`uniform vec3 diffuse;
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
}`,V_=`#include <common>
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
}`,H_=`uniform vec3 diffuse;
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
}`,G_=`#define LAMBERT
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
}`,W_=`#define LAMBERT
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
}`,X_=`#define MATCAP
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
}`,q_=`#define MATCAP
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
}`,$_=`#define NORMAL
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
}`,Y_=`#define NORMAL
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
}`,j_=`#define PHONG
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
}`,K_=`#define PHONG
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
}`,Z_=`#define STANDARD
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
}`,J_=`#define STANDARD
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
}`,Q_=`#define TOON
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
}`,ey=`#define TOON
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
}`,ty=`uniform float size;
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
}`,ny=`uniform vec3 diffuse;
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
}`,iy=`#include <common>
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
}`,sy=`uniform vec3 color;
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
}`,ry=`uniform float rotation;
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
}`,oy=`uniform vec3 diffuse;
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
}`,pt={alphahash_fragment:Rg,alphahash_pars_fragment:Cg,alphamap_fragment:Pg,alphamap_pars_fragment:Ig,alphatest_fragment:Dg,alphatest_pars_fragment:Lg,aomap_fragment:Ug,aomap_pars_fragment:Ng,batching_pars_vertex:Og,batching_vertex:Fg,begin_vertex:Bg,beginnormal_vertex:zg,bsdfs:kg,iridescence_fragment:Vg,bumpmap_pars_fragment:Hg,clipping_planes_fragment:Gg,clipping_planes_pars_fragment:Wg,clipping_planes_pars_vertex:Xg,clipping_planes_vertex:qg,color_fragment:$g,color_pars_fragment:Yg,color_pars_vertex:jg,color_vertex:Kg,common:Zg,cube_uv_reflection_fragment:Jg,defaultnormal_vertex:Qg,displacementmap_pars_vertex:ex,displacementmap_vertex:tx,emissivemap_fragment:nx,emissivemap_pars_fragment:ix,colorspace_fragment:sx,colorspace_pars_fragment:rx,envmap_fragment:ox,envmap_common_pars_fragment:ax,envmap_pars_fragment:cx,envmap_pars_vertex:lx,envmap_physical_pars_fragment:vx,envmap_vertex:ux,fog_vertex:hx,fog_pars_vertex:fx,fog_fragment:dx,fog_pars_fragment:px,gradientmap_pars_fragment:mx,lightmap_pars_fragment:gx,lights_lambert_fragment:xx,lights_lambert_pars_fragment:_x,lights_pars_begin:yx,lights_toon_fragment:Sx,lights_toon_pars_fragment:bx,lights_phong_fragment:wx,lights_phong_pars_fragment:Mx,lights_physical_fragment:Ex,lights_physical_pars_fragment:Tx,lights_fragment_begin:Ax,lights_fragment_maps:Rx,lights_fragment_end:Cx,logdepthbuf_fragment:Px,logdepthbuf_pars_fragment:Ix,logdepthbuf_pars_vertex:Dx,logdepthbuf_vertex:Lx,map_fragment:Ux,map_pars_fragment:Nx,map_particle_fragment:Ox,map_particle_pars_fragment:Fx,metalnessmap_fragment:Bx,metalnessmap_pars_fragment:zx,morphinstance_vertex:kx,morphcolor_vertex:Vx,morphnormal_vertex:Hx,morphtarget_pars_vertex:Gx,morphtarget_vertex:Wx,normal_fragment_begin:Xx,normal_fragment_maps:qx,normal_pars_fragment:$x,normal_pars_vertex:Yx,normal_vertex:jx,normalmap_pars_fragment:Kx,clearcoat_normal_fragment_begin:Zx,clearcoat_normal_fragment_maps:Jx,clearcoat_pars_fragment:Qx,iridescence_pars_fragment:e_,opaque_fragment:t_,packing:n_,premultiplied_alpha_fragment:i_,project_vertex:s_,dithering_fragment:r_,dithering_pars_fragment:o_,roughnessmap_fragment:a_,roughnessmap_pars_fragment:c_,shadowmap_pars_fragment:l_,shadowmap_pars_vertex:u_,shadowmap_vertex:h_,shadowmask_pars_fragment:f_,skinbase_vertex:d_,skinning_pars_vertex:p_,skinning_vertex:m_,skinnormal_vertex:g_,specularmap_fragment:x_,specularmap_pars_fragment:__,tonemapping_fragment:y_,tonemapping_pars_fragment:v_,transmission_fragment:S_,transmission_pars_fragment:b_,uv_pars_fragment:w_,uv_pars_vertex:M_,uv_vertex:E_,worldpos_vertex:T_,background_vert:A_,background_frag:R_,backgroundCube_vert:C_,backgroundCube_frag:P_,cube_vert:I_,cube_frag:D_,depth_vert:L_,depth_frag:U_,distanceRGBA_vert:N_,distanceRGBA_frag:O_,equirect_vert:F_,equirect_frag:B_,linedashed_vert:z_,linedashed_frag:k_,meshbasic_vert:V_,meshbasic_frag:H_,meshlambert_vert:G_,meshlambert_frag:W_,meshmatcap_vert:X_,meshmatcap_frag:q_,meshnormal_vert:$_,meshnormal_frag:Y_,meshphong_vert:j_,meshphong_frag:K_,meshphysical_vert:Z_,meshphysical_frag:J_,meshtoon_vert:Q_,meshtoon_frag:ey,points_vert:ty,points_frag:ny,shadow_vert:iy,shadow_frag:sy,sprite_vert:ry,sprite_frag:oy},Ie={common:{diffuse:{value:new xt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new dt},alphaMap:{value:null},alphaMapTransform:{value:new dt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new dt}},envmap:{envMap:{value:null},envMapRotation:{value:new dt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new dt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new dt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new dt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new dt},normalScale:{value:new it(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new dt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new dt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new dt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new dt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new xt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new xt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new dt},alphaTest:{value:0},uvTransform:{value:new dt}},sprite:{diffuse:{value:new xt(16777215)},opacity:{value:1},center:{value:new it(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new dt},alphaMap:{value:null},alphaMapTransform:{value:new dt},alphaTest:{value:0}}},gi={basic:{uniforms:In([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.fog]),vertexShader:pt.meshbasic_vert,fragmentShader:pt.meshbasic_frag},lambert:{uniforms:In([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,Ie.lights,{emissive:{value:new xt(0)}}]),vertexShader:pt.meshlambert_vert,fragmentShader:pt.meshlambert_frag},phong:{uniforms:In([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,Ie.lights,{emissive:{value:new xt(0)},specular:{value:new xt(1118481)},shininess:{value:30}}]),vertexShader:pt.meshphong_vert,fragmentShader:pt.meshphong_frag},standard:{uniforms:In([Ie.common,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.roughnessmap,Ie.metalnessmap,Ie.fog,Ie.lights,{emissive:{value:new xt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:pt.meshphysical_vert,fragmentShader:pt.meshphysical_frag},toon:{uniforms:In([Ie.common,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.gradientmap,Ie.fog,Ie.lights,{emissive:{value:new xt(0)}}]),vertexShader:pt.meshtoon_vert,fragmentShader:pt.meshtoon_frag},matcap:{uniforms:In([Ie.common,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,{matcap:{value:null}}]),vertexShader:pt.meshmatcap_vert,fragmentShader:pt.meshmatcap_frag},points:{uniforms:In([Ie.points,Ie.fog]),vertexShader:pt.points_vert,fragmentShader:pt.points_frag},dashed:{uniforms:In([Ie.common,Ie.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:pt.linedashed_vert,fragmentShader:pt.linedashed_frag},depth:{uniforms:In([Ie.common,Ie.displacementmap]),vertexShader:pt.depth_vert,fragmentShader:pt.depth_frag},normal:{uniforms:In([Ie.common,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,{opacity:{value:1}}]),vertexShader:pt.meshnormal_vert,fragmentShader:pt.meshnormal_frag},sprite:{uniforms:In([Ie.sprite,Ie.fog]),vertexShader:pt.sprite_vert,fragmentShader:pt.sprite_frag},background:{uniforms:{uvTransform:{value:new dt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:pt.background_vert,fragmentShader:pt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new dt}},vertexShader:pt.backgroundCube_vert,fragmentShader:pt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:pt.cube_vert,fragmentShader:pt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:pt.equirect_vert,fragmentShader:pt.equirect_frag},distanceRGBA:{uniforms:In([Ie.common,Ie.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:pt.distanceRGBA_vert,fragmentShader:pt.distanceRGBA_frag},shadow:{uniforms:In([Ie.lights,Ie.fog,{color:{value:new xt(0)},opacity:{value:1}}]),vertexShader:pt.shadow_vert,fragmentShader:pt.shadow_frag}};gi.physical={uniforms:In([gi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new dt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new dt},clearcoatNormalScale:{value:new it(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new dt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new dt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new dt},sheen:{value:0},sheenColor:{value:new xt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new dt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new dt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new dt},transmissionSamplerSize:{value:new it},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new dt},attenuationDistance:{value:0},attenuationColor:{value:new xt(0)},specularColor:{value:new xt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new dt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new dt},anisotropyVector:{value:new it},anisotropyMap:{value:null},anisotropyMapTransform:{value:new dt}}]),vertexShader:pt.meshphysical_vert,fragmentShader:pt.meshphysical_frag};const Zo={r:0,b:0,g:0},ws=new wi,ay=new Tt;function cy(i,e,t,n,s,r,o){const a=new xt(0);let c=r===!0?0:1,l,h,u=null,f=0,p=null;function _(b){let w=b.isScene===!0?b.background:null;return w&&w.isTexture&&(w=(b.backgroundBlurriness>0?t:e).get(w)),w}function y(b){let w=!1;const T=_(b);T===null?m(a,c):T&&T.isColor&&(m(T,1),w=!0);const R=i.xr.getEnvironmentBlendMode();R==="additive"?n.buffers.color.setClear(0,0,0,1,o):R==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||w)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function x(b,w){const T=_(w);T&&(T.isCubeTexture||T.mapping===Ga)?(h===void 0&&(h=new It(new wt(1,1,1),new Gi({name:"BackgroundCubeMaterial",uniforms:Mr(gi.backgroundCube.uniforms),vertexShader:gi.backgroundCube.vertexShader,fragmentShader:gi.backgroundCube.fragmentShader,side:Ln,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(R,L,U){this.matrixWorld.copyPosition(U.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),ws.copy(w.backgroundRotation),ws.x*=-1,ws.y*=-1,ws.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(ws.y*=-1,ws.z*=-1),h.material.uniforms.envMap.value=T,h.material.uniforms.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(ay.makeRotationFromEuler(ws)),h.material.toneMapped=Et.getTransfer(T.colorSpace)!==Ft,(u!==T||f!==T.version||p!==i.toneMapping)&&(h.material.needsUpdate=!0,u=T,f=T.version,p=i.toneMapping),h.layers.enableAll(),b.unshift(h,h.geometry,h.material,0,0,null)):T&&T.isTexture&&(l===void 0&&(l=new It(new Wi(2,2),new Gi({name:"BackgroundMaterial",uniforms:Mr(gi.background.uniforms),vertexShader:gi.background.vertexShader,fragmentShader:gi.background.fragmentShader,side:Si,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=T,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.toneMapped=Et.getTransfer(T.colorSpace)!==Ft,T.matrixAutoUpdate===!0&&T.updateMatrix(),l.material.uniforms.uvTransform.value.copy(T.matrix),(u!==T||f!==T.version||p!==i.toneMapping)&&(l.material.needsUpdate=!0,u=T,f=T.version,p=i.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null))}function m(b,w){b.getRGB(Zo,Yd(i)),n.buffers.color.setClear(Zo.r,Zo.g,Zo.b,w,o)}function S(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(b,w=1){a.set(b),c=w,m(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(b){c=b,m(a,c)},render:y,addToRenderList:x,dispose:S}}function ly(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let r=s,o=!1;function a(M,N,B,C,F){let k=!1;const V=u(C,B,N);r!==V&&(r=V,l(r.object)),k=p(M,C,B,F),k&&_(M,C,B,F),F!==null&&e.update(F,i.ELEMENT_ARRAY_BUFFER),(k||o)&&(o=!1,w(M,N,B,C),F!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(F).buffer))}function c(){return i.createVertexArray()}function l(M){return i.bindVertexArray(M)}function h(M){return i.deleteVertexArray(M)}function u(M,N,B){const C=B.wireframe===!0;let F=n[M.id];F===void 0&&(F={},n[M.id]=F);let k=F[N.id];k===void 0&&(k={},F[N.id]=k);let V=k[C];return V===void 0&&(V=f(c()),k[C]=V),V}function f(M){const N=[],B=[],C=[];for(let F=0;F<t;F++)N[F]=0,B[F]=0,C[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:B,attributeDivisors:C,object:M,attributes:{},index:null}}function p(M,N,B,C){const F=r.attributes,k=N.attributes;let V=0;const q=B.getAttributes();for(const $ in q)if(q[$].location>=0){const Q=F[$];let xe=k[$];if(xe===void 0&&($==="instanceMatrix"&&M.instanceMatrix&&(xe=M.instanceMatrix),$==="instanceColor"&&M.instanceColor&&(xe=M.instanceColor)),Q===void 0||Q.attribute!==xe||xe&&Q.data!==xe.data)return!0;V++}return r.attributesNum!==V||r.index!==C}function _(M,N,B,C){const F={},k=N.attributes;let V=0;const q=B.getAttributes();for(const $ in q)if(q[$].location>=0){let Q=k[$];Q===void 0&&($==="instanceMatrix"&&M.instanceMatrix&&(Q=M.instanceMatrix),$==="instanceColor"&&M.instanceColor&&(Q=M.instanceColor));const xe={};xe.attribute=Q,Q&&Q.data&&(xe.data=Q.data),F[$]=xe,V++}r.attributes=F,r.attributesNum=V,r.index=C}function y(){const M=r.newAttributes;for(let N=0,B=M.length;N<B;N++)M[N]=0}function x(M){m(M,0)}function m(M,N){const B=r.newAttributes,C=r.enabledAttributes,F=r.attributeDivisors;B[M]=1,C[M]===0&&(i.enableVertexAttribArray(M),C[M]=1),F[M]!==N&&(i.vertexAttribDivisor(M,N),F[M]=N)}function S(){const M=r.newAttributes,N=r.enabledAttributes;for(let B=0,C=N.length;B<C;B++)N[B]!==M[B]&&(i.disableVertexAttribArray(B),N[B]=0)}function b(M,N,B,C,F,k,V){V===!0?i.vertexAttribIPointer(M,N,B,F,k):i.vertexAttribPointer(M,N,B,C,F,k)}function w(M,N,B,C){y();const F=C.attributes,k=B.getAttributes(),V=N.defaultAttributeValues;for(const q in k){const $=k[q];if($.location>=0){let ae=F[q];if(ae===void 0&&(q==="instanceMatrix"&&M.instanceMatrix&&(ae=M.instanceMatrix),q==="instanceColor"&&M.instanceColor&&(ae=M.instanceColor)),ae!==void 0){const Q=ae.normalized,xe=ae.itemSize,be=e.get(ae);if(be===void 0)continue;const He=be.buffer,Je=be.type,ct=be.bytesPerElement,fe=Je===i.INT||Je===i.UNSIGNED_INT||ae.gpuType===Tu;if(ae.isInterleavedBufferAttribute){const pe=ae.data,Ae=pe.stride,je=ae.offset;if(pe.isInstancedInterleavedBuffer){for(let Be=0;Be<$.locationSize;Be++)m($.location+Be,pe.meshPerAttribute);M.isInstancedMesh!==!0&&C._maxInstanceCount===void 0&&(C._maxInstanceCount=pe.meshPerAttribute*pe.count)}else for(let Be=0;Be<$.locationSize;Be++)x($.location+Be);i.bindBuffer(i.ARRAY_BUFFER,He);for(let Be=0;Be<$.locationSize;Be++)b($.location+Be,xe/$.locationSize,Je,Q,Ae*ct,(je+xe/$.locationSize*Be)*ct,fe)}else{if(ae.isInstancedBufferAttribute){for(let pe=0;pe<$.locationSize;pe++)m($.location+pe,ae.meshPerAttribute);M.isInstancedMesh!==!0&&C._maxInstanceCount===void 0&&(C._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let pe=0;pe<$.locationSize;pe++)x($.location+pe);i.bindBuffer(i.ARRAY_BUFFER,He);for(let pe=0;pe<$.locationSize;pe++)b($.location+pe,xe/$.locationSize,Je,Q,xe*ct,xe/$.locationSize*pe*ct,fe)}}else if(V!==void 0){const Q=V[q];if(Q!==void 0)switch(Q.length){case 2:i.vertexAttrib2fv($.location,Q);break;case 3:i.vertexAttrib3fv($.location,Q);break;case 4:i.vertexAttrib4fv($.location,Q);break;default:i.vertexAttrib1fv($.location,Q)}}}}S()}function T(){U();for(const M in n){const N=n[M];for(const B in N){const C=N[B];for(const F in C)h(C[F].object),delete C[F];delete N[B]}delete n[M]}}function R(M){if(n[M.id]===void 0)return;const N=n[M.id];for(const B in N){const C=N[B];for(const F in C)h(C[F].object),delete C[F];delete N[B]}delete n[M.id]}function L(M){for(const N in n){const B=n[N];if(B[M.id]===void 0)continue;const C=B[M.id];for(const F in C)h(C[F].object),delete C[F];delete B[M.id]}}function U(){E(),o=!0,r!==s&&(r=s,l(r.object))}function E(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:U,resetDefaultState:E,dispose:T,releaseStatesOfGeometry:R,releaseStatesOfProgram:L,initAttributes:y,enableAttribute:x,disableUnusedAttributes:S}}function uy(i,e,t){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),t.update(h,n,1)}function o(l,h,u){u!==0&&(i.drawArraysInstanced(n,l,h,u),t.update(h,n,u))}function a(l,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let p=0;for(let _=0;_<u;_++)p+=h[_];t.update(p,n,1)}function c(l,h,u,f){if(u===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let _=0;_<l.length;_++)o(l[_],h[_],f[_]);else{p.multiDrawArraysInstancedWEBGL(n,l,0,h,0,f,0,u);let _=0;for(let y=0;y<u;y++)_+=h[y]*f[y];t.update(_,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function hy(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const L=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(L){return!(L!==fi&&n.convert(L)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(L){const U=L===_i&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(L!==bi&&n.convert(L)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&L!==ii&&!U)}function c(L){if(L==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const h=c(l);h!==l&&(ot("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=i.getParameter(i.MAX_TEXTURE_SIZE),x=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),S=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),b=i.getParameter(i.MAX_VARYING_VECTORS),w=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=_>0,R=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:_,maxTextureSize:y,maxCubemapSize:x,maxAttributes:m,maxVertexUniforms:S,maxVaryings:b,maxFragmentUniforms:w,vertexTextures:T,maxSamples:R}}function fy(i){const e=this;let t=null,n=0,s=!1,r=!1;const o=new Oi,a=new dt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const p=u.length!==0||f||n!==0||s;return s=f,n=u.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){t=h(u,f,0)},this.setState=function(u,f,p){const _=u.clippingPlanes,y=u.clipIntersection,x=u.clipShadows,m=i.get(u);if(!s||_===null||_.length===0||r&&!x)r?h(null):l();else{const S=r?0:n,b=S*4;let w=m.clippingState||null;c.value=w,w=h(_,f,b,p);for(let T=0;T!==b;++T)w[T]=t[T];m.clippingState=w,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=S}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,f,p,_){const y=u!==null?u.length:0;let x=null;if(y!==0){if(x=c.value,_!==!0||x===null){const m=p+y*4,S=f.matrixWorldInverse;a.getNormalMatrix(S),(x===null||x.length<m)&&(x=new Float32Array(m));for(let b=0,w=p;b!==y;++b,w+=4)o.copy(u[b]).applyMatrix4(S,a),o.normal.toArray(x,w),x[w+3]=o.constant}c.value=x,c.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,x}}function dy(i){let e=new WeakMap;function t(o,a){return a===Ca?o.mapping=br:a===Tl&&(o.mapping=wr),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Ca||a===Tl)if(e.has(o)){const c=e.get(o).texture;return t(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new tg(c.height);return l.fromEquirectangularTexture(i,o),e.set(o,l),o.addEventListener("dispose",s),t(l.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}const ls=4,Hh=[.125,.215,.35,.446,.526,.582],Ps=20,py=256,Vr=new rp,Gh=new xt;let Lc=null,Uc=0,Nc=0,Oc=!1;const my=new P;class ru{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){const{size:o=256,position:a=my}=r;Lc=this._renderer.getRenderTarget(),Uc=this._renderer.getActiveCubeFace(),Nc=this._renderer.getActiveMipmapLevel(),Oc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,s,c,a),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=qh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Xh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Lc,Uc,Nc),this._renderer.xr.enabled=Oc,e.scissorTest=!1,sr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===br||e.mapping===wr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Lc=this._renderer.getRenderTarget(),Uc=this._renderer.getActiveCubeFace(),Nc=this._renderer.getActiveMipmapLevel(),Oc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:xn,minFilter:xn,generateMipmaps:!1,type:_i,format:fi,colorSpace:Ds,depthBuffer:!1},s=Wh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Wh(e,t,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=gy(r)),this._blurMaterial=_y(r,e,t),this._ggxMaterial=xy(r,e,t)}return s}_compileMaterial(e){const t=new It(new pn,e);this._renderer.compile(t,Vr)}_sceneToCubeUV(e,t,n,s,r){const c=new ti(90,1,t,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,p=u.toneMapping;u.getClearColor(Gh),u.toneMapping=fs,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new It(new wt,new xs({name:"PMREM.Background",side:Ln,depthWrite:!1,depthTest:!1})));const y=this._backgroundBox,x=y.material;let m=!1;const S=e.background;S?S.isColor&&(x.color.copy(S),e.background=null,m=!0):(x.color.copy(Gh),m=!0);for(let b=0;b<6;b++){const w=b%3;w===0?(c.up.set(0,l[b],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[b],r.y,r.z)):w===1?(c.up.set(0,0,l[b]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[b],r.z)):(c.up.set(0,l[b],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[b]));const T=this._cubeSize;sr(s,w*T,b>2?T:0,T,T),u.setRenderTarget(s),m&&u.render(y,c),u.render(e,c)}u.toneMapping=p,u.autoClear=f,e.background=S}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===br||e.mapping===wr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=qh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Xh());const r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;const a=r.uniforms;a.envMap.value=e;const c=this._cubeSize;sr(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,Vr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){const s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[n];a.material=o;const c=o.uniforms,l=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),u=Math.sqrt(l*l-h*h),f=.05+l*.95,p=u*f,{_lodMax:_}=this,y=this._sizeLods[n],x=3*y*(n>_-ls?n-_+ls:0),m=4*(this._cubeSize-y);c.envMap.value=e.texture,c.roughness.value=p,c.mipInt.value=_-t,sr(r,x,m,3*y,2*y),s.setRenderTarget(r),s.render(a,Vr),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=_-n,sr(e,x,m,3*y,2*y),s.setRenderTarget(e),s.render(a,Vr)}_blur(e,t,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&Xt("blur direction must be either latitudinal or longitudinal!");const h=3,u=this._lodMeshes[s];u.material=l;const f=l.uniforms,p=this._sizeLods[n]-1,_=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Ps-1),y=r/_,x=isFinite(r)?1+Math.floor(h*y):Ps;x>Ps&&ot(`sigmaRadians, ${r}, is too large and will clip, as it requested ${x} samples when the maximum is set to ${Ps}`);const m=[];let S=0;for(let L=0;L<Ps;++L){const U=L/y,E=Math.exp(-U*U/2);m.push(E),L===0?S+=E:L<x&&(S+=2*E)}for(let L=0;L<m.length;L++)m[L]=m[L]/S;f.envMap.value=e.texture,f.samples.value=x,f.weights.value=m,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:b}=this;f.dTheta.value=_,f.mipInt.value=b-n;const w=this._sizeLods[s],T=3*w*(s>b-ls?s-b+ls:0),R=4*(this._cubeSize-w);sr(t,T,R,3*w,2*w),c.setRenderTarget(t),c.render(u,Vr)}}function gy(i){const e=[],t=[],n=[];let s=i;const r=i-ls+1+Hh.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let c=1/a;o>i-ls?c=Hh[o-i+ls-1]:o===0&&(c=0),t.push(c);const l=1/(a-2),h=-l,u=1+l,f=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,_=6,y=3,x=2,m=1,S=new Float32Array(y*_*p),b=new Float32Array(x*_*p),w=new Float32Array(m*_*p);for(let R=0;R<p;R++){const L=R%3*2/3-1,U=R>2?0:-1,E=[L,U,0,L+2/3,U,0,L+2/3,U+1,0,L,U,0,L+2/3,U+1,0,L,U+1,0];S.set(E,y*_*R),b.set(f,x*_*R);const M=[R,R,R,R,R,R];w.set(M,m*_*R)}const T=new pn;T.setAttribute("position",new Hn(S,y)),T.setAttribute("uv",new Hn(b,x)),T.setAttribute("faceIndex",new Hn(w,m)),n.push(new It(T,null)),s>ls&&s--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function Wh(i,e,t){const n=new Ls(i,e,t);return n.texture.mapping=Ga,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function sr(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function xy(i,e,t){return new Gi({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:py,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:qa(),fragmentShader:`

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
		`,blending:zi,depthTest:!1,depthWrite:!1})}function _y(i,e,t){const n=new Float32Array(Ps),s=new P(0,1,0);return new Gi({name:"SphericalGaussianBlur",defines:{n:Ps,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:qa(),fragmentShader:`

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
		`,blending:zi,depthTest:!1,depthWrite:!1})}function Xh(){return new Gi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:qa(),fragmentShader:`

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
		`,blending:zi,depthTest:!1,depthWrite:!1})}function qh(){return new Gi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:qa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:zi,depthTest:!1,depthWrite:!1})}function qa(){return`

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
	`}function yy(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===Ca||c===Tl,h=c===br||c===wr;if(l||h){let u=e.get(a);const f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new ru(i)),u=l?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{const p=a.image;return l&&p&&p.height>0||h&&p&&s(p)?(t===null&&(t=new ru(i)),u=l?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function vy(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&ao("WebGLRenderer: "+n+" extension not supported."),s}}}function Sy(i,e,t,n){const s={},r=new WeakMap;function o(u){const f=u.target;f.index!==null&&e.remove(f.index);for(const _ in f.attributes)e.remove(f.attributes[_]);f.removeEventListener("dispose",o),delete s[f.id];const p=r.get(f);p&&(e.remove(p),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(u,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,t.memory.geometries++),f}function c(u){const f=u.attributes;for(const p in f)e.update(f[p],i.ARRAY_BUFFER)}function l(u){const f=[],p=u.index,_=u.attributes.position;let y=0;if(p!==null){const S=p.array;y=p.version;for(let b=0,w=S.length;b<w;b+=3){const T=S[b+0],R=S[b+1],L=S[b+2];f.push(T,R,R,L,L,T)}}else if(_!==void 0){const S=_.array;y=_.version;for(let b=0,w=S.length/3-1;b<w;b+=3){const T=b+0,R=b+1,L=b+2;f.push(T,R,R,L,L,T)}}else return;const x=new(Gd(f)?$d:qd)(f,1);x.version=y;const m=r.get(u);m&&e.remove(m),r.set(u,x)}function h(u){const f=r.get(u);if(f){const p=u.index;p!==null&&f.version<p.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function by(i,e,t){let n;function s(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function c(f,p){i.drawElements(n,p,r,f*o),t.update(p,n,1)}function l(f,p,_){_!==0&&(i.drawElementsInstanced(n,p,r,f*o,_),t.update(p,n,_))}function h(f,p,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,f,0,_);let x=0;for(let m=0;m<_;m++)x+=p[m];t.update(x,n,1)}function u(f,p,_,y){if(_===0)return;const x=e.get("WEBGL_multi_draw");if(x===null)for(let m=0;m<f.length;m++)l(f[m]/o,p[m],y[m]);else{x.multiDrawElementsInstancedWEBGL(n,p,0,r,f,0,y,0,_);let m=0;for(let S=0;S<_;S++)m+=p[S]*y[S];t.update(m,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function wy(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:Xt("WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function My(i,e,t){const n=new WeakMap,s=new jt;function r(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let f=n.get(a);if(f===void 0||f.count!==u){let M=function(){U.dispose(),n.delete(a),a.removeEventListener("dispose",M)};var p=M;f!==void 0&&f.texture.dispose();const _=a.morphAttributes.position!==void 0,y=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],S=a.morphAttributes.normal||[],b=a.morphAttributes.color||[];let w=0;_===!0&&(w=1),y===!0&&(w=2),x===!0&&(w=3);let T=a.attributes.position.count*w,R=1;T>e.maxTextureSize&&(R=Math.ceil(T/e.maxTextureSize),T=e.maxTextureSize);const L=new Float32Array(T*R*4*u),U=new Wd(L,T,R,u);U.type=ii,U.needsUpdate=!0;const E=w*4;for(let N=0;N<u;N++){const B=m[N],C=S[N],F=b[N],k=T*R*4*N;for(let V=0;V<B.count;V++){const q=V*E;_===!0&&(s.fromBufferAttribute(B,V),L[k+q+0]=s.x,L[k+q+1]=s.y,L[k+q+2]=s.z,L[k+q+3]=0),y===!0&&(s.fromBufferAttribute(C,V),L[k+q+4]=s.x,L[k+q+5]=s.y,L[k+q+6]=s.z,L[k+q+7]=0),x===!0&&(s.fromBufferAttribute(F,V),L[k+q+8]=s.x,L[k+q+9]=s.y,L[k+q+10]=s.z,L[k+q+11]=F.itemSize===4?s.w:1)}}f={count:u,texture:U,size:new it(T,R)},n.set(a,f),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let _=0;for(let x=0;x<l.length;x++)_+=l[x];const y=a.morphTargetsRelative?1:1-_;c.getUniforms().setValue(i,"morphTargetBaseInfluence",y),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function Ey(i,e,t,n){let s=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,u=e.get(c,h);if(s.get(u)!==l&&(e.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;s.get(f)!==l&&(f.update(),s.set(f,l))}return u}function o(){s=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:o}}const cp=new Mn,$h=new np(1,1),lp=new Wd,up=new Nm,hp=new Kd,Yh=[],jh=[],Kh=new Float32Array(16),Zh=new Float32Array(9),Jh=new Float32Array(4);function Rr(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Yh[s];if(r===void 0&&(r=new Float32Array(s),Yh[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function on(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function an(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function $a(i,e){let t=jh[e];t===void 0&&(t=new Int32Array(e),jh[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Ty(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Ay(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(on(t,e))return;i.uniform2fv(this.addr,e),an(t,e)}}function Ry(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(on(t,e))return;i.uniform3fv(this.addr,e),an(t,e)}}function Cy(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(on(t,e))return;i.uniform4fv(this.addr,e),an(t,e)}}function Py(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(on(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),an(t,e)}else{if(on(t,n))return;Jh.set(n),i.uniformMatrix2fv(this.addr,!1,Jh),an(t,n)}}function Iy(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(on(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),an(t,e)}else{if(on(t,n))return;Zh.set(n),i.uniformMatrix3fv(this.addr,!1,Zh),an(t,n)}}function Dy(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(on(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),an(t,e)}else{if(on(t,n))return;Kh.set(n),i.uniformMatrix4fv(this.addr,!1,Kh),an(t,n)}}function Ly(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Uy(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(on(t,e))return;i.uniform2iv(this.addr,e),an(t,e)}}function Ny(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(on(t,e))return;i.uniform3iv(this.addr,e),an(t,e)}}function Oy(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(on(t,e))return;i.uniform4iv(this.addr,e),an(t,e)}}function Fy(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function By(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(on(t,e))return;i.uniform2uiv(this.addr,e),an(t,e)}}function zy(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(on(t,e))return;i.uniform3uiv(this.addr,e),an(t,e)}}function ky(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(on(t,e))return;i.uniform4uiv(this.addr,e),an(t,e)}}function Vy(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?($h.compareFunction=Hd,r=$h):r=cp,t.setTexture2D(e||r,s)}function Hy(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||up,s)}function Gy(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||hp,s)}function Wy(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||lp,s)}function Xy(i){switch(i){case 5126:return Ty;case 35664:return Ay;case 35665:return Ry;case 35666:return Cy;case 35674:return Py;case 35675:return Iy;case 35676:return Dy;case 5124:case 35670:return Ly;case 35667:case 35671:return Uy;case 35668:case 35672:return Ny;case 35669:case 35673:return Oy;case 5125:return Fy;case 36294:return By;case 36295:return zy;case 36296:return ky;case 35678:case 36198:case 36298:case 36306:case 35682:return Vy;case 35679:case 36299:case 36307:return Hy;case 35680:case 36300:case 36308:case 36293:return Gy;case 36289:case 36303:case 36311:case 36292:return Wy}}function qy(i,e){i.uniform1fv(this.addr,e)}function $y(i,e){const t=Rr(e,this.size,2);i.uniform2fv(this.addr,t)}function Yy(i,e){const t=Rr(e,this.size,3);i.uniform3fv(this.addr,t)}function jy(i,e){const t=Rr(e,this.size,4);i.uniform4fv(this.addr,t)}function Ky(i,e){const t=Rr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Zy(i,e){const t=Rr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Jy(i,e){const t=Rr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Qy(i,e){i.uniform1iv(this.addr,e)}function ev(i,e){i.uniform2iv(this.addr,e)}function tv(i,e){i.uniform3iv(this.addr,e)}function nv(i,e){i.uniform4iv(this.addr,e)}function iv(i,e){i.uniform1uiv(this.addr,e)}function sv(i,e){i.uniform2uiv(this.addr,e)}function rv(i,e){i.uniform3uiv(this.addr,e)}function ov(i,e){i.uniform4uiv(this.addr,e)}function av(i,e,t){const n=this.cache,s=e.length,r=$a(t,s);on(n,r)||(i.uniform1iv(this.addr,r),an(n,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||cp,r[o])}function cv(i,e,t){const n=this.cache,s=e.length,r=$a(t,s);on(n,r)||(i.uniform1iv(this.addr,r),an(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||up,r[o])}function lv(i,e,t){const n=this.cache,s=e.length,r=$a(t,s);on(n,r)||(i.uniform1iv(this.addr,r),an(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||hp,r[o])}function uv(i,e,t){const n=this.cache,s=e.length,r=$a(t,s);on(n,r)||(i.uniform1iv(this.addr,r),an(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||lp,r[o])}function hv(i){switch(i){case 5126:return qy;case 35664:return $y;case 35665:return Yy;case 35666:return jy;case 35674:return Ky;case 35675:return Zy;case 35676:return Jy;case 5124:case 35670:return Qy;case 35667:case 35671:return ev;case 35668:case 35672:return tv;case 35669:case 35673:return nv;case 5125:return iv;case 36294:return sv;case 36295:return rv;case 36296:return ov;case 35678:case 36198:case 36298:case 36306:case 35682:return av;case 35679:case 36299:case 36307:return cv;case 35680:case 36300:case 36308:case 36293:return lv;case 36289:case 36303:case 36311:case 36292:return uv}}class fv{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Xy(t.type)}}class dv{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=hv(t.type)}}class pv{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],n)}}}const Fc=/(\w+)(\])?(\[|\.)?/g;function Qh(i,e){i.seq.push(e),i.map[e.id]=e}function mv(i,e,t){const n=i.name,s=n.length;for(Fc.lastIndex=0;;){const r=Fc.exec(n),o=Fc.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Qh(t,l===void 0?new fv(a,i,e):new dv(a,i,e));break}else{let u=t.map[a];u===void 0&&(u=new pv(a),Qh(t,u)),t=u}}}class Ea{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);mv(r,o,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&n.push(o)}return n}}function ef(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const gv=37297;let xv=0;function _v(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const tf=new dt;function yv(i){Et._getMatrix(tf,Et.workingColorSpace,i);const e=`mat3( ${tf.elements.map(t=>t.toFixed(4))} )`;switch(Et.getTransfer(i)){case Pa:return[e,"LinearTransferOETF"];case Ft:return[e,"sRGBTransferOETF"];default:return ot("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function nf(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+_v(i.getShaderSource(e),a)}else return r}function vv(i,e){const t=yv(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Sv(i,e){let t;switch(e){case j0:t="Linear";break;case K0:t="Reinhard";break;case Z0:t="Cineon";break;case Dd:t="ACESFilmic";break;case Q0:t="AgX";break;case em:t="Neutral";break;case J0:t="Custom";break;default:ot("WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Jo=new P;function bv(){Et.getLuminanceCoefficients(Jo);const i=Jo.x.toFixed(4),e=Jo.y.toFixed(4),t=Jo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function wv(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Jr).join(`
`)}function Mv(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Ev(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function Jr(i){return i!==""}function sf(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function rf(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Tv=/^[ \t]*#include +<([\w\d./]+)>/gm;function ou(i){return i.replace(Tv,Rv)}const Av=new Map;function Rv(i,e){let t=pt[e];if(t===void 0){const n=Av.get(e);if(n!==void 0)t=pt[n],ot('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return ou(t)}const Cv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function of(i){return i.replace(Cv,Pv)}function Pv(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function af(i){let e=`precision ${i.precision} float;
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
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Iv(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Cd?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Pd?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Li&&(e="SHADOWMAP_TYPE_VSM"),e}function Dv(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case br:case wr:e="ENVMAP_TYPE_CUBE";break;case Ga:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Lv(i){let e="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===wr&&(e="ENVMAP_MODE_REFRACTION"),e}function Uv(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Id:e="ENVMAP_BLENDING_MULTIPLY";break;case $0:e="ENVMAP_BLENDING_MIX";break;case Y0:e="ENVMAP_BLENDING_ADD";break}return e}function Nv(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Ov(i,e,t,n){const s=i.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const c=Iv(t),l=Dv(t),h=Lv(t),u=Uv(t),f=Nv(t),p=wv(t),_=Mv(r),y=s.createProgram();let x,m,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(x=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Jr).join(`
`),x.length>0&&(x+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Jr).join(`
`),m.length>0&&(m+=`
`)):(x=[af(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Jr).join(`
`),m=[af(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==fs?"#define TONE_MAPPING":"",t.toneMapping!==fs?pt.tonemapping_pars_fragment:"",t.toneMapping!==fs?Sv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",pt.colorspace_pars_fragment,vv("linearToOutputTexel",t.outputColorSpace),bv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Jr).join(`
`)),o=ou(o),o=sf(o,t),o=rf(o,t),a=ou(a),a=sf(a,t),a=rf(a,t),o=of(o),a=of(a),t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,x=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,m=["#define varying in",t.glslVersion===uh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===uh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const b=S+x+o,w=S+m+a,T=ef(s,s.VERTEX_SHADER,b),R=ef(s,s.FRAGMENT_SHADER,w);s.attachShader(y,T),s.attachShader(y,R),t.index0AttributeName!==void 0?s.bindAttribLocation(y,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(y,0,"position"),s.linkProgram(y);function L(N){if(i.debug.checkShaderErrors){const B=s.getProgramInfoLog(y)||"",C=s.getShaderInfoLog(T)||"",F=s.getShaderInfoLog(R)||"",k=B.trim(),V=C.trim(),q=F.trim();let $=!0,ae=!0;if(s.getProgramParameter(y,s.LINK_STATUS)===!1)if($=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,y,T,R);else{const Q=nf(s,T,"vertex"),xe=nf(s,R,"fragment");Xt("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(y,s.VALIDATE_STATUS)+`

Material Name: `+N.name+`
Material Type: `+N.type+`

Program Info Log: `+k+`
`+Q+`
`+xe)}else k!==""?ot("WebGLProgram: Program Info Log:",k):(V===""||q==="")&&(ae=!1);ae&&(N.diagnostics={runnable:$,programLog:k,vertexShader:{log:V,prefix:x},fragmentShader:{log:q,prefix:m}})}s.deleteShader(T),s.deleteShader(R),U=new Ea(s,y),E=Ev(s,y)}let U;this.getUniforms=function(){return U===void 0&&L(this),U};let E;this.getAttributes=function(){return E===void 0&&L(this),E};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(y,gv)),M},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=xv++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=T,this.fragmentShader=R,this}let Fv=0;class Bv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new zv(e),t.set(e,n)),n}}class zv{constructor(e){this.id=Fv++,this.code=e,this.usedTimes=0}}function kv(i,e,t,n,s,r,o){const a=new Nu,c=new Bv,l=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures;let p=s.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(E){return l.add(E),E===0?"uv":`uv${E}`}function x(E,M,N,B,C){const F=B.fog,k=C.geometry,V=E.isMeshStandardMaterial?B.environment:null,q=(E.isMeshStandardMaterial?t:e).get(E.envMap||V),$=q&&q.mapping===Ga?q.image.height:null,ae=_[E.type];E.precision!==null&&(p=s.getMaxPrecision(E.precision),p!==E.precision&&ot("WebGLProgram.getParameters:",E.precision,"not supported, using",p,"instead."));const Q=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,xe=Q!==void 0?Q.length:0;let be=0;k.morphAttributes.position!==void 0&&(be=1),k.morphAttributes.normal!==void 0&&(be=2),k.morphAttributes.color!==void 0&&(be=3);let He,Je,ct,fe;if(ae){const Ct=gi[ae];He=Ct.vertexShader,Je=Ct.fragmentShader}else He=E.vertexShader,Je=E.fragmentShader,c.update(E),ct=c.getVertexShaderID(E),fe=c.getFragmentShaderID(E);const pe=i.getRenderTarget(),Ae=i.state.buffers.depth.getReversed(),je=C.isInstancedMesh===!0,Be=C.isBatchedMesh===!0,ut=!!E.map,At=!!E.matcap,st=!!q,Mt=!!E.aoMap,G=!!E.lightMap,ft=!!E.bumpMap,lt=!!E.normalMap,Rt=!!E.displacementMap,Oe=!!E.emissiveMap,_t=!!E.metalnessMap,Ge=!!E.roughnessMap,tt=E.anisotropy>0,z=E.clearcoat>0,D=E.dispersion>0,ee=E.iridescence>0,de=E.sheen>0,me=E.transmission>0,le=tt&&!!E.anisotropyMap,qe=z&&!!E.clearcoatMap,Re=z&&!!E.clearcoatNormalMap,Ke=z&&!!E.clearcoatRoughnessMap,Ue=ee&&!!E.iridescenceMap,ge=ee&&!!E.iridescenceThicknessMap,Ee=de&&!!E.sheenColorMap,We=de&&!!E.sheenRoughnessMap,Ye=!!E.specularMap,Ne=!!E.specularColorMap,$e=!!E.specularIntensityMap,W=me&&!!E.transmissionMap,Ce=me&&!!E.thicknessMap,ye=!!E.gradientMap,Se=!!E.alphaMap,_e=E.alphaTest>0,he=!!E.alphaHash,ke=!!E.extensions;let Qe=fs;E.toneMapped&&(pe===null||pe.isXRRenderTarget===!0)&&(Qe=i.toneMapping);const Lt={shaderID:ae,shaderType:E.type,shaderName:E.name,vertexShader:He,fragmentShader:Je,defines:E.defines,customVertexShaderID:ct,customFragmentShaderID:fe,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:p,batching:Be,batchingColor:Be&&C._colorsTexture!==null,instancing:je,instancingColor:je&&C.instanceColor!==null,instancingMorph:je&&C.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:pe===null?i.outputColorSpace:pe.isXRRenderTarget===!0?pe.texture.colorSpace:Ds,alphaToCoverage:!!E.alphaToCoverage,map:ut,matcap:At,envMap:st,envMapMode:st&&q.mapping,envMapCubeUVHeight:$,aoMap:Mt,lightMap:G,bumpMap:ft,normalMap:lt,displacementMap:f&&Rt,emissiveMap:Oe,normalMapObjectSpace:lt&&E.normalMapType===sm,normalMapTangentSpace:lt&&E.normalMapType===Vd,metalnessMap:_t,roughnessMap:Ge,anisotropy:tt,anisotropyMap:le,clearcoat:z,clearcoatMap:qe,clearcoatNormalMap:Re,clearcoatRoughnessMap:Ke,dispersion:D,iridescence:ee,iridescenceMap:Ue,iridescenceThicknessMap:ge,sheen:de,sheenColorMap:Ee,sheenRoughnessMap:We,specularMap:Ye,specularColorMap:Ne,specularIntensityMap:$e,transmission:me,transmissionMap:W,thicknessMap:Ce,gradientMap:ye,opaque:E.transparent===!1&&E.blending===yr&&E.alphaToCoverage===!1,alphaMap:Se,alphaTest:_e,alphaHash:he,combine:E.combine,mapUv:ut&&y(E.map.channel),aoMapUv:Mt&&y(E.aoMap.channel),lightMapUv:G&&y(E.lightMap.channel),bumpMapUv:ft&&y(E.bumpMap.channel),normalMapUv:lt&&y(E.normalMap.channel),displacementMapUv:Rt&&y(E.displacementMap.channel),emissiveMapUv:Oe&&y(E.emissiveMap.channel),metalnessMapUv:_t&&y(E.metalnessMap.channel),roughnessMapUv:Ge&&y(E.roughnessMap.channel),anisotropyMapUv:le&&y(E.anisotropyMap.channel),clearcoatMapUv:qe&&y(E.clearcoatMap.channel),clearcoatNormalMapUv:Re&&y(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ke&&y(E.clearcoatRoughnessMap.channel),iridescenceMapUv:Ue&&y(E.iridescenceMap.channel),iridescenceThicknessMapUv:ge&&y(E.iridescenceThicknessMap.channel),sheenColorMapUv:Ee&&y(E.sheenColorMap.channel),sheenRoughnessMapUv:We&&y(E.sheenRoughnessMap.channel),specularMapUv:Ye&&y(E.specularMap.channel),specularColorMapUv:Ne&&y(E.specularColorMap.channel),specularIntensityMapUv:$e&&y(E.specularIntensityMap.channel),transmissionMapUv:W&&y(E.transmissionMap.channel),thicknessMapUv:Ce&&y(E.thicknessMap.channel),alphaMapUv:Se&&y(E.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(lt||tt),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,pointsUvs:C.isPoints===!0&&!!k.attributes.uv&&(ut||Se),fog:!!F,useFog:E.fog===!0,fogExp2:!!F&&F.isFogExp2,flatShading:E.flatShading===!0&&E.wireframe===!1,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Ae,skinning:C.isSkinnedMesh===!0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:xe,morphTextureStride:be,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:E.dithering,shadowMapEnabled:i.shadowMap.enabled&&N.length>0,shadowMapType:i.shadowMap.type,toneMapping:Qe,decodeVideoTexture:ut&&E.map.isVideoTexture===!0&&Et.getTransfer(E.map.colorSpace)===Ft,decodeVideoTextureEmissive:Oe&&E.emissiveMap.isVideoTexture===!0&&Et.getTransfer(E.emissiveMap.colorSpace)===Ft,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===ni,flipSided:E.side===Ln,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:ke&&E.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ke&&E.extensions.multiDraw===!0||Be)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return Lt.vertexUv1s=l.has(1),Lt.vertexUv2s=l.has(2),Lt.vertexUv3s=l.has(3),l.clear(),Lt}function m(E){const M=[];if(E.shaderID?M.push(E.shaderID):(M.push(E.customVertexShaderID),M.push(E.customFragmentShaderID)),E.defines!==void 0)for(const N in E.defines)M.push(N),M.push(E.defines[N]);return E.isRawShaderMaterial===!1&&(S(M,E),b(M,E),M.push(i.outputColorSpace)),M.push(E.customProgramCacheKey),M.join()}function S(E,M){E.push(M.precision),E.push(M.outputColorSpace),E.push(M.envMapMode),E.push(M.envMapCubeUVHeight),E.push(M.mapUv),E.push(M.alphaMapUv),E.push(M.lightMapUv),E.push(M.aoMapUv),E.push(M.bumpMapUv),E.push(M.normalMapUv),E.push(M.displacementMapUv),E.push(M.emissiveMapUv),E.push(M.metalnessMapUv),E.push(M.roughnessMapUv),E.push(M.anisotropyMapUv),E.push(M.clearcoatMapUv),E.push(M.clearcoatNormalMapUv),E.push(M.clearcoatRoughnessMapUv),E.push(M.iridescenceMapUv),E.push(M.iridescenceThicknessMapUv),E.push(M.sheenColorMapUv),E.push(M.sheenRoughnessMapUv),E.push(M.specularMapUv),E.push(M.specularColorMapUv),E.push(M.specularIntensityMapUv),E.push(M.transmissionMapUv),E.push(M.thicknessMapUv),E.push(M.combine),E.push(M.fogExp2),E.push(M.sizeAttenuation),E.push(M.morphTargetsCount),E.push(M.morphAttributeCount),E.push(M.numDirLights),E.push(M.numPointLights),E.push(M.numSpotLights),E.push(M.numSpotLightMaps),E.push(M.numHemiLights),E.push(M.numRectAreaLights),E.push(M.numDirLightShadows),E.push(M.numPointLightShadows),E.push(M.numSpotLightShadows),E.push(M.numSpotLightShadowsWithMaps),E.push(M.numLightProbes),E.push(M.shadowMapType),E.push(M.toneMapping),E.push(M.numClippingPlanes),E.push(M.numClipIntersection),E.push(M.depthPacking)}function b(E,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),M.gradientMap&&a.enable(22),E.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reversedDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),E.push(a.mask)}function w(E){const M=_[E.type];let N;if(M){const B=gi[M];N=Zm.clone(B.uniforms)}else N=E.uniforms;return N}function T(E,M){let N;for(let B=0,C=h.length;B<C;B++){const F=h[B];if(F.cacheKey===M){N=F,++N.usedTimes;break}}return N===void 0&&(N=new Ov(i,M,E,r),h.push(N)),N}function R(E){if(--E.usedTimes===0){const M=h.indexOf(E);h[M]=h[h.length-1],h.pop(),E.destroy()}}function L(E){c.remove(E)}function U(){c.dispose()}return{getParameters:x,getProgramCacheKey:m,getUniforms:w,acquireProgram:T,releaseProgram:R,releaseShaderCache:L,programs:h,dispose:U}}function Vv(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Hv(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function cf(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function lf(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(u,f,p,_,y,x){let m=i[e];return m===void 0?(m={id:u.id,object:u,geometry:f,material:p,groupOrder:_,renderOrder:u.renderOrder,z:y,group:x},i[e]=m):(m.id=u.id,m.object=u,m.geometry=f,m.material=p,m.groupOrder=_,m.renderOrder=u.renderOrder,m.z=y,m.group=x),e++,m}function a(u,f,p,_,y,x){const m=o(u,f,p,_,y,x);p.transmission>0?n.push(m):p.transparent===!0?s.push(m):t.push(m)}function c(u,f,p,_,y,x){const m=o(u,f,p,_,y,x);p.transmission>0?n.unshift(m):p.transparent===!0?s.unshift(m):t.unshift(m)}function l(u,f){t.length>1&&t.sort(u||Hv),n.length>1&&n.sort(f||cf),s.length>1&&s.sort(f||cf)}function h(){for(let u=e,f=i.length;u<f;u++){const p=i[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function Gv(){let i=new WeakMap;function e(n,s){const r=i.get(n);let o;return r===void 0?(o=new lf,i.set(n,[o])):s>=r.length?(o=new lf,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function Wv(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new P,color:new xt};break;case"SpotLight":t={position:new P,direction:new P,color:new xt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new P,color:new xt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new P,skyColor:new xt,groundColor:new xt};break;case"RectAreaLight":t={color:new xt,position:new P,halfWidth:new P,halfHeight:new P};break}return i[e.id]=t,t}}}function Xv(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let qv=0;function $v(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Yv(i){const e=new Wv,t=Xv(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new P);const s=new P,r=new Tt,o=new Tt;function a(l){let h=0,u=0,f=0;for(let E=0;E<9;E++)n.probe[E].set(0,0,0);let p=0,_=0,y=0,x=0,m=0,S=0,b=0,w=0,T=0,R=0,L=0;l.sort($v);for(let E=0,M=l.length;E<M;E++){const N=l[E],B=N.color,C=N.intensity,F=N.distance,k=N.shadow&&N.shadow.map?N.shadow.map.texture:null;if(N.isAmbientLight)h+=B.r*C,u+=B.g*C,f+=B.b*C;else if(N.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(N.sh.coefficients[V],C);L++}else if(N.isDirectionalLight){const V=e.get(N);if(V.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){const q=N.shadow,$=t.get(N);$.shadowIntensity=q.intensity,$.shadowBias=q.bias,$.shadowNormalBias=q.normalBias,$.shadowRadius=q.radius,$.shadowMapSize=q.mapSize,n.directionalShadow[p]=$,n.directionalShadowMap[p]=k,n.directionalShadowMatrix[p]=N.shadow.matrix,S++}n.directional[p]=V,p++}else if(N.isSpotLight){const V=e.get(N);V.position.setFromMatrixPosition(N.matrixWorld),V.color.copy(B).multiplyScalar(C),V.distance=F,V.coneCos=Math.cos(N.angle),V.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),V.decay=N.decay,n.spot[y]=V;const q=N.shadow;if(N.map&&(n.spotLightMap[T]=N.map,T++,q.updateMatrices(N),N.castShadow&&R++),n.spotLightMatrix[y]=q.matrix,N.castShadow){const $=t.get(N);$.shadowIntensity=q.intensity,$.shadowBias=q.bias,$.shadowNormalBias=q.normalBias,$.shadowRadius=q.radius,$.shadowMapSize=q.mapSize,n.spotShadow[y]=$,n.spotShadowMap[y]=k,w++}y++}else if(N.isRectAreaLight){const V=e.get(N);V.color.copy(B).multiplyScalar(C),V.halfWidth.set(N.width*.5,0,0),V.halfHeight.set(0,N.height*.5,0),n.rectArea[x]=V,x++}else if(N.isPointLight){const V=e.get(N);if(V.color.copy(N.color).multiplyScalar(N.intensity),V.distance=N.distance,V.decay=N.decay,N.castShadow){const q=N.shadow,$=t.get(N);$.shadowIntensity=q.intensity,$.shadowBias=q.bias,$.shadowNormalBias=q.normalBias,$.shadowRadius=q.radius,$.shadowMapSize=q.mapSize,$.shadowCameraNear=q.camera.near,$.shadowCameraFar=q.camera.far,n.pointShadow[_]=$,n.pointShadowMap[_]=k,n.pointShadowMatrix[_]=N.shadow.matrix,b++}n.point[_]=V,_++}else if(N.isHemisphereLight){const V=e.get(N);V.skyColor.copy(N.color).multiplyScalar(C),V.groundColor.copy(N.groundColor).multiplyScalar(C),n.hemi[m]=V,m++}}x>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ie.LTC_FLOAT_1,n.rectAreaLTC2=Ie.LTC_FLOAT_2):(n.rectAreaLTC1=Ie.LTC_HALF_1,n.rectAreaLTC2=Ie.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;const U=n.hash;(U.directionalLength!==p||U.pointLength!==_||U.spotLength!==y||U.rectAreaLength!==x||U.hemiLength!==m||U.numDirectionalShadows!==S||U.numPointShadows!==b||U.numSpotShadows!==w||U.numSpotMaps!==T||U.numLightProbes!==L)&&(n.directional.length=p,n.spot.length=y,n.rectArea.length=x,n.point.length=_,n.hemi.length=m,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.pointShadow.length=b,n.pointShadowMap.length=b,n.spotShadow.length=w,n.spotShadowMap.length=w,n.directionalShadowMatrix.length=S,n.pointShadowMatrix.length=b,n.spotLightMatrix.length=w+T-R,n.spotLightMap.length=T,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=L,U.directionalLength=p,U.pointLength=_,U.spotLength=y,U.rectAreaLength=x,U.hemiLength=m,U.numDirectionalShadows=S,U.numPointShadows=b,U.numSpotShadows=w,U.numSpotMaps=T,U.numLightProbes=L,n.version=qv++)}function c(l,h){let u=0,f=0,p=0,_=0,y=0;const x=h.matrixWorldInverse;for(let m=0,S=l.length;m<S;m++){const b=l[m];if(b.isDirectionalLight){const w=n.directional[u];w.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(x),u++}else if(b.isSpotLight){const w=n.spot[p];w.position.setFromMatrixPosition(b.matrixWorld),w.position.applyMatrix4(x),w.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(x),p++}else if(b.isRectAreaLight){const w=n.rectArea[_];w.position.setFromMatrixPosition(b.matrixWorld),w.position.applyMatrix4(x),o.identity(),r.copy(b.matrixWorld),r.premultiply(x),o.extractRotation(r),w.halfWidth.set(b.width*.5,0,0),w.halfHeight.set(0,b.height*.5,0),w.halfWidth.applyMatrix4(o),w.halfHeight.applyMatrix4(o),_++}else if(b.isPointLight){const w=n.point[f];w.position.setFromMatrixPosition(b.matrixWorld),w.position.applyMatrix4(x),f++}else if(b.isHemisphereLight){const w=n.hemi[y];w.direction.setFromMatrixPosition(b.matrixWorld),w.direction.transformDirection(x),y++}}}return{setup:a,setupView:c,state:n}}function uf(i){const e=new Yv(i),t=[],n=[];function s(h){l.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function o(h){n.push(h)}function a(){e.setup(t)}function c(h){e.setupView(t,h)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function jv(i){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let a;return o===void 0?(a=new uf(i),e.set(s,[a])):r>=o.length?(a=new uf(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}const Kv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Zv=`uniform sampler2D shadow_pass;
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
}`;function Jv(i,e,t){let n=new Fu;const s=new it,r=new it,o=new jt,a=new ug({depthPacking:im}),c=new hg,l={},h=t.maxTextureSize,u={[Si]:Ln,[Ln]:Si,[ni]:ni},f=new Gi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new it},radius:{value:4}},vertexShader:Kv,fragmentShader:Zv}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const _=new pn;_.setAttribute("position",new Hn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new It(_,f),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Cd;let m=this.type;this.render=function(R,L,U){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||R.length===0)return;const E=i.getRenderTarget(),M=i.getActiveCubeFace(),N=i.getActiveMipmapLevel(),B=i.state;B.setBlending(zi),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const C=m!==Li&&this.type===Li,F=m===Li&&this.type!==Li;for(let k=0,V=R.length;k<V;k++){const q=R[k],$=q.shadow;if($===void 0){ot("WebGLShadowMap:",q,"has no shadow.");continue}if($.autoUpdate===!1&&$.needsUpdate===!1)continue;s.copy($.mapSize);const ae=$.getFrameExtents();if(s.multiply(ae),r.copy($.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/ae.x),s.x=r.x*ae.x,$.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/ae.y),s.y=r.y*ae.y,$.mapSize.y=r.y)),$.map===null||C===!0||F===!0){const xe=this.type!==Li?{minFilter:Yn,magFilter:Yn}:{};$.map!==null&&$.map.dispose(),$.map=new Ls(s.x,s.y,xe),$.map.texture.name=q.name+".shadowMap",$.camera.updateProjectionMatrix()}i.setRenderTarget($.map),i.clear();const Q=$.getViewportCount();for(let xe=0;xe<Q;xe++){const be=$.getViewport(xe);o.set(r.x*be.x,r.y*be.y,r.x*be.z,r.y*be.w),B.viewport(o),$.updateMatrices(q,xe),n=$.getFrustum(),w(L,U,$.camera,q,this.type)}$.isPointLightShadow!==!0&&this.type===Li&&S($,U),$.needsUpdate=!1}m=this.type,x.needsUpdate=!1,i.setRenderTarget(E,M,N)};function S(R,L){const U=e.update(y);f.defines.VSM_SAMPLES!==R.blurSamples&&(f.defines.VSM_SAMPLES=R.blurSamples,p.defines.VSM_SAMPLES=R.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new Ls(s.x,s.y)),f.uniforms.shadow_pass.value=R.map.texture,f.uniforms.resolution.value=R.mapSize,f.uniforms.radius.value=R.radius,i.setRenderTarget(R.mapPass),i.clear(),i.renderBufferDirect(L,null,U,f,y,null),p.uniforms.shadow_pass.value=R.mapPass.texture,p.uniforms.resolution.value=R.mapSize,p.uniforms.radius.value=R.radius,i.setRenderTarget(R.map),i.clear(),i.renderBufferDirect(L,null,U,p,y,null)}function b(R,L,U,E){let M=null;const N=U.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(N!==void 0)M=N;else if(M=U.isPointLight===!0?c:a,i.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0||L.alphaToCoverage===!0){const B=M.uuid,C=L.uuid;let F=l[B];F===void 0&&(F={},l[B]=F);let k=F[C];k===void 0&&(k=M.clone(),F[C]=k,L.addEventListener("dispose",T)),M=k}if(M.visible=L.visible,M.wireframe=L.wireframe,E===Li?M.side=L.shadowSide!==null?L.shadowSide:L.side:M.side=L.shadowSide!==null?L.shadowSide:u[L.side],M.alphaMap=L.alphaMap,M.alphaTest=L.alphaToCoverage===!0?.5:L.alphaTest,M.map=L.map,M.clipShadows=L.clipShadows,M.clippingPlanes=L.clippingPlanes,M.clipIntersection=L.clipIntersection,M.displacementMap=L.displacementMap,M.displacementScale=L.displacementScale,M.displacementBias=L.displacementBias,M.wireframeLinewidth=L.wireframeLinewidth,M.linewidth=L.linewidth,U.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const B=i.properties.get(M);B.light=U}return M}function w(R,L,U,E,M){if(R.visible===!1)return;if(R.layers.test(L.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&M===Li)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,R.matrixWorld);const C=e.update(R),F=R.material;if(Array.isArray(F)){const k=C.groups;for(let V=0,q=k.length;V<q;V++){const $=k[V],ae=F[$.materialIndex];if(ae&&ae.visible){const Q=b(R,ae,E,M);R.onBeforeShadow(i,R,L,U,C,Q,$),i.renderBufferDirect(U,null,C,Q,R,$),R.onAfterShadow(i,R,L,U,C,Q,$)}}}else if(F.visible){const k=b(R,F,E,M);R.onBeforeShadow(i,R,L,U,C,k,null),i.renderBufferDirect(U,null,C,k,R,null),R.onAfterShadow(i,R,L,U,C,k,null)}}const B=R.children;for(let C=0,F=B.length;C<F;C++)w(B[C],L,U,E,M)}function T(R){R.target.removeEventListener("dispose",T);for(const U in l){const E=l[U],M=R.target.uuid;M in E&&(E[M].dispose(),delete E[M])}}}const Qv={[yl]:vl,[Sl]:Ml,[bl]:El,[Sr]:wl,[vl]:yl,[Ml]:Sl,[El]:bl,[wl]:Sr};function eS(i,e){function t(){let W=!1;const Ce=new jt;let ye=null;const Se=new jt(0,0,0,0);return{setMask:function(_e){ye!==_e&&!W&&(i.colorMask(_e,_e,_e,_e),ye=_e)},setLocked:function(_e){W=_e},setClear:function(_e,he,ke,Qe,Lt){Lt===!0&&(_e*=Qe,he*=Qe,ke*=Qe),Ce.set(_e,he,ke,Qe),Se.equals(Ce)===!1&&(i.clearColor(_e,he,ke,Qe),Se.copy(Ce))},reset:function(){W=!1,ye=null,Se.set(-1,0,0,0)}}}function n(){let W=!1,Ce=!1,ye=null,Se=null,_e=null;return{setReversed:function(he){if(Ce!==he){const ke=e.get("EXT_clip_control");he?ke.clipControlEXT(ke.LOWER_LEFT_EXT,ke.ZERO_TO_ONE_EXT):ke.clipControlEXT(ke.LOWER_LEFT_EXT,ke.NEGATIVE_ONE_TO_ONE_EXT),Ce=he;const Qe=_e;_e=null,this.setClear(Qe)}},getReversed:function(){return Ce},setTest:function(he){he?pe(i.DEPTH_TEST):Ae(i.DEPTH_TEST)},setMask:function(he){ye!==he&&!W&&(i.depthMask(he),ye=he)},setFunc:function(he){if(Ce&&(he=Qv[he]),Se!==he){switch(he){case yl:i.depthFunc(i.NEVER);break;case vl:i.depthFunc(i.ALWAYS);break;case Sl:i.depthFunc(i.LESS);break;case Sr:i.depthFunc(i.LEQUAL);break;case bl:i.depthFunc(i.EQUAL);break;case wl:i.depthFunc(i.GEQUAL);break;case Ml:i.depthFunc(i.GREATER);break;case El:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Se=he}},setLocked:function(he){W=he},setClear:function(he){_e!==he&&(Ce&&(he=1-he),i.clearDepth(he),_e=he)},reset:function(){W=!1,ye=null,Se=null,_e=null,Ce=!1}}}function s(){let W=!1,Ce=null,ye=null,Se=null,_e=null,he=null,ke=null,Qe=null,Lt=null;return{setTest:function(Ct){W||(Ct?pe(i.STENCIL_TEST):Ae(i.STENCIL_TEST))},setMask:function(Ct){Ce!==Ct&&!W&&(i.stencilMask(Ct),Ce=Ct)},setFunc:function(Ct,Rn,Nn){(ye!==Ct||Se!==Rn||_e!==Nn)&&(i.stencilFunc(Ct,Rn,Nn),ye=Ct,Se=Rn,_e=Nn)},setOp:function(Ct,Rn,Nn){(he!==Ct||ke!==Rn||Qe!==Nn)&&(i.stencilOp(Ct,Rn,Nn),he=Ct,ke=Rn,Qe=Nn)},setLocked:function(Ct){W=Ct},setClear:function(Ct){Lt!==Ct&&(i.clearStencil(Ct),Lt=Ct)},reset:function(){W=!1,Ce=null,ye=null,Se=null,_e=null,he=null,ke=null,Qe=null,Lt=null}}}const r=new t,o=new n,a=new s,c=new WeakMap,l=new WeakMap;let h={},u={},f=new WeakMap,p=[],_=null,y=!1,x=null,m=null,S=null,b=null,w=null,T=null,R=null,L=new xt(0,0,0),U=0,E=!1,M=null,N=null,B=null,C=null,F=null;const k=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,q=0;const $=i.getParameter(i.VERSION);$.indexOf("WebGL")!==-1?(q=parseFloat(/^WebGL (\d)/.exec($)[1]),V=q>=1):$.indexOf("OpenGL ES")!==-1&&(q=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),V=q>=2);let ae=null,Q={};const xe=i.getParameter(i.SCISSOR_BOX),be=i.getParameter(i.VIEWPORT),He=new jt().fromArray(xe),Je=new jt().fromArray(be);function ct(W,Ce,ye,Se){const _e=new Uint8Array(4),he=i.createTexture();i.bindTexture(W,he),i.texParameteri(W,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(W,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let ke=0;ke<ye;ke++)W===i.TEXTURE_3D||W===i.TEXTURE_2D_ARRAY?i.texImage3D(Ce,0,i.RGBA,1,1,Se,0,i.RGBA,i.UNSIGNED_BYTE,_e):i.texImage2D(Ce+ke,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,_e);return he}const fe={};fe[i.TEXTURE_2D]=ct(i.TEXTURE_2D,i.TEXTURE_2D,1),fe[i.TEXTURE_CUBE_MAP]=ct(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),fe[i.TEXTURE_2D_ARRAY]=ct(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),fe[i.TEXTURE_3D]=ct(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),pe(i.DEPTH_TEST),o.setFunc(Sr),ft(!1),lt(rh),pe(i.CULL_FACE),Mt(zi);function pe(W){h[W]!==!0&&(i.enable(W),h[W]=!0)}function Ae(W){h[W]!==!1&&(i.disable(W),h[W]=!1)}function je(W,Ce){return u[W]!==Ce?(i.bindFramebuffer(W,Ce),u[W]=Ce,W===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=Ce),W===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=Ce),!0):!1}function Be(W,Ce){let ye=p,Se=!1;if(W){ye=f.get(Ce),ye===void 0&&(ye=[],f.set(Ce,ye));const _e=W.textures;if(ye.length!==_e.length||ye[0]!==i.COLOR_ATTACHMENT0){for(let he=0,ke=_e.length;he<ke;he++)ye[he]=i.COLOR_ATTACHMENT0+he;ye.length=_e.length,Se=!0}}else ye[0]!==i.BACK&&(ye[0]=i.BACK,Se=!0);Se&&i.drawBuffers(ye)}function ut(W){return _!==W?(i.useProgram(W),_=W,!0):!1}const At={[Cs]:i.FUNC_ADD,[P0]:i.FUNC_SUBTRACT,[I0]:i.FUNC_REVERSE_SUBTRACT};At[D0]=i.MIN,At[L0]=i.MAX;const st={[U0]:i.ZERO,[N0]:i.ONE,[O0]:i.SRC_COLOR,[xl]:i.SRC_ALPHA,[H0]:i.SRC_ALPHA_SATURATE,[k0]:i.DST_COLOR,[B0]:i.DST_ALPHA,[F0]:i.ONE_MINUS_SRC_COLOR,[_l]:i.ONE_MINUS_SRC_ALPHA,[V0]:i.ONE_MINUS_DST_COLOR,[z0]:i.ONE_MINUS_DST_ALPHA,[G0]:i.CONSTANT_COLOR,[W0]:i.ONE_MINUS_CONSTANT_COLOR,[X0]:i.CONSTANT_ALPHA,[q0]:i.ONE_MINUS_CONSTANT_ALPHA};function Mt(W,Ce,ye,Se,_e,he,ke,Qe,Lt,Ct){if(W===zi){y===!0&&(Ae(i.BLEND),y=!1);return}if(y===!1&&(pe(i.BLEND),y=!0),W!==C0){if(W!==x||Ct!==E){if((m!==Cs||w!==Cs)&&(i.blendEquation(i.FUNC_ADD),m=Cs,w=Cs),Ct)switch(W){case yr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case oh:i.blendFunc(i.ONE,i.ONE);break;case ah:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ch:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Xt("WebGLState: Invalid blending: ",W);break}else switch(W){case yr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case oh:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case ah:Xt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ch:Xt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Xt("WebGLState: Invalid blending: ",W);break}S=null,b=null,T=null,R=null,L.set(0,0,0),U=0,x=W,E=Ct}return}_e=_e||Ce,he=he||ye,ke=ke||Se,(Ce!==m||_e!==w)&&(i.blendEquationSeparate(At[Ce],At[_e]),m=Ce,w=_e),(ye!==S||Se!==b||he!==T||ke!==R)&&(i.blendFuncSeparate(st[ye],st[Se],st[he],st[ke]),S=ye,b=Se,T=he,R=ke),(Qe.equals(L)===!1||Lt!==U)&&(i.blendColor(Qe.r,Qe.g,Qe.b,Lt),L.copy(Qe),U=Lt),x=W,E=!1}function G(W,Ce){W.side===ni?Ae(i.CULL_FACE):pe(i.CULL_FACE);let ye=W.side===Ln;Ce&&(ye=!ye),ft(ye),W.blending===yr&&W.transparent===!1?Mt(zi):Mt(W.blending,W.blendEquation,W.blendSrc,W.blendDst,W.blendEquationAlpha,W.blendSrcAlpha,W.blendDstAlpha,W.blendColor,W.blendAlpha,W.premultipliedAlpha),o.setFunc(W.depthFunc),o.setTest(W.depthTest),o.setMask(W.depthWrite),r.setMask(W.colorWrite);const Se=W.stencilWrite;a.setTest(Se),Se&&(a.setMask(W.stencilWriteMask),a.setFunc(W.stencilFunc,W.stencilRef,W.stencilFuncMask),a.setOp(W.stencilFail,W.stencilZFail,W.stencilZPass)),Oe(W.polygonOffset,W.polygonOffsetFactor,W.polygonOffsetUnits),W.alphaToCoverage===!0?pe(i.SAMPLE_ALPHA_TO_COVERAGE):Ae(i.SAMPLE_ALPHA_TO_COVERAGE)}function ft(W){M!==W&&(W?i.frontFace(i.CW):i.frontFace(i.CCW),M=W)}function lt(W){W!==A0?(pe(i.CULL_FACE),W!==N&&(W===rh?i.cullFace(i.BACK):W===R0?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ae(i.CULL_FACE),N=W}function Rt(W){W!==B&&(V&&i.lineWidth(W),B=W)}function Oe(W,Ce,ye){W?(pe(i.POLYGON_OFFSET_FILL),(C!==Ce||F!==ye)&&(i.polygonOffset(Ce,ye),C=Ce,F=ye)):Ae(i.POLYGON_OFFSET_FILL)}function _t(W){W?pe(i.SCISSOR_TEST):Ae(i.SCISSOR_TEST)}function Ge(W){W===void 0&&(W=i.TEXTURE0+k-1),ae!==W&&(i.activeTexture(W),ae=W)}function tt(W,Ce,ye){ye===void 0&&(ae===null?ye=i.TEXTURE0+k-1:ye=ae);let Se=Q[ye];Se===void 0&&(Se={type:void 0,texture:void 0},Q[ye]=Se),(Se.type!==W||Se.texture!==Ce)&&(ae!==ye&&(i.activeTexture(ye),ae=ye),i.bindTexture(W,Ce||fe[W]),Se.type=W,Se.texture=Ce)}function z(){const W=Q[ae];W!==void 0&&W.type!==void 0&&(i.bindTexture(W.type,null),W.type=void 0,W.texture=void 0)}function D(){try{i.compressedTexImage2D(...arguments)}catch(W){W("WebGLState:",W)}}function ee(){try{i.compressedTexImage3D(...arguments)}catch(W){W("WebGLState:",W)}}function de(){try{i.texSubImage2D(...arguments)}catch(W){W("WebGLState:",W)}}function me(){try{i.texSubImage3D(...arguments)}catch(W){W("WebGLState:",W)}}function le(){try{i.compressedTexSubImage2D(...arguments)}catch(W){W("WebGLState:",W)}}function qe(){try{i.compressedTexSubImage3D(...arguments)}catch(W){W("WebGLState:",W)}}function Re(){try{i.texStorage2D(...arguments)}catch(W){W("WebGLState:",W)}}function Ke(){try{i.texStorage3D(...arguments)}catch(W){W("WebGLState:",W)}}function Ue(){try{i.texImage2D(...arguments)}catch(W){W("WebGLState:",W)}}function ge(){try{i.texImage3D(...arguments)}catch(W){W("WebGLState:",W)}}function Ee(W){He.equals(W)===!1&&(i.scissor(W.x,W.y,W.z,W.w),He.copy(W))}function We(W){Je.equals(W)===!1&&(i.viewport(W.x,W.y,W.z,W.w),Je.copy(W))}function Ye(W,Ce){let ye=l.get(Ce);ye===void 0&&(ye=new WeakMap,l.set(Ce,ye));let Se=ye.get(W);Se===void 0&&(Se=i.getUniformBlockIndex(Ce,W.name),ye.set(W,Se))}function Ne(W,Ce){const Se=l.get(Ce).get(W);c.get(Ce)!==Se&&(i.uniformBlockBinding(Ce,Se,W.__bindingPointIndex),c.set(Ce,Se))}function $e(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},ae=null,Q={},u={},f=new WeakMap,p=[],_=null,y=!1,x=null,m=null,S=null,b=null,w=null,T=null,R=null,L=new xt(0,0,0),U=0,E=!1,M=null,N=null,B=null,C=null,F=null,He.set(0,0,i.canvas.width,i.canvas.height),Je.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:pe,disable:Ae,bindFramebuffer:je,drawBuffers:Be,useProgram:ut,setBlending:Mt,setMaterial:G,setFlipSided:ft,setCullFace:lt,setLineWidth:Rt,setPolygonOffset:Oe,setScissorTest:_t,activeTexture:Ge,bindTexture:tt,unbindTexture:z,compressedTexImage2D:D,compressedTexImage3D:ee,texImage2D:Ue,texImage3D:ge,updateUBOMapping:Ye,uniformBlockBinding:Ne,texStorage2D:Re,texStorage3D:Ke,texSubImage2D:de,texSubImage3D:me,compressedTexSubImage2D:le,compressedTexSubImage3D:qe,scissor:Ee,viewport:We,reset:$e}}function tS(i,e,t,n,s,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new it,h=new WeakMap;let u;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(z,D){return p?new OffscreenCanvas(z,D):Da("canvas")}function y(z,D,ee){let de=1;const me=tt(z);if((me.width>ee||me.height>ee)&&(de=ee/Math.max(me.width,me.height)),de<1)if(typeof HTMLImageElement<"u"&&z instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&z instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&z instanceof ImageBitmap||typeof VideoFrame<"u"&&z instanceof VideoFrame){const le=Math.floor(de*me.width),qe=Math.floor(de*me.height);u===void 0&&(u=_(le,qe));const Re=D?_(le,qe):u;return Re.width=le,Re.height=qe,Re.getContext("2d").drawImage(z,0,0,le,qe),ot("WebGLRenderer: Texture has been resized from ("+me.width+"x"+me.height+") to ("+le+"x"+qe+")."),Re}else return"data"in z&&ot("WebGLRenderer: Image in DataTexture is too big ("+me.width+"x"+me.height+")."),z;return z}function x(z){return z.generateMipmaps}function m(z){i.generateMipmap(z)}function S(z){return z.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:z.isWebGL3DRenderTarget?i.TEXTURE_3D:z.isWebGLArrayRenderTarget||z.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function b(z,D,ee,de,me=!1){if(z!==null){if(i[z]!==void 0)return i[z];ot("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+z+"'")}let le=D;if(D===i.RED&&(ee===i.FLOAT&&(le=i.R32F),ee===i.HALF_FLOAT&&(le=i.R16F),ee===i.UNSIGNED_BYTE&&(le=i.R8)),D===i.RED_INTEGER&&(ee===i.UNSIGNED_BYTE&&(le=i.R8UI),ee===i.UNSIGNED_SHORT&&(le=i.R16UI),ee===i.UNSIGNED_INT&&(le=i.R32UI),ee===i.BYTE&&(le=i.R8I),ee===i.SHORT&&(le=i.R16I),ee===i.INT&&(le=i.R32I)),D===i.RG&&(ee===i.FLOAT&&(le=i.RG32F),ee===i.HALF_FLOAT&&(le=i.RG16F),ee===i.UNSIGNED_BYTE&&(le=i.RG8)),D===i.RG_INTEGER&&(ee===i.UNSIGNED_BYTE&&(le=i.RG8UI),ee===i.UNSIGNED_SHORT&&(le=i.RG16UI),ee===i.UNSIGNED_INT&&(le=i.RG32UI),ee===i.BYTE&&(le=i.RG8I),ee===i.SHORT&&(le=i.RG16I),ee===i.INT&&(le=i.RG32I)),D===i.RGB_INTEGER&&(ee===i.UNSIGNED_BYTE&&(le=i.RGB8UI),ee===i.UNSIGNED_SHORT&&(le=i.RGB16UI),ee===i.UNSIGNED_INT&&(le=i.RGB32UI),ee===i.BYTE&&(le=i.RGB8I),ee===i.SHORT&&(le=i.RGB16I),ee===i.INT&&(le=i.RGB32I)),D===i.RGBA_INTEGER&&(ee===i.UNSIGNED_BYTE&&(le=i.RGBA8UI),ee===i.UNSIGNED_SHORT&&(le=i.RGBA16UI),ee===i.UNSIGNED_INT&&(le=i.RGBA32UI),ee===i.BYTE&&(le=i.RGBA8I),ee===i.SHORT&&(le=i.RGBA16I),ee===i.INT&&(le=i.RGBA32I)),D===i.RGB&&(ee===i.UNSIGNED_INT_5_9_9_9_REV&&(le=i.RGB9_E5),ee===i.UNSIGNED_INT_10F_11F_11F_REV&&(le=i.R11F_G11F_B10F)),D===i.RGBA){const qe=me?Pa:Et.getTransfer(de);ee===i.FLOAT&&(le=i.RGBA32F),ee===i.HALF_FLOAT&&(le=i.RGBA16F),ee===i.UNSIGNED_BYTE&&(le=qe===Ft?i.SRGB8_ALPHA8:i.RGBA8),ee===i.UNSIGNED_SHORT_4_4_4_4&&(le=i.RGBA4),ee===i.UNSIGNED_SHORT_5_5_5_1&&(le=i.RGB5_A1)}return(le===i.R16F||le===i.R32F||le===i.RG16F||le===i.RG32F||le===i.RGBA16F||le===i.RGBA32F)&&e.get("EXT_color_buffer_float"),le}function w(z,D){let ee;return z?D===null||D===Is||D===so?ee=i.DEPTH24_STENCIL8:D===ii?ee=i.DEPTH32F_STENCIL8:D===io&&(ee=i.DEPTH24_STENCIL8,ot("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):D===null||D===Is||D===so?ee=i.DEPTH_COMPONENT24:D===ii?ee=i.DEPTH_COMPONENT32F:D===io&&(ee=i.DEPTH_COMPONENT16),ee}function T(z,D){return x(z)===!0||z.isFramebufferTexture&&z.minFilter!==Yn&&z.minFilter!==xn?Math.log2(Math.max(D.width,D.height))+1:z.mipmaps!==void 0&&z.mipmaps.length>0?z.mipmaps.length:z.isCompressedTexture&&Array.isArray(z.image)?D.mipmaps.length:1}function R(z){const D=z.target;D.removeEventListener("dispose",R),U(D),D.isVideoTexture&&h.delete(D)}function L(z){const D=z.target;D.removeEventListener("dispose",L),M(D)}function U(z){const D=n.get(z);if(D.__webglInit===void 0)return;const ee=z.source,de=f.get(ee);if(de){const me=de[D.__cacheKey];me.usedTimes--,me.usedTimes===0&&E(z),Object.keys(de).length===0&&f.delete(ee)}n.remove(z)}function E(z){const D=n.get(z);i.deleteTexture(D.__webglTexture);const ee=z.source,de=f.get(ee);delete de[D.__cacheKey],o.memory.textures--}function M(z){const D=n.get(z);if(z.depthTexture&&(z.depthTexture.dispose(),n.remove(z.depthTexture)),z.isWebGLCubeRenderTarget)for(let de=0;de<6;de++){if(Array.isArray(D.__webglFramebuffer[de]))for(let me=0;me<D.__webglFramebuffer[de].length;me++)i.deleteFramebuffer(D.__webglFramebuffer[de][me]);else i.deleteFramebuffer(D.__webglFramebuffer[de]);D.__webglDepthbuffer&&i.deleteRenderbuffer(D.__webglDepthbuffer[de])}else{if(Array.isArray(D.__webglFramebuffer))for(let de=0;de<D.__webglFramebuffer.length;de++)i.deleteFramebuffer(D.__webglFramebuffer[de]);else i.deleteFramebuffer(D.__webglFramebuffer);if(D.__webglDepthbuffer&&i.deleteRenderbuffer(D.__webglDepthbuffer),D.__webglMultisampledFramebuffer&&i.deleteFramebuffer(D.__webglMultisampledFramebuffer),D.__webglColorRenderbuffer)for(let de=0;de<D.__webglColorRenderbuffer.length;de++)D.__webglColorRenderbuffer[de]&&i.deleteRenderbuffer(D.__webglColorRenderbuffer[de]);D.__webglDepthRenderbuffer&&i.deleteRenderbuffer(D.__webglDepthRenderbuffer)}const ee=z.textures;for(let de=0,me=ee.length;de<me;de++){const le=n.get(ee[de]);le.__webglTexture&&(i.deleteTexture(le.__webglTexture),o.memory.textures--),n.remove(ee[de])}n.remove(z)}let N=0;function B(){N=0}function C(){const z=N;return z>=s.maxTextures&&ot("WebGLTextures: Trying to use "+z+" texture units while this GPU supports only "+s.maxTextures),N+=1,z}function F(z){const D=[];return D.push(z.wrapS),D.push(z.wrapT),D.push(z.wrapR||0),D.push(z.magFilter),D.push(z.minFilter),D.push(z.anisotropy),D.push(z.internalFormat),D.push(z.format),D.push(z.type),D.push(z.generateMipmaps),D.push(z.premultiplyAlpha),D.push(z.flipY),D.push(z.unpackAlignment),D.push(z.colorSpace),D.join()}function k(z,D){const ee=n.get(z);if(z.isVideoTexture&&_t(z),z.isRenderTargetTexture===!1&&z.isExternalTexture!==!0&&z.version>0&&ee.__version!==z.version){const de=z.image;if(de===null)ot("WebGLRenderer: Texture marked for update but no image data found.");else if(de.complete===!1)ot("WebGLRenderer: Texture marked for update but image is incomplete");else{fe(ee,z,D);return}}else z.isExternalTexture&&(ee.__webglTexture=z.sourceTexture?z.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,ee.__webglTexture,i.TEXTURE0+D)}function V(z,D){const ee=n.get(z);if(z.isRenderTargetTexture===!1&&z.version>0&&ee.__version!==z.version){fe(ee,z,D);return}else z.isExternalTexture&&(ee.__webglTexture=z.sourceTexture?z.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,ee.__webglTexture,i.TEXTURE0+D)}function q(z,D){const ee=n.get(z);if(z.isRenderTargetTexture===!1&&z.version>0&&ee.__version!==z.version){fe(ee,z,D);return}t.bindTexture(i.TEXTURE_3D,ee.__webglTexture,i.TEXTURE0+D)}function $(z,D){const ee=n.get(z);if(z.version>0&&ee.__version!==z.version){pe(ee,z,D);return}t.bindTexture(i.TEXTURE_CUBE_MAP,ee.__webglTexture,i.TEXTURE0+D)}const ae={[Al]:i.REPEAT,[hi]:i.CLAMP_TO_EDGE,[Rl]:i.MIRRORED_REPEAT},Q={[Yn]:i.NEAREST,[tm]:i.NEAREST_MIPMAP_NEAREST,[To]:i.NEAREST_MIPMAP_LINEAR,[xn]:i.LINEAR,[rc]:i.LINEAR_MIPMAP_NEAREST,[cs]:i.LINEAR_MIPMAP_LINEAR},xe={[rm]:i.NEVER,[hm]:i.ALWAYS,[om]:i.LESS,[Hd]:i.LEQUAL,[am]:i.EQUAL,[um]:i.GEQUAL,[cm]:i.GREATER,[lm]:i.NOTEQUAL};function be(z,D){if(D.type===ii&&e.has("OES_texture_float_linear")===!1&&(D.magFilter===xn||D.magFilter===rc||D.magFilter===To||D.magFilter===cs||D.minFilter===xn||D.minFilter===rc||D.minFilter===To||D.minFilter===cs)&&ot("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(z,i.TEXTURE_WRAP_S,ae[D.wrapS]),i.texParameteri(z,i.TEXTURE_WRAP_T,ae[D.wrapT]),(z===i.TEXTURE_3D||z===i.TEXTURE_2D_ARRAY)&&i.texParameteri(z,i.TEXTURE_WRAP_R,ae[D.wrapR]),i.texParameteri(z,i.TEXTURE_MAG_FILTER,Q[D.magFilter]),i.texParameteri(z,i.TEXTURE_MIN_FILTER,Q[D.minFilter]),D.compareFunction&&(i.texParameteri(z,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(z,i.TEXTURE_COMPARE_FUNC,xe[D.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(D.magFilter===Yn||D.minFilter!==To&&D.minFilter!==cs||D.type===ii&&e.has("OES_texture_float_linear")===!1)return;if(D.anisotropy>1||n.get(D).__currentAnisotropy){const ee=e.get("EXT_texture_filter_anisotropic");i.texParameterf(z,ee.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(D.anisotropy,s.getMaxAnisotropy())),n.get(D).__currentAnisotropy=D.anisotropy}}}function He(z,D){let ee=!1;z.__webglInit===void 0&&(z.__webglInit=!0,D.addEventListener("dispose",R));const de=D.source;let me=f.get(de);me===void 0&&(me={},f.set(de,me));const le=F(D);if(le!==z.__cacheKey){me[le]===void 0&&(me[le]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,ee=!0),me[le].usedTimes++;const qe=me[z.__cacheKey];qe!==void 0&&(me[z.__cacheKey].usedTimes--,qe.usedTimes===0&&E(D)),z.__cacheKey=le,z.__webglTexture=me[le].texture}return ee}function Je(z,D,ee){return Math.floor(Math.floor(z/ee)/D)}function ct(z,D,ee,de){const le=z.updateRanges;if(le.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,D.width,D.height,ee,de,D.data);else{le.sort((ge,Ee)=>ge.start-Ee.start);let qe=0;for(let ge=1;ge<le.length;ge++){const Ee=le[qe],We=le[ge],Ye=Ee.start+Ee.count,Ne=Je(We.start,D.width,4),$e=Je(Ee.start,D.width,4);We.start<=Ye+1&&Ne===$e&&Je(We.start+We.count-1,D.width,4)===Ne?Ee.count=Math.max(Ee.count,We.start+We.count-Ee.start):(++qe,le[qe]=We)}le.length=qe+1;const Re=i.getParameter(i.UNPACK_ROW_LENGTH),Ke=i.getParameter(i.UNPACK_SKIP_PIXELS),Ue=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,D.width);for(let ge=0,Ee=le.length;ge<Ee;ge++){const We=le[ge],Ye=Math.floor(We.start/4),Ne=Math.ceil(We.count/4),$e=Ye%D.width,W=Math.floor(Ye/D.width),Ce=Ne,ye=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,$e),i.pixelStorei(i.UNPACK_SKIP_ROWS,W),t.texSubImage2D(i.TEXTURE_2D,0,$e,W,Ce,ye,ee,de,D.data)}z.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,Re),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ke),i.pixelStorei(i.UNPACK_SKIP_ROWS,Ue)}}function fe(z,D,ee){let de=i.TEXTURE_2D;(D.isDataArrayTexture||D.isCompressedArrayTexture)&&(de=i.TEXTURE_2D_ARRAY),D.isData3DTexture&&(de=i.TEXTURE_3D);const me=He(z,D),le=D.source;t.bindTexture(de,z.__webglTexture,i.TEXTURE0+ee);const qe=n.get(le);if(le.version!==qe.__version||me===!0){t.activeTexture(i.TEXTURE0+ee);const Re=Et.getPrimaries(Et.workingColorSpace),Ke=D.colorSpace===os?null:Et.getPrimaries(D.colorSpace),Ue=D.colorSpace===os||Re===Ke?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,D.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,D.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ue);let ge=y(D.image,!1,s.maxTextureSize);ge=Ge(D,ge);const Ee=r.convert(D.format,D.colorSpace),We=r.convert(D.type);let Ye=b(D.internalFormat,Ee,We,D.colorSpace,D.isVideoTexture);be(de,D);let Ne;const $e=D.mipmaps,W=D.isVideoTexture!==!0,Ce=qe.__version===void 0||me===!0,ye=le.dataReady,Se=T(D,ge);if(D.isDepthTexture)Ye=w(D.format===oo,D.type),Ce&&(W?t.texStorage2D(i.TEXTURE_2D,1,Ye,ge.width,ge.height):t.texImage2D(i.TEXTURE_2D,0,Ye,ge.width,ge.height,0,Ee,We,null));else if(D.isDataTexture)if($e.length>0){W&&Ce&&t.texStorage2D(i.TEXTURE_2D,Se,Ye,$e[0].width,$e[0].height);for(let _e=0,he=$e.length;_e<he;_e++)Ne=$e[_e],W?ye&&t.texSubImage2D(i.TEXTURE_2D,_e,0,0,Ne.width,Ne.height,Ee,We,Ne.data):t.texImage2D(i.TEXTURE_2D,_e,Ye,Ne.width,Ne.height,0,Ee,We,Ne.data);D.generateMipmaps=!1}else W?(Ce&&t.texStorage2D(i.TEXTURE_2D,Se,Ye,ge.width,ge.height),ye&&ct(D,ge,Ee,We)):t.texImage2D(i.TEXTURE_2D,0,Ye,ge.width,ge.height,0,Ee,We,ge.data);else if(D.isCompressedTexture)if(D.isCompressedArrayTexture){W&&Ce&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Se,Ye,$e[0].width,$e[0].height,ge.depth);for(let _e=0,he=$e.length;_e<he;_e++)if(Ne=$e[_e],D.format!==fi)if(Ee!==null)if(W){if(ye)if(D.layerUpdates.size>0){const ke=Vh(Ne.width,Ne.height,D.format,D.type);for(const Qe of D.layerUpdates){const Lt=Ne.data.subarray(Qe*ke/Ne.data.BYTES_PER_ELEMENT,(Qe+1)*ke/Ne.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,_e,0,0,Qe,Ne.width,Ne.height,1,Ee,Lt)}D.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,_e,0,0,0,Ne.width,Ne.height,ge.depth,Ee,Ne.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,_e,Ye,Ne.width,Ne.height,ge.depth,0,Ne.data,0,0);else ot("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else W?ye&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,_e,0,0,0,Ne.width,Ne.height,ge.depth,Ee,We,Ne.data):t.texImage3D(i.TEXTURE_2D_ARRAY,_e,Ye,Ne.width,Ne.height,ge.depth,0,Ee,We,Ne.data)}else{W&&Ce&&t.texStorage2D(i.TEXTURE_2D,Se,Ye,$e[0].width,$e[0].height);for(let _e=0,he=$e.length;_e<he;_e++)Ne=$e[_e],D.format!==fi?Ee!==null?W?ye&&t.compressedTexSubImage2D(i.TEXTURE_2D,_e,0,0,Ne.width,Ne.height,Ee,Ne.data):t.compressedTexImage2D(i.TEXTURE_2D,_e,Ye,Ne.width,Ne.height,0,Ne.data):ot("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):W?ye&&t.texSubImage2D(i.TEXTURE_2D,_e,0,0,Ne.width,Ne.height,Ee,We,Ne.data):t.texImage2D(i.TEXTURE_2D,_e,Ye,Ne.width,Ne.height,0,Ee,We,Ne.data)}else if(D.isDataArrayTexture)if(W){if(Ce&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Se,Ye,ge.width,ge.height,ge.depth),ye)if(D.layerUpdates.size>0){const _e=Vh(ge.width,ge.height,D.format,D.type);for(const he of D.layerUpdates){const ke=ge.data.subarray(he*_e/ge.data.BYTES_PER_ELEMENT,(he+1)*_e/ge.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,he,ge.width,ge.height,1,Ee,We,ke)}D.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ge.width,ge.height,ge.depth,Ee,We,ge.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ye,ge.width,ge.height,ge.depth,0,Ee,We,ge.data);else if(D.isData3DTexture)W?(Ce&&t.texStorage3D(i.TEXTURE_3D,Se,Ye,ge.width,ge.height,ge.depth),ye&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ge.width,ge.height,ge.depth,Ee,We,ge.data)):t.texImage3D(i.TEXTURE_3D,0,Ye,ge.width,ge.height,ge.depth,0,Ee,We,ge.data);else if(D.isFramebufferTexture){if(Ce)if(W)t.texStorage2D(i.TEXTURE_2D,Se,Ye,ge.width,ge.height);else{let _e=ge.width,he=ge.height;for(let ke=0;ke<Se;ke++)t.texImage2D(i.TEXTURE_2D,ke,Ye,_e,he,0,Ee,We,null),_e>>=1,he>>=1}}else if($e.length>0){if(W&&Ce){const _e=tt($e[0]);t.texStorage2D(i.TEXTURE_2D,Se,Ye,_e.width,_e.height)}for(let _e=0,he=$e.length;_e<he;_e++)Ne=$e[_e],W?ye&&t.texSubImage2D(i.TEXTURE_2D,_e,0,0,Ee,We,Ne):t.texImage2D(i.TEXTURE_2D,_e,Ye,Ee,We,Ne);D.generateMipmaps=!1}else if(W){if(Ce){const _e=tt(ge);t.texStorage2D(i.TEXTURE_2D,Se,Ye,_e.width,_e.height)}ye&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Ee,We,ge)}else t.texImage2D(i.TEXTURE_2D,0,Ye,Ee,We,ge);x(D)&&m(de),qe.__version=le.version,D.onUpdate&&D.onUpdate(D)}z.__version=D.version}function pe(z,D,ee){if(D.image.length!==6)return;const de=He(z,D),me=D.source;t.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture,i.TEXTURE0+ee);const le=n.get(me);if(me.version!==le.__version||de===!0){t.activeTexture(i.TEXTURE0+ee);const qe=Et.getPrimaries(Et.workingColorSpace),Re=D.colorSpace===os?null:Et.getPrimaries(D.colorSpace),Ke=D.colorSpace===os||qe===Re?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,D.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,D.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ke);const Ue=D.isCompressedTexture||D.image[0].isCompressedTexture,ge=D.image[0]&&D.image[0].isDataTexture,Ee=[];for(let he=0;he<6;he++)!Ue&&!ge?Ee[he]=y(D.image[he],!0,s.maxCubemapSize):Ee[he]=ge?D.image[he].image:D.image[he],Ee[he]=Ge(D,Ee[he]);const We=Ee[0],Ye=r.convert(D.format,D.colorSpace),Ne=r.convert(D.type),$e=b(D.internalFormat,Ye,Ne,D.colorSpace),W=D.isVideoTexture!==!0,Ce=le.__version===void 0||de===!0,ye=me.dataReady;let Se=T(D,We);be(i.TEXTURE_CUBE_MAP,D);let _e;if(Ue){W&&Ce&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Se,$e,We.width,We.height);for(let he=0;he<6;he++){_e=Ee[he].mipmaps;for(let ke=0;ke<_e.length;ke++){const Qe=_e[ke];D.format!==fi?Ye!==null?W?ye&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,ke,0,0,Qe.width,Qe.height,Ye,Qe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,ke,$e,Qe.width,Qe.height,0,Qe.data):ot("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):W?ye&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,ke,0,0,Qe.width,Qe.height,Ye,Ne,Qe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,ke,$e,Qe.width,Qe.height,0,Ye,Ne,Qe.data)}}}else{if(_e=D.mipmaps,W&&Ce){_e.length>0&&Se++;const he=tt(Ee[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Se,$e,he.width,he.height)}for(let he=0;he<6;he++)if(ge){W?ye&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,0,0,Ee[he].width,Ee[he].height,Ye,Ne,Ee[he].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,$e,Ee[he].width,Ee[he].height,0,Ye,Ne,Ee[he].data);for(let ke=0;ke<_e.length;ke++){const Lt=_e[ke].image[he].image;W?ye&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,ke+1,0,0,Lt.width,Lt.height,Ye,Ne,Lt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,ke+1,$e,Lt.width,Lt.height,0,Ye,Ne,Lt.data)}}else{W?ye&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,0,0,Ye,Ne,Ee[he]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,$e,Ye,Ne,Ee[he]);for(let ke=0;ke<_e.length;ke++){const Qe=_e[ke];W?ye&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,ke+1,0,0,Ye,Ne,Qe.image[he]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,ke+1,$e,Ye,Ne,Qe.image[he])}}}x(D)&&m(i.TEXTURE_CUBE_MAP),le.__version=me.version,D.onUpdate&&D.onUpdate(D)}z.__version=D.version}function Ae(z,D,ee,de,me,le){const qe=r.convert(ee.format,ee.colorSpace),Re=r.convert(ee.type),Ke=b(ee.internalFormat,qe,Re,ee.colorSpace),Ue=n.get(D),ge=n.get(ee);if(ge.__renderTarget=D,!Ue.__hasExternalTextures){const Ee=Math.max(1,D.width>>le),We=Math.max(1,D.height>>le);me===i.TEXTURE_3D||me===i.TEXTURE_2D_ARRAY?t.texImage3D(me,le,Ke,Ee,We,D.depth,0,qe,Re,null):t.texImage2D(me,le,Ke,Ee,We,0,qe,Re,null)}t.bindFramebuffer(i.FRAMEBUFFER,z),Oe(D)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,de,me,ge.__webglTexture,0,Rt(D)):(me===i.TEXTURE_2D||me>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&me<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,de,me,ge.__webglTexture,le),t.bindFramebuffer(i.FRAMEBUFFER,null)}function je(z,D,ee){if(i.bindRenderbuffer(i.RENDERBUFFER,z),D.depthBuffer){const de=D.depthTexture,me=de&&de.isDepthTexture?de.type:null,le=w(D.stencilBuffer,me),qe=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Re=Rt(D);Oe(D)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Re,le,D.width,D.height):ee?i.renderbufferStorageMultisample(i.RENDERBUFFER,Re,le,D.width,D.height):i.renderbufferStorage(i.RENDERBUFFER,le,D.width,D.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,qe,i.RENDERBUFFER,z)}else{const de=D.textures;for(let me=0;me<de.length;me++){const le=de[me],qe=r.convert(le.format,le.colorSpace),Re=r.convert(le.type),Ke=b(le.internalFormat,qe,Re,le.colorSpace),Ue=Rt(D);ee&&Oe(D)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ue,Ke,D.width,D.height):Oe(D)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ue,Ke,D.width,D.height):i.renderbufferStorage(i.RENDERBUFFER,Ke,D.width,D.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Be(z,D){if(D&&D.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,z),!(D.depthTexture&&D.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const de=n.get(D.depthTexture);de.__renderTarget=D,(!de.__webglTexture||D.depthTexture.image.width!==D.width||D.depthTexture.image.height!==D.height)&&(D.depthTexture.image.width=D.width,D.depthTexture.image.height=D.height,D.depthTexture.needsUpdate=!0),k(D.depthTexture,0);const me=de.__webglTexture,le=Rt(D);if(D.depthTexture.format===ro)Oe(D)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,me,0,le):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,me,0);else if(D.depthTexture.format===oo)Oe(D)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,me,0,le):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,me,0);else throw new Error("Unknown depthTexture format")}function ut(z){const D=n.get(z),ee=z.isWebGLCubeRenderTarget===!0;if(D.__boundDepthTexture!==z.depthTexture){const de=z.depthTexture;if(D.__depthDisposeCallback&&D.__depthDisposeCallback(),de){const me=()=>{delete D.__boundDepthTexture,delete D.__depthDisposeCallback,de.removeEventListener("dispose",me)};de.addEventListener("dispose",me),D.__depthDisposeCallback=me}D.__boundDepthTexture=de}if(z.depthTexture&&!D.__autoAllocateDepthBuffer){if(ee)throw new Error("target.depthTexture not supported in Cube render targets");const de=z.texture.mipmaps;de&&de.length>0?Be(D.__webglFramebuffer[0],z):Be(D.__webglFramebuffer,z)}else if(ee){D.__webglDepthbuffer=[];for(let de=0;de<6;de++)if(t.bindFramebuffer(i.FRAMEBUFFER,D.__webglFramebuffer[de]),D.__webglDepthbuffer[de]===void 0)D.__webglDepthbuffer[de]=i.createRenderbuffer(),je(D.__webglDepthbuffer[de],z,!1);else{const me=z.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,le=D.__webglDepthbuffer[de];i.bindRenderbuffer(i.RENDERBUFFER,le),i.framebufferRenderbuffer(i.FRAMEBUFFER,me,i.RENDERBUFFER,le)}}else{const de=z.texture.mipmaps;if(de&&de.length>0?t.bindFramebuffer(i.FRAMEBUFFER,D.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,D.__webglFramebuffer),D.__webglDepthbuffer===void 0)D.__webglDepthbuffer=i.createRenderbuffer(),je(D.__webglDepthbuffer,z,!1);else{const me=z.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,le=D.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,le),i.framebufferRenderbuffer(i.FRAMEBUFFER,me,i.RENDERBUFFER,le)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function At(z,D,ee){const de=n.get(z);D!==void 0&&Ae(de.__webglFramebuffer,z,z.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),ee!==void 0&&ut(z)}function st(z){const D=z.texture,ee=n.get(z),de=n.get(D);z.addEventListener("dispose",L);const me=z.textures,le=z.isWebGLCubeRenderTarget===!0,qe=me.length>1;if(qe||(de.__webglTexture===void 0&&(de.__webglTexture=i.createTexture()),de.__version=D.version,o.memory.textures++),le){ee.__webglFramebuffer=[];for(let Re=0;Re<6;Re++)if(D.mipmaps&&D.mipmaps.length>0){ee.__webglFramebuffer[Re]=[];for(let Ke=0;Ke<D.mipmaps.length;Ke++)ee.__webglFramebuffer[Re][Ke]=i.createFramebuffer()}else ee.__webglFramebuffer[Re]=i.createFramebuffer()}else{if(D.mipmaps&&D.mipmaps.length>0){ee.__webglFramebuffer=[];for(let Re=0;Re<D.mipmaps.length;Re++)ee.__webglFramebuffer[Re]=i.createFramebuffer()}else ee.__webglFramebuffer=i.createFramebuffer();if(qe)for(let Re=0,Ke=me.length;Re<Ke;Re++){const Ue=n.get(me[Re]);Ue.__webglTexture===void 0&&(Ue.__webglTexture=i.createTexture(),o.memory.textures++)}if(z.samples>0&&Oe(z)===!1){ee.__webglMultisampledFramebuffer=i.createFramebuffer(),ee.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,ee.__webglMultisampledFramebuffer);for(let Re=0;Re<me.length;Re++){const Ke=me[Re];ee.__webglColorRenderbuffer[Re]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,ee.__webglColorRenderbuffer[Re]);const Ue=r.convert(Ke.format,Ke.colorSpace),ge=r.convert(Ke.type),Ee=b(Ke.internalFormat,Ue,ge,Ke.colorSpace,z.isXRRenderTarget===!0),We=Rt(z);i.renderbufferStorageMultisample(i.RENDERBUFFER,We,Ee,z.width,z.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Re,i.RENDERBUFFER,ee.__webglColorRenderbuffer[Re])}i.bindRenderbuffer(i.RENDERBUFFER,null),z.depthBuffer&&(ee.__webglDepthRenderbuffer=i.createRenderbuffer(),je(ee.__webglDepthRenderbuffer,z,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(le){t.bindTexture(i.TEXTURE_CUBE_MAP,de.__webglTexture),be(i.TEXTURE_CUBE_MAP,D);for(let Re=0;Re<6;Re++)if(D.mipmaps&&D.mipmaps.length>0)for(let Ke=0;Ke<D.mipmaps.length;Ke++)Ae(ee.__webglFramebuffer[Re][Ke],z,D,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Re,Ke);else Ae(ee.__webglFramebuffer[Re],z,D,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Re,0);x(D)&&m(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(qe){for(let Re=0,Ke=me.length;Re<Ke;Re++){const Ue=me[Re],ge=n.get(Ue);let Ee=i.TEXTURE_2D;(z.isWebGL3DRenderTarget||z.isWebGLArrayRenderTarget)&&(Ee=z.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Ee,ge.__webglTexture),be(Ee,Ue),Ae(ee.__webglFramebuffer,z,Ue,i.COLOR_ATTACHMENT0+Re,Ee,0),x(Ue)&&m(Ee)}t.unbindTexture()}else{let Re=i.TEXTURE_2D;if((z.isWebGL3DRenderTarget||z.isWebGLArrayRenderTarget)&&(Re=z.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Re,de.__webglTexture),be(Re,D),D.mipmaps&&D.mipmaps.length>0)for(let Ke=0;Ke<D.mipmaps.length;Ke++)Ae(ee.__webglFramebuffer[Ke],z,D,i.COLOR_ATTACHMENT0,Re,Ke);else Ae(ee.__webglFramebuffer,z,D,i.COLOR_ATTACHMENT0,Re,0);x(D)&&m(Re),t.unbindTexture()}z.depthBuffer&&ut(z)}function Mt(z){const D=z.textures;for(let ee=0,de=D.length;ee<de;ee++){const me=D[ee];if(x(me)){const le=S(z),qe=n.get(me).__webglTexture;t.bindTexture(le,qe),m(le),t.unbindTexture()}}}const G=[],ft=[];function lt(z){if(z.samples>0){if(Oe(z)===!1){const D=z.textures,ee=z.width,de=z.height;let me=i.COLOR_BUFFER_BIT;const le=z.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,qe=n.get(z),Re=D.length>1;if(Re)for(let Ue=0;Ue<D.length;Ue++)t.bindFramebuffer(i.FRAMEBUFFER,qe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ue,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,qe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ue,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,qe.__webglMultisampledFramebuffer);const Ke=z.texture.mipmaps;Ke&&Ke.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,qe.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,qe.__webglFramebuffer);for(let Ue=0;Ue<D.length;Ue++){if(z.resolveDepthBuffer&&(z.depthBuffer&&(me|=i.DEPTH_BUFFER_BIT),z.stencilBuffer&&z.resolveStencilBuffer&&(me|=i.STENCIL_BUFFER_BIT)),Re){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,qe.__webglColorRenderbuffer[Ue]);const ge=n.get(D[Ue]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ge,0)}i.blitFramebuffer(0,0,ee,de,0,0,ee,de,me,i.NEAREST),c===!0&&(G.length=0,ft.length=0,G.push(i.COLOR_ATTACHMENT0+Ue),z.depthBuffer&&z.resolveDepthBuffer===!1&&(G.push(le),ft.push(le),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,ft)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,G))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Re)for(let Ue=0;Ue<D.length;Ue++){t.bindFramebuffer(i.FRAMEBUFFER,qe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ue,i.RENDERBUFFER,qe.__webglColorRenderbuffer[Ue]);const ge=n.get(D[Ue]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,qe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ue,i.TEXTURE_2D,ge,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,qe.__webglMultisampledFramebuffer)}else if(z.depthBuffer&&z.resolveDepthBuffer===!1&&c){const D=z.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[D])}}}function Rt(z){return Math.min(s.maxSamples,z.samples)}function Oe(z){const D=n.get(z);return z.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&D.__useRenderToTexture!==!1}function _t(z){const D=o.render.frame;h.get(z)!==D&&(h.set(z,D),z.update())}function Ge(z,D){const ee=z.colorSpace,de=z.format,me=z.type;return z.isCompressedTexture===!0||z.isVideoTexture===!0||ee!==Ds&&ee!==os&&(Et.getTransfer(ee)===Ft?(de!==fi||me!==bi)&&ot("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Xt("WebGLTextures: Unsupported texture color space:",ee)),D}function tt(z){return typeof HTMLImageElement<"u"&&z instanceof HTMLImageElement?(l.width=z.naturalWidth||z.width,l.height=z.naturalHeight||z.height):typeof VideoFrame<"u"&&z instanceof VideoFrame?(l.width=z.displayWidth,l.height=z.displayHeight):(l.width=z.width,l.height=z.height),l}this.allocateTextureUnit=C,this.resetTextureUnits=B,this.setTexture2D=k,this.setTexture2DArray=V,this.setTexture3D=q,this.setTextureCube=$,this.rebindTextures=At,this.setupRenderTarget=st,this.updateRenderTargetMipmap=Mt,this.updateMultisampleRenderTarget=lt,this.setupDepthRenderbuffer=ut,this.setupFrameBufferTexture=Ae,this.useMultisampledRTT=Oe}function nS(i,e){function t(n,s=os){let r;const o=Et.getTransfer(s);if(n===bi)return i.UNSIGNED_BYTE;if(n===Au)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ru)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Od)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Fd)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Ud)return i.BYTE;if(n===Nd)return i.SHORT;if(n===io)return i.UNSIGNED_SHORT;if(n===Tu)return i.INT;if(n===Is)return i.UNSIGNED_INT;if(n===ii)return i.FLOAT;if(n===_i)return i.HALF_FLOAT;if(n===Bd)return i.ALPHA;if(n===zd)return i.RGB;if(n===fi)return i.RGBA;if(n===ro)return i.DEPTH_COMPONENT;if(n===oo)return i.DEPTH_STENCIL;if(n===kd)return i.RED;if(n===Cu)return i.RED_INTEGER;if(n===Pu)return i.RG;if(n===Iu)return i.RG_INTEGER;if(n===Du)return i.RGBA_INTEGER;if(n===Sa||n===ba||n===wa||n===Ma)if(o===Ft)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Sa)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ba)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===wa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ma)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Sa)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ba)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===wa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ma)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Cl||n===Pl||n===Il||n===Dl)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Cl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Pl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Il)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Dl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ll||n===Ul||n===Nl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ll||n===Ul)return o===Ft?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Nl)return o===Ft?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ol||n===Fl||n===Bl||n===zl||n===kl||n===Vl||n===Hl||n===Gl||n===Wl||n===Xl||n===ql||n===$l||n===Yl||n===jl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ol)return o===Ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Fl)return o===Ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Bl)return o===Ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===zl)return o===Ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===kl)return o===Ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Vl)return o===Ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Hl)return o===Ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Gl)return o===Ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Wl)return o===Ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Xl)return o===Ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ql)return o===Ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===$l)return o===Ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Yl)return o===Ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===jl)return o===Ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Kl||n===Zl||n===Jl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Kl)return o===Ft?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Zl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Jl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ql||n===eu||n===tu||n===nu)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Ql)return r.COMPRESSED_RED_RGTC1_EXT;if(n===eu)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===tu)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===nu)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===so?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const iS=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,sS=`
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

}`;class rS{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new ip(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Gi({vertexShader:iS,fragmentShader:sS,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new It(new Wi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class oS extends Tr{constructor(e,t){super();const n=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,f=null,p=null,_=null;const y=typeof XRWebGLBinding<"u",x=new rS,m={},S=t.getContextAttributes();let b=null,w=null;const T=[],R=[],L=new it;let U=null;const E=new ti;E.viewport=new jt;const M=new ti;M.viewport=new jt;const N=[E,M],B=new Sg;let C=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(fe){let pe=T[fe];return pe===void 0&&(pe=new Ac,T[fe]=pe),pe.getTargetRaySpace()},this.getControllerGrip=function(fe){let pe=T[fe];return pe===void 0&&(pe=new Ac,T[fe]=pe),pe.getGripSpace()},this.getHand=function(fe){let pe=T[fe];return pe===void 0&&(pe=new Ac,T[fe]=pe),pe.getHandSpace()};function k(fe){const pe=R.indexOf(fe.inputSource);if(pe===-1)return;const Ae=T[pe];Ae!==void 0&&(Ae.update(fe.inputSource,fe.frame,l||o),Ae.dispatchEvent({type:fe.type,data:fe.inputSource}))}function V(){s.removeEventListener("select",k),s.removeEventListener("selectstart",k),s.removeEventListener("selectend",k),s.removeEventListener("squeeze",k),s.removeEventListener("squeezestart",k),s.removeEventListener("squeezeend",k),s.removeEventListener("end",V),s.removeEventListener("inputsourceschange",q);for(let fe=0;fe<T.length;fe++){const pe=R[fe];pe!==null&&(R[fe]=null,T[fe].disconnect(pe))}C=null,F=null,x.reset();for(const fe in m)delete m[fe];e.setRenderTarget(b),p=null,f=null,u=null,s=null,w=null,ct.stop(),n.isPresenting=!1,e.setPixelRatio(U),e.setSize(L.width,L.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(fe){r=fe,n.isPresenting===!0&&ot("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(fe){a=fe,n.isPresenting===!0&&ot("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(fe){l=fe},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return u===null&&y&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(fe){if(s=fe,s!==null){if(b=e.getRenderTarget(),s.addEventListener("select",k),s.addEventListener("selectstart",k),s.addEventListener("selectend",k),s.addEventListener("squeeze",k),s.addEventListener("squeezestart",k),s.addEventListener("squeezeend",k),s.addEventListener("end",V),s.addEventListener("inputsourceschange",q),S.xrCompatible!==!0&&await t.makeXRCompatible(),U=e.getPixelRatio(),e.getSize(L),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let Ae=null,je=null,Be=null;S.depth&&(Be=S.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Ae=S.stencil?oo:ro,je=S.stencil?so:Is);const ut={colorFormat:t.RGBA8,depthFormat:Be,scaleFactor:r};u=this.getBinding(),f=u.createProjectionLayer(ut),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),w=new Ls(f.textureWidth,f.textureHeight,{format:fi,type:bi,depthTexture:new np(f.textureWidth,f.textureHeight,je,void 0,void 0,void 0,void 0,void 0,void 0,Ae),stencilBuffer:S.stencil,colorSpace:e.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const Ae={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,Ae),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),w=new Ls(p.framebufferWidth,p.framebufferHeight,{format:fi,type:bi,colorSpace:e.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}w.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),ct.setContext(s),ct.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function q(fe){for(let pe=0;pe<fe.removed.length;pe++){const Ae=fe.removed[pe],je=R.indexOf(Ae);je>=0&&(R[je]=null,T[je].disconnect(Ae))}for(let pe=0;pe<fe.added.length;pe++){const Ae=fe.added[pe];let je=R.indexOf(Ae);if(je===-1){for(let ut=0;ut<T.length;ut++)if(ut>=R.length){R.push(Ae),je=ut;break}else if(R[ut]===null){R[ut]=Ae,je=ut;break}if(je===-1)break}const Be=T[je];Be&&Be.connect(Ae)}}const $=new P,ae=new P;function Q(fe,pe,Ae){$.setFromMatrixPosition(pe.matrixWorld),ae.setFromMatrixPosition(Ae.matrixWorld);const je=$.distanceTo(ae),Be=pe.projectionMatrix.elements,ut=Ae.projectionMatrix.elements,At=Be[14]/(Be[10]-1),st=Be[14]/(Be[10]+1),Mt=(Be[9]+1)/Be[5],G=(Be[9]-1)/Be[5],ft=(Be[8]-1)/Be[0],lt=(ut[8]+1)/ut[0],Rt=At*ft,Oe=At*lt,_t=je/(-ft+lt),Ge=_t*-ft;if(pe.matrixWorld.decompose(fe.position,fe.quaternion,fe.scale),fe.translateX(Ge),fe.translateZ(_t),fe.matrixWorld.compose(fe.position,fe.quaternion,fe.scale),fe.matrixWorldInverse.copy(fe.matrixWorld).invert(),Be[10]===-1)fe.projectionMatrix.copy(pe.projectionMatrix),fe.projectionMatrixInverse.copy(pe.projectionMatrixInverse);else{const tt=At+_t,z=st+_t,D=Rt-Ge,ee=Oe+(je-Ge),de=Mt*st/z*tt,me=G*st/z*tt;fe.projectionMatrix.makePerspective(D,ee,de,me,tt,z),fe.projectionMatrixInverse.copy(fe.projectionMatrix).invert()}}function xe(fe,pe){pe===null?fe.matrixWorld.copy(fe.matrix):fe.matrixWorld.multiplyMatrices(pe.matrixWorld,fe.matrix),fe.matrixWorldInverse.copy(fe.matrixWorld).invert()}this.updateCamera=function(fe){if(s===null)return;let pe=fe.near,Ae=fe.far;x.texture!==null&&(x.depthNear>0&&(pe=x.depthNear),x.depthFar>0&&(Ae=x.depthFar)),B.near=M.near=E.near=pe,B.far=M.far=E.far=Ae,(C!==B.near||F!==B.far)&&(s.updateRenderState({depthNear:B.near,depthFar:B.far}),C=B.near,F=B.far),B.layers.mask=fe.layers.mask|6,E.layers.mask=B.layers.mask&3,M.layers.mask=B.layers.mask&5;const je=fe.parent,Be=B.cameras;xe(B,je);for(let ut=0;ut<Be.length;ut++)xe(Be[ut],je);Be.length===2?Q(B,E,M):B.projectionMatrix.copy(E.projectionMatrix),be(fe,B,je)};function be(fe,pe,Ae){Ae===null?fe.matrix.copy(pe.matrixWorld):(fe.matrix.copy(Ae.matrixWorld),fe.matrix.invert(),fe.matrix.multiply(pe.matrixWorld)),fe.matrix.decompose(fe.position,fe.quaternion,fe.scale),fe.updateMatrixWorld(!0),fe.projectionMatrix.copy(pe.projectionMatrix),fe.projectionMatrixInverse.copy(pe.projectionMatrixInverse),fe.isPerspectiveCamera&&(fe.fov=co*2*Math.atan(1/fe.projectionMatrix.elements[5]),fe.zoom=1)}this.getCamera=function(){return B},this.getFoveation=function(){if(!(f===null&&p===null))return c},this.setFoveation=function(fe){c=fe,f!==null&&(f.fixedFoveation=fe),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=fe)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(B)},this.getCameraTexture=function(fe){return m[fe]};let He=null;function Je(fe,pe){if(h=pe.getViewerPose(l||o),_=pe,h!==null){const Ae=h.views;p!==null&&(e.setRenderTargetFramebuffer(w,p.framebuffer),e.setRenderTarget(w));let je=!1;Ae.length!==B.cameras.length&&(B.cameras.length=0,je=!0);for(let st=0;st<Ae.length;st++){const Mt=Ae[st];let G=null;if(p!==null)G=p.getViewport(Mt);else{const lt=u.getViewSubImage(f,Mt);G=lt.viewport,st===0&&(e.setRenderTargetTextures(w,lt.colorTexture,lt.depthStencilTexture),e.setRenderTarget(w))}let ft=N[st];ft===void 0&&(ft=new ti,ft.layers.enable(st),ft.viewport=new jt,N[st]=ft),ft.matrix.fromArray(Mt.transform.matrix),ft.matrix.decompose(ft.position,ft.quaternion,ft.scale),ft.projectionMatrix.fromArray(Mt.projectionMatrix),ft.projectionMatrixInverse.copy(ft.projectionMatrix).invert(),ft.viewport.set(G.x,G.y,G.width,G.height),st===0&&(B.matrix.copy(ft.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale)),je===!0&&B.cameras.push(ft)}const Be=s.enabledFeatures;if(Be&&Be.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&y){u=n.getBinding();const st=u.getDepthInformation(Ae[0]);st&&st.isValid&&st.texture&&x.init(st,s.renderState)}if(Be&&Be.includes("camera-access")&&y){e.state.unbindTexture(),u=n.getBinding();for(let st=0;st<Ae.length;st++){const Mt=Ae[st].camera;if(Mt){let G=m[Mt];G||(G=new ip,m[Mt]=G);const ft=u.getCameraImage(Mt);G.sourceTexture=ft}}}}for(let Ae=0;Ae<T.length;Ae++){const je=R[Ae],Be=T[Ae];je!==null&&Be!==void 0&&Be.update(je,pe,l||o)}He&&He(fe,pe),pe.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:pe}),_=null}const ct=new ap;ct.setAnimationLoop(Je),this.setAnimationLoop=function(fe){He=fe},this.dispose=function(){}}}const Ms=new wi,aS=new Tt;function cS(i,e){function t(x,m){x.matrixAutoUpdate===!0&&x.updateMatrix(),m.value.copy(x.matrix)}function n(x,m){m.color.getRGB(x.fogColor.value,Yd(i)),m.isFog?(x.fogNear.value=m.near,x.fogFar.value=m.far):m.isFogExp2&&(x.fogDensity.value=m.density)}function s(x,m,S,b,w){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(x,m):m.isMeshToonMaterial?(r(x,m),u(x,m)):m.isMeshPhongMaterial?(r(x,m),h(x,m)):m.isMeshStandardMaterial?(r(x,m),f(x,m),m.isMeshPhysicalMaterial&&p(x,m,w)):m.isMeshMatcapMaterial?(r(x,m),_(x,m)):m.isMeshDepthMaterial?r(x,m):m.isMeshDistanceMaterial?(r(x,m),y(x,m)):m.isMeshNormalMaterial?r(x,m):m.isLineBasicMaterial?(o(x,m),m.isLineDashedMaterial&&a(x,m)):m.isPointsMaterial?c(x,m,S,b):m.isSpriteMaterial?l(x,m):m.isShadowMaterial?(x.color.value.copy(m.color),x.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(x,m){x.opacity.value=m.opacity,m.color&&x.diffuse.value.copy(m.color),m.emissive&&x.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(x.map.value=m.map,t(m.map,x.mapTransform)),m.alphaMap&&(x.alphaMap.value=m.alphaMap,t(m.alphaMap,x.alphaMapTransform)),m.bumpMap&&(x.bumpMap.value=m.bumpMap,t(m.bumpMap,x.bumpMapTransform),x.bumpScale.value=m.bumpScale,m.side===Ln&&(x.bumpScale.value*=-1)),m.normalMap&&(x.normalMap.value=m.normalMap,t(m.normalMap,x.normalMapTransform),x.normalScale.value.copy(m.normalScale),m.side===Ln&&x.normalScale.value.negate()),m.displacementMap&&(x.displacementMap.value=m.displacementMap,t(m.displacementMap,x.displacementMapTransform),x.displacementScale.value=m.displacementScale,x.displacementBias.value=m.displacementBias),m.emissiveMap&&(x.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,x.emissiveMapTransform)),m.specularMap&&(x.specularMap.value=m.specularMap,t(m.specularMap,x.specularMapTransform)),m.alphaTest>0&&(x.alphaTest.value=m.alphaTest);const S=e.get(m),b=S.envMap,w=S.envMapRotation;b&&(x.envMap.value=b,Ms.copy(w),Ms.x*=-1,Ms.y*=-1,Ms.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(Ms.y*=-1,Ms.z*=-1),x.envMapRotation.value.setFromMatrix4(aS.makeRotationFromEuler(Ms)),x.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,x.reflectivity.value=m.reflectivity,x.ior.value=m.ior,x.refractionRatio.value=m.refractionRatio),m.lightMap&&(x.lightMap.value=m.lightMap,x.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,x.lightMapTransform)),m.aoMap&&(x.aoMap.value=m.aoMap,x.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,x.aoMapTransform))}function o(x,m){x.diffuse.value.copy(m.color),x.opacity.value=m.opacity,m.map&&(x.map.value=m.map,t(m.map,x.mapTransform))}function a(x,m){x.dashSize.value=m.dashSize,x.totalSize.value=m.dashSize+m.gapSize,x.scale.value=m.scale}function c(x,m,S,b){x.diffuse.value.copy(m.color),x.opacity.value=m.opacity,x.size.value=m.size*S,x.scale.value=b*.5,m.map&&(x.map.value=m.map,t(m.map,x.uvTransform)),m.alphaMap&&(x.alphaMap.value=m.alphaMap,t(m.alphaMap,x.alphaMapTransform)),m.alphaTest>0&&(x.alphaTest.value=m.alphaTest)}function l(x,m){x.diffuse.value.copy(m.color),x.opacity.value=m.opacity,x.rotation.value=m.rotation,m.map&&(x.map.value=m.map,t(m.map,x.mapTransform)),m.alphaMap&&(x.alphaMap.value=m.alphaMap,t(m.alphaMap,x.alphaMapTransform)),m.alphaTest>0&&(x.alphaTest.value=m.alphaTest)}function h(x,m){x.specular.value.copy(m.specular),x.shininess.value=Math.max(m.shininess,1e-4)}function u(x,m){m.gradientMap&&(x.gradientMap.value=m.gradientMap)}function f(x,m){x.metalness.value=m.metalness,m.metalnessMap&&(x.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,x.metalnessMapTransform)),x.roughness.value=m.roughness,m.roughnessMap&&(x.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,x.roughnessMapTransform)),m.envMap&&(x.envMapIntensity.value=m.envMapIntensity)}function p(x,m,S){x.ior.value=m.ior,m.sheen>0&&(x.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),x.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(x.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,x.sheenColorMapTransform)),m.sheenRoughnessMap&&(x.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,x.sheenRoughnessMapTransform))),m.clearcoat>0&&(x.clearcoat.value=m.clearcoat,x.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(x.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,x.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(x.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,x.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(x.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,x.clearcoatNormalMapTransform),x.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Ln&&x.clearcoatNormalScale.value.negate())),m.dispersion>0&&(x.dispersion.value=m.dispersion),m.iridescence>0&&(x.iridescence.value=m.iridescence,x.iridescenceIOR.value=m.iridescenceIOR,x.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],x.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(x.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,x.iridescenceMapTransform)),m.iridescenceThicknessMap&&(x.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,x.iridescenceThicknessMapTransform))),m.transmission>0&&(x.transmission.value=m.transmission,x.transmissionSamplerMap.value=S.texture,x.transmissionSamplerSize.value.set(S.width,S.height),m.transmissionMap&&(x.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,x.transmissionMapTransform)),x.thickness.value=m.thickness,m.thicknessMap&&(x.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,x.thicknessMapTransform)),x.attenuationDistance.value=m.attenuationDistance,x.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(x.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(x.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,x.anisotropyMapTransform))),x.specularIntensity.value=m.specularIntensity,x.specularColor.value.copy(m.specularColor),m.specularColorMap&&(x.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,x.specularColorMapTransform)),m.specularIntensityMap&&(x.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,x.specularIntensityMapTransform))}function _(x,m){m.matcap&&(x.matcap.value=m.matcap)}function y(x,m){const S=e.get(m).light;x.referencePosition.value.setFromMatrixPosition(S.matrixWorld),x.nearDistance.value=S.shadow.camera.near,x.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function lS(i,e,t,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(S,b){const w=b.program;n.uniformBlockBinding(S,w)}function l(S,b){let w=s[S.id];w===void 0&&(_(S),w=h(S),s[S.id]=w,S.addEventListener("dispose",x));const T=b.program;n.updateUBOMapping(S,T);const R=e.render.frame;r[S.id]!==R&&(f(S),r[S.id]=R)}function h(S){const b=u();S.__bindingPointIndex=b;const w=i.createBuffer(),T=S.__size,R=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,w),i.bufferData(i.UNIFORM_BUFFER,T,R),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,b,w),w}function u(){for(let S=0;S<a;S++)if(o.indexOf(S)===-1)return o.push(S),S;return Xt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(S){const b=s[S.id],w=S.uniforms,T=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,b);for(let R=0,L=w.length;R<L;R++){const U=Array.isArray(w[R])?w[R]:[w[R]];for(let E=0,M=U.length;E<M;E++){const N=U[E];if(p(N,R,E,T)===!0){const B=N.__offset,C=Array.isArray(N.value)?N.value:[N.value];let F=0;for(let k=0;k<C.length;k++){const V=C[k],q=y(V);typeof V=="number"||typeof V=="boolean"?(N.__data[0]=V,i.bufferSubData(i.UNIFORM_BUFFER,B+F,N.__data)):V.isMatrix3?(N.__data[0]=V.elements[0],N.__data[1]=V.elements[1],N.__data[2]=V.elements[2],N.__data[3]=0,N.__data[4]=V.elements[3],N.__data[5]=V.elements[4],N.__data[6]=V.elements[5],N.__data[7]=0,N.__data[8]=V.elements[6],N.__data[9]=V.elements[7],N.__data[10]=V.elements[8],N.__data[11]=0):(V.toArray(N.__data,F),F+=q.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,B,N.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(S,b,w,T){const R=S.value,L=b+"_"+w;if(T[L]===void 0)return typeof R=="number"||typeof R=="boolean"?T[L]=R:T[L]=R.clone(),!0;{const U=T[L];if(typeof R=="number"||typeof R=="boolean"){if(U!==R)return T[L]=R,!0}else if(U.equals(R)===!1)return U.copy(R),!0}return!1}function _(S){const b=S.uniforms;let w=0;const T=16;for(let L=0,U=b.length;L<U;L++){const E=Array.isArray(b[L])?b[L]:[b[L]];for(let M=0,N=E.length;M<N;M++){const B=E[M],C=Array.isArray(B.value)?B.value:[B.value];for(let F=0,k=C.length;F<k;F++){const V=C[F],q=y(V),$=w%T,ae=$%q.boundary,Q=$+ae;w+=ae,Q!==0&&T-Q<q.storage&&(w+=T-Q),B.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=w,w+=q.storage}}}const R=w%T;return R>0&&(w+=T-R),S.__size=w,S.__cache={},this}function y(S){const b={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(b.boundary=4,b.storage=4):S.isVector2?(b.boundary=8,b.storage=8):S.isVector3||S.isColor?(b.boundary=16,b.storage=12):S.isVector4?(b.boundary=16,b.storage=16):S.isMatrix3?(b.boundary=48,b.storage=48):S.isMatrix4?(b.boundary=64,b.storage=64):S.isTexture?ot("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ot("WebGLRenderer: Unsupported uniform value type.",S),b}function x(S){const b=S.target;b.removeEventListener("dispose",x);const w=o.indexOf(b.__bindingPointIndex);o.splice(w,1),i.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function m(){for(const S in s)i.deleteBuffer(s[S]);o=[],s={},r={}}return{bind:c,update:l,dispose:m}}const uS=new Uint16Array([11481,15204,11534,15171,11808,15015,12385,14843,12894,14716,13396,14600,13693,14483,13976,14366,14237,14171,14405,13961,14511,13770,14605,13598,14687,13444,14760,13305,14822,13066,14876,12857,14923,12675,14963,12517,14997,12379,15025,12230,15049,12023,15070,11843,15086,11687,15100,11551,15111,11433,15120,11330,15127,11217,15132,11060,15135,10922,15138,10801,15139,10695,15139,10600,13012,14923,13020,14917,13064,14886,13176,14800,13349,14666,13513,14526,13724,14398,13960,14230,14200,14020,14383,13827,14488,13651,14583,13491,14667,13348,14740,13132,14803,12908,14856,12713,14901,12542,14938,12394,14968,12241,14992,12017,15010,11822,15024,11654,15034,11507,15041,11380,15044,11269,15044,11081,15042,10913,15037,10764,15031,10635,15023,10520,15014,10419,15003,10330,13657,14676,13658,14673,13670,14660,13698,14622,13750,14547,13834,14442,13956,14317,14112,14093,14291,13889,14407,13704,14499,13538,14586,13389,14664,13201,14733,12966,14792,12758,14842,12577,14882,12418,14915,12272,14940,12033,14959,11826,14972,11646,14980,11490,14983,11355,14983,11212,14979,11008,14971,10830,14961,10675,14950,10540,14936,10420,14923,10315,14909,10204,14894,10041,14089,14460,14090,14459,14096,14452,14112,14431,14141,14388,14186,14305,14252,14130,14341,13941,14399,13756,14467,13585,14539,13430,14610,13272,14677,13026,14737,12808,14790,12617,14833,12449,14869,12303,14896,12065,14916,11845,14929,11655,14937,11490,14939,11347,14936,11184,14930,10970,14921,10783,14912,10621,14900,10480,14885,10356,14867,10247,14848,10062,14827,9894,14805,9745,14400,14208,14400,14206,14402,14198,14406,14174,14415,14122,14427,14035,14444,13913,14469,13767,14504,13613,14548,13463,14598,13324,14651,13082,14704,12858,14752,12658,14795,12483,14831,12330,14860,12106,14881,11875,14895,11675,14903,11501,14905,11351,14903,11178,14900,10953,14892,10757,14880,10589,14865,10442,14847,10313,14827,10162,14805,9965,14782,9792,14757,9642,14731,9507,14562,13883,14562,13883,14563,13877,14566,13862,14570,13830,14576,13773,14584,13689,14595,13582,14613,13461,14637,13336,14668,13120,14704,12897,14741,12695,14776,12516,14808,12358,14835,12150,14856,11910,14870,11701,14878,11519,14882,11361,14884,11187,14880,10951,14871,10748,14858,10572,14842,10418,14823,10286,14801,10099,14777,9897,14751,9722,14725,9567,14696,9430,14666,9309,14702,13604,14702,13604,14702,13600,14703,13591,14705,13570,14707,13533,14709,13477,14712,13400,14718,13305,14727,13106,14743,12907,14762,12716,14784,12539,14807,12380,14827,12190,14844,11943,14855,11727,14863,11539,14870,11376,14871,11204,14868,10960,14858,10748,14845,10565,14829,10406,14809,10269,14786,10058,14761,9852,14734,9671,14705,9512,14674,9374,14641,9253,14608,9076,14821,13366,14821,13365,14821,13364,14821,13358,14821,13344,14821,13320,14819,13252,14817,13145,14815,13011,14814,12858,14817,12698,14823,12539,14832,12389,14841,12214,14850,11968,14856,11750,14861,11558,14866,11390,14867,11226,14862,10972,14853,10754,14840,10565,14823,10401,14803,10259,14780,10032,14754,9820,14725,9635,14694,9473,14661,9333,14627,9203,14593,8988,14557,8798,14923,13014,14922,13014,14922,13012,14922,13004,14920,12987,14919,12957,14915,12907,14909,12834,14902,12738,14894,12623,14888,12498,14883,12370,14880,12203,14878,11970,14875,11759,14873,11569,14874,11401,14872,11243,14865,10986,14855,10762,14842,10568,14825,10401,14804,10255,14781,10017,14754,9799,14725,9611,14692,9445,14658,9301,14623,9139,14587,8920,14548,8729,14509,8562,15008,12672,15008,12672,15008,12671,15007,12667,15005,12656,15001,12637,14997,12605,14989,12556,14978,12490,14966,12407,14953,12313,14940,12136,14927,11934,14914,11742,14903,11563,14896,11401,14889,11247,14879,10992,14866,10767,14851,10570,14833,10400,14812,10252,14789,10007,14761,9784,14731,9592,14698,9424,14663,9279,14627,9088,14588,8868,14548,8676,14508,8508,14467,8360,15080,12386,15080,12386,15079,12385,15078,12383,15076,12378,15072,12367,15066,12347,15057,12315,15045,12253,15030,12138,15012,11998,14993,11845,14972,11685,14951,11530,14935,11383,14920,11228,14904,10981,14887,10762,14870,10567,14850,10397,14827,10248,14803,9997,14774,9771,14743,9578,14710,9407,14674,9259,14637,9048,14596,8826,14555,8632,14514,8464,14471,8317,14427,8182,15139,12008,15139,12008,15138,12008,15137,12007,15135,12003,15130,11990,15124,11969,15115,11929,15102,11872,15086,11794,15064,11693,15041,11581,15013,11459,14987,11336,14966,11170,14944,10944,14921,10738,14898,10552,14875,10387,14850,10239,14824,9983,14794,9758,14762,9563,14728,9392,14692,9244,14653,9014,14611,8791,14569,8597,14526,8427,14481,8281,14436,8110,14391,7885,15188,11617,15188,11617,15187,11617,15186,11618,15183,11617,15179,11612,15173,11601,15163,11581,15150,11546,15133,11495,15110,11427,15083,11346,15051,11246,15024,11057,14996,10868,14967,10687,14938,10517,14911,10362,14882,10206,14853,9956,14821,9737,14787,9543,14752,9375,14715,9228,14675,8980,14632,8760,14589,8565,14544,8395,14498,8248,14451,8049,14404,7824,14357,7630,15228,11298,15228,11298,15227,11299,15226,11301,15223,11303,15219,11302,15213,11299,15204,11290,15191,11271,15174,11217,15150,11129,15119,11015,15087,10886,15057,10744,15024,10599,14990,10455,14957,10318,14924,10143,14891,9911,14856,9701,14820,9516,14782,9352,14744,9200,14703,8946,14659,8725,14615,8533,14568,8366,14521,8220,14472,7992,14423,7770,14374,7578,14315,7408,15260,10819,15260,10819,15259,10822,15258,10826,15256,10832,15251,10836,15246,10841,15237,10838,15225,10821,15207,10788,15183,10734,15151,10660,15120,10571,15087,10469,15049,10359,15012,10249,14974,10041,14937,9837,14900,9647,14860,9475,14820,9320,14779,9147,14736,8902,14691,8688,14646,8499,14598,8335,14549,8189,14499,7940,14448,7720,14397,7529,14347,7363,14256,7218,15285,10410,15285,10411,15285,10413,15284,10418,15282,10425,15278,10434,15272,10442,15264,10449,15252,10445,15235,10433,15210,10403,15179,10358,15149,10301,15113,10218,15073,10059,15033,9894,14991,9726,14951,9565,14909,9413,14865,9273,14822,9073,14777,8845,14730,8641,14682,8459,14633,8300,14583,8129,14531,7883,14479,7670,14426,7482,14373,7321,14305,7176,14201,6939,15305,9939,15305,9940,15305,9945,15304,9955,15302,9967,15298,9989,15293,10010,15286,10033,15274,10044,15258,10045,15233,10022,15205,9975,15174,9903,15136,9808,15095,9697,15053,9578,15009,9451,14965,9327,14918,9198,14871,8973,14825,8766,14775,8579,14725,8408,14675,8259,14622,8058,14569,7821,14515,7615,14460,7435,14405,7276,14350,7108,14256,6866,14149,6653,15321,9444,15321,9445,15321,9448,15320,9458,15317,9470,15314,9490,15310,9515,15302,9540,15292,9562,15276,9579,15251,9577,15226,9559,15195,9519,15156,9463,15116,9389,15071,9304,15025,9208,14978,9023,14927,8838,14878,8661,14827,8496,14774,8344,14722,8206,14667,7973,14612,7749,14556,7555,14499,7382,14443,7229,14385,7025,14322,6791,14210,6588,14100,6409,15333,8920,15333,8921,15332,8927,15332,8943,15329,8965,15326,9002,15322,9048,15316,9106,15307,9162,15291,9204,15267,9221,15244,9221,15212,9196,15175,9134,15133,9043,15088,8930,15040,8801,14990,8665,14938,8526,14886,8391,14830,8261,14775,8087,14719,7866,14661,7664,14603,7482,14544,7322,14485,7178,14426,6936,14367,6713,14281,6517,14166,6348,14054,6198,15341,8360,15341,8361,15341,8366,15341,8379,15339,8399,15336,8431,15332,8473,15326,8527,15318,8585,15302,8632,15281,8670,15258,8690,15227,8690,15191,8664,15149,8612,15104,8543,15055,8456,15001,8360,14948,8259,14892,8122,14834,7923,14776,7734,14716,7558,14656,7397,14595,7250,14534,7070,14472,6835,14410,6628,14350,6443,14243,6283,14125,6135,14010,5889,15348,7715,15348,7717,15348,7725,15347,7745,15345,7780,15343,7836,15339,7905,15334,8e3,15326,8103,15310,8193,15293,8239,15270,8270,15240,8287,15204,8283,15163,8260,15118,8223,15067,8143,15014,8014,14958,7873,14899,7723,14839,7573,14778,7430,14715,7293,14652,7164,14588,6931,14524,6720,14460,6531,14396,6362,14330,6210,14207,6015,14086,5781,13969,5576,15352,7114,15352,7116,15352,7128,15352,7159,15350,7195,15348,7237,15345,7299,15340,7374,15332,7457,15317,7544,15301,7633,15280,7703,15251,7754,15216,7775,15176,7767,15131,7733,15079,7670,15026,7588,14967,7492,14906,7387,14844,7278,14779,7171,14714,6965,14648,6770,14581,6587,14515,6420,14448,6269,14382,6123,14299,5881,14172,5665,14049,5477,13929,5310,15355,6329,15355,6330,15355,6339,15355,6362,15353,6410,15351,6472,15349,6572,15344,6688,15337,6835,15323,6985,15309,7142,15287,7220,15260,7277,15226,7310,15188,7326,15142,7318,15090,7285,15036,7239,14976,7177,14914,7045,14849,6892,14782,6736,14714,6581,14645,6433,14576,6293,14506,6164,14438,5946,14369,5733,14270,5540,14140,5369,14014,5216,13892,5043,15357,5483,15357,5484,15357,5496,15357,5528,15356,5597,15354,5692,15351,5835,15347,6011,15339,6195,15328,6317,15314,6446,15293,6566,15268,6668,15235,6746,15197,6796,15152,6811,15101,6790,15046,6748,14985,6673,14921,6583,14854,6479,14785,6371,14714,6259,14643,6149,14571,5946,14499,5750,14428,5567,14358,5401,14242,5250,14109,5111,13980,4870,13856,4657,15359,4555,15359,4557,15358,4573,15358,4633,15357,4715,15355,4841,15353,5061,15349,5216,15342,5391,15331,5577,15318,5770,15299,5967,15274,6150,15243,6223,15206,6280,15161,6310,15111,6317,15055,6300,14994,6262,14928,6208,14860,6141,14788,5994,14715,5838,14641,5684,14566,5529,14492,5384,14418,5247,14346,5121,14216,4892,14079,4682,13948,4496,13822,4330,15359,3498,15359,3501,15359,3520,15359,3598,15358,3719,15356,3860,15355,4137,15351,4305,15344,4563,15334,4809,15321,5116,15303,5273,15280,5418,15250,5547,15214,5653,15170,5722,15120,5761,15064,5763,15002,5733,14935,5673,14865,5597,14792,5504,14716,5400,14640,5294,14563,5185,14486,5041,14410,4841,14335,4655,14191,4482,14051,4325,13918,4183,13790,4012,15360,2282,15360,2285,15360,2306,15360,2401,15359,2547,15357,2748,15355,3103,15352,3349,15345,3675,15336,4020,15324,4272,15307,4496,15285,4716,15255,4908,15220,5086,15178,5170,15128,5214,15072,5234,15010,5231,14943,5206,14871,5166,14796,5102,14718,4971,14639,4833,14559,4687,14480,4541,14402,4401,14315,4268,14167,4142,14025,3958,13888,3747,13759,3556,15360,923,15360,925,15360,946,15360,1052,15359,1214,15357,1494,15356,1892,15352,2274,15346,2663,15338,3099,15326,3393,15309,3679,15288,3980,15260,4183,15226,4325,15185,4437,15136,4517,15080,4570,15018,4591,14950,4581,14877,4545,14800,4485,14720,4411,14638,4325,14556,4231,14475,4136,14395,3988,14297,3803,14145,3628,13999,3465,13861,3314,13729,3177,15360,263,15360,264,15360,272,15360,325,15359,407,15358,548,15356,780,15352,1144,15347,1580,15339,2099,15328,2425,15312,2795,15292,3133,15264,3329,15232,3517,15191,3689,15143,3819,15088,3923,15025,3978,14956,3999,14882,3979,14804,3931,14722,3855,14639,3756,14554,3645,14470,3529,14388,3409,14279,3289,14124,3173,13975,3055,13834,2848,13701,2658,15360,49,15360,49,15360,52,15360,75,15359,111,15358,201,15356,283,15353,519,15348,726,15340,1045,15329,1415,15314,1795,15295,2173,15269,2410,15237,2649,15197,2866,15150,3054,15095,3140,15032,3196,14963,3228,14888,3236,14808,3224,14725,3191,14639,3146,14553,3088,14466,2976,14382,2836,14262,2692,14103,2549,13952,2409,13808,2278,13674,2154,15360,4,15360,4,15360,4,15360,13,15359,33,15358,59,15357,112,15353,199,15348,302,15341,456,15331,628,15316,827,15297,1082,15272,1332,15241,1601,15202,1851,15156,2069,15101,2172,15039,2256,14970,2314,14894,2348,14813,2358,14728,2344,14640,2311,14551,2263,14463,2203,14376,2133,14247,2059,14084,1915,13930,1761,13784,1609,13648,1464,15360,0,15360,0,15360,0,15360,3,15359,18,15358,26,15357,53,15354,80,15348,97,15341,165,15332,238,15318,326,15299,427,15275,529,15245,654,15207,771,15161,885,15108,994,15046,1089,14976,1170,14900,1229,14817,1266,14731,1284,14641,1282,14550,1260,14460,1223,14370,1174,14232,1116,14066,1050,13909,981,13761,910,13623,839]);let Di=null;function hS(){return Di===null&&(Di=new Qd(uS,32,32,Pu,_i),Di.minFilter=xn,Di.magFilter=xn,Di.wrapS=hi,Di.wrapT=hi,Di.generateMipmaps=!1,Di.needsUpdate=!0),Di}class fS{constructor(e={}){const{canvas:t=fm(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;const _=new Set([Du,Iu,Cu]),y=new Set([bi,Is,io,so,Au,Ru]),x=new Uint32Array(4),m=new Int32Array(4);let S=null,b=null;const w=[],T=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=fs,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const R=this;let L=!1;this._outputColorSpace=$n;let U=0,E=0,M=null,N=-1,B=null;const C=new jt,F=new jt;let k=null;const V=new xt(0);let q=0,$=t.width,ae=t.height,Q=1,xe=null,be=null;const He=new jt(0,0,$,ae),Je=new jt(0,0,$,ae);let ct=!1;const fe=new Fu;let pe=!1,Ae=!1;const je=new Tt,Be=new P,ut=new jt,At={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let st=!1;function Mt(){return M===null?Q:1}let G=n;function ft(O,Z){return t.getContext(O,Z)}try{const O={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ho}`),t.addEventListener("webglcontextlost",_e,!1),t.addEventListener("webglcontextrestored",he,!1),t.addEventListener("webglcontextcreationerror",ke,!1),G===null){const Z="webgl2";if(G=ft(Z,O),G===null)throw ft(Z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(O){throw O("WebGLRenderer: "+O.message),O}let lt,Rt,Oe,_t,Ge,tt,z,D,ee,de,me,le,qe,Re,Ke,Ue,ge,Ee,We,Ye,Ne,$e,W,Ce;function ye(){lt=new vy(G),lt.init(),$e=new nS(G,lt),Rt=new hy(G,lt,e,$e),Oe=new eS(G,lt),Rt.reversedDepthBuffer&&f&&Oe.buffers.depth.setReversed(!0),_t=new wy(G),Ge=new Vv,tt=new tS(G,lt,Oe,Ge,Rt,$e,_t),z=new dy(R),D=new yy(R),ee=new Ag(G),W=new ly(G,ee),de=new Sy(G,ee,_t,W),me=new Ey(G,de,ee,_t),We=new My(G,Rt,tt),Ue=new fy(Ge),le=new kv(R,z,D,lt,Rt,W,Ue),qe=new cS(R,Ge),Re=new Gv,Ke=new jv(lt),Ee=new cy(R,z,D,Oe,me,p,c),ge=new Jv(R,me,Rt),Ce=new lS(G,_t,Rt,Oe),Ye=new uy(G,lt,_t),Ne=new by(G,lt,_t),_t.programs=le.programs,R.capabilities=Rt,R.extensions=lt,R.properties=Ge,R.renderLists=Re,R.shadowMap=ge,R.state=Oe,R.info=_t}ye();const Se=new oS(R,G);this.xr=Se,this.getContext=function(){return G},this.getContextAttributes=function(){return G.getContextAttributes()},this.forceContextLoss=function(){const O=lt.get("WEBGL_lose_context");O&&O.loseContext()},this.forceContextRestore=function(){const O=lt.get("WEBGL_lose_context");O&&O.restoreContext()},this.getPixelRatio=function(){return Q},this.setPixelRatio=function(O){O!==void 0&&(Q=O,this.setSize($,ae,!1))},this.getSize=function(O){return O.set($,ae)},this.setSize=function(O,Z,se=!0){if(Se.isPresenting){ot("WebGLRenderer: Can't change size while VR device is presenting.");return}$=O,ae=Z,t.width=Math.floor(O*Q),t.height=Math.floor(Z*Q),se===!0&&(t.style.width=O+"px",t.style.height=Z+"px"),this.setViewport(0,0,O,Z)},this.getDrawingBufferSize=function(O){return O.set($*Q,ae*Q).floor()},this.setDrawingBufferSize=function(O,Z,se){$=O,ae=Z,Q=se,t.width=Math.floor(O*se),t.height=Math.floor(Z*se),this.setViewport(0,0,O,Z)},this.getCurrentViewport=function(O){return O.copy(C)},this.getViewport=function(O){return O.copy(He)},this.setViewport=function(O,Z,se,ie){O.isVector4?He.set(O.x,O.y,O.z,O.w):He.set(O,Z,se,ie),Oe.viewport(C.copy(He).multiplyScalar(Q).round())},this.getScissor=function(O){return O.copy(Je)},this.setScissor=function(O,Z,se,ie){O.isVector4?Je.set(O.x,O.y,O.z,O.w):Je.set(O,Z,se,ie),Oe.scissor(F.copy(Je).multiplyScalar(Q).round())},this.getScissorTest=function(){return ct},this.setScissorTest=function(O){Oe.setScissorTest(ct=O)},this.setOpaqueSort=function(O){xe=O},this.setTransparentSort=function(O){be=O},this.getClearColor=function(O){return O.copy(Ee.getClearColor())},this.setClearColor=function(){Ee.setClearColor(...arguments)},this.getClearAlpha=function(){return Ee.getClearAlpha()},this.setClearAlpha=function(){Ee.setClearAlpha(...arguments)},this.clear=function(O=!0,Z=!0,se=!0){let ie=0;if(O){let J=!1;if(M!==null){const we=M.texture.format;J=_.has(we)}if(J){const we=M.texture.type,Te=y.has(we),Ve=Ee.getClearColor(),Fe=Ee.getClearAlpha(),et=Ve.r,nt=Ve.g,Xe=Ve.b;Te?(x[0]=et,x[1]=nt,x[2]=Xe,x[3]=Fe,G.clearBufferuiv(G.COLOR,0,x)):(m[0]=et,m[1]=nt,m[2]=Xe,m[3]=Fe,G.clearBufferiv(G.COLOR,0,m))}else ie|=G.COLOR_BUFFER_BIT}Z&&(ie|=G.DEPTH_BUFFER_BIT),se&&(ie|=G.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G.clear(ie)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",_e,!1),t.removeEventListener("webglcontextrestored",he,!1),t.removeEventListener("webglcontextcreationerror",ke,!1),Ee.dispose(),Re.dispose(),Ke.dispose(),Ge.dispose(),z.dispose(),D.dispose(),me.dispose(),W.dispose(),Ce.dispose(),le.dispose(),Se.dispose(),Se.removeEventListener("sessionstart",Ns),Se.removeEventListener("sessionend",Cr),jn.stop()};function _e(O){O.preventDefault(),La("WebGLRenderer: Context Lost."),L=!0}function he(){La("WebGLRenderer: Context Restored."),L=!1;const O=_t.autoReset,Z=ge.enabled,se=ge.autoUpdate,ie=ge.needsUpdate,J=ge.type;ye(),_t.autoReset=O,ge.enabled=Z,ge.autoUpdate=se,ge.needsUpdate=ie,ge.type=J}function ke(O){Xt("WebGLRenderer: A WebGL context could not be created. Reason: ",O.statusMessage)}function Qe(O){const Z=O.target;Z.removeEventListener("dispose",Qe),Lt(Z)}function Lt(O){Ct(O),Ge.remove(O)}function Ct(O){const Z=Ge.get(O).programs;Z!==void 0&&(Z.forEach(function(se){le.releaseProgram(se)}),O.isShaderMaterial&&le.releaseShaderCache(O))}this.renderBufferDirect=function(O,Z,se,ie,J,we){Z===null&&(Z=At);const Te=J.isMesh&&J.matrixWorld.determinant()<0,Ve=vo(O,Z,se,ie,J);Oe.setMaterial(ie,Te);let Fe=se.index,et=1;if(ie.wireframe===!0){if(Fe=de.getWireframeAttribute(se),Fe===void 0)return;et=2}const nt=se.drawRange,Xe=se.attributes.position;let gt=nt.start*et,Pt=(nt.start+nt.count)*et;we!==null&&(gt=Math.max(gt,we.start*et),Pt=Math.min(Pt,(we.start+we.count)*et)),Fe!==null?(gt=Math.max(gt,0),Pt=Math.min(Pt,Fe.count)):Xe!=null&&(gt=Math.max(gt,0),Pt=Math.min(Pt,Xe.count));const Vt=Pt-gt;if(Vt<0||Vt===1/0)return;W.setup(J,ie,Ve,se,Fe);let at,yt=Ye;if(Fe!==null&&(at=ee.get(Fe),yt=Ne,yt.setIndex(at)),J.isMesh)ie.wireframe===!0?(Oe.setLineWidth(ie.wireframeLinewidth*Mt()),yt.setMode(G.LINES)):yt.setMode(G.TRIANGLES);else if(J.isLine){let Ze=ie.linewidth;Ze===void 0&&(Ze=1),Oe.setLineWidth(Ze*Mt()),J.isLineSegments?yt.setMode(G.LINES):J.isLineLoop?yt.setMode(G.LINE_LOOP):yt.setMode(G.LINE_STRIP)}else J.isPoints?yt.setMode(G.POINTS):J.isSprite&&yt.setMode(G.TRIANGLES);if(J.isBatchedMesh)if(J._multiDrawInstances!==null)ao("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),yt.renderMultiDrawInstances(J._multiDrawStarts,J._multiDrawCounts,J._multiDrawCount,J._multiDrawInstances);else if(lt.get("WEBGL_multi_draw"))yt.renderMultiDraw(J._multiDrawStarts,J._multiDrawCounts,J._multiDrawCount);else{const Ze=J._multiDrawStarts,Ot=J._multiDrawCounts,St=J._multiDrawCount,_n=Fe?ee.get(Fe).bytesPerElement:1,$i=Ge.get(ie).currentProgram.getUniforms();for(let mn=0;mn<St;mn++)$i.setValue(G,"_gl_DrawID",mn),yt.render(Ze[mn]/_n,Ot[mn])}else if(J.isInstancedMesh)yt.renderInstances(gt,Vt,J.count);else if(se.isInstancedBufferGeometry){const Ze=se._maxInstanceCount!==void 0?se._maxInstanceCount:1/0,Ot=Math.min(se.instanceCount,Ze);yt.renderInstances(gt,Vt,Ot)}else yt.render(gt,Vt)};function Rn(O,Z,se){O.transparent===!0&&O.side===ni&&O.forceSinglePass===!1?(O.side=Ln,O.needsUpdate=!0,_s(O,Z,se),O.side=Si,O.needsUpdate=!0,_s(O,Z,se),O.side=ni):_s(O,Z,se)}this.compile=function(O,Z,se=null){se===null&&(se=O),b=Ke.get(se),b.init(Z),T.push(b),se.traverseVisible(function(J){J.isLight&&J.layers.test(Z.layers)&&(b.pushLight(J),J.castShadow&&b.pushShadow(J))}),O!==se&&O.traverseVisible(function(J){J.isLight&&J.layers.test(Z.layers)&&(b.pushLight(J),J.castShadow&&b.pushShadow(J))}),b.setupLights();const ie=new Set;return O.traverse(function(J){if(!(J.isMesh||J.isPoints||J.isLine||J.isSprite))return;const we=J.material;if(we)if(Array.isArray(we))for(let Te=0;Te<we.length;Te++){const Ve=we[Te];Rn(Ve,se,J),ie.add(Ve)}else Rn(we,se,J),ie.add(we)}),b=T.pop(),ie},this.compileAsync=function(O,Z,se=null){const ie=this.compile(O,Z,se);return new Promise(J=>{function we(){if(ie.forEach(function(Te){Ge.get(Te).currentProgram.isReady()&&ie.delete(Te)}),ie.size===0){J(O);return}setTimeout(we,10)}lt.get("KHR_parallel_shader_compile")!==null?we():setTimeout(we,10)})};let Nn=null;function xo(O){Nn&&Nn(O)}function Ns(){jn.stop()}function Cr(){jn.start()}const jn=new ap;jn.setAnimationLoop(xo),typeof self<"u"&&jn.setContext(self),this.setAnimationLoop=function(O){Nn=O,Se.setAnimationLoop(O),O===null?jn.stop():jn.start()},Se.addEventListener("sessionstart",Ns),Se.addEventListener("sessionend",Cr),this.render=function(O,Z){if(Z!==void 0&&Z.isCamera!==!0){Xt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;if(O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),Z.parent===null&&Z.matrixWorldAutoUpdate===!0&&Z.updateMatrixWorld(),Se.enabled===!0&&Se.isPresenting===!0&&(Se.cameraAutoUpdate===!0&&Se.updateCamera(Z),Z=Se.getCamera()),O.isScene===!0&&O.onBeforeRender(R,O,Z,M),b=Ke.get(O,T.length),b.init(Z),T.push(b),je.multiplyMatrices(Z.projectionMatrix,Z.matrixWorldInverse),fe.setFromProjectionMatrix(je,yi,Z.reversedDepth),Ae=this.localClippingEnabled,pe=Ue.init(this.clippingPlanes,Ae),S=Re.get(O,w.length),S.init(),w.push(S),Se.enabled===!0&&Se.isPresenting===!0){const we=R.xr.getDepthSensingMesh();we!==null&&Pr(we,Z,-1/0,R.sortObjects)}Pr(O,Z,0,R.sortObjects),S.finish(),R.sortObjects===!0&&S.sort(xe,be),st=Se.enabled===!1||Se.isPresenting===!1||Se.hasDepthSensing()===!1,st&&Ee.addToRenderList(S,O),this.info.render.frame++,pe===!0&&Ue.beginShadows();const se=b.state.shadowsArray;ge.render(se,O,Z),pe===!0&&Ue.endShadows(),this.info.autoReset===!0&&this.info.reset();const ie=S.opaque,J=S.transmissive;if(b.setupLights(),Z.isArrayCamera){const we=Z.cameras;if(J.length>0)for(let Te=0,Ve=we.length;Te<Ve;Te++){const Fe=we[Te];_o(ie,J,O,Fe)}st&&Ee.render(O);for(let Te=0,Ve=we.length;Te<Ve;Te++){const Fe=we[Te];Ir(S,O,Fe,Fe.viewport)}}else J.length>0&&_o(ie,J,O,Z),st&&Ee.render(O),Ir(S,O,Z);M!==null&&E===0&&(tt.updateMultisampleRenderTarget(M),tt.updateRenderTargetMipmap(M)),O.isScene===!0&&O.onAfterRender(R,O,Z),W.resetDefaultState(),N=-1,B=null,T.pop(),T.length>0?(b=T[T.length-1],pe===!0&&Ue.setGlobalState(R.clippingPlanes,b.state.camera)):b=null,w.pop(),w.length>0?S=w[w.length-1]:S=null};function Pr(O,Z,se,ie){if(O.visible===!1)return;if(O.layers.test(Z.layers)){if(O.isGroup)se=O.renderOrder;else if(O.isLOD)O.autoUpdate===!0&&O.update(Z);else if(O.isLight)b.pushLight(O),O.castShadow&&b.pushShadow(O);else if(O.isSprite){if(!O.frustumCulled||fe.intersectsSprite(O)){ie&&ut.setFromMatrixPosition(O.matrixWorld).applyMatrix4(je);const Te=me.update(O),Ve=O.material;Ve.visible&&S.push(O,Te,Ve,se,ut.z,null)}}else if((O.isMesh||O.isLine||O.isPoints)&&(!O.frustumCulled||fe.intersectsObject(O))){const Te=me.update(O),Ve=O.material;if(ie&&(O.boundingSphere!==void 0?(O.boundingSphere===null&&O.computeBoundingSphere(),ut.copy(O.boundingSphere.center)):(Te.boundingSphere===null&&Te.computeBoundingSphere(),ut.copy(Te.boundingSphere.center)),ut.applyMatrix4(O.matrixWorld).applyMatrix4(je)),Array.isArray(Ve)){const Fe=Te.groups;for(let et=0,nt=Fe.length;et<nt;et++){const Xe=Fe[et],gt=Ve[Xe.materialIndex];gt&&gt.visible&&S.push(O,Te,gt,se,ut.z,Xe)}}else Ve.visible&&S.push(O,Te,Ve,se,ut.z,null)}}const we=O.children;for(let Te=0,Ve=we.length;Te<Ve;Te++)Pr(we[Te],Z,se,ie)}function Ir(O,Z,se,ie){const{opaque:J,transmissive:we,transparent:Te}=O;b.setupLightsView(se),pe===!0&&Ue.setGlobalState(R.clippingPlanes,se),ie&&Oe.viewport(C.copy(ie)),J.length>0&&Ei(J,Z,se),we.length>0&&Ei(we,Z,se),Te.length>0&&Ei(Te,Z,se),Oe.buffers.depth.setTest(!0),Oe.buffers.depth.setMask(!0),Oe.buffers.color.setMask(!0),Oe.setPolygonOffset(!1)}function _o(O,Z,se,ie){if((se.isScene===!0?se.overrideMaterial:null)!==null)return;b.state.transmissionRenderTarget[ie.id]===void 0&&(b.state.transmissionRenderTarget[ie.id]=new Ls(1,1,{generateMipmaps:!0,type:lt.has("EXT_color_buffer_half_float")||lt.has("EXT_color_buffer_float")?_i:bi,minFilter:cs,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Et.workingColorSpace}));const we=b.state.transmissionRenderTarget[ie.id],Te=ie.viewport||C;we.setSize(Te.z*R.transmissionResolutionScale,Te.w*R.transmissionResolutionScale);const Ve=R.getRenderTarget(),Fe=R.getActiveCubeFace(),et=R.getActiveMipmapLevel();R.setRenderTarget(we),R.getClearColor(V),q=R.getClearAlpha(),q<1&&R.setClearColor(16777215,.5),R.clear(),st&&Ee.render(se);const nt=R.toneMapping;R.toneMapping=fs;const Xe=ie.viewport;if(ie.viewport!==void 0&&(ie.viewport=void 0),b.setupLightsView(ie),pe===!0&&Ue.setGlobalState(R.clippingPlanes,ie),Ei(O,se,ie),tt.updateMultisampleRenderTarget(we),tt.updateRenderTargetMipmap(we),lt.has("WEBGL_multisampled_render_to_texture")===!1){let gt=!1;for(let Pt=0,Vt=Z.length;Pt<Vt;Pt++){const at=Z[Pt],{object:yt,geometry:Ze,material:Ot,group:St}=at;if(Ot.side===ni&&yt.layers.test(ie.layers)){const _n=Ot.side;Ot.side=Ln,Ot.needsUpdate=!0,Dr(yt,se,ie,Ze,Ot,St),Ot.side=_n,Ot.needsUpdate=!0,gt=!0}}gt===!0&&(tt.updateMultisampleRenderTarget(we),tt.updateRenderTargetMipmap(we))}R.setRenderTarget(Ve,Fe,et),R.setClearColor(V,q),Xe!==void 0&&(ie.viewport=Xe),R.toneMapping=nt}function Ei(O,Z,se){const ie=Z.isScene===!0?Z.overrideMaterial:null;for(let J=0,we=O.length;J<we;J++){const Te=O[J],{object:Ve,geometry:Fe,group:et}=Te;let nt=Te.material;nt.allowOverride===!0&&ie!==null&&(nt=ie),Ve.layers.test(se.layers)&&Dr(Ve,Z,se,Fe,nt,et)}}function Dr(O,Z,se,ie,J,we){O.onBeforeRender(R,Z,se,ie,J,we),O.modelViewMatrix.multiplyMatrices(se.matrixWorldInverse,O.matrixWorld),O.normalMatrix.getNormalMatrix(O.modelViewMatrix),J.onBeforeRender(R,Z,se,ie,O,we),J.transparent===!0&&J.side===ni&&J.forceSinglePass===!1?(J.side=Ln,J.needsUpdate=!0,R.renderBufferDirect(se,Z,ie,J,O,we),J.side=Si,J.needsUpdate=!0,R.renderBufferDirect(se,Z,ie,J,O,we),J.side=ni):R.renderBufferDirect(se,Z,ie,J,O,we),O.onAfterRender(R,Z,se,ie,J,we)}function _s(O,Z,se){Z.isScene!==!0&&(Z=At);const ie=Ge.get(O),J=b.state.lights,we=b.state.shadowsArray,Te=J.state.version,Ve=le.getParameters(O,J.state,we,Z,se),Fe=le.getProgramCacheKey(Ve);let et=ie.programs;ie.environment=O.isMeshStandardMaterial?Z.environment:null,ie.fog=Z.fog,ie.envMap=(O.isMeshStandardMaterial?D:z).get(O.envMap||ie.environment),ie.envMapRotation=ie.environment!==null&&O.envMap===null?Z.environmentRotation:O.envMapRotation,et===void 0&&(O.addEventListener("dispose",Qe),et=new Map,ie.programs=et);let nt=et.get(Fe);if(nt!==void 0){if(ie.currentProgram===nt&&ie.lightsStateVersion===Te)return On(O,Ve),nt}else Ve.uniforms=le.getUniforms(O),O.onBeforeCompile(Ve,R),nt=le.acquireProgram(Ve,Fe),et.set(Fe,nt),ie.uniforms=Ve.uniforms;const Xe=ie.uniforms;return(!O.isShaderMaterial&&!O.isRawShaderMaterial||O.clipping===!0)&&(Xe.clippingPlanes=Ue.uniform),On(O,Ve),ie.needsLights=ri(O),ie.lightsStateVersion=Te,ie.needsLights&&(Xe.ambientLightColor.value=J.state.ambient,Xe.lightProbe.value=J.state.probe,Xe.directionalLights.value=J.state.directional,Xe.directionalLightShadows.value=J.state.directionalShadow,Xe.spotLights.value=J.state.spot,Xe.spotLightShadows.value=J.state.spotShadow,Xe.rectAreaLights.value=J.state.rectArea,Xe.ltc_1.value=J.state.rectAreaLTC1,Xe.ltc_2.value=J.state.rectAreaLTC2,Xe.pointLights.value=J.state.point,Xe.pointLightShadows.value=J.state.pointShadow,Xe.hemisphereLights.value=J.state.hemi,Xe.directionalShadowMap.value=J.state.directionalShadowMap,Xe.directionalShadowMatrix.value=J.state.directionalShadowMatrix,Xe.spotShadowMap.value=J.state.spotShadowMap,Xe.spotLightMatrix.value=J.state.spotLightMatrix,Xe.spotLightMap.value=J.state.spotLightMap,Xe.pointShadowMap.value=J.state.pointShadowMap,Xe.pointShadowMatrix.value=J.state.pointShadowMatrix),ie.currentProgram=nt,ie.uniformsList=null,nt}function yo(O){if(O.uniformsList===null){const Z=O.currentProgram.getUniforms();O.uniformsList=Ea.seqWithValue(Z.seq,O.uniforms)}return O.uniformsList}function On(O,Z){const se=Ge.get(O);se.outputColorSpace=Z.outputColorSpace,se.batching=Z.batching,se.batchingColor=Z.batchingColor,se.instancing=Z.instancing,se.instancingColor=Z.instancingColor,se.instancingMorph=Z.instancingMorph,se.skinning=Z.skinning,se.morphTargets=Z.morphTargets,se.morphNormals=Z.morphNormals,se.morphColors=Z.morphColors,se.morphTargetsCount=Z.morphTargetsCount,se.numClippingPlanes=Z.numClippingPlanes,se.numIntersection=Z.numClipIntersection,se.vertexAlphas=Z.vertexAlphas,se.vertexTangents=Z.vertexTangents,se.toneMapping=Z.toneMapping}function vo(O,Z,se,ie,J){Z.isScene!==!0&&(Z=At),tt.resetTextureUnits();const we=Z.fog,Te=ie.isMeshStandardMaterial?Z.environment:null,Ve=M===null?R.outputColorSpace:M.isXRRenderTarget===!0?M.texture.colorSpace:Ds,Fe=(ie.isMeshStandardMaterial?D:z).get(ie.envMap||Te),et=ie.vertexColors===!0&&!!se.attributes.color&&se.attributes.color.itemSize===4,nt=!!se.attributes.tangent&&(!!ie.normalMap||ie.anisotropy>0),Xe=!!se.morphAttributes.position,gt=!!se.morphAttributes.normal,Pt=!!se.morphAttributes.color;let Vt=fs;ie.toneMapped&&(M===null||M.isXRRenderTarget===!0)&&(Vt=R.toneMapping);const at=se.morphAttributes.position||se.morphAttributes.normal||se.morphAttributes.color,yt=at!==void 0?at.length:0,Ze=Ge.get(ie),Ot=b.state.lights;if(pe===!0&&(Ae===!0||O!==B)){const gn=O===B&&ie.id===N;Ue.setState(ie,O,gn)}let St=!1;ie.version===Ze.__version?(Ze.needsLights&&Ze.lightsStateVersion!==Ot.state.version||Ze.outputColorSpace!==Ve||J.isBatchedMesh&&Ze.batching===!1||!J.isBatchedMesh&&Ze.batching===!0||J.isBatchedMesh&&Ze.batchingColor===!0&&J.colorTexture===null||J.isBatchedMesh&&Ze.batchingColor===!1&&J.colorTexture!==null||J.isInstancedMesh&&Ze.instancing===!1||!J.isInstancedMesh&&Ze.instancing===!0||J.isSkinnedMesh&&Ze.skinning===!1||!J.isSkinnedMesh&&Ze.skinning===!0||J.isInstancedMesh&&Ze.instancingColor===!0&&J.instanceColor===null||J.isInstancedMesh&&Ze.instancingColor===!1&&J.instanceColor!==null||J.isInstancedMesh&&Ze.instancingMorph===!0&&J.morphTexture===null||J.isInstancedMesh&&Ze.instancingMorph===!1&&J.morphTexture!==null||Ze.envMap!==Fe||ie.fog===!0&&Ze.fog!==we||Ze.numClippingPlanes!==void 0&&(Ze.numClippingPlanes!==Ue.numPlanes||Ze.numIntersection!==Ue.numIntersection)||Ze.vertexAlphas!==et||Ze.vertexTangents!==nt||Ze.morphTargets!==Xe||Ze.morphNormals!==gt||Ze.morphColors!==Pt||Ze.toneMapping!==Vt||Ze.morphTargetsCount!==yt)&&(St=!0):(St=!0,Ze.__version=ie.version);let _n=Ze.currentProgram;St===!0&&(_n=_s(ie,Z,J));let $i=!1,mn=!1,Kn=!1;const Dt=_n.getUniforms(),Kt=Ze.uniforms;if(Oe.useProgram(_n.program)&&($i=!0,mn=!0,Kn=!0),ie.id!==N&&(N=ie.id,mn=!0),$i||B!==O){Oe.buffers.depth.getReversed()&&O.reversedDepth!==!0&&(O._reversedDepth=!0,O.updateProjectionMatrix()),Dt.setValue(G,"projectionMatrix",O.projectionMatrix),Dt.setValue(G,"viewMatrix",O.matrixWorldInverse);const yn=Dt.map.cameraPosition;yn!==void 0&&yn.setValue(G,Be.setFromMatrixPosition(O.matrixWorld)),Rt.logarithmicDepthBuffer&&Dt.setValue(G,"logDepthBufFC",2/(Math.log(O.far+1)/Math.LN2)),(ie.isMeshPhongMaterial||ie.isMeshToonMaterial||ie.isMeshLambertMaterial||ie.isMeshBasicMaterial||ie.isMeshStandardMaterial||ie.isShaderMaterial)&&Dt.setValue(G,"isOrthographic",O.isOrthographicCamera===!0),B!==O&&(B=O,mn=!0,Kn=!0)}if(J.isSkinnedMesh){Dt.setOptional(G,J,"bindMatrix"),Dt.setOptional(G,J,"bindMatrixInverse");const gn=J.skeleton;gn&&(gn.boneTexture===null&&gn.computeBoneTexture(),Dt.setValue(G,"boneTexture",gn.boneTexture,tt))}J.isBatchedMesh&&(Dt.setOptional(G,J,"batchingTexture"),Dt.setValue(G,"batchingTexture",J._matricesTexture,tt),Dt.setOptional(G,J,"batchingIdTexture"),Dt.setValue(G,"batchingIdTexture",J._indirectTexture,tt),Dt.setOptional(G,J,"batchingColorTexture"),J._colorsTexture!==null&&Dt.setValue(G,"batchingColorTexture",J._colorsTexture,tt));const Fn=se.morphAttributes;if((Fn.position!==void 0||Fn.normal!==void 0||Fn.color!==void 0)&&We.update(J,se,_n),(mn||Ze.receiveShadow!==J.receiveShadow)&&(Ze.receiveShadow=J.receiveShadow,Dt.setValue(G,"receiveShadow",J.receiveShadow)),ie.isMeshGouraudMaterial&&ie.envMap!==null&&(Kt.envMap.value=Fe,Kt.flipEnvMap.value=Fe.isCubeTexture&&Fe.isRenderTargetTexture===!1?-1:1),ie.isMeshStandardMaterial&&ie.envMap===null&&Z.environment!==null&&(Kt.envMapIntensity.value=Z.environmentIntensity),Kt.dfgLUT!==void 0&&(Kt.dfgLUT.value=hS()),mn&&(Dt.setValue(G,"toneMappingExposure",R.toneMappingExposure),Ze.needsLights&&So(Kt,Kn),we&&ie.fog===!0&&qe.refreshFogUniforms(Kt,we),qe.refreshMaterialUniforms(Kt,ie,Q,ae,b.state.transmissionRenderTarget[O.id]),Ea.upload(G,yo(Ze),Kt,tt)),ie.isShaderMaterial&&ie.uniformsNeedUpdate===!0&&(Ea.upload(G,yo(Ze),Kt,tt),ie.uniformsNeedUpdate=!1),ie.isSpriteMaterial&&Dt.setValue(G,"center",J.center),Dt.setValue(G,"modelViewMatrix",J.modelViewMatrix),Dt.setValue(G,"normalMatrix",J.normalMatrix),Dt.setValue(G,"modelMatrix",J.matrixWorld),ie.isShaderMaterial||ie.isRawShaderMaterial){const gn=ie.uniformsGroups;for(let yn=0,Bn=gn.length;yn<Bn;yn++){const nn=gn[yn];Ce.update(nn,_n),Ce.bind(nn,_n)}}return _n}function So(O,Z){O.ambientLightColor.needsUpdate=Z,O.lightProbe.needsUpdate=Z,O.directionalLights.needsUpdate=Z,O.directionalLightShadows.needsUpdate=Z,O.pointLights.needsUpdate=Z,O.pointLightShadows.needsUpdate=Z,O.spotLights.needsUpdate=Z,O.spotLightShadows.needsUpdate=Z,O.rectAreaLights.needsUpdate=Z,O.hemisphereLights.needsUpdate=Z}function ri(O){return O.isMeshLambertMaterial||O.isMeshToonMaterial||O.isMeshPhongMaterial||O.isMeshStandardMaterial||O.isShadowMaterial||O.isShaderMaterial&&O.lights===!0}this.getActiveCubeFace=function(){return U},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return M},this.setRenderTargetTextures=function(O,Z,se){const ie=Ge.get(O);ie.__autoAllocateDepthBuffer=O.resolveDepthBuffer===!1,ie.__autoAllocateDepthBuffer===!1&&(ie.__useRenderToTexture=!1),Ge.get(O.texture).__webglTexture=Z,Ge.get(O.depthTexture).__webglTexture=ie.__autoAllocateDepthBuffer?void 0:se,ie.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(O,Z){const se=Ge.get(O);se.__webglFramebuffer=Z,se.__useDefaultFramebuffer=Z===void 0};const bo=G.createFramebuffer();this.setRenderTarget=function(O,Z=0,se=0){M=O,U=Z,E=se;let ie=!0,J=null,we=!1,Te=!1;if(O){const Fe=Ge.get(O);if(Fe.__useDefaultFramebuffer!==void 0)Oe.bindFramebuffer(G.FRAMEBUFFER,null),ie=!1;else if(Fe.__webglFramebuffer===void 0)tt.setupRenderTarget(O);else if(Fe.__hasExternalTextures)tt.rebindTextures(O,Ge.get(O.texture).__webglTexture,Ge.get(O.depthTexture).__webglTexture);else if(O.depthBuffer){const Xe=O.depthTexture;if(Fe.__boundDepthTexture!==Xe){if(Xe!==null&&Ge.has(Xe)&&(O.width!==Xe.image.width||O.height!==Xe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");tt.setupDepthRenderbuffer(O)}}const et=O.texture;(et.isData3DTexture||et.isDataArrayTexture||et.isCompressedArrayTexture)&&(Te=!0);const nt=Ge.get(O).__webglFramebuffer;O.isWebGLCubeRenderTarget?(Array.isArray(nt[Z])?J=nt[Z][se]:J=nt[Z],we=!0):O.samples>0&&tt.useMultisampledRTT(O)===!1?J=Ge.get(O).__webglMultisampledFramebuffer:Array.isArray(nt)?J=nt[se]:J=nt,C.copy(O.viewport),F.copy(O.scissor),k=O.scissorTest}else C.copy(He).multiplyScalar(Q).floor(),F.copy(Je).multiplyScalar(Q).floor(),k=ct;if(se!==0&&(J=bo),Oe.bindFramebuffer(G.FRAMEBUFFER,J)&&ie&&Oe.drawBuffers(O,J),Oe.viewport(C),Oe.scissor(F),Oe.setScissorTest(k),we){const Fe=Ge.get(O.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Fe.__webglTexture,se)}else if(Te){const Fe=Z;for(let et=0;et<O.textures.length;et++){const nt=Ge.get(O.textures[et]);G.framebufferTextureLayer(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0+et,nt.__webglTexture,se,Fe)}}else if(O!==null&&se!==0){const Fe=Ge.get(O.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,Fe.__webglTexture,se)}N=-1},this.readRenderTargetPixels=function(O,Z,se,ie,J,we,Te,Ve=0){if(!(O&&O.isWebGLRenderTarget)){Xt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Fe=Ge.get(O).__webglFramebuffer;if(O.isWebGLCubeRenderTarget&&Te!==void 0&&(Fe=Fe[Te]),Fe){Oe.bindFramebuffer(G.FRAMEBUFFER,Fe);try{const et=O.textures[Ve],nt=et.format,Xe=et.type;if(!Rt.textureFormatReadable(nt)){Xt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Rt.textureTypeReadable(Xe)){Xt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}Z>=0&&Z<=O.width-ie&&se>=0&&se<=O.height-J&&(O.textures.length>1&&G.readBuffer(G.COLOR_ATTACHMENT0+Ve),G.readPixels(Z,se,ie,J,$e.convert(nt),$e.convert(Xe),we))}finally{const et=M!==null?Ge.get(M).__webglFramebuffer:null;Oe.bindFramebuffer(G.FRAMEBUFFER,et)}}},this.readRenderTargetPixelsAsync=async function(O,Z,se,ie,J,we,Te,Ve=0){if(!(O&&O.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Fe=Ge.get(O).__webglFramebuffer;if(O.isWebGLCubeRenderTarget&&Te!==void 0&&(Fe=Fe[Te]),Fe)if(Z>=0&&Z<=O.width-ie&&se>=0&&se<=O.height-J){Oe.bindFramebuffer(G.FRAMEBUFFER,Fe);const et=O.textures[Ve],nt=et.format,Xe=et.type;if(!Rt.textureFormatReadable(nt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Rt.textureTypeReadable(Xe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const gt=G.createBuffer();G.bindBuffer(G.PIXEL_PACK_BUFFER,gt),G.bufferData(G.PIXEL_PACK_BUFFER,we.byteLength,G.STREAM_READ),O.textures.length>1&&G.readBuffer(G.COLOR_ATTACHMENT0+Ve),G.readPixels(Z,se,ie,J,$e.convert(nt),$e.convert(Xe),0);const Pt=M!==null?Ge.get(M).__webglFramebuffer:null;Oe.bindFramebuffer(G.FRAMEBUFFER,Pt);const Vt=G.fenceSync(G.SYNC_GPU_COMMANDS_COMPLETE,0);return G.flush(),await dm(G,Vt,4),G.bindBuffer(G.PIXEL_PACK_BUFFER,gt),G.getBufferSubData(G.PIXEL_PACK_BUFFER,0,we),G.deleteBuffer(gt),G.deleteSync(Vt),we}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(O,Z=null,se=0){const ie=Math.pow(2,-se),J=Math.floor(O.image.width*ie),we=Math.floor(O.image.height*ie),Te=Z!==null?Z.x:0,Ve=Z!==null?Z.y:0;tt.setTexture2D(O,0),G.copyTexSubImage2D(G.TEXTURE_2D,se,0,0,Te,Ve,J,we),Oe.unbindTexture()};const wo=G.createFramebuffer(),qi=G.createFramebuffer();this.copyTextureToTexture=function(O,Z,se=null,ie=null,J=0,we=null){we===null&&(J!==0?(ao("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),we=J,J=0):we=0);let Te,Ve,Fe,et,nt,Xe,gt,Pt,Vt;const at=O.isCompressedTexture?O.mipmaps[we]:O.image;if(se!==null)Te=se.max.x-se.min.x,Ve=se.max.y-se.min.y,Fe=se.isBox3?se.max.z-se.min.z:1,et=se.min.x,nt=se.min.y,Xe=se.isBox3?se.min.z:0;else{const Fn=Math.pow(2,-J);Te=Math.floor(at.width*Fn),Ve=Math.floor(at.height*Fn),O.isDataArrayTexture?Fe=at.depth:O.isData3DTexture?Fe=Math.floor(at.depth*Fn):Fe=1,et=0,nt=0,Xe=0}ie!==null?(gt=ie.x,Pt=ie.y,Vt=ie.z):(gt=0,Pt=0,Vt=0);const yt=$e.convert(Z.format),Ze=$e.convert(Z.type);let Ot;Z.isData3DTexture?(tt.setTexture3D(Z,0),Ot=G.TEXTURE_3D):Z.isDataArrayTexture||Z.isCompressedArrayTexture?(tt.setTexture2DArray(Z,0),Ot=G.TEXTURE_2D_ARRAY):(tt.setTexture2D(Z,0),Ot=G.TEXTURE_2D),G.pixelStorei(G.UNPACK_FLIP_Y_WEBGL,Z.flipY),G.pixelStorei(G.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Z.premultiplyAlpha),G.pixelStorei(G.UNPACK_ALIGNMENT,Z.unpackAlignment);const St=G.getParameter(G.UNPACK_ROW_LENGTH),_n=G.getParameter(G.UNPACK_IMAGE_HEIGHT),$i=G.getParameter(G.UNPACK_SKIP_PIXELS),mn=G.getParameter(G.UNPACK_SKIP_ROWS),Kn=G.getParameter(G.UNPACK_SKIP_IMAGES);G.pixelStorei(G.UNPACK_ROW_LENGTH,at.width),G.pixelStorei(G.UNPACK_IMAGE_HEIGHT,at.height),G.pixelStorei(G.UNPACK_SKIP_PIXELS,et),G.pixelStorei(G.UNPACK_SKIP_ROWS,nt),G.pixelStorei(G.UNPACK_SKIP_IMAGES,Xe);const Dt=O.isDataArrayTexture||O.isData3DTexture,Kt=Z.isDataArrayTexture||Z.isData3DTexture;if(O.isDepthTexture){const Fn=Ge.get(O),gn=Ge.get(Z),yn=Ge.get(Fn.__renderTarget),Bn=Ge.get(gn.__renderTarget);Oe.bindFramebuffer(G.READ_FRAMEBUFFER,yn.__webglFramebuffer),Oe.bindFramebuffer(G.DRAW_FRAMEBUFFER,Bn.__webglFramebuffer);for(let nn=0;nn<Fe;nn++)Dt&&(G.framebufferTextureLayer(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,Ge.get(O).__webglTexture,J,Xe+nn),G.framebufferTextureLayer(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,Ge.get(Z).__webglTexture,we,Vt+nn)),G.blitFramebuffer(et,nt,Te,Ve,gt,Pt,Te,Ve,G.DEPTH_BUFFER_BIT,G.NEAREST);Oe.bindFramebuffer(G.READ_FRAMEBUFFER,null),Oe.bindFramebuffer(G.DRAW_FRAMEBUFFER,null)}else if(J!==0||O.isRenderTargetTexture||Ge.has(O)){const Fn=Ge.get(O),gn=Ge.get(Z);Oe.bindFramebuffer(G.READ_FRAMEBUFFER,wo),Oe.bindFramebuffer(G.DRAW_FRAMEBUFFER,qi);for(let yn=0;yn<Fe;yn++)Dt?G.framebufferTextureLayer(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,Fn.__webglTexture,J,Xe+yn):G.framebufferTexture2D(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,Fn.__webglTexture,J),Kt?G.framebufferTextureLayer(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,gn.__webglTexture,we,Vt+yn):G.framebufferTexture2D(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,gn.__webglTexture,we),J!==0?G.blitFramebuffer(et,nt,Te,Ve,gt,Pt,Te,Ve,G.COLOR_BUFFER_BIT,G.NEAREST):Kt?G.copyTexSubImage3D(Ot,we,gt,Pt,Vt+yn,et,nt,Te,Ve):G.copyTexSubImage2D(Ot,we,gt,Pt,et,nt,Te,Ve);Oe.bindFramebuffer(G.READ_FRAMEBUFFER,null),Oe.bindFramebuffer(G.DRAW_FRAMEBUFFER,null)}else Kt?O.isDataTexture||O.isData3DTexture?G.texSubImage3D(Ot,we,gt,Pt,Vt,Te,Ve,Fe,yt,Ze,at.data):Z.isCompressedArrayTexture?G.compressedTexSubImage3D(Ot,we,gt,Pt,Vt,Te,Ve,Fe,yt,at.data):G.texSubImage3D(Ot,we,gt,Pt,Vt,Te,Ve,Fe,yt,Ze,at):O.isDataTexture?G.texSubImage2D(G.TEXTURE_2D,we,gt,Pt,Te,Ve,yt,Ze,at.data):O.isCompressedTexture?G.compressedTexSubImage2D(G.TEXTURE_2D,we,gt,Pt,at.width,at.height,yt,at.data):G.texSubImage2D(G.TEXTURE_2D,we,gt,Pt,Te,Ve,yt,Ze,at);G.pixelStorei(G.UNPACK_ROW_LENGTH,St),G.pixelStorei(G.UNPACK_IMAGE_HEIGHT,_n),G.pixelStorei(G.UNPACK_SKIP_PIXELS,$i),G.pixelStorei(G.UNPACK_SKIP_ROWS,mn),G.pixelStorei(G.UNPACK_SKIP_IMAGES,Kn),we===0&&Z.generateMipmaps&&G.generateMipmap(Ot),Oe.unbindTexture()},this.initRenderTarget=function(O){Ge.get(O).__webglFramebuffer===void 0&&tt.setupRenderTarget(O)},this.initTexture=function(O){O.isCubeTexture?tt.setTextureCube(O,0):O.isData3DTexture?tt.setTexture3D(O,0):O.isDataArrayTexture||O.isCompressedArrayTexture?tt.setTexture2DArray(O,0):tt.setTexture2D(O,0),Oe.unbindTexture()},this.resetState=function(){U=0,E=0,M=null,Oe.reset(),W.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return yi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Et._getDrawingBufferColorSpace(e),t.unpackColorSpace=Et._getUnpackColorSpace()}}const dS=new Set(["KeyW","KeyA","KeyS","KeyD"]);class pS{constructor(e){this.domElement=e,this.keys=new Set,this.justPressed=new Set,this.mouseButtons=new Set,this.mouseButtonsJustPressed=new Set,this.pointerLocked=!1,this.lookDelta={x:0,y:0},this.handleKeyDown=this.handleKeyDown.bind(this),this.handleKeyUp=this.handleKeyUp.bind(this),this.handlePointerMove=this.handlePointerMove.bind(this),this.handlePointerLockChange=this.handlePointerLockChange.bind(this),this.handlePointerDown=this.handlePointerDown.bind(this),this.handleMouseDown=this.handleMouseDown.bind(this),this.handlePointerUp=this.handlePointerUp.bind(this),this.handleContextMenu=this.handleContextMenu.bind(this),window.addEventListener("keydown",this.handleKeyDown),window.addEventListener("keyup",this.handleKeyUp),window.addEventListener("pointermove",this.handlePointerMove),window.addEventListener("mousedown",this.handleMouseDown),window.addEventListener("mouseup",this.handlePointerUp),window.addEventListener("contextmenu",this.handleContextMenu),document.addEventListener("pointerlockchange",this.handlePointerLockChange),this.domElement.addEventListener("pointerdown",this.handlePointerDown)}destroy(){window.removeEventListener("keydown",this.handleKeyDown),window.removeEventListener("keyup",this.handleKeyUp),window.removeEventListener("pointermove",this.handlePointerMove),window.removeEventListener("mousedown",this.handleMouseDown),window.removeEventListener("mouseup",this.handlePointerUp),window.removeEventListener("contextmenu",this.handleContextMenu),document.removeEventListener("pointerlockchange",this.handlePointerLockChange),this.domElement.removeEventListener("pointerdown",this.handlePointerDown)}handleKeyDown(e){this.keys.has(e.code)||this.justPressed.add(e.code),this.keys.add(e.code),(dS.has(e.code)||e.code==="Space"||e.code==="ShiftLeft")&&e.preventDefault()}handleKeyUp(e){this.keys.delete(e.code)}handlePointerMove(e){this.pointerLocked&&(this.lookDelta.x+=e.movementX,this.lookDelta.y+=e.movementY)}handlePointerLockChange(){this.pointerLocked=document.pointerLockElement===this.domElement,this.pointerLocked||(this.mouseButtons.clear(),this.mouseButtonsJustPressed.clear())}handlePointerDown(e){if(!this.pointerLocked){this.domElement.requestPointerLock();return}this.registerMouseButton(e)}handleMouseDown(e){this.pointerLocked&&this.registerMouseButton(e)}registerMouseButton(e){this.mouseButtons.has(e.button)||this.mouseButtonsJustPressed.add(e.button),this.mouseButtons.add(e.button),e.preventDefault()}handlePointerUp(e){this.mouseButtons.delete(e.button)}handleContextMenu(e){this.pointerLocked&&e.preventDefault()}isPressed(e){return this.keys.has(e)}wasPressed(e){return this.justPressed.has(e)}isMouseButtonPressed(e){return this.mouseButtons.has(e)}consumeFrameState(){const e={lookDelta:{...this.lookDelta},mouseButtons:new Set(this.mouseButtons),justPressed:new Set(this.justPressed),mouseButtonsJustPressed:new Set(this.mouseButtonsJustPressed)};return this.lookDelta.x=0,this.lookDelta.y=0,this.justPressed.clear(),this.mouseButtonsJustPressed.clear(),e}}const mS=new P(0,.35,0),gS=new P(0,1.2,0),xS=new P;function _S(i,{isHeadshot:e=!1}={}){const t=document.createElement("canvas");t.width=128,t.height=64;const n=t.getContext("2d");n.clearRect(0,0,t.width,t.height),n.font='bold 34px "Segoe UI"',n.textAlign="center",n.textBaseline="middle",n.lineWidth=8,n.strokeStyle=e?"rgba(52, 8, 8, 0.92)":"rgba(20, 24, 30, 0.85)",n.fillStyle=e?"#ff6b6b":"#ffd37a",n.strokeText(String(i),t.width/2,t.height/2),n.fillText(String(i),t.width/2,t.height/2);const s=new tp(t);s.needsUpdate=!0;const r=new Zd({map:s,transparent:!0,depthWrite:!1}),o=new rg(r);return o.scale.set(.85,.42,1),o.userData.life=.6,o}function yS(i,e,{isHeadshot:t=!1}={}){const n=_S(i,{isHeadshot:t});return n.position.copy(e??xS.set(0,1.9,0)),n.position.add(mS),n}function Bc(i,e,t){return e.filter(n=>(n.userData.life-=t,n.position.addScaledVector(gS,t),n.material.opacity=Math.min(1,n.userData.life/.6),n.userData.life>0?!0:(n.material.map.dispose(),n.material.dispose(),i.remove(n),!1)))}const fp=11435347,dp=14136713,vS=4926765,SS=7162699,pp=16723245,Gu=328965,au=328965;function qn(i,e,t){const n=new It(i,e);return n.position.copy(t),n.castShadow=!0,n.receiveShadow=!0,n}function bS(){const i=new kn,e=new Nt({color:2501168,roughness:.74,metalness:.18}),t=new Nt({color:8345397,roughness:.94,metalness:.02}),n=qn(new wt(.18,.14,.54),e,new P(0,0,0)),s=qn(new wt(.15,.1,.38),t,new P(0,-.01,-.43)),r=qn(new wt(.1,.1,.28),t,new P(.01,.01,.37)),o=qn(new Vn(.02,.02,.48,10),e,new P(0,.01,-.82));o.rotation.x=Math.PI/2;const a=qn(new wt(.08,.22,.14),e,new P(.01,-.18,-.06));return a.rotation.z=.18,i.add(n,s,r,o,a),i.rotation.set(.02,.2,-.26),i.position.set(.38,1.32,.08),i}function wS(){const i=new kn,e=new Nt({color:599e4,roughness:.97,metalness:.03}),t=new Nt({color:fp,roughness:.9,metalness:.02,emissive:16762231,emissiveIntensity:0}),n=new Nt({color:dp,roughness:.86,metalness:.02,emissive:16768942,emissiveIntensity:0}),s=new Nt({color:Gu,roughness:.4,metalness:.05,emissive:pp,emissiveIntensity:.18}),r=new Nt({color:au,roughness:.72,metalness:.02,emissive:au,emissiveIntensity:0}),o=qn(new Vn(.08,.08,2.2,12),e,new P(0,1.1,0)),a=qn(new Vn(.36,.42,1.35,16),t,new P(0,1.45,0)),c=qn(new ds(.24,18,16),n,new P(0,2.28,0)),l=qn(new ds(.034,10,10),s,new P(-.085,2.31,.195)),h=qn(new ds(.034,10,10),s,new P(.085,2.31,.195)),u=new kn;u.visible=!1;const f=qn(new wt(.12,.022,.03),r,new P(-.085,2.43,.205));f.rotation.z=-.34;const p=qn(new wt(.12,.022,.03),r,new P(.085,2.43,.205));p.rotation.z=.34,u.add(f,p);const _=qn(new Vn(.44,.52,.18,18),e,new P(0,.09,0));return i.add(o,a,c,l,h,u,_,bS()),{group:i,shootables:[a,c],expressionGroup:u,materials:{base:e,body:t,head:n,eyes:s,brows:r}}}function hf(i,e){i.hitFlash=Math.max(0,i.hitFlash-e);const t=i.respawnTimer>0?0:i.hitFlash*8;i.bodyMaterial.emissiveIntensity=t,i.headMaterial.emissiveIntensity=t*.8;const n=i.respawnTimer<=0&&i.isAggro;i.eyeMaterial.color.setHex(n?pp:Gu),i.eyeMaterial.emissiveIntensity=i.respawnTimer>0?.04:n?3.4:.18,i.browMaterial?.color.setHex(au),i.browMaterial.emissiveIntensity=0,i.expressionGroup&&(i.expressionGroup.visible=n)}function MS(i){i.bodyMaterial.color.setHex(vS),i.headMaterial.color.setHex(SS),i.expressionGroup&&(i.expressionGroup.visible=!1)}function ES(i){i.bodyMaterial.color.setHex(fp),i.headMaterial.color.setHex(dp),i.bodyMaterial.emissiveIntensity=0,i.headMaterial.emissiveIntensity=0,i.eyeMaterial.color.setHex(Gu),i.eyeMaterial.emissiveIntensity=.18,i.browMaterial.emissiveIntensity=0,i.expressionGroup&&(i.expressionGroup.visible=!1)}const rr=new P,or=new P,ns=new P,is=new P,zc=new P,ff=new P,kc=new P;function TS(i,e,t){const n=Math.atan2(Math.sin(e-i),Math.cos(e-i));return i+n*t}class mp{constructor(e=new P){const t=wS();this.group=t.group,this.group.position.copy(e),this.spawnPoint=e.clone(),this.maxHealth=100,this.health=this.maxHealth,this.hitFlash=0,this.respawnDelay=1.2,this.respawnTimer=0,this.popups=[],this.radius=.42,this.height=2.2,this.moveSpeed=2.5,this.turnSpeed=7,this.detectionRange=32,this.preferredRange=0,this.wanderTime=0,this.wanderAngle=0,this.path=[],this.pathIndex=0,this.pathRepathTime=0,this.lastSeenPlayerPosition=new P,this.hasLastSeenPlayerPosition=!1,this.hasSightOnPlayer=!1,this.isAggro=!1,this.time=Math.random()*Math.PI*2,this.bodyMaterial=t.materials.body,this.headMaterial=t.materials.head,this.eyeMaterial=t.materials.eyes,this.browMaterial=t.materials.brows,this.expressionGroup=t.expressionGroup,this.shootables=t.shootables;const[n,s]=this.shootables;n.userData.damageMultiplier=1,s.userData.damageMultiplier=2,this.shootables.forEach(r=>{r.userData.damageReceiver=this})}getObject(){return this.group}getShootables(){return this.shootables}applyDamage(e,t=null,n=null){if(this.respawnTimer>0)return 0;const s=n?.object?.userData.damageMultiplier??1,r=s>1,o=e*s;this.health=Math.max(0,this.health-o),this.hitFlash=.18;const a=yS(o,t,{isHeadshot:r});return this.group.worldToLocal(a.position),this.group.add(a),this.popups.push(a),this.health===0&&(this.respawnTimer=this.respawnDelay,MS(this)),o}update(e,t={}){if(this.time+=e,this.respawnTimer>0){hf(this,e),this.popups=Bc(this.group,this.popups,e),this.respawnTimer=Math.max(0,this.respawnTimer-e),this.respawnTimer===0&&(this.health=this.maxHealth,this.group.position.copy(this.spawnPoint),this.path=[],this.pathIndex=0,this.pathRepathTime=0,this.hasLastSeenPlayerPosition=!1,this.isAggro=!1,ES(this));return}this.updateMovement(e,t),hf(this,e),this.popups=Bc(this.group,this.popups,e)}updateMovement(e,{playerPosition:t=null,playerEyePosition:n=null,collisionWorld:s=null,navigationManager:r=null}={}){if(!t){this.hasSightOnPlayer=!1,this.isAggro=!1;return}const o=s?.getGroundHeightAt(this.group.position.x,this.group.position.z,this.group.position.y,.45)??0;this.group.position.y=o,or.copy(t).sub(this.group.position),or.y=0;const a=or.length();ff.set(this.group.position.x,this.group.position.y+1.55,this.group.position.z),n?zc.copy(n):zc.set(t.x,t.y+1.55,t.z),this.hasSightOnPlayer=s?.hasLineOfSight(ff,zc)??!0,this.hasSightOnPlayer&&(this.lastSeenPlayerPosition.copy(t),this.hasLastSeenPlayerPosition=!0);const c=a<=this.detectionRange&&this.hasSightOnPlayer;if(this.isAggro=c,r?.ready){this.updateNavigationMovement(e,{playerDetected:c,playerPosition:t,navigationManager:r,collisionWorld:s});return}this.updateFallbackMovement(e,{playerDetected:c,playerPosition:t,collisionWorld:s,floor:o})}updateNavigationMovement(e,{playerDetected:t,playerPosition:n,navigationManager:s,collisionWorld:r}){if(this.pathRepathTime=Math.max(0,this.pathRepathTime-e),t)this.pathRepathTime===0&&(this.path=s.computePath(this.group.position,n),this.pathIndex=this.path.length>1?1:0,this.pathRepathTime=.45);else if(this.wanderTime-=e,this.path.length===0||this.pathIndex>=this.path.length||this.wanderTime<=0){const a=s.getRandomPointAround(this.group.position,16)??s.getRandomPointAround(this.spawnPoint,22)??s.getRandomPoint();a&&(this.path=s.computePath(this.group.position,a),this.pathIndex=this.path.length>1?1:0,this.wanderTime=2.5+Math.random()*2.5)}if(this.hasLastSeenPlayerPosition&&!t&&this.path.length===0&&(this.path=s.computePath(this.group.position,this.lastSeenPlayerPosition),this.pathIndex=this.path.length>1?1:0,this.hasLastSeenPlayerPosition=!1),this.path.length===0||this.pathIndex>=this.path.length)return;if(kc.copy(this.path[this.pathIndex]),kc.y=this.group.position.y,ns.copy(kc).sub(this.group.position),ns.y=0,ns.lengthSq()<.25){this.pathIndex+=1,this.pathIndex>=this.path.length&&(this.path=[]);return}is.copy(ns).normalize(),this.faceDirection(is,e),rr.copy(is).multiplyScalar(this.moveSpeed*e);const o=r?r.move(this.group.position,this.radius,this.height,rr):this.group.position.clone().add(rr);this.group.position.x=o.x,this.group.position.z=o.z,this.group.position.y=r?.getGroundHeightAt(o.x,o.z,this.group.position.y,.45)??this.group.position.y}updateFallbackMovement(e,{playerDetected:t,playerPosition:n,collisionWorld:s,floor:r}){let o=!1;if(t?this.group.position.distanceTo(n)>this.preferredRange&&(is.copy(or).normalize(),o=!0):(this.wanderTime-=e,this.wanderTime<=0&&(this.wanderTime=1.6+Math.random()*1.8,this.wanderAngle=this.time*.7+Math.sin(this.time*1.3)*1.2),is.set(Math.sin(this.wanderAngle),0,Math.cos(this.wanderAngle)),this.group.position.distanceToSquared(this.spawnPoint)>64&&(ns.copy(this.spawnPoint).sub(this.group.position),ns.y=0,ns.lengthSq()>.001&&is.copy(ns).normalize()),o=!0),!o){t&&or.lengthSq()>.001&&this.faceDirection(or,e);return}this.faceDirection(is,e),rr.copy(is).multiplyScalar(this.moveSpeed*e);const a=s?s.move(this.group.position,this.radius,this.height,rr):this.group.position.clone().add(rr);this.group.position.x=a.x,this.group.position.z=a.z,this.group.position.y=s?.getGroundHeightAt(a.x,a.z,this.group.position.y,.45)??r}faceDirection(e,t){if(e.lengthSq()<=1e-6)return;const n=Math.atan2(e.x,e.z);this.group.rotation.y=TS(this.group.rotation.y,n,Math.min(1,t*this.turnSpeed))}destroy(){this.popups=Bc(this.group,this.popups,1/0)}}function AS(i,e=!1){const t=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,c=new pn;let l=0;for(let h=0;h<i.length;++h){const u=i[h];let f=0;if(t!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const p in u.attributes){if(!n.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;r[p]===void 0&&(r[p]=[]),r[p].push(u.attributes[p]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const p in u.morphAttributes){if(!s.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[p]===void 0&&(o[p]=[]),o[p].push(u.morphAttributes[p])}if(e){let p;if(t)p=u.index.count;else if(u.attributes.position!==void 0)p=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,p,h),l+=p}}if(t){let h=0;const u=[];for(let f=0;f<i.length;++f){const p=i[f].index;for(let _=0;_<p.count;++_)u.push(p.getX(_)+h);h+=i[f].attributes.position.count}c.setIndex(u)}for(const h in r){const u=df(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,u)}for(const h in o){const u=o[h][0].length;if(u===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let f=0;f<u;++f){const p=[];for(let y=0;y<o[h].length;++y)p.push(o[h][y][f]);const _=df(p);if(!_)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(_)}}return c}function df(i){let e,t,n,s=-1,r=0;for(let l=0;l<i.length;++l){const h=i[l];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*t}const o=new e(r),a=new Hn(o,t,n);let c=0;for(let l=0;l<i.length;++l){const h=i[l];if(h.isInterleavedBufferAttribute){const u=c/t;for(let f=0,p=h.count;f<p;f++)for(let _=0;_<t;_++){const y=h.getComponent(f,_);a.setComponent(f+u,_,y)}}else o.set(h.array,c);c+=h.count*t}return s!==void 0&&(a.gpuType=s),a}function RS({size:i,position:e,color:t,roughness:n=.85,metalness:s=.08}){const r=new It(new wt(i.x,i.y,i.z),new Nt({color:t,roughness:n,metalness:s}));return r.position.copy(e),r.castShadow=!0,r.receiveShadow=!0,r}function gp(i=new kn){const e=[],t=[],n=[],s=[];function r(u){return u&&s.push(u),u}function o(u){return u.updateMatrixWorld(!0),t.push(u.geometry.clone().applyMatrix4(u.matrixWorld)),u}function a(u,{shootable:f=!0,collision:p=!0}={}){return i.add(u),f&&e.push(u),p&&o(u),u}function c(u,f){return a(RS(u),f)}function l(u){return i.add(u.getObject()),e.push(...u.getShootables()),n.push(u),u}function h({spawnPoint:u,groundHeight:f=0}={}){return{scene:i,spawnPoint:u,groundHeight:f,collisionGeometry:t.length>0?AS(t,!1):null,shootables:e,targets:n,dispose(){s.forEach(p=>p.dispose?.())}}}return{group:i,shootables:e,targets:n,addBox:c,addMesh:a,addTarget:l,addDisposable:r,addCollisionFromMesh:o,finalize:h}}function pf(i,{label:e,color:t,position:n,rotation:s=0}){const{group:r}=i,o=new It(new zu(4.8,32),new Nt({color:t,roughness:1,metalness:0,transparent:!0,opacity:.9}));o.rotation.x=-Math.PI/2,o.rotation.z=s,o.position.copy(n).setY(.05),r.add(o);const a=new It(new ku(5.15,5.8,32),new Nt({color:15787732,roughness:1,metalness:0}));a.rotation.x=-Math.PI/2,a.rotation.z=s,a.position.copy(n).setY(.06),r.add(a);const c=document.createElement("canvas");c.width=256,c.height=256;const l=c.getContext("2d");l.clearRect(0,0,c.width,c.height),l.fillStyle="#f7efdf",l.font="bold 170px Segoe UI",l.textAlign="center",l.textBaseline="middle",l.fillText(e,c.width/2,c.height/2+8);const h=new tp(c);i.addDisposable(h);const u=new It(new Wi(5.8,5.8),new xs({map:h,transparent:!0}));u.rotation.x=-Math.PI/2,u.rotation.z=s,u.position.copy(n).setY(.07),r.add(u)}function Vc(i,{width:e,height:t,color:n,position:s,rotation:r=0}){const o=new It(new Wi(e,t),new Nt({color:n,roughness:1,metalness:0}));o.rotation.x=-Math.PI/2,o.rotation.z=r,o.position.copy(s).setY(.03),i.add(o)}function CS(){const i=gp(),{group:e}=i,t=new It(new Wi(104,88),new Nt({color:7824719,roughness:.98,metalness:.02}));t.rotation.x=-Math.PI/2,t.receiveShadow=!0,e.add(t),i.shootables.push(t);const n=new It(new wt(104,1,88),new xs);n.position.set(0,-.5,0),i.addCollisionFromMesh(n);const s=new op(104,26,10716770,6376761);s.position.y=.02,e.add(s),Vc(e,{width:7,height:54,color:7035206,position:new P(0,0,-4)}),Vc(e,{width:12,height:14,color:7167305,position:new P(-24,0,-22),rotation:Math.PI/10}),Vc(e,{width:12,height:14,color:6318435,position:new P(24,0,-22),rotation:-Math.PI/12}),[{size:new P(104,8,2),position:new P(0,4,-44),color:10257767},{size:new P(104,8,2),position:new P(0,4,44),color:10257767},{size:new P(2,8,88),position:new P(-52,4,0),color:9468254},{size:new P(2,8,88),position:new P(52,4,0),color:9468254}].forEach(y=>i.addBox(y)),[{size:new P(18,6,3),position:new P(-14,3,20),color:9269846},{size:new P(18,6,3),position:new P(14,3,20),color:9269846},{size:new P(3,6,18),position:new P(-22,3,12),color:8677711},{size:new P(3,6,18),position:new P(22,3,12),color:8677711},{size:new P(10,6,3),position:new P(0,3,7),color:8744018},{size:new P(3,6,18),position:new P(-10,3,-5),color:9270617},{size:new P(3,6,18),position:new P(10,3,-5),color:9270617},{size:new P(14,6,3),position:new P(-30,3,-3),color:10125666},{size:new P(14,6,3),position:new P(30,3,-3),color:7108464},{size:new P(3,6,20),position:new P(-37,3,-15),color:9862237},{size:new P(3,6,20),position:new P(37,3,-15),color:6713706},{size:new P(16,6,3),position:new P(-16,3,-33),color:9401946},{size:new P(16,6,3),position:new P(16,3,-33),color:7174001},{size:new P(8,5,3),position:new P(0,2.5,-22),color:9205081}].forEach(y=>i.addBox(y)),[{size:new P(5,2.4,5),position:new P(-24,1.2,-19),color:11506286},{size:new P(4,1.8,9),position:new P(-15,.9,-26),color:9401945},{size:new P(5,1.7,5),position:new P(-31,.85,-31),color:6122597},{size:new P(5,2.4,5),position:new P(24,1.2,-19),color:6385770},{size:new P(4,1.8,9),position:new P(15,.9,-26),color:7174773},{size:new P(5,1.7,5),position:new P(31,.85,-31),color:10849133},{size:new P(6,2.2,4),position:new P(0,1.1,-10),color:9270616},{size:new P(4,1.7,4),position:new P(-5,.85,-17),color:10191716},{size:new P(4,1.7,4),position:new P(5,.85,-17),color:7635322}].forEach(y=>i.addBox(y));const c=new It(new wt(11,.8,8),new Nt({color:10586732,roughness:.9,metalness:.04}));c.position.set(-24,.4,-22),c.castShadow=!0,c.receiveShadow=!0,i.addMesh(c);const l=new It(new wt(11,.8,8),new Nt({color:6582635,roughness:.9,metalness:.04}));l.position.set(24,.4,-22),l.castShadow=!0,l.receiveShadow=!0,i.addMesh(l);const h=new It(new wt(6,.7,12),new Nt({color:8152398,roughness:.86,metalness:.08}));h.position.set(0,1.1,-6),h.castShadow=!0,h.receiveShadow=!0,i.addMesh(h);const u=new It(new wt(6,.5,8),new Nt({color:10849130,roughness:.9,metalness:.03}));u.position.set(-8,.55,-6),u.rotation.z=.18,u.castShadow=!0,u.receiveShadow=!0,i.addMesh(u);const f=new It(new wt(6,.5,8),new Nt({color:7305843,roughness:.9,metalness:.03}));f.position.set(8,.55,-6),f.rotation.z=-.18,f.castShadow=!0,f.receiveShadow=!0,i.addMesh(f),pf(i,{label:"A",color:13004596,position:new P(-24,0,-22),rotation:Math.PI/8}),pf(i,{label:"B",color:3247236,position:new P(24,0,-22),rotation:-Math.PI/10});const p=new P(0,0,31);return[new P(-23,.8,-20),new P(0,1.1,-6),new P(23,.8,-20)].forEach(y=>{const x=new mp(y);i.addTarget(x)}),i.finalize({spawnPoint:p,groundHeight:0})}function PS(){const i=gp(),{group:e}=i,t=new It(new Wi(72,72),new Nt({color:2107953,roughness:.97,metalness:.03}));t.rotation.x=-Math.PI/2,t.receiveShadow=!0,e.add(t),i.shootables.push(t);const n=new It(new wt(72,1,72),new xs);n.position.set(0,-.5,0),i.addCollisionFromMesh(n);const s=new op(72,36,5203832,2767172);s.position.y=.02,e.add(s);const r=new It(new Wi(3.2,28),new Nt({color:3360080,roughness:1,metalness:0}));r.rotation.x=-Math.PI/2,r.position.set(0,.03,-1),e.add(r),[{size:new P(72,6,2),position:new P(0,3,-36),color:5333357},{size:new P(72,6,2),position:new P(0,3,36),color:5333357},{size:new P(2,6,72),position:new P(-36,3,0),color:5004392},{size:new P(2,6,72),position:new P(36,3,0),color:5004392},{size:new P(16,4,1.4),position:new P(0,2,6),color:6978180},{size:new P(1.4,4,18),position:new P(-8,2,-4),color:6320508},{size:new P(1.4,4,18),position:new P(8,2,-10),color:6320508},{size:new P(10,2.6,6),position:new P(-15,1.3,-18),color:8088927},{size:new P(8,2.6,6),position:new P(13,1.3,-22),color:8088927},{size:new P(6,2.2,6),position:new P(0,1.1,-18),color:7438988},{size:new P(4,1.6,4),position:new P(-18,.8,10),color:9076071},{size:new P(4,1.6,4),position:new P(18,.8,12),color:9076071},{size:new P(12,3.2,1.2),position:new P(0,1.6,-28),color:5596527}].forEach(u=>i.addBox(u));const a=new It(new wt(10,.5,6),new Nt({color:4478047,roughness:.82,metalness:.14}));a.position.set(19,2.75,-6),a.castShadow=!0,a.receiveShadow=!0,i.addMesh(a);const c=new It(new wt(6,.4,10),new Nt({color:4807269,roughness:.84,metalness:.12}));c.position.set(24,1.2,-6),c.rotation.z=-.24,c.castShadow=!0,c.receiveShadow=!0,i.addMesh(c);const l=new P(0,0,24),h=new mp(new P(6,0,10));return i.addTarget(h),i.finalize({spawnPoint:l,groundHeight:0})}const cu=[{id:"training-ground",label:"Training Ground",create:PS},{id:"desert-compound",label:"Desert Compound",create:CS}];function IS(i){return cu.find(e=>e.id===i)??null}const xp=0,DS=1,LS=2,mf=2,Hc=1.25,gf=1,bn=32,sn=bn/4,_p=65535,Ta=Math.pow(2,-24),Wu=Symbol("SKIP_GENERATION"),yp={strategy:xp,maxDepth:40,maxLeafSize:10,useSharedArrayBuffer:!1,setBoundingBox:!0,onProgress:null,indirect:!1,verbose:!0,range:null,[Wu]:!1};function Yt(i,e,t){return t.min.x=e[i],t.min.y=e[i+1],t.min.z=e[i+2],t.max.x=e[i+3],t.max.y=e[i+4],t.max.z=e[i+5],t}function xf(i){let e=-1,t=-1/0;for(let n=0;n<3;n++){const s=i[n+3]-i[n];s>t&&(t=s,e=n)}return e}function _f(i,e){e.set(i)}function yf(i,e,t){let n,s;for(let r=0;r<3;r++){const o=r+3;n=i[r],s=e[r],t[r]=n<s?n:s,n=i[o],s=e[o],t[o]=n>s?n:s}}function Qo(i,e,t){for(let n=0;n<3;n++){const s=e[i+2*n],r=e[i+2*n+1],o=s-r,a=s+r;o<t[n]&&(t[n]=o),a>t[n+3]&&(t[n+3]=a)}}function Hr(i){const e=i[3]-i[0],t=i[4]-i[1],n=i[5]-i[2];return 2*(e*t+t*n+n*e)}function rn(i,e){return e[i+15]===_p}function wn(i,e){return e[i+6]}function Dn(i,e){return e[i+14]}function fn(i){return i+sn}function dn(i,e){const t=e[i+6];return i+t*sn}function Xu(i,e){return e[i+7]}function Gc(i,e,t,n,s){let r=1/0,o=1/0,a=1/0,c=-1/0,l=-1/0,h=-1/0,u=1/0,f=1/0,p=1/0,_=-1/0,y=-1/0,x=-1/0;const m=i.offset||0;for(let S=(e-m)*6,b=(e+t-m)*6;S<b;S+=6){const w=i[S+0],T=i[S+1],R=w-T,L=w+T;R<r&&(r=R),L>c&&(c=L),w<u&&(u=w),w>_&&(_=w);const U=i[S+2],E=i[S+3],M=U-E,N=U+E;M<o&&(o=M),N>l&&(l=N),U<f&&(f=U),U>y&&(y=U);const B=i[S+4],C=i[S+5],F=B-C,k=B+C;F<a&&(a=F),k>h&&(h=k),B<p&&(p=B),B>x&&(x=B)}n[0]=r,n[1]=o,n[2]=a,n[3]=c,n[4]=l,n[5]=h,s[0]=u,s[1]=f,s[2]=p,s[3]=_,s[4]=y,s[5]=x}const Ui=32,US=(i,e)=>i.candidate-e.candidate,ss=new Array(Ui).fill().map(()=>({count:0,bounds:new Float32Array(6),rightCacheBounds:new Float32Array(6),leftCacheBounds:new Float32Array(6),candidate:0})),ea=new Float32Array(6);function NS(i,e,t,n,s,r){let o=-1,a=0;if(r===xp)o=xf(e),o!==-1&&(a=(e[o]+e[o+3])/2);else if(r===DS)o=xf(i),o!==-1&&(a=OS(t,n,s,o));else if(r===LS){const c=Hr(i);let l=Hc*s;const h=t.offset||0,u=(n-h)*6,f=(n+s-h)*6;for(let p=0;p<3;p++){const _=e[p],m=(e[p+3]-_)/Ui;if(s<Ui/4){const S=[...ss];S.length=s;let b=0;for(let T=u;T<f;T+=6,b++){const R=S[b];R.candidate=t[T+2*p],R.count=0;const{bounds:L,leftCacheBounds:U,rightCacheBounds:E}=R;for(let M=0;M<3;M++)E[M]=1/0,E[M+3]=-1/0,U[M]=1/0,U[M+3]=-1/0,L[M]=1/0,L[M+3]=-1/0;Qo(T,t,L)}S.sort(US);let w=s;for(let T=0;T<w;T++){const R=S[T];for(;T+1<w&&S[T+1].candidate===R.candidate;)S.splice(T+1,1),w--}for(let T=u;T<f;T+=6){const R=t[T+2*p];for(let L=0;L<w;L++){const U=S[L];R>=U.candidate?Qo(T,t,U.rightCacheBounds):(Qo(T,t,U.leftCacheBounds),U.count++)}}for(let T=0;T<w;T++){const R=S[T],L=R.count,U=s-R.count,E=R.leftCacheBounds,M=R.rightCacheBounds;let N=0;L!==0&&(N=Hr(E)/c);let B=0;U!==0&&(B=Hr(M)/c);const C=gf+Hc*(N*L+B*U);C<l&&(o=p,l=C,a=R.candidate)}}else{for(let w=0;w<Ui;w++){const T=ss[w];T.count=0,T.candidate=_+m+w*m;const R=T.bounds;for(let L=0;L<3;L++)R[L]=1/0,R[L+3]=-1/0}for(let w=u;w<f;w+=6){let L=~~((t[w+2*p]-_)/m);L>=Ui&&(L=Ui-1);const U=ss[L];U.count++,Qo(w,t,U.bounds)}const S=ss[Ui-1];_f(S.bounds,S.rightCacheBounds);for(let w=Ui-2;w>=0;w--){const T=ss[w],R=ss[w+1];yf(T.bounds,R.rightCacheBounds,T.rightCacheBounds)}let b=0;for(let w=0;w<Ui-1;w++){const T=ss[w],R=T.count,L=T.bounds,E=ss[w+1].rightCacheBounds;R!==0&&(b===0?_f(L,ea):yf(L,ea,ea)),b+=R;let M=0,N=0;b!==0&&(M=Hr(ea)/c);const B=s-b;B!==0&&(N=Hr(E)/c);const C=gf+Hc*(M*b+N*B);C<l&&(o=p,l=C,a=T.candidate)}}}}else console.warn(`BVH: Invalid build strategy value ${r} used.`);return{axis:o,pos:a}}function OS(i,e,t,n){let s=0;const r=i.offset;for(let o=e,a=e+t;o<a;o++)s+=i[(o-r)*6+n*2];return s/t}class Wc{constructor(){this.boundingData=new Float32Array(6)}}function FS(i,e,t,n,s,r){let o=n,a=n+s-1;const c=r.pos,l=r.axis*2,h=t.offset||0;for(;;){for(;o<=a&&t[(o-h)*6+l]<c;)o++;for(;o<=a&&t[(a-h)*6+l]>=c;)a--;if(o<a){for(let u=0;u<e;u++){let f=i[o*e+u];i[o*e+u]=i[a*e+u],i[a*e+u]=f}for(let u=0;u<6;u++){const f=o-h,p=a-h,_=t[f*6+u];t[f*6+u]=t[p*6+u],t[p*6+u]=_}o++,a--}else return o}}let vp,Aa,lu,Sp;const BS=Math.pow(2,32);function uu(i){return"count"in i?1:1+uu(i.left)+uu(i.right)}function zS(i,e,t){return vp=new Float32Array(t),Aa=new Uint32Array(t),lu=new Uint16Array(t),Sp=new Uint8Array(t),hu(i,e)}function hu(i,e){const t=i/4,n=i/2,s="count"in e,r=e.boundingData;for(let o=0;o<6;o++)vp[t+o]=r[o];if(s)return e.buffer?(Sp.set(new Uint8Array(e.buffer),i),i+e.buffer.byteLength):(Aa[t+6]=e.offset,lu[n+14]=e.count,lu[n+15]=_p,i+bn);{const{left:o,right:a,splitAxis:c}=e,l=i+bn;let h=hu(l,o);const u=i/bn,p=h/bn-u;if(p>BS)throw new Error("MeshBVH: Cannot store relative child node offset greater than 32 bits.");return Aa[t+6]=p,Aa[t+7]=c,hu(h,a)}}function kS(i,e,t,n,s,r){const{maxDepth:o,verbose:a,maxLeafSize:c,strategy:l,onProgress:h}=s,u=i.primitiveBuffer,f=i.primitiveBufferStride,p=new Float32Array(6);let _=!1;const y=new Wc;return Gc(e,t,n,y.boundingData,p),m(y,t,n,p),y;function x(S){h&&h((S-r.offset)/r.count)}function m(S,b,w,T=null,R=0){if(!_&&R>=o&&(_=!0,a&&console.warn(`BVH: Max depth of ${o} reached when generating BVH. Consider increasing maxDepth.`)),w<=c||R>=o)return x(b+w),S.offset=b,S.count=w,S;const L=NS(S.boundingData,T,e,b,w,l);if(L.axis===-1)return x(b+w),S.offset=b,S.count=w,S;const U=FS(u,f,e,b,w,L);if(U===b||U===b+w)x(b+w),S.offset=b,S.count=w;else{S.splitAxis=L.axis;const E=new Wc,M=b,N=U-b;S.left=E,Gc(e,M,N,E.boundingData,p),m(E,M,N,p,R+1);const B=new Wc,C=U,F=w-N;S.right=B,Gc(e,C,F,B.boundingData,p),m(B,C,F,p,R+1)}return S}}function VS(i,e){const t=e.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,n=i.getRootRanges(e.range),s=n[0],r=n[n.length-1],o={offset:s.offset,count:r.offset+r.count-s.offset},a=new Float32Array(6*o.count);a.offset=o.offset,i.computePrimitiveBounds(o.offset,o.count,a),i._roots=n.map(c=>{const l=kS(i,a,c.offset,c.count,e,o),h=uu(l),u=new t(bn*h);return zS(0,l,u),u})}class qu{constructor(e){this._getNewPrimitive=e,this._primitives=[]}getPrimitive(){const e=this._primitives;return e.length===0?this._getNewPrimitive():e.pop()}releasePrimitive(e){this._primitives.push(e)}}class HS{constructor(){this.float32Array=null,this.uint16Array=null,this.uint32Array=null;const e=[];let t=null;this.setBuffer=n=>{t&&e.push(t),t=n,this.float32Array=new Float32Array(n),this.uint16Array=new Uint16Array(n),this.uint32Array=new Uint32Array(n)},this.clearBuffer=()=>{t=null,this.float32Array=null,this.uint16Array=null,this.uint32Array=null,e.length!==0&&this.setBuffer(e.pop())}}}const Ht=new HS;let us,_r;const ar=[],ta=new qu(()=>new An);function GS(i,e,t,n,s,r){us=ta.getPrimitive(),_r=ta.getPrimitive(),ar.push(us,_r),Ht.setBuffer(i._roots[e]);const o=fu(0,i.geometry,t,n,s,r);Ht.clearBuffer(),ta.releasePrimitive(us),ta.releasePrimitive(_r),ar.pop(),ar.pop();const a=ar.length;return a>0&&(_r=ar[a-1],us=ar[a-2]),o}function fu(i,e,t,n,s=null,r=0,o=0){const{float32Array:a,uint16Array:c,uint32Array:l}=Ht;let h=i*2;if(rn(h,c)){const _=wn(i,l),y=Dn(h,c);return Yt(i,a,us),n(_,y,!1,o,r+i/sn,us)}else{let B=function(F){const{uint16Array:k,uint32Array:V}=Ht;let q=F*2;for(;!rn(q,k);)F=fn(F),q=F*2;return wn(F,V)},C=function(F){const{uint16Array:k,uint32Array:V}=Ht;let q=F*2;for(;!rn(q,k);)F=dn(F,V),q=F*2;return wn(F,V)+Dn(q,k)};var f=B,p=C;const _=fn(i),y=dn(i,l);let x=_,m=y,S,b,w,T;if(s&&(w=us,T=_r,Yt(x,a,w),Yt(m,a,T),S=s(w),b=s(T),b<S)){x=y,m=_;const F=S;S=b,b=F,w=T}w||(w=us,Yt(x,a,w));const R=rn(x*2,c),L=t(w,R,S,o+1,r+x/sn);let U;if(L===mf){const F=B(x),V=C(x)-F;U=n(F,V,!0,o+1,r+x/sn,w)}else U=L&&fu(x,e,t,n,s,r,o+1);if(U)return!0;T=_r,Yt(m,a,T);const E=rn(m*2,c),M=t(T,E,b,o+1,r+m/sn);let N;if(M===mf){const F=B(m),V=C(m)-F;N=n(F,V,!0,o+1,r+m/sn,T)}else N=M&&fu(m,e,t,n,s,r,o+1);return!!N}}const no=new Ht.constructor,Fa=new Ht.constructor,rs=new qu(()=>new An),cr=new An,lr=new An,Xc=new An,qc=new An;let $c=!1;function WS(i,e,t,n){if($c)throw new Error("MeshBVH: Recursive calls to bvhcast not supported.");$c=!0;const s=i._roots,r=e._roots;let o,a=0,c=0;const l=new Tt().copy(t).invert();for(let h=0,u=s.length;h<u;h++){no.setBuffer(s[h]),c=0;const f=rs.getPrimitive();Yt(0,no.float32Array,f),f.applyMatrix4(l);for(let p=0,_=r.length;p<_&&(Fa.setBuffer(r[p]),o=li(0,0,t,l,n,a,c,0,0,f),Fa.clearBuffer(),c+=r[p].byteLength/bn,!o);p++);if(rs.releasePrimitive(f),no.clearBuffer(),a+=s[h].byteLength/bn,o)break}return $c=!1,o}function li(i,e,t,n,s,r=0,o=0,a=0,c=0,l=null,h=!1){let u,f;h?(u=Fa,f=no):(u=no,f=Fa);const p=u.float32Array,_=u.uint32Array,y=u.uint16Array,x=f.float32Array,m=f.uint32Array,S=f.uint16Array,b=i*2,w=e*2,T=rn(b,y),R=rn(w,S);let L=!1;if(R&&T)h?L=s(wn(e,m),Dn(e*2,S),wn(i,_),Dn(i*2,y),c,o+e/sn,a,r+i/sn):L=s(wn(i,_),Dn(i*2,y),wn(e,m),Dn(e*2,S),a,r+i/sn,c,o+e/sn);else if(R){const U=rs.getPrimitive();Yt(e,x,U),U.applyMatrix4(t);const E=fn(i),M=dn(i,_);Yt(E,p,cr),Yt(M,p,lr);const N=U.intersectsBox(cr),B=U.intersectsBox(lr);L=N&&li(e,E,n,t,s,o,r,c,a+1,U,!h)||B&&li(e,M,n,t,s,o,r,c,a+1,U,!h),rs.releasePrimitive(U)}else{const U=fn(e),E=dn(e,m);Yt(U,x,Xc),Yt(E,x,qc);const M=l.intersectsBox(Xc),N=l.intersectsBox(qc);if(M&&N)L=li(i,U,t,n,s,r,o,a,c+1,l,h)||li(i,E,t,n,s,r,o,a,c+1,l,h);else if(M)if(T)L=li(i,U,t,n,s,r,o,a,c+1,l,h);else{const B=rs.getPrimitive();B.copy(Xc).applyMatrix4(t);const C=fn(i),F=dn(i,_);Yt(C,p,cr),Yt(F,p,lr);const k=B.intersectsBox(cr),V=B.intersectsBox(lr);L=k&&li(U,C,n,t,s,o,r,c,a+1,B,!h)||V&&li(U,F,n,t,s,o,r,c,a+1,B,!h),rs.releasePrimitive(B)}else if(N)if(T)L=li(i,E,t,n,s,r,o,a,c+1,l,h);else{const B=rs.getPrimitive();B.copy(qc).applyMatrix4(t);const C=fn(i),F=dn(i,_);Yt(C,p,cr),Yt(F,p,lr);const k=B.intersectsBox(cr),V=B.intersectsBox(lr);L=k&&li(E,C,n,t,s,o,r,c,a+1,B,!h)||V&&li(E,F,n,t,s,o,r,c,a+1,B,!h),rs.releasePrimitive(B)}}return L}const vf=new An,ur=new Float32Array(6);class XS{constructor(){this._roots=null,this.primitiveBuffer=null,this.primitiveBufferStride=null}init(e){e={...yp,...e},VS(this,e)}getRootRanges(){throw new Error("BVH: getRootRanges() not implemented")}writePrimitiveBounds(){throw new Error("BVH: writePrimitiveBounds() not implemented")}writePrimitiveRangeBounds(e,t,n,s){let r=1/0,o=1/0,a=1/0,c=-1/0,l=-1/0,h=-1/0;for(let u=e,f=e+t;u<f;u++){this.writePrimitiveBounds(u,ur,0);const[p,_,y,x,m,S]=ur;p<r&&(r=p),x>c&&(c=x),_<o&&(o=_),m>l&&(l=m),y<a&&(a=y),S>h&&(h=S)}return n[s+0]=r,n[s+1]=o,n[s+2]=a,n[s+3]=c,n[s+4]=l,n[s+5]=h,n}computePrimitiveBounds(e,t,n){const s=n.offset||0;for(let r=e,o=e+t;r<o;r++){this.writePrimitiveBounds(r,ur,0);const[a,c,l,h,u,f]=ur,p=(a+h)/2,_=(c+u)/2,y=(l+f)/2,x=(h-a)/2,m=(u-c)/2,S=(f-l)/2,b=(r-s)*6;n[b+0]=p,n[b+1]=x+(Math.abs(p)+x)*Ta,n[b+2]=_,n[b+3]=m+(Math.abs(_)+m)*Ta,n[b+4]=y,n[b+5]=S+(Math.abs(y)+S)*Ta}return n}shiftPrimitiveOffsets(e){const t=this._indirectBuffer;if(t)for(let n=0,s=t.length;n<s;n++)t[n]+=e;else{const n=this._roots;for(let s=0;s<n.length;s++){const r=n[s],o=new Uint32Array(r),a=new Uint16Array(r),c=r.byteLength/bn;for(let l=0;l<c;l++){const h=sn*l,u=2*h;rn(u,a)&&(o[h+6]+=e)}}}}traverse(e,t=0){const n=this._roots[t],s=new Uint32Array(n),r=new Uint16Array(n);o(0);function o(a,c=0){const l=a*2,h=rn(l,r);if(h){const u=s[a+6],f=r[l+14];e(c,h,new Float32Array(n,a*4,6),u,f)}else{const u=fn(a),f=dn(a,s),p=Xu(a,s);e(c,h,new Float32Array(n,a*4,6),p)||(o(u,c+1),o(f,c+1))}}}refit(){const e=this._roots;for(let t=0,n=e.length;t<n;t++){const s=e[t],r=new Uint32Array(s),o=new Uint16Array(s),a=new Float32Array(s),c=s.byteLength/bn;for(let l=c-1;l>=0;l--){const h=l*sn,u=h*2;if(rn(u,o)){const p=wn(h,r),_=Dn(u,o);this.writePrimitiveRangeBounds(p,_,ur,0),a.set(ur,h)}else{const p=fn(h),_=dn(h,r);for(let y=0;y<3;y++){const x=a[p+y],m=a[p+y+3],S=a[_+y],b=a[_+y+3];a[h+y]=x<S?x:S,a[h+y+3]=m>b?m:b}}}}}getBoundingBox(e){return e.makeEmpty(),this._roots.forEach(n=>{Yt(0,new Float32Array(n),vf),e.union(vf)}),e}shapecast(e){let{boundsTraverseOrder:t,intersectsBounds:n,intersectsRange:s,intersectsPrimitive:r,scratchPrimitive:o,iterate:a}=e;if(s&&r){const u=s;s=(f,p,_,y,x)=>u(f,p,_,y,x)?!0:a(f,p,this,r,_,y,o)}else s||(r?s=(u,f,p,_)=>a(u,f,this,r,p,_,o):s=(u,f,p)=>p);let c=!1,l=0;const h=this._roots;for(let u=0,f=h.length;u<f;u++){const p=h[u];if(c=GS(this,u,n,s,t,l),c)break;l+=p.byteLength/bn}return c}bvhcast(e,t,n){let{intersectsRanges:s}=n;return WS(this,e,t,s)}}function qS(){return typeof SharedArrayBuffer<"u"}function $u(i){return i.index?i.index.count:i.attributes.position.count}function Ya(i){return $u(i)/3}function $S(i,e=ArrayBuffer){return i>65535?new Uint32Array(new e(4*i)):new Uint16Array(new e(2*i))}function YS(i,e){if(!i.index){const t=i.attributes.position.count,n=e.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,s=$S(t,n);i.setIndex(new Hn(s,1));for(let r=0;r<t;r++)s[r]=r}}function jS(i,e,t){const n=$u(i)/t,s=e||i.drawRange,r=s.start/t,o=(s.start+s.count)/t,a=Math.max(0,r),c=Math.min(n,o)-a;return{offset:Math.floor(a),count:Math.floor(c)}}function KS(i,e){return i.groups.map(t=>({offset:t.start/e,count:t.count/e}))}function Sf(i,e,t){const n=jS(i,e,t),s=KS(i,t);if(!s.length)return[n];const r=[],o=n.offset,a=n.offset+n.count,c=$u(i)/t,l=[];for(const f of s){const{offset:p,count:_}=f,y=p,x=isFinite(_)?_:c-p,m=p+x;y<a&&m>o&&(l.push({pos:Math.max(o,y),isStart:!0}),l.push({pos:Math.min(a,m),isStart:!1}))}l.sort((f,p)=>f.pos!==p.pos?f.pos-p.pos:f.type==="end"?-1:1);let h=0,u=null;for(const f of l){const p=f.pos;h!==0&&p!==u&&r.push({offset:u,count:p-u}),h+=f.isStart?1:-1,u=p}return r}function ZS(i,e){const t=i[i.length-1],n=t.offset+t.count>2**16,s=i.reduce((l,h)=>l+h.count,0),r=n?4:2,o=e?new SharedArrayBuffer(s*r):new ArrayBuffer(s*r),a=n?new Uint32Array(o):new Uint16Array(o);let c=0;for(let l=0;l<i.length;l++){const{offset:h,count:u}=i[l];for(let f=0;f<u;f++)a[c+f]=h+f;c+=u}return a}class JS extends XS{get indirect(){return!!this._indirectBuffer}get primitiveStride(){return null}get primitiveBufferStride(){return this.indirect?1:this.primitiveStride}set primitiveBufferStride(e){}get primitiveBuffer(){return this.indirect?this._indirectBuffer:this.geometry.index.array}set primitiveBuffer(e){}constructor(e,t={}){if(e.isBufferGeometry){if(e.index&&e.index.isInterleavedBufferAttribute)throw new Error("BVH: InterleavedBufferAttribute is not supported for the index attribute.")}else throw new Error("BVH: Only BufferGeometries are supported.");if(t.useSharedArrayBuffer&&!qS())throw new Error("BVH: SharedArrayBuffer is not available.");super(),this.geometry=e,this.resolvePrimitiveIndex=t.indirect?n=>this._indirectBuffer[n]:n=>n,this.primitiveBuffer=null,this.primitiveBufferStride=null,this._indirectBuffer=null,t={...yp,...t},t[Wu]||this.init(t)}init(e){const{geometry:t,primitiveStride:n}=this;if(e.indirect){const s=Sf(t,e.range,n),r=ZS(s,e.useSharedArrayBuffer);this._indirectBuffer=r}else YS(t,e);super.init(e),!t.boundingBox&&e.setBoundingBox&&(t.boundingBox=this.getBoundingBox(new An))}getRootRanges(e){return this.indirect?[{offset:0,count:this._indirectBuffer.length}]:Sf(this.geometry,e,this.primitiveStride)}raycastObject3D(){throw new Error("BVH: raycastObject3D() not implemented")}}class Xi{constructor(){this.min=1/0,this.max=-1/0}setFromPointsField(e,t){let n=1/0,s=-1/0;for(let r=0,o=e.length;r<o;r++){const c=e[r][t];n=c<n?c:n,s=c>s?c:s}this.min=n,this.max=s}setFromPoints(e,t){let n=1/0,s=-1/0;for(let r=0,o=t.length;r<o;r++){const a=t[r],c=e.dot(a);n=c<n?c:n,s=c>s?c:s}this.min=n,this.max=s}isSeparated(e){return this.min>e.max||e.min>this.max}}Xi.prototype.setFromBox=(function(){const i=new P;return function(t,n){const s=n.min,r=n.max;let o=1/0,a=-1/0;for(let c=0;c<=1;c++)for(let l=0;l<=1;l++)for(let h=0;h<=1;h++){i.x=s.x*c+r.x*(1-c),i.y=s.y*l+r.y*(1-l),i.z=s.z*h+r.z*(1-h);const u=t.dot(i);o=Math.min(u,o),a=Math.max(u,a)}this.min=o,this.max=a}})();const QS=(function(){const i=new P,e=new P,t=new P;return function(s,r,o){const a=s.start,c=i,l=r.start,h=e;t.subVectors(a,l),i.subVectors(s.end,s.start),e.subVectors(r.end,r.start);const u=t.dot(h),f=h.dot(c),p=h.dot(h),_=t.dot(c),x=c.dot(c)*p-f*f;let m,S;x!==0?m=(u*f-_*p)/x:m=0,S=(u+m*f)/p,o.x=m,o.y=S}})(),Yu=(function(){const i=new it,e=new P,t=new P;return function(s,r,o,a){QS(s,r,i);let c=i.x,l=i.y;if(c>=0&&c<=1&&l>=0&&l<=1){s.at(c,o),r.at(l,a);return}else if(c>=0&&c<=1){l<0?r.at(0,a):r.at(1,a),s.closestPointToPoint(a,!0,o);return}else if(l>=0&&l<=1){c<0?s.at(0,o):s.at(1,o),r.closestPointToPoint(o,!0,a);return}else{let h;c<0?h=s.start:h=s.end;let u;l<0?u=r.start:u=r.end;const f=e,p=t;if(s.closestPointToPoint(u,!0,e),r.closestPointToPoint(h,!0,t),f.distanceToSquared(u)<=p.distanceToSquared(h)){o.copy(f),a.copy(u);return}else{o.copy(h),a.copy(p);return}}}})(),eb=(function(){const i=new P,e=new P,t=new Oi,n=new Mi;return function(r,o){const{radius:a,center:c}=r,{a:l,b:h,c:u}=o;if(n.start=l,n.end=h,n.closestPointToPoint(c,!0,i).distanceTo(c)<=a||(n.start=l,n.end=u,n.closestPointToPoint(c,!0,i).distanceTo(c)<=a)||(n.start=h,n.end=u,n.closestPointToPoint(c,!0,i).distanceTo(c)<=a))return!0;const y=o.getPlane(t);if(Math.abs(y.distanceToPoint(c))<=a){const m=y.projectPoint(c,e);if(o.containsPoint(m))return!0}return!1}})(),tb=["x","y","z"],Fi=1e-15,bf=Fi*Fi;function Qn(i){return Math.abs(i)<Fi}class di extends hn{constructor(...e){super(...e),this.isExtendedTriangle=!0,this.satAxes=new Array(4).fill().map(()=>new P),this.satBounds=new Array(4).fill().map(()=>new Xi),this.points=[this.a,this.b,this.c],this.plane=new Oi,this.isDegenerateIntoSegment=!1,this.isDegenerateIntoPoint=!1,this.degenerateSegment=new Mi,this.needsUpdate=!0}intersectsSphere(e){return eb(e,this)}update(){const e=this.a,t=this.b,n=this.c,s=this.points,r=this.satAxes,o=this.satBounds,a=r[0],c=o[0];this.getNormal(a),c.setFromPoints(a,s);const l=r[1],h=o[1];l.subVectors(e,t),h.setFromPoints(l,s);const u=r[2],f=o[2];u.subVectors(t,n),f.setFromPoints(u,s);const p=r[3],_=o[3];p.subVectors(n,e),_.setFromPoints(p,s);const y=l.length(),x=u.length(),m=p.length();this.isDegenerateIntoPoint=!1,this.isDegenerateIntoSegment=!1,y<Fi?x<Fi||m<Fi?this.isDegenerateIntoPoint=!0:(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(e),this.degenerateSegment.end.copy(n)):x<Fi?m<Fi?this.isDegenerateIntoPoint=!0:(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(t),this.degenerateSegment.end.copy(e)):m<Fi&&(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(n),this.degenerateSegment.end.copy(t)),this.plane.setFromNormalAndCoplanarPoint(a,e),this.needsUpdate=!1}}di.prototype.closestPointToSegment=(function(){const i=new P,e=new P,t=new Mi;return function(s,r=null,o=null){const{start:a,end:c}=s,l=this.points;let h,u=1/0;for(let f=0;f<3;f++){const p=(f+1)%3;t.start.copy(l[f]),t.end.copy(l[p]),Yu(t,s,i,e),h=i.distanceToSquared(e),h<u&&(u=h,r&&r.copy(i),o&&o.copy(e))}return this.closestPointToPoint(a,i),h=a.distanceToSquared(i),h<u&&(u=h,r&&r.copy(i),o&&o.copy(a)),this.closestPointToPoint(c,i),h=c.distanceToSquared(i),h<u&&(u=h,r&&r.copy(i),o&&o.copy(c)),Math.sqrt(u)}})();di.prototype.intersectsTriangle=(function(){const i=new di,e=new Xi,t=new Xi,n=new P,s=new P,r=new P,o=new P,a=new Mi,c=new Mi,l=new P,h=new it,u=new it;function f(b,w,T,R){const L=n;!b.isDegenerateIntoPoint&&!b.isDegenerateIntoSegment?L.copy(b.plane.normal):L.copy(w.plane.normal);const U=b.satBounds,E=b.satAxes;for(let B=1;B<4;B++){const C=U[B],F=E[B];if(e.setFromPoints(F,w.points),C.isSeparated(e)||(o.copy(L).cross(F),e.setFromPoints(o,b.points),t.setFromPoints(o,w.points),e.isSeparated(t)))return!1}const M=w.satBounds,N=w.satAxes;for(let B=1;B<4;B++){const C=M[B],F=N[B];if(e.setFromPoints(F,b.points),C.isSeparated(e)||(o.crossVectors(L,F),e.setFromPoints(o,b.points),t.setFromPoints(o,w.points),e.isSeparated(t)))return!1}return T&&(R||console.warn("ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0."),T.start.set(0,0,0),T.end.set(0,0,0)),!0}function p(b,w,T,R,L,U,E,M,N,B,C){let F=E/(E-M);B.x=R+(L-R)*F,C.start.subVectors(w,b).multiplyScalar(F).add(b),F=E/(E-N),B.y=R+(U-R)*F,C.end.subVectors(T,b).multiplyScalar(F).add(b)}function _(b,w,T,R,L,U,E,M,N,B,C){if(L>0)p(b.c,b.a,b.b,R,w,T,N,E,M,B,C);else if(U>0)p(b.b,b.a,b.c,T,w,R,M,E,N,B,C);else if(M*N>0||E!=0)p(b.a,b.b,b.c,w,T,R,E,M,N,B,C);else if(M!=0)p(b.b,b.a,b.c,T,w,R,M,E,N,B,C);else if(N!=0)p(b.c,b.a,b.b,R,w,T,N,E,M,B,C);else return!0;return!1}function y(b,w,T,R){const L=w.degenerateSegment,U=b.plane.distanceToPoint(L.start),E=b.plane.distanceToPoint(L.end);return Qn(U)?Qn(E)?f(b,w,T,R):(T&&(T.start.copy(L.start),T.end.copy(L.start)),b.containsPoint(L.start)):Qn(E)?(T&&(T.start.copy(L.end),T.end.copy(L.end)),b.containsPoint(L.end)):b.plane.intersectLine(L,n)!=null?(T&&(T.start.copy(n),T.end.copy(n)),b.containsPoint(n)):!1}function x(b,w,T){const R=w.a;return Qn(b.plane.distanceToPoint(R))&&b.containsPoint(R)?(T&&(T.start.copy(R),T.end.copy(R)),!0):!1}function m(b,w,T){const R=b.degenerateSegment,L=w.a;return R.closestPointToPoint(L,!0,n),L.distanceToSquared(n)<bf?(T&&(T.start.copy(L),T.end.copy(L)),!0):!1}function S(b,w,T,R){if(b.isDegenerateIntoSegment)if(w.isDegenerateIntoSegment){const L=b.degenerateSegment,U=w.degenerateSegment,E=s,M=r;L.delta(E),U.delta(M);const N=n.subVectors(U.start,L.start),B=E.x*M.y-E.y*M.x;if(Qn(B))return!1;const C=(N.x*M.y-N.y*M.x)/B,F=-(E.x*N.y-E.y*N.x)/B;if(C<0||C>1||F<0||F>1)return!1;const k=L.start.z+E.z*C,V=U.start.z+M.z*F;return Qn(k-V)?(T&&(T.start.copy(L.start).addScaledVector(E,C),T.end.copy(L.start).addScaledVector(E,C)),!0):!1}else return w.isDegenerateIntoPoint?m(b,w,T):y(w,b,T,R);else{if(b.isDegenerateIntoPoint)return w.isDegenerateIntoPoint?w.a.distanceToSquared(b.a)<bf?(T&&(T.start.copy(b.a),T.end.copy(b.a)),!0):!1:w.isDegenerateIntoSegment?m(w,b,T):x(w,b,T);if(w.isDegenerateIntoPoint)return x(b,w,T);if(w.isDegenerateIntoSegment)return y(b,w,T,R)}}return function(w,T=null,R=!1){this.needsUpdate&&this.update(),w.isExtendedTriangle?w.needsUpdate&&w.update():(i.copy(w),i.update(),w=i);const L=S(this,w,T,R);if(L!==void 0)return L;const U=this.plane,E=w.plane;let M=E.distanceToPoint(this.a),N=E.distanceToPoint(this.b),B=E.distanceToPoint(this.c);Qn(M)&&(M=0),Qn(N)&&(N=0),Qn(B)&&(B=0);const C=M*N,F=M*B;if(C>0&&F>0)return!1;let k=U.distanceToPoint(w.a),V=U.distanceToPoint(w.b),q=U.distanceToPoint(w.c);Qn(k)&&(k=0),Qn(V)&&(V=0),Qn(q)&&(q=0);const $=k*V,ae=k*q;if($>0&&ae>0)return!1;s.copy(U.normal),r.copy(E.normal);const Q=s.cross(r);let xe=0,be=Math.abs(Q.x);const He=Math.abs(Q.y);He>be&&(be=He,xe=1),Math.abs(Q.z)>be&&(xe=2);const ct=tb[xe],fe=this.a[ct],pe=this.b[ct],Ae=this.c[ct],je=w.a[ct],Be=w.b[ct],ut=w.c[ct];if(_(this,fe,pe,Ae,C,F,M,N,B,h,a))return f(this,w,T,R);if(_(w,je,Be,ut,$,ae,k,V,q,u,c))return f(this,w,T,R);if(h.y<h.x){const At=h.y;h.y=h.x,h.x=At,l.copy(a.start),a.start.copy(a.end),a.end.copy(l)}if(u.y<u.x){const At=u.y;u.y=u.x,u.x=At,l.copy(c.start),c.start.copy(c.end),c.end.copy(l)}return h.y<u.x||u.y<h.x?!1:(T&&(u.x>h.x?T.start.copy(c.start):T.start.copy(a.start),u.y<h.y?T.end.copy(c.end):T.end.copy(a.end)),!0)}})();di.prototype.distanceToPoint=(function(){const i=new P;return function(t){return this.closestPointToPoint(t,i),t.distanceTo(i)}})();di.prototype.distanceToTriangle=(function(){const i=new P,e=new P,t=["a","b","c"],n=new Mi,s=new Mi;return function(o,a=null,c=null){const l=a||c?n:null;if(this.intersectsTriangle(o,l))return(a||c)&&(a&&l.getCenter(a),c&&l.getCenter(c)),0;let h=1/0;for(let u=0;u<3;u++){let f;const p=t[u],_=o[p];this.closestPointToPoint(_,i),f=_.distanceToSquared(i),f<h&&(h=f,a&&a.copy(i),c&&c.copy(_));const y=this[p];o.closestPointToPoint(y,i),f=y.distanceToSquared(i),f<h&&(h=f,a&&a.copy(y),c&&c.copy(i))}for(let u=0;u<3;u++){const f=t[u],p=t[(u+1)%3];n.set(this[f],this[p]);for(let _=0;_<3;_++){const y=t[_],x=t[(_+1)%3];s.set(o[y],o[x]),Yu(n,s,i,e);const m=i.distanceToSquared(e);m<h&&(h=m,a&&a.copy(i),c&&c.copy(e))}}return Math.sqrt(h)}})();class Un{constructor(e,t,n){this.isOrientedBox=!0,this.min=new P,this.max=new P,this.matrix=new Tt,this.invMatrix=new Tt,this.points=new Array(8).fill().map(()=>new P),this.satAxes=new Array(3).fill().map(()=>new P),this.satBounds=new Array(3).fill().map(()=>new Xi),this.alignedSatBounds=new Array(3).fill().map(()=>new Xi),this.needsUpdate=!1,e&&this.min.copy(e),t&&this.max.copy(t),n&&this.matrix.copy(n)}set(e,t,n){this.min.copy(e),this.max.copy(t),this.matrix.copy(n),this.needsUpdate=!0}copy(e){this.min.copy(e.min),this.max.copy(e.max),this.matrix.copy(e.matrix),this.needsUpdate=!0}}Un.prototype.update=(function(){return function(){const e=this.matrix,t=this.min,n=this.max,s=this.points;for(let l=0;l<=1;l++)for(let h=0;h<=1;h++)for(let u=0;u<=1;u++){const f=1*l|2*h|4*u,p=s[f];p.x=l?n.x:t.x,p.y=h?n.y:t.y,p.z=u?n.z:t.z,p.applyMatrix4(e)}const r=this.satBounds,o=this.satAxes,a=s[0];for(let l=0;l<3;l++){const h=o[l],u=r[l],f=1<<l,p=s[f];h.subVectors(a,p),u.setFromPoints(h,s)}const c=this.alignedSatBounds;c[0].setFromPointsField(s,"x"),c[1].setFromPointsField(s,"y"),c[2].setFromPointsField(s,"z"),this.invMatrix.copy(this.matrix).invert(),this.needsUpdate=!1}})();Un.prototype.intersectsBox=(function(){const i=new Xi;return function(t){this.needsUpdate&&this.update();const n=t.min,s=t.max,r=this.satBounds,o=this.satAxes,a=this.alignedSatBounds;if(i.min=n.x,i.max=s.x,a[0].isSeparated(i)||(i.min=n.y,i.max=s.y,a[1].isSeparated(i))||(i.min=n.z,i.max=s.z,a[2].isSeparated(i)))return!1;for(let c=0;c<3;c++){const l=o[c],h=r[c];if(i.setFromBox(l,t),h.isSeparated(i))return!1}return!0}})();Un.prototype.intersectsTriangle=(function(){const i=new di,e=new Array(3),t=new Xi,n=new Xi,s=new P;return function(o){this.needsUpdate&&this.update(),o.isExtendedTriangle?o.needsUpdate&&o.update():(i.copy(o),i.update(),o=i);const a=this.satBounds,c=this.satAxes;e[0]=o.a,e[1]=o.b,e[2]=o.c;for(let f=0;f<3;f++){const p=a[f],_=c[f];if(t.setFromPoints(_,e),p.isSeparated(t))return!1}const l=o.satBounds,h=o.satAxes,u=this.points;for(let f=0;f<3;f++){const p=l[f],_=h[f];if(t.setFromPoints(_,u),p.isSeparated(t))return!1}for(let f=0;f<3;f++){const p=c[f];for(let _=0;_<4;_++){const y=h[_];if(s.crossVectors(p,y),t.setFromPoints(s,e),n.setFromPoints(s,u),t.isSeparated(n))return!1}}return!0}})();Un.prototype.closestPointToPoint=(function(){return function(e,t){return this.needsUpdate&&this.update(),t.copy(e).applyMatrix4(this.invMatrix).clamp(this.min,this.max).applyMatrix4(this.matrix),t}})();Un.prototype.distanceToPoint=(function(){const i=new P;return function(t){return this.closestPointToPoint(t,i),t.distanceTo(i)}})();Un.prototype.distanceToBox=(function(){const i=["x","y","z"],e=new Array(12).fill().map(()=>new Mi),t=new Array(12).fill().map(()=>new Mi),n=new P,s=new P;return function(o,a=0,c=null,l=null){if(this.needsUpdate&&this.update(),this.intersectsBox(o))return(c||l)&&(o.getCenter(s),this.closestPointToPoint(s,n),o.closestPointToPoint(n,s),c&&c.copy(n),l&&l.copy(s)),0;const h=a*a,u=o.min,f=o.max,p=this.points;let _=1/0;for(let x=0;x<8;x++){const m=p[x];s.copy(m).clamp(u,f);const S=m.distanceToSquared(s);if(S<_&&(_=S,c&&c.copy(m),l&&l.copy(s),S<h))return Math.sqrt(S)}let y=0;for(let x=0;x<3;x++)for(let m=0;m<=1;m++)for(let S=0;S<=1;S++){const b=(x+1)%3,w=(x+2)%3,T=m<<b|S<<w,R=1<<x|m<<b|S<<w,L=p[T],U=p[R];e[y].set(L,U);const M=i[x],N=i[b],B=i[w],C=t[y],F=C.start,k=C.end;F[M]=u[M],F[N]=m?u[N]:f[N],F[B]=S?u[B]:f[N],k[M]=f[M],k[N]=m?u[N]:f[N],k[B]=S?u[B]:f[N],y++}for(let x=0;x<=1;x++)for(let m=0;m<=1;m++)for(let S=0;S<=1;S++){s.x=x?f.x:u.x,s.y=m?f.y:u.y,s.z=S?f.z:u.z,this.closestPointToPoint(s,n);const b=s.distanceToSquared(n);if(b<_&&(_=b,c&&c.copy(n),l&&l.copy(s),b<h))return Math.sqrt(b)}for(let x=0;x<12;x++){const m=e[x];for(let S=0;S<12;S++){const b=t[S];Yu(m,b,n,s);const w=n.distanceToSquared(s);if(w<_&&(_=w,c&&c.copy(n),l&&l.copy(s),w<h))return Math.sqrt(w)}}return Math.sqrt(_)}})();class nb extends qu{constructor(){super(()=>new di)}}const si=new nb,Gr=new P,Yc=new P;function ib(i,e,t={},n=0,s=1/0){const r=n*n,o=s*s;let a=1/0,c=null;if(i.shapecast({boundsTraverseOrder:h=>(Gr.copy(e).clamp(h.min,h.max),Gr.distanceToSquared(e)),intersectsBounds:(h,u,f)=>f<a&&f<o,intersectsTriangle:(h,u)=>{h.closestPointToPoint(e,Gr);const f=e.distanceToSquared(Gr);return f<a&&(Yc.copy(Gr),a=f,c=u),f<r}}),a===1/0)return null;const l=Math.sqrt(a);return t.point?t.point.copy(Yc):t.point=Yc.clone(),t.distance=l,t.faceIndex=c,t}const na=parseInt(ho)>=169,sb=parseInt(ho)<=161,Es=new P,Ts=new P,As=new P,ia=new it,sa=new it,ra=new it,wf=new P,Mf=new P,Ef=new P,Wr=new P;function rb(i,e,t,n,s,r,o,a){let c;if(r===Ln?c=i.intersectTriangle(n,t,e,!0,s):c=i.intersectTriangle(e,t,n,r!==ni,s),c===null)return null;const l=i.origin.distanceTo(s);return l<o||l>a?null:{distance:l,point:s.clone()}}function Tf(i,e,t,n,s,r,o,a,c,l,h){Es.fromBufferAttribute(e,r),Ts.fromBufferAttribute(e,o),As.fromBufferAttribute(e,a);const u=rb(i,Es,Ts,As,Wr,c,l,h);if(u){if(n){ia.fromBufferAttribute(n,r),sa.fromBufferAttribute(n,o),ra.fromBufferAttribute(n,a),u.uv=new it;const p=hn.getInterpolation(Wr,Es,Ts,As,ia,sa,ra,u.uv);na||(u.uv=p)}if(s){ia.fromBufferAttribute(s,r),sa.fromBufferAttribute(s,o),ra.fromBufferAttribute(s,a),u.uv1=new it;const p=hn.getInterpolation(Wr,Es,Ts,As,ia,sa,ra,u.uv1);na||(u.uv1=p),sb&&(u.uv2=u.uv1)}if(t){wf.fromBufferAttribute(t,r),Mf.fromBufferAttribute(t,o),Ef.fromBufferAttribute(t,a),u.normal=new P;const p=hn.getInterpolation(Wr,Es,Ts,As,wf,Mf,Ef,u.normal);u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1),na||(u.normal=p)}const f={a:r,b:o,c:a,normal:new P,materialIndex:0};if(hn.getNormal(Es,Ts,As,f.normal),u.face=f,u.faceIndex=r,na){const p=new P;hn.getBarycoord(Wr,Es,Ts,As,p),u.barycoord=p}}return u}function Af(i){return i&&i.isMaterial?i.side:i}function ja(i,e,t,n,s,r,o){const a=n*3;let c=a+0,l=a+1,h=a+2;const{index:u,groups:f}=i;i.index&&(c=u.getX(c),l=u.getX(l),h=u.getX(h));const{position:p,normal:_,uv:y,uv1:x}=i.attributes;if(Array.isArray(e)){const m=n*3;for(let S=0,b=f.length;S<b;S++){const{start:w,count:T,materialIndex:R}=f[S];if(m>=w&&m<w+T){const L=Af(e[R]),U=Tf(t,p,_,y,x,c,l,h,L,r,o);if(U)if(U.faceIndex=n,U.face.materialIndex=R,s)s.push(U);else return U}}}else{const m=Af(e),S=Tf(t,p,_,y,x,c,l,h,m,r,o);if(S)if(S.faceIndex=n,S.face.materialIndex=0,s)s.push(S);else return S}return null}function tn(i,e,t,n){const s=i.a,r=i.b,o=i.c;let a=e,c=e+1,l=e+2;t&&(a=t.getX(a),c=t.getX(c),l=t.getX(l)),s.x=n.getX(a),s.y=n.getY(a),s.z=n.getZ(a),r.x=n.getX(c),r.y=n.getY(c),r.z=n.getZ(c),o.x=n.getX(l),o.y=n.getY(l),o.z=n.getZ(l)}function ob(i,e,t,n,s,r,o,a){const{geometry:c,_indirectBuffer:l}=i;for(let h=n,u=n+s;h<u;h++)ja(c,e,t,h,r,o,a)}function ab(i,e,t,n,s,r,o){const{geometry:a,_indirectBuffer:c}=i;let l=1/0,h=null;for(let u=n,f=n+s;u<f;u++){let p;p=ja(a,e,t,u,null,r,o),p&&p.distance<l&&(h=p,l=p.distance)}return h}function cb(i,e,t,n,s,r,o){const{geometry:a}=t,{index:c}=a,l=a.attributes.position;for(let h=i,u=e+i;h<u;h++){let f;if(f=h,tn(o,f*3,c,l),o.needsUpdate=!0,n(o,f,s,r))return!0}return!1}function lb(i,e=null){e&&Array.isArray(e)&&(e=new Set(e));const t=i.geometry,n=t.index?t.index.array:null,s=t.attributes.position;let r,o,a,c,l=0;const h=i._roots;for(let f=0,p=h.length;f<p;f++)r=h[f],o=new Uint32Array(r),a=new Uint16Array(r),c=new Float32Array(r),u(0,l),l+=r.byteLength;function u(f,p,_=!1){const y=f*2;if(rn(y,a)){const x=wn(f,o),m=Dn(y,a);let S=1/0,b=1/0,w=1/0,T=-1/0,R=-1/0,L=-1/0;for(let U=3*x,E=3*(x+m);U<E;U++){let M=n[U];const N=s.getX(M),B=s.getY(M),C=s.getZ(M);N<S&&(S=N),N>T&&(T=N),B<b&&(b=B),B>R&&(R=B),C<w&&(w=C),C>L&&(L=C)}return c[f+0]!==S||c[f+1]!==b||c[f+2]!==w||c[f+3]!==T||c[f+4]!==R||c[f+5]!==L?(c[f+0]=S,c[f+1]=b,c[f+2]=w,c[f+3]=T,c[f+4]=R,c[f+5]=L,!0):!1}else{const x=fn(f),m=dn(f,o);let S=_,b=!1,w=!1;if(e){if(!S){const M=x/sn+p/bn,N=m/sn+p/bn;b=e.has(M),w=e.has(N),S=!b&&!w}}else b=!0,w=!0;const T=S||b,R=S||w;let L=!1;T&&(L=u(x,p,S));let U=!1;R&&(U=u(m,p,S));const E=L||U;if(E)for(let M=0;M<3;M++){const N=x+M,B=m+M,C=c[N],F=c[N+3],k=c[B],V=c[B+3];c[f+M]=C<k?C:k,c[f+M+3]=F>V?F:V}return E}}}function ms(i,e,t,n,s){let r,o,a,c,l,h;const u=1/t.direction.x,f=1/t.direction.y,p=1/t.direction.z,_=t.origin.x,y=t.origin.y,x=t.origin.z;let m=e[i],S=e[i+3],b=e[i+1],w=e[i+3+1],T=e[i+2],R=e[i+3+2];return u>=0?(r=(m-_)*u,o=(S-_)*u):(r=(S-_)*u,o=(m-_)*u),f>=0?(a=(b-y)*f,c=(w-y)*f):(a=(w-y)*f,c=(b-y)*f),r>c||a>o||((a>r||isNaN(r))&&(r=a),(c<o||isNaN(o))&&(o=c),p>=0?(l=(T-x)*p,h=(R-x)*p):(l=(R-x)*p,h=(T-x)*p),r>h||l>o)?!1:((l>r||r!==r)&&(r=l),(h<o||o!==o)&&(o=h),r<=s&&o>=n)}function ub(i,e,t,n,s,r,o,a){const{geometry:c,_indirectBuffer:l}=i;for(let h=n,u=n+s;h<u;h++){let f=l?l[h]:h;ja(c,e,t,f,r,o,a)}}function hb(i,e,t,n,s,r,o){const{geometry:a,_indirectBuffer:c}=i;let l=1/0,h=null;for(let u=n,f=n+s;u<f;u++){let p;p=ja(a,e,t,c?c[u]:u,null,r,o),p&&p.distance<l&&(h=p,l=p.distance)}return h}function fb(i,e,t,n,s,r,o){const{geometry:a}=t,{index:c}=a,l=a.attributes.position;for(let h=i,u=e+i;h<u;h++){let f;if(f=t.resolveTriangleIndex(h),tn(o,f*3,c,l),o.needsUpdate=!0,n(o,f,s,r))return!0}return!1}function db(i,e,t,n,s,r,o){Ht.setBuffer(i._roots[e]),du(0,i,t,n,s,r,o),Ht.clearBuffer()}function du(i,e,t,n,s,r,o){const{float32Array:a,uint16Array:c,uint32Array:l}=Ht,h=i*2;if(rn(h,c)){const f=wn(i,l),p=Dn(h,c);ob(e,t,n,f,p,s,r,o)}else{const f=fn(i);ms(f,a,n,r,o)&&du(f,e,t,n,s,r,o);const p=dn(i,l);ms(p,a,n,r,o)&&du(p,e,t,n,s,r,o)}}const pb=["x","y","z"];function mb(i,e,t,n,s,r){Ht.setBuffer(i._roots[e]);const o=pu(0,i,t,n,s,r);return Ht.clearBuffer(),o}function pu(i,e,t,n,s,r){const{float32Array:o,uint16Array:a,uint32Array:c}=Ht;let l=i*2;if(rn(l,a)){const u=wn(i,c),f=Dn(l,a);return ab(e,t,n,u,f,s,r)}else{const u=Xu(i,c),f=pb[u],_=n.direction[f]>=0;let y,x;_?(y=fn(i),x=dn(i,c)):(y=dn(i,c),x=fn(i));const S=ms(y,o,n,s,r)?pu(y,e,t,n,s,r):null;if(S){const T=S.point[f];if(_?T<=o[x+u]:T>=o[x+u+3])return S}const w=ms(x,o,n,s,r)?pu(x,e,t,n,s,r):null;return S&&w?S.distance<=w.distance?S:w:S||w||null}}const oa=new An,hr=new di,fr=new di,Xr=new Tt,Rf=new Un,aa=new Un;function gb(i,e,t,n){Ht.setBuffer(i._roots[e]);const s=mu(0,i,t,n);return Ht.clearBuffer(),s}function mu(i,e,t,n,s=null){const{float32Array:r,uint16Array:o,uint32Array:a}=Ht;let c=i*2;if(s===null&&(t.boundingBox||t.computeBoundingBox(),Rf.set(t.boundingBox.min,t.boundingBox.max,n),s=Rf),rn(c,o)){const h=e.geometry,u=h.index,f=h.attributes.position,p=t.index,_=t.attributes.position,y=wn(i,a),x=Dn(c,o);if(Xr.copy(n).invert(),t.boundsTree)return Yt(i,r,aa),aa.matrix.copy(Xr),aa.needsUpdate=!0,t.boundsTree.shapecast({intersectsBounds:S=>aa.intersectsBox(S),intersectsTriangle:S=>{S.a.applyMatrix4(n),S.b.applyMatrix4(n),S.c.applyMatrix4(n),S.needsUpdate=!0;for(let b=y*3,w=(x+y)*3;b<w;b+=3)if(tn(fr,b,u,f),fr.needsUpdate=!0,S.intersectsTriangle(fr))return!0;return!1}});{const m=Ya(t);for(let S=y*3,b=(x+y)*3;S<b;S+=3){tn(hr,S,u,f),hr.a.applyMatrix4(Xr),hr.b.applyMatrix4(Xr),hr.c.applyMatrix4(Xr),hr.needsUpdate=!0;for(let w=0,T=m*3;w<T;w+=3)if(tn(fr,w,p,_),fr.needsUpdate=!0,hr.intersectsTriangle(fr))return!0}}}else{const h=fn(i),u=dn(i,a);return Yt(h,r,oa),!!(s.intersectsBox(oa)&&mu(h,e,t,n,s)||(Yt(u,r,oa),s.intersectsBox(oa)&&mu(u,e,t,n,s)))}}const ca=new Tt,jc=new Un,qr=new Un,xb=new P,_b=new P,yb=new P,vb=new P;function Sb(i,e,t,n={},s={},r=0,o=1/0){e.boundingBox||e.computeBoundingBox(),jc.set(e.boundingBox.min,e.boundingBox.max,t),jc.needsUpdate=!0;const a=i.geometry,c=a.attributes.position,l=a.index,h=e.attributes.position,u=e.index,f=si.getPrimitive(),p=si.getPrimitive();let _=xb,y=_b,x=null,m=null;s&&(x=yb,m=vb);let S=1/0,b=null,w=null;return ca.copy(t).invert(),qr.matrix.copy(ca),i.shapecast({boundsTraverseOrder:T=>jc.distanceToBox(T),intersectsBounds:(T,R,L)=>L<S&&L<o?(R&&(qr.min.copy(T.min),qr.max.copy(T.max),qr.needsUpdate=!0),!0):!1,intersectsRange:(T,R)=>{if(e.boundsTree)return e.boundsTree.shapecast({boundsTraverseOrder:U=>qr.distanceToBox(U),intersectsBounds:(U,E,M)=>M<S&&M<o,intersectsRange:(U,E)=>{for(let M=U,N=U+E;M<N;M++){tn(p,3*M,u,h),p.a.applyMatrix4(t),p.b.applyMatrix4(t),p.c.applyMatrix4(t),p.needsUpdate=!0;for(let B=T,C=T+R;B<C;B++){tn(f,3*B,l,c),f.needsUpdate=!0;const F=f.distanceToTriangle(p,_,x);if(F<S&&(y.copy(_),m&&m.copy(x),S=F,b=B,w=M),F<r)return!0}}}});{const L=Ya(e);for(let U=0,E=L;U<E;U++){tn(p,3*U,u,h),p.a.applyMatrix4(t),p.b.applyMatrix4(t),p.c.applyMatrix4(t),p.needsUpdate=!0;for(let M=T,N=T+R;M<N;M++){tn(f,3*M,l,c),f.needsUpdate=!0;const B=f.distanceToTriangle(p,_,x);if(B<S&&(y.copy(_),m&&m.copy(x),S=B,b=M,w=U),B<r)return!0}}}}}),si.releasePrimitive(f),si.releasePrimitive(p),S===1/0?null:(n.point?n.point.copy(y):n.point=y.clone(),n.distance=S,n.faceIndex=b,s&&(s.point?s.point.copy(m):s.point=m.clone(),s.point.applyMatrix4(ca),y.applyMatrix4(ca),s.distance=y.sub(s.point).length(),s.faceIndex=w),n)}function bb(i,e=null){e&&Array.isArray(e)&&(e=new Set(e));const t=i.geometry,n=t.index?t.index.array:null,s=t.attributes.position;let r,o,a,c,l=0;const h=i._roots;for(let f=0,p=h.length;f<p;f++)r=h[f],o=new Uint32Array(r),a=new Uint16Array(r),c=new Float32Array(r),u(0,l),l+=r.byteLength;function u(f,p,_=!1){const y=f*2;if(rn(y,a)){const x=wn(f,o),m=Dn(y,a);let S=1/0,b=1/0,w=1/0,T=-1/0,R=-1/0,L=-1/0;for(let U=x,E=x+m;U<E;U++){const M=3*i.resolveTriangleIndex(U);for(let N=0;N<3;N++){let B=M+N;B=n?n[B]:B;const C=s.getX(B),F=s.getY(B),k=s.getZ(B);C<S&&(S=C),C>T&&(T=C),F<b&&(b=F),F>R&&(R=F),k<w&&(w=k),k>L&&(L=k)}}return c[f+0]!==S||c[f+1]!==b||c[f+2]!==w||c[f+3]!==T||c[f+4]!==R||c[f+5]!==L?(c[f+0]=S,c[f+1]=b,c[f+2]=w,c[f+3]=T,c[f+4]=R,c[f+5]=L,!0):!1}else{const x=fn(f),m=dn(f,o);let S=_,b=!1,w=!1;if(e){if(!S){const M=x/sn+p/bn,N=m/sn+p/bn;b=e.has(M),w=e.has(N),S=!b&&!w}}else b=!0,w=!0;const T=S||b,R=S||w;let L=!1;T&&(L=u(x,p,S));let U=!1;R&&(U=u(m,p,S));const E=L||U;if(E)for(let M=0;M<3;M++){const N=x+M,B=m+M,C=c[N],F=c[N+3],k=c[B],V=c[B+3];c[f+M]=C<k?C:k,c[f+M+3]=F>V?F:V}return E}}}function wb(i,e,t,n,s,r,o){Ht.setBuffer(i._roots[e]),gu(0,i,t,n,s,r,o),Ht.clearBuffer()}function gu(i,e,t,n,s,r,o){const{float32Array:a,uint16Array:c,uint32Array:l}=Ht,h=i*2;if(rn(h,c)){const f=wn(i,l),p=Dn(h,c);ub(e,t,n,f,p,s,r,o)}else{const f=fn(i);ms(f,a,n,r,o)&&gu(f,e,t,n,s,r,o);const p=dn(i,l);ms(p,a,n,r,o)&&gu(p,e,t,n,s,r,o)}}const Mb=["x","y","z"];function Eb(i,e,t,n,s,r){Ht.setBuffer(i._roots[e]);const o=xu(0,i,t,n,s,r);return Ht.clearBuffer(),o}function xu(i,e,t,n,s,r){const{float32Array:o,uint16Array:a,uint32Array:c}=Ht;let l=i*2;if(rn(l,a)){const u=wn(i,c),f=Dn(l,a);return hb(e,t,n,u,f,s,r)}else{const u=Xu(i,c),f=Mb[u],_=n.direction[f]>=0;let y,x;_?(y=fn(i),x=dn(i,c)):(y=dn(i,c),x=fn(i));const S=ms(y,o,n,s,r)?xu(y,e,t,n,s,r):null;if(S){const T=S.point[f];if(_?T<=o[x+u]:T>=o[x+u+3])return S}const w=ms(x,o,n,s,r)?xu(x,e,t,n,s,r):null;return S&&w?S.distance<=w.distance?S:w:S||w||null}}const la=new An,dr=new di,pr=new di,$r=new Tt,Cf=new Un,ua=new Un;function Tb(i,e,t,n){Ht.setBuffer(i._roots[e]);const s=_u(0,i,t,n);return Ht.clearBuffer(),s}function _u(i,e,t,n,s=null){const{float32Array:r,uint16Array:o,uint32Array:a}=Ht;let c=i*2;if(s===null&&(t.boundingBox||t.computeBoundingBox(),Cf.set(t.boundingBox.min,t.boundingBox.max,n),s=Cf),rn(c,o)){const h=e.geometry,u=h.index,f=h.attributes.position,p=t.index,_=t.attributes.position,y=wn(i,a),x=Dn(c,o);if($r.copy(n).invert(),t.boundsTree)return Yt(i,r,ua),ua.matrix.copy($r),ua.needsUpdate=!0,t.boundsTree.shapecast({intersectsBounds:S=>ua.intersectsBox(S),intersectsTriangle:S=>{S.a.applyMatrix4(n),S.b.applyMatrix4(n),S.c.applyMatrix4(n),S.needsUpdate=!0;for(let b=y,w=x+y;b<w;b++)if(tn(pr,3*e.resolveTriangleIndex(b),u,f),pr.needsUpdate=!0,S.intersectsTriangle(pr))return!0;return!1}});{const m=Ya(t);for(let S=y,b=x+y;S<b;S++){const w=e.resolveTriangleIndex(S);tn(dr,3*w,u,f),dr.a.applyMatrix4($r),dr.b.applyMatrix4($r),dr.c.applyMatrix4($r),dr.needsUpdate=!0;for(let T=0,R=m*3;T<R;T+=3)if(tn(pr,T,p,_),pr.needsUpdate=!0,dr.intersectsTriangle(pr))return!0}}}else{const h=fn(i),u=dn(i,a);return Yt(h,r,la),!!(s.intersectsBox(la)&&_u(h,e,t,n,s)||(Yt(u,r,la),s.intersectsBox(la)&&_u(u,e,t,n,s)))}}const ha=new Tt,Kc=new Un,Yr=new Un,Ab=new P,Rb=new P,Cb=new P,Pb=new P;function Ib(i,e,t,n={},s={},r=0,o=1/0){e.boundingBox||e.computeBoundingBox(),Kc.set(e.boundingBox.min,e.boundingBox.max,t),Kc.needsUpdate=!0;const a=i.geometry,c=a.attributes.position,l=a.index,h=e.attributes.position,u=e.index,f=si.getPrimitive(),p=si.getPrimitive();let _=Ab,y=Rb,x=null,m=null;s&&(x=Cb,m=Pb);let S=1/0,b=null,w=null;return ha.copy(t).invert(),Yr.matrix.copy(ha),i.shapecast({boundsTraverseOrder:T=>Kc.distanceToBox(T),intersectsBounds:(T,R,L)=>L<S&&L<o?(R&&(Yr.min.copy(T.min),Yr.max.copy(T.max),Yr.needsUpdate=!0),!0):!1,intersectsRange:(T,R)=>{if(e.boundsTree){const L=e.boundsTree;return L.shapecast({boundsTraverseOrder:U=>Yr.distanceToBox(U),intersectsBounds:(U,E,M)=>M<S&&M<o,intersectsRange:(U,E)=>{for(let M=U,N=U+E;M<N;M++){const B=L.resolveTriangleIndex(M);tn(p,3*B,u,h),p.a.applyMatrix4(t),p.b.applyMatrix4(t),p.c.applyMatrix4(t),p.needsUpdate=!0;for(let C=T,F=T+R;C<F;C++){const k=i.resolveTriangleIndex(C);tn(f,3*k,l,c),f.needsUpdate=!0;const V=f.distanceToTriangle(p,_,x);if(V<S&&(y.copy(_),m&&m.copy(x),S=V,b=C,w=M),V<r)return!0}}}})}else{const L=Ya(e);for(let U=0,E=L;U<E;U++){tn(p,3*U,u,h),p.a.applyMatrix4(t),p.b.applyMatrix4(t),p.c.applyMatrix4(t),p.needsUpdate=!0;for(let M=T,N=T+R;M<N;M++){const B=i.resolveTriangleIndex(M);tn(f,3*B,l,c),f.needsUpdate=!0;const C=f.distanceToTriangle(p,_,x);if(C<S&&(y.copy(_),m&&m.copy(x),S=C,b=M,w=U),C<r)return!0}}}}}),si.releasePrimitive(f),si.releasePrimitive(p),S===1/0?null:(n.point?n.point.copy(y):n.point=y.clone(),n.distance=S,n.faceIndex=b,s&&(s.point?s.point.copy(m):s.point=m.clone(),s.point.applyMatrix4(ha),y.applyMatrix4(ha),s.distance=y.sub(s.point).length(),s.faceIndex=w),n)}function Pf(i,e,t){return i===null?null:(i.point.applyMatrix4(e.matrixWorld),i.distance=i.point.distanceTo(t.ray.origin),i.object=e,i)}const fa=new Un,da=new Ar,If=new P,Df=new Tt,Lf=new P,Zc=["getX","getY","getZ"];class Ba extends JS{static serialize(e,t={}){t={cloneBuffers:!0,...t};const n=e.geometry,s=e._roots,r=e._indirectBuffer,o=n.getIndex(),a={version:1,roots:null,index:null,indirectBuffer:null};return t.cloneBuffers?(a.roots=s.map(c=>c.slice()),a.index=o?o.array.slice():null,a.indirectBuffer=r?r.slice():null):(a.roots=s,a.index=o?o.array:null,a.indirectBuffer=r),a}static deserialize(e,t,n={}){n={setIndex:!0,indirect:!!e.indirectBuffer,...n};const{index:s,roots:r,indirectBuffer:o}=e;e.version||(console.warn("MeshBVH.deserialize: Serialization format has been changed and will be fixed up. It is recommended to regenerate any stored serialized data."),c(r));const a=new Ba(t,{...n,[Wu]:!0});if(a._roots=r,a._indirectBuffer=o||null,n.setIndex){const l=t.getIndex();if(l===null){const h=new Hn(e.index,1,!1);t.setIndex(h)}else l.array!==s&&(l.array.set(s),l.needsUpdate=!0)}return a;function c(l){for(let h=0;h<l.length;h++){const u=l[h],f=new Uint32Array(u),p=new Uint16Array(u);for(let _=0,y=u.byteLength/bn;_<y;_++){const x=sn*_,m=2*x;rn(m,p)||(f[x+6]=f[x+6]/sn-_)}}}}get primitiveStride(){return 3}get resolveTriangleIndex(){return this.resolvePrimitiveIndex}constructor(e,t={}){t.maxLeafTris&&(console.warn('MeshBVH: "maxLeafTris" option has been deprecated. Use maxLeafSize, instead.'),t={...t,maxLeafSize:t.maxLeafTris}),super(e,t)}shiftTriangleOffsets(e){return super.shiftPrimitiveOffsets(e)}writePrimitiveBounds(e,t,n){const s=this.geometry,r=this._indirectBuffer,o=s.attributes.position,a=s.index?s.index.array:null,l=(r?r[e]:e)*3;let h=l+0,u=l+1,f=l+2;a&&(h=a[h],u=a[u],f=a[f]);for(let p=0;p<3;p++){const _=o[Zc[p]](h),y=o[Zc[p]](u),x=o[Zc[p]](f);let m=_;y<m&&(m=y),x<m&&(m=x);let S=_;y>S&&(S=y),x>S&&(S=x),t[n+p]=m,t[n+p+3]=S}return t}computePrimitiveBounds(e,t,n){const s=this.geometry,r=this._indirectBuffer,o=s.attributes.position,a=s.index?s.index.array:null,c=o.normalized;if(e<0||t+e-n.offset>n.length/6)throw new Error("MeshBVH: compute triangle bounds range is invalid.");const l=o.array,h=o.offset||0;let u=3;o.isInterleavedBufferAttribute&&(u=o.data.stride);const f=["getX","getY","getZ"],p=n.offset;for(let _=e,y=e+t;_<y;_++){const m=(r?r[_]:_)*3,S=(_-p)*6;let b=m+0,w=m+1,T=m+2;a&&(b=a[b],w=a[w],T=a[T]),c||(b=b*u+h,w=w*u+h,T=T*u+h);for(let R=0;R<3;R++){let L,U,E;c?(L=o[f[R]](b),U=o[f[R]](w),E=o[f[R]](T)):(L=l[b+R],U=l[w+R],E=l[T+R]);let M=L;U<M&&(M=U),E<M&&(M=E);let N=L;U>N&&(N=U),E>N&&(N=E);const B=(N-M)/2,C=R*2;n[S+C+0]=M+B,n[S+C+1]=B+(Math.abs(M)+B)*Ta}}return n}raycastObject3D(e,t,n=[]){const{material:s}=e;if(s===void 0)return;Df.copy(e.matrixWorld).invert(),da.copy(t.ray).applyMatrix4(Df),Lf.setFromMatrixScale(e.matrixWorld),If.copy(da.direction).multiply(Lf);const r=If.length(),o=t.near/r,a=t.far/r;if(t.firstHitOnly===!0){let c=this.raycastFirst(da,s,o,a);c=Pf(c,e,t),c&&n.push(c)}else{const c=this.raycast(da,s,o,a);for(let l=0,h=c.length;l<h;l++){const u=Pf(c[l],e,t);u&&n.push(u)}}return n}refit(e=null){return(this.indirect?bb:lb)(this,e)}raycast(e,t=Si,n=0,s=1/0){const r=this._roots,o=[],a=this.indirect?wb:db;for(let c=0,l=r.length;c<l;c++)a(this,c,t,e,o,n,s);return o}raycastFirst(e,t=Si,n=0,s=1/0){const r=this._roots;let o=null;const a=this.indirect?Eb:mb;for(let c=0,l=r.length;c<l;c++){const h=a(this,c,t,e,n,s);h!=null&&(o==null||h.distance<o.distance)&&(o=h)}return o}intersectsGeometry(e,t){let n=!1;const s=this._roots,r=this.indirect?Tb:gb;for(let o=0,a=s.length;o<a&&(n=r(this,o,e,t),!n);o++);return n}shapecast(e){const t=si.getPrimitive(),n=super.shapecast({...e,intersectsPrimitive:e.intersectsTriangle,scratchPrimitive:t,iterate:this.indirect?fb:cb});return si.releasePrimitive(t),n}bvhcast(e,t,n){let{intersectsRanges:s,intersectsTriangles:r}=n;const o=si.getPrimitive(),a=this.geometry.index,c=this.geometry.attributes.position,l=this.indirect?_=>{const y=this.resolveTriangleIndex(_);tn(o,y*3,a,c)}:_=>{tn(o,_*3,a,c)},h=si.getPrimitive(),u=e.geometry.index,f=e.geometry.attributes.position,p=e.indirect?_=>{const y=e.resolveTriangleIndex(_);tn(h,y*3,u,f)}:_=>{tn(h,_*3,u,f)};if(r){if(!(e instanceof Ba))throw new Error('MeshBVH: "intersectsTriangles" callback can only be used with another MeshBVH.');const _=(y,x,m,S,b,w,T,R)=>{for(let L=m,U=m+S;L<U;L++){p(L),h.a.applyMatrix4(t),h.b.applyMatrix4(t),h.c.applyMatrix4(t),h.needsUpdate=!0;for(let E=y,M=y+x;E<M;E++)if(l(E),o.needsUpdate=!0,r(o,h,E,L,b,w,T,R))return!0}return!1};if(s){const y=s;s=function(x,m,S,b,w,T,R,L){return y(x,m,S,b,w,T,R,L)?!0:_(x,m,S,b,w,T,R,L)}}else s=_}return super.bvhcast(e,t,{intersectsRanges:s})}intersectsBox(e,t){return fa.set(e.min,e.max,t),fa.needsUpdate=!0,this.shapecast({intersectsBounds:n=>fa.intersectsBox(n),intersectsTriangle:n=>fa.intersectsTriangle(n)})}intersectsSphere(e){return this.shapecast({intersectsBounds:t=>e.intersectsBox(t),intersectsTriangle:t=>t.intersectsSphere(e)})}closestPointToGeometry(e,t,n={},s={},r=0,o=1/0){return(this.indirect?Ib:Sb)(this,e,t,n,s,r,o)}closestPointToPoint(e,t={},n=0,s=1/0){return ib(this,e,t,n,s)}}const mr=new An,mi=new Mi,Uf=new P,Nf=new P,gr=new P,Jc=new Ar,Qc=new Ar,pa=new P;class Db{constructor({groundHeight:e=0,collisionGeometry:t=null}={}){this.groundHeight=e,this.collisionGeometry=t??null,this.collisionGeometry&&!this.collisionGeometry.boundsTree&&(this.collisionGeometry.boundsTree=new Ba(this.collisionGeometry,{maxLeafSize:16}))}getGroundHeight(){return this.groundHeight}getGroundHeightAt(e,t,n=1/0,s=1/0,r=12){if(!this.collisionGeometry?.boundsTree||!Number.isFinite(n))return this.groundHeight;const o=n+s+.05;Jc.origin.set(e,o,t),Jc.direction.set(0,-1,0);const a=this.collisionGeometry.boundsTree.raycastFirst(Jc,ni,0,s+r+.1);return!a||(a.face?.normal?.y??0)<=.15?this.groundHeight:Math.max(this.groundHeight,a.point.y)}move(e,t,n,s){const r=e.clone().add(s);if(!this.collisionGeometry?.boundsTree)return r;const o=r.y+t,a=r.y+Math.max(t,n-t);mi.start.set(r.x,o,r.z),mi.end.set(r.x,a,r.z);for(let c=0;c<3;c+=1){let l=!1;if(mr.makeEmpty(),mr.expandByPoint(mi.start),mr.expandByPoint(mi.end),mr.min.addScalar(-t),mr.max.addScalar(t),this.collisionGeometry.boundsTree.shapecast({intersectsBounds:h=>h.intersectsBox(mr),intersectsTriangle:h=>{const u=h.closestPointToSegment(mi,Uf,Nf);if(u>=t)return!1;gr.copy(Nf).sub(Uf),gr.lengthSq()<1e-8?h.getNormal(gr):gr.normalize();const f=t-u;return mi.start.addScaledVector(gr,f),mi.end.addScaledVector(gr,f),l=!0,!1}}),!l)break}return r.set(mi.start.x,mi.start.y-t,mi.start.z),r}hasLineOfSight(e,t,n=.05){if(!this.collisionGeometry?.boundsTree)return!0;pa.copy(t).sub(e);const s=pa.length();return s<=1e-4?!0:(pa.divideScalar(s),Qc.origin.copy(e),Qc.direction.copy(pa),!this.collisionGeometry.boundsTree.raycastFirst(Qc,ni,0,s-n))}}const bp={standHeight:1.72,crouchHeight:1.08,radius:.35,walkSpeed:4.1,runSpeed:6.2,crouchSpeed:2.2,jumpForce:6.1,gravity:18,acceleration:32,airControl:.35,crouchLerpSpeed:12,maxStepHeight:.45};function Lb(i,e,t){return Math.max(e,Math.min(t,i))}function el(i,e,t){return i+(e-i)*t}function wp({position:i={x:0,y:0,z:0},velocity:e={x:0,y:0,z:0},yaw:t=0,isGrounded:n=!0,isCrouched:s=!1,currentHeight:r=bp.standHeight}={}){return{position:{x:i.x,y:i.y,z:i.z},velocity:{x:e.x,y:e.y,z:e.z},yaw:t,isGrounded:n,isCrouched:s,currentHeight:r}}function Ub(i,e,t,n={}){const s={...bp,...n.config??{}},r=wp(i),o=n.groundHeight??0,a=n.speedMultiplier??1,c=Number(e?.yaw??r.yaw??0),l=!!e?.crouch,h=!!e?.jump,u=!!e?.sprint;r.yaw=c,r.isCrouched=l;const f=l?s.crouchHeight:s.standHeight;r.currentHeight=el(r.currentHeight,f,1-Math.exp(-s.crouchLerpSpeed*t));const p=-Math.sin(c),_=-Math.cos(c),y=Math.cos(c),x=-Math.sin(c);let m=0,S=0;e?.forward&&(m+=p,S+=_),e?.backward&&(m-=p,S-=_),e?.right&&(m+=y,S+=x),e?.left&&(m-=y,S-=x);const b=Math.hypot(m,S);b>0&&(m/=b,S/=b);const w=(l?s.crouchSpeed:u?s.runSpeed:s.walkSpeed)*a,T=b>0?m*w:0,R=b>0?S*w:0,L=r.isGrounded?1:s.airControl,U=Math.min(1,s.acceleration*L*t);r.velocity.x=el(r.velocity.x,T,U),r.velocity.z=el(r.velocity.z,R,U);const E=r.isGrounded;r.isGrounded&&h&&(r.velocity.y=s.jumpForce,r.isGrounded=!1),r.isGrounded||(r.velocity.y-=s.gravity*t);const M=r.velocity.x*t,N=r.velocity.y*t,B=r.velocity.z*t,C=n.moveHorizontal?n.moveHorizontal(r.position,s.radius,r.currentHeight,{x:M,z:B}):{x:r.position.x+M,y:r.position.y,z:r.position.z+B};r.position.x=C.x,r.position.z=C.z,r.position.y+=N;const F=n.getGroundHeightAt?n.getGroundHeightAt(r.position.x,r.position.z,r.position.y,E?s.maxStepHeight:0):o;return E&&r.velocity.y<=0&&r.position.y<=F+s.maxStepHeight||r.position.y<=F?(r.position.y=F,r.velocity.y=0,r.isGrounded=!0):r.isGrounded=!1,r.position.y=Lb(r.position.y,o-32,256),r}const Of=new P,Nb=new P;class Ob{constructor(e,t,n={}){this.camera=e,this.input=t,this.collisionWorld=n.collisionWorld??null,this.getSpeedMultiplier=n.getSpeedMultiplier??(()=>1),this.collider=new kn,this.yaw=new Gt,this.pitch=new Gt,this.standHeight=1.72,this.crouchHeight=1.08,this.currentHeight=this.standHeight,this.radius=.35,this.yaw.position.copy(n.position??new P(0,0,0)),this.yaw.add(this.pitch),this.pitch.add(this.camera),this.collider.add(this.yaw),this.velocity=new P,this.position=this.yaw.position,this.walkSpeed=4.1,this.runSpeed=6.2,this.crouchSpeed=2.2,this.jumpForce=6.1,this.gravity=18,this.acceleration=32,this.airControl=.35,this.mouseSensitivity=n.mouseSensitivity??.0011,this.baseFov=e.fov,this.crouchLerpSpeed=12,this.maxStepHeight=.45,this.groundHeight=n.groundHeight??0,this.isGrounded=!0,this.isCrouched=!1,this.pitchAngle=0,this.yawAngle=0,this.motionState=wp({position:this.position,velocity:this.velocity,yaw:this.yawAngle,isGrounded:this.isGrounded,isCrouched:this.isCrouched,currentHeight:this.currentHeight}),this.camera.position.set(0,0,0),this.pitch.position.y=this.currentHeight}getObject(){return this.collider}getDebugState(){const e=Math.sqrt(this.velocity.x*this.velocity.x+this.velocity.z*this.velocity.z);return{grounded:this.isGrounded,crouched:this.isCrouched,speed:e,position:this.position.clone()}}getEyePosition(e=new P){return e.copy(this.position).setY(this.position.y+this.currentHeight)}getNetworkState(){return{position:{x:this.position.x,y:this.position.y,z:this.position.z},yaw:this.yawAngle}}setMouseSensitivity(e){this.mouseSensitivity=Math.max(1e-4,e)}getMouseSensitivity(){return this.mouseSensitivity}update(e,t){this.updateLook(t.lookDelta),this.updateMovement(e,this.getMovementInputSnapshot(t))}updateLook(e){const t=this.mouseSensitivity*(this.camera.fov/this.baseFov);this.yawAngle-=e.x*t,this.pitchAngle-=e.y*t,this.pitchAngle=Zt.clamp(this.pitchAngle,-Math.PI/2,Math.PI/2),this.yaw.rotation.y=this.yawAngle,this.pitch.rotation.x=this.pitchAngle}getMovementInputSnapshot(e){return{forward:this.input.isPressed("KeyW"),backward:this.input.isPressed("KeyS"),left:this.input.isPressed("KeyA"),right:this.input.isPressed("KeyD"),sprint:this.input.isPressed("ShiftLeft"),crouch:this.input.isPressed("ControlLeft")||this.input.isPressed("KeyC"),jump:e.justPressed.has("Space"),yaw:this.yawAngle}}updateMovement(e,t){this.motionState.position.x=this.position.x,this.motionState.position.y=this.position.y,this.motionState.position.z=this.position.z,this.motionState.velocity.x=this.velocity.x,this.motionState.velocity.y=this.velocity.y,this.motionState.velocity.z=this.velocity.z,this.motionState.yaw=this.yawAngle,this.motionState.isGrounded=this.isGrounded,this.motionState.isCrouched=this.isCrouched,this.motionState.currentHeight=this.currentHeight,this.motionState=Ub(this.motionState,t,e,{groundHeight:this.groundHeight,speedMultiplier:this.getSpeedMultiplier(),moveHorizontal:this.collisionWorld?(n,s,r,o)=>{Of.set(n.x,n.y,n.z);const a=this.collisionWorld.move(Of,s,r,Nb.set(o.x,0,o.z));return{x:a.x,y:a.y,z:a.z}}:null,getGroundHeightAt:this.collisionWorld?(n,s,r,o)=>this.collisionWorld.getGroundHeightAt(n,s,r,o):null}),this.position.set(this.motionState.position.x,this.motionState.position.y,this.motionState.position.z),this.velocity.set(this.motionState.velocity.x,this.motionState.velocity.y,this.motionState.velocity.z),this.isGrounded=this.motionState.isGrounded,this.isCrouched=this.motionState.isCrouched,this.currentHeight=this.motionState.currentHeight,this.pitch.position.y=this.currentHeight}reconcileAuthoritativeState(e,t=1.5,n=3.5){const s=e.position.x-this.position.x,r=e.position.y-this.position.y,o=e.position.z-this.position.z,a=Math.sqrt(s*s+r*r+o*o);if(a<t)return;const c=a>=n,l=c?1:.35,h=Zt.lerp(this.position.x,e.position.x,l),u=Zt.lerp(this.position.y,e.position.y,l),f=Zt.lerp(this.position.z,e.position.z,l);this.position.set(h,u,f),c?(this.velocity.set(0,0,0),this.motionState.velocity.x=0,this.motionState.velocity.y=0,this.motionState.velocity.z=0):(this.velocity.x*=.6,this.velocity.y*=.6,this.velocity.z*=.6,this.motionState.velocity.x=this.velocity.x,this.motionState.velocity.y=this.velocity.y,this.motionState.velocity.z=this.velocity.z),this.motionState.yaw=e.yaw??this.motionState.yaw,this.motionState.isGrounded=e.isGrounded??this.motionState.isGrounded,this.motionState.isCrouched=e.isCrouched??this.motionState.isCrouched,this.motionState.currentHeight=e.currentHeight??this.motionState.currentHeight,this.motionState.position.x=h,this.motionState.position.y=u,this.motionState.position.z=f,this.isGrounded=this.motionState.isGrounded,this.isCrouched=this.motionState.isCrouched,this.currentHeight=this.motionState.currentHeight,this.pitch.position.y=this.currentHeight}}class Fb{constructor(){this.roundNumber=1,this.phase="freeze",this.phaseTime=0,this.freezeDuration=5,this.liveDuration=115}update(e){if(this.phaseTime+=e,this.phase==="freeze"&&this.phaseTime>=this.freezeDuration){this.phase="live",this.phaseTime=0;return}this.phase==="live"&&this.phaseTime>=this.liveDuration&&(this.roundNumber+=1,this.phase="freeze",this.phaseTime=0)}}const yu=75,Mp={rifle:{key:"rifle",slot:"Digit1",label:"Rifle",fireSound:"rifle-fire",damage:5,fireInterval:.095,automatic:!0,canScope:!0,zoomFov:52,hipfireSpread:0,swayScale:1,hasScopeOverlay:!1,hasAdsReticle:!0,hideViewModelWhenScoped:!1,aimRecoilFactor:.15,viewModel:{position:{x:.32,y:-.32,z:-.5},rotation:{x:-.16,y:-.24,z:-.08},recoilY:.03,recoilZ:.1},aimViewModel:{position:{x:0,y:-.145,z:-.16},rotation:{x:0,y:0,z:0}},movementSpeedMultiplier:1},sniper:{key:"sniper",slot:"Digit2",label:"Sniper",fireSound:"sniper-fire",zoomSound:"sniper-zoom",damage:35,fireInterval:1.25,automatic:!1,canScope:!0,zoomFov:18,hipfireSpread:.05,swayScale:.7,hasScopeOverlay:!0,hasAdsReticle:!1,hideViewModelWhenScoped:!0,aimRecoilFactor:1,viewModel:{position:{x:.24,y:-.26,z:-.68},rotation:{x:-.08,y:-.17,z:-.04},recoilY:.018,recoilZ:.14},aimViewModel:{position:{x:.24,y:-.26,z:-.44},rotation:{x:-.08,y:-.17,z:-.04}},movementSpeedMultiplier:.96},knife:{key:"knife",slot:"Digit3",label:"Knife",fireSound:"knife-slash",damage:25,meleeRange:2.2,fireInterval:.42,automatic:!1,canScope:!1,zoomFov:yu,hipfireSpread:0,swayScale:1.2,hasScopeOverlay:!1,hasAdsReticle:!1,hideViewModelWhenScoped:!1,aimRecoilFactor:0,viewModel:{position:{x:.22,y:-.24,z:-.34},rotation:{x:.42,y:-.62,z:-.18},recoilY:0,recoilZ:0},aimViewModel:{position:{x:.22,y:-.24,z:-.34},rotation:{x:.42,y:-.62,z:-.18}},movementSpeedMultiplier:1.2}},Bb=Object.values(Mp).reduce((i,e)=>(i.set(e.slot,e),i),new Map);function zb(i){return Bb.get(i)??null}const Ka=1;function Za(i,e){i.layers.set(e),i.children.forEach(t=>Za(t,e))}function Jt(i,e,t,n=null){const s=new It(i,e);return s.position.copy(t),n&&s.rotation.set(n.x,n.y,n.z),s}function Ep(){return{dark:new Nt({color:2369581,roughness:.68,metalness:.24}),accent:new Nt({color:8018743,roughness:.94,metalness:.03}),detail:new Nt({color:1514015,roughness:.62,metalness:.3})}}function Tp(i){const e=new It(new Xa(.07,.22,8),new xs({color:16765324,transparent:!0,opacity:0}));return e.rotation.x=Math.PI/2,e.position.copy(i.position).add(new P(0,0,-.06)),e}function kb(){const i=new It(new ds(.001,4,4),new xs({color:16777215,transparent:!0,opacity:0}));return i.visible=!1,i}function Vb(){const i=new kn,e=Ep(),t=Jt(new wt(.2,.18,.75),e.dark,new P(0,0,-.2)),n=Jt(new wt(.16,.14,.52),e.accent,new P(0,-.01,-.72)),s=Jt(new Vn(.024,.024,.58,12),e.detail,new P(0,.01,-1.12),new P(Math.PI/2,0,0)),r=Jt(new Vn(.034,.034,.24,12),e.detail,new P(0,.01,-1.48),new P(Math.PI/2,0,0)),o=Jt(new wt(.12,.12,.34),e.dark,new P(.01,.01,.28),new P(-.1,0,-.12)),a=Jt(new wt(.08,.24,.16),e.detail,new P(.01,-.18,-.18),new P(-.24,0,.04)),c=Jt(new wt(.05,.03,.08),e.detail,new P(0,.105,-.2)),l=new kn;l.position.set(0,.145,-.26);const h=Jt(new Vu(.04,.006,8,20),e.detail,new P(0,0,0));l.add(h);const u=Jt(new wt(.026,.022,.026),e.detail,new P(0,.078,-.9)),f=new Gt;f.position.set(0,.005,-1.62);const p=Tp(f);return i.add(t,n,s,r,o,a,c,l,u),i.add(f,p),Za(i,Ka),{group:i,muzzle:f,muzzleFlash:p}}function Hb(){const i=new kn,e=Ep(),t=new Nt({color:1119513,roughness:.58,metalness:.32}),n=Jt(new wt(.18,.16,1.05),e.dark,new P(0,-.01,-.12)),s=Jt(new wt(.11,.12,.46),e.accent,new P(.01,-.01,.62),new P(-.08,0,-.06)),r=Jt(new wt(.14,.1,.42),e.accent,new P(0,-.02,-.78)),o=Jt(new Vn(.022,.022,1.05,12),e.detail,new P(0,0,-1.38),new P(Math.PI/2,0,0)),a=Jt(new Vn(.08,.08,.54,16),t,new P(0,.15,-.26),new P(Math.PI/2,0,0)),c=Jt(new Vn(.095,.095,.08,16),t,new P(0,.15,-.56),new P(Math.PI/2,0,0)),l=Jt(new Vn(.085,.085,.08,16),t,new P(0,.15,.04),new P(Math.PI/2,0,0)),h=new Gt;h.position.set(0,0,-1.93);const u=Tp(h);return i.add(n,s,r,o,a,c,l),i.add(h,u),Za(i,Ka),{group:i,muzzle:h,muzzleFlash:u}}function Gb(){const i=new kn,e=new Nt({color:12107976,roughness:.38,metalness:.62}),t=new Nt({color:1514015,roughness:.78,metalness:.14}),n=new Nt({color:3488578,roughness:.54,metalness:.4}),s=Jt(new Vn(.03,.038,.26,10),t,new P(.02,-.1,.08),new P(Math.PI/2,0,0)),r=Jt(new ds(.038,10,10),n,new P(.02,-.1,.21)),o=Jt(new wt(.04,.1,.024),n,new P(.02,-.1,-.06)),a=Jt(new Xa(.042,.62,4),e,new P(.02,-.08,-.42),new P(-Math.PI/2,Math.PI/4,0)),c=Jt(new wt(.034,.018,.08),n,new P(.02,-.084,-.02),new P(.18,0,0)),l=new Gt;l.position.set(.02,-.08,-.72);const h=kb();return i.add(s,r,o,a,c),i.add(l,h),Za(i,Ka),{group:i,muzzle:l,muzzleFlash:h}}function Wb(){return{rifle:Vb(),sniper:Hb(),knife:Gb()}}const Ap=new P(0,1,0);function Xb(i,e=Ap){const t=new It(new ds(.08,8,8),new xs({color:16757611}));return t.position.copy(i).addScaledVector(e,.05),t.userData.life=.25,t}function Rp(i,e){const t=new pn().setFromPoints([i.clone(),e.clone()]),n=new Bu({color:16770992,transparent:!0,opacity:.9}),s=new ep(t,n);return s.userData.life=.05,s}function qb(i,e,t,n){const s=Xb(n.point,n.face?.normal??Ap),r=Rp(t,n.point);i.add(s,r),e.push(s,r)}function $b(i,e,t,n){const s=Rp(t,n);i.add(s),e.push(s)}function Yb(i,e,t){for(let n=e.length-1;n>=0;n-=1){const s=e[n];s.userData.life-=t,s.material?.opacity!==void 0&&(s.material.opacity=Math.max(s.userData.life*10,0)),s.userData.life<=0&&(s.geometry?.dispose?.(),s.material?.dispose?.(),i.remove(s),e.splice(n,1))}}const Cp=new it,Ff=new P,Bf=new P;function zf(i,e,t){t.fireSound&&i?.play(t.fireSound,{baseVolume:e==="sniper"?.72:e==="knife"?.5:.6,pitchMin:e==="sniper"?.992:e==="knife"?.94:.95,pitchMax:e==="sniper"?1.008:e==="knife"?1.08:1.06})}function jb(i,e,t=Cp){return t.set(0,0),i.hipfireSpread>0&&!e&&(t.x=(Math.random()*2-1)*i.hipfireSpread,t.y=(Math.random()*2-1)*i.hipfireSpread),t}function Kb({camera:i,scene:e,shootables:t,raycaster:n,temporaryObjects:s,muzzleWorld:r,weapon:o,isScoped:a}){const c=jb(o,a);n.layers.set(0),n.setFromCamera(c,i);const l=n.intersectObjects(t,!1)[0];return l?(qb(e,s,r,l),l.object.userData.damageReceiver?.applyDamage(o.damage,l.point,l),l):(Ff.copy(n.ray.origin).addScaledVector(n.ray.direction,120),$b(e,s,r,Ff),null)}function Zb({camera:i,shootables:e,raycaster:t,weapon:n}){t.layers.set(0),t.setFromCamera(Cp.set(0,0),i);const s=t.intersectObjects(e,!1)[0];return!s||s.distance>n.meleeRange?null:(Bf.copy(s.point),s.object.userData.damageReceiver?.applyDamage(n.damage,Bf,s),s)}const jr=new P;function Jb({viewModel:i,muzzleFlash:e,currentWeapon:t,isScoped:n,recoil:s,flashTime:r,knifeAttackTime:o,knifeAttackDuration:a,delta:c,lookDelta:l}){if(!i||!t)return;const h=Zt.clamp(-l.x*55e-5*t.swayScale,-.03,.03),u=Zt.clamp(l.y*45e-5*t.swayScale,-.025,.025);jr.set(h,u,0);const{position:f,rotation:p,recoilY:_,recoilZ:y}=t.viewModel,x=t.aimViewModel??t.viewModel,m=n?1:0,S=1-m,b=Zt.lerp(1,t.aimRecoilFactor??1,m),w=o>0?Math.sin((1-o/a)*Math.PI):0,T=Zt.lerp(f.x,x.position.x,m),R=Zt.lerp(f.y,x.position.y,m),L=Zt.lerp(f.z,x.position.z,m),U=Zt.lerp(p.x,x.rotation.x,m),E=Zt.lerp(p.y,x.rotation.y,m),M=Zt.lerp(p.z,x.rotation.z,m);i.position.x=Zt.damp(i.position.x,T+jr.x*S-w*.04,18,c),i.position.y=Zt.damp(i.position.y,R+jr.y*S+s*_*b-w*.05,18,c),i.position.z=Zt.damp(i.position.z,L+s*y*b-w*.42,22,c),i.rotation.x=Zt.damp(i.rotation.x,U-s*.08*b-w*.32,16,c),i.rotation.y=Zt.damp(i.rotation.y,E-jr.x*.6*S+w*.16,16,c),i.rotation.z=Zt.damp(i.rotation.z,M-jr.x*.8*S-w*.08,16,c),i.visible=!(n&&t.hideViewModelWhenScoped),e.material.opacity=r>0?r/.04:0,e.scale.setScalar(1+s*.35)}const kf=new P;class Qb{constructor({camera:e,scene:t,shootables:n=[],audioManager:s=null}){this.camera=e,this.scene=t,this.shootables=n,this.audioManager=s,this.cooldown=0,this.recoil=0,this.flashTime=0,this.shotCount=0,this.baseFov=yu,this.zoomFov=yu,this.isScoped=!1,this.showScopeOverlay=!1,this.showAdsReticle=!1,this.activeWeaponKey=null,this.activeWeapon="",this.currentWeapon=null,this.triggerHeld=!1,this.wasScoped=!1,this.knifeAttackTime=0,this.knifeAttackDuration=.18,this.raycaster=new wg,this.temporaryObjects=[],this.viewModels=Wb(),Object.values(this.viewModels).forEach(r=>{r.group.visible=!1,this.camera.add(r.group)}),this.camera.layers.enable(Ka),this.camera.fov=this.baseFov,this.camera.updateProjectionMatrix(),this.equipWeapon("rifle")}getMovementSpeedMultiplier(){return this.currentWeapon?.movementSpeedMultiplier??1}equipWeapon(e){const t=Mp[e];if(!t||this.activeWeaponKey===e)return;this.viewModel&&(this.viewModel.visible=!1),this.activeWeaponKey=e,this.currentWeapon=t,this.activeWeapon=t.label,this.isScoped=!1,this.showScopeOverlay=!1,this.showAdsReticle=!1,this.cooldown=0,this.recoil=0,this.triggerHeld=!1,this.wasScoped=!1;const n=this.viewModels[e];n.group.visible=!0,this.viewModel=n.group,this.muzzle=n.muzzle,this.muzzleFlash=n.muzzleFlash}update(e,t){this.handleWeaponSwap(t.justPressed),this.handleScope(t.mouseButtons),this.cooldown=Math.max(0,this.cooldown-e),this.flashTime=Math.max(0,this.flashTime-e),this.recoil=Zt.damp(this.recoil,0,16,e),this.knifeAttackTime=Math.max(0,this.knifeAttackTime-e),this.zoomFov=Zt.damp(this.zoomFov,this.isScoped?this.currentWeapon.zoomFov:this.baseFov,14,e),this.camera.fov=this.zoomFov,this.camera.updateProjectionMatrix();const n=t.mouseButtons.has(0);this.currentWeapon.canFire!==!1&&(this.currentWeapon.automatic?n:n&&!this.triggerHeld)&&this.cooldown===0&&this.fire(),this.triggerHeld=n,this.updateViewModel(e,t.lookDelta),this.updateTemporaryObjects(e)}handleWeaponSwap(e){for(const t of e){const n=zb(t);if(n){this.equipWeapon(n.key);return}}}handleScope(e){this.isScoped=this.currentWeapon.canScope!==!1&&e.has(2),this.showScopeOverlay=this.isScoped&&this.currentWeapon.hasScopeOverlay,this.showAdsReticle=this.isScoped&&this.currentWeapon.hasAdsReticle,this.activeWeaponKey==="sniper"&&this.isScoped!==this.wasScoped&&this.currentWeapon.zoomSound&&this.audioManager?.play(this.currentWeapon.zoomSound,{baseVolume:.45,pitchMin:.995,pitchMax:1.005}),this.wasScoped=this.isScoped}fire(){if(this.currentWeapon.canFire!==!1){if(this.activeWeaponKey==="knife"){this.performKnifeAttack();return}this.cooldown=this.currentWeapon.fireInterval,this.flashTime=.04,this.recoil=Math.min(this.recoil+(this.activeWeaponKey==="sniper"?1.25:1),1.5),this.shotCount+=1,zf(this.audioManager,this.activeWeaponKey,this.currentWeapon),this.muzzle.getWorldPosition(kf),Kb({camera:this.camera,scene:this.scene,shootables:this.shootables,raycaster:this.raycaster,temporaryObjects:this.temporaryObjects,muzzleWorld:kf,weapon:this.currentWeapon,isScoped:this.isScoped})}}performKnifeAttack(){this.cooldown=this.currentWeapon.fireInterval,this.knifeAttackTime=this.knifeAttackDuration,zf(this.audioManager,this.activeWeaponKey,this.currentWeapon),Zb({camera:this.camera,shootables:this.shootables,raycaster:this.raycaster,weapon:this.currentWeapon})}updateViewModel(e,t){Jb({viewModel:this.viewModel,muzzleFlash:this.muzzleFlash,currentWeapon:this.currentWeapon,isScoped:this.isScoped,recoil:this.recoil,flashTime:this.flashTime,knifeAttackTime:this.knifeAttackTime,knifeAttackDuration:this.knifeAttackDuration,delta:e,lookDelta:t})}updateTemporaryObjects(e){Yb(this.scene,this.temporaryObjects,e)}destroy(){this.updateTemporaryObjects(1/0),Object.values(this.viewModels).forEach(e=>{this.camera.remove(e.group)})}}class ew{constructor(){this.activeUtility="Flashbang"}update(){}}function ju(i){if(Object.prototype.hasOwnProperty.call(i,"__esModule"))return i;var e=i.default;if(typeof e=="function"){var t=function n(){var s=!1;try{s=this instanceof n}catch{}return s?Reflect.construct(e,arguments,this.constructor):e.apply(this,arguments)};t.prototype=e.prototype}else t={};return Object.defineProperty(t,"__esModule",{value:!0}),Object.keys(i).forEach(function(n){var s=Object.getOwnPropertyDescriptor(i,n);Object.defineProperty(t,n,s.get?s:{enumerable:!0,get:function(){return i[n]}})}),t}var tl={},Vf={},Hf;function tw(){return Hf||(Hf=1,ArrayBuffer.isView||(ArrayBuffer.isView=i=>i!==null&&typeof i=="object"&&i.buffer instanceof ArrayBuffer),typeof globalThis>"u"&&typeof window<"u"&&(window.globalThis=window),typeof FormData>"u"&&(globalThis.FormData=class{})),Vf}var ma={},vu=function(i,e){return vu=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&(t[s]=n[s])},vu(i,e)};function Pp(i,e){if(typeof e!="function"&&e!==null)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");vu(i,e);function t(){this.constructor=i}i.prototype=e===null?Object.create(e):(t.prototype=e.prototype,new t)}var za=function(){return za=Object.assign||function(e){for(var t,n=1,s=arguments.length;n<s;n++){t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},za.apply(this,arguments)};function Ip(i,e){var t={};for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&e.indexOf(n)<0&&(t[n]=i[n]);if(i!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,n=Object.getOwnPropertySymbols(i);s<n.length;s++)e.indexOf(n[s])<0&&Object.prototype.propertyIsEnumerable.call(i,n[s])&&(t[n[s]]=i[n[s]]);return t}function Dp(i,e,t,n){var s=arguments.length,r=s<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(i,e,t,n);else for(var a=i.length-1;a>=0;a--)(o=i[a])&&(r=(s<3?o(r):s>3?o(e,t,r):o(e,t))||r);return s>3&&r&&Object.defineProperty(e,t,r),r}function Lp(i,e){return function(t,n){e(t,n,i)}}function Up(i,e,t,n,s,r){function o(m){if(m!==void 0&&typeof m!="function")throw new TypeError("Function expected");return m}for(var a=n.kind,c=a==="getter"?"get":a==="setter"?"set":"value",l=!e&&i?n.static?i:i.prototype:null,h=e||(l?Object.getOwnPropertyDescriptor(l,n.name):{}),u,f=!1,p=t.length-1;p>=0;p--){var _={};for(var y in n)_[y]=y==="access"?{}:n[y];for(var y in n.access)_.access[y]=n.access[y];_.addInitializer=function(m){if(f)throw new TypeError("Cannot add initializers after decoration has completed");r.push(o(m||null))};var x=(0,t[p])(a==="accessor"?{get:h.get,set:h.set}:h[c],_);if(a==="accessor"){if(x===void 0)continue;if(x===null||typeof x!="object")throw new TypeError("Object expected");(u=o(x.get))&&(h.get=u),(u=o(x.set))&&(h.set=u),(u=o(x.init))&&s.unshift(u)}else(u=o(x))&&(a==="field"?s.unshift(u):h[c]=u)}l&&Object.defineProperty(l,n.name,h),f=!0}function Np(i,e,t){for(var n=arguments.length>2,s=0;s<e.length;s++)t=n?e[s].call(i,t):e[s].call(i);return n?t:void 0}function Op(i){return typeof i=="symbol"?i:"".concat(i)}function Fp(i,e,t){return typeof e=="symbol"&&(e=e.description?"[".concat(e.description,"]"):""),Object.defineProperty(i,"name",{configurable:!0,value:t?"".concat(t," ",e):e})}function Bp(i,e){if(typeof Reflect=="object"&&typeof Reflect.metadata=="function")return Reflect.metadata(i,e)}function zp(i,e,t,n){function s(r){return r instanceof t?r:new t(function(o){o(r)})}return new(t||(t=Promise))(function(r,o){function a(h){try{l(n.next(h))}catch(u){o(u)}}function c(h){try{l(n.throw(h))}catch(u){o(u)}}function l(h){h.done?r(h.value):s(h.value).then(a,c)}l((n=n.apply(i,e||[])).next())})}function kp(i,e){var t={label:0,sent:function(){if(r[0]&1)throw r[1];return r[1]},trys:[],ops:[]},n,s,r,o=Object.create((typeof Iterator=="function"?Iterator:Object).prototype);return o.next=a(0),o.throw=a(1),o.return=a(2),typeof Symbol=="function"&&(o[Symbol.iterator]=function(){return this}),o;function a(l){return function(h){return c([l,h])}}function c(l){if(n)throw new TypeError("Generator is already executing.");for(;o&&(o=0,l[0]&&(t=0)),t;)try{if(n=1,s&&(r=l[0]&2?s.return:l[0]?s.throw||((r=s.return)&&r.call(s),0):s.next)&&!(r=r.call(s,l[1])).done)return r;switch(s=0,r&&(l=[l[0]&2,r.value]),l[0]){case 0:case 1:r=l;break;case 4:return t.label++,{value:l[1],done:!1};case 5:t.label++,s=l[1],l=[0];continue;case 7:l=t.ops.pop(),t.trys.pop();continue;default:if(r=t.trys,!(r=r.length>0&&r[r.length-1])&&(l[0]===6||l[0]===2)){t=0;continue}if(l[0]===3&&(!r||l[1]>r[0]&&l[1]<r[3])){t.label=l[1];break}if(l[0]===6&&t.label<r[1]){t.label=r[1],r=l;break}if(r&&t.label<r[2]){t.label=r[2],t.ops.push(l);break}r[2]&&t.ops.pop(),t.trys.pop();continue}l=e.call(i,t)}catch(h){l=[6,h],s=0}finally{n=r=0}if(l[0]&5)throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}}var Ja=Object.create?(function(i,e,t,n){n===void 0&&(n=t);var s=Object.getOwnPropertyDescriptor(e,t);(!s||("get"in s?!e.__esModule:s.writable||s.configurable))&&(s={enumerable:!0,get:function(){return e[t]}}),Object.defineProperty(i,n,s)}):(function(i,e,t,n){n===void 0&&(n=t),i[n]=e[t]});function Vp(i,e){for(var t in i)t!=="default"&&!Object.prototype.hasOwnProperty.call(e,t)&&Ja(e,i,t)}function ka(i){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&i[e],n=0;if(t)return t.call(i);if(i&&typeof i.length=="number")return{next:function(){return i&&n>=i.length&&(i=void 0),{value:i&&i[n++],done:!i}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function Ku(i,e){var t=typeof Symbol=="function"&&i[Symbol.iterator];if(!t)return i;var n=t.call(i),s,r=[],o;try{for(;(e===void 0||e-- >0)&&!(s=n.next()).done;)r.push(s.value)}catch(a){o={error:a}}finally{try{s&&!s.done&&(t=n.return)&&t.call(n)}finally{if(o)throw o.error}}return r}function Hp(){for(var i=[],e=0;e<arguments.length;e++)i=i.concat(Ku(arguments[e]));return i}function Gp(){for(var i=0,e=0,t=arguments.length;e<t;e++)i+=arguments[e].length;for(var n=Array(i),s=0,e=0;e<t;e++)for(var r=arguments[e],o=0,a=r.length;o<a;o++,s++)n[s]=r[o];return n}function Wp(i,e,t){if(t||arguments.length===2)for(var n=0,s=e.length,r;n<s;n++)(r||!(n in e))&&(r||(r=Array.prototype.slice.call(e,0,n)),r[n]=e[n]);return i.concat(r||Array.prototype.slice.call(e))}function Er(i){return this instanceof Er?(this.v=i,this):new Er(i)}function Xp(i,e,t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var n=t.apply(i,e||[]),s,r=[];return s=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),a("next"),a("throw"),a("return",o),s[Symbol.asyncIterator]=function(){return this},s;function o(p){return function(_){return Promise.resolve(_).then(p,u)}}function a(p,_){n[p]&&(s[p]=function(y){return new Promise(function(x,m){r.push([p,y,x,m])>1||c(p,y)})},_&&(s[p]=_(s[p])))}function c(p,_){try{l(n[p](_))}catch(y){f(r[0][3],y)}}function l(p){p.value instanceof Er?Promise.resolve(p.value.v).then(h,u):f(r[0][2],p)}function h(p){c("next",p)}function u(p){c("throw",p)}function f(p,_){p(_),r.shift(),r.length&&c(r[0][0],r[0][1])}}function qp(i){var e,t;return e={},n("next"),n("throw",function(s){throw s}),n("return"),e[Symbol.iterator]=function(){return this},e;function n(s,r){e[s]=i[s]?function(o){return(t=!t)?{value:Er(i[s](o)),done:!1}:r?r(o):o}:r}}function $p(i){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var e=i[Symbol.asyncIterator],t;return e?e.call(i):(i=typeof ka=="function"?ka(i):i[Symbol.iterator](),t={},n("next"),n("throw"),n("return"),t[Symbol.asyncIterator]=function(){return this},t);function n(r){t[r]=i[r]&&function(o){return new Promise(function(a,c){o=i[r](o),s(a,c,o.done,o.value)})}}function s(r,o,a,c){Promise.resolve(c).then(function(l){r({value:l,done:a})},o)}}function Yp(i,e){return Object.defineProperty?Object.defineProperty(i,"raw",{value:e}):i.raw=e,i}var nw=Object.create?(function(i,e){Object.defineProperty(i,"default",{enumerable:!0,value:e})}):function(i,e){i.default=e},Su=function(i){return Su=Object.getOwnPropertyNames||function(e){var t=[];for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[t.length]=n);return t},Su(i)};function jp(i){if(i&&i.__esModule)return i;var e={};if(i!=null)for(var t=Su(i),n=0;n<t.length;n++)t[n]!=="default"&&Ja(e,i,t[n]);return nw(e,i),e}function Kp(i){return i&&i.__esModule?i:{default:i}}function Zp(i,e,t,n){if(t==="a"&&!n)throw new TypeError("Private accessor was defined without a getter");if(typeof e=="function"?i!==e||!n:!e.has(i))throw new TypeError("Cannot read private member from an object whose class did not declare it");return t==="m"?n:t==="a"?n.call(i):n?n.value:e.get(i)}function Jp(i,e,t,n,s){if(n==="m")throw new TypeError("Private method is not writable");if(n==="a"&&!s)throw new TypeError("Private accessor was defined without a setter");if(typeof e=="function"?i!==e||!s:!e.has(i))throw new TypeError("Cannot write private member to an object whose class did not declare it");return n==="a"?s.call(i,t):s?s.value=t:e.set(i,t),t}function Qp(i,e){if(e===null||typeof e!="object"&&typeof e!="function")throw new TypeError("Cannot use 'in' operator on non-object");return typeof i=="function"?e===i:i.has(e)}function e0(i,e,t){if(e!=null){if(typeof e!="object"&&typeof e!="function")throw new TypeError("Object expected.");var n,s;if(t){if(!Symbol.asyncDispose)throw new TypeError("Symbol.asyncDispose is not defined.");n=e[Symbol.asyncDispose]}if(n===void 0){if(!Symbol.dispose)throw new TypeError("Symbol.dispose is not defined.");n=e[Symbol.dispose],t&&(s=n)}if(typeof n!="function")throw new TypeError("Object not disposable.");s&&(n=function(){try{s.call(this)}catch(r){return Promise.reject(r)}}),i.stack.push({value:e,dispose:n,async:t})}else t&&i.stack.push({async:!0});return e}var iw=typeof SuppressedError=="function"?SuppressedError:function(i,e,t){var n=new Error(t);return n.name="SuppressedError",n.error=i,n.suppressed=e,n};function t0(i){function e(r){i.error=i.hasError?new iw(r,i.error,"An error was suppressed during disposal."):r,i.hasError=!0}var t,n=0;function s(){for(;t=i.stack.pop();)try{if(!t.async&&n===1)return n=0,i.stack.push(t),Promise.resolve().then(s);if(t.dispose){var r=t.dispose.call(t.value);if(t.async)return n|=2,Promise.resolve(r).then(s,function(o){return e(o),s()})}else n|=1}catch(o){e(o)}if(n===1)return i.hasError?Promise.reject(i.error):Promise.resolve();if(i.hasError)throw i.error}return s()}function n0(i,e){return typeof i=="string"&&/^\.\.?\//.test(i)?i.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i,function(t,n,s,r,o){return n?e?".jsx":".js":s&&(!r||!o)?t:s+r+"."+o.toLowerCase()+"js"}):i}const sw={__extends:Pp,__assign:za,__rest:Ip,__decorate:Dp,__param:Lp,__esDecorate:Up,__runInitializers:Np,__propKey:Op,__setFunctionName:Fp,__metadata:Bp,__awaiter:zp,__generator:kp,__createBinding:Ja,__exportStar:Vp,__values:ka,__read:Ku,__spread:Hp,__spreadArrays:Gp,__spreadArray:Wp,__await:Er,__asyncGenerator:Xp,__asyncDelegator:qp,__asyncValues:$p,__makeTemplateObject:Yp,__importStar:jp,__importDefault:Kp,__classPrivateFieldGet:Zp,__classPrivateFieldSet:Jp,__classPrivateFieldIn:Qp,__addDisposableResource:e0,__disposeResources:t0,__rewriteRelativeImportExtension:n0},rw=Object.freeze(Object.defineProperty({__proto__:null,__addDisposableResource:e0,get __assign(){return za},__asyncDelegator:qp,__asyncGenerator:Xp,__asyncValues:$p,__await:Er,__awaiter:zp,__classPrivateFieldGet:Zp,__classPrivateFieldIn:Qp,__classPrivateFieldSet:Jp,__createBinding:Ja,__decorate:Dp,__disposeResources:t0,__esDecorate:Up,__exportStar:Vp,__extends:Pp,__generator:kp,__importDefault:Kp,__importStar:jp,__makeTemplateObject:Yp,__metadata:Bp,__param:Lp,__propKey:Op,__read:Ku,__rest:Ip,__rewriteRelativeImportExtension:n0,__runInitializers:Np,__setFunctionName:Fp,__spread:Hp,__spreadArray:Wp,__spreadArrays:Gp,__values:ka,default:sw},Symbol.toStringTag,{value:"Module"})),Qa=ju(rw);var nl={},Gf;function ec(){return Gf||(Gf=1,(function(i){i.CloseCode=void 0,(function(n){n[n.CONSENTED=4e3]="CONSENTED",n[n.DEVMODE_RESTART=4010]="DEVMODE_RESTART"})(i.CloseCode||(i.CloseCode={}));class e extends Error{constructor(s,r){super(r),this.name="ServerError",this.code=s}}class t extends Error{constructor(s){super(s),this.name="AbortError"}}i.AbortError=t,i.ServerError=e})(nl)),nl}var il={},sl={},rl={},Qr={exports:{}},ow=Qr.exports,Wf;function Zu(){return Wf||(Wf=1,(function(i,e){(function(t,n){n(e)})(ow,(function(t){t.OPERATION=void 0,(function(I){I[I.ADD=128]="ADD",I[I.REPLACE=0]="REPLACE",I[I.DELETE=64]="DELETE",I[I.DELETE_AND_MOVE=96]="DELETE_AND_MOVE",I[I.MOVE_AND_ADD=160]="MOVE_AND_ADD",I[I.DELETE_AND_ADD=192]="DELETE_AND_ADD",I[I.CLEAR=10]="CLEAR",I[I.REVERSE=15]="REVERSE",I[I.MOVE=32]="MOVE",I[I.DELETE_BY_REFID=33]="DELETE_BY_REFID",I[I.ADD_BY_REFID=129]="ADD_BY_REFID"})(t.OPERATION||(t.OPERATION={})),Symbol.metadata??=Symbol.for("Symbol.metadata");const r="~track",o="~encoder",a="~decoder",c="~filter",l="~getByIndex",h="~deleteByIndex",u="~changes",f="~childType",p="~onEncodeEnd",_="~onDecodeEnd",y="~descriptors",x="~__numFields",m="~__refTypeFieldIndexes",S="~__viewFieldIndexes",b="$__fieldIndexesByViewTag";let w;try{w=new TextEncoder}catch{}const T=new ArrayBuffer(8),R=new Int32Array(T),L=new Float32Array(T),U=new Float64Array(T),E=new BigInt64Array(T),N=typeof Buffer<"u"&&Buffer.byteLength?Buffer.byteLength:function(I,d){for(var g=0,v=0,A=0,H=I.length;A<H;A++)g=I.charCodeAt(A),g<128?v+=1:g<2048?v+=2:g<55296||g>=57344?v+=3:(A++,v+=4);return v};function B(I,d,g){for(var v=0,A=0,H=d.length;A<H;A++)v=d.charCodeAt(A),v<128?I[g.offset++]=v:v<2048?(I[g.offset]=192|v>>6,I[g.offset+1]=128|v&63,g.offset+=2):v<55296||v>=57344?(I[g.offset]=224|v>>12,I[g.offset+1]=128|v>>6&63,I[g.offset+2]=128|v&63,g.offset+=3):(A++,v=65536+((v&1023)<<10|d.charCodeAt(A)&1023),I[g.offset]=240|v>>18,I[g.offset+1]=128|v>>12&63,I[g.offset+2]=128|v>>6&63,I[g.offset+3]=128|v&63,g.offset+=4)}function C(I,d,g){I[g.offset++]=d&255}function F(I,d,g){I[g.offset++]=d&255}function k(I,d,g){I[g.offset++]=d&255,I[g.offset++]=d>>8&255}function V(I,d,g){I[g.offset++]=d&255,I[g.offset++]=d>>8&255}function q(I,d,g){I[g.offset++]=d&255,I[g.offset++]=d>>8&255,I[g.offset++]=d>>16&255,I[g.offset++]=d>>24&255}function $(I,d,g){const v=d>>24,A=d>>16,H=d>>8,j=d;I[g.offset++]=j&255,I[g.offset++]=H&255,I[g.offset++]=A&255,I[g.offset++]=v&255}function ae(I,d,g){const v=Math.floor(d/Math.pow(2,32)),A=d>>>0;$(I,A,g),$(I,v,g)}function Q(I,d,g){const v=d/Math.pow(2,32)>>0,A=d>>>0;$(I,A,g),$(I,v,g)}function xe(I,d,g){E[0]=BigInt.asIntN(64,d),q(I,R[0],g),q(I,R[1],g)}function be(I,d,g){E[0]=BigInt.asIntN(64,d),q(I,R[0],g),q(I,R[1],g)}function He(I,d,g){L[0]=d,q(I,R[0],g)}function Je(I,d,g){U[0]=d,q(I,R[0],g),q(I,R[1],g)}function ct(I,d,g){I[g.offset++]=d?1:0}function fe(I,d,g){d||(d="");let v=N(d,"utf8"),A=0;if(v<32)I[g.offset++]=v|160,A=1;else if(v<256)I[g.offset++]=217,I[g.offset++]=v%255,A=2;else if(v<65536)I[g.offset++]=218,V(I,v,g),A=3;else if(v<4294967296)I[g.offset++]=219,$(I,v,g),A=5;else throw new Error("String too long");return B(I,d,g),A+v}function pe(I,d,g){if(isNaN(d))return pe(I,0,g);if(isFinite(d)){if(d!==(d|0))return Math.abs(d)<=34028235e31&&(L[0]=d,Math.abs(Math.abs(L[0])-Math.abs(d))<1e-4)?(I[g.offset++]=202,He(I,d,g),5):(I[g.offset++]=203,Je(I,d,g),9)}else return pe(I,d>0?Number.MAX_SAFE_INTEGER:-Number.MAX_SAFE_INTEGER,g);return d>=0?d<128?(I[g.offset++]=d&255,1):d<256?(I[g.offset++]=204,I[g.offset++]=d&255,2):d<65536?(I[g.offset++]=205,V(I,d,g),3):d<4294967296?(I[g.offset++]=206,$(I,d,g),5):(I[g.offset++]=207,Q(I,d,g),9):d>=-32?(I[g.offset++]=224|d+32,1):d>=-128?(I[g.offset++]=208,C(I,d,g),2):d>=-32768?(I[g.offset++]=209,k(I,d,g),3):d>=-2147483648?(I[g.offset++]=210,q(I,d,g),5):(I[g.offset++]=211,ae(I,d,g),9)}const Ae={int8:C,uint8:F,int16:k,uint16:V,int32:q,uint32:$,int64:ae,uint64:Q,bigint64:xe,biguint64:be,float32:He,float64:Je,boolean:ct,string:fe,number:pe,utf8Write:B,utf8Length:N},je=new ArrayBuffer(8),Be=new Int32Array(je),ut=new Float32Array(je),At=new Float64Array(je),st=new BigUint64Array(je),Mt=new BigInt64Array(je);function G(I,d,g){g>I.length-d.offset&&(g=I.length-d.offset);for(var v="",A=0,H=d.offset,j=d.offset+g;H<j;H++){var ue=I[H];if((ue&128)===0){v+=String.fromCharCode(ue);continue}if((ue&224)===192){v+=String.fromCharCode((ue&31)<<6|I[++H]&63);continue}if((ue&240)===224){v+=String.fromCharCode((ue&15)<<12|(I[++H]&63)<<6|(I[++H]&63)<<0);continue}if((ue&248)===240){A=(ue&7)<<18|(I[++H]&63)<<12|(I[++H]&63)<<6|(I[++H]&63)<<0,A>=65536?(A-=65536,v+=String.fromCharCode((A>>>10)+55296,(A&1023)+56320)):v+=String.fromCharCode(A);continue}console.error("decode.utf8Read(): Invalid byte "+ue+" at offset "+H+". Skip to end of string: "+(d.offset+g));break}return d.offset+=g,v}function ft(I,d){return lt(I,d)<<24>>24}function lt(I,d){return I[d.offset++]}function Rt(I,d){return Oe(I,d)<<16>>16}function Oe(I,d){return I[d.offset++]|I[d.offset++]<<8}function _t(I,d){return I[d.offset++]|I[d.offset++]<<8|I[d.offset++]<<16|I[d.offset++]<<24}function Ge(I,d){return _t(I,d)>>>0}function tt(I,d){return Be[0]=_t(I,d),ut[0]}function z(I,d){return Be[0]=_t(I,d),Be[1]=_t(I,d),At[0]}function D(I,d){const g=Ge(I,d);return _t(I,d)*Math.pow(2,32)+g}function ee(I,d){const g=Ge(I,d);return Ge(I,d)*Math.pow(2,32)+g}function de(I,d){return Be[0]=_t(I,d),Be[1]=_t(I,d),Mt[0]}function me(I,d){return Be[0]=_t(I,d),Be[1]=_t(I,d),st[0]}function le(I,d){return lt(I,d)>0}function qe(I,d){const g=I[d.offset++];let v;return g<192?v=g&31:g===217?v=lt(I,d):g===218?v=Oe(I,d):g===219&&(v=Ge(I,d)),G(I,d,v)}function Re(I,d){const g=I[d.offset++];if(g<128)return g;if(g===202)return tt(I,d);if(g===203)return z(I,d);if(g===204)return lt(I,d);if(g===205)return Oe(I,d);if(g===206)return Ge(I,d);if(g===207)return ee(I,d);if(g===208)return ft(I,d);if(g===209)return Rt(I,d);if(g===210)return _t(I,d);if(g===211)return D(I,d);if(g>223)return(255-g+1)*-1}function Ke(I,d){const g=I[d.offset];return g<192&&g>160||g===217||g===218||g===219}const Ue={utf8Read:G,int8:ft,uint8:lt,int16:Rt,uint16:Oe,int32:_t,uint32:Ge,float32:tt,float64:z,int64:D,uint64:ee,bigint64:de,biguint64:me,boolean:le,string:qe,number:Re,stringCheck:Ke},ge={},Ee=new Map;function We(I,d){d.constructor&&(Ee.set(d.constructor,I),ge[I]=d),d.encode&&(Ae[I]=d.encode),d.decode&&(Ue[I]=d.decode)}function Ye(I){return ge[I]}function Ne(I){for(const d in I)We(d,I[d]);return d=>Te(d)}const Bn=class Bn{static register(d){const g=Object.getPrototypeOf(d);if(g!==at){let v=Bn.inheritedTypes.get(g);v||(v=new Set,Bn.inheritedTypes.set(g,v)),v.add(d)}}static cache(d){let g=Bn.cachedContexts.get(d);return g||(g=new Bn(d),Bn.cachedContexts.set(d,g)),g}constructor(d){this.types={},this.schemas=new Map,this.hasFilters=!1,this.parentFiltered={},d&&this.discoverTypes(d)}has(d){return this.schemas.has(d)}get(d){return this.types[d]}add(d,g=this.schemas.size){return this.schemas.has(d)?!1:(this.types[g]=d,d[Symbol.metadata]===void 0&&ye.initialize(d),this.schemas.set(d,g),!0)}getTypeId(d){return this.schemas.get(d)}discoverTypes(d,g,v,A){if(A&&this.registerFilteredByParent(d,g,v),!this.add(d))return;Bn.inheritedTypes.get(d)?.forEach(ue=>{this.discoverTypes(ue,g,v,A)});let H=d;for(;(H=Object.getPrototypeOf(H))&&H!==at&&H!==Function.prototype;)this.discoverTypes(H);const j=d[Symbol.metadata]??={};j[S]&&(this.hasFilters=!0);for(const ue in j){const ne=ue,oe=j[ne].type,ce=j[ne].tag!==void 0;if(typeof oe!="string")if(typeof oe=="function")this.discoverTypes(oe,d,ne,A||ce);else{const re=Object.values(oe)[0];if(typeof re=="string")continue;this.discoverTypes(re,d,ne,A||ce)}}}registerFilteredByParent(d,g,v){let H=`${this.schemas.get(d)??this.schemas.size}`;g&&(H+=`-${this.schemas.get(g)}`),H+=`-${v}`,this.parentFiltered[H]=!0}debug(){let d="";for(const g in this.parentFiltered){const v=g.split("-").map(Number),A=v.pop();d+=`
		`,d+=`${g}: ${v.reverse().map((H,j)=>{const ue=this.types[H],ne=ue[Symbol.metadata];let oe=ue.name;return j===0&&(oe+=`[${ne[A].name}]`),`${oe}`}).join(" -> ")}`}return`TypeContext ->
	Schema types: ${this.schemas.size}
	hasFilters: ${this.hasFilters}
	parentFiltered:${d}`}};Bn.inheritedTypes=new Map,Bn.cachedContexts=new Map;let $e=Bn;function W(I){if(Array.isArray(I))return{array:W(I[0])};if(typeof I.type<"u")return I.type;if(Ce(I))return Object.keys(I).every(d=>typeof I[d]=="string")?"string":"number";if(typeof I=="object"&&I!==null){const d=Object.keys(I).find(g=>ge[g]!==void 0);if(d)return I[d]=W(I[d]),I}return I}function Ce(I){if(typeof I=="function"&&I[Symbol.metadata])return!1;const d=Object.keys(I),g=d.filter(v=>/\d+/.test(v));return!!(g.length>0&&g.length===d.length/2&&I[I[g[0]]]==g[0]||d.length>0&&d.every(v=>typeof I[v]=="string"&&I[v]===v))}const ye={addField(I,d,g,v,A){if(d>64)throw new Error(`Can't define field '${g}'.
Schema instances may only have up to 64 fields.`);I[d]=Object.assign(I[d]||{},{type:W(v),index:d,name:g}),Object.defineProperty(I,y,{value:I[y]||{},enumerable:!1,configurable:!0}),A?(I[y][g]=A,I[y][`_${g}`]={value:void 0,writable:!0,enumerable:!1,configurable:!0}):I[y][g]={value:void 0,writable:!0,enumerable:!0,configurable:!0},Object.defineProperty(I,x,{value:d,enumerable:!1,configurable:!0}),Object.defineProperty(I,g,{value:d,enumerable:!1,configurable:!0}),typeof I[d].type!="string"&&(I[m]===void 0&&Object.defineProperty(I,m,{value:[],enumerable:!1,configurable:!0}),I[m].push(d))},setTag(I,d,g){const v=I[d],A=I[v];A.tag=g,I[S]||(Object.defineProperty(I,S,{value:[],enumerable:!1,configurable:!0}),Object.defineProperty(I,b,{value:{},enumerable:!1,configurable:!0})),I[S].push(v),I[b][g]||(I[b][g]=[]),I[b][g].push(v)},setFields(I,d){const g=I.prototype.constructor;$e.register(g);const v=Object.getPrototypeOf(g),A=v&&v[Symbol.metadata],H=ye.initialize(g);g[r]||(g[r]=at[r]),g[o]||(g[o]=at[o]),g[a]||(g[a]=at[a]),g.prototype.toJSON||(g.prototype.toJSON=at.prototype.toJSON);let j=H[x]??(A&&A[x])??-1;j++;for(const ue in d){const ne=W(d[ue]),oe=typeof Object.keys(ne)[0]=="string"&&Ye(Object.keys(ne)[0]),ce=oe?Object.values(ne)[0]:ne;ye.addField(H,j,ue,ne,Ve(`_${ue}`,j,ce,oe)),j++}return I},isDeprecated(I,d){return I[d].deprecated===!0},init(I){const d={};I[Symbol.metadata]=d,Object.defineProperty(d,x,{value:0,enumerable:!1,configurable:!0})},initialize(I){const d=Object.getPrototypeOf(I),g=d[Symbol.metadata];let v=I[Symbol.metadata]??Object.create(null);return d!==at&&v===g&&(v=Object.create(null),g&&(Object.setPrototypeOf(v,g),Object.defineProperty(v,x,{value:g[x],enumerable:!1,configurable:!0,writable:!0}),g[S]!==void 0&&(Object.defineProperty(v,S,{value:[...g[S]],enumerable:!1,configurable:!0,writable:!0}),Object.defineProperty(v,b,{value:{...g[b]},enumerable:!1,configurable:!0,writable:!0})),g[m]!==void 0&&Object.defineProperty(v,m,{value:[...g[m]],enumerable:!1,configurable:!0,writable:!0}),Object.defineProperty(v,y,{value:{...g[y]},enumerable:!1,configurable:!0,writable:!0}))),Object.defineProperty(I,Symbol.metadata,{value:v,writable:!1,configurable:!0}),v},isValidInstance(I){return I.constructor[Symbol.metadata]&&Object.prototype.hasOwnProperty.call(I.constructor[Symbol.metadata],x)},getFields(I){const d=I[Symbol.metadata],g={};for(let v=0;v<=d[x];v++)g[d[v].name]=d[v].type;return g},hasViewTagAtIndex(I,d){return I?.[S]?.includes(d)}};function Se(I){return{indexes:{},operations:[],queueRootNode:I}}function _e(){return{next:void 0,tail:void 0}}function he(I,d){const g=I.indexes[d];g===void 0?I.indexes[d]=I.operations.push(d)-1:I.operations[g]=d}function ke(I,d){let g=I.indexes[d];g===void 0&&(g=Object.values(I.indexes).at(-1),d=Object.entries(I.indexes).find(([v,A])=>A===g)?.[0]),I.operations[g]=void 0,delete I.indexes[d]}class Qe{constructor(d){this.isFiltered=!1,this.indexedOperations={},this.changes={indexes:{},operations:[]},this.allChanges={indexes:{},operations:[]},this.isNew=!0,this.ref=d,this.metadata=d.constructor[Symbol.metadata],this.metadata?.[S]&&(this.allFilteredChanges={indexes:{},operations:[]},this.filteredChanges={indexes:{},operations:[]})}setRoot(d){this.root=d;const g=this.root.add(this);this.checkIsFiltered(this.parent,this.parentIndex,g),g&&this.forEachChild((v,A)=>{v.root!==d?v.setRoot(d):d.add(v)})}setParent(d,g,v){if(this.addParent(d,v),!g)return;const A=g.add(this);g!==this.root&&(this.root=g,this.checkIsFiltered(d,v,A)),A&&this.forEachChild((H,j)=>{if(H.root===g){g.add(H),g.moveNextToParent(H);return}H.setParent(this.ref,g,j)})}forEachChild(d){if(this.ref[f]){if(typeof this.ref[f]!="string")for(const[g,v]of this.ref.entries())v&&d(v[u],this.indexes?.[g]??g)}else for(const g of this.metadata?.[m]??[]){const v=this.metadata[g],A=this.ref[v.name];A&&d(A[u],g)}}operation(d){this.filteredChanges!==void 0?(this.filteredChanges.operations.push(-d),this.root?.enqueueChangeTree(this,"filteredChanges")):(this.changes.operations.push(-d),this.root?.enqueueChangeTree(this,"changes"))}change(d,g=t.OPERATION.ADD){const v=this.isFiltered||this.metadata?.[d]?.tag!==void 0,A=v?this.filteredChanges:this.changes,H=this.indexedOperations[d];if(!H||H===t.OPERATION.DELETE){const j=H&&H===t.OPERATION.DELETE?t.OPERATION.DELETE_AND_ADD:g;this.indexedOperations[d]=j}he(A,d),v?(he(this.allFilteredChanges,d),this.root&&(this.root.enqueueChangeTree(this,"filteredChanges"),this.root.enqueueChangeTree(this,"allFilteredChanges"))):(he(this.allChanges,d),this.root?.enqueueChangeTree(this,"changes"))}shiftChangeIndexes(d){const g=this.isFiltered?this.filteredChanges:this.changes,v={},A={};for(const H in this.indexedOperations)v[Number(H)+d]=this.indexedOperations[H],A[Number(H)+d]=g.indexes[H];this.indexedOperations=v,g.indexes=A,g.operations=g.operations.map(H=>H+d)}shiftAllChangeIndexes(d,g=0){this.filteredChanges!==void 0?(this._shiftAllChangeIndexes(d,g,this.allFilteredChanges),this._shiftAllChangeIndexes(d,g,this.allChanges)):this._shiftAllChangeIndexes(d,g,this.allChanges)}_shiftAllChangeIndexes(d,g=0,v){const A={};let H=0;for(const j in v.indexes)A[H++]=v.indexes[j];v.indexes=A;for(let j=0;j<v.operations.length;j++){const ue=v.operations[j];ue>g&&(v.operations[j]=ue+d)}}indexedOperation(d,g,v=d){this.indexedOperations[d]=g,this.filteredChanges!==void 0?(he(this.allFilteredChanges,v),he(this.filteredChanges,d),this.root?.enqueueChangeTree(this,"filteredChanges")):(he(this.allChanges,v),he(this.changes,d),this.root?.enqueueChangeTree(this,"changes"))}getType(d){return this.ref[f]||this.metadata[d].type}getChange(d){return this.indexedOperations[d]}getValue(d,g=!1){return this.ref[l](d,g)}delete(d,g,v=d){if(d===void 0){try{throw new Error(`@colyseus/schema ${this.ref.constructor.name}: trying to delete non-existing index '${d}'`)}catch(j){console.warn(j)}return}const A=this.filteredChanges!==void 0?this.filteredChanges:this.changes;this.indexedOperations[d]=g??t.OPERATION.DELETE,he(A,d),ke(this.allChanges,v);const H=this.getValue(d);return H&&H[u]&&this.root?.remove(H[u]),this.filteredChanges!==void 0?(ke(this.allFilteredChanges,v),this.root?.enqueueChangeTree(this,"filteredChanges")):this.root?.enqueueChangeTree(this,"changes"),H}endEncode(d){this.indexedOperations={},this[d]=Se(),this.ref[p]?.(),this.isNew=!1}discard(d=!1){this.ref[p]?.(),this.indexedOperations={},this.changes=Se(this.changes.queueRootNode),this.filteredChanges!==void 0&&(this.filteredChanges=Se(this.filteredChanges.queueRootNode)),d&&(this.allChanges=Se(this.allChanges.queueRootNode),this.allFilteredChanges!==void 0&&(this.allFilteredChanges=Se(this.allFilteredChanges.queueRootNode)))}discardAll(){const d=Object.keys(this.indexedOperations);for(let g=0,v=d.length;g<v;g++){const A=this.getValue(Number(d[g]));A&&A[u]&&A[u].discardAll()}this.discard()}get changed(){return Object.entries(this.indexedOperations).length>0}checkIsFiltered(d,g,v){this.root.types.hasFilters&&(this._checkFilteredByParent(d,g),this.filteredChanges!==void 0&&(this.root?.enqueueChangeTree(this,"filteredChanges"),v&&this.root?.enqueueChangeTree(this,"allFilteredChanges"))),this.isFiltered||(this.root?.enqueueChangeTree(this,"changes"),v&&this.root?.enqueueChangeTree(this,"allChanges"))}_checkFilteredByParent(d,g){if(!d)return;const v=ye.isValidInstance(this.ref)?this.ref.constructor:this.ref[f];let A,H=!ye.isValidInstance(d);H?(A=d[u],d=A.parent,g=A.parentIndex):A=d[u];const j=d.constructor;let ue=`${this.root.types.getTypeId(v)}`;j&&(ue+=`-${this.root.types.schemas.get(j)}`),ue+=`-${g}`;const ne=ye.hasViewTagAtIndex(j?.[Symbol.metadata],g);this.isFiltered=d[u].isFiltered||this.root.types.parentFiltered[ue]||ne,this.isFiltered&&(this.isVisibilitySharedWithParent=A.isFiltered&&typeof v!="string"&&!ne&&H,this.filteredChanges||(this.filteredChanges=Se(),this.allFilteredChanges=Se()),this.changes.operations.length>0&&(this.changes.operations.forEach(oe=>he(this.filteredChanges,oe)),this.allChanges.operations.forEach(oe=>he(this.allFilteredChanges,oe)),this.changes=Se(),this.allChanges=Se()))}get parent(){return this.parentChain?.ref}get parentIndex(){return this.parentChain?.index}addParent(d,g){if(this.hasParent((v,A)=>v[u]===d[u])){this.parentChain.index=g;return}this.parentChain={ref:d,index:g,next:this.parentChain}}removeParent(d=this.parent){let g=this.parentChain,v=null;for(;g;){if(g.ref[u]===d[u])return v?v.next=g.next:this.parentChain=g.next,!0;v=g,g=g.next}return this.parentChain===void 0}findParent(d){let g=this.parentChain;for(;g;){if(d(g.ref,g.index))return g;g=g.next}}hasParent(d){return this.findParent(d)!==void 0}getAllParents(){const d=[];let g=this.parentChain;for(;g;)d.push({ref:g.ref,index:g.index}),g=g.next;return d}}function Lt(I,d,g,v,A,H){typeof g=="string"?Ae[g]?.(d,v,H):g[Symbol.metadata]!==void 0?(Ae.number(d,v[u].refId,H),(A&t.OPERATION.ADD)===t.OPERATION.ADD&&I.tryEncodeTypeId(d,g,v.constructor,H)):Ae.number(d,v[u].refId,H)}const Ct=function(I,d,g,v,A,H,j,ue,ne){if(d[H.offset++]=(v|A)&255,A===t.OPERATION.DELETE)return;const oe=g.ref,ce=ne[v];Lt(I,d,ne[v].type,oe[ce.name],A,H)},Rn=function(I,d,g,v,A,H){if(d[H.offset++]=A&255,Ae.number(d,v,H),A===t.OPERATION.DELETE)return;const j=g.ref;if((A&t.OPERATION.ADD)===t.OPERATION.ADD&&typeof j.set=="function"){const oe=g.ref.$indexes.get(v);Ae.string(d,oe,H)}const ue=j[f],ne=j[l](v);Lt(I,d,ue,ne,A,H)},Nn=function(I,d,g,v,A,H,j,ue){const ne=g.ref,oe=ue&&g.isFiltered&&typeof g.getType(v)!="string";let ce;if(oe){const Pe=ne.tmpItems[v];if(!Pe)return;ce=Pe[u].refId,A===t.OPERATION.DELETE?A=t.OPERATION.DELETE_BY_REFID:A===t.OPERATION.ADD&&(A=t.OPERATION.ADD_BY_REFID)}else ce=v;if(d[H.offset++]=A&255,Ae.number(d,ce,H),A===t.OPERATION.DELETE||A===t.OPERATION.DELETE_BY_REFID)return;const re=g.getType(v),Le=g.getValue(v,j);Lt(I,d,re,Le,A,H)},xo=-1;function Ns(I,d,g,v,A,H,j,ue){const ne=I.root,oe=g[l](v);let ce;if((d&t.OPERATION.DELETE)===t.OPERATION.DELETE){const re=ne.refIds.get(oe);re!==void 0&&ne.removeRef(re),d!==t.OPERATION.DELETE_AND_ADD&&g[h](v),ce=void 0}if(d!==t.OPERATION.DELETE)if(at.is(A)){const re=Ue.number(H,j);if(ce=ne.refs.get(re),(d&t.OPERATION.ADD)===t.OPERATION.ADD){const Le=I.getInstanceType(H,j,A);ce||(ce=I.createInstanceOfType(Le)),ne.addRef(re,ce,ce!==oe||d===t.OPERATION.DELETE_AND_ADD&&ce===oe)}}else if(typeof A=="string")ce=Ue[A](H,j);else{const re=Ye(Object.keys(A)[0]),Le=Ue.number(H,j),Pe=ne.refs.has(Le)?oe||ne.refs.get(Le):new re.constructor;if(ce=Pe.clone(!0),ce[f]=Object.values(A)[0],oe){let Me=ne.refIds.get(oe);if(Me!==void 0&&Le!==Me){const ve=oe.entries();let ze;for(;(ze=ve.next())&&!ze.done;){const[qt,$t]=ze.value;typeof $t=="object"&&(Me=ne.refIds.get($t),ne.removeRef(Me)),ue.push({ref:oe,refId:Me,op:t.OPERATION.DELETE,field:qt,value:void 0,previousValue:$t})}}}ne.addRef(Le,ce,Pe!==oe||d===t.OPERATION.DELETE_AND_ADD&&Pe===oe)}return{value:ce,previousValue:oe}}const Cr=function(I,d,g,v,A){const H=d[g.offset++],j=v.constructor[Symbol.metadata],ue=H>>6<<6,ne=H%(ue||255),oe=j[ne];if(oe===void 0)return console.warn("@colyseus/schema: field not defined at",{index:ne,ref:v.constructor.name,metadata:j}),xo;const{value:ce,previousValue:re}=Ns(I,ue,v,ne,oe.type,d,g,A);ce!=null&&(v[oe.name]=ce),re!==ce&&A.push({ref:v,refId:I.currentRefId,op:ue,field:oe.name,value:ce,previousValue:re})},jn=function(I,d,g,v,A){const H=d[g.offset++];if(H===t.OPERATION.CLEAR){I.removeChildRefs(v,A),v.clear();return}const j=Ue.number(d,g),ue=v[f];let ne;(H&t.OPERATION.ADD)===t.OPERATION.ADD?typeof v.set=="function"?(ne=Ue.string(d,g),v.setIndex(j,ne)):ne=j:ne=v.getIndex(j);const{value:oe,previousValue:ce}=Ns(I,H,v,j,ue,d,g,A);if(oe!=null){if(typeof v.set=="function")v.$items.set(ne,oe);else if(typeof v.$setAt=="function")v.$setAt(j,oe,H);else if(typeof v.add=="function"){const re=v.add(oe);typeof re=="number"&&v.setIndex(re,re)}}ce!==oe&&A.push({ref:v,refId:I.currentRefId,op:H,field:"",dynamicIndex:ne,value:oe,previousValue:ce})},Pr=function(I,d,g,v,A){let H=d[g.offset++],j;if(H===t.OPERATION.CLEAR){I.removeChildRefs(v,A),v.clear();return}else if(H===t.OPERATION.REVERSE){v.reverse();return}else if(H===t.OPERATION.DELETE_BY_REFID){const re=Ue.number(d,g),Le=I.root.refs.get(re);j=v.findIndex(Pe=>Pe===Le),v[h](j),A.push({ref:v,refId:I.currentRefId,op:t.OPERATION.DELETE,field:"",dynamicIndex:j,value:void 0,previousValue:Le});return}else if(H===t.OPERATION.ADD_BY_REFID){const re=Ue.number(d,g),Le=I.root.refs.get(re);Le&&(j=v.findIndex(Pe=>Pe===Le)),(j===-1||j===void 0)&&(j=v.length)}else j=Ue.number(d,g);const ue=v[f];let ne=j;const{value:oe,previousValue:ce}=Ns(I,H,v,j,ue,d,g,A);oe!=null&&oe!==ce&&v.$setAt(j,oe,H),ce!==oe&&A.push({ref:v,refId:I.currentRefId,op:H,field:"",dynamicIndex:ne,value:oe,previousValue:ce})};class Ir extends Error{}function _o(I,d,g,v){let A,H=!1;switch(d){case"number":case"int8":case"uint8":case"int16":case"uint16":case"int32":case"uint32":case"int64":case"uint64":case"float32":case"float64":A="number",isNaN(I)&&console.log(`trying to encode "NaN" in ${g.constructor.name}#${v}`);break;case"bigint64":case"biguint64":A="bigint";break;case"string":A="string",H=!0;break;case"boolean":return;default:return}if(typeof I!==A&&(!H||H&&I!==null)){let j=`'${JSON.stringify(I)}'${I&&I.constructor&&` (${I.constructor.name})`||""}`;throw new Ir(`a '${A}' was expected, but ${j} was provided in ${g.constructor.name}#${v}`)}}function Ei(I,d,g,v){if(!(I instanceof d))throw new Ir(`a '${d.name}' was expected, but '${I&&I.constructor.name}' was provided in ${g.constructor.name}#${v}`)}var Dr,_s;const yo=(I,d)=>{const g=I.toString(),v=d.toString();return g<v?-1:g>v?1:0},nn=class nn{static[(Dr=o,_s=a,c)](d,g,v){return!v||typeof d[f]=="string"||v.isChangeTreeVisible(d.tmpItems[g]?.[u])}static is(d){return Array.isArray(d)||d.array!==void 0}static from(d){return new nn(...Array.from(d))}constructor(...d){this.items=[],this.tmpItems=[],this.deletedIndexes={},this.isMovingItems=!1,Object.defineProperty(this,f,{value:void 0,enumerable:!1,writable:!0,configurable:!0});const g=new Proxy(this,{get:(v,A)=>typeof A!="symbol"&&!isNaN(A)?this.items[A]:Reflect.get(v,A),set:(v,A,H)=>{if(typeof A!="symbol"&&!isNaN(A)){if(H==null)v.$deleteAt(A);else{if(H[u]){Ei(H,v[f],v,A);const j=v.items[A];v.isMovingItems?(j!==void 0?H[u].isNew?v[u].indexedOperation(Number(A),t.OPERATION.MOVE_AND_ADD):(v[u].getChange(Number(A))&t.OPERATION.DELETE)===t.OPERATION.DELETE?v[u].indexedOperation(Number(A),t.OPERATION.DELETE_AND_MOVE):v[u].indexedOperation(Number(A),t.OPERATION.MOVE):H[u].isNew&&v[u].indexedOperation(Number(A),t.OPERATION.ADD),H[u].setParent(this,v[u].root,A)):v.$changeAt(Number(A),H),j!==void 0&&j[u].root?.remove(j[u])}else v.$changeAt(Number(A),H);v.items[A]=H,v.tmpItems[A]=H}return!0}else return Reflect.set(v,A,H)},deleteProperty:(v,A)=>(typeof A=="number"?v.$deleteAt(A):delete v[A],!0),has:(v,A)=>typeof A!="symbol"&&!isNaN(Number(A))?Reflect.has(this.items,A):Reflect.has(v,A)});return Object.defineProperty(this,u,{value:new Qe(g),enumerable:!1,writable:!0}),d.length>0&&this.push(...d),g}set length(d){d===0?this.clear():d<this.items.length?this.splice(d,this.length-d):console.warn("ArraySchema: can't set .length to a higher value than its length.")}get length(){return this.items.length}push(...d){let g=this.tmpItems.length;const v=this[u];for(let A=0,H=d.length;A<H;A++,g++){const j=d[A];if(j==null)return;typeof j=="object"&&this[f]&&Ei(j,this[f],this,A),v.indexedOperation(g,t.OPERATION.ADD,this.items.length),this.items.push(j),this.tmpItems.push(j),j[u]?.setParent(this,v.root,g)}return g}pop(){let d=-1;for(let g=this.tmpItems.length-1;g>=0;g--)if(this.deletedIndexes[g]!==!0){d=g;break}if(!(d<0))return this[u].delete(d,void 0,this.items.length-1),this.deletedIndexes[d]=!0,this.items.pop()}at(d){return d<0&&(d+=this.length),this.items[d]}$changeAt(d,g){if(g==null){console.error("ArraySchema items cannot be null nor undefined; Use `deleteAt(index)` instead.");return}if(this.items[d]===g)return;const v=this.items[d]!==void 0?typeof g=="object"?t.OPERATION.DELETE_AND_ADD:t.OPERATION.REPLACE:t.OPERATION.ADD,A=this[u];A.change(d,v),g[u]?.setParent(this,A.root,d)}$deleteAt(d,g){this[u].delete(d,g)}$setAt(d,g,v){d===0&&v===t.OPERATION.ADD&&this.items[d]!==void 0?this.items.unshift(g):v===t.OPERATION.DELETE_AND_MOVE?(this.items.splice(d,1),this.items[d]=g):this.items[d]=g}clear(){if(this.items.length===0)return;const d=this[u];d.forEachChild((g,v)=>{d.root?.remove(g)}),d.discard(!0),d.operation(t.OPERATION.CLEAR),this.items.length=0,this.tmpItems.length=0}concat(...d){return new nn(...this.items.concat(...d))}join(d){return this.items.join(d)}reverse(){return this[u].operation(t.OPERATION.REVERSE),this.items.reverse(),this.tmpItems.reverse(),this}shift(){if(this.items.length===0)return;const d=this[u],g=this.tmpItems.findIndex(A=>A===this.items[0]),v=this.items.findIndex(A=>A===this.items[0]);return d.delete(g,t.OPERATION.DELETE,v),d.shiftAllChangeIndexes(-1,v),this.deletedIndexes[g]=!0,this.items.shift()}slice(d,g){const v=new nn;return v.push(...this.items.slice(d,g)),v}sort(d=yo){this.isMovingItems=!0;const g=this[u];return this.items.sort(d).forEach((A,H)=>g.change(H,t.OPERATION.REPLACE)),this.tmpItems.sort(d),this.isMovingItems=!1,this}splice(d,g,...v){const A=this[u],H=this.items.length,j=this.tmpItems.length,ue=v.length,ne=[];for(let oe=0;oe<j;oe++)this.deletedIndexes[oe]!==!0&&ne.push(oe);if(H>d){g===void 0&&(g=H-d);for(let oe=d;oe<d+g;oe++){const ce=ne[oe];A.delete(ce,t.OPERATION.DELETE),this.deletedIndexes[ce]=!0}}else g=0;if(ue>0){if(ue>g)throw console.error("Inserting more elements than deleting during ArraySchema#splice()"),new Error("ArraySchema#splice(): insertCount must be equal or lower than deleteCount.");for(let oe=0;oe<ue;oe++){const ce=(ne[d]??H)+oe;A.indexedOperation(ce,this.deletedIndexes[ce]?t.OPERATION.DELETE_AND_ADD:t.OPERATION.ADD),v[oe][u]?.setParent(this,A.root,ce)}}return g>ue&&A.shiftAllChangeIndexes(-(g-ue),ne[d+ue]),A.filteredChanges!==void 0?A.root?.enqueueChangeTree(A,"filteredChanges"):A.root?.enqueueChangeTree(A,"changes"),this.items.splice(d,g,...v)}unshift(...d){const g=this[u];return g.shiftChangeIndexes(d.length),g.isFiltered?he(g.filteredChanges,this.items.length):he(g.allChanges,this.items.length),d.forEach((v,A)=>{g.change(A,t.OPERATION.ADD)}),this.tmpItems.unshift(...d),this.items.unshift(...d)}indexOf(d,g){return this.items.indexOf(d,g)}lastIndexOf(d,g=this.length-1){return this.items.lastIndexOf(d,g)}every(d,g){return this.items.every(d,g)}some(d,g){return this.items.some(d,g)}forEach(d,g){return this.items.forEach(d,g)}map(d,g){return this.items.map(d,g)}filter(d,g){return this.items.filter(d,g)}reduce(d,g){return this.items.reduce(d,g)}reduceRight(d,g){return this.items.reduceRight(d,g)}find(d,g){return this.items.find(d,g)}findIndex(d,g){return this.items.findIndex(d,g)}fill(d,g,v){throw new Error("ArraySchema#fill() not implemented")}copyWithin(d,g,v){throw new Error("ArraySchema#copyWithin() not implemented")}toString(){return this.items.toString()}toLocaleString(){return this.items.toLocaleString()}[Symbol.iterator](){return this.items[Symbol.iterator]()}static get[Symbol.species](){return nn}entries(){return this.items.entries()}keys(){return this.items.keys()}values(){return this.items.values()}includes(d,g){return this.items.includes(d,g)}flatMap(d,g){throw new Error("ArraySchema#flatMap() is not supported.")}flat(d){throw new Error("ArraySchema#flat() is not supported.")}findLast(){return this.items.findLast.apply(this.items,arguments)}findLastIndex(...d){return this.items.findLastIndex.apply(this.items,arguments)}with(d,g){const v=this.items.slice();return d<0&&(d+=this.length),v[d]=g,new nn(...v)}toReversed(){return this.items.slice().reverse()}toSorted(d){return this.items.slice().sort(d)}toSpliced(d,g,...v){return this.items.toSpliced.apply(copy,arguments)}shuffle(){return this.move(d=>{let g=this.items.length;for(;g!=0;){let v=Math.floor(Math.random()*g);g--,[this[g],this[v]]=[this[v],this[g]]}})}move(d){return this.isMovingItems=!0,d(this),this.isMovingItems=!1,this}[l](d,g=!1){return g?this.items[d]:this.deletedIndexes[d]?this.items[d]:this.tmpItems[d]||this.items[d]}[h](d){this.items[d]=void 0,this.tmpItems[d]=void 0}[p](){this.tmpItems=this.items.slice(),this.deletedIndexes={}}[_](){this.items=this.items.filter(d=>d!==void 0),this.tmpItems=this.items.slice()}toArray(){return this.items.slice(0)}toJSON(){return this.toArray().map(d=>typeof d.toJSON=="function"?d.toJSON():d)}clone(d){let g;return d?(g=new nn,g.push(...this.items)):g=new nn(...this.map(v=>v[u]?v.clone():v)),g}};nn[Dr]=Nn,nn[_s]=Pr;let On=nn;We("array",{constructor:On});var vo,So;const Yi=class Yi{static[(vo=o,So=a,c)](d,g,v){return!v||typeof d[f]=="string"||v.isChangeTreeVisible((d[l](g)??d.deletedItems[g])[u])}static is(d){return d.map!==void 0}constructor(d){this.$items=new Map,this.$indexes=new Map,this.deletedItems={};const g=new Qe(this);if(g.indexes={},Object.defineProperty(this,u,{value:g,enumerable:!1,writable:!0}),d)if(d instanceof Map||d instanceof Yi)d.forEach((v,A)=>this.set(A,v));else for(const v in d)this.set(v,d[v]);Object.defineProperty(this,f,{value:void 0,enumerable:!1,writable:!0,configurable:!0})}[Symbol.iterator](){return this.$items[Symbol.iterator]()}get[Symbol.toStringTag](){return this.$items[Symbol.toStringTag]}static get[Symbol.species](){return Yi}set(d,g){if(g==null)throw new Error(`MapSchema#set('${d}', ${g}): trying to set ${g} value on '${d}'.`);typeof g=="object"&&this[f]&&Ei(g,this[f],this,d),d=d.toString();const v=this[u],A=g[u]!==void 0;let H,j;if(typeof v.indexes[d]<"u"){H=v.indexes[d],j=t.OPERATION.REPLACE;const ue=this.$items.get(d);if(ue===g)return;A&&(j=t.OPERATION.DELETE_AND_ADD,ue!==void 0&&ue[u].root?.remove(ue[u])),this.deletedItems[H]&&delete this.deletedItems[H]}else H=v.indexes[x]??0,j=t.OPERATION.ADD,this.$indexes.set(H,d),v.indexes[d]=H,v.indexes[x]=H+1;return this.$items.set(d,g),v.change(H,j),A&&g[u].setParent(this,v.root,H),this}get(d){return this.$items.get(d)}delete(d){if(!this.$items.has(d))return!1;const g=this[u].indexes[d];return this.deletedItems[g]=this[u].delete(g),this.$items.delete(d)}clear(){const d=this[u];d.discard(!0),d.indexes={},d.forEachChild((g,v)=>{d.root?.remove(g)}),this.$indexes.clear(),this.$items.clear(),d.operation(t.OPERATION.CLEAR)}has(d){return this.$items.has(d)}forEach(d){this.$items.forEach(d)}entries(){return this.$items.entries()}keys(){return this.$items.keys()}values(){return this.$items.values()}get size(){return this.$items.size}setIndex(d,g){this.$indexes.set(d,g)}getIndex(d){return this.$indexes.get(d)}[l](d){return this.$items.get(this.$indexes.get(d))}[h](d){const g=this.$indexes.get(d);this.$items.delete(g),this.$indexes.delete(d)}[p](){const d=this[u];for(const g in this.deletedItems){const v=parseInt(g),A=this.$indexes.get(v);delete d.indexes[A],this.$indexes.delete(v)}this.deletedItems={}}toJSON(){const d={};return this.forEach((g,v)=>{d[v]=typeof g.toJSON=="function"?g.toJSON():g}),d}clone(d){let g;return d?g=Object.assign(new Yi,this):(g=new Yi,this.forEach((v,A)=>{v[u]?g.set(A,v.clone()):g.set(A,v)})),g}};Yi[vo]=Rn,Yi[So]=jn;let ri=Yi;We("map",{constructor:ri});var bo,wo;const Os=class Os{static[(bo=o,wo=a,c)](d,g,v){return!v||typeof d[f]=="string"||v.isChangeTreeVisible((d[l](g)??d.deletedItems[g])[u])}static is(d){return d.collection!==void 0}constructor(d){this.$items=new Map,this.$indexes=new Map,this.deletedItems={},this.$refId=0,this[u]=new Qe(this),this[u].indexes={},d&&d.forEach(g=>this.add(g)),Object.defineProperty(this,f,{value:void 0,enumerable:!1,writable:!0,configurable:!0})}add(d){const g=this.$refId++;return d[u]!==void 0&&d[u].setParent(this,this[u].root,g),this[u].indexes[g]=g,this.$indexes.set(g,g),this.$items.set(g,d),this[u].change(g),g}at(d){const g=Array.from(this.$items.keys())[d];return this.$items.get(g)}entries(){return this.$items.entries()}delete(d){const g=this.$items.entries();let v,A;for(;(A=g.next())&&!A.done;)if(d===A.value[1]){v=A.value[0];break}return v===void 0?!1:(this.deletedItems[v]=this[u].delete(v),this.$indexes.delete(v),this.$items.delete(v))}clear(){const d=this[u];d.discard(!0),d.indexes={},d.forEachChild((g,v)=>{d.root?.remove(g)}),this.$indexes.clear(),this.$items.clear(),d.operation(t.OPERATION.CLEAR)}has(d){return Array.from(this.$items.values()).some(g=>g===d)}forEach(d){this.$items.forEach((g,v,A)=>d(g,v,this))}values(){return this.$items.values()}get size(){return this.$items.size}[Symbol.iterator](){return this.$items.values()}setIndex(d,g){this.$indexes.set(d,g)}getIndex(d){return this.$indexes.get(d)}[l](d){return this.$items.get(this.$indexes.get(d))}[h](d){const g=this.$indexes.get(d);this.$items.delete(g),this.$indexes.delete(d)}[p](){this.deletedItems={}}toArray(){return Array.from(this.$items.values())}toJSON(){const d=[];return this.forEach((g,v)=>{d.push(typeof g.toJSON=="function"?g.toJSON():g)}),d}clone(d){let g;return d?g=Object.assign(new Os,this):(g=new Os,this.forEach(v=>{v[u]?g.add(v.clone()):g.add(v)})),g}};Os[bo]=Rn,Os[wo]=jn;let qi=Os;We("collection",{constructor:qi});var O,Z;const Fs=class Fs{static[(O=o,Z=a,c)](d,g,v){return!v||typeof d[f]=="string"||v.visible.has((d[l](g)??d.deletedItems[g])[u])}static is(d){return d.set!==void 0}constructor(d){this.$items=new Map,this.$indexes=new Map,this.deletedItems={},this.$refId=0,this[u]=new Qe(this),this[u].indexes={},d&&d.forEach(g=>this.add(g)),Object.defineProperty(this,f,{value:void 0,enumerable:!1,writable:!0,configurable:!0})}add(d){if(this.has(d))return!1;const g=this.$refId++;d[u]!==void 0&&d[u].setParent(this,this[u].root,g);const v=this[u].indexes[g]?.op??t.OPERATION.ADD;return this[u].indexes[g]=g,this.$indexes.set(g,g),this.$items.set(g,d),this[u].change(g,v),g}entries(){return this.$items.entries()}delete(d){const g=this.$items.entries();let v,A;for(;(A=g.next())&&!A.done;)if(d===A.value[1]){v=A.value[0];break}return v===void 0?!1:(this.deletedItems[v]=this[u].delete(v),this.$indexes.delete(v),this.$items.delete(v))}clear(){const d=this[u];d.discard(!0),d.indexes={},this.$indexes.clear(),this.$items.clear(),d.operation(t.OPERATION.CLEAR)}has(d){const g=this.$items.values();let v=!1,A;for(;(A=g.next())&&!A.done;)if(d===A.value){v=!0;break}return v}forEach(d){this.$items.forEach((g,v,A)=>d(g,v,this))}values(){return this.$items.values()}get size(){return this.$items.size}[Symbol.iterator](){return this.$items.values()}setIndex(d,g){this.$indexes.set(d,g)}getIndex(d){return this.$indexes.get(d)}[l](d){return this.$items.get(this.$indexes.get(d))}[h](d){const g=this.$indexes.get(d);this.$items.delete(g),this.$indexes.delete(d)}[p](){this.deletedItems={}}toArray(){return Array.from(this.$items.values())}toJSON(){const d=[];return this.forEach((g,v)=>{d.push(typeof g.toJSON=="function"?g.toJSON():g)}),d}clone(d){let g;return d?g=Object.assign(new Fs,this):(g=new Fs,this.forEach(v=>{v[u]?g.add(v.clone()):g.add(v)})),g}};Fs[O]=Rn,Fs[Z]=jn;let se=Fs;We("set",{constructor:se});const ie=-1;function J(I){return $e.register(I),I}function we(I=ie){return function(d,g){const v=d.constructor,H=Object.getPrototypeOf(v)[Symbol.metadata],j=v[Symbol.metadata]??=Object.assign({},v[Symbol.metadata],H??Object.create(null));ye.setTag(j,g,I)}}function Te(I,d){return function(g,v){const A=g.constructor;if(!I)throw new Error(`${A.name}: @type() reference provided for "${v}" is undefined. Make sure you don't have any circular dependencies.`);I=W(I),$e.register(A);const j=Object.getPrototypeOf(A)[Symbol.metadata],ue=ye.initialize(A);let ne=ue[v];if(ue[ne]!==void 0){if(ue[ne].deprecated)return;if(ue[ne].type!==void 0)try{throw new Error(`@colyseus/schema: Duplicate '${v}' definition on '${A.name}'.
Check @type() annotation`)}catch(oe){const ce=oe.stack.split(`
`)[4].trim();throw new Error(`${oe.message} ${ce}`)}}else ne=ue[x]??(j&&j[x])??-1,ne++;if(d&&d.manual)ye.addField(ue,ne,v,I,{enumerable:!0,configurable:!0,writable:!0});else{const oe=typeof Object.keys(I)[0]=="string"&&Ye(Object.keys(I)[0]),ce=oe?Object.values(I)[0]:I;ye.addField(ue,ne,v,I,Ve(`_${v}`,ne,ce,oe))}}}function Ve(I,d,g,v){return{get:function(){return this[I]},set:function(A){const H=this[I]??void 0;if(A!==H){if(A!=null){v?(v.constructor===On&&!(A instanceof On)&&(A=new On(...A)),v.constructor===ri&&!(A instanceof ri)&&(A=new ri(A)),A[f]=g):typeof g!="string"?Ei(A,g,this,I.substring(1)):_o(A,g,this,I.substring(1));const j=this[u];H!==void 0&&H[u]?(j.root?.remove(H[u]),this.constructor[r](j,d,t.OPERATION.DELETE_AND_ADD)):this.constructor[r](j,d,t.OPERATION.ADD),A[u]?.setParent(this,j.root,d)}else H!==void 0&&this[u].delete(d);this[I]=A}},enumerable:!0,configurable:!0}}function Fe(I=!0){return function(d,g){const v=d.constructor,H=Object.getPrototypeOf(v)[Symbol.metadata],j=v[Symbol.metadata]??=Object.assign({},v[Symbol.metadata],H??Object.create(null)),ue=j[g];j[ue].deprecated=!0,I&&(j[y]??={},j[y][g]={get:function(){throw new Error(`${g} is deprecated.`)},set:function(ne){},enumerable:!1,configurable:!0}),Object.defineProperty(j,ue,{value:j[ue],enumerable:!1,configurable:!0})}}function et(I,d,g){for(let v in d)Te(d[v],g)(I.prototype,v);return I}function nt(I,d,g=at){const v={},A={},H={},j={};for(let ce in I){const re=I[ce];typeof re=="object"?(re.view!==void 0&&(j[ce]=typeof re.view=="boolean"?ie:re.view),v[ce]=W(re),Object.prototype.hasOwnProperty.call(re,"default")?H[ce]=re.default:Array.isArray(re)||re.array!==void 0?H[ce]=new On:re.map!==void 0?H[ce]=new ri:re.collection!==void 0?H[ce]=new qi:re.set!==void 0?H[ce]=new se:re.type!==void 0&&at.is(re.type)&&(!re.type.prototype.initialize||re.type.prototype.initialize.length===0)&&(H[ce]=new re.type)):typeof re=="function"?at.is(re)?((!re.prototype.initialize||re.prototype.initialize.length===0)&&(H[ce]=new re),v[ce]=W(re)):A[ce]=re:v[ce]=W(re)}const ue=()=>{const ce={};for(const re in H){const Le=H[re];Le&&typeof Le.clone=="function"?ce[re]=Le.clone():ce[re]=Le}return ce},ne=ce=>{const re=Object.keys(v),Le={};for(const Pe in ce)re.includes(Pe)||(Le[Pe]=ce[Pe]);return Le},oe=ye.setFields(class extends g{constructor(...ce){A.initialize&&typeof A.initialize=="function"?(super(Object.assign({},ue(),ne(ce[0]||{}))),new.target===oe&&A.initialize.apply(this,ce)):super(Object.assign({},ue(),ce[0]||{}))}},v);oe._getDefaultValues=ue,Object.assign(oe.prototype,A);for(let ce in j)we(j[ce])(oe.prototype,ce);return d&&Object.defineProperty(oe,"name",{value:d}),oe.extends=(ce,re)=>nt(ce,re,oe),oe}function Xe(I){return new Array(I).fill(0).map((d,g)=>g===I-1?"└─ ":"   ").join("")}function gt(I){const d=I[u].root,g={ops:{},refs:[]};let v=d.changes.next;for(;v;){const A=v.changeTree;if(A===void 0){v=v.next;continue}const H=A.indexedOperations;g.refs.push(`refId#${A.refId}`);for(const j in H){const ue=H[j],ne=t.OPERATION[ue];g.ops[ne]||(g.ops[ne]=0),g.ops[t.OPERATION[ue]]++}v=v.next}return g}var Pt,Vt;const Bs=class Bs{static initialize(d){Object.defineProperty(d,u,{value:new Qe(d),enumerable:!1,writable:!0}),Object.defineProperties(d,d.constructor[Symbol.metadata]?.[y]||{})}static is(d){return typeof d[Symbol.metadata]=="object"}static[(Pt=o,Vt=a,r)](d,g,v=t.OPERATION.ADD){d.change(g,v)}static[c](d,g,v){const H=d.constructor[Symbol.metadata][g]?.tag;if(v===void 0)return H===void 0;if(H===void 0)return!0;if(H===ie)return v.isChangeTreeVisible(d[u]);{const j=v.tags?.get(d[u]);return j&&j.has(H)}}constructor(d){Bs.initialize(this),d&&Object.assign(this,d)}assign(d){return Object.assign(this,d),this}setDirty(d,g){const v=this.constructor[Symbol.metadata];this[u].change(v[v[d]].index,g)}clone(){const d=Object.create(this.constructor.prototype);Bs.initialize(d);const g=this.constructor[Symbol.metadata];for(const v in g){const A=g[v].name;typeof this[A]=="object"&&typeof this[A]?.clone=="function"?d[A]=this[A].clone():d[A]=this[A]}return d}toJSON(){const d={},g=this.constructor[Symbol.metadata];for(const v in g){const A=g[v],H=A.name;!A.deprecated&&this[H]!==null&&typeof this[H]<"u"&&(d[H]=typeof this[H].toJSON=="function"?this[H].toJSON():this[H])}return d}discardAllChanges(){this[u].discardAll()}[l](d){const g=this.constructor[Symbol.metadata];return this[g[d].name]}[h](d){const g=this.constructor[Symbol.metadata];this[g[d].name]=void 0}static debugRefIds(d,g=!1,v=0,A,H=""){const j=g?` - ${JSON.stringify(d.toJSON())}`:"",ue=d[u],ne=A?A.root.refIds.get(d):ue.refId,oe=A?A.root:ue.root,ce=oe?.refCount?.[ne]>1?` [×${oe.refCount[ne]}]`:"";let re=`${Xe(v)}${H}${d.constructor.name} (refId: ${ne})${ce}${j}
`;return ue.forEachChild((Le,Pe)=>{let Me=Pe;typeof Pe=="number"&&d.$indexes&&(Me=d.$indexes.get(Pe)??Pe);const ve=d.forEach!==void 0&&Me!==void 0?`["${Me}"]: `:"";re+=this.debugRefIds(Le.ref,g,v+1,A,ve)}),re}static debugRefIdEncodingOrder(d,g="allChanges"){let v=[],A=d[u].root[g].next;for(;A;)A.changeTree&&v.push(A.changeTree.refId),A=A.next;return v}static debugRefIdsFromDecoder(d){return this.debugRefIds(d.state,!1,0,d)}static debugChanges(d,g=!1){const v=d[u],A=g?v.allChanges:v.changes,H=g?"allChanges":"changes";let j=`${d.constructor.name} (${v.refId}) -> .${H}:
`;function ue(ne){ne.operations.filter(oe=>oe).forEach(oe=>{const ce=v.indexedOperations[oe];j+=`- [${oe}]: ${t.OPERATION[ce]} (${JSON.stringify(v.getValue(Number(oe),g))})
`})}return ue(A),!g&&v.filteredChanges&&v.filteredChanges.operations.filter(ne=>ne).length>0&&(j+=`${d.constructor.name} (${v.refId}) -> .filteredChanges:
`,ue(v.filteredChanges)),g&&v.allFilteredChanges&&v.allFilteredChanges.operations.filter(ne=>ne).length>0&&(j+=`${d.constructor.name} (${v.refId}) -> .allFilteredChanges:
`,ue(v.allFilteredChanges)),j}static debugChangesDeep(d,g="changes"){let v="";const A=d[u],H=A.root,j=new Map,ue=[];let ne=0;for(const[ce,re]of Object.entries(H[g])){const Le=H.changeTrees[ce];if(!Le)continue;let Pe=!1,Me=[],ve=Le.parent?.[u];if(Le===A)Pe=!0;else for(;ve!==void 0;){if(Me.push(ve),ve.ref===d){Pe=!0;break}ve=ve.parent?.[u]}Pe&&(ue.push(Le.refId),ne+=Object.keys(re).length,j.set(Le,Me.reverse()))}v+=`---
`,v+=`root refId: ${A.refId}
`,v+=`Total instances: ${ue.length} (refIds: ${ue.join(", ")})
`,v+=`Total changes: ${ne}
`,v+=`---
`;const oe=new WeakSet;for(const[ce,re]of j.entries()){re.forEach((ze,qt)=>{oe.has(ze)||(v+=`${Xe(qt)}${ze.ref.constructor.name} (refId: ${ze.refId})
`,oe.add(ze))});const Le=ce.indexedOperations,Pe=re.length,Me=Xe(Pe),ve=Pe>0?`(${ce.parentIndex}) `:"";v+=`${Me}${ve}${ce.ref.constructor.name} (refId: ${ce.refId}) - changes: ${Object.keys(Le).length}
`;for(const ze in Le){const qt=Le[ze];v+=`${Xe(Pe+1)}${t.OPERATION[qt]}: ${ze}
`}}return`${v}`}};Bs[Pt]=Ct,Bs[Vt]=Cr;let at=Bs;function yt(I,d,g,v){var A=arguments.length,H=A<3?d:v,j;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")H=Reflect.decorate(I,d,g,v);else for(var ue=I.length-1;ue>=0;ue--)(j=I[ue])&&(H=(A<3?j(H):A>3?j(d,g,H):j(d,g))||H);return A>3&&H&&Object.defineProperty(d,g,H),H}typeof SuppressedError=="function"&&SuppressedError;class Ze{constructor(d){this.types=d,this.nextUniqueId=0,this.refCount={},this.changeTrees={},this.allChanges=_e(),this.allFilteredChanges=_e(),this.changes=_e(),this.filteredChanges=_e()}getNextUniqueId(){return this.nextUniqueId++}add(d){d.refId===void 0&&(d.refId=this.getNextUniqueId());const g=this.changeTrees[d.refId]===void 0;g&&(this.changeTrees[d.refId]=d);const v=this.refCount[d.refId];if(v===0){const A=d.allChanges.operations;let H=A.length;for(;H--;)d.indexedOperations[A[H]]=t.OPERATION.ADD,he(d.changes,H)}return this.refCount[d.refId]=(v||0)+1,g}remove(d){const g=this.refCount[d.refId]-1;return g<=0?(d.root=void 0,delete this.changeTrees[d.refId],this.removeChangeFromChangeSet("allChanges",d),this.removeChangeFromChangeSet("changes",d),d.filteredChanges&&(this.removeChangeFromChangeSet("allFilteredChanges",d),this.removeChangeFromChangeSet("filteredChanges",d)),this.refCount[d.refId]=0,d.forEachChild((v,A)=>{v.removeParent(d.ref)&&(v.parentChain===void 0||v.parentChain&&this.refCount[v.refId]>0?this.remove(v):v.parentChain&&this.moveNextToParent(v))})):(this.refCount[d.refId]=g,this.recursivelyMoveNextToParent(d)),g}recursivelyMoveNextToParent(d){this.moveNextToParent(d),d.forEachChild((g,v)=>this.recursivelyMoveNextToParent(g))}moveNextToParent(d){d.filteredChanges?(this.moveNextToParentInChangeTreeList("filteredChanges",d),this.moveNextToParentInChangeTreeList("allFilteredChanges",d)):(this.moveNextToParentInChangeTreeList("changes",d),this.moveNextToParentInChangeTreeList("allChanges",d))}moveNextToParentInChangeTreeList(d,g){const v=this[d],A=g[d].queueRootNode;if(!A)return;const H=g.parent;if(!H||!H[u])return;const j=H[u][d]?.queueRootNode;if(!j||j===A)return;const ue=j.position;A.position>ue||(A.prev?A.prev.next=A.next:v.next=A.next,A.next?A.next.prev=A.prev:v.tail=A.prev,A.prev=j,A.next=j.next,j.next?j.next.prev=A:v.tail=A,j.next=A,this.updatePositionsAfterMove(v,A,ue+1))}enqueueChangeTree(d,g,v=d[g].queueRootNode){v||(d[g].queueRootNode=this.addToChangeTreeList(this[g],d))}addToChangeTreeList(d,g){const v={changeTree:g,next:void 0,prev:void 0,position:d.tail?d.tail.position+1:0};return d.next?(v.prev=d.tail,d.tail.next=v,d.tail=v):(d.next=v,d.tail=v),v}updatePositionsAfterRemoval(d,g){let v=d.next,A=0;for(;v;)A>=g&&(v.position=A),v=v.next,A++}updatePositionsAfterMove(d,g,v){let A=d.next,H=0;for(;A;)A.position=H,A=A.next,H++}removeChangeFromChangeSet(d,g){const v=this[d],A=g[d].queueRootNode;if(A&&A.changeTree===g){const H=A.position;return A.prev?A.prev.next=A.next:v.next=A.next,A.next?A.next.prev=A.prev:v.tail=A.prev,this.updatePositionsAfterRemoval(v,H),g[d].queueRootNode=void 0,!0}return!1}}const Mo=class Mo{constructor(d){this.sharedBuffer=Buffer.allocUnsafe(Mo.BUFFER_SIZE),this.context=$e.cache(d.constructor),this.root=new Ze(this.context),this.setState(d)}setState(d){this.state=d,this.state[u].setRoot(this.root)}encode(d={offset:0},g,v=this.sharedBuffer,A="changes",H=A==="allChanges",j=d.offset){const ue=g!==void 0,ne=this.state[u];let oe=this.root[A];for(;oe=oe.next;){const ce=oe.changeTree;if(ue){if(!g.isChangeTreeVisible(ce)){g.invisible.add(ce);continue}g.invisible.delete(ce)}const re=ce[A],Le=ce.ref,Pe=re.operations.length;if(Pe===0)continue;const Me=Le.constructor,ve=Me[o],ze=Me[c],qt=Me[Symbol.metadata];(ue||d.offset>j||ce!==ne)&&(v[d.offset++]=255,Ae.number(v,ce.refId,d));for(let $t=0;$t<Pe;$t++){const Gn=re.operations[$t];if(Gn<0){v[d.offset++]=Math.abs(Gn)&255;continue}const Zn=H?t.OPERATION.ADD:ce.indexedOperations[Gn];Gn===void 0||Zn===void 0||ze&&!ze(Le,Gn,g)||ve(this,v,ce,Gn,Zn,d,H,ue,qt)}}if(d.offset>v.byteLength){const ce=Math.ceil(d.offset/(Buffer.poolSize??8192))*(Buffer.poolSize??8192);return console.warn(`@colyseus/schema buffer overflow. Encoded state is higher than default BUFFER_SIZE. Use the following to increase default BUFFER_SIZE:

    import { Encoder } from "@colyseus/schema";
    Encoder.BUFFER_SIZE = ${Math.round(ce/1024)} * 1024; // ${Math.round(ce/1024)} KB
`),v=Buffer.alloc(ce,v),v===this.sharedBuffer&&(this.sharedBuffer=v),this.encode({offset:j},g,v,A,H)}else return v.subarray(0,d.offset)}encodeAll(d={offset:0},g=this.sharedBuffer){return this.encode(d,void 0,g,"allChanges",!0)}encodeAllView(d,g,v,A=this.sharedBuffer){const H=v.offset;return this.encode(v,d,A,"allFilteredChanges",!0,H),Buffer.concat([A.subarray(0,g),A.subarray(H,v.offset)])}encodeView(d,g,v,A=this.sharedBuffer){const H=v.offset;for(const[j,ue]of d.changes){const ne=this.root.changeTrees[j];if(ne===void 0){d.changes.delete(j);continue}const oe=Object.keys(ue);if(oe.length===0)continue;const re=ne.ref.constructor,Le=re[o],Pe=re[Symbol.metadata];A[v.offset++]=255,Ae.number(A,ne.refId,v);for(let Me=0,ve=oe.length;Me<ve;Me++){const ze=Number(oe[Me]),$t=ne.ref[l](ze)!==void 0&&ue[ze]||t.OPERATION.DELETE;Le(this,A,ne,ze,$t,v,!1,!0,Pe)}}return d.changes.clear(),this.encode(v,d,A,"filteredChanges",!1,H),Buffer.concat([A.subarray(0,g),A.subarray(H,v.offset)])}discardChanges(){let d=this.root.changes.next;for(;d;)d.changeTree.endEncode("changes"),d=d.next;for(this.root.changes=_e(),d=this.root.filteredChanges.next;d;)d.changeTree.endEncode("filteredChanges"),d=d.next;this.root.filteredChanges=_e()}tryEncodeTypeId(d,g,v,A){const H=this.context.getTypeId(g),j=this.context.getTypeId(v);if(j===void 0){console.warn(`@colyseus/schema WARNING: Class "${v.name}" is not registered on TypeRegistry - Please either tag the class with @entity or define a @type() field.`);return}H!==j&&(d[A.offset++]=213,Ae.number(d,j,A))}get hasChanges(){return this.root.changes.next!==void 0||this.root.filteredChanges.next!==void 0}};Mo.BUFFER_SIZE=typeof Buffer<"u"&&Buffer.poolSize||8*1024;let Ot=Mo;function St(I,d){if(d===-1||d>=I.length)return!1;const g=I.length-1;for(let v=d;v<g;v++)I[v]=I[v+1];return I.length=g,!0}class _n extends Error{constructor(d){super(d),this.name="DecodingWarning"}}class $i{constructor(){this.refs=new Map,this.refIds=new WeakMap,this.refCount={},this.deletedRefs=new Set,this.callbacks={},this.nextUniqueId=0}getNextUniqueId(){return this.nextUniqueId++}addRef(d,g,v=!0){this.refs.set(d,g),this.refIds.set(g,d),v&&(this.refCount[d]=(this.refCount[d]||0)+1),this.deletedRefs.has(d)&&this.deletedRefs.delete(d)}removeRef(d){const g=this.refCount[d];if(g===void 0){try{throw new _n("trying to remove refId that doesn't exist: "+d)}catch(v){console.warn(v)}return}if(g===0){try{const v=this.refs.get(d);throw new _n(`trying to remove refId '${d}' with 0 refCount (${v.constructor.name}: ${JSON.stringify(v)})`)}catch(v){console.warn(v)}return}(this.refCount[d]=g-1)<=0&&this.deletedRefs.add(d)}clearRefs(){this.refs.clear(),this.deletedRefs.clear(),this.callbacks={},this.refCount={}}garbageCollectDeletedRefs(){this.deletedRefs.forEach(d=>{if(this.refCount[d]>0)return;const g=this.refs.get(d);if(g.constructor[Symbol.metadata]!==void 0){const v=g.constructor[Symbol.metadata];for(const A in v){const H=v[A].name,j=typeof g[H]=="object"&&this.refIds.get(g[H]);j&&!this.deletedRefs.has(j)&&this.removeRef(j)}}else typeof g[f]=="function"&&Array.from(g.values()).forEach(v=>{const A=this.refIds.get(v);this.deletedRefs.has(A)||this.removeRef(A)});this.refs.delete(d),delete this.refCount[d],delete this.callbacks[d]}),this.deletedRefs.clear()}addCallback(d,g,v){if(d===void 0){const A=typeof g=="number"?t.OPERATION[g]:g;throw new Error(`Can't addCallback on '${A}' (refId is undefined)`)}return this.callbacks[d]||(this.callbacks[d]={}),this.callbacks[d][g]||(this.callbacks[d][g]=[]),this.callbacks[d][g].push(v),()=>this.removeCallback(d,g,v)}removeCallback(d,g,v){const A=this.callbacks?.[d]?.[g]?.indexOf(v);A!==void 0&&A!==-1&&St(this.callbacks[d][g],A)}}class mn{constructor(d,g){this.currentRefId=0,this.setState(d),this.context=g||new $e(d.constructor)}setState(d){this.state=d,this.root=new $i,this.root.addRef(0,d)}decode(d,g={offset:0},v=this.state){const A=[],H=this.root,j=d.byteLength;let ue=v.constructor[a];for(this.currentRefId=0;g.offset<j;){if(d[g.offset]==255){g.offset++,v[_]?.();const oe=Ue.number(d,g),ce=H.refs.get(oe);ce?(v=ce,ue=v.constructor[a],this.currentRefId=oe):(console.error(`"refId" not found: ${oe}`,{previousRef:v,previousRefId:this.currentRefId}),console.warn("Please report this issue to the developers."),this.skipCurrentStructure(d,g,j));continue}if(ue(this,d,g,v,A)===xo){console.warn("@colyseus/schema: definition mismatch"),this.skipCurrentStructure(d,g,j);continue}}return v[_]?.(),this.triggerChanges?.(A),H.garbageCollectDeletedRefs(),A}skipCurrentStructure(d,g,v){const A={offset:g.offset};for(;g.offset<v&&!(d[g.offset]===255&&(A.offset=g.offset+1,this.root.refs.has(Ue.number(d,A))));)g.offset++}getInstanceType(d,g,v){let A;if(d[g.offset]===213){g.offset++;const H=Ue.number(d,g);A=this.context.get(H)}return A||v}createInstanceOfType(d){return new d}removeChildRefs(d,g){const v=typeof d[f]!="string",A=this.root.refIds.get(d);d.forEach((H,j)=>{g.push({ref:d,refId:A,op:t.OPERATION.DELETE,field:j,value:void 0,previousValue:H}),v&&this.root.removeRef(this.root.refIds.get(H))})}}class Kn extends at{}yt([Te("string")],Kn.prototype,"name",void 0),yt([Te("string")],Kn.prototype,"type",void 0),yt([Te("number")],Kn.prototype,"referencedType",void 0);class Dt extends at{constructor(){super(...arguments),this.fields=new On}}yt([Te("number")],Dt.prototype,"id",void 0),yt([Te("number")],Dt.prototype,"extendsId",void 0),yt([Te([Kn])],Dt.prototype,"fields",void 0);class Kt extends at{constructor(){super(...arguments),this.types=new On}static encode(d,g={offset:0}){const v=d.context,A=new Kt,H=new Ot(A),j=v.schemas.get(d.state.constructor);j>0&&(A.rootType=j);const ue=new Set,ne={},oe=re=>{if(re.extendsId===void 0||ue.has(re.extendsId)){ue.add(re.id),A.types.push(re);const Le=ne[re.id];Le!==void 0&&(delete ne[re.id],Le.forEach(Pe=>oe(Pe)))}else ne[re.extendsId]===void 0&&(ne[re.extendsId]=[]),ne[re.extendsId].push(re)};v.schemas.forEach((re,Le)=>{const Pe=new Dt;Pe.id=Number(re);const Me=Object.getPrototypeOf(Le);Me!==at&&(Pe.extendsId=v.schemas.get(Me));const ve=Le[Symbol.metadata];if(ve!==Me[Symbol.metadata])for(const ze in ve){const qt=Number(ze),$t=ve[qt].name;if(!Object.prototype.hasOwnProperty.call(ve,$t))continue;const Gn=new Kn;Gn.name=$t;let Zn;const ji=ve[qt];if(typeof ji.type=="string")Zn=ji.type;else{let Eo;at.is(ji.type)?(Zn="ref",Eo=ji.type):(Zn=Object.keys(ji.type)[0],typeof ji.type[Zn]=="string"?Zn+=":"+ji.type[Zn]:Eo=ji.type[Zn]),Gn.referencedType=Eo?v.getTypeId(Eo):-1}Gn.type=Zn,Pe.fields.push(Gn)}oe(Pe)});for(const re in ne)ne[re].forEach(Le=>A.types.push(Le));return H.encodeAll(g).slice(0,g.offset)}static decode(d,g){const v=new Kt;new mn(v).decode(d,g);const H=new $e;v.types.forEach(ne=>{const oe=H.get(ne.extendsId)??at,ce=class extends oe{};$e.register(ce),H.add(ce,ne.id)},{});const j=(ne,oe,ce)=>{oe.fields.forEach((re,Le)=>{const Pe=ce+Le;if(re.referencedType!==void 0){let Me=re.type,ve=H.get(re.referencedType);if(!ve){const ze=re.type.split(":");Me=ze[0],ve=ze[1]}Me==="ref"?ye.addField(ne,Pe,re.name,ve):ye.addField(ne,Pe,re.name,{[Me]:ve})}else ye.addField(ne,Pe,re.name,re.type)})};v.types.forEach(ne=>{const oe=H.get(ne.id),ce=ye.initialize(oe),re=[];let Le=ne;do re.push(Le),Le=v.types.find(Me=>Me.id===Le.extendsId);while(Le);let Pe=0;re.reverse().forEach(Me=>{j(ce,Me,Pe),Pe+=Me.fields.length})});const ue=new(H.get(v.rootType||0));return new mn(ue,H)}}yt([Te([Dt])],Kt.prototype,"types",void 0),yt([Te("number")],Kt.prototype,"rootType",void 0);function Fn(I){const d=I.root,g=d.callbacks,v=new WeakMap;let A;I.triggerChanges=function(ue){const ne=new Set;for(let oe=0,ce=ue.length;oe<ce;oe++){const re=ue[oe],Le=re.refId,Pe=re.ref,Me=g[Le];if(Me){if((re.op&t.OPERATION.DELETE)===t.OPERATION.DELETE&&re.previousValue instanceof at){const ve=g[d.refIds.get(re.previousValue)]?.[t.OPERATION.DELETE];for(let ze=ve?.length-1;ze>=0;ze--)ve[ze]()}if(Pe instanceof at){if(!ne.has(Le)){const ve=Me?.[t.OPERATION.REPLACE];for(let ze=ve?.length-1;ze>=0;ze--)ve[ze]()}if(Me.hasOwnProperty(re.field)){const ve=Me[re.field];for(let ze=ve?.length-1;ze>=0;ze--)ve[ze](re.value,re.previousValue)}}else{if((re.op&t.OPERATION.DELETE)===t.OPERATION.DELETE){if(re.previousValue!==void 0){const ve=Me[t.OPERATION.DELETE];for(let ze=ve?.length-1;ze>=0;ze--)ve[ze](re.previousValue,re.dynamicIndex??re.field)}if((re.op&t.OPERATION.ADD)===t.OPERATION.ADD){const ve=Me[t.OPERATION.ADD];for(let ze=ve?.length-1;ze>=0;ze--)ve[ze](re.value,re.dynamicIndex??re.field)}}else if((re.op&t.OPERATION.ADD)===t.OPERATION.ADD&&re.previousValue!==re.value){const ve=Me[t.OPERATION.ADD];for(let ze=ve?.length-1;ze>=0;ze--)ve[ze](re.value,re.dynamicIndex??re.field)}if(re.value!==re.previousValue&&(re.value!==void 0||re.previousValue!==void 0)){const ve=Me[t.OPERATION.REPLACE];for(let ze=ve?.length-1;ze>=0;ze--)ve[ze](re.value,re.dynamicIndex??re.field)}}ne.add(Le)}}};function H(ue,ne){let oe=ne.instance?.constructor[Symbol.metadata]||ue,ce=ne.instance&&typeof ne.instance.forEach=="function"||ue&&typeof ue[Symbol.metadata]>"u";if(oe&&!ce){const re=function(Le,Pe,Me,ve){return ve&&ne.instance[Pe]!==void 0&&!v.has(A)&&Me(ne.instance[Pe],void 0),d.addCallback(d.refIds.get(Le),Pe,Me)};return new Proxy({listen:function(Pe,Me,ve=!0){if(ne.instance)return re(ne.instance,Pe,Me,ve);{let ze=()=>{};return ne.onInstanceAvailable((qt,$t)=>{ze=re(qt,Pe,Me,ve&&$t&&!v.has(A))}),()=>ze()}},onChange:function(Pe){return d.addCallback(d.refIds.get(ne.instance),t.OPERATION.REPLACE,Pe)},bindTo:function(Pe,Me){return Me||(Me=Object.keys(oe).map(ve=>oe[ve].name)),d.addCallback(d.refIds.get(ne.instance),t.OPERATION.REPLACE,()=>{Me.forEach(ve=>Pe[ve]=ne.instance[ve])})}},{get(Le,Pe){const Me=oe[oe[Pe]];if(Me){const ve=ne.instance?.[Pe],ze=(qt=>{const $t=j(ne.instance).listen(Pe,(Gn,Zn)=>{qt(Gn,!1),$t?.()},!1);d.refIds.get(ve)!==void 0&&qt(ve,!0)});return H(Me.type,{instance:d.refIds.get(ve)&&ve,parentInstance:ne.instance,onInstanceAvailable:ze})}else return Le[Pe]},has(Le,Pe){return oe[Pe]!==void 0},set(Le,Pe,Me){throw new Error("not allowed")},deleteProperty(Le,Pe){throw new Error("not allowed")}})}else{const re=function(Me,ve,ze){return ze&&Me.forEach((qt,$t)=>ve(qt,$t)),d.addCallback(d.refIds.get(Me),t.OPERATION.ADD,(qt,$t)=>{v.set(ve,!0),A=ve,ve(qt,$t),v.delete(ve),A=void 0})},Le=function(Me,ve){return d.addCallback(d.refIds.get(Me),t.OPERATION.DELETE,ve)},Pe=function(Me,ve){return d.addCallback(d.refIds.get(Me),t.OPERATION.REPLACE,ve)};return new Proxy({onAdd:function(Me,ve=!0){if(ne.instance)return re(ne.instance,Me,ve&&!v.has(A));if(ne.onInstanceAvailable){let ze=()=>{};return ne.onInstanceAvailable((qt,$t)=>{ze=re(qt,Me,ve&&$t&&!v.has(A))}),()=>ze()}},onRemove:function(Me){if(ne.instance)return Le(ne.instance,Me);if(ne.onInstanceAvailable){let ve=()=>{};return ne.onInstanceAvailable(ze=>{ve=Le(ze,Me)}),()=>ve()}},onChange:function(Me){if(ne.instance)return Pe(ne.instance,Me);if(ne.onInstanceAvailable){let ve=()=>{};return ne.onInstanceAvailable(ze=>{ve=Pe(ze,Me)}),()=>ve()}}},{get(Me,ve){if(!Me[ve])throw new Error(`Can't access '${ve}' through callback proxy. access the instance directly.`);return Me[ve]},has(Me,ve){return Me[ve]!==void 0},set(Me,ve,ze){throw new Error("not allowed")},deleteProperty(Me,ve){throw new Error("not allowed")}})}}function j(ue){return H(void 0,{instance:ue})}return j}function gn(I,d){I.triggerChanges=d}class yn{constructor(d=!1){this.iterable=d,this.visible=new WeakSet,this.invisible=new WeakSet,this.changes=new Map,d&&(this.items=[])}add(d,g=ie,v=!0){const A=d?.[u],H=A.parent;if(A){if(!H&&A.refId!==0)throw new Error(`Cannot add a detached instance to the StateView. Make sure to assign the "${A.ref.constructor.name}" instance to the state before calling view.add()`)}else return console.warn("StateView#add(), invalid object:",d),!1;const j=d.constructor[Symbol.metadata];this.visible.add(A),this.iterable&&v&&this.items.push(d),v&&H&&this.addParentOf(A,g);let ue=this.changes.get(A.refId);ue===void 0&&(ue={},this.changes.set(A.refId,ue));let ne=!1;if(A.forEachChild((oe,ce)=>{j&&j[ce].tag!==void 0&&j[ce].tag!==g||this.add(oe.ref,g,!1)&&(ne=!0)}),g!==ie){this.tags||(this.tags=new WeakMap);let oe;this.tags.has(A)?oe=this.tags.get(A):(oe=new Set,this.tags.set(A,oe)),oe.add(g),j?.[b]?.[g]?.forEach(ce=>{A.getChange(ce)!==t.OPERATION.DELETE&&(ue[ce]=t.OPERATION.ADD)})}else if(!A.isNew||ne){const oe=A.filteredChanges!==void 0?A.allFilteredChanges:A.allChanges,ce=this.invisible.has(A);for(let re=0,Le=oe.operations.length;re<Le;re++){const Pe=oe.operations[re];if(Pe===void 0)continue;const Me=A.indexedOperations[Pe]??t.OPERATION.ADD,ve=j?.[Pe].tag;Me!==t.OPERATION.DELETE&&(ce||ve===void 0||ve===g)&&(ue[Pe]=Me,ne=!0)}}return ne}addParentOf(d,g){const v=d.parent[u],A=d.parentIndex;if(!this.visible.has(v)){this.visible.add(v);const H=v.parent?.[u];H&&H.filteredChanges!==void 0&&this.addParentOf(v,g)}if(v.getChange(A)!==t.OPERATION.DELETE){let H=this.changes.get(v.refId);H===void 0&&(H={},this.changes.set(v.refId,H)),this.tags||(this.tags=new WeakMap);let j;this.tags.has(v)?j=this.tags.get(v):(j=new Set,this.tags.set(v,j)),j.add(g),H[A]=t.OPERATION.ADD}}remove(d,g=ie,v=!1){const A=d[u];if(!A)return console.warn("StateView#remove(), invalid object:",d),this;this.visible.delete(A),this.iterable&&!v&&St(this.items,this.items.indexOf(d));const j=A.ref.constructor[Symbol.metadata];let ue=this.changes.get(A.refId);if(ue===void 0&&(ue={},this.changes.set(A.refId,ue)),g===ie){const ne=A.parent;if(ne&&!ye.isValidInstance(ne)&&A.isFiltered){const oe=ne[u];let ce=this.changes.get(oe.refId);ce===void 0?(ce={},this.changes.set(oe.refId,ce)):ce[A.parentIndex]===t.OPERATION.ADD&&this.changes.delete(A.refId),ce[A.parentIndex]=t.OPERATION.DELETE,this._recursiveDeleteVisibleChangeTree(A)}else j?.[S]?.forEach(oe=>ue[oe]=t.OPERATION.DELETE)}else j?.[b][g].forEach(ne=>ue[ne]=t.OPERATION.DELETE);if(this.tags&&this.tags.has(A)){const ne=this.tags.get(A);g===void 0?this.tags.delete(A):(ne.delete(g),ne.size===0&&this.tags.delete(A))}return this}has(d){return this.visible.has(d[u])}hasTag(d,g=ie){return this.tags?.get(d[u])?.has(g)??!1}clear(){if(!this.iterable)throw new Error("StateView#clear() is only available for iterable StateView's. Use StateView(iterable: true) constructor.");for(let d=0,g=this.items.length;d<g;d++)this.remove(this.items[d],ie,!0);this.items.length=0}isChangeTreeVisible(d){let g=this.visible.has(d);return!g&&d.isVisibilitySharedWithParent&&this.visible.has(d.parent[u])&&(this.visible.add(d),g=!0),g}_recursiveDeleteVisibleChangeTree(d){d.forEachChild(g=>{this.visible.delete(g),this._recursiveDeleteVisibleChangeTree(g)})}}We("map",{constructor:ri}),We("array",{constructor:On}),We("set",{constructor:se}),We("collection",{constructor:qi}),t.$changes=u,t.$childType=f,t.$decoder=a,t.$deleteByIndex=h,t.$encoder=o,t.$filter=c,t.$getByIndex=l,t.$track=r,t.ArraySchema=On,t.ChangeTree=Qe,t.CollectionSchema=qi,t.Decoder=mn,t.Encoder=Ot,t.MapSchema=ri,t.Metadata=ye,t.Reflection=Kt,t.ReflectionField=Kn,t.ReflectionType=Dt,t.Schema=at,t.SetSchema=se,t.StateView=yn,t.TypeContext=$e,t.decode=Ue,t.decodeKeyValueOperation=jn,t.decodeSchemaOperation=Cr,t.defineCustomTypes=Ne,t.defineTypes=et,t.deprecated=Fe,t.dumpChanges=gt,t.encode=Ae,t.encodeArray=Nn,t.encodeKeyValueOperation=Rn,t.encodeSchemaOperation=Ct,t.entity=J,t.getDecoderStateCallbacks=Fn,t.getRawChangesCallback=gn,t.registerType=We,t.schema=nt,t.type=Te,t.view=we}))})(Qr,Qr.exports)),Qr.exports}var Xf;function aw(){if(Xf)return rl;Xf=1;var i=Qa,e=Zu();class t{constructor(s){this.events=s,this.isOpen=!1,this.lengthPrefixBuffer=new Uint8Array(9)}connect(s,r={}){const o=r.fingerprint&&{serverCertificateHashes:[{algorithm:"sha-256",value:new Uint8Array(r.fingerprint).buffer}]}||void 0;this.wt=new WebTransport(s,o),this.wt.ready.then(a=>{console.log("WebTransport ready!",a),this.isOpen=!0,this.unreliableReader=this.wt.datagrams.readable.getReader(),this.unreliableWriter=this.wt.datagrams.writable.getWriter(),this.wt.incomingBidirectionalStreams.getReader().read().then(l=>{this.reader=l.value.readable.getReader(),this.writer=l.value.writable.getWriter(),this.sendSeatReservation(r.room.roomId,r.sessionId,r.reconnectionToken),this.readIncomingData(),this.readIncomingUnreliableData()}).catch(l=>{console.error("failed to read incoming stream",l),console.error("TODO: close the connection")})}).catch(a=>{console.log("WebTransport not ready!",a),this._close()}),this.wt.closed.then(a=>{console.log("WebTransport closed w/ success",a),this.events.onclose({code:a.closeCode,reason:a.reason})}).catch(a=>{console.log("WebTransport closed w/ error",a),this.events.onerror(a),this.events.onclose({code:a.closeCode,reason:a.reason})}).finally(()=>{this._close()})}send(s){const r=e.encode.number(this.lengthPrefixBuffer,s.length,{offset:0}),o=new Uint8Array(r+s.length);o.set(this.lengthPrefixBuffer.subarray(0,r),0),o.set(s,r),this.writer.write(o)}sendUnreliable(s){const r=e.encode.number(this.lengthPrefixBuffer,s.length,{offset:0}),o=new Uint8Array(r+s.length);o.set(this.lengthPrefixBuffer.subarray(0,r),0),o.set(s,r),this.unreliableWriter.write(o)}close(s,r){try{this.wt.close({closeCode:s,reason:r})}catch(o){console.error(o)}}readIncomingData(){return i.__awaiter(this,void 0,void 0,function*(){let s;for(;this.isOpen;){try{s=yield this.reader.read();const r=s.value,o={offset:0};do{const a=e.decode.number(r,o);this.events.onmessage({data:r.subarray(o.offset,o.offset+a)}),o.offset+=a}while(o.offset<r.length)}catch(r){r.message.indexOf("session is closed")===-1&&console.error("H3Transport: failed to read incoming data",r);break}if(s.done)break}})}readIncomingUnreliableData(){return i.__awaiter(this,void 0,void 0,function*(){let s;for(;this.isOpen;){try{s=yield this.unreliableReader.read();const r=s.value,o={offset:0};do{const a=e.decode.number(r,o);this.events.onmessage({data:r.subarray(o.offset,o.offset+a)}),o.offset+=a}while(o.offset<r.length)}catch(r){r.message.indexOf("session is closed")===-1&&console.error("H3Transport: failed to read incoming data",r);break}if(s.done)break}})}sendSeatReservation(s,r,o){const a={offset:0},c=[];e.encode.string(c,s,a),e.encode.string(c,r,a),o&&e.encode.string(c,o,a),this.writer.write(new Uint8Array(c).buffer)}_close(){this.isOpen=!1}}return rl.H3TransportTransport=t,rl}var ol={},al,qf;function cw(){return qf||(qf=1,al=function(){throw new Error("ws does not work in the browser. Browser clients must use the native WebSocket object")}),al}var $f;function lw(){if($f)return ol;$f=1;var i=cw();const e=globalThis.WebSocket||i;let t=class{constructor(s){this.events=s}send(s){this.ws.send(s)}sendUnreliable(s){console.warn("colyseus.js: The WebSocket transport does not support unreliable messages")}connect(s,r){try{this.ws=new e(s,{headers:r,protocols:this.protocols})}catch{this.ws=new e(s,this.protocols)}this.ws.binaryType="arraybuffer",this.ws.onopen=this.events.onopen,this.ws.onmessage=this.events.onmessage,this.ws.onclose=this.events.onclose,this.ws.onerror=this.events.onerror}close(s,r){this.ws.close(s,r)}get isOpen(){return this.ws.readyState===e.OPEN}};return ol.WebSocketTransport=t,ol}var Yf;function uw(){if(Yf)return sl;Yf=1;var i=aw(),e=lw();let t=class{constructor(s){this.events={},s==="h3"?this.transport=new i.H3TransportTransport(this.events):this.transport=new e.WebSocketTransport(this.events)}connect(s,r){this.transport.connect.call(this.transport,s,r)}send(s){this.transport.send(s)}sendUnreliable(s){this.transport.sendUnreliable(s)}close(s,r){this.transport.close(s,r)}get isOpen(){return this.transport.isOpen}};return sl.Connection=t,sl}var cl={},jf;function i0(){return jf||(jf=1,(function(i){i.Protocol=void 0,(function(e){e[e.HANDSHAKE=9]="HANDSHAKE",e[e.JOIN_ROOM=10]="JOIN_ROOM",e[e.ERROR=11]="ERROR",e[e.LEAVE_ROOM=12]="LEAVE_ROOM",e[e.ROOM_DATA=13]="ROOM_DATA",e[e.ROOM_STATE=14]="ROOM_STATE",e[e.ROOM_STATE_PATCH=15]="ROOM_STATE_PATCH",e[e.ROOM_DATA_SCHEMA=16]="ROOM_DATA_SCHEMA",e[e.ROOM_DATA_BYTES=17]="ROOM_DATA_BYTES"})(i.Protocol||(i.Protocol={})),i.ErrorCode=void 0,(function(e){e[e.MATCHMAKE_NO_HANDLER=4210]="MATCHMAKE_NO_HANDLER",e[e.MATCHMAKE_INVALID_CRITERIA=4211]="MATCHMAKE_INVALID_CRITERIA",e[e.MATCHMAKE_INVALID_ROOM_ID=4212]="MATCHMAKE_INVALID_ROOM_ID",e[e.MATCHMAKE_UNHANDLED=4213]="MATCHMAKE_UNHANDLED",e[e.MATCHMAKE_EXPIRED=4214]="MATCHMAKE_EXPIRED",e[e.AUTH_FAILED=4215]="AUTH_FAILED",e[e.APPLICATION_ERROR=4216]="APPLICATION_ERROR"})(i.ErrorCode||(i.ErrorCode={}))})(cl)),cl}var ga={},Kf;function s0(){if(Kf)return ga;Kf=1;const i={};function e(n,s){i[n]=s}function t(n){const s=i[n];if(!s)throw new Error("missing serializer: "+n);return s}return ga.getSerializer=t,ga.registerSerializer=e,ga}var ll={},Zf;function r0(){if(Zf)return ll;Zf=1;const i=()=>({emit(e,...t){let n=this.events[e]||[];for(let s=0,r=n.length;s<r;s++)n[s](...t)},events:{},on(e,t){var n;return!((n=this.events[e])===null||n===void 0)&&n.push(t)||(this.events[e]=[t]),()=>{var s;this.events[e]=(s=this.events[e])===null||s===void 0?void 0:s.filter(r=>t!==r)}}});return ll.createNanoEvents=i,ll}var xa={},Jf;function hw(){if(Jf)return xa;Jf=1;class i{constructor(){this.handlers=[]}register(n,s=!1){return this.handlers.push(n),this}invoke(...n){this.handlers.forEach(s=>s.apply(this,n))}invokeAsync(...n){return Promise.all(this.handlers.map(s=>s.apply(this,n)))}remove(n){const s=this.handlers.indexOf(n);this.handlers[s]=this.handlers[this.handlers.length-1],this.handlers.pop()}clear(){this.handlers=[]}}function e(){const t=new i;function n(s){return t.register(s,this===null)}return n.once=s=>{const r=function(...o){s.apply(this,o),t.remove(r)};t.register(r)},n.remove=s=>t.remove(s),n.invoke=(...s)=>t.invoke(...s),n.invokeAsync=(...s)=>t.invokeAsync(...s),n.clear=()=>t.clear(),n}return xa.EventEmitter=i,xa.createSignal=e,xa}var _a={},Qf;function o0(){if(Qf)return _a;Qf=1;var i=Zu();function e(n){try{return i.getDecoderStateCallbacks(n.serializer.decoder)}catch{return}}let t=class{setState(s,r){this.decoder.decode(s,r)}getState(){return this.state}patch(s,r){return this.decoder.decode(s,r)}teardown(){this.decoder.root.clearRefs()}handshake(s,r){this.state?(i.Reflection.decode(s,r),this.decoder=new i.Decoder(this.state)):(this.decoder=i.Reflection.decode(s,r),this.state=this.decoder.state)}};return _a.SchemaSerializer=t,_a.getStateCallbacks=e,_a}var bu;try{bu=new TextDecoder}catch{}var De,vi,Y=0,zt={},bt,hs,ei=0,xi=0,un,Hi,En=[],vt,ed={useRecords:!1,mapsAsObjects:!0};class a0{}const Ju=new a0;Ju.name="MessagePack 0xC1";var ps=!1,c0=2,fw;try{new Function("")}catch{c0=1/0}class gs{constructor(e){e&&(e.useRecords===!1&&e.mapsAsObjects===void 0&&(e.mapsAsObjects=!0),e.sequential&&e.trusted!==!1&&(e.trusted=!0,!e.structures&&e.useRecords!=!1&&(e.structures=[],e.maxSharedStructures||(e.maxSharedStructures=0))),e.structures?e.structures.sharedLength=e.structures.length:e.getStructures&&((e.structures=[]).uninitialized=!0,e.structures.sharedLength=0),e.int64AsNumber&&(e.int64AsType="number")),Object.assign(this,e)}unpack(e,t){if(De)return p0(()=>(Va(),this?this.unpack(e,t):gs.prototype.unpack.call(ed,e,t)));!e.buffer&&e.constructor===ArrayBuffer&&(e=typeof Buffer<"u"?Buffer.from(e):new Uint8Array(e)),typeof t=="object"?(vi=t.end||e.length,Y=t.start||0):(Y=0,vi=t>-1?t:e.length),xi=0,hs=null,un=null,De=e;try{vt=e.dataView||(e.dataView=new DataView(e.buffer,e.byteOffset,e.byteLength))}catch(n){throw De=null,e instanceof Uint8Array?n:new Error("Source must be a Uint8Array or Buffer but was a "+(e&&typeof e=="object"?e.constructor.name:typeof e))}if(this instanceof gs){if(zt=this,this.structures)return bt=this.structures,ya(t);(!bt||bt.length>0)&&(bt=[])}else zt=ed,(!bt||bt.length>0)&&(bt=[]);return ya(t)}unpackMultiple(e,t){let n,s=0;try{ps=!0;let r=e.length,o=this?this.unpack(e,r):nc.unpack(e,r);if(t){if(t(o,s,Y)===!1)return;for(;Y<r;)if(s=Y,t(ya(),s,Y)===!1)return}else{for(n=[o];Y<r;)s=Y,n.push(ya());return n}}catch(r){throw r.lastPosition=s,r.values=n,r}finally{ps=!1,Va()}}_mergeStructures(e,t){e=e||[],Object.isFrozen(e)&&(e=e.map(n=>n.slice(0)));for(let n=0,s=e.length;n<s;n++){let r=e[n];r&&(r.isShared=!0,n>=32&&(r.highByte=n-32>>5))}e.sharedLength=e.length;for(let n in t||[])if(n>=0){let s=e[n],r=t[n];r&&(s&&((e.restoreStructures||(e.restoreStructures=[]))[n]=s),e[n]=r)}return this.structures=e}decode(e,t){return this.unpack(e,t)}}function ya(i){try{if(!zt.trusted&&!ps){let t=bt.sharedLength||0;t<bt.length&&(bt.length=t)}let e;if(zt.randomAccessStructure&&De[Y]<64&&De[Y]>=32&&fw||(e=Qt()),un&&(Y=un.postBundlePosition,un=null),ps&&(bt.restoreStructures=null),Y==vi)bt&&bt.restoreStructures&&td(),bt=null,De=null,Hi&&(Hi=null);else{if(Y>vi)throw new Error("Unexpected end of MessagePack data");if(!ps){let t;try{t=JSON.stringify(e,(n,s)=>typeof s=="bigint"?`${s}n`:s).slice(0,100)}catch(n){t="(JSON view not available "+n+")"}throw new Error("Data read, but end of buffer not reached "+t)}}return e}catch(e){throw bt&&bt.restoreStructures&&td(),Va(),(e instanceof RangeError||e.message.startsWith("Unexpected end of buffer")||Y>vi)&&(e.incomplete=!0),e}}function td(){for(let i in bt.restoreStructures)bt[i]=bt.restoreStructures[i];bt.restoreStructures=null}function Qt(){let i=De[Y++];if(i<160)if(i<128){if(i<64)return i;{let e=bt[i&63]||zt.getStructures&&l0()[i&63];return e?(e.read||(e.read=Qu(e,i&63)),e.read()):i}}else if(i<144)if(i-=128,zt.mapsAsObjects){let e={};for(let t=0;t<i;t++){let n=h0();n==="__proto__"&&(n="__proto_"),e[n]=Qt()}return e}else{let e=new Map;for(let t=0;t<i;t++)e.set(Qt(),Qt());return e}else{i-=144;let e=new Array(i);for(let t=0;t<i;t++)e[t]=Qt();return zt.freezeData?Object.freeze(e):e}else if(i<192){let e=i-160;if(xi>=Y)return hs.slice(Y-ei,(Y+=e)-ei);if(xi==0&&vi<140){let t=e<16?eh(e):u0(e);if(t!=null)return t}return wu(e)}else{let e;switch(i){case 192:return null;case 193:return un?(e=Qt(),e>0?un[1].slice(un.position1,un.position1+=e):un[0].slice(un.position0,un.position0-=e)):Ju;case 194:return!1;case 195:return!0;case 196:if(e=De[Y++],e===void 0)throw new Error("Unexpected end of buffer");return ul(e);case 197:return e=vt.getUint16(Y),Y+=2,ul(e);case 198:return e=vt.getUint32(Y),Y+=4,ul(e);case 199:return Rs(De[Y++]);case 200:return e=vt.getUint16(Y),Y+=2,Rs(e);case 201:return e=vt.getUint32(Y),Y+=4,Rs(e);case 202:if(e=vt.getFloat32(Y),zt.useFloat32>2){let t=tc[(De[Y]&127)<<1|De[Y+1]>>7];return Y+=4,(t*e+(e>0?.5:-.5)>>0)/t}return Y+=4,e;case 203:return e=vt.getFloat64(Y),Y+=8,e;case 204:return De[Y++];case 205:return e=vt.getUint16(Y),Y+=2,e;case 206:return e=vt.getUint32(Y),Y+=4,e;case 207:return zt.int64AsType==="number"?(e=vt.getUint32(Y)*4294967296,e+=vt.getUint32(Y+4)):zt.int64AsType==="string"?e=vt.getBigUint64(Y).toString():zt.int64AsType==="auto"?(e=vt.getBigUint64(Y),e<=BigInt(2)<<BigInt(52)&&(e=Number(e))):e=vt.getBigUint64(Y),Y+=8,e;case 208:return vt.getInt8(Y++);case 209:return e=vt.getInt16(Y),Y+=2,e;case 210:return e=vt.getInt32(Y),Y+=4,e;case 211:return zt.int64AsType==="number"?(e=vt.getInt32(Y)*4294967296,e+=vt.getUint32(Y+4)):zt.int64AsType==="string"?e=vt.getBigInt64(Y).toString():zt.int64AsType==="auto"?(e=vt.getBigInt64(Y),e>=BigInt(-2)<<BigInt(52)&&e<=BigInt(2)<<BigInt(52)&&(e=Number(e))):e=vt.getBigInt64(Y),Y+=8,e;case 212:if(e=De[Y++],e==114)return ad(De[Y++]&63);{let t=En[e];if(t)return t.read?(Y++,t.read(Qt())):t.noBuffer?(Y++,t()):t(De.subarray(Y,++Y));throw new Error("Unknown extension "+e)}case 213:return e=De[Y],e==114?(Y++,ad(De[Y++]&63,De[Y++])):Rs(2);case 214:return Rs(4);case 215:return Rs(8);case 216:return Rs(16);case 217:return e=De[Y++],xi>=Y?hs.slice(Y-ei,(Y+=e)-ei):pw(e);case 218:return e=vt.getUint16(Y),Y+=2,xi>=Y?hs.slice(Y-ei,(Y+=e)-ei):mw(e);case 219:return e=vt.getUint32(Y),Y+=4,xi>=Y?hs.slice(Y-ei,(Y+=e)-ei):gw(e);case 220:return e=vt.getUint16(Y),Y+=2,id(e);case 221:return e=vt.getUint32(Y),Y+=4,id(e);case 222:return e=vt.getUint16(Y),Y+=2,sd(e);case 223:return e=vt.getUint32(Y),Y+=4,sd(e);default:if(i>=224)return i-256;if(i===void 0){let t=new Error("Unexpected end of MessagePack data");throw t.incomplete=!0,t}throw new Error("Unknown MessagePack token "+i)}}}const dw=/^[a-zA-Z_$][a-zA-Z\d_$]*$/;function Qu(i,e){function t(){if(t.count++>c0){let s=i.read=new Function("r","return function(){return "+(zt.freezeData?"Object.freeze":"")+"({"+i.map(r=>r==="__proto__"?"__proto_:r()":dw.test(r)?r+":r()":"["+JSON.stringify(r)+"]:r()").join(",")+"})}")(Qt);return i.highByte===0&&(i.read=nd(e,i.read)),s()}let n={};for(let s=0,r=i.length;s<r;s++){let o=i[s];o==="__proto__"&&(o="__proto_"),n[o]=Qt()}return zt.freezeData?Object.freeze(n):n}return t.count=0,i.highByte===0?nd(e,t):t}const nd=(i,e)=>function(){let t=De[Y++];if(t===0)return e();let n=i<32?-(i+(t<<5)):i+(t<<5),s=bt[n]||l0()[n];if(!s)throw new Error("Record id is not defined for "+n);return s.read||(s.read=Qu(s,i)),s.read()};function l0(){let i=p0(()=>(De=null,zt.getStructures()));return bt=zt._mergeStructures(i,bt)}var wu=po,pw=po,mw=po,gw=po;let xw=!1;function po(i){let e;if(i<16&&(e=eh(i)))return e;if(i>64&&bu)return bu.decode(De.subarray(Y,Y+=i));const t=Y+i,n=[];for(e="";Y<t;){const s=De[Y++];if((s&128)===0)n.push(s);else if((s&224)===192){const r=De[Y++]&63;n.push((s&31)<<6|r)}else if((s&240)===224){const r=De[Y++]&63,o=De[Y++]&63;n.push((s&31)<<12|r<<6|o)}else if((s&248)===240){const r=De[Y++]&63,o=De[Y++]&63,a=De[Y++]&63;let c=(s&7)<<18|r<<12|o<<6|a;c>65535&&(c-=65536,n.push(c>>>10&1023|55296),c=56320|c&1023),n.push(c)}else n.push(s);n.length>=4096&&(e+=ln.apply(String,n),n.length=0)}return n.length>0&&(e+=ln.apply(String,n)),e}function id(i){let e=new Array(i);for(let t=0;t<i;t++)e[t]=Qt();return zt.freezeData?Object.freeze(e):e}function sd(i){if(zt.mapsAsObjects){let e={};for(let t=0;t<i;t++){let n=h0();n==="__proto__"&&(n="__proto_"),e[n]=Qt()}return e}else{let e=new Map;for(let t=0;t<i;t++)e.set(Qt(),Qt());return e}}var ln=String.fromCharCode;function u0(i){let e=Y,t=new Array(i);for(let n=0;n<i;n++){const s=De[Y++];if((s&128)>0){Y=e;return}t[n]=s}return ln.apply(String,t)}function eh(i){if(i<4)if(i<2){if(i===0)return"";{let e=De[Y++];if((e&128)>1){Y-=1;return}return ln(e)}}else{let e=De[Y++],t=De[Y++];if((e&128)>0||(t&128)>0){Y-=2;return}if(i<3)return ln(e,t);let n=De[Y++];if((n&128)>0){Y-=3;return}return ln(e,t,n)}else{let e=De[Y++],t=De[Y++],n=De[Y++],s=De[Y++];if((e&128)>0||(t&128)>0||(n&128)>0||(s&128)>0){Y-=4;return}if(i<6){if(i===4)return ln(e,t,n,s);{let r=De[Y++];if((r&128)>0){Y-=5;return}return ln(e,t,n,s,r)}}else if(i<8){let r=De[Y++],o=De[Y++];if((r&128)>0||(o&128)>0){Y-=6;return}if(i<7)return ln(e,t,n,s,r,o);let a=De[Y++];if((a&128)>0){Y-=7;return}return ln(e,t,n,s,r,o,a)}else{let r=De[Y++],o=De[Y++],a=De[Y++],c=De[Y++];if((r&128)>0||(o&128)>0||(a&128)>0||(c&128)>0){Y-=8;return}if(i<10){if(i===8)return ln(e,t,n,s,r,o,a,c);{let l=De[Y++];if((l&128)>0){Y-=9;return}return ln(e,t,n,s,r,o,a,c,l)}}else if(i<12){let l=De[Y++],h=De[Y++];if((l&128)>0||(h&128)>0){Y-=10;return}if(i<11)return ln(e,t,n,s,r,o,a,c,l,h);let u=De[Y++];if((u&128)>0){Y-=11;return}return ln(e,t,n,s,r,o,a,c,l,h,u)}else{let l=De[Y++],h=De[Y++],u=De[Y++],f=De[Y++];if((l&128)>0||(h&128)>0||(u&128)>0||(f&128)>0){Y-=12;return}if(i<14){if(i===12)return ln(e,t,n,s,r,o,a,c,l,h,u,f);{let p=De[Y++];if((p&128)>0){Y-=13;return}return ln(e,t,n,s,r,o,a,c,l,h,u,f,p)}}else{let p=De[Y++],_=De[Y++];if((p&128)>0||(_&128)>0){Y-=14;return}if(i<15)return ln(e,t,n,s,r,o,a,c,l,h,u,f,p,_);let y=De[Y++];if((y&128)>0){Y-=15;return}return ln(e,t,n,s,r,o,a,c,l,h,u,f,p,_,y)}}}}}function rd(){let i=De[Y++],e;if(i<192)e=i-160;else switch(i){case 217:e=De[Y++];break;case 218:e=vt.getUint16(Y),Y+=2;break;case 219:e=vt.getUint32(Y),Y+=4;break;default:throw new Error("Expected string")}return po(e)}function ul(i){return zt.copyBuffers?Uint8Array.prototype.slice.call(De,Y,Y+=i):De.subarray(Y,Y+=i)}function Rs(i){let e=De[Y++];if(En[e]){let t;return En[e](De.subarray(Y,t=Y+=i),n=>{Y=n;try{return Qt()}finally{Y=t}})}else throw new Error("Unknown extension type "+e)}var od=new Array(4096);function h0(){let i=De[Y++];if(i>=160&&i<192){if(i=i-160,xi>=Y)return hs.slice(Y-ei,(Y+=i)-ei);if(!(xi==0&&vi<180))return wu(i)}else return Y--,f0(Qt());let e=(i<<5^(i>1?vt.getUint16(Y):i>0?De[Y]:0))&4095,t=od[e],n=Y,s=Y+i-3,r,o=0;if(t&&t.bytes==i){for(;n<s;){if(r=vt.getUint32(n),r!=t[o++]){n=1879048192;break}n+=4}for(s+=3;n<s;)if(r=De[n++],r!=t[o++]){n=1879048192;break}if(n===s)return Y=n,t.string;s-=3,n=Y}for(t=[],od[e]=t,t.bytes=i;n<s;)r=vt.getUint32(n),t.push(r),n+=4;for(s+=3;n<s;)r=De[n++],t.push(r);let a=i<16?eh(i):u0(i);return a!=null?t.string=a:t.string=wu(i)}function f0(i){if(typeof i=="string")return i;if(typeof i=="number"||typeof i=="boolean"||typeof i=="bigint")return i.toString();if(i==null)return i+"";if(zt.allowArraysInMapKeys&&Array.isArray(i)&&i.flat().every(e=>["string","number","boolean","bigint"].includes(typeof e)))return i.flat().toString();throw new Error(`Invalid property type for record: ${typeof i}`)}const ad=(i,e)=>{let t=Qt().map(f0),n=i;e!==void 0&&(i=i<32?-((e<<5)+i):(e<<5)+i,t.highByte=e);let s=bt[i];return s&&(s.isShared||ps)&&((bt.restoreStructures||(bt.restoreStructures=[]))[i]=s),bt[i]=t,t.read=Qu(t,n),t.read()};En[0]=()=>{};En[0].noBuffer=!0;En[66]=i=>{let e=i.length,t=BigInt(i[0]&128?i[0]-256:i[0]);for(let n=1;n<e;n++)t<<=BigInt(8),t+=BigInt(i[n]);return t};let _w={Error,TypeError,ReferenceError};En[101]=()=>{let i=Qt();return(_w[i[0]]||Error)(i[1],{cause:i[2]})};En[105]=i=>{if(zt.structuredClone===!1)throw new Error("Structured clone extension is disabled");let e=vt.getUint32(Y-4);Hi||(Hi=new Map);let t=De[Y],n;t>=144&&t<160||t==220||t==221?n=[]:n={};let s={target:n};Hi.set(e,s);let r=Qt();return s.used?Object.assign(n,r):(s.target=r,r)};En[112]=i=>{if(zt.structuredClone===!1)throw new Error("Structured clone extension is disabled");let e=vt.getUint32(Y-4),t=Hi.get(e);return t.used=!0,t.target};En[115]=()=>new Set(Qt());const d0=["Int8","Uint8","Uint8Clamped","Int16","Uint16","Int32","Uint32","Float32","Float64","BigInt64","BigUint64"].map(i=>i+"Array");let yw=typeof globalThis=="object"?globalThis:window;En[116]=i=>{let e=i[0],t=d0[e];if(!t){if(e===16){let n=new ArrayBuffer(i.length-1);return new Uint8Array(n).set(i.subarray(1)),n}throw new Error("Could not find typed array for code "+e)}return new yw[t](Uint8Array.prototype.slice.call(i,1).buffer)};En[120]=()=>{let i=Qt();return new RegExp(i[0],i[1])};const vw=[];En[98]=i=>{let e=(i[0]<<24)+(i[1]<<16)+(i[2]<<8)+i[3],t=Y;return Y+=e-i.length,un=vw,un=[rd(),rd()],un.position0=0,un.position1=0,un.postBundlePosition=Y,Y=t,Qt()};En[255]=i=>i.length==4?new Date((i[0]*16777216+(i[1]<<16)+(i[2]<<8)+i[3])*1e3):i.length==8?new Date(((i[0]<<22)+(i[1]<<14)+(i[2]<<6)+(i[3]>>2))/1e6+((i[3]&3)*4294967296+i[4]*16777216+(i[5]<<16)+(i[6]<<8)+i[7])*1e3):i.length==12?new Date(((i[0]<<24)+(i[1]<<16)+(i[2]<<8)+i[3])/1e6+((i[4]&128?-281474976710656:0)+i[6]*1099511627776+i[7]*4294967296+i[8]*16777216+(i[9]<<16)+(i[10]<<8)+i[11])*1e3):new Date("invalid");function p0(i){let e=vi,t=Y,n=ei,s=xi,r=hs,o=Hi,a=un,c=new Uint8Array(De.slice(0,vi)),l=bt,h=bt.slice(0,bt.length),u=zt,f=ps,p=i();return vi=e,Y=t,ei=n,xi=s,hs=r,Hi=o,un=a,De=c,ps=f,bt=l,bt.splice(0,bt.length,...h),zt=u,vt=new DataView(De.buffer,De.byteOffset,De.byteLength),p}function Va(){De=null,Hi=null,bt=null}function Sw(i){i.unpack?En[i.type]=i.unpack:En[i.type]=i}const tc=new Array(147);for(let i=0;i<256;i++)tc[i]=+("1e"+Math.floor(45.15-i*.30103));const bw=gs;var nc=new gs({useRecords:!1});const ww=nc.unpack,Mw=nc.unpackMultiple,Ew=nc.unpack,m0={NEVER:0,ALWAYS:1,DECIMAL_ROUND:3,DECIMAL_FIT:4};let g0=new Float32Array(1),cd=new Uint8Array(g0.buffer,0,4);function Tw(i){g0[0]=i;let e=tc[(cd[3]&127)<<1|cd[2]>>7];return(e*i+(i>0?.5:-.5)>>0)/e}let Ra;try{Ra=new TextEncoder}catch{}let Ha,th;const ic=typeof Buffer<"u",va=ic?function(i){return Buffer.allocUnsafeSlow(i)}:Uint8Array,x0=ic?Buffer:Uint8Array,ld=ic?4294967296:2144337920;let te,Kr,Bt,K=0,Pn,Wt=null,Aw;const Rw=21760,Cw=/[\u0080-\uFFFF]/,xr=Symbol("record-id");class mo extends gs{constructor(e){super(e),this.offset=0;let t,n,s,r,o=x0.prototype.utf8Write?function(C,F){return te.utf8Write(C,F,te.byteLength-F)}:Ra&&Ra.encodeInto?function(C,F){return Ra.encodeInto(C,te.subarray(F)).written}:!1,a=this;e||(e={});let c=e&&e.sequential,l=e.structures||e.saveStructures,h=e.maxSharedStructures;if(h==null&&(h=l?32:0),h>8160)throw new Error("Maximum maxSharedStructure is 8160");e.structuredClone&&e.moreTypes==null&&(this.moreTypes=!0);let u=e.maxOwnStructures;u==null&&(u=l?32:64),!this.structures&&e.useRecords!=!1&&(this.structures=[]);let f=h>32||u+h>64,p=h+64,_=h+u+64;if(_>8256)throw new Error("Maximum maxSharedStructure + maxOwnStructure is 8192");let y=[],x=0,m=0;this.pack=this.encode=function(C,F){if(te||(te=new va(8192),Bt=te.dataView||(te.dataView=new DataView(te.buffer,0,8192)),K=0),Pn=te.length-10,Pn-K<2048?(te=new va(te.length),Bt=te.dataView||(te.dataView=new DataView(te.buffer,0,te.length)),Pn=te.length-10,K=0):K=K+7&2147483640,t=K,F&S0&&(K+=F&255),r=a.structuredClone?new Map:null,a.bundleStrings&&typeof C!="string"?(Wt=[],Wt.size=1/0):Wt=null,s=a.structures,s){s.uninitialized&&(s=a._mergeStructures(a.getStructures()));let V=s.sharedLength||0;if(V>h)throw new Error("Shared structures is larger than maximum shared structures, try increasing maxSharedStructures to "+s.sharedLength);if(!s.transitions){s.transitions=Object.create(null);for(let q=0;q<V;q++){let $=s[q];if(!$)continue;let ae,Q=s.transitions;for(let xe=0,be=$.length;xe<be;xe++){let He=$[xe];ae=Q[He],ae||(ae=Q[He]=Object.create(null)),Q=ae}Q[xr]=q+64}this.lastNamedStructuresLength=V}c||(s.nextId=V+64)}n&&(n=!1);let k;try{a.randomAccessStructure&&C&&C.constructor&&C.constructor===Object?B(C):w(C);let V=Wt;if(Wt&&fd(t,w,0),r&&r.idsToInsert){let q=r.idsToInsert.sort((xe,be)=>xe.offset>be.offset?1:-1),$=q.length,ae=-1;for(;V&&$>0;){let xe=q[--$].offset+t;xe<V.stringsPosition+t&&ae===-1&&(ae=0),xe>V.position+t?ae>=0&&(ae+=6):(ae>=0&&(Bt.setUint32(V.position+t,Bt.getUint32(V.position+t)+ae),ae=-1),V=V.previous,$++)}ae>=0&&V&&Bt.setUint32(V.position+t,Bt.getUint32(V.position+t)+ae),K+=q.length*6,K>Pn&&E(K),a.offset=K;let Q=Iw(te.subarray(t,K),q);return r=null,Q}return a.offset=K,F&y0?(te.start=t,te.end=K,te):te.subarray(t,K)}catch(V){throw k=V,V}finally{if(s&&(S(),n&&a.saveStructures)){let V=s.sharedLength||0,q=te.subarray(t,K),$=Lw(s,a);if(!k)return a.saveStructures($,$.isCompatible)===!1?a.pack(C,F):(a.lastNamedStructuresLength=V,te.length>1073741824&&(te=null),q)}te.length>1073741824&&(te=null),F&v0&&(K=t)}};const S=()=>{m<10&&m++;let C=s.sharedLength||0;if(s.length>C&&!c&&(s.length=C),x>1e4)s.transitions=null,m=0,x=0,y.length>0&&(y=[]);else if(y.length>0&&!c){for(let F=0,k=y.length;F<k;F++)y[F][xr]=0;y=[]}},b=C=>{var F=C.length;F<16?te[K++]=144|F:F<65536?(te[K++]=220,te[K++]=F>>8,te[K++]=F&255):(te[K++]=221,Bt.setUint32(K,F),K+=4);for(let k=0;k<F;k++)w(C[k])},w=C=>{K>Pn&&(te=E(K));var F=typeof C,k;if(F==="string"){let V=C.length;if(Wt&&V>=4&&V<4096){if((Wt.size+=V)>Rw){let Q,xe=(Wt[0]?Wt[0].length*3+Wt[1].length:0)+10;K+xe>Pn&&(te=E(K+xe));let be;Wt.position?(be=Wt,te[K]=200,K+=3,te[K++]=98,Q=K-t,K+=4,fd(t,w,0),Bt.setUint16(Q+t-3,K-t-Q)):(te[K++]=214,te[K++]=98,Q=K-t,K+=4),Wt=["",""],Wt.previous=be,Wt.size=0,Wt.position=Q}let ae=Cw.test(C);Wt[ae?0:1]+=C,te[K++]=193,w(ae?-V:V);return}let q;V<32?q=1:V<256?q=2:V<65536?q=3:q=5;let $=V*3;if(K+$>Pn&&(te=E(K+$)),V<64||!o){let ae,Q,xe,be=K+q;for(ae=0;ae<V;ae++)Q=C.charCodeAt(ae),Q<128?te[be++]=Q:Q<2048?(te[be++]=Q>>6|192,te[be++]=Q&63|128):(Q&64512)===55296&&((xe=C.charCodeAt(ae+1))&64512)===56320?(Q=65536+((Q&1023)<<10)+(xe&1023),ae++,te[be++]=Q>>18|240,te[be++]=Q>>12&63|128,te[be++]=Q>>6&63|128,te[be++]=Q&63|128):(te[be++]=Q>>12|224,te[be++]=Q>>6&63|128,te[be++]=Q&63|128);k=be-K-q}else k=o(C,K+q);k<32?te[K++]=160|k:k<256?(q<2&&te.copyWithin(K+2,K+1,K+1+k),te[K++]=217,te[K++]=k):k<65536?(q<3&&te.copyWithin(K+3,K+2,K+2+k),te[K++]=218,te[K++]=k>>8,te[K++]=k&255):(q<5&&te.copyWithin(K+5,K+3,K+3+k),te[K++]=219,Bt.setUint32(K,k),K+=4),K+=k}else if(F==="number")if(C>>>0===C)C<32||C<128&&this.useRecords===!1||C<64&&!this.randomAccessStructure?te[K++]=C:C<256?(te[K++]=204,te[K++]=C):C<65536?(te[K++]=205,te[K++]=C>>8,te[K++]=C&255):(te[K++]=206,Bt.setUint32(K,C),K+=4);else if(C>>0===C)C>=-32?te[K++]=256+C:C>=-128?(te[K++]=208,te[K++]=C+256):C>=-32768?(te[K++]=209,Bt.setInt16(K,C),K+=2):(te[K++]=210,Bt.setInt32(K,C),K+=4);else{let V;if((V=this.useFloat32)>0&&C<4294967296&&C>=-2147483648){te[K++]=202,Bt.setFloat32(K,C);let q;if(V<4||(q=C*tc[(te[K]&127)<<1|te[K+1]>>7])>>0===q){K+=4;return}else K--}te[K++]=203,Bt.setFloat64(K,C),K+=8}else if(F==="object"||F==="function")if(!C)te[K++]=192;else{if(r){let q=r.get(C);if(q){if(!q.id){let $=r.idsToInsert||(r.idsToInsert=[]);q.id=$.push(q)}te[K++]=214,te[K++]=112,Bt.setUint32(K,q.id),K+=4;return}else r.set(C,{offset:K-t})}let V=C.constructor;if(V===Object)U(C);else if(V===Array)b(C);else if(V===Map)if(this.mapAsEmptyObject)te[K++]=128;else{k=C.size,k<16?te[K++]=128|k:k<65536?(te[K++]=222,te[K++]=k>>8,te[K++]=k&255):(te[K++]=223,Bt.setUint32(K,k),K+=4);for(let[q,$]of C)w(q),w($)}else{for(let q=0,$=Ha.length;q<$;q++){let ae=th[q];if(C instanceof ae){let Q=Ha[q];if(Q.write){Q.type&&(te[K++]=212,te[K++]=Q.type,te[K++]=0);let ct=Q.write.call(this,C);ct===C?Array.isArray(C)?b(C):U(C):w(ct);return}let xe=te,be=Bt,He=K;te=null;let Je;try{Je=Q.pack.call(this,C,ct=>(te=xe,xe=null,K+=ct,K>Pn&&E(K),{target:te,targetView:Bt,position:K-ct}),w)}finally{xe&&(te=xe,Bt=be,K=He,Pn=te.length-10)}Je&&(Je.length+K>Pn&&E(Je.length+K),K=Pw(Je,te,K,Q.type));return}}if(Array.isArray(C))b(C);else{if(C.toJSON){const q=C.toJSON();if(q!==C)return w(q)}if(F==="function")return w(this.writeFunction&&this.writeFunction(C));U(C)}}}else if(F==="boolean")te[K++]=C?195:194;else if(F==="bigint"){if(C<BigInt(1)<<BigInt(63)&&C>=-(BigInt(1)<<BigInt(63)))te[K++]=211,Bt.setBigInt64(K,C);else if(C<BigInt(1)<<BigInt(64)&&C>0)te[K++]=207,Bt.setBigUint64(K,C);else if(this.largeBigIntToFloat)te[K++]=203,Bt.setFloat64(K,Number(C));else{if(this.largeBigIntToString)return w(C.toString());if(this.useBigIntExtension&&C<BigInt(2)**BigInt(1023)&&C>-(BigInt(2)**BigInt(1023))){te[K++]=199,K++,te[K++]=66;let V=[],q;do{let $=C&BigInt(255);q=($&BigInt(128))===(C<BigInt(0)?BigInt(128):BigInt(0)),V.push($),C>>=BigInt(8)}while(!((C===BigInt(0)||C===BigInt(-1))&&q));te[K-2]=V.length;for(let $=V.length;$>0;)te[K++]=Number(V[--$]);return}else throw new RangeError(C+" was too large to fit in MessagePack 64-bit integer format, use useBigIntExtension, or set largeBigIntToFloat to convert to float-64, or set largeBigIntToString to convert to string")}K+=8}else if(F==="undefined")this.encodeUndefinedAsNil?te[K++]=192:(te[K++]=212,te[K++]=0,te[K++]=0);else throw new Error("Unknown type: "+F)},T=this.variableMapSize||this.coercibleKeyAsNumber||this.skipValues?C=>{let F;if(this.skipValues){F=[];for(let q in C)(typeof C.hasOwnProperty!="function"||C.hasOwnProperty(q))&&!this.skipValues.includes(C[q])&&F.push(q)}else F=Object.keys(C);let k=F.length;k<16?te[K++]=128|k:k<65536?(te[K++]=222,te[K++]=k>>8,te[K++]=k&255):(te[K++]=223,Bt.setUint32(K,k),K+=4);let V;if(this.coercibleKeyAsNumber)for(let q=0;q<k;q++){V=F[q];let $=Number(V);w(isNaN($)?V:$),w(C[V])}else for(let q=0;q<k;q++)w(V=F[q]),w(C[V])}:C=>{te[K++]=222;let F=K-t;K+=2;let k=0;for(let V in C)(typeof C.hasOwnProperty!="function"||C.hasOwnProperty(V))&&(w(V),w(C[V]),k++);if(k>65535)throw new Error('Object is too large to serialize with fast 16-bit map size, use the "variableMapSize" option to serialize this object');te[F+++t]=k>>8,te[F+t]=k&255},R=this.useRecords===!1?T:e.progressiveRecords&&!f?C=>{let F,k=s.transitions||(s.transitions=Object.create(null)),V=K++-t,q;for(let $ in C)if(typeof C.hasOwnProperty!="function"||C.hasOwnProperty($)){if(F=k[$],F)k=F;else{let ae=Object.keys(C),Q=k;k=s.transitions;let xe=0;for(let be=0,He=ae.length;be<He;be++){let Je=ae[be];F=k[Je],F||(F=k[Je]=Object.create(null),xe++),k=F}V+t+1==K?(K--,M(k,ae,xe)):N(k,ae,V,xe),q=!0,k=Q[$]}w(C[$])}if(!q){let $=k[xr];$?te[V+t]=$:N(k,Object.keys(C),V,0)}}:C=>{let F,k=s.transitions||(s.transitions=Object.create(null)),V=0;for(let $ in C)(typeof C.hasOwnProperty!="function"||C.hasOwnProperty($))&&(F=k[$],F||(F=k[$]=Object.create(null),V++),k=F);let q=k[xr];q?q>=96&&f?(te[K++]=((q-=96)&31)+96,te[K++]=q>>5):te[K++]=q:M(k,k.__keys__||Object.keys(C),V);for(let $ in C)(typeof C.hasOwnProperty!="function"||C.hasOwnProperty($))&&w(C[$])},L=typeof this.useRecords=="function"&&this.useRecords,U=L?C=>{L(C)?R(C):T(C)}:R,E=C=>{let F;if(C>16777216){if(C-t>ld)throw new Error("Packed buffer would be larger than maximum buffer size");F=Math.min(ld,Math.round(Math.max((C-t)*(C>67108864?1.25:2),4194304)/4096)*4096)}else F=(Math.max(C-t<<2,te.length-1)>>12)+1<<12;let k=new va(F);return Bt=k.dataView||(k.dataView=new DataView(k.buffer,0,F)),C=Math.min(C,te.length),te.copy?te.copy(k,0,t,C):k.set(te.slice(t,C)),K-=t,t=0,Pn=k.length-10,te=k},M=(C,F,k)=>{let V=s.nextId;V||(V=64),V<p&&this.shouldShareStructure&&!this.shouldShareStructure(F)?(V=s.nextOwnId,V<_||(V=p),s.nextOwnId=V+1):(V>=_&&(V=p),s.nextId=V+1);let q=F.highByte=V>=96&&f?V-96>>5:-1;C[xr]=V,C.__keys__=F,s[V-64]=F,V<p?(F.isShared=!0,s.sharedLength=V-63,n=!0,q>=0?(te[K++]=(V&31)+96,te[K++]=q):te[K++]=V):(q>=0?(te[K++]=213,te[K++]=114,te[K++]=(V&31)+96,te[K++]=q):(te[K++]=212,te[K++]=114,te[K++]=V),k&&(x+=m*k),y.length>=u&&(y.shift()[xr]=0),y.push(C),w(F))},N=(C,F,k,V)=>{let q=te,$=K,ae=Pn,Q=t;te=Kr,K=0,t=0,te||(Kr=te=new va(8192)),Pn=te.length-10,M(C,F,V),Kr=te;let xe=K;if(te=q,K=$,Pn=ae,t=Q,xe>1){let be=K+xe-1;be>Pn&&E(be);let He=k+t;te.copyWithin(He+xe,He+1,K),te.set(Kr.slice(0,xe),He),K=be}else te[k+t]=Kr[0]},B=C=>{let F=Aw(C,te,t,K,s,E,(k,V,q)=>{if(q)return n=!0;K=V;let $=te;return w(k),S(),$!==te?{position:K,targetView:Bt,target:te}:K},this);if(F===0)return U(C);K=F}}useBuffer(e){te=e,te.dataView||(te.dataView=new DataView(te.buffer,te.byteOffset,te.byteLength)),K=0}set position(e){K=e}get position(){return K}set buffer(e){te=e}get buffer(){return te}clearSharedData(){this.structures&&(this.structures=[]),this.typedStructs&&(this.typedStructs=[])}}th=[Date,Set,Error,RegExp,ArrayBuffer,Object.getPrototypeOf(Uint8Array.prototype).constructor,a0];Ha=[{pack(i,e,t){let n=i.getTime()/1e3;if((this.useTimestamp32||i.getMilliseconds()===0)&&n>=0&&n<4294967296){let{target:s,targetView:r,position:o}=e(6);s[o++]=214,s[o++]=255,r.setUint32(o,n)}else if(n>0&&n<4294967296){let{target:s,targetView:r,position:o}=e(10);s[o++]=215,s[o++]=255,r.setUint32(o,i.getMilliseconds()*4e6+(n/1e3/4294967296>>0)),r.setUint32(o+4,n)}else if(isNaN(n)){if(this.onInvalidDate)return e(0),t(this.onInvalidDate());let{target:s,targetView:r,position:o}=e(3);s[o++]=212,s[o++]=255,s[o++]=255}else{let{target:s,targetView:r,position:o}=e(15);s[o++]=199,s[o++]=12,s[o++]=255,r.setUint32(o,i.getMilliseconds()*1e6),r.setBigInt64(o+4,BigInt(Math.floor(n)))}}},{pack(i,e,t){if(this.setAsEmptyObject)return e(0),t({});let n=Array.from(i),{target:s,position:r}=e(this.moreTypes?3:0);this.moreTypes&&(s[r++]=212,s[r++]=115,s[r++]=0),t(n)}},{pack(i,e,t){let{target:n,position:s}=e(this.moreTypes?3:0);this.moreTypes&&(n[s++]=212,n[s++]=101,n[s++]=0),t([i.name,i.message,i.cause])}},{pack(i,e,t){let{target:n,position:s}=e(this.moreTypes?3:0);this.moreTypes&&(n[s++]=212,n[s++]=120,n[s++]=0),t([i.source,i.flags])}},{pack(i,e){this.moreTypes?ud(i,16,e):hd(ic?Buffer.from(i):new Uint8Array(i),e)}},{pack(i,e){let t=i.constructor;t!==x0&&this.moreTypes?ud(i,d0.indexOf(t.name),e):hd(i,e)}},{pack(i,e){let{target:t,position:n}=e(1);t[n]=193}}];function ud(i,e,t,n){let s=i.byteLength;if(s+1<256){var{target:r,position:o}=t(4+s);r[o++]=199,r[o++]=s+1}else if(s+1<65536){var{target:r,position:o}=t(5+s);r[o++]=200,r[o++]=s+1>>8,r[o++]=s+1&255}else{var{target:r,position:o,targetView:a}=t(7+s);r[o++]=201,a.setUint32(o,s+1),o+=4}r[o++]=116,r[o++]=e,i.buffer||(i=new Uint8Array(i)),r.set(new Uint8Array(i.buffer,i.byteOffset,i.byteLength),o)}function hd(i,e){let t=i.byteLength;var n,s;if(t<256){var{target:n,position:s}=e(t+2);n[s++]=196,n[s++]=t}else if(t<65536){var{target:n,position:s}=e(t+3);n[s++]=197,n[s++]=t>>8,n[s++]=t&255}else{var{target:n,position:s,targetView:r}=e(t+5);n[s++]=198,r.setUint32(s,t),s+=4}n.set(i,s)}function Pw(i,e,t,n){let s=i.length;switch(s){case 1:e[t++]=212;break;case 2:e[t++]=213;break;case 4:e[t++]=214;break;case 8:e[t++]=215;break;case 16:e[t++]=216;break;default:s<256?(e[t++]=199,e[t++]=s):s<65536?(e[t++]=200,e[t++]=s>>8,e[t++]=s&255):(e[t++]=201,e[t++]=s>>24,e[t++]=s>>16&255,e[t++]=s>>8&255,e[t++]=s&255)}return e[t++]=n,e.set(i,t),t+=s,t}function Iw(i,e){let t,n=e.length*6,s=i.length-n;for(;t=e.pop();){let r=t.offset,o=t.id;i.copyWithin(r+n,r,s),n-=6;let a=r+n;i[a++]=214,i[a++]=105,i[a++]=o>>24,i[a++]=o>>16&255,i[a++]=o>>8&255,i[a++]=o&255,s=r}return i}function fd(i,e,t){if(Wt.length>0){Bt.setUint32(Wt.position+i,K+t-Wt.position-i),Wt.stringsPosition=K-i;let n=Wt;Wt=null,e(n[0]),e(n[1])}}function Dw(i){if(i.Class){if(!i.pack&&!i.write)throw new Error("Extension has no pack or write function");if(i.pack&&!i.type)throw new Error("Extension has no type (numeric code to identify the extension)");th.unshift(i.Class),Ha.unshift(i)}Sw(i)}function Lw(i,e){return i.isCompatible=t=>{let n=!t||(e.lastNamedStructuresLength||0)===t.length;return n||e._mergeStructures(t),n},i}let _0=new mo({useRecords:!1});const Uw=_0.pack,Nw=_0.pack,Ow=mo,{NEVER:Fw,ALWAYS:Bw,DECIMAL_ROUND:zw,DECIMAL_FIT:kw}=m0,y0=512,v0=1024,S0=2048;function Vw(i,e={}){if(!i||typeof i!="object")throw new Error("first argument must be an Iterable, Async Iterable, or a Promise for an Async Iterable");if(typeof i[Symbol.iterator]=="function")return Hw(i,e);if(typeof i.then=="function"||typeof i[Symbol.asyncIterator]=="function")return Gw(i,e);throw new Error("first argument must be an Iterable, Async Iterable, Iterator, Async Iterator, or a Promise")}function*Hw(i,e){const t=new mo(e);for(const n of i)yield t.pack(n)}async function*Gw(i,e){const t=new mo(e);for await(const n of i)yield t.pack(n)}function Ww(i,e={}){if(!i||typeof i!="object")throw new Error("first argument must be an Iterable, Async Iterable, Iterator, Async Iterator, or a promise");const t=new gs(e);let n;const s=r=>{let o;n&&(r=Buffer.concat([n,r]),n=void 0);try{o=t.unpackMultiple(r)}catch(a){if(a.incomplete)n=r.slice(a.lastPosition),o=a.values;else throw a}return o};if(typeof i[Symbol.iterator]=="function")return(function*(){for(const o of i)yield*s(o)})();if(typeof i[Symbol.asyncIterator]=="function")return(async function*(){for await(const o of i)yield*s(o)})()}const Xw=Ww,qw=Vw,$w=!1,Yw=!0,jw=Object.freeze(Object.defineProperty({__proto__:null,ALWAYS:Bw,C1:Ju,DECIMAL_FIT:kw,DECIMAL_ROUND:zw,Decoder:bw,Encoder:Ow,FLOAT32_OPTIONS:m0,NEVER:Fw,Packr:mo,RESERVE_START_SPACE:S0,RESET_BUFFER_MODE:v0,REUSE_BUFFER_MODE:y0,Unpackr:gs,addExtension:Dw,clearSource:Va,decode:Ew,decodeIter:Xw,encode:Nw,encodeIter:qw,isNativeAccelerationEnabled:xw,mapsAsObjects:Yw,pack:Uw,roundFloat32:Tw,unpack:ww,unpackMultiple:Mw,useRecords:$w},Symbol.toStringTag,{value:"Module"})),Kw=ju(jw);var dd;function w0(){if(dd)return il;dd=1;var i=uw(),e=i0(),t=s0(),n=r0(),s=hw(),r=Zu(),o=o0(),a=ec(),c=Kw;let l=class b0{constructor(u,f){this.onStateChange=s.createSignal(),this.onError=s.createSignal(),this.onLeave=s.createSignal(),this.onJoin=s.createSignal(),this.hasJoined=!1,this.onMessageHandlers=n.createNanoEvents(),this.roomId=null,this.name=u,this.packr=new c.Packr,this.packr.encode(void 0),f&&(this.serializer=new(t.getSerializer("schema")),this.rootSchema=f,this.serializer.state=new f),this.onError((p,_)=>{var y;return(y=console.warn)===null||y===void 0?void 0:y.call(console,`colyseus.js - onError => (${p}) ${_}`)}),this.onLeave(()=>this.removeAllListeners())}connect(u,f,p=this,_,y){const x=new i.Connection(_.protocol);if(p.connection=x,x.events.onmessage=b0.prototype.onMessageCallback.bind(p),x.events.onclose=function(m){var S;if(!p.hasJoined){(S=console.warn)===null||S===void 0||S.call(console,`Room connection was closed unexpectedly (${m.code}): ${m.reason}`),p.onError.invoke(m.code,m.reason);return}m.code===a.CloseCode.DEVMODE_RESTART&&f?f():(p.onLeave.invoke(m.code,m.reason),p.destroy())},x.events.onerror=function(m){var S;(S=console.warn)===null||S===void 0||S.call(console,`Room, onError (${m.code}): ${m.reason}`),p.onError.invoke(m.code,m.reason)},_.protocol==="h3"){const m=new URL(u);x.connect(m.origin,_)}else x.connect(u,y)}leave(u=!0){return new Promise(f=>{this.onLeave(p=>f(p)),this.connection?u?(this.packr.buffer[0]=e.Protocol.LEAVE_ROOM,this.connection.send(this.packr.buffer.subarray(0,1))):this.connection.close():this.onLeave.invoke(a.CloseCode.CONSENTED)})}onMessage(u,f){return this.onMessageHandlers.on(this.getMessageHandlerKey(u),f)}send(u,f){const p={offset:1};this.packr.buffer[0]=e.Protocol.ROOM_DATA,typeof u=="string"?r.encode.string(this.packr.buffer,u,p):r.encode.number(this.packr.buffer,u,p),this.packr.position=0;const _=f!==void 0?this.packr.pack(f,2048+p.offset):this.packr.buffer.subarray(0,p.offset);this.connection.send(_)}sendUnreliable(u,f){const p={offset:1};this.packr.buffer[0]=e.Protocol.ROOM_DATA,typeof u=="string"?r.encode.string(this.packr.buffer,u,p):r.encode.number(this.packr.buffer,u,p),this.packr.position=0;const _=f!==void 0?this.packr.pack(f,2048+p.offset):this.packr.buffer.subarray(0,p.offset);this.connection.sendUnreliable(_)}sendBytes(u,f){const p={offset:1};if(this.packr.buffer[0]=e.Protocol.ROOM_DATA_BYTES,typeof u=="string"?r.encode.string(this.packr.buffer,u,p):r.encode.number(this.packr.buffer,u,p),f.byteLength+p.offset>this.packr.buffer.byteLength){const _=new Uint8Array(p.offset+f.byteLength);_.set(this.packr.buffer),this.packr.useBuffer(_)}this.packr.buffer.set(f,p.offset),this.connection.send(this.packr.buffer.subarray(0,p.offset+f.byteLength))}get state(){return this.serializer.getState()}removeAllListeners(){this.onJoin.clear(),this.onStateChange.clear(),this.onError.clear(),this.onLeave.clear(),this.onMessageHandlers.events={},this.serializer instanceof o.SchemaSerializer&&(this.serializer.decoder.root.callbacks={})}onMessageCallback(u){const f=new Uint8Array(u.data),p={offset:1},_=f[0];if(_===e.Protocol.JOIN_ROOM){const y=r.decode.utf8Read(f,p,f[p.offset++]);if(this.serializerId=r.decode.utf8Read(f,p,f[p.offset++]),!this.serializer){const x=t.getSerializer(this.serializerId);this.serializer=new x}f.byteLength>p.offset&&this.serializer.handshake&&this.serializer.handshake(f,p),this.reconnectionToken=`${this.roomId}:${y}`,this.hasJoined=!0,this.onJoin.invoke(),this.packr.buffer[0]=e.Protocol.JOIN_ROOM,this.connection.send(this.packr.buffer.subarray(0,1))}else if(_===e.Protocol.ERROR){const y=r.decode.number(f,p),x=r.decode.string(f,p);this.onError.invoke(y,x)}else if(_===e.Protocol.LEAVE_ROOM)this.leave();else if(_===e.Protocol.ROOM_STATE)this.serializer.setState(f,p),this.onStateChange.invoke(this.serializer.getState());else if(_===e.Protocol.ROOM_STATE_PATCH)this.serializer.patch(f,p),this.onStateChange.invoke(this.serializer.getState());else if(_===e.Protocol.ROOM_DATA){const y=r.decode.stringCheck(f,p)?r.decode.string(f,p):r.decode.number(f,p),x=f.byteLength>p.offset?c.unpack(f,{start:p.offset}):void 0;this.dispatchMessage(y,x)}else if(_===e.Protocol.ROOM_DATA_BYTES){const y=r.decode.stringCheck(f,p)?r.decode.string(f,p):r.decode.number(f,p);this.dispatchMessage(y,f.subarray(p.offset))}}dispatchMessage(u,f){var p;const _=this.getMessageHandlerKey(u);this.onMessageHandlers.events[_]?this.onMessageHandlers.emit(_,f):this.onMessageHandlers.events["*"]?this.onMessageHandlers.emit("*",u,f):(p=console.warn)===null||p===void 0||p.call(console,`colyseus.js: onMessage() not registered for type '${u}'.`)}destroy(){this.serializer&&this.serializer.teardown()}getMessageHandlerKey(u){switch(typeof u){case"string":return u;case"number":return`i${u}`;default:throw new Error("invalid message type.")}}};return il.Room=l,il}var hl={};function pd(i,e){e.headers=i.headers||{},e.statusMessage=i.statusText,e.statusCode=i.status,e.data=i.response}function pi(i,e,t){return new Promise(function(n,s){t=t||{};var r=new XMLHttpRequest,o,a,c,l=t.body,h=t.headers||{};t.timeout&&(r.timeout=t.timeout),r.ontimeout=r.onerror=function(u){u.timeout=u.type=="timeout",s(u)},r.onabort=function(u){u.aborted=!0,s(u)},r.open(i,e.href||e),r.onload=function(){for(c=r.getAllResponseHeaders().trim().split(/[\r\n]+/),pd(r,r);a=c.shift();)a=a.split(": "),r.headers[a.shift().toLowerCase()]=a.join(": ");if(a=r.headers["content-type"],a&&~a.indexOf("application/json"))try{r.data=JSON.parse(r.data,t.reviver)}catch(u){return pd(r,u),s(u)}(r.status>=400?s:n)(r)},typeof FormData<"u"&&l instanceof FormData||l&&typeof l=="object"&&(h["content-type"]="application/json",l=JSON.stringify(l)),r.withCredentials=!!t.withCredentials;for(o in h)r.setRequestHeader(o,h[o]);r.send(l),t.signal&&t.signal.addEventListener("abort",function(){r.abort()})})}var Zw=pi.bind(pi,"GET"),Jw=pi.bind(pi,"POST"),Qw=pi.bind(pi,"PATCH"),eM=pi.bind(pi,"DELETE"),tM=pi.bind(pi,"PUT");const nM=Object.freeze(Object.defineProperty({__proto__:null,del:eM,get:Zw,patch:Qw,post:Jw,put:tM,send:pi},Symbol.toStringTag,{value:"Module"})),iM=ju(nM);var md;function sM(){if(md)return hl;md=1;var i=ec(),e=iM;function t(r){var o=Object.create(null);return r&&Object.keys(r).forEach(function(a){if(a!=="default"){var c=Object.getOwnPropertyDescriptor(r,a);Object.defineProperty(o,a,c.get?c:{enumerable:!0,get:function(){return r[a]}})}}),o.default=r,Object.freeze(o)}var n=t(e);let s=class{constructor(o,a={}){this.client=o,this.headers=a}get(o,a={}){return this.request("get",o,a)}post(o,a={}){return this.request("post",o,a)}del(o,a={}){return this.request("del",o,a)}put(o,a={}){return this.request("put",o,a)}request(o,a,c={}){return n[o](this.client.getHttpEndpoint(a),this.getOptions(c)).catch(l=>{var h;if(l.aborted)throw new i.AbortError("Request aborted");const u=l.statusCode,f=((h=l.data)===null||h===void 0?void 0:h.error)||l.statusMessage||l.message;throw!u&&!f?l:new i.ServerError(u,f)})}getOptions(o){return o.headers=Object.assign({},this.headers,o.headers),this.authToken&&(o.headers.Authorization=`Bearer ${this.authToken}`),typeof cc<"u"&&cc.sys&&cc.sys.isNative||(o.withCredentials=!0),o}};return hl.HTTP=s,hl}var fl={},Zr={},gd;function rM(){if(gd)return Zr;gd=1;var i=Qa;let e;function t(){if(!e)try{e=typeof cc<"u"&&cc.sys&&cc.sys.localStorage?cc.sys.localStorage:window.localStorage}catch{}return!e&&typeof globalThis.indexedDB<"u"&&(e=new o),e||(e={cache:{},setItem:function(a,c){this.cache[a]=c},getItem:function(a){this.cache[a]},removeItem:function(a){delete this.cache[a]}}),e}function n(a,c){t().setItem(a,c)}function s(a){t().removeItem(a)}function r(a,c){const l=t().getItem(a);typeof Promise>"u"||!(l instanceof Promise)?c(l):l.then(h=>c(h))}class o{constructor(){this.dbPromise=new Promise(c=>{const l=indexedDB.open("_colyseus_storage",1);l.onupgradeneeded=()=>l.result.createObjectStore("store"),l.onsuccess=()=>c(l.result)})}tx(c,l){return i.__awaiter(this,void 0,void 0,function*(){const u=(yield this.dbPromise).transaction("store",c).objectStore("store");return l(u)})}setItem(c,l){return this.tx("readwrite",h=>h.put(l,c)).then()}getItem(c){return i.__awaiter(this,void 0,void 0,function*(){const l=yield this.tx("readonly",h=>h.get(c));return new Promise(h=>{l.onsuccess=()=>h(l.result)})})}removeItem(c){return this.tx("readwrite",l=>l.delete(c)).then()}}return Zr.getItem=r,Zr.removeItem=s,Zr.setItem=n,Zr}var xd;function M0(){if(xd)return fl;xd=1;var i=Qa,e=rM(),t=r0(),n,s,r,o;let a=class{constructor(l){this.http=l,this.settings={path:"/auth",key:"colyseus-auth-token"},n.set(this,!1),s.set(this,void 0),r.set(this,void 0),o.set(this,t.createNanoEvents()),e.getItem(this.settings.key,h=>this.token=h)}set token(l){this.http.authToken=l}get token(){return this.http.authToken}onChange(l){const h=i.__classPrivateFieldGet(this,o,"f").on("change",l);return i.__classPrivateFieldGet(this,n,"f")||i.__classPrivateFieldSet(this,s,new Promise((u,f)=>{this.getUserData().then(p=>{this.emitChange(Object.assign(Object.assign({},p),{token:this.token}))}).catch(p=>{this.emitChange({user:null,token:void 0})}).finally(()=>{u()})}),"f"),i.__classPrivateFieldSet(this,n,!0,"f"),h}getUserData(){return i.__awaiter(this,void 0,void 0,function*(){if(this.token)return(yield this.http.get(`${this.settings.path}/userdata`)).data;throw new Error("missing auth.token")})}registerWithEmailAndPassword(l,h,u){return i.__awaiter(this,void 0,void 0,function*(){const f=(yield this.http.post(`${this.settings.path}/register`,{body:{email:l,password:h,options:u}})).data;return this.emitChange(f),f})}signInWithEmailAndPassword(l,h){return i.__awaiter(this,void 0,void 0,function*(){const u=(yield this.http.post(`${this.settings.path}/login`,{body:{email:l,password:h}})).data;return this.emitChange(u),u})}signInAnonymously(l){return i.__awaiter(this,void 0,void 0,function*(){const h=(yield this.http.post(`${this.settings.path}/anonymous`,{body:{options:l}})).data;return this.emitChange(h),h})}sendPasswordResetEmail(l){return i.__awaiter(this,void 0,void 0,function*(){return(yield this.http.post(`${this.settings.path}/forgot-password`,{body:{email:l}})).data})}signInWithProvider(l){return i.__awaiter(this,arguments,void 0,function*(h,u={}){return new Promise((f,p)=>{const _=u.width||480,y=u.height||768,x=this.token?`?token=${this.token}`:"",m=`Login with ${h[0].toUpperCase()+h.substring(1)}`,S=this.http.client.getHttpEndpoint(`${u.prefix||`${this.settings.path}/provider`}/${h}${x}`),b=screen.width/2-_/2,w=screen.height/2-y/2;i.__classPrivateFieldSet(this,r,window.open(S,m,"toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width="+_+", height="+y+", top="+w+", left="+b),"f");const T=L=>{L.data.user===void 0&&L.data.token===void 0||(clearInterval(R),i.__classPrivateFieldGet(this,r,"f").close(),i.__classPrivateFieldSet(this,r,void 0,"f"),window.removeEventListener("message",T),L.data.error!==void 0?p(L.data.error):(f(L.data),this.emitChange(L.data)))},R=setInterval(()=>{(!i.__classPrivateFieldGet(this,r,"f")||i.__classPrivateFieldGet(this,r,"f").closed)&&(i.__classPrivateFieldSet(this,r,void 0,"f"),p("cancelled"),window.removeEventListener("message",T))},200);window.addEventListener("message",T)})})}signOut(){return i.__awaiter(this,void 0,void 0,function*(){this.emitChange({user:null,token:null})})}emitChange(l){l.token!==void 0&&(this.token=l.token,l.token===null?e.removeItem(this.settings.key):e.setItem(this.settings.key,l.token)),i.__classPrivateFieldGet(this,o,"f").emit("change",l)}};return n=new WeakMap,s=new WeakMap,r=new WeakMap,o=new WeakMap,fl.Auth=a,fl}var dl={},_d;function oM(){if(_d)return dl;_d=1;function i(e){var t;const n=((t=window?.location)===null||t===void 0?void 0:t.hostname)||"localhost",s=e.hostname.split("."),r=!e.hostname.includes("trycloudflare.com")&&!e.hostname.includes("discordsays.com")&&s.length>2?`/${s[0]}`:"";return e.pathname.startsWith("/.proxy")?`${e.protocol}//${n}${r}${e.pathname}${e.search}`:`${e.protocol}//${n}/.proxy/colyseus${r}${e.pathname}${e.search}`}return dl.discordURLBuilder=i,dl}var yd;function aM(){if(yd)return ma;yd=1;var i=Qa,e=ec(),t=w0(),n=sM(),s=M0(),r=oM(),o;class a extends Error{constructor(u,f){super(u),this.code=f,this.name="MatchMakeError",Object.setPrototypeOf(this,a.prototype)}}const c=typeof window<"u"&&typeof((o=window?.location)===null||o===void 0?void 0:o.hostname)<"u"?`${window.location.protocol.replace("http","ws")}//${window.location.hostname}${window.location.port&&`:${window.location.port}`}`:"ws://127.0.0.1:2567";let l=class{constructor(u=c,f){var p,_;if(typeof u=="string"){const y=u.startsWith("/")?new URL(u,c):new URL(u),x=y.protocol==="https:"||y.protocol==="wss:",m=Number(y.port||(x?443:80));this.settings={hostname:y.hostname,pathname:y.pathname,port:m,secure:x,searchParams:y.searchParams.toString()||void 0}}else u.port===void 0&&(u.port=u.secure?443:80),u.pathname===void 0&&(u.pathname=""),this.settings=u;this.settings.pathname.endsWith("/")&&(this.settings.pathname=this.settings.pathname.slice(0,-1)),this.http=new n.HTTP(this,f?.headers||{}),this.auth=new s.Auth(this.http),this.urlBuilder=f?.urlBuilder,!this.urlBuilder&&typeof window<"u"&&(!((_=(p=window?.location)===null||p===void 0?void 0:p.hostname)===null||_===void 0)&&_.includes("discordsays.com"))&&(this.urlBuilder=r.discordURLBuilder,console.log("Colyseus SDK: Discord Embedded SDK detected. Using custom URL builder."))}joinOrCreate(u){return i.__awaiter(this,arguments,void 0,function*(f,p={},_){return yield this.createMatchMakeRequest("joinOrCreate",f,p,_)})}create(u){return i.__awaiter(this,arguments,void 0,function*(f,p={},_){return yield this.createMatchMakeRequest("create",f,p,_)})}join(u){return i.__awaiter(this,arguments,void 0,function*(f,p={},_){return yield this.createMatchMakeRequest("join",f,p,_)})}joinById(u){return i.__awaiter(this,arguments,void 0,function*(f,p={},_){return yield this.createMatchMakeRequest("joinById",f,p,_)})}reconnect(u,f){return i.__awaiter(this,void 0,void 0,function*(){if(typeof u=="string"&&typeof f=="string")throw new Error("DEPRECATED: .reconnect() now only accepts 'reconnectionToken' as argument.\nYou can get this token from previously connected `room.reconnectionToken`");const[p,_]=u.split(":");if(!p||!_)throw new Error(`Invalid reconnection token format.
The format should be roomId:reconnectionToken`);return yield this.createMatchMakeRequest("reconnect",p,{reconnectionToken:_},f)})}consumeSeatReservation(u,f,p){return i.__awaiter(this,void 0,void 0,function*(){const _=this.createRoom(u.room.name,f);_.roomId=u.room.roomId,_.sessionId=u.sessionId;const y={sessionId:_.sessionId};u.reconnectionToken&&(y.reconnectionToken=u.reconnectionToken);const x=p||_;return _.connect(this.buildEndpoint(u.room,y,u.protocol),u.devMode&&(()=>i.__awaiter(this,void 0,void 0,function*(){console.info(`[Colyseus devMode]: ${String.fromCodePoint(128260)} Re-establishing connection with room id '${_.roomId}'...`);let m=0,S=8;const b=()=>i.__awaiter(this,void 0,void 0,function*(){m++;try{yield this.consumeSeatReservation(u,f,x),console.info(`[Colyseus devMode]: ${String.fromCodePoint(9989)} Successfully re-established connection with room '${_.roomId}'`)}catch{m<S?(console.info(`[Colyseus devMode]: ${String.fromCodePoint(128260)} retrying... (${m} out of ${S})`),setTimeout(b,2e3)):console.info(`[Colyseus devMode]: ${String.fromCodePoint(10060)} Failed to reconnect. Is your server running? Please check server logs.`)}});setTimeout(b,2e3)})),x,u,this.http.headers),new Promise((m,S)=>{const b=(w,T)=>S(new e.ServerError(w,T));x.onError.once(b),x.onJoin.once(()=>{x.onError.remove(b),m(x)})})})}createMatchMakeRequest(u,f){return i.__awaiter(this,arguments,void 0,function*(p,_,y={},x,m){const S=(yield this.http.post(`matchmake/${p}/${_}`,{headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(y)})).data;if(S.error)throw new a(S.error,S.code);return p==="reconnect"&&(S.reconnectionToken=y.reconnectionToken),yield this.consumeSeatReservation(S,x,m)})}createRoom(u,f){return new t.Room(u,f)}buildEndpoint(u,f={},p="ws"){let _=this.settings.searchParams||"";this.http.authToken&&(f._authToken=this.http.authToken);for(const m in f)f.hasOwnProperty(m)&&(_+=(_?"&":"")+`${m}=${f[m]}`);p==="h3"&&(p="http");let y=this.settings.secure?`${p}s://`:`${p}://`;u.publicAddress?y+=`${u.publicAddress}`:y+=`${this.settings.hostname}${this.getEndpointPort()}${this.settings.pathname}`;const x=`${y}/${u.processId}/${u.roomId}?${_}`;return this.urlBuilder?this.urlBuilder(new URL(x)):x}getHttpEndpoint(u=""){const f=u.startsWith("/")?u:`/${u}`;let p=`${this.settings.secure?"https":"http"}://${this.settings.hostname}${this.getEndpointPort()}${this.settings.pathname}${f}`;return this.settings.searchParams&&(p+=`?${this.settings.searchParams}`),this.urlBuilder?this.urlBuilder(new URL(p)):p}getEndpointPort(){return this.settings.port!==80&&this.settings.port!==443?`:${this.settings.port}`:""}};return l.VERSION="0.16.22",ma.Client=l,ma.MatchMakeError=a,ma}var pl={},vd;function cM(){if(vd)return pl;vd=1;let i=class{setState(t){}getState(){return null}patch(t){}teardown(){}handshake(t){}};return pl.NoneSerializer=i,pl}var Sd;function lM(){return Sd||(Sd=1,(function(i){tw();var e=aM(),t=i0(),n=w0(),s=M0(),r=ec(),o=o0(),a=cM(),c=s0();c.registerSerializer("schema",o.SchemaSerializer),c.registerSerializer("none",a.NoneSerializer),i.Client=e.Client,i.MatchMakeError=e.MatchMakeError,Object.defineProperty(i,"ErrorCode",{enumerable:!0,get:function(){return t.ErrorCode}}),Object.defineProperty(i,"Protocol",{enumerable:!0,get:function(){return t.Protocol}}),i.Room=n.Room,i.Auth=s.Auth,i.ServerError=r.ServerError,i.SchemaSerializer=o.SchemaSerializer,i.getStateCallbacks=o.getStateCallbacks,i.registerSerializer=c.registerSerializer})(tl)),tl}var uM=lM();const hM="TacticalRoom",fM=1/20;function dM(){return typeof window>"u"?"ws://localhost:2567":`${window.location.protocol==="https:"?"wss:":"ws:"}//${window.location.hostname}:2567`}class pM{constructor(e={}){this.serverUrl=e.serverUrl??void 0??dM(),this.roomName=e.roomName??hM,this.client=null,this.room=null,this.playerId=null,this.connectionState="idle",this.destroyed=!1,this.remotePlayers=new Map,this.sendAccumulator=0,this.lastError=null,this.nextInputSequence=1,this.lastReconciledSequence=0,this.pendingLocalCorrection=null,this.pendingInitializationState=null,this.connect()}async connect(){if(!(this.destroyed||this.connectionState==="connecting"||this.connectionState==="connected")){this.connectionState="connecting",this.lastError=null,console.info(`[NetworkClient] Connecting to ${this.serverUrl}/${this.roomName}`);try{this.client=new uM.Client(this.serverUrl);const e=await this.client.joinOrCreate(this.roomName);if(this.destroyed){await e.leave();return}this.room=e,this.connectionState="connected",this.playerId=e.sessionId,console.info(`[NetworkClient] Connected to room "${e.name}" with session ${e.sessionId}`),console.info(`[NetworkClient] Assigned player ID: ${this.playerId}`),e.onMessage("player-joined",t=>{console.info("[NetworkClient] Player joined:",t)}),e.onMessage("player-left",t=>{this.remotePlayers.delete(t?.playerId),console.info("[NetworkClient] Player left:",t)}),e.onMessage("player-state",t=>{this.applyPlayerState(t?.players??{})}),e.onLeave(t=>{this.room=null,this.remotePlayers.clear(),this.connectionState=this.destroyed?"closed":"disconnected",console.info(`[NetworkClient] Room closed with code ${t}`)}),e.onError((t,n)=>{this.lastError=`${t}: ${n}`,console.error(`[NetworkClient] Room error ${t}: ${n}`)}),this.pendingInitializationState&&e.send("player-ready",this.pendingInitializationState),e.send("request-player-state")}catch(e){this.client=null,this.room=null,this.remotePlayers.clear(),this.connectionState="offline",this.lastError=e instanceof Error?e.message:String(e),console.warn(`[NetworkClient] Multiplayer unavailable at ${this.serverUrl}. Continuing in single-player mode.`,e)}}}applyPlayerState(e){const t=new Map;for(const[n,s]of Object.entries(e)){const r={playerId:n,position:{x:Number(s?.position?.x??0),y:Number(s?.position?.y??0),z:Number(s?.position?.z??0)},yaw:Number(s?.yaw??0),sequence:Number(s?.lastProcessedSequence??0),timestamp:Number(s?.lastProcessedTimestamp??0),isGrounded:!!s?.isGrounded,isCrouched:!!s?.isCrouched,currentHeight:Number(s?.currentHeight??1.72)};if(n===this.playerId){r.sequence>this.lastReconciledSequence&&(this.lastReconciledSequence=r.sequence,this.pendingLocalCorrection=r);continue}t.set(n,r)}this.remotePlayers=t}initializeLocalPlayer(e){this.pendingInitializationState=e,this.room&&this.room.send("player-ready",e)}update(e,t=null){!this.room||!t||(this.sendAccumulator+=e,!(this.sendAccumulator<fM)&&(this.sendAccumulator=0,this.room.send("player-input",{...t,sequence:this.nextInputSequence,timestamp:Date.now()}),this.nextInputSequence+=1))}consumeLocalCorrection(){const e=this.pendingLocalCorrection;return this.pendingLocalCorrection=null,e}getRemotePlayers(){return Array.from(this.remotePlayers.values())}destroy(){this.destroyed=!0,this.remotePlayers.clear(),this.pendingLocalCorrection=null,this.pendingInitializationState=null,this.room&&this.room.leave().catch(e=>{console.warn("[NetworkClient] Failed to leave room cleanly.",e)}),this.room=null,this.client=null,this.connectionState="closed"}}class mM{constructor(e=[]){this.targets=[...e]}update(e,t={}){for(const n of this.targets)n.update(e,t)}destroy(){for(const e of this.targets)e.destroy?.();this.targets.length=0}}const gM="modulepreload",xM=function(i){return"/"+i},bd={},_M=function(e,t,n){let s=Promise.resolve();if(t&&t.length>0){let l=function(h){return Promise.all(h.map(u=>Promise.resolve(u).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};var o=l;document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),c=a?.nonce||a?.getAttribute("nonce");s=l(t.map(h=>{if(h=xM(h),h in bd)return;bd[h]=!0;const u=h.endsWith(".css"),f=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${h}"]${f}`))return;const p=document.createElement("link");if(p.rel=u?"stylesheet":gM,u||(p.as="script"),p.crossOrigin="",p.href=h,c&&p.setAttribute("nonce",c),document.head.appendChild(p),u)return new Promise((_,y)=>{p.addEventListener("load",_),p.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${h}`)))})}))}function r(a){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=a,window.dispatchEvent(c),!c.defaultPrevented)throw a}return s.then(a=>{for(const c of a||[])c.status==="rejected"&&r(c.reason);return e().catch(r)})},yM=["Recast","Detour","DetourNavMeshBuilder","DetourTileCacheBuilder","NavMeshImporter","NavMeshExporter","CrowdUtils","ChunkyTriMeshUtils","RecastDebugDraw","DetourDebugDraw"],vM=["rcConfig","rcContext","dtNavMeshParams","dtNavMeshCreateParams","RecastLinearAllocator","RecastFastLZCompressor","rcChunkyTriMesh","dtTileCacheParams","dtTileCacheLayerHeader","Vec3","BoolRef","IntRef","UnsignedIntRef","UnsignedCharRef","UnsignedShortRef","FloatRef","IntArray","UnsignedIntArray","UnsignedCharArray","UnsignedShortArray","FloatArray"],X={isNull:i=>X.Module.getPointer(i)===0,destroy:i=>{X.Module.destroy(i)}},rt={},SM=async i=>{if(X.Module===void 0){{const e=(await _M(async()=>{const{default:t}=await import("./recast-navigation.wasm-compat-8ehSj8eI.js");return{default:t}},[])).default;X.Module=await e()}for(const e of yM)X[e]=new X.Module[e];for(const e of vM)X[e]=X.Module[e];rt.RC_BORDER_REG=X.Recast.BORDER_REG,rt.RC_MULTIPLE_REGS=X.Recast.MULTIPLE_REGS,rt.RC_BORDER_VERTEX=X.Recast.BORDER_VERTEX,rt.RC_AREA_BORDER=X.Recast.AREA_BORDER,rt.RC_CONTOUR_REG_MASK=X.Recast.CONTOUR_REG_MASK,rt.RC_MESH_NULL_IDX=X.Recast.MESH_NULL_IDX,rt.RC_NULL_AREA=X.Recast.NULL_AREA,rt.RC_WALKABLE_AREA=X.Recast.WALKABLE_AREA,rt.RC_NOT_CONNECTED=X.Recast.NOT_CONNECTED,rt.RC_CONTOUR_TESS_WALL_EDGES=X.Module.RC_CONTOUR_TESS_WALL_EDGES,rt.RC_CONTOUR_TESS_AREA_EDGES=X.Module.RC_CONTOUR_TESS_AREA_EDGES,rt.RC_LOG_PROGRESS=X.Module.RC_LOG_PROGRESS,rt.RC_LOG_WARNING=X.Module.RC_LOG_WARNING,rt.RC_LOG_ERROR=X.Module.RC_LOG_ERROR,rt.RC_TIMER_TOTAL=X.Module.RC_TIMER_TOTAL,rt.RC_TIMER_TEMP=X.Module.RC_TIMER_TEMP,rt.RC_TIMER_RASTERIZE_TRIANGLES=X.Module.RC_TIMER_RASTERIZE_TRIANGLES,rt.RC_TIMER_BUILD_COMPACTHEIGHTFIELD=X.Module.RC_TIMER_BUILD_COMPACTHEIGHTFIELD,rt.RC_TIMER_BUILD_CONTOURS=X.Module.RC_TIMER_BUILD_CONTOURS,rt.RC_TIMER_BUILD_CONTOURS_TRACE=X.Module.RC_TIMER_BUILD_CONTOURS_TRACE,rt.RC_TIMER_BUILD_CONTOURS_SIMPLIFY=X.Module.RC_TIMER_BUILD_CONTOURS_SIMPLIFY,rt.RC_TIMER_FILTER_BORDER=X.Module.RC_TIMER_FILTER_BORDER,rt.RC_TIMER_FILTER_WALKABLE=X.Module.RC_TIMER_FILTER_WALKABLE,rt.RC_TIMER_MEDIAN_AREA=X.Module.RC_TIMER_MEDIAN_AREA,rt.RC_TIMER_FILTER_LOW_OBSTACLES=X.Module.RC_TIMER_FILTER_LOW_OBSTACLES,rt.RC_TIMER_BUILD_POLYMESH=X.Module.RC_TIMER_BUILD_POLYMESH,rt.RC_TIMER_MERGE_POLYMESH=X.Module.RC_TIMER_MERGE_POLYMESH,rt.RC_TIMER_ERODE_AREA=X.Module.RC_TIMER_ERODE_AREA,rt.RC_TIMER_MARK_BOX_AREA=X.Module.RC_TIMER_MARK_BOX_AREA,rt.RC_TIMER_MARK_CYLINDER_AREA=X.Module.RC_TIMER_MARK_CYLINDER_AREA,rt.RC_TIMER_MARK_CONVEXPOLY_AREA=X.Module.RC_TIMER_MARK_CONVEXPOLY_AREA,rt.RC_TIMER_BUILD_DISTANCEFIELD=X.Module.RC_TIMER_BUILD_DISTANCEFIELD,rt.RC_TIMER_BUILD_DISTANCEFIELD_DIST=X.Module.RC_TIMER_BUILD_DISTANCEFIELD_DIST,rt.RC_TIMER_BUILD_DISTANCEFIELD_BLUR=X.Module.RC_TIMER_BUILD_DISTANCEFIELD_BLUR,rt.RC_TIMER_BUILD_REGIONS=X.Module.RC_TIMER_BUILD_REGIONS,rt.RC_TIMER_BUILD_REGIONS_WATERSHED=X.Module.RC_TIMER_BUILD_REGIONS_WATERSHED,rt.RC_TIMER_BUILD_REGIONS_EXPAND=X.Module.RC_TIMER_BUILD_REGIONS_EXPAND,rt.RC_TIMER_BUILD_REGIONS_FLOOD=X.Module.RC_TIMER_BUILD_REGIONS_FLOOD,rt.RC_TIMER_BUILD_REGIONS_FILTER=X.Module.RC_TIMER_BUILD_REGIONS_FILTER,rt.RC_TIMER_BUILD_LAYERS=X.Module.RC_TIMER_BUILD_LAYERS,rt.RC_TIMER_BUILD_POLYMESHDETAIL=X.Module.RC_TIMER_BUILD_POLYMESHDETAIL,rt.RC_TIMER_MERGE_POLYMESHDETAIL=X.Module.RC_TIMER_MERGE_POLYMESHDETAIL,rt.RC_MAX_TIMERS=X.Module.RC_MAX_TIMERS,X.Detour.FAILURE,X.Detour.SUCCESS,X.Detour.IN_PROGRESS,X.Detour.STATUS_DETAIL_MASK,X.Detour.WRONG_MAGIC,X.Detour.WRONG_VERSION,X.Detour.OUT_OF_MEMORY,X.Detour.INVALID_PARAM,X.Detour.BUFFER_TOO_SMALL,X.Detour.OUT_OF_NODES,X.Detour.PARTIAL_RESULT,X.Detour.ALREADY_OCCUPIED,X.Detour.VERTS_PER_POLYGON,X.Detour.NAVMESH_MAGIC,X.Detour.NAVMESH_VERSION,X.Detour.NAVMESH_STATE_MAGIC,X.Detour.NAVMESH_STATE_VERSION,X.Detour.TILECACHE_MAGIC,X.Detour.TILECACHE_VERSION,X.Detour.TILECACHE_NULL_AREA,X.Detour.TILECACHE_WALKABLE_AREA,X.Detour.TILECACHE_NULL_IDX,X.Detour.NULL_LINK,X.Detour.NULL_LINK,X.Detour.EXT_LINK,X.Detour.OFFMESH_CON_BIDIR,X.Module.DT_STRAIGHTPATH_START,X.Module.DT_STRAIGHTPATH_END,X.Module.DT_STRAIGHTPATH_OFFMESH_CONNECTION,X.Module.DT_STRAIGHTPATH_AREA_CROSSINGS,X.Module.DT_STRAIGHTPATH_ALL_CROSSINGS,X.Module.DT_FINDPATH_ANY_ANGLE,X.Module.DT_RAYCAST_USE_COSTS,X.Module.DT_CROWDAGENT_STATE_INVALID,X.Module.DT_CROWDAGENT_STATE_WALKING,X.Module.DT_CROWDAGENT_STATE_OFFMESH,X.Module.DT_CROWDAGENT_TARGET_NONE,X.Module.DT_CROWDAGENT_TARGET_FAILED,X.Module.DT_CROWDAGENT_TARGET_VALID,X.Module.DT_CROWDAGENT_TARGET_REQUESTING,X.Module.DT_CROWDAGENT_TARGET_WAITING_FOR_QUEUE,X.Module.DT_CROWDAGENT_TARGET_WAITING_FOR_PATH,X.Module.DT_CROWDAGENT_TARGET_VELOCITY,X.Module.DT_COMPRESSEDTILE_FREE_DATA,X.Module.DT_TILE_FREE_DATA}};class sc{get size(){return this.raw.size}constructor(e){this.raw=e}get(e){return this.raw.get(e)}set(e,t){this.raw.set(e,t)}resize(e){this.raw.resize(e)}copy(e){this.raw.resize(e.length),this.getHeapView().set(e)}destroy(){X.destroy(this.raw)}getHeapView(){const e=this.getHeap();return new this.typedArrayClass(e.buffer,this.raw.getDataPointer(),this.size)}toTypedArray(){const e=this.getHeapView(),t=new this.typedArrayClass(this.size);return t.set(e),t}}class nh extends sc{typedArrayClass=Int32Array;constructor(e){super(e??new X.Module.IntArray)}getHeap(){return X.Module.HEAP32}static fromRaw(e){return new nh(e)}}class Ni extends sc{typedArrayClass=Uint32Array;constructor(e){super(e??new X.Module.UnsignedIntArray)}getHeap(){return X.Module.HEAPU32}static fromRaw(e){return new Ni(e)}}class go extends sc{typedArrayClass=Uint8Array;constructor(e){super(e??new X.Module.UnsignedCharArray)}getHeap(){return X.Module.HEAPU8}static fromRaw(e){return new go(e)}}class lo extends sc{typedArrayClass=Float32Array;constructor(e){super(e??new X.Module.FloatArray)}getHeap(){return X.Module.HEAPF32}static fromRaw(e){return new lo(e)}}const bM=lo,wM=nh,MM=go,mt={toRaw:({x:i,y:e,z:t},n)=>n?(n.x=i,n.y=e,n.z=t,n):new X.Module.Vec3(i,e,t),fromRaw:i=>{const{x:e,y:t,z:n}=i;return{x:e,y:t,z:n}},fromArray:([i,e,t])=>({x:i,y:e,z:t}),toArray:({x:i,y:e,z:t})=>[i,e,t],lerp:(i,e,t,n={x:0,y:0,z:0})=>{n.x=i.x+(e.x-i.x)*t,n.y=i.y+(e.y-i.y)*t,n.z=i.z+(e.z-i.z)*t},copy:(i,e={x:0,y:0,z:0})=>{e.x=i.x,e.y=i.y,e.z=i.z}},Tn=(i,e)=>{const t=[];for(let n=0;n<e;n++)t.push(i(n));return t},zn=i=>X.Detour.statusSucceed(i);class EM{constructor(e){this.raw=e}vertBase(){return this.raw.vertBase}triBase(){return this.raw.triBase}vertCount(){return this.raw.vertCount}triCount(){return this.raw.triCount}}class TM{constructor(e){this.raw=e}ref(){return this.raw.ref}next(){return this.raw.next}edge(){return this.raw.edge}side(){return this.raw.side}bmin(){return this.raw.bmin}bmax(){return this.raw.bmax}}class AM{constructor(e){this.raw=e}bmin(){return mt.fromArray(Tn(e=>this.raw.get_bmin(e),3))}bmax(){return mt.fromArray(Tn(e=>this.raw.get_bmax(e),3))}i(){return this.raw.i}}class E0{constructor(e){this.raw=e}pos(e){return this.raw.get_pos(e)}rad(){return this.raw.rad}poly(){return this.raw.poly}flags(){return this.raw.flags}side(){return this.raw.side}userId(){return this.raw.userId}}class RM{constructor(e){this.raw=e}magic(){return this.raw.magic}version(){return this.raw.version}x(){return this.raw.x}y(){return this.raw.y}layer(){return this.raw.layer}userId(){return this.raw.userId}polyCount(){return this.raw.polyCount}vertCount(){return this.raw.vertCount}maxLinkCount(){return this.raw.maxLinkCount}detailMeshCount(){return this.raw.detailMeshCount}detailVertCount(){return this.raw.detailVertCount}detailTriCount(){return this.raw.detailTriCount}bvNodeCount(){return this.raw.bvNodeCount}offMeshConCount(){return this.raw.offMeshConCount}offMeshBase(){return this.raw.offMeshBase}walkableHeight(){return this.raw.walkableHeight}walkableRadius(){return this.raw.walkableRadius}walkableClimb(){return this.raw.walkableClimb}bmin(e){return this.raw.get_bmin(e)}bmax(e){return this.raw.get_bmax(e)}bvQuantFactor(){return this.raw.bvQuantFactor}}class Mu{constructor(e){this.raw=e}firstLink(){return this.raw.firstLink}verts(e){return this.raw.get_verts(e)}neis(e){return this.raw.get_neis(e)}flags(){return this.raw.flags}vertCount(){return this.raw.vertCount}areaAndType(){return this.raw.get_areaAndtype()}getType(){return this.raw.getType()}}class as{constructor(e){this.raw=e}salt(){return this.raw.salt}linksFreeList(){return this.raw.linksFreeList}header(){return X.isNull(this.raw.header)?null:new RM(this.raw.header)}polys(e){return new Mu(this.raw.get_polys(e))}verts(e){return this.raw.get_verts(e)}links(e){return new TM(this.raw.get_links(e))}detailMeshes(e){return new EM(this.raw.get_detailMeshes(e))}detailVerts(e){return this.raw.get_detailVerts(e)}detailTris(e){return this.raw.get_detailTris(e)}bvTree(e){return new AM(this.raw.get_bvTree(e))}offMeshCons(e){return new E0(this.raw.get_offMeshCons(e))}data(e){return this.raw.get_data(e)}dataSize(){return this.raw.dataSize}flags(){return this.raw.flags}next(){return new as(this.raw.next)}}const CM=i=>{const e=X.DetourNavMeshBuilder.createNavMeshData(i.raw);return{success:e.success,navMeshData:go.fromRaw(e.navMeshData)}};class PM{constructor(e){this.raw=e??new X.Module.dtNavMeshCreateParams}setPolyMeshCreateParams(e){X.DetourNavMeshBuilder.setPolyMeshCreateParams(this.raw,e.raw)}setPolyMeshDetailCreateParams(e){X.DetourNavMeshBuilder.setPolyMeshDetailCreateParams(this.raw,e.raw)}setOffMeshConnections(e){if(e.length<=0)return;const t=[],n=[],s=[],r=[],o=[],a=[];for(let c=0;c<e.length;c++){const l=e[c];t.push(l.startPosition.x,l.startPosition.y,l.startPosition.z),t.push(l.endPosition.x,l.endPosition.y,l.endPosition.z),n.push(l.radius),s.push(l.bidirectional?1:0),r.push(l.area??0),o.push(l.flags??1),a.push(l.userId??1e3+c)}X.DetourNavMeshBuilder.setOffMeshConnections(this.raw,e.length,t,n,s,r,o,a)}verts(e){return this.raw.get_verts(e)}setVerts(e,t){this.raw.set_verts(e,t)}vertCount(){return this.raw.vertCount}polys(e){return this.raw.get_polys(e)}setPolys(e,t){this.raw.set_polys(e,t)}polyAreas(e){return this.raw.get_polyAreas(e)}setPolyAreas(e,t){this.raw.set_polyAreas(e,t)}polyFlags(e){return this.raw.get_polyFlags(e)}setPolyFlags(e,t){this.raw.set_polyFlags(e,t)}polyCount(){return this.raw.polyCount}nvp(){return this.raw.nvp}setNvp(e){this.raw.nvp=e}detailMeshes(e){return this.raw.get_detailMeshes(e)}setDetailMeshes(e,t){this.raw.set_detailMeshes(e,t)}detailVerts(e){return this.raw.get_detailVerts(e)}setDetailVerts(e,t){this.raw.set_detailVerts(e,t)}detailVertsCount(){return this.raw.detailVertsCount}detailTris(e){return this.raw.get_detailTris(e)}setDetailTris(e,t){this.raw.set_detailTris(e,t)}detailTriCount(){return this.raw.detailTriCount}offMeshConVerts(e){return this.raw.get_offMeshConVerts(e)}offMeshConRad(e){return this.raw.get_offMeshConRad(e)}offMeshConDir(e){return this.raw.get_offMeshConDir(e)}offMeshConAreas(e){return this.raw.get_offMeshConAreas(e)}offMeshConFlags(e){return this.raw.get_offMeshConFlags(e)}offMeshConUserID(e){return this.raw.get_offMeshConUserID(e)}offMeshConCount(){return this.raw.offMeshConCount}userId(){return this.raw.userId}tileX(){return this.raw.tileX}setTileX(e){this.raw.tileX=e}tileY(){return this.raw.tileY}setTileY(e){this.raw.tileY=e}tileLayer(){return this.raw.tileLayer}setTileLayer(e){this.raw.tileLayer=e}boundsMin(){return Tn(e=>this.raw.get_bmin(e),3)}setBoundsMin(e){this.raw.set_bmin(0,e[0]),this.raw.set_bmin(1,e[1]),this.raw.set_bmin(2,e[2])}boundsMax(){return Tn(e=>this.raw.get_bmax(e),3)}setBoundsMax(e){this.raw.set_bmax(0,e[0]),this.raw.set_bmax(1,e[1]),this.raw.set_bmax(2,e[2])}walkableHeight(){return this.raw.walkableHeight}setWalkableHeight(e){this.raw.walkableHeight=e}walkableRadius(){return this.raw.walkableRadius}setWalkableRadius(e){this.raw.walkableRadius=e}walkableClimb(){return this.raw.walkableClimb}setWalkableClimb(e){this.raw.walkableClimb=e}cellSize(){return this.raw.cs}setCellSize(e){this.raw.cs=e}cellHeight(){return this.raw.ch}setCellHeight(e){this.raw.ch=e}buildBvTree(){return this.raw.buildBvTree}setBuildBvTree(e){this.raw.buildBvTree=e}}class IM{get includeFlags(){return this.raw.getIncludeFlags()}set includeFlags(e){this.raw.setIncludeFlags(e)}get excludeFlags(){return this.raw.getExcludeFlags()}set excludeFlags(e){this.raw.setExcludeFlags(e)}constructor(e){this.raw=e??new X.Module.dtQueryFilter}getAreaCost(e){return this.raw.getAreaCost(e)}setAreaCost(e,t){this.raw.setAreaCost(e,t)}}class DM{defaultQueryHalfExtents={x:1,y:1,z:1};constructor(e,t){e instanceof X.Module.NavMeshQuery?this.raw=e:(this.raw=new X.Module.NavMeshQuery,this.raw.init(e.raw,t?.maxNodes??2048)),t?.defaultQueryFilter?this.defaultFilter=t.defaultQueryFilter:(this.defaultFilter=new IM,this.defaultFilter.includeFlags=65535,this.defaultFilter.excludeFlags=0)}findNearestPoly(e,t){const n=new X.UnsignedIntRef,s=new X.Vec3,r=new X.BoolRef,o=this.raw.findNearestPoly(mt.toArray(e),mt.toArray(t?.halfExtents??this.defaultQueryHalfExtents),t?.filter?.raw??this.defaultFilter.raw,n,s,r),a=mt.fromRaw(s);X.destroy(s);const c=n.value;X.destroy(n);const l=r.value;return X.destroy(r),{success:zn(o),status:o,nearestRef:c,nearestPoint:a,isOverPoly:l}}findPolysAroundCircle(e,t,n,s){const r=s?.filter??this.defaultFilter,o=s?.maxPolys??256,a=new Ni,c=new Ni,l=new lo;a.resize(o),c.resize(o),l.resize(o);const h=new X.IntRef,u=this.raw.findPolysAroundCircle(e,mt.toArray(t),n,r.raw,a.raw,c.raw,l.raw,h,o),f=[...a.getHeapView()];a.destroy();const p=[...c.getHeapView()];c.destroy();const _=[...l.getHeapView()];l.destroy();const y=h.value;return X.destroy(h),{success:zn(u),status:u,resultRefs:f,resultParents:p,resultCost:_,resultCount:y}}queryPolygons(e,t,n){const s=n?.filter??this.defaultFilter,r=n?.maxPolys??256,o=new Ni;o.resize(r);const a=new X.IntRef,c=this.raw.queryPolygons(mt.toArray(e),mt.toArray(t),s.raw,o.raw,a,r),l=a.value;X.destroy(a);const h=[...o.getHeapView()].slice(0,l);return o.destroy(),{success:zn(c),status:c,polyRefs:h}}closestPointOnPoly(e,t){const n=new X.Vec3,s=new X.BoolRef,r=this.raw.closestPointOnPoly(e,mt.toArray(t),n,s),o=mt.fromRaw(n);X.destroy(n);const a=s.value;return X.destroy(s),{success:zn(r),status:r,closestPoint:o,isPointOverPoly:a}}findClosestPoint(e,t){const n=t?.filter??this.defaultFilter,s=t?.halfExtents??this.defaultQueryHalfExtents,r=new X.UnsignedIntRef,o=new X.Vec3,a=new X.BoolRef,c=this.raw.findClosestPoint(mt.toArray(e),mt.toArray(s),n.raw,r,o,a),l=r.value;X.destroy(r);const h=mt.fromRaw(o);X.destroy(o);const u=a.value;return X.destroy(a),{success:zn(c),status:c,polyRef:l,point:h,isPointOverPoly:u}}findRandomPointAroundCircle(e,t,n){const s=n?.filter??this.defaultFilter,r=n?.halfExtents??this.defaultQueryHalfExtents;let o;if(n?.startRef)o=n.startRef;else{const f=this.findNearestPoly(e,{filter:s,halfExtents:r});if(!f.success)return{success:!1,status:f.status,randomPolyRef:0,randomPoint:{x:0,y:0,z:0}};o=f.nearestRef}const a=new X.UnsignedIntRef,c=new X.Vec3,l=this.raw.findRandomPointAroundCircle(o,mt.toArray(e),t,s.raw,a,c),h=a.value;X.destroy(a);const u=mt.fromRaw(c);return X.destroy(c),{success:zn(l),status:l,randomPolyRef:h,randomPoint:u}}moveAlongSurface(e,t,n,s){const r=s?.maxVisitedSize??256,o=new X.Vec3,a=new Ni,c=s?.filter?.raw??this.defaultFilter.raw,l=this.raw.moveAlongSurface(e,mt.toArray(t),mt.toArray(n),c,o,a.raw,r),h=mt.fromRaw(o);X.destroy(o);const u=[...a.getHeapView()];return a.destroy(),{success:zn(l),status:l,resultPosition:h,visited:u}}findRandomPoint(e){const t=new X.UnsignedIntRef,n=new X.Vec3,s=this.raw.findRandomPoint(e?.filter?.raw??this.defaultFilter.raw,t,n),r=t.value;X.destroy(t);const o=mt.fromRaw(n);return X.destroy(n),{success:zn(s),status:s,randomPolyRef:r,randomPoint:o}}getPolyHeight(e,t){const n=new X.FloatRef,s=this.raw.getPolyHeight(e,mt.toArray(t),n),r=n.value;return X.destroy(n),{success:zn(s),status:s,height:r}}computePath(e,t,n){const s=n?.filter??this.defaultFilter,r=n?.halfExtents??this.defaultQueryHalfExtents,o=this.findNearestPoly(e,{filter:s,halfExtents:r});if(!o.success)return{success:!1,error:{name:"findNearestPoly for start position failed",status:o.status},path:[]};const a=this.findNearestPoly(t,{filter:s,halfExtents:r});if(!a.success)return{success:!1,error:{name:"findNearestPoly for end position failed",status:a.status},path:[]};const c=o.nearestRef,l=a.nearestRef,h=n?.maxPathPolys??256,u=this.findPath(c,l,e,t,{filter:s,maxPathPolys:h});if(!u.success)return{success:!1,error:{name:"findPath unsuccessful",status:u.status},path:[]};if(u.polys.size<=0)return{success:!1,error:{name:"no polygon path found"},path:[]};const f=u.polys.get(u.polys.size-1);let p={x:t.x,y:t.y,z:t.z};if(f!==l){const b=this.closestPointOnPoly(f,t);if(!b.success)return{success:!1,error:{name:"no closest point on last polygon found",status:b.status},path:[]};p=b.closestPoint}const _=n?.maxStraightPathPoints,y=this.findStraightPath(e,p,u.polys,{maxStraightPathPoints:_});if(!y.success)return{success:!1,error:{name:"findStraightPath unsuccessful",status:y.status},path:[]};const{straightPath:x,straightPathCount:m}=y,S=[];for(let b=0;b<m;b++)S.push({x:x.get(b*3),y:x.get(b*3+1),z:x.get(b*3+2)});return u.polys.destroy(),y.straightPath.destroy(),y.straightPathFlags.destroy(),y.straightPathRefs.destroy(),{success:!0,path:S}}findPath(e,t,n,s,r){const o=r?.filter??this.defaultFilter,a=r?.maxPathPolys??256,c=new Ni;c.resize(a);const l=this.raw.findPath(e,t,mt.toArray(n),mt.toArray(s),o.raw,c.raw,a);return{success:zn(l),status:l,polys:c}}findStraightPath(e,t,n,s){const r=s?.maxStraightPathPoints??256,o=s?.straightPathOptions??0;let a;Array.isArray(n)?(a=new Ni,a.copy(n)):a=n;const c=new lo;c.resize(r*3);const l=new go;l.resize(r);const h=new Ni;h.resize(r);const u=new X.IntRef,f=this.raw.findStraightPath(mt.toArray(e),mt.toArray(t),a.raw,c.raw,l.raw,h.raw,u,r,o),p=u.value;return X.destroy(u),Array.isArray(n)&&a.destroy(),{success:zn(f),status:f,straightPath:c,straightPathFlags:l,straightPathRefs:h,straightPathCount:p}}raycast(e,t,n,s){const r=new X.Module.dtRaycastHit,o=s?.raycastOptions??0,a=s?.prevRef??0,c=s?.filter?.raw??this.defaultFilter.raw,l=this.raw.raycast(e,mt.toArray(t),mt.toArray(n),c,o,r,a),h={success:zn(l),status:l,t:r.t,hitNormal:mt.fromArray(Tn(u=>r.get_hitNormal(u),3)),hitEdgeIndex:r.hitEdgeIndex,path:Tn(u=>r.get_path(u),r.pathCount),maxPath:r.maxPath,pathCost:r.pathCost};return X.destroy(r),h}destroy(){this.raw.destroy()}}class LM{constructor(e){this.raw=e}tiles(e){return new as(this.raw.get_tiles(e))}tileCount(){return this.raw.tileCount}}class UM{constructor(e){this.raw=e}data(){return Tn(e=>this.raw.get_data(e),this.raw.dataSize)}dataSize(){return this.raw.dataSize}}class NM{constructor(e){this.raw=e}tileX(){return this.raw.tileX}tileY(){return this.raw.tileY}}class OM{constructor(e){this.raw=e}data(){return Tn(e=>this.raw.get_data(e),this.raw.dataSize)}dataSize(){return this.raw.dataSize}}class FM{constructor(e){this.raw=e??new X.Module.NavMesh}initSolo(e){return this.raw.initSolo(e.raw)}initTiled(e){return this.raw.initTiled(e.raw)}addTile(e,t,n){const s=new X.UnsignedIntRef,r=this.raw.addTile(e.raw,t,n,s),o=s.value;return X.destroy(s),{status:r,tileRef:o}}decodePolyId(e){const t=new X.UnsignedIntRef,n=new X.UnsignedIntRef,s=new X.UnsignedIntRef;this.raw.decodePolyId(e,t,n,s);const r=t.value;X.destroy(t);const o=n.value;X.destroy(n);const a=s.value;return X.destroy(s),{tileSalt:r,tileIndex:o,tilePolygonIndex:a}}encodePolyId(e,t,n){return this.raw.encodePolyId(e,t,n)}removeTile(e){return new UM(this.raw.removeTile(e))}calcTileLoc(e){return new NM(this.raw.calcTileLoc(mt.toArray(e)))}getTileAt(e,t,n){const s=this.raw.getTileAt(e,t,n);return X.isNull(s)?null:new as(s)}getTilesAt(e,t,n){return new LM(this.raw.getTilesAt(e,t,n))}getTileRefAt(e,t,n){return this.raw.getTileRefAt(e,t,n)}getTileRef(e){return this.raw.getTileRef(e.raw)}getTileByRef(e){const t=this.raw.getTileByRef(e);return X.isNull(t)?null:new as(t)}getMaxTiles(){return this.raw.getMaxTiles()}getTile(e){return new as(this.raw.getTile(e))}getTileAndPolyByRef(e){const t=this.raw.getTileAndPolyByRef(e),n=new as(t.tile),s=new Mu(t.poly);return{success:zn(t.status),status:t.status,tile:n,poly:s}}getTileAndPolyByRefUnsafe(e){const t=this.raw.getTileAndPolyByRef(e),n=new as(t.tile),s=new Mu(t.poly);return{tile:n,poly:s}}isValidPolyRef(e){return this.raw.isValidPolyRef(e)}getPolyRefBase(e){return this.raw.getPolyRefBase(e.raw)}getOffMeshConnectionPolyEndPoints(e,t){const n=new X.Vec3,s=new X.Vec3,r=this.raw.getOffMeshConnectionPolyEndPoints(e,t,n,s),o=mt.fromRaw(n);X.destroy(n);const a=mt.fromRaw(s);return X.destroy(s),{success:zn(r),status:r,start:o,end:a}}getOffMeshConnectionByRef(e){return new E0(this.raw.getOffMeshConnectionByRef(e))}setPolyFlags(e,t){return this.raw.setPolyFlags(e,t)}getPolyFlags(e){const t=new X.UnsignedShortRef,n=this.raw.getPolyFlags(e,t),s=t.value;return X.destroy(t),{status:n,flags:s}}setPolyArea(e,t){return this.raw.setPolyArea(e,t)}getPolyArea(e){const t=new X.UnsignedCharRef,n=this.raw.getPolyArea(e,t),s=t.value;return X.destroy(t),{status:n,area:s}}getTileStateSize(e){return this.raw.getTileStateSize(e.raw)}storeTileState(e,t){return new OM(this.raw.storeTileState(e.raw,t))}restoreTileState(e,t,n){return this.raw.restoreTileState(e.raw,t,n)}destroy(){this.raw.destroy(),X.Module.destroy(this.raw)}}const T0={borderSize:0,tileSize:0,cs:.2,ch:.2,walkableSlopeAngle:60,walkableHeight:2,walkableClimb:2,walkableRadius:.5,maxEdgeLen:12,maxSimplificationError:1.3,minRegionArea:8,mergeRegionArea:20,maxVertsPerPoly:6,detailSampleDist:6,detailSampleMaxError:1},BM=i=>{const e={...T0,...i},t=new X.Module.rcConfig;return t.borderSize=e.borderSize,t.tileSize=e.tileSize,t.cs=e.cs,t.ch=e.ch,t.walkableSlopeAngle=e.walkableSlopeAngle,t.walkableHeight=e.walkableHeight,t.walkableClimb=e.walkableClimb,t.walkableRadius=e.walkableRadius,t.maxEdgeLen=e.maxEdgeLen,t.maxSimplificationError=e.maxSimplificationError,t.minRegionArea=e.minRegionArea,t.mergeRegionArea=e.mergeRegionArea,t.maxVertsPerPoly=e.maxVertsPerPoly,t.detailSampleDist=e.detailSampleDist,t.detailSampleMaxError=e.detailSampleMaxError,t};class zM{logs=[];startTimes={};accumulatedTimes={};constructor(e=!0){const t=new X.Module.RecastBuildContextImpl;t.log=(n,s,r)=>{if(!this.raw.logEnabled())return;const o=s,a=new Uint8Array(X.Module.HEAPU8.buffer,o,r),c=new Uint8Array(r);c.set(a);const l=new TextDecoder().decode(c);this.log(n,l)},t.resetLog=()=>{this.resetLog()},t.startTimer=n=>{this.raw.timerEnabled()&&this.startTimer(n)},t.stopTimer=n=>{this.raw.timerEnabled()&&this.stopTimer(n)},t.getAccumulatedTime=n=>this.raw.timerEnabled()?this.getAccumulatedTime(n):-1,t.resetTimers=()=>{this.raw.timerEnabled()&&(this.startTimes={},this.accumulatedTimes={})},this.raw=new X.Module.RecastBuildContext(t),this.raw.enableTimer(e),this.raw.enableLog(e),this.resetTimers()}log(e,t){this.logs.push({category:e,msg:t})}resetLog(){this.logs=[]}startTimer(e){this.startTimes[e]=performance.now()}stopTimer(e){const n=performance.now()-this.startTimes[e];this.accumulatedTimes[e]===-1?this.accumulatedTimes[e]=n:this.accumulatedTimes[e]+=n}getAccumulatedTime(e){return this.accumulatedTimes[e]}resetTimers(){for(let e=0;e<rt.RC_MAX_TIMERS;e++)this.startTimes[e]=-1,this.accumulatedTimes[e]=-1}}class uo{constructor(e){this.raw=e}smin(){return this.raw.smin}smax(){return this.raw.smax}area(){return this.raw.area}next(){return X.isNull(this.raw.next)?null:new uo(this.raw.next)}}class ih{constructor(e){this.raw=e}next(){return X.isNull(this.raw.next)?null:new ih(this.raw.next)}items(e){return new uo(this.raw.get_items(e))}}class kM{constructor(e){this.raw=e}width(){return this.raw.width}height(){return this.raw.height}bmin(){return mt.fromArray(Tn(e=>this.raw.get_bmin(e),3))}bmax(){return mt.fromArray(Tn(e=>this.raw.get_bmax(e),3))}cs(){return this.raw.cs}ch(){return this.raw.ch}spans(e){return new uo(this.raw.get_spans(e))}pools(e){return new ih(this.raw.get_pools(e))}freelist(e){return new uo(this.raw.get_freelist(e))}}class VM{constructor(e){this.raw=e}index(){return this.raw.get_index()}count(){return this.raw.get_count()}}class HM{constructor(e){this.raw=e}y(){return this.raw.get_y()}reg(){return this.raw.get_reg()}con(){return this.raw.get_con()}h(){return this.raw.get_h()}}class GM{constructor(e){this.raw=e}width(){return this.raw.width}height(){return this.raw.height}spanCount(){return this.raw.spanCount}walkableHeight(){return this.raw.walkableHeight}walkableClimb(){return this.raw.walkableClimb}borderSize(){return this.raw.borderSize}maxDistance(){return this.raw.maxDistance}maxRegions(){return this.raw.maxRegions}bmin(){return mt.fromArray(Tn(e=>this.raw.get_bmin(e),3))}bmax(){return mt.fromArray(Tn(e=>this.raw.get_bmax(e),3))}cs(){return this.raw.cs}ch(){return this.raw.ch}cells(e){return new VM(this.raw.get_cells(e))}spans(e){return new HM(this.raw.get_spans(e))}dist(e){return this.raw.get_dist(e)}areas(e){return this.raw.get_areas(e)}}class WM{constructor(e){this.raw=e}verts(e){return this.raw.get_verts(e)}nverts(){return this.raw.nverts}rverts(e){return this.raw.get_rverts(e)}nrverts(){return this.raw.nrverts}reg(){return this.raw.reg}area(){return this.raw.area}}class XM{constructor(e){this.raw=e}conts(e){return new WM(this.raw.get_conts(e))}nconts(){return this.raw.nconts}bmin(){return mt.fromArray(Tn(e=>this.raw.get_bmin(e),3))}bmax(){return mt.fromArray(Tn(e=>this.raw.get_bmax(e),3))}cs(){return this.raw.cs}ch(){return this.raw.ch}width(){return this.raw.width}height(){return this.raw.height}borderSize(){return this.raw.borderSize}maxError(){return this.raw.maxError}}class qM{constructor(e){this.raw=e}verts(e){return this.raw.get_verts(e)}polys(e){return this.raw.get_polys(e)}regs(e){return this.raw.get_regs(e)}flags(e){return this.raw.get_flags(e)}setFlags(e,t){this.raw.set_flags(e,t)}areas(e){return this.raw.get_areas(e)}setAreas(e,t){this.raw.set_areas(e,t)}nverts(){return this.raw.nverts}npolys(){return this.raw.npolys}maxpolys(){return this.raw.maxpolys}nvp(){return this.raw.nvp}bmin(){return mt.fromArray(Tn(e=>this.raw.get_bmin(e),3))}bmax(){return mt.fromArray(Tn(e=>this.raw.get_bmax(e),3))}cs(){return this.raw.cs}ch(){return this.raw.ch}borderSize(){return this.raw.borderSize}maxEdgeError(){return this.raw.maxEdgeError}}class $M{constructor(e){this.raw=e}meshes(e){return this.raw.get_meshes(e)}verts(e){return this.raw.get_verts(e)}tris(e){return this.raw.get_tris(e)}nmeshes(){return this.raw.nmeshes}nverts(){return this.raw.nverts}ntris(){return this.raw.ntris}}const YM=(i,e,t)=>X.Recast.calcGridSize(i,e,t),jM=(i,e,t,n,s,r,o,a)=>X.Recast.createHeightfield(i.raw,e.raw,t,n,s,r,o,a),KM=(i,e,t,n,s,r,o)=>X.Recast.markWalkableTriangles(i.raw,e,t.raw,n,s.raw,r,o.raw),ZM=(i,e,t,n,s,r,o,a=1)=>X.Recast.rasterizeTriangles(i.raw,e.raw,t,n.raw,s.raw,r,o.raw,a),JM=(i,e,t)=>X.Recast.filterLowHangingWalkableObstacles(i.raw,e,t.raw),QM=(i,e,t,n)=>X.Recast.filterLedgeSpans(i.raw,e,t,n.raw),eE=(i,e,t)=>X.Recast.filterWalkableLowHeightSpans(i.raw,e,t.raw),tE=(i,e,t,n,s)=>X.Recast.buildCompactHeightfield(i.raw,e,t,n.raw,s.raw),nE=(i,e,t)=>X.Recast.erodeWalkableArea(i.raw,e,t.raw),iE=(i,e)=>X.Recast.buildDistanceField(i.raw,e.raw),sE=(i,e,t,n,s)=>X.Recast.buildRegions(i.raw,e.raw,t,n,s),rE=(i,e,t,n,s,r=rt.RC_CONTOUR_TESS_WALL_EDGES)=>X.Recast.buildContours(i.raw,e.raw,t,n,s.raw,r),oE=(i,e,t,n)=>X.Recast.buildPolyMesh(i.raw,e.raw,t,n.raw),aE=(i,e,t,n,s,r)=>X.Recast.buildPolyMeshDetail(i.raw,e.raw,t.raw,n,s,r.raw),cE=()=>new kM(X.Recast.allocHeightfield()),wd=i=>X.Recast.freeHeightfield(i.raw),lE=()=>new GM(X.Recast.allocCompactHeightfield()),Md=i=>X.Recast.freeCompactHeightfield(i.raw),uE=()=>new XM(X.Recast.allocContourSet()),Ed=i=>X.Recast.freeContourSet(i.raw),hE=()=>new qM(X.Recast.allocPolyMesh()),fE=i=>X.Recast.freePolyMesh(i.raw),dE=()=>new $M(X.Recast.allocPolyMeshDetail()),pE=i=>X.Recast.freePolyMeshDetail(i.raw),mE=(i,e)=>{const t={x:1/0,y:1/0,z:1/0},n={x:-1/0,y:-1/0,z:-1/0};for(let s=0;s<e.length;s++){const r=e[s],o=i[r*3],a=i[r*3+1],c=i[r*3+2];t.x=Math.min(t.x,o),t.y=Math.min(t.y,a),t.z=Math.min(t.z,c),n.x=Math.max(n.x,o),n.y=Math.max(n.y,a),n.z=Math.max(n.z,c)}return{bbMin:mt.toArray(t),bbMax:mt.toArray(n)}},gE={...T0,buildBvTree:!0},xE=(i,e,t={},n=!1)=>{const s=new zM,r={type:"solo",buildContext:s},o=()=>{n||(r.heightfield&&(wd(r.heightfield),r.heightfield=void 0),r.compactHeightfield&&(Md(r.compactHeightfield),r.compactHeightfield=void 0),r.contourSet&&(Ed(r.contourSet),r.contourSet=void 0),r.polyMesh&&(fE(r.polyMesh),r.polyMesh=void 0),r.polyMeshDetail&&(pE(r.polyMeshDetail),r.polyMeshDetail=void 0))},a=N=>(o(),{navMeshData:void 0,success:!1,intermediates:r,error:N}),c=i,l=e.length,h=new bM;h.copy(c);const u=e,f=e.length/3,p=new wM;p.copy(u);let _,y;if(t.bounds)_=t.bounds[0],y=t.bounds[1];else{const N=mE(i,e);_=N.bbMin,y=N.bbMax}const x={...gE,...t},m=BM(x);m.minRegionArea=m.minRegionArea*m.minRegionArea,m.mergeRegionArea=m.mergeRegionArea*m.mergeRegionArea,m.detailSampleDist=m.detailSampleDist<.9?0:m.cs*m.detailSampleDist,m.detailSampleMaxError=m.ch*m.detailSampleMaxError;const S=YM(_,y,m.cs);m.width=S.width,m.height=S.height;const b=cE();if(r.heightfield=b,!jM(s,b,m.width,m.height,_,y,m.cs,m.ch))return a("Could not create heightfield");const w=new MM;if(w.resize(f),KM(s,m.walkableSlopeAngle,h,l,p,f,w),!ZM(s,h,l,p,w,f,b,m.walkableClimb))return a("Could not rasterize triangles");w.destroy(),h.destroy(),p.destroy(),JM(s,m.walkableClimb,b),QM(s,m.walkableHeight,m.walkableClimb,b),eE(s,m.walkableHeight,b);const T=lE();if(r.compactHeightfield=T,!tE(s,m.walkableHeight,m.walkableClimb,b,T))return a("Failed to build compact data");if(n||(wd(b),r.heightfield=void 0),!nE(s,m.walkableRadius,T))return a("Failed to erode walkable area");if(!iE(s,T))return a("Failed to build distance field");if(!sE(s,T,m.borderSize,m.minRegionArea,m.mergeRegionArea))return a("Failed to build regions");const R=uE();if(r.contourSet=R,!rE(s,T,m.maxSimplificationError,m.maxEdgeLen,R,rt.RC_CONTOUR_TESS_WALL_EDGES))return a("Failed to create contours");const L=hE();if(r.polyMesh=L,!oE(s,R,m.maxVertsPerPoly,L))return a("Failed to triangulate contours");const U=dE();if(r.polyMeshDetail=U,!aE(s,L,T,m.detailSampleDist,m.detailSampleMaxError,U))return a("Failed to build detail mesh");n||(Md(T),r.compactHeightfield=void 0,Ed(R),r.contourSet=void 0);for(let N=0;N<L.npolys();N++)L.areas(N)===rt.RC_WALKABLE_AREA&&L.setAreas(N,0),L.areas(N)===0&&L.setFlags(N,1);const E=new PM;E.setPolyMeshCreateParams(L),E.setPolyMeshDetailCreateParams(U),E.setWalkableHeight(m.walkableHeight*m.ch),E.setWalkableRadius(m.walkableRadius*m.cs),E.setWalkableClimb(m.walkableClimb*m.ch),E.setCellSize(m.cs),E.setCellHeight(m.ch),E.setBuildBvTree(x.buildBvTree),t.offMeshConnections&&E.setOffMeshConnections(t.offMeshConnections);const M=CM(E);return M.success?(o(),{navMeshData:M.navMeshData,success:!0,intermediates:r}):a("Failed to create Detour navmesh data")},_E=(i,e,t={},n=!1)=>{if(!X.Module)throw new Error('"init" must be called before using any recast-navigation-js APIs. See: https://github.com/isaac-mason/recast-navigation-js?tab=readme-ov-file#initialization');const s=xE(i,e,t,n);if(!s.success)return{navMesh:void 0,success:!1,intermediates:s.intermediates,error:s.error};const{navMeshData:r}=s,o=new FM;return o.initSolo(r)?{success:!0,navMesh:o,intermediates:s.intermediates}:(r.destroy(),{navMesh:void 0,success:!1,intermediates:s.intermediates,error:"Failed to initialize solo NavMesh"})};let ml=null;function yE(){return ml||(ml=SM()),ml}function vE(i){const e=i.getAttribute("position"),t=i.index;if(!e)return{positions:[],indices:[]};const n=Array.from(e.array),s=t?Array.from(t.array):Array.from({length:e.count},(r,o)=>o);return{positions:n,indices:s}}class SE{constructor(){this.ready=!1,this.navMesh=null,this.query=null,this.buildToken=0}async initialize(e){this.destroy(),this.buildToken+=1;const t=this.buildToken;if(!e||(await yE(),t!==this.buildToken))return!1;const{positions:n,indices:s}=vE(e);if(n.length===0||s.length===0)return!1;const{success:r,navMesh:o}=_E(n,s,{cs:.2,ch:.2,walkableSlopeAngle:55,walkableHeight:10,walkableClimb:4,walkableRadius:2,maxEdgeLen:20,maxSimplificationError:1.15,minRegionArea:12,mergeRegionArea:24,maxVertsPerPoly:6,detailSampleDist:4,detailSampleMaxError:.8});return!r||t!==this.buildToken?(o?.destroy?.(),!1):(this.navMesh=o,this.query=new DM(o),this.query.defaultQueryHalfExtents={x:4,y:6,z:4},this.ready=!0,!0)}projectPoint(e){if(!this.ready||!this.query)return null;const t=this.query.findClosestPoint(e);return t.success?t.point:null}getRandomPointAround(e,t){if(!this.ready||!this.query)return null;const n=this.query.findRandomPointAroundCircle(e,t);return n.success?n.randomPoint:null}getRandomPoint(){if(!this.ready||!this.query)return null;const e=this.query.findRandomPoint();return e.success?e.randomPoint:null}computePath(e,t){if(!this.ready||!this.query)return[];const n=this.query.computePath(e,t,{maxPathPolys:512,maxStraightPathPoints:512});return n.success?n.path:[]}destroy(){this.ready=!1,this.query?.destroy?.(),this.navMesh?.destroy?.(),this.query=null,this.navMesh=null}}function Td(i){i&&i.traverse(e=>{e.geometry?.dispose?.(),(Array.isArray(e.material)?e.material:e.material?[e.material]:[]).forEach(n=>{if(n){for(const s of Object.values(n))s?.isTexture&&s.dispose?.();n.dispose?.()}})})}function Ad(){return new Promise(i=>{requestAnimationFrame(()=>i())})}class sh{constructor({map:e,mapId:t,collisionWorld:n,navigationManager:s,playerController:r,roundManager:o,weaponManager:a,utilityManager:c,networkClient:l,targetManager:h}){this.map=e,this.mapId=t,this.collisionWorld=n,this.navigationManager=s,this.playerController=r,this.roundManager=o,this.weaponManager=a,this.utilityManager=c,this.networkClient=l,this.targetManager=h}static async create({mapOption:e,camera:t,input:n,scene:s,audioManager:r,mouseSensitivity:o,onStatusChange:a}){a?.(`Loading ${e.label}...`),await Ad();const c=e.create();try{a?.(`Generating navmesh for ${e.label}...`),await Ad();const l=new SE;await l.initialize(c.collisionGeometry);const h=new Db({groundHeight:c.groundHeight,collisionGeometry:c.collisionGeometry}),u=new sh({map:c,mapId:e.id,collisionWorld:h,navigationManager:l,playerController:null,roundManager:new Fb,weaponManager:null,utilityManager:new ew,networkClient:new pM,targetManager:new mM(c.targets)});return u.weaponManager=new Qb({camera:t,scene:s,shootables:c.shootables,audioManager:r}),u.playerController=new Ob(t,n,{position:c.spawnPoint,groundHeight:c.groundHeight,collisionWorld:h,mouseSensitivity:o,getSpeedMultiplier:()=>u.weaponManager?.getMovementSpeedMultiplier()??1}),u.networkClient.initializeLocalPlayer({position:{x:c.spawnPoint.x,y:c.spawnPoint.y,z:c.spawnPoint.z},yaw:u.playerController.yawAngle,isGrounded:u.playerController.isGrounded,isCrouched:u.playerController.isCrouched,currentHeight:u.playerController.currentHeight}),u}catch(l){throw c.dispose?.(),c.collisionGeometry?.dispose?.(),Td(c.scene),l}}attachToScene(e){e.add(this.map.scene),e.add(this.playerController.getObject())}detachFromScene(e){e.remove(this.map.scene),e.remove(this.playerController.getObject())}destroy(e){this.weaponManager?.destroy(),this.targetManager?.destroy?.(),this.networkClient?.destroy?.(),this.detachFromScene(e),this.navigationManager?.destroy(),this.map.dispose?.(),this.map.collisionGeometry?.dispose?.(),Td(this.map.scene)}}const bE=[{label:"Move",value:"WASD"},{label:"Jump",value:"Space"},{label:"Run",value:"Shift"},{label:"Crouch",value:"Ctrl / C"},{label:"Fire",value:"Left click"},{label:"Scope",value:"Right click"},{label:"Weapons",value:"1 rifle, 2 sniper"},{label:"Pause",value:"Escape"}];function wE({parent:i,onResume:e,onSelectMap:t,maps:n=[],onSelectSkybox:s,skyboxes:r=[],onSensitivityChange:o,onVolumeChange:a,getMasterVolume:c,getMouseSensitivity:l}){let h=null,u=null,f=null,p=null;const _=document.createElement("div");_.className="hud__pause";const y=()=>Math.round((l?.()??.0011)/.0022*100);_.innerHTML=`
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
          <span class="hud__slider-value">${y()}</span>
        </span>
        <input class="hud__sensitivity-slider" type="range" min="1" max="100" step="1" value="${y()}" />
      </label>
      <button class="hud__pause-button hud__pause-button--secondary" type="button" data-action="bindings">Key Bindings</button>
      <button class="hud__pause-button hud__pause-button--secondary" type="button" data-action="maps">Maps</button>
      <button class="hud__pause-button hud__pause-button--secondary" type="button" data-action="skyboxes">Skyboxes</button>
      <div class="hud__bindings">
        ${bE.map(Q=>`<div><strong>${Q.label}</strong>: ${Q.value}</div>`).join("")}
      </div>
      <div class="hud__maps">
        ${n.map(Q=>`
          <button
            class="hud__map-option"
            type="button"
            data-map-id="${Q.id}"
          >${Q.label}</button>
        `).join("")}
      </div>
      <div class="hud__skyboxes">
        ${r.map(Q=>`
          <button
            class="hud__skybox-option"
            type="button"
            data-skybox-id="${Q.id}"
          >${Q.label}</button>
        `).join("")}
      </div>
    </div>
  `,i.appendChild(_);const x=_.querySelector(".hud__bindings"),m=_.querySelector(".hud__maps"),S=_.querySelector(".hud__skyboxes"),b=_.querySelector('[data-action="resume"]'),w=_.querySelector(".hud__volume-slider"),T=_.querySelector(".hud__sensitivity-slider"),R=_.querySelector(".hud__slider-value"),L=_.querySelector('[data-action="bindings"]'),U=_.querySelector('[data-action="maps"]'),E=_.querySelector('[data-action="skyboxes"]'),M=[..._.querySelectorAll("[data-map-id]")],N=[..._.querySelectorAll("[data-skybox-id]")],B=()=>e?.(),C=Q=>{a?.(Number(Q.currentTarget.value)/100)},F=Q=>{const xe=Number(Q.currentTarget.value);R.textContent=String(xe),o?.(xe/100*.0022)},k=()=>{x.classList.toggle("hud__bindings--visible"),m.classList.remove("hud__maps--visible"),S.classList.remove("hud__skyboxes--visible")},V=()=>{m.classList.toggle("hud__maps--visible"),x.classList.remove("hud__bindings--visible"),S.classList.remove("hud__skyboxes--visible")},q=()=>{S.classList.toggle("hud__skyboxes--visible"),x.classList.remove("hud__bindings--visible"),m.classList.remove("hud__maps--visible")},$=Q=>{t?.(Q.currentTarget.dataset.mapId)},ae=Q=>{s?.(Q.currentTarget.dataset.skyboxId)};return b.addEventListener("click",B),w.addEventListener("input",C),T.addEventListener("input",F),L.addEventListener("click",k),U.addEventListener("click",V),E.addEventListener("click",q),M.forEach(Q=>Q.addEventListener("click",$)),N.forEach(Q=>Q.addEventListener("click",ae)),{destroy(){b.removeEventListener("click",B),w.removeEventListener("input",C),T.removeEventListener("input",F),L.removeEventListener("click",k),U.removeEventListener("click",V),E.removeEventListener("click",q),M.forEach(Q=>Q.removeEventListener("click",$)),N.forEach(Q=>Q.removeEventListener("click",ae)),_.remove()},setPaused(Q){_.classList.toggle("hud__pause--active",Q),Q||(x.classList.remove("hud__bindings--visible"),m.classList.remove("hud__maps--visible"),S.classList.remove("hud__skyboxes--visible"))},updateSelections({selectedMapId:Q,selectedSkyboxId:xe}){Q!==h&&(M.forEach(Je=>{Je.classList.toggle("hud__map-option--active",Je.dataset.mapId===Q)}),h=Q),xe!==u&&(N.forEach(Je=>{Je.classList.toggle("hud__skybox-option--active",Je.dataset.skyboxId===xe)}),u=xe);const be=Math.round((c?.()??.6)*100);be!==f&&(w.value=String(be),f=be);const He=y();He!==p&&(T.value=String(He),R.textContent=String(He),p=He)}}}function ME({container:i,input:e,roundManager:t,weaponManager:n,utilityManager:s,networkClient:r,playerController:o,getFps:a,getMasterVolume:c,getMouseSensitivity:l,onResume:h,onSelectMap:u,onSensitivityChange:f,onVolumeChange:p,maps:_=[],getSelectedMapId:y,getIsLoading:x,getLoadingStatus:m,onSelectSkybox:S,skyboxes:b=[],getSelectedSkyboxId:w}){const T=document.createElement("div");T.className="hud",T.innerHTML=`
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
      <div class="hud__network"></div>
      <div class="hud__movement"></div>
      <div class="hud__pointer"></div>
    </div>
  `,i.appendChild(T);const R=wE({parent:T,onResume:h,onSelectMap:u,maps:_,onSelectSkybox:S,skyboxes:b,onSensitivityChange:f,onVolumeChange:p,getMasterVolume:c,getMouseSensitivity:l}),L=T.querySelector(".hud__round"),U=T.querySelector(".hud__fps"),E=T.querySelector(".hud__weapon"),M=T.querySelector(".hud__utility"),N=T.querySelector(".hud__network"),B=T.querySelector(".hud__movement"),C=T.querySelector(".hud__pointer"),F=T.querySelector(".hud__crosshair"),k=T.querySelector(".hud__ads-reticle"),V=T.querySelector(".hud__scope"),q=T.querySelector(".hud__loading"),$=T.querySelector(".hud__loading-status");let ae=!1,Q="",xe="",be="",He="",Je="",ct="",fe="",pe="",Ae=null,je=null,Be=null,ut=null;function At(st,Mt,G){return G!==Mt?(st.textContent=Mt,Mt):G}return{destroy(){R.destroy(),T.remove()},setPaused(st){ae=st,R.setPaused(ae)},update(){const st=o?.getDebugState?.()??{grounded:!0,crouched:!1,speed:0},Mt=t?`Round ${t.roundNumber} - ${t.phase}`:"Round --",G=`FPS: ${a?.()??"--"}`,ft=`Weapon: ${n?.activeWeapon??"--"}`,lt=`Utility: ${s?.activeUtility??"--"}`,Rt=r?.getRemotePlayers?.().length??0,Oe=`Network: ${r?.connectionState??"offline"} - Remote players: ${Rt}`,_t=`State: ${st.grounded?"Grounded":"Air"} - ${st.crouched?"Crouched":"Standing"} - ${st.speed.toFixed(1)} m/s`,Ge=ae?"Paused":e.pointerLocked?"Pointer locked":"Click to capture mouse";Q=At(L,Mt,Q),xe=At(U,G,xe),be=At(E,ft,be),He=At(M,lt,He),Je=At(N,Oe,Je),ct=At(B,_t,ct),fe=At(C,Ge,fe);const tt=!!(n?.isScoped||ae);tt!==Ae&&(F.classList.toggle("hud__crosshair--hidden",tt),Ae=tt);const z=!!(n?.showAdsReticle&&!ae);z!==je&&(k.classList.toggle("hud__ads-reticle--active",z),je=z);const D=!!n?.showScopeOverlay;D!==Be&&(V.classList.toggle("hud__scope--active",D),Be=D);const ee=!!x?.();ee!==ut&&(q.classList.toggle("hud__loading--active",ee),ut=ee);const de=m?.()??"";de!==pe&&($.textContent=de,pe=de),R.updateSelections({selectedMapId:y?.(),selectedSkyboxId:w?.()})}}}const Eu=[{id:"sunset",label:"Qwantani Sunset",path:"/skyboxes/qwantani_sunset_puresky_2k.hdr"},{id:"rooftop-night",label:"Rooftop Night",path:"/skyboxes/rooftop_night_2k.hdr"}];function EE(i){return Eu.find(e=>e.id===i)??null}class TE extends gg{constructor(e){super(e),this.type=_i}parse(e){const o=function(U,E){switch(U){case 1:throw new Error("THREE.HDRLoader: Read Error: "+(E||""));case 2:throw new Error("THREE.HDRLoader: Write Error: "+(E||""));case 3:throw new Error("THREE.HDRLoader: Bad File Format: "+(E||""));default:case 4:throw new Error("THREE.HDRLoader: Memory Error: "+(E||""))}},u=function(U,E,M){E=E||1024;let B=U.pos,C=-1,F=0,k="",V=String.fromCharCode.apply(null,new Uint16Array(U.subarray(B,B+128)));for(;0>(C=V.indexOf(`
`))&&F<E&&B<U.byteLength;)k+=V,F+=V.length,B+=128,V+=String.fromCharCode.apply(null,new Uint16Array(U.subarray(B,B+128)));return-1<C?(U.pos+=F+C+1,k+V.slice(0,C)):!1},f=function(U){const E=/^#\?(\S+)/,M=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,N=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,B=/^\s*FORMAT=(\S+)\s*$/,C=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,F={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0};let k,V;for((U.pos>=U.byteLength||!(k=u(U)))&&o(1,"no header found"),(V=k.match(E))||o(3,"bad initial token"),F.valid|=1,F.programtype=V[1],F.string+=k+`
`;k=u(U),k!==!1;){if(F.string+=k+`
`,k.charAt(0)==="#"){F.comments+=k+`
`;continue}if((V=k.match(M))&&(F.gamma=parseFloat(V[1])),(V=k.match(N))&&(F.exposure=parseFloat(V[1])),(V=k.match(B))&&(F.valid|=2,F.format=V[1]),(V=k.match(C))&&(F.valid|=4,F.height=parseInt(V[1],10),F.width=parseInt(V[2],10)),F.valid&2&&F.valid&4)break}return F.valid&2||o(3,"missing format specifier"),F.valid&4||o(3,"missing image size specifier"),F},p=function(U,E,M){const N=E;if(N<8||N>32767||U[0]!==2||U[1]!==2||U[2]&128)return new Uint8Array(U);N!==(U[2]<<8|U[3])&&o(3,"wrong scanline width");const B=new Uint8Array(4*E*M);B.length||o(4,"unable to allocate buffer space");let C=0,F=0;const k=4*N,V=new Uint8Array(4),q=new Uint8Array(k);let $=M;for(;$>0&&F<U.byteLength;){F+4>U.byteLength&&o(1),V[0]=U[F++],V[1]=U[F++],V[2]=U[F++],V[3]=U[F++],(V[0]!=2||V[1]!=2||(V[2]<<8|V[3])!=N)&&o(3,"bad rgbe scanline format");let ae=0,Q;for(;ae<k&&F<U.byteLength;){Q=U[F++];const be=Q>128;if(be&&(Q-=128),(Q===0||ae+Q>k)&&o(3,"bad scanline data"),be){const He=U[F++];for(let Je=0;Je<Q;Je++)q[ae++]=He}else q.set(U.subarray(F,F+Q),ae),ae+=Q,F+=Q}const xe=N;for(let be=0;be<xe;be++){let He=0;B[C]=q[be+He],He+=N,B[C+1]=q[be+He],He+=N,B[C+2]=q[be+He],He+=N,B[C+3]=q[be+He],C+=4}$--}return B},_=function(U,E,M,N){const B=U[E+3],C=Math.pow(2,B-128)/255;M[N+0]=U[E+0]*C,M[N+1]=U[E+1]*C,M[N+2]=U[E+2]*C,M[N+3]=1},y=function(U,E,M,N){const B=U[E+3],C=Math.pow(2,B-128)/255;M[N+0]=No.toHalfFloat(Math.min(U[E+0]*C,65504)),M[N+1]=No.toHalfFloat(Math.min(U[E+1]*C,65504)),M[N+2]=No.toHalfFloat(Math.min(U[E+2]*C,65504)),M[N+3]=No.toHalfFloat(1)},x=new Uint8Array(e);x.pos=0;const m=f(x),S=m.width,b=m.height,w=p(x.subarray(x.pos),S,b);let T,R,L;switch(this.type){case ii:L=w.length/4;const U=new Float32Array(L*4);for(let M=0;M<L;M++)_(w,M*4,U,M*4);T=U,R=ii;break;case _i:L=w.length/4;const E=new Uint16Array(L*4);for(let M=0;M<L;M++)y(w,M*4,E,M*4);T=E,R=_i;break;default:throw new Error("THREE.HDRLoader: Unsupported type: "+this.type)}return{width:S,height:b,data:T,header:m.string,gamma:m.gamma,exposure:m.exposure,type:R}}setDataType(e){return this.type=e,this}load(e,t,n,s){function r(o,a){switch(o.type){case ii:case _i:o.colorSpace=Ds,o.minFilter=xn,o.magFilter=xn,o.generateMipmaps=!1,o.flipY=!0;break}t&&t(o,a)}return super.load(e,r,n,s)}}class AE extends TE{constructor(e){console.warn("RGBELoader has been deprecated. Please use HDRLoader instead."),super(e)}}class RE{constructor(e,t){this.scene=e,this.renderer=t,this.backgroundTexture=null,this.environmentTexture=null,this.loadToken=0}async setSkybox(e,{backgroundIntensity:t=1,environmentIntensity:n=1}={}){const s=++this.loadToken;try{const r=await new AE().loadAsync(e);if(s!==this.loadToken){r.dispose();return}r.mapping=Ca;const o=new ru(this.renderer);o.compileEquirectangularShader(),this.backgroundTexture?.dispose(),this.environmentTexture?.dispose(),this.backgroundTexture=r,this.environmentTexture=o.fromEquirectangular(r).texture,this.scene.background=this.backgroundTexture,this.scene.environment=this.environmentTexture,this.scene.backgroundIntensity=t,this.scene.environmentIntensity=n,o.dispose()}catch(r){console.error(`Failed to load HDR skybox "${e}".`,r)}}dispose(){this.backgroundTexture?.dispose(),this.environmentTexture?.dispose()}}const Rd=typeof window<"u"?window.AudioContext??window.webkitAudioContext:null;function gl(i){return Math.max(0,Math.min(1,i))}class CE{constructor({masterVolume:e=.6}={}){this.masterVolume=gl(e),this.sounds=new Map,this.context=Rd?new Rd:null,this.masterGain=this.context?this.context.createGain():null,this.masterGain&&(this.masterGain.gain.value=this.masterVolume,this.masterGain.connect(this.context.destination))}registerSound(e,t,n={}){if(this.sounds.has(e))return;const s={key:e,path:t,playback:n.playback??"interrupt",minIntervalMs:n.minIntervalMs??0,buffer:null,bufferPromise:null,activeSource:null,activeGain:null,lastPlayTime:-1/0};this.sounds.set(e,s),n.preload!==!1&&this.loadBuffer(s)}async unlock(){if(!(!this.context||this.context.state==="running"))try{await this.context.resume()}catch{}}setMasterVolume(e){this.masterVolume=gl(e),this.masterGain&&this.context&&this.masterGain.gain.setValueAtTime(this.masterVolume,this.context.currentTime)}getMasterVolume(){return this.masterVolume}async play(e,t={}){const n=this.sounds.get(e);if(!n||!this.context||!this.masterGain)return;const{baseVolume:s=1,pitchMin:r=1,pitchMax:o=1,playback:a=n.playback,minIntervalMs:c=n.minIntervalMs}=t,l=performance.now();if(l-n.lastPlayTime<c)return;n.lastPlayTime=l,await this.unlock();const h=await this.loadBuffer(n);if(!h)return;const u=this.context.currentTime;if(a==="interrupt")this.stopActiveSound(n,u);else if(a==="skip"&&n.activeSource)return;const f=this.context.createBufferSource();f.buffer=h,f.playbackRate.value=r+Math.random()*(o-r);const p=this.context.createGain();p.gain.value=gl(s),f.connect(p),p.connect(this.masterGain),f.start(u),a!=="overlap"&&(n.activeSource=f,n.activeGain=p),f.onended=()=>{f.disconnect(),p.disconnect(),n.activeSource===f&&(n.activeSource=null,n.activeGain=null)}}async loadBuffer(e){const t=typeof e=="string"?this.sounds.get(e):e;return!t||!this.context?null:t.buffer?t.buffer:(t.bufferPromise||(t.bufferPromise=fetch(t.path).then(n=>{if(!n.ok)throw new Error(`Failed to load audio: ${t.path}`);return n.arrayBuffer()}).then(n=>this.context.decodeAudioData(n.slice(0))).then(n=>(t.buffer=n,n)).catch(n=>(console.error(n),t.bufferPromise=null,null))),t.bufferPromise)}stopActiveSound(e,t=this.context?.currentTime??0){if(!(!e.activeSource||!e.activeGain)){try{e.activeGain.gain.cancelScheduledValues(t),e.activeGain.gain.setValueAtTime(e.activeGain.gain.value,t),e.activeGain.gain.linearRampToValueAtTime(0,t+.012),e.activeSource.stop(t+.014)}catch{}e.activeSource=null,e.activeGain=null}}destroy(){for(const e of this.sounds.values())this.stopActiveSound(e);this.sounds.clear(),this.context&&(this.context.close(),this.context=null,this.masterGain=null)}}class PE{constructor(e){this.root=e,this.clock=new bg,this.isPaused=!1,this.isLoadingMap=!1,this.loadingStatus="",this.hadPointerLock=!1,this.currentFps=0,this.mouseSensitivity=.0011,this.mapLoadToken=0,this.audioManager=new CE({masterVolume:.6}),this.audioManager.registerSound("rifle-fire","/audio/m4a1_silencer_01.mp3",{playback:"interrupt"}),this.audioManager.registerSound("sniper-fire","/audio/awp-shoot-sound-effect-cs_go.mp3",{playback:"interrupt"}),this.audioManager.registerSound("sniper-zoom","/audio/awp-zoom-sound-effect-cs-go.mp3",{playback:"interrupt",minIntervalMs:80}),this.audioManager.registerSound("knife-slash","/audio/sword-slash-4.mp3",{playback:"interrupt"}),this.remotePlayerMeshes=new Map,this.remotePlayerGeometry=new wt(.7,1.72,.7),this.remotePlayerMaterial=new Nt({color:5556210,roughness:.55,metalness:.08}),this.scene=new ig,this.scene.background=new xt(791064),this.scene.fog=new Ou(791064,24,90),this.selectedMapId=cu[0].id,this.selectedSkyboxId=Eu[0].id,this.camera=new ti(75,window.innerWidth/window.innerHeight,.1,500),this.renderer=new fS({antialias:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.outputColorSpace=$n,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Pd,this.renderer.toneMapping=Dd,this.renderer.toneMappingExposure=.92,this.root.appendChild(this.renderer.domElement),this.skyboxManager=new RE(this.scene,this.renderer),this.setSkybox(this.selectedSkyboxId),this.input=new pS(this.renderer.domElement),this.runtime=null,this.scene.add(this.createLighting()),this.rebuildHud(),this.loadMap(this.selectedMapId),this.onResize=this.onResize.bind(this),this.animate=this.animate.bind(this)}start(){window.addEventListener("resize",this.onResize),this.renderer.setAnimationLoop(this.animate)}stop(){window.removeEventListener("resize",this.onResize),this.renderer.setAnimationLoop(null)}destroy(){this.stop(),this.input.destroy(),this.hud.destroy(),this.clearRemotePlayers(),this.unloadMap(),this.skyboxManager.dispose(),this.audioManager.destroy(),this.remotePlayerGeometry.dispose(),this.remotePlayerMaterial.dispose(),this.renderer.dispose()}rebuildHud(){this.hud?.destroy(),this.hud=ME({container:this.root,input:this.input,roundManager:this.runtime?.roundManager??null,weaponManager:this.runtime?.weaponManager??null,utilityManager:this.runtime?.utilityManager??null,networkClient:this.runtime?.networkClient??null,playerController:this.runtime?.playerController??null,getFps:()=>this.currentFps,getMasterVolume:()=>this.audioManager.getMasterVolume(),getMouseSensitivity:()=>this.mouseSensitivity,onResume:()=>this.resumeGame(),onSelectMap:e=>this.loadMap(e),onSensitivityChange:e=>this.setMouseSensitivity(e),onVolumeChange:e=>this.audioManager.setMasterVolume(e),maps:cu,getSelectedMapId:()=>this.selectedMapId,getIsLoading:()=>this.isLoadingMap,getLoadingStatus:()=>this.loadingStatus,onSelectSkybox:e=>this.setSkybox(e),skyboxes:Eu,getSelectedSkyboxId:()=>this.selectedSkyboxId}),this.hud.setPaused(this.isPaused)}unloadMap(){this.clearRemotePlayers(),this.runtime?.destroy(this.scene),this.runtime=null}async loadMap(e){const t=IS(e);if(!t)return;const n=++this.mapLoadToken;this.isLoadingMap=!0,this.isPaused=!0,this.hud?.setPaused(!0);let s=null;try{if(s=await sh.create({mapOption:t,camera:this.camera,input:this.input,scene:this.scene,audioManager:this.audioManager,mouseSensitivity:this.mouseSensitivity,onStatusChange:r=>{this.loadingStatus=r}}),n!==this.mapLoadToken)return;this.unloadMap(),this.selectedMapId=t.id,this.runtime=s,this.runtime.attachToScene(this.scene),s=null,this.loadingStatus="",this.isLoadingMap=!1,this.rebuildHud()}catch(r){console.error(`Failed to load map "${t.id}".`,r),n===this.mapLoadToken&&(this.loadingStatus="",this.isLoadingMap=!1,this.rebuildHud())}finally{s?.destroy(this.scene)}}async setSkybox(e){const t=EE(e);t&&(this.selectedSkyboxId=t.id,await this.skyboxManager.setSkybox(t.path,{backgroundIntensity:.92,environmentIntensity:.65}))}setMouseSensitivity(e){this.mouseSensitivity=Math.max(1e-4,e),this.runtime?.playerController?.setMouseSensitivity(this.mouseSensitivity)}createLighting(){const e=new kn,t=new xg(12113919,1450023,1.9);e.add(t);const n=new vg(16773851,1.5);return n.position.set(18,30,12),n.castShadow=!0,n.shadow.mapSize.set(2048,2048),n.shadow.camera.near=1,n.shadow.camera.far=90,n.shadow.camera.left=-40,n.shadow.camera.right=40,n.shadow.camera.top=40,n.shadow.camera.bottom=-40,e.add(n),e}onResize(){this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)}animate(){const e=Math.min(this.clock.getDelta(),.05);this.currentFps=e>0?Math.round(1/e):0;const t=this.input.consumeFrameState();if(t.justPressed.has("Escape")&&(this.isPaused?this.resumeGame():this.pauseGame()),!this.isLoadingMap&&this.runtime?.playerController){const n=this.isPaused?null:this.runtime.playerController.getMovementInputSnapshot(t);this.isPaused||(this.runtime.playerController.update(e,t),this.runtime.weaponManager.update(e,t)),this.runtime.roundManager.update(e),this.runtime.utilityManager.update(e),this.runtime.networkClient.update(e,n);const s=this.runtime.networkClient.consumeLocalCorrection();s&&this.runtime.playerController.reconcileAuthoritativeState(s),this.runtime.targetManager.update(e,{playerPosition:this.runtime.playerController.position,playerEyePosition:this.runtime.playerController.getEyePosition(),collisionWorld:this.runtime.collisionWorld,navigationManager:this.runtime.navigationManager}),this.syncRemotePlayers(this.runtime.networkClient.getRemotePlayers())}else this.clearRemotePlayers();this.hud.update(),this.renderer.render(this.scene,this.camera),this.hadPointerLock=this.input.pointerLocked}pauseGame(){this.isPaused=!0,this.hud?.setPaused(!0),document.pointerLockElement===this.renderer.domElement&&document.exitPointerLock()}async resumeGame(){if(!this.isLoadingMap)try{await this.renderer.domElement.requestPointerLock(),await this.audioManager.unlock(),this.isPaused=!1,this.hud?.setPaused(!1)}catch(e){console.error("Failed to resume pointer lock.",e)}}syncRemotePlayers(e){const t=new Set;for(const n of e){t.add(n.playerId);let s=this.remotePlayerMeshes.get(n.playerId);s||(s=new It(this.remotePlayerGeometry,this.remotePlayerMaterial),s.castShadow=!0,s.receiveShadow=!0,this.remotePlayerMeshes.set(n.playerId,s),this.scene.add(s)),s.position.set(n.position.x,n.position.y+.86,n.position.z),s.rotation.set(0,n.yaw,0)}for(const[n,s]of this.remotePlayerMeshes)t.has(n)||(this.scene.remove(s),this.remotePlayerMeshes.delete(n))}clearRemotePlayers(){for(const e of this.remotePlayerMeshes.values())this.scene.remove(e);this.remotePlayerMeshes.clear()}}const IE=document.querySelector("#app"),DE=new PE(IE);DE.start();

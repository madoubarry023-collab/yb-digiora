/* === CONFIG (à modifier facilement) === */
const WA = "224629272831";
const FACEBOOK_URL = "https://www.facebook.com/share/1FCrgtTNfP/";
const PAGE_SIZE = 8;
/* Ajouter une capture : copier l'image dans assets/images/<categorie>/ puis ajouter une ligne ici */
const CATEGORIES = {audience:"Croissance de l'audience", pages:"Performances de la page", publications:"Performances des publications", contenus:"Exemples de contenus"};
const PROOFS = [
 {cat:"audience", src:"profil-137k-abonnes.jpg", cap:"Vers le mieux-être · En-tête de la page : 137 K followers (statistique globale)"},
 {cat:"pages", src:"statistiques-28j-10oct-6nov.jpg", cap:"Vers le mieux-être · 28 derniers jours (10 oct – 6 nov) · Page : 7,1 M de vues, 202,3 K interactions, 11,2 K followers en plus"},
 {cat:"pages", src:"analytics-28j.jpg", cap:"Vers le mieux-être · Analytics sur 28 jours (dates non visibles) · Page : 6,1 M de vues, 354 012 interactions, 9 617 suivis gagnés"},
 {cat:"publications", src:"publication-772k-vues.jpg", cap:"Vers le mieux-être · Publication individuelle (il y a 2 j) : 13,7 K réactions, 462 commentaires, 385 partages, 772 628 vues. Ce n'est pas une performance de toute la page."}
];
/* === CODE === */
const $=s=>document.querySelector(s);
document.querySelectorAll("[data-wa]").forEach(a=>{a.href=`https://wa.me/${WA}?text=${encodeURIComponent(a.dataset.wa)}`;a.target="_blank";a.rel="noopener"});
const fb=$("#fb-link");if(FACEBOOK_URL){fb.href=FACEBOOK_URL;fb.target="_blank";fb.rel="noopener";fb.hidden=false}
const b=$(".burger"),m=$("#menu");b.onclick=()=>{m.classList.toggle("open");b.setAttribute("aria-expanded",m.classList.contains("open"))};
m.onclick=()=>m.classList.remove("open");
let cat="all",shown=PAGE_SIZE;
function render(){const l=PROOFS.filter(p=>cat=="all"||p.cat==cat);
 $("#gallery").innerHTML="";l.slice(0,shown).forEach(p=>{const f=document.createElement("figure");f.innerHTML=`<img loading="lazy" src="${p.src}" alt=""><figcaption></figcaption>`;f.querySelector("img").alt=p.cap;f.querySelector("figcaption").textContent=p.cap;f.onclick=()=>{$("#lb img").src=p.src;$("#lb img").alt=p.cap;$("#lb p").textContent=p.cap;$("#lb").hidden=false};$("#gallery").append(f)});
 $("#more").hidden=l.length<=shown}
const fl=$("#filters");Object.entries({all:"Toutes",...CATEGORIES}).forEach(([k,v])=>{const x=document.createElement("button");x.textContent=v;if(k=="all")x.className="on";x.onclick=()=>{cat=k;shown=PAGE_SIZE;fl.querySelectorAll("button").forEach(y=>y.classList.remove("on"));x.classList.add("on");render()};fl.append(x)});
$("#more").onclick=()=>{shown+=PAGE_SIZE;render()};
$("#lb").onclick=e=>{if(e.target.id!="lb"&&e.target.id!="lb-x")return;$("#lb").hidden=true};
document.addEventListener("keydown",e=>{if(e.key=="Escape")$("#lb").hidden=true});
const t=$("#top");addEventListener("scroll",()=>t.hidden=scrollY<500);t.onclick=()=>scrollTo({top:0});
$("#yr").textContent=new Date().getFullYear();render();
/* === ANIMATIONS PREMIUM === */
(function(){
const rm=matchMedia("(prefers-reduced-motion:reduce)").matches,fine=matchMedia("(hover:hover) and (pointer:fine)").matches,$$=s=>document.querySelectorAll(s);
const bar=document.createElement("div");bar.id="bar";document.body.prepend(bar);
["a","b"].forEach(c=>{const o=document.createElement("div");o.className="orb "+c;document.body.prepend(o)});
const nav=document.querySelector(".nav"),logo=document.querySelector(".hero-logo");
addEventListener("scroll",()=>{const h=document.documentElement;bar.style.width=scrollY/(h.scrollHeight-innerHeight)*100+"%";nav.classList.toggle("s",scrollY>30);if(logo&&!rm)logo.style.translate="0 "+Math.min(scrollY*.18,80)+"px"},{passive:true});
let seen=0;try{seen=sessionStorage.getItem("ybi")}catch(e){}
if(!rm&&!seen&&logo){const p=document.createElement("div");p.id="pre";p.innerHTML='<img src="'+logo.src+'" alt=""><i></i>';document.body.append(p);document.body.classList.add("ld");setTimeout(()=>{p.classList.add("out");document.body.classList.remove("ld")},1400);setTimeout(()=>p.remove(),2300);try{sessionStorage.setItem("ybi",1)}catch(e){}}
const h1=document.querySelector(".hero h1");if(h1&&!rm){const t=h1.textContent.trim().split(" ");h1.setAttribute("aria-label",t.join(" "));h1.innerHTML=t.map((w,i)=>'<span class="w" aria-hidden="true"><span style="--i:'+i+'">'+w+'</span></span>').join(" ")}
function cnt(b){if(rm||!b)return;const raw=b.textContent,m=raw.match(/^[\d][\d\s\u202f.,]*/);if(!m)return;const mt=m[0].trimEnd(),com=mt.indexOf(",")>-1,d=com?mt.split(",")[1].length:0,n=parseFloat(mt.replace(/[\s\u202f]/g,"").replace(",",".")),suf=raw.slice(mt.length),t0=performance.now();
(function f(t){const k=Math.min((t-t0)/1800,1),v=n*(1-Math.pow(1-k,4));b.textContent=(com?v.toFixed(d).replace(".",","):Math.round(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g," "))+suf;if(k<1)requestAnimationFrame(f);else b.textContent=raw})(t0)}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const el=e.target;io.unobserve(el);el.classList.add("in");setTimeout(()=>el.classList.add("done"),1500);if(el.matches(".stats div"))cnt(el.querySelector("b"))}),{threshold:.12,rootMargin:"0px 0px -6% 0px"});
$$("section:not(.hero) h2,section h3,.card,.stats div,details,.note,#more,#fb-link,.filters").forEach((el,i)=>{el.classList.add("reveal");el.style.transitionDelay=(i%4)*110+"ms";io.observe(el)});
if(fine&&!rm){document.addEventListener("pointermove",e=>{const c=e.target.closest&&e.target.closest(".card,figure");if(c){const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;c.style.setProperty("--mx",x*100+"%");c.style.setProperty("--my",y*100+"%");c.style.setProperty("--rx",(.5-y)*6+"deg");c.style.setProperty("--ry",(x-.5)*8+"deg")}
const b=e.target.closest&&e.target.closest(".btn");if(b){const r=b.getBoundingClientRect();b.style.translate=(e.clientX-r.left-r.width/2)*.18+"px "+(e.clientY-r.top-r.height/2)*.3+"px"}});
document.addEventListener("pointerout",e=>{const t=e.target.closest&&e.target.closest(".card,figure,.btn");if(!t||t.contains(e.relatedTarget))return;t.style.setProperty("--rx","0deg");t.style.setProperty("--ry","0deg");t.style.translate=""})}
const links=[...$$("#menu a")],so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle("act",a.getAttribute("href")=="#"+e.target.id))}),{rootMargin:"-45% 0px -50% 0px"});$$("main section[id]").forEach(s=>so.observe(s));
})();
/* === PRIX + AMBIANCE === */
(function(){
const rm=matchMedia("(prefers-reduced-motion:reduce)").matches,$$=s=>document.querySelectorAll(s);
const hero=document.querySelector(".hero");
if(hero&&!rm){const w=document.createElement("div"),t="Votre image, notre créativité ✦ Création de page Facebook ✦ Community Management ✦ Professionnalisme ✦ Confiance ✦ Créativité ✦ ";w.className="tick";w.setAttribute("aria-hidden","true");w.innerHTML="<div><span>"+t+"</span><span>"+t+"</span></div>";hero.after(w)}
$$(".card li").forEach(li=>li.style.setProperty("--k",[...li.parentNode.children].indexOf(li)));
function price(p){const n=[...p.childNodes].find(x=>x.nodeType==3&&/\d/.test(x.nodeValue));if(!n||rm)return;const raw=n.nodeValue,m=raw.match(/\d[\d\s\u202f]*/),num=parseInt(m[0].replace(/[\s\u202f]/g,""),10),tr=/\s$/.test(m[0])?" ":"",t0=performance.now();
(function f(t){const k=Math.min((t-t0)/1600,1),v=Math.round(num*(1-Math.pow(1-k,4)));n.nodeValue=raw.replace(m[0],v.toString().replace(/\B(?=(\d{3})+(?!\d))/g," ")+tr);if(k<1)requestAnimationFrame(f);else n.nodeValue=raw})(t0)}
const els=$$(".old,.promo");
if(rm){els.forEach(e=>e.classList.add("in"));return}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const el=e.target;io.unobserve(el);const pr=el.matches(".promo");setTimeout(()=>{el.classList.add("in");if(pr)price(el)},pr?1100:400)}),{threshold:.5});
els.forEach(e=>{e.classList.add("pr");io.observe(e)});
})();

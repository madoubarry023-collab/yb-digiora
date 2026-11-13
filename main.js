/* ===== YB Digiora — v6 =====  CONFIG (modifiable facilement) */
const WA = "224669690907";                       // numéro WhatsApp (wa.me)
const FACEBOOK_URL = "https://www.facebook.com/share/1FCrgtTNfP/";
const PAGE_SIZE = 6;
const CATEGORIES = {audience:"Croissance de l'audience", pages:"Performances de la page", publications:"Performances des publications", contenus:"Exemples de contenus"};
const BS = "Meta Business Suite · Contenus triés par vues · publications du 30 oct au 6 nov 2026 · indicateurs par publication";
/* Ajouter une capture : copier l'image à côté de index.html, puis ajouter une ligne ici */
const PROOFS = [
 {cat:"audience",src:"profil-137k-abonnes.jpg",t:"Vers le mieux-être",cap:"En-tête de la page : 137 K followers (statistique globale)"},
 {cat:"pages",src:"analytics-28j-13nov.jpg",t:"Analytics · 28 jours (13 nov. 2026)",cap:"Vues 10 M, interactions 581 005, suivis gagnés 16 093. Le nom de la page n’apparaît pas sur la capture."},
 {cat:"pages",src:"statistiques-28j-10oct-6nov.jpg",t:"28 derniers jours (10 oct – 6 nov)",cap:"Page : 7,1 M de vues, 202,3 K interactions, 11,2 K followers en plus"},
 {cat:"pages",src:"analytics-28j.jpg",t:"Analytics · 28 jours (dates non visibles)",cap:"Page : 6,1 M de vues, 354 012 interactions, 9 617 suivis gagnés"},
 {cat:"publications",src:"publication-772k-vues.jpg",t:"Publication individuelle",cap:"13,7 K réactions, 462 commentaires, 385 partages, 772 628 vues. Ce n’est pas la performance de toute la page."},
 {cat:"contenus",src:"fb-contenus-1.jpg",t:"Meta Business Suite (1/3)",cap:BS},
 {cat:"contenus",src:"fb-contenus-2.jpg",t:"Meta Business Suite (2/3)",cap:BS},
 {cat:"contenus",src:"fb-contenus-3.jpg",t:"Meta Business Suite (3/3)",cap:BS}
];
const MQ_ROWS = [[0,5,1,6,4],[3,7,4,2,5]];

/* ===== CODE ===== */
(function(){
"use strict";
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const rm=matchMedia("(prefers-reduced-motion:reduce)").matches;
const fine=matchMedia("(hover:hover) and (pointer:fine)").matches;
const store=(k,v)=>{try{if(v===undefined)return sessionStorage.getItem(k);sessionStorage.setItem(k,v)}catch(e){}};

/* WhatsApp + Facebook */
$$("[data-wa]").forEach(a=>{a.href="https://wa.me/"+WA+"?text="+encodeURIComponent(a.dataset.wa);a.target="_blank";a.rel="noopener"});
const fb=$("#fb-link");if(fb&&FACEBOOK_URL){fb.href=FACEBOOK_URL}else if(fb){fb.hidden=true}
$("#yr").textContent=new Date().getFullYear();

/* Menu mobile */
const burger=$("#burger"),menu=$("#menu");
function setMenu(o){menu.classList.toggle("open",o);burger.setAttribute("aria-expanded",o);burger.setAttribute("aria-label",o?"Fermer le menu":"Ouvrir le menu");document.body.style.overflow=o?"hidden":""}
burger.addEventListener("click",()=>setMenu(!menu.classList.contains("open")));
menu.addEventListener("click",e=>{if(e.target.closest("a"))setMenu(false)});
addEventListener("resize",()=>{if(innerWidth>980)setMenu(false)});

/* Lightbox */
const lb=$("#lb"),lbi=$("#lb-i"),lbc=$("#lb-c");let lbList=[],lbIdx=0,lastFocus=null;
function lbShow(){const p=lbList[lbIdx];lbi.src=p.src;lbi.alt=p.t+" — "+p.cap;lbc.textContent=p.t+" · "+p.cap;const m=lbList.length>1;$("#lb-p").hidden=!m;$("#lb-n").hidden=!m}
function lbOpen(list,i){lbList=list;lbIdx=i;lastFocus=document.activeElement;lbShow();lb.hidden=false;document.body.style.overflow="hidden";$("#lb-x").focus()}
function lbClose(){lb.hidden=true;document.body.style.overflow=menu.classList.contains("open")?"hidden":"";lbi.removeAttribute("src");if(lastFocus&&lastFocus.focus)lastFocus.focus()}
function lbStep(d){lbIdx=(lbIdx+d+lbList.length)%lbList.length;lbShow()}
$("#lb-x").addEventListener("click",lbClose);$("#lb-p").addEventListener("click",()=>lbStep(-1));$("#lb-n").addEventListener("click",()=>lbStep(1));
lb.addEventListener("click",e=>{if(e.target===lb||e.target.id==="lb-w")lbClose()});
addEventListener("keydown",e=>{if(lb.hidden){if(e.key==="Escape")setMenu(false);return}
 if(e.key==="Escape")lbClose();else if(e.key==="ArrowLeft")lbStep(-1);else if(e.key==="ArrowRight")lbStep(1)});
let tx=null;lb.addEventListener("touchstart",e=>{tx=e.touches[0].clientX},{passive:true});
lb.addEventListener("touchend",e=>{if(tx===null)return;const d=e.changedTouches[0].clientX-tx;tx=null;if(Math.abs(d)>60)lbStep(d<0?1:-1)},{passive:true});

/* Galerie + filtres */
let cat="all",shown=PAGE_SIZE;
const gal=$("#gallery"),more=$("#more"),fl=$("#filters");
function mkShot(p,list,i){const b=document.createElement("button");b.type="button";b.className="shot";
 b.innerHTML='<span class="im"><img loading="lazy" decoding="async" alt=""></span><span class="cap"><b></b><span></span></span>';
 const im=b.querySelector("img");im.src=p.src;im.alt=p.t+" — "+p.cap;b.querySelector("b").textContent=p.t;b.querySelector(".cap span").textContent=p.cap;
 b.addEventListener("click",()=>lbOpen(list,i));return b}
function render(){const l=PROOFS.filter(p=>cat==="all"||p.cat===cat);gal.innerHTML="";
 l.slice(0,shown).forEach((p,i)=>{const s=mkShot(p,l,i);if(!rm){s.style.animation="fd .6s var(--ease) both";s.style.animationDelay=(i%6)*70+"ms"}gal.append(s)});
 more.hidden=l.length<=shown}
const cats=Object.entries(CATEGORIES).filter(([k])=>PROOFS.some(p=>p.cat===k));
Object.entries({all:"Toutes",...Object.fromEntries(cats)}).forEach(([k,v])=>{const x=document.createElement("button");x.type="button";x.textContent=v;x.setAttribute("aria-pressed",k==="all");if(k==="all")x.className="on";
 x.addEventListener("click",()=>{cat=k;shown=PAGE_SIZE;fl.querySelectorAll("button").forEach(y=>{y.classList.remove("on");y.setAttribute("aria-pressed","false")});x.classList.add("on");x.setAttribute("aria-pressed","true");render()});fl.append(x)});
more.addEventListener("click",()=>{shown+=PAGE_SIZE;render()});
render();

/* Marquee portfolio (2 rangées, sens opposés) */
const mq=$("#mq");
if(mq){MQ_ROWS.forEach((r,ri)=>{const row=document.createElement("div");row.className="mq-row"+(ri?" rev":"");
 const set=hid=>r.map(k=>{const p=PROOFS[k],b=document.createElement("button");b.type="button";b.className="mq-it";b.innerHTML='<img loading="lazy" decoding="async" alt="">';const im=b.firstChild;im.src=p.src;im.alt=hid?"":p.t;if(hid){b.setAttribute("aria-hidden","true");b.tabIndex=-1}b.addEventListener("click",()=>lbOpen(r.map(x=>PROOFS[x]),r.indexOf(k)));return b});
 [set(false),set(true)].forEach(s=>s.forEach(b=>row.append(b)));
 /* la rangée contient 2 copies → translateX(-50%) boucle sans coupure */
 row.style.animationName="mqx";mq.append(row);
 ["touchstart"].forEach(ev=>row.addEventListener(ev,()=>mq.classList.add("pause"),{passive:true}));
 ["touchend","touchcancel"].forEach(ev=>row.addEventListener(ev,()=>setTimeout(()=>{if(!mq.dataset.manual)mq.classList.remove("pause")},1500),{passive:true}))});
 const mqp=$("#mqp");mqp.addEventListener("click",()=>{const p=mq.classList.toggle("pause");mq.dataset.manual=p?"1":"";mqp.textContent=p?"Lecture":"Pause"})}

/* Barre de progression, nav, retour haut, parallax */
const fab=$("#fab"),bar=$("#bar"),nav=$("#nav"),top=$("#top"),art=$("#art"),logo=art&&art.querySelector(".logo");let tick=false;
function onScroll(){tick=false;const h=document.documentElement,max=h.scrollHeight-innerHeight,y=scrollY;
 bar.style.transform="scaleX("+(max>0?y/max:0)+")";nav.classList.toggle("sc",y>24);top.hidden=y<600;fab.classList.toggle("show",y>innerHeight*.6);
 if(!rm&&logo&&y<innerHeight)art.style.setProperty("--py",Math.min(y*.12,60)+"px")}
addEventListener("scroll",()=>{if(!tick){tick=true;requestAnimationFrame(onScroll)}},{passive:true});onScroll();
top.addEventListener("click",()=>scrollTo({top:0,behavior:rm?"auto":"smooth"}));
if(art&&!rm)art.style.translate="0 var(--py,0px)";

/* Lien actif du menu */
const links=$$("#menu a:not(.btn)");
if("IntersectionObserver" in window){const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle("on",a.getAttribute("href")==="#"+e.target.id))}),{rootMargin:"-45% 0px -50% 0px"});$$("main section[id]").forEach(s=>so.observe(s))}

/* Compteurs */
const fmt=n=>Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g," ");
function count(el){const to=+el.dataset.to,suf=el.dataset.suf||"";if(rm||!to)return;const raw=el.textContent,t0=performance.now(),dur=to>1000?1900:1500;
 (function f(t){const k=Math.min((t-t0)/dur,1),v=to*(1-Math.pow(1-k,4));el.textContent=fmt(v)+suf;if(k<1)requestAnimationFrame(f);else el.textContent=raw})(t0)}

/* Révélations au scroll */
const rvEls=$$(".rv");
rvEls.forEach(el=>{const sib=[...el.parentNode.children].filter(x=>x.classList.contains("rv"));el.style.setProperty("--d",Math.min(sib.indexOf(el),5)*0.09+"s")});
function reveal(el){if(el.classList.contains("in"))return;el.classList.add("in");
 el.querySelectorAll("[data-to]:not(.n)").forEach(count);if(el.matches("[data-to]:not(.n)"))count(el);
 el.querySelectorAll(".old").forEach(o=>o.classList.add("in"));
 el.querySelectorAll(".promo .n").forEach(n=>setTimeout(()=>count(n),700))}
if("IntersectionObserver" in window&&!rm){
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){io.unobserve(e.target);reveal(e.target)}}),{threshold:.12,rootMargin:"0px 0px -6% 0px"});
 rvEls.forEach(el=>io.observe(el));
 /* filet de sécurité : tout apparaît même si l'observateur échoue */
 setTimeout(()=>rvEls.forEach(el=>{if(!el.classList.contains("in"))el.classList.add("in")}),9000)
}else rvEls.forEach(el=>el.classList.add("in"));

/* Effets souris (PC uniquement) : halo + inclinaison + bouton magnétique */
if(fine&&!rm){
 document.addEventListener("pointermove",e=>{const c=e.target.closest&&e.target.closest(".card");if(c){const r=c.getBoundingClientRect();c.style.setProperty("--mx",(e.clientX-r.left)+"px");c.style.setProperty("--my",(e.clientY-r.top)+"px")}
  const b=e.target.closest&&e.target.closest(".btn");if(b){const r=b.getBoundingClientRect();b.style.translate=((e.clientX-r.left-r.width/2)*.14)+"px "+((e.clientY-r.top-r.height/2)*.22)+"px"}});
 document.addEventListener("pointerout",e=>{const b=e.target.closest&&e.target.closest(".btn");if(b&&!b.contains(e.relatedTarget))b.style.translate=""})}

/* Halo souris sur sections sombres + inclinaison du logo (PC) */
if(fine&&!rm){
 $$(".dark").forEach(d=>d.addEventListener("pointermove",e=>{const r=d.getBoundingClientRect();d.style.setProperty("--gx",(e.clientX-r.left)+"px");d.style.setProperty("--gy",(e.clientY-r.top)+"px")}));
 if(art)art.addEventListener("pointermove",e=>{const r=art.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;art.style.setProperty("--ry",(x*18)+"deg");art.style.setProperty("--rx",(-y*18)+"deg")});
 if(art)art.addEventListener("pointerleave",()=>{art.style.setProperty("--ry","0deg");art.style.setProperty("--rx","0deg")})}

/* Lecteur vidéo (chargement à la demande) */
const player=$("#player"),adv=$("#adv"),play=$("#play");
if(player&&adv&&play){
 const start=()=>{player.classList.add("on");adv.preload="auto";const p=adv.play();if(p&&p.catch)p.catch(()=>{})};
 play.addEventListener("click",start);
 adv.addEventListener("play",()=>player.classList.add("on"));
 adv.addEventListener("ended",()=>{player.classList.remove("on");adv.currentTime=0});
 adv.addEventListener("error",()=>{play.hidden=true;const s=$(".vtag");if(s)s.textContent="Vidéo indisponible pour le moment"},true);
 /* pause auto quand la section sort de l'écran */
 if("IntersectionObserver" in window)new IntersectionObserver(es=>{if(!es[0].isIntersecting&&!adv.paused)adv.pause()},{threshold:.15}).observe(player)}

/* Entrée : préchargeur puis animation du hero */
const seen=store("ybi");
function ready(){document.body.classList.add("ready")}
if(rm||seen){ready()}
else{store("ybi","1");const go=()=>setTimeout(ready,650);if(document.readyState==="complete")go();else addEventListener("load",go);setTimeout(ready,3500)}
})();

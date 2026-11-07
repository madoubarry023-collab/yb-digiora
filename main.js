/* === CONFIG (à modifier facilement) === */
const WA = "224629272831";
const FACEBOOK_URL = ""; // collez ici le lien de la page Facebook
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
/* === ANIMATIONS === */
(function(){
 const bar=document.createElement("div");bar.id="bar";document.body.prepend(bar);
 const nav=document.querySelector(".nav");
 addEventListener("scroll",()=>{const h=document.documentElement;bar.style.width=(scrollY/(h.scrollHeight-innerHeight)*100)+"%";nav.classList.toggle("s",scrollY>30)},{passive:true});
 if(!("IntersectionObserver" in window))return;
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.12});
 document.querySelectorAll("section:not(.hero) h2,section h3,.card,.stats div,details,.note,#more,#fb-link").forEach((el,i)=>{el.classList.add("reveal");el.style.transitionDelay=(i%4)*90+"ms";io.observe(el)});
})();

!function(){const e=document.querySelector(".burger-menu__icon"),t=document.querySelector(".nav");e.addEventListener("click",(()=>{e.classList.toggle("open"),t.classList.toggle("show"),t.classList.contains("show")?(t.style.transform="translateY(0)",t.style.opacity="1"):(t.style.transform="translateY(-100%)",t.style.opacity="0")})),document.querySelectorAll(".product__item").forEach((e=>{const t=e.querySelectorAll(".star");let s=0,c=!1;function l(){t.forEach((e=>{e.classList.remove("selected"),e.style.color="#ffcc00"}))}t.forEach(((e,o)=>{e.addEventListener("mouseover",(()=>{if(!c){l(),e.classList.add("selected"),e.style.color="#ff0000";for(let e=0;e<=o;e++)t[e].classList.add("selected"),t[e].style.color="#ff0000"}})),e.addEventListener("click",(()=>{c=!0,l(),e.classList.add("selected"),e.style.color="#ff0000",s=e.getAttribute("data-rating");for(let e=0;e<=o;e++)t[e].classList.add("selected"),t[e].style.color="#ff0000"}))}))}));const s=document.querySelectorAll(".review__item"),c=document.querySelectorAll(".dot");c.forEach(((e,t)=>{e.addEventListener("click",(()=>{var e;e=t,s.forEach(((t,s)=>{s===e?(t.classList.add("active"),t.classList.remove("inactive")):(t.classList.add("inactive"),t.classList.remove("active"))})),c.forEach(((e,s)=>{e.style.background=t===s?"#7EB693":"#C4C4C4"}))}))}))}();
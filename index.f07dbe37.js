!function(){var e={breedSl:document.querySelector(".breed-select"),loaderEl:document.querySelector(".loader"),errorEl:document.querySelector(".error"),catIn:document.querySelector(".cat-info")},t={headers:{Authorization:"Bearer live_Hb9GdFY7EaxAUHctvlHbpH7jaYutGrwxmWdkOSlAYLrX9qIN7LDZxmtfH8fvtbH8"}},n=[],r=[];fetch("https://api.thecatapi.com/v1/breeds",t).then((function(e){return e.json()})).then((function(t){var a=!0,l=!1,o=void 0;try{for(var c,i=t[Symbol.iterator]();!(a=(c=i.next()).done);a=!0){var s=c.value,d=s.name,p=s.reference_image_id;n.push(d),r.push(p)}}catch(e){l=!0,o=e}finally{try{a||null==i.return||i.return()}finally{if(l)throw o}}n.forEach((function(t){var a=document.createElement("option"),l=n.indexOf(t);a.value=r[l],a.textContent=t,e.breedSl.appendChild(a)}))})),e.breedSl.addEventListener("change",(function(n){var r,a=n.target.value;e.errorEl.style.display="none",e.loaderEl.style.display="block",e.catIn.innerHTML="",(r=a,fetch("https://api.thecatapi.com/v1/images/".concat(r),t).then((function(t){if(t.ok)return e.catIn.style.display="flex",t.json();e.errorEl.style.display="block",e.catIn.style.display="none",e.breedSl.style.display="none"})).then((function(t){var n=t.breeds[0],r=t.url,a=n.name,l=n.description,o=n.temperament;e.catIn.innerHTML='<img src="'.concat(r,'" alt="').concat(a,'" width="500" class="photo"/><div class="right"><h1 class="title">').concat(a,'</h1><p class="description">').concat(l,'</p><p class="temperament"><b>Temperement:</b> ').concat(o,"</p></div>")}))).then((function(){e.loaderEl.style.display="none"})).catch((function(t){console.error("Error:",t),e.errorEl.style.display="block",e.loaderEl.style.display="none"}))}))}();
//# sourceMappingURL=index.f07dbe37.js.map

/*! For license information please see app.4d7c2e86.js.LICENSE.txt */
(self.webpackChunk=self.webpackChunk||[]).push([[143],{8144:(e,t,n)=>{"use strict";n(7679),n(6440)},6440:(__unused_webpack_module,__unused_webpack_exports,__webpack_require__)=>{var hinclude;__webpack_require__(6699),__webpack_require__(2023),__webpack_require__(2564),__webpack_require__(2772),__webpack_require__(4916),__webpack_require__(3123),__webpack_require__(9600),__webpack_require__(7327),__webpack_require__(4723),function(){"use strict";hinclude={classprefix:"include_",set_content_async:function(e,t){4===t.readyState&&(200!==t.status&&304!==t.status||(e.innerHTML=t.responseText,hinclude.eval_js(e)),hinclude.set_class(e,t.status),hinclude.trigger_event(e))},buffer:[],set_content_buffered:function(e,t){4===t.readyState&&(hinclude.buffer.push([e,t]),hinclude.outstanding-=1,0===hinclude.outstanding&&hinclude.show_buffered_content())},show_buffered_content:function(){for(var e;hinclude.buffer.length>0;)200!==(e=hinclude.buffer.pop())[1].status&&304!==e[1].status||(e[0].innerHTML=e[1].responseText,hinclude.eval_js(e[0])),hinclude.set_class(e[0],e[1].status),hinclude.trigger_event(e[0])},eval_js:function eval_js(element){var evaljs=element.hasAttribute("evaljs")&&"true"===element.getAttribute("evaljs");if(evaljs){var scripts=element.getElementsByTagName("script"),i;for(i=0;i<scripts.length;i+=1)eval(scripts[i].innerHTML)}},outstanding:0,includes:[],run:function(){var e,t=0,n=this.get_meta("include_mode","buffered");if(this.includes=document.getElementsByTagName("hx:include"),0===this.includes.length&&(this.includes=document.getElementsByTagName("include")),"async"===n)e=this.set_content_async;else if("buffered"===n){e=this.set_content_buffered;var i=1e3*this.get_meta("include_timeout",2.5);setTimeout(hinclude.show_buffered_content,i)}for(;t<this.includes.length;t+=1)this.include(this.includes[t],this.includes[t].getAttribute("src"),this.includes[t].getAttribute("media"),e)},include:function(e,t,n,i){if(!n||!window.matchMedia||window.matchMedia(n).matches)if("data"===t.substring(0,t.indexOf(":")).toLowerCase()){var s=decodeURIComponent(t.substring(t.indexOf(",")+1,t.length));e.innerHTML=s}else{var c=!1;if(window.XMLHttpRequest)try{c=new XMLHttpRequest,e.hasAttribute("data-with-credentials")&&(c.withCredentials=!0)}catch(e){c=!1}else if(window.ActiveXObject)try{c=new ActiveXObject("Microsoft.XMLHTTP")}catch(e){c=!1}if(c){this.outstanding+=1,c.onreadystatechange=function(){i(e,c)};try{c.open("GET",t,!0),c.send("")}catch(e){this.outstanding-=1,alert("Include error: "+t+" ("+e+")")}}}},refresh:function(e){var t,n=0;for(t=this.set_content_buffered;n<this.includes.length;n+=1)this.includes[n].getAttribute("id")===e&&this.include(this.includes[n],this.includes[n].getAttribute("src"),this.includes[n].getAttribute("media"),t)},get_meta:function(e,t){for(var n=0,i=document.getElementsByTagName("meta");n<i.length;n+=1)if(i[n].getAttribute("name")===e)return i[n].getAttribute("content");return t},addDOMLoadEvent:function(e){if(!window.__load_events){var t=function(){var e=0;if(!hinclude.addDOMLoadEvent.done){for(hinclude.addDOMLoadEvent.done=!0,window.__load_timer&&(clearInterval(window.__load_timer),window.__load_timer=null);e<window.__load_events.length;e+=1)window.__load_events[e]();window.__load_events=null}};document.addEventListener&&document.addEventListener("DOMContentLoaded",t,!1),/WebKit/i.test(navigator.userAgent)&&(window.__load_timer=setInterval((function(){/loaded|complete/.test(document.readyState)&&t()}),10)),window.onload=t,window.__load_events=[]}window.__load_events.push(e)},trigger_event:function(e){var t;document.createEvent?((t=document.createEvent("HTMLEvents")).initEvent("hinclude",!0,!0),t.eventName="hinclude",e.dispatchEvent(t)):document.createEventObject&&((t=document.createEventObject()).eventType="hinclude",t.eventName="hinclude",e.fireEvent("on"+t.eventType,t))},set_class:function(e,t){var n=e.className.split(/\s+/).filter((function(e){return!e.match(/^include_\d+$/i)&&!e.match(/^included/i)})).join(" ");e.className=n+(n?" ":"")+"included "+hinclude.classprefix+t}},hinclude.addDOMLoadEvent((function(){hinclude.run()}))}()},7679:(e,t,n)=>{n(9554),n(4747),n(1539),n(8674);var s=document.querySelectorAll(".bt-menu"),c=document.querySelector(".bt-close"),a=document.getElementById("menu");if(s.forEach((function(e){e.addEventListener("click",(function(e){""===a.className?(a.classList.add("active"),c.classList.add("active")):(a.classList.remove("active"),c.classList.remove("active"))}))})),window.onresize=function(){window.innerWidth>=800&&""!==a.className?(a.classList.remove("active"),c.classList.remove("active")):window.innerWidth},"article"===document.querySelector("section").className){var r=document.querySelector(".previous a"),u=document.querySelector(".next a");r&&(r.innerHTML='<svg><title>Article précédent</title><use xlink:href="/img/icons.svg#angle-left"></use></svg>'),u&&(u.innerHTML='<svg><title>Article suivant</title><use xlink:href="/img/icons.svg#angle-right"></use></svg>')}if("liste-articles"===document.querySelector("section").className){var d=document.getElementById("load-articles"),l=document.getElementById("list"),o=1,_=l.dataset.totalArticles,h=l.dataset.limit,f=Math.ceil(_/h);d.addEventListener("click",(function(e){var t;o++,(t="/articles/ajax?page="+o,new Promise((function(e,n){var i=new XMLHttpRequest;i.open("GET",t),i.onload=function(){return 200===i.status?e(i.response):n(Error(i.statusText))},i.onerror=function(e){return n(Error("Network Error: ".concat(e)))},i.send()}))).then((function(e){for(e=JSON.parse(e),i=0;i<e.length;i++){var t=e[i];l.innerHTML+='<li class="item"><a href="/article/'+t.slug+'"><picture><source srcset="/img/article/thumbnail/'+t.photoPath+'.webp" type="image/webp"><source srcset="/img/article/thumbnail/'+t.photoPath+'.jpg" type="image/jpeg"><img src="/img/article/thumbnail/'+t.photoPath+'.jpg" alt="'+t.photoTitle+'"></picture><h3>'+t.title+"</h3></a><p>"+t.body+"</li>"}})).catch((function(e){alert("Une erreur est survenue !")})),o===f&&d.classList.remove("active")}))}}},e=>{e.O(0,[100],(()=>{return t=8144,e(e.s=t);var t}));e.O()}]);
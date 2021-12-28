(self["webpackChunk"] = self["webpackChunk"] || []).push([["app"],{

/***/ "./assets/app.js":
/*!***********************!*\
  !*** ./assets/app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_app_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/app.scss */ "./assets/styles/app.scss");
/* harmony import */ var _script__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./script */ "./assets/script.js");
/* harmony import */ var _script__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_script__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _hinclude_1_2_0_hinclude__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hinclude-1.2.0/hinclude */ "./assets/hinclude-1.2.0/hinclude.js");
/* harmony import */ var _hinclude_1_2_0_hinclude__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_hinclude_1_2_0_hinclude__WEBPACK_IMPORTED_MODULE_2__);
/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */
// any CSS you import will output into a single css file (app.css in this case)
 // JS perso

 // start the Stimulus application
// import './bootstrap';
// import hinclude



/***/ }),

/***/ "./assets/hinclude-1.2.0/hinclude.js":
/*!*******************************************!*\
  !*** ./assets/hinclude-1.2.0/hinclude.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! core-js/modules/es.array.includes.js */ "./node_modules/core-js/modules/es.array.includes.js");

__webpack_require__(/*! core-js/modules/es.string.includes.js */ "./node_modules/core-js/modules/es.string.includes.js");

__webpack_require__(/*! core-js/modules/web.timers.js */ "./node_modules/core-js/modules/web.timers.js");

__webpack_require__(/*! core-js/modules/es.array.index-of.js */ "./node_modules/core-js/modules/es.array.index-of.js");

__webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");

__webpack_require__(/*! core-js/modules/es.string.split.js */ "./node_modules/core-js/modules/es.string.split.js");

__webpack_require__(/*! core-js/modules/es.array.join.js */ "./node_modules/core-js/modules/es.array.join.js");

__webpack_require__(/*! core-js/modules/es.array.filter.js */ "./node_modules/core-js/modules/es.array.filter.js");

__webpack_require__(/*! core-js/modules/es.string.match.js */ "./node_modules/core-js/modules/es.string.match.js");

/*
hinclude.js -- HTML Includes (version 1.1.0)

Copyright (c) 2005-2012 Mark Nottingham <mnot@mnot.net>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

------------------------------------------------------------------------------

See http://mnot.github.com/hinclude/ for documentation.
*/

/*jslint indent: 2, browser: true, vars: true, nomen: true */

/*global alert, ActiveXObject */
var hinclude;

(function () {
  "use strict";

  hinclude = {
    classprefix: "include_",
    set_content_async: function set_content_async(element, req) {
      if (req.readyState === 4) {
        if (req.status === 200 || req.status === 304) {
          element.innerHTML = req.responseText;
          hinclude.eval_js(element);
        }

        hinclude.set_class(element, req.status);
        hinclude.trigger_event(element);
      }
    },
    buffer: [],
    set_content_buffered: function set_content_buffered(element, req) {
      if (req.readyState === 4) {
        hinclude.buffer.push([element, req]);
        hinclude.outstanding -= 1;

        if (hinclude.outstanding === 0) {
          hinclude.show_buffered_content();
        }
      }
    },
    show_buffered_content: function show_buffered_content() {
      var include;

      while (hinclude.buffer.length > 0) {
        include = hinclude.buffer.pop();

        if (include[1].status === 200 || include[1].status === 304) {
          include[0].innerHTML = include[1].responseText;
          hinclude.eval_js(include[0]);
        }

        hinclude.set_class(include[0], include[1].status);
        hinclude.trigger_event(include[0]);
      }
    },
    eval_js: function eval_js(element) {
      var evaljs = element.hasAttribute('evaljs') && element.getAttribute('evaljs') === "true";

      if (evaljs) {
        var scripts = element.getElementsByTagName('script');
        var i;

        for (i = 0; i < scripts.length; i = i + 1) {
          /*jslint evil: true */
          eval(scripts[i].innerHTML);
        }
      }
    },
    outstanding: 0,
    includes: [],
    run: function run() {
      var i = 0;
      var mode = this.get_meta("include_mode", "buffered");
      var callback;
      this.includes = document.getElementsByTagName("hx:include");

      if (this.includes.length === 0) {
        // remove ns for IE
        this.includes = document.getElementsByTagName("include");
      }

      if (mode === "async") {
        callback = this.set_content_async;
      } else if (mode === "buffered") {
        callback = this.set_content_buffered;
        var timeout = this.get_meta("include_timeout", 2.5) * 1000;
        setTimeout(hinclude.show_buffered_content, timeout);
      }

      for (i; i < this.includes.length; i += 1) {
        this.include(this.includes[i], this.includes[i].getAttribute("src"), this.includes[i].getAttribute("media"), callback);
      }
    },
    include: function include(element, url, media, incl_cb) {
      if (media && window.matchMedia && !window.matchMedia(media).matches) {
        return;
      }

      var scheme = url.substring(0, url.indexOf(":"));

      if (scheme.toLowerCase() === "data") {
        // just text/plain for now
        var data = decodeURIComponent(url.substring(url.indexOf(",") + 1, url.length));
        element.innerHTML = data;
      } else {
        var req = false;

        if (window.XMLHttpRequest) {
          try {
            req = new XMLHttpRequest();

            if (element.hasAttribute('data-with-credentials')) {
              req.withCredentials = true;
            }
          } catch (e1) {
            req = false;
          }
        } else if (window.ActiveXObject) {
          try {
            req = new ActiveXObject("Microsoft.XMLHTTP");
          } catch (e2) {
            req = false;
          }
        }

        if (req) {
          this.outstanding += 1;

          req.onreadystatechange = function () {
            incl_cb(element, req);
          };

          try {
            req.open("GET", url, true);
            req.send("");
          } catch (e3) {
            this.outstanding -= 1;
            alert("Include error: " + url + " (" + e3 + ")");
          }
        }
      }
    },
    refresh: function refresh(element_id) {
      var i = 0;
      var callback;
      callback = this.set_content_buffered;

      for (i; i < this.includes.length; i += 1) {
        if (this.includes[i].getAttribute("id") === element_id) {
          this.include(this.includes[i], this.includes[i].getAttribute("src"), this.includes[i].getAttribute("media"), callback);
        }
      }
    },
    get_meta: function get_meta(name, value_default) {
      var m = 0;
      var metas = document.getElementsByTagName("meta");
      var meta_name;

      for (m; m < metas.length; m += 1) {
        meta_name = metas[m].getAttribute("name");

        if (meta_name === name) {
          return metas[m].getAttribute("content");
        }
      }

      return value_default;
    },

    /*
     * (c)2006 Dean Edwards/Matthias Miller/John Resig
     * Special thanks to Dan Webb's domready.js Prototype extension
     * and Simon Willison's addLoadEvent
     *
     * For more info, see:
     * http://dean.edwards.name/weblog/2006/06/again/
     *
     * Thrown together by Jesse Skinner (http://www.thefutureoftheweb.com/)
     */
    addDOMLoadEvent: function addDOMLoadEvent(func) {
      if (!window.__load_events) {
        var init = function init() {
          var i = 0; // quit if this function has already been called

          if (hinclude.addDOMLoadEvent.done) {
            return;
          }

          hinclude.addDOMLoadEvent.done = true;

          if (window.__load_timer) {
            clearInterval(window.__load_timer);
            window.__load_timer = null;
          }

          for (i; i < window.__load_events.length; i += 1) {
            window.__load_events[i]();
          }

          window.__load_events = null; // clean up the __ie_onload event

          /*@cc_on
          document.getElementById("__ie_onload").onreadystatechange = "";
          @*/
        }; // for Mozilla/Opera9


        if (document.addEventListener) {
          document.addEventListener("DOMContentLoaded", init, false);
        } // for Internet Explorer

        /*@cc_on
        var script = document.createElement('script');
        script.id = '__ie_onload';
        script.setAttribute("defer", "defer");
        document.getElementsByTagName('head')[0].appendChild(script);
        script.onreadystatechange = function () {
          if (this.readyState === "complete") {
            init(); // call the onload handler
          }
        };
        @*/
        // for Safari


        if (/WebKit/i.test(navigator.userAgent)) {
          // sniff
          window.__load_timer = setInterval(function () {
            if (/loaded|complete/.test(document.readyState)) {
              init();
            }
          }, 10);
        } // for other browsers


        window.onload = init;
        window.__load_events = [];
      }

      window.__load_events.push(func);
    },
    trigger_event: function trigger_event(element) {
      var event;

      if (document.createEvent) {
        event = document.createEvent("HTMLEvents");
        event.initEvent("hinclude", true, true);
        event.eventName = "hinclude";
        element.dispatchEvent(event);
      } else if (document.createEventObject) {
        // IE
        event = document.createEventObject();
        event.eventType = "hinclude";
        event.eventName = "hinclude";
        element.fireEvent("on" + event.eventType, event);
      }
    },
    set_class: function set_class(element, status) {
      var tokens = element.className.split(/\s+/);
      var otherClasses = tokens.filter(function (token) {
        return !token.match(/^include_\d+$/i) && !token.match(/^included/i);
      }).join(' ');
      element.className = otherClasses + (otherClasses ? ' ' : '') + 'included ' + hinclude.classprefix + status;
    }
  };
  hinclude.addDOMLoadEvent(function () {
    hinclude.run();
  });
})();

/***/ }),

/***/ "./assets/script.js":
/*!**************************!*\
  !*** ./assets/script.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! core-js/modules/es.array.for-each.js */ "./node_modules/core-js/modules/es.array.for-each.js");

__webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");

__webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");

__webpack_require__(/*! core-js/modules/es.promise.js */ "./node_modules/core-js/modules/es.promise.js");

/* Script JS du projet DWWM - Bertrand Delanlssays 2021  - */
var btMenu = document.querySelectorAll('.bt-menu');
var btClose = document.querySelector('.bt-close');
var menu = document.getElementById("menu");
btMenu.forEach(function (elem) {
  elem.addEventListener('click', function (e) {
    if (menu.className === "") {
      menu.classList.add("active");
      btClose.classList.add("active");
    } else {
      menu.classList.remove("active");
      btClose.classList.remove("active");
    }
  });
}); // close window when width than 800px

window.onresize = function () {
  if (window.innerWidth >= 800 && menu.className !== "") {
    menu.classList.remove("active");
    btClose.classList.remove("active");
  } else if (window.innerWidth < 800) {}
}; // close message


var btMsg = document.querySelector('.bt-message');

if (btMsg) {
  btMsg.addEventListener('click', function (e) {
    btMsg.parentNode.classList.add('close');
  });
} // articles


if (document.querySelector('section').className === 'article') {
  var btPrevious = document.querySelector('.previous a');
  var btNext = document.querySelector('.next a');

  if (btPrevious) {
    btPrevious.innerHTML = '<svg><title>Article précédent</title><use xlink:href="/img/icons.svg#angle-left"></use></svg>';
  }

  if (btNext) {
    btNext.innerHTML = '<svg><title>Article suivant</title><use xlink:href="/img/icons.svg#angle-right"></use></svg>';
  }
} // plus d'articles


if (document.querySelector('section').className === 'liste-articles') {
  var get = function get(url) {
    return new Promise(function (resolve, reject) {
      var req = new XMLHttpRequest();
      req.open('GET', url);

      req.onload = function () {
        return req.status === 200 ? resolve(req.response) : reject(Error(req.statusText));
      };

      req.onerror = function (e) {
        return reject(Error("Network Error: ".concat(e)));
      };

      req.send();
    });
  };

  var btArticles = document.getElementById("load-articles");
  var list = document.getElementById("list");
  var page = 1;
  var totalArticles = list.dataset.totalArticles;
  var limit = list.dataset.limit;
  var nbPages = Math.ceil(totalArticles / limit);
  btArticles.addEventListener('click', function (e) {
    page++;
    get("/articles/ajax?page=" + page).then(function (data) {
      data = JSON.parse(data);

      for (i = 0; i < data.length; i++) {
        var article = data[i];
        list.innerHTML += '<li class="item">' + '<a href="/article/' + article['slug'] + '">' + '<picture>' + '<source srcset="/img/article/thumbnail/' + article['photoPath'] + '.webp" type="image/webp">' + '<source srcset="/img/article/thumbnail/' + article['photoPath'] + '.jpg" type="image/jpeg">' + '<img src="/img/article/thumbnail/' + article['photoPath'] + '.jpg" alt="' + article['photoTitle'] + '">' + '</picture>' + '<h3>' + article['title'] + '</h3>' + '</a>' + '<p>' + article['body'] + '</li>';
      }
    })["catch"](function (err) {
      alert('Une erreur est survenue !');
    });

    if (page === nbPages) {
      btArticles.classList.remove("active");
    }
  });
}

/***/ }),

/***/ "./assets/styles/app.scss":
/*!********************************!*\
  !*** ./assets/styles/app.scss ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_core-js_modules_es_array_filter_js-node_modules_core-js_modules_es_array-4af10b"], () => (__webpack_exec__("./assets/app.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0NBR0E7O0NBR0E7QUFDQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUNBO0FBRUEsSUFBSUEsUUFBSjs7QUFFQyxhQUFZO0FBRVg7O0FBRUFBLEVBQUFBLFFBQVEsR0FBRztBQUNUQyxJQUFBQSxXQUFXLEVBQUUsVUFESjtBQUdUQyxJQUFBQSxpQkFBaUIsRUFBRSwyQkFBVUMsT0FBVixFQUFtQkMsR0FBbkIsRUFBd0I7QUFDekMsVUFBSUEsR0FBRyxDQUFDQyxVQUFKLEtBQW1CLENBQXZCLEVBQTBCO0FBQ3hCLFlBQUlELEdBQUcsQ0FBQ0UsTUFBSixLQUFlLEdBQWYsSUFBc0JGLEdBQUcsQ0FBQ0UsTUFBSixLQUFlLEdBQXpDLEVBQThDO0FBQzVDSCxVQUFBQSxPQUFPLENBQUNJLFNBQVIsR0FBb0JILEdBQUcsQ0FBQ0ksWUFBeEI7QUFDQVIsVUFBQUEsUUFBUSxDQUFDUyxPQUFULENBQWlCTixPQUFqQjtBQUNEOztBQUVESCxRQUFBQSxRQUFRLENBQUNVLFNBQVQsQ0FBbUJQLE9BQW5CLEVBQTRCQyxHQUFHLENBQUNFLE1BQWhDO0FBRUFOLFFBQUFBLFFBQVEsQ0FBQ1csYUFBVCxDQUF1QlIsT0FBdkI7QUFDRDtBQUNGLEtBZFE7QUFnQlRTLElBQUFBLE1BQU0sRUFBRSxFQWhCQztBQWlCVEMsSUFBQUEsb0JBQW9CLEVBQUUsOEJBQVVWLE9BQVYsRUFBbUJDLEdBQW5CLEVBQXdCO0FBQzVDLFVBQUlBLEdBQUcsQ0FBQ0MsVUFBSixLQUFtQixDQUF2QixFQUEwQjtBQUN4QkwsUUFBQUEsUUFBUSxDQUFDWSxNQUFULENBQWdCRSxJQUFoQixDQUFxQixDQUFDWCxPQUFELEVBQVVDLEdBQVYsQ0FBckI7QUFDQUosUUFBQUEsUUFBUSxDQUFDZSxXQUFULElBQXdCLENBQXhCOztBQUNBLFlBQUlmLFFBQVEsQ0FBQ2UsV0FBVCxLQUF5QixDQUE3QixFQUFnQztBQUM5QmYsVUFBQUEsUUFBUSxDQUFDZ0IscUJBQVQ7QUFDRDtBQUNGO0FBQ0YsS0F6QlE7QUEyQlRBLElBQUFBLHFCQUFxQixFQUFFLGlDQUFZO0FBQ2pDLFVBQUlDLE9BQUo7O0FBQ0EsYUFBT2pCLFFBQVEsQ0FBQ1ksTUFBVCxDQUFnQk0sTUFBaEIsR0FBeUIsQ0FBaEMsRUFBbUM7QUFDakNELFFBQUFBLE9BQU8sR0FBR2pCLFFBQVEsQ0FBQ1ksTUFBVCxDQUFnQk8sR0FBaEIsRUFBVjs7QUFDQSxZQUFJRixPQUFPLENBQUMsQ0FBRCxDQUFQLENBQVdYLE1BQVgsS0FBc0IsR0FBdEIsSUFBNkJXLE9BQU8sQ0FBQyxDQUFELENBQVAsQ0FBV1gsTUFBWCxLQUFzQixHQUF2RCxFQUE0RDtBQUMxRFcsVUFBQUEsT0FBTyxDQUFDLENBQUQsQ0FBUCxDQUFXVixTQUFYLEdBQXVCVSxPQUFPLENBQUMsQ0FBRCxDQUFQLENBQVdULFlBQWxDO0FBQ0FSLFVBQUFBLFFBQVEsQ0FBQ1MsT0FBVCxDQUFpQlEsT0FBTyxDQUFDLENBQUQsQ0FBeEI7QUFDRDs7QUFDRGpCLFFBQUFBLFFBQVEsQ0FBQ1UsU0FBVCxDQUFtQk8sT0FBTyxDQUFDLENBQUQsQ0FBMUIsRUFBK0JBLE9BQU8sQ0FBQyxDQUFELENBQVAsQ0FBV1gsTUFBMUM7QUFDQU4sUUFBQUEsUUFBUSxDQUFDVyxhQUFULENBQXVCTSxPQUFPLENBQUMsQ0FBRCxDQUE5QjtBQUNEO0FBQ0YsS0F0Q1E7QUF3Q1RSLElBQUFBLE9BQU8sRUFBRSxpQkFBVU4sT0FBVixFQUFtQjtBQUMxQixVQUFJaUIsTUFBTSxHQUFHakIsT0FBTyxDQUFDa0IsWUFBUixDQUFxQixRQUFyQixLQUFrQ2xCLE9BQU8sQ0FBQ21CLFlBQVIsQ0FBcUIsUUFBckIsTUFBbUMsTUFBbEY7O0FBQ0EsVUFBSUYsTUFBSixFQUFZO0FBQ1YsWUFBSUcsT0FBTyxHQUFHcEIsT0FBTyxDQUFDcUIsb0JBQVIsQ0FBNkIsUUFBN0IsQ0FBZDtBQUNBLFlBQUlDLENBQUo7O0FBQ0EsYUFBS0EsQ0FBQyxHQUFHLENBQVQsRUFBWUEsQ0FBQyxHQUFHRixPQUFPLENBQUNMLE1BQXhCLEVBQWdDTyxDQUFDLEdBQUdBLENBQUMsR0FBRyxDQUF4QyxFQUEyQztBQUN6QztBQUNBQyxVQUFBQSxJQUFJLENBQUNILE9BQU8sQ0FBQ0UsQ0FBRCxDQUFQLENBQVdsQixTQUFaLENBQUo7QUFDRDtBQUNGO0FBQ0YsS0FsRFE7QUFvRFRRLElBQUFBLFdBQVcsRUFBRSxDQXBESjtBQXFEVFksSUFBQUEsUUFBUSxFQUFFLEVBckREO0FBc0RUQyxJQUFBQSxHQUFHLEVBQUUsZUFBWTtBQUNmLFVBQUlILENBQUMsR0FBRyxDQUFSO0FBQ0EsVUFBSUksSUFBSSxHQUFHLEtBQUtDLFFBQUwsQ0FBYyxjQUFkLEVBQThCLFVBQTlCLENBQVg7QUFDQSxVQUFJQyxRQUFKO0FBQ0EsV0FBS0osUUFBTCxHQUFnQkssUUFBUSxDQUFDUixvQkFBVCxDQUE4QixZQUE5QixDQUFoQjs7QUFDQSxVQUFJLEtBQUtHLFFBQUwsQ0FBY1QsTUFBZCxLQUF5QixDQUE3QixFQUFnQztBQUFFO0FBQ2hDLGFBQUtTLFFBQUwsR0FBZ0JLLFFBQVEsQ0FBQ1Isb0JBQVQsQ0FBOEIsU0FBOUIsQ0FBaEI7QUFDRDs7QUFDRCxVQUFJSyxJQUFJLEtBQUssT0FBYixFQUFzQjtBQUNwQkUsUUFBQUEsUUFBUSxHQUFHLEtBQUs3QixpQkFBaEI7QUFDRCxPQUZELE1BRU8sSUFBSTJCLElBQUksS0FBSyxVQUFiLEVBQXlCO0FBQzlCRSxRQUFBQSxRQUFRLEdBQUcsS0FBS2xCLG9CQUFoQjtBQUNBLFlBQUlvQixPQUFPLEdBQUcsS0FBS0gsUUFBTCxDQUFjLGlCQUFkLEVBQWlDLEdBQWpDLElBQXdDLElBQXREO0FBQ0FJLFFBQUFBLFVBQVUsQ0FBQ2xDLFFBQVEsQ0FBQ2dCLHFCQUFWLEVBQWlDaUIsT0FBakMsQ0FBVjtBQUNEOztBQUVELFdBQUtSLENBQUwsRUFBUUEsQ0FBQyxHQUFHLEtBQUtFLFFBQUwsQ0FBY1QsTUFBMUIsRUFBa0NPLENBQUMsSUFBSSxDQUF2QyxFQUEwQztBQUN4QyxhQUFLUixPQUFMLENBQWEsS0FBS1UsUUFBTCxDQUFjRixDQUFkLENBQWIsRUFBK0IsS0FBS0UsUUFBTCxDQUFjRixDQUFkLEVBQWlCSCxZQUFqQixDQUE4QixLQUE5QixDQUEvQixFQUFxRSxLQUFLSyxRQUFMLENBQWNGLENBQWQsRUFBaUJILFlBQWpCLENBQThCLE9BQTlCLENBQXJFLEVBQTZHUyxRQUE3RztBQUNEO0FBQ0YsS0F6RVE7QUEyRVRkLElBQUFBLE9BQU8sRUFBRSxpQkFBVWQsT0FBVixFQUFtQmdDLEdBQW5CLEVBQXdCQyxLQUF4QixFQUErQkMsT0FBL0IsRUFBd0M7QUFDL0MsVUFBSUQsS0FBSyxJQUFJRSxNQUFNLENBQUNDLFVBQWhCLElBQThCLENBQUNELE1BQU0sQ0FBQ0MsVUFBUCxDQUFrQkgsS0FBbEIsRUFBeUJJLE9BQTVELEVBQXFFO0FBQ25FO0FBQ0Q7O0FBQ0QsVUFBSUMsTUFBTSxHQUFHTixHQUFHLENBQUNPLFNBQUosQ0FBYyxDQUFkLEVBQWlCUCxHQUFHLENBQUNRLE9BQUosQ0FBWSxHQUFaLENBQWpCLENBQWI7O0FBQ0EsVUFBSUYsTUFBTSxDQUFDRyxXQUFQLE9BQXlCLE1BQTdCLEVBQXFDO0FBQUU7QUFDckMsWUFBSUMsSUFBSSxHQUFHQyxrQkFBa0IsQ0FBQ1gsR0FBRyxDQUFDTyxTQUFKLENBQWNQLEdBQUcsQ0FBQ1EsT0FBSixDQUFZLEdBQVosSUFBbUIsQ0FBakMsRUFBb0NSLEdBQUcsQ0FBQ2pCLE1BQXhDLENBQUQsQ0FBN0I7QUFDQWYsUUFBQUEsT0FBTyxDQUFDSSxTQUFSLEdBQW9Cc0MsSUFBcEI7QUFDRCxPQUhELE1BR087QUFDTCxZQUFJekMsR0FBRyxHQUFHLEtBQVY7O0FBQ0EsWUFBSWtDLE1BQU0sQ0FBQ1MsY0FBWCxFQUEyQjtBQUN6QixjQUFJO0FBQ0YzQyxZQUFBQSxHQUFHLEdBQUcsSUFBSTJDLGNBQUosRUFBTjs7QUFDQSxnQkFBSTVDLE9BQU8sQ0FBQ2tCLFlBQVIsQ0FBcUIsdUJBQXJCLENBQUosRUFBbUQ7QUFDakRqQixjQUFBQSxHQUFHLENBQUM0QyxlQUFKLEdBQXNCLElBQXRCO0FBQ0Q7QUFDRixXQUxELENBS0UsT0FBT0MsRUFBUCxFQUFXO0FBQ1g3QyxZQUFBQSxHQUFHLEdBQUcsS0FBTjtBQUNEO0FBQ0YsU0FURCxNQVNPLElBQUlrQyxNQUFNLENBQUNZLGFBQVgsRUFBMEI7QUFDL0IsY0FBSTtBQUNGOUMsWUFBQUEsR0FBRyxHQUFHLElBQUk4QyxhQUFKLENBQWtCLG1CQUFsQixDQUFOO0FBQ0QsV0FGRCxDQUVFLE9BQU9DLEVBQVAsRUFBVztBQUNYL0MsWUFBQUEsR0FBRyxHQUFHLEtBQU47QUFDRDtBQUNGOztBQUNELFlBQUlBLEdBQUosRUFBUztBQUNQLGVBQUtXLFdBQUwsSUFBb0IsQ0FBcEI7O0FBQ0FYLFVBQUFBLEdBQUcsQ0FBQ2dELGtCQUFKLEdBQXlCLFlBQVk7QUFDbkNmLFlBQUFBLE9BQU8sQ0FBQ2xDLE9BQUQsRUFBVUMsR0FBVixDQUFQO0FBQ0QsV0FGRDs7QUFHQSxjQUFJO0FBQ0ZBLFlBQUFBLEdBQUcsQ0FBQ2lELElBQUosQ0FBUyxLQUFULEVBQWdCbEIsR0FBaEIsRUFBcUIsSUFBckI7QUFDQS9CLFlBQUFBLEdBQUcsQ0FBQ2tELElBQUosQ0FBUyxFQUFUO0FBQ0QsV0FIRCxDQUdFLE9BQU9DLEVBQVAsRUFBVztBQUNYLGlCQUFLeEMsV0FBTCxJQUFvQixDQUFwQjtBQUNBeUMsWUFBQUEsS0FBSyxDQUFDLG9CQUFvQnJCLEdBQXBCLEdBQTBCLElBQTFCLEdBQWlDb0IsRUFBakMsR0FBc0MsR0FBdkMsQ0FBTDtBQUNEO0FBQ0Y7QUFDRjtBQUNGLEtBbkhRO0FBcUhURSxJQUFBQSxPQUFPLEVBQUUsaUJBQVVDLFVBQVYsRUFBc0I7QUFDN0IsVUFBSWpDLENBQUMsR0FBRyxDQUFSO0FBQ0EsVUFBSU0sUUFBSjtBQUNBQSxNQUFBQSxRQUFRLEdBQUcsS0FBS2xCLG9CQUFoQjs7QUFDQSxXQUFLWSxDQUFMLEVBQVFBLENBQUMsR0FBRyxLQUFLRSxRQUFMLENBQWNULE1BQTFCLEVBQWtDTyxDQUFDLElBQUksQ0FBdkMsRUFBMEM7QUFDeEMsWUFBSSxLQUFLRSxRQUFMLENBQWNGLENBQWQsRUFBaUJILFlBQWpCLENBQThCLElBQTlCLE1BQXdDb0MsVUFBNUMsRUFBd0Q7QUFDdEQsZUFBS3pDLE9BQUwsQ0FBYSxLQUFLVSxRQUFMLENBQWNGLENBQWQsQ0FBYixFQUErQixLQUFLRSxRQUFMLENBQWNGLENBQWQsRUFBaUJILFlBQWpCLENBQThCLEtBQTlCLENBQS9CLEVBQXFFLEtBQUtLLFFBQUwsQ0FBY0YsQ0FBZCxFQUFpQkgsWUFBakIsQ0FBOEIsT0FBOUIsQ0FBckUsRUFBNkdTLFFBQTdHO0FBQ0Q7QUFDRjtBQUNGLEtBOUhRO0FBZ0lURCxJQUFBQSxRQUFRLEVBQUUsa0JBQVU2QixJQUFWLEVBQWdCQyxhQUFoQixFQUErQjtBQUN2QyxVQUFJQyxDQUFDLEdBQUcsQ0FBUjtBQUNBLFVBQUlDLEtBQUssR0FBRzlCLFFBQVEsQ0FBQ1Isb0JBQVQsQ0FBOEIsTUFBOUIsQ0FBWjtBQUNBLFVBQUl1QyxTQUFKOztBQUNBLFdBQUtGLENBQUwsRUFBUUEsQ0FBQyxHQUFHQyxLQUFLLENBQUM1QyxNQUFsQixFQUEwQjJDLENBQUMsSUFBSSxDQUEvQixFQUFrQztBQUNoQ0UsUUFBQUEsU0FBUyxHQUFHRCxLQUFLLENBQUNELENBQUQsQ0FBTCxDQUFTdkMsWUFBVCxDQUFzQixNQUF0QixDQUFaOztBQUNBLFlBQUl5QyxTQUFTLEtBQUtKLElBQWxCLEVBQXdCO0FBQ3RCLGlCQUFPRyxLQUFLLENBQUNELENBQUQsQ0FBTCxDQUFTdkMsWUFBVCxDQUFzQixTQUF0QixDQUFQO0FBQ0Q7QUFDRjs7QUFDRCxhQUFPc0MsYUFBUDtBQUNELEtBM0lROztBQTZJVDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJSSxJQUFBQSxlQUFlLEVBQUUseUJBQVVDLElBQVYsRUFBZ0I7QUFDL0IsVUFBSSxDQUFDM0IsTUFBTSxDQUFDNEIsYUFBWixFQUEyQjtBQUN6QixZQUFJQyxJQUFJLEdBQUcsU0FBUEEsSUFBTyxHQUFZO0FBQ3JCLGNBQUkxQyxDQUFDLEdBQUcsQ0FBUixDQURxQixDQUVyQjs7QUFDQSxjQUFJekIsUUFBUSxDQUFDZ0UsZUFBVCxDQUF5QkksSUFBN0IsRUFBbUM7QUFBQztBQUFTOztBQUM3Q3BFLFVBQUFBLFFBQVEsQ0FBQ2dFLGVBQVQsQ0FBeUJJLElBQXpCLEdBQWdDLElBQWhDOztBQUNBLGNBQUk5QixNQUFNLENBQUMrQixZQUFYLEVBQXlCO0FBQ3ZCQyxZQUFBQSxhQUFhLENBQUNoQyxNQUFNLENBQUMrQixZQUFSLENBQWI7QUFDQS9CLFlBQUFBLE1BQU0sQ0FBQytCLFlBQVAsR0FBc0IsSUFBdEI7QUFDRDs7QUFDRCxlQUFLNUMsQ0FBTCxFQUFRQSxDQUFDLEdBQUdhLE1BQU0sQ0FBQzRCLGFBQVAsQ0FBcUJoRCxNQUFqQyxFQUF5Q08sQ0FBQyxJQUFJLENBQTlDLEVBQWlEO0FBQy9DYSxZQUFBQSxNQUFNLENBQUM0QixhQUFQLENBQXFCekMsQ0FBckI7QUFDRDs7QUFDRGEsVUFBQUEsTUFBTSxDQUFDNEIsYUFBUCxHQUF1QixJQUF2QixDQVpxQixDQWFyQjs7QUFDQTtBQUNWO0FBQ0E7QUFDUyxTQWpCRCxDQUR5QixDQW1CekI7OztBQUNBLFlBQUlsQyxRQUFRLENBQUN1QyxnQkFBYixFQUErQjtBQUM3QnZDLFVBQUFBLFFBQVEsQ0FBQ3VDLGdCQUFULENBQTBCLGtCQUExQixFQUE4Q0osSUFBOUMsRUFBb0QsS0FBcEQ7QUFDRCxTQXRCd0IsQ0F1QnpCOztBQUNBO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDUTs7O0FBQ0EsWUFBSSxVQUFVSyxJQUFWLENBQWVDLFNBQVMsQ0FBQ0MsU0FBekIsQ0FBSixFQUF5QztBQUFFO0FBQ3pDcEMsVUFBQUEsTUFBTSxDQUFDK0IsWUFBUCxHQUFzQk0sV0FBVyxDQUFDLFlBQVk7QUFDNUMsZ0JBQUksa0JBQWtCSCxJQUFsQixDQUF1QnhDLFFBQVEsQ0FBQzNCLFVBQWhDLENBQUosRUFBaUQ7QUFDL0M4RCxjQUFBQSxJQUFJO0FBQ0w7QUFDRixXQUpnQyxFQUk5QixFQUo4QixDQUFqQztBQUtELFNBMUN3QixDQTJDekI7OztBQUNBN0IsUUFBQUEsTUFBTSxDQUFDc0MsTUFBUCxHQUFnQlQsSUFBaEI7QUFDQTdCLFFBQUFBLE1BQU0sQ0FBQzRCLGFBQVAsR0FBdUIsRUFBdkI7QUFDRDs7QUFDRDVCLE1BQUFBLE1BQU0sQ0FBQzRCLGFBQVAsQ0FBcUJwRCxJQUFyQixDQUEwQm1ELElBQTFCO0FBQ0QsS0F4TVE7QUEwTVR0RCxJQUFBQSxhQUFhLEVBQUUsdUJBQVVSLE9BQVYsRUFBbUI7QUFDaEMsVUFBSTBFLEtBQUo7O0FBRUEsVUFBSTdDLFFBQVEsQ0FBQzhDLFdBQWIsRUFBMEI7QUFDeEJELFFBQUFBLEtBQUssR0FBRzdDLFFBQVEsQ0FBQzhDLFdBQVQsQ0FBcUIsWUFBckIsQ0FBUjtBQUNBRCxRQUFBQSxLQUFLLENBQUNFLFNBQU4sQ0FBZ0IsVUFBaEIsRUFBNEIsSUFBNUIsRUFBa0MsSUFBbEM7QUFDQUYsUUFBQUEsS0FBSyxDQUFDRyxTQUFOLEdBQWtCLFVBQWxCO0FBQ0E3RSxRQUFBQSxPQUFPLENBQUM4RSxhQUFSLENBQXNCSixLQUF0QjtBQUVELE9BTkQsTUFNTyxJQUFJN0MsUUFBUSxDQUFDa0QsaUJBQWIsRUFBZ0M7QUFBRTtBQUN2Q0wsUUFBQUEsS0FBSyxHQUFHN0MsUUFBUSxDQUFDa0QsaUJBQVQsRUFBUjtBQUNBTCxRQUFBQSxLQUFLLENBQUNNLFNBQU4sR0FBa0IsVUFBbEI7QUFDQU4sUUFBQUEsS0FBSyxDQUFDRyxTQUFOLEdBQWtCLFVBQWxCO0FBQ0E3RSxRQUFBQSxPQUFPLENBQUNpRixTQUFSLENBQWtCLE9BQU9QLEtBQUssQ0FBQ00sU0FBL0IsRUFBMENOLEtBQTFDO0FBQ0Q7QUFDRixLQXpOUTtBQTJOVG5FLElBQUFBLFNBQVMsRUFBRSxtQkFBVVAsT0FBVixFQUFtQkcsTUFBbkIsRUFBMkI7QUFDcEMsVUFBSStFLE1BQU0sR0FBR2xGLE9BQU8sQ0FBQ21GLFNBQVIsQ0FBa0JDLEtBQWxCLENBQXdCLEtBQXhCLENBQWI7QUFDQSxVQUFJQyxZQUFZLEdBQUdILE1BQU0sQ0FBQ0ksTUFBUCxDQUFjLFVBQVVDLEtBQVYsRUFBaUI7QUFDaEQsZUFBTyxDQUFDQSxLQUFLLENBQUNDLEtBQU4sQ0FBWSxnQkFBWixDQUFELElBQWtDLENBQUNELEtBQUssQ0FBQ0MsS0FBTixDQUFZLFlBQVosQ0FBMUM7QUFDRCxPQUZrQixFQUVoQkMsSUFGZ0IsQ0FFWCxHQUZXLENBQW5CO0FBSUF6RixNQUFBQSxPQUFPLENBQUNtRixTQUFSLEdBQW9CRSxZQUFZLElBQUlBLFlBQVksR0FBRyxHQUFILEdBQVMsRUFBekIsQ0FBWixHQUNsQixXQURrQixHQUNKeEYsUUFBUSxDQUFDQyxXQURMLEdBQ21CSyxNQUR2QztBQUVEO0FBbk9RLEdBQVg7QUFzT0FOLEVBQUFBLFFBQVEsQ0FBQ2dFLGVBQVQsQ0FBeUIsWUFBWTtBQUFFaEUsSUFBQUEsUUFBUSxDQUFDNEIsR0FBVDtBQUFpQixHQUF4RDtBQUNELENBM09BLEdBQUQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pDQTtBQUVBLElBQU1pRSxNQUFNLEdBQUc3RCxRQUFRLENBQUM4RCxnQkFBVCxDQUEwQixVQUExQixDQUFmO0FBQ0EsSUFBTUMsT0FBTyxHQUFHL0QsUUFBUSxDQUFDZ0UsYUFBVCxDQUF1QixXQUF2QixDQUFoQjtBQUNBLElBQU1DLElBQUksR0FBR2pFLFFBQVEsQ0FBQ2tFLGNBQVQsQ0FBd0IsTUFBeEIsQ0FBYjtBQUVBTCxNQUFNLENBQUNNLE9BQVAsQ0FBZSxVQUFBQyxJQUFJLEVBQUk7QUFFbkJBLEVBQUFBLElBQUksQ0FBQzdCLGdCQUFMLENBQXNCLE9BQXRCLEVBQStCLFVBQUE4QixDQUFDLEVBQUk7QUFDaEMsUUFBSUosSUFBSSxDQUFDWCxTQUFMLEtBQW1CLEVBQXZCLEVBQTJCO0FBQ3ZCVyxNQUFBQSxJQUFJLENBQUNLLFNBQUwsQ0FBZUMsR0FBZixDQUFtQixRQUFuQjtBQUNBUixNQUFBQSxPQUFPLENBQUNPLFNBQVIsQ0FBa0JDLEdBQWxCLENBQXNCLFFBQXRCO0FBQ0gsS0FIRCxNQUdPO0FBQ0hOLE1BQUFBLElBQUksQ0FBQ0ssU0FBTCxDQUFlRSxNQUFmLENBQXNCLFFBQXRCO0FBQ0FULE1BQUFBLE9BQU8sQ0FBQ08sU0FBUixDQUFrQkUsTUFBbEIsQ0FBeUIsUUFBekI7QUFDSDtBQUNKLEdBUkQ7QUFVSCxDQVpELEdBY0E7O0FBRUFsRSxNQUFNLENBQUNtRSxRQUFQLEdBQWtCLFlBQUs7QUFDbkIsTUFBR25FLE1BQU0sQ0FBQ29FLFVBQVAsSUFBcUIsR0FBckIsSUFBNEJULElBQUksQ0FBQ1gsU0FBTCxLQUFtQixFQUFsRCxFQUFxRDtBQUM3Q1csSUFBQUEsSUFBSSxDQUFDSyxTQUFMLENBQWVFLE1BQWYsQ0FBc0IsUUFBdEI7QUFDQVQsSUFBQUEsT0FBTyxDQUFDTyxTQUFSLENBQWtCRSxNQUFsQixDQUF5QixRQUF6QjtBQUNQLEdBSEQsTUFHTSxJQUFJbEUsTUFBTSxDQUFDb0UsVUFBUCxHQUFvQixHQUF4QixFQUE0QixDQUNqQztBQUVKLENBUEQsRUFTQTs7O0FBQ0EsSUFBSUMsS0FBSyxHQUFHM0UsUUFBUSxDQUFDZ0UsYUFBVCxDQUF1QixhQUF2QixDQUFaOztBQUVBLElBQUlXLEtBQUosRUFBVTtBQUNOQSxFQUFBQSxLQUFLLENBQUNwQyxnQkFBTixDQUF1QixPQUF2QixFQUFnQyxVQUFBOEIsQ0FBQyxFQUFJO0FBQ2pDTSxJQUFBQSxLQUFLLENBQUNDLFVBQU4sQ0FBaUJOLFNBQWpCLENBQTJCQyxHQUEzQixDQUErQixPQUEvQjtBQUNILEdBRkQ7QUFHSCxFQUlEOzs7QUFDQSxJQUFJdkUsUUFBUSxDQUFDZ0UsYUFBVCxDQUF1QixTQUF2QixFQUFrQ1YsU0FBbEMsS0FBZ0QsU0FBcEQsRUFBOEQ7QUFDMUQsTUFBTXVCLFVBQVUsR0FBRzdFLFFBQVEsQ0FBQ2dFLGFBQVQsQ0FBdUIsYUFBdkIsQ0FBbkI7QUFDQSxNQUFNYyxNQUFNLEdBQUc5RSxRQUFRLENBQUNnRSxhQUFULENBQXVCLFNBQXZCLENBQWY7O0FBRUEsTUFBSWEsVUFBSixFQUFnQjtBQUNaQSxJQUFBQSxVQUFVLENBQUN0RyxTQUFYLEdBQXVCLCtGQUF2QjtBQUNIOztBQUNELE1BQUl1RyxNQUFKLEVBQVk7QUFDUkEsSUFBQUEsTUFBTSxDQUFDdkcsU0FBUCxHQUFtQiw4RkFBbkI7QUFDSDtBQUNKLEVBR0Q7OztBQUNBLElBQUl5QixRQUFRLENBQUNnRSxhQUFULENBQXVCLFNBQXZCLEVBQWtDVixTQUFsQyxLQUFnRCxnQkFBcEQsRUFBcUU7QUFBQSxNQVd4RHlCLEdBWHdELEdBV2pFLFNBQVNBLEdBQVQsQ0FBYTVFLEdBQWIsRUFBa0I7QUFDZCxXQUFPLElBQUk2RSxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3BDLFVBQU05RyxHQUFHLEdBQUcsSUFBSTJDLGNBQUosRUFBWjtBQUNBM0MsTUFBQUEsR0FBRyxDQUFDaUQsSUFBSixDQUFTLEtBQVQsRUFBZ0JsQixHQUFoQjs7QUFDQS9CLE1BQUFBLEdBQUcsQ0FBQ3dFLE1BQUosR0FBYTtBQUFBLGVBQU14RSxHQUFHLENBQUNFLE1BQUosS0FBZSxHQUFmLEdBQXFCMkcsT0FBTyxDQUFDN0csR0FBRyxDQUFDK0csUUFBTCxDQUE1QixHQUE2Q0QsTUFBTSxDQUFDRSxLQUFLLENBQUNoSCxHQUFHLENBQUNpSCxVQUFMLENBQU4sQ0FBekQ7QUFBQSxPQUFiOztBQUNBakgsTUFBQUEsR0FBRyxDQUFDa0gsT0FBSixHQUFjLFVBQUNqQixDQUFEO0FBQUEsZUFBT2EsTUFBTSxDQUFDRSxLQUFLLDBCQUFtQmYsQ0FBbkIsRUFBTixDQUFiO0FBQUEsT0FBZDs7QUFDQWpHLE1BQUFBLEdBQUcsQ0FBQ2tELElBQUo7QUFDSCxLQU5NLENBQVA7QUFPSCxHQW5CZ0U7O0FBRWpFLE1BQU1pRSxVQUFVLEdBQUd2RixRQUFRLENBQUNrRSxjQUFULENBQXdCLGVBQXhCLENBQW5CO0FBQ0EsTUFBTXNCLElBQUksR0FBR3hGLFFBQVEsQ0FBQ2tFLGNBQVQsQ0FBd0IsTUFBeEIsQ0FBYjtBQUNBLE1BQUl1QixJQUFJLEdBQUcsQ0FBWDtBQUNBLE1BQUlDLGFBQWEsR0FBR0YsSUFBSSxDQUFDRyxPQUFMLENBQWFELGFBQWpDO0FBQ0EsTUFBSUUsS0FBSyxHQUFHSixJQUFJLENBQUNHLE9BQUwsQ0FBYUMsS0FBekI7QUFFQSxNQUFJQyxPQUFPLEdBQUdDLElBQUksQ0FBQ0MsSUFBTCxDQUFVTCxhQUFhLEdBQUdFLEtBQTFCLENBQWQ7QUFhQUwsRUFBQUEsVUFBVSxDQUFDaEQsZ0JBQVgsQ0FBNEIsT0FBNUIsRUFBcUMsVUFBQThCLENBQUMsRUFBSTtBQUV0Q29CLElBQUFBLElBQUk7QUFDSlYsSUFBQUEsR0FBRyxDQUFDLHlCQUF5QlUsSUFBMUIsQ0FBSCxDQUVDTyxJQUZELENBRU0sVUFBQ25GLElBQUQsRUFBVTtBQUVaQSxNQUFBQSxJQUFJLEdBQUdvRixJQUFJLENBQUNDLEtBQUwsQ0FBV3JGLElBQVgsQ0FBUDs7QUFFQSxXQUFJcEIsQ0FBQyxHQUFHLENBQVIsRUFBV0EsQ0FBQyxHQUFHb0IsSUFBSSxDQUFDM0IsTUFBcEIsRUFBNEJPLENBQUMsRUFBN0IsRUFBaUM7QUFFN0IsWUFBSTBHLE9BQU8sR0FBR3RGLElBQUksQ0FBQ3BCLENBQUQsQ0FBbEI7QUFFQStGLFFBQUFBLElBQUksQ0FBQ2pILFNBQUwsSUFBa0Isc0JBQ2hCLG9CQURnQixHQUNPNEgsT0FBTyxDQUFDLE1BQUQsQ0FEZCxHQUN5QixJQUR6QixHQUVoQixXQUZnQixHQUdoQix5Q0FIZ0IsR0FHMkJBLE9BQU8sQ0FBQyxXQUFELENBSGxDLEdBR2lELDJCQUhqRCxHQUloQix5Q0FKZ0IsR0FJMkJBLE9BQU8sQ0FBQyxXQUFELENBSmxDLEdBSWlELDBCQUpqRCxHQUtoQixtQ0FMZ0IsR0FLcUJBLE9BQU8sQ0FBQyxXQUFELENBTDVCLEdBSzJDLGFBTDNDLEdBSzBEQSxPQUFPLENBQUMsWUFBRCxDQUxqRSxHQUtpRixJQUxqRixHQU1oQixZQU5nQixHQU9oQixNQVBnQixHQU9SQSxPQUFPLENBQUMsT0FBRCxDQVBDLEdBT1UsT0FQVixHQVFoQixNQVJnQixHQVNoQixLQVRnQixHQVNUQSxPQUFPLENBQUMsTUFBRCxDQVRFLEdBVWhCLE9BVkY7QUFXUDtBQUVBLEtBdkJELFdBd0JPLFVBQUNDLEdBQUQsRUFBUztBQUNaNUUsTUFBQUEsS0FBSyxDQUFDLDJCQUFELENBQUw7QUFDSCxLQTFCRDs7QUE0QkEsUUFBSWlFLElBQUksS0FBS0ksT0FBYixFQUF1QjtBQUNuQk4sTUFBQUEsVUFBVSxDQUFDakIsU0FBWCxDQUFxQkUsTUFBckIsQ0FBNEIsUUFBNUI7QUFDSDtBQUVKLEdBbkNEO0FBcUNIOzs7Ozs7Ozs7Ozs7QUNuSEQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvYXBwLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9oaW5jbHVkZS0xLjIuMC9oaW5jbHVkZS5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvc2NyaXB0LmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9zdHlsZXMvYXBwLnNjc3MiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFdlbGNvbWUgdG8geW91ciBhcHAncyBtYWluIEphdmFTY3JpcHQgZmlsZSFcbiAqXG4gKiBXZSByZWNvbW1lbmQgaW5jbHVkaW5nIHRoZSBidWlsdCB2ZXJzaW9uIG9mIHRoaXMgSmF2YVNjcmlwdCBmaWxlXG4gKiAoYW5kIGl0cyBDU1MgZmlsZSkgaW4geW91ciBiYXNlIGxheW91dCAoYmFzZS5odG1sLnR3aWcpLlxuICovXG5cbi8vIGFueSBDU1MgeW91IGltcG9ydCB3aWxsIG91dHB1dCBpbnRvIGEgc2luZ2xlIGNzcyBmaWxlIChhcHAuY3NzIGluIHRoaXMgY2FzZSlcbmltcG9ydCAnLi9zdHlsZXMvYXBwLnNjc3MnO1xuXG4vLyBKUyBwZXJzb1xuaW1wb3J0ICcuL3NjcmlwdCc7XG5cbi8vIHN0YXJ0IHRoZSBTdGltdWx1cyBhcHBsaWNhdGlvblxuLy8gaW1wb3J0ICcuL2Jvb3RzdHJhcCc7XG5cbi8vIGltcG9ydCBoaW5jbHVkZVxuaW1wb3J0ICcuL2hpbmNsdWRlLTEuMi4wL2hpbmNsdWRlJzsiLCIvKlxuaGluY2x1ZGUuanMgLS0gSFRNTCBJbmNsdWRlcyAodmVyc2lvbiAxLjEuMClcblxuQ29weXJpZ2h0IChjKSAyMDA1LTIwMTIgTWFyayBOb3R0aW5naGFtIDxtbm90QG1ub3QubmV0PlxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuU09GVFdBUkUuXG5cbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5TZWUgaHR0cDovL21ub3QuZ2l0aHViLmNvbS9oaW5jbHVkZS8gZm9yIGRvY3VtZW50YXRpb24uXG4qL1xuXG4vKmpzbGludCBpbmRlbnQ6IDIsIGJyb3dzZXI6IHRydWUsIHZhcnM6IHRydWUsIG5vbWVuOiB0cnVlICovXG4vKmdsb2JhbCBhbGVydCwgQWN0aXZlWE9iamVjdCAqL1xuXG52YXIgaGluY2x1ZGU7XG5cbihmdW5jdGlvbiAoKSB7XG5cbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgaGluY2x1ZGUgPSB7XG4gICAgY2xhc3NwcmVmaXg6IFwiaW5jbHVkZV9cIixcblxuICAgIHNldF9jb250ZW50X2FzeW5jOiBmdW5jdGlvbiAoZWxlbWVudCwgcmVxKSB7XG4gICAgICBpZiAocmVxLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgaWYgKHJlcS5zdGF0dXMgPT09IDIwMCB8fCByZXEuc3RhdHVzID09PSAzMDQpIHtcbiAgICAgICAgICBlbGVtZW50LmlubmVySFRNTCA9IHJlcS5yZXNwb25zZVRleHQ7XG4gICAgICAgICAgaGluY2x1ZGUuZXZhbF9qcyhlbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGhpbmNsdWRlLnNldF9jbGFzcyhlbGVtZW50LCByZXEuc3RhdHVzKTtcblxuICAgICAgICBoaW5jbHVkZS50cmlnZ2VyX2V2ZW50KGVsZW1lbnQpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBidWZmZXI6IFtdLFxuICAgIHNldF9jb250ZW50X2J1ZmZlcmVkOiBmdW5jdGlvbiAoZWxlbWVudCwgcmVxKSB7XG4gICAgICBpZiAocmVxLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgaGluY2x1ZGUuYnVmZmVyLnB1c2goW2VsZW1lbnQsIHJlcV0pO1xuICAgICAgICBoaW5jbHVkZS5vdXRzdGFuZGluZyAtPSAxO1xuICAgICAgICBpZiAoaGluY2x1ZGUub3V0c3RhbmRpbmcgPT09IDApIHtcbiAgICAgICAgICBoaW5jbHVkZS5zaG93X2J1ZmZlcmVkX2NvbnRlbnQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBzaG93X2J1ZmZlcmVkX2NvbnRlbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBpbmNsdWRlO1xuICAgICAgd2hpbGUgKGhpbmNsdWRlLmJ1ZmZlci5sZW5ndGggPiAwKSB7XG4gICAgICAgIGluY2x1ZGUgPSBoaW5jbHVkZS5idWZmZXIucG9wKCk7XG4gICAgICAgIGlmIChpbmNsdWRlWzFdLnN0YXR1cyA9PT0gMjAwIHx8IGluY2x1ZGVbMV0uc3RhdHVzID09PSAzMDQpIHtcbiAgICAgICAgICBpbmNsdWRlWzBdLmlubmVySFRNTCA9IGluY2x1ZGVbMV0ucmVzcG9uc2VUZXh0O1xuICAgICAgICAgIGhpbmNsdWRlLmV2YWxfanMoaW5jbHVkZVswXSk7XG4gICAgICAgIH1cbiAgICAgICAgaGluY2x1ZGUuc2V0X2NsYXNzKGluY2x1ZGVbMF0sIGluY2x1ZGVbMV0uc3RhdHVzKTtcbiAgICAgICAgaGluY2x1ZGUudHJpZ2dlcl9ldmVudChpbmNsdWRlWzBdKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgZXZhbF9qczogZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgIHZhciBldmFsanMgPSBlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnZXZhbGpzJykgJiYgZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2V2YWxqcycpID09PSBcInRydWVcIjtcbiAgICAgIGlmIChldmFsanMpIHtcbiAgICAgICAgdmFyIHNjcmlwdHMgPSBlbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKTtcbiAgICAgICAgdmFyIGk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBzY3JpcHRzLmxlbmd0aDsgaSA9IGkgKyAxKSB7XG4gICAgICAgICAgLypqc2xpbnQgZXZpbDogdHJ1ZSAqL1xuICAgICAgICAgIGV2YWwoc2NyaXB0c1tpXS5pbm5lckhUTUwpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIG91dHN0YW5kaW5nOiAwLFxuICAgIGluY2x1ZGVzOiBbXSxcbiAgICBydW46IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBpID0gMDtcbiAgICAgIHZhciBtb2RlID0gdGhpcy5nZXRfbWV0YShcImluY2x1ZGVfbW9kZVwiLCBcImJ1ZmZlcmVkXCIpO1xuICAgICAgdmFyIGNhbGxiYWNrO1xuICAgICAgdGhpcy5pbmNsdWRlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaHg6aW5jbHVkZVwiKTtcbiAgICAgIGlmICh0aGlzLmluY2x1ZGVzLmxlbmd0aCA9PT0gMCkgeyAvLyByZW1vdmUgbnMgZm9yIElFXG4gICAgICAgIHRoaXMuaW5jbHVkZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImluY2x1ZGVcIik7XG4gICAgICB9XG4gICAgICBpZiAobW9kZSA9PT0gXCJhc3luY1wiKSB7XG4gICAgICAgIGNhbGxiYWNrID0gdGhpcy5zZXRfY29udGVudF9hc3luYztcbiAgICAgIH0gZWxzZSBpZiAobW9kZSA9PT0gXCJidWZmZXJlZFwiKSB7XG4gICAgICAgIGNhbGxiYWNrID0gdGhpcy5zZXRfY29udGVudF9idWZmZXJlZDtcbiAgICAgICAgdmFyIHRpbWVvdXQgPSB0aGlzLmdldF9tZXRhKFwiaW5jbHVkZV90aW1lb3V0XCIsIDIuNSkgKiAxMDAwO1xuICAgICAgICBzZXRUaW1lb3V0KGhpbmNsdWRlLnNob3dfYnVmZmVyZWRfY29udGVudCwgdGltZW91dCk7XG4gICAgICB9XG5cbiAgICAgIGZvciAoaTsgaSA8IHRoaXMuaW5jbHVkZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgdGhpcy5pbmNsdWRlKHRoaXMuaW5jbHVkZXNbaV0sIHRoaXMuaW5jbHVkZXNbaV0uZ2V0QXR0cmlidXRlKFwic3JjXCIpLCB0aGlzLmluY2x1ZGVzW2ldLmdldEF0dHJpYnV0ZShcIm1lZGlhXCIpLCBjYWxsYmFjayk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGluY2x1ZGU6IGZ1bmN0aW9uIChlbGVtZW50LCB1cmwsIG1lZGlhLCBpbmNsX2NiKSB7XG4gICAgICBpZiAobWVkaWEgJiYgd2luZG93Lm1hdGNoTWVkaWEgJiYgIXdpbmRvdy5tYXRjaE1lZGlhKG1lZGlhKS5tYXRjaGVzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHZhciBzY2hlbWUgPSB1cmwuc3Vic3RyaW5nKDAsIHVybC5pbmRleE9mKFwiOlwiKSk7XG4gICAgICBpZiAoc2NoZW1lLnRvTG93ZXJDYXNlKCkgPT09IFwiZGF0YVwiKSB7IC8vIGp1c3QgdGV4dC9wbGFpbiBmb3Igbm93XG4gICAgICAgIHZhciBkYXRhID0gZGVjb2RlVVJJQ29tcG9uZW50KHVybC5zdWJzdHJpbmcodXJsLmluZGV4T2YoXCIsXCIpICsgMSwgdXJsLmxlbmd0aCkpO1xuICAgICAgICBlbGVtZW50LmlubmVySFRNTCA9IGRhdGE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcmVxID0gZmFsc2U7XG4gICAgICAgIGlmICh3aW5kb3cuWE1MSHR0cFJlcXVlc3QpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgICAgICBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2RhdGEtd2l0aC1jcmVkZW50aWFscycpKSB7XG4gICAgICAgICAgICAgIHJlcS53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gY2F0Y2ggKGUxKSB7XG4gICAgICAgICAgICByZXEgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAod2luZG93LkFjdGl2ZVhPYmplY3QpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVxID0gbmV3IEFjdGl2ZVhPYmplY3QoXCJNaWNyb3NvZnQuWE1MSFRUUFwiKTtcbiAgICAgICAgICB9IGNhdGNoIChlMikge1xuICAgICAgICAgICAgcmVxID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChyZXEpIHtcbiAgICAgICAgICB0aGlzLm91dHN0YW5kaW5nICs9IDE7XG4gICAgICAgICAgcmVxLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGluY2xfY2IoZWxlbWVudCwgcmVxKTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXEub3BlbihcIkdFVFwiLCB1cmwsIHRydWUpO1xuICAgICAgICAgICAgcmVxLnNlbmQoXCJcIik7XG4gICAgICAgICAgfSBjYXRjaCAoZTMpIHtcbiAgICAgICAgICAgIHRoaXMub3V0c3RhbmRpbmcgLT0gMTtcbiAgICAgICAgICAgIGFsZXJ0KFwiSW5jbHVkZSBlcnJvcjogXCIgKyB1cmwgKyBcIiAoXCIgKyBlMyArIFwiKVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgcmVmcmVzaDogZnVuY3Rpb24gKGVsZW1lbnRfaWQpIHtcbiAgICAgIHZhciBpID0gMDtcbiAgICAgIHZhciBjYWxsYmFjaztcbiAgICAgIGNhbGxiYWNrID0gdGhpcy5zZXRfY29udGVudF9idWZmZXJlZDtcbiAgICAgIGZvciAoaTsgaSA8IHRoaXMuaW5jbHVkZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgaWYgKHRoaXMuaW5jbHVkZXNbaV0uZ2V0QXR0cmlidXRlKFwiaWRcIikgPT09IGVsZW1lbnRfaWQpIHtcbiAgICAgICAgICB0aGlzLmluY2x1ZGUodGhpcy5pbmNsdWRlc1tpXSwgdGhpcy5pbmNsdWRlc1tpXS5nZXRBdHRyaWJ1dGUoXCJzcmNcIiksIHRoaXMuaW5jbHVkZXNbaV0uZ2V0QXR0cmlidXRlKFwibWVkaWFcIiksIGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBnZXRfbWV0YTogZnVuY3Rpb24gKG5hbWUsIHZhbHVlX2RlZmF1bHQpIHtcbiAgICAgIHZhciBtID0gMDtcbiAgICAgIHZhciBtZXRhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwibWV0YVwiKTtcbiAgICAgIHZhciBtZXRhX25hbWU7XG4gICAgICBmb3IgKG07IG0gPCBtZXRhcy5sZW5ndGg7IG0gKz0gMSkge1xuICAgICAgICBtZXRhX25hbWUgPSBtZXRhc1ttXS5nZXRBdHRyaWJ1dGUoXCJuYW1lXCIpO1xuICAgICAgICBpZiAobWV0YV9uYW1lID09PSBuYW1lKSB7XG4gICAgICAgICAgcmV0dXJuIG1ldGFzW21dLmdldEF0dHJpYnV0ZShcImNvbnRlbnRcIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWx1ZV9kZWZhdWx0O1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAqIChjKTIwMDYgRGVhbiBFZHdhcmRzL01hdHRoaWFzIE1pbGxlci9Kb2huIFJlc2lnXG4gICAgICogU3BlY2lhbCB0aGFua3MgdG8gRGFuIFdlYmIncyBkb21yZWFkeS5qcyBQcm90b3R5cGUgZXh0ZW5zaW9uXG4gICAgICogYW5kIFNpbW9uIFdpbGxpc29uJ3MgYWRkTG9hZEV2ZW50XG4gICAgICpcbiAgICAgKiBGb3IgbW9yZSBpbmZvLCBzZWU6XG4gICAgICogaHR0cDovL2RlYW4uZWR3YXJkcy5uYW1lL3dlYmxvZy8yMDA2LzA2L2FnYWluL1xuICAgICAqXG4gICAgICogVGhyb3duIHRvZ2V0aGVyIGJ5IEplc3NlIFNraW5uZXIgKGh0dHA6Ly93d3cudGhlZnV0dXJlb2Z0aGV3ZWIuY29tLylcbiAgICAgKi9cbiAgICBhZGRET01Mb2FkRXZlbnQ6IGZ1bmN0aW9uIChmdW5jKSB7XG4gICAgICBpZiAoIXdpbmRvdy5fX2xvYWRfZXZlbnRzKSB7XG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgICAvLyBxdWl0IGlmIHRoaXMgZnVuY3Rpb24gaGFzIGFscmVhZHkgYmVlbiBjYWxsZWRcbiAgICAgICAgICBpZiAoaGluY2x1ZGUuYWRkRE9NTG9hZEV2ZW50LmRvbmUpIHtyZXR1cm47IH1cbiAgICAgICAgICBoaW5jbHVkZS5hZGRET01Mb2FkRXZlbnQuZG9uZSA9IHRydWU7XG4gICAgICAgICAgaWYgKHdpbmRvdy5fX2xvYWRfdGltZXIpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwod2luZG93Ll9fbG9hZF90aW1lcik7XG4gICAgICAgICAgICB3aW5kb3cuX19sb2FkX3RpbWVyID0gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgICAgZm9yIChpOyBpIDwgd2luZG93Ll9fbG9hZF9ldmVudHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIHdpbmRvdy5fX2xvYWRfZXZlbnRzW2ldKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHdpbmRvdy5fX2xvYWRfZXZlbnRzID0gbnVsbDtcbiAgICAgICAgICAvLyBjbGVhbiB1cCB0aGUgX19pZV9vbmxvYWQgZXZlbnRcbiAgICAgICAgICAvKkBjY19vblxuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiX19pZV9vbmxvYWRcIikub25yZWFkeXN0YXRlY2hhbmdlID0gXCJcIjtcbiAgICAgICAgICBAKi9cbiAgICAgICAgfTtcbiAgICAgICAgLy8gZm9yIE1vemlsbGEvT3BlcmE5XG4gICAgICAgIGlmIChkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgaW5pdCwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGZvciBJbnRlcm5ldCBFeHBsb3JlclxuICAgICAgICAvKkBjY19vblxuICAgICAgICB2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICAgIHNjcmlwdC5pZCA9ICdfX2llX29ubG9hZCc7XG4gICAgICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJkZWZlclwiLCBcImRlZmVyXCIpO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgICAgIHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gXCJjb21wbGV0ZVwiKSB7XG4gICAgICAgICAgICBpbml0KCk7IC8vIGNhbGwgdGhlIG9ubG9hZCBoYW5kbGVyXG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBAKi9cbiAgICAgICAgLy8gZm9yIFNhZmFyaVxuICAgICAgICBpZiAoL1dlYktpdC9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpIHsgLy8gc25pZmZcbiAgICAgICAgICB3aW5kb3cuX19sb2FkX3RpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKC9sb2FkZWR8Y29tcGxldGUvLnRlc3QoZG9jdW1lbnQucmVhZHlTdGF0ZSkpIHtcbiAgICAgICAgICAgICAgaW5pdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIDEwKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBmb3Igb3RoZXIgYnJvd3NlcnNcbiAgICAgICAgd2luZG93Lm9ubG9hZCA9IGluaXQ7XG4gICAgICAgIHdpbmRvdy5fX2xvYWRfZXZlbnRzID0gW107XG4gICAgICB9XG4gICAgICB3aW5kb3cuX19sb2FkX2V2ZW50cy5wdXNoKGZ1bmMpO1xuICAgIH0sXG5cbiAgICB0cmlnZ2VyX2V2ZW50OiBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgdmFyIGV2ZW50O1xuXG4gICAgICBpZiAoZG9jdW1lbnQuY3JlYXRlRXZlbnQpIHtcbiAgICAgICAgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudChcIkhUTUxFdmVudHNcIik7XG4gICAgICAgIGV2ZW50LmluaXRFdmVudChcImhpbmNsdWRlXCIsIHRydWUsIHRydWUpO1xuICAgICAgICBldmVudC5ldmVudE5hbWUgPSBcImhpbmNsdWRlXCI7XG4gICAgICAgIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG5cbiAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuY3JlYXRlRXZlbnRPYmplY3QpIHsgLy8gSUVcbiAgICAgICAgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudE9iamVjdCgpO1xuICAgICAgICBldmVudC5ldmVudFR5cGUgPSBcImhpbmNsdWRlXCI7XG4gICAgICAgIGV2ZW50LmV2ZW50TmFtZSA9IFwiaGluY2x1ZGVcIjtcbiAgICAgICAgZWxlbWVudC5maXJlRXZlbnQoXCJvblwiICsgZXZlbnQuZXZlbnRUeXBlLCBldmVudCk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHNldF9jbGFzczogZnVuY3Rpb24gKGVsZW1lbnQsIHN0YXR1cykge1xuICAgICAgdmFyIHRva2VucyA9IGVsZW1lbnQuY2xhc3NOYW1lLnNwbGl0KC9cXHMrLyk7XG4gICAgICB2YXIgb3RoZXJDbGFzc2VzID0gdG9rZW5zLmZpbHRlcihmdW5jdGlvbiAodG9rZW4pIHtcbiAgICAgICAgcmV0dXJuICF0b2tlbi5tYXRjaCgvXmluY2x1ZGVfXFxkKyQvaSkgJiYgIXRva2VuLm1hdGNoKC9eaW5jbHVkZWQvaSk7XG4gICAgICB9KS5qb2luKCcgJyk7XG5cbiAgICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gb3RoZXJDbGFzc2VzICsgKG90aGVyQ2xhc3NlcyA/ICcgJyA6ICcnKSArXG4gICAgICAgICdpbmNsdWRlZCAnICsgaGluY2x1ZGUuY2xhc3NwcmVmaXggKyBzdGF0dXM7XG4gICAgfVxuICB9O1xuXG4gIGhpbmNsdWRlLmFkZERPTUxvYWRFdmVudChmdW5jdGlvbiAoKSB7IGhpbmNsdWRlLnJ1bigpOyB9KTtcbn0oKSk7XG5cbiIsIi8qIFNjcmlwdCBKUyBkdSBwcm9qZXQgRFdXTSAtIEJlcnRyYW5kIERlbGFubHNzYXlzIDIwMjEgIC0gKi8gXG5cbmNvbnN0IGJ0TWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5idC1tZW51Jyk7XG5jb25zdCBidENsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0LWNsb3NlJyk7XG5jb25zdCBtZW51ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZW51XCIpO1xuXG5idE1lbnUuZm9yRWFjaChlbGVtID0+IHtcblxuICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgICAgaWYgKG1lbnUuY2xhc3NOYW1lID09PSBcIlwiKSB7XG4gICAgICAgICAgICBtZW51LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgICAgICAgICBidENsb3NlLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtZW51LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICAgICAgICBidENsb3NlLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICAgIH1cbiAgICB9KVxuICAgIFxufSk7XG5cbi8vIGNsb3NlIHdpbmRvdyB3aGVuIHdpZHRoIHRoYW4gODAwcHhcblxud2luZG93Lm9ucmVzaXplID0gKCkgPT57XG4gICAgaWYod2luZG93LmlubmVyV2lkdGggPj0gODAwICYmIG1lbnUuY2xhc3NOYW1lICE9PSBcIlwiKXtcbiAgICAgICAgICAgIG1lbnUuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgICAgICAgIGJ0Q2xvc2UuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICB9ZWxzZSBpZiAod2luZG93LmlubmVyV2lkdGggPCA4MDApe1xuICAgIH1cblxufTtcblxuLy8gY2xvc2UgbWVzc2FnZVxudmFyIGJ0TXNnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0LW1lc3NhZ2UnKTtcblxuaWYgKGJ0TXNnKXtcbiAgICBidE1zZy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICBidE1zZy5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoJ2Nsb3NlJylcbiAgICB9KVxufVxuXG5cblxuLy8gYXJ0aWNsZXNcbmlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzZWN0aW9uJykuY2xhc3NOYW1lID09PSAnYXJ0aWNsZScpe1xuICAgIGNvbnN0IGJ0UHJldmlvdXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJldmlvdXMgYScpO1xuICAgIGNvbnN0IGJ0TmV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXh0IGEnKTtcblxuICAgIGlmIChidFByZXZpb3VzKSB7XG4gICAgICAgIGJ0UHJldmlvdXMuaW5uZXJIVE1MID0gJzxzdmc+PHRpdGxlPkFydGljbGUgcHLDqWPDqWRlbnQ8L3RpdGxlPjx1c2UgeGxpbms6aHJlZj1cIi9pbWcvaWNvbnMuc3ZnI2FuZ2xlLWxlZnRcIj48L3VzZT48L3N2Zz4nO1xuICAgIH1cbiAgICBpZiAoYnROZXh0KSB7XG4gICAgICAgIGJ0TmV4dC5pbm5lckhUTUwgPSAnPHN2Zz48dGl0bGU+QXJ0aWNsZSBzdWl2YW50PC90aXRsZT48dXNlIHhsaW5rOmhyZWY9XCIvaW1nL2ljb25zLnN2ZyNhbmdsZS1yaWdodFwiPjwvdXNlPjwvc3ZnPic7XG4gICAgfVxufVxuXG5cbi8vIHBsdXMgZCdhcnRpY2xlc1xuaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3NlY3Rpb24nKS5jbGFzc05hbWUgPT09ICdsaXN0ZS1hcnRpY2xlcycpe1xuICAgIFxuICAgIGNvbnN0IGJ0QXJ0aWNsZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvYWQtYXJ0aWNsZXNcIik7XG4gICAgY29uc3QgbGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGlzdFwiKTtcbiAgICB2YXIgcGFnZSA9IDE7XG4gICAgdmFyIHRvdGFsQXJ0aWNsZXMgPSBsaXN0LmRhdGFzZXQudG90YWxBcnRpY2xlcyA7XG4gICAgdmFyIGxpbWl0ID0gbGlzdC5kYXRhc2V0LmxpbWl0IDtcblxuICAgIHZhciBuYlBhZ2VzID0gTWF0aC5jZWlsKHRvdGFsQXJ0aWNsZXMgLyBsaW1pdCkgO1xuXG5cbiAgICBmdW5jdGlvbiBnZXQodXJsKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCByZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgICAgIHJlcS5vcGVuKCdHRVQnLCB1cmwpO1xuICAgICAgICAgICAgcmVxLm9ubG9hZCA9ICgpID0+IHJlcS5zdGF0dXMgPT09IDIwMCA/IHJlc29sdmUocmVxLnJlc3BvbnNlKSA6IHJlamVjdChFcnJvcihyZXEuc3RhdHVzVGV4dCkpO1xuICAgICAgICAgICAgcmVxLm9uZXJyb3IgPSAoZSkgPT4gcmVqZWN0KEVycm9yKGBOZXR3b3JrIEVycm9yOiAke2V9YCkpO1xuICAgICAgICAgICAgcmVxLnNlbmQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYnRBcnRpY2xlcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuXG4gICAgICAgIHBhZ2UrKyA7XG4gICAgICAgIGdldChcIi9hcnRpY2xlcy9hamF4P3BhZ2U9XCIgKyBwYWdlKVxuXG4gICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG5cbiAgICAgICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuXG4gICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7IFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGxldCBhcnRpY2xlID0gZGF0YVtpXTtcblxuICAgICAgICAgICAgICAgIGxpc3QuaW5uZXJIVE1MICs9ICc8bGkgY2xhc3M9XCJpdGVtXCI+J1xuICAgICAgICAgICAgICAgICsgJzxhIGhyZWY9XCIvYXJ0aWNsZS8nICsgYXJ0aWNsZVsnc2x1ZyddICsgJ1wiPidcbiAgICAgICAgICAgICAgICArICc8cGljdHVyZT4nXG4gICAgICAgICAgICAgICAgKyAnPHNvdXJjZSBzcmNzZXQ9XCIvaW1nL2FydGljbGUvdGh1bWJuYWlsLycrIGFydGljbGVbJ3Bob3RvUGF0aCddICsnLndlYnBcIiB0eXBlPVwiaW1hZ2Uvd2VicFwiPidcbiAgICAgICAgICAgICAgICArICc8c291cmNlIHNyY3NldD1cIi9pbWcvYXJ0aWNsZS90aHVtYm5haWwvJysgYXJ0aWNsZVsncGhvdG9QYXRoJ10gKycuanBnXCIgdHlwZT1cImltYWdlL2pwZWdcIj4nXG4gICAgICAgICAgICAgICAgKyAnPGltZyBzcmM9XCIvaW1nL2FydGljbGUvdGh1bWJuYWlsLycrIGFydGljbGVbJ3Bob3RvUGF0aCddICsnLmpwZ1wiIGFsdD1cIicrIGFydGljbGVbJ3Bob3RvVGl0bGUnXSArJ1wiPidcbiAgICAgICAgICAgICAgICArICc8L3BpY3R1cmU+J1xuICAgICAgICAgICAgICAgICsgJzxoMz4nKyBhcnRpY2xlWyd0aXRsZSddICsnPC9oMz4nXG4gICAgICAgICAgICAgICAgKyAnPC9hPidcbiAgICAgICAgICAgICAgICArICc8cD4nKyBhcnRpY2xlWydib2R5J11cbiAgICAgICAgICAgICAgICArICc8L2xpPic7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICBhbGVydCgnVW5lIGVycmV1ciBlc3Qgc3VydmVudWUgIScpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAocGFnZSA9PT0gbmJQYWdlcyApIHtcbiAgICAgICAgICAgIGJ0QXJ0aWNsZXMuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbn1cblxuXG5cblxuXG5cbiAgIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307Il0sIm5hbWVzIjpbImhpbmNsdWRlIiwiY2xhc3NwcmVmaXgiLCJzZXRfY29udGVudF9hc3luYyIsImVsZW1lbnQiLCJyZXEiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwiaW5uZXJIVE1MIiwicmVzcG9uc2VUZXh0IiwiZXZhbF9qcyIsInNldF9jbGFzcyIsInRyaWdnZXJfZXZlbnQiLCJidWZmZXIiLCJzZXRfY29udGVudF9idWZmZXJlZCIsInB1c2giLCJvdXRzdGFuZGluZyIsInNob3dfYnVmZmVyZWRfY29udGVudCIsImluY2x1ZGUiLCJsZW5ndGgiLCJwb3AiLCJldmFsanMiLCJoYXNBdHRyaWJ1dGUiLCJnZXRBdHRyaWJ1dGUiLCJzY3JpcHRzIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJpIiwiZXZhbCIsImluY2x1ZGVzIiwicnVuIiwibW9kZSIsImdldF9tZXRhIiwiY2FsbGJhY2siLCJkb2N1bWVudCIsInRpbWVvdXQiLCJzZXRUaW1lb3V0IiwidXJsIiwibWVkaWEiLCJpbmNsX2NiIiwid2luZG93IiwibWF0Y2hNZWRpYSIsIm1hdGNoZXMiLCJzY2hlbWUiLCJzdWJzdHJpbmciLCJpbmRleE9mIiwidG9Mb3dlckNhc2UiLCJkYXRhIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwiWE1MSHR0cFJlcXVlc3QiLCJ3aXRoQ3JlZGVudGlhbHMiLCJlMSIsIkFjdGl2ZVhPYmplY3QiLCJlMiIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsIm9wZW4iLCJzZW5kIiwiZTMiLCJhbGVydCIsInJlZnJlc2giLCJlbGVtZW50X2lkIiwibmFtZSIsInZhbHVlX2RlZmF1bHQiLCJtIiwibWV0YXMiLCJtZXRhX25hbWUiLCJhZGRET01Mb2FkRXZlbnQiLCJmdW5jIiwiX19sb2FkX2V2ZW50cyIsImluaXQiLCJkb25lIiwiX19sb2FkX3RpbWVyIiwiY2xlYXJJbnRlcnZhbCIsImFkZEV2ZW50TGlzdGVuZXIiLCJ0ZXN0IiwibmF2aWdhdG9yIiwidXNlckFnZW50Iiwic2V0SW50ZXJ2YWwiLCJvbmxvYWQiLCJldmVudCIsImNyZWF0ZUV2ZW50IiwiaW5pdEV2ZW50IiwiZXZlbnROYW1lIiwiZGlzcGF0Y2hFdmVudCIsImNyZWF0ZUV2ZW50T2JqZWN0IiwiZXZlbnRUeXBlIiwiZmlyZUV2ZW50IiwidG9rZW5zIiwiY2xhc3NOYW1lIiwic3BsaXQiLCJvdGhlckNsYXNzZXMiLCJmaWx0ZXIiLCJ0b2tlbiIsIm1hdGNoIiwiam9pbiIsImJ0TWVudSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJidENsb3NlIiwicXVlcnlTZWxlY3RvciIsIm1lbnUiLCJnZXRFbGVtZW50QnlJZCIsImZvckVhY2giLCJlbGVtIiwiZSIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsIm9ucmVzaXplIiwiaW5uZXJXaWR0aCIsImJ0TXNnIiwicGFyZW50Tm9kZSIsImJ0UHJldmlvdXMiLCJidE5leHQiLCJnZXQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInJlc3BvbnNlIiwiRXJyb3IiLCJzdGF0dXNUZXh0Iiwib25lcnJvciIsImJ0QXJ0aWNsZXMiLCJsaXN0IiwicGFnZSIsInRvdGFsQXJ0aWNsZXMiLCJkYXRhc2V0IiwibGltaXQiLCJuYlBhZ2VzIiwiTWF0aCIsImNlaWwiLCJ0aGVuIiwiSlNPTiIsInBhcnNlIiwiYXJ0aWNsZSIsImVyciJdLCJzb3VyY2VSb290IjoiIn0=
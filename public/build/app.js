(self["webpackChunk"] = self["webpackChunk"] || []).push([["app"],{

/***/ "./assets/app.js":
/*!***********************!*\
  !*** ./assets/app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _fortawesome_fontawesome_free_css_all_min_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @fortawesome/fontawesome-free/css/all.min.css */ "./node_modules/@fortawesome/fontawesome-free/css/all.min.css");
/* harmony import */ var _fortawesome_fontawesome_free_js_all_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fortawesome/fontawesome-free/js/all.js */ "./node_modules/@fortawesome/fontawesome-free/js/all.js");
/* harmony import */ var _fortawesome_fontawesome_free_js_all_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_fontawesome_free_js_all_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _scripts_header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scripts/header */ "./assets/scripts/header.js");
/* harmony import */ var _scripts_header__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_scripts_header__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _scripts_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scripts/form */ "./assets/scripts/form.js");
/* harmony import */ var _scripts_form__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_scripts_form__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _scripts_reset_btn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./scripts/reset-btn */ "./assets/scripts/reset-btn.js");
/* harmony import */ var _scripts_reset_btn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_scripts_reset_btn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _scripts_battle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./scripts/battle */ "./assets/scripts/battle.js");
/* harmony import */ var _scripts_battle__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_scripts_battle__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _styles_app_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./styles/app.scss */ "./assets/styles/app.scss");
/* harmony import */ var htmx_org__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! htmx.org */ "./node_modules/htmx.org/dist/htmx.esm.js");
/*
 * Welcome to your app's main JavaScript file!
 *
 * This file will be included onto the page via the importmap() Twig function,
 * which should already be in your base.html.twig.
 */








window.htmx = __webpack_require__(/*! htmx.org */ "./node_modules/htmx.org/dist/htmx.esm.js");
console.log('This log comes from assets/app.js - welcome to AssetMapper! 🎉');

/***/ }),

/***/ "./assets/scripts/battle.js":
/*!**********************************!*\
  !*** ./assets/scripts/battle.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");
__webpack_require__(/*! core-js/modules/es.array.is-array.js */ "./node_modules/core-js/modules/es.array.is-array.js");
__webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
__webpack_require__(/*! core-js/modules/es.parse-float.js */ "./node_modules/core-js/modules/es.parse-float.js");
__webpack_require__(/*! core-js/modules/es.string.ends-with.js */ "./node_modules/core-js/modules/es.string.ends-with.js");
__webpack_require__(/*! core-js/modules/es.string.trim.js */ "./node_modules/core-js/modules/es.string.trim.js");
__webpack_require__(/*! core-js/modules/web.timers.js */ "./node_modules/core-js/modules/web.timers.js");
// ... existing code ...
function parseTimeToMs(val) {
  if (!val) return 0;
  var s = String(val).trim();
  if (s.endsWith('ms')) return parseFloat(s);
  if (s.endsWith('s')) return parseFloat(s) * 1000;
  var num = parseFloat(s);
  return isNaN(num) ? 0 : num;
}
function getCurrentAnimationMs(el) {
  if (!el) return 0;
  var cs = getComputedStyle(el);
  // 1) variable CSS --dure si définie (ex: "1000ms")
  var dure = cs.getPropertyValue('--dure');
  var msFromVar = parseTimeToMs(dure);
  if (msFromVar > 0) return msFromVar;
  var animDur = cs.animationDuration || cs.getPropertyValue('animation-duration');
  var first = String(animDur || '').split(',')[0];
  var msFromAnim = parseTimeToMs(first);
  return msFromAnim > 0 ? msFromAnim : 800;
}
function playTurns(turns) {
  if (!Array.isArray(turns) || turns.length === 0) return;
  var bufferMs = 150; // pause entre deux actions

  var _runTurn = function runTurn(idx) {
    if (idx >= turns.length) return;
    var t = turns[idx];
    var actorId = "sprite-".concat(t.actor.team, "-").concat(t.actor.slot);
    var actorEl = document.getElementById(actorId);
    if (actorEl && (actorEl.classList.contains('dead') || actorEl.classList.contains('dead-row1') || actorEl.classList.contains('dead-row2'))) {
      setTimeout(function () {
        return _runTurn(idx + 1);
      }, bufferMs);
      return;
    }
    var isHeal = t.action === 'heal';
    if (actorEl) {
      actorEl.classList.remove('attack', 'heal', 'idle');
      actorEl.classList.add(isHeal ? 'heal' : 'attack');
      // reflow
      // eslint-disable-next-line no-unused-expressions
      actorEl.offsetWidth;
    }
    var actionMs = getCurrentAnimationMs(actorEl) || 800;
    setTimeout(function () {
      if (actorEl && !actorEl.classList.contains('dead') && !actorEl.classList.contains('dead-row1') && !actorEl.classList.contains('dead-row2')) {
        actorEl.classList.remove('attack', 'heal');
        actorEl.classList.add('idle');
      }
      if (isHeal && t.healTarget && typeof t.healVitaAfter !== 'undefined') {
        var vitaId = "vita-".concat(t.healTarget.team, "-").concat(t.healTarget.slot);
        var el = document.getElementById(vitaId);
        if (el) el.textContent = t.healVitaAfter;
      } else if (!isHeal && t.target) {
        if (typeof t.targetVitaAfter !== 'undefined') {
          var _vitaId = "vita-".concat(t.target.team, "-").concat(t.target.slot);
          var _el = document.getElementById(_vitaId);
          if (_el) _el.textContent = t.targetVitaAfter;
        }
        // Mort: jouer anim de death puis faire sortir le conteneur
        if (typeof t.targetVitaAfter !== 'undefined' && Number(t.targetVitaAfter) <= 0 || t.target.alive === false) {
          var targetSpriteId = "sprite-".concat(t.target.team, "-").concat(t.target.slot);
          var targetEl = document.getElementById(targetSpriteId);
          if (targetEl) {
            // Passe en "dead" (ou 2 rangées si tu utilises dead-row1/dead-row2)
            targetEl.classList.remove('idle', 'attack', 'heal', 'dead-row1', 'dead-row2');
            targetEl.classList.add('dead');
            // reflow pour relancer l'animation de mort
            // eslint-disable-next-line no-unused-expressions
            targetEl.offsetWidth;

            // Durée de l'anim de mort pour chronométrer la sortie
            var deathMs = getCurrentAnimationMs(targetEl) || 1400;

            // Après la mort -> sortie écran du conteneur
            setTimeout(function () {
              var containerId = "unit-".concat(t.target.team, "-").concat(t.target.slot);
              var containerEl = document.getElementById(containerId);
              if (containerEl) {
                if (t.target.team === 'A') {
                  containerEl.classList.add('exit-left');
                } else {
                  containerEl.classList.add('exit-right');
                }
              }
            }, deathMs);
          }
        }
      }
      setTimeout(function () {
        return _runTurn(idx + 1);
      }, bufferMs);
    }, actionMs);
  };
  _runTurn(0);
}

// Exposer global pour htmx
window.playTurns = playTurns;
// ... existing code ...

/***/ }),

/***/ "./assets/scripts/form.js":
/*!********************************!*\
  !*** ./assets/scripts/form.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! core-js/modules/es.array.for-each.js */ "./node_modules/core-js/modules/es.array.for-each.js");
__webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
__webpack_require__(/*! core-js/modules/es.string.trim.js */ "./node_modules/core-js/modules/es.string.trim.js");
__webpack_require__(/*! core-js/modules/esnext.iterator.constructor.js */ "./node_modules/core-js/modules/esnext.iterator.constructor.js");
__webpack_require__(/*! core-js/modules/esnext.iterator.for-each.js */ "./node_modules/core-js/modules/esnext.iterator.for-each.js");
__webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
var selector = 'input[type="text"], input[type="number"], input[type=email], input[type=password], select, textarea';
var inputs = document.querySelectorAll(selector);
var form = document.querySelector('.all-form');
function initInput(inputEl) {
  var wrapper = inputEl.closest('span');
  if (inputEl.value.trim() !== '') {
    wrapper === null || wrapper === void 0 || wrapper.classList.add('inputs--filled');
  }
  inputEl.addEventListener('focus', onFocus);
  inputEl.addEventListener('blur', onBlur);
}
function onFocus(ev) {
  var parent = ev.target.parentNode;
  if (parent && parent.classList) {
    parent.classList.add('inputs--filled');
  }
}
function onBlur(ev) {
  var input = ev.target;
  var wrapper = input.parentNode;
  if (input.value.trim() === '') {
    wrapper.classList.remove('inputs--filled');
    wrapper.classList.remove('inputs--invalid');
  } else {
    wrapper.classList.add('inputs--filled');
    if (!input.checkValidity()) {
      wrapper.classList.add('inputs--invalid');
    } else {
      wrapper.classList.remove('inputs--invalid');
    }
  }
  input.removeEventListener('input', liveValidation);
  input.addEventListener('input', liveValidation);
}
function liveValidation(ev) {
  var input = ev.target;
  var wrapper = input.parentNode;
  if (!input.checkValidity()) {
    wrapper.classList.add('inputs--invalid');
  } else {
    wrapper.classList.remove('inputs--invalid');
  }
}
if (form) {
  form.addEventListener('submit', onSubmit);
}
function onSubmit(ev) {
  var inputsWrappers = ev.target.querySelectorAll('span');
  var hasError = false;
  inputsWrappers.forEach(function (wrapper) {
    var input = wrapper.querySelector(selector);
    if (input) {
      if (!input.checkValidity()) {
        wrapper.classList.add('inputs--invalid');
        hasError = true;
      } else {
        wrapper.classList.remove('inputs--invalid');
      }
    }
  });
  if (hasError) {
    ev.preventDefault();
  }
}
window.addEventListener('load', function () {
  inputs.forEach(function (input) {
    initInput(input);
    if (input.tagName === 'SELECT' && input.value) {
      var wrapper = input.parentNode;
      wrapper.classList.add('inputs--filled');
    }
  });
});

/***/ }),

/***/ "./assets/scripts/header.js":
/*!**********************************!*\
  !*** ./assets/scripts/header.js ***!
  \**********************************/
/***/ (() => {

var dropdown = document.querySelector(".dropdown");
var dropdownContent = document.querySelector(".dropdown-content");
dropdown.addEventListener("mouseover", function () {
  dropdownContent.style.display = "flex";
  dropdownContent.style.animation = "show-content 0.5s ease forwards";
});
dropdown.addEventListener("mouseout", function () {
  dropdownContent.style.animation = "dont-show-content 0.5s ease forwards";
  dropdownContent.addEventListener("animationend", function handler(element) {
    if (element.animationName === "dont-show-content") {
      dropdownContent.style.display = "none";
    }
    dropdownContent.removeEventListener("animationend", handler);
  });
});

/***/ }),

/***/ "./assets/scripts/reset-btn.js":
/*!*************************************!*\
  !*** ./assets/scripts/reset-btn.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! core-js/modules/es.array.for-each.js */ "./node_modules/core-js/modules/es.array.for-each.js");
__webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
__webpack_require__(/*! core-js/modules/esnext.iterator.constructor.js */ "./node_modules/core-js/modules/esnext.iterator.constructor.js");
__webpack_require__(/*! core-js/modules/esnext.iterator.for-each.js */ "./node_modules/core-js/modules/esnext.iterator.for-each.js");
__webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
document.querySelectorAll('.reset-btn').forEach(function (button) {
  button.addEventListener('click', function () {
    var input = button.previousElementSibling;
    if (input && input.dataset.original !== undefined) {
      input.value = input.dataset.original;
      input.dispatchEvent(new Event('change')); // utile pour relancer un fetch AJAX lié
    }
  });
});

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
/******/ __webpack_require__.O(0, ["vendors-node_modules_fortawesome_fontawesome-free_js_all_js-node_modules_htmx_org_dist_htmx_e-f51ac6"], () => (__webpack_exec__("./assets/app.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YXNzZXRzL3NjcmlwdHMvYmF0dGxlLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9zY3JpcHRzL2Zvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3NjcmlwdHMvaGVhZGVyLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9zY3JpcHRzL3Jlc2V0LWJ0bi5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvc3R5bGVzL2FwcC5zY3NzPzhmNTkiXSwic291cmNlc0NvbnRlbnQiOlsiLypcclxuICogV2VsY29tZSB0byB5b3VyIGFwcCdzIG1haW4gSmF2YVNjcmlwdCBmaWxlIVxyXG4gKlxyXG4gKiBUaGlzIGZpbGUgd2lsbCBiZSBpbmNsdWRlZCBvbnRvIHRoZSBwYWdlIHZpYSB0aGUgaW1wb3J0bWFwKCkgVHdpZyBmdW5jdGlvbixcclxuICogd2hpY2ggc2hvdWxkIGFscmVhZHkgYmUgaW4geW91ciBiYXNlLmh0bWwudHdpZy5cclxuICovXHJcbmltcG9ydCAnQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLWZyZWUvY3NzL2FsbC5taW4uY3NzJztcclxuaW1wb3J0ICdAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtZnJlZS9qcy9hbGwuanMnO1xyXG5pbXBvcnQgJy4vc2NyaXB0cy9oZWFkZXInO1xyXG5pbXBvcnQgJy4vc2NyaXB0cy9mb3JtJztcclxuaW1wb3J0ICcuL3NjcmlwdHMvcmVzZXQtYnRuJztcclxuaW1wb3J0ICcuL3NjcmlwdHMvYmF0dGxlJztcclxuaW1wb3J0ICcuL3N0eWxlcy9hcHAuc2Nzcyc7XHJcbmltcG9ydCAnaHRteC5vcmcnO1xyXG53aW5kb3cuaHRteCA9IHJlcXVpcmUoJ2h0bXgub3JnJyk7XHJcblxyXG5jb25zb2xlLmxvZygnVGhpcyBsb2cgY29tZXMgZnJvbSBhc3NldHMvYXBwLmpzIC0gd2VsY29tZSB0byBBc3NldE1hcHBlciEg8J+OiScpO1xyXG4iLCIvLyAuLi4gZXhpc3RpbmcgY29kZSAuLi5cclxuZnVuY3Rpb24gcGFyc2VUaW1lVG9Ncyh2YWwpIHtcclxuICAgIGlmICghdmFsKSByZXR1cm4gMDtcclxuICAgIGNvbnN0IHMgPSBTdHJpbmcodmFsKS50cmltKCk7XHJcbiAgICBpZiAocy5lbmRzV2l0aCgnbXMnKSkgcmV0dXJuIHBhcnNlRmxvYXQocyk7XHJcbiAgICBpZiAocy5lbmRzV2l0aCgncycpKSByZXR1cm4gcGFyc2VGbG9hdChzKSAqIDEwMDA7XHJcbiAgICBjb25zdCBudW0gPSBwYXJzZUZsb2F0KHMpO1xyXG4gICAgcmV0dXJuIGlzTmFOKG51bSkgPyAwIDogbnVtO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRDdXJyZW50QW5pbWF0aW9uTXMoZWwpIHtcclxuICAgIGlmICghZWwpIHJldHVybiAwO1xyXG4gICAgY29uc3QgY3MgPSBnZXRDb21wdXRlZFN0eWxlKGVsKTtcclxuICAgIC8vIDEpIHZhcmlhYmxlIENTUyAtLWR1cmUgc2kgZMOpZmluaWUgKGV4OiBcIjEwMDBtc1wiKVxyXG4gICAgY29uc3QgZHVyZSA9IGNzLmdldFByb3BlcnR5VmFsdWUoJy0tZHVyZScpO1xyXG4gICAgY29uc3QgbXNGcm9tVmFyID0gcGFyc2VUaW1lVG9NcyhkdXJlKTtcclxuICAgIGlmIChtc0Zyb21WYXIgPiAwKSByZXR1cm4gbXNGcm9tVmFyO1xyXG5cclxuICAgIGNvbnN0IGFuaW1EdXIgPSBjcy5hbmltYXRpb25EdXJhdGlvbiB8fCBjcy5nZXRQcm9wZXJ0eVZhbHVlKCdhbmltYXRpb24tZHVyYXRpb24nKTtcclxuICAgIGNvbnN0IGZpcnN0ID0gU3RyaW5nKGFuaW1EdXIgfHwgJycpLnNwbGl0KCcsJylbMF07XHJcbiAgICBjb25zdCBtc0Zyb21BbmltID0gcGFyc2VUaW1lVG9NcyhmaXJzdCk7XHJcbiAgICByZXR1cm4gbXNGcm9tQW5pbSA+IDAgPyBtc0Zyb21BbmltIDogODAwO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwbGF5VHVybnModHVybnMpe1xyXG4gICAgaWYoIUFycmF5LmlzQXJyYXkodHVybnMpIHx8IHR1cm5zLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IGJ1ZmZlck1zID0gMTUwOyAvLyBwYXVzZSBlbnRyZSBkZXV4IGFjdGlvbnNcclxuXHJcbiAgICBjb25zdCBydW5UdXJuID0gKGlkeCkgPT4ge1xyXG4gICAgICAgIGlmIChpZHggPj0gdHVybnMubGVuZ3RoKSByZXR1cm47XHJcbiAgICAgICAgY29uc3QgdCA9IHR1cm5zW2lkeF07XHJcblxyXG4gICAgICAgIGNvbnN0IGFjdG9ySWQgPSBgc3ByaXRlLSR7dC5hY3Rvci50ZWFtfS0ke3QuYWN0b3Iuc2xvdH1gO1xyXG4gICAgICAgIGNvbnN0IGFjdG9yRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChhY3RvcklkKTtcclxuXHJcbiAgICAgICAgaWYgKGFjdG9yRWwgJiYgKGFjdG9yRWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWFkJykgfHwgYWN0b3JFbC5jbGFzc0xpc3QuY29udGFpbnMoJ2RlYWQtcm93MScpIHx8IGFjdG9yRWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWFkLXJvdzInKSkpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBydW5UdXJuKGlkeCArIDEpLCBidWZmZXJNcyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGlzSGVhbCA9IHQuYWN0aW9uID09PSAnaGVhbCc7XHJcblxyXG4gICAgICAgIGlmIChhY3RvckVsKSB7XHJcbiAgICAgICAgICAgIGFjdG9yRWwuY2xhc3NMaXN0LnJlbW92ZSgnYXR0YWNrJywgJ2hlYWwnLCAnaWRsZScpO1xyXG4gICAgICAgICAgICBhY3RvckVsLmNsYXNzTGlzdC5hZGQoaXNIZWFsID8gJ2hlYWwnIDogJ2F0dGFjaycpO1xyXG4gICAgICAgICAgICAvLyByZWZsb3dcclxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC1leHByZXNzaW9uc1xyXG4gICAgICAgICAgICBhY3RvckVsLm9mZnNldFdpZHRoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgYWN0aW9uTXMgPSBnZXRDdXJyZW50QW5pbWF0aW9uTXMoYWN0b3JFbCkgfHwgODAwO1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGFjdG9yRWwgJiYgIWFjdG9yRWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWFkJykgJiYgIWFjdG9yRWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWFkLXJvdzEnKSAmJiAhYWN0b3JFbC5jbGFzc0xpc3QuY29udGFpbnMoJ2RlYWQtcm93MicpKSB7XHJcbiAgICAgICAgICAgICAgICBhY3RvckVsLmNsYXNzTGlzdC5yZW1vdmUoJ2F0dGFjaycsICdoZWFsJyk7XHJcbiAgICAgICAgICAgICAgICBhY3RvckVsLmNsYXNzTGlzdC5hZGQoJ2lkbGUnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGlzSGVhbCAmJiB0LmhlYWxUYXJnZXQgJiYgdHlwZW9mIHQuaGVhbFZpdGFBZnRlciAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZpdGFJZCA9IGB2aXRhLSR7dC5oZWFsVGFyZ2V0LnRlYW19LSR7dC5oZWFsVGFyZ2V0LnNsb3R9YDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodml0YUlkKTtcclxuICAgICAgICAgICAgICAgIGlmIChlbCkgZWwudGV4dENvbnRlbnQgPSB0LmhlYWxWaXRhQWZ0ZXI7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIWlzSGVhbCAmJiB0LnRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0LnRhcmdldFZpdGFBZnRlciAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB2aXRhSWQgPSBgdml0YS0ke3QudGFyZ2V0LnRlYW19LSR7dC50YXJnZXQuc2xvdH1gO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodml0YUlkKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZWwpIGVsLnRleHRDb250ZW50ID0gdC50YXJnZXRWaXRhQWZ0ZXI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBNb3J0OiBqb3VlciBhbmltIGRlIGRlYXRoIHB1aXMgZmFpcmUgc29ydGlyIGxlIGNvbnRlbmV1clxyXG4gICAgICAgICAgICAgICAgaWYgKCh0eXBlb2YgdC50YXJnZXRWaXRhQWZ0ZXIgIT09ICd1bmRlZmluZWQnICYmIE51bWJlcih0LnRhcmdldFZpdGFBZnRlcikgPD0gMCkgfHwgKHQudGFyZ2V0LmFsaXZlID09PSBmYWxzZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXRTcHJpdGVJZCA9IGBzcHJpdGUtJHt0LnRhcmdldC50ZWFtfS0ke3QudGFyZ2V0LnNsb3R9YDtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXRFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhcmdldFNwcml0ZUlkKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0RWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUGFzc2UgZW4gXCJkZWFkXCIgKG91IDIgcmFuZ8OpZXMgc2kgdHUgdXRpbGlzZXMgZGVhZC1yb3cxL2RlYWQtcm93MilcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0RWwuY2xhc3NMaXN0LnJlbW92ZSgnaWRsZScsICdhdHRhY2snLCAnaGVhbCcsICdkZWFkLXJvdzEnLCAnZGVhZC1yb3cyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldEVsLmNsYXNzTGlzdC5hZGQoJ2RlYWQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmVmbG93IHBvdXIgcmVsYW5jZXIgbCdhbmltYXRpb24gZGUgbW9ydFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLWV4cHJlc3Npb25zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldEVsLm9mZnNldFdpZHRoO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRHVyw6llIGRlIGwnYW5pbSBkZSBtb3J0IHBvdXIgY2hyb25vbcOpdHJlciBsYSBzb3J0aWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVhdGhNcyA9IGdldEN1cnJlbnRBbmltYXRpb25Ncyh0YXJnZXRFbCkgfHwgMTQwMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFwcsOocyBsYSBtb3J0IC0+IHNvcnRpZSDDqWNyYW4gZHUgY29udGVuZXVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udGFpbmVySWQgPSBgdW5pdC0ke3QudGFyZ2V0LnRlYW19LSR7dC50YXJnZXQuc2xvdH1gO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udGFpbmVyRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjb250YWluZXJJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udGFpbmVyRWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodC50YXJnZXQudGVhbSA9PT0gJ0EnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lckVsLmNsYXNzTGlzdC5hZGQoJ2V4aXQtbGVmdCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lckVsLmNsYXNzTGlzdC5hZGQoJ2V4aXQtcmlnaHQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGRlYXRoTXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBydW5UdXJuKGlkeCArIDEpLCBidWZmZXJNcyk7XHJcbiAgICAgICAgfSwgYWN0aW9uTXMpO1xyXG4gICAgfTtcclxuXHJcbiAgICBydW5UdXJuKDApO1xyXG59XHJcblxyXG5cclxuLy8gRXhwb3NlciBnbG9iYWwgcG91ciBodG14XHJcbndpbmRvdy5wbGF5VHVybnMgPSBwbGF5VHVybnM7XHJcbi8vIC4uLiBleGlzdGluZyBjb2RlIC4uLiIsIlxyXG5jb25zdCBzZWxlY3RvciA9ICdpbnB1dFt0eXBlPVwidGV4dFwiXSwgaW5wdXRbdHlwZT1cIm51bWJlclwiXSwgaW5wdXRbdHlwZT1lbWFpbF0sIGlucHV0W3R5cGU9cGFzc3dvcmRdLCBzZWxlY3QsIHRleHRhcmVhJztcclxuY29uc3QgaW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XHJcbmNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWxsLWZvcm0nKTtcclxuXHJcbmZ1bmN0aW9uIGluaXRJbnB1dChpbnB1dEVsKSB7XHJcbiAgICBjb25zdCB3cmFwcGVyID0gaW5wdXRFbC5jbG9zZXN0KCdzcGFuJyk7XHJcblxyXG4gICAgaWYgKGlucHV0RWwudmFsdWUudHJpbSgpICE9PSAnJykge1xyXG4gICAgICAgIHdyYXBwZXI/LmNsYXNzTGlzdC5hZGQoJ2lucHV0cy0tZmlsbGVkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5wdXRFbC5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIG9uRm9jdXMpO1xyXG4gICAgaW5wdXRFbC5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgb25CbHVyKTtcclxufVxyXG5cclxuZnVuY3Rpb24gb25Gb2N1cyhldikge1xyXG4gICAgY29uc3QgcGFyZW50ID0gZXYudGFyZ2V0LnBhcmVudE5vZGU7XHJcblxyXG4gICAgaWYgKHBhcmVudCAmJiBwYXJlbnQuY2xhc3NMaXN0KSB7XHJcbiAgICAgICAgcGFyZW50LmNsYXNzTGlzdC5hZGQoJ2lucHV0cy0tZmlsbGVkJyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9uQmx1ciggZXYgKSB7XHJcbiAgICBjb25zdCBpbnB1dCA9IGV2LnRhcmdldDtcclxuICAgIGNvbnN0IHdyYXBwZXIgPSBpbnB1dC5wYXJlbnROb2RlO1xyXG5cclxuICAgIGlmIChpbnB1dC52YWx1ZS50cmltKCkgPT09ICcnKSB7XHJcbiAgICAgICAgd3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKCdpbnB1dHMtLWZpbGxlZCcpO1xyXG4gICAgICAgIHdyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZSgnaW5wdXRzLS1pbnZhbGlkJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnaW5wdXRzLS1maWxsZWQnKTtcclxuXHJcbiAgICAgICAgaWYgKCFpbnB1dC5jaGVja1ZhbGlkaXR5KCkpIHtcclxuICAgICAgICAgICAgd3JhcHBlci5jbGFzc0xpc3QuYWRkKCdpbnB1dHMtLWludmFsaWQnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB3cmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2lucHV0cy0taW52YWxpZCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbnB1dC5yZW1vdmVFdmVudExpc3RlbmVyKCdpbnB1dCcsIGxpdmVWYWxpZGF0aW9uKTtcclxuICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgbGl2ZVZhbGlkYXRpb24pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBsaXZlVmFsaWRhdGlvbiggZXYgKSB7XHJcbiAgICBjb25zdCBpbnB1dCA9IGV2LnRhcmdldDtcclxuICAgIGNvbnN0IHdyYXBwZXIgPSBpbnB1dC5wYXJlbnROb2RlO1xyXG5cclxuICAgIGlmICghaW5wdXQuY2hlY2tWYWxpZGl0eSgpKSB7XHJcbiAgICAgICAgd3JhcHBlci5jbGFzc0xpc3QuYWRkKCdpbnB1dHMtLWludmFsaWQnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgd3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKCdpbnB1dHMtLWludmFsaWQnKTtcclxuICAgIH1cclxufVxyXG5cclxuaWYgKGZvcm0pIHtcclxuICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0Jywgb25TdWJtaXQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBvblN1Ym1pdChldikge1xyXG4gICAgY29uc3QgaW5wdXRzV3JhcHBlcnMgPSBldi50YXJnZXQucXVlcnlTZWxlY3RvckFsbCgnc3BhbicpO1xyXG4gICAgbGV0IGhhc0Vycm9yID0gZmFsc2U7XHJcblxyXG4gICAgaW5wdXRzV3JhcHBlcnMuZm9yRWFjaCgod3JhcHBlcikgPT4ge1xyXG4gICAgICAgIGNvbnN0IGlucHV0ID0gd3JhcHBlci5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcclxuICAgICAgICBpZiAoaW5wdXQpIHtcclxuICAgICAgICAgICAgaWYgKCFpbnB1dC5jaGVja1ZhbGlkaXR5KCkpIHtcclxuICAgICAgICAgICAgICAgIHdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnaW5wdXRzLS1pbnZhbGlkJyk7XHJcbiAgICAgICAgICAgICAgICBoYXNFcnJvciA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3cmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2lucHV0cy0taW52YWxpZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKGhhc0Vycm9yKSB7XHJcbiAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcclxuICAgIH1cclxufVxyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XHJcbiAgICBpbnB1dHMuZm9yRWFjaCgoaW5wdXQpID0+IHtcclxuICAgICAgICBpbml0SW5wdXQoaW5wdXQpO1xyXG5cclxuICAgICAgICBpZiAoaW5wdXQudGFnTmFtZSA9PT0gJ1NFTEVDVCcgJiYgaW5wdXQudmFsdWUpIHtcclxuICAgICAgICAgICAgY29uc3Qgd3JhcHBlciA9IGlucHV0LnBhcmVudE5vZGU7XHJcbiAgICAgICAgICAgIHdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnaW5wdXRzLS1maWxsZWQnKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSk7IiwiY29uc3QgZHJvcGRvd24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRyb3Bkb3duXCIpO1xyXG5jb25zdCBkcm9wZG93bkNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRyb3Bkb3duLWNvbnRlbnRcIik7XHJcblxyXG5kcm9wZG93bi5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsICgpID0+IHtcclxuICAgIGRyb3Bkb3duQ29udGVudC5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XHJcbiAgICBkcm9wZG93bkNvbnRlbnQuc3R5bGUuYW5pbWF0aW9uID0gXCJzaG93LWNvbnRlbnQgMC41cyBlYXNlIGZvcndhcmRzXCI7XHJcbn0pO1xyXG5cclxuZHJvcGRvd24uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsICgpID0+IHtcclxuICAgIGRyb3Bkb3duQ29udGVudC5zdHlsZS5hbmltYXRpb24gPSBcImRvbnQtc2hvdy1jb250ZW50IDAuNXMgZWFzZSBmb3J3YXJkc1wiO1xyXG5cclxuICAgIGRyb3Bkb3duQ29udGVudC5hZGRFdmVudExpc3RlbmVyKFwiYW5pbWF0aW9uZW5kXCIsIGZ1bmN0aW9uIGhhbmRsZXIoZWxlbWVudCkge1xyXG4gICAgICAgIGlmIChlbGVtZW50LmFuaW1hdGlvbk5hbWUgPT09IFwiZG9udC1zaG93LWNvbnRlbnRcIikge1xyXG4gICAgICAgICAgICBkcm9wZG93bkNvbnRlbnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkcm9wZG93bkNvbnRlbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImFuaW1hdGlvbmVuZFwiLCBoYW5kbGVyKTtcclxuICAgIH0pO1xyXG59KTsiLCJkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucmVzZXQtYnRuJykuZm9yRWFjaChidXR0b24gPT4ge1xyXG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGlucHV0ID0gYnV0dG9uLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XHJcbiAgICAgICAgaWYgKGlucHV0ICYmIGlucHV0LmRhdGFzZXQub3JpZ2luYWwgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBpbnB1dC52YWx1ZSA9IGlucHV0LmRhdGFzZXQub3JpZ2luYWw7XHJcbiAgICAgICAgICAgIGlucHV0LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdjaGFuZ2UnKSk7IC8vIHV0aWxlIHBvdXIgcmVsYW5jZXIgdW4gZmV0Y2ggQUpBWCBsacOpXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0pOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJodG14IiwicmVxdWlyZSIsImNvbnNvbGUiLCJsb2ciLCJwYXJzZVRpbWVUb01zIiwidmFsIiwicyIsIlN0cmluZyIsInRyaW0iLCJlbmRzV2l0aCIsInBhcnNlRmxvYXQiLCJudW0iLCJpc05hTiIsImdldEN1cnJlbnRBbmltYXRpb25NcyIsImVsIiwiY3MiLCJnZXRDb21wdXRlZFN0eWxlIiwiZHVyZSIsImdldFByb3BlcnR5VmFsdWUiLCJtc0Zyb21WYXIiLCJhbmltRHVyIiwiYW5pbWF0aW9uRHVyYXRpb24iLCJmaXJzdCIsInNwbGl0IiwibXNGcm9tQW5pbSIsInBsYXlUdXJucyIsInR1cm5zIiwiQXJyYXkiLCJpc0FycmF5IiwibGVuZ3RoIiwiYnVmZmVyTXMiLCJydW5UdXJuIiwiaWR4IiwidCIsImFjdG9ySWQiLCJjb25jYXQiLCJhY3RvciIsInRlYW0iLCJzbG90IiwiYWN0b3JFbCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsInNldFRpbWVvdXQiLCJpc0hlYWwiLCJhY3Rpb24iLCJyZW1vdmUiLCJhZGQiLCJvZmZzZXRXaWR0aCIsImFjdGlvbk1zIiwiaGVhbFRhcmdldCIsImhlYWxWaXRhQWZ0ZXIiLCJ2aXRhSWQiLCJ0ZXh0Q29udGVudCIsInRhcmdldCIsInRhcmdldFZpdGFBZnRlciIsIk51bWJlciIsImFsaXZlIiwidGFyZ2V0U3ByaXRlSWQiLCJ0YXJnZXRFbCIsImRlYXRoTXMiLCJjb250YWluZXJJZCIsImNvbnRhaW5lckVsIiwic2VsZWN0b3IiLCJpbnB1dHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9ybSIsInF1ZXJ5U2VsZWN0b3IiLCJpbml0SW5wdXQiLCJpbnB1dEVsIiwid3JhcHBlciIsImNsb3Nlc3QiLCJ2YWx1ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJvbkZvY3VzIiwib25CbHVyIiwiZXYiLCJwYXJlbnQiLCJwYXJlbnROb2RlIiwiaW5wdXQiLCJjaGVja1ZhbGlkaXR5IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImxpdmVWYWxpZGF0aW9uIiwib25TdWJtaXQiLCJpbnB1dHNXcmFwcGVycyIsImhhc0Vycm9yIiwiZm9yRWFjaCIsInByZXZlbnREZWZhdWx0IiwidGFnTmFtZSIsImRyb3Bkb3duIiwiZHJvcGRvd25Db250ZW50Iiwic3R5bGUiLCJkaXNwbGF5IiwiYW5pbWF0aW9uIiwiaGFuZGxlciIsImVsZW1lbnQiLCJhbmltYXRpb25OYW1lIiwiYnV0dG9uIiwicHJldmlvdXNFbGVtZW50U2libGluZyIsImRhdGFzZXQiLCJvcmlnaW5hbCIsInVuZGVmaW5lZCIsImRpc3BhdGNoRXZlbnQiLCJFdmVudCJdLCJzb3VyY2VSb290IjoiIn0=
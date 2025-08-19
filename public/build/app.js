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
/* harmony import */ var _styles_app_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./styles/app.scss */ "./assets/styles/app.scss");
/* harmony import */ var htmx_org__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! htmx.org */ "./node_modules/htmx.org/dist/htmx.esm.js");
/*
 * Welcome to your app's main JavaScript file!
 *
 * This file will be included onto the page via the importmap() Twig function,
 * which should already be in your base.html.twig.
 */







window.htmx = __webpack_require__(/*! htmx.org */ "./node_modules/htmx.org/dist/htmx.esm.js");
console.log('This log comes from assets/app.js - welcome to AssetMapper! 🎉');

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
/******/ __webpack_require__.O(0, ["vendors-node_modules_fortawesome_fontawesome-free_js_all_js-node_modules_htmx_org_dist_htmx_e-e346be"], () => (__webpack_exec__("./assets/app.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUN1RDtBQUNOO0FBQ3ZCO0FBQ0Y7QUFDSztBQUNGO0FBQ1Q7QUFDbEJBLE1BQU0sQ0FBQ0MsSUFBSSxHQUFHQyxtQkFBTyxDQUFDLDBEQUFVLENBQUM7QUFFakNDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLGdFQUFnRSxDQUFDLEM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNkN0UsSUFBTUMsUUFBUSxHQUFHLHFHQUFxRztBQUN0SCxJQUFNQyxNQUFNLEdBQUdDLFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUNILFFBQVEsQ0FBQztBQUNsRCxJQUFNSSxJQUFJLEdBQUdGLFFBQVEsQ0FBQ0csYUFBYSxDQUFDLFdBQVcsQ0FBQztBQUVoRCxTQUFTQyxTQUFTQSxDQUFDQyxPQUFPLEVBQUU7RUFDeEIsSUFBTUMsT0FBTyxHQUFHRCxPQUFPLENBQUNFLE9BQU8sQ0FBQyxNQUFNLENBQUM7RUFFdkMsSUFBSUYsT0FBTyxDQUFDRyxLQUFLLENBQUNDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO0lBQzdCSCxPQUFPLGFBQVBBLE9BQU8sZUFBUEEsT0FBTyxDQUFFSSxTQUFTLENBQUNDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQztFQUM1QztFQUVBTixPQUFPLENBQUNPLGdCQUFnQixDQUFDLE9BQU8sRUFBRUMsT0FBTyxDQUFDO0VBQzFDUixPQUFPLENBQUNPLGdCQUFnQixDQUFDLE1BQU0sRUFBRUUsTUFBTSxDQUFDO0FBQzVDO0FBRUEsU0FBU0QsT0FBT0EsQ0FBQ0UsRUFBRSxFQUFFO0VBQ2pCLElBQU1DLE1BQU0sR0FBR0QsRUFBRSxDQUFDRSxNQUFNLENBQUNDLFVBQVU7RUFFbkMsSUFBSUYsTUFBTSxJQUFJQSxNQUFNLENBQUNOLFNBQVMsRUFBRTtJQUM1Qk0sTUFBTSxDQUFDTixTQUFTLENBQUNDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQztFQUMxQztBQUNKO0FBRUEsU0FBU0csTUFBTUEsQ0FBRUMsRUFBRSxFQUFHO0VBQ2xCLElBQU1JLEtBQUssR0FBR0osRUFBRSxDQUFDRSxNQUFNO0VBQ3ZCLElBQU1YLE9BQU8sR0FBR2EsS0FBSyxDQUFDRCxVQUFVO0VBRWhDLElBQUlDLEtBQUssQ0FBQ1gsS0FBSyxDQUFDQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtJQUMzQkgsT0FBTyxDQUFDSSxTQUFTLENBQUNVLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQztJQUMxQ2QsT0FBTyxDQUFDSSxTQUFTLENBQUNVLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQztFQUMvQyxDQUFDLE1BQU07SUFDSGQsT0FBTyxDQUFDSSxTQUFTLENBQUNDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQztJQUV2QyxJQUFJLENBQUNRLEtBQUssQ0FBQ0UsYUFBYSxDQUFDLENBQUMsRUFBRTtNQUN4QmYsT0FBTyxDQUFDSSxTQUFTLENBQUNDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQztJQUM1QyxDQUFDLE1BQU07TUFDSEwsT0FBTyxDQUFDSSxTQUFTLENBQUNVLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQztJQUMvQztFQUNKO0VBRUFELEtBQUssQ0FBQ0csbUJBQW1CLENBQUMsT0FBTyxFQUFFQyxjQUFjLENBQUM7RUFDbERKLEtBQUssQ0FBQ1AsZ0JBQWdCLENBQUMsT0FBTyxFQUFFVyxjQUFjLENBQUM7QUFDbkQ7QUFFQSxTQUFTQSxjQUFjQSxDQUFFUixFQUFFLEVBQUc7RUFDMUIsSUFBTUksS0FBSyxHQUFHSixFQUFFLENBQUNFLE1BQU07RUFDdkIsSUFBTVgsT0FBTyxHQUFHYSxLQUFLLENBQUNELFVBQVU7RUFFaEMsSUFBSSxDQUFDQyxLQUFLLENBQUNFLGFBQWEsQ0FBQyxDQUFDLEVBQUU7SUFDeEJmLE9BQU8sQ0FBQ0ksU0FBUyxDQUFDQyxHQUFHLENBQUMsaUJBQWlCLENBQUM7RUFDNUMsQ0FBQyxNQUFNO0lBQ0hMLE9BQU8sQ0FBQ0ksU0FBUyxDQUFDVSxNQUFNLENBQUMsaUJBQWlCLENBQUM7RUFDL0M7QUFDSjtBQUVBLElBQUlsQixJQUFJLEVBQUU7RUFDTkEsSUFBSSxDQUFDVSxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUVZLFFBQVEsQ0FBQztBQUM3QztBQUVBLFNBQVNBLFFBQVFBLENBQUNULEVBQUUsRUFBRTtFQUNsQixJQUFNVSxjQUFjLEdBQUdWLEVBQUUsQ0FBQ0UsTUFBTSxDQUFDaEIsZ0JBQWdCLENBQUMsTUFBTSxDQUFDO0VBQ3pELElBQUl5QixRQUFRLEdBQUcsS0FBSztFQUVwQkQsY0FBYyxDQUFDRSxPQUFPLENBQUMsVUFBQ3JCLE9BQU8sRUFBSztJQUNoQyxJQUFNYSxLQUFLLEdBQUdiLE9BQU8sQ0FBQ0gsYUFBYSxDQUFDTCxRQUFRLENBQUM7SUFDN0MsSUFBSXFCLEtBQUssRUFBRTtNQUNQLElBQUksQ0FBQ0EsS0FBSyxDQUFDRSxhQUFhLENBQUMsQ0FBQyxFQUFFO1FBQ3hCZixPQUFPLENBQUNJLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLGlCQUFpQixDQUFDO1FBQ3hDZSxRQUFRLEdBQUcsSUFBSTtNQUNuQixDQUFDLE1BQU07UUFDSHBCLE9BQU8sQ0FBQ0ksU0FBUyxDQUFDVSxNQUFNLENBQUMsaUJBQWlCLENBQUM7TUFDL0M7SUFDSjtFQUNKLENBQUMsQ0FBQztFQUVGLElBQUlNLFFBQVEsRUFBRTtJQUNWWCxFQUFFLENBQUNhLGNBQWMsQ0FBQyxDQUFDO0VBQ3ZCO0FBQ0o7QUFFQW5DLE1BQU0sQ0FBQ21CLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxZQUFNO0VBQ2xDYixNQUFNLENBQUM0QixPQUFPLENBQUMsVUFBQ1IsS0FBSyxFQUFLO0lBQ3RCZixTQUFTLENBQUNlLEtBQUssQ0FBQztJQUVoQixJQUFJQSxLQUFLLENBQUNVLE9BQU8sS0FBSyxRQUFRLElBQUlWLEtBQUssQ0FBQ1gsS0FBSyxFQUFFO01BQzNDLElBQU1GLE9BQU8sR0FBR2EsS0FBSyxDQUFDRCxVQUFVO01BQ2hDWixPQUFPLENBQUNJLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLGdCQUFnQixDQUFDO0lBQzNDO0VBQ0osQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFDLEM7Ozs7Ozs7Ozs7QUMxRkYsSUFBTW1CLFFBQVEsR0FBRzlCLFFBQVEsQ0FBQ0csYUFBYSxDQUFDLFdBQVcsQ0FBQztBQUNwRCxJQUFNNEIsZUFBZSxHQUFHL0IsUUFBUSxDQUFDRyxhQUFhLENBQUMsbUJBQW1CLENBQUM7QUFFbkUyQixRQUFRLENBQUNsQixnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsWUFBTTtFQUN6Q21CLGVBQWUsQ0FBQ0MsS0FBSyxDQUFDQyxPQUFPLEdBQUcsTUFBTTtFQUN0Q0YsZUFBZSxDQUFDQyxLQUFLLENBQUNFLFNBQVMsR0FBRyxpQ0FBaUM7QUFDdkUsQ0FBQyxDQUFDO0FBRUZKLFFBQVEsQ0FBQ2xCLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxZQUFNO0VBQ3hDbUIsZUFBZSxDQUFDQyxLQUFLLENBQUNFLFNBQVMsR0FBRyxzQ0FBc0M7RUFFeEVILGVBQWUsQ0FBQ25CLGdCQUFnQixDQUFDLGNBQWMsRUFBRSxTQUFTdUIsT0FBT0EsQ0FBQ0MsT0FBTyxFQUFFO0lBQ3ZFLElBQUlBLE9BQU8sQ0FBQ0MsYUFBYSxLQUFLLG1CQUFtQixFQUFFO01BQy9DTixlQUFlLENBQUNDLEtBQUssQ0FBQ0MsT0FBTyxHQUFHLE1BQU07SUFDMUM7SUFDQUYsZUFBZSxDQUFDVCxtQkFBbUIsQ0FBQyxjQUFjLEVBQUVhLE9BQU8sQ0FBQztFQUNoRSxDQUFDLENBQUM7QUFDTixDQUFDLENBQUMsQzs7Ozs7Ozs7Ozs7Ozs7O0FDakJGbkMsUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsQ0FBQzBCLE9BQU8sQ0FBQyxVQUFBVyxNQUFNLEVBQUk7RUFDdERBLE1BQU0sQ0FBQzFCLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFNO0lBQ25DLElBQU1PLEtBQUssR0FBR21CLE1BQU0sQ0FBQ0Msc0JBQXNCO0lBQzNDLElBQUlwQixLQUFLLElBQUlBLEtBQUssQ0FBQ3FCLE9BQU8sQ0FBQ0MsUUFBUSxLQUFLQyxTQUFTLEVBQUU7TUFDL0N2QixLQUFLLENBQUNYLEtBQUssR0FBR1csS0FBSyxDQUFDcUIsT0FBTyxDQUFDQyxRQUFRO01BQ3BDdEIsS0FBSyxDQUFDd0IsYUFBYSxDQUFDLElBQUlDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUM7RUFDSixDQUFDLENBQUM7QUFDTixDQUFDLENBQUMsQzs7Ozs7Ozs7Ozs7O0FDUkYiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvYXBwLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9zY3JpcHRzL2Zvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3NjcmlwdHMvaGVhZGVyLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9zY3JpcHRzL3Jlc2V0LWJ0bi5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvc3R5bGVzL2FwcC5zY3NzPzhmNTkiXSwic291cmNlc0NvbnRlbnQiOlsiLypcclxuICogV2VsY29tZSB0byB5b3VyIGFwcCdzIG1haW4gSmF2YVNjcmlwdCBmaWxlIVxyXG4gKlxyXG4gKiBUaGlzIGZpbGUgd2lsbCBiZSBpbmNsdWRlZCBvbnRvIHRoZSBwYWdlIHZpYSB0aGUgaW1wb3J0bWFwKCkgVHdpZyBmdW5jdGlvbixcclxuICogd2hpY2ggc2hvdWxkIGFscmVhZHkgYmUgaW4geW91ciBiYXNlLmh0bWwudHdpZy5cclxuICovXHJcbmltcG9ydCAnQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLWZyZWUvY3NzL2FsbC5taW4uY3NzJztcclxuaW1wb3J0ICdAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtZnJlZS9qcy9hbGwuanMnO1xyXG5pbXBvcnQgJy4vc2NyaXB0cy9oZWFkZXInO1xyXG5pbXBvcnQgJy4vc2NyaXB0cy9mb3JtJztcclxuaW1wb3J0ICcuL3NjcmlwdHMvcmVzZXQtYnRuJztcclxuaW1wb3J0ICcuL3N0eWxlcy9hcHAuc2Nzcyc7XHJcbmltcG9ydCAnaHRteC5vcmcnO1xyXG53aW5kb3cuaHRteCA9IHJlcXVpcmUoJ2h0bXgub3JnJyk7XHJcblxyXG5jb25zb2xlLmxvZygnVGhpcyBsb2cgY29tZXMgZnJvbSBhc3NldHMvYXBwLmpzIC0gd2VsY29tZSB0byBBc3NldE1hcHBlciEg8J+OiScpO1xyXG4iLCJcclxuY29uc3Qgc2VsZWN0b3IgPSAnaW5wdXRbdHlwZT1cInRleHRcIl0sIGlucHV0W3R5cGU9XCJudW1iZXJcIl0sIGlucHV0W3R5cGU9ZW1haWxdLCBpbnB1dFt0eXBlPXBhc3N3b3JkXSwgc2VsZWN0LCB0ZXh0YXJlYSc7XHJcbmNvbnN0IGlucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xyXG5jb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFsbC1mb3JtJyk7XHJcblxyXG5mdW5jdGlvbiBpbml0SW5wdXQoaW5wdXRFbCkge1xyXG4gICAgY29uc3Qgd3JhcHBlciA9IGlucHV0RWwuY2xvc2VzdCgnc3BhbicpO1xyXG5cclxuICAgIGlmIChpbnB1dEVsLnZhbHVlLnRyaW0oKSAhPT0gJycpIHtcclxuICAgICAgICB3cmFwcGVyPy5jbGFzc0xpc3QuYWRkKCdpbnB1dHMtLWZpbGxlZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGlucHV0RWwuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCBvbkZvY3VzKTtcclxuICAgIGlucHV0RWwuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIG9uQmx1cik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9uRm9jdXMoZXYpIHtcclxuICAgIGNvbnN0IHBhcmVudCA9IGV2LnRhcmdldC5wYXJlbnROb2RlO1xyXG5cclxuICAgIGlmIChwYXJlbnQgJiYgcGFyZW50LmNsYXNzTGlzdCkge1xyXG4gICAgICAgIHBhcmVudC5jbGFzc0xpc3QuYWRkKCdpbnB1dHMtLWZpbGxlZCcpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBvbkJsdXIoIGV2ICkge1xyXG4gICAgY29uc3QgaW5wdXQgPSBldi50YXJnZXQ7XHJcbiAgICBjb25zdCB3cmFwcGVyID0gaW5wdXQucGFyZW50Tm9kZTtcclxuXHJcbiAgICBpZiAoaW5wdXQudmFsdWUudHJpbSgpID09PSAnJykge1xyXG4gICAgICAgIHdyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZSgnaW5wdXRzLS1maWxsZWQnKTtcclxuICAgICAgICB3cmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2lucHV0cy0taW52YWxpZCcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2lucHV0cy0tZmlsbGVkJyk7XHJcblxyXG4gICAgICAgIGlmICghaW5wdXQuY2hlY2tWYWxpZGl0eSgpKSB7XHJcbiAgICAgICAgICAgIHdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnaW5wdXRzLS1pbnZhbGlkJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKCdpbnB1dHMtLWludmFsaWQnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW5wdXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBsaXZlVmFsaWRhdGlvbik7XHJcbiAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGxpdmVWYWxpZGF0aW9uKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbGl2ZVZhbGlkYXRpb24oIGV2ICkge1xyXG4gICAgY29uc3QgaW5wdXQgPSBldi50YXJnZXQ7XHJcbiAgICBjb25zdCB3cmFwcGVyID0gaW5wdXQucGFyZW50Tm9kZTtcclxuXHJcbiAgICBpZiAoIWlucHV0LmNoZWNrVmFsaWRpdHkoKSkge1xyXG4gICAgICAgIHdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnaW5wdXRzLS1pbnZhbGlkJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHdyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZSgnaW5wdXRzLS1pbnZhbGlkJyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmlmIChmb3JtKSB7XHJcbiAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIG9uU3VibWl0KTtcclxufVxyXG5cclxuZnVuY3Rpb24gb25TdWJtaXQoZXYpIHtcclxuICAgIGNvbnN0IGlucHV0c1dyYXBwZXJzID0gZXYudGFyZ2V0LnF1ZXJ5U2VsZWN0b3JBbGwoJ3NwYW4nKTtcclxuICAgIGxldCBoYXNFcnJvciA9IGZhbHNlO1xyXG5cclxuICAgIGlucHV0c1dyYXBwZXJzLmZvckVhY2goKHdyYXBwZXIpID0+IHtcclxuICAgICAgICBjb25zdCBpbnB1dCA9IHdyYXBwZXIucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XHJcbiAgICAgICAgaWYgKGlucHV0KSB7XHJcbiAgICAgICAgICAgIGlmICghaW5wdXQuY2hlY2tWYWxpZGl0eSgpKSB7XHJcbiAgICAgICAgICAgICAgICB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2lucHV0cy0taW52YWxpZCcpO1xyXG4gICAgICAgICAgICAgICAgaGFzRXJyb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgd3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKCdpbnB1dHMtLWludmFsaWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChoYXNFcnJvcikge1xyXG4gICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xyXG4gICAgaW5wdXRzLmZvckVhY2goKGlucHV0KSA9PiB7XHJcbiAgICAgICAgaW5pdElucHV0KGlucHV0KTtcclxuXHJcbiAgICAgICAgaWYgKGlucHV0LnRhZ05hbWUgPT09ICdTRUxFQ1QnICYmIGlucHV0LnZhbHVlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHdyYXBwZXIgPSBpbnB1dC5wYXJlbnROb2RlO1xyXG4gICAgICAgICAgICB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2lucHV0cy0tZmlsbGVkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0pOyIsImNvbnN0IGRyb3Bkb3duID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kcm9wZG93blwiKTtcclxuY29uc3QgZHJvcGRvd25Db250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kcm9wZG93bi1jb250ZW50XCIpO1xyXG5cclxuZHJvcGRvd24uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCAoKSA9PiB7XHJcbiAgICBkcm9wZG93bkNvbnRlbnQuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xyXG4gICAgZHJvcGRvd25Db250ZW50LnN0eWxlLmFuaW1hdGlvbiA9IFwic2hvdy1jb250ZW50IDAuNXMgZWFzZSBmb3J3YXJkc1wiO1xyXG59KTtcclxuXHJcbmRyb3Bkb3duLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCAoKSA9PiB7XHJcbiAgICBkcm9wZG93bkNvbnRlbnQuc3R5bGUuYW5pbWF0aW9uID0gXCJkb250LXNob3ctY29udGVudCAwLjVzIGVhc2UgZm9yd2FyZHNcIjtcclxuXHJcbiAgICBkcm9wZG93bkNvbnRlbnQuYWRkRXZlbnRMaXN0ZW5lcihcImFuaW1hdGlvbmVuZFwiLCBmdW5jdGlvbiBoYW5kbGVyKGVsZW1lbnQpIHtcclxuICAgICAgICBpZiAoZWxlbWVudC5hbmltYXRpb25OYW1lID09PSBcImRvbnQtc2hvdy1jb250ZW50XCIpIHtcclxuICAgICAgICAgICAgZHJvcGRvd25Db250ZW50LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZHJvcGRvd25Db250ZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJhbmltYXRpb25lbmRcIiwgaGFuZGxlcik7XHJcbiAgICB9KTtcclxufSk7IiwiZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJlc2V0LWJ0bicpLmZvckVhY2goYnV0dG9uID0+IHtcclxuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBjb25zdCBpbnB1dCA9IGJ1dHRvbi5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgIGlmIChpbnB1dCAmJiBpbnB1dC5kYXRhc2V0Lm9yaWdpbmFsICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgaW5wdXQudmFsdWUgPSBpbnB1dC5kYXRhc2V0Lm9yaWdpbmFsO1xyXG4gICAgICAgICAgICBpbnB1dC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnY2hhbmdlJykpOyAvLyB1dGlsZSBwb3VyIHJlbGFuY2VyIHVuIGZldGNoIEFKQVggbGnDqVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59KTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwibmFtZXMiOlsid2luZG93IiwiaHRteCIsInJlcXVpcmUiLCJjb25zb2xlIiwibG9nIiwic2VsZWN0b3IiLCJpbnB1dHMiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JtIiwicXVlcnlTZWxlY3RvciIsImluaXRJbnB1dCIsImlucHV0RWwiLCJ3cmFwcGVyIiwiY2xvc2VzdCIsInZhbHVlIiwidHJpbSIsImNsYXNzTGlzdCIsImFkZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJvbkZvY3VzIiwib25CbHVyIiwiZXYiLCJwYXJlbnQiLCJ0YXJnZXQiLCJwYXJlbnROb2RlIiwiaW5wdXQiLCJyZW1vdmUiLCJjaGVja1ZhbGlkaXR5IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImxpdmVWYWxpZGF0aW9uIiwib25TdWJtaXQiLCJpbnB1dHNXcmFwcGVycyIsImhhc0Vycm9yIiwiZm9yRWFjaCIsInByZXZlbnREZWZhdWx0IiwidGFnTmFtZSIsImRyb3Bkb3duIiwiZHJvcGRvd25Db250ZW50Iiwic3R5bGUiLCJkaXNwbGF5IiwiYW5pbWF0aW9uIiwiaGFuZGxlciIsImVsZW1lbnQiLCJhbmltYXRpb25OYW1lIiwiYnV0dG9uIiwicHJldmlvdXNFbGVtZW50U2libGluZyIsImRhdGFzZXQiLCJvcmlnaW5hbCIsInVuZGVmaW5lZCIsImRpc3BhdGNoRXZlbnQiLCJFdmVudCJdLCJzb3VyY2VSb290IjoiIn0=
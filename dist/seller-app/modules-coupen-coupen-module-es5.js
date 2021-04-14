(function () {
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["modules-coupen-coupen-module"], {
    /***/
    "2+NZ":
    /*!*************************************************!*\
      !*** ./src/app/modules/coupen/coupen.module.ts ***!
      \*************************************************/

    /*! exports provided: CoupenModule */

    /***/
    function NZ(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "CoupenModule", function () {
        return CoupenModule;
      });
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/common */
      "ofXK");
      /* harmony import */


      var _coupen_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./coupen-routing.module */
      "RoCE");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");

      console.log('in Coupen');

      var CoupenModule = function CoupenModule() {
        _classCallCheck(this, CoupenModule);
      };

      CoupenModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
        type: CoupenModule
      });
      CoupenModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
        factory: function CoupenModule_Factory(t) {
          return new (t || CoupenModule)();
        },
        imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"], _coupen_routing_module__WEBPACK_IMPORTED_MODULE_1__["CoupenRoutingModule"]]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](CoupenModule, {
          imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"], _coupen_routing_module__WEBPACK_IMPORTED_MODULE_1__["CoupenRoutingModule"]]
        });
      })();
      /***/

    },

    /***/
    "RoCE":
    /*!*********************************************************!*\
      !*** ./src/app/modules/coupen/coupen-routing.module.ts ***!
      \*********************************************************/

    /*! exports provided: CoupenRoutingModule */

    /***/
    function RoCE(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "CoupenRoutingModule", function () {
        return CoupenRoutingModule;
      });
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");
      /* harmony import */


      var _coupen_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./coupen.component */
      "6YMA");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");

      var routes = [{
        path: '',
        component: _coupen_component__WEBPACK_IMPORTED_MODULE_1__["CoupenComponent"]
      }];

      var CoupenRoutingModule = function CoupenRoutingModule() {
        _classCallCheck(this, CoupenRoutingModule);
      };

      CoupenRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
        type: CoupenRoutingModule
      });
      CoupenRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
        factory: function CoupenRoutingModule_Factory(t) {
          return new (t || CoupenRoutingModule)();
        },
        imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](CoupenRoutingModule, {
          imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]],
          exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]]
        });
      })();
      /***/

    }
  }]);
})();
//# sourceMappingURL=modules-coupen-coupen-module-es5.js.map
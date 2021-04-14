(function () {
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["modules-my-orders-my-orders-module"], {
    /***/
    "tf0y":
    /*!***************************************************************!*\
      !*** ./src/app/modules/my-orders/my-orders-routing.module.ts ***!
      \***************************************************************/

    /*! exports provided: MyOrdersRoutingModule */

    /***/
    function tf0y(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "MyOrdersRoutingModule", function () {
        return MyOrdersRoutingModule;
      });
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");
      /* harmony import */


      var _my_orders_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./my-orders.component */
      "wxDq");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");

      var routes = [{
        path: '',
        component: _my_orders_component__WEBPACK_IMPORTED_MODULE_1__["MyOrdersComponent"]
      }];

      var MyOrdersRoutingModule = function MyOrdersRoutingModule() {
        _classCallCheck(this, MyOrdersRoutingModule);
      };

      MyOrdersRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
        type: MyOrdersRoutingModule
      });
      MyOrdersRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
        factory: function MyOrdersRoutingModule_Factory(t) {
          return new (t || MyOrdersRoutingModule)();
        },
        imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](MyOrdersRoutingModule, {
          imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]],
          exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]]
        });
      })();
      /***/

    },

    /***/
    "wR0d":
    /*!*******************************************************!*\
      !*** ./src/app/modules/my-orders/my-orders.module.ts ***!
      \*******************************************************/

    /*! exports provided: MyOrdersModule */

    /***/
    function wR0d(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "MyOrdersModule", function () {
        return MyOrdersModule;
      });
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/common */
      "ofXK");
      /* harmony import */


      var _my_orders_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./my-orders-routing.module */
      "tf0y");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");

      console.log("in my order");

      var MyOrdersModule = function MyOrdersModule() {
        _classCallCheck(this, MyOrdersModule);
      };

      MyOrdersModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
        type: MyOrdersModule
      });
      MyOrdersModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
        factory: function MyOrdersModule_Factory(t) {
          return new (t || MyOrdersModule)();
        },
        imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"], _my_orders_routing_module__WEBPACK_IMPORTED_MODULE_1__["MyOrdersRoutingModule"]]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](MyOrdersModule, {
          imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"], _my_orders_routing_module__WEBPACK_IMPORTED_MODULE_1__["MyOrdersRoutingModule"]]
        });
      })();
      /***/

    }
  }]);
})();
//# sourceMappingURL=modules-my-orders-my-orders-module-es5.js.map
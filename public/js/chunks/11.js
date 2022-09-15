(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/mesVues/Parametres/Categorie.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/mesVues/Parametres/Categorie.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue_select__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-select */ "./node_modules/vue-select/dist/vue-select.js");
/* harmony import */ var vue_select__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_select__WEBPACK_IMPORTED_MODULE_0__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      category: {
        id: null,
        designation: null,
        // cycleDeVie:null,
        accessibilite: null
      }
    };
  },
  mounted: function mounted() {
    this.$store.dispatch('getMethod', {
      'where': '/getCategorie'
    }), this.$store.dispatch('getMethod', {
      'where': '/getGroupe'
    });
  },
  computed: {
    listeCategorie: function listeCategorie() {
      return this.$store.state.listeCategorie;
    },
    accessOptions: function accessOptions() {
      var obj = [];
      Object.values(this.$store.state.listeGroupe).forEach(function (key) {
        obj.push({
          id: key.id,
          label: key.designation
        });
      });
      return obj;
    }
  },
  methods: {
    submitForm: function submitForm() {
      var _this = this;

      this.$validator.validateAll().then(function (result) {
        if (result) {
          _this.$vs.loading({
            type: 'radius',
            container: '.form-loading',
            scale: 1.2
          });

          if (_this.category.id) {
            _this.$store.dispatch('editMethod', {
              'where': '/editCategory',
              'category': _this.category
            });
          } else {
            _this.$store.dispatch('addMethod', {
              'where': '/addCategory',
              'category': _this.category
            });
          }
        } else {// form have errors
        }
      });
    },
    editCategory: function editCategory(data) {
      var tab = []; // let tab2 = [];

      this.category.id = data.id;
      this.category.designation = data.designation; // tab2 = {'id' : data.cycleVie , 'label' : this.cycleLabel[data.cycleVie]}

      Object.values(data.groupe).forEach(function (value, key) {
        tab[key] = {
          'id': value.id,
          'label': value.designation
        };
      });
      this.category.accessibilite = tab;
    },
    deleteCategory: function deleteCategory(data) {
      this.category.id = data;
      this.$store.dispatch('deleteMethod', {
        'where': '/deleteCategorie',
        'groupe': this.category
      });
    }
  },
  components: {
    'v-select': vue_select__WEBPACK_IMPORTED_MODULE_0___default.a
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/mesVues/Parametres/Categorie.vue?vue&type=template&id=186c4e1d&":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/mesVues/Parametres/Categorie.vue?vue&type=template&id=186c4e1d& ***!
  \******************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "vs-row",
    {
      attrs: {
        "vs-align": "flex-start",
        "vs-type": "flex",
        "vs-justify": "center",
        "vs-w": "12"
      }
    },
    [
      _c(
        "vs-col",
        {
          staticClass: "pr-5 pb-5",
          attrs: {
            "vs-type": "flex",
            "vs-justify": "center",
            "vs-align": "center",
            "vs-lg": "8",
            "vs-sm": "12",
            "vs-xs": "12"
          }
        },
        [
          _c(
            "vx-card",
            { attrs: { title: "Liste des catégories" } },
            [
              _c(
                "vs-table",
                {
                  attrs: {
                    stripe: "",
                    pagination: "",
                    "max-items": 5,
                    search: "",
                    data: _vm.listeCategorie
                  },
                  scopedSlots: _vm._u([
                    {
                      key: "default",
                      fn: function(ref) {
                        var data = ref.data
                        return _vm._l(data, function(tr, indextr) {
                          return _c(
                            "vs-tr",
                            { key: indextr },
                            [
                              _c(
                                "vs-td",
                                { attrs: { data: data[indextr].designation } },
                                [
                                  _vm._v(
                                    "\n                            " +
                                      _vm._s(data[indextr].designation) +
                                      "\n                        "
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "vs-td",
                                { attrs: { data: data[indextr].designation } },
                                _vm._l(data[indextr].groupe, function(
                                  groupe,
                                  i
                                ) {
                                  return _c("strong", [
                                    _vm._v(
                                      "\n                                " +
                                        _vm._s(groupe.designation) +
                                        " -\n                            "
                                    )
                                  ])
                                }),
                                0
                              ),
                              _vm._v(" "),
                              _c(
                                "vs-td",
                                [
                                  _c("feather-icon", {
                                    attrs: {
                                      icon: "EditIcon",
                                      svgClasses:
                                        "w-5 h-5 hover:text-primary cursor-pointer"
                                    },
                                    on: {
                                      click: function($event) {
                                        $event.stopPropagation()
                                        return _vm.editCategory(tr)
                                      }
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c("feather-icon", {
                                    staticClass: "ml-2",
                                    attrs: {
                                      icon: "TrashIcon",
                                      svgClasses:
                                        "w-5 h-5 hover:text-danger cursor-pointer"
                                    },
                                    on: {
                                      click: function($event) {
                                        $event.stopPropagation()
                                        return _vm.deleteCategory(tr.id)
                                      }
                                    }
                                  })
                                ],
                                1
                              )
                            ],
                            1
                          )
                        })
                      }
                    }
                  ])
                },
                [
                  _c(
                    "template",
                    { slot: "thead" },
                    [
                      _c("vs-th", { attrs: { "sort-key": "designation" } }, [
                        _vm._v("Designation")
                      ]),
                      _vm._v(" "),
                      _c("vs-th", { attrs: { "sort-key": "designation" } }, [
                        _vm._v("accessibilite")
                      ]),
                      _vm._v(" "),
                      _c("vs-th", [_vm._v(" option ")])
                    ],
                    1
                  )
                ],
                2
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "vs-col",
        {
          staticClass: "pr-5",
          attrs: {
            "vs-type": "flex",
            "vs-justify": "center",
            "vs-align": "center",
            "vs-lg": "4",
            "vs-sm": "12",
            "vs-xs": "12"
          }
        },
        [
          _c("vx-card", { attrs: { title: "Nouvelle catégorie" } }, [
            _c(
              "form",
              { staticClass: "form-loading" },
              [
                _c("vs-input", {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: false,
                      expression: "false"
                    }
                  ],
                  attrs: { type: "w-full" },
                  model: {
                    value: _vm.category.id,
                    callback: function($$v) {
                      _vm.$set(_vm.category, "id", $$v)
                    },
                    expression: "category.id"
                  }
                }),
                _vm._v(" "),
                _c("vs-input", {
                  directives: [
                    {
                      name: "validate",
                      rawName: "v-validate",
                      value: "required",
                      expression: "'required'"
                    }
                  ],
                  staticClass: "w-full",
                  attrs: {
                    label: "Désignation  catégorie",
                    placeholder: "La désignation de la catégorie",
                    name: "designation categorie"
                  },
                  model: {
                    value: _vm.category.designation,
                    callback: function($$v) {
                      _vm.$set(_vm.category, "designation", $$v)
                    },
                    expression: "category.designation"
                  }
                }),
                _vm._v(" "),
                _c(
                  "span",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.errors.has("designation categorie"),
                        expression: "errors.has('designation categorie')"
                      }
                    ],
                    staticClass: "text-danger text-sm"
                  },
                  [_vm._v(_vm._s(_vm.errors.first("designation categorie")))]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "mt-4" },
                  [
                    _c("label", { staticClass: "vs-input--label" }, [
                      _vm._v("Accessibilité")
                    ]),
                    _vm._v(" "),
                    _c("v-select", {
                      directives: [
                        {
                          name: "validate",
                          rawName: "v-validate",
                          value: "required",
                          expression: "'required'"
                        }
                      ],
                      attrs: {
                        multiple: "",
                        closeOnSelect: false,
                        options: _vm.accessOptions,
                        name: "accessibilite",
                        dir: _vm.$vs.rtl ? "rtl" : "ltr"
                      },
                      model: {
                        value: _vm.category.accessibilite,
                        callback: function($$v) {
                          _vm.$set(_vm.category, "accessibilite", $$v)
                        },
                        expression: "category.accessibilite"
                      }
                    }),
                    _vm._v(" "),
                    _c(
                      "span",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: _vm.errors.has("accessibilite"),
                            expression: "errors.has('accessibilite')"
                          }
                        ],
                        staticClass: "text-danger text-sm"
                      },
                      [_vm._v(_vm._s(_vm.errors.first("accessibilite")))]
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "vs-button",
                  {
                    staticClass: "mt-5 block",
                    attrs: { type: "filled" },
                    on: {
                      click: function($event) {
                        $event.preventDefault()
                        return _vm.submitForm($event)
                      }
                    }
                  },
                  [_vm._v("AJOUTER")]
                )
              ],
              1
            )
          ])
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/views/mesVues/Parametres/Categorie.vue":
/*!*****************************************************************!*\
  !*** ./resources/js/src/views/mesVues/Parametres/Categorie.vue ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Categorie_vue_vue_type_template_id_186c4e1d___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Categorie.vue?vue&type=template&id=186c4e1d& */ "./resources/js/src/views/mesVues/Parametres/Categorie.vue?vue&type=template&id=186c4e1d&");
/* harmony import */ var _Categorie_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Categorie.vue?vue&type=script&lang=js& */ "./resources/js/src/views/mesVues/Parametres/Categorie.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Categorie_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Categorie_vue_vue_type_template_id_186c4e1d___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Categorie_vue_vue_type_template_id_186c4e1d___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/mesVues/Parametres/Categorie.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/mesVues/Parametres/Categorie.vue?vue&type=script&lang=js&":
/*!******************************************************************************************!*\
  !*** ./resources/js/src/views/mesVues/Parametres/Categorie.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Categorie_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Categorie.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/mesVues/Parametres/Categorie.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Categorie_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/mesVues/Parametres/Categorie.vue?vue&type=template&id=186c4e1d&":
/*!************************************************************************************************!*\
  !*** ./resources/js/src/views/mesVues/Parametres/Categorie.vue?vue&type=template&id=186c4e1d& ***!
  \************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Categorie_vue_vue_type_template_id_186c4e1d___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Categorie.vue?vue&type=template&id=186c4e1d& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/mesVues/Parametres/Categorie.vue?vue&type=template&id=186c4e1d&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Categorie_vue_vue_type_template_id_186c4e1d___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Categorie_vue_vue_type_template_id_186c4e1d___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
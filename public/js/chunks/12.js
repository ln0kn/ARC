(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[12],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/mesVues/Parametres/Groupe.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/mesVues/Parametres/Groupe.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      groupe: {
        id: null,
        designation: null
      },
      permissions: {
        "ajustement": {
          "voir": false,
          "ajouter": false,
          "editer": false,
          "supprimer": false
        },
        "corbeille": {
          "voir": false,
          "ajouter": false,
          "editer": false,
          "supprimer": false
        },
        "dossier": {
          "voir": false,
          "ajouter": false,
          "editer": false,
          "supprimer": false
        },
        "message": {
          "voir": false,
          "ajouter": false,
          "editer": false,
          "supprimer": false
        },
        "parametre": {
          "voir": false,
          "ajouter": false,
          "editer": false,
          "supprimer": false
        },
        "planning": {
          "voir": false,
          "ajouter": false,
          "editer": false,
          "supprimer": false
        }
      }
    };
  },
  mounted: function mounted() {
    this.$store.dispatch('getMethod', {
      'where': '/getGroupe'
    });
  },
  computed: {
    listeGroupe: function listeGroupe() {
      return this.$store.state.listeGroupe;
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

          if (_this.groupe.id) {
            _this.$store.dispatch('editMethod', {
              'where': '/editGroupe',
              'groupe': _this.groupe,
              'permissions': _this.permissions
            });
          } else {
            _this.$store.dispatch('addMethod', {
              'where': '/addGroupe',
              'groupe': _this.groupe,
              'permissions': _this.permissions
            });
          }
        } else {// form have errors
        }
      });
    },
    editGroupe: function editGroupe(data) {
      var _this2 = this;

      this.permissions = {
        "ajustement": {
          "voir": false,
          "ajouter": false,
          "editer": false,
          "supprimer": false
        },
        "corbeille": {
          "voir": false,
          "ajouter": false,
          "editer": false,
          "supprimer": false
        },
        "dossier": {
          "voir": false,
          "ajouter": false,
          "editer": false,
          "supprimer": false
        },
        "message": {
          "voir": false,
          "ajouter": false,
          "editer": false,
          "supprimer": false
        },
        "parametre": {
          "voir": false,
          "ajouter": false,
          "editer": false,
          "supprimer": false
        },
        "planning": {
          "voir": false,
          "ajouter": false,
          "editer": false,
          "supprimer": false
        }
      };
      this.groupe.id = data.id;
      this.groupe.designation = data.designation;
      Object.values(data.permission).forEach(function (value, key) {
        _this2.permissions[value.page][value.droit] = value.statut;
      });
    },
    deleteGroupe: function deleteGroupe(data) {
      this.groupe.id = data;
      this.$store.dispatch('deleteMethod', {
        'where': '/deleteGroupe',
        'groupe': this.groupe
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/mesVues/Parametres/Groupe.vue?vue&type=template&id=18118e50&":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/mesVues/Parametres/Groupe.vue?vue&type=template&id=18118e50& ***!
  \***************************************************************************************************************************************************************************************************************************/
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
            "vs-lg": "6",
            "vs-sm": "12",
            "vs-xs": "12"
          }
        },
        [
          _c(
            "vx-card",
            { attrs: { title: "Liste des groupes" } },
            [
              _c(
                "vs-table",
                {
                  attrs: {
                    stripe: "",
                    pagination: "",
                    "max-items": 4,
                    search: "",
                    data: _vm.listeGroupe
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
                                        return _vm.editGroupe(tr)
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
                                        return _vm.deleteGroupe(tr.id)
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
                  _vm._v(
                    "\n                " +
                      _vm._s(_vm.listeGroupe) +
                      "\n                "
                  ),
                  _c(
                    "template",
                    { slot: "thead" },
                    [
                      _c("vs-th", { attrs: { "sort-key": "designation" } }, [
                        _vm._v("Designation")
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
            "vs-lg": "6",
            "vs-sm": "12",
            "vs-xs": "12"
          }
        },
        [
          _c("vx-card", { attrs: { title: "Nouveau groupe" } }, [
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
                    value: _vm.groupe.id,
                    callback: function($$v) {
                      _vm.$set(_vm.groupe, "id", $$v)
                    },
                    expression: "groupe.id"
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
                    label: "Désignation  groupe",
                    placeholder: "La désignation du groupe",
                    name: "designation"
                  },
                  model: {
                    value: _vm.groupe.designation,
                    callback: function($$v) {
                      _vm.$set(_vm.groupe, "designation", $$v)
                    },
                    expression: "groupe.designation"
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
                        value: _vm.errors.has("designation"),
                        expression: "errors.has('designation')"
                      }
                    ],
                    staticClass: "text-danger text-sm"
                  },
                  [_vm._v(_vm._s(_vm.errors.first("designation")))]
                ),
                _vm._v(" "),
                _c("div", { staticClass: "mt-4" }, [
                  _c("div", { staticClass: "block overflow-x-auto" }, [
                    _c(
                      "table",
                      { staticClass: "w-full permissions-table" },
                      [
                        _c(
                          "tr",
                          _vm._l(
                            [
                              "Module",
                              "voir",
                              "ajouter",
                              "editer",
                              "supprimer"
                            ],
                            function(heading) {
                              return _c(
                                "th",
                                {
                                  key: heading,
                                  staticClass:
                                    "font-semibold text-base text-left px-3 py-2"
                                },
                                [_vm._v(_vm._s(heading))]
                              )
                            }
                          ),
                          0
                        ),
                        _vm._v(" "),
                        _vm._l(_vm.permissions, function(val, name) {
                          return _c(
                            "tr",
                            { key: name },
                            [
                              _c("td", { staticClass: "text-center" }, [
                                _vm._v(_vm._s(name))
                              ]),
                              _vm._v(" "),
                              _vm._l(val, function(permission, name) {
                                return _c(
                                  "td",
                                  {
                                    key: name + permission,
                                    staticClass: "px-3 py-2"
                                  },
                                  [
                                    _c("vs-checkbox", {
                                      model: {
                                        value: val[name],
                                        callback: function($$v) {
                                          _vm.$set(val, name, $$v)
                                        },
                                        expression: "val[name]"
                                      }
                                    })
                                  ],
                                  1
                                )
                              })
                            ],
                            2
                          )
                        })
                      ],
                      2
                    )
                  ])
                ]),
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

/***/ "./resources/js/src/views/mesVues/Parametres/Groupe.vue":
/*!**************************************************************!*\
  !*** ./resources/js/src/views/mesVues/Parametres/Groupe.vue ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Groupe_vue_vue_type_template_id_18118e50___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Groupe.vue?vue&type=template&id=18118e50& */ "./resources/js/src/views/mesVues/Parametres/Groupe.vue?vue&type=template&id=18118e50&");
/* harmony import */ var _Groupe_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Groupe.vue?vue&type=script&lang=js& */ "./resources/js/src/views/mesVues/Parametres/Groupe.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Groupe_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Groupe_vue_vue_type_template_id_18118e50___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Groupe_vue_vue_type_template_id_18118e50___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/mesVues/Parametres/Groupe.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/mesVues/Parametres/Groupe.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./resources/js/src/views/mesVues/Parametres/Groupe.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Groupe_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Groupe.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/mesVues/Parametres/Groupe.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Groupe_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/mesVues/Parametres/Groupe.vue?vue&type=template&id=18118e50&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/src/views/mesVues/Parametres/Groupe.vue?vue&type=template&id=18118e50& ***!
  \*********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Groupe_vue_vue_type_template_id_18118e50___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Groupe.vue?vue&type=template&id=18118e50& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/mesVues/Parametres/Groupe.vue?vue&type=template&id=18118e50&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Groupe_vue_vue_type_template_id_18118e50___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Groupe_vue_vue_type_template_id_18118e50___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
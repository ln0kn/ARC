(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/mesVues/Dossier.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/mesVues/Dossier.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-perfect-scrollbar */ "./node_modules/vue-perfect-scrollbar/dist/index.js");
/* harmony import */ var vue_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue_select__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-select */ "./node_modules/vue-select/dist/vue-select.js");
/* harmony import */ var vue_select__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue_select__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vuejs_datepicker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vuejs-datepicker */ "./node_modules/vuejs-datepicker/dist/vuejs-datepicker.esm.js");
/* harmony import */ var _axios_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../axios.js */ "./resources/js/src/axios.js");
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
      file: [],
      pieces: [],
      dossier: {
        designation: null,
        categorie: null,
        dateRappel: '',
        motifRappel: ''
      },
      settings: {
        // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: .60
      },
      sessionsData: {},
      chatLog: [],
      chatMsgInput: '',
      customersData: {}
    };
  },
  mounted: function mounted() {
    this.$store.dispatch('getMethod', {
      'where': '/getDossier'
    }), this.$store.dispatch('getMethod', {
      'where': '/getCategorie'
    });
  },
  computed: {
    listeDossier: function listeDossier() {
      return this.$store.state.listeDossier;
    },
    categorieOptions: function categorieOptions() {
      var obj = [];
      Object.values(this.$store.state.listeCategorie).forEach(function (key) {
        obj.push({
          id: key.id,
          label: key.designation
        });
      });
      return obj;
    }
  },
  methods: {
    submitForm: function submitForm(event) {
      var _this = this;

      this.$validator.validateAll().then(function (result) {
        if (result) {
          _this.$vs.loading({
            type: 'radius',
            container: '.form-loading',
            scale: 1.2
          });

          var formData = null;
          var config = {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          };
          formData = new FormData();

          for (var i = 0; i < _this.file.length; i++) {
            formData.append('files[]', _this.file[i]);
          }

          formData.append('designation', _this.dossier.designation);
          formData.append('categorie', _this.dossier.categorie.id);
          formData.append('dateRappel', _this.dossier.dateRappel);
          formData.append('motifRappel', _this.dossier.motifRappel);
          console.log(_this.file);

          if (_this.dossier.id) {
            for (var j = 0; j < _this.pieces.length; j++) {
              console.log(_this.pieces[j]);
              formData.append('pieces[]', _this.pieces[j].nomPiece);
            }

            formData.append('id', _this.dossier.id);
            _axios_js__WEBPACK_IMPORTED_MODULE_3__["default"].post('/editDossier', formData).then(function (res) {
              if (!res.data.fail) {
                _this.$vs.notify({
                  title: 'succès',
                  text: 'Opération réussie',
                  color: 'success',
                  time: 5000,
                  position: 'top-right',
                  icon: 'query_builder'
                });

                _this.$store.dispatch('getMethod', {
                  'where': '/getDossier'
                }), _this.dossier.id = null;
                _this.dossier.designation = null;
                _this.dossier.categorie = null;
                _this.dossier.dateRappel = '';
                _this.dossier.motifRappel = '';
                _this.file = [];
                _this.pieces = [];

                _this.$store.dispatch('getMethod', {
                  'where': '/getRappel'
                });
              } else {
                for (var item in res.data.errors) {
                  for (var k in res.data.errors[item]) {
                    _this.$vs.notify({
                      title: 'Attention',
                      text: res.data.errors[item][k],
                      color: 'warning',
                      time: 5000,
                      position: 'top-right',
                      icon: 'query_builder'
                    });
                  }
                }
              }
            }).catch(function (err) {
              alert(err);
            }).finally(function () {
              _this.$vs.loading.close('.form-loading > .con-vs-loading');
            });
          } else {
            //                            axios.post('/editDossier', formData)
            _axios_js__WEBPACK_IMPORTED_MODULE_3__["default"].post('/addDossier', formData).then(function (res) {
              if (!res.data.fail) {
                _this.$vs.notify({
                  title: 'succès',
                  text: 'Opération réussie',
                  color: 'success',
                  time: 5000,
                  position: 'top-right',
                  icon: 'query_builder'
                });

                _this.$store.dispatch('getMethod', {
                  'where': '/getDossier'
                }), _this.$store.dispatch('getMethod', {
                  'where': '/getRappel'
                });
                _this.dossier.designation = null;
                _this.dossier.categorie = null;
                _this.dossier.dateRappel = '';
                _this.dossier.motifRappel = '';
                _this.file = [];
                _this.pieces = [];
                console.log(_this.file);
              } else {
                for (var item in res.data.errors) {
                  for (var k in res.data.errors[item]) {
                    _this.$vs.notify({
                      title: 'Attention',
                      text: res.data.errors[item][k],
                      color: 'warning',
                      time: 5000,
                      position: 'top-right',
                      icon: 'query_builder'
                    });
                  }
                }
              }
            }).catch(function (err) {
              alert(err);
            }).finally(function () {
              _this.$vs.loading.close('.form-loading > .con-vs-loading');
            });
          }
        } else {// form have errors
        }
      });
    },
    onSelectFile: function onSelectFile(e) {
      var _this2 = this;

      Object.values(e.target.files).forEach(function (value, key) {
        _this2.pieces.push({
          nomPiece: value.name
        });

        _this2.file.push(value);
      });
    },
    editData: function editData(data) {
      this.dossier.categorie = {
        id: data.categorie.id,
        label: data.categorie.designation
      };
      this.dossier.id = data.id;
      this.dossier.designation = data.nom;
      this.dossier.motifRappel = '';
      this.dossier.dateRappel = '';

      if (data.rappel) {
        this.dossier.motifRappel = data.rappel.motif;
        this.dossier.dateRappel = data.rappel.date;
      } //                var tab = [];
      //                Object.values(data.pieces).forEach((value, key) => {
      //                    tab[key] = value.nomPiece
      ////                    console.log(value.nomPiece)
      ////                    console.log(key)
      ////                    this.pieces.push(value.nomPiece)
      ////                    this.file.push(value)
      //                })
      //                console.log(tab)


      this.pieces = data.pieces;
    },
    deleteFile: function deleteFile(data) {
      this.$delete(this.pieces, data);
      this.$delete(this.file, data);
    },
    displayFile: function displayFile(data) {
      Object(_axios_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
        url: '/displayDossier?id=' + data.nomPiece,
        method: "GET",
        responseType: 'arraybuffer'
      }).then(function (response) {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.setAttribute('download', data.nomPiece);
        document.body.appendChild(fileLink);
        fileLink.click();
      });
    } // deleteData: function(data) {
    //     this.dossier.id = data
    //     this.$store.dispatch('deleteMethod', {
    //         'where': '/deleteDossier',
    //         'groupe': this.dossier,
    //     })
    //     this.$store.dispatch('getMethod', {
    //         'where': '/getRappel'
    //     })
    // }

  },
  components: {
    VuePerfectScrollbar: vue_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_0___default.a,
    'v-select': vue_select__WEBPACK_IMPORTED_MODULE_1___default.a,
    Datepicker: vuejs_datepicker__WEBPACK_IMPORTED_MODULE_2__["default"]
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/mesVues/Dossier.vue?vue&type=template&id=fb1ad0ac&":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/mesVues/Dossier.vue?vue&type=template&id=fb1ad0ac& ***!
  \*****************************************************************************************************************************************************************************************************************/
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
    { attrs: { "vs-justify": "center" } },
    [
      _c(
        "vs-col",
        { staticClass: "pr-5", attrs: { type: "flex", "vs-w": "6" } },
        [
          _c(
            "vx-card",
            { attrs: { title: "La liste des dossiers " } },
            [
              _c(
                "vs-table",
                {
                  attrs: {
                    stripe: "",
                    pagination: "",
                    "max-items": 5,
                    search: "",
                    data: _vm.listeDossier
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
                                { attrs: { data: data[indextr].nom } },
                                [
                                  _vm._v(
                                    "\n                            " +
                                      _vm._s(data[indextr].nom) +
                                      "\n                        "
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "vs-td",
                                { attrs: { data: data[indextr].id } },
                                [
                                  _c("feather-icon", {
                                    attrs: {
                                      icon: "EditIcon",
                                      svgClasses:
                                        "w-5 h-5 hover:text-primary stroke-current"
                                    },
                                    on: {
                                      click: function($event) {
                                        return _vm.editData(tr)
                                      }
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c("feather-icon", {
                                    staticClass: "ml-2",
                                    attrs: {
                                      icon: "TrashIcon",
                                      svgClasses:
                                        "w-5 h-5 hover:text-danger stroke-current"
                                    },
                                    on: {
                                      click: function($event) {
                                        $event.stopPropagation()
                                        return _vm.deleteData(tr.id)
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
                      _c("vs-th", { attrs: { "sort-key": "nom" } }, [
                        _vm._v("designation")
                      ]),
                      _vm._v(" "),
                      _c("vs-th")
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
        { staticClass: "pr-5", attrs: { type: "flex", "vs-w": "6" } },
        [
          _c("vx-card", { attrs: { title: "Nouveau dossier" } }, [
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
                    value: _vm.dossier.id,
                    callback: function($$v) {
                      _vm.$set(_vm.dossier, "id", $$v)
                    },
                    expression: "dossier.id"
                  }
                }),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "vx-row" },
                  [
                    _c(
                      "div",
                      { staticClass: "vx-col w-full sm:w-1/2 md:w-1/2 " },
                      [
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
                            label: "Désignation dossier",
                            placeholder: "Désignation du dossier",
                            name: "designation dossier"
                          },
                          model: {
                            value: _vm.dossier.designation,
                            callback: function($$v) {
                              _vm.$set(_vm.dossier, "designation", $$v)
                            },
                            expression: "dossier.designation"
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
                                value: _vm.errors.has("designation dossier"),
                                expression: "errors.has('designation dossier')"
                              }
                            ],
                            staticClass: "text-danger text-sm"
                          },
                          [
                            _vm._v(
                              _vm._s(_vm.errors.first("designation dossier"))
                            )
                          ]
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "vx-col w-full sm:w-1/2 md:w-1/2" },
                      [
                        _c("label", { staticClass: "vs-input--label" }, [
                          _vm._v("Catégorie dossier")
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
                            options: _vm.categorieOptions,
                            name: "catégorie dossier",
                            dir: _vm.$vs.rtl ? "rtl" : "ltr"
                          },
                          model: {
                            value: _vm.dossier.categorie,
                            callback: function($$v) {
                              _vm.$set(_vm.dossier, "categorie", $$v)
                            },
                            expression: "dossier.categorie"
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
                                value: _vm.errors.has("catégorie dossier"),
                                expression: "errors.has('catégorie dossier')"
                              }
                            ],
                            staticClass: "text-danger text-sm"
                          },
                          [
                            _vm._v(
                              _vm._s(_vm.errors.first("catégorie dossier"))
                            )
                          ]
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "vx-col w-full sm:w-1/2 md:w-1/2" },
                      [
                        _c(
                          "div",
                          { staticClass: "mt-5" },
                          [
                            _c("label", { staticClass: "vs-input--label" }, [
                              _vm._v("Créer un rappel")
                            ]),
                            _vm._v(" "),
                            _c("datepicker", {
                              model: {
                                value: _vm.dossier.dateRappel,
                                callback: function($$v) {
                                  _vm.$set(_vm.dossier, "dateRappel", $$v)
                                },
                                expression: "dossier.dateRappel"
                              }
                            })
                          ],
                          1
                        )
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "vx-col w-full sm:w-1/2 md:w-1/2" },
                      [
                        _c(
                          "div",
                          { staticClass: "mt-5" },
                          [
                            _c("vs-input", {
                              staticClass: "w-full",
                              attrs: {
                                label: "Motif du rappel",
                                placeholder: "Motif de l alerte"
                              },
                              model: {
                                value: _vm.dossier.motifRappel,
                                callback: function($$v) {
                                  _vm.$set(_vm.dossier, "motifRappel", $$v)
                                },
                                expression: "dossier.motifRappel"
                              }
                            })
                          ],
                          1
                        )
                      ]
                    ),
                    _vm._v(" "),
                    _c("div", { staticClass: "vx-col w-full" }, [
                      _c("div", { staticClass: "mt-5" }, [
                        _c("input", {
                          staticClass: "custom-file-input",
                          attrs: {
                            type: "file",
                            id: "example-file-multiple-input-custom",
                            name: "example-file-multiple-input-custom",
                            "data-toggle": "custom-file-input",
                            multiple: ""
                          },
                          on: { change: _vm.onSelectFile }
                        })
                      ])
                    ]),
                    _vm._v(" "),
                    _c(
                      "vx-card",
                      { attrs: { title: "Pièces" } },
                      [
                        _c("template", { slot: "no-body" }, [
                          _c(
                            "div",
                            { staticClass: "chat-card-log" },
                            [
                              _c(
                                "VuePerfectScrollbar",
                                {
                                  key: _vm.$vs.rtl,
                                  ref: "chatLogPS",
                                  staticClass: "scroll-area px-6",
                                  attrs: { settings: _vm.settings }
                                },
                                [
                                  _c(
                                    "ul",
                                    { staticClass: "faq-topics mt-4" },
                                    _vm._l(_vm.pieces, function(piece, i) {
                                      return _c(
                                        "li",
                                        {
                                          key: i,
                                          staticClass:
                                            "p-2 font-medium flex items-center",
                                          on: {
                                            click: function($event) {
                                              _vm.faqFilter = _vm.category.id
                                            }
                                          }
                                        },
                                        [
                                          _c("feather-icon", {
                                            attrs: {
                                              icon: "TrashIcon",
                                              svgClasses:
                                                "w-5 h-5 hover:text-danger  cursor-pointer"
                                            },
                                            on: {
                                              click: function($event) {
                                                $event.stopPropagation()
                                                return _vm.deleteFile(i)
                                              }
                                            }
                                          }),
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "cursor-pointer ml-5",
                                              on: {
                                                click: function($event) {
                                                  $event.stopPropagation()
                                                  return _vm.displayFile(piece)
                                                }
                                              }
                                            },
                                            [_vm._v(_vm._s(piece.nomPiece))]
                                          )
                                        ],
                                        1
                                      )
                                    }),
                                    0
                                  )
                                ]
                              )
                            ],
                            1
                          )
                        ])
                      ],
                      2
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

/***/ "./resources/js/src/views/mesVues/Dossier.vue":
/*!****************************************************!*\
  !*** ./resources/js/src/views/mesVues/Dossier.vue ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Dossier_vue_vue_type_template_id_fb1ad0ac___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dossier.vue?vue&type=template&id=fb1ad0ac& */ "./resources/js/src/views/mesVues/Dossier.vue?vue&type=template&id=fb1ad0ac&");
/* harmony import */ var _Dossier_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Dossier.vue?vue&type=script&lang=js& */ "./resources/js/src/views/mesVues/Dossier.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Dossier_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Dossier_vue_vue_type_template_id_fb1ad0ac___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Dossier_vue_vue_type_template_id_fb1ad0ac___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/mesVues/Dossier.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/mesVues/Dossier.vue?vue&type=script&lang=js&":
/*!*****************************************************************************!*\
  !*** ./resources/js/src/views/mesVues/Dossier.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Dossier_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Dossier.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/mesVues/Dossier.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Dossier_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/mesVues/Dossier.vue?vue&type=template&id=fb1ad0ac&":
/*!***********************************************************************************!*\
  !*** ./resources/js/src/views/mesVues/Dossier.vue?vue&type=template&id=fb1ad0ac& ***!
  \***********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Dossier_vue_vue_type_template_id_fb1ad0ac___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Dossier.vue?vue&type=template&id=fb1ad0ac& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/mesVues/Dossier.vue?vue&type=template&id=fb1ad0ac&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Dossier_vue_vue_type_template_id_fb1ad0ac___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Dossier_vue_vue_type_template_id_fb1ad0ac___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
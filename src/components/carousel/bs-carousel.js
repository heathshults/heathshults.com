// /* eslint wrap-iife: "off", vars-on-top: "off", no-empty: "off", one-var: "off", no-multi-assign: "off", complexity: "off" */
// BootstrapTable > bsCarousel
// columns > items
// column > item

(function ($) {
  'use strict'

  // TOOLS DEFINITION
  // ======================
  
  var bootstrapVersion = 4
  try {
    bootstrapVersion = parseInt($.fn.dropdown.Constructor.VERSION, 10)
  } catch (e) { }
  var bs = {
    3: {
      buttonsClass: 'btn btn-primary',
      iconsPrefix: 'fa',
      icons: {
        crslPageIndicators: 'carousel-indicators',
        crsLeftNavBtn: 'fa-chevron-left',
        crsRightNavBtn: 'fa-chevron-right',
        // paginationSwitchDown: 'fa-chevron-down',
        // paginationSwitchUp: 'fa-chevron-up',
        // refresh: 'fa-refresh',
        // toggle: 'fa-list-alt',
        // columns: 'fa-th',
        // detailOpen: 'fa-plus',
        // detailClose: 'fa-minus',
        nextRight: 'icon-next',
          prevLeft: 'icon-prev'
      },
      pullClass: 'pull',
      slideTransClass: 'slide',
      // toobarDropdowHtml: ['<ul class="dropdown-menu" role="menu">', '</ul>'],
      // toobarDropdowItemHtml: '<li role="menuitem"><label>%s</label></li>',
      // pageDropdownHtml: ['<ul class="dropdown-menu" role="menu">', '</ul>'],
      // pageDropdownItemHtml: '<li role="menuitem" class="%s"><a href="#">%s</a></li>'
    },
    4: {
      buttonsClass: 'btn btn-primary',
      iconsPrefix: 'fa',
      icons: {
        crslPageIndicators: 'carousel-indicators',
        crsLeftNavBtn: 'fa-chevron-left',
        crsRightNavBtn: 'fa-chevron-right',
        // TODO: delete unneeded bs-caroulsel icons
        // paginationSwitchDown: 'fa-toggle-down',
        // paginationSwitchUp: 'fa-toggle-up',
        // refresh: 'fa-refresh',
        // toggle: 'fa-toggle-on',
        items: 'fa-th-list',
        // detailOpen: 'fa-plus',
        // detailClose: 'fa-minus',
        searchIcon: 'fa-search',
        nextRight: 'icon-next',
        prevLeft: 'icon-prev',
      },
      crslItemHTML: '',
      // pullClass: 'float',
      // pullClass01: 'align-self',
      // formFieldIconClass: 'input-group-addon',
      // toobarDropdowHtml: ['<div class="keep-open dropdown-menu dropdown-menu-right">', '</div>'],
      // toobarDropdowItemHtml: '<label class="dropdown-item">%s</label>',
      // pageDropdownHtml: ['<div class="dropdown-menu" aria-labelledby="pagiDDMBtn">', '</div>'],
      // pageDropdownHtml01: ['<div class="up"><div class="updrop dropdown-menu" aria-labelledby="pageDetail" style="position: absolute; top: -190px;">', '</div></div>'],
      // pageDropdownItemHtml: '<a class="dropdown-item %s" href="#">%s</a>',
      searchIconhtml: '<span class="%s"></span>'
    }
  }[bootstrapVersion]

  // var cachedWidth = null

  // it only does '%s', and return '' when arguments are undefined
  var sprintf = function (str) {
    var args = arguments,
      flag = true,
      i = 1

    str = str.replace(/%s/g, () => {
      var arg = args[i++]

      if (typeof arg === 'undefined') {
        flag = false
        return ''
      }
      return arg
    })
    return flag ? str : ''
  }

  var getPropertyFromOther = function (list, from, to, value) {
    var result = ''
    $.each(list, (i, item) => {
      if (item[from] === value) {
        result = item[to]
        return false
      }
      return true
    })
    return result
  }

  var getFieldIndex = function (items, field) {
    var index = -1

    $.each(items, (i, item) => {
      if (item.field === field) {
        index = i
        return false
      }
      return true
    })
    return index
  }

  // http://jsfiddle.net/wenyi/47nz7ez9/3/
  var setFieldIndex = function (items) {
    var i, j, k,
      totalItems = 0,
      flag = []

    for (i = 0; i < items[0].length; i++) {
      totalItems += items[0][i] || 1
    }

    for (i = 0; i < items.length; i++) {
      flag[i] = []
      for (j = 0; j < totalItems; j++) {
        flag[i][j] = false
      }
    }

    for (i = 0; i < items.length; i++) {
      for (j = 0; j < items[i].length; j++) {
        var r = items[i][j],
          rowspan = r.rowspan || 1,
          colspan = r.colspan || 1,
          index = $.inArray(false, flag[i])

        if (colspan === 1) {
          r.fieldIndex = index
          // when field is undefined, use index instead
          if (typeof r.field === 'undefined') {
            r.field = index
          }
        }

        for (k = 0; k < rowspan; k++) {
          flag[i + k][index] = true
        }
        for (k = 0; k < colspan; k++) {
          flag[i][index + k] = true
        }
      }
    }
  }

  var calculateObjectValue = function (self, name, args, defaultValue) {
    var func = name

    if (typeof name === 'string') {
      // support obj.func1.func2
      var names = name.split('.')

      if (names.length > 1) {
        func = window
        $.each(names, (i, f) => {
          func = func[f]
        })
      } else {
        func = window[name]
      }
    }
    if (typeof func === 'object') {
      return func
    }
    if (typeof func === 'function') {
      return func.apply(self, args || [])
    }
    if (!func && typeof name === 'string' && sprintf.apply(this, [name].concat(args))) {
      return sprintf.apply(this, [name].concat(args))
    }
    return defaultValue
  }

  var compareObjects = function (objectA, objectB, compareLength) {
    // Create arrays of property names
    var objectAProperties = Object.getOwnPropertyNames(objectA),
      objectBProperties = Object.getOwnPropertyNames(objectB),
      propName = ''

    if (compareLength) {
      // If number of properties is different, objects are not equivalent
      if (objectAProperties.length !== objectBProperties.length) {
        return false
      }
    }

    for (var i = 0; i < objectAProperties.length; i++) {
      propName = objectAProperties[i]

      // If the property is not in the object B properties, continue with the next property
      if ($.inArray(propName, objectBProperties) > -1) {
        // If values of same property are not equal, objects are not equivalent
        if (objectA[propName] !== objectB[propName]) {
          return false
        }
      }
    }

    // If we made it this far, objects are considered equivalent
    return true
  }

  var escapeHTML = function (text) {
    if (typeof text === 'string') {
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
        .replace(/`/g, '&#x60;')
    }
    return text
  }

  var getRealDataAttr = function (dataAttr) {
    for (var attr in dataAttr) {
      var auxAttr = attr.split(/(?=[A-Z])/).join('-').toLowerCase()
      if (auxAttr !== attr) {
        dataAttr[auxAttr] = dataAttr[attr]
        delete dataAttr[attr]
      }
    }

    return dataAttr
  }

  var getItemField = function (item, field, escape) {
    var value = item

    if (typeof field !== 'string' || item.hasOwnProperty(field)) {
      return escape ? escapeHTML(item[field]) : item[field]
    }
    var props = field.split('.')
    for (var p in props) {
      if (props.hasOwnProperty(p)) {
        value = value && value[props[p]]
      }
    }
    return escape ? escapeHTML(value) : value
  }

  var isIEBrowser = function () {
    return !!(navigator.userAgent.indexOf("MSIE ") > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))
  }

  var objectKeys = function () {
    // From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
    if (!Object.keys) {
      Object.keys = (function () {
        var hasOwnProperty = Object.prototype.hasOwnProperty,
          hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
          dontEnums = [
            'toString',
            'toLocaleString',
            'valueOf',
            'hasOwnProperty',
            'isPrototypeOf',
            'propertyIsEnumerable',
            'constructor'
          ],
          dontEnumsLength = dontEnums.length

        return function (obj) {
          if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
            throw new TypeError('Object.keys called on non-object')
          }

          var result = [], prop, i

          for (prop in obj) {
            if (hasOwnProperty.call(obj, prop)) {
              result.push(prop)
            }
          }

          if (hasDontEnumBug) {
            for (i = 0; i < dontEnumsLength; i++) {
              if (hasOwnProperty.call(obj, dontEnums[i])) {
                result.push(dontEnums[i])
              }
            }
          }
          return result
        }
      }())
    }
  }

  // BOOTSTRAP caroulsel CLASS DEFINITION
  // ======================

  var bsCarousel = function (el, options) {
    this.options = options
    this.$el = $(el)
    this.$el_ = this.$el.clone()
    this.timeoutId_ = 0
    // this.timeoutFooter_ = 0

    this.init()
  }

  bsCarousel.DEFAULTS = {
    // interval Specifies the delay (in milliseconds) between each slide.
    // Note: Set interval to false to stop the items from automatically sliding
    interval: 5000, // number or false
    // Pauses the carousel from going through the next slide when the mouse pointer enters the carousel, and resumes the sliding when the mouse pointer leaves the carousel
    // Note: Set pause to false to stop the ability to pause on hover
    pause: "hover", // string r the boolean false
    // wrap Specifies whether the carousel should go through all slides continuously, or stop at the last slide
    // true - cycle continuously
    // false - stop at the last item
    wrap: true, // boolean
    classes: 'crslInstance carousel carousel-hover',
    sortClass: undefined,
    locale: undefined,
    height: undefined,
    undefinedText: '-',
    items: [[]],
    data: [],
    totalField: 'total',
    dataField: 'rows',
    method: 'get',
    url: undefined,
    ajax: undefined,
    cache: true,
    contentType: 'application/json',
    dataType: 'json',
    ajaxOptions: {},
    queryParams(params) {
      return params
    },
    queryParamsType: 'limit', // undefined
    responseHandler(res) {
      return res
    },
    // pagination: false,
    // onlyInfoPagination: false,
    // paginationLoop: true,
    // sidePagination: 'client', // client or server
    // totalRows: 0, // server side need to set
    // pageNumber: 1,
    // pageSize: 10,
    // pageList: [10, 25, 50, 100],
    // paginationHAlign: 'right', // left, right
    // paginationVAlign: 'bottom', // bottom, top, both
    // paginationHAlign01: 'end', // start, end
    // paginationDetailHAlign: 'left', // left, right
    // paginationDetailHAlign01: 'start', // start, end
    // paginationPreText: '&lsaquo;',
    // paginationNextText: '&rsaquo;',
    // search: true,
    // searchOnEnterKey: false,
    // strictSearch: false,
    // searchAlign: 'right', // right, left
    // searchAlign01: 'end', // start, ZZend
    // selectItemName: 'btSelectItem',
    showcaroulselInner: true,
    // showFooter: false,
    showitems: false,
    // showPaginationSwitch: false,
    // showRefresh: false,
    // showToggle: false,
    // buttonsAlign: 'right', // right, left
    // buttonsAlign01: 'end', // right, left
    smartDisplay: true,
    // escape: false,
    minimumCountitems: 1,
    idField: undefined,
    uniqueId: undefined,
    // cardView: false,
    detailView: false,
    detailFormatter(index, row) {
      return ''
    },
    detailFilter(index, row) {
      return true
    },
    // trimOnSearch: true,
    // clickToSelect: false,
    // singleSelect: false,
    // toolbar: undefined,
    // toolbarAlign: 'right', // right, left
    // toolbarAlign01: 'end', // end, start
    // checkboxcaroulselInner: true,
    sortCarousel: true,
    silentSort: true,
    // maintainSelected: false,
    // searchTimeOut: 500,
    // searchText: '',
    iconSize: undefined,
    buttonsClass: 'clearWhite',
    iconsPrefix: 'fa', // glyphicon or fa (font awesome)
    icons: {
      paginationSwitchDown: 'fa-chevron-down',
      paginationSwitchUp: 'fa-chevron-up',
      refresh: 'fa-refresh',
      toggle: 'fa-toggle-on',
      items: 'fa-filter',
      detailOpen: 'fa-plus',
      detailClose: 'fa-minus'
    },
    customSearch: $.noop,

    customSort: $.noop,

    // rowStyle(row, index) {
    //   return {}
    // },
    // rowAttributes(row, index) {
    //   return {}
    // },
    // footerStyle(row, index) {
    //   return {}
    // },
    onAll(name, args) {
      return false
    },
    // onClickCell(field, value, row, $element) {
    //   return false
    // },
    // onDblClickCell(field, value, row, $element) {
    //   return false
    // },
    // onClickRow(item, $element) {
    //   return false
    // },
    // onDblClickRow(item, $element) {
    //   return false
    // },
    onSort(name, order) {
      return false
    },
    // onCheck(row) {
    //   return false
    // },
    // onUncheck(row) {
    //   return false
    // },
    // onCheckAll(rows) {
    //   return false
    // },
    // onUncheckAll(rows) {
    //   return false
    // },
    // onCheckSome(rows) {
    //   return false
    // },
    // onUncheckSome(rows) {
    //   return false
    // },
    onLoadSuccess(data) {
      return false
    },
    onLoadError(status) {
      return false
    },
    // onitemSwitch(field, checked) {
    //   return false
    // },
    onPageChange(number, size) {
      return false
    },
    // onSearch(text) {
    //   return false
    // },
    // onToggle(cardView) {
    //   return false
    // },
    onPreBody(data) {
      return false
    },
    onPostBody() {
      return false
    },
    onPostcaroulselInner() {
      return false
    },
    // onExpandRow(index, row, $detail) {
    //   return false
    // },
    // onCollapseRow(index, row) {
    //   return false
    // },
    // onRefreshOptions(options) {
    //   return false
    // },
    // onRefresh(params) {
    //   return false
    // },
    // onResetView() {
    //   return false
    // },
    statusChanger() {
      return false
    }
  }

  bsCarousel.LOCALES = {}

  bsCarousel.LOCALES['en-US'] = bsCarousel.LOCALES.en = {
    formatLoadingMessage() {
      return 'Loading, please wait...'
    },
    formatRecordsPerPage(pageNumber) {
      return sprintf('%s rows per page</span>', pageNumber)
    },
    formatShowingRows(pageFrom, pageTo, totalRows) {
      return sprintf('Showing %s to %s of %s rows ', pageFrom, pageTo, totalRows)
    },
    formatDetailPagination(totalRows) {
      return sprintf('Showing %s rows ', totalRows)
    },
    formatSearch() {
      return 'Search for...'
    },
    formatNoMatches() {
      return 'No matching records found'
    },
    formatPaginationSwitch() {
      return 'Hide/Show pagination'
    },
    formatRefresh() {
      return 'Refresh'
    },
    formatToggle() {
      return 'Toggle'
    },
    formatitems() {
      return 'items'
    },
    formatAllRows() {
      return 'All'
    }
  }

  $.extend(bsCarousel.DEFAULTS, bsCarousel.LOCALES['en-US'])

  bsCarousel.item_DEFAULTS = {
    // radio: false,
    // checkbox: false,
    // checkboxEnabled: true,
    field: undefined,
    title: undefined,
    itemCaptionTooltip: undefined,
    'class': undefined,
    // align: undefined, // left, right, center
    // halign: undefined, // left, right, center
    // falign: undefined, // left, right, center
    // valign: undefined, // top, middle, bottom
    width: undefined,
    sortCarousel: false,
    order: 'asc', // asc, desc
    visible: true,
    switchable: true,
    // clickToSelect: true,
    formatter: undefined,
    footerFormatter: undefined,
    events: undefined,
    sorter: undefined,
    sortName: undefined,
    // cellStyle: undefined,
    // search: true,
    // searchOnEnterKey: true,
    // trimOnSearch: true,
    // searchable: true,
    // searchFormatter: true,
    // cardVisible: true,
    // escape: false
  }

  bsCarousel.EVENTS = {
    'slide.bs.carousel': '', // occurs when the arousel is about to slide from one item to another
    'slide.bs.carousel': '', // occurs when the carousel has finished sliding from one item to anoher
    // TODO: delete uneeded events
    'all.bs.carousel': 'onAll',
    // 'click-cell.bs.carousel': 'onClickCell',
    // 'dbl-click-cell.bs.carousel': 'onDblClickCell',
    // 'click-row.bs.carousel': 'onClickRow',
    // 'dbl-click-row.bs.carousel': 'onDblClickRow',
    // 'sort.bs.carousel': 'onSort',
    // 'check.bs.carousel': 'onCheck',
    // 'uncheck.bs.carousel': 'onUncheck',
    // 'check-all.bs.carousel': 'onCheckAll',
    // 'uncheck-all.bs.carousel': 'onUncheckAll',
    // 'check-some.bs.carousel': 'onCheckSome',
    // 'uncheck-some.bs.carousel': 'onUncheckSome',
    'load-success.bs.carousel': 'onLoadSuccess',
    'load-error.bs.carousel': 'onLoadError',
    // 'item-switch.bs.carousel': 'onitemSwitch',
    'page-change.bs.carousel': 'onPageChange'//,
    // 'search.bs.carousel': 'onSearch',
    // 'toggle.bs.carousel': 'onToggle',
    // 'pre-body.bs.carousel': 'onPreBody',
    // 'post-body.bs.carousel': 'onPostBody',
    // 'post-caroulselInner.bs.carousel': 'onPostcaroulselInner',
    // 'expand-row.bs.carousel': 'onExpandRow',
    // 'collapse-row.bs.carousel': 'onCollapseRow',
    // 'refresh-options.bs.carousel': 'onRefreshOptions',
    // 'reset-view.bs.carousel': 'onResetView',
    // 'refresh.bs.carousel': 'onRefresh'
  }

  bsCarousel.prototype.init = function () {
    this.initLocale()
    this.initContainer()
    this.initCarousel()
    this.initCaroulselInner()
    this.initData()
    // this.initHiddenRows()
    // this.initFooter()
    // this.initToolbar()
    // this.initPagination()
    // this.initBody()
    // this.initSearchText()
    // this.initServer()
  }

  bsCarousel.prototype.initLocale = function () {
    if (this.options.locale) {
      var parts = this.options.locale.split(/-|_/)
      parts[0].toLowerCase()
      if (parts[1]) parts[1].toUpperCase()
      if ($.fn.bsCarousel.locales[this.options.locale]) {
        // locale as requested
        $.extend(this.options, $.fn.bsCarousel.locales[this.options.locale])
      } else if ($.fn.bsCarousel.locales[parts.join('-')]) {
        // locale with sep set to - (in case original was specified with _)
        $.extend(this.options, $.fn.bsCarousel.locales[parts.join('-')])
      } else if ($.fn.bsCarousel.locales[parts[0]]) {
        // short locale language code (i.e. 'en')
        $.extend(this.options, $.fn.bsCarousel.locales[parts[0]])
      }
    }
  }

  bsCarousel.prototype.initContainer = function () {
    this.$container = $([
      '<div class="carousel slide" data-ride="carousel">',
      // '<ol id="crslIndicators" class="carousel-indicators"></ol>',
      '<ol id="" class="carousel-indicators" style="clear:both;"></ol>'
      '<div class="carousel-inner" role="listbox">',
      '<div class="item-zone"></div>',
      '<div class="carousel-loading">',
      this.options.formatLoadingMessage(),
      '</div>',
      this.options.paginationVAlign === 'bottom' || this.options.paginationVAlign === 'both'
        ? '<ol class="carousel-indicators"></ol>'
        : '',
      '</div>',
      '</div>'
    ].join(''))

    this.$container.insertAfter(this.$el)
    this.$carouselContainer = this.$container.find('.carousel slide')
    this.$carouselIndicators = this.$container.find('.carousel-indicators')
    this.$carouselCarouselInner = this.$container.find('.carousel-inner')
    this.$carouselItemZone = this.$container.find('.item-zone')
    this.$carouselItem = this.$container.find('.item')
    this.$carouselLoading = this.$container.find('.carousel-loading')
    this.$carouselCaption = this.$container.find('.carousel-caption')
    this.$carouselNavLeft = this.$container.find('.left .carousel-control')
    this.$carouselNavRight = this.$container.find('.right .carousel-control')
    // this.$toolbar = this.$container.find('.carousel-toolbar')

    this.$carouselCarouselInner.append(this.$el)
    this.$container.after('<div class="clearfix"></div>')

    this.$el.addClass(this.options.classes)
    if (this.options.striped) {
      this.$el.addClass('carousel-striped')
    }
    if ($.inArray('carousel-no-bordered', this.options.classes.split(' ')) !== -1) {
      this.$carouselContainer.addClass('carousel-no-bordered')
    }
  }

  bsCarousel.prototype.initCarousel = function () {
    var that = this,
      items = [],
      data = []

    this.$caroulselInner = this.$el.find('.carousel-inner')
    if (!this.$caroulselInner.length) {
      this.$caroulselInner = $('<span class="delete-me-heathen" hidden></span>').appendTo(this.$el)
    }
    this.$caroulselInner.find('div.item-zone').each(function () {
      var item = []

      $(this).find('.item').each(function () {
        // Fix #2014 - getFieldIndex and elsewhere assume this is string, causes issues if not
        if (typeof $(this).data('field') !== 'undefined') {
          $(this).data('field', $(this).data('field') + '')
        }
        item.push($.extend({}, {
          itemImage: $(this).html(),
          class: $(this).attr('class'),
          itemCaption: $(this).html(),
          itemCaptionTooltip: $(this).attr('title')
        }, $(this).data()))
      })
      items.push(item)
    })
    if (!$.isArray(this.options.items[0])) {
      this.options.items = [this.options.items]
    }
    this.options.items = $.extend(true, [], items, this.options.items)
    this.items = []
    this.fieldsitemsIndex = []

    setFieldIndex(this.options.items)
    $.each(this.options.items, (i, items) => {
      $.each(items, function (j, item) {
        item = $.extend({}, bsCarousel.item_DEFAULTS, item)

        if (typeof item.fieldIndex !== 'undefined') {
          that.items[item.fieldIndex] = item
          that.fieldsitemsIndex[item.field] = item.fieldIndex
        }

        that.options.items[i][j] = item
      })
    })

    // if options.data is setting, do not process tbody data
    if (this.options.data.length) {
      return
    }

    // var m = []
    // this.$el.find('>tbody>tr').each(function (y) {
    //   var row = {}

    //   // save tr's id, class and data-* attributes
    //   row._id = $(this).attr('id')
    //   row._class = $(this).attr('class')
    //   row._data = getRealDataAttr($(this).data())

    //   $(this).find('>td').each(function (x) {
    //     var $this = $(this),
    //       cspan = +$this.attr('colspan') || 1,
    //       rspan = +$this.attr('rowspan') || 1,
    //       tx, ty

    //     for (; m[y] && m[y][x]; x++); //skip already occupied cells in current row

    //     for (tx = x; tx < x + cspan; tx++) { //mark matrix elements occupied by current cell with true
    //       for (ty = y; ty < y + rspan; ty++) {
    //         if (!m[ty]) { //fill missing rows
    //           m[ty] = []
    //         }
    //         m[ty][tx] = true
    //       }
    //     }

    //     var field = that.items[x].field

    //     row[field] = $(this).html()
    //     // save td's id, class and data-* attributes
    //     row['_' + field + '_id'] = $(this).attr('id')
    //     row['_' + field + '_class'] = $(this).attr('class')
    //     row['_' + field + '_rowspan'] = $(this).attr('rowspan')
    //     row['_' + field + '_colspan'] = $(this).attr('colspan')
    //     row['_' + field + '_title'] = $(this).attr('title')
    //     row['_' + field + '_data'] = getRealDataAttr($(this).data())
    //   })
    //   data.push(row)
    // })
    this.options.data = data
    if (data.length) {
      this.fromHtml = true
    }
  }

  bsCarousel.prototype.initCaroulselInner = function () {
    var that = this,
      visibleitems = {},
      html = []

    this.caroulselInner = {
      fields: [],
      styles: [],
      classes: [],
      formatters: [],
      events: [],
      sorters: [],
      sortNames: [],
      cellStyles: [],
      searchables: []
    }

    $.each(this.options.items, (i, items) => {
      html.push('<div title="extra-delete-me">')

      if (i === 0 && !that.options.cardView && that.options.detailView) {
        html.push(sprintf('<div title="extra-delete-me2" id="%s'+ +'"></div>',
          that.options.items.length))
      }

      $.each(items, function (j, item) {
        var text = '',
          halign = '', // caroulselInner align style
          align = '', // body align style
          style = '',
          class_ = sprintf(' class="%s"', item['class']),
          order = that.options.sortOrder || item.order,
          unitWidth = 'px',
          width = item.width

        if (item.width !== undefined && (!that.options.cardView)) {
          if (typeof item.width === 'string') {
            if (item.width.indexOf('%') !== -1) {
              unitWidth = '%'
            }
          }
        }
        if (item.width && typeof item.width === 'string') {
          width = item.width.replace('%', '').replace('px', '')
        }

        halign = sprintf('text-align: %s; ', item.halign ? item.halign : item.align)
        align = sprintf('text-align: %s; ', item.align)
        style = sprintf('vertical-align: %s; ', item.valign)
        style += sprintf('width: %s; ', (item.checkbox || item.radio) && !width ?
          '0px' : (width ? width + unitWidth : undefined))

        if (typeof item.fieldIndex !== 'undefined') {
          that.caroulselInner.fields[item.fieldIndex] = item.field
          that.caroulselInner.styles[item.fieldIndex] = align + style
          that.caroulselInner.classes[item.fieldIndex] = class_
          that.caroulselInner.formatters[item.fieldIndex] = item.formatter
          that.caroulselInner.events[item.fieldIndex] = item.events
          that.caroulselInner.sorters[item.fieldIndex] = item.sorter
          that.caroulselInner.sortNames[item.fieldIndex] = item.sortName
          that.caroulselInner.cellStyles[item.fieldIndex] = item.cellStyle
          that.caroulselInner.searchables[item.fieldIndex] = item.searchable

          if (!item.visible) {
            return
          }

          // if (that.options.cardView && (!item.cardVisible)) {
          //   return
          // }

          visibleitems[item.field] = item
        }

        html.push('<div class="carousel-caption"' + sprintf(' title="%s"', item.itemCaptionTooltip),
          item.field ?
            sprintf(' class="bs-checkbox %s"', item['class'] || '') :
            class_,
          sprintf(' style="%s"', halign + style),
          sprintf(' rowspan="%s"', item.rowspan),
          sprintf(' colspan="%s"', item.colspan),
          sprintf(' data-field="%s"', item.field),
          '>')

        html.push(sprintf('<div class="delete-me3 %s">', that.options.sortCarousel && item.sortCarousel ?
          'sortCarousel both' : ''))

        text = that.options.escape ? escapeHTML(item.title) : item.title

        // if (item.checkbox) {
        //   if (!that.options.singleSelect && that.options.checkboxcaroulselInner) {
        //     text = '<input name="btSelectAll" type="checkbox" />'
        //   }
        //   that.caroulselInner.stateField = item.field
        // }
        // if (item.radio) {
        //   text = ''
        //   that.caroulselInner.stateField = item.field
        //   that.options.singleSelect = true
        // }

        html.push(text)
        html.push('</div>')
        html.push('</div>')
      })
      html.push('</div>')
    })

    this.$caroulselInner.html(html.join(''))
    this.$caroulselInner.find('div[data-field]').each(function (i) {
      $(this).data(visibleitems[$(this).data('field')])
    })
    this.$container.off('click', '.btn-primary').on('click', '.btn-primary', function (event) {
      var target = $(this)

      if (that.options.detailView) {
        if (target.closest('.carousel')[0] !== that.$container[0])
          return false
      }

      if (that.options.sortCarousel && target.parent().data().sortCarousel) {
        that.onSort(event)
      }
    })

    this.$caroulselInner.children().children().off('keypress').on('keypress', function (event) {
      if (that.options.sortCarousel && $(this).data().sortCarousel) {
        var code = event.keyCode || event.which
        if (code == 13) { //Enter keycode
          that.onSort(event)
        }
      }
    })

    $(window).off('resize.carousel')
    if (!this.options.showcaroulselInner) {
      this.$caroulselInner.hide()
      this.$carouselCarouselInner.hide()
      this.$carouselLoading.css('top', 0)
    } else {
      this.$caroulselInner.show()
      this.$carouselCarouselInner.show()
      this.$carouselLoading.css('top', this.$caroulselInner.outerHeight() + 1)
      // Assign the correct sortCarousel arrow
      // this.getCaret()
      $(window).on('resize.carousel', $.proxy(this.resetWidth, this))
    }

    this.$selectAll = this.$caroulselInner.find('[name="btSelectAll"]')
    this.$selectAll.off('click').on('click', function () {
      var checked = $(this).prop('checked')
      that[checked ? 'checkAll' : 'uncheckAll']()
      that.updateSelected()
    })
  }

  // bsCarousel.prototype.initFooter = function () {
  //   if (!this.options.showFooter || this.options.cardView) {
  //     this.$carouselFooter.hide()
  //   } else {
  //     this.$carouselFooter.show()
  //   }
  // }

  /**
   * @param data
   * @param type: append / prepend
   */
  bsCarousel.prototype.initData = function (data, type) {
    if (type === 'append') {
      this.data = this.data.concat(data)
    } else if (type === 'prepend') {
      this.data = [].concat(data).concat(this.data)
    } else {
      this.data = data || this.options.data
    }

    // Fix #839 Records deleted when adding new row on filtered carousel
    if (type === 'append') {
      this.options.data = this.options.data.concat(data)
    } else if (type === 'prepend') {
      this.options.data = [].concat(data).concat(this.options.data)
    } else {
      this.options.data = this.data
    }

    if (this.options.sidePagination === 'server') {
      return
    }
    this.initSort()
  }

  bsCarousel.prototype.initSort = function () {
    var that = this,
      name = this.options.sortName,
      order = this.options.sortOrder === 'desc' ? -1 : 1,
      index = $.inArray(this.options.sortName, this.caroulselInner.fields),
      timeoutId = 0

    if (this.options.customSort !== $.noop) {
      this.options.customSort.apply(this, [this.options.sortName, this.options.sortOrder])
      return
    }

    if (index !== -1) {
      if (this.options.sortCarousel) {
        $.each(this.data, (i, row) => {
          row._position = i
        })
      }

      this.data.sort((a, b) => {
        if (that.caroulselInner.sortNames[index]) {
          name = that.caroulselInner.sortNames[index]
        }
        var aa = getItemField(a, name, that.options.escape),
          bb = getItemField(b, name, that.options.escape),
          value = calculateObjectValue(that.caroulselInner, that.caroulselInner.sorters[index], [aa, bb])

        if (value !== undefined) {
          if (that.options.sortCarousel && value === 0) {
            return a._position - b._position
          }
          return order * value
        }

        // Fix #161: undefined or null string sort bug.
        if (aa === undefined || aa === null) {
          aa = ''
        }
        if (bb === undefined || bb === null) {
          bb = ''
        }

        if (that.options.sortCarousel && aa === bb) {
          aa = a._position
          bb = b._position
          return a._position - b._position
        }

        // IF both values are numeric, do a numeric comparison
        if ($.isNumeric(aa) && $.isNumeric(bb)) {
          // Convert numerical values form string to float.
          aa = parseFloat(aa)
          bb = parseFloat(bb)
          if (aa < bb) {
            return order * -1
          }
          return order
        }

        if (aa === bb) {
          return 0
        }

        // If value is not a string, convert to string
        if (typeof aa !== 'string') {
          aa = aa.toString()
        }

        if (aa.localeCompare(bb) === -1) {
          return order * -1
        }

        return order
      })

      if (this.options.sortClass !== undefined) {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
          that.$el.removeClass(that.options.sortClass)
          var index = that.$caroulselInner.find(sprintf('[data-field="%s"]',
            that.options.sortName).index() + 1)
          that.$el.find(sprintf('tr td:nth-child(%s)', index))
            .addClass(that.options.sortClass)
        }, 250)
      }
    }
  }

  bsCarousel.prototype.onSort = function (event) {
    var $this = event.type === "keypress" ? $(event.currentTarget) : $(event.currentTarget).parent(),
      $this_ = this.$caroulselInner.find('th').eq($this.index())

    this.$caroulselInner.add(this.$caroulselInner_).find('span.order').remove()

    if (this.options.sortName === $this.data('field')) {
      this.options.sortOrder = this.options.sortOrder === 'asc' ? 'desc' : 'asc'
    } else {
      this.options.sortName = $this.data('field')
      if (this.options.rememberOrder) {
        this.options.sortOrder = $this.data('order') === 'asc' ? 'desc' : 'asc'
      } else {
        this.options.sortOrder = this.options.items[0].filter((option) => {
          return option.field === $this.data('field')
        })[0].order
      }
    }
    this.trigger('sort', this.options.sortName, this.options.sortOrder)

    $this.add($this_).data('order', this.options.sortOrder)

    // Assign the correct sortCarousel arrow
    this.getCaret()

    if (this.options.sidePagination === 'server') {
      this.initServer(this.options.silentSort)
      return
    }

    this.initSort()
    this.initBody()
  }

  // bsCarousel.prototype.initToolbar = function () {
  //   var that = this
  //   var html = []
  //   var $keepOpen
  //   var timeoutId = 0
  //   var $search
  //   var switchableCount = 0

  //   if (this.$toolbar.find('.bs-bars').children().length) {
  //     $('body').append($(this.options.toolbar))
  //   }
  //   this.$toolbar.html('')

  //   if (typeof this.options.toolbar === 'string' || typeof this.options.toolbar === 'object') {
  //     $(sprintf('<div class="bs-bars %s-%s"></div>', bs.pullClass, this.options.toolbarAlign))
  //       .appendTo(this.$toolbar)
  //       .append($(this.options.toolbar))
  //   }

  //   // showitems, showToggle, showRefresh
  //   // html = [sprintf('<div id="majortoolage" class="d-flex fixed-carousel-pagination items items-%s btn-group %s-%s">',
  //   html = [sprintf('<div id="extInsert" class="items items-%s btn-group %s-%s">',
  //     this.options.buttonsAlign, bs.pullClass, this.options.buttonsAlign)]

  //   if (typeof this.options.icons === 'string') {
  //     this.options.icons = calculateObjectValue(null, this.options.icons)
  //   }

  //   if (this.options.showPaginationSwitch) {
  //     html.push(sprintf(`<button type="button" class="show-pagination bss-btn${
  //       sprintf(' btn-%s', this.options.buttonsClass)
  //       }${sprintf(' btn-%s', this.options.iconSize)
  //       }" name="paginationSwitch" aria-label="pagination Switch" title="%s">`,
  //       this.options.formatPaginationSwitch()),
  //       sprintf('<i class="%s %s"></i>Pagination on/off', this.options.iconsPrefix, this.options.icons.paginationSwitchDown),
  //       '</button>')
  //   }

  //   if (this.options.showRefresh) {
  //     html.push(sprintf(`<button type="button" class="refresh-data bss-btn${
  //       sprintf(' btn-%s', this.options.buttonsClass)
  //       }${sprintf(' btn-%s', this.options.iconSize)
  //       }" name="refresh" aria-label="refresh" title="%s">`,
  //       this.options.formatRefresh()),
  //       sprintf('<i class="%s %s"></i> Refresh', this.options.iconsPrefix, this.options.icons.refresh),
  //       '</button>')
  //   }

  //   if (this.options.showToggle) {
  //     html.push(sprintf(`<button type="button" class="mobile-carousel-view bss-btn${
  //       sprintf(' btn-%s', this.options.buttonsClass)
  //       }${sprintf(' btn-%s', this.options.iconSize)
  //       }" name="toggle" aria-label="toggle" title="%s">`,
  //       this.options.formatToggle()),
  //       sprintf('<i class="%s %s" hidden></i> Mobile View', this.options.iconsPrefix, this.options.icons.toggle),
  //       '</button>')
  //   }

  //   if (this.options.showitems) {
  //     html.push(sprintf('<div class="btn-group show-items" title="%s">',
  //       this.options.formatitems()),
  //       `<button id="dropdownMenuLink" href="#" type="button" aria-label="items" class="bss-btn${
  //       sprintf(' btn-%s', this.options.buttonsClass)
  //       }${sprintf(' btn-%s', this.options.iconSize)
  //       } dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">`,
  //       sprintf('<i class="%s %s"></i> Filters', this.options.iconsPrefix, this.options.icons.items),
  //       ' </button>',
  //       '',
  //       '<div id="itemMenu" class="keep-open dropdown-menu item-count bss-ddm-overide insert-b-a" aria-labelledby="dropdownMenuLink" role="menu">')
  //     // bs.toobarDropdowHtml[0]);
  //     $.each(this.items, (i, item) => {
  //       if (item.radio || item.checkbox) {
  //         return
  //       }

  //       if (that.options.cardView && !item.cardVisible) {
  //         return
  //       }

  //       var checked = item.visible ? ' checked="checked"' : ''
  //       var uniqueIDName = '_' + item.field + '-' + i

  //       if (item.switchable) {
  //         html.push(sprintf('<div id="' + uniqueIDName + '" class="dropdown-item" role="menuitem">' +
  //           '<label class="dd-label"><input class="dd-checkbox" type="checkbox" data-field="%s" value="%s"%s> %s</label>' +
  //           '</div>', item.field, i, checked, item.title))
  //         switchableCount++
  //       }
  //     })
  //     $(() => {
  //       $('<h5 class="sectionTitle first-ddm-secTitle">GENERAL INFO</h5>').insertBefore('div.insert-b-a div:nth-child(1)')
  //       $('<h5 class="sectionTitle">SOCIAL</h5>').insertAfter('div.insert-b-a div:nth-child(26)')
  //       $('<h5 class="sectionTitle">PARENTS/GUARDIANS</h5>').insertAfter('div.insert-b-a div:nth-child(29)')
  //       $('<h5 class="sectionTitle">SPORT(S)</h5>').insertAfter('div.insert-b-a div:nth-child(42)')
  //     })
  //     html.push('</div>',
  //       '',
  //       '</div>')
  //     html.push(bs.toobarDropdowHtml[1], '</div>')
  //   }

  //   html.push('</div>')

  //   // Fix #188: this.showToolbar is for extensions
  //   if (this.showToolbar || html.length > 2) {
  //     this.$toolbar.append(html.join(''))
  //   }

  //   if (this.options.showPaginationSwitch) {
  //     this.$toolbar.find('a[name="paginationSwitch"]')
  //       .off('click').on('click', $.proxy(this.togglePagination, this))
  //   }

  //   if (this.options.showRefresh) {
  //     this.$toolbar.find('button[name="refresh"]')
  //       .off('click').on('click', $.proxy(this.refresh, this))
  //   }

  //   if (this.options.showToggle) {
  //     this.$toolbar.find('a[name="toggle"]')
  //       .off('click').on('click', () => {
  //         that.toggleView()
  //       })
  //   }

  //   if (this.options.showitems) {
  //     $keepOpen = this.$toolbar.find('.keep-open')

  //     if (switchableCount <= this.options.minimumCountitems) {
  //       $keepOpen.find('input').attr('disabled', true)
  //     }

  //     $keepOpen.find('div').off('click').on('click', (event) => {
  //       event.stopImmediatePropagation()
  //     })
  //     $keepOpen.find('.dropdown-menu').off('click').on('click', (event) => {
  //       event.stopImmediatePropagation()
  //     })
  //     $keepOpen.find('input').off('click').on('click', function () {
  //       var $this = $(this)
  //       that.toggleitem($(this).val(), $this.prop('checked'), false)
  //       that.trigger('item-switch', $(this).data('field'), $this.prop('checked'))
  //     })
  //   }

  //   if (this.options.search) {
  //     html = []
  //     var searchDiv = sprintf('<div class="search %s-%s" >', bs.pullClass01, this.options.searchAlign01)
  //     html.push(
  //       searchDiv + sprintf('<span class="input-group-addon"><i class="fa fa-search"></i></span><input id="userSearch" class="form-control flexi-search-input' +
  //         sprintf(' %s-%s', this.options.searchAlign01) +
  //         '" type="text" placeholder="%s" aria-label="%s">', this.options.formatSearch(), this.options.formatSearch()),
  //       '</div>')
  //     $('#extInsert').append(html)
  //     // this.$toolbar.append(html.join(''))
  //     $search = this.$toolbar.find('.search input')
  //     $search = $('#userSearch')
  //     $search.off('keyup drop blur').on('keyup drop blur', (event) => {
  //       if (that.options.searchOnEnterKey && event.keyCode !== 13) {
  //         return
  //       }

  //       if ($.inArray(event.keyCode, [37, 38, 39, 40]) > -1) {
  //         return
  //       }

  //       clearTimeout(timeoutId) // doesn't matter if it's 0
  //       timeoutId = setTimeout(function () {
  //         that.onSearch(event)
  //       }, that.options.searchTimeOut)
  //     })

  //     if (isIEBrowser()) {
  //       $search.off('mouseup').on('mouseup', (event) => {
  //         clearTimeout(timeoutId) // doesn't matter if it's 0
  //         timeoutId = setTimeout(function () {
  //           that.onSearch(event)
  //         }, that.options.searchTimeOut)
  //       })
  //     }
  //   }
  // }

  // bsCarousel.prototype.onSearch = function (event) {
  //   var text = $.trim($(event.currentTarget).val())

  //   // trim search input
  //   if (this.options.trimOnSearch && $(event.currentTarget).val() !== text) {
  //     $(event.currentTarget).val(text)
  //   }

  //   if (text === this.searchText) {
  //     return
  //   }
  //   this.searchText = text
  //   this.options.searchText = text

  //   this.options.pageNumber = 1
  //   this.initSearch()
  //   this.updatePagination()
  //   this.trigger('search', text)
  // }

  // bsCarousel.prototype.initSearch = function () {
  //   var that = this

  //   if (this.options.sidePagination !== 'server') {
  //     if (this.options.customSearch !== $.noop) {
  //       window[this.options.customSearch].apply(this, [this.searchText])
  //       return
  //     }

  //     var s = this.searchText && (this.options.escape ?
  //       escapeHTML(this.searchText) : this.searchText).toLowerCase()
  //     var f = $.isEmptyObject(this.filteritems) ? null : this.filteritems

  //     // Check filter
  //     this.data = f ? $.grep(this.options.data, (item, i) => {
  //       for (var key in f) {
  //         if ($.isArray(f[key]) && $.inArray(item[key], f[key]) === -1 ||
  //           !$.isArray(f[key]) && item[key] !== f[key]) {
  //           return false
  //         }
  //       }
  //       return true
  //     }) : this.options.data

  //     this.data = s ? $.grep(this.data, (item, i) => {
  //       for (var j = 0; j < that.caroulselInner.fields.length; j++) {

  //         if (!that.caroulselInner.searchables[j]) {
  //           continue
  //         }

  //         var key = $.isNumeric(that.caroulselInner.fields[j]) ? parseInt(that.caroulselInner.fields[j], 10) : that.caroulselInner.fields[j]
  //         var item = that.items[that.fieldsitemsIndex[key]]
  //         var value

  //         if (typeof key === 'string') {
  //           value = item
  //           var props = key.split('.')
  //           for (var prop_index = 0; prop_index < props.length; prop_index++) {
  //             value = value[props[prop_index]]
  //           }

  //           // Fix #142: respect searchForamtter boolean
  //           if (item && item.searchFormatter) {
  //             value = calculateObjectValue(item,
  //               that.caroulselInner.formatters[j], [value, item, i], value)
  //           }
  //         } else {
  //           value = item[key]
  //         }

  //         if (typeof value === 'string' || typeof value === 'number') {
  //           if (that.options.strictSearch) {
  //             if ((value + '').toLowerCase() === s) {
  //               return true
  //             }
  //           } else {
  //             if ((value + '').toLowerCase().indexOf(s) !== -1) {
  //               return true
  //             }
  //           }
  //         }
  //       }
  //       return false
  //     }) : this.data
  //   }
  // }

  // bsCarousel.prototype.initPagination = function () {
  //   if (!this.options.pagination) {
  //     this.$pagination.hide()
  //     return
  //   } else {
  //     this.$pagination.show()
  //   }

  //   var that = this,
  //     html = [],
  //     $allSelected = false,
  //     i, from, to,
  //     $pageList,
  //     $pre,
  //     $next,
  //     $number,
  //     data = this.getData(),
  //     pageList = this.options.pageList

  //   if (this.options.sidePagination !== 'server') {
  //     this.options.totalRows = data.length
  //   }

  //   this.totalPages = 0
  //   if (this.options.totalRows) {
  //     if (this.options.pageSize === this.options.formatAllRows()) {
  //       this.options.pageSize = this.options.totalRows
  //       $allSelected = true
  //     } else if (this.options.pageSize === this.options.totalRows) {
  //       // Fix #667 carousel with pagination,
  //       // multiple pages and a search that matches to one page throws exception
  //       var pageLst = typeof this.options.pageList === 'string' ?
  //         this.options.pageList.replace('[', '').replace(']', '')
  //           .replace(/ /g, '').toLowerCase().split(',') : this.options.pageList
  //       if ($.inArray(this.options.formatAllRows().toLowerCase(), pageLst) > -1) {
  //         $allSelected = true
  //       }
  //     }

  //     this.totalPages = ~~((this.options.totalRows - 1) / this.options.pageSize) + 1

  //     this.options.totalPages = this.totalPages
  //   }
  //   if (this.totalPages > 0 && this.options.pageNumber > this.totalPages) {
  //     this.options.pageNumber = this.totalPages
  //   }

  //   this.pageFrom = (this.options.pageNumber - 1) * this.options.pageSize + 1
  //   this.pageTo = this.options.pageNumber * this.options.pageSize
  //   if (this.pageTo > this.options.totalRows) {
  //     this.pageTo = this.options.totalRows
  //   }

  //   html.push(
  //     //   sprintf('<div class="%s-%s pagination-detail">', bs.pullClass, this.options.paginationDetailHAlign),
  //     sprintf('<div class="%s-%s pagination-detail">', bs.pullClass01, this.options.paginationDetailHAlign01),
  //     '<span class="pagination-info">',
  //     this.options.onlyInfoPagination ? this.options.formatDetailPagination(this.options.totalRows)
  //       : this.options.formatShowingRows(this.pageFrom, this.pageTo, this.options.totalRows),
  //     '</span>')

  //   if (!this.options.onlyInfoPagination) {
  //     html.push('<span class="page-list dropdown dropup">')

  //     var pageNumber = [
  //       sprintf('<span class="%s">',
  //         this.options.paginationVAlign === 'top' || this.options.paginationVAlign === 'both' ?
  //           'dropdown' : 'dropup'),
  //       '<button id="pageDetail" type="button" class="ml-1 bss-btn ' +
  //       sprintf(' btn-%s', this.options.buttonsClass) +
  //       sprintf(' btn-%s', this.options.iconSize) +
  //       ' dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">',
  //       '<div class="page-size">',
  //       $allSelected ? this.options.formatAllRows() : this.options.pageSize,
  //       '</div>',
  //       ' <span class="caret"></span>',
  //       '</button>',
  //       bs.pageDropdownHtml01[0]
  //     ]

  //     if (typeof this.options.pageList === 'string') {
  //       var list = this.options.pageList.replace('[', '').replace(']', '')
  //         .replace(/ /g, '').split(',')

  //       pageList = []
  //       $.each(list, (i, value) => {
  //         pageList.push((value.toUpperCase() === that.options.formatAllRows().toUpperCase() || value.toUpperCase() === "UNLIMITED") ?
  //           that.options.formatAllRows() : +value)
  //       })
  //     }

  //     $.each(pageList, (i, page) => {
  //       if (!that.options.smartDisplay || i === 0 || pageList[i - 1] < that.options.totalRows) {
  //         var active
  //         if ($allSelected) {
  //           active = page === that.options.formatAllRows() ? 'active' : ''
  //         } else {
  //           active = page === that.options.pageSize ? 'active' : ''
  //         }
  //         pageNumber.push(sprintf(bs.pageDropdownItemHtml, active, page))
  //       }
  //     })
  //     pageNumber.push(bs.pageDropdownHtml01[1] + '</span><span class="pagination-info-r">')

  //     html.push(this.options.formatRecordsPerPage(pageNumber.join('')))
  //     html.push('</span>')

  //     html.push('</div>',
  //       //   sprintf('<div class="%s-%s pagination">', bs.pullClass, this.options.paginationHAlign),
  //       sprintf('<div class="%s-%s pagination-container">', bs.pullClass01, this.options.paginationHAlign01),
  //       '<ul class="pagination' + sprintf(' pagination-%s', this.options.iconSize) + '">',
  //       sprintf('<li class="page-item page-pre"><a class="page-link" href="#">%s</a></li>',
  //         this.options.paginationPreText))

  //     if (this.totalPages < 5) {
  //       from = 1
  //       to = this.totalPages
  //     } else {
  //       from = this.options.pageNumber - 2
  //       to = from + 4
  //       if (from < 1) {
  //         from = 1
  //         to = 5
  //       }
  //       if (to > this.totalPages) {
  //         to = this.totalPages
  //         from = to - 4
  //       }
  //     }

  //     if (this.totalPages >= 6) {
  //       if (this.options.pageNumber >= 3) {
  //         html.push(
  //           sprintf('<li class="page-item page-first%s">',
  //             1 === this.options.pageNumber ? ' active' : ''),
  //           '<a class="page-link" href="#">', 1, '</a>',
  //           '</li>')

  //         from++
  //       }

  //       if (this.options.pageNumber >= 4) {
  //         if (this.options.pageNumber == 4 || this.totalPages == 6 || this.totalPages == 7) {
  //           from--
  //         } else {
  //           html.push('<li class="page-item page-first-separator disabled">',
  //             '<a class="page-link" href="#">...</a>',
  //             '</li>')
  //         }

  //         to--
  //       }
  //     }

  //     if (this.totalPages >= 7) {
  //       if (this.options.pageNumber >= (this.totalPages - 2)) {
  //         from--
  //       }
  //     }

  //     if (this.totalPages == 6) {
  //       if (this.options.pageNumber >= (this.totalPages - 2)) {
  //         to++
  //       }
  //     } else if (this.totalPages >= 7) {
  //       if (this.totalPages == 7 || this.options.pageNumber >= (this.totalPages - 3)) {
  //         to++
  //       }
  //     }

  //     for (i = from; i <= to; i++) {
  //       html.push(sprintf('<li class="page-item%s">',
  //         i === this.options.pageNumber ? ' active' : ''),
  //         '<a class="page-link" href="#">', i, '</a>',
  //         '</li>')
  //     }

  //     if (this.totalPages >= 8) {
  //       if (this.options.pageNumber <= (this.totalPages - 4)) {
  //         html.push('<li class="page-item page-last-separator disabled">',
  //           '<a class="page-link" href="#">...</a>',
  //           '</li>')
  //       }
  //     }

  //     if (this.totalPages >= 6) {
  //       if (this.options.pageNumber <= (this.totalPages - 3)) {
  //         html.push(sprintf('<li class="page-item page-last%s">',
  //           this.totalPages === this.options.pageNumber ? ' active' : ''),
  //           '<a class="page-link" href="#">', this.totalPages, '</a>',
  //           '</li>')
  //       }
  //     }

  //     html.push(
  //       sprintf('<li class="page-item page-next"><a class="page-link" href="#">%s</a></li>',
  //         this.options.paginationNextText),
  //       '</ul>',
  //       '</div>')
  //   }
  //   this.$pagination.html(html.join(''))

  //   if (!this.options.onlyInfoPagination) {
  //     $pageList = this.$pagination.find('.page-list a')
  //     $pre = this.$pagination.find('.page-pre')
  //     $next = this.$pagination.find('.page-next')
  //     $number = this.$pagination.find('.page-item').not('.page-next, .page-pre')

  //     if (this.options.smartDisplay) {
  //       if (this.totalPages <= 1) {
  //         this.$pagination.find('div.pagination').hide()
  //       }
  //       if (pageList.length < 2 || this.options.totalRows <= pageList[0]) {
  //         this.$pagination.find('span.page-list').hide()
  //       }

  //       // when data is empty, hide the pagination
  //       this.$pagination[this.getData().length ? 'show' : 'hide']()
  //     }

  //     if (!this.options.paginationLoop) {
  //       if (this.options.pageNumber === 1) {
  //         $pre.addClass('disabled')
  //       }
  //       if (this.options.pageNumber === this.totalPages) {
  //         $next.addClass('disabled')
  //       }
  //     }

  //     if ($allSelected) {
  //       this.options.pageSize = this.options.formatAllRows()
  //     }
  //     // removed the events for last and first, onPageNumber executeds the same logic
  //     $pageList.off('click').on('click', $.proxy(this.onPageListChange, this))
  //     $pre.off('click').on('click', $.proxy(this.onPagePre, this))
  //     $next.off('click').on('click', $.proxy(this.onPageNext, this))
  //     $number.off('click').on('click', $.proxy(this.onPageNumber, this))
  //   }
  // }

  bsCarousel.prototype.updatePagination = function (event) {
    // Fix #171: IE disabled button can be clicked bug.
    if (event && $(event.currentTarget).hasClass('disabled')) {
      return
    }

    if (!this.options.maintainSelected) {
      this.resetRows()
    }

    this.initPagination()
    if (this.options.sidePagination === 'server') {
      this.initServer()
    } else {
      this.initBody()
    }

    this.trigger('page-change', this.options.pageNumber, this.options.pageSize)
  }

  bsCarousel.prototype.onPageListChange = function (event) {
    var $this = $(event.currentTarget)

    $this.parent().addClass('active').siblings().removeClass('active')
    this.options.pageSize = $this.text().toUpperCase() === this.options.formatAllRows().toUpperCase() ?
      this.options.formatAllRows() : +$this.text()
    this.$toolbar.find('.page-size').text(this.options.pageSize)

    this.updatePagination(event)
    return false
  }

  // TODO: remove
  bsCarousel.prototype.onPageFirst = function (event) {
    this.options.pageNumber = 1
    this.updatePagination(event)
    return false
  }

  bsCarousel.prototype.onPagePre = function (event) {
    if ((this.options.pageNumber - 1) === 0) {
      this.options.pageNumber = this.options.totalPages
    } else {
      this.options.pageNumber--
    }
    this.updatePagination(event)
    return false
  }

  bsCarousel.prototype.onPageNext = function (event) {
    if ((this.options.pageNumber + 1) > this.options.totalPages) {
      this.options.pageNumber = 1
    } else {
      this.options.pageNumber++
    }
    this.updatePagination(event)
    return false
  }

  // TODO: remove
  bsCarousel.prototype.onPageLast = function (event) {
    this.options.pageNumber = this.totalPages
    this.updatePagination(event)
    return false
  }

  bsCarousel.prototype.onPageNumber = function (event) {
    if (this.options.pageNumber === +$(event.currentTarget).text()) {
      return
    }
    this.options.pageNumber = +$(event.currentTarget).text()
    this.updatePagination(event)
    return false
  }

  bsCarousel.prototype.initRow = function (item, i, data, parentDom) {
    var that = this,
      key,
      html = [],
      style = {},
      csses = [],
      data_ = '',
      attributes = {},
      htmlAttributes = []

    if ($.inArray(item, this.hiddenRows) > -1) {
      return
    }

    style = calculateObjectValue(this.options, this.options.rowStyle, [item, i], style)

    if (style && style.css) {
      for (key in style.css) {
        csses.push(key + ': ' + style.css[key])
      }
    }

    attributes = calculateObjectValue(this.options,
      this.options.rowAttributes, [item, i], attributes)

    if (attributes) {
      for (key in attributes) {
        htmlAttributes.push(sprintf('%s="%s"', key, escapeHTML(attributes[key])))
      }
    }

    if (item._data && !$.isEmptyObject(item._data)) {
      $.each(item._data, (k, v) => {
        // ignore data-index
        if (k === 'index') {
          return
        }
        data_ += sprintf(' data-%s="%s"', k, v)
      })
    }

    html.push('<tr',
      sprintf(' %s', htmlAttributes.join(' ')),
      sprintf(' id="%s"', $.isArray(item) ? undefined : item._id),
      sprintf(' class="%s"', style.classes || ($.isArray(item) ? undefined : item._class)),
      sprintf(' data-index="%s"', i),
      sprintf(' data-uniqueid="%s"', item[this.options.uniqueId]),
      sprintf('%s', data_),
      '>'
    )

    if (this.options.cardView) {
      html.push(sprintf('<td colspan="%s"><div class="card-views">', this.caroulselInner.fields.length))
    }

    if (!this.options.cardView && this.options.detailView) {
      html.push('<td>')

      if (calculateObjectValue(null, this.options.detailFilter, [i, item])) {
        html.push('<a class="detail-icon" href="javascript:void(0)">',
          sprintf('<i class="%s %s"></i>', this.options.iconsPrefix, this.options.icons.detailOpen),
          '</a>')
      }

      html.push('</td>')
    }

    $.each(this.caroulselInner.fields, (j, field) => {
      var text = '',
        value_ = getItemField(item, field, that.options.escape),
        value = '',
        type = '',
        cellStyle = {},
        id_ = '',
        class_ = that.caroulselInner.classes[j],
        data_ = '',
        rowspan_ = '',
        colspan_ = '',
        title_ = '',
        item = that.items[j]

      if (that.fromHtml && typeof value_ === 'undefined') {
        if ((!item.checkbox) && (!item.radio)) {
          return
        }
      }

      if (!item.visible) {
        return
      }

      if (that.options.cardView && (!item.cardVisible)) {
        return
      }

      if (item.escape) {
        value_ = escapeHTML(value_)
      }

      style = sprintf('style="%s"', csses.concat(that.caroulselInner.styles[j]).join('; '))

      // handle td's id and class
      if (item['_' + field + '_id']) {
        id_ = sprintf(' id="%s"', item['_' + field + '_id'])
      }
      if (item['_' + field + '_class']) {
        class_ = sprintf(' class="%s"', item['_' + field + '_class'])
      }
      if (item['_' + field + '_rowspan']) {
        rowspan_ = sprintf(' rowspan="%s"', item['_' + field + '_rowspan'])
      }
      if (item['_' + field + '_colspan']) {
        colspan_ = sprintf(' colspan="%s"', item['_' + field + '_colspan'])
      }
      if (item['_' + field + '_title']) {
        title_ = sprintf(' title="%s"', item['_' + field + '_title'])
      }
      cellStyle = calculateObjectValue(that.caroulselInner,
        that.caroulselInner.cellStyles[j], [value_, item, i, field], cellStyle)
      if (cellStyle.classes) {
        class_ = sprintf(' class="%s"', cellStyle.classes)
      }
      if (cellStyle.css) {
        var csses_ = []
        for (var key in cellStyle.css) {
          csses_.push(key + ': ' + cellStyle.css[key])
        }
        style = sprintf('style="%s"', csses_.concat(that.caroulselInner.styles[j]).join('; '))
      }

      value = calculateObjectValue(item,
        that.caroulselInner.formatters[j], [value_, item, i, field], value_)

      if (item['_' + field + '_data'] && !$.isEmptyObject(item['_' + field + '_data'])) {
        $.each(item['_' + field + '_data'], function (k, v) {
          // ignore data-index
          if (k === 'index') {
            return
          }
          data_ += sprintf(' data-%s="%s"', k, v)
        })
      }

      if (item.checkbox || item.radio) {
        type = item.checkbox ? 'checkbox' : type
        type = item.radio ? 'radio' : type

        text = [sprintf(that.options.cardView ?
          '<div class="card-view %s">' : '<td class="bs-checkbox %s">', item['class'] || ''),
        '<input' +
        sprintf(' data-index="%s"', i) +
        sprintf(' name="%s"', that.options.selectItemName) +
        sprintf(' type="%s"', type) +
        sprintf(' value="%s"', item[that.options.idField]) +
        sprintf(' checked="%s"', value === true ||
          (value_ || value && value.checked) ? 'checked' : undefined) +
        sprintf(' disabled="%s"', !item.checkboxEnabled ||
          (value && value.disabled) ? 'disabled' : undefined) +
        ' />',
        that.caroulselInner.formatters[j] && typeof value === 'string' ? value : '',
        that.options.cardView ? '</div>' : '</td>'
        ].join('')

        item[that.caroulselInner.stateField] = value === true || (value && value.checked)
      } else {
        value = typeof value === 'undefined' || value === null ?
          that.options.undefinedText : value

        text = that.options.cardView ? ['<div class="card-view">',
          that.options.showcaroulselInner ? sprintf('<span class="title" %s>%s</span>', style,
            getPropertyFromOther(that.items, 'field', 'title', field)) : '',
          sprintf('<span class="value">%s</span>', value),
          '</div>'
        ].join('') : [sprintf('<td%s %s %s %s %s %s %s>',
          id_, class_, style, data_, rowspan_, colspan_, title_),
          value,
          '</td>'
        ].join('')

        // Hide empty data on Card view when smartDisplay is set to true.
        if (that.options.cardView && that.options.smartDisplay && value === '') {
          // Should set a placeholder for event binding correct fieldIndex
          text = '<div class="card-view"></div>'
        }
      }

      html.push(text)
    })

    if (this.options.cardView) {
      html.push('</div></td>')
    }
    html.push('</tr>')

    return html.join(' ')
  }

  bsCarousel.prototype.initBody = function (fixedScroll) {
    var that = this,
      html = [],
      data = this.getData()

    this.trigger('pre-body', data)

    this.$body = this.$el.find('>tbody')
    if (!this.$body.length) {
      this.$body = $('<tbody></tbody>').appendTo(this.$el)
    }

    //Fix #389 crslInstance-flatJSON is not working

    if (!this.options.pagination || this.options.sidePagination === 'server') {
      this.pageFrom = 1
      this.pageTo = data.length
    }

    var trFragments = $(document.createDocumentFragment())
    var hasTr

    for (var i = this.pageFrom - 1; i < this.pageTo; i++) {
      var item = data[i]
      var tr = this.initRow(item, i, data, trFragments)
      hasTr = hasTr || !!tr
      if (tr && tr !== true) {
        trFragments.append(tr)
      }
    }

    // show no records
    if (!hasTr) {
      trFragments.append('<div class="no-records-found">' +
        sprintf('<div colspan="%s"><div class="fixed-carousel-loading"><i class="fa fa-spinner fa-pulse fa-fw mr-2"></i>' + this.options.formatLoadingMessage() + '</div>  %s</div>',
        this.$caroulselInner.find('div').length,
          this.options.formatNoMatches()) +
        '</div>')
    }

    this.$body.html(trFragments)

    // if (!fixedScroll) {
    //   this.scrollTo(0)
    // }

    // click to select by item
    this.$body.find('> div[data-index] > div').off('click dblclick').on('click dblclick', function (e) {
      var $divtd = $(this),
        $divtr = $divtd.parent(),
        item = that.data[$divtr.data('index')],
        index = $divtd[0].cellIndex,
        fields = that.getVisibleFields(),
        field = fields[that.options.detailView ? index - 1 : index],
        item = that.items[that.fieldsitemsIndex[field]],
        value = getItemField(item, field, that.options.escape)

      if ($divtd.find('.detail-icon').length) {
        return
      }

      that.trigger(e.type === 'click' ? 'click-cell' : 'dbl-click-cell', field, value, item, $divtd)
      that.trigger(e.type === 'click' ? 'click-row' : 'dbl-click-row', item, $divtr, field)

      // if click to select - then trigger the checkbox/radio click
      if (e.type === 'click' && that.options.clickToSelect && item.clickToSelect) {
        var $selectItem = $divtr.find(sprintf('[name="%s"]', that.options.selectItemName))
        if ($selectItem.length) {
          $selectItem[0].click() // #144: .trigger('click') bug
        }
      }
    })

    this.$body.find('> div[data-index] > div > .detail-icon').off('click').on('click', function () {
      var $this = $(this),
        $divtr = $this.parent().parent(),
        index = $divtr.data('index'),
        row = data[index] // Fix #980 Detail view, when searching, returns wrong row

      // remove and update
      if ($divtr.next().is('div.detail-view')) {
        $this.find('i').attr('class', sprintf('%s %s', that.options.iconsPrefix, that.options.icons.detailOpen))
        that.trigger('collapse-row', index, row)
        $divtr.next().remove()
      } else {
        $this.find('i').attr('class', sprintf('%s %s', that.options.iconsPrefix, that.options.icons.detailClose))
        $divtr.after(sprintf('<div class="detail-view"><div colspan="%s"></div></div>', $divtr.find('div').length))
        var $element = $divtr.next().find('td')
        var content = calculateObjectValue(that.options, that.options.detailFormatter, [index, row, $element], '')
        if ($element.length === 1) {
          $element.append(content)
        }
        that.trigger('expand-row', index, row, $element)
      }
      that.resetView()
      return false
    })

    this.$selectItem = this.$body.find(sprintf('[name="%s"]', this.options.selectItemName))
    this.$selectItem.off('click').on('click', function (event) {
      event.stopImmediatePropagation()

      var $this = $(this),
        checked = $this.prop('checked'),
        row = that.data[$this.data('index')]

      if (that.options.maintainSelected && $(this).is(':radio')) {
        $.each(that.options.data, (i, row) => {
          row[that.caroulselInner.stateField] = false
        })
      }

      row[that.caroulselInner.stateField] = checked

      if (that.options.singleSelect) {
        that.$selectItem.not(this).each(function () {
          that.data[$(this).data('index')][that.caroulselInner.stateField] = false
        })
        that.$selectItem.filter(':checked').not(this).prop('checked', false)
      }

      that.updateSelected()
      that.trigger(checked ? 'check' : 'uncheck', row, $this)
    })

    $.each(this.caroulselInner.events, (i, events) => {
      if (!events) {
        return
      }
      // fix bug, if events is defined with namespace
      if (typeof events === 'string') {
        events = calculateObjectValue(null, events)
      }

      var field = that.caroulselInner.fields[i],
        fieldIndex = $.inArray(field, that.getVisibleFields())

      // if (that.options.detailView && !that.options.cardView) {
      //   fieldIndex += 1
      // }

      for (var key in events) {
        that.$body.find('>tr:not(.no-records-found)').each(function () {
          var $divtr = $(this),
            $divtd = $divtr.find('div').eq(fieldIndex),
            index = key.indexOf(' '),
            name = key.substring(0, index),
            el = key.substring(index + 1),
            func = events[key]

          $divtd.find(el).off(name).on(name, function (e) {
            var index = $divtr.data('index'),
              row = that.data[index],
              value = row[field]

            func.apply(this, [e, value, row, index])
          })
        })
      }
    })

    // this.updateSelected()
    // this.resetView()

    this.trigger('post-body', data)
  }

  bsCarousel.prototype.initServer = function (silent, query, url) {
    var that = this,
      data = {},
      params = {
        // searchText: this.searchText,
        // sortName: this.options.sortName,
        // sortOrder: this.options.sortOrder
      },
      request

    // if (this.options.pagination) {
    //   params.pageSize = this.options.pageSize === this.options.formatAllRows() ?
    //     this.options.totalRows : this.options.pageSize
    //   params.pageNumber = this.options.pageNumber
    // }

    if (!(url || this.options.url) && !this.options.ajax) {
      return
    }

    // if (this.options.queryParamsType === 'limit') {
    //   params = {
    //     search: params.searchText,
    //     sort: params.sortName,
    //     order: params.sortOrder
    //   }

    //   if (this.options.pagination) {
    //     params.offset = this.options.pageSize === this.options.formatAllRows() ?
    //       0 : this.options.pageSize * (this.options.pageNumber - 1)
    //     params.limit = this.options.pageSize === this.options.formatAllRows() ?
    //       this.options.totalRows : this.options.pageSize
    //   }
    // }

    if (!($.isEmptyObject(this.filteritemsPartial))) {
      params.filter = JSON.stringify(this.filteritemsPartial, null)
    }

    data = calculateObjectValue(this.options, this.options.queryParams, [params], data)

    $.extend(data, query || {})

    // false to stop request
    if (data === false) {
      return
    }

    if (!silent) {
      this.$carouselLoading.show()
    }
    request = $.extend({}, calculateObjectValue(null, this.options.ajaxOptions), {
      type: this.options.method,
      url: url || this.options.url,
      data: this.options.contentType === 'application/json' && this.options.method === 'post' ?
        JSON.stringify(data) : data,
      cache: this.options.cache,
      contentType: this.options.contentType,
      dataType: this.options.dataType,
      success(res) {
        res = calculateObjectValue(that.options, that.options.responseHandler, [res], res)

        that.load(res)
        that.trigger('load-success', res)
        if (!silent) that.$carouselLoading.hide()
      },
      error(res) {
        that.trigger('load-error', res.status, res)
        if (!silent) that.$carouselLoading.hide()
      }
    })

  //   if (this.options.ajax) {
  //     calculateObjectValue(this, this.options.ajax, [request], null)
  //   } else {
  //     if (this._xhr && this._xhr.readyState !== 4) {
  //       this._xhr.abort()
  //     }
  //     this._xhr = $.ajax(request)
  //   }
  // }

  // bsCarousel.prototype.initSearchText = function () {
  //   if (this.options.search) {
  //     if (this.options.searchText !== '') {
  //       var $search = this.$toolbar.find('.search input')
  //       $search.val(this.options.searchText)
  //       this.onSearch({ currentTarget: $search })
  //     }
  //   }
  // }

  // bsCarousel.prototype.getCaret = function () {
  //   var that = this

  //   $.each(this.$caroulselInner.find('th'), (i, th) => {
  //     $(th).find('.sortCarousel').removeClass('desc asc').addClass($(th).data('field') === that.options.sortName ? that.options.sortOrder : 'both')
  //   })
  // }

  // bsCarousel.prototype.updateSelected = function () {
  //   var checkAll = this.$selectItem.filter(':enabled').length &&
  //     this.$selectItem.filter(':enabled').length ===
  //     this.$selectItem.filter(':enabled').filter(':checked').length

  //   this.$selectAll.add(this.$selectAll_).prop('checked', checkAll)

  //   this.$selectItem.each(function () {
  //     $(this).closest('tr')[$(this).prop('checked') ? 'addClass' : 'removeClass']('selected')
  //   })
  // }

  // bsCarousel.prototype.updateRows = function () {
  //   var that = this

  //   this.$selectItem.each(function () {
  //     that.data[$(this).data('index')][that.caroulselInner.stateField] = $(this).prop('checked')
  //   })
  // }

  // bsCarousel.prototype.resetRows = function () {
  //   var that = this

  //   $.each(this.data, (i, row) => {
  //     that.$selectAll.prop('checked', false)
  //     that.$selectItem.prop('checked', false)
  //     if (that.caroulselInner.stateField) {
  //       row[that.caroulselInner.stateField] = false
  //     }
  //   })
  //   this.initHiddenRows()
  // }

  bsCarousel.prototype.trigger = function (name) {
    var args = Array.prototype.slice.call(arguments, 1)

    name += '.bs.carousel'
    this.options[bsCarousel.EVENTS[name]].apply(this.options, args)
    this.$el.trigger($.Event(name), args)

    this.options.onAll(name, args)
    this.$el.trigger($.Event('all.bs.carousel'), [name, args])
  }

  bsCarousel.prototype.resetcaroulselInner = function () {
    // fix #61: the hidden carousel reset caroulselInner bug.
    // fix bug: get $el.css('width') error sometime (height = 500)
    clearTimeout(this.timeoutId_)
    this.timeoutId_ = setTimeout($.proxy(this.fitcaroulselInner, this), this.$el.is(':hidden') ? 100 : 0)
  }

  bsCarousel.prototype.fitcaroulselInner = function () {
    var that = this,
      fixedBody,
      focused,
      focusedTemp

    if (that.$el.is(':hidden')) {
      that.timeoutId_ = setTimeout($.proxy(that.fitcaroulselInner, that), 100)
      return
    }
    fixedBody = this.$carouselBody.get(0)

    // scrollWidth = fixedBody.scrollWidth > fixedBody.clientWidth &&
    //   fixedBody.scrollHeight > fixedBody.clientHeight + this.$caroulselInner.outerHeight() ?
    //   getScrollBarWidth() : 0

    this.$el.css('margin-top', -this.$caroulselInner.outerHeight())

    focused = $(':focus')
    if (focused.length > 0) {
      var $divth = focused.parents('div')
      if ($divth.length > 0) {
        var dataField = $divth.attr('data-field')
        if (dataField !== undefined) {
          var $caroulselInnerTh = this.$caroulselInner.find("[data-field='" + dataField + "']")
          if ($caroulselInnerTh.length > 0) {
            $caroulselInnerTh.find(':input').addClass('focus-temp')
          }
        }
      }
    }

    this.$caroulselInner_ = this.$caroulselInner.clone(true, true)
    this.$selectAll_ = this.$caroulselInner_.find('[name="btSelectAll"]')
    this.$carouselcaroulselInner.css({
      'margin-right': 'notset'
    }).find('carousel').css('width', this.$el.outerWidth())
      .html('').attr('class', this.$el.attr('class'))
      .append(this.$caroulselInner_)

    focusedTemp = $('.focus-temp:visible:eq(0)')
    if (focusedTemp.length > 0) {
      focusedTemp.focus()
      this.$caroulselInner.find('.focus-temp').removeClass('focus-temp')
    }

    // fix bug: $.data() is not working as expected after $.append()
    this.$caroulselInner.find('div[data-field]').each(function (i) {
      that.$caroulselInner_.find(sprintf('div[data-field="%s"]', $(this).data('field'))).data($(this).data())
    })

    var visibleFields = this.getVisibleFields(),
      $divths = this.$caroulselInner_.find('div')

    this.$body.find('>div:first-child:not(.no-records-found) > *').each(function (i) {
      var $this = $(this),
        index = i

      // if (that.options.detailView && !that.options.cardView) {
      //   if (i === 0) {
      //     that.$caroulselInner_.find('div.detail').find('.fht-cell').width($this.innerWidth())
      //   }
      //   index = i - 1
      // }

      var $divth = that.$caroulselInner_.find(sprintf('div[data-field="%s"]', visibleFields[index]))
      if ($th.length > 1) {
        $divth = $($divths[$this[0].cellIndex])
      }

      $divth.find('.fht-cell').width($this.innerWidth())
    })

    // this.horizontalScroll()
    this.trigger('post-caroulselInner')
  }

  // bsCarousel.prototype.resetFooter = function () {
  //   var that = this,
  //     data = that.getData(),
  //     html = []

  //   if (!this.options.showFooter || this.options.cardView) { //do nothing
  //     return
  //   }

  //   if (!this.options.cardView && this.options.detailView) {
  //     html.push('<td><div class="th-inner">&nbsp;</div><div class="fht-cell"></div></td>')
  //   }

  //   $.each(this.items, (i, item) => {
  //     var key,
  //       falign = '', // footer align style
  //       valign = '',
  //       csses = [],
  //       style = {},
  //       class_ = sprintf(' class="%s"', item['class'])

  //     if (!item.visible) {
  //       return
  //     }

  //     if (that.options.cardView && (!item.cardVisible)) {
  //       return
  //     }

  //     // falign = sprintf('text-align: %s; ', item.falign ? item.falign : item.align)
  //     // valign = sprintf('vertical-align: %s; ', item.valign)

  //     // style = calculateObjectValue(null, that.options.footerStyle)

  //     // if (style && style.css) {
  //     //   for (key in style.css) {
  //     //     csses.push(key + ': ' + style.css[key])
  //     //   }
  //     // }

  //     html.push('<div', class_, sprintf(' style="%s"', csses.concat().join('; ')), '>')
  //     html.push('<div class="th-inner">')

  //     // html.push(calculateObjectValue(item, item.footerFormatter, [data], '&nbsp;') || '&nbsp;')
  //     html.push(calculateObjectValue(item, [data], '&nbsp;') || '&nbsp;')

  //     html.push('</div>')
  //     html.push('<div class="fht-cell"></div>')
  //     html.push('</div>')
  //     html.push('</div>')
  //   })

  //   // this.$carouselFooter.find('div').html(html.join(''))
  //   // this.$carouselFooter.show()
  //   // clearTimeout(this.timeoutFooter_)
  //   // this.timeoutFooter_ = setTimeout($.proxy(this.fitFooter, this),
  //   //   this.$el.is(':hidden') ? 100 : 0)
  // }

  // bsCarousel.prototype.fitFooter = function () {
  //   var that = this,
  //     $footerTd,
  //     elWidth,
  //     scrollWidth

  //   clearTimeout(this.timeoutFooter_)
  //   if (this.$el.is(':hidden')) {
  //     this.timeoutFooter_ = setTimeout($.proxy(this.fitFooter, this), 100)
  //     return
  //   }

    // elWidth = this.$el.css('width')
    // scrollWidth = elWidth > this.$carouselBody.width() ? getScrollBarWidth() : 0

    // this.$carouselFooter.css({
    //   'margin-right': scrollWidth
    // }).find('carousel').css('width', elWidth)
    //   .attr('class', this.$el.attr('class'))

    // $footerTd = this.$carouselFooter.find('td')

    // this.$body.find('>div:first-child:not(.no-records-found) > *').each(function (i) {
    //   var $this = $(this)

      // $footerTd.eq(i).find('.fht-cell').width($this.innerWidth())
    // })

    // this.horizontalScroll()
  // }

  // bsCarousel.prototype.horizontalScroll = function () {
  //   var that = this
  //   // horizontal scroll event
  //   // TODO: it's probably better improving the layout than binding to scroll event
  //   this.$carouselBody.off('scroll').on('scroll', function () {
  //     if (that.options.showcaroulselInner && that.options.height) {
  //       that.$carouselcaroulselInner.scrollLeft($(this).scrollLeft())
  //     }

  //     if (that.options.showFooter && !that.options.cardView) {
  //       that.$carouselFooter.scrollLeft($(this).scrollLeft())
  //     }
  //   })
  // }

  // bsCarousel.prototype.toggleitem = function (index, checked, needUpdate) {
  //   if (index === -1) {
  //     return
  //   }
  //   this.items[index].visible = checked
  //   this.initCaroulselInner()
  //   // this.initSearch()
  //   // this.initPagination()
  //   this.initBody()

  //   if (this.options.showitems) {
  //     var $items = this.$toolbar.find('.keep-open input').prop('disabled', false)

  //     if (needUpdate) {
  //       $items.filter(sprintf('[value="%s"]', index)).prop('checked', checked)
  //     }

  //     if ($items.filter(':checked').length <= this.options.minimumCountitems) {
  //       $items.filter(':checked').prop('disabled', true)
  //     }
  //   }
  // }

  bsCarousel.prototype.getVisibleFields = function () {
    var that = this,
      visibleFields = []

    $.each(this.caroulselInner.fields, (j, field) => {
      var item = that.items[that.fieldsitemsIndex[field]]

      if (!item.visible) {
        return
      }
      visibleFields.push(field)
    })
    return visibleFields
  }

  // PUBLIC FUNCTION DEFINITION
  // =======================

  // bsCarousel.prototype.resetView = function (params) {
  //   var padding = 0

  //   if (params && params.height) {
  //     this.options.height = params.height
  //   }

  //   this.$selectAll.prop('checked', this.$selectItem.length > 0 &&
  //     this.$selectItem.length === this.$selectItem.filter(':checked').length)

  //   if (this.options.height) {
  //     var toolbarHeight = this.$toolbar.outerHeight(true),
  //       paginationHeight = this.$pagination.outerHeight(true),
  //       height = this.options.height - toolbarHeight - paginationHeight - 95

  //     this.$carouselContainer.css('height', height + 'px')
  //   }

  //   if (this.options.cardView) {
  //     // remove the element css
  //     this.$el.css('margin-top', '0')
  //     this.$carouselContainer.css('padding-bottom', '0')
  //     this.$carouselFooter.hide()
  //     return
  //   }

  //   if (this.options.showcaroulselInner && this.options.height) {
  //     this.$carouselcaroulselInner.show()
  //     this.resetcaroulselInner()
  //     padding += this.$caroulselInner.outerHeight()
  //   } else {
  //     this.$carouselcaroulselInner.hide()
  //     this.trigger('post-caroulselInner')
  //   }

  //   // if (this.options.showFooter) {
  //   //   this.resetFooter()
  //   //   if (this.options.height) {
  //   //     padding += this.$carouselFooter.outerHeight() + 1
  //   //   }
  //   // }

  //   // Assign the correct sortCarousel arrow
  //   this.getCaret()
  //   this.$carouselContainer.css('padding-bottom', padding + 'px')
  //   this.$carouselContainer.css('padding-top', padding + 'px')
  //   this.trigger('reset-view')
  // }

  bsCarousel.prototype.getData = function (useCurrentPage) {
    var data = this.options.data
    // if (this.searchText || this.options.sortName || !$.isEmptyObject(this.filteritems) || !$.isEmptyObject(this.filteritemsPartial)) {
    if (this.options.sortName || !$.isEmptyObject(this.filteritems) || !$.isEmptyObject(this.filteritemsPartial)) {
      data = this.data
    }

    if (useCurrentPage) {
      return data.slice(this.pageFrom - 1, this.pageTo)
    }

    return data
  }

  bsCarousel.prototype.load = function (data) {
    var fixedScroll = false

    // #431: support pagination
    if (this.options.sidePagination === 'server') {
      this.options.totalRows = data[this.options.totalField]
      fixedScroll = data.fixedScroll
      data = data[this.options.dataField]
    } else if (!$.isArray(data)) { // support fixedScroll
      fixedScroll = data.fixedScroll
      data = data.data
    }

    this.initData(data)
    // this.initSearch()
    // this.initPagination()
    this.initBody(fixedScroll)
  }

  bsCarousel.prototype.append = function (data) {
    this.initData(data, 'append')
    // this.initSearch()
    // this.initPagination()
    // this.initSort()
    this.initBody(true)
  }

  bsCarousel.prototype.prepend = function (data) {
    this.initData(data, 'prepend')
    // this.initSearch()
    // this.initPagination()
    // this.initSort()
    this.initBody(true)
  }

  // bsCarousel.prototype.remove = function (params) {
  //   var len = this.options.data.length,
  //     i, row

  //   if (!params.hasOwnProperty('field') || !params.hasOwnProperty('values')) {
  //     return
  //   }

  //   for (i = len - 1; i >= 0; i--) {
  //     row = this.options.data[i]

  //     if (!row.hasOwnProperty(params.field)) {
  //       continue
  //     }
  //     if ($.inArray(row[params.field], params.values) !== -1) {
  //       this.options.data.splice(i, 1)
  //       if (this.options.sidePagination === 'server') {
  //         this.options.totalRows -= 1
  //       }
  //     }
  //   }

  //   if (len === this.options.data.length) {
  //     return
  //   }

  //   this.initSearch()
  //   this.initPagination()
  //   this.initSort()
  //   this.initBody(true)
  // }

  // bsCarousel.prototype.removeAll = function () {
  //   if (this.options.data.length > 0) {
  //     this.options.data.splice(0, this.options.data.length)
  //     this.initSearch()
  //     this.initPagination()
  //     this.initBody(true)
  //   }
  // }

  bsCarousel.prototype.getRowByUniqueId = function (id) {
    var uniqueId = this.options.uniqueId,
      len = this.options.data.length,
      dataRow = null,
      i, row, rowUniqueId

    for (i = len - 1; i >= 0; i--) {
      row = this.options.data[i]

      if (row.hasOwnProperty(uniqueId)) { // uniqueId is a item
        rowUniqueId = row[uniqueId]
      } else if (row._data.hasOwnProperty(uniqueId)) { // uniqueId is a row data property
        rowUniqueId = row._data[uniqueId]
      } else {
        continue
      }

      if (typeof rowUniqueId === 'string') {
        id = id.toString()
      } else if (typeof rowUniqueId === 'number') {
        if ((Number(rowUniqueId) === rowUniqueId) && (rowUniqueId % 1 === 0)) {
          id = parseInt(id)
        } else if ((rowUniqueId === Number(rowUniqueId)) && (rowUniqueId !== 0)) {
          id = parseFloat(id)
        }
      }

      if (rowUniqueId === id) {
        dataRow = row
        break
      }
    }

    return dataRow
  }

  // bsCarousel.prototype.removeByUniqueId = function (id) {
  //   var len = this.options.data.length,
  //     row = this.getRowByUniqueId(id)

  //   if (row) {
  //     this.options.data.splice(this.options.data.indexOf(row), 1)
  //   }

  //   if (len === this.options.data.length) {
  //     return
  //   }

    // this.initSearch()
    // this.initPagination()
    // this.initBody(true)
 // }

  // bsCarousel.prototype.updateByUniqueId = function (params) {
  //   var that = this
  //   var allParams = $.isArray(params) ? params : [params]

  //   $.each(allParams, (i, params) => {
  //     var rowId

  //     if (!params.hasOwnProperty('id') || !params.hasOwnProperty('row')) {
  //       return
  //     }

  //     rowId = $.inArray(that.getRowByUniqueId(params.id), that.options.data)

  //     if (rowId === -1) {
  //       return
  //     }
  //     $.extend(that.options.data[rowId], params.row)
  //   })

    // this.initSearch()
    // this.initPagination()
    // this.initSort()
    // this.initBody(true)
  // }

  // bsCarousel.prototype.refreshitemTitle = function (params) {
  //   if (!params.hasOwnProperty('field') || !params.hasOwnProperty('title')) {
  //     return
  //   }

  //   this.items[this.fieldsitemsIndex[params.field]].title = this.options.escape
  //     ? escapeHTML(params.title)
  //     : params.title

  //   if (this.items[this.fieldsitemsIndex[params.field]].visible) {
  //     var caroulselInner = this.options.height !== undefined ? this.$carouselcaroulselInner : this.$caroulselInner
  //     caroulselInner.find('th[data-field]').each(function (i) {
  //       if ($(this).data('field') === params.field) {
  //         $($(this).find(".th-inner")[0]).text(params.title)
  //         return false
  //       }
  //     })
  //   }
  // }

  // bsCarousel.prototype.insertRow = function (params) {
  //   if (!params.hasOwnProperty('index') || !params.hasOwnProperty('row')) {
  //     return
  //   }
  //   this.options.data.splice(params.index, 0, params.row)
  //   this.initSearch()
  //   this.initPagination()
  //   this.initSort()
  //   this.initBody(true)
  // }

  // bsCarousel.prototype.updateRow = function (params) {
  //   var that = this
  //   var allParams = $.isArray(params) ? params : [params]

  //   $.each(allParams, (i, params) => {
  //     if (!params.hasOwnProperty('index') || !params.hasOwnProperty('row')) {
  //       return
  //     }
  //     $.extend(that.options.data[params.index], params.row)
  //   })

  //   this.initSearch()
  //   this.initPagination()
  //   this.initSort()
  //   this.initBody(true)
  // }

  // bsCarousel.prototype.initHiddenRows = function () {
  //   this.hiddenRows = []
  // }

  // bsCarousel.prototype.showRow = function (params) {
  //   this.toggleRow(params, true)
  // }

  // bsCarousel.prototype.hideRow = function (params) {
  //   this.toggleRow(params, false)
  // }

  // bsCarousel.prototype.toggleRow = function (params, visible) {
  //   var row, index

  //   if (params.hasOwnProperty('index')) {
  //     row = this.getData()[params.index]
  //   } else if (params.hasOwnProperty('uniqueId')) {
  //     row = this.getRowByUniqueId(params.uniqueId)
  //   }

  //   if (!row) {
  //     return
  //   }

  //   index = $.inArray(row, this.hiddenRows)

  //   if (!visible && index === -1) {
  //     this.hiddenRows.push(row)
  //   } else if (visible && index > -1) {
  //     this.hiddenRows.splice(index, 1)
  //   }
  //   this.initBody(true)
  // }

  // bsCarousel.prototype.getHiddenRows = function (show) {
  //   var that = this,
  //     data = this.getData(),
  //     rows = []

  //   $.each(data, (i, row) => {
  //     if ($.inArray(row, that.hiddenRows) > -1) {
  //       rows.push(row)
  //     }
  //   })
  //   this.hiddenRows = rows
  //   return rows
  // }

  // bsCarousel.prototype.mergeCells = function (options) {
  //   var row = options.index,
  //     col = $.inArray(options.field, this.getVisibleFields()),
  //     rowspan = options.rowspan || 1,
  //     colspan = options.colspan || 1,
  //     i, j,
  //     $tr = this.$body.find('>tr'),
  //     $td

  //   if (this.options.detailView && !this.options.cardView) {
  //     col += 1
  //   }

  //   $td = $tr.eq(row).find('>td').eq(col)

  //   if (row < 0 || col < 0 || row >= this.data.length) {
  //     return
  //   }

  //   for (i = row; i < row + rowspan; i++) {
  //     for (j = col; j < col + colspan; j++) {
  //       $tr.eq(i).find('>td').eq(j).hide()
  //     }
  //   }

  //   $td.attr('rowspan', rowspan).attr('colspan', colspan).show()
  // }

  // bsCarousel.prototype.updateCell = function (params) {
  //   if (!params.hasOwnProperty('index') ||
  //     !params.hasOwnProperty('field') ||
  //     !params.hasOwnProperty('value')) {
  //     return
  //   }
  //   this.data[params.index][params.field] = params.value

  //   if (params.reinit === false) {
  //     return
  //   }
  //   this.initSort()
  //   this.initBody(true)
  // }

  // bsCarousel.prototype.updateCellById = function (params) {
  //   var that = this
  //   if (!params.hasOwnProperty('id') ||
  //     !params.hasOwnProperty('field') ||
  //     !params.hasOwnProperty('value')) {
  //     return
  //   }
  //   var allParams = $.isArray(params) ? params : [params]

  //   $.each(allParams, (i, params) => {
  //     var rowId

  //     rowId = $.inArray(that.getRowByUniqueId(params.id), that.options.data)

  //     if (rowId === -1) {
  //       return
  //     }
  //     that.data[rowId][params.field] = params.value
  //   })

  //   if (params.reinit === false) {
  //     return
  //   }
  //   this.initSort()
  //   this.initBody(true)
  // }

  bsCarousel.prototype.getOptions = function () {
    //Deep copy
    return $.extend(true, {}, this.options)
  }

  bsCarousel.prototype.getSelections = function () {
    var that = this

    return $.grep(this.options.data, (row) => {
      // fix #2424: from html with checkbox
      return row[that.caroulselInner.stateField] === true
    })
  }

  bsCarousel.prototype.getAllSelections = function () {
    var that = this

    return $.grep(this.options.data, (row) => {
      return row[that.caroulselInner.stateField]
    })
  }

  // bsCarousel.prototype.checkAll = function () {
  //   this.checkAll_(true)
  // }

  // bsCarousel.prototype.uncheckAll = function () {
  //   this.checkAll_(false)
  // }

  // bsCarousel.prototype.checkInvert = function () {
  //   var that = this
  //   var rows = that.$selectItem.filter(':enabled')
  //   var checked = rows.filter(':checked')
  //   rows.each(function () {
  //     $(this).prop('checked', !$(this).prop('checked'))
  //   })
  //   that.updateRows()
  //   that.updateSelected()
  //   that.trigger('uncheck-some', checked)
  //   checked = that.getSelections()
  //   that.trigger('check-some', checked)
  // }

  // bsCarousel.prototype.checkAll_ = function (checked) {
  //   var rows
  //   if (!checked) {
  //     rows = this.getSelections()
  //   }
  //   this.$selectAll.add(this.$selectAll_).prop('checked', checked)
  //   this.$selectItem.filter(':enabled').prop('checked', checked)
  //   this.updateRows()
  //   if (checked) {
  //     rows = this.getSelections()
  //   }
  //   this.trigger(checked ? 'check-all' : 'uncheck-all', rows)
  // }

  // bsCarousel.prototype.check = function (index) {
  //   this.check_(true, index)
  // }

  // bsCarousel.prototype.uncheck = function (index) {
  //   this.check_(false, index)
  // }

  // bsCarousel.prototype.check_ = function (checked, index) {
  //   var $el = this.$selectItem.filter(sprintf('[data-index="%s"]', index)).prop('checked', checked)
  //   this.data[index][this.caroulselInner.stateField] = checked
  //   this.updateSelected()
  //   this.trigger(checked ? 'check' : 'uncheck', this.data[index], $el)
  // }

  // bsCarousel.prototype.checkBy = function (obj) {
  //   this.checkBy_(true, obj)
  // }

  // bsCarousel.prototype.uncheckBy = function (obj) {
  //   this.checkBy_(false, obj)
  // }

  // bsCarousel.prototype.checkBy_ = function (checked, obj) {
  //   if (!obj.hasOwnProperty('field') || !obj.hasOwnProperty('values')) {
  //     return
  //   }

  //   var that = this,
  //     rows = []
  //   $.each(this.options.data, (index, row) => {
  //     if (!row.hasOwnProperty(obj.field)) {
  //       return false
  //     }
  //     if ($.inArray(row[obj.field], obj.values) !== -1) {
  //       var $el = that.$selectItem.filter(':enabled')
  //         .filter(sprintf('[data-index="%s"]', index)).prop('checked', checked)
  //       row[that.caroulselInner.stateField] = checked
  //       rows.push(row)
  //       that.trigger(checked ? 'check' : 'uncheck', row, $el)
  //     }
  //   })
  //   this.updateSelected()
  //   this.trigger(checked ? 'check-some' : 'uncheck-some', rows)
  // }

  bsCarousel.prototype.destroy = function () {
    this.$el.insertBefore(this.$container)
    $(this.options.toolbar).insertBefore(this.$el)
    this.$container.next().remove()
    this.$container.remove()
    this.$el.html(this.$el_.html())
      .css('margin-top', '0')
      .attr('class', this.$el_.attr('class') || '') // reset the class
  }

  bsCarousel.prototype.showLoading = function () {
    this.$carouselLoading.show()
  }

  bsCarousel.prototype.hideLoading = function () {
    this.$carouselLoading.hide()
  }

  // bsCarousel.prototype.togglePagination = function () {
  //   this.options.pagination = !this.options.pagination
  //   var button = this.$toolbar.find('button[name="paginationSwitch"] i')
  //   if (this.options.pagination) {
  //     button.attr("class", this.options.iconsPrefix + " " + this.options.icons.paginationSwitchDown)
  //   } else {
  //     button.attr("class", this.options.iconsPrefix + " " + this.options.icons.paginationSwitchUp)
  //   }
  //   this.updatePagination()
  // }

  // bsCarousel.prototype.refresh = function (params) {
  //   if (params && params.url) {
  //     this.options.url = params.url
  //   }
  //   if (params && params.pageNumber) {
  //     this.options.pageNumber = params.pageNumber
  //   }
  //   if (params && params.pageSize) {
  //     this.options.pageSize = params.pageSize
  //   }
  //   this.initServer(params && params.silent,
  //     params && params.query, params && params.url)
  //   this.trigger('refresh', params)
  // }

  // bsCarousel.prototype.resetWidth = function () {
  //   if (this.options.showcaroulselInner && this.options.height) {
  //     this.fitcaroulselInner()
  //   }
  //   if (this.options.showFooter && !that.options.cardView) {
  //     this.fitFooter()
  //   }
  // }

  bsCarousel.prototype.showitem = function (field) {
    this.toggleitem(this.fieldsitemsIndex[field], true, true)
  }

  bsCarousel.prototype.hideitem = function (field) {
    this.toggleitem(this.fieldsitemsIndex[field], false, true)
  }

  // bsCarousel.prototype.getHiddenitems = function () {
  //   return $.grep(this.items, (item) => {
  //     return !item.visible
  //   })
  // }

  // bsCarousel.prototype.getVisibleitems = function () {
  //   return $.grep(this.items, (item) => {
  //     return item.visible
  //   })
  // }

  // bsCarousel.prototype.toggleAllitems = function (visible) {
  //   var that = this
  //   $.each(this.items, (i, item) => {
  //     that.items[i].visible = visible
  // //   })

  //   this.initCaroulselInner()
  //   this.initSearch()
  //   this.initPagination()
  //   this.initBody()
  //   if (this.options.showitems) {
  //     var $items = this.$toolbar.find('.keep-open input').prop('disabled', false)

  //     if ($items.filter(':checked').length <= this.options.minimumCountitems) {
  //       $items.filter(':checked').prop('disabled', true)
  //     }
  //   }
  // }

  bsCarousel.prototype.showAllitems = function () {
    this.toggleAllitems(true)
  }

  bsCarousel.prototype.hideAllitems = function () {
    this.toggleAllitems(false)
  }

  // bsCarousel.prototype.filterBy = function (items) {
  //   this.filteritems = $.isEmptyObject(items) ? {} : items
  //   this.options.pageNumber = 1
  //   this.initSearch()
  //   this.updatePagination()
  // }

  // bsCarousel.prototype.scrollTo = function (value) {
  //   if (typeof value === 'string') {
  //     value = value === 'bottom' ? this.$carouselBody[0].scrollHeight : 0
  //   }
  //   if (typeof value === 'number') {
  //     this.$carouselBody.scrollTop(value)
  //   }
  //   if (typeof value === 'undefined') {
  //     return this.$carouselBody.scrollTop()
  //   }
  // }

  // bsCarousel.prototype.getScrollPosition = function () {
  //   return this.scrollTo()
  // }

  // bsCarousel.prototype.selectPage = function (page) {
  //   if (page > 0 && page <= this.options.totalPages) {
  //     this.options.pageNumber = page
  //     this.updatePagination()
  //   }
  // }

  // bsCarousel.prototype.prevPage = function () {
  //   if (this.options.pageNumber > 1) {
  //     this.options.pageNumber--
  //     this.updatePagination()
  //   }
  // }

  // bsCarousel.prototype.nextPage = function () {
  //   if (this.options.pageNumber < this.options.totalPages) {
  //     this.options.pageNumber++
  //     this.updatePagination()
  //   }
  // }

  // bsCarousel.prototype.toggleView = function () {
  //   this.options.cardView = !this.options.cardView
  //   this.initCaroulselInner()
  //   // Fixed remove toolbar when click cardView button.
  //   //that.initToolbar();
  //   this.initBody()
  //   this.trigger('toggle', this.options.cardView)
  // }

  // bsCarousel.prototype.refreshOptions = function (options) {
  //   //If the objects are equivalent then avoid the call of destroy / init methods
  //   if (compareObjects(this.options, options, true)) {
  //     return
  //   }
  //   this.options = $.extend(this.options, options)
  //   this.trigger('refresh-options', this.options)
  //   this.destroy()
  //   this.init()
  // }

  // bsCarousel.prototype.resetSearch = function (text) {
  //   var $search = this.$toolbar.find('.search input')
  //   $search.val(text || '')
  //   this.onSearch({ currentTarget: $search })
  // }

  // bsCarousel.prototype.expandRow_ = function (expand, index) {
  //   var $tr = this.$body.find(sprintf('> tr[data-index="%s"]', index))
  //   if ($tr.next().is('tr.detail-view') === (expand ? false : true)) {
  //     $tr.find('> td > .detail-icon').click()
  //   }
  // }

  // bsCarousel.prototype.expandRow = function (index) {
  //   this.expandRow_(true, index)
  // }

  // bsCarousel.prototype.collapseRow = function (index) {
  //   this.expandRow_(false, index)
  // }

  // bsCarousel.prototype.expandAllRows = function (isSubcarousel) {
  //   if (isSubcarousel) {
  //     var $tr = this.$body.find(sprintf('> tr[data-index="%s"]', 0)),
  //       that = this,
  //       detailIcon = null,
  //       executeInterval = false,
  //       idInterval = -1

  //     if (!$tr.next().is('tr.detail-view')) {
  //       $tr.find('> td > .detail-icon').click()
  //       executeInterval = true
  //     } else if (!$tr.next().next().is('tr.detail-view')) {
  //       $tr.next().find(".detail-icon").click()
  //       executeInterval = true
  //     }

  //     if (executeInterval) {
  //       try {
  //         idInterval = setInterval(() => {
  //           detailIcon = that.$body.find("tr.detail-view").last().find(".detail-icon")
  //           if (detailIcon.length > 0) {
  //             detailIcon.click()
  //           } else {
  //             clearInterval(idInterval)
  //           }
  //         }, 1)
  //       } catch (ex) {
  //         clearInterval(idInterval)
  //       }
  //     }
  //   } else {
  //     var trs = this.$body.children()
  //     for (var i = 0; i < trs.length; i++) {
  //       this.expandRow_(true, $(trs[i]).data("index"))
  //     }
  //   }
  // }

  // bsCarousel.prototype.collapseAllRows = function (isSubcarousel) {
  //   if (isSubcarousel) {
  //     this.expandRow_(false, 0)
  //   } else {
  //     var trs = this.$body.children()
  //     for (var i = 0; i < trs.length; i++) {
  //       this.expandRow_(false, $(trs[i]).data("index"))
  //     }
  //   }
  // }

  bsCarousel.prototype.updateFormatText = function (name, text) {
    if (this.options[sprintf('format%s', name)]) {
      if (typeof text === 'string') {
        this.options[sprintf('format%s', name)] = function () {
          return text
        }
      } else if (typeof text === 'function') {
        this.options[sprintf('format%s', name)] = text
      }
    }
    // this.initToolbar()
    // this.initPagination()
    // this.initBody()
  }

  // BOOTSTRAP carousel PLUGIN DEFINITION
  // =======================

  var allowedMethods = [
    'carousel("cycle")', //Goes through the carousel items from left to right
    'carousel()', // activates the carousel with an option
    'carousel("pause")', //Stops the carousel from going through items
    'carousel(111)', // goes to a specified item (zero-based: first item is 0, second item is 1, etc..)
    'carousel("prev")', // goes to previous item
    'carousel("next")', //goes to the next item
    'getOptions',
    'getSelections', 'getAllSelections', 'getData',
    'load', 'append', 'prepend', 'remove', 'removeAll',
    'insertRow', 'updateRow', 'updateCell', 'updateByUniqueId', 'removeByUniqueId',
    'getRowByUniqueId', 'showRow', 'hideRow', 'getHiddenRows',
    'mergeCells', 'refreshitemTitle',
    'checkAll', 'uncheckAll', 'checkInvert',
    'check', 'uncheck',
    'checkBy', 'uncheckBy',
    'refresh',
    'resetView',
    'resetWidth',
    'destroy',
    'showLoading', 'hideLoading',
    'showitem', 'hideitem', 'getHiddenitems', 'getVisibleitems',
    'showAllitems', 'hideAllitems',
    'filterBy',
    'scrollTo',
    'getScrollPosition',
    'selectPage', 'prevPage', 'nextPage',
    'togglePagination',
    'toggleView',
    'refreshOptions',
    'resetSearch',
    'expandRow', 'collapseRow', 'expandAllRows', 'collapseAllRows',
    'updateFormatText', 'updateCellById'
  ]

  $.fn.bsCarousel = function (option) {
    var value,
      args = Array.prototype.slice.call(arguments, 1)

    this.each(function () {
      var $this = $(this),
        data = $this.data('bootstrap.carousel'),
        options = $.extend({}, bsCarousel.DEFAULTS, $this.data(),
          typeof option === 'object' && option)

      if (typeof option === 'string') {
        if ($.inArray(option, allowedMethods) < 0) {
          throw new Error("Unknown method: " + option)
        }

        if (!data) {
          return
        }

        value = data[option].apply(data, args)

        if (option === 'destroy') {
          $this.removeData('bootstrap.carousel')
        }
      }

      if (!data) {
        $this.data('bootstrap.carousel', (data = new bsCarousel(this, options)))
      }
    })

    return typeof value === 'undefined' ? this : value
  }

  $.fn.bsCarousel.Constructor = bsCarousel
  $.fn.bsCarousel.defaults = bsCarousel.DEFAULTS
  $.fn.bsCarousel.itemDefaults = bsCarousel.item_DEFAULTS
  $.fn.bsCarousel.locales = bsCarousel.LOCALES
  $.fn.bsCarousel.methods = allowedMethods
  $.fn.bsCarousel.utils = {
    bootstrapVersion,
    sprintf,
    compareObjects,
    calculateObjectValue,
    getItemField,
    objectKeys,
    isIEBrowser
  }

  // BOOTSTRAP carousel INIT
  // =======================

  $(() => {
    $('[class="carousel"]').bsCarousel()
  })
})(jQuery)
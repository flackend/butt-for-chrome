var _createClass = function() {
  /**
   * @param {Function} owner
   * @param {Object} descriptor
   * @return {undefined}
   */
  function defineProperty(owner, descriptor) {
    var k;
    for (k in descriptor) {
      var property = descriptor[k];
      /** @type {boolean} */
      property.configurable = true;
      if (property.value) {
        /** @type {boolean} */
        property.writable = true;
      }
    }
    Object.defineProperties(owner, descriptor);
  }
  return function(owner, file, current) {
    return file && defineProperty(owner.prototype, file), current && defineProperty(owner, current), owner;
  };
}();
/**
 * @param {Object} node
 * @param {string} key
 * @param {?} scope
 * @return {?}
 */
var _get = function a$$2(node, key, scope) {
  /** @type {(ObjectPropertyDescriptor|undefined)} */
  var descriptor = Object.getOwnPropertyDescriptor(node, key);
  if (void 0 === descriptor) {
    /** @type {(Object|null)} */
    var c = Object.getPrototypeOf(node);
    return null === c ? void 0 : a$$2(c, key, scope);
  }
  if ("value" in descriptor && descriptor.writable) {
    return descriptor.value;
  }
  /** @type {(function (): ?|undefined)} */
  var getter = descriptor.get;
  return void 0 === getter ? void 0 : getter.call(scope);
};
/**
 * @param {Function} Class
 * @param {Object} extend
 * @return {undefined}
 */
var _inherits = function(Class, extend) {
  if ("function" != typeof extend && null !== extend) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof extend);
  }
  /** @type {Object} */
  Class.prototype = Object.create(extend && extend.prototype, {
    constructor : {
      /** @type {Function} */
      value : Class,
      enumerable : false,
      writable : true,
      configurable : true
    }
  });
  if (extend) {
    /** @type {Object} */
    Class.__proto__ = extend;
  }
};
/**
 * @param {?} dataAndEvents
 * @param {Function} Class
 * @return {undefined}
 */
var _classCallCheck = function(dataAndEvents, Class) {
  if (!(dataAndEvents instanceof Class)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
var Delight = {};
/** @type {string} */
Delight.VideoSource = "http://cdn.usedelight.com";
/** @type {Element} */
var ga = document.createElement("script");
ga.type = "text/javascript", ga.async = true, ga.src = "https://ssl.google-analytics.com/ga.js";
var s = document.getElementsByTagName("script")[0];
s.parentNode.insertBefore(ga, s);
/** @type {Array} */
var _gaq = _gaq || [];
_gaq.push(["_setAccount", "UA-69166516-1"]), _gaq.push(["_trackPageview"]);
/**
 * @param {string} name
 * @param {?} data
 * @return {?}
 */
var parseTemplate = function(name, data) {
  return $($.parseHTML(Handlebars.templates[name](data).trim()));
};
Handlebars.registerHelper("i18n", function(err, opt_args) {
  return chrome.i18n.getMessage(err, opt_args);
}), Handlebars.registerHelper("ifCond", function(a, dataAndEvents, b, options) {
  switch(dataAndEvents) {
    case "==":
      return a == b ? options.fn(this) : options.inverse(this);
    case "===":
      return a === b ? options.fn(this) : options.inverse(this);
    case "<":
      return b > a ? options.fn(this) : options.inverse(this);
    case "<=":
      return b >= a ? options.fn(this) : options.inverse(this);
    case ">":
      return a > b ? options.fn(this) : options.inverse(this);
    case ">=":
      return a >= b ? options.fn(this) : options.inverse(this);
    case "&&":
      return a && b ? options.fn(this) : options.inverse(this);
    case "||":
      return a || b ? options.fn(this) : options.inverse(this);
    default:
      return options.inverse(this);
  }
}), function($) {
  /**
   * @param {?} opt_attributes
   * @return {?}
   */
  $.fn.localClock = function(opt_attributes) {
    var options;
    var formatDate;
    if (options = $.extend({
      offset : null,
      clock : 12,
      watch : true,
      timer : 6E4
    }, opt_attributes), formatDate = function() {
      var hours;
      var ampm;
      /** @type {Date} */
      var relative_to = new Date;
      /** @type {number} */
      var sum = relative_to.getTime();
      /** @type {number} */
      var value = 6E4 * relative_to.getTimezoneOffset();
      /** @type {number} */
      var tval = sum + value;
      /** @type {Date} */
      var now = new Date(tval + 36E5 * options.offset);
      /** @type {number} */
      var str = now.getMinutes();
      /** @type {string} */
      var m = String(str);
      return 1 === m.length && (str = "0" + m), 24 === options.clock ? "" + now.getHours() + ":" + str : 12 === options.clock ? (hours = now.getHours(), ampm = hours >= 12 ? "pm" : "am", hours = hours > 12 ? hours - 12 : hours, hours = "00" == hours ? 12 : hours, "" + hours + ":" + str + ampm) : void 0;
    }, this.text(formatDate()), options.watch) {
      var cell = this;
      setInterval(function() {
        cell.text(formatDate());
      }, options.timer);
    }
    return this;
  };
}(jQuery), Delight.weather = {
  endpoint : "http://usedelight.com/api/weather/?format=json",
  no_connect : false,
  icons : {
    395 : "cloud-snow",
    392 : "cloud-snow",
    179 : "cloud-snow",
    230 : "snow",
    227 : "snow",
    338 : "snow",
    371 : "snow",
    368 : "snow",
    335 : "snow",
    332 : "snow",
    329 : "snow",
    326 : "snow",
    323 : "snow",
    182 : "cloud-sleet",
    320 : "cloud-sleet",
    317 : "cloud-sleet",
    365 : "cloud-sleet",
    362 : "cloud-sleet",
    350 : "cloud-sleet",
    377 : "rain",
    374 : "rain",
    389 : "rain",
    386 : "rain",
    359 : "rain",
    356 : "rain",
    353 : "rain",
    308 : "rain",
    305 : "rain",
    302 : "rain",
    299 : "rain",
    296 : "cloud-rain",
    293 : "cloud-rain",
    284 : "cloud-rain",
    281 : "cloud-rain",
    266 : "cloud-rain",
    263 : "cloud-rain",
    314 : "cloud-rain",
    311 : "cloud-rain",
    185 : "cloud-rain",
    176 : "cloud-rain",
    143 : "cloud-rain",
    260 : "haze",
    248 : "haze",
    200 : "cloud-lightning",
    122 : "cloud",
    119 : "cloud",
    116 : "cloud-sun",
    113 : "cloud"
  }
}, function($) {
  /** @type {string} */
  var event = "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend";
  /** @type {Array} */
  var props = ["transition-duration", "-moz-transition-duration", "-webkit-transition-duration", "-ms-transition-duration", "-o-transition-duration", "-khtml-transition-duration"];
  /**
   * @param {string} value
   * @return {?}
   */
  var callback = function(value) {
    value = value.replace(/\s/, "");
    var isFunction = window.parseFloat(value);
    return value.match(/[^m]s$/i) ? 1E3 * isFunction : isFunction;
  };
  /**
   * @param {Object} input
   * @return {?}
   */
  var check = function(input) {
    /** @type {number} */
    var value = 0;
    /** @type {number} */
    var i = 0;
    for (;i < props.length;i++) {
      var param = input.css(props[i]);
      if (param) {
        if (-1 !== param.indexOf(",")) {
          var codeSegments = param.split(",");
          var args = function() {
            /** @type {Array} */
            var assigns = [];
            /** @type {number} */
            var i = 0;
            for (;i < codeSegments.length;i++) {
              var vvar = callback(codeSegments[i]);
              assigns.push(vvar);
            }
            return assigns;
          }();
          /** @type {number} */
          value = Math.max.apply(Math, args);
        } else {
          value = callback(param);
        }
        break;
      }
    }
    return value;
  };
  $.event.special.trend = {
    /**
     * @param {(Object|string)} objects
     * @return {undefined}
     */
    add : function(objects) {
      var node = $(this);
      /** @type {boolean} */
      var f = false;
      node.data("trend", true);
      var quietMillis = check(node) + 20;
      /**
       * @param {Function} event
       * @return {undefined}
       */
      var handler = function(event) {
        if (!f) {
          if (!(event && event.srcElement !== node[0])) {
            node.data("trend", false);
            /** @type {boolean} */
            f = true;
            if (objects.handler) {
              objects.handler();
            }
          }
        }
      };
      node.one(event, handler);
      node.data("trend-timeout", window.setTimeout(handler, quietMillis));
    },
    /**
     * @param {?} keepData
     * @return {undefined}
     */
    remove : function(keepData) {
      var el = $(this);
      el.off(event);
      window.clearTimeout(el.data("trend-timeout"));
    }
  };
}(jQuery), function(factory) {
  if ("function" == typeof define && define.amd) {
    define(["jquery"], factory);
  } else {
    if ("object" == typeof exports) {
      /** @type {function (Object): undefined} */
      module.exports = factory;
    } else {
      factory(jQuery);
    }
  }
}(function($) {
  /**
   * @param {Object} event
   * @return {?}
   */
  function handler(event) {
    var orgEvent = event || window.event;
    /** @type {Array.<?>} */
    var args = __slice.call(arguments, 1);
    /** @type {number} */
    var delta = 0;
    /** @type {number} */
    var deltaX = 0;
    /** @type {number} */
    var deltaY = 0;
    /** @type {number} */
    var absDelta = 0;
    /** @type {number} */
    var x = 0;
    /** @type {number} */
    var y = 0;
    if (event = $.event.fix(orgEvent), event.type = "mousewheel", "detail" in orgEvent && (deltaY = -1 * orgEvent.detail), "wheelDelta" in orgEvent && (deltaY = orgEvent.wheelDelta), "wheelDeltaY" in orgEvent && (deltaY = orgEvent.wheelDeltaY), "wheelDeltaX" in orgEvent && (deltaX = -1 * orgEvent.wheelDeltaX), "axis" in orgEvent && (orgEvent.axis === orgEvent.HORIZONTAL_AXIS && (deltaX = -1 * deltaY, deltaY = 0)), delta = 0 === deltaY ? deltaX : deltaY, "deltaY" in orgEvent && (deltaY = -1 * orgEvent.deltaY,
    delta = deltaY), "deltaX" in orgEvent && (deltaX = orgEvent.deltaX, 0 === deltaY && (delta = -1 * deltaX)), 0 !== deltaY || 0 !== deltaX) {
      if (1 === orgEvent.deltaMode) {
        var lineHeight = $.data(this, "mousewheel-line-height");
        delta *= lineHeight;
        deltaY *= lineHeight;
        deltaX *= lineHeight;
      } else {
        if (2 === orgEvent.deltaMode) {
          var pageHeight = $.data(this, "mousewheel-page-height");
          delta *= pageHeight;
          deltaY *= pageHeight;
          deltaX *= pageHeight;
        }
      }
      if (absDelta = Math.max(Math.abs(deltaY), Math.abs(deltaX)), (!lowestDelta || lowestDelta > absDelta) && (lowestDelta = absDelta, shouldAdjustOldDeltas(orgEvent, absDelta) && (lowestDelta /= 40)), shouldAdjustOldDeltas(orgEvent, absDelta) && (delta /= 40, deltaX /= 40, deltaY /= 40), delta = Math[delta >= 1 ? "floor" : "ceil"](delta / lowestDelta), deltaX = Math[deltaX >= 1 ? "floor" : "ceil"](deltaX / lowestDelta), deltaY = Math[deltaY >= 1 ? "floor" : "ceil"](deltaY / lowestDelta), special.settings.normalizeOffset &&
      this.getBoundingClientRect) {
        var rect = this.getBoundingClientRect();
        /** @type {number} */
        x = event.clientX - rect.left;
        /** @type {number} */
        y = event.clientY - rect.top;
      }
      return event.deltaX = deltaX, event.deltaY = deltaY, event.deltaFactor = lowestDelta, event.offsetX = x, event.offsetY = y, event.deltaMode = 0, args.unshift(event, delta, deltaX, deltaY), timer && clearTimeout(timer), timer = setTimeout(next, 200), ($.event.dispatch || $.event.handle).apply(this, args);
    }
  }
  /**
   * @return {undefined}
   */
  function next() {
    /** @type {null} */
    lowestDelta = null;
  }
  /**
   * @param {Event} orgEvent
   * @param {number} absDelta
   * @return {?}
   */
  function shouldAdjustOldDeltas(orgEvent, absDelta) {
    return special.settings.adjustOldDeltas && ("mousewheel" === orgEvent.type && absDelta % 120 === 0);
  }
  var timer;
  var lowestDelta;
  /** @type {Array} */
  var toFix = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"];
  /** @type {Array} */
  var toBind = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"];
  /** @type {function (this:(Array.<T>|string|{length: number}), *=, *=): Array.<T>} */
  var __slice = Array.prototype.slice;
  if ($.event.fixHooks) {
    /** @type {number} */
    var i = toFix.length;
    for (;i;) {
      $.event.fixHooks[toFix[--i]] = $.event.mouseHooks;
    }
  }
  var special = $.event.special.mousewheel = {
    version : "3.1.12",
    /**
     * @return {undefined}
     */
    setup : function() {
      if (this.addEventListener) {
        /** @type {number} */
        var i = toBind.length;
        for (;i;) {
          this.addEventListener(toBind[--i], handler, false);
        }
      } else {
        /** @type {function (Object): ?} */
        this.onmousewheel = handler;
      }
      $.data(this, "mousewheel-line-height", special.getLineHeight(this));
      $.data(this, "mousewheel-page-height", special.getPageHeight(this));
    },
    /**
     * @return {undefined}
     */
    teardown : function() {
      if (this.removeEventListener) {
        /** @type {number} */
        var i = toBind.length;
        for (;i;) {
          this.removeEventListener(toBind[--i], handler, false);
        }
      } else {
        /** @type {null} */
        this.onmousewheel = null;
      }
      $.removeData(this, "mousewheel-line-height");
      $.removeData(this, "mousewheel-page-height");
    },
    /**
     * @param {?} elem
     * @return {?}
     */
    getLineHeight : function(elem) {
      var parent = $(elem);
      var elm = parent["offsetParent" in $.fn ? "offsetParent" : "parent"]();
      return elm.length || (elm = $("body")), parseInt(elm.css("fontSize"), 10) || (parseInt(parent.css("fontSize"), 10) || 16);
    },
    /**
     * @param {?} element
     * @return {?}
     */
    getPageHeight : function(element) {
      return $(element).height();
    },
    settings : {
      adjustOldDeltas : true,
      normalizeOffset : true
    }
  };
  $.fn.extend({
    /**
     * @param {?} fn
     * @return {?}
     */
    mousewheel : function(fn) {
      return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
    },
    /**
     * @param {?} fn
     * @return {?}
     */
    unmousewheel : function(fn) {
      return this.unbind("mousewheel", fn);
    }
  });
}), Handlebars.templates["no-connection"] = Handlebars.compile('\n  <div class="no-connection-container">\n    <svg><use xlink:href="#no-connection"></use></svg>\n    <p>{{i18n "no_connection"}}</p>\n  </div>\n'), Handlebars.templates["loading-video"] = Handlebars.compile('\n  <div class="loading-container">\n    <div class="sparkles">\n      <svg class="load-sparkle purple"><use xlink:href="#sparkle-purple"></use></svg>\n      <svg class="load-sparkle orange"><use xlink:href="#sparkle-orange"></use></svg>\n      <svg class="load-sparkle green"><use xlink:href="#sparkle-green"></use></svg>\n    </div>\n\n    <p>{{i18n "loading_videos"}}</p>\n  </div>\n'),
Handlebars.templates.header = Handlebars.compile('\n  <header class="page-header">\n    <div class="header-top-sites">\n      <div class="top-sites-inner" data-setting="topsites"></div>\n    </div>\n\n    <div class="header-utilities">\n      <div class="battery-mode">\n        <svg><use xlink:href="#battery"></use></svg>\n        <span class="note">{{i18n \'battery_mode\'}}</span>\n      </div>\n\n      <div class="chrome-launchers">\n        <div class="launchers-inner" data-setting="launchers">\n          <a data-href="chrome://apps">{{i18n "link_apps"}}</a>\n          <a data-href="chrome://bookmarks">{{i18n "link_bookmarks"}}</a>\n          <a data-href="chrome://history">{{i18n "link_history"}}</a>\n        </div>\n      </div>\n\n      <a href="#" class="more-menu-toggle">\n        <span class="more-dots"></span>\n      </a>\n\n      <div class="header-more-dropdown">\n        <p class="title">{{i18n "title_settings"}}</p>\n\n        <div class="toggles-container">\n          <p class="settings-toggle" data-toggle="topsites">\n            {{i18n "toggle_topsites"}}\n            <span class="settings-toggle-icon">\n              <svg><use xlink:href="#menu-eye"></use></svg>\n            </span>\n          </p>\n          <p class="settings-toggle" data-toggle="launchers">\n            {{i18n "toggle_launchers"}}\n            <span class="settings-toggle-icon">\n              <svg><use xlink:href="#menu-eye"></use></svg>\n            </span>\n          </p>\n          <p class="settings-toggle" data-toggle="weather">\n            {{i18n "toggle_weather"}}\n            <span class="settings-toggle-icon">\n              <svg><use xlink:href="#menu-eye"></use></svg>\n            </span>\n          </p>\n          <p class="settings-toggle" data-toggle="credits">\n            {{i18n "toggle_credits"}}\n            <span class="settings-toggle-icon">\n              <svg><use xlink:href="#menu-eye"></use></svg>\n            </span>\n          </p>\n          <p class="settings-toggle" data-toggle="video">\n            {{i18n "toggle_video"}}\n            <span class="settings-toggle-icon">\n              <svg><use xlink:href="#menu-eye"></use></svg>\n            </span>\n          </p>\n        </div>\n\n        <a href="http://bit.ly/1XCLFq5" class="tool-link">{{i18n "sponsor_title"}}</a>\n        <a href="https://chrome.google.com/webstore/detail/delight-for-chrome/hehbgjdnbibkndghdlilefececadokpb/reviews" class="tool-link">{{i18n "link_review"}}</a>\n\n        <a class="tool-link about-toggle">\n          {{i18n "link_about"}}\n          <span class="about-arrow"><span>\n        </a>\n\n        <div class="about-container">\n          <p>Delight is lovingly made by <a href="https://twitter.com/williamchanner">@williamchanner</a> and <a href="https://twitter.com/jodyheavener">@jodyheavener</a>.</p>\n          <p>Twitter: <a href="https://twitter.com/usedelight">@usedelight</a><br />Email: <a href="mailto:hello@panda.network">hello@panda.network</a></p>\n          <div class="about-footer">\n            <div class="extension">\n              <a class="panda-icon" href="http://panda.network/">\n                <svg><use xlink:href="#panda-icon"></use></svg>\n              </a>\n              <p class="version">v1.0.5</p>\n            </div>\n            <div class="share">\n              <span class="share-button" data-share="https://www.facebook.com/sharer/sharer.php?u=http://usedelight.com/"><svg><use xlink:href="#share-facebook"></use></svg></span>\n              <span class="share-button" data-share="https://twitter.com/intent/tweet?text=Replace%20the%20new%20tab%20with%20breathtaking%20HD%20videos.%20Including%20weather%20and%20time.%20Check%20out%20@usedelight%20for%20Chrome&url=http://getdelight.com/"><svg><use xlink:href="#share-twitter"></use></svg></span>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </header>\n'),
Handlebars.templates.video = Handlebars.compile('\n  <div class="video-container">\n    <video class="embedded-video" muted preload="auto">\n      <source src="{{base_url}}" type="video/mp4"></source>\n    </video>\n\n    <a class="video-source" href="{{source_url}}" data-setting="credits">\n      <span class="source-text">{{author}} {{title}}</span>\n    </div>\n  </div>\n'), Handlebars.templates.weather = Handlebars.compile('\n  <div class="weather-widget" data-setting="weather">\n    <div class="weather-screen-container">\n      <div class="weather-display-screen">\n        <div class="weather-display-pagers"></div>\n        <ul class="weather-display-locations"></ul>\n      </div>\n\n      <div class="weather-edit-screen">\n        <div class="search-locations-container">\n          <input type="search" class="search-locations-field" placeholder="{{i18n "placeholder_search_cities"}}" />\n          <button class="reset-search"></button>\n        </div>\n\n        <div class="locations-list-container">\n          <ul class="locations-added-list"></ul>\n          <p class="weather-start-prompt">{{i18n "weather_search_prompt"}}</p>\n          <div class="location-preview-container"></div>\n        </div>\n      </div>\n    </div>\n\n    <div class="weather-edit-toggle">\n      <div class="edit-open">\n        <svg class="cog"><use xlink:href="#cog"></use></svg>\n        <span class="prompt">{{i18n "open_weather_preferences"}}</span>\n      </div>\n\n      <div class="edit-close">\n        <span class="prompt">{{i18n "close_weather_preferences"}}</span>\n      </div>\n    </div>\n  </div>\n'),
Handlebars.templates["weather-display-item"] = Handlebars.compile('\n  <li class="weather-display-location" data-id="{{id}}">\n    <span class="weather-icon"></span>\n    <span class="current-temp" data-format="{{formats.temp}}"></span>\n    <span class="current-time" data-offset="{{utc_offset}}" data-format="{{formats.time}}"></span>\n    <span class="city">{{city}}</span>\n  </li>\n'), Handlebars.templates["weather-list-item"] = Handlebars.compile('\n  <li class="weather-location">\n    <button class="remove-location" data-id="{{id}}"></button>\n\n    <div class="location-info">\n      <p class="city">{{city}}</p>\n      {{#if country}}\n        <p class="country">{{country}}</p>\n      {{/if}}\n    </div>\n  </li>\n'),
Handlebars.templates["weather-add-item"] = Handlebars.compile('\n  <div class="location-preview">\n    {{#if at_limit}}\n      <p class="add-warning">{{i18n \'at_location_limit\'}}</p>\n    {{else}}\n      <p class="city">{{city}}</p>\n      {{#if country}}\n        <p class="country">{{country}}</p>\n      {{/if}}\n      {{#if already_added}}\n        <p class="add-warning">{{i18n \'existing_city_message\'}}</p>\n      {{else}}\n        <p class="configure-prompt">{{i18n \'configure_location_prompt\'}}</p>\n\n        <p class="current-time">\n          <span class="select-time-format active" data-format="12"></span>\n          <span class="select-time-format" data-format="24"></span>\n        </p>\n\n        <p class="tempurature">\n          <span class="select-temp-format active" data-format="c">{{initial_temp.[0]}}&#176; C</span>\n          <span class="select-temp-format" data-format="f">{{initial_temp.[1]}}&#176; F</span>\n        </p>\n\n        <button class="choose-location">{{i18n \'add_location_text\'}}</button>\n      {{/if}}\n    {{/if}}\n  </div>\n'),
Delight.MainView = function(extend) {
  /**
   * @param {?} game
   * @return {undefined}
   */
  var Class = function(game) {
    _classCallCheck(this, Class);
    _get(Object.getPrototypeOf(Class.prototype), "constructor", this).call(this, game);
  };
  return _inherits(Class, extend), _createClass(Class, {
    initialize : {
      /**
       * @return {undefined}
       */
      value : function() {
        var that = this;
        this.body = $(document.body);
        /** @type {boolean} */
        this.pageReady = false;
        /** @type {Array} */
        this.videoViews = [];
        /** @type {null} */
        this.idleTimer = null;
        chrome.storage.sync.get(function(data) {
          var el = {
            menuViewed : false,
            lastCheck : null,
            videoData : [],
            locations : [],
            visibilities : {
              topsites : true,
              launchers : true,
              weather : true,
              credits : true,
              video : true
            }
          };
          chrome.runtime.setUninstallURL("https://panda10.typeform.com/to/KPFr80", function() {
            if (chrome.runtime.lastError) {
              if (chrome.runtime.lastError.message) {
                console.warn("Unable to set uninstall URL: " + chrome.runtime.lastError.message);
              }
            }
          });
          that.extensionSettings = $.isEmptyObject(data) ? el : data;
          that.startExtension();
        });
      }
    },
    startExtension : {
      /**
       * @return {?}
       */
      value : function() {
        return $("[data-i18n]").each(this.localizeElement.bind(this)), this.checkBatteryStatus(), this.headerView = new Delight.HeaderView({
          el : this.$el,
          main : this
        }), this.$el.prepend(this.headerView.render()), navigator.onLine ? (this.weatherView = new Delight.WeatherView({
          el : this.$el,
          main : this
        }), this.$el.append(this.weatherView.render()), this.setupVideo(), void(this.body.hasClass("eco-mode") || ($(document).on("mousemove mousewheel click keypress", _.throttle(this.restartIdleTimer.bind(this), 500)), this.startIdleTimer(10)))) : this.showOfflineStatus();
      }
    },
    setupVideo : {
      /**
       * @return {undefined}
       */
      value : function() {
        var obj = this;
        var key = this.getSetting("lastCheck", null);
        var memo = this.getSetting("videoData", []);
        /** @type {number} */
        this.showLoadingTimeout = setTimeout(this.showLoading.bind(this), 800);
        var id = function() {
          /** @type {Date} */
          var now = new Date;
          /** @type {Date} */
          var then = new Date(now.getFullYear(), 0, 0);
          /** @type {number} */
          var delta = now - then;
          /** @type {number} */
          var dimension = 864E5;
          return Math.round(delta / dimension / 7);
        }();
        /**
         * @param {Array} models
         * @return {undefined}
         */
        var initialize = function(models) {
          console.log(models);
          models.forEach(function(dataAndEvents) {
            var seg = new Delight.VideoView({
              el : obj.$el,
              main : obj,
              videoData : dataAndEvents
            });
            obj.$el.append(seg.render());
            obj.videoViews.push(seg);
          });
          /** @type {number} */
          obj.currentVideo = 0;
          obj.videoViews[obj.currentVideo].requestVisibility();
          obj.displayPage();
          $(document).on("visibilitychange", obj.pageVisibilityChanged.bind(obj));
        };

        (function() {

          $.getJSON("http://a1.phobos.apple.com/us/r1000/000/Features/atv/AutumnResources/videos/entries.json", function(blocks) {
            var videos = [];
            for (var i in blocks) {
              for (var ii in blocks[i].assets) {
                var video = blocks[i].assets[ii];
                videos.push({
                  author: video.accessibilityLabel,
                  base_url: video.url,
                  id: video.id,
                  source_url: "http://apple.com/",
                  title: ''
                });
              }
            }
            initialize(_.shuffle(videos).splice(0, 1));
          });
        })();

        // if (null == key || id > key) {
        //   var todo = $.get("" + Delight.VideoSource + "/current.json");
        //   todo.done(function(items) {
        //     if (items = JSON.parse(items), memo = memo.concat(items), obj.updateSettings("lastCheck", id), obj.updateSettings("videoData", memo), initialize(_.shuffle(memo).splice(0, 5)), null == key) {
        //       var todo = $.get("" + Delight.VideoSource + "/past.json");
        //       todo.done(function(data) {
        //         /** @type {*} */
        //         data = JSON.parse(data);
        //         obj.updateSettings("videoData", memo.concat(data));
        //       });
        //     }
        //   });
        // } else {
        //   initialize(_.shuffle(memo).splice(0, 5));
        // }
      }
    },
    updateSettings : {
      /**
       * @param {?} path
       * @param {?} root
       * @param {?} callback
       * @return {undefined}
       */
      value : function(path, root, callback) {
        this.extensionSettings[path] = root;
        chrome.storage.sync.set(this.extensionSettings, function() {
          if (callback) {
            callback();
          }
        });
      }
    },
    getSetting : {
      /**
       * @param {?} prop
       * @param {?} px
       * @return {?}
       */
      value : function(prop, px) {
        return this.extensionSettings[prop] ? this.extensionSettings[prop] : px;
      }
    },
    queueNextVideo : {
      /**
       * @param {number} amount
       * @return {undefined}
       */
      value : function(amount) {
        var state = this;
        amount -= 500;
        /** @type {number} */
        this.currentVideoTimer = setTimeout(function() {
          var x = state.currentVideo === state.videoViews.length - 1 ? 0 : state.currentVideo + 1;
          var rreturn = state.videoViews[state.currentVideo];
          var ret = state.videoViews[x];
          ret.requestVisibility(rreturn);
          state.currentVideo = x;
        }, amount);
      }
    },
    pageVisibilityChanged : {
      /**
       * @return {undefined}
       */
      value : function() {
        var currentVideo = this.videoViews[this.currentVideo];
        if (currentVideo) {
          if ("hidden" === document.visibilityState) {
            currentVideo.pausePlaying();
            clearTimeout(this.currentVideoTimer);
            /** @type {null} */
            this.currentVideoTimer = null;
          } else {
            if ("visible" === document.visibilityState) {
              if (this.body.hasClass("video-active")) {
                currentVideo.resumePlaying();
              }
            }
          }
        }
      }
    },
    displayPage : {
      /**
       * @return {undefined}
       */
      value : function() {
        /** @type {boolean} */
        this.pageVisible = true;
        this.body.addClass("page-ready");
        Backbone.trigger("page-ready");
      }
    },
    showLoading : {
      /**
       * @return {undefined}
       */
      value : function() {
        if (!this.hasLoading) {
          this.$el.append(parseTemplate("loading-video"));
          /** @type {boolean} */
          this.hasLoading = true;
        }
        if (!this.video) {
          this.body.addClass("loading-visible");
        }
      }
    },
    hideLoading : {
      /**
       * @return {undefined}
       */
      value : function() {
        this.body.removeClass("loading-visible");
      }
    },
    showOfflineStatus : {
      /**
       * @return {undefined}
       */
      value : function() {
        var displayPage = this;
        this.body.addClass("no-connection");
        this.$el.append(parseTemplate("no-connection"));
        setTimeout(function() {
          displayPage.displayPage();
        }, 200);
      }
    },
    checkBatteryStatus : {
      /**
       * @return {undefined}
       */
      value : function() {
        var validateProperty;
        var enableEcoMode = this;
        var battery = navigator.battery;
        if (battery) {
          validateProperty(battery);
        } else {
          if (navigator.getBattery) {
            navigator.getBattery().then(function(deepDataAndEvents) {
              validateProperty(deepDataAndEvents);
            });
          }
        }
        /**
         * @param {Object} deepDataAndEvents
         * @return {undefined}
         */
        validateProperty = function(deepDataAndEvents) {
          if (deepDataAndEvents.level < 0.5) {
            if (deepDataAndEvents.charging !== true) {
              enableEcoMode.enableEcoMode();
            }
          }
        };
      }
    },
    enableEcoMode : {
      /**
       * @return {undefined}
       */
      value : function() {
        /** @type {boolean} */
        this.ecoMode = true;
        this.body.addClass("eco-mode");
      }
    },
    localizeText : {
      /**
       * @param {?} tokens
       * @return {?}
       */
      value : function(tokens) {
        return chrome.i18n.getMessage(tokens);
      }
    },
    localizeElement : {
      /**
       * @param {?} thisValue
       * @param {Object} node
       * @return {undefined}
       */
      value : function(thisValue, node) {
        node = $(node);
        node.text(this.localizeText(node.data("i18n")));
      }
    },
    startIdleTimer : {
      /**
       * @return {undefined}
       */
      value : function() {
        var pageIdle = this;
        var amount = void 0 === arguments[0] ? 5 : arguments[0];
        /** @type {number} */
        amount = 1E3 * amount;
        if (!this.doNotTimeout) {
          if (!this.body.hasClass("eco-mode")) {
            /** @type {number} */
            this.idleTimer = setTimeout(function() {
              $(document.body).addClass("page-idle");
              /** @type {boolean} */
              pageIdle.pageIdle = true;
            }, amount);
          }
        }
      }
    },
    restartIdleTimer : {
      /**
       * @param {Event} event
       * @return {undefined}
       */
      value : function(event) {
        if ("mousemove" === event.type) {
          if (event.clientY === this.lastClientY && event.clientX === this.lastClientX) {
            return;
          }
          this.lastClientY = event.clientY;
          this.lastClientX = event.clientX;
        }
        if (this.pageIdle) {
          $(document.body).removeClass("page-idle");
          /** @type {boolean} */
          this.pageIdle = false;
        }
        clearTimeout(this.idleTimer);
        this.startIdleTimer(7);
      }
    }
  }), Class;
}(Backbone.View), Delight.HeaderView = function(extend) {
  /**
   * @param {Object} options
   * @return {undefined}
   */
  var Class = function(options) {
    _classCallCheck(this, Class);
    _get(Object.getPrototypeOf(Class.prototype), "constructor", this).call(this, options);
    this.events = {
      "click .chrome-launchers a" : "chromeLauncherClicked",
      "click .more-menu-toggle" : "toggleMoreMenu"
    };
    /** @type {Object} */
    this.options = options;
    this.main = options.main;
  };
  return _inherits(Class, extend), _createClass(Class, {
    render : {
      /**
       * @return {?}
       */
      value : function() {
        var camelKey = {};
        var data = parseTemplate("header", camelKey);
        return this.setElement(data), this.setupTopSites(), this.setupSettingsMenu(), this.$el;
      }
    },
    setupSettingsMenu : {
      /**
       * @return {undefined}
       */
      value : function() {
        var options = this;
        Backbone.on("page-ready", function() {
          new Delight.SettingsMenuView({
            el : options.$(".header-more-dropdown"),
            main : options.main
          });
        });
      }
    },
    setupTopSites : {
      /**
       * @return {undefined}
       */
      value : function() {
        var self = this;
        this.topSitesList = this.$(".top-sites-inner");
        chrome.topSites.get(function(models) {
          models = models.slice(0, 7);
          models.forEach(function(request) {
            var $file = $("<a />").attr("href", request.url).text(request.title);
            $("<img />").attr({
              src : "chrome://favicon/" + request.url,
              width : 18,
              height : 19
            }).prependTo($file);
            self.topSitesList.append($file);
          });
        });
      }
    },
    chromeLauncherClicked : {
      /**
       * @return {undefined}
       */
      value : function() {
        chrome.tabs.create({
          url : event.target.dataset.href
        });
      }
    },
    toggleMoreMenu : {
      /**
       * @return {undefined}
       */
      value : function() {
        if (!this.main.getSetting("menuViewed", false)) {
          this.main.body.removeClass("show-menu-hint");
          this.main.updateSettings("menuViewed", true);
        }
        this.$el.toggleClass("header-more-visible");
        this.main.doNotTimeout = this.$el.hasClass("header-more-visible");
        $(document.body).on("click", this.checkForSettingsClick.bind(this));
      }
    },
    checkForSettingsClick : {
      /**
       * @param {Event} evt
       * @return {undefined}
       */
      value : function(evt) {
        var $el = $(evt.target);
        if (!$el.is(".more-menu-toggle")) {
          if (!$el.closest(".more-menu-toggle").length) {
            if (!$el.is(".header-more-dropdown")) {
              if (!$el.closest(".header-more-dropdown").length) {
                this.$el.removeClass("header-more-visible");
                /** @type {boolean} */
                this.main.doNotTimeout = false;
                $(document.body).off("click", this.checkForSettingsClick);
              }
            }
          }
        }
      }
    }
  }), Class;
}(Backbone.View), Delight.SettingsMenuView = function(extend) {
  /**
   * @param {Object} options
   * @return {undefined}
   */
  var Class = function(options) {
    _classCallCheck(this, Class);
    _get(Object.getPrototypeOf(Class.prototype), "constructor", this).call(this, options);
    /** @type {Object} */
    this.options = options;
  };
  return _inherits(Class, extend), _createClass(Class, {
    initialize : {
      /**
       * @return {undefined}
       */
      value : function() {
        this.body = $(document.body);
        /** @type {null} */
        this.currentHelper = null;
        this.toggleAreas = $("[data-toggle]");
        this.settingsAreas = $("[data-setting]");
        this.aboutToggle = $(".about-toggle");
        this.playbackToggle = this.toggleAreas.filter('[data-toggle="video"]');
        this.main = this.options.main;
        this.events = {
          "mouseenter .settings-toggle" : "toggleEntered",
          "mouseleave .settings-toggle" : "toggleExited",
          "click .settings-toggle" : "toggleSetting",
          'click [data-toggle="video"]' : "toggleVideoPlayback",
          "click .about-toggle" : "toggleAbout",
          "click .share-button" : "openShareWindow"
        };
        if (!this.options.main.getSetting("menuViewed", false)) {
          this.options.main.body.addClass("show-menu-hint");
        }
        this.setupVisibilities();
      }
    },
    setupVisibilities : {
      /**
       * @return {undefined}
       */
      value : function() {
        var self = this;
        this.visibilitySettings = this.main.getSetting("visibilities", {});
        Object.keys(this.visibilitySettings).forEach(function(pluginName) {
          if (self.visibilitySettings[pluginName] === true) {
            self.body.toggleClass("" + pluginName + "-active");
            self.toggleAreas.filter('[data-toggle="' + pluginName + '"]').addClass("setting-toggled");
          }
        });
      }
    },
    toggleEntered : {
      /**
       * @param {Event} evt
       * @return {undefined}
       */
      value : function(evt) {
        var tooltip = $(evt.target).data("toggle");
        if ("credits" === tooltip) {
          var carousel = this.settingsAreas.filter(function() {
            return "credits" === $(this).attr("data-setting") && $(this).closest(".video-container.visible").length;
          })
        } else {
          carousel = this.settingsAreas.filter('[data-setting="' + tooltip + '"]');
        }
        if (carousel.length) {
          this.toggleExited();
          var cs = carousel[0].getBoundingClientRect();
          var res = $('<div class="helper-overlay" />').css({
            width : cs.width,
            height : cs.height,
            top : cs.top - 10,
            left : cs.left - 10
          });
          this.currentHelper = res;
          this.body.append(res);
        }
      }
    },
    toggleExited : {
      /**
       * @param {?} thisValue
       * @return {undefined}
       */
      value : function(thisValue) {
        if (this.currentHelper) {
          this.currentHelper.remove();
          /** @type {null} */
          this.currentHelper = null;
        }
      }
    },
    toggleSetting : {
      /**
       * @return {undefined}
       */
      value : function() {
        var $el = $(event.target);
        var $btn = $el.closest(".settings-toggle");
        var enable = this.visibilitySettings[$btn.data("toggle")];
        this.body.toggleClass("" + $btn.data("toggle") + "-active", !enable);
        $el.toggleClass("setting-toggled", !enable);
        /** @type {boolean} */
        this.visibilitySettings[$btn.data("toggle")] = !enable;
        this.main.updateSettings("visibilities", this.visibilitySettings);
      }
    },
    toggleAbout : {
      /**
       * @param {?} event
       * @return {undefined}
       */
      value : function(event) {
        event.preventDefault();
        this.aboutToggle.toggleClass("about-open");
      }
    },
    toggleVideoPlayback : {
      /**
       * @return {undefined}
       */
      value : function() {
        var pausePlaying = this.main.videoViews[this.main.currentVideo];
        if (pausePlaying) {
          if (this.playbackToggle.hasClass("setting-toggled")) {
            pausePlaying.resumePlaying();
          } else {
            pausePlaying.pausePlaying();
            clearTimeout(this.main.currentVideoTimer);
            /** @type {null} */
            this.main.currentVideoTimer = null;
          }
        }
      }
    },
    openShareWindow : {
      /**
       * @param {Event} evt
       * @return {undefined}
       */
      value : function(evt) {
        var dat = $(evt.target).data("share");
        window.open(dat, "_blank", "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=500,height=300");
      }
    }
  }), Class;
}(Backbone.View), Delight.VideoView = function(extend) {
  /**
   * @param {Object} options
   * @return {undefined}
   */
  var Class = function(options) {
    _classCallCheck(this, Class);
    _get(Object.getPrototypeOf(Class.prototype), "constructor", this).call(this, options);
    /** @type {Object} */
    this.options = options;
    this.main = options.main;
    this.videoData = this.options.videoData;
    /** @type {boolean} */
    this.isAwaitingLoad = false;
    /** @type {boolean} */
    this.canPlay = false;
    /** @type {boolean} */
    this.isPlaying = false;
  };
  return _inherits(Class, extend), _createClass(Class, {
    render : {
      /**
       * @return {?}
       */
      value : function() {
        this.videoData.base_url = this.videoData.base_url;
        this.videoData.source_url = this.videoData.url;
        delete this.videoData.url;
        var element = parseTemplate("video", this.videoData);
        return this.setElement(element), this.setupVideo(), this.el;
      }
    },
    initialize : {
      /**
       * @return {undefined}
       */
      value : function() {
        $(window).on("resize", this.positionVideo.bind(this));
      }
    },
    setupVideo : {
      /**
       * @return {undefined}
       */
      value : function() {
        var $scope = this;
        this.video = this.$(".embedded-video");
        this.videoEl = this.video[0];
        this.video.on("canplaythrough", function() {
          /** @type {boolean} */
          $scope.canPlay = true;
          /** @type {number} */
          $scope.duration = Math.round(1E3 * $scope.videoEl.duration) - 300;
          $scope.sizeVideo();
          if ($scope.isAwaitingLoad) {
            $scope.showVideo();
            /** @type {boolean} */
            $scope.isAwaitingLoad = false;
          }
        });
      }
    },
    sizeVideo : {
      /**
       * @return {?}
       */
      value : function() {
        var b = this.video.height();
        var a = this.video.width();
        return this.videoRatio = a / b, this.positionVideo(), this;
      }
    },
    positionVideo : {
      /**
       * @return {?}
       */
      value : function() {
        if (this.canPlay) {
          /** @type {number} */
          var maxWidth = window.innerWidth / window.innerHeight;
          return this.video.toggleClass("horizontal", this.videoRatio < maxWidth).toggleClass("vertical", maxWidth < this.videoRatio), this;
        }
      }
    },
    showVideo : {
      /**
       * @param {Object} record
       * @return {?}
       */
      value : function(record) {
        var self = this;
        return this.main.body.hasClass("video-active") && (this.videoEl.play(), this.isPlaying = true), this.main.queueNextVideo(this.duration), record ? this.$el.addClass("in-front visible").one("trend", function() {
          record.reset();
          self.$el.removeClass("in-front").off("trend");
          setTimeout(function() {
            self.$el.addClass("credits-visible");
          }, 500);
        }) : this.$el.addClass("visible credits-visible"), clearTimeout(this.main.showLoadingTimeout), this.main.hideLoading(), this;
      }
    },
    requestVisibility : {
      /**
       * @param {?} newValue
       * @return {?}
       */
      value : function(newValue) {
        return this.canPlay ? this.showVideo(newValue) : this.isAwaitingLoad = true, this;
      }
    },
    reset : {
      /**
       * @return {undefined}
       */
      value : function() {
        this.$el.removeClass("visible credits-visible");
        /** @type {boolean} */
        this.isPlaying = false;
        this.videoEl.pause();
        this.videoEl.load();
      }
    },
    pausePlaying : {
      /**
       * @return {undefined}
       */
      value : function() {
        this.videoEl.pause();
        /** @type {boolean} */
        this.isPlaying = false;
      }
    },
    resumePlaying : {
      /**
       * @return {undefined}
       */
      value : function() {
        /** @type {number} */
        var SAFETY = 1E3 * this.videoEl.currentTime;
        /** @type {number} */
        var r20 = Math.round(this.duration - SAFETY);
        this.videoEl.play();
        /** @type {boolean} */
        this.isPlaying = true;
        this.main.queueNextVideo(r20);
      }
    }
  }), Class;
}(Backbone.View), Delight.WeatherView = function(extend) {
  /**
   * @param {Object} options
   * @return {undefined}
   */
  var Class = function(options) {
    _classCallCheck(this, Class);
    _get(Object.getPrototypeOf(Class.prototype), "constructor", this).call(this, options);
    this.events = {
      "click .weather-edit-toggle" : "toggleWeatherEdit",
      "keyup .search-locations-field" : _.debounce(this.searchForLocation.bind(this), 500),
      "click .reset-search" : "resetLocationSearch",
      "click .select-time-format" : "updateTimeFormat",
      "click .select-temp-format" : "updateTempFormat",
      "click .choose-location" : "addNewLocation",
      "click .remove-location" : "removeLocation",
      "click .weather-display-pager" : "changeWeatherDisplay",
      "mousewheel .weather-display-screen" : "displayScreenScrolled"
    };
    /** @type {Object} */
    this.options = options;
    this.main = options.main;
  };
  return _inherits(Class, extend), _createClass(Class, {
    render : {
      /**
       * @return {?}
       */
      value : function() {
        this.weatherLocations = this.main.getSetting("locations", []);
        var $el = parseTemplate("weather", this.weatherLocations);
        return this.setElement($el), this.setupWeather(), this.el;
      }
    },
    setupWeather : {
      /**
       * @return {?}
       */
      value : function() {
        return this.weatherEditScreen = this.$(".weather-edit-screen"), this.locationsSearchField = this.weatherEditScreen.find(".search-locations-field"), this.locationPreviewContainer = this.weatherEditScreen.find(".location-preview-container"), this.listLocationsTemplate = this.weatherEditScreen.find(".locations-added-list"), this.weatherDisplayScreen = this.$(".weather-display-screen"), this.displayLocationsContainer = this.weatherDisplayScreen.find(".weather-display-locations"), this.displayPagersContainer =
        this.weatherDisplayScreen.find(".weather-display-pagers"), this.displayPagers = $(), this.weatherDisplayViews = [], this.currentDisplayIndex = 0, this.weatherLocations.length ? void this.weatherLocations.forEach(this.createLocationElements.bind(this)) : void this.$el.addClass("no-locations weather-ready");
      }
    },
    createLocationElements : {
      /**
       * @param {Element} p
       * @param {number} thisValue
       * @return {undefined}
       */
      value : function(p, thisValue) {
        var before = parseTemplate("weather-list-item", p);
        var l = parseTemplate("weather-display-item", p);
        var item = $('<span class="weather-display-pager" data-id="' + p.id + '" data-label="' + p.city + ", " + p.country + '">');
        this.listLocationsTemplate.append(before);
        this.displayLocationsContainer.append(l);
        this.displayPagersContainer.append(item);
        if (null != thisValue) {
          if (0 === thisValue) {
            l.add(item).addClass("active");
            this.$el.removeClass("no-locations");
          }
        }
        var copies = new Delight.WeatherDisplayView({
          el : l,
          main : this.main,
          parent : this
        });
        this.weatherDisplayViews.push(copies);
        this.displayPagers = this.displayPagers.add(item);
        this.$el.toggleClass("pagers-visible", this.weatherLocations.length > 1);
      }
    },
    toggleWeatherEdit : {
      /**
       * @return {undefined}
       */
      value : function() {
        var el = this;
        this.$el.toggleClass("editing-weather");
        if (this.$el.hasClass("editing-weather")) {
          /** @type {boolean} */
          this.main.doNotTimeout = true;
          setTimeout(function() {
            el.locationsSearchField.focus();
          }, 100);
        } else {
          /** @type {boolean} */
          this.main.doNotTimeout = false;
        }
      }
    },
    resetLocationSearch : {
      /**
       * @return {?}
       */
      value : function() {
        return this.currentSearch = {}, this.locationPreviewContainer.html(""), this.$el.removeClass("searching"), this.locationsSearchField.val("").focus(), this;
      }
    },
    searchForLocation : {
      /**
       * @return {?}
       */
      value : function() {
        var query;
        var todo;
        var self = this;
        return query = encodeURIComponent(this.locationsSearchField.val()), query.length ? void(query.length < 4 || (this.currentSearch && this.currentSearch.query === query || (this.currentSearch = {}, this.currentSearch.query = query, todo = $.get("" + Delight.weather.endpoint + "&q=" + query + "&fx=no&showlocaltime=yes"), todo.done(function(data) {
          if (self.locationPreviewContainer.html("").removeClass("previewing not-found overflowing"), self.$el.addClass("searching"), data.data.error && /matching weather/.test(data.data.error[0].msg)) {
            var e = self.main.localizeText("location_not_found");
            return self.locationPreviewContainer.append($('<div class="not-found" />').text(e)), self.locationPreviewContainer.addClass("not-found");
          }
          self.locationPreviewContainer.addClass("previewing");
          var qs = data.data.request[0].query;
          var codeSegments = qs.split(",");
          self.currentSearch = {
            query : query,
            data : {
              id : qs,
              city : codeSegments[0],
              country : 2 == codeSegments.length ? codeSegments[1] : null,
              utc_offset : data.data.time_zone[0].utcOffset,
              formats : {
                time : 12,
                temp : "c"
              },
              initial_temp : [data.data.current_condition[0].temp_C, data.data.current_condition[0].temp_F]
            }
          };
          self.showLocationAddScreen();
        })))) : this.resetLocationSearch();
      }
    },
    showLocationAddScreen : {
      /**
       * @return {undefined}
       */
      value : function() {
        var data = this.currentSearch.data;
        data.already_added = this.weatherLocations.some(function(i) {
          return i.id === data.id;
        });
        /** @type {boolean} */
        data.at_limit = this.weatherLocations.length >= 4;
        var content = parseTemplate("weather-add-item", data);
        this.previewTimeSelectors = content.find(".select-time-format");
        this.previewTempSelectors = content.find(".select-temp-format");
        this.previewTimeSelectors.filter('[data-format="12"]').localClock({
          offset : data.utc_offset,
          clock : 12
        });
        this.previewTimeSelectors.filter('[data-format="24"]').localClock({
          offset : data.utc_offset,
          clock : 24
        });
        this.locationPreviewContainer.html(content);
        if (content.outerHeight() > 250) {
          this.locationPreviewContainer.addClass("overflowing");
        }
      }
    },
    updateTimeFormat : {
      /**
       * @param {Event} evt
       * @return {undefined}
       */
      value : function(evt) {
        var d = $(evt.target);
        this.previewTimeSelectors.removeClass("active").filter(d).addClass("active");
        this.currentSearch.data.formats.time = d.data("format");
      }
    },
    updateTempFormat : {
      /**
       * @param {Event} evt
       * @return {undefined}
       */
      value : function(evt) {
        var d = $(evt.target);
        this.previewTempSelectors.removeClass("active").filter(d).addClass("active");
        this.currentSearch.data.formats.temp = d.data("format");
      }
    },
    addNewLocation : {
      /**
       * @return {undefined}
       */
      value : function() {
        var obj = this;
        delete this.currentSearch.data.already_added;
        delete this.currentSearch.data.initial_temp;
        delete this.currentSearch.data.at_limit;
        /** @type {boolean} */
        var checked = 0 === this.weatherLocations.length;
        this.weatherLocations.push(this.currentSearch.data);
        this.main.updateSettings("locations", this.weatherLocations, function() {
          obj.createLocationElements(obj.currentSearch.data, checked ? 0 : null);
          obj.resetLocationSearch();
        });
      }
    },
    removeLocation : {
      /**
       * @return {undefined}
       */
      value : function() {
        var self = this;
        var $btn = $(event.target);
        var name = $btn.data("id");
        this.weatherLocations = _.without(this.weatherLocations, _.findWhere(this.weatherLocations, {
          id : name
        }));
        this.main.updateSettings("locations", this.weatherLocations, function() {
          var stream = self.displayPagers.filter('[data-id="' + name + '"]');
          var that = _.find(self.weatherDisplayViews, function(v) {
            return v.locationID === name;
          });
          if (that.$el.hasClass("active")) {
            var checkbox = stream.next();
            if (!checkbox.length) {
              checkbox = stream.prev();
            }
            checkbox.trigger("click");
          }
          self.weatherDisplayViews.splice(self.weatherDisplayViews.indexOf(that), 1);
          that.remove();
          self.displayPagers.filter('[data-id="' + name + '"]').remove();
          $btn.closest(".weather-location").remove();
          self.$el.toggleClass("no-locations", 0 === self.weatherLocations.length);
          self.$el.toggleClass("pagers-visible", self.weatherLocations.length > 1);
        });
      }
    },
    changeWeatherDisplay : {
      /**
       * @param {Event} evt
       * @param {string} i
       * @return {undefined}
       */
      value : function(evt, i) {
        var options = this;
        if (evt) {
          var next = $(evt.target);
          var idx = next.index();
        } else {
          if (i) {
            idx = this.currentDisplayIndex + ("down" === i ? 1 : -1);
            next = this.displayPagers.eq(idx);
          }
        }
        /** @type {string} */
        var reverse = idx > this.currentDisplayIndex ? "backward" : "forward";
        var fromPage = this.weatherDisplayViews[this.currentDisplayIndex].$el;
        var view = this.weatherDisplayViews[idx];
        if (null == view) {
          /** @type {number} */
          idx = "backward" === reverse ? 0 : this.weatherDisplayViews.length - 1;
          next = this.displayPagers.eq(idx);
          view = this.weatherDisplayViews[idx];
        }
        var $container = view.$el;
        if (idx !== this.currentDisplayIndex) {
          if (!this.changingWeather) {
            /** @type {boolean} */
            this.changingWeather = true;
            $container.addClass("active transitioning prep-" + reverse);
            fromPage.addClass("transitioning " + reverse);
            setTimeout(function() {
              $container.removeClass("prep-" + reverse).one("trend", function() {
                $container.removeClass("transitioning");
                fromPage.removeClass("active transitioning " + reverse);
                options.currentDisplayIndex = idx;
                options.displayPagers.removeClass("active");
                next.addClass("active");
                /** @type {boolean} */
                options.changingWeather = false;
              });
            }, 50);
          }
        }
      }
    },
    displayScreenScrolled : {
      /**
       * @param {Event} evt
       * @return {undefined}
       */
      value : function(evt) {
        if (!this.lastDisplayScrollTime) {
          /** @type {number} */
          this.lastDisplayScrollTime = 0;
        }
        if (!this.lastDisplayScrollDirection) {
          /** @type {string} */
          this.lastDisplayScrollDirection = "down";
        }
        /** @type {string} */
        var direction = evt.deltaY < 0 ? "down" : "up";
        var startTime = this.lastDisplayScrollTime;
        var timeStamp = evt.timeStamp;
        /** @type {boolean} */
        var e = 40 > timeStamp - startTime && direction === this.lastDisplayScrollDirection;
        this.lastDisplayScrollTime = timeStamp;
        /** @type {string} */
        this.lastDisplayScrollDirection = direction;
        if (!e) {
          this.changeWeatherDisplay(null, direction);
        }
      }
    }
  }), Class;
}(Backbone.View), Delight.WeatherDisplayView = function(extend) {
  /**
   * @param {Object} options
   * @return {undefined}
   */
  var Class = function(options) {
    _classCallCheck(this, Class);
    _get(Object.getPrototypeOf(Class.prototype), "constructor", this).call(this, options);
    this.events = {
      "click .current-temp" : "switchTempFormat",
      "click .current-time" : "switchTimeFormat"
    };
    /** @type {Object} */
    this.options = options;
    this.main = options.main;
  };
  return _inherits(Class, extend), _createClass(Class, {
    initialize : {
      /**
       * @return {undefined}
       */
      value : function() {
        var me = this;
        this.locationID = this.$el.data("id");
        this.weatherIconContainer = this.$(".weather-icon");
        this.currentTempContainer = this.$(".current-temp");
        this.currentTimeContainer = this.$(".current-time");
        this.currentTimeContainer.attr("data-alt-format", "12" === this.currentTimeContainer.attr("data-format") ? "24" : "12");
        this.currentTempContainer.attr("data-alt-format", "c" === this.currentTempContainer.attr("data-format") ? "f" : "c");
        this.locationID = this.$el.data("id");
        this.offsetID = this.currentTimeContainer.data("offset");
        this.currentTimeContainer.localClock({
          offset : this.offsetID,
          clock : parseInt(this.currentTimeContainer.attr("data-format"))
        });
        var todo = $.get("" + Delight.weather.endpoint + "&q=" + this.locationID + "&fx=no&showlocaltime=yes");
        todo.done(function(e) {
          me.weatherData = e;
          me.weatherIconContainer.html('<svg><use xlink:href="#' + Delight.weather.icons[me.weatherData.data.current_condition[0].weatherCode] + '"></use></svg>');
          me.switchTempFormat();
          me.delegateEvents();
          if (!me.options.parent.$el.hasClass("weather-ready")) {
            me.options.parent.$el.addClass("weather-ready");
          }
        });
      }
    },
    switchTempFormat : {
      /**
       * @return {undefined}
       */
      value : function() {
        var textStatus = this.currentTempContainer.attr("data-format").toUpperCase();
        this.currentTempContainer.attr("data-format", "c" === this.currentTempContainer.attr("data-format") ? "f" : "c");
        this.currentTempContainer.attr("data-alt-format", "c" === this.currentTempContainer.attr("data-format") ? "f" : "c");
        this.currentTempContainer.html(this.weatherData.data.current_condition[0]["temp_" + textStatus] + "&#176;" + textStatus);
      }
    },
    switchTimeFormat : {
      /**
       * @return {undefined}
       */
      value : function() {
        this.currentTimeContainer.attr("data-format", "12" === this.currentTimeContainer.attr("data-format") ? "24" : "12");
        this.currentTimeContainer.attr("data-alt-format", "12" === this.currentTimeContainer.attr("data-format") ? "24" : "12");
        this.currentTimeContainer.localClock({
          offset : this.offsetID,
          clock : parseInt(this.currentTimeContainer.attr("data-format"))
        });
      }
    },
    destroy : {
      /**
       * @return {undefined}
       */
      value : function() {
        this.undelegateEvents();
        this.$el.remove();
      }
    }
  }), Class;
}(Backbone.View), $(document).on("ready", function() {
  var $el = $(".container");
  window.site = new Delight.MainView({
    el : $el
  });
});

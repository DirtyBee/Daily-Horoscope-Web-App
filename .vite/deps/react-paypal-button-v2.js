import {
  require_react_dom
} from "./chunk-YEGEUSQR.js";
import {
  require_prop_types
} from "./chunk-PULDY6UA.js";
import {
  require_react
} from "./chunk-7JZAKNLV.js";
import {
  __commonJS
} from "./chunk-2TUXWMP5.js";

// node_modules/react-paypal-button-v2/lib/index.js
var require_lib = __commonJS({
  "node_modules/react-paypal-button-v2/lib/index.js"(exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.PayPalButton = void 0;
    var _react = _interopRequireDefault(require_react());
    var _reactDom = _interopRequireDefault(require_react_dom());
    var _propTypes = _interopRequireDefault(require_prop_types());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _typeof(obj) {
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      return Constructor;
    }
    function _possibleConstructorReturn(self, call) {
      if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
      }
      return _assertThisInitialized(self);
    }
    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self;
    }
    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return _getPrototypeOf(o);
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      if (superClass) _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var PayPalButton = function(_React$Component) {
      _inherits(PayPalButton2, _React$Component);
      function PayPalButton2(props) {
        var _this;
        _classCallCheck(this, PayPalButton2);
        _this = _possibleConstructorReturn(this, _getPrototypeOf(PayPalButton2).call(this, props));
        _this.state = {
          isSdkReady: false
        };
        return _this;
      }
      _createClass(PayPalButton2, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          if (typeof window !== "undefined" && window !== void 0 && window.paypal === void 0) {
            this.addPaypalSdk();
          } else if (typeof window !== "undefined" && window !== void 0 && window.paypal !== void 0 && this.props.onButtonReady) {
            this.props.onButtonReady();
          }
        }
      }, {
        key: "createOrder",
        value: function createOrder(data, actions) {
          var _this$props = this.props, currency = _this$props.currency, options = _this$props.options, amount = _this$props.amount, shippingPreference = _this$props.shippingPreference;
          return actions.order.create({
            purchase_units: [{
              amount: {
                currency_code: currency ? currency : options && options.currency ? options.currency : "USD",
                value: amount.toString()
              }
            }],
            application_context: {
              shipping_preference: shippingPreference
            }
          });
        }
      }, {
        key: "onApprove",
        value: function onApprove(data, actions) {
          var _this2 = this;
          return actions.order.capture().then(function(details) {
            if (_this2.props.onSuccess) {
              return _this2.props.onSuccess(details, data);
            }
          })["catch"](function(err) {
            if (_this2.props.catchError) {
              return _this2.props.catchError(err);
            }
          });
        }
      }, {
        key: "render",
        value: function render() {
          var _this3 = this;
          var _this$props2 = this.props, amount = _this$props2.amount, onSuccess = _this$props2.onSuccess, createOrder = _this$props2.createOrder, createSubscription = _this$props2.createSubscription, onApprove = _this$props2.onApprove, style = _this$props2.style;
          var isSdkReady = this.state.isSdkReady;
          if (!isSdkReady && (typeof window === "undefined" || window.paypal === void 0)) {
            return null;
          }
          var Button = window.paypal.Buttons.driver("react", {
            React: _react["default"],
            ReactDOM: _reactDom["default"]
          });
          var createOrderFn = amount && !createOrder ? function(data, actions) {
            return _this3.createOrder(data, actions);
          } : function(data, actions) {
            return createOrder(data, actions);
          };
          return _react["default"].createElement(Button, _extends({}, this.props, {
            createOrder: createSubscription ? void 0 : createOrderFn,
            createSubscription,
            onApprove: onSuccess ? function(data, actions) {
              return _this3.onApprove(data, actions);
            } : function(data, actions) {
              return onApprove(data, actions);
            },
            style
          }));
        }
      }, {
        key: "addPaypalSdk",
        value: function addPaypalSdk() {
          var _this4 = this;
          var _this$props3 = this.props, options = _this$props3.options, onButtonReady = _this$props3.onButtonReady;
          var queryParams = [];
          Object.keys(options).forEach(function(k) {
            var name = k.split(/(?=[A-Z])/).join("-").toLowerCase();
            queryParams.push("".concat(name, "=").concat(options[k]));
          });
          var script = document.createElement("script");
          script.type = "text/javascript";
          script.src = "https://www.paypal.com/sdk/js?".concat(queryParams.join("&"));
          script.async = true;
          script.onload = function() {
            _this4.setState({
              isSdkReady: true
            });
            if (onButtonReady) {
              onButtonReady();
            }
          };
          script.onerror = function() {
            throw new Error("Paypal SDK could not be loaded.");
          };
          document.body.appendChild(script);
        }
      }]);
      return PayPalButton2;
    }(_react["default"].Component);
    exports.PayPalButton = PayPalButton;
    _defineProperty(PayPalButton, "propTypes", {
      amount: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
      currency: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
      shippingPreference: _propTypes["default"].string,
      onSuccess: _propTypes["default"].func,
      catchError: _propTypes["default"].func,
      onError: _propTypes["default"].func,
      createOrder: _propTypes["default"].func,
      createSubscription: _propTypes["default"].func,
      onApprove: _propTypes["default"].func,
      style: _propTypes["default"].object,
      options: _propTypes["default"].shape({
        clientId: _propTypes["default"].string,
        merchantId: _propTypes["default"].string,
        currency: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
        intent: _propTypes["default"].string,
        commit: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].string]),
        vault: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].string]),
        component: _propTypes["default"].string,
        disableFunding: _propTypes["default"].string,
        disableCard: _propTypes["default"].string,
        integrationDate: _propTypes["default"].string,
        locale: _propTypes["default"].string,
        buyerCountry: _propTypes["default"].string,
        debug: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].string])
      }),
      onButtonReady: _propTypes["default"].func
    });
    _defineProperty(PayPalButton, "defaultProps", {
      style: {},
      options: {
        clientId: "sb",
        currency: "USD"
      },
      shippingPreference: "GET_FROM_FILE"
    });
  }
});
export default require_lib();
//# sourceMappingURL=react-paypal-button-v2.js.map

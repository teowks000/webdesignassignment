var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from "react";

var Cart = function (_Component) {
  _inherits(Cart, _Component);

  function Cart(props) {
    _classCallCheck(this, Cart);

    var _this = _possibleConstructorReturn(this, (Cart.__proto__ || Object.getPrototypeOf(Cart)).call(this, props));

    var carts = sessionStorage.getItem("carts");
    if (carts !== null) {
      _this.state = {
        items: JSON.parse(carts)
      };
    }
    _this.mapItem = _this.mapItem.bind(_this);
    return _this;
  }

  _createClass(Cart, [{
    key: "mapItem",
    value: function mapItem(_ref) {
      var name = _ref.name,
          price = _ref.price,
          qty = _ref.qty;

      return React.createElement(
        "li",
        { className: "list-group-item d-flex justify-content-between lh-condensed" },
        React.createElement(
          "div",
          null,
          React.createElement(
            "h6",
            { className: "my-0" },
            name
          ),
          React.createElement(
            "small",
            { className: "text-muted" },
            "Brief description"
          )
        ),
        React.createElement(
          "span",
          { className: "text-muted" },
          price
        ),
        React.createElement(
          "span",
          null,
          qty
        )
      );
    }
  }, {
    key: "render",
    value: function render() {
      var carts = this.items.map(this.mapItem);
      return React.createElement(
        React.Fragment,
        null,
        carts
      );
    }
  }]);

  return Cart;
}(Component);

export default Cart;
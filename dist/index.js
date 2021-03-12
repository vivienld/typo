function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var Style = _interopDefault(require('styled-components'));

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _taggedTemplateLiteralLoose(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  strings.raw = raw;
  return strings;
}

var _templateObject;
function base() {
  return Style.span(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["display:inline-block;"])));
}

var _templateObject$1;
function rotateInCenter(duration) {
  return Style.span(_templateObject$1 || (_templateObject$1 = _taggedTemplateLiteralLoose(["\n    display:inline-block;\n    @keyframes rotate-in-center{\n        0%{\n            -webkit-transform:rotate(-360deg);\n            transform:rotate(-360deg);\n            opacity:0;\n        }\n            100%{\n                -webkit-transform:rotate(0);\n                transform:rotate(0);\n                opacity:1\n            }\n        }\n    }\n    animation: rotate-in-center ", "s cubic-bezier(.25,.46,.45,.94) both;\n    "])), duration / 1000);
}

var StyledComponents = function StyledComponents() {};
StyledComponents.base = base;
StyledComponents.rotateInCenter = rotateInCenter;

var Char = /*#__PURE__*/function (_Component) {
  _inheritsLoose(Char, _Component);

  function Char(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this.render = function () {
      var _this$state;

      return React__default.createElement(React.Fragment, null, (_this$state = _this.state) === null || _this$state === void 0 ? void 0 : _this$state.display);
    };

    _this.state = {
      display: null,
      visibility: 'hidden'
    };
    _this.baseComponent = StyledComponents.base();
    return _this;
  }

  var _proto = Char.prototype;

  _proto.componentDidMount = function componentDidMount() {
    if (this.props.unload) {
      this.unload();
    } else {
      this.load();

      if (this.props.hide) {
        this.hide();
      } else if (!this.props.fixed) {
        this.play();
      }
    }
  };

  _proto.load = function load() {
    var _this2 = this;

    this.setState({
      display: React__default.createElement(this.baseComponent, null, this.props.children)
    }, function () {
      _this2.onLoad();
    });
  };

  _proto.unload = function unload() {
    var _this3 = this;

    this.setState({
      display: null
    }, function () {
      _this3.onUnload();
    });
  };

  _proto.hide = function hide() {
    var _this4 = this;

    var Component = Style.span(StyledComponents.base());
    this.setState({
      display: React__default.createElement(Component, {
        style: {
          visibility: 'hidden'
        }
      }, this.props.children)
    }, function () {
      _this4.onHide();
    });
  };

  _proto.play = function play() {
    var _this5 = this;

    var Component = this.props.component(this.props.duration);
    this.setState({
      display: React__default.createElement(Component, null, this.props.children)
    }, function () {
      _this5.onPlay();
    });
  };

  _proto.onPlay = function onPlay() {
    var _this$props$onPlay, _this$props;

    (_this$props$onPlay = (_this$props = this.props).onPlay) === null || _this$props$onPlay === void 0 ? void 0 : _this$props$onPlay.call(_this$props, this);
  };

  _proto.onLoad = function onLoad() {
    var _this$props$onLoad, _this$props2;

    (_this$props$onLoad = (_this$props2 = this.props).onLoad) === null || _this$props$onLoad === void 0 ? void 0 : _this$props$onLoad.call(_this$props2, this);
  };

  _proto.onUnload = function onUnload() {
    var _this$props$onUnload, _this$props3;

    (_this$props$onUnload = (_this$props3 = this.props).onUnload) === null || _this$props$onUnload === void 0 ? void 0 : _this$props$onUnload.call(_this$props3, this);
  };

  _proto.onHide = function onHide() {
    var _this$props$onHide, _this$props4;

    (_this$props$onHide = (_this$props4 = this.props).onHide) === null || _this$props$onHide === void 0 ? void 0 : _this$props$onHide.call(_this$props4, this);
  };

  return Char;
}(React.Component);
Char.defaultProps = {
  duration: 0,
  hide: false,
  unload: false,
  fixed: false
};

var Text = /*#__PURE__*/function (_Component) {
  _inheritsLoose(Text, _Component);

  function Text() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = Text.prototype;

  _proto.render = function render() {
    return React__default.createElement("div", null);
  };

  return Text;
}(React.Component);

exports.Char = Char;
exports.StyledComponents = StyledComponents;
exports.Text = Text;
//# sourceMappingURL=index.js.map
